# FINAL WEBSITE INTEGRATION PLAN — NuovaSolution

**Author:** Final Website Reconciliation Director (Chat 5)
**Branch:** `website_enterprise_redesign`
**Created:** 2026-08-31 · **Rewritten:** 2026-08-31 for **export-v2 + AF addendum**
**Supersedes:** the export-v1 era plan (nine chats, five waves). The rationale for every change is in
`FINAL_RECONCILIATION_REPORT.md` §0V.

**Inputs:** `FINAL_RECONCILIATION_REPORT.md` (§0V especially),
`INTEGRATION_COMPATIBILITY_MATRIX.md` (§0V especially),
`backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2.md` (**hash verified**),
`backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2_AF_ADDENDUM_v1.md` (**hash verified**),
`AUTHENTICATED_SURFACE_SYSTEM.md`, and the eight other governance documents.

> This is a plan. Nothing in it has been executed. It authorises no push, no merge, no deployment, no
> preview, and no contact with any product system. It makes no production readiness claim.

---

## 1. Authority ranking (binding for every chat)

| # | Document | Authority |
|---|---|---|
| **1a** | `WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2.md` | **Technical truth.** |
| **1b** | `…_v2_AF_ADDENDUM_v1.md` | Technical truth for **AF-01, AF-04, AF-07** only. |
| — | `…_EXPORT_v1.md` | **HISTORICAL.** No status may be derived from it. |
| 2 | `CLAIMS_MATRIX.md` | **Public claims.** Backend confirmation never converts a `LEGAL` or `REJECTED` verdict. |
| 3 | `PRODUCT_TRUTH.md` | Confirmed product scope and required qualification. |
| 4 | `COPY_AND_CONVERSION_MASTER.md` | Copy. Adapted to 1, 2 and 3. |
| 5 | `LUXURY_UX_MEDIA_SYSTEM.md` + `AUTHENTICATED_SURFACE_SYSTEM.md` | Visual and structural authority. |
| 6 | `FINAL_RECONCILIATION_REPORT.md` | Conflict decisions. **§0V outranks §§0 to 11 of the same file.** |
| — | `MASTER_GOVERNANCE.md` | **Process, severity, release and access.** §14 and §15 remain absolute. |
| — | `CLAUDE.md` | Stale. Not edited without owner approval. |

---

## 2. The binding facts every chat implements against

From v2 §A, §C and the addendum. **These are fixed and are not reopened.**

1. **Trial is 14 days free. No payment method at signup.**
2. **Start Trial becomes the primary CTA after integration. Book a Demo is optional. No call is ever
   required to start a trial.**
3. **No price exists anywhere.** `GET /plans` returns `{ code, display_name, entitlements_summary }`.
   `billing_plan` has no price and no currency column. **No figure is displayed, from any source.**
4. **No provider polling is invented.** One status call after the OAuth callback or on explicit
   refresh. Any auto-refresh is a website-owned, conservative, terminal-stopping decision and is
   never presented as a backend contract.
5. **Footer and signature are text fields**, not uploads. Signature is `signature_mode` ∈
   `logo_only | compact | banner_signature | legal_only` plus text. **Plain text only; never raw HTML.**
6. **Logo and email banner are the only uploads.** `image/png, image/jpeg, image/webp, image/gif`,
   max **5 MB**.
7. **Property upload is out of scope in onboarding.** Properties arrive by source connect: agency
   website scrape, feed, or CRM inventory. The agency's own website is a **first class** source.
8. **Hot lead alerting is out of scope for the marketing website.** No surface, no section, no phone
   mockup, no claim.
9. **Demo booking backend stays PROPOSED.** Not implemented, not typed as real, not wired.
10. **Voice and WhatsApp website sales concierges stay RESERVED.** No surface, no launcher.
11. **Captcha provider stays OWNER DECISION REQUIRED** (MF-08).
12. **Currency, tax and IVA stay OWNER DECISION REQUIRED and LEGAL REVIEW REQUIRED** (MF-10).
13. **Testimonial video stays BACKEND IMPLEMENTATION REQUIRED and LEGAL REVIEW PENDING** (MF-01,
    L-13). `media_ref` is a string reference; there is no upload pipeline. **Never fake a video field.**
14. **OAuth return:** one shared route `{FRONTEND}/{locale}/connect/callback` with `provider`,
    `status`, `correlation`, `reason`. `error=access_denied` → `reason=user_cancelled` →
    **neutral, resumable, never a provider failure**. Everything unrecognised → `provider_error`.
    A persisted cancellation state is **backend hardening, not a launch blocker**.
15. **Provider display names:** Gmail · WhatsApp · Google Calendar · Microsoft Outlook · **Voice or
    Phone, generic only.** No internal carrier name. No logos until brand approval.
