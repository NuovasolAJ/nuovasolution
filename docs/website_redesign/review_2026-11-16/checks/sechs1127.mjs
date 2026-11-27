// RV6 own check of the owner's six E2 points of 27.11. on the named deployment (dbd14d8).
// Each point is measured, never read off the commit message. A point that could not be measured is
// reported as "not measured", never as a pass.
//  (1) hero text of 17.11., character for character, ES and EN (incl. "past")
//  (2) the scroll hint: present, 44 x 44, href #pain, #pain exists, real Tab reaches it, Enter lands there
//  (3) photo C: the four WebP widths, the drift, NO video layer, the shade only behind the words
//  (4) both WhatsApp heads neutral #f0f2f5 with ink label and the mark in #25d366 - in all three places
//  (5) the titles, and NO time inside a title; the 17:00 must still stand in Mila's record
//  (6) the tasks stacked and the report compact - structure unchanged
const BASE = process.argv[2];
const OUT = process.argv[3] || "sechs-1127.json";
const CDP = 9477, sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const EXPECT = {
  es: {
    h1: "Haz crecer tu inmobiliaria. No tu carga de trabajo.",
    sub: "NuovaSolution capta clientes, responde consultas y hace seguimiento. Reactiva contactos, propone inmuebles y te muestra qué merece tu atención, para que tu negocio avance sin que todo dependa de ti.",
    heroTask: "Devolver la llamada por el piso de Nerja",
    heroTaskLabel: "Tarea para Marta",
    demoEnd: "Llamar a Mila por el piso de Nerja",
  },
  en: {
    h1: "Grow your agency. Not your workload.",
    sub: "NuovaSolution brings in clients, answers enquiries and follows up. It re-engages past contacts, suggests properties and shows you what deserves your attention, so your business moves forward without everything depending on you.",
    heroTask: "Return the call about the flat in Nerja",
    heroTaskLabel: "Task for Marta",
    demoEnd: "Call Mila about the flat in Nerja",
  },
};

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
const key = async (k, code, vk) => { for (const type of ["keyDown", "keyUp"]) await send("Input.dispatchKeyEvent", { type, key: k, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk }); };
const tab = () => key("Tab", "Tab", 9);
const enter = () => key("Enter", "Enter", 13);
const build = async () => { try { const r = await fetch(`${BASE}/api/build`, { signal: AbortSignal.timeout(20000) }); const j = await r.json(); return `${j.commit}|${j.deployment}|${j.env}|${j.mode}`; } catch { return "UNREACHABLE"; } };

const PIN_START = await build();
if (PIN_START === "UNREACHABLE") { console.log("ABORT: build endpoint unreachable - NOT a pass"); process.exit(2); }
await send("Page.enable");

const res = { probe: "sechs1127", base: BASE, pin_start: PIN_START, when: new Date().toISOString(), points: {} };

const open = async (loc, W, H, MOB) => {
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: MOB ? 2 : 1, mobile: !!MOB });
  await send("Emulation.setTouchEmulationEnabled", { enabled: !!MOB, maxTouchPoints: MOB ? 5 : 0 });
  for (let a = 1; a <= 3; a++) {
    await send("Page.navigate", { url: `${BASE}/${loc}/` }); await sleep(a === 1 ? 6800 : 8200);
    const c = await ev(`(()=>({len:(document.body.innerText||"").length,h1:!!document.querySelector("h1")}))()`);
    if (c && !c.__error && c.h1 && c.len > 500) return true;
  }
  return false;
};

