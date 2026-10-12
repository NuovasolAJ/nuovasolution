# ACCEPTANCE LIST 1010 — every promise of the target version, and the proof it still needs before publication

**State:** `2026-10-12` · **Lane:** Website Implementer → **Audit** (owner of the publication gate), Reviewer, the
lanes named per row. Master order 2026-10-10 §11: the public pages are the unpublished target version of the planned
product and carry no "in preparation" label; this list is the gate instead. Nothing here is published; the design
preview is noindex and not linked from the live site.

How to read a row: **Shown as** is what the page says; **Proof today** is the measured state (package matrix 2026-10-03,
lane truth sheets, this repository); **Needed** is the signal that closes the row. The proof states are kept in the data
(`lib/content/platform-map.ts`, `lib/content/package-matrix.ts`) and print on any preview built with
`NEXT_PUBLIC_PROOF_STATES=1`.

## A. Channels and languages (story B, hero, menu "Atender consultas")

| # | Shown as | Proof today | Needed | Lane |
|---|---|---|---|---|
| A-1 | WhatsApp replies in the customer's language (Laura in English) | replies in production exist in **Spanish only**, own agency, never delivered to a real customer (matrix 2026-10-03; L-01 open) | one real delivery to a customer (L-01) and one proven reply in a second language | API, Hosting |
| A-2 | Email replies in the customer's language (Keller in German) | Gmail intake and reply in production, Spanish; no Outlook send path | as A-1 for email; Outlook stays out of the promise | API, Hosting |
| A-3 | Web form as a channel (Sofía) | no web form intake exists in production or staging | a form intake contract and one end-to-end run | API |
| A-4 | Phone assistant notes the call and leaves a task (Álvaro); "hoy en español" on the ladder | staging only, Spanish, no production number, legal disclosure gate pending (`voice`) | provider and legal gates, one production call; **no language beyond Spanish may be published** until each is tested | API, Counsel |
| A-5 | The AI notice in English and German (marked "sample translation") | only `v1.0-es` is approved | counsel approval of the EN and DE notices, or they stay marked as samples | Copy, Counsel |
| A-6 | Handover to a person | production | none | — |

## B. Records, suggestions, follow-ups (story C, E, menu "Gestionar oportunidades")

| # | Shown as | Proof today | Needed | Lane |
|---|---|---|---|---|
| B-1 | Customer record with wish, budget, timing, language | CRM in production; budget and timing fields as rendered are the story's example | confirm the record carries budget and timing as fields | API |
| B-2 | Property suggestions from the agency's own portfolio (EST-204, EST-231) | staging, no real property source; availability is never claimed on the page | a listing source per agency and one proven proposal | API |
| B-3 | Follow-up when a fitting listing comes in, only with the customer's consent and the agency's switch | `followup.basic` staging exactly-once, delivery not certified; the consent record does not exist as a contract | the consent and sending path, proven once end to end | API, Counsel |
| B-4 | "Avisos de consultas importantes" (alerts when date, property and budget are named) | `lead.hot_alert` exists in production, false trigger fixed, port missing; flag on no plan (PACKAGE_MATRIX_CHECK_1006 D-1) | the port, the flag on a plan, one proven alert | API |
| B-5 | Email labels | production | none | — |
| B-6 | External CRM (HubSpot, Pipedrive, Zoho, Salesforce, Google Sheets) on the trust section and the ladder's CRM note | four CRMs certified on staging against provider orgs, **0 production connections**; Sheets projection exists | one real connection and one real sync per CRM before it is promised by name | API |

## C. Team and reports (story D, F, menu "Coordinar tu equipo", login area)

