// Two grade criteria that are only decided on the FIRST screen at 375 x 812:
//   Kaufinteresse: "Aufgabe im ersten Bildschirm" - is Mila's callback task readable without
//     scrolling at all?
//   Premiumgefuehl: "feste Fussleiste verdeckt nichts, wo ein lokaler CTA sichtbar ist" - what do
//     the fixed bars cover?
// My own earlier figure here was WRONG (I reported a fixed bar of 299 px = 37 % of the screen; it
// was a sticky storytelling card far down the page) so this measures position:fixed elements only,
// at rest, with their real geometry, and says what each one covers.
const BASE = process.argv[2], LOC = process.argv[3] || "es";
const W = Number(process.argv[4] || 375), H = Number(process.argv[5] || 812);
const OUT = process.argv[6] || `ersteschirm-${LOC}-${W}.json`;
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
let ok = false;
for (let a = 1; a <= 3 && !ok; a++) {
  await send("Page.navigate", { url: `${BASE}/${LOC}/` }); await sleep(a === 1 ? 6400 : 7600);
  const c = await ev(`(()=>({len:(document.body.innerText||"").length,h1:!!document.querySelector("h1")}))()`);
  ok = c && !c.__error && c.h1 && c.len > 500;
}
if (!ok) { console.log("ABORT: home never loaded - NOT a pass"); process.exit(3); }
await ev(`window.scrollTo(0,0)`); await sleep(600);

const first = await ev(`(()=>{
  const vh=innerHeight;
  const txt=(e)=>((e.innerText||e.textContent||"").replace(/[\\s\\u00a0]+/g," ").trim());
  const out=[];
  for(const e of document.querySelectorAll("h1,h2,p,span,a,button,li,div")){
    const r=e.getBoundingClientRect();
    if(r.top<0||r.top>vh-6||r.height===0||r.width===0) continue;
    const t=txt(e); if(!t||t.length<3) continue;
    if(e.querySelector("h1,h2,p,span,a,button,li")) continue; // leaves only
    out.push({tag:e.tagName.toLowerCase(),y:Math.round(r.top),h:Math.round(r.height),t:t.slice(0,96)});
  }
  out.sort((a,b)=>a.y-b.y);
  const all=txt(document.body);
  const vis=out.map(o=>o.t).join(" ");
  return {vh, items:out,
    taskWords:{llamar:/Llamar a Mila|Call Mila/i.test(vis), ref:/9895153/.test(vis),
      tarea:/TAREA|TASK/i.test(vis), hora:/17:00|5 pm/i.test(vis)},
    milaAnywhere:(all.match(/Mila/g)||[]).length};})()`);

const fixed = await ev(`(()=>{const vh=innerHeight, vw=innerWidth; const res=[];
  for(const e of document.querySelectorAll("body *")){
    const cs=getComputedStyle(e);
    if(cs.position!=="fixed") continue;
    if(cs.display==="none"||cs.visibility==="hidden"||Number(cs.opacity)===0) continue;
    const r=e.getBoundingClientRect();
    if(r.width===0||r.height===0) continue;
    const onScreen=(r.bottom>0 && r.top<vh);
    res.push({tag:e.tagName.toLowerCase(),cls:String(e.className||"").slice(0,44),
      w:Math.round(r.width),h:Math.round(r.height),top:Math.round(r.top),bottom:Math.round(r.bottom),
      onScreen, pctOfScreen:Math.round((r.height/vh)*1000)/10,
      t:((e.innerText||"").replace(/[\\s\\u00a0]+/g," ").trim().slice(0,60))});
  }
  // what sits UNDER an on-screen fixed bar: read the element at the bar's own band
  for(const f of res){ if(!f.onScreen) continue;
    const y=Math.round((f.top+f.bottom)/2);
    const at=document.elementFromPoint(Math.round(vw/2), Math.max(1,Math.min(vh-1,y)));
    f.coversAtCentre = at?(at.tagName.toLowerCase()+" "+((at.innerText||"").replace(/[\\s\\u00a0]+/g," ").trim().slice(0,40))):"nothing";
  }
  return {vh,vw,res};})()`);

console.log(`\n######## first screen and fixed bars  ${LOC}  ${W}x${H}  build ${PIN}`);
console.log(`  visible without scrolling (${first.items.length} text leaves, screen ${first.vh}px):`);
for (const o of first.items) console.log(`     y=${String(o.y).padStart(4)} h=${String(o.h).padStart(3)} ${o.tag.padEnd(6)} ${JSON.stringify(o.t)}`);
console.log(`\n  Mila's callback task in the FIRST screen:`);
console.log(`     "Llamar a Mila"/"Call Mila": ${first.taskWords.llamar ? "YES" : "NO"}   the ref. 9895153: ${first.taskWords.ref ? "YES" : "NO"}   the word TAREA/TASK: ${first.taskWords.tarea ? "YES" : "NO"}   the time: ${first.taskWords.hora ? "YES" : "NO"}`);
console.log(`     (Mila appears ${first.milaAnywhere}x on the whole page)`);
console.log(`\n  position:fixed elements at rest: ${fixed.res.length}`);
for (const f of fixed.res) console.log(`     ${f.onScreen ? "ON SCREEN " : "off-screen"} ${String(f.w)}x${String(f.h)} top=${f.top} (${f.pctOfScreen}% of the screen) ${f.tag}.${f.cls} ${JSON.stringify(f.t)}${f.coversAtCentre ? "  covers-> " + JSON.stringify(f.coversAtCentre) : ""}`);
const onScreenPx = fixed.res.filter((f) => f.onScreen).reduce((n, f) => n + f.h, 0);
console.log(`\n  fixed pixels actually on the screen at rest: ${onScreenPx} of ${fixed.vh} (${Math.round((onScreenPx / fixed.vh) * 1000) / 10}%)`);
const PIN2 = await build();
console.log(`  build start ${PIN}  end ${PIN2}  ${PIN === PIN2 ? "STABLE" : "*** MOVED - VOID ***"}`);
const fs = await import("node:fs");
fs.writeFileSync(OUT, JSON.stringify({ pin: PIN, pinEnd: PIN2, locale: LOC, viewport: `${W}x${H}`, first, fixed, onScreenPx }, null, 1));
process.exit(PIN === PIN2 ? 0 : 4);
