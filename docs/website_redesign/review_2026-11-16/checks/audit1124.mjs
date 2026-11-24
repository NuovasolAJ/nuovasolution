// Audit 24.11.: per finding JA or NEIN on the preview bea7d19, with a picture.
//   F20  "en segundos" claimed for MAIL is unproven        (Fehlerliste row 39)
//   F22  Hero cut off at 1366x768 · "teléfono" tick · contrast on the phone · kicker doubled (row 41)
//   F27  site says "no calcula una puntuación" while prod has a score (row 49, product-views.tsx:54)
// Each check writes its own PNG, because a verdict without a picture is an opinion.
// Build pinned at start and end; a moved build voids the run.
const BASE = process.argv[2];
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
if (PIN === "UNREACHABLE") { console.log("ABORT: build endpoint unreachable - nothing compared, NOT a verdict"); process.exit(2); }
const fs = await import("node:fs");
const shot = async (name, clip) => {
  const p = { format: "png", captureBeyondViewport: !!clip };
  if (clip) p.clip = { ...clip, scale: 1 };
  const r = await send("Page.captureScreenshot", p);
  const d = r.result?.data; if (!d) { console.log(`     (picture ${name} FAILED)`); return null; }
  fs.writeFileSync(name, Buffer.from(d, "base64"));
  return name;
};
const view = async (w, h, mobile) => {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: mobile ? 2 : 1, mobile });
  await send("Emulation.setTouchEmulationEnabled", { enabled: !!mobile, maxTouchPoints: mobile ? 5 : 0 });
};
const open = async (path, w, h, mobile) => {
  await view(w, h, mobile);
  for (let a = 1; a <= 3; a++) {
    await send("Page.navigate", { url: `${BASE}${path}` }); await sleep(a === 1 ? 6400 : 7600);
    const c = await ev(`(()=>({len:(document.body.innerText||"").length,h1:!!document.querySelector("h1")}))()`);
    if (c && !c.__error && c.len > 300) return true;
  }
  return false;
};
await send("Page.enable");
const R = { pin: PIN, checks: [] };

// ---------- F20 -------------------------------------------------------------
console.log(`\n######## F20  "en segundos" fuer MAIL   build ${PIN}`);
if (!(await open("/es", 390, 844, true))) { console.log("  ABORT: /es never loaded"); }
else {
  await ev(`(async()=>{const s=()=>new Promise(r=>setTimeout(r,90));
    for(let y=0;y<document.body.scrollHeight;y+=420){window.scrollTo(0,y);await s();} window.scrollTo(0,0);await s();return true;})()`);
  await sleep(1200);
  const f20 = await ev(`(()=>{
    const t=(document.body.innerText||"").replace(/\\s+/g," ");
    const sents=t.split(/(?<=[.!?])\\s+/).filter(s=>/segundo/i.test(s));
    // the defect is "en segundos" attached to EMAIL. Attached to WhatsApp it is a different claim.
    const bad=sents.filter(s=>/en segundos[^.]{0,40}(email|correo)/i.test(s) && !/en segundos por WhatsApp/i.test(s));
    const el=[...document.querySelectorAll("p,span,li,h2,h3")].find(e=>/en segundos/i.test(e.innerText||""));
    if(el) el.scrollIntoView({block:"center",behavior:"instant"});
    return {sentences:sents, badOnes:bad, box: el?(()=>{const r=el.getBoundingClientRect();
      return {x:Math.round(r.left),y:Math.round(r.top),width:Math.round(r.width),height:Math.round(r.height)};})():null};})()`);
  await sleep(500);
  console.log(`  Saetze mit "segundo": ${f20.sentences.length}`);
  for (const s of f20.sentences) console.log(`     "${s.trim().slice(0, 150)}"`);
  console.log(`  davon "en segundos" an E-MAIL gebunden: ${f20.badOnes.length}`);
  const clip = f20.box ? { x: 0, y: Math.max(0, f20.box.y - 120), width: 390, height: Math.min(520, 844 - Math.max(0, f20.box.y - 120)) } : null;
  const pic = await shot("audit-F20-es390.png", clip);
  const verdict = f20.badOnes.length === 0 ? "JA (behoben)" : "NEIN (noch sichtbar)";
  console.log(`  VERDICT F20: ${verdict}   Bild: ${pic}`);
  R.checks.push({ id: "F20", verdict, detail: f20, picture: pic });
}