16. **`GET /branding/preview`** returns `logo`, `logo_present`, `email_banner`,
    `email_banner_present`, `fallback_note`.
17. **Separate locale routes `/en` and `/es`.**
18. **The wizard is not linear.** Steps evaluate independently; `resume_step` is a pointer.
19. **Checkout is a full page handoff.** No payment form, no payment iframe, no card collection.
20. **Staging only, under explicit owner approval. No production call, ever.**

---

## 3. Non negotiable rules for every chat

1. **No `git add .`, no `git add -A`, no `git add <directory>`.** Explicitly named paths only.
2. **Before staging:** `git status --porcelain`. **After staging, before committing:**
   `git diff --cached --name-only` must match the intended paths exactly.
3. **No two chats in the same wave touch the same file.** Ownership in §5 is exclusive.
4. **No push, merge, deployment or preview** without explicit per occasion owner approval (§15).
5. **No contact with any product system** — no n8n, no Supabase, no provider, no webhook, no API
   call, no health check. **Staging execution requires the owner's ratifying line in §14 first.**
6. **No invention.** Nothing outside v2 and the addendum. Environment variable **names** only.
7. **No secret value** is written, echoed, logged, quoted or committed, including in a commit message.
8. **Product CTA lockdown holds.** The activation register is empty. v2 fixing the CTA hierarchy is
   **not** a per-action release.
9. **No chat releases its own work** (R1). Completion wording is exactly *Implemented and awaiting
   independent technical and final audit.*
10. **`LIVE` and `PRODUCTION READY` are not used** anywhere.
11. **No em dash, en dash or parenthetical dash in public website copy**, either language.
12. **No number is hardcoded** — not 14, not 7, not 10, not a price, not a quota.
13. **No technical identifier reaches the DOM.** One redaction boundary, enforced by a build check.
14. **Uncommitted owner work is preserved**: `app/v2/`, `components/v2/`, `lib/os/`, the root `.mp4`.

---

## 4. Wave map

| Wave | Chats | Parallel | Entry gate |
|---|---|---|---|
| **H — Hygiene** | H1 | **Alone** | Owner decision on rotation state and repository visibility |
| **V — Document updates after v2** | V1, V2, V3, V4 | **V1 ∥ V3 ∥ V4**; V2 after V1 | None. **Can start immediately** |
| **F — Foundation** | F1, F2 | **F1 ∥ F2** | H1 complete; V3 complete; fonts supplied |
| **L — Locale and content** | L1, L2 | **L1 ∥ L2** | F1, F2 complete; V2 complete for L2 |
| **B — BFF** | B1 | ∥ with S1 | F2, H1 complete. **Execution additionally needs the §14 staging ratification** |
| **S — Surfaces** | S1, S2, S3, S4 | **S1 ∥ S2 ∥ S3 ∥ S4** | L1, L2 complete. S2, S3, S4 additionally need B1 |
| **T — Tests** | T1 | Alone | Any surface chat complete |
| **A — Audit** | AU1 | Read only, any time | Any wave close |

---

## 5. The chats

---

### H1 · Repository Hygiene, Handoff Custody and Deployment Safety

| | |
|---|---|
| **Responsibility** | Make the repository safe to hold an environment variable. Untrack build output and tooling state. Delete the retired n8n Cloud configuration. Bring the four backend exports under version control with their verified digests. Write the CI guard and the deployment configuration. Fix nothing else. |
| **Allowed files** | `.gitignore` · `.mcp.json` (**removal only**) · `.claude/settings.local.json` (**untrack only**) · `tsconfig.tsbuildinfo` (untrack) · `.next/` (untrack) · `vercel.json` (new) · `next.config.js` · `.env.example` (new) · `package.json` (**pre-build script only, this wave**) · `scripts/ci-guard.sh` (new) · `.github/workflows/ci-guard.yml` (new) · `docs/website_redesign/backend_handoff/**` (**commit the four exports** plus a new `HASHES.md` recording both verified SHA256 digests) |
| **Forbidden files** | Everything under `app/`, `components/`, `lib/`, `translations/`, `content/`, `public/`, `tests/`, and every file in `docs/website_redesign/` outside `backend_handoff/`. `CLAUDE.md`. |
| **Dependencies** | Owner: confirm the rotation state of the credential in `.mcp.json` and the repository's visibility. **Runs alone** — `git rm --cached` operates on the whole index, so no other chat commits while this one stages. |
| **Tests** | `git ls-files .next \| wc -l` returns **0**. `git ls-files .mcp.json` returns nothing. `sha256sum` of both current exports matches `HASHES.md`. The CI guard **fails** on a deliberately introduced test string and **passes** on the clean tree. `npm run build` still succeeds. A grep of every committed file for the retired host patterns and secret shapes returns nothing outside `docs/`. |
| **Commit strategy** | Four commits, explicit paths each: (1) untracking plus `.gitignore`; (2) `backend_handoff/**` plus `HASHES.md`; (3) `vercel.json next.config.js .env.example`; (4) `scripts/ci-guard.sh .github/workflows/ci-guard.yml package.json`. |
| **Acceptance criteria** | `.next` untracked. `.mcp.json` untracked and the retired connection deleted, **not repaired**. No secret value in any committed file, `.env.example` included. The CI guard is scoped to `./app ./components ./lib ./.next` and **not** to `docs/`, which legitimately contains the pattern list. The four exports are committed with verified digests. No rotation performed. No history rewritten. No file outside the allowed list changed. |

