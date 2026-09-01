# MASTER GOVERNANCE — NuovaSolution Website Enterprise Redesign

**Status:** Active
**Branch:** `website_enterprise_redesign`
**Owner:** Antonio Jesus (NuovaSolution)
**Implementation role:** Master Website Director / sole frontend implementation instance
**Created:** 2026-08-30
**Last amended:** 2026-09-01 — Wave V4 (Governance and Contract v2 Update), against
`backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2.md`, its AF addendum, and
`FINAL_RECONCILIATION_REPORT.md` §0V
**Previously amended:** 2026-08-31 — Wave A4, against export-v1 (now **HISTORICAL**)

This document is binding for every contributor, chat, agent and auditor working on the
NuovaSolution website redesign. It outranks convenience, speed and personal preference.
Where any other document in `docs/website_redesign/` conflicts with this one on *process,
severity, release or access*, this document wins.

On *technical truth*, *public claims*, *product scope*, *copy* and *visual system*, it does
not. See §3.

---

## 1. The ten binding rules

### R1 — No creator releases their own work
The instance that writes a page, component, animation, copy block or document may never be
the instance that declares it acceptable. Every deliverable requires review by an
independent auditing instance that did not author it.

### R2 — Nothing is "done" or verified without independent review
No feature, page, component or document may be described as finished, working, error-free,
complete or shipped before an independent technical audit has run against it.

The only permitted completion wording is:

> **Implemented and awaiting independent technical and final audit.**

This wording applies to commit messages, status updates, `IMPLEMENTATION_STATUS.md`
entries and any report to the owner.

**`LIVE` and `PRODUCTION READY` are removed from the project vocabulary** (§16). They may
not appear in any document, commit message, status line or report on this branch. Where a
capability genuinely works, the correct statement names *who confirmed it and from where* —
see the eleven status values in §16.

### R3 — Every public statement must clear CLAIMS_MATRIX.md
No headline, subheadline, feature name, bullet, tooltip, meta description, OG text, alt
text or microcopy may assert a capability, an outcome or an availability that is not
cleared for public use in `CLAIMS_MATRIX.md`, within the scope confirmed in
`PRODUCT_TRUTH.md`.

**A backend confirmation is not a publication licence.** A capability may be
`BACKEND CONFIRMED` under the handoff and still be `REJECTED`, `LEGAL REVIEW PENDING` or
`OWNER DECISION PENDING` for public display. That combination is the normal state of this
project, not a contradiction.

If a claim is needed and no cleared entry exists, the claim is not written. The gap is
logged as an open conflict (§4) and escalated to the owner.

### R4 — Copy comes from COPY_AND_CONVERSION_MASTER.md
Website text is not invented at implementation time. All customer-facing copy, English and
Spanish, is taken from `COPY_AND_CONVERSION_MASTER.md`.

Implementation may adjust line breaks, truncation and responsive text length. It may not
invent, rewrite or improve messaging. Missing copy blocks are logged, not filled in.

### R5 — Visual rules and page architecture come from LUXURY_UX_MEDIA_SYSTEM.md
Design tokens, type scale, grid, spacing rhythm, motion rules, media treatment, section
architecture and page composition are defined in `LUXURY_UX_MEDIA_SYSTEM.md` and, for
authenticated surfaces, in the authenticated surface system it governs. Ad-hoc visual
decisions during implementation are not permitted; deviations require a logged conflict and
owner approval.

### R6 — No invented customers, references, results, prices or statistics
Strictly forbidden anywhere on the site, in any language, in any state, including
placeholder, mockup, demo and screenshot content:

- fictional client names, agency names, brands or logos
- fictional testimonials, quotes or endorsements
- fictional case studies or success stories
- invented metrics, percentages, response times, ROI figures, conversion rates or counts
- invented prices, discounts, tiers, quotas or contract terms
- invented certifications, awards, partnerships or compliance badges

Demo and sample data must be visibly and honestly marked as illustrative.

**There is no price authority. No price is displayed, anywhere, from any source.**

> **Corrected 2026-09-01.** This rule previously read "prices are served, never authored",
> on the basis that the plans endpoint returned a display price. **That premise is void.**
> Export-v2 defines the plans response as `{ code, display_name, entitlements_summary }`,
> explicitly with no price, and states that the plan record carries **no price and no
> currency column**. There is **no backend pricing, currency or tax authority at all.**

Binding consequences:

- The website may display **plan names and entitlement summaries. It may not display a
  price**, because no price exists in any contract to render.
- No currency symbol, no figure, no "from", no range, no per-seat or per-month rate, and no
  visual implication of a price — no comparative column heights, no bars, no dots, no
  "up to".
- **Currency, tax basis and Spanish IVA are a missing authority, not a formatting question.**
  They remain an owner decision **and** a legal review item. Nothing about them is inferred.
- A public price table cannot be built. The access-model presentation is the only pricing
  presentation available until a pricing authority exists.

**Durations are rendered, never hardcoded.** The website never hardcodes a trial length and
never hardcodes an extension length. It renders the authoritative value returned by the
backend.

**Quotas and feature-to-package mappings are not authored either.** Neither exists in any
contract.

### R7 — Backend connections are prepared, never invented
The website may prepare integration points. It may not fabricate them.

Forbidden: inventing endpoints, URLs, webhook paths, payload fields, status values, secrets,
tokens, environment variable *values*, phone numbers, WhatsApp numbers or third-party
account identifiers.

Permitted: implementing exactly the contract written in the canonical handoff, defining a
typed client boundary against it, using an environment variable *name* documented in
`INTEGRATION_CONTRACT.md`, and rendering an honest UI state when the connection is absent.

Where the handoff does not specify a field, the gap is named as an **exact missing field**
in `IMPLEMENTATION_STATUS.md`, never filled in by inference.

