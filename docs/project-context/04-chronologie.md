# MACONIT Website — Chronologie der Änderungen

Stand: 22. August 2026. Teil 4 von 5 der Projektdokumentation (siehe auch:
`01-projektueberblick.md`, `02-design-system.md`, `03-technische-lektionen.md`,
`claude/05-verify-effects-script.md`).

Reihenfolge: neueste Änderung zuerst.

## PAT-Ansatz getestet und verworfen — Sandbox blockiert authentifizierten GitHub-Zugriff

Der Kunde hat einen fein-scoped GitHub Personal Access Token (Contents +
Pull requests, nur die zwei MACONIT-Repos) bereitgestellt. Test ergab: Die
Sandbox-Umgebung dieser Session lässt anonyme GitHub-Reads zu (funktioniert,
wie schon bisher für die Push-Verifikation genutzt), blockiert aber jede
authentifizierte Anfrage an `github.com`/`api.github.com` auf
Netzwerk-Proxy-Ebene — unabhängig vom Token selbst, der nie tatsächlich
gegen GitHub geprüft wurde. Details: `03-technische-lektionen.md`, Punkt 8.

Der Token wurde daraufhin sofort aus der Session-Umgebung entfernt
(`unset`) und nirgends gespeichert; es wurde bewusst **nicht** versucht,
die Netzwerksperre über andere Wege zu umgehen. Empfehlung an den Kunden:
den Token bei Nichtgebrauch auf GitHub widerrufen.

**Ergebnis:** Der in der vorherigen Entscheidung („GitHub-Repo-Zugriff über
Pull Requests statt ZIP-Lieferung") gewählte Weg (Option 3, PAT + Branch +
PR) ist in dieser Cowork-Sitzung technisch nicht umsetzbar. Es bleibt bei
der ZIP-Lieferung als Standard-Arbeitsweise (siehe `01-projektueberblick.md`).
Verbleibende, nicht abschließend geprüfte Alternativen für die Zukunft:

- Offizieller GitHub-MCP-Connector, falls ein Org-Admin ihn im
  claude.ai-Connector-Verzeichnis hinzufügt (läuft über OAuth, nicht über
  die hier blockierte direkte Netzwerkverbindung).
- Die dedizierte „Claude Code GitHub Actions"-Integration
  (`docs.anthropic.com/en/docs/claude-code/github-actions`) — ein separates
  Anthropic-Produkt/Setup (Claude Code als GitHub-Actions-Workflow), nicht
  Teil dieser Chat-Sitzung und nicht von hier aus einrichtbar.

## Entscheidung: GitHub-Repo-Zugriff über Pull Requests statt ZIP-Lieferung

Der bisherige Ablauf (ZIP liefern, Kunde lädt Dateien manuell ins Repo) wurde
als ineffizient empfunden. Geprüfte Optionen:

1. Offizieller GitHub-MCP-Connector über claude.ai — aktuell im
   Connector-Verzeichnis der Organisation nicht verfügbar (Registry-Suche
   nach „github"/„git" lieferte keine passenden Treffer).
2. Fein-scoped GitHub Personal Access Token, direkter Push auf `main`.
3. Fein-scoped PAT, Push auf Feature-Branch + Pull Request.
4. Beim bisherigen ZIP-Ablauf bleiben.

**Entscheidung: Option 3.** Push auf einen Feature-Branch plus Pull Request,
damit der bisherige Review-Checkpoint vor dem Merge erhalten bleibt, aber
das manuelle Herunterladen/Einspielen der ZIPs entfällt.

Rahmenbedingungen: Der Token wird fein-scoped nur für die zwei MACONIT-Repos
mit „Contents" + „Pull requests"-Schreibrecht erstellt, ausschließlich als
Laufzeit-Credential der jeweiligen Session verwendet und **nirgends
dauerhaft gespeichert** (insbesondere nicht in dieser Projektdokumentation)
— muss also in jeder neuen Chat-Session erneut vom Kunden bereitgestellt
werden. Nach einem Merge durch den Kunden bleibt der bisherige
Render-Deploy-Check (`list_deploys`/`trigger_deploy`) unverändert nötig.

**Status: Umsetzung getestet und an einer Sandbox-Einschränkung
gescheitert** — Details im Eintrag oberhalb. Es bleibt bei der
ZIP-Lieferung mit englischer Commit-Message.

## Playwright-Verifikationsskript in der Dokumentation gesichert

Das lokale Regressionsskript `verify_effects.js` existierte bisher nur als
Sandbox-Tooling der jeweiligen Session, nicht im Repo und nicht beim Kunden.
Vor einem Wechsel in einen neuen Chat wurde der vollständige Skript-Inhalt
inklusive Setup-Ablauf (Klonen, Bauen, lokaler Server, Skript-Ausführung)
als eigenes Dokument `claude/05-verify-effects-script.md` im Projekt
hinterlegt, damit es in einer neuen Session direkt wiederhergestellt werden
kann, statt erneut geschrieben werden zu müssen.

## Pflege der Projekt-Kontextdokumentation

Entscheidung: Statt für jede einzelne Entscheidung ein eigenes Dokument
anzulegen, werden Entscheidungen weiterhin in diesen (nun fünf)
thematischen Dokumenten festgehalten — neue Einträge hier in der
Chronologie (neueste zuerst), grundsätzliche Design-Entscheidungen
zusätzlich in `02-design-system.md`, wiederverwendbare technische
Erkenntnisse zusätzlich in `03-technische-lektionen.md`. Ein Dokument pro
Einzelentscheidung wurde bewusst verworfen, da es bei diesem Projektumfang
schnell zu vielen kleinen, stark überlappenden Dateien führen und die
Übersicht eher erschweren als verbessern würde.

