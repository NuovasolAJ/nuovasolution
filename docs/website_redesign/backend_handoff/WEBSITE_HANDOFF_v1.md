<!-- Copy of NuovaSolution-n8n-system governance/WEBSITE_HANDOFF_v1.md at commit 8a78304d376087ddb932d805eb2da6dd07219dc0 (2026-09-21 18:58 +0200), taken 2026-09-22 per dispatch PROMPT_09. The system repo stays authoritative. -->

# WEBSITE_HANDOFF_v1 â€” backend contracts for the website implementer

Version 1 Â· 2026-09-21 Â· owner of this document: API lane Â· state basis `2026-09-21_SYNC_1215Z`.
Consolidates the existing contracts; it invents nothing. Each row cites its source (G = `governance/`). Where a later
document supersedes an earlier one, only the later one is used.

## 0 Â· How to read the status column

The status was checked **live** on 2026-09-21 (prod RPC grants for `anon` / `authenticated` + edge function lists of both
projects), not taken from older documents.

| status | meaning |
|---|---|
| **available (prod)** | exists in prod and may be used by the website now |
| **available (staging)** | exists on staging only; build against staging, prod promotion pending |
| **draft** | contract written, no backend runtime; the website must not ship it as working |

**Live prod surface for the website (2026-09-21):**
- **JWT RPCs:** `session_actor`, `dg_assistant_viewing_me`, `dg_assistant_viewing_tasks`, `dg_assistant_claim_viewing`,
  `dg_assistant_complete_viewing`, `doc_access_open`.
