/**
 * Gates "/" behind maintenance.html when content/settings.json's
 * maintenanceMode flag is true — unless the visitor has the admin_session
 * cookie (set on login by oauth-callback.mjs), so the site owner can still
 * browse the real site while it's "down" for everyone else. Fails open on
 * any fetch error so a settings-file hiccup never blocks the whole site.
 */
export default async (request, context) => {
  let maintenanceOn = false;
  try {
    const res = await fetch(new URL('/content/settings.json', request.url));
    if (res.ok) maintenanceOn = (await res.json()).maintenanceMode === true;
  } catch {
    maintenanceOn = false;
  }
  if (!maintenanceOn || context.cookies.get('admin_session') === '1') {
    return context.next();
  }
  const res = await fetch(new URL('/maintenance.html', request.url));
  return new Response(await res.text(), {
    status: 503,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
};

export const config = { path: '/' };
