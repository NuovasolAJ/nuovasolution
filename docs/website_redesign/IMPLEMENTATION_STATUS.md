# IMPLEMENTATION STATUS — NuovaSolution Website Enterprise Redesign

**Branch:** `website_enterprise_redesign` (forked from `main` @ `9943660`)
**Maintained by:** Master Website Director (implementation instance) — Wave A4
**Last updated:** 2026-08-31
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
| Documentation produced | Eleven documents under `docs/website_redesign/` |
| Document gate (§5.1) | **4 of 4 present**, plus the canonical technical handoff |
| Pages rebuilt | **None** |
| API routes | **None.** `app/api/` does not exist. |
| Network calls | **None.** No `fetch`, no client, no environment plumbing anywhere in application source. |
| Push / merge / deployment | **None.** All require explicit per-occasion owner approval (§15). |
| Product system contact | **None, and none permitted** (§14.1). No webhook, no workflow change, no server access, no database access, no integration test, no health check. **Production untouched.** |
| Product CTAs | **All locked.** Disabled or clearly marked placeholders until individually released (§14.3). |
| Activation register | **Empty.** |
| End-to-end verification | **`END TO END VERIFICATION PENDING` on every surface**, and currently unreachable — see conflict C-14. |

---

## 2. Authority ranking in force

Adopted into `MASTER_GOVERNANCE.md` §3 on 2026-08-31 and binding on every chat:

1. `backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v1.md` — **technical authority**
2. `CLAIMS_MATRIX.md` — **authority for public claims**
3. `PRODUCT_TRUTH.md` — **confirmed product scope**
4. `COPY_AND_CONVERSION_MASTER.md` — **copy foundation**, must agree with 1 to 3
5. `LUXURY_UX_MEDIA_SYSTEM.md` — **visual authority**
6. `FINAL_RECONCILIATION_REPORT.md` — **conflict decisions**
7. **No implementation chat may override this ranking.** A chat that believes the ranking
   produces a wrong result logs a conflict and stops on that item only.

`MASTER_GOVERNANCE.md` retains authority over process, severity, release and access. §14 and
§15 are unchanged in force and were **not relaxed** by the arrival of the handoff.

---

## 3. Document gate

| Required document | Present | Author |
|---|---|---|
| `PRODUCT_TRUTH.md` | Yes, 2026-08-30 | Product Truth Director — independent (R1) |
| `CLAIMS_MATRIX.md` | Yes, 2026-08-30 | Claims / compliance — independent (R1) |
| `COPY_AND_CONVERSION_MASTER.md` | Yes, 2026-08-30 | Copy & conversion — independent (R1) |
| `LUXURY_UX_MEDIA_SYSTEM.md` | Yes, 2026-08-30 | Luxury UX & media — independent (R1) |
| `backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v1.md` | Yes, 2026-08-30 | Backend team — **rank 1** |

**Gate status: 4 of 4, plus the canonical handoff.**

> **Correction.** This file previously recorded "3 of 4, blocking document
> `LUXURY_UX_MEDIA_SYSTEM.md`". That document arrived in commit `fc6dfd0` and the entry was
> stale. Corrected 2026-08-31.

**Gate 1 being satisfied does not authorise page implementation on its own.** Seven further
gate categories apply per surface (§4).

**One document is not under version control.** The canonical technical handoff — rank 1, the
document this entire wave depends on — sits in an untracked directory. It can be lost by a
routine clean, is invisible to any other clone, and cannot be diffed when a later export
arrives. It contains **no secrets**, only endpoint contracts, field names, status vocabulary
and environment variable names, which was confirmed by reading it in full. It is therefore
safe to commit. **This wave does not commit it**, because it is the owner's file and the
owner may intend a different location or a different repository visibility. Recorded as
conflict C-13.

---

## 4. Gate status by area

Gate categories are defined in `MASTER_GOVERNANCE.md` §5.2.

### 4.1 What is complete (G1)