### R8 — The legacy n8n Cloud connection is retired and must not be used
The n8n Cloud connection configured in this website repository is **obsolete**. It must not
be used, called, tested or referenced as a live target for anything, and it must not be
repaired or repointed. It is deleted, not migrated.

**No legacy n8n hardcoding may enter the new implementation.** No retired host, no webhook
path pattern, no n8n URL literal, and no inline key or token, in source or in build output.

The credential found in this repository is handled by the owner outside this project.
This project does not reproduce, echo, log, copy or quote that credential value in any
file, document, commit or message, and does not attempt to verify, use, rotate or clean it.

See §14 for the absolute isolation boundary around the product and automation project.

### R9 — No production release without the owner's personal approval
No merge into the production branch, no promotion of a deployment to production, no domain
change, no DNS change and no public announcement without explicit, personal, case-by-case
approval from the owner.

**Preview deployments are not exempt.** A preview is a deployment and requires the same
per-occasion approval. See §15.

### R10 — All P0 and P1 findings are fixed and independently re-audited
Audit findings are triaged P0/P1/P2/P3. P0 and P1 must be fixed and then re-verified by an
independent auditing instance, not by the instance that wrote the fix. A fix is not closed
by its author.

---

## 2. Severity definitions

| Level | Definition | Handling |
|---|---|---|
| **P0** | Legally, factually or security-critical. False public claim, a secret reaching the browser, a broken primary CTA, a dead-end conversion path, `externally_pending` rendered as complete, GDPR/LSSI-CE exposure, site-breaking failure. | Blocks everything. Fix immediately, re-audit independently. |
| **P1** | Materially damages trust, conversion or usability. Broken navigation, unreadable mobile layout, invisible content, missing language coverage, failing Core Web Vitals target, dead surface area. | Blocks release. Fix and re-audit independently. |
| **P2** | Quality and polish. Inconsistent spacing, weak hierarchy, suboptimal motion, minor copy friction. | Scheduled, tracked, not release-blocking on its own. |
| **P3** | Optional improvement or future idea. | Backlog. |

---

## 3. Authority ranking (BINDING)

> Adopted 2026-08-31. **Rank 1 corrected 2026-09-01** from `FINAL_RECONCILIATION_REPORT.md`
> §0V.1, on the arrival of export-v2 and its AF addendum. This ranking is fixed for the
> remainder of the project.

| # | Document | Authority over |
|---|---|---|
| **1a** | `backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2.md` | **Technical authority. Supersedes v1 entirely.** Endpoints, payload fields, status vocabulary, environment variable names, the auth model, staging and production routing, legacy removal. Nothing technical may be invented outside it. |
| **1b** | `backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2_AF_ADDENDUM_v1.md` | **Technical authority for AF-01, AF-04 and AF-07 only.** Extends 1a; does not modify it. |
| — | `backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v1.md` | **HISTORICAL.** Kept for reference. **No status may be derived from it, and nothing is implemented against it.** |
| — | `backend_handoff/WEBSITE_UX_AF_REQUIREMENTS_EXPORT_v1.md` | **Not a technical authority.** A website-authored requirement register: it states what was asked, never what is true. |
| **2** | `CLAIMS_MATRIX.md` | **Authority for public claims.** Which statement may be made, in which wording, with which qualifier. A backend confirmation never converts a `LEGAL REVIEW PENDING` or `REJECTED` verdict into an approved one. |
| **3** | `PRODUCT_TRUTH.md` | **Confirmed product scope.** What the product is and is not, and the qualification required per capability. |
| **4** | `COPY_AND_CONVERSION_MASTER.md` | **Copy foundation.** Must agree with ranks 1, 2 and 3. Within those limits it governs wording form and house style. |
| **5** | `LUXURY_UX_MEDIA_SYSTEM.md` | **Visual authority.** Tokens, type, grid, motion, media honesty, page architecture, and the authenticated surface system it governs. |
| **6** | `FINAL_RECONCILIATION_REPORT.md` | **Conflict decisions.** Records every conflict and its resolution or escalation. |
| **—** | `MASTER_GOVERNANCE.md` (this file) | **Process, severity, release and access discipline.** Not displaced by the handoff. §14 and §15 remain absolute. |
| **—** | `INTEGRATION_CONTRACT.md`, `IMPLEMENTATION_STATUS.md`, `CURRENT_SITE_AUDIT.md` | Derived records. They restate ranks 1 to 6; they never originate a technical fact, a claim, a price or a capability. |
| **—** | `CLAUDE.md` | **Stale on visual direction and positioning.** Superseded on those points. Not edited without owner approval. See §18. |

### 3.1 Rule 7 — no implementation chat may override this ranking

An implementation chat that believes the ranking produces a wrong result **logs a conflict
and stops on that item only**. It does not reorder the ranking, does not substitute its own
judgement for a higher-ranked document, and does not resolve the disagreement by proceeding.

### 3.2 How precedence works in practice

- On **what exists technically** → rank 1 wins.
- On **what may be said publicly** → rank 2 wins, always, over rank 1.
- On **product scope and required qualification** → rank 3.
- On **wording** → rank 4, inside the limits of ranks 1 to 3.
- On **visual and structural design** → rank 5.
- On **a recorded conflict decision** → rank 6.
- On **process, severity, release and access** → this document.

A capability that is technically confirmed and publicly unpublishable is correctly recorded
with **two statuses**, not one. See §16.

---

## 4. Conflict log procedure

When a contradiction, gap or missing decision is found:

1. Stop work on the affected element only. Continue everything else.
2. Record it in `IMPLEMENTATION_STATUS.md` under **Open conflicts** with: ID, date, the
   documents involved, the exact contradiction, the blocked scope, and the decision the
   owner needs to make.
