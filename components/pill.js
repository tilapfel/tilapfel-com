import { escapeHtml } from './utils.js';

/** Small rounded badge used for roles, focus topics, and values. */
export function pillHtml(label, { icon, solid = false } = {}) {
  const iconMarkup = icon ? `<span class="pill-icon" aria-hidden="true">${icon}</span>` : '';
  return `<span class="pill${solid ? ' solid' : ''}">${iconMarkup}<span>${escapeHtml(label)}</span></span>`;
}
