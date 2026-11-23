// The owner decided on 13.11. that the demo should RUN BY ITSELF (auto-run wanted; my A-10 was
// withdrawn because of it). On the reference build fdffcf4 it did not yet auto-run and stopped on a
// click. W-1 on bea7d19 showed data-demo-auto="false" and, when arriving through the hero link,
// data-demo-entered="end" with phase 12 / done=true -- i.e. the finished state, not a run.
//
// Two different questions, and they must not be mixed:
//   (1) arriving through "Ver cómo queda la tarea" -> is the finished task shown? (W-1: yes)
//   (2) scrolling the demo into view NORMALLY -> does it start on its own, with no tap?
// This measures (2): no clicks at all, the section scrolled into view, then watched. Also with
// prefers-reduced-motion, where a run that respects the setting may legitimately show the end state
// at once instead of animating.
const BASE = process.argv[2], LOC = process.argv[3] || "es";
const W = Number(process.argv[4] || 390), H = Number(process.argv[5] || 844);
const CDP = 9477, sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => { const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return { __error: (r.result.exceptionDetails.exception?.description || "").slice(0, 250) };
  return r.result?.result?.value; };
const build = async () => { try { const r = await fetch(`${BASE}/api/build`, { signal: AbortSignal.timeout(20000) }); const j = await r.json(); return `${j.commit?.slice(0, 7)}/${j.deployment}`; } catch { return "UNREACHABLE"; } };
const PIN = await build();
if (PIN === "UNREACHABLE") { console.log("ABORT: build endpoint unreachable - nothing compared, NOT a pass"); process.exit(2); }
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });

const attrs = () => ev(`(()=>{const d=document.querySelector("[data-demo]");
  if(!d) return null; const o={}; for(const a of d.attributes) if(a.name.startsWith("data-demo")) o[a.name]=a.value;
  const r=d.getBoundingClientRect();
  return {a:o, inView:(r.top < innerHeight && r.bottom > 0), top:Math.round(r.top),
    textLen:(d.innerText||"").replace(/[\\s\\u00a0]+/g," ").trim().length};})()`);

const R = { pin: PIN, locale: LOC, viewport: `${W}x${H}`, cases: [] };
for (const reduced of [false, true]) {
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: reduced ? "reduce" : "no-preference" }] });
  let ok = false;
  for (let a = 1; a <= 3 && !ok; a++) {
    await send("Page.navigate", { url: `${BASE}/${LOC}` });
    await sleep(a === 1 ? 6200 : 7600);
    const c = await ev(`(()=>({len:(document.body.innerText||"").length,d:!!document.querySelector("[data-demo]")}))()`);
    ok = c && !c.__error && c.d && c.len > 500;
  }
  if (!ok) { console.log(`\n  reduced=${reduced}: ABORT - page or demo never loaded, NOT a pass`); R.cases.push({ reduced, loaded: false }); continue; }

  const atLoad = await attrs();
  // Scroll it into view WITHOUT any click, the way a reader arrives -- PROGRESSIVELY. An instant
  // scrollIntoView jump made the section report entered="end" with phase 12 at once, which is an
  // artifact of the jump and not the page: a human scrolls in steps, and an observer that sees the
  // section appear already finished has been given no chance to start. So: small steps, then watch.
  // Step until the section really SITS there: its top at or above ~100px, i.e. it fills the screen
  // the way it does for a reader who has scrolled to it. Stopping at "top < 60% of the viewport"
  // left data-demo-entered="not-yet" -- the section's own threshold had not been met, so watching
  // from there measured nothing. Log `entered` on every tick so the threshold is visible.
  let steps = 0;
  for (let i = 0; i < 160; i++) {
    const at = await ev(`(()=>{const d=document.querySelector("[data-demo]");
      if(!d) return null; const before=window.scrollY; window.scrollBy(0,140);
      const r=d.getBoundingClientRect();
      return {top:Math.round(r.top), y:window.scrollY, moved:(window.scrollY>before),
        entered:d.getAttribute("data-demo-entered"), reached:(r.top <= 100)};})()`);
    steps++;
    if (!at || at.reached || !at.moved) break;
    await sleep(110);
  }
  const place = await ev(`(()=>{const d=document.querySelector("[data-demo]");const r=d.getBoundingClientRect();
    return {top:Math.round(r.top),height:Math.round(r.height),visible:Math.round(Math.min(r.bottom,innerHeight)-Math.max(r.top,0)),vh:innerHeight};})()`);
  console.log(`  (scrolled in ${steps} steps: section top=${place?.top} of height ${place?.height}, ${place?.visible}px of ${place?.vh}px screen filled)`);
  await sleep(1200);
  const onArrival = await attrs();
  const watch = [];
  for (let s = 1; s <= 7; s++) { await sleep(2000); const a = await attrs(); watch.push({ afterSec: s * 2, run: a?.a["data-demo-run"], phase: a?.a["data-demo-phase"], done: a?.a["data-demo-done"], entered: a?.a["data-demo-entered"], textLen: a?.textLen }); }
  const started = watch.some((x) => x.run && x.run !== onArrival?.a["data-demo-run"]);
  const phaseMoved = watch.some((x) => x.phase !== onArrival?.a["data-demo-phase"]);
  const textGrew = watch.some((x) => (x.textLen || 0) > (onArrival?.textLen || 0) + 20);
  R.cases.push({ reduced, atLoad: atLoad?.a, onArrival: onArrival?.a, onArrivalTextLen: onArrival?.textLen, watch, started, phaseMoved, textGrew });

  console.log(`\n######## ${LOC} ${W}x${H}  prefers-reduced-motion: ${reduced ? "reduce" : "no-preference"}   build ${PIN}`);
  console.log(`  at load (before scrolling):  auto=${atLoad?.a["data-demo-auto"]} run=${atLoad?.a["data-demo-run"]} phase=${atLoad?.a["data-demo-phase"]} done=${atLoad?.a["data-demo-done"]} entered=${atLoad?.a["data-demo-entered"]}`);
  console.log(`  scrolled into view, no tap:  auto=${onArrival?.a["data-demo-auto"]} run=${onArrival?.a["data-demo-run"]} phase=${onArrival?.a["data-demo-phase"]} done=${onArrival?.a["data-demo-done"]} entered=${onArrival?.a["data-demo-entered"]}  textLen=${onArrival?.textLen}`);
  for (const x of watch) console.log(`    +${String(x.afterSec).padStart(2)}s  run=${x.run} phase=${String(x.phase).padEnd(3)} done=${String(x.done).padEnd(5)} entered=${String(x.entered).padEnd(9)} textLen=${x.textLen}`);
  console.log(`  started on its own: ${started ? "YES" : "NO"}   phase moved: ${phaseMoved ? "YES" : "NO"}   text grew: ${textGrew ? "YES" : "NO"}`);
}
await send("Emulation.setEmulatedMedia", { features: [] });
const PIN2 = await build(); R.pinEnd = PIN2;
console.log(`\n        build start ${PIN}  end ${PIN2}  ${PIN === PIN2 ? "STABLE" : "*** MOVED - VOID ***"}`);
const fs = await import("node:fs"); fs.writeFileSync(process.argv[6] || `autorun-${LOC}-${W}.json`, JSON.stringify(R, null, 1));
process.exit(PIN === PIN2 ? 0 : 4);
