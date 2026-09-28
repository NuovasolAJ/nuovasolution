# WEBSITE SYNC 0928 — implementer return v1

**State:** `2026-09-28_FINAL_CONVERGENCE_AUDIT_R2` · **Lane:** Website Implementer · **Written:** 2026-09-28
**Branch:** `website_enterprise_redesign` · **Code:** `2ba0231` (on `44e9639` → `ca81034` → `e39ad06`, base `origin/main 9943660`)
**Status wording:** implemented and awaiting independent technical and final audit. Nothing here is a design
acceptance; `WEBSITE_OWNER_ACCEPTANCE` is the owner's signal.

## 0. Signals

```
WEBSITE_REVIEW_URL        = PENDING_OWNER_LOGIN  (push + Vercel device login started on the PC; two browser steps, §1)
WEBSITE_STAGING_URL       = PENDING_OWNER_LOGIN  (same two steps; variables listed in PREVIEW_START.md)
WEBSITE_ZIP_FIXES         = Z01 Z02 Z03(code) Z04 Z05(provisional) Z06 Z07(code) Z08(code) Z10 Z12 Z13 Z14 Z15(hidden) Z16 Z17 Z18 Z20 Z21 Z22 CLOSED_IN_CODE 2ba0231 · Z09 Z11 Z19 OPEN (other lanes / owner)
OWNER_RESUME_READY        = NOT_YET (needs WEBSITE_STAGING_URL + API STG_AUTH_REDIRECTS = EXACT with that origin)
OWNER_RESUME_PROVEN       = NOT_YET
WEBSITE_LIVE_CLAIM_FIX    = READY_NOT_DEPLOYED (hotfix/old-site-copy-v2 82112df; needs owner JA + push access)
META_LEGAL_PUBLIC         = BLOCKED_INPUT (no Rechtsträger, no META_LEGAL_SECTIONS, no LEGAL_PAGES_FINAL yet)
SOCIAL_UI                 = BLOCKED_INPUT (no SOCIAL_UI_SPEC, no API social contracts yet)
WEBSITE_QA_STAGING        = FAIL (unchanged: transport 6/9 on 2026-09-23, no answer; WR-36 with Hosting/Lead)
WEBSITE_OWNER_ACCEPTANCE  = (owner)
```

Evidence on this commit, all reproducible with the scripts named:

| Suite | Result | Where |
|---|---|---|
| Design probe (Edge, 1440/1024/390/360, EN/ES, menu, Q&A, 200 %, reduced motion, keyboard) | 102/102 | `docs/website_redesign/design_probe_2026-09-28/probe-results.json`, screenshots, two scroll GIFs |
| Route scan (every route EN/ES 200 with its own H1, hidden slugs 404, `X-Robots-Tag: noindex` + meta, robots Disallow, empty sitemap, 0 forbidden strings, poster served, legacy redirect) | 51/51 | `docs/website_redesign/evidence_2026-09-28/route-scan.json` |
| Stub end to end (auth stub, onboarding, CRM, branding, Q&A contract mock) | 58/58 | `docs/website_redesign/evidence_2026-09-28/stub/e2e-results.json` |
| Staging end to end (real login, tenant-api writes, branding-assets upload, readiness, cross-tenant refusals) | 27/27 | `docs/website_redesign/evidence_2026-09-28/staging/staging-e2e-results.json` |
| Mode gate (live refused without release, sandbox pinned, secret key refused) | 11/11 | console (`scripts/e2e/mode-gate-check.mjs`) |
| `tsc --noEmit`, `next build` stub and staging | clean | — |

## 1. W1 Preview — what is done, what the owner does now

Done in code (`2ba0231`):
- noindex is the default: `robots: index false` in the metadata, `X-Robots-Tag: noindex, nofollow` on every response (`next.config.js`), `robots.txt` → `Disallow: /`, empty sitemap. All three lift only when `NUOVA_INTEGRATION_MODE=live` **and** `NUOVA_LIVE_RELEASE=OWNER_RELEASED_PRODUCTION` (the same gate as the live build). Canonicals and `metadataBase` use the deployment's own origin on Vercel, never the public domain.
- A visible band "Preview / Vista previa" on every page of a stub deployment, "Test environment / Entorno de pruebas" on a staging deployment, plus a fixed marker while scrolling (desktop).
- `PREVIEW_START.md` rewritten: two separate Vercel projects, Preview deployments (never `--prod`), variables per project, Deployment Protection off only in those projects, `route-scan.mjs` against the deployed origin.
- Negative case: `VERCEL_ENV=production` still refuses the stub account surfaces (WR-06 unchanged); the staging deployment does not use them, so it is unaffected.

