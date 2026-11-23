// VORHER-Messung auf 92f873d für den Owner-Brief vom 20.11.
// Nur die Teile, die unstrittig RV6 gehören (die Wege sind mit Redesign geteilt):
//   A  jede "Próximamente"/"Coming soon"-Marke auf den Kundenseiten, nach Seite und Ort
//      -> die Grundlinie für Owner-Entscheidung 1 (Marken verschwinden von Kundenseiten)
//   B  Touchflächen unter 44 px bei 375 und was die feste Fußleiste verdeckt
//   C  das Gratis-Angebot je Paketkarte: Button, Linkziel, vorgewähltes Formular (M6/D4)
//
// Lehren von heute, eingebaut:
//  - Akkordeons: /faq montiert nur die offene Antwort (2678 Zeichen zu, ~107k offen). Jeder
//    Auslöser wird geöffnet, sonst beweist "nicht gefunden" nichts.
//  - Groß-/Kleinschreibung: PX-s trägt "próximamente" klein mitten im Satz.
//  - Ein Lauf, der nichts angesehen hat, ist kein Erfolg: fehlende Seiten werden gemeldet.
//  - Build am Anfang UND am Ende, sonst VOID.
import { writeFileSync } from "node:fs";

const BASE = process.argv[2], TAG = process.argv[3] || "92f873d";
if (!BASE) { console.error("usage: node before1120.mjs <base-url> <tag>"); process.exit(2); }

const SLUGS = ["ai-sales-agent", "crm", "daily-assistant", "lead-acquisition", "lead-intelligence", "property-experience", "social-growth"];
const ROUTES = ["", "/platform", ...SLUGS.map((s) => `/platform/${s}`), "/packages", "/faq", "/contact", "/example-report", "/trial", "/prueba-objeto"];

const CDP = 9477, sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const list = await (await fetch(`http://127.0.0.1:${CDP}/json/list`)).json();
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => {
  const r = await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true });
  if (r.result?.exceptionDetails) return { __error: (r.result.exceptionDetails.exception?.description || "").slice(0, 200) };
  return r.result?.result?.value;
};
await send("Page.enable");
const buildOf = async () => { try { return await (await fetch(`${BASE}/api/build`)).json(); } catch (e) { return { error: String(e).slice(0, 100) }; } };

const OPEN_ALL = `(async()=>{
  var y=0,s=0; while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,90));y+=600;s++;if(s>400)break;}
  for(const d of document.querySelectorAll("details")) d.open=true;
  const trig=[...document.querySelectorAll('[aria-expanded="false"]')];
  for(const b of trig){ try{ b.scrollIntoView({block:"center",behavior:"instant"}); b.click(); await new Promise(r=>setTimeout(r,160)); }catch(e){} }
  // a second sweep: opening one item can close another
  for(const b of document.querySelectorAll('[aria-expanded="false"]')){ try{ b.click(); await new Promise(r=>setTimeout(r,160)); }catch(e){} }
  await new Promise(r=>setTimeout(r,500));
  return {opened: trig.length, stillClosed: document.querySelectorAll('[aria-expanded="false"]').length};})()`;

const MARKS = `(()=>{
  const SKIP={SCRIPT:1,STYLE:1,NOSCRIPT:1,TEMPLATE:1};
  const RE=/pr[óo]ximamente|coming soon/i;
  const hits=[];
  for(const e of document.querySelectorAll("*")){
    if(SKIP[e.tagName]||e.children.length) continue;        // leaf elements only
    const t=(e.textContent||"").replace(/\\s+/g," ").trim();
    if(!t||!RE.test(t)) continue;
    const r=e.getBoundingClientRect();
    hits.push({ text:t.slice(0,90), tag:e.tagName, cls:String(e.className||"").slice(0,40),
      painted:r.width>0&&r.height>0, w:Math.round(r.width), h:Math.round(r.height),
      marker: e.closest("[data-strength-chip]")?"strength-chip": e.closest("[data-plan-cell]")?"plan-cell":
              e.closest("[data-demo-tab]")?"demo-tab": e.closest("[data-plans-legend]")?"plans-legend":
              e.closest("[data-day-step]")?"day-step":"other" });
  }
  const body=(document.body.innerText||"");
  return { hits, total:hits.length,
    inInnerText:(body.match(/pr[óo]ximamente|coming soon/gi)||[]).length,
    chars: body.length };})()`;

const TOUCH = `(()=>{
  const small=[]; const seen=new Set();
  for(const e of document.querySelectorAll('a,button,[role="button"],summary,input,select,[tabindex]:not([tabindex="-1"])')){
    const r=e.getBoundingClientRect(); if(r.width<1||r.height<1) continue;
    const label=((e.textContent||e.getAttribute("aria-label")||"").replace(/\\s+/g," ").trim()).slice(0,42);
    const key=label+"|"+Math.round(r.width)+"x"+Math.round(r.height); if(seen.has(key)) continue; seen.add(key);
    if(r.width<44||r.height<44) small.push({label, w:Math.round(r.width*10)/10, h:Math.round(r.height*10)/10, tag:e.tagName});
  }
  // a fixed/sticky bar anchored at the bottom
  let fixed=null;
  for(const e of document.querySelectorAll("body *")){
    const cs=getComputedStyle(e); if(cs.position!=="fixed"&&cs.position!=="sticky") continue;
    const r=e.getBoundingClientRect(); if(r.height<20||r.width<window.innerWidth*0.6) continue;
    if(r.bottom>window.innerHeight-4 && r.top>window.innerHeight*0.5){
      const t=(e.textContent||"").replace(/\\s+/g," ").trim().slice(0,60);
      if(!fixed||r.height>fixed.h) fixed={h:Math.round(r.height), top:Math.round(r.top), text:t, pos:cs.position};
    }
  }
  return { smallCount:small.length, small:small.slice(0,14), fixedBottomBar:fixed, viewport:window.innerHeight };})()`;

