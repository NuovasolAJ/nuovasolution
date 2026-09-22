# PRODUCT TRUTH — NuovaSolution

> ## ⚠ STATE 2026-09-22 (block version `pt-state-2026-09-22`, written 2026-09-22T08:11Z)
>
> Source: `CLOSEOUT_EVIDENCE_INDEX_v1.md` state `2026-09-22_SYNC_0900Z` and the Audit's live read of
> 2026-09-22 (~08:30Z as dated by the Audit) in `governance/dispatch_2026-09-22/`. Changes against
> the 2026-09-21 block below; everything not listed is unchanged.
>
> | Chain | Now | Record |
> |---|---|---|
> | Owner login | proven in prod (LV) | `OWNER-LOGIN-PROD-1` |
> | Owner membership | in prod: employee `24ee6292…`, agency_admin, 2026-09-21 12:33Z (LV) | `OWNER-MEMBERSHIP-PROD-1` |
> | Owner walk in the Daily board | **not done**: task `03d0d8eb…` still queued, unclaimed | Audit read 2026-09-22 |
> | Gmail reply | the 2026-09-20 regression was **answered twice** (one node run, a timeout retry). `GMAIL_REGRESSION_PASS = NO` stays. A fix is deployed (no blind retry, renderer v2, Main `942392608803592d`) but **no real message has run on it**: nothing counts as proven before `GMAIL_POSTFIX_E2E_PASS` | Index `GMAIL-REGRESSION-0920` (corrected) |
> | Interaction count contract | in prod (`upsert_lead_memory` `55aa533b340e9ea4`); not yet proven by a real first message | `IC-CONTRACT-PROD-1` |
> | Media analysis | prod media tables exist; prod still calls the old v1 children; no email attachment path; **not live** | `MEDIA-PLANE-PROD-1` |
> | Property matching | internal only: staging canary, prod returns `{}` | `PM_SYNC_0921_RETURN_v1.md` |
> | Voice | **not offered.** A public voice agent in prod can create confirmed bookings without calendar authority; containment awaits owner decision `VOICE_BOOK_SCOPE_REVOKE`. **Not "blocked" until the containment is confirmed** | `VOICE-PROD-BOOK-CONFIRM-1` |
> | AI disclosure | v1.0-es (owner approved 2026-08-05) and v1.1-es (counsel pending) exist, **both inactive**; prod renders an **unapproved** interim sentence since 2026-09-21 17:12Z (ruling R2) | `API_A7_AI_DISCLOSURE_AUTHORITY_PROD_2026-09-21_v1.md` |
> | Sign-off | renderer v2 in prod builds a localised sign-off; the prompt closing and the code fallback that produce "Antonio's AI Assistant" are **still present**; no real reply seen | `HOSTING_SYNC_0921_RETURN_v1.md` |
> | Native CRM | prod gained an **inert** `contacts` table (no consumer) | `API_MEDIA_PROD_PLANE_2026-09-21_v1.md` |
> | Hot lead alert | unchanged: not evidenced; the website now carries no hot lead statement at all (accepted, D-10) | `WEBSITE_CLAIM_REGISTER_v2.md` §4 |
> | Social | unchanged: nothing submitted, nothing connected | `SOCIAL_SYNC_0921_RETURN_v1.md` |
> | Website | public site is still the pre-redesign site with rejected claims (WR-03); rebuild at `2089094` not accepted (re-review pending) | `REVIEW_2026-09-21.md` |

> ## ⚠ STATE 2026-09-21 — read this block before any section below
>
> **This document was last reconciled on 2026-08-31 against backend contracts (export v2). Since
> then three things changed that its body does not reflect:** the website was rebuilt
> (`8e782f9`, 62 pages, stub mode); the owner's canonical audit of 2026-09-08 set website
> statuses; and the evidence index now records real prod runs (canonical state
> `2026-09-21_SYNC_1215Z`). **Its sections describe contracted scope and required qualification;
> they are not a statement of what runs today.** For what runs today, per claim and per page, the
> current source is `WEBSITE_CLAIM_REGISTER_v1.md`, built from
> `NuovaSolution-n8n-system/governance/CLOSEOUT_EVIDENCE_INDEX_v1.md`.
>
> **Product chains, seven stages, as evidenced on 2026-09-21** (1 implemented · 2 internally
> tested · 3 staging · 4 real provider transport · 5 in prod · 6 owner visibly tested ·
> 7 independently accepted; LV = re-read by the Audit, RO = lane report):
>
> | Chain | Highest stages evidenced | Public status | Key record |
> |---|---|---|---|
> | WhatsApp text dialog with reply | 1 to 7 | prod proven | `WA-PROD-E2E-1` LV |
> | Gmail enquiry answered | 1 to 6; data effect open | prod partial | `GMAIL-REGRESSION-0920` LV; `GMAIL_REGRESSION_PASS = NO` (Lead return 09-21) |
> | Lead capture and scoring | 1 to 6 | prod proven | leads row `9252f3b8…` LV |
> | Viewing request becomes a task | 1 to 5 for task creation | prod proven (creation); agent side open | `WA-PROD-E2E-1` task `32711087…` |
> | Native CRM | prod stores `leads`, `lead_memory`; no `contacts`, no CRM screen, no catalogue functions | prod partial | `CRM_ONBOARDING_DROPDOWN_CONTRACT_v1.md` |
> | Google Sheets per agency | 1 to 3 | staging only (prod: NuovaSolution's own sheet, RO) | same |
> | External CRMs | 1 to 4 in staging, `coming_soon`, sync fenced | staging only | same |
> | Hot lead alert to an agent | 1 to 3 at RPC level | **not evidenced in prod** | run 36718 hot, no alert |
> | Follow up | 1 to 3; automatic sending off in prod | staging only | brief §6 |
> | Media analysis | 1 to 3 | staging only; prod media plane absent | `MM-0730Z-1` LV |
> | Property matching to customers | 1 to 3 on fixtures | staging only; decision M1 open | F5 |
> | Voice | 1 to 3 | staging only | real call did not reach the pipeline |
> | Social growth | 1 to 3 | staging only; Meta review not submitted | PROMPT_08 |
> | Daily Goals and assistant | 1 to 3 | staging only; prod walk blocked | `DAILY-UI-WALK-STG-1` |
> | Trial lifecycle | 1 to 3 | staging only | export v2 §C |
> | Customer self onboarding | wizard 1 to 3; owner bootstrap in prod by operator action | staging only for self service | `API_OWNER_BOOTSTRAP_PROD_2026-09-21_v1.md` RO |
> | AI disclosure in messages | 1 to 3 | staging only; table missing in prod | F3 |
> | Email branding | 1 to 6 | prod partial (one black logo, no dark mode protection) | F6 |
> | DSAR and deletion | 1 to 3 | staging only; prod not certified | brief §5 |
> | Website Q&A | 1 to 3, answer simulated | staging only | `SYNC_0730Z_HOSTING_ROUND_v1.md` |
> | 3D Property Experience | toolchain only | premium on request; no delivery yet | `PX-TOOLCHAIN-1` |
>
> **Contradictions resolved by this block:** §10 and `INTEGRATION_COMPATIBILITY_MATRIX.md` call
> external CRMs `BACKEND CONFIRMED`; that means a contract exists, **not** that an agency can
> connect one. The onboarding catalogue offers them as `coming_soon`, interest only.
> `CLAIMS_MATRIX.md` D-10 (hot lead alerting `BLOCKED`) still holds; the website contradicts it and
> is being corrected, not the matrix.
>
> **Owner-level facts added since 2026-08-31:** the trial is free with no payment method at signup
> (closed decision C, `CLAIMS_MATRIX.md` T-01, T-01b); the four employee roles are confirmed; the
> mandatory onboarding gate `ai_disclosure` is counsel pending, so **no agency can currently be
> activated**.

**Author:** Product Truth Director / Claims Auditor instance (independent of implementation)
**Branch:** `website_enterprise_redesign`
**Created:** 2026-08-30
**Last reconciled:** 2026-08-31 — Wave V1, against **export-v2 and the AF addendum**
**Binding under:** `MASTER_GOVERNANCE.md` §3 (document precedence), R3, R6, R7
**Companion document:** `CLAIMS_MATRIX.md`
**Technical authority above this document:**
`backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2.md` **plus**
`backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2_AF_ADDENDUM_v1.md`
(rank 1 per `FINAL_RECONCILIATION_REPORT.md` §0). This document remains rank 3 and continues to govern
confirmed product scope and required qualification.

> **Export v2 supersedes export v1. v1 is HISTORICAL and must not be implemented against.**
> Where this document previously relied on a v1 field, the v2 statement governs. The single largest
> reversal is pricing: see §17.1.

> **Scope of authority.** This document defines what NuovaSolution *is* and *is not* for the
> purpose of public website statements. It does not approve a design, a page, a release or a
> deployment. It makes **no production readiness claim** about any capability.

---

## 0. Method, evidence rules and the central limitation

### 0.1 What was examined

| Source | What it is | What it can prove |
|---|---|---|
| **`backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2.md`** | **Canonical technical authority.** Supersedes v1. Nine fixed owner/product decisions, the MF-01…MF-12 reconciliation, a full website-safe error enumeration, the exact onboarding step-detail projection, and the OAuth return contract. Zero secrets. | **That a backend contract exists** for a named capability, and that the backend team asserts the underlying functions are applied on staging. It does **not** prove the website integrates it, nor that anything works end to end from this repository's position. v2 explicitly claims **no runtime proof for the HTTP endpoints themselves**. |
| **`backend_handoff/…_v2_AF_ADDENDUM_v1.md`** | Addendum to v2, scope AF-01, AF-04, AF-07 only | OAuth cancellation semantics, communication provider display names, and the branding preview shape |
| ~~`…_HANDOFF_EXPORT_v1.md`~~ | **HISTORICAL.** Superseded by v2 | Nothing. Must not be implemented against. Retained only to explain what changed. |
| `FINAL_RECONCILIATION_REPORT.md` | Conflict decisions, C-08 … C-27, MF-01 … MF-12 | Which recorded status the handoff changes, and which it does not |
| `INTEGRATION_COMPATIBILITY_MATRIX.md` | Per-capability backend / website / publishable mapping | The three-column status of each capability |
| `FINAL_WEBSITE_INTEGRATION_PLAN.md` | Wave plan and non-deliverables | What this wave cannot deliver and why |
| `docs/website_redesign/MASTER_GOVERNANCE.md` | Process authority | Rules, not product facts |
| `docs/website_redesign/CURRENT_SITE_AUDIT.md` | Factual codebase inventory | State of the **website**, not the product |
| `docs/website_redesign/INTEGRATION_CONTRACT.md` | Action-by-action state machine | Which website actions have a target system |
| `docs/website_redesign/IMPLEMENTATION_STATUS.md` | Phase log, 7 open conflicts | Which decisions are still missing |
| `CLAUDE.md` | Older project brief | Superseded positioning (conflict C-07) |
| Website codebase (72 tracked files + untracked `/v2`) | Next.js 14 marketing frontend | What the site does today |
| `components/live-demo/demo-engine.ts` | 590 lines, deterministic | That the public demo is **not AI** |
| `translations/en.ts`, `translations/es.ts` | 240 keys each | The claims currently published |
| `lib/os/copy.ts` (untracked `/v2` draft) | Marketing draft with `status: "live" \| "soon"` flags | **Author intent**, not verification |
| Local project notes (2026-05-20) | Automation inventory, active/inactive components | **Indirect** evidence that a backend exists |

### 0.2 Evidence rules applied

1. **Marketing copy is not evidence.** Text in `translations/*.ts` or `lib/os/copy.ts` asserting
   a capability proves only that someone wrote the sentence.
2. **A brief is not evidence.** The owner's capability list is a *specification of intent*. It is
   recorded faithfully below, but it does not by itself move a capability to "confirmed".
3. **Absence of code is evidence of absence — in this repository only.** The website repo
   containing no voice, CRM, social or panorama code proves the *website* has none. It does not
   prove the *product* has none, because the product lives outside this repository.
4. **Indirect evidence is labelled as indirect.** A locally documented component inventory dated
   2026-05-20 indicates that an automation backend exists with active and inactive parts. It is
   three months old, lists names only, and carries no functional verification.
5. **No internal architecture is reproduced here.** Per R8 and the owner's system-isolation
   directive, component names, identifiers, endpoints, hostnames and credentials are not written
   into this document, and no external system was contacted to produce it.
6. **A backend contract is evidence of a contract, not of a working website feature.** *(Added
   2026-08-31.)* The handoff satisfies §0.4's third evidence bullet — a written report from an
   authorised technical instance working inside the product project — for every capability it names.
   Those capabilities are therefore **`BACKEND CONFIRMED`**. That is a real and substantial upgrade
   from "owner brief only". It is **not** Category 1, because:
   - the website has no code against any of these contracts (`WEBSITE INTEGRATION PENDING`), and
   - nothing has been exercised against a live target (`END TO END VERIFICATION PENDING`), and
   - under `MASTER_GOVERNANCE.md` §14 this repository may not make that call at all, so the gap
     cannot currently be closed from here (`FINAL_RECONCILIATION_REPORT.md` C-14).

### 0.3 The central limitation — read this before using this document

*Revised 2026-08-31 after the backend handoff.*

**A large part of the platform is now `BACKEND CONFIRMED`. None of it is verified end to end, and
none of it is on the website.**

The 2026-08-30 handoff removed the evidentiary vacuum this document was originally written into.
Signup, login, logout, JWT sessions, the 14-day trial, the ten-step onboarding wizard with progress
and resume, agency details, branding assets, team and roles, CRM selection including Nuova CRM as the
default, property source including agency website inventory, Property Experience entitlement and
entry, readiness, entitlements, plans, subscription state, checkout handoff and the testimonial
submission mechanism all now have a written contract from the backend team.

What has **not** changed:

> **No capability in this document can be placed in Category 1 (Live and confirmed) by this
> instance.** Category 1 requires end-to-end verification. `MASTER_GOVERNANCE.md` §14 forbids this
> repository from calling any product system, staging included, so
> **`END TO END VERIFICATION PENDING` is currently unreachable rather than merely open**
> (`FINAL_RECONCILIATION_REPORT.md` C-14, owner decision 1).

Three distinct things must never be collapsed into one:

| | Means | Does **not** mean |
|---|---|---|
| `BACKEND CONFIRMED` | A contract exists and the backend team asserts it is proven on staging | The website has it, or that it may be advertised |
| `WEBSITE INTEGRATION PENDING` | No website code exists against that contract | The capability is absent |
| `END TO END VERIFICATION PENDING` | Nothing has been exercised against a real target from here | Anything is broken |

**A backend confirmation never lifts a legal hold.** Every `LEGAL REVIEW PENDING` item in §19 stands
exactly as written. The testimonial extension is the clearest case: fully confirmed technically,
still **DISABLED** for public display (§18.3).

The practical consequence is unchanged in shape and much better in substance: the new website can be
**designed and written in full**, product surfaces can now be **specified against real contracts**,
and a large share of public claims must still ship either (a) with the qualifying wording defined in
`CLAIMS_MATRIX.md`, or (b) not at all.

### 0.4 What counts as sufficient evidence to promote a capability to Category 1

Any **one** of the following, supplied by the owner, per capability:

- A dated screen recording or screenshot of the capability running in the product, with the
  agency-facing and customer-facing surfaces visible.
- A written owner confirmation naming: the capability, the date it went live, at least one real
  agency using it, and the configuration it requires.
- A verification report from an authorised technical instance working *inside* the product
  project (not from this website project).

Owner statements alone are accepted for **commercial** facts (packages, trial terms, contact
channels). They are **not** accepted for **technical** facts that the website would state as
present-tense capability, unless the owner explicitly takes responsibility for the claim — which
is itself recorded in `CLAIMS_MATRIX.md` as *Approved on owner's assertion*.

---

## 1. Status categories

| # | Category | Meaning | May the website state it in the present tense? |
|---|---|---|---|
| 1 | **Live and confirmed** | Verified end to end against evidence per §0.4 | Yes, plainly |
| 2 | **Technically present, not fully live-verified** | Asserted by the owner and/or indirectly evidenced; not verified | Only with the qualifying wording in `CLAIMS_MATRIX.md` |
| 3 | **Depends on agency configuration** | Real, but only exists once the agency configures it | Yes, with a configuration qualifier |
| 4 | **Legally or organizationally restricted** | Capability may exist but its use is bounded by law, platform policy or internal process | Only with the legal qualifier, and only after legal confirmation |
| 5 | **Available as controlled simulation** | The website can *show* it; the shown behaviour is not the product | Only when visibly labelled as a simulation |
| 6 | **Website prepared, backend not connected** | UI exists or will exist; no target system | No present-tense capability claim; honest pending state only |
| 7 | **Future capability** | Planned, not built | Only as an explicitly labelled future item, visually separated |

**Current distribution across the capabilities in §3–§16: Category 1 is still 0.** This remains the
single most important output of this document.

### 1.1 The reconciliation status vocabulary (binding, added 2026-08-31)

The seven categories above describe *what a capability is*. They are too coarse to describe *where it
stands*, now that a backend contract exists. The following ten values are binding from
`FINAL_RECONCILIATION_REPORT.md` §1 forward, and a capability normally carries **two or more**: one
backend status, one website status, plus any hold.

| Value | Meaning | May the public site assert it? |
|---|---|---|
| `BACKEND CONFIRMED` | The handoff defines a contract. The backend team asserts it is applied and proven on staging. | Not by itself. `CLAIMS_MATRIX.md` decides. |
| `WEBSITE INTEGRATION PENDING` | Backend confirmed, no website code exists for it. | No present-tense capability claim. |
| `END TO END VERIFICATION PENDING` | Nothing proven against a real target. **True of every surface.** | No. |
| `LEGAL REVIEW PENDING` | Held by a §19 legal dependency. | No, in any wording, in either language. |
| `OWNER DECISION PENDING` | A commercial, naming or process decision only the owner can make. | No. |
| `RESERVED` | Named in the handoff as reserved for a backend that does not exist. Visual preparation permitted, live behaviour forbidden. | No. |
| `PROPOSED` | A shape proposed, not backend defined. Never implemented as if real. | No. |
| `BLOCKED` | A required contract, decision or clearance is missing entirely. | No. |
| `REJECTED` | May not be stated, in any wording. | No. |

**`LIVE` and `PRODUCTION READY` are removed from the project vocabulary** and may not appear in any
document, commit message, status line or report on this branch.

---

## 2. Positioning truth

### 2.1 Confirmed positioning

NuovaSolution is positioned as an **AI Operating and Growth Platform for real estate agencies**,
not a chatbot and not a single-purpose lead tool. This is confirmed by the owner's brief and by
`MASTER_GOVERNANCE.md` §10, and it is binding.

**This is a positioning statement, not a capability claim.** It describes the category the product
competes in. It does not authorise stating that every module inside that category is live. The two
are separated deliberately throughout `CLAIMS_MATRIX.md`.

### 2.2 Positioning conflicts found

| ID | Conflict | Resolution |
|---|---|---|
| **PT-C1** | `CLAUDE.md` positions NuovaSolution as *"AI lead automation for real estate agencies in Spain"* and mandates a pain-first, sand/ivory Mediterranean homepage. The redesign brief mandates an enterprise AI Operating and Growth Platform with mineral black / champagne. | The redesign brief supersedes `CLAUDE.md` (per §10 governance and IMPLEMENTATION_STATUS C-07). **`CLAUDE.md` must be updated by the owner** so the repository does not carry two contradictory briefs. Until then, no instance should read `CLAUDE.md` as current positioning. |
| **PT-C2** | The **live website today** states the old positioning in the footer: *"AI lead automation for real estate agencies in Spain."* | Factual record. It is not a violation today, because it is a *narrower* claim than the platform positioning. It must be replaced in the redesign, not carried over. |
| **PT-C3** | `CLAUDE.md` instructs "Do NOT expose n8n / internal logic". The redesign brief is silent on this. | The `CLAUDE.md` rule is **retained** — it agrees with R8 and with the owner's isolation directive. Internal automation architecture is never public. |
| **PT-C4** | `CLAUDE.md` requires a chatbot/assistant entry point on the site; `INTEGRATION_CONTRACT.md` §7 records no chat backend. | The site assistant is Category 6. See §17.7. |

### 2.3 What NuovaSolution may never be called

- A chatbot, a chat widget, a WhatsApp bot, an autoresponder.
- A CRM replacement, unless §8's dependencies are closed (it is described as a CRM *layer* whose
  claim scope is defined in §8).
