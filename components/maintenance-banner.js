import { escapeHtml } from './utils.js';
import { state } from '../app/state.js';

/**
 * Shown while content/settings.json's maintenanceMode flag is true. Only
 * the site owner ever sees this — everyone else is stopped by
 * netlify/edge-functions/maintenance-gate.mjs before the app even loads,
 * so reaching this component at all already proves the visitor bypassed
 * that gate. No dismiss button: it's a status indicator, not a one-off
 * notice, and should stay visible for as long as the state is true.
 */
export function maintenanceBannerHtml(view) {
  if (!state.maintenanceMode) return '';
  const t = view.t;
  return `
  <div class="maintenance-banner" role="status">
    <span>${escapeHtml(t.maintenanceBannerNotice)}</span>
    <a href="/admin/">${escapeHtml(t.maintenanceBannerLink)}</a>
  </div>`;
}
