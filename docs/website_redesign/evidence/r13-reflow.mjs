// R-13 reflow: while the trial link holds keyboard focus at 375/390, do the task card, the main action and the headline stay inside the first screen?
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3180";
const browser = await chromium.launch();
const boxes = (page) => page.evaluate(() => {
  const b = (sel) => { const e = document.querySelector(sel); if (!e) return null; const r = e.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), h: Math.round(r.height) }; };
  return { scrollY: Math.round(window.scrollY), header: b("header"), h1: b("#hero-h1"), task: b("[data-hero-scene-task]"), main: b("[data-hero-cta='task']"), trial: b("[data-hero-cta='trial']") };
});
const out = [];
for (const [w, h] of [[375, 667], [390, 844], [1366, 768]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.goto(`${base}/es`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3200);
  const before = await boxes(page);
  for (let i = 0; i < 25; i++) { await page.keyboard.press("Tab"); if (await page.evaluate(() => document.activeElement?.getAttribute("data-hero-cta") === "trial")) break; }
  const focused = await boxes(page);
  const inside = (x) => x && x.top >= 0 && x.bottom <= h;
  out.push({ viewport: `${w}x${h}`, before, focused, taskInsideWhileFocused: inside(focused.task), mainInsideWhileFocused: inside(focused.main), h1BelowHeaderWhileFocused: focused.h1 && focused.header ? focused.h1.top >= focused.header.bottom : null });
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 2));
