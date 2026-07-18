import { ICONS } from '../components/icons.js';
import { escapeHtml } from '../components/utils.js';
import { modalHtml } from '../components/modal.js';
import { STORAGE_KEYS, readStorage, writeStorage } from '../app/storage.js';
import { COLLECTIONS } from './collections.js';

const REPO = 'tilapfel/tilapfel-com';
const BRANCH = 'main';
const GITHUB_API = 'https://api.github.com';
const TOKEN_KEY = 'tilapfel-admin-token';

const T = {
  de: {
    heading: 'Content-Verwaltung',
    login: 'Mit GitHub einloggen',
    loggedInAs: 'Angemeldet als',
    logout: 'Abmelden',
    back: 'Zurück',
    newEntry: '+ Neuer Eintrag',
    save: 'Speichern',
    saving: 'Speichert…',
    delete: 'Löschen',
    cancel: 'Abbrechen',
    deleteConfirm: 'Diesen Eintrag wirklich löschen? Das kann nicht rückgängig gemacht werden.',
    duplicateSlug: 'Diese Kombination aus URL-Bausteinen wird bereits von einem anderen Eintrag verwendet.',
    loadError: 'Inhalte konnten nicht geladen werden.',
    saveError: 'Speichern fehlgeschlagen.',
    loginError: 'Anmeldung fehlgeschlagen oder abgelaufen. Bitte erneut versuchen.',
    empty: 'Noch keine Einträge.',
  },
  en: {
    heading: 'Content management',
    login: 'Log in with GitHub',
    loggedInAs: 'Logged in as',
    logout: 'Log out',
    back: 'Back',
    newEntry: '+ New entry',
    save: 'Save',
    saving: 'Saving…',
    delete: 'Delete',
    cancel: 'Cancel',
    deleteConfirm: 'Really delete this entry? This cannot be undone.',
    duplicateSlug: 'This combination of URL segments is already used by another entry.',
    loadError: 'Could not load content.',
    saveError: 'Save failed.',
    loginError: 'Login failed or expired. Please try again.',
    empty: 'No entries yet.',
  },
};

const state = {
  token: null,
  user: null,
  uiLang: readStorage(STORAGE_KEYS.lang) === 'en' ? 'en' : 'de',
  theme:
    readStorage(STORAGE_KEYS.theme) ||
    (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
  view: 'login', // login | dashboard | list
  collectionKey: null,
  entries: { de: null, en: null }, // { data: [...], sha } per language, for the active collection
  loadError: null,
  editor: null, // { index (null = new), lang, values: { de: {...}, en: {...} }, error, saving }
};

function t() {
  return T[state.uiLang];
}

/** UTF-8-safe base64 helpers — GitHub's Contents API speaks base64, browsers' btoa/atob only speak Latin-1. */
function toBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}
function fromBase64(b64) {
  return decodeURIComponent(escape(atob(b64.replace(/\n/g, ''))));
}

function authHeaders() {
  return state.token
    ? { Authorization: `token ${state.token}`, Accept: 'application/vnd.github+json' }
    : { Accept: 'application/vnd.github+json' };
}

async function ghGetFile(path) {
  const res = await fetch(`${GITHUB_API}/repos/${REPO}/contents/${path}?ref=${BRANCH}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`GET ${path} failed (${res.status})`);
  const body = await res.json();
  return { data: JSON.parse(fromBase64(body.content)), sha: body.sha };
}

async function ghPutFile(path, dataObj, sha, message) {
  const res = await fetch(`${GITHUB_API}/repos/${REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      content: toBase64(JSON.stringify(dataObj, null, 2) + '\n'),
      sha,
      branch: BRANCH,
    }),
  });
  if (!res.ok) throw new Error(`PUT ${path} failed (${res.status})`);
  return res.json();
}

/** Reads the token out of the OAuth redirect's URL fragment on first load, then never again. */
function consumeAuthRedirect() {
  if (!location.hash) return;
  const params = new URLSearchParams(location.hash.slice(1));
  const token = params.get('access_token');
  const error = params.get('error');
  history.replaceState(null, '', location.pathname);
  if (token) sessionStorage.setItem(TOKEN_KEY, token);
  if (error) state.loadError = t().loginError;
}

