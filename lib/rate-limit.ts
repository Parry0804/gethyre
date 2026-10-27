import "server-only";

/**
 * A small in-memory sliding-window rate limiter.
 *
 * It's a first line of defence: on Vercel each server instance keeps its own memory, so a
 * determined attacker spread across instances can exceed it. Cloudflare Turnstile (when
 * configured) and a Vercel Firewall rate-limit rule are the stronger layers. See README.
 */
const buckets = new Map<string, number[]>();
let lastSweep = 0;

export function rateLimit(key: string, { limit, windowMs }: { limit: number; windowMs: number }) {
  const now = Date.now();

  // Forget old keys now and then so memory stays bounded.
  if (now - lastSweep > 60_000) {
    lastSweep = now;
    for (const [k, hits] of buckets) {
      if (hits.length === 0 || now - hits[hits.length - 1] > windowMs) buckets.delete(k);
    }
    if (buckets.size > 10_000) buckets.clear();
  }

  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return { ok: false, retryAfterMs: windowMs - (now - hits[0]) };
  }
  hits.push(now);
  buckets.set(key, hits);
  return { ok: true, retryAfterMs: 0 };
}
