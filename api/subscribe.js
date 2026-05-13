const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function json(response, status, payload) {
  return response.status(status).json(payload);
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return json(response, 405, { ok: false, error: "Method not allowed" });
  }

  const { email: rawEmail } = parseBody(request);
  const email = normalizeEmail(rawEmail);

  if (!EMAIL_PATTERN.test(email)) {
    return json(response, 400, {
      ok: false,
      code: "invalid_email",
      message: "Email chưa đúng định dạng.",
    });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return json(response, 500, {
      ok: false,
      code: "missing_config",
      message: "Chưa cấu hình Supabase cho server.",
    });
  }

  try {
    const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/subscribers`;
    const supabaseResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ email }),
    });

    if (supabaseResponse.ok) {
      return json(response, 200, {
        ok: true,
        status: "subscribed",
        message: "Đã đăng ký theo dõi hành trình Lumi Labs.",
      });
    }

    const errorText = await supabaseResponse.text();
    const isDuplicate =
      supabaseResponse.status === 409 ||
      errorText.includes("duplicate key") ||
      errorText.includes("23505");

    if (isDuplicate) {
      return json(response, 200, {
        ok: true,
        status: "already_subscribed",
        message: "Email này đã có trong danh sách theo dõi.",
      });
    }

    return json(response, 502, {
      ok: false,
      code: "supabase_error",
      message: "Chưa lưu được email. Vui lòng thử lại sau.",
    });
  } catch {
    return json(response, 500, {
      ok: false,
      code: "server_error",
      message: "Có lỗi khi kết nối hệ thống đăng ký.",
    });
  }
}