// ---------- F27 -------------------------------------------------------------
console.log(`\n######## F27  "no calcula una puntuacion"`);
const f27pages = ["/es", "/es/platform", "/es/trial", "/es/packages", "/es/faq"];
const f27hits = [];
for (const p of f27pages) {
  if (!(await open(p, 390, 844, true))) { console.log(`  ${p}: ABORT, contributes nothing`); f27hits.push({ page: p, loaded: false }); continue; }
  await ev(`(async()=>{const s=()=>new Promise(r=>setTimeout(r,90));
    for(let y=0;y<document.body.scrollHeight;y+=460){window.scrollTo(0,y);await s();}
    for(const t of document.querySelectorAll("summary,[aria-expanded],button[aria-controls]")){try{t.click();}catch(e){}}
    await s(); return true;})()`);
  await sleep(1100);
  const h = await ev(`(()=>{const t=(document.body.innerText||"").replace(/\\s+/g," ");
    const m=t.match(/no calcula[^.]{0,60}|puntuaci[oó]n[^.]{0,50}/i);
    return {hit:m?m[0]:null,len:t.length};})()`);
  console.log(`  ${p.padEnd(16)} ${h.hit ? "*** " + JSON.stringify(h.hit) : "kein Treffer"}  (${h.len} Zeichen gelesen)`);
  f27hits.push({ page: p, loaded: true, hit: h.hit });
}
// the picture: the product view on /es/platform, where the sentence stood
await open("/es/platform", 390, 844, true);
await ev(`(()=>{const e=[...document.querySelectorAll("h2,h3")].find(x=>/ficha|prioridad|lead/i.test(x.innerText||""));
  if(e) e.scrollIntoView({block:"center",behavior:"instant"}); return !!e;})()`);
await sleep(900);
const picF27 = await shot("audit-F27-es390-platform.png");
const vF27 = f27hits.every((x) => !x.hit) ? "JA (behoben)" : "NEIN (noch sichtbar)";
console.log(`  VERDICT F27: ${vF27}   Bild: ${picF27}`);
R.checks.push({ id: "F27", verdict: vF27, detail: f27hits, picture: picF27 });

