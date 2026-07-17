import { getStore } from '@netlify/blobs';

const JSON_HEADERS = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };

/**
 * Issues a one-time token + server-side timestamp for the "time trap" spam
 * check. The client requests this when a form first renders; form-submit
 * later checks how much time elapsed between issuing this token and the
 * submission arriving. The timestamp lives in Netlify Blobs (not on the
 * client) so it can't be forged by adjusting the browser clock or the
 * request payload.
 */
export default async () => {
  const token = crypto.randomUUID();
  const store = getStore('form-tokens');
  await store.setJSON(token, { issuedAt: Date.now() });

  return new Response(JSON.stringify({ token }), { status: 200, headers: JSON_HEADERS });
};

export const config = { path: '/api/form-token' };
