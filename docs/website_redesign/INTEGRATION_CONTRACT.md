# INTEGRATION CONTRACT — NuovaSolution Website

**Owner of this document:** Master Website Director (implementation instance)
**Created:** 2026-08-30
**Branch:** `website_enterprise_redesign`
**Binding under:** `MASTER_GOVERNANCE.md` §6 (Honest states) and R7 (backend connections
are prepared, never invented)

---

## Purpose

Every interactive action on the website is defined here before it is built. No button,
link, tab or form ships without an entry in this document.

## Hard rules

1. **No invented endpoints, URLs, webhook paths, secrets, tokens, phone numbers, WhatsApp
   numbers or environment variable values.** Environment variable *names* are proposed
   here; their values are supplied by the owner.
2. **No fake success.** A control must never display a success state for something that did
   not happen.
3. **No dead control.** Every action has a defined behaviour in all five states below.
4. **No silent failure.** Errors are visible, human, and offer a real alternative path.
5. **n8n workflows are not created, modified or connected from this project.** Any n8n
   dependency is recorded here as a request to the workflow main project.

## Status vocabulary

| Status | Meaning |
|---|---|
| `LIVE` | Verified working end-to-end against a real target system |
| `PREPARED` | UI and client boundary built; target system confirmed but not yet connected |
| `PENDING` | UI built with an honest placeholder state; target system undecided or unavailable |
| `BLOCKED` | Cannot be built until the owner or the workflow main project supplies information |

**Current reality check:** the existing site has **no API routes, no forms and no backend
calls of any kind**. Cal.com is the only live third-party integration. Therefore every
action below except `Book a demo` starts at `PENDING` or `BLOCKED`.

## The honest-state pattern

Where a target system does not exist yet, the control renders in one of three approved
premium states, and always offers a working alternative:

- **`Connection pending`** — the capability is real but not yet wired. Offers *Book a demo*.
- **`Request access`** — the capability is gated. Opens a real request path.
- **`Book a demo`** — the fallback that always works, because Cal.com is live.

A disabled control must always state *why* it is disabled, in one short line, in the
active language.

---

## Global requirements for every action

| Aspect | Requirement |
|---|---|
| Loading | Control stays mounted at fixed dimensions. No layout shift. Spinner or progress only after 300 ms. `aria-busy="true"`. Control is non-resubmittable while in flight. |
| Success | Explicit, specific confirmation of what happened and what happens next. Never a generic "Thanks!". Focus moves to the confirmation. `role="status"`. |
| Error | Human-readable cause, a retry affordance, and a real alternative path (Book a demo / email). Never a raw error code. `role="alert"`. |
| Disabled | Visually distinct, `aria-disabled`, with a one-line reason. Never a control that looks active but does nothing. |
| Analytics | Every action fires a namespaced event. Events are defined below and must be implemented; none exist today. |
| Language | All five states exist in EN and ES, sourced from `COPY_AND_CONVERSION_MASTER.md`. |
| Accessibility | Keyboard reachable, visible focus ring, 44×44 px minimum touch target, correct role and label. |
| Privacy | Any action collecting personal data requires a lawful basis, a privacy-policy link at the point of collection, and an update to the privacy pages. GDPR + Spanish LSSI-CE apply. |

---

## 1. Start your 14 day free trial

**CTA level:** Primary (site-wide)

| Field | Value |
|---|---|
| Target system | **UNKNOWN — BLOCKED.** No signup system, no auth provider, no billing provider, no tenant provisioning exists. |
| Current status | `BLOCKED` |
| Required inputs | Undetermined. Candidate minimum: work email, agency name, full name, country. Final set depends on what the trial actually provisions. |
| Loading | Submit disabled + `aria-busy`; button label swaps to in-flight copy at fixed width. |
| Success | Must state exactly what was created and what arrives next (email? credentials? a call?). **Cannot be written until the trial mechanics are defined.** |
| Error | Cause + retry + fallback to *Book a demo*. Duplicate-email and invalid-domain cases need distinct copy. |
| Disabled | Until the trial exists, the control renders as **`Connection pending`** and routes to *Book a demo*, or as *Request access* with a real request path. |
| Analytics | `cta_trial_start_click`, `trial_form_open`, `trial_form_submit`, `trial_form_success`, `trial_form_error` |
| Proposed env vars | *(names only, values from owner)* `NEXT_PUBLIC_TRIAL_ENABLED`, `TRIAL_SIGNUP_ENDPOINT` |