- An advertising platform or a media buying tool (see §3.7).
- Certified, compliant, GDPR-compliant, or legally guaranteed in any respect (see §18).

---

## 3. Lead Acquisition

### 3.1 Capability status

*Reconciled 2026-08-31. The connection surfaces are now backend confirmed; the marketing claims are
unchanged.*

| ID | Capability | Category | Status | Evidence basis |
|---|---|---|---|---|
| A1 | Google Lead Forms intake | **2 + 3** | `BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` | Handoff §5 rows 19–20: paid connect and paid status, entitlement gated. |
| A2 | Meta Lead Ads intake | **2 + 3** | `BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` | Handoff §5 rows 19–20. `externally_pending` while Meta approval is outstanding. |
| A3 | Click-to-WhatsApp attribution | **2 + 3 + 4** | `BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` · `LEGAL REVIEW PENDING` (L-08) | Handoff §5 row 19. Still depends on Meta ad configuration owned by the agency. |
| A4 | Web lead intake (product side) | **2** | `BACKEND CONFIRMED` for onboarding-side lead connection | Handoff §3 step 6. |
| A4b | Web lead intake (**this website's own forms**) | **6** | `WEBSITE INTEGRATION PENDING` · `OWNER DECISION PENDING` | The site still has zero forms and zero API routes (`CURRENT_SITE_AUDIT.md` §8). A signup contract now exists (§18), a generic marketing-form destination does not. |
| A5 | Social opportunities as a lead source | **2** | `BACKEND CONFIRMED` (entitlement key only) · unchanged as a claim | Handoff §5 row 10 exposes a `social.publish` entitlement key. **No platform is named anywhere in the handoff.** Overlaps §5. |
| A6 | Campaign and source attribution | **2** | `BACKEND CONFIRMED` (connection and readiness only) · `WEBSITE INTEGRATION PENDING` | Handoff §5 row 20 returns per-source `connected` / `ready` flags. The attribution *quality* claim is unchanged. |
| A7 | **Automatic advertising budget optimization** | **Excluded** | `REJECTED` | **Explicitly excluded by the owner.** Not a capability. The handoff adds nothing here. Must never appear. |

**Onboarding step 6 (`lead_acquisition`) states** are `locked_by_plan` when the plan does not include
paid acquisition, `externally_pending` when connected but the provider has not approved, `optional`
when not started, and `completed` when a channel is ready. A step in an external-pending state is
**never** presented as done.

### 3.2 What the agency experiences

Leads arriving from paid and organic sources land in one place, each carrying the campaign and
source it came from, rather than being scattered across platform inboxes and notification emails.

### 3.3 What the customer experiences

Nothing directly. The customer fills in an ad form, clicks a WhatsApp button, or submits a web
form and receives a reply (§4). Acquisition is invisible to them.

### 3.4 What may safely be claimed

That NuovaSolution can **receive and attribute** leads from Google Lead Forms, Meta Lead Ads,
click-to-WhatsApp and web forms, **subject to the agency connecting its own ad and web accounts.**
Attribution may be described as "which campaign and source a lead came from".

### 3.5 Required qualification

Every acquisition claim carries a connection qualifier: *"once your ad accounts and web forms are
connected"* or *"based on agency permissions and configuration"*. Lead ad intake requires the
agency's own advertising accounts, its own page and ad permissions, and platform approval that
NuovaSolution does not control.

### 3.6 What may not be claimed

- That NuovaSolution **runs, manages, creates or optimises** advertising campaigns.
- **Any** statement about ad spend, cost per lead, ROAS, ROI, lead volume, conversion rate or
  market share. Absolutely forbidden under R6, with no exception and no illustrative version.
- That attribution is complete or exact. Click-to-WhatsApp attribution in particular is
  probabilistic on the platform side and must not be presented as certain.
- That leads are "generated". The product **receives and processes** leads; the agency's ads
  generate them.

### 3.7 Required labelling

Where paid acquisition is presented as a package feature, it must be labelled as an entitlement
(§17), not as a service NuovaSolution performs on the agency's behalf.

### 3.8 What confirmation is missing

1. Which of A1–A6 are actually running for a real agency today, and since when. *(The handoff proves
   a contract, not adoption.)*
2. ~~Whether ad account connection is self-service~~ — **answered.** Handoff §3 step 6 places it
   inside the self-service onboarding wizard.
3. Whether Meta/Google app review or a Business verification is required, and whether it is held.
   The handoff models `externally_pending` for exactly this, but does not say whether approval is
   held today.
4. Whether "Paid Acquisition" as a package entitlement means *intake and attribution* or something
   more. The brief lists it as an entitlement without defining it, and the handoff does not define
   it either. **Owner decision required.**
5. ~~`MF-11` provider display names~~ — **closed 2026-08-31.** The paid sources render as
   **Google Lead Forms**, **Meta Lead Ads** and **Click-to-WhatsApp**, text only. Internal
   identifiers and keys are **never** exposed, and **logos remain blocked until brand approval**.
   This clearance is for the **authenticated product surface**; public marketing naming remains a
   separate claims decision.

---

## 4. AI Customer Communication

### 4.1 Capability status

*Reconciled 2026-08-31. **The handoff confirms channel connection. It confirms nothing about AI
conversational behaviour.** That distinction governs this entire section and must not be blurred.*

| ID | Capability | Category | Status | Evidence basis |
|---|---|---|---|---|
| B1 | WhatsApp **channel connection (the agency's own)** | **2 + 3** | `BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` | Handoff §3 step 5, §5 rows 17–18. `externally_pending` during Meta/WhatsApp verification. **This is not NuovaSolution's own business number** — that stays `BLOCKED` (§20, C-05 unresolved). |
| B2 | Email **channel connection** | **2 + 3** | `BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` | Handoff §3 step 5, §5 rows 17–18. Named mailbox providers stay forbidden. |
| B3 | Web conversations | **2 / 6** | Product side unchanged. **Website chat assistant: `RESERVED`** | Handoff §10 reserves the website concierge endpoint. No chat backend exists (`INTEGRATION_CONTRACT.md` §7). |
| B4 | Voice conversations | see §9 | Split three ways — see §9.1 | |
| B5 | Automatic responses | **2** | Unchanged. Not in the handoff. | Owner brief. The oldest and most consistently asserted capability across all sources. |
| B6 | Multilingual conversations | **2** | Unchanged. Not in the handoff. | Owner brief. The website's demo engine handles EN/ES/DE, which shows domain intent but is not product evidence. |
| B7 | Contextual memory across channels and time | **2** | Unchanged. Not in the handoff. | Owner brief; `/v2` draft marks it `live` (author intent only). |
| B8 | Images received and understood | **2 + 4** | Unchanged · `LEGAL REVIEW PENDING` (L-03) | Owner brief. Storage legally unconfirmed (§19). |
| B9 | PDFs and documents received and understood | **2 + 4** | Unchanged · `LEGAL REVIEW PENDING` (L-04) | Owner brief. Storage legally unconfirmed (§19). |
| B10 | Voice notes understood | **2 + 4** | Unchanged · `LEGAL REVIEW PENDING` (L-05) | Owner brief; `/v2` draft marks it `live`. Audio storage legally unconfirmed (§19). |
| B11 | Human handoff | **2** | Unchanged. Not in the handoff. | Owner brief; `/v2` draft marks it `live`. |
| B12 | Governed customer handling | **2 / 3** | Unchanged. Not in the handoff. | Owner brief. Governance rules are agency-configured. |
| B13 | Calendar **connection** | **2 + 3** | `BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` | Handoff §3 step 5, §5 row 17. Underpins the appointment qualifier in §10. |

> **The trap in this section.** The handoff proves that an agency can *connect* WhatsApp, email,
> calendar and voice. It proves nothing about what happens in the conversation afterwards. Using a
> connection contract to justify a conversational-capability claim is a **P0** violation.

### 4.2 What the agency experiences

Inbound messages across the connected channels are answered without an agent present. The agency
sees the conversation, not a queue of unanswered notifications. Where a conversation needs a human,
it is handed over with its history rather than restarted.

### 4.3 What the customer experiences

A reply that arrives quickly, in their own language, that refers correctly to what they said
earlier and to what they sent — including images, documents and voice notes. When a human takes
over, the customer is not asked to repeat themselves.

### 4.4 What may safely be claimed

- Instant automatic replies on connected channels.
- Conversations in the customer's language.
- Continuity: the system does not lose the thread between messages, channels or days.
- That images, documents and voice notes can be received and understood as part of a conversation.
- That a conversation can be handed to a person, with the history intact.

### 4.5 Required qualification

- **Channel availability:** *"Availability depends on channel configuration."* Not every channel is
  active for every agency.
- **Response speed:** speed may be described qualitatively ("in seconds", "instantly"). **A specific
  number of seconds may not be published** unless the owner supplies a measured, defensible figure.
  The current site's *"Replied in < 1 second"* and the `/v2` draft's *"Replied in 4 seconds"* are
  both unverified and contradict each other — neither may be carried over.
- **Files and audio:** every claim about images, documents or voice notes carries
  *"subject to applicable communication and data-protection rules"* until §18 is closed.
- **Governed handling:** *"with configurable customer handling and human oversight."*

### 4.6 What may not be claimed

- That the system never makes a mistake, always understands, or handles every case.
- That it replies "always within X seconds" as a commitment or SLA.
- That conversations are private, secure, encrypted, GDPR-compliant or legally safe (§18).
- That WhatsApp is available **on the website** — no number exists (C-05, §19).
- That the assistant on the website is the product (§19, §17.7).

### 4.7 Required labelling

Any on-site conversation surface that is not connected to the product backend must be labelled as
a simulation or rendered in an honest pending state. See §16 and §19.

### 4.8 What confirmation is missing

1. Which channels are actually connected for which agencies today. *(A connection contract is not
   adoption.)*
2. Whether WhatsApp runs on the WhatsApp Business Platform (Cloud API) or otherwise. This determines
   what may be said about templates, 24-hour windows and opt-in. The handoff does not say.
3. Which languages the **product** actually converses in, and whether the list is fixed or open.
   **Three separate concepts must never be mixed**, and the handoff is explicit about this:
   - the **website locale**, confirmed as `{ en, es }` on separate routes;
   - the **customer communication language**, free text with a backend default and no enum;
   - a **certified AI runtime language count**, which the backend states as a runtime fact.

   > **The runtime count is not an authorisation to publish a language number.** It describes the AI
   > runtime, not the website's language coverage, and naming a count remains forbidden (§4.6). This
   > is exactly the kind of internal figure that becomes a false public claim by being repeated.
4. Whether images, documents and audio are stored, where, and for how long (§19).
5. What "governed customer handling" concretely means: which rules, set by whom, changeable how.
6. A defensible response-time figure, if any is to be published. **Still not in any source.**
7. Any contract at all for **AI conversational behaviour**. The handoff covers connection and
   onboarding only. B5 to B12 remain owner-brief capabilities.

---

## 5. Social Growth

### 5.1 Capability status

| ID | Capability | Category | Evidence basis |
|---|---|---|---|
| C1 | Property and social content creation | **2** | Owner brief only. |
| C2 | Scheduled posting **where permitted** | **2 + 4** | Owner brief. Bounded by platform policy and account permissions. |
| C3 | Comment handling | **2 + 4** | Owner brief. Platform-policy bounded. |
| C4 | Comment → private conversation | **2 + 4** | Owner brief. Platform-policy bounded. |
| C5 | Private conversation → WhatsApp | **2 + 4** | Owner brief. Requires customer action and consent. |
| C6 | Lead capture from social engagement | **2 + 4** | Owner brief. Consent-dependent (§18). |
| C7 | Brand and language consistency | **2 / 3** | Owner brief. Depends on agency branding configuration (§13). |
| C8 | Controlled anti-spam behaviour | **2** | Owner brief. This is a *restraint*, and should be presented as one. |
| C9 | **Facebook Group automation** | **Excluded** | **Explicitly excluded by the owner.** Must never appear. |

**Reconciliation, 2026-08-31.** The handoff exposes a single `social.publish` entitlement key in
`GET /entitlements` and a "Social (when entitled)" line in onboarding step 6. That is
`BACKEND CONFIRMED` **as an entitlement key only**. It confirms that social is plan-gated. It confirms
no platform, no posting behaviour, no comment handling and no DM routing. **No platform is named
anywhere in the handoff**, so every social claim in this section keeps its existing verdict and every
platform name remains unpublishable.

### 5.2 What the agency experiences

Social presence is maintained without an agent writing every post and watching every comment.
Engagement that shows real interest becomes a conversation and then a lead in the same place as
every other lead, instead of being lost in a notifications tab.

### 5.3 What the customer experiences

A comment gets a reply. If they are genuinely interested, the conversation moves to a private
channel and, if they choose, onward to WhatsApp — as a continuation, not a restart.

### 5.4 What may safely be claimed

- Content creation support for property and social posts.
- Scheduled publishing **where the platform and the agency's permissions allow it**.
- Comment handling that can move a genuine enquiry into a private conversation.
- That social engagement can become a tracked lead.
- That behaviour is deliberately restrained and anti-spam by design.

### 5.5 Required qualification

Every social claim carries **both** a permission qualifier and a platform qualifier:
*"where permitted"*, *"based on agency permissions and configuration"*, *"subject to platform
rules"*. Social platform policy changes outside NuovaSolution's control, and a capability that is
permitted today may not be tomorrow.

### 5.6 What may not be claimed

- **Facebook Group automation, in any wording.** Excluded by the owner.
- Mass messaging, bulk outreach, cold DMs, automated follow requests, engagement farming, or
  anything that reads as growth-hacking. This contradicts C8 and creates platform-ban exposure.
- Guaranteed reach, followers, engagement or social lead volume. No numbers of any kind.
- That posting is fully autonomous with no human review, unless the owner confirms it.

### 5.7 Required labelling

Social Growth is a **higher-package entitlement** (§17) and must be labelled as such wherever it
appears, so no visitor believes it is included in the entry package.

### 5.8 What confirmation is missing

1. Which platforms: Instagram, Facebook, both, others.
2. Whether posting is fully automatic or requires agency approval before publishing.
3. Whether the required platform app permissions are held, and under which account.
4. Whether comment-to-DM automation is currently within each platform's policy.
5. Whether social-sourced contacts have a lawful basis for later messaging (§18).
6. Whether content creation produces text only, or images/video as well.

---

## 6. Lead Intelligence

### 6.1 Capability status

| ID | Capability | Category | Evidence basis |
|---|---|---|---|
| D1 | Canonical customer identity across channels | **2** | Owner brief; an inactive cross-channel component was noted 2026-05-20 — indirect and **inactive**, which weakens rather than supports the claim. |
| D2 | Qualification | **2** | Owner brief. The most consistently asserted capability across every source. |
| D3 | Hot lead score | **2** | Owner brief. The website's demo engine implements a *simulated* 8–100 score with fixed weights — **not the product's scoring**. |
| D4 | Prioritization | **2** | Owner brief. |
| D5 | Customer preferences | **2** | Owner brief. |
| D6 | Memory | **2** | Owner brief. |
| D7 | Follow-up state | **2** | Owner brief. |

### 6.2 What the agency experiences

Each contact is one record rather than four disconnected threads. That record carries what the
person wants, how serious they appear, what has already been sent, and what is due next — so an
agent can decide who to work on without reading every message.

### 6.3 What the customer experiences

They are treated as one person. Writing on WhatsApp after having emailed does not reset the
conversation, and they are not asked the same qualifying questions twice.

### 6.4 What may safely be claimed

- One customer identity across channels.
- Automatic qualification and a lead score that indicates how ready a lead appears.
- Prioritisation so agents work the most promising leads first.
- Retained preferences and follow-up state.

### 6.5 Required qualification

- Scoring must be described as an **indication or a priority signal**, never as an accurate
  prediction, a probability, or a measure of deal likelihood.
- The **numeric scale must not be published** unless the owner confirms the product's real scale.
  The current site publishes *"Each lead is scored from 1 to 100"* and *"Leads above 80 are marked
  as priority"*. These come from the website's simulation and are **not verified product facts**.
  They may not be carried into the redesign without owner confirmation.
- Identity resolution should be described as best-effort matching, not as guaranteed.

### 6.6 What may not be claimed

- Any accuracy figure ("95% accurate", "correctly identifies X% of buyers"). Forbidden.
- That the score predicts revenue, closings, or conversion.
- That no lead is ever misclassified.
- That identity resolution is perfect across channels.

### 6.7 Required labelling

Scoring is **automated profiling of a natural person**. Under GDPR this carries transparency
obligations and, where it materially affects the person, further duties. Any public description of
scoring must be reviewed against §18 before publication. This is a legal, not a copy, decision.

### 6.8 What confirmation is missing

1. The product's real score scale, thresholds and labels.
2. What identity resolution actually keys on (phone, email, both, fuzzy matching).
3. Whether scoring logic is disclosed to the agency, and whether an agency can adjust it.
4. Whether the data subject is informed that automated scoring takes place (§18).

---

## 7. Follow-up

### 7.1 Capability status

| ID | Capability | Category | Evidence basis |
|---|---|---|---|
| E1 | Basic follow-up | **2** | Owner brief; an inactive follow-up component was noted 2026-05-20. Included in all paid packages (§17). |
| E2 | Advanced follow-up and automation | **2** | Owner brief. Higher-package entitlement. |
| E3 | Nurturing | **2 + 4** | Owner brief. Timing and lawful basis unconfirmed (§18). |
| E4 | **Reactivation of older contacts** | **4** | Owner brief; `/v2` draft marks a 5-day, cross-channel reactivation as `live` (author intent only). **This is the single highest-risk capability on the site.** |

### 7.2 What the agency experiences

A lead that goes quiet is not forgotten. Follow-up continues on a defined cadence without an agent
remembering to do it, and the follow-up state is visible on the record.

### 7.3 What the customer experiences

A further message after a period of silence — potentially on a different channel from the one they
originally used.

### 7.4 What may safely be claimed

- That follow-up continues automatically when a lead does not reply, **within the agency's
  configured rules and applicable communication rules**.
- That follow-up state is tracked and visible.

### 7.5 Required qualification

Mandatory on **every** follow-up claim, with no exception:
*"subject to applicable communication rules and the agency's own permissions."*

**E4 (reactivation) additionally requires legal sign-off before it appears publicly at all.**
Re-contacting a dormant contact — especially by switching to a channel the person did not choose —
engages GDPR lawful basis, ePrivacy/LSSI-CE rules on unsolicited commercial communication, and
WhatsApp Business Platform policy simultaneously. The `/v2` draft's framing (*"she goes quiet …
on the fifth, the system tries once more, a different channel"*) is exactly the pattern that
requires confirmation, and it must not ship as written.

### 7.6 What may not be claimed

- That the system contacts people "until they reply", "never gives up", or "keeps trying".
  Persistence framing is a compliance liability and a brand liability. The `/v2` draft line
  *"It never sleeps. It never forgets. It never gives up."* — the third clause is rejected.
- That old or cold contacts are automatically reactivated, until legal confirmation exists.
- Any recovery-rate, revival-rate or re-engagement statistic.
- That channel switching is unrestricted.

### 7.7 Required labelling

If reactivation is shown at all, it must be shown as **agency-controlled and rule-bound**, not as
autonomous system persistence.

### 7.8 What confirmation is missing — *legal, blocking*

1. The lawful basis for follow-up messages after the initial enquiry response.
2. The lawful basis and time limit for reactivating older contacts.
3. Whether channel switching (email → WhatsApp, or the reverse) is permitted for a given contact.
4. Whether WhatsApp template-message and 24-hour-window rules are respected in follow-up.
5. Maximum follow-up count and interval that the owner is willing to state publicly.

---

## 8. Property Matching

### 8.1 Capability status

*Reconciled 2026-08-31. **The property source is now backend confirmed. The matching behaviour is
not.***

| ID | Capability | Category | Status | Evidence basis |
|---|---|---|---|---|
| F1 | Understands customer requirements | **2** | Unchanged. Not in the handoff. | Owner brief. |
| F2 | Uses verified or agency-authorised inventory | **2 + 3** | **`BACKEND CONFIRMED`** · `WEBSITE INTEGRATION PENDING` | Handoff §3 step 8 and §5 rows 25–26. Four source types: agency website, supported feed, CRM inventory, other authorised. |
| F2b | **Agency website as a first-class inventory source** | **2 + 3** | **`BACKEND CONFIRMED`** · `WEBSITE INTEGRATION PENDING` | Handoff §3 step 8 states agency-owned scraped website inventory is a first-class valid source and is **never blocked for being scraped**. `GET /property-source/status` returns `accepts_scraped_owned_inventory: true`. |
| F3 | Customer-facing focused matches | **2** | Unchanged. Not in the handoff. | Owner brief; `/v2` draft marks it `live` (author intent only). |
| F4 | Internal extended options for agents | **2** | Unchanged. Not in the handoff. | Owner brief. |
| F5 | Property discussion in voice conversations | see §9 | Inherits the voice status. | |
| F6 | **Named property portals** (Idealista, Fotocasa, any other) | **6** | **`REJECTED`, unchanged** | **The handoff names no portal.** `feed` is a generic supported feed, not a named portal integration. See the asymmetry note below. |

> **The deliberate asymmetry with §10.** External **CRM vendors are named in the handoff**; property
> **portals are not**. That is why the CRM naming question moved to `OWNER DECISION PENDING` while
> portals stay `REJECTED`. Conflating the two is a **P0** violation. F2b is a genuine new capability
> and a real differentiator, and it is a **different claim** from portal integration.

### 8.2 What the agency experiences

A lead's stated requirements are matched against the agency's own authorised inventory. The
customer receives a short, relevant selection; the agent can see a wider set internally.

### 8.3 What the customer experiences

A small number of properties that actually fit what they asked for, rather than a list dump or a
generic brochure.

### 8.4 What may safely be claimed

- That customer requirements are understood and matched against the agency's own properties.
- That the customer receives a focused selection and the agent sees more options internally.
- That matching uses **verified or agency-authorised sources**.

### 8.5 Required qualification

- *"Uses your own or agency-authorised property sources."* This is a **trust asset** and should be
  stated positively: the product does not invent or scrape listings.
- *"Availability depends on how your inventory is connected."*

### 8.6 What may not be claimed

- **Named third-party portal integrations.** The `/v2` draft names *Idealista, Fotocasa, HubSpot,
  Salesforce, Pipedrive, Zoho*, and the live site's `always.crm` key states *"Always synced to your
  CRM"*. **No integration with any of these is evidenced anywhere.** Under R6/R7 these are invented
  integrations and are **rejected outright** until the owner confirms each one individually.
- That matching accesses the whole market, all listings, or every portal.
- Any match-quality or match-accuracy statistic.
- That matches are recommendations, valuations or advice.

### 8.7 Required labelling

Any property shown in website media is **illustrative** and must be labelled as such unless it is
a real, licensed, permissioned listing. The `/v2` draft already contains a placeholder note to this
effect — that discipline must be carried forward.

### 8.8 What confirmation is missing

1. ~~How inventory reaches the product~~ — **answered.** Four source types, handoff §3 step 8 and
   §5 row 25.
2. Which named **portal** integrations exist, if any. **The handoff names none**, so F6 stays
   `REJECTED`. Named **CRM** integrations are answered separately in §10.
3. What "verified" means operationally, since the word carries weight. The handoff supplies
   `other_authorized` and `source_not_authorized` as states but does not define the authorisation
   test.
4. Whether the customer-facing match count is fixed (the `/v2` draft says three) or variable.
5. Any contract for the matching behaviour itself. The handoff covers where inventory comes from,
   not how it is matched.

**Scope note, confirmed 2026-08-31.** There is **no website or onboarding file-upload contract for
property data**. Properties arrive only through source connect: the agency's own website, a supported
feed, or CRM inventory. A direct property-file upload, if ever wanted, is
**`BACKEND IMPLEMENTATION REQUIRED`** and is explicitly **distinct from the Property Experience
panorama capture flow**. The website builds no property upload surface.

**Property Experience asset ownership is confirmed under the PX lane.** Assets belong to a tenant and
a property, and publishing **fails closed** on a cross-property reference. The website consumes the
entry point and nothing else, and **must not build a second capture wizard** (§13).

---

## 9. Voice AI

### 9.1 The contradiction — resolve before any voice copy is written

This is the clearest evidence conflict in the project.

| Source | Says |
|---|---|
| Owner's redesign brief (2026-08-30) | Voice AI answers calls, speaks naturally, qualifies, discusses properties, is multilingual, does callbacks, hands off to humans, and books appointments "when correctly configured". |
| `lib/os/copy.ts`, `/v2` draft | Voice stage explicitly flagged **`status: "soon"`**, with copy: *"Today it tells your agent. Soon it picks up the phone itself."* |
| `INTEGRATION_CONTRACT.md` W-05 | Asks the workflow project to *confirm whether voice AI has a real, callable public entry point*. Unanswered. |
| Local component inventory (2026-05-20) | Contains one **inactive** telephony-vendor test component. No active voice component. |
| Website codebase | No voice code, no telephony SDK, no vendor dependency. |
| **Backend handoff (2026-08-30)** | Confirms a **plan-gated voice channel connection surface inside agency onboarding** (§3 step 5 `voice_locked`, §5 row 17 `POST /connect/voice/start` with `403 not_on_plan`, §6 `PROVIDER_VOICE_*` variable names). Confirms **nothing** about voice AI answering calls, qualifying, discussing properties, booking appointments or being multilingual. Separately marks a **website** voice sales concierge as **`RESERVED`**. |

**Four of six sources indicate voice AI capability is not established. One source (the brief) states
it is a capability. The brief is newer, which is why this is a conflict and not a conclusion.**

### 9.1a Three distinct things, reconciled 2026-08-31

The handoff makes an existing ambiguity precise. These must never be conflated:

| # | Thing | Status | Public claim |
|---|---|---|---|
| 1 | **Agency voice channel connection** (onboarding step 5) | `BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING`, entitlement gated | Describable as a connection step inside onboarding. **Not** as voice AI capability. |
| 2 | **Voice AI capability** (answers calls, qualifies, discusses properties, books) | Unchanged. `OWNER DECISION PENDING`. Interim ruling below stands. | **No present-tense claim.** Future-labelled only. |
| 3 | **Website voice sales concierge** (a bot that talks to site visitors) | **`RESERVED`** | Visual preparation permitted. Live behaviour and any availability implication forbidden. |

**Naming rule for voice, binding, added 2026-08-31.** In the authenticated product, the email,
WhatsApp and calendar channels may be named by the product the agency actually connects. **Voice may
not.** It is rendered **generically as "Voice" or "Phone"**, because the internal voice registry
holds engineering and carrier descriptions rather than customer-facing product names, and rendering
them would disclose the internal telephony vendor stack. **No carrier or vendor identity is ever
rendered, in any surface, authenticated or public.**

> **Using (1) to justify (2) in copy is a P0 violation.** A contract that lets an agency plug in a
> voice channel is not evidence that an AI answers the call well, or at all.

### 9.2 Capability status

| ID | Capability | Category | Note |
|---|---|---|---|
| H1 | Answers calls | **2 or 7 — unresolved** | Owner must resolve §9.1 |
| H2 | Speaks naturally | **2 or 7 — unresolved** | Inherits H1 |
| H3 | Qualifies leads by phone | **2 or 7 — unresolved** | Inherits H1 |
| H4 | Discusses properties by phone | **2 or 7 — unresolved** | Inherits H1 + §8 |
| H5 | Multilingual voice | **2 or 7 — unresolved** | Inherits H1 |
| H6 | Callbacks | **2 or 7 — unresolved** | Inherits H1 |
| H7 | Human handoff from a call | **2 or 7 — unresolved** | Inherits H1 |
| H8 | Books appointments | **2 or 7 + 3** | Owner's own wording is conditional: *"when correctly configured"* |

**Interim ruling: voice is treated as Category 7 (future capability) on the public website until
the owner resolves §9.1 in writing.** This is the only safe default: shipping "soon" for a live
capability costs an opportunity; shipping "live" for a future capability is a P0 false claim.

### 9.3 What the agency experiences (if confirmed)

Inbound calls are answered when no one picks up. The caller is qualified, and the outcome lands on
the same customer record as every other channel.

### 9.4 What the customer experiences (if confirmed)

A call that is answered rather than ringing out, in their own language, with a person available if
they ask for one.

### 9.5 What may safely be claimed — under the interim ruling

Only that voice is a **planned capability**, in a visually separated future section, with wording
that cannot be mistaken for present availability.

### 9.6 Required qualification (once confirmed)

- *"when correctly configured"* — the owner's own qualifier, carried verbatim.
- Appointment booking requires calendar configuration and must not be claimed unconditionally.
- Availability depends on telephony configuration and number provisioning.

### 9.7 What may not be claimed

- That the AI is indistinguishable from a human, or that callers cannot tell. Beyond being
  unverifiable, several jurisdictions require AI disclosure in voice interactions, and the EU AI
  Act transparency obligations point the same way.
- Any call-handling, answer-rate or qualification statistic.
- That calls are recorded, transcribed or stored — **until §18 is closed**. Call recording in Spain
  requires notification and a lawful basis, and is a distinct legal question from messaging.
- A phone number. None exists in the project (R7).

### 9.8 Required labelling

If voice appears at all before confirmation, it must be labelled as a future capability, in its own
clearly separated section, never mixed into a live feature list.

### 9.9 What confirmation is missing — *blocking*

1. **Does voice AI answer and handle calls today? Yes or no.** Everything else depends on this. The
   handoff does **not** answer it — it confirms only that a voice channel can be connected.
2. If yes: for which agencies, in which languages, since when.
3. Is there a callable number the website may reference (R7 forbids inventing one)?
4. Are calls recorded or transcribed, and is the caller informed?
5. Is AI disclosure given at the start of a call?
6. Does appointment booking write to a real calendar? *(A calendar connection surface is now
   confirmed — handoff §5 row 17 — but that is the connection, not the booking behaviour.)*

---

## 10. Universal CRM

### 10.1 Capability status

*Reconciled 2026-08-31. **CRM selection is now backend confirmed. The CRM's internal record model is
not.***

| ID | Capability | Category | Status | Evidence basis |
|---|---|---|---|---|
| G0 | **Nuova universal CRM as the default** | **2** | **`BACKEND CONFIRMED`** · `WEBSITE INTEGRATION PENDING` | Handoff §3 step 7: Nuova universal CRM is the default and is `completed` with no action required. This is a genuine new confirmation. |
| G0b | **External CRM connection** | **2 + 3** | **`BACKEND CONFIRMED`** · `WEBSITE INTEGRATION PENDING` | Handoff §5 rows 21–24: provider registry, per-provider OAuth start, connection state, health probe, mapping validation with `missing_api_names[]`, and a Salesforce `prod`/`sandbox` switch. `externally_pending` until authorised. |
| G0c | **Naming the four CRM vendors in the authenticated product** | — | **`BACKEND CONFIRMED`, text only** *(2026-08-31)* | Canonical display names are fixed: **HubSpot**, **Pipedrive**, **Zoho CRM**, **Salesforce**. Internal identifiers are never rendered. This clears the **authenticated product surface** only. |
| G0c2 | **Naming the four CRM vendors in public marketing** | — | **`OWNER DECISION PENDING`** (was `REJECTED`) | The evidentiary objection is answered. The commercial and per-tenant readiness question is not. Public naming stays an owner decision. See §10.7. |
| G0d | **CRM vendor logos, anywhere** | — | **`BLOCKED`** | A working adapter is not a trademark licence, and the handoff explicitly keeps logos blocked until brand approval. Unchanged. |
| G1 | Customer history | **2** | Unchanged. Not in the handoff. | Owner brief. |
| G2 | Messages and channels | **2** | Unchanged. Not in the handoff. | Owner brief. |
| G3 | Source attribution | **2** | See §3 — connection surfaces confirmed, attribution quality unchanged. | |
| G4 | Qualification | **2** | Unchanged. See §6. | |
| G5 | Lead score | **2** | Unchanged. See §6. | |
| G6 | Preferences | **2** | Unchanged. See §6. | |
| G7 | Attachments and provenance | **2 + 4** | Unchanged · `LEGAL REVIEW PENDING` (L-03, L-04, L-05) | Storage legally unconfirmed (§19). |
| G8 | Handoffs | **2** | Unchanged. Not in the handoff. | Owner brief. |
| G9 | Appointments | **2 + 3** | Calendar **connection** `BACKEND CONFIRMED`; appointment behaviour unchanged. | Handoff §5 row 17. |
| G10 | Matching | **2** | See §8. Source confirmed, matching behaviour unchanged. | |
| G11 | Central agency view | **2** | Unchanged. Not in the handoff. | Owner brief. |
| G12 | **CRM connector health** | **2** | `BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` · **no public claim** | Handoff §5 row 24. Agency-facing diagnostics only. States `connected`, `degraded`, `action_required`. Never marketing material. |

### 10.2 What the agency experiences

One place holding the whole relationship: every message across every channel, where the lead came
from, how it was qualified and scored, what the customer wants, what they sent and where it came
from, who took over and when, what is booked, and which properties matched.

### 10.3 What the customer experiences

Nothing directly — but they experience its effect: no repetition, no lost context, no contradiction
between two agents.

### 10.4 What may safely be claimed

That NuovaSolution keeps the complete customer relationship in one place, across channels, with
history, attribution, qualification, preferences, attachments, handoffs, appointments and matches
visible to the agency.

### 10.5 Required qualification

- The word **"Universal"** describes *coverage of channels within NuovaSolution*, not universal
  compatibility with external CRMs. This distinction must be enforced in copy, because "Universal
  CRM" invites the wrong reading.
- Appointments require calendar configuration.

### 10.6 What may not be claimed

- **That it syncs with or integrates with a named CRM — pending the owner's decision.** *(Revised
  2026-08-31.)* The blanket rejection was grounded on "no integration is evidenced anywhere". That
  ground no longer holds: the handoff evidences a four-provider adapter registry. **Naming the
  vendors is therefore `OWNER DECISION PENDING`, not `REJECTED`.** Until the owner decides, no vendor
  is named. The live site's unqualified *"Always synced to your CRM"* stays **rejected** regardless,
  because it asserts automatic, universal, always-on sync that no contract supports.
- **Vendor logos remain forbidden.** A working adapter is not a trademark licence.
- That it is a full CRM replacement, unless the owner confirms that positioning.
- Any storage, uptime, retention or security guarantee (§19). **Cross-tenant isolation is confirmed
  technically and remains forbidden as a marketing claim** — do not convert a security invariant into
  a selling point.

### 10.7 Required labelling

If any external CRM is ever named, it requires individual owner confirmation plus, for logo use,
trademark permission. Logos of companies NuovaSolution does not integrate with are a
`MASTER_GOVERNANCE.md` R6 violation ("fictional … logos") and a legal exposure.

### 10.8 What confirmation is missing

1. ~~Is the CRM a real agency-facing application with a login?~~ — **partly answered.** Authentication
   exists (§18.0). **Where the application lives after onboarding step 10 is still unknown — `MF-03`,
   and it is a P0 scope question** (`FINAL_RECONCILIATION_REPORT.md` C-27). Until it is answered the
   **Log in** CTA cannot render, because it has no destination.
2. ~~Does any external CRM integration exist?~~ — **answered: yes**, four providers, with health and
   mapping validation. The remaining question is commercial: **may they be named publicly?**
3. Where is customer data stored, in which region, for how long (§19)?
4. Can an agency export or delete its data?
5. Does connecting an external CRM replace Nuova CRM or run alongside it? The handoff models them as
   alternatives in one wizard step but does not state the data consequence.

---

## 11. Daily Goals and Internal AI Assistant

### 11.1 Capability status

| ID | Capability | Category | Evidence basis |
|---|---|---|---|
| I1 | "Who should I call today?" | **2** | Owner brief only. |
| I2 | "Prepare me for my next viewing." | **2** | Owner brief only. |
| I3 | "Message Pablo." | **2 + 4** | Owner brief. Sending on the agent's behalf raises consent and attribution questions. |
| I4 | "Email my colleague." | **2** | Owner brief only. |
| I5 | "Which buyers match this villa?" | **2** | Owner brief; depends on §8. |
| I6 | "Why is this lead a priority?" | **2** | Owner brief; depends on §6. Valuable as an *explainability* claim. |
| I7 | "How is my team doing?" | **2** | Owner brief; depends on §12. |
| I8 | Desktop, mobile and speech interaction | **2** | Owner brief only. |

**Note:** this is the strongest differentiator in the entire brief. It is what separates an
"operating system" from a "lead tool", and it remains the highest-value and highest-risk section on
the site.

**Reconciliation, 2026-08-31.** The handoff exposes an `assistant` key in the `GET /entitlements`
feature map. That is `BACKEND CONFIRMED` **as an entitlement key only**: it confirms the assistant is
plan-gated and nothing else. No question set, no capability, no interaction surface and no speech
support is contracted anywhere. **Every row I-01 to I-10 keeps its existing verdict**, and the
section stays entirely `OWNER DECISION PENDING`.

### 11.2 What the agency experiences

An agent asks the system, in plain language, what to do next — and gets an answer grounded in the
agency's own data, plus the ability to act on it directly.

### 11.3 What the customer experiences

Nothing directly. They experience better-prepared agents.

### 11.4 What may safely be claimed

That agents can ask the system in plain language about their own leads, viewings, priorities and
team, and act on the answer — **once confirmed**, and with the entitlement qualifier (§17).

### 11.5 Required qualification

- Higher-package entitlement. Must be labelled as such.
- Speech interaction requires device permissions and is a browser capability, not a product
  guarantee.
- Actions taken on the agent's behalf (I3, I4) must be described as requiring the agent's
  confirmation, unless the owner confirms otherwise.

### 11.6 What may not be claimed

- That the assistant is autonomous, decides for the agency, or acts unsupervised.
- Any time-saved, productivity or performance figure.
- I7 ("How is my team doing?") must not be presented as employee monitoring or performance scoring.
  In Spain, systematic employee monitoring engages works-council information duties and data
  protection obligations. **This needs legal review before it is described publicly.**

### 11.7 Required labelling

Every example question shown on the site is **illustrative**, and must be marked so — it shows the
kind of question, not a guaranteed supported command set.

### 11.8 What confirmation is missing

1. Does the assistant exist today, in any form?
2. Is it text only, or genuinely speech-capable?
3. Which of I1–I7 actually work, and which are aspirational? A partial list published as a complete
   one is a false claim.
4. Can it send messages and emails on the agent's behalf, and with what confirmation step?
5. Legal position on I7 (team performance visibility).

---

## 12. Reporting

### 12.1 Capability status

All of the following are **Category 2** — owner brief only, no evidence in this repository:

Lead sources · response time · qualification · hot leads · appointments · supported conversions ·
property matching · team workload · daily goals · voice (inherits §9) · acquisition attribution ·
property experience usage (inherits §14).

Basic reporting is included in all paid packages; advanced reporting is a higher-package
entitlement (§17).

### 12.2 What the agency experiences

The agency sees what happened: where leads came from, how fast they were answered, how they
qualified, what was booked, what matched, and how work is distributed across the team.

### 12.3 What the customer experiences

Nothing.

### 12.4 What may safely be claimed

That the agency can see its own operational figures across the areas listed in §12.1.

### 12.5 Required qualification

- **"Supported conversions"** is the owner's own careful wording and must be preserved exactly.
  It means conversions the system contributed to. It does **not** mean conversions the system
  caused, and it must never be shortened to "conversions" in copy.
- Reporting covers only what NuovaSolution itself handled.
- Voice and property-experience reporting depend on those capabilities existing.

### 12.6 What may not be claimed

**Absolutely forbidden, with no illustrative or example version:**

- Ad spend, cost per lead, ROAS, ROI, revenue, commission, deal value, closing rate, or any
  financial outcome figure.
- Any example dashboard containing invented numbers presented as real or typical.
- Benchmarks, industry averages, or comparisons to "the average agency".
- Attribution language implying NuovaSolution caused a sale.

Under R6, a dashboard screenshot with plausible-looking invented figures is a **P0 violation**,
even if no visitor would take it literally. Every number in every visual must be either real and
sourced, or unmistakably marked as illustrative sample data.

### 12.7 Required labelling

Every reporting visual carries a visible **"Illustrative"** / **"Ejemplo"** marker. No exceptions,
including hero imagery, product screenshots and OG images.

### 12.8 What confirmation is missing

1. Does a reporting surface exist today?
2. Which metrics are real and computed, versus planned?
3. Is a real, non-invented screenshot available for the website?
4. What separates basic from advanced reporting (§17)?

### 12.9 Hot lead alerting — **`OUT OF SCOPE (website)`, settled 2026-08-31**

Previously recorded as `BLOCKED` on a missing website contract. **That classification was wrong and
is withdrawn.**

Hot lead surfacing is **internal**: the agency is notified through the existing agent notification
channel and through CRM and dashboard surfacing. **There is no public website or onboarding endpoint,
and none is required.** The missing-field register loses this item entirely.

**Two consequences, and they point in opposite directions.**

1. **The website builds nothing for it.** No section, no endpoint, no phone mockup, no alert imagery,
   no notification surface. This is settled rather than pending, so the design and copy lanes can
   stop holding space for it.
2. **No public claim is authorised by this.** A mechanism existing internally is not a cleared
   marketing statement. There is still no approved wording, and any future claim is a **fresh claims
   decision with a fresh legal check**, because alerting an agent about a customer across channels
   engages the cross-channel communication dependency (§19, L-08).

> **The distinction that matters:** "out of scope" answers *what the website builds*. It does not
> answer *what the website may say*. Treating the first as the second would convert a scoping
> decision into an unreviewed public claim.

`CLAUDE.md`'s "HOT LEAD ALERTS (MANDATORY SELLING POINT)" section **cannot be honoured as written**,
and that is now settled rather than pending. It strengthens the case for the `CLAUDE.md` update
already recorded as an owner decision.

---

## 13. Interactive Property Experience

### 13.1 Capability status

| ID | Capability | Category | Evidence basis |
|---|---|---|---|
| K1 | One panorama per room as standard | **2 + 3** | Owner brief. Requires the agency to supply panoramas. |
| K2 | Floor and ceiling included | **2** | Owner brief — a technical quality statement. |
| K3 | Real door navigation | **2** | Owner brief. |
| K4 | Room names | **2 + 3** | Agency-supplied. |
| K5 | Square metres **from a verified source** | **2 + 3 + 4** | Owner brief. **Legally sensitive — see §13.6.** |
| K6 | Real floor plan | **2 + 3** | Agency-supplied. |
| K7 | Current room indicator | **2** | Owner brief. |
| K8 | View direction indicator | **2** | Owner brief. |
| K9 | Multiple floors | **2** | Owner brief. |
| K10 | Stair transitions | **2** | Owner brief. |
| K11 | **No joystick, no free movement** | **Constraint** | A deliberate product boundary, not a limitation to hide. |
| K12 | Customer actions **only when genuinely configured** | **3** | Owner's own conditional wording. |
| K13 | **`px.experience` entitlement and onboarding entry** | **3** | **`BACKEND CONFIRMED`** · `WEBSITE INTEGRATION PENDING`. Handoff §3 step 9 and §5 row 27: `GET /px/entry` returns `{ entitled, state: "available" \| "locked_addon", action }`. Entitled means available; otherwise `locked_by_plan` as an add-on. |

**Reconciliation, 2026-08-31.** The handoff confirms **the entitlement and the onboarding entry
point only**. It confirms **none** of K1 to K12 — no panorama model, no navigation model, no floor
plan, no measurement sourcing. Those keep their existing verdicts, and **K5 remains
`LEGAL REVIEW PENDING`** (L-12).

**Scope boundary, binding:** the 3D room-based 360 capture wizard belongs to the Property Experience
lane. **The website must not build a second one** (handoff §3 step 9).

### 13.2 What the agency experiences

Properties can be presented as a navigable experience built from real panoramas, a real floor plan
and verified measurements, instead of a photo carousel. Capacity is a package entitlement (§17).

### 13.3 What the customer experiences

They move through the property room by room through real doorways, always knowing which room they
are in and which way they are facing, with the real layout and real room sizes available. They
cannot wander freely — movement is deliberately structured.

### 13.4 What may safely be claimed

- A panorama-based, room-by-room property experience with real door navigation.
- Full vertical coverage (floor and ceiling).
- Named rooms, real floor plan, current-room and view-direction orientation.
- Multiple floors with stair transitions.
- Structured navigation **by design** — this should be stated as an intentional choice, since it is
  what distinguishes it from a disorienting free-roam viewer.

### 13.5 Required qualification

- Requires the agency to supply panoramas, floor plans and verified measurements.
- Capacity depends on the package.
- Customer actions appear **only when the agency has configured them** (owner's own wording).

### 13.6 What may not be claimed — square metres

**K5 is the sharpest legal exposure in this section.** Published property measurements in Spain
carry consumer-protection consequences, and Andalusian regional consumer-information rules on
property marketing require accurate information to be available to buyers. Therefore:

- Square metres may be described as **"from a verified source"** *only* if the product genuinely
  enforces sourcing — i.e. an agency cannot type an arbitrary number.
- The website may **never** state or imply that NuovaSolution verifies, certifies or guarantees the
  accuracy of any measurement. NuovaSolution displays what the source provides.
- The word "verified" must be defined on the page, or replaced with the precise mechanism
  (for example "taken from the agency's official documentation").

**If the product does not actually enforce a verified source, K5 must be dropped from public copy
entirely.** This requires an owner answer.

### 13.7 Further forbidden claims

- "Virtual tour", "3D tour", "walkthrough" or "metaverse" framing that implies free movement —
  it contradicts K11 and oversells the experience.
- That it replaces a physical viewing.
- Any statistic about viewings saved, engagement or conversion uplift.
- Named third-party capture hardware or services, unless confirmed.

### 13.8 Required labelling

Any property shown in a website demo of this capability must be a real property used with
permission, or clearly marked as illustrative.

### 13.9 What confirmation is missing

1. Does the Property Experience exist and run today? Is there a real example that may be shown
   publicly, with the owner's permission?
2. Who produces the panoramas — the agency, NuovaSolution, or a third party?
3. Is the "verified source" for square metres technically enforced (§13.6)?
4. What are the per-package capacity limits (§17)? Numbers may not be invented.
5. What are "customer actions" concretely, and what does configuring them require?

---

## 14. Agency Branding

### 14.1 Capability status

*Reconciled 2026-08-31. Branding asset handling is now backend confirmed end of contract.*

| ID | Capability | Category | Status |
|---|---|---|---|
| L1 | Agency logo | **3** | **`BACKEND CONFIRMED`** · `WEBSITE INTEGRATION PENDING`. Handoff §5 rows 13–15: upload init with a signed URL minted in the BFF, commit, preview, remove. |
| L2 | Email banner | **3** | **`BACKEND CONFIRMED`** · `WEBSITE INTEGRATION PENDING`. Same contract, `kind: "email_banner"`. |
| L3 | Signatures | **3** | `BACKEND CONFIRMED` as part of onboarding step 3 (footer/signature). |
| L4 | Brand identity | **3** | `BACKEND CONFIRMED` as an onboarding step; the breadth of "identity" is not contracted. |
| L5 | Personalised communication | **3** | Unchanged. Not in the handoff. |
| L6 | Tenant-specific configuration | **2 + 3** | **`BACKEND CONFIRMED`.** Tenant and role are derived server-side from the verified JWT; cross-tenant asset access is refused (`403 cross_tenant_asset`). |

**Upload limits are confirmed — `MF-07` closed, 2026-08-31.** Branding assets are **image only**
(`image/png`, `image/jpeg`, `image/webp`, `image/gif`), **maximum 5 MB**, and exactly **two kinds**:
`logo` and `email_banner`. Validation copy can now be written, the accept filter carries real values,
and the size ceiling may be stated to the agency **before** file selection rather than as a failure.
A third kind produces a dedicated invalid-kind error.

**No other upload contract exists anywhere.** Not for testimonial media (§18.2), not for property
files (§8). Those are separate gaps and must not be inferred from this one.

**Footer and signature are text, not uploads — corrected 2026-08-31.** Only the logo and the email
banner are uploaded assets. The footer is **localized legal text**; the signature is a **mode
selection** from a fixed set plus text. The server sanitizes and renders both into responsive HTML
and plaintext. **The website submits plain text and never injects raw HTML.** Any earlier reading of
footer or signature as a third upload block is void as a premise.

**The branding preview shape is confirmed — AF-07 closed.** `GET /branding/preview` returns durable
**public** URLs for the logo and the email banner, each nullable, each with a boolean present flag,
plus a human-safe note that missing or invalid assets are omitted so no broken image is ever
rendered. The banner URL is non-null **only when the asset validates**. **No storage internals are
exposed** — no bucket, no object identifier, no signed URL. An agency returning to the branding step
renders its committed assets from that durable URL rather than from a stale browser object URL.

### 14.2 What the agency experiences

Communication goes out under the agency's own brand. The agency configures it once during
onboarding.

### 14.3 What the customer experiences

They hear from the agency they contacted — not from NuovaSolution. **This is important and should
be stated plainly**: the product is invisible to the end customer.

### 14.4 What may safely be claimed

That every outbound communication carries the agency's own branding, and that each agency's
configuration is separate.

### 14.5 Required qualification

Branding is configured by the agency during onboarding.

### 14.6 What may not be claimed

- White-label, reseller or agency-partner programme terms. None are confirmed.
- Data-isolation, tenancy-security or "your data is separate" **security** guarantees. Tenant
  separation is a functional statement here, not a security assurance (§19). **This holds even
  though the handoff confirms cross-tenant isolation was proven on staging** — a technical invariant
  is not a marketing claim, and converting it into one is a P0 violation.

### 14.7 Required labelling

None beyond the standard illustrative marker on any branded mockup.

### 14.8 What confirmation is missing

1. Is branding self-service or set up by NuovaSolution?
2. Does customer-facing communication ever show NuovaSolution's name?
3. Custom domain / sending-domain support?

---

## 15. Self-Service Onboarding

### 15.1 Capability status

*Reconciled 2026-08-31. **This section changed more than any other.** The wizard is fully contracted.*

### 15.0 Authentication and session — new, `BACKEND CONFIRMED`

| ID | Capability | Status | Evidence basis |
|---|---|---|---|
| M0a | **Signup** with tenant bootstrap and `agency_admin` membership | **`BACKEND CONFIRMED`** · `WEBSITE INTEGRATION PENDING` | Handoff §1 and §5 row 1. Public, captcha-protected, rate-limited. Service-role provisioning happens in the BFF only. Starts the 14-day trial (§18). |
| M0b | **Login** | **`BACKEND CONFIRMED`** · `WEBSITE INTEGRATION PENDING` | Handoff §1 and §5 row 2. Password grant, browser-safe with the anon key. |
| M0c | **Logout** | **`BACKEND CONFIRMED`** · `WEBSITE INTEGRATION PENDING` | Handoff §1 and §5 row 3. |
| M0d | **JWT and session** | **`BACKEND CONFIRMED`** · `WEBSITE INTEGRATION PENDING` | Handoff §1. Short-lived access token; **tenant and role derived server-side from `sub`**; refresh before expiry; on `401` refresh then retry once; httpOnly cookies preferred over `localStorage`. |
| M0e | Cross-tenant isolation | `BACKEND CONFIRMED` · **`REJECTED` as a public claim** | Handoff §1 states it was proven on staging. It stays a security invariant, never a selling point. |
| M0f | **Dashboard destination after onboarding** | **`PROPOSED`, website-owned** *(de-escalated 2026-08-31)* | **`MF-03` is no longer a backend gap.** The backend supplies the signal — `activatable` plus tenant activation — and explicitly does **not** own a route. The destination is a website decision, with a recommended target of the app dashboard under the locale route. This is no longer a P0 scope question; it is a website and owner decision. |
| M0g | **Locales** | **`BACKEND CONFIRMED`** (`MF-09` closed) | Website locale is exactly `{ en, es }`, on **separate locale routes**. Three concepts must not be mixed: the **website locale** `{en, es}`; the **customer communication language**, free text with a backend default and no enum; and the **certified AI runtime language count**, which is a runtime concern and is **not** a website claim (see §4.6). |
| M0h | **Error codes** | **`BACKEND CONFIRMED`** (`MF-04` closed) | A full website-safe enumeration exists per endpoint, plus ten global codes, inside the uniform envelope. Backend internals are never leaked; they map to stable public codes. Error copy is written **per code**, not per HTTP status. |
| M0i | **Captcha provider** | **`OWNER DECISION PENDING`** (`MF-08`) | No backend captcha contract exists. The provider is an owner choice; the BFF verifies server-side on public forms. |

### 15.1 The ten onboarding steps — `BACKEND CONFIRMED`

The wizard is driven by one projection, `GET /onboarding/state`. **`MF-05` is closed**: the exact
shape is now defined, carrying `client_id`, `exists`, `agency_name`, `plan`, `trial_end`,
`resume_step`, `completed_steps`, `total_steps`, `needs_action_steps`, `percent_complete`,
`activatable`, a five-key `legend`, and `steps[]` with per-step safe detail.
**Progress and resume** are written with `POST /onboarding/touch`.

> **The wizard is not forced linear.** Each step's status is computed independently from live state.
> The website may present the steps in any order and must drive completion from each step's own
> `status`, using `resume_step` only as a convenience pointer. *(Corrected 2026-08-31; the earlier
> reading implied a sequence the backend does not require.)*

> **Do not invent step fields.** The per-step detail is enumerated; anything beyond it does not exist.

| # | Step key | Category | Status | Completion rule per the handoff |
|---|---|---|---|---|
| 1 | `account` | 3 | `BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` | `completed` when a contact email is present. |
| 2 | `agency` | 3 | `BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` | Company name, website, address, phone, legal/footer, preferred languages. `completed` when name and timezone are set. |
| 3 | `branding` | 3 | `BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` | See §14. `completed` when branding is configured. |
| 4 | `team` | 3 | `BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` | `completed` at one or more active employees. Roles below. |
| 5 | `communication` | 3 | `BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` | Email, WhatsApp/Meta, Calendar, Voice when entitled. `externally_pending` during verification; `voice_locked` when voice is not entitled. |
| 6 | `lead_acquisition` | 3 | `BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` | See §3. `locked_by_plan`, `externally_pending`, `optional`, `completed`. |
| 7 | `crm` | 3 | `BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` | **Nuova CRM is the default and is `completed` with no action.** External CRM is `externally_pending` until authorised. |
| 8 | `property_source` | 3 | `BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` | See §8. Agency website, feed, CRM inventory, other authorised. |
| 9 | `property_experience` | 3 | `BACKEND CONFIRMED` (entitlement and entry only) · `WEBSITE INTEGRATION PENDING` | See §13. Entitled means available; otherwise `locked_by_plan`. |
| 10 | `ready` | 3 | `BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` · **destination `BLOCKED` (`MF-03`)** | Readiness and health summary. `completed` when the tenant is `activatable`. |

**Binding rule from the handoff:** a step in an `externally_pending` state is **never** presented as
done. This is a release-blocking invariant, not a preference.

### 15.2 Step state vocabulary — `BACKEND CONFIRMED`

Wizard steps carry exactly one of `completed`, `needs_action`, `externally_pending`,
`locked_by_plan`, `optional`. Connector health additionally uses `connected`, `degraded`,
`action_required`. Each must render distinctly. `degraded` is additive: it is neither a hard error
nor `connected`.

### 15.3 Remaining capability rows

| ID | Capability | Category | Status |
|---|---|---|---|
| M1 | Agency setup | **3** | `BACKEND CONFIRMED` — step 2. |
| M2 | Employees and roles | **3** | **`BACKEND CONFIRMED`.** Four roles: `agent`, `team_lead`, `office_manager`, `agency_admin`. `agency_admin` is the owner-bootstrap role created at signup. |
| M2b | **Offices on the team step** | **3** | **`BACKEND CONFIRMED`, 2026-08-31.** An offices list endpoint exists, returning a display-safe name and a default flag per office. The office identifier is an **opaque handle that is never rendered**, and the field is **optional** — omitting it means tenant level. **Role-gated:** an office manager may invite only into their own office; an agency admin into any. A dedicated out-of-scope error covers the violation. |
| M3 | Channels | **2 + 3** | `BACKEND CONFIRMED` (connection surfaces) — see §4. Each channel still needs its own permissions. |
| M4 | Branding | **3** | `BACKEND CONFIRMED` — see §14. |
| M5 | Property experience setup | **3** | `BACKEND CONFIRMED` (entitlement and entry only) — see §13. |
| M6 | Lead connections | **2 + 3** | `BACKEND CONFIRMED` (connection surfaces) — see §3. |
| M7 | Package entitlements | **2** | **`BACKEND CONFIRMED` as technical and per tenant** — see §17.7. |
| M8 | **Self-service without developers** | **3** | **`BACKEND CONFIRMED` in structure.** A ten-step self-service wizard with progress, resume and role-gated writes now demonstrably exists as a contract. |

### 15.2 What the agency experiences

The agency sets itself up: company details, staff and roles, channels, branding, property
experience, lead sources — without needing a developer.

### 15.3 What the customer experiences

Nothing.

### 15.4 What may safely be claimed

That setup is self-service and does not require technical staff — **once confirmed**.

### 15.5 Required qualification

- Connecting channels and ad accounts still requires the agency to hold and grant the relevant
  platform permissions, which is not something NuovaSolution controls.
- **No setup-time claim** ("live in a day", "up and running in 15 minutes") without a real,
  measured figure. The current site's *"It takes 15 minutes. No setup needed."* refers to the demo
  call, not to onboarding — that ambiguity must not be carried into the redesign.
- *"No setup needed"* as currently published is **not accurate** for a platform requiring channel
  connection, branding and inventory configuration. It must be replaced.

### 15.6 What may not be claimed

- That no configuration is needed at all.
- That every channel connects with one click.
- Any onboarding-duration figure without measurement.
- Migration or data-import capability, unless confirmed.

### 15.7 Required labelling

If onboarding is shown as a flow, every screen is illustrative unless it is a real screenshot.

### 15.8 What confirmation is missing

1. ~~Does a self-service onboarding flow exist?~~ — **answered: yes.** Ten steps, one projection,
   progress and resume, role-gated writes.
2. ~~Where does it live?~~ — **answered enough to proceed.** The wizard is contracted for the website
   to build, and the post-onboarding destination is a **website-owned decision** with a recommended
   target. It is no longer a backend gap.
3. Which steps genuinely require no developer. The contract is self-service in shape; whether a real
   agency completes it unaided is an adoption question the handoff cannot answer.
4. ~~What roles exist?~~ — **answered: four**, plus office scoping.
5. ~~`MF-05` per-step detail shape~~ — **closed.**
6. ~~`MF-04` error code enumeration~~ — **closed.**
7. ~~`MF-07` branding upload limits~~ — **closed.** ~~`MF-09` locales~~ — **closed** as `{en, es}`.
8. **`MF-08` — the captcha provider.** Still an owner decision; no backend contract exists.
9. **Minor, open:** whether signup auto-confirms the account or a confirmation step exists. The
   contract enumerates an unconfirmed-email error on the login grant, which the earlier reading did
   not anticipate. It affects one signup success path and is not blocking.

---

## 16. The public demo and simulation

### 16.1 Findings on the existing `/live-demo`

Verified by reading the code, not inferred:

| Finding | Evidence |
|---|---|
| The demo contains **no AI**. It is deterministic keyword, regex and weighted-score logic. | `demo-engine.ts`, 590 lines: keyword arrays for language, seller/rental/investor detection; regex for budget, bedrooms, timeline; a fixed additive score (base 18; budget +26, location +16, timeline +20, viewing +18 …) with thresholds ≥75 hot, ≥45 warm. |
| It makes **no network call**. Nothing is sent, stored or processed anywhere. | No fetch/XHR in the demo path; the audit confirms zero backend calls site-wide. |
| It is presented to the public as the working product. | Page metadata: *"…qualifies, scores, and responds to real estate inquiries **in real time**"*. UI labels: **"Live Demo"**, **"AI Analysis"**, **"CRM Updated"**, *"Try a real example"*. |
| It contains **no simulation disclosure whatsoever**, in either language. | Searched for simulation/demo-mode/illustrative disclosure text — none present. |
| Its published scoring scale is a **website invention**, and the homepage states it as a product fact. | `translations/en.ts`: *"Each lead is scored from 1 to 100"*, *"Leads above 80 are marked as priority instantly"* — these mirror the simulation's own thresholds. |

**Assessment: this is a live, unqualified false-claim exposure on the production website today.**
Under R3/R6 it is a **P0** finding. It is recorded here as fact; remediation is the owner's and the
implementation instance's decision, not this document's.

### 16.2 Ruling for the redesign

Any on-site experience that does not call the real product is **Category 5 — controlled
simulation**, and:

1. Must be labelled as a simulation **before** the visitor interacts with it, in EN and ES.
2. Must never use the words "live", "real time", "AI analysis" or "CRM updated" unless each is
   literally true of what is running.
3. Must not publish scoring scales, thresholds or timings that come from the simulation rather than
   the product.
4. May keep the domain logic as a demonstration of *what the product does*, provided the framing is
   honest about *how the demonstration works*.

The approved disclosure wording is defined in `CLAIMS_MATRIX.md`. It is **not** invented here and
must be confirmed by the owner in both languages.

---

## 17. Packages and entitlements

### 17.1 Confirmed package structure

Three internal package IDs, confirmed by the owner and now **`BACKEND CONFIRMED`**:
**`essential`**, **`growth`**, **`scale`**.

`GET /plans` returns exactly `{ plans: [{ code, display_name, entitlements_summary }] }`.
`GET /subscription/state` returns `{ account_state, plan, cancel_at_period_end }`.
`POST /checkout/session { plan_code }` returns `{ checkout_url }`. Checkout is a **server-determined
handoff**, never a payment form on the marketing site.

> ### **There is no canonical pricing authority. Correction, 2026-08-31.**
>
> **The previous statement in this section — that prices are served by the backend and the website
> merely renders them — is withdrawn in full. It was based on a v1 field that does not exist.**
>
> Export v2 defines the plans response as `{ code, display_name, entitlements_summary }`, marked
> **"(no price)"**. The plan table carries **no price column and no currency column**. There is
> **no backend pricing authority, no currency authority and no tax authority.**
>
> Consequently:
>
> - **No amount may be published, from any source, because no source exists.** Not a price, not a
>   range, not a "from" figure, not a currency symbol, not a billing period, not a discount.
> - **No currency, tax, VAT or IVA treatment may be stated or implied.** Spanish IVA
>   (inclusive or exclusive) is an external legal and owner matter, not a formatting choice.
> - The website may publish **plan names and entitlement summaries**. Nothing else.
> - A public pricing page presenting figures **cannot be built at all**. An access-model
>   presentation is the only available form.
> - `price_display` **does not exist** and may not appear in any type, client, mock or document.
>
> **Field renames for the typed client:** `name` → `display_name`,
> `features_summary` → `entitlements_summary`.

**Public plan names are backend-supplied at runtime.** The website renders `display_name` and must
never contradict it. Whether the configured `display_name` values are the intended public marketing
names is an owner confirmation, still open.

### 17.2 Baseline — included in all paid packages

Confirmed by the owner as the minimum for every paid package:

| Capability | Truth reference |
|---|---|
| CRM | §10 |
| Lead Engine | §3, §6 |
| Automatic Replies | §4 |
| Basic Follow-up | §7 (E1) |
| Property Matching | §8 |
| Core / Basic Reporting | §12 |

> The owner's two briefs use **"Core Reporting"** and **"Basic Reporting"** for this line. They are
> assumed to be the same thing; **the public name needs an owner decision.**

### 17.3 Higher-package capabilities — *may* be included, only if confirmed

The owner's wording is conditional throughout: higher packages **can** include these **only if
confirmed**. Nothing below may be placed in a package on the website without an explicit owner
mapping.

| Capability | Truth reference | Additional blocker |
|---|---|---|
| Voice | §9 | **Unresolved live/future conflict** (§9.1) |
| Daily Conversational Assistant | §11 | Unevidenced |
| Social Growth | §5 | Platform-policy bounded |
| Advanced Follow-up and Automation | §7 | Legal confirmation (§18) |
| Advanced Reporting | §12 | Basic/advanced split undefined |
| Property Experience | §13 | Quota numbers unknown |
| Paid Acquisition | §3 | Definition undefined (§3.8) |

### 17.4 Scale

The owner states that `scale` **may** include confirmed higher limits, a higher Property Experience
quota, and greater agency capacity.

**No number exists for any limit or quota.** None may be invented, estimated, illustrated or
implied — including through visual devices such as bars, dots, "up to" phrasing or comparative
column heights.

### 17.5 What is explicitly not confirmed

- **Any amount whatsoever.** No price, no "from €X", no range, no discount, no currency symbol, no
  billing period, no setup fee, no minimum term, no per-seat or per-agency model. **No backend price
  exists to render**, so this is not a "do not author" rule any more — it is a "nothing exists"
  fact. R6 is absolute.
- **Any currency, tax, VAT or IVA statement.** No authority exists. `LEGAL REVIEW PENDING` +
  `OWNER DECISION PENDING`.
- **Any numeric limit or quota.** Not in the handoff. `OWNER DECISION PENDING`.
- Whether the configured `display_name` values are the intended public marketing names.
- The exact feature-to-package mapping in §17.3. **Not in the handoff.** `OWNER DECISION PENDING`.

### 17.6 What may be published today

A plans page may state, without invention:

- That there are three packages.
- Each plan's **`display_name`** and **`entitlements_summary`**, exactly as served.
- The confirmed baseline (§17.2) as included in every paid package.
- That higher packages add further capabilities, and **only** those individually confirmed by the
  owner, each carrying its own qualifier from §3–§15.
- That the trial requires no payment method (§18.0), which is the honest and confirmed way to lower
  the barrier without stating a price.

**It may not state an amount, a currency, or a tax treatment**, because none exists anywhere.
A pricing page carrying figures is a **P0** finding under R6, and it is now also simply
unbuildable: there is nothing to build it from.

Whether the page routes to *Start your 14 day free trial* or to *Book a demo* follows the CTA
hierarchy in §20, not this section.

### 17.7 Entitlement enforcement — **answered 2026-08-31**

**`BACKEND CONFIRMED` as technical and per tenant.** `GET /entitlements` returns a feature map
resolving each key to `enabled`, `deferred` or `denied`, and wizard steps carry `locked_by_plan`
where a plan does not cover them. Provider connect returns `403 not_on_plan` for unentitled channels.

Consequences:

- The word **"unlocks"** becomes defensible wording. The previous prohibition is lifted.
- Enforcement is **not** manual, so the §14/§15 caveat about manual gating is withdrawn.
- **Technical entitlement keys are never shown to the agency** (handoff Appendix B invariant 6), and
  never appear in public copy.
- What each plan *contains* is still `OWNER DECISION PENDING`. Confirmed enforcement is not a
  confirmed mapping.

---

## 18. The 14-day trial and the extension mechanism

### 18.0 The trial exists — **resolved 2026-08-31**

**`BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` · `END TO END VERIFICATION PENDING`.**

`IMPLEMENTATION_STATUS.md` C-01 asked whether a 14-day trial exists. **The handoff answers yes.**

| Concern | Contract |
|---|---|
| Start | Implicit in signup. The tenant is created with a 14-day trial window. There is no separate call. |
| Status | `GET /trial/status` returns `{ status, plan, trial_end, days_left, account_state }`, with `status` one of `trialing`, `trial_expired`, `active`, `past_due`, `suspended`, `canceled`. |
| Remaining time | `days_left` plus `trial_end` as an ISO-8601 timestamp. **The source of truth is server-side and is never computed in the browser.** |
| Expiry | On `trial_expired`, premium features resolve to `denied`, the UI shows conversion prompts, and **login is never blocked**. |

**Every statement in the previous version of this section claiming the trial does not exist is
withdrawn.**

### 18.1 The trial is free, and takes no payment method — **confirmed 2026-08-31**

**The previous ruling in this section, that "free" was unconfirmed, is withdrawn.**

Export v2 states it as backend truth, in a fixed owner/product decision and in a dedicated contract
answer: the trial subsystem creates a **free** 14-day trial, automatic charging is off, conversion
requires explicit customer authorisation, and the subscription record carries **no
payment-instrument column in its required set**. **No card is collected at signup.** Payment occurs
only at the later, server-determined checkout handoff.

| Wording | Status |
|---|---|
| "14 day trial" | `BACKEND CONFIRMED` |
| **"Start your 14 day free trial"** | **`BACKEND CONFIRMED`.** The factual basis for *free* now exists. |
| **"No payment method required"** | **`BACKEND CONFIRMED`.** Preferred phrasing over card-specific wording, because it matches the contract exactly. |
| "No credit card required" | Factually supported, but narrower than the contract. Treat as a copy choice, not a separate fact. |

**Two things that remain true regardless.**

1. **Wording approval belongs to `CLAIMS_MATRIX.md`**, not to a backend confirmation. The relevant
   rows are moved there in the same wave; nothing ships on the strength of this section alone.
2. **The §14.3 CTA lockdown still applies.** Every product CTA requires an explicit, per-action owner
   release before it is wired. A confirmed fact and a fixed hierarchy are not a release.

**Finding retained as fact:** the production website already presents a "start for free" promise that
opens a sales booking. That remains a claim/behaviour mismatch, and it is now demonstrably wrong
rather than merely unsupported — **the trial genuinely does not require a sales call.** It must not
be carried into the redesign in that form.

**Ruling:** *Start Trial* becomes the **primary CTA once the signup surface exists on the website**,
with *Book a demo* optional and never a prerequisite. Until that surface exists, a primary CTA would
have no destination, so *Book a demo* remains the shipping primary. The change is that the trial-led
hierarchy is now **scheduled rather than blocked**.

### 18.2 The extension mechanism — **now backend confirmed, still legally held**

The owner specified the mechanism precisely. Recorded verbatim in substance:

1. After the 14 days, an extension of **seven days** may be requested **exactly once**.
2. The customer submits an honest reference or feedback video, or a link to one.
3. The status becomes **`pending review`**.
4. The owner reviews the material **manually**.
5. Seven days are granted **only after manual approval**.
6. **An upload may never automatically trigger an extension.**

**Reconciliation, 2026-08-31 — `BACKEND CONFIRMED`.** The handoff confirms points 1, 3, 4, 5 and 6
exactly:

| Owner's step | Contract (export v2) |
|---|---|
| Submission | `POST /testimonial`. Returns `{ ok, status: "pending_review" }`. |
| `pending_review` | `GET /testimonial/status` returns one of **six** states: `invited`, `submitted`, `pending_review`, `approved`, `rejected`, `withdrawn`. Only owner-approved testimonials are published. |
| Manual owner approval | A nonce-gated manual approval in the trial subsystem, server-side only. **The owner review queue is not a website surface.** |
| Exactly once, plus 7 days | Enforced by the backend with a uniqueness constraint per tenant. The contract expresses "exactly once" through a dedicated `extension_already_granted` response. |
| No auto-grant on submission | Confirmed. Submission returns `pending_review`, never `approved`. |
| **Who may submit** | **`MF-12` closed.** Authenticated agency user through the BFF. All testimonial functions are service-role gated. **It is not a public one-time link.** |

**Corrections to the previous version of this section, both material:**

1. **The state vocabulary is six values, not three.** Any surface, type or copy string built on
   `pending | approved | rejected` is wrong.
2. **The submission response field is `status`, not `state`, and its value is `pending_review`.**

**Point 2 of the owner's mechanism — the video — remains unavailable.**
`MF-01` is reclassified from "blocked on a missing field" to **`BACKEND IMPLEMENTATION REQUIRED`**.
The submission function accepts a `media_ref` **string reference only**. There is **no file upload
and no storage pipeline** for a testimonial video or reference file. Written testimonial, manual
approval and the one-time extension are fully defined; the media half is not.

> **Binding: do not fake a video upload field.** A control that appears to accept a video when no
> storage pipeline exists is a P0 honesty failure. The surface waits for the backend work.

**Binding rendering rule, unchanged:** the website **never hardcodes the number seven**. It renders
the updated `trial_end` from trial status, so that a product change to the extension length cannot
silently make the website lie.

**`extension_already_granted` must render as a plain statement of fact** — the extension has already
been used — and never as an error implying the agency did something wrong.

### 18.3 Ruling on publication — **unchanged by the backend confirmation**

> **This mechanism remains marked DISABLED for public display.**
> **Status: `BACKEND CONFIRMED` (written path) · `BACKEND IMPLEMENTATION REQUIRED` (video path) ·
> and simultaneously `LEGAL REVIEW PENDING`.**
>
> *Export v2 confirmed more of the mechanism than v1 did and changed nothing here.*

It may not appear on the public website in copy, in a FAQ, in a pricing footnote or in a tooltip,
until it is **organisationally and legally cleared**. This is the owner's own instruction and this
document continues to enforce it.

**This is the clearest case in the entire project of the governing rule: a technical confirmation
does not lift a legal hold.** The backend now demonstrably implements the mechanism correctly,
including the manual gate the owner specified. None of that touches L-13 (incentivised testimonials
under EU unfair-commercial-practices rules), the personal-data question raised by video, or the
contract-terms question. Those are decided by counsel, not by an endpoint.

**Permitted meanwhile:** the mechanism may be specified and built as an **authenticated product
surface** behind login, once the privacy policy closes (L-14 / C-22) and the CTA lockdown is
released for it. **Forbidden:** any appearance in public marketing.

### 18.4 Why it needs legal clearance before it is published

Recorded so the legal review has a starting point, not as legal advice:

1. **Consideration for a testimonial.** Offering something of value in exchange for a review or
   reference engages EU unfair-commercial-practices rules on incentivised reviews. Undisclosed
   incentivised testimonials are treated as misleading in several EU regimes.
2. **The word "honest".** A published requirement that feedback be "honest" while it is also the
   condition for a benefit is a contradiction that reviewers and regulators notice. Manual approval
   by the beneficiary of the review sharpens this.
3. **Video containing identifiable persons** is personal data, and possibly biometric-adjacent
   depending on use. Consent, purpose limitation, retention and any later marketing use of the
   video are separate questions requiring separate consents.
4. **Contract terms.** A conditional service extension is a contractual term and must appear in
   terms and conditions, not only in marketing copy.
5. **Manual review capacity.** `pending review` with no committed decision window is an
   organisational commitment the owner must be able to meet.

### 18.5 Non-negotiable implementation constraints, if it is ever published

- The submission form must **never** display success wording implying the extension is granted.
  Only: *received, pending review*. `INTEGRATION_CONTRACT.md` §10 already flags that granted and
  requested must not be conflated.
- No automatic grant on upload, under any circumstances.
- The decision criteria and the review window must be stated.
- Where the request happens — website or product app — is an open owner decision. If it is inside
  the app, it is outside this website project's scope entirely.

---

## 19. Legal areas requiring confirmation before publication

**None of the following is legal advice.** Each is an area where the website would make a public
statement that this instance cannot verify. Each requires confirmation by a qualified adviser or an
explicit, recorded owner decision to accept the risk.

| # | Area | Why it blocks a claim | Affects |
|---|---|---|---|
| L-01 | **Timing and lawful basis for follow-up** | Automated commercial follow-up after an enquiry engages GDPR lawful basis and ePrivacy/LSSI-CE rules on unsolicited commercial communication. | §7 |
| L-02 | **Reactivation of older contacts** | Adds a staleness question and, where the channel changes, a channel-consent question. Highest-risk single capability. | §7 (E4) |
| L-03 | **Image storage** | Retention, purpose limitation, and possible special-category content in customer-supplied photos. | §4 (B8), §10 (G7) |
| L-04 | **Document storage** | Property documents routinely contain third-party personal data. | §4 (B9), §10 (G7) |
| L-05 | **Audio and conversation-content storage** | Voice notes and any call recording/transcription. Call recording in Spain requires notification and a lawful basis. | §4 (B10), §9 |
| L-06 | **Retention periods** | No retention period is defined anywhere. The current privacy policy says only *"as long as needed"*. | All |
| L-07 | **Consents** | Which consents are collected, by whom (agency or NuovaSolution), when, and how they are evidenced. Controller/processor roles between NuovaSolution and each agency are undefined. | All |
| L-08 | **Cross-channel communication** | Moving a contact between email, WhatsApp and voice is a consent question per channel, and a WhatsApp Business Platform policy question. | §4, §5, §7 |
| L-09 | **Automated profiling (lead scoring)** | Scoring natural persons is profiling under GDPR with transparency duties. | §6 |
| L-10 | **AI disclosure** | Whether customers are told they are interacting with AI. EU AI Act transparency obligations point toward disclosure, particularly for voice. | §4, §9 |
| L-11 | **Team performance visibility** | Employee monitoring in Spain engages works-council information duties and data-protection obligations. | §11 (I7) |
| L-12 | **Property measurement display** | Consumer-protection and Andalusian property-information rules. | §13 (K5) |
| L-13 | **Incentivised testimonial mechanism** | Unfair-commercial-practices rules on incentivised reviews. | §18 |
| L-14 | **Website privacy policy is materially incomplete — and the gap grew on 2026-08-31** | The current policy states consent-only basis, "reply to your inquiry", no retention period, no AI processing, no automated decision-making, no image/document/audio storage, no third-country transfers, no sub-processors. **The confirmed integration adds all of the following as new processing:** account creation, password handling, JWT sessions, agency and team personal data, uploaded branding assets, provider OAuth tokens held server-side, testimonial consent and content, and a payment handoff. The policy is now materially further from adequate than when L-14 was written. | Site-wide, **launch-blocking**. **No authenticated surface may ship to a public URL before this closes.** |

> **Reconciliation note, 2026-08-31.** Every legal dependency L-01 to L-14 is **unchanged** by the
> backend handoff, except L-14 which is **enlarged**. The handoff is a technical document; it makes
> no legal assertion and clears no legal hold. Where a capability is now `BACKEND CONFIRMED` and also
> `LEGAL REVIEW PENDING`, **the legal hold governs.**

### 19.1 Approved cautious formulations

The owner has approved these hedges. They are the **only** approved qualifiers, and each must be
attached to the specific claim it qualifies rather than buried in a footer:

- *Where permitted.*
- *Based on agency permissions and configuration.*
- *Subject to applicable communication rules.*
- *With configurable customer handling and human oversight.*
- *Availability depends on channel configuration.*

**A qualifier is not a licence.** It narrows a claim; it does not make an unverified claim safe.
Categories 6 and 7 are not rescued by hedging.

### 19.2 Never claimed

**Guaranteed legal compliance, in any wording, in any language.** Specifically forbidden:
"GDPR compliant", "fully compliant", "legally safe", "certified", "ISO", "SOC 2", "guaranteed",
"100% secure", or any compliance badge or seal. This is absolute.

---

## 20. CTA truth audit

*Reconciled 2026-08-31.*

| CTA | Target system | Status | Verdict |
|---|---|---|---|
| **Start your 14 day free trial** | **Signup contract confirmed** (§18.0) | `BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` · **§14.3 CTA lockdown applies** | **Both objections are withdrawn: the trial exists and it is free with no payment method.** This becomes the **primary CTA once the website signup surface exists**. It may not ship until the owner releases the CTA individually under §14.3, because a primary CTA must have a destination. |
| **Book a demo** | An **existing external scheduling tool** | Working external option · defect A-02 open | **The interim primary CTA, and optional thereafter.** The anchor must carry the real booking URL with the embed as progressive enhancement. **The demo booking endpoint is `PROPOSED`, not backend-defined — it must not be created, typed as real, or wired.** Demo booking is **never a prerequisite to starting a trial**, and after integration it steps down to a secondary path. |
| **Experience Nuova** | Undecided: simulation or real backend | `OWNER DECISION PENDING` | **Placeholder ready.** Ships only as a labelled simulation (§16) until the owner decides. |
| **Talk to Nuova** | Undefined | **`BLOCKED`, retired** | The label has no defined behaviour and is withdrawn from the project. It must not be used at all. |
| **Chat with Nuova** | No chat backend. Website concierge endpoint is reserved. | **`RESERVED`** | A designed pending panel offering *Book a demo*, or omission. **A launcher that accepts input and never answers is a P0 violation.** |
| **Log in** | **Auth confirmed** (§15.0); destination is a **website decision** | `BACKEND CONFIRMED` · destination `PROPOSED`, website-owned | **Both earlier objections are withdrawn.** Authentication is real, and the destination is no longer a backend gap — the backend supplies the readiness signal and does not own a route. The nav item renders once the website commits to the route and the owner releases it. R7 still forbids inventing a URL, so the route must be a decision on record, not a guess. |
| **WhatsApp** *(NuovaSolution's own number)* | No number exists anywhere | **`BLOCKED`** | Unchanged. The handoff confirms the **agency** connecting its own WhatsApp channel; it says nothing about a NuovaSolution business number. R7 forbids inventing one. |
| **Website voice / WhatsApp sales concierge** | Reserved endpoint, no backend | **`RESERVED`** | Visual preparation permitted. Any live behaviour, availability implication or present-tense wording is forbidden. |

**Position after the v2 reconciliation.** Two conversion paths have a confirmed backend contract and
**both are now unblocked in substance**: the trial is free and needs no payment method, and login has
authentication plus a website-owned destination. What remains for each is **execution and a §14.3
release**, not a missing fact. *Book a demo* remains the only path working today, through an external
scheduling tool rather than a product system, and it is explicitly **optional** rather than a
prerequisite.

**The trial-led hierarchy is therefore scheduled, not blocked.** *Start your 14 day free trial*
becomes primary the moment the signup surface exists and is released.

---

## 21. Consolidated conflicts raised by this document

| ID | Conflict | Needs |
|---|---|---|
| **PT-C1** | `CLAUDE.md` positioning and visual direction contradict the redesign brief | Owner: update `CLAUDE.md` (confirms C-07) |
| **PT-C5** | Voice: brief says capability, `/v2` draft says "soon", integration contract unanswered, no active component | **Owner: is voice live today?** |
| ~~**PT-C6**~~ | ~~Governance §11 mandates the trial as primary CTA; no trial product is confirmed~~ | **CLOSED 2026-08-31.** The trial exists, is **free**, and requires **no payment method at signup**. The trial-led hierarchy is implementable once the signup surface exists and the CTA is released. |
| **PT-C7** | Named integrations appear in draft copy and live copy | **Split, 2026-08-31.** **CRM vendors:** the evidentiary objection is answered; naming is now `OWNER DECISION PENDING`, logos stay `BLOCKED`. **Portals:** `REJECTED`, unchanged, because the handoff names none. |
| ~~**PT-C12**~~ | ~~The website does not know where the product ends after onboarding step 10~~ | **DE-ESCALATED 2026-08-31.** No longer a backend gap. The backend supplies the readiness signal and does not own a route; the destination is a **website and owner decision** with a recommended target. |
| ~~**PT-C13**~~ | ~~§14 forbids the staging calls the handoff assumes~~ | **RESOLVED IN PRINCIPLE.** Export v2 fixes that the website BFF may later test **only against an explicitly approved staging target, with production calls never permitted**. One ratifying line in `MASTER_GOVERNANCE.md` §14, by its owning chat, makes it operative. Until then no call is made. |
| ~~**PT-C14**~~ | ~~Hot lead alerting is mandated by `CLAUDE.md` and absent from every source~~ | **CLOSED as a blocker, 2026-08-31.** It is **`OUT OF SCOPE` for the website**, not a missing contract. See §12.9. |
| **PT-C15** | There is no pricing, currency or tax authority anywhere | **New and binding.** No amount may be published from any source. A figures-based pricing page is unbuildable. Currency, tax and IVA are `LEGAL REVIEW PENDING` + `OWNER DECISION PENDING`. See §17.1. |
| **PT-C16** | The testimonial video path has no storage pipeline | **`BACKEND IMPLEMENTATION REQUIRED`** and `LEGAL REVIEW PENDING`. A media reference string exists; upload and storage do not. **Do not fake a video upload field.** |
| **PT-C8** | Live site publishes a 1–100 score scale and an 80 threshold sourced from the website's own simulation | Owner: confirm the product's real scale, or drop it |
| **PT-C9** | Live site publishes "Start for free" routing to a demo booking, and "No setup needed" for a platform requiring configuration | Owner: acknowledge; must not be carried over |
| **PT-C10** | `/live-demo` presents deterministic client-side logic as live AI, with no disclosure | Owner + implementation: P0, remediate |
| **PT-C11** | Privacy policy cannot support the platform the redesign describes | **Legal: rewrite before launch** |

---

## 22. Summary for the copy, design and implementation instances

*Revised 2026-08-31 after the backend handoff.*

**What you may build on now**

- The positioning: an AI Operating and Growth Platform for real estate agencies (§2).
- The full capability architecture in §3–§15 as *structure*.
- Category 3 claims (configuration-dependent). These are safe with their qualifier, because the
  qualifier is the honest description.
- **The confirmed product spine, new on 2026-08-31:** signup, login, logout, JWT sessions, the
  14-day trial and its status, the ten-step onboarding wizard with progress and resume, agency
  details, branding assets, team and four roles, CRM selection with Nuova CRM as the default,
  property source including agency website inventory, Property Experience entitlement and entry,
  readiness, entitlements as technically enforced, plans, subscription state and checkout handoff.
  These may be **specified and designed against real contracts**.
- The confirmed package baseline (§17.2) and the three-package structure, presented by
  **`display_name` and `entitlements_summary` only, with no figure of any kind**.
- **The free 14-day trial with no payment method required** (§18.1), and the trial-led CTA hierarchy
  as a scheduled outcome once the signup surface exists.
- The wizard as a **non-linear** set of independently evaluated steps (§15.1), with real error copy
  written per code, real upload constraints, and `{ en, es }` locale routes.
- *Book a demo* as the interim primary CTA and the permanent optional path, through an existing
  external scheduling tool.

**What you may not build on**

- Any present-tense "we do this today" capability claim without the §19.1 qualifier. **Nothing is in
  Category 1**, and `BACKEND CONFIRMED` is not a licence to advertise.
- Any claim that a confirmed contract means a working website feature. Every surface is
  `WEBSITE INTEGRATION PENDING` and `END TO END VERIFICATION PENDING`.
- Voice AI as a live capability (§9). The confirmed **connection** surface does not evidence it, and
  no carrier or vendor name is ever rendered.
- **Any amount, currency, tax, VAT or IVA statement (§17.1).** No authority exists. This is the
  single largest change in this wave, and it tightened rather than loosened.
- The trial extension mechanism in public copy (§18.3), despite its backend confirmation. The video
  path additionally has no storage pipeline.
- **Any hot lead marketing claim** (§12.9). Out of scope is a build decision, not a claim clearance.
- Any language count, including the certified AI runtime figure (§4.6).
- Any other number the website authors: limit, quota, score scale, response time, percentage, count,
  spend, ROI (§12.6, §17.5).
- Any named portal integration, and any vendor logo (§8, §10.6). CRM vendor **names** are cleared for
  the authenticated product only; public marketing naming awaits the owner.
- Any blocked or reserved CTA (§20), and any CTA at all without a §14.3 per-action release.
- Reactivation and advanced follow-up, until legal confirmation (§7, §19).

**The structural recommendation is reinforced, not replaced.** Capability status must be a *content
property*, not hard-coded prose. Wave A1 moved roughly two dozen capabilities in a single day without
a line of website code changing. More will move as export-v2 and the owner's decisions arrive. A site
whose claims can be re-qualified without a rebuild is worth considerably more than one where every
hedge is baked into a paragraph.

**The one structural recommendation this document makes:** design the site so that a capability's
status is a *content property*, not hard-coded prose. Categories will move as the owner supplies
evidence, and several will move soon. A site whose claims can be re-qualified without a rebuild is
worth considerably more than one where every hedge is baked into a paragraph.

---

**Product truth and claims matrix completed for use by copy, design and implementation. No
production readiness claim made.**
