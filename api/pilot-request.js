import { checkRateLimitSmart, rateLimitResponse } from "./_rate-limit.js";

function parseBody(request) {
  if (!request.body) return {};
  if (typeof request.body === "string") {
    try {
      return JSON.parse(request.body);
    } catch {
      return {};
    }
  }
  return request.body;
}

function cleanText(value, maxLength = 1000) {
  return String(value || "").trim().slice(0, maxLength);
}

function json(response, status, payload) {
  return response.status(status).json(payload);
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return json(response, 405, { ok: false, error: "Method not allowed" });
  }

  const limit = await checkRateLimitSmart(request, { key: "pilot-request", max: 12 });
  if (!limit.allowed) {
    return rateLimitResponse(response, limit);
  }

  const body = parseBody(request);
  const website = cleanText(body.website, 160);
  const name = cleanText(body.name, 160);
  const company = cleanText(body.company, 180);
  const role = cleanText(body.role, 120);
  const fileType = cleanText(body.fileType, 220);
  const monthlyVolume = cleanText(body.monthlyVolume, 80);
  const contact = cleanText(body.contact, 320);
  const note = cleanText(body.note, 1400);
  const source = cleanText(body.source, 120) || "business_pilot";

  if (website) {
    return json(response, 400, {
      ok: false,
      code: "spam_detected",
      message: "Yêu cầu chưa hợp lệ.",
    });
  }

  if (!contact) {
    return json(response, 400, {
      ok: false,
      code: "missing_contact",
      message: "Bạn để lại email hoặc Zalo để Lumi phản hồi nhé.",
    });
  }

  if (!fileType) {
    return json(response, 400, {
      ok: false,
      code: "missing_file_type",
      message: "Bạn mô tả ngắn loại file đang cần xử lý giúp mình nhé.",
    });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return json(response, 503, {
      ok: false,
      saved: false,
      code: "missing_config",
      message: "Form đang chưa lưu được. Bạn nhắn Zalo cho Lumi Labs để không mất thông tin nhé.",
    });
  }

  try {
    const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/pilot_requests`;
    const supabaseResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name,
        company,
        role,
        file_type: fileType,
        monthly_volume: monthlyVolume,
        contact,
        note,
        source,
        page_path: cleanText(body.page_path, 300),
        created_at: new Date().toISOString(),
      }),
    });

    if (supabaseResponse.ok) {
      return json(response, 200, {
        ok: true,
        saved: true,
        message: "Đã nhận yêu cầu. Lumi sẽ phản hồi để trao đổi file/quy trình phù hợp.",
      });
    }

    const errorText = await supabaseResponse.text();
    console.error("Pilot request save failed", supabaseResponse.status, errorText);
    return json(response, 502, {
      ok: false,
      saved: false,
      code: "supabase_error",
      message: "Form đang chưa lưu được vào database. Bạn nhắn Zalo cho Lumi Labs để không mất thông tin nhé.",
    });
  } catch (error) {
    console.error("Pilot request API failed", error);
    return json(response, 500, {
      ok: false,
      saved: false,
      code: "server_error",
      message: "Kết nối lưu form đang chưa ổn định. Bạn nhắn Zalo cho Lumi Labs để không mất thông tin nhé.",
    });
  }
}
