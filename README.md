# tilapfel.com

Statische Website für Til Apfel (Selbstständigkeit als Dozent, Berater und Aktivist für digitale Barrierefreiheit). Reines HTML/CSS/JavaScript über native ES-Module, kein Build-Schritt zum Deployen, keine Laufzeit-Abhängigkeiten. Prettier/ESLint sind reine Dev-Tools (siehe unten).

## Struktur

Inhalt, Struktur, Styling und Logik sind bewusst getrennt gehalten:

- `content/` – **Inhalt.** Zwei Dateien pro Sprache: `de.js`/`en.js` (Übersetzungen, Rollen, rechtliche Texte, Nav – code-verwaltet) und `de.json`/`en.json` (die fünf wachsenden Listen – Projekte, Termine, Library, Presse, Feed-Beiträge – über das Admin-Dashboard editierbar, siehe unten). `app/state.js`s `loadLocale()` lädt und mergt beide pro Sprache. `dgs.js` ist ein Sonderfall: Deutsche Gebärdensprache hat keine Schriftform, daher reexportiert die Datei einfach den Inhalt von `de.js` (und nutzt auch `de.json` mit) – `app/router.js` blendet zusätzlich einen Video-Platzhalter-Hinweis ein (`components/dgs-notice.js`), solange es noch keine echten DGS-Videos gibt. `settings.json` ist sprachunabhängig und enthält aktuell nur den Wartungsmodus-Schalter (siehe Admin-Dashboard unten).
- `pages/` – **Struktur.** Ein Renderer pro Route/Bildschirm (`home.js`, `about.js`, `portfolio.js`, …) plus `header.js`, `footer.js`, `onboarding.js`. Jede Datei exportiert eine `render*()`-Funktion, die Komponenten + Inhalt zu einer Seite zusammensetzt.
- `components/` – **Wiederverwendbare Bausteine.** Karten, Pills, Modal-Grundgerüst, Icon-Root, Toggle-Buttons (Theme/Sprache/Leichte Sprache/Teilen), Suche. Jedes Muster existiert genau einmal und wird von mehreren Seiten aufgerufen.
- `styles/` – **Styling.** `base.css` (Reset, Farbvariablen, Typografie), `layout.css` (Seitengerüst, Header/Footer/Nav), `components.css` (alle wiederkehrenden UI-Muster).
- `app/` – **Kernlogik.** `main.js` (Einstiegspunkt), `state.js` (Zustand, Locale-Laden), `router.js` (Rendering-Engine, Event-Wiring), `data.js` (sprachunabhängige Daten wie Navigation, Bio-Links), `storage.js` (zentrale localStorage-Zugriffe), `utils.js`.
- `assets/` – Bilder
- `favicon.svg`
- `vendor/` – Extern eingecheckte, unveränderte Bibliotheken (aktuell: `fuse.mjs`, siehe "Suche" unten). Kein npm-Runtime-Dependency, kein Bundler nötig – ganz normaler `<script type="module">`-Import wie jede andere Datei im Projekt.
- `admin/` – Das Content-Verwaltungs-Dashboard, siehe unten.

Jede Seite lädt nur die aktive Sprachdatei aus `content/` (dynamisches `import()`); weitere Sprachen werden erst bei Umschaltung nachgeladen.

## Lokal testen

Ganz einfach ein statisches Verzeichnis servieren, z.B.:

```bash
python3 -m http.server 8000
```

und dann `http://localhost:8000` öffnen. Wichtig: Der Server muss `type="module"`-Skripte korrekt ausliefern (Python `http.server` tut das automatisch).

