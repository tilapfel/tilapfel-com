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
        ${langToggleHtml(view)}
        ${easyLangToggleHtml(view)}
        ${themeToggleHtml(view)}
        ${searchButtonHtml(view)}
        <a class="icon-btn" href="#/impressum" aria-label="${escapeHtml(t.footerImpressum)}" title="${escapeHtml(t.footerImpressum)}"><span aria-hidden="true">${ICONS.paragraph}</span></a>
      </div>
      <span class="footer-copy">© 2026 Til Apfel</span>
    </div>
  </footer>`;
}