| Item | Status |
|---|---|
| Governance layer | Implemented and awaiting independent technical and final audit |
| Codebase audit, amended | Implemented and awaiting independent technical and final audit |
| Integration contract, rewritten against the handoff | Implemented and awaiting independent technical and final audit |
| This status file | Implemented and awaiting independent technical and final audit |

Nothing else. **No application code exists.**

### 4.2 What is documented (G2)

| Area | Documented by |
|---|---|
| The full technical contract — auth, trial, ten-step onboarding, branding, team, provider and CRM connections, property source, Property Experience entry, entitlements, plans, subscription, checkout, testimonial | Rank 1 |
| What may and may not be said publicly, per claim | Rank 2 |
| Confirmed product scope and required qualification | Rank 3 |
| Copy foundation, EN and ES | Rank 4 |
| Visual system, tokens, page architecture, media honesty | Rank 5 |
| Every conflict and its resolution or escalation | Rank 6 |
| Every interactive action with its five UI states | `INTEGRATION_CONTRACT.md` |
| Legacy risks, without secret content | `CURRENT_SITE_AUDIT.md` §19 |

### 4.3 What can be integrated now (G3)

Buildable against a written contract, without executing anything:

- Typed request and response shapes for the **27 implementable surfaces**. The proposed demo
  booking endpoint is **excluded** and must not be typed as real.
- A server-only environment accessor, by variable **name** only.
- The response envelope type and the eight-value status unions.
- Server-side route handlers, **written and typed but never executed**.
- Design tokens, self-hosted fonts, the motion primitive, locale routing, the global shell,
  and public marketing pages composed from cleared copy.

**Precondition:** legacy risks L-R3 and L-R4 must be closed before any environment variable
is introduced (`CURRENT_SITE_AUDIT.md` §19.2). That is a separate hygiene wave that runs
alone.

### 4.4 What is waiting on copy (G4)

Cleared wording does not yet exist for: signup success and error states; login, logout,
session-expired and refresh-failure states; the ten wizard step titles and descriptions and
the eight status labels in both languages; the resume prompt; the per-provider
externally-pending explanation; the degraded and action-required explanations; trial
countdown, reminder and expiry copy; plan comparison and upgrade copy; branding upload
validation copy; captcha copy and its failure state.

Several of these are additionally blocked on a missing field, so copy alone will not unblock
them.

### 4.5 What is waiting on UX specification (G5)

Seventeen surfaces have no page architecture, state specification or mobile composition. The
largest gaps: the **ten-step wizard shell** (no step rail, no progress treatment, no step
numbering law); the **eight status values** (no visual specification at all); **file upload
law** (no drop zone, preview, progress, replace or remove confirmation); **OAuth return
states** (cancelled, provider error, a healthy connection degrading); the **authenticated
upgrade surface**; and **mobile onboarding at 375 px**, which is not inferable from the
desktop composition.

Binding constraint for closing them: **extend the existing system, never start a second
one.** The wizard is a hairline index, not a card grid. There is no separate "app theme".

### 4.6 What is waiting on backend missing fields (G6)

Twelve fields, named precisely in `INTEGRATION_CONTRACT.md` §6.

**Blocking a surface entirely:** MF-01 (testimonial media field), MF-02 (any hot lead
alerting contract), MF-03 (the destination after onboarding completes).

**Required before implementation:** MF-04 (error code enumeration), MF-05 (per-step detail
shape), MF-06 (trial reminder cadence), MF-07 (upload limits), MF-08 (captcha provider),
MF-09 (accepted language values), MF-10 (currency, tax basis, public plan name), MF-11
(provider display names), MF-12 (testimonial surface auth model).

### 4.7 What is waiting on legal review (G7)

**No chat may clear a legal hold.** This is a counsel track, running in parallel, and it is
launch-blocking.

The privacy policy is the first and largest item, and it **got materially worse, not better**.
The current policy covers replying to an inquiry, on a consent-only basis, with no retention
period. The confirmed integration adds account creation, password handling, session tokens,
agency and team personal data, uploaded branding assets, provider tokens held server-side,
testimonial consent, and a payment handoff. Every one of those is new processing that the
policy does not describe.