**Missing information required from the owner / workflow main project**

1. Does a 14-day trial product exist today, or is it aspirational? *(→ `PRODUCT_TRUTH.md`)*
2. What is provisioned on signup — a real tenant, a sandbox, or a human onboarding call?
3. Which system owns the account: Supabase, a SaaS auth provider, or manual?
4. Is a payment method required at signup?
5. What happens on day 15?
6. Where do trial signups land — CRM, Supabase table, email, n8n?

> **Governance note:** until #1 is answered in `PRODUCT_TRUTH.md` and cleared in
> `CLAIMS_MATRIX.md`, the words "14 day free trial" **may not appear on the site**, even
> though the brief specifies them as the primary CTA. This is logged as open conflict
> **C-01**.

---

## 2. Book a demo

**CTA level:** Secondary (site-wide) — and the universal fallback for every pending action.

| Field | Value |
|---|---|
| Target system | **Cal.com** — event `nuovasolution/demo`. The only live integration on the site today. |
| Current status | `LIVE` (booking works) / `PENDING` (implementation is unsafe — see below) |
| Required inputs | Handled by Cal.com (name, email, timeslot). |
| Loading | Embed script load must be tracked. If not ready within a defined timeout, the control falls back to the direct URL rather than doing nothing. |
| Success | Cal.com confirmation. The site should additionally register the conversion. |
| Error | If the embed fails or is blocked, the control **must** navigate to the direct Cal.com booking URL. Never `preventDefault()` into nothing. |
| Disabled | Never disabled. This is the guaranteed path. |
| Analytics | `cta_demo_click`, `demo_embed_open`, `demo_embed_fallback_direct`, `demo_booking_complete` |
| Proposed env vars | `NEXT_PUBLIC_CAL_LINK`, `NEXT_PUBLIC_CAL_DIRECT_URL` |

**Existing defect carried over (audit A-02, P1):** the current implementation is
`href="#"` + `data-cal-link` + `onClick preventDefault()`. If the Cal.com script is blocked
by an ad blocker, fails to load, or has not initialized, **the primary CTA does nothing on
every page of the site**. The redesign must implement a progressive-enhancement pattern:
the anchor's `href` is the real booking URL, and the embed intercepts it only once ready.

**Missing information**

1. Confirm `nuovasolution/demo` is the correct, active Cal.com event.
2. Is a separate event needed per language / per segment?
3. Should booking confirmations also reach n8n or a CRM?

---

## 3. Experience Nuova

**CTA level:** Tertiary. Replaces the current `/live-demo`.

| Field | Value |
|---|---|
| Target system | **Undecided.** Two options: (a) fully client-side simulation, no backend; (b) real AI backend via an API route. |
| Current status | `PENDING` |
| Required inputs | Option (a): none beyond the typed message. Option (b): message text + language + rate-limit identity. |
| Loading | Reserved-height response area, skeleton or typing indicator. Never a jumping layout. |
| Success | Renders the simulated/real outcome, followed by the CTA ladder. |
| Error | Option (b) needs a real error state with retry and a fallback to a pre-scripted scenario. |
| Disabled | Not disabled. If (b) is unavailable, it degrades to (a) with honest labelling. |
| Analytics | `experience_open`, `experience_scenario_select`, `experience_input_submit`, `experience_complete`, `experience_cta_click` |
| Proposed env vars | `NEXT_PUBLIC_EXPERIENCE_MODE` (`simulated` \| `live`), `EXPERIENCE_API_ENDPOINT`, `EXPERIENCE_RATE_LIMIT` |

