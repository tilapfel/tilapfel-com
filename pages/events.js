import { escapeHtml } from '../components/utils.js';
import { ICONS } from '../components/icons.js';
import { simpleCardHtml, eventCardHtml } from '../components/card.js';
import { modalHtml } from '../components/modal.js';

export function renderEventsList(view) {
  const t = view.t;
  const bookable = view.bookableFormats.map(simpleCardHtml).join('');
  const upcoming = view.visibleTermine.map((entry) => eventCardHtml(entry)).join('');
  const showMore = view.hasMoreTermine
    ? `<button type="button" class="btn-outline" data-action="show-more-events">${escapeHtml(view.moreEventsLabel)}</button>`
    : '';
  const pastSection = view.hasPastTermine
    ? `
    <hr class="divider">
    <section class="section card-list">
      <h2 class="heading-sm">${escapeHtml(t.pastHeading)}</h2>
      ${view.pastTermine.map((entry) => eventCardHtml(entry, { linked: false, muted: true })).join('')}
    </section>`
    : '';

  return `
  <div data-screen-label="Events">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.events}<span>${escapeHtml(t.eventsTitle)}</span></h1>
      <p class="subtitle">${escapeHtml(t.eventsSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section card-list">
      <h2 class="heading-sm">${escapeHtml(t.bookableHeading)}</h2>
      ${bookable}
      <a href="#/formular" class="cta-button compact">${escapeHtml(t.ctaKostenvoranschlag)}</a>
    </section>
    <hr class="divider">
    <section class="section card-list">
      <h2 class="heading-sm">${escapeHtml(t.upcomingHeading)}</h2>
      ${upcoming}
      ${showMore}
    </section>
    ${pastSection}
  </div>`;
}

export function renderEventModal(view) {
  const t = view.t;
  const entry = view.currentTermin;
  if (!entry) return '';
  return modalHtml({
    labelledBy: 'ev-modal-title',
    closeLabel: t.closeDialog,
    bodyHtml: `
      <span class="modal-eyebrow-row">${escapeHtml(entry.date)} · ${escapeHtml(entry.category)}</span>
      <h2 id="ev-modal-title">${escapeHtml(entry.title)}</h2>
      <p class="modal-location">${escapeHtml(entry.location)}</p>
      <p>${escapeHtml(entry.detail)}</p>
      <p>${escapeHtml(entry.info)}</p>
      <a href="${entry.rsvpHref}" class="cta-button compact">${escapeHtml(t.registerBtn)}</a>`,
  });
}
