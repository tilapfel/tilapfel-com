import { escapeHtml } from '../components/utils.js';
import { ICONS } from '../components/icons.js';
import { CONTACT_EMAIL } from '../app/data.js';

export function renderImpressum(view) {
  const t = view.t;
  const addr = view.impressumAddress;
  const sections = view.impressumSections
    .map(
      (s) => `
      <div>
        <h2 class="heading-sm" style="margin-bottom:8px">${escapeHtml(s.heading)}</h2>
        <p style="font-size:15px;line-height:1.7;color:var(--text-secondary)">${escapeHtml(s.body)}</p>
      </div>`
    )
    .join('');
  return `
  <div data-screen-label="Impressum">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.paragraph}<span>Impressum</span></h1>
      <p class="subtitle">${escapeHtml(t.impressumSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section" style="display:flex;flex-direction:column;gap:6px">
      <p style="font-size:16px;line-height:1.7;color:var(--text-primary)">${escapeHtml(addr.name)}</p>
      <p style="font-size:16px;line-height:1.7;color:var(--text-secondary)">${escapeHtml(addr.street)}, ${escapeHtml(addr.city)} (${escapeHtml(t.impressumPlaceholder)})</p>
      <p style="font-size:16px;line-height:1.7;color:var(--text-secondary)">${escapeHtml(t.impressumPhoneLabel)}: ${escapeHtml(addr.phone)} (${escapeHtml(t.impressumPlaceholder)})</p>
      <p style="font-size:16px;line-height:1.7;color:var(--text-secondary);margin-bottom:12px">${escapeHtml(t.impressumEmailLabel)}: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> (${escapeHtml(t.impressumPlaceholder)})</p>
    </section>
    <hr class="divider">
    <section class="section stack-gap-lg">${sections}</section>
    <hr class="divider">
    <section class="section">
      <a href="#/privacy" class="more-link">${escapeHtml(t.impressumDatenschutzLink)}</a>
    </section>
  </div>`;
}
