// A run-through of the Rundgang prototype on film: smooth native scrolling top to bottom and part of the way back (desktop + phone)
import { chromium } from "playwright";
import { readdirSync, renameSync } from "node:fs";
const [base = "http://localhost:3180", out = ".", locale = "es"] = process.argv.slice(2);
const browser = await chromium.launch();
for (const [label, w, h] of [["desktop", 1366, 768], ["phone", 390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, recordVideo: { dir: out, size: { width: w, height: h } } });
  const page = await ctx.newPage();
  await page.goto(`${base}/${locale}/rundgang`, { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const step = Math.round(h * 0.12);
  for (let y = 0; y < total; y += step) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(40); }
  await page.waitForTimeout(1200);
  for (let y = total; y > total * 0.55; y -= step) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(40); }
  await page.waitForTimeout(800);
  const v = page.video(); await ctx.close(); const p = await v.path();
  renameSync(p, `${out}/rundgang-durchlauf-${label}.webm`);
  console.log(label, "video", `${out}/rundgang-durchlauf-${label}.webm`, "scroll", total);
}
await browser.close();
