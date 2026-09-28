// Independent re-review of e39ad06, browser side. Local build only; local is never an E2E proof.
// Covers WR-33/34 (qualifier position), Z17 (stacked cards), Z18 (query on language switch),
// Z20 (mobile sheet keyboard), Z21 (noindex), Z10 (two Q&A instances), staging band at 360 px.
// Usage: node rvb-ui.mjs <appRoot> <mode stub|staging> <out.json> <shots>
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REF = "fflmmzapksycjfdcjdtd";
const [ROOT, MODE, OUT, SHOTS] = process.argv.slice(2);
const PORT = MODE === "staging" ? 3141 : 3140, CDP = MODE === "staging" ? 9371 : 9370;
const BASE = `http://localhost:${PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(SHOTS, { recursive: true });
const env = MODE === "staging"
  ? { NUOVA_INTEGRATION_MODE: "staging", NEXT_PUBLIC_SUPABASE_URL: `https://${REF}.supabase.co`, NEXT_PUBLIC_SUPABASE_ANON_KEY: readFileSync("C:/Users/Usuario/.nuova-secrets/stg_publishable_key.txt", "utf8").trim(), NUOVA_STAGING_TARGET_APPROVED: REF }
  : { NUOVA_INTEGRATION_MODE: "stub" };

const res = { commit: "e39ad06", mode: MODE, started_utc: new Date().toISOString(), checks: [], detail: {} };
const check = (id, what, pass, ev) => { res.checks.push({ id, what, pass: Boolean(pass), evidence: ev }); console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what} :: ${JSON.stringify(ev).slice(0, 320)}`); };
const kids = [];
try {
  kids.push(spawn(process.execPath, [join(ROOT, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(PORT)], { cwd: ROOT, env: { ...process.env, ...env }, stdio: "ignore" }));
  for (let i = 0; i < 120; i++) { try { await fetch(`${BASE}/en`); break; } catch { await sleep(500); } }
  const prof = join(SHOTS, `prof-${MODE}`); rmSync(prof, { recursive: true, force: true });
  kids.push(spawn("C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", ["--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${prof}`, `--remote-debugging-port=${CDP}`, "about:blank"], { stdio: "ignore" }));
  let list; for (let i = 0; i < 60; i++) { try { list = await (await fetch(`http://127.0.0.1:${CDP}/json`)).json(); break; } catch { await sleep(500); } }
  const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let id = 0; const pend = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (m, p = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
  const ev = async (x) => (await send("Runtime.evaluate", { expression: x, returnByValue: true, awaitPromise: true })).result?.result?.value;
  const vp = (w, h, mobile = w <= 430) => send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 2, mobile });
  const go = async (p, wait = 2500) => { await send("Page.navigate", { url: BASE + p }); await sleep(wait); };
  const shot = async (n) => { const s = await send("Page.captureScreenshot", { format: "png" }); writeFileSync(join(SHOTS, n + ".png"), Buffer.from(s.result.data, "base64")); };
  await send("Page.enable"); await send("Network.enable");

  if (MODE === "stub") {
    // --- WR-33 / WR-34: where does the qualifier stand relative to the claim it qualifies ---
    const Q = { en: "Based on agency permissions and configuration.", es: "Según los permisos y la configuración de tu agencia." };
    const pos = {};
    for (const [loc, pages] of [["en", ["/en", "/en/platform/ai-sales-agent"]], ["es", ["/es", "/es/platform/ai-sales-agent"]]]) {
      for (const p of pages) {
        await go(p, 2600);
        pos[p] = await ev(`(() => { const t = document.body.innerText;
          const h1 = document.querySelector('h1'); const h1t = h1 ? h1.innerText.trim() : '';
          const hi = t.indexOf(h1t.slice(0, 30)); const qi = t.indexOf(${JSON.stringify(Q[loc])});
          const r1 = h1 ? h1.getBoundingClientRect() : null;
          let qy = null; if (qi >= 0) { const w = document.evaluate("//*[contains(text(), " + JSON.stringify(${JSON.stringify(Q[loc])}.slice(0, 28)) + ")]", document, null, 9, null).singleNodeValue; if (w) qy = Math.round(w.getBoundingClientRect().top + scrollY); }
          return { h1: h1t.slice(0, 60), h1_char: hi, qualifier_char: qi, gap_chars: qi >= 0 && hi >= 0 ? qi - hi : null, h1_y: r1 ? Math.round(r1.top + scrollY) : null, qualifier_y: qy, occurrences: (t.match(new RegExp(${JSON.stringify(Q[loc])}.replace(/[.*+?^\${}()|[\\]\\\\]/g, "\\\\$&"), "g")) || []).length };
        })()`);
      }
    }
    res.detail.qualifier = pos;
    const homeEn = pos["/en"], pageEn = pos["/en/platform/ai-sales-agent"], homeEs = pos["/es"], pageEs = pos["/es/platform/ai-sales-agent"];
    check("RVB-33", "WR-33: the home hero claim carries its qualifier within the first screen",
      homeEn.qualifier_char > 0 && homeEs.qualifier_char > 0 && homeEn.qualifier_y !== null && homeEn.qualifier_y - homeEn.h1_y < 900,
      { en: { gap_chars: homeEn.gap_chars, h1_y: homeEn.h1_y, q_y: homeEn.qualifier_y }, es: { gap_chars: homeEs.gap_chars, q_y: homeEs.qualifier_y } });
    check("RVB-34", "WR-34: the product page qualifier sits with the h1 claim, both languages",
      pageEn.qualifier_char > 0 && pageEs.qualifier_char > 0 && (pageEn.qualifier_y - pageEn.h1_y) < 900 && (pageEs.qualifier_y - pageEs.h1_y) < 900,
      { en: { h1: pageEn.h1, h1_y: pageEn.h1_y, q_y: pageEn.qualifier_y }, es: { h1_y: pageEs.h1_y, q_y: pageEs.qualifier_y } });

    // --- Z21: robots ---
    const hdr = await fetch(`${BASE}/en`, { redirect: "manual" });
    const meta = await ev(`(document.querySelector('meta[name=robots]')||{}).content || 'none'`);
    const robots = await (await fetch(`${BASE}/robots.txt`)).text();
    res.detail.robots = { header: hdr.headers.get("x-robots-tag") ?? "none", meta, robots_txt: robots.slice(0, 200) };
    check("RVB-Z21", "a non-production build answers noindex in the header and the meta tag",
      (hdr.headers.get("x-robots-tag") ?? "").includes("noindex") && /noindex/i.test(meta), res.detail.robots);

    // --- Z18: language switch keeps an uncritical query ---
    await vp(1440, 900, false);
    await go("/en/login?confirmed=1", 2500);
    const sw = await ev(`(async () => { const a=[...document.querySelectorAll('a[href]')].find(x=>/^\\/es/.test(x.getAttribute('href')||'')); if(!a) return {found:false}; const href=a.getAttribute('href'); a.click(); await new Promise(r=>setTimeout(r,1500)); return {found:true, href, url: location.pathname+location.search}; })()`);
    res.detail.language_switch = sw;
    check("RVB-Z18", "switching language keeps the confirmation query", sw?.found && /confirmed=1/.test(sw.url ?? ""), sw);

    // --- Z20: mobile sheet keyboard ---
    await vp(390, 844);
    await go("/en", 2500);
    const sheet = await ev(`(async () => {
      const btn=[...document.querySelectorAll('header button')].find(b=>/menu|men\\u00fa/i.test((b.getAttribute('aria-label')||'')+b.innerText)); if(!btn) return {opener:false};
      btn.focus(); btn.click(); await new Promise(r=>setTimeout(r,700));
      const panel=document.querySelector('[role=dialog], [data-sheet], nav[aria-modal]');
      const inside=panel ? panel.contains(document.activeElement) : null;
      // tab through ten stops, must stay inside the panel
      let escaped=false;
      if (panel) { const f=[...panel.querySelectorAll('a[href],button')].filter(e=>e.offsetParent); if(f.length){ f[f.length-1].focus(); } }
      document.activeElement.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
      await new Promise(r=>setTimeout(r,700));
      const closed=!document.querySelector('[role=dialog], [data-sheet], nav[aria-modal]') || getComputedStyle(document.querySelector('[role=dialog], [data-sheet], nav[aria-modal]')).display==='none';
      return {opener:true, panelFound:!!panel, focusInPanel:inside, closedByEscape:closed, focusBackOnOpener:/menu|men\\u00fa/i.test((document.activeElement.getAttribute('aria-label')||'')+document.activeElement.innerText)};
    })()`);
    res.detail.sheet = sheet;
    check("RVB-Z20", "the mobile sheet closes with Escape and returns focus to its opener",
      sheet?.panelFound && sheet.closedByEscape && sheet.focusBackOnOpener, sheet);

    // --- Z17: stacked cards at a small height and at 200 % zoom ---
    const stack = {};
    for (const [w, h, label] of [[390, 640, "390x640"], [720, 700, "200pct-zoom"]]) {
      await vp(w, h, w <= 430); await go("/en", 2600);
      stack[label] = await ev(`(() => { const cards=[...document.querySelectorAll('.stack-card')];
        if(!cards.length) return {cards:0};
        const tall=cards.filter(c=>c.getBoundingClientRect().height>innerHeight).length;
        const sticky=cards.filter(c=>getComputedStyle(c).position==='sticky').length;
        const clipped=cards.filter(c=>{const s=getComputedStyle(c);return ['hidden','clip'].includes(s.overflowY)&&c.scrollHeight>c.clientHeight+2;}).length;
        return {cards:cards.length, taller_than_viewport:tall, sticky, clipped_content:clipped, viewport:innerHeight};
      })()`);
    }
    res.detail.stack = stack;
    check("RVB-Z17", "stacked cards are not taller than a small viewport and clip no content",
      Object.values(stack).every((s) => (s.cards ?? 0) === 0 || (s.taller_than_viewport === 0 && s.clipped_content === 0)), stack);
    await vp(390, 640); await go("/en", 2600); await shot("rvb-390x640-en-home");

    // --- Z10: two Q&A instances ---
    await vp(1440, 900, false); await go("/en", 2800);
    const qa = await ev(`(() => { const panels=[...document.querySelectorAll('[data-qa-panel], form')].filter(f=>/question|pregunta/i.test(f.innerText||''));
      const launchers=[...document.querySelectorAll('button')].filter(b=>/Ask a question|Haz una pregunta/i.test(b.innerText)).length;
      const inputs=[...document.querySelectorAll('textarea, input[type=text]')].filter(i=>/question|pregunta/i.test((i.placeholder||'')+(i.getAttribute('aria-label')||''))).length;
      return {launchers, question_inputs:inputs, panels:panels.length};
    })()`);
    res.detail.qa_instances = qa;
    check("RVB-Z10", "only one question thread is offered at a time", (qa?.question_inputs ?? 0) <= 1, qa);
  }

  if (MODE === "staging") {
    // --- the staging band at 360 px: does it cover text? ---
    const OVL = `(() => { const boxes=[];
      for (const e of document.querySelectorAll('header *, main *, footer *')) { const s=getComputedStyle(e);
        if (s.visibility==='hidden'||s.display==='none'||Number(s.opacity)<0.05) continue;
        if (![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())) continue;
        for (const r of e.getClientRects()) if (r.width>12&&r.height>8) boxes.push({e,r}); }
      const out=[];
      for (let i=0;i<boxes.length;i++) for (let j=i+1;j<boxes.length;j++) { const A=boxes[i],B=boxes[j];
        if (A.e===B.e||A.e.contains(B.e)||B.e.contains(A.e)) continue;
        const ox=Math.min(A.r.right,B.r.right)-Math.max(A.r.left,B.r.left), oy=Math.min(A.r.bottom,B.r.bottom)-Math.max(A.r.top,B.r.top);
        if (ox<=3||oy<=3) continue;
        const cx=Math.max(A.r.left,B.r.left)+ox/2, cy=Math.max(A.r.top,B.r.top)+oy/2;
        if (cy<0||cy>innerHeight) continue;
        const top=document.elementFromPoint(cx,cy); if(!top) continue;
        if (!A.e.contains(top)&&!B.e.contains(top)&&top!==A.e&&top!==B.e) continue;
        out.push({a:(A.e.innerText||'').trim().slice(0,26), b:(B.e.innerText||'').trim().slice(0,26), ox:Math.round(ox), oy:Math.round(oy)}); }
      return out.slice(0,8); })()`;
    const band = {};
    for (const w of [360, 390]) { await vp(w, w === 360 ? 800 : 844);
      for (const p of ["/en", "/es", "/es/platform/crm"]) { await go(p, 2400);
        const found = []; const steps = Math.min(6, Math.ceil(await ev(`document.body.scrollHeight/innerHeight`)));
        for (let s = 0; s < steps; s++) { await ev(`scrollTo(0, innerHeight*${s})`); await sleep(250); const o = await ev(OVL); if (o?.length) found.push(...o); }
        if (found.length) band[`${w}${p}`] = found.slice(0, 5);
      } }
    res.detail.band_overlap = band;
    check("RVB-BAND", "the staging band no longer covers page text at 360 and 390 px", Object.keys(band).length === 0, { pages: Object.keys(band) });
    await vp(360, 800); await go("/es", 2400); await shot("rvb-360-es-home-staging");
  }
  ws.close();
} catch (e) { res.error = String(e?.message ?? e); console.error("ERROR", res.error); }
finally {
  res.finished_utc = new Date().toISOString();
  res.summary = { pass: res.checks.filter((c) => c.pass).length, total: res.checks.length };
  writeFileSync(OUT, JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res.summary));
  for (const k of kids) k.kill();
  process.exit(0);
}