**No authenticated surface may be publicly reachable before this closes.**

Also held: incentivised testimonials and the trial extension; follow-up timing and lawful
basis; reactivation of older contacts; image, document and audio storage; automated profiling
disclosure; team performance visibility; property measurement sourcing.

### 4.8 What is waiting on owner decisions (G8)

See §7. Thirteen decisions, two of them P0 for the whole wave.

---

## 5. Conflict register

### 5.1 Conflicts C-01 to C-07 — resolved, superseded, or carried

| ID | Original question | Outcome 2026-08-31 |
|---|---|---|
| **C-01** | Does a 14 day trial exist? | **Closed as to existence.** It does: the trial is created with the account at signup. **Superseded by C-08** as to commercial wording — "free" and "no credit card required" remain unconfirmed. |
| **C-02** | Experience Nuova: simulation presented as product? | **Carried, unchanged.** Nothing in the handoff. Still a client-side simulation. Ships only with a cleared pre-interaction disclosure label whose wording is an owner decision. |
| **C-03** | Does a customer application exist, and at what URL? | **Half closed.** Authentication is confirmed: password login, logout and refresh. **The destination is not.** Superseded by C-27 and MF-03. `Log in` does not render as a link until it exists. |
| **C-04** | What does "Talk to Nuova" mean? | **Closed by withdrawal.** No behaviour is defined anywhere and none was supplied. The label is retired and is not used on the site. |
| **C-05** | The business WhatsApp number | **Carried, unchanged.** Superseded in scope by C-17: the handoff confirms an **agency connecting its own** WhatsApp channel and says nothing about a NuovaSolution number for a public CTA. The public WhatsApp CTA does not ship. |
| **C-06** | Do packages and prices exist? | **Closed as to mechanism.** Plans, subscription state and checkout are confirmed, and prices are **served, never authored**. **Superseded by C-15** as to public names, mapping, quotas and whether prices are shown publicly at all. |
| **C-07** | `CLAUDE.md` contradicts the redesign | **Carried, and now better specified.** A precise replacement block is prepared in `MASTER_GOVERNANCE.md` §18. **`CLAUDE.md` is not edited by this wave.** The conflict is now sharper: `CLAUDE.md` mandates hot lead alerts as a "MANDATORY SELLING POINT" and a chatbot concept, and **neither can be honoured** (C-21, and the assistant is `RESERVED`). |

### 5.2 Conflicts C-08 to C-27

Recorded and resolved in `FINAL_RECONCILIATION_REPORT.md` §3.1 and §9.3, which is rank 6 and
is **not** owned by this chat. They are not duplicated here. Their governance consequences,
which this chat has adopted:

| ID | Governance consequence adopted |
|---|---|
| C-08 | Trial exists; "free" does not. §11 CTA hierarchy rewritten to a two-ladder model. |
| C-09 | Testimonial extension is `BACKEND CONFIRMED` **and** `LEGAL REVIEW PENDING` simultaneously. **A technical confirmation never lifts a legal hold** — now stated in R3. |
| C-10 | Testimonial surface `BLOCKED` on MF-01. |
| C-11 | CRM vendor names move to owner decision; **logos stay blocked** — a working adapter is not a trademark licence. |
| C-12 | Named portals stay rejected. **The asymmetry with CRM vendors is deliberate** and is recorded in the contract as a P0 if conflated. |
| C-13 | The canonical handoff is untracked. Owner decision. Not committed by this wave. |
| C-14 | **The staging question.** Escalated under §14.4, **not resolved.** See §5.3. |
| C-15 | The CTA lockdown is **not lifted** by the handoff. Now stated explicitly in §14.3. |
| C-16 | Voice: three separate things. A plan-gated channel connection is confirmed; **voice AI capability is not**, and the connection may not be used to justify it. |
| C-17 | The agency's own WhatsApp channel is confirmed; NuovaSolution's public number is not. |
| C-18 | Demo booking backend stays `PROPOSED` and must not be implemented. The existing scheduling tool is an **existing external option only**. |
| C-19 | Entitlement enforcement is technical and per tenant. Mapping and quotas remain owner decisions. |
| C-20 | Four employee roles confirmed, nameable **once the claims matrix's owning instance updates its own verdict**. |
| C-21 | **Hot lead alerting `BLOCKED` on MF-02.** No copy, no section, no visual. |
| C-22 | Privacy policy scope materially enlarged. Launch-blocking. |
| C-23 | The A-01 disagreement. Corrected in `CURRENT_SITE_AUDIT.md` §15.1. |
| C-24 | Approved claim wording may violate copy house style. The claim survives, the punctuation does not. Copy chat's item. |
| C-25 | This file was stale. Corrected here. |
| C-27 | **The website does not know where the product ends.** MF-03. Largest open scope question. |

