const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';

/**
 * Step 2: GitHub redirects back here with `code` + `state`. We verify
 * `state` against the cookie oauth-authorize.mjs set, exchange the code for
 * an access token server-side (needs the client secret, so this can't
 * happen in the browser), then hand it to the admin app via a redirect to
 * `/admin/#access_token=...`. The URL fragment never reaches a server —
 * admin/app.js reads it on load, stashes it in sessionStorage, and strips
 * it from the address bar immediately.
 */
export default async (req) => {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new Response('Missing GITHUB_OAUTH_CLIENT_ID/GITHUB_OAUTH_CLIENT_SECRET', { status: 500 });
  }

  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookieState = (req.headers.get('cookie') || '')
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('oauth_state='))
    ?.split('=')[1];

  if (!code || !state || state !== cookieState) {
    return redirectToAdmin(url.origin, { error: 'Invalid or expired login attempt.' });
  }

  const tokenRes = await fetch(GITHUB_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    return redirectToAdmin(url.origin, { error: tokenData.error_description || 'GitHub login failed.' });
  }

  return redirectToAdmin(url.origin, { access_token: tokenData.access_token }, { grantSession: true });
};

/**
 * `admin_session` lets maintenance-gate.mjs recognize this browser as the
 * site owner's and skip the maintenance page — it carries no real
 * permission (writes still require the bearer token in sessionStorage, and
 * the repo is public anyway), so it's deliberately not HttpOnly: the
 * admin app's logout button clears it via document.cookie too.
 */
function redirectToAdmin(origin, fragmentParams, { grantSession = false } = {}) {
  const fragment = new URLSearchParams(fragmentParams).toString();
  const headers = new Headers({ Location: `${origin}/admin/#${fragment}` });
  headers.append('Set-Cookie', 'oauth_state=; Path=/; Max-Age=0');
  if (grantSession) {
    headers.append('Set-Cookie', 'admin_session=1; Path=/; Max-Age=2592000; Secure; SameSite=Lax');
  }
  return new Response(null, { status: 302, headers });
}

export const config = { path: '/api/callback' };
