# WEBSITE — SYNC_0921 RETURN v1 (implementer)

**State:** `2026-09-21_SYNC_1215Z` · **Lane:** Website implementer (sole writer of website code)
**Branch:** `website_enterprise_redesign` · **Start:** `f4416fe` · **Code commits:** `0405129`, `2089094` · **Checked commit:** `2089094`
**Never pushed. No deployment. No production contact. No staging write.**

> Nothing here is production ready. Local evidence is local evidence: it proves website behaviour against
> stubs and a local contract mock, not staging, not a provider, not production. Completion wording for
> everything below: implemented and awaiting independent technical and final audit.

---

## 1. Signals

```
WEBSITE_SYNC_0921                    = PARTIAL (W1, W2 CRM + Q&A website side, review fixes, claim corrections done; W3 to W5 blocked)
WEBSITE_MODE_GATE                    = IMPLEMENTED · local proof 9/9 at 2089094 (evidence_2026-09-21/mode-gate-results.json)
WEBSITE_LOCAL_E2E                    = 32/32 at 2089094 · stub build + local Q&A contract mock (evidence_2026-09-21/e2e-results.json)
WEBSITE_STAGING_E2E                  = NOT RUN · blocked on API-W1 (staging publishable key) + API-W2 (test agency identity) + WEBSITE_HANDOFF_v1
WEBSITE_CLAIM_CORRECTIONS_APPLIED    = 0405129 (WEBSITE_CLAIM_REGISTER_v1 §2; one deliberate deviation, §3.4)
WEBSITE_REVIEW_FINDINGS_ADDRESSED    = WR-02 WR-04 WR-05 WR-06 WR-07 WR-08(website side) WR-09 WR-10 WR-11 WR-12 WR-14 WR-15 WR-16 WR-17 WR-19 WR-21 WR-22 WR-25 WR-28 · awaiting re-review on 2089094
WEBSITE_HANDOFF_READY                = NOT RECEIVED (governance/WEBSITE_HANDOFF_v1.md does not exist)
CUSTOMER_REGISTRATION                = BLOCKED (signup provisioning contract)
BRANDING_TO_MAIL                     = BLOCKED (upload contract executable only via service role; mail render is Hosting)
QA_REAL_ANSWER                       = BLOCKED (no staging intake reachable from a website server; D3 web responder not built)
TRIAL_BILLING_TEST_PATH              = BLOCKED (no trial read, no checkout contract in a delivered document)
DSAR                                 = PAGE TEXT ONLY (C2 §6.2, counsel pending); no request, verification or status flow (no contract)
PUSH_OR_PREVIEW                      = NOT DONE (owner decision, §5)
```

## 2. Chains × seven stages

Stages: **1** implemented · **2** internally checked · **3** integrated in staging · **4** real provider transport ·
**5** available in prod · **6** visibly tested by the owner · **7** independently accepted.

| Chain | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| Mode gate stub / sandbox / live | YES | YES, local 9/9 | NO (no website call to staging made) | n/a | NO | NO | NO |
| CRM choice incl. "no external CRM" | YES | YES, stub E2E + catalog shape read from staging | PARTIAL: catalog shape read by a read-only probe, not through a website session; select not executed | n/a | NO (prod has none of the functions) | NO | NO |
| External CRM connect / return | Return page only (never shows success from the URL) | YES | NO | NO | NO | NO | NO |
| Q&A | YES (accept then poll, per both contracts) | YES, local contract mock: signature, freshness, nonce, session_id, only contract fields, pending then answered | NO (intake loopback only on the box) | NO (D3 web responder not built) | NO | NO | NO |
| Customer registration (signup, auth, tenant, roles) | UI + stub; sandbox answers `awaiting_contract` | YES (stub) | NO | NO | NO | NO | NO |
| Onboarding form and readiness | Status projection, CRM step, readiness labels; no field writes | YES (stub) | PARTIAL: real projection shape read from staging (read-only probe) | n/a | NO | NO | NO |
| Branding to mail | NO | NO | NO | NO | NO | NO | NO |
| Trial / billing test path | Status display only | stub | NO | NO | NO | NO | NO |
| DSAR | Page text (counsel pending) | n/a | NO | NO | NO | NO | NO |

