# INTEGRATION CONTRACT — NuovaSolution Website

**Owner of this document:** Master Website Director (implementation instance), Wave A4
**Created:** 2026-08-30
**Rewritten:** 2026-08-31 against `backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v1.md`
**Branch:** `website_enterprise_redesign`
**Binding under:** `MASTER_GOVERNANCE.md` §6 (honest states), §14 (isolation), §16 (status
vocabulary), §17 (integration boundaries), R7

> **Nothing in this document is verified.** Every backend status restates what the canonical
> handoff says. Every website status describes what exists in this repository, which today is
> nothing: no API route, no form, no network call. **No production readiness claim is made,
> and the words `LIVE` and `PRODUCTION READY` are not used.**

---

## 1. Purpose and scope

Every interactive action on the website is defined here **before** it is built. No button,
link, tab or form ships without an entry in this document.

This is a derived record. It restates the canonical handoff (rank 1) and the governance
layer. **It never originates a technical fact, an endpoint, a field, a status value, a price
or a capability.**

---

## 2. Hard rules

1. **No invention.** No endpoint, path, payload field, status value, URL, secret, token,
   environment variable *value*, phone number, price or number outside the canonical handoff.
   Environment variable **names** only.
2. **No fake success.** A control never displays a success state for something that did not
   happen.
3. **No dead control.** Every action has a defined behaviour in all five UI states (§4).
4. **No silent failure.** Errors are visible, human, and offer a real alternative path.
5. **Absolute isolation** (`MASTER_GOVERNANCE.md` §14). The separate NuovaSolution product
   and automation project on NuovaSolution's own n8n server is near completion and must not
   be touched or put at risk. From this repository: **no real webhooks, no workflow changes,
   no server access, no database changes, no integration tests.** Every dependency on the
   product side is recorded here as a **written information request**, never as an action.
   **Production remains untouched.**
6. **The legacy n8n Cloud connection is retired.** It must not be used, called, tested,
   repaired or repointed, and **no legacy n8n hardcoding may enter the new implementation**
   (§17.4). Its credential is handled by the owner outside this project and is never
   reproduced here.
7. **Product CTA lockdown** (§14.3). Until the owner grants explicit, **per-action** release
   recorded in the activation register (§11), every product CTA remains a disabled or clearly
   marked placeholder. **The arrival of a backend contract is not a release.** The
   implementation instance never self-authorizes an activation and never treats a documented
   contract, a plausible-looking URL or a repository-found value as confirmation.
8. **The frontend does not duplicate backend authority** (§17.1). Trial status, remaining
   days, entitlements, plan, subscription state, progress and step status are read and
   rendered, never computed, inferred or reconstructed. The website never grants an
   entitlement, an extension or a completion state, and never hardcodes a trial length, an
   extension length, a price, a quota or a plan name.
9. **No secret reaches the browser** (§17.2). The browser holds the publishable key and the
   end user's own session token, and nothing else. A service-role key, provider client
   secret, webhook secret or any provider token in a public-prefixed variable, in the client
   bundle, or in a browser response is a **release blocker**.
10. **Sensitive actions run server-side** (§17.3). Provisioning, progress writes, storage
    administration, signed-URL minting, provider OAuth start and token exchange, checkout,
    and every moderation or billing read run in the server-side boundary. Provider callbacks
    and payment webhooks are server routes only, with signatures verified server-side.
11. **Staging and production are separated by configuration** (§17.5). Every target comes
    from an environment variable; no target is hardcoded in source; switching environment is
    a values-only change.
12. **Book a demo is optional and is never a prerequisite to starting a trial.** No journey
    routes a trial signup through a sales call. **No phone call is required for a trial.**

---

## 3. Status vocabulary

Defined and binding in `MASTER_GOVERNANCE.md` §16:

`BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` · `WEBSITE IMPLEMENTED` ·
`WEBSITE VERIFIED` · `END TO END VERIFICATION PENDING` · `LEGAL REVIEW PENDING` ·
`OWNER DECISION PENDING` · `RESERVED` · `PROPOSED` · `BLOCKED` · `REJECTED`

**The previous four-value vocabulary (`LIVE`, `PREPARED`, `PENDING`, `BLOCKED`) is
withdrawn.** It conflated "the backend does not have it" with "the website has not built it
yet", which is precisely the error this rewrite exists to correct.

Three questions are answered independently, and every surface below answers all three:

| Column | Answers |
|---|---|
| **Backend** | Does a contract exist in the canonical handoff? |
| **Website** | Does code exist in this repository? |
| **Publishable** | May the public site say it? Governed by `CLAIMS_MATRIX.md` alone. |

**Every surface in this document also carries `END TO END VERIFICATION PENDING`**, without
exception, and under §14.4 that status cannot currently be closed by anyone. It is stated
once here rather than repeated in every row.

### 3.1 Honest states

- **`Connection pending`** — contract-confirmed but not released or not wired. Offers the
  working fallback.
- **`Request access`** — gated. Only exists once the request path resolves to something real.
- **`Book a demo`** — the working fallback, an existing external scheduling option outside
  the product boundary.

A disabled control always states *why*, in one short line, in the active language.

