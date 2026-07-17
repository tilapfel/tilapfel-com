import { escapeHtml } from './utils.js';
import { ICONS } from './icons.js';
import { modalHtml } from './modal.js';
import { consentCheckboxHtml } from './consent.js';
import { state } from '../app/state.js';

/** Newsletter signup form fields — shared by the inline section (every page) and the Bio popup. */
function newsletterFormHtml(t) {
  return `
    <form class="stack-form" data-form="newsletter">
      <div class="form-field">
        <label for="newsletter-firstname">${escapeHtml(t.newsletterFirstNameLabel)}</label>
        <input id="newsletter-firstname" name="firstname" type="text" required>
      </div>
      <div class="form-field">
        <label for="newsletter-email">${escapeHtml(t.newsletterEmailLabel)}</label>
        <input id="newsletter-email" name="email" type="email" placeholder="${escapeHtml(t.newsletterPlaceholder)}" required>
      </div>
      ${consentCheckboxHtml(t)}
      <button type="submit" class="submit-btn">${escapeHtml(t.newsletterSubmitBtn)}</button>
    </form>`;
}

/** Inline newsletter section, placed directly above the footer on every non-Bio page. */
export function newsletterSectionHtml(view) {
  const t = view.t;
  return `
  <hr class="divider">
  <section class="section" style="display:flex;flex-direction:column;gap:14px;align-items:center;text-align:center">
    <h2 class="section-title" style="margin-bottom:0">${escapeHtml(t.newsletterHeading)}</h2>
    <p class="subtitle" style="max-width:440px">${escapeHtml(t.newsletterDesc)}</p>
    <div style="width:100%;max-width:360px;text-align:left">${newsletterFormHtml(t)}</div>
  </section>`;
}

/** Bio page's newsletter tile: looks like the other bio tiles, opens a popup on click instead of navigating. */
export function newsletterBioTileHtml(view) {
  const t = view.t;
  return `
    <button type="button" class="bio-tile" data-action="toggle-newsletter" style="width:100%;border:none;cursor:pointer;font:inherit">
      <span class="bio-tile-icon" aria-hidden="true">${ICONS.mail}</span>
      <span class="bio-tile-text">
        <span class="bio-tile-label">${escapeHtml(t.newsletterBioLabel)}</span>
        <span class="bio-tile-url">${escapeHtml(t.newsletterBioDesc)}</span>
      </span>
    </button>`;
}

export function newsletterModalHtml(view) {
  if (!state.newsletterOpen) return '';
  const t = view.t;
  return modalHtml({
    labelledBy: 'newsletter-modal-title',
    closeLabel: t.closeDialog,
    bodyHtml: `
      <h2 id="newsletter-modal-title">${escapeHtml(t.newsletterHeading)}</h2>
      <p style="margin-bottom:20px">${escapeHtml(t.newsletterDesc)}</p>
      ${newsletterFormHtml(t)}`,
  });
}