**Truth constraint (P0 risk).** The existing demo runs on local heuristics in
`demo-engine.ts` with no AI and no network call. Presenting it as the live product would be
a false claim under R3/R6. If it stays simulated, it must be **visibly and honestly
labelled** as a simulation, in both languages. Wording is a `CLAIMS_MATRIX.md` decision.
Logged as open conflict **C-02**.

**Missing information**

1. Simulated or live?
2. If live: which model/service, whose API key, what cost ceiling, what abuse protection?
3. May visitor-typed text be stored or logged? *(privacy-policy consequence)*
4. Does the current `demo-engine.ts` output reflect real product behaviour accurately enough
   to show publicly?

---

## 4. Log in

| Field | Value |
|---|---|
| Target system | **UNKNOWN — BLOCKED.** No auth system, no app URL, no session handling. |
| Current status | `BLOCKED` |
| Required inputs | N/A at website level — the site should link out, not host auth. |
| Loading | N/A (external navigation). |
| Success | N/A. |
| Error | If the app URL is unreachable, no naked broken link — show a maintenance/contact state. |
| Disabled | Until an app exists, `Log in` must **not** appear as a live nav item pointing nowhere. Either omit it, or render it as `Connection pending` with an explanation. |
| Analytics | `nav_login_click` |
| Proposed env vars | `NEXT_PUBLIC_APP_LOGIN_URL` |

**Missing information**

1. Does a customer-facing application exist? At what URL?
2. Is it a subdomain (`app.nuovasolution.com`) or a third-party product?
3. Should the website host any auth UI at all, or only link out?

> The brief requires `Log in` in the main navigation. Under R7 it cannot point at an
> invented URL. Logged as open conflict **C-03**.

---

## 5. Talk to Nuova

| Field | Value |
|---|---|
| Target system | Undecided — likely the same surface as *Chat with Nuova* (§7) or *Request a call* (§6). |
| Current status | `BLOCKED` — the intended behaviour is not defined. |
| Required inputs | Depends on resolution. |
| Loading / Success / Error | Inherits from whichever action it resolves to. |
| Disabled | Until defined, this label is **not used on the site**. Ambiguous CTAs dilute the hierarchy (R11). |
| Analytics | `cta_talk_to_nuova_click` |
| Proposed env vars | — |

**Missing information**

1. Is *Talk to Nuova* (a) the voice AI demo, (b) the site assistant, (c) a human callback,
   or (d) a duplicate label to be dropped?
2. If it is the voice AI: is there a real callable number or web-call capability? Voice
   infrastructure is outside this project's scope and must be confirmed by the owner.

Logged as open conflict **C-04**.

---

## 6. Request a call

| Field | Value |
|---|---|
| Target system | **UNKNOWN.** Candidates: Cal.com phone-call event type, or a form → n8n/CRM. |
| Current status | `PENDING` |
| Required inputs | Name, phone (with country code), preferred time window, language, agency name. |
| Loading | Submit locked, `aria-busy`, fixed dimensions. |
| Success | Must state the concrete callback window. Not "we'll be in touch." |
| Error | Retry + fallback to *Book a demo* + a direct email path. |
| Disabled | If unconnected, the control routes to *Book a demo* instead of rendering a form that goes nowhere. |
| Analytics | `cta_request_call_click`, `call_form_submit`, `call_form_success`, `call_form_error` |
| Proposed env vars | `CALLBACK_REQUEST_ENDPOINT`, `NEXT_PUBLIC_CALLBACK_ENABLED` |

**Missing information**

1. Where do callback requests land?
2. What is the real, committed response window? *(No invented SLA — R6.)*
3. Who is on call for Spanish vs. English?
4. Phone number storage requires an explicit GDPR lawful basis and a privacy-policy update.

---

## 7. Chat with Nuova

