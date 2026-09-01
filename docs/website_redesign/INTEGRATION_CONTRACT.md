# INTEGRATION CONTRACT — NuovaSolution Website

**Owner of this document:** Master Website Director (implementation instance)
**Created:** 2026-08-30 · **Rewritten:** 2026-08-31 against export-v1
**Rewritten again:** 2026-09-01 — Wave V4, against **export-v2 and its AF addendum**
**Branch:** `website_enterprise_redesign`
**Binding under:** `MASTER_GOVERNANCE.md` §6 (honest states), §14 (isolation, staging clause,
hygiene precondition), §16 (status vocabulary), §17 (integration boundaries), §19 (owner
ratifications), R6, R7

> **Export-v2 supersedes export-v1 entirely. v1 is HISTORICAL** — kept for reference, never
> implemented against, and no status is derived from it. The AF addendum extends v2 for
> AF-01, AF-04 and AF-07 only.
>
> **Nothing in this document is verified.** Every backend status restates what export-v2
> says. Every website status describes what exists in this repository, which today is
> nothing: no API route, no form, no network call. **No production readiness claim is made,
> and the words `LIVE` and `PRODUCTION READY` are not used.**

---

## 1. Purpose and scope

Every interactive action on the website is defined here **before** it is built. No button,
link, tab or form ships without an entry in this document.

This is a derived record. It restates export-v2 (rank 1a), its addendum (rank 1b) and the
governance layer. **It never originates a technical fact, an endpoint, a field, a status
value, a price or a capability.**

---

## 2. Hard rules

1. **No invention.** No endpoint, path, payload field, status value, URL, secret, token,
   environment variable *value*, phone number, price, currency or number outside export-v2.
   Environment variable **names** only.
2. **No fake success.** A control never displays a success state for something that did not
   happen.
3. **No dead control.** Every action has a defined behaviour in all five UI states (§4).
4. **No silent failure.** Errors are visible, human, and offer a real alternative path.
5. **Absolute isolation** (`MASTER_GOVERNANCE.md` §14). No real webhooks, no workflow
   changes, no server access, no database changes, no integration tests. **Production remains
   untouched, permanently.** The single narrow exception is the staging clause in §14.5, and
   **no staging target is approved today**.
6. **The legacy n8n Cloud connection is retired.** Not used, not called, not tested, not
   repaired, not repointed, and **no legacy n8n hardcoding enters the new implementation**.
7. **Product CTA lockdown** (§14.3). Until the owner grants explicit, **per-action** release
   recorded in the activation register (§9), every product CTA remains a disabled or clearly
   marked placeholder. **Neither a backend contract nor an owner ratification of a decision
   is a per-action release.**
8. **The frontend does not duplicate backend authority** (§17.1). Trial status, entitlements,
   plan, subscription state, progress and step status are read and rendered, never computed.
   The website never grants an entitlement, an extension or a completion state.
9. **No secret reaches the browser** (§17.2).
10. **Sensitive actions run server-side** (§17.3). Provider callbacks and payment webhooks are
    server routes only, with signatures verified server-side.
11. **Staging and production are separated by configuration** (§17.5). No target is hardcoded
    in source. **Repository hygiene is a precondition for introducing any of it** (§14.6).
12. **Book a demo is optional and is never a prerequisite to starting a trial.** No phone call
    is required for a trial.
13. **No price is displayed anywhere, from any source** (R6). See §6.
14. **No polling contract exists and none may be invented** (§17.6 item 2).

---

## 3. Status vocabulary

Binding in `MASTER_GOVERNANCE.md` §16:

`BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` · `WEBSITE IMPLEMENTED` ·
`WEBSITE VERIFIED` · `END TO END VERIFICATION PENDING` · `LEGAL REVIEW PENDING` ·
`OWNER DECISION PENDING` · `RESERVED` · `PROPOSED` · `BLOCKED` · `REJECTED`

Export-v2 adds two classifications used below, which are **backend-side** states and do not
replace the eleven:

| Classification | Meaning here |
|---|---|
| **`BACKEND IMPLEMENTATION REQUIRED`** | The backend has confirmed the capability is **not built**, and named what would have to be built. It is neither a website gap nor an unknown. **The website does not fake the missing half.** |
| **`OUT OF SCOPE (website)`** | The backend has confirmed the mechanism exists **internally** and that **no website surface is required**. Not blocked, not pending. **The website builds nothing, and the internal mechanism authorises no public claim.** |

**Every surface below also carries `END TO END VERIFICATION PENDING`**, without exception.
Under §14.5 that status is now **reachable in principle**; it is not closed, and it closes
only when a real verification runs against an owner-approved staging target.

### 3.1 Honest states

- **`Connection pending`** — contract-confirmed but not released or not wired.
- **`Request access`** — gated; exists only once the request path resolves to something real.
- **`Book a demo`** — the working fallback, an existing external scheduling option outside the
  product boundary.

A disabled control always states *why*, in one short line, in the active language.

---

## 4. Global requirements for every action

| Aspect | Requirement |
|---|---|
| Loading | Control stays mounted at fixed dimensions. No layout shift. Spinner or progress only after 300 ms. `aria-busy="true"`. Non-resubmittable while in flight. |
| Success | Explicit, specific confirmation of what happened and what happens next. Focus moves to the confirmation. `role="status"`. |
| Error | Human-readable cause keyed to the stable `code`, a retry affordance, and a real alternative path. Never a raw code as the headline. `role="alert"`. The support reference is offered only as a copyable affordance. |
| Disabled | Visually distinct, `aria-disabled`, with a one-line reason. Never a control that looks active but does nothing. |
| Analytics | Every action fires a namespaced event. **None exist today.** |
| Language | All five states exist in EN and ES, written natively rather than translated. |
| Accessibility | Keyboard reachable, visible focus ring, 44 × 44 px minimum target, correct role and label. |
| Privacy | Any action collecting personal data requires a lawful basis, a privacy line at the point of collection, and an accurate privacy policy. |

