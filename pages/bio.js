import { escapeHtml } from '../components/utils.js';
import { shareToggleHtml, langToggleHtml, themeToggleHtml } from '../components/toggles.js';

export function renderBio(view) {
  const t = view.t;
  const tiles = view.bioPrimaryLinks
    .map(
      (link) => `
    <a class="bio-tile" href="${link.href}">
      <span class="bio-tile-icon" aria-hidden="true">${link.icon}</span>
      <span class="bio-tile-text">
        <span class="bio-tile-label">${escapeHtml(link.label)}</span>
        <span class="bio-tile-url">${escapeHtml(link.url)}</span>
      </span>
    </a>`
    )
    .join('');
  const socials = view.bioSocialLinks
    .map(
      (link) => `
    <a class="icon-btn circle" href="${link.href}" aria-label="${escapeHtml(link.label)}" title="${escapeHtml(link.label)}" style="background:${link.bg};border-color:${link.bg};color:#fff">
      <span aria-hidden="true">${link.icon}</span>
    </a>`
    )
    .join('');
  return `
  <div data-screen-label="Bio" class="bio-screen">
    <div class="bio-utility-bar">
      ${shareToggleHtml(view, { dropDown: true })}
      ${langToggleHtml(view, { dropDown: true })}
      ${themeToggleHtml(view)}
    </div>
    <section class="bio-page">
      <img src="./assets/profilfoto.png" alt="${escapeHtml(t.portraitAlt)}" class="avatar-lg">
      <div>
        <h1 class="bio-name">Til Apfel</h1>
        <p class="bio-intro">${escapeHtml(t.bioIntro)}</p>
      </div>
    </section>
    <section class="bio-links">
      <div class="bio-grid">${tiles}</div>
      <div class="bio-social-row">${socials}</div>
    </section>
  </div>`;
}
