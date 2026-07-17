import { ROLE_ICONS } from '../components/icons.js';
import { renderSearchResults, searchModalHtml, searchResultCountHtml } from '../components/search.js';
import { selectShareUrl } from './utils.js';
import { state, locale, setLocale, loadLocale, parseRoute } from './state.js';
import { NAV, BIO_PRIMARY_LINKS, BIO_SOCIAL_LINKS, CONTACT_EMAIL, AVAILABLE_LOCALES } from './data.js';
import { STORAGE_KEYS, writeStorage } from './storage.js';
import { renderHeader } from '../pages/header.js';
import { renderFooter } from '../pages/footer.js';
import { renderHome } from '../pages/home.js';
import { renderAbout } from '../pages/about.js';
import { renderPortfolioList, renderPortfolioModal } from '../pages/portfolio.js';
import { renderFocus, renderFeedPostModal } from '../pages/focus.js';
import { renderEventsList, renderEventModal, renderBookableModal } from '../pages/events.js';
import { renderLibrary, renderLibraryModal } from '../pages/library.js';
import { renderFormular } from '../pages/formular.js';
import { renderKontakt } from '../pages/kontakt.js';
import { renderBio } from '../pages/bio.js';
import { renderImpressum } from '../pages/impressum.js';
import { renderDatenschutz } from '../pages/datenschutz.js';
import { renderError } from '../pages/error.js';
import { renderOnboardingModal } from '../pages/onboarding.js';
import { newsletterSectionHtml, newsletterModalHtml } from '../components/newsletter.js';
import { darkReaderBannerHtml } from '../components/darkreader-banner.js';
import { dgsNoticeHtml } from '../components/dgs-notice.js';

const appEl = document.getElementById('app');
const headerSlot = document.getElementById('header-slot');
const footerSlot = document.getElementById('footer-slot');
const skipLinkEl = document.querySelector('.skip-link');

const PAGE_RENDERERS = {
  '': renderHome,
  about: renderAbout,
  projects: (view) => renderPortfolioList(view) + renderPortfolioModal(view),
  feeds: (view) => renderFocus(view) + renderFeedPostModal(view),
  events: (view) => renderEventsList(view) + renderEventModal(view) + renderBookableModal(view),
  library: (view) => renderLibrary(view) + renderLibraryModal(view),
  quote: renderFormular,
  contact: renderKontakt,
  bio: renderBio,
  legal: renderImpressum,
  privacy: renderDatenschutz,
};