### 4.1 Error handling — now keyed to stable codes

Export-v2 confirms the full enumeration. **Error copy is written per `code`, not per HTTP
status.** The uniform envelope carries an `ok` flag, a stable `code`, a display-safe
`message`, a `details` object and a request reference.

**Global codes, any endpoint:**

| Code | Status | Retryable | Treatment |
|---|---|---|---|
| `no_session` | 401 | after refresh | Refresh once, retry once, then route to login |
| `token_expired` | 401 | yes | Same |
| `forbidden` | 403 | no | Plain refusal |
| `cross_tenant` | 403 | no | Generic refusal. **Never disclose the other tenant's existence** |
| `not_on_plan` | 403 | no | **Upgrade path, not an error treatment** |
| `invalid_input` | 400 | no | Field-level, `aria-invalid`, `aria-describedby` |
| `unprocessable` | 422 | no | Field-level |
| `rate_limited` | 429 | yes, after the retry hint | Human message plus a retry affordance |
| `server_error` | 500 | yes | Never leak internals. Offer the request reference as a copyable value only |
| `externally_pending` | 202 | — | **Not an error. Render pending, never as done** |

**Surface-specific codes** are listed with each action below. Backend and internal failures
never surface: no SQL errors, no stack traces, no provider secrets, no internal URLs, no
backend function names.

### 4.2 Step and connection status values

Eight values, and the split is confirmed rather than changed. Each renders as
**icon + text + colour**, never colour alone.

| Status | Kind |
|---|---|
| `completed` · `needs_action` · `externally_pending` · `optional` · `locked_by_plan` | **Wizard step** — these five, and only these five, appear on a step row |
| `connected` · `degraded` · `action_required` | **Connection health** — never on a wizard step row |

**The agency never sees technical identifiers** in any of these states (§17.3).

---

## 5. What export-v2 changed in this document

Recorded so that no reader carries a superseded statement forward.

| # | Previously recorded here | Corrected to |
|---|---|---|
| 1 | "Prices are served, never authored. The page renders the display value returned by the backend." | **Void. No price exists.** The plans response has no price field, and the plan record has no price or currency column. §6 |
| 2 | The word "free" and "no payment method at signup" are unconfirmed | **Both confirmed as backend fact.** The wording still needs its own claims clearance. A1 |
| 3 | Hot lead alerting is `BLOCKED` on a missing field | **`OUT OF SCOPE (website)`.** Internal mechanism, no website endpoint required, none exists. C7 |
| 4 | The testimonial has no media field, so the surface is `BLOCKED` | **`BACKEND IMPLEMENTATION REQUIRED`.** A string media reference exists; a file upload and storage pipeline does not. A10 |
| 5 | Testimonial state is `pending / approved / rejected` | **Six values.** And submission returns a `status` of `pending_review`, not a `state` of `pending`. A10 |
| 6 | The destination after onboarding is the largest open question, `BLOCKED` | **Website-owned, and provisionally decided.** `/{locale}/app`. A4, §7.3 |
| 7 | Footer and signature are part of the branding **upload** surface | **Text fields.** Only the logo and the email banner are uploads. B7 |
| 8 | Twelve missing fields | **Three.** MF-01, MF-08, MF-10. §8 |
| 9 | The error `code` enumeration is unknown | **Confirmed in full.** §4.1 |
| 10 | Provider display names are unknown | **Confirmed**, with voice deliberately generic. B8 |
| 11 | The branding preview shape is unknown | **Confirmed.** B7 |
| 12 | The OAuth return route and parameters are unknown | **Confirmed**, with a single shared callback route. §7 |
| 13 | Connection status may be polled | **No polling contract exists.** §7.4 |
| 14 | The wizard is implicitly sequential | **Not forced linear.** Steps evaluate independently. B6 |

---

## 6. Pricing — there is no price

**This is the single largest correction in this rewrite, and it reverses a statement this
document previously made.**

| | |
|---|---|
| Plans list | **`BACKEND CONFIRMED`.** Returns `{ plans: [ { code, display_name, entitlements_summary } ] }` — **explicitly with no price.** Error: `server_error` (500, retryable). |
| Price, currency, tax | **There is no backend pricing, currency or tax authority at all.** The plan record carries no price column and no currency column. |
| Website behaviour | Display **plan names and entitlement summaries. Display no price**, because there is nothing to render and inventing one is forbidden (R6). |
| Currency, tax basis, Spanish IVA | **`OWNER DECISION PENDING` + `LEGAL REVIEW PENDING`** (MF-10). A missing authority, not a formatting question. |
| Consequence for design | A public price table cannot be built. The access-model presentation is the only pricing presentation available. |

**Typed-client note:** the field names are `display_name` and `entitlements_summary`. The
earlier `name` and `features_summary` are wrong, and so is any `price_display` field. No type
in this project may declare a price field, because doing so would invite one to be filled.

---

## PART A — Public and marketing actions

---

### A1. Start the 14 day free trial

