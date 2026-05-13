/**
 * Rate limiter in-memory per endpoint pubblici.
 * NOTA: funziona solo se Vercel mantiene una singola istanza serverless calda.
 * Per volumi seri sostituire con Upstash Redis o equivalente persistente.
 *
 * Logica: max N richieste per IP in finestra temporale W.
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60 * 60 * 1000; // 1 ora
const MAX_REQUESTS = 20; // 20 submit/ora per IP

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || now >= bucket.resetAt) {
    // Nuova finestra
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetAt: now + WINDOW_MS };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return {
    allowed: true,
    remaining: MAX_REQUESTS - bucket.count,
    resetAt: bucket.resetAt,
  };
}

/**
 * Pulizia periodica: rimuove bucket scaduti per evitare memory leak.
 * Da chiamare occasionalmente (ogni 100 richieste o cosi).
 */
let cleanupCounter = 0;
export function maybeCleanup() {
  cleanupCounter++;
  if (cleanupCounter < 100) return;
  cleanupCounter = 0;
  const now = Date.now();
  for (const [ip, bucket] of buckets.entries()) {
    if (now >= bucket.resetAt) buckets.delete(ip);
  }
}
