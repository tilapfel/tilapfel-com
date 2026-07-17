import { escapeHtml } from '../components/utils.js';
import { ICONS } from '../components/icons.js';
import { libraryCardHtml } from '../components/card.js';
import { modalHtml } from '../components/modal.js';
import { shareToggleHtml } from '../components/toggles.js';

export function renderLibrary(view) {
  const t = view.t;
  const items = view.library.map(libraryCardHtml).join('');
  const press = view.press
    .map(
      (entry) => `
    <div class="card press-item">
      <span class="press-meta">${escapeHtml(entry.outlet)} · ${escapeHtml(entry.date)}</span>
      <h3>${escapeHtml(entry.title)}</h3>
    </div>`
    )
    .join('');
  return `
  <div data-screen-label="Library">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.library}<span>${escapeHtml(t.libraryTitle)}</span></h1>
      <p class="subtitle">${escapeHtml(t.librarySubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section card-list">
      <h2 class="heading-sm">${escapeHtml(t.publicationsHeading)}</h2>
      ${items}
    </section>
    <hr class="divider">
    <section class="section card-list">
      <h2 class="heading-sm">${escapeHtml(t.pressHeading)}</h2>
      ${press}
    </section>
  </div>`;
}

export function renderLibraryModal(view) {
  const entry = view.currentLibraryEntry;
  if (!entry) return '';
  return modalHtml({
    labelledBy: 'lib-modal-title',
    closeLabel: view.t.closeDialog,
    shareHtml: shareToggleHtml(view, { dropDown: true }),
    bodyHtml: `
      <span class="modal-eyebrow-row">${escapeHtml(entry.type)}</span>
      <h2 id="lib-modal-title">${escapeHtml(entry.title)}</h2>
      <p>${escapeHtml(entry.desc)}</p>`,
  });
}