| Field | Value |
|---|---|
| Backend | **`BACKEND CONFIRMED`.** Signup creates the user, bootstraps the tenant and its owner-level membership, and **starts the free 14 day trial with the account.** No separate trial call. |
| Website | `WEBSITE INTEGRATION PENDING` |
| Publishable | Facts confirmed; **the wording still needs its own claims clearance** |
| Required inputs | Name, email, password, language, agency name. Public, with captcha and rate limiting. |
| Loading | Submit locked, width locked, `aria-busy`, spinner only after 300 ms. |
| Success | States that the account and the free trial were created and what happens next. Continues to onboarding if a session is returned, otherwise routes to login. |
| Error codes | `email_exists` (409), `invalid_input` (400), `captcha_failed` (400), `rate_limited` (429, retryable) |
| Disabled | **Under the §14.3 lockdown the control ships as a clearly marked placeholder** routed to *Book a demo*, until individually released. |
| Analytics | `cta_trial_start_click`, `signup_form_open`, `signup_form_submit`, `signup_form_success`, `signup_form_error` |
| Server-side only | Provisioning, trial seed, password handling. |

**Confirmed as backend fact (owner-ratified, §19 items 5 to 8):**

- The trial is **14 days** and it is **free**.
- **No payment method is required at signup.** No card is collected. Auto-charge is off, and
  conversion requires explicit customer authorisation at a later, server-determined checkout.
- **Book a demo is optional.** **No sales call is required to start a trial.**

**What still gates the wording.** The *facts* are settled. The *phrases* — "Free trial",
"Start free", "Try free", "No credit card required" — are separately governed, and only the
claims document's owning instance may clear them. A confirmed fact is not an approved
sentence. Until each phrase is cleared, it does not appear on a page.

**Language field:** constrain the control to `{en, es}` and pass the route locale. Three
concepts must not be mixed: the **website locale** (`{en, es}`), the **customer communication
language** (free text, backend default Spanish, no enumeration constraint), and the
**certified AI runtime languages**, which are a runtime concern and **not** an authorisation
to publish a language count.

**Open:** MF-08, the captcha provider, is an owner decision. Verification happens server-side.

**RS-01, minor:** export-v1 stated that signup creates a confirmed user; export-v2 enumerates
an `email_not_confirmed` error on the token grant. Whether signup auto-confirms, or a
confirmation step exists, is not stated. It affects one success path and is not blocking.

---

### A2. Book a demo

| Field | Value |
|---|---|
| Backend | **`PROPOSED`.** No certified backend endpoint exists. |
| Website | Existing external scheduling option, currently wired unsafely |
| Publishable | Approved, **without any duration or outcome promise** |
| Loading | Embed load tracked. On timeout the anchor's real `href` carries the visitor to the booking page. |
| Error | If the embed fails or is blocked, **navigation to the real URL happens.** Never `preventDefault()` into nothing. |
| Disabled | Never disabled. The working fallback for every locked action. |
| Analytics | `cta_demo_click`, `demo_embed_open`, `demo_embed_fallback_direct`, `demo_booking_complete` |

**Optional, permanently.** Owner-ratified: booking a demo is optional and **is never a
prerequisite to starting a trial**. That is now demonstrably true rather than merely asserted,
because the trial genuinely requires no call and no card. **No journey routes a trial signup
through a sales call.**

**Carried defect (audit A-02, P1):** the current implementation is `href="#"` plus
`preventDefault()`. The rebuild uses progressive enhancement: the anchor's `href` is the real
booking URL, and the embed intercepts it only once ready.

---

### A3. Experience Nuova

| Field | Value |
|---|---|
| Backend | **Nothing in export-v2.** No contract. |
| Website | A fully client-side simulation on local heuristics. No network call, no model. |
| Publishable | **`OWNER DECISION PENDING`** on the disclosure wording |
| Disabled | Not disabled. It degrades to the simulation with honest labelling. |
| Analytics | `experience_open`, `experience_scenario_select`, `experience_input_submit`, `experience_complete`, `experience_cta_click` |

**Truth constraint (P0 risk).** Presenting a client-side simulation as the working product is
a false claim. It ships **only** with a cleared, visible, pre-interaction simulation label, in
both languages.

---

### A4. Log in

| Field | Value |
|---|---|
| Backend | **`BACKEND CONFIRMED`.** Password login, logout and session refresh. |
| Website | `WEBSITE INTEGRATION PENDING` |
| Destination | **No longer blocked.** `/{locale}/app`, provisional and website-owned (§7.3) |
| Error codes | `invalid_grant` (400), `email_not_confirmed` (400) on the token grant; `no_session` (401) on logout |
| Success | Routes to the persisted resume position, **never to step one**. |
| Error | Invalid credentials get one non-enumerating message. **No account-existence disclosure.** |
| Disabled | **Does not render as a live link until the destination route exists** and the control is released per §14.3. |
| Analytics | `nav_login_click`, `login_submit`, `login_success`, `login_error` |
| Session | Prefer server-rendered session cookies over browser storage. Every authenticated call carries both the publishable key and the user's own token. On an expired session: refresh once, retry once, then route to login. |

---

### A5. Talk to Nuova

**`REJECTED` as a label.** No behaviour is defined anywhere. Retired, not used on the site.

---

### A6. Request a call

**Nothing in export-v2.** No callback contract exists. Not built in this wave; the control
routes to *Book a demo* rather than rendering a form that goes nowhere. A committed response
window may not be invented.

---

### A7. Chat with Nuova — the website assistant

**`RESERVED`.** Export-v2 §J reserves the sales-bot surface and says plainly: do not
implement. Either the launcher is **omitted**, or a designed pending panel offers *Book a
demo*.

> **A chat launcher that accepts input and never answers is a P0 violation. No chat launcher
> ships in this wave.**

