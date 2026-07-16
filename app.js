'use strict';

/* ---------- Icon root ----------
   Every SVG glyph in the app lives here, once. Nothing else defines an
   icon constant — add new icons as a key on this object. */
const ICONS = {
  about: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20c0-4 3.5-6.5 7.5-6.5s7.5 2.5 7.5 6.5"/></svg>',
  portfolio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v18"/><path d="M6 4h11l-3 4 3 4H6"/></svg>',
  focus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="13" r="8"/><circle cx="11" cy="13" r="4"/><path d="M11 13 19 5"/><path d="M14 5h5v5"/></svg>',
  events: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(0,-1.2)"><rect x="4" y="5.5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3.5v3M16 3.5v3"/></g></svg>',
  library: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="4" height="15" rx="1"/><rect x="10" y="3" width="4" height="17" rx="1"/><rect x="16" y="7" width="4" height="13" rx="1"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 14.8A8.2 8.2 0 0 1 9.2 4a8.2 8.2 0 1 0 10.8 10.8z"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9z"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V4M8 8l4-4 4 4"/><path d="M4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  easyLanguage: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3.5h8l3 3v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1z"/><path d="M9 12.5h6"/><circle cx="17" cy="17.5" r="4.5" fill="var(--bg-card)"/><path d="m15.1 17.5 1.3 1.3 2.4-2.6"/></svg>',
  paragraph: '<svg viewBox="0 0 24 24"><text x="12" y="18.5" font-size="19" font-weight="700" fill="currentColor" text-anchor="middle" font-family="Georgia, \'Times New Roman\', serif">§</text></svg>',
  roleActivist: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 11V6.5a1.5 1.5 0 0 1 3 0V6a1.5 1.5 0 0 1 3 0v.5a1.5 1.5 0 0 1 3 0V11"/><path d="M16 11a1.5 1.5 0 0 1 3 0v3.5A6.5 6.5 0 0 1 12.5 21h-1A6.5 6.5 0 0 1 5 14.5v-1.6c0-.5.2-1 .6-1.3L7 10.5"/></svg>',
  roleBoard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5c2.8 1.8 4.5 5.5 4.5 9 0 2-.8 3.8-1.8 5l-2.7 2.8-2.7-2.8c-1-1.2-1.8-3-1.8-5 0-3.5 1.7-7.2 4.5-9z"/><circle cx="12" cy="9.5" r="1.8"/><path d="M8.3 15.5 5.5 17l1-3M15.7 15.5l2.8 1.5-1-3"/></svg>',
  roleLecturer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/><path d="m8.5 12 2.5-3 2 2 3-3.5"/></svg>',
  grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7-4.4-9.5-9C1 8 2 4 6 4c2 0 4 1.2 6 4 2-2.8 4-4 6-4 4 0 5 4 3.5 7-2.5 4.6-9.5 9-9.5 9z"/></svg>',
  network: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M7.8 7.6 10.4 16M16.2 7.6 13.6 16M8.4 6h7.2"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 7.5v9l7-4.5z" fill="currentColor" stroke="none"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.3" cy="7.7" r="0.9" fill="currentColor" stroke="none"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 6.5 4.5 12l4.5 5.5M15 6.5l4.5 5.5-4.5 5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.2 19v-6.2h2.1l.3-2.6h-2.4V8.5c0-.7.2-1.2 1.2-1.2h1.3V5c-.2 0-1-.1-1.9-.1-2 0-3.3 1.2-3.3 3.4v2h-2.2v2.6h2.2V19z" fill="currentColor" stroke="none"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="7.5" cy="7" r="1.3" fill="currentColor" stroke="none"/><path d="M7.5 10.2V19" stroke-linecap="round" stroke-width="2.2"/><path d="M12 10.2V19M12 13.8c0-2.4 1.4-3.6 3-3.6s3 1.2 3 3.6V19" stroke-linecap="round" stroke-width="2.2"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3.5h8l3 3v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1z"/><path d="M9 10h6M9 13.5h6M9 17h4"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 6.5l8 6 8-6"/></svg>'
};
const ROLE_ICONS = [ICONS.roleActivist, ICONS.roleBoard, ICONS.roleLecturer];

/* ---------- Nav structure (route + icon are language-independent; labels come from the active locale) ---------- */
const NAV = [
  { route: 'about', icon: 'about' },
  { route: 'portfolio', icon: 'portfolio' },
  { route: 'focus', icon: 'focus' },
  { route: 'events', icon: 'events' },
  { route: 'library', icon: 'library' }
];

/* ---------- Bio page links: proper nouns / brand names, identical across languages ----------
   Primary links render as neutral full-width tiles; social links render as
   small brand-colored circular icons in a row (linktr.ee-style). */
const BIO_PRIMARY_LINKS = [
  { label: 'Website', href: '#/', url: 'tilapfel.com', icon: ICONS.network },
  { label: 'Stiftung', href: 'https://stiftung.tilapfel.com', url: 'stiftung.tilapfel.com', icon: ICONS.heart },
  { label: 'Apps', href: 'https://apps.tilapfel.com', url: 'apps.tilapfel.com', icon: ICONS.grid }
];
const BIO_SOCIAL_LINKS = [
  { label: 'YouTube', href: 'https://www.youtube.com/@tilapfel', bg: 'oklch(52% 0.09 25)', icon: ICONS.youtube },
  { label: 'Instagram', href: 'https://www.instagram.com/tilapfel', bg: 'oklch(52% 0.09 340)', icon: ICONS.instagram },
  { label: 'Facebook', href: 'https://www.facebook.com/tilapfel', bg: 'oklch(52% 0.09 255)', icon: ICONS.facebook },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tilapfel', bg: 'oklch(52% 0.09 230)', icon: ICONS.linkedin },
  { label: 'GitHub', href: 'https://github.com/tilapfel', bg: 'oklch(30% 0 0)', icon: ICONS.github }
];

