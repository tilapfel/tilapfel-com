const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';

/**
 * Step 1 of the admin dashboard's GitHub login. The "Mit GitHub einloggen"
 * link in admin/app.js points straight here; this redirects on to GitHub's
 * own authorize screen. A random `state` value goes out as a short-lived
 * cookie and comes back as a query param on the callback, so
 * oauth-callback.mjs can confirm the request wasn't forged.
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
      'Set-Cookie': `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
};

export const config = { path: '/api/auth' };
