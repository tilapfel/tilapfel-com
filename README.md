# tilapfel.com

Statische Website für Til Apfel (Selbstständigkeit als Dozent, Berater und Aktivist für digitale Barrierefreiheit). Reines HTML/CSS/JavaScript über native ES-Module, kein Build-Schritt zum Deployen, keine Laufzeit-Abhängigkeiten. Prettier/ESLint sind reine Dev-Tools (siehe unten).

## Struktur

Inhalt, Struktur, Styling und Logik sind bewusst getrennt gehalten:

- `content/` – **Inhalt.** Ein Modul pro Sprache (`de.js`, `en.js`), jedes mit identischem Schema (Übersetzungen, Portfolio, Events, Library, …). Eine neue Sprache = eine neue Datei nach diesem Schema + Eintrag in `app/data.js`.
- `pages/` – **Struktur.** Ein Renderer pro Route/Bildschirm (`home.js`, `about.js`, `portfolio.js`, …) plus `header.js`, `footer.js`, `onboarding.js`. Jede Datei exportiert eine `render*()`-Funktion, die Komponenten + Inhalt zu einer Seite zusammensetzt.
- `components/` – **Wiederverwendbare Bausteine.** Karten, Pills, Modal-Grundgerüst, Icon-Root, Toggle-Buttons (Theme/Sprache/Leichte Sprache/Teilen), Suche. Jedes Muster existiert genau einmal und wird von mehreren Seiten aufgerufen.
- `styles/` – **Styling.** `base.css` (Reset, Farbvariablen, Typografie), `layout.css` (Seitengerüst, Header/Footer/Nav), `components.css` (alle wiederkehrenden UI-Muster).
- `app/` – **Kernlogik.** `main.js` (Einstiegspunkt), `state.js` (Zustand, Locale-Laden), `router.js` (Rendering-Engine, Event-Wiring), `data.js` (sprachunabhängige Daten wie Navigation, Bio-Links), `storage.js` (zentrale localStorage-Zugriffe), `utils.js`.
- `assets/` – Bilder
- `favicon.svg`

Jede Seite lädt nur die aktive Sprachdatei aus `content/` (dynamisches `import()`); weitere Sprachen werden erst bei Umschaltung nachgeladen.

## Lokal testen

Ganz einfach ein statisches Verzeichnis servieren, z.B.:

```bash
python3 -m http.server 8000
```

und dann `http://localhost:8000` öffnen. Wichtig: Der Server muss `type="module"`-Skripte korrekt ausliefern (Python `http.server` tut das automatisch).

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
- **Social-/Kontaktlinks:** YouTube/Instagram/Facebook/LinkedIn/GitHub-URLs sowie `stiftung.tilapfel.com` und `apps.tilapfel.com` (Bio-Seite) auf tatsächliche Ziele prüfen.
- Formulare (Kontakt, Kostenvoranschlag) öffnen beim Absenden den E-Mail-Client des Besuchers (`mailto:`) – es gibt bewusst kein Server-Backend.
