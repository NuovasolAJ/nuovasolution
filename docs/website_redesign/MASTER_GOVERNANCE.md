# MASTER GOVERNANCE — NuovaSolution Website Enterprise Redesign

**Status:** Active
**Branch:** `website_enterprise_redesign`
**Owner:** Antonio Jesus (NuovaSolution)
**Implementation role:** Master Website Director / sole frontend implementation instance
**Created:** 2026-08-30

This document is binding for every contributor, chat, agent and auditor working on the
NuovaSolution website redesign. It outranks convenience, speed and personal preference.
Where any other document in `docs/website_redesign/` conflicts with this one on *process*,
this document wins.

---

## 1. The ten binding rules

### R1 — No creator releases their own work
The instance that writes a page, component, animation or copy block may never be the
instance that declares it acceptable. Every deliverable requires review by an
independent auditing instance that did not author it.

### R2 — Nothing is "done", "bug-free" or "production ready" without independent review
No feature, page or component may be described as finished, working, error-free,
complete, shipped or production ready before an independent technical audit has run
against it.

The only permitted completion wording is:

> **Implemented and awaiting independent technical and final audit.**

This wording applies to commit messages, status updates, `IMPLEMENTATION_STATUS.md`
entries and any report to the owner.

### R3 — Every public statement must match PRODUCT_TRUTH.md and CLAIMS_MATRIX.md
No headline, subheadline, feature name, bullet, tooltip, meta description, OG text,
alt text or microcopy may assert a capability, an outcome or an availability that is not
backed by an entry in `PRODUCT_TRUTH.md` and cleared for public use in
`CLAIMS_MATRIX.md`.

If a claim is needed and no entry exists, the claim is not written. The gap is logged as
an open conflict (see §4) and escalated to the owner.

### R4 — Copy comes from COPY_AND_CONVERSION_MASTER.md
Website text is not invented at implementation time. All customer-facing copy —
English and Spanish — is taken from `COPY_AND_CONVERSION_MASTER.md`.

Implementation may adjust line breaks, truncation and responsive text length. It may not
invent, rewrite or "improve" messaging. Missing copy blocks are logged, not filled in.

### R5 — Visual rules and page architecture come from LUXURY_UX_MEDIA_SYSTEM.md
Design tokens, type scale, grid, spacing rhythm, motion rules, media treatment, section
architecture and page composition are defined in `LUXURY_UX_MEDIA_SYSTEM.md`.
Implementation follows that system. Ad-hoc visual decisions during implementation are
not permitted; deviations require a logged conflict and owner approval.

### R6 — No invented customers, references, results, prices or statistics
Strictly forbidden anywhere on the site, in any language, in any state (including
placeholder, mockup, demo and screenshot content):

- fictional client names, agency names, brands or logos
- fictional testimonials, quotes or endorsements
- fictional case studies or success stories
- invented metrics, percentages, response times, ROI figures, conversion rates or counts
- invented prices, discounts, tiers or contract terms
- invented certifications, awards, partnerships or compliance badges

Demo and sample data must be visibly and honestly marked as illustrative. Prices appear
only when the owner has confirmed them in `PRODUCT_TRUTH.md`.

### R7 — Backend connections are prepared, never invented
The website may prepare integration points. It may not fabricate them.

Forbidden: inventing endpoints, URLs, webhook paths, API routes, secrets, tokens,
environment variable *values*, phone numbers, WhatsApp numbers or third-party account
identifiers.

Permitted: defining a typed client boundary, an environment variable *name* documented in
`INTEGRATION_CONTRACT.md`, and an honest UI state when the connection is absent.

### R8 — The legacy n8n Cloud connection is retired and must not be used
The n8n Cloud connection configured in this website repository is **obsolete**. It must not
be used, called, tested or referenced as a live target for anything.

The credential found in this repository is handled by the owner outside this project:
rotation and history cleanup happen separately. This project does not reproduce, echo, log,
copy or quote that credential value in any file, document, commit or message, and does not
attempt to verify, use or clean it.

See §14 for the absolute isolation boundary around the product and automation project.

### R9 — No production release without the owner's personal approval
No merge into the production branch, no promotion of a Vercel preview to production, no
domain change, no DNS change and no public announcement without explicit, personal,
case-by-case approval from the owner. Preview deployments on the redesign branch are
permitted and are never production.

### R10 — All P0 and P1 findings are fixed and independently re-audited
Audit findings are triaged as P0/P1/P2/P3. P0 and P1 must be fixed and then re-verified
by an independent auditing instance — not by the instance that wrote the fix. A fix is
not closed by its author.

---

## 2. Severity definitions

| Level | Definition | Handling |
|---|---|---|
| **P0** | Legally, factually or security-critical. False public claim, leaked secret, broken primary CTA, dead-end conversion path, GDPR/LSSI-CE exposure, site-breaking failure. | Blocks everything. Fix immediately, re-audit independently. |
| **P1** | Materially damages trust, conversion or usability. Broken navigation, unreadable mobile layout, invisible content, missing language coverage, failing Core Web Vitals target, dead surface area. | Blocks release. Fix and re-audit independently. |
| **P2** | Quality and polish. Inconsistent spacing, weak hierarchy, suboptimal motion, minor copy friction. | Scheduled, tracked, not release-blocking on its own. |
| **P3** | Optional improvement or future idea. | Backlog. |