---

### V1 · Truth and Claims v2 Update

| | |
|---|---|
| **Responsibility** | Apply `FINAL_RECONCILIATION_REPORT.md` §0V to the two truth documents. Move T-01 to approved-with-qualifier on the confirmed facts. **Restate PK-06 as "no price exists anywhere".** Reclassify hot lead alerting from blocked to out of scope. Close nine missing fields. Lift **no** legal hold. |
| **Allowed files** | `docs/website_redesign/PRODUCT_TRUTH.md` · `docs/website_redesign/CLAIMS_MATRIX.md` |
| **Forbidden files** | Everything else, without exception. |
| **Dependencies** | None. **Can start immediately.** |
| **Tests** | A grep for `price_display` returns no surviving assertion that the website renders a served price. A grep for `MF-02` returns only historical, struck references. T-01, T-00, CTA-1, PK-06, D-10 each carry a dated v2 changelog line. Every one of the fourteen L-dependencies is byte-for-byte unchanged in force. |
| **Commit strategy** | Two commits, one path each. |
| **Acceptance criteria** | All twelve V2 corrections and the ten smaller corrections applied or explicitly declined with a reason. **No legal hold weakened.** No new claim invented. RS-02 recorded: the twelve certified AI runtime languages are **not** an authorisation to publish a language count; B-07 unchanged. The testimonial state vocabulary updated to six values. |

---

### V2 · Copy and Conversion v2 Update

| | |
|---|---|
| **Responsibility** | Release Variant B of the CTA ladder on the confirmed facts. **Delete every price-rendering assumption.** Remove the hot lead blocked-copy scaffolding and record it as out of scope. Write the authenticated copy that v2 unblocks: per-`code` error strings, the six testimonial states, the wizard step and status labels, the OAuth return states including **user cancelled**, the provider display names, and the branding text-field group. EN and ES. |
| **Allowed files** | `docs/website_redesign/COPY_AND_CONVERSION_MASTER.md` |
| **Forbidden files** | Everything else. Especially the two files V1 owns. |
| **Dependencies** | **V1 must complete first.** Copy verdicts derive from matrix verdicts; running them together produces two divergent registers. |
| **Tests** | Zero dashes in any customer-facing string, either language. No price, no quota, no percentage, no response-time figure, no score scale, no hot lead wording, no invented statistic. Every new string carries its matrix ID. Every EN string has an ES string. Spanish read aloud by a native speaker from Spain. |
| **Commit strategy** | One commit, one path. |
| **Acceptance criteria** | Variant B released and Variant A demoted to fallback. `user_cancelled` copy reads as neutral and resumable and **never** as a failure. Voice is named generically; no carrier name appears. Footer and signature copy is a text-field group, not an upload. The two remaining "30 minute call" occurrences removed. |

---

### V3 · Authenticated and Visual System v2 Update

| | |
|---|---|
| **Responsibility** | Apply the seventeen superseded assumptions in report §0V.5 to the design system. **Delete the third upload block.** Specify the branding text-field group and `signature_mode`. Wire the OAuth callback route and the four outcomes including cancellation. Add the office control with role gating. Add the confirmed preview shape. Replace per-status error treatment with per-`code`. Add the reminder thresholds. Restore the `language` control and the client-side upload constraints. **Remove the price row from the plan surface.** |
| **Allowed files** | `docs/website_redesign/AUTHENTICATED_SURFACE_SYSTEM.md` · `docs/website_redesign/LUXURY_UX_MEDIA_SYSTEM.md` |
| **Forbidden files** | Everything else. All application code. |
| **Dependencies** | None. **Can start immediately**, in parallel with V1 and V4. |
| **Tests** | The eight status values still render as glyph plus text plus colour with computed contrast on both canvases. `externally_pending` still cannot render as complete. `locked_by_plan` still is not an error. The anti-pattern lists still pass against every revised surface. No new colour without a computed ratio. |
| **Commit strategy** | Two commits, one path each. |
| **Acceptance criteria** | All seventeen supersessions applied. §10's price row deleted, not softened. §9.1's footer-or-signature upload row deleted as a premise. §4.3's MF-04 block lifted. §7.7 rewritten for the shared callback route. AF-01's cancellation outcome specified as neutral. Voice generically named with the reason recorded. |

