import { ICONS } from '../components/icons.js';

/**
 * Ordered list of every site page for the dashboard grid — not just the
 * ones with an editable collection behind them (Bio, Home, About, Angebot,
 * Kontakt, Impressum, Datenschutz have none). `kind` decides what a click
 * does: 'preview' opens the live page in a new tab, 'collection' opens the
 * matching COLLECTIONS[collectionKey] list/editor, and the one
 * 'termine-group' tile merges COLLECTIONS.termine + COLLECTIONS.pastTermine
 * into a single view (see openTermineGroup() in app.js). Order here is the
 * dashboard's tile order: Bio, Home, then the main nav order, then the rest.
 */
export const PAGES = [
  { route: 'bio', label: { de: 'Bio', en: 'Bio' }, icon: ICONS.share, kind: 'preview' },
  { route: '', label: { de: 'Home', en: 'Home' }, icon: ICONS.home, kind: 'preview' },
  { route: 'about', label: { de: 'About', en: 'About' }, icon: ICONS.about, kind: 'preview' },
  {
    route: 'projects',
    label: { de: 'Projekte', en: 'Projects' },
    icon: ICONS.rocket,
    kind: 'collection',
    collectionKey: 'portfolio',
  },
  {
    route: 'feeds',
    label: { de: 'Feeds', en: 'Feeds' },
    icon: ICONS.feed,
    kind: 'collection',
    collectionKey: 'feedsPosts',
  },
  { route: 'events', label: { de: 'Termine', en: 'Events' }, icon: ICONS.events, kind: 'termine-group' },
  {
    route: 'library',
    label: { de: 'Library', en: 'Library' },
    icon: ICONS.library,
    kind: 'collection',
    collectionKey: 'library',
  },
  {
    route: null,
    label: { de: 'Presse', en: 'Press' },
    icon: ICONS.doc,
    kind: 'collection',
    collectionKey: 'press',
  },
  { route: 'quote', label: { de: 'Angebot', en: 'Quote' }, icon: ICONS.roleConsulting, kind: 'preview' },
  { route: 'contact', label: { de: 'Kontakt', en: 'Contact' }, icon: ICONS.mail, kind: 'preview' },
  { route: 'legal', label: { de: 'Impressum', en: 'Legal notice' }, icon: ICONS.paragraph, kind: 'preview' },
  { route: 'privacy', label: { de: 'Datenschutz', en: 'Privacy' }, icon: ICONS.lock, kind: 'preview' },
];
