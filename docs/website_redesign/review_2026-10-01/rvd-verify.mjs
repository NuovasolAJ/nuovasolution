// Verification pass: only settled, painted elements count. Confirms or withdraws the first-pass hits.
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9392; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const res = { base: BASE, started_utc: new Date().toISOString(), detail: {} };
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
const go = async (p, w = 3200) => { await send("Page.navigate", { url: BASE + p }); await sleep(w); };
const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(SHOTS, n + ".png"), Buffer.from(s.result.data, "base64")); };
await send("Page.enable");

const OVL = `(() => { const boxes = [];
  for (const e of document.querySelectorAll("main *, header *, footer *")) { const s = getComputedStyle(e);
    if (s.visibility === "hidden" || s.display === "none") continue;
    let op = 1, p = e; while (p) { op *= Number(getComputedStyle(p).opacity || 1); p = p.parentElement; }
    if (op < 0.9) continue;
    if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    for (const r of e.getClientRects()) if (r.width > 12 && r.height > 8 && r.bottom > 0 && r.top < innerHeight) boxes.push({ e, r }); }
  const out = [];
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) { const A = boxes[i], B = boxes[j];
    if (A.e === B.e || A.e.contains(B.e) || B.e.contains(A.e)) continue;
    const ox = Math.min(A.r.right, B.r.right) - Math.max(A.r.left, B.r.left), oy = Math.min(A.r.bottom, B.r.bottom) - Math.max(A.r.top, B.r.top);
    if (ox <= 3 || oy <= 3) continue;
    const cx = Math.max(A.r.left, B.r.left) + ox / 2, cy = Math.max(A.r.top, B.r.top) + oy / 2;
    if (cy < 0 || cy > innerHeight) continue;
    const top = document.elementFromPoint(cx, cy); if (!top) continue;
    if (!A.e.contains(top) && !B.e.contains(top) && top !== A.e && top !== B.e) continue;
    out.push({ a: (A.e.innerText || "").trim().slice(0, 26), b: (B.e.innerText || "").trim().slice(0, 26), ox: Math.round(ox), oy: Math.round(oy), y: Math.round(cy + scrollY) }); }
  return out.slice(0, 6); })()`;

const CON = `(() => {
  const lum = (c) => { const m = c.match(/[0-9.]+/g); if (!m) return null; const [r, g, b] = m.slice(0, 3).map(Number);
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const bgOf = (el) => { let e = el; while (e) { const s = getComputedStyle(e); if (s.backgroundColor && s.backgroundColor.indexOf("rgba(0, 0, 0, 0)") === -1 && s.backgroundColor !== "transparent") return s.backgroundColor; e = e.parentElement; } return "rgb(255,255,255)"; };
  const out = [];
  for (const e of document.querySelectorAll("main *, header *, footer *")) {
    if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    const r = e.getBoundingClientRect(); if (r.width < 8 || r.bottom < 0 || r.top > innerHeight) continue;
    let op = 1, p = e; while (p) { op *= Number(getComputedStyle(p).opacity || 1); p = p.parentElement; }
    if (op < 0.9) continue;
    const s = getComputedStyle(e); const l1 = lum(s.color), l2 = lum(bgOf(e)); if (l1 === null || l2 === null) continue;
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const size = parseFloat(s.fontSize) || 16, bold = Number(s.fontWeight) >= 700;
    const need = size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5;
    if (ratio < need) out.push({ t: (e.innerText || "").trim().slice(0, 30), ratio: Math.round(ratio * 100) / 100, need, size: Math.round(size), color: s.color, bg: bgOf(e) });
  }
  const seen = new Set(); return out.filter(x => { const k = x.t + x.ratio; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 8); })()`;

