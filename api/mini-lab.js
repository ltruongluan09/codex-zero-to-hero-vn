const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const labConfigs = {
  prompt: {
    title: "Lumi Bot viết lại prompt rõ hơn",
    task:
      "Biến yêu cầu còn mơ hồ của người dùng thành một prompt rõ ràng, dễ copy sang ChatGPT, Gemini hoặc Claude.",
    resultShape:
      "Trả kết quả gồm: (1) Prompt đã viết lại, (2) Vì sao prompt này rõ hơn, (3) Nếu muốn tốt hơn nữa thì nên bổ sung thông tin gì.",
    fields: ["goal", "context", "output"],
    fallback: ({ goal = "", context = "", output = "" }) => `Prompt gợi ý:

Tôi muốn bạn giúp tôi: ${goal || "[việc tôi cần làm]"}.

Bối cảnh:
${context || "- Tôi là người mới dùng AI.\n- Tôi muốn kết quả dễ hiểu và dùng được ngay."}

Kết quả tôi muốn nhận:
${output || "- Một bản trả lời rõ ràng, chia từng phần, có ví dụ cụ thể."}

Yêu cầu:
- Viết bằng tiếng Việt dễ hiểu.
- Nếu thiếu thông tin quan trọng, hãy hỏi tôi tối đa 3 câu trước khi làm.
- Không dùng thuật ngữ kỹ thuật khó hiểu.`,
  },
  email: {
    title: "Lumi Bot soạn email dễ nghe hơn",
    task: "Viết email tiếng Việt rõ ràng, lịch sự, tự nhiên cho dân văn phòng.",
    resultShape:
      "Trả kết quả gồm: (1) Tiêu đề email, (2) Bản email thân thiện, (3) Bản email trang trọng hơn, (4) Một câu nhắc người dùng nên sửa lại chi tiết nào trước khi gửi.",
    fields: ["recipient", "purpose", "details"],
    fallback: ({ recipient = "", purpose = "", details = "" }) => `Tiêu đề: Trao đổi về ${purpose || "nội dung cần xử lý"}

Chào ${recipient || "anh/chị"},

Mình gửi email này để trao đổi về ${purpose || "việc đang cần xử lý"}. Một số thông tin chính:
${details || "- Nội dung cần thống nhất\n- Thời gian mong muốn\n- Việc cần phản hồi"}

Nhờ anh/chị xem giúp và phản hồi khi thuận tiện.

Cảm ơn anh/chị.`,
  },
  meeting: {
    title: "Lumi Bot biến ghi chú họp thành việc cần làm",
    task: "Tóm tắt ghi chú họp thành quyết định, việc cần làm, người phụ trách, deadline và câu hỏi còn thiếu.",
    resultShape:
      "Trả kết quả gồm: (1) Tóm tắt 5 dòng, (2) Bảng việc cần làm với cột Việc / Người phụ trách / Deadline / Mức ưu tiên, (3) Điểm chưa rõ cần hỏi lại, (4) Tin nhắn ngắn có thể gửi vào group.",
    fields: ["notes"],
    fallback: ({ notes = "" }) => `Tóm tắt nhanh:
- Cuộc họp có một số nội dung cần được chuyển thành việc cụ thể.
- Cần xác nhận lại người phụ trách và thời hạn nếu ghi chú chưa rõ.

Việc cần làm:
1. Đọc lại ghi chú và đánh dấu các quyết định chính.
2. Tách từng việc cần làm thành một dòng riêng.
3. Hỏi lại team nếu thiếu người phụ trách hoặc deadline.

Ghi chú bạn đã nhập:
${notes || "[Chưa có ghi chú]"}`,
  },
  checklist: {
    title: "Lumi Bot chia việc thành checklist",
    task: "Biến một việc còn rối thành checklist đơn giản, có thứ tự, dễ bắt đầu cho người không chuyên.",
    resultShape:
      "Trả kết quả gồm: (1) Bức tranh tổng quát 3 dòng, (2) Checklist theo thứ tự, (3) 3 việc có thể bỏ qua ở bản đầu, (4) Bước đầu tiên nên làm trong 15 phút.",
    fields: ["task", "result", "constraints"],
    fallback: ({ task = "", result = "", constraints = "" }) => `Checklist bắt đầu:

Việc cần làm: ${task || "[việc của bạn]"}
Kết quả mong muốn: ${result || "[kết quả cuối cùng]"}
Lưu ý: ${constraints || "Ưu tiên làm bản đơn giản trước."}

1. Viết ra mục tiêu cuối cùng bằng 1 câu.
2. Liệt kê những gì đã có sẵn.
3. Chọn 3 việc nhỏ nhất có thể làm ngay hôm nay.
4. Làm bản nháp đầu tiên, chưa cần hoàn hảo.
5. Gửi cho một người xem thử và lấy góp ý.

Việc có thể bỏ qua ở bản đầu:
- Trang trí quá nhiều.
- Tính năng chưa cần ngay.
- Tự động hóa phức tạp.`,
  },
  imageDoc: {
    title: "Lumi Bot gợi ý cách hỏi AI khi có ảnh/tài liệu",
    task:
      "Tạo một prompt an toàn để người dùng dán vào AI khi muốn nhờ đọc ảnh, hóa đơn, hợp đồng, báo giá hoặc tài liệu.",
    resultShape:
      "Trả kết quả là một prompt hoàn chỉnh để đọc tài liệu, kèm 3 điểm cần AI kiểm tra kỹ: số tiền/ngày tháng, điểm rủi ro, phần không đọc rõ.",
    fields: ["docType", "need"],
    fallback: ({ docType = "", need = "" }) => `Prompt gợi ý:

Tôi sẽ gửi cho bạn một ${docType || "ảnh/tài liệu"}.

Tôi muốn bạn giúp tôi:
${need || "- Tóm tắt nội dung chính\n- Chỉ ra điểm cần chú ý\n- Gợi ý câu hỏi nên hỏi lại"}

Quy tắc:
- Không tự bịa thông tin nếu ảnh/tài liệu không rõ.
- Nếu có số tiền, ngày tháng, điều khoản hoặc deadline, hãy trích ra riêng.
- Nếu có điểm rủi ro, hãy giải thích bằng tiếng Việt dễ hiểu.
- Nếu thiếu thông tin, hãy nói rõ phần nào chưa chắc chắn.`,
  },
  salesPost: {
    title: "Lumi Bot viết bài bán hàng gần gũi hơn",
    task: "Viết bài đăng bán hàng tiếng Việt tự nhiên, không quá quảng cáo, dùng được cho Facebook/TikTok.",
    resultShape:
      "Trả kết quả gồm: (1) 3 câu mở đầu để chọn, (2) Một bài Facebook 120-180 chữ, (3) Một caption TikTok ngắn hơn, (4) 5 hashtag dễ dùng, (5) Một gợi ý chỉnh lại cho đúng giọng người bán.",
    fields: ["product", "customer", "benefit"],
    fallback: ({ product = "", customer = "", benefit = "" }) => `Bài đăng mẫu:

Nếu bạn là ${customer || "người đang cần một lựa chọn đơn giản hơn"}, ${product || "sản phẩm này"} có thể là thứ đáng thử.

Điểm mình thích nhất là: ${benefit || "nó giúp giải quyết một việc nhỏ nhưng gặp mỗi ngày"}.

Không cần làm gì phức tạp. Bạn chỉ cần thử theo cách đơn giản nhất, rồi xem nó có hợp với nhu cầu thật của mình không.

Nếu cần, mình có thể gửi thêm thông tin chi tiết để bạn tham khảo nhé.`,
  },
};

