import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const ROOT = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const PORT = 3143, CDP = 9373, BASE = `http://localhost:${PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const kids = [];
kids.push(spawn(process.execPath, [join(ROOT, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(PORT)], { cwd: ROOT, env: { ...process.env, NUOVA_INTEGRATION_MODE: "stub" }, stdio: "ignore" }));
for (let i = 0; i < 120; i++) { try { await fetch(`${BASE}/en`); break; } catch { await sleep(500); } }
const prof = join(SHOTS, "p3"); rmSync(prof, { recursive: true, force: true });
kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await send("Page.navigate", { url: BASE + "/en" }); await sleep(2600);
const out = {};
for (const which of ["Menu", "Platform"]) {
  await send("Page.navigate", { url: BASE + "/en" }); await sleep(2200);
  out[which] = await ev(`(async () => {
    const btn=[...document.querySelectorAll('header button')].find(b => ((b.getAttribute('aria-label')||b.innerText||'').trim()).startsWith(${JSON.stringify(which)}));
    if(!btn) return {found:false};
    btn.focus(); btn.click(); await new Promise(r=>setTimeout(r,800));
    const panel = btn.getAttribute('aria-controls') ? document.getElementById(btn.getAttribute('aria-controls')) : null;
    const focusables = panel ? [...panel.querySelectorAll('a[href],button,input')].filter(e=>e.offsetParent) : [];
    const r = { expanded: btn.getAttribute('aria-expanded'), panelHeight: panel ? Math.round(panel.getBoundingClientRect().height) : null, focusablesInPanel: focusables.length, focusMovedIntoPanel: panel ? panel.contains(document.activeElement) : null, roleDialog: panel ? panel.getAttribute('role') : null, ariaModal: panel ? panel.getAttribute('aria-modal') : null };
    if (focusables.length) focusables[focusables.length-1].focus();
    const beforeEsc = document.activeElement === btn;
    document.activeElement.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
    await new Promise(r=>setTimeout(r,700));
    return { ...r, focusWasOnOpenerBeforeEscape: beforeEsc, expandedAfterEscape: btn.getAttribute('aria-expanded'), panelVisibleAfterEscape: panel ? panel.getBoundingClientRect().height > 0 : null, focusBackOnOpener: document.activeElement === btn, activeAfterEscape: (document.activeElement.innerText||document.activeElement.getAttribute('aria-label')||'').trim().slice(0,22) };
  })()`);
}
writeFileSync(OUT, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
ws.close(); for (const k of kids) k.kill(); process.exit(0);
