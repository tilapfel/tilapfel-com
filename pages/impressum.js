import { escapeHtml } from '../components/utils.js';
import { ICONS } from '../components/icons.js';
import { CONTACT_EMAIL } from '../app/data.js';

export function renderImpressum(view) {
  const t = view.t;
  return `
  <div data-screen-label="Impressum">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.paragraph}<span>Impressum</span></h1>
      <p class="subtitle">${escapeHtml(t.impressumSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section" style="display:flex;flex-direction:column;gap:6px">
      <p style="font-size:16px;line-height:1.7;color:var(--text-primary)">Til Apfel</p>
      <p style="font-size:16px;line-height:1.7;color:var(--text-secondary)">Musterstraße 12, 12345 Musterstadt (Platzhalter)</p>
      <p style="font-size:16px;line-height:1.7;color:var(--text-secondary);margin-bottom:12px">E-Mail: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> (Platzhalter)</p>
      <p style="font-size:14px;line-height:1.6;color:var(--text-tertiary)">Verantwortlich gemäß §55 Abs. 2 RStV: Til Apfel</p>
    </section>
  </div>`;
}
