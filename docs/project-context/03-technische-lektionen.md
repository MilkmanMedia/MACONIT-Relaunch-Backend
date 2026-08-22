# MACONIT Website — Technische Lektionen

Stand: 22. August 2026. Teil 3 von 5 der Projektdokumentation (siehe auch:
`01-projektueberblick.md`, `02-design-system.md`, `04-chronologie.md`,
`claude/05-verify-effects-script.md`).

Diese Punkte wurden **durch echte, live aufgetretene Bugs** gelernt — nicht
theoretisch. Wer hier weiterarbeitet, sollte sie kennen, um dieselben
Fehler nicht zu wiederholen.

## 1. CSS-`animation` (fill-mode `both`) + JS-`transform` auf derselben Property = Bug

Eine einmalige CSS-Keyframe-Animation mit `both`-Fill-Mode „gewinnt" dauerhaft
gegenüber späteren JS-gesetzten Inline-`transform`-Werten auf derselben
Property — die Animation überschreibt JS für immer, auch lange nachdem sie
optisch fertig ist. **Betroffen war das Hero-Muster** (`.hero-pattern`):
Ursprünglich animierte das Keyframe `opacity` UND `transform`, während JS
per Scroll-Parallax ebenfalls `transform` setzte. Fix: Das Keyframe animiert
ausschließlich `opacity`; `transform` bleibt komplett JS-exklusiv, von Anfang
an. Bei jeder neuen Kombination aus CSS-Animation + JS-Steuerung: niemals
dieselbe Property in beiden gleichzeitig anfassen.

## 2. `position: static` ignoriert Offset-Properties, `position: relative` nicht

Ändert man `position` von `static` auf `relative`, werden zuvor „inaktive"
`top`/`right`/`bottom`/`left`/`inset`-Werte plötzlich wirksam. Das hat beim
Next.js-Header einen sichtbaren Bug verursacht: Die mobile-only Klassen
`top-[76px]`/`inset-x-0` (unter `static` bedeutungslos) griffen nach einem
`md:static` → `md:relative`-Wechsel (nötig für den wandernden Nav-Indikator)
plötzlich auch am Desktop und schoben die Navigation 76px nach unten. Fix:
`md:inset-auto` setzt die Offsets am Breakpoint wieder zurück.

## 3. Inline-Level-Formularfelder reservieren Platz für Unterlängen

`<input>`/`<select>`/`<textarea>` sind standardmäßig inline-level, Browser
reservieren dafür ein paar Pixel Platz für Unterlängen (Descender). Sitzt ein
absolut positioniertes Fokus-Unterstrich-Element bei `bottom: 0` im
umgebenden `position: relative`-Container (nicht am Feld selbst), entsteht
eine sichtbare Lücke zwischen Feldrand und Unterstrich — am deutlichsten bei
mehrzeiligen `<textarea>`-Feldern (wirkte wie ein doppelter roter Strich).
Fix: `display: block` auf allen Formularfeldern, in beiden Codebasen.

## 4. Tailwind-Cascade: responsive Utilities vs. Basis-Utilities

Tailwind gibt `md:`-präfixierte Utilities im kompilierten Stylesheet
zuverlässig NACH den Basis-Utilities aus — `md:X` überschreibt also `X` am
Breakpoint. **Das gilt aber NICHT**, wenn zwei `md:`-präfixierte Utilities
mit derselben Property gleichzeitig im `className` stehen (z. B.
`md:py-2.5` UND `md:py-[14px]` gleichzeitig) — dann entscheidet die
Ausgabereihenfolge im kompilierten CSS, nicht die Reihenfolge im
JSX-`className`-String, und das Ergebnis ist nicht verlässlich vorhersagbar.

**Regel:** Für zwei sich gegenseitig ausschließende Zustände derselben
Property immer eine Ternary verwenden, die genau EINEN vollständigen
Klassen-String erzeugt:

```
isX ? "md:py-2.5 md:text-[13px]" : "md:py-[14px] md:text-[14px]"
```

Nie „Basis + bedingtes Add-on" für zwei bereits konkrete Werte verwenden.

## 5. Render-Deployment-Eigenheiten

- Der Static-Site-Service baut **nicht wirklich** (`buildCommand` ist ein
  No-op-`echo "static files already built, nothing to do"`). `dist/` muss
  bei jeder Lieferung frisch gebaut UND committet sein — sonst bleibt die
  Live-Seite auf altem Stand, obwohl `src/` korrekt ist (ist während der
  jüngsten Session einmal tatsächlich passiert und musste nachträglich
  korrigiert werden).
