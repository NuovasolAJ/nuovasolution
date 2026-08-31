# WEBSITE UX — AF REQUIREMENTS EXPORT v1

**Version:** ux-af-export-v1
**Date:** 2026-08-31
**Branch:** `website_enterprise_redesign`
**Direction:** Website UX/design lane → Backend coordination
**Answers:** `WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2.md` §B, final row:
> *AF-01 .. AF-07 (Authenticated Experience fields) — **NOT EXPORTED — WEBSITE TEAM MUST PROVIDE FIELD DEFINITIONS.** These originate from the website design team's reconciliation artifacts (waves A1/A3/A4). They are not present in this backend workspace, so they are not defined here and are not invented. The website team must provide their definitions; the backend will then classify each.*

This document supplies those definitions, extracted verbatim from the website artefacts, and
records which of them export v2 already answered elsewhere in its own text.

**Secrets:** NONE. This document contains no key, token, credential, environment variable value,
host, project reference, customer record or internal access detail. Environment variable
**names** are not reproduced here because none is required to state these requirements.

---

## 1. Method, and its limits

**What was done.** AF-01 to AF-07 were extracted from the single register in which they are
defined, then checked line by line against export v2. Where v2 answers a requirement — under any
label, including labels other than `AF` — that answer is recorded as the resolution.

**What was deliberately not done.**

- No AF requirement was invented, extended, reworded or technically solved.
- No new requirement was raised. Where v2's answer is partial, the residual is stated strictly
  within the boundary of the originally registered text.
- No backend behaviour was designed, proposed or assumed.
- No system was contacted. No n8n, Supabase, provider, webhook or API access of any kind. The
  `n8n-mcp` tooling became available in this session and was **not** used.
- No existing document was modified. This file is the only artefact produced.

**Authority note.** Export v2 is the technical authority on endpoints, payloads, status values and
environment variable names. It is **not** the authority on public claims: per
`FINAL_WEBSITE_INTEGRATION_PLAN.md` §1, backend confirmation never converts a `LEGAL` or
`REJECTED` verdict in `CLAIMS_MATRIX.md`. This distinction matters only for AF-04 and is flagged
there.

---

## 2. Provenance

All seven are defined in exactly one place. A repository-wide search for `AF-[0-9]` returns no
eighth identifier and no competing definition.

| | |
|---|---|
| **Defining document** | `docs/website_redesign/AUTHENTICATED_SURFACE_SYSTEM.md` |
| **Defining section** | §15.1 — *New missing fields found by this chat* |
| **Register columns** | `ID` · `Missing field` · `Blocks` |
| **Produced by** | Wave A3 — Authenticated Experience Design |
| **Stated purpose in source** | *"Named precisely, for the backend export-v2. Prefixed `AF` so they do not collide with the frozen `MF` register in `FINAL_RECONCILIATION_REPORT.md` §9."* |

**There is no `Title` column in the source register.** The register carries a `Missing field`
description only. Each entry below therefore reproduces that description **verbatim** as the
authoritative title, and adds a short handle marked explicitly as a reading aid, not as source
text.

Usage sites of each AF within `AUTHENTICATED_SURFACE_SYSTEM.md`: §7.7 (AF-01, AF-02, AF-04),
§8.3 and §9.1 (AF-03), §8.4 (AF-05), §8.9 and §9.1 (AF-06), §15 (all seven), §16 (AD-02 → AF-02),
§17 item 11 (AF-02).

---

## 3. Status summary after export v2

| AF | Handle (reading aid) | Status after export v2 | Blocking |
|---|---|---|---|
| **AF-01** | OAuth return parameter contract | **PARTIALLY RESOLVED BY EXPORT V2** | Yes, for one outcome |
| **AF-02** | Provider status polling | **RESOLVED BY EXPORT V2** | No |
| **AF-03** | Footer / signature asset `kind` | **RESOLVED BY EXPORT V2** (by negation) | No |
| **AF-04** | Provider display names | **PARTIALLY RESOLVED BY EXPORT V2** | Yes, for one provider set |
| **AF-05** | Office list endpoint | **RESOLVED BY EXPORT V2** | No |
| **AF-06** | Property file / PX asset upload scope | **RESOLVED BY EXPORT V2** (out of scope) | No |
| **AF-07** | `GET /branding/preview` response shape | **STILL MISSING** | Yes |

Five fully resolved or resolved by negation. Two partially resolved with a precisely bounded
residual. One untouched by v2.

