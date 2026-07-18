const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';

/**
 * Step 1 of Decap CMS's GitHub OAuth login (the `github` backend — not the
 * deprecated Netlify Identity/Git Gateway). The CMS admin UI opens this
 * endpoint in a popup; it redirects straight to GitHub's own authorize
 * screen. A random `state` value goes out as a short-lived cookie and comes
 * back as a query param on the callback, so decap-callback.mjs can confirm
 * the request wasn't forged.
 */
export default async (req) => {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) return new Response('Missing GITHUB_OAUTH_CLIENT_ID', { status: 500 });

  const url = new URL(req.url);
  const state = crypto.randomUUID();
  const redirectUri = `${url.origin}/api/callback`;

  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('scope', 'repo');
  authorizeUrl.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorizeUrl.toString(),
      'Set-Cookie': `decap_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
};

export const config = { path: '/api/auth' };