## 3. Evidence

### 3.1 Commits and checks

| What | Result | Where |
|---|---|---|
| Baseline on the new machine at `f4416fe` | `tsc` 0, `next lint` 0, `next build` 0, 12:50Z | this session |
| `0405129` | 48 files: mode gate, server boundary, CRM, Q&A, review fixes, claim corrections, local E2E suite | git |
| `2089094` | CRM line layout fix, mode-gate check script | git |
| Secret scan over every committed file | 0 secret-shaped values; 0 exact matches against every value in the secret store. Intended pattern hits only: the retired-host denylist in `lib/contracts/mode.ts` (a guard) and the contract path in the local mock | pre-commit, this session |
| Mode gate at `2089094` | 9/9: live build refused without release value; sandbox refuses unapproved, non-pinned or missing targets and a production Q&A host before any call; sandbox marking on every page; no stub session and no fake signup in sandbox | `evidence_2026-09-21/mode-gate-results.json` |
| Local E2E at `2089094` | 32/32 (list below) | `evidence_2026-09-21/e2e-results.json`, `qa-mock.log`, 5 screenshots |

E2E checks: WR-05 a/b/c open redirect and legit locale path · WR-09 a/b/c forged success, neutral cancel, provider name never
echoed · WR-12 refresh cookie cleared on its path · WR-19 cross-origin login refused · W2-01..06 catalog, selectability, interest
rules, session required · WR-21 sitemap · QA-01 length limit · WR-06 no stub session or account with `VERCEL_ENV=production` ·
B1 h1, CRM choice, stub band · WR-11 no raw backend key · WR-22 no percentage · 390 px no overflow · W2-07 saved choice survives
reload · W2-08 interest only · WR-17 a/b focus in and back · WR-07/08 accept, poll, answer · B5 Spanish step titles · WR-15
360 px · WR-04 no forbidden claim on ten pages EN and ES · QA-02/03 every call passed the contract mock.

Reproduce: `npm run build` then `npm run test:e2e`; `node scripts/e2e/mode-gate-check.mjs` (leaves a sandbox build; rebuild after).

### 3.2 Read-only staging probes (the only staging contact this session)

Target: staging Supabase project `fflmmzapksycjfdcjdtd`, secret key from the secret store, never printed. Reads only; no row
written. Write functions were never executed: their signatures were learned from deliberately non-matching parameter names,
which PostgREST rejects before execution.

| UTC | Call | Result used for |
|---|---|---|
| 12:49:30Z | `crm_provider_catalog()` | Exact entry shape; 9 entries incl. Airtable (the contract text lists 8) |
| 12:49:59Z | `onboarding_wizard_state('stg_pm_nerjamar')` | Real projection shape incl. fields absent from export v2 (branding `disclosures` with `body_es`, `paid.scope`, PX `tours`) |
| 12:54:49Z to 12:55:11Z | `session_actor_for` signature and refusal shape | `p_verified_subject`; `{authorized:false, reason:"unresolved_membership"}` |
| ~12:56Z | `resolve_entitlements`, `tenant_activation_readiness`, `onboarding_required_legal_fields` for `stg_pm_nerjamar` | Shapes; readiness gate keys for the label map |
| ~12:56Z | signatures only: `onboarding_crm_select(p_actor_subject, p_provider)`, `tenant_activate(p_client_id)`; `onboarding_wizard_touch` not discoverable | Which calls can be wired now |

### 3.3 What changed in the site

- **W1** `lib/contracts/mode.ts`, `next.config.js`, `lib/contracts/supabase.ts`: one build-time mode; sandbox pinned to one
  project ref plus an approval variable; server-side session verification and tenant resolution; the dead `NUOVA_API_BASE`
  proxy removed; uncontracted calls answer `awaiting_contract`, never a fake success. Marking per C2 §7.