Da das Projekt „MACONIT Webseite" jetzt mit der Session verbunden ist,
werden diese Dokumente ab sofort direkt im Projekt gepflegt (lesend und
schreibend) — eine manuelle Datei-Lieferung zum Hochladen ist dafür nicht
mehr nötig.

## Redirect-Seite bei `/`

Statt eines nackten „Redirecting…"-Texts (Static Site) bzw. eines
unsichtbaren Server-Redirects (Next.js `middleware.ts`, mittlerweile
entfernt) zeigt `/` jetzt ~1,15 Sekunden lang die Animation „Musterschnitt":
Das diagonale Hero-Muster zieht sich per CSS-Maske über die volle Breite
auf, das Logo blendet zentriert ein, ein roter Balken zählt die Wartezeit
unten mit. Danach automatischer Redirect zu `/de` (JS: `location.replace`/
`router.replace`, kein History-Eintrag; Meta-Refresh als No-JS-Fallback).
Vier Konzepte wurden vorab als Artifact zur Auswahl gepitcht („Minimal
Mark", „Musterschnitt", „Pulsierender Punkt", „Signatur-Unterstrich") —
„Musterschnitt" wurde ausgewählt.

- Static Site: `src/build.js` → `buildRootRedirect()`
- Next.js: `src/app/(frontend)/page.tsx` (neu) + `src/components/RootRedirectTimer.tsx`
  (neu) + `tailwind.config.ts` (neue Keyframes `redirectSweep`/
  `redirectLogoIn`/`redirectFill`); `src/middleware.ts` entfernt.

## Wandernder Nav-Unterstrich beim Hovern

Vorher hatte jeder Menüpunkt einen unabhängigen Hover-Unterstrich (kein
„Wandern" zwischen Menüpunkten). Jetzt existiert pro Navigation ein
einzelnes gemeinsames Unterstrich-Element, das beim Hovern zum jeweiligen
Link gleitet und beim Verlassen der Navigation zur aktiven Seite
zurückkehrt.

- Static Site: `.nav-indicator`-Element (per JS erzeugt in `app.js`),
  alte `::after`-Underlines + `navActiveGrow`-Keyframe entfernt.
- Next.js: bestehender „sliding indicator" in `Header.tsx` um
  `hoveredHref`-State erweitert (`onMouseEnter`/`onMouseLeave`); alte
  redundante `.nav-link::after`-Hover-Regel aus `globals.css` entfernt.

*(Anmerkung zur Entstehung: Der Kunde meldete zunächst, die „Animation, wo
der rote Unterstrich von einem Menüpunkt zum nächsten wandert" sei „nicht
mehr drin". Rückfrage ergab, dass tatsächlich ein neues Hover-Verhalten
gewünscht war, nicht ein Regressions-Fix eines vorher existierenden
Features — bei Bug-Reports zu Animationen im Zweifel präzise nachfragen,
welches konkrete Verhalten gemeint ist.)*

## Header wächst in Ruhe, schrumpft beim Scrollen

Nur Desktop, ab 861px/`md:`. Ruhezustand 92px Header-Höhe / 32px Logo /
14px Nav-Schrift, ab 24px Scroll-Offset sanfter Übergang (300ms) auf
76px/26px/13px. Mobile bleibt unverändert bei 76px/26px, da das
Off-Canvas-Menü sich an dieser Höhe ausrichtet.

## Hero-Muster auf allen Hero-Sections

Vorher nur auf der Startseite. Start des Musters von 40 % auf 20 % der
Breite vorgezogen. Fehlender Kicker/Strich auf „Über uns"/„Kontakt"
ergänzt (dort fehlte bisher der `eyebrow`-Wert komplett, dadurch wurde gar
kein Kicker-Element gerendert).

## Doppelte rote Linie unter fokussierter Textarea

Beide Codebasen betroffen — siehe `03-technische-lektionen.md`, Punkt 3.

## Fehlender oberer Rahmen über dem Next.js-Kontaktformular

Reines Next.js-Portierungsversehen, die Static Site hatte den Rahmen
bereits korrekt.

## Sub-Headlines „Leistungen im Detail"/„Vorgehen" nicht linksbündig

Beide Codebasen betroffen. Das Grid reservierte eine leere Kicker-Spalte,
selbst wenn kein Kicker vorhanden war — `--flush`-Modifier-Klassen
ergänzt, die bei fehlendem Kicker auf eine einspaltige Darstellung
umschalten.

## Weicher Verlauf statt hartem Schnitt am Hero-Muster

`mask-image`-basierter weicher Übergang statt hartem Rand, beide
Codebasen — explizit vom Kunden gewünscht.

## Next.js-Header-Navigation lag unter dem Header statt darin

Ursache: `position: static` → `position: relative`-Wechsel aktivierte
zuvor inaktive Offset-Klassen. Details: `03-technische-lektionen.md`,
Punkt 2.

## Portierung aller 9 Mikro-Animationen von Static Site nach Next.js

Siehe `02-design-system.md` für die Liste der neun Effekte.

## Fix des ursprünglichen Hero-Muster-Bugs auf der Static Site

Der allererste Bug dieser Session-Reihe. Details: `03-technische-lektionen.md`,
Punkt 1.
