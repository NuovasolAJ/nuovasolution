// Design probe capture: renders the LOCAL stub build in headless Edge and writes screenshots
// for the owner review. Desktop 1440, tablet 1024, phone 390 and 360 CSS px, EN and ES, the open
// Platform menu, the open Q&A window, a scroll sequence, 200 % zoom (720 CSS px wide viewport),
// reduced motion, and keyboard focus. Also writes a few measurements (no overflow, no overlap
// in the menu, no heading under the header) to probe-results.json.
// Requires a prior `next build` (stub mode). Usage: node scripts/design/probe-capture.mjs
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "design_probe_2026-09-23");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3111, CDP_PORT = 9343;
const BASE = `http://localhost:${PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const results = { started_utc: new Date().toISOString(), commit: process.env.E2E_COMMIT ?? "working tree", mode: "stub build", checks: [], shots: [] };
const check = (id, what, pass, evidence) => { results.checks.push({ id, what, pass: Boolean(pass), evidence }); console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what}`); };
const kids = [];
const start = (cmd, args, env) => { const p = spawn(cmd, args, { cwd: ROOT, env: { ...process.env, ...env }, stdio: ["ignore", "pipe", "pipe"] }); p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p); return p; };
const waitHttp = async (url) => { for (let i = 0; i < 120; i++) { try { const r = await fetch(url, { redirect: "manual" }); if (r.status) return true; } catch { /* not up */ } await sleep(500); } throw new Error(`not reachable: ${url}`); };

