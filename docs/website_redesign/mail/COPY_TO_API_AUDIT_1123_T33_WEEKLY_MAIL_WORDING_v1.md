# Copy → API, Audit (cc Hosting): topic 33, the weekly mail, ES/EN wording of the four fixes · 23.11.2026, due Wed 25.11.

**Order:** the owner, 23.11.:
> "Thema 33: API hat die vier Fehler der Wochenmail gebaut (82f988a6, noch nicht in Prod) und eine Abweichung gefunden … Bitte den Wortlaut ES/EN prüfen und Änderungen bis Mi an API und Audit."

**Read, n8n repo, read only:**
- `82f988a6`: the `API_SIGNALS_1030.md` entry of 23.11. 08:44Z;
- `governance/evidence/t33_weekly_mail_render_1123.json`;
- the strings of the node "Build Email Content" in `build/reporting/NuovaSolution_Report_Delivery_v3_T33.json`, read as text only. Nothing was run or sent.

**Status:** an editorial and technical check, not a legal approval.

**Result:**
- The four fixes are right. API can build on them.
- Three additions follow:
  - W-2 removes the coming-soon strings from the code;
  - W-3 is a question about the agency's name;
  - W-4 concerns the no-reply address against a line that invites a reply.
- W-5 is an optional footer line.
- W-6 is Copy's position on 14 vs 19.

---

## 1. The four fixes

| # | Fix (API) | Copy | ES (final) | EN (final) |
|---|---|---|---|---|
| W-1 (a) | the comparison follows the enquiry sentence and names its noun | **confirmed** | Llegaron {n} consultas. La semana anterior llegaron {m} consultas. · with 1: La semana anterior llegó 1 consulta. | {n} enquiries arrived. The week before, {m} enquiries arrived. · with 1: The week before, 1 enquiry arrived. |
| W-1, add | **missing case:** the week before had 0 enquiries. The node has no string for it | add | La semana anterior no llegó ninguna consulta. | The week before, no enquiries arrived. |
| W-2 (b) | the paragraph "Esto no lo medimos todavía … aparecerá aquí" no longer renders | **confirmed**, plus: **delete the strings from the node**, not only the condition that shows them. That covers "Esto no lo medimos todavía: ${l}. Cuando lo hagamos, aparecerá aquí.", "We do not measure these yet: ${l}. When we do, they will appear here.", "not measured yet / coming soon", and the "Not measured" / "not measured" labels if nothing else uses them | — | — |
| W-3 (c) | "Nuova" → "NuovaSolution", 16 places | **confirmed**. **One question, see below** | Tu semana en NuovaSolution: {n} consultas recibidas | Your week in NuovaSolution: {n} enquiries received |
| W-4 (d) | From = "NuovaSolution <no-reply@…>" | **the name is confirmed**. **The address needs one decision, see below** | display name: NuovaSolution | display name: NuovaSolution |

**Why W-2 goes beyond the render:** it is the same rule as on the website. The owner's clarification of 20.11. says no hidden functions and no "Próximamente". A paragraph that a later flag can switch back on is exactly that.

**W-3, the question:** the render was made for the agency `nuovasolution`, so "pasó en NuovaSolution" cannot show whether the agency's name comes from the data.
- For a customer, the line must read "Esto es lo que pasó en {nombre de la agencia} del … al …", and the header "Resumen semanal · {nombre de la agencia}".
- **API, please confirm two things:**
  - `${input.agency}` is the agency's display name from its record;
  - none of the 16 replacements touched that variable.
- **The rule:** "NuovaSolution" is the product. The agency always appears under its own name.

**W-4, the decision:** the sender stays `no-reply@`. But the mail has the line "Si esperabas consultas esta semana, dinos por qué canal y lo revisamos contigo." / "If you expected enquiries this week, tell us which channel and we will look at it with you.". It appears when no enquiry arrived. A "dinos" that bounces off a no-reply address breaks a promise.
- **Copy's default:** the mail carries a `Reply-To` to the team mailbox that already answers agencies. API names it; no address goes in this file. The line then stays as it is.
- **If API cannot set a `Reply-To`,** the line goes. In its place: "Si esperabas consultas esta semana, revisamos contigo los canales conectados: escríbenos a {dirección de soporte}." / "If you expected enquiries this week, we will check the connected channels with you: write to us at {support address}." `{support address}` is the address the site already shows. It is a field, never typed into the template.

## 2. Optional: the footer

| Today ES | Proposed ES | Today EN | Proposed EN |
|---|---|---|---|
| Recibes este email porque eres administrador de tu agencia en NuovaSolution. Las cifras son recuentos de los registros de NuovaSolution en tus canales conectados. | Recibes este email porque eres administrador de tu agencia en NuovaSolution. Las cifras cuentan lo que NuovaSolution registró en tus canales conectados. | You receive this email because you administer your agency in NuovaSolution. The figures are counts of NuovaSolution's records in your connected channels. | You receive this email because you administer your agency in NuovaSolution. The figures count what NuovaSolution recorded in your connected channels. |