const ovl = {}, con = {};
for (const [w, h] of [[360, 800], [390, 844], [768, 1024], [1024, 800]]) {
  await vp(w, h);
  for (const p of ["/en", "/es", "/en/platform", "/es/platform", "/es/packages"]) {
    await go(p, 2600);
    const steps = Math.min(8, Math.ceil(await ev("document.body.scrollHeight / innerHeight")));
    const o = [], c = [];
    for (let s = 0; s < steps; s++) {
      await ev(`scrollTo({top: innerHeight*${s}, behavior: "instant"})`); await sleep(1400);
      const oo = await ev(OVL); if (oo && oo.length) o.push(...oo);
      const cc = await ev(CON); if (cc && cc.length) c.push(...cc);
    }
    if (o.length) ovl[`${w}${p}`] = o.slice(0, 4);
    if (c.length) con[`${w}${p}`] = c.slice(0, 5);
  }
}
res.detail.overlap_settled = ovl; res.detail.contrast_settled = con;
console.log("OVERLAP settled:", Object.keys(ovl).length, JSON.stringify(Object.entries(ovl).slice(0, 3)).slice(0, 400));
console.log("CONTRAST settled:", Object.keys(con).length, JSON.stringify(Object.values(con)[0] || []).slice(0, 400));

await vp(390, 844); await go("/es/packages", 3000); await ev('scrollTo({top: 400, behavior: "instant"})'); await sleep(1200); await shot("rvd-390-es-packages-sticker");
await vp(768, 1024); await go("/en", 3000); await ev('scrollTo({top: innerHeight, behavior: "instant"})'); await sleep(1400); await shot("rvd-768-en-home-preview-badge");

const vids = {};
for (const p of ["/en", "/en/platform", "/en/platform/ai-sales-agent", "/en/platform/daily-assistant", "/es/platform/daily-assistant"]) {
  await vp(390, 844); await go(p, 3000);
  vids[p] = await ev(`(async () => { for (let i = 0; i < 12; i++) { scrollTo({top: innerHeight*i, behavior: "instant"}); await new Promise(r => setTimeout(r, 700)); }
    const v = [...document.querySelectorAll("video")];
    const sources = [...document.querySelectorAll("video source")].map(s => (s.getAttribute("src") || "").split("/").pop());
    const out = [];
    for (const x of v.slice(0, 3)) { let played = null, err = null;
      try { await x.play(); await new Promise(r => setTimeout(r, 1500)); played = x.currentTime > 0 && !x.paused; } catch (e) { err = String(e).slice(0, 50); }
      out.push({ poster: x.getAttribute("poster"), muted: x.muted, autoplay: x.autoplay, controls: x.controls, playsInline: x.playsInline, readyState: x.readyState, networkState: x.networkState, currentSrc: (x.currentSrc || "").split("/").pop(), played, err }); }
    return { count: v.length, sources, videos: out }; })()`);
}
res.detail.videos = vids;
console.log("VIDEOS:", JSON.stringify(vids).slice(0, 800));

const conv = {};
for (const [w, h] of [[390, 844], [1440, 900]]) {
  await vp(w, h, w <= 430); await go("/en", 3000);
  conv[String(w)] = await ev(`(async () => {
    const all = [...document.querySelectorAll("a[href]")];
    const cta = all.filter(a => /free|gratis|sign up|registr|start/i.test(a.innerText) || (a.getAttribute("href") || "").indexOf("signup") >= 0);
    const visible = cta.filter(a => a.offsetParent && a.getBoundingClientRect().width > 0);
    if (!visible.length) return { visibleCta: 0, hiddenCta: cta.length };
    const href = visible[0].getAttribute("href"); location.href = href; await new Promise(r => setTimeout(r, 3000));
    const fields = [...document.querySelectorAll("input, select")].map(e => e.name || e.type).filter(Boolean);
    return { visibleCta: visible.length, label: visible[0].innerText.trim().slice(0, 24), href, landed: location.pathname, fields, submit: !!document.querySelector("form button") }; })()`);
}
res.detail.conversion = conv;
console.log("CONVERSION:", JSON.stringify(conv).slice(0, 500));
await vp(390, 844); await go("/en/signup", 3000); await shot("rvd-390-en-signup-form");
writeFileSync(OUT, JSON.stringify(res, null, 1));
ws.close(); for (const k of kids) k.kill(); process.exit(0);