### 5.3 C-14 — the standing escalation

**This is the single decision that gates the entire integration wave.**

The canonical handoff invites the website team to build a server-side boundary that calls the
backend, and states that the backend is proven on staging. `MASTER_GOVERNANCE.md` §14.1
items 3 and 5 forbid this repository from making **any** call to **any** product system, and
staging is a product system under the plain text of §14.

**Consequence, stated plainly: under the current rules, `END TO END VERIFICATION PENDING` can
never be closed.** Everything can be built. Nothing can be verified against a real target.

Per §14.4 **no chat may resolve this by proceeding.** It is escalated to the owner, who must
state in writing whether §14 permits a call to a **staging** target, under which conditions,
and with production explicitly excluded. Until that ruling exists, every route is written and
typed and **never executed**, and the absence of a ruling is not treated as permission.

**§14 is not relaxed by this wave.**

---

## 6. Commit collisions — documentary correction

Three commits on this branch have messages that disagree with their contents. **No content
was lost or corrupted. No history is rewritten** (§12). This table is the correction.

| Commit | Message says | Contents actually are | Assessment |
|---|---|---|---|
| `7ec0010` | "record PRODUCT_TRUTH.md arrival" | `COPY_AND_CONVERSION_MASTER.md` + `IMPLEMENTATION_STATUS.md`. **`PRODUCT_TRUTH.md` is not in it.** | A foreign file was swept in by a directory-wide stage, and the file the message names was not committed. |
| `75d0bc6` | "bind product-project isolation into governance" | Four governance files **plus `PRODUCT_TRUTH.md`** | A foreign file swept in. |
| `138a946` | "COPY_AND_CONVERSION_MASTER draft" | **`CLAIMS_MATRIX.md` only.** The named file is not in it. | **Total message / content mismatch.** Previously unrecorded. |

**Effect.** History-following tools give a misleading authorship story for `CLAIMS_MATRIX.md`
and `PRODUCT_TRUTH.md`. Both were authored by independent instances, so R1 holds regardless
of what the log implies.

**Root cause.** Multiple chats share one working directory and commit to one branch, and
build output is tracked (L-R4), so any directory-wide stage sweeps up build noise plus
whatever another chat has half-written.

**Binding fix, now in `MASTER_GOVERNANCE.md` §12.** No chat uses `git add .`, `git add -A`,
`git add <directory>` or `git commit -a`. Every chat stages explicitly named paths it owns,
inspects the working tree before staging, and verifies the staged list before committing.
No two chats in one wave touch the same file.

---

## 7. Owner decisions outstanding

Ordered by how much each unblocks.