// ---------- F22a  Hero at 1366x768 -----------------------------------------
console.log(`\n######## F22a  Hero bei 1366x768 abgeschnitten?`);
if (!(await open("/es", 1366, 768, false))) console.log("  ABORT");
else {
  await ev(`window.scrollTo(0,0)`); await sleep(900);
  const hero = await ev(`(()=>{const vh=innerHeight;
    const h1=document.querySelector("h1"); const r=h1?h1.getBoundingClientRect():null;
    // the HERO's own action, not the header's: take the one marked as a hero CTA, else the first
    // matching control that sits BELOW the h1 (run 1 picked the sticky header button at y=14)
    const marked=document.querySelector("[data-hero-cta]");
    const below=[...document.querySelectorAll("a,button")].filter(e=>/Prueba Essential|Ver c[oó]mo queda/i.test(e.innerText||"")
      && r && e.getBoundingClientRect().top > r.top);
    const cta=marked||below[0];
    const cr=cta?cta.getBoundingClientRect():null;
    // the task line itself, a LEAF (run 1 matched a wrapper 12786px tall)
    const task=[...document.querySelectorAll("p,span,div")].filter(e=>/Llamar a Mila/i.test(e.innerText||"")
      && !e.querySelector("p,span,div")).sort((a,b)=>(a.innerText||"").length-(b.innerText||"").length)[0];
    const tr=task?task.getBoundingClientRect():null;
    const cut=(el)=>el?{top:Math.round(el.top),bottom:Math.round(el.bottom),insideScreen:el.bottom<=vh}:null;
    return {vh, h1:cut(r), h1text:(h1?.innerText||"").replace(/\\s+/g," ").slice(0,60),
      cta:cut(cr), ctaText:(cta?.innerText||"").replace(/\\s+/g," ").slice(0,40),
      task:cut(tr), taskText:(task?.innerText||"").replace(/\\s+/g," ").slice(0,60),
      docH:document.documentElement.scrollHeight};})()`);
  console.log(`  Bildhoehe ${hero.vh}px`);
  console.log(`     h1    ${JSON.stringify(hero.h1)}  ${JSON.stringify(hero.h1text)}`);
  console.log(`     CTA   ${JSON.stringify(hero.cta)}  ${JSON.stringify(hero.ctaText)}`);
  console.log(`     Aufgabe ${JSON.stringify(hero.task)}  ${JSON.stringify(hero.taskText)}`);
  const picA = await shot("audit-F22a-d1366x768-hero.png");
  const okA = hero.h1?.insideScreen && hero.cta?.insideScreen;
  console.log(`  VERDICT F22a: ${okA ? "JA (h1 und Hauptaktion im ersten Bildschirm)" : "NEIN (abgeschnitten)"}   Bild: ${picA}`);
  R.checks.push({ id: "F22a", verdict: okA ? "JA" : "NEIN", detail: hero, picture: picA });
}

// ---------- F22b  the "teléfono" tick --------------------------------------
console.log(`\n######## F22b  "telefono"-Haken in der Vergleichstabelle`);
if (!(await open("/es/packages", 390, 844, true))) console.log("  ABORT");
else {
  // the matrix sits in a section that must be walked AND expanded, or the row is simply not there:
  // run 1 read only 1936 chars of this page and found nothing
  await ev(`(async()=>{const s=()=>new Promise(r=>setTimeout(r,110));
    for(let y=0;y<document.body.scrollHeight;y+=380){window.scrollTo(0,y);await s();}
    for(const t of document.querySelectorAll("summary,[aria-expanded],button[aria-controls]")){try{t.click();await s();}catch(e){}}
    window.scrollTo(0,0);await s(); return (document.body.innerText||"").length;})()`);
  await sleep(1200);
  // "telefónico" does NOT contain "teléfono" -- run 1's pattern missed "Asistente telefónico"
  const tel = await ev(`(()=>{
    const rows=[...document.querySelectorAll("tr,[role=row],li,div")].filter(e=>/tel[eé]fon/i.test(e.innerText||"")&&(e.innerText||"").length<200);
    const pick=rows.sort((a,b)=>(a.innerText||"").length-(b.innerText||"").length)[0];
    if(!pick) return {found:false};
    pick.scrollIntoView({block:"center",behavior:"instant"});
    const r=pick.getBoundingClientRect();
    const txt=(pick.innerText||"").replace(/\\s+/g," ").trim();
    // a tick can be a glyph or an svg with a label; a dash/"no" means not included
    const glyph=/[✓✔☑]/.test(txt);
    const svgs=[...pick.querySelectorAll("svg")].map(s=>(s.getAttribute("aria-label")||s.getAttribute("data-icon")||s.className?.baseVal||"")+"");
    const sr=[...pick.querySelectorAll("[aria-label],[title]")].map(e=>e.getAttribute("aria-label")||e.getAttribute("title"));
    return {found:true, text:txt, glyph, svgs, srLabels:sr,
      box:{x:Math.round(r.left),y:Math.round(r.top),width:Math.round(r.width),height:Math.round(r.height)},
      outer:pick.outerHTML.replace(/\\s+/g," ").slice(0,420)};})()`);
  if (!tel.found) console.log("  keine Zeile mit 'telefono' gefunden");
  else {
    console.log(`  Zeile: ${JSON.stringify(tel.text.slice(0, 140))}`);
    console.log(`     Haken als Zeichen: ${tel.glyph}   svg: ${JSON.stringify(tel.svgs)}   Vorlese-Beschriftungen: ${JSON.stringify(tel.srLabels)}`);
    console.log(`     markup: ${tel.outer.slice(0, 300)}`);
  }
  const picB = await shot("audit-F22b-es390-telefono.png", tel.found ? { x: 0, y: Math.max(0, tel.box.y - 150), width: 390, height: 460 } : null);
  R.checks.push({ id: "F22b", verdict: "siehe Bericht", detail: tel, picture: picB });
  console.log(`  Bild: ${picB}`);
}

