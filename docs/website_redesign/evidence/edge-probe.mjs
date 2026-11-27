// RV6 E-5 / E-6: the scroll hint's size and whether its lower edge is inside the window, without the preview strips, per phone and desktop
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3180";
const b = await chromium.launch(); const rows = [];
for (const [w, h] of [[360, 640], [375, 667], [390, 844], [414, 896], [1280, 720], [1366, 768]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
  await p.goto(`${base}/es`, { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  await p.evaluate(() => document.querySelectorAll("[data-env],[data-env-marker],[data-preview-switches]").forEach((e) => e.remove())); await p.waitForTimeout(300);
  rows.push(await p.evaluate((h) => { const e = document.querySelector(".hf-edge"); const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return { shown: cs.display !== "none", w: Math.round(r.width), hgt: Math.round(r.height), bottom: Math.round(r.bottom), insideWindow: cs.display !== "none" ? r.bottom <= h : null }; }, h).then((x) => ({ viewport: `${w}x${h}`, ...x })));
  await ctx.close();
}
await b.close(); console.table(rows); console.log(JSON.stringify(rows));