3. Ship the surrounding work with an honest state (§6).
4. Never guess a product capability, a price, a number, a status value or an endpoint to
   unblock yourself. Where the gap is a field absent from the canonical handoff, name it as
   an exact missing field, not as a request for access.

---

## 5. Implementation gates

### 5.1 Gate 1 — document gate (CLOSED → OPEN)

Main pages may not be rebuilt before all four source-of-truth documents exist:

| Required document | Present |
|---|---|
| `PRODUCT_TRUTH.md` | Yes, 2026-08-30 |
| `CLAIMS_MATRIX.md` | Yes, 2026-08-30 |
| `COPY_AND_CONVERSION_MASTER.md` | Yes, 2026-08-30 |
| `LUXURY_UX_MEDIA_SYSTEM.md` | Yes, 2026-08-30 |

**Gate 1 status: 4 of 4 present.** The canonical technical handoff arrived separately on
2026-08-30 and is rank 1 under §3.

Gate 1 being satisfied does **not** authorise page implementation on its own. Gates 2 to 8
below are independent and are tracked per surface in `IMPLEMENTATION_STATUS.md`.

### 5.2 The eight gate categories

Every surface, page and capability is tracked against these categories. A surface is only
buildable when every category that applies to it is clear.

| Gate | Meaning | Cleared by |
|---|---|---|
| **G1 — Complete** | The work is implemented and awaiting independent audit. | The owning chat, then an independent auditor |
| **G2 — Documented** | A contract, spec or decision exists in writing. | Ranks 1 to 6 |
| **G3 — Integrable** | Nothing blocks building it now, against a written contract, without execution. | Ranks 1 and 5 |
| **G4 — Waiting on copy** | Cleared wording does not exist yet in EN and ES. | `COPY_AND_CONVERSION_MASTER.md` |
| **G5 — Waiting on UX specification** | The surface has no page architecture, state specification or mobile composition. | `LUXURY_UX_MEDIA_SYSTEM.md` and the authenticated surface system |
| **G6 — Waiting on backend missing fields** | A named field is absent from the canonical handoff. | A handoff export carrying that field |
| **G7 — Waiting on legal review** | A `CLAIMS_MATRIX.md` legal dependency is unresolved. | Counsel, via the owner. **No chat may clear a legal hold.** |
| **G8 — Waiting on owner decision** | A commercial, naming, scope or process decision. | The owner, in writing |

---

## 6. Honest states rule

No button, link, tab or form on the site may lead nowhere.

Where a target system does not exist, is not released, or is not permitted to be called,
the control must present a designed, premium, truthful state, with a real path for the
visitor. Silent failure, a dead `href="#"`, a fake success message, a fake loading spinner
that resolves to nothing, and a disabled control with no explanation are all **P0**
violations.

Approved honest states:

- **`Connection pending`** — the capability is contract-confirmed but not released or not
  wired. Offers the working fallback.
- **`Request access`** — the capability is gated. Opens a real request path, and only exists
  once that path resolves to something real.
- **`Book a demo`** — the working fallback, because it is an existing external scheduling
  option outside the product boundary.

A disabled control must always state *why* it is disabled, in one short line, in the active
language.

Every interactive action must have an entry in `INTEGRATION_CONTRACT.md` covering: target
system, status, required inputs, loading state, success state, error state, disabled state,
analytics event, and missing information.

### 6.1 `externally_pending` is never rendered as complete

Where the backend reports that an action is accepted but waiting on an external provider,
the interface says so. It never shows a check, never shows completion, never counts toward
a completed total. This is a **release-blocking invariant**, not a styling preference.

---

## 7. Phase gate — verification after every phase

Each implementation phase closes only after all of the following have been executed and
recorded in `IMPLEMENTATION_STATUS.md`:

1. Production build executed
2. Type check executed
3. Lint executed (where configured)
4. All links and navigation paths verified — no dead ends
5. Desktop verified
6. Mobile verified separately, not as a scaled desktop check
7. Dead-surface check — no unintentional gaps or empty regions without purpose
8. Media state check — poster, loading, error, fallback, reduced motion
9. `IMPLEMENTATION_STATUS.md` updated with evidence and the R2 wording

A phase that has not passed all nine steps is not closed, regardless of how finished the
result looks.

---

## 8. Performance budget (binding)

| Metric | Target | Scope |
|---|---|---|
| Largest Contentful Paint | ≤ 2.5 s | Desktop and mobile, measured separately |
| Interaction to Next Paint | ≤ 200 ms | Once real field or lab data is available |
| Cumulative Layout Shift | ≤ 0.1 | Desktop and mobile, measured separately |

Enforcement rules:

- All images and videos declare reserved dimensions or fixed aspect ratios.
- Media below the fold loads on demand.
- Video never autoplays with sound.
- Animation uses `transform` and `opacity` only.
- `prefers-reduced-motion` is respected everywhere.
- Content is visible without animation; animation may not gate readability.
- Fonts are self-hosted and preloaded; no render-blocking third-party CSS.
- JavaScript payload is kept minimal; client components are the exception, not the rule.
- Any surface rendering backend state reserves its height so arriving data cannot shift the
  page.

A missed budget on a shipped page is a P1 finding.

---

## 9. Design prohibitions (binding)

The site must never read as generated output. Forbidden as default patterns:

1. Endless rows of identical rounded cards
2. Bento grids as a default layout device
3. Glassmorphism
4. Generic purple or blue "AI" gradients
5. Robots, brains, digital spheres, glowing networks
6. Small floating cards used as a hero
7. Icon + headline + two sentences repeated as the site's only rhythm
8. Generic stock photography of smiling agents
9. Random alternation between centered and left-aligned headings
10. Different headers on different pages
11. Different type sizes for the same hierarchy level
12. Content left invisible because of animation
13. Unintentional gaps and dead surface area
14. Scroll hijacking
15. Heavy animation without content purpose

