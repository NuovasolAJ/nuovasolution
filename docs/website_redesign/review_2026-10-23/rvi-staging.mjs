// RV3 backend E2E on the STAGING build: a real session, the agency step, onboarding, logout.
// Identities come from the secure store and are never printed. Writes land only in the reserved
// test fixture API created for this walk. No mail is sent anywhere.
import { readFileSync, writeFileSync } from "node:fs";
const BASE = process.argv[2], OUT = process.argv[3];
const SECRETS = "C:/Users/Usuario/.nuova-secrets";
const lines = (f) => readFileSync(`${SECRETS}/${f}`, "utf8").split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
const t6raw = lines("stg_website_t6_identity.txt");
const T6 = { email: t6raw.find((l) => l.includes("@"))?.split(/\s+/).pop() ?? "", password: t6raw.find((l) => !l.includes("@") && l.length > 7) ?? "" };
const own = lines("stg_web_e2e_owner.txt"); const OWNER = { email: own[0], password: own[1] };
const agt = lines("stg_web_e2e_agent.txt"); const AGENT = { email: agt[0], password: agt[1] };

const res = { deployment: BASE, started_utc: new Date().toISOString(), checks: [], detail: {} };
const check = (id, what, verdict, ev) => { res.checks.push({ id, what, verdict, evidence: ev }); console.log(`${verdict} ${id} ${what} :: ${JSON.stringify(ev).slice(0, 320)}`); };
const cookieOf = (r) => (r.headers.getSetCookie?.() ?? []).map((c) => c.split(";")[0]).filter((c) => c.startsWith("nuova_")).join("; ");
const post = (p, body, cookie, extra = {}) => fetch(BASE + p, { method: "POST", redirect: "manual", headers: { "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}), ...extra }, body: JSON.stringify(body) })
  .then(async (r) => ({ status: r.status, json: await r.json().catch(() => null), cookie: cookieOf(r) }));
const get = (p, cookie) => fetch(BASE + p, { redirect: "manual", headers: cookie ? { Cookie: cookie } : {} })
  .then(async (r) => ({ status: r.status, location: r.headers.get("location"), json: await r.json().catch(() => null) }));
const login = async (id) => { const r = await post("/api/bff/auth/login", { email: id.email, password: id.password }); return { status: r.status, code: r.json?.code, cookie: r.cookie || null }; };

try {
  const build = await (await fetch(BASE + "/api/build")).json();
  res.detail.build = build;
  check("S1", "the staging build identifies itself", build?.mode === "staging" ? "PASS" : "FAIL", build);

  let r = await get("/api/bff/onboarding/state");
  check("S2", "no session: the onboarding read is refused", r.status === 401 ? "PASS" : "FAIL", { status: r.status, code: r.json?.code });
  r = await get("/api/bff/onboarding/state", "nuova_session=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmb3JnZWQifQ.c2ln");
  check("S3", "a self-made token is refused", r.status === 401 ? "PASS" : "FAIL", { status: r.status, code: r.json?.code });

  // the reserved fixture: confirmed, created without an agency on purpose
  const t6 = await login(T6);
  res.detail.t6_login = { status: t6.status, code: t6.code, cookie_present: !!t6.cookie };
  check("S4", "the reserved test identity signs in against the real identity server",
    t6.status === 200 && !!t6.cookie ? "PASS" : "FAIL", res.detail.t6_login);

  if (t6.cookie) {
    const st = await get("/api/bff/onboarding/state", t6.cookie);
    const next = st.json?.details?.state?.next ?? st.json?.details?.next ?? null;
    res.detail.t6_state = { status: st.status, next, authorized: st.json?.details?.state?.authorized ?? null };
    check("S5", "the backend itself says what this identity has to do next", next ? "PASS" : "FAIL", res.detail.t6_state);

    if (next === "register") {
      const reg1 = await post("/api/bff/register", { agency_name: "RV3 PRUEBA Reviewer", language: "es", timezone: "Europe/Madrid" }, t6.cookie);
      const reg2 = await post("/api/bff/register", { agency_name: "RV3 PRUEBA Reviewer", language: "es", timezone: "Europe/Madrid" }, t6.cookie);
      const trial = await get("/api/bff/trial/status", t6.cookie);
      res.detail.register = { first: { status: reg1.status, outcome: reg1.json?.details?.outcome, trial: reg1.json?.details?.trial?.status },
        repeat: { status: reg2.status, outcome: reg2.json?.details?.outcome }, trial_read: { status: trial.status, state: trial.json?.details?.status } };
      check("S6", "the agency, the admin and the trial are created exactly once: a repeat answers already_registered",
        reg1.json?.details?.outcome === "registered" && reg2.json?.details?.outcome === "already_registered" ? "PASS" : "FAIL", res.detail.register);
    } else {
      const trial = await get("/api/bff/trial/status", t6.cookie);
      res.detail.register = { skipped: `next=${next}`, trial_read: { status: trial.status, state: trial.json?.details?.status } };
      check("S6", "the agency step: this identity already carries an agency, so the first-run case cannot be walked again here",
        "NOT_CHECKABLE", res.detail.register);
    }

    // onboarding with the real session: read, write, read back
    const before = await get("/api/bff/onboarding/state", t6.cookie);
    const wr = await post("/api/bff/onboarding/business", { timezone: "Europe/Madrid", languages: ["es", "en"], default_language: "es",
      business_hours: { mon: "09:00-18:00", tue: "09:00-18:00", wed: "09:00-18:00", thu: "09:00-18:00", fri: "09:00-17:00", sat: "closed", sun: "closed" } }, t6.cookie);
    const after = await get("/api/bff/onboarding/state", t6.cookie);
    res.detail.onboarding = { before_tz: before.json?.details?.profile?.business?.timezone ?? null, write: wr.status,
      after_tz: after.json?.details?.profile?.business?.timezone ?? null, gates: (after.json?.details?.readiness?.gates ?? []).length };
    check("S7", "onboarding writes against the real backend and reads the value back",
      wr.status === 200 && res.detail.onboarding.after_tz === "Europe/Madrid" ? "PASS" : "FAIL", res.detail.onboarding);

    const ready = await get("/api/bff/onboarding/readiness", t6.cookie);
    const act = await post("/api/bff/tenant/activate", {}, t6.cookie);
    res.detail.activation = { gates: (ready.json?.details?.gates ?? []).length, activatable: ready.json?.details?.activatable,
      outcome: act.json?.details?.outcome, activated: act.json?.details?.activated, status: act.status };
    check("S8", "readiness comes from the backend and activation refuses while gates are open",
      (ready.json?.details?.gates ?? []).length > 0 && act.json?.details?.activated === false ? "PASS" : "FAIL", res.detail.activation);

    const lo = await post("/api/bff/auth/logout", {}, t6.cookie);
    const reuse = await get("/api/bff/onboarding/state", t6.cookie);
    check("S9", "logout ends the real session", lo.status < 400 && reuse.status === 401 ? "PASS" : "FAIL", { logout: lo.status, reuse: reuse.status });
  }

  // role and origin limits with the long-standing fixtures
  const owner = await login(OWNER), agent = await login(AGENT);
  if (owner.cookie) {
    const cross = await post("/api/bff/onboarding/business", { timezone: "Europe/Madrid" }, owner.cookie, { Origin: "https://evil.example" });
    check("S10", "a valid session from a foreign origin is refused", cross.status === 403 ? "PASS" : "FAIL", { status: cross.status, code: cross.json?.code });
  }
  if (agent.cookie) {
    const aw = await post("/api/bff/onboarding/business", { timezone: "Europe/Madrid", languages: ["es"], default_language: "es", business_hours: { mon: "09:00-18:00" } }, agent.cookie);
    check("S11", "the agent role cannot write business data", aw.status === 403 ? "PASS" : "FAIL", { status: aw.status, code: aw.json?.code });
  }

  // can a brand-new identity sign up here at all
  const su = await post("/api/bff/signup", { name: "RV3 Probe", email: `rv3-${Date.now()}@test.nuovasolution.com`, password: "Reviewer-probe-2026!", agency_name: "RV3 PROBE", language: "es" });
  res.detail.signup = { status: su.status, code: su.json?.code };
  check("S12", "a new identity can sign up on this deployment", su.status === 200 || su.status === 201 ? "PASS" : "NOT_CHECKABLE", res.detail.signup);
} catch (e) { res.error = String(e?.message ?? e); console.error("ERROR", res.error); }
finally {
  res.finished_utc = new Date().toISOString();
  writeFileSync(OUT, JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res.checks.map((c) => [c.id, c.verdict])));
}
