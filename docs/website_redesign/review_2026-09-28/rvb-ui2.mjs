import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const ROOT = process.argv[2], OUT = process.argv[3], SHOTS = process.argv[4];
const PORT = 3142, CDP = 9372, BASE = `http://localhost:${PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const kids = [], res = {};
kids.push(spawn(process.execPath, [join(ROOT, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(PORT)], { cwd: ROOT, env: { ...process.env, NUOVA_INTEGRATION_MODE: "stub" }, stdio: "ignore" }));
for (let i = 0; i < 120; i++) { try { await fetch(`${BASE}/en`); break; } catch { await sleep(500); } }
const prof = join(SHOTS, "p2"); rmSync(prof, { recursive: true, force: true });
kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener("open", r));
let id = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
const vp = (w, h, mobile = w <= 430) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile });
const go = async (p, wait = 2600) => { await send("Page.navigate", { url: BASE + p }); await sleep(wait); };
const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(SHOTS, n + ".png"), Buffer.from(s.result.data, "base64")); };
await send("Page.enable");

// 1. what qualifies the hero claim on the home page, in both languages
await vp(1440, 900, false);
res.hero = {};
for (const p of ["/en", "/es", "/en/platform/ai-sales-agent", "/es/platform/ai-sales-agent"]) {
  await go(p);
  res.hero[p] = await ev(`(() => {
    const h1 = document.querySelector('h1'); const hr = h1.getBoundingClientRect();
    const all = [...document.querySelectorAll('p, span, li, small, div')].filter(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()));
    const q = all.filter(e => /permissions and configuration|permisos y la configuraci|Example\.|Ejemplo\./i.test(e.innerText || ''));
    const first = q.map(e => ({ text: (e.innerText || '').trim().slice(0, 90), y: Math.round(e.getBoundingClientRect().top + scrollY) })).sort((a, b) => a.y - b.y)[0] || null;
    const firstScreen = all.filter(e => { const r = e.getBoundingClientRect(); return r.top + scrollY < hr.top + scrollY + 700; }).map(e => (e.innerText || '').trim()).filter(Boolean).slice(0, 12);
    return { h1: h1.innerText.trim().slice(0, 70), h1_y: Math.round(hr.top + scrollY), qualifier_count: q.length, first_qualifier: first, first_screen_text: firstScreen };
  })()`);
}

// 2. the mobile navigation: what element opens, and does the keyboard work
await vp(390, 844);
await go("/en");
res.sheet = await ev(`(async () => {
  const headerButtons = [...document.querySelectorAll('header button')].map(b => ({ label: (b.getAttribute('aria-label') || b.innerText || '').trim().slice(0, 24), expanded: b.getAttribute('aria-expanded'), controls: b.getAttribute('aria-controls') }));
  const btn = [...document.querySelectorAll('header button')].find(b => b.getAttribute('aria-expanded') !== null || /menu|men\u00fa/i.test((b.getAttribute('aria-label') || '') + b.innerText));
  if (!btn) return { headerButtons, opener: false };
  btn.focus(); btn.click(); await new Promise(r => setTimeout(r, 800));
  const controlled = btn.getAttribute('aria-controls') ? document.getElementById(btn.getAttribute('aria-controls')) : null;
  const guess = controlled || document.querySelector('[role=dialog],[aria-modal=true],#site-sheet,[data-state=open]');
  const openState = { expandedAfterOpen: btn.getAttribute('aria-expanded'), panel: guess ? guess.tagName + '#' + (guess.id || '') : null, focusInPanel: guess ? guess.contains(document.activeElement) : null, activeAfterOpen: (document.activeElement.innerText || document.activeElement.getAttribute('aria-label') || '').trim().slice(0, 24) };
  document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await new Promise(r => setTimeout(r, 700));
  const after = { expandedAfterEscape: btn.getAttribute('aria-expanded'), panelVisible: guess ? getComputedStyle(guess).display !== 'none' && guess.getBoundingClientRect().height > 0 : null, focusBackOnOpener: document.activeElement === btn };
  return { headerButtons, opener: true, ...openState, ...after };
})()`);
await shot("rvb-390-en-sheet-open");

// 3. stacked cards at 390x640: is a card's own content reachable without leaving the card
await vp(390, 640);
await go("/en");
res.stack = await ev(`(() => { const c = [...document.querySelectorAll('.stack-card')];
  return c.map(e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
    return { h: Math.round(r.height), viewport: innerHeight, position: s.position, top: s.top, overflowY: s.overflowY, text: (e.innerText || '').trim().slice(0, 40) }; }).slice(0, 6); })()`);
await shot("rvb-390x640-stack");
writeFileSync(OUT, JSON.stringify(res, null, 1));
console.log(JSON.stringify(res, null, 1).slice(0, 2600));
ws.close(); for (const k of kids) k.kill(); process.exit(0);
