const ALLOWED_RATINGS = new Set(["good", "okay", "bad"]);
const ALLOWED_PROJECTS = new Set(["docscan-ai", "caption-ai", "beginner-article"]);

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

  const body = parseBody(request);
  const project = cleanText(body.project, 60);
  const rating = cleanText(body.rating, 20);
  const comment = cleanText(body.comment, 1200);

  if (!ALLOWED_PROJECTS.has(project)) {
    return json(response, 400, {
      ok: false,
      code: "invalid_project",
      message: "Project feedback chua hop le.",
    });
  }

  if (!ALLOWED_RATINGS.has(rating)) {
    return json(response, 400, {
      ok: false,
      code: "invalid_rating",
      message: "Ban chon mot muc danh gia giup minh nhe.",
    });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return json(response, 200, {
      ok: true,
      saved: false,
      code: "missing_config",
      message: "Lumi da nhan gop y. He thong luu server se duoc bat sau.",
    });
  }

  const metadata = body.metadata && typeof body.metadata === "object" ? body.metadata : {};
  const profile = body.profile && typeof body.profile === "object" ? body.profile : {};

  try {
    const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/project_feedback`;
    const supabaseResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        project,
        rating,
        comment,
        page_path: cleanText(body.page_path, 300),
        user_email: cleanText(profile.email, 320) || null,
        user_name: cleanText(profile.name, 160) || null,
        metadata,
        created_at: new Date().toISOString(),
      }),
    });

    if (supabaseResponse.ok) {
      return json(response, 200, {
        ok: true,
        saved: true,
        message: "Cam on ban. Lumi da ghi nhan gop y nay.",
      });
    }

    const errorText = await supabaseResponse.text();
    console.error("Feedback save failed", supabaseResponse.status, errorText);
    return json(response, 200, {
      ok: true,
      saved: false,
      code: "supabase_error",
      message: "Lumi da nhan gop y, nhung chua luu duoc vao database.",
    });
  } catch (error) {
    console.error("Feedback API failed", error);
    return json(response, 200, {
      ok: true,
      saved: false,
      code: "server_error",
      message: "Lumi da nhan gop y, nhung ket noi luu tam thoi chua on dinh.",
    });
  }
}