---

### V4 · Governance and Contract v2 Update

| | |
|---|---|
| **Responsibility** | Ratify the v2 authority in governance. **Add the staging clause to §14** so end-to-end verification becomes reachable. Update §11's CTA ladder on the confirmed facts. Rewrite the contract's action register against v2: the new `GET /offices` surface, the shared OAuth callback route, the six testimonial states, the full error enumeration, hot lead alerting as out of scope. Update the status file and the audit. |
| **Allowed files** | `docs/website_redesign/MASTER_GOVERNANCE.md` · `docs/website_redesign/INTEGRATION_CONTRACT.md` · `docs/website_redesign/IMPLEMENTATION_STATUS.md` · `docs/website_redesign/CURRENT_SITE_AUDIT.md` |
| **Forbidden files** | The source-of-truth documents. The three Chat 5 documents. `CLAUDE.md`. All application code. |
| **Dependencies** | None. **Can start immediately.** The §14 staging clause additionally needs the owner's written ratification before it becomes operative. |
| **Tests** | `LIVE` and `PRODUCTION READY` appear in none of the four files. Every v2-affected action carries its new status pair. The activation register is still empty. §14.3's lockdown is unchanged in force. |
| **Acceptance criteria** | The staging clause is written as **conditional on the owner's explicit approval per target, production permanently excluded** — never as a general permission. C-14 recorded as resolved in principle. C-21 recorded as closed by scope. C-13 recorded as closed once H1 commits the exports. §14 not relaxed in any other respect. |
| **Commit strategy** | Up to four commits, one path each. |

---

### F1 · Design Tokens and Global Foundation

| | |
|---|---|
| **Responsibility** | Replace the three competing colour systems with one token layer. Self-host fonts. Establish spacing, type, radius, shadow and motion tokens. Build the shared primitives: `Reveal` with the no-JS safety pattern, `Button`, `Section`, `Container`, the eight status glyphs, `StatusRow`, `StatusChip`, `StatusNote`, and the `<AgencyText>` redaction boundary. |
| **Allowed files** | `app/globals.css` · `tailwind.config.ts` · `postcss.config.js` · `app/layout.tsx` · `lib/tokens/**` · `lib/motion/**` · `lib/redaction/**` · `components/primitives/**` · `public/fonts/**` |
| **Forbidden files** | `lib/env/**`, `lib/api/**`, `types/**`, `app/api/**`, `app/[locale]/**`, `components/layout/**`, `components/marketing/**`, `components/auth/**`, `components/onboarding/**`, `components/pricing/**`, `components/trial/**`, `content/**`, `translations/**`, all docs. |
| **Dependencies** | H1 and V3 complete. Font files supplied (AS-02). |
| **Tests** | `npm run build`, `npx tsc --noEmit`, `npm run lint`. Content fully legible with JavaScript disabled. Reduced motion honoured. Every colour pair in use present in the computed contrast table. No radius above 8 px. No pill button except the three permitted. The eight glyphs distinguishable in greyscale. First-load JS measured and recorded. |
| **Commit strategy** | Grouped by concern — tokens, fonts, motion, status primitives, redaction boundary — explicit paths per commit. |
| **Acceptance criteria** | `--ns-*`, `brand.*` and inline hex removed. Google Fonts `@import` deleted; exactly one preload. Blanket `overflow-x: hidden` removed. `100vh` removed. `<AgencyText>` renders **nothing** for an unrecognised key, and a build check greps for direct interpolation outside the boundary. |

---

### F2 · Typed Contract and Environment Module

| | |
|---|---|
| **Responsibility** | Express v2 and the addendum as types and a client boundary that **is never executed**. The server-only environment module. The per-`code` error union. The eight status unions. The OAuth callback parameter contract. **No route handler, no network call, no test against any host.** |
| **Allowed files** | `lib/env/**` · `lib/api/**` · `types/**` |
| **Forbidden files** | `app/api/**` (B1 owns it), `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`, `components/**`, `content/**`, all docs. |
| **Dependencies** | H1 complete. Parallel with F1. |
| **Tests** | `npx tsc --noEmit` passes. A grep for `fetch(`, `XMLHttpRequest` and `axios` in `lib/api/**` returns **nothing**. A grep for any host literal, path prefix or origin returns nothing. A grep for `price` in the plans type returns nothing. Reading a server-only variable from a client context throws at module load, proven by a unit test. |
| **Commit strategy** | Grouped by concern, explicit paths. |
| **Acceptance criteria** | All 28 surfaces typed except `POST /demo/book`, which exists **only as a commented `PROPOSED` note**. `GET /plans` typed as `{ code, display_name, entitlements_summary }` with **no price field**. `GET /offices` typed. Testimonial state typed as six values. The OAuth callback typed with `reason ∈ user_cancelled | provider_error`. Every target read from an environment variable. No `NEXT_PUBLIC_` name carries a server-only value. |