- **W2 CRM** `app/api/bff/crm/*`, `components/site/crm-choice.tsx`: catalog-driven, texts C2 §1.2.
- **W2 Q&A** `lib/contracts/qa.ts`, `app/api/qa/*`, `components/site/qa-widget.tsx`: contract transport; texts C2 §5.
- **Readiness** gate keys only through the C2 §4.1 label map; unknown keys render nothing; `ai_disclosure` pending line.
- **Claims** `WEBSITE_CLAIM_REGISTER_v1` §2 applied in `capabilities.ts`, `statuses.ts`, dictionaries, `legal.ts`,
  `media-manifest.ts`; DSAR page per C2 §6.2; operating map marks steps being built.

### 3.4 Deliberate deviations, for the reviewer

1. **WCR-021/WCR-065** keep "hot lead alerts, being built" (ES "lead caliente"). Not applied: `CLAIMS_MATRIX` D-10 forbids every
   wording and export v2 puts the surface out of scope; the copy master bans "lead caliente". The point is removed everywhere.
2. **D1** is an open owner decision. The register's recommendation was applied (14 days, extension not published) because the
   rank-2 authority forbids the published wording. The owner can reverse it (§5, D1).
3. **External CRM vendor names** render as text inside onboarding (export v2 §A9 permits text-only there). Public naming stays
   with owner decision D2.

## 4. Open items, next actor, closing signal

| # | Open | Next actor | Closing signal |
|---|---|---|---|
| API-W1 | Staging **publishable** key for the website server (public by design; needed for password grant and session verification) | API | value placed in the website's staging environment by the owner or API, name `SUPABASE_ANON_KEY` |
| API-W2 | A staging **test agency** with one owner-level identity (email, password set, membership bootstrapped) and the agreed cleanup rule | API | `WEBSITE_TEST_AGENCY_READY` with client_id and cleanup rule, no password in chat |
| API-W3 | `WEBSITE_HANDOFF_v1.md`: signup provisioning path, owner bootstrap, invite callback for customers, trial read, entitlements, touch signature, activation response | API | `WEBSITE_HANDOFF_READY` |
| API-W4 | A read of the current CRM choice (`crm_mode`, Sheets projection, recorded interest) for the actor's tenant. Today a Sheets choice cannot be read back | API | RPC name and shape |
| API-W5 | Response shapes of `onboarding_crm_select` and `session_actor_for` when authorized (field names for tenant and role) | API | shapes in the handoff |
| API-W6 | Write contracts for steps 2 to 4 (agency name, timezone, language; legal identity fields; team invite) | API | contract lines |
| API-W7 | Branding: executable upload path for the website server, dark/light variants or "needs light background", text fallback (C2 Q-API-4), and the mail render handoff | API → Hosting | `BRANDING_UPLOAD_CONTRACT_READY`, then Hosting `BRANDING_MAIL_RENDER_READY` |
| API-W8 | OAuth outcome codes for expired, wrong account, access denied (C2 Q-API-2, Q-API-3) | API | codes in the handoff |
| API-W9 | DSAR intake, verification and status contract (C2 Q-API-10) | API | contract |
| API-W10 | Trial and billing test-mode path: trial status read, checkout in provider test mode, clearly separate from real payment | API | contract with test-mode marker |
| H-W1 | A staging Q&A intake URL reachable from a website server (today loopback on the box only) and D3 web responder | Hosting | `WEBSITE_QA_E2E_STAGING_PROVEN` preconditions met |
| R-W1 | Re-review of `2089094` against WR-01 to WR-28 | Reviewer | `WEBSITE_INDEPENDENT_ACCEPTANCE` for the named scope |
| C-W1 | Counsel: Q&A storage line (C-Q7), DSAR page (C-Q1), connect notice | Counsel | cleared wording |