const CONTACT_EMAIL = 'info@tilapfel.com';

/* ---------- Localization registry ----------
   Every file in ./locales/ must export a default object with the exact
   same shape (see locales/de.js). Adding a language = adding a file here
   plus a matching entry in AVAILABLE_LOCALES / LOCALE_META. Only the
   active locale is ever fetched; others load on demand when switched to. */
const AVAILABLE_LOCALES = ['de', 'en'];
const LOCALE_META = { de: { nativeName: 'Deutsch' }, en: { nativeName: 'English' } };
const DEFAULT_LOCALE = 'de';

const localeCache = new Map();
function loadLocale(code) {
  if (localeCache.has(code)) return Promise.resolve(localeCache.get(code));
  return import(`./locales/${code}.js`).then(mod => {
    localeCache.set(code, mod.default);
    return mod.default;
  });
}

function detectSystemLocale() {
  const langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || DEFAULT_LOCALE];
  for (const l of langs) {
    const code = String(l).toLowerCase().split('-')[0];
    if (AVAILABLE_LOCALES.includes(code)) return code;
  }
  return DEFAULT_LOCALE;
}

/* ---------- Helpers ---------- */
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Only one utility popover (language/easy-language/share/search) should be open at a time.
function closeMenus() {
  state.langMenuOpen = false;
  state.easyLangMenuOpen = false;
  state.shareMenuOpen = false;
  state.searchOpen = false;
}

function dismissOnboarding() {
  state.onboardingOpen = false;
  try { localStorage.setItem('tilapfel-onboarded', '1'); } catch (e) {}
  render();
}

// Whichever overlay is currently showing (onboarding, search, or a portfolio/event detail) closes itself.
function closeActiveModal(v) {
  if (state.onboardingOpen) { dismissOnboarding(); return; }
  if (state.searchOpen) { state.searchOpen = false; state.searchQuery = ''; render(); return; }
  location.hash = '#/' + (v.section === 'portfolio' ? 'portfolio' : 'events');
}