---

### L1 · Locale Routing, Shell and Site Infrastructure

| | |
|---|---|
| **Responsibility** | `/en` and `/es` route-based locales. The header, mega menu, mobile sheet, footer, language switcher. `metadataBase`, canonicals, `hreflang`, `sitemap.ts`, `robots.ts`, `not-found.tsx`, `error.tsx`, `loading.tsx`. **The `{FRONTEND}/{locale}/connect/callback` route lives here**, because it is shared infrastructure across three wizard steps. |
| **Allowed files** | `app/[locale]/layout.tsx` · `app/[locale]/not-found.tsx` · `app/[locale]/error.tsx` · `app/[locale]/loading.tsx` · `app/[locale]/connect/callback/**` · `app/sitemap.ts` · `app/robots.ts` · `middleware.ts` · `components/layout/**` · `lib/i18n/**` |
| **Forbidden files** | `app/[locale]/(marketing)/**`, `app/[locale]/(auth)/**`, `app/[locale]/(app)/**`, `app/api/**`, `lib/api/**`, `lib/env/**`, `content/**`, `translations/**`, `components/primitives/**`, all docs. |
| **Dependencies** | F1 and F2 complete. Owner decision on route naming. **AD-01:** the authenticated tree, `Log in` included, is **omitted from public navigation** until the dashboard destination is settled. |
| **Tests** | Verified at 320, 375, 768, 1024, 1440 and 1920 px. `<html lang>` correct per route. `hreflang` pairs resolve both ways. No `!important`. Header identical on every page. The callback route classifies all four outcomes correctly against a local fixture, with **no network call**. Lighthouse LCP is the headline text. |
| **Commit strategy** | Grouped by concern, explicit paths. |
| **Acceptance criteria** | Spanish is linkable, shareable and indexable. Audit A-04 and A-13 closed. **No `Log in` link, no WhatsApp CTA, no chat launcher.** The callback route never renders `success` for an unrecognised outcome, and renders `user_cancelled` as neutral. |

---

### L2 · Bilingual Content Layer

| | |
|---|---|
| **Responsibility** | Move every string out of components into one content source, EN and ES, taken verbatim from the copy master. Retire the legacy flat dictionaries. Provide the label maps the redaction boundary resolves: entitlement keys, provider identifiers, step keys, error `code`s, `signature_mode` values, roles. |
| **Allowed files** | `content/**` · `translations/**` (**retirement only**) |
| **Forbidden files** | Everything under `app/`, `components/`, `lib/`, `public/`, `tests/`, all docs. |
| **Dependencies** | V2 complete. Parallel with L1. |
| **Tests** | Every EN key has an ES key; the counts match and a test fails on any gap. **No English fallback renders on an ES route** — the current silent fallback chain is removed. No string contains a dash. Every `code` in the v2 enumeration has copy in both languages. Every provider identifier resolves to its confirmed display name, and **voice resolves to the generic label**. |
| **Commit strategy** | One commit per content domain, explicit paths. |
| **Acceptance criteria** | No component authors a string. Spanish written natively, not translated. `usted` in every simulated client message, `tú` to the agency owner, no mixing. Title case has not leaked into any Spanish heading. |

---

### B1 · BFF Route Implementation (written, not executed)

| | |
|---|---|
| **Responsibility** | Implement the BFF-only surfaces from matrix §3.2 plus the new `GET /offices`, the provider OAuth callbacks with the AF-01 classification, and the checkout webhook. Server-side captcha verification on public forms. **Executes nothing against any host.** |
| **Allowed files** | `app/api/**` |
| **Forbidden files** | Everything else, `lib/api/**` and `lib/env/**` included — this chat imports them and never edits them. |
| **Dependencies** | F2 and H1 complete. Captcha provider (MF-08) for the signup route. **Execution against staging additionally requires the owner's §14 ratification and an explicitly approved target.** |
| **Tests** | `npx tsc --noEmit`, `npm run build`, the CI guard. A route-by-route read of every return path proving no provider token, client secret or service key can appear in a response body. A unit test that a server-only variable is not importable from a client component. **A test asserting `/api/**` contains no `demo/book` handler.** The OAuth callback classifier unit-tested across all four outcomes plus a state mismatch. |
| **Commit strategy** | One commit per surface group, explicit paths. |
| **Acceptance criteria** | Every target read from an environment variable; no host literal. CORS set to the exact allowed origin, never `*` with credentials. Webhook signatures verified server-side. The uniform envelope returned everywhere. `202` returned as pending, not as an error. **No `/demo/book`.** No route executed against any host. Every route documented in `INTEGRATION_CONTRACT.md` by V4 before it is written. |