**Achtung:** Ein einfacher statischer Server wie `python3 -m http.server` kann die Netlify Functions unter `netlify/functions/` (Spam-Schutz für die Formulare, siehe unten) nicht ausführen. Die Formulare funktionieren in diesem Fall trotzdem – der Client-Code fällt bei nicht erreichbarer Funktion bewusst auf "Absenden erlauben" zurück (fail-open) –, aber ohne jede Spam-Prüfung. Um den echten Spam-Schutz lokal zu testen, die [Netlify CLI](https://docs.netlify.com/cli/get-started/) verwenden:

```bash
npm install -g netlify-cli
netlify dev
```

## Sicherheit

- **Security-Header** (`netlify.toml`): CSP, `X-Frame-Options`, `X-Content-Type-Options` sowie `Referrer-Policy`, `Permissions-Policy` und `Strict-Transport-Security` werden von Netlify für jede Antwort gesetzt – kein Code nötig, rein deklarativ.
- **Spam-Schutz für die Formulare** (Kontakt, Kostenvoranschlag) läuft komplett unbemerkt im Hintergrund, ganz ohne CAPTCHA, über zwei Netlify Functions (`netlify/functions/form-token.mjs`, `netlify/functions/form-submit.mjs`) mit persistentem Speicher in Netlify Blobs:
  - **Honeypot:** ein für Menschen unsichtbares Formularfeld (`components/honeypot.js`), das nur Bots ausfüllen.
  - **Zeitfalle:** ein serverseitig gespeicherter Zeitstempel beim Laden des Formulars; Absenden innerhalb weniger Sekunden gilt als verdächtig.
  - **Rate-Limiting:** pro IP-Adresse eine begrenzte Anzahl Formular-Submissions pro Zeitfenster.
  - Der eigentliche Versand bleibt `mailto:`-basiert (siehe unten) – die Function ist ein reines Prüf-Gate, kein E-Mail-Versanddienst.
  - Die konkreten Schwellenwerte (`SPAM_MIN_FILL_SECONDS`, `SPAM_RATE_LIMIT_WINDOW_MS`, `SPAM_RATE_LIMIT_MAX`) stehen bewusst nicht im Code, sondern nur als Umgebungsvariablen im Netlify-Dashboard – da das Repo öffentlich ist, sollen die exakten Zahlen für Bots nicht einsehbar sein. Ohne gesetzte Variablen greifen harmlose Standardwerte im Code (siehe `netlify/functions/form-submit.mjs`), die produktiv per Umgebungsvariable überschrieben werden sollten.
- **Secrets:** Es gibt aktuell keine API-Keys oder sonstigen Secrets im Projekt – Netlify Blobs authentifiziert sich zur Laufzeit automatisch über die Netlify-Umgebung, ganz ohne manuell konfigurierte Zugangsdaten. Falls künftig ein Secret nötig wird (z. B. für einen echten Newsletter-Anbieter, siehe unten), gilt: **niemals im Code hinterlegen**, sondern ausschließlich über Umgebungsvariablen im Netlify-Dashboard (Site settings → Environment variables) einbinden. Siehe `.env.example` für das vorgesehene Muster.
- **Dependabot** (`.github/dependabot.yml`) prüft wöchentlich `package.json` sowie GitHub Actions auf verfügbare (Sicherheits-)Updates und legt automatisch PRs an.

## Suche

Die Seitensuche (`components/search.js`) läuft komplett clientseitig gegen eine aus dem jeweiligen Locale-Objekt aufgebaute Inhaltsliste, per Fuzzy-Matching mit [Fuse.js](https://fusejs.io) (Apache-2.0-Lizenz). Fuse.js wird nicht über npm/CDN eingebunden, sondern als ESM-Build lokal unter `vendor/fuse.mjs` eingecheckt (Quelle: `https://cdn.jsdelivr.net/npm/fuse.js@7/dist/fuse.mjs`) – damit bleibt die CSP (`script-src 'self'`) unverändert streng und es gibt keinen externen Laufzeit-Request. Im Suchmodal lässt sich zusätzlich die Sprache umschalten, gegen die gesucht wird (unabhängig von der aktuell angezeigten Seitensprache); DGS ist davon ausgenommen, da es keinen eigenen Fließtext hat (siehe oben).

## Admin-Dashboard

Unter `/admin` liegt ein selbstgebautes, schlankes Content-Verwaltungs-Dashboard (`admin/app.js`, `admin/collections.js`, `admin/pages.js`, `admin/admin.css`) – **kein** Decap/Netlify CMS. Grund: Decaps feste App-Struktur (Sidebar → Collection → Formular) ließ sich nicht auf das gewünschte Grid-Dashboard/Popup-Konzept ummünzen; das eigene Dashboard nutzt stattdessen direkt die vorhandenen Bausteine der Website (`components/modal.js` fürs Popup, `components/icons.js`, `styles/base.css`/`components.css`).

- **Dashboard-Kacheln:** `admin/pages.js` listet jede Seite der Website in fester Reihenfolge (Bio, Home, dann Hauptmenü-Reihenfolge, dann der Rest). Seiten ohne bearbeitbare Liste (Home, Bio, About, Angebot, Kontakt, Impressum, Datenschutz) öffnen als Vorschau die Live-Seite in neuem Tab; die übrigen öffnen Liste/Editor der zugehörigen Sammlung aus `admin/collections.js`. Kommende und vergangene Termine sind im Dashboard zu einer Kachel zusammengefasst, bleiben aber intern zwei getrennte Arrays (`termine`/`pastTermine`) – ein Typ-Umschalter im Editor entscheidet, in welches Array ein Eintrag beim Speichern geschrieben wird.
- **Umfang:** Nur die fünf wachsenden Listen sind editierbar (Projekte, Termine, Library, Presse, Feed-Beiträge – `content/de.json`/`en.json`). Übersetzungen, Rollen, rechtliche Texte bleiben Code-verwaltet.
- **Auth:** Eigener GitHub-OAuth-Flow (`netlify/functions/oauth-authorize.mjs` + `oauth-callback.mjs`), **nicht** Netlify Identity (abgekündigt). Der Callback liefert das Token per URL-Fragment (`/admin/#access_token=…`, geht nie an einen Server) zurück; `admin/app.js` liest es aus, merkt es sich nur in `sessionStorage` (nicht dauerhaft) und räumt die URL sofort auf. Zusätzlich setzt der Callback ein nicht-sensitives `admin_session`-Cookie (siehe Wartungsmodus unten).
- **Speichern:** direkt über GitHubs Contents-API aus dem Browser (mit dem OAuth-Token im Header) – jede Änderung wird ein echter Commit auf `main`, Netlify baut danach automatisch neu. Nach dem Speichern/Löschen wird der lokale Stand direkt weiterverwendet statt neu von GitHub gelesen zu werden (vermeidet ein Race mit GitHubs Contents-API kurz nach einem Schreibzugriff).
- **Wichtige Annahme:** `content/de.json` und `content/en.json` müssen pro Liste gleich lang und in gleicher Reihenfolge bleiben (ein Eintrag hängt sprachübergreifend am Array-Index zusammen). Das Dashboard fügt neue Einträge deshalb immer an beide Sprachen gleichzeitig an.
- **Env vars:** `GITHUB_OAUTH_CLIENT_ID`/`GITHUB_OAUTH_CLIENT_SECRET` (Netlify-Dashboard, siehe `.env.example`) – gehören zur GitHub-OAuth-App unter github.com/settings/developers, Callback-URL `<netlify-url>/api/callback`.
- **Lokal testen:** Dashboard/Liste lassen sich ohne Login ansehen (Lesen aus GitHubs Contents-API funktioniert bei öffentlichen Repos auch unauthentifiziert), Speichern/Löschen braucht ein echtes Token und funktioniert nur live.

### Wartungsmodus

Wird jetzt komplett über das Dashboard gesteuert (kein `netlify.toml`-Edit mehr nötig): der Schalter im Dashboard-Topbar schreibt `content/settings.json` (`{ "maintenanceMode": true|false }`) über dieselbe Contents-API wie die Inhalte.

- `netlify/edge-functions/maintenance-gate.mjs` prüft bei jedem Request auf `/` live `content/settings.json`. Ist der Modus an, wird `maintenance.html` mit echtem `503`-Status ausgeliefert (Signal an Suchmaschinen: temporär) – außer der Request trägt das `admin_session`-Cookie, das beim Login gesetzt wird. So kann der Seiteninhaber die echte Seite jederzeit weiter sehen; im Dashboard-Topbar führt der "Seite besuchen"-Link direkt dorthin, und auf der Seite selbst erscheint ein Banner zurück zum Dashboard (`components/maintenance-banner.js`), solange der Modus aktiv ist.
- `maintenance.html` ist weiterhin eine eigenständige statische Seite (kein Router/State-Overhead), hat aber ein eigenes kleines Sprache-/Leichte-Sprache-/Hell-Dunkel-Menü, das dieselben `localStorage`-Keys wie die Hauptseite liest/schreibt (`app/storage.js`).
- Das `admin_session`-Cookie trägt keine echte Berechtigung (Schreibzugriff läuft ausschließlich über den OAuth-Token in `sessionStorage`, das Repo ist ohnehin öffentlich) – es blendet nur die Wartungsseite für den eigenen Browser aus und wird beim Logout wieder gelöscht.

## Code-Qualität (Dev-Tools)

Prettier (Formatierung) und ESLint (Linting) sind als Dev-Dependencies eingerichtet – rein für die Entwicklung, ohne Einfluss auf das deployte Ergebnis:

```bash
npm install       # einmalig
npm run format    # Prettier automatisch anwenden
npm run lint      # ESLint prüfen
```

## Deployment (Netlify / Vercel)

Kein Build-Command nötig, kein Framework. Publish-/Output-Directory ist das Projektwurzelverzeichnis (`.`).

- **Netlify:** Ordner per Drag & Drop in [app.netlify.com/drop](https://app.netlify.com/drop) ziehen, oder Repo verbinden mit Build command leer lassen und Publish directory `.`.
- **Vercel:** Repo importieren, Framework Preset auf "Other" stellen, Build Command leer lassen, Output Directory `.`.

Danach die eigene Domain `tilapfel.com` im jeweiligen Hosting-Dashboard als Custom Domain hinterlegen und DNS beim Domain-Registrar entsprechend setzen (i.d.R. A-Record/CNAME laut Anleitung des Hosters).

## Vor dem Go-Live noch offen

- **Impressum** (`#/impressum`): Adresse und E-Mail sind aktuell Platzhalter ("Musterstraße 12, 12345 Musterstadt") und müssen durch echte, ladungsfähige Angaben ersetzt werden – Pflicht nach §5 TMG / §55 RStV.
- **Profilfoto** (`assets/profilfoto.png`): Der Download aus dem Claude-Design-Projekt war größer als das API-Limit (256 KB) und kam beschädigt an. Aktuell liegt hier ein Platzhalter. Bitte das Original-Foto manuell in `assets/profilfoto.png` ersetzen (idealerweise quadratisch, min. 400×400px).
- **Social-/Kontaktlinks:** YouTube/Instagram/Facebook/LinkedIn/GitHub-URLs sowie `stiftung.tilapfel.com` und `apps.tilapfel.com` (Bio-Seite) auf tatsächliche Ziele prüfen. Der RSS-Link (`app/data.js`, `BIO_SOCIAL_LINKS`) zeigt aktuell auf einen Platzhalter (`https://tilapfel.com/feed.xml`) – ein echter Feed muss noch eingerichtet werden.
- Formulare (Kontakt, Kostenvoranschlag) öffnen beim Absenden den E-Mail-Client des Besuchers (`mailto:`) – es gibt bewusst kein Server-Backend für den eigentlichen Versand; die Netlify Functions davor prüfen nur auf Spam (siehe "Sicherheit" oben).
- **Datenschutzerklärung** (`#/datenschutz`): Der Text ist ein generisches Muster (Hosting, Google Fonts, Spam-Schutz, Kontaktformulare, lokale Speicherung, Betroffenenrechte) und sollte vor Go-Live rechtlich geprüft und an den tatsächlichen Hosting-Anbieter angepasst werden.
- **Feeds-Beiträge** (`#/focus`, `content/de.json`/`en.json`, `feedsPosts`): Die fünf Beiträge sind Platzhalter-Beispiele ohne echte Ziel-Links, um die Karten-/Tag-Filter-Funktion zu zeigen. Vor Go-Live durch echte Beiträge ersetzen – am einfachsten über `/admin`.
- **Newsletter**: Das Formular (`components/newsletter.js`) öffnet aktuell nur den E-Mail-Client des Besuchers mit der eingegebenen Adresse im Text (`mailto:`, wie die anderen Formulare) – es gibt keine echte Anmeldung/Automatisierung. Für einen funktionierenden Newsletter braucht es einen echten Anbieter (z. B. Mailchimp, Buttondown) und eine entsprechende Formular-Anbindung – ein API-Key dafür gehört dann in eine Netlify-Umgebungsvariable, niemals in den Code (siehe `.env.example`).
- **DGS (Deutsche Gebärdensprache)**: Aktuell nur ein Platzhalter – `content/dgs.js` zeigt denselben Text wie Deutsch, ergänzt um einen Hinweis-Banner (`components/dgs-notice.js`), dass ein echtes Video folgt. Sobald echte DGS-Videos vorliegen, den Platzhalter durch ein `<iframe>` ersetzen (dafür muss die CSP in `netlify.toml` dann `frame-src` für den jeweiligen Video-Host ergänzen).
- Reihenfolge/Auswahl der genannten Punkte (Datenschutzerklärung, RSS-Feed, Newsletter-Anbieter, DGS-Videos) wird laut Absprache mit dem Websitebetreiber später nachgeholt.