/** Derives every value a page/component needs to render from the current route + active locale. */
function computeVals() {
  const route = parseRoute();
  const segments = route.split('/').filter(Boolean);
  const section = segments[0] || '';
  const slug = segments[1];
  const isBio = section === 'bio';
  const t = locale.t;

  const portfolioLocalized = locale.portfolio.map((entry) => ({
    ...entry,
    href: `#/projects/${entry.tagSlug}/${entry.dateSlug}`,
  }));
  const termineLocalized = locale.termine.map((entry) => ({
    ...entry,
    href: `#/events/${entry.tagSlug}/${entry.dateSlug}`,
    rsvpHref: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.emailSubjectRegistration + entry.title)}`,
  }));

  const isBookableRoute = section === 'events' && segments[1] === 'format';
  const bookableLocalized = locale.bookable.map((entry) => ({
    ...entry,
    href: `#/events/format/${entry.slug}`,
  }));

  const currentPortfolio =
    section === 'projects' && slug && segments[2]
      ? portfolioLocalized.find((entry) => entry.tagSlug === slug && entry.dateSlug === segments[2])
      : null;
  const currentTermin =
    section === 'events' && slug && segments[2] && !isBookableRoute
      ? termineLocalized.find((entry) => entry.tagSlug === slug && entry.dateSlug === segments[2])
      : null;
  const currentBookable =
    isBookableRoute && segments[2] ? bookableLocalized.find((entry) => entry.slug === segments[2]) : null;

  const feedsPostsLocalized = locale.feedsPosts.map((post) => ({
    ...post,
    href: `#/feeds/${post.formatSlug}/${post.dateSlug}`,
  }));
  const currentFeedPost =
    section === 'feeds' && slug && segments[2]
      ? feedsPostsLocalized.find((post) => post.formatSlug === slug && post.dateSlug === segments[2])
      : null;

  const libraryLocalized = locale.library.map((entry) => ({ ...entry, href: `#/library/${entry.slug}` }));
  const currentLibraryEntry =
    section === 'library' && slug ? libraryLocalized.find((entry) => entry.slug === slug) : null;

  const expanded = state.eventsExpanded;
  const visibleTermine = expanded ? termineLocalized : termineLocalized.slice(0, 3);
  const remaining = termineLocalized.length - 3;

  return {
    route,
    section,
    slug,
    isBio,
    isKnownSection: Object.prototype.hasOwnProperty.call(PAGE_RENDERERS, section),
    lang: locale.code,
    t,
    navItems: NAV.map((item) => ({
      ...item,
      label: locale.nav[item.route],
      href: `#/${item.route}`,
      current: section === item.route,
    })),
    portfolio: portfolioLocalized,
    homePortfolio: portfolioLocalized.slice(0, 2),
    termine: termineLocalized,
    homeTermine: termineLocalized.slice(0, 1),
    visibleTermine,
    hasMoreTermine: remaining > 0 && !expanded,
    moreEventsLabel: t.moreEventsTemplate.replace('{n}', remaining),
    pastTermine: locale.pastTermine,
    hasPastTermine: locale.pastTermine.length > 0,
    currentPortfolio,
    currentTermin,
    currentBookable,
    currentFeedPost,
    currentLibraryEntry,
    library: libraryLocalized,
    homeLibrary: libraryLocalized.slice(0, 2),
    press: locale.press,
    focusItems: locale.focusItems,
    feedsTags: [
      { value: '', label: t.feedsTagAll },
      ...Array.from(new Set(locale.feedsPosts.flatMap((post) => post.tags))).map((tag) => ({
        value: tag,
        label: tag,
      })),
    ],
    feedsTagFilter: state.feedsTagFilter,
    visibleFeedsPosts: state.feedsTagFilter
      ? feedsPostsLocalized.filter((post) => post.tags.includes(state.feedsTagFilter))
      : feedsPostsLocalized,
    werte: locale.werte,
    principles: locale.principles,
    bookableFormats: bookableLocalized,
    roles: locale.roles.map((role) => ({ label: role.label, icon: ROLE_ICONS[role.key] })),
    aboutRoles: locale.roles.map((role) => ({
      title: role.label,
      desc: role.desc,
      icon: ROLE_ICONS[role.key],
    })),
    bioPrimaryLinks: BIO_PRIMARY_LINKS.map((link, i) => ({ ...link, label: locale.bioPrimary[i].label })),
    bioSocialLinks: BIO_SOCIAL_LINKS,
    auftragArten: locale.auftragArten,
    datenschutzSections: locale.datenschutzSections,
    impressumAddress: locale.impressumAddress,
    impressumSections: locale.impressumSections,
  };
}

function titleFor(view) {
  const t = view.t;
  if (!view.isKnownSection) return `Til Apfel – ${t.errorTitle}`;
  const titles = {
    '': t.heroTagline,
    about: t.aboutTitle,
    projects: t.portfolioTitle,
    feeds: t.focusTitle,
    events: t.eventsTitle,
    library: t.libraryTitle,
    quote: t.formularTitle,
    contact: t.kontaktTitle,
    bio: 'Bio',
    legal: 'Impressum',
    privacy: t.datenschutzTitle,
  };
  const page = titles[view.section] || '';
  return page ? `Til Apfel – ${page}` : 'Til Apfel';
}

/**
 * Fetches a one-time spam-check token from the Netlify Function for the
 * "time trap" check (see netlify/functions/form-token.mjs) once per visit
 * to a form page — not on every re-render, since re-renders also happen
 * for unrelated state changes (theme, language, …) while already on the
 * page. If the function is unreachable (e.g. testing the plain static
 * files without Netlify running), `state.formToken` just stays null and
 * the submit handler fails open rather than blocking the form entirely.
 */
async function ensureFormToken(section) {
  if (state.formTokenSection === section && state.formToken) return;
  state.formTokenSection = section;
  state.formToken = null;
  try {
    const res = await fetch('/api/form-token');
    if (res.ok) {
      const data = await res.json();
      state.formToken = data.token;
    }
  } catch {
    // Function unreachable — handled as fail-open in the submit handlers below.
  }
}

/**
 * Gate a form submission behind the honeypot/timing/rate-limit checks in the
 * form-submit Netlify Function. Real rejections (rate limit, invalid token)
 * surface an error message; a network failure (function unreachable, e.g.
 * local static-file testing) fails open so the mailto handoff still works.
 */
async function passesSpamCheck(form, t) {
  const errorEl = form.querySelector('[data-form-error]');
  if (errorEl) errorEl.hidden = true;
  const honeypot = new FormData(form).get('website') || '';
  try {
    const res = await fetch('/api/form-submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: state.formToken, honeypot }),
    });
    const data = await res.json().catch(() => ({ ok: false }));
    if (data.ok) return true;
    if (errorEl) {
      errorEl.textContent = res.status === 429 ? t.formErrorRateLimited : t.formErrorGeneric;
      errorEl.hidden = false;
    }
    return false;
  } catch {
    return true;
  }
}