// ---------- F22c  contrast on the phone ------------------------------------
console.log(`\n######## F22c  Kontrast am Handy`);
if (!(await open("/es", 390, 844, true))) console.log("  ABORT");
else {
  await sleep(700);
  // Run 1 reported 1:1 for white text on "rgba(255,255,255,0.06)". That was MY code, not the page:
  // it took the first non-transparent ancestor background and ignored its alpha, so a 6 % white veil
  // was read as the backdrop. A translucent layer must be COMPOSITED over what is behind it.
  const con = await ev(`(()=>{
    const parseC=(c)=>{const m=(c||"").match(/[\\d.]+/g)||[];
      return {r:+m[0]||0,g:+m[1]||0,b:+m[2]||0,a:m.length>3?+m[3]:1};};
    const over=(f,b)=>({r:f.r*f.a+b.r*(1-f.a),g:f.g*f.a+b.g*(1-f.a),b:f.b*f.a+b.b*(1-f.a),a:1});
    const lum=(k)=>{const f=[k.r,k.g,k.b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});
      return 0.2126*f[0]+0.7152*f[1]+0.0722*f[2];};
    const effBg=(e)=>{const st=[];let p=e;
      for(let i=0;i<24&&p;i++){const k=parseC(getComputedStyle(p).backgroundColor); if(k.a>0) st.push(k); p=p.parentElement;}
      let base={r:255,g:255,b:255,a:1};
      for(let i=st.length-1;i>=0;i--) base=over(st[i],base);
      return base;};
    const out=[];
    for(const e of document.querySelectorAll("p,span,a,li,h1,h2,h3,button,small")){
      const r=e.getBoundingClientRect();
      if(r.top<0||r.top>innerHeight||r.width<6||r.height<6) continue;
      if(e.querySelector("p,span,a,li,h1,h2,h3,button,small")) continue;
      const t=(e.innerText||"").trim(); if(t.length<2) continue;
      const cs=getComputedStyle(e);
      const bgK=effBg(e);
      const fgK=over(parseC(cs.color),bgK);   // text can be translucent too
      const fg=cs.color, bg="rgb("+[bgK.r,bgK.g,bgK.b].map(v=>Math.round(v)).join(", ")+")";
      const L1=lum(fgK),L2=lum(bgK);
      const ratio=Math.round(((Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05))*100)/100;
      const px=parseFloat(cs.fontSize), bold=(parseInt(cs.fontWeight,10)||400)>=700;
      const large=(px>=24)||(px>=18.66&&bold);
      const need=large?3:4.5;
      out.push({text:t.slice(0,46),fg,bg,ratio,px:Math.round(px*10)/10,weight:cs.fontWeight,large,need,pass:ratio>=need,
        y:Math.round(r.top)});
    }
    return out.sort((a,b)=>a.ratio-b.ratio);})()`);
  const fails = (con || []).filter((x) => !x.pass);
  console.log(`  ${con.length} Textstellen im ersten Bildschirm geprueft, ${fails.length} unter der Schwelle (AA: 4.5, grosse Schrift 3.0)`);
  for (const f of fails.slice(0, 10)) console.log(`     *** ${String(f.ratio).padStart(5)} : 1  (braucht ${f.need})  ${f.px}px/${f.weight}  ${f.fg} auf ${f.bg}  y=${f.y}  ${JSON.stringify(f.text)}`);
  if (!fails.length) console.log(`     niedrigster Wert: ${con[0]?.ratio} : 1 bei ${JSON.stringify(con[0]?.text)} (braucht ${con[0]?.need})`);
  const picC = await shot("audit-F22c-es390-kontrast.png");
  const okC = fails.length === 0;
  console.log(`  VERDICT F22c: ${okC ? "JA (keine Stelle unter AA im ersten Bildschirm)" : "NEIN (" + fails.length + " Stellen unter AA)"}   Bild: ${picC}`);
  R.checks.push({ id: "F22c", verdict: okC ? "JA" : "NEIN", detail: { checked: con.length, fails }, picture: picC });
}

