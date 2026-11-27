// A short scroll clip of the running page with a stop in the door (the pain band) and on the stairs (the report), then on to the pool,
// and a short way back — what the owner asked to see at the interim
import { chromium } from "playwright";
import { renameSync } from "node:fs";
const [base = "http://localhost:3180", out = ".", locale = "es"] = process.argv.slice(2);
const browser = await chromium.launch();
for (const [label, w, h] of [["desktop", 1366, 768], ["phone", 390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, recordVideo: { dir: out, size: { width: w, height: h } } });
  const page = await ctx.newPage();
  await page.goto(`${base}/${locale}/rundgang`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  const yOf = (sel) => page.evaluate((sel) => { const e = document.querySelector(sel); return e ? Math.round(e.getBoundingClientRect().top + window.scrollY - 72) : 0; }, sel);
  const glide = async (to, ms) => { const from = await page.evaluate(() => window.scrollY); const steps = Math.max(8, Math.round(ms / 40)); for (let i = 1; i <= steps; i++) { const t = i / steps; const e = 1 - Math.pow(1 - t, 3); await page.evaluate((y) => window.scrollTo(0, y), Math.round(from + (to - from) * e)); await page.waitForTimeout(40); } };
  await glide(await yOf("#pain"), 2200); await page.waitForTimeout(1800);           // stop in the door
  await glide(await yOf("#strengths"), 2600); await page.waitForTimeout(900);
  await glide(await yOf("#report"), 2200); await page.waitForTimeout(1800);         // stop on the stairs
  await glide(await yOf("#plans"), 2600); await page.waitForTimeout(900);
  await glide(await page.evaluate(() => document.documentElement.scrollHeight - innerHeight), 3200); await page.waitForTimeout(2200); // the pool with the mark
  await glide(await yOf("#plans"), 2000); await page.waitForTimeout(800);           // and back a little
  const v = page.video(); await ctx.close(); const p = await v.path();
  renameSync(p, `${out}/rundgang-v2-mitschnitt-${label}.webm`);
  console.log(label, `${out}/rundgang-v2-mitschnitt-${label}.webm`);
}
await browser.close();
