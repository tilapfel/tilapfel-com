import { escapeHtml } from '../components/utils.js';
import { modalHtml } from '../components/modal.js';
import { state } from '../app/state.js';
import { AVAILABLE_LOCALES, LOCALE_META } from '../app/data.js';

/**
 * First-visit onboarding: shown once until dismissed (tracked via
 * STORAGE_KEYS.onboarded). Lets a new visitor pick language, easy
 * language, and theme up front, each as a labelled choice — not icon-only,
 * since this is the one place explaining what the footer icons mean.
 * Clicking a choice reuses the exact same state changes as the footer
 * controls (`data-set-lang` / `data-set-easylang` / `data-set-theme` are
 * handled generically in app/router.js), so there is exactly one source of
 * truth for each preference.
 */
export function renderOnboardingModal(view) {
  if (!state.onboardingOpen) return '';
  const t = view.t;
  const langChoices = AVAILABLE_LOCALES.map(
    (code) => `
    <button type="button" class="onboarding-choice${view.lang === code ? ' active' : ''}" data-set-lang="${code}">${escapeHtml(LOCALE_META[code].nativeName)}</button>`
  ).join('');

  return modalHtml({
    labelledBy: 'onboarding-title',
    closeLabel: t.closeDialog,
    bodyHtml: `
      <h2 id="onboarding-title">${escapeHtml(t.onboardingTitle)}</h2>
      <p class="onboarding-intro">${escapeHtml(t.onboardingIntro)}</p>

      <div class="onboarding-group">
        <h3 class="onboarding-group-title">${escapeHtml(t.onboardingLangLabel)}</h3>
        <div class="onboarding-choice-row">${langChoices}</div>
      </div>

      <div class="onboarding-group">
        <h3 class="onboarding-group-title">${escapeHtml(t.easyLanguage)}</h3>
        <div class="onboarding-choice-row">
          <button type="button" class="onboarding-choice${state.easyLanguage ? ' active' : ''}" data-set-easylang="on">${escapeHtml(t.easyLanguageOn)}</button>
          <button type="button" class="onboarding-choice${!state.easyLanguage ? ' active' : ''}" data-set-easylang="off">${escapeHtml(t.easyLanguageOff)}</button>
        </div>
      </div>

      <div class="onboarding-group">
        <h3 class="onboarding-group-title">${escapeHtml(t.onboardingThemeLabel)}</h3>
        <div class="onboarding-choice-row">
          <button type="button" class="onboarding-choice${state.theme === 'light' ? ' active' : ''}" data-set-theme="light">${escapeHtml(t.onboardingLight)}</button>
          <button type="button" class="onboarding-choice${state.theme === 'dark' ? ' active' : ''}" data-set-theme="dark">${escapeHtml(t.onboardingDark)}</button>
        </div>
      </div>

      <button type="button" class="cta-button compact" data-action="close-onboarding">${escapeHtml(t.onboardingDone)}</button>`,
  });
}
