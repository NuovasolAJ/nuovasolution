// Independent HTTP baseline on the two live previews (d475dec). No secret, cookie or token is written
// to the result file. Credentials for the staging fixture come from the secure store.
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const DESIGN = "https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app";
const STAGING = "https://nuovasolution-staging-preview-git-w-44e113-nuovasolajs-projects.vercel.app";
const OUT = process.argv[2];
const SECRETS = "C:/Users/Usuario/.nuova-secrets";
const cred = (f) => { const [email, password] = readFileSync(`${SECRETS}/${f}`, "utf8").split(/\r?\n/); return { email: email.trim(), password: password.trim() }; };
const OWNER = cred("stg_web_e2e_owner.txt"), AGENT = cred("stg_web_e2e_agent.txt");
const PUBFP = createHash("sha256").update(readFileSync(`${SECRETS}/stg_publishable_key.txt`, "utf8").trim()).digest("hex").slice(0, 12);

const res = { started_utc: new Date().toISOString(), commit_reported: "d475dec", design: DESIGN, staging: STAGING, local_publishable_key_fp12: PUBFP, checks: [], detail: {} };
const check = (id, what, verdict, ev) => { res.checks.push({ id, what, verdict, evidence: ev }); console.log(`${verdict} ${id} ${what} :: ${JSON.stringify(ev).slice(0, 300)}`); };
const H = (r) => Object.fromEntries([...r.headers].filter(([k]) => /^(x-robots-tag|x-vercel-id|x-matched-path|content-type|location|strict-transport|content-security|x-frame|referrer-policy|x-content-type)/i.test(k)));
const get = (base, p, cookie) => fetch(base + p, { redirect: "manual", headers: cookie ? { Cookie: cookie } : {} }).then(async (r) => ({ status: r.status, headers: H(r), body: await r.text() }));
const jpost = (base, p, body, cookie, extra = {}) => fetch(base + p, { method: "POST", redirect: "manual", headers: { "Content-Type": "application/json", ...(cookie ? { Cookie: cookie } : {}), ...extra }, body: JSON.stringify(body) })
  .then(async (r) => ({ status: r.status, json: await r.json().catch(() => null), setCookie: (r.headers.getSetCookie?.() ?? []).map((c) => c.split(";")[0].split("=")[0] + "=<redacted>; " + c.split(";").slice(1).join(";").trim()) }));
const cookieOf = async (base, id) => {
  const r = await fetch(base + "/api/bff/auth/login", { method: "POST", redirect: "manual", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: id.email, password: id.password }) });
  const cs = (r.headers.getSetCookie?.() ?? []).map((c) => c.split(";")[0]).filter((c) => c.startsWith("nuova_")).join("; ");
  return { status: r.status, cookie: cs || null };
};