| # | Decision | Unblocks | Severity |
|---|---|---|---|
| 1 | **Does §14 permit a call to a staging target?** State the conditions; confirm production is excluded. | The entire integration wave. Without it end-to-end verification can never close. | **P0** (C-14) |
| 2 | **Where does the product live after onboarding completes?** Supply the destination, or confirm the website hosts it. | The authenticated route tree, `Log in`, the wizard exit, **the scope of the whole project**. | **P0** (C-27, MF-03) |
| 3 | **Route the legal dependencies to counsel**, with the enlarged privacy policy first. | Site-wide launch. | **P0** (C-22) |
| 4 | **Is the 14 day trial free, and is a payment method required at signup?** | The primary CTA wording site-wide; which CTA ladder ships. | P1 (C-08) |
| 5 | **May the four CRM vendors be named as plain text?** Separately: are trademark permissions held for any logo? | Platform and lead-intelligence pages; the "we already have a CRM" objection. | **P0 if acted on early** (C-11) |
| 6 | **Confirm the public plan names configured in the plans endpoint.** The backend serves the name; the website must not contradict it at runtime. | Pricing, solutions, plan selection. | P1 (C-15) |
| 7 | **Supply MF-01 and MF-02**, or declare them out of scope. | The testimonial surface; all hot lead copy and one homepage section. | P1 |
| 8 | **Repository hygiene wave**: authorise closing L-R1 and L-R3 to L-R6. Confirm repository visibility. | Safe introduction of **any** environment variable; the build guard; the end of the collision class. | P1 |
| 9 | **Ratify the CTA ladder.** Ladder B ships until decision 4 resolves. | Every page, every breakpoint. | P1 |
| 10 | **Approve editing `CLAUDE.md`** with the replacement block in `MASTER_GOVERNANCE.md` §18. | Stops the stale brief re-entering every session and re-introducing a mandate that cannot be honoured. | P1 (C-07, C-21) |
| 11 | **Confirm the locale URL strategy and route naming.** | Every canonical, every `hreflang`, every inbound link, the whole route tree. | P1 |
| 12 | **Commit the backend handoff to version control?** Confirmed free of secrets by full read. | Reproducibility, diffing the next export, other clones. | P1 (C-13) |
| 13 | **Confirm a demonstration workspace may be created** for captures and recordings, without touching production. | All product imagery and video. Until then every product surface ships as an honest pending frame. | P1 |

### 7.1 Resolved or withdrawn

| Former item | Outcome |
|---|---|
| Rotate the n8n Cloud credential | Owner-side, stated as handled outside this project. **This project cannot verify it and does not claim to.** The hygiene half remains open as L-R1. |
| Approve a push to create a preview deployment | **Withdrawn.** Under §15 nothing is pushed or deployed by default. This project does not ask per phase; it acts only on an explicit instruction at the moment it is wanted. |
| "Does a trial / login / onboarding / pricing exist?" | **Answered by the canonical handoff.** All confirmed as contracts. None built, none released, none verified. |

---

## 8. Findings carried from the audit

Full detail and the seven-item legacy risk register are in `CURRENT_SITE_AUDIT.md` §19 and
its consolidated findings table. Summary: **17 findings — 0 P0, 9 P1, 8 P2.**

The previous P0 (A-01) is re-graded to P1 hygiene. Its security half is owner-side and closed
by the owner's own statement, which this project accepts without claiming to have verified;
its remaining half is a repository-hygiene action, tracked as L-R1.

**Two findings had their cause revised rather than their severity.** A-06 (missing routes) is
larger than first stated, because the target now includes an authenticated tree whose outer
boundary is unresolved. A-07 (no submission path) is no longer blocked by missing
information — a contract exists for 27 surfaces — but by §14 plus the empty activation
register.

---

## 9. What this project cannot deliver, and why

Recorded so that nobody plans around a promise that cannot be kept.