Required instead: editorial typography, large high-quality product surfaces, architectural
grids, controlled asymmetry, fine rules, mineral black, warm ivory, restrained champagne
accents, selective real property imagery, calm precise motion, and deliberately placed
premium whitespace.

**Premium whitespace vs. dead space.** Whitespace is premium when it supports hierarchy,
separates meaning or gives a high-value element room. Empty area with no compositional or
editorial purpose is forbidden. Blanket minimum heights that manufacture large empty regions
are forbidden.

**The luxury register does not soften because a surface is authenticated.** Same tokens,
same type scale, same alignment law, same radius law, same motion budget, same prohibitions.
There is no separate "app theme".

**No fabricated product surface, ever.** A pending frame is honest. A mocked-up dashboard,
an invented metric inside an image, or a screenshot of something that does not exist is a
**P0** violation.

---

## 10. Positioning guardrail

NuovaSolution is **not** a chatbot and **not** a simple lead tool. It is an
**AI Operating and Growth System for real estate agencies**.

Every page must move an agency owner toward two realizations:

> This does not just automate messages. This could change how my agency operates.

> Why am I using five separate tools when Nuova connects the whole operation?

Language: **English is primary. Spanish is the second complete language.** No mixed-language
UI. No literal machine translation. Both languages must read as intentionally authored,
including every state label on authenticated surfaces.

---

## 11. CTA hierarchy

> Amended 2026-09-01. The factual objections that blocked the original hierarchy are
> withdrawn. Export-v2 confirms the trial is free and takes no payment method, and the owner
> has ratified Start Trial as the primary CTA after integration.

### 11.1 The trial facts, confirmed

| Fact | Status |
|---|---|
| The trial is **14 days** | **`BACKEND CONFIRMED`** |
| The trial is **free** | **`BACKEND CONFIRMED`** — the trial subsystem creates a free trial, auto-charge is off, and conversion requires explicit customer authorisation |
| **No payment method is required at signup** | **`BACKEND CONFIRMED`** — no card is collected; payment happens only at the later, server-determined checkout handoff |
| **Book a demo is optional** | **Owner-ratified** |
| **No sales call is required to start a trial** | **Owner-ratified**, and now demonstrably true rather than merely asserted |

**One distinction remains, and it matters.** The *facts* are confirmed. The *wording* is
still a claims decision: `CLAIMS_MATRIX.md` lists "Free trial", "Start free", "Try free" and
"No credit card required" as separately governed phrases. **Only that document's owning
instance may clear them.** A confirmed fact is not an approved sentence, and no page ships a
phrase before its own clearance exists.

### 11.2 Ladder A — the ratified target ladder

| Level | Action |
|---|---|
| Primary | **Start trial**, in cleared wording |
| Secondary | **Book a demo** |
| Tertiary | **Experience Nuova** |

**Ladder A becomes operative when the signup surface exists**, because a primary CTA must
have a destination. It is now a *scheduled* outcome, not a blocked one.

### 11.3 Ladder B — the shipping ladder in the interim

| Level | Action | Note |
|---|---|---|
| Primary | **Book a demo** | The only working conversion path today. Outside the product boundary. |
| Secondary | The trial entry, as a clearly marked placeholder | Under the §14.3 lockdown until individually released |
| Tertiary | **Experience Nuova** | Ships only with a cleared pre-interaction simulation label |

**The switch from Ladder B to Ladder A is a per-action release under §14.3**, recorded in the
activation register. It does not happen because the facts were confirmed.

### 11.4 Binding rules for both ladders

- One primary action per viewport. Competing equal-weight CTAs in one view are a P1 finding.
- The ladder is identical on every page and every breakpoint.
- **Book a demo is optional and is never a prerequisite to starting a trial.** No step in
  any journey may route a trial signup through a sales call.
- No duration or outcome promise attaches to a demo booking until the owner supplies one.
- **The public WhatsApp CTA does not ship.** No number exists and none may be invented (R7).
- **No chat launcher ships.** The website assistant is `RESERVED` (§16). A launcher that
  accepts input and never answers is a **P0** violation.
- **`Log in` does not render as a link until its destination exists.** The label is cleared
  in principle; the destination is a named missing field.

---

## 12. Repository and release discipline

- All work happens on `website_enterprise_redesign`.
- The owner's existing changes are preserved. Destructive `git reset`, forced overwrite of
  the owner's work and history rewriting are forbidden.
- No merge into the production branch. No production deployment.
- **No push and no deployment of any kind, preview included, without explicit per-occasion
  owner approval — see §15.**
- **Staging is a per-file discipline.** No chat uses `git add .`, `git add -A`, `git add
  <directory>` or `git commit -a`. Every chat stages explicitly named paths, and only paths
  it owns. Before staging, inspect the working tree; after staging and before committing,
  verify the staged list matches the intended paths exactly.
- **No two chats in one wave touch the same file.** Ownership is exclusive.
- Secrets are never committed. A secret found in history is reported once to the owner and
  then left alone — this project does not reproduce it, clean it, or verify it.
- **No history rewrite, ever.** A misattributed commit is corrected documentarily, in
  `IMPLEMENTATION_STATUS.md`, not by rewriting the log.

---

## 13. Reporting wording

Permitted status wording for completed implementation work:

> Implemented and awaiting independent technical and final audit.

Forbidden wording: done, finished, complete, ready, production ready, bug-free, tested and
working, fully functional, ships as-is, `LIVE`, `PRODUCTION READY`.

---

## 14. Product and automation project isolation (ABSOLUTE)