---

## 4. Global requirements for every action

| Aspect | Requirement |
|---|---|
| Loading | Control stays mounted at fixed dimensions. No layout shift. Spinner or progress only after 300 ms. `aria-busy="true"`. Non-resubmittable while in flight. |
| Success | Explicit, specific confirmation of what happened and what happens next. Never a generic acknowledgement. Focus moves to the confirmation. `role="status"`. |
| Error | Human-readable cause, a retry affordance, and a real alternative path. Never a raw error code. `role="alert"`. A support reference is offered only as a copyable affordance, never as the headline. |
| Disabled | Visually distinct, `aria-disabled`, with a one-line reason. Never a control that looks active but does nothing. |
| Analytics | Every action fires a namespaced event. Events are named below and must be implemented; **none exist today**. |
| Language | All five states exist in EN and ES, sourced from `COPY_AND_CONVERSION_MASTER.md`, written natively rather than translated. |
| Accessibility | Keyboard reachable, visible focus ring, 44 × 44 px minimum touch target, correct role and label. |
| Privacy | Any action collecting personal data requires a lawful basis, a privacy line at the point of collection, and an accurate privacy policy. GDPR and Spanish LSSI-CE apply. |

### 4.1 Response handling, uniform across every server-boundary surface

The backend returns a uniform envelope carrying an `ok` flag, a `code`, a display-safe
`message`, a `details` object and a `request_id`. Required frontend treatment:

| Class | Treatment |
|---|---|
| Success | State what happened and what happens next. |
| Accepted but awaiting an external provider | **Render as pending. Never as done.** Release-blocking invariant (§6.1). |
| Invalid input | Field-level error, `aria-invalid`, `aria-describedby`. |
| No session / expired session | Refresh once, retry once, then route to login. |
| Forbidden — not on plan | **Upgrade path, not an error treatment.** |
| Forbidden — cross tenant | Generic refusal. Never disclose the other tenant's existence. |
| Conflict | Distinct copy per case. |
| Unprocessable | Field-level, e.g. a missing explicit consent. |
| Degraded | Warn plus "action recommended". Not a hard error, and not a healthy state. |
| Rate limited | Human message plus a retry affordance. |
| Server error | Never leak internals. Offer the support reference as a copyable value only. |

**The enumeration of `code` values is absent from the canonical handoff.** It is named as
missing field **MF-04** and blocks all error copy.

### 4.2 Step and connection status values

Eight values are confirmed. Each renders as **icon + text + colour**, never colour alone.

| Status | Kind | UI intent |
|---|---|---|
| `completed` | wizard step | Done, verified server-side |
| `needs_action` | wizard step | Prompt the action |
| `externally_pending` | wizard step | Waiting on an external provider. **Never shown as done** |
| `locked_by_plan` | wizard step | Upgrade path, **not an error** |
| `optional` | wizard step | De-emphasised |
| `connected` | connection health | Live and healthy |
| `degraded` | connection health | Impaired. Additive, not a hard error, not healthy |
| `action_required` | connection health | A real problem the owner must resolve |

**The agency never sees technical identifiers** in any of these states (§17.3).

---

## PART A — Public and marketing actions

The eleven actions originally listed, re-statused against the canonical handoff.

---

### A1. Start the 14 day trial

**Was:** `BLOCKED` — "no signup system, no auth provider, no billing provider, no tenant
provisioning exists." **That statement is withdrawn. It is no longer true.**

| Field | Value |
|---|---|
| Backend | **`BACKEND CONFIRMED`.** A signup surface creates the confirmed user, bootstraps the tenant and its owner-level membership, and **starts the 14 day trial with the account**. There is no separate trial call. |
| Website | `WEBSITE INTEGRATION PENDING` |
| Publishable | **`OWNER DECISION PENDING`** on the commercial wording |
| Required inputs | Name, email, password, language, agency name. Public, with captcha and rate limiting. |
| Loading | Submit locked, width locked, `aria-busy`, spinner only after 300 ms. |
| Success | States that the account and the trial were created and what happens next. Continues to onboarding if a session is returned, otherwise routes to login. |
| Error | Existing-email conflict gets distinct copy and a route to login. Invalid input is field-level. Rate limiting gets a human message and a retry. A fallback path is always offered. |
| Disabled | **Under the §14.3 lockdown the control ships as a clearly marked placeholder** routed to *Book a demo*, until individually released. |
| Analytics | `cta_trial_start_click`, `signup_form_open`, `signup_form_submit`, `signup_form_success`, `signup_form_error` |
| Server-side only | Provisioning, trial seed, password handling. **Never browser-side.** |

**What is confirmed:** the trial exists, is 14 days, and starts at signup.

**What is not confirmed, and may therefore not be written:** the word **free**; whether a
payment method is required at signup; the day-15 commercial wording. `CLAIMS_MATRIX.md`
forbids *"Free trial"*, *"Start free"*, *"Try free"* and *"No credit card required"* as
separate items, and the handoff never uses the word "free".

> **The phrase "Start your 14 day free trial" may not be implemented as written**
> (`MASTER_GOVERNANCE.md` §11.1). The duration is defensible. The commercial framing is not.

