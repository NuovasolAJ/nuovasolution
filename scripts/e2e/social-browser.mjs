// Browser run of the four social screens (owner order 2026-09-29 D, SOCIAL_UI_SPEC_v1 §6 points 1, 3 and 8).
// Two modes:
//   local stub   node scripts/e2e/social-browser.mjs
//                starts `next start` on a stub build, signs in with the stub session and captures
//                every screen in both fixtures (all states, and the fresh workspace).
//   staging      BASE=https://<staging preview> node scripts/e2e/social-browser.mjs
//                signs in through the login form as the reviewer tenant's user. E-mail and password
//                are read from the secure store for that one form; they are never printed or written.
// Read only: no connect, no publish, no poll, no reply is sent, and no provider is called.
// Writes <OUT>/social-results.json and screenshots. Exit code 1 if any check fails.
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const STAGING = Boolean(process.env.BASE);
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "evidence_2026-09-29", STAGING ? "social_staging" : "social_stub");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3121, CDP_PORT = 9356;
const BASE = (process.env.BASE ?? `http://localhost:${PORT}`).replace(/\/$/, "");
const CRED_FILE = process.env.SOCIAL_USER_FILE ?? "C:/Users/Usuario/.nuova-secrets/stg_meta_reviewer_owner.txt";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

let email = "", password = "";
if (STAGING) {
  const lines = readFileSync(CRED_FILE, "utf8").split(/\r?\n/).map((l) => l.trim().replace(/^[A-Za-z_ -]{2,24}\s*[:=]\s*/, "")).filter(Boolean);
  email = lines.find((l) => /^[^\s@]+@[^\s@]+$/.test(l)) ?? "";
  password = lines.find((l) => l !== email) ?? "";
  if (!email || !password) { console.log("the credential file could not be read"); process.exit(1); }
}
const scrub = (s) => { let t = String(s); for (const x of [password, email]) if (x) t = t.split(x).join("[hidden]"); return t; };