---

## 3. Document hierarchy and precedence

**Source-of-truth documents** (authored by the product truth, copy, UX and audit
instances — *not* by the implementation instance):

1. `PRODUCT_TRUTH.md` — what the product actually is, does and does not do today
2. `CLAIMS_MATRIX.md` — which statements may be made publicly, in which wording
3. `COPY_AND_CONVERSION_MASTER.md` — final EN and ES copy, conversion structure
4. `LUXURY_UX_MEDIA_SYSTEM.md` — visual system, tokens, page architecture, media rules

**Implementation-owned documents** (authored here):

5. `MASTER_GOVERNANCE.md` — this file, process authority
6. `CURRENT_SITE_AUDIT.md` — factual state of the existing codebase
7. `INTEGRATION_CONTRACT.md` — every interactive action and its honest state machine
8. `IMPLEMENTATION_STATUS.md` — phase-by-phase build and verification log

**Precedence when documents conflict:**

- On **what the product can do / what exists** → `PRODUCT_TRUTH.md` wins.
- On **what may be stated publicly** → `CLAIMS_MATRIX.md` wins.
- On **wording** → `COPY_AND_CONVERSION_MASTER.md` wins, but only within the limits set
  by `PRODUCT_TRUTH.md` and `CLAIMS_MATRIX.md`.
- On **visual and structural design** → `LUXURY_UX_MEDIA_SYSTEM.md` wins.
- On **process, release and severity** → this document wins.

The implementation instance never resolves a substantive conflict by invention. It logs
the conflict and continues with the parts that are unblocked.

---

## 4. Conflict log procedure

When a contradiction, gap or missing decision is found:

1. Stop work on the affected element only. Continue everything else.
2. Record it in `IMPLEMENTATION_STATUS.md` under **Open Conflicts** with: ID, date, the
   documents involved, the exact contradiction, the blocked scope, and the decision the
   owner needs to make.
3. Ship the surrounding work with an honest placeholder state (see §6).
4. Never guess a product capability, a price, a number, or an endpoint to unblock yourself.

---

## 5. Implementation gate

**Main pages must not be rebuilt before these four files exist:**

- `docs/website_redesign/PRODUCT_TRUTH.md`
- `docs/website_redesign/CLAIMS_MATRIX.md`
- `docs/website_redesign/COPY_AND_CONVERSION_MASTER.md`
- `docs/website_redesign/LUXURY_UX_MEDIA_SYSTEM.md`

Until all four are present and cross-checked for contradictions, the implementation
instance is limited to: this governance layer, the codebase audit, the integration
contract, non-content infrastructure work, and preparatory scaffolding that carries no
public claims.

---

## 6. Honest states rule

No button, link, tab or form on the site may lead nowhere.

Where the backend connection does not yet exist, the control must present a designed,
premium, truthful state — for example `Connection pending`, `Book a demo`, or
`Request access` — with a real fallback path for the visitor. Silent failure, a dead
`href="#"`, a fake success message, a fake loading spinner that resolves to nothing, or a
disabled control with no explanation are all P0 violations.

Every interactive action must have a corresponding entry in `INTEGRATION_CONTRACT.md`
covering: target system, current status, required inputs, loading state, success state,
error state, disabled state, analytics event, and missing information.

---

## 7. Phase gate — verification after every phase

Each implementation phase closes only after all of the following have been executed and
recorded in `IMPLEMENTATION_STATUS.md`:

1. Production build executed
2. Type check executed
3. Lint executed (where configured)
4. All links and navigation paths verified — no dead ends
5. Desktop verified
6. Mobile verified separately (not as a scaled desktop check)
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
- Fonts are optimized and self-hosted or preloaded; no render-blocking third-party CSS.
- JavaScript payload is kept minimal; client components are the exception, not the rule.

A missed budget on a shipped page is a P1 finding.

---

## 9. Design prohibitions (binding)

The site must never read as generated output. The following are forbidden as default
patterns:

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

Required instead: editorial typography, large high-quality product surfaces,
architectural grids, controlled asymmetry, fine rules, mineral black, warm ivory,
restrained champagne accents, selective real property imagery, calm precise motion, and
deliberately placed premium whitespace.

**Premium whitespace vs. dead space.** Whitespace is premium when it supports hierarchy,
separates meaning or gives a high-value element room. Empty area with no compositional or
editorial purpose is forbidden. Blanket minimum heights that manufacture large empty
regions are forbidden.

---

## 10. Positioning guardrail

NuovaSolution is **not** a chatbot and **not** a simple lead tool. It is an
**AI Operating and Growth System for real estate agencies**.

Every page must move an agency owner toward two realizations:

> This does not just automate messages. This could change how my agency operates.

> Why am I using five separate tools when Nuova connects the whole operation?

