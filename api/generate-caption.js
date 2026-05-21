import { checkRateLimitSmart, rateLimitResponse } from "./_rate-limit.js";

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

function fallbackCaption({ productName, description }) {
  const name = productName?.trim() || "sản phẩm của bạn";
  const desc =
    description?.trim() ||
    "giúp công việc hằng ngày nhẹ hơn, nhanh hơn và dễ bắt đầu hơn";

  return {
    tiktok: `Bạn đang tìm một cách đơn giản hơn?\n\n${name} có thể giúp bạn: ${desc}.\n\nLưu lại nếu bạn muốn thử sau nhé.`,
    facebook: `${name} được tạo ra để giúp công việc hằng ngày dễ hơn.\n\nĐiểm đáng chú ý: ${desc}.\n\nMột công cụ nhỏ, nhưng có thể tiết kiệm rất nhiều thời gian nếu dùng đúng lúc.`,
    hashtags: ["#LumiLabs", "#AIChoCongViec", "#CongCuAI", "#NguoiVietDungAI"],
  };
}

function safeJson(text) {
  try {
    const cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const { productName = "", description = "", mode = "ban-hang" } = request.body || {};

  if (!String(productName).trim()) {
    return response.status(400).json({ error: "Bạn nhập tên sản phẩm trước khi tạo caption nhé." });
  }

  if (!apiKey) {
    return response.status(200).json({
      source: "fallback",
      ...fallbackCaption({ productName, description }),
    });
  }

  const limit = await checkRateLimitSmart(request, { key: "ai-demo", max: 5 });
  if (!limit.allowed) {
    return rateLimitResponse(response, limit);
  }

  const prompt = `
Bạn là chuyên gia viết caption mạng xã hội cho người Việt Nam.

Hãy viết caption bằng tiếng Việt, gần gũi, dễ hiểu, không sáo rỗng.
Người dùng là chủ shop nhỏ, creator, freelancer hoặc dân văn phòng.

Thông tin:
- Tên sản phẩm: ${productName}
- Mô tả ngắn: ${description}
- Kiểu giọng: ${mode}

Yêu cầu:
1. Viết 1 caption TikTok ngắn, có hook ở đầu, dễ đọc trên điện thoại.
2. Viết 1 caption Facebook tự nhiên hơn, có thể dài hơn TikTok.
3. Tạo 5 hashtag tiếng Việt/không dấu phù hợp.
4. Không dùng giọng quá quảng cáo.
5. Không nhắc bạn là AI.

Chỉ trả về JSON hợp lệ theo format:
{
  "tiktok": "...",
  "facebook": "...",
  "hashtags": ["#...", "#...", "#...", "#...", "#..."]
}
`;

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
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.8,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      return response.status(200).json({
        source: "fallback",
        warning: errorText.slice(0, 240),
        ...fallbackCaption({ productName, description }),
      });
    }

    const data = await geminiResponse.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const parsed = safeJson(text);

    if (!parsed?.tiktok || !parsed?.facebook || !Array.isArray(parsed?.hashtags)) {
      return response.status(200).json({
        source: "fallback",
        ...fallbackCaption({ productName, description }),
      });
    }

    return response.status(200).json({
      source: "gemini",
      tiktok: parsed.tiktok,
      facebook: parsed.facebook,
      hashtags: parsed.hashtags.slice(0, 5),
    });
  } catch (error) {
    return response.status(200).json({
      source: "fallback",
      warning: error.message,
      ...fallbackCaption({ productName, description }),
    });
  }
}
