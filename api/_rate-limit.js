const DEFAULT_WINDOW_MS = 24 * 60 * 60 * 1000;
const DEFAULT_MAX_REQUESTS = 5;

const stores = globalThis.__lumiRateLimitStores || new Map();
globalThis.__lumiRateLimitStores = stores;

function getHeader(request, name) {
  const headers = request?.headers || {};
  if (typeof headers.get === "function") return headers.get(name);
  return headers[name] || headers[name.toLowerCase()];
}

export function getClientIp(request) {
  const forwarded = getHeader(request, "x-forwarded-for");
  const realIp = getHeader(request, "x-real-ip");
  const vercelIp = getHeader(request, "x-vercel-forwarded-for");

  return String(forwarded || vercelIp || realIp || request?.socket?.remoteAddress || "unknown")
    .split(",")[0]
    .trim()
    .replace(/^::ffff:/, "");
}

export function checkRateLimit(request, options = {}) {
  const {
    key = "lumi-ai",
    max = DEFAULT_MAX_REQUESTS,
    windowMs = DEFAULT_WINDOW_MS,
    now = Date.now(),
  } = options;

  const clientIp = getClientIp(request);
  const bucketKey = `${key}:${clientIp}`;
  const current = stores.get(bucketKey) || [];
  const fresh = current.filter((timestamp) => now - timestamp < windowMs);

  if (fresh.length >= max) {
    const oldest = fresh[0];
    const retryAfterSeconds = Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000));
    stores.set(bucketKey, fresh);

    return {
      allowed: false,
      clientIp,
      limit: max,
      remaining: 0,
      retryAfterSeconds,
      resetAt: new Date(oldest + windowMs).toISOString(),
    };
  }

  fresh.push(now);
  stores.set(bucketKey, fresh);

  return {
    allowed: true,
    clientIp,
    limit: max,
    remaining: Math.max(0, max - fresh.length),
    retryAfterSeconds: 0,
    resetAt: fresh[0] ? new Date(fresh[0] + windowMs).toISOString() : null,
  };
}

async function checkSupabaseRateLimit(request, options = {}) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) return null;

  const {
    key = "lumi-ai",
    max = DEFAULT_MAX_REQUESTS,
  } = options;
  const clientIp = getClientIp(request);
  const bucketKey = `${key}:${clientIp}`;

  try {
    const endpoint = `${supabaseUrl.replace(/\/$/, "")}/rest/v1/rpc/consume_ai_usage`;
    const supabaseResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_bucket_key: bucketKey,
        p_client_ip: clientIp,
        p_action: key,
        p_max: max,
      }),
    });

    if (!supabaseResponse.ok) return null;

    const payload = await supabaseResponse.json();
    const row = Array.isArray(payload) ? payload[0] : payload;
    if (!row || typeof row.allowed !== "boolean") return null;

    return {
      allowed: row.allowed,
      clientIp,
      limit: max,
      remaining: Number(row.remaining || 0),
      retryAfterSeconds: row.allowed ? 0 : Math.max(1, Math.ceil((new Date(row.reset_at).getTime() - Date.now()) / 1000)),
      resetAt: row.reset_at,
      source: "supabase",
    };
  } catch {
    return null;
  }
}

export async function checkRateLimitSmart(request, options = {}) {
  const persistentLimit = await checkSupabaseRateLimit(request, options);
  return persistentLimit || { ...checkRateLimit(request, options), source: "memory" };
}

export function rateLimitResponse(response, limit) {
  return response.status(429).json({
    error: "Hôm nay bạn đã dùng hết 5 lượt AI miễn phí. Bạn quay lại sau hoặc đăng nhập để Lumi Labs mở thêm quyền dùng trong bản tiếp theo nhé.",
    code: "rate_limited",
    limit: limit.limit,
    remaining: limit.remaining,
    retryAfterSeconds: limit.retryAfterSeconds,
    resetAt: limit.resetAt,
  });
}
