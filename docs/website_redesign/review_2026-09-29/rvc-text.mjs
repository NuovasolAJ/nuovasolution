// Content baseline over the rendered HTML of both previews: placeholders, trial wording, checkout,
// assistant text, absolute claims. Read only.
import { writeFileSync } from "node:fs";
const D = "https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app";
const S = "https://nuovasolution-staging-preview-git-w-44e113-nuovasolajs-projects.vercel.app";
const PAGES = ["/en", "/es", "/en/packages", "/es/packages", "/en/trial", "/es/trial", "/en/contact", "/es/contact", "/en/legal/privacy", "/es/legal/privacidad", "/en/legal/terms", "/es/legal/terminos"];
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&nbsp;|\s+/g, " ");
const PAT = {
  placeholder_marks: /[⟦⟧]/g,
  provisional: /PROVISIONAL|PLACEHOLDER|TBD|Lorem/gi,
  assistant_off: /no assistant is connected|no hay ning[uú]n asistente/gi,
  trial_free: /14 days free|14 d[ií]as gratis|free for 14|gratis durante 14/gi,
  no_payment: /no payment method|sin m[eé]todo de pago/gi,
  checkout: /checkout|pay now|pagar ahora|add to cart/gi,
  invoice_vs_payment: /invoice[^.]{0,40}(not|≠|no es)[^.]{0,20}payment|factura[^.]{0,40}no[^.]{0,20}pago/gi,
  absolutes: /never miss|nunca pierdas|siempre sincronizado|always synced|100%/gi,
  setup_minutes: /setup in five minutes|in 5 minutes|en cinco minutos|en 5 minutos/gi,
  coming_soon: /coming soon|pr[oó]ximamente/gi,
  mailto_dot: /mailto:[^"'\s]+\./g,
};
const out = { started_utc: new Date().toISOString(), pages: {} };
for (const [name, base] of [["design", D], ["staging", S]]) {
  for (const p of PAGES) {
    const r = await fetch(base + p, { redirect: "manual" });
    if (r.status !== 200) { out.pages[`${name}${p}`] = { status: r.status }; continue; }
    const html = await r.text(); const text = strip(html);
    const hits = {};
    for (const [k, re] of Object.entries(PAT)) { const m = (k === "mailto_dot" ? html : text).match(re); if (m) hits[k] = [...new Set(m)].slice(0, 4); }
    out.pages[`${name}${p}`] = { status: 200, words: text.split(" ").length, hits };
  }
}
writeFileSync(process.argv[2], JSON.stringify(out, null, 1));
for (const [k, v] of Object.entries(out.pages)) if (v.status !== 200 || Object.keys(v.hits ?? {}).length) console.log(k, v.status, JSON.stringify(v.hits ?? {}).slice(0, 260));
