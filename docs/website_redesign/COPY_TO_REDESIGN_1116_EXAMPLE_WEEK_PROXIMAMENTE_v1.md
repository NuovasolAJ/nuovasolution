# COPY → Redesign · The new example week (25 Spanish enquiries) and the "Próximamente" wording · ES + EN · Mon 16.11.2026, evening

**For:** Redesign (session nuovasolution-74) and the Reviewer (RV6).
**Deadline:** the example week is due at Redesign by Tue 17.11. 12:00. The "Próximamente" wording is held ready and **not yet inserted**.
**Status:** editorial and technical check only. Not a legal approval, not a Meta approval. Every figure here is fictional and marked as an example on the page.

## 0. The owner's decision of 16.11., evening, and what it changes in Copy's files

**The decision:**
- The preview shows everything as in the target view, with no badges.
- Each function gets a switch, "live / próximamente".
- The switches are set only on the day before go-live. Whatever is not in production then gets "Próximamente".

**Copy's earlier "public" rows are not deleted.** They become the material for that day. Section 1 says which wording each switch uses.
- Affected: `COPY_TO_REDESIGN_1116_PILOT14_TEXTS_v1.md` §10 and §12, and `COPY_TO_REDESIGN_1116_OWNER_LIST_TEXTS_v1.md` §9 and §9.1.
- **No longer valid for the preview:**
  - "public only email" (W-1 public, §9.1);
  - "3D only after topic 17";
  - "Instagram omitted in public".
- **Stays valid in every view:**
  - no false sentence;
  - no delivery time;
  - no customer quotes;
  - no score number;
  - "Lo cancelas cuando quieras" stays out;
  - TR-3 says only "guardados".

---

## 1. "Próximamente": the wording, held ready

### 1.1 The word and the rules

| # | ES | EN |
|---|---|---|
| PX-b | badge: Próximamente | Coming soon |
| PX-s | sentence form: {Función}: próximamente. | {Function}: coming soon. |

**Rules:**
1. **One word for everything.**
   - Wherever the site says "En preparación" today, that becomes "Próximamente" on the switch day:
     - Instagram;
     - the WhatsApp media;
     - "Más idiomas, en preparación";
     - "WhatsApp con el número de tu agencia: en preparación".
   - The site never uses two words for one state.
2. **No date and no "pronto" or "en breve" next to it.** "Próximamente" promises no time.
3. **The badge never sits on a sentence that says the function works today.**
   - If the sentence states the function as done ("Responde en segundos por WhatsApp…"), the sentence changes to its PX variant in 1.2.
   - Adding a badge to it is not enough.
4. **A switched-off function in the plans:** the cell shows PX-b, not "✓" and not "—". The legend gains "Próximamente: aún no activo" / "Coming soon: not active yet".
5. **A switched-off demo tab or scene keeps playing.** It is a marked demonstration. Its tab carries PX-b.

### 1.2 Per function: what changes when its switch says "próximamente"