Access (Route A, as the audit's owner line allows): both flows are **running on this PC right now** and wait for two browser steps by the owner:
1. **GitHub:** the Windows Git Credential Manager window ("Connect to GitHub") opened by `git push -u origin website_enterprise_redesign`. Sign in once with the NuovasolAJ account. The push completes on its own, no force.
2. **Vercel:** open `https://vercel.com/oauth/device?user_code=CFCB-CTCQ`, sign in, confirm the code. (If the code has expired, say so and I restart `npx vercel@latest login` for a new one.)

After both: I create `nuovasolution-design-preview` (no variables) and `nuovasolution-staging-preview` (staging variables, publishable key from the secure store), deploy both as Preview deployments, switch Vercel Authentication off for those two projects only, verify logged out (route scan against the real origin, reload, language switch, assets, no localhost), and report `WEBSITE_REVIEW_URL` and `WEBSITE_STAGING_URL` with commit and header output. The staging origin goes to API the same moment for the exact allow-list entry and `site_url`.

Route B fallback: the start-ready package is the repository at `2ba0231` with `PREVIEW_START.md` §A (`npm ci && npm run build && npm start`; staging: the variables in the table, `NUOVA_INTEGRATION_MODE=staging` at build time).

## 2. W-Design — the sales path, and the screenshot set for T5

One sales path on one continuous example (Laura M., a two bedroom flat in Estepona):

| # | Section | Texts | Product surface |
|---|---|---|---|
| 1 | Hero: pain in one sentence, qualifier, Start free / Book a demo, "14 days free. No payment." once | C3 H1 | three layered cards: enquiry → answer (marked "AI assistant") → record |
| 2 | Three pains of an agency | C3 H2, the detail sentence split in three | — |
| 3 | "From a message to a task": four step chips, then three stacked product cards that slide over each other on desktop | C3 H3/H4/H5 first sentences | conversation view · leads board (qualification, priority, next step) · daily assistant |
| 4 | Media place with a real poster (film later, no layout shift) | — | rendered frame of conversation + record + board |
| 5 | "One customer, one record" | new short lead (implementer) | record view |
| 6 | "14 days free, no payment": three steps | C3 H8 | readiness check as the onboarding renders it |
| 7 | Plans teaser + four questions in a grid | C3 §3.1, §3.5 | — |
| 8 | Question box (labelled Demo in previews) | C3 §4 | — |
| 9 | Closing | C3 H9 | — |

Removed from every public page: status chips, gate sentences, "What is not ready yet", "Certified internally",
"in development / not offered yet" formulas, the schematic process map, the radial colour washes, the
"Most agencies start here" badge. Home rendered text ≈ 1 385 words EN / 1 442 ES including navigation, footer and
the question box (was ≈ 1 990 / 2 120).

Screenshot set (Desktop 1440 and phone 390, EN and ES): home, packages, trial, product (AI Sales Agent, Universal
CRM), contact, open menu, open Q&A, plus 200 % zoom, reduced motion and keyboard focus, in
`docs/website_redesign/design_probe_2026-09-28/`. Scroll recordings with the stacked cards and transitions:
`scroll-d1440-es-home.gif` (47 frames) and `scroll-m390-es-home.gif` (87 frames). The stacked sliding only exists
at ≥ 1024 px width and ≥ 720 px height; below that the cards follow each other (Z17), which the phone GIF shows.

Known, deliberately left for the owner's judgement: the plans page opening is text only (no product surface fits a
price page without a price); the posters are rendered product frames, not photography or film.

## 3. Z register — per finding

Stages: Code · local · Staging · real provider · Owner · independent.

