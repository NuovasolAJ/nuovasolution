// Verification of the owner's findings, each measured the way the owner sees it.
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9422; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const res = { deployment: BASE, started_utc: new Date().toISOString(), detail: {} };
const kids = [];
const prof = join(SHOTS, "vprof"); rmSync(prof, { recursive: true, force: true });
kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
const vp = (w, h, mobile = w <= 430) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile });
const go = async (p, w = 3400) => { await send("Page.navigate", { url: BASE + p }); await sleep(w); };
const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(SHOTS, n + ".png"), Buffer.from(s.result.data, "base64")); };
await send("Page.enable");

// 01 hero CTAs at scroll 0 only, four widths
const hero = {};
for (const [w, h] of [[390, 844], [768, 1024], [1280, 800], [1440, 950]]) {
  await vp(w, h); await go("/es");
  hero[w] = await ev(`(() => { const hdr = document.querySelector("header").getBoundingClientRect();
    const first = document.querySelector("main section");
    const ctas = [...first.querySelectorAll("a, button")].filter(e => { const r = e.getBoundingClientRect(); return r.height > 10 && r.top < innerHeight; });
    return { headerBottom: Math.round(hdr.bottom), position: getComputedStyle(document.querySelector("header")).position,
      ctas: ctas.slice(0, 6).map(e => { const r = e.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2; const top = document.elementFromPoint(cx, cy);
        return { label: (e.innerText || "").trim().slice(0, 24), top: Math.round(r.top), bottom: Math.round(r.bottom),
          underHeader: r.top < hdr.bottom, reachable: !!top && (e.contains(top) || top === e || e === top.closest("a,button")),
          coveredBy: top ? (top.tagName + " " + (top.innerText || "").trim().slice(0, 14)) : null }; }) }; })()`);
}
res.detail.hero_ctas = hero;
console.log("01 HERO:", JSON.stringify(hero).slice(0, 760));

// 03 narrow text columns across widths
const narrow = {};
for (const [w, h] of [[768, 1024], [1024, 800], [1280, 800], [1440, 950]]) {
  await vp(w, h, false); await go("/es");
  narrow[w] = await ev(`(async () => { const out = [];
    for (let i = 0; i < 14; i++) { scrollTo({top: innerHeight*i, behavior: "instant"}); await new Promise(r => setTimeout(r, 420));
      for (const e of document.querySelectorAll("main p, main li, main div")) {
        if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 12)) continue;
        const r = e.getBoundingClientRect(); if (r.height < 10 || r.bottom < 0 || r.top > innerHeight) continue;
        if (r.width > 0 && r.width < 60) out.push({ w: Math.round(r.width), h: Math.round(r.height), t: (e.innerText || "").trim().slice(0, 26), cls: (e.className || "").toString().slice(0, 36) }); } }
    const seen = new Set(); return out.filter(x => { const k = x.t + x.w; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 6); })()`);
}
res.detail.narrow_columns = narrow;
console.log("03 NARROW:", JSON.stringify(narrow).slice(0, 500));

// 04 social state line, scrolled to the top of its block
await vp(1440, 950, false); await go("/es");
res.detail.social_state = await ev(`(async () => { for (let i = 0; i < 14; i++) { scrollTo({top: innerHeight*i, behavior: "instant"}); await new Promise(r => setTimeout(r, 420)); }
  const state = [...document.querySelectorAll("main *")].find(e => /^Estado\\s*:/i.test((e.innerText || "").trim()) && /Prototipo/i.test(e.innerText || ""));
  if (!state) return { found: false };
  const block = state.closest("section") || state.closest("div");
  block.scrollIntoView({ block: "start" }); await new Promise(r => setTimeout(r, 900));
  const sr = state.getBoundingClientRect(); const hdr = document.querySelector("header").getBoundingClientRect();
  const cx = sr.left + Math.min(40, sr.width / 2), cy = sr.top + sr.height / 2;
  const top = cy > 0 && cy < innerHeight ? document.elementFromPoint(cx, cy) : null;
  return { found: true, text: (state.innerText || "").trim().slice(0, 70), top: Math.round(sr.top), headerBottom: Math.round(hdr.bottom),
    underHeader: sr.top < hdr.bottom, visible: sr.top >= 0, coveredBy: top ? (top.tagName + " " + (top.innerText || "").trim().slice(0, 16)) : null }; })()`);
await shot("rvjv-1440-04-social-top");
console.log("04 STATE:", JSON.stringify(res.detail.social_state));

// 05 the 3D block: heading, the two pending cards, media
res.detail.three_d = await ev(`(async () => { for (let i = 0; i < 16; i++) { scrollTo({top: innerHeight*i, behavior: "instant"}); await new Promise(r => setTimeout(r, 420)); }
  const head = [...document.querySelectorAll("h2, h3")].find(h => /De tu plano/i.test(h.innerText || ""));
  if (!head) return { found: false };
  head.scrollIntoView({ block: "start" }); await new Promise(r => setTimeout(r, 900));
  const hr = head.getBoundingClientRect(); const hdr = document.querySelector("header").getBoundingClientRect();
  const block = head.closest("section") || head.closest("div");
  const cards = [...block.querySelectorAll("li, article, div")].map(e => (e.innerText || "").trim()).filter(t => t && t.length < 180);
  return { found: true, headingTop: Math.round(hr.top), headerBottom: Math.round(hdr.bottom), underHeader: hr.top < hdr.bottom,
    pending: cards.filter(t => /Pendiente|pendiente/.test(t)).slice(0, 4), text: (block.innerText || "").replace(/\\s+/g, " ").slice(0, 300),
    media: { img: block.querySelectorAll("img").length, video: block.querySelectorAll("video").length, canvas: block.querySelectorAll("canvas").length } }; })()`);
