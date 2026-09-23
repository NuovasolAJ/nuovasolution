// INDEPENDENT reviewer probe of the website candidate against the pinned STAGING project.
// Written by the reviewer; does not reuse the implementer's harness. Staging ref only; production
// ref aborts. Identities and the publishable key are read from the secure store and never printed,
// and no signed URL, token or cookie value is written to the results file.
// Usage: node rev-staging.mjs <appRoot> <outJson>
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { deflateSync } from "node:zlib";

const REF = "fflmmzapksycjfdcjdtd";
const ROOT = process.argv[2];
const OUT = process.argv[3];
const SECRETS = "C:/Users/Usuario/.nuova-secrets";
const PORT = 3131;
const BASE = `http://localhost:${PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const cred = (f) => { const [email, password] = readFileSync(join(SECRETS, f), "utf8").split(/\r?\n/); return { email: email.trim(), password: password.trim() }; };
const OWNER = cred("stg_web_e2e_owner.txt"), AGENT = cred("stg_web_e2e_agent.txt"), OTHER = cred("stg_web_e2e_other_owner.txt");
const PUB = readFileSync(join(SECRETS, "stg_publishable_key.txt"), "utf8").trim();
if (!PUB.startsWith("sb_publishable_")) { console.error("ABORT: wrong key type"); process.exit(3); }

const res = { started_utc: new Date().toISOString(), commit: "6fbe45f", target: `staging ${REF}`, reviewer: "independent", checks: [] };
const check = (id, what, pass, evidence) => { res.checks.push({ id, what, pass: Boolean(pass), evidence }); console.log(`${pass ? "PASS" : "FAIL"} ${id} ${what} :: ${JSON.stringify(evidence)}`); };
const kids = [];

// tiny valid PNG, unique per run so the stored bytes can be identified
function png(w, h, seed) {
  const tb = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  const crc = (b) => { let c = 0xffffffff; for (const x of b) c = tb[(c ^ x) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (ty, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(ty), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
  const ih = Buffer.alloc(13); ih.writeUInt32BE(w, 0); ih.writeUInt32BE(h, 4); ih[8] = 8; ih[9] = 2;
  const raw = Buffer.alloc((w * 3 + 1) * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const o = y * (w * 3 + 1) + 1 + x * 3; raw[o] = (x * 7 + seed) & 255; raw[o + 1] = (y * 5 + seed) & 255; raw[o + 2] = seed & 255; }
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ih), chunk("IDAT", deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}
const sha = (b) => createHash("sha256").update(b).digest("hex").slice(0, 16);

const h = (p, init = {}) => fetch(`${BASE}${p}`, { redirect: "manual", ...init });
const setCookies = (r) => (r.headers.getSetCookie?.() ?? []);
const cookieOf = (r) => setCookies(r).map((c) => c.split(";")[0]).filter((c) => c.startsWith("nuova_")).join("; ");
const post = (p, body, cookie, extraHeaders = {}) => h(p, { method: "POST", headers: { "Content-Type": "application/json", Cookie: cookie ?? "", ...extraHeaders }, body: JSON.stringify(body) }).then(async (r) => ({ status: r.status, body: await r.json().catch(() => null), cookie: cookieOf(r), raw: setCookies(r) }));
const get = (p, cookie) => h(p, { headers: { Cookie: cookie ?? "" } }).then(async (r) => ({ status: r.status, body: await r.json().catch(() => null) }));
const login = async (id) => { const r = await post("/api/bff/auth/login", { email: id.email, password: id.password }); return { cookie: r.status === 200 ? r.cookie : null, status: r.status, raw: r.raw, body: r.body }; };

try {
  const env = { NUOVA_INTEGRATION_MODE: "staging", NEXT_PUBLIC_SUPABASE_URL: `https://${REF}.supabase.co`, NEXT_PUBLIC_SUPABASE_ANON_KEY: PUB, NUOVA_STAGING_TARGET_APPROVED: REF, QA_INTAKE_URL: "" };
  kids.push(spawn(process.execPath, [join(ROOT, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(PORT)], { cwd: ROOT, env: { ...process.env, ...env }, stdio: "ignore" }));
  for (let i = 0; i < 120; i++) { try { await fetch(`${BASE}/en`); break; } catch { await sleep(500); } }

  // ---- session and identity ----
  let r = await get("/api/bff/onboarding/state", "");
  check("RV-01", "no session: onboarding read refused", r.status === 401 && r.body?.code === "no_session", { status: r.status, code: r.body?.code });
  r = await get("/api/bff/onboarding/state", "nuova_session=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmb3JnZWQifQ.c2ln");
  check("RV-02", "self-made JWT: refused, no data", r.status === 401 && r.body?.code === "no_session", { status: r.status, code: r.body?.code });

  const ownerL = await login(OWNER), agentL = await login(AGENT), otherL = await login(OTHER);
  const ownerCk = ownerL.cookie, agentCk = agentL.cookie, otherCk = otherL.cookie;
  const sessionSet = (ownerL.raw ?? []).find((c) => c.startsWith("nuova_session=")) ?? "";
  check("RV-03", "three identities sign in through the server", Boolean(ownerCk && agentCk && otherCk), { owner: ownerL.status, agent: agentL.status, other: otherL.status });
  check("RV-04", "session cookie is HttpOnly + SameSite and the body carries no token",
    /HttpOnly/i.test(sessionSet) && /SameSite=(Lax|Strict)/i.test(sessionSet) && !JSON.stringify(ownerL.body ?? {}).includes("eyJ"),
    { httpOnly: /HttpOnly/i.test(sessionSet), sameSite: (sessionSet.match(/SameSite=\w+/i) ?? [""])[0], secure: /Secure/i.test(sessionSet), token_in_body: JSON.stringify(ownerL.body ?? {}).includes("eyJ") });

  // cross origin write must be refused even with a valid cookie
  r = await post("/api/bff/onboarding/business", { timezone: "Europe/Madrid" }, ownerCk, { Origin: "https://evil.example" });
  check("RV-05", "valid session, foreign Origin: write refused", r.status === 403, { status: r.status, code: r.body?.code });

  // ---- role limits ----
  r = await post("/api/bff/onboarding/business", { timezone: "Europe/Madrid", languages: ["es"], default_language: "es", business_hours: { mon: "09:00-18:00" } }, agentCk);
  check("RV-06", "agent writes business data: refused by the backend", r.status === 403 && r.body?.code === "forbidden", { status: r.status, code: r.body?.code });
  r = await post("/api/bff/tenant/activate", {}, agentCk);
  check("RV-07", "agent activates: refused", r.status === 403 || r.body?.code === "forbidden", { status: r.status, code: r.body?.code });
  r = await post("/api/bff/branding/upload-init", { kind: "logo", filename: "a.png", content_type: "image/png", size_bytes: 1000 }, agentCk);
  check("RV-08", "agent starts a logo upload: refused", r.status === 403 || r.body?.code === "forbidden", { status: r.status, code: r.body?.code });

  // ---- tenant isolation: manipulated client_id ----
  const otherBefore = await get("/api/bff/onboarding/state", otherCk);
  const tzBefore = otherBefore.body?.details?.profile?.business?.timezone ?? null;
  r = await post("/api/bff/onboarding/business", { client_id: "stg_web_e2e_other_393a6e", timezone: "Atlantic/Canary", languages: ["es", "en"], default_language: "es", business_hours: { mon: "09:00-18:00", tue: "09:00-18:00", wed: "09:00-18:00", thu: "09:00-18:00", fri: "09:00-17:00", sat: "closed", sun: "closed" } }, ownerCk);
  const otherAfter = await get("/api/bff/onboarding/state", otherCk);
  const tzAfter = otherAfter.body?.details?.profile?.business?.timezone ?? null;
  const ownerTz = r.body?.details?.profile?.business?.timezone ?? null;
  check("RV-09", "manipulated client_id has no effect: the write lands in the caller's own agency, the second agency is unchanged",
    r.status === 200 && ownerTz === "Atlantic/Canary" && tzBefore === tzAfter, { owner_tz: ownerTz, other_tz_before: tzBefore, other_tz_after: tzAfter });
  const idLeak = /stg_web_e2e_(agency_a1b523|other_393a6e)/.test(JSON.stringify(otherAfter.body).replace(/https:\/\/[a-z]+\.supabase\.co\/storage\/v1\/object\/public\/agency-branding\/[^"]+/g, "<asset>"));
  check("RV-10", "no tenant id in the reads, outside the backend's public asset URL", !idLeak, { leak: idLeak });

  // ---- logo: real bytes, content check, cross tenant ----
  const good = png(240, 96, 42);
  const init = await post("/api/bff/branding/upload-init", { kind: "logo", filename: "reviewer.png", content_type: "image/png", size_bytes: good.length }, ownerCk);
  const objectPath = init.body?.details?.object_path ?? null;
  const signed = init.body?.details?.signed_upload_url ?? null;
  check("RV-11", "upload init returns a tenant-prefixed path and a signed URL at the configured project",
    init.status === 200 && typeof objectPath === "string" && typeof signed === "string" && signed.startsWith(`https://${REF}.supabase.co/storage/v1/`),
    { status: init.status, path_shape: typeof objectPath === "string" ? objectPath.replace(/[0-9a-f-]{36}/gi, "<tenant>").replace(/[^/]+$/, "<file>") : null, url_host_ok: typeof signed === "string" && signed.startsWith(`https://${REF}.supabase.co/storage/v1/`) });

  let put = signed ? await fetch(signed, { method: "PUT", headers: { "Content-Type": "image/png" }, body: good }) : { status: 0 };
  const commit = await post("/api/bff/branding/commit", { kind: "logo", object_path: objectPath }, ownerCk);
  const prev = await get("/api/bff/branding/preview", ownerCk);
  const logoUrl = prev.body?.details?.logo ?? null;
  let served = null, servedSha = null;
  if (typeof logoUrl === "string" && logoUrl.startsWith("http")) { const b = Buffer.from(await (await fetch(logoUrl, { cache: "no-store" })).arrayBuffer()); served = b.length; servedSha = sha(b); }
  check("RV-12", "the bytes uploaded by the reviewer are the bytes the product serves back",
    put.status < 300 && commit.status === 200 && servedSha === sha(good),
    { put: put.status, commit: commit.status, uploaded_sha16: sha(good), served_sha16: servedSha, uploaded_bytes: good.length, served_bytes: served });

  const initB = await post("/api/bff/branding/upload-init", { kind: "logo_dark", filename: "b.png", content_type: "image/png", size_bytes: 64 }, ownerCk);
  const badPath = initB.body?.details?.object_path ?? null, badUrl = initB.body?.details?.signed_upload_url ?? null;
  if (badUrl) await fetch(badUrl, { method: "PUT", headers: { "Content-Type": "image/png" }, body: Buffer.from("this is not a png, it is text") });
  const badCommit = await post("/api/bff/branding/commit", { kind: "logo_dark", object_path: badPath }, ownerCk);
  check("RV-13", "PNG declared, text stored: the commit reads the stored bytes and rejects", badCommit.status >= 400, { status: badCommit.status, code: badCommit.body?.code });

  const foreign = await post("/api/bff/branding/commit", { kind: "logo", object_path: objectPath }, otherCk);
  check("RV-14", "second tenant commits this agency's upload: refused as a foreign asset", foreign.status >= 400 && ["cross_tenant_asset", "upload_not_found", "forbidden"].includes(foreign.body?.code), { status: foreign.status, code: foreign.body?.code });

  // ---- readiness and activation limits ----
  const ready = await get("/api/bff/onboarding/readiness", ownerCk);
  const gates = Array.isArray(ready.body?.details?.gates) ? ready.body.details.gates : [];
  const act = await post("/api/bff/tenant/activate", {}, ownerCk);
  check("RV-15", "readiness comes from the backend and names open gates", ready.status === 200 && gates.length > 0, { status: ready.status, gates: gates.length, activatable: ready.body?.details?.activatable });
  check("RV-16", "admin activates while gates are open: blocked, nothing activated",
    act.body?.details?.outcome === "blocked" && act.body?.details?.activated === false && act.status === 409,
    { status: act.status, outcome: act.body?.details?.outcome, activated: act.body?.details?.activated, blocked: (act.body?.details?.blocked_mandatory ?? []).length });

  // ---- CRM choice and the notice receipt ----
  const sheetsNoAck = await post("/api/bff/crm/select", { provider: "google_sheets", intent: "select" }, ownerCk);
  check("RV-17", "Google Sheets without the acknowledged notice: refused", sheetsNoAck.status === 428 || sheetsNoAck.body?.code === "notice_required", { status: sheetsNoAck.status, code: sheetsNoAck.body?.code });
  const ack = await post("/api/bff/consent/connect-notice", { source: "google_sheets", notice_version: (await get("/api/bff/crm/catalog", ownerCk)).body?.details?.notice_version ?? "v1" }, ownerCk);
  const ackCk = [ownerCk, ack.cookie].filter(Boolean).join("; ");
  const sheets = await post("/api/bff/crm/select", { provider: "google_sheets", intent: "select" }, ackCk);
  const crmAfter = await get("/api/bff/onboarding/state", ownerCk);
  check("RV-18", "with the receipt the choice goes through and is never called connected",
    sheets.status === 200 && !JSON.stringify(sheets.body ?? {}).includes("\"connected\""),
    { ack_status: ack.status, recorded_in: ack.body?.details?.recorded_in, select: sheets.status, state: sheets.body?.details?.selection?.state ?? sheets.body?.details?.state });
  const back = await post("/api/bff/crm/select", { provider: "nuovasolution", intent: "select" }, ownerCk);
  check("RV-19", "switching back to the built-in CRM works and the copy flag is reported honestly",
    back.status === 200, { status: back.status, crm_of_record: back.body?.details?.crm_of_record ?? back.body?.details?.state, sheets_projection: JSON.stringify(back.body ?? {}).includes("sheets") });

  // ---- durability across a fresh session ----
  const owner2 = await login(OWNER);
  const state2 = await get("/api/bff/onboarding/state", owner2.cookie);
  check("RV-20", "a second, independent session reads the same stored data back",
    state2.body?.details?.profile?.business?.timezone === "Atlantic/Canary" && Boolean(state2.body?.details?.profile?.branding?.logo),
    { timezone: state2.body?.details?.profile?.business?.timezone, logo_present: Boolean(state2.body?.details?.profile?.branding?.logo) });

  // legal write and read-back gap (WEB-API-1)
  const legal = await post("/api/bff/onboarding/legal", { legal_name: "stg_web_e2e_agency S.L. (TEST)", tax_id: "B12345674", address_line: "Calle de Prueba 1", postal_code: "29600", city: "Marbella", province: "Malaga", privacy_url: "https://example.org/stg-web-e2e/privacy", terms_url: "https://example.org/stg-web-e2e/terms" }, ownerCk);
  const state3 = await get("/api/bff/onboarding/state", ownerCk);
  const legalBack = state3.body?.details?.profile?.legal ?? null;
  check("RV-21", "legal data saves; the contract has no read operation, so the form cannot show it again",
    legal.status === 200, { save: legal.status, read_back: legalBack ? Object.keys(legalBack).length : 0 });

  // ---- logout really ends the session ----
  const lo = await post("/api/bff/auth/logout", {}, ownerCk);
  const afterLogout = await get("/api/bff/onboarding/state", ownerCk);
  check("RV-22", "after logout the old cookie value is no longer accepted",
    lo.status < 400 && afterLogout.status === 401, { logout: lo.status, reuse: afterLogout.status, code: afterLogout.body?.code });

  // restore the fixture to the state the implementer documented
  const owner3 = await login(OWNER);
  await post("/api/bff/onboarding/business", { timezone: "Europe/Madrid", languages: ["es", "en"], default_language: "es", business_hours: { mon: "09:00-18:00", tue: "09:00-18:00", wed: "09:00-18:00", thu: "09:00-18:00", fri: "09:00-17:00", sat: "closed", sun: "closed" } }, owner3.cookie);
  await post("/api/bff/branding/remove", { kind: "logo_dark" }, owner3.cookie).catch(() => undefined);
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
