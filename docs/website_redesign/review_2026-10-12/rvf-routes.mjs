// R16: route and gate scan on the delivered deployment. HTTP only, read-only.
import { writeFileSync } from "node:fs";
const U = process.argv[2], OUT = process.argv[3];
const ROUTES = [
  "/en", "/es", "/en/platform", "/es/platform", "/en/packages", "/es/packages", "/en/trial", "/es/trial",
  "/en/contact", "/es/contact", "/en/signup", "/es/signup", "/en/login", "/es/login",
  "/en/app", "/es/app", "/en/app/reports", "/es/app/reports", "/en/app/social", "/es/app/social",
  "/en/onboarding", "/es/onboarding",
  "/en/legal/privacy", "/es/legal/privacy", "/en/legal/terms", "/es/legal/terms",
  "/en/legal/data-deletion", "/es/legal/data-deletion", "/en/legal/imprint", "/es/legal/imprint",
  "/robots.txt", "/sitemap.xml",
];
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&#x27;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
const out = { deployment: U, started_utc: new Date().toISOString(), routes: {} };
for (const r of ROUTES) {
  const res = await fetch(U + r, { redirect: "manual" });
  const body = await res.text();
  const t = strip(body);
  out.routes[r] = {
    status: res.status,
    location: res.headers.get("location"),
    robots: res.headers.get("x-robots-tag"),
    h1: (body.match(/<h1[^>]*>([\s\S]{0,120}?)<\/h1>/i) || [])[1]?.replace(/<[^>]+>/g, "").trim().slice(0, 90) ?? null,
    h1_count: (body.match(/<h1[\s>]/gi) || []).length,
    words: t.split(" ").length,
    awaiting_contract: /awaiting contract|contrato pendiente|esperando el contrato|awaiting the contract/i.test(t),
    digits_near_contract: (t.match(/(awaiting[^.]{0,60}\d|\d[^.]{0,40}awaiting)/i) || [])[0] ?? null,
    placeholder_marks: (t.match(/⟦|PLACEHOLDER|PROVISIONAL|Lorem|TODO/gi) || []).slice(0, 3),
    login_gate_words: /log in|iniciar sesión|sign in/i.test(t),
    sample: t.slice(0, 160),
  };
}
writeFileSync(OUT, JSON.stringify(out, null, 2));
for (const [r, v] of Object.entries(out.routes)) {
  console.log(`${String(v.status).padEnd(3)} ${r.padEnd(26)} h1=${v.h1_count} ${v.location ? "-> " + v.location : ""} ${v.awaiting_contract ? "[awaiting-contract]" : ""} ${v.placeholder_marks.length ? "[marks:" + v.placeholder_marks.join(",") + "]" : ""}`);
}
