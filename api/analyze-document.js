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

const GEMINI_MODELS = ["gemini-2.5-flash", "gemini-2.0-flash"];
const MAX_FILE_SIZE = 20 * 1024 * 1024;
const MAX_TEXT_CHARS = 150000;
const MAX_EXCEL_ROWS_PER_SHEET = 120;
const MAX_EXCEL_COLS = 18;

const NATIVE_FILE_TYPES = new Set(SUPPORTED_DOCUMENT_TYPES.native);
const TEXT_FILE_TYPES = new Set(SUPPORTED_DOCUMENT_TYPES.text);
const XLSX_FILE_TYPES = new Set(SUPPORTED_DOCUMENT_TYPES.xlsx);
const DOCX_FILE_TYPES = new Set(SUPPORTED_DOCUMENT_TYPES.docx);

function geminiUrl(model) {
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
}

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
    extracted_text: "",
    one_line_answer: `DocScan đã nhận file "${fileName}", nhưng chưa phân tích được nội dung thật.`,
    summary:
      "Kết quả này chỉ là trạng thái an toàn, không phải nhận xét về tài liệu của bạn. DocScan sẽ không đưa ra kết luận khi chưa có dữ liệu đủ tin cậy.",
    top_3_takeaways: [
      {
        title: "Chưa có phân tích thật",
        detail: "AI chưa trả về kết quả bám theo nội dung file.",
        importance: "high",
      },
      {
        title: "Không phán bừa",
        detail: "DocScan không tự tạo rủi ro hoặc kết luận nếu chưa đọc được tài liệu.",
        importance: "high",
      },
      {
        title: "Thử lại",
        detail: "Hãy thử file rõ hơn, nhỏ hơn 20MB hoặc thử lại sau ít phút.",
        importance: "medium",
      },
    ],
    important_details: [
      { label: "Tên file", value: fileName },
      { label: "Trạng thái", value: "Chưa đọc được nội dung thật" },
    ],
    red_flags: [
      {
        title: "Chưa có nhận xét từ nội dung thật",
        detail: "Lumi Bot chưa đọc được nội dung bên trong file, nên chưa thể chỉ ra điểm cần chú ý cụ thể.",
        severity: "medium",
      },
    ],
    missing_information: ["Chưa có nội dung đủ tin cậy để phân tích."],
    questions_to_ask: [
      "File này có đúng định dạng được hỗ trợ không?",
      "Tài liệu có bị mờ, scan lệch hoặc quá nặng không?",
      "Nếu thử lại vẫn lỗi, Lumi Labs có cần kiểm tra kết nối AI không?",
    ],
    next_actions: [
      "Thử upload lại file rõ hơn hoặc nhỏ hơn 20MB.",
      "Nếu vẫn chưa được, hãy thử lại sau ít phút.",
    ],
    evidence_snippets: [],
    confidence: {
      score: 0,
      reason: "Chưa có phân tích thật từ nội dung tài liệu.",
    },
    copy_ready_summary:
      "DocScan đã nhận file nhưng chưa đọc được nội dung thật. Chưa nên dùng kết quả này để ra quyết định. Hãy thử lại với file rõ hơn hoặc kiểm tra lại kết nối AI.",
  });
}

function base64ToBuffer(base64) {
  return Buffer.from(base64.replace(/^data:.*;base64,/, ""), "base64");
}

function cleanBase64(base64) {
  return String(base64 || "").replace(/^data:.*;base64,/, "");
}

function cleanExtractedText(text = "") {
  return String(text)
    .replace(/\r/g, "\n")
    .replace(/\t/g, " ")
    .replace(/[ \u00a0]{2,}/g, " ")
    .replace(/\n[ \u00a0]+/g, "\n")
    .replace(/[ \u00a0]+\n/g, "\n")
    .replace(/\n{4,}/g, "\n\n")
    .trim()
    .slice(0, MAX_TEXT_CHARS);
}

function uniq(values, limit = 12) {
  return [...new Set(values.filter(Boolean).map((value) => String(value).trim()).filter(Boolean))].slice(0, limit);
}

function findMatches(text, regex, limit = 12) {
  return uniq([...String(text).matchAll(regex)].map((match) => match[0]), limit);
}

