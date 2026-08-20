# MACONIT Website Relaunch — Next.js + Payload CMS

Quellcode für die technische Umsetzung von www.maconit.de gemäß
`MACONIT_Relaunch_Konzept.docx` (Kapitel 6, technisches Konzept) und
`MACONIT_Website_Content_DE_EN.docx` (Copy-Grundlage für alle Seiten).

## ⚠️ Wichtiger Hinweis zu diesem Code

Dieser Code wurde in einer Sandbox-Umgebung **ohne Zugriff auf npm-, PyPI-
oder CDN-Registries** geschrieben. Das bedeutet konkret:

- `npm install` wurde **nicht** ausgeführt.
- Der Dev-Server (`next dev`) wurde **nicht** gestartet.
- TypeScript wurde **nicht** gegen die echten `payload`-/`next`-Typen geprüft.
- Es gab **keinen** Build- oder Testlauf.

Der Code folgt bewusst eng den offiziellen, dokumentierten Integrationsmustern
von Payload CMS 3 (App-Router-Embedded-Pattern) und Next.js 15 (App Router,
Server Components, `generateStaticParams`), ist vollständig und in sich
konsistent geschrieben — muss aber von eurem Team vor dem produktiven Einsatz
verifiziert werden: `npm install`, `npm run dev`, ggf. kleinere Anpassungen an
Payload-/Next-Versionsständen, die sich seit Erstellung dieses Codes geändert
haben.

**Parallel dazu liegt im Ordner `../static-site/dist/` eine vollständig
getestete, sofort einsatzbereite statische HTML/CSS/JS-Version der Website**
(mit Playwright-Screenshots und Interaktionstests verifiziert) — diese kann
sofort als Vorschau/Fallback genutzt werden, während dieser Next.js/Payload-
Code verifiziert wird.

## Setup

```bash
npm install
cp .env.example .env
# .env ausfüllen: DATABASE_URI, PAYLOAD_SECRET, NEXT_PUBLIC_SERVER_URL
npm run dev
```

Beim ersten Start legt Payload automatisch die Datenbanktabellen an. Danach
unter `http://localhost:3000/admin` einen ersten Admin-User anlegen.

### Beispieldaten einspielen

```bash
npm run seed
```

Spielt die 13 echten Referenzkunden aus dem Company Profile (SwissLife,
MSG, FJA USA, Porsche, Lufthansa, Media Saturn, Philip Morris Schweiz,
MULTIPOND, Europ Assistance, Hemden.de, Bonifatiuswerk, Bayerische
Landesärztekammer, LexLynk) sowie 7 Platzhalter-Teammitglieder ein.

**Wichtig:** Case Studies werden absichtlich mit `approvedForPublishing:
false` angelegt. Vor Veröffentlichung jede Referenz im Payload-Admin unter
„Case Studies" öffnen und erst nach Freigabe durch Kunde bzw. Partneragentur
aktivieren (siehe Konzept Kapitel 4.5).

### Typen generieren

Sobald `npm install` gelaufen ist:

```bash
npm run generate:types
```

Erzeugt `payload-types.ts` mit exakten Typen für alle Collections/Globals.
`src/lib/types.ts` enthält bis dahin handgeschriebene Platzhalter-Typen mit
identischer Struktur — nach dem ersten `generate:types` können Imports bei
Bedarf auf `../../payload-types` umgestellt werden.

## Lokale Entwicklung ohne Postgres

Für einen schnellen lokalen Test ohne Postgres-Server kann
`@payloadcms/db-postgres` gegen `@payloadcms/db-sqlite` getauscht werden:

```bash
npm install @payloadcms/db-sqlite
```

In `payload.config.ts`:

```ts
import { sqliteAdapter } from "@payloadcms/db-sqlite";
// ...
db: sqliteAdapter({ client: { url: "file:./maconit.db" } }),
```

Für Produktion empfiehlt das Konzept (Kapitel 6.3) einen verwalteten
Postgres-Dienst (z. B. Neon, Supabase oder Vercel Postgres).

## Design