// ---------- (1) hero text, (3) photo, (5) titles, (6) structure : per locale on 1366 ----------
for (const loc of ["es", "en"]) {
  const E = EXPECT[loc];
  if (!await open(loc, 1366, 768, 0)) { res.points[`load_${loc}`] = "NOT MEASURED: home never loaded"; continue; }
  const t = await ev(`(()=>{
    const n = (s) => (s||"").replace(/[\\s\\u00a0]+/g," ").trim();
    const txt = (s) => { const e = document.querySelector(s); return e ? n(e.innerText) : null; };
    const img = document.querySelector("[data-hf-photo] img");
    const media = document.querySelector("[data-hf-image]");
    const shade = document.querySelector(".hf-shade");
    const body = n(document.body.innerText);
    // every element that is a TITLE in the structural sense
    const titleish = [...document.querySelectorAll("h1,h2,h3,h4,[data-hero-scene-task] p:first-child, [data-hero-scene-task] .hf-scene-task-title, .at-task-title, .demo-task-title")]
      .map((e)=>n(e.innerText)).filter(Boolean);
    return {
      h1: txt("h1"), sub: txt(".hf-lead"),
      heroTaskCard: txt("[data-hero-scene-task]"),
      heroCaption: txt("[data-hero-mark]"),
      milaMsg: txt("[data-hero-scene-enquiry]"),
      photo: img ? { src: img.getAttribute("src"), srcset: img.getAttribute("srcset"), widths: (img.getAttribute("srcset")||"").split(",").map(s=>s.trim().split(" ")[1]).filter(Boolean), w: img.width, h: img.height, fetchPriority: img.getAttribute("fetchpriority"), currentSrc: img.currentSrc } : null,
      photoId: media ? { id: media.getAttribute("data-hf-image"), photo: media.getAttribute("data-hf-photo") } : null,
      videoLayer: !!document.querySelector(".hf-video, video[data-hero-video]"),
      drift: (()=>{ const i=document.querySelector(".hf-image"); if(!i) return null; const cs=getComputedStyle(i); return { animation: cs.animationName, dur: cs.animationDuration }; })(),
      shade: shade ? { bg: getComputedStyle(shade).backgroundImage.slice(0,160), inset: getComputedStyle(shade).inset } : null,
      titleish: titleish.slice(0,40),
      titlesWithTime: titleish.filter((s)=>/\\b\\d{1,2}[:.]\\d{2}\\b/.test(s)),
      body1700: /17[:.]00/.test(body),
      tasksCount: document.querySelectorAll(".at-task, [data-agency-task]").length,
      reportCards: document.querySelectorAll("[data-report-card], .rep-card").length
    };
  })()`);
  const eq = (a, b) => a === b;
  res.points[`p1_hero_${loc}`] = { h1_ok: eq(t.h1, E.h1), sub_ok: eq(t.sub, E.sub), h1_got: t.h1, sub_got: t.sub, en_past: loc === "en" ? /re-engages past contacts/.test(t.sub || "") : null };
  res.points[`p3_photo_${loc}`] = { photoId: t.photoId, widths: t.photo?.widths, currentSrc: t.photo?.currentSrc, fetchPriority: t.photo?.fetchPriority, videoLayer: t.videoLayer, drift: t.drift, shade: t.shade };
  res.points[`p5_titles_${loc}`] = { heroTaskCard: t.heroTaskCard, heroTask_ok: (t.heroTaskCard || "").includes(E.heroTask), heroLabel_ok: (t.heroTaskCard || "").includes(E.heroTaskLabel), titlesWithTime: t.titlesWithTime, bodyKeeps1700: t.body1700, milaMsg: t.milaMsg, caption: t.heroCaption };
  res.points[`p6_structure_${loc}`] = { tasksCount: t.tasksCount, reportCards: t.reportCards };

  // (4) the three WhatsApp heads - first screen label, agency-task proof, and (after the run) the demo head
  const heads = await ev(`(()=>{
    const c = (e,p) => e ? getComputedStyle(e)[p] : null;
    const one = (sel) => { const e = document.querySelector(sel); if(!e) return null; const svg = e.querySelector("svg"); const lab = e.querySelector(".demo-chat-name") || e; return { bg: c(e,"backgroundColor"), label: c(lab,"color"), mark: svg ? c(svg,"color") : null, text: (e.innerText||"").replace(/\\s+/g," ").trim().slice(0,60) }; };
    return { heroLabel: one(".hf-scene-msg .hf-scene-label"), agencyTask: one(".at-chat-head") };
  })()`);
  res.points[`p4_heads_${loc}`] = heads;
}

