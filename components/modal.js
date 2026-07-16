import { escapeHtml } from './utils.js';
import { ICONS } from './icons.js';

/**
 * Shared overlay/dialog/close-button shell. Every full-screen dialog in the
 * app (Portfolio detail, Event detail, Search, Onboarding) is built from
 * this one function so they share the same look, focus target, and
 * close affordances (`[data-close-modal]` backdrop + button).
 */
export function modalHtml({ labelledBy, closeLabel, bodyHtml }) {
  return `
  <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="${labelledBy}">
    <div class="modal-backdrop" data-close-modal></div>
    <div class="modal" tabindex="-1">
      <button type="button" class="modal-close" data-close-modal aria-label="${escapeHtml(closeLabel)}">
        <span aria-hidden="true">${ICONS.close}</span>
      </button>
      ${bodyHtml}
    </div>
  </div>`;
}
