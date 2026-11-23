// R-3 probe (the brief: every tap target ≥ 44 px): at 390 × 844 lists every visible a/button/input/select whose box is under 44 px in
// height or width, per page, plus the language switch and the demo replay explicitly. Usage: node touch-probe.mjs <base> <locale>
import { chromium } from "playwright";
const [base, locale = "es"] = process.argv.slice(2);
const pages = [`/${locale}`, `/${locale}/packages`, `/${locale}/contact?interes=trial&plan=essential`, `/${locale}/platform`, `/${locale}/faq`];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: locale === "es" ? "es-ES" : "en-GB" });
const page = await ctx.newPage();
const out = {};
for (const p of pages) {
  await page.goto(`${base}${p}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  if (p === `/${locale}`) { await page.locator("[data-hero-cta='task']").first().tap(); await page.waitForTimeout(1500); } // the demo's end state with its replay control
  const measure = () => page.evaluate(() => {
    const sel = "a[href], button, input, select, textarea, [role='button'], [role='tab']";
    const vis = (e) => { if (e.closest("[aria-hidden='true']") || e.getAttribute("tabindex") === "-1") return false; for (let n = e; n; n = n.parentElement) { const c = getComputedStyle(n); if (c.display === "none" || c.visibility === "hidden" || n.hasAttribute("hidden")) return false; } const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const all = [...document.querySelectorAll(sel)].filter(vis);
    const box = (e) => { const r = e.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height) }; };
    const small = all.filter((e) => { const b = box(e); return b.w < 44 || b.h < 44; }).map((e) => ({ tag: e.tagName, text: (e.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 40), ...box(e), cls: (e.className || "").toString().slice(0, 50) }));
    const lang = [...document.querySelectorAll("[data-language-switcher] a")].filter(vis).map(box);
    const replay = [...document.querySelectorAll("[data-demo-replay]")].filter(vis).map(box);
    return { targets: all.length, under44: small.length, small, lang, replay };
  });
  out[p] = await measure();
  if (p === `/${locale}`) { // the menu sheet at 390 holds the language switch: open it and measure its targets too
    await page.locator("header button[aria-label][aria-expanded]").first().tap(); await page.waitForTimeout(500);
    const sheet = await measure();
    out[`${p} (menu open)`] = { targets: sheet.targets, under44: sheet.under44, small: sheet.small, lang: sheet.lang };
    await page.keyboard.press("Escape"); await page.waitForTimeout(300);
  }
}
console.log(JSON.stringify({ locale, at: new Date().toISOString(), pages: out }, null, 1));
await browser.close();
