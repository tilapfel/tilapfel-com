import { ICONS } from '../components/icons.js';

/**
 * One entry per content/{de,en}.json array. `slugFields` lists the
 * properties that together form this entry's URL on the live site (see
 * app/router.js's computeVals()) — the editor checks these stay unique
 * within the collection before allowing a save, since a duplicate would
 * silently break a route. `listSubtitle` picks which field shows as the
 * second line in the list view.
 */
export const COLLECTIONS = {
  portfolio: {
    label: { de: 'Projekte', en: 'Projects' },
    icon: ICONS.rocket,
    listSubtitle: 'date',
    slugFields: ['tagSlug', 'dateSlug'],
    fields: [
      { key: 'title', label: { de: 'Titel', en: 'Title' }, type: 'text' },
      { key: 'date', label: { de: 'Zeitraum (Anzeigetext)', en: 'Period (display text)' }, type: 'text' },
      { key: 'category', label: { de: 'Kategorie', en: 'Category' }, type: 'text' },
      { key: 'location', label: { de: 'Ort', en: 'Location' }, type: 'text' },
      { key: 'short', label: { de: 'Kurzbeschreibung', en: 'Short description' }, type: 'textarea' },
      { key: 'full', label: { de: 'Ausführliche Beschreibung', en: 'Full description' }, type: 'textarea' },
      { key: 'approach', label: { de: 'Vorgehen', en: 'Approach' }, type: 'textarea' },
      {
        key: 'tagSlug',
        label: { de: 'Tag (URL-Baustein)', en: 'Tag (URL segment)' },
        type: 'text',
        hint: {
          de: 'Bildet zusammen mit dem Datum die Web-Adresse. Muss zusammen mit dem Datum eindeutig sein.',
          en: 'Forms the URL together with the date. Must be unique together with the date.',
        },
      },
      {
        key: 'dateSlug',
        label: { de: 'Datum (URL-Baustein)', en: 'Date (URL segment)' },
        type: 'text',
        hint: {
          de: 'Kurzform, z. B. 2026 oder 2026-07-22.',
          en: 'Short form, e.g. 2026 or 2026-07-22.',
        },
      },
    ],
  },

  termine: {
    label: { de: 'Kommende Termine', en: 'Upcoming Events' },
    icon: ICONS.events,
    listSubtitle: 'date',
    slugFields: ['tagSlug', 'dateSlug'],
    fields: [
      { key: 'title', label: { de: 'Titel', en: 'Title' }, type: 'text' },
      { key: 'date', label: { de: 'Datum (Anzeigetext)', en: 'Date (display text)' }, type: 'text' },
      { key: 'category', label: { de: 'Kategorie', en: 'Category' }, type: 'text' },
      { key: 'location', label: { de: 'Ort', en: 'Location' }, type: 'text' },
      { key: 'detail', label: { de: 'Details', en: 'Details' }, type: 'textarea' },
      { key: 'info', label: { de: 'Zusatzinfo', en: 'Extra info' }, type: 'textarea' },
      {
        key: 'tagSlug',
        label: { de: 'Tag (URL-Baustein)', en: 'Tag (URL segment)' },
        type: 'text',
        hint: {
          de: 'Bildet zusammen mit dem Datum die Web-Adresse. Muss zusammen mit dem Datum eindeutig sein.',
          en: 'Forms the URL together with the date. Must be unique together with the date.',
        },
      },
      {
        key: 'dateSlug',
        label: { de: 'Datum (URL-Baustein)', en: 'Date (URL segment)' },
        type: 'text',
        hint: { de: 'Format JJJJ-MM-TT, z. B. 2026-07-22.', en: 'Format YYYY-MM-DD, e.g. 2026-07-22.' },
      },
    ],
  },

  pastTermine: {
    label: { de: 'Vergangene Termine', en: 'Past Events' },
    icon: ICONS.events,
    listSubtitle: 'date',
    slugFields: [],
    fields: [
      { key: 'title', label: { de: 'Titel', en: 'Title' }, type: 'text' },
      { key: 'date', label: { de: 'Datum (Anzeigetext)', en: 'Date (display text)' }, type: 'text' },
      { key: 'category', label: { de: 'Kategorie', en: 'Category' }, type: 'text' },
      { key: 'location', label: { de: 'Ort', en: 'Location' }, type: 'text' },
    ],
  },

  library: {
    label: { de: 'Library', en: 'Library' },
    icon: ICONS.library,
    listSubtitle: 'type',
    slugFields: ['slug'],
    fields: [
      { key: 'title', label: { de: 'Titel', en: 'Title' }, type: 'text' },
      { key: 'type', label: { de: 'Typ', en: 'Type' }, type: 'text' },
      { key: 'desc', label: { de: 'Beschreibung', en: 'Description' }, type: 'textarea' },
      {
        key: 'slug',
        label: { de: 'Slug (URL-Baustein)', en: 'Slug (URL segment)' },
        type: 'text',
        hint: { de: 'Bildet die Web-Adresse. Muss eindeutig sein.', en: 'Forms the URL. Must be unique.' },
      },
    ],
  },

  press: {
    label: { de: 'Presse', en: 'Press' },
    icon: ICONS.doc,
    listSubtitle: 'date',
    slugFields: [],
    fields: [
      { key: 'title', label: { de: 'Titel', en: 'Title' }, type: 'text' },
      { key: 'outlet', label: { de: 'Medium', en: 'Outlet' }, type: 'text' },
      { key: 'date', label: { de: 'Datum', en: 'Date' }, type: 'text' },
    ],
  },

  feedsPosts: {
    label: { de: 'Feed-Beiträge', en: 'Feed Posts' },
    icon: ICONS.feed,
    listSubtitle: 'date',
    slugFields: ['formatSlug', 'dateSlug'],
    fields: [
      { key: 'title', label: { de: 'Titel', en: 'Title' }, type: 'text' },
      { key: 'date', label: { de: 'Datum (Anzeigetext)', en: 'Date (display text)' }, type: 'text' },
      { key: 'source', label: { de: 'Quelle', en: 'Source' }, type: 'text' },
      { key: 'desc', label: { de: 'Beschreibung', en: 'Description' }, type: 'textarea' },
      {
        key: 'tags',
        label: { de: 'Themen-Tags (Komma-getrennt)', en: 'Topic tags (comma-separated)' },
        type: 'tags',
      },
      {
        key: 'formatSlug',
        label: { de: 'Format (URL-Baustein)', en: 'Format (URL segment)' },
        type: 'text',
        hint: {
          de: 'Bildet zusammen mit dem Datum die Web-Adresse. Muss zusammen mit dem Datum eindeutig sein.',
          en: 'Forms the URL together with the date. Must be unique together with the date.',
        },
      },
      {
        key: 'dateSlug',
        label: { de: 'Datum (URL-Baustein)', en: 'Date (URL segment)' },
        type: 'text',
        hint: { de: 'Format JJJJ-MM, z. B. 2026-06.', en: 'Format YYYY-MM, e.g. 2026-06.' },
      },
    ],
  },
};
