# IMPLEMENTATION STATUS — NuovaSolution Website Enterprise Redesign

> ## ⚠ STATE 2026-09-21 — corrected current state. §1 below is HISTORICAL (2026-09-01)
>
> Added by the Website Copy / Product Truth / Director lane under the owner's instruction of
> 2026-09-21 (C5) so that no stale header is read as current. The Implementer's own build record
> is `WEBSITE_REBUILD_STATUS.md` and remains theirs. This block states the current state; it does
> not certify any of it.
>
> | | State on 2026-09-21 | Source |
> |---|---|---|
> | Branch | `website_enterprise_redesign`, HEAD `f4416fe`, **never pushed**; push to the private remote is an open owner decision | `git log`; dispatch PROMPT_10 |
> | Application code | **Rebuilt** in `8e782f9`: 62 statically generated pages from 21 route templates in `/en` and `/es`, 11 BFF routes, stub mode by default. §1 "Pages rebuilt: None" and "Application code changed: None" are **no longer true** | `WEBSITE_REBUILD_STATUS.md` |
> | Work in progress | The Implementer is working in the tree now (uncommitted changes under `lib/contracts/`) | `git status` 2026-09-21 |
> | Integration mode | **Stub** everywhere. Staging code path exists behind a three variable gate and has never been exercised. No production code path | `lib/contracts/mode.ts` |
> | Staging handoff | `governance/WEBSITE_HANDOFF_v1.md` **not delivered** (API) | dispatch PROMPT_01 A5 |
> | Independent website review | **Not delivered.** `REVIEW_2026-09-21.md` does not exist yet | file absent 2026-09-21 |
> | Public deployment state | **UNKNOWN.** Not read by any lane in this repository. Only the Reviewer's `WEBSITE_DEPLOYED_READOUT` may state it. "Website paused" is not evidence | dispatch PROMPT_09 R2 |
> | Live, in this document's vocabulary | **Nothing.** No page is recorded as live until the Reviewer's readout and acceptance exist | owner instruction C5 |
> | Claims on the built pages | 106 statements registered; corrections pending (hot lead alerts, property matching, native CRM plus Sheets, trial extension, Spanish Daily Assistant availability, voice language count, social progress figure) | `WEBSITE_CLAIM_REGISTER_v1.md` |
> | Product CTAs | All still under the §14.3 lockdown; activation register empty | `INTEGRATION_CONTRACT.md` |
> | Legal routes | Four PLACEHOLDER routes; counsel package prepared | `CONNECT_NOTICE_DRAFT_v1.md` §C |
>
> Sections §4 to §9 below describe the gate model of 2026-09-01 and remain useful as history. The
> open decisions they list are superseded by `CLAIMS_MATRIX.md` §21 (as annotated) and the register
> §4.

**Branch:** `website_enterprise_redesign` (forked from `main` @ `9943660`)
**Maintained by:** Master Website Director (implementation instance)
**Last updated:** 2026-09-01 — Wave V4 (Governance and Contract v2 Update)
**Governance:** `MASTER_GOVERNANCE.md`

> **Reporting rule (R2).** No entry in this file may say done, finished, complete, ready,
> production ready, bug-free or tested and working. **`LIVE` and `PRODUCTION READY` are
> removed from the project vocabulary** (§16). The only permitted completion wording is
> **"Implemented and awaiting independent technical and final audit."**

---

## 1. Current state

| | |
|---|---|
| Branch | `website_enterprise_redesign`. Created non-destructively; owner's working-tree changes preserved throughout. |
| **Application code changed** | **None.** No file under `app/`, `components/`, `lib/`, `translations/` or `public/`, and no build configuration file, has been modified on this branch. |
| Documentation produced | Twelve documents under `docs/website_redesign/`, plus four backend exports |
| Technical authority | **export-v2 + AF addendum.** export-v1 is HISTORICAL. |
| Document gate | **4 of 4 present**, plus the canonical technical handoff |
| Pages rebuilt | **None** |
| API routes | **None.** `app/api/` does not exist. |
| Network calls | **None.** No `fetch`, no client, no environment plumbing anywhere in application source. |
| Push / merge / deployment | **None.** All require explicit per-occasion owner approval (§15). |
| Product system contact | **None, and none permitted** (§14.1). **Production untouched, permanently.** |
| **Staging** | **Ratified in principle (§14.5). No target is approved. No call has been made or may be made today.** |
| Product CTAs | **All locked.** Disabled or clearly marked placeholders until individually released (§14.3). |
| Activation register | **Empty.** |
| End-to-end verification | **`END TO END VERIFICATION PENDING` on every surface.** Now **reachable in principle** under §14.5; not closed. |
| **Repository hygiene** | **Not performed. A hard precondition for any secret or server-boundary configuration** (§14.6). |

