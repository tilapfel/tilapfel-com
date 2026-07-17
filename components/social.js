import { escapeHtml } from './utils.js';

/** Social-media icon row (brand-colored circles). Single implementation, shared by Bio and Feeds pages. */
export function socialRowHtml(view) {
  const icons = view.bioSocialLinks
    .map(
      (link) => `
    <a class="icon-btn circle" href="${link.href}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(link.label)}" title="${escapeHtml(link.label)}" data-tooltip="${escapeHtml(link.label)}" style="background:${link.bg};border-color:${link.bg};color:#fff">
      <span aria-hidden="true">${link.icon}</span>
    </a>`
    )
    .join('');
  return `<div class="bio-social-row">${icons}</div>`;
}
