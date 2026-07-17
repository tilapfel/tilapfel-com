import { escapeHtml } from '../components/utils.js';
import { ICONS } from '../components/icons.js';
import { portfolioCardHtml } from '../components/card.js';
import { modalHtml } from '../components/modal.js';
import { shareToggleHtml } from '../components/toggles.js';

export function renderPortfolioList(view) {
  const t = view.t;
  const cards = view.portfolio.map((entry) => portfolioCardHtml(entry, { detailed: true })).join('');
  return `
  <div data-screen-label="Portfolio">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.rocket}<span>${escapeHtml(t.portfolioTitle)}</span></h1>
      <p class="subtitle">${escapeHtml(t.portfolioSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section card-list">${cards}</section>
  </div>`;
}

export function renderPortfolioModal(view) {
  const entry = view.currentPortfolio;
  if (!entry) return '';
  return modalHtml({
    labelledBy: 'pf-modal-title',
    closeLabel: view.t.closeDialog,
    shareHtml: shareToggleHtml(view, { dropDown: true }),
    bodyHtml: `
      <div class="modal-eyebrow-row">
        <span>${escapeHtml(entry.date)}</span><span>·</span><span class="cat">${escapeHtml(entry.category)}</span><span>·</span><span>${escapeHtml(entry.location)}</span>
      </div>
      <h2 id="pf-modal-title">${escapeHtml(entry.title)}</h2>
      <p>${escapeHtml(entry.full)}</p>
      <p>${escapeHtml(entry.approach)}</p>`,
  });
}