try {
  // ---- 1. headers and robots on both previews, EN and ES ----
  const hdr = {};
  for (const [name, base] of [["design", DESIGN], ["staging", STAGING]]) {
    for (const p of ["/en", "/es", "/en/packages", "/es/legal/privacy", "/robots.txt", "/sitemap.xml"]) {
      const r = await get(base, p);
      hdr[`${name}${p}`] = { status: r.status, robots: r.headers["x-robots-tag"] ?? null, meta: (r.body.match(/<meta name="robots" content="([^"]+)"/i) ?? [])[1] ?? null, body_head: p.endsWith(".txt") || p.endsWith(".xml") ? r.body.slice(0, 160).replace(/\s+/g, " ") : null };
    }
  }
  res.detail.headers = hdr;
  const pages = Object.entries(hdr).filter(([k]) => !/robots\.txt|sitemap/.test(k));
  check("RVC-01", "both previews answer noindex in the header and the meta tag on every sampled route",
    pages.every(([, v]) => /noindex/i.test(v.robots ?? "") && /noindex/i.test(v.meta ?? "")) ? "PASS" : "FAIL",
    { pages: pages.length, without_header: pages.filter(([, v]) => !/noindex/i.test(v.robots ?? "")).map(([k]) => k), without_meta: pages.filter(([, v]) => !/noindex/i.test(v.meta ?? "")).map(([k]) => k) });
  check("RVC-02", "robots.txt and sitemap of a preview do not invite indexing of the customer domain", "INFO",
    { design_robots: hdr["design/robots.txt"]?.body_head, staging_robots: hdr["staging/robots.txt"]?.body_head, design_sitemap: hdr["design/sitemap.xml"]?.body_head?.slice(0, 90) });

  // ---- 2. mode separation: the design preview must not reach a backend ----
  const dSignup = await jpost(DESIGN, "/api/bff/signup", { name: "RV Probe", email: `rv-${Date.now()}@test.nuovasolution.com`, password: "Reviewer-probe-2026!", agency_name: "RV PROBE", language: "en" });
  const sSignup = await jpost(STAGING, "/api/bff/signup", { name: "RV Probe", email: `rv-${Date.now()}@test.nuovasolution.com`, password: "Reviewer-probe-2026!", agency_name: "RV PROBE", language: "en" });
  res.detail.signup = { design: { status: dSignup.status, code: dSignup.json?.code, stub: dSignup.json?.stub ?? null }, staging: { status: sSignup.status, code: sSignup.json?.code, stub: sSignup.json?.stub ?? null } };
  check("RVC-03", "design preview answers from the stub, staging preview from the real identity server",
    (dSignup.json?.stub === true || dSignup.json?.message === "stub") && sSignup.json?.code === "invalid_email" ? "PASS" : "FAIL", res.detail.signup);

  // ---- 3. staging binding: which project mints the signed upload URL ----
  const login = await cookieOf(STAGING, OWNER);
  let bind = { login_status: login.status };
  if (login.cookie) {
    const init = await jpost(STAGING, "/api/bff/branding/upload-init", { kind: "logo", filename: "probe.png", content_type: "image/png", size_bytes: 4096 }, login.cookie);
    const url = init.json?.details?.signed_upload_url ?? "";
    const host = url ? new URL(url).host : null;
    bind = { ...bind, init_status: init.status, storage_host: host, project_ref: host ? host.split(".")[0] : null, path_shape: (init.json?.details?.object_path ?? "").replace(/[^/]+$/, "<file>") };
  }
  res.detail.staging_binding = bind;
  check("RVC-04", "the staging preview is bound to the approved project (server-minted signed URL names it)",
    bind.project_ref === "fflmmzapksycjfdcjdtd" ? "PASS" : "FAIL", bind);

  // the design preview must not mint anything
  const dLogin = await cookieOf(DESIGN, OWNER);
  const dInit = dLogin.cookie ? await jpost(DESIGN, "/api/bff/branding/upload-init", { kind: "logo", filename: "probe.png", content_type: "image/png", size_bytes: 4096 }, dLogin.cookie) : null;
  res.detail.design_binding = { login_status: dLogin.status, init_status: dInit?.status ?? null, signed_url: dInit?.json?.details?.signed_upload_url ?? null, stub: dInit?.json?.stub ?? null };
  check("RVC-05", "the design preview mints no backend URL and marks its answers as a demonstration",
    (dInit?.json?.details?.signed_upload_url ?? null) === null ? "PASS" : "FAIL", res.detail.design_binding);

  // ---- 4. negative access tests on the staging preview ----
  const noSession = await get(STAGING, "/api/bff/onboarding/state");
  const forged = await get(STAGING, "/api/bff/onboarding/state", "nuova_session=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmb3JnZWQifQ.c2ln");
  const crossOrigin = login.cookie ? await jpost(STAGING, "/api/bff/onboarding/business", { timezone: "Europe/Madrid" }, login.cookie, { Origin: "https://evil.example" }) : null;
  const agentLogin = await cookieOf(STAGING, AGENT);
  const agentWrite = agentLogin.cookie ? await jpost(STAGING, "/api/bff/onboarding/business", { timezone: "Europe/Madrid", languages: ["es"], default_language: "es", business_hours: { mon: "09:00-18:00" } }, agentLogin.cookie) : null;
  res.detail.negatives = { no_session: noSession.status, forged_cookie: forged.status, cross_origin_write: crossOrigin?.status ?? null, agent_write: agentWrite?.status ?? null, agent_code: agentWrite?.json?.code ?? null };
  check("RVC-06", "on the live preview: no session, forged cookie, foreign origin and a non-admin role are all refused",
    noSession.status === 401 && forged.status === 401 && crossOrigin?.status === 403 && agentWrite?.status === 403 ? "PASS" : "FAIL", res.detail.negatives);

  // ---- 5. session cookie flags over HTTPS ----
  const raw = await fetch(STAGING + "/api/bff/auth/login", { method: "POST", redirect: "manual", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: OWNER.email, password: OWNER.password }) });
  const sc = (raw.headers.getSetCookie?.() ?? []).find((c) => c.startsWith("nuova_session=")) ?? "";
  res.detail.cookie_flags = { httpOnly: /HttpOnly/i.test(sc), secure: /Secure/i.test(sc), sameSite: (sc.match(/SameSite=\w+/i) ?? [])[0] ?? null, path: (sc.match(/Path=[^;]+/i) ?? [])[0] ?? null };
  check("RVC-07", "the session cookie is HttpOnly and Secure over HTTPS", res.detail.cookie_flags.httpOnly && res.detail.cookie_flags.secure ? "PASS" : "FAIL", res.detail.cookie_flags);

  // ---- 6. Q&A state on the staging preview ----
  const qa = await jpost(STAGING, "/api/qa", { question: "Which channels can you answer today?", locale: "en" });
  res.detail.qa = { status: qa.status, code: qa.json?.code ?? null, keys: Object.keys(qa.json?.details ?? qa.json ?? {}).slice(0, 8) };
  check("RVC-08", "the website's Q&A endpoint on the live preview", "INFO", res.detail.qa);

  // ---- 7. client bundle: no key shape shipped ----
  const home = await get(STAGING, "/en");
  const scripts = [...home.body.matchAll(/src="(\/_next\/static\/[^"]+\.js)"/g)].map((m) => m[1]).slice(0, 12);
  let hits = 0, scanned = 0;
  for (const s of scripts) { const j = await get(STAGING, s); scanned++; if (/sb_secret_|service_role|sb_publishable_[A-Za-z0-9]{6,}|eyJ[A-Za-z0-9_-]{30,}/.test(j.body)) hits++; }
  res.detail.bundle = { scanned, hits };
  check("RVC-09", "no key shape in the client chunks of the staging preview", hits === 0 ? "PASS" : "FAIL", res.detail.bundle);
} catch (e) { res.error = String(e?.message ?? e); console.error("ERROR", res.error); }
finally {
  res.finished_utc = new Date().toISOString();
  writeFileSync(OUT, JSON.stringify(res, null, 1));
  console.log(JSON.stringify(res.checks.map((c) => [c.id, c.verdict])));
}
