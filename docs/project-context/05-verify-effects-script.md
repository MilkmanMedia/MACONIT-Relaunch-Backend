# MACONIT Website — Lokales Verifikations-Setup (Playwright)

Stand: 22. August 2026. Teil 5 von 5 der Projektdokumentation (siehe auch:
`01-projektueberblick.md`, `02-design-system.md`, `03-technische-lektionen.md`,
`04-chronologie.md`).

## Warum dieses Dokument existiert

Für die Static Site wird jede visuelle/funktionale Änderung lokal per
Playwright gegengeprüft (siehe `03-technische-lektionen.md`, Punkt 6).
Das Skript `verify_effects.js` ist reines Sandbox-Tooling: Es liegt nicht
im Repo und wurde dem Kunden nie als Datei geliefert, sondern existiert
nur in der jeweiligen Session-Umgebung. Damit es beim Wechsel in einen
neuen Chat nicht komplett neu geschrieben werden muss, ist der vollständige
Skript-Inhalt hier hinterlegt — einfach als `verify_effects.js` im
Arbeitsverzeichnis speichern und ausführen.

## Setup-Ablauf in einer neuen Session

1. Static-Site-Repo klonen: `git clone --depth 1 https://github.com/MilkmanMedia/MACONIT-Relaunch.git static-site`
2. Bauen: `cd static-site && node src/build.js` (erzeugt `dist/` — der
   Render-Build-Befehl selbst baut nicht wirklich, siehe
   `03-technische-lektionen.md`, Punkt 5)
3. Lokalen Server starten (bewusst als Subshell, siehe
   `03-technische-lektionen.md`, Punkt 6, für den Hintergrund dieser
   Notlösung): `(cd dist && nohup python3 -m http.server 8811 > /tmp/http8811.log 2>&1 &)`
4. Playwright ist in der Sandbox-Umgebung vorinstalliert (Chromium unter
   `/opt/pw-browsers`, `PLAYWRIGHT_BROWSERS_PATH` bereits gesetzt) — kein
   `playwright install` nötig. Falls das `playwright`-npm-Paket selbst
   fehlt: `npm install playwright` im Arbeitsverzeichnis.
5. Skript unten als `verify_effects.js` speichern, dann: `node verify_effects.js`
6. Erwartete Ausgabe bei unverändertem Verhalten: `ALL CHECKS PASSED`
   (aktuell 15 Checks).

## Skript-Inhalt