**Blocking:** MF-08 (captcha provider), MF-09 (accepted `language` values). Legal: the
privacy policy must cover account creation before any public signup surface exists.

---

### A2. Book a demo

| Field | Value |
|---|---|
| Backend | **No product backend, and none is required.** A demo-booking endpoint appears in the handoff annotated **`PROPOSED`**, and the handoff states plainly that no certified backend endpoint exists. |
| Website | Existing external scheduling option, currently wired unsafely |
| Publishable | Approved, **without any duration or outcome promise** until the owner supplies one |
| Required inputs | Handled by the external scheduling tool. |
| Loading | Embed load is tracked. If not ready within a defined timeout, the anchor's real `href` carries the visitor to the booking page. |
| Success | The external tool's confirmation. The site registers the conversion event. |
| Error | If the embed fails or is blocked, **navigation to the real URL happens**. Never `preventDefault()` into nothing. |
| Disabled | Never disabled. This is the working fallback for every locked action. |
| Analytics | `cta_demo_click`, `demo_embed_open`, `demo_embed_fallback_direct`, `demo_booking_complete` |

**Scope, stated precisely.** The existing scheduling tool is documented as an **existing
external option only**. It is not a product system, it does not become one, and it is not
treated as evidence of any product capability. **Booking a demo is optional and is never a
prerequisite to starting a trial. No phone call is required for a trial.**

**Carried defect (audit A-02, P1):** the current implementation is `href="#"` plus
`preventDefault()`. If the embed script is blocked, fails, or has not initialized, the CTA
does nothing on every page. The rebuild must use progressive enhancement: the anchor's `href`
is the real booking URL, and the embed intercepts it only once ready.

**Missing information:** confirmation that the configured booking event is current; whether a
separate event is needed per language.

---

### A3. Experience Nuova

| Field | Value |
|---|---|
| Backend | **Nothing in the canonical handoff.** No contract of any kind. |
| Website | Exists today as a fully client-side simulation on local heuristics. No network call, no model. |
| Publishable | **`OWNER DECISION PENDING`** on the disclosure wording |
| Required inputs | The typed message only, in the simulated form. |
| Loading | Reserved-height response area. Never a shifting layout. |
| Success | Renders the simulated outcome, followed by the CTA ladder. |
| Error | Falls back to a pre-scripted scenario rather than failing blank. |
| Disabled | Not disabled. It degrades to the simulation with honest labelling. |
| Analytics | `experience_open`, `experience_scenario_select`, `experience_input_submit`, `experience_complete`, `experience_cta_click` |

**Truth constraint (P0 risk).** Presenting a client-side simulation as the working product is
a false claim under R3 and R6. It ships **only** with a cleared, visible, pre-interaction
simulation label, in both languages. The exact wording is a `CLAIMS_MATRIX.md` decision the
owner must settle.

---

### A4. Log in

**Was:** `BLOCKED` — "no auth system, no app URL, no session handling." **The auth half of
that statement is withdrawn.**

| Field | Value |
|---|---|
| Backend | **`BACKEND CONFIRMED`.** Password login, logout and session refresh are all defined against the confirmed identity provider. |
| Website | `WEBSITE INTEGRATION PENDING` |
| Publishable | The label is cleared in principle |
| Required inputs | Email, password. |
| Loading | As A1. |
| Success | Routes to the persisted resume position, **never to step one**. |
| Error | Invalid credentials get one non-enumerating message. **No account-existence disclosure.** |
| Disabled | **`Log in` does not render as a link until its destination exists.** Rendering it against an invented URL is forbidden (R7). |
| Analytics | `nav_login_click`, `login_submit`, `login_success`, `login_error` |
| Session handling | Prefer server-rendered session cookies over browser storage. Every authenticated call carries both the publishable key and the user's own token. On an expired session: refresh once, retry once, then route to login. |

**What remains blocked:** the destination after onboarding completes. No dashboard URL,
route or ownership statement exists anywhere. This is missing field **MF-03**, and it is the
largest open scope question in the project: without it the website cannot know whether it is
building a marketing site plus an onboarding wizard that hands off, or the entire
authenticated application.

---

### A5. Talk to Nuova

| Field | Value |
|---|---|
| Backend | Nothing. The label maps to no defined behaviour anywhere. |
| Website | Retired |
| Publishable | **`REJECTED` as a label.** Not used on the site. |

The label is withdrawn from the CTA vocabulary. An ambiguous CTA dilutes the hierarchy and
cannot be given honest states. If the owner later defines a behaviour, it enters this
document as a new action with its own contract.

---

### A6. Request a call

| Field | Value |
|---|---|
| Backend | **Nothing in the canonical handoff.** No callback contract exists. |
| Website | Not built |
| Publishable | `OWNER DECISION PENDING` |
| Disabled | The control routes to *Book a demo* rather than rendering a form that goes nowhere. |
| Analytics | `cta_request_call_click`, `call_form_submit`, `call_form_success`, `call_form_error` |

**Not built in this wave.** A committed response window may not be invented (R6), and phone
number storage requires a lawful basis and an accurate privacy policy first.

---

### A7. Chat with Nuova — the website assistant