**Still open from the review and not fixable by the website alone:** WR-01 (onboarding writes need API-W6), WR-03 (the live
public site is the old site: owner), WR-13 (API contract gaps), WR-18 touch targets in header and footer (P2, next pass),
WR-20 CSP `unsafe-inline` (P2), WR-23 in-memory rate limit (documented), WR-27 HSTS preload (owner).

## 5. Owner decisions, prepared (three)

1. **D1, trial extension wording.** *Recommendation: keep what is now implemented* ("Try free for 14 days. No payment method
   required."), publish the extension only when counsel clears L-13 and the video pipeline exists. One line: "D1 = keep" or
   "D1 = publish extension with risk acceptance".
2. **Push the branch to the private GitHub remote as a backup, and allow one Vercel preview in stub mode.** Every commit exists
   only on this machine today. The secret scan above found no secret value in any committed file. *Recommendation: yes*, preview
   in stub mode only, with `NUOVA_INTEGRATION_MODE` unset. One line: "Push + stub preview = yes".
3. **D2, CRM vendor names on public pages as plain text.** *Recommendation: yes*, with the register's "not offered yet" wording;
   logos stay excluded.

Not a new decision, recorded for the production package: `MASTER_GOVERNANCE.md` §14.5.2 forbids every production call. The
production release will need the owner to amend that clause for the website's own server boundary. Prepared, not asked now.

## 6. What the owner can test, and when

**Now, locally, no accounts, nothing leaves the machine** (in `C:\Users\Usuario\Desktop\Nuovasolution`):

```
npm run build
npm run start -- -p 3005
```

| Open | Do | Expect |
|---|---|---|
| `http://localhost:3005/api/bff/auth/login?stub=1&case=3&next=/en/onboarding` | look at step 7 | Band "Demonstration only"; "Where your leads are kept"; two choices; HubSpot, Pipedrive, Zoho CRM, Salesforce as "Coming soon"; GoHighLevel, Microsoft Dynamics, Airtable as not offered |
| same page | choose Google Sheets, Save, then reload | "Saved" line; after reload the Sheets choice is still selected |
| same page | "I use HubSpot" | "Noted. We will tell you when HubSpot can be connected." |
| `/es/onboarding` | read the step list | Spanish step titles, no raw keys such as `white_label_legal` |
| `/en` | Ask a question | Stub: "We cannot confirm that from here. A person can." with a contact path |

Evidence to send back: nothing needed; the automated run already records it. Optional: a screenshot of step 7.

**After API-W1 + API-W2 + WEBSITE_HANDOFF_v1:** a sandbox run against staging with the test agency (start command, login,
CRM choice, reload, readiness), with API supplying the matching database reads. That becomes `WEBSITE_STAGING_E2E` for a named
commit, then the reviewer's acceptance.

## 7. Path to publication (W7)

| Step | Owner of the step | Closing signal |
|---|---|---|
| 1 Contracts and test agency | API | `WEBSITE_HANDOFF_READY`, `WEBSITE_TEST_AGENCY_READY` |
| 2 Sandbox E2E on a named commit | Implementer | `WEBSITE_STAGING_E2E = PASS` with SHA |
| 3 Independent acceptance | Reviewer | `WEBSITE_INDEPENDENT_ACCEPTANCE = PASS` |
| 4 Owner walkthrough on the preview | Owner | one line per chain |
| 5 Counsel texts and legal routes | Counsel, owner | cleared texts, `NEXT_PUBLIC_LEGAL_LINKS=approved` |
| 6 Preview deploy (staging values only) | Owner approves, implementer deploys | preview URL |
| 7 Production deploy | Owner: release value `NUOVA_LIVE_RELEASE`, §14.5.2 amendment, production env names in Vercel | production deployment id recorded |
| Rollback | Owner | Vercel instant rollback to the previous production deployment, whose id must be recorded before step 7 (today unknown, reviewer §5) |
