import { ICONS } from '../components/icons.js';
import { escapeHtml } from '../components/utils.js';
import { modalHtml } from '../components/modal.js';
import { STORAGE_KEYS, readStorage, writeStorage } from '../app/storage.js';
import { COLLECTIONS } from './collections.js';
import { PAGES } from './pages.js';

const REPO = 'tilapfel/tilapfel-com';
const BRANCH = 'main';
const GITHUB_API = 'https://api.github.com';
const TOKEN_KEY = 'tilapfel-admin-token';

const T = {
  de: {
    heading: 'Dashboard',
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
    visitSite: 'Seite besuchen',
    maintenanceTurnOn: 'Wartungsmodus einschalten',
    maintenanceTurnOff: 'Wartungsmodus ausschalten',
    maintenanceConfirmOn:
      'Wartungsmodus aktivieren? Besucher sehen dann die Wartungsseite statt der normalen Seite.',
    maintenanceConfirmOff:
      'Wartungsmodus deaktivieren? Die Seite ist danach für alle wieder normal erreichbar.',
    eventsHeading: 'Termine',
    upcomingEvents: 'Kommende Termine',
    pastEvents: 'Vergangene Termine',
    typeUpcoming: 'Kommend',
    typePast: 'Vergangen',
  },
  en: {
    heading: 'Dashboard',
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
    visitSite: 'Visit site',
    maintenanceTurnOn: 'Turn on maintenance mode',
    maintenanceTurnOff: 'Turn off maintenance mode',
    maintenanceConfirmOn:
      'Turn on maintenance mode? Visitors will see the maintenance page instead of the normal site.',
    maintenanceConfirmOff:
      'Turn off maintenance mode? The site will be reachable normally for everyone again.',
    eventsHeading: 'Events',
    upcomingEvents: 'Upcoming Events',
    pastEvents: 'Past Events',
    typeUpcoming: 'Upcoming',
    typePast: 'Past',
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
  isTermineGroup: false, // true when the merged Termine (termine + pastTermine) tile is open
  entries: { de: null, en: null }, // { data: <full parsed JSON file>, sha } per language
  loadError: null,
  editor: null, // { index (null = new), lang, values: { de: {...}, en: {...} }, error, saving }
  settings: null, // { data: { maintenanceMode }, sha }, loaded once logged in
  maintenanceError: null,
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

async function loadSettings() {
  try {
    state.settings = await ghGetFile('content/settings.json');
  } catch {
    state.settings = null;
  }
}

async function toggleMaintenance() {
  if (!state.settings) return;
  const next = !state.settings.data.maintenanceMode;
  if (!confirm(next ? t().maintenanceConfirmOn : t().maintenanceConfirmOff)) return;
  state.maintenanceError = null;
  try {
    const data = { ...state.settings.data, maintenanceMode: next };
    const put = await ghPutFile(
      'content/settings.json',
      data,
      state.settings.sha,
      next ? 'Enable maintenance mode via admin dashboard' : 'Disable maintenance mode via admin dashboard'
    );
    state.settings = { data, sha: put.content.sha };
  } catch {
    state.maintenanceError = t().saveError;
  }
  render();
}

async function init() {
  consumeAuthRedirect();
  state.token = sessionStorage.getItem(TOKEN_KEY);
  document.documentElement.setAttribute('data-theme', state.theme);
  if (state.token) {
    await loadUser();
    if (state.token) {
      state.view = 'dashboard';
      await loadSettings();
    }
  }
  render();
}

async function openCollection(key) {
  state.collectionKey = key;
  state.isTermineGroup = false;
  state.view = 'list';
  state.entries = { de: null, en: null };
  state.loadError = null;
  render();
  try {
    const [de, en] = await Promise.all([ghGetFile('content/de.json'), ghGetFile('content/en.json')]);
    state.entries.de = de;
    state.entries.en = en;
  } catch {
    state.loadError = t().loadError;
  }
  render();
}

/** The "Termine" dashboard tile merges COLLECTIONS.termine + COLLECTIONS.pastTermine into one view. */
async function openTermineGroup() {
  state.collectionKey = null;
  state.isTermineGroup = true;
  state.view = 'list';
  state.entries = { de: null, en: null };
  state.loadError = null;
  render();
  try {
    const [de, en] = await Promise.all([ghGetFile('content/de.json'), ghGetFile('content/en.json')]);
    state.entries.de = de;
    state.entries.en = en;
  } catch {
    state.loadError = t().loadError;
  }
  render();
}

function blankEntryFor(collection) {
  return Object.fromEntries(collection.fields.map((f) => [f.key, f.type === 'tags' ? [] : '']));
}

/** Drops any fields a values object picked up from a since-abandoned type (see set-editor-type). */
function pickFields(collection, values) {
  return Object.fromEntries(collection.fields.map((f) => [f.key, values[f.key]]));
}

/**
 * `arrayKey` (only used for the merged Termine view) is which underlying
 * array — 'termine' or 'pastTermine' — an existing entry was opened from.
 * COLLECTIONS.termine.fields is a superset of COLLECTIONS.pastTermine's,
 * so a blank new entry can always start from the termine template and grow
 * or shrink its visible fields as the type pill is switched.
 */
function openEditor(index, arrayKey = null) {
  if (state.isTermineGroup) {
    const sourceArray = index == null ? null : arrayKey;
    const type = sourceArray || 'termine';
    state.editor = {
      index,
      lang: state.uiLang,
      sourceArray,
      type,
      values: {
        de:
          index == null
            ? blankEntryFor(COLLECTIONS.termine)
            : { ...state.entries.de.data[sourceArray][index] },
        en:
          index == null
            ? blankEntryFor(COLLECTIONS.termine)
            : { ...state.entries.en.data[sourceArray][index] },
      },
      error: null,
      saving: false,
    };
    render();
    return;
  }
  const collection = COLLECTIONS[state.collectionKey];
  state.editor = {
    index,
    lang: state.uiLang,
    values: {
      de:
        index == null ? blankEntryFor(collection) : { ...state.entries.de.data[state.collectionKey][index] },
      en:
        index == null ? blankEntryFor(collection) : { ...state.entries.en.data[state.collectionKey][index] },
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
  const collectionKey = state.isTermineGroup ? state.editor.type : state.collectionKey;
  const collection = COLLECTIONS[collectionKey];
  if (!collection.slugFields.length) return false;
  const key = collection.slugFields.map((f) => state.editor.values[lang][f]).join('/');
  const selfArray = state.isTermineGroup ? state.editor.sourceArray : state.collectionKey;
  const selfIndex = selfArray === collectionKey ? index : null;
  return state.entries[lang].data[collectionKey].some((entry, i) => {
    if (i === selfIndex) return false;
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
      if (state.isTermineGroup) {
        const { sourceArray, type } = state.editor;
        const moved = index != null && sourceArray !== type;
        if (moved) file.data[sourceArray] = file.data[sourceArray].filter((_, i) => i !== index);
        const value = pickFields(COLLECTIONS[type], state.editor.values[lang]);
        const list = [...file.data[type]];
        if (index == null || moved) list.push(value);
        else list[index] = value;
        file.data[type] = list;
      } else {
        const list = [...file.data[state.collectionKey]];
        if (index == null) list.push(state.editor.values[lang]);
        else list[index] = state.editor.values[lang];
        file.data[state.collectionKey] = list;
      }
    }
    const label = state.isTermineGroup ? 'events' : state.collectionKey;
    const message =
      index == null ? `Add ${label} entry via admin dashboard` : `Edit ${label} entry via admin dashboard`;
    const [dePut, enPut] = await Promise.all([
      ghPutFile('content/de.json', de.data, de.sha, message),
      ghPutFile('content/en.json', en.data, en.sha, message),
    ]);
    state.entries.de = { data: de.data, sha: dePut.content.sha };
    state.entries.en = { data: en.data, sha: enPut.content.sha };
    state.editor = null;
    render();
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
    const arrayKey = state.isTermineGroup ? state.editor.sourceArray : state.collectionKey;
    for (const file of [de, en]) {
      file.data[arrayKey] = file.data[arrayKey].filter((_, i) => i !== index);
    }
    const label = state.isTermineGroup ? 'events' : state.collectionKey;
    const message = `Delete ${label} entry via admin dashboard`;
    const [dePut, enPut] = await Promise.all([
      ghPutFile('content/de.json', de.data, de.sha, message),
      ghPutFile('content/en.json', en.data, en.sha, message),
    ]);
    state.entries.de = { data: de.data, sha: dePut.content.sha };
    state.entries.en = { data: en.data, sha: enPut.content.sha };
    state.editor = null;
    render();
  } catch {
    state.editor.saving = false;
    state.editor.error = t().saveError;
    render();
  }
}

function loginScreenHtml() {
  return `
    <div class="admin-login">
      ${state.loadError ? `<p class="form-error">${escapeHtml(state.loadError)}</p>` : ''}
      <a class="submit-btn admin-login-btn" href="/api/auth">
        <span aria-hidden="true">${ICONS.github}</span>
        ${escapeHtml(t().login)}
      </a>
    </div>`;
}

function headerBarHtml() {
  const maintenanceOn = state.settings?.data.maintenanceMode === true;
  return `
    <div class="admin-topbar">
      <div class="admin-topbar-user">
        ${state.user ? `<img class="admin-avatar" src="${escapeHtml(state.user.avatar_url)}" alt="" width="28" height="28">` : ''}
        <span>${escapeHtml(t().loggedInAs)} ${escapeHtml(state.user?.login || '')}</span>
      </div>
      <div class="admin-topbar-actions">
        <a class="icon-btn" href="/" target="_blank" rel="noopener" title="${escapeHtml(t().visitSite)}" data-tooltip="${escapeHtml(t().visitSite)}">
          <span aria-hidden="true">${ICONS.home}</span>
        </a>
        ${
          state.settings
            ? `<button type="button" class="icon-btn${maintenanceOn ? ' active' : ''}" data-action="toggle-maintenance" title="${escapeHtml(maintenanceOn ? t().maintenanceTurnOff : t().maintenanceTurnOn)}" data-tooltip="${escapeHtml(maintenanceOn ? t().maintenanceTurnOff : t().maintenanceTurnOn)}">
                <span aria-hidden="true">${ICONS.lock}</span>
              </button>`
            : ''
        }
        <button type="button" class="icon-btn" data-action="toggle-theme" title="${escapeHtml(state.theme === 'dark' ? 'Hell' : 'Dunkel')}">
          <span aria-hidden="true">${state.theme === 'dark' ? ICONS.sun : ICONS.moon}</span>
        </button>
        <button type="button" class="icon-btn" data-action="toggle-lang" title="${state.uiLang === 'de' ? 'English' : 'Deutsch'}">
          <span aria-hidden="true">${ICONS.globe}</span>
        </button>
        <button type="button" class="btn-outline" data-action="logout">${escapeHtml(t().logout)}</button>
      </div>
    </div>
    ${state.maintenanceError ? `<p class="form-error">${escapeHtml(state.maintenanceError)}</p>` : ''}`;
}

function dashboardHtml() {
  const tiles = PAGES.map((page) => {
    const label = escapeHtml(page.label[state.uiLang]);
    if (page.kind === 'preview') {
      return `
      <a class="admin-tile" href="/#/${page.route}" target="_blank" rel="noopener">
        <span class="admin-tile-icon" aria-hidden="true">${page.icon}</span>
        <span>${label} <span aria-hidden="true">↗</span></span>
      </a>`;
    }
    const action = page.kind === 'termine-group' ? 'open-termine-group' : 'open-collection';
    const dataKey = page.kind === 'collection' ? ` data-key="${page.collectionKey}"` : '';
    return `
      <button type="button" class="admin-tile" data-action="${action}"${dataKey}>
        <span class="admin-tile-icon" aria-hidden="true">${page.icon}</span>
        <span>${label}</span>
      </button>`;
  }).join('');
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

function termineRowHtml(entry, arrayKey, index) {
  return `
    <li class="admin-row">
      <button type="button" class="admin-row-main" data-action="edit-entry" data-array="${arrayKey}" data-index="${index}">
        <span class="admin-row-title">${escapeHtml(entry.title || '')}</span>
        <span class="admin-row-subtitle">${escapeHtml(entry.date || '')}</span>
      </button>
    </li>`;
}

function termineGroupListHtml() {
  const upcoming = state.entries[state.uiLang].data.termine;
  const past = state.entries[state.uiLang].data.pastTermine;
  const group = (entries, arrayKey, heading) => `
      <h2 class="admin-group-title">${escapeHtml(heading)}</h2>
      ${entries.length ? `<ul class="admin-row-list">${entries.map((entry, i) => termineRowHtml(entry, arrayKey, i)).join('')}</ul>` : `<p>${escapeHtml(t().empty)}</p>`}`;
  return `
    <div class="admin-list-view">
      <div class="admin-list-header">
        <button type="button" class="icon-btn" data-action="back-to-dashboard" title="${escapeHtml(t().back)}">
          <span aria-hidden="true">${ICONS.arrowLeft}</span>
        </button>
        <h1>${escapeHtml(t().eventsHeading)}</h1>
        <button type="button" class="btn-outline" data-action="new-entry">${escapeHtml(t().newEntry)}</button>
      </div>
      ${group(upcoming, 'termine', t().upcomingEvents)}
      ${group(past, 'pastTermine', t().pastEvents)}
    </div>`;
}

function listViewHtml() {
  if (state.loadError) return `<p class="form-error">${escapeHtml(state.loadError)}</p>`;
  if (!state.entries.de) return `<p>…</p>`;
  if (state.isTermineGroup) return termineGroupListHtml();
  const collection = COLLECTIONS[state.collectionKey];
  const entries = state.entries[state.uiLang].data[state.collectionKey];
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
  const collectionKey = state.isTermineGroup ? state.editor.type : state.collectionKey;
  const collection = COLLECTIONS[collectionKey];
  const { lang, index, error, saving } = state.editor;
  const langPills = ['de', 'en']
    .map(
      (code) => `
      <button type="button" class="${code === lang ? 'active' : ''}" data-action="set-editor-lang" data-lang="${code}">${code.toUpperCase()}</button>`
    )
    .join('');
  const typePills = state.isTermineGroup
    ? `<div class="admin-lang-pills" role="group">
        <button type="button" class="${state.editor.type === 'termine' ? 'active' : ''}" data-action="set-editor-type" data-type="termine">${escapeHtml(t().typeUpcoming)}</button>
        <button type="button" class="${state.editor.type === 'pastTermine' ? 'active' : ''}" data-action="set-editor-type" data-type="pastTermine">${escapeHtml(t().typePast)}</button>
      </div>`
    : '';
  return modalHtml({
    labelledBy: 'admin-editor-title',
    closeLabel: t().cancel,
    bodyHtml: `
      <h2 id="admin-editor-title">${escapeHtml(state.isTermineGroup ? t().eventsHeading : collection.label[state.uiLang])}</h2>
      ${typePills}
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
      document.cookie = 'admin_session=; Max-Age=0; Path=/';
      state.token = null;
      state.user = null;
      state.view = 'login';
      render();
    })
  );
  document
    .querySelectorAll('[data-action="toggle-maintenance"]')
    .forEach((el) => el.addEventListener('click', toggleMaintenance));
  document
    .querySelectorAll('[data-action="open-collection"]')
    .forEach((el) => el.addEventListener('click', () => openCollection(el.getAttribute('data-key'))));
  document
    .querySelectorAll('[data-action="open-termine-group"]')
    .forEach((el) => el.addEventListener('click', openTermineGroup));
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
    .forEach((el) =>
      el.addEventListener('click', () =>
        openEditor(Number(el.getAttribute('data-index')), el.getAttribute('data-array'))
      )
    );
  document.querySelectorAll('[data-close-modal]').forEach((el) => el.addEventListener('click', closeEditor));
  document.querySelectorAll('[data-action="set-editor-lang"]').forEach((el) =>
    el.addEventListener('click', () => {
      state.editor.lang = el.getAttribute('data-lang');
      render();
    })
  );
  document.querySelectorAll('[data-action="set-editor-type"]').forEach((el) =>
    el.addEventListener('click', () => {
      const type = el.getAttribute('data-type');
      state.editor.type = type;
      for (const lang of ['de', 'en']) {
        for (const field of COLLECTIONS[type].fields) {
          if (state.editor.values[lang][field.key] === undefined) {
            state.editor.values[lang][field.key] = field.type === 'tags' ? [] : '';
          }
        }
      }
      render();
    })
  );
  document.querySelectorAll('[data-field]').forEach((el) =>
    el.addEventListener('input', () => {
      const key = el.getAttribute('data-field');
      const collectionKey = state.isTermineGroup ? state.editor.type : state.collectionKey;
      const field = COLLECTIONS[collectionKey].fields.find((f) => f.key === key);
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
