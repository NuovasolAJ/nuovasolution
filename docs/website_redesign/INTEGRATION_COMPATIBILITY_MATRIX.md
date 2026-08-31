# INTEGRATION COMPATIBILITY MATRIX — NuovaSolution Website

**Author:** Final Website Reconciliation Director (Chat 5)
**Branch:** `website_enterprise_redesign`
**Created:** 2026-08-31
**Companion documents:** `FINAL_RECONCILIATION_REPORT.md` (conflicts and decisions),
`FINAL_WEBSITE_INTEGRATION_PLAN.md` (the next wave)
**Last updated:** 2026-08-31 — **export-v2 + AF addendum** (see §0V).

**Canonical technical source (CURRENT):** `backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2.md`
plus `…_v2_AF_ADDENDUM_v1.md` for AF-01, AF-04 and AF-07.
**`…_EXPORT_v1.md` is HISTORICAL.** Both current files were SHA256-verified before this update
(`FINAL_RECONCILIATION_REPORT.md` §0V.0: two matches on full digests).

> **Nothing in this document is production ready and nothing here has been verified end to end.**
> Every backend status is a statement about what the canonical handoff says. Every website status is a
> statement about what exists in this repository, which today is: nothing. No frontend route below
> exists; every one is `PROPOSED`.

> **READ §0V FIRST.** §§1 to 6 were written against export-v1. **§0V supersedes them wherever they
> differ.** The v1-era text is retained deliberately so a superseded status cannot be reintroduced.

---

## 0V. Export-v2 corrections to this matrix (BINDING)

Rationale for each correction is in `FINAL_RECONCILIATION_REPORT.md` §0V.3. This section carries only
what changes in the tables below.

### 0V.1 Capability status corrections

| Ref | Row | Was (v1) | **Is now (v2 + addendum)** |
|---|---|---|---|
| §2.2 2.1 | 14 day trial | BACKEND CONFIRMED; publishable OWNER DECISION PENDING | **BACKEND CONFIRMED, and the trial is confirmed FREE.** v2 §A3, §C1 |
| §2.2 2.2 | The word "free"; "no credit card required" | not in the handoff; OWNER DECISION PENDING | **BACKEND CONFIRMED as fact:** 14 days free, **no payment method at signup**. The *wording* still needs `CLAIMS_MATRIX.md` T-01 ratification by its owning chat |
| §2.2 2.5 | Trial reminders | blocked on MF-06 | **BACKEND CONFIRMED.** `reminder_3d`, `reminder_1d`, `testimonial_invite`. Backend-sent; the website reflects `trial_end` and `days_left` and sends nothing |
| §2.2 2.6–2.7 | Testimonial state | `pending \| approved \| rejected` | **Six values:** `invited \| submitted \| pending_review \| approved \| rejected \| withdrawn`. `POST /testimonial` returns `{ ok, status:"pending_review" }` |
| §2.2 2.10 | Testimonial video | BLOCKED, no media field | **BACKEND IMPLEMENTATION REQUIRED.** `media_ref` is a **string reference**; there is no upload or storage pipeline. Written testimonial is fully confirmed. **Do not fake a video upload field.** Still `LEGAL REVIEW PENDING` (L-13) |
| §2.3 3.0 | Wizard projection | shape blocked on MF-05 | **BACKEND CONFIRMED.** Exact shape in v2 §G, including `needs_action_steps` and `legend`'s five keys |
| §2.3 3.0 | Wizard ordering | not stated | **BACKEND CONFIRMED: not forced linear.** Each step's status is computed independently; `resume_step` is a convenience pointer only |
| §2.3 3.3 | `branding` footer or signature | third upload block, blocked on AF-03 | **Premise void. Text fields, not uploads.** Footer is localized legal text; signature is `signature_mode` ∈ `logo_only \| compact \| banner_signature \| legal_only` plus text. Website submits **plain text only**, never raw HTML |
| §2.3 3.4 | `team` office | no office source | **BACKEND CONFIRMED.** `GET /offices`; `office_id` opaque, optional, `null` ⇒ tenant level; role-gated; new error `office_out_of_scope` (403) |
| §2.4 4.13 | Branding upload limits | blocked on MF-07 | **BACKEND CONFIRMED.** `image/png, image/jpeg, image/webp, image/gif`, **max 5 MB**, kinds `logo` and `email_banner` only. Bucket `agency-branding` |
| §2.4 4.13 | `GET /branding/preview` | shape elided (AF-07) | **BACKEND CONFIRMED.** See §0V.3 |
| §2.4 4.1–4.4 | Provider display names | blocked | **BACKEND CONFIRMED.** email → **Gmail**; whatsapp → **WhatsApp**; calendar → **Google Calendar** · **Microsoft Outlook**; **voice → generically "Voice" or "Phone" only.** No internal carrier name, ever. No logos until brand approval |
| §2.5 5.3 | Plans | `{ code, name, price_display, features_summary }` | **`{ code, display_name, entitlements_summary }` — no price.** Field renames are a typed-client change |
| §2.5 5.4 | Prices | "served, never authored" | **VOID. No price exists.** `billing_plan` has no price and no currency column. There is **no backend pricing, currency or tax authority**. The website displays plan names and entitlement summaries and **no figure from any source** |
| §2.7 | Hot lead alerting | **BLOCKED on MF-02** | **OUT OF SCOPE (website).** Internal agent notification plus CRM and dashboard surfacing. No public endpoint exists and none is required. **The website builds nothing. No marketing claim is authorised by this** — that remains a `CLAIMS_MATRIX.md` decision with no approved wording |
| §4 step 7 | Dashboard destination | BLOCKED on MF-03 | **PROPOSED and website-owned.** Backend signal is `activatable` plus `tenant_activate`; the backend owns no route. Recommended `/{locale}/app`. Now owner decision AD-01, not a backend gap |

### 0V.2 Endpoint contract deltas against §3

| Surface | Change |
|---|---|
| `GET /plans` | `{ plans:[{ code, display_name, entitlements_summary }] }`. **No price field.** Error `server_error` (500, retryable) |
| `POST /testimonial` | Returns `{ ok, status:"pending_review" }`. Errors `submission_already_pending` (409), `extension_already_granted` (409), `submission_id_required` (400), `consent_required` (422), `forbidden` (403) |
| `GET /testimonial/status` | `{ state }` over **six** values |
| `POST /signup` | Adds `captcha_failed` (400) and `email_exists` (409) |
| GoTrue token | Adds `email_not_confirmed` (400). **RS-01:** v1 said signup creates a *confirmed* user; whether a confirmation step exists is not stated |
| `POST /onboarding/touch` | Adds `invalid_wizard_action` (400) |
| `POST /branding/upload-init` | Adds `invalid_asset_kind` (400) |
| **`GET /offices`** | **New surface.** `{ offices:[{ office_id, name, is_default }] }`, `no_session` (401, retryable). BFF only |
| `POST /team/invite` | Adds `office_out_of_scope` (403) and `invalid_role` (400) |
| `POST /connect/{provider}/start`, `POST /crm/connect/{provider}/start` | Add `invalid_provider` (400) |
| **`{FRONTEND}/{locale}/connect/callback`** | **New website route.** One shared OAuth return route. See §0V.4 |
| `POST /demo/book` | **Still PROPOSED.** Not implemented, not typed as real, not wired |

