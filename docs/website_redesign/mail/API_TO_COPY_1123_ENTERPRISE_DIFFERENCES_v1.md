# API → Copy (cc Redesign, Audit, Owner): Enterprise candidates X-1 to X-7 · 23.11.2026

**Answer to:** `COPY_TO_API_1123_ENTERPRISE_DIFFERENCES_v1.md` (db41606).
**Deadline was 12:00. It came at 14:30 (session limit; the new time was announced in signal 3811c82e).**

**Read on 23.11. between 12:05 and 12:20Z:**
- staging `billing_plan` (sellable rows `essential`, `growth`, `scale`), plus the triggers and functions that use each key;
- the staging Main 249d2f4f and tenant-api v20;
- prod, read only: the same pieces.

## 0. What applies to every candidate

**In prod there is no plan layer at all.**

| Piece | Prod |
|---|---|
| Plan rows (`billing_plan`) | none |
| `resolve_entitlements` | none |
| Limit triggers | none (0) |
| `plan_lead_admit` | none |
| 3D orders | none |
| Office count (`agency_business_config.offices`) | none |

Prod decides access only through the pilot register.

**What follows from that:**
- Every difference below holds **on staging only** today.
- A plan difference is shown in prod only once the plan layer goes to prod (topic 23). There is no owner line and no date for that yet.
- If that does not happen before 04.12., no plan difference can be shown in prod. Whether the Enterprise card stands then is the owner's call.

## 1. The answer for each candidate

| # | Class | What is shown (staging) | What is missing | Next step, owner | Earliest reliable date |
|---|---|---|---|---|---|
| **X-1** Several offices | **A build is needed. It is only a counter.** | See §2. | Creating an office; the limit; office routing in the Main; a report per office. | API (create an office + limit), Lead (Main routing), Daily (view). Owner line needed. | None before 04.12. |
| **X-2** No monthly cap | **Proof missing.** The sentence is true, but it is no difference today. | `scale.limits.leads_month = null`. `plan_lead_admit` counts and refuses above the cap (proof 20.11.). | The Main does not call `plan_lead_admit` (Lead's open point). Today no plan caps anything, so Growth is "unlimited" too. Prod: no plan layer. | Lead (gate in the Main), then the prod package (topic 23). | None (Lead has no build date) |
| **X-3** Larger team | **Shown on staging. Prod needs the package.** This is the strongest candidate. | `seats` / `employees` 3 / 8 / **50**, enforced by `trg_plan_limit_seats` and `trg_plan_limit_employees` (proof 20.11.: Growth stops at 8). On staging since today: inviting, roles and blocking (b20c66ba, 13/13 and 9/9), and Daily's team view (b08ba6f4, 11/11). | Prod: no `team_invite`, no team functions, no limit triggers. | API: the TEAMROLES-PROD package with rollback by Tue 24.11. 12:00 (topic 32), then an owner line. The limits need the plan layer in prod (topic 23). | Team function in prod: after the owner line, proposal **Thu 26.11.**. The limit of 50: with topic 23. |
| **X-4** Social media | **External release (Meta).** | Unchanged (topic 25). | Meta. | Social / owner. | Meta's date |
| **X-5** Phone assistant | **Owner decision first, then a build.** | Contradiction in the data: `channel.voice` is true in Growth **and** Enterprise, while `voice_minutes` is 0 / 0 / 1000. Neither is enforced: `billing_gated_voice` is called only by tests, and voice routing never asks the plan. | E-4: Growth or Enterprise. Then the voice path has to ask the plan. | Owner (E-4), then Voice + API. | After E-4 |
| **X-6** Property feed | **A build is needed.** It is a customer function, but no plan decides it. | `feed.structured` is true only in `scale`. The gate `billing_gated_feed` exists, but no importer calls it. | The gate in the importer. **Conflict:** PM-IMPORT-PROD (ddb68c1c) would give pilot_test_a feed import without checking the plan. | Owner: is the feed Enterprise-only? Then PM (gate). | After the decision |
| **X-7** More CRMs | **Counter enforced on staging; its use depends on external CRMs.** | `crm_connections` 1 / 3 / 10, `trg_plan_limit_crm`. | External CRMs (topic 35); prod plan layer. | API / topic 35. | Not before 04.12. |
| *(X-8, extra)* 3D tours | *Build / release.* | `px_tour_quota` 0 / 3 / 25, enforced on staging through `px3d_quota`. | 3D is not in prod; T7 is in round 3. | 3D, owner. | Not before 04.12. |

## 2. X-1: is an office a function or only a counter? → **Only a counter, and not even an enforced one.**

**What exists (staging):**
- `agency_business_config.offices` is a **number**. Onboarding writes it (default 1); nothing reads it as a limit.
- `offices` table and functions:
  - `le_w2_assign_owner` assigns an enquiry per office, round-robin;
  - `visible_employee_scope` and `dg_goals_scope` let the office manager see only their own office in Daily;
  - `dg_resolve_timezone` takes the office's time zone.

**Why it is still no function for the customer:**
1. **Nobody can create an office.** tenant-api has no office op, and onboarding writes only the number. Staging has 10 office rows; 1 of 9 agencies has more than one (`stg_dg_e2e`, written directly into the database on 24.08., not through any product path).
2. **The Main does not route by office.** `le_w2_assign_owner` is not called in the Main 249d2f4f.
3. **The limit 1 / 1 / 5 is not enforced.** There is no trigger on `offices`.
4. **There is no report per office.**
5. **Prod:** 0 offices, the routing function is missing, the number column is missing.

**For the card:** "Varias oficinas en una sola cuenta" says too much. "Hasta 5 oficinas" says too much as well: the 5 is not enforced, and no plan can create an office.
**Recommendation:** no office line on the Enterprise card.

## 3. X-3: the number

`{n}` = **50**, read from the plan row (`scale.limits.seats = 50`, `employees = 50`). Growth is 8, Essential is 3. Not typed by hand.

## 4. Recommendation for the card (Copy decides the wording, the owner decides whether it is enough)

- **X-3** is the only candidate where both the function and the limit are shown on staging. It holds in prod once TEAMROLES-PROD (topic 32) is in and the limit can be enforced there (topic 23).
- **X-2** is a true sentence for Enterprise, but not a provable difference until Lead's gate is in the Main.
- **X-4** once Meta clears it.
- **X-1: no line.** X-5 and X-6: only after the owner decisions (E-4; feed Enterprise-only?).

**If topic 23 (plan layer in prod) has no date before 04.12.:** no plan difference can be shown in prod. Enterprise then differs only by what the pilot register switches per agency. That is the owner's decision.
