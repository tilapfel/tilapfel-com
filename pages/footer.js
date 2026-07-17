import { escapeHtml } from '../components/utils.js';
import { ICONS } from '../components/icons.js';
import { langToggleHtml, easyLangToggleHtml, themeToggleHtml } from '../components/toggles.js';
import { searchButtonHtml } from '../components/search.js';

export function renderFooter(view) {
  const t = view.t;
  return `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-row">
        ${langToggleHtml(view, { withLabel: true })}
        ${easyLangToggleHtml(view)}
        ${themeToggleHtml(view, { withLabel: true })}
        ${searchButtonHtml(view)}
        <a class="nav-link" href="#/legal" ${view.section === 'legal' ? 'aria-current="page"' : ''} aria-label="${escapeHtml(t.footerImpressum)}" title="${escapeHtml(t.footerImpressum)}" data-tooltip="${escapeHtml(t.footerImpressum)}">
          <span class="nav-icon" aria-hidden="true">${ICONS.paragraph}</span>
          <span class="nav-label">${escapeHtml(t.footerImpressum)}</span>
        </a>
      </div>
      <span class="footer-copy">© 2026 · Til Apfel</span>
    </div>
  </footer>`;
}
