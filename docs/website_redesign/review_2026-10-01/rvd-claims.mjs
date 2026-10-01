import { writeFileSync } from "node:fs";
const A = process.argv[2];
const ROUTES = ["/en", "/es", "/en/platform", "/es/platform", "/en/platform/ai-sales-agent", "/en/platform/crm", "/es/platform/crm", "/en/platform/lead-intelligence", "/en/platform/daily-assistant", "/en/packages", "/es/packages", "/en/trial", "/en/contact"];
const TOPICS = {
  prioritisation: /priorit(y|ise|ize|ised|ized|ización|za)|prioridad|scoring|puntuaci/gi,
  external_crm: /hubspot|salesforce|pipedrive|zoho|your (existing )?crm|tu crm actual|crm connections|conexiones crm|integrat/gi,
  outlook: /outlook|microsoft 365|office 365/gi,
  phone: /phone|call|llamada|tel[eé]fono|voice|voz/gi,
  social: /instagram|facebook|social/gi,
  threeD: /3d|virtual tour|recorrido|maqueta/gi,
  invoice: /invoice|factura|bank transfer|transferencia|payment confirmed|pago confirmado/gi,
  whatsapp_night: /night|noche|24\/7|day or night|d[ií]a o de noche/gi,
};
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&#x27;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ");
const out = { base: A, started_utc: new Date().toISOString(), routes: {} };
for (const r of ROUTES) {
  const res = await fetch(A + r, { redirect: "manual" });
  if (res.status !== 200) { out.routes[r] = { status: res.status }; continue; }
  const t = strip(await res.text());
  const found = {};
  for (const [k, re] of Object.entries(TOPICS)) {
    const ctx = [];
    for (const m of t.matchAll(re)) { ctx.push(t.slice(Math.max(0, m.index - 80), m.index + 90).trim()); if (ctx.length >= 3) break; }
    if (ctx.length) found[k] = ctx;
  }
  out.routes[r] = { status: 200, found };
}
writeFileSync(process.argv[3], JSON.stringify(out, null, 1));
for (const [r, v] of Object.entries(out.routes)) {
  if (v.status !== 200) { console.log(r, v.status); continue; }
  for (const [k, c] of Object.entries(v.found ?? {})) console.log(`${r} [${k}] ${c[0].slice(0, 150)}`);
}
