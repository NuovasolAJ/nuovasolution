# WEBSITE COPY — return, round 2026-10-23 (R23)

**State:** `2026-10-23` · **Lane:** Website Copy / Product Truth
**Checked:** `a76e6e1` / `dpl_GLRzbYXujgTNW1MvS6TboEyF889m`, through its fixed URL
`https://nuovasolution-design-preview-n67lo7zbl-nuovasolajs-projects.vercel.app`; `/api/build` returned commit
`a76e6e1aac01…`, mode `stub`. 25 routes read with GET, ES and EN: home, platform and its four module pages,
packages, FAQ, contact, trial, social, the four legal routes. Each check covers the rendered HTML **including the
RSC payload** and the source of `a76e6e1`.
**Basis for product claims:** Gate §18 promise table (19.10.), with what §24 (23.10.) adds; Voice's
`VOICE_TO_COPY_WEBSITE_1023_PHONE_LANGUAGE_v1.md` for the phone.
**Marking:** technical and editorial check. **Not a legal approval, not a Meta approval.**

---

## 1. The handover on this build: 38 of 38 applied

Every row of `WEBSITE_COPY_HANDOVER_1021.md` (`22d65fb`) was checked by machine: the old text must be gone from
the rendered ES and EN pages, and the new text must be present.

| Result | Rows |
|---|---|
| applied as written | 35 |
| applied, spelling differs | A-12 EN: "email" for "e-mail"; the site uses both forms, so no row |
| applied, the old word survives only where nothing renders | C-6 ("Puestos"/"Seats" as unused dictionary labels), F-1 ("in the customer's language" in code comments) |

## 2. The language finding is resolved: the FAQ was the source

RV1 and RV2 reported a language claim that I could not find on `deb9b66`. **It is in the FAQ**, which no earlier
route list of mine included:

> "¿En qué idioma responde a mis clientes? — **En el idioma en el que escribió el cliente.** Tú defines un idioma
> por defecto…" · EN "In the language the customer wrote in…"

It is on `a76e6e1` and was on `deb9b66` (`lib/content/faq.ts:70-71`). The Reviewer's finding was right in
substance, and my statement in R21 and R22 that the claim "is not on `deb9b66`" was wrong for the site as a
whole. It was true only for the home page and the sentence as quoted. **Corrected here, row W-1.** The FAQ is
now part of every route list.

## 3. Lines to Website, one per deviation

States use the site's two words. Every replacement comes from the production column.

