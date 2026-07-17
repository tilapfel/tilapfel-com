import { escapeHtml } from './utils.js';
import { ICONS } from './icons.js';

/** Privacy consent checkbox — shared by every form that collects personal data (Kontakt, Formular, Newsletter). */
export function consentCheckboxHtml(t) {
  return `
    <div class="form-field">
      <label class="consent-label">
        <input type="checkbox" name="datenschutz" required>
        <span class="consent-icon" aria-hidden="true">${ICONS.lock}</span>
        <span>${escapeHtml(t.consentPrefix)} <a href="#/privacy" target="_blank" rel="noopener noreferrer">${escapeHtml(t.consentLinkText)}</a> ${escapeHtml(t.consentSuffix)}</span>
      </label>
    </div>`;
}