// Fallback when navigator.clipboard is unavailable/denied: select the URL text so the user can copy it manually.
function selectShareUrl() {
  const urlEl = document.querySelector('.share-url');
  if (!urlEl) return;
  const range = document.createRange();
  range.selectNodeContents(urlEl);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

/* ---------- Shared card/pill/modal components ----------
   Each recurring structural block (pill, simple card, portfolio/event/
   library entry, modal shell) has exactly one implementation here. Every
   page that shows that kind of block — home preview or full list — calls
   the same function, so a future edit can't drift between the two. */

function pillHtml(label, { icon, solid } = {}) {
  const iconHtml = icon ? `<span aria-hidden="true">${icon}</span>` : '';
  return `<span class="pill${solid ? ' solid' : ''}">${iconHtml}<span>${esc(label)}</span></span>`;
}

function simpleCardHtml({ title, desc }) {
  return `<div class="card card-simple"><h3>${esc(title)}</h3><p>${esc(desc)}</p></div>`;
}

// Portfolio entry: compact (home preview) shows date · category; detailed (full list) also shows location.
function portfolioCardHtml(p, { detailed = false } = {}) {
  const meta = detailed
    ? `<div class="card-meta">
        <span class="meta-strong">${esc(p.date)}</span><span>·</span>
        <span class="eyebrow" style="margin:0">${esc(p.category)}</span><span>·</span>
        <span>${esc(p.location)}</span>
      </div>`
    : `<span class="eyebrow">${esc(p.date)} · ${esc(p.category)}</span>`;
  return `
    <a class="list-card" href="${p.href}">
      ${meta}
      <h3>${esc(p.title)}</h3>
      <p class="desc">${esc(p.short)}</p>
    </a>`;
}

// Event/Termin entry: linked (home preview + upcoming list) or plain (past events); muted dims it.
function eventCardHtml(tm, { linked = true, muted = false } = {}) {
  const tag = linked ? 'a' : 'div';
  const hrefAttr = linked ? ` href="${tm.href}"` : '';
  return `
    <${tag} class="list-card${muted ? ' past' : ''}"${hrefAttr}>
      <span class="eyebrow-plain">${esc(tm.date)} · ${esc(tm.category)}</span>
      <h3>${esc(tm.title)}</h3>
      <p class="desc">${esc(tm.location)}</p>
    </${tag}>`;
}

function libraryCardHtml(l) {
  return `
    <div class="card card-simple">
      <span class="eyebrow">${esc(l.type)}</span>
      <h3>${esc(l.title)}</h3>
      <p>${esc(l.desc)}</p>
    </div>`;
}

// Shared overlay/dialog/close-button shell for the portfolio and event detail modals.
function modalShell({ labelledBy, closeLabel, bodyHtml }) {
  return `
  <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="${labelledBy}">
    <div class="modal-backdrop" data-close-modal></div>
    <div class="modal" tabindex="-1">
      <button type="button" class="modal-close" data-close-modal aria-label="${esc(closeLabel)}">
        <span aria-hidden="true">${ICONS.close}</span>
      </button>
      ${bodyHtml}
    </div>
  </div>`;
}

/* ---------- Shared utility toggles (theme/language/share/search) ----------
   Used by both the site footer and the Bio page's top-right bar, so the
   markup and behavior exist exactly once. `dropDown` opens the popover
   below the button instead of above, for use near the top of a page. */
function themeToggleHtml(v) {
  const label = state.theme === 'dark' ? v.t.themeToLight : v.t.themeToDark;
  return `
    <button type="button" class="icon-btn" data-action="toggle-theme" aria-label="${esc(label)}" title="${esc(label)}">
      <span aria-hidden="true">${state.theme === 'dark' ? ICONS.moon : ICONS.sun}</span>
    </button>`;
}

function langToggleHtml(v, { dropDown = false } = {}) {
  const menu = state.langMenuOpen ? `
    <div class="lang-menu-backdrop" data-close-lang-menu></div>
    <div class="lang-menu${dropDown ? ' drop-down' : ''}">
      ${AVAILABLE_LOCALES.map(code => `
        <button type="button" class="${v.lang === code ? 'active' : ''}" data-set-lang="${code}" aria-pressed="${v.lang === code}">
          <span>${esc(LOCALE_META[code].nativeName)}</span>${v.lang === code ? '<span aria-hidden="true">✓</span>' : ''}
        </button>`).join('')}
    </div>` : '';
  return `
    <div class="lang-menu-wrap">
      <button type="button" class="icon-btn" data-action="toggle-lang-menu" aria-expanded="${state.langMenuOpen}" aria-haspopup="true" aria-label="Sprache / Language" title="Sprache / Language">
        <span aria-hidden="true">${ICONS.globe}</span>
      </button>
      ${menu}
    </div>`;
}

// Toggle only — no simplified-language content exists yet, this just remembers the visitor's preference.
function easyLangToggleHtml(v) {
  const t = v.t;
  const menu = state.easyLangMenuOpen ? `
    <div class="lang-menu-backdrop" data-close-easylang-menu></div>
    <div class="lang-menu">
      <button type="button" class="${state.easyLanguage ? 'active' : ''}" data-set-easylang="on" aria-pressed="${state.easyLanguage}">
        <span>${esc(t.easyLanguageOn)}</span>${state.easyLanguage ? '<span aria-hidden="true">✓</span>' : ''}
      </button>
      <button type="button" class="${!state.easyLanguage ? 'active' : ''}" data-set-easylang="off" aria-pressed="${!state.easyLanguage}">
        <span>${esc(t.easyLanguageOff)}</span>${!state.easyLanguage ? '<span aria-hidden="true">✓</span>' : ''}
      </button>
    </div>` : '';
  return `
    <div class="lang-menu-wrap">
      <button type="button" class="icon-btn" data-action="toggle-easylang-menu" aria-expanded="${state.easyLangMenuOpen}" aria-haspopup="true" aria-label="${esc(t.easyLanguage)}" title="${esc(t.easyLanguage)}">
        <span aria-hidden="true">${ICONS.easyLanguage}</span>
      </button>
      ${menu}
    </div>`;
}

function shareToggleHtml(v, { dropDown = false } = {}) {
  const t = v.t;
  const menu = state.shareMenuOpen ? `
    <div class="lang-menu-backdrop" data-close-share-menu></div>
    <div class="lang-menu share-menu${dropDown ? ' drop-down' : ''}">
      <p class="share-url">${esc(location.href)}</p>
      <button type="button" class="btn-outline" data-action="copy-share-link">${esc(state.shareCopied ? t.linkCopied : t.copyLink)}</button>
    </div>` : '';
  return `
    <div class="lang-menu-wrap">
      <button type="button" class="icon-btn" data-action="toggle-share" aria-label="${esc(t.share)}" title="${esc(t.share)}">
        <span aria-hidden="true">${ICONS.share}</span>
      </button>
      ${menu}
    </div>`;
}

function searchButtonHtml(v) {
  const t = v.t;
  return `
    <button type="button" class="icon-btn" data-action="toggle-search" aria-expanded="${state.searchOpen}" aria-label="${esc(t.search)}" title="${esc(t.search)}">
      <span aria-hidden="true">${ICONS.search}</span>
    </button>`;
}

// Search uses the same classic overlay modal as the Portfolio/Event detail dialogs, not a corner popover.
function searchModalHtml(v) {
  if (!state.searchOpen) return '';
  const t = v.t;
  return modalShell({
    labelledBy: 'search-modal-title',
    closeLabel: t.closeDialog,
    bodyHtml: `
      <h2 id="search-modal-title">${esc(t.search)}</h2>
      <input type="search" class="search-input" id="site-search-input" placeholder="${esc(t.searchPlaceholder)}" value="${esc(state.searchQuery)}" autocomplete="off">
      <div class="search-results" id="site-search-results">${renderSearchResults()}</div>`
  });
}

/* ---------- Site search ----------
   Index is rebuilt from the active locale (so results are language-
   appropriate for free) and filtered on every keystroke without a full
   page re-render, so the input never loses focus while typing. */
function buildSearchIndex(loc) {
  const idx = [];
  NAV.forEach(n => idx.push({ title: loc.nav[n.route], href: '#/' + n.route }));
  loc.portfolio.forEach(p => idx.push({ title: p.title, sub: p.short, href: '#/portfolio/' + p.slug }));
  loc.termine.forEach(tm => idx.push({ title: tm.title, sub: tm.location, href: '#/events/' + tm.slug }));
  loc.library.forEach(l => idx.push({ title: l.title, sub: l.desc, href: '#/library' }));
  loc.focusItems.forEach(f => idx.push({ title: f.title, sub: f.desc, href: '#/focus' }));
  idx.push({ title: loc.t.kontaktTitle, href: '#/kontakt' });
  idx.push({ title: loc.t.formularTitle, href: '#/formular' });
  idx.push({ title: 'Impressum', href: '#/impressum' });
  idx.push({ title: 'Bio', href: '#/bio' });
  return idx;
}

function renderSearchResults() {
  const q = state.searchQuery.trim().toLowerCase();
  if (!q) return '';
  const matches = buildSearchIndex(locale)
    .filter(item => item.title.toLowerCase().includes(q) || (item.sub && item.sub.toLowerCase().includes(q)))
    .slice(0, 8);
  if (!matches.length) return `<p class="search-empty">${esc(locale.t.searchNoResults)}</p>`;
  return matches.map(m => `
    <a class="search-result" href="${m.href}" data-action="close-search">
      <span class="search-result-title">${esc(m.title)}</span>
      ${m.sub ? `<span class="search-result-sub">${esc(m.sub)}</span>` : ''}
    </a>`).join('');
}

/* ---------- First-visit onboarding ----------
   Shown once until dismissed (tilapfel-onboarded in localStorage). Lets a
   new visitor pick language, easy language, and theme up front, each as a
   labelled choice — not icon-only, since this is the one place explaining
   what the icons mean. Reuses the same setLang / easy-language / theme
   state changes as the footer controls, just triggered from different
   buttons, so there is exactly one source of truth for each preference. */
function onboardingModalHtml(v) {
  if (!state.onboardingOpen) return '';
  const t = v.t;
  const langChoices = AVAILABLE_LOCALES.map(code => `
    <button type="button" class="onboarding-choice${v.lang === code ? ' active' : ''}" data-set-lang="${code}">${esc(LOCALE_META[code].nativeName)}</button>`).join('');
  return modalShell({
    labelledBy: 'onboarding-title',
    closeLabel: t.closeDialog,
    bodyHtml: `
      <h2 id="onboarding-title">${esc(t.onboardingTitle)}</h2>
      <p class="onboarding-intro">${esc(t.onboardingIntro)}</p>

      <div class="onboarding-group">
        <h3 class="onboarding-group-title">${esc(t.onboardingLangLabel)}</h3>
        <div class="onboarding-choice-row">${langChoices}</div>
      </div>

      <div class="onboarding-group">
        <h3 class="onboarding-group-title">${esc(t.easyLanguage)}</h3>
        <div class="onboarding-choice-row">
          <button type="button" class="onboarding-choice${state.easyLanguage ? ' active' : ''}" data-set-easylang="on">${esc(t.easyLanguageOn)}</button>
          <button type="button" class="onboarding-choice${!state.easyLanguage ? ' active' : ''}" data-set-easylang="off">${esc(t.easyLanguageOff)}</button>
        </div>
      </div>

      <div class="onboarding-group">
        <h3 class="onboarding-group-title">${esc(t.onboardingThemeLabel)}</h3>
        <div class="onboarding-choice-row">
          <button type="button" class="onboarding-choice${state.theme === 'light' ? ' active' : ''}" data-set-theme="light">${esc(t.onboardingLight)}</button>
          <button type="button" class="onboarding-choice${state.theme === 'dark' ? ' active' : ''}" data-set-theme="dark">${esc(t.onboardingDark)}</button>
        </div>
      </div>

      <button type="button" class="cta-button compact" data-action="close-onboarding">${esc(t.onboardingDone)}</button>`
  });
}

/* ---------- State ---------- */
let storedLang = null, storedTheme = null, storedEasyLang = null, storedOnboarded = null;
try { storedLang = localStorage.getItem('tilapfel-lang'); } catch (e) {}
try { storedTheme = localStorage.getItem('tilapfel-theme'); } catch (e) {}
try { storedEasyLang = localStorage.getItem('tilapfel-easy-lang'); } catch (e) {}
try { storedOnboarded = localStorage.getItem('tilapfel-onboarded'); } catch (e) {}

const state = {
  lang: (storedLang && AVAILABLE_LOCALES.includes(storedLang)) ? storedLang : detectSystemLocale(),
  theme: storedTheme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
  easyLanguage: storedEasyLang === '1',
  eventsExpanded: false,
  langMenuOpen: false,
  easyLangMenuOpen: false,
  shareMenuOpen: false,
  shareCopied: false,
  searchOpen: false,
  searchQuery: '',
  onboardingOpen: !storedOnboarded
};
let locale = null;

function parseRoute() {
  const h = location.hash || '#/';
  return h.replace(/^#\/?/, '');
}

/* ---------- Derived values ---------- */
function computeVals() {
  const route = parseRoute();
  const segs = route.split('/').filter(Boolean);
  const section = segs[0] || '';
  const slug = segs[1];
  const isBio = section === 'bio';
  const t = locale.t;

  const portfolioLocalized = locale.portfolio.map(p => ({ ...p, href: '#/portfolio/' + p.slug }));
  const termineLocalized = locale.termine.map(tm => ({
    ...tm,
    href: '#/events/' + tm.slug,
    rsvpHref: 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(t.emailSubjectRegistration + tm.title)
  }));

  const currentPortfolio = section === 'portfolio' && slug ? portfolioLocalized.find(p => p.slug === slug) : null;
  const currentTermin = section === 'events' && slug ? termineLocalized.find(tm => tm.slug === slug) : null;

  const expanded = state.eventsExpanded;
  const visibleTermine = expanded ? termineLocalized : termineLocalized.slice(0, 3);
  const remaining = termineLocalized.length - 3;

  return {
    route, section, slug, isBio, lang: locale.code, t,
    navItems: NAV.map(n => ({ ...n, label: locale.nav[n.route], href: '#/' + n.route, current: section === n.route })),
    portfolio: portfolioLocalized,
    homePortfolio: portfolioLocalized.slice(0, 2),
    termine: termineLocalized,
    homeTermine: termineLocalized.slice(0, 1),
    visibleTermine,
    hasMoreTermine: remaining > 0 && !expanded,
    moreEventsLabel: t.moreEventsTemplate.replace('{n}', remaining),
    pastTermine: locale.pastTermine,
    hasPastTermine: locale.pastTermine.length > 0,
    currentPortfolio, currentTermin,
    library: locale.library,
    homeLibrary: locale.library.slice(0, 2),
    press: locale.press,
    focusItems: locale.focusItems,
    werte: locale.werte,
    principles: locale.principles,
    bookableFormats: locale.bookable,
    roles: locale.roleLabels.map((label, i) => ({ label, icon: ROLE_ICONS[i] })),
    aboutRoles: locale.roleLabels.map((title, i) => ({ title, desc: locale.roleDescs[i], icon: ROLE_ICONS[i] })),
    bioPrimaryLinks: BIO_PRIMARY_LINKS,
    bioSocialLinks: BIO_SOCIAL_LINKS,
    auftragArten: locale.auftragArten
  };
}

/* ---------- Renderers ---------- */
function renderHeader(v) {
  if (v.isBio) return '';
  const navHtml = v.navItems.map(n => `
    <a class="nav-link" href="${n.href}" ${n.current ? 'aria-current="page"' : ''}>
      <span class="nav-icon" aria-hidden="true">${ICONS[n.icon]}</span>
      <span class="nav-label">${esc(n.label)}</span>
    </a>`).join('');
  return `
  <header class="site-header">
    <div class="header-inner">
      <div class="header-top-row">
        <a href="#/" class="brand">Til Apfel</a>
      </div>
      <nav class="nav-full" aria-label="${esc(v.t.navAriaLabel)}">${navHtml}</nav>
    </div>
  </header>`;
}

function renderHome(v) {
  const t = v.t;
  const roles = v.roles.map(r => pillHtml(r.label, { icon: r.icon })).join('');
  const portfolioCards = v.homePortfolio.map(p => portfolioCardHtml(p)).join('');
  const focusPills = v.focusItems.map(f => pillHtml(f.title, { solid: true })).join('');
  const eventCards = v.homeTermine.map(tm => eventCardHtml(tm)).join('');
  const libraryCards = v.homeLibrary.map(l => libraryCardHtml(l)).join('');

  return `
  <div data-screen-label="Start">
    <section class="section-hero">
      <img src="./assets/profilfoto.png" alt="${esc(t.portraitAlt)}" class="avatar">
      <div>
        <h1>${esc(t.heroTagline)}</h1>
        <div class="pill-row" style="margin-top:18px">${roles}</div>
      </div>
    </section>

    <hr class="divider">
    <section class="section">
      <h2 class="section-title">${esc(t.aboutTitle)}</h2>
      <div class="card"><p>${esc(t.uberMichText)}</p></div>
      <a href="#/about" class="more-link">${esc(t.moreAbout)}</a>
    </section>

    <hr class="divider">
    <section class="section">
      <h2 class="section-title">${esc(t.portfolioTitle)}</h2>
      <div class="card-list">${portfolioCards}</div>
      <a href="#/portfolio" class="more-link">${esc(t.alleProjekte)}</a>
    </section>

    <hr class="divider">
    <section class="section">
      <h2 class="section-title">${esc(t.focusTitle)}</h2>
      <div class="card"><div class="pill-row align-start">${focusPills}</div></div>
      <a href="#/focus" class="more-link">${esc(t.moreFocus)}</a>
    </section>

    <hr class="divider">
    <section class="section">
      <h2 class="section-title">${esc(t.eventsTitle)}</h2>
      <div class="card-list">${eventCards}</div>
      <a href="#/events" class="more-link">${esc(t.alleTermine)}</a>
    </section>

    <hr class="divider">
    <section class="section">
      <h2 class="section-title">${esc(t.libraryTitle)}</h2>
      <div class="card-list">${libraryCards}</div>
      <a href="#/library" class="more-link">${esc(t.moreLibrary)}</a>
    </section>
  </div>`;
}

function renderAbout(v) {
  const t = v.t;
  const principles = v.principles.map(p => `
    <div class="principle-item"><span class="principle-dot" aria-hidden="true"></span><span class="body-text">${esc(p)}</span></div>`).join('');
  const roles = v.aboutRoles.map(r => `
    <div class="role-item">
      <span class="role-icon" aria-hidden="true">${r.icon}</span>
      <div class="role-text"><span class="role-title">${esc(r.title)}</span><span class="role-desc">${esc(r.desc)}</span></div>
    </div>`).join('');
  const werte = v.werte.map(w => pillHtml(w, { solid: true })).join('');

  return `
  <div data-screen-label="About">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.about}<span>${esc(t.aboutTitle)}</span></h1>
      <p class="subtitle">${esc(t.aboutSubtitle)}</p>
      <a href="#/bio" class="more-link">${esc(t.aboutBioLink)}</a>
    </section>
    <hr class="divider">
    <section class="about-body">
      <p>${esc(t.aboutP1)}</p>
      <p>${esc(t.aboutP2)}</p>
      <p>${esc(t.aboutP3)}</p>

      <div class="card">
        <h2 class="heading-sm" style="margin-bottom:14px">${esc(t.haltungHeading)}</h2>
        <div class="stack-gap">${principles}</div>
      </div>
      <div class="card">
        <h2 class="heading-sm" style="margin-bottom:14px">${esc(t.rollenHeading)}</h2>
        <div class="stack-gap-lg">${roles}</div>
      </div>
      <div class="card">
        <h2 class="heading-sm" style="margin-bottom:14px">${esc(t.werteHeading)}</h2>
        <div class="pill-row align-start">${werte}</div>
      </div>

      <a href="#/kontakt" class="cta-button">${esc(t.aboutCtaText)} — ${esc(t.aboutCtaLink)}</a>
    </section>
  </div>`;
}

function renderPortfolioList(v) {
  const t = v.t;
  const cards = v.portfolio.map(p => portfolioCardHtml(p, { detailed: true })).join('');
  return `
  <div data-screen-label="Portfolio">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.portfolio}<span>${esc(t.portfolioTitle)}</span></h1>
      <p class="subtitle">${esc(t.portfolioSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section card-list">${cards}</section>
  </div>`;
}

function renderPortfolioModal(v) {
  const p = v.currentPortfolio;
  if (!p) return '';
  return modalShell({
    labelledBy: 'pf-modal-title',
    closeLabel: v.t.closeDialog,
    bodyHtml: `
      <div class="modal-eyebrow-row">
        <span>${esc(p.date)}</span><span>·</span><span class="cat">${esc(p.category)}</span><span>·</span><span>${esc(p.location)}</span>
      </div>
      <h2 id="pf-modal-title">${esc(p.title)}</h2>
      <p>${esc(p.full)}</p>
      <p>${esc(p.approach)}</p>`
  });
}

function renderFocus(v) {
  const t = v.t;
  const cards = v.focusItems.map(simpleCardHtml).join('');
  return `
  <div data-screen-label="Focus">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.focus}<span>${esc(t.focusTitle)}</span></h1>
      <p class="subtitle">${esc(t.focusSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section card-list">
      ${cards}
      <p style="font-size:16px;line-height:1.6;color:var(--text-primary)">${esc(t.focusClosing)}</p>
    </section>
  </div>`;
}

function renderEventsList(v) {
  const t = v.t;
  const bookable = v.bookableFormats.map(simpleCardHtml).join('');
  const upcoming = v.visibleTermine.map(tm => eventCardHtml(tm)).join('');
  const showMore = v.hasMoreTermine
    ? `<button type="button" class="btn-outline" data-action="show-more-events">${esc(v.moreEventsLabel)}</button>` : '';
  const pastSection = v.hasPastTermine ? `
    <hr class="divider">
    <section class="section card-list">
      <h2 class="heading-sm">${esc(t.pastHeading)}</h2>
      ${v.pastTermine.map(pt => eventCardHtml(pt, { linked: false, muted: true })).join('')}
    </section>` : '';

  return `
  <div data-screen-label="Events">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.events}<span>${esc(t.eventsTitle)}</span></h1>
      <p class="subtitle">${esc(t.eventsSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section card-list">
      <h2 class="heading-sm">${esc(t.bookableHeading)}</h2>
      ${bookable}
      <a href="#/formular" class="cta-button compact">${esc(t.ctaKostenvoranschlag)}</a>
    </section>
    <hr class="divider">
    <section class="section card-list">
      <h2 class="heading-sm">${esc(t.upcomingHeading)}</h2>
      ${upcoming}
      ${showMore}
    </section>
    ${pastSection}
  </div>`;
}

function renderEventModal(v) {
  const t = v.t;
  const tm = v.currentTermin;
  if (!tm) return '';
  return modalShell({
    labelledBy: 'ev-modal-title',
    closeLabel: t.closeDialog,
    bodyHtml: `
      <span class="modal-eyebrow-row">${esc(tm.date)} · ${esc(tm.category)}</span>
      <h2 id="ev-modal-title">${esc(tm.title)}</h2>
      <p class="modal-location">${esc(tm.location)}</p>
      <p>${esc(tm.detail)}</p>
      <p>${esc(tm.info)}</p>
      <a href="${tm.rsvpHref}" class="cta-button compact">${esc(t.registerBtn)}</a>`
  });
}

function renderLibrary(v) {
  const t = v.t;
  const items = v.library.map(libraryCardHtml).join('');
  const press = v.press.map(p => `
    <div class="card press-item">
      <span class="press-meta">${esc(p.outlet)} · ${esc(p.date)}</span>
      <h3>${esc(p.title)}</h3>
    </div>`).join('');
  return `
  <div data-screen-label="Library">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.library}<span>${esc(t.libraryTitle)}</span></h1>
      <p class="subtitle">${esc(t.librarySubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section card-list">${items}</section>
    <hr class="divider">
    <section class="section card-list">
      <h2 class="heading-sm">${esc(t.pressHeading)}</h2>
      ${press}
    </section>
  </div>`;
}

function renderFormular(v) {
  const t = v.t;
  const artOptions = v.auftragArten.map(a => `<option value="${esc(a)}">${esc(a)}</option>`).join('');
  return `
  <div data-screen-label="Anfrage">
    <section class="page-hero">
      <h1>${esc(t.formularTitle)}</h1>
      <p class="subtitle">${esc(t.formularSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section">
      <form class="stack-form" data-form="auftrag">
        <div class="form-field"><label for="auftrag-name">${esc(t.labelName)}</label><input id="auftrag-name" name="name" type="text" required></div>
        <div class="form-field"><label for="auftrag-email">${esc(t.labelEmail)}</label><input id="auftrag-email" name="email" type="email" required></div>
        <div class="form-field"><label for="auftrag-art">${esc(t.labelArt)}</label><select id="auftrag-art" name="art">${artOptions}</select></div>
        <div class="form-field"><label for="auftrag-beschreibung">${esc(t.labelBeschreibung)}</label><textarea id="auftrag-beschreibung" name="beschreibung" rows="5" required></textarea></div>
        <div class="form-field"><label for="auftrag-zeitrahmen">${esc(t.labelZeitrahmen)}</label><input id="auftrag-zeitrahmen" name="zeitrahmen" type="text"></div>
        <button type="submit" class="submit-btn">${esc(t.submitBtn)}</button>
      </form>
    </section>
  </div>`;
}

function renderKontakt(v) {
  const t = v.t;
  return `
  <div data-screen-label="Kontakt">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.mail}<span>${esc(t.kontaktTitle)}</span></h1>
      <p class="subtitle">${esc(t.kontaktSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section">
      <form class="stack-form" data-form="kontakt">
        <div class="form-field"><label for="kontakt-name">${esc(t.labelName)}</label><input id="kontakt-name" name="name" type="text" required></div>
        <div class="form-field"><label for="kontakt-email">${esc(t.labelEmail)}</label><input id="kontakt-email" name="email" type="email" required></div>
        <div class="form-field"><label for="kontakt-nachricht">${esc(t.labelNachricht)}</label><textarea id="kontakt-nachricht" name="nachricht" rows="6" required></textarea></div>
        <button type="submit" class="submit-btn">${esc(t.kontaktSubmitBtn)}</button>
      </form>
    </section>
  </div>`;
}

function renderBio(v) {
  const t = v.t;
  const tiles = v.bioPrimaryLinks.map(l => `
    <a class="bio-tile" href="${l.href}">
      <span class="bio-tile-icon" aria-hidden="true">${l.icon}</span>
      <span class="bio-tile-text">
        <span class="bio-tile-label">${esc(l.label)}</span>
        <span class="bio-tile-url">${esc(l.url)}</span>
      </span>
    </a>`).join('');
  const socials = v.bioSocialLinks.map(l => `
    <a class="icon-btn circle" href="${l.href}" aria-label="${esc(l.label)}" title="${esc(l.label)}" style="background:${l.bg};border-color:${l.bg};color:#fff">
      <span aria-hidden="true">${l.icon}</span>
    </a>`).join('');
  return `
  <div data-screen-label="Bio" class="bio-screen">
    <div class="bio-utility-bar">
      ${shareToggleHtml(v, { dropDown: true })}
      ${langToggleHtml(v, { dropDown: true })}
      ${themeToggleHtml(v)}
    </div>
    <section class="bio-page">
      <img src="./assets/profilfoto.png" alt="${esc(t.portraitAlt)}" class="avatar-lg">
      <div>
        <h1 class="bio-name">Til Apfel</h1>
        <p class="bio-intro">${esc(t.bioIntro)}</p>
      </div>
    </section>
    <section class="bio-links">
      <div class="bio-grid">${tiles}</div>
      <div class="bio-social-row">${socials}</div>
    </section>
  </div>`;
}

function renderImpressum(v) {
  const t = v.t;
  return `
  <div data-screen-label="Impressum">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.paragraph}<span>Impressum</span></h1>
      <p class="subtitle">${esc(t.impressumSubtitle)}</p>
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

function renderFooter(v) {
  const t = v.t;
  return `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-row">
        ${langToggleHtml(v)}
        ${easyLangToggleHtml(v)}
        ${themeToggleHtml(v)}
        ${searchButtonHtml(v)}
        <a class="icon-btn" href="#/impressum" aria-label="${esc(t.footerImpressum)}" title="${esc(t.footerImpressum)}"><span aria-hidden="true">${ICONS.paragraph}</span></a>
      </div>
      <span class="footer-copy">© 2026 Til Apfel</span>
    </div>
  </footer>`;
}

/* ---------- Main render ---------- */
const appEl = document.getElementById('app');
const headerSlot = document.getElementById('header-slot');
const footerSlot = document.getElementById('footer-slot');
const skipLinkEl = document.querySelector('.skip-link');

function titleFor(section, t) {
  const map = {
    '': t.heroTagline, about: t.aboutTitle, portfolio: t.portfolioTitle, focus: t.focusTitle,
    events: t.eventsTitle, library: t.libraryTitle, formular: t.formularTitle, kontakt: t.kontaktTitle,
    bio: 'Bio', impressum: 'Impressum'
  };
  const page = map[section] || '';
  return page ? `Til Apfel – ${page}` : 'Til Apfel';
}

function render() {
  if (!locale) return;
  const v = computeVals();
  document.documentElement.setAttribute('data-theme', state.theme);
  document.documentElement.setAttribute('lang', v.lang);
  document.title = titleFor(v.section, v.t);
  if (skipLinkEl) skipLinkEl.textContent = v.t.skip;

  headerSlot.innerHTML = renderHeader(v);

  let mainHtml = '';
  switch (v.section) {
    case '': mainHtml = renderHome(v); break;
    case 'about': mainHtml = renderAbout(v); break;
    case 'portfolio': mainHtml = renderPortfolioList(v) + renderPortfolioModal(v); break;
    case 'focus': mainHtml = renderFocus(v); break;
    case 'events': mainHtml = renderEventsList(v) + renderEventModal(v); break;
    case 'library': mainHtml = renderLibrary(v); break;
    case 'formular': mainHtml = renderFormular(v); break;
    case 'kontakt': mainHtml = renderKontakt(v); break;
    case 'bio': mainHtml = renderBio(v); break;
    case 'impressum': mainHtml = renderImpressum(v); break;
    default: mainHtml = renderHome(v);
  }
  appEl.innerHTML = mainHtml + searchModalHtml(v) + onboardingModalHtml(v);
  footerSlot.innerHTML = v.isBio ? '' : renderFooter(v);

  document.body.style.overflow = (v.currentPortfolio || v.currentTermin || state.searchOpen || state.onboardingOpen) ? 'hidden' : '';
  attachListeners(v);

  const modal = appEl.querySelector('.modal');
  if (modal) modal.focus();
  if (state.searchOpen) {
    const searchInput = document.getElementById('site-search-input');
    if (searchInput) { searchInput.focus(); searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length); }
  }
}

/* ---------- Language switching ---------- */
function setLang(code) {
  if (!AVAILABLE_LOCALES.includes(code)) return;
  loadLocale(code).then(loaded => {
    locale = loaded;
    state.lang = code;
    state.langMenuOpen = false;
    try { localStorage.setItem('tilapfel-lang', code); } catch (e) {}
    render();
  });
}

/* ---------- Event wiring ---------- */
function attachListeners(v) {
  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', closeActiveModal.bind(null, v));
  });

  const themeBtn = document.querySelector('[data-action="toggle-theme"]');
  if (themeBtn) themeBtn.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('tilapfel-theme', state.theme); } catch (e) {}
    render();
  });

  const langBtn = document.querySelector('[data-action="toggle-lang-menu"]');
  if (langBtn) langBtn.addEventListener('click', () => {
    const next = !state.langMenuOpen;
    closeMenus();
    state.langMenuOpen = next;
    render();
  });
  const langBackdrop = document.querySelector('[data-close-lang-menu]');
  if (langBackdrop) langBackdrop.addEventListener('click', () => { state.langMenuOpen = false; render(); });
  document.querySelectorAll('[data-set-lang]').forEach(el => {
    el.addEventListener('click', () => setLang(el.getAttribute('data-set-lang')));
  });

  const easyLangBtn = document.querySelector('[data-action="toggle-easylang-menu"]');
  if (easyLangBtn) easyLangBtn.addEventListener('click', () => {
    const next = !state.easyLangMenuOpen;
    closeMenus();
    state.easyLangMenuOpen = next;
    render();
  });
  const easyLangBackdrop = document.querySelector('[data-close-easylang-menu]');
  if (easyLangBackdrop) easyLangBackdrop.addEventListener('click', () => { state.easyLangMenuOpen = false; render(); });
  document.querySelectorAll('[data-set-easylang]').forEach(el => {
    el.addEventListener('click', () => {
      state.easyLanguage = el.getAttribute('data-set-easylang') === 'on';
      state.easyLangMenuOpen = false;
      try { localStorage.setItem('tilapfel-easy-lang', state.easyLanguage ? '1' : '0'); } catch (e) {}
      render();
    });
  });

  document.querySelectorAll('[data-set-theme]').forEach(el => {
    el.addEventListener('click', () => {
      state.theme = el.getAttribute('data-set-theme');
      try { localStorage.setItem('tilapfel-theme', state.theme); } catch (e) {}
      render();
    });
  });
  const onboardingDoneBtn = document.querySelector('[data-action="close-onboarding"]');
  if (onboardingDoneBtn) onboardingDoneBtn.addEventListener('click', dismissOnboarding);

  const showMoreBtn = document.querySelector('[data-action="show-more-events"]');
  if (showMoreBtn) showMoreBtn.addEventListener('click', () => { state.eventsExpanded = true; render(); });

  const shareBtn = document.querySelector('[data-action="toggle-share"]');
  if (shareBtn) shareBtn.addEventListener('click', () => {
    if (navigator.share) { navigator.share({ title: 'Til Apfel', url: location.href }).catch(() => {}); return; }
    const next = !state.shareMenuOpen;
    closeMenus();
    state.shareMenuOpen = next;
    state.shareCopied = false;
    render();
  });
  const shareBackdrop = document.querySelector('[data-close-share-menu]');
  if (shareBackdrop) shareBackdrop.addEventListener('click', () => { state.shareMenuOpen = false; render(); });
  const copyLinkBtn = document.querySelector('[data-action="copy-share-link"]');
  if (copyLinkBtn) copyLinkBtn.addEventListener('click', () => {
    const markCopied = () => { state.shareCopied = true; copyLinkBtn.textContent = v.t.linkCopied; };
    const url = location.href;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(markCopied).catch(() => selectShareUrl());
    } else {
      selectShareUrl();
    }
  });

  const searchBtn = document.querySelector('[data-action="toggle-search"]');
  if (searchBtn) searchBtn.addEventListener('click', () => {
    const next = !state.searchOpen;
    closeMenus();
    state.searchOpen = next;
    render();
  });
  const searchInput = document.getElementById('site-search-input');
  if (searchInput) searchInput.addEventListener('input', e => {
    state.searchQuery = e.target.value;
    const results = document.getElementById('site-search-results');
    if (results) results.innerHTML = renderSearchResults();
    document.querySelectorAll('#site-search-results [data-action="close-search"]').forEach(el => {
      el.addEventListener('click', () => { state.searchOpen = false; state.searchQuery = ''; });
    });
  });
  document.querySelectorAll('#site-search-results [data-action="close-search"]').forEach(el => {
    el.addEventListener('click', () => { state.searchOpen = false; state.searchQuery = ''; });
  });

  const auftragForm = document.querySelector('[data-form="auftrag"]');
  if (auftragForm) auftragForm.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(auftragForm);
    const t = v.t;
    const body = `Name: ${fd.get('name')}\nE-Mail: ${fd.get('email')}\n${t.labelArt}: ${fd.get('art')}\n${t.labelZeitrahmen}: ${fd.get('zeitrahmen')}\n\n${fd.get('beschreibung')}`;
    window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(t.emailSubjectQuote + fd.get('art')) + '&body=' + encodeURIComponent(body);
  });

  const kontaktForm = document.querySelector('[data-form="kontakt"]');
  if (kontaktForm) kontaktForm.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(kontaktForm);
    const body = `Name: ${fd.get('name')}\nE-Mail: ${fd.get('email')}\n\n${fd.get('nachricht')}`;
    window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(v.t.emailSubjectContact) + '&body=' + encodeURIComponent(body);
  });
}

/* ---------- Global listeners ---------- */
window.addEventListener('hashchange', render);
window.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (state.onboardingOpen) { dismissOnboarding(); return; }
  if (state.searchOpen) { state.searchOpen = false; state.searchQuery = ''; render(); return; }
  const segs = parseRoute().split('/').filter(Boolean);
  if ((segs[0] === 'portfolio' || segs[0] === 'events') && segs[1]) {
    location.hash = '#/' + segs[0];
  }
});
try {
  matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    let stored = null;
    try { stored = localStorage.getItem('tilapfel-theme'); } catch (err) {}
    if (!stored) { state.theme = e.matches ? 'light' : 'dark'; render(); }
  });
} catch (e) {}

/* ---------- Boot: fetch only the active locale, then render ---------- */
loadLocale(state.lang).then(loaded => {
  locale = loaded;
  render();
});
