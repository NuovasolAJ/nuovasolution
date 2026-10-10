// Checks of the master order (2026-10-10 §12) on a deployed origin, in headless Edge. One JSON with every check:
//   depth / panel / cover   the hero's layers move apart, the panel comes upright, the floating cards cover no words
//   header                  the navigation stands on the sky at the top and is the light bar after scrolling
//   story                   the six chapters A to F are in the document and readable without a click
//   channels                the channel selector works by mouse and by arrow keys; the whole scene changes with it
//   task                    Jarvis: take and done by keyboard, the record line appears
//   notice                  the AI notice can be opened on every channel
//   model3d / packages      the 3D section and the ladder are there; no proof-state label on the public page
//   reduced                 with reduced motion nothing moves and everything is visible
//   nojs                    without JavaScript the hero's picture and all six chapters stand
//   faq                     questions open one at a time, no count under a category, no row id in the text
//   login-gate              /app without a session goes to the login with next=; the login returns there (stub session)
//   session-header          with a session the header shows the account link and log out; log out works and says so
//   reports                 the weekly report renders its counts (stub) and the email preview has the button
//   social-b                Screen B shows the reason sentence, the cover frame and the draft control
// Usage: BASE=https://… OUT=<folder> node scripts/design/master-check.mjs
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = (process.env.BASE ?? "").replace(/\/$/, "");
if (!BASE) throw new Error("BASE=https://… is required");
const OUT = process.env.OUT ?? join(process.cwd(), "docs", "website_redesign", "evidence_2026-10-10", "checks");
const EDGE = process.env.EDGE ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const PORT = 9371 + Math.floor(Math.random() * 20);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

const results = { started_utc: new Date().toISOString(), base: BASE, checks: [] };
const check = (id, what, ok, evidence) => { results.checks.push({ id, what, ok: !!ok, evidence }); console.log(`${ok ? "PASS" : "FAIL"} ${id} ${what}`); };

