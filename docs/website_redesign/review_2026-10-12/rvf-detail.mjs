// Verification pass: the real texts of the login area, the report, the social screens,
// the logout control, and the context of the contrast offenders.
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9402; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const res = { deployment: BASE, started_utc: new Date().toISOString(), detail: {} };
const kids = [];
const prof = join(SHOTS, "detprof"); rmSync(prof, { recursive: true, force: true });
kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
const go = async (p, w = 3400) => { await send("Page.navigate", { url: BASE + p }); await sleep(w); };
const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(SHOTS, n + ".png"), Buffer.from(s.result.data, "base64")); };
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 950, deviceScaleFactor: 1, mobile: false });

await go("/api/bff/auth/login?stub=1&next=%2Fes%2Fapp", 4200);
res.detail.app_text = await ev('(document.querySelector("main")?.innerText || document.body.innerText).replace(/\\s+/g, " ").trim().slice(0, 1400)');
console.log("APP:", String(res.detail.app_text).slice(0, 700));

await go("/es/app/reports", 3800);
res.detail.reports_text = await ev('(document.querySelector("main")?.innerText || document.body.innerText).replace(/\\s+/g, " ").trim().slice(0, 1400)');
console.log("\nREPORTS:", String(res.detail.reports_text).slice(0, 800));
await shot("rvf-det-reports");

for (const p of ["/es/social", "/es/social/post"]) {
  await go(p, 3600);
  const d = await ev(`(() => ({ main: (document.querySelector("main")?.innerText || "").replace(/\\s+/g, " ").trim().slice(0, 900),
    controls: [...document.querySelectorAll("main button, main a[href], main input, main textarea, main select")].map(e => ({ tag: e.tagName, label: (e.innerText || e.getAttribute("aria-label") || e.name || e.type || "").trim().slice(0, 30), disabled: e.disabled === true || e.getAttribute("aria-disabled") === "true" })).slice(0, 14) }))()`);
  res.detail[`social_${p.split("/").pop()}`] = d;
  console.log(`\nSOCIAL ${p}:`, JSON.stringify(d).slice(0, 900));
}
await shot("rvf-det-social-post");

await go("/es/app", 3400);
res.detail.logout_control = await ev(`(() => { const all = [...document.querySelectorAll("button, a")];
  const b = all.find(x => /cerrar sesión|log out|salir/i.test(x.innerText || ""));
  return b ? { found: true, tag: b.tagName, label: b.innerText.trim().slice(0, 24), href: b.getAttribute("href"), form: !!b.closest("form") } : { found: false, labels: all.map(x => (x.innerText || "").trim().slice(0, 18)).filter(Boolean).slice(0, 12) }; })()`);
console.log("\nLOGOUT CONTROL:", JSON.stringify(res.detail.logout_control));

// contrast offenders with their context
await go("/es", 3600);
res.detail.contrast_context = await ev(`(() => { const lum = (c) => { const m = c.match(/[0-9.]+/g); if (!m) return null; const [r, g, b] = m.slice(0, 3).map(Number);
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const bgOf = (el) => { let e = el; while (e) { const s = getComputedStyle(e); if (s.backgroundColor && s.backgroundColor.indexOf("rgba(0, 0, 0, 0)") === -1 && s.backgroundColor !== "transparent") return s.backgroundColor; e = e.parentElement; } return "rgb(255,255,255)"; };
  const out = [];
  for (const e of document.querySelectorAll("main *")) {
    if (![...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) continue;
    let op = 1, p = e; while (p) { op *= Number(getComputedStyle(p).opacity || 1); p = p.parentElement; }
    if (op < 0.9) continue;
    const s = getComputedStyle(e); const l1 = lum(s.color), l2 = lum(bgOf(e)); if (l1 === null || l2 === null) continue;
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const size = parseFloat(s.fontSize) || 16, bold = Number(s.fontWeight) >= 700;
    const need = size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5;
    if (ratio < need) out.push({ t: (e.innerText || "").trim().slice(0, 24), parent: (e.parentElement?.innerText || "").replace(/\\s+/g, " ").trim().slice(0, 70),
      ratio: Math.round(ratio * 100) / 100, need, size: Math.round(size), color: s.color, bg: bgOf(e), ariaHidden: e.getAttribute("aria-hidden"), cls: (e.className || "").toString().slice(0, 50) });
  }
  const seen = new Set(); return out.filter(x => { const k = x.t + x.ratio; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 10); })()`);
console.log("\nCONTRAST:", JSON.stringify(res.detail.contrast_context).slice(0, 900));
writeFileSync(OUT, JSON.stringify(res, null, 1));
ws.close(); for (const k of kids) k.kill(); process.exit(0);
