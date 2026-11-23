// The remaining items of the owner's brief, so the real run is ONE pass:
//   menu, back, language switch, touch, keyboard, reduced motion
//   E-1 Mila's enquiry -> the next action      (the result, W-1 measures the path)
//   E-2 weekly report -> who needs a person    (stage 2 per Redesign; measured, not assumed)
//   E-3 compare plans -> the key difference, and which plan has the 14 free days
// Reduced motion is really applied via Emulation.setEmulatedMedia, not assumed.
const BASE = process.argv[2];
const LOC = process.argv[3] || "es";
const W = Number(process.argv[4] || 390), H = Number(process.argv[5] || 844);
const OUT = process.argv[6] || `rest-${LOC}-${W}.json`;
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
const build = async () => { try { const r = await fetch(`${BASE}/api/build`, { signal: AbortSignal.timeout(20000) }); const j = await r.json(); return `${j.commit?.slice(0, 7)}/${j.deployment}`; } catch { return "UNREACHABLE"; } };
const PIN = await build();
if (PIN === "UNREACHABLE") { console.log("ABORT: build endpoint unreachable"); process.exit(2); }
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
const go = async (url, sel) => {
  for (let a = 1; a <= 3; a++) {
    await send("Page.navigate", { url }); await sleep(a === 1 ? 5600 : 7200);
    const c = await ev(`(()=>({len:(document.body?.innerText||"").length,s:${JSON.stringify(sel || "body")}?!!document.querySelector(${JSON.stringify(sel || "body")}):true}))()`);
    if (c && !c.__error && c.len > 400 && c.s) return true;
  }
  return false;
};
const R = { pin: PIN, locale: LOC, viewport: `${W}x${H}` };
console.log(`\n######## rest of the brief  ${LOC}  ${W}x${H}  build ${PIN}`);

// ---------------- MENU: open, every entry >= 44, Escape closes, focus handling
console.log(`\n## menu`);
if (!(await go(`${BASE}/${LOC}`, "h1"))) { console.log("  ABORT: home not loaded"); process.exit(3); }
R.menu = await ev(`(async()=>{
  const burger=[...document.querySelectorAll("button")].find(b=>/men[uú]/i.test(b.getAttribute("aria-label")||b.innerText||""));
  if(!burger) return {burger:false};
  const bb=burger.getBoundingClientRect();
  burger.click(); await new Promise(r=>setTimeout(r,900));
  const open=[...document.querySelectorAll("a,button")].filter(e=>{const r=e.getBoundingClientRect();
    return r.width>0&&r.height>0&&r.top>=-2&&r.top<innerHeight;});
  const items=open.map(e=>{const r=e.getBoundingClientRect();return{
    t:((e.getAttribute("aria-label")||e.innerText||e.textContent||"").replace(/\\s+/g," ").trim().slice(0,40)),
    w:Math.round(r.width*10)/10,h:Math.round(r.height*10)/10,
    previewOnly:!!e.closest("[data-pv-toggle],[data-preview-panel]"),
    href:(e.getAttribute("href")||"")};});
  const under44=items.filter(i=>!i.previewOnly&&(i.h<44||i.w<44));
  // does the page behind the menu still scroll? (a common mobile defect)
  const bodyOverflow=getComputedStyle(document.body).overflow;
  const expandedAttr=burger.getAttribute("aria-expanded");
  // Escape
  document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}));
  await new Promise(r=>setTimeout(r,700));
  const stillOpen=[...document.querySelectorAll("a,button")].filter(e=>{const r=e.getBoundingClientRect();
    return r.width>0&&/Cerrar|Close/i.test(e.getAttribute("aria-label")||e.innerText||"");}).length>0;
  return {burger:true,burgerBox:(Math.round(bb.width)+"x"+Math.round(bb.height)),
    count:items.length,items,under44,bodyOverflow,expandedAttr,escapeClosed:!stillOpen};})()`);
console.log(`  burger ${R.menu.burgerBox}, aria-expanded=${R.menu.expandedAttr}, body overflow with menu open=${R.menu.bodyOverflow}`);
console.log(`  entries: ${R.menu.count}; Escape closes it: ${R.menu.escapeClosed ? "yes" : "NO"}`);
console.log(`  under 44 px (preview-only excluded): ${R.menu.under44.length}`);
for (const u of R.menu.under44) console.log(`     ${u.w}x${u.h} ${JSON.stringify(u.t)} -> ${u.href}`);

