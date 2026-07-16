import { escapeHtml } from './utils.js';
import { ICONS } from './icons.js';
import { modalHtml } from './modal.js';
import { state, locale } from '../app/state.js';
import { NAV } from '../app/data.js';

/**
 * Site search: a small icon button plus a classic overlay modal (the same
 * modalHtml() used by the Portfolio/Event detail dialogs). The index is
 * rebuilt from the active locale on every search, so results are
 * language-appropriate for free. Results update via renderSearchResults()
 * without a full page re-render, so the input never loses focus while typing.
 */

function buildSearchIndex(loc) {
  const index = [];
  NAV.forEach((item) => index.push({ title: loc.nav[item.route], href: `#/${item.route}` }));
  loc.portfolio.forEach((entry) =>
    index.push({ title: entry.title, sub: entry.short, href: `#/portfolio/${entry.slug}` })
  );
  loc.termine.forEach((entry) =>
    index.push({ title: entry.title, sub: entry.location, href: `#/events/${entry.slug}` })
  );
  loc.library.forEach((entry) => index.push({ title: entry.title, sub: entry.desc, href: '#/library' }));
  loc.focusItems.forEach((entry) => index.push({ title: entry.title, sub: entry.desc, href: '#/focus' }));
  index.push({ title: loc.t.kontaktTitle, href: '#/kontakt' });
  index.push({ title: loc.t.formularTitle, href: '#/formular' });
  index.push({ title: 'Impressum', href: '#/impressum' });
  index.push({ title: 'Bio', href: '#/bio' });
  return index;
}

export function renderSearchResults() {
  const query = state.searchQuery.trim().toLowerCase();
  if (!query) return '';
  const matches = buildSearchIndex(locale)
    .filter(
      (item) =>
        item.title.toLowerCase().includes(query) || (item.sub && item.sub.toLowerCase().includes(query))
    )
    .slice(0, 8);
  if (!matches.length) return `<p class="search-empty">${escapeHtml(locale.t.searchNoResults)}</p>`;
  return matches
    .map(
      (match) => `
    <a class="search-result" href="${match.href}" data-action="close-search">
      <span class="search-result-title">${escapeHtml(match.title)}</span>
      ${match.sub ? `<span class="search-result-sub">${escapeHtml(match.sub)}</span>` : ''}
    </a>`
    )
    .join('');
}

export function searchButtonHtml(view) {
  const t = view.t;
  return `
    <button type="button" class="icon-btn" data-action="toggle-search" aria-expanded="${state.searchOpen}" aria-label="${escapeHtml(t.search)}" title="${escapeHtml(t.search)}">
      <span aria-hidden="true">${ICONS.search}</span>
    </button>`;
}

export function searchModalHtml(view) {
  if (!state.searchOpen) return '';
  const t = view.t;
  return modalHtml({
    labelledBy: 'search-modal-title',
    closeLabel: t.closeDialog,
    bodyHtml: `
      <h2 id="search-modal-title">${escapeHtml(t.search)}</h2>
      <input type="search" class="search-input" id="site-search-input" placeholder="${escapeHtml(t.searchPlaceholder)}" value="${escapeHtml(state.searchQuery)}" autocomplete="off">
      <div class="search-results" id="site-search-results">${renderSearchResults()}</div>`,
  });
}
