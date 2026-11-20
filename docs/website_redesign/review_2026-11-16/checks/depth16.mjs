// Depth on the fixed build: settled height, TWO passes per view, preview furniture separated.
// The two-pass rule exists because a single pass once gave 22.3 where the settled figure was 21.0:
// the loop must re-read scrollHeight at EVERY step, and the figure must be confirmed by a second pass.
import { writeFileSync } from "node:fs";
const BASE = process.argv[2], TAG = process.argv[3];
const CDP = 9477, sleep = ms => new Promise(r => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find(t => t.type === "page").webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async x => {
  const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return { __error: (r.result.exceptionDetails.exception?.description || "").slice(0, 200) };
  return r.result?.result?.value;
};
await send("Page.enable");
const pass = () => ev(`(async()=>{var y=0,steps=0;
  while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});
  await new Promise(r=>setTimeout(r,120));y+=600;steps++;if(steps>300)break;}
  scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,400));
  return {steps:steps,h:document.documentElement.scrollHeight,vh:innerHeight}})()`);
// the preview's own furniture, which a live build will not carry
const FURNITURE = `(()=>{let px=0;const parts=[];
  for(const s of ["[data-env]","[data-preview-switches]","[data-env-marker]"]){
    for(const e of document.querySelectorAll(s)){const r=e.getBoundingClientRect();
      const fixed=getComputedStyle(e).position==="fixed";
      if(!fixed) px+=Math.round(r.height);
      parts.push({sel:s,h:Math.round(r.height),fixed:fixed});}}
  return {px:px,parts:parts};})()`;

const buildAtStart = (await (await fetch(`${BASE}/api/build`)).json());
const R = { tag: TAG, build: buildAtStart, runs: {} };
const load = async (url, ms = 5200) => {
  for (let a = 1; a <= 3; a++) {
    await send("Page.navigate", { url }); await sleep(ms);
    const ok = await ev(`!!document.body && document.body.textContent.length>500 && !!document.querySelector("[data-strengths]")`);
    if (ok === true) return true;
    console.log(`  ! not loaded (attempt ${a}) - retry`); await sleep(2500);
  }
  return false;
};

for (const [w, h, lab] of [[390, 844, "phone390x844"], [1440, 900, "desktop1440x900"]]) {
  const mob = w < 500;
  for (const view of ["target", "public"]) {
    const key = `${lab}_${view}`;
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: mob ? 2 : 1, mobile: mob });
    if (!await load(`${BASE}/es?view=${view}`)) { R.runs[key] = { notLoaded: true }; continue; }
    const p1 = await pass();
    const p2 = await pass();
    const furn = await ev(FURNITURE);
    const vh = p2.vh;
    const screens = x => Math.round(x / vh * 100) / 100;
    R.runs[key] = {
      pass1: p1, pass2: p2,
      settled: p1.h === p2.h,
      heightPx: p2.h, vh,
      screens: screens(p2.h),
      furniturePx: furn.px, furnitureScreens: screens(furn.px),
      screensWithoutFurniture: screens(p2.h - furn.px),
      furnitureParts: furn.parts
    };
    const r = R.runs[key];
    console.log(`${key.padEnd(26)} pass1 ${String(p1.h).padStart(6)} (${p1.steps} steps) | pass2 ${String(p2.h).padStart(6)} (${p2.steps}) | settled ${r.settled} | ${r.screens} screens | without furniture ${r.screensWithoutFurniture}`);
  }
}
const endCommit = (await (await fetch(`${BASE}/api/build`)).json()).commit;
R.buildAtEnd = endCommit; R.oneBuild = endCommit === buildAtStart.commit;
writeFileSync(`depth16-${TAG}.json`, JSON.stringify(R, null, 1));
console.log(R.oneBuild ? `\nBUILD STABLE: ${endCommit.slice(0, 7)}` : `\n*** VOID: alias moved ${buildAtStart.commit.slice(0, 7)} -> ${endCommit.slice(0, 7)} ***`);
process.exit(0);