// ---------------- BACK: does the browser back button return to where the visitor was
console.log(`\n## back button`);
R.back = [];
for (const [from, selClick, label] of [
  [`${BASE}/${LOC}`, '[data-plan-cta="card-essential"]', "home -> Essential form -> back"],
  [`${BASE}/${LOC}`, '[data-report-link]', "home -> example report -> back"],
]) {
  if (!(await go(from, "h1"))) { console.log(`  ${label}: ABORT, home not loaded`); continue; }
  // split into steps: a navigation inside an awaited evaluate destroys the execution context,
  // so the click, the wait and each read are separate round trips.
  const pos = await ev(`(async()=>{
    const e=document.querySelector(${JSON.stringify(selClick)});
    if(!e) return {found:false};
    e.scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,450));
    const r=e.getBoundingClientRect();
    return {found:true,yBefore:Math.round(scrollY),urlBefore:location.pathname+location.search,
      cx:Math.round(r.left+r.width/2),cy:Math.round(r.top+r.height/2)};})()`);
  if (!pos || pos.__error || !pos.found) { console.log(`  ${label}: target not present`); R.back.push({ label, found: false }); continue; }
  await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: pos.cx, y: pos.cy, radiusX: 11, radiusY: 11 }] });
  await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await sleep(3000);
  const mid = await ev(`({url:location.pathname+location.search,h1:(document.querySelector("h1")?.innerText||"").replace(/\\s+/g," ").slice(0,60)})`);
  await ev(`history.back()`);
  await sleep(3200);
  const bk = await ev(`({url:location.pathname+location.search,y:Math.round(scrollY),h1:(document.querySelector("h1")?.innerText||"").replace(/\\s+/g," ").slice(0,60)})`);
  const step = { found: true, yBefore: pos.yBefore, urlBefore: pos.urlBefore,
    urlAfter: mid?.url ?? "(unreadable)", urlBack: bk?.url ?? "(unreadable)",
    yBack: bk?.y ?? null, h1Back: bk?.h1 ?? "" };
  const ok = step.urlBack === step.urlBefore;
  const drift = step.yBack === null ? null : Math.abs(step.yBack - step.yBefore);
  R.back.push({ label, ...step, returned: ok, scrollDrift: drift });
  if (!step.found) { console.log(`  ${label}: target not present`); continue; }
  console.log(`  ${label}`);
  console.log(`     went to ${step.urlAfter}, back landed on ${step.urlBack} (${ok ? "right page" : "WRONG PAGE"})`);
  console.log(`     scroll before ${step.yBefore} -> after back ${step.yBack} (drift ${drift} px)${drift > 300 ? "  *** loses the visitor's place" : ""}`);
}