> Added 2026-08-30 by binding owner directive. Unchanged in force by the arrival of the
> canonical handoff. This section overrides convenience, completeness and any implementation
> preference. It is not negotiable and is not subject to interpretation by an implementation
> instance.

The separate **NuovaSolution product and automation project**, running on NuovaSolution's
own n8n server, is **near completion**. It must under no circumstances be touched, modified,
disturbed, degraded or put at risk by any work in this website project.

### 14.1 Forbidden without exception

From this website repository and this branch:

1. **No real webhooks.** No webhook is created, registered, called, subscribed to or fired.
2. **No workflow changes.** No n8n workflow is created, edited, renamed, activated,
   deactivated, duplicated, exported or deleted.
3. **No server access.** No connection of any kind to the NuovaSolution n8n server or to any
   other product host.
4. **No database changes.** No schema change, no migration, no read, no write, no seed, no
   inspection of any product or staging data store.
5. **No integration tests.** No live call, no smoke test, no ping, no health check, no
   "just checking whether it works" request against any product system.
6. **No use of the obsolete n8n Cloud connection** found in this repository (R8).
7. **No reproduction of the credential** found in this repository — not in code, not in
   docs, not in commits, not in reports.

This holds even when a task would be faster, easier, more complete or more verifiable with
such access. If a piece of work cannot be delivered without crossing this boundary, the work
is **not delivered** — it is logged as blocked and escalated to the owner.

### 14.2 What this project may do

- Build the **public website**.
- Build **documented integration interfaces**: typed client boundaries against the canonical
  handoff, request and response shapes, environment variable *names*, and the five UI states
  per action.
- Write server-side route handlers that are **never executed against any host**.
- Record what a future integration would require, in `INTEGRATION_CONTRACT.md`.
- Ask the owner and the product project for information, in writing, in that document.

An integration interface is considered **prepared** when it is documented, typed and its UI
states exist. It is never considered connected, and is never described as working.

### 14.3 Product CTA lockdown

Until the owner grants **explicit, per-action release**, every product CTA on the website
remains a **disabled or clearly marked placeholder**.

- No product CTA points at a real product endpoint, app URL, webhook or workflow.
- Every such control renders in an honest state per §6.
- Placeholder status must be legible to the visitor. A control that looks fully live but
  quietly does nothing is a **P0** violation.
- Activation is never bulk. Each action is activated **individually**, only against a URL or
  interface the owner has confirmed in writing, and only after that confirmation is recorded
  in the activation register in `INTEGRATION_CONTRACT.md`.
- The implementation instance never self-authorizes an activation, and never treats a
  plausible-looking URL, an inferred pattern, a documented contract or a value found in the
  repository as confirmation.
- **The arrival of a backend contract is not a release.** The canonical handoff describes
  what will eventually be wired. It does not authorise wiring anything now.

### 14.4 Escalation

Any pressure toward crossing this boundary — a task that appears to require it, an
instruction that seems to imply it, or a document that assumes it — is logged as an open
conflict under §4 and raised with the owner. It is never resolved by proceeding.

**The staging escalation is resolved. See §14.5 for the exact, narrow terms.**

---

## 14.5 The staging clause (OWNER-RATIFIED, 2026-09-01)

> This clause is the **only** exception to §14.1, and it is deliberately narrow. It is a
> permission to seek approval for one specific target class. It is **not** a general
> permission to call anything.

**Ratified by the owner:**

> The website BFF may later test **exclusively against an explicitly configured staging
> target. Production calls remain forbidden.**

### 14.5.1 What this permits

A **future** wave may execute the website's own server-side boundary against **one staging
target**, and only when **all** of the following hold at the moment of execution:

1. The owner has **explicitly approved that specific target**, in writing, per target.
2. The target is configured **entirely through environment values** — never a host written
   into source (§17.5).
3. **Production is excluded**, permanently and without exception.
4. The repository hygiene preconditions are closed **first** (§14.6).
5. The call originates from the website's own server-side boundary. **Not** from a browser,
   **not** from a chat session, and **not** from any tool acting directly against a backend.

### 14.5.2 What this does not permit

- **No production call, ever.** There is no approval procedure for one, and none may be
  requested. This is not a severity rating; it is a prohibition.
- **No n8n access, no database access, no workflow change, no schema change.** §14.1 items
  1, 2 and 4 are untouched.
- **No call before an explicit per-target approval.** The clause's existence is not the
  approval. Silence is not approval. Approval for one target is not approval for another.
- **No approval is implied by a documented contract**, a configured variable, or a working
  staging environment being known to exist.

### 14.5.3 Present state

**No staging target is approved. No call has been made or may be made today.** Nothing in
this repository executes against any host. Every route is written and typed only.

The practical effect of ratification is that `END TO END VERIFICATION PENDING` is now
**reachable in principle** rather than permanently unreachable. It is not closed, and it does
not close until a real verification actually runs under §14.5.1.

---

## 14.6 Repository hygiene is a precondition (OWNER-RATIFIED, 2026-09-01)

**Ratified by the owner:** repository hygiene is **mandatory before any secret or any
server-boundary configuration is introduced.**

Binding sequence, in this order, with no step skipped:

1. **Hygiene first.** Build output, build information, the retired tooling configuration and
   local developer settings are untracked, and the ignore rules are extended.
   `CURRENT_SITE_AUDIT.md` §19 holds the register.
2. **Then** the guard that fails a build on a retired host or a secret-shaped literal.
3. **Then, and only then**, any environment variable, any server-boundary configuration, and
   any staging target.

Introducing a secret-bearing variable while build output is tracked is **unsafe by
construction**: the next build that inlines a value commits it. No wave may reorder this.

**This wave performs no hygiene work.** It documents the requirement. Remediation is a
separate wave that runs **alone**, because untracking operates on the whole index.

---

## 14.7 Versioning the backend exports (OWNER-RATIFIED, 2026-09-01)