---

## 2. Authority ranking in force

Rank 1 corrected 2026-09-01 in `MASTER_GOVERNANCE.md` §3:

| # | Document |
|---|---|
| **1a** | `backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2.md` — **technical authority, supersedes v1 entirely** |
| **1b** | `backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2_AF_ADDENDUM_v1.md` — technical authority for AF-01, AF-04, AF-07 only |
| — | `WEBSITE_INTEGRATION_HANDOFF_EXPORT_v1.md` — **HISTORICAL. No status is derived from it.** |
| — | `WEBSITE_UX_AF_REQUIREMENTS_EXPORT_v1.md` — **not** a technical authority; it states what was asked, not what is true |
| 2 | `CLAIMS_MATRIX.md` — public claims |
| 3 | `PRODUCT_TRUTH.md` — confirmed product scope |
| 4 | `COPY_AND_CONVERSION_MASTER.md` — copy foundation |
| 5 | `LUXURY_UX_MEDIA_SYSTEM.md` and the authenticated surface system — visual authority |
| 6 | `FINAL_RECONCILIATION_REPORT.md` — conflict decisions. **Its §0V outranks its own §§0 to 11.** |

**No implementation chat may override this ranking.** `MASTER_GOVERNANCE.md` retains authority
over process, severity, release and access. §14 and §15 remain in force; §14.5 adds one narrow,
owner-ratified exception and relaxes nothing else.

---

## 3. Owner ratifications adopted

Thirteen decisions ratified 2026-09-01 and written into `MASTER_GOVERNANCE.md` §19. Each is
fixed and is not reopened.

| # | Decision | Effect here |
|---|---|---|
| 1 | The BFF may later test **exclusively against an explicitly configured staging target** | C-14 resolved. End-to-end verification becomes reachable |
| 2 | **Production calls remain forbidden** | No approval procedure exists for one |
| 3 | Staging and production **config-driven separated** | §17.5 |
| 4 | **Start Trial becomes primary CTA after successful integration** | Ladder A scheduled, not blocked |
| 5 | **The trial is 14 days free** | C-08 closed |
| 6 | **No payment method required at signup** | C-08 closed |
| 7 | **Book a demo stays optional** | Unchanged, reinforced |
| 8 | **No phone call is a prerequisite for the trial** | Unchanged, now demonstrably true |
| 9 | **Locale routes are `/en` and `/es`** | Half of the locale decision closed; route naming open |
| 10 | **`/{locale}/app` documented as the provisional website-owned destination** after onboarding, until the product scope is finally confirmed | C-27 de-escalated. AD-01 |
| 11 | The handoffs **may be versioned after a successful hygiene and secrets check** | C-13 sequenced |
| 12 | **Repository hygiene is mandatory before any secret or BFF configuration** | §14.6 |
| 13 | **`CLAUDE.md` may be updated later, under control.** The old mandatory hot-lead mandate **must not be carried into the new website** | §18.3, §18.4 |

**A ratification settles a decision. It never releases a control.** That is §14.3, and the
activation register is still empty.

---

## 4. Gate status by area

Gate categories are defined in `MASTER_GOVERNANCE.md` §5.2.

### 4.1 Complete (G1)

Governance, the codebase audit, the integration contract and this file — each **implemented
and awaiting independent technical and final audit**. Nothing else. **No application code
exists.**

### 4.2 Documented (G2)

The full technical contract under export-v2 and its addendum; public claim clearance; product
scope; copy foundation; the visual system including the authenticated tree; conflict
decisions; every interactive action with its five UI states; the legacy risk register.

