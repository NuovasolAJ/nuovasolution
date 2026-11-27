// Loading on a throttled phone: CDP network (slow 4G: 1.6 Mbit/s down, 150 ms RTT) and 4x CPU slowdown; what the first screen costs
// and what the whole tour costs, bytes and timings, for the Rundgang route and the E2 home for comparison
import { chromium } from "playwright";
const [base = "http://localhost:3180", locale = "es"] = process.argv.slice(2);
const browser = await chromium.launch();
const out = [];
for (const path of [`/${locale}/rundgang`, `/${locale}`]) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  let bytes = 0; const imgBytes = {};
  cdp.on("Network.loadingFinished", (e) => { bytes += e.encodedDataLength; });
  const reqs = new Map();
  cdp.on("Network.requestWillBeSent", (e) => reqs.set(e.requestId, e.request.url));
  cdp.on("Network.loadingFinished", (e) => { const u = reqs.get(e.requestId) || ""; if (/\/media\//.test(u)) imgBytes[u.replace(base, "")] = e.encodedDataLength; });
  const t0 = Date.now();
  await page.goto(`${base}${path}`, { waitUntil: "domcontentloaded", timeout: 120000 });
  const dcl = Date.now() - t0;
  // the first screen: when is the hero's picture painted (the stage's first img or the hero's img) and the main action in the DOM?
  await page.waitForSelector("[data-hero-cta='task']", { timeout: 60000 });
  const heroImgDone = await page.evaluate(async () => { const img = document.querySelector(".tour-scene[data-scene='s1'] img, .hf-media img"); if (!img) return null; if (img.complete && img.naturalWidth) return "already"; await new Promise((r) => { img.addEventListener("load", r, { once: true }); img.addEventListener("error", r, { once: true }); }); return "loaded"; });
  const firstScreenMs = Date.now() - t0;
  const bytesFirst = bytes;
  const perf = await page.evaluate(() => { const nav = performance.getEntriesByType("navigation")[0]; const lcp = performance.getEntriesByType("largest-contentful-paint").pop(); return { domContentLoaded: Math.round(nav?.domContentLoadedEventEnd ?? 0), lcp: lcp ? Math.round(lcp.startTime) : null }; });
  // then the whole tour: scroll to the end slowly and wait for the network to settle
  const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  for (let y = 0; y < total; y += 400) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(250); }
  await page.waitForLoadState("networkidle", { timeout: 120000 }).catch(() => {});
  await page.waitForTimeout(1500);
  const scenesLoaded = await page.evaluate(() => [...document.querySelectorAll(".tour-img")].filter((i) => i.complete && i.naturalWidth).length);
  out.push({ path, firstScreenMs, bytesFirstKB: Math.round(bytesFirst / 1024), domContentLoadedMs: dcl, lcpMs: perf.lcp, heroImg: heroImgDone, totalMs: Date.now() - t0, bytesTotalKB: Math.round(bytes / 1024), scenesLoaded, media: Object.fromEntries(Object.entries(imgBytes).map(([k, v]) => [k, Math.round(v / 1024) + " KB"])) });
  await ctx.close();
}
await browser.close();
console.log(JSON.stringify(out, null, 1));
