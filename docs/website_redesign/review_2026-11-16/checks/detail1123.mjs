// Three of my own observations verified before I pass them on, plus the keyboard order the
// owner's brief asks for. Nothing here is graded; this is "is the finding real".
//  R-2  the "behind" free-trial button goes to /contact with NO interes/plan -> no prefill?
//  R-3  /trial exists as a second destination for the same offer - what does it do?
//  R-6  the "web" field (h=24) looks like a honeypot. Is it in the keyboard tab order?
const BASE = process.argv[2];
const LOC = process.argv[3] || "es";
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
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });

// --- R-2 / prefill comparison: the same words, two destinations
console.log("=== R-2  the SAME offer wording, different destinations and prefill");
for (const u of [`/${LOC}/contact?interes=trial&plan=essential`, `/${LOC}/contact`, `/${LOC}/trial`]) {
  await send("Page.navigate", { url: BASE + u }); await sleep(5200);
  const o = await ev(`(()=>{
    const f=[...document.querySelectorAll("input,select,textarea")].map(e=>({n:e.name||e.id,v:(e.value||"").slice(0,48)}));
    const sub=[...document.querySelectorAll("button[type=submit],form button")].map(e=>((e.innerText||e.textContent||"").replace(/\\s+/g," ").trim().slice(0,40)));
    const body=(document.body.innerText||"").replace(/[\\s\\u00a0]+/g," ");
    return {h1:(document.querySelector("h1")?.innerText||"").replace(/\\s+/g," ").trim().slice(0,70),
      interest:(f.find(x=>x.n==="interest")||{}).v||"(no interest field)",
      message:(f.find(x=>x.n==="message")||{}).v||"(empty)", sub, hasForm:!!document.querySelector("form"),
      names14:/14 d[ií]as|14 days/i.test(body), len:body.length,
      links:[...document.querySelectorAll("a[href*='contact'],a[href*='trial']")].slice(0,6).map(a=>a.getAttribute("href"))};})()`);
  console.log(`  ${u}`);
  console.log(`     h1=${JSON.stringify(o.h1)} form=${o.hasForm} interest=${JSON.stringify(o.interest)} message=${JSON.stringify(o.message)}`);
  console.log(`     submit=${JSON.stringify(o.sub)} says14days=${o.names14} bodyLen=${o.len}`);
  if (!o.hasForm) console.log(`     links out: ${JSON.stringify(o.links)}`);
}

// --- R-6 keyboard tab order on the contact form, incl. the suspected honeypot
console.log("\n=== R-6  keyboard order through the contact form (the brief asks for keyboard)");
await send("Page.navigate", { url: `${BASE}/${LOC}/contact?interes=trial&plan=essential` }); await sleep(5200);
const kb = await ev(`(()=>{
  const sel='a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
  const all=[...document.querySelectorAll(sel)];
  const out=[];
  for(const e of all){
    const cs=getComputedStyle(e); const r=e.getBoundingClientRect();
    const ti=e.getAttribute("tabindex");
    const offscreen = r.width===0&&r.height===0;
    const ariaHidden = !!e.closest("[aria-hidden='true']");
    const focusable = ti!=="-1" && !ariaHidden && cs.display!=="none" && cs.visibility!=="hidden";
    out.push({tag:e.tagName.toLowerCase(),n:e.name||e.id||"",ti,focusable,offscreen,ariaHidden,
      h:Math.round(r.height), vis:!offscreen,
      t:((e.getAttribute("aria-label")||e.innerText||e.textContent||"").replace(/\\s+/g," ").trim().slice(0,40))});
  }
  const hp=document.querySelector("[name='web']");
  let hpInfo=null;
  if(hp){ const cs=getComputedStyle(hp); const r=hp.getBoundingClientRect();
    hpInfo={tabindex:hp.getAttribute("tabindex"),ariaHidden:hp.getAttribute("aria-hidden"),
      closestAriaHidden:!!hp.closest("[aria-hidden='true']"),autocomplete:hp.getAttribute("autocomplete"),
      h:Math.round(r.height),w:Math.round(r.width),opacity:cs.opacity,position:cs.position,
      left:cs.left,top:cs.top,clip:cs.clipPath, labelText:(()=>{const l=hp.labels&&hp.labels[0];return l?(l.innerText||l.textContent||"").trim().slice(0,60):null;})(),
      wrapperText:(hp.parentElement?(hp.parentElement.innerText||hp.parentElement.textContent||"").replace(/\\s+/g," ").trim().slice(0,80):null)};}
  return {formFocusables:out.filter(x=>x.n||x.tag!=="a").slice(0,24), honeypot:hpInfo};})()`);
console.log(`  honeypot field [name=web]: ${JSON.stringify(kb.honeypot)}`);
console.log(`  focusable controls in order:`);
for (const f of kb.formFocusables) console.log(`     ${f.tag.padEnd(8)} ${String(f.n).padEnd(12)} h=${String(f.h).padStart(3)} tabindex=${String(f.ti)} focusable=${f.focusable} visible=${f.vis} ${JSON.stringify(f.t)}`);

// --- the header button Copy flags as S-1, as RENDERED
console.log("\n=== S-1 as rendered: the global header/menu button");
await send("Page.navigate", { url: `${BASE}/${LOC}` }); await sleep(5200);
const nav = await ev(`(async()=>{
  const hdr=document.querySelector("header");
  const inHeader=[...(hdr?hdr.querySelectorAll("a,button"):[])].map(e=>{const r=e.getBoundingClientRect();return{
    t:((e.getAttribute("aria-label")||e.innerText||e.textContent||"").replace(/\\s+/g," ").trim().slice(0,46)),
    href:(e.getAttribute("href")||""),w:Math.round(r.width),h:Math.round(r.height),vis:r.width>0}});
  // open the menu and read it
  const burger=[...document.querySelectorAll("button")].find(b=>/men[uú]/i.test(b.getAttribute("aria-label")||b.innerText||""));
  let menu=null;
  if(burger){ burger.click(); await new Promise(r=>setTimeout(r,900));
    menu=[...document.querySelectorAll("a,button")].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.top>=0&&r.top<innerHeight;}).map(e=>{const r=e.getBoundingClientRect();return{
      t:((e.getAttribute("aria-label")||e.innerText||e.textContent||"").replace(/\\s+/g," ").trim().slice(0,46)),
      href:(e.getAttribute("href")||""),w:Math.round(r.width),h:Math.round(r.height)}}); }
  return {inHeader,menu,menuOpened:!!burger};})()`);
console.log(`  header controls:`);
for (const h of nav.inHeader) console.log(`     ${String(h.w)}x${String(h.h)} ${JSON.stringify(h.t)} -> ${h.href}`);
console.log(`  menu opened=${nav.menuOpened}; controls visible with the menu open:`);
for (const m of (nav.menu || [])) console.log(`     ${String(m.w)}x${String(m.h)} ${JSON.stringify(m.t)} -> ${m.href}`);
process.exit(0);