| Key | Function (ES · EN) | Plans cell / list line (ES · EN) | Sentences that change, and their PX variant |
|---|---|---|---|
| `whatsappOwnNumber` | WhatsApp con el número de tu agencia · WhatsApp on your agency's own number | WhatsApp con el número de tu agencia: próximamente. · WhatsApp on your agency's own number: coming soon. | **Channel line:** "Respuestas en español por email. WhatsApp con el número de tu agencia: próximamente." / "Replies in Spanish by email. WhatsApp on your agency's own number: coming soon." **A-1:** "Responde en minutos por email. WhatsApp: próximamente." / "Replies within minutes by email. WhatsApp: coming soon." **Platform pages:** the email variants of `COPY_TO_REDESIGN_1116_OWNER_LIST_TEXTS_v1.md` §9.1 plus the line above. **Hero bubble:** W-4 (email) |
| `model3d` | Visualización 3D · 3D visualisation | Opcional · próximamente · Optional · coming soon | the 3D section's eyebrow "Un servicio aparte · Próximamente" / "A separate service · Coming soon"; "Pregúntanos por el 3D" stays (a question is possible before it is active) |
| `phoneAssistant` | Llamadas · Calls | Llamadas: próximamente. · Calls: coming soon. | **FAQ "¿Atiende llamadas?":** "Todavía no. Llamadas: próximamente." / "Not yet. Calls: coming soon." |
| `otherLanguages` | Respuestas en otros idiomas · Replies in other languages | Otros idiomas: próximamente. · Other languages: coming soon. | **L-1 and L-2 stay as written** (they already say Spanish only). The FAQ's "Más idiomas, en preparación." becomes "Más idiomas: próximamente." / "More languages: coming soon." |
| `instagram` | Instagram | Instagram: próximamente. · Instagram: coming soon. | the Enterprise line: "Todo lo de Growth, para varias oficinas. Instagram: próximamente." |
| WhatsApp media (MM, `MEDIEN-FIX-PROD`) | Fotos, planos y notas de voz por WhatsApp · Photos, floor plans and voice notes on WhatsApp | Fotos, planos y notas de voz por WhatsApp: próximamente. · …: coming soon. | F-p of 1113 §3; the email PDF line F-2e stays live (MM run 161640) |
| `matching` | Inmuebles que encajan con cada cliente · Listings that fit each client | Inmuebles que encajan con cada cliente: próximamente. | C-5 of 1116 §3, the same words |
| `followup` | Seguimiento automático del cliente · Automatic client follow-up | Seguimiento automático: próximamente. · Automatic follow-up: coming soon. | — |
| `alert` | Aviso a la persona adecuada · Alert to the right person | Aviso por email a la persona adecuada: próximamente. | the platform point "Un aviso por email a la persona adecuada…" gets the PX-s form |
| `taskList` | Lista de tareas del equipo · The team's task list | Lista de tareas: próximamente. · Task list: coming soon. | **To be measured on the switch day:** API names the staff app with tasks as present on day one (`f7c390d`), so this switch is probably "live" |
| `mailboxConnection` / `replyEmail` | — | **never "próximamente"** | the owner ties the go-live to A12 (16.11.): if A12 slips, the go-live slips, not the text |

**Card K1** ("Lee el anuncio…") and **card K2** ("Ninguna consulta se queda sin aviso"): both are in production since 13.11. If either is not, on the switch day, the card goes. A card with a badge would contradict its own proof line.

---

## 2. The new example week: 25 enquiries, all in Spanish, "Esperan a una persona" = 0

### 2.1 The week in one table (the same everywhere: pain band, comparison, report, /example-report, demo)

| Figure | Old | New | Note |
|---|---|---|---|
| Enquiries received | 25 | **25** | unchanged |
| Language | 23 Spanish + 2 other | **25 Spanish** | the Kellers now write in Spanish (2.3) |
| Answered automatically | 23 | **25** | all on arrival |
| Esperan a una persona (no reply yet) | 2 | **0** | owner |
| Arrived with the office closed | 9 (before 2 · midday 2 · after 5) | **9**, the same split | all 9 answered on arrival |
| Viewings asked for / agreed | 6 / 4 | **6 / 4** | unchanged |
| Peak hour | 11:00–12:00 · 6 | **unchanged** | the hours rows still add up to 25 |
| Channels, target | WhatsApp 10 · Email 6 · Web form 3 · Phone 2 · Portals and ads 4 | **unchanged** | = 25 |
| Channels, WhatsApp and email only | 14 · 11 | **unchanged** | |
| High priority | — | **3** (Laura, Carmen, the Kellers) | new public card, 2.2 |

**Office hours of the example agency:** unchanged, 10:00–14:00 and 17:00–20:00.

### 2.2 The lines that change (file:line on today's HEAD)

**`lib/content/home-1103.ts`**