const PLANS = `(()=>{
  const out=[];
  for(const card of document.querySelectorAll("[data-plan-card], .plan-card, [data-plan]")){
    const name=(card.querySelector("h2,h3,[data-plan-name]")||{}).textContent||"";
    const btns=[...card.querySelectorAll("a,button")].map(b=>({
      label:(b.textContent||"").replace(/\\s+/g," ").trim().slice(0,46),
      href:b.getAttribute("href")||null,
      primary:getComputedStyle(b).backgroundColor }));
    out.push({ plan:name.replace(/\\s+/g," ").trim().slice(0,30), buttons:btns.slice(0,6) });
  }
  // fall back to any element whose text names a plan, if the markers are absent
  const freeOffer=[...document.querySelectorAll("a,button")]
    .filter(b=>/14 d[íi]as gratis|14 days free|gratis durante 14|free for 14/i.test(b.textContent||""))
    .map(b=>({label:(b.textContent||"").replace(/\\s+/g," ").trim().slice(0,46), href:b.getAttribute("href")||null}));
  return { cards:out, cardCount:out.length, freeOfferButtons:freeOffer };})()`;

const R = { tag: TAG, base: BASE, buildStart: await buildOf(), A_marks: {}, B_touch: {}, C_plans: {}, failed: [] };
console.log(`build at start: ${R.buildStart.commit?.slice(0, 7) || R.buildStart.error}\n`);

const go = async (url) => {
  for (let a = 1; a <= 3; a++) {
    await send("Page.navigate", { url }); await sleep(5000);
    const ok = await ev(`(()=>{const b=document.body; if(!b) return {ok:false,why:"body null"};
      const n=(b.innerText||"").length; return n<300?{ok:false,why:"only "+n+" chars"}:{ok:true,n};})()`);
    if (ok?.ok) return ok;
    console.log(`   retry ${a}/3 ${url}: ${ok ? ok.why : "no answer"}`);
  }
  return null;
};

// ---- A: the mark inventory on the customer pages, public view, 390 ----
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
for (const loc of ["es", "en"]) {
  for (const route of ROUTES) {
    const key = `${loc}${route || "/"}`;
    const loaded = await go(`${BASE}/${loc}${route}?view=public`);
    if (!loaded) { R.failed.push(key); R.A_marks[key] = { FAILED: true }; console.log(`A ${key}: *** FAILED TO LOAD ***`); continue; }
    const opened = await ev(OPEN_ALL);
    const m = await ev(MARKS);
    R.A_marks[key] = { ...m, accordion: opened };
    console.log(`A ${key.padEnd(34)} marks ${String(m.total).padStart(3)} (painted ${m.hits.filter((h) => h.painted).length}) | innerText ${m.inInnerText} | opened ${opened.opened}, still closed ${opened.stillClosed}`);
  }
}

// ---- B: touch targets and the fixed bottom bar at 375 ----
await send("Emulation.setDeviceMetricsOverride", { width: 375, height: 812, deviceScaleFactor: 3, mobile: true });
for (const route of ["", "/packages", "/platform/ai-sales-agent", "/faq"]) {
  const key = `es${route || "/"}@375`;
  if (!(await go(`${BASE}/es${route}?view=public`))) { R.failed.push(key); continue; }
  await ev(`(async()=>{var y=0,s=0;while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,90));y+=600;s++;if(s>400)break;}scrollTo({top:0,behavior:"instant"});await new Promise(r=>setTimeout(r,400));return 1})()`);
  const t = await ev(TOUCH);
  R.B_touch[key] = t;
  console.log(`B ${key.padEnd(34)} targets under 44 px: ${t.smallCount} | fixed bottom bar: ${t.fixedBottomBar ? t.fixedBottomBar.h + " px «" + t.fixedBottomBar.text + "»" : "none"}`);
}

// ---- C: the free offer per plan card, 375 and desktop ----
for (const [w, h] of [[375, 812], [1440, 900]]) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: w < 500 ? 3 : 1, mobile: w < 500 });
  for (const loc of ["es", "en"]) {
    const key = `${loc}/packages@${w}`;
    if (!(await go(`${BASE}/${loc}/packages?view=public`))) { R.failed.push(key); continue; }
    await ev(OPEN_ALL);
    const p = await ev(PLANS);
    R.C_plans[key] = p;
    console.log(`C ${key.padEnd(34)} cards ${p.cardCount} | free-offer buttons ${p.freeOfferButtons.length}: ${JSON.stringify(p.freeOfferButtons.map((b) => b.label))}`);
  }
}

R.buildEnd = await buildOf();
R.stable = R.buildStart.commit && R.buildStart.commit === R.buildEnd.commit;
console.log(R.stable ? `\nBUILD STABLE: ${R.buildStart.commit.slice(0, 7)}` : `\n*** VOID *** the build moved mid-run`);

const totalMarks = Object.values(R.A_marks).reduce((n, v) => n + (v.total || 0), 0);
const pages = Object.keys(R.A_marks).filter((k) => !R.A_marks[k].FAILED).length;
if (!pages) console.log("ABORT: no page was examined - a zero here would mean nothing");
R.summary = { pagesExamined: pages, totalMarks, failed: R.failed };
writeFileSync(`before1120-${TAG}.json`, JSON.stringify(R, null, 1));
console.log(`\n${totalMarks} marks across ${pages} customer pages | ${R.failed.length} failed to load`);
console.log(`written before1120-${TAG}.json`);
process.exit(0);
