// Compare the measured section against Copy's wording. Expected strings come from
// COPY_TO_REDESIGN_1120_PROXIMAMENTE_v1.md (c519b2d) §1 + §2 and v2 (e851e72).
import { readFileSync } from "node:fs";
const R = JSON.parse(readFileSync(process.argv[2], "utf8"));
const N = s => (s || "").replace(/[\s  ]+/g, " ").trim();

const EYEBROW = { es: { plain: "Todo lo que hace por tu agencia", soon: "Todo lo que hace y hará por tu agencia" },
                  en: { plain: "Everything it does for your agency", soon: "Everything it does, and will do, for your agency" } };
const H2 = { es: "Nuevos clientes. Contactos que vuelven. Más oportunidades para tu agencia.",
             en: "New clients. Contacts who come back. More opportunities for your agency." };
// The 17-key gate after API's cee6992: T-4 (taskList, dailyVoice) and T-6 (model3d) are now soon too.
// G-1's off chip is shortened per Copy §6 (6971369).
const GATE_STATE = { g1: "soon", g2: "soon", g3: "partial", t2: "soon", t4: "soon", t6: "soon", t8: "live" };
const CHIP_GATE = {
  es: { g1: "Próximamente · Desde Growth", g2: "Próximamente · Desde Growth",
        g3: "Desde Growth · en parte próximamente", t2: "Próximamente · Desde Growth",
        t4: "Próximamente · Desde Growth", t6: "Próximamente · Opcional, con cualquier plan", t8: "Todos los planes" },
  en: { g1: "Coming soon · From Growth", g2: "Coming soon · From Growth",
        g3: "From Growth · partly coming soon", t2: "Coming soon · From Growth",
        t4: "Coming soon · From Growth", t6: "Coming soon · Optional, with any plan", t8: "Every plan" } };
// G-d: live wording, and Copy §4's PX-s form once taskList/dailyVoice are off
const GD = { es: { live: "Cada mañana, qué oportunidades piden tu atención.", soon: "Cada mañana, qué oportunidades piden tu atención: próximamente." },
             en: { live: "Every morning, which opportunities need your attention.", soon: "Every morning, which opportunities need your attention: coming soon." } };
const CHIP_TARGET = {
  es: { g1: "Desde Growth · redes sociales en Enterprise", g2: "Desde Growth", g3: "Desde Growth",
        t2: "Desde Growth", t4: "Desde Growth", t6: "Opcional, con cualquier plan", t8: "Todos los planes" },
  en: { g1: "From Growth · social media on Enterprise", g2: "From Growth", g3: "From Growth",
        t2: "From Growth", t4: "From Growth", t6: "Optional, with any plan", t8: "Every plan" } };
const G3P_LINE = { es: "Responde al momento y aclara qué busca cada cliente. Proponerle inmuebles que encajan y hacer seguimiento, con su permiso: próximamente.",
                   en: "It replies at once and finds out what each client is looking for. Suggesting listings that fit and following up, with their permission: coming soon." };
const G3P_PHONE = { es: "Cada interesado, respondido al momento.", en: "Every lead, answered at once." };
// Copy §5 (6971369): the 13:20 station is a HANDOVER now, not a notice. With the 17-key gate only
// reminders (13:20) and replyOutOfHours (23:40) stay live, so D-c has two parts in the gate view.
const DC_GATE = { es: "13:20 pasa a Carlos · 23:40 respuesta de noche",
                  en: "13:20 passed to Carlos · 23:40 a night-time reply" };
const DC_TARGET = { es: "08:30 tu día · 11:39 llamada atendida · 13:20 pasa a Carlos · 16:00 piso que encaja · 18:00 seguimiento · 23:40 respuesta de noche",
                    en: "08:30 your day · 11:39 call answered · 13:20 passed to Carlos · 16:00 a listing that fits · 18:00 follow-up · 23:40 a night-time reply" };
const FORBIDDEN = ["Seguimiento hasta que contesta", "Follow-up until they reply", "Inmuebles que encajan, siempre",
                   "Listings that fit, always", "Todos tus leads, atendidos", "Every lead, answered", // careful: "Every lead, answered at once" is G-3p's phone line
                   "Publicaciones para tus redes", "Posts for your social media"];
const ZERO = ["{precio}", "Desde {precio} al mes", "al mes: menos que una comisión"];

