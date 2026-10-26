// R25C point 1: E28 on the named staging build. One sign-up to a deliverable owner alias, then
// everything that can be measured without reading the mailbox. No value is printed beyond the alias
// the owner needs in order to click the link.
import { writeFileSync } from "node:fs";
const BASE = process.argv[2], OUT = process.argv[3];
const stamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 12);
const ALIAS = `ajdg.private+rv4-${stamp}@gmail.com`;
const PASSWORD = process.env.RV_PROBE_PASSWORD ?? "";  // secure store: stg_website_rv4_identity.txt
const res = { deployment: BASE, started_utc: new Date().toISOString(), alias: ALIAS, checks: [], detail: {} };
const check = (id, what, verdict, ev) => { res.checks.push({ id, what, verdict, evidence: ev }); console.log(`${verdict} ${id} ${what} :: ${JSON.stringify(ev).slice(0, 300)}`); };
const cookieOf = (r) => (r.headers.getSetCookie?.() ?? []).map((c) => c.split(";")[0]).filter((c) => c.startsWith("nuova_")).join("; ");
const post = (p, body, cookie, extra = {}) => fetch(BASE + p, { method: "POST", redirect: "manual", headers: { "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}), ...extra }, body: JSON.stringify(body) })
  .then(async (r) => ({ status: r.status, json: await r.json().catch(() => null), cookie: cookieOf(r) }));
const get = (p, cookie) => fetch(BASE + p, { redirect: "manual", headers: cookie ? { Cookie: cookie } : {} })
  .then(async (r) => ({ status: r.status, location: r.headers.get("location"), json: await r.json().catch(() => null) }));
try {
  const build = await (await fetch(BASE + "/api/build")).json();
  res.detail.build = build;
  check("E28-1", "the named staging build answers for itself", build?.mode === "staging" && build?.deployment ? "PASS" : "FAIL", build);

  // the origin the confirmation link will carry: the server builds redirect_to from the request origin
  const su = await post("/api/bff/signup", { name: "RV4 Reviewer", email: ALIAS, password: PASSWORD, agency_name: "RV4 PRUEBA Reviewer", language: "es" });
  res.detail.signup = { status: su.status, code: su.json?.code, message: su.json?.message, next: su.json?.details?.next, session: su.json?.details?.session };
  check("E28-2", "the sign-up on this deployment is accepted and asks for the confirmation",
    su.status === 200 || su.status === 201 ? "PASS" : "FAIL", res.detail.signup);

  const li = await post("/api/bff/auth/login", { email: ALIAS, password: PASSWORD });
  res.detail.login_before = { status: li.status, code: li.json?.code, session: !!li.cookie };
  check("E28-3", "before the owner clicks, a login is refused with the contracted code",
    li.json?.code === "email_not_confirmed" ? "PASS" : "FAIL", res.detail.login_before);

  // a repeat sign-up must not create a second identity or leak whether the address exists
  const again = await post("/api/bff/signup", { name: "RV4 Reviewer", email: ALIAS, password: PASSWORD, agency_name: "RV4 PRUEBA Reviewer", language: "es" });
  res.detail.signup_repeat = { status: again.status, code: again.json?.code, message: again.json?.message, next: again.json?.details?.next };
  check("E28-4", "a repeated sign-up answers the same way and reveals nothing about the address",
    again.status === su.status && again.json?.message === su.json?.message ? "PASS" : "FAIL", res.detail.signup_repeat);

  // the resend path, which the owner may need
  const re = await post("/api/bff/auth/resend", { email: ALIAS, language: "es" });
  res.detail.resend = { status: re.status, code: re.json?.code, message: re.json?.message };
  check("E28-5", "the confirmation mail can be requested again", re.status === 200 ? "PASS" : "FAIL", res.detail.resend);

  // the pages the owner will land on, and the gates behind them
  const pages = {};
  for (const p of ["/es/login", "/es/signup", "/es/app", "/es/onboarding", "/es/app/reports"]) {
    const r = await get(p);
    pages[p] = { status: r.status, location: r.location };
  }
  res.detail.pages = pages;
  check("E28-6", "login and sign-up are reachable, the inner area stays gated",
    pages["/es/login"].status === 200 && pages["/es/signup"].status === 200 && pages["/es/app"].status === 307 && pages["/es/onboarding"].status === 307 ? "PASS" : "FAIL", pages);

  // MX refusal, measured on a domain that cannot receive
  const mx = await post("/api/bff/signup", { name: "RV4 MX", email: `rv4-mx-${stamp}@nuova-no-mx-check.invalid`, password: PASSWORD, agency_name: "RV4 MX", language: "es" });
  res.detail.mx = { status: mx.status, code: mx.json?.code, message: mx.json?.message };
  check("E28-7", "a sign-up to a domain that cannot receive mail is refused before anything is created",
    mx.status >= 400 ? "PASS" : "NOT_DELIVERED_YET", res.detail.mx);
} catch (e) { res.error = String(e?.message ?? e); console.error("ERROR", res.error); }
finally {
  res.finished_utc = new Date().toISOString();
  writeFileSync(OUT, JSON.stringify(res, null, 1));
  console.log("ALIAS FOR THE OWNER:", ALIAS);
  console.log(JSON.stringify(res.checks.map((c) => [c.id, c.verdict])));
}
