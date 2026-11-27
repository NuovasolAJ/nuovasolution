// The Rundgang prototype: screenshots at the eight sections (desktop + phone), the stage's scene per section, and a reduced-motion run
import { chromium } from "playwright";
const [base = "http://localhost:3180", out = ".", locale = "es"] = process.argv.slice(2);
const browser = await chromium.launch();
const SECTIONS = [".hf", "#pain", ".flow", "#functions", "#strengths", "#report", "#model-3d", "#plans", "#start", "#faq", ".closing"];
for (const [label, w, h, reduce] of [["desktop", 1366, 768, false], ["phone", 390, 844, false], ["phone-stills", 390, 844, true]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: reduce ? "reduce" : "no-preference" });
  const page = await ctx.newPage();
  await page.goto(`${base}/${locale}/rundgang`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  const rows = [];
  for (const [i, sel] of SECTIONS.entries()) {
    await page.evaluate((sel) => { const e = document.querySelector(sel); if (e) window.scrollTo({ top: e.getBoundingClientRect().top + window.scrollY - 72, behavior: "instant" }); }, sel);
    await page.waitForTimeout(900);
    const st = await page.evaluate(() => { const s = document.querySelector("[data-tour-stage]"); const shown = [...document.querySelectorAll(".tour-scene")].filter((l) => l.style.visibility === "visible").map((l) => l.getAttribute("data-scene") + ":" + Number(l.style.opacity).toFixed(2)); return { scene: s?.getAttribute("data-stage-scene"), t: s?.getAttribute("data-stage-t"), mode: s?.getAttribute("data-stage-mode"), shown, loaded: [...document.querySelectorAll(".tour-img")].filter((i) => i.getAttribute("src")).length, y: Math.round(window.scrollY) }; });
    rows.push({ sel, ...st });
    if (!reduce || i < 3) await page.screenshot({ path: `${out}/rundgang-${label}-${String(i + 1).padStart(2, "0")}-${sel.replace(/[#.]/g, "")}.png` });
  }
  console.log(label, JSON.stringify(rows));
  await ctx.close();
}
await browser.close();