---

### S1 · Public Marketing Pages

| | |
|---|---|
| **Responsibility** | Compose the homepage and every public page except pricing, from L2's content and the design system. Fix audit A-02 (real `href` with progressive enhancement) and A-03 (relative internal links). Every product surface ships as a `ProductSurface` `pending` frame. |
| **Allowed files** | `app/[locale]/(marketing)/**` **except `pricing/`** · `components/marketing/**` · `components/product-surface/**` · `lib/media-manifest.ts` · `public/media/**` |
| **Forbidden files** | `app/[locale]/(marketing)/pricing/**` (S4 owns it) · `app/[locale]/layout.tsx` · `components/layout/**` · `app/[locale]/(auth)/**` · `app/[locale]/(app)/**` · `app/api/**` · `lib/api/**` · `lib/env/**` · `lib/i18n/**` · `content/**` · all docs. |
| **Dependencies** | L1 and L2 complete. Parallel with B1. |
| **Tests** | `MASTER_GOVERNANCE.md` §7's nine steps. Mobile verified separately. Every claim traced to a matrix ID. A grep for forbidden wording — hot lead, portal names, vendor logos, numeric response times, score scales, "always synced" — returns nothing. One video per route at most, poster first, never autoplaying above the fold. |
| **Commit strategy** | One commit per page or section group, explicit paths. |
| **Acceptance criteria** | No fabricated dashboard, number, logo or testimonial. **No hot lead section and no phone mockup asserting alerting.** Voice appears only as one separated future block. No WhatsApp CTA, no chat launcher. LCP is text on every page. Cal.com anchors carry the real booking URL. |

---

### S2 · Signup, Login and Session

| | |
|---|---|
| **Responsibility** | The signup surface on the confirmed facts, the login surface, sign out, and session behaviour including the expired state. The captcha reservation. |
| **Allowed files** | `app/[locale]/(auth)/**` · `components/auth/**` · `components/forms/**` |
| **Forbidden files** | `app/api/**` · `lib/api/**` · `lib/env/**` · `app/[locale]/(marketing)/**` · `app/[locale]/(app)/**` · `components/layout/**` · `components/marketing/**` · `content/**` · all docs. |
| **Dependencies** | L1, L2, B1 complete. MF-08 for the captcha widget. |
| **Tests** | Form law verified: labels always visible, reserved heights across idle, error and success, `aria-busy`, `autocomplete`, `inputmode`. `409 email_exists` routes to login with the address preserved. `400 invalid_grant` renders **one non-enumerating message** and never confirms an account exists. Session expiry captures the route and returns to it after login. **The JWT is not in `localStorage`** — verified by inspecting storage. Keyboard and screen-reader pass on both forms. |
| **Commit strategy** | One commit per surface, explicit paths. |
| **Acceptance criteria** | The trial CTA wording matches whatever `CLAIMS_MATRIX.md` T-01 approves after V1, and **not a word beyond it**. The `language` control constrained to `{en, es}` and bound to the route locale. The captcha has an accessible non-visual alternative, or the provider is rejected. Privacy line at the point of collection. **The surface is not publicly reachable until L-14 closes.** |

---

### S3 · Onboarding Wizard and Authenticated Shell

| | |
|---|---|
| **Responsibility** | The authenticated shell, the trial status band, the reminder escalation, the trial expiry plane, the wizard index and all ten step pages, progress, resume, readiness, the OAuth return handling inside a step, and the branding upload and text-field group. |
| **Allowed files** | `app/[locale]/(app)/layout.tsx` · `app/[locale]/(app)/onboarding/**` · `components/onboarding/**` · `components/status/**` · `components/trial/**` · `components/upload/**` |
| **Forbidden files** | `app/[locale]/(app)/account/**` (S4 owns it) · `app/api/**` · `lib/api/**` · `lib/env/**` · `app/[locale]/(marketing)/**` · `app/[locale]/(auth)/**` · `components/layout/**` · `components/primitives/**` · `content/**` · all docs. |
| **Dependencies** | L1, L2, B1 complete. V3 complete for the revised specification. |
| **Tests** | The seventeen items of `AUTHENTICATED_SURFACE_SYSTEM.md` §14, plus: the literals `7`, `10` and `14` do not appear as trial length, step count or extension length anywhere in source. `percent_complete` is rendered, never computed. Resume lands on `resume_step`. `externally_pending` never renders with a check or positive colour. `403 not_on_plan` renders as an upgrade path. **`reason=user_cancelled` returns the row to its previous status and renders nothing red.** CLS measured at 375 px and 1440 px. Mobile verified at 375 px and 320 px **with the keyboard open** on the longest Spanish strings. |
| **Commit strategy** | One commit per step group, explicit paths. |
| **Acceptance criteria** | The wizard is one hairline index; no card, tile or panel per step. **No third upload block** — footer and signature are a text and mode-selection group submitting plain text. Uploads accept only the four confirmed image types with the 5 MB ceiling stated before selection. The preview renders from the confirmed `preview` shape, never from a stale object URL. **No polling.** Provider names rendered from the confirmed list; **voice generic**. `missing_api_names[]` never reaches the DOM. The dashboard handoff renders an honest state until the destination is settled. |

