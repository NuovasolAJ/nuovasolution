# FINAL RECONCILIATION REPORT — NuovaSolution Website

**Author:** Final Website Reconciliation Director / Technical Integration Architect / Governance Lead (Chat 5)
**Branch:** `website_enterprise_redesign`
**Created:** 2026-08-31
**Scope of this document:** reconciliation and planning only. No page was implemented, no API was built,
no production flow was changed, no backend, n8n, Supabase or Vercel system was accessed, nothing was
pushed, merged or deployed, no git history was rewritten, and no uncommitted owner change was
overwritten.

**Last updated:** 2026-08-31 — **export-v2 + AF addendum reconciliation** (see §0V).

**Canonical technical source (CURRENT):**
`backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2.md`, extended for AF-01, AF-04 and AF-07 by
`backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2_AF_ADDENDUM_v1.md`.
**`WEBSITE_INTEGRATION_HANDOFF_EXPORT_v1.md` is HISTORICAL. Do not implement against it.**

> **No statement in this document declares anything production ready.** Every status below is a
> verifiable statement about what a named document says or about what was observed in the local
> repository. Nothing was verified end to end.

> **READ §0V FIRST.** Sections §0 to §11 were written against export-v1. **§0V supersedes every
> statement in this document wherever the two differ**, and enumerates each supersession explicitly.
> The v1-era text is retained deliberately, not by oversight: this project records superseded
> reasoning so it cannot be reintroduced by a later editor.

---

## 0V. Export-v2 and AF addendum supersession layer (BINDING, 2026-08-31)

### 0V.0 Integrity verification

Both files were hash-verified before a single character of this document was changed.

| File | Expected SHA256 | Computed | Result |
|---|---|---|---|
| `WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2.md` | `493c9e15…bf410` | `493c9e15643cbf277b6b2bde68b6a5b1b4c9458ccc7a2442f0f47d538cbbf410` | **MATCH** |
| `WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2_AF_ADDENDUM_v1.md` | `e22f0978…7739e` | `e22f097814d8b0cac69dbe85e4f64dd6be6eaeeaa7b460cee23525b55937739e` | **MATCH** |

Full 64-character digests were compared, not prefixes. Had either differed, this reconciliation would
have stopped and nothing would have been changed.

### 0V.1 Corrected authority ranking

Rank 1 changes. Everything else in §0 stands.

| # | Document | Authority |
|---|---|---|
| **1a** | `WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2.md` | **Technical truth.** Supersedes v1 entirely. |
| **1b** | `WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2_AF_ADDENDUM_v1.md` | **Technical truth for AF-01, AF-04, AF-07 only.** Extends 1a; does not modify it. |
| — | `WEBSITE_INTEGRATION_HANDOFF_EXPORT_v1.md` | **HISTORICAL.** No status may be derived from it. |
| — | `WEBSITE_UX_AF_REQUIREMENTS_EXPORT_v1.md` | Website-authored requirement register. **Not** a technical authority; it states what was asked, not what is true. |

Ranks 2 to 6 and the standing of `MASTER_GOVERNANCE.md` and `CLAUDE.md` are unchanged.
**v2 §A item 9 and the AF addendum clear provider names for the authenticated tree only. Backend
confirmation still never converts a `CLAIMS_MATRIX.md` `LEGAL` or `REJECTED` verdict for the public
marketing tree.**

### 0V.2 The binding decisions v2 fixes (owner/product, §A)

Nine decisions are now fixed and are not reopened by any chat.

1. The website BFF may later test **only against an explicitly approved STAGING target. No production
   calls, ever.**
2. No secrets in the browser. No frontend-owned backend authority.
3. **Trial = 14 days free. No payment method at signup.**
4. **Start Trial is the primary CTA after integration. Book a Demo is optional. No sales call is
   required to start a trial.**
5. The wizard is **not forced linear**. Steps evaluate independently; `resume_step` is a convenience
   pointer only.
6. **No invented polling.**
7. **Checkout is a server-determined handoff**, not a marketing-site payment form.
8. English and Spanish use **separate locale routes** (`/en`, `/es`).
9. CRM providers may render **text-only initially**; logos remain blocked until brand approval.

### 0V.3 The twelve corrections, in order of consequence

---

**V2-01 — There is no backend price. `price_display` does not exist.**

**This is the largest correction in this reconciliation and it reverses a statement this document
made in §4 row 14, §11 and matrix §2.5.**

v1 §5 row 7 described `GET /plans` as returning `{ code, name, price_display, features_summary }`.
On that basis this document concluded that "prices are served by the endpoint, never authored by the
website". **That conclusion is now void.** v2 §F defines the response as
`{ plans:[{ code, display_name, entitlements_summary }] }` — **explicitly "(no price)"** — and v2
MF-10 states that `billing_plan` has **no price and no currency column** and that **there is no
backend pricing, currency or tax authority at all**.

*Consequences, binding:*
- The website may display **plan names and entitlement summaries. It may not display a price**, from
  any source, because no source exists.
- `LUXURY_UX_MEDIA_SYSTEM.md` §5.7 **Layout A (public pricing) cannot be built.** Layout B, the
  access model, is the only pricing presentation available.
- `AUTHENTICATED_SURFACE_SYSTEM.md` §10's "**Prices:** `price_display` is rendered exactly as served"
  is superseded. There is nothing to render.
- The field renames matter for the typed client: `name` → `display_name`,
  `features_summary` → `entitlements_summary`.
- `CLAIMS_MATRIX.md` PK-06 must be restated: it is no longer "the website must not author a price
  while the endpoint serves one", it is "**no price exists anywhere, so none is displayed**".
- Currency, tax basis and Spanish IVA remain **`OWNER DECISION PENDING` + `LEGAL REVIEW PENDING`**
  (MF-10). They are not a formatting question; they are a missing authority.

---

**V2-02 — The trial is free and takes no payment method. T-01's factual objection is withdrawn.**

v2 §A item 3 and §C1 state it as backend truth: `trial_lifecycle` creates a **free** 14-day trial,
`trial_conversion_options.auto_charge = false`, `trial_convert` requires explicit customer
authorisation, and `billing_subscription` has no payment-instrument column in its required set. **No
card is collected at signup.**

*Consequences:*
- The blocking question this document listed as owner decision 4, and which
  `PRODUCT_TRUTH.md` §18.1, `CLAIMS_MATRIX.md` T-01, `COPY_AND_CONVERSION_MASTER.md` §3.4,
  `INTEGRATION_CONTRACT.md` §A1 and `IMPLEMENTATION_STATUS.md` all carry as open, **is answered.**
- The **factual** basis for "free" and for "no payment method at signup" now exists.
- **The wording is still a claims decision, not an automatic approval.** `CLAIMS_MATRIX.md` T-01 must
  be moved from `OWNER` to `APPROVED-Q` by **its owning chat**, not by this one. Until it is, no page
  ships the word.
- `COPY_AND_CONVERSION_MASTER.md` §3.4 **Variant B becomes the releasable variant**, and Variant A
  becomes the fallback rather than the recommendation.
- **"No credit card required" is a separate marketing sentence.** The fact is confirmed; whether that
  particular phrasing is used is a copy and claims choice, and T-01 lists it as its own forbidden item.

---

**V2-03 — Start Trial becomes the primary CTA. Ladder A is unblocked.**

v2 §A item 4 fixes the hierarchy: **Start Trial primary after integration, Book a Demo optional, no
sales call required to start a trial.**

*Consequences:*
- `MASTER_GOVERNANCE.md` §11's original hierarchy becomes implementable, subject to T-01's wording
  ratification and to the §14.3 per-action CTA release.
- **Ladder B remains the shipping ladder until the signup surface exists**, because a primary CTA
  must have a destination. The change is that Ladder A is now a *scheduled* outcome rather than a
  blocked one.
- `CLAIMS_MATRIX.md` T-02's rejection stands and becomes sharper: a free-start promise routed to a
  sales call is now demonstrably wrong, because the trial genuinely does not need one.

---

**V2-04 — Hot lead alerting is OUT OF SCOPE for the website, not BLOCKED.**

v2 MF-02 and §C3: hot-lead surfacing is **internal**. The agency is notified through the existing
agent-notification channel and through CRM and dashboard surfacing. **There is no public website or
onboarding endpoint and none is required.**

*Consequences:*
- This document's C-21, `CLAIMS_MATRIX.md` D-10, `PRODUCT_TRUTH.md` PT-C14,
  `INTEGRATION_CONTRACT.md` C7 and `COPY_AND_CONVERSION_MASTER.md` §13.1 all carry it as
  **`BLOCKED` on a missing field**. That is wrong. It is **`OUT OF SCOPE (website surface)`** and the
  missing-field register loses MF-02.
- **The website builds nothing for it.** No section, no phone mockup, no alert imagery, no endpoint.
- **No marketing claim is authorised by this.** A mechanism existing internally is not a cleared
  public claim; there is still no `CLAIMS_MATRIX.md` approved wording. Any future claim is a fresh
  claims decision with a fresh legal check (L-08 cross-channel).
- `CLAUDE.md`'s "HOT LEAD ALERTS (MANDATORY SELLING POINT)" section **cannot be honoured as written**
  and this is now settled rather than pending. It strengthens owner decision 10.

---

**V2-05 — Six missing fields are confirmed. The register shrinks from twelve to three.**

| Field | v1 state | v2 state |
|---|---|---|
| **MF-04** error code enumeration | BLOCKED | **CONFIRMED.** Full per-endpoint table, v2 §F, plus ten global codes. |
| **MF-05** step detail shape | BLOCKED | **CONFIRMED.** Exact projection, v2 §G, including `legend`'s five keys and `needs_action_steps`. |
| **MF-06** trial reminder cadence | BLOCKED | **CONFIRMED.** `reminder_3d`, `reminder_1d`, `testimonial_invite`. Backend-driven; the website sends nothing. |
| **MF-07** upload limits | BLOCKED | **CONFIRMED (branding).** `image/png, image/jpeg, image/webp, image/gif`, max **5 MB**, kinds `logo` and `email_banner` only. Not defined for anything else. |
| **MF-09** language values | BLOCKED | **CONFIRMED.** Website locale `{en, es}`. Three concepts must not be mixed: website locale, customer communication language (free text, backend default `es`), and certified AI runtime languages (12, a runtime concern). |
| **MF-11** provider display names | BLOCKED | **CONFIRMED** for CRM and paid; the AF addendum adds communication. See V2-10. |
| **MF-12** testimonial auth model | BLOCKED | **CONFIRMED.** Authenticated agency user via the BFF. All `trial_testimonial_*` functions are service-role only. **Not a public one-time link.** |
| **MF-03** dashboard destination | BLOCKED, "the largest open question" | **PROPOSED and website-owned.** The backend provides `activatable` and `tenant_activate`; it does not own a route. Recommended target `/{locale}/app`. **De-escalated from a backend gap to a website decision (AD-01).** |
| **MF-02** hot lead alerting | BLOCKED | **OUT OF SCOPE.** Removed from the register. See V2-04. |
| **MF-01** testimonial media | BLOCKED | **BACKEND IMPLEMENTATION REQUIRED.** `trial_testimonial_submit` accepts a `media_ref` **string reference** only; there is **no file upload or storage pipeline**. Written testimonial, manual approval and the one-time +7 are fully defined. **Do not fake a video upload field.** |
| **MF-08** captcha provider | OWNER | **OWNER DECISION REQUIRED**, unchanged. No backend captcha contract exists; the BFF verifies server-side. |
| **MF-10** currency and tax basis | OWNER | **LEGAL REVIEW REQUIRED + OWNER DECISION REQUIRED**, and worse than recorded: there is no backend pricing authority at all. See V2-01. |

**Remaining open: MF-01, MF-08, MF-10.** Nine of twelve are closed or reclassified.

---

**V2-06 — Footer and signature are text fields. The third upload block is void.**

v2 §B and §E: only `logo` and `email_banner` are uploaded assets. Footer is localized legal text
(`legal_footer` / `footer_by_locale`). Signature is a **`signature_mode` selection** — one of
`logo_only | compact | banner_signature | legal_only` — plus text. The server sanitizes and renders
both into responsive HTML and plaintext. **The website submits plain text only and never injects raw
HTML.** v2 §F adds `invalid_asset_kind` (400), which is exactly the error a guessed `kind` would have
produced.

*Consequences:* `AUTHENTICATED_SURFACE_SYSTEM.md` §8.3's third **upload** block and §9.1's
"Footer or signature — BLOCKED on AF-03" row are **void as a premise**, not merely unblocked. The
surface is a text and mode-selection group. The four `signature_mode` values are backend enumeration
tokens and are rendered through the §1.4 redaction boundary as agency-facing labels, never raw.

---

**V2-07 — Property upload is out of scope. Properties arrive by source connect.**