// ---------- (2) the scroll hint, on desktop and on the small phone ----------
for (const [loc, W, H, MOB] of [["es", 1366, 768, 0], ["en", 1366, 768, 0], ["es", 390, 844, 1], ["es", 360, 640, 1]]) {
  const tag = `p2_edge_${loc}_${W}`;
  if (!await open(loc, W, H, MOB)) { res.points[tag] = "NOT MEASURED: home never loaded"; continue; }
  await ev(`window.scrollTo(0,0)`); await sleep(500);
  const geo = await ev(`(()=>{const e=document.querySelector(".hf-edge"); if(!e) return {present:false, painId: !!document.getElementById("pain")}; const r=e.getBoundingClientRect(); const cs=getComputedStyle(e); return { present:true, w:Math.round(r.width), h:Math.round(r.height), wExact:r.width, hExact:r.height, top:Math.round(r.top), bottom:Math.round(r.bottom), display:cs.display, visibility:cs.visibility, opacity:cs.opacity, href:e.getAttribute("href"), label:e.getAttribute("aria-label"), inFold: r.bottom <= innerHeight + 1, painId: !!document.getElementById("pain"), animation: cs.animationName };})()`);
  let presses = 0, found = false;
  for (let i = 0; i < 40 && !found; i++) { await tab(); presses++; await sleep(90); found = !!(await ev(`document.activeElement && document.activeElement.classList && document.activeElement.classList.contains("hf-edge")`)); }
  let jump = null, focusVis = null;
  if (found) {
    focusVis = await ev(`(()=>{try{return document.activeElement.matches(":focus-visible");}catch(e){return null;}})()`);
    await enter(); await sleep(1400);
    jump = await ev(`(()=>{const p=document.getElementById("pain"); return { scrollY: Math.round(scrollY), painTop: p?Math.round(p.getBoundingClientRect().top):null, painInView: p ? (p.getBoundingClientRect().top < innerHeight && p.getBoundingClientRect().bottom > 0) : null, hash: location.hash };})()`);
  }
  res.points[tag] = { geo, tab: { presses, found, focusVisible: focusVis }, jump };
}

// ---------- (4b) the demo head, after the run, 1366 ES ----------
if (await open("es", 1366, 768, 0)) {
  const clicked = await ev(`(()=>{const a=document.querySelector("[data-hero-cta='task']"); if(!a) return false; a.click(); return true;})()`);
  await sleep(18000);
  res.points.p4_demoHead = await ev(`(()=>{
    const c=(e,p)=>e?getComputedStyle(e)[p]:null;
    const h=document.querySelector(".demo-chat-head"); if(!h) return {present:false, clicked:${clicked}};
    const svg=h.querySelector("svg"), name=h.querySelector(".demo-chat-name"), role=h.querySelector(".demo-chat-role");
    const n=(s)=>(s||"").replace(/\\s+/g," ").trim();
    return { present:true, clicked:${clicked}, bg:c(h,"backgroundColor"), name:c(name,"color"), role:c(role,"color"), mark: svg?c(svg,"color"):null, head:n(h.innerText),
      endTitle: n((document.querySelector("[data-demo-end-title], .demo-end-title, [data-demo-next]")||{}).innerText),
      bodyHasEnd: /Llamar a Mila por el piso de Nerja/.test(document.body.innerText),
      bodyHasOldTime: /17:00 · (Comprobar|Llamar)/.test(document.body.innerText) };
  })()`);
}

res.pin_end = await build();
res.pinned = res.pin_start === res.pin_end;
if (!res.pinned) res.VOID = "build moved during the run - every figure VOID";
await (await import("node:fs")).promises.writeFile(OUT, JSON.stringify(res, null, 1));
console.log(JSON.stringify({ pinned: res.pinned, out: OUT }, null, 1));
process.exit(0);