### 4.3 Integrable now (G3)

Buildable against a written contract, without executing anything:

- Typed request and response shapes for the confirmed surfaces, **including the new office
  list** and **excluding the proposed demo-booking endpoint**, which must not be typed as real.
- The **full error enumeration**, keyed to stable codes rather than HTTP statuses.
- The **exact wizard projection shape**, including the needs-action count and the five-key
  legend.
- The **shared OAuth callback route** and its four-outcome classification.
- The **branding preview shape**, and branding upload validation against real limits.
- Locale routing on `/en` and `/es`.
- Design tokens, self-hosted fonts, the motion primitive, the global shell, and public
  marketing pages composed from cleared copy.
- **A typed client that declares no price field**, because none exists (§6 of the contract).

> **Precondition (§14.6):** repository hygiene is closed **before** any environment variable,
> server-boundary configuration or staging target is introduced. That is a separate wave that
> runs alone.

### 4.4 Waiting on copy (G4)

Cleared wording is still owed for: the trial phrases specifically ("free", "no credit card
required" and their variants each need their own clearance, even though the underlying facts
are now confirmed); signup, login, logout and session-expired states; the ten step titles and
the eight status labels in both languages; the resume prompt; per-provider externally-pending
notes, which can now **name the party** for email, WhatsApp and calendar; degraded and
action-required explanations; the cancellation state, which must read as neutral and
resumable; trial countdown and expiry copy; branding upload validation copy carrying the real
limits; captcha copy.

### 4.5 Waiting on UX specification (G5)

Substantially reduced by export-v2. What remains is genuine design work rather than blocked
unknowns: the wizard shell composed as a hairline index rather than a card grid; the eight
status values as visual specifications; the file-upload law for the two branding kinds; the
OAuth return states including the neutral cancellation treatment; mobile onboarding at 375 px.

**Two premises are void rather than pending:** the third branding upload block (footer and
signature are text) and any public price table (no price exists).

### 4.6 Waiting on backend missing fields (G6)

**Three, down from twelve.**

| ID | Classification |
|---|---|
| **MF-01** testimonial media pipeline | `BACKEND IMPLEMENTATION REQUIRED` · `LEGAL REVIEW PENDING` |
| **MF-08** captcha provider | `OWNER DECISION PENDING` |
| **MF-10** currency, tax basis, IVA | `OWNER DECISION PENDING` · `LEGAL REVIEW PENDING` — **and there is no backend pricing authority at all** |

Closed or reclassified: MF-02 out of scope, MF-03 de-escalated to a website decision, and
MF-04, MF-05, MF-06, MF-07, MF-09, MF-11, MF-12 all confirmed. **AF-01, AF-04 and AF-07 are
closed**; AF-01 leaves a non-blocking backend hardening item.

### 4.7 Waiting on legal review (G7)

**No chat may clear a legal hold.** A counsel track, launch-blocking, unchanged by export-v2.

The **privacy policy** remains first and largest. The current policy covers replying to an
inquiry on a consent-only basis with no retention period. The confirmed integration adds
account creation, password handling, session tokens, agency and team personal data, uploaded
branding assets, provider tokens held server-side, testimonial consent and a payment handoff.
**No authenticated surface may be publicly reachable before this closes.**

Also held: incentivised testimonials and the extension; testimonial media as personal data;
currency and tax treatment; follow-up timing and lawful basis; reactivation of older contacts;
image, document and audio storage; automated profiling disclosure; team performance
visibility; property measurement sourcing.

### 4.8 Waiting on owner decisions (G8)

See §6. The list shrank from thirteen to seven.

---

## 5. Conflict register

### 5.1 Status after export-v2

