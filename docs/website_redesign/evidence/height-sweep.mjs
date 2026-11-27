// RV6 N-5: sweep the phone heights — does the fold cut horizontally through a TEXT line of the pain band (the line or its mark)?
// Widths 360/375/390/414, heights 600–900 in 10 px steps, ES and EN, without the preview strips. Also reports the hero's foot and fit mode.
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3180";
const browser = await chromium.launch();
const sliced = []; let n = 0; const modes = {};
for (const w of [360, 375, 390, 414]) for (const locale of ["es", "en"]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 800 } }); const page = await ctx.newPage();
  await page.goto(`${base}/${locale}`, { waitUntil: "networkidle" }); await page.waitForTimeout(2500);
  await page.evaluate(() => { document.querySelectorAll("[data-env],[data-env-marker],[data-preview-switches]").forEach((e) => e.remove()); });
  for (let h = 600; h <= 900; h += 10) {
    await page.setViewportSize({ width: w, height: h }); await page.waitForTimeout(120);
    const r = await page.evaluate((h) => {
      window.scrollTo(0, 0);
      const hero = document.querySelector("section[data-hero='film']"); const fit = hero.getAttribute("data-hero-fit");
      const foot = Math.round(hero.getBoundingClientRect().bottom);
      // text-node rectangles of the pain line and the mark
      const cut = [];
      for (const [name, sel] of [["line", ".pain-line"], ["mark", ".pain-mark"]]) {
        const el = document.querySelector(sel); if (!el) continue;
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let node;
        while ((node = walker.nextNode())) { if (!node.textContent.trim()) continue; const range = document.createRange(); range.selectNodeContents(node); for (const rect of range.getClientRects()) { if (rect.height > 4 && rect.top < h && rect.bottom > h) cut.push(`${name} ${Math.round(rect.top)}-${Math.round(rect.bottom)}`); } }
      }
      return { fit, foot, peek: h - foot, cut };
    }, h);
    n++; modes[r.fit] = (modes[r.fit] || 0) + 1;
    if (r.cut.length) sliced.push({ w, h, locale, fit: r.fit, peek: r.peek, cut: r.cut.join("; ") });
  }
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify({ windows: n, modes, slicedCount: sliced.length, sliced }, null, 1));