/** Re-renders header, current page, footer, and any open overlay from scratch. Called on every state change. */
export function render() {
  if (!locale) return;
  const scrollY = window.scrollY;
  const view = computeVals();
  document.documentElement.setAttribute('data-theme', state.theme);
  document.documentElement.setAttribute('lang', view.lang);
  document.title = titleFor(view);
  if (skipLinkEl) skipLinkEl.textContent = view.t.skip;

  if (view.section === 'contact' || view.section === 'quote') ensureFormToken(view.section);

  headerSlot.innerHTML = darkReaderBannerHtml(view) + renderHeader(view);

  const pageRenderer = view.isKnownSection ? PAGE_RENDERERS[view.section] : renderError;
  appEl.innerHTML =
    (view.lang === 'dgs' && !view.isBio ? dgsNoticeHtml(view) : '') +
    pageRenderer(view) +
    (view.isBio ? '' : newsletterSectionHtml(view)) +
    searchModalHtml(view) +
    renderOnboardingModal(view) +
    newsletterModalHtml(view);
  footerSlot.innerHTML = view.isBio ? '' : renderFooter(view);

  document.body.style.overflow =
    view.currentPortfolio ||
    view.currentTermin ||
    view.currentBookable ||
    view.currentFeedPost ||
    view.currentLibraryEntry ||
    state.searchOpen ||
    state.onboardingOpen ||
    state.newsletterOpen
      ? 'hidden'
      : '';
  attachListeners(view);

  const modal = appEl.querySelector('.modal');
  if (modal) modal.focus();
  if (state.searchOpen) {
    const searchInput = document.getElementById('site-search-input');
    if (searchInput) {
      searchInput.focus();
      searchInput.setSelectionRange(searchInput.value.length, searchInput.value.length);
    }
  }
  window.scrollTo(0, scrollY);
}

export function setLang(code) {
  if (!AVAILABLE_LOCALES.includes(code)) return;
  loadLocale(code).then((loaded) => {
    setLocale(loaded);
    state.lang = code;
    state.langMenuOpen = false;
    writeStorage(STORAGE_KEYS.lang, code);
    if (code === 'dgs' && state.easyLanguage) {
      state.easyLanguage = false;
      writeStorage(STORAGE_KEYS.easyLanguage, '0');
    }
    render();
  });
}

/** Only one utility popover (language/easy-language/share/search) should be open at a time. */
export function closeMenus() {
  state.langMenuOpen = false;
  state.easyLangMenuOpen = false;
  state.shareMenuOpen = false;
  state.searchOpen = false;
}

export function dismissOnboarding() {
  state.onboardingOpen = false;
  writeStorage(STORAGE_KEYS.onboarded, '1');
  render();
}

/** Whichever overlay is currently showing (onboarding, search, or a portfolio/event detail) closes itself. */
export function closeActiveModal(view) {
  if (state.onboardingOpen) {
    dismissOnboarding();
    return;
  }
  if (state.searchOpen) {
    state.searchOpen = false;
    state.searchQuery = '';
    render();
    return;
  }
  if (state.newsletterOpen) {
    state.newsletterOpen = false;
    render();
    return;
  }
  location.hash = `#/${view.section}`;
}

