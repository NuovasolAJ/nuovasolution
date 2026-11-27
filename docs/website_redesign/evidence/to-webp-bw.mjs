// Convert one JPEG into black-and-white WebP at several widths (the owner's look: bright elegant monochrome architecture photography,
// natural light, deep shadows): grayscale, a touch more contrast, with Chromium's canvas filter
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
const [src, outBase, ...widths] = process.argv.slice(2);
const b64 = readFileSync(src).toString("base64");
const browser = await chromium.launch();
const page = await browser.newPage();
const meta = await page.evaluate(async (b64) => { const img = new Image(); img.src = "data:image/jpeg;base64," + b64; await img.decode(); window.__img = img; return { w: img.naturalWidth, h: img.naturalHeight }; }, b64);
console.log("source", meta.w, meta.h);
for (const w of widths.map(Number)) {
  const data = await page.evaluate(async (w) => { const img = window.__img; const h = Math.round(img.naturalHeight * w / img.naturalWidth); const c = document.createElement("canvas"); c.width = w; c.height = h; const g = c.getContext("2d"); g.filter = "grayscale(1) contrast(1.08) brightness(1.02)"; g.drawImage(img, 0, 0, w, h); return c.toDataURL("image/webp", 0.82); }, w);
  const buf = Buffer.from(data.split(",")[1], "base64");
  writeFileSync(`${outBase}-${w}.webp`, buf);
  console.log(w, Math.round(buf.length / 1024) + " KB");
}
await browser.close();
