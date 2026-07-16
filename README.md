# tilapfel.com

Statische Website für Til Apfel (Selbstständigkeit als Dozent, Berater und Aktivist für digitale Barrierefreiheit). Reines HTML/CSS/JavaScript, kein Build-Schritt, keine Abhängigkeiten.

## Struktur

- `index.html` – Seitengerüst
- `style.css` – Design (Farben, Layout, Komponenten; Hell-/Dunkelmodus über `[data-theme]`)
- `app.js` – Inhalte (Portfolio, Events, Übersetzungen DE/EN), Hash-Router, Rendering, Theme-/Sprachumschalter
- `assets/` – Bilder
- `favicon.svg`

## Lokal testen

Ganz einfach ein statisches Verzeichnis servieren, z.B.:

```bash
python3 -m http.server 8000
```

und dann `http://localhost:8000` öffnen.

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
