import { escapeHtml } from './utils.js';
import { ICONS } from './icons.js';
import { state } from '../app/state.js';
import { AVAILABLE_LOCALES, LOCALE_META } from '../app/data.js';

/**
 * Utility toggle buttons (theme / language / easy language / share), each
 * with its own small popover. Used by both the site footer and the Bio
 * page's top-right bar, so the markup and behavior exist exactly once.
 * `dropDown` opens the popover below the button instead of above, for use
 * near the top of a page.
 */

export function themeToggleHtml(view) {
  const label = state.theme === 'dark' ? view.t.themeToLight : view.t.themeToDark;
  return `
    <button type="button" class="icon-btn" data-action="toggle-theme" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}">
      <span aria-hidden="true">${state.theme === 'dark' ? ICONS.moon : ICONS.sun}</span>
    </button>`;
}

export function langToggleHtml(view, { dropDown = false } = {}) {
  const menu = state.langMenuOpen
    ? `
    <div class="lang-menu-backdrop" data-close-lang-menu></div>
    <div class="lang-menu${dropDown ? ' drop-down' : ''}">
      ${AVAILABLE_LOCALES.map(
        (code) => `
        <button type="button" class="${view.lang === code ? 'active' : ''}" data-set-lang="${code}" aria-pressed="${view.lang === code}">
          <span>${escapeHtml(LOCALE_META[code].nativeName)}</span>${view.lang === code ? '<span aria-hidden="true">✓</span>' : ''}
        </button>`
      ).join('')}
    </div>`
    : '';
  return `
    <div class="lang-menu-wrap">
      <button type="button" class="icon-btn" data-action="toggle-lang-menu" aria-expanded="${state.langMenuOpen}" aria-haspopup="true" aria-label="Sprache / Language" title="Sprache / Language">
        <span aria-hidden="true">${ICONS.globe}</span>
      </button>
      ${menu}
    </div>`;
}

/** Toggle only — no simplified-language content exists yet, this just remembers the visitor's preference. */
export function easyLangToggleHtml(view) {
  const t = view.t;
  const menu = state.easyLangMenuOpen
    ? `
    <div class="lang-menu-backdrop" data-close-easylang-menu></div>
    <div class="lang-menu">
      <button type="button" class="${state.easyLanguage ? 'active' : ''}" data-set-easylang="on" aria-pressed="${state.easyLanguage}">
        <span>${escapeHtml(t.easyLanguageOn)}</span>${state.easyLanguage ? '<span aria-hidden="true">✓</span>' : ''}
      </button>
      <button type="button" class="${!state.easyLanguage ? 'active' : ''}" data-set-easylang="off" aria-pressed="${!state.easyLanguage}">
        <span>${escapeHtml(t.easyLanguageOff)}</span>${!state.easyLanguage ? '<span aria-hidden="true">✓</span>' : ''}
      </button>
    </div>`
    : '';
  return `
    <div class="lang-menu-wrap">
      <button type="button" class="icon-btn" data-action="toggle-easylang-menu" aria-expanded="${state.easyLangMenuOpen}" aria-haspopup="true" aria-label="${escapeHtml(t.easyLanguage)}" title="${escapeHtml(t.easyLanguage)}">
        <span aria-hidden="true">${ICONS.easyLanguage}</span>
      </button>
      ${menu}
    </div>`;
}

export function shareToggleHtml(view, { dropDown = false } = {}) {
  const t = view.t;
  const menu = state.shareMenuOpen
    ? `
    <div class="lang-menu-backdrop" data-close-share-menu></div>
    <div class="lang-menu share-menu${dropDown ? ' drop-down' : ''}">
      <p class="share-url">${escapeHtml(location.href)}</p>
      <button type="button" class="btn-outline" data-action="copy-share-link">${escapeHtml(state.shareCopied ? t.linkCopied : t.copyLink)}</button>
    </div>`
    : '';
  return `
    <div class="lang-menu-wrap">
      <button type="button" class="icon-btn" data-action="toggle-share" aria-label="${escapeHtml(t.share)}" title="${escapeHtml(t.share)}">
        <span aria-hidden="true">${ICONS.share}</span>
      </button>
      ${menu}
    </div>`;
}
