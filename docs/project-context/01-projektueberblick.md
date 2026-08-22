# MACONIT Website — Projektüberblick & Arbeitsweise

Stand: 22. August 2026. Teil 1 von 5 der Projektdokumentation (siehe auch:
`02-design-system.md`, `03-technische-lektionen.md`, `04-chronologie.md`,
`claude/05-verify-effects-script.md`).

## Die zwei Codebasen

Der Relaunch besteht aus **zwei parallelen, unabhängigen Codebasen**, die
optisch 1:1 synchron gehalten werden:

| | Static Site | Next.js/Payload |
|---|---|---|
| Repo | `github.com/MilkmanMedia/MACONIT-Relaunch` | `github.com/MilkmanMedia/MACONIT-Relaunch-Backend` |
| Stack | Reines Node.js/HTML/CSS/JS, kein Framework | Next.js 15 + Payload CMS 3.x |
| Render-Service | `maconit-relaunch` (Static Site) | `maconit-backend` (Web Service) |
| Live-URL | `maconit-relaunch.onrender.com` | `maconit-backend.onrender.com` |
| Render Service-ID | `srv-da28bregekts73c1rqkg` | `srv-da3d4im7bikc739nusl0` |
| Render Workspace-ID | `tea-da27nk8jo6nc73dejjg0` (für beide) | |
| Build-Befehl | `echo "static files already built"` — **baut NICHT wirklich**, `dist/` muss vorgebaut committet sein | `npm install && npm run build` |

Warum zwei Codebasen: Die Static Site ist die schnelle, sofort einsatzbereite
Variante; Next.js/Payload ist die Zielarchitektur mit CMS-Anbindung für die
redaktionelle Pflege. Bis das Payload-Backend vollständig ans Laufen kommt
(Admin-Oberfläche, echte Inhalte), werden beide parallel gepflegt und jede
visuelle/funktionale Änderung auf beiden nachgezogen.

## Arbeitsweise / Standing Instructions

- **Repository-Zugriff:** Jede Code-Lieferung erfolgt als ZIP-Datei,
  **immer mit englischer Commit-Message** (der Kunde übernimmt den Push
  selbst — kein direkter Repo-Zugriff aus der Session heraus). Ein direkter
  Push-Workflow (fein-scoped GitHub-PAT, Push auf Feature-Branch + Pull
  Request) wurde geprüft und mit einem echten Token getestet, scheiterte
  aber an einer Netzwerk-Sperre der Sandbox-Umgebung: Authentifizierte
  Anfragen an `github.com`/`api.github.com` werden dort grundsätzlich
  blockiert, unabhängig vom Token (anonyme Reads funktionieren dagegen
  problemlos). Details: `03-technische-lektionen.md`, Punkt 8, und
  `04-chronologie.md`. Verbleibende, ungeprüfte Alternativen für die
  Zukunft: ein offizieller GitHub-MCP-Connector (falls ein Org-Admin ihn im
  claude.ai-Connector-Verzeichnis hinzufügt) oder die separate „Claude Code
  GitHub Actions"-Integration (eigenes Setup außerhalb dieser Chat-Sitzung).
- Konversation auf Deutsch, Commit-Messages auf Englisch.
- Nach jeder Bestätigung „ist gepushed": frischer `git clone --depth 2`
  beider Repos + `diff -rq` gegen die lokale Arbeitskopie (erwartete,
  harmlose Next.js-Differenzen: `.env.example` existiert nur lokal,
  `package-lock.json` nur im Repo, da hier kein `npm install` möglich ist).
  Danach Render-Deploy-Status prüfen, bei Bedarf manuell auslösen
  (`trigger_deploy`), bis der Deploy „live" ist pollen.
- Visuelle Bugs wurden ausschließlich anhand vom Kunden bereitgestellter
  Screenshots diagnostiziert — nie proaktiv „vermutet" oder ungefragt
  behauptet, dass etwas visuell korrekt sei, ohne es tatsächlich geprüft
  zu haben.
- Static-Site-ZIPs müssen immer ein frisch gebautes `dist/` enthalten
  (Details: `03-technische-lektionen.md`, Abschnitt Render-Deployment).
- Projekt-Kontextdokumentation (diese fünf Dateien): Kein Dokument pro
  Einzelentscheidung. Stattdessen werden Entscheidungen laufend in
  `04-chronologie.md` protokolliert (neueste zuerst) und, falls relevant,
  zusätzlich in `02-design-system.md` bzw. `03-technische-lektionen.md`
  eingearbeitet. Da das Projekt „MACONIT Webseite" mit der Session
  verbunden ist, werden diese Dokumente direkt im Projekt gepflegt
  (`project_write`) — keine manuelle Upload-Lieferung nötig. Zugangsdaten
  (Tokens, Passwörter) werden grundsätzlich NIE in dieser Dokumentation
  gespeichert.
- Lokales Verifikations-Setup für die Static Site (Repo-Klon, Build,
  lokaler Server, Playwright-Regressionsskript mit aktuell 15 Checks):
  vollständiger Ablauf inkl. Skript-Inhalt in
  `claude/05-verify-effects-script.md`, damit er bei einem Wechsel in eine
  neue Chat-Session nicht neu geschrieben werden muss (das Skript selbst
  liegt nur als Sandbox-Tooling vor, nicht im Repo).

## Offene Punkte / mögliche nächste Schritte

- Next.js/Payload-Admin-Oberfläche: als nächstes Thema angekündigt.
- Redaktionelle Inhalte (echte Team-Fotos, Case-Study-Freigaben durch
  Kunden, Impressum/Datenschutz-Feinschliff) — Stand aus einer früheren
  Lieferung, nicht in der jüngsten Session behandelt, aktueller Status
  unbekannt.
- Eine echte visuelle Verifikation der Next.js-Seite (Browser-Erweiterung
  verbinden oder Screenshots vom Kunden) steht für alle bisherigen
  Next.js-Änderungen weiterhin aus — siehe `03-technische-lektionen.md`
  für den Hintergrund dieser Einschränkung.
- Falls weiterhin gewünscht: prüfen, ob ein offizieller GitHub-Connector im
  claude.ai-Connector-Verzeichnis ergänzt werden kann (Org-Admin-Aufgabe),
  als sauberer Ersatz für den gescheiterten PAT-Ansatz.
