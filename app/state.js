import { AVAILABLE_LOCALES, DEFAULT_LOCALE } from './data.js';
import { STORAGE_KEYS, readStorage } from './storage.js';

/** Mutable UI state (theme, open popovers, form-adjacent flags). Pages/components read it directly. */
export const state = {
  lang: pickInitialLocale(),
  theme:
    readStorage(STORAGE_KEYS.theme) ||
    (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
  easyLanguage: readStorage(STORAGE_KEYS.easyLanguage) === '1',
  eventsExpanded: false,
  feedsTagFilter: null,
  langMenuOpen: false,
  easyLangMenuOpen: false,
  shareMenuOpen: false,
  shareCopied: false,
  searchOpen: false,
  searchQuery: '',
  newsletterOpen: false,
  darkReaderDetected: false,
  darkReaderDismissed: false,
  formToken: null,
  formTokenSection: null,
  onboardingOpen: !readStorage(STORAGE_KEYS.onboarded),
};

/**
 * The active locale's data object. Exported as a live binding — other
 * modules can read `locale` directly, but only `setLocale()` (called from
 * here) may reassign it, since ES modules don't allow importers to write
 * back to an imported binding.
 */
export let locale = null;

export function setLocale(loaded) {
  locale = loaded;
}

const localeCache = new Map();

/**
 * Fetches a locale on first use only; later calls for the same code resolve
 * from the cache. Each locale is assembled from two sources: the `.js`
 * module (translations, static/legal content — code-managed) and a `.json`
 * file (the growing content lists — CMS-managed via /admin, see
 * admin/config.yml). DGS has no written form of its own, so it reuses the
 * German JSON data rather than shipping a duplicate dgs.json.
 */
export function loadLocale(code) {
  if (localeCache.has(code)) return Promise.resolve(localeCache.get(code));
  const jsonCode = code === 'dgs' ? 'de' : code;
  return Promise.all([
    import(`../content/${code}.js`),
    fetch(`content/${jsonCode}.json`).then((res) => res.json()),
  ]).then(([mod, data]) => {
    const merged = { ...mod.default, ...data };
    localeCache.set(code, merged);
    return merged;
  });
}

function pickInitialLocale() {
  const stored = readStorage(STORAGE_KEYS.lang);
  if (stored && AVAILABLE_LOCALES.includes(stored)) return stored;
  return detectSystemLocale();
}

function detectSystemLocale() {
  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language || DEFAULT_LOCALE];
  for (const language of languages) {
    const code = String(language).toLowerCase().split('-')[0];
    if (AVAILABLE_LOCALES.includes(code)) return code;
  }
  return DEFAULT_LOCALE;
}

/** Current route with the leading `#/` stripped, e.g. `location.hash` of `#/projects/foo` → `projects/foo`. */
export function parseRoute() {
  const hash = location.hash || '#/';
  return hash.replace(/^#\/?/, '');
}