| Field | Value |
|---|---|
| Backend | **`RESERVED`.** The handoff reserves a future sales-bot turn endpoint and states plainly: **do not implement.** |
| Website | Not built, and **not to be built in this wave** |
| Publishable | No |
| Disabled | Either the launcher is **omitted**, or a designed pending panel offers *Book a demo*. |

> **A chat launcher that accepts input and never answers is a P0 violation.**
> **No chat launcher ships in this wave.**

Visual preparation is permitted. Live behaviour, any availability implication and any
present-tense wording are forbidden.

---

### A8. WhatsApp — the public CTA

| Field | Value |
|---|---|
| Backend | The handoff confirms **the agency connecting its own** WhatsApp channel (see B8). It says nothing about a NuovaSolution business number for the marketing site. |
| Website | **`BLOCKED`** |
| Publishable | No |
| Disabled | **The control does not ship.** No number exists anywhere and inventing one is forbidden (R7). |

**Two different things must not be conflated:** an agency connecting its own WhatsApp channel
inside onboarding is `BACKEND CONFIRMED`; a NuovaSolution business WhatsApp number for a
public marketing CTA does not exist. Conflating them is a P0 finding.

The **website WhatsApp sales concierge** is separately `RESERVED`, same treatment as A7.

---

### A9. Select package

**Was:** `BLOCKED` — "no pricing page, no billing provider, no packages defined." **That
statement is withdrawn.**

| Field | Value |
|---|---|
| Backend | **`BACKEND CONFIRMED`.** A plans list, a subscription state read and a checkout handoff are all defined. Three internal plan identifiers exist. |
| Website | `WEBSITE INTEGRATION PENDING` |
| Publishable | **`OWNER DECISION PENDING`** on public plan names, feature-to-package mapping, quotas, and whether prices are shown publicly at all |
| Required inputs | A plan identifier. |
| Loading | Price cells have reserved height so a period toggle cannot change the layout's height. |
| Success | Hands off to the returned checkout destination. |
| Error | An "already subscribed" conflict routes to the current plan rather than erroring. |
| Disabled | Under the §14.3 lockdown, every package control ships as a marked placeholder routed to *Book a demo*. |
| Analytics | `pricing_view`, `pricing_period_toggle`, `pricing_package_select`, `pricing_checkout_start`, `pricing_checkout_error` |
| Server-side only | Payment secret and price identifiers. **Never browser-side.** |

> **Prices are served, never authored (R6).** The page renders the display value returned by
> the backend. The website never hardcodes a figure, a currency, a tier name or a quota, and
> never implies a quota visually — no bars, no dots, no "up to", no comparative column
> heights.

**A new dependency, and an important one.** The backend serves the plan **name** as well as
the price. If the website authors different public names, the site and the backend will
disagree at runtime. The owner must confirm which names are configured.

**Blocking:** MF-10 (currency and tax basis; whether the served name is the public marketing
name). Legal: Spanish IVA handling must be stated explicitly.

---

### A10. Testimonial submission and the trial extension

**Was:** `BLOCKED` — "depends entirely on the trial, which is itself blocked." **The
technical half is withdrawn. The legal hold is not.**

| Field | Value |
|---|---|
| Backend | **`BACKEND CONFIRMED`.** Submission is stored **pending moderation** and returns a pending state. A status read returns `pending`, `approved` or `rejected`. On owner approval the trial subsystem applies the extension through a **manual approval gate**. |
| Website | `WEBSITE INTEGRATION PENDING` |
| Publishable | **`LEGAL REVIEW PENDING`, and DISABLED for public display** |
| Required inputs | Rating, quote, author name, author role, and an **explicit** consent. |
| Loading | Submit locked, width locked, `aria-busy`. |
| Success | **Only** wording equivalent to "Received. Pending review." **Never any wording implying the extension is granted.** |
| Error | A missing consent is a field-level error on an explicit control. **Never a pre-ticked box.** |
| Disabled | Authenticated surface only. **Not linked from any public page.** |
| Analytics | `testimonial_open`, `testimonial_submit`, `testimonial_success`, `testimonial_error`, `testimonial_status_view`, `trial_extended_view` |
| Server-side only | Moderation state and the publish decision. |

**Binding rules.**

- **The website never grants the extension, never computes it, and never hardcodes the
  number of days.** It renders the updated trial end date returned by the backend. The
  authoritative source is the trial status read, not any figure written into the site.
- **The website has no approval surface and must not build one.** Approval is manual and
  owner-side.
- Only owner-approved testimonials are ever published.

**The legal hold stands and is not lifted by the technical confirmation.** Incentivised
testimonials fall under EU unfair commercial practices rules; a submitted video is personal
data; consent, purpose limitation, retention and any later marketing use are separate
consents; contract terms belong in terms and conditions, not in marketing copy. The mechanism
may be built behind authentication. **It may not appear in public marketing copy, a FAQ, a
footnote or a tooltip, in any wording, in either language.** Publishing it is a P0 finding.

**`BLOCKED` on a contract gap.** The confirmed payload carries a rating and text only — **no
media field**. The owner-defined mechanism is video-first. There is no upload field, no video
reference field and no media handling in the testimonial contract. This is missing field
**MF-01**, and the submission surface cannot match the stated mechanism until it is supplied
or video is declared out of scope.

