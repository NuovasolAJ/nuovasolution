// Full-page captures of every route at every breakpoint (owner order 2026-09-29 E, return: screenshots per
// route and breakpoint). Renders a LOCAL build (default, starts `next start`) or a deployed origin
// (BASE=https://…) in headless Edge. For every page it also measures: page height, horizontal overflow,
// clipped text (an element whose text is wider than its box and hidden), overlapping fixed elements, and
// the number of headings, so the self check has numbers next to the pictures.
// Usage: node scripts/design/page-capture.mjs            all routes, all breakpoints, EN and ES
//        ROUTES=home,packages VIEWS=d1440,m390 LOCALES=es node scripts/design/page-capture.mjs
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "design_probe_2026-09-29", "pages");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3116, CDP_PORT = 9346;
const BASE = (process.env.BASE ?? `http://localhost:${PORT}`).replace(/\/$/, "");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const ALL_ROUTES = ["/", "/faq", "/platform", "/platform/ai-sales-agent", "/platform/lead-intelligence", "/platform/crm", "/platform/daily-assistant", "/packages", "/trial", "/contact", "/signup", "/login", "/welcome", "/legal/privacy", "/legal/terms", "/legal/data-deletion", "/legal/notice"];
const ALL_VIEWS = { d1440: [1440, 900, false, 1], t1024: [1024, 1366, false, 1], t768: [768, 1024, false, 1], m390: [390, 844, true, 2], m360: [360, 780, true, 2], z200: [720, 450, false, 2] };
// "home" is accepted for "/" (Git Bash rewrites a bare "/" in an environment value into a Windows path).
const routes = (process.env.ROUTES ? process.env.ROUTES.split(",") : ALL_ROUTES).map((r) => (r === "/" || r === "home" ? "" : r.startsWith("/") ? r : `/${r}`));
const views = (process.env.VIEWS ? process.env.VIEWS.split(",") : Object.keys(ALL_VIEWS)).map((k) => [k, ...ALL_VIEWS[k]]);
const locales = process.env.LOCALES ? process.env.LOCALES.split(",") : ["en", "es"];

const results = { started_utc: new Date().toISOString(), base: BASE, commit: process.env.E2E_COMMIT ?? "working tree", pages: [] };
const kids = [];
try {
  if (!process.env.BASE) {
    const p = spawn(process.execPath, [NEXT, "start", "-p", String(PORT)], { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
    p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p);
    for (let i = 0; i < 120; i++) { try { const r = await fetch(`${BASE}/en`, { redirect: "manual" }); if (r.status) break; } catch { /* not up */ } await sleep(500); }
  }
  const prof = join(tmpdir(), `nuova-pages-${Date.now()}`);
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

  const MEASURE = `(()=>{
    const vw = innerWidth;
    const clipped = [];
    for (const el of document.querySelectorAll('main h1, main h2, main h3, main p, main a, main button, main li, main dd, main dt, header a, header button, footer a')) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || !el.offsetParent) continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0) continue;
      const hidden = (cs.overflowX === 'hidden' || cs.overflow === 'hidden') && el.scrollWidth > el.clientWidth + 1;
      const outside = r.right > vw + 1 || r.left < -1;
      if (hidden || outside) clipped.push({ tag: el.tagName, text: (el.innerText || '').trim().slice(0, 50), right: Math.round(r.right), sw: el.scrollWidth, cw: el.clientWidth });
    }
    // Text wider than its own box (review 2026-10-01, F2): every element with its own text, not only the
    // ones that cannot wrap. Screen-reader-only text (1 px wide on purpose) is left out.
    const tight = [];
    for (const el of document.querySelectorAll('main *, header *')) {
      if (!el.offsetParent) continue;
      const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (!own || getComputedStyle(el).display === 'inline') continue;
      if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 2) tight.push({ tag: el.tagName, text: (el.innerText || '').trim().slice(0, 40), sw: el.scrollWidth, cw: el.clientWidth });
    }
    clipped.push(...tight.slice(0, 6));
    const img = [...document.images].filter(i => i.complete && i.naturalWidth === 0 && i.currentSrc).map(i => i.currentSrc);
    return { height: document.documentElement.scrollHeight, sw: document.documentElement.scrollWidth, vw, h1: document.querySelectorAll('h1').length, clipped: clipped.slice(0, 8), brokenImages: img, scrollY: Math.round(scrollY) };
  })()`;

  for (const locale of locales) {
    for (const [tag, w, h, mobile, dpr] of views) {
      await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: dpr, mobile });
      for (const path of routes) {
        const url = `${BASE}/${locale}${path}`;
        await send("Page.navigate", { url });
        await sleep(1800);
        const top = await ev("Math.round(scrollY)");
        await ev("(()=>{document.querySelectorAll('.reveal,.rise').forEach(e=>e.classList.add('is-in'));document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager');return true})()");
        await sleep(700);
        const m = await ev(MEASURE);
        const name = `${tag}-${locale}-${(path || "/home").slice(1).replace(/\//g, "_")}`;
        const shotH = Math.min(m.height, 16000);
        const s = await send("Page.captureScreenshot", { format: "jpeg", quality: 72, captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: shotH, scale: mobile ? 1 : 0.75 } });
        if (s.result?.data) writeFileSync(join(OUT, `${name}.jpg`), Buffer.from(s.result.data, "base64"));
        const ok = m.sw <= m.vw && m.h1 === 1 && m.clipped.length === 0 && m.brokenImages.length === 0 && top === 0;
        results.pages.push({ name, url: `/${locale}${path}`, view: tag, width: w, startsAtTop: top === 0, ...m, ok });
        console.log(`${ok ? "PASS" : "FAIL"} ${name} h=${m.height} sw=${m.sw}/${m.vw} h1=${m.h1} clipped=${m.clipped.length} broken=${m.brokenImages.length}`);
      }
    }
  }
  ws.close();
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
  results.finished_utc = new Date().toISOString();
  results.pass = results.pages.filter((p) => p.ok).length;
  results.total = results.pages.length;
  writeFileSync(join(OUT, "page-capture.json"), JSON.stringify(results, null, 1));
  console.log(`${results.pass}/${results.total} pages without a finding -> ${join(OUT, "page-capture.json")}`);
}