- **Anon RPCs:** only `role_default_permissions`, plus pg_trgm internals that are irrelevant to the website.
- **Edge functions:** only `voice-gateway`, which is not for the website.
- Everything else below is staging or draft.
- The server layer ("BFF" = the website's own server endpoints, WX2 Â§0) **is not built**. Every `BFF â€¦` row is a contract
  for the website implementer to build: server-side, holding the service key, never exposing it to the browser.

**Base URLs:**
- prod `https://ckxqzfoukcacvqzpagcm.supabase.co`
- staging `https://fflmmzapksycjfdcjdtd.supabase.co`
- n8n `https://flows.nuovasolution.com` (never the retired Cloud host)

**Common error envelope for BFF endpoints** (G/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2.md Â§F):
`{ ok:false, code, message, details, request_id }`.

**Config names** (values only in the deploy secret store, never in code or git):

| name | where | use |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | browser | project base URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | browser | the **publishable** key (`sb_publishable_â€¦`) |
| `SUPABASE_SERVICE_ROLE_KEY` | server | the BFF only; must be the named secret key issued for the website (see Â§11) |
| `NUOVA_BFF_ALLOWED_ORIGIN` | server | CORS origin of the BFF |
| `NEXT_PUBLIC_CHECKOUT_PUBLIC_KEY`, `CHECKOUT_SECRET_KEY`, `CHECKOUT_WEBHOOK_SECRET` | browser / server / server | billing, draft (Â§10) |
| web Q&A HMAC secret | server | `tenant_verification_secrets` purpose `web_qa_hmac`, resolved server-side (Â§8) |

Supabase transport rule: an `sb_secret_` key goes in the `apikey` header only, never as a Bearer token. The user JWT goes in
`Authorization: Bearer`.

## 1 Â· Auth

| function | endpoint Â· method | auth | request â†’ response | errors | status | source |
|---|---|---|---|---|---|---|
| Accept invite / set password | GoTrue link â†’ 303 to `site_url` with `#access_tokenâ€¦&type=invite\|recovery`; then `PUT /auth/v1/user` | publishable key + Bearer (token from the fragment) | `{password}` â†’ 200 user | fragment `error_code` e.g. `otp_expired` â†’ show "link expired, ask for a new one" | **available (prod)**, owner used it 2026-09-20 | G/AUTH_INVITE_CALLBACK_CONTRACT_v1.md; G/API_INVITE_PATH_READY_2026-09-16_v1.md |
| Login | `POST /auth/v1/token?grant_type=password` | publishable key | `{email,password}` â†’ `{access_token, refresh_token, user}` | 400 `invalid_grant`, `email_not_confirmed` | **available (prod)** | WX2 Â§F |
| Who am I / tenant / role | `POST /rest/v1/rpc/session_actor` (no args) | publishable key + user JWT | â†’ `{authorized, user_id, client_id, employee_id, office_id, role, scope, visible_employee_count}` | `authorized:false` + `reason` âˆˆ `no_session`, `no_subject`, `unresolved_membership` | **available (prod)**; owner membership provisioned 2026-09-21 | G/API_OWNER_BOOTSTRAP_PROD_2026-09-21_v1.md; G/CLOSEOUT_T1_T4_v1.md |
| Role defaults (display only) | `POST /rest/v1/rpc/role_default_permissions` `{p_role}` | publishable key | â†’ permission object | â€” | **available (prod)** | live grant |
| Team invite | `BFF POST /team/invite` â†’ `employee_onboard` â†’ `user_provision` â†’ `user_bind_auth` | user JWT with `manage_users` | `{name,email,role,office_id?}` â†’ `{ok,status:"invited"}` | `forbidden`, `employee_cross_tenant`, `office_out_of_scope`, `invalid_role`, `conflict` | functions **available (staging)**; BFF **draft** | WX2 Â§F, App. A |
| Self-signup | `BFF POST /signup` | public + captcha | `{name,email,password,language,agency_name}` â†’ `{ok,next:"onboarding"}` | 409 `email_exists`, `invalid_input`, `captcha_failed`, `rate_limited` | **draft** | WX2 Â§F; G/WEBSITE_INTEGRATION_HANDOFF_v1.md Â§4.1 |

Limits and settings:
- Auth `site_url` is currently `http://localhost:3000`, with an empty redirect allow-list and 60-minute links. A website
  domain needs an allow-list entry, which is an API change on request (the owner does not change auth settings).
- There is no "request password reset" contract yet; the page only handles an incoming `type=recovery` link.
- Never render or log tokens.

## 2 Â· Onboarding / readiness

| function | endpoint | auth | request â†’ response | errors | status | source |
|---|---|---|---|---|---|---|
| Wizard state | `BFF GET /onboarding/state` â†’ `onboarding_wizard_state(p_client_id)` | user JWT â†’ service | â†’ `{client_id, exists, agency_name, plan, trial_end, resume_step, completed_steps, total_steps:10, needs_action_steps, percent_complete, activatable, legend, steps[{step,key,title,status,classification,locked,â€¦}]}` | `no_session` | **available (staging)** | G/ONBOARDING_FORM_FINAL_v1.md; WX2 Â§G |
| Save progress | `BFF POST /onboarding/touch` â†’ `onboarding_wizard_touch(subject,step,action)` | user JWT with `manage_users` | `{step, action: visit\|skip}` â†’ `{ok, resume_step, percent_complete}` | `forbidden`, `invalid_wizard_action` | **available (staging)** | WX2 Â§F |
| Readiness | `tenant_activation_readiness(p_client_id)` | service (via BFF) | â†’ `{activatable, blocked_mandatory[], blocked_features[]}` over 25 gates | â€” | **available (staging)** | G/ONBOARDING_FORM_FINAL_v1.md |
| Section config write | `agency_*_set(...)` / read `agency_onboarding_resolved()` | service (via BFF) | 7 sections (business, calendar policy, branding, â€¦) | empty or internal tenant refused | **available (staging)** | G/AGENCY_ONBOARDING_CONFIG_CONTRACT_v1.md; G/AGENCY_ONBOARDING_FULL_CONTRACT_v1.md |

Form fields are steps 1â€“10 of G/ONBOARDING_FORM_FINAL_v1.md: `contact_email`, `name`, `timezone`, `language`,
`legal_name`, `tax_id`, `address_*`, `logo_url`, `privacy_url`, `terms_url`, â€¦

Mandatory gates:
- `agency_tenant`, `owner_admin`, `staff_provisioned`, `plan_entitlements`, `white_label_legal`, `whatsapp`
- `ai_disclosure`, `business_hours`, `routing_mode`, `test_scenarios`, `launch_approval`

Not for the website: the edge function `onboarding_session_manager` (staging) is the older n8n-wizard session store.

Open points:
- Plan names differ: the wizard uses trial/starter/professional/enterprise, billing uses essential/growth/scale.
  Show neither until Billing decides.
- The `ai_disclosure` gate is open (Â§7).

## 3 Â· CRM catalog and "Kein externes CRM"

| function | endpoint | auth | request â†’ response | status | source |
|---|---|---|---|---|---|
| Catalog | `crm_provider_catalog()` (via BFF) | service | options with `availability` âˆˆ `available`, `coming_soon`, `unavailable` | **available (staging)** | G/CRM_ONBOARDING_DROPDOWN_CONTRACT_v1.md Â§1 |
| Select | `onboarding_crm_select(p_actor_subject, p_provider)` | actor from the JWT (via BFF) | built-in â†’ `crm_mode='nuovasolution'`; Google Sheets â†’ `sheets_projection=true`; `coming_soon` â†’ interest recorded (`crm_interest`, `crm_interest_at`), **no sync** | **available (staging)** | same Â§1, Â§3 |
| Default | `onboarding_crm_ensure_native_default(p_client_id)` | service | built-in CRM set if none | **available (staging)** | same |
| Status / health | `BFF GET /crm/status`, `GET /crm/health` | user JWT | status `connected\|pending\|error\|degraded` | **draft** | WX2 Â§F |

Catalog as of 09-15, which supersedes WX2 App. A:

| provider | state |
|---|---|
| **Nuova CRM (built-in, default)** â€” "Kein externes CRM" is a valid choice, not an error state | available |
| Google Sheets | available |
| HubSpot, Pipedrive, Zoho CRM, Salesforce | `coming_soon` â€” the UI must not offer a connect button |
| GoHighLevel, Microsoft Dynamics | `unavailable` |

The five distinct UI states are in DROPDOWN Â§4. The ES/DE explanation text is waiting on counsel.

## 4 Â· OAuth connect (CRM, calendar)

| function | endpoint | auth | contract | status | source |
|---|---|---|---|---|---|
| Start | `BFF POST /connect/{provider}/start` â†’ `{authorize_url}` | user JWT | provider âˆˆ catalog `available` only | **draft** | WX2 Â§D |
| Return to website | redirect to `{FRONTEND}/{locale}/connect/callback?provider&status=success\|error&correlation&reason` | â€” | `reason` âˆˆ `user_cancelled` (OAuth `access_denied`), `provider_error` (everything else, fail-safe) | **draft** | WX2 Â§D; AF-01 |
| Status | `BFF GET /connect/{provider}/status` | user JWT | `connected\|pending\|error\|locked_by_plan`; `externally_pending` 202 | **draft** | WX2 Â§D |
| CRM signed entry link | n8n `GET /webhook/crm-auth?token=&client_id=` â†’ `consume_crm_auth_invitation` | single-use token (â‰¥32 chars, 10 min) | every failure â†’ 401 `{"error":"unauthorized"}` | inactive build, staging-tested | G/CRM_BROWSER_ENTRY_TWO_ARG_HANDOFF_v2.md |
| Nonce | `oauth_state_pending` / `consume_oauth_nonce(p_nonce,p_client_id)` | service | success = exactly one row | **available (staging)** | G/CRM_NONCE_RETURN_CONTRACT_CORRECTION_v1.md |
| Calendar code exchange | edge function `calendar_token_exchange` | broker secret (server only) | `{nonce, code}` â†’ receipt, never tokens; errors `broker_auth_failed` 401, `nonce_invalid` 401, `missing_required_field`, `provider_credentials_not_found` 404 | **available (staging)** | G/CALENDAR_PROVIDER_EDGE_FUNCTION_SPECS_v2.md |

Provider secrets are server-only config names:
- `CRM_{HUBSPOT,PIPEDRIVE,ZOHO,SALESFORCE}_CLIENT_ID/_SECRET`
- `PROVIDER_CALENDAR_CLIENT_ID/_SECRET`
- `CALENDAR_BROKER_SHARED_SECRET`
- `ALLOW_ENDPOINT_OVERRIDE` must be absent in prod.

Not defined yet: the stored "cancelled" state (AF-01), and the "expired" and "wrong account" codes.

## 5 Â· Branding

| function | endpoint | auth | request â†’ response | errors | status | source |
|---|---|---|---|---|---|---|
| Upload start | `BFF POST /branding/upload-init` â†’ `branding_asset_upload_init` | user JWT with `manage_users` | `{kind: logo\|email_banner, filename, content_type, size_bytes}` â†’ `{object_path, signed_upload_url}` | `unsupported_file_type`, `file_too_large`, `invalid_asset_kind`, `forbidden` | **available (staging)** | G/WEBSITE_INTEGRATION_HANDOFF_v1.md Â§4.5 |
| Commit | `BFF POST /branding/commit` | user JWT | `{kind, object_path}` â†’ `{ok, kind, stored_url, preview}` | `cross_tenant_asset`, `upload_not_found` | **available (staging)** | AF-07 |
| Preview / remove | `BFF GET /branding/preview`, `POST /branding/remove` | user JWT | â†’ `{logo, logo_present, email_banner, email_banner_present, fallback_note}` | `forbidden` | **available (staging)** | AF-07 |
| Resolved branding | `agency_branding_resolved()`, `email_branding_resolved(client, employee?, email_type, locale)` | service | layouts `logo_only\|compact\|banner_signature\|legal_only`; `legal_footer`, `footer_by_locale`, `powered_by_nuovasolution` | missing asset is left out | **available (staging)** | G/AGENCY_ONBOARDING_FULL_CONTRACT_v1.md Â§C |

Limits: png, jpeg, webp or gif; max 5 MB; bucket `agency-branding`. Prod has the bucket and one logo.

Open (A7):
- a light/dark logo variant or a "needs light background" flag
- localized signature and role fields (prod `agency_email_branding` signature, footer and locale are empty)

The website must render a text fallback (the agency name) when no logo is present.

## 6 Â· Calendar, booking mode, business hours

| function | endpoint | auth | contract | status | source |
|---|---|---|---|---|---|
| Hours / languages / timezone | `agency_business_config_set` (offices, service_areas, business_hours, timezone, languages, default_language) | service via BFF | read via `agency_onboarding_resolved()` | **available (staging)** | G/AGENCY_ONBOARDING_CONFIG_CONTRACT_v1.md |
| Booking policy | `agency_calendar_policy_set` (booking_policy, qualification_requirements, appointment_types[{type,minutes}], no_calendar_fallback) | service via BFF | same | **available (staging)** | same |
| Booking decision | `runtime_calendar_booking_guard(client_id, qualification, requested_time)` | service | â†’ `qualify_first\|decline_low_value\|callback_fallback\|offer_next_available\|proceed_to_book` | **available (staging)**, prod absent | G/BOOKING_T6_CLOSEOUT_v1.md |
| Calendar connected? | `calendar_is_connected(client)` (`status` column is the authority) | service | bool | **available (staging)** | same |

Connectable calendars: `google_calendar`, `microsoft_outlook` (AF-04).

**Booking modes A/B/C/D are not defined anywhere** (`BOOKING_MODE_DEFINITION_MISSING`). The website must not offer a
mode selector until the owner decides. There is no website endpoint for hours or policy (build them in the BFF over the
functions above).

## 7 Â· Human handoff and AI disclosure

| function | endpoint | auth | contract | status | source |
|---|---|---|---|---|---|
| Handover + task (backend) | `handover_with_task({client_id, match_key, conversation_id, provider_message_id, â€¦})` | service | â†’ `{outcome: created\|duplicate, task_id, token, idempotency_key}`; `duplicate` = success | **available (prod)**, internal only | G/ATOMIC_HANDOVER_CONTRACT_v1.md |
| Agent take/release link | n8n `/webhook/handover-control?t=&a=take\|release\|status&h=1..168` | per-lead token | HTML page; `invalid_token`, `unknown_action`, `expired_token` | workflow **inactive** (links 404) | G/PROD_HASH_REGISTER_v1.md |
| Viewing tasks (staff) | `rpc/dg_assistant_viewing_me`, `dg_assistant_viewing_tasks(p_scope,p_limit)`, `dg_assistant_claim_viewing(p_task_id)`, `dg_assistant_complete_viewing(p_task_id,p_note)` | user JWT | tenant from the verified session | **available (prod)**, but the internal tenant is refused until Daily fixes `DEF-DG-BIND-INTERNAL-1` | G/API_OWNER_BOOTSTRAP_PROD_2026-09-21_v1.md |

**AI disclosure:**
- The notice table `ai_disclosure_notices` **does not exist in prod** (F3, A7).
- The website must not claim that a disclosure is shown.
- The notice text is counsel-owned.

## 8 Â· Website Q&A (visitor question â†’ answer)

| function | endpoint | auth | request â†’ response | errors | status | source |
|---|---|---|---|---|---|---|
| Ask | n8n `POST /webhook/website-qa` | server-side HMAC: headers `X-Nuova-Tenant`, `X-Nuova-Timestamp` (Â±300 s), `X-Nuova-Nonce`, `X-Nuova-Signature` = hex HMAC-SHA256(secret, `ts\|nonce\|sha256(body)`) | body â‰¤ 64 KiB: `question` (â‰¤ 4000), `session_id`, optional `message_id`, `name`, `email`, `phone`, `page_url`, `locale` â†’ 202 `{accepted, conversation_id:"web::â€¦", message_id}` | 401 `{error:"unauthorized"}` | **available (staging)** | G/WEBSITE_QA_INGRESS_CONTRACT_v1.md |
| Poll answer | n8n `GET /webhook/website-qa/result?conversation_id&message_id` | same headers; signature over the query; fresh nonce per poll; poll up to 60 s | `answered` (text, language), `pending` (`retry_after_ms` 1500), `handoff`, `failed` | 401; 404 `unknown` | **available (staging)**, the answer step is still simulated | G/WEBSITE_QA_RESPONSE_CONTRACT_v1.md |

The signing happens in the BFF only; the browser never sees the secret. There is no agency FAQ/knowledge endpoint.

## 9 Â· DSAR, unsubscribe

| function | endpoint | auth | contract | status | source |
|---|---|---|---|---|---|
| Unsubscribe (RFC 8058) | edge function `email-unsubscribe?t=` â†’ `email_unsubscribe_apply` | public; HMAC token, 180 days | POST â†’ `{ok, status:"unsubscribed"\|reason}`; GET â†’ HTML | **available (staging)** | build/email/edge_email_unsubscribe.ts |
| Access / erasure request intake | â€” | â€” | **no website intake endpoint exists**; backend machinery `erasure_request`, `del1_*` is staging-only, prod erasure not certified | **draft** | G/DEL1_STAGING_CLOSEOUT_EXECUTION_EVIDENCE_v1.md |

Until an intake endpoint exists, the website shows the agency's privacy contact address (from `privacy_url` / legal
fields) instead of a form that claims processing.