No entry required the marker `DEFINITION NOT FOUND / SOURCE CLARIFICATION REQUIRED` — every AF
identifier is unambiguously defined in the source register.

---

## 4. AF-01 to AF-07 in full

---

### AF-01

| Field | Content |
|---|---|
| **AF ID** | AF-01 |
| **Exact title (verbatim, §15.1)** | *"The query parameter contract the BFF OAuth callback appends when it redirects the browser back to the step: the parameter names and the value set for returned, cancelled and provider error."* |
| **Handle** (reading aid) | OAuth return parameter contract |
| **Source** | `AUTHENTICATED_SURFACE_SYSTEM.md` §15.1; used at §7.7 *The inbound leg*; listed at §15 item 11 |
| **Affected website flow** | Provider connection return, for every provider: communication providers (step `communication`), paid acquisition (step `lead_acquisition`), external CRM (step `crm`) |
| **Existing UX assumption** | §7.7 specifies the return as a state machine over **four** outcomes — returned/connected, returned/externally pending, **cancelled at the provider**, provider returned an error — with the parameter names held as a single constant to be set when AF-01 arrives. The registered assumption was that the BFF redirects **back to the step route**. |
| **Exactly missing backend information** | The parameter names, and the value set covering all three registered outcomes: returned, **cancelled**, and provider error. |
| **Why it is needed** | §7.7 mandates that a user cancellation is **not** an error: the row returns to its previous status unchanged, with no `signal-critical` treatment and no error copy. Without a value that distinguishes cancellation from a provider error, the website would either render a cancellation as a failure, or would have to infer the difference, which is forbidden. |
| **Expected canonical answer form** | The redirect URL template with its complete query-parameter set; for each parameter, its name, type and full permitted value enumeration; and the mapping from each enumerated value to the three registered outcomes. |
| **Blocking** | **Yes**, for the cancellation outcome only. The connected, pending and error outcomes are unblocked by v2. |
| **Affected website surface** | Every provider `StatusRow` in steps `communication`, `lead_acquisition` and `crm`; the return landing surface |
| **Must not be guessed** | Any parameter name; any value not enumerated by the backend; any inference that an absent or unrecognised value means cancellation; any rendering of a provider-supplied error string |
| **Permitted fallback** | Treat an unrecognised or absent outcome as **provider error**, which is the conservative reading, and re-read the provider status endpoint once. Never silently render success. |
| **Status after export v2** | **PARTIALLY RESOLVED BY EXPORT V2.** §D confirms the parameter set: the BFF issues a `302` to `{FRONTEND}/{locale}/connect/callback` carrying `provider`, `status`, `correlation` and `reason`; `status ∈ success \| error`; `correlation` is the opaque server-issued state and is never a token; `reason` is a stable error code from §F when `status=error`; the website never receives a token. **Residual:** `status` is a **two-value** enum. v2 defines no third value for cancellation, and §F's code list contains no cancellation code. Still required: either a third `status` value, or a named stable `reason` code that denotes a user cancellation at the provider. |
| **Assumption superseded by v2** | v2 routes the return to a **single shared callback route** `{FRONTEND}/{locale}/connect/callback`, **not** back to the originating step route as §7.7 assumed. This is a website-side design consequence, not a backend gap. |

---

### AF-02

