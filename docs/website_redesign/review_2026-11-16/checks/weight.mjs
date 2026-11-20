// Visual weight of the "Próximamente" chip against the card title, gate view.
// The marking is correct per Copy; the question is whether it outweighs what the card sells.
const BASE = process.argv[2], TAG = process.argv[3];
const CDP = 9477, sleep = ms => new Promise(r => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find(t => t.type === "page").webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async x => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
await send("Page.enable");
const wake = () => ev(`(async()=>{var y=0,s=0;while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,120));y+=600;s++;if(s>300)break;}scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,400));return s})()`);

const PROBE = `(()=>{
  const box = e => { if(!e) return null; const r=e.getBoundingClientRect(); const cs=getComputedStyle(e);
    return { w:Math.round(r.width), h:Math.round(r.height), area:Math.round(r.width*r.height),
      fontSize:parseFloat(cs.fontSize), weight:cs.fontWeight, bg:cs.backgroundColor, color:cs.color,
      text:(e.textContent||"").trim() }; };
  const cards=[...document.querySelectorAll("[data-strength]")].map(c=>{
    const chip=c.querySelector("[data-strength-chip]"), title=c.querySelector(".ch-name");
    const cb=box(chip), tb=box(title);
    return { key:c.getAttribute("data-strength"), state:c.getAttribute("data-strength-state"),
      chip:cb, title:tb,
      chipOverTitleArea: cb&&tb ? Math.round(cb.area/tb.area*100)/100 : null,
      chipFirst: chip&&title ? chip.getBoundingClientRect().top < title.getBoundingClientRect().top : null,
      chipLines: cb&&cb.fontSize ? Math.round(cb.h/(cb.fontSize*1.45)) : null };
  });
  return { cards, soon: document.querySelector("[data-strengths]")?.getAttribute("data-strengths-soon") };})()`;

const R = {};
for (const [w, h, label] of [[390, 844, "390"], [1440, 900, "1440"]]) {
  const mob = w < 500;
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: mob ? 2 : 1, mobile: mob });
  await send("Page.navigate", { url: `${BASE}/es?view=public` }); await sleep(5200); await wake();
  R[label] = await ev(PROBE);
  console.log(`\n--- ${label}, gate view (soon=${R[label].soon}) ---`);
  for (const c of R[label].cards) {
    if (!c.chip || !c.title) continue;
    console.log(`${c.key} ${c.state.padEnd(7)} chip ${String(c.chip.area).padStart(6)}px2 ${c.chip.fontSize}px/${c.chip.weight} ${c.chipLines} line(s) | title ${String(c.title.area).padStart(6)}px2 ${c.title.fontSize}px/${c.title.weight} | chip/title area ${c.chipOverTitleArea} | chip first: ${c.chipFirst}`);
  }
}
console.log("\n" + JSON.stringify(R).slice(0, 80) + "...");

(await import("node:fs")).writeFileSync(`weight-${TAG}.json`, JSON.stringify(R, null, 1));
process.exit(0);
