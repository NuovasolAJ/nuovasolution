# API → Copy, Audit (cc Owner, Redesign): topic 33 weekly mail, answers (a)–(e) · 23.11.2026

**Order (owner 23.11., addendum 3):** answers to `COPY_TO_API_AUDIT_1123_T33_WEEKLY_MAIL_WORDING_v1.md` by Wed. 14 vs 19 is settled by 0f3b7cb7.

**New file:** `build/reporting/NuovaSolution_Report_Delivery_v3_T33.json`, md5 **dc62154f**, node `Build Email Content` **5eba8cf1**.
- It replaces bcbc6253 and is built by `build_report_delivery_t33.mjs` on the prod node d614aa4b.
- G1 is green (7 code nodes).
- Copy's earlier fixes are still in, with the same check A–E.
- Probe: `stg_t33_mail_probe.mjs` **9/9**.

## (a) The agency's name and the right person, probed with a staging agency

**Name:** `{agency}` = `clients.name` from the agency record, read by [Fetch Client Config]. The 16 "Nuova" replacements did not touch that variable.
- In the probe, the probe agency "Inmobiliaria Costa Prueba" was written on staging and read with **exactly** the node's REST query.
- Header: "Resumen semanal · Inmobiliaria Costa Prueba". Opening: "Esto es lo que pasó en Inmobiliaria Costa Prueba del …". NuovaSolution appears only as the product. (M1)

**Person: fixed.** Until now the greeting always took the first name from `clients.contact_name`, whoever received the mail (`reporting_emails`).
- **New:** a name only when **exactly one** recipient gets the mail and that recipient is the agency's contact (`clients.contact_email`).
- Otherwise the greeting is a neutral "Hola," / "Hi,".
- Probe: contact as recipient → "Hola Lucía," (M2); another person → "Hola," (M3); two recipients → "Hola," (M4).

**Limit:** the probe renders the node code with the staging data. It sends nothing.
- The real delivery on staging (SMTP to the sink) follows once Hosting deploys this file on staging.
- Mock is not E2E; the sending is not proven yet.

## (b) Reply-To to a team mailbox: **no**

- Technically n8n could set a `Reply-To`.
- But the **only** address the site shows is the owner's mailbox (md5 c7a8799f), and **prod polls exactly that mailbox**. Every reply from an agency, and every mail under Copy's replacement sentence, would become a lead in prod.
- There is no other team mailbox today.

**Built:** the line "Si esperabas consultas … dinos …" is **gone** (ES/EN, text and HTML; M6). Copy's replacement sentence is **not** in, because it names the same mailbox.
**→ Owner:** a support mailbox that prod does not poll. Then Copy's replacement sentence comes in, with that address as a field.

## (c) The coming-soon paragraph is deleted from the code

- Deleted: the strings `s_nm` (ES "Esto no lo medimos todavía …", EN "We do not measure these yet …"), the list `nm`, its computation, and the "not measured" mentions in the comments.
- Search of the node: 0 hits (M7).

## (d) Copy's sentence for a week before with no enquiries is in

- ES "La semana anterior no llegó ninguna consulta." · EN "The week before, no enquiries arrived." (M5)
- Before, it would have said "llegaron 0 consultas".

## (e) Mail and the login report: same figure, no channel line

| | Mail (T33 file) | Report text (`generate_report`, after 0f3b7cb7) | Login (`components/app/weekly-report.tsx`) |
|---|---|---|---|
| Enquiries | `weekly.counts.received` (staging probe 128 = 128, M8) | the same (prod dry run 19 = 19) | the same field (`counts.received`) |
| Channel line | none while every counted event is `unattributed` (M8) | none (D2) | no channel rows, because `basis.channels` is empty. **But** the heading "Por canal" still shows, with an empty list. |

**Read from code and data, not over a prod login.** Two points for Redesign in the login view:
- **E-1:** hide the "Por canal" section when there is no channel.
- **E-2:** `counts.answered` is `null` in prod (not measured). The login turns it into **0** (`num(c.answered) ?? 0`) and shows "0 atendidas de 19". The mail leaves the figure out. Please show nothing instead of 0, as in the mail.

The cause of the missing channel is Lead's (960978a3: `Memory_Write_v1` drops the channel).

## Owner line for the prod package of the report text (0f3b7cb7)

> „T33-TEXT-PROD = JA: GENERATE_REPORT_TEXT_ALIGN_v1 (07e4c4d7) über prod_sql_migrate, nach Copys Abgleich; Rückweg GENERATE_REPORT_TEXT_ALIGN_v1_ROLLBACK.sql (47afac00) = Live-Körper 670749ca. Vorher Trockenlauf t33_report_text_align.mjs prod-dryrun (Soll 8/8), danach Live-md5 ≠ 670749ca und der nächste Montagsbericht mit Text = Mail-Zahl.“

**The mail itself** (dc62154f) gets its own line. Hosting first deploys it on staging and makes one delivery to a sink.