function attachListeners(view) {
  document.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', () => closeActiveModal(view));
  });

  const themeBtn = document.querySelector('[data-action="toggle-theme"]');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      writeStorage(STORAGE_KEYS.theme, state.theme);
      render();
    });
  }

  const langBtn = document.querySelector('[data-action="toggle-lang-menu"]');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const next = !state.langMenuOpen;
      closeMenus();
      state.langMenuOpen = next;
      render();
    });
  }
  const langBackdrop = document.querySelector('[data-close-lang-menu]');
  if (langBackdrop)
    langBackdrop.addEventListener('click', () => {
      state.langMenuOpen = false;
      render();
    });
  document.querySelectorAll('[data-set-lang]').forEach((el) => {
    el.addEventListener('click', () => setLang(el.getAttribute('data-set-lang')));
  });

  const easyLangBtn = document.querySelector('[data-action="toggle-easylang-menu"]');
  if (easyLangBtn) {
    easyLangBtn.addEventListener('click', () => {
      const next = !state.easyLangMenuOpen;
      closeMenus();
      state.easyLangMenuOpen = next;
      render();
    });
  }
  const easyLangBackdrop = document.querySelector('[data-close-easylang-menu]');
  if (easyLangBackdrop)
    easyLangBackdrop.addEventListener('click', () => {
      state.easyLangMenuOpen = false;
      render();
    });
  document.querySelectorAll('[data-set-easylang]').forEach((el) => {
    el.addEventListener('click', () => {
      state.easyLanguage = el.getAttribute('data-set-easylang') === 'on';
      state.easyLangMenuOpen = false;
      writeStorage(STORAGE_KEYS.easyLanguage, state.easyLanguage ? '1' : '0');
      render();
    });
  });

  document.querySelectorAll('[data-set-theme]').forEach((el) => {
    el.addEventListener('click', () => {
      state.theme = el.getAttribute('data-set-theme');
      writeStorage(STORAGE_KEYS.theme, state.theme);
      render();
    });
  });
  const dismissDarkReaderBtn = document.querySelector('[data-action="dismiss-darkreader"]');
  if (dismissDarkReaderBtn) {
    dismissDarkReaderBtn.addEventListener('click', () => {
      state.darkReaderDismissed = true;
      render();
    });
  }

  const newsletterBtn = document.querySelector('[data-action="toggle-newsletter"]');
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', () => {
      state.newsletterOpen = true;
      render();
    });
  }

  const onboardingDoneBtn = document.querySelector('[data-action="close-onboarding"]');
  if (onboardingDoneBtn) onboardingDoneBtn.addEventListener('click', dismissOnboarding);

  document.querySelectorAll('[data-set-feed-tag]').forEach((el) => {
    el.addEventListener('click', () => {
      state.feedsTagFilter = el.getAttribute('data-set-feed-tag') || null;
      render();
    });
  });

  const showMoreBtn = document.querySelector('[data-action="show-more-events"]');
  if (showMoreBtn)
    showMoreBtn.addEventListener('click', () => {
      state.eventsExpanded = true;
      render();
    });

  const shareBtn = document.querySelector('[data-action="toggle-share"]');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({ title: 'Til Apfel', url: location.href }).catch(() => {});
        return;
      }
      const next = !state.shareMenuOpen;
      closeMenus();
      state.shareMenuOpen = next;
      state.shareCopied = false;
      render();
    });
  }
  const shareBackdrop = document.querySelector('[data-close-share-menu]');
  if (shareBackdrop)
    shareBackdrop.addEventListener('click', () => {
      state.shareMenuOpen = false;
      render();
    });
  const copyLinkBtn = document.querySelector('[data-action="copy-share-link"]');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
      const markCopied = () => {
        state.shareCopied = true;
        copyLinkBtn.textContent = view.t.linkCopied;
      };
      if (navigator.clipboard?.writeText) {
        navigator.clipboard
          .writeText(location.href)
          .then(markCopied)
          .catch(() => selectShareUrl());
      } else {
        selectShareUrl();
      }
    });
  }

  const searchBtn = document.querySelector('[data-action="toggle-search"]');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const next = !state.searchOpen;
      closeMenus();
      state.searchOpen = next;
      render();
    });
  }
  const searchInput = document.getElementById('site-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      state.searchQuery = event.target.value;
      updateSearchResults();
    });
  }
  wireSearchResultLinks();

  const auftragForm = document.querySelector('[data-form="auftrag"]');
  if (auftragForm) {
    auftragForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const t = view.t;
      if (!(await passesSpamCheck(auftragForm, t))) return;
      const formData = new FormData(auftragForm);
      const body = `Name: ${formData.get('name')}\nE-Mail: ${formData.get('email')}\n${t.labelArt}: ${formData.get('art')}\n${t.labelZeitrahmen}: ${formData.get('zeitrahmen')}\n\n${formData.get('beschreibung')}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.emailSubjectQuote + formData.get('art'))}&body=${encodeURIComponent(body)}`;
    });
  }

  const newsletterForm = document.querySelector('[data-form="newsletter"]');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(newsletterForm);
      const body = `${view.t.newsletterFirstNameLabel}: ${formData.get('firstname')}\n${view.t.newsletterEmailLabel}: ${formData.get('email')}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(view.t.newsletterEmailSubject)}&body=${encodeURIComponent(body)}`;
    });
  }

  const kontaktForm = document.querySelector('[data-form="kontakt"]');
  if (kontaktForm) {
    kontaktForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const t = view.t;
      if (!(await passesSpamCheck(kontaktForm, t))) return;
      const formData = new FormData(kontaktForm);
      const body = `Name: ${formData.get('name')}\nE-Mail: ${formData.get('email')}\n\n${formData.get('nachricht')}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.emailSubjectContact)}&body=${encodeURIComponent(body)}`;
    });
  }
}

function updateSearchResults() {
  const results = document.getElementById('site-search-results');
  if (results) results.innerHTML = renderSearchResults();
  const count = document.getElementById('site-search-result-count');
  if (count) count.innerHTML = searchResultCountHtml();
  wireSearchResultLinks();
}

function wireSearchResultLinks() {
  document.querySelectorAll('#site-search-results [data-action="close-search"]').forEach((el) => {
    el.addEventListener('click', () => {
      state.searchOpen = false;
      state.searchQuery = '';
    });
  });
}