---

### A8. WhatsApp — the public CTA

**`BLOCKED`.** Export-v2 confirms **the agency connecting its own** WhatsApp channel (B8). It
says nothing about a NuovaSolution business number for a public marketing CTA. No number
exists and inventing one is forbidden (R7). **The control does not ship.**

Conflating the agency's own channel with a NuovaSolution public number is a P0 finding. The
**website WhatsApp sales concierge** is separately `RESERVED`.

---

### A9. Select package

| Field | Value |
|---|---|
| Backend | **`BACKEND CONFIRMED`** for the plans list, the subscription state read and the checkout handoff. |
| Website | `WEBSITE INTEGRATION PENDING` |
| **Price** | **None. See §6.** No price exists in any contract. |
| Publishable | Plan names and entitlement summaries only |
| Checkout | **A server-determined handoff, not a marketing-site payment form.** Returns a checkout destination. |
| Error codes | Checkout: `not_allowed` (403), `already_subscribed` (409, routes to the current plan rather than erroring). Plans: `server_error` (500, retryable). Subscription state: `no_session` (401, retryable) |
| Disabled | Under the §14.3 lockdown, every package control ships as a marked placeholder routed to *Book a demo*. |
| Analytics | `pricing_view`, `pricing_package_select`, `pricing_checkout_start`, `pricing_checkout_error` |
| Server-side only | Payment secret and price identifiers. |

**Removed from this document:** the period toggle and the reserved-height price cell. Both
existed to render a price. There is no price.

---

### A10. Testimonial submission and the trial extension

| Field | Value |
|---|---|
| Backend, written testimonial | **`BACKEND CONFIRMED`.** Submission is stored pending moderation; manual owner approval applies the **exactly-once +7 day extension** through the trial subsystem. |
| Backend, **media** | **`BACKEND IMPLEMENTATION REQUIRED`.** The submit function accepts a **string media reference** only. **There is no file upload or storage pipeline.** |
| Website | `WEBSITE INTEGRATION PENDING` |
| Publishable | **`LEGAL REVIEW PENDING`, and DISABLED for public display** |
| Auth model | **Confirmed:** an authenticated agency user through the server boundary. All testimonial functions are service-role gated. **Not a public one-time link.** |
| Required inputs | Rating, quote, author name, author role, and an **explicit** consent. |
| Success | Returns a status of **`pending_review`**. Wording is only ever equivalent to "Received. Pending review." **Never any wording implying the extension is granted.** |
| Error codes | `submission_already_pending` (409), `extension_already_granted` (409), `submission_id_required` (400), `consent_required` (422), `forbidden` (403) |
| Analytics | `testimonial_open`, `testimonial_submit`, `testimonial_success`, `testimonial_error`, `testimonial_status_view`, `trial_extended_view` |

**Six state values, confirmed** — the previous three-value set was wrong wherever it appeared:

`invited` · `submitted` · `pending_review` · `approved` · `rejected` · `withdrawn`

**`extension_already_granted` is the contract's expression of "exactly once".** It renders as
a plain statement of fact — the extension has already been granted — and **never as an error
implying the agency did something wrong.**

**Binding rules.**

- **The website never grants the extension, never computes it, and never hardcodes the number
  of days.** It renders the updated trial end date returned by the backend.
- **The website has no approval surface and must not build one.** Approval is manual,
  owner-side, and server-only.
- Only owner-approved testimonials are ever published.

**The video half: `BACKEND IMPLEMENTATION REQUIRED` (MF-01).** The owner's stated mechanism is
video plus written before approval. The written half is fully defined. The media half is a
string pointer with nothing behind it.

> **Do not fake a video upload field.** A control that appears to accept a video and has no
> pipeline behind it is exactly the fake-success pattern hard rule 2 forbids.

**The legal hold stands and is not lifted by any technical confirmation.** Incentivised
testimonials fall under EU unfair commercial practices rules; submitted media is personal
data; consent, purpose limitation, retention and later marketing use are separate consents;
contract terms belong in terms and conditions, not marketing copy. The mechanism may be built
behind authentication. **It may not appear in public marketing copy, a FAQ, a footnote or a
tooltip, in any wording, in either language.**

---

### A11. Request access

Retained only as the named fallback primitive. If it does not resolve to something real,
**this control must not exist** — it routes to *Book a demo* instead.

---

## PART B — Confirmed backend surfaces

Every surface below is **`BACKEND CONFIRMED` + `WEBSITE INTEGRATION PENDING` + `END TO END
VERIFICATION PENDING`**, and every one is under the §14.3 lockdown until individually
released. Shared properties: authenticated; privileged writes require the appropriate
permission; **every call runs through the server-side boundary**; loading uses reserved height
and the 300 ms spinner rule; errors follow §4.1; mobile is composed separately; the privacy
policy must be accurate before any of it is publicly reachable.

---

### B1 to B4. Signup · Login · Logout · Session refresh
Covered as A1 and A4. Login, logout and refresh are native to the identity provider and are
the only browser-safe authenticated calls in the contract. **Tenant and role are derived
server-side from the verified session.**

### B5. Trial status

| | |
|---|---|
| Returns | Status, plan, trial end date, days remaining, account state. |
| Status values | `trialing`, `trial_expired`, `active`, `past_due`, `suspended`, `canceled`. |
| Binding rule | **Never computed client-side.** The countdown derives from the returned end date. The website never hardcodes 14. |
| Expiry | On expiry, premium features resolve to denied and the UI shows conversion prompts. **Login is never blocked.** |
| Loading | Reserved height, so the banner cannot shift the page. |
| Error | `no_session` (401, retryable): refresh once, retry once. On any other failure the banner **renders nothing rather than a guess**. |
| Analytics | `trial_status_view`, `trial_expired_view`, `trial_expired_cta_click` |

