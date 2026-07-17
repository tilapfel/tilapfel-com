import { state, parseRoute, loadLocale, setLocale } from './state.js';
import { render, dismissOnboarding } from './router.js';
import { STORAGE_KEYS, readStorage } from './storage.js';

window.addEventListener('hashchange', () => {
  window.scrollTo(0, 0);
  render();
});

window.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (state.onboardingOpen) {
    dismissOnboarding();
    return;
  }
  if (state.searchOpen) {
    state.searchOpen = false;
    state.searchQuery = '';
    render();
    return;
  }
  const segments = parseRoute().split('/').filter(Boolean);
  if (segments.length > 1) {
    location.hash = `#/${segments[0]}`;
  }
});

try {
  matchMedia('(prefers-color-scheme: light)').addEventListener('change', (event) => {
    if (!readStorage(STORAGE_KEYS.theme)) {
      state.theme = event.matches ? 'light' : 'dark';
      render();
    }
  });
} catch {
  // matchMedia change listener unsupported — system theme changes simply won't live-update.
}

/**
 * The Dark Reader extension sets `data-darkreader-scheme` on <html> once it
 * applies (often after our own script runs), so both an immediate check and
 * a MutationObserver are needed. Only relevant when we're already dark —
 * Dark Reader is a legitimate choice on a light page.
 */
function checkDarkReader() {
  if (state.darkReaderDismissed || state.darkReaderDetected) return;
  const active = document.documentElement.getAttribute('data-darkreader-scheme') === 'dark';
  if (active && state.theme === 'dark') {
    state.darkReaderDetected = true;
    render();
  }
}
checkDarkReader();
new MutationObserver(checkDarkReader).observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-darkreader-scheme'],
});

// Fetch only the active locale, then render.
loadLocale(state.lang).then((loaded) => {
  setLocale(loaded);
  render();
});