// ---------- F22d  kicker doubled -------------------------------------------
console.log(`\n######## F22d  Kicker doppelt`);
await open("/es", 390, 844, true);
await ev(`window.scrollTo(0,0)`); await sleep(700);
const kick = await ev(`(()=>{const h1=document.querySelector("h1"); if(!h1) return {noH1:true};
  const hr=h1.getBoundingClientRect();
  const above=[];
  for(const e of document.querySelectorAll("p,span,div,small")){
    const r=e.getBoundingClientRect();
    if(r.bottom>hr.top||r.top<0||r.width<10||r.height<6) continue;
    if(e.querySelector("p,span,div,small")) continue;
    const t=(e.innerText||"").replace(/\\s+/g," ").trim(); if(!t||t.length<3||t.length>90) continue;
    const cs=getComputedStyle(e);
    above.push({text:t.slice(0,70),y:Math.round(r.top),px:Math.round(parseFloat(cs.fontSize)*10)/10,
      transform:cs.textTransform,spacing:cs.letterSpacing,weight:cs.fontWeight});
  }
  above.sort((a,b)=>a.y-b.y);
  // a kicker: small, uppercase or wide-tracked, sitting directly above the h1
  const kickers=above.filter(x=>x.px<=15 && (x.transform==="uppercase"||parseFloat(x.spacing)>0.4));
  return {h1top:Math.round(hr.top), above, kickers};})()`);
console.log(`  Textzeilen oberhalb der h1 (${kick.above?.length ?? 0}):`);
for (const a of kick.above || []) console.log(`     y=${String(a.y).padStart(4)} ${String(a.px).padStart(5)}px ${a.transform.padEnd(10)} spacing=${a.spacing.padEnd(8)} ${JSON.stringify(a.text)}`);
console.log(`  davon kicker-artig (klein + Versalien/weite Sperrung): ${kick.kickers?.length ?? 0}`);
const picD = await shot("audit-F22d-es390-kicker.png", { x: 0, y: 0, width: 390, height: 520 });
const okD = (kick.kickers?.length ?? 0) <= 1;
console.log(`  VERDICT F22d: ${okD ? "JA (nur ein Kicker)" : "NEIN (" + kick.kickers.length + " Kicker uebereinander)"}   Bild: ${picD}`);
R.checks.push({ id: "F22d", verdict: okD ? "JA" : "NEIN", detail: kick, picture: picD });

const PIN2 = await build(); R.pinEnd = PIN2;
console.log(`\n  build start ${PIN}  end ${PIN2}  ${PIN === PIN2 ? "STABLE" : "*** MOVED - VOID ***"}`);
fs.writeFileSync("audit1124-verdicts.json", JSON.stringify(R, null, 1));
process.exit(PIN === PIN2 ? 0 : 4);