async function loadUser() {
  const res = await fetch(`${GITHUB_API}/user`, { headers: authHeaders() });
  if (!res.ok) {
    sessionStorage.removeItem(TOKEN_KEY);
    state.token = null;
    state.view = 'login';
    return;
  }
  state.user = await res.json();
}

async function init() {
  consumeAuthRedirect();
  state.token = sessionStorage.getItem(TOKEN_KEY);
  document.documentElement.setAttribute('data-theme', state.theme);
  if (state.token) {
    await loadUser();
    if (state.token) state.view = 'dashboard';
  }
  render();
}

async function openCollection(key) {
  state.collectionKey = key;
  state.view = 'list';
  state.entries = { de: null, en: null };
  state.loadError = null;
  render();
  try {
    const [de, en] = await Promise.all([ghGetFile('content/de.json'), ghGetFile('content/en.json')]);
    state.entries.de = { data: de.data[key] || [], sha: de.sha };
    state.entries.en = { data: en.data[key] || [], sha: en.sha };
  } catch {
    state.loadError = t().loadError;
  }
  render();
}

function openEditor(index) {
  const collection = COLLECTIONS[state.collectionKey];
  const blankEntry = () =>
    Object.fromEntries(collection.fields.map((f) => [f.key, f.type === 'tags' ? [] : '']));
  state.editor = {
    index,
    lang: state.uiLang,
    values: {
      de: index == null ? blankEntry() : { ...state.entries.de.data[index] },
      en: index == null ? blankEntry() : { ...state.entries.en.data[index] },
    },
    error: null,
    saving: false,
  };
  render();
}

function closeEditor() {
  state.editor = null;
  render();
}

function slugConflict(lang, index) {
  const collection = COLLECTIONS[state.collectionKey];
  if (!collection.slugFields.length) return false;
  const key = collection.slugFields.map((f) => state.editor.values[lang][f]).join('/');
  return state.entries[lang].data.some((entry, i) => {
    if (i === index) return false;
    return collection.slugFields.map((f) => entry[f]).join('/') === key;
  });
}

async function saveEditor() {
  const { index } = state.editor;
  if (slugConflict('de', index) || slugConflict('en', index)) {
    state.editor.error = t().duplicateSlug;
    render();
    return;
  }
  state.editor.saving = true;
  state.editor.error = null;
  render();
  try {
    const [de, en] = await Promise.all([ghGetFile('content/de.json'), ghGetFile('content/en.json')]);
    for (const [lang, file] of [
      ['de', de],
      ['en', en],
    ]) {
      const list = [...file.data[state.collectionKey]];
      if (index == null) list.push(state.editor.values[lang]);
      else list[index] = state.editor.values[lang];
      file.data[state.collectionKey] = list;
    }
    const message =
      index == null
        ? `Add ${state.collectionKey} entry via admin dashboard`
        : `Edit ${state.collectionKey} entry via admin dashboard`;
    await ghPutFile('content/de.json', de.data, de.sha, message);
    await ghPutFile('content/en.json', en.data, en.sha, message);
    state.editor = null;
    await openCollection(state.collectionKey);
  } catch {
    state.editor.saving = false;
    state.editor.error = t().saveError;
    render();
  }
}

async function deleteEditorEntry() {
  const { index } = state.editor;
  if (index == null || !confirm(t().deleteConfirm)) return;
  state.editor.saving = true;
  render();
  try {
    const [de, en] = await Promise.all([ghGetFile('content/de.json'), ghGetFile('content/en.json')]);
    for (const file of [de, en]) {
      file.data[state.collectionKey] = file.data[state.collectionKey].filter((_, i) => i !== index);
    }
    const message = `Delete ${state.collectionKey} entry via admin dashboard`;
    await ghPutFile('content/de.json', de.data, de.sha, message);
    await ghPutFile('content/en.json', en.data, en.sha, message);
    state.editor = null;
    await openCollection(state.collectionKey);
  } catch {
    state.editor.saving = false;
    state.editor.error = t().saveError;
    render();
  }
}