v2 §B and §E. Property is ingested via source connect: agency website scrape, supported feed, or CRM
inventory. There is **no website or onboarding file-upload contract for property data**. A direct
property-file upload, if ever wanted, is **BACKEND IMPLEMENTATION REQUIRED** and is explicitly
distinct from the PX panorama capture flow. **PX asset ownership is confirmed under PX-lane
authority:** assets are owned by (tenant, property) and publish **fails closed** on a cross-property
reference.

*Consequences:* `AUTHENTICATED_SURFACE_SYSTEM.md` §8.9 and §9.1's decision to build **no** upload
surface is confirmed correct in both halves. The website consumes `px_onboarding_entry` and nothing
else. **It must not build a second capture wizard.**

---

**V2-08 — The offices endpoint exists. The team invite office control is unblocked.**

v2 §E and §F: `GET /offices → { offices:[{ office_id, name, is_default }] }`, error `no_session`
(401, retryable). `office_id` is an **opaque handle, never rendered**; the field is **optional** and
`null` means tenant level. Role gating: `office_manager` may invite only into their own office,
`agency_admin` into any. `POST /team/invite` adds `office_out_of_scope` (403, not retryable).

*Consequences:* `AUTHENTICATED_SURFACE_SYSTEM.md` §8.4's omission of the control is **liftable**. The
control gains two things the earlier design did not know about: role gating, and a new error.

---

**V2-09 — No polling, confirmed as a contract-level fact.**

v2 §A item 6 and §D: **there is no backend polling contract and no push channel.** After the OAuth
callback, or on an explicit user refresh, the website calls the status endpoint **once**. A
conservative website-side auto-refresh is **permitted as an explicitly website-owned decision**,
provided it is never presented as a backend contract and it stops on a terminal state
(`connected | error | degraded`) or when the user leaves the step.

*Consequences:* AF-02 is closed and AD-02 is answered. `AUTHENTICATED_SURFACE_SYSTEM.md` §7.7's no-
polling rule is confirmed correct and gains a permitted, bounded extension. **The rule stays the
default**; any auto-refresh is opt-in, conservative, and never described as guaranteed.

---

**V2-10 — The OAuth return contract, and the cancellation distinction (AF-01, addendum).**

*Route:* the BFF redirects to a **single shared callback route**,
`{FRONTEND}/{locale}/connect/callback`, carrying `provider`, `status`, `correlation` and `reason`.
`status ∈ success | error`. `correlation` is the opaque server-issued state and is **never a token**.
The website never receives a token.

*Classification, per the addendum, using the OAuth2 standard and requiring no backend change:*

| Provider callback | BFF → website | Website treatment |
|---|---|---|
| valid `code`, exchange succeeds | `status=success` | `connected`, or `externally_pending` on `202` |
| `error=access_denied` | `status=error&reason=user_cancelled` | **The row returns to its previous status unchanged. Neutral, resumable. Never `signal-critical`, never an error treatment.** |
| any other `error`, or exchange failure | `status=error&reason=provider_error` | `action_required` |
| unrecognised, missing params, or state mismatch | `status=error&reason=provider_error` | `action_required` |

*Fail-safe, required:* anything that is not an explicit successful code exchange is `status=error`;
an unknown outcome maps to `provider_error` and **never** to `success`.

*Consequences:*
- `AUTHENTICATED_SURFACE_SYSTEM.md` §7.7's assumption that the BFF redirects **back to the step
  route** is superseded. One shared callback route reads the parameters and routes onward.
- Its four-outcome state machine is now fully wireable; the parameter constant is filled.
- **A persisted, queryable cancellation state is BACKEND HARDENING and is explicitly not a website
  launch blocker.** The connection record's status CHECK has no `cancelled` value, so a cancellation
  collapses to `error` after the fact. The live callback semantics are fully satisfied at the BFF.

---

**V2-11 — Communication provider display names (AF-04, addendum).**

| Channel | Authenticated-UX display name, text only |
|---|---|
| email | **Gmail** |
| whatsapp | **WhatsApp** |
| calendar | **Google Calendar** · **Microsoft Outlook** |
| voice | **generically "Voice" or "Phone" only** |

**Voice stays generic, and this is binding.** The voice registry's `display_name` values are internal
engineering and carrier descriptions (BYO-SIP carriers, SBC, PBX, PoP and site details). Rendering
them would disclose the internal telephony vendor stack. **No internal carrier name is ever
rendered.** No logos for any provider until brand approval.

*Consequences:* `AUTHENTICATED_SURFACE_SYSTEM.md` §7.7's "without naming a party it cannot name" and
§8.5's deferral are superseded for email, WhatsApp and calendar. `externally_pending` notes can now
name the party the agency is actually waiting on, which is the entire point of that state. **This
clearance is for the authenticated tree only. Public marketing naming remains `CLAIMS_MATRIX.md` and
owner decision 5.**

---

**V2-12 — `GET /branding/preview` shape confirmed (AF-07, addendum).**

```json
{
  "logo":                 "string | null",
  "logo_present":         true,
  "email_banner":         "string | null",
  "email_banner_present": true,
  "fallback_note":        "string"
}
```

`logo` and `email_banner` are durable **public** URLs, safe to render directly; `email_banner` is
non-null **only when the asset validates**. The present flags are booleans. `fallback_note` is a
human-safe string stating that missing or invalid assets are omitted, so no broken image is ever
rendered. **No storage internals are exposed** — no bucket, no object ID, no signed URL. The canonical
shape is `preview`; `POST /branding/commit` returns `{ ok, kind, stored_url, preview }` where
`preview` is this same object, and the shape is **not** derived from `commit`.

*Consequences:* the branding step's preview, replace and remove states are unblocked. An agency
returning to the step renders its committed assets from a durable public URL, never from a stale
browser object URL. **AF-07 was the only AF that v2 alone did not advance; the addendum closes it.**

### 0V.4 Smaller corrections, recorded so they are not missed

| # | Item | Correction |
|---|---|---|
| a | **Testimonial state vocabulary** | v1 had `pending \| approved \| rejected`. v2 §F has **six**: `invited \| submitted \| pending_review \| approved \| rejected \| withdrawn`. `POST /testimonial` returns `{ ok, status:"pending_review" }`, not `{ ok, state:"pending" }`. Every surface and type that used the three-value set is wrong. |
| b | **Testimonial error codes** | New and specific: `submission_already_pending` (409), `extension_already_granted` (409), `submission_id_required` (400), `consent_required` (422). `extension_already_granted` is the contract's expression of "exactly once" and must render as a plain statement of fact, never as an error the agency did something wrong. |
| c | **New error codes across surfaces** | `email_exists`, `captcha_failed`, `email_not_confirmed`, `invalid_wizard_action`, `invalid_asset_kind`, `office_out_of_scope`, `invalid_role`, `invalid_provider`. |
| d | **`email_not_confirmed` (400)** | v1 said signup creates a **confirmed** GoTrue user; v2 enumerates this error on the token grant. Whether signup auto-confirms, or a confirmation step exists, is **not stated**. Logged as **RS-01** in §0V.6. |
| e | **`needs_action_steps`** | A projection field that did not appear in v1. Available for the readiness summary. |
| f | **`legend` shape** | Now known: five keys, `completed`, `needs_action`, `externally_pending`, `optional`, `locked_by_plan`, each a string. `AUTHENTICATED_SURFACE_SYSTEM.md` §7.8's "shape not specified" is superseded. |
| g | **Step `status` enum in the projection** | Five values only. The other three (`connected`, `degraded`, `action_required`) are connector-health values and never appear on a wizard step row. This confirms the eight-value split rather than changing it. |
| h | **Certified AI runtime languages = 12** | A backend-stated count, explicitly a runtime concern separate from the website. It is **not** an authorisation to publish "12 languages": `CLAIMS_MATRIX.md` B-07 forbids naming a count, and this figure describes the AI runtime, not the website's language coverage. Logged as **RS-02**. |
| i | **`GET /plans` field names** | `name` → `display_name`, `features_summary` → `entitlements_summary`. A typed-client change. |
| j | **Locale routes** | `/en` and `/es` separate routes are now a fixed decision, not a proposal. Half of owner decision 11 is closed; route *naming* remains open. |

### 0V.5 Superseded website assumptions, consolidated

Every one is a follow-up owned by the document's own chat. **This chat edited none of them.**

| # | Assumption | Document and section | Replaced by |
|---|---|---|---|
| 1 | `price_display` is served and the website renders it | `PRODUCT_TRUTH.md` §17/§18 area, `CLAIMS_MATRIX.md` PK-06, `COPY_AND_CONVERSION_MASTER.md` §6.12 and §12, `AUTHENTICATED_SURFACE_SYSTEM.md` §10 | **V2-01.** No price exists. Names and entitlement summaries only |
| 2 | "Free" and "no payment method" are unconfirmed | `PRODUCT_TRUTH.md` §18.1, `CLAIMS_MATRIX.md` T-01, `COPY_AND_CONVERSION_MASTER.md` §3.4, `INTEGRATION_CONTRACT.md` §A1, `MASTER_GOVERNANCE.md` §11, `IMPLEMENTATION_STATUS.md` | **V2-02.** Both confirmed. Wording ratification still owed |
| 3 | Ladder B is the only implementable ladder | `MASTER_GOVERNANCE.md` §11.2, `COPY_AND_CONVERSION_MASTER.md` §3.3 | **V2-03.** Ladder A is scheduled, not blocked |
| 4 | Hot lead alerting is BLOCKED on a missing field | `CLAIMS_MATRIX.md` D-10, `PRODUCT_TRUTH.md` PT-C14, `INTEGRATION_CONTRACT.md` C7, `COPY_AND_CONVERSION_MASTER.md` §13.1 | **V2-04.** Out of scope for the website |
| 5 | Error copy is written per HTTP status because `code` is unknown | `AUTHENTICATED_SURFACE_SYSTEM.md` §4.3 | **V2-05.** MF-04 confirmed; per-`code` copy replaces per-status copy |
| 6 | The `legend` and per-step `detail` shapes are unknown | `AUTHENTICATED_SURFACE_SYSTEM.md` §7.8, §7.10 | **V2-05.** MF-05 confirmed |
| 7 | Reminder thresholds are unknown | `AUTHENTICATED_SURFACE_SYSTEM.md` §6.2 | **V2-05.** 3 days and 1 day; backend-sent |
| 8 | The client performs no upload type or size validation | `AUTHENTICATED_SURFACE_SYSTEM.md` §9.5 | **V2-05.** MF-07 confirmed. `accept` and the constraint line carry real values; the size ceiling may be stated before selection |
| 9 | The signup `language` control cannot be rendered | `AUTHENTICATED_SURFACE_SYSTEM.md` §5.1, §8.1 | **V2-05.** MF-09 confirmed. Constrain to `{en, es}` and pass the route locale |
| 10 | Footer or signature is a third upload block | `AUTHENTICATED_SURFACE_SYSTEM.md` §8.3, §9.1 | **V2-06.** Text fields plus `signature_mode`. Premise void |
| 11 | The office control cannot be rendered | `AUTHENTICATED_SURFACE_SYSTEM.md` §8.4 | **V2-08.** Endpoint exists; add role gating and `office_out_of_scope` |
| 12 | The BFF redirects back to the step route | `AUTHENTICATED_SURFACE_SYSTEM.md` §7.7 | **V2-10.** One shared callback route |
| 13 | No provider may be named | `AUTHENTICATED_SURFACE_SYSTEM.md` §7.7, §8.5 | **V2-11.** Email, WhatsApp and calendar named; voice generic |
| 14 | `GET /branding/preview` shape is unknown | `AUTHENTICATED_SURFACE_SYSTEM.md` §9.4, §8.3 | **V2-12.** Confirmed |
| 15 | Testimonial state has three values | `AUTHENTICATED_SURFACE_SYSTEM.md` §11, matrix §2.2 | **0V.4 a.** Six values |
| 16 | The dashboard destination is the largest open question and is BLOCKED | this document C-27, §9.1 MF-03, `AUTHENTICATED_SURFACE_SYSTEM.md` §15 | **V2-05.** Website-owned decision (AD-01), recommended `/{locale}/app` |
| 17 | Staging calls can never be authorised, so end-to-end verification is unreachable | this document C-14, §7 note, §10 decision 1 | **0V.6 C-14.** Resolved in principle by v2 §A item 1; one line of owner ratification into `MASTER_GOVERNANCE.md` §14 makes it operative |

### 0V.6 Conflict status after v2

