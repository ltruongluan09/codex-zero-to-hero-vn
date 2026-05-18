import mammoth from "mammoth";
import * as XLSX from "xlsx";
import { DOCSCAN_SYSTEM_PROMPT, SUPPORTED_DOCUMENT_TYPES } from "../lib/document-prompts.js";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "25mb",
    },
  },
};

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const NATIVE_FILE_TYPES = new Set(SUPPORTED_DOCUMENT_TYPES.native);
const TEXT_FILE_TYPES = new Set(SUPPORTED_DOCUMENT_TYPES.text);
const XLSX_FILE_TYPES = new Set(SUPPORTED_DOCUMENT_TYPES.xlsx);
const DOCX_FILE_TYPES = new Set(SUPPORTED_DOCUMENT_TYPES.docx);

const MAX_FILE_SIZE = 20 * 1024 * 1024;

function inferMimeType(mimeType = "", fileName = "") {
  if (mimeType && mimeType !== "application/octet-stream") return mimeType;
  const lowerName = String(fileName).toLowerCase();
  if (lowerName.endsWith(".pdf")) return "application/pdf";
  if (lowerName.endsWith(".docx")) return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if (lowerName.endsWith(".xlsx")) return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  if (lowerName.endsWith(".xls")) return "application/vnd.ms-excel";
  if (lowerName.endsWith(".csv")) return "text/csv";
  if (lowerName.endsWith(".txt")) return "text/plain";
  if (lowerName.endsWith(".png")) return "image/png";
  if (lowerName.endsWith(".jpg") || lowerName.endsWith(".jpeg")) return "image/jpeg";
  if (lowerName.endsWith(".webp")) return "image/webp";
  if (lowerName.endsWith(".heic")) return "image/heic";
  return mimeType || "application/octet-stream";
}

function fallbackAnalysis({ fileName = "tài liệu" } = {}) {
  return normalizeDocScanResult({
    document_type: "Chưa đọc được nội dung thật",
    summary:
      `DocScan đã nhận file "${fileName}", nhưng chưa phân tích được nội dung thật. Kết quả này chỉ là trạng thái an toàn, không phải nhận xét về tài liệu của bạn.`,
    key_points: [
      {
        label: "Trạng thái",
        value: "File đã được gửi lên, nhưng AI chưa trả về bản phân tích bám theo nội dung thật.",
        importance: "high",
      },
      {
        label: "Nên làm gì",
        value: "Thử lại với file rõ hơn, nhỏ hơn 20MB. Nếu vẫn lỗi, Lumi Labs cần kiểm tra kết nối AI.",
        importance: "medium",
      },
    ],
    risks_or_notes: [
      {
        title: "Chưa có nhận xét từ nội dung thật",
        detail:
          "Lumi Bot chưa đọc được nội dung bên trong file, nên chưa thể chỉ ra điểm cần chú ý cụ thể.",
        severity: "medium",
      },
    ],
    suggested_questions: [
      "File này có đúng định dạng được hỗ trợ không?",
      "Tài liệu có bị mờ, scan lệch hoặc quá nặng không?",
      "Nếu thử lại vẫn lỗi, Lumi Labs có cần kiểm tra kết nối AI không?",
    ],
    action_items: [
      "Thử upload lại file rõ hơn hoặc nhỏ hơn 20MB.",
      "Nếu vẫn chưa được, hãy thử lại sau ít phút.",
    ],
  });
}

function base64ToBuffer(base64) {
  return Buffer.from(base64.replace(/^data:.*;base64,/, ""), "base64");
}

function cleanBase64(base64) {
  return String(base64 || "").replace(/^data:.*;base64,/, "");
}

function extractTextFile(buffer) {
  return buffer.toString("utf8").slice(0, 120000);
}

function extractExcel(buffer) {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  return workbook.SheetNames.map((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    return `Sheet: ${sheetName}\n${XLSX.utils.sheet_to_csv(sheet)}`;
  }).join("\n\n").slice(0, 120000);
}

async function extractDocx(buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return (result.value || "").slice(0, 120000);
}