- **Why:** "recuentos de los registros" is technical, and it reads as if NuovaSolution owned the agency's records.
- Only if API builds anyway; it is not a fault.

## 3. W-6: 14 vs 19, Copy's position (for Audit)

**API's finding:** for report `a5be0d24` (16.–22.11.), the stored `report_text` says "Consultas recibidas: 14 … email (14)". The figures and the sent mail say 19.

**Copy changes no wording for this.** Copy's position for the register:
- **Two register rows are affected,** `reportInLogin` and `weeklyEmail`. Both are on every plan card (ALL). The customer must see **the same number** in the login and in the mail.
  - Until Audit and API settle which figure is right, neither row counts as proven for this report.
  - No page, demo or sales line quotes this week's report.
- ~~A hint for API: the stored text may come from the wrong period.~~ **Struck (owner, 23.11.).** API's cause (`0f3b7cb7`): the text counted rows in `leads`, the mail counts `interaction_counted` events (REPORTING_CONTRACT_v2). The week before was 14 by coincidence. New reports show the same figure. The stored row `a5be0d24` keeps its 14 as history.
- **Resolved:** Copy checked the new report text against the mail, see §5.

## 4. Not asked, but read in API's `cfa8c14` (for the owner and Audit)

**F-c, a confirmation mail to the person who sends a request:**
- If the owner says yes, Copy writes the ES/EN text per way (trial / demo / talk).
- It uses the same words as the on-screen confirmations, from stage 1 `d8ebc77` §3.3.
- No text before the owner's line.

**The plan cards:**
- API's data shows that Copy's Growth differences (`taskList`, `matching`, `followup`) are all "soon" in the register.
- For Enterprise, what is proven (on staging only) is the counts: up to 50 people, up to 10 CRM connections.
- The candidates X-1 (offices, no guard) and X-4 (social media, also on in Growth) are **not proven**.
- Copy waits for API's 12:00 answer to `db41606` and then writes the final card lines. Until then the cards stay marked `api-pending` (Redesign).

---

## 5. Addendum, 23.11. afternoon: the texts without a channel line

**The owner's question:** API dropped the channel line for now, because the counted events arrive without a channel (`0f3b7cb7`, finding for Lead). Do the texts carry without it?

**Read:** n8n `0f3b7cb7`:
- `build/reporting/GENERATE_REPORT_TEXT_ALIGN_v1.sql` (the login report text);
- the prod dry run, with the real week as text.

The mail strings were read in §1.

**Result:**
- **Yes, both carry.** The mail's sentences and the report's figures need no channel to be understood.
- Three things should still change, and one question decides a word.

| # | Where | Today | ES | EN | Why |
|---|---|---|---|---|---|
| W-7 | report text, the label of the counting line | "Base de datos: consultas = mensajes de clientes contados en el periodo …" | **Cómo contamos:** consultas = … (rest unchanged) | **How we count:** … | "Base de datos" means *database* in Spanish. The line explains how the figures are counted, so its label should say that |
| W-8 | mail, the line "Cuentan los canales conectados: ${ch}." and the zero-week line "… por los canales conectados (${ch})" | — | **stays only if `${ch}` comes from the agency's channel settings**; it goes if it comes from the counted events | — | the setting is true without events. A list built from events would be empty or wrong now |
| W-9 | report text, budget with one contact | "Presupuesto indicado (1 contacto): media 450.000 €, entre 450.000 € y 450.000 €" | with one contact: **Presupuesto indicado (1 contacto): 450.000 €** | with one contact: **Stated budget (1 contact): €450,000** | an average and a range over one value read like an error |
| W-10 | mail and report: the word "consultas" | "Llegaron 19 consultas" next to "Contactos nuevos: 1"; the counting line says "consultas = mensajes de clientes contados" | see the question | — | **Question for API:** does `interaction_counted` count every incoming message, or one per new enquiry? |

**W-10, the two answers:**
- **One per incoming message:** the word must say so in the mail and in the login. Mail "Recibiste {n} mensajes de clientes." / "You received {n} client messages."; figure "Mensajes de clientes" / "Client messages"; comparison "La semana anterior llegaron {m} mensajes." / "The week before, {m} messages arrived." "19 consultas" from one new contact would otherwise be read as 19 interested people.
- **One per enquiry:** "consultas" stays, and the counting line becomes "consultas = conversaciones de clientes contadas en el periodo" / "enquiries = client conversations counted in the period".

**Unchanged and fine without a channel:**
- "Si esperabas consultas esta semana, dinos por qué canal…": it asks the customer, it does not report a channel. W-4 still applies to it.
- The footer "… en tus canales conectados": true without a per-channel split.
- The report's last line, "Este informe no incluye ventas, cierres, ingresos ni rentabilidad…".

**When the writer sends the channel again (Lead):**
- "Por canal" comes back in the report and in the mail, with the same channel names as the website: "WhatsApp", "Email", "Formulario web", "Teléfono".
- The website's names are fixed in `11cf7a2`.