| Field | Content |
|---|---|
| **AF ID** | AF-02 |
| **Exact title (verbatim, §15.1)** | *"Whether `GET /connect/{provider}/status` and `GET /crm/status` may be polled, at what minimum interval, or whether a push channel exists."* |
| **Handle** (reading aid) | Provider status polling |
| **Source** | `AUTHENTICATED_SURFACE_SYSTEM.md` §15.1; used at §7.7 *Status refresh: the no polling rule (BINDING)*; §15 item 12; §16 AD-02; §17 item 11 |
| **Affected website flow** | Any status refresh beyond step entry, in steps `communication`, `lead_acquisition` and `crm` |
| **Existing UX assumption** | A binding **no-polling rule**: status is read on step entry and on return from the provider only; an explicit *Check again* control re-reads on demand, client-side limited to one call per 10 seconds purely to prevent a stuck key repeat; no background polling, no interval, no websocket, no optimistic status. Stated rationale in source: inventing a cadence would place avoidable load on a production provider integration. |
| **Exactly missing backend information** | Whether polling is permitted; if so the minimum interval; or whether a push channel exists instead. |
| **Why it is needed** | An `externally_pending` connection resolves outside the website. Without a supported refresh mechanism the agency must re-enter the step to observe a change. |
| **Expected canonical answer form** | A statement of whether a polling contract exists; if yes, the minimum interval and the terminal states at which polling stops; if a push channel exists, its transport and event set; if neither, an explicit statement to that effect. |
| **Blocking** | **No.** The no-polling rule is a complete and safe interim, and was written to be replaced without a layout change. |
| **Affected website surface** | Provider `StatusRow`s and the *Check again* control |
| **Must not be guessed** | Any interval; any push transport; any guarantee of eventual update; presenting a website-side refresh as a backend contract |
| **Permitted fallback** | The existing no-polling rule, unchanged |
| **Status after export v2** | **RESOLVED BY EXPORT V2.** §D states **NO POLLING CONTRACT**: no backend-defined cadence and no push. After the OAuth callback, or on an explicit user refresh, the website calls the relevant status endpoint **once**. v2 additionally permits a website-side auto-refresh as an explicitly website-owned decision, provided it is never presented as a backend contract, the interval is kept conservative, and it stops on a terminal state (`connected \| error \| degraded`) or when the user leaves the step. §A item 6 records **"No invented polling"** as a binding owner/product decision. |
| **Assumption superseded by v2** | The existing rule is confirmed correct and is now additionally **permitted** to auto-refresh within v2's stated bounds. Any such refresh remains a website decision, and the backend guarantees nothing about it. |

---

### AF-03

| Field | Content |
|---|---|
| **AF ID** | AF-03 |
| **Exact title (verbatim, §15.1)** | *"The `kind` value for the footer or signature branding asset. `POST /branding/upload-init` enumerates `\"logo\" \| \"email_banner\"` only, while handoff §3 step 3 describes a footer or signature asset."* |
| **Handle** (reading aid) | Footer / signature asset `kind` |
| **Source** | `AUTHENTICATED_SURFACE_SYSTEM.md` §15.1; used at §8.3 *Blocked State* and *Status*; §9.1 upload inventory; §15 item 13 |
| **Affected website flow** | Onboarding step 3, `branding` |
| **Existing UX assumption** | The footer or signature block was specified as a **third upload block**, fully designed but rendered in the honest-state treatment and **not wired to a guessed `kind`**, because guessing an enumeration value was forbidden. |
| **Exactly missing backend information** | The `kind` value for the footer or signature branding asset. |
| **Why it is needed** | Without it the third block cannot be wired, and a drop zone that cannot commit is a dead control. |
| **Expected canonical answer form** | Either the additional `kind` enumeration value, or a statement that the asset is not an upload together with the contract by which it is actually submitted. |
| **Blocking** | **No.** The block was specified and held, not built. |
| **Affected website surface** | The third block of the `branding` step |
| **Must not be guessed** | Any `kind` value; any assumption that footer and signature share one asset; any assumption that either is a file at all |
| **Permitted fallback** | The honest-state treatment already specified in §8.3 |
| **Status after export v2** | **RESOLVED BY EXPORT V2 — by negation.** §B *Additional reconciliations* and §E state: **footer and signature are text fields, not uploads.** Only `logo` and `email_banner` are uploaded assets. Footer is localized legal text (`legal_footer` / `footer_by_locale`). Signature is a `signature_mode` selection — one of `logo_only \| compact \| banner_signature \| legal_only` — plus text. The server sanitizes and renders both into responsive HTML and plaintext; the website submits **plain text only** and never injects raw HTML. §F additionally defines `invalid_asset_kind` (400) on `POST /branding/upload-init`, which is the error a guessed `kind` would have produced. |
| **Assumption superseded by v2** | **The entire third-upload-block premise is void.** The surface is a text and mode-selection group, not an upload. `AUTHENTICATED_SURFACE_SYSTEM.md` §8.3 and §9.1 require a design follow-up; they were not edited by this task. The four `signature_mode` values are backend enumeration tokens and must be rendered as agency-facing labels, never as the raw tokens (export v2 Appendix B invariant 6). |

---

### AF-04

