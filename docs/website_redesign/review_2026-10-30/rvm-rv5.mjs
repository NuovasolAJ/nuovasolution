// RV5 technique on the named build: alt of the furnished 3D image, legal pages without placeholders,
// "Mi agencia" active, every public subpage at 390 px, and the 3D area as in RV4.
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9441; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const res = { deployment: BASE, started_utc: new Date().toISOString(), checks: [], detail: {} };
const check = (id, what, verdict, ev) => { res.checks.push({ id, what, verdict, evidence: ev }); console.log(`${verdict} ${id} ${what} :: ${JSON.stringify(ev).slice(0, 330)}`); };
const kids = [];
try {
  const prof = join(SHOTS, "rv5prof"); rmSync(prof, { recursive: true, force: true });
  kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
  let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let id = 0; const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const vp = (w, h, mobile = w <= 430) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile });
  const go = async (p, w = 3400) => { await send("Page.navigate", { url: BASE + p }); await sleep(w); };
  const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(SHOTS, n + ".png"), Buffer.from(s.result.data, "base64")); };
  await send("Page.enable");

  // ---- 1. the 3D block: media, alt texts, playback ----
  await vp(1440, 950, false);
  await go("/es");
  res.detail.three_d = await ev(`(async () => { try {
    for (let i = 0; i < 18; i++) { scrollTo({ top: innerHeight * i, behavior: "instant" }); await new Promise(r => setTimeout(r, 420)); }
    const head = [...document.querySelectorAll("h2, h3")].find(x => /De tu plano|3D/i.test(x.innerText || ""));
    if (!head) return { found: false };
    head.scrollIntoView({ block: "start" }); await new Promise(r => setTimeout(r, 800));
    const block = head.closest("section") || head.closest("div");
    const imgs = [...block.querySelectorAll("img")].map(i => ({ src: (i.currentSrc || i.src || "").split("/").pop(), altLen: (i.alt || "").length, alt: (i.alt || "").slice(0, 60), loaded: i.complete && i.naturalWidth > 0 }));
    const vids = [...block.querySelectorAll("video")].map(v => ({ src: (v.currentSrc || "").split("/").pop(), poster: (v.getAttribute("poster") || "").split("/").pop(), label: (v.getAttribute("aria-label") || "").slice(0, 80), controls: v.controls, muted: v.muted, autoplay: v.autoplay, duration: Math.round((v.duration || 0) * 10) / 10 }));
    return { found: true, imgs, vids, canvas: block.querySelectorAll("canvas").length, pendingWords: block.innerText.split(" ").filter(w => /Pendiente/i.test(w)).length };
  } catch (e) { return { found: false, error: String(e).slice(0, 120) }; } })()`);
  const td = res.detail.three_d;
  const noAlt = (td?.imgs ?? []).filter((i) => i.altLen === 0);
  check("RV5-1", "every picture in the 3D block carries its own alt text", noAlt.length === 0 ? "PASS" : "FAIL",
    { images: (td?.imgs ?? []).map((i) => ({ src: i.src, altLen: i.altLen })), without_alt: noAlt.map((i) => i.src) });
  check("RV5-2", "the 3D videos keep poster, controls and silence", (td?.vids ?? []).length > 0 && (td.vids ?? []).every((v) => v.poster && v.controls && v.muted && !v.autoplay) ? "PASS" : "FAIL", td?.vids);
  await shot("rvm-1440-3d");

  // ---- 2. legal pages without placeholders ----
  const legal = {};
  for (const p of ["/es/legal/privacy", "/es/legal/terms", "/es/legal/data-deletion", "/es/legal/notice", "/en/legal/privacy", "/en/legal/terms", "/en/legal/data-deletion"]) {
    await go(p, 2600);
    legal[p] = await ev(`(() => { const t = (document.body.innerText || "").replace(/\\s+/g, " ");
      const marks = t.split(" ").filter(w => /PLACEHOLDER|Placeholder|PROVISIONAL|Provisional/.test(w)).length;
      const brackets = (t.match(/[\\u27E6\\u27E7]/g) || []).length;
      return { h1: (document.querySelector("h1") || {}).innerText || null, words: t.split(" ").length, marks, brackets }; })()`);
  }
  res.detail.legal = legal;
  const withMarks = Object.entries(legal).filter(([, v]) => (v.marks ?? 0) > 0 || (v.brackets ?? 0) > 0);
  check("RV5-3", "no legal page carries a placeholder marking", withMarks.length === 0 ? "PASS" : "FAIL",
    { pages_with_marks: withMarks.map(([p, v]) => ({ p, marks: v.marks, brackets: v.brackets })), checked: Object.keys(legal).length });

  // ---- 3. "Mi agencia" active ----
  await go("/es", 3000);
  res.detail.mi_agencia = await ev(`(() => { const el = [...document.querySelectorAll("header a, header button")].find(e => /Mi agencia/i.test(e.innerText || ""));
    if (!el) return { found: false, header: [...document.querySelectorAll("header a, header button")].map(e => (e.innerText || "").trim().slice(0, 18)).slice(0, 10) };
    const s = getComputedStyle(el); const r = el.getBoundingClientRect();
    return { found: true, tag: el.tagName, href: el.getAttribute("href"), disabled: el.hasAttribute("disabled") || el.getAttribute("aria-disabled") === "true",
      pointer: s.pointerEvents, visible: r.width > 0 && r.height > 0, text: (el.innerText || "").trim().slice(0, 24) }; })()`);
  const ma = res.detail.mi_agencia;
  check("RV5-4", "\"Mi agencia\" is an active control that leads somewhere",
    ma?.found && !ma.disabled && ma.pointer !== "none" && (ma.href || ma.tag === "BUTTON") ? "PASS" : "FAIL", ma);

  // ---- 4. every public subpage at 390 px ----
  const ROUTES = ["/es", "/es/platform", "/es/platform/ai-sales-agent", "/es/platform/crm", "/es/platform/lead-intelligence", "/es/platform/daily-assistant",
    "/es/packages", "/es/trial", "/es/contact", "/es/faq", "/es/signup", "/es/login", "/es/legal/privacy", "/es/legal/notice"];
  await vp(390, 844);
  const mobile = {};
  for (const p of ROUTES) {
    await go(p, 2600);
    mobile[p] = await ev(`(async () => { const out = { overflow: false, maxScrollWidth: 0, clipped: 0, h1: 0 };
      for (let i = 0; i < 8; i++) { scrollTo({ top: innerHeight * i, behavior: "instant" }); await new Promise(r => setTimeout(r, 320));
        out.maxScrollWidth = Math.max(out.maxScrollWidth, document.documentElement.scrollWidth);
        out.clipped += [...document.querySelectorAll("main *, header *")].filter(e => { const s = getComputedStyle(e);
          if (!["hidden", "clip"].includes(s.overflowX) && !["hidden", "clip"].includes(s.overflowY)) return false;
          if (e.clientWidth <= 4 || e.clientHeight <= 4) return false;
          if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 8)) return false;
          return e.scrollWidth > e.clientWidth + 2; }).length; }
      out.overflow = out.maxScrollWidth > innerWidth + 1; out.h1 = document.querySelectorAll("h1").length;
      return out; })()`);
  }
  res.detail.mobile = mobile;
  const badMobile = Object.entries(mobile).filter(([, v]) => v.overflow || v.clipped > 0 || v.h1 !== 1);
  check("RV5-5", "every public subpage at 390 px: one h1, no overflow, no clipped text",
    badMobile.length === 0 ? "PASS" : "FAIL", { checked: Object.keys(mobile).length, bad: badMobile.map(([p, v]) => ({ p, ...v })).slice(0, 6) });
  await go("/es", 2600); await shot("rvm-390-home");
  ws.close();
} catch (e) { res.error = String(e?.message ?? e); console.error("ERROR", res.error); }
finally {
  res.finished_utc = new Date().toISOString();
  writeFileSync(OUT, JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res.checks.map((c) => [c.id, c.verdict])));
  for (const k of kids) k.kill();
  process.exit(0);
}
