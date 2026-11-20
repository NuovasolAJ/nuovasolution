// Copy §5a on the FAQ page, plus Q-22 (the known follow-up). Both views.
// NOTE: a previous probe used querySelectorAll("*") and matched a <script> carrying the Next.js
// RSC payload, which made the answer text meaningless. Scripts and styles are excluded here.
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
const wake = () => ev(`(async()=>{var y=0,s=0;while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,120));y+=600;s++;if(s>300)break;}scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,400));return s})()`);

const PROBE = `(()=>{
  const SKIP = {SCRIPT:1, STYLE:1, NOSCRIPT:1, TEMPLATE:1};
  const txt = e => { if(!e) return ""; const w=document.createTreeWalker(e, NodeFilter.SHOW_TEXT, {
      acceptNode: n => SKIP[n.parentElement && n.parentElement.tagName] ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    let s=""; while(w.nextNode()) s += w.currentNode.nodeValue + " ";
    return s.replace(/[ ]+/g," ").trim(); };
  const items=[...document.querySelectorAll("details, [data-faq-item], li, section, article")]
    .filter(e=>!SKIP[e.tagName]);
  const find = re => { const hits = items.filter(e=>re.test(txt(e))); return hits.length ? txt(hits[hits.length-1]) : null; };
  const pageText = txt(document.body);
  return {
    languages: find(/En qu[ée] idiomas responde|What languages does it reply in/i),
    q22: find(/a[ñn]adir a mi equipo|add my team|darles roles|different roles/i),
    masIdiomas: (pageText.match(/M[áa]s idiomas|More languages/g)||[]).length,
    enPreparacion: (pageText.match(/En preparaci[óo]n|In preparation/g)||[]).length,
    // case-INsensitive: PX-s carries "próximamente" lowercase mid-sentence, so the case-sensitive
    // form read 0 marks on 92f873d while the gate line was demonstrably on the page.
    pxCount: (pageText.match(/pr[óo]ximamente|coming soon/gi)||[]).length,
    // WARNING, measured on 92f873d: /faq is an accordion that mounts ONLY the open answer (2678
    // chars closed, ~107k after opening all 35 items). Any "absent on /faq" conclusion from the
    // figures below is weak evidence - absence of unmounted text proves nothing. Use faqAllItems
    // below, which opens every trigger and unions the text; a ZERO over that union is a true zero.
    accordionWarning: "answers are mounted one at a time - open every item before concluding absence",
    listaDeTareas: (pageText.match(/Lista de tareas|Task list/g)||[]).length,
    equipoYRoles: (pageText.match(/Equipo y roles|Team and roles/g)||[]).length,
    pageChars: pageText.length };})()`;

const R = { tag: TAG, build: await (await fetch(`${BASE}/api/build`)).json(), runs: {} };
for (const loc of ["es", "en"]) {
  for (const view of ["target", "public"]) {
    await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await send("Page.navigate", { url: `${BASE}/${loc}/faq?view=${view}` }); await sleep(5200);
    await wake();
    // open every accordion so answers are in the text, not only in the DOM
    await ev(`(async()=>{for(const d of document.querySelectorAll("details")) d.open=true;
      for(const b of document.querySelectorAll('[aria-expanded="false"]')) b.click();
      await new Promise(r=>setTimeout(r,1200));return 1})()`);
    const o = await ev(PROBE);
    R.runs[`${loc}-${view}`] = o;
    console.log(`${loc}-${view} | PX ${o.pxCount} | MásIdiomas ${o.masIdiomas} | EnPrep ${o.enPreparacion} | ListaDeTareas ${o.listaDeTareas} | EquipoYRoles ${o.equipoYRoles}`);
    console.log(`   languages answer: ${(o.languages||"(not found)").slice(-150)}`);
    console.log(`   Q-22 answer:      ${(o.q22||"(not found)").slice(-150)}`);
  }
}
writeFileSync(`faq16-${TAG}.json`, JSON.stringify(R, null, 1));
console.log("\nwritten faq16-" + TAG + ".json");
process.exit(0);