| ID | Subject | Status |
|---|---|---|
| C-01 | Does a 14 day trial exist? | **CLOSED.** It exists, it is 14 days, and it is free |
| C-02 | Experience Nuova: simulation as product | **CARRIED.** Nothing in v2. Disclosure wording is an owner decision |
| C-03 | Does a customer application exist, and where? | **CLOSED.** Auth confirmed; destination provisionally decided as `/{locale}/app` |
| C-04 | "Talk to Nuova" undefined | **CLOSED by withdrawal.** Label retired |
| C-05 | The business WhatsApp number | **CARRIED.** v2 names no NuovaSolution number. The public CTA does not ship |
| C-06 | Do packages and prices exist? | **CLOSED, and reversed.** Packages exist. **Prices do not exist anywhere** |
| C-07 | `CLAUDE.md` contradicts the redesign | **RESOLVED IN PRINCIPLE.** Update ratified as a later controlled action; the hot-lead mandate is settled as not carried over |
| **C-08** | Trial exists; "free" unconfirmed | **CLOSED.** Free and no payment method, both confirmed |
| C-09 | Testimonial confirmed but legally held | **UNCHANGED.** A backend confirmation does not lift a legal hold |
| **C-10** | No testimonial media field | **RECLASSIFIED.** A string reference exists; no upload pipeline. `BACKEND IMPLEMENTATION REQUIRED` |
| C-11 | CRM vendor names | **PARTIALLY CLOSED.** Text-only cleared for the **authenticated tree**. Public marketing and all logos remain open |
| C-12 | Named portals rejected | **UNCHANGED.** v2 names no portal |
| **C-13** | The handoff is untracked | **OPEN, and larger:** three of four backend files are untracked, including the current technical authority. Versioning is now ratified, sequenced after hygiene |
| **C-14** | §14 versus staging | **RESOLVED.** Owner-ratified and written as `MASTER_GOVERNANCE.md` §14.5, narrowly: staging only, per-target approval, production permanently excluded |
| C-15 | The CTA lockdown | **UNCHANGED.** The register is still empty. Fixing the CTA hierarchy is not a per-action release |
| C-16 | Voice: three things conflated | **UNCHANGED, and reinforced.** Voice must stay generically named because carrier identity is internal |
| C-17 | WhatsApp: agency channel versus own number | **UNCHANGED.** C-05 stays open |
| C-18 | Demo booking | **UNCHANGED.** Still proposed. Optional, never a trial prerequisite |
| C-19 | Entitlement enforcement technical | **UNCHANGED, confirmed** |
| C-20 | Roles confirmed | **UNCHANGED, confirmed** |
| **C-21** | Hot lead alerting | **CLOSED BY SCOPE.** Out of scope for the website. It was never a blocker; recording it as one was wrong |
| C-22 | Privacy policy | **UNCHANGED, launch blocking.** v2 reduces it in no way |
| C-23 | Credential recorded closed but still present | **UNCHANGED.** Untouched by v2 |
| C-24 | Dashes in approved wording | **UNCHANGED.** A copy-side rule |
| C-25 | This file stale | **CLOSED** |
| **C-27** | The website does not know where the product ends | **DE-ESCALATED to AD-01.** Not a backend gap; a website decision, provisionally made |
| **RS-01** | Does signup auto-confirm the user? | **NEW, minor.** Affects one signup success path. Not blocking |
| **RS-02** | The certified AI runtime language count | **NEW.** A backend fact about the runtime. **Not** an authorisation to publish a language count |

### 5.2 AD-01 — the destination after onboarding

**Owner-ratified as provisional:** `/{locale}/app`.

This closed correctly, because the backend never owned the route. It owns the **signal**;
the **destination is a website decision**.

- **Settled:** the onboarding exit, the login destination and the authenticated route tree.
- **Not settled:** how much of the product the website ultimately hosts. `/{locale}/app` is a
  placeholder destination under a website-owned route, **not** a decision to build the full
  authenticated application.
- **Provisional is load-bearing.** It is revisited when the product scope is confirmed, not
  inherited by default.

### 5.3 C-14 — resolved, and narrowly

Written as `MASTER_GOVERNANCE.md` §14.5. The terms that matter:

- **Staging only, and only an explicitly configured target.**
- **Per-target written approval.** The clause's existence is not the approval, and approval
  for one target is not approval for another.
- **Production permanently excluded.** No approval procedure exists for a production call and
  none may be requested.
- **Hygiene first** (§14.6).
- The call originates from the website's own server boundary — never a browser, never a chat
  session, never a tool acting directly against a backend.