**Reminders are confirmed and are backend-driven.** Two reminder stages fire before expiry —
at **3 days** and at **1 day** — plus a separate testimonial invitation stage.

> **The website sends nothing.** It reflects the trial end date and the remaining days. It
> does not schedule, trigger or claim to send a reminder.

### B6. Self-service onboarding — the ten step wizard

| | |
|---|---|
| Projection | One read returns the whole wizard: the resume pointer, completed step count, total steps, **needs-action step count**, completion percentage, whether the tenant is activatable, a five-key legend, and the step list. |
| Step keys | `account`, `agency`, `branding`, `team`, `communication`, `lead_acquisition`, `crm`, `property_source`, `property_experience`, `ready` |
| Per step | Step number, key, title, status, a classification of who must act, a locked flag, plus per-step safe detail. **Do not invent step fields beyond the confirmed shape.** |
| **Not forced linear** | **Confirmed.** Each step's status is computed independently from live state. The website may present steps **in any order** and drives completion from status. The resume pointer is a **convenience only**. |
| Progress write | A touch write persists position with a visit or skip action and returns the updated resume pointer and percentage. Requires the user-management permission. |
| Binding rule | **Progress is rendered from the backend value, never computed client-side.** |
| Resume | **Land on the persisted resume position. Never restart at step one.** |
| Error codes | `forbidden` (403) renders the wizard read-only rather than failing the page; `invalid_wizard_action` (400) |
| Mobile | Hairline index rows, **not a card grid**. |
| Analytics | `onboarding_open`, `onboarding_step_view`, `onboarding_step_skip`, `onboarding_progress` |

**Step status is five values only** on a step row. The three connection-health values never
appear there (§4.2).

> **A step in an externally-pending state is never presented as done.** Release-blocking.

### B7. Branding

**Two distinct surfaces, and conflating them was a real error in the previous version.**

**B7a — Uploads: the logo and the email banner only.**

| | |
|---|---|
| Kinds | **`logo` and `email_banner`. Nothing else.** |
| Accepted types | **Image only:** PNG, JPEG, WebP, GIF |
| Size ceiling | **5 MB** |
| Flow | An upload is initialised server-side, which mints a signed upload destination; a commit registers it; a preview read reports state; a remove deletes it. |
| Server-side only | **Signed-destination minting and the privileged storage write.** |
| Error codes | `unsupported_file_type` (400), `file_too_large` (400), `invalid_asset_kind` (400), `cross_tenant_asset` (403), `upload_not_found` (422), `forbidden` (403) |
| Client validation | The accepted types and the size ceiling may now be stated **before** selection and enforced client-side as a courtesy. The server remains the authority. |
| Analytics | `branding_upload_init`, `branding_upload_progress`, `branding_commit_success`, `branding_commit_error`, `branding_remove` |

**Preview shape, confirmed (AF-07).** The preview read returns, for each of the two kinds, a
**durable public URL or null**, plus a **boolean present flag**, plus a human-safe fallback
note stating that missing or invalid assets are omitted so no broken image is ever rendered.
The banner URL is non-null **only when the asset validates**.

- **No storage internals are exposed** — no bucket, no object identifier, no signed URL, no
  credential.
- An agency returning to the step renders its committed assets **from the durable public
  URL**, never from a stale browser object URL.
- The preview object is the **canonical shape**. The commit response carries the same object;
  the shape is **never derived from commit**.

**B7b — Footer and signature: text fields, not uploads.**

> **Correction.** These were previously recorded as a third upload block. **That premise is
> void.**

| | |
|---|---|
| Footer | **Localized legal text.** |
| Signature | A **mode selection** — one of four backend enumeration tokens — **plus text**. |
| Rendering | The **server** sanitizes and renders both into responsive HTML and plaintext. |
| Binding rule | **The website submits plain text only and never injects raw HTML.** |
| Token handling | The four signature-mode values are backend enumeration tokens. They are rendered through the redaction boundary as agency-facing labels, **never raw**. |

### B8. Provider connections — email, WhatsApp, calendar, voice

| | |
|---|---|
| Flow | A connect start returns an authorization destination; a status read reports the connection state. See §7 for the OAuth return. |
| Server-side only | **Client secrets, state and nonce, token exchange.** The browser never receives a provider token. |
| Error codes | `not_on_plan` (403, voice when unentitled), `invalid_provider` (400), `externally_pending` (202) |
| Voice | Plan-gated. **This is a channel connection surface. It is not evidence of any voice AI capability** and may not be used to justify one. |
| Pending | Accepted-but-awaiting-provider **renders as pending, never as done**. |

**Display names, confirmed (AF-04) — for the authenticated tree only, text only, no logos:**

| Channel | Display name |
|---|---|
| Email | **Gmail** — the account the user connects |
| WhatsApp | **WhatsApp** |
| Calendar | **Google Calendar** · **Microsoft Outlook** |
| **Voice** | **Generic only: "Voice" or "Phone".** |

> **Voice stays generic, and this is binding.** The internal voice registry's display values
> are engineering and carrier descriptions — carriers, session border controllers, exchange
> and site details. Rendering them would disclose the internal telephony vendor stack. **No
> internal carrier or vendor name is ever rendered**, and technical existence never implies
> branding permission.