- Render löst **`autoDeploy` nach einem Push praktisch nie zeitnah selbst
  aus** — nach jedem bestätigten Push: `list_deploys` prüfen, falls der
  aktuellste Deploy noch auf dem alten Commit steht, `trigger_deploy`
  manuell aufrufen. Static-Site-Deploys sind in ~10–15 Sekunden live,
  Next.js/Payload braucht ~2–2,5 Minuten.

## 6. Next.js kann in der Sandbox-Umgebung nicht gebaut/visuell geprüft werden

Kein Zugriff auf die npm-Registry → kein `npm install`/`npm run build`
lokal möglich. Next.js-Änderungen werden ausschließlich über
`prettier --parser=typescript` (Syntax-Check) und sorgfältiges Code-Review
verifiziert, nie visuell im Browser. Die Chrome-Erweiterung
(`mcp__claude-in-chrome__*`) hat sich in der bisherigen Session kein
einziges Mal verbinden lassen.

**Konsequenz:** Bei jeder Next.js-Änderung transparent kommunizieren, dass
nur Code-Review + erfolgreicher Render-Build als Bestätigung vorliegen,
keine echte visuelle Prüfung. Die Static Site dagegen ist lokal voll
baubar und wird über ein Playwright-Regressionsscript (`verify_effects.js`,
zuletzt 15 Checks) gegengeprüft — vollständiger Setup-Ablauf und
Skript-Inhalt in `claude/05-verify-effects-script.md` (das Skript selbst
liegt nicht im Repo, sondern nur als Sandbox-Tooling vor; beim Wechsel in
eine neue Chat-Session muss der lokale HTTP-Server außerdem bewusst als
Subshell gestartet werden — ein bloß mit `&` hintergrundgestellter Befehl
ist in dieser Sandbox mehrfach mit Exitcode 144 fehlgeschlagen bzw. der
Server lauschte nicht wirklich).

## 7. WebFetch sieht `<meta>`-Tags und `aria-hidden`-Elemente oft nicht

Das WebFetch-Tool konvertiert HTML zu Markdown, bevor ein Modell den Inhalt
sieht — dabei gehen `<meta>`-Tags und rein dekorative/`aria-hidden`-Elemente
oft verloren. Ein „nicht gefunden" von WebFetch ist bei solchen Elementen
**kein verlässlicher Beleg dafür, dass sie fehlen** — im Zweifel per direktem
Code-Review verifizieren statt der WebFetch-Antwort blind zu vertrauen.

## 8. Diese Sandbox erlaubt anonyme GitHub-Reads, blockiert aber jeden authentifizierten Zugriff

Getestet mit einem eigens erstellten, fein-scoped GitHub Personal Access
Token: Ein einfacher `git ls-remote`/`git clone` gegen `github.com` **ohne**
Zugangsdaten funktioniert anstandslos (das nutzen wir laufend für die
Push-Verifikation per `git clone --depth 2` + `diff -rq`). Sobald aber
irgendeine Authentifizierung an die Anfrage angehängt wird — egal ob als
`Authorization`-Header an `api.github.com` oder als Bearer-Token im
Git-HTTP-Remote — blockiert der Netzwerk-Proxy der Sandbox die Anfrage mit
`request blocked: no rule allows host "github.com"` bzw. HTTP 403. Das ist
**keine Frage des Token-Scopes** — der Token wurde nie tatsächlich gegen
GitHub geprüft, die Anfrage kam nie dort an.

Die konkrete Fehlermeldung von `api.github.com` referenzierte einen
`add_repo`-Mechanismus aus der GitHub-Actions-Integration von Claude Code
(`docs.anthropic.com/en/docs/claude-code/github-actions`) — das ist ein
anderes Anthropic-Produkt (Claude Code, als GitHub-Actions-Workflow
getriggert) mit eigener, dort sanktionierter GitHub-Anbindung, nicht
identisch mit dieser Cowork-Sitzung und hier nicht nutzbar.

**Konsequenz:** In dieser Umgebung ist direkter, token-basierter
Schreibzugriff auf GitHub aus der Session heraus nicht möglich, unabhängig
davon, wie sauber der Token gescoped ist. Es wurde deshalb **nicht**
versucht, das über andere Wege zu umgehen (anderer Host, SSH-Protokoll,
Proxy) — das wäre der Versuch, eine bewusst gesetzte Sicherheitsgrenze zu
umgehen. Details zur Entscheidung und den verbleibenden Optionen:
`04-chronologie.md`.