| ID | Subject | Status now |
|---|---|---|
| **C-08** | Trial exists; "free" unconfirmed | **CLOSED.** V2-02 |
| **C-09** | Testimonial confirmed but legally held | **UNCHANGED.** Backend confirmation does not lift L-13. Still DISABLED for public display |
| **C-10** | No testimonial media field | **RECLASSIFIED.** `media_ref` string exists; no upload pipeline. **BACKEND IMPLEMENTATION REQUIRED** + `LEGAL REVIEW PENDING` |
| **C-11** | CRM vendor names | **PARTIALLY CLOSED.** Text-only cleared for the authenticated tree (v2 §A9). Public marketing and all logos remain open |
| **C-12** | Named portals rejected | **UNCHANGED.** v2 names no portal. `REJECTED` stands |
| **C-13** | Handoff untracked | **OPEN, and now larger:** four backend files are untracked, one of which is the current technical authority. See §0V.7 |
| **C-14** | §14 versus staging | **RESOLVED IN PRINCIPLE.** v2 §A item 1 records staging testing under explicit approval, production never. Needs one ratifying line in `MASTER_GOVERNANCE.md` §14 by its owning chat |
| **C-15** | CTA lockdown | **UNCHANGED.** The activation register is still empty. v2 fixing the CTA hierarchy is not a per-action release |
| **C-16** | Voice: three things conflated | **UNCHANGED, and reinforced.** The addendum requires voice to stay generically named for the internal reason that carrier identity is internal. Voice AI capability claims are untouched |
| **C-17** | WhatsApp: agency channel versus own number | **UNCHANGED.** v2 names no NuovaSolution number. C-05 stays open |
| **C-18** | Demo booking | **UNCHANGED.** v2 §J: still **PROPOSED**. Cal.com remains an existing external option, optional, never a trial prerequisite |
| **C-19** | Entitlement enforcement technical | **UNCHANGED, confirmed** |
| **C-20** | Roles confirmed | **UNCHANGED, confirmed** |
| **C-21** | Hot lead alerting | **CLOSED as a blocker.** Out of scope. V2-04 |
| **C-22** | Privacy policy | **UNCHANGED, launch blocking.** v2 adds nothing that reduces it |
| **C-23** | Credential recorded closed but still present | **UNCHANGED.** Untouched by v2 |
| **C-24** | Em dashes in approved wording | **UNCHANGED.** A copy-side rule |
| **C-25** | `IMPLEMENTATION_STATUS.md` stale | **CLOSED** by Wave A4 |
| **C-27** | The website does not know where the product ends | **DE-ESCALATED.** No longer a backend gap. It is AD-01, a website and owner decision, with a recommended target |
| **RS-01** | Does signup auto-confirm the GoTrue user, or is there a confirmation step? v1 said confirmed; v2 enumerates `email_not_confirmed` | **NEW, minor.** Affects one signup success path. Not blocking |
| **RS-02** | 12 certified AI runtime languages | **NEW.** A backend fact about the AI runtime. **Not** an authorisation to publish a language count. B-07 unchanged |

### 0V.7 Repository state of the backend exports

Four files sit in `backend_handoff/`. **Three are untracked**, including the current technical
authority and its addendum. `WEBSITE_UX_AF_REQUIREMENTS_EXPORT_v1.md` is tracked (commit `0205a97`).

| File | Tracked |
|---|---|
| `WEBSITE_INTEGRATION_HANDOFF_EXPORT_v1.md` | No |
| `WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2.md` | **No** |
| `WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2_AF_ADDENDUM_v1.md` | **No** |
| `WEBSITE_UX_AF_REQUIREMENTS_EXPORT_v1.md` | Yes |

All four were read in full and confirmed to contain **no secret, key, token, credential, environment
value, host or customer record**. They are safe to commit. **This chat does not commit them** — they
are the owner's files and the owner may intend a different location or repository visibility.
Recommended as the first action of the hygiene wave, together with recording both SHA256 digests so
a future export can be diffed against a verified baseline.

---

## 0. Authority ranking (binding, resolves all downstream conflicts) — *v1 era, see §0V.1*

This ranking is fixed for the remainder of the project. No implementation chat may override it.

| # | Document | Authority over |
|---|---|---|
| 1 | `backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v1.md` | **Technical truth.** Endpoints, payload fields, status vocabulary, environment variable names, auth model, staging/production routing, legacy removal. Nothing technical may be invented outside it. |
| 2 | `CLAIMS_MATRIX.md` | **Public claims.** Which statement may be made, in which wording, with which qualifier. Backend confirmation never converts a `LEGAL` or `REJECTED` verdict into an approved one. |
| 3 | `PRODUCT_TRUTH.md` | **Confirmed product scope.** What the product is and is not, and the required qualification per capability. |
| 4 | `COPY_AND_CONVERSION_MASTER.md` | **Copy.** Must be adapted to 1, 2 and 3. Wins on wording form and house style within those limits. |
| 5 | `LUXURY_UX_MEDIA_SYSTEM.md` | **Visual and structural authority.** Tokens, type, grid, motion, media honesty, page architecture. |
| 6 | `FINAL_RECONCILIATION_REPORT.md` (this file) | **Conflict decisions.** Records every conflict and its resolution or its escalation. |
| — | `MASTER_GOVERNANCE.md` | Retains authority over **process, severity, release and access discipline** (§14, §15). It is not displaced by the handoff. |
| — | `CLAUDE.md` | **Stale on visual direction and positioning.** Superseded on those points per PT-C1 / C-07 / LUXURY §12. Not edited by this chat. Owner approval required before it is edited. |

**Rule of precedence in practice.** A capability may be technically confirmed by rank 1 and still be
unpublishable under rank 2. That combination is not a contradiction. It is the normal state of this
project and it is why the status vocabulary in §2 exists.

---

## 1. Status vocabulary (binding from this document forward)

`INTEGRATION_CONTRACT.md`'s four values (`LIVE`, `PREPARED`, `PENDING`, `BLOCKED`) are too coarse now
that a backend contract exists. They conflate "the backend does not have it" with "the website has not
built it yet", which is the exact error this reconciliation was called to fix.

The following ten values replace them. A surface normally carries **two**: one backend status and one
website status.

| Value | Meaning | May the public site assert it? |
|---|---|---|
| `BACKEND CONFIRMED` | The handoff defines a contract for it. The backend team asserts it is applied and proven on staging. | Not by itself. Rank 2 decides. |
| `WEBSITE INTEGRATION PENDING` | Backend confirmed, no website code exists for it. | No present tense capability claim. |
| `WEBSITE IMPLEMENTED` | Website code exists against the contract. Not verified against a live target. | No. |
| `WEBSITE VERIFIED` | Website code verified locally (types, build, states, a11y, mobile) but not against a live backend. | No. |
| `END TO END VERIFICATION PENDING` | Nothing has been proven against staging or production. **This is the current state of every single surface.** | No. |
| `LEGAL REVIEW PENDING` | Blocked by a `CLAIMS_MATRIX.md` §22 legal dependency. | No, in any wording, in either language. |
| `OWNER DECISION PENDING` | A commercial, naming, or process decision the owner alone can make. | No. |
| `RESERVED` | Named in the handoff as reserved for a future backend that does not exist. Visual preparation permitted, live behaviour forbidden. | No. |
| `PROPOSED` | A shape proposed but not backend defined. Must never be implemented as if real. | No. |
| `BLOCKED` | Cannot proceed. A required contract, decision or clearance is missing entirely. | No. |

**`LIVE` and `PRODUCTION READY` are removed from the project vocabulary.** They may not be used in any
document, commit message, status line or report on this branch.

---

## 2. TASK 1 — Actual state of the website wave

### 2.1 Documents produced

| File | Size | Author instance | Committed in |
|---|---|---|---|
| `MASTER_GOVERNANCE.md` | 18.8 KB | Implementation | `e74d132`, amended `75d0bc6` |
| `CURRENT_SITE_AUDIT.md` | 20.5 KB | Implementation | `e74d132`, amended `75d0bc6` |
| `INTEGRATION_CONTRACT.md` | 22.5 KB | Implementation | `e74d132`, amended `75d0bc6` |
| `IMPLEMENTATION_STATUS.md` | 15.9 KB | Implementation | `e74d132`, amended `7ec0010`, `75d0bc6`, `f960886` |
| `PRODUCT_TRUTH.md` | 68.2 KB | Product Truth Director (independent) | swept into `75d0bc6` |
| `CLAIMS_MATRIX.md` | 54.3 KB | Claims / compliance (independent) | swept into `138a946` |
| `COPY_AND_CONVERSION_MASTER.md` | 158.2 KB | Copy & conversion (independent) | `7ec0010`, reconciled in `7564739` |
| `LUXURY_UX_MEDIA_SYSTEM.md` | 133.2 KB | Luxury UX & media (independent) | `fc6dfd0` |
| `backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v1.md` | 24.7 KB | Backend team | **untracked — never committed** |

**The `MASTER_GOVERNANCE.md` §5 implementation gate is now 4 of 4 present.** `IMPLEMENTATION_STATUS.md`
still records "3 of 4, blocking document `LUXURY_UX_MEDIA_SYSTEM.md`". That file arrived in `fc6dfd0`.
The status file is stale and must be corrected by its owning chat (this chat may not edit it).

### 2.2 Commits on the branch since the fork point `9943660`

Seven commits, **all documentation only**. Verified by `git log 9943660..HEAD --name-only`.

```
7564739  docs(copy): reconcile COPY_AND_CONVERSION_MASTER …   → COPY_AND_CONVERSION_MASTER.md
fc6dfd0  docs(design): add LUXURY_UX_MEDIA_SYSTEM.md …        → LUXURY_UX_MEDIA_SYSTEM.md
f960886  docs: gate 3 of 4, record concurrency hazard          → IMPLEMENTATION_STATUS.md
138a946  docs: COPY_AND_CONVERSION_MASTER draft …             → CLAIMS_MATRIX.md
7ec0010  docs: record PRODUCT_TRUTH.md arrival, gate 1 of 4    → COPY_AND_CONVERSION_MASTER.md,
                                                                 IMPLEMENTATION_STATUS.md
75d0bc6  docs: bind product-project isolation …               → CURRENT_SITE_AUDIT.md,
                                                                 IMPLEMENTATION_STATUS.md,
                                                                 INTEGRATION_CONTRACT.md,
                                                                 MASTER_GOVERNANCE.md,
                                                                 PRODUCT_TRUTH.md
e74d132  docs: Phase 0 governance layer …                     → CURRENT_SITE_AUDIT.md,
                                                                 IMPLEMENTATION_STATUS.md,
                                                                 INTEGRATION_CONTRACT.md,
                                                                 MASTER_GOVERNANCE.md
```

### 2.3 Which productive files were changed

**None.** No file under `app/`, `components/`, `lib/`, `translations/`, `public/`, and no
`package.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`, `tsconfig.json`,
`globals.css` or `.gitignore` has been modified on this branch. The redesign has produced 490 KB of
governance documentation and zero lines of application code, which is exactly what the gate required.

### 2.4 Commit collisions found (three, one worse than recorded)

`IMPLEMENTATION_STATUS.md` records two directory wide `git add` sweeps. There are **three** commits
whose message and content disagree.

| Commit | Message says | Content actually is | Assessment |
|---|---|---|---|
| `7ec0010` | "record PRODUCT_TRUTH.md arrival" | `COPY_AND_CONVERSION_MASTER.md` + `IMPLEMENTATION_STATUS.md`. **`PRODUCT_TRUTH.md` is not in this commit.** | Foreign file swept in; the named file was not committed. Already recorded. |
| `75d0bc6` | "bind product-project isolation into governance" | four governance files **plus `PRODUCT_TRUTH.md`** | Foreign file swept in. Already recorded. |
| `138a946` | "COPY_AND_CONVERSION_MASTER draft for the enterprise website redesign" | **`CLAIMS_MATRIX.md` only.** `COPY_AND_CONVERSION_MASTER.md` is not in this commit. | **Total message/content mismatch. Not recorded anywhere.** The claims matrix is attributed in history to a copy commit. |

**Consequence.** `git log --follow` and `git blame` on `CLAIMS_MATRIX.md` and `PRODUCT_TRUTH.md` give a
misleading authorship story. No content was lost or corrupted. **No history rewrite is performed or
recommended** (`MASTER_GOVERNANCE.md` §12). The correction is documentary: this table is the record.

**Root cause, and the binding fix.** Multiple chats share one working directory and commit to one
branch, and `.next/` is tracked (§2.6), so any `git add .` sweeps build output plus whatever another
chat has half written. From this document forward, and enforced in `FINAL_WEBSITE_INTEGRATION_PLAN.md`:
**no chat uses `git add .` or `git add -A`. Every chat stages explicitly named paths only, and only
paths it owns.**

### 2.5 Uncommitted owner changes present (preserved, untouched)

| Path | State | Note |
|---|---|---|
| `app/v2/page.tsx` | untracked | The `/v2` concept. `LUXURY_UX_MEDIA_SYSTEM.md` §13.1 marks it for discard after harvesting. |
| `components/v2/` (7 files) | untracked | Includes `hero.tsx`, which `CURRENT_SITE_AUDIT.md` §4 does not list. The audit's inventory of `/v2` is incomplete. |
| `lib/os/copy.ts`, `lib/os/motion.ts` | untracked | `copy.ts` is the marketing draft with `status: "live" \| "soon"` flags cited throughout `PRODUCT_TRUTH.md`. **Harvest before any deletion.** |
| `WhatsApp Video 2026-07-07 at 18.30.48.mp4` | untracked, repo root | Stray media. Audit A-11. |
| `docs/website_redesign/backend_handoff/` | untracked | **The canonical technical authority is not under version control.** See conflict C-13. |
| `tsconfig.tsbuildinfo` | modified, tracked | Build artefact that should not be tracked. Audit A-08. |
| `.next/` | ~170 modified/deleted entries, tracked | Build output under version control. Audit A-08. |