**Ratified by the owner:** the backend handoffs v1, v2 and the AF addendum **may be placed
under version control after a successful hygiene and secrets check.**

Conditions:

- The hygiene work of §14.6 is closed first.
- Each file is re-read in full and confirmed to contain no secret, key, token, credential,
  environment value or customer record immediately before it is staged.
- Both current digests are recorded alongside them, so a later export can be diffed against a
  verified baseline.
- **This wave commits none of them.** They are the owner's files, they sit in an untracked
  directory, and versioning them is the hygiene wave's first action, not this one's.

---

## 15. Release and access discipline (ABSOLUTE)

> Added 2026-08-30 by binding owner directive. Unchanged. Supersedes §12 where stricter.

**No push. No merge. No deployment. No production access — without explicit owner approval,
granted per action.**

| Action | Requires explicit owner approval |
|---|---|
| `git push` of any branch, including `website_enterprise_redesign` | **Yes** |
| Merge into `main` or any production branch | **Yes** |
| Any deployment, **including a preview** | **Yes** |
| Any access to production hosting, DNS, domains or environment variables | **Yes** |
| Any access to the n8n server, databases or product systems | **Forbidden** (§14) |

Approval is per action and per occasion. Approval given once does not extend to the next
push, the next merge or the next deployment. Silence is not approval. An earlier
authorization for a similar action is not authorization for this one.

Local commits on `website_enterprise_redesign` are permitted, because they are local,
reversible and reach no external system.

---

## 16. Status vocabulary (BINDING)

> Adopted 2026-08-31. Replaces the four-value vocabulary previously used in
> `INTEGRATION_CONTRACT.md`, which conflated "the backend does not have it" with "the website
> has not built it yet". That conflation is the specific error this vocabulary exists to
> prevent.

A surface normally carries **two or more** statuses at once: one describing the backend, one
describing the website, and where applicable one describing publication.

| Value | Meaning | May the public site assert it? |
|---|---|---|
| **`BACKEND CONFIRMED`** | The canonical handoff defines a contract for it, and the backend team asserts it is applied and proven on their side. | **No, not by itself.** Rank 2 decides. |
| **`WEBSITE INTEGRATION PENDING`** | Backend confirmed; no website code exists for it yet. | No present-tense capability claim. |
| **`WEBSITE IMPLEMENTED`** | Website code exists against the contract. Not verified. | No. |
| **`WEBSITE VERIFIED`** | Website code verified locally — build, types, states, accessibility, mobile — but not against any live backend. | No. |
| **`END TO END VERIFICATION PENDING`** | Nothing has been proven against a real target. **This is currently true of every single surface, without exception**, and under §14.4 it cannot yet be closed. | No. |
| **`LEGAL REVIEW PENDING`** | Blocked by a legal dependency recorded in `CLAIMS_MATRIX.md`. | **No, in any wording, in either language.** |
| **`OWNER DECISION PENDING`** | A commercial, naming, scope or process decision only the owner can make. | No. |
| **`RESERVED`** | Named in the handoff as reserved for a future backend that does not exist. Visual preparation is permitted; live behaviour is forbidden. | No. |
| **`PROPOSED`** | A shape proposed but not backend-defined. Must never be implemented as if real. | No. |
| **`BLOCKED`** | Cannot proceed. A required contract, field, decision or clearance is missing entirely. | No. |
| **`REJECTED`** | Refused for public use by `CLAIMS_MATRIX.md`. A backend confirmation does not lift it. | **Never.** |

### 16.1 Rules for using the vocabulary

1. **`LIVE` and `PRODUCTION READY` are forbidden** in every document, commit message, status
   line and report on this branch.
2. `BACKEND CONFIRMED` describes the contract, never the website. It is never used as a
   completion claim.
3. `END TO END VERIFICATION PENDING` is carried by every surface until the §14.4 escalation
   is resolved and an independent verification actually runs.
4. A `LEGAL REVIEW PENDING` or `REJECTED` verdict is **never** softened by a technical
   confirmation. Only `CLAIMS_MATRIX.md`'s owning instance may change its own verdict.
5. `RESERVED` and `PROPOSED` are not weaker forms of "coming soon". They forbid
   implementation, not merely publication.

---

## 17. Integration boundaries (BINDING)

> Adopted 2026-08-31 from the canonical handoff §0, §6, §7, §8 and Appendix B. Every item is
> **release-blocking**: a breach is a P0 finding.

### 17.1 The frontend must not duplicate backend authority

- Tenant and role are derived **server-side** from the verified session. The client never
  sends a privileged tenant identifier or role, and the website never trusts one it holds.
- Trial status, remaining days, entitlements, plan, subscription state, progress percentage
  and step status are **read from the backend and rendered**. They are never computed,
  inferred, cached as truth, or reconstructed client-side.
- The website **never grants** an entitlement, a trial extension, a plan change or a
  completion state. It reflects what the backend reports.
- The website never hardcodes a trial length, an extension length, a quota or a plan name.
  Those are served values. **A price is not a served value — none exists** (R6).
- Where the backend reports a state the website did not expect, the website renders nothing
  rather than a guess.
- **The wizard is not forced linear.** Each step's status is evaluated independently by the
  backend. The website renders steps in any order it chooses and drives completion from live
  status. The resume pointer is a convenience, not a sequence.
- **Progress is read, never counted.** The completion percentage and the completed-step count
  come from the backend projection. The website does not derive them from what it can see.

### 17.2 No secrets may reach the browser

- The browser only ever holds the **publishable key** and the **end user's own session
  token**. Nothing else.
- A service-role key, a provider client secret, a webhook secret or any provider token must
  **never** appear in a public-prefixed environment variable, in the client bundle, or in a
  browser network response.
