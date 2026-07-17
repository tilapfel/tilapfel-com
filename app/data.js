import { ICONS } from '../components/icons.js';

/** Route + icon key are language-independent; the label comes from the active locale (`locale.nav[route]`). */
export const NAV = [
  { route: 'about', icon: 'about' },
  { route: 'projects', icon: 'rocket' },
  { route: 'feeds', icon: 'feed' },
  { route: 'events', icon: 'events' },
  { route: 'library', icon: 'library' },
];

/**
 * Bio page primary links: structural data only (target, url, icon) — every
 * entry's label/text comes from the matching index in `locale.bioPrimary`
 * (see content/de.js, content/en.js) since these are now full descriptive
 * phrases, not language-independent proper nouns.
 */
export const BIO_PRIMARY_LINKS = [
  { href: '#/', url: 'tilapfel.com', icon: ICONS.home },
  { href: 'https://stiftung.tilapfel.com', url: 'stiftung.tilapfel.com', icon: ICONS.heart },
  { href: 'https://apps.tilapfel.com', url: 'apps.tilapfel.com', icon: ICONS.grid },
];

export const BIO_SOCIAL_LINKS = [
  { label: 'RSS', href: 'https://tilapfel.com/feed.xml', bg: 'oklch(52% 0.09 55)', icon: ICONS.rss },
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
  {
    label: 'Bluesky',
    href: 'https://bsky.app/profile/tilapfel.bsky.social',
    bg: 'oklch(58% 0.13 220)',
    icon: ICONS.bluesky,
  },
  {
    label: 'ResearchGate',
    href: 'https://www.researchgate.net/profile/Til-Apfel',
    bg: 'oklch(55% 0.1 165)',
    icon: ICONS.researchgate,
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
export const AVAILABLE_LOCALES = ['dgs', 'de', 'en'];
export const LOCALE_META = {
  de: { nativeName: 'Deutsch' },
  en: { nativeName: 'English' },
  dgs: { nativeName: 'DGS' },
};
export const DEFAULT_LOCALE = 'de';
