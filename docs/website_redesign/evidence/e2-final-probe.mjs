// E2 final checks on the owner's six points: the demo chat head (neutral, mark green), the scroll hint (present, 44 px, keyboard-reachable,
// goes to #pain), the mobile bar never over the main action or over the focused trial link on the small phones, the demo end title.
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3180";
const out = process.argv[3] ?? ".";
const browser = await chromium.launch();
const res = {};
// 1. desktop: scroll hint + demo head + end title
{
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 } }); const page = await ctx.newPage();
  await page.goto(`${base}/es`, { waitUntil: "networkidle" }); await page.waitForTimeout(3200);
  res.edge = await page.evaluate(() => { const e = document.querySelector(".hf-edge"); if (!e) return null; const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return { href: e.getAttribute("href"), label: e.getAttribute("aria-label"), w: Math.round(r.width), h: Math.round(r.height), bottom: Math.round(r.bottom), display: cs.display, painId: !!document.getElementById("pain") }; });
  let presses = 0, found = false;
  for (let i = 0; i < 30; i++) { await page.keyboard.press("Tab"); presses++; if (await page.evaluate(() => document.activeElement?.classList.contains("hf-edge"))) { found = true; break; } }
  res.edgeTab = { presses, found, focusVisible: found && await page.evaluate(() => document.activeElement.matches(":focus-visible")) };
  if (found) { await page.keyboard.press("Enter"); await page.waitForTimeout(800); res.edgeJump = await page.evaluate(() => ({ scrollY: Math.round(window.scrollY), painTop: Math.round(document.getElementById("pain").getBoundingClientRect().top) })); }
  await page.goto(`${base}/es`, { waitUntil: "networkidle" }); await page.waitForTimeout(3200);
  await page.locator("[data-hero-cta='task']").first().click(); await page.waitForTimeout(16000);
  res.demoHead = await page.evaluate(() => { const h = document.querySelector(".demo-chat-head"); if (!h) return null; const cs = getComputedStyle(h); const wa = h.querySelector(".demo-chat-wa"); const name = h.querySelector(".demo-chat-name"); return { bg: cs.backgroundColor, nameColor: name && getComputedStyle(name).color, mark: !!wa, markColor: wa && getComputedStyle(wa).color }; });
  res.demoEnd = await page.evaluate(() => { const t = [...document.querySelectorAll("[data-demo-next], .demo-next, .demo-task-title")].map((e) => e.textContent.trim()); const all = document.body.innerText; return { titles: t.slice(0, 3), hasOldTitle: /17:00 · Comprobar/.test(all), hasNew: /Llamar a Mila por el piso de Nerja/.test(all) }; });
  await page.screenshot({ path: `${out}/demo-ende-1366.png` });
  await ctx.close();
}
// 2. small phones: the mobile bar vs the main action and vs the focused trial link
for (const [w, h] of [[360, 640], [375, 667], [390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: true, isMobile: true }); const page = await ctx.newPage();
  await page.goto(`${base}/es`, { waitUntil: "networkidle" }); await page.waitForTimeout(3200);
  const a = await page.evaluate(() => { const m = document.querySelector("[data-hero-cta='task']").getBoundingClientRect(); window.scrollTo(0, window.scrollY + m.bottom - innerHeight + 8); return null; });
  await page.waitForTimeout(600);
  const r1 = await page.evaluate(() => { const bar = document.querySelector(".mcta"); const m = document.querySelector("[data-hero-cta='task']").getBoundingClientRect(); const b = bar.getBoundingClientRect(); return { barState: bar.getAttribute("data-mobile-cta"), mainBottom: Math.round(m.bottom), barTop: Math.round(b.top), overlap: bar.getAttribute("data-mobile-cta") === "shown" && b.top < m.bottom }; });
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(400);
  let presses = 0, found = false;
  for (let i = 0; i < 20; i++) { await page.keyboard.press("Tab"); presses++; if (await page.evaluate(() => document.activeElement?.getAttribute("data-hero-cta") === "trial" && document.activeElement.classList.contains("hf-cta-trial-kbd"))) { found = true; break; } }
  await page.waitForTimeout(500);
  const r2 = await page.evaluate(() => { const bar = document.querySelector(".mcta"); const t = document.activeElement.getBoundingClientRect(); const b = bar.getBoundingClientRect(); return { barState: bar.getAttribute("data-mobile-cta"), trialBottom: Math.round(t.bottom), barTop: Math.round(b.top), covered: bar.getAttribute("data-mobile-cta") === "shown" && b.top < t.bottom }; });
  res[`bar_${w}x${h}`] = { atAction: r1, atTrialFocus: { presses, found, ...r2 } };
  await page.screenshot({ path: `${out}/testleiste-${w}x${h}.png` });
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(res, null, 1));
