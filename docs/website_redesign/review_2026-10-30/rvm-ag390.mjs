// Is "Mi agencia" reachable on the phone — in the header itself or inside the mobile menu?
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9443; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const kids = [];
const prof = join(SHOTS, "ag390"); rmSync(prof, { recursive: true, force: true });
kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send("Page.navigate", { url: BASE + "/api/bff/auth/login?stub=1&next=%2Fes%2Fapp" });
await sleep(4200);

const out = await ev(`(async () => { try {
  const headerButtons = [...document.querySelectorAll("header button")].map((b) => ({
    label: (b.getAttribute("aria-label") || b.innerText || "").trim().slice(0, 20),
    expanded: b.getAttribute("aria-expanded"), controls: b.getAttribute("aria-controls") }));
  const find = () => [...document.querySelectorAll("header a, nav a, [role=dialog] a")].find((e) => /Mi agencia/i.test(e.innerText || ""));
  const describe = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); const s = getComputedStyle(el);
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const top = cy > 0 && cy < innerHeight && cx > 0 ? document.elementFromPoint(cx, cy) : null;
    return { href: el.getAttribute("href"), rect: { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) },
      visibility: s.visibility, display: s.display, inViewport: cy > 0 && cy < innerHeight,
      reachable: !!top && (el.contains(top) || top === el), coveredBy: top ? (top.tagName + " " + (top.innerText || "").trim().slice(0, 16)) : null }; };
  const before = describe(find());
  const opener = [...document.querySelectorAll("header button")].find((b) => b.getAttribute("aria-expanded") !== null);
  let afterOpen = null, openerLabel = null;
  if (opener) { openerLabel = (opener.getAttribute("aria-label") || opener.innerText || "").trim().slice(0, 20);
    opener.click(); await new Promise((r) => setTimeout(r, 1000)); afterOpen = describe(find()); }
  return { path: location.pathname, headerButtons, before, openerLabel, afterOpen };
} catch (e) { return { error: String(e).slice(0, 160) }; } })()`);
console.log(JSON.stringify(out));
const s = await send("Page.captureScreenshot", { format: "png" });
writeFileSync(join(SHOTS, "rvm-390-mi-agencia-open.png"), Buffer.from(s.result.data, "base64"));
writeFileSync(OUT, JSON.stringify({ base: BASE, ...out, utc: new Date().toISOString() }, null, 1));
ws.close(); for (const k of kids) k.kill(); process.exit(0);
