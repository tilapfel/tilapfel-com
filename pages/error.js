import { escapeHtml } from '../components/utils.js';
import { ICONS } from '../components/icons.js';

export function renderError(view) {
  const t = view.t;
  return `
  <div data-screen-label="404">
    <section class="page-hero">
      <h1 class="page-title">${ICONS.notFound}<span>${escapeHtml(t.errorTitle)}</span></h1>
      <p class="subtitle">${escapeHtml(t.errorBody)}</p>
    </section>
    <hr class="divider">
    <section class="section">
      <a class="btn-outline" href="#/">${escapeHtml(t.errorHomeLink)}</a>
    </section>
  </div>`;
}