| Not deliverable | Reason |
|---|---|
| Any end-to-end verification | §14 forbids calling any product system, staging included. C-14, owner decision 1. |
| The authenticated tree behind a public URL | The privacy policy is launch-blocking and materially larger than previously scoped. C-22. |
| A testimonial surface matching the owner's stated mechanism | MF-01. The confirmed payload has no media field. |
| Any hot lead alerting section, copy or visual | MF-02. No contract, no cleared wording, no evidence. `CLAUDE.md`'s mandate cannot be honoured. |
| A decision on how much of the product the website hosts | MF-03, C-27. |
| Any price, quota or feature-to-package mapping authored in the website | Prices are served, never authored (R6). |
| Any named property portal integration | Not in the handoff. Rejected, unchanged. |
| Any vendor logo | Trademark permission, not evidence. |
| Voice as a present-tense capability | A plan-gated channel connection is not voice AI. C-16. |
| A working chat, voice or WhatsApp concierge on the website | `RESERVED`. Do not implement. |
| A demo booking backend | `PROPOSED`. The existing scheduling tool remains an external option. |
| Product photography, video or captures | None exists, and fabricating any is a P0 violation. Every product surface ships as an honest pending frame. |
| Clearance of any legal dependency | No chat may clear a legal hold. |

---

## 10. Change log

| Date | Entry |
|---|---|
| 2026-08-30 | Branch created from `main` @ `9943660`. Owner's uncommitted changes preserved; no reset, no history rewrite. |
| 2026-08-30 | Phase 0 governance layer written: governance, audit, integration contract, this file. |
| 2026-08-30 | **Binding owner directive:** the separate product and automation project is near completion and must not be touched. `MASTER_GOVERNANCE.md` §14 (isolation, CTA lockdown) and §15 (release and access discipline) added. R8 rewritten. |
| 2026-08-30 | Four source-of-truth documents delivered by independent instances. |
| 2026-08-30 | Canonical technical handoff delivered by the backend team, in an untracked directory. |
| 2026-08-31 | Reconciliation, compatibility matrix and integration plan delivered by the reconciliation instance (rank 6). |
| **2026-08-31** | **Wave A4 — Governance and Contract Update.** Authority ranking adopted as `MASTER_GOVERNANCE.md` §3, with rule 7: no implementation chat may override it. Eleven-value status vocabulary adopted as §16; `LIVE` and `PRODUCTION READY` removed from the project vocabulary. Integration boundaries adopted as §17: the frontend does not duplicate backend authority, no secret reaches the browser, sensitive actions run server-side, no legacy n8n hardcoding enters the new implementation, staging and production are config-driven. Eight gate categories defined as §5.2. CTA hierarchy §11 rewritten to a two-ladder model, because the previously mandated primary CTA cannot be implemented as written. §5 gate corrected to 4 of 4. R9 corrected: previews are deployments and are not exempt. §12 extended with per-file staging discipline. §18 added: a precise proposed replacement block for `CLAUDE.md`, prepared but **not applied**. |
| **2026-08-31** | **`INTEGRATION_CONTRACT.md` rewritten.** Four-value vocabulary withdrawn. Fifteen capabilities previously recorded as non-existent re-statused to `BACKEND CONFIRMED` + `WEBSITE INTEGRATION PENDING` + `END TO END VERIFICATION PENDING`: signup, login, logout, the 14 day trial, self-service onboarding, progress and resume, branding, team and roles, CRM selection, Nuova CRM, property source, agency website as a source, Property Experience entry, entitlements, plans, subscription state, checkout handoff, testimonial submission, pending review, and the exactly-once extension. Boundaries preserved: demo booking backend `PROPOSED`, the scheduling tool an existing external option only, voice and WhatsApp concierges and the chat assistant `RESERVED`, hot lead alerting `BLOCKED`, the dashboard destination open, testimonial and the extension `LEGAL REVIEW PENDING`. Twelve missing fields named. Activation register still empty. |
| **2026-08-31** | **`CURRENT_SITE_AUDIT.md` amended.** `/v2` inventory corrected — one component was omitted entirely, and the whole concept was mis-recorded as committed code when it is the owner's untracked work. A-01's disagreement across three documents recorded rather than papered over. Seven-item legacy risk register added, with no secret content and **no remediation performed**. Findings re-graded to 17: 0 P0, 9 P1, 8 P2. |
| **2026-08-31** | Three commit collisions recorded documentarily (§6). **No history rewritten.** |