---

### S4 · Pricing, Plan and Trial Conversion

| | |
|---|---|
| **Responsibility** | The public pricing page as **Layout B, the access model**, and the authenticated plan surface with the checkout handoff. **No price is displayed, because none exists.** |
| **Allowed files** | `app/[locale]/(marketing)/pricing/**` · `app/[locale]/(app)/account/**` · `components/pricing/**` |
| **Forbidden files** | Everything else, including all of S1's and S3's paths. |
| **Dependencies** | L1, L2, B1 complete. MF-10 for the tax line. PK-02, PK-04 and PK-05 for anything beyond plan names. |
| **Tests** | A grep for a currency symbol, a digit adjacent to one, "from €", "up to", or a comparison bar returns **nothing**. `409 already_subscribed` routes to the current plan and is not an error. `403 not_allowed` renders an honest state. Return from checkout re-reads `GET /subscription/state` and never infers success from a return URL. Mobile renders a vertical stack, never a horizontally scrolling table. |
| **Commit strategy** | One commit per surface, explicit paths. |
| **Acceptance criteria** | **Layout A is not built.** Plan names and entitlement summaries only. **No quota number and no visual implication of one** — no bars, no dots, no "up to", no comparative column heights. Checkout is a full page handoff; **no payment form, no card field, no payment iframe**. The tax line is a single constant until MF-10 resolves. |

---

### T1 · Test Harness, Contract and Accessibility Tests

| | |
|---|---|
| **Responsibility** | The test infrastructure and the tests that no surface chat can write about itself: contract conformance against the typed boundary, the forbidden-content greps as executable tests, accessibility at six breakpoints, and CLS measurement. |
| **Allowed files** | `tests/**` · `playwright.config.ts` · `vitest.config.ts` · `package.json` (**test scripts only, this wave**) |
| **Forbidden files** | Everything under `app/`, `components/`, `lib/`, `content/`, `public/`, `docs/`. |
| **Dependencies** | At least one surface chat complete. **`package.json` is owned by H1 in Wave H and by T1 in Wave T, never concurrently.** |
| **Tests** | Its own suite runs green, and each guard test is proven by deliberately introducing the violation it catches and observing a failure. |
| **Commit strategy** | One commit per suite, explicit paths. |
| **Acceptance criteria** | Executable guards for: no hardcoded `7`, `10` or `14`; no currency symbol; no technical identifier reaching the DOM; no retired host or secret shape; no `demo/book` handler; no `localStorage` JWT; no polling interval against a status endpoint; every EN key having an ES key. Axe passes at 320, 375, 768, 1024, 1440 and 1920 px. **No test performs a network call to any real host**; every contract test runs against fixtures. |

---

### AU1 · Independent Technical and Final Audit

| | |
|---|---|
| **Responsibility** | Verify every other chat's work. Authored nothing, so it releases nothing of its own (R1). Re-verify every P0 and P1 fix (R10). |
| **Allowed files** | **None. Read only**, except `docs/website_redesign/AUDIT_LOG.md`. |
| **Forbidden files** | Everything else. |
| **Dependencies** | Runs at every wave close. |
| **Tests** | Independently re-runs every other chat's stated tests rather than accepting the reported result. |
| **Commit strategy** | One commit, one path. |
| **Acceptance criteria** | Every claim on every built page traced to a matrix ID. Every environment variable correctly classified. No fabricated dashboard, number, logo, testimonial or badge anywhere, images included. No control that looks active and does nothing. **No price anywhere.** No hot lead surface. `externally_pending` never rendered as complete. The twenty binding facts of §2 each verified individually. |

---

## 6. Parallel safety map

**Can start immediately, in parallel, no shared file, no open dependency:**

> **V1** · **V3** · **V4**