**MF-12** additionally leaves it ambiguous whether submission is authenticated-only or also
public with captcha. The two imply different surfaces and different placements.

---

### A11. Request access

| Field | Value |
|---|---|
| Backend | Nothing. |
| Website | Not built |
| Disabled | If it does not resolve to something real, **this control must not exist.** It routes to *Book a demo* instead. |

Retained only as the named fallback primitive. Until a destination exists, *Book a demo* is
the only honest fallback anywhere on the site.

---

## PART B — Confirmed backend surfaces

Every surface below is **`BACKEND CONFIRMED` + `WEBSITE INTEGRATION PENDING` + `END TO END
VERIFICATION PENDING`**, and every one is under the §14.3 lockdown until individually
released. Shared properties, stated once: authenticated; privileged writes require the
appropriate permission; **every call runs through the server-side boundary**; loading uses
reserved height and the 300 ms spinner rule; errors follow §4.1; mobile is composed
separately at 375 px; the privacy policy must be accurate before any of it is publicly
reachable.

---

### B1. Signup, tenant bootstrap, owner membership
Covered as A1. Server-side provisioning only. The browser never performs it.

### B2. Login · B3. Logout · B4. Session refresh
Covered as A4. Login and logout are native to the identity provider and are the only
browser-safe authenticated calls in the entire contract. **Tenant and role are derived
server-side from the verified session; the client never sends a privileged tenant identifier
or role** (§17.1).

### B5. Trial status

| | |
|---|---|
| Returns | Status, plan, trial end date, days remaining, account state. |
| Status values | `trialing`, `trial_expired`, `active`, `past_due`, `suspended`, `canceled`. |
| Binding rule | **Never computed client-side.** The countdown is derived from the returned end date. The website never hardcodes 14. |
| Expiry behaviour | On expiry, premium features resolve to denied and the UI shows conversion prompts. **Login is never blocked.** The user always reaches their account. |
| Loading | Reserved height so the banner cannot shift the page. |
| Error | On an expired session, refresh once and retry once. On any other failure the banner **renders nothing rather than a guess**. |
| Mobile | Single line, never covering the primary action, inside the safe area. |
| Analytics | `trial_status_view`, `trial_expired_view`, `trial_expired_cta_click` |
| Publishable | `OWNER DECISION PENDING` on day-15 commercial wording |

**Trial reminders are not in the contract.** Cadence, and whether reminders are backend-sent
or website-rendered, are unspecified: missing field **MF-06**.

### B6. Self-service onboarding — the ten step wizard

**Was:** recorded across the governance layer as an open question of whether a self-service
onboarding flow exists at all. **That question is answered: it does.**

| | |
|---|---|
| Projection | One read returns the whole wizard: percentage complete, the resume position, completed steps, the total, whether the tenant is activatable, a legend, and the step list. |
| Progress and resume write | A touch write persists where the agency is, with a visit or skip action, and returns the updated resume position and percentage. Requires the user-management permission. |
| Binding rule | **Progress is rendered from the backend value, never computed client-side.** |
| Resume | **Land on the persisted resume position. Never restart at step one.** |
| Loading | Step-list skeleton at the measured height. |
| Error | A forbidden touch write renders the wizard read-only rather than failing the page. |
| Mobile | Hairline index rows, **not a card grid**. |
| Analytics | `onboarding_open`, `onboarding_step_view`, `onboarding_step_skip`, `onboarding_progress` |

**Blocking:** the per-step detail shape is unspecified — missing field **MF-05**.

**The ten steps, all `BACKEND CONFIRMED`:**

| # | Step | Confirmed behaviour |
|---|---|---|
| 1 | Account | Completes when a contact email is present. |
| 2 | Agency | Company name, website, address, phone, legal and footer details, preferred languages. Completes at name plus timezone. |
| 3 | **Branding** | Logo, email banner, footer and signature, preview. See B7. |
| 4 | **Team and roles** | Completes at one or more active employees. See B9. |
| 5 | Communication | Email, WhatsApp, calendar, and voice when entitled. Pending while external verification is in flight; voice locked when not entitled. See B8. |
| 6 | Lead acquisition | Paid intake channels and social when entitled. Locked by plan when not entitled; pending while provider approval is outstanding; optional when not started. See B10. |
| 7 | **CRM selection** | See B11. |
| 8 | **Property source** | See B12. |
| 9 | **Property Experience entry** | See B13. |
| 10 | Ready | Readiness summary; completes when the tenant is activatable. **Destination BLOCKED on MF-03.** |

**Step names are publishable as names.** Behaviour descriptions inherit their own capability
verdicts.

> **A step in an externally-pending state is never presented as done.** Release-blocking.

### B7. Branding — upload, commit, preview, remove

