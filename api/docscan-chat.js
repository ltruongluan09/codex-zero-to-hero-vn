import { checkRateLimitSmart, rateLimitResponse } from "./_rate-limit.js";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const MAX_CONTEXT_CHARS = 28000;
const MAX_ANALYSIS_CHARS = 8000;

function clampText(value = "", max = MAX_CONTEXT_CHARS) {
  const text = String(value || "").trim();
  if (text.length <= max) return text;
  const head = text.slice(0, Math.floor(max * 0.62));
  const tail = text.slice(-Math.floor(max * 0.32));
  return `${head}\n\n[...đã rút gọn phần giữa để Lumi đọc nhanh hơn...]\n\n${tail}`;
}

function safeJson(text = "") {
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

function normalizeSearchText(value = "") {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

function buildLocalAnswer({ question, analysisSummary, extractedText }) {
  const normalizedQuestion = normalizeSearchText(question);
  const context = `${analysisSummary || ""}\n${extractedText || ""}`.trim();
  const normalizedContext = normalizeSearchText(context);
  const looseQuestion = String(question || "").toLowerCase();
  const looseContext = String(context || "").toLowerCase();

  if (!context) {
    return {
      status: "not_found",
      answer: "Mình chưa thấy đủ nội dung tài liệu để trả lời câu này. Bạn thử upload lại file rõ hơn nhé.",
      evidence: "",
      suggested_next_question: "Lumi đã đọc được những phần nào trong tài liệu này?",
    };
  }

  if (
    normalizedQuestion.includes("rui ro") ||
    normalizedQuestion.includes("can chu y") ||
    looseQuestion.includes("ro") ||
    looseQuestion.includes("risk")
  ) {
    const hasRiskSignal =
      /(rui ro|phat|mat coc|deadline|gia han|thanh toan|chi phi|boi thuong|cham dut|penalty|deposit|rent|terminate)/i.test(normalizedContext) ||
      /(ph|cọc|coc|tiền|tien|deadline|gia hạn|gia han|thanh toán|thanh toan|chi phí|chi phi|penalty|deposit|rent|terminate)/i.test(looseContext);
    const riskMatch = context.match(/(?:rủi ro|phạt|mất cọc|deadline|gia hạn|thanh toán|chi phí|bồi thường|chấm dứt)[^\n.]{0,180}/i);
    return {
      status: riskMatch || hasRiskSignal ? "needs_check" : "not_found",
      answer: riskMatch
        ? `Mình thấy có điểm nên kiểm tra lại: ${riskMatch[0].trim()}. Bạn nên đối chiếu phần này trước khi ký, gửi hoặc duyệt tài liệu.`
        : hasRiskSignal
          ? "Mình thấy tài liệu có nhắc đến các phần dễ ảnh hưởng quyết định như phạt, chấm dứt, chi phí hoặc thời hạn. Bạn nên kiểm tra lại các mục này trước khi ký, gửi hoặc duyệt tài liệu."
          : "Mình chưa thấy rủi ro rõ trong phần tài liệu vừa đọc. Bạn vẫn nên kiểm tra lại các mục tiền, ngày tháng, người chịu trách nhiệm và điều kiện thanh toán.",
      evidence: riskMatch?.[0] || "",
      suggested_next_question: "Có câu nào nên hỏi lại bên gửi tài liệu không?",
    };
  }

  if (normalizedQuestion.includes("5 dong") || normalizedQuestion.includes("sep") || normalizedQuestion.includes("tom tat")) {
    const compact = context
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 5)
      .join("\n");
    return {
      status: "found",
      answer: compact || "Mình chưa thấy đủ nội dung để tóm tắt chắc chắn.",
      evidence: compact ? "Dựa trên phần nội dung DocScan đã đọc được." : "",
      suggested_next_question: "Điểm nào cần kiểm tra trước khi gửi tiếp?",
    };
  }

  return {
    status: "needs_check",
    answer: "Mình sẽ trả lời dựa trên phần tài liệu đã đọc: hiện mình thấy nội dung chính nằm ở phần tóm tắt và các điểm cần chú ý. Nếu câu hỏi cần thông tin cụ thể hơn, bạn hỏi theo mẫu: “Trong tài liệu có nhắc đến [vấn đề] không?” nhé.",
    evidence: "Dựa trên bản phân tích DocScan hiện có.",
    suggested_next_question: "Có thông tin nào còn thiếu hoặc cần hỏi lại không?",
  };
}

function buildPrompt({ question, analysisSummary, extractedText }) {
  return `
Bạn là Lumi, trợ lý đọc tài liệu của Lumi Labs.

Nhiệm vụ:
- Trả lời câu hỏi của người dùng CHỈ dựa trên DOCUMENT_TEXT và DOCSCAN_ANALYSIS bên dưới.
- Không dùng kiến thức ngoài tài liệu.
- Không suy đoán, không bịa, không tự thêm điều khoản.
- Nếu trong tài liệu không có thông tin để trả lời, hãy nói rõ: "Mình chưa thấy thông tin này trong tài liệu vừa đọc."
- Viết tiếng Việt đời thường, ngắn, rõ, dành cho người không chuyên.
- Nếu có căn cứ, trích lại 1 đoạn ngắn hoặc nhắc vị trí nội dung liên quan.

Trả về JSON hợp lệ, không markdown:
{
  "status": "found" | "not_found" | "needs_check",
  "answer": "câu trả lời ngắn, dễ hiểu",
  "evidence": "căn cứ rất ngắn nếu có",
  "suggested_next_question": "một câu hỏi tiếp theo hữu ích"
}

QUESTION:
${question}

DOCSCAN_ANALYSIS:
${analysisSummary || "(không có phân tích bổ sung)"}

DOCUMENT_TEXT:
${extractedText || "(không có văn bản gốc)"}
`;
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const {
    question = "",
    extractedText = "",
    analysisSummary = "",
  } = request.body || {};

  const cleanQuestion = String(question || "").trim();
  const cleanExtractedText = clampText(extractedText, MAX_CONTEXT_CHARS);
  const cleanAnalysisSummary = clampText(analysisSummary, MAX_ANALYSIS_CHARS);

  if (!cleanQuestion) {
    return response.status(400).json({ error: "Bạn hỏi Lumi một câu ngắn trước nhé." });
  }

  if (cleanQuestion.length > 500) {
    return response.status(400).json({ error: "Câu hỏi hơi dài. Bạn rút gọn lại một chút để Lumi đọc chính xác hơn nhé." });
  }

  if (!cleanExtractedText && !cleanAnalysisSummary) {
    return response.status(400).json({ error: "Lumi chưa có nội dung tài liệu để trả lời." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return response.status(200).json({
      source: "fallback",
      ...buildLocalAnswer({
        question: cleanQuestion,
        analysisSummary: cleanAnalysisSummary,
        extractedText: cleanExtractedText,
      }),
    });
  }

  const limit = await checkRateLimitSmart(request, { key: "docscan-chat", max: 12 });
  if (!limit.allowed) {
    return rateLimitResponse(response, limit);
  }

  try {
    const geminiResponse = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: buildPrompt({
                  question: cleanQuestion,
                  analysisSummary: cleanAnalysisSummary,
                  extractedText: cleanExtractedText,
                }),
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.15,
          responseMimeType: "application/json",
          maxOutputTokens: 900,
        },
      }),
    });

    if (!geminiResponse.ok) {
      return response.status(200).json({
        source: "fallback",
        ...buildLocalAnswer({
          question: cleanQuestion,
          analysisSummary: cleanAnalysisSummary,
          extractedText: cleanExtractedText,
        }),
      });
    }

    const data = await geminiResponse.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const parsed = safeJson(text);

    if (!parsed?.answer) {
      return response.status(200).json({
        source: "fallback",
        ...buildLocalAnswer({
          question: cleanQuestion,
          analysisSummary: cleanAnalysisSummary,
          extractedText: cleanExtractedText,
        }),
      });
    }

    return response.status(200).json({
      source: "gemini",
      status: ["found", "not_found", "needs_check"].includes(parsed.status) ? parsed.status : "needs_check",
      answer: String(parsed.answer || "").trim(),
      evidence: String(parsed.evidence || "").trim(),
      suggested_next_question: String(parsed.suggested_next_question || "").trim(),
    });
  } catch (error) {
    return response.status(200).json({
      source: "fallback",
      warning: error.message,
      ...buildLocalAnswer({
        question: cleanQuestion,
        analysisSummary: cleanAnalysisSummary,
        extractedText: cleanExtractedText,
      }),
    });
  }
}
