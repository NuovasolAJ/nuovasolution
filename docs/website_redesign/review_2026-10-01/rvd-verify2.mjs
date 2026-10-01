// Remaining verification: the product clip as a visitor starts it, and the path to the registration form.
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9394; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const res = { base: BASE, started_utc: new Date().toISOString(), detail: {} };
const kids = [];
const prof = join(SHOTS, "v2prof-b"); rmSync(prof, { recursive: true, force: true });
kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--autoplay-policy=user-gesture-required", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
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

// 1. the clip: poster first, video only after the visitor starts it
const clips = {};
for (const [p, w, h] of [["/en", 390, 844], ["/en", 1440, 900], ["/es", 390, 844]]) {
  await vp(w, h, w <= 430); await go(p);
  clips[`${w}${p}`] = await ev(`(async () => {
    for (let i = 0; i < 12; i++) { scrollTo({top: innerHeight*i, behavior: "instant"}); await new Promise(r => setTimeout(r, 500)); }
    const before = { videos: document.querySelectorAll("video").length, posters: [...document.querySelectorAll("img")].filter(i => (i.getAttribute("src") || "").indexOf("poster") >= 0).length };
    const play = [...document.querySelectorAll("button")].find(b => /play|reproducir|ver el|watch/i.test((b.innerText || "") + (b.getAttribute("aria-label") || "")));
    if (!play) return { ...before, playControl: false };
    play.scrollIntoView({ block: "center" }); await new Promise(r => setTimeout(r, 600));
    play.click(); await new Promise(r => setTimeout(r, 3000));
    const v = document.querySelector("video");
    if (!v) return { ...before, playControl: true, videoAfterClick: false };
    await new Promise(r => setTimeout(r, 2000));
    return { ...before, playControl: true, playLabel: (play.innerText || play.getAttribute("aria-label") || "").trim().slice(0, 24), videoAfterClick: true,
      muted: v.muted, autoplay: v.autoplay, controls: v.controls, playsInline: v.playsInline, poster: v.getAttribute("poster"), src: (v.currentSrc || "").split("/").pop(),
      playing: !v.paused && v.currentTime > 0, currentTime: Math.round((v.currentTime || 0) * 100) / 100, readyState: v.readyState };
  })()`);
  console.log("CLIP", w, p, JSON.stringify(clips[`${w}${p}`]).slice(0, 320));
}
res.detail.clips = clips;
await vp(390, 844); await go("/en"); await ev(`(async () => { const b=[...document.querySelectorAll("button")].find(x=>/play|watch/i.test((x.innerText||"")+(x.getAttribute("aria-label")||""))); if(b){b.scrollIntoView({block:"center"}); await new Promise(r=>setTimeout(r,500)); b.click();} await new Promise(r=>setTimeout(r,2500)); })()`);
await shot("rvd-390-en-clip-playing");

// 2. the path to the registration form, mobile and desktop
const conv = {};
for (const [w, h] of [[390, 844], [1440, 900]]) {
  await vp(w, h, w <= 430); await go("/en");
  const found = await ev(`(() => {
    const cta = [...document.querySelectorAll("a[href]")].filter(a => (a.getAttribute("href") || "").indexOf("signup") >= 0);
    const visible = cta.filter(a => a.offsetParent && a.getBoundingClientRect().width > 0);
    return { visibleCta: visible.length, hiddenCta: cta.length - visible.length, labels: visible.map(a => a.innerText.trim().slice(0, 24)).slice(0, 4), href: visible.length ? visible[0].getAttribute("href") : null };
  })()`);
  let landed = null;
  if (found && found.href) {
    await go(found.href, 3200);
    landed = await ev(`(() => { const fields = [...document.querySelectorAll("input, select")].map(e => e.name || e.type).filter(Boolean);
      const submit = document.querySelector("form button[type=submit], form button");
      return { path: location.pathname, fields, submitLabel: submit ? submit.innerText.trim().slice(0, 24) : null }; })()`);
  }
  conv[String(w)] = { ...(found || {}), landed };
  console.log("CONV", w, JSON.stringify(conv[String(w)] || {}).slice(0, 320));
}
res.detail.conversion = conv;

// 3. form behaviour: empty submit must name the first invalid field (fix 1d76d64)
await vp(390, 844); await go("/en/signup");
res.detail.signupValidation = await ev(`(async () => {
  const form = document.querySelector("form"); if (!form) return { form: false };
  const btn = form.querySelector("button[type=submit], button"); btn.click(); await new Promise(r => setTimeout(r, 1200));
  const active = document.activeElement;
  const msgs = [...form.querySelectorAll("[role=alert], .text-signal-danger, [aria-invalid=true]")].map(e => (e.innerText || e.getAttribute("name") || "").trim().slice(0, 40)).filter(Boolean);
  return { form: true, focused: active ? (active.name || active.id || active.tagName) : null, messages: msgs.slice(0, 4), stillOnPage: location.pathname }; })()`);
console.log("SIGNUP", JSON.stringify(res.detail.signupValidation).slice(0, 320));
await shot("rvd-390-en-signup-validation");
writeFileSync(OUT, JSON.stringify(res, null, 1));
ws.close(); for (const k of kids) k.kill(); process.exit(0);
