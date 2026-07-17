import { escapeHtml } from './utils.js';
import { ICONS } from './icons.js';
import { state } from '../app/state.js';

/**
 * Shown when the Dark Reader browser extension is detected while the site
 * is already in its own dark theme — the two can conflict/double-invert.
 * Informational only; a `darkreader-lock` meta tag exists to try to disable
 * the extension outright, but it's known to make pages unusable in Chrome
 * and Edge (see darkreader/darkreader#5179), so this just tells the visitor
 * they don't need the extension here rather than fighting it.
 */
export function darkReaderBannerHtml(view) {
  if (!state.darkReaderDetected || state.darkReaderDismissed) return '';
  const t = view.t;
  return `
  <div class="darkreader-banner" role="status">
    <span>${escapeHtml(t.darkReaderNotice)}</span>
    <button type="button" class="icon-btn" data-action="dismiss-darkreader" aria-label="${escapeHtml(t.closeDialog)}" title="${escapeHtml(t.closeDialog)}" data-tooltip="${escapeHtml(t.closeDialog)}">
      <span aria-hidden="true">${ICONS.close}</span>
    </button>
  </div>`;
}
