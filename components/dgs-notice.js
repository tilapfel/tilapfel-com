import { escapeHtml } from './utils.js';
import { ICONS } from './icons.js';

/**
 * Shown once at the top of every page when the DGS (Deutsche Gebärdensprache)
 * locale is active. There's no real video yet, so this is a static
 * placeholder rather than an <iframe> — embedding a real video later just
 * means swapping this box's contents, no CSP change needed until then.
 */
export function dgsNoticeHtml(view) {
  const t = view.t;
  return `
    <section class="dgs-notice">
      <div class="dgs-notice-video" aria-hidden="true">${ICONS.roleLecturer}</div>
      <div>
        <p class="dgs-notice-title">${escapeHtml(t.dgsNoticeTitle)}</p>
        <p>${escapeHtml(t.dgsNoticeBody)}</p>
      </div>
    </section>`;
}