Nothing above was modified, staged, deleted or overwritten by this chat.

### 2.6 Repository hygiene facts (verified, not inferred)

- `.gitignore` contains exactly two lines: `node_modules`, `.vercel`.
- `.next/` is tracked: **180 files** in the index.
- `.mcp.json` is tracked and contains a live shaped credential. See §6.
- `.claude/settings.local.json` is tracked. It contains permission allowlists only, no secrets, but it
  is per developer local state and does not belong in the repository.
- No `.env`, `.env.local` or `.env.example` file exists anywhere in the repository.
- **`process.env` appears zero times** in `app/`, `components/` and `lib/`. There is no environment
  plumbing of any kind.
- **`fetch`, `XMLHttpRequest` and `axios` appear zero times** in `app/`, `components/` and `lib/`. The
  site makes no network call to any backend.
- `app/api/` does not exist. Zero API routes.
- Hardcoded absolute URLs in source: `app/layout.tsx:50` (Cal.com embed loader, inline script),
  `components/live-demo/live-demo-client.tsx:1943` (`https://cal.com/nuovasolution/demo`),
  `components/sections/hero.tsx:459` and `components/sections/final-cta.tsx:80`
  (`https://nuovasolution.com/live-demo`, self referencing, breaks preview deployments — audit A-03).

---

## 3. TASK 2 — Backend handoff reconciled against PRODUCT_TRUTH and CLAIMS_MATRIX

`PRODUCT_TRUTH.md` §0.3 states its central limitation: **zero capabilities in Category 1**, because
verification was not permitted. The handoff does not remove that limitation, because this chat still
verified nothing. What the handoff does is supply an **authoritative written contract from the backend
team**, which is precisely the evidence class `PRODUCT_TRUTH.md` §0.4 accepts as "a verification report
from an authorised technical instance working inside the product project".

**Therefore:** capabilities named in the handoff move from *"owner brief only, unevidenced"* to
`BACKEND CONFIRMED`. They do **not** move to Category 1, because `END TO END VERIFICATION PENDING`
remains true for every one of them from this repository's position.

The full per capability mapping is in `INTEGRATION_COMPATIBILITY_MATRIX.md` §2. Below is the conflict
list, which is what this task asked for.

### 3.1 Conflict list

Each conflict is a place where the handoff and a governance document disagree, or where the handoff
changes a recorded status. Severity uses `MASTER_GOVERNANCE.md` §2.

---

**C-08 — The 14 day trial exists. "Free" does not follow from that.**
*Documents:* Handoff §2 and §5 row 1 vs `CLAIMS_MATRIX.md` T-01 (`OWNER`, P0) vs `PRODUCT_TRUTH.md` §18.1
vs `IMPLEMENTATION_STATUS.md` C-01.
*Finding:* C-01 asked "does a 14 day trial exist?" The handoff answers **yes**: `POST {NUOVA_API_BASE}/signup`
creates the tenant with a 14 day trial window, and `GET /trial/status` returns
`{ status, plan, trial_end, days_left, account_state }` with `status ∈ trialing | trial_expired | active |
past_due | suspended | canceled`.
*What is still not answered:* the handoff never uses the word **free**, never states whether a payment
method is required at signup, and never states day 15 behaviour beyond "premium features resolve to
`denied`, the UI shows conversion prompts, never blocks login". `CLAIMS_MATRIX.md` T-01's forbidden list
includes *"Free trial"*, *"Start free"*, *"Try free"* and *"No credit card required"* as separate items.
*Resolution:* **"14 day trial" is `BACKEND CONFIRMED` + `WEBSITE INTEGRATION PENDING`. "Free" and "no
credit card required" remain `OWNER DECISION PENDING`.** C-01 is closed as to existence and stays open as
to commercial wording. Severity P1.

---

**C-09 — Testimonial extension: technically confirmed, legally still held.**
*Documents:* Handoff §2 and §5 rows 5 and 6, Appendix A vs `CLAIMS_MATRIX.md` T-03/T-04 (`LEGAL`, P0, marked
**DISABLED**) vs `PRODUCT_TRUTH.md` §18.3.
*Finding:* the handoff fully confirms the mechanism: `POST /testimonial` stores **pending moderation**
and returns `{ ok, state:"pending" }`; `GET /testimonial/status` returns `pending | approved | rejected`;
approval applies a **+7 day** extension through the trial subsystem's manual approval gate
(`trial_extend_for_feedback`, requires approved); the website reflects the new `trial_end` and never
grants the extension itself. The handoff's own honesty note says `trial_end` is the single source of
truth and the +7 figure must not be hardcoded.
*Resolution:* **`BACKEND CONFIRMED` and simultaneously `LEGAL REVIEW PENDING`.** L-13 (incentivised
testimonials under EU unfair commercial practices rules), video as personal data, and the contract terms
question are untouched by a technical confirmation. `CLAIMS_MATRIX.md` T-03 stays DISABLED for public
display. The mechanism may be built behind authentication as a product surface; it may not appear in
public marketing copy, a FAQ, a footnote or a tooltip. Severity P0 if published.
*This is the clearest instance of the rule that the handoff does not lift a legal hold.*

---