## 10 Â· Trial, billing, entitlements

| function | endpoint | auth | contract | errors | status | source |
|---|---|---|---|---|---|---|
| Trial status | `BFF GET /trial/status` â†’ `trial_status(client_id)` | user JWT | â†’ `{status, conversion_state, remaining_days, expires_at, extension_count, plan_code}` | `no_session` | **available (staging)** | docs/PRODUCT_MANUAL/BILLING_TRIAL_LIFECYCLE_CONTRACT_v1.md Â§1 |
| Testimonial for +7 days | `BFF POST /trial/testimonial` â†’ `trial_testimonial_submit(...)` | user JWT | `{submission_id, media_ref, feedback_consent, public_use_consent}` â†’ `{submitted, status:'pending_review', publishable}` | `submission_already_pending`, `extension_already_granted`, `submission_id_required`, `consent_required` | **available (staging)** | same |
| Conversion options | `trial_conversion_options`, `trial_convert(client_id, plan_code)` | user JWT | `auto_charge:false`, no prices | `PLAN_NOT_CONFIGURED` | **available (staging)** | same |
| Entitlements | `BFF GET /entitlements` â†’ `resolve_entitlements` | user JWT | â†’ `{features:{â€¦: enabled\|deferred\|denied}, account_state}` | `no_session` | **available (staging)** | WX2 App. A |
| Checkout | `BFF POST /checkout/session` | user JWT | `{plan_code}` â†’ `{checkout_url}` | `not_allowed`, `already_subscribed` | **draft**, no payment provider integrated (A6) | WX2 Â§F |

