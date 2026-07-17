import { escapeHtml } from '../components/utils.js';
import { consentCheckboxHtml } from '../components/consent.js';
import { honeypotFieldHtml } from '../components/honeypot.js';

export function renderFormular(view) {
  const t = view.t;
  const artOptions = view.auftragArten
    .map((art) => `<option value="${escapeHtml(art)}">${escapeHtml(art)}</option>`)
    .join('');
  return `
  <div data-screen-label="Anfrage">
    <section class="page-hero">
      <h1>${escapeHtml(t.formularTitle)}</h1>
      <p class="subtitle">${escapeHtml(t.formularSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section">
      <form class="stack-form" data-form="auftrag">
        <div class="form-field"><label for="auftrag-name">${escapeHtml(t.labelName)}</label><input id="auftrag-name" name="name" type="text" required></div>
        <div class="form-field"><label for="auftrag-email">${escapeHtml(t.labelEmail)}</label><input id="auftrag-email" name="email" type="email" required></div>
        <div class="form-field"><label for="auftrag-art">${escapeHtml(t.labelArt)}</label><select id="auftrag-art" name="art">${artOptions}</select></div>
        <div class="form-field"><label for="auftrag-beschreibung">${escapeHtml(t.labelBeschreibung)}</label><textarea id="auftrag-beschreibung" name="beschreibung" rows="5" required></textarea></div>
        <div class="form-field"><label for="auftrag-zeitrahmen">${escapeHtml(t.labelZeitrahmen)}</label><input id="auftrag-zeitrahmen" name="zeitrahmen" type="text"></div>
        ${consentCheckboxHtml(t)}
        ${honeypotFieldHtml()}
        <button type="submit" class="submit-btn">${escapeHtml(t.submitBtn)}</button>
        <p class="form-error" data-form-error hidden></p>
      </form>
    </section>
  </div>`;
}