const out = [];
const ok = (c, m) => out.push(`${c ? "PASS" : "FAIL"}\t${m}`);
for (const [label, r] of Object.entries(R.runs)) {
  const [loc, view, w] = label.split("-");
  const gate = view === "public";
  const soonExpected = gate ? "true" : "false";
  ok(r.soonFlag === soonExpected, `${label} E-P flag data-strengths-soon=${r.soonFlag} (expected ${soonExpected})`);
  const eyeExp = gate ? EYEBROW[loc].soon : EYEBROW[loc].plain;
  ok(N(r.eyebrow) === eyeExp, `${label} eyebrow "${N(r.eyebrow)}"${N(r.eyebrow) === eyeExp ? "" : ` != "${eyeExp}"`}`);
  ok(N(r.h2) === H2[loc], `${label} G-h unchanged`);
  // G-d hangs on taskList/dailyVoice, both "soon" after API's cee6992, so the gate view takes PX-s
  const gdExp = gate ? GD[loc].soon : GD[loc].live;
  ok(N(r.afterGrowth) === gdExp, `${label} G-d "${N(r.afterGrowth)}"${N(r.afterGrowth) === gdExp ? "" : ` != "${gdExp}"`}`);
  // cards
  for (const c of r.cards) {
    const expState = gate ? GATE_STATE[c.key] : "live";
    ok(c.state === expState, `${label} ${c.key} state=${c.state} (expected ${expState})`);
    const expChip = (gate ? CHIP_GATE : CHIP_TARGET)[loc][c.key];
    ok(N(c.chip) === expChip, `${label} ${c.key} chip "${N(c.chip)}"${N(c.chip) === expChip ? "" : ` != "${expChip}"`}`);
    // app/globals.css:2003 - at <= 639px the section's cards show the title and the phone line ONLY:
    // .st-card .ch-line, .ch-examples and .ch-mark are display:none, .ch-core is block. So the example
    // lines and G-m are a DESKTOP element and cannot be expected at 390 in any state. On the phone the
    // chip is therefore the only state signal, which is why its legibility matters more there.
    const desktop = w !== "390";
    // P-1: title, sentence and phone line stay; examples and mark hidden
    if (expState === "soon") {
      ok(N(c.title).length > 0, `${label} ${c.key} P-1 title kept`);
      ok(N(c.line).length > 0 || N(c.phone).length > 0, `${label} ${c.key} P-1 sentence/phone kept`);
      ok(c.examplesPainted === 0, `${label} ${c.key} P-1 examples hidden (painted=${c.examplesPainted})`);
      ok(!c.markPainted, `${label} ${c.key} P-1 G-m hidden (painted=${c.markPainted})`);
      if (desktop) ok(N(c.line).length > 0, `${label} ${c.key} P-1 sentence painted on the desktop`);
      else ok(N(c.phone).length > 0 && c.phonePainted, `${label} ${c.key} P-1 phone line painted on the phone`);
    }
    if (expState === "partial" && c.key === "g3") {
      const seen = N(desktop ? c.line : c.phone);
      const exp = desktop ? G3P_LINE[loc] : G3P_PHONE[loc];
      ok(seen === exp, `${label} g3 partial text "${seen.slice(0, 70)}"${seen === exp ? "" : ` != "${exp.slice(0, 70)}"`}`);
      if (desktop) {
        ok(c.examplesPainted === 1, `${label} g3 partial exactly 1 example painted (got ${c.examplesPainted})`);
        ok(c.markPainted, `${label} g3 partial G-m kept (painted=${c.markPainted})`);
      } else ok(c.examplesPainted === 0 && !c.markPainted, `${label} g3 partial: phone shows no examples/mark (by design, css:2003)`);
    }
    if (expState === "live" && desktop) {
      ok(c.examplesPainted === 3, `${label} ${c.key} live 3 examples painted (got ${c.examplesPainted})`);
      ok(c.markPainted, `${label} ${c.key} live G-m painted`);
    }
    if (expState === "live" && !desktop) {
      ok(c.examplesPainted === 0 && !c.markPainted, `${label} ${c.key} live: phone shows no examples/mark (by design, css:2003)`);
      ok(c.phonePainted && N(c.phone).length > 0, `${label} ${c.key} live: phone line painted`);
    }
  }
  // form A: D-c on the phone only, stations from 640
  if (w === "390") {
    ok(r.compactPainted === true, `${label} form A: D-c painted on the phone`);
    ok(r.stationsPainted === 0, `${label} form A: 0 stations painted on the phone (got ${r.stationsPainted})`);
    const expDc = gate ? DC_GATE[loc] : DC_TARGET[loc];
    ok(N(r.compact) === expDc, `${label} D-c "${N(r.compact)}"${N(r.compact) === expDc ? "" : ` != "${expDc}"`}`);
  } else {
    ok(r.compactPainted === false, `${label} form A: D-c not painted on the desktop`);
    const expStations = gate ? 2 : 6;
    ok(r.stationsPainted === expStations, `${label} form A: ${r.stationsPainted} stations painted (expected ${expStations})`);
    if (gate) {
      const times = r.stations.filter(s => s.painted).map(s => s.time).join(",");
      ok(times === "13:20,23:40", `${label} gate stations = ${times} (expected 13:20,23:40)`);
    }
  }
  // zero hits and forbidden titles
  const body = N(r.body);
  for (const z of ZERO) ok(!body.includes(z), `${label} zero hit for "${z}"`);
  for (const f of FORBIDDEN) {
    if (f === "Every lead, answered") { // only a violation when NOT followed by "at once" (G-3p's phone line)
      const bad = /Every lead, answered(?! at once)/.test(body);
      ok(!bad, `${label} forbidden title "Every lead, answered" absent (as a title)`);
    } else ok(!body.includes(f), `${label} forbidden title absent: "${f}"`);
  }
}
const fails = out.filter(l => l.startsWith("FAIL"));
console.log(out.join("\n"));
console.log(`\n==== ${out.length - fails.length} pass, ${fails.length} FAIL ====`);
if (fails.length) console.log("\nFAILURES ONLY:\n" + fails.join("\n"));
