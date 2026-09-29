// Close-up captures of named page regions (hero, each flow stage, plan cards …) at desktop and phone
// width, for the visual direction check. Renders a LOCAL build (default) or a deployed origin (BASE=https://…).
// Usage: node scripts/design/element-capture.mjs
//        SHOTS="home:[data-hero-scene]|packages:[data-plan-cards]" VIEWS=d1440 LOCALES=es node scripts/design/element-capture.mjs
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "design_probe_2026-09-29", "direction");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3117, CDP_PORT = 9347;
const BASE = (process.env.BASE ?? `http://localhost:${PORT}`).replace(/\/$/, "");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const DEFAULT_SHOTS = [
  ["home", "hero", "section[aria-labelledby=hero-h1]"],
  ["home", "pains", "section[aria-labelledby=pains-h]"],
  ["home", "step-answer", "#step-answer"],
  ["home", "step-record", "#step-record"],
  ["home", "step-task", "#step-task"],
  ["home", "statement-setup", "section[aria-labelledby=setup-h]"],
  ["home", "offer", "section[aria-labelledby=offer-h]"],
  ["packages", "opening", "section[aria-labelledby=pk-h1]"],
  ["packages", "plans", "section[aria-labelledby=pk-plans]"],
  ["packages", "pay", "section[aria-labelledby=pk-pay]"],
];
const shots = process.env.SHOTS ? process.env.SHOTS.split("|").map((s) => { const [page, sel] = s.split(":"); return [page, sel.replace(/[^a-z0-9]+/gi, "-"), sel]; }) : DEFAULT_SHOTS;
const VIEWS = { d1440: [1440, 900, false, 1], t1024: [1024, 900, false, 1], m390: [390, 844, true, 2] };
const views = (process.env.VIEWS ? process.env.VIEWS.split(",") : ["d1440", "m390"]).map((k) => [k, ...VIEWS[k]]);
const locales = process.env.LOCALES ? process.env.LOCALES.split(",") : ["es", "en"];

const kids = [];
try {
  if (!process.env.BASE) {
    const p = spawn(process.execPath, [NEXT, "start", "-p", String(PORT)], { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
    p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p);
    for (let i = 0; i < 120; i++) { try { const r = await fetch(`${BASE}/en`, { redirect: "manual" }); if (r.status) break; } catch { /* not up */ } await sleep(500); }
  }
  const prof = join(tmpdir(), `nuova-elements-${Date.now()}`);
  kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" }));
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  await send("Page.enable");
  await send("Runtime.enable");

  for (const locale of locales) {
    for (const [tag, w, h, mobile, dpr] of views) {
      await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: dpr, mobile });
      let current = null;
      for (const [page, name, sel] of shots) {
        if (current !== page) {
          await send("Page.navigate", { url: `${BASE}/${locale}${page === "home" ? "" : `/${page}`}` });
          await sleep(1800);
          await ev("(()=>{document.querySelectorAll('.reveal,.rise').forEach(e=>e.classList.add('is-in'));document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager');return true})()");
          await sleep(1200);
          current = page;
        }
        const r = await ev(`(()=>{const e=document.querySelector(${JSON.stringify(sel)});if(!e)return null;const b=e.getBoundingClientRect();return {x:0,y:Math.max(0,b.top+scrollY),w:innerWidth,h:Math.min(b.height,4200)}})()`);
        if (!r) { console.log(`MISS ${tag}-${locale}-${page}-${name}`); continue; }
        const s = await send("Page.captureScreenshot", { format: "jpeg", quality: 80, captureBeyondViewport: true, clip: { x: r.x, y: r.y, width: r.w, height: r.h, scale: 1 } });
        const file = join(OUT, `${tag}-${locale}-${page}-${name}.jpg`);
        if (s.result?.data) writeFileSync(file, Buffer.from(s.result.data, "base64"));
        console.log(`shot ${tag}-${locale}-${page}-${name} ${Math.round(r.w)}x${Math.round(r.h)}`);
      }
    }
  }
  ws.close();
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
}