// ---------------- LANGUAGE SWITCH: same page? query kept?
console.log(`\n## language switch`);
R.lang = [];
for (const path of ["", "/packages", `/contact?interes=trial&plan=essential`]) {
  if (!(await go(`${BASE}/${LOC}${path}`, "h1"))) { console.log(`  ${path || "/"}: ABORT`); continue; }
  // locate the switcher (opening the menu if it only lives there), then click and read separately
  const loc = await ev(`(async()=>{
    const before=location.pathname+location.search;
    const other=${JSON.stringify(LOC === "es" ? "/en" : "/es")};
    // MUST require a visible box: the collapsed desktop utilities hold a 0x0 copy of the same
    // link, and tapping that one hits nothing - which would read as "the language switch is
    // broken" when the switch is fine. All language links are collected for the record.
    const cands=[...document.querySelectorAll("a[href]")].filter(x=>{const h=x.getAttribute("href")||"";
      return h===other||h.startsWith(other+"/")||h.startsWith(other+"?");});
    const find=()=>cands.filter(x=>{const r=x.getBoundingClientRect();return r.width>0&&r.height>0;})[0];
    let a=find(); let viaMenu=false;
    const allHrefs=cands.map(x=>{const r=x.getBoundingClientRect();
      return x.getAttribute("href")+" ["+Math.round(r.width)+"x"+Math.round(r.height)+"]";});
    if(!a){
      const burger=[...document.querySelectorAll("button")].find(b=>/men[uú]/i.test(b.getAttribute("aria-label")||b.innerText||""));
      if(burger){ burger.click(); viaMenu=true; await new Promise(r=>setTimeout(r,900));
        const c2=[...document.querySelectorAll("a[href]")].filter(x=>{const h=x.getAttribute("href")||"";
          return h===other||h.startsWith(other+"/")||h.startsWith(other+"?");});
        a=c2.filter(x=>{const r=x.getBoundingClientRect();return r.width>0&&r.height>0;})[0];
        if(a) allHrefs.push("(after menu) "+a.getAttribute("href")); } }
    if(!a) return {found:false,before,viaMenu,allHrefs};
    a.scrollIntoView({block:"center",behavior:"instant"}); await new Promise(r=>setTimeout(r,350));
    const r=a.getBoundingClientRect();
    return {found:true,before,viaMenu,allHrefs,href:a.getAttribute("href"),
      cx:Math.round(r.left+r.width/2),cy:Math.round(r.top+r.height/2),
      w:Math.round(r.width*10)/10,h:Math.round(r.height*10)/10};})()`);
  const expect = (LOC === "es" ? "/en" : "/es") + path;
  if (!loc || loc.__error || !loc.found) {
    console.log(`  /${LOC}${path || "/"}  language link NOT FOUND (menu opened: ${loc?.viaMenu}) - reported as not reachable`);
    R.lang.push({ from: `/${LOC}${path}`, expect, found: false, viaMenu: loc?.viaMenu }); continue;
  }
  await send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: loc.cx, y: loc.cy, radiusX: 11, radiusY: 11 }] });
  await send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await sleep(3400);
  const land = await ev(`({after:location.pathname+location.search,h1:(document.querySelector("h1")?.innerText||"").replace(/\\s+/g," ").slice(0,70)})`);
  const s = { ...loc, after: land?.after ?? "(unreadable)", h1: land?.h1 ?? "" };
  const same = s.after === expect;
  R.lang.push({ from: `/${LOC}${path}`, expect, ...s, keptPage: same });
  console.log(`  /${LOC}${path || "/"}  -> link ${JSON.stringify(s.href)} ${s.w}x${s.h}${s.viaMenu ? " (in the menu)" : ""}  landed ${s.after}`);
  console.log(`     all language links on the page: ${JSON.stringify(s.allHrefs)}`);
  console.log(`     expected ${expect}: ${same ? "same page kept" : "*** NOT the same page/query"}   h1=${JSON.stringify((s.h1 || "").slice(0, 50))}`);
}

// ---------------- KEYBOARD: can the main action be reached, is focus visible
console.log(`\n## keyboard`);
if (await go(`${BASE}/${LOC}`, "h1")) {
  R.keyboard = await ev(`(()=>{
    const sel='a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';
    const all=[...document.querySelectorAll(sel)].filter(e=>{const r=e.getBoundingClientRect();const c=getComputedStyle(e);
      return c.display!=="none"&&c.visibility!=="hidden"&&!e.closest("[aria-hidden='true']");});
    const skip=all.find(e=>/Ir al contenido|Skip to content/i.test(e.innerText||e.textContent||""));
    const mainIdx=all.findIndex(e=>(e.getAttribute("href")||"").includes("interes=trial"));
    // focus ring: focus the main CTA and see whether anything visibly changes
    let ring=null;
    if(mainIdx>=0){ const e=all[mainIdx]; e.focus();
      const cs=getComputedStyle(e);
      ring={outlineStyle:cs.outlineStyle,outlineWidth:cs.outlineWidth,boxShadow:(cs.boxShadow||"").slice(0,60),
        isFocused:document.activeElement===e}; }
    const invisible=all.filter(e=>{const r=e.getBoundingClientRect();return r.width===0||r.height===0;})
      // NOTE: a backslash escape inside a template literal decays (\\s -> s) and would silently
      // strip every "s" from the labels. Use a class that needs no escape.
      .map(e=>((e.getAttribute("aria-label")||e.innerText||e.textContent||"").replace(/[\\s\\u00a0]+/g," ").trim().slice(0,30)));
    return {focusables:all.length, invisibleStops:invisible.length, invisibleList:invisible.slice(0,18),
      skipLinkFirst: skip?all.indexOf(skip)===0:false,
      skipLinkPresent:!!skip, tabsToMainCta: mainIdx>=0?mainIdx+1:null, ring};})()`);
  console.log(`  focusable elements: ${R.keyboard.focusables}; skip link present=${R.keyboard.skipLinkPresent} first=${R.keyboard.skipLinkFirst}`);
  console.log(`  INVISIBLE focus stops (0 size, still tabbable): ${R.keyboard.invisibleStops}`);
  if (R.keyboard.invisibleStops) console.log(`     ${JSON.stringify(R.keyboard.invisibleList)}`);
  console.log(`  tab presses to reach the main free-trial action: ${R.keyboard.tabsToMainCta ?? "NOT REACHABLE"}`);
  console.log(`  focus indicator on it: ${JSON.stringify(R.keyboard.ring)}`);
}

