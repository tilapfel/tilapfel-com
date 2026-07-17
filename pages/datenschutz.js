import { escapeHtml } from '../components/utils.js';
import { ICONS } from '../components/icons.js';

/** Unlisted page (like Impressum/Kontakt): not in NAV, reachable via the consent-checkbox link on forms. */
export function renderDatenschutz(view) {
  const t = view.t;
  const sections = view.datenschutzSections
    .map(
      (s) => `
      <div>
        <h2 class="heading-sm" style="margin-bottom:8px">${escapeHtml(s.heading)}</h2>
        <p style="font-size:15px;line-height:1.7;color:var(--text-secondary)">${escapeHtml(s.body)}</p>
      </div>`
    )
    .join('');
  return `
  <div data-screen-label="Datenschutz">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.lock}<span>${escapeHtml(t.datenschutzTitle)}</span></h1>
      <p class="subtitle">${escapeHtml(t.datenschutzSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section stack-gap-lg">${sections}</section>
  </div>`;
}
