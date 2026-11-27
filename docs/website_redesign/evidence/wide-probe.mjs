// the owner's 27.11. feedback on the Rundgang at 1920 x 1080: where the hero's content ends, the demo's width, the 3D caption vs the path panel,
// the day strip's size — document coordinates of the elements named, plus screenshots of the four places
import { chromium } from "playwright";
const base = process.argv[2] ?? "http://localhost:3180";
const route = process.argv[3] ?? "/en/rundgang";
const out = process.argv[4] ?? "C:/Users/Usuario/AppData/Local/Temp/claude/d06aa7b2d3814af7/941acdf5-e980-442b-84bf-feb36682f07b/scratchpad/wide";
import { mkdirSync } from "node:fs";
mkdirSync(out, { recursive: true });
const b = await chromium.launch();
for (const [w, h] of [[1920, 1080], [1440, 900]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } }); const p = await ctx.newPage();
  await p.goto(`${base}${route}`, { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
  await p.evaluate(() => document.querySelectorAll("[data-env],[data-env-marker],[data-preview-switches]").forEach((e) => e.remove()));
  const r = await p.evaluate(() => {
    const y = window.scrollY; const b = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { top: Math.round(r.top + y), bottom: Math.round(r.bottom + y), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) }; };
    const fs = (s) => { const e = document.querySelector(s); return e ? getComputedStyle(e).fontSize : null; };
    return { hero: b(".hf"), heroContent: b(".hf-content"), h1: b(".hf-h1"), h1fs: fs(".hf-h1"), leadfs: fs(".hf-lead"), sceneText: fs(".hf-scene-text"), ctaBottom: b("[data-hero-cta='task']"), demo: b(".demo"), pain: b(".pain"), painInner: b(".pain-inner"), flowContainer: b(".flow > .container-default"), m3dFrame: b(".m3d-frame"), m3dUnder: b(".m3d-under"), m3dSteps: b(".m3d-steps"), m3dPathContainer: b("#model-3d > .container-default:last-of-type"), m3dPath: b(".m3d-path"), atDay: b(".at-day"), atDayTitle: fs(".at-day-title"), atMomentTime: fs(".at-moment-time"), repSheet: b(".rep-sheet") };
  });
  console.log(w + "x" + h, JSON.stringify(r));
  for (const [name, sel] of [["hero", ".hf"], ["demo", ".demo"], ["m3d", "#model-3d"], ["day", ".at-day"], ["report", "#report"]]) {
    const el = await p.$(sel); if (!el) continue;
    await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(600);
    await p.screenshot({ path: `${out}/${w}-${name}-${route.replace(/\//g, "_")}.png` });
  }
  await ctx.close();
}
await b.close();