Naming email, WhatsApp and calendar is necessary and safe **because those are the products the
customer actively connects**. It makes the externally-pending note able to name the party the
agency is actually waiting on, which is the entire point of that state.

**This clearance is for the authenticated tree only. Public marketing naming remains a claims
decision, and logos remain blocked for every provider until brand approval.**

### B9. Team, roles and offices

| | |
|---|---|
| Invite | Creates the employee and returns an invited state. **Four roles confirmed:** agent, team lead, office manager, agency admin. |
| **Offices** | **New confirmed surface.** An office list returns, per office, an opaque handle, a display name, and a default flag. Error: `no_session` (401, retryable). |
| Office field | **Optional.** Null means tenant level. |
| **Binding rule** | **The opaque office handle is never rendered.** Offices are shown by display name; the handle is passed back untouched. |
| Role gating | An **office manager may invite only into their own office**; an agency admin into any. |
| Error codes | `forbidden` (403), `employee_cross_tenant` (403), `office_out_of_scope` (403), `invalid_role` (400), `conflict` (409) |
| Analytics | `team_invite_open`, `team_invite_submit`, `team_invite_success`, `team_invite_error` |

### B10. Lead acquisition connections

Per-channel connect surfaces and a status read reporting, per channel, whether it is connected
and whether it is **ready**. **Connected and ready are two different things and must render
differently.** `not_on_plan` (403) is an **upgrade path, not an error**.

**Display names, confirmed:** Google Lead Forms · Meta Lead Ads · Click-to-WhatsApp.
**Never the internal identifiers.**

### B11. CRM selection, and Nuova CRM as the default

| | |
|---|---|
| **Nuova CRM** | **`BACKEND CONFIRMED`.** The universal Nuova CRM is the **default**, and the step completes with no action required. Publishable, and it directly answers the "we already have a CRM" objection: default in, external optional. |
| **External CRM** | **`BACKEND CONFIRMED`.** A provider registry, per-provider OAuth start, connection state, a health probe, mapping validation, and an environment switch for one provider. |
| **Display names** | **Confirmed:** HubSpot · Pipedrive · Zoho CRM · Salesforce. |
| **Naming, authenticated tree** | **Cleared, text only.** |
| **Naming, public marketing** | **`OWNER DECISION PENDING`.** Unchanged by the authenticated-tree clearance. |
| **Logos, everywhere** | **`BLOCKED`** until brand approval. A working adapter is not a trademark licence. |
| Health | Healthy, degraded or action-required. Degraded warns and recommends action; it is neither a hard error nor healthy. |
| Binding rule | Broken field mappings are surfaced **in agency language, never as raw technical identifiers**. |
| Error codes | `invalid_provider` (400), `forbidden` (403), `externally_pending` (202), `degraded` (424) |

**"Always synced to your CRM" remains `REJECTED`.** The confirmed contract is connection,
state and health — not guaranteed synchronisation.

### B12. Property source

| | |
|---|---|
| Confirmed | A connect surface accepting an agency website, a supported feed, CRM inventory, or another authorized source; and a status read. |
| **Binding** | **Agency-owned scraped website inventory is a first-class valid source and is never blocked for being scraped.** It must be presented as first-class, **never as a fallback**. |
| **Property file upload** | **`OUT OF SCOPE (onboarding)`.** Properties arrive by source connect. There is **no website or onboarding file-upload contract for property data**. A direct upload, if ever wanted, is `BACKEND IMPLEMENTATION REQUIRED` and is explicitly **distinct from the panorama capture flow**. |
| Error codes | `invalid_source` (400), `source_not_authorized` (403) |
| **Named portals** | **`REJECTED`, unchanged.** Export-v2 names **no portal**. A generic supported feed is not a named portal integration. **The asymmetry with CRM vendors is deliberate**; conflating them is a P0 finding. |

### B13. Property Experience entry

**The entitlement and the entry state only.** Entitled resolves to available; otherwise it is
locked as an add-on, using the **upgrade treatment, not an error**.

**Asset ownership confirmed:** assets are owned by tenant and property, and publishing **fails
closed** on a cross-property reference.

> **The capture and authoring flow belongs to the product lane. The website consumes the
> entry point and nothing else, and must not build a second capture wizard.**

### B14. Entitlements

A snapshot returning per-feature resolution and the account state. **Enforcement is technical
and per tenant**, not manual. **Technical entitlement keys are never shown to the agency** —
the agency sees the product name, never the key.

**Feature-to-package mapping and quotas do not exist in any contract** and are not authored.

### B15. Plans, subscription state, checkout
Covered as A9 and §6. **No price.** Payment secrets and price identifiers never reach the
browser.

---

## PART C — Reserved, proposed, blocked and out of scope

| # | Item | Status | Permitted | Forbidden |
|---|---|---|---|---|
| C1 | **Demo booking backend** | **`PROPOSED`** | Documenting the shape | Implementing it, typing it as real, or wiring it |
| C2 | **The existing external scheduler** | Existing external option | Using it as external; fixing the A-02 defect | Treating it as a product system; a duration or outcome promise; making it a trial prerequisite |
| C3 | **Website Voice sales concierge** | **`RESERVED`** | Visual preparation, clearly marked | Any live behaviour, any availability implication |
| C4 | **Website WhatsApp sales concierge** | **`RESERVED`** | Same as C3 | Same as C3 |
| C5 | **Website chat assistant** | **`RESERVED`** | A pending panel offering *Book a demo*, or omission | A launcher that accepts input and never answers — **P0** |
| C6 | **NuovaSolution business WhatsApp number for a public CTA** | **`BLOCKED`** | Nothing | Inventing a number (R7) |
| **C7** | **Hot lead alerting** | **`OUT OF SCOPE (website)`** | **Nothing** | Any website surface, section, mockup, imagery, endpoint or copy |
| C8 | **Testimonial media upload** | **`BACKEND IMPLEMENTATION REQUIRED`** · `LEGAL REVIEW PENDING` | Documenting the gap | **Faking a video upload field** |
| C9 | **`Talk to Nuova`** | **`REJECTED`**, retired | Nothing | Using the label at all |
| C10 | **Property file upload in onboarding** | **`OUT OF SCOPE`** | Nothing | Building an upload surface |
| C11 | **Persisted, queryable OAuth cancellation state** | **Backend hardening. NOT a website launch blocker** | Proceeding without it | Treating it as a blocker |

