// RV6 (27.11.): the two detail buttons from the keyboard — Enter on the anchor, the accessible name, where focus sits after the jump,
// and the no-JavaScript landing (a real href on each)
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3180"; const route = process.argv[3] ?? "/en";
const b = await chromium.launch(); const rows = [];
for (const key of ["captar", "reactivar"]) {
  const ctx = await b.newContext({ viewport: { width: 1366, height: 768 } }); const p = await ctx.newPage();
  await p.goto(`${base}${route}`, { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  await p.evaluate((key) => { const a = document.querySelector(`[data-task-action='${key}']`); a.scrollIntoView({ block: "center" }); a.focus(); }, key);
  const before = await p.evaluate((key) => { const a = document.querySelector(`[data-task-action='${key}']`); return { tag: a.tagName, href: a.getAttribute("href"), name: a.textContent.trim(), focused: document.activeElement === a }; }, key);
  await p.keyboard.press("Enter"); await p.waitForTimeout(700);
  const after = await p.evaluate(() => { const e = document.activeElement; const r = e.getBoundingClientRect(); return { tag: e.tagName, text: (e.getAttribute("aria-label") || e.textContent || "").trim().slice(0, 60), role: e.getAttribute("role"), selected: e.getAttribute("aria-selected"), expanded: e.getAttribute("aria-expanded"), inWindow: r.top >= 0 && r.bottom <= innerHeight, demoChannel: document.querySelector("#demo")?.getAttribute("data-demo-channel"), chapterOpen: document.querySelector("#functions")?.getAttribute("data-chapter-open") }; });
  rows.push({ key, before, after });
  await ctx.close();
}
// no JavaScript: the hrefs and what stands at the targets
const ctx = await b.newContext({ viewport: { width: 1366, height: 768 }, javaScriptEnabled: false }); const p = await ctx.newPage();
await p.goto(`${base}${route}`, { waitUntil: "load" }); await p.waitForTimeout(1500);
const nojs = await p.evaluate(() => { const h = (k) => document.querySelector(`[data-task-action='${k}']`)?.getAttribute("href"); const demo = document.querySelector("#demo"); const matching = Array.from(document.querySelectorAll("[data-chapter='grow'] .ch-scene-title")).map((e) => e.textContent.trim()); return { captarHref: h("captar"), reactivarHref: h("reactivar"), demoPresent: !!demo, demoChannel: demo?.getAttribute("data-demo-channel"), growScenesVisible: matching.filter((_, i) => { const el = document.querySelectorAll("[data-chapter='grow'] .ch-scene-title")[i]; return el.getBoundingClientRect().height > 0; }) }; });
await b.close();
console.log(JSON.stringify({ rows, nojs }, null, 1));