Zweite Design-Iteration (moderner, mit dezenten Bewegungseffekten, weiterhin
seriös für ein Enterprise-IT-Beratungsumfeld) — 1:1 an `static-site/` angelehnt:
langsam rotierender Gradient-Blob im Hero, Cursor-Glow (nur Desktop/Maus),
Scroll-Reveal (`src/components/Reveal.tsx`), Header, der beim Scrollen
schrumpft, Karten mit Hover-Lift/Glow, Button-Shine-Sweep, animiertes
CTA-Gradient, unendlich laufendes Referenz-Marquee, hochzählende Kennzahlen
in der Trust-Bar. Alle Effekte respektieren `prefers-reduced-motion` (siehe
`globals.css`). Design-Tokens in `tailwind.config.ts` sind mit
`static-site/src/style.css` synchron zu halten, falls eines der beiden
Systeme weiter angepasst wird.

## Architektur

- **Next.js 15 App Router**, embedded Payload CMS 3 (ein Repo, ein Deploy).
- `src/app/(frontend)/[lang]/…` — öffentliche, zweisprachige Website
  (DE/EN via `[lang]`-Segment; `middleware.ts` leitet `/` → `/de` um).
- `src/app/(payload)/admin` und `src/app/(payload)/api` — Payload-Adminpanel
  und REST-API, Standard-Boilerplate gemäß offizieller Payload-Doku.
- **Local API** (`src/lib/payload.ts`, `src/lib/queries.ts`) statt HTTP-
  Roundtrip — Server Components rufen Payload direkt auf.
- **Statische Marketing-Copy** (Hero-Texte, Leistungsbeschreibungen, FAQs)
  liegt in `src/content/dictionaries.ts` — bewusst nicht im CMS, da selten
  geändert und kein Redaktionsbedarf besteht (1:1 aus
  `MACONIT_Website_Content_DE_EN.docx` übernommen).
- **Dynamische, redaktionell gepflegte Inhalte** (Case Studies, Team,
  Insights-Beiträge, Testimonials) liegen in Payload-Collections
  (`src/collections/`), im Adminpanel unter `/admin` pflegbar.

### Seitenstruktur

| Route | Inhalt |
|---|---|
| `/[lang]` | Startseite |
| `/[lang]/services`, `/[lang]/services/[slug]` | Leistungsübersicht + 3 Detailseiten |
| `/[lang]/references` | Referenzen (aus Payload, nur freigegebene) |
| `/[lang]/about` | Über uns / Team (aus Payload) |
| `/[lang]/insights`, `/[lang]/insights/[slug]` | Insights-Liste + Detail (aus Payload) |
| `/[lang]/contact` | Kontakt (Vorschau-Formular, noch nicht an Backend/E-Mail angebunden) |
| `/[lang]/legal-notice`, `/[lang]/privacy` | Impressum / Datenschutz (Platzhaltertexte, juristisch zu prüfen) |

Die Karriere-Seite ist wie vereinbart **nicht** Teil dieses Umfangs (Phase 2).

## Bekannte Lücken / offene Punkte

- **Kontaktformular** ist UI-only (`src/components/ContactForm.tsx`) und
  noch nicht an ein Backend angebunden — z. B. über eine Payload-
  Formular-Collection oder einen externen E-Mail-Dienst (SendGrid, Resend
  o. Ä.) ergänzen.
- **Impressum/Datenschutz** enthalten Platzhaltertexte — vor Go-live
  juristisch prüfen und mit den finalen Hosting-/Tracking-Entscheidungen
  abgleichen (siehe `dictionaries.ts` → `legal`).
- **Team-Fotos und echte Case-Study-Ergebnisse/Kennzahlen** fehlen noch —
  Platzhalter im Seed-Skript und im Payload-Admin ergänzen.
- **Eras ITC-Schrift**: Das Original-Logo nutzt Eras Bold/Demi ITC
  (kommerzielle Monotype-Schrift). Aktuell wird `system-ui` als
  lizenzfreier Fallback verwendet (`tailwind.config.ts`). Optionen: (a)
  Eras-ITC-Weblizenz erwerben, (b) bei einer geometrischen Sans wie
  „Century Gothic"/„Poppins" bleiben, die dem Look nahekommt. Logo selbst
  bleibt in jedem Fall als Bild-Asset fix (`public/maconit-logo.png`).
- **Medien-Storage für Produktion**: `next.config.mjs` → `images.
  remotePatterns` ist leer; sobald ein Storage-Backend (Vercel Blob, S3 o. Ä.)
  feststeht, dort ergänzen.

## Deployment

Gemäß Konzept Kapitel 6.3: Vercel (native Next.js-Unterstützung) + verwalteter
Postgres-Dienst. Umgebungsvariablen aus `.env.example` im Vercel-Projekt
hinterlegen; `NEXT_PUBLIC_SERVER_URL` auf die produktive Domain setzen.
