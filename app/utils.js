/** Fallback when navigator.clipboard is unavailable/denied: select the URL text so the user can copy it manually. */
export function selectShareUrl() {
  const urlEl = document.querySelector('.share-url');
  if (!urlEl) return;
  const range = document.createRange();
  range.selectNodeContents(urlEl);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}