**V2** starts when V1 finishes. **H1 runs alone**, before any environment variable exists, and no
other chat commits while it stages.

| Wave | Safe in parallel | Must be sequential |
|---|---|---|
| V | V1, V3, V4 | V2 after V1 |
| F | F1, F2 | — |
| L | L1, L2 | L2 after V2 |
| B / S | B1, S1 | S2, S3, S4 after B1 |
| S | S1, S2, S3, S4 | — (all four disjoint) |
| T / A | T1, AU1 | T1 after one surface chat |

**File-level proof of disjointness at the widest point** — S1, S2, S3, S4 and B1 running together:

| Chat | Exclusive roots |
|---|---|
| B1 | `app/api/**` |
| S1 | `app/[locale]/(marketing)/**` minus `pricing/`, `components/marketing/**`, `components/product-surface/**`, `lib/media-manifest.ts`, `public/media/**` |
| S2 | `app/[locale]/(auth)/**`, `components/auth/**`, `components/forms/**` |
| S3 | `app/[locale]/(app)/layout.tsx`, `app/[locale]/(app)/onboarding/**`, `components/onboarding/**`, `components/status/**`, `components/trial/**`, `components/upload/**` |
| S4 | `app/[locale]/(marketing)/pricing/**`, `app/[locale]/(app)/account/**`, `components/pricing/**` |

No root appears twice. The one carve-out — `pricing/` out of S1 and into S4 — is stated in both
chats' forbidden lists so neither can drift into it.

---

## 7. Commit procedure, for every chat

```
git status --porcelain                       # 1. inspect before touching the index
git add <exact/path/one> <exact/path/two>    # 2. explicit paths only, never a dot, never a directory
git diff --cached --name-only                # 3. verify what is staged, before committing
git commit -m "docs(claims): apply v2 corrections V2-01..V2-12 to CLAIMS_MATRIX.md"
```

Forbidden everywhere: `git add .`, `git add -A`, `git add <directory>`, `git commit -a`, `git push`,
`git merge`, `git rebase`, `git reset --hard`, any history rewrite, any force operation, any deployment.

Prefixes: `docs(truth)`, `docs(claims)`, `docs(copy)`, `docs(design)`, `docs(governance)`,
`docs(audit)`, `chore(repo)`, `feat(tokens)`, `feat(contract)`, `feat(shell)`, `feat(i18n)`,
`feat(marketing)`, `feat(bff)`, `feat(auth)`, `feat(onboarding)`, `feat(pricing)`, `test(...)`.

Completion wording, always: *Implemented and awaiting independent technical and final audit.*

---

## 8. What this wave still cannot deliver

| Not deliverable | Reason |
|---|---|
| Any end-to-end verification | Needs the owner's §14 staging ratification **and** an explicitly approved target. v2 §A item 1 permits it in principle; governance has not yet been amended |
| The authenticated tree behind a public URL | **L-14, launch blocking**, and materially enlarged by signup, sessions, team data, uploads and checkout |
| Any price, anywhere | **No pricing authority exists in the backend.** MF-10 is an owner and legal question, not a formatting one |
| A testimonial video field | MF-01. `media_ref` is a string; there is no upload pipeline. **BACKEND IMPLEMENTATION REQUIRED** |
| Any hot lead surface or claim | Out of scope for the website. `CLAUDE.md`'s mandate cannot be honoured |
| A dashboard | AD-01. A website and owner decision, with `/{locale}/app` recommended |
| A demo booking backend | **PROPOSED.** Cal.com remains an existing external option |
| A chat, voice or WhatsApp concierge | **RESERVED** |
| A public WhatsApp CTA | No number exists. R7 forbids inventing one |
| Any vendor logo | Trademark permission, not technical evidence |
| Named portal integrations | Not in v2. `REJECTED` unchanged |
| Voice as a present-tense capability | V-01 unchanged. Connecting a voice channel is not evidence of voice AI |
| A published language count | The twelve certified AI runtime languages describe the AI runtime, not the website. B-07 unchanged |
| Photography, videos, product captures | None exist. Every surface ships as a `pending` frame, which is honest |
| Clearance of any legal dependency | No chat may clear a legal hold |

---

## Status

Wave replanned against export-v2 and the AF addendum, both SHA256 verified. Twenty binding facts
fixed. Thirteen chats across eight waves, with exclusive and provably disjoint file ownership, per
chat responsibility, allowed and forbidden files, dependencies, tests, commit strategy and acceptance
criteria. Three chats can start immediately in parallel. Repository hygiene is a hard precondition
for every chat that touches an environment variable.

No page implemented. No API built. No system contacted. Nothing pushed, merged or deployed.
**No production readiness claim made.**

**Implemented and awaiting independent technical and final audit.**