| ID | Commit | Before → After | Evidence | Status |
|---|---|---|---|---|
| Z01 artifact fallback | 2ba0231 | 16-page artifact export with home fallback → full Next build; every route answers its own page, unknown/hidden slug 404 (`dynamicParams=false`) | route scan 51/51 (local) | CLOSED (Code · local); HTTPS after the two logins |
| Z02 `--prod` vs stub gate | 2ba0231 | guide said `--prod` → guide says Preview deployments, separate projects; gate unchanged | `PREVIEW_START.md`, mode gate 11/11 | CLOSED in doc; observed behaviour follows on the real deployment |
| Z03 trial on every card | 2ba0231 | every card → `/signup` → Essential/Growth/Scale: neutral trial line above the cards, cards carry "Request a proposal" → `/contact?plan=<code>`; badge "14 days free" + "Try Essential free" only with `NEXT_PUBLIC_TRIAL_PLAN=essential` (API `TRIAL_PLAN_ALIGNED`) | `packages/page.tsx`, `contact/page.tsx` (plan interest shown, in the mail subject) | CLOSED in code; **waits on API** for the switch |
| Z04 social proof | 2ba0231 | "Most agencies start here", "never need another one" → removed | route scan forbidden list, 0 hits | CLOSED |
| Z05 demo conversation | 2ba0231 | "Hello Laura" without a name, free calendar time → the customer introduces herself; the reply notes the preferred day and hands the time to an agent; the assistant is labelled on every reply | hero + conversation view | CLOSED provisionally (implementer wording); Copy's LAUNCH_COPY_v1 and the approved web disclosure text replace it |
| Z06 internal status report | 2ba0231 | "What is not ready yet", "Certified internally" (4 pages), gate sentences → none; hidden capabilities have no page | route scan, 0 hits EN/ES | CLOSED |
| Z07 "universal" | 2ba0231 | CRM H1 "Every message, from every channel" → "One record per customer, included from the start"; cross-channel, attachments, Outlook sentences not rendered | product pages | CLOSED in code; `PROVIDER_TRUTH_MATRIX_v1` still needed for any channel claim beyond WhatsApp/Gmail text |
| Z08 branding | 2ba0231 | "name, logo, signature" + "Branded email is in development" → section removed; hero keeps only "under your agency's name" (WhatsApp number of the agency) | home | CLOSED in code; `BRANDING_CHAIN_MATRIX_v1` before any branded-email sentence returns |
| Z09 Q&A no answer | — | unchanged: staging path answers nothing (WR-36) | 2026-09-23 harness 6/9 | OPEN (Hosting H2, Lead) |
| Z10 Q&A texts/interaction | 2ba0231 | separate histories, storage line always, "name, email or phone", 60 s from accept → one shared conversation (inline + floating), storage line only after a real intake accepted, contact = email or phone with validation, 60 s hard budget from send incl. requests, AbortController on close/leave; Demo label; `NEXT_PUBLIC_QA_SURFACE=hidden` removes it | stub e2e WR-07/08/17b, code | CLOSED |
| Z11 pricing | 2ba0231 | hand-transcribed catalog, gated features listed → published features only, limits per plan, proposal path with plan interest, "invoice ≠ paid" kept | packages | CLOSED in code; runtime catalog **waits on API** (no plans endpoint in HANDOFF_v3; BFF path returns `awaiting_contract` in staging and falls back to the transcription); amounts wait on `PRICING_AUTHORITY` |
| Z12 process map | 2ba0231 | `operating-map.tsx` → deleted; platform overview shows the three product cards of the example | platform page | CLOSED |
| Z13 colour washes | 2ba0231 | `.atmosphere` radial gradients on 8 page types → removed | globals.css | CLOSED |
| Z14 media | 2ba0231 | 0 media, pending frames → `MediaSlot` with real posters (1600×900 and 1080×1350, EN/ES) on home and trial; film swaps in with the same poster | `public/media/…`, route scan poster check | CLOSED for the poster part; Daily captures and 3D wait on their signals |
| Z15 3D copy | 2ba0231 | "real doorways / puertas reales" rendered → capability hidden (no page, no text) | route scan 0 hits | CLOSED by hiding; text rewrite waits on `3D_FEATURE_TRUTH` |
| Z16 text amount | 2ba0231 | ~1 990 / 2 120 words → ~1 385 / 1 442 | route scan INFO lines | CLOSED |
| Z17 grid/sticky | 2ba0231 | FAQ outside the grid, sticky at every width → FAQ in the grid; sticky only ≥ 1024×720, opened details readable at 200 % | probe zoom200 checks | CLOSED |
| Z18 language | 2ba0231 | query lost on switch, "catorce" → `confirmed`, `plan`, `ref` and the anchor kept; "14 días" in the terms | `language-switcher.tsx`, `legal.ts` | CLOSED (signup language field: unchanged pending API `LANG_WRITE_MAP`, R30) |
| Z19 demo path | — | unchanged | — | OPEN (Reviewer booking after owner `DEMO_TEST_BOOKING`) |
| Z20 mobile menu keyboard | 2ba0231 | Escape only for the desktop menu → Escape closes the sheet, focus trapped inside (Tab cycles), page inert, focus returns to the button; the sheet is a dialog | probe nav-open checks; keyboard check | CLOSED (Reviewer verifies with a keyboard) |
| Z21 indexable preview | 2ba0231 | `index: true`, no header → noindex meta + header + robots + empty sitemap by default | route scan | CLOSED (header on the real URL after deploy) |
| Z22 documents | 2ba0231 | `PREVIEW_START.md` diverged → rewritten; media comments updated | — | CLOSED |

