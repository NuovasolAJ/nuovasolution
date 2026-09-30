// Navigation behaviour in a real browser (owner order 2026-09-29 C): a new page starts at the top, going back
// returns to where the visitor was, anchors land on their target below the fixed header, a deep link with an
// anchor works on first load, the language switch keeps the anchor, and no answer is folded away.
// Desktop and phone, on a local build (default) or a deployed origin (BASE=https://…).
// Writes nav-results.json. Exit 1 on any failure.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "evidence_2026-09-29", "navigation");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3133, CDP_PORT = 9374;
const BASE = (process.env.BASE ?? `http://localhost:${PORT}`).replace(/\/$/, "");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const results = { started_utc: new Date().toISOString(), base: BASE, commit: process.env.E2E_COMMIT ?? null, deployment: process.env.E2E_DEPLOYMENT ?? null, checks: [] };
const check = (id, what, pass, evidence) => { results.checks.push({ id, what, pass: Boolean(pass), evidence }); console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what}`); };
const kids = [];
try {
  if (!process.env.BASE) {
    const p = spawn(process.execPath, [NEXT, "start", "-p", String(PORT)], { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
    p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p);
    for (let i = 0; i < 120; i++) { try { const r = await fetch(`${BASE}/en`, { redirect: "manual" }); if (r.status) break; } catch { /* not up */ } await sleep(500); }
  }
  const prof = join(tmpdir(), `nuova-nav-${Date.now()}`);
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
  const waitFor = async (x, ms = 12000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await ev(x)) return true; await sleep(200); } return false; };
  const W = process.env.BASE ? 3200 : 2000;
  await send("Page.enable");
  await send("Runtime.enable");
  const HEADER = `Math.round(document.querySelector('header')?.getBoundingClientRect().bottom ?? 0)`;

  for (const [tag, w, h, mobile] of [["d1440", 1440, 900, false], ["m390", 390, 844, true]]) {
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile });

    // a new page starts at the top; back returns to the place left
    await send("Page.navigate", { url: `${BASE}/en` });
    await sleep(W);
    await ev(`window.scrollTo({top:2400,behavior:'instant'})`);
    await sleep(500);
    const left = await ev("Math.round(scrollY)");
    await ev(`(()=>{const a=[...document.querySelectorAll('footer a')].find(x=>x.getAttribute('href')==='/en/packages');a.scrollIntoView({block:'center'});a.click();})()`);
    const arrived = await waitFor(`location.pathname==='/en/packages'`);
    await sleep(900);
    const top = await ev("Math.round(scrollY)");
    await ev("history.back()");
    const back = await waitFor(`location.pathname==='/en'`);
    await sleep(1200);
    const restored = await ev("Math.round(scrollY)");
    check(`NV-${tag}-01`, "a link opens the new page at its top; back returns to the page and the place that was left", arrived && top === 0 && back && restored > 300, { left_at: left, new_page_scrollY: top, after_back_scrollY: restored });
    await ev("history.forward()");
    const fwd = await waitFor(`location.pathname==='/en/packages'`);
    check(`NV-${tag}-02`, "forward works after back", fwd, { path: await ev("location.pathname") });

    // anchors: the hero chip lands on its stage, clear of the fixed header
    await send("Page.navigate", { url: `${BASE}/en` });
    await sleep(W);
    await ev(`document.querySelector('a[href$="#step-record"]').click()`);
    await sleep(1400);
    const a1 = await ev(`({hash:location.hash,top:Math.round(document.getElementById('step-record').getBoundingClientRect().top),header:${HEADER},vh:innerHeight})`);
    check(`NV-${tag}-03`, "an anchor lands on its target, below the fixed header and inside the first screen", a1.hash === "#step-record" && a1.top >= a1.header - 1 && a1.top < a1.vh * 0.5, a1);
    await ev("history.back()");
    await sleep(900);
    const a1b = await ev(`({hash:location.hash,y:Math.round(scrollY)})`);
    check(`NV-${tag}-04`, "back from an anchor returns to where the visitor was on the same page", a1b.hash === "" && a1b.y < 200, a1b);

    // a deep link with an anchor on first load, in Spanish; the language switch keeps it
    await send("Page.navigate", { url: `${BASE}/es#step-done` });
    await sleep(W + 600);
    const a2 = await ev(`({hash:location.hash,top:Math.round(document.getElementById('step-done').getBoundingClientRect().top),header:${HEADER},vh:innerHeight})`);
    check(`NV-${tag}-05`, "a deep link with an anchor lands on its target on first load", a2.hash === "#step-done" && a2.top >= a2.header - 1 && a2.top < a2.vh * 0.6, a2);
    if (!mobile) {
      const sw = await ev(`[...document.querySelectorAll('header a')].find(a=>/^\\/en(#|$)/.test(a.getAttribute('href')||''))?.getAttribute('href')??null`);
      check(`NV-${tag}-06`, "the language switch keeps the anchor", sw === "/en#step-done", { href: sw });
    }

    // questions and answers: the public pages fold nothing away; every answer is readable without a click
    const faq = [];
    for (const path of ["/en", "/en/packages", "/es/trial"]) {
      await send("Page.navigate", { url: `${BASE}${path}` });
      await sleep(W);
      faq.push(await ev(`({path:location.pathname,details:document.querySelectorAll('main details').length,collapsed:document.querySelectorAll('main [aria-expanded="false"]').length,questions:[...document.querySelectorAll('main h3, main dt')].filter(e=>/\\?$/.test(e.innerText.trim())).length})`));
    }
    check(`NV-${tag}-07`, "the public pages have no accordion: questions stand with their answers, nothing is folded away", faq.every((f) => f.details === 0 && f.collapsed === 0) && faq.some((f) => f.questions >= 3), faq);
  }
  ws.close();
} catch (e) {
  check("NV-00", "the run completed", false, String(e?.stack ?? e));
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
  results.finished_utc = new Date().toISOString();
  const pass = results.checks.filter((c) => c.pass).length;
  results.pass = pass; results.total = results.checks.length;
  writeFileSync(join(OUT, "nav-results.json"), JSON.stringify(results, null, 1));
  console.log(`${pass} passed, ${results.total - pass} failed -> ${join(OUT, "nav-results.json")}`);
  process.exit(pass === results.total ? 0 : 1);
}
