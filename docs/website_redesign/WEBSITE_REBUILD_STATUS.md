# WEBSITE REBUILD STATUS

**Canonical state:** `2026-09-08_CLOSEOUT_1220Z` (WEBSITE FULL REBUILD)
**Branch:** `website_enterprise_redesign`
**Starting snapshot:** `be31b177…` (verified as HEAD before work began)
**Mode:** local rebuild against clearly labelled contract stubs. No staging call. No production call.
**Reporting rule:** website progress only; product status is the owner's canonical audit and is
carried as data in `lib/content/capabilities.ts`. Percentages only where evidenced.

> **Implemented and awaiting independent technical and final audit.** Nothing here is production
> ready. End-to-end verification against staging has not happened and cannot happen before
> `governance/WEBSITE_HANDOFF_v1.md` is delivered and the independent website review has passed.

---

## 0. WEBSITE_SUPABASE_CONSUMERS: NONE

Scanned all source (`app/`, `components/`, `lib/`, `translations/`, `public/`), `next.config.js`,
`tailwind.config.ts`, `package.json`, the legacy static site, `.vercel/` (repo link only) and the
MCP config before the rebuild began. No Supabase SDK, no `process.env` read of any kind, no `.env*`
file, no `vercel.json`, no `NEXT_PUBLIC_*` variable. The pre-rebuild site made zero backend calls.

Caveat: environment variables set directly in the Vercel dashboard are remote and not visible from
the repository. If any exist there, no code consumed them.

**After the rebuild (verified 2026-09-09, sync `2026-09-09_SYNC_1310Z`):**

| Consumer | Variable names | Runtime | Status |
|---|---|---|---|
| `app/api/bff/auth/login/route.ts` | `SUPABASE_URL`, `SUPABASE_ANON_KEY` | server only | dormant: read only when staging mode is explicitly acknowledged |
| `app/api/bff/auth/logout/route.ts` | `SUPABASE_URL`, `SUPABASE_ANON_KEY` | server only | dormant, same gate |
| `lib/contracts/bff.ts`, `lib/contracts/server.ts` | `SUPABASE_ANON_KEY` as the `apikey` header on BFF proxy calls | server only | dormant, same gate |
| `.env.example` | `SUPABASE_SERVICE_ROLE_KEY` | declared name only | **not read by any code** |
| Browser bundle, `NEXT_PUBLIC_*` | none | — | no Supabase value ever reaches the browser |
| Deployment (`vercel.json`, committed env) | none | — | Vercel dashboard values are not visible from the repository |

**Old-key status:** the website has never consumed any Supabase key. The previous site made no
backend calls; the rebuilt site reads no key in its default stub mode and no staging value is set
anywhere. **Legacy-key disablement has zero impact on the website.** When staging is released the
website consumes only the new anon key under the names above. This is the migration confirmation
API/CRM requested.

---

## 1. Commit refs

| Ref | Content |
|---|---|
| `550cf73` | hygiene: untrack `.next/`, `tsconfig.tsbuildinfo`, `.mcp.json`, `.claude/settings.local.json`; remove legacy static site and dead components; archive the owner's untracked `/v2` concept to `_archive/` (ignored, byte-for-byte, not deleted) |
| *(this commit)* | rebuild: foundation, `/en` and `/es` routes, content registry with canonical statuses, all pages, contract stubs, BFF routes, Q&A widget with the HMAC signing path, capture harness, review fixes, the 2026-09-09 sync corrections, this document |

---

## 2. Page inventory

Every route exists in both locales under `/en` and `/es` (separate locale routes, export v2 §A8).
Status vocabulary: `BUILT` = renders locally against stubs, typed, linted; `STUB` = the surface is
driven by a labelled local stub of the contract; `PLACEHOLDER` = content clearly labelled as not
final.

