// The demo auto-runs and then LOOPS: the autorun probe saw done=true at +10s and run=2/phase=0 at
// +14s. The end state is the payoff of W-1 -- the task card with Mila's callback, the state, what
// she is looking for and what she asks for. If the loop wipes it before it can be read, the most
// important moment of the demo is the one a visitor does not get to read.
//
// So: measure how long the end state STANDS, at 400ms resolution, and count the words on the card
// that a reader would have to take in. No taps -- the run must be the page's own.
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
if (PIN === "UNREACHABLE") { console.log("ABORT: build endpoint unreachable - NOT a pass"); process.exit(2); }
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] });

let ok = false;
for (let a = 1; a <= 3 && !ok; a++) {
  await send("Page.navigate", { url: `${BASE}/${LOC}` }); await sleep(a === 1 ? 6200 : 7600);
  const c = await ev(`(()=>({len:(document.body.innerText||"").length,d:!!document.querySelector("[data-demo]")}))()`);
  ok = c && !c.__error && c.d && c.len > 500;
}
if (!ok) { console.log("ABORT: page or demo never loaded - NOT a pass"); process.exit(3); }

for (let i = 0; i < 160; i++) {
  const at = await ev(`(()=>{const d=document.querySelector("[data-demo]"); if(!d) return null;
    const before=window.scrollY; window.scrollBy(0,140); const r=d.getBoundingClientRect();
    return {moved:(window.scrollY>before), reached:(r.top <= 100)};})()`);
  if (!at || at.reached || !at.moved) break;
  await sleep(110);
}

const read = () => ev(`(()=>{const d=document.querySelector("[data-demo]"); if(!d) return null;
  const card=d.querySelector("[data-demo-task],[class*='task'],[class*='tarea']");
  const t=(x)=>((x&&x.innerText)||"").replace(/[\\s\\u00a0]+/g," ").trim();
  return {run:d.getAttribute("data-demo-run"), phase:d.getAttribute("data-demo-phase"),
    done:d.getAttribute("data-demo-done"), entered:d.getAttribute("data-demo-entered"),
    cardWords:t(card)?t(card).split(" ").length:null, cardLen:t(card).length};})()`);

console.log(`\n######## how long does the end state stand?  ${LOC} ${W}x${H}  build ${PIN}`);
const trace = []; const t0 = Date.now();
let doneAt = null, restartAt = null, firstRun = null, cardWords = null;
for (let i = 0; i < 120; i++) {
  const s = await read();
  if (!s) break;
  const ms = Date.now() - t0;
  trace.push({ ms, ...s });
  if (firstRun === null && s.run && s.run !== "0") firstRun = s.run;
  if (doneAt === null && s.done === "true") { doneAt = ms; cardWords = s.cardWords; }
  if (doneAt !== null && s.done !== "true" && restartAt === null) { restartAt = ms; break; }
  await sleep(400);
}
await send("Emulation.setEmulatedMedia", { features: [] });
const PIN2 = await build();
const dwell = doneAt !== null && restartAt !== null ? restartAt - doneAt : null;
console.log(`  the run started on its own (run=${firstRun})`);
console.log(`  end state reached at   +${doneAt} ms after watching began`);
console.log(`  loop restarted at      ${restartAt === null ? "not within the window" : "+" + restartAt + " ms"}`);
console.log(`  SO THE FINISHED TASK STANDS FOR: ${dwell === null ? "longer than the window" : dwell + " ms"}`);
console.log(`  words on the task card at that moment: ${cardWords ?? "card not found by selector"}`);
if (dwell !== null && cardWords) {
  // 200 words a minute is a common adult silent-reading rate; a careful read of a dense card is slower
  const needMs = Math.round((cardWords / 200) * 60000);
  console.log(`  a 200-words-a-minute reader needs about ${needMs} ms for ${cardWords} words -> ${dwell < needMs ? "*** NOT ENOUGH TIME" : "enough time"}`);
}
console.log(`  build start ${PIN}  end ${PIN2}  ${PIN === PIN2 ? "STABLE" : "*** MOVED - VOID ***"}`);
const fs = await import("node:fs");
fs.writeFileSync(process.argv[6] || `verweil-${LOC}-${W}.json`, JSON.stringify({ pin: PIN, pinEnd: PIN2, locale: LOC, doneAt, restartAt, dwell, cardWords, trace }, null, 1));
process.exit(PIN === PIN2 ? 0 : 4);
