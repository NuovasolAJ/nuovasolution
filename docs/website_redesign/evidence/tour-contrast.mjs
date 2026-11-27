// Text contrast on the Rundgang: for the hero words (white on the picture + shade) sample the ground behind each text block with the
// text hidden, and report the contrast of white against the mean and the lightest pixel; for the panels, the computed colours.
import { chromium } from "playwright";
const [base = "http://localhost:3180", locale = "es"] = process.argv.slice(2);
const lum = (r, g, b) => { const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
const browser = await chromium.launch();
const rows = [];
for (const [w, h] of [[1366, 768], [390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } }); const page = await ctx.newPage();
  await page.goto(`${base}/${locale}/rundgang`, { waitUntil: "networkidle" }); await page.waitForTimeout(3500);
  for (const [name, sel] of [["headline", "#hero-h1"], ["sentence", ".hf-lead"], ["caption", ".hf-mark"], ["example mark", ".hf-scene-mark"]]) {
    const box = await page.evaluate((sel) => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), color: getComputedStyle(e).color }; }, sel);
    if (!box || box.w < 4 || box.h < 4) continue;
    await page.evaluate((sel) => { document.querySelector(sel).style.visibility = "hidden"; }, sel);
    const png = await page.screenshot({ clip: { x: box.x, y: box.y, width: box.w, height: box.h } });
    await page.evaluate((sel) => { document.querySelector(sel).style.visibility = ""; }, sel);
    const stats = await page.evaluate(async (b64) => { const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode(); const c = document.createElement("canvas"); c.width = img.width; c.height = img.height; const g = c.getContext("2d"); g.drawImage(img, 0, 0); const d = g.getImageData(0, 0, c.width, c.height).data; let sum = 0, max = 0, n = 0; const L = (r, g, b) => { const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); }; for (let i = 0; i < d.length; i += 16) { const l = L(d[i], d[i + 1], d[i + 2]); sum += l; if (l > max) max = l; n++; } return { mean: sum / n, max }; }, png.toString("base64"));
    const m = box.color.match(/\d+/g).map(Number); const textL = lum(m[0], m[1], m[2]);
    // an element with its own dark capsule (the caption): the capsule composites over the ground before the text sits on it
    const bg = await page.evaluate((sel) => getComputedStyle(document.querySelector(sel)).backgroundColor, sel);
    const bgm = bg.match(/\d+(\.\d+)?/g)?.map(Number) ?? [0, 0, 0, 0]; const a = bgm.length > 3 ? bgm[3] : (bg === "rgba(0, 0, 0, 0)" ? 0 : 1);
    const capL = lum(bgm[0] ?? 0, bgm[1] ?? 0, bgm[2] ?? 0);
    const ground = (g) => a > 0 ? capL * a + g * (1 - a) : g;
    rows.push({ viewport: `${w}x${h}`, element: name, textColor: box.color, capsule: a > 0 ? bg : "", contrastVsMean: ratio(textL, ground(stats.mean)).toFixed(1), contrastVsLightestPixel: ratio(textL, ground(stats.max)).toFixed(1) });
  }
  // the panels: computed text and panel colours at the pain line and the plans heading
  for (const [name, sel, panel] of [["pain line", ".pain-line", ".pain-inner"], ["plans heading", "#plans h2", "#plans .container-default"], ["faq heading", "#faq h2", "#faq .container-default"]]) {
    const r = await page.evaluate(([sel, panel]) => { const e = document.querySelector(sel); const p = document.querySelector(panel); if (!e || !p) return null; return { text: getComputedStyle(e).color, panel: getComputedStyle(p).backgroundColor }; }, [sel, panel]);
    if (!r) continue;
    const t = r.text.match(/\d+(\.\d+)?/g).map(Number); const p = r.panel.match(/\d+(\.\d+)?/g).map(Number);
    const a = p[3] ?? 1; // composite the panel over the lightest possible ground (white) and the darkest (black) to bound the contrast
    const over = (bg) => [0, 1, 2].map((i) => p[i] * a + bg * (1 - a));
    const tl = lum(t[0], t[1], t[2]);
    rows.push({ viewport: `${w}x${h}`, element: name, textColor: r.text, panel: r.panel, contrastOverWhiteGround: ratio(tl, lum(...over(255))).toFixed(1), contrastOverBlackGround: ratio(tl, lum(...over(0))).toFixed(1) });
  }
  await ctx.close();
}
await browser.close();
console.table(rows);
console.log(JSON.stringify(rows));