| | |
|---|---|
| Confirmed | An upload is initialised server-side, which mints a signed upload destination; a commit registers it; a preview read reports what is present; a remove deletes it. |
| Kinds | Logo and email banner. |
| Server-side only | **Signed-URL minting and the privileged storage write.** Never browser-side. |
| Error | Unsupported file type, file too large, cross-tenant asset, and upload-not-found each need distinct copy. |
| Blocking | **MF-07** — accepted content types and the size ceiling are unspecified, so the validation copy cannot be written. |
| Design gap | The design system has no file-upload law: no drop zone, no preview, no progress, no replace, no remove confirmation. Recorded as a gate G5 dependency. |
| Analytics | `branding_upload_init`, `branding_upload_progress`, `branding_commit_success`, `branding_commit_error`, `branding_remove` |

### B8. Provider connections — email, WhatsApp, calendar, voice

| | |
|---|---|
| Confirmed | A connect start returns an authorization destination; a status read reports the connection state. |
| Server-side only | **Client secrets, OAuth state and nonce, token exchange.** The browser never receives a provider token. |
| Voice | Returns a not-on-plan refusal when unentitled. **This is a plan-gated channel connection surface. It is not evidence of any voice AI capability** and may not be used to justify one. |
| Pending | Accepted-but-awaiting-provider **renders as pending, never as done**. |
| Design gap | No OAuth return state is specified: cancelled, provider error, or a connection degrading after being healthy. Gate G5. |
| Blocking | **MF-11** — the provider display name list needed to render "waiting on {provider}". |
| Analytics | `connect_start`, `connect_return`, `connect_status_poll` |
| Publishable | Channel connection is publishable with its existing qualifier. **Named mailbox providers stay forbidden. Voice as a present-tense capability stays forbidden.** |

### B9. Team and roles

| | |
|---|---|
| Confirmed | An invite creates the employee and returns an invited state. **Four roles are confirmed:** agent, team lead, office manager, agency admin. The owner bootstrap role is created at signup. |
| Server-side only | Provisioning and identity binding. |
| Error | Forbidden, cross-tenant employee, and conflict each need distinct copy. |
| Publishable | The four role names may be named **once `CLAIMS_MATRIX.md`'s owning instance updates its verdict**. This document does not change that verdict. |
| Analytics | `team_invite_open`, `team_invite_submit`, `team_invite_success`, `team_invite_error` |

### B10. Lead acquisition connections

| | |
|---|---|
| Confirmed | Per-channel connect surfaces and a status read reporting, per channel, whether it is connected and whether it is ready. |
| Binding rule | **Connected and ready are two different things and must render differently.** |
| Server-side only | Ad tokens and application secrets. |
| Not on plan | **Upgrade path, not an error.** |
| Publishable | With existing qualifiers. **No platform is named anywhere in the handoff**, so no platform name gains clearance from it. |
| Analytics | `paid_connect_start`, `paid_connect_success`, `paid_connect_error`, `paid_status_view` |

### B11. CRM selection, and Nuova CRM as the default

**Two separable things, and they must not be conflated.**

| | |
|---|---|
| **Nuova CRM** | **`BACKEND CONFIRMED`.** The universal Nuova CRM is the **default**, and the step completes with no action required. Publishable, and it directly answers the "we already have a CRM" objection: default in, external optional. |
| **External CRM connection** | **`BACKEND CONFIRMED`.** A provider registry, per-provider OAuth start, connection state, a health probe, mapping validation, and an environment switch for one provider. |
| **Naming the external vendors publicly** | **`OWNER DECISION PENDING`.** The previous rejection rested on "no integration is evidenced anywhere". That ground no longer holds. The commercial and per-tenant readiness question does. Only `CLAIMS_MATRIX.md`'s owning instance may change its own verdict. |
| **Vendor logos** | **`BLOCKED`.** A working adapter is not a trademark licence. |
| Connection health | Reports healthy, degraded or action-required. Degraded warns and recommends action; it is neither a hard error nor healthy. |
| Binding rule | Where a health check reports specific broken field mappings, they are surfaced **in agency language, never as raw technical identifiers** (§17.3). |
| Server-side only | OAuth client secrets, tokens, instance URLs. |
| Publishable | **"Always synced to your CRM" stays `REJECTED`.** The confirmed contract is connection, state and health — not guaranteed synchronisation. "Always" is an absolute. |
| Analytics | `crm_provider_select`, `crm_connect_start`, `crm_connect_success`, `crm_connect_error`, `crm_health_view` |

### B12. Property source, and the agency website as a first-class source

| | |
|---|---|
| Confirmed | A connect surface accepting an agency website, a supported feed, CRM inventory, or another authorized source; and a status read. |
| **Binding, and a genuine differentiator** | **Agency-owned scraped website inventory is a first-class valid source and is never blocked for being scraped.** The status read reports this explicitly. It must be presented as a first-class option, **never as a fallback**. |
| Server-side only | Scrape and feed credentials. |
| Error | Invalid source and unauthorized source need distinct copy. |
| **Named property portals** | **`REJECTED`, unchanged.** The handoff names **no portal**. A generic supported feed is not a named portal integration. **The asymmetry with B11 is deliberate: CRM vendors are named in the handoff, portals are not.** Conflating the two is a P0 finding. |
| Analytics | `property_source_select`, `property_source_connect_success`, `property_source_connect_error` |

### B13. Property Experience entry

