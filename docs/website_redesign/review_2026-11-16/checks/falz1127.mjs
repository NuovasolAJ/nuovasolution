// RV6 own measurement, E2 candidate dbd14d8 on the deployment.
// Seven windows x ES/EN x with and without the preview furniture.
// Headroom in px for the task card ([data-hero-scene-task]) and the main action ([data-hero-cta=task]):
//   positive = the element's lower edge sits above the fold, negative = below it.
// The grade falls on the figure WITHOUT the furniture (a released build serves 0 px of it); the
// figure WITH it is named beside it at every window, because that is what the owner sees in the preview.
// Sanity rule: the with/without delta MUST equal the measured furniture height, otherwise the row is VOID.
const BASE = process.argv[2];
const OUT = process.argv[3] || "falz-1127.json";
const CDP = 9477, sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const WINDOWS = [[360, 640, 1], [375, 667, 1], [390, 844, 1], [414, 896, 1], [1280, 720, 0], [1366, 768, 0], [1440, 900, 0]];

const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const target = list.find((t) => t.type === "page");
if (!target) { console.log("ABORT: no page target"); process.exit(2); }
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => {
  const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return { __error: (r.result.exceptionDetails.exception?.description || "").slice(0, 300) };
  return r.result?.result?.value;
};
const build = async () => { try { const r = await fetch(`${BASE}/api/build`, { signal: AbortSignal.timeout(20000) }); const j = await r.json(); return `${j.commit}|${j.deployment}|${j.env}|${j.mode}`; } catch (e) { return "UNREACHABLE"; } };

const PIN_START = await build();
if (PIN_START === "UNREACHABLE") { console.log("ABORT: build endpoint unreachable - NOT a pass"); process.exit(2); }
await send("Page.enable");

const MEASURE = `(()=>{
  const vh = innerHeight;
  const g = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), h: Math.round(r.height), w: Math.round(r.width), vis: r.width>0 && r.height>0 }; };
  const strip = (s) => { const e = document.querySelector(s); if (!e) return 0; const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); if (cs.position === "fixed" || cs.display === "none") return 0; return Math.round(r.height); };
  const task = g("[data-hero-scene-task]"), main = g("[data-hero-cta='task']");
  const over = (s) => { const e = document.querySelector(s); if (!e) return null; return e.scrollHeight + "/" + e.clientHeight; };
  return {
    vh, dpr: devicePixelRatio,
    env: strip("[data-env]"), sw: strip("[data-preview-switches]"),
    envPresent: !!document.querySelector("[data-env]"), swPresent: !!document.querySelector("[data-preview-switches]"),
    marker: !!document.querySelector("[data-env-marker]"),
    task, main,
    taskHead: task ? vh - task.bottom : null,
    mainHead: main ? vh - main.bottom : null,
    heroMin: (()=>{ const h=document.querySelector(".hf"); return h ? Math.round(h.getBoundingClientRect().height) : null; })(),
    edge: (()=>{ const e=document.querySelector(".hf-edge"); if(!e) return null; const r=e.getBoundingClientRect(); const cs=getComputedStyle(e); return { w: Math.round(r.width), h: Math.round(r.height), bottom: Math.round(r.bottom), display: cs.display, href: e.getAttribute("href") }; })(),
    overflow: { scene: over(".hf-scene"), msg: over(".hf-scene-msg"), task: over(".hf-scene-task"), h1: over("h1"), lead: over(".hf-lead"), words: over(".hf-words") },
    h1text: (document.querySelector("h1")?.innerText||"").replace(/\\s+/g," ").trim().slice(0,120),
    leadtext: (document.querySelector(".hf-lead")?.innerText||"").replace(/\\s+/g," ").trim().slice(0,260),
    tasktext: (document.querySelector("[data-hero-scene-task]")?.innerText||"").replace(/\\s+/g," ").trim().slice(0,160)
  };
})()`;

const rows = [];
for (const [W, H, MOB] of WINDOWS) {
  for (const LOC of ["es", "en"]) {
    await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: MOB ? 2 : 1, mobile: !!MOB });
    await send("Emulation.setTouchEmulationEnabled", { enabled: !!MOB, maxTouchPoints: MOB ? 5 : 0 });
    let ok = false, withF = null;
    for (let a = 1; a <= 3 && !ok; a++) {
      await send("Page.navigate", { url: `${BASE}/${LOC}/` });
      await sleep(a === 1 ? 6800 : 8200);
      await ev(`window.scrollTo(0,0)`); await sleep(500);
      withF = await ev(MEASURE);
      ok = withF && !withF.__error && withF.task && withF.main && withF.h1text.length > 8;
    }
    if (!ok) { rows.push({ viewport: `${W}x${H}`, locale: LOC, VOID: "home never loaded with both anchors - NOT a pass", raw: withF }); continue; }
    // remove the two preview-only strips from the DOM; 100svh does not change, so the hero's
    // min-height does not change - the content simply moves up by the strips' height
    const removed = await ev(`(()=>{let n=0;for(const s of ["[data-env]","[data-preview-switches]"]){for(const e of document.querySelectorAll(s)){e.remove();n++;}}return n;})()`);
    await sleep(900);
    await ev(`window.scrollTo(0,0)`); await sleep(400);
    const noF = await ev(MEASURE);
    const furniture = (withF.env || 0) + (withF.sw || 0);
    const dTask = (noF.taskHead ?? 0) - (withF.taskHead ?? 0);
    const dMain = (noF.mainHead ?? 0) - (withF.mainHead ?? 0);
    rows.push({
      viewport: `${W}x${H}`, locale: LOC, vh: withF.vh,
      furniturePx: furniture, envPx: withF.env, swPx: withF.sw, removedNodes: removed,
      with_task: withF.taskHead, with_main: withF.mainHead,
      without_task: noF.taskHead, without_main: noF.mainHead,
      deltaTask: dTask, deltaMain: dMain,
      sane: dTask === furniture && dMain === furniture,
      markerStillThere: noF.marker,
      heroMin_with: withF.heroMin, heroMin_without: noF.heroMin,
      edge: noF.edge,
      overflow: noF.overflow,
      h1: noF.h1text, lead: noF.leadtext, taskcard: noF.tasktext
    });
    console.error(`${W}x${H} ${LOC}: furniture=${furniture} task ${withF.taskHead}->${noF.taskHead} main ${withF.mainHead}->${noF.mainHead} sane=${dTask === furniture && dMain === furniture}`);
  }
}
const PIN_END = await build();
const result = { probe: "falz1127", base: BASE, pin_start: PIN_START, pin_end: PIN_END, pinned: PIN_START === PIN_END, when: new Date().toISOString(), rows };
if (PIN_START !== PIN_END) result.VOID = "build moved during the run - every figure VOID";
await (await import("node:fs")).promises.writeFile(OUT, JSON.stringify(result, null, 1));
console.log(JSON.stringify({ pinned: result.pinned, pin: PIN_START, rows: rows.length, void: rows.filter(r => r.VOID).length, insane: rows.filter(r => r.sane === false).length, out: OUT }, null, 1));
process.exit(0);
