// Checks of the home excerpt (owner order 2026-10-05 §10): the hero world and the product demonstration, on a
// deployed origin, in headless Edge. Measures what the closing conditions name and writes one JSON:
//   depth    the four layers move by different amounts on scroll, the panel comes upright
//   reduced  with reduced motion nothing moves, the picture is complete, the demonstration does not run by itself
//   nojs     without JavaScript the hero's finished picture stands (a screenshot is written)
//   keyboard the steps, the full conversation and the task can be operated by keyboard
//   auto     the demonstration advances by itself only while in view, and stops at the first choice by hand
//   header   the navigation stands on the sky at the top and is the light bar after the first scroll
// Usage: BASE=https://… OUT=<folder> node scripts/design/excerpt-check.mjs
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = (process.env.BASE ?? "").replace(/\/$/, "");
if (!BASE) throw new Error("BASE=https://… is required");
const OUT = process.env.OUT ?? join(process.cwd(), "docs", "website_redesign", "evidence_2026-10-05", "checks");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PORT = 9361;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const results = { started_utc: new Date().toISOString(), base: BASE, checks: [] };
const check = (id, what, ok, evidence) => { results.checks.push({ id, what, ok: !!ok, evidence }); console.log(`${ok ? "PASS" : "FAIL"} ${id} ${what}`); };

