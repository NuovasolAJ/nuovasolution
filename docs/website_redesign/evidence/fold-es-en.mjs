// First-screen headroom, unfocused, ES and EN, twice per viewport: WITH the preview furniture (the environment ribbon [data-env] and the
// preview switches [data-preview-switches], both measured and written into the row) and WITHOUT it (both strips removed from the DOM,
// which is what a released build shows). Headroom = viewport height − element bottom; negative = below the fold.
// Also: scrollHeight vs clientHeight for the scene's containers, so a pinned container that clips its text would show up here.
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3180";
const browser = await chromium.launch();
const rows = [];
const measure = (page, h) => page.evaluate((h) => {
  const bottom = (sel) => { const e = document.querySelector(sel); return e ? Math.round(e.getBoundingClientRect().bottom) : null; };
  const height = (sel) => { const e = document.querySelector(sel); return e ? Math.round(e.getBoundingClientRect().height) : 0; };
  const over = (sel) => { const e = document.querySelector(sel); return e ? `${e.scrollHeight}/${e.clientHeight}` : null; };
  return {
    ribbonPx: height("[data-env]"), switchesPx: height("[data-preview-switches]"),
    taskHeadroom: h - bottom("[data-hero-scene-task]"), mainHeadroom: h - bottom("[data-hero-cta='task']"),
    overflow: { scene: over(".hf-scene"), msg: over(".hf-scene-msg"), text: over(".hf-scene-text"), translation: over(".hf-scene-translation"), task: over("[data-hero-scene-task]"), h1: over("#hero-h1"), lead: over(".hf-lead") },
  };
}, h);
for (const [w, h] of [[360, 640], [375, 667], [390, 844], [414, 896], [1280, 720], [1366, 768], [1440, 900]]) {
  for (const locale of ["es", "en"]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await page.goto(`${base}/${locale}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(3200);
    const withF = await measure(page, h);
    await page.evaluate(() => { document.querySelectorAll("[data-env], [data-env-marker], [data-preview-switches]").forEach((e) => e.remove()); window.scrollTo(0, 0); });
    await page.waitForTimeout(400);
    const without = await measure(page, h);
    rows.push({ viewport: `${w}x${h}`, locale, furniturePx: withF.ribbonPx + withF.switchesPx, with_task: withF.taskHeadroom, with_main: withF.mainHeadroom, without_task: without.taskHeadroom, without_main: without.mainHeadroom, overflow: withF.overflow });
    await ctx.close();
  }
}
await browser.close();
console.table(rows.map(({ overflow, ...r }) => r));
console.log(JSON.stringify(rows));
