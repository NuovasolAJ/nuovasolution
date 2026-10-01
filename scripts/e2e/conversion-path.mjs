// The conversion path in a real browser (owner order 2026-09-30: Home → Packages → Signup → Confirmation →
// Onboarding without a dead end, call-to-action targets unambiguous). Clicks the visible controls, as a
// visitor does, in EN and ES at 1440 and 390 px.
//   stub build (default): the whole path, sign-up and the agency step included (nothing leaves this machine)
//   BASE=https://<staging preview> STAGING=1: up to the filled sign-up form, the confirmation landing, the
//     expired-link page and the login form; nothing is submitted, no account is created, no e-mail is sent
// Every page on the way must offer a way forward. Writes conversion-results.json and one picture per step.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const STAGING = process.env.STAGING === "1";
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "evidence_2026-09-30", STAGING ? "conversion_staging" : "conversion_stub");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3137, CDP_PORT = 9378;
const BASE = (process.env.BASE ?? `http://localhost:${PORT}`).replace(/\/$/, "");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const results = { started_utc: new Date().toISOString(), base: BASE, staging: STAGING, commit: process.env.E2E_COMMIT ?? null, deployment: process.env.E2E_DEPLOYMENT ?? null, checks: [], path: [] };
const check = (id, what, pass, evidence) => { results.checks.push({ id, what, pass: Boolean(pass), evidence }); console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what}`); };
const kids = [];
try {
  if (!process.env.BASE) {
    const p = spawn(process.execPath, [NEXT, "start", "-p", String(PORT)], { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
    p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p);
    for (let i = 0; i < 120; i++) { try { const r = await fetch(`${BASE}/en`, { redirect: "manual" }); if (r.status) break; } catch { /* not up */ } await sleep(500); }
  }
  const prof = join(tmpdir(), `nuova-conv-${Date.now()}`);
  kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" }));
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  let posts = [];
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); return; }
    if (m.method === "Network.requestWillBeSent" && m.params.request.method === "POST") posts.push(new URL(m.params.request.url).pathname);
  });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const waitFor = async (x, ms = 15000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await ev(x)) return true; await sleep(200); } return false; };
  const W = process.env.BASE ? 3200 : 1800;
  const nav = async (url) => { await send("Page.navigate", { url }); await sleep(W); };
  const shot = async (name) => { const s = await send("Page.captureScreenshot", { format: "jpeg", quality: 78 }); if (s.result?.data) writeFileSync(join(OUT, `${name}.jpg`), Buffer.from(s.result.data, "base64")); };
  // A real click on a visible control: scrolled into view, then a mouse press at its centre.
  const click = async (sel) => {
    const ok = await ev(`(()=>{const e=document.querySelector(${JSON.stringify(sel)});if(!e)return false;e.scrollIntoView({block:'center'});return true})()`);
    if (!ok) return false;
    await sleep(350);
    const p = await ev(`(()=>{const b=document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect();return {x:b.left+b.width/2,y:b.top+b.height/2}})()`);
    await send("Input.dispatchMouseEvent", { type: "mousePressed", x: p.x, y: p.y, button: "left", clickCount: 1 });
    await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: p.x, y: p.y, button: "left", clickCount: 1 });
    return true;
  };
  const setVal = (sel, v) => ev(`(()=>{const e=document.querySelector(${JSON.stringify(sel)});if(!e)return false;const proto=e.tagName==='SELECT'?HTMLSelectElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(e,${JSON.stringify(v)});e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));return true})()`);
  // A way forward: a visible control inside main or the header that leads to sign-up, login, onboarding, packages or contact.
  const forward = () => ev(`(()=>{const v=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(e).visibility!=='hidden'};return [...document.querySelectorAll('main a[href], main button[type=submit], header a[href]')].filter(v).map(a=>a.getAttribute('href')||'submit').filter(h=>h==='submit'||/\\/(signup|login|onboarding|packages|contact)(\\?|#|$)/.test(h)).length})()`);
  const step = async (name, extra = {}) => { const s = { name, path: await ev("location.pathname+location.search"), forward: await forward(), ...extra }; results.path.push(s); return s; };
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");

  for (const locale of ["en", "es"]) {
    for (const [tag, w, h, mobile] of [["d1440", 1440, 900, false], ["m390", 390, 844, true]]) {
      const id = `${tag}-${locale}`;
      await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile });
      await send("Network.clearBrowserCookies");
      posts = [];

      // 1 Home: the hero's primary control, and the way to the plans
      await nav(`${BASE}/${locale}`);
      const primaries = await ev(`[...document.querySelectorAll('main a[href]')].filter(a=>/bg-ink-950/.test(a.className)).map(a=>a.getAttribute('href'))`);
      const allToSignup = primaries.length >= 3 && primaries.every((hrf) => hrf === `/${locale}/signup`);
      const s1 = await step("home");
      await shot(`${id}-1-home`);
      check(`CV-${id}-1`, "home: every primary control leads to sign-up, and the page offers a way forward", allToSignup && s1.forward > 0, { primaries, forward: s1.forward });

      // 2 Home → packages (the offer's "See the plans")
      await click(`main a[href="/${locale}/packages"]`);
      const atPk = await waitFor(`location.pathname==='/${locale}/packages'`);
      await sleep(900);
      const sticker = await ev(`!!document.querySelector('[data-trial-sticker]')`);
      const s2 = await step("packages", { sticker });
      await shot(`${id}-2-packages`);
      check(`CV-${id}-2`, "home → packages by a visible link; the trial sticker is on Essential; a way forward exists", atPk && sticker && s2.forward > 0, s2);

      // 3 Packages → sign-up from the Essential card
      const cardCta = await ev(`(()=>{const s=document.querySelector('[data-trial-sticker]');const card=s&&s.closest('li,article,div.stage');const a=card&&card.querySelector('a[href$="/signup"]');if(!a)return null;a.setAttribute('data-cv','essential');return a.innerText.trim()})()`);
      await click(`a[data-cv="essential"]`);
      const atSu = await waitFor(`location.pathname==='/${locale}/signup'`);
      await sleep(900);
      const s3 = await step("signup", { from: cardCta });
      check(`CV-${id}-3`, "packages → sign-up from the Essential card's own control", Boolean(cardCta) && atSu, s3);

      // 4 Sign-up: filled (and, in the stub, submitted)
      const unique = `cv.${Date.now()}@example.invalid`;
      await setVal(`[data-signup-form] input[name=name]`, "Ana Prueba");
      await setVal(`[data-signup-form] input[name=agency_name]`, "Inmobiliaria Prueba");
      await setVal(`[data-signup-form] input[name=email]`, unique);
      await setVal(`[data-signup-form] input[name=password]`, "una-contraseña-larga");
      await shot(`${id}-4-signup-filled`);
      if (STAGING) {
        const submit = await ev(`!!document.querySelector('[data-signup-form] button[type=submit]')&&!document.querySelector('[data-signup-form] button[type=submit]').disabled`);
        check(`CV-${id}-4`, "staging: the filled sign-up form is ready to send (not sent: no account, no e-mail)", submit && !posts.includes("/api/bff/signup"), { submit, posts });
      } else {
        await click(`[data-signup-form] button[type=submit]`);
        const reg = await waitFor(`!!document.querySelector('[data-register]')`, 15000);
        const s4 = await step("register", { register: reg });
        await shot(`${id}-5-register`);
        check(`CV-${id}-4`, "sign-up → the agency step (stub: the confirmation click is simulated) with a way forward", reg && s4.forward > 0, s4);
        // 5 Agency step → onboarding
        await click(`[data-register] button[type=submit]`);
        const setup = await waitFor(`!!document.querySelector('[data-onboarding-setup]')`, 15000);
        await sleep(600);
        const s5 = await step("onboarding", { setup });
        await shot(`${id}-6-onboarding`);
        check(`CV-${id}-5`, "agency step → onboarding with the setup and a way to continue", setup && s5.path === `/${locale}/onboarding`, s5);
        await ev(`fetch('/api/bff/auth/logout',{method:'POST'}).then(r=>r.status)`);
      }

      // 6 Confirmation landing: the link in the e-mail returns to the login with the hint
      await nav(`${BASE}/${locale}/login?confirmed=1`);
      const hint = await ev(`!!document.querySelector('[data-confirmed-hint]')`);
      const s6 = await step("confirmed", { hint });
      await shot(`${id}-7-confirmed`);
      check(`CV-${id}-6`, "the confirmation landing says the account is confirmed and offers the login", hint && (await ev(`!!document.querySelector('[data-login-form] button[type=submit]')`)), s6);

      // 7 An expired confirmation link is not a dead end
      await nav(`${BASE}/${locale}#error=access_denied&error_code=otp_expired`);
      await waitFor(`location.pathname==='/${locale}/welcome'`, 8000);
      await sleep(600);
      const exp = await ev(`({state:document.querySelector('[data-welcome-state]')?.getAttribute('data-welcome-state')??null,links:[...document.querySelectorAll('main a[href]')].map(a=>a.getAttribute('href'))})`);
      const s7 = await step("expired", exp);
      await shot(`${id}-8-expired`);
      check(`CV-${id}-7`, "an expired link says so and leads on (login or sign-up), never a dead end", exp.state === "expired" && exp.links.some((l) => /\/(login|signup)/.test(l)), s7);
    }
  }
  ws.close();
} catch (e) {
  check("CV-00", "the run completed", false, String(e?.stack ?? e));
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
  results.finished_utc = new Date().toISOString();
  const pass = results.checks.filter((c) => c.pass).length;
  results.pass = pass; results.total = results.checks.length;
  writeFileSync(join(OUT, "conversion-results.json"), JSON.stringify(results, null, 1));
  console.log(`${pass} passed, ${results.total - pass} failed -> ${join(OUT, "conversion-results.json")}`);
  process.exit(pass === results.total ? 0 : 1);
}