const edge = spawn(EDGE, ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", `--user-data-dir=${join(tmpdir(), "nuova-master-" + Date.now())}`, `--remote-debugging-port=${PORT}`, "about:blank"], { stdio: "ignore" });
try {
  let list;
  for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json(); break; } catch { await sleep(400); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener("open", res));
  let mid = 0;
  const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise((res) => { const i = ++mid; pend.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const key = async (k, code, vk) => { const text = k === "Enter" ? "\r" : k.length === 1 ? k : undefined; await send("Input.dispatchKeyEvent", { type: "keyDown", key: k, code, windowsVirtualKeyCode: vk, text }); await send("Input.dispatchKeyEvent", { type: "keyUp", key: k, code, windowsVirtualKeyCode: vk }); };
  const nav = async (path, ms = 4500) => { await send("Page.navigate", { url: `${BASE}${path}` }); await sleep(ms); };
  const shot = async (name) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(OUT, name), Buffer.from(s.result.data, "base64")); };
  await send("Page.enable"); await send("Runtime.enable"); await send("DOM.enable"); await send("Network.enable");

  const LAYERS = `JSON.stringify(Object.fromEntries([["far","[data-depth-layer=far]"],["mid","[data-depth-layer=mid]"],["front","[data-depth-layer=front]"],["panel",".hero-panel"]].map(([k,s])=>[k,getComputedStyle(document.querySelector(s)).transform])))`;
  const ty = (m) => { const a = /matrix\(([^)]+)\)/.exec(m); if (a) return +a[1].split(",")[5]; const b = /matrix3d\(([^)]+)\)/.exec(m); return b ? +b[1].split(",")[13] : 0; };

  for (const [view, w, h, mobile, dpr] of [["d1440", 1440, 900, false, 1], ["m390", 390, 844, true, 2]]) {
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: dpr, mobile });
    await send("Emulation.setEmulatedMedia", { features: [] });
    await nav("/es", 7000);
    const top = JSON.parse(await ev(LAYERS));
    await ev("window.scrollTo(0, 420)"); await sleep(600);
    const down = JSON.parse(await ev(LAYERS));
    const d = { far: ty(down.far) - ty(top.far), mid: ty(down.mid) - ty(top.mid), front: ty(down.front) - ty(top.front) };
    check(`${view}-depth`, "far, mid and front move by different amounts on scroll (far > mid > 0 > front)", d.far > d.mid && d.mid > 0 && d.front < 0, { moved_px_after_420_scroll: d });
    check(`${view}-panel`, "the panel leans back at the top of the page and comes upright and larger after scrolling", top.panel !== down.panel && /matrix3d/.test(top.panel), { top: top.panel.slice(0, 90), down: down.panel.slice(0, 90) });
    // Nothing to read is under a floating card: a grid of points inside the headline, the buttons and the four
    // story parts of the panel is probed at five scroll positions; a hit on a card counts.
    const cover = JSON.parse(await ev(`(async()=>{
      const hero=document.querySelector('.hero-world'); const end=hero.getBoundingClientRect().bottom+scrollY-innerHeight*0.4; const out=[];
      for (const y of [0, end*0.25, end*0.5, end*0.75, end]) {
        window.scrollTo(0, Math.round(y)); await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
        const row={scroll:Math.round(y), hits:[]};
        for (const sel of ['#hero-h1','[data-hero-lead]','[data-hero-cta]','.hero-cta-second','[data-hero-enquiry]','[data-hero-reply]','[data-hero-crm]','[data-hero-task]']) {
          const r=document.querySelector(sel).getBoundingClientRect(); let n=0, seen=0;
          for (let i=0;i<=8;i++) for (let j=0;j<=5;j++) { const x=r.left+2+(r.width-4)*i/8, yy=r.top+2+(r.height-4)*j/5; if (yy<0||yy>innerHeight||x<0||x>innerWidth) continue; seen++; const e=document.elementFromPoint(x,yy); if (e && e.closest('.hero-float')) n++; }
          if (n>0) row.hits.push(sel+':'+n+'/'+seen);
        }
        out.push(row);
      }
      window.scrollTo(0, Math.round(hero.getBoundingClientRect().bottom+scrollY-innerHeight)); await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
      const control=[...document.querySelectorAll('.hero-float')].filter(f=>{const r=f.getBoundingClientRect(); const e=document.elementFromPoint(Math.min(innerWidth-4,Math.max(4,r.left+r.width*0.5)), Math.min(innerHeight-4, r.top+r.height*0.5)); return !!(e && e.closest('.hero-float'));}).length;
      window.scrollTo(0,0); return JSON.stringify({rows:out, control});
    })()`));
    check(`${view}-cover`, "no headline, button or story part of the panel is under a floating card, at five scroll positions (control: the probe does see the cards)", cover.control === 2 && cover.rows.every((r) => r.hits.length === 0), cover);
  }

  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await nav("/es", 4500);
  const hTop = await ev("getComputedStyle(document.querySelector('header')).backgroundColor");
  await ev("window.scrollTo(0, 300)"); await sleep(500);
  const hDown = await ev("getComputedStyle(document.querySelector('header')).backgroundColor");
  check("header", "the navigation has no bar at the top of the page and the light bar after scrolling", /rgba\(0, 0, 0, 0\)|transparent/.test(hTop) && /25[0-3], 25[0-2], 24[6-9]/.test(hDown), { top: hTop, scrolled: hDown });

  // the story: six chapters, readable in the scroll, no click needed
  const story = JSON.parse(await ev(`(async()=>{const ids=['story-a','story-b','story-c','story-d','story-e','story-f'];const out={};for(const id of ids){const el=document.getElementById(id);el.scrollIntoView();await new Promise(r=>setTimeout(r,500));const h=el.querySelector('h3');const stage=el.querySelector('[data-story-stage]');const laura=el.innerText.includes('Laura');out[id]={heading:h?h.innerText.slice(0,40):null,stage:!!stage&&stage.getBoundingClientRect().height>200,text:(stage?stage.innerText.length:0),laura}}window.scrollTo(0,0);return JSON.stringify(out)})()`));
  const ids = Object.keys(story);
  check("story", "the six chapters A to F stand in the document with a heading and a filled stage, and the same enquiry (Laura) runs through each of them", ids.length === 6 && ids.every((k) => story[k].heading && story[k].stage && story[k].text > 120 && story[k].laura), story);

  // channels: click and arrow keys; the whole scene changes
  await ev("document.getElementById('story-b').scrollIntoView(); window.scrollBy(0,-80)"); await sleep(600);
  const c0 = await ev("document.querySelector('[data-story]').dataset.storyChannel + '|' + document.querySelector('[data-channel-view]').innerText.slice(0,40)");
  await ev("document.querySelector('[data-channel-tab=phone]').click()"); await sleep(700);
  const c1 = JSON.parse(await ev("JSON.stringify({ch:document.querySelector('[data-story]').dataset.storyChannel, view:document.querySelector('[data-channel-view]').dataset.channelView, text:document.querySelector('[data-channel-view]').innerText, hasWhatsAppWords:/WhatsApp/.test(document.querySelector('[data-channel-view]').innerText), hasCall:/Llamada|llamar|llamada/.test(document.querySelector('[data-channel-view]').innerText)})"));
  await ev("document.querySelector('[data-channel-tab=phone]').focus()"); await key("ArrowLeft", "ArrowLeft", 37); await sleep(600);
  const c2 = await ev("document.querySelector('[data-story]').dataset.storyChannel + ' ' + document.activeElement.getAttribute('data-channel-tab')");
  await key("ArrowRight", "ArrowRight", 39); await key("ArrowRight", "ArrowRight", 39); await sleep(600);
  const c3 = await ev("document.querySelector('[data-story]').dataset.storyChannel");
  check("channels", "the channel selector works by click and arrow keys; the phone view carries call words and no WhatsApp step text", c0.startsWith("whatsapp") && c1.ch === "phone" && c1.view === "phone" && c1.hasCall && !c1.hasWhatsAppWords && c2 === "webform webform" && c3 === "whatsapp", { start: c0, phone: { ...c1, text: c1.text.slice(0, 80) }, after_left: c2, after_two_right: c3 });

  // the notice on every channel
  const notices = JSON.parse(await ev(`(async()=>{const out={};for(const ch of ['whatsapp','email','webform','phone']){document.querySelector('[data-channel-tab='+ch+']').click();await new Promise(r=>setTimeout(r,600));document.querySelector('[data-story-notice-toggle]').click();await new Promise(r=>setTimeout(r,300));const n=document.querySelector('[data-story-notice]');out[ch]=n?n.innerText.slice(0,50):null;document.querySelector('[data-story-notice-toggle]').click();}return JSON.stringify(out)})()`));
  check("notice", "the AI notice can be shown on every channel", Object.values(notices).every((t) => t && t.length > 20), notices);

  // Jarvis: take and done by keyboard
  await ev("document.getElementById('story-d').scrollIntoView(); window.scrollBy(0,-80)"); await sleep(600);
  await ev("document.querySelector('[data-task-take]').focus()"); await key(" ", "Space", 32); await sleep(600);
  const t1 = await ev("document.querySelector('[data-story]').dataset.storyTask");
  await ev("document.querySelector('[data-task-complete]').focus()"); await key("Enter", "Enter", 13); await sleep(600);
  const t2 = JSON.parse(await ev("JSON.stringify({state:document.querySelector('[data-story]').dataset.storyTask, line:(document.querySelector('[data-task-done-line]')?.innerText||'').slice(0,60), others:[...document.querySelectorAll('[data-task-item]')].map(e=>e.dataset.taskState).join(',')})"));
  check("task", "Jarvis: take and done by keyboard; the done line names who did what; the other tasks stay open", t1 === "taken" && t2.state === "done" && t2.line.length > 20 && t2.others === "done,open,open,open", { taken: t1, done: t2 });

  // 3D and packages: there, and no proof-state label on the public page
  const sec = JSON.parse(await ev("JSON.stringify({model3d:!!document.getElementById('model-3d'), steps:document.querySelectorAll('[data-model3d-steps] li').length, compare:!!document.querySelector('[data-compare-range]'), film:!!document.querySelector('[data-model3d-film] video'), packages:document.querySelectorAll('[data-package]').length, proof:document.querySelectorAll('[data-proof-state]').length, menuStates:document.querySelectorAll('[data-platform-menu] .state-line').length, prep:/en preparación|In preparation|Prototipo/i.test(document.querySelector('main').innerText)})"));
  check("model3d-packages", "the 3D section (four stages, the compare slider, the film) and the ladder are there; no proof-state label or 'in preparation' on the public page", sec.model3d && sec.steps === 4 && sec.compare && sec.film && sec.packages === 4 && sec.proof === 0 && sec.menuStates === 0 && !sec.prep, sec);

  // the FAQ
  await nav("/es/faq", 3500);
  const faq = JSON.parse(await ev(`(()=>{const btns=[...document.querySelectorAll('[data-accordion] button')];btns[1].click();return new Promise(r=>setTimeout(()=>{btns[2].click();setTimeout(()=>{const open=[...document.querySelectorAll('[data-accordion-item=open]')].length;const exp=btns[2].getAttribute('aria-expanded');const region=document.getElementById(btns[2].getAttribute('aria-controls'));const counts=[...document.querySelectorAll('section[id] h2')].filter(h=>/^\\d+$/.test((h.nextElementSibling?.innerText||'').trim())).length;const ids=document.body.innerText.includes('Q-0');r(JSON.stringify({open,exp,regionShown:!!region&&region.getBoundingClientRect().height>10,counts,ids_visible:ids}))},700)},700))})()`));
  check("faq", "one question open at a time, aria-expanded and its region, no count under a category, no row id in the text", faq.open === 1 && faq.exp === "true" && faq.regionShown && faq.counts === 0 && !faq.ids_visible, faq);

  // reduced motion
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await nav("/es", 1500);
  const r0 = JSON.parse(await ev(`JSON.stringify({items:[...document.querySelectorAll('[data-hero-surface] .seq-item')].map(e=>getComputedStyle(e).opacity), layers:${LAYERS}, replay:getComputedStyle(document.querySelector('[data-seq-replay]')).display})`));
  await ev("window.scrollTo(0, 420)"); await sleep(500);
  const r1 = JSON.parse(await ev(LAYERS));
  const still = JSON.parse(r0.layers);
  check("reduced", "reduced motion: everything visible at once, no layer moves, the panel keeps a fixed lean, the replay control is hidden", r0.items.every((o) => o === "1") && still.far === "none" && still.front === "none" && still.panel === r1.panel && /matrix3d/.test(still.panel) && r0.replay === "none", { items_visible: r0.items.length, layers_top: still, panel_after_scroll_same: still.panel === r1.panel, replay: r0.replay });
  await send("Emulation.setEmulatedMedia", { features: [] });

  // without JavaScript
  await send("Emulation.setScriptExecutionDisabled", { value: true });
  await nav("/es", 3000);
  const doc = await send("DOM.getDocument", { depth: 1 });
  const q = async (sel) => (await send("DOM.querySelectorAll", { nodeId: doc.result.root.nodeId, selector: sel })).result.nodeIds.length;
  const nojs = { hero: await q(".hero-world"), story_parts: await q("[data-hero-enquiry],[data-hero-reply],[data-hero-crm],[data-hero-task]"), chapters: await q(".story-chapter"), stages: await q("[data-story-stage]"), html_js: await q("html.js") };
  await shot("home-d1440-es-nojs.png");
  check("nojs", "without JavaScript the hero's finished picture and all six chapters with their stages are in the document", nojs.hero === 1 && nojs.story_parts === 4 && nojs.chapters === 6 && nojs.stages === 6 && nojs.html_js === 0, nojs);
  await send("Emulation.setScriptExecutionDisabled", { value: false });

  // login gate: /app without a session → login with next=
  await send("Network.clearBrowserCookies");
  const redirects = [];
  const onReq = (e) => { const m = JSON.parse(e.data); if (m.method === "Network.requestWillBeSent" && m.params.redirectResponse) redirects.push({ from: m.params.redirectResponse.url, to: m.params.request.url, status: m.params.redirectResponse.status }); };
  ws.addEventListener("message", onReq);
  await nav("/es/app/reports", 3500);
  ws.removeEventListener("message", onReq);
  const gate = { url: await ev("location.pathname + location.search"), hasForm: await ev("!!document.querySelector('[data-login-form]')"), redirects: redirects.slice(0, 3) };
  check("login-gate", "the report without a session goes to the login and remembers where it came from", /\/es\/login\?next=%2Fes%2Fapp%2Freports/.test(gate.url) && gate.hasForm, gate);

  // stub session: the login returns to the report; the header shows the account; log out works
  const stubLogin = await (await fetch(`${BASE}/api/bff/auth/login?stub=1&next=/es/app/reports`, { redirect: "manual" })).status;
  await nav("/api/bff/auth/login?stub=1&next=%2Fes%2Fapp%2Freports", 4500);
  const rep = JSON.parse(await ev("JSON.stringify({path:location.pathname, state:document.querySelector('[data-reports-state]')?.dataset.reportsState, counts:document.querySelectorAll('[data-report-count]').length, nulls:document.querySelectorAll('[data-report-value=\"null\"]').length, period:(document.querySelector('[data-report-period]')?.innerText||''), emailLink:!!document.querySelector('[data-report-email-link]'), stubChip:/demostraci/i.test(document.body.innerText)})"));
  await sleep(1500);
  const hdr = JSON.parse(await ev("JSON.stringify({nav:document.querySelector('header [data-session-nav]')?.dataset.sessionNav, account:!!document.querySelector('header [data-account-link]'), logout:!!document.querySelector('header [data-logout]'), loginText:/Iniciar sesión/.test(document.querySelector('header').innerText)})"));
  check("reports", "with a session the report renders its counts and period (stub data, labelled) and links the email preview", stubLogin === 303 && rep.path === "/es/app/reports" && rep.state === "report" && rep.counts >= 6 && rep.period.length > 8 && rep.emailLink && rep.stubChip, { stub_login_status: stubLogin, ...rep });
  check("session-header", "with a session the header shows the account link and log out instead of log in", hdr.nav === "in" && hdr.account && hdr.logout && !hdr.loginText, hdr);
  await nav("/es/app/reports/email", 4000);
  const em = JSON.parse(await ev("JSON.stringify({subject:(document.querySelector('[data-email-subject]')?.innerText||''), button:document.querySelector('[data-email-button]')?.getAttribute('href')||''})"));
  check("report-email", "the Monday email preview carries the subject with the figure and the button to the full report", /\d/.test(em.subject) && /\/es\/app\/reports$/.test(em.button), em);
  // social screen B
  await nav("/es/social/post", 4500);
  const sb = JSON.parse(await ev("JSON.stringify({listings:document.querySelectorAll('[data-listing]').length, covers:document.querySelectorAll('[data-listing-cover]').length, drafts:document.querySelectorAll('[data-social-action=\"draft\"]').length, inert:document.querySelectorAll('[data-social-action=\"draft\"][data-social-inert]').length, off:[...document.querySelectorAll('[data-social-off]')].map(e=>e.dataset.socialOff)[0]||null})"));
  check("social-b", "Screen B shows the cover frame for every listing and a draft control on the publishable ones, switched off with its reason until the release", sb.listings >= 2 && sb.covers === sb.listings && sb.drafts >= 1 && sb.inert === sb.drafts && sb.off !== null, sb);
  // log out from the header
  await nav("/es/app", 4000);
  await ev("document.querySelector('header [data-logout]').click()"); await sleep(4000);
  const out = JSON.parse(await ev("JSON.stringify({path:location.pathname, notice:!!document.querySelector('[data-signed-out]'), nav:document.querySelector('header [data-session-nav]')?.dataset.sessionNav})"));
  await nav("/es/app", 3000);
  const after = await ev("location.pathname");
  check("logout", "log out from the header lands on the public root with a status line; the agency area asks for the login again", out.path === "/es" && out.notice && out.nav === "out" && after === "/es/login", { ...out, app_after_logout: after });

  ws.close();
} finally {
  edge.kill();
  results.pass = results.checks.filter((c) => c.ok).length;
  results.total = results.checks.length;
  writeFileSync(join(OUT, "master-check.json"), JSON.stringify(results, null, 1));
  console.log(`${results.pass}/${results.total} checks passed -> ${join(OUT, "master-check.json")}`);
}
