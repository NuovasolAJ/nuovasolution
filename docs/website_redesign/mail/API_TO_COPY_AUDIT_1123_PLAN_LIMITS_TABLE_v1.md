# API → Copy, Audit (cc Owner): package limits, each package point on its own · 23.11.2026

**Order (owner 23.11., addendum 4):** name each package point separately as one of three kinds: usable in prod (with evidence), enforced on staging only, or not built yet. API's finding 65f31f84 belongs in this table.

**Read on 23.11., about 13:30Z:**
- the gate functions and triggers on staging and in prod;
- the plan rows `billing_plan` v1 (staging);
- the register `lib/claims.ts` `planRows`.

## 0. The rule above everything

**Prod has no plan layer.** Read 23.11.:
- no plan rows;
- no `resolve_entitlements`;
- no limit trigger;
- **none of the gate functions listed below**.

In prod, the **pilot register** decides per agency. Every agency in it gets the same thing; no plan limits anything. So **no package point is usable in prod as a plan difference today**. Column "Prod" below is therefore "—" throughout, until topic 23 (plan layer in prod) has an owner line.

**Classes:**
- **A**: enforced on staging on every path (trigger, or the one function every path goes through);
- **B**: a gate is built on staging, but the product path does not call it;
- **C**: not built, or only a counter.

## 1. Package points from the website (`planRows`) that differ between plans

| Point (register) | Register | Plan data (Ess / Gro / Ent) | Staging | Class | Prod |
|---|---|---|---|---|---|
| `taskList` (tasks in the app) | GE | `daily.goals` false / true / true | `gate_daily_goals`, `dg_cx_dispatch`; on staging the plan overrides the pilot register (proof 20.11.) | **A** | — |
| `matching` | GE | `property.matching` **true** / true / true | `billing_gated_property_matching`, `compose_customer_email` | **A**, but **contradiction:** the data gives matching to Essential too | — |
| `followup` | GE | `followup.basic` **true** / true / true · `followup.advanced` false / true / true | `gate_basic_followup`, `gate_advanced_followup` | **A**, but **contradiction:** basic follow-up is in Essential too; only "advanced" is GE (Copy E-5) | — |
| `reportTrend` | GE | `reporting.advanced` false / true / true | `billing_gated_reporting_advanced`, `rpt2_*` | **A** | — |
| `adsLeads` | GE | `paid.acquisition` false / true / true | `gate_paid_acquisition`, `le_paid_entitled` | **A** on staging. The prod package PAID_GOOGLE_PROD (faeb8223) takes the pilot register in prod (E1). | — |
| `phoneAssistant` | GE | `channel.voice` false / true / true, but voice minutes 0 / 0 / 1000 | `billing_gated_voice` exists, but **only tests call it**; voice routing never asks the plan | **B** (Copy E-4: Growth or Enterprise?) | — |
| `instagram` | E | `social.publish` false / **true** / true | `trg_social_require_entitlement` (trigger) | **A** for Growth **and** Enterprise. **Contradiction:** the register says Enterprise only. Meta release is separate (topic 25). | — |

## 2. The figures on the cards

| Limit | Ess / Gro / Ent | Staging | Class | Prod |
|---|---|---|---|---|
| People (`seats` / `employees`) | 3 / 8 / 50 | triggers `trg_plan_limit_seats` / `trg_plan_limit_employees` (proof 20.11.: Growth stops at 8) | **A** | — (TEAMROLES-PROD brings the team function, not the limit) |
| CRM connections | 1 / 3 / 10 | trigger `trg_plan_limit_crm` | **A** | — |
| Mailboxes | 1 / – / – | trigger `trg_plan_limit_mailboxes` | **A** (Essential only) | — |
| Enquiries per month | 750 / 3000 / none | `plan_lead_admit` counts and refuses, but **the Main does not call it** (Lead) | **B** | — |
| 3D tours | 0 / 3 / 25 | `px3d_quota` on every 3D order | **A** | — (no 3D in prod) |
| ~~Offices~~ | ~~1 / 1 / 5~~ | **Owner 23.11. (Audit ec4181ed): offices are neither a package point nor a planned function.** Not on any card, not "coming". The number in the staging plan rows (`billing_plan`, key `offices`: essential/growth/trial 1, scale 5, read 23.11. ~18:20Z) is a leftover counter with no effect; it stays unused. | **out** | — |
| Phone minutes | 0 / 0 / 1000 | metering only (`billing_feed_voice_minutes`), no gate | **C** | — |

## 3. Points that are the same in every plan (`ALL`)

These are not package limits. They hold, or do not hold, by the register for every agency. Not repeated here.

## 4. What Copy and Audit can take from this

- **For the cards on 04.12.:** a plan difference is only true in prod once topic 23 is in prod.
  - Until then, every difference is a statement about the product shape, not something the system enforces.
  - The owner decides whether the cards may show the differences anyway.
- **Three contradictions between the data and the register, to fix before any wording:**
  - `matching` and basic `followup` are in Essential in the data;
  - `instagram` (social) is in Growth in the data.
  - The owner decides which side is right, and API changes the plan row to match. The website does not change.
- **Class B (phone, enquiries per month):** "only in Enterprise" or "up to 3000 per month" would be a promise nothing enforces.