**Global codes (v2 §F), all confirmed:** `no_session` (401, retry after refresh), `token_expired`
(401, retryable), `forbidden` (403), `cross_tenant` (403), `not_on_plan` (403), `invalid_input`
(400), `unprocessable` (422), `rate_limited` (429, retryable after `Retry-After`), `server_error`
(500, retryable), `externally_pending` (202 — **not an error, render pending**).

**MF-04 is closed.** Error copy is written per `code`, not per HTTP status.

### 0V.3 `GET /branding/preview` — confirmed shape

```json
{
  "logo": "string | null",
  "logo_present": true,
  "email_banner": "string | null",
  "email_banner_present": true,
  "fallback_note": "string"
}
```

URLs are durable **public** URLs, safe to render directly. `email_banner` is non-null **only when the
asset validates**. No bucket, object ID, signed URL or credential is exposed. The canonical shape is
`preview`; `POST /branding/commit` returns `{ ok, kind, stored_url, preview }` carrying the same
object, and the shape is **never derived from `commit`**.

### 0V.4 OAuth return contract — confirmed

```
BFF /connect/{provider}/start    → { authorize_url }        (state minted server-side)
provider → BFF /connect/{provider}/callback?code=…&state=…  (server exchanges code → token)
BFF → 302 {FRONTEND}/{locale}/connect/callback
        ?provider={p}&status=success|error&correlation={state}&reason={code?}
```

`correlation` is the opaque server-issued state and is **never a token**. The website never receives
a token.

| Provider outcome | `status` / `reason` | Website treatment |
|---|---|---|
| valid `code`, exchange succeeds | `success` | `connected`, or `externally_pending` on `202` |
| `error=access_denied` | `error` / **`user_cancelled`** | **Row returns to its previous status. Neutral and resumable. Never an error treatment, never `signal-critical`** |
| any other `error`, or exchange failure | `error` / `provider_error` | `action_required` |
| unrecognised, missing params, state mismatch | `error` / `provider_error` | `action_required` |

**Fail-safe, required:** anything that is not an explicit successful code exchange is `error`; an
unknown outcome maps to `provider_error` and **never** to `success`.

**A persisted, queryable cancellation state is BACKEND HARDENING and is explicitly not a website
launch blocker.** The connection record has no `cancelled` value, so after the fact a cancellation
collapses to `error`. The live callback semantics are fully satisfied at the BFF.

### 0V.5 Polling — confirmed, and bounded

**There is no backend polling contract and no push channel.** Status is read once after the OAuth
callback, and once on an explicit user refresh. A **conservative website-side auto-refresh is
permitted as an explicitly website-owned decision**, provided it is never presented as a backend
contract and it stops on a terminal state (`connected | error | degraded`) or when the user leaves
the step. The no-polling default stands; any refresh is opt-in and never described as guaranteed.

### 0V.6 Missing field register after v2

| Open | Classification |
|---|---|
| **MF-01** testimonial media | BACKEND IMPLEMENTATION REQUIRED · LEGAL REVIEW PENDING |
| **MF-08** captcha provider | OWNER DECISION REQUIRED |
| **MF-10** currency, tax basis, IVA | OWNER DECISION REQUIRED · LEGAL REVIEW REQUIRED. **No backend pricing authority exists at all** |

**Closed or reclassified:** MF-02 (out of scope), MF-03 (website-owned, PROPOSED), MF-04, MF-05,
MF-06, MF-07, MF-09, MF-11, MF-12 (all CONFIRMED). **AF-01, AF-02, AF-03, AF-04, AF-05, AF-06, AF-07
all closed**; AF-01 leaves a non-blocking backend hardening item.

### 0V.7 Release blocking invariants — additions to §6

9. **No price is displayed anywhere**, because none exists in any contract (V2-01).
10. **`reason=user_cancelled` is never rendered as a provider failure** (V2-10).
11. **No internal telephony carrier or vendor name is ever rendered.** Voice is generically named
    (V2-11).
12. **The website submits footer and signature as plain text and never injects raw HTML**; the server
    sanitizes and renders (V2-06).
13. **The website builds no hot lead alerting surface**, and asserts no alerting claim (V2-04).

---

## 1. How to read this document — *v1 era, corrected by §0V*

Status vocabulary is defined in `FINAL_RECONCILIATION_REPORT.md` §1 and is binding:

`BACKEND CONFIRMED` · `WEBSITE INTEGRATION PENDING` · `WEBSITE IMPLEMENTED` · `WEBSITE VERIFIED` ·
`END TO END VERIFICATION PENDING` · `LEGAL REVIEW PENDING` · `OWNER DECISION PENDING` · `RESERVED` ·
`PROPOSED` · `BLOCKED`

`LIVE` and `PRODUCTION READY` are removed from the project vocabulary.

**Three columns matter and they are independent of each other.**

| Column | Answers |
|---|---|
| **Backend** | Does a contract exist in the handoff? |
| **Website** | Does code exist in this repository? |
| **Publishable** | May the public site say it? Governed by `CLAIMS_MATRIX.md`, never by the two columns to the left. |

A row can be `BACKEND CONFIRMED` and still be unpublishable. That is normal.

---

## 2. Capability compatibility

### 2.1 Authentication and session

| # | Capability | Backend | Website | Publishable | Notes |
|---|---|---|---|---|---|
| 1.1 | Signup, tenant bootstrap, `agency_admin` membership | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | OWNER DECISION PENDING | `POST {NUOVA_API_BASE}/signup`, public + captcha + rate limit. BFF only, service role provisioning. |
| 1.2 | Login (password grant) | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | OWNER DECISION PENDING | GoTrue native, browser safe with anon key. Prefer `@supabase/ssr`, httpOnly cookies. |
| 1.3 | Logout | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | n/a | GoTrue native. |
| 1.4 | JWT session, refresh, retry once on `401` | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | n/a | Tenant and role derived **server side** from `sub`. Client never sends a privileged `client_id` or `role`. |
| 1.5 | Cross tenant isolation | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | **REJECTED as a public claim** | Handoff §1 states it was proven on staging. `CLAIMS_MATRIX.md` B-15 and N-03 still reject every security and isolation claim. Do not turn a technical invariant into marketing. |

