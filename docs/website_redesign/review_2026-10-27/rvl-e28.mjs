// E28 on the deployment the owner walked (596679b staging, q98d818q2): origin, login, onboarding,
// trial line — with API's card identity from the secure store. Nothing is printed but states.
import { readFileSync, writeFileSync } from "node:fs";
const BASE = process.argv[2], OUT = process.argv[3];
const raw = readFileSync("C:/Users/Usuario/.nuova-secrets/stg_website_e28_identity.txt", "utf8")
  .split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const email = raw.find((l) => EMAIL_RE.test(l)) ?? "";
const password = raw.find((l) => l !== email) ?? "";
const res = { deployment: BASE, started_utc: new Date().toISOString(), parsed: { email_found: !!email, password_found: !!password, lines: raw.length }, checks: [], detail: {} };
const check = (id, what, verdict, ev) => { res.checks.push({ id, what, verdict, evidence: ev }); console.log(`${verdict} ${id} ${what} :: ${JSON.stringify(ev).slice(0, 320)}`); };
const cookieOf = (r) => (r.headers.getSetCookie?.() ?? []).map((c) => c.split(";")[0]).filter((c) => c.startsWith("nuova_")).join("; ");
const post = (p, body, cookie) => fetch(BASE + p, { method: "POST", redirect: "manual", headers: { "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}) }, body: JSON.stringify(body) })
  .then(async (r) => ({ status: r.status, json: await r.json().catch(() => null), cookie: cookieOf(r), setCookie: (r.headers.getSetCookie?.() ?? []).map((c) => c.split("=")[0] + "=<redacted>; " + c.split(";").slice(1).join(";").trim()) }));
const get = (p, cookie) => fetch(BASE + p, { redirect: "manual", headers: cookie ? { Cookie: cookie } : {} })
  .then(async (r) => ({ status: r.status, location: r.headers.get("location"), json: await r.json().catch(() => null) }));
try {
  const build = await (await fetch(BASE + "/api/build")).json();
  res.detail.build = build;
  check("O1", "the deployment the owner used identifies itself", build?.deployment && build?.mode === "staging" ? "PASS" : "FAIL", build);

  const lg = await post("/api/bff/auth/login", { email, password });
  res.detail.login = { status: lg.status, code: lg.json?.code, session: !!lg.cookie, cookieFlags: lg.setCookie?.find((c) => c.startsWith("nuova_session")) ?? null };
  check("O2", "the confirmed identity signs in on this deployment", lg.status === 200 && !!lg.cookie ? "PASS" : "FAIL", { status: lg.status, code: lg.json?.code, session: !!lg.cookie });

  if (lg.cookie) {
    const st = await get("/api/bff/onboarding/state", lg.cookie);
    const next = st.json?.details?.state?.next ?? st.json?.details?.next ?? null;
    const profile = st.json?.details?.profile ?? null;
    res.detail.state = { status: st.status, next, business_tz: profile?.business?.timezone ?? null, crm: st.json?.details?.crm ?? null };
    check("O3", "the backend names the next step for this identity", st.status === 200 && next ? "PASS" : "FAIL", res.detail.state);

    const tr = await get("/api/bff/trial/status", lg.cookie);
    res.detail.trial = { status: tr.status, state: tr.json?.details?.status ?? null, expires: !!(tr.json?.details?.expires_at ?? tr.json?.details?.days_left) };
    check("O4", "the trial line comes from the backend", tr.status === 200 && res.detail.trial.state ? "PASS" : "FAIL", res.detail.trial);

    const ready = await get("/api/bff/onboarding/readiness", lg.cookie);
    res.detail.readiness = { status: ready.status, gates: (ready.json?.details?.gates ?? []).length, activatable: ready.json?.details?.activatable ?? null };
    check("O5", "readiness is backend data", ready.status === 200 && res.detail.readiness.gates > 0 ? "PASS" : "FAIL", res.detail.readiness);

    // the pages the owner sees with that session
    const pages = {};
    for (const p of ["/es/app", "/es/onboarding", "/es/app/reports"]) { const r = await get(p, lg.cookie); pages[p] = { status: r.status, location: r.location }; }
    res.detail.pages = pages;
    check("O6", "with the session the inner pages open instead of redirecting to the login",
      Object.values(pages).every((v) => v.status === 200) ? "PASS" : "FAIL", pages);

    const lo = await post("/api/bff/auth/logout", {}, lg.cookie);
    const reuse = await get("/api/bff/onboarding/state", lg.cookie);
    check("O7", "logout ends this session", lo.status < 400 && reuse.status === 401 ? "PASS" : "FAIL", { logout: lo.status, reuse: reuse.status });
  }
} catch (e) { res.error = String(e?.message ?? e); console.error("ERROR", res.error); }
finally {
  res.finished_utc = new Date().toISOString();
  writeFileSync(OUT, JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res.checks.map((c) => [c.id, c.verdict])));
}
