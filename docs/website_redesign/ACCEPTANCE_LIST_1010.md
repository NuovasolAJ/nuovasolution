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

## F2. Reviewer R16 findings and the final order of 2026-10-12 (added 2026-10-12)

| # | Finding | State after the final-order delivery | Needed | Lane |
|---|---|---|---|---|
| R-1 | F-R16-1 report figures without the awaiting-contract state, "Nada aquí es una estimación" | **closed on the page**: the demonstration label stands above the figures, the sentence is gone, the report answers three questions first; staging still renders the awaiting state without a figure | the contract itself (C-5) | API, Reporting |
| R-2 | F-R16-2 no package name in the session area | **closed**: "Prueba activa · paquete Essential · quedan N días" on `/app` | none | — |
| R-3 | F-R16-3 no cover image on the social screen | **open by data**: the stub fixtures carry no image; the read model's `cover_url` renders when present. One fixture with a cover would show it | a listing with a stored image on the staging read model, or Social's statement that none exists | Social, API |
| R-4 | F-R16-4 legal pages marked, imprint 404 | **open**: `LEGAL_PAGES_FINAL` marks and the imprint route wait for the owner's company details and Copy's final text | FIRMENANGABEN (one line), Copy's final, Hosting's purge path | Owner, Copy, Hosting |
| R-5 | F-R16-5 language claim on the public page | **narrowed, then set to Copy's lines**: the lead and the chapter titles promise no language; the hero's state line carries TEXTS_1013 L-1 + L-2 and chapter B's state line L-1 + L-2 + L-3 (email and WhatsApp; no line about the phone or the web form); the examples stay, translated for the reader with the original one tap away | A-1/A-2 signed off before publication | API, Hosting |
| R-5b | TEXTS_1013 §6b, the eight lines "for the build after 15.10." | **applied in this build**: M-1 and M-2 in the trust section's first step (the mailbox we operate, Gmail receive and reply, the agency's own mailbox being built), M-3 (no Outlook line on the module page), M-4 (the included CRM), M-5 (the four CRMs, certified on staging, no production connection) on the trust section and the ladder, M-6 (no Google Sheets line on the trust section, the ladder or the CRM module page; the onboarding's own Sheets step is a function, not a line), M-7 = L-1, M-8 in the trust section's notice step | Copy's confirmation of the placements | Copy |
| R-6 | Copy D-94…D-106 | **applied** (D-94 in spirit: no language in the lead; D-95 title without the language; D-96 no priority; D-97 morning/afternoon; D-98…D-100 no phone or web form in the setup; D-101/D-102 the two CRM states; D-103 story lead; D-104 mark in the caption; D-105/D-106 packages page) and the six chapter state lines plus the social strip's | Copy's confirmation of the applied wording | Copy |
| R-7 | Phone listening sample (final order §6) | **not built**: no approved audio of the intended voice exists | one approved audio file with transcript from the voice lane; then play/pause, duration, transcript on the phone channel | API/Voice, Owner |
| R-8 | 3D unfurnished → furnished pair (final order §7) | **not available**: the slider shows first version → revised design, labelled so; `docs/website_redesign/media_in_3d/` does not exist yet | one unfurnished and one furnished render of the living room from the same camera, in `media_in_3d/` with origin | 3D |
| R-9 | MAIL_SHELL_v1 (R16-K) | **delivered**: `docs/website_redesign/mail/MAIL_SHELL_v1.html` with the slot list and two fillings; the login preview renders the same shell | Hosting and Daily adopt it; Copy's K1 texts for the morning brief | Hosting, Daily, Copy |
| R-10 | Social strip on the home page (final order §6) | **built as a demonstration** (listing → draft → approval → published → comment); the screens themselves are gated as before | D-1 | Social, Owner |
| R-11 | "Leads per month" vs processing limit; Essential/Growth/Scale vs Enterprise; same vs staged functions | **unified**: "Consultas procesadas al mes" on every page; the packages page shows the ladder's names (Enterprise for `scale`, the id unchanged) and the ladder's staged lines per card | API confirms `leads_month` counts processed enquiries (D-9); the owner confirms the display name "Enterprise" | API, Owner |
| R-12 | Owner 2026-10-12 on the first screen: too much of Laura's message in the hero, the two cards under the panel confuse the eye, the grey-to-ivory band under them | **rebuilt**: the hero's exchange is two short bubbles (one question each); the cards and the ivory band are gone; the situation ("Marcos is at a viewing until 12:00 · Nuova handles what arrives") is one line inside the panel, the state line its last line; the hero ends on its own dark foot and the story begins at its own edge. The four depth layers are now stars, the coast, the ridges and the panel (final order §3 named cards as the fourth layer; the owner's verdict replaced them) | the owner's visual verdict on the deployment | Owner |

## F4. The restore of 2026-10-16 (owner's verdict on v4: "riesiger Rückschritt", restore 3fae766 plus the small points)

| # | Point | State | Needed | Lane |
|---|---|---|---|---|
| W-1 | `3fae766` restored on every page and script; v4 withdrawn (its rows F3 are history) | **done** | the owner's verdict | Owner |
| W-2 | Four layers of the land (far ridge, near ridge, panel, foreground), the panel larger, the chapters as a deck, one field colour | **built** (`WEBSITE_RESTORE_1016_RETURN_v1.md` §2) | the owner's verdict | Owner |
| W-3 | No "Jarvis" public; fewer property references in the dialogues; "Consultas al mes"; packages with for whom / what changes; the four-word menu and the structured platform page | **built** | Copy's confirmation of the changed lines; the owner's public name for the assistant | Copy, Owner |

## F3. The v4 redesign of 2026-10-16 (withdrawn on the owner's verdict; kept as history)

| # | Point | State | Needed | Lane |
|---|---|---|---|---|
| V-1 | Pain first, the loss visible, four layers, the panel standing up, no band, no fades, one ground, ≤ 900 words, no Jarvis, ≤ 2 references | **built** (`WEBSITE_V4_1016_RETURN_v1.md` §1, §4) | the owner's verdict | Owner |
| V-2 | The product truth on one page (`/hoy`), no state lines on the sales pages | **built**; the three lists come from the platform map, the language, email and CRM lines from TEXTS_1013 | Copy's and Audit's confirmation of the placement | Copy, Audit |
| V-3 | One vocabulary: the menu's four words, the module page names, the footer | **built** | Copy's confirmation of the names | Copy |
| V-4 | Packages: for whom, what changes, what is added; the price once; "WhatsApp y email" only | **built**; the web form and the phone are "in preparation" on `/hoy` and nowhere sold | the owner on prices, phone and web form | Owner |
| V-5 | The rotating building and the unfurnished → furnished pair | **not available** (R-8) | the 3D lane's files | 3D |
| V-6 | Every new text of v4 | WORKING by the implementer | Copy's check | Copy |

## G. Not in the target version, on purpose

- The idea "ten free agencies at a time, then a waiting list" and trial extensions against testimonials (master order §10): product decisions, not on any page.
- Testimonials, customer logos, success figures: none.
- "Without setup": never said; the trust section names the connection step.

## H. Closed rows stay closed

A row is reopened only on a relevant change of the page or of the proof (master order §12). Rows marked "none" need
nothing further for publication.