| # | Shown as | Proof today | Needed | Lane |
|---|---|---|---|---|
| C-1 | Tasks: see, take, complete | production (owner's own test 2026-09-22) | none | — |
| C-2 | Jarvis morning list with priority, reason and next step | overview and WhatsApp notice are staging logic only; no real send; no manager board screen | one real end-to-end run of the overview; the reason and next-step fields in the read model | Daily |
| C-3 | "Los demás ven que está tomada y por quién" | clip v3 manifest says a taken task leaves the others' lists; the 09-28 truth sheet said the opposite | Daily confirms the rule in production | Daily |
| C-4 | Calendar: confirmed viewings in the person's diary | no calendar connected, booking mode undefined (D-5) | a calendar contract | API, Owner |
| C-5 | Weekly report in the login (`/app/reports`) and the Monday email | **no reporting exists**; the page runs on a proposed op `reports.weekly` with a stub fixture; staging renders "awaiting contract" | the op per REPORTS_CONTRACT_REQUEST_1010 §2; the `reporting.basic` / `reporting.advanced` flags in `entitlements`; Hosting sends the email | API, Reporting, Hosting |
| C-6 | "Hoy en tu equipo" on `/app` | waits for the daily read model (REPORTS_CONTRACT_REQUEST §4) | the read model | Daily, API |
| C-7 | Figures in the report: counts of received, answered, viewings, valuations, tasks, proposals | none measured yet; nothing is shown as zero | each count defined by Reporting; no revenue, time saved or "best source" ever (CLAIMS_MATRIX R-13/14) | Reporting |

## D. Attract and present (menu "Captar y presentar", social screens, 3D section)

| # | Shown as | Proof today | Needed | Lane |
|---|---|---|---|---|
| D-1 | Instagram posts with draft and approval; comments and messages answered | staging, 0 Meta calls, lab app not configured, no owner release; screen B now has draft/approve/cover (SOCIAL_UI_PATH ready for Social's acceptance) | Meta approval, lab release (O-13), `SOCIAL_UI_PATH_ACCEPTED`; one published post with permalink | Social, Owner |
| D-2 | Leads from ads taken in | staging | provider test | API |
| D-3 | 3D: plan → furnishing → render → rotatable view, per order | the 3D lane's living room (2026-10-05) is the accepted direction; `3D_OWNER_VISUAL_ACCEPTANCE` still open; no viewer host, no order entity (D-7) | the owner's visual acceptance; a hosted viewer link; the order path | 3D, Owner |
| D-4 | Camera ride and renders on the page | the 3D lane's files of 2026-10-05, unchanged | replaced by the lane's next delivery | 3D |

## E. Packages (ladder)

| # | Shown as | Proof today | Needed | Lane |
|---|---|---|---|---|
| E-1 | Essential: replies, channels, labels, CRM, alerts, weekly report | A-1…A-3, B-4, C-5 above; PACKAGE_MATRIX_CHECK_1006 D-1, D-2 | as above | API, Audit |
| E-2 | Growth: follow-ups, suggestions, Jarvis, ad intake, calendar, report with trend | B-3 (catalogue puts `followup.basic` on Essential too, D-3), B-2, C-2 (no flag, D-4), D-2, C-4 (D-5), C-5 | as above | API, Audit |
| E-3 | Enterprise (`scale`): Instagram, phone, 3D per order | D-1 (no flag, D-6), A-4, D-3 (D-7); "larger acquisition scope" still undefined (D-8) | as above; owner defines D-8 | API, Owner |
| E-4 | "Consultas procesadas al mes" 750 / 3.000 / no cap | `leads_month` meaning unconfirmed (D-9) | API confirms what it counts | API |
| E-5 | No prices | no price authority | unchanged | Owner, Billing |
| E-6 | Trial: 14 days, no card, Essential scope, starts at activation | `TRIAL_PLAN_ALIGNED`; registration test still pending (REGISTRATION_TEST_READY) | the registration test on the staging preview | Reviewer, Owner |

## F. Texts and media

| # | Shown as | Proof today | Needed | Lane |
|---|---|---|---|---|
| F-1 | Every text of the hero, the story, the 3D and trust sections, the login area, the social screen B additions, the menu and the ladder | WORKING texts by the implementer (marked in the sources) | Copy's confirmation or replacement | Copy |
| F-2 | Photographs (Pexels) as sample listings; the 3D lane's renders | MEDIA_SOURCES_1010.md | Audit's acknowledgement | Audit |
| F-3 | Daily's recordings on the Daily page | withheld (REF-DEMO-204 in the picture, Sunday 21:40 in the subtitles) | clip v4 and stills with EST-204 and the Tuesday clock | Daily |
| F-4 | The example clock: Tuesday 11:20 during a viewing | consistent across home, module pages, dictionaries | Copy confirms (replaces COPY_HERO_1003's Sunday night) | Copy |

## G. Not in the target version, on purpose

- The idea "ten free agencies at a time, then a waiting list" and trial extensions against testimonials (master order §10): product decisions, not on any page.
- Testimonials, customer logos, success figures: none.
- "Without setup": never said; the trust section names the connection step.

## H. Closed rows stay closed

A row is reopened only on a relevant change of the page or of the proof (master order §12). Rows marked "none" need
nothing further for publication.
