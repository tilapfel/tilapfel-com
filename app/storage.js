/** Named localStorage keys, so a preference name is spelled once, not per call site. */
export const STORAGE_KEYS = {
  lang: 'tilapfel-lang',
  theme: 'tilapfel-theme',
  easyLanguage: 'tilapfel-easy-lang',
  onboarded: 'tilapfel-onboarded',
};

/** localStorage can throw (private browsing, disabled storage) — every read/write goes through here. */
export function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage unavailable — the preference simply won't persist this session.
  }
}