- The browser receives connection **status** and non-secret display fields only.
- Page components never import a server-only environment variable. A single typed
  server-side environment module is the only place server values are read.
- Committed environment example files carry **names only, never values**.

### 17.3 Sensitive actions run server-side

- Every privileged action — provisioning, account bootstrap, progress writes, storage
  administration, signed-URL minting, provider OAuth start and token exchange, checkout, and
  every moderation or billing read — runs in a **server-side boundary**, never in the
  browser.
- Provider OAuth callbacks and payment webhooks are **server routes only**, never client
  routes. Webhook signatures are verified server-side against a server-only secret.
- Cross-origin access is restricted to an exact configured origin, never a wildcard with
  credentials.
- **The agency never sees technical identifiers**: no workflow or webhook identifiers, no
  storage object identifiers, no tenant identifiers, no technical entitlement keys. This is a
  rendering-layer rule, not a convention.

### 17.4 No legacy n8n hardcoding enters the new implementation

- No retired host, no `.n8n.cloud` reference, no n8n webhook path pattern, no n8n URL
  literal, and no inline key or token — in source or in build output.
- The retired connection is **deleted, not repointed** (R8).
- A build-time guard that fails on reintroduction of a retired host or a secret-shaped
  literal is required, scoped to application source and build output, and not to the
  documentation directory, which legitimately contains the pattern list.

### 17.5 Staging and production are separated by configuration

- Every backend target comes from an environment variable. **No target is hardcoded in
  source, ever.**
- Staging versus production is a **pure environment change**: different values, identical
  variable names, no code edit and no logic redeploy.
- Provider redirect URIs point at the server boundary origin **per environment**, registered
  separately.
- Preview environments point at staging values only, never at production values, and each
  preview origin is allowed for staging only.
- Self-referencing absolute production URLs are forbidden in source. Internal links are
  relative, otherwise every preview links back into production.
- **Locale routes are `/en` and `/es`**, separate routes, fixed by owner ratification
  (§19 item 9). This is not a proposal and is not reopened.

### 17.6 Additional release-blocking invariants from export-v2

Each is a **P0** finding if breached.

1. **No price is displayed anywhere**, from any source, because none exists in any contract
   (R6).
2. **There is no polling contract, and none may be invented.** Connection status is read
   **once** after the OAuth return, and **once** on an explicit user refresh. A conservative
   auto-refresh is permitted only as an openly **website-owned** decision: it must stop on a
   terminal state or when the user leaves the step, and it must never be presented, typed or
   documented as a backend guarantee.
3. **A user cancelling an authorisation is never rendered as a provider failure.** The
   cancellation outcome returns the row to its previous status as a neutral, resumable state.
   It is never an error treatment and never a critical signal.
4. **No internal telephony carrier or vendor name is ever rendered.** Voice is named
   generically. The internal registry's display values are engineering and carrier
   descriptions, and exposing them would disclose the internal telephony stack.
5. **Footer and signature are submitted as plain text.** The website never injects raw HTML;
   the server sanitizes and renders. Only the logo and the email banner are uploads.
6. **The website builds no hot lead alerting surface** and asserts no alerting claim. The
   mechanism is internal and needs no website endpoint. **A mechanism existing internally is
   not a cleared public claim.**
7. **The opaque office handle is never rendered.** Offices are shown by display name only.
8. **The correlation value returned to the OAuth callback route is never a token**, and the
   website never receives one.
9. **Provider display names are cleared for the authenticated tree only.** Public marketing
   naming remains a claims decision. Logos remain blocked for every provider until brand
   approval.

---

## 18. Proposed replacement block for CLAUDE.md

> **`CLAUDE.md` is NOT edited by this wave.** It remains untouched until the owner approves
> the change. This section is the precise replacement text, prepared for that controlled
> update, and nothing more.

### 18.1 Why a replacement is needed

`CLAUDE.md` is loaded into every session in this repository as binding project instruction.
It currently contradicts the redesign on four material points, and because it loads
automatically, it re-introduces the contradiction into every new session:

| `CLAUDE.md` currently says | Superseded by |
|---|---|
| A bright, warm sand / stone / terracotta Mediterranean palette | The mineral black, warm ivory and champagne system in `LUXURY_UX_MEDIA_SYSTEM.md` |
| NuovaSolution is AI lead capture and qualification for agencies in Spain | An AI Operating and Growth System for real estate agencies (§10) |
| Hot lead alerts are a **MANDATORY SELLING POINT** with a required phone-mockup treatment | No alerting contract exists in the canonical handoff. The mandate **cannot be honoured** and the claim may not be made. |
| A chatbot or assistant concept should be included | The website assistant is `RESERVED`. A launcher that accepts input and never answers is a P0 violation. |

It also mandates a pain-first homepage narrative, specific card and mockup treatments, and a
WhatsApp CTA, all of which either conflict with the design system's prohibitions or depend on
information that does not exist.

### 18.2 Proposed replacement block

The following replaces `CLAUDE.md` in full when the owner approves. It deliberately contains
no visual specification, no copy and no capability claim, because each of those belongs to a
ranked document that can change without touching this file.

