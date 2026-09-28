import { spawn } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const REF = "fflmmzapksycjfdcjdtd", ROOT = process.argv[2], OUT = process.argv[3];
const PUB = readFileSync("C:/Users/Usuario/.nuova-secrets/stg_publishable_key.txt", "utf8").trim();
const PORT = 3145, BASE = `http://localhost:${PORT}`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const kids = [];
kids.push(spawn(process.execPath, [join(ROOT, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(PORT)], { cwd: ROOT, env: { ...process.env, NUOVA_INTEGRATION_MODE: "staging", NEXT_PUBLIC_SUPABASE_URL: `https://${REF}.supabase.co`, NEXT_PUBLIC_SUPABASE_ANON_KEY: PUB, NUOVA_STAGING_TARGET_APPROVED: REF }, stdio: "ignore" }));
for (let i = 0; i < 120; i++) { try { await fetch(`${BASE}/en`); break; } catch { await sleep(500); } }
const post = (p, b) => fetch(`${BASE}${p}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(b) }).then(async (r) => ({ status: r.status, body: await r.json().catch(() => null) }));
const out = {};
// correct field names this time: the route expects `name`
out.test_domain = await post("/api/bff/signup", { name: "Reviewer Probe", email: `rv-${Date.now()}@test.nuovasolution.com`, password: "Reviewer-probe-2026!", agency_name: "RV PROBE", language: "en" });
out.malformed_email = await post("/api/bff/signup", { name: "Reviewer Probe", email: "not-an-email", password: "Reviewer-probe-2026!", agency_name: "RV PROBE", language: "en" });
out.weak_password = await post("/api/bff/signup", { name: "Reviewer Probe", email: `rv-${Date.now()}@test.nuovasolution.com`, password: "short", agency_name: "RV PROBE", language: "en" });
// resend for an address that does not exist must not reveal anything
out.resend_unknown = await post("/api/bff/auth/resend", { email: `rv-unknown-${Date.now()}@test.nuovasolution.com`, language: "en" });
writeFileSync(OUT, JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
for (const k of kids) k.kill(); process.exit(0);
