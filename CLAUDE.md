# MACONIT Website — Projektkontext

Dieses Repo ist Teil eines Relaunch-Projekts mit **zwei parallelen Codebasen**
(Static Site + Next.js/Payload), die optisch synchron gehalten werden. Die
vollständige Vorgeschichte, alle Design-Entscheidungen, gelernten technischen
Lektionen und die Chronologie aller Änderungen stehen in den importierten
Dokumenten unten — bei jeder neuen Session vollständig geladen.

**Vor Beginn jeder Aufgabe:** die importierten Dokumente berücksichtigen,
insbesondere `03-technische-lektionen.md` (u. a. bekannte Bugs/Fallstricke,
Render-Deployment-Eigenheiten, Sandbox-/Netzwerk-Einschränkungen früherer
Sessions) und `04-chronologie.md` (bereits getroffene Entscheidungen, damit
nichts doppelt diskutiert oder rückgängig gemacht wird).

## Projektüberblick, Arbeitsweise, offene Punkte
@docs/project-context/01-projektueberblick.md

## Design-System & Funktionsumfang (9 Mikro-Animationen, Design-Tokens)
@docs/project-context/02-design-system.md

## Technische Lektionen (echte, bereits behobene Bugs — nicht wiederholen)
@docs/project-context/03-technische-lektionen.md

## Chronologie der Änderungen (neueste zuerst)
@docs/project-context/04-chronologie.md

## Lokales Playwright-Verifikationsscript für die Static Site
@docs/project-context/05-verify-effects-script.md

## Repository-Zugriff — aktueller Stand (wichtig!)

Der offizielle GitHub-MCP-Connector (Read & write) ist für den claude.ai-Account
dieses Projekts nicht einlösbar (getestet, siehe `04-chronologie.md`). Statt
über claude.ai-Connectors oder `/install-github-app` (in der VS-Code-Extension
nicht verfügbar) läuft der Repository-Zugriff jetzt über **Claude Code lokal**:
normaler `git`-Workflow mit der bereits auf diesem Rechner eingerichteten
Git-Authentifizierung (bestätigt funktionierend). Branch + Pull Request statt
ZIP-Lieferung ist damit der Standardweg, sobald du in diesem Repo arbeitest.

## Konventionen

- Konversation mit dem Kunden auf Deutsch, Commit-Messages auf Englisch.
- Visuelle Bugs nur anhand tatsächlich bereitgestellter Screenshots
  diagnostizieren, nie ungeprüft behaupten, etwas sei visuell korrekt.
- Static-Site-Änderungen: lokal per Playwright-Skript gegenprüfen
  (Setup in `05-verify-effects-script.md`).
- Next.js-Änderungen: keine echte visuelle Prüfung möglich (siehe
  `03-technische-lektionen.md`, Punkt 6) — transparent kommunizieren, dass nur
  Code-Review + erfolgreicher Build als Bestätigung vorliegen.

## Pflege der Chronologie (wichtig, kein Automatismus)

Nach jeder inhaltlichen Entscheidung — Design-Entscheidung, Architektur-
Entscheidung, Bugfix mit Lerneffekt, technischer Workaround, gescheiterter
Ansatz — sofort einen neuen Eintrag **oben** in
`docs/project-context/04-chronologie.md` ergänzen (neueste zuerst), nicht
erst am Ende der Session. Falls die Entscheidung grundsätzlicher Natur ist,
zusätzlich in `02-design-system.md` bzw. `03-technische-lektionen.md`
einarbeiten, je nachdem ob es sich um eine Design- oder eine wiederverwendbare
technische Erkenntnis handelt.

Diese Pflege ist keine Hintergrundaufgabe, die von selbst passiert — sie
muss bei jeder relevanten Änderung aktiv ausgeführt werden.

## Hinweis bei neuen Kontext-Dateien (gut sichtbar melden, kein Nebensatz)

Sobald eine neue Datei unter `docs/project-context/` angelegt wird (zusätzlich
zu den fünf bestehenden), muss das **auffällig gemeldet** werden — nicht
beiläufig im Fließtext, sondern als eigener, klar abgesetzter Block am Ende
der Antwort, z. B. so:

> ⚠️ **NEUE KONTEXT-DATEI ERSTELLT:** `docs/project-context/<dateiname>.md`
> Noch zu erledigen:
> 1. `@docs/project-context/<dateiname>.md`-Import in dieser CLAUDE.md ergänzen (kann direkt selbst gemacht werden).
> 2. GitHub-Link zur neuen Datei zusätzlich in den „Custom Instructions" des claude.ai-Projekts ergänzen — das kann nur der Nutzer selbst in der claude.ai-Oberfläche machen.

Punkt 1 selbstständig erledigen. Punkt 2 **nicht** als bereits erledigt
ausgeben — das ist außerhalb der Reichweite von Claude Code.
