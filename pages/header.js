import { escapeHtml } from '../components/utils.js';
import { ICONS } from '../components/icons.js';

export function renderHeader(view) {
  if (view.isBio) return '';
  const navHtml = view.navItems
    .map(
      (item) => `
    <a class="nav-link" href="${item.href}" ${item.current ? 'aria-current="page"' : ''}>
      <span class="nav-icon" aria-hidden="true">${ICONS[item.icon]}</span>
      <span class="nav-label">${escapeHtml(item.label)}</span>
    </a>`
    )
    .join('');
  return `
  <header class="site-header">
    <div class="header-inner">
      <div class="header-top-row">
        <a href="#/" class="brand">Til Apfel</a>
      </div>
      <nav class="nav-full" aria-label="${escapeHtml(view.t.navAriaLabel)}">${navHtml}</nav>
    </div>
  </header>`;
}
