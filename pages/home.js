import { escapeHtml } from '../components/utils.js';
import { ICONS } from '../components/icons.js';
import { pillHtml } from '../components/pill.js';
import { portfolioCardHtml, eventCardHtml, libraryCardHtml } from '../components/card.js';

export function renderHome(view) {
  const t = view.t;
  const roles = view.roles.map((role) => pillHtml(role.label, { icon: role.icon })).join('');
  const portfolioCards = view.homePortfolio.map((entry) => portfolioCardHtml(entry)).join('');
  const focusPills = view.focusItems.map((item) => pillHtml(item.title, { solid: true })).join('');
  const eventCards = view.homeTermine.map((entry) => eventCardHtml(entry)).join('');
  const libraryCards = view.homeLibrary.map((entry) => libraryCardHtml(entry)).join('');

  return `
  <div data-screen-label="Start">
    <section class="section-hero">
      <img src="./assets/profilfoto.png" alt="${escapeHtml(t.portraitAlt)}" class="avatar">
      <div>
        <h1>${escapeHtml(t.heroTagline)}</h1>
        <div class="pill-row" style="margin-top:18px">${roles}</div>
      </div>
    </section>

    <hr class="divider">
    <section class="section">
      <h2 class="section-title">${ICONS.about}<span>${escapeHtml(t.aboutTitle)}</span></h2>
      <div class="card"><p>${escapeHtml(t.uberMichText)}</p></div>
      <a href="#/about" class="more-link">${escapeHtml(t.moreAbout)}</a>
    </section>

    <hr class="divider">
    <section class="section">
      <h2 class="section-title">${ICONS.rocket}<span>${escapeHtml(t.portfolioTitle)}</span></h2>
      <div class="card-list">${portfolioCards}</div>
      <a href="#/projects" class="more-link">${escapeHtml(t.alleProjekte)}</a>
    </section>

    <hr class="divider">
    <section class="section">
      <h2 class="section-title">${ICONS.feed}<span>${escapeHtml(t.focusTitle)}</span></h2>
      <div class="card"><div class="pill-row align-start">${focusPills}</div></div>
      <a href="#/feeds" class="more-link">${escapeHtml(t.moreFocus)}</a>
    </section>

    <hr class="divider">
    <section class="section">
      <h2 class="section-title">${ICONS.events}<span>${escapeHtml(t.eventsTitle)}</span></h2>
      <div class="card-list">${eventCards}</div>
      <a href="#/events" class="more-link">${escapeHtml(t.alleTermine)}</a>
    </section>

    <hr class="divider">
    <section class="section">
      <h2 class="section-title">${ICONS.library}<span>${escapeHtml(t.libraryTitle)}</span></h2>
      <div class="card-list">${libraryCards}</div>
      <a href="#/library" class="more-link">${escapeHtml(t.moreLibrary)}</a>
    </section>
  </div>`;
}
