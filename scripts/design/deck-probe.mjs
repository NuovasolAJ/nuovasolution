// The deck of the journey section in a real browser (owner order 2026-09-30: cards slide over each other
// while scrolling and release the next, no text overlay, no scroll hijacking, a calm sequence on a phone,
// the same content without movement under reduced motion). Local build (default) or deployed (BASE=…).
//   desktop 1440×900, 1280×800, 1024×768   deck on: each card sticks, the next one slides over it;
//                                         every card is seen whole (or, if taller than the window, from
//                                         its top to its end) before anything covers it; the page scrolls
//                                         at the browser's own pace (scroll position = what was asked)
//   1024×640, 390×844, reduced motion     deck off: cards follow each other, nothing sticks
// Writes deck-results.json and frames (desktop: the moment each card is covered half way; phone: each card).
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "design_probe_2026-09-30", "deck");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3135, CDP_PORT = 9376;
const BASE = (process.env.BASE ?? `http://localhost:${PORT}`).replace(/\/$/, "");
const LOCALES = process.env.LOCALES ? process.env.LOCALES.split(",") : ["en", "es"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const results = { started_utc: new Date().toISOString(), base: BASE, commit: process.env.E2E_COMMIT ?? null, deployment: process.env.E2E_DEPLOYMENT ?? null, checks: [], runs: [] };
const check = (id, what, pass, evidence) => { results.checks.push({ id, what, pass: Boolean(pass), evidence }); console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what}`); };
const kids = [];
try {
  if (!process.env.BASE) {
    const p = spawn(process.execPath, [NEXT, "start", "-p", String(PORT)], { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
    p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p);
    for (let i = 0; i < 120; i++) { try { const r = await fetch(`${BASE}/en`, { redirect: "manual" }); if (r.status) break; } catch { /* not up */ } await sleep(500); }
  }
  const prof = join(tmpdir(), `nuova-deck-${Date.now()}`);
  kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" }));
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const shot = async (name) => { const s = await send("Page.captureScreenshot", { format: "jpeg", quality: 82 }); if (s.result?.data) writeFileSync(join(OUT, `${name}.jpg`), Buffer.from(s.result.data, "base64")); };
  await send("Page.enable");
  await send("Runtime.enable");

  const STATE = `(()=>{
    const deck=document.querySelector('[data-deck]');
    const hb=Math.round(document.querySelector('header').getBoundingClientRect().bottom);
    const items=[...deck.querySelectorAll(':scope > [data-deck-item]')].map(li=>{const r=li.firstElementChild.getBoundingClientRect();return {id:li.id,top:Math.round(r.top),bottom:Math.round(r.bottom),h:Math.round(r.height),pos:getComputedStyle(li).position,covered:parseFloat(getComputedStyle(li).getPropertyValue('--deck-covered'))||0}});
    const rail=document.querySelector('.flow-rail [aria-current=step]')?.getAttribute('href')??null;
    return {deck:deck.dataset.deck,hb,vh:innerHeight,y:Math.round(scrollY),sw:document.documentElement.scrollWidth,iw:innerWidth,items,rail};
  })()`;

  const VIEWS = [
    ["d1440", 1440, 900, false, false, true],
    ["d1280", 1280, 800, false, false, true],
    ["d1024", 1024, 768, false, false, true],
    ["d1024short", 1024, 640, false, false, false],
    ["m390", 390, 844, true, false, false],
    ["d1440rm", 1440, 900, false, true, false],
  ];

  for (const locale of LOCALES) {
    for (const [tag, w, h, mobile, reduce, expectOn] of VIEWS) {
      await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile });
      await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: reduce ? "reduce" : "no-preference" }] });
      await send("Page.navigate", { url: `${BASE}/${locale}` });
      await sleep(process.env.BASE ? 3500 : 2200);
      const start = await ev(`Math.round(document.querySelector('[data-deck]').getBoundingClientRect().top + scrollY) - innerHeight`);
      const end = await ev(`Math.round(document.querySelector('[data-deck]').getBoundingClientRect().bottom + scrollY)`);
      const seen = {};
      let maxCoverWhileUnread = 0, pinnedMax = 0, scrollMismatch = 0, overflow = false;
      const halfShots = new Set();
      const run = { tag, locale, deck: null, steps: 0 };
      for (let y = Math.max(0, start); y <= end; y += 40) {
        await ev(`window.scrollTo({top:${y},behavior:'instant'})`);
        await sleep(60);
        const s = await ev(STATE);
        run.deck = s.deck;
        run.steps++;
        if (Math.abs(s.y - Math.min(y, s.y)) > 2) scrollMismatch++;
        if (s.sw > s.iw) overflow = true;
        s.items.forEach((it, i) => {
          const k = it.id;
          seen[k] ??= { topSeen: false, bottomSeen: false, readBeforeCover: false, h: it.h };
          const free = it.covered < 0.02;
          if (free && it.top >= s.hb - 1 && it.top < s.vh) seen[k].topSeen = true;
          if (free && it.bottom <= s.vh + 1 && it.bottom > s.hb) seen[k].bottomSeen = true;
          if (seen[k].topSeen && seen[k].bottomSeen) seen[k].readBeforeCover = true;
          if (!seen[k].readBeforeCover && it.covered > 0.02) maxCoverWhileUnread = Math.max(maxCoverWhileUnread, it.covered);
          if (it.pos === "sticky" && it.top <= Math.max(s.hb + 80, 0) && it.top >= -it.h) pinnedMax = Math.max(pinnedMax, i + 1);
          if (s.deck === "on" && it.covered >= 0.45 && it.covered <= 0.75 && !halfShots.has(k) && (tag === "d1440" || tag === "d1024")) {
            halfShots.add(k);
            halfShots.pending = k;
          }
        });
        if (halfShots.pending) { await shot(`${tag}-${locale}-deck-${halfShots.pending}-half-covered`); halfShots.pending = null; }
      }
      // the section after the deck is reached and not covered by a stuck card
      await ev(`document.getElementById('one-h').scrollIntoView({block:'center'})`);
      await sleep(400);
      const after = await ev(`(()=>{const h=document.getElementById('one-h');const r=h.getBoundingClientRect();const el=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return {hit:h.contains(el)||el===h}})()`);
      if (tag === "m390") {
        for (const id of ["step-answer", "step-record", "step-handover", "step-done"]) {
          await ev(`document.getElementById('${id}').scrollIntoView({block:'start'})`);
          await sleep(300);
          await shot(`${tag}-${locale}-${id}`);
        }
      }
      run.seen = seen; run.maxCoverWhileUnread = maxCoverWhileUnread; run.pinnedMax = pinnedMax; run.overflow = overflow; run.afterVisible = after.hit; run.scrollMismatch = scrollMismatch;
      results.runs.push(run);
      const allRead = Object.values(seen).every((v) => v.readBeforeCover);
      if (expectOn) {
        check(`DK-${tag}-${locale}-on`, `${w}×${h}: the deck is on, cards stick and slide over each other`, run.deck === "on" && pinnedMax >= 2, { deck: run.deck, cards_stuck_at_once: pinnedMax });
        check(`DK-${tag}-${locale}-read`, `${w}×${h}: every card is seen from its top to its end before anything covers it`, allRead && maxCoverWhileUnread === 0, { seen, maxCoverWhileUnread });
      } else {
        check(`DK-${tag}-${locale}-off`, `${w}×${h}${reduce ? " reduced motion" : ""}: no deck, the cards follow each other and nothing sticks`, run.deck === "off" && pinnedMax === 0, { deck: run.deck, pinnedMax });
      }
      check(`DK-${tag}-${locale}-flow`, `${w}×${h}: native scrolling (every requested position reached), no horizontal overflow, the next section is free after the deck`, scrollMismatch === 0 && !overflow && after.hit, { scrollMismatch, overflow, afterVisible: after.hit });
    }
  }
  ws.close();
} catch (e) {
  check("DK-00", "the run completed", false, String(e?.stack ?? e));
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
  results.finished_utc = new Date().toISOString();
  const pass = results.checks.filter((c) => c.pass).length;
  results.pass = pass; results.total = results.checks.length;
  writeFileSync(join(OUT, "deck-results.json"), JSON.stringify(results, null, 1));
  console.log(`${pass} passed, ${results.total - pass} failed -> ${join(OUT, "deck-results.json")}`);
  process.exit(pass === results.total ? 0 : 1);
}
