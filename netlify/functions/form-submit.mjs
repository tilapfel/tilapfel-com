import { getStore } from '@netlify/blobs';

const JSON_HEADERS = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };

/**
 * Tunable thresholds live in env vars (set in the Netlify dashboard), not
 * here, so they aren't visible in the public repo — knowing the exact
 * timing/rate-limit numbers would make it slightly easier to tune a bot to
 * slip under them. Defaults below only apply when a var is unset (e.g.
 * local testing without Netlify running).
 */
const MIN_FILL_SECONDS = Number(process.env.SPAM_MIN_FILL_SECONDS) || 3;
const RATE_LIMIT_WINDOW_MS = Number(process.env.SPAM_RATE_LIMIT_WINDOW_MS) || 60 * 60 * 1000;
const RATE_LIMIT_MAX = Number(process.env.SPAM_RATE_LIMIT_MAX) || 5;

const ok = (body = { ok: true }) =>
  new Response(JSON.stringify(body), { status: 200, headers: JSON_HEADERS });
const rejected = (status, reason) =>
  new Response(JSON.stringify({ ok: false, reason }), { status, headers: JSON_HEADERS });

/**
 * Server-side gate the client calls before it's allowed to hand off to
 * `mailto:` (the site has no backend that actually sends mail — see
 * README). Three checks, entirely invisible to the visitor:
 *
 * 1. Rate limit — per-IP submission count over the last hour, tracked in
 *    Netlify Blobs (a plain in-memory counter would reset on every cold
 *    start / be per-instance, so it can't do this).
 * 2. Honeypot — a hidden field real visitors never see or fill in.
 * 3. Time trap — compares "now" against the timestamp `form-token` stored
 *    server-side when the form was rendered.
 *
 * Per spec: a honeypot hit or a too-fast submission must look identical to
 * a real success to whoever/whatever is submitting, so a bot can't learn
 * which check tripped. That's safe here because a real human, using the
 * form as intended, can never trigger either condition — so lying to the
 * caller in those two cases never affects a genuine visitor. The rate
 * limit is the one check that's allowed to respond honestly, since a
 * legitimate visitor could plausibly hit it (e.g. a double submit).
 */
export default async (req) => {
  if (req.method !== 'POST') return rejected(405, 'method_not_allowed');

  let body;
  try {
    body = await req.json();
  } catch {
    return rejected(400, 'invalid_body');
  }

  const { token, honeypot } = body;
  const ip = req.headers.get('x-nf-client-connection-ip') || 'unknown';
  const now = Date.now();

  const rateStore = getStore('form-rate-limits');
  const rateEntry = (await rateStore.get(ip, { type: 'json' })) || { timestamps: [] };
  const recentSubmissions = rateEntry.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recentSubmissions.length >= RATE_LIMIT_MAX) {
    return rejected(429, 'rate_limited');
  }

  // Honeypot: a real visitor never fills this in — pretend success either way.
  if (honeypot) return ok();

  if (!token) return rejected(400, 'missing_token');
  const tokenStore = getStore('form-tokens');
  const tokenEntry = await tokenStore.get(token, { type: 'json' });
  await tokenStore.delete(token); // one-time use, whether or not it's valid

  if (!tokenEntry) return rejected(400, 'invalid_token');

  const elapsedSeconds = (now - tokenEntry.issuedAt) / 1000;
  if (elapsedSeconds < MIN_FILL_SECONDS) return ok(); // too fast to be human — pretend success

  recentSubmissions.push(now);
  await rateStore.setJSON(ip, { timestamps: recentSubmissions });

  return ok();
};

export const config = { path: '/api/form-submit' };