await shot("rvjv-1440-05-3d-top");
console.log("05 3D:", JSON.stringify(res.detail.three_d).slice(0, 560));

// 10 the trial sticker at phone width
const sticker = {};
for (const [w, h] of [[390, 844], [1440, 950]]) { await vp(w, h); await go("/es/packages", 3000);
  sticker[w] = await ev(`(() => { const s = [...document.querySelectorAll("main *")].find(e => /14 d[ií]as gratis/i.test((e.innerText || "").slice(0, 40)));
    if (!s) return { found: false };
    const sr = s.getBoundingClientRect();
    const card = [...document.querySelectorAll("main h3")].map(h => h.closest("article, li, div")).find(c => c && c.contains(s));
    const cr = card ? card.getBoundingClientRect() : null;
    const cx = sr.left + sr.width / 2, cy = sr.top + sr.height / 2;
    const topEl = cy > 0 && cy < innerHeight ? document.elementFromPoint(cx, cy) : null;
    return { found: true, sticker: { top: Math.round(sr.top), left: Math.round(sr.left), right: Math.round(sr.right) },
      card: cr ? { top: Math.round(cr.top), left: Math.round(cr.left), right: Math.round(cr.right) } : null,
      crossesTop: cr ? sr.top < cr.top - 1 : null, crossesSide: cr ? (sr.left < cr.left - 1 || sr.right > cr.right + 1) : null,
      onTopOf: topEl ? (topEl.innerText || "").trim().slice(0, 24) : null }; })()`);
}
res.detail.sticker = sticker;
console.log("10 STICKER:", JSON.stringify(sticker).slice(0, 460));

// 08 the morning assistant: the full rows on both pages
const rows = {};
for (const p of ["/es/platform", "/es/packages"]) { await vp(1440, 950, false); await go(p, 3000);
  rows[p] = await ev(`(() => { const out = [];
    for (const e of document.querySelectorAll("main li, main p, main dd, main dt")) { const t = (e.innerText || "").replace(/\\s+/g, " ").trim();
      if (/ma[nñ]ana/i.test(t) && t.length < 220) out.push(t); }
    const seen = new Set(); return out.filter(t => { if (seen.has(t)) return false; seen.add(t); return true; }).slice(0, 6); })()`); }
res.detail.morning_rows = rows;
console.log("08 MORNING:", JSON.stringify(rows).slice(0, 600));

// 09 "Qué hace" items
await go("/es/platform/ai-sales-agent", 3000);
res.detail.que_hace = await ev(`(() => { const h = [...document.querySelectorAll("h2, h3")].find(x => /Qu[eé] hace/i.test(x.innerText || ""));
  if (!h) return { found: false, headings: [...document.querySelectorAll("h2, h3")].map(x => (x.innerText || "").trim().slice(0, 30)).slice(0, 10) };
  let n = h.nextElementSibling, items = [];
  while (n && items.length === 0) { items = [...n.querySelectorAll("li")].map(e => (e.innerText || "").trim().slice(0, 50)); n = n.nextElementSibling; }
  const h1 = document.querySelector("h1");
  return { found: true, items, count: items.length, h1FontPx: h1 ? Math.round(parseFloat(getComputedStyle(h1).fontSize)) : null,
    h1Lines: h1 ? Math.round(h1.getBoundingClientRect().height / parseFloat(getComputedStyle(h1).lineHeight || "1")) : null }; })()`);
console.log("09 QUE HACE:", JSON.stringify(res.detail.que_hace).slice(0, 420));

// 13 the matching card: the name label against the notice
await go("/es", 3600);
res.detail.matching = await ev(`(async () => { for (let i = 0; i < 14; i++) { scrollTo({top: innerHeight*i, behavior: "instant"}); await new Promise(r => setTimeout(r, 420)); }
  const note = [...document.querySelectorAll("main *")].filter(e => /publicable/i.test(e.innerText || "") && (e.innerText || "").length < 200).pop();
  if (!note) return { found: false };
  note.scrollIntoView({ block: "center" }); await new Promise(r => setTimeout(r, 800));
  const nr = note.getBoundingClientRect();
  const names = [...document.querySelectorAll("main *")].filter(e => /Laura Serrano/.test((e.innerText || "").trim()) && (e.innerText || "").trim().length < 40)
    .map(e => { const r = e.getBoundingClientRect();
      const ox = Math.min(r.right, nr.right) - Math.max(r.left, nr.left), oy = Math.min(r.bottom, nr.bottom) - Math.max(r.top, nr.top);
      return { t: (e.innerText || "").trim().slice(0, 24), ox: Math.round(ox), oy: Math.round(oy), overlapping: ox > 2 && oy > 2 }; });
  return { found: true, noteText: (note.innerText || "").replace(/\\s+/g, " ").slice(0, 90), candidates: names.slice(0, 5) }; })()`);
await shot("rvjv-1440-13-matching");
console.log("13 MATCHING:", JSON.stringify(res.detail.matching).slice(0, 460));
writeFileSync(OUT, JSON.stringify(res, null, 1));
ws.close(); for (const k of kids) k.kill(); process.exit(0);
