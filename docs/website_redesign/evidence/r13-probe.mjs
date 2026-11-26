// R-13 probe: real Tab presses on the first screen until the trial link holds focus; is it visible then (box >= 44 px, inside the viewport)?
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3180";
const out = process.argv[3] ?? ".";
const browser = await chromium.launch();
const results = [];
for (const [w, h] of [[1366, 768], [390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.goto(`${base}/es`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3200);
  let presses = 0, found = null;
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press("Tab"); presses++;
    const info = await page.evaluate(() => {
      const e = document.activeElement; if (!e) return null;
      const r = e.getBoundingClientRect();
      const cs = getComputedStyle(e);
      return { hero: e.getAttribute("data-hero-cta"), text: (e.textContent || "").trim().slice(0, 40), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), clip: cs.clip, position: cs.position, matchesFocusVisible: e.matches(":focus-visible") };
    });
    if (info?.hero === "trial") { found = info; break; }
  }
  await page.screenshot({ path: `${out}/r13-trial-focus-${w}.png` });
  results.push({ viewport: `${w}x${h}`, presses, found, visible: !!found && found.w >= 44 && found.h >= 44 && found.y >= 0 && found.y + found.h <= h && found.clip === "auto" });
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
