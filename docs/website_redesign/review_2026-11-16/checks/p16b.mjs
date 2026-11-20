// Point 16, part two: the plan fold, the plans table marks, the demo tabs, the languages FAQ,
// and Copy's wording rules 1 and 2 on the rendered page. Both views.
// Whitespace is normalised in Node, never in page code.
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
  const ex = r.result?.exceptionDetails;
  if (ex) return { __error: (ex.exception?.description || ex.text || "").slice(0, 300) };
  return r.result?.result?.value;
};
await send("Page.enable");
const shot = async n => { const r = await send("Page.captureScreenshot", { format: "png" }); const d = r.result?.result?.data || r.result?.data; if (d) writeFileSync(`p16b-${TAG}-${n}.png`, Buffer.from(d, "base64")); };
const wake = () => ev(`(async()=>{var y=0,s=0;while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,120));y+=600;s++;if(s>300)break;}scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,400));return s})()`);
const dev = (w, h) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: w < 500 ? 2 : 1, mobile: w < 500 });
// A run that straddles two deployments is worthless: the alias moved under me once mid-run and
// one view came back empty. So every navigation is checked for a LOADED page, and the build is
// pinned at the start and verified at the end.
const buildNow = async () => (await (await fetch(`${BASE}/api/build`)).json()).commit;
const go = async (u, need = "body", ms = 5200) => {
  for (let attempt = 1; attempt <= 3; attempt++) {
    await send("Page.navigate", { url: u });
    await sleep(ms);
    const ready = await ev(`!!document.body && document.body.textContent.length > 500 && !!document.querySelector(${JSON.stringify(need)})`);
    if (ready === true) return true;
    console.log(`  ! ${u} not loaded (attempt ${attempt}, need ${need}) - retrying`);
    await sleep(2500);
  }
  return false;
};

const buildAtStart = await (await fetch(`${BASE}/api/build`)).json();
const R = { tag: TAG, build: buildAtStart, runs: {}, notLoaded: [] };

// ---------- the plan fold at 390: what stays visible while closed ----------
const FOLD = `(()=>{
  const painted = e => { if(!e) return false; const r=e.getBoundingClientRect(); const cs=getComputedStyle(e);
    return r.width>0 && r.height>0 && cs.visibility!=="hidden" && cs.display!=="none"; };
  const t = e => (e&&e.textContent||"").replace(/[ ]+/g," ").trim();
  const folds=[...document.querySelectorAll("[data-plan-fold]")].map(f=>{
    const btn=f.querySelector("[data-plan-fold-button]"), body=f.querySelector("[data-plan-fold-body]");
    const br=btn?btn.getBoundingClientRect():null;
    return { plan:f.getAttribute("data-plan-fold"), open:f.getAttribute("data-open"),
      btnText:t(btn), btnH:br?Math.round(br.height):null, btnW:br?Math.round(br.width):null,
      ariaExpanded:btn?btn.getAttribute("aria-expanded"):null,
      ariaLabel:btn?btn.getAttribute("aria-label"):null,
      ariaControls:btn?btn.getAttribute("aria-controls"):null,
      bodyInDocument: !!body, bodyPainted: painted(body),
      bodyChars: t(body).length };
  });
  // what must stay visible while closed (Copy §3)
  const all=[...document.querySelectorAll("*")];
  const seen = s => all.some(e=>painted(e)&&t(e).includes(s));
  return { folds,
    pilotLineAbovePlans: seen("El piloto gratuito de 14 días"),
    freeWay: seen("14 días gratis, sin tarjeta"),
    contactWay: seen("Te respondemos en 24 h laborables"),
    planNames: [...document.querySelectorAll("[data-plan-fold]")].map(f=>f.closest("[data-plan-card],article,li,div")).filter(Boolean).length };})()`;

// ---------- plans table: marks instead of tick/dash, legend ----------
const PLANS = `(()=>{
  const t = e => (e&&e.textContent||"").replace(/[ ]+/g," ").trim();
  const painted = e => { if(!e) return false; const r=e.getBoundingClientRect(); const cs=getComputedStyle(e);
    return r.width>0 && r.height>0 && cs.visibility!=="hidden" && cs.display!=="none"; };
  const rows=[...document.querySelectorAll("[data-plan-row]")].map(r=>({
    key:r.getAttribute("data-plan-row"), painted:painted(r),
    cells:[...r.querySelectorAll("[data-plan-cell]")].map(c=>({ state:c.getAttribute("data-plan-cell"), text:t(c) }))
  }));
  // NOTE: .plans-legend-item is an inline-flex with an 8px gap, so its two parts are separated
  // VISUALLY but not by any character in textContent ("Próximamenteaún no activo"). Requiring a
  // separator character here once made me read a correct legend as missing. Check the parts.
  const legendEl=document.querySelector("[data-plans-legend-soon]");
  const legendText=t(legendEl);
  return { rows, rowCount:rows.length, paintedRows:rows.filter(r=>r.painted).length,
    legend: legendEl?[legendText]:[],
    legendPainted: painted(legendEl),
    legendSoonSeen: !!legendEl && /Pr[óo]ximamente|Coming soon/.test(legendText)
      && /a[úu]n no activo|not active yet/.test(legendText) };})()`;

