const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const HTML_HEADERS = { 'Content-Type': 'text/html; charset=utf-8' };

/**
 * Step 2: GitHub redirects the popup back here with `code` + `state`. We
 * verify `state` against the cookie decap-auth.mjs set, exchange the code
 * for an access token server-side (needs the client secret, so this can't
 * happen in the browser), then hand the token to the CMS window via
 * postMessage. The handshake below — wait for the opener to ping this
 * popup, THEN reply with the token to that ping's origin — is the exact
 * two-way protocol Decap's `github` backend expects; replying immediately
 * on load does not work.
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
    .find((c) => c.startsWith('decap_oauth_state='))
    ?.split('=')[1];

  if (!code || !state || state !== cookieState) {
    return new Response(resultPage('error', 'Invalid or expired login attempt.'), {
      status: 400,
      headers: HTML_HEADERS,
    });
  }

  const tokenRes = await fetch(GITHUB_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    return new Response(resultPage('error', tokenData.error_description || 'GitHub login failed.'), {
      status: 400,
      headers: HTML_HEADERS,
    });
  }

  return new Response(resultPage('success', tokenData.access_token), {
    status: 200,
    headers: { ...HTML_HEADERS, 'Set-Cookie': 'decap_oauth_state=; Path=/; Max-Age=0' },
  });
};

function resultPage(status, value) {
  const payload =
    status === 'success'
      ? `'authorization:github:success:' + JSON.stringify({ token: ${JSON.stringify(value)}, provider: 'github' })`
      : `'authorization:github:error:' + JSON.stringify({ message: ${JSON.stringify(value)} })`;
  return `<!doctype html>
<title>Anmeldung ${status === 'success' ? 'erfolgreich' : 'fehlgeschlagen'}</title>
<script>
(function () {
  function receiveMessage(e) {
    window.opener.postMessage(${payload}, e.origin);
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>`;
}

export const config = { path: '/api/callback' };
