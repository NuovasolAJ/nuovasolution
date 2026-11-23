// R-3: every tap target at least 44 px. Redesign reports 0 under 44 on /, /packages, /contact,
// /platform, /faq and in the open menu. This is my own count.
//
// Two lessons are built in:
//  - Visibility is decided by walking the ANCESTORS (display:none, visibility:hidden, [hidden]),
//    never by the element's own computed display: a child of a display:none parent keeps its own
//    "flex" and would otherwise be counted. That was R-8.
//  - An inline link inside running text is NOT a tap target in the 44 px sense (WCAG 2.5.5 and
//    Apple's guidance both exempt links in a sentence), so counting them would manufacture
//    findings. They are classified separately and reported separately, not mixed into the number.
const BASE = process.argv[2], LOC = process.argv[3] || "es";
const W = Number(process.argv[4] || 390), H = Number(process.argv[5] || 844);
const OUT = process.argv[6] || `tippziele-${LOC}-${W}.json`;
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
const build = async () => { try { const r = await fetch(`${BASE}/api/build`, { signal: AbortSignal.timeout(20000) }); const j = await r.json(); return `${j.commit?.slice(0, 7)}/${j.deployment}`; } catch { return "UNREACHABLE"; } };
const PIN = await build();
if (PIN === "UNREACHABLE") { console.log("ABORT: build endpoint unreachable - nothing compared, NOT a pass"); process.exit(2); }
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 2, mobile: true });
await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });

const SCAN = `(()=>{
  const MIN=44;
  const sel="a[href],button,input:not([type=hidden]),select,textarea,[role=button],[role=link],[tabindex]:not([tabindex='-1'])";
  const hiddenAnc=(e)=>{let p=e,d=0;while(p&&p!==document.documentElement&&d<24){const c=getComputedStyle(p);
    if(c.display==="none") return "display:none";
    if(c.visibility==="hidden") return "visibility:hidden";
    if(Number(c.opacity)===0) return "opacity:0";
    if(p.hasAttribute&&p.hasAttribute("hidden")) return "[hidden]";
    p=p.parentElement;d++;} return null;};
  const out={small:[],inlineSmall:[],counted:0,inline:0,hidden:0};
  for(const e of document.querySelectorAll(sel)){
    const anc=hiddenAnc(e); if(anc){out.hidden++;continue;}
    const r=e.getBoundingClientRect();
    if(r.width===0||r.height===0){out.hidden++;continue;}
    const cs=getComputedStyle(e);
    const label=((e.getAttribute("aria-label")||e.innerText||e.textContent||e.value||"").replace(/[\\\s\\\u00a0]+/g," ").trim().slice(0,44));
    // inline link inside running text: display inline AND a text-bearing parent with more words than the link itself
    const par=e.parentElement;
    const parText=par?((par.innerText||"").replace(/[\\\s\\\u00a0]+/g," ").trim()):"";
    const isInlineInText = (cs.display==="inline"||cs.display==="inline-block"&&e.tagName==="A")
      && e.tagName==="A" && parText.length > label.length + 25
      && /^(P|LI|SPAN|SMALL|DD|DT|TD|FIGCAPTION|BLOCKQUOTE)$/.test(par?.tagName||"");
    const rec={tag:e.tagName.toLowerCase(),label,href:(e.getAttribute("href")||"").slice(0,54),
      w:Math.round(r.width*10)/10,h:Math.round(r.height*10)/10,display:cs.display,
      pageY:Math.round(r.top+window.scrollY)};
    if(isInlineInText){ out.inline++; if(r.width<MIN||r.height<MIN) out.inlineSmall.push(rec); continue; }
    out.counted++;
    if(r.width<MIN||r.height<MIN) out.small.push(rec);
  }
  return out;})()`;

const PAGES = [["/", "home"], ["/packages", "packages"], ["/contact?interes=trial&plan=essential", "contact"], ["/platform", "platform"], ["/faq", "faq"]];
const R = { pin: PIN, locale: LOC, viewport: `${W}x${H}`, pages: [] };
console.log(`\n######## R-3 tap targets, my own count  ${LOC} ${W}x${H}  build ${PIN}`);

for (const [path, name] of PAGES) {
  let ok = false;
  for (let a = 1; a <= 3 && !ok; a++) {
    await send("Page.navigate", { url: `${BASE}/${LOC}${path}` }); await sleep(a === 1 ? 6000 : 7500);
    const c = await ev(`(()=>({len:(document.body.innerText||"").length,n:document.querySelectorAll("a[href],button").length}))()`);
    ok = c && !c.__error && c.len > 400 && c.n > 3;
  }
  if (!ok) { console.log(`\n  ${name}: ABORT - never loaded, NOT a pass`); R.pages.push({ name, loaded: false }); continue; }
  // the whole page, not just the first screen: walk it so lazy sections render
  await ev(`(async()=>{const step=()=>new Promise(r=>setTimeout(r,90));
    for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await step();}
    window.scrollTo(0,0);await step();return true;})()`);
  await sleep(900);
  const s = await ev(SCAN);
  R.pages.push({ name, path, ...s });
  console.log(`\n  ${name.padEnd(9)} counted ${String(s.counted).padStart(3)} targets, ${s.inline} inline links in text, ${s.hidden} not visible`);
  console.log(`    under 44 px: ${s.small.length}`);
  for (const x of s.small) console.log(`      *** ${x.tag} ${x.w}x${x.h} ${JSON.stringify(x.label)} ${x.href ? "-> " + x.href : ""} (y=${x.pageY}, display=${x.display})`);
  if (s.inlineSmall.length) console.log(`    (inline links in running text under 44, reported separately, not counted: ${s.inlineSmall.length} - ${s.inlineSmall.slice(0, 4).map((x) => JSON.stringify(x.label) + " " + x.w + "x" + x.h).join(", ")})`);
}

// the open menu sheet
await send("Page.navigate", { url: `${BASE}/${LOC}/` }); await sleep(6000);
const opened = await ev(`(async()=>{const b=[...document.querySelectorAll("button")].find(x=>/men[uú]|menu/i.test(x.getAttribute("aria-label")||x.innerText||""));
  if(!b) return false; b.click(); await new Promise(r=>setTimeout(r,1000)); return true;})()`);
if (!opened) { console.log(`\n  open menu: burger not found - NOT a pass`); R.menu = { opened: false }; }
else {
  const s = await ev(SCAN);
  R.menu = { opened: true, ...s };
  console.log(`\n  open menu  counted ${s.counted} targets, ${s.hidden} not visible`);
  console.log(`    under 44 px: ${s.small.length}`);
  for (const x of s.small) console.log(`      *** ${x.tag} ${x.w}x${x.h} ${JSON.stringify(x.label)} ${x.href ? "-> " + x.href : ""}`);
}

const PIN2 = await build(); R.pinEnd = PIN2;
const total = R.pages.reduce((n, p) => n + (p.small?.length || 0), 0) + (R.menu?.small?.length || 0);
console.log(`\nRESULT  tap targets under 44 px across the five pages and the open menu: ${total}`);
console.log(`        build start ${PIN}  end ${PIN2}  ${PIN === PIN2 ? "STABLE" : "*** MOVED - VOID ***"}`);
const fs = await import("node:fs"); fs.writeFileSync(OUT, JSON.stringify(R, null, 1));
process.exit(PIN === PIN2 ? 0 : 4);
