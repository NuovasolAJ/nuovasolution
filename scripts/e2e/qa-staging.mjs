// Website Q&A against the REAL staging path: the local website server (its own BFF, its own signing)
// talking to Hosting's public staging endpoint https://167-235-150-163.sslip.io/webhook/website-qa.
// Tenant and HMAC secret come from the secure store (stg_webqa_hmac_<tenant>.txt) and are never
// printed. Default tenant: stg_pm_nerjamar, the PM fixture Hosting proved on 2026-09-22 (no secret has
// been issued for the website test agency yet; see the return record). Nothing here touches production.
//
// Proves: accept (202 or 200) → signed poll → a terminal state within the website's 60 s budget, plus
// the website-side refusals (no session cookie → 401, bad message id → 400) and that a foreign
// session cannot read the answer (a different cookie → unknown).
// Usage: node scripts/e2e/qa-staging.mjs   (requires a prior `next build`; env OUT, SECRETS, QA_TENANT)
import { spawn } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "evidence_2026-09-23");
const SECRETS = process.env.SECRETS ?? "C:/Users/Usuario/.nuova-secrets";
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const INTAKE = "https://167-235-150-163.sslip.io/webhook/website-qa";
const TENANT = process.env.QA_TENANT ?? "stg_pm_nerjamar";
const PORT = 3131;
const BASE = `http://localhost:${PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });
if (INTAKE.includes("flows.nuovasolution.com")) { console.error("ABORT: production host"); process.exit(3); }

const secret = readFileSync(join(SECRETS, `stg_webqa_hmac_${TENANT}.txt`), "utf8").trim();
if (secret.length < 16) { console.error("ABORT: secret file looks wrong"); process.exit(3); }

const results = { started_utc: new Date().toISOString(), commit: process.env.E2E_COMMIT ?? "working tree", intake: INTAKE, tenant: TENANT, checks: [] };
const check = (id, what, pass, evidence) => { results.checks.push({ id, what, pass: Boolean(pass), evidence }); console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what}`); };
const kids = [];
const start = (cmd, args, env) => { const p = spawn(cmd, args, { cwd: ROOT, env: { ...process.env, ...env }, stdio: ["ignore", "pipe", "pipe"] }); p.stdout.on("data", () => {}); p.stderr.on("data", () => {}); kids.push(p); return p; };
const waitHttp = async (url) => { for (let i = 0; i < 120; i++) { try { const r = await fetch(url, { redirect: "manual" }); if (r.status) return true; } catch { /* not up */ } await sleep(500); } throw new Error(`not reachable: ${url}`); };
const cookieOf = (res) => (res.headers.getSetCookie?.() ?? []).map((c) => c.split(";")[0]).filter((c) => c.startsWith("nuova_")).join("; ");

try {
  start(process.execPath, [NEXT, "start", "-p", String(PORT)], { QA_INTAKE_URL: INTAKE, QA_TENANT_ID: TENANT, QA_TENANT_HMAC_SECRET: secret });
  await waitHttp(`${BASE}/en`);

  const t0 = Date.now();
  const ask = await fetch(`${BASE}/api/qa`, { method: "POST", headers: { "Content-Type": "application/json", Origin: BASE }, body: JSON.stringify({ question: "Do you have a 2-bedroom apartment for sale in Nerja under 300k?", locale: "en" }) });
  const cookie = cookieOf(ask);
  const askBody = await ask.json();
  const acceptMs = Date.now() - t0;
  const st = askBody.details?.status;
  check("QA-S1", "the website accepts the question through the staging path (pending or answered, never cannot_confirm)", ask.status === 200 && (st === "pending" || st === "answered"), { status: ask.status, outcome: st, ms: acceptMs });
  check("QA-S2", "a Q&A session cookie is set (httpOnly, the browser never sees the tenant or secret)", cookie.includes("nuova_qa_session"), cookie.split("=")[0]);

  let final = st === "answered" ? askBody.details : null;
  const polls = [];
  const mid = askBody.details?.message_id;
  const started = Date.now();
  while (!final && mid && Date.now() - started < 240_000) {
    await sleep(3000);
    const r = await fetch(`${BASE}/api/qa/result?message_id=${encodeURIComponent(mid)}`, { headers: { Cookie: cookie } });
    const j = await r.json();
    polls.push(`${r.status}:${j.details?.status ?? "?"}`);
    if (j.details && j.details.status !== "pending") final = j.details;
  }
  const withinBudget = final ? Date.now() - started <= 60_000 : false;
  check("QA-S3", "a terminal state arrives through the signed poll", Boolean(final), { final: final?.status ?? "none", polls: polls.length, elapsed_ms: Date.now() - started });
  check("QA-S4", "the terminal state is 'answered' with text (mock LLM on staging: text proves transport, not quality)", final?.status === "answered" && typeof final?.text === "string" && final.text.trim().length > 0, { status: final?.status, textChars: final?.text?.length ?? 0 });
  check("QA-S5", "the answer arrived inside the website's 60 s polling budget", withinBudget, { elapsed_ms: Date.now() - started });

  // website-side refusals
  let r = await fetch(`${BASE}/api/qa/result?message_id=${encodeURIComponent(mid ?? "web_000000000000000000000000")}`);
  check("QA-S6", "reading a result without the session cookie is refused (401)", r.status === 401, r.status);
  r = await fetch(`${BASE}/api/qa/result?message_id=not-an-id`, { headers: { Cookie: cookie } });
  check("QA-S7", "a malformed message id is refused before any call (400)", r.status === 400, r.status);
  const other = await fetch(`${BASE}/api/qa`, { method: "POST", headers: { "Content-Type": "application/json", Origin: BASE }, body: JSON.stringify({ question: "Another visitor", locale: "es" }) });
  const otherCookie = cookieOf(other);
  r = await fetch(`${BASE}/api/qa/result?message_id=${encodeURIComponent(mid ?? "web_000000000000000000000000")}`, { headers: { Cookie: otherCookie } });
  const j = await r.json();
  check("QA-S8", "another visitor's session cannot read this answer (unknown, never the text)", r.status === 200 && j.details?.status === "unknown", { status: r.status, outcome: j.details?.status });
  r = await fetch(`${BASE}/api/qa`, { method: "POST", headers: { "Content-Type": "application/json", Origin: "https://evil.example" }, body: JSON.stringify({ question: "x", locale: "en" }) });
  check("QA-S9", "a cross-origin question is refused (403)", r.status === 403, r.status);
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
  results.finished_utc = new Date().toISOString();
  results.pass = results.checks.filter((c) => c.pass).length;
  results.total = results.checks.length;
  writeFileSync(join(OUT, "qa-staging-results.json"), JSON.stringify(results, null, 2));
  console.log(`${results.pass}/${results.total}`);
}
