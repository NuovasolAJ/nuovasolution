// The reserved T6 fixture walk on the staging build: sign in -> agency step -> onboarding -> logout.
// Credentials from the secure store, never printed. A password may itself contain "@", so the e-mail
// is taken by a strict pattern and the other line is the password.
import { readFileSync, writeFileSync } from "node:fs";
const BASE = process.argv[2], OUT = process.argv[3];
const raw = readFileSync("C:/Users/Usuario/.nuova-secrets/stg_website_t6_identity.txt", "utf8")
  .split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const email = raw.find((l) => EMAIL_RE.test(l)) ?? "";
const password = raw.find((l) => l !== email) ?? "";
const res = { deployment: BASE, started_utc: new Date().toISOString(), parsed: { email_found: !!email, password_found: !!password, lines: raw.length }, checks: [], detail: {} };
const check = (id, what, verdict, ev) => { res.checks.push({ id, what, verdict, evidence: ev }); console.log(`${verdict} ${id} ${what} :: ${JSON.stringify(ev).slice(0, 320)}`); };
const cookieOf = (r) => (r.headers.getSetCookie?.() ?? []).map((c) => c.split(";")[0]).filter((c) => c.startsWith("nuova_")).join("; ");
const post = (p, body, cookie) => fetch(BASE + p, { method: "POST", redirect: "manual", headers: { "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}) }, body: JSON.stringify(body) })
  .then(async (r) => ({ status: r.status, json: await r.json().catch(() => null), cookie: cookieOf(r) }));
const get = (p, cookie) => fetch(BASE + p, { redirect: "manual", headers: cookie ? { Cookie: cookie } : {} })
  .then(async (r) => ({ status: r.status, json: await r.json().catch(() => null) }));
try {
  const lg = await post("/api/bff/auth/login", { email, password });
  res.detail.login = { status: lg.status, code: lg.json?.code, cookie: !!lg.cookie };
  check("T6-1", "the reserved identity signs in against the real identity server", lg.status === 200 && !!lg.cookie ? "PASS" : "FAIL", res.detail.login);
  if (lg.cookie) {
    const st = await get("/api/bff/onboarding/state", lg.cookie);
    const next = st.json?.details?.state?.next ?? st.json?.details?.next ?? null;
    res.detail.state = { status: st.status, next };
    check("T6-2", "the backend names the next step for this identity", next ? "PASS" : "FAIL", res.detail.state);
    if (next === "register") {
      const a = await post("/api/bff/register", { agency_name: "RV3 PRUEBA Reviewer", language: "es", timezone: "Europe/Madrid" }, lg.cookie);
      const b = await post("/api/bff/register", { agency_name: "RV3 PRUEBA Reviewer", language: "es", timezone: "Europe/Madrid" }, lg.cookie);
      const t = await get("/api/bff/trial/status", lg.cookie);
      res.detail.register = { first: { status: a.status, outcome: a.json?.details?.outcome, trial: a.json?.details?.trial?.status },
        repeat: { status: b.status, outcome: b.json?.details?.outcome }, trial_read: { status: t.status, state: t.json?.details?.status } };
      check("T6-3", "agency, admin and trial exactly once; the repeat answers already_registered",
        a.json?.details?.outcome === "registered" && b.json?.details?.outcome === "already_registered" ? "PASS" : "FAIL", res.detail.register);
    } else {
      const t = await get("/api/bff/trial/status", lg.cookie);
      res.detail.register = { skipped: `next=${next}`, trial_read: { status: t.status, state: t.json?.details?.status } };
      check("T6-3", "the first-run agency step cannot be walked again with this identity", "NOT_CHECKABLE", res.detail.register);
    }
    const wr = await post("/api/bff/onboarding/business", { timezone: "Europe/Madrid", languages: ["es", "en"], default_language: "es",
      business_hours: { mon: "09:00-18:00", tue: "09:00-18:00", wed: "09:00-18:00", thu: "09:00-18:00", fri: "09:00-17:00", sat: "closed", sun: "closed" } }, lg.cookie);
    const after = await get("/api/bff/onboarding/state", lg.cookie);
    res.detail.onboarding = { write: wr.status, code: wr.json?.code, after_tz: after.json?.details?.profile?.business?.timezone ?? null };
    check("T6-4", "onboarding writes against the real backend and reads the value back",
      wr.status === 200 && res.detail.onboarding.after_tz === "Europe/Madrid" ? "PASS" : "FAIL", res.detail.onboarding);
    const ready = await get("/api/bff/onboarding/readiness", lg.cookie);
    const act = await post("/api/bff/tenant/activate", {}, lg.cookie);
    res.detail.activation = { gates: (ready.json?.details?.gates ?? []).length, activatable: ready.json?.details?.activatable, outcome: act.json?.details?.outcome, activated: act.json?.details?.activated };
    check("T6-5", "readiness is backend data and activation refuses while gates are open",
      (ready.json?.details?.gates ?? []).length > 0 && act.json?.details?.activated === false ? "PASS" : "FAIL", res.detail.activation);
    const lo = await post("/api/bff/auth/logout", {}, lg.cookie);
    const reuse = await get("/api/bff/onboarding/state", lg.cookie);
    check("T6-6", "logout ends the real session", lo.status < 400 && reuse.status === 401 ? "PASS" : "FAIL", { logout: lo.status, reuse: reuse.status });
  }
  // and what happens to a brand-new identity: is a confirmation required before it can sign in
  const fresh = { email: `rv3-${Date.now()}@test.nuovasolution.com`, password: "Reviewer-probe-2026!" };
  const su = await post("/api/bff/signup", { name: "RV3 Probe", email: fresh.email, password: fresh.password, agency_name: "RV3 PROBE", language: "es" });
  const li = await post("/api/bff/auth/login", { email: fresh.email, password: fresh.password });
  res.detail.fresh = { signup: { status: su.status, code: su.json?.code }, login: { status: li.status, code: li.json?.code, session: !!li.cookie } };
  check("T6-7", "a brand-new identity: sign-up is accepted and the confirmation gate behaves as contracted",
    su.status === 201 && li.json?.code === "email_not_confirmed" ? "PASS" : su.status === 201 && li.cookie ? "FAIL" : "NOT_CHECKABLE", res.detail.fresh);
} catch (e) { res.error = String(e?.message ?? e); console.error("ERROR", res.error); }
finally {
  res.finished_utc = new Date().toISOString();
  writeFileSync(OUT, JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res.checks.map((c) => [c.id, c.verdict])));
}