**C-10 — Testimonial payload has no video field, but the confirmed mechanism requires a video.**
*Documents:* Handoff §5 row 5 (`{ rating, quote, author_name, author_role, consent }`) vs
`PRODUCT_TRUTH.md` §18.2 step 2 ("the customer submits an honest reference or feedback video, or a link
to one").
*Finding:* a direct contract gap. The owner defined mechanism is video first. The confirmed API accepts
only a numeric rating and text. There is no upload field, no `video_url` field, and no media handling in
the testimonial contract.
*Resolution:* **`BLOCKED` on a missing handoff field.** Named precisely in §9.2 as required field MF-01.
The website cannot build a submission surface that matches the owner's stated mechanism. Severity P1.

---

**C-11 — CRM vendors are now backend confirmed. CLAIMS_MATRIX rejects naming them.**
*Documents:* Handoff §5 rows 21 to 24 and Appendix A (`crm_adapter_registry`, `crm_connection_state`,
`crm_connector_healthcheck`) naming **hubspot, pipedrive, zoho, salesforce** vs `CLAIMS_MATRIX.md` F-07
(`REJECTED`, P0: "every CRM name and logo") and G-11 (`OWNER`).
*Finding:* F-07 was rejected on the ground that "no integration is evidenced anywhere". That ground no
longer holds. The handoff evidences a provider registry, per provider OAuth start, connection state,
health probe, mapping validation with `missing_api_names[]`, and a Salesforce `prod | sandbox`
environment switch. This is a materially more specific integration surface than the marketing claim F-07
rejected.
*Resolution, in three separable parts:*
1. **The existence of external CRM connection** is `BACKEND CONFIRMED` + `WEBSITE INTEGRATION PENDING`.
2. **Naming the four vendors as plain text on the public site** moves from `REJECTED` to
   `OWNER DECISION PENDING`. The evidentiary objection is answered; the commercial and per tenant
   readiness question is not.
3. **Vendor logos remain `BLOCKED`.** A working adapter is not a trademark licence. `PRODUCT_TRUTH.md`
   §10.7 is unaffected.
Severity P0 if any vendor is named or logo displayed before the owner decides. Only `CLAIMS_MATRIX.md`'s
owning chat may change F-07's verdict.

---

**C-12 — Portal integrations stay rejected. The handoff does not mention them.**
*Documents:* Handoff §5 rows 25 and 26 (`property-source/connect`, types
`agency_website | feed | crm_inventory | other_authorized`) vs `CLAIMS_MATRIX.md` F-06 (`REJECTED`:
Idealista, Fotocasa and every portal name).
*Finding:* the handoff confirms a property source contract and explicitly states that **agency owned
scraped website inventory is a first class valid source and is never blocked for being scraped**. It
names **no portal**. `feed` is a generic supported feed, not a named portal integration.
*Resolution:* **F-06 stays `REJECTED`.** The asymmetry with C-11 is deliberate and must be preserved:
CRM vendors are named in the handoff, portals are not. The "agency website as a valid inventory source"
statement is a genuine new `BACKEND CONFIRMED` capability and a strong differentiator, and it is a
different claim from portal integration. Severity P0 if conflated.

---

**C-13 — The canonical technical authority is untracked.**
*Documents:* the handoff export itself vs `MASTER_GOVERNANCE.md` §3.
*Finding:* `docs/website_redesign/backend_handoff/` is untracked. Every other source of truth is
committed. The document this entire wave now depends on can be lost by a `git clean`, is invisible to
any other clone, and cannot be diffed when export-v2 arrives.
*Resolution:* `OWNER DECISION PENDING`. The handoff states it contains **no secrets, only endpoint
contracts, field names, status vocabulary and environment variable names**, which this chat confirms by
reading it in full. It is therefore safe to commit. **This chat does not commit it**, because it is the
owner's file and the owner may intend a different location or repository visibility. Recommended as the
first action of the next wave. Severity P1.

---

**C-14 — `MASTER_GOVERNANCE.md` §14 forbids the staging calls the handoff assumes.**
*Documents:* Handoff §0 ("proven on staging"), §7 (staging vs production is a pure environment change)
vs `MASTER_GOVERNANCE.md` §14.1 items 3 and 5 ("no server access… no integration tests, no live call,
no smoke test, no ping, no health check… against any product system").
*Finding:* the handoff invites the website team to build a BFF that calls the backend. §14 forbids this
repository from making any call to any product system. Staging is a product system under the plain text
of §14. Under the current rules, **`END TO END VERIFICATION PENDING` can never be closed.** No chat may
resolve this by proceeding, per §14.4.
*Resolution:* **`OWNER DECISION PENDING`, and it is the single decision that gates the entire integration
wave.** The owner must state, in writing, whether §14 permits the website BFF to call a **staging**
target, under which conditions, and with production explicitly excluded. Until then every BFF route may
be written and typed but never executed against a real host. Severity P0 for the wave, P0 escalation
under §14.4.

---

**C-15 — The product CTA lockdown is not lifted by the handoff.**
*Documents:* Handoff §5 vs `MASTER_GOVERNANCE.md` §14.3 and `INTEGRATION_CONTRACT.md` hard rule 7.
*Finding:* §14.3 requires **explicit, per action, owner release** recorded in the activation register
before any product CTA is wired. The activation register is empty. The arrival of a contract is not a
release, and the implementation instance "never treats a plausible looking URL, an inferred pattern or a
value found in the repository as confirmation".
*Resolution:* **The lockdown stands.** Every product CTA remains a disabled or clearly marked placeholder
routed to the working fallback, until the owner releases it individually. The handoff changes what will
eventually be wired, not whether it may be wired now. Severity P0 if bypassed.

---

**C-16 — Voice: three distinct things are being conflated.**
*Documents:* Handoff §3 step 5 (`voice_locked` flag when voice is not entitled), §5 row 17
(`POST /connect/voice/start`, `403 not_on_plan (voice)`), §6 (`PROVIDER_VOICE_CLIENT_ID/SECRET`), §10
(website Voice sales bot **RESERVED**) vs `CLAIMS_MATRIX.md` §9 (thirteen rows, all `OWNER`, `LEGAL` or
`REJECTED`; V-01 blocking) vs `PRODUCT_TRUTH.md` §9.1.
*Finding:* the handoff evidences **a plan gated voice channel connection surface inside agency
onboarding**. It evidences nothing about voice AI answering calls, qualifying, discussing properties,
booking appointments, or being multilingual. Separately, §10 marks a **website** Voice sales concierge
(`POST /sales-bot/turn`) as **RESERVED — do not implement**.
*Resolution, three separate statuses:*
1. **Agency voice channel connection (onboarding step 5):** `BACKEND CONFIRMED` + `WEBSITE INTEGRATION
   PENDING`, entitlement gated.
2. **Voice AI capability claims (V-01 to V-13):** unchanged. `OWNER DECISION PENDING`. The interim
   ruling stands: Category 7, one separated future block, wording per V-02 only.
3. **Website Voice sales concierge:** `RESERVED`. May be visually prepared. May never be presented as a
   working live integration.
Severity P0 if 1 is used to justify 2 in copy.

---

**C-17 — WhatsApp: the agency's channel is confirmed; NuovaSolution's own number is not.**
*Documents:* Handoff §3 step 5 and §5 row 17 (`connect/whatsapp/start`) and §10 (website WhatsApp sales
concierge **RESERVED**) vs `CLAIMS_MATRIX.md` CTA-7 (`OWNER`, P0) and `IMPLEMENTATION_STATUS.md` C-05.
*Finding:* the handoff confirms the agency connecting **its own** WhatsApp/Meta channel, with
`externally_pending` while verification is in flight. It says nothing about a NuovaSolution business
WhatsApp number for the marketing site's CTA.
*Resolution:* **C-05 is not resolved.** The public WhatsApp CTA stays `BLOCKED` and does not ship. The
website WhatsApp sales concierge is `RESERVED`. The agency WhatsApp channel connection is
`BACKEND CONFIRMED` + `WEBSITE INTEGRATION PENDING`. Severity P0 if a number is invented (R7).

---

**C-18 — Demo booking must not acquire a backend by assumption.**
*Documents:* Handoff §5 row 28 and §10 (**PROPOSED, not backend defined**) vs `INTEGRATION_CONTRACT.md` §2
vs `CLAIMS_MATRIX.md` CTA-2 (`APPROVED`).
*Finding:* `POST /demo/book` appears in the endpoint table with the annotation
"**PROPOSED, see §10**", and §10 states plainly that no certified backend endpoint exists. The existing
Cal.com flow is live and is the only working conversion path on the site today.
*Resolution:* **`PROPOSED`. No `/demo/book` route is created, typed as real, or wired.** Cal.com is
documented as an **existing external option only**, and the A-02 defect is fixed by giving the anchor a
real `href` with the embed as progressive enhancement. Demo booking remains optional and is never a
prerequisite to starting a trial (handoff §10). Severity P0 if the proposed endpoint is implemented.

---

**C-19 — Entitlement enforcement is technical, not manual. Two `OWNER` rows are answered.**
*Documents:* Handoff §5 row 10 (`GET /entitlements` → `{ features: { "px.experience": "enabled|deferred|denied",
"social.publish": …, "assistant": … } }`) and §3 step 6 `locked_by_plan` vs `CLAIMS_MATRIX.md` PK-08 and
O-07 ("is enforcement technical or manual?") and `PRODUCT_TRUTH.md` §17.7.
*Resolution:* enforcement is **`BACKEND CONFIRMED` as technical and per tenant**. PK-08 and O-07's
technical question is answered. The word "unlocks" becomes defensible. The **feature to package mapping**
(PK-04) and the **quota numbers** (PK-05) are still absent from the handoff and remain
`OWNER DECISION PENDING`. Severity P1.

---

**C-20 — Employee roles are now confirmed. O-02 is answered.**
*Documents:* Handoff §5 row 16 (`role: "agent" | "team_lead" | "office_manager" | "agency_admin"`) vs
`CLAIMS_MATRIX.md` O-02 (`OWNER`: "naming roles that are not confirmed is forbidden").
*Resolution:* the four roles are `BACKEND CONFIRMED` and may be named once `CLAIMS_MATRIX.md`'s owning
chat updates O-02. Note the handoff also confirms `agency_admin` as the owner bootstrap role created at
signup. Severity P2.

---

**C-21 — Hot lead alerting is still missing from every source.**
*Documents:* `COPY_AND_CONVERSION_MASTER.md` §13.1 and §14.1 item 8 (raised as the single most important
gap) vs the handoff (**no alerting endpoint, no alert routing, no ownership model, nothing**) vs
`CLAUDE.md` (which mandates hot lead alerts as a **MANDATORY SELLING POINT**).
*Finding:* three documents want it, one document is supposed to define it, and it is not there. The
handoff's 28 surfaces contain no notification, alert, subscription or push contract of any kind.
*Resolution:* **`BLOCKED`, on a missing handoff field.** Named precisely in §9.2 as MF-02. No copy, no
section, no phone mockup and no visual may assert it. `CLAUDE.md`'s mandate cannot be satisfied and that
is a further reason `CLAUDE.md` needs the owner approved update. Severity P1, and it is the highest value
unblock available to the copy chat.

---

**C-22 — The privacy policy problem gets worse, not better.**
*Documents:* Handoff §1, §3, §5 rows 1, 13, 14, 16 vs `CLAIMS_MATRIX.md` L-14 ("materially incomplete…
site wide and launch blocking") and `PRODUCT_TRUTH.md` §19 L-14.
*Finding:* the current policy covers "reply to your inquiry" on a consent only basis with no retention
period. The confirmed integration adds account creation, password handling, JWT sessions, agency and
team personal data, uploaded branding assets, provider OAuth tokens held server side, testimonial video
consent, and payment handoff. Every one of those is new processing.
*Resolution:* `LEGAL REVIEW PENDING`, **launch blocking**, and materially larger in scope than L-14 was
written to cover. No authenticated surface may ship to a public URL before this closes. Severity P0.

---

**C-23 — The credential recorded as "closed" is still physically present.**
*Documents:* `CURRENT_SITE_AUDIT.md` A-01 ("Closed for this project — rotated and cleaned up") and
`IMPLEMENTATION_STATUS.md` A-01 (`~~P0~~`, Closed) vs `CLAIMS_MATRIX.md` §21 item 18 ("**Rotate the
exposed credential** … Security … **P0**", still listed as an open owner decision) vs the repository.
*Finding:* the three documents disagree with each other, and the file is unchanged. See §6 for the
factual audit. Rotation status is the owner's assertion and this chat neither verified it nor could.
*Resolution:* documentary conflict, `OWNER DECISION PENDING` on the hygiene action only. See §6.3.
Severity P1 for hygiene; the security severity depends entirely on repository visibility, which this
chat did not check and must not assume.

---

**C-24 — Approved wording in `CLAIMS_MATRIX.md` violates the copy house style.**
*Documents:* `CLAIMS_MATRIX.md` D-01, K-02, K-11 approved wording (contains em dashes) vs
`COPY_AND_CONVERSION_MASTER.md` §0.4 and §1.8 (em dash, en dash and parenthetical dash **banned** in
customer facing copy, both languages).
*Finding:* e.g. D-01 *"One customer, one record — across every channel they use."*, K-02 *"Full view —
floor to ceiling."*, K-11 *"Structured navigation by design — no joystick, no getting lost."*
*Resolution:* **the claim survives, the punctuation does not.** Rank 2 governs *what* may be said; rank 4
governs *how it is punctuated*, within rank 2's limits. `COPY_AND_CONVERSION_MASTER.md` has already
demonstrated the correct handling (its §6.10 renders K-02 as "floor to ceiling" inside a comma
separated sentence, and its §6.6 renders K-11 as two sentences). That practice is now the binding rule
for every matrix string. Severity P2.

---

**C-25 — `IMPLEMENTATION_STATUS.md` is stale on the gate and on the conflict set.**
*Finding:* it records the gate at 3 of 4 with `LUXURY_UX_MEDIA_SYSTEM.md` missing (it arrived in
`fc6dfd0`), and its C-01, C-03 and C-06 entries are superseded by C-08, §3.1 C-11 and C-19 above.
*Resolution:* correction is owed by the chat that owns that file. This chat does not edit it. Severity P2.

### 3.2 Conflicts explicitly **not** resolved by the handoff

Recorded so nobody assumes progress that did not happen. Every one keeps its existing
`CLAIMS_MATRIX.md` verdict unchanged.

| Area | Matrix rows | Status after the handoff |
|---|---|---|
| Lead score scale and thresholds | D-03, D-04, R-04 | `OWNER DECISION PENDING`. Not in the handoff. |
| Measured response time figure | B-05, B-06 | `OWNER DECISION PENDING`. Not in the handoff. |
| Follow up timing and lawful basis | E-01, E-02, E-03 | `LEGAL REVIEW PENDING` (L-01). Not in the handoff. |
| Reactivation of older contacts | E-04 | `LEGAL REVIEW PENDING` (L-02). Highest risk capability. Not in the handoff. |
| Image / document / audio storage | B-09, B-10, B-11, G-05 | `LEGAL REVIEW PENDING` (L-03, L-04, L-05). Not in the handoff. |
| Automated profiling disclosure | D-02, D-09, R-03 | `LEGAL REVIEW PENDING` (L-09). Not in the handoff. |
| Team performance visibility | I-07, R-08 | `LEGAL REVIEW PENDING` (L-11). Not in the handoff. |
| Property measurement source enforcement | K-05 | `LEGAL REVIEW PENDING` (L-12). Not in the handoff. |
| Daily Assistant question set | I-01 … I-08 | `OWNER DECISION PENDING`, every row. Not in the handoff. |
| Reporting scope and metrics | R-01 … R-15 | Unchanged. Not in the handoff. |
| Simulation disclosure wording | S-02, CTA-3 | `OWNER DECISION PENDING`. Not in the handoff. |
| Public package names | PK-02 | `OWNER DECISION PENDING`. The handoff carries internal IDs only. |
| Feature to package mapping, quotas | PK-04, PK-05 | `OWNER DECISION PENDING`. Not in the handoff. |
| Named portals | F-06 | `REJECTED`, unchanged. See C-12. |
| Social platform names | C-01 … C-08 | Unchanged. The handoff names `social.publish` as an entitlement key only, never a platform. |

---

## 4. TASK 3 — Copy audit against the updated truth

Verdicts use the labels the brief requires: `APPROVED`, `REWRITE REQUIRED`, `LEGAL HOLD`,
`INTEGRATION PENDING`, `REMOVE`, `OWNER DECISION`. Where a passage carries two constraints, both are
shown and **the stricter one governs**.

**Standing rules that apply to every row.** No guaranteed statement about revenue, ROI, sales,
closings, lead volume or market share. No invented statistic. No invented integration. No em dash, en
dash or parenthetical dash anywhere in public copy, in either language.

| # | Copy passage / element | Where it lives | Verdict | Reason and required action |
|---|---|---|---|---|
| 1 | **Start Free Trial** | CTA library CTA-02, Ladder A | `OWNER DECISION` + `INTEGRATION PENDING` | The 14 day trial is `BACKEND CONFIRMED` (C-08). The word **free** is not. Rewrite to a wording the owner confirms, or drop "free". No wording ships until the signup surface exists. |
| 2 | **Start your 14 day free trial** (governance §11 primary CTA) | `MASTER_GOVERNANCE.md` §11 | `REWRITE REQUIRED` | The duration is now defensible; "free" is not. Governance §11 still cannot be implemented verbatim. Ladder B (`Book a demo` primary) remains the shipping ladder until the owner ratifies. |
| 3 | **No credit card required** | Trial microcopy, currently not drafted | `REMOVE` | Not stated anywhere in the handoff. T-01 forbids it explicitly. Correctly never drafted. Keep it undrafted. |
| 4 | **Log in** | Nav utility cluster, CTA-09 | `INTEGRATION PENDING` | Auth is `BACKEND CONFIRMED` (Supabase GoTrue password grant, logout, refresh). C-03's "does a customer app exist" is answered yes. The **destination URL after `ready`** is still not in the handoff (MF-03). Label approved in principle; does not render until the route exists. |
| 5 | **Signup** copy and field labels | COPY §9.4 form library | `INTEGRATION PENDING` | Contract confirmed: `{ name, email, password, language, agency_name }`, public + captcha, `409` on existing email. COPY's five field maximum holds exactly. Validation and error strings must be extended for `409 email exists` and captcha failure. |
| 6 | **14 day trial** as a factual duration | Onboarding page, pricing entry | `APPROVED` once the trial surface exists | `BACKEND CONFIRMED`. Render the countdown from `trial_end`, never from a hardcoded 14. Handoff §2 makes `trial_end` the source of truth. |
| 7 | **Onboarding** narrative ("Set up your agency yourself. No developers needed.") | COPY §6.14 `[O-01]` `[O-08]` | `APPROVED` (was `OWNER DECISION`) | The 10 step self service wizard is `BACKEND CONFIRMED` with `percent_complete`, `resume_step`, `completed_steps`. O-01's "does the flow exist" is answered. O-08 keeps its qualifier. |
| 8 | **"No setup needed"** (live on the site today) | `translations/en.ts`, homepage | `REMOVE` | O-09 `REJECTED`, and the handoff makes it more clearly false: ten configured steps, provider OAuth, branding upload, inventory source. Must not be carried over. |
| 9 | **Onboarding step names** (Agency details, Branding, Team, Channels, CRM, Property source, Property experience, Readiness) | COPY §6.14, nav | `APPROVED` as names | The ten step keys and titles are `BACKEND CONFIRMED`. Names only. Behaviour descriptions still inherit their capability verdicts. |
| 10 | **Employee roles** (agent, team lead, office manager, agency admin) | COPY §6.14 `[O-02]` | `APPROVED` (was `OWNER DECISION`) | `BACKEND CONFIRMED` (C-20). Requires `CLAIMS_MATRIX.md` O-02 to be updated by its owning chat first. |
| 11 | **Testimonial submission** copy | Not drafted, correctly | `LEGAL HOLD` | C-09. Technically confirmed, legally held on L-13. Stays undrafted for public surfaces. Any authenticated surface must use "Received. Pending review." and must never imply the extension is granted. |
| 12 | **plus 7 day extension** in any public wording | Not drafted | `LEGAL HOLD` + `REMOVE` from public copy | C-09. T-03 DISABLED. Additionally, per the handoff's honesty note, no surface may ever hardcode "7"; it renders the updated `trial_end`. |
| 13 | **pending_review** as a user facing state | Authenticated surface only | `APPROVED` for the authenticated surface, `LEGAL HOLD` for public | State vocabulary `pending | approved | rejected` is `BACKEND CONFIRMED`. |
| 14 | **Plan Selection** copy, three tiers | COPY §6.12 | `INTEGRATION PENDING` + `OWNER DECISION` | `GET /plans` returning `{ code, name, price_display, features_summary }` is `BACKEND CONFIRMED`, so prices are **served, never authored**. PK-06's "no price may be displayed" is superseded in mechanism: the page renders `price_display` from the endpoint. Whether the **public marketing site** shows prices at all is still the owner's call (PK-07). Layout A may not be built until that answer exists. |
| 15 | **Nuova Studio / Signature / Prime** | COPY §5.2 | `OWNER DECISION` | The handoff carries internal IDs `essential | growth | scale` only. `price_display` and `name` come from the endpoint, which means the **public names are backend supplied at runtime**. The owner must confirm that the recommended names are the ones configured in `/plans`, or the site and the backend will disagree. This is a new and important dependency. |
| 16 | **Trial Expiry** copy | Not drafted | `INTEGRATION PENDING` | `status = trial_expired` is `BACKEND CONFIRMED`, with the rule that premium features resolve to `denied` and login is **never blocked**. Copy must be written to that rule. Day 15 commercial wording is `OWNER DECISION`. |
| 17 | **Upgrade** copy and checkout handoff | Not drafted | `INTEGRATION PENDING` | `POST /checkout/session → { checkout_url }` and `GET /subscription/state` are `BACKEND CONFIRMED`. No price, no billing period and no term may be authored; all display values come from `/plans`. |
| 18 | **Book a Demo** | CTA-01, site wide | `APPROVED` | Unchanged. The only working conversion path. Cal.com documented as an **existing external option**. A-02 must be fixed: real `href`, embed as progressive enhancement. No duration promise ("15 minutes", "30 minutes") until the owner supplies one. Note COPY §6.1 section 9 and §6.12 still contain "**30 minute call**" in two places: `REWRITE REQUIRED`. |
| 19 | **Experience Nuova** | CTA-03, `/experience` | `OWNER DECISION` | Nothing in the handoff. Still a client side simulation. Ships only with a pre interaction simulation label whose wording is an owner decision (S-02). S2 remains the recommendation. |
| 20 | **Talk to Nuova** | CTA vocabulary | `REMOVE` | C-04 unresolved, and the handoff defines no such behaviour. COPY already retired the label. Confirmed retired. |
| 21 | **Chat with Nuova** | Site assistant | `REMOVE` from this wave | Reclassified from `OWNER` to **`RESERVED`**: handoff §10 reserves `POST /sales-bot/turn` and says do not implement. A launcher that accepts input and never answers is P0. Do not ship a chat launcher. |
| 22 | **Voice** in any present tense wording | Site wide | `REMOVE` | C-16. Only V-02's "Voice, coming next." in one visually separated future block. The onboarding voice **connection** is an authenticated surface, not a public claim. |
| 23 | **Voice sales concierge on the website** | Reserved concept | `REMOVE` from public surfaces | `RESERVED`. Visual preparation permitted, no live behaviour, no availability implication. |
| 24 | **WhatsApp** public CTA | CTA-07 | `REMOVE` | C-17. No number exists. R7 forbids inventing one. |
| 25 | **WhatsApp sales concierge on the website** | Reserved concept | `REMOVE` from public surfaces | `RESERVED`, same treatment as 23. |
| 26 | **"Connect your channels, based on the permissions you hold."** | COPY §6.2 §5, §6.14 §4 `[O-03]` `[Q-2]` | `APPROVED` | Strengthened. Email, WhatsApp/Meta, Calendar and Voice connection surfaces are `BACKEND CONFIRMED`, and `externally_pending` is a real backend state, which makes the qualifier literally accurate rather than defensive. |
| 27 | **CRM integrations** named as text (HubSpot, Salesforce, Pipedrive, Zoho) | Currently forbidden site wide | `OWNER DECISION` (was `REMOVE`) | C-11. Evidence now exists. Naming is a commercial decision. **Logos stay `REMOVE`** pending trademark permission. |
| 28 | **"Always synced to your CRM"** | Live on the site today | `REMOVE` | F-08. Still `REJECTED`. The confirmed contract is connection, state and health, not guaranteed sync. "Always" is an absolute. |
| 29 | **Nuova CRM as the default** ("Universal across your channels") | COPY §6.4 §6 `[G-10]` | `APPROVED`, and strengthenable | Handoff §3 step 7: "Nuova universal CRM is the default (`completed` with no action)". This is `BACKEND CONFIRMED` and directly answers the "we already have a CRM" objection COPY §14.2 named as the highest value unblock. G-11's positioning question is now answerable by the owner: default in, external optional. |
| 30 | **Hot Lead** statements of any kind | Homepage, Lead Intelligence, Daily Assistant, phone mockup | `REMOVE` | C-21. `BLOCKED` on missing field MF-02. Not in the handoff, no matrix row, no evidence. `CLAUDE.md`'s "MANDATORY SELLING POINT" cannot be honoured. |
| 31 | **Lead score "1 to 100", "above 80"** | Live on the site today | `REMOVE` | D-04, S-04. Sourced from the website's own simulation. Not in the handoff. |
| 32 | **Property Matching** claims F-01 to F-04 | COPY §6.6 | `APPROVED` with qualifiers | Unchanged, and better supported: `property-source/status` returns `accepts_scraped_owned_inventory: true`. "Matches against your own or agency authorised property sources" is now `BACKEND CONFIRMED` in mechanism. |
| 33 | **"Three properties" / fixed selection count** | COPY §6.6 removed line | `REMOVE` | F-03. Not in the handoff. Stays removed. |
| 34 | **Property Experience** K-01 … K-12 | COPY §6.10 | `APPROVED` with qualifiers, except K-05 | Entitlement and entry are `BACKEND CONFIRMED` (`px.experience`, `/px/entry` → `available | locked_addon`). The twelve capture capabilities are **not** in the handoff and keep their `PRODUCT_TRUTH.md` §13 status. **K-05 square metres stays `LEGAL HOLD`** (L-12). The handoff explicitly assigns the capture wizard to the PX lane, so the website must not build a second one. |
| 35 | **Follow up** behavioural description | COPY §6.3 §4 | `LEGAL HOLD` | L-01. Nothing in the handoff. The capability **name** may still appear as a package line item under PK-03. |
| 36 | **Reactivation** in any wording | Removed from three pages | `REMOVE` | E-04, L-02. Nothing in the handoff. Stays removed on all three pages. |
| 37 | **Reporting** R-01 … R-12 | COPY §6.9 | `APPROVED` with qualifiers, unchanged | Nothing in the handoff. "Supported conversions" stays exact and is never shortened. R-08 stays `LEGAL HOLD` on L-11. |
| 38 | **Any reporting visual containing numbers** | Site wide | `APPROVED` only with the visible Illustrative marker | R-15, LUXURY §5.11. Unchanged and non negotiable. |
| 39 | **"Every real inquiry gets a reply. Only spam is ignored."** | Live on the site today | `REMOVE` | B-14. Absolute guarantee. |
| 40 | **"Replied in < 1 second" / "Replied in 4 seconds"** | Live site and `/v2` draft | `REMOVE` | B-06, S-04. Contradictory and unverified. |
| 41 | **"AI lead automation for real estate agencies in Spain"** (footer) | Live on the site today | `REMOVE` | P-05. Superseded positioning. |
| 42 | **"Built in Spain"** footer line | COPY §8 | `OWNER DECISION` | A factual claim about the company. Unchanged. |
| 43 | **Security and data section** | COPY §6.2 §7 | `LEGAL HOLD` | C-22. The confirmed integration enlarges the processing the privacy policy must describe. B-15 and X-08 still reject every security, encryption and GDPR claim. |
| 44 | **Any Spanish string** | Site wide | `OWNER DECISION` on the module name exception; otherwise unchanged | COPY §11.3b's final qualifier bank stands and supersedes the matrix drafts. New authenticated surfaces need Spanish written natively, not translated, including the eight step and status labels. |

### 4.1 Copy passages that must be written new, and cannot be written yet

| Passage | Blocked by |
|---|---|
| Signup form success and error copy | `INTEGRATION PENDING`; needs the error `code` enumeration (MF-04) |
| Login, logout, session expired and refresh failure copy | `INTEGRATION PENDING` |
| Wizard step titles, descriptions and eight status labels in EN and ES | `INTEGRATION PENDING`; the per step `detail` shape is not specified (MF-05) |
| Resume prompt ("continue where you left off") | `INTEGRATION PENDING` |
| `externally_pending` explanation per provider | `INTEGRATION PENDING`; "waiting on {provider}" needs a confirmed provider display name list |
| `degraded` and `action_required` explanations | `INTEGRATION PENDING`; needs the `missing_api_names[]` presentation decision |
| Trial countdown, reminder and expiry copy | `INTEGRATION PENDING` + `OWNER DECISION` on reminder cadence (MF-06) |
| Plan comparison and upgrade copy | `OWNER DECISION` (PK-04, PK-05, PK-07) |
| Branding upload copy, file type and size errors | `INTEGRATION PENDING`; `400 unsupported_file_type / file_too_large` needs the actual limits (MF-07) |
| Captcha copy and failure state | `INTEGRATION PENDING`; provider not named (MF-08) |

---

## 5. TASK 4 — Design system checked against the real customer journeys

### 5.1 What holds without change

`LUXURY_UX_MEDIA_SYSTEM.md` was written for a marketing site, and its foundations transfer to
authenticated surfaces intact. The following are **binding and sufficient** for the integration wave:

- §2 colour tokens and the **computed** contrast table, including the three signal colours, which map
  cleanly onto the backend status vocabulary.
- §3 type scale, measure law, spacing scale, stepped section rhythm, three seam types, container set,
  asymmetry ratios, **alignment law** (left aligned headings, three centred exceptions), radius law
  (8 px maximum, 4 px buttons, **no pill buttons**), four shadow tokens.
- §4 motion system: transform and opacity only, ≤ 520 ms, 12/16 px displacement, the no-JS safety
  pattern, the motion budget, reduced motion.
- §5.1 button hierarchy and the one primary per viewport rule.
- §5.6 form law. It is unusually complete and covers labels, focus, errors, error summary, reserved
  heights, `aria-busy`, autocomplete and the privacy line.
- §5.9 honest states. Directly reusable for `locked_by_plan`, `externally_pending` and `RESERVED`.
- §5.11 **the ProductSurface honesty firewall**. This is the most valuable rule in the document and it
  is what will keep an authenticated build from fabricating dashboards.
- §5.12 route based language switcher. Required by the `/[locale]` model.
- §5.13 focus, §5.14 loading, §5.15 error and empty states.
- §1.3's eighteen anti patterns, which are the specific defence against the failure mode the owner
  named: a luxury system collapsing into a generic SaaS card landscape.

### 5.2 What the design system does not yet cover

The document specifies **one** onboarding page (`ON-01` to `ON-06`) whose §`ON-04` is "the form **or**
the honest state". The confirmed journey is a **ten step, resumable, entitlement gated, provider
dependent wizard with eight status values and an OAuth round trip**. That is a different order of
surface. The following gaps are real and must be closed before any authenticated page is composed.

| # | Journey element | Covered by LUXURY? | Gap |
|---|---|---|---|
| 1 | Signup | Partly (§5.6 forms) | No page architecture. No captcha placement. No `409 email exists` treatment. |
| 2 | Login | No | No page architecture. No "session expired, sign in again" state. |
| 3 | Logout | No | No confirmation or redirect behaviour. |
| 4 | Trial status surface | No | No banner, no countdown component, no placement rule, no "never blocks login" treatment. |
| 5 | 10 step wizard shell | **No** | No step rail, no progress indicator, no `percent_complete` treatment, no step numbering law. **The largest gap.** |
| 6 | Progress and resume | No | No spec for returning to `resume_step`, no "continue where you left off" pattern. |
| 7 | Readiness / `activatable` | No | No summary surface, no legend rendering. |
| 8 | Dashboard handoff | No | No exit pattern, and no destination (MF-03). |
| 9 | Trial expiry | No | No `trial_expired` treatment, no `denied` feature treatment. |
| 10 | Testimonial `pending_review` | No | No submission surface, no pending state. Also `LEGAL HOLD`. |
| 11 | Plan selection / upgrade | Partly (§5.7 Layout A/B) | Layout A is a marketing price table. There is no **authenticated** upgrade or checkout handoff surface. |
| 12 | Error states for the API envelope | Partly (§5.15) | No treatment for `401 token_expired`, `403 not_on_plan`, `403 cross_tenant`, `409 conflict`, `422 unprocessable`, `424 degraded`, `429 rate_limited`, and no rule for surfacing `request_id`. |
| 13 | Loading states for authenticated data | Partly (§5.14) | The 300 ms spinner rule holds, but there is no skeleton spec for a step list or a status row. |
| 14 | Connection states | **No** | Eight status values with **no** visual specification. `connected`, `degraded` and `action_required` are connector health; `completed`, `needs_action`, `externally_pending`, `locked_by_plan`, `optional` are wizard steps. |
| 15 | Provider failures | No | No treatment for OAuth cancelled, OAuth returned an error, or a provider going `degraded` after being `connected`. |
| 16 | File upload (branding) | **No** | §5.6 has no file input law: no drop zone, no preview, no progress, no replace, no remove confirmation. |
| 17 | Mobile onboarding | Partly (§6) | Breakpoints hold, but a ten step wizard on 375 px has no specified composition. |

### 5.3 Binding constraints for closing those gaps

These are recorded here so the design chat extends the system rather than inventing a second one.

1. **The wizard is an index, not a card grid.** Use the `PO-03` hairline index row pattern (numeral +
   `heading-l` + one `body-s` line + right aligned affordance, whole row is the control). §1.3 #1 and
   #3 forbid the card landscape, and a ten step wizard is where that failure would happen.
2. **Status is never colour alone.** §2.1 and §7. Every one of the eight values renders as
   icon + text + colour. The three signal tokens are the only permitted colours and both canvas
   variants are already computed in §2.3.
3. **`externally_pending` is never rendered as complete.** Handoff Appendix B invariant 5, and handoff
   §3's closing rule. This is a release blocking invariant, not a styling preference.
4. **`locked_by_plan` uses the §5.9 honest state treatment, not an error treatment.** The handoff is
   explicit: "Upgrade path, not an error."
5. **No fabricated dashboard, ever.** §5.11's three states apply unchanged to authenticated surfaces.
   A `pending` frame shipping is honest; a mocked up dashboard is not.
6. **No technical identifiers are ever shown to the agency.** Handoff Appendix B invariant 6: no n8n,
   workflow or webhook IDs, no storage object IDs, no tenant UUIDs, no technical entitlement keys. The
   agency sees "Property Experience", never `px.experience`. This must be a rendering layer rule, not
   a convention.
7. **`request_id` is shown only in a copyable support affordance**, never as a raw error code in the
   headline. §5.15 already forbids raw codes.
8. **Progress is content driven.** `percent_complete` comes from the backend and is rendered; it is
   never computed client side. §5.14's reserved space rule prevents the layout shift.
9. **Capability status is a content property, not hard coded prose.** Required by `CLAIMS_MATRIX.md`
   §25 item 2 and `COPY_AND_CONVERSION_MASTER.md` §15 item 3. It now also applies to entitlement and
   plan gating, which change per tenant at runtime.
10. **The luxury register does not soften because a surface is authenticated.** Same tokens, same type
    scale, same alignment law, same radius law, same motion budget, same anti patterns. There is no
    "app theme".

### 5.4 Anti generic guardrails, restated as acceptance criteria

The owner's specific concern is that technical integration turns the site into something that reads as
generated. The following are the concrete checks. All are already binding in `LUXURY_UX_MEDIA_SYSTEM.md`
§1.2 and §1.3; they are restated because the authenticated surfaces are where they will be tested.

- No endless identical cards. No bento grid without narrative purpose. No generic gradients. No
  glassmorphism. No pill buttons. No fake dashboards. No AI brains, robots or 3D blobs.
- No unnecessary empty area, no visual gaps, no layout jumps, no overloaded animation.
- Every gap comes from a spacing token. Height comes from content plus one section padding token.
- A stranger could not name the template. Removing all animation leaves the page fully legible.
- Every product depiction is a real capture or is labelled as not one.

---

## 6. TASK 5 — Legacy n8n Cloud and secret exposure audit

Scanned: the entire repository excluding `node_modules` and `.git`, tracked and untracked, source and
build output, for retired hosts, webhook path patterns, MCP configuration, API keys, tokens, secrets,
old environment variables, direct browser webhook calls, sensitive `NEXT_PUBLIC_*` variables and
hardcoded production URLs.

**No secret value, token value, key fragment or complete sensitive URL is reproduced anywhere in this
document.** No found connection was accessed, called, tested or verified. No rotation and no history
cleanup was performed.

### 6.1 Findings

| ID | File path | Risk category | Git tracked | Likely in git history | Recommended remediation | Rotation required |
|---|---|---|---|---|---|---|
| **N-01** | `.mcp.json` | **Live shaped API credential + retired host URL.** One `N8N_API_URL` value (short host string) and one `N8N_API_KEY` value (267 characters, JWT shaped). Developer tooling configuration for an `n8n-mcp` server. | **Yes** | **Yes.** Introduced in `9c6c174` ("add /live-demo interactive AI pipeline demo page"), before this branch. Present in every commit since. | Remove from version control (`git rm --cached`), add to `.gitignore`, keep locally only if still wanted, and **delete the retired connection entirely** rather than repairing it. The MCP server for this configuration failed to connect in this session (`CONNECT_TIMEOUT`), which is consistent with a retired or rotated endpoint but proves nothing either way. | **Owner decision.** `CURRENT_SITE_AUDIT.md` A-01 and `IMPLEMENTATION_STATUS.md` A-01 record the credential as already rotated. `CLAIMS_MATRIX.md` §21 item 18 still lists rotation as an open **P0**. The three documents disagree (C-23). The value is still physically present in the working tree, in the index, and in history. If the repository is or was public, treat rotation as mandatory regardless of the earlier record. **This chat did not check repository visibility and must not assume it.** |
| **N-02** | `docs/website_redesign/CURRENT_SITE_AUDIT.md` §15 | Retired host **named in prose**, no value. | Yes | Yes | None required. The audit correctly declines to reproduce the credential. | No |
| **N-03** | `docs/website_redesign/backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v1.md` §8 | Retired host patterns and secret shaped patterns appear as a **search and eliminate list** and as **environment variable names**. No values. | **No** (untracked) | No | None. This is intended content. Note that it will match the §8 CI guard's own regex if the guard is ever pointed at `docs/`. Scope the guard to `./src ./app ./components ./lib ./.next` as the handoff specifies. | No |
| **N-04** | `.claude/settings.local.json` | Per developer local tool permissions. No secrets. Contains absolute local filesystem paths. | **Yes** | Yes | Untrack and gitignore. Hygiene only. | No |
| **N-05** | `.next/` (180 files) | **Build output under version control.** Any future build that inlines an environment value would commit it. Also the direct cause of the `git add .` collisions in §2.4. | **Yes** | Yes | `git rm -r --cached .next`, add to `.gitignore`. Do this **before** any environment variable is introduced. | No, but it is a precondition for safely introducing any |
| **N-06** | `tsconfig.tsbuildinfo` | Build artefact. | Yes | Yes | Untrack, gitignore. | No |
| **N-07** | `.vercel/repo.json` | Project and organisation identifiers, git remote. | No (`.vercel` is gitignored, correctly) | No | None. | No |

### 6.2 Findings that are absent, and are worth stating

- **No n8n reference of any kind in `app/`, `components/`, `lib/`, `translations/` or `public/`.** The
  website runtime has never touched n8n.
- **No direct browser webhook call anywhere.** `fetch`, `XMLHttpRequest` and `axios` appear zero times
  in application source.
- **No `NEXT_PUBLIC_*` variable exists anywhere** in source, configuration or any `.env` file, so there
  is currently no sensitive public variable. There is also no environment plumbing at all.
- **No `.env`, `.env.local` or `.env.example` file exists.**
- **No inline API key or token in application source.**
- Hardcoded production URLs exist but are not secrets: two self referencing
  `https://nuovasolution.com/live-demo` anchors (audit A-03, breaks preview deployments) and the
  Cal.com embed and booking URLs.

### 6.3 The one thing that must happen before any environment variable is introduced

`.gitignore` has two lines and `.next/` is tracked. Introducing `SUPABASE_SERVICE_ROLE_KEY` or any
provider client secret into this repository in its current state is unsafe by construction. **The
hygiene work in §6.1 (N-01, N-04, N-05, N-06) is a hard precondition for the BFF chat**, and it is
sequenced accordingly in `FINAL_WEBSITE_INTEGRATION_PLAN.md`.

---

## 7. TASK 6 — Vercel and BFF target model

Derived entirely from handoff §0, §1, §5, §6, §7 and §9. **No real secret value appears here. Names
only.**

### 7.1 The one rule

> The browser only ever holds the **publishable anon key** and the **end user's own JWT**. Every
> privileged action runs server side in the BFF. The browser never receives a provider access or
> refresh token, a webhook secret, or any service key.

### 7.2 Browser safe calls

| Call | Auth carried | Note |
|---|---|---|
| `POST {SUPABASE_URL}/auth/v1/token?grant_type=password` | `apikey: {anon}` | Login. Prefer `@supabase/ssr` so the session lives in httpOnly cookies rather than `localStorage`. |
| `POST {SUPABASE_URL}/auth/v1/logout` | user Bearer | |
| `POST {SUPABASE_URL}/auth/v1/token?grant_type=refresh_token` | SDK managed | On `401`: refresh once, retry once, then route to login. |
| `GET {SUPABASE_URL}/rest/v1/rpc/*` | `apikey: {anon}` + user Bearer | **Only** functions granted to `authenticated`. Not used by default; prefer the BFF. |

Every authenticated call sends **both** `apikey` and `Authorization: Bearer <access_token>`.

### 7.3 Calls that must run through the Next.js server or BFF

All 26 non GoTrue surfaces in handoff §5. Grouped by why they cannot be browser side:

| Reason | Surfaces |
|---|---|
| Service role provisioning | `/signup` (1), `/team/invite` (16) |
| Trial, entitlement and billing internals | `/trial/status` (4), `/subscription/state` (8), `/entitlements` (10), `/plans` (7), `/checkout/session` (9) |
| Moderation and publish decisions | `/testimonial` (5), `/testimonial/status` (6) |
| Gate resolvers and progress persistence | `/onboarding/state` (11), `/onboarding/touch` (12) |
| Signed URL minting and service role storage writes | `/branding/upload-init` (13), `/branding/commit` (14), `/branding/preview` and `/branding/remove` (15) |
| Provider client secrets, OAuth state and nonce, token exchange | `/connect/{email\|whatsapp\|calendar\|voice}/start` (17), `/connect/{provider}/status` (18) |
| Ad tokens and app secrets | `/paid/connect/{google\|meta\|ctwa}` (19), `/paid/status` (20) |
| CRM OAuth client secrets, instance URLs, tokens | `/crm/providers` (21), `/crm/connect/{provider}/start` (22), `/crm/status` (23), `/crm/health` (24) |
| Scrape and feed credentials | `/property-source/connect` (25), `/property-source/status` (26) |
| Entitlement resolution | `/px/entry` (27) |
| **Proposed only, do not implement** | `/demo/book` (28) |

Additionally, and never as client routes: **provider OAuth callbacks** and **checkout webhooks**.
Webhook signatures are verified server side against the server only secret.

### 7.4 Environment variables (names only)

**Browser safe, `NEXT_PUBLIC_` prefixed:**
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_NUOVA_API_BASE`,
`NEXT_PUBLIC_CHECKOUT_PUBLIC_KEY`, `NEXT_PUBLIC_APP_ENV`, `NEXT_PUBLIC_CAPTCHA_SITE_KEY`.

**Server only, never `NEXT_PUBLIC_`, set as Encrypted in Vercel, available to Serverless/Edge only:**
`SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_PROJECT_REF`, `GOTRUE_ADMIN_URL`,
`PROVIDER_GOOGLE_CLIENT_ID`, `PROVIDER_GOOGLE_CLIENT_SECRET`, `PROVIDER_META_APP_ID`,
`PROVIDER_META_APP_SECRET`, `PROVIDER_CALENDAR_CLIENT_ID`, `PROVIDER_CALENDAR_CLIENT_SECRET`,
`PROVIDER_VOICE_CLIENT_ID`, `PROVIDER_VOICE_CLIENT_SECRET`, `CRM_HUBSPOT_CLIENT_ID`,
`CRM_HUBSPOT_CLIENT_SECRET`, `CRM_PIPEDRIVE_CLIENT_ID`, `CRM_PIPEDRIVE_CLIENT_SECRET`,
`CRM_ZOHO_CLIENT_ID`, `CRM_ZOHO_CLIENT_SECRET`, `CRM_SALESFORCE_CLIENT_ID`,
`CRM_SALESFORCE_CLIENT_SECRET`, `CHECKOUT_SECRET_KEY`, `CHECKOUT_WEBHOOK_SECRET`,
`CAPTCHA_SECRET_KEY`, `NUOVA_BFF_ALLOWED_ORIGIN`.

**Hard rule (handoff §6, release blocking):** a service role key, provider client secret, webhook
secret or any token must never appear in a `NEXT_PUBLIC_*` variable, in the client bundle, or in a
browser network response.

### 7.5 Staging and production separation

- Every backend target comes from environment variables. **No target is hardcoded in source, ever.**
- Staging versus production is a **pure environment change**: different values, identical variable
  names, no code edit, no logic redeploy.
- Provider OAuth redirect URIs point at the **BFF origin per environment**, registered with each
  provider separately.
- CORS: the BFF sets `Access-Control-Allow-Origin` to the exact `NUOVA_BFF_ALLOWED_ORIGIN`, never `*`
  with credentials; allows `Authorization, Content-Type`; methods `GET, POST, OPTIONS`; answers
  preflight. Supabase allows the Vercel origins for the matching environment only.

### 7.6 Keeping preview deployments safe

- Preview deployments point at **staging values only**. Never at production secrets.
- Each preview origin is allowed in Supabase and BFF CORS **for staging only**.
- Production environment variables are scoped to the Production environment in Vercel and are not
  exposed to Preview or Development.
- The two self referencing `https://nuovasolution.com/live-demo` anchors (audit A-03) must be replaced
  with relative paths, otherwise every preview links back into production. This is a preview safety
  issue, not only a navigation defect.
- `MASTER_GOVERNANCE.md` §15 still requires **explicit per occasion owner approval for any push and any
  deployment, including a preview**. The safety model above describes how previews will behave once
  approved; it does not authorise one.

### 7.7 Keeping secrets out of the client bundle

1. Page components never import server only environment variables. A single typed server side
   environment module is the only place `process.env` is read for server values.
2. BFF routes run on the server runtime with access to server only variables. There is no shared module
   that both a client component and a BFF route import from.
3. `.env*` files with values are gitignored. Only a committed `.env.example` carrying **names** exists.
4. The handoff §8 CI guard runs as a required check on every pull request and fails the build on
   reintroduction of a retired host or a secret shaped literal. Scope it to source and build output,
   not to `docs/`.
5. **Precondition:** `.next/` must be untracked first (§6.3), or the guard will be scanning committed
   build output and any future inlined value will already be in history.

### 7.8 Replacing the legacy n8n Cloud connection

There is nothing to replace in the website runtime: the site makes no backend call at all (§6.2). The
replacement is therefore purely forward looking. Every future call goes browser → BFF → whatever the
environment configures. The retired connection is **deleted, not repointed** (`MASTER_GOVERNANCE.md`
R8), and `.mcp.json` is untracked (§6.1 N-01).

---

## 8. TASK 7 — Full customer journey reconciliation

The step by step reconciliation, with frontend route, frontend state, backend contract, auth
requirement, BFF requirement, loading state, error state, resume behaviour, mobile requirement,
analytics event, legal dependency and implementation status, is delivered in
**`INTEGRATION_COMPATIBILITY_MATRIX.md` §4**, because it is a wide table and belongs beside the
endpoint mapping.

Two rules governing that table are recorded here because they are governance decisions, not data:

1. **Every frontend route in that table is marked `PROPOSED`.** Not one of them exists. No route is
   described as existing, and no route name is treated as decided until the owner confirms the locale
   strategy (LUXURY D-12) and the route naming (D-11).
2. **Book a demo remains optional and is never a prerequisite to starting a trial** (handoff §10). No
   step in the journey may route a trial signup through a sales call, which is precisely the pattern
   `CLAIMS_MATRIX.md` T-02 rejected on the current live site.

---

## 9. Missing information, named precisely

`MASTER_GOVERNANCE.md` §14.4 and the owner's brief both require that a gap be named as an exact missing
field rather than as a request for access. The following are the exact fields absent from
`WEBSITE_INTEGRATION_HANDOFF_EXPORT_v1.md`.

### 9.1 Blocking (a surface cannot be built at all)

| ID | Missing field | Blocks | Conflict |
|---|---|---|---|
| **MF-01** | A media field on `POST /testimonial` (`video_url`, an upload init pair, or a statement that video is out of scope). Current payload is `{ rating, quote, author_name, author_role, consent }`. | Testimonial submission surface | C-10 |
| **MF-02** | Any hot lead alerting contract: endpoint, channel, routing, ownership model, or a statement that it is out of the website's scope. | Hot lead copy, homepage section, Lead Intelligence §5, Daily Assistant, phone mockup | C-21 |
| **MF-03** | The dashboard destination after wizard step 10 `ready`: a URL, a route, or a statement that the dashboard is inside this website. | `Log in` nav item, the wizard exit, the whole authenticated route tree | C-27 below |

### 9.2 Required before implementation

| ID | Missing field | Blocks |
|---|---|---|
| **MF-04** | The enumeration of `code` values in the uniform response envelope `{ ok, code, message, details, request_id }`. Only HTTP statuses are listed. | All error copy, all error state mapping |
| **MF-05** | The `…detail` shape of each object in `steps[]` from `GET /onboarding/state`, per step key. | The wizard rendering layer |
| **MF-06** | Trial reminder cadence and whether reminders are backend sent or website rendered. | Trial reminder copy and surface |
| **MF-07** | Branding upload limits: accepted `content_type` values and the `size_bytes` ceiling behind `400 unsupported_file_type / file_too_large`. | Branding upload UI and validation copy |
| **MF-08** | The captcha provider behind `NEXT_PUBLIC_CAPTCHA_SITE_KEY` / `CAPTCHA_SECRET_KEY`. | Signup and any public form |
| **MF-09** | Accepted values for `language` in `POST /signup`. | Signup form, locale binding |
| **MF-10** | Currency and tax basis carried by `price_display` in `GET /plans`, and whether `name` is the public marketing name. | Pricing page, plan selection, C-15 in §4 |
| **MF-11** | The provider display name list for rendering "Pending, waiting on {provider}". | `externally_pending` copy |
| **MF-12** | Whether `POST /testimonial` is Bearer only or also `public + captcha`. Handoff §5 row 5 says "Bearer (or public+captcha)"; the two imply different surfaces. | Testimonial surface placement |

### 9.3 A new conflict arising from MF-03

**C-27 — The website does not know where the product ends.**
The handoff's step 10 is "readiness / health summary → **dashboard**", and `Log in` implies a
destination, but no dashboard URL, route or ownership statement exists anywhere. Without it the website
cannot decide whether it is building a marketing site plus an onboarding wizard that hands off, or a
marketing site plus the entire authenticated application. That is a scope question of the largest
possible size and it is currently unanswerable. `OWNER DECISION PENDING`. Severity P0 for planning.

---

## 10. Owner decisions arising from this reconciliation

Ordered by how much they unblock. `CLAIMS_MATRIX.md` §21's eighteen decisions and §22's fourteen legal
dependencies remain live and are **not** duplicated here.

| # | Decision | Unblocks | Severity |
|---|---|---|---|
| 1 | **Does `MASTER_GOVERNANCE.md` §14 permit the website BFF to call a staging target?** State the conditions, and confirm production is excluded. | The entire integration wave. Without it `END TO END VERIFICATION PENDING` can never close. | P0 (C-14) |
| 2 | **Where does the product live after wizard step 10?** Supply the dashboard URL, or confirm the website hosts it. | Authenticated route tree, `Log in`, wizard exit, scope of the whole wave. | P0 (C-27, MF-03) |
| 3 | **Commit `backend_handoff/` to version control?** Confirmed free of secrets by full read. | Reproducibility, diffing export-v2, other clones. | P1 (C-13) |
| 4 | **Is the 14 day trial free, and is a payment method required at signup?** | The primary CTA wording site wide, Ladder A vs Ladder B, the whole conversion ladder. | P1 (C-08) |
| 5 | **May the four CRM vendors be named as plain text?** Separately: are trademark permissions held for any logo? | Platform Overview, Lead Intelligence, the "we already have a CRM" objection. | P0 if acted on early (C-11) |
| 6 | **Confirm the public plan names configured in `GET /plans`.** The backend serves `name`; the website must not contradict it. | Pricing, Solutions, plan selection, the Studio/Signature/Prime recommendation. | P1 (C-15) |
| 7 | **Supply MF-01 and MF-02**, or declare them out of scope. | Testimonial surface; all hot lead copy and one homepage section. | P1 |
| 8 | **Repository hygiene:** untrack `.mcp.json`, `.next/`, `tsconfig.tsbuildinfo`, `.claude/settings.local.json`; extend `.gitignore`. Confirm the rotation state of the credential in `.mcp.json` and the repository's visibility. | Safe introduction of any environment variable; the CI guard; end of the commit collision class. | P1, P0 if the repository is public and the credential is not rotated (C-23) |
| 9 | **Ratify the CTA ladder.** Ladder B (`Book a demo` primary) until decision 4 resolves. Governance §11 cannot be implemented verbatim today. | Every page, every breakpoint. | P1 |
| 10 | **Approve editing `CLAUDE.md`** with the replacement block in `LUXURY_UX_MEDIA_SYSTEM.md` §12.2, extended with the integration and status vocabulary from this report. | Stops the stale brief re entering every session and re introducing forbidden patterns. Also required because `CLAUDE.md`'s "MANDATORY" hot lead alerts and chatbot sections cannot be honoured. | P1 (C-07, C-21) |
| 11 | **Confirm the locale URL strategy** (`/en` and `/es` prefixes vs unprefixed English default) and the route naming. | Every canonical, every `hreflang`, every inbound link, the entire route tree. | P1 (LUXURY D-11, D-12) |
| 12 | **Confirm that a demonstration workspace may be created** for captures and recordings, without touching production. | All eight videos and all product screenshots (LUXURY D-04). | P1 |
| 13 | **Route the fourteen legal dependencies to counsel as a separate track**, with C-22 (privacy policy, now materially enlarged) first. | Site wide launch. | P0 |

---

## 11. Summary of status changes produced by this reconciliation

| Item | Before | After |
|---|---|---|
| 14 day trial exists | `BLOCKED`, "does it exist?" | `BACKEND CONFIRMED` + `WEBSITE INTEGRATION PENDING` |
| "Free" trial wording | `OWNER` | `OWNER DECISION PENDING` (unchanged, now precisely scoped) |
| Login / auth | `BLOCKED`, "does an app exist?" | `BACKEND CONFIRMED` + `WEBSITE INTEGRATION PENDING`; destination `BLOCKED` on MF-03 |
| Self service onboarding | `OWNER`, "does the flow exist?" | `BACKEND CONFIRMED`, ten steps, resume, progress |
| Employee roles | `OWNER`, "what roles exist?" | `BACKEND CONFIRMED`, four roles |
| Branding configuration | Category 3, unevidenced | `BACKEND CONFIRMED` + `WEBSITE INTEGRATION PENDING` |
| Entitlement enforcement | `OWNER`, "technical or manual?" | `BACKEND CONFIRMED` as technical |
| Plans and pricing mechanism | `BLOCKED`, no billing provider | `BACKEND CONFIRMED`; values served, never authored; publication still `OWNER DECISION PENDING` |
| Testimonial + 7 days | `LEGAL`, DISABLED | `BACKEND CONFIRMED` **and** `LEGAL REVIEW PENDING`, still DISABLED for public display |
| CRM vendor names | `REJECTED` | `OWNER DECISION PENDING` (text); logos remain `BLOCKED` |
| Nuova CRM as default | Unevidenced | `BACKEND CONFIRMED` |
| Agency website as property source | Category 2+3 | `BACKEND CONFIRMED`, explicitly first class |
| Paid acquisition connections | Owner brief only | `BACKEND CONFIRMED` (connection surfaces) |
| Property Experience entitlement | Category 2+3 | `BACKEND CONFIRMED` (entitlement and entry only) |
| Named portals | `REJECTED` | `REJECTED`, unchanged |
| Voice AI capability | Category 7 interim | Unchanged. Connection surface separately `BACKEND CONFIRMED` |
| Website voice / WhatsApp concierge | Undefined | `RESERVED` |
| Website chat assistant | `OWNER` | `RESERVED` |
| Demo booking backend | `LIVE` via Cal.com | Cal.com unchanged as an existing external option; `/demo/book` is `PROPOSED` |
| Hot lead alerting | Requested gap | `BLOCKED` on MF-02 |
| Every legal dependency L-01 … L-14 | `LEGAL` | Unchanged. C-22 enlarges L-14. |
| End to end verification, every surface | Never claimed | `END TO END VERIFICATION PENDING`, and currently unreachable per C-14 |

---

## Status

Reconciliation complete against the canonical handoff, four source of truth documents, four
implementation owned documents, `CLAUDE.md`, the build configuration, the App Router structure, the
existing routes and components, the environment variable surface, git status and the local branch
history.

No page implemented. No API built. No production flow changed. No backend, n8n, Supabase or Vercel
system accessed. Nothing pushed, merged or deployed. No history rewritten. No uncommitted owner change
overwritten. No secret value reproduced. No rotation performed. No production readiness claim made.

**Implemented and awaiting independent technical and final audit.**
