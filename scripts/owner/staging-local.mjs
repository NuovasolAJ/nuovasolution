// Owner test starter: builds the website in STAGING mode and serves it at http://localhost:3000.
//   npm run owner:staging
// Port 3000 matters: staging's sign-up confirmation e-mail links back to http://localhost:3000.
// The only key is the staging publishable key, read from the secure store; nothing is printed.
// Target: staging project fflmmzapksycjfdcjdtd only. Stop with Ctrl+C.
import { spawn, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const REF = "fflmmzapksycjfdcjdtd";
const ROOT = new URL("../../", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const NEXT = join(ROOT, "node_modules", "next", "dist", "bin", "next");
const PUB = readFileSync(join(process.env.SECRETS ?? "C:/Users/Usuario/.nuova-secrets", "stg_publishable_key.txt"), "utf8").trim();
if (!PUB.startsWith("sb_publishable_")) { console.error("The stored staging key is not a publishable key. Stopping."); process.exit(3); }

const env = { ...process.env, NUOVA_INTEGRATION_MODE: "staging", NEXT_PUBLIC_SUPABASE_URL: `https://${REF}.supabase.co`, NUOVA_STAGING_TARGET_APPROVED: REF, SUPABASE_SERVICE_ROLE_KEY: "", SUPABASE_SECRET_KEY: "" };
console.log("Building the staging version of the website (about two minutes)...");
const b = spawnSync(process.execPath, [NEXT, "build"], { cwd: ROOT, env, stdio: "ignore" });
if (b.status !== 0) { console.error("The build failed. Nothing was started."); process.exit(1); }
console.log("Ready. Open http://localhost:3000/es/signup (or /es/login). The yellow 'Entorno de pruebas' band means staging.");
spawn(process.execPath, [NEXT, "start", "-p", "3000"], { cwd: ROOT, env: { ...env, NEXT_PUBLIC_SUPABASE_ANON_KEY: PUB }, stdio: "inherit" });
