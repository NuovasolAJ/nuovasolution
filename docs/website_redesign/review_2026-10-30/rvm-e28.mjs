// E28 in one pass with API's own confirmed reviewer identity. The store may hold bare lines or
// key=value / key: value pairs; both are read. No value is ever printed.
import { readFileSync, writeFileSync } from "node:fs";

const BASE = process.argv[2], OUT = process.argv[3];
const FILE = "C:/Users/Usuario/.nuova-secrets/stg_website_e28_identity.txt";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const PAIR_RE = /^([A-Za-z_]+)\s*[:=]\s*(.+)$/;

const lines = readFileSync(FILE, "utf8").replace(/^\uFEFF/, "").split(/\r?\n/)
  .map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
const pairs = new Map();
const bare = [];
for (const l of lines) {
  const m = l.match(PAIR_RE);
  if (m) pairs.set(m[1].toLowerCase(), m[2].trim());
  else bare.push(l);
}
const pick = (names) => { for (const n of names) if (pairs.has(n)) return pairs.get(n); return null; };
const email = pick(["email", "user", "address", "mail"]) ?? bare.find((l) => EMAIL_RE.test(l)) ?? "";
const password = pick(["password", "pass", "pw"]) ?? bare.find((l) => l !== email) ?? "";

const res = { deployment: BASE, started_utc: new Date().toISOString(),
  parsed: { lines: lines.length, pairs: [...pairs.keys()], email_valid: EMAIL_RE.test(email), password_len: password.length },
  checks: [], detail: {} };
const check = (id, what, verdict, ev) => { res.checks.push({ id, what, verdict, evidence: ev }); console.log(`${verdict} ${id} ${what} :: ${JSON.stringify(ev).slice(0, 320)}`); };
const cookieOf = (r) => (r.headers.getSetCookie?.() ?? []).map((c) => c.split(";")[0]).filter((c) => c.startsWith("nuova_")).join("; ");
const post = (p, body, cookie) => fetch(BASE + p, { method: "POST", redirect: "manual", headers: { "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}) }, body: JSON.stringify(body) })
  .then(async (r) => ({ status: r.status, json: await r.json().catch(() => null), cookie: cookieOf(r), flags: (r.headers.getSetCookie?.() ?? []).find((c) => c.startsWith("nuova_session=")) ?? null }));
const get = (p, cookie) => fetch(BASE + p, { redirect: "manual", headers: cookie ? { Cookie: cookie } : {} })
  .then(async (r) => ({ status: r.status, location: r.headers.get("location"), json: await r.json().catch(() => null) }));

try {
  const build = await (await fetch(BASE + "/api/build")).json();
  res.detail.build = build;
  check("O1", "the build under review identifies itself", build?.mode === "staging" ? "PASS" : "FAIL", build);
  check("O0", "the stored identity is readable", res.parsed.email_valid && res.parsed.password_len > 0 ? "PASS" : "FAIL", res.parsed);

  const lg = await post("/api/bff/auth/login", { email, password });
  res.detail.login = { status: lg.status, code: lg.json?.code, session: !!lg.cookie,
    httpOnly: /HttpOnly/i.test(lg.flags ?? ""), secure: /Secure/i.test(lg.flags ?? ""), sameSite: (lg.flags ?? "").match(/SameSite=\w+/i)?.[0] ?? null };
  check("O2", "the reviewer identity signs in on this deployment", lg.status === 200 && !!lg.cookie ? "PASS" : "FAIL", res.detail.login);

  if (lg.cookie) {
    const st = await get("/api/bff/onboarding/state", lg.cookie);
    const next = st.json?.details?.state?.next ?? st.json?.details?.next ?? null;
    res.detail.state = { status: st.status, next, business_tz: st.json?.details?.profile?.business?.timezone ?? null };
    check("O3", "the backend names the next step", st.status === 200 && next ? "PASS" : "FAIL", res.detail.state);

    if (next === "register") {
      const a = await post("/api/bff/register", { agency_name: "RV5 PRUEBA Reviewer", language: "es", timezone: "Europe/Madrid" }, lg.cookie);
      const b = await post("/api/bff/register", { agency_name: "RV5 PRUEBA Reviewer", language: "es", timezone: "Europe/Madrid" }, lg.cookie);
      res.detail.register = { first: { status: a.status, outcome: a.json?.details?.outcome, trial: a.json?.details?.trial?.status }, repeat: { status: b.status, outcome: b.json?.details?.outcome } };
      check("O3b", "agency, admin and trial exactly once; a repeat answers already_registered",
        a.json?.details?.outcome === "registered" && b.json?.details?.outcome === "already_registered" ? "PASS" : "FAIL", res.detail.register);
    }

    const tr = await get("/api/bff/trial/status", lg.cookie);
    res.detail.trial = { status: tr.status, state: tr.json?.details?.status ?? null, has_horizon: !!(tr.json?.details?.expires_at ?? tr.json?.details?.days_left) };
    check("O4", "the trial line is backend data", tr.status === 200 && res.detail.trial.state ? "PASS" : "FAIL", res.detail.trial);

    const wr = await post("/api/bff/onboarding/business", { timezone: "Europe/Madrid", languages: ["es", "en"], default_language: "es",
      business_hours: { mon: "09:00-18:00", tue: "09:00-18:00", wed: "09:00-18:00", thu: "09:00-18:00", fri: "09:00-17:00", sat: "closed", sun: "closed" } }, lg.cookie);
    const after = await get("/api/bff/onboarding/state", lg.cookie);
    res.detail.onboarding = { write: wr.status, code: wr.json?.code, after_tz: after.json?.details?.profile?.business?.timezone ?? null };
    check("O5", "onboarding writes to the real backend and reads the value back",
      wr.status === 200 && res.detail.onboarding.after_tz === "Europe/Madrid" ? "PASS" : "FAIL", res.detail.onboarding);

    const ready = await get("/api/bff/onboarding/readiness", lg.cookie);
    const act = await post("/api/bff/tenant/activate", {}, lg.cookie);
    res.detail.activation = { gates: (ready.json?.details?.gates ?? []).length, activatable: ready.json?.details?.activatable ?? null, outcome: act.json?.details?.outcome ?? null, activated: act.json?.details?.activated ?? null };
    check("O6", "readiness is backend data and activation refuses while gates are open",
      (ready.json?.details?.gates ?? []).length > 0 && act.json?.details?.activated === false ? "PASS" : "FAIL", res.detail.activation);

    const pages = {};
    for (const p of ["/es/app", "/es/onboarding", "/es/app/reports"]) { const r = await get(p, lg.cookie); pages[p] = { status: r.status, location: r.location }; }
    res.detail.pages = pages;
    check("O7", "with the session the inner pages open instead of redirecting", Object.values(pages).every((v) => v.status === 200) ? "PASS" : "FAIL", pages);

    const lo = await post("/api/bff/auth/logout", {}, lg.cookie);
    const reuse = await get("/api/bff/onboarding/state", lg.cookie);
    check("O8", "logout ends the session", lo.status < 400 && reuse.status === 401 ? "PASS" : "FAIL", { logout: lo.status, reuse: reuse.status });
  }
} catch (e) { res.error = String(e?.message ?? e); console.error("ERROR", res.error); }
finally {
  res.finished_utc = new Date().toISOString();
  writeFileSync(OUT, JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res.checks.map((c) => [c.id, c.verdict])));
}
