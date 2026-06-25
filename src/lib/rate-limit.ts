const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 5;

export function checkRateLimit(key: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count++;
  return { allowed: true };
}

const emailRateLimitMap = new Map<string, { count: number; resetAt: number }>();

const EMAIL_WINDOW_MS = 15 * 60 * 1000;
const EMAIL_MAX_REQUESTS = 3;

export function checkEmailRateLimit(key: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = emailRateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    emailRateLimitMap.set(key, { count: 1, resetAt: now + EMAIL_WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= EMAIL_MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count++;
  return { allowed: true };
}

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(key);
  }
  for (const [key, entry] of emailRateLimitMap) {
    if (now > entry.resetAt) emailRateLimitMap.delete(key);
  }
}, 60_000).unref();