| Route | Page | Status | Notes |
|---|---|---|---|
| `/[locale]` | Home | BUILT | Twelve-movement composition per LUXURY §9.2: opening, orientation rail, the gap, sixty-seconds film slot, operating picture, three chapters, context band (ivory), assistant, both-halves register, access, closing |
| `/[locale]/platform` | Platform overview | BUILT | Capability index with canonical status per row; tenant environment statement |
| `/[locale]/platform/ai-sales-agent` | AI Sales Agent | BUILT | Gmail and WhatsApp text: live for a first tenant. Attachments, WhatsApp media, Outlook: in implementation, stated as not offered |
| `/[locale]/platform/lead-intelligence` | Lead Intelligence | BUILT | One identity, qualification, hot lead alerts: live |
| `/[locale]/platform/crm` | Universal CRM | BUILT | Native CRM plus Google Sheets: live. External CRMs: certified internally, consent pending, text-only names |
| `/[locale]/platform/property-matching` | Property Matching | BUILT | Live with honest availability. Viewing request into staff tasks: built, final acceptance pending, not presented as usable |
| `/[locale]/platform/daily-assistant` | Daily Assistant | BUILT | Daily Goals plus assistant: built, final owner test pending, not presented as usable. Employee assistant: not presented |
| `/[locale]/platform/voice` | Voice | BUILT | Both halves: nine languages certified internally; legal disclosure and provider gates pending. No carrier name anywhere |
| `/[locale]/platform/social-growth` | Social Growth | BUILT | Both halves: sixteen of twenty built; Meta review pending. TikTok and Facebook Groups API: not available |
| `/[locale]/platform/lead-acquisition` | Lead Acquisition | BUILT | Meta Lead Ads and Google Lead Forms: internal harness certified; provider test pending |
| `/[locale]/platform/property-experience` | Property Experience 3D | BUILT | Premium, on request, in preparation. Created by Nuova, human quality-checked. No self-service promise, no automatic floor plan claim, request distinguished from accepted delivery |
| `/[locale]/packages` | Packages | BUILT + STUB | Plan names and entitlement summaries from the labelled stub. **No price, currency or tax anywhere.** Billing self-service stated as not available |
| `/[locale]/trial` | Trial | BUILT | Exact owner copy: "Try free for up to 21 days"; 14 days free; one optional extension of seven days after an honest video and written review and approval; no positive review required; public-use consent separate. Browser grants nothing |
| `/[locale]/signup` | Signup | BUILT + STUB | Five contracted fields, per-code errors, stub notice. Posts to the BFF only |
| `/[locale]/login` | Login | BUILT + STUB | Email and password. Password reset stated as not available |
| `/[locale]/onboarding` | Onboarding | BUILT + STUB | Rendered only from the readiness contract shape. Six stub cases selectable in stub mode. A field not returned is not shown. `externally_pending` never rendered as done. Disabled features never block readiness. Go live sends a request only |
| `/[locale]/connect/callback` | OAuth return | BUILT | Reads `provider`, `status`, `correlation`, `reason` only. `user_cancelled` renders neutrally. Unknown outcome renders as error, never success |
| `/[locale]/contact` | Contact | BUILT | Direct email. Book a demo optional via the existing external scheduler with a working href fallback. WhatsApp CTA renders only when a number is configured |
| `/[locale]/legal/privacy` | Privacy notice | PLACEHOLDER | Existing text ported, banner labels it as not reviewed by counsel |
| `/[locale]/legal/terms` | Terms | PLACEHOLDER | Route exists, labelled |
| `/[locale]/legal/data-deletion` | Data deletion | PLACEHOLDER | States plainly that the page does not delete anything; email request path; backend DSAR authority to be wired when the contract arrives |
| `/[locale]/legal/notice` | Legal notice | PLACEHOLDER | Existing text ported, labelled |
| `/[locale]/not-found`, `error` | Error states | BUILT | Honest, with a working route out |
| `/sitemap.xml`, `/robots.txt` | SEO | BUILT | Both locales, hreflang alternates |
| legacy `/legal-notice`, `/privacy-policy`, `/aviso-legal`, `/politica-privacidad`, `/live-demo`, `/v2` | Redirects | BUILT | Permanent redirects to the locale routes |

