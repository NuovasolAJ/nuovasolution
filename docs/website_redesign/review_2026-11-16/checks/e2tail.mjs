// E-2 decides on two sections only: "Casos abiertos" and "Qué toca hacer". Read them whole.
const BASE = process.argv[2], LOC = process.argv[3] || "es";
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
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send("Page.navigate", { url: `${BASE}/${LOC}/example-report` }); await sleep(6200);
const o = await ev(`(async()=>{
  var y=0,s=0; while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,80));y+=600;s++;if(s>300)break;}
  const want=["Casos abiertos","Qu\\u00e9 toca hacer","Open cases","What to do"];
  const out=[];
  for(const h of document.querySelectorAll("h2,h3")){
    const t=(h.innerText||h.textContent||"").replace(/[\\s\\u00a0]+/g," ").trim();
    if(!want.some(w=>t.toLowerCase().includes(w.toLowerCase()))) continue;
    let sec=h.closest("section")||h.parentElement;
    const body=(sec.innerText||sec.textContent||"").replace(/[\\s\\u00a0]+/g," ").trim();
    out.push({heading:t,body:body.slice(0,1600)});
  }
  const full=(document.body.innerText||document.body.textContent||"").replace(/[\\s\\u00a0]+/g," ").trim();
  return {sections:out, totalLen:full.length, tail:full.slice(-1400)};})()`);
if (o?.__error) { console.log("ERROR " + o.__error); process.exit(1); }
console.log(`page length ${o.totalLen}; matching sections: ${o.sections.length}\n`);
for (const s of o.sections) { console.log(`### ${s.heading}\n${s.body}\n`); }
if (!o.sections.length) console.log(`TAIL OF PAGE:\n${o.tail}`);
process.exit(0);