const edge = spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${join(tmpdir(), "nuova-excerpt-" + Date.now())}`, `--remote-debugging-port=${PORT}`, "about:blank"], { stdio: "ignore" });
try {
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json(); break; } catch { await sleep(400); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const key = async (k, code, vk) => { const text = k === "Enter" ? "\r" : k; await send("Input.dispatchKeyEvent", { type: "keyDown", key: k, code, windowsVirtualKeyCode: vk, text }); await send("Input.dispatchKeyEvent", { type: "keyUp", key: k, code, windowsVirtualKeyCode: vk }); };
  await send("Page.enable"); await send("Runtime.enable"); await send("DOM.enable");

  const LAYERS = `JSON.stringify(Object.fromEntries([["far","[data-depth-layer=far]"],["mid","[data-depth-layer=mid]"],["front","[data-depth-layer=front]"],["panel",".hero-panel"]].map(([k,s])=>[k,getComputedStyle(document.querySelector(s)).transform])))`;
  const ty = (m) => { const a = /matrix\(([^)]+)\)/.exec(m); if (a) return +a[1].split(",")[5]; const b = /matrix3d\(([^)]+)\)/.exec(m); return b ? +b[1].split(",")[13] : 0; };

  for (const [view, w, h, mobile, dpr] of [["d1440", 1440, 900, false, 1], ["m390", 390, 844, true, 2]]) {
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: dpr, mobile });
    await send("Emulation.setEmulatedMedia", { features: [] });
    await send("Page.navigate", { url: `${BASE}/es` });
    await sleep(7000);
    const top = JSON.parse(await ev(LAYERS));
    await ev("window.scrollTo(0, 420)"); await sleep(600);
    const down = JSON.parse(await ev(LAYERS));
    const d = { far: ty(down.far) - ty(top.far), mid: ty(down.mid) - ty(top.mid), front: ty(down.front) - ty(top.front) };
    check(`${view}-depth`, "far, mid and front move by different amounts on scroll (far > mid > 0 > front)", d.far > d.mid && d.mid > 0 && d.front < 0, { moved_px_after_420_scroll: d });
    check(`${view}-panel`, "the panel leans back at the top of the page and is more upright after scrolling", top.panel !== down.panel && /matrix3d/.test(top.panel), { top: top.panel.slice(0, 90), down: down.panel.slice(0, 90) });
    // Nothing to read is under the foreground. Tested on what is painted, not on boxes: the foreground's shapes
    // are made hit-testable for a moment and a grid of points inside the headline, the buttons and the four story
    // parts of the panel is probed, at five scroll positions (the foreground travels with the scroll).
    const cover = JSON.parse(await ev(`(async()=>{
      const st=document.createElement('style'); st.textContent='.hero-world-stage > .hero-world-front svg * { pointer-events: visiblePainted !important } .hero-world-stage > .hero-world-ground { pointer-events: auto !important }'; document.head.appendChild(st);
      const hero=document.querySelector('.hero-world'); const end=hero.getBoundingClientRect().bottom+scrollY-innerHeight*0.4; const out=[];
      for (const y of [0, end*0.25, end*0.5, end*0.75, end]) {
        window.scrollTo(0, Math.round(y)); await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
        const row={scroll:Math.round(y), hits:[]};
        for (const sel of ['#hero-h1','[data-hero-lead]','[data-hero-cta]','.hero-cta-second','[data-hero-enquiry]','[data-hero-reply]','[data-hero-crm]','[data-hero-task]']) {
          const r=document.querySelector(sel).getBoundingClientRect(); let n=0, seen=0;
          for (let i=0;i<=8;i++) for (let j=0;j<=5;j++) { const x=r.left+2+(r.width-4)*i/8, yy=r.top+2+(r.height-4)*j/5; if (yy<0||yy>innerHeight||x<0||x>innerWidth) continue; seen++; const e=document.elementFromPoint(x,yy); if (e && e.closest('.hero-world-front, .hero-world-ground')) n++; }
          if (n>0) row.hits.push(sel+':'+n+'/'+seen);
        }
        out.push(row);
      }
      // control: the probe does see the foreground where it is painted (the foot of each foreground drawing)
      window.scrollTo(0, Math.round(hero.getBoundingClientRect().bottom+scrollY-innerHeight)); await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
      const control=[...document.querySelectorAll('.hero-world-front')].filter(f=>{const r=f.getBoundingClientRect(); const x=Math.min(innerWidth-4,Math.max(4,r.left+r.width*0.5)); const e=document.elementFromPoint(x, r.bottom-r.height*0.2); return !!(e && e.closest('.hero-world-front, .hero-world-ground'));}).length;
      st.remove(); window.scrollTo(0,0); return JSON.stringify({rows:out, control});
    })()`));
    check(`${view}-cover`, "no headline, button or story part of the panel is under a painted part of the foreground, at five scroll positions", cover.control === 2 && cover.rows.every((r) => r.hits.length === 0), cover);
  }

  // header
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: `${BASE}/es` }); await sleep(4000);
  const hTop = await ev("getComputedStyle(document.querySelector('header')).backgroundColor");
  await ev("window.scrollTo(0, 300)"); await sleep(500);
  const hDown = await ev("getComputedStyle(document.querySelector('header')).backgroundColor");
  check("header", "the navigation has no bar at the top of the page and the light bar after scrolling", /rgba\(0, 0, 0, 0\)|transparent/.test(hTop) && /25[0-3], 25[0-2], 24[6-9]/.test(hDown), { top: hTop, scrolled: hDown });

  // auto run and manual stop
  await ev("document.querySelector('#demo').scrollIntoView(); window.scrollBy(0, 80)"); await sleep(600);
  const a0 = JSON.parse(await ev("JSON.stringify({step:document.querySelector('[data-product-demo]').dataset.step, auto:document.querySelector('[data-product-demo]').dataset.auto})"));
  await sleep(7800);
  const a1 = JSON.parse(await ev("JSON.stringify({step:document.querySelector('[data-product-demo]').dataset.step, auto:document.querySelector('[data-product-demo]').dataset.auto})"));
  await ev("document.querySelectorAll('[data-demo-steps] button')[0].click()"); await sleep(8200);
  const a2 = JSON.parse(await ev("JSON.stringify({step:document.querySelector('[data-product-demo]').dataset.step, auto:document.querySelector('[data-product-demo]').dataset.auto})"));
  check("auto", "in view the demonstration advances after 7 s; after a choice by hand it stays where it was put", a0.auto === "on" && a1.step !== a0.step && a2.step === "1" && a2.auto === "off", { in_view: a0, after_7_8_s: a1, after_click_and_8_s: a2 });

  // keyboard: focus the third step and press Enter; then the task; then the full conversation
  await send("Page.navigate", { url: `${BASE}/es` }); await sleep(4000);
  await ev("document.querySelector('#demo').scrollIntoView(); document.querySelectorAll('[data-demo-steps] button')[2].focus()");
  await key("Enter", "Enter", 13); await sleep(900);
  const k1 = await ev("document.querySelector('[data-product-demo]').dataset.step + ' ' + (document.querySelector('[data-demo-view]')?.dataset.demoView)");
  await ev("document.querySelectorAll('[data-demo-steps] button')[3].focus()"); await key("Enter", "Enter", 13); await sleep(900);
  await ev("document.querySelector('[data-demo-take]').focus()"); await key(" ", "Space", 32); await sleep(600);
  const k2 = await ev("document.querySelector('[data-demo-view]').dataset.demoTask");
  await ev("document.querySelector('[data-demo-complete]').focus()"); await key("Enter", "Enter", 13); await sleep(600);
  const k3 = await ev("document.querySelector('[data-demo-view]').dataset.demoTask");
  await ev("document.querySelectorAll('[data-demo-steps] button')[1].focus()"); await key("Enter", "Enter", 13); await sleep(1200);
  await ev("document.querySelector('[data-demo-full]').focus()"); await key("Enter", "Enter", 13); await sleep(600);
  const k4 = JSON.parse(await ev("JSON.stringify({expanded:document.querySelector('[data-demo-full]').getAttribute('aria-expanded'), notice:(document.querySelector('[data-demo-notice]')?.innerText||'').slice(0,60)})"));
  check("keyboard", "steps, the task (take, done) and the full conversation work by keyboard", k1 === "3 record" && k2 === "taken" && k3 === "done" && k4.expanded === "true" && k4.notice.length > 20, { step3: k1, take: k2, done: k3, full: k4 });

  // reduced motion
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await send("Page.navigate", { url: `${BASE}/es` }); await sleep(1500);
  const r0 = JSON.parse(await ev(`JSON.stringify({items:[...document.querySelectorAll('[data-hero-surface] .seq-item')].map(e=>getComputedStyle(e).opacity), layers:${LAYERS}, replay:getComputedStyle(document.querySelector('[data-seq-replay]')).display})`));
  await ev("window.scrollTo(0, 420)"); await sleep(500);
  const r1 = JSON.parse(await ev(LAYERS));
  await ev("document.querySelector('#demo').scrollIntoView(); window.scrollBy(0, 80)"); await sleep(8000);
  const r2 = await ev("document.querySelector('[data-product-demo]').dataset.step + ' ' + document.querySelector('[data-product-demo]').dataset.auto");
  const still = JSON.parse(r0.layers);
  check("reduced", "reduced motion: everything visible at once, no layer moves, the panel keeps a fixed lean, the demonstration does not run by itself", r0.items.every((o) => o === "1") && still.far === "none" && still.front === "none" && still.panel === r1.panel && /matrix3d/.test(still.panel) && r2 === "1 off", { items_visible: r0.items.length, layers_top: still, panel_after_scroll_same: still.panel === r1.panel, replay: r0.replay, demo_after_8_s: r2 });
  await send("Emulation.setEmulatedMedia", { features: [] });

  // without JavaScript
  await send("Emulation.setScriptExecutionDisabled", { value: true });
  await send("Page.navigate", { url: `${BASE}/es` }); await sleep(3000);
  const doc = await send("DOM.getDocument", { depth: 1 });
  const q = async (sel) => (await send("DOM.querySelectorAll", { nodeId: doc.result.root.nodeId, selector: sel })).result.nodeIds.length;
  const nojs = { hero: await q(".hero-world"), story_parts: await q("[data-hero-enquiry],[data-hero-reply],[data-hero-crm],[data-hero-task]"), demo_steps: await q("[data-demo-steps] button"), html_js: await q("html.js") };
  const s = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(join(OUT, "hero-d1440-es-nojs.png"), Buffer.from(s.result.data, "base64"));
  check("nojs", "without JavaScript the hero's finished picture and the demonstration's steps are in the document", nojs.hero === 1 && nojs.story_parts === 4 && nojs.demo_steps === 4 && nojs.html_js === 0, nojs);
  ws.close();
} finally {
  edge.kill();
  results.pass = results.checks.filter((c) => c.ok).length;
  results.total = results.checks.length;
  writeFileSync(join(OUT, "excerpt-check.json"), JSON.stringify(results, null, 1));
  console.log(`${results.pass}/${results.total} checks passed -> ${join(OUT, "excerpt-check.json")}`);
}
