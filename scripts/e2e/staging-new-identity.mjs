// Registration path with a NEW identity on staging (WEBSITE_HANDOFF_v2 §1: the pre-provisioned agency does
// not prove registration). Two phases, because the confirmation click needs API (STG_CONFIRM_REQUEST):
//   node scripts/e2e/staging-new-identity.mjs signup     -> sign-up through the BFF; login refused before confirmation
//   node scripts/e2e/staging-new-identity.mjs register   -> after API confirmed: login, session says register,
//                                                            register, onboarding state and readiness readable
// The identity is written to the secure store only (stg_web_impl_new_identity.txt); nothing secret is printed.
// Requires a staging build (NUOVA_INTEGRATION_MODE=staging). Staging project fflmmzapksycjfdcjdtd only.
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REF = "fflmmzapksycjfdcjdtd";
const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const OUT = process.env.OUT ?? join(ROOT, "docs", "website_redesign", "evidence_2026-09-22", "staging");
const SECRETS = process.env.SECRETS ?? "C:/Users/Usuario/.nuova-secrets";
const FILE = join(SECRETS, "stg_web_impl_new_identity.txt");
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PORT = 3122, BASE = `http://localhost:${PORT}`;
const phase = process.argv[2];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });
const PUB = readFileSync(join(SECRETS, "stg_publishable_key.txt"), "utf8").trim();
const results = { phase, started_utc: new Date().toISOString(), commit: process.env.E2E_COMMIT ?? "working tree", env: `staging ${REF}`, checks: [] };
const check = (id, what, pass, evidence) => { results.checks.push({ id, what, pass: Boolean(pass), evidence }); console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what}`); };
const post = (path, body, cookie = "") => fetch(`${BASE}${path}`, { method: "POST", headers: { "Content-Type": "application/json", Cookie: cookie }, body: JSON.stringify(body), redirect: "manual" })
  .then(async (r) => ({ status: r.status, body: await r.json().catch(() => null), cookie: (r.headers.getSetCookie?.() ?? []).map((c) => c.split(";")[0]).filter((c) => c.startsWith("nuova_")).join("; ") }));
const get = (path, cookie) => fetch(`${BASE}${path}`, { headers: { Cookie: cookie } }).then(async (r) => ({ status: r.status, body: await r.json().catch(() => null) }));

const srv = spawn(process.execPath, [NEXT, "start", "-p", String(PORT)], { cwd: ROOT, env: { ...process.env, NUOVA_INTEGRATION_MODE: "staging", NEXT_PUBLIC_SUPABASE_URL: `https://${REF}.supabase.co`, NEXT_PUBLIC_SUPABASE_ANON_KEY: PUB, NUOVA_STAGING_TARGET_APPROVED: REF }, stdio: "ignore" });
let id = null;
try {
  for (let i = 0; i < 120; i++) { try { await fetch(`${BASE}/en`); break; } catch { await sleep(500); } }
  if (phase === "signup") {
    if (existsSync(FILE)) throw new Error("an identity from an earlier signup phase exists; run the register phase or remove it deliberately");
    const stamp = Date.now().toString(36);
    // Staging GoTrue refuses test.nuovasolution.com on PUBLIC sign-up (email_address_invalid, 2026-09-22);
    // NEW_IDENTITY_EMAIL supplies a deliverable address instead (it is written to the secure store only).
    id = { email: process.env.NEW_IDENTITY_EMAIL || `web.impl.e2e+${stamp}@test.nuovasolution.com`, password: randomBytes(18).toString("base64url") + "aA1!" };
    writeFileSync(FILE, `${id.email}\n${id.password}\n`, { mode: 0o600 });
    const r = await post("/api/bff/signup", { name: "Web Impl E2E", agency_name: `stg_web_impl_${stamp}`, email: id.email, password: id.password, language: "es" });
    check("R1", "sign-up through the BFF answers 'confirm your e-mail', sets no session", r.status === 201 && r.body?.details?.next === "confirm" && !r.cookie.includes("nuova_session"), { status: r.status, code: r.body?.code, next: r.body?.details?.next });
    if (r.status !== 201) { const { rmSync } = await import("node:fs"); rmSync(FILE, { force: true }); } // nothing was created
    const l = await post("/api/bff/auth/login", { email: id.email, password: id.password });
    check("R2", "login before the confirmation click is refused (email_not_confirmed)", l.status === 400 && l.body?.code === "email_not_confirmed", l.body?.code);
    results.identity = { address_pattern: "web.impl.e2e+<stamp>@test.nuovasolution.com", stamp, stored_in: "secure store stg_web_impl_new_identity.txt" };
    if (r.status === 201 && !process.env.NEW_IDENTITY_EMAIL) results.next_signal = `STG_CONFIRM_REQUEST = web.impl.e2e+${stamp}@test.nuovasolution.com`;
  } else if (phase === "register") {
    const [email, password] = readFileSync(FILE, "utf8").split(/\r?\n/).map((x) => x.trim());
    id = { email, password };
    const l = await post("/api/bff/auth/login", { email, password });
    check("R3", "after the confirmation: login works", l.status === 200 && l.cookie.includes("nuova_session"), l.status);
    let s = await get("/api/bff/onboarding/state", l.cookie);
    check("R4", "a confirmed user without an agency is sent to registration", s.status === 200 && s.body?.details?.next === "register", s.body?.details?.next);
    const r = await post("/api/bff/register", { agency_name: `stg_web_impl_${email.match(/\+(\w+)@/)?.[1] ?? "x"}`, language: "es", timezone: "Europe/Madrid" }, l.cookie);
    check("R5", "register: agency, first membership and trial created in one backend transaction", r.status === 200 && r.body?.details?.outcome === "registered" && r.body?.details?.trial?.status === "active", r.body?.details);
    const again = await post("/api/bff/register", { agency_name: "second try", language: "es", timezone: "Europe/Madrid" }, l.cookie);
    check("R6", "a repeat answers already_registered (no second agency)", again.body?.details?.outcome === "already_registered", again.body?.details?.outcome);
    s = await get("/api/bff/onboarding/state", l.cookie);
    check("R7", "the new agency's onboarding is readable: 10 steps, readiness, trial", s.body?.details?.next === "onboarding" && s.body?.details?.state?.steps?.length === 10 && Array.isArray(s.body?.details?.readiness?.gates) && s.body?.details?.trial?.status === "active", { steps: s.body?.details?.state?.steps?.length, gates: s.body?.details?.readiness?.gates?.length, trial: s.body?.details?.trial?.status });
  } else {
    throw new Error("phase must be signup or register");
  }
} catch (e) {
  check("RUNNER", "the harness completed", false, String(e?.message ?? e));
} finally {
  srv.kill();
  results.finished_utc = new Date().toISOString();
  results.passed = results.checks.filter((c) => c.pass).length;
  results.failed = results.checks.filter((c) => !c.pass).length;
  const text = JSON.stringify(results, null, 1);
  if (id && (text.includes(id.password) || text.includes(PUB))) { console.error("ABORT: a secret would have been written"); process.exit(4); }
  writeFileSync(join(OUT, `new-identity-${phase}.json`), text);
  if (results.next_signal) console.log(results.next_signal);
  console.log(`${results.passed} passed, ${results.failed} failed`);
  process.exit(results.failed ? 1 : 0);
}
