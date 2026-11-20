// My FAQ probe may have been measuring a page whose answers are not in the DOM. /faq came back
// at ~3000 characters with ONE Próximamente, while Redesign counts 20 - which would mean an
// accordion that keeps only the open answer mounted. If so, every "absent on /faq" result I have
// reported (§5a "no Más idiomas", "no en preparación") was checked against text that was not there,
// and absence would prove nothing. So: find the triggers, open EACH one, and union the text.
const BASE = process.argv[2];
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
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

for (const loc of ["es", "en"]) {
  for (const view of ["target", "public"]) {
    await send("Page.navigate", { url: `${BASE}/${loc}/faq?view=${view}` });
    await sleep(5200);
    const o = await ev(`(async()=>{
      const SKIP={SCRIPT:1,STYLE:1,NOSCRIPT:1,TEMPLATE:1};
      const txt=(root)=>{const w=document.createTreeWalker(root, NodeFilter.SHOW_TEXT,{acceptNode:n=>
        SKIP[n.parentElement&&n.parentElement.tagName]?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
        let s=""; while(w.nextNode()) s+=w.currentNode.nodeValue+" "; return s.replace(/[\\s\\u00a0]+/g," ");};
      var y=0,s=0; while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,90));y+=600;s++;if(s>400)break;}
      // find every plausible trigger
      const triggers=[...document.querySelectorAll('[aria-expanded], summary, [data-faq-q], button')]
        .filter(e=>{const t=txt(e).trim(); return t.length>8 && t.length<200 && /[?¿]/.test(t);});
      const before = txt(document.body);
      let union = before;
      const opened=[];
      for (const t of triggers) {
        try { t.scrollIntoView({block:"center",behavior:"instant"});
          if (t.tagName==="SUMMARY" && t.parentElement) t.parentElement.open=true; else t.click();
          await new Promise(r=>setTimeout(r,260));
          union += " \\u0001 " + txt(document.body);
          opened.push(txt(t).trim().slice(0,40));
        } catch(e) {}
      }
      const ci=(re)=>(union.match(re)||[]).length;
      const ciB=(re)=>(before.match(re)||[]).length;
      return { triggers: triggers.length, openedSample: opened.slice(0,4),
        charsBefore: before.length, charsUnion: union.length,
        pxBefore: ciB(/pr[óo]ximamente|coming soon/gi), pxUnion: ci(/pr[óo]ximamente|coming soon/gi),
        masIdiomasBefore: ciB(/m[áa]s idiomas|more languages/gi), masIdiomasUnion: ci(/m[áa]s idiomas|more languages/gi),
        enPrepBefore: ciB(/en preparaci[óo]n|in preparation/gi), enPrepUnion: ci(/en preparaci[óo]n|in preparation/gi),
        equipoUnion: ci(/equipo y roles|team and roles/gi) };})()`);
    if (o.__error) { console.log(`${loc}-${view}: ERROR ${o.__error}`); continue; }
    console.log(`${loc}-${view}: triggers ${o.triggers} | chars ${o.charsBefore} -> union ${o.charsUnion}`);
    console.log(`   PX  before ${o.pxBefore} -> after opening every item ${o.pxUnion}`);
    console.log(`   "más idiomas"  ${o.masIdiomasBefore} -> ${o.masIdiomasUnion} | "en preparación" ${o.enPrepBefore} -> ${o.enPrepUnion} | "equipo y roles" ${o.equipoUnion}`);
    console.log(`   sample triggers: ${JSON.stringify(o.openedSample)}`);
  }
}
process.exit(0);
