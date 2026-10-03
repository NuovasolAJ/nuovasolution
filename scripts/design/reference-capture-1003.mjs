// Reference pictures for round 1003 (owner direction 2026-10-03: fora.so and glaido.com). Headless Edge,
// 1440x900 and 390x844 (2x). Per site: the hero as a visitor sees it first, the pricing area scrolled under
// the header, and the stations in between (viewport pictures, no shrunk panoramas). Nothing is copied into
// the project; the pictures go to the evidence folder so the build can be laid next to them.
// Usage: node scripts/design/reference-capture-1003.mjs     (OUT overrides the folder)
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const OUT = process.env.OUT ?? join(process.cwd(), "docs", "website_redesign", "evidence_2026-10-03", "references");
const CDP_PORT = 9342;
const SITES = [["fora", "https://fora.so/"], ["glaido", "https://www.glaido.com/"]];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const prof = join(tmpdir(), `nuova-refs-${Date.now()}`);
const edge = spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" });
const notes = [];
try {
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = (x) => send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true }).then((r) => r.result?.result?.value);
  const shot = async (name) => { const s = await send("Page.captureScreenshot", { format: "png" }); if (s.result?.data) writeFileSync(join(OUT, `${name}.png`), Buffer.from(s.result.data, "base64")); };
  await send("Page.enable");
  await send("Runtime.enable");

  for (const [name, url] of SITES) {
    for (const [tag, w, h, mobile] of [["d1440", 1440, 900, false], ["m390", 390, 844, true]]) {
      await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: mobile ? 2 : 1, mobile });
      if (mobile) await send("Network.setUserAgentOverride", { userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1" });
      else await send("Network.setUserAgentOverride", { userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0" });
      try {
        await send("Page.navigate", { url });
        await sleep(7000);
        await shot(`${name}-${tag}-hero`);
        const total = (await ev("document.documentElement.scrollHeight")) ?? h;
        // Walk the page once so lazy sections render, then look for the pricing area by its heading or anchor.
        for (let y = 0; y < total; y += h) { await ev(`window.scrollTo({top:${y},behavior:'instant'})`); await sleep(350); }
        const info = JSON.parse(await ev(`(()=>{
          const heads = [...document.querySelectorAll('h1,h2,h3,[id]')];
          const hit = document.querySelector('#pricing, [id*=pricing i], [id*=plans i]') || heads.find(e => /pricing|plans?\\b|simple.*price|choose/i.test((e.innerText||'').slice(0,80)) && e.tagName.startsWith('H'));
          const y = hit ? Math.round(hit.getBoundingClientRect().top + scrollY) : null;
          const hs = [...document.querySelectorAll('h1,h2')].map(e => ({ t: e.tagName, y: Math.round(e.getBoundingClientRect().top + scrollY), text: (e.innerText||'').trim().replace(/\\s+/g,' ').slice(0,90), size: getComputedStyle(e).fontSize, weight: getComputedStyle(e).fontWeight, font: getComputedStyle(e).fontFamily.slice(0,60) }));
          const body = getComputedStyle(document.body);
          const btn = document.querySelector('main a[class*=button i], main button, header a[class*=button i], a[href*=sign], a[href*=download]');
          const b = btn ? getComputedStyle(btn) : null;
          return JSON.stringify({ pricingY: y, height: document.documentElement.scrollHeight, heads: hs, bodyBg: body.backgroundColor, bodyColor: body.color, bodyFont: body.fontFamily.slice(0,80), button: b ? { bg: b.backgroundColor, color: b.color, radius: b.borderRadius, pad: b.padding, size: b.fontSize, text: (btn.innerText||'').trim().slice(0,40) } : null });
        })()`));
        notes.push({ site: name, view: tag, ...info });
        if (info.pricingY != null) {
          await ev(`window.scrollTo({top:${Math.max(0, info.pricingY - 96)},behavior:'instant'})`);
          await sleep(1500);
          await shot(`${name}-${tag}-pricing`);
          await ev(`window.scrollBy({top:${Math.round(h * 0.8)},behavior:'instant'})`);
          await sleep(900);
          await shot(`${name}-${tag}-pricing-2`);
        }
        // Stations down the page for study (viewport pictures).
        const stations = mobile ? 6 : 6;
        for (let k = 1; k <= stations; k++) {
          await ev(`window.scrollTo({top:${Math.round((total - h) * (k / stations))},behavior:'instant'})`);
          await sleep(1100);
          await shot(`${name}-${tag}-s${k}`);
        }
        console.log(`captured ${name} ${tag} (height ${total}, pricing at ${info.pricingY})`);
      } catch (e) {
        console.log(`failed ${name} ${tag}: ${e?.message ?? e}`);
      }
    }
  }
  ws.close();
} finally {
  edge.kill();
  writeFileSync(join(OUT, "reference-notes.json"), JSON.stringify(notes, null, 1));
}