function detectLikelyType({ fileName, mimeType, text = "" }) {
  const haystack = `${fileName} ${text.slice(0, 12000)}`.toLowerCase();
  const checks = [
    ["contract", ["hợp đồng", "điều khoản", "bên a", "bên b", "chấm dứt", "phạt", "nghĩa vụ"]],
    ["quotation", ["báo giá", "quotation", "quote", "đơn giá", "thành tiền", "vat", "bảo hành"]],
    ["invoice", ["hóa đơn", "invoice", "mã số thuế", "tổng cộng", "thanh toán"]],
    ["cv", ["cv", "curriculum", "ứng viên", "kinh nghiệm", "học vấn", "kỹ năng"]],
    ["report", ["báo cáo", "kết quả", "phân tích", "tổng quan", "kpi", "doanh thu"]],
    ["technical", ["technical", "kiến trúc", "api", "deploy", "frontend", "backend", "database", "mvp"]],
    ["spreadsheet", ["sheet:", "doanh số", "số lượng", "stock", "inventory"]],
  ];
  const found = checks.find(([, keywords]) => keywords.some((keyword) => haystack.includes(keyword)));
  if (found) return found[0];
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel")) return "spreadsheet";
  if (mimeType.includes("image")) return "image_document";
  if (mimeType.includes("pdf")) return "pdf_document";
  return "general_document";
}

function extractSignals(text = "") {
  const cleanText = String(text);
  return {
    money: findMatches(cleanText, /(?:\d[\d.,\s]{2,}\s?(?:vnd|vnđ|đ|usd|eur)|(?:vnd|vnđ|usd|eur)\s?\d[\d.,\s]{2,})/gi, 10),
    dates: findMatches(cleanText, /\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}[/-]\d{1,2}[/-]\d{1,2}|ngày\s+\d{1,2}\s+tháng\s+\d{1,2}(?:\s+năm\s+\d{4})?)\b/gi, 12),
    percentages: findMatches(cleanText, /\b\d{1,3}(?:[.,]\d+)?\s?%/g, 10),
    emails: findMatches(cleanText, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, 8),
    phones: findMatches(cleanText, /\b(?:\+?84|0)(?:\s?\d){8,10}\b/g, 8),
    deadline_terms: findMatches(cleanText, /\b(?:deadline|thời hạn|hạn chót|ngày giao|ngày hết hạn|hiệu lực|bàn giao|thanh toán)\b/gi, 12),
    risk_terms: findMatches(cleanText, /\b(?:phạt|bồi thường|chấm dứt|không hoàn|phụ phí|trễ hạn|bảo mật|cam kết|trách nhiệm|điều kiện)\b/gi, 12),
  };
}

function buildDocumentProfile({ fileName, mimeType, text = "", sizeBytes = 0 }) {
  const signals = extractSignals(text);
  const likelyType = detectLikelyType({ fileName, mimeType, text });
  const headings = cleanExtractedText(text)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length >= 4 && line.length <= 90)
    .filter((line) => /^[A-Z0-9IVX]|^\d+\.|^Chương|^Mục|^Điều|^Phần/i.test(line))
    .slice(0, 18);

  return {
    file_name: fileName,
    mime_type: mimeType,
    size_kb: Math.round(sizeBytes / 1024),
    likely_document_type: likelyType,
    extracted_characters: text.length,
    detected_headings: uniq(headings, 18),
    detected_signals: signals,
  };
}

function buildAnalysisText({ profile, text }) {
  return [
    "Hãy phân tích tài liệu sau bằng DocScan AI.",
    "",
    "DOCUMENT_PROFILE:",
    JSON.stringify(profile, null, 2),
    "",
    "NỘI DUNG ĐÃ TIỀN XỬ LÝ:",
    text || "(Không có text trích xuất. Nếu là PDF/ảnh, hãy đọc trực tiếp từ file đính kèm.)",
  ].join("\n");
}

function extractTextFile(buffer) {
  return cleanExtractedText(buffer.toString("utf8"));
}

function formatCell(value) {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).replace(/\s+/g, " ").trim();
}

function extractExcel(buffer) {
  const workbook = XLSX.read(buffer, { type: "buffer", cellDates: true });
  const sheetTexts = workbook.SheetNames.slice(0, 8).map((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "", raw: false })
      .map((row) => row.map(formatCell).slice(0, MAX_EXCEL_COLS))
      .filter((row) => row.some(Boolean));

    if (!rows.length) return `Sheet: ${sheetName}\n(Trống)`;

    const header = rows[0];
    const body = rows.slice(1, MAX_EXCEL_ROWS_PER_SHEET + 1);
    const table = body.map((row, index) => {
      const cells = row.map((cell, cellIndex) => {
        const label = header[cellIndex] || `Cột ${cellIndex + 1}`;
        return `${label}: ${cell || "-"}`;
      });
      return `Dòng ${index + 1}: ${cells.join(" | ")}`;
    });

    return [
      `Sheet: ${sheetName}`,
      `Số dòng có dữ liệu: ${rows.length}`,
      `Header: ${header.filter(Boolean).join(" | ") || "(không rõ)"}`,
      ...table,
    ].join("\n");
  });

  return cleanExtractedText(sheetTexts.join("\n\n---\n\n"));
}