### C7 in detail — hot lead alerting is out of scope, not blocked

> **Correction.** This was previously recorded as `BLOCKED` on a missing backend field. **That
> was wrong.**

Hot-lead surfacing is an **internal** mechanism. The agency is notified through the existing
agent-notification channel and through CRM and dashboard surfacing. **There is no public
website or onboarding endpoint, and none is required.**

- **The website builds nothing for it.** No section, no phone mockup, no alert imagery, no
  endpoint, no copy.
- **No marketing claim is authorised by this.** A mechanism existing internally is not cleared
  wording; there is no approved public phrasing. Any future claim is a fresh claims decision
  with a fresh legal check.
- The old mandatory hot-lead mandate **must not be carried into the new website**
  (`MASTER_GOVERNANCE.md` §18.4, owner-ratified).
- The missing-field register loses this entry entirely.

### C11 in detail — AF-01, and why it does not block

The provider connection record's status vocabulary has **no cancellation value**, so after the
fact a cancellation collapses to a generic error with free-text detail. A **persisted,
queryable** cancellation outcome would require a backend change.

**It does not block the website**, because the distinction exists where the website actually
needs it: at the callback, before any storage. The standard authorisation protocol supplies a
distinct signal when a user denies consent, and the server boundary reads it directly. §7.2
carries the mapping.

**AF-01 is backend hardening, scheduled by the owner and the backend, and explicitly not a
website launch blocker.**

---

## 7. Cross-cutting confirmed contracts

### 7.1 The shared OAuth return route

**One shared website route** receives every provider return:
`/{locale}/connect/callback`, carrying the provider, a status of `success` or `error`, an
opaque correlation value, and a reason code when the status is an error.

> **Correction.** The earlier assumption that the server boundary redirects back to each
> individual step route is superseded. One shared route reads the parameters and routes
> onward.

**The correlation value is the opaque server-issued state and is never a token. The website
never receives a token.**

### 7.2 Outcome classification, and the cancellation distinction

| Provider outcome | Status and reason | Website treatment |
|---|---|---|
| Valid code, exchange succeeds | `success` | `connected`, or pending on a 202 |
| **User denies consent** | `error` / **`user_cancelled`** | **The row returns to its previous status, unchanged. Neutral and resumable. Never an error treatment, never a critical signal.** |
| Any other provider error, or an exchange failure | `error` / `provider_error` | `action_required` |
| Unrecognised, missing parameters, or a state mismatch | `error` / `provider_error` | `action_required` |

**Fail-safe, required.** Anything that is not an explicit successful exchange is an error. An
unknown outcome maps to `provider_error` and **never to success**. A mismatched or absent
correlation is an error.

### 7.3 The destination after onboarding

**Owner-ratified, provisional:** `/{locale}/app`.

The backend owns the **signal** — whether the tenant is activatable, and the activation call.
**It owns no route.** The destination is a website decision, now provisionally made.

- **Settled:** the onboarding exit, the login destination and the authenticated route tree are
  no longer blocked on an unknown.
- **Not settled:** how much of the product the website ultimately hosts. `/{locale}/app` is a
  placeholder destination under a website-owned route, not a decision to build the full
  authenticated application.
- **Provisional is load-bearing.** It is revisited when the product scope is confirmed.

### 7.4 No polling

**There is no backend polling contract and no push channel.**

- Connection status is read **once** after the OAuth return, and **once** on an explicit user
  refresh.
- A conservative auto-refresh is permitted **only as an openly website-owned decision**. It
  must stop on a terminal state, or when the user leaves the step.
- **It is never presented, typed or documented as a backend contract or guarantee.**

### 7.5 Locale routes

**`/en` and `/es`, separate routes.** Owner-ratified and fixed. Route *naming* beyond the
locale segment remains open.

---

## 8. Missing fields — three remain

> **The register shrank from twelve to three.** Six were confirmed by export-v2, one was
> removed as out of scope, one was reclassified to a backend implementation item, and one was
> de-escalated to a website decision.

### 8.1 Open

| ID | Missing field | Classification | Blocks |
|---|---|---|---|
| **MF-01** | A media upload and storage pipeline for testimonials. A string reference exists; nothing stores a file. | **`BACKEND IMPLEMENTATION REQUIRED`** · `LEGAL REVIEW PENDING` | The video half of the testimonial surface. The written half is fully buildable. |
| **MF-08** | The captcha provider | **`OWNER DECISION PENDING`** | Signup and any public form. Verification is server-side. |
| **MF-10** | Currency, tax basis and Spanish IVA | **`OWNER DECISION PENDING` · `LEGAL REVIEW PENDING`** | Nothing that can be built anyway — **no pricing authority exists at all** (§6). |

### 8.2 Closed or reclassified