Other points: WR-14 "Skip for now" unchanged (I8: after the owner's design judgement). WR-32 = Z03.

## 4. Chains and their stage

| Chain | Stage reached on 2ba0231 | Next stage and who |
|---|---|---|
| Review preview reachable logged out | Code · local | HTTPS after the owner's two logins (§1) |
| Staging preview + exact allow list | Code · local (staging e2e 27/27 on localhost) | deploy, then API `STG_AUTH_REDIRECTS = EXACT` |
| Owner resume (login → agency once → onboarding) | Staging on localhost with fixture identities (staging e2e S1–S11); stub path 58/58 | on the HTTPS staging origin with a fixture, then `OWNER_RESUME_READY` for T6 |
| Independent new registration | — | Reviewer, after the owner's SMTP/address decisions (A-W5) |
| Q&A real answer | transport proven (accept + poll), no answer | Hosting H2 (`WEB_QA_PRODUCT_TENANT`), Lead contract, Copy FAQ; then `WEBSITE_QA_STAGING = PASS`, then the surface switch to public with a disclosure text |
| Old-site claim hotfix | branch `82112df` built, not deployed | owner `WEBSITE_LIVE_CLAIM_FIX = JA` + push access → deploy only the hotfix files to `main` |
| Legal pages hotfix v3 | — | Rechtsträger (owner), `META_LEGAL_SECTIONS` (Social/Copy), `LEGAL_PAGES_FINAL` (Copy) |
| Social UI | — | `SOCIAL_UI_SPEC` (Social) + API contracts; then staging-mode build without provider calls |

## 5. Customer paths — what works, what does not

Works in the design preview (stub): every page in ES and EN, navigation, deep links, language switch keeping the
query, menu and sheet with the keyboard, plans → proposal request with the plan carried to contact, trial page,
question box as a labelled demo with the honest "cannot confirm" state, demo calendar link (external, loads).

Works on the staging build (localhost, fixture identities): login through the form, agency setup writes
(business, hours, languages, calendar), logo upload as a real file to staging storage with light/dark previews,
dark variant upload and removal, CRM choice read back from `crm.current`, readiness from
`tenant_activation_readiness`, role refusals (agent 403, other agency 403 on foreign assets, fake PNG 422),
Google Sheets notice gate (428).

Does not work yet: a public HTTPS URL (two owner logins pending); e-mail confirmation on a public origin
(allow list + `site_url` are API's after the origin exists; A-W5 SMTP is the owner's); a real Q&A answer
(WR-36); online payment (not built, stated on the page); prices (no authority); Essential-bound trial wording
(API signal); hidden capabilities (voice, social, lead acquisition, property matching, 3D) have no page until
the register changes.

## 6. Decisions I took that the owner or another lane may overturn

- Publication register values: `live` = AI Sales Agent, Lead Intelligence, Universal CRM, Daily Assistant;
  `hidden` = Voice, Social Growth, Lead Acquisition, Property Matching, Property Experience 3D. Daily Assistant is
  shown because the owner's criteria name Daily tasks as one of the real product surfaces; its final owner test
  stays in the launch blocker register, not on the page.
- Feature flags shown on the plans page: text replies, Gmail, WhatsApp, qualification and priority, CRM included,
  consent handling. `followup.basic` (legally held) and `reporting.*` (no canonical status) are not listed.
- Demo conversation wording (Z05) and the short "one record" lead are implementer sentences until
  `LAUNCH_COPY_v1` arrives.
- The Q&A test tenant remains `stg_pm_nerjamar` for the transport harness only; the product tenant is API's
  (`WEB_QA_PRODUCT_TENANT`).

## 7. Owner steps

1. The two browser logins now (§1). Nothing else is needed for the preview URLs.
2. T5 after `WEBSITE_REVIEW_URL`: desktop and iPhone Safari, ES/EN, menu, plans, Q&A demo; list the defects, I fix
   them without a new order.
3. `WEBSITE_LIVE_CLAIM_FIX = JA` if the old-site claims should be corrected before the launch.
4. Rechtsträger line for the legal pages; `PRICING_AUTHORITY`; `DEMO_TEST_BOOKING`.