// ---------------- REDUCED MOTION, actually emulated (intent (d): the finished picture stands)
console.log(`\n## reduced motion (really emulated, not assumed)`);
await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
if (await go(`${BASE}/${LOC}`, "[data-demo]")) {
  R.reduced = await ev(`(async()=>{
    const q=matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d=document.querySelector("[data-demo]");
    d.scrollIntoView({block:"center",behavior:"instant"});
    const a0=Object.fromEntries([...d.attributes].filter(x=>x.name.startsWith("data-")).map(x=>[x.name,x.value]));
    await new Promise(r=>setTimeout(r,6000));
    const a1=Object.fromEntries([...d.attributes].filter(x=>x.name.startsWith("data-")).map(x=>[x.name,x.value]));
    const anim=document.getAnimations?document.getAnimations().filter(x=>x.playState==="running").length:null;
    const txt=(d.innerText||d.textContent||"").replace(/[\\s\\u00a0]+/g," ").trim();
    return {mediaMatches:q, before:a0, after:a1, runningAnimations:anim,
      showsTask:/TAREA|TASK/i.test(txt), len:txt.length};})()`);
  console.log(`  media query matches inside the page: ${R.reduced.mediaMatches}`);
  console.log(`  demo phase before -> after 6 s: ${R.reduced.before["data-demo-phase"]} -> ${R.reduced.after["data-demo-phase"]}  (done=${R.reduced.after["data-demo-done"]}, auto=${R.reduced.after["data-demo-auto"]})`);
  console.log(`  running animations: ${R.reduced.runningAnimations}; the finished task is shown: ${R.reduced.showsTask}`);
  const stood = R.reduced.before["data-demo-phase"] === R.reduced.after["data-demo-phase"];
  console.log(`  intent (d) "the finished picture stands, no run": ${stood ? "holds" : "*** the phase advanced, so it ran"}`);
}
await send("Emulation.setEmulatedMedia", { features: [] });

