import Fuse from '../vendor/fuse.mjs';
import { escapeHtml } from './utils.js';
import { ICONS } from './icons.js';
import { modalHtml } from './modal.js';
import { state, locale } from '../app/state.js';
import { NAV } from '../app/data.js';

/**
 * Site search: a small icon button plus a classic overlay modal (the same
 * modalHtml() used by the Portfolio/Event detail dialogs). The index is a
 * plain {title, sub, href}[] array built from the active locale — Fuse.js
 * (vendored locally in vendor/fuse.mjs, no CDN/CSP change needed) runs a
 * fuzzy search against it, so typos still find results. Results update via
 * renderSearchResults() without a full page re-render, so the input never
 * loses focus while typing.
 */

let cachedForCode = null;
let cachedFuse = null;

function buildSearchIndex(loc) {
  const index = [];
  NAV.forEach((item) => index.push({ title: loc.nav[item.route], href: `#/${item.route}` }));
  loc.portfolio.forEach((entry) =>
    index.push({
      title: entry.title,
      sub: entry.short,
      href: `#/projects/${entry.tagSlug}/${entry.dateSlug}`,
    })
  );
  loc.termine.forEach((entry) =>
    index.push({
      title: entry.title,
      sub: entry.location,
      href: `#/events/${entry.tagSlug}/${entry.dateSlug}`,
    })
  );
  loc.library.forEach((entry) =>
    index.push({ title: entry.title, sub: entry.desc, href: `#/library/${entry.slug}` })
  );
  loc.feedsPosts.forEach((entry) =>
    index.push({
      title: entry.title,
      sub: entry.desc,
      href: `#/feeds/${entry.formatSlug}/${entry.dateSlug}`,
    })
  );
  loc.focusItems.forEach((entry) => index.push({ title: entry.title, sub: entry.desc, href: '#/feeds' }));
  index.push({ title: loc.t.kontaktTitle, href: '#/contact' });
  index.push({ title: loc.t.formularTitle, href: '#/quote' });
  index.push({ title: 'Impressum', href: '#/legal' });
  index.push({ title: 'Bio', href: '#/bio' });
  return index;
}

function fuseForActiveLocale() {
  if (cachedForCode !== locale.code) {
    cachedFuse = new Fuse(buildSearchIndex(locale), {
      keys: ['title', 'sub'],
      threshold: 0.35,
      ignoreLocation: true,
    });
    cachedForCode = locale.code;
  }
  return cachedFuse;
}

export function renderSearchResults() {
  const query = state.searchQuery.trim();
  if (!query) return '';
  const matches = fuseForActiveLocale()
    .search(query)
    .slice(0, 8)
    .map((result) => result.item);
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

export function searchResultCountHtml() {
  const query = state.searchQuery.trim();
  if (!query) return '';
  const t = locale.t;
  const count = fuseForActiveLocale().search(query).slice(0, 8).length;
  const template = count === 1 ? t.searchResultsCountSingular : t.searchResultsCountPlural;
  return `<p class="search-result-count" aria-live="polite">${escapeHtml(template.replace('{count}', String(count)))}</p>`;
}

export function searchButtonHtml(view) {
  const t = view.t;
  return `
    <button type="button" class="nav-link" data-action="toggle-search" aria-expanded="${state.searchOpen}" aria-label="${escapeHtml(t.search)}" title="${escapeHtml(t.search)}" data-tooltip="${escapeHtml(t.search)}">
      <span class="nav-icon" aria-hidden="true">${ICONS.search}</span>
      <span class="nav-label">${escapeHtml(t.search)}</span>
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
      <label class="search-label" for="site-search-input">${escapeHtml(t.searchLabel)}</label>
      <input type="search" class="search-input" id="site-search-input" placeholder="${escapeHtml(t.searchPlaceholder)}" value="${escapeHtml(state.searchQuery)}" autocomplete="off">
      <div id="site-search-result-count">${searchResultCountHtml()}</div>
      <div class="search-results" id="site-search-results">${renderSearchResults()}</div>`,
  });
}
