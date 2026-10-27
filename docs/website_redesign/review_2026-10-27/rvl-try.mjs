import { readFileSync, writeFileSync } from "node:fs";
const BASE = process.argv[2];
const raw = readFileSync("C:/Users/Usuario/.nuova-secrets/stg_website_e28_identity.txt", "utf8").split(/\r?\n/).map(l => l.trim()).filter(l => l && !l.startsWith("#"));
const tries = [[raw[0], raw[1]], [raw[1], raw[0]]];
const out = [];
for (const [email, password] of tries) {
  if (!email || !password) { out.push({ shape: "missing", status: null }); continue; }
  const r = await fetch(BASE + "/api/bff/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
  const j = await r.json().catch(() => null);
  out.push({ emailLooksLikeMail: /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email), status: r.status, code: j?.code ?? null, session: (r.headers.getSetCookie?.() ?? []).some(c => c.startsWith("nuova_session=")) });
}
console.log(JSON.stringify(out));
writeFileSync(process.argv[3], JSON.stringify({ base: BASE, attempts: out, utc: new Date().toISOString() }, null, 1));
