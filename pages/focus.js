import { escapeHtml } from '../components/utils.js';
import { ICONS } from '../components/icons.js';
import { simpleCardHtml } from '../components/card.js';

export function renderFocus(view) {
  const t = view.t;
  const cards = view.focusItems.map(simpleCardHtml).join('');
  return `
  <div data-screen-label="Focus">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.focus}<span>${escapeHtml(t.focusTitle)}</span></h1>
      <p class="subtitle">${escapeHtml(t.focusSubtitle)}</p>
    </section>
    <hr class="divider">
    <section class="section card-list">
      ${cards}
      <p style="font-size:16px;line-height:1.6;color:var(--text-primary)">${escapeHtml(t.focusClosing)}</p>
    </section>
  </div>`;
}
