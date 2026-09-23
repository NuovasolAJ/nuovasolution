// Looks at the owner's reference sites in a real (headless) browser: desktop 1440 and mobile 390,
// top of page plus scrolled positions. Output is a folder of PNGs for the design notes; nothing is
// copied into the project. Usage: node scripts/design/reference-capture.mjs   (OUT overrides the folder)
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const OUT = process.env.OUT ?? join(process.cwd(), "docs", "website_redesign", "design_probe_2026-09-23", "references");
const CDP_PORT = 9341;
const SITES = [
  ["fora", "https://fora.so/"],
  ["lemon", "https://heylemon.ai/"],
  ["21st", "https://21st.dev/"],
  ["godly", "https://godly.website/"],
  ["awwwards", "https://www.awwwards.com/"],
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const prof = join(tmpdir(), `nuova-refs-${Date.now()}`);
const edge = spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" });
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
  await send("Network.setUserAgentOverride", { userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0" });

  for (const [name, url] of SITES) {
    for (const [tag, w, h, mobile] of [["d1440", 1440, 900, false], ["m390", 390, 844, true]]) {
      await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: mobile ? 2 : 1, mobile });
      try {
        await send("Page.navigate", { url });
        await sleep(6000);
        await shot(`${name}-${tag}-0`);
        const total = (await ev("document.documentElement.scrollHeight")) ?? h;
        const steps = mobile ? [0.35, 0.7] : [0.25, 0.5, 0.75];
        for (const f of steps) {
          await ev(`window.scrollTo({top:${Math.floor(total * f)},behavior:'instant'})`);
          await sleep(1800);
          await shot(`${name}-${tag}-${Math.round(f * 100)}`);
        }
        console.log(`captured ${name} ${tag} (height ${total})`);
      } catch (e) {
        console.log(`failed ${name} ${tag}: ${e?.message ?? e}`);
      }
    }
  }
  ws.close();
} finally {
  edge.kill();
}