| Field | Value |
|---|---|
| Target system | **UNKNOWN.** No chat backend exists. `assets/js/chatbot.js` belongs to the dead legacy static site and is not connected. |
| Current status | `PENDING` |
| Required inputs | Message text, language, session identity, rate-limit identity. |
| Loading | Typing indicator in a reserved-height message area. |
| Success | Streamed or complete reply, plus an escalation path to a human. |
| Error | Visible failure + retry + escalation to *Book a demo* / WhatsApp. |
| Disabled | If no backend: the launcher is either omitted, or presents a designed *Connection pending* panel offering *Book a demo*. **A chat window that accepts input and never answers is a P0 violation.** |
| Analytics | `chat_open`, `chat_message_sent`, `chat_reply_received`, `chat_escalate_click`, `chat_error` |
| Proposed env vars | `NEXT_PUBLIC_CHAT_ENABLED`, `CHAT_API_ENDPOINT`, `CHAT_RATE_LIMIT` |

**Constraints from the project brief:** the assistant must be elegant, optional, never
auto-open aggressively, never dominate the page, and must reinforce trust. It is a
conversion tool, not a toy.

**Missing information**

1. Is a chat backend planned for launch, or post-launch?
2. Which model/service, whose key, what cost ceiling, what abuse protection?
3. Are conversations stored? Where? For how long? *(privacy-policy consequence)*
4. Human handover: to whom, through which channel, during which hours?

---

## 8. WhatsApp

| Field | Value |
|---|---|
| Target system | **`wa.me` deep link — number UNKNOWN.** No WhatsApp number exists anywhere in the codebase. |
| Current status | `BLOCKED` |
| Required inputs | Business WhatsApp number (E.164) + optional prefilled message per language. |
| Loading | N/A (external deep link). |
| Success | N/A — opens WhatsApp. |
| Error | Desktop users without WhatsApp: `web.whatsapp.com` fallback must be handled by the link itself; the UI additionally shows the number as selectable text. |
| Disabled | **The control does not ship until a real number is supplied.** Under R7 a phone number may not be invented. |
| Analytics | `cta_whatsapp_click` |
| Proposed env vars | `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_WHATSAPP_PREFILL_EN`, `NEXT_PUBLIC_WHATSAPP_PREFILL_ES` |

**Missing information**

1. The actual business WhatsApp number. **Owner must supply.**
2. Is it WhatsApp Business API or a personal/business app number?
3. Who answers it, in which languages, during which hours?
4. Should the prefilled message differ by page?

Logged as open conflict **C-05**.

---

## 9. Select package

| Field | Value |
|---|---|
| Target system | **UNKNOWN — BLOCKED.** No pricing page, no billing provider, no packages defined anywhere in the codebase. |
| Current status | `BLOCKED` |
| Required inputs | Package identifier, billing period, currency, language. |
| Loading | Locked control at fixed dimensions. |
| Success | Either a checkout redirect or a confirmed request. |
| Error | Retry + fallback to *Book a demo*. |
| Disabled | Until packages and prices are confirmed by the owner, every package control routes to *Book a demo* or *Request access*. |
| Analytics | `pricing_view`, `pricing_period_toggle`, `pricing_package_select`, `pricing_checkout_start`, `pricing_checkout_error` |
| Proposed env vars | `NEXT_PUBLIC_PRICING_MODE` (`public` \| `on_request`), `CHECKOUT_ENDPOINT` |

> **R6 is absolute here.** No price, tier name, feature-inclusion list, discount, contract
> term, currency or "from €X" figure may be displayed until the owner has confirmed it in
> `PRODUCT_TRUTH.md`. A pricing page with invented numbers is a P0 finding.

**Missing information**

1. Do packages exist? What are they named?
2. Are prices public, or is pricing on request?
3. Setup fee? Minimum term? Per-agency, per-seat, or usage-based?
4. Billing provider: Stripe, invoice, other?
5. Does the price differ by market/language?