// ---------------- E-2 and E-3, the two first-visitor tasks beyond W-1
console.log(`\n## E-2  weekly report -> who needs a person`);
if (await go(`${BASE}/${LOC}/example-report`, "h1")) {
  R.e2 = await ev(`(async()=>{
    var y=0,s=0; while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,70));y+=600;s++;if(s>300)break;}
    const b=(document.body.innerText||document.body.textContent||"").replace(/[\\s\\u00a0]+/g," ").trim();
    return {h1:(document.querySelector("h1")?.innerText||"").replace(/\\s+/g," ").slice(0,90),
      len:b.length, marks:(b.match(/pr[óo]ximamente|coming soon/gi)||[]).length,
      // E-2 is answered by the OPEN CASES table (who / what / priority / next step / state) plus
      // the numbered action list - not by a vague "needs attention" wording. My first criterion
      // looked for that wording and reported a page that answers the task as failing it.
      openCases:(()=>{const h=[...document.querySelectorAll("h2,h3")].find(x=>/Casos abiertos|Open cases/i.test(x.innerText||x.textContent||""));
        if(!h) return null; const sec=h.closest("section")||h.parentElement;
        const t=(sec.innerText||sec.textContent||"").replace(/[\\s\\u00a0]+/g," ").trim();
        return {hasPriority:/Alta|Media|Baja|High|Medium|Low/.test(t),
          hasNextStep:/SIGUIENTE PASO|NEXT STEP/i.test(t), hasState:/ESTADO|STATE|STATUS/i.test(t),
          priorityCells:(t.match(/Alta|Media|Baja|High|Medium|Low/g)||[]).length, len:t.length};})(),
      toDo:(()=>{const h=[...document.querySelectorAll("h2,h3")].find(x=>/toca hacer|What to do/i.test(x.innerText||x.textContent||""));
        if(!h) return null; const sec=h.closest("section")||h.parentElement;
        const t=(sec.innerText||sec.textContent||"").replace(/[\\s\\u00a0]+/g," ").trim();
        return {len:t.length, text:t.slice(0,300)};})(),
      cards:[...document.querySelectorAll("[data-insight],[data-report-card]")].length,
      headings:[...document.querySelectorAll("h2,h3")].map(e=>(e.innerText||e.textContent||"").replace(/[\\s\\u00a0]+/g," ").trim().slice(0,80)).filter(Boolean),
      text:b.slice(0,3000)};})()`);
  console.log(`  h1=${JSON.stringify(R.e2.h1)}  length=${R.e2.len}  insight cards=${R.e2.cards}  marks=${R.e2.marks}`);
  console.log(`  open-cases table: ${JSON.stringify(R.e2.openCases)}`);
  console.log(`  "what to do" list: ${JSON.stringify(R.e2.toDo)}`);
  const answerable = !!(R.e2.openCases?.hasPriority && R.e2.openCases?.hasNextStep && R.e2.toDo?.len > 20);
  console.log(`  E-2 answerable by a first-time visitor: ${answerable ? "YES" : "NO"}`);
  console.log(`  ${JSON.stringify((R.e2.text || "").slice(0, 500))}`);
} else { console.log(`  /${LOC}/example-report did not load - reported as not reachable, NOT as a pass`); R.e2 = { loaded: false }; }

console.log(`\n## E-3  compare plans: the key difference and the 14 free days`);
if (await go(`${BASE}/${LOC}/packages`, "h1")) {
  R.e3 = await ev(`(async()=>{
    var y=0,s=0; while(y<document.documentElement.scrollHeight){scrollTo({top:y,behavior:"instant"});await new Promise(r=>setTimeout(r,70));y+=600;s++;if(s>300)break;}
    const b=(document.body.innerText||document.body.textContent||"").replace(/[\\s\\u00a0]+/g," ").trim();
    const free=[...b.matchAll(/[^.]{0,70}(?:14 d[ií]as|14 days)[^.]{0,70}\\.?/gi)].map(m=>m[0].trim().slice(0,110));
    const diffs=[...document.querySelectorAll("[data-plan-diffs],[data-plan-diff]")].map(e=>({
      v:e.getAttribute("data-plan-diffs")||e.getAttribute("data-plan-diff")}));
    const essentialNear=free.filter(f=>/Essential/i.test(f)).length;
    return {h1:(document.querySelector("h1")?.innerText||"").replace(/\\s+/g," ").slice(0,90),
      marks:(b.match(/pr[óo]ximamente|coming soon/gi)||[]).length,
      freeSentences:free, freeNamesEssential:essentialNear, diffMarkers:diffs,
      growthFree:/Growth[^.]{0,40}(gratis|free)/i.test(b), entFree:/Enterprise[^.]{0,40}(gratis|free)/i.test(b),
      len:b.length};})()`);
  console.log(`  h1=${JSON.stringify(R.e3.h1)}  marks=${R.e3.marks}  diff markers=${JSON.stringify(R.e3.diffMarkers)}`);
  console.log(`  sentences carrying "14 days": ${R.e3.freeSentences.length}, of which naming Essential: ${R.e3.freeNamesEssential}`);
  for (const f of R.e3.freeSentences) console.log(`     ${JSON.stringify(f)}`);
  console.log(`  free wording attached to Growth: ${R.e3.growthFree}   to Enterprise: ${R.e3.entFree}   (both must be false)`);
} else { console.log(`  /${LOC}/packages did not load - not reachable, NOT a pass`); R.e3 = { loaded: false }; }

const PIN2 = await build(); R.pinEnd = PIN2;
console.log(`\n######## build start ${PIN}  end ${PIN2}  ${PIN === PIN2 ? "STABLE" : "*** MOVED - VOID ***"}`);
const fs = await import("node:fs"); fs.writeFileSync(OUT, JSON.stringify(R, null, 1));
process.exit(PIN === PIN2 ? 0 : 4);
