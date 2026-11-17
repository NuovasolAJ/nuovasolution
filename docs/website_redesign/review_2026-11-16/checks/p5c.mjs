// Point 5: the demo replies, compared after the typing animation has settled.
// NOTE: no "\s" inside any expression sent to the page — a shell heredoc once ate the backslash
// and silently stripped every lowercase "s" from the captured text. Whitespace is normalised here.
import { writeFileSync, readFileSync } from "node:fs";
const BASE = "https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app";
const CDP = 9477, sleep = ms => new Promise(r => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find(t => t.type === "page").webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async x => {
  const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return null;
  return r.result?.result?.value;
};
const norm = s => (s || "").replace(/[\s\u00a0\u202f]+/g, " ").trim();
await send("Page.enable");
const out = {};
for (const loc of ["es", "en"]) {
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: `${BASE}/${loc}?view=target` }); await sleep(5200);
  await ev(`(async()=>{const st=Math.round(innerHeight*0.8),h=document.documentElement.scrollHeight;
    for(let y=0;y<h;y+=st){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,200));}
    scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,400));return h})()`);
  out[loc] = { tabs: {} };
  const tabs = await ev(`[].slice.call(document.querySelectorAll("[data-demo-tab]")).map(function(t){return t.getAttribute("data-demo-tab");})`);
  for (const key of tabs || []) {
    const raw = await ev(`(async function(){
      var t=[].slice.call(document.querySelectorAll("[data-demo-tab]")).filter(function(e){return e.getAttribute("data-demo-tab")===${JSON.stringify(key)};})[0];
      if(!t) return null;
      t.scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,400));
      t.click();
      var sec=t.closest("section")||document.body;
      var last="", stable=0;
      for (var i=0;i<40;i++){
        await new Promise(r=>setTimeout(r,900));
        var cur=sec.textContent||"";
        if(cur===last){ stable++; if(stable>=3) break; } else { stable=0; last=cur; }
      }
      return last;})()`);
    out[loc].tabs[key] = norm(raw);
  }
  out[loc].page = norm(await ev(`document.body.textContent`));
}
writeFileSync("p5c-dd2035b.json", JSON.stringify(out, null, 1));
const exp = JSON.parse(readFileSync("C:/Users/Usuario/Desktop/Nuovasolution/docs/website_redesign/review_2026-11-16/checks/expected-demo-replies-5445214.json", "utf8"));
const lines = [];
for (const r of exp.replies) for (const lang of ["es", "en"]) {
  const t = norm(r[lang]); let hit = "";
  for (const [k, v] of Object.entries(out[lang]?.tabs || {})) if (v.includes(t)) hit = "Reiter " + k;
  if (!hit && (out[lang]?.page || "").includes(t)) hit = "Seite";
  let prefix = 0;
  if (!hit) { const hay = Object.values(out[lang]?.tabs || {}).join(" ") + " " + (out[lang]?.page || "");
    let lo = 0, hi = t.length; while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (hay.includes(t.slice(0, mid))) lo = mid; else hi = mid - 1; } prefix = lo; }
  lines.push(`${hit ? "OK" : "FEHLT"}\t${r.tab}\t${lang}\t${hit || ("längster Treffer " + prefix + "/" + t.length)}\t${t.slice(0, 48)}`);
}
writeFileSync("p5c-result.txt", lines.join("\n"), "utf8");
console.log(lines.join("\n"));
process.exit(0);
