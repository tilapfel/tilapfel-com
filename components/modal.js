import { escapeHtml } from './utils.js';
import { ICONS } from './icons.js';

/**
 * Shared overlay/dialog/close-button shell. Every full-screen dialog in the
 * app (Portfolio detail, Event detail, Bookable format detail, Search,
 * Onboarding) is built from this one function so they share the same look,
 * focus target, and close affordances (`[data-close-modal]` backdrop +
 * button). `shareHtml` is optional — only content detail modals (not
 * Search/Onboarding) pass a pre-rendered share toggle, shown next to close.
 */
export function modalHtml({ labelledBy, closeLabel, bodyHtml, shareHtml = '' }) {
  return `
  <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="${labelledBy}">
    <div class="modal-backdrop" data-close-modal></div>
    <div class="modal" tabindex="-1">
      <div class="modal-actions">
        ${shareHtml}
        <button type="button" class="modal-close" data-close-modal aria-label="${escapeHtml(closeLabel)}" title="${escapeHtml(closeLabel)}" data-tooltip="${escapeHtml(closeLabel)}">
          <span aria-hidden="true">${ICONS.close}</span>
        </button>
      </div>
      ${bodyHtml}
    </div>
  </div>`;
}