| # | Where on `a76e6e1` | Current | New ES | New EN | Why |
|---|---|---|---|---|---|
| W-1 | `lib/content/faq.ts:70-71`, FAQ "¿En qué idioma responde…?" | "En el idioma en el que escribió el cliente. Tú defines un idioma por defecto…" | En español. En otro idioma no se envía nada automáticamente. | In Spanish. In another language nothing is sent automatically. | other languages not in prod; the canonical sentence |
| W-2 | `faq.ts:124-125`, FAQ "¿Me dice qué leads están calientes?" | "No como una puntuación… **No se te envía ningún mensaje de alerta.**" | Sí, por email. Cuando una consulta parece importante, la persona adecuada de tu equipo recibe un aviso con el motivo. Todavía sin horario de oficina. | Yes, by e-mail. When an enquiry looks important, the right person on your team gets an alert with the reason. No office hours yet. | the hot-lead mail is E2E in prod (H1); the FAQ contradicted the home page, the platform and the packages |
| W-3 | `app/[locale]/platform/page.tsx`, the four task sections | no row shows its state; the `state` in `platform-map.ts` is never rendered | render each row's state: **Disponible** · **En preparación · todavía no contratable** · **Por encargo** | **Available** · **In preparation · not bookable yet** · **To order** | nine rows read as available although they are not: web forms, phone, proposals, follow-ups, morning assistant, calendar, Instagram posts, comments, ad leads |
| W-4 | `components/home/hero-world.tsx:95`, the channel row in the hero panel | WhatsApp · Email · **Formulario web · Teléfono**, no state | show **WhatsApp** and **Email** only; web form and call stay in story A with "Prototipo" | the same | the first screen must not show the two prototype channels as handled |
| W-5 | `lib/content/home-story.ts:259`, hero result | "Aviso a tu equipo" | Aviso por email a tu equipo | E-mail alert to your team | the alert is unambiguous only with its channel; story D and the platform already say e-mail |
| W-6 | `lib/content/home-sections.ts:86-87`, "Qué hacemos nosotros al conectar" | "…el aviso de IA que lleva cada respuesta **y el idioma por defecto**." | Configuramos contigo el aviso de IA que lleva cada respuesta. | We set up with you the AI notice every reply carries. | a default language implies a choice that does not exist, also on the phone (Voice 23.10.) |
| W-7 | `lib/i18n/dictionaries/es.ts:159` / `en.ts:177`, card on `/platform/lead-intelligence` | "Pide: 2 dormitorios, Estepona · EST-204" · "Quiere ver: el jueves por la mañana" · "**Escribe en: inglés**" | Pide: 2 dormitorios, Estepona · Quiere ver: la semana que viene · Escribe en: español | Asked for: 2 bedrooms, Estepona · Wants to view: next week · Writes in: Spanish | Laura writes in Spanish everywhere else, and a card showing English handling is the language claim again |
| W-8 | `es.ts:470` / `en.ts:509`, trial step 06 "Fuentes de leads" | "Conecta los sitios de donde ya te llegan los leads." | Dinos de dónde te llegan hoy los leads. Conectar esas fuentes está en preparación. | Tell us where your leads come from today. Connecting those sources is in preparation. | the ad-lead intake is in preparation (owner 20.10.); the step presented it as available |
| W-9 | `home-story.ts:306`, story B `did` (**new on this build, not from the handover**) | "…; en otro idioma **deja la consulta en la ficha para tu equipo**." | …; en otro idioma no envía nada. | …; in another language it sends nothing. | "para tu equipo" is the held-reply hand-off, which is staging only |
| W-10 | `faq.ts:316`, FAQ "¿Me traéis leads de publicidad?" | "No. Nuova trabaja sobre las consultas que llegan a tu agencia." | No. No hacemos campañas ni compramos leads. Más adelante recogeremos los leads de los anuncios que ya tienes. | No. We do not run campaigns or buy leads. Later we will take in the leads from the ads you already run. | the same message as the packages and the platform; running ads stays outside the launch (R23-e) |
| W-11 | `home-story.ts:415-416`, story C, the proposal to Laura | "Laura, **dos pisos de la cartera encajan** con lo que describes: …" | Laura, tenemos dos pisos que encajan con lo que buscas: … *(rest unchanged)* | Laura, we have two flats that fit what you are looking for: … | natural dialogue: "la cartera" is the agency's word, not one said to a customer |
| W-12 | `home-story.ts:41, 439, 445`, `lib/content/morning-brief-demo.ts:54` | "+34 600 123 456" | +34600123456 | +34600123456 | the morning-letter rule from R18: an E.164 number is never regrouped |
| W-13 | `es.ts:42-43`, `lib/content/capabilities.ts:68, 101`: footer, platform overview, module titles on the **Spanish** pages | "AI Sales Agent", "Lead Intelligence" | Asistente de consultas · Ficha del cliente | unchanged | the brief forbids mixed-language UI. **If the owner keeps the English names as product names, this row is void** and the exception should be written down once |

## 4. Evidence questions, before a wording can be fixed

Unclassified in Gate §18 and §24. Nothing is changed until there is an answer. Where the answer is "not in
prod", the fallback is given so Website can apply it in the same pass.

| # | To | Question | Where it matters | Fallback if "not in prod" |
|---|---|---|---|---|
| Q-1 | API | Does a production reply **use listing facts** (terrace, garage) and send the listing ("Te paso la ficha con fotos y plano")? The FAQ says proposals are switched off and that replies come from "lo que escribió el cliente y lo que tu agencia ha confirmado". | hero lead "con los datos de tu cartera", hero reply, story B `did`, trial step 08 "Fuente de propiedades" | hero lead: "Responde a lo que llega por WhatsApp y email, guarda lo que busca cada cliente y avisa por email a tu equipo cuando una consulta importa." and the hero state line adds "Respuestas con datos del inmueble: en preparación." |
| Q-2 | API, Lead | What happens in production when a customer **asks for a person**? The platform row "Paso a una persona" is `available`, and the approved disclosure says "Si prefieres hablar con un agente humano, indícamelo". | `platform-map.ts:56` | state **En preparación · todavía no contratable** |
| Q-3 | API | Is a **held** enquiry in another language **recorded** (lead row) in production? My handover row A-6 says "las cuatro consultas tienen ficha". | A-6 on the home page | A-6: "…tres con respuesta y ficha, y la que llegó en alemán sin respuesta automática, porque hoy solo respondemos en español." |
| Q-4 | Daily | When someone takes a task, **does it disappear** from the others' lists, or do they see it as taken, and by whom? | the "Tareas diarias" page (`capabilities.ts:216`: "Desaparece de las listas de los demás") against the home page ("Los demás ven que está tomada y por quién") and the FAQ ("ver quién ha tomado las demás") | whichever Daily confirms; the other two sentences follow it |