// ---------- demo tabs: the mark, and whether it stays inside the tab while playing ----------
const TABS = `(async()=>{
  const t = e => (e&&e.textContent||"").replace(/[ ]+/g," ").trim();
  const painted = e => { if(!e) return false; const r=e.getBoundingClientRect(); const cs=getComputedStyle(e);
    return r.width>0 && r.height>0 && cs.visibility!=="hidden" && cs.display!=="none"; };
  const tabs=[...document.querySelectorAll("[data-demo-tab]")];
  const info=[];
  for (const tab of tabs) {
    const key=tab.getAttribute("data-demo-tab");
    const soonAttr=tab.getAttribute("data-demo-tab-soon");
    const markEl=tab.querySelector(".demo-tab-soon")||[...tab.querySelectorAll("*")].find(e=>/Próximamente|Coming soon/.test(t(e)));
    const tr=tab.getBoundingClientRect();
    const mr=markEl?markEl.getBoundingClientRect():null;
    const beforeClick={ key, soonAttr, text:t(tab),
      tabBox:{w:Math.round(tr.width),h:Math.round(tr.height),left:Math.round(tr.left),right:Math.round(tr.right)},
      markPainted:markEl?painted(markEl):false,
      markBox:mr?{left:Math.round(mr.left),right:Math.round(mr.right)}:null,
      markInsideTab: mr?(mr.left>=tr.left-1 && mr.right<=tr.right+1):null };
    info.push(beforeClick);
  }
  // now select the phone tab and watch the mark while it plays
  const phoneTab=tabs.find(x=>x.getAttribute("data-demo-tab")==="phone");
  let whilePlaying=null;
  if (phoneTab) {
    phoneTab.scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,500));
    phoneTab.click();
    const samples=[];
    for (let i=0;i<6;i++){
      await new Promise(r=>setTimeout(r,1200));
      const mk=phoneTab.querySelector(".demo-tab-soon")||[...phoneTab.querySelectorAll("*")].find(e=>/Próximamente|Coming soon/.test(t(e)));
      const tr=phoneTab.getBoundingClientRect(); const mr=mk?mk.getBoundingClientRect():null;
      samples.push({ at:(i+1)*1.2, markPainted:mk?painted(mk):false,
        inside: mr?(mr.left>=tr.left-1 && mr.right<=tr.right+1 && mr.top>=tr.top-1 && mr.bottom<=tr.bottom+1):null,
        selected: phoneTab.getAttribute("aria-selected")||phoneTab.className.includes("is-on") });
    }
    whilePlaying=samples;
  }
  return { tabs:info, tabKeys:tabs.map(x=>x.getAttribute("data-demo-tab")), whilePlaying };})()`;

// ---------- languages FAQ + Copy rules 1 and 2 on the rendered page ----------
const WORDS = `(()=>{
  const body=(document.body.textContent||"").replace(/[\\u00a0\\u202f]+/g," ");
  const faq=[...document.querySelectorAll("*")].filter(e=>/En qu[ée] idiomas responde|What languages does it reply in/i.test(e.textContent||""));
  const last=faq.length?faq[faq.length-1]:null;
  return {
    enPreparacion: (body.match(/En preparaci[óo]n|In preparation/g)||[]).length,
    prontoEnBreve: (body.match(/\\ben breve\\b|\\bpronto\\b|pr[óo]ximas semanas/gi)||[]).length,
    masIdiomas: (body.match(/M[áa]s idiomas|More languages/g)||[]).length,
    masIdiomasProximamente: /M[áa]s idiomas[^.]{0,40}pr[óo]ximamente|More languages[^.]{0,40}coming soon/i.test(body),
    faqText: last?(last.textContent||"").replace(/[ ]+/g," ").trim().slice(-220):null,
    proximamenteCount: (body.match(/Pr[óo]ximamente|Coming soon/g)||[]).length };})()`;

for (const view of ["target", "public"]) {
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    const label = `${view}-${w}`;
    await dev(w, h);
    const loaded = await go(`${BASE}/es?view=${view}`, "[data-plan-row]");
    if (!loaded) { R.notLoaded.push(label); console.log(`${label} | NOT LOADED after 3 attempts - this view is not measured`); continue; }
    await wake();
    const o = {};
    if (w === 390) o.fold = await ev(FOLD);
    o.plans = await ev(PLANS);
    o.words = await ev(WORDS);
    o.tabs = await ev(TABS);
    R.runs[label] = o;
    const f = o.fold && o.fold.folds ? o.fold.folds.length : 0;
    console.log(`${label} | folds ${f} | plan rows ${o.plans && o.plans.rowCount} painted ${o.plans && o.plans.paintedRows} | legend ${o.plans && o.plans.legendSoonSeen} | tabs ${o.tabs && (o.tabs.tabKeys||[]).join(",")} | EnPrep ${o.words && o.words.enPreparacion} | PX count ${o.words && o.words.proximamenteCount}`);
    if (w === 390) await shot(label + "-fold");
  }
}
const endCommit = await buildNow();
R.buildAtEnd = endCommit;
R.oneBuild = endCommit === buildAtStart.commit;
writeFileSync(`p16b-${TAG}.json`, JSON.stringify(R, null, 1));
console.log("\nwritten p16b-" + TAG + ".json");
console.log(R.oneBuild
  ? `BUILD STABLE through the run: ${endCommit.slice(0, 7)}`
  : `*** VOID: the alias moved during the run, ${buildAtStart.commit.slice(0, 7)} -> ${endCommit.slice(0, 7)}. Repeat on one build. ***`);
if (R.notLoaded.length) console.log("NOT LOADED: " + R.notLoaded.join(", "));
process.exit(0);
