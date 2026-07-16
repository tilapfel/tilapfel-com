import { ICONS } from '../components/icons.js';

/** Route + icon key are language-independent; the label comes from the active locale (`locale.nav[route]`). */
export const NAV = [
  { route: 'about', icon: 'about' },
  { route: 'portfolio', icon: 'portfolio' },
  { route: 'focus', icon: 'focus' },
  { route: 'events', icon: 'events' },
  { route: 'library', icon: 'library' },
];

/**
 * Bio page links: proper nouns / brand names, identical across languages.
 * Primary links render as neutral full-width tiles; social links render as
 * small brand-colored circular icons in a row (linktr.ee-style).
 */
export const BIO_PRIMARY_LINKS = [
  { label: 'Website', href: '#/', url: 'tilapfel.com', icon: ICONS.network },
  {
    label: 'Stiftung',
    href: 'https://stiftung.tilapfel.com',
    url: 'stiftung.tilapfel.com',
    icon: ICONS.heart,
  },
  { label: 'Apps', href: 'https://apps.tilapfel.com', url: 'apps.tilapfel.com', icon: ICONS.grid },
];

export const BIO_SOCIAL_LINKS = [
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@tilapfel',
    bg: 'oklch(52% 0.09 25)',
    icon: ICONS.youtube,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/tilapfel',
    bg: 'oklch(52% 0.09 340)',
    icon: ICONS.instagram,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/tilapfel',
    bg: 'oklch(52% 0.09 255)',
    icon: ICONS.facebook,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tilapfel',
    bg: 'oklch(52% 0.09 230)',
    icon: ICONS.linkedin,
  },
  { label: 'GitHub', href: 'https://github.com/tilapfel', bg: 'oklch(30% 0 0)', icon: ICONS.github },
];

export const CONTACT_EMAIL = 'info@tilapfel.com';

/**
 * Localization registry: every file in ../content/ must export a default
 * object with the exact same shape (see content/de.js). Adding a language
 * means adding a content file plus a matching entry here. Only the active
 * locale is ever fetched; others load on demand when switched to.
 */
export const AVAILABLE_LOCALES = ['de', 'en'];
export const LOCALE_META = { de: { nativeName: 'Deutsch' }, en: { nativeName: 'English' } };
export const DEFAULT_LOCALE = 'de';
