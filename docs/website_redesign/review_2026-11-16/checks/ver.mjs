// One button per page load: open ONE and measure, so the layout of the others cannot shift it.
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
const wake = () => ev(`(async()=>{var y=0,steps=0;while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,120));y+=600;steps++;if(steps>300)break;}scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,400));return document.documentElement.scrollHeight})()`);
const R = { tag: TAG, build: await (await fetch(`${BASE}/api/build`)).json(), results: {} };
const WANT = ["Ver Atiende", "Ver Organiza", "Ver Crece"];
for (const [w, h, label] of [[390, 844, "390"], [1440, 900, "1440"]]) {
  const mob = w < 500;
  R.results[label] = [];
  for (const want of WANT) {
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: mob ? 2 : 1, mobile: mob });
    await send("Page.navigate", { url: `${BASE}/es?view=target` }); await sleep(5200);
    await wake();
    const r = await ev(`(async()=>{
      const b=[...document.querySelectorAll("button,a")].find(e=>(e.textContent||"").trim()===${JSON.stringify(want)});
      if(!b) return {missing:true};
      b.scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,600));
      const br=b.getBoundingClientRect(); const btnBottom=br.bottom+scrollY;
      const ctrl=b.getAttribute("aria-controls");
      b.click(); await new Promise(r=>setTimeout(r,1500));
      const t=ctrl?document.getElementById(ctrl):null;
      const slot=document.querySelector(".ch-detail-slot");
      const el=t&&t.getBoundingClientRect().height>40?t:slot;
      if(!el) return {noTarget:true, ctrl};
      const er=el.getBoundingClientRect();
      return {btnBottomAbs:Math.round(btnBottom), contentTopAbs:Math.round(er.top+scrollY),
        gapPx:Math.round(er.top+scrollY-btnBottom), gapScreens:Math.round((er.top+scrollY-btnBottom)/innerHeight*100)/100,
        contentHeight:Math.round(er.height), ctrl, usedSlot:el!==t,
        text:(el.textContent||"").trim().slice(0,60)};})()`);
    R.results[label].push({ button: want, ...r });
  }
}
writeFileSync(`ver-${TAG}.json`, JSON.stringify(R, null, 1));
for (const [k, arr] of Object.entries(R.results)) for (const o of arr) console.log(k, o.button, "gap", o.gapPx, "px =", o.gapScreens, "screens", o.ctrl || "", o.usedSlot ? "(slot)" : "");
process.exit(0);
