// R-8 probe: real Tab presses at 390 × 844 — which elements actually receive focus, in order, and how many presses until the
// trial action. Also lists zero-size focusables and whether a display:none ANCESTOR (not the element's own computed display) hides them.
// Usage: node tab-probe.mjs <base-url> [path]
import { chromium } from "playwright";
const [base, path = "/es"] = process.argv.slice(2);
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: "es-ES" });
const page = await ctx.newPage();
await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

const audit = await page.evaluate(() => {
  const sel = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const all = [...document.querySelectorAll(sel)];
  const hiddenByAncestor = (e) => { for (let n = e; n; n = n.parentElement) { const c = getComputedStyle(n); if (c.display === "none" || c.visibility === "hidden") return true; if (n.hasAttribute("hidden")) return true; } return false; };
  const zero = all.filter((e) => { const r = e.getBoundingClientRect(); return r.width === 0 || r.height === 0; });
  return {
    focusables: all.length,
    zeroSize: zero.length,
    zeroHiddenByAncestor: zero.filter(hiddenByAncestor).length,
    zeroReallyTabbable: zero.filter((e) => !hiddenByAncestor(e)).map((e) => ({ tag: e.tagName, text: (e.textContent || "").trim().slice(0, 40), cls: (e.className || "").toString().slice(0, 60) })),
  };
});

const stops = [];
let found = -1;
for (let i = 1; i <= 60; i++) {
  await page.keyboard.press("Tab");
  const s = await page.evaluate(() => {
    const e = document.activeElement; if (!e || e === document.body) return null;
    const r = e.getBoundingClientRect();
    return { tag: e.tagName, text: (e.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 40), w: Math.round(r.width), h: Math.round(r.height), hero: e.getAttribute("data-hero-cta"), pilot: e.getAttribute("data-pilot-cta") };
  });
  stops.push(s);
  if (s && (s.hero === "trial" || s.pilot === "hero") && found < 0) found = i;
  if (found > 0) break;
}
console.log(JSON.stringify({ path, audit, pressesToTrialCta: found, zeroSizeStopsHit: stops.filter((s) => s && (s.w === 0 || s.h === 0)).length, stops }, null, 1));
await browser.close();
