# PACKAGE MATRIX CHECK 1006 — the owner's target ladder against the catalogue and the proof

**State:** `2026-10-09` · **Lane:** Website Implementer → **Audit** and **API**.
**Order:** owner follow-up 2026-10-06 §6: check the target matrix against entitlements and real function
evidence, report deviations concretely; switch nothing on by website text; invent no prices or quotas;
propose names only, change no plan id.
**Sources:** the billing catalogue as the site reads it (`lib/content/plans.ts`, `billing_plan` v1, staging,
read 2026-09-23: codes `essential`, `growth`, `scale`, entitlement flags, limits), the package matrix of
2026-10-03 (`backend_handoff/handoff_in_2026-10-03/AUDIT_ORDERS_2026-10-03.md`), `COPY_DELTAS_1003` §2.
**What the site does with it:** `lib/content/package-matrix.ts` renders the ladder on the home page with
the state of each line; nothing there changes an entitlement.

## 1. The ladder as rendered, line by line

| Package (id) | Line | Shown state | Catalogue flag on this plan | Proof (matrix 2026-10-03) | Deviation |
|---|---|---|---|---|---|
| Essential (`essential`) | Automatic replies · in Spanish | available | `cx.baseline` yes | Prod, Spanish only, own agency, never delivered to a real customer | none in the ladder; the live gate L-01 is still the publication condition |
| | Email labels · with Gmail | available | `channel.email` yes | Prod, Gmail | none |
| | Customer records (CRM) | available | `crm.core` yes | Prod | none |
| | Hot lead alerts | in preparation | `lead.hot_alert` **not** in the catalogue's feature list for any plan | Prod present, false trigger fixed in the package, port missing | **D-1** the flag exists on the billing plane but is on no plan; the matrix puts it in package 1. Decide: add the flag to `essential` once the port is reported, or keep it off until then |
| | External CRM connection | *(not rendered as a line; the card's note says test-certified, none in production)* | `crm_connections` limit 1 | staging certified, prod none | **D-2** the limit "CRM connections" suggests a sellable connection; the note keeps it honest. API: state whether the limit may be shown while no connection exists in production |
| Growth (`growth`) | Automatic follow-ups | in preparation | `followup.basic` is on **essential** as well as growth | staging exactly-once, delivery not certified | **D-3** the catalogue grants follow-ups to Essential; the owner's ladder places them in package 2. One of the two has to move |
| | Property suggestions | in preparation | `property.matching` yes | staging, no real source | none |
| | Daily tasks for the team · see, take, complete | partly available | no flag at all | Prod list/take/complete; overview and WhatsApp staging only | **D-4** no entitlement carries the task surface; today every plan would have it or none. API: which flag, and on which plans |
| | Intake of leads from ads | in preparation | `lead.engine.orchestrate` yes | staging | none; the card separates intake from campaigns |
| | Calendar and appointments | in preparation | no flag | not connected, booking mode undefined | **D-5** no flag and no definition; shown only as "in preparation" |
| Enterprise (`scale`) | Instagram from the same place | in preparation | no flag | staging, 0 Meta calls, approval pending | **D-6** no flag; the display name "Enterprise" is a proposal, the id stays `scale` |
| | Phone assistant | in preparation | `channel.voice` yes; `voice_minutes` 1000 | staging ES ready, prod none | none; the minutes are not shown (no quota is sold) |
| | 3D models included, per order | available per order · no quota | no flag; `feed.structured` is on scale but is not 3D | handwork per order, no counter, no viewer host, no order entity | **D-7** nothing on the billing plane carries 3D; "included per order" is the owner's decision and needs an entity before it can be billed |
| | Larger acquisition scope | *(not rendered)* | — | "not defined, owner definition" | **D-8** as in COPY_DELTAS_1003 §2.3: the line is written the day the owner defines it |
| 3D on its own | strip "also on their own" | per order | no flag | handwork | same as D-7 |

## 2. Limits

| Catalogue limit | Shown as | Note |
|---|---|---|
| `leads_month` 750 / 3000 / none | "Consultas procesadas al mes: 750 / 3.000 / sin tope mensual · Es un límite de procesamiento, no leads generados" | **D-9** API to confirm that `leads_month` counts processed enquiries, not generated leads. If it counts something else, the label changes |
| `seats`, `offices`, `crm_connections`, `voice_minutes` | not shown on the home page | they stay on the packages page, which is not part of this round |

## 3. What the site does not do

- No plan id is changed. `scale` is shown as "Enterprise" (proposal); `essential` and `growth` keep their names.
- No price, no quota, no "unlimited", no promised number of leads. Campaigns and advertising budget are
  named as the agency's own.
- Nothing is switched on by text: a line "in preparation" has no check and no button; the only buttons are
  the trial (Essential) and "request a proposal" (Growth, Enterprise), both leading to existing pages.

## 4. Asked of Audit and API

D-1, D-3, D-4, D-9 need an answer from API (flags and the meaning of the limit); D-2 and D-7 need a
decision on the billing plane; D-5, D-6, D-8 are owner definitions. Until then the ladder shows the lines
with the states above and the proven half carries the checks.