| Where | ES new | EN new |
|---|---|---|
| `:276` public card 2 | *(unchanged)* | |
| `:277` public card 3, replaces "2 de 25 · llegaron en otro idioma…" | figure "3 de 25" · insight "tienen prioridad alta, cada una con su motivo." · next "Empieza hoy por esas 3." | "3 of 25" · "have high priority, each with its reason." · "Start with those 3 today." |
| `:289` series (the chart) | see 2.4 | |
| `:325` metric "Respondidas" | v "25" · d "Consultas con una respuesta automática en español, al llegar." | v "25" · d "Enquiries with an automatic reply in Spanish, on arrival." |
| `:326` metric "Esperan a una persona" | v "0" · d "Consultas que todavía no han recibido ninguna respuesta. Esta semana, ninguna." | v "0" · d "Enquiries that have not had any reply yet. This week, none." |
| `:360` comparison row | k unchanged · without "25" · with "**0**" · d "Con NuovaSolution, las 25 reciben la primera respuesta en español al llegar." · **tone: normal** (it is a result now, not a neutral grey) | d "With NuovaSolution, all 25 get their first reply in Spanish on arrival." |
| `:365` closeWith, first sentence | Ninguna consulta se pierde de vista: las 25 respondidas al llegar y las 25 en su ficha. | No enquiry slips out of sight: all 25 answered on arrival and all 25 on their record. |
| `:252` reportScene figure "Respondidas" | "25" | "25" |
| `:169–180` the Kellers' record | see 2.3 | |

**`lib/content/example-report.ts`**

| Where | ES new | EN new |
|---|---|---|
| `:34` / `:77` "Respondidas" | value "25" · line "con una respuesta automática en español, al llegar" | value "25" · line "with an automatic reply in Spanish, on arrival" |
| `:36` / `:79` "Esperan a una persona" | value "0" · line "consultas sin ninguna respuesta todavía · esta semana, ninguna" | value "0" · line "enquiries without any reply yet · none this week" |
| `:38` / `:81` trend alt | see 2.4 | |
| `:43` / `:86` week 4 | received 25 · second series see 2.4 | |
| `:48` / `:91` funnel step "Respondidas" | v 25 | v 25 |
| `:57` / `:100` the Kellers' state | "Pendiente del equipo" (Redesign's wording, accepted). The next step stays "Proponer una fecha para la valoración" | "Pending with the team" |
| `:9` comment | 25 received · 25 answered · 0 waiting · 6 / 4 | |

**`lib/content/home-story.ts`** (if still rendered; the platform pages and the product views read it)

| Where | ES new | EN new |
|---|---|---|
| `:171–179` the Kellers' message | language "español" (`lang: "es"`). text = today's `translation.text.es`. reply = today's `translation.reply.es` (Spanish, sent automatically). `translation` is no longer needed | "Spanish"; EN text and reply = today's `translation.*.en` |
| `:282` result | Cuando Marcos termina, las cuatro están registradas: tres con respuesta escrita y una llamada atendida. | When Marcos finishes, all four are recorded: three with a written reply and one call answered. |
| `:290` inbound | Una pregunta por WhatsApp, un email, un formulario, una llamada. | A WhatsApp question, an e-mail, a web form, a call. |
| `:291` did | Responde en español y guarda lo que pide cada cliente. | Replies in Spanish and keeps what each customer asks for. |
| `:293` state | Disponible hoy: respuestas en español por WhatsApp y email, y la ficha. | Available today: replies in Spanish on WhatsApp and e-mail, and the record. |
| `:373` after | Cuando Marcos termina la visita, las cuatro consultas están registradas: tres con respuesta escrita y una llamada atendida con nota. | When Marcos finishes the viewing, all four enquiries are recorded: three with a written reply and one call answered with a note. |
| `:386–390` the Kellers' subject and held reply | subject "Re: Valoración de nuestra villa en Elviria". `heldTitle`/`heldLine` are no longer shown for the Kellers; their mail shows "Respondida" like the others | "Re: Valuation of our villa in Elviria" |
| `:427` / `:433` the Kellers in the list | what "Valoración de una villa en Elviria · respondida por email" · next "Proponer una fecha para la visita" | "Valuation of a villa in Elviria · answered by e-mail" · "Propose a date for the viewing" |
| `:503` handled | value "25" · line "consultas respondidas y registradas · WhatsApp 14 · email 11 · la entrega al cliente no se mide" | "25" · "… WhatsApp 14 · e-mail 11 …" |
| `:505` next | value "2" · line "cosas para tu equipo: proponer fecha a los Keller y la respuesta de Sofía" | "things for your team: a date for the Kellers and Sofía's reply" |

**Why `:505` changes:** the two items are the team's next steps, not enquiries without a reply. The phrase "esperan a una persona" is kept for one meaning only, enquiries without any reply, which is 0.

