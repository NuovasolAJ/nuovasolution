// Independent design and behaviour probe of the DELIVERED preview (Chromium/Edge = WebKit approximation
// only for layout, not for Safari). Reads only. Usage: node rvd-design.mjs <baseUrl> <out.json> <shots>
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9390;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const res = { base: BASE, started_utc: new Date().toISOString(), engine: "Chromium (Edge headless) — approximation, not Safari/WebKit", checks: [], detail: {} };
const check = (id, what, verdict, ev) => { res.checks.push({ id, what, verdict, evidence: ev }); console.log(`${verdict} ${id} ${what} :: ${JSON.stringify(ev).slice(0, 300)}`); };
const kids = [];

// --- expressions evaluated in the page ---
// visible overlap of two painted boxes, hit tested, per line box
const OVERLAP = `(() => { const boxes = [];
  for (const e of document.querySelectorAll('main *, header *, footer *')) {
    const s = getComputedStyle(e);
    if (s.visibility === 'hidden' || s.display === 'none' || Number(s.opacity) < 0.05) continue;
    if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    for (const r of e.getClientRects()) if (r.width > 12 && r.height > 8 && r.bottom > 0 && r.top < innerHeight) boxes.push({ e, r });
  }
  const out = [];
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
    const A = boxes[i], B = boxes[j];
    if (A.e === B.e || A.e.contains(B.e) || B.e.contains(A.e)) continue;
    const ox = Math.min(A.r.right, B.r.right) - Math.max(A.r.left, B.r.left);
    const oy = Math.min(A.r.bottom, B.r.bottom) - Math.max(A.r.top, B.r.top);
    if (ox <= 3 || oy <= 3) continue;
    const cx = Math.max(A.r.left, B.r.left) + ox / 2, cy = Math.max(A.r.top, B.r.top) + oy / 2;
    if (cy < 0 || cy > innerHeight) continue;
    const top = document.elementFromPoint(cx, cy);
    if (!top || (!A.e.contains(top) && !B.e.contains(top) && top !== A.e && top !== B.e)) continue;
    out.push({ a: (A.e.innerText || '').trim().slice(0, 26), b: (B.e.innerText || '').trim().slice(0, 26), ox: Math.round(ox), oy: Math.round(oy) });
  }
  return out.slice(0, 6); })()`;

// text that is present but effectively invisible: near-zero opacity, or colour close to its backdrop
const FADED = `(() => {
  const lum = (c) => { const m = c.match(/[\\d.]+/g); if (!m) return null; const [r, g, b] = m.slice(0, 3).map(Number);
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const bgOf = (el) => { let e = el; while (e) { const s = getComputedStyle(e); const bg = s.backgroundColor;
      if (bg && !/rgba\\(0, 0, 0, 0\\)|transparent/.test(bg)) return bg; e = e.parentElement; } return 'rgb(255,255,255)'; };
  const out = [];
  for (const e of document.querySelectorAll('main *, header *')) {
    if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    const r = e.getBoundingClientRect(); if (r.width < 8 || r.height < 6 || r.bottom < 0 || r.top > innerHeight) continue;
    const s = getComputedStyle(e);
    let op = 1, p = e; while (p) { op *= Number(getComputedStyle(p).opacity || 1); p = p.parentElement; }
    const l1 = lum(s.color), l2 = lum(bgOf(e));
    const ratio = l1 !== null && l2 !== null ? (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05) : null;
    const size = parseFloat(s.fontSize) || 16, bold = Number(s.fontWeight) >= 700;
    const need = size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5;
    if (op < 0.35 || (ratio !== null && ratio < need))
      out.push({ t: (e.innerText || '').trim().slice(0, 34), opacity: Math.round(op * 100) / 100, ratio: ratio ? Math.round(ratio * 100) / 100 : null, need, size: Math.round(size), color: s.color, bg: bgOf(e) });
  }
  return out.slice(0, 8); })()`;

const WRAP = `[...document.querySelectorAll('main *, header *')].filter(e => {
    if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) return false;
    return e.scrollWidth > e.clientWidth + 2 && e.clientWidth > 40;
  }).map(e => ({ t: (e.innerText || '').trim().slice(0, 34), sw: e.scrollWidth, cw: e.clientWidth })).slice(0, 6)`;

