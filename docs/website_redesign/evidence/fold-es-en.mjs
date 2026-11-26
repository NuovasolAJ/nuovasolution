// First-screen headroom, unfocused, ES and EN: how many px of the viewport remain under the task card and under the main action (negative = below the fold)
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3180";
const browser = await chromium.launch();
const rows = [];
for (const [w, h] of [[375, 667], [390, 844], [1280, 720], [1366, 768], [1440, 900]]) {
  for (const locale of ["es", "en"]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage();
    await page.goto(`${base}/${locale}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(3200);
    const r = await page.evaluate(() => {
      const b = (sel) => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); return Math.round(r.bottom); };
      return { taskBottom: b("[data-hero-scene-task]"), mainBottom: b("[data-hero-cta='task']"), band: !!document.querySelector("[data-preview-band], .preview-band") };
    });
    rows.push({ viewport: `${w}x${h}`, locale, taskBottom: r.taskBottom, taskHeadroom: h - r.taskBottom, mainBottom: r.mainBottom, mainHeadroom: h - r.mainBottom });
    await ctx.close();
  }
}
await browser.close();
console.table(rows);
console.log(JSON.stringify(rows));
