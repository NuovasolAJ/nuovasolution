import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9442; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const kids = [];
const prof = join(SHOTS, "agprof"); rmSync(prof, { recursive: true, force: true });
kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
await send("Page.enable");
const out = {};
for (const [w, h, tag] of [[1440, 950, "d1440"], [390, 844, "m390"]]) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile: w <= 430 });
  await send("Page.navigate", { url: BASE + "/api/bff/auth/login?stub=1&next=%2Fes%2Fapp" }); await sleep(4200);
  out[tag] = await ev(`(async () => { try {
    const openMenu = [...document.querySelectorAll("header button")].find(b => /^(Men|menu)/i.test(((b.getAttribute("aria-label") || b.innerText || "").trim())));
    if (openMenu && innerWidth <= 430) { openMenu.click(); await new Promise(r => setTimeout(r, 800)); }
    const el = [...document.querySelectorAll("header a, header button, nav a, nav button")].find(e => /Mi agencia/i.test(e.innerText || ""));
    if (!el) return { path: location.pathname, found: false, labels: [...document.querySelectorAll("header a, header button")].map(e => (e.innerText || "").trim().slice(0, 16)).filter(Boolean).slice(0, 12) };
    const s = getComputedStyle(el); const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const top = cy > 0 && cy < innerHeight ? document.elementFromPoint(cx, cy) : null;
    const logout = [...document.querySelectorAll("header a, header button, nav a, nav button")].some(e => /Cerrar sesi/i.test(e.innerText || ""));
    return { path: location.pathname, found: true, tag: el.tagName, href: el.getAttribute("href"), text: (el.innerText || "").trim().slice(0, 24),
      disabled: el.hasAttribute("disabled") || el.getAttribute("aria-disabled") === "true", pointerEvents: s.pointerEvents,
      reachable: !!top && (el.contains(top) || top === el), logoutPresent: logout };
  } catch (e) { return { error: String(e).slice(0, 120) }; } })()`);
  console.log(tag, JSON.stringify(out[tag]));
  const s = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(join(SHOTS, `rvm-${tag}-mi-agencia.png`), Buffer.from(s.result.data, "base64"));
}
writeFileSync(OUT, JSON.stringify({ base: BASE, result: out, utc: new Date().toISOString() }, null, 1));
ws.close(); for (const k of kids) k.kill(); process.exit(0);
