import { checkRateLimitSmart, rateLimitResponse } from "./_rate-limit.js";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const labConfigs = {
  prompt: {
    title: "Lumi Bot viết lại lời nhờ việc rõ hơn",
    task:
      "Biến yêu cầu còn mơ hồ của người dùng thành một lời nhờ việc rõ ràng, dễ copy sang công cụ trò chuyện thông minh.",
    resultShape:
      "Trả kết quả gồm: (1) Câu nhờ việc đã viết lại, (2) Vì sao câu này rõ hơn, (3) Nếu muốn tốt hơn nữa thì nên bổ sung thông tin gì.",
    fields: ["brief"],
    fallback: ({ brief = "" }) => `Câu nhờ việc rõ hơn:

Tôi muốn bạn giúp tôi xử lý việc này: ${brief || "[việc tôi cần làm]"}.

Bối cảnh:
- Tôi là người mới dùng công cụ trợ lý thông minh.
- Tôi muốn kết quả dễ hiểu và dùng được ngay.

Kết quả tôi muốn nhận:
- Một bản trả lời rõ ràng, chia từng phần, có ví dụ cụ thể.

Yêu cầu:
- Viết bằng tiếng Việt dễ hiểu.
- Nếu thiếu thông tin quan trọng, hãy hỏi tôi tối đa 3 câu trước khi làm.
- Không dùng thuật ngữ kỹ thuật khó hiểu.`,
  },
  email: {
    title: "Lumi Bot soạn email HR sẵn gửi",
    task: "Viết email tiếng Việt rõ ràng, lịch sự, tự nhiên cho HR, sales, manager hoặc nhân viên văn phòng. Người dùng chỉ mô tả tình huống bằng một câu. Nếu thiếu tên, ngày giờ hoặc vị trí thì dùng cách viết trung tính, không dùng placeholder kiểu [Tên] hoặc [Ngày].",
    resultShape:
      "Trả kết quả theo đúng thứ tự: (1) Tiêu đề: một dòng cụ thể, (2) Email sẵn gửi: 5-8 câu, đủ lịch sự và có thể copy dùng ngay, (3) Tin nhắn Zalo ngắn: 1-2 câu ngắn gọn để copy gửi ngay. Không dùng placeholder trong ngoặc vuông. Không tự nói 'bạn có thể rút gọn'. Không giải thích dài.",
    fields: ["brief"],
    fallback: ({ brief = "" }) => {
      const lower = String(brief || "").toLowerCase();
      const isReschedule = lower.includes("dời") || lower.includes("đổi lịch") || lower.includes("chuyển");
      const title = isReschedule ? "Xin phép điều chỉnh lịch phỏng vấn" : "Xác nhận lịch phỏng vấn";
      return `Tiêu đề: ${title}

Chào anh/chị,

Mình gửi email này để trao đổi về việc: ${brief || "xác nhận lại lịch phỏng vấn"}.

Để hai bên sắp xếp thuận tiện hơn, nhờ anh/chị xác nhận giúp thời gian phù hợp hoặc phản hồi nếu cần điều chỉnh.

Mình sẽ cập nhật lại lịch và gửi thông tin chi tiết ngay sau khi nhận được xác nhận.

Cảm ơn anh/chị rất nhiều.

Tin nhắn Zalo ngắn:
"Mình đã gửi email về việc ${brief || "xác nhận lịch phỏng vấn"}. Anh/chị xem giúp và phản hồi khi thuận tiện nhé."`;
    },
  },
  meeting: {
    title: "Lumi Bot biến ghi chú họp thành việc cần làm",
    task: "Tóm tắt ghi chú họp thành quyết định, việc cần làm, người phụ trách, deadline và câu hỏi còn thiếu.",
    resultShape:
      "Trả kết quả gồm: (1) Tóm tắt 5 dòng, (2) Bảng việc cần làm với cột Việc / Người phụ trách / Deadline / Mức ưu tiên, (3) Điểm chưa rõ cần hỏi lại, (4) Tin nhắn ngắn có thể gửi vào group.",
    fields: ["brief"],
    fallback: ({ brief = "" }) => `Tóm tắt nhanh:
- Cuộc họp có một số nội dung cần được chuyển thành việc cụ thể.
- Cần xác nhận lại người phụ trách và thời hạn nếu ghi chú chưa rõ.

Việc cần làm:
1. Đọc lại ghi chú và đánh dấu các quyết định chính.
2. Tách từng việc cần làm thành một dòng riêng.
3. Hỏi lại team nếu thiếu người phụ trách hoặc deadline.

Ghi chú bạn đã nhập:
${brief || "[Chưa có ghi chú]"}`,
  },
  checklist: {
    title: "Lumi Bot chia việc thành checklist",
    task: "Biến một việc còn rối thành checklist đơn giản, có thứ tự, dễ bắt đầu cho người không chuyên.",
    resultShape:
      "Trả kết quả gồm: (1) Bức tranh tổng quát 3 dòng, (2) Checklist theo thứ tự, (3) 3 việc có thể bỏ qua ở bản đầu, (4) Bước đầu tiên nên làm trong 15 phút.",
    fields: ["brief"],
    fallback: ({ brief = "" }) => `Checklist bắt đầu:

Việc cần làm: ${brief || "[việc của bạn]"}
Lưu ý: Ưu tiên làm bản đơn giản trước.

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
    title: "Lumi Bot đọc nhanh tình huống tài liệu",
    task:
      "Dựa trên tình huống người dùng mô tả, tạo một bản đọc thử tài liệu theo cách dễ hiểu cho nhân viên văn phòng, bán hàng, HR hoặc manager.",
    resultShape:
      "Trả kết quả gồm: (1) Tài liệu này có thể là gì, (2) Nên nhìn vào 3 điểm nào trước, (3) Câu nên hỏi lại người gửi, (4) Việc nên làm tiếp. Viết như Lumi đang hướng dẫn người mới, không dùng thuật ngữ khó.",
    fields: ["brief"],
    fallback: ({ brief = "" }) => `Lumi đọc nhanh cho bạn:

Tình huống bạn đưa:
${brief || "[Bạn đang có một tài liệu cần đọc nhanh]"}

1. Việc nên xem trước
- Tài liệu này có thể chứa thông tin cần kiểm tra như số tiền, ngày hẹn, điều kiện thanh toán, phạm vi công việc hoặc người chịu trách nhiệm.

2. Điểm cần chú ý
- Có số tiền hoặc chi phí nào chưa rõ không?
- Có hạn chót, ngày giao, ngày thanh toán hoặc thời gian phản hồi không?
- Có điều kiện nào nếu bỏ qua sẽ dễ gây hiểu nhầm không?

3. Câu nên hỏi lại
"Bạn xác nhận giúp mình tổng tiền cuối cùng, thời hạn xử lý và phần nào bên mình cần phản hồi trước nhé?"

4. Việc nên làm tiếp
Chụp hoặc upload tài liệu vào DocScan AI để Lumi đọc trực tiếp nội dung thật và chỉ ra phần cần chú ý cụ thể hơn.`,
  },
  salesPost: {
    title: "Lumi Bot viết bài bán hàng gần gũi hơn",
    task: "Viết bài đăng bán hàng tiếng Việt tự nhiên, không quá quảng cáo, dùng được cho Facebook/TikTok.",
    resultShape:
      "Trả kết quả gồm: (1) 3 câu mở đầu để chọn, (2) Một bài Facebook 120-180 chữ, (3) Một caption TikTok ngắn hơn, (4) 5 hashtag dễ dùng, (5) Một gợi ý chỉnh lại cho đúng giọng người bán.",
    fields: ["brief"],
    fallback: ({ brief = "" }) => `Bài đăng mẫu:

Nếu bạn đang cần một lựa chọn đơn giản hơn, sản phẩm/dịch vụ này có thể là thứ đáng thử:
${brief || "[Mô tả sản phẩm hoặc dịch vụ]"}

Điểm đáng chú ý nhất là nó giúp giải quyết một việc nhỏ nhưng gặp mỗi ngày.

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

  const limit = await checkRateLimitSmart(request, { key: "ai-demo", max: 5 });
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