```markdown
# NUOVASOLUTION WEBSITE SYSTEM

You are working in the official NuovaSolution website repository.

NuovaSolution is an **AI Operating and Growth System for real estate agencies**, launching
internationally on the Costa del Sol. It is not a chatbot and not a simple lead tool.

## Read this first

This file intentionally contains no visual system, no copy and no capability claims.
All of those live in `docs/website_redesign/`, which is authoritative. Before making any
change to this repository, read:

1. `docs/website_redesign/MASTER_GOVERNANCE.md` — process, severity, release and access
   discipline. Start here. It defines the authority ranking, the status vocabulary, the
   isolation boundary and the release rules.
2. The document that owns your task, per the authority ranking in MASTER_GOVERNANCE §3.

## Non-negotiables

- **Product and automation project isolation.** The separate NuovaSolution product project
  on our own n8n server is near completion and must never be touched from this repository.
  No real webhooks, no workflow changes, no server access, no database changes, no
  integration tests. See MASTER_GOVERNANCE §14.
- **No push, merge or deployment, preview included, without explicit per-occasion owner
  approval.** See MASTER_GOVERNANCE §15.
- **No invention.** No endpoint, payload field, status value, capability, URL, price,
  number, phone number or environment variable value outside the canonical backend handoff.
  Environment variable names only.
- **No invented customers, testimonials, results, prices or statistics**, anywhere, in any
  state, including placeholder and image content.
- **No secret ever reaches the browser**, and no secret value is ever written, echoed,
  logged, quoted or committed.
- **Every public claim clears `CLAIMS_MATRIX.md`.** A backend confirmation is not a
  publication licence.
- **No creator releases their own work.** The only permitted completion wording is:
  *Implemented and awaiting independent technical and final audit.*
  The words done, finished, complete, ready, production ready, LIVE and PRODUCTION READY
  are forbidden.
- **Stage explicit paths only.** Never `git add .`, `git add -A` or `git add <directory>`.
  Several instances share this working directory.

## Languages

English is primary. Spanish is the second complete language, written natively rather than
translated. Both must read as intentionally authored, including every state label.

## What this repository is

The public website and a server-side integration boundary written against a documented
backend contract. It is not the product, it is not the automation layer, and it does not
host or reach either.
```

### 18.3 Conditions on adopting it

1. The owner approves the replacement explicitly. **Ratified 2026-09-01:** `CLAUDE.md` **may
   be updated later, under control** (§19 item 12).
2. The governance-owning chat, and no other, performs the edit, in a commit that touches
   `CLAUDE.md` alone.
3. Until then `CLAUDE.md` stays exactly as it is, and every chat treats its visual direction,
   positioning, hot-lead mandate and chatbot section as **superseded** per §3.

### 18.4 The hot lead mandate is settled, and must not be carried over

> **Owner-ratified 2026-09-01:** the old mandatory hot-lead mandate **must not be carried
> into the new website.**

`CLAUDE.md` currently mandates hot lead alerts as a "MANDATORY SELLING POINT" with a required
phone-mockup treatment. That mandate is **withdrawn** and does not enter the rebuild.

The reason is now settled rather than pending. Hot-lead surfacing is an **internal**
mechanism: the agency is notified through the existing agent-notification channel and through
CRM and dashboard surfacing. There is **no public website or onboarding endpoint, and none is
required**. It is therefore **out of scope for the website**, not blocked awaiting a contract.

Binding consequences:

- **The website builds nothing for it.** No section, no phone mockup, no alert imagery, no
  endpoint, no copy.
- **The internal mechanism authorises no public claim.** A mechanism existing internally is
  not cleared wording. Any future claim is a fresh claims decision with a fresh legal check.
- The previous record of this as `BLOCKED` on a missing backend field was **wrong** and is
  corrected wherever it appears.

---

## 19. Owner ratification register (2026-09-01)

Decisions ratified by the owner in writing. **Each is fixed and is not reopened by any chat.**
A ratification settles a *decision*; it never releases a *control* — that is §14.3, and the
activation register is still empty.

| # | Ratified decision | Where it binds |
|---|---|---|
| 1 | The website BFF may later test **exclusively against an explicitly configured staging target**. | §14.5 |
| 2 | **Production calls remain forbidden.** No approval procedure exists for one. | §14.5.2 |
| 3 | Staging and production are **separated config-driven**. | §17.5 |
| 4 | **Start Trial becomes the primary CTA after successful integration.** | §11.2 |
| 5 | **The trial is 14 days free.** | §11.1 |
| 6 | **No payment method is required at signup.** | §11.1 |
| 7 | **Book a demo remains optional.** | §11.1, §11.4 |
| 8 | **No phone call is a prerequisite for the trial.** | §11.1, §11.4 |
| 9 | **Locale routes are `/en` and `/es`.** | §17.5 |
| 10 | **`/{locale}/app` is documented as the provisional website-owned destination after onboarding**, until the product scope is finally confirmed. | §19.1 |
| 11 | The backend handoffs v1, v2 and the addendum **may be versioned after a successful hygiene and secrets check**. | §14.7 |
| 12 | **Repository hygiene is mandatory before any secret or server-boundary configuration is introduced.** | §14.6 |
| 13 | **`CLAUDE.md` may be updated later, under control.** The old mandatory hot-lead mandate **must not be carried into the new website.** | §18.3, §18.4 |

### 19.1 The provisional destination after onboarding

> **Owner-ratified:** `/{locale}/app` is documented as the **provisional, website-owned**
> destination after onboarding, **until the product scope is finally confirmed.**

This closes what was previously recorded as the project's largest open question, and it
closes it correctly: the backend never owned this route. The backend owns the **signal** —
whether the tenant is activatable, and the activation call. The **destination is a website
decision**, and the owner has now made it provisionally.

What this does and does not settle:

- **Settled:** the route the website targets on completion, so the onboarding exit, the
  authenticated route tree and the login destination are no longer blocked on an unknown.
- **Not settled:** how much of the product the website ultimately hosts. `/{locale}/app` is a
  **placeholder destination under a website-owned route**, not a decision that the website
  builds the full authenticated application.
- **Consequence for `Log in`:** the destination now exists as a website route, so the nav item
  is no longer blocked on a missing field. It still does not render as a live link until that
  route exists and the control is released per §14.3.
- The word **provisional** is load-bearing. When the product scope is confirmed, this is
  revisited rather than inherited by default.
