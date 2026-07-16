import { ROLE_ICONS } from '../components/icons.js';
import { renderSearchResults, searchModalHtml } from '../components/search.js';
import { selectShareUrl } from './utils.js';
import { state, locale, setLocale, loadLocale, parseRoute } from './state.js';
import { NAV, BIO_PRIMARY_LINKS, BIO_SOCIAL_LINKS, CONTACT_EMAIL, AVAILABLE_LOCALES } from './data.js';
import { STORAGE_KEYS, writeStorage } from './storage.js';
import { renderHeader } from '../pages/header.js';
import { renderFooter } from '../pages/footer.js';
import { renderHome } from '../pages/home.js';
import { renderAbout } from '../pages/about.js';
import { renderPortfolioList, renderPortfolioModal } from '../pages/portfolio.js';
import { renderFocus } from '../pages/focus.js';
import { renderEventsList, renderEventModal } from '../pages/events.js';
import { renderLibrary } from '../pages/library.js';
import { renderFormular } from '../pages/formular.js';
import { renderKontakt } from '../pages/kontakt.js';
import { renderBio } from '../pages/bio.js';
import { renderImpressum } from '../pages/impressum.js';
import { renderOnboardingModal } from '../pages/onboarding.js';

const appEl = document.getElementById('app');
const headerSlot = document.getElementById('header-slot');
const footerSlot = document.getElementById('footer-slot');
const skipLinkEl = document.querySelector('.skip-link');

const PAGE_RENDERERS = {
  '': renderHome,
  about: renderAbout,
  portfolio: (view) => renderPortfolioList(view) + renderPortfolioModal(view),
  focus: renderFocus,
  events: (view) => renderEventsList(view) + renderEventModal(view),
  library: renderLibrary,
  formular: renderFormular,
  kontakt: renderKontakt,
  bio: renderBio,
  impressum: renderImpressum,
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
    href: `#/portfolio/${entry.slug}`,
  }));
  const termineLocalized = locale.termine.map((entry) => ({
    ...entry,
    href: `#/events/${entry.slug}`,
    rsvpHref: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.emailSubjectRegistration + entry.title)}`,
  }));

  const currentPortfolio =
    section === 'portfolio' && slug ? portfolioLocalized.find((entry) => entry.slug === slug) : null;
  const currentTermin =
    section === 'events' && slug ? termineLocalized.find((entry) => entry.slug === slug) : null;

  const expanded = state.eventsExpanded;
  const visibleTermine = expanded ? termineLocalized : termineLocalized.slice(0, 3);
  const remaining = termineLocalized.length - 3;

  return {
    route,
    section,
    slug,
    isBio,
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
    library: locale.library,
    homeLibrary: locale.library.slice(0, 2),
    press: locale.press,
    focusItems: locale.focusItems,
    werte: locale.werte,
    principles: locale.principles,
    bookableFormats: locale.bookable,
    roles: locale.roleLabels.map((label, i) => ({ label, icon: ROLE_ICONS[i] })),
    aboutRoles: locale.roleLabels.map((title, i) => ({
      title,
      desc: locale.roleDescs[i],
      icon: ROLE_ICONS[i],
    })),
    bioPrimaryLinks: BIO_PRIMARY_LINKS,
    bioSocialLinks: BIO_SOCIAL_LINKS,
    auftragArten: locale.auftragArten,
  };
}

function titleFor(section, t) {
  const titles = {
    '': t.heroTagline,
    about: t.aboutTitle,
    portfolio: t.portfolioTitle,
    focus: t.focusTitle,
    events: t.eventsTitle,
    library: t.libraryTitle,
    formular: t.formularTitle,
    kontakt: t.kontaktTitle,
    bio: 'Bio',
    impressum: 'Impressum',
  };
  const page = titles[section] || '';
  return page ? `Til Apfel – ${page}` : 'Til Apfel';
}

/** Re-renders header, current page, footer, and any open overlay from scratch. Called on every state change. */
export function render() {
  if (!locale) return;
  const view = computeVals();
  document.documentElement.setAttribute('data-theme', state.theme);
  document.documentElement.setAttribute('lang', view.lang);
  document.title = titleFor(view.section, view.t);
  if (skipLinkEl) skipLinkEl.textContent = view.t.skip;

  headerSlot.innerHTML = renderHeader(view);

  const pageRenderer = PAGE_RENDERERS[view.section] || renderHome;
  appEl.innerHTML = pageRenderer(view) + searchModalHtml(view) + renderOnboardingModal(view);
  footerSlot.innerHTML = view.isBio ? '' : renderFooter(view);

  document.body.style.overflow =
    view.currentPortfolio || view.currentTermin || state.searchOpen || state.onboardingOpen ? 'hidden' : '';
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
}

export function setLang(code) {
  if (!AVAILABLE_LOCALES.includes(code)) return;
  loadLocale(code).then((loaded) => {
    setLocale(loaded);
    state.lang = code;
    state.langMenuOpen = false;
    writeStorage(STORAGE_KEYS.lang, code);
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
  location.hash = `#/${view.section === 'portfolio' ? 'portfolio' : 'events'}`;
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
  const onboardingDoneBtn = document.querySelector('[data-action="close-onboarding"]');
  if (onboardingDoneBtn) onboardingDoneBtn.addEventListener('click', dismissOnboarding);

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
      const results = document.getElementById('site-search-results');
      if (results) results.innerHTML = renderSearchResults();
      wireSearchResultLinks();
    });
  }
  wireSearchResultLinks();

  const auftragForm = document.querySelector('[data-form="auftrag"]');
  if (auftragForm) {
    auftragForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(auftragForm);
      const t = view.t;
      const body = `Name: ${formData.get('name')}\nE-Mail: ${formData.get('email')}\n${t.labelArt}: ${formData.get('art')}\n${t.labelZeitrahmen}: ${formData.get('zeitrahmen')}\n\n${formData.get('beschreibung')}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.emailSubjectQuote + formData.get('art'))}&body=${encodeURIComponent(body)}`;
    });
  }

  const kontaktForm = document.querySelector('[data-form="kontakt"]');
  if (kontaktForm) {
    kontaktForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(kontaktForm);
      const body = `Name: ${formData.get('name')}\nE-Mail: ${formData.get('email')}\n\n${formData.get('nachricht')}`;
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(view.t.emailSubjectContact)}&body=${encodeURIComponent(body)}`;
    });
  }
}

function wireSearchResultLinks() {
  document.querySelectorAll('#site-search-results [data-action="close-search"]').forEach((el) => {
    el.addEventListener('click', () => {
      state.searchOpen = false;
      state.searchQuery = '';
    });
  });
}