| Field | Content |
|---|---|
| **AF ID** | AF-04 |
| **Exact title (verbatim, §15.1)** | *"The provider display name list, and whether the website may render a provider's name inside the authenticated tree at all. Related to MF-11 and to owner decision 5 on CRM vendor names."* |
| **Handle** (reading aid) | Provider display names |
| **Source** | `AUTHENTICATED_SURFACE_SYSTEM.md` §15.1; used at §7.7 *Connection pending* and the *Returned, externally pending* outcome; §15 item 9 |
| **Affected website flow** | `externally_pending` notes and provider rows in steps `communication`, `lead_acquisition` and `crm` |
| **Existing UX assumption** | Until supplied, an `externally_pending` note *"states that an external approval is outstanding, without naming a party it cannot name."* |
| **Exactly missing backend information** | The provider display name list, and whether a provider name may be rendered inside the authenticated tree at all. |
| **Why it is needed** | The pending state's purpose is to tell the agency that the delay is external and not their own inaction. Naming the party is what makes that legible. |
| **Expected canonical answer form** | A mapping from each internal provider identifier to its canonical display name, covering every provider set the website surfaces, plus a statement on permitted rendering (text, logo, neither). |
| **Blocking** | **Yes**, for the communication provider set only. The CRM and paid sets are unblocked by v2. |
| **Affected website surface** | Provider `StatusRow`s and `StatusNote`s |
| **Must not be guessed** | Any display name; any internal identifier rendered as a name; any logo usage; any assumption that a name cleared for the authenticated tree is cleared for public marketing |
| **Permitted fallback** | The unnamed-party wording already specified in §7.7 |
| **Status after export v2** | **PARTIALLY RESOLVED BY EXPORT V2.** MF-11 is **CONFIRMED** for two provider sets — CRM: `hubspot` → HubSpot, `pipedrive` → Pipedrive, `zoho` → Zoho CRM, `salesforce` → Salesforce; paid: `google_lead_form(s)` → Google Lead Forms, `meta_lead_ads` → Meta Lead Ads, `click_to_whatsapp` → Click-to-WhatsApp. Internal identifiers are never exposed. §A item 9 permits **text-only** rendering initially; **logos remain blocked** until brand approval. **Residual:** v2 §D enumerates a third provider set for the OAuth flow — *comms: email / whatsapp / calendar / voice* — and MF-11 supplies **no display-name mapping for it**. That set is precisely where `externally_pending` occurs during WhatsApp and Meta verification, which is the surface AF-04 was raised for. Still required: the canonical display names for the communication provider set, or a statement that this set is not named on the website. |
| **Authority boundary** | v2's clearance covers the authenticated tree, which is AF-04's stated scope. **Naming any provider on the public marketing tree remains governed by `CLAIMS_MATRIX.md` and owner decision 5**, and backend confirmation does not convert a claims verdict. Not reopened here. |

---

### AF-05

| Field | Content |
|---|---|
| **AF ID** | AF-05 |
| **Exact title (verbatim, §15.1)** | *"An endpoint returning the agency's offices, to populate the optional `office_id` on `POST /team/invite`."* |
| **Handle** (reading aid) | Office list endpoint |
| **Source** | `AUTHENTICATED_SURFACE_SYSTEM.md` §15.1; used at §8.4 *Blocked State*; §15 item 14 |
| **Affected website flow** | Onboarding step 4, `team` — employee invitation |
| **Existing UX assumption** | *"The office control is therefore not rendered until AF-05 is supplied; the field is omitted rather than shown empty."* |
| **Exactly missing backend information** | An endpoint returning the agency's offices. |
| **Why it is needed** | `office_id` is optional on the invite payload, but no contract supplied a list from which the agency could choose one. |
| **Expected canonical answer form** | The endpoint, its response shape, whether the field is optional, and the behaviour when it is omitted. |
| **Blocking** | **No.** The control was omitted, not faked. |
| **Affected website surface** | The office control on the team invite form |
| **Must not be guessed** | Any endpoint path; any office identifier; any default office; any role restriction |
| **Permitted fallback** | Omit the control entirely, as already specified |
| **Status after export v2** | **RESOLVED BY EXPORT V2.** §F defines `GET /offices` → `{ offices:[{ office_id, name, is_default }] }`, error `no_session` (401, retryable). §E states: `office_id` is an **opaque handle**, **never rendered**; the field is **optional** and a null value means tenant level; role gating applies — `office_manager` may invite only into their own office, `agency_admin` into any. §F adds `office_out_of_scope` (403, not retryable) on `POST /team/invite`. Appendix A maps the surface to an offices read plus the existing invite chain. |
| **Assumption superseded by v2** | The §8.4 omission is **liftable**. The control may now be specified, and it must additionally carry the role gating and the `office_out_of_scope` error, neither of which the earlier design knew about. Design follow-up required in `AUTHENTICATED_SURFACE_SYSTEM.md` §8.4; not edited by this task. |

---

### AF-06