```javascript
const { chromium } = require("playwright");
const path = require("path");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const outDir = "/home/claude/maconit-project/screenshots";
  require("fs").mkdirSync(outDir, { recursive: true });

  const results = [];
  const check = (label, ok, detail) => {
    results.push({ label, ok, detail });
    console.log((ok ? "PASS" : "FAIL") + " - " + label + (detail ? " (" + detail + ")" : ""));
  };

  await page.goto("http://localhost:8811/de/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1800); // let the hero entrance + pattern-fade animations finish

  // Hero pattern present + faded in
  const heroPatternOpacity = await page.evaluate(() => {
    const el = document.querySelector(".hero-split .hero-pattern");
    return el ? getComputedStyle(el).opacity : null;
  });
  check("hero pattern present + opacity settled to 1", heroPatternOpacity === "1", "opacity=" + heroPatternOpacity);

  await page.screenshot({ path: path.join(outDir, "effect-hero-top.png"), clip: { x: 0, y: 0, width: 1440, height: 700 } });

  // Scroll progress bar at top should be scaleX(0)
  const progressAtTop = await page.evaluate(() => {
    const el = document.getElementById("scroll-progress");
    return el ? getComputedStyle(el).transform : null;
  });
  console.log("progress bar transform at top:", progressAtTop);

  // Scroll down halfway and check progress bar + back-to-top + hero pattern parallax
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5));
  await page.waitForTimeout(600);
  const progressMid = await page.evaluate(() => {
    const el = document.getElementById("scroll-progress");
    return el ? getComputedStyle(el).transform : null;
  });
  check("progress bar scaled after scrolling", progressAtTop !== progressMid, progressAtTop + " -> " + progressMid);

  const backToTopVisible = await page.evaluate(() => document.getElementById("back-to-top").classList.contains("visible"));
  check("back-to-top visible after scrolling past hero", backToTopVisible);

  const heroPatternTransform = await page.evaluate(() => {
    const el = document.querySelector(".hero-split .hero-pattern");
    return el ? getComputedStyle(el).transform : null;
  });
  // matrix(a, b, c, d, tx, ty) — parallax only ever sets translateY, so tx (5th
  // value) must stay 0 and ty (6th value) must be a positive, non-zero offset.
  const parallaxOk = (() => {
    if (!heroPatternTransform || heroPatternTransform === "none") return false;
    const m = heroPatternTransform.match(/matrix\(([^)]+)\)/);
    if (!m) return false;
    const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
    const [, , , , tx, ty] = parts;
    return tx === 0 && ty > 0;
  })();
  check("hero pattern transform reflects JS scroll parallax (translateY > 0)", parallaxOk, heroPatternTransform);

  await page.screenshot({ path: path.join(outDir, "effect-scrolled-midpage.png"), clip: { x: 1200, y: 0, width: 240, height: 900 } });

  // Scroll to top, test back-to-top click scrolls smoothly
  await page.evaluate(() => document.getElementById("back-to-top").click());
  await page.waitForTimeout(1200);
  const scrollYAfterClick = await page.evaluate(() => window.scrollY);
  check("back-to-top click scrolls to top", scrollYAfterClick < 50, "scrollY=" + scrollYAfterClick);

  // Kicker grow-in: check a section-head kicker's ::before transform after reveal
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(700);
  const kickerScale = await page.evaluate(() => {
    const kicker = document.querySelector('[data-reveal].is-visible .kicker');
    if (!kicker) return null;
    return getComputedStyle(kicker, "::before").transform;
  });
  check("revealed kicker dash present (transform read)", !!kickerScale, kickerScale);

  // Service-row arrow hover-reveal
  await page.mouse.move(5, 5);
  const firstServiceRow = await page.$(".service-row");
  if (firstServiceRow) {
    const beforeHover = await firstServiceRow.$eval(".row-arrow", (el) => getComputedStyle(el).opacity);
    await firstServiceRow.hover();
    await page.waitForTimeout(350);
    const afterHover = await firstServiceRow.$eval(".row-arrow", (el) => getComputedStyle(el).opacity);
    check("service-row arrow hidden by default, shown on hover", beforeHover === "0" && afterHover === "1", beforeHover + " -> " + afterHover);
    await page.screenshot({ path: path.join(outDir, "effect-service-row-hover.png"), clip: { x: 0, y: 0, width: 1320, height: 500 } });
  } else {
    check("service-row found", false);
  }

  // Team photo shimmer trigger + form-field focus underline on contact page
  await page.goto("http://localhost:8811/de/kontakt.html", { waitUntil: "networkidle" });
  const firstField = await page.$(".form-field");
  if (firstField) {
    const beforeFocus = await firstField.evaluate((el) => getComputedStyle(el, "::after").transform);
    await firstField.$eval("input, select, textarea", (el) => el.focus());
    await page.waitForTimeout(350);
    const afterFocus = await firstField.evaluate((el) => getComputedStyle(el, "::after").transform);
    check("form field focus underline animates in", beforeFocus !== afterFocus, beforeFocus + " -> " + afterFocus);
  } else {
    check("form field found", false);
  }

  // Team photo shimmer on about page
  await page.goto("http://localhost:8811/de/ueber-uns.html", { waitUntil: "networkidle" });
  await page.evaluate(() => document.querySelector(".team-grid")?.scrollIntoView({ block: "center" }));
  const revealed = await page.waitForFunction(() => {
    const section = document.querySelector(".team-grid")?.closest("[data-reveal]");
    return section && section.classList.contains("is-visible");
  }, { timeout: 4000 }).then(() => true).catch(() => false);
  await page.waitForTimeout(200);
  const shimmerAnim = await page.evaluate(() => {
    const photo = document.querySelector(".team-photo");
    return photo ? getComputedStyle(photo, "::after").animationName : null;
  });
  check("team-grid section revealed (is-visible set)", revealed);
  check("team-photo shimmer animation name applied", shimmerAnim === "shimmerSweep", "animationName=" + shimmerAnim);
  await page.screenshot({ path: path.join(outDir, "effect-team-grid.png"), clip: { x: 0, y: 0, width: 1320, height: 500 } });

  // Insight-row arrow hover-reveal
  await page.goto("http://localhost:8811/de/insights.html", { waitUntil: "networkidle" });
  await page.mouse.move(5, 5);
  await page.waitForTimeout(400);
  const firstInsightRow = await page.$(".insight-row");
  if (firstInsightRow) {
    const beforeHover = await firstInsightRow.$eval(".row-arrow", (el) => getComputedStyle(el).opacity);
    await firstInsightRow.hover();
    await page.waitForTimeout(350);
    const afterHover = await firstInsightRow.$eval(".row-arrow", (el) => getComputedStyle(el).opacity);
    check("insight-row arrow hidden by default, shown on hover", beforeHover === "0" && afterHover === "1", beforeHover + " -> " + afterHover);
  } else {
    check("insight-row found", false);
  }

  // Shared nav indicator: sits under the active link at rest, slides to
  // whichever link is hovered, and slides back on mouseleave. (Home page has
  // no nav entry of its own — aria-current is never set there — so this
  // uses a subpage that's actually in the nav.)
  await page.goto("http://localhost:8811/de/ueber-uns.html", { waitUntil: "networkidle" });
  await page.mouse.move(5, 5);
  await page.waitForTimeout(400);
  const atRest = await page.evaluate(() => {
    const active = document.querySelector('.main-nav a[aria-current="page"]');
    const ind = document.querySelector(".nav-indicator");
    return { activeLeft: active ? active.offsetLeft : null, indicatorLeft: ind ? parseFloat(ind.style.left) : null, visible: ind ? ind.classList.contains("is-visible") : false };
  });
  check("nav indicator sits under the active link at rest", atRest.visible && Math.abs(atRest.indicatorLeft - (atRest.activeLeft + 16)) < 1, JSON.stringify(atRest));

  const referencesLink = await page.$('.main-nav a[href*="referenzen"]');
  let hoveredLeft = null;
  if (referencesLink) {
    await referencesLink.hover();
    await page.waitForTimeout(350);
    hoveredLeft = await page.evaluate(() => parseFloat(document.querySelector(".nav-indicator").style.left));
  }
  check("nav indicator slides to the hovered link", hoveredLeft !== null && Math.abs(hoveredLeft - atRest.indicatorLeft) > 5, "from " + atRest.indicatorLeft + " to " + hoveredLeft);

  await page.mouse.move(5, 5);
  await page.waitForTimeout(350);
  const backAtRest = await page.evaluate(() => parseFloat(document.querySelector(".nav-indicator").style.left));
  check("nav indicator slides back to the active link on mouseleave", Math.abs(backAtRest - atRest.indicatorLeft) < 1, "backAtRest=" + backAtRest);

  const failed = results.filter((r) => !r.ok);
  console.log("\n" + (failed.length === 0 ? "ALL CHECKS PASSED" : failed.length + " CHECK(S) FAILED"));

  await browser.close();
})();
```