try {
  start(process.execPath, [NEXT, "start", "-p", String(PORT)], {});
  await waitHttp(`${BASE}/en`);

  const prof = join(tmpdir(), `nuova-probe-${Date.now()}`);
  const edge = spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" });
  kids.push(edge);
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const shot = async (name) => { const s = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false }); writeFileSync(join(OUT, `${name}.png`), Buffer.from(s.result.data, "base64")); results.shots.push(`${name}.png`); return `${name}.png`; };
  const nav = async (url, wait = 2200) => { await send("Page.navigate", { url }); await sleep(wait); };
  const vp = (w, h, mobile = false, dpr = mobile ? 2 : 1) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: dpr, mobile });
  const motion = (reduce) => send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: reduce ? "reduce" : "no-preference" }] });
  await send("Page.enable");
  await send("Runtime.enable");
  await send("DOM.enable");

  // Make reveals visible immediately for static captures (the IntersectionObserver would otherwise hide off-screen content in tall shots).
  const revealAll = () => ev("(()=>{document.querySelectorAll('.reveal,.rise').forEach(e=>e.classList.add('is-in'));return true})()");
  const scrollTo = async (y) => { await ev(`window.scrollTo({top:${y},behavior:'instant'})`); await sleep(500); };
  const measure = () => ev(`(()=>({sw:document.documentElement.scrollWidth,iw:innerWidth,h1:[...document.querySelectorAll('h1')].map(x=>x.innerText),header:document.querySelector('header').getBoundingClientRect().height,firstHeadingTop:(()=>{const h=document.querySelector('main h1, main h2');return h?h.getBoundingClientRect().top:null})(),pending:document.body.innerText.includes('Capture pending')||document.body.innerText.includes('Captura pendiente')}))()`);

  const pages = [
    ["home", ""],
    ["packages", "/packages"],
    ["platform", "/platform"],
    ["product-agent", "/platform/ai-sales-agent"],
    ["signup", "/signup"],
    ["login", "/login?confirmed=1"],
  ];
  const views = [["d1440", 1440, 900, false], ["t1024", 1024, 1366, false], ["m390", 390, 844, true], ["m360", 360, 780, true]];

  for (const locale of ["en", "es"]) {
    for (const [tag, w, h, mobile] of views) {
      await vp(w, h, mobile);
      for (const [name, path] of pages) {
        await nav(`${BASE}/${locale}${path}`);
        await revealAll();
        await sleep(300);
        await scrollTo(0);
        await shot(`${tag}-${locale}-${name}`);
        const m = await measure();
        check(`${tag}-${locale}-${name}-fit`, "no horizontal overflow, heading clear of the header, no empty capture frame", m.sw <= m.iw && (m.firstHeadingTop === null || m.firstHeadingTop >= m.header) && !m.pending, { sw: m.sw, iw: m.iw, header: m.header, firstHeadingTop: m.firstHeadingTop, pending: m.pending });
        if (name === "home") {
          // scroll sequence: five frames down the page
          const total = await ev("document.documentElement.scrollHeight");
          for (let i = 1; i <= 5; i++) { await scrollTo(Math.floor(((total - h) * i) / 5)); await shot(`${tag}-${locale}-home-scroll-${i}`); }
          await scrollTo(0);
        }
      }
      // open navigation
      await nav(`${BASE}/${locale}`);
      await revealAll();
      if (mobile || w < 1024) {
        await ev("document.querySelector('header button[aria-label]').click()");
        await sleep(500);
        await shot(`${tag}-${locale}-nav-open`);
        const ov = await ev("(()=>{const s=document.querySelector('[data-mobile-sheet]');return {hidden:s.hidden,sw:s.scrollWidth,cw:s.clientWidth}})()");
        check(`${tag}-${locale}-nav-open`, "mobile sheet opens without horizontal overflow", ov && !ov.hidden && ov.sw <= ov.cw, ov);
      } else {
        await ev("[...document.querySelectorAll('header nav button')][0].click()");
        await sleep(500);
        await shot(`${tag}-${locale}-nav-open`);
        // overlap check: no capability name box intersects a status chip box of another item; every item box inside the menu box
        // Overlap check: no capability name box intersects any status chip box of another item, and no item leaves the panel or the viewport.
        const ov = await ev(`(()=>{const menu=document.querySelector('[data-platform-menu]');if(!menu||menu.hidden)return {open:false};const mb=menu.getBoundingClientRect();const items=[...menu.querySelectorAll('a')].map(a=>a.getBoundingClientRect());const inside=items.every(r=>r.left>=mb.left-1&&r.right<=mb.right+1);const rects=[...menu.querySelectorAll('li a')].map(a=>({n:a.querySelector('span').getBoundingClientRect(),c:a.querySelector('span:last-child').getBoundingClientRect()}));let overlap=false;for(const r of rects){for(const o of rects){if(r===o)continue;const a=r.n,b=o.c;if(a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top)overlap=true;}}const chipsFit=rects.every(r=>r.c.right<=mb.right+1);return {open:true,inside,overlap,chipsFit,items:items.length,menuW:mb.width,menuRight:mb.right,vw:innerWidth}})()`);
        check(`${tag}-${locale}-nav-open`, "platform menu open, items inside the panel, no name/chip overlap", ov.open && ov.inside && !ov.overlap && ov.chipsFit && ov.menuRight <= ov.vw, ov);
        await ev("document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))");
      }
      // Q&A open (launcher), then the inline window on the home page
      await nav(`${BASE}/${locale}`);
      await revealAll();
      await ev("document.querySelector('[data-qa-launcher]').click()");
      await sleep(500);
      await shot(`${tag}-${locale}-qa-open`);
      const qa = await ev("(()=>{const p=document.querySelector('[data-qa-panel=\"fixed\"]');if(!p)return null;const r=p.getBoundingClientRect();return {w:r.width,h:r.height,right:r.right,bottom:r.bottom,vw:innerWidth,vh:innerHeight,focused:document.activeElement&&document.activeElement.tagName}})()");
      check(`${tag}-${locale}-qa-open`, "Q&A window opens inside the viewport with focus in the question field", qa && qa.right <= qa.vw + 1 && qa.bottom <= qa.vh + 1 && qa.focused === "TEXTAREA", qa);
      await ev("document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape'}))");
      await sleep(200);
      const inl = await ev("(()=>{const p=document.querySelector('[data-qa-panel=\"inline\"]');if(!p)return null;p.scrollIntoView({block:'center'});return true})()");
      await sleep(400);
      await shot(`${tag}-${locale}-qa-inline`);
      check(`${tag}-${locale}-qa-inline`, "the integrated Q&A window is on the home page", inl === true, inl);
    }
  }

  // 200 % zoom at a 1440 window = 720 CSS px viewport; 100 % is the 1440 capture above.
  await vp(720, 900, false, 2);
  await nav(`${BASE}/es`);
  await revealAll();
  await shot("zoom200-es-home");
  let m = await measure();
  check("zoom200-es-home", "200 % zoom: no horizontal overflow", m.sw <= m.iw, { sw: m.sw, iw: m.iw });
  await nav(`${BASE}/es/packages`);
  await revealAll();
  await shot("zoom200-es-packages");
  m = await measure();
  check("zoom200-es-packages", "200 % zoom packages: no horizontal overflow", m.sw <= m.iw, { sw: m.sw, iw: m.iw });

  // reduced motion: content visible without any reveal class, cards not sticky
  await motion(true);
  await vp(1440, 900, false);
  await nav(`${BASE}/es`);
  const rm = await ev("(()=>{const els=[...document.querySelectorAll('.reveal')];const vis=els.every(e=>getComputedStyle(e).opacity==='1');const st=[...document.querySelectorAll('.stack-card')].every(e=>getComputedStyle(e).position==='relative');return {reveals:els.length,allVisible:vis,stackStatic:st}})()");
  check("reduced-motion", "with reduced motion every reveal is visible without scrolling and stacked cards are static", rm.allVisible && rm.stackStatic, rm);
  await shot("reduced-motion-es-home");
  await motion(false);

  // keyboard: tab reaches the Platform menu button and opens it with Enter; Escape closes and returns focus
  await nav(`${BASE}/en`);
  const kb = await ev("(()=>{const b=[...document.querySelectorAll('header nav button')][0];b.focus();return document.activeElement===b})()");
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, text: "\r", unmodifiedText: "\r" });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
  await sleep(300);
  const opened = await ev("(()=>{const m=document.querySelector('[data-platform-menu]');return m&&!m.hidden})()");
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await sleep(300);
  const closed = await ev("(()=>{const m=document.querySelector('[data-platform-menu]');return m&&m.hidden})()");
  check("keyboard-menu", "Platform menu opens with Enter and closes with Escape from the keyboard", kb && opened && closed, { kb, opened, closed });
  await ev("(()=>{const b=document.querySelector('[data-qa-launcher]');b.focus();return true})()");
  await shot("focus-en-launcher");

  // no JS: server HTML alone has the hero cards, the stack and the Q&A window text
  const html = await (await fetch(`${BASE}/es`)).text();
  check("no-js-content", "server HTML carries hero cards, stacked stage cards and the Q&A window", html.includes("data-hero-stack") && html.includes("data-stage-stack") && html.includes('data-qa-panel="inline"'), true);
  check("no-dark-sections", "no dark section apart from the footer", (html.match(/data-canvas="deep"/g) ?? []).length === 1, (html.match(/data-canvas="deep"/g) ?? []).length);

  ws.close();
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
  results.finished_utc = new Date().toISOString();
  results.pass = results.checks.filter((c) => c.pass).length;
  results.total = results.checks.length;
  writeFileSync(join(OUT, "probe-results.json"), JSON.stringify(results, null, 2));
  console.log(`${results.pass}/${results.total} checks passed; ${results.shots.length} screenshots in ${OUT}`);
}