Pages not built, by decision: Solutions and Security pages (not in the owner's page list);
Reporting and Follow-up product pages (no status in the canonical audit and follow-up copy under
legal hold; their video slots are reserved). The old `/live-demo` simulation is retired.

---

## 2a. Claims wording after the 2026-09-09 sync

The sync clarified that renderer, viewing-request and Daily production acceptance remain pending
until actual evidence, and that no "available" or live language may imply pending functionality
can already be used. Applied:

- `final_acceptance` presentation changed from *Available, final checks* to **Built, final
  acceptance pending** (EN) and **Construido, aceptación final pendiente** (ES), with
  `publiclyAvailable: false`. Every surface reading that status inherits the change.
- The two home-page sentences and the Daily Assistant lead that said *available* now say *built,
  with final acceptance still pending*.
- Live-for-a-first-tenant claims (Gmail and WhatsApp text, identity, qualification, hot-lead
  alerts, native CRM plus Sheets, property matching) are **unchanged**: accepted evidence for
  unrelated features is preserved, not reopened.
- Media, Outlook, employee assistant and plan-aware onboarding remain *in development* and are
  never presented as available.
- 3D: premium on request, Nuova-delivered, human quality-checked, no self-service or automatic
  generation claim, request distinguished from accepted delivery, disabled 3D never blocks
  readiness. Unchanged.

## 2b. Legal routes after the 2026-09-09 sync

The four legal routes always exist and carry the PLACEHOLDER label. **Public footer linking is a
separate owner decision**: the footer renders the legal column only when
`NEXT_PUBLIC_LEGAL_LINKS=approved`. Default is unset, so no public link exists until the owner
decides. The signup form keeps its privacy link at the point of collection. Valid URLs and
placeholder labels are kept separate. A static data-deletion page does not prove DSAR execution;
the page says so. Counsel approval is separate from route completion.

## 3. Design conformance

- Mineral Black `#0C0B09`, Ivory `#F7F4ED`, Champagne `#C9A96E` restrained to accents and the primary control. Tokens in `app/globals.css`; Tailwind bound to them.
- Inter via `next/font/google`, self-hosted at build, headline weight 500, no weight above 600 anywhere.
- Logo preserved: the official `logo-tight.png` rendered in ivory through a CSS alpha mask. No `filter: invert`.
- Three-level composition on the opening: atmosphere (grain and one drawn rule), product surface (labelled pending frame), foreground type and action.
- Scroll reveals use transform and opacity only, are gated on a `js` class so content is visible without JavaScript, and collapse under `prefers-reduced-motion`.
- One header on every page: a solid mineral-black band with a hairline. It never goes transparent, so it cannot disappear into an ivory opening (a defect found in review on the Packages page and fixed).
- The Q&A launcher is closed on load and the panel is mounted only when opened (a defect found in review: a Tailwind display utility had overridden the `hidden` attribute).
- Pending film frames centre their caption and fallback action inside the frame, so a slot never reads as dead surface.
- No card grids, no glassmorphism, no colour gradients, no robots, no fake dashboards, no dashes in public copy.

---

## 4. Video slots (design now, record later)

All nine slots ship as designed pending frames at the final aspect ratio with a working fallback
action. No Play control renders until a file exists. Replaceable asset path convention:
`/public/media/<slug>/<slug>-<aspect>-v<N>.{webm,mp4}` plus poster and captions (LUXURY §10.3).

| ID | Page / section | Purpose | Duration | Aspect (desktop / mobile) | Poster | Recordable today | No-video fallback |
|---|---|---|---|---|---|---|---|
| V-01 `nuova-agency-day` | Home / H-04 Sixty seconds | Nuova inside a normal agency day | 55 to 65 s | 16:9 / 4:5 | Conversation view at rest, one Gmail enquiry open | **Yes** (text-only Gmail and WhatsApp on the accepted text path) | Labelled pending frame, one-line explanation, Book a demo |
| V-02 `voice` | Voice / PD-03 | A call handled and the record it leaves | 30 to 40 s | 16:9 / 4:5 | Call surface at rest | No (legal disclosure and provider gates) | Pending frame plus both-halves statement |
| V-03 `property-matching` | Property Matching / PD-03 | Request turned into a short honest selection | 30 to 40 s | 16:9 / 4:5 | One record with the request visible | **Yes** (demonstration property set) | Pending frame, module text |
| V-04 `daily-assistant` | Daily Assistant / PD-03 | Start of a day with Daily Goals | 25 to 35 s | 16:9 / 4:5 | Start-of-day view at rest | No (after final acceptance) | Pending frame, example questions |
| V-05 `onboarding` | Trial / TR-02 | What an agency provides and sees afterwards | 45 to 60 s | 16:9 / 4:5 | First onboarding step at rest | No (records only against the real readiness contract) | Pending frame, the ten steps in text |
| V-06 `reporting` | **Reserved** | Held: no status in the canonical audit | 20 to 30 s | 16:9 / 1:1 | One report view, demonstration chip burned in | No | Not placed on any page |
| V-07 `follow-up` | **Reserved** | Held: follow-up copy under legal review | 30 to 40 s | 16:9 / 4:5 | Journey view at rest | No | Not placed on any page |
| V-08 `property-experience` | Property Experience / PD-03 | The finished result as a buyer receives it | 30 to 40 s | 16:9 / 4:5 | One room at rest, floor plan alongside | No (service in preparation) | Pending frame, request path |
| V-09 `social-growth` | Social Growth / PD-03 | Public comment becoming a private conversation | 25 to 35 s | 16:9 / 4:5 | Public surface before the move | No (Meta review) | Pending frame, both-halves statement |

Exact scenes per slot, desktop and mobile behaviour and the EN and ES poster descriptions are in
`lib/media-manifest.ts`. Desktop: 16:9 within the section grid, poster shown, starts muted, never
autoplays with sound. Mobile: 4:5 or 1:1 full-bleed within the gutter, poster shown, tap to play.
Reduced motion: poster only with the text alternative. All illustrations are labelled.

---

## 5. Contract consumption evidence

**Architecture.** Browser → this site's own BFF routes only → (stub | staging). The browser never
holds a service key, a provider secret, an HMAC or a token. Sessions are httpOnly cookies set by
the BFF.

| Surface | BFF route | Contract (export v2) | Stub mode | Staging mode |
|---|---|---|---|---|
| Signup | `POST /api/bff/signup` | `POST /signup` | labelled stub success, routes to onboarding | proxies to `NUOVA_API_BASE` |
| Login | `POST /api/bff/auth/login` | GoTrue password grant | stub session cookie | server-side grant, token in httpOnly cookie, no SDK |
| Logout | `POST /api/bff/auth/logout` | GoTrue logout | clears cookie | clears cookie, calls logout |
| Trial status | `GET /api/bff/trial/status` | `GET /trial/status` | `trialStub` | proxy |
| Plans | `GET /api/bff/plans` | `GET /plans` → `code, display_name, entitlements_summary` | `plansStub` (no price field exists) | proxy |
| Entitlements | `GET /api/bff/entitlements` | `GET /entitlements` | `entitlementsStub` | proxy |
| Onboarding state | `GET /api/bff/onboarding/state` | `GET /onboarding/state` (§G shape) | one of six `onboardingCases` | proxy |
| Onboarding touch | `POST /api/bff/onboarding/touch` | `POST /onboarding/touch` | acknowledged | proxy |
| Activate | `POST /api/bff/tenant/activate` | readiness signal, activation server-side | stub acknowledgement | proxy |
| Stub case select | `POST /api/bff/onboarding/case` | none (stub only) | sets the case cookie | **404** |
| Stub session (captures) | `GET /api/bff/auth/login?stub=1` | none (stub only) | sets the session cookie | **404** |
| Q&A | `POST /api/qa` | Hosting `Website_QA_Intake_v1` | honest "cannot confirm" state | validates, rate-limits, signs `ts\|nonce\|body_sha256` with the server-held tenant HMAC, forwards; any failure renders the human-contact state |

**Staging gate.** `integrationMode()` returns `staging` only when all three hold:
`NUOVA_INTEGRATION_MODE=staging`, `NUOVA_API_BASE` set, and
`NUOVA_STAGING_ACK=I_HAVE_WEBSITE_HANDOFF_V1`. Otherwise every route is a stub and no request
leaves the server. Production targets have no code path.

**No secrets in the bundle.** Every secret-bearing variable is server-only and read inside
`app/api/**` or `lib/contracts/*` (server modules). `NEXT_PUBLIC_*` carries the site URL, app env,
captcha site key, the optional WhatsApp number and the scheduler URL only. The CI guard from export
v2 §I should be wired as a required check (open item 8).

**Honest states.** Every control has a designed pending, error or unavailable state. No dead
`href="#"`. No fake success. The Q&A launcher never auto-opens and never accepts input it cannot
answer without showing the human-contact path.

---

## 6. Verification evidence

| Check | Result |
|---|---|
| `tsc --noEmit` | exit 0 |
| `next lint` | no warnings or errors |
| `next build` | exit 0. 62 static pages, 11 dynamic BFF routes, first-load JS 104 kB on content pages, middleware 26.7 kB |
| Served assets match the build on disk | verified: the served `[locale]` layout chunk hash equals the file in `.next/static`, every referenced asset answers 200 (a stale orphaned server had once served old HTML against a new build; the harness now checks this before capturing) |
| HTTP contract checks | legacy routes 308 to locale routes; root negotiates `/en` or `/es` (307); plans stub carries `x-nuova-stub: 1` and `no-store`; stub session endpoint 303 with the flag, 404 without; Q&A returns `not_configured`; all security headers present, no `X-Powered-By`; sitemap 36 URLs; no secret-shaped string in the client bundle |
| Desktop captures 1440×900 and 1440×4400 | 106 files, all 53 routes and states |
| Mobile captures 390×844 and 390×7200 | 106 files, all 53 routes and states. The only sub-20 kB files are the four not-found pages, which are legitimately sparse |
| Onboarding six stub cases rendered | cases 1 to 6 in all four viewports, plus case 3 in Spanish. Case 3 verified visually: provider-named `externally_pending` rows (WhatsApp, Meta Lead Ads, HubSpot), `locked_by_plan`, readiness box with "still needed" and "disabled features never block readiness", Go live disabled with the server-activation note, trial days rendered as served |
| Review fixes made from the captures | Q&A panel no longer open on load; header solid on ivory openings; film-frame content centred; one en dash removed from a caption; `final_acceptance` reworded to "Built, final acceptance pending" with its public-availability flag off; footer legal links gated behind `NEXT_PUBLIC_LEGAL_LINKS=approved` |
| Independent website review | **not started.** No reviewer has signed off. Required before any staging integration |
| Staging integration evidence | **none.** No staging call has been made; `governance/WEBSITE_HANDOFF_v1.md` not yet delivered |
| Public release | **not authorised.** Owner decision plus the external gates |

Capture procedure: `npx next build`, `npx next start -p 3005`, then `bash scripts/screenshots.sh`.
Two lessons are encoded in the harness: Edge needs absolute Windows paths for `--screenshot`, and
every browser invocation carries a hard time ceiling so a hung instance cannot stall the run.

---

## 6a. Reviewer status and staging integration evidence

| Gate | Status |
|---|---|
| Independent website review | **Not started.** No reviewer has signed off on design, both languages, mobile, navigation, trial copy or onboarding rendering. This document is the implementer's own report and does not substitute for it. |
| Staging integration | **None.** No request has been made to any staging target. `governance/WEBSITE_HANDOFF_v1.md` has not been delivered. The staging code path exists behind a three-variable acknowledgement gate and has never been exercised. |
| Public release | **Not requested, not permitted.** Requires the owner's release decision after the review and the external gates (counsel, media, pricing authority, CTA releases). |

**Capture procedure note.** Reviews are captured with the Edge already on the machine; the script
runs four viewports concurrently on separate browser profiles with a 60-second ceiling per capture.
Before any capture run the served asset hashes are compared with `.next/static` on disk, because
on Windows stopping a shell does not stop the `next start` child it spawned: a stale server can
keep the port and serve old HTML against a rebuilt directory, which looks exactly like a broken
build. Kill by command line match, never by process name.

## 7. Open items that need the backend contract or the owner

1. **`onboarding_readiness(client_id)` contract.** The wizard renders from the export v2
   `onboarding/state` shape. The owner's closeout names a readiness function carrying booking mode,
   calendar, hours and handoff rules. Those fields are not in any contract in this repository and
   are **not invented**; the renderer shows only returned fields, so they appear the day the
   contract does.
2. **`Website_QA_Intake_v1`.** Signing scheme implemented exactly as specified. The header and
   field names carrying tenant, timestamp, nonce and signature, and the intake's response shape,
   need confirming against the intake document before staging.
3. **Backend DSAR authority** for the data-deletion route.
4. **Testimonial media pipeline** (export v2 MF-01). The trial page states the mechanism; no upload
   control is rendered because no storage pipeline exists.
5. **Captcha provider** (MF-08). Signup posts without a captcha widget until the provider is named.
6. **Pricing authority.** None exists. The packages page shows names and entitlement summaries only.
7. **Public WhatsApp number.** The contact CTA renders only when `NEXT_PUBLIC_WHATSAPP_NUMBER` is set.
8. **CI guard** for retired hosts and secret-shaped strings (export v2 §I), as a required PR check.
9. **Logo as SVG.** The mark renders exactly through a mask on the official PNG; an ivory SVG lockup
   from the owner would remove one 96 KB request.
10. **Legal text** for all four routes, from counsel. Routes exist and are labelled placeholder.
11. **Photography and product captures.** Every image slot is a labelled pending frame.
12. **`CLAUDE.md`** still carries the superseded brief and the hot-lead "mandatory selling point".
    Not edited; owner approval required.
