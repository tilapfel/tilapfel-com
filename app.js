'use strict';

/* ---------- Icons (language-independent) ---------- */
const ICON_ROLE_ACTIVIST = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v4a1 1 0 0 0 1 1h2l7 4V5L6 9H4a1 1 0 0 0-1 1z"/><path d="M17 9a4 4 0 0 1 0 6"/></svg>';
const ICON_ROLE_BOARD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="12" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
const ICON_ROLE_LECTURER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l10-4 10 4-10 4-10-4z"/><path d="M6 11v4c0 1.2 2.7 2 6 2s6-.8 6-2v-4"/></svg>';
const ROLE_ICONS = [ICON_ROLE_ACTIVIST, ICON_ROLE_BOARD, ICON_ROLE_LECTURER];

const ICONS = {
  about: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M4.5 20c0-4 3.5-6.5 7.5-6.5s7.5 2.5 7.5 6.5"/></svg>',
  portfolio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v18"/><path d="M6 4h11l-3 4 3 4H6"/></svg>',
  focus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="13" r="8"/><circle cx="11" cy="13" r="4"/><path d="M11 13 19 5"/><path d="M14 5h5v5"/></svg>',
  events: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(0,-1.2)"><rect x="4" y="5.5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3.5v3M16 3.5v3"/></g></svg>',
  library: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="4" height="15" rx="1"/><rect x="10" y="3" width="4" height="17" rx="1"/><rect x="16" y="7" width="4" height="13" rx="1"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 14.8A8.2 8.2 0 0 1 9.2 4a8.2 8.2 0 1 0 10.8 10.8z"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9z"/></svg>'
};
const ICON_GRID = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg>';
const ICON_HEART_GLYPH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7-4.4-9.5-9C1 8 2 4 6 4c2 0 4 1.2 6 4 2-2.8 4-4 6-4 4 0 5 4 3.5 7-2.5 4.6-9.5 9-9.5 9z"/></svg>';
const ICON_NETWORK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M7.8 7.6 10.4 16M16.2 7.6 13.6 16M8.4 6h7.2"/></svg>';
const ICON_YOUTUBE_GLYPH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 7.5v9l7-4.5z" fill="currentColor" stroke="none"/></svg>';
const ICON_INSTAGRAM_GLYPH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.3" cy="7.7" r="0.9" fill="currentColor" stroke="none"/></svg>';
const ICON_GITHUB_GLYPH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 6.5 4.5 12l4.5 5.5M15 6.5l4.5 5.5-4.5 5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_FACEBOOK_SHARED = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.2 19v-6.2h2.1l.3-2.6h-2.4V8.5c0-.7.2-1.2 1.2-1.2h1.3V5c-.2 0-1-.1-1.9-.1-2 0-3.3 1.2-3.3 3.4v2h-2.2v2.6h2.2V19z" fill="currentColor" stroke="none"/></svg>';
const ICON_LINKEDIN_SHARED = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="7.5" cy="7" r="1.3" fill="currentColor" stroke="none"/><path d="M7.5 10.2V19" stroke-linecap="round" stroke-width="2.2"/><path d="M12 10.2V19M12 13.8c0-2.4 1.4-3.6 3-3.6s3 1.2 3 3.6V19" stroke-linecap="round" stroke-width="2.2"/></svg>';
const ICON_DOC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3.5h8l3 3v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1z"/><path d="M9 10h6M9 13.5h6M9 17h4"/></svg>';
const ICON_MAIL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 6.5l8 6 8-6"/></svg>';
const ICON_LINK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(12 12) scale(1.4) translate(-12 -12)"><path d="M9.5 14.5 14.5 9.5"/><path d="M11 8l1.5-1.5a3 3 0 0 1 4.2 4.2L15 12.2M13 16l-1.5 1.5a3 3 0 0 1-4.2-4.2L8.7 11.8"/></g></svg>';