Trial rules: 14 days, no card; reminders 3 days and 1 day before; +7 days once (owner-approved).

There is **no price or currency authority**. The website must not print prices, and a provider test mode is never
presented as a live payment.

## 11 Â· Keys the website may use

- **Browser:** the prod **publishable** key only.
- **BFF:** its own named secret key (`sb_secret_â€¦`), issued for the website and mapped to the website deployment in the
  protected key register. It is never the legacy `service_role` JWT, and never the `default` secret key (scheduled for
  revocation after the consumer inventory, A9).
- The key identity the website actually deploys must be reported to API as its label (not the value), so the mapping can
  be proven.

## 12 Â· Scope of `WEBSITE_HANDOFF_READY`

**Covered by `WEBSITE_HANDOFF_READY = YES`:** the contracts of Â§1â€“Â§11, each with its true status.
- Usable against **prod now**: Â§1 invite/login/`session_actor`/`role_default_permissions`, and Â§7 viewing RPCs (after
  `DEF-DG-BIND-INTERNAL-1`).
- Usable against **staging now**: every "available (staging)" row.

**Not covered:** any "draft" row (signup, OAuth BFF, CRM status, checkout, DSAR intake), booking modes, and AI disclosure.
The website may lay them out but must not present them as working.

Next versions:
- v2 after A6 (billing test mode), A7 (branding variants, disclosure read path) and the prod promotion of onboarding.
- Changes are appended as a version table here; nothing is edited silently.