## 5. The owner's points on this build

| Point | Verdict | Rows |
|---|---|---|
| Hero: benefit and the work already done | **holds**: "Mientras enseñas una vivienda, Nuova atiende tus consultas" and "Lo que ya está hecho" with three results; one channel row and the alert channel to fix | W-4, W-5, Q-1 |
| Natural dialogues | **hold**, Laura's messages and the replies read naturally; one agency word in the proposal | W-11 |
| Hot lead unambiguous | **not yet**: the home page, the platform and the packages say "aviso por email", and the FAQ says no alert is sent | W-2, W-5 |
| Honest social follow-up path | **holds**: "Prototipo · depende de la aprobación de la plataforma", the reply does not claim availability, "una persona del equipo le escribe por privado", no campaign, no spend. On the platform page the two Instagram rows lack their state | W-3 |
| Packages: available against planned | **holds on the packages**, every feature carries its state; **not on the platform page** | W-3, W-8 |
| Phone only in Spanish | **holds** in the story (Álvaro, "español", "Prototipo: … la llamada"; FAQ "¿Atiende llamadas? No"); Voice's line on the default language is W-6 | W-6 |
| No stronger claims for unproven functions | **five places** claim more than production: the FAQ language answer, the platform rows without state, the hero channel row, the lead-sources step, the hand-off in story B | W-1, W-3, W-4, W-8, W-9 |

**One condition for publication, not a row:** the trial ("Probar gratis", "Creas la cuenta tú mismo", the
whole `/trial` page) describes self-onboarding, which is **staging only** (Gate §18; E28 open). Before the site
is public, either the production onboarding exists or the trial entry points lead to a request instead.

## 6. E22: the wording for Social

Social reported reminder and escalation as missing. **They exist, all three:**

- **File:** `docs/website_redesign/WEBSITE_COPY_1020_ON_DEB9B66_v1.md`, **§5** "C2 — the three E19 staff templates
  for E22"
- **Commit:** `81234e5`, on `origin/website_enterprise_redesign` since the push of 23.10. (`fea4be0`)
- **Read it:** `git fetch origin && git show 81234e5:docs/website_redesign/WEBSITE_COPY_1020_ON_DEB9B66_v1.md`

| Template | Spanish text, verbatim | Button |
|---|---|---|
| `ns_alerta_empleado_v1` | Nueva consulta para ti: {{1}} ({{2}}), recibida por {{3}}. Está en tu lista de tareas. | Abrir tarea |
| `ns_recordatorio_empleado_v1` | Recordatorio: la consulta de {{1}} ({{2}}) sigue sin que nadie la tome desde las {{3}}. Puedes tomarla en tu lista de tareas. | Abrir tarea |
| `ns_escalado_empleado_v1` | La consulta de {{1}} ({{2}}) llegó a las {{3}} y todavía no la ha tomado nadie del equipo. Te la pasamos para que no se quede esperando. | Abrir tarea |

Variables: `{{1}}` first name or "Sin nombre" · `{{2}}` the occasion · `{{3}}` the channel (alert) or the time it
arrived in the agency's zone (reminder, escalation). These texts replace the raw texts in Social's
`SOCIAL_E22_WHATSAPP_TEMPLATES_v3.md` lines 41–43. The one changed phrase: "Ábrelo en tu panel" becomes "Está en tu
lista de tareas".

**Owner 23.10.:** E22 staff = JA for **the alert only**, submission and not sending. Reminder and escalation
follow after API's L4 correction. This lane submits nothing.

## 7. Legal pages

**E14 is not complete.** API's `E14_CHECK` (23.10., re-verified 07:34Z) found only the trade name and the country
filled in, and every other field empty, so no signal has come. This lane has not opened the owner's file.