function safeString(value, max = 3000) {
  return String(value || "").trim().slice(0, max);
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

function fallbackResponse(type, inputs) {
  const config = labConfigs[type] || labConfigs.prompt;
  return {
    source: "fallback",
    title: config.title,
    result: config.fallback(inputs),
    tips: [
      "Bạn có thể copy kết quả này sang ChatGPT, Gemini hoặc Claude.",
      "Nếu muốn hay hơn, hãy thêm bối cảnh thật của công việc bạn đang làm.",
    ],
  };
}

function buildPrompt(config, inputs) {
  return `
Bạn là Lumi Bot của Lumi Labs.
Người dùng là người Việt không chuyên kỹ thuật, mới bắt đầu dùng AI trong công việc.

Nhiệm vụ:
${config.task}

Kết quả mong muốn:
${config.resultShape || "Tạo kết quả rõ ràng, có thể copy dùng ngay."}

Thông tin người dùng nhập:
${JSON.stringify(inputs, null, 2)}

Yêu cầu cách trả lời:
- Dùng tiếng Việt tự nhiên, dễ hiểu.
- Không dùng thuật ngữ kỹ thuật khó.
- Kết quả phải có thể copy và dùng ngay.
- Nếu thông tin còn thiếu, vẫn tạo bản nháp hữu ích nhưng ghi nhẹ nhàng rằng người dùng có thể bổ sung.
- Không nói "là một AI".

Chỉ trả JSON hợp lệ theo schema:
{
  "title": "Tiêu đề ngắn cho kết quả",
  "result": "Nội dung chính người dùng có thể copy dùng ngay",
  "tips": ["Mẹo ngắn 1", "Mẹo ngắn 2"]
}
`;
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const { type = "prompt", inputs = {} } = request.body || {};
  const config = labConfigs[type] || labConfigs.prompt;
  const cleanedInputs = Object.fromEntries(
    config.fields.map((field) => [field, safeString(inputs[field])]),
  );

  if (!Object.values(cleanedInputs).some(Boolean)) {
    return response.status(400).json({
      error: "Bạn nhập vài dòng để Lumi Bot có đủ thông tin làm mẫu nhé.",
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return response.status(200).json(fallbackResponse(type, cleanedInputs));
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
            parts: [{ text: buildPrompt(config, cleanedInputs) }],
          },
        ],
        generationConfig: {
          temperature: 0.72,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!geminiResponse.ok) {
      return response.status(200).json(fallbackResponse(type, cleanedInputs));
    }

    const data = await geminiResponse.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const parsed = safeJson(text);

    if (!parsed?.result) {
      return response.status(200).json(fallbackResponse(type, cleanedInputs));
    }

    return response.status(200).json({
      source: "gemini",
      title: safeString(parsed.title, 120) || config.title,
      result: safeString(parsed.result, 8000),
      tips: Array.isArray(parsed.tips) ? parsed.tips.map((tip) => safeString(tip, 180)).filter(Boolean).slice(0, 3) : [],
    });
  } catch {
    return response.status(200).json(fallbackResponse(type, cleanedInputs));
  }
}
