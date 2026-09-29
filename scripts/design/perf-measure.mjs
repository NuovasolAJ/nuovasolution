// Performance before and after media and motion (owner order 2026-09-29 E): the same pages of two
// deployments, measured in the same browser under the same conditions, several runs each, cold cache.
// Not one score: time to first byte, first and largest contentful paint, layout shift (also after the
// whole page was scrolled), main-thread blocking, and what was transferred, split by kind. Video bytes
// before anybody presses play have to be zero.
// Usage: BEFORE=https://<old deployment> AFTER=https://<new deployment> node scripts/design/perf-measure.mjs
//        RUNS=5 ROUTES=home,packages LOCALES=en,es
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "evidence_2026-09-29", "performance");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const CDP_PORT = 9361;
const RUNS = Number(process.env.RUNS ?? 5);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ORIGINS = [["before", process.env.BEFORE], ["after", process.env.AFTER]].filter(([, u]) => u).map(([k, u]) => [k, u.replace(/\/$/, "")]);
if (ORIGINS.length === 0) { console.log("BEFORE= and/or AFTER= are required"); process.exit(1); }
const routes = (process.env.ROUTES ? process.env.ROUTES.split(",") : ["home", "packages"]).map((r) => (r === "home" ? "" : `/${r}`));
const locales = process.env.LOCALES ? process.env.LOCALES.split(",") : ["en", "es"];
mkdirSync(OUT, { recursive: true });

// Identical conditions for both deployments.
const PROFILES = {
  desktop: { width: 1440, height: 900, dpr: 1, mobile: false, cpu: 1, net: null },
  // A mid-range phone on a slow 4G connection: 4x CPU slowdown, 1.6 Mbit/s down, 750 kbit/s up, 150 ms round trip.
  mobile: { width: 390, height: 844, dpr: 2, mobile: true, cpu: 4, net: { latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 } },
};

const OBSERVE = `(()=>{
  const m = (window.__perf = { lcp: 0, lcpEl: null, cls: 0, fcp: 0, long: 0, shifts: [] });
  try { new PerformanceObserver((l)=>{ for (const e of l.getEntries()) { m.lcp = e.startTime; m.lcpEl = (e.element ? e.element.tagName.toLowerCase() + (e.element.id ? '#'+e.element.id : '') + ' ' + ((e.element.innerText||e.url||'').slice(0,50)) : null); } }).observe({ type: 'largest-contentful-paint', buffered: true }); } catch {}
  try { new PerformanceObserver((l)=>{ for (const e of l.getEntries()) if (!e.hadRecentInput) { m.cls += e.value; m.shifts.push({ t: Math.round(e.startTime), v: Math.round(e.value*10000)/10000 }); } }).observe({ type: 'layout-shift', buffered: true }); } catch {}
  try { new PerformanceObserver((l)=>{ for (const e of l.getEntries()) if (e.name === 'first-contentful-paint') m.fcp = e.startTime; }).observe({ type: 'paint', buffered: true }); } catch {}
  try { new PerformanceObserver((l)=>{ for (const e of l.getEntries()) m.long += Math.max(0, e.duration - 50); }).observe({ type: 'longtask', buffered: true }); } catch {}
})()`;

