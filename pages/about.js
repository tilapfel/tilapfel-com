import { escapeHtml } from '../components/utils.js';
import { ICONS } from '../components/icons.js';
import { pillHtml } from '../components/pill.js';

export function renderAbout(view) {
  const t = view.t;
  const principles = view.principles
    .map(
      (principle) => `
    <div class="principle-item"><span class="principle-dot" aria-hidden="true"></span><span class="body-text">${escapeHtml(principle)}</span></div>`
    )
    .join('');
  const roles = view.aboutRoles
    .map(
      (role) => `
    <div class="role-item">
      <span class="role-icon" aria-hidden="true">${role.icon}</span>
      <div class="role-text"><span class="role-title">${escapeHtml(role.title)}</span><span class="role-desc">${escapeHtml(role.desc)}</span></div>
    </div>`
    )
    .join('');
  const werte = view.werte.map((value) => pillHtml(value, { solid: true })).join('');

  return `
  <div data-screen-label="About">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.about}<span>${escapeHtml(t.aboutTitle)}</span></h1>
      <p class="subtitle">${escapeHtml(t.aboutSubtitle)}</p>
      <a href="#/bio" class="more-link">${escapeHtml(t.aboutBioLink)}</a>
    </section>
    <hr class="divider">
    <section class="about-body">
      <p>${escapeHtml(t.aboutP1)}</p>
      <p>${escapeHtml(t.aboutP2)}</p>
      <p>${escapeHtml(t.aboutP3)}</p>

      <div class="card">
        <h2 class="heading-sm" style="margin-bottom:14px">${escapeHtml(t.haltungHeading)}</h2>
        <div class="stack-gap">${principles}</div>
      </div>
      <div class="card">
        <h2 class="heading-sm" style="margin-bottom:14px">${escapeHtml(t.rollenHeading)}</h2>
        <div class="stack-gap-lg">${roles}</div>
      </div>
      <div class="card">
        <h2 class="heading-sm" style="margin-bottom:14px">${escapeHtml(t.werteHeading)}</h2>
        <div class="pill-row align-start">${werte}</div>
      </div>

      <a href="#/contact" class="cta-button">${escapeHtml(t.aboutCtaText)} – ${escapeHtml(t.aboutCtaLink)}</a>
    </section>
  </div>`;
}