try {
  const prof = join(SHOTS, "prof"); rmSync(prof, { recursive: true, force: true });
  kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
  let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let id = 0; const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const vp = (w, h, mobile = w <= 430) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile });
  const go = async (p, wait = 3000) => { await send("Page.navigate", { url: BASE + p }); await sleep(wait); };
  const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(SHOTS, n + ".png"), Buffer.from(s.result.data, "base64")); };
  await send("Page.enable");

  const ROUTES = ["/en", "/es", "/en/platform", "/es/platform", "/en/platform/ai-sales-agent", "/es/platform/crm", "/en/packages", "/es/packages", "/en/trial", "/es/trial", "/en/contact", "/es/signup"];
  const VIEWPORTS = [[360, 800], [390, 844], [768, 1024], [1024, 800], [1440, 900]];

  // ---------- 1. scrolled overlap, faded text and wrapping across viewports ----------
  const overlap = {}, faded = {}, wrap = {};
  for (const [w, h] of VIEWPORTS) {
    await vp(w, h);
    for (const p of ROUTES) {
      await go(p, 2400);
      const steps = Math.min(10, Math.ceil(await ev(`document.body.scrollHeight / innerHeight`)));
      const o = [], f = [], wr = [];
      for (let s = 0; s < steps; s++) {
        await ev(`scrollTo({ top: innerHeight * ${s}, behavior: 'instant' })`); await sleep(420);
        const oo = await ev(OVERLAP); if (oo?.length) o.push(...oo);
        const ff = await ev(FADED); if (ff?.length) f.push(...ff);
        const ww = await ev(WRAP); if (ww?.length) wr.push(...ww);
      }
      if (o.length) overlap[`${w}${p}`] = o.slice(0, 4);
      if (f.length) faded[`${w}${p}`] = f.slice(0, 4);
      if (wr.length) wrap[`${w}${p}`] = wr.slice(0, 4);
    }
  }
  res.detail.overlap = overlap; res.detail.faded = faded; res.detail.wrap = wrap;
  check("RVD-01", "no text boxes visibly cross each other while scrolling, five viewports x twelve routes",
    Object.keys(overlap).length === 0 ? "PASS" : "FAIL", { affected: Object.keys(overlap).slice(0, 8), count: Object.keys(overlap).length });
  check("RVD-02", "no text sits below the contrast floor or fades to near invisible",
    Object.keys(faded).length === 0 ? "PASS" : "FAIL", { affected: Object.keys(faded).slice(0, 8), sample: Object.values(faded)[0]?.slice(0, 2) });
  check("RVD-03", "no text is cut off by its own box (wrapping)",
    Object.keys(wrap).length === 0 ? "PASS" : "FAIL", { affected: Object.keys(wrap).slice(0, 6), sample: Object.values(wrap)[0]?.slice(0, 2) });

  // ---------- 2. depth: cards against their background ----------
  await vp(390, 844); await go("/en", 3000);
  res.detail.depth = await ev(`(() => {
    const cards = [...document.querySelectorAll('[class*=card], article, section > div[class*=surface]')].filter(e => e.getBoundingClientRect().height > 80).slice(0, 10);
    const lum = (c) => { const m = c.match(/[\\d.]+/g); if (!m) return null; const [r, g, b] = m.slice(0, 3).map(Number);
      const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    return cards.map(e => { const s = getComputedStyle(e); const p = e.parentElement ? getComputedStyle(e.parentElement) : null;
      const l1 = lum(s.backgroundColor), l2 = p ? lum(p.backgroundColor) : null;
      return { t: (e.innerText || '').trim().slice(0, 24), bg: s.backgroundColor, parentBg: p?.backgroundColor, border: s.borderTopWidth + ' ' + s.borderTopColor, shadow: s.boxShadow.slice(0, 40),
        separation: l1 !== null && l2 !== null ? Math.round(Math.abs(l1 - l2) * 1000) / 1000 : null }; });
  })()`);
  const dep = res.detail.depth ?? [];
  check("RVD-04", "cards are distinguishable from their background by tone, border or shadow", dep.length === 0 ? "INFO" : (dep.every((d) => (d.separation ?? 0) > 0.002 || /px/.test(d.border) && !/0px/.test(d.border) || (d.shadow && d.shadow !== "none")) ? "PASS" : "FAIL"), dep.slice(0, 4));

  // ---------- 3. video ----------
  await vp(390, 844); await go("/en", 4000);
  res.detail.video = await ev(`(async () => {
    const vs = [...document.querySelectorAll('video')];
    if (!vs.length) return { count: 0 };
    const out = [];
    for (const v of vs.slice(0, 3)) {
      const before = { autoplay: v.autoplay, muted: v.muted, controls: v.controls, poster: v.getAttribute('poster') || null, preload: v.preload, playsInline: v.playsInline, paused: v.paused, readyState: v.readyState, src: (v.currentSrc || '').split('/').pop() };
      let played = null, err = null;
      try { await v.play(); await new Promise(r => setTimeout(r, 1200)); played = v.currentTime > 0 && !v.paused; } catch (e) { err = String(e).slice(0, 60); }
      out.push({ ...before, playedAfterGesture: played, error: err, currentTime: Math.round((v.currentTime || 0) * 100) / 100 });
    }
    return { count: vs.length, videos: out };
  })()`);
  const vd = res.detail.video;
  check("RVD-05", "product clips: poster present, muted, no autoplay with sound, and they actually start",
    vd?.count ? ((vd.videos ?? []).every((v) => v.poster && (!v.autoplay || v.muted) && v.playedAfterGesture !== false) ? "PASS" : "FAIL") : "FAIL", vd);
  await shot("rvd-390-en-home-video");

  // ---------- 4. 200 % zoom with details open ----------
  await vp(720, 700, false); await go("/en/packages", 3000);
  const zoom = await ev(`(async () => { const d = [...document.querySelectorAll('details')]; d.forEach(x => x.open = true); await new Promise(r => setTimeout(r, 500));
    return { details: d.length, overflow: document.documentElement.scrollWidth > innerWidth + 1, sw: document.documentElement.scrollWidth, iw: innerWidth }; })()`);
  const zoomOverlap = await ev(OVERLAP);
  res.detail.zoom = { ...zoom, overlaps: (zoomOverlap ?? []).length };
  check("RVD-06", "at 200 % zoom with all details open: no overflow, no crossing text", !zoom.overflow && (zoomOverlap ?? []).length === 0 ? "PASS" : "FAIL", res.detail.zoom);
  await shot("rvd-720-en-packages-zoom200");

  // ---------- 5. keyboard, focus, reduced motion ----------
  await vp(1440, 900, false); await go("/en", 3000);
  res.detail.keyboard = await ev(`(() => { const f = [...document.querySelectorAll('a[href],button,select,input,textarea,[tabindex]:not([tabindex="-1"])')].filter(e => !e.disabled && e.offsetParent);
    const noRing = []; for (const e of f.slice(0, 25)) { e.focus(); const s = getComputedStyle(document.activeElement);
      const ring = (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) || s.boxShadow !== 'none';
      if (!ring) noRing.push((e.innerText || e.getAttribute('aria-label') || e.tagName).trim().slice(0, 22)); }
    return { focusables: f.length, checked: Math.min(25, f.length), withoutRing: noRing }; })()`);
  check("RVD-07", "every one of the first 25 focusable elements shows a focus ring",
    (res.detail.keyboard?.withoutRing ?? []).length === 0 ? "PASS" : "FAIL", res.detail.keyboard);

  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await go("/en", 3200);
  res.detail.motion = await ev(`(() => { const a = document.getAnimations ? document.getAnimations() : [];
    return { total: a.length, running: a.filter(x => x.playState === 'running').length,
      videosPlaying: [...document.querySelectorAll('video')].filter(v => !v.paused).length,
      hiddenByAnimation: [...document.querySelectorAll('main *')].filter(e => { const s = getComputedStyle(e); return Number(s.opacity) < 0.1 && (e.innerText || '').trim().length > 10; }).length }; })()`);
  check("RVD-08", "with reduced motion nothing animates, no clip plays by itself and no content stays hidden",
    res.detail.motion.running === 0 && res.detail.motion.videosPlaying === 0 && res.detail.motion.hiddenByAnimation === 0 ? "PASS" : "FAIL", res.detail.motion);
  await send("Emulation.setEmulatedMedia", { features: [] });

  // ---------- 6. conversion path to the registration form ----------
  await vp(390, 844); await go("/en", 3000);
  res.detail.conversion = await ev(`(async () => {
    const primary = [...document.querySelectorAll('a[href]')].filter(a => /start free|empieza gratis|sign ?up|registr/i.test(a.innerText));
    const first = primary[0]; if (!first) return { found: false, links: [...document.querySelectorAll('header a')].map(a => a.innerText.trim()).slice(0, 8) };
    const href = first.getAttribute('href'); location.href = href; await new Promise(r => setTimeout(r, 2500));
    const fields = [...document.querySelectorAll('form input, form select')].map(e => e.name || e.type);
    return { found: true, href, landed: location.pathname, fields, submit: !!document.querySelector('form button[type=submit], form button') };
  })()`);
  check("RVD-09", "the primary call to action leads to a working registration form",
    res.detail.conversion?.landed?.includes("signup") && (res.detail.conversion.fields ?? []).length >= 3 ? "PASS" : "FAIL", res.detail.conversion);
  await shot("rvd-390-en-signup");

  // ---------- 7. one screenshot per viewport for the record ----------
  for (const [w, h] of VIEWPORTS) { await vp(w, h); await go("/en", 2600); await ev(`scrollTo({top: innerHeight*1.2, behavior:'instant'})`); await sleep(500); await shot(`rvd-${w}-en-home-scrolled`); }
  await vp(390, 844); await go("/es", 2600); await shot("rvd-390-es-home");
  ws.close();
} catch (e) { res.error = String(e?.message ?? e); console.error("ERROR", res.error); }
finally {
  res.finished_utc = new Date().toISOString();
  writeFileSync(OUT, JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res.checks.map((c) => [c.id, c.verdict])));
  for (const k of kids) k.kill();
  process.exit(0);
}