const results = { started_utc: new Date().toISOString(), base: BASE, mode: STAGING ? "staging, reviewer tenant user, read only" : "stub build, local", commit: process.env.E2E_COMMIT ?? null, deployment: process.env.E2E_DEPLOYMENT ?? null, checks: [], pages: [], screens: [] };
const check = (id, what, pass, evidence) => {
  results.checks.push({ id, what, pass: Boolean(pass), evidence });
  console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what}`);
};

const SCREENS = [["connect", "/social"], ["post", "/social/post"], ["inbox", "/social/inbox"], ["settings", "/social/settings"]];
const VIEWS = { d1440: [1440, 900, false, 1], t768: [768, 1024, false, 1], m390: [390, 844, true, 2], m360: [360, 780, true, 2] };

const kids = [];
try {
  if (!STAGING) {
    const p = spawn(process.execPath, [NEXT, "start", "-p", String(PORT)], { cwd: ROOT, env: process.env, stdio: ["ignore", "pipe", "pipe"] });
    p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p);
    for (let i = 0; i < 120; i++) { try { const r = await fetch(`${BASE}/en`, { redirect: "manual" }); if (r.status) break; } catch { /* not up */ } await sleep(500); }
  }

  // Without a session: the page sends the visitor to the login, the read route answers 401.
  const anonPage = await fetch(`${BASE}/en/social`, { redirect: "manual" });
  const anonApi = await fetch(`${BASE}/api/bff/social/state?screen=connect`, { redirect: "manual" });
  check("SO-01", "without a session /en/social leads to the login and the read route answers 401", [302, 303, 307, 308].includes(anonPage.status) && /\/en\/login/.test(anonPage.headers.get("location") ?? "") && anonApi.status === 401, { page: anonPage.status, location: anonPage.headers.get("location"), api: anonApi.status });
  const robots = anonPage.headers.get("x-robots-tag");
  check("SO-02", "the social routes are served noindex", /noindex/.test(robots ?? ""), { x_robots_tag: robots });

  const prof = join(tmpdir(), `nuova-social-${Date.now()}`);
  kids.push(spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP_PORT}`, "about:blank"], { stdio: "ignore" }));
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  const requests = new Map();
  const finished = [];
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); return; }
    if (m.method === "Network.requestWillBeSent") requests.set(m.params.requestId, { url: m.params.request.url, method: m.params.request.method });
    if (m.method === "Network.loadingFinished") finished.push(m.params.requestId);
  });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const waitFor = async (x, ms = 20000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await ev(x)) return true; await sleep(300); } return false; };
  const nav = async (url, ms = 2200) => { await send("Page.navigate", { url }); await sleep(ms); };
  const view = (k) => { const [w, h, mobile, dpr] = VIEWS[k]; return send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: dpr, mobile }); };
  const shot = async (name) => {
    const m = await ev(`({h:document.documentElement.scrollHeight,w:innerWidth})`);
    const s = await send("Page.captureScreenshot", { format: "jpeg", quality: 80, captureBeyondViewport: true, clip: { x: 0, y: 0, width: m.w, height: Math.min(m.h, 6000), scale: 1 } });
    if (s.result?.data) writeFileSync(join(OUT, `${name}.jpg`), Buffer.from(s.result.data, "base64"));
    results.screens.push(`${name}.jpg`);
  };
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");

  // ---- sign in ----
  await view("d1440");
  if (STAGING) {
    await nav(`${BASE}/en/login`, 3000);
    const setVal = (sel, v) => ev(`(()=>{const e=document.querySelector(${JSON.stringify(sel)});if(!e)return false;Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(e,${JSON.stringify(v)});e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));return true})()`);
    await setVal("[data-login-form] input[name=email]", email);
    await setVal("[data-login-form] input[name=password]", password);
    await ev(`document.querySelector('[data-login-form] button[type=submit]').click()`);
    const inside = await waitFor(`location.pathname==='/en/onboarding'`, 30000);
    check("SO-03", "the reviewer tenant's user signs in through the login form", inside, { landed: await ev("location.pathname") });
  } else {
    await nav(`${BASE}/api/bff/auth/login?stub=1&next=/en/social`, 2500);
    check("SO-03", "the stub session opens the social screens", (await ev("location.pathname")) === "/en/social", { landed: await ev("location.pathname") });
  }

  const MEASURE = `(()=>{
    const q=(s)=>document.querySelector(s);
    const vw=innerWidth;
    const out=[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>vw+1||r.left<-1)&&getComputedStyle(e).position!=='fixed'&&!e.closest('[data-social-nav]')}).slice(0,5).map(e=>e.tagName+':'+(e.innerText||'').slice(0,40));
    return {
      path: location.pathname+location.search,
      h1: document.querySelectorAll('h1').length, h1text: q('h1')?.innerText ?? null,
      sw: document.documentElement.scrollWidth, vw, outside: out,
      source: q('[data-social-screen]')?.getAttribute('data-social-source') ?? null,
      screen: q('[data-social-screen]')?.getAttribute('data-social-screen') ?? null,
      problem: q('[data-social-problem]')?.getAttribute('data-social-problem') ?? null,
      connect: q('[data-connect-state]')?.getAttribute('data-connect-state') ?? null,
      listings: document.querySelectorAll('[data-listing-ready]').length,
      blocked: [...document.querySelectorAll('[data-listing-blocked]')].map(e=>e.innerText.replace(/\\s+/g,' ').trim()),
      posts: [...document.querySelectorAll('[data-post-state]')].map(e=>e.getAttribute('data-post-state')),
      signals: [...document.querySelectorAll('[data-signal-state]')].map(e=>e.getAttribute('data-signal-state')),
      empty: [...document.querySelectorAll('[data-empty]')].map(e=>e.getAttribute('data-empty')+': '+e.innerText.trim()),
      inert: document.querySelectorAll('[data-social-inert]').length,
      unclearControls: [...document.querySelectorAll('[data-post-state=delivery_unknown] button, [data-post-state=delivery_unknown] a')].map(e=>e.innerText.trim()),
      enabledActions: [...document.querySelectorAll('[data-social-screen] button:not([disabled])')].length,
      newMessageField: !!document.querySelector('[data-social-screen] textarea:not([disabled])'),
      current: q('[data-social-nav] [aria-current=page]')?.innerText ?? null,
      small: [...document.querySelectorAll('[data-social-screen] a, [data-social-screen] button, [data-social-nav] a')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height<43.5}).map(e=>(e.innerText||'').slice(0,30)+':'+Math.round(e.getBoundingClientRect().height)),
      text: q('[data-social-screen]')?.innerText ?? ''
    };
  })()`;

  const cases = STAGING ? [""] : ["", "empty"];
  const seen = {};
  for (const locale of ["en", "es"]) {
    for (const vk of Object.keys(VIEWS)) {
      await view(vk);
      for (const c of cases) {
        for (const [key, path] of SCREENS) {
          const tabs = key === "inbox" ? ["", "messages"] : [""];
          for (const tab of tabs) {
            const qs = [c ? `case=${c}` : "", tab ? `tab=${tab}` : ""].filter(Boolean).join("&");
            await nav(`${BASE}/${locale}${path}${qs ? `?${qs}` : ""}`, STAGING ? 2600 : 1200);
            const m = await ev(MEASURE);
            const name = `${vk}-${locale}-social-${key}${tab ? "-" + tab : ""}${c ? "-" + c : ""}`;
            await shot(name);
            const ok = m.h1 === 1 && m.sw <= m.vw && m.outside.length === 0 && m.screen === key && m.source === (STAGING ? "backend" : "stub") && !m.problem && m.enabledActions === 0 && !m.newMessageField && m.small.length === 0;
            const { text, ...rest } = m;
            results.pages.push({ name, ok, ...rest });
            seen[`${locale}:${vk}:${c}:${key}:${tab}`] = m;
            if (!ok) console.log(`  finding on ${name}: ${JSON.stringify({ h1: m.h1, sw: m.sw, vw: m.vw, outside: m.outside, source: m.source, problem: m.problem, enabled: m.enabledActions, small: m.small })}`);
          }
        }
      }
    }
  }
  const bad = results.pages.filter((p) => !p.ok).map((p) => p.name);
  check("SO-04", `every screen renders from the ${STAGING ? "backend" : "stub"} state with one h1, no horizontal overflow (1440, 768, 390, 360), 44 px controls, EN and ES`, bad.length === 0, { pages: results.pages.length, findings: bad });
  check("SO-05", "no screen offers an enabled action while the read state carries no release (stub: demonstration data), and none has a field for a first message", results.pages.every((p) => p.enabledActions === 0 && !p.newMessageField), { inert_controls_seen: results.pages.reduce((n, p) => n + p.inert, 0) });

  const g = (locale, key, c = "", tab = "") => seen[`${locale}:d1440:${c}:${key}:${tab}`];
  if (STAGING) {
    const a = g("en", "connect"), b = g("en", "post"), ci = g("en", "inbox"), cm = g("en", "inbox", "", "messages"), dset = g("en", "settings"), bes = g("es", "post");
    check("SO-06", "screen A: publishing is enabled for the reviewer tenant, no account is connected, the connect control is not active", a.connect === "disconnected" && /No Instagram account connected\./.test(a.text) && a.inert === 1, { state: a.connect, inert: a.inert });
    check("SO-07", "screen B: the listing without documented image rights is refused visibly, the others can be published", b.listings >= 4 && b.blocked.length === 1 && /image rights for this listing are not documented/.test(b.blocked[0]) && bes.blocked.length === 1 && /derechos de imagen/.test(bes.blocked[0]), { listings: b.listings, blocked_en: b.blocked, blocked_es: bes.blocked, posts: b.posts, empty: b.empty });
    check("SO-08", "screen C: the empty inbox says so for comments and for messages", ci.empty.some((x) => /No comments yet\./.test(x)) && cm.empty.some((x) => /No messages yet\./.test(x)), { comments: ci.empty, messages: cm.empty });
    check("SO-09", "screen D: no connection to disconnect, and the deletion page is linked", /No Instagram account connected\./.test(dset.text) && /How to request deletion/.test(dset.text), { connected: false });
  } else {
    const a = g("en", "connect"), ae = g("en", "connect", "empty"), b = g("en", "post"), ci = g("en", "inbox"), cm = g("en", "inbox", "", "messages"), ce = g("en", "inbox", "empty");
    check("SO-06", "screen A: connected account in the full fixture, 'no account connected' in the fresh one", a.connect === "connected" && ae.connect === "disconnected", { full: a.connect, fresh: ae.connect });
    check("SO-07", "screen B: both refusal reasons are shown in words, and the posts show published, queued and unclear", b.blocked.length === 2 && b.blocked.some((x) => /image rights/.test(x)) && b.blocked.some((x) => /older than 168 hours/.test(x)) && ["published", "queued", "delivery_unknown"].every((s) => b.posts.includes(s)), { blocked: b.blocked, posts: b.posts });
    check("SO-08", "screen C: answerable, answered and expired states, and the empty state", ci.signals.includes("answerable") && ci.signals.includes("answered") && cm.signals.includes("dm_window") && ce.empty.some((x) => /No comments yet\./.test(x)), { comments: ci.signals, messages: cm.signals, fresh: ce.empty });
    check("SO-09", "after an unclear outcome only the status check is offered, never a second publish", b.unclearControls.length === 1 && b.unclearControls[0] === "Check status", { controls: b.unclearControls });
  }

  // ---- what the browser received ----
  await view("d1440");
  await nav(`${BASE}/en/social/post`, 2200);
  const api = await ev(`fetch('/api/bff/social/state?screen=post',{cache:'no-store'}).then(async r=>({status:r.status,body:await r.text()}))`);
  let apiKeys = [];
  try { apiKeys = Object.keys(JSON.parse(api.body).details ?? {}); } catch { /* reported below */ }
  const FORBIDDEN = ["client_id", "credential_ref", "external_account_id", "property_id", "export_id", "signal_id", "stg_meta_review", "Property Matching columns", "rights_basis", "service_role"];
  const hit = (body) => FORBIDDEN.filter((f) => body.includes(f));
  const apiHits = hit(api.body);
  check("SO-10", "the read route answers with the reduced state only: no tenant id, no credential, no provider or internal id", api.status === 200 && apiHits.length === 0 && apiKeys.includes("listings"), { status: api.status, keys: apiKeys, forbidden_found: apiHits });

  let searched = 0;
  const found = {};
  for (const id of [...new Set(finished)]) {
    const u = requests.get(id)?.url ?? "";
    if (!u.startsWith(BASE)) continue;
    const r = await send("Network.getResponseBody", { requestId: id });
    const raw = r.result?.body;
    if (typeof raw !== "string") continue;
    const body = r.result.base64Encoded ? Buffer.from(raw, "base64").toString("latin1") : raw;
    searched += 1;
    const isSocial = /\/social|\/api\/bff\/social/.test(u);
    for (const f of isSocial ? hit(body) : []) found[f] = (found[f] ?? 0) + 1;
    if (password && body.includes(password)) found.password = (found.password ?? 0) + 1;
  }
  const cookies = (await send("Network.getAllCookies")).result?.cookies ?? [];
  const session = cookies.find((c) => c.name === "nuova_session");
  // The stub session's value is the word "stub"; only a real token is searched for.
  const tokenInPage = session && session.value.length > 20 ? await ev(`document.documentElement.outerHTML.includes(${JSON.stringify(session.value)})`) : false;
  const direct = [...requests.values()].filter((r) => /supabase\.co|instagram\.com|facebook\.com|graph\./.test(r.url));
  check("SO-11", "no response body of a social page carries a tenant id, a credential or an internal id; the session token is not in the page", searched > 10 && Object.keys(found).length === 0 && !tokenInPage, { bodies_searched: searched, found, token_in_page: tokenInPage });
  check("SO-12", "the session cookie is httpOnly; the browser called neither the backend nor a provider directly", Boolean(session?.httpOnly) && direct.length === 0, { httpOnly: session?.httpOnly ?? null, secure: session?.secure ?? null, direct_calls: direct.length });

  // ---- keyboard: the section navigation is reachable and says where you are ----
  await nav(`${BASE}/en/social`, 2200);
  await ev(`document.querySelector('[data-social-nav] a')?.focus()`);
  for (let i = 0; i < 2; i++) { await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 }); await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 }); }
  const focused = await ev(`document.activeElement?.innerText`);
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, text: "\r" });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
  const moved = await waitFor(`location.pathname==='/en/social/inbox'`, 8000);
  const top = await ev("Math.round(scrollY)");
  check("SO-13", "keyboard: Tab reaches the sections, Enter opens one, the new page starts at the top", focused === "Inbox" && moved && top === 0, { focused, moved, scrollY: top });

  // ---- sign out again ----
  const out = await ev(`fetch('/api/bff/auth/logout',{method:'POST'}).then(r=>r.status)`);
  await nav(`${BASE}/en/social`, 2500);
  check("SO-14", "after logout the social screens lead to the login again", out === 200 && (await ev("location.pathname")) === "/en/login", { logout: out, landed: await ev("location.pathname") });
  ws.close();
} catch (e) {
  check("SO-00", "the run completed", false, scrub(e?.stack ?? e));
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
  results.finished_utc = new Date().toISOString();
  const pass = results.checks.filter((c) => c.pass).length;
  results.pass = pass; results.total = results.checks.length;
  writeFileSync(join(OUT, "social-results.json"), scrub(JSON.stringify(results, null, 1)));
  console.log(`${pass} passed, ${results.total - pass} failed -> ${join(OUT, "social-results.json")}`);
  process.exit(pass === results.total ? 0 : 1);
}