function safeJson(text) {
  if (!text) return null;
  try {
    const cleaned = String(text)
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

function normalizeImportance(value) {
  return ["high", "medium", "low"].includes(value) ? value : "medium";
}

function normalizeDocScanResult(result) {
  const rawKeyPoints = Array.isArray(result?.key_points) ? result.key_points : [];
  const rawRisks = Array.isArray(result?.risks_or_notes) ? result.risks_or_notes : [];
  const rawQuestions = Array.isArray(result?.suggested_questions) ? result.suggested_questions : [];
  const rawActions = Array.isArray(result?.action_items) ? result.action_items : [];

  const key_points = rawKeyPoints.slice(0, 8).map((item, index) => {
    if (typeof item === "string") {
      return {
        label: `Điểm chính ${index + 1}`,
        value: item,
        importance: "medium",
      };
    }
    return {
      label: item?.label || `Điểm chính ${index + 1}`,
      value: item?.value || "",
      importance: normalizeImportance(item?.importance),
    };
  }).filter((item) => item.value);

  const risks_or_notes = rawRisks.slice(0, 5).map((item, index) => ({
    title: item?.title || `Điểm cần chú ý ${index + 1}`,
    detail: item?.detail || item?.body || "",
    severity: normalizeImportance(item?.severity || item?.level),
  })).filter((item) => item.detail);

  const suggested_questions = rawQuestions.slice(0, 5).filter(Boolean);
  const action_items = rawActions.slice(0, 4).filter(Boolean);

  const scorePenalty = risks_or_notes.reduce((total, item) => {
    if (item.severity === "high") return total + 18;
    if (item.severity === "medium") return total + 10;
    return total + 4;
  }, 0);
  const isUnreadFallback = String(result?.document_type || "").toLowerCase().includes("chưa đọc");
  const score = isUnreadFallback ? 0 : Math.max(55, Math.min(96, 92 - scorePenalty + Math.min(key_points.length, 4)));
  const highestRisk = risks_or_notes.some((item) => item.severity === "high")
    ? "high"
    : risks_or_notes.some((item) => item.severity === "medium")
      ? "medium"
      : "low";

  const summary =
    result?.summary ||
    "DocScan đã đọc nhanh tài liệu và gom lại những điểm quan trọng để bạn dễ kiểm tra.";

  return {
    document_type: result?.document_type || "Tài liệu",
    summary,
    key_points,
    risks_or_notes,
    suggested_questions,
    action_items,

    // Fields below keep the existing UI stable while the app moves to the new schema.
    score,
    verdict: summary,
    verdict_icon: isUnreadFallback ? "🔒" : highestRisk === "high" ? "⚠️" : highestRisk === "medium" ? "🔎" : "✅",
    risks: risks_or_notes.map((item) => ({
      level: item.severity,
      title: item.title,
      body: item.detail,
    })),
    keyPoints: key_points.map((item) => `${item.label}: ${item.value}`),
    questions: suggested_questions,
    plainSummary: [
      summary,
      action_items.length ? `Việc nên làm tiếp: ${action_items.join(" ")}` : "",
    ].filter(Boolean).join("\n\n"),
  };
}

function buildGeminiParts({ buffer, fileBase64, mimeType, fileName }) {
  if (NATIVE_FILE_TYPES.has(mimeType)) {
    return [
      { inlineData: { mimeType, data: cleanBase64(fileBase64) } },
      { text: `Phân tích tài liệu này.\nTên file: ${fileName}` },
    ];
  }

  if (XLSX_FILE_TYPES.has(mimeType)) {
    const text = extractExcel(buffer);
    return [{ text: `Phân tích tài liệu sau.\nTên file: ${fileName}\n\n${text}` }];
  }

  if (DOCX_FILE_TYPES.has(mimeType)) {
    return null;
  }

  if (TEXT_FILE_TYPES.has(mimeType)) {
    const text = extractTextFile(buffer);
    return [{ text: `Phân tích tài liệu sau.\nTên file: ${fileName}\n\n${text}` }];
  }

  return undefined;
}

async function callGemini({ apiKey, parts }) {
  const geminiResponse = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: DOCSCAN_SYSTEM_PROMPT }],
      },
      contents: [{ role: "user", parts }],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 2048,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!geminiResponse.ok) {
    const warning = await geminiResponse.text();
    return { ok: false, warning };
  }

  const data = await geminiResponse.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return { ok: true, text, parsed: safeJson(text) };
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const { fileBase64, mimeType, fileName = "tài liệu" } = request.body || {};
  const effectiveMimeType = inferMimeType(mimeType, fileName);
  const fallback = fallbackAnalysis({ fileName });

  if (!fileBase64 || !effectiveMimeType) {
    return response.status(200).json({ source: "fallback", data: fallback });
  }

  const cleanedBase64 = cleanBase64(fileBase64);
  const sizeBytes = Math.ceil((cleanedBase64.length * 3) / 4);
  if (sizeBytes > MAX_FILE_SIZE) {
    return response.status(400).json({ error: "File quá lớn. Bạn chọn file dưới 20MB giúp mình nhé." });
  }

  if (!apiKey) {
    return response.status(200).json({ source: "fallback", data: fallback });
  }

  try {
    const buffer = base64ToBuffer(cleanedBase64);
    let parts = buildGeminiParts({ buffer, fileBase64: cleanedBase64, mimeType: effectiveMimeType, fileName });

    if (parts === null) {
      const text = await extractDocx(buffer);
      parts = [{ text: `Phân tích tài liệu sau.\nTên file: ${fileName}\n\n${text}` }];
    }

    if (!parts) {
      return response.status(400).json({ error: "Loại file này chưa được hỗ trợ. Bạn dùng PDF, ảnh, Word, Excel, CSV hoặc TXT nhé." });
    }

    const firstTry = await callGemini({ apiKey, parts });
    if (!firstTry.ok) {
      return response.status(200).json({
        source: "fallback",
        warning: firstTry.warning.slice(0, 240),
        data: fallback,
      });
    }

    let parsed = firstTry.parsed;
    if (!parsed && firstTry.text) {
      const repairTry = await callGemini({
        apiKey,
        parts: [{
          text: `Hãy chuyển nội dung sau thành đúng JSON theo schema DocScan. Chỉ trả JSON hợp lệ.\n\n${firstTry.text}`,
        }],
      });
      parsed = repairTry.ok ? repairTry.parsed : null;
    }

    return response.status(200).json({
      source: parsed ? "gemini" : "fallback",
      data: parsed ? normalizeDocScanResult(parsed) : fallback,
    });
  } catch (error) {
    return response.status(200).json({
      source: "fallback",
      warning: error.message,
      data: fallback,
    });
  }
}