/* ---------- Nav structure (route + icon are language-independent; labels come from the active locale) ---------- */
const NAV = [
  { route: 'about', icon: 'about' },
  { route: 'portfolio', icon: 'portfolio' },
  { route: 'focus', icon: 'focus' },
  { route: 'events', icon: 'events' },
  { route: 'library', icon: 'library' }
];

/* ---------- Bio links: proper nouns / brand names, identical across languages ---------- */
const BIO_LINKS = [
  { label: 'Website', href: '#/', url: 'tilapfel.com', bg: 'oklch(52% 0.09 200)', fg: '#fff', fgMuted: 'rgba(255,255,255,0.72)', icon: ICON_NETWORK },
  { label: 'Stiftung', href: 'https://stiftung.tilapfel.com', url: 'stiftung.tilapfel.com', bg: 'oklch(52% 0.09 60)', fg: '#fff', fgMuted: 'rgba(255,255,255,0.72)', icon: ICON_HEART_GLYPH },
  { label: 'Apps', href: 'https://apps.tilapfel.com', url: 'apps.tilapfel.com', bg: 'oklch(52% 0.09 140)', fg: '#fff', fgMuted: 'rgba(255,255,255,0.72)', icon: ICON_GRID },
  { label: 'YouTube', href: 'https://www.youtube.com/@tilapfel', url: 'youtube.com/@tilapfel', bg: 'oklch(52% 0.09 25)', fg: '#fff', fgMuted: 'rgba(255,255,255,0.72)', icon: ICON_YOUTUBE_GLYPH },
  { label: 'Instagram', href: 'https://www.instagram.com/tilapfel', url: 'instagram.com/tilapfel', bg: 'oklch(52% 0.09 340)', fg: '#fff', fgMuted: 'rgba(255,255,255,0.72)', icon: ICON_INSTAGRAM_GLYPH },
  { label: 'Facebook', href: 'https://www.facebook.com/tilapfel', url: 'facebook.com/tilapfel', bg: 'oklch(52% 0.09 255)', fg: '#fff', fgMuted: 'rgba(255,255,255,0.72)', icon: ICON_FACEBOOK_SHARED },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tilapfel', url: 'linkedin.com/in/tilapfel', bg: 'oklch(52% 0.09 230)', fg: '#fff', fgMuted: 'rgba(255,255,255,0.72)', icon: ICON_LINKEDIN_SHARED },
  { label: 'GitHub', href: 'https://github.com/tilapfel', url: 'github.com/tilapfel', bg: 'oklch(30% 0 0)', fg: '#fff', fgMuted: 'rgba(255,255,255,0.72)', icon: ICON_GITHUB_GLYPH }
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

/* ---------- State ---------- */
let storedLang = null, storedTheme = null;
try { storedLang = localStorage.getItem('tilapfel-lang'); } catch (e) {}
try { storedTheme = localStorage.getItem('tilapfel-theme'); } catch (e) {}

const state = {
  lang: (storedLang && AVAILABLE_LOCALES.includes(storedLang)) ? storedLang : detectSystemLocale(),
  theme: storedTheme || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
  eventsExpanded: false,
  langMenuOpen: false
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
    moreEventsLabel: locale.code === 'en' ? ('Show ' + remaining + ' more events') : ('Weitere ' + remaining + ' Termine anzeigen'),
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
    bioLinks: BIO_LINKS,
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
      <nav class="nav-full" aria-label="Hauptnavigation">${navHtml}</nav>
    </div>
  </header>`;
}

function renderHome(v) {
  const t = v.t;
  const roles = v.roles.map(r => `<span class="pill"><span aria-hidden="true">${r.icon}</span><span>${esc(r.label)}</span></span>`).join('');
  const portfolioCards = v.homePortfolio.map(p => `
    <a class="list-card" href="${p.href}">
      <span class="eyebrow">${esc(p.date)} · ${esc(p.category)}</span>
      <span class="block-title" style="display:block;font-size:18px;font-weight:600;margin-bottom:6px">${esc(p.title)}</span>
      <span class="desc">${esc(p.short)}</span>
    </a>`).join('');
  const focusPills = v.focusItems.map(f => `<span class="pill solid">${esc(f.title)}</span>`).join('');
  const eventCards = v.homeTermine.map(tm => `
    <a class="list-card" href="${tm.href}">
      <span class="eyebrow-plain">${esc(tm.date)} · ${esc(tm.category)}</span>
      <span class="block-title" style="display:block;font-size:18px;font-weight:600;margin-bottom:4px">${esc(tm.title)}</span>
      <span class="loc">${esc(tm.location)}</span>
    </a>`).join('');
  const libraryCards = v.homeLibrary.map(l => `
    <div class="card">
      <span class="eyebrow">${esc(l.type)}</span>
      <span class="block-title" style="display:block;font-size:18px;font-weight:600;margin-bottom:4px">${esc(l.title)}</span>
      <span class="loc">${esc(l.desc)}</span>
    </div>`).join('');

  return `
  <div data-screen-label="Start">
    <section class="section-hero">
      <img src="./assets/profilfoto.png" alt="Portrait von Til Apfel" class="avatar">
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
  const werte = v.werte.map(w => `<span class="pill solid">${esc(w)}</span>`).join('');

  return `
  <div data-screen-label="About">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.about}<span>${esc(t.aboutTitle)}</span></h1>
      <p class="subtitle">${esc(t.aboutSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="about-body">
      <p style="font-size:17px;line-height:1.7;color:var(--text-primary)">${esc(t.aboutP1)}</p>
      <p style="font-size:17px;line-height:1.7;color:var(--text-primary)">${esc(t.aboutP2)}</p>
      <p style="font-size:17px;line-height:1.7;color:var(--text-primary)">${esc(t.aboutP3)}</p>

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
  const cards = v.portfolio.map(p => `
    <a class="list-card" href="${p.href}">
      <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:8px">
        <span style="font-size:12px;font-weight:700;color:var(--text-tertiary)">${esc(p.date)}</span>
        <span style="font-size:12px;color:var(--text-tertiary)">·</span>
        <span class="eyebrow" style="margin:0">${esc(p.category)}</span>
        <span style="font-size:12px;color:var(--text-tertiary)">·</span>
        <span style="font-size:12px;color:var(--text-tertiary)">${esc(p.location)}</span>
      </div>
      <h3>${esc(p.title)}</h3>
      <p class="desc">${esc(p.short)}</p>
    </a>`).join('');
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
  const t = v.t;
  const p = v.currentPortfolio;
  if (!p) return '';
  return `
  <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="pf-modal-title" data-modal="portfolio">
    <div class="modal-backdrop" data-close-modal></div>
    <div class="modal" tabindex="-1">
      <button type="button" class="modal-close" data-close-modal aria-label="${esc(t.closeDialog)}">
        <span aria-hidden="true">${ICONS.close}</span>
      </button>
      <div class="modal-eyebrow-row">
        <span>${esc(p.date)}</span><span>·</span><span class="cat">${esc(p.category)}</span><span>·</span><span>${esc(p.location)}</span>
      </div>
      <h2 id="pf-modal-title">${esc(p.title)}</h2>
      <p>${esc(p.full)}</p>
      <p>${esc(p.approach)}</p>
    </div>
  </div>`;
}

function renderFocus(v) {
  const t = v.t;
  const cards = v.focusItems.map(f => `
    <div class="card card-simple"><h3>${esc(f.title)}</h3><p>${esc(f.desc)}</p></div>`).join('');
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
  const bookable = v.bookableFormats.map(b => `
    <div class="card card-simple"><h3>${esc(b.title)}</h3><p>${esc(b.desc)}</p></div>`).join('');
  const upcoming = v.visibleTermine.map(tm => `
    <a class="list-card" href="${tm.href}">
      <span class="eyebrow-plain">${esc(tm.date)} · ${esc(tm.category)}</span>
      <h3>${esc(tm.title)}</h3>
      <span class="loc">${esc(tm.location)}</span>
    </a>`).join('');
  const showMore = v.hasMoreTermine
    ? `<button type="button" class="btn-outline" data-action="show-more-events">${esc(v.moreEventsLabel)}</button>` : '';
  const pastSection = v.hasPastTermine ? `
    <hr class="divider">
    <section class="section card-list">
      <h2 class="heading-sm">${esc(t.pastHeading)}</h2>
      ${v.pastTermine.map(pt => `
        <div class="list-card past">
          <span class="eyebrow-plain">${esc(pt.date)} · ${esc(pt.category)}</span>
          <h3>${esc(pt.title)}</h3>
          <span class="loc">${esc(pt.location)}</span>
        </div>`).join('')}
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
  return `
  <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="ev-modal-title" data-modal="event">
    <div class="modal-backdrop" data-close-modal></div>
    <div class="modal" tabindex="-1">
      <button type="button" class="modal-close" data-close-modal aria-label="${esc(t.closeDialog)}">
        <span aria-hidden="true">${ICONS.close}</span>
      </button>
      <span class="modal-eyebrow-row">${esc(tm.date)} · ${esc(tm.category)}</span>
      <h2 id="ev-modal-title">${esc(tm.title)}</h2>
      <p class="modal-location">${esc(tm.location)}</p>
      <p>${esc(tm.detail)}</p>
      <p>${esc(tm.info)}</p>
      <a href="${tm.rsvpHref}" class="cta-button compact">${esc(t.registerBtn)}</a>
    </div>
  </div>`;
}

function renderLibrary(v) {
  const t = v.t;
  const items = v.library.map(l => `
    <div class="card card-simple">
      <span class="eyebrow">${esc(l.type)}</span>
      <h3>${esc(l.title)}</h3>
      <p>${esc(l.desc)}</p>
    </div>`).join('');
  const press = v.press.map(p => `
    <div class="card" style="padding:clamp(16px,3vw,20px)">
      <span style="display:block;font-size:12px;color:var(--text-tertiary);margin-bottom:4px">${esc(p.outlet)} · ${esc(p.date)}</span>
      <h3 style="font-size:16px;font-weight:600;color:var(--text-primary);margin:0">${esc(p.title)}</h3>
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
      <h1 class="page-title">${ICON_MAIL}<span>${esc(t.kontaktTitle)}</span></h1>
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
  const tiles = v.bioLinks.map(l => `
    <a class="bio-tile" href="${l.href}" style="background:${l.bg}">
      <span class="bio-tile-icon" aria-hidden="true" style="color:${l.fg}">${l.icon}</span>
      <span class="bio-tile-text">
        <span class="bio-tile-label" style="color:${l.fg}">${esc(l.label)}</span>
        <span class="bio-tile-url" style="color:${l.fgMuted}">${esc(l.url)}</span>
      </span>
    </a>`).join('');
  return `
  <div data-screen-label="Bio">
    <section class="bio-page">
      <img src="./assets/profilfoto.png" alt="Portrait von Til Apfel" class="avatar-lg">
      <div>
        <h1 class="bio-name">Til Apfel</h1>
        <p class="bio-intro">${esc(t.bioIntro)}</p>
      </div>
    </section>
    <section class="bio-links">
      <div class="bio-grid">${tiles}</div>
    </section>
  </div>`;
}

function renderImpressum(v) {
  const t = v.t;
  return `
  <div data-screen-label="Impressum">
    <section class="page-hero">
      <h1 class="page-title">${ICON_DOC}<span>Impressum</span></h1>
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
  const langMenu = state.langMenuOpen ? `
    <div class="lang-menu-backdrop" data-close-lang-menu></div>
    <div class="lang-menu">
      ${AVAILABLE_LOCALES.map(code => `
        <button type="button" class="${v.lang === code ? 'active' : ''}" data-set-lang="${code}" aria-pressed="${v.lang === code}">
          <span>${esc(LOCALE_META[code].nativeName)}</span>${v.lang === code ? '<span aria-hidden="true">✓</span>' : ''}
        </button>`).join('')}
    </div>` : '';
  const themeLabel = state.theme === 'dark'
    ? (v.lang === 'en' ? 'Switch to light mode' : 'Zu Hell wechseln')
    : (v.lang === 'en' ? 'Switch to dark mode' : 'Zu Dunkel wechseln');

  return `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-row">
        <button type="button" class="icon-btn" data-action="toggle-theme" aria-label="${esc(themeLabel)}" title="${esc(themeLabel)}">
          <span aria-hidden="true">${state.theme === 'dark' ? ICONS.moon : ICONS.sun}</span>
        </button>
        <div class="lang-menu-wrap">
          <button type="button" class="icon-btn" data-action="toggle-lang-menu" aria-expanded="${state.langMenuOpen}" aria-haspopup="true" aria-label="Sprache / Language" title="Sprache / Language">
            <span aria-hidden="true">${ICONS.globe}</span>
          </button>
          ${langMenu}
        </div>
        <a class="icon-btn" href="#/impressum" aria-label="${esc(t.footerImpressum)}" title="${esc(t.footerImpressum)}"><span aria-hidden="true">${ICON_DOC}</span></a>
        <a class="icon-btn" href="#/kontakt" aria-label="${esc(t.footerKontakt)}" title="${esc(t.footerKontakt)}"><span aria-hidden="true">${ICON_MAIL}</span></a>
        <a class="icon-btn" href="#/bio" aria-label="Bio" title="Bio"><span aria-hidden="true">${ICON_LINK}</span></a>
      </div>
      <span class="footer-copy">© 2026 Til Apfel</span>
    </div>
  </footer>`;
}

/* ---------- Main render ---------- */
const appEl = document.getElementById('app');
const headerSlot = document.getElementById('header-slot');
const footerSlot = document.getElementById('footer-slot');

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
  appEl.innerHTML = mainHtml;
  footerSlot.innerHTML = renderFooter(v);

  document.body.style.overflow = (v.currentPortfolio || v.currentTermin) ? 'hidden' : '';
  attachListeners(v);

  const modal = document.querySelector('.modal');
  if (modal) modal.focus();
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
    el.addEventListener('click', () => {
      location.hash = '#/' + (v.section === 'portfolio' ? 'portfolio' : 'events');
    });
  });

  const themeBtn = document.querySelector('[data-action="toggle-theme"]');
  if (themeBtn) themeBtn.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('tilapfel-theme', state.theme); } catch (e) {}
    render();
  });

  const langBtn = document.querySelector('[data-action="toggle-lang-menu"]');
  if (langBtn) langBtn.addEventListener('click', () => { state.langMenuOpen = !state.langMenuOpen; render(); });
  const langBackdrop = document.querySelector('[data-close-lang-menu]');
  if (langBackdrop) langBackdrop.addEventListener('click', () => { state.langMenuOpen = false; render(); });
  document.querySelectorAll('[data-set-lang]').forEach(el => {
    el.addEventListener('click', () => setLang(el.getAttribute('data-set-lang')));
  });

  const showMoreBtn = document.querySelector('[data-action="show-more-events"]');
  if (showMoreBtn) showMoreBtn.addEventListener('click', () => { state.eventsExpanded = true; render(); });

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
  if (e.key === 'Escape') {
    const segs = parseRoute().split('/').filter(Boolean);
    if ((segs[0] === 'portfolio' || segs[0] === 'events') && segs[1]) {
      location.hash = '#/' + segs[0];
    }
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