function loginScreenHtml() {
  return `
    <div class="admin-login">
      <h1>${escapeHtml(t().heading)}</h1>
      ${state.loadError ? `<p class="form-error">${escapeHtml(state.loadError)}</p>` : ''}
      <a class="btn-outline" href="/api/auth">
        <span aria-hidden="true">${ICONS.github}</span>
        ${escapeHtml(t().login)}
      </a>
    </div>`;
}

function headerBarHtml() {
  return `
    <div class="admin-topbar">
      <div class="admin-topbar-user">
        ${state.user ? `<img class="admin-avatar" src="${escapeHtml(state.user.avatar_url)}" alt="" width="28" height="28">` : ''}
        <span>${escapeHtml(t().loggedInAs)} ${escapeHtml(state.user?.login || '')}</span>
      </div>
      <div class="admin-topbar-actions">
        <button type="button" class="icon-btn" data-action="toggle-theme" title="${escapeHtml(state.theme === 'dark' ? 'Hell' : 'Dunkel')}">
          <span aria-hidden="true">${state.theme === 'dark' ? ICONS.sun : ICONS.moon}</span>
        </button>
        <button type="button" class="icon-btn" data-action="toggle-lang" title="${state.uiLang === 'de' ? 'English' : 'Deutsch'}">
          <span aria-hidden="true">${ICONS.globe}</span>
        </button>
        <button type="button" class="btn-outline" data-action="logout">${escapeHtml(t().logout)}</button>
      </div>
    </div>`;
}

function dashboardHtml() {
  const tiles = Object.entries(COLLECTIONS)
    .map(
      ([key, c]) => `
      <button type="button" class="admin-tile" data-action="open-collection" data-key="${key}">
        <span class="admin-tile-icon" aria-hidden="true">${c.icon}</span>
        <span>${escapeHtml(c.label[state.uiLang])}</span>
      </button>`
    )
    .join('');
  return `
    <div class="admin-dashboard">
      <h1>${escapeHtml(t().heading)}</h1>
      <div class="admin-grid">${tiles}</div>
    </div>`;
}

function listRowHtml(entry, index) {
  const collection = COLLECTIONS[state.collectionKey];
  return `
    <li class="admin-row">
      <button type="button" class="admin-row-main" data-action="edit-entry" data-index="${index}">
        <span class="admin-row-title">${escapeHtml(entry.title || '')}</span>
        <span class="admin-row-subtitle">${escapeHtml(entry[collection.listSubtitle] || '')}</span>
      </button>
    </li>`;
}

function listViewHtml() {
  const collection = COLLECTIONS[state.collectionKey];
  if (state.loadError) return `<p class="form-error">${escapeHtml(state.loadError)}</p>`;
  if (!state.entries.de) return `<p>…</p>`;
  const entries = state.entries[state.uiLang].data;
  return `
    <div class="admin-list-view">
      <div class="admin-list-header">
        <button type="button" class="icon-btn" data-action="back-to-dashboard" title="${escapeHtml(t().back)}">
          <span aria-hidden="true">${ICONS.arrowLeft}</span>
        </button>
        <h1>${escapeHtml(collection.label[state.uiLang])}</h1>
        <button type="button" class="btn-outline" data-action="new-entry">${escapeHtml(t().newEntry)}</button>
      </div>
      ${entries.length ? `<ul class="admin-row-list">${entries.map(listRowHtml).join('')}</ul>` : `<p>${escapeHtml(t().empty)}</p>`}
    </div>`;
}

function editorFieldHtml(field) {
  const value = escapeHtml(
    field.type === 'tags'
      ? state.editor.values[state.editor.lang][field.key].join(', ')
      : state.editor.values[state.editor.lang][field.key]
  );
  const label = field.label[state.uiLang];
  const hint = field.hint ? `<p class="admin-field-hint">${escapeHtml(field.hint[state.uiLang])}</p>` : '';
  const input =
    field.type === 'textarea'
      ? `<textarea rows="3" data-field="${field.key}">${value}</textarea>`
      : `<input type="text" data-field="${field.key}" value="${value}">`;
  return `
    <div class="form-field">
      <label>${escapeHtml(label)}</label>
      ${input}
      ${hint}
    </div>`;
}

