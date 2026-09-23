// Independent reviewer probe, second pass: the two checks whose first run used wrong field names,
// plus the registration-path questions that can be answered without a new identity.
// Staging only, same rules: no secret, cookie or token in the output.
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REF = "fflmmzapksycjfdcjdtd";
const ROOT = process.argv[2], OUT = process.argv[3];
const SECRETS = "C:/Users/Usuario/.nuova-secrets";
const PORT = 3132, BASE = `http://localhost:${PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const cred = (f) => { const [email, password] = readFileSync(join(SECRETS, f), "utf8").split(/\r?\n/); return { email: email.trim(), password: password.trim() }; };
const OWNER = cred("stg_web_e2e_owner.txt");
const PUB = readFileSync(join(SECRETS, "stg_publishable_key.txt"), "utf8").trim();

const res = { started_utc: new Date().toISOString(), commit: "6fbe45f", target: `staging ${REF}`, checks: [] };
const check = (id, what, pass, evidence) => { res.checks.push({ id, what, pass: Boolean(pass), evidence }); console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what} :: ${JSON.stringify(evidence)}`); };
const kids = [];
const cookieOf = (r) => (r.headers.getSetCookie?.() ?? []).map((c) => c.split(";")[0]).filter((c) => c.startsWith("nuova_")).join("; ");
const post = (p, body, cookie) => fetch(`${BASE}${p}`, { method: "POST", redirect: "manual", headers: { "Content-Type": "application/json", Cookie: cookie ?? "" }, body: JSON.stringify(body) }).then(async (r) => ({ status: r.status, body: await r.json().catch(() => null), cookie: cookieOf(r) }));
const get = (p, cookie) => fetch(`${BASE}${p}`, { redirect: "manual", headers: { Cookie: cookie ?? "" } }).then(async (r) => ({ status: r.status, body: await r.json().catch(() => null) }));

try {
  kids.push(spawn(process.execPath, [join(ROOT, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(PORT)], { cwd: ROOT, env: { ...process.env, NUOVA_INTEGRATION_MODE: "staging", NEXT_PUBLIC_SUPABASE_URL: `https://${REF}.supabase.co`, NEXT_PUBLIC_SUPABASE_ANON_KEY: PUB, NUOVA_STAGING_TARGET_APPROVED: REF }, stdio: "ignore" }));
  for (let i = 0; i < 120; i++) { try { await fetch(`${BASE}/en`); break; } catch { await sleep(500); } }

  const ownerCk = (await post("/api/bff/auth/login", { email: OWNER.email, password: OWNER.password })).cookie;

  // RV-18b CRM choice with the correct notice version
  const ack = await post("/api/bff/consent/connect-notice", { source: "google_sheets", notice_version: "connect-notice-v1-draft" }, ownerCk);
  const ackCk = [ownerCk, ack.cookie].filter(Boolean).join("; ");
  const sheets = await post("/api/bff/crm/select", { provider: "google_sheets", intent: "select" }, ackCk);
  const txt = JSON.stringify(sheets.body ?? {});
  check("RV-18b", "with the acknowledged notice the Sheets choice goes through and is never reported as connected",
    ack.status === 200 && sheets.status === 200 && !/"(connected|connection_state)":\s*"?true|"state":"connected"/.test(txt),
    { ack: ack.status, recorded_in: ack.body?.details?.recorded_in, select: sheets.status, crm_of_record: sheets.body?.details?.crm_of_record, state: sheets.body?.details?.state });
  const backNow = await post("/api/bff/crm/select", { provider: "nuovasolution", intent: "select" }, ownerCk);

  // RV-21b legal with the contract's field names, then the read-back honesty flag
  const legal = await post("/api/bff/onboarding/legal", { legal_name: "stg_web_e2e_agency S.L. (TEST)", tax_id: "B12345674", address_line: "Calle de Prueba 1", address_city: "Marbella", address_postal_code: "29600", address_region: "Malaga", privacy_url: "https://example.org/stg-web-e2e/privacy", terms_url: "https://example.org/stg-web-e2e/terms" }, ownerCk);
  const state = await get("/api/bff/onboarding/state", ownerCk);
  const legalBack = state.body?.details?.profile?.legal ?? {};
  check("RV-21b", "legal data saves against the backend; the read-back gap is declared, not hidden",
    legal.status === 200 && legalBack.readable === false,
    { save: legal.status, saved_legal_name: Boolean(legal.body?.details?.profile?.legal?.legal_name), readable_flag: legalBack.readable, values_after_reload: Object.entries(legalBack).filter(([k, v]) => k !== "readable" && v).length });

  // RV-23 the rate limit the owner hit: a code the page can show, never a silent failure
  let seen = [];
  const throwaway = `rv-${Date.now()}@example.invalid`;
  for (let i = 0; i < 12; i++) { const r = await post("/api/bff/auth/login", { email: throwaway, password: "wrong-password-0000" }); seen.push(`${r.status}:${r.body?.code ?? ""}`); if (r.status === 429) break; }
  check("RV-23", "repeated failed logins end in a named rate limit, not an unhandled error",
    seen.some((s) => s.startsWith("429")), { attempts: seen.length, last: seen.slice(-3) });

  // RV-24 does the documented sign-up blocker still stand
  const su = await post("/api/bff/signup", { email: `rv-${Date.now()}@test.nuovasolution.com`, password: "Reviewer-probe-2026!", full_name: "Reviewer Probe", agency_name: "RV PROBE", language: "en" });
  check("RV-24", "sign-up with the test domain still refused by the identity server, mapped to a field error",
    su.status === 400 && ["invalid_email", "invalid_input"].includes(su.body?.code), { status: su.status, code: su.body?.code });

  // RV-25 resume contract: what the server tells a signed-in user to do next
  const st = await get("/api/bff/onboarding/state", ownerCk);
  check("RV-25", "a signed-in identity is routed by the backend's own next step",
    ["register", "onboarding"].includes(String(st.body?.details?.state?.next ?? st.body?.details?.next ?? "")),
    { next: st.body?.details?.state?.next ?? st.body?.details?.next ?? null, authorized: st.body?.details?.state?.authorized ?? null });

  // RV-26 trial line comes from the backend
  const trial = await get("/api/bff/trial/status", ownerCk);
  check("RV-26", "the trial line is backend data, not a constant", trial.status === 200 && Boolean(trial.body?.details?.status), { status: trial.status, trial_status: trial.body?.details?.status, has_expiry: Boolean(trial.body?.details?.expires_at ?? trial.body?.details?.days_left) });

  // RV-27 entitlements never claim a paid state
  const ent = await get("/api/bff/entitlements", ownerCk);
  check("RV-27", "entitlements do not claim a paid plan for a trial agency",
    ent.status === 200 && !/"(paid|active_subscription)":\s*true/.test(JSON.stringify(ent.body ?? {})), { status: ent.status, keys: Object.keys(ent.body?.details ?? {}).slice(0, 8) });
  res.crm_restored = backNow.status;
} catch (e) {
  res.error = String(e?.message ?? e);
  console.error("ERROR", res.error);
} finally {
  res.finished_utc = new Date().toISOString();
  res.summary = { pass: res.checks.filter((c) => c.pass).length, total: res.checks.length };
  writeFileSync(OUT, JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res.summary));
  for (const k of kids) k.kill();
  process.exit(0);
}