| Field | Content |
|---|---|
| **AF ID** | AF-06 |
| **Exact title (verbatim, §15.1)** | *"Whether any property file or Property Experience asset upload is in the website's scope, and if so its contract."* |
| **Handle** (reading aid) | Property file / PX asset upload scope |
| **Source** | `AUTHENTICATED_SURFACE_SYSTEM.md` §15.1; used at §8.9 *Uploads*; §9.1 upload inventory; §15 item 15 |
| **Affected website flow** | Onboarding steps 8 `property_source` and 9 `property_experience` |
| **Existing UX assumption** | *"No surface is built until answered."* §8.9 additionally records that the capture wizard belongs to the PX lane and that the website must not rebuild it. |
| **Exactly missing backend information** | Whether either upload is in the website's scope, and if so its contract. |
| **Why it is needed** | An upload surface is never built ahead of its contract; a drop zone that cannot commit is a dead control. |
| **Expected canonical answer form** | A scope statement for each of the two asset classes, and a contract for any that is in scope. |
| **Blocking** | **No.** No surface was built. |
| **Affected website surface** | None built. The two steps carry no upload surface. |
| **Must not be guessed** | Any upload contract; any storage path; any assumption that property ingestion involves a file the agency uploads on the website; any second capture flow |
| **Permitted fallback** | Build no surface, as already specified |
| **Status after export v2** | **RESOLVED BY EXPORT V2 — the resolution is OUT OF SCOPE for the website.** §B and §E state: **property file upload is OUT OF SCOPE (onboarding)**; property is ingested via source connect — agency website scrape, feed, or CRM inventory. A direct property-file upload, if later desired, is **BACKEND IMPLEMENTATION REQUIRED** and is explicitly distinct from the PX panorama capture flow. **Property Experience asset ownership is CONFIRMED under PX-lane authority**: PX assets are owned by (tenant, property); a real experience may reference only assets it owns, and publish **fails closed** on a cross-property asset reference. Capture and authoring are PX-lane owned; the website only consumes the PX onboarding entry state. |
| **Assumption superseded by v2** | None. The decision to build no surface is confirmed correct in both halves. |

---

### AF-07

| Field | Content |
|---|---|
| **AF ID** | AF-07 |
| **Exact title (verbatim, §15.1)** | *"The full response shape of `GET /branding/preview`. The contract states `{ logo, email_banner, …present flags }`; the elision is unresolved."* |
| **Handle** (reading aid) | `GET /branding/preview` response shape |
| **Source** | `AUTHENTICATED_SURFACE_SYSTEM.md` §15.1 |
| **Affected website flow** | Onboarding step 3, `branding` — rendering already-stored assets when the step is entered |
| **Existing UX assumption** | §9.4 specifies that a committed asset is rendered **from its stored URL**, never from a client-side object URL after commit, and that the preview replaces the upload zone **in the same box** so the swap costs zero layout shift. The step must therefore know, on entry, which assets exist and where to render them from. |
| **Exactly missing backend information** | The complete response shape of `GET /branding/preview`. The published contract elides it as `{ logo, email_banner, …present flags }`. |
| **Why it is needed** | On step entry the website must distinguish "no asset yet" from "asset present", and must render a present asset. The elision leaves both the key set and the value types undefined, so neither branch can be implemented. |
| **Expected canonical answer form** | The complete JSON response shape, enumerated key by key with value types — in the form export v2 §G already uses for the onboarding step projection. |
| **Blocking** | **Yes**, for the preview and replace states of the branding step. The initial upload path is unaffected. |
| **Affected website surface** | The `logo` and `email_banner` blocks of the `branding` step, in their preview, replace and remove states |
| **Must not be guessed** | Any key name; any value type; whether a URL or only a boolean is returned; any inference from the `POST /branding/commit` response, which is a different surface |
| **Permitted fallback** | **None that preserves the specified behaviour.** The step can render its empty upload state, but cannot render an existing asset, which makes replace and remove unreachable for an agency returning to the step. |
| **Status after export v2** | **STILL MISSING.** Export v2 §F reproduces the **identical elision**: `GET /branding/preview · POST /branding/remove \| { …present flags } / { ok }`. No enumeration appears anywhere in v2. This is the only AF that v2 did not advance. |
| **Adjacent, already resolved (context only, not part of AF-07)** | MF-07 is now **CONFIRMED** for branding: image-only `image/png, image/jpeg, image/webp, image/gif`, maximum 5 MB, kinds `logo` and `email_banner` only. This resolves the upload constraint question but says nothing about the preview response shape. |

