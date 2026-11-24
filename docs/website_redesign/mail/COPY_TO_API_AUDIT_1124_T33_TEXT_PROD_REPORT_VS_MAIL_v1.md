# Copy → API, Audit (cc Owner): T33-TEXT-PROD, the report text against the weekly mail · 24.11.2026, due 16:00

**Order:** the owner, 24.11.:
> "Bitte gleiche für T33-TEXT-PROD den Berichtstext aus generate_report 07e4c4d7 mit dem Wortlaut der Wochenmail ab. Ergebnis bis heute 16:00 an API und Audit."

**Read (n8n repo, read only; nothing run, nothing sent):**
- **The report text:** `build/reporting/GENERATE_REPORT_TEXT_ALIGN_v1.sql`, md5 07e4c4d7, unchanged since `0f3b7cb7`. Also the prod dry run with the real week (`t33_report_text_align_prod-dryrun_1123.json`).
- **The weekly mail:** `build/reporting/NuovaSolution_Report_Delivery_v3_T33.json`, md5 dc62154f, node "Build Email Content" 5eba8cf1 (`a00e5e30`). Only its strings were read.
- API's answers `API_TO_COPY_AUDIT_1123_T33_ANSWERS_v1.md` (`b1952d4`) and signals 23.11. 12:19Z, 13:12Z, 17:20Z.

**Status:** an editorial and technical check, not a legal approval.

## 0. Result

**T33-TEXT-PROD: yes from Copy, as it is (07e4c4d7).** The package does what it is for:
- the report text now shows the same figure under the same word as the mail;
- "Consultas recibidas" in both, from the same source;
- 19 = 19 in the prod dry run and 128 = 128 on staging;
- no channel line in either.

**Nothing in the text contradicts the mail.**

**Four wording points remain.** None blocks the prod line: they change words, not figures. Copy proposes them for one follow-up package (T33-TEXT v2), together with the open question W-10. W-10 concerns mail and text equally, so it is no difference between them.

## 1. Line by line (ES; the text exists only in Spanish)

| # | Report text (07e4c4d7) | Weekly mail (dc62154f) | Same? | Copy |
|---|---|---|---|---|
| C-1 | `Consultas recibidas: {n}` from `report_v2.weekly.counts.received` | figure "Consultas recibidas", sentence "Llegaron {n} consultas." from the same field | **yes**: word and source (API (e)) | — |
| C-2 | no "Por canal" line while every event is `unattributed` | no channel line (M8) | **yes** | — |
| C-3 | title `INFORME DE ACTIVIDAD` | header "Resumen semanal · {agencia}" | different title for the same week | see §2 T-1 |
| C-4 | `Periodo: 16/11/2026 – 22/11/2026 (Europe/Madrid)` | "del 16 nov 2026 al 22 nov 2026" | same period; "Europe/Madrid" is a system name | see §2 T-2 |
| C-5 | `Contactos nuevos: {n}` | not in the mail | no conflict | depends on W-10 (§3) |
| C-6 | `Intención`, `Zonas solicitadas`, `Presupuesto indicado` | not in the mail; the mail shows visits, valuations, tasks, proposals | different selection, no conflict | see §3 Q-2 |
| C-7 | `Base de datos: consultas = mensajes de clientes contados en el periodo (la misma cifra que el resumen semanal por correo); …` | footer "Las cifras son recuentos de los registros de NuovaSolution en tus canales conectados." | the same basis, stated twice in different words | see §2 T-3 |
| C-8 | `Presupuesto indicado (1 contacto): media 450.000 €, entre 450.000 € y 450.000 €` | — | — | see §2 T-4 |
| C-9 | `Sin datos en este periodo: …` | the mail leaves out a figure without data (`answered` null) | the same rule | — |
| C-10 | `Este informe no incluye ventas, cierres, ingresos ni rentabilidad: no se registran en el sistema.` | — | no conflict | stays |

## 2. The wording points for T33-TEXT v2 (not blocking)

| # | Today | ES (proposed) | Why |
|---|---|---|---|
| T-1 | `INFORME DE ACTIVIDAD` | **Resumen semanal · {agencia}** | the same title as the mail for the same week, with the agency's name from the record (API (a)). Only if the text is shown to a customer, see Q-1 |
| T-2 | `(Europe/Madrid)` | **(hora de Madrid)** | "Europe/Madrid" is a time-zone identifier, not a word a customer uses |
| T-3 | `Base de datos: …` | **Cómo contamos: …** (rest unchanged) | "Base de datos" means *database*. Earlier W-7, not yet answered |
| T-4 | with one contact: `media 450.000 €, entre 450.000 € y 450.000 €` | with one contact: **Presupuesto indicado (1 contacto): 450.000 €** | an average and a range over one value read like an error. Earlier W-9, not yet answered. From two contacts on the line stays as it is |

## 3. Open questions (API; they decide words in mail and text alike)

**W-10, the word "consultas" (asked on 23.11., not yet answered):**
- The text's own counting line says "consultas = mensajes de clientes contados en el periodo". The real week shows "Consultas recibidas: 19" next to "Contactos nuevos: 1".
- **If one client message = one "consulta",** both mail and text call messages "consultas". On the website "consulta" is one enquiry ("9 de 25 consultas"). A reader of "19 consultas" thinks of 19 interested people.
  - Then the word becomes "Mensajes de clientes" / "Recibiste {n} mensajes de clientes." in both. The EN mail becomes "Client messages" / "You received {n} client messages.".
  - The comparison sentence follows: "La semana anterior llegaron {m} mensajes." / "The week before, {m} messages arrived."
- **If it is one per enquiry,** "consultas" stays and the counting line reads "consultas = conversaciones de clientes contadas en el periodo".
- This is not a difference between text and mail. Both would change together. That is why it does not block T33-TEXT-PROD.

**Q-1, where is `report_text` shown?** Audit asked this on 23.11. API (e) shows that the login reads `report_v2.weekly`, not `report_text`.
- **If `report_text` reaches no customer** (internal only), T-1 and T-2 are not needed. T-3, T-4 and W-10 still matter for the record.
- **If it reaches a customer** (a download, an export, the assistant), there is a second point: it exists only in Spanish, while the mail goes out in ES or EN. An EN agency then needs the text in English. Copy writes it when API says so.

**Q-2, figures without a source in the mail:**
- The mail says "No se pidió ninguna visita.", "No se confirmó ninguna visita." and "No se envió ninguna propuesta de inmueble.".
- The report's own `data_basis` lists "appointments, property matches: no period-scoped source yet", and `matching` is not in prod (register line 26).
- **API:** do visits, valuations and proposals in the mail come from a real counted source in prod?
- **If not,** the same rule applies as for `answered` (API E-2): a figure without a source is left out, never shown as "ninguna" / 0. Otherwise the mail states as a fact something that is not measured.

## 4. Copy's line for Audit and the owner

> T33-TEXT-PROD (07e4c4d7): from Copy JA — the text and the mail say the same figure under the same word ("Consultas recibidas"), no channel line in either, no wording conflict between them. Follow-up T33-TEXT v2 for T-1–T-4 after API's answers to W-10, Q-1 and Q-2; Q-2 also concerns the mail file dc62154f.
