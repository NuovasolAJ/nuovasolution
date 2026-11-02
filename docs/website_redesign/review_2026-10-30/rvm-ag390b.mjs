// "Mi agencia" on the phone: open the sheet (button "Menú") and look inside it.
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const CDP = 9444; const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const kids = [];
const prof = join(SHOTS, "ag390b"); rmSync(prof, { recursive: true, force: true });
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
  const menu = [...document.querySelectorAll("header button")].find((b) => /^Men/i.test((b.getAttribute("aria-label") || b.innerText || "").trim()));
  if (!menu) return { menu: false };
  menu.click(); await new Promise((r) => setTimeout(r, 1100));
  const panelId = menu.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : document.querySelector("[role=dialog]");
  const links = panel ? [...panel.querySelectorAll("a, button")].map((e) => { const r = e.getBoundingClientRect();
    return { t: (e.innerText || "").trim().slice(0, 22), href: e.getAttribute("href"), w: Math.round(r.width), h: Math.round(r.height) }; }).filter((x) => x.t) : [];
  const agency = links.find((l) => /Mi agencia/i.test(l.t)) ?? null;
  const logout = links.find((l) => /Cerrar sesi/i.test(l.t)) ?? null;
  // the session area itself must offer the way back
  const inPage = [...document.querySelectorAll("main a")].filter((a) => /agencia|configuraci|informe/i.test(a.innerText || ""))
    .map((a) => ({ t: (a.innerText || "").trim().slice(0, 26), href: a.getAttribute("href") })).slice(0, 6);
  return { menu: true, expanded: menu.getAttribute("aria-expanded"), panel: !!panel, linkCount: links.length,
    agencyInSheet: agency, logoutInSheet: logout, sheetLinks: links.slice(0, 10), mainLinks: inPage };
} catch (e) { return { error: String(e).slice(0, 160) }; } })()`);
console.log(JSON.stringify(out));
const s = await send("Page.captureScreenshot", { format: "png" });
writeFileSync(join(SHOTS, "rvm-390-sheet-open.png"), Buffer.from(s.result.data, "base64"));
writeFileSync(OUT, JSON.stringify({ base: BASE, ...out, utc: new Date().toISOString() }, null, 1));
ws.close(); for (const k of kids) k.kill(); process.exit(0);
