// the peek: hero bottom, pain band top, pain line top vs the viewport, without the preview strips
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3180";
const browser = await chromium.launch();
const rows = [];
for (const [w, h] of [[360, 640], [375, 667], [390, 844], [414, 896], [1280, 720], [1366, 768], [1440, 900]]) for (const locale of ["es", "en"]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } }); const page = await ctx.newPage();
  await page.goto(`${base}/${locale}`, { waitUntil: "networkidle" }); await page.waitForTimeout(3200);
  await page.evaluate(() => { document.querySelectorAll("[data-env], [data-env-marker], [data-preview-switches]").forEach((e) => e.remove()); window.scrollTo(0, 0); });
  await page.waitForTimeout(400);
  const r = await page.evaluate((h) => { const b = (s) => document.querySelector(s)?.getBoundingClientRect(); const hero = b(".hf"), pain = b("[data-pain]"), line = b(".pain-line"); return { heroBottom: Math.round(hero.bottom), peekPx: Math.round(h - hero.bottom), lineTop: Math.round(line.top), lineBottom: Math.round(line.bottom), lineState: line.top >= h ? "under the fold" : line.bottom <= h ? "whole" : "SLICED" }; }, h);
  rows.push({ viewport: `${w}x${h}`, locale, ...r }); await ctx.close();
}
await browser.close(); console.table(rows); console.log(JSON.stringify(rows));