| | |
|---|---|
| Confirmed | **The entitlement and the entry state only.** Entitled resolves to available; otherwise it is locked as an add-on. |
| Not confirmed | Every capture capability. None of them appears in the handoff, and each keeps its existing verdict. One capability carrying a sourcing dependency stays `LEGAL REVIEW PENDING`. |
| Binding rule | **The capture wizard belongs to the product lane. The website links to it and must not build a second one.** |
| Locked state | Upgrade treatment, not an error. |
| Analytics | `px_entry_view`, `px_upgrade_click` |

### B14. Entitlements

| | |
|---|---|
| Confirmed | A snapshot returning per-feature resolution and the account state. |
| **Answered question** | **Enforcement is technical and per tenant, not manual.** The word "unlocks" becomes defensible. |
| Binding rule | **Technical entitlement keys are never shown to the agency** (§17.3). The agency sees the product name, never the key. |
| Not confirmed | The feature-to-package mapping and any quota numbers. Both are absent from the handoff and remain `OWNER DECISION PENDING`. |

### B15. Plans, subscription state, checkout handoff
Covered as A9. All three are `BACKEND CONFIRMED`. **Payment secrets and price identifiers
never reach the browser.**

---

## PART C — Reserved, proposed and blocked

| # | Item | Status | Permitted | Forbidden |
|---|---|---|---|---|
| C1 | **Demo booking backend** | **`PROPOSED`** | Documenting the proposed shape, as here | Implementing it, typing it as real, or wiring it |
| C2 | **The existing external scheduling tool** | Existing external option only | Using it, documented as external; fixing the A-02 defect with a real `href` plus progressive enhancement | Treating it as a product system; any duration or outcome promise; making it a prerequisite to a trial |
| C3 | **Website Voice sales concierge** | **`RESERVED`** | Visual preparation, clearly marked as reserved | Any live behaviour, any availability implication, any present-tense wording |
| C4 | **Website WhatsApp sales concierge** | **`RESERVED`** | Same as C3 | Same as C3 |
| C5 | **Website chat assistant** | **`RESERVED`** | A designed pending panel offering *Book a demo*, or omission | A launcher that accepts input and never answers — **P0** |
| C6 | **NuovaSolution business WhatsApp number for a public CTA** | **`BLOCKED`** | Nothing | Inventing a number (R7) |
| C7 | **Hot lead alerting** | **`BLOCKED`** | Nothing | Any copy, any section, any phone mockup, any visual asserting it |
| C8 | **Dashboard destination after onboarding** | **`BLOCKED`** | Nothing | Inventing a URL or assuming the website hosts it |
| C9 | **`Talk to Nuova`** | **`REJECTED`**, retired | Nothing | Using the label at all |

### C7 in detail — hot lead alerting

Three documents want it. The document that is supposed to define it does not contain it: the
canonical handoff has **no notification, alert, subscription or push contract of any kind**.
There is no matrix row for it either, so no cleared wording exists.

`CLAUDE.md` mandates hot lead alerts as a "MANDATORY SELLING POINT" with a required phone
mockup. **That mandate cannot be honoured**, and it is one of the reasons `CLAUDE.md` needs
the controlled update prepared in `MASTER_GOVERNANCE.md` §18.

This is missing field **MF-02**. It is the single highest-value unblock available.

### C8 in detail — the dashboard destination

The confirmed final onboarding step summarises readiness and hands off to a dashboard. No
dashboard URL, route or ownership statement exists anywhere. Missing field **MF-03**.

Until it is supplied, the website cannot decide whether it is building a marketing site plus
an onboarding wizard that hands off, or a marketing site plus the entire authenticated
application. That is a scope question of the largest possible size.

---

## 5. Environment variable names

**Names only. No value appears in this repository or in any document** (R7, §17.2).

**Browser-safe, public-prefixed:** the Supabase project URL, the publishable anon key, the
server-boundary base URL, the publishable checkout key, an application environment flag, and
the captcha site key.

**Server-only, never public-prefixed, encrypted at rest, available to the server runtime
only:** the service-role key, the JWT verification reference, the identity admin URL, the
provider client identifiers and secrets for each connected provider, the CRM client
identifiers and secrets per vendor, the checkout secret and webhook secret, the captcha
secret, and the exact allowed origin.

The exact variable names are listed in the canonical handoff and reproduced in
`INTEGRATION_COMPATIBILITY_MATRIX.md` §5. They are not duplicated a third time here, so that
one list stays authoritative.

**Preconditions before any environment variable is introduced into this repository:** build
output and tooling state must be untracked and the ignore file extended first. See
`CURRENT_SITE_AUDIT.md` §19. Introducing a secret-bearing variable into the repository in its
current state is unsafe by construction.

---

## 6. Missing fields — named precisely

Gaps are named as **exact missing fields**, never as a request for access (§4, R7).

### 6.1 Blocking — the surface cannot be built at all

| ID | Missing field | Blocks |
|---|---|---|
| **MF-01** | A media field on testimonial submission, or a statement that video is out of scope | The testimonial surface (A10) |
| **MF-02** | Any hot lead alerting contract — endpoint, channel, routing, ownership — or a statement that it is out of the website's scope | All hot lead copy, one homepage section, the phone mockup (C7) |
| **MF-03** | The destination after the final onboarding step: a URL, a route, or a statement that the dashboard is inside this website | `Log in` as a rendered link, the wizard exit, the whole authenticated route tree (A4, C8) |

