# API → Copy, Audit (cc Owner): T33, answers to Q-1 and Q-2, and T-1 to T-4 · 24.11.2026 (due 16:00)

**Reply to:** `COPY_TO_API_AUDIT_1124_T33_TEXT_PROD_REPORT_VS_MAIL_v1.md` (348cdc4).
**Read in prod, read only, 24.11. ~09:30–09:50Z.** Nothing was changed or sent.

## Q-1: does a customer see `report_text`? **No, not today.**

| Where it could reach a customer | Prod, read 24.11. |
|---|---|
| Who writes it | Only `NuovaSolution_Report_Engine_v4` (H4CDlIMuZ1XMcfQt, active), node "Update Queue: Generated" into `report_queue.report_text` |
| Which n8n workflows read it | **No active workflow.** The two that read it are switched off: Report_Delivery_v1 and Report_Delivery_v2_Staging_Mock. The weekly mail (Delivery v3) builds its text from `report_v2.weekly` |
| Login (website / tenant-api) | reads `report_v2.weekly`, not `report_text`. The website repo has no reference to `report_text` |
| Database rights | `anon` and `authenticated` have **no** rights on `report_queue`. No view and no function reads `report_text` |
| Rows | 13 rows with a text, all for the internal tenant `nuovasolution` |

**So `report_text` is an internal record today.**
- T-1 (title) and T-2 ("hora de Madrid") are not needed now.
- **No English text is needed now.** If a download, an export or the assistant ever shows it to a customer, that is a new feature with its own owner line, and the EN text comes first.
- T-3, T-4 and W-10 still matter, because the record should read correctly.

## Q-2: do the mail's visit, valuation and proposal sentences have a counted source in prod?

A figure appears in the mail **only when its field is not null** (`has(v)` in "Build Email Content"). A null field is left out, never shown as 0 ("ninguna"). This is the same rule as for `answered`.

| Mail sentence (0 case) | Field in `report_v2.weekly.counts` | Prod source | W47 | Shown in prod? |
|---|---|---|---|---|
| "No se pidió ninguna visita." | `viewings_requested` | count of `dg_task` of type `viewing_request` created in the week. The active Main (NuovaSolution_Main_Production_v1) classifies `VIEWING_REQUEST` and creates that task | **0** | yes. The 0 is measured: in the last 45 days prod classified **no** viewing request (customer_enquiry: 23 property, 2 human, 1 call). No W47 lead carries a viewing signal |
| "No se confirmó ninguna visita." | `viewings_confirmed` | **none**, the field is `NULL` | null | **no**, left out |
| "No se pidió ninguna valoración." | `valuations_requested` | events `seller_valuation_requested`, written only by the active `Valuation_Intake_v1` (the valuation form) | **0** | yes, measured, **but only valuations made through the form**. A seller who asks in a message is not counted here |
| "No se envió ninguna propuesta de inmueble." | `proposals_sent` | **none**, the field is `NULL` | null | **no**, left out |

**So the rule already holds in prod.** The two sentences without a source ("ninguna visita confirmada", "ninguna propuesta") never appear, because their fields are null. "Visitas pedidas" and "Valoraciones pedidas" come from real counted sources.

**One point for Copy:** "Valoraciones pedidas" counts only **form** valuations. Two options:
- keep the word and accept the narrower count;
- or label it so, e.g. ES "Valoraciones pedidas en la web" / EN "Valuations requested on the website".

API changes nothing until Copy chooses. It is a word in mail dc62154f only, not a data change.

**Not the same thing:** the text's `data_basis` says "response time, appointments, property matches: no period-scoped source yet". Appointments (booked dates) and matches are not the same as viewing **requests**, so this does not contradict the mail.

## T-1 to T-4 for T33-TEXT v2

| # | API | Why |
|---|---|---|
| T-1 title | **not now** | internal record (Q-1) |
| T-2 "(hora de Madrid)" | **not now** | internal record (Q-1) |
| T-3 "Base de datos:" → **"Cómo contamos:"** | **yes** | one word change in `generate_report`, figures unchanged |
| T-4 one contact → **"Presupuesto indicado (1 contacto): 450.000 €"** | **yes** | only the `n_budget = 1` case changes; from two contacts the line stays |
| W-10 "consultas" | **waits** for Copy and the owner (API answer 660e08f: it counts **messages**) | it changes mail and text together |

**Plan:**
- T33-TEXT-PROD (07e4c4d7) goes as it is, with Copy's JA. Its owner line is unchanged.
- **T33-TEXT v2** (T-3 + T-4, plus W-10 if decided by then) is built **on staging by Wed 25.11. 12:00 Madrid**, with a proof on the real week shape (1 contact and 2 contacts) and an md5. Prod follows with its own owner line, after T33-TEXT-PROD.
- If W-10 is decided later, the mail (dc62154f) and the text change in **one** follow-up package, so they never say different words.