Language: **English is primary. Spanish is the second complete language.** No mixed-language
UI. No literal machine translation. Both languages must read as intentionally authored.

---

## 11. CTA hierarchy (binding)

| Level | Action |
|---|---|
| Primary | **Start your 14 day free trial** |
| Secondary | **Book a demo** |
| Tertiary | **Experience Nuova** |

This hierarchy is consistent across every page and every breakpoint. Competing equal-weight
CTAs in one view are a P1 finding.

---

## 12. Repository and release discipline

- All work happens on `website_enterprise_redesign`.
- The owner's existing changes are preserved. Destructive `git reset`, forced overwrite of
  the owner's work and history rewriting are forbidden.
- No merge into the production branch.
- No production deployment.
- **No push, and no preview deployment, without explicit owner approval — see §15.**
  (This supersedes the earlier assumption that preview deployments were freely permitted.)
- Secrets are never committed. A secret found in history is reported once to the owner and
  then left alone — this project does not reproduce it, clean it, or verify it.

---

## 13. Reporting wording

Permitted status wording for completed implementation work:

> Implemented and awaiting independent technical and final audit.

Forbidden wording: done, finished, complete, ready, production ready, bug-free, tested and
working, fully functional, ships as-is.

---

## 14. Product and automation project isolation (ABSOLUTE)

> Added 2026-08-30 by binding owner directive. This section overrides convenience,
> completeness and any implementation preference. It is not negotiable and is not subject
> to interpretation by the implementation instance.

The separate **NuovaSolution product and automation project**, running on NuovaSolution's
own n8n server, is **near completion**. It must under no circumstances be touched,
modified, disturbed, degraded or put at risk by any work in this website project.

### 14.1 Forbidden without exception

From this website repository and this branch, the following are forbidden:

1. **No real webhooks.** No webhook is created, registered, called, subscribed to or fired.
2. **No workflow changes.** No n8n workflow is created, edited, renamed, activated,
   deactivated, duplicated, exported or deleted.
3. **No server access.** No connection of any kind to the NuovaSolution n8n server or to
   any other production host.
4. **No database changes.** No schema change, no migration, no read, no write, no seed, no
   inspection of any production or staging data store.
5. **No integration tests.** No live call, no smoke test, no ping, no health check, no
   "just checking whether it works" request against any product system.
6. **No use of the obsolete n8n Cloud connection** found in this repository (R8).
7. **No reproduction of the credential** found in this repository — not in code, not in
   docs, not in commits, not in reports. Rotation and cleanup happen outside this project.

This holds even when a task would be faster, easier, more complete or more verifiable with
such access. If a piece of work cannot be delivered without crossing this boundary, the
work is **not delivered** — it is logged as blocked and escalated to the owner.

### 14.2 What this project may do

The website project may only:

- Build the **public website**.
- Build **documented integration interfaces**: typed client boundaries, request/response
  shapes, environment variable *names*, and the five UI states per action.
- Record what a future integration would require, in `INTEGRATION_CONTRACT.md`.
- Ask the owner and the product project for information, in writing, in that document.

An integration interface is considered prepared when it is documented and its UI states
exist. It is never considered connected, and is never described as working.

### 14.3 Product CTA lockdown

Until the owner grants **explicit, per-action release**, every product CTA on the website
remains a **disabled or clearly marked placeholder**.

- No product CTA points at a real product endpoint, app URL, webhook or workflow.
- Every such control renders in an honest state per §6 — `Connection pending`,
  `Request access`, or a routed fallback to *Book a demo*.
- Placeholder status must be legible to the visitor. A control that looks fully live but
  quietly does nothing is a **P0** violation.
- Activation is never bulk. Each action is activated **individually**, only against a URL
  or interface the owner has confirmed in writing, and only after that confirmation is
  recorded in `INTEGRATION_CONTRACT.md`.
- The implementation instance never self-authorizes an activation, and never treats a
  plausible-looking URL, an inferred pattern or a value found in the repository as
  confirmation.

### 14.4 Escalation

Any pressure toward crossing this boundary — a task that appears to require it, an
instruction that seems to imply it, or a document that assumes it — is logged as an open
conflict under §4 and raised with the owner. It is never resolved by proceeding.

---

## 15. Release and access discipline (ABSOLUTE)

> Added 2026-08-30 by binding owner directive. Supersedes §12 where stricter.

**No push. No merge. No deployment. No production access — without explicit owner
approval, granted per action.**

| Action | Requires explicit owner approval |
|---|---|
| `git push` of any branch, including `website_enterprise_redesign` | **Yes** |
| Merge into `main` or any production branch | **Yes** |
| Any Vercel deployment, **including a preview** | **Yes** |
| Any access to production hosting, DNS, domains or environment variables | **Yes** |
| Any access to the n8n server, databases or product systems | **Forbidden** (§14) |

Approval is per action and per occasion. Approval given once does not extend to the next
push, the next merge or the next deployment. Silence is not approval. An earlier
authorization for a similar action is not authorization for this one.

Local commits on `website_enterprise_redesign` are permitted, because they are local,
reversible and reach no external system.