### 6.2 Required before implementation

| ID | Missing field | Blocks |
|---|---|---|
| **MF-04** | The enumeration of `code` values in the response envelope | All error copy and all error state mapping |
| **MF-05** | The per-step detail shape in the onboarding projection | The wizard rendering layer |
| **MF-06** | Trial reminder cadence, and whether reminders are backend-sent or website-rendered | Trial reminder copy and surface |
| **MF-07** | Branding upload limits: accepted content types and the size ceiling | Branding upload UI and validation copy |
| **MF-08** | The captcha provider | Signup and any public form |
| **MF-09** | Accepted values for the language field at signup | Signup form, locale binding |
| **MF-10** | Currency and tax basis carried by the displayed price, and whether the served plan name is the public marketing name | Pricing, plan selection |
| **MF-11** | The provider display name list for pending-state copy | Every externally-pending explanation |
| **MF-12** | Whether testimonial submission is authenticated-only or also public with captcha | Testimonial surface placement |

---

## 7. Information requests to the product and automation project

**Written information requests only.** This project makes no connection, sends no request,
runs no test and changes nothing on the product side (§14). The product project is near
completion and is not to be disturbed; answers arrive as documentation, at whatever time
suits that project.

| ID | Request | Status |
|---|---|---|
| W-01 | Which integration layer serves the public website? | **Answered** by the canonical handoff. The retired connection is not it. |
| W-02 | Confirmed target and payload contract per action | **Answered** for 28 surfaces. |
| W-03 | Storage destination for every submission, so the privacy policy can be accurate | **Open.** Now materially larger: account creation, password handling, sessions, agency and team personal data, uploaded assets, provider tokens held server-side, testimonial consent, payment handoff. |
| W-04 | Whether voice has a real public entry point the website may reference | **Partially answered.** A plan-gated channel connection exists. Nothing about voice AI capability. |
| W-05 | The business WhatsApp number, who answers it, in which languages and hours | **Open.** Not addressed by the handoff. |
| W-06 | The point at which each action is releasable | **Open.** Required for per-action activation. |
| W-07 | The twelve missing fields MF-01 to MF-12, in a subsequent handoff export | **Open.** |

---

## 8. Activation register

Each per-action release is recorded here **before** the corresponding control is wired. An
action not listed in this register is, by definition, still a placeholder.

**A documented contract is not a release. A named endpoint is not a release. Only a written,
per-action owner release recorded in this table is a release.**

| Action | Released by owner | Date | Confirmed target | Verified by |
|---|---|---|---|---|
| *(none)* | — | — | — | — |

**The register is empty.** Every product CTA on the website is therefore a disabled or
clearly marked placeholder, routed to the working fallback.

---

## 9. Summary

| # | Action | Backend | Website | Publishable |
|---|---|---|---|---|
| A1 | Start the 14 day trial | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | OWNER DECISION PENDING ("free") |
| A2 | Book a demo | Existing external option; proposed backend is `PROPOSED` | Wired unsafely, defect A-02 | Approved, no duration promise |
| A3 | Experience Nuova | Nothing | Client-side simulation | OWNER DECISION PENDING (disclosure) |
| A4 | Log in | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | Label cleared; destination BLOCKED (MF-03) |
| A5 | Talk to Nuova | Nothing | Retired | REJECTED as a label |
| A6 | Request a call | Nothing | Not built | OWNER DECISION PENDING |
| A7 | Chat with Nuova | RESERVED | Not built | No |
| A8 | WhatsApp public CTA | BLOCKED | Does not ship | No |
| A9 | Select package | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | OWNER DECISION PENDING |
| A10 | Testimonial and extension | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | LEGAL REVIEW PENDING, DISABLED; BLOCKED on MF-01 |
| A11 | Request access | Nothing | Must not exist until it resolves | — |
| B1–B15 | The confirmed backend surfaces | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | Per `CLAIMS_MATRIX.md`, individually |
| C1–C9 | Reserved, proposed, blocked | See Part C | Not built | No |

**What changed on 2026-08-31.** Fifteen capabilities previously recorded as non-existent are
now contract-confirmed. **Not one of them is closer to shipping.** They moved from "we do not
know whether this exists" to "a contract exists, nothing is built, nothing is verified, and
nothing is released." The lockdown and the legal holds are unaffected.

**Every surface in this document carries `END TO END VERIFICATION PENDING`**, and under
`MASTER_GOVERNANCE.md` §14.4 that status cannot currently be closed by anyone.

---

## Status

Contract rewritten against the canonical technical handoff: eleven public actions
re-statused, fifteen confirmed backend surface groups documented with their five UI states,
nine reserved, proposed and blocked items bounded, twelve missing fields named precisely,
seven information requests tracked, and an empty activation register.

No endpoint was called. No system was contacted. No capability was verified. No release was
granted. **No production readiness claim is made.**

**Implemented and awaiting independent technical and final audit.**
