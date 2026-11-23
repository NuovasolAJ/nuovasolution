// Reconnaissance only: dump the interactive surface of the named build so the real probe
// uses selectors that exist instead of selectors I assumed. No judgement here.
const BASE = process.argv[2];
const ROUTE = process.argv[3] || "/es";
const W = Number(process.argv[4] || 390), H = Number(process.argv[5] || 844);
const CDP = 9477, sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => {
  const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return { __error: (r.result.exceptionDetails.exception?.description || "").slice(0, 300) };
  return r.result?.result?.value;
};
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
await send("Page.navigate", { url: BASE + ROUTE });
await sleep(6000);

const PROBE = `(async()=>{
  // traverse the whole page so content-visibility sections paint
  var y=0,s=0; while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,80));y+=600;s++;if(s>400)break;}
  scrollTo({top:0,behavior:"instant"}); await new Promise(r=>setTimeout(r,250));
  const txt=(e)=>((e.innerText||e.value||e.getAttribute("aria-label")||"").replace(/\\s+/g," ")).trim().slice(0,70);
  const rows=[];
  for(const e of document.querySelectorAll('a,button,[role="button"],input,select,textarea,[aria-expanded],[data-w1],[data-demo],[data-plan],[data-plan-diffs],[data-task],[data-channel]')){
    const r=e.getBoundingClientRect(); const cs=getComputedStyle(e);
    const das={}; for(const a of e.attributes) if(a.name.startsWith("data-")) das[a.name]=a.value.slice(0,40);
    rows.push({tag:e.tagName.toLowerCase(), t:txt(e), w:Math.round(r.width), h:Math.round(r.height),
      pageY:Math.round(r.top+scrollY), href:(e.getAttribute("href")||"").slice(0,80),
      hidden: cs.display==="none"||cs.visibility==="hidden"||(r.width===0&&r.height===0),
      data:Object.keys(das).length?das:undefined, id:e.id||undefined, cls:(e.className&&typeof e.className==="string"?e.className.slice(0,50):undefined)});
  }
  return { depth: document.documentElement.scrollHeight, vh: innerHeight, n: rows.length, rows,
    title: document.title, h1: (document.querySelector("h1")?.innerText||"").replace(/\\s+/g," ").slice(0,120) };})()`;

const o = await ev(PROBE);
if (o?.__error) { console.log("ERROR " + o.__error); process.exit(1); }
console.log(`${ROUTE} @${W}  depth=${o.depth} vh=${o.vh}  h1="${o.h1}"`);
console.log(`interactive/marked elements: ${o.n}`);
for (const r of o.rows) {
  if (r.hidden) continue;
  const d = r.data ? " " + JSON.stringify(r.data) : "";
  console.log(`  y=${String(r.pageY).padStart(5)} ${String(r.w).padStart(4)}x${String(r.h).padStart(3)} ${r.tag.padEnd(8)} ${JSON.stringify(r.t).padEnd(50)}${r.href ? " -> " + r.href : ""}${d}`);
}
const hid = o.rows.filter((r) => r.hidden);
console.log(`\n(${hid.length} hidden/0x0 elements omitted)`);
process.exit(0);