### 2.2 Trial

| # | Capability | Backend | Website | Publishable | Notes |
|---|---|---|---|---|---|
| 2.1 | 14 day trial exists, started at signup | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | OWNER DECISION PENDING | Implicit in `/signup`. No separate call. Closes `IMPLEMENTATION_STATUS.md` C-01 as to existence. |
| 2.2 | The word **free**, and "no credit card required" | **not in the handoff** | — | OWNER DECISION PENDING / REJECTED until confirmed | `CLAIMS_MATRIX.md` T-01 forbids each wording separately. |
| 2.3 | Trial status, `days_left`, `trial_end`, `account_state` | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | Renderable once the surface exists | `GET /trial/status`. `status ∈ trialing \| trial_expired \| active \| past_due \| suspended \| canceled`. **Never computed client side.** |
| 2.4 | Trial expiry behaviour | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | OWNER DECISION PENDING on wording | On `trial_expired`, premium features resolve to `denied`; the UI shows conversion prompts and **never blocks login**. |
| 2.5 | Trial reminders | **not in the handoff** (MF-06) | BLOCKED | — | Cadence and ownership unspecified. |
| 2.6 | Testimonial submission, stored pending moderation | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | **LEGAL REVIEW PENDING** (L-13) | `POST /testimonial` → `{ ok, state:"pending" }`. |
| 2.7 | Testimonial state `pending \| approved \| rejected` | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | LEGAL REVIEW PENDING | `GET /testimonial/status`. Only owner approved testimonials are published. |
| 2.8 | Manual owner approval gate | BACKEND CONFIRMED | n/a | LEGAL REVIEW PENDING | `trial_extend_for_feedback`, requires approved. Upload never auto grants. |
| 2.9 | Exactly once, plus 7 days | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | **LEGAL REVIEW PENDING**, DISABLED for public display | `CLAIMS_MATRIX.md` T-03. **The website never hardcodes 7.** It renders the updated `trial_end` from `/trial/status` (handoff §2 honesty note). |
| 2.10 | Testimonial **video** | **BLOCKED** — no media field in the contract (MF-01) | BLOCKED | LEGAL REVIEW PENDING | Direct gap against `PRODUCT_TRUTH.md` §18.2. See report C-10. |

### 2.3 Onboarding wizard (ten steps)

| # | Step key | Backend | Website | Publishable as a name | Notes |
|---|---|---|---|---|---|
| 3.0 | Wizard projection: `percent_complete`, `resume_step`, `completed_steps`, `total_steps`, `activatable`, `legend`, `steps[]` | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | — | `GET /onboarding/state`. Per step `detail` shape unspecified (MF-05). |
| 3.0b | Progress and resume write | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | — | `POST /onboarding/touch { step, action:"visit"\|"skip" }`, requires `manage_users`. |
| 3.1 | `account` | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | Yes | `completed` when contact email present. |
| 3.2 | `agency` | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | Yes | Company name, website, address, phone, legal/footer, preferred languages. `completed` when name + timezone set. |
| 3.3 | `branding` | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | Yes, per N-01 wording | Logo, email banner, footer/signature, preview. Upload contract in §3.4. |
| 3.4 | `team` | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | Yes | `completed` at ≥ 1 active employee. Roles: `agent`, `team_lead`, `office_manager`, `agency_admin`. |
| 3.5 | `communication` | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | Yes, with Q-2 and Q-5 | Email, WhatsApp/Meta, Calendar, Voice when entitled. `externally_pending` during Meta/WhatsApp verification. `voice_locked` when voice is not entitled. |
| 3.6 | `lead_acquisition` | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | Yes, with Q-1 and Q-2 | Google Lead Forms, Meta Lead Ads, CTWA, Social when entitled. `locked_by_plan`, `externally_pending`, `optional`. |
| 3.7 | `crm` | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | Nuova CRM: yes. External vendor names: OWNER DECISION PENDING | **Nuova universal CRM is the default and `completed` with no action.** External CRM is `externally_pending` until authorised. |
| 3.8 | `property_source` | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | Yes, with the F-02 qualifier | Agency website (scraped), supported feed, CRM inventory, other authorized. **Agency owned scraped inventory is a first class valid source and is never blocked for being scraped.** |
| 3.9 | `property_experience` | BACKEND CONFIRMED (entitlement + entry only) | WEBSITE INTEGRATION PENDING | K-01 … K-12 keep their existing verdicts; **K-05 LEGAL REVIEW PENDING** | `px.experience` entitlement. Entitled → available; otherwise `locked_by_plan`. **The 3D room based 360 capture wizard belongs to the PX lane. The website must not build a second one.** |
| 3.10 | `ready` | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | Yes | Readiness / health summary. `completed` when the tenant is `activatable`. **Dashboard destination is BLOCKED on MF-03.** |

### 2.4 Provider, CRM, acquisition and property source surfaces