async function extractDocx(buffer) {
  const result = await mammoth.extractRawText({ buffer });
  return cleanExtractedText(result.value || "");
}

function safeJson(text) {
  if (!text) return null;
  const cleaned = String(text)
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(cleaned.slice(start, end + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

function normalizeImportance(value) {
  return ["high", "medium", "low"].includes(value) ? value : "medium";
}

function normalizeStringArray(values, limit = 5) {
  return Array.isArray(values) ? values.filter(Boolean).map(String).slice(0, limit) : [];
}

function normalizeCardArray(values, { titleKey = "title", detailKey = "detail", limit = 5 } = {}) {
  if (!Array.isArray(values)) return [];
  return values.slice(0, limit).map((item, index) => {
    if (typeof item === "string") {
      return {
        title: `Mục ${index + 1}`,
        detail: item,
        importance: "medium",
        severity: "medium",
      };
    }
    return {
      title: item?.[titleKey] || item?.label || `Mục ${index + 1}`,
      detail: item?.[detailKey] || item?.value || item?.body || "",
      importance: normalizeImportance(item?.importance),
      severity: normalizeImportance(item?.severity || item?.level),
    };
  }).filter((item) => item.detail);
}

function normalizeDetails(values) {
  if (!Array.isArray(values)) return [];
  return values.slice(0, 8).map((item, index) => {
    if (typeof item === "string") return { label: `Chi tiết ${index + 1}`, value: item };
    return {
      label: item?.label || `Chi tiết ${index + 1}`,
      value: item?.value || "",
    };
  }).filter((item) => item.value);
}

function normalizeDocScanResult(result, { extractedText = "" } = {}) {
  const top_3_takeaways = normalizeCardArray(
    result?.top_3_takeaways || result?.key_points,
    { titleKey: "title", detailKey: "detail", limit: 3 },
  );
  const important_details = normalizeDetails(result?.important_details);
  const red_flags = normalizeCardArray(
    result?.red_flags || result?.risks_or_notes,
    { titleKey: "title", detailKey: "detail", limit: 5 },
  );
  const missing_information = normalizeStringArray(result?.missing_information, 5);
  const questions_to_ask = normalizeStringArray(result?.questions_to_ask || result?.suggested_questions, 5);
  const next_actions = normalizeStringArray(result?.next_actions || result?.action_items, 4);
  const evidence_snippets = normalizeStringArray(result?.evidence_snippets, 5)
    .map((snippet) => snippet.split(/\s+/).slice(0, 24).join(" "));
  const normalizedExtractedText = cleanExtractedText(result?.extracted_text || extractedText || "");

  const isUnreadFallback = String(result?.document_type || "").toLowerCase().includes("chưa đọc");
  const confidenceScore = Number(result?.confidence?.score);
  const score = isUnreadFallback
    ? 0
    : Number.isFinite(confidenceScore)
      ? Math.max(0, Math.min(100, Math.round(confidenceScore)))
      : Math.max(58, Math.min(94, 88 - red_flags.length * 7 - missing_information.length * 4 + evidence_snippets.length * 2));

  const highestRisk = red_flags.some((item) => item.severity === "high")
    ? "high"
    : red_flags.some((item) => item.severity === "medium")
      ? "medium"
      : "low";

  const summary =
    result?.summary ||
    result?.one_line_answer ||
    "DocScan đã đọc tài liệu và gom lại những điểm quan trọng để bạn dễ kiểm tra.";

  const one_line_answer = result?.one_line_answer || summary;

  return {
    document_type: result?.document_type || "Tài liệu",
    extracted_text: normalizedExtractedText,
    one_line_answer,
    summary,
    top_3_takeaways,
    important_details,
    red_flags,
    missing_information,
    questions_to_ask,
    next_actions,
    evidence_snippets,
    confidence: {
      score,
      reason: result?.confidence?.reason || (isUnreadFallback ? "Chưa có phân tích thật từ nội dung tài liệu." : "Đã phân tích dựa trên nội dung đọc được."),
    },
    copy_ready_summary:
      result?.copy_ready_summary ||
      [
        one_line_answer,
        top_3_takeaways.length ? `Điểm chính: ${top_3_takeaways.map((item) => item.title).join("; ")}` : "",
        red_flags.length ? `Cần chú ý: ${red_flags.map((item) => item.title).join("; ")}` : "",
        next_actions.length ? `Việc tiếp theo: ${next_actions.join(" ")}` : "",
      ].filter(Boolean).join("\n"),

    // Compatibility fields for the current UI.
    score,
    verdict: one_line_answer,
    verdict_icon: isUnreadFallback ? "🔒" : highestRisk === "high" ? "⚠️" : highestRisk === "medium" ? "🔎" : "✅",
    key_points: top_3_takeaways.map((item) => ({
      label: item.title,
      value: item.detail,
      importance: item.importance,
    })),
    risks: red_flags.map((item) => ({
      level: item.severity,
      title: item.title,
      body: item.detail,
    })),
    questions: questions_to_ask,
    action_items: next_actions,
    plainSummary: result?.copy_ready_summary || summary,
  };
}

function buildGeminiParts({ buffer, fileBase64, mimeType, fileName, sizeBytes }) {
  if (NATIVE_FILE_TYPES.has(mimeType)) {
    const profile = buildDocumentProfile({ fileName, mimeType, text: "", sizeBytes });
    return {
      extractedText: "",
      parts: [
        { inlineData: { mimeType, data: cleanBase64(fileBase64) } },
        {
          text: [
            "Hãy đọc trực tiếp file đính kèm trước. Nếu là ảnh/PDF scan, hãy OCR bằng khả năng nhìn của bạn.",
            "Sau đó phân tích theo schema DocScan.",
            "",
            "DOCUMENT_PROFILE:",
            JSON.stringify(profile, null, 2),
          ].join("\n"),
        },
      ],
    };
  }

  if (XLSX_FILE_TYPES.has(mimeType)) {
    const text = extractExcel(buffer);
    const profile = buildDocumentProfile({ fileName, mimeType, text, sizeBytes });
    return { extractedText: text, parts: [{ text: buildAnalysisText({ profile, text }) }] };
  }

  if (DOCX_FILE_TYPES.has(mimeType)) {
    return null;
  }

  if (TEXT_FILE_TYPES.has(mimeType)) {
    const text = extractTextFile(buffer);
    const profile = buildDocumentProfile({ fileName, mimeType, text, sizeBytes });
    return { extractedText: text, parts: [{ text: buildAnalysisText({ profile, text }) }] };
  }

  return undefined;
}

async function callGemini({ apiKey, parts, systemPrompt = DOCSCAN_SYSTEM_PROMPT }) {
  const warnings = [];

  for (const model of GEMINI_MODELS) {
    try {
      const geminiResponse = await fetch(geminiUrl(model), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: [{ role: "user", parts }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 4096,
            responseMimeType: "application/json",
          },
        }),
      });

      if (!geminiResponse.ok) {
        const warning = await geminiResponse.text();
        warnings.push(`${model}: ${warning.slice(0, 220)}`);
        continue;
      }

      const data = await geminiResponse.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      return { ok: true, model, text, parsed: safeJson(text) };
    } catch (error) {
      warnings.push(`${model}: ${error.message}`);
    }
  }

  return { ok: false, warning: warnings.join(" | ") };
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
    const built = buildGeminiParts({
      buffer,
      fileBase64: cleanedBase64,
      mimeType: effectiveMimeType,
      fileName,
      sizeBytes,
    });
    let parts;
    let extractedTextForResponse = "";

    if (built === null) {
      const text = await extractDocx(buffer);
      const profile = buildDocumentProfile({ fileName, mimeType: effectiveMimeType, text, sizeBytes });
      extractedTextForResponse = text;
      parts = [{ text: buildAnalysisText({ profile, text }) }];
    } else if (built) {
      extractedTextForResponse = built.extractedText || "";
      parts = built.parts;
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
        systemPrompt: "Bạn chỉ chuyển nội dung sang JSON hợp lệ. Không thêm markdown.",
        parts: [{
          text: `Hãy chuyển nội dung sau thành đúng JSON theo schema DocScan. Chỉ trả JSON hợp lệ.\n\n${firstTry.text}`,
        }],
      });
      parsed = repairTry.ok ? repairTry.parsed : null;
    }

    return response.status(200).json({
      source: parsed ? "gemini" : "fallback",
      model: firstTry.model,
      data: parsed ? normalizeDocScanResult(parsed, { extractedText: extractedTextForResponse }) : fallback,
    });
  } catch (error) {
    return response.status(200).json({
      source: "fallback",
      warning: error.message,
      data: fallback,
    });
  }
}