const kinds = (mime, url) => (/javascript/.test(mime) ? "js" : /css/.test(mime) ? "css" : /^image\//.test(mime) ? "image" : /^video\//.test(mime) || /\.(mp4|webm)(\?|$)/.test(url) ? "video" : /font/.test(mime) || /\.woff2?(\?|$)/.test(url) ? "font" : /html/.test(mime) ? "html" : "other");
const median = (a) => { const s = [...a].sort((x, y) => x - y); const n = s.length; return n ? (n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2) : null; };
const r0 = (v) => (v === null || v === undefined ? null : Math.round(v));
const r3 = (v) => (v === null || v === undefined ? null : Math.round(v * 1000) / 1000);

const results = { started_utc: new Date().toISOString(), runs: RUNS, profiles: PROFILES, origins: Object.fromEntries(ORIGINS), rows: [] };
const kids = [];
try {
  const prof = join(tmpdir(), `nuova-perf-${Date.now()}`);
  kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", "--disable-extensions", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" }));
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  let net = new Map();
  let loaded = null;
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); return; }
    if (m.method === "Network.responseReceived") net.set(m.params.requestId, { url: m.params.response.url, mime: m.params.response.mimeType ?? "", bytes: 0 });
    if (m.method === "Network.loadingFinished") { const n = net.get(m.params.requestId); if (n) n.bytes = m.params.encodedDataLength; }
    if (m.method === "Page.loadEventFired" && loaded) loaded();
  });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");
  await send("Page.addScriptToEvaluateOnNewDocument", { source: OBSERVE });

  // Warm every deployment once (serverless cold start is not what is compared), then measure interleaved.
  for (const [, origin] of ORIGINS) for (const l of locales) for (const r of routes) await fetch(`${origin}/${l}${r}`).then((x) => x.text()).catch(() => null);

  for (const [pk, p] of Object.entries(PROFILES)) {
    await send("Emulation.setDeviceMetricsOverride", { width: p.width, height: p.height, deviceScaleFactor: p.dpr, mobile: p.mobile });
    await send("Emulation.setCPUThrottlingRate", { rate: p.cpu });
    await send("Network.emulateNetworkConditions", p.net ? { offline: false, ...p.net } : { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
    for (const locale of locales) {
      for (const route of routes) {
        const acc = Object.fromEntries(ORIGINS.map(([k]) => [k, []]));
        for (let run = 0; run < RUNS; run++) {
          for (const [ok, origin] of ORIGINS) {
            await send("Network.clearBrowserCache");
            await send("Network.clearBrowserCookies");
            await send("Page.navigate", { url: "about:blank" });
            await sleep(200);
            net = new Map();
            const done = new Promise((res) => { loaded = res; });
            await send("Page.navigate", { url: `${origin}/${locale}${route}` });
            await Promise.race([done, sleep(45000)]);
            loaded = null;
            await sleep(p.net ? 2500 : 1500);
            const atLoad = await ev(`(()=>{const n=performance.getEntriesByType('navigation')[0];const m=window.__perf;return {ttfb:n?n.responseStart:null,dcl:n?n.domContentLoadedEventEnd:null,load:n?n.loadEventEnd:null,fcp:m.fcp,lcp:m.lcp,lcpEl:m.lcpEl,cls:m.cls,long:m.long,dom:document.getElementsByTagName('*').length,height:document.documentElement.scrollHeight,videos:document.querySelectorAll('video').length}})()`);
            const before = [...net.values()];
            // Scroll the whole page in viewport steps, as a reader does; lazy media and reveals happen here.
            await ev(`(async()=>{const h=document.documentElement.scrollHeight;for(let y=0;y<h;y+=Math.round(innerHeight*0.8)){scrollTo(0,y);await new Promise(r=>setTimeout(r,180));}scrollTo(0,h);await new Promise(r=>setTimeout(r,600));})()`);
            await sleep(p.net ? 2500 : 1000);
            const after = await ev(`({cls:window.__perf.cls,long:window.__perf.long,shifts:window.__perf.shifts.slice(-8)})`);
            const sum = (rows) => { const o = { total: 0, requests: rows.length, js: 0, css: 0, image: 0, video: 0, font: 0, html: 0, other: 0 }; for (const n of rows) { const k = kinds(n.mime, n.url); o[k] += n.bytes; o.total += n.bytes; } return o; };
            acc[ok].push({ ...atLoad, clsScrolled: after.cls, longScrolled: after.long, shifts: after.shifts, transferLoad: sum(before), transferScrolled: sum([...net.values()]) });
          }
        }
        for (const [ok] of ORIGINS) {
          const a = acc[ok];
          const med = (f) => median(a.map(f).filter((v) => typeof v === "number"));
          const row = {
            origin: ok, profile: pk, page: `/${locale}${route || ""}`, runs: a.length,
            ttfb_ms: r0(med((x) => x.ttfb)), fcp_ms: r0(med((x) => x.fcp)), lcp_ms: r0(med((x) => x.lcp)), lcp_min: r0(Math.min(...a.map((x) => x.lcp))), lcp_max: r0(Math.max(...a.map((x) => x.lcp))),
            lcp_element: a[a.length - 1].lcpEl, load_ms: r0(med((x) => x.load)),
            cls_load: r3(med((x) => x.cls)), cls_after_scroll: r3(med((x) => x.clsScrolled)), blocking_ms: r0(med((x) => x.longScrolled)),
            dom_nodes: r0(med((x) => x.dom)), page_height: r0(med((x) => x.height)), video_elements: r0(med((x) => x.videos)),
            kb_at_load: r0(med((x) => x.transferLoad.total) / 1024), kb_after_scroll: r0(med((x) => x.transferScrolled.total) / 1024),
            requests_at_load: r0(med((x) => x.transferLoad.requests)), requests_after_scroll: r0(med((x) => x.transferScrolled.requests)),
            kb_js: r0(med((x) => x.transferScrolled.js) / 1024), kb_css: r0(med((x) => x.transferScrolled.css) / 1024), kb_image: r0(med((x) => x.transferScrolled.image) / 1024),
            kb_font: r0(med((x) => x.transferScrolled.font) / 1024), kb_video: r0(med((x) => x.transferScrolled.video) / 1024), kb_html: r0(med((x) => x.transferScrolled.html) / 1024),
            largest_shifts: a[a.length - 1].shifts,
          };
          results.rows.push(row);
          console.log(`${ok.padEnd(6)} ${pk.padEnd(7)} ${row.page.padEnd(14)} ttfb ${row.ttfb_ms} fcp ${row.fcp_ms} lcp ${row.lcp_ms} [${row.lcp_min}-${row.lcp_max}] cls ${row.cls_load}/${row.cls_after_scroll} block ${row.blocking_ms} kB ${row.kb_at_load}/${row.kb_after_scroll} img ${row.kb_image} video ${row.kb_video} dom ${row.dom_nodes} h ${row.page_height}`);
        }
      }
    }
  }
  ws.close();
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
  results.finished_utc = new Date().toISOString();
  writeFileSync(join(OUT, "perf-results.json"), JSON.stringify(results, null, 1));
  let md = `# Performance, before and after\n\n${results.finished_utc} · ${RUNS} runs per page and deployment, cold cache, interleaved · median values\n\n`;
  for (const [k, u] of ORIGINS) md += `- **${k}**: \`${u}\`\n`;
  md += `\nDesktop: 1440 × 900, no throttling. Mobile: 390 × 844, CPU slowed 4×, 1.6 Mbit/s down, 750 kbit/s up, 150 ms round trip.\n\n`;
  md += `| Page | Profile | State | TTFB ms | FCP ms | LCP ms (min–max) | CLS at load | CLS after scroll | Blocking ms | kB at load | kB after scroll | Images kB | Video kB | JS kB | DOM nodes | Page height px |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|\n`;
  for (const r of results.rows) md += `| ${r.page} | ${r.profile} | ${r.origin} | ${r.ttfb_ms} | ${r.fcp_ms} | ${r.lcp_ms} (${r.lcp_min}–${r.lcp_max}) | ${r.cls_load} | ${r.cls_after_scroll} | ${r.blocking_ms} | ${r.kb_at_load} | ${r.kb_after_scroll} | ${r.kb_image} | ${r.kb_video} | ${r.kb_js} | ${r.dom_nodes} | ${r.page_height} |\n`;
  writeFileSync(join(OUT, "PERFORMANCE.md"), md);
  console.log(`-> ${join(OUT, "PERFORMANCE.md")}`);
}
