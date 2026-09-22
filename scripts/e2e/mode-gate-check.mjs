// Proves the W1 integration-mode gate WITHOUT contacting any backend.
// 1. A live build without the owner's release value must fail at configuration time.
// 2. A staging (sandbox) build must refuse, before any network call, when the target is not
//    the pinned staging project, when the per-target approval is missing, or when the Q&A
//    target is a production host. The only Supabase URLs used below are refused by the gate,
//    so no request can leave the server. The sandbox marking must render on every page.
// Leaves .next as a SANDBOX build: rebuild in stub mode afterwards (npm run build).
// Usage: node scripts/e2e/mode-gate-check.mjs   Writes <OUT>/mode-gate-results.json.
import { spawn, spawnSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "evidence_2026-09-21");
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });
const results = { started_utc: new Date().toISOString(), commit: process.env.E2E_COMMIT ?? "working tree", checks: [] };
const check = (id, what, pass, evidence) => { results.checks.push({ id, what, pass: Boolean(pass), evidence }); console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what}`); };
const kids = [];
const cookieNames = (res) => (res.headers.getSetCookie?.() ?? []).map((c) => c.split("=")[0]);

try {
  // 1. live build refused
  const live = spawnSync(process.execPath, [NEXT, "build"], { cwd: ROOT, env: { ...process.env, NUOVA_INTEGRATION_MODE: "live", NUOVA_LIVE_RELEASE: "" }, encoding: "utf8", timeout: 120000 });
  check("G-1", "a live build without the owner release value is refused", live.status !== 0 && /Refusing a live build/.test(`${live.stdout}${live.stderr}`), `exit ${live.status}`);

  // 2. sandbox build
  const sb = spawnSync(process.execPath, [NEXT, "build"], { cwd: ROOT, env: { ...process.env, NUOVA_INTEGRATION_MODE: "staging" }, encoding: "utf8", timeout: 600000 });
  check("G-2", "a sandbox build compiles", sb.status === 0, `exit ${sb.status}`);

  const scenarios = [
    // Fake keys of the right type (never real values), so each scenario reaches the check it names.
    { id: "G-3", port: 3111, what: "pinned staging URL but no per-target approval: refused before any call", env: { NEXT_PUBLIC_SUPABASE_URL: "https://fflmmzapksycjfdcjdtd.supabase.co", NEXT_PUBLIC_SUPABASE_ANON_KEY: "sb_publishable_FAKEFORGATECHECK" } },
    { id: "G-4", port: 3112, what: "a non-pinned (e.g. production) Supabase URL with an approval value: refused before any call", env: { NEXT_PUBLIC_SUPABASE_URL: "https://notthestagingref.supabase.co", NEXT_PUBLIC_SUPABASE_ANON_KEY: "sb_publishable_FAKEFORGATECHECK", NUOVA_STAGING_TARGET_APPROVED: "notthestagingref" } },
    { id: "G-5", port: 3113, what: "no Supabase URL at all: refused", env: {} },
    { id: "G-10", port: 3114, what: "a secret key in the website environment is refused (v2: no secret key for user actions)", env: { NEXT_PUBLIC_SUPABASE_URL: "https://fflmmzapksycjfdcjdtd.supabase.co", NEXT_PUBLIC_SUPABASE_ANON_KEY: "sb_publishable_FAKEFORGATECHECK", NUOVA_STAGING_TARGET_APPROVED: "fflmmzapksycjfdcjdtd", SUPABASE_SERVICE_ROLE_KEY: "sb_secret_FAKEFORGATECHECK" } },
    { id: "G-11", port: 3115, what: "a legacy JWT as publishable key is refused", env: { NEXT_PUBLIC_SUPABASE_URL: "https://fflmmzapksycjfdcjdtd.supabase.co", NEXT_PUBLIC_SUPABASE_ANON_KEY: "eyJFAKE.FAKE.FAKE", NUOVA_STAGING_TARGET_APPROVED: "fflmmzapksycjfdcjdtd" } },
  ];
  for (const s of scenarios) {
    const p = spawn(process.execPath, [NEXT, "start", "-p", String(s.port)], { cwd: ROOT, env: { ...process.env, ...s.env, QA_INTAKE_URL: "https://flows.nuovasolution.com/webhook/website-qa", QA_TENANT_ID: "x", QA_TENANT_HMAC_SECRET: "not-a-secret" }, stdio: "ignore" });
    kids.push(p);
    for (let i = 0; i < 120; i++) { try { await fetch(`http://localhost:${s.port}/en`); break; } catch { await sleep(500); } }
    const cat = await fetch(`http://localhost:${s.port}/api/bff/crm/catalog`);
    const cj = await cat.json();
    check(s.id, s.what, cat.status === 503 && cj.code === "environment_misconfigured", { status: cat.status, code: cj.code });
    if (s.id === "G-3") {
      const page = await (await fetch(`http://localhost:${s.port}/en`)).text();
      check("G-6", "sandbox band and fixed marker render on a marketing page", /data-env="staging"/.test(page) && /data-env-marker="staging"/.test(page), "data-env=staging, data-env-marker=staging");
      const qa = await fetch(`http://localhost:${s.port}/api/qa`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: "hello", locale: "en" }) });
      const qj = await qa.json();
      check("G-7", "a production Q&A intake host is refused in a sandbox build (no call made)", qj.message === "not_configured" && qj.details?.status === "cannot_confirm", qj.message);
      const stubGet = await fetch(`http://localhost:${s.port}/api/bff/auth/login?stub=1`, { redirect: "manual" });
      check("G-8", "stub session endpoint does not exist in a sandbox build", stubGet.status === 404, stubGet.status);
      const signup = await fetch(`http://localhost:${s.port}/api/bff/signup`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "A", email: "a@b.c", password: "a-long-password", language: "en", agency_name: "X" }) });
      const sj = await signup.json();
      check("G-9", "signup against an unapproved target is refused before any call, and no session is set", signup.status === 503 && sj.code === "environment_misconfigured" && !cookieNames(signup).includes("nuova_session"), { status: signup.status, code: sj.code });
    }
    p.kill();
  }
} catch (e) {
  check("RUNNER", "the gate check itself completed", false, String(e?.stack ?? e));
} finally {
  for (const k of kids) { try { k.kill(); } catch { /* gone */ } }
  results.finished_utc = new Date().toISOString();
  results.passed = results.checks.filter((c) => c.pass).length;
  results.failed = results.checks.filter((c) => !c.pass).length;
  writeFileSync(join(OUT, "mode-gate-results.json"), JSON.stringify(results, null, 1));
  console.log(`\n${results.passed} passed, ${results.failed} failed`);
  process.exit(results.failed ? 1 : 0);
}