---

## 5. Website UX assumptions superseded by export v2

Recorded so that no superseded assumption is carried forward. **No document was edited by this
task**; each line below is a design follow-up owned by the website lane.

| # | Superseded assumption | Where recorded | Replaced by |
|---|---|---|---|
| 1 | The BFF redirects the browser back to the **step route** after OAuth | `AUTHENTICATED_SURFACE_SYSTEM.md` §7.7 | v2 §D: a single shared callback route carrying `provider`, `status`, `correlation`, `reason` |
| 2 | Footer or signature is a **third upload block** | §8.3, §9.1 | v2 §B and §E: text fields plus a signature mode selection, not uploads. The upload premise is void |
| 3 | The office control is **not rendered** until an endpoint exists | §8.4 | v2 §E and §F: the offices endpoint exists; the control may be specified, and must carry role gating and the out-of-scope error |
| 4 | Provider display names are unavailable, so no party is named | §7.7 | v2 MF-11: CRM and paid names confirmed. The communication set remains unnamed — see AF-04 residual |
| 5 | The client performs **no** file size or type rejection, because no limit was specified | §9.5 | v2 MF-07 and §C6: image-only, 5 MB, two kinds. Constraints may now be stated before selection |
| 6 | No polling, pending an answer | §7.7, §17 item 11 | v2 §D: no backend polling contract exists; a conservative website-side refresh is permitted as a website-owned decision within stated bounds |

---

## 6. What remains outstanding after export v2

| Item | Requirement |
|---|---|
| **AF-01 residual** | A value distinguishing a **user cancellation at the provider** from a provider error: either a third `status` value, or a named stable `reason` code |
| **AF-04 residual** | Canonical display names for the **communication provider set** (email, whatsapp, calendar, voice), or a statement that this set is not named on the website |
| **AF-07** | The complete enumerated response shape of `GET /branding/preview` |

---

## 7. Owner decisions touched by this extraction

Raised only where export v2 itself marks a decision as owner-owned. **No new owner decision is
created by this document.**

| Ref | Decision | State after v2 |
|---|---|---|
| **AD-02** (`AUTHENTICATED_SURFACE_SYSTEM.md` §16) | Confirm the no-polling rule, or supply a cadence | **Answered.** v2 §A item 6 records "No invented polling" as a binding owner/product decision, and §D confirms no backend polling contract exists |
| **AD-04** (§16) | Confirm the wizard is non-linear | **Answered.** v2 §A item 5 and §G: the wizard is not forced linear; each step's status is computed independently; `resume_step` is a convenience pointer only |
| **AD-06** (§16) | Confirm the website renders no payment form and no embedded payment iframe | **Answered.** v2 §A item 7: checkout is a server-determined handoff, not a marketing-site payment form |
| **Owner decision 5** (`FINAL_RECONCILIATION_REPORT.md` §10) | May CRM vendors be named as plain text; are logo permissions held | **Partially answered for the authenticated tree.** v2 §A item 9 permits text-only and keeps logos blocked pending brand approval. **Public marketing naming remains a `CLAIMS_MATRIX.md` decision** and is not converted by backend confirmation |
| **MF-03** (frozen register) | Destination after onboarding step 10 | v2 marks it **PROPOSED** and website-owned, with a recommended target. **`AD-01`** — whether the authenticated tree, including `Log in`, is omitted from public navigation until this is settled — **remains an owner decision** |

---

## 8. Sanitization confirmation

- No secret, key, token, credential or signature value.
- No environment variable value. Environment variable **names** are not reproduced.
- No host, origin, endpoint base, project reference or internal infrastructure identifier.
- No customer, agency, employee or personal data.
- No internal access detail, and no instruction that would cause a call to any system.
- Provider identifiers appear only as the public mapping already published in export v2 §B.

This document is safe to transfer to the backend coordination chat as-is.

---

## 9. Copy-paste block for the backend coordination chat

The block below contains AF-01 to AF-07 in full, with no website UX rationale. It is
self-contained.