**`lib/content/home-demo.ts:159`:** the Kellers' inbox subject becomes "Valoración de nuestra villa en Elviria" (ES and EN view alike, as it is the client's own text).

**`lib/content/morning-brief-demo.ts:43–47`:**

| Field | ES new | EN new |
|---|---|---|
| kind | Falta una fecha | A date is missing |
| lines | Quieren vender su villa en Elviria y piden una valoración esta semana. · Ya tienen la respuesta automática; falta que alguien les proponga una fecha. | They want to sell their villa in Elviria and ask for a valuation this week. · They already have the automatic reply; someone still has to propose a date. |
| step | Proponer una fecha para la valoración | Propose a date for the valuation |
| state | *(unchanged)* Abierta · desde ayer 11:24 | |

**`lib/contracts/reports.ts:93`:** test fixture, not on the site. No change needed.

### 2.3 The Kellers' record (`home-1103.ts:169–180`)

**What happens to the language scene:**
- The language-recognition scene loses its German example; this follows the owner's week.
- The language rule itself stays on the page through L-1 (FAQ, Organiza O-4) and L-2 (hero chip).
- For the scene's comment: when `otherLanguages` goes live, a German example can return as its own scene, outside the example week.

| Field | ES new | EN new |
|---|---|---|
| title | Ficha de Peter y Anna Keller *(unchanged)* | |
| fields | Intención: vender · Zona: Marbella · Elviria · Inmueble: villa · Idioma: español · Respuesta: automática, en español | Intent: selling · Area: Marbella · Elviria · Property: villa · Language: Spanish · Reply: automatic, in Spanish |
| events | mar 11:24 · Email · Consulta: quieren vender su villa y piden una valoración — mar 11:25 · Email · Respondida en español · falta proponer una fecha | Tue 11:24 · E-mail · Enquiry: they want to sell their villa and ask for a valuation — Tue 11:25 · E-mail · Answered in Spanish · a date still to propose |

**"Intención: vender":** this stands today as built. Lead's Q-A2 on the intent values is still open. Copy does not add "vender" anywhere new.

### 2.4 The chart "Consultas por semana"

With 25 of 25 answered, "Recibidas" and "Respondidas" would draw one line over another. **Proposal:** the second line shows the enquiries that arrived with the office closed. All of them were answered.

| | Sem. 1 | Sem. 2 | Sem. 3 | Sem. 4 |
|---|---|---|---|---|
| Recibidas | 19 | 24 | 21 | 25 |
| Con la oficina cerrada | 7 | 10 | 8 | 9 |

- **Second series label:** ES "Con la oficina cerrada" · EN "Office closed".
- **Note:** ES "Cuatro semanas de ejemplo. Todas recibieron respuesta al llegar." · EN "Four example weeks. All got a reply on arrival."
- **Alt:** ES "Gráfico de líneas: consultas recibidas y consultas con la oficina cerrada en cuatro semanas de ejemplo: 19 y 7, 24 y 10, 21 y 8, 25 y 9." · EN "Line chart: enquiries received and enquiries with the office closed in four example weeks: 19 and 7, 24 and 10, 21 and 8, 25 and 9."
- **Fallback:** if a second series is too much for Wednesday, keep "Respondidas" equal to "Recibidas" (19 · 24 · 21 · 25), with the same note.

### 2.4b The home page FAQ (owner, via Redesign)

Four questions plus a link: "Más preguntas" / "More questions" (replaces "Todas las preguntas").

### 2.5 What stays as it is

- The pain band P-h "9 de 25 consultas llegaron con la oficina cerrada. ¿Quién les contestó?"
- Report card K1 "Las 9 recibieron respuesta al llegar".
- The comparison's rows for the closed office.
- Laura's Thursday viewing (see the scope note in OWNER_LIST §3).
- The open cases and the "Qué hacer" lines.

---

## 3. Open

| # | Question | Who | By |
|---|---|---|---|
| Q-12 | The switch list for go-live: every key in 1.2 against production, with run IDs (owner: RV6 (c)) | Reviewer with API/Lead/MM/Daily | the day before go-live |
| Q-A2 | Intent values ("vender") | Lead | Tue 17.11. |
