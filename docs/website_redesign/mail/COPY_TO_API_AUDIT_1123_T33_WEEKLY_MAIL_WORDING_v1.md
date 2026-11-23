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
| W-2 (b) | the paragraph "Esto no lo medimos todavía … aparecerá aquí" no longer renders | **confirmed**, plus: **delete the strings from the node**, not only the condition that shows them. That covers "Esto no lo medimos todavía: ${l}. Cuando lo hagamos, aparecerá aquí.", "We do not measure these yet: ${l}. When they do, they will appear here.", "not measured yet / coming soon", and the "Not measured" / "not measured" labels if nothing else uses them | — | — |
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
- **A hint for API, not a finding:** 14 is exactly the week before's count ("La semana anterior llegaron 14 consultas", in the same render).
  - The stored text may have been written from the previous period.
  - Or it was written before the week was complete: the report was generated Mon 05:00:04Z, and Europe/Madrid closes the week at Sun 23:00Z.
  - Please check that first.
- **When it is resolved,** Copy checks the login view of the report against the mail: the same words for the same figure ("Consultas recibidas").

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