```text
BEGIN BACKEND AF REQUEST

SOURCE: NuovaSolution website UX lane — AUTHENTICATED_SURFACE_SYSTEM.md §15.1 (Wave A3).
ANSWERS: WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2.md §B, row "AF-01 .. AF-07 — NOT EXPORTED —
WEBSITE TEAM MUST PROVIDE FIELD DEFINITIONS".
SCOPE: definitions only. Nothing below is a proposed backend design. Nothing below has been
extended, reworded or solved by the website team.
CONTAINS NO SECRETS.

--------------------------------------------------------------------------------
AF-01  OAuth return parameter contract
DEFINITION: The query parameter contract the BFF OAuth callback appends when it redirects
  the browser back to the step: the parameter names and the value set for returned,
  cancelled and provider error.
NEEDED: The parameter names, and a value set covering all three outcomes: returned,
  cancelled, provider error.
ANSWER FORM: The redirect URL template with its complete query-parameter set; per parameter
  the name, type and full permitted value enumeration; and the mapping from each value to
  the three outcomes.
BLOCKING: YES, for the cancellation outcome only.
DO NOT GUESS: any parameter name; any value not enumerated by the backend; that an absent or
  unrecognised value means cancellation.
STATUS AFTER EXPORT V2: PARTIALLY RESOLVED.
  Resolved by v2 §D: redirect to {FRONTEND}/{locale}/connect/callback carrying provider,
  status, correlation, reason; correlation is the opaque server-issued state, never a token;
  reason is a stable error code from §F when status=error.
  RESIDUAL: status is enumerated as success | error only. No value denotes a user
  cancellation at the provider, and §F contains no cancellation code.
  STILL REQUIRED: either a third status value, or a named stable reason code for a user
  cancellation at the provider.

--------------------------------------------------------------------------------
AF-02  Provider status polling
DEFINITION: Whether GET /connect/{provider}/status and GET /crm/status may be polled, at what
  minimum interval, or whether a push channel exists.
NEEDED: Whether polling is permitted; if so the minimum interval; or whether a push channel
  exists instead.
ANSWER FORM: A statement of whether a polling contract exists; if yes, minimum interval and
  terminal states; if a push channel exists, its transport and event set; if neither, an
  explicit statement to that effect.
BLOCKING: NO.
DO NOT GUESS: any interval; any push transport; any guarantee of eventual update.
STATUS AFTER EXPORT V2: RESOLVED.
  v2 §D: NO POLLING CONTRACT. No backend-defined cadence and no push. One status call after
  the OAuth callback or on explicit user refresh. Any website-side auto-refresh is a
  website-owned decision, must not be presented as a backend contract, must stay conservative,
  and must stop on a terminal state (connected | error | degraded) or on leaving the step.
  v2 §A item 6 records "No invented polling" as binding.
  NO FURTHER BACKEND ACTION REQUIRED.

--------------------------------------------------------------------------------
AF-03  Footer / signature branding asset kind
DEFINITION: The kind value for the footer or signature branding asset. POST
  /branding/upload-init enumerates "logo" | "email_banner" only, while the handoff step 3
  description mentions a footer or signature asset.
NEEDED: The kind value, or a statement that the asset is not an upload plus the contract by
  which it is actually submitted.
ANSWER FORM: Either the additional kind enumeration value, or the non-upload contract.
BLOCKING: NO.
DO NOT GUESS: any kind value; that footer and signature share one asset; that either is a file.
STATUS AFTER EXPORT V2: RESOLVED, by negation.
  v2 §B and §E: footer and signature are TEXT FIELDS, NOT UPLOADS. Only logo and email_banner
  are uploaded assets. Footer is localized legal text. Signature is a signature_mode selection
  (logo_only | compact | banner_signature | legal_only) plus text. The server sanitizes and
  renders to responsive HTML and plaintext; the website submits plain text only.
  v2 §F defines invalid_asset_kind (400) on upload-init.
  NO FURTHER BACKEND ACTION REQUIRED.

--------------------------------------------------------------------------------
AF-04  Provider display names
DEFINITION: The provider display name list, and whether the website may render a provider's
  name inside the authenticated tree at all. Related to MF-11.
NEEDED: A mapping from each internal provider identifier to its canonical display name,
  covering every provider set the website surfaces, plus a statement on permitted rendering.
ANSWER FORM: Identifier to display-name mapping per provider set, plus a rendering statement
  (text, logo, neither).
BLOCKING: YES, for the communication provider set only.
DO NOT GUESS: any display name; any internal identifier rendered as a name; any logo usage.
STATUS AFTER EXPORT V2: PARTIALLY RESOLVED.
  Resolved by v2 MF-11 for two sets.
    CRM:  hubspot -> HubSpot; pipedrive -> Pipedrive; zoho -> Zoho CRM;
          salesforce -> Salesforce.
    Paid: google_lead_form(s) -> Google Lead Forms; meta_lead_ads -> Meta Lead Ads;
          click_to_whatsapp -> Click-to-WhatsApp.
  Internal identifiers are never exposed. v2 §A item 9: text-only permitted; logos blocked
  until brand approval.
  RESIDUAL: v2 §D enumerates a third provider set for the OAuth flow, comms: email, whatsapp,
  calendar, voice. MF-11 supplies no display-name mapping for that set. It is the set on which
  externally_pending occurs during WhatsApp and Meta verification.
  STILL REQUIRED: canonical display names for the communication provider set, or a statement
  that this set is not named on the website.

--------------------------------------------------------------------------------
AF-05  Office list endpoint
DEFINITION: An endpoint returning the agency's offices, to populate the optional office_id on
  POST /team/invite.
NEEDED: The endpoint, its response shape, whether the field is optional, and the behaviour
  when it is omitted.
ANSWER FORM: Endpoint, response shape, optionality, omission behaviour.
BLOCKING: NO.
DO NOT GUESS: any endpoint path; any office identifier; any default office; any role
  restriction.
STATUS AFTER EXPORT V2: RESOLVED.
  v2 §F: GET /offices -> { offices:[{ office_id, name, is_default }] }, error no_session
  (401, retryable).
  v2 §E: office_id is an opaque handle, never rendered; optional, null means tenant level;
  office_manager may invite only into their own office, agency_admin into any.
  v2 §F: POST /team/invite adds office_out_of_scope (403, not retryable).
  NO FURTHER BACKEND ACTION REQUIRED.

--------------------------------------------------------------------------------
AF-06  Property file and Property Experience asset upload scope
DEFINITION: Whether any property file or Property Experience asset upload is in the website's
  scope, and if so its contract.
NEEDED: A scope statement for each of the two asset classes, and a contract for any that is
  in scope.
ANSWER FORM: Scope statement per asset class, plus contract where in scope.
BLOCKING: NO.
DO NOT GUESS: any upload contract; any storage path; any second capture flow.
STATUS AFTER EXPORT V2: RESOLVED. The resolution is OUT OF SCOPE for the website.
  v2 §B and §E: property file upload is OUT OF SCOPE for onboarding. Property is ingested via
  source connect (agency website scrape, feed, CRM inventory). A direct property-file upload,
  if later desired, is BACKEND IMPLEMENTATION REQUIRED and is distinct from the PX panorama
  capture flow.
  Property Experience asset ownership CONFIRMED under PX-lane authority: assets are owned by
  (tenant, property); publish fails closed on a cross-property asset reference; capture and
  authoring are PX-lane owned; the website only consumes the PX onboarding entry state.
  NO FURTHER BACKEND ACTION REQUIRED.

--------------------------------------------------------------------------------
AF-07  GET /branding/preview response shape
DEFINITION: The full response shape of GET /branding/preview. The contract states
  { logo, email_banner, ...present flags }; the elision is unresolved.
NEEDED: The complete response shape, enumerated key by key with value types.
ANSWER FORM: A complete JSON shape, in the form export v2 §G already uses for the onboarding
  step projection.
BLOCKING: YES, for the preview and replace states of the branding step.
DO NOT GUESS: any key name; any value type; whether a URL or only a boolean is returned; any
  inference from the POST /branding/commit response, which is a different surface.
STATUS AFTER EXPORT V2: STILL MISSING.
  v2 §F reproduces the identical elision: GET /branding/preview -> { ...present flags }.
  No enumeration appears anywhere in v2. This is the only AF that v2 did not advance.
  STILL REQUIRED: the enumerated response shape.

--------------------------------------------------------------------------------
SUMMARY
  RESOLVED BY EXPORT V2:            AF-02, AF-03, AF-05, AF-06
  PARTIALLY RESOLVED BY EXPORT V2:  AF-01 (cancellation outcome),
                                    AF-04 (communication provider display names)
  STILL MISSING:                    AF-07
  BLOCKING AND OUTSTANDING:         AF-01 residual, AF-04 residual, AF-07

END BACKEND AF REQUEST
```

---

## Status

AF-01 to AF-07 extracted from their single defining register and checked line by line against
export v2. Four resolved, two partially resolved with bounded residuals, one still missing. Six
superseded website UX assumptions recorded for follow-up. No AF requirement was invented,
extended, reworded or technically solved. No new requirement was raised. No `DEFINITION NOT
FOUND` case arose.

No document was modified. No system was contacted. No push, merge or deployment. No production
readiness claim is made.

**Implemented and awaiting independent technical and final audit.**
