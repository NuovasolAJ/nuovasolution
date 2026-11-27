// RV6 N-1..N-3 on the E2 home, without the strips: per small phone and language — the caption's contrast (capsule counted) and position,
// the hint's presence, any overlap of the hint with the main action, and the fold row (task card · action) as the regression guard
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3180";
const lum = (r, g, b) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
const browser = await chromium.launch(); const rows = [];
for (const [w, h] of [[360, 640], [375, 667], [390, 844]]) for (const locale of ["es", "en"]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } }); const page = await ctx.newPage();
  await page.goto(`${base}/${locale}`, { waitUntil: "networkidle" }); await page.waitForTimeout(3200);
  await page.evaluate(() => { document.querySelectorAll("[data-env],[data-env-marker],[data-preview-switches]").forEach((e) => e.remove()); window.scrollTo(0, 0); }); await page.waitForTimeout(400);
  const g = await page.evaluate((h) => { const b = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), bottom: Math.round(r.bottom) }; }; const edge = document.querySelector(".hf-edge"); const cap = document.querySelector(".hf-mark"); const cs = getComputedStyle(cap); return { task: b("[data-hero-scene-task]"), main: b("[data-hero-cta='task']"), cap: b(".hf-mark"), capColor: cs.color, capBg: cs.backgroundColor, edgeShown: edge ? getComputedStyle(edge).display !== "none" : false, edge: b(".hf-edge") }; }, h);
  // the caption's ground with the text hidden, then the capsule composited over it
  await page.evaluate(() => { const e = document.querySelector(".hf-mark"); e.style.visibility = "hidden"; });
  const png = await page.screenshot({ clip: { x: g.cap.x, y: Math.max(0, g.cap.y), width: g.cap.w, height: Math.min(g.cap.h, h - g.cap.y) } }).catch(() => null);
  await page.evaluate(() => { document.querySelector(".hf-mark").style.visibility = ""; });
  let capContrast = null;
  if (png) {
    const st = await page.evaluate(async (b64) => { const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode(); const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const ctx2 = c.getContext("2d"); ctx2.drawImage(img, 0, 0); const d = ctx2.getImageData(0, 0, c.width, c.height).data; const L = (r, g, b) => { const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); }; let s = 0, m = 0, n = 0; for (let i = 0; i < d.length; i += 8) { const l = L(d[i], d[i + 1], d[i + 2]); s += l; if (l > m) m = l; n++; } return { mean: s / n, max: m }; }, png.toString("base64"));
    const t = g.capColor.match(/\d+(\.\d+)?/g).map(Number); const bg = g.capBg.match(/\d+(\.\d+)?/g).map(Number); const a = bg[3] ?? 1; const capL = lum(bg[0], bg[1], bg[2]);
    const tl = lum(t[0], t[1], t[2]); const over = (x) => capL * a + x * (1 - a);
    capContrast = { vsMean: ratio(tl, over(st.mean)).toFixed(1), vsLightest: ratio(tl, over(st.max)).toFixed(1) };
  }
  const overlap = g.edgeShown && g.edge && g.main ? Math.max(0, Math.min(g.edge.bottom, g.main.bottom) - Math.max(g.edge.y, g.main.y)) : 0;
  rows.push({ viewport: `${w}x${h}`, locale, taskHeadroom: h - g.task.bottom, actionHeadroom: h - g.main.bottom, captionBottom: g.cap.bottom, captionInside: g.cap.bottom <= h, capContrast, hintShown: g.edgeShown, hintOverlapPx: overlap });
  await ctx.close();
}
await browser.close(); console.table(rows.map((r) => ({ ...r, capContrast: r.capContrast ? `${r.capContrast.vsMean} / ${r.capContrast.vsLightest}` : "-" }))); console.log(JSON.stringify(rows));