| # | Capability | Backend | Website | Publishable | Notes |
|---|---|---|---|---|---|
| 4.1 | Email connection | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | B-02 with Q-5 | OAuth start + status via BFF. Named mailbox providers stay forbidden. |
| 4.2 | WhatsApp / Meta connection (**the agency's own**) | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | B-01 with Q-5 | Not NuovaSolution's business number. See 8.4. |
| 4.3 | Calendar connection | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | G-07 with the calendar qualifier | |
| 4.4 | Voice channel connection | BACKEND CONFIRMED (connection surface only) | WEBSITE INTEGRATION PENDING | **No.** V-01 … V-13 unchanged | `403 not_on_plan` when unentitled. This is not evidence of voice AI capability. |
| 4.5 | Google Lead Forms intake | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | A-01 with Q-2 | `/paid/connect/google`, `/paid/status`. |
| 4.6 | Meta Lead Ads intake | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | A-02 with Q-2 | `externally_pending` while Meta approval is outstanding. |
| 4.7 | Click to WhatsApp attribution | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | A-03 with Q-2, LEGAL on L-08 | |
| 4.8 | Social publishing entitlement | BACKEND CONFIRMED (entitlement key only) | WEBSITE INTEGRATION PENDING | C-01 … C-08 unchanged | `social.publish` in `/entitlements`. **No platform is named anywhere in the handoff.** |
| 4.9 | External CRM connection (hubspot, pipedrive, zoho, salesforce) | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | **Vendor names: OWNER DECISION PENDING. Vendor logos: BLOCKED** | Registry, per provider OAuth start, connection state, health probe, mapping validation, Salesforce `prod \| sandbox`. Supersedes the evidentiary ground of F-07. See report C-11. |
| 4.10 | CRM connector health | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | No public claim | `{ provider, contract_version, crm_map_version, health_probe, mapping_validation:{ ok, missing_api_names[] }, label_independence }`. Agency facing only. |
| 4.11 | Named property portals (Idealista, Fotocasa, …) | **not in the handoff** | — | **REJECTED**, unchanged | F-06. The asymmetry with 4.9 is deliberate. |
| 4.12 | Property source connect and status | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | F-02 with its qualifier | `accepts_scraped_owned_inventory: true`. |
| 4.13 | Branding asset upload, commit, preview, remove | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | N-01, N-02 | Signed upload URL minted in the BFF. Limits unspecified (MF-07). |
| 4.14 | Team invite | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | O-02, once the matrix is updated | `employee_onboard → user_provision → user_bind_auth`. |

### 2.5 Entitlements, plans and billing

| # | Capability | Backend | Website | Publishable | Notes |
|---|---|---|---|---|---|
| 5.1 | Entitlement snapshot | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | — | `GET /entitlements → { features:{ "px.experience":"enabled\|deferred\|denied", "social.publish":…, "assistant":… }, account_state }`. **Technical keys are never shown to the agency** (Appendix B invariant 6). |
| 5.2 | Entitlement enforcement is technical, per tenant | BACKEND CONFIRMED | — | Answers PK-08 and O-07's technical half | "Unlocks" becomes defensible wording. |
| 5.3 | Three plans `essential \| growth \| scale` | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | PK-01 approved; **PK-02 public names OWNER DECISION PENDING** | Internal IDs. `GET /plans` returns `{ code, name, price_display, features_summary }`. |
| 5.4 | Prices | BACKEND CONFIRMED as **served**, never authored | WEBSITE INTEGRATION PENDING | OWNER DECISION PENDING (PK-06, PK-07) | The website renders `price_display`. It never hardcodes a figure. Currency and tax basis unspecified (MF-10). |
| 5.5 | Feature to package mapping | **not in the handoff** | BLOCKED | OWNER DECISION PENDING (PK-04) | |
| 5.6 | Limits and quotas | **not in the handoff** | BLOCKED | OWNER DECISION PENDING (PK-05) | No number, and no visual implication of one: no bars, no dots, no "up to", no comparative column heights. |
| 5.7 | Subscription state | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | — | `{ account_state, plan, cancel_at_period_end }`. |
| 5.8 | Checkout handoff | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | — | `POST /checkout/session { plan_code } → { checkout_url }`. Payment secret and price IDs are BFF only. |

### 2.6 Property Experience

| # | Capability | Backend | Website | Publishable |
|---|---|---|---|---|
| 6.1 | `px.experience` entitlement and entry state | BACKEND CONFIRMED | WEBSITE INTEGRATION PENDING | K-12 with its qualifier |
| 6.2 | Panorama per room, floor and ceiling, door navigation, room names, floor plan, orientation, multiple floors, stair transitions, structured navigation | **not in the handoff** | — | K-01 … K-11 unchanged, per `CLAIMS_MATRIX.md` §12 |
| 6.3 | Square metres from a verified source | **not in the handoff** | — | **LEGAL REVIEW PENDING** (L-12). Dropped entirely if sourcing is not enforced. |
| 6.4 | Capture wizard | Owned by the PX lane | **Out of scope for the website** | — |

### 2.7 Capabilities the handoff does not touch (verdicts unchanged)

| Capability | Backend | Publishable |
|---|---|---|
| AI reply behaviour, multilingual conversation, memory, handover | not in the handoff | `CLAIMS_MATRIX.md` §3 unchanged |
| Response time as a number | not in the handoff | REJECTED (B-06) |
| Lead qualification, scoring, priority | not in the handoff | §5 unchanged; D-04 REJECTED, D-09 LEGAL |
| **Hot lead alerting** | **not in the handoff (MF-02)** | **BLOCKED.** No matrix row exists, so no wording exists. |
| Follow up, nurturing, reactivation | not in the handoff | LEGAL REVIEW PENDING (L-01, L-02) |
| Image, document, audio understanding and storage | not in the handoff | LEGAL REVIEW PENDING (L-03, L-04, L-05) |
| Daily Assistant question set | `assistant` entitlement key only | §10 unchanged, every row OWNER |
| Reporting metrics | not in the handoff | §11 unchanged. "Supported conversions" exact, never shortened |
| Team performance visibility | not in the handoff | LEGAL REVIEW PENDING (L-11) |
| Social platform names | not in the handoff | unchanged |

### 2.8 Reserved and proposed (never presented as working)

| # | Item | Status | Permitted | Forbidden |
|---|---|---|---|---|
| 8.1 | Website Voice sales concierge (`POST /sales-bot/turn`) | **RESERVED** | Visual preparation, clearly marked as reserved | Any live behaviour, any availability implication, any present tense wording |
| 8.2 | Website WhatsApp sales concierge (same reserved endpoint) | **RESERVED** | Same | Same |
| 8.3 | Website chat assistant | **RESERVED** | A designed pending panel offering *Book a demo*, or omission | A launcher that accepts input and never answers — P0 |
| 8.4 | NuovaSolution business WhatsApp number for the public CTA | **BLOCKED** | Nothing | Inventing a number (R7). C-05 is not resolved by the handoff |
| 8.5 | Demo booking backend `POST /demo/book` | **PROPOSED** | Documenting the shape | Implementing it, typing it as real, or wiring it |
| 8.6 | Cal.com demo booking | Existing external option | Documented as an existing external scheduling tool; A-02 fixed with a real `href` + progressive enhancement | A duration or outcome promise; treating it as a product system; making it a prerequisite to a trial |
| 8.7 | `Talk to Nuova` | **BLOCKED**, retired | Nothing | Using the label at all |

---

## 3. Endpoint mapping: browser safe versus BFF

All 28 surfaces from handoff §5. `{NUOVA_API_BASE}` and `{SUPABASE_URL}` come from environment
variables. **No target is hardcoded in source.**

### 3.1 Browser safe

| Surface | Method + path | Auth carried by the browser |
|---|---|---|
| Login | `POST {SUPABASE_URL}/auth/v1/token?grant_type=password` | `apikey: {anon}` |
| Logout | `POST {SUPABASE_URL}/auth/v1/logout` | user Bearer |
| Refresh | `POST {SUPABASE_URL}/auth/v1/token?grant_type=refresh_token` | SDK managed |
| PostgREST RPC | `{SUPABASE_URL}/rest/v1/rpc/*` | `apikey: {anon}` + user Bearer. **Only functions granted to `authenticated`.** Not used by default. |

### 3.2 BFF only

| # | Surface | Method + path | Auth | Why it cannot be browser side |
|---|---|---|---|---|
| 1 | Signup / start trial | `POST /signup` | none + captcha | Service role provisioning, trial seed, hashing |
| 4 | Trial status | `GET /trial/status` | Bearer | Billing internals |
| 5 | Testimonial submit | `POST /testimonial` | Bearer (or public + captcha — MF-12) | Moderation state |
| 6 | Testimonial status | `GET /testimonial/status` | Bearer | Publish decision |
| 7 | Plans list | `GET /plans` | none | Pricing internals |
| 8 | Subscription state | `GET /subscription/state` | Bearer | Billing internals |
| 9 | Checkout handoff | `POST /checkout/session` | Bearer | Payment secret, price IDs |
| 10 | Entitlement snapshot | `GET /entitlements` | Bearer | Plan internals |
| 11 | Onboarding state | `GET /onboarding/state` | Bearer | Gate resolvers |
| 12 | Onboarding resume write | `POST /onboarding/touch` | Bearer, `manage_users` | Progress persistence |
| 13 | Branding upload init | `POST /branding/upload-init` | Bearer, `manage_users` | Signed URL minting |
| 14 | Branding commit | `POST /branding/commit` | Bearer, `manage_users` | Service role storage write |
| 15 | Branding preview / remove | `GET /branding/preview` · `POST /branding/remove` | Bearer, `manage_users` | Physical object delete |
| 16 | Team invite | `POST /team/invite` | Bearer, `manage_users` | Provisioning, auth binding |
| 17 | Provider connect start | `POST /connect/{email\|whatsapp\|calendar\|voice}/start` | Bearer | Client secret, state and nonce |
| 18 | Provider connect status | `GET /connect/{provider}/status` | Bearer | Tokens, webhook secrets |
| 19 | Paid connect | `POST /paid/connect/{google\|meta\|ctwa}` | Bearer | Ad tokens, app secrets |
| 20 | Paid status | `GET /paid/status` | Bearer | — (kept server side for consistency) |
| 21 | CRM providers | `GET /crm/providers` | Bearer | — |
| 22 | CRM connect start | `POST /crm/connect/{provider}/start` | Bearer | OAuth client secret |
| 23 | CRM status | `GET /crm/status` | Bearer | Tokens, instance URL |
| 24 | CRM health | `GET /crm/health?provider={p}` | Bearer | — |
| 25 | Property source connect | `POST /property-source/connect` | Bearer | Scrape and feed credentials |
| 26 | Property source status | `GET /property-source/status` | Bearer | — |
| 27 | PX entry | `GET /px/entry` | Bearer | — |
| 28 | Demo booking | `POST /demo/book` | none + captcha | **PROPOSED. Not implemented.** |

Also BFF only, and never client routes: **provider OAuth callbacks** and **checkout webhooks**, with
signature verification server side against the server only secret.

### 3.3 Response envelope and status handling

Uniform envelope on every BFF surface:
`{ "ok": true|false, "code": "string", "message": "display-safe", "details": { }, "request_id": "uuid" }`

| HTTP | Meaning | Required frontend treatment |
|---|---|---|
| `200` / `201` | ok | Success state stating what happened and what happens next |
| `202` | `externally_pending` | **Render as pending, never as done.** Appendix B invariant 5 |
| `400` | `invalid_input` | Field level error, `aria-invalid`, `aria-describedby` |
| `401` | `no_session` / `token_expired` | Refresh once, retry once, then route to login |
| `403` | `forbidden` / `cross_tenant` / `not_on_plan` | `not_on_plan` uses the upgrade treatment, **not** an error treatment |
| `409` | `conflict` | Distinct copy per case, e.g. email already exists |
| `422` | `unprocessable` | e.g. `consent_required` on testimonial |
| `424` | `degraded` | Warn plus "action recommended". Not a hard error, not `connected` |
| `429` | `rate_limited` | Human message plus a retry affordance |
| `5xx` | `server_error` | Never leak internals. Offer `request_id` as a copyable support reference only |

The `code` enumeration is not specified in the handoff (MF-04) and is required before error copy can be
written.

### 3.4 Provider and step status vocabulary

Eight values. Every one renders as **icon + text + colour**, never colour alone
(`LUXURY_UX_MEDIA_SYSTEM.md` §2.1, §7).

| Status | Kind | UI intent | Token |
|---|---|---|---|
| `completed` | wizard step | Done, verified server side | `signal-positive` |
| `needs_action` | wizard step | Prompt the action | `signal-attention` |
| `externally_pending` | wizard step | "Pending, waiting on {provider}". **Never shown as done** | `signal-attention` |
| `locked_by_plan` | wizard step | Upgrade path, **not an error**. §5.9 honest state | neutral + accent |
| `optional` | wizard step | De-emphasised | `text-muted` |
| `connected` | connector health | Live and healthy | `signal-positive` |
| `degraded` | connector health | Impaired. Additive, not a hard error, not `connected` | `signal-attention` |
| `action_required` | connector health | A real problem the owner must resolve | `signal-critical` |

---

## 4. Customer journey reconciliation

The confirmed target flow, step by step. **Every frontend route is `PROPOSED`.** None exists. Route
names are placeholders until the owner confirms the locale strategy (LUXURY D-12) and route naming
(D-11). `[locale]` is `en` or `es`.

Column key: **BFF?** = must the call go through the server. **Legal** = the blocking
`CLAIMS_MATRIX.md` §22 dependency.

---

### Step 1 — Website entry

| Field | Value |
|---|---|
| Frontend route | `/[locale]` — **PROPOSED** |
| Frontend state | Anonymous. No session read on the marketing tree. |
| Backend contract | None. |
| Auth | None. |
| BFF? | No. |
| Loading | Static. LCP is the `display-xl` headline (LUXURY §8.1). |
| Error | 404 and 500 per LUXURY §5.15. |
| Resume | n/a. |
| Mobile | LUXURY §9.2 `H-01` … `H-12`, mobile composed separately. Sticky bar carries **one** CTA. |
| Analytics | `page_view`, `cta_demo_click`, `cta_trial_start_click` (name reserved, not fired until the CTA exists) |
| Legal | Cookie and analytics notice. Anything beyond cookieless requires consent before it loads. |
| Status | WEBSITE INTEGRATION PENDING · END TO END VERIFICATION PENDING |

### Step 2 — Start trial (the CTA)

| Field | Value |
|---|---|
| Frontend route | `/[locale]/signup` — **PROPOSED** |
| Frontend state | Anonymous. |
| Backend contract | None at click time. |
| Auth | None. |
| BFF? | No. |
| Loading | n/a. |
| Error | n/a. |
| Resume | n/a. |
| Mobile | Full width primary button, one primary per viewport (LUXURY §5.1 rule 1). |
| Analytics | `cta_trial_start_click` |
| Legal | Wording gated by T-01. |
| Status | **OWNER DECISION PENDING** on the word "free" (report C-08). Under `MASTER_GOVERNANCE.md` §14.3 the CTA stays a marked placeholder until individually released. |

### Step 3 — Signup

| Field | Value |
|---|---|
| Frontend route | `/[locale]/signup` — **PROPOSED** |
| Frontend state | Form state, captcha token, submitting, error, success. |
| Backend contract | `POST {NUOVA_API_BASE}/signup` `{ name, email, password, language, agency_name }` → `{ ok, next:"onboarding", session? }`. Errors `409` email exists, `400`. |
| Auth | None + captcha + rate limit. |
| BFF? | **Yes.** Service role provisioning, trial seed, hashing. |
| Loading | Submit locked, width locked, `aria-busy="true"`, spinner only after 300 ms (LUXURY §5.6). |
| Error | `409` distinct copy with a route to login. `400` field level. `429` human message + retry. Fallback path always offered. |
| Resume | If `session` is returned, continue to the wizard. If only a login hint, route to login. |
| Mobile | `container-narrow`, ivory canvas, 52 px fields, labels always visible, `autocomplete`/`inputmode` set. |
| Analytics | `signup_form_open`, `signup_form_submit`, `signup_form_success`, `signup_form_error` |
| Legal | **L-07** consents and controller/processor roles. **L-14** privacy policy, launch blocking and now materially enlarged (report C-22). Privacy line at the point of collection. |
| Status | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING · LEGAL REVIEW PENDING · blocked on MF-08 (captcha provider) and MF-09 (`language` values) |

### Step 4 — Login

| Field | Value |
|---|---|
| Frontend route | `/[locale]/login` — **PROPOSED** |
| Frontend state | Form state, session, refresh. |
| Backend contract | `POST {SUPABASE_URL}/auth/v1/token?grant_type=password`, header `apikey`. Error `400 invalid_grant`. |
| Auth | anon key. |
| BFF? | **No**, but prefer `@supabase/ssr` so the session lands in httpOnly cookies rather than `localStorage`. |
| Loading | As step 3. |
| Error | `invalid_grant` as one non enumerating message. No account existence disclosure. |
| Resume | On success route to `resume_step`, not to step 1. |
| Mobile | As step 3. |
| Analytics | `nav_login_click`, `login_submit`, `login_success`, `login_error` |
| Legal | L-07, L-14. |
| Status | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING |

### Step 5 — 14 day trial active

| Field | Value |
|---|---|
| Frontend route | Global banner across the authenticated tree — **PROPOSED** |
| Frontend state | `{ status, plan, trial_end, days_left, account_state }`, server fetched, never computed client side. |
| Backend contract | `GET {NUOVA_API_BASE}/trial/status`. |
| Auth | Bearer. |
| BFF? | **Yes.** |
| Loading | Reserved height so the banner never shifts the page (LUXURY §5.14, §8.2). |
| Error | `401` refresh once, retry once, then login. On any other failure the banner renders nothing rather than a guess. |
| Resume | Re-fetched on each authenticated navigation. |
| Mobile | Single line, never covering the primary action, inside `env(safe-area-inset-*)`. |
| Analytics | `trial_status_view` |
| Legal | — |
| Status | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING |

### Step 6 — Onboarding wizard shell (10 steps)

| Field | Value |
|---|---|
| Frontend route | `/[locale]/onboarding` and `/[locale]/onboarding/[step]` — **PROPOSED** |
| Frontend state | The full projection: `percent_complete`, `resume_step`, `completed_steps`, `total_steps`, `activatable`, `legend`, `steps[]`. |
| Backend contract | `GET /onboarding/state`; `POST /onboarding/touch { step, action:"visit"\|"skip" }` → `{ ok, resume_step, percent_complete }`. |
| Auth | Bearer. `touch` additionally requires `manage_users`. |
| BFF? | **Yes**, both. |
| Loading | Step list skeleton at the measured height. Progress rendered from `percent_complete`, never computed. |
| Error | `403 forbidden` on `touch` renders read only rather than failing the page. `401` refresh and retry. |
| Resume | **Land on `resume_step`.** Never restart at step 1. `touch` persists position on every step visit. |
| Mobile | Hairline index rows (LUXURY `PO-03` pattern), **not cards**. Step title, status text + icon, one line of detail. Row min-height 72 px. |
| Analytics | `onboarding_open`, `onboarding_step_view`, `onboarding_step_skip`, `onboarding_progress` |
| Legal | L-07, L-14. |
| Status | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING · blocked on MF-05 (per step `detail` shape) |

### Steps 6.1 to 6.10 — the ten steps

Shared properties for all ten, stated once: **Auth** Bearer, writes require `manage_users`; **BFF?**
yes for every call; **Loading** reserved height per section, 300 ms spinner rule; **Error** the §3.3
mapping, with `403 not_on_plan` rendered as an upgrade path and never as an error; **Resume** every
step is re-enterable and its status is re-read from `/onboarding/state`; **Mobile** single column,
hairline rows, 44 px targets, status label above the fold; **Legal** L-07 and L-14 throughout;
**Status** BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING · END TO END VERIFICATION PENDING.

| Step | Route (PROPOSED) | Contract | Step specific notes | Analytics |
|---|---|---|---|---|
| 6.1 `account` | `/onboarding/account` | projection only | `completed` when contact email present | `onboarding_account_*` |
| 6.2 `agency` | `/onboarding/agency` | projection only | Name, website, address, phone, legal/footer, preferred languages. `completed` at name + timezone | `onboarding_agency_*` |
| 6.3 `branding` | `/onboarding/branding` | `POST /branding/upload-init` → `{ object_path, signed_upload_url }`; `POST /branding/commit { kind, object_path }` → `{ ok, stored_url, preview }`; `GET /branding/preview`; `POST /branding/remove { kind }` | **File upload law does not exist in the design system yet** (report §5.2 gap 16). Errors `400 unsupported_file_type`, `400 file_too_large`, `403 cross_tenant_asset`, `422 upload_not_found`. Limits unspecified (MF-07). Signed URL minting is BFF only | `branding_upload_*`, `branding_commit_*`, `branding_remove` |
| 6.4 `team` | `/onboarding/team` | `POST /team/invite { name, email, role, office_id? }` → `{ ok, status:"invited" }` | Roles `agent \| team_lead \| office_manager \| agency_admin`. Errors `403 forbidden`, `403 employee_cross_tenant`, `409`. `completed` at ≥ 1 active employee | `team_invite_*` |
| 6.5 `communication` | `/onboarding/communication` | `POST /connect/{email\|whatsapp\|calendar\|voice}/start` → `{ authorize_url }`; `GET /connect/{provider}/status` | **OAuth round trip: no return state is specified in the design system** (gap 15). `202 externally_pending` renders as pending, never done. `voice_locked` uses the honest state treatment | `connect_start`, `connect_return`, `connect_status_poll` |
| 6.6 `lead_acquisition` | `/onboarding/lead-acquisition` | `POST /paid/connect/{google\|meta\|ctwa}`; `GET /paid/status` → `{ plan:{entitled}, google_lead_forms:{connected,ready}, meta_lead_ads:{connected,ready}, click_to_whatsapp:{connected,ready} }` | `connected` and `ready` are two different things and must render differently. `403 not_on_plan` is an upgrade path | `paid_connect_*`, `paid_status_view` |
| 6.7 `crm` | `/onboarding/crm` | `GET /crm/providers`; `POST /crm/connect/{provider}/start { environment?:"prod"\|"sandbox" }`; `GET /crm/status`; `GET /crm/health?provider={p}` | **Nuova CRM is the default and completes with no action.** External CRM is optional. `424 degraded` warns. `action_required` surfaces `missing_api_names[]` in agency language, **never as raw API identifiers** (Appendix B invariant 6) | `crm_provider_select`, `crm_connect_*`, `crm_health_view` |
| 6.8 `property_source` | `/onboarding/property-source` | `POST /property-source/connect { type:"agency_website\|feed\|crm_inventory\|other_authorized", url?, feed_url? }`; `GET /property-source/status` | Agency website is a first class option and must be presented as such, never as a fallback. Errors `400 invalid_source`, `403 source_not_authorized` | `property_source_select`, `property_source_connect_*` |
| 6.9 `property_experience` | `/onboarding/property-experience` | `GET /px/entry` → `{ entitled, state:"available"\|"locked_addon", action }` | `locked_addon` uses the upgrade treatment. **The capture wizard belongs to the PX lane; the website links to it and does not rebuild it** | `px_entry_view`, `px_upgrade_click` |
| 6.10 `ready` | `/onboarding/ready` | projection `activatable` + `legend` | Readiness summary. **The dashboard destination is BLOCKED on MF-03** | `onboarding_ready_view`, `dashboard_handoff_click` |

### Step 7 — Dashboard handoff

| Field | Value |
|---|---|
| Frontend route | **Unknown.** BLOCKED on MF-03. |
| Everything else | Cannot be specified. See report C-27: without this the website does not know whether it is building a marketing site plus a wizard that hands off, or the whole authenticated application. |
| Status | **BLOCKED** · OWNER DECISION PENDING |

### Step 8 — Trial reminder

| Field | Value |
|---|---|
| Frontend route | Global banner — **PROPOSED** |
| Backend contract | `GET /trial/status` `days_left`. **No reminder contract exists** (MF-06). |
| BFF? | Yes. |
| Everything else | The website can render a countdown from `trial_end`. Whether reminders are sent, by whom and on what cadence, is unspecified. |
| Analytics | `trial_reminder_view` |
| Status | Partially BACKEND CONFIRMED · blocked on MF-06 |

### Step 9 — Trial expiry

| Field | Value |
|---|---|
| Frontend route | Global state across the authenticated tree — **PROPOSED** |
| Frontend state | `status = trial_expired`; entitlement features resolve to `denied`. |
| Backend contract | `GET /trial/status`, `GET /entitlements`. |
| Auth | Bearer. **BFF?** Yes. |
| Loading | Reserved height, no shift. |
| Error | `401` refresh and retry. |
| Resume | **Login is never blocked.** The user always reaches their account. |
| Mobile | Conversion prompt is one primary action, never a modal that traps. |
| Analytics | `trial_expired_view`, `trial_expired_cta_click` |
| Legal | Commercial wording OWNER DECISION PENDING. |
| Status | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING |

### Step 10 — Testimonial submission

| Field | Value |
|---|---|
| Frontend route | `/[locale]/account/testimonial` — **PROPOSED**, authenticated only |
| Frontend state | `{ rating, quote, author_name, author_role, consent }`; submitted; `state`. |
| Backend contract | `POST /testimonial` → `{ ok, state:"pending" }`. `422 consent_required`, `429`. |
| Auth | Bearer, or public + captcha — the handoff states both (MF-12). |
| BFF? | **Yes.** Moderation state is server side. |
| Loading | Submit locked, width locked, `aria-busy`. |
| Error | `422 consent_required` is a field level error on an explicit consent control, never a pre-ticked box. |
| Resume | Re-entry shows the current `state`, never a blank form. |
| Mobile | `container-narrow`, ivory. |
| Analytics | `testimonial_open`, `testimonial_submit`, `testimonial_success`, `testimonial_error` |
| Legal | **L-13**, incentivised testimonials. Video is personal data. Consent, purpose limitation, retention and any later marketing use are separate consents. Contract terms belong in terms and conditions, not marketing copy. |
| Status | BACKEND CONFIRMED · **LEGAL REVIEW PENDING, DISABLED for public display** · **BLOCKED on MF-01 (no video field)** |

### Step 11 — `pending_review`

| Field | Value |
|---|---|
| Frontend route | Same as step 10 — **PROPOSED** |
| Backend contract | `GET /testimonial/status` → `{ state:"pending\|approved\|rejected" }`. |
| Auth | Bearer. **BFF?** Yes. |
| Success wording | **Only** "Received. Pending review." Never any wording implying the extension is granted (`PRODUCT_TRUTH.md` §18.5). |
| Error | `401` refresh and retry. |
| Resume | State is re-read on every visit. |
| Mobile | Single status row, icon + text + colour. |
| Analytics | `testimonial_status_view` |
| Legal | L-13. A committed decision window is an organisational commitment the owner must be able to meet. |
| Status | BACKEND CONFIRMED · LEGAL REVIEW PENDING |

### Step 12 — Owner approval and the plus 7 days

| Field | Value |
|---|---|
| Frontend route | None. **The website has no approval surface and must not build one.** |
| Backend contract | Approval is manual and owner side. On approval the trial subsystem applies the extension. The website reflects the new `trial_end` from `GET /trial/status`. |
| BFF? | Yes, for reading `/trial/status` only. |
| Binding rule | **The website never grants the extension, never computes it, and never hardcodes 7.** It renders `trial_end`. |
| Analytics | `trial_extended_view` |
| Legal | L-13. |
| Status | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING · LEGAL REVIEW PENDING |

### Step 13 — Plan selection and upgrade

| Field | Value |
|---|---|
| Frontend route | `/[locale]/pricing` (public) and `/[locale]/account/plan` (authenticated) — both **PROPOSED** |
| Frontend state | `plans[]` from the endpoint; `subscription state`; selected `plan_code`. |
| Backend contract | `GET /plans` → `{ plans:[{ code, name, price_display, features_summary }] }`; `GET /subscription/state`; `POST /checkout/session { plan_code }` → `{ checkout_url }`. Errors `403 not_allowed`, `409 already_subscribed`. |
| Auth | `/plans` none. The other two Bearer. |
| BFF? | **Yes**, all three. Payment secret and price IDs never reach the browser. |
| Loading | Price cells have reserved height so a period toggle cannot change the plane's height (LUXURY §5.7). |
| Error | `409 already_subscribed` routes to the current plan rather than erroring. |
| Resume | Selection is not persisted client side; `subscription/state` is the truth. |
| Mobile | **Never** a horizontally scrolling price table. Vertical stack of tier sections (LUXURY §5.7). |
| Analytics | `pricing_view`, `pricing_package_select`, `pricing_checkout_start`, `pricing_checkout_error` |
| Legal | Spanish IVA handling must be stated explicitly. LEGAL PENDING. |
| Status | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING · **OWNER DECISION PENDING** on PK-02, PK-04, PK-05, PK-07 and MF-10. **No price is ever authored in the website; only `price_display` is rendered.** |

### Step 14 — Book a call (optional)

| Field | Value |
|---|---|
| Frontend route | Existing Cal.com external option, plus site wide CTA. |
| Backend contract | **None.** `POST /demo/book` is **PROPOSED** and must not be implemented. |
| Auth | None. **BFF?** No. |
| Loading | Embed load tracked; on timeout the anchor's real `href` carries the visitor to the booking page. |
| Error | If the embed fails or is blocked, navigation to the real URL happens. **Never `href="#"` + `preventDefault()`** (audit A-02). |
| Resume | n/a. |
| Mobile | Full width secondary. |
| Analytics | `cta_demo_click`, `demo_embed_open`, `demo_embed_fallback_direct`, `demo_booking_complete` |
| Legal | No duration or outcome promise until the owner supplies one (CTA-2). |
| Status | Existing external option · **`/demo/book` is PROPOSED** · **Never a prerequisite to starting a trial** (handoff §10) |

---

## 5. Environment variable classification

Names only. No value appears in this repository or in any document.

| Variable | Scope | Reaches the browser | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | public | yes | GoTrue and PostgREST base |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | yes | Publishable key only |
| `NEXT_PUBLIC_NUOVA_API_BASE` | public | yes | BFF base |
| `NEXT_PUBLIC_CHECKOUT_PUBLIC_KEY` | public | yes | Publishable |
| `NEXT_PUBLIC_APP_ENV` | public | yes | Drives staging vs production affordances only, never a target |
| `NEXT_PUBLIC_CAPTCHA_SITE_KEY` | public | yes | Provider unspecified (MF-08) |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | **never** | Encrypted in Vercel, Serverless/Edge only |
| `SUPABASE_JWT_PROJECT_REF` | server only | never | Server side JWT verification |
| `GOTRUE_ADMIN_URL` | server only | never | |
| `PROVIDER_GOOGLE_CLIENT_ID` / `_SECRET` | server only | never | |
| `PROVIDER_META_APP_ID` / `_SECRET` | server only | never | |
| `PROVIDER_CALENDAR_CLIENT_ID` / `_SECRET` | server only | never | |
| `PROVIDER_VOICE_CLIENT_ID` / `_SECRET` | server only | never | |
| `CRM_HUBSPOT_CLIENT_ID` / `_SECRET` | server only | never | |
| `CRM_PIPEDRIVE_CLIENT_ID` / `_SECRET` | server only | never | |
| `CRM_ZOHO_CLIENT_ID` / `_SECRET` | server only | never | |
| `CRM_SALESFORCE_CLIENT_ID` / `_SECRET` | server only | never | |
| `CHECKOUT_SECRET_KEY`, `CHECKOUT_WEBHOOK_SECRET` | server only | never | Webhook signature verified server side |
| `CAPTCHA_SECRET_KEY` | server only | never | |
| `NUOVA_BFF_ALLOWED_ORIGIN` | server only | never | Exact origin, never `*` with credentials |

**Release blocking (handoff §6 and Appendix B invariant 1):** a service role key, provider client
secret, webhook secret or any token must never appear in a `NEXT_PUBLIC_*` variable, in the client
bundle, or in a browser network response.

**Preconditions before any of the above is introduced into this repository:** `.next/`, `.mcp.json`,
`tsconfig.tsbuildinfo` and `.claude/settings.local.json` are untracked and `.gitignore` is extended.
See `FINAL_RECONCILIATION_REPORT.md` §6.3.

---

## 6. Release blocking invariants

Carried verbatim in substance from handoff Appendix B, plus the two governance invariants that survive
it. Every one is a P0 finding if breached.

1. No service role key, provider client secret, webhook secret or token in the browser, the client
   bundle, or any `NEXT_PUBLIC_*` variable.
2. The frontend receives connection **status** and non secret display fields only. Never a privileged
   provider credential.
3. Tenant and role are derived server side from the verified JWT. The client never sends a privileged
   `client_id` or `role`.
4. Privileged writes (provisioning, wizard writes, storage admin, OAuth token exchange, checkout)
   happen only in the BFF.
5. **`externally_pending` is never rendered as complete.**
6. The agency never sees technical identifiers: no n8n, workflow or webhook IDs, no storage object IDs,
   no tenant UUIDs, no technical entitlement keys.
7. *(Governance)* Every product CTA remains a disabled or clearly marked placeholder until the owner
   grants an explicit per action release recorded in `INTEGRATION_CONTRACT.md`'s activation register.
   The register is empty (`MASTER_GOVERNANCE.md` §14.3).
8. *(Governance)* No push, merge, deployment or preview without explicit per occasion owner approval
   (`MASTER_GOVERNANCE.md` §15).

---

## Status

Compatibility matrix complete: capability mapping across authentication, trial, the ten step
onboarding wizard, provider and CRM surfaces, entitlements and billing, property experience, the
capabilities the handoff does not touch, and the reserved and proposed items; the full 28 surface
browser safe versus BFF split; the response envelope and eight value status vocabulary; a fourteen
step customer journey reconciliation with route, state, contract, auth, BFF requirement, loading,
error, resume, mobile, analytics, legal dependency and implementation status per step; the
environment variable classification; and the release blocking invariants.

No route in this document exists. No endpoint was called. No capability was verified.
**No production readiness claim is made.**

**Implemented and awaiting independent technical and final audit.**