**Present state: no target approved, no call made or permitted today.** §14 is relaxed in no
other respect.

---

## 6. Owner decisions outstanding

Reduced from thirteen to seven by the ratifications in §3.

| # | Decision | Unblocks | Severity |
|---|---|---|---|
| 1 | **Route the legal dependencies to counsel**, with the enlarged privacy policy first | Site-wide launch | **P0** (C-22) |
| 2 | **Approve a specific staging target**, per §14.5.1, when a wave is ready to verify | Closing end-to-end verification | P1 (C-14) |
| 3 | **Clear the trial phrases** in the claims document — "free", "no credit card required" and variants. *The facts are confirmed; the sentences are not* | The primary CTA wording, and the switch to Ladder A | P1 |
| 4 | **May the four CRM vendors be named in public marketing?** Separately: trademark permission for any logo, anywhere | Platform and lead-intelligence pages | **P0 if acted on early** (C-11) |
| 5 | **Supply MF-01** — a testimonial media pipeline — or declare video out of scope | The video half of the testimonial surface | P1 |
| 6 | **Choose the captcha provider** (MF-08) | Signup and any public form | P1 |
| 7 | **Authorise the hygiene wave**, and confirm repository visibility | **Any environment variable, any BFF configuration, any staging target, and versioning the handoffs** | P1, and it gates §14.5 |

### 6.1 Closed by ratification

| Former decision | Outcome |
|---|---|
| Does §14 permit a staging call? | **Ratified.** §14.5, narrowly |
| Where does the product live after onboarding? | **Ratified provisionally.** `/{locale}/app` |
| Is the trial free, and is a payment method required? | **Answered by export-v2 and ratified.** Free; no payment method |
| Ratify the CTA ladder | **Ratified.** Start Trial primary after integration |
| Confirm the locale strategy | **Ratified.** `/en` and `/es`. Route naming beyond the locale segment remains open |
| Commit the backend handoffs? | **Ratified**, conditional on the hygiene and secrets check |
| Approve editing `CLAUDE.md` | **Ratified** as a later controlled action |
| Confirm the public plan names served by the plans endpoint | **Void as framed.** The endpoint serves a display name and an entitlements summary. **There is no price to reconcile** |

---

## 7. Repository hygiene preconditions

**Owner-ratified as mandatory (§14.6). Not performed by this wave.**

Binding order, no step skipped:

1. **Hygiene.** Untrack build output, build information, the retired tooling configuration and
   local developer settings. Extend the ignore rules. Register in `CURRENT_SITE_AUDIT.md` §19.
2. **The guard** that fails a build on a retired host or a secret-shaped literal, scoped to
   application source and build output, never to the documentation directory.
3. **Then, and only then:** any environment variable, any server-boundary configuration, any
   staging target, and versioning the backend exports.

**Why the order is not negotiable.** Build output is tracked. Introducing a secret-bearing
variable in that state is unsafe by construction: the next build that inlines a value commits
it. This is the one sequencing rule that cannot be reordered for convenience.

**The hygiene wave runs alone**, because untracking operates on the whole index and would
collide with any concurrent commit.

---

## 8. Findings carried from the audit

Full detail and the legacy risk register are in `CURRENT_SITE_AUDIT.md` §19.
**17 findings — 0 P0, 9 P1, 8 P2.** Unchanged in count by export-v2.

Two causes revised earlier remain revised: the required route tree is larger than first
recorded, and the absence of any submission path is no longer blocked by missing information
but by §14 plus the empty activation register.

---

## 9. What this project cannot deliver, and why

