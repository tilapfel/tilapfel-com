import { escapeHtml } from '../components/utils.js';
import { ICONS } from '../components/icons.js';
import { consentCheckboxHtml } from '../components/consent.js';
import { honeypotFieldHtml } from '../components/honeypot.js';

export function renderKontakt(view) {
  const t = view.t;
  return `
  <div data-screen-label="Kontakt">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.mail}<span>${escapeHtml(t.kontaktTitle)}</span></h1>
      <p class="subtitle">${escapeHtml(t.kontaktSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section">
      <form class="stack-form" data-form="kontakt">
        <div class="form-field"><label for="kontakt-name">${escapeHtml(t.labelName)}</label><input id="kontakt-name" name="name" type="text" required></div>
        <div class="form-field"><label for="kontakt-email">${escapeHtml(t.labelEmail)}</label><input id="kontakt-email" name="email" type="email" required></div>
        <div class="form-field"><label for="kontakt-nachricht">${escapeHtml(t.labelNachricht)}</label><textarea id="kontakt-nachricht" name="nachricht" rows="6" required></textarea></div>
        ${consentCheckboxHtml(t)}
        ${honeypotFieldHtml()}
        <button type="submit" class="submit-btn">${escapeHtml(t.kontaktSubmitBtn)}</button>
        <p class="form-error" data-form-error hidden></p>
      </form>
    </section>
  </div>`;
}
