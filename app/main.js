import { state, parseRoute, loadLocale, setLocale } from './state.js';
import { render, dismissOnboarding } from './router.js';
import { STORAGE_KEYS, readStorage } from './storage.js';

window.addEventListener('hashchange', render);

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
  if ((segments[0] === 'portfolio' || segments[0] === 'events') && segments[1]) {
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

// Fetch only the active locale, then render.
loadLocale(state.lang).then((loaded) => {
  setLocale(loaded);
  render();
});
