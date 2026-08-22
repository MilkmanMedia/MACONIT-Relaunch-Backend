# MACONIT Website — Design-System & Funktionsumfang

Stand: 22. August 2026. Teil 2 von 5 der Projektdokumentation (siehe auch:
`01-projektueberblick.md`, `03-technische-lektionen.md`, `04-chronologie.md`,
`claude/05-verify-effects-script.md`).

## Design-Tokens (gemeinsame Quelle der Wahrheit)

Ursprung: `static-site/src/style.css` (`:root`-Block). Next.js spiegelt
dieselben Werte in `tailwind.config.ts` als benannte Tailwind-Farben.

```
--color-primary:      #CC071E   (Tailwind: bg-primary / text-primary)
--color-primary-dark: #A30518   (Tailwind: bg-primary-dark)
--color-ink:           #14141A  (Tailwind: text-ink)
--color-grey:           #58585A (Tailwind: text-grey)
--color-grey-light:     #8F8F92 (Tailwind: text-grey-light)
--color-bg:             #FFFFFF
--color-bg-alt:         #FAFAF8 (Tailwind: bg-bg-alt)
--color-bg-deep:        #14141A (Tailwind: bg-bg-deep)
--color-border/line:    #E2E0DC (Tailwind: border-line — bewusst "line"
                                  genannt, um Konflikte mit Tailwinds
                                  eigenen border-*-Utilities zu vermeiden)
--radius:  2px (scharfe Ecken, kein rounded-lg-Look)
--container: 1320px max-width
--ease-out: cubic-bezier(0.16, 0.8, 0.32, 1)
Font: Inter, Gewichte 400–900
```

**Wichtige Inkonsistenz, bewusst so belassen:** Die Static Site nutzt
`var(--ease-out)` (die echte Bezier-Kurve) konsequent für alle
Übergänge/Animationen. Next.js nutzt dieselbe Bezier-Kurve nur bei
Keyframe-Animationen (fest in `tailwind.config.ts` hinterlegt, z. B.
`hero-rise`, `redirect-sweep`), verwendet aber bei einfachen
`transition-...`-Utilities die Standard-Tailwind-Klasse `ease-out`
(Tailwinds eigene Kurve `cubic-bezier(0,0,0.2,1)`, nicht identisch mit der
Marken-Kurve). Das ist ein kleiner, bereits vor der jüngsten Session
bestehender Unterschied zwischen den Codebasen und wurde nicht angefasst.

Grundprinzip der Optik: kantige, redaktionelle Agentur-Ästhetik
(Publicis-Sapient/Interone-Richtung) — dicke Inter-Typografie, feine
Haarlinien-Trenner, scharfe 2px-Ecken, flache Rot-Akzente, sehr
zurückhaltende Bewegung. **Kein** Glow/Gradient/Glassmorphism (das war eine
frühere, mittlerweile ersetzte Designrichtung — falls in älteren
Lieferungen/Dokumenten davon die Rede ist, ist das überholt).

## Funktionsumfang: die 9 Mikro-Animationen

Auf beiden Codebasen identisch implementiert:

1. Scroll-Fortschrittsbalken oben (rot, `scaleX` an Scroll-Position gekoppelt)
2. Kicker-Strich wächst beim Scroll-Reveal von links ein
3. Aktiver Nav-Link: gemeinsamer, wandernder roter Unterstrich, der beim
   Hovern zum jeweiligen Menüpunkt gleitet und danach zur aktiven Seite
   zurückkehrt (ein einzelnes gemeinsames Element pro Navigation, keine
   unabhängigen Underlines pro Link — Details zur Entwicklung dieses
   Features in `04-chronologie.md`)
4. Hover-Reveal-Pfeile bei Zeilenlisten (Leistungen, Insights)
5. Foto-Platzhalter-Schimmer (einmaliger Licht-Sweep beim Sichtbarwerden)
6. Formularfeld-Fokus-Unterstrich (wächst mittig beim Fokussieren)
7. Seiten-Fade-in beim Laden
8. Back-to-top-Button (erscheint nach Scroll über die Hero-Höhe)
9. Hero-Hintergrundmuster mit Scroll-Parallax (diagonales Linienmuster,
   auf allen Hero-Sections, nicht nur der Startseite; Muster beginnt bei
   20 % der Breite mit weichem Verlauf)

Alle neun Effekte werden auf der Static Site per Playwright-Regressionsskript
gegengeprüft — Setup und vollständiger Skript-Inhalt in
`claude/05-verify-effects-script.md`.

## Header-Verhalten (Desktop, ab 861px/`md:`)

Der Header ist im Ruhezustand etwas größer (92px Höhe, 32px Logo, 14px
Nav-Schrift) und schrumpft ab 24px Scroll-Offset sanft (300ms) auf eine
kompaktere Größe (76px/26px/13px). Mobile bleibt davon unberührt und
bleibt konstant bei 76px/26px, da sich das Off-Canvas-Menü an dieser Höhe
ausrichtet.

## Root-Redirect-Seite (`/` → `/de`)

Beide Codebasen zeigen bei `/` für ca. 1,15 Sekunden eine kurze animierte
Übergangsseite („Musterschnitt"), bevor automatisch zu `/de` weitergeleitet
wird: Das diagonale Hero-Muster zieht sich per CSS-Maske über die volle
Breite auf, das Logo blendet zentriert ein, ein roter Balken zählt die
Wartezeit unten mit. Funktioniert auch ohne JavaScript (Meta-Refresh als
Fallback). Vier Gestaltungskonzepte wurden vorab zur Auswahl gepitcht; der
Kunde hat sich für „Musterschnitt" entschieden.