| ID | Outcome |
|---|---|
| MF-02 hot lead alerting | **Removed. `OUT OF SCOPE (website)`.** |
| MF-03 destination after onboarding | **De-escalated** from a backend gap to a website decision, provisionally made (§7.3). |
| MF-04 error code enumeration | **Confirmed in full.** Error copy is written per code (§4.1). |
| MF-05 step detail shape | **Confirmed**, including the needs-action count and the five-key legend. |
| MF-06 trial reminder cadence | **Confirmed:** 3 days and 1 day before expiry, plus a testimonial invitation stage. Backend-sent. |
| MF-07 upload limits | **Confirmed** for branding: image only, 5 MB, two kinds. **Not defined for anything else**, and nothing else has an upload contract. |
| MF-09 language values | **Confirmed.** Website locale `{en, es}`. Three concepts kept separate. |
| MF-11 provider display names | **Confirmed** for CRM, paid and communication. Voice stays generic. |
| MF-12 testimonial auth model | **Confirmed.** Authenticated agency user through the server boundary. |

### 8.3 AF items

| ID | Outcome |
|---|---|
| **AF-01** OAuth cancellation versus provider error | **Website semantics satisfied now** at the callback (§7.2). A persisted, queryable state is **backend hardening and not a website launch blocker.** |
| **AF-04** Communication provider display names | **Confirmed.** Voice generic (B8). |
| **AF-07** Branding preview shape | **Confirmed.** (B7a). |

### 8.4 Recorded, non-blocking

| ID | Item |
|---|---|
| **RS-01** | Whether signup auto-confirms the user, or a confirmation step exists, is not stated. Affects one signup success path. |
| **RS-02** | The certified AI runtime language count is a backend fact about the runtime. **It is not an authorisation to publish a language count**, and the claims document forbids naming one. |

---

## 9. Activation register

Each per-action release is recorded here **before** the corresponding control is wired. An
action not listed is, by definition, still a placeholder.

**A documented contract is not a release. An owner ratification of a decision is not a
release. Only a written, per-action owner release recorded in this table is a release.**

| Action | Released by owner | Date | Confirmed target | Verified by |
|---|---|---|---|---|
| *(none)* | — | — | — | — |

**The register is empty.** Every product CTA on the website is therefore a disabled or clearly
marked placeholder, routed to the working fallback.

---

## 10. Environment variable names

**Names only. No value appears in this repository or in any document** (R7, §17.2).

**Browser-safe, public-prefixed:** the Supabase project URL, the publishable anon key, the
server-boundary base URL, the publishable checkout key, an application environment flag, and
the captcha site key.

**Server-only, never public-prefixed, encrypted at rest, server runtime only:** the
service-role key, the JWT verification reference, the identity admin URL, provider client
identifiers and secrets per connected provider, CRM client identifiers and secrets per vendor,
the checkout secret and webhook secret, the captcha secret, and the exact allowed origin.

The exact names are listed in export-v2 §H and reproduced in
`INTEGRATION_COMPATIBILITY_MATRIX.md` §5. They are not duplicated a third time here so that
one list stays authoritative.

> **Precondition (§14.6, owner-ratified).** Repository hygiene is closed **first**: build
> output, build information, the retired tooling configuration and local settings untracked,
> ignore rules extended, and the build guard in place. **Only then** may any environment
> variable, any server-boundary configuration or any staging target be introduced.
> `CURRENT_SITE_AUDIT.md` §19 holds the register.

---

## 11. Summary

| # | Action | Backend | Website | Publishable |
|---|---|---|---|---|
| A1 | Start the 14 day free trial | **BACKEND CONFIRMED — free, no payment method** | WEBSITE INTEGRATION PENDING | Facts confirmed; wording needs its own clearance |
| A2 | Book a demo | Existing external option; proposed backend PROPOSED | Wired unsafely, defect A-02 | Approved, no duration promise |
| A3 | Experience Nuova | Nothing | Client-side simulation | OWNER DECISION PENDING |
| A4 | Log in | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | Destination provisionally settled |
| A5 | Talk to Nuova | Nothing | Retired | REJECTED |
| A6 | Request a call | Nothing | Not built | — |
| A7 | Chat with Nuova | RESERVED | Not built | No |
| A8 | WhatsApp public CTA | BLOCKED | Does not ship | No |
| A9 | Select package | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | Names and entitlements only. **No price** |
| A10 | Testimonial, written | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | LEGAL REVIEW PENDING, DISABLED |
| A10 | Testimonial, media | **BACKEND IMPLEMENTATION REQUIRED** | Not built | LEGAL REVIEW PENDING |
| B1–B15 | Confirmed backend surfaces | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | Individually governed |
| C1–C11 | Reserved, proposed, blocked, out of scope | See Part C | Not built | No |

**What export-v2 changed.** Nine of twelve missing fields closed. Six capability corrections.
One large reversal: **there is no price**. One reclassification that removes work rather than
adding it: **hot lead alerting is out of scope**. One honest downgrade: **testimonial media
needs backend work and must not be faked**.

**What export-v2 did not change.** The lockdown, the legal holds, the isolation boundary, the
empty activation register, and the fact that **not one surface is closer to shipping**.

---

## Status

Contract rewritten against export-v2 and its AF addendum: eleven public actions re-statused,
fifteen confirmed backend surface groups documented, eleven reserved, proposed, blocked and
out-of-scope items bounded, five cross-cutting contracts recorded, the missing-field register
reduced from twelve to three, and every price assumption removed.

No endpoint was called. No system was contacted. No capability was verified. No release was
granted. No staging target is approved. **No production readiness claim is made.**

**Implemented and awaiting independent technical and final audit.**