function editorModalHtml() {
  const collection = COLLECTIONS[state.collectionKey];
  const { lang, index, error, saving } = state.editor;
  const langPills = ['de', 'en']
    .map(
      (code) => `
      <button type="button" class="${code === lang ? 'active' : ''}" data-action="set-editor-lang" data-lang="${code}">${code.toUpperCase()}</button>`
    )
    .join('');
  return modalHtml({
    labelledBy: 'admin-editor-title',
    closeLabel: t().cancel,
    bodyHtml: `
      <h2 id="admin-editor-title">${escapeHtml(collection.label[state.uiLang])}</h2>
      <div class="admin-lang-pills" role="group">${langPills}</div>
      <form data-action="editor-form">
        ${collection.fields.map(editorFieldHtml).join('')}
        ${error ? `<p class="form-error">${escapeHtml(error)}</p>` : ''}
        <div class="admin-editor-actions">
          ${index != null ? `<button type="button" class="btn-outline" data-action="delete-entry" ${saving ? 'disabled' : ''}>${escapeHtml(t().delete)}</button>` : '<span></span>'}
          <button type="submit" class="submit-btn" ${saving ? 'disabled' : ''}>${escapeHtml(saving ? t().saving : t().save)}</button>
        </div>
      </form>`,
  });
}

function render() {
  const root = document.getElementById('admin-root');
  if (state.view === 'login') {
    root.innerHTML = loginScreenHtml();
  } else if (state.view === 'dashboard') {
    root.innerHTML = headerBarHtml() + dashboardHtml();
  } else if (state.view === 'list') {
    root.innerHTML = headerBarHtml() + listViewHtml();
  }
  root.insertAdjacentHTML('beforeend', state.editor ? editorModalHtml() : '');
  attachListeners();
}

function attachListeners() {
  document.querySelectorAll('[data-action="toggle-theme"]').forEach((el) =>
    el.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      writeStorage(STORAGE_KEYS.theme, state.theme);
      document.documentElement.setAttribute('data-theme', state.theme);
      render();
    })
  );
  document.querySelectorAll('[data-action="toggle-lang"]').forEach((el) =>
    el.addEventListener('click', () => {
      state.uiLang = state.uiLang === 'de' ? 'en' : 'de';
      writeStorage(STORAGE_KEYS.lang, state.uiLang);
      render();
    })
  );
  document.querySelectorAll('[data-action="logout"]').forEach((el) =>
    el.addEventListener('click', () => {
      sessionStorage.removeItem(TOKEN_KEY);
      state.token = null;
      state.user = null;
      state.view = 'login';
      render();
    })
  );
  document
    .querySelectorAll('[data-action="open-collection"]')
    .forEach((el) => el.addEventListener('click', () => openCollection(el.getAttribute('data-key'))));
  document.querySelectorAll('[data-action="back-to-dashboard"]').forEach((el) =>
    el.addEventListener('click', () => {
      state.view = 'dashboard';
      render();
    })
  );
  document
    .querySelectorAll('[data-action="new-entry"]')
    .forEach((el) => el.addEventListener('click', () => openEditor(null)));
  document
    .querySelectorAll('[data-action="edit-entry"]')
    .forEach((el) => el.addEventListener('click', () => openEditor(Number(el.getAttribute('data-index')))));
  document.querySelectorAll('[data-close-modal]').forEach((el) => el.addEventListener('click', closeEditor));
  document.querySelectorAll('[data-action="set-editor-lang"]').forEach((el) =>
    el.addEventListener('click', () => {
      state.editor.lang = el.getAttribute('data-lang');
      render();
    })
  );
  document.querySelectorAll('[data-field]').forEach((el) =>
    el.addEventListener('input', () => {
      const key = el.getAttribute('data-field');
      const field = COLLECTIONS[state.collectionKey].fields.find((f) => f.key === key);
      state.editor.values[state.editor.lang][key] =
        field.type === 'tags'
          ? el.value
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          : el.value;
    })
  );
  const form = document.querySelector('[data-action="editor-form"]');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      saveEditor();
    });
  }
  document
    .querySelectorAll('[data-action="delete-entry"]')
    .forEach((el) => el.addEventListener('click', deleteEditorEntry));
}

init();
