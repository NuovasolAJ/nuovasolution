// Form states in a real browser (owner order 2026-09-29 E: form errors, loading states, long texts), EN and ES
// at 390 and 360 px, on a local build (default) or a deployed origin (BASE=https://…):
//   sign-up   empty submit → every field says what is missing, focus lands on the first one, nothing is sent
//             wrong e-mail and short password → their own sentences · very long values → no overflow
//             a reload keeps name, agency and e-mail, never the password
//   login     empty submit → one sentence, nothing sent · "forgot your password" says what is possible today
//             staging only: an address that has no account → the sentence for a wrong login, the button busy
//             while the request runs, the e-mail kept. No account is created and nothing is sent to anyone.
// Writes form-states-results.json and screenshots. Exit 1 on any failure.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "evidence_2026-09-29", "form_states");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3129, CDP_PORT = 9372;
const BASE = (process.env.BASE ?? `http://localhost:${PORT}`).replace(/\/$/, "");
const REAL_LOGIN = process.env.REAL_LOGIN === "1"; // staging: the identity server answers
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const results = { started_utc: new Date().toISOString(), base: BASE, real_login: REAL_LOGIN, commit: process.env.E2E_COMMIT ?? null, deployment: process.env.E2E_DEPLOYMENT ?? null, checks: [] };
const check = (id, what, pass, evidence) => { results.checks.push({ id, what, pass: Boolean(pass), evidence }); console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what}`); };
const kids = [];
try {
  if (!process.env.BASE) {
    const p = spawn(process.execPath, [NEXT, "start", "-p", String(PORT)], { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
    p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p);
    for (let i = 0; i < 120; i++) { try { const r = await fetch(`${BASE}/en`, { redirect: "manual" }); if (r.status) break; } catch { /* not up */ } await sleep(500); }
  }
  const prof = join(tmpdir(), `nuova-forms-${Date.now()}`);
  kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" }));
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  let posts = [];
  let paused = []; // login requests held by the Fetch domain (FS-06 to FS-09)
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); return; }
    if (m.method === "Network.requestWillBeSent" && m.params.request.method === "POST") posts.push(new URL(m.params.request.url).pathname);
    if (m.method === "Fetch.requestPaused") paused.push(m.params);
  });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const waitFor = async (x, ms = 15000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await ev(x)) return true; await sleep(200); } return false; };
  const nav = async (url) => { posts = []; await send("Page.navigate", { url }); await sleep(process.env.BASE ? 3000 : 1800); };
  const shot = async (name) => { const s = await send("Page.captureScreenshot", { format: "jpeg", quality: 80 }); if (s.result?.data) writeFileSync(join(OUT, `${name}.jpg`), Buffer.from(s.result.data, "base64")); };
  const setVal = (sel, v) => ev(`(()=>{const e=document.querySelector(${JSON.stringify(sel)});if(!e)return false;Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(e,${JSON.stringify(v)});e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));return true})()`);
  const overflow = () => ev(`({sw:document.documentElement.scrollWidth,iw:innerWidth})`);
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");

  const T = {
    en: { required: /We need this one/, email: /does not look right/, pw: /at least 10 characters/, loginRequired: /We need this one to log you in/, wrong: /do not match an account/, forgot: /Password reset is not available yet/, running: /^Logging you in…$/, leaving: /Opening your agency…/, timeout: /took too long/, connection: /could not reach the server/ },
    es: { required: /./, email: /./, pw: /10/, loginRequired: /./, wrong: /no coinciden/, forgot: /./, running: /^Iniciando sesión…$/, leaving: /Abriendo tu agencia…/, timeout: /tardado demasiado/, connection: /No hemos podido conectar/ },
  };
  // The running state of the login button (owner finding 2026-10-01), read in one go.
  const loginState = () => ev(`(()=>{const b=document.querySelector('${"[data-login-form]"} button[type=submit]');return {disabled:b.disabled,busy:b.getAttribute('aria-busy'),label:b.innerText.trim(),ring:!!b.querySelector('[data-busy-ring]'),status:document.querySelector('[data-login-form] [data-form-status]')?.textContent??null,state:document.querySelector('[data-login-form]')?.getAttribute('data-login-state'),alert:document.querySelector('[data-login-form] [role=alert]')?.innerText??null,email:document.querySelector('[data-login-form] input[name=email]').value,path:location.pathname}})()`);
  const pressEnter = async () => {
    await ev(`document.querySelector('[data-login-form] input[name=password]').focus()`);
    await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, text: "\r" });
    await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
  };
  const holdLogin = async () => { paused = []; await send("Fetch.enable", { patterns: [{ urlPattern: "*/api/bff/auth/login", requestStage: "Request" }] }); };
  const releaseLogin = async () => { await send("Fetch.disable"); paused = []; };
  const freshLogin = async (locale) => { await send("Network.clearBrowserCookies"); await nav(`${BASE}/${locale}/login`); await setVal("[data-login-form] input[name=email]", "owner@example.invalid"); await setVal("[data-login-form] input[name=password]", "a-password-of-ten-or-more"); };
  const S = "[data-signup-form]", L = "[data-login-form]";
  const fieldState = () => ev(`(()=>{const f=document.querySelector('${S}');return ['name','agency_name','email','password'].map(n=>{const i=f.elements.namedItem(n);const d=i.getAttribute('aria-describedby');const t=d?document.getElementById(d):null;return {n,invalid:i.getAttribute('aria-invalid'),text:t&&/-err$/.test(d)?t.innerText:null}})})()`);

  for (const locale of ["en", "es"]) {
    for (const [tag, w, h] of [["m390", 390, 844], ["m360", 360, 780]]) {
      const id = `${tag}-${locale}`;
      await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile: true });
      await ev(`(()=>{try{sessionStorage.clear()}catch{}})()`);
      await nav(`${BASE}/${locale}/signup`);
      await ev(`(()=>{try{sessionStorage.clear()}catch{}})()`);

      // empty submit
      await ev(`document.querySelector('${S} button[type=submit]').click()`);
      await sleep(400);
      const empty = await fieldState();
      const focused = await ev(`document.activeElement?.getAttribute('name')`);
      const o1 = await overflow();
      await shot(`${id}-signup-empty`);
      check(`FS-${id}-01`, "sign-up, empty: every field is marked and says what is missing, focus is on the first one, nothing is sent", empty.every((f) => f.invalid === "true" && f.text && T[locale].required.test(f.text) || (f.n === "password" && f.invalid === "true" && T[locale].pw.test(f.text ?? ""))) && focused === "name" && !posts.includes("/api/bff/signup") && o1.sw <= o1.iw, { fields: empty, focused, posts, overflow: o1 });

      // wrong e-mail, short password, very long name and agency
      const long = "Inmobiliaria".repeat(14); // 168 characters without a space
      await setVal(`${S} input[name=name]`, "María-José de la Santísima Trinidad Fernández-Villaverde y Ruiz de Alarcón");
      await setVal(`${S} input[name=agency_name]`, long);
      await setVal(`${S} input[name=email]`, "not-an-address");
      await setVal(`${S} input[name=password]`, "short");
      await ev(`document.querySelector('${S} button[type=submit]').click()`);
      await sleep(400);
      const wrong = await fieldState();
      const o2 = await overflow();
      const f2 = await ev(`document.activeElement?.getAttribute('name')`);
      await shot(`${id}-signup-invalid`);
      const byName = Object.fromEntries(wrong.map((f) => [f.n, f]));
      check(`FS-${id}-02`, "sign-up, wrong e-mail and short password: each has its own sentence, the filled fields are clean, long values do not widen the page", byName.name.invalid === "false" && byName.agency_name.invalid === "false" && T[locale].email.test(byName.email.text ?? "") && T[locale].pw.test(byName.password.text ?? "") && byName.email.text !== byName.password.text && f2 === "email" && !posts.includes("/api/bff/signup") && o2.sw <= o2.iw, { fields: wrong, focused: f2, overflow: o2 });

      // a reload keeps what was typed, except the password
      await nav(`${BASE}/${locale}/signup`);
      const kept = await ev(`(()=>{const f=document.querySelector('${S}');return {name:f.elements.namedItem('name').value.length,agency:f.elements.namedItem('agency_name').value.length,email:f.elements.namedItem('email').value,password:f.elements.namedItem('password').value.length}})()`);
      check(`FS-${id}-03`, "sign-up: a reload keeps name, agency and e-mail, and never the password", kept.name > 10 && kept.agency === long.length && kept.email === "not-an-address" && kept.password === 0, kept);
      await ev(`(()=>{try{sessionStorage.clear()}catch{}})()`);

      // login: empty
      await nav(`${BASE}/${locale}/login`);
      await ev(`document.querySelector('${L} button[type=submit]').click()`);
      await sleep(400);
      const le = await ev(`document.querySelector('${L} [role=alert]')?.innerText??null`);
      await ev(`[...document.querySelectorAll('${L} button[type=button]')][0]?.click()`);
      await sleep(300);
      const fg = await ev(`document.querySelector('${L} [role=status]')?.innerText??null`);
      const o3 = await overflow();
      await shot(`${id}-login-empty`);
      check(`FS-${id}-04`, "login, empty: one sentence, nothing sent; 'forgot your password' says what is possible today", Boolean(le) && T[locale].loginRequired.test(le) && !posts.includes("/api/bff/auth/login") && Boolean(fg) && T[locale].forgot.test(fg) && o3.sw <= o3.iw, { alert: le, forgot: fg, posts, overflow: o3 });

      // login running state (owner finding 2026-10-01): the request is held by the browser's own Fetch domain,
      // so the waiting state is observable and no server, stub or real, is needed for these four cases.
      if (tag === "m390") {
        const fulfil = (p, body) => send("Fetch.fulfillRequest", { requestId: p.requestId, responseCode: 200, responseHeaders: [{ name: "Content-Type", value: "application/json" }], body: Buffer.from(JSON.stringify(body)).toString("base64") });

        // FS-06: two clicks and Enter send one request; the button waits, says so, and stays blocked until the next page
        await freshLogin(locale);
        await holdLogin();
        await ev(`document.querySelector('${L} button[type=submit]').click()`);
        await ev(`document.querySelector('${L} button[type=submit]').click()`);
        await pressEnter();
        await sleep(500);
        const held = await loginState();
        const heldCount = paused.length;
        await shot(`${id}-login-running`);
        let reenabled = false, left = false, sawLeaving = false;
        // A marker on this document: once it is gone, the browser has replaced the page (wherever it went).
        await ev(`window.__fsMark = 1`);
        // Stub: let the real stub answer (it sets the session cookie, so the next page opens). Staging: a faked
        // success, so no real credentials are needed; the next page then sends the visitor back, which is still a replacement.
        if (heldCount) { if (REAL_LOGIN) await fulfil(paused[0], { ok: true, code: "ok", message: "ok" }); else await send("Fetch.continueRequest", { requestId: paused[0].requestId }); }
        for (let i = 0; i < 200; i++) {
          const s = await ev(`window.__fsMark === 1 ? (${`(()=>{const b=document.querySelector('[data-login-form] button[type=submit]');return b?{disabled:b.disabled,busy:b.getAttribute('aria-busy'),status:document.querySelector('[data-login-form] [data-form-status]')?.textContent??null}:null})()`}) : null`).catch(() => null);
          if (!s) { left = true; break; }
          if (T[locale].leaving.test(s.status ?? "")) sawLeaving = true;
          if (!s.disabled || s.busy !== "true") { reenabled = true; break; }
          await sleep(40);
        }
        await releaseLogin();
        check(`FS-${id}-06`, "login: two clicks and Enter send one request; the button is disabled, marked busy, shows the ring and says it is logging in; it stays blocked until the next page replaces this one", heldCount === 1 && held.disabled && held.busy === "true" && held.ring && T[locale].running.test(held.label) && T[locale].running.test(held.status ?? "") && held.state === "busy" && left && !reenabled, { heldCount, held, left, reenabled, sawLeaving });

        // FS-07: a wrong login frees the button with its sentence; the address stays; a second attempt is possible
        await freshLogin(locale);
        await holdLogin();
        await pressEnter();
        for (let i = 0; i < 25 && !paused.length; i++) await sleep(100);
        if (paused.length) await fulfil(paused[0], { ok: false, code: "invalid_grant", message: "invalid_grant" });
        await waitFor(`!!document.querySelector('${L} [role=alert]')`, 5000);
        const wrong = await loginState();
        await ev(`document.querySelector('${L} button[type=submit]').click()`);
        for (let i = 0; i < 25 && paused.length < 2; i++) await sleep(100);
        const retried = paused.length;
        await shot(`${id}-login-wrong-held`);
        if (paused[1]) await send("Fetch.failRequest", { requestId: paused[1].requestId, errorReason: "ConnectionFailed" }).catch(() => {});
        await releaseLogin();
        check(`FS-${id}-07`, "login refused: the sentence for a wrong login, the button free and not busy, the address kept, and a second attempt sends a new request", T[locale].wrong.test(wrong.alert ?? "") && !wrong.disabled && wrong.busy !== "true" && wrong.email === "owner@example.invalid" && wrong.path === `/${locale}/login` && retried === 2, { wrong, retried });

        // FS-08: the server cannot be reached: a plain sentence, the button free again
        await freshLogin(locale);
        await holdLogin();
        await ev(`document.querySelector('${L} button[type=submit]').click()`);
        for (let i = 0; i < 25 && !paused.length; i++) await sleep(100);
        if (paused.length) await send("Fetch.failRequest", { requestId: paused[0].requestId, errorReason: "ConnectionFailed" });
        await waitFor(`!!document.querySelector('${L} [role=alert]')`, 5000);
        const down = await loginState();
        await shot(`${id}-login-unreachable`);
        await releaseLogin();
        check(`FS-${id}-08`, "login with the server unreachable: the connection sentence, the button free, nothing blocked", T[locale].connection.test(down.alert ?? "") && !down.disabled && down.busy !== "true" && down.path === `/${locale}/login`, down);

        // FS-09 (once): a request that never answers is given up after the form's own limit; the button is free again
        if (locale === "en") {
          await freshLogin(locale);
          await holdLogin();
          await ev(`document.querySelector('${L} button[type=submit]').click()`);
          const stillBusy = await waitFor(`document.querySelector('${L} button[type=submit]').disabled`, 2000);
          const gaveUp = await waitFor(`!!document.querySelector('${L} [role=alert]')`, 30000);
          const slow = await loginState();
          await shot(`${id}-login-timeout`);
          await releaseLogin();
          check(`FS-${id}-09`, "login with no answer at all: busy first, then the timeout sentence within the form's limit and the button free again", stillBusy && gaveUp && T[locale].timeout.test(slow.alert ?? "") && !slow.disabled && slow.busy !== "true", { stillBusy, gaveUp, slow });
        }
      }

      // login: an address without an account (staging only; the stub accepts any login by design)
      if (REAL_LOGIN && tag === "m390") {
        const addr = `nobody-${Date.now()}@example.invalid`;
        await setVal(`${L} input[name=email]`, addr);
        await setVal(`${L} input[name=password]`, "a-password-that-matches-nothing");
        // slow the connection so the waiting state is observable
        await send("Network.emulateNetworkConditions", { offline: false, latency: 600, downloadThroughput: 200000, uploadThroughput: 100000 });
        await ev(`document.querySelector('${L} button[type=submit]').click()`);
        const busy = await waitFor(`document.querySelector('${L} button[type=submit]').getAttribute('aria-busy')==='true'&&document.querySelector('${L} button[type=submit]').disabled`, 3000);
        const answered = await waitFor(`!!document.querySelector('${L} [role=alert]')&&document.querySelector('${L} button[type=submit]').getAttribute('aria-busy')!=='true'`, 25000);
        await send("Network.emulateNetworkConditions", { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
        const st = await ev(`({alert:document.querySelector('${L} [role=alert]')?.innerText??null,email:document.querySelector('${L} input[name=email]').value,path:location.pathname})`);
        await shot(`${id}-login-wrong`);
        check(`FS-${id}-05`, "login with an address that has no account: the button waits visibly, then the sentence for a wrong login; the address stays, the page stays", busy && answered && T[locale].wrong.test(st.alert ?? "") && st.email === addr && st.path === `/${locale}/login`, { busy, alert: st.alert, path: st.path });
      }
    }
  }
  ws.close();
} catch (e) {
  check("FS-00", "the run completed", false, String(e?.stack ?? e));
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
  results.finished_utc = new Date().toISOString();
  const pass = results.checks.filter((c) => c.pass).length;
  results.pass = pass; results.total = results.checks.length;
  writeFileSync(join(OUT, "form-states-results.json"), JSON.stringify(results, null, 1));
  console.log(`${pass} passed, ${results.total - pass} failed -> ${join(OUT, "form-states-results.json")}`);
  process.exit(pass === results.total ? 0 : 1);
}
