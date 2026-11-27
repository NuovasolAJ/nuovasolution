// the owner's acceptance goal (27.11.): how the story reads on the first scroll — one desktop and one phone sheet per route, the viewport
// at each story stop (first screen, pain, the finished task in the demonstration, the areas, the four tasks, the day strip, the report with
// the week told twice, the plans), stitched into one tall picture; plus the two detail-button checks (form example, "Crece" opened)
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
const base = process.argv[2] ?? "http://localhost:3180";
const route = process.argv[3] ?? "/en/rundgang";
const out = process.argv[4] ?? "C:/Users/Usuario/AppData/Local/Temp/claude/d06aa7b2d3814af7/941acdf5-e980-442b-84bf-feb36682f07b/scratchpad/story";
mkdirSync(out, { recursive: true });
const STOPS = [["hero", ".hf", "start"], ["pain", "#pain", "start"], ["demo", "#demo", "start"], ["functions", "#functions", "start"], ["tasks", "#strengths", "start"], ["day", ".at-day", "center"], ["report", "#report", "start"], ["compare", "[data-compare-block]", "start"], ["plans", "#plans", "start"]];
const b = await chromium.launch();
for (const [w, h, name] of [[1920, 1080, "desktop"], [390, 844, "phone"]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: w < 500, hasTouch: w < 500 }); const p = await ctx.newPage();
  await p.goto(`${base}${route}`, { waitUntil: "networkidle" }); await p.waitForTimeout(3000);
  await p.evaluate(() => document.querySelectorAll("[data-env],[data-env-marker],[data-preview-switches]").forEach((e) => e.remove()));
  const shots = [];
  for (const [key, sel, block] of STOPS) {
    const ok = await p.evaluate(([sel, block]) => { const e = document.querySelector(sel); if (!e) return false; e.scrollIntoView({ block, behavior: "auto" }); if (block === "start") window.scrollBy(0, -72); return true; }, [sel, block]);
    if (!ok) continue;
    if (key === "demo") { await p.evaluate(() => document.querySelector("[data-hero-cta='task']")?.click()); await p.waitForTimeout(500); await p.evaluate(() => { document.querySelector("#demo").scrollIntoView({ block: "start" }); window.scrollBy(0, -72); }); }
    await p.waitForTimeout(900);
    const png = await p.screenshot(); shots.push({ key, b64: png.toString("base64") });
    writeFileSync(`${out}/${name}-${key}${route.replace(/\//g, "_")}.png`, png);
  }
  // stitch on a canvas
  const sheet = await p.evaluate(async ({ shots, w, h }) => {
    const c = document.createElement("canvas"); c.width = w; c.height = (h + 12) * shots.length; const g = c.getContext("2d"); g.fillStyle = "#1a1917"; g.fillRect(0, 0, c.width, c.height);
    let y = 0; for (const s of shots) { const img = new Image(); img.src = "data:image/png;base64," + s.b64; await img.decode(); g.drawImage(img, 0, y); y += h + 12; }
    return c.toDataURL("image/png").split(",")[1];
  }, { shots, w, h });
  writeFileSync(`${out}/${name}-sheet${route.replace(/\//g, "_")}.png`, Buffer.from(sheet, "base64"));
  console.log(name, "stops", shots.map((s) => s.key).join(","));
  // the detail buttons: the form example, then "Crece" opened
  await p.evaluate(() => { document.querySelector("[data-task-action='captar']").scrollIntoView({ block: "center" }); });
  await p.waitForTimeout(400);
  await p.evaluate(() => document.querySelector("[data-task-action='captar']").click()); await p.waitForTimeout(900);
  const demoState = await p.evaluate(() => { const d = document.querySelector("#demo"); const r = d.getBoundingClientRect(); return { channel: d.getAttribute("data-demo-channel"), entered: d.getAttribute("data-demo-entered"), done: d.getAttribute("data-demo-done"), topInWindow: r.top < innerHeight && r.bottom > 0 }; });
  await p.screenshot({ path: `${out}/${name}-click-captar${route.replace(/\//g, "_")}.png` });
  await p.evaluate(() => { document.querySelector("[data-task-action='reactivar']").scrollIntoView({ block: "center" }); });
  await p.waitForTimeout(400);
  await p.evaluate(() => document.querySelector("[data-task-action='reactivar']").click()); await p.waitForTimeout(1200);
  const chState = await p.evaluate(() => { const s = document.querySelector("#functions"); const d = document.querySelector("[data-chapter='grow']"); const r = d.getBoundingClientRect(); const m = document.querySelector("[data-fn='matching']"); return { open: s.getAttribute("data-chapter-open"), growTop: Math.round(r.top), matchingShown: !!m && m.getBoundingClientRect().height > 0 }; });
  await p.screenshot({ path: `${out}/${name}-click-reactivar${route.replace(/\//g, "_")}.png` });
  console.log(name, "captar→", JSON.stringify(demoState), "reactivar→", JSON.stringify(chState));
  await ctx.close();
}
await b.close();