**Owner 23.10.:** the legal notice goes live on nuovasolution.com once E14 is complete; the privacy notice only
after counsel.

| Page | Source | What remains before it can go live |
|---|---|---|
| **Legal notice** | `LEGAL_PAGES_FINAL_v1.md` §1 (v4) | **only the E14 fields.** No other mark. Once API signals, the five fields are filled from the owner's file and Website publishes. |
| Privacy notice | §2, with `META_LEGAL_TEXT_FINAL.md` §1 | E14, retention (owner, then counsel), **counsel's review** |
| Terms | §3, with `META_LEGAL_TEXT_FINAL.md` §2 | E14, counsel: DPA, liability |
| Data deletion | `META_LEGAL_TEXT_FINAL.md` §3 | E14, the production purge path (one conditional sentence) |

**`META_LEGAL_TEXT_READY` = NO**, and it stays NO until E14 is complete, the deletion path exists in production
and the retention is decided and implemented.

**Contribution to API's counsel package (R23-d, "Rechtsseiten v4 von Copy").** API compiles the package; these are
the inputs and how they are marked.

| Input | Path, at `fea4be0` |
|---|---|
| Legal notice, privacy, terms, deletion, ES and EN | `docs/website_redesign/LEGAL_PAGES_FINAL_v1.md` (v4) |
| Instagram sections, terms block, deletion page | `docs/website_redesign/META_LEGAL_TEXT_FINAL.md` |
| Decision sheets and counsel questions CQ-1…CQ-21 | `docs/website_redesign/COUNSEL_PACKAGE_v2.md` |

| Open gap | Kind |
|---|---|
| retention period per data class (options A/B/C, recommendation C, `META_LEGAL_TEXT_FINAL.md` §5b) | **legal**, after the owner's choice |
| processing agreement as an annex, and when the agency accepts it | **legal** |
| limitation of liability | **legal** |
| whether the providers' standard contractual clauses suffice as transfer basis (CQ-20) | **legal** |
| the 72 h confirmation and 30 day completion on the deletion page | **legal** |
| the production deletion path behind the one conditional sentence | **technical** |
| retention implemented as decided; backups 7 d / 14 d / +30 d with storage unbacked | **technical** |
| the E14 fields | **owner's data**, neither legal nor technical |

## 8. `.staging-hold`

Noted: Website's deletion for the staging build belongs to R20 W3, an owner order. **No countermeasure.** My
R22 return reported the staged deletion as another lane's open change. That was a report, not an action, and it
needs nothing further.

## 9. Reviewer

**Our readings differ on one point, and it is resolved by the rendered text.** RV3 (`344feef`,
`REVIEWER_SYNC_1023_RETURN_v1.md`) closes F-R16-5 on the strength of the hero line. On the same build,
`/es/faq` renders "¿En qué idioma responde a mis clientes? En el idioma en el que escribió el cliente. Tú defines
un idioma por defecto…", and `/en/faq` renders "In the language the customer wrote in…". **F-R16-5 is
therefore still open on `a76e6e1`**, in the FAQ, and closes with W-1. To the Reviewer: please add `/faq` and the
four `/platform/<module>` pages to the language check, as I have.

Same build, same basis. My readings for RV3 on `a76e6e1`: the language claim lives in the FAQ (§2, W-1), the hot
lead contradicts itself in the FAQ (W-2), and the platform page drops every state (W-3). If our readings differ,
the rendered HTML of `a76e6e1` decides, quoted with its route. The next named build from Website R23 is checked by
both of us together.

## 10. Preconditions remaining

| # | Precondition | Who |
|---|---|---|
| 1 | W-1…W-13 on the next named build | Website |
| 2 | Q-1…Q-3 | API, Lead |
| 3 | Q-4 | Daily |
| 4 | W-13: English module names kept or not | Owner |
| 5 | E14 complete, then the legal notice filled and published | Owner, API, Copy, Website |
| 6 | counsel's review of the privacy notice and terms; retention decision | Owner, counsel |
| 7 | the production deletion path | Hosting, API |
| 8 | production onboarding (E28), before the trial goes public | API, Owner |
| 9 | E22 reminder and escalation after L4 | API, Social |

## 11. What I did not do

No application code, no design. No acceptance and no publication. The owner's E14 file was not opened; no
company data was written. No E22 text was rewritten or submitted. The pages were read with GET only, and no form
was submitted.