| Not deliverable | Reason |
|---|---|
| Any closed end-to-end verification | No staging target is approved yet, and hygiene must close first. **Reachable in principle** under §14.5 |
| Any production call, at any time | §14.5.2. There is no procedure for one |
| The authenticated tree behind a public URL | The privacy policy is launch-blocking (C-22) |
| A testimonial video surface | MF-01. **A video upload field must not be faked** |
| Any hot lead alerting surface or claim | **Out of scope.** Internal mechanism; no website surface required, and no cleared public wording |
| **Any price, currency, tax figure or IVA treatment** | **No pricing authority exists anywhere.** Not blocked on a decision — blocked on the absence of a source |
| A public price table | Same. The access-model presentation is the only one available |
| Any quota or feature-to-package mapping | Neither exists in any contract |
| Any named property portal integration | Not in export-v2. Rejected, unchanged |
| Any vendor logo, anywhere | Trademark permission, not evidence |
| Voice as a present-tense capability, or any carrier name | A plan-gated channel connection is not voice AI, and carrier identity is internal |
| A working chat, voice or WhatsApp concierge | Reserved. Do not implement |
| A demo booking backend | Proposed. The existing scheduler remains external |
| Product photography, video or captures | None exists, and fabricating any is a P0 violation |
| Clearance of any legal dependency | No chat may clear a legal hold |

---

## 10. Change log

| Date | Entry |
|---|---|
| 2026-08-30 | Branch created from `main` @ `9943660`. Owner's uncommitted changes preserved; no reset, no history rewrite. |
| 2026-08-30 | Phase 0 governance layer written. |
| 2026-08-30 | **Binding owner directive:** the product and automation project is near completion and must not be touched. §14 (isolation, CTA lockdown) and §15 (release and access discipline) added. |
| 2026-08-30 | Four source-of-truth documents delivered by independent instances. Backend export-v1 delivered. |
| 2026-08-31 | Reconciliation, compatibility matrix and integration plan delivered (rank 6). |
| 2026-08-31 | **Wave A4.** Authority ranking, eleven-value status vocabulary, integration boundaries, eight gate categories, two-ladder CTA model, three commit collisions recorded, legacy risk register added. |
| 2026-08-31 | Backend **export-v2** and its **AF addendum** delivered, both hash-verified by the reconciliation instance. Waves A1, A2 and A3 reconciled their documents against them. |
| **2026-09-01** | **Wave V4 — Governance and Contract v2 Update.** Rank 1 corrected: export-v2 supersedes v1 entirely; the AF addendum extends it for AF-01, AF-04 and AF-07; v1 is HISTORICAL; the UX requirements register is explicitly not a technical authority. **§14.5 staging clause added**, owner-ratified and narrow: staging only, per-target approval, production permanently excluded, hygiene first. **§14.6 hygiene precondition** and **§14.7 export versioning** added. **§19 owner ratification register** added with thirteen fixed decisions. §11 CTA hierarchy rewritten on confirmed facts: the trial is 14 days free with no payment method, Start Trial is the ratified primary after integration, Ladder B ships in the interim. **R6 corrected: there is no price authority and no price is displayed anywhere** — the previous "prices are served, never authored" is void. §17.1 extended: the wizard is not forced linear, progress is read never counted. **§17.6 added: nine further release-blocking invariants** covering price, polling, cancellation treatment, carrier naming, footer and signature as plain text, hot lead alerting, the opaque office handle, the correlation value, and the authenticated-tree-only provider clearance. §18.4 added: the old mandatory hot-lead mandate must not be carried into the new website. |
| **2026-09-01** | **`INTEGRATION_CONTRACT.md` rewritten against export-v2.** Fourteen superseded statements corrected explicitly. **Every price assumption removed**; the plans response carries a code, a display name and an entitlements summary, and no price field may be declared in any type. Six testimonial states adopted; testimonial media reclassified to `BACKEND IMPLEMENTATION REQUIRED` with an explicit prohibition on faking a video upload field. Hot lead alerting reclassified from blocked to **out of scope**. Footer and signature recorded as text fields; only the logo and the email banner are uploads, image-only, 5 MB. The new office list surface, the shared OAuth callback route with its four-outcome classification and the neutral cancellation treatment, the confirmed branding preview shape, the no-polling rule, the provider display names with voice generic, and the full error enumeration keyed to stable codes all added. Missing-field register reduced from twelve to three. AF-01 recorded as backend hardening and **not** a website launch blocker. Activation register still empty. |
| **2026-09-01** | **`CURRENT_SITE_AUDIT.md` amended** for the backend export tracking state and the hygiene sequencing. No cleanup performed. |
