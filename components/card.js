import { escapeHtml } from './utils.js';

/**
 * Recurring card patterns. Each function has exactly one implementation,
 * called from both a page's home preview and its full list — so a future
 * edit can't drift between the two.
 */

/** Title + description card, used for Focus items and Bookable formats. */
export function simpleCardHtml({ title, desc }) {
  return `<div class="card card-simple"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(desc)}</p></div>`;
}

/** Portfolio entry: compact (home preview) shows date · category; detailed (full list) also shows location. */
export function portfolioCardHtml(entry, { detailed = false } = {}) {
  const meta = detailed
    ? `<div class="card-meta">
        <span class="meta-strong">${escapeHtml(entry.date)}</span><span>·</span>
        <span class="eyebrow" style="margin:0">${escapeHtml(entry.category)}</span><span>·</span>
        <span>${escapeHtml(entry.location)}</span>
      </div>`
    : `<span class="eyebrow">${escapeHtml(entry.date)} · ${escapeHtml(entry.category)}</span>`;
  return `
    <a class="list-card" href="${entry.href}">
      ${meta}
      <h3>${escapeHtml(entry.title)}</h3>
      <p class="desc">${escapeHtml(entry.short)}</p>
    </a>`;
}

/** Event/Termin entry: linked (home preview + upcoming list) or plain (past events); muted dims it. */
export function eventCardHtml(entry, { linked = true, muted = false } = {}) {
  const tag = linked ? 'a' : 'div';
  const hrefAttr = linked ? ` href="${entry.href}"` : '';
  return `
    <${tag} class="list-card${muted ? ' past' : ''}"${hrefAttr}>
      <span class="eyebrow-plain">${escapeHtml(entry.date)} · ${escapeHtml(entry.category)}</span>
      <h3>${escapeHtml(entry.title)}</h3>
      <p class="desc">${escapeHtml(entry.location)}</p>
    </${tag}>`;
}

/** Library entry card (also reused for the home preview). */
export function libraryCardHtml(entry) {
  return `
    <div class="card card-simple">
      <span class="eyebrow">${escapeHtml(entry.type)}</span>
      <h3>${escapeHtml(entry.title)}</h3>
      <p>${escapeHtml(entry.desc)}</p>
    </div>`;
}
