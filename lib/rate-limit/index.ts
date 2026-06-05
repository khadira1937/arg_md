/**
 * Minimal in-memory rate limiter abstraction. Swap the store for Redis/Upstash
 * in production (the interface stays the same). Suitable for dev + single-node.
 */
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export type RateLimitResult = { success: boolean; remaining: number; resetAt: number };

export function rateLimit(key: string, limit = 10, windowMs = 60_000): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || existing.resetAt < now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }
  existing.count += 1;
  const success = existing.count <= limit;
  return { success, remaining: Math.max(0, limit - existing.count), resetAt: existing.resetAt };
}

/** Periodic cleanup to bound memory (no-op cost when small). */
export function sweepRateLimits() {
  const now = Date.now();
  for (const [k, v] of buckets) if (v.resetAt < now) buckets.delete(k);
}