Logged as open conflict **C-06**.

---

## 10. Trial extension submission

| Field | Value |
|---|---|
| Target system | **UNKNOWN — BLOCKED.** Depends entirely on §1, which is itself blocked. |
| Current status | `BLOCKED` |
| Required inputs | Trial account identity, reason for extension, requested duration. |
| Loading | Locked control at fixed dimensions. |
| Success | Must state whether the extension is **granted** or **requested for review**. These are different promises and must not be conflated. |
| Error | Retry + a human contact path. |
| Disabled | Not built until the trial exists. |
| Analytics | `trial_extension_open`, `trial_extension_submit`, `trial_extension_success`, `trial_extension_error` |
| Proposed env vars | `TRIAL_EXTENSION_ENDPOINT` |

**Missing information**

1. Is extension automatic or manually approved?
2. Does the request happen on the marketing site or inside the app? *(If inside the app, it
   is out of this project's scope.)*
3. Maximum extension length? One-time or repeatable?

---

## 11. Request access

**Not in the original list — added as the shared fallback primitive for §1, §4, §9, §10.**

| Field | Value |
|---|---|
| Target system | **PENDING.** Must resolve to something real before it is used. |
| Current status | `PENDING` |
| Required inputs | Work email, agency name, what they are requesting access to (auto-filled from context). |
| Loading | Locked, fixed dimensions. |
| Success | States that the request was received and what the next step is. |
| Error | Retry + fallback to *Book a demo* and a direct email path. |
| Disabled | If unconnected, this control **must not exist** — it routes to *Book a demo* instead. |
| Analytics | `request_access_open`, `request_access_submit`, `request_access_success`, `request_access_error` |
| Proposed env vars | `ACCESS_REQUEST_ENDPOINT` |

**Missing information:** where these requests land. Until answered, *Book a demo* is the
only honest fallback anywhere on the site.

---

## Summary

| # | Action | Status | Blocking dependency |
|---|---|---|---|
| 1 | Start your 14 day free trial | `BLOCKED` | Does the trial exist? Who provisions it? |
| 2 | Book a demo | `LIVE` / unsafe impl. | Fix `href="#"` fallback pattern |
| 3 | Experience Nuova | `PENDING` | Simulated vs. live decision + honest labelling |
| 4 | Log in | `BLOCKED` | Does a customer app exist? At what URL? |
| 5 | Talk to Nuova | `BLOCKED` | What does this label actually mean? |
| 6 | Request a call | `PENDING` | Destination + real committed response window |
| 7 | Chat with Nuova | `PENDING` | Backend? Storage? Human handover? |
| 8 | WhatsApp | `BLOCKED` | The real business number |
| 9 | Select package | `BLOCKED` | Do packages and prices exist? |
| 10 | Trial extension | `BLOCKED` | Depends on #1 |
| 11 | Request access | `PENDING` | Destination |

**Only one of eleven actions has a working target system today.** Every other conversion
path on the redesigned site will ship in an honest placeholder state until the owner and
the workflow main project supply the information above.

---

## Requests to the workflow main project

The following are needed from outside this project. Nothing here is assumed, and no n8n
workflow is created or modified from this repository (R8).

| ID | Request |
|---|---|
| W-01 | Confirm whether the n8n Cloud instance will serve the new website at all, or whether a new integration layer is planned. |
| W-02 | If n8n is used: which workflows should receive website submissions, and what is each one's expected payload contract? |
| W-03 | Confirm that the leaked API key (audit finding A-01) has been rotated. |
| W-04 | Confirm the storage destination for every form submission (Supabase table? CRM? email?) so the privacy policy can be made accurate. |
| W-05 | Confirm whether voice AI has a real, callable public entry point that the website may reference. |
| W-06 | Confirm the business WhatsApp number and who owns responses. |

---

## Status

Contract drafted for all eleven actions plus one shared fallback primitive.
**Implemented and awaiting independent technical and final audit.**
