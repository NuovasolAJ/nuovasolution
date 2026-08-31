# FINAL WEBSITE INTEGRATION PLAN — NuovaSolution

**Author:** Final Website Reconciliation Director (Chat 5)
**Branch:** `website_enterprise_redesign`
**Created:** 2026-08-31
**Inputs:** `FINAL_RECONCILIATION_REPORT.md`, `INTEGRATION_COMPATIBILITY_MATRIX.md`,
`backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v1.md`, and the six existing governance documents.

> This is a plan. Nothing in it has been executed. It authorises no push, no merge, no deployment, no
> preview, and no contact with any product system. It makes no production readiness claim.

---

## 1. Authority ranking (binding for every chat in this wave)

| # | Document | Authority |
|---|---|---|
| 1 | `backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v1.md` | **Technical.** Endpoints, payloads, status values, environment variable names, auth, routing, legacy removal. |
| 2 | `CLAIMS_MATRIX.md` | **Public claims.** Backend confirmation never converts a `LEGAL` or `REJECTED` verdict. |
| 3 | `PRODUCT_TRUTH.md` | **Confirmed product scope** and required qualification. |
| 4 | `COPY_AND_CONVERSION_MASTER.md` | **Copy.** Must be adapted to 1, 2 and 3. |
| 5 | `LUXURY_UX_MEDIA_SYSTEM.md` | **Visual and structural authority.** |
| 6 | `FINAL_RECONCILIATION_REPORT.md` | **Conflict decisions.** |
| — | `MASTER_GOVERNANCE.md` | **Process, severity, release and access discipline.** Not displaced by the handoff. §14 and §15 remain absolute. |
| — | `CLAUDE.md` | Stale on visual direction and positioning. Not edited without owner approval. |

**No single implementation chat may override this ranking.** A chat that believes the ranking produces
a wrong result logs a conflict and stops on that item only.

---

## 2. Non negotiable rules for every chat in this wave

1. **No `git add .`. No `git add -A`. No `git add <directory>`.** Every chat stages explicitly named
   file paths, and only paths it owns.
2. **Before staging:** run `git status --porcelain` and confirm nothing foreign is in the working tree
   that could be swept. **After staging, before committing:** run `git diff --cached --name-only` and
   confirm the list matches the intended paths exactly. If it does not, unstage and start again.
3. **No two chats in the same wave touch the same file.** Ownership below is exclusive.
4. **No push, no merge, no deployment, no preview** without explicit per occasion owner approval
   (`MASTER_GOVERNANCE.md` §15). Local commits only.
5. **No contact with any product system.** No webhook, no workflow change, no server access, no
   database access, no integration test, no health check, no ping (`MASTER_GOVERNANCE.md` §14.1).
   This includes staging until owner decision 1 in the report §10 is answered.
6. **No invention.** No endpoint, payload field, status value, capability, URL, price, number, phone
   number or environment variable value outside the handoff. Environment variable **names** only.
7. **No secret value is ever written, echoed, logged, quoted or committed**, including in a commit
   message or a report.
8. **Product CTA lockdown holds.** Every product CTA is a disabled or clearly marked placeholder until
   the owner grants an explicit per action release recorded in the activation register.
9. **No chat declares its own work acceptable** (R1). Completion wording is exactly: *Implemented and
   awaiting independent technical and final audit.*
10. **`LIVE` and `PRODUCTION READY` are not used** in any document, commit message or report.
11. **No em dash, en dash or parenthetical dash in public website copy**, in either language.
12. **Uncommitted owner changes are preserved.** `app/v2/`, `components/v2/`, `lib/os/`, the root
    `.mp4` and `backend_handoff/` are not deleted, moved or overwritten by any chat that does not own
    them.

---

## 3. TASK 8 — Skills and access assessment

Nothing is installed. Nothing is downloaded from GitHub. No general n8n access is requested. Where
information is missing, the **exact missing field** is named (report §9), never a request for server
access.

| Skill or access | Needed for | Why existing capability is insufficient | Risk | Recommendation | When required |
|---|---|---|---|---|---|
| **General n8n access / `n8n-mcp` server** | Nothing in this wave | The handoff is self contained and states that no other Nuova file is required to implement against it. n8n is hidden internal infrastructure that the public website never touches. The configured server also failed to connect this session, and it points at the **retired** cloud instance. | High. Would breach `MASTER_GOVERNANCE.md` §14.1 items 3 and 6 | **NICHT ERFORDERLICH.** The configuration is removed as a hygiene item, not repaired | Never |
| **Supabase or database access** | Nothing in this wave | Handoff §5 and Appendix A give the full contract and the backend function map. The website calls the BFF, not the database | High. Breaches §14.1 item 4 | **NICHT ERFORDERLICH** | Never |
| **Production hosting, DNS, domains, production environment variables** | Nothing in this wave | The website is built locally against typed contracts | High. Breaches §14.1 and §15 | **NICHT ERFORDERLICH** | Never |
| **Backend handoff export-v2** carrying MF-01 … MF-12 | Testimonial surface, hot lead copy, dashboard destination, all error copy, wizard rendering, upload validation, captcha, plan display, provider names | The fields are simply absent from export-v1. No amount of reasoning produces them, and inventing them is forbidden | None | **VOR IMPLEMENTIERUNG ERFORDERLICH** for the surfaces each field blocks. Other surfaces proceed without it | Before Wave D3 and D4 |
| **Written owner ruling on §14 versus staging calls** (report §10 decision 1) | Any execution of any BFF route against a real host | §14 currently forbids it in plain text, and §14.4 forbids resolving it by proceeding | Critical if assumed rather than granted | **OWNER MUSS BEREITSTELLEN.** Until then every BFF route is written and typed but never executed | Before any `END TO END VERIFICATION` |
| **Staging environment values** (names in matrix §5) | Wiring the BFF against staging | Values cannot be invented (R7) | Medium. Must never enter the repository | **OWNER MUSS BEREITSTELLEN**, in Vercel environment settings, never in a file | Before Wave D3 execution, not before D3 scaffolding |
| **Vercel project access / deployment token** | Setting encrypted environment scoping, preview environment separation | The website chat has no Vercel access and must not have it by default | Medium | **NUR FÜR FINALEN STAGING TEST**, and only with per occasion approval under §15 | Wave E only |
| **Captcha provider account and keys** (MF-08) | Signup and any public form | `NEXT_PUBLIC_CAPTCHA_SITE_KEY` and `CAPTCHA_SECRET_KEY` are names only; the provider is not named | Low | **OWNER MUSS BEREITSTELLEN** | Before Wave D3 signup route |
| **Browser automation for visual and accessibility verification** (e.g. an axe pass at 320, 375, 768, 1024, 1440, 1920) | `MASTER_GOVERNANCE.md` §7 phase close steps 4 to 8, and `LUXURY_UX_MEDIA_SYSTEM.md` §7's "verified, not assumed" WCAG 2.2 AA target | Build, type check and lint can be run today. Contrast, focus order, reflow at 400 % zoom, text spacing overrides and screen reader behaviour cannot be verified by reading code | Low. Local only, no external system | **VOR IMPLEMENTIERUNG ERFORDERLICH** for the Wave D phase close. **OPTIONAL** for Waves A to C, which produce no rendered surface | Wave D phase close |
| **Font files** (Inter variable, Newsreader, woff2, `latin` + `latin-ext`) — AS-02 | Self hosting via `next/font/local`, deleting the render blocking Google Fonts `@import` (audit A-05) | Both faces are SIL OFL 1.1 and self hostable, but this wave downloads nothing | Low | **OWNER MUSS BEREITSTELLEN** the files, or approve a specific acquisition route | Wave C1 |
| **Logo as SVG**, ivory and `ink-950` versions — AS-01 | Header, footer, mobile sheet, OG images. Replaces the `filter: brightness(0) invert(1)` hack | Only five pure black PNGs exist, two duplicated. Redesigning the logo is forbidden | Low | **OWNER MUSS BEREITSTELLEN** | Wave D1 |
| **Photography, product captures, videos** — AS-05, AS-06, AS-07 | `H-09`, every `PD-03`, `ON-02`, every product surface | None exists. Fabricating any of it is a P0 violation (R6, LUXURY §5.11) | High if fabricated | **OWNER MUSS BEREITSTELLEN**, and LUXURY D-04 (demonstration workspace) must be approved first. Until then every surface ships as a `ProductSurface` `pending` frame, which is honest and causes zero layout shift | Wave D2 and later; not blocking |
| **Legal counsel review** of the fourteen L-dependencies, with the enlarged L-14 first | Site wide launch | Not a capability question. No chat may clear a legal hold | Critical | **OWNER MUSS BEREITSTELLEN**, as a track running in parallel from now | Continuous; launch blocking |
| **Cal.com event confirmation** (`nuovasolution/demo`, per language?) | Fixing audit A-02 correctly | The event exists in code but was never confirmed as current | Low | **OWNER MUSS BEREITSTELLEN** | Wave D2 |
| **GitHub Actions enablement** for the handoff §8 CI guard as a required check | Preventing reintroduction of a retired host or a secret shaped literal | The script can be written locally; making it a required check is a repository setting | Low | **OWNER MUSS BEREITSTELLEN** | Wave B |
| **Additional AI or design skills** (workflow orchestration, artifact publishing, research skills) | Nothing in this wave | The work is document reconciliation and Next.js implementation against a written contract. No skill adds measurable value and each adds a surface for invention | Low, but non zero: an unconstrained generative skill is exactly how invented claims enter a governed project | **NICHT ERFORDERLICH** | Never |

**Summary.** Nothing needs to be installed. The wave is gated by **owner supplied information and one
governance ruling**, not by tooling. The single highest value item is a written answer on staging calls
(report §10 decision 1); without it the wave can build everything and verify nothing.

---

## 4. TASK 9 — The Final Website Integration Wave

Nine chats across five waves plus one standing audit role. Ownership is exclusive: **no file appears in
two chats' allowed lists.**

### 4.0 Wave overview

| Wave | Chats | Runs in parallel | Gate to enter |
|---|---|---|---|
| **A — Document reconciliation** | A1, A2, A3, A4 | A1, A3, A4 in parallel. A2 after A1 | None. **Can start immediately.** |
| **B — Repository safety** | B1 | Alone | Owner decision 8 (hygiene and rotation state) |
| **C — Foundation** | C1, C2 | In parallel | B1 complete; A3 and A4 complete; AS-02 supplied |
| **D — Surfaces** | D1, D2, D3, D4 | D1 first, then D2/D3/D4 in parallel | C1 and C2 complete; A1 and A2 complete; export-v2 for D3/D4 |
| **E — Verification** | E1 | Alone, read only | Any wave close |

---

### A1 — Truth and Claims Reconciliation Chat

| | |
|---|---|
| **Name** | Truth and Claims Reconciliation |
| **Responsibility** | Apply `FINAL_RECONCILIATION_REPORT.md` §3 to the two truth documents. Update capability status categories where the handoff supplies evidence. Update every affected verdict. Add the new status vocabulary. Do not soften a single legal hold. |
| **Allowed files** | `docs/website_redesign/PRODUCT_TRUTH.md`, `docs/website_redesign/CLAIMS_MATRIX.md` |
| **Forbidden files** | Everything else in the repository, without exception. Especially `COPY_AND_CONVERSION_MASTER.md`, `LUXURY_UX_MEDIA_SYSTEM.md`, `CLAUDE.md`, the three Chat 5 documents, and all application code. |
| **Dependencies** | None. Can start immediately. |
| **Input documents** | The handoff, `FINAL_RECONCILIATION_REPORT.md` §3 and §4, `INTEGRATION_COMPATIBILITY_MATRIX.md` §2 |
| **Output** | `PRODUCT_TRUTH.md` with Category 1 still empty but a new **"Backend confirmed, not end to end verified"** classification applied to the surfaces in matrix §2. `CLAIMS_MATRIX.md` with F-07 moved to `OWNER` (text) and logos held, O-01 and O-02 resolved, PK-08 and O-07's technical half answered, T-01 scoped precisely to "free", and every L-dependency **unchanged**. A short changelog section listing every verdict that moved and why. |
| **Commit strategy** | Two commits, one per file. `git add docs/website_redesign/PRODUCT_TRUTH.md` then commit; then `git add docs/website_redesign/CLAIMS_MATRIX.md` then commit. Message names the file and the conflict IDs applied. |
| **Acceptance criteria** | (a) Every conflict C-08 to C-25 is either applied or explicitly declined with a reason. (b) No legal hold weakened. (c) No new claim invented. (d) `git diff --cached --name-only` showed exactly one path per commit. (e) Report §11's status change table reconciles line by line against the result. |

---

### A2 — Copy Reconciliation Chat

| | |
|---|---|
| **Name** | Copy Reconciliation |
| **Responsibility** | Apply `FINAL_RECONCILIATION_REPORT.md` §4's 44 verdicts to the copy master. Remove what must be removed, rewrite what must be rewritten, mark what is integration pending, and draft nothing that is legally held. Strip every em dash from every quoted matrix string per conflict C-24. |
| **Allowed files** | `docs/website_redesign/COPY_AND_CONVERSION_MASTER.md` |
| **Forbidden files** | Everything else. Especially `CLAIMS_MATRIX.md` and `PRODUCT_TRUTH.md`, which A1 owns. |
| **Dependencies** | **A1 must complete first.** Copy verdicts derive from matrix verdicts, and running these two in parallel produces two divergent registers, which is the failure `COPY_AND_CONVERSION_MASTER.md` §13 already warns about. |
| **Input documents** | A1's output, `FINAL_RECONCILIATION_REPORT.md` §4 and §4.1, `INTEGRATION_COMPATIBILITY_MATRIX.md` §4 |
| **Output** | The copy master reconciled a third time. New sections for the authenticated journey copy that **can** be written (step names, status labels, resume prompt), and a clearly marked list of the ten passages in report §4.1 that cannot. The two remaining "30 minute call" occurrences removed. |
| **Commit strategy** | One commit, one path: `git add docs/website_redesign/COPY_AND_CONVERSION_MASTER.md`. |
| **Acceptance criteria** | (a) All 44 verdicts applied or declined with a reason. (b) Zero dashes in any customer facing string in either language. (c) No trial "free" wording, no hot lead wording, no reactivation wording, no numeric response time, no score scale, no portal or CRM logo, no invented statistic. (d) Every new string carries its matrix ID. (e) Spanish strings written natively, not translated. |

---

### A3 — Authenticated Experience Design Chat

| | |
|---|---|
| **Name** | Authenticated Experience Design |
| **Responsibility** | Close the seventeen gaps in `FINAL_RECONCILIATION_REPORT.md` §5.2 by **extending** the existing system, never by starting a second one. Specify: signup and login page architecture, the trial banner, the ten step wizard shell, progress and resume, readiness, the eight status values as visual specifications, provider failure and OAuth return states, the file upload law, the authenticated upgrade surface, the API envelope error treatments, and mobile onboarding. |
| **Allowed files** | `docs/website_redesign/LUXURY_UX_MEDIA_SYSTEM.md`, and one new file `docs/website_redesign/AUTHENTICATED_SURFACE_SYSTEM.md` |
| **Forbidden files** | Everything else. All application code. `CLAUDE.md`. |
| **Dependencies** | None. Can start immediately, in parallel with A1 and A4. |
| **Input documents** | `FINAL_RECONCILIATION_REPORT.md` §5, `INTEGRATION_COMPATIBILITY_MATRIX.md` §2, §3.3, §3.4, §4 |
| **Output** | The seventeen gaps closed, each obeying report §5.3's ten binding constraints. Every new surface uses the existing tokens, type scale, alignment law, radius law, motion budget and anti pattern list. No new colour ships without a computed contrast ratio added to §2.3. |
| **Commit strategy** | Two commits: the new file first, then the amendment to `LUXURY_UX_MEDIA_SYSTEM.md`. Explicit paths only. |
| **Acceptance criteria** | (a) All seventeen gaps closed. (b) The wizard is specified as a hairline index, not a card grid. (c) All eight status values have icon + text + colour specifications on both canvases with computed ratios. (d) `externally_pending` cannot render as complete. (e) `locked_by_plan` uses the honest state treatment, not an error treatment. (f) No technical identifier is ever rendered. (g) The §1.3 anti pattern list still passes against every new surface. (h) File upload law exists. (i) Mobile composition specified at 375 px, not inferred. |

---

### A4 — Governance and Contract Update Chat

| | |
|---|---|
| **Name** | Governance and Contract Update |
| **Responsibility** | Adopt the ten value status vocabulary into the governance layer. Replace `INTEGRATION_CONTRACT.md`'s four value vocabulary. Correct `IMPLEMENTATION_STATUS.md`'s stale gate (4 of 4, not 3 of 4) and its conflict register. Record the three commit collisions of report §2.4 as a documentary correction, without rewriting history. Correct `CURRENT_SITE_AUDIT.md`'s incomplete `/v2` inventory and its A-01 disagreement with `CLAIMS_MATRIX.md` §21 item 18. Add the eleven actions of the handoff, plus the reserved and proposed items, to the contract. |
| **Allowed files** | `docs/website_redesign/MASTER_GOVERNANCE.md`, `docs/website_redesign/INTEGRATION_CONTRACT.md`, `docs/website_redesign/IMPLEMENTATION_STATUS.md`, `docs/website_redesign/CURRENT_SITE_AUDIT.md` |
| **Forbidden files** | The four source of truth documents. The three Chat 5 documents. `CLAUDE.md`. All application code. |
| **Dependencies** | None. Can start immediately, in parallel with A1 and A3. |
| **Input documents** | `FINAL_RECONCILIATION_REPORT.md` in full |
| **Output** | Governance carrying the new vocabulary; a contract covering every handoff surface with its five UI states; a status file that tells the truth about the gate and the collisions; an audit whose findings agree with the other documents. §14 is **not** relaxed. The staging question (report C-14) is added as an escalation under §14.4, not resolved. |
| **Commit strategy** | Up to four commits, one per file, explicit paths. Never two files in one `git add`. |
| **Acceptance criteria** | (a) `LIVE` and `PRODUCTION READY` no longer appear in any of the four files. (b) The gate reads 4 of 4. (c) All three commit collisions recorded. (d) The activation register is still empty and the lockdown is still absolute. (e) §14 and §15 unchanged in force. (f) No history rewritten. |

---

### B1 — Repository Hygiene, Secret Containment and Deployment Safety Chat

| | |
|---|---|
| **Name** | Repository Hygiene and Deployment Safety |
| **Responsibility** | Make the repository safe to hold an environment variable. Untrack build output and tooling state. Remove the retired n8n Cloud configuration. Write the CI guard. Write deployment configuration and the example environment file. Fix nothing else. |
| **Allowed files** | `.gitignore`, `.mcp.json` (**removal only**), `.claude/settings.local.json` (**untrack only**), `tsconfig.tsbuildinfo` (untrack), `.next/` (untrack), `vercel.json` (new), `next.config.js`, `.env.example` (new), `scripts/ci-guard.sh` (new), `.github/workflows/ci-guard.yml` (new) |
| **Forbidden files** | Everything under `app/`, `components/`, `lib/`, `translations/`, `public/`, `docs/`, and `package.json`. `CLAUDE.md`. |
| **Dependencies** | Owner decision 8 (report §10): confirm the rotation state of the credential in `.mcp.json` and the repository's visibility. **Runs alone. No other chat commits while this one is staging**, because `git rm --cached` operates on the whole index. |
| **Input documents** | `FINAL_RECONCILIATION_REPORT.md` §6 and §7, handoff §6, §8, §9 |
| **Output** | `.gitignore` covering `node_modules`, `.next`, `.vercel`, `*.tsbuildinfo`, `.env*` (except `.env.example`), `.mcp.json`, `.claude/settings.local.json`, OS artefacts. 180 `.next` files plus three others untracked. The retired n8n configuration deleted. `.env.example` carrying **names only**, exactly as classified in matrix §5. `vercel.json` with security headers and immutable media cache headers. `next.config.js` with `images.formats` AVIF and WebP. The §8 CI guard scoped to `./app ./components ./lib ./.next`, wired as a pre build script and a required GitHub Actions check. |
| **Commit strategy** | Three commits: (1) untracking, `git add .gitignore` plus the explicit `git rm --cached` paths; (2) deployment configuration, `git add vercel.json next.config.js .env.example`; (3) CI guard, `git add scripts/ci-guard.sh .github/workflows/ci-guard.yml`. Each commit verified with `git diff --cached --name-only` first. |
| **Acceptance criteria** | (a) `git ls-files .next \| wc -l` returns 0. (b) `.mcp.json` no longer tracked and the retired connection gone. (c) No secret value appears in any committed file, including `.env.example`. (d) The CI guard fails on a deliberately introduced test string and passes on the clean tree. (e) The guard is not pointed at `docs/`, which legitimately contains the pattern list. (f) No file outside the allowed list changed. (g) No rotation performed and no history rewritten. |

---

### C1 — Design Tokens and Global Foundation Chat

| | |
|---|---|
| **Name** | Design Tokens and Global Foundation |
| **Responsibility** | Replace the three competing colour systems with the single token layer. Self host fonts. Establish the spacing, type, radius, shadow and motion tokens. Build the `Reveal` primitive with the no-JS safety pattern. Nothing else. |
| **Allowed files** | `app/globals.css`, `tailwind.config.ts`, `postcss.config.js`, `app/layout.tsx`, `lib/tokens/**`, `lib/motion/**`, `public/fonts/**` |
| **Forbidden files** | Everything under `components/`, `app/[locale]/**`, `app/api/**`, `lib/api/**`, `lib/env/**`, `translations/`, `docs/`. |
| **Dependencies** | B1 complete. A3 complete. AS-02 font files supplied. |
| **Input documents** | `LUXURY_UX_MEDIA_SYSTEM.md` §2, §3, §4; A3's output |
| **Output** | One token source. `--ns-*`, `brand.*` and inline hex removed. Google Fonts `@import` deleted, `next/font/local` with exactly one preload. Blanket `overflow-x: hidden` removed. `100vh` removed. The `Reveal` primitive renders content at full opacity with JavaScript disabled. |
| **Commit strategy** | Grouped commits by concern (tokens, fonts, motion primitive), explicit paths per commit. |
| **Acceptance criteria** | Build, type check and lint executed. Every colour pair in use appears in the §2.3 computed table. No radius above 8 px. No pill button. Content fully legible with JavaScript disabled. Reduced motion honoured. First load JS measured and recorded. |

---

### C2 — Typed API Boundary Chat (no execution)

| | |
|---|---|
| **Name** | Typed API Boundary and Environment Module |
| **Responsibility** | Express the handoff contract as types and a client boundary that **is never executed**. Build the server only environment module. Define the error envelope mapping and the eight status value union. No route handler, no network call, no test against any host. |
| **Allowed files** | `lib/env/**`, `lib/api/**`, `types/**` |
| **Forbidden files** | `app/api/**` (D3 owns it), `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`, all components, all docs. |
| **Dependencies** | B1 complete. Can run in parallel with C1. |
| **Input documents** | Handoff §1, §5, §6; `INTEGRATION_COMPATIBILITY_MATRIX.md` §3 and §5 |
| **Output** | Typed request and response shapes for all 27 implementable surfaces (28 minus the `PROPOSED` demo booking, which is **not** typed as real). A server only environment accessor that throws at module load if a server variable is read in a client context. The `{ ok, code, message, details, request_id }` envelope type. The status unions. Every value read from an environment variable; **no target string anywhere in source**. |
| **Commit strategy** | Grouped by concern, explicit paths. |
| **Acceptance criteria** | (a) Type check passes. (b) Zero network calls exist in the module. (c) `POST /demo/book` is present only as a commented `PROPOSED` note, not as a typed client method. (d) No `NEXT_PUBLIC_` name carries a server only value. (e) No hardcoded host, path prefix or origin. (f) A grep for the retired host patterns returns nothing. |

---

### D1 — Locale Routing and Global Shell Chat

| | |
|---|---|
| **Name** | Locale Routing and Global Shell |
| **Responsibility** | Route based locales, the header, the mega menu, the mobile sheet, the footer, the language switcher, `metadataBase`, canonicals, `hreflang`, `sitemap.ts`, `robots.ts`, `not-found.tsx`, `error.tsx`, `loading.tsx`. |
| **Allowed files** | `app/[locale]/layout.tsx`, `app/[locale]/not-found.tsx`, `app/[locale]/error.tsx`, `app/[locale]/loading.tsx`, `app/sitemap.ts`, `app/robots.ts`, `middleware.ts`, `components/layout/**`, `lib/i18n/**`, `translations/**` |
| **Forbidden files** | `app/[locale]/(marketing)/**`, `app/[locale]/(app)/**`, `app/api/**`, `lib/api/**`, `lib/env/**`, `app/globals.css`, `tailwind.config.ts`, all docs. |
| **Dependencies** | C1 complete. Owner decisions 10 and 11 (locale strategy and route naming). AS-01 logo SVG supplied. |
| **Input documents** | `LUXURY_UX_MEDIA_SYSTEM.md` §5.2 … §5.5, §5.12, §9.1; A2's navigation and footer copy |
| **Output** | Spanish becomes linkable, shareable and indexable. `<html lang>` correct per route. Audit A-04 and A-13 closed. `Log in` **not rendered** until the destination exists (MF-03). |
| **Commit strategy** | Grouped by concern, explicit paths. |
| **Acceptance criteria** | Phase close checklist all nine steps. Verified at 320, 375, 768, 1024, 1440 and 1920 px. No `!important`. Header identical on every page. No WhatsApp CTA, no chat launcher, no `Log in` link to nowhere. |

---

### D2 — Public Marketing Pages Chat

| | |
|---|---|
| **Name** | Public Marketing Pages |
| **Responsibility** | Compose the homepage and every public page from A2's cleared copy and A3's page architecture. Fix audit A-02 (real `href` with progressive enhancement) and A-03 (relative internal links). Every product surface ships as a `ProductSurface` `pending` frame. |
| **Allowed files** | `app/[locale]/(marketing)/**`, `components/marketing/**`, `components/product-surface/**`, `lib/media-manifest.ts`, `public/media/**` |
| **Forbidden files** | `app/[locale]/layout.tsx`, `components/layout/**`, `app/[locale]/(app)/**`, `app/api/**`, `lib/api/**`, `lib/env/**`, `lib/i18n/**`, `translations/**`, all docs. |
| **Dependencies** | D1 complete. A2 complete. |
| **Input documents** | A2's output, `LUXURY_UX_MEDIA_SYSTEM.md` §9.2 … §9.10 |
| **Output** | The public site, with no fabricated dashboard, no invented number, no named portal, no vendor logo, no hot lead claim, no voice present tense, no trial "free" wording, no WhatsApp CTA and no chat launcher. Voice appears only as V-02's one separated future block. |
| **Commit strategy** | One commit per page or per section group, explicit paths. |
| **Acceptance criteria** | Phase close checklist all nine steps. Every claim traceable to a matrix ID. Every `ProductSurface` in a declared state. LCP is text on every page. One video per route at most, poster first, never autoplaying above the fold. Mobile verified separately. |

---

### D3 — BFF Route Chat (written, not executed)

| | |
|---|---|
| **Name** | BFF Routes |
| **Responsibility** | Implement the 26 BFF route handlers from `INTEGRATION_COMPATIBILITY_MATRIX.md` §3.2 against C2's typed boundary, plus provider OAuth callback and checkout webhook routes. **Executes nothing against any host.** |
| **Allowed files** | `app/api/**` |
| **Forbidden files** | Everything else. Including `lib/api/**` and `lib/env/**`, which C2 owns and this chat only imports. |
| **Dependencies** | C2 complete. B1 complete. Export-v2 for MF-04 (error codes), MF-07, MF-08, MF-09, MF-12. **Owner decision 1 before any execution.** |
| **Input documents** | Handoff §1, §5, §6, §7, §9; matrix §3 and §6 |
| **Output** | Route handlers that read every target from an environment variable, hold every privileged secret server side, verify webhook signatures server side, set CORS to the exact allowed origin, and return the uniform envelope. `POST /demo/book` is **not** implemented. |
| **Commit strategy** | One commit per surface group, explicit paths. |
| **Acceptance criteria** | (a) Type check and build pass. (b) The CI guard passes. (c) No server only variable is importable from a client component. (d) No provider token, client secret or service key can appear in a response body, verified by reading every return path. (e) No route was executed against any host. (f) No `/demo/book`. (g) Every route documented in `INTEGRATION_CONTRACT.md` by A4 before it is written. |

---

### D4 — Authenticated Surfaces Chat

| | |
|---|---|
| **Name** | Authenticated Surfaces |
| **Responsibility** | Signup, login, the trial banner, the ten step wizard with resume, readiness, trial expiry, the testimonial surface (built but not publicly linked, and legally held), plan selection and upgrade. Every product CTA remains a marked placeholder until individually released. |
| **Allowed files** | `app/[locale]/(app)/**`, `components/app/**`, `components/forms/**` |
| **Forbidden files** | `app/api/**`, `lib/api/**`, `lib/env/**`, `app/[locale]/(marketing)/**`, `components/marketing/**`, `components/layout/**`, `lib/i18n/**`, `translations/**`, all docs. |
| **Dependencies** | D1, C2 and A3 complete. Export-v2 for MF-01, MF-03, MF-05, MF-06, MF-07. Owner decision 2 (dashboard destination). |
| **Input documents** | A3's output, matrix §4 steps 3 to 13, A2's authenticated copy |
| **Output** | The confirmed journey, rendered honestly, gated. `externally_pending` never shown as done. `locked_by_plan` as an upgrade path. No technical identifier visible. No hardcoded 7 and no hardcoded 14. Progress rendered from `percent_complete`. Resume lands on `resume_step`. |
| **Commit strategy** | One commit per journey step group, explicit paths. |
| **Acceptance criteria** | Phase close checklist all nine steps, with mobile verified separately at 375 px for the wizard specifically. All eight status values render as icon + text + colour. Every form obeys `LUXURY_UX_MEDIA_SYSTEM.md` §5.6 including the reserved height rule. No surface publicly reachable before C-22 (privacy policy) closes. The testimonial surface is present, marked legally held, and not linked from any public page. |

---

### E1 — Independent Technical and Final Audit Chat

| | |
|---|---|
| **Name** | Independent Audit |
| **Responsibility** | Verify the work of every other chat. Authored nothing, so it may release nothing of its own (R1). Re-verify every P0 and P1 fix (R10). |
| **Allowed files** | **None. Read only**, except one new file `docs/website_redesign/AUDIT_LOG.md`. |
| **Forbidden files** | Everything else. |
| **Dependencies** | Runs at the close of each wave. |
| **Input documents** | All of them |
| **Output** | Findings triaged P0 to P3, with the specific file and line, and a re-verification record for every P0 and P1 fixed by its author. |
| **Acceptance criteria** | Every claim on every built page traced to a matrix ID. Every environment variable classified correctly. A grep for retired hosts and secret shaped literals over source and build output returns nothing. No fabricated dashboard, number, logo, testimonial or badge anywhere, including inside images. No control that looks active and does nothing. |

---

### 4.1 File ownership map (collision proof)

| Path | Owned by | Wave |
|---|---|---|
| `docs/website_redesign/PRODUCT_TRUTH.md`, `CLAIMS_MATRIX.md` | A1 | A |
| `docs/website_redesign/COPY_AND_CONVERSION_MASTER.md` | A2 | A |
| `docs/website_redesign/LUXURY_UX_MEDIA_SYSTEM.md`, `AUTHENTICATED_SURFACE_SYSTEM.md` | A3 | A |
| `docs/website_redesign/MASTER_GOVERNANCE.md`, `INTEGRATION_CONTRACT.md`, `IMPLEMENTATION_STATUS.md`, `CURRENT_SITE_AUDIT.md` | A4 | A |
| `docs/website_redesign/FINAL_RECONCILIATION_REPORT.md`, `INTEGRATION_COMPATIBILITY_MATRIX.md`, `FINAL_WEBSITE_INTEGRATION_PLAN.md` | **Chat 5 only. Frozen for this wave.** | — |
| `docs/website_redesign/AUDIT_LOG.md` | E1 | E |
| `docs/website_redesign/backend_handoff/**` | **Owner only. No chat edits it.** | — |
| `.gitignore`, `.mcp.json`, `vercel.json`, `next.config.js`, `.env.example`, `scripts/**`, `.github/**`, `.claude/settings.local.json` | B1 | B |
| `app/globals.css`, `tailwind.config.ts`, `postcss.config.js`, `app/layout.tsx`, `lib/tokens/**`, `lib/motion/**`, `public/fonts/**` | C1 | C |
| `lib/env/**`, `lib/api/**`, `types/**` | C2 | C |
| `app/[locale]/layout.tsx`, `not-found.tsx`, `error.tsx`, `loading.tsx`, `app/sitemap.ts`, `app/robots.ts`, `middleware.ts`, `components/layout/**`, `lib/i18n/**`, `translations/**` | D1 | D |
| `app/[locale]/(marketing)/**`, `components/marketing/**`, `components/product-surface/**`, `lib/media-manifest.ts`, `public/media/**` | D2 | D |
| `app/api/**` | D3 | D |
| `app/[locale]/(app)/**`, `components/app/**`, `components/forms/**` | D4 | D |
| `CLAUDE.md` | **Nobody, until owner decision 10.** Then A4. | — |
| `app/v2/**`, `components/v2/**`, `lib/os/**`, the root `.mp4` | **Nobody. Owner's uncommitted work, preserved.** A separate cleanup chat is proposed after the wave, once `lib/os/copy.ts` has been harvested. | — |
| `index.html`, `assets/**`, the twelve dead components, `components/live-demo/**` | **Nobody in this wave.** Removal is a separate cleanup chat, sequenced last so no chat loses reference material mid wave. | — |

---

## 5. Chats that can be started safely, right now, in parallel

**A1, A3 and A4.** They share no file, they depend on no owner decision, and their inputs all exist.

- **A1** Truth and Claims Reconciliation → `PRODUCT_TRUTH.md`, `CLAIMS_MATRIX.md`
- **A3** Authenticated Experience Design → `LUXURY_UX_MEDIA_SYSTEM.md`, `AUTHENTICATED_SURFACE_SYSTEM.md`
- **A4** Governance and Contract Update → `MASTER_GOVERNANCE.md`, `INTEGRATION_CONTRACT.md`, `IMPLEMENTATION_STATUS.md`, `CURRENT_SITE_AUDIT.md`

**A2** starts when A1 finishes. **B1** starts when owner decision 8 is answered, and runs alone.
Everything else waits on the gates in §4.0.

---

## 6. Commit strategy, stated once for the whole wave

```
# 1. inspect before touching the index
git status --porcelain

# 2. stage explicit paths only, never a directory, never a dot
git add <exact/path/one> <exact/path/two>

# 3. verify what is actually staged, before committing
git diff --cached --name-only

# 4. commit with a message that names the files and the reason
git commit -m "docs(claims): apply handoff conflicts C-08..C-25 to CLAIMS_MATRIX.md"
```

Forbidden in every chat: `git add .`, `git add -A`, `git add <directory>`, `git commit -a`,
`git push`, `git merge`, `git rebase`, `git reset --hard`, any history rewrite, any force operation,
and any deployment.

Commit message prefixes, so the log is readable per chat: `docs(truth)`, `docs(claims)`, `docs(copy)`,
`docs(design)`, `docs(governance)`, `chore(repo)`, `feat(tokens)`, `feat(api-types)`, `feat(shell)`,
`feat(marketing)`, `feat(bff)`, `feat(app)`, `docs(audit)`.

**Completion wording, in every commit message and every report:** *Implemented and awaiting
independent technical and final audit.* The words done, finished, complete, ready, production ready,
bug free, tested and working, fully functional, ships as-is, `LIVE` and `PRODUCTION READY` are
forbidden.

---

## 7. What this wave cannot deliver, and why

Recorded so nobody plans around a promise that cannot be kept.

| Not deliverable | Reason |
|---|---|
| Any end to end verification | `MASTER_GOVERNANCE.md` §14 forbids calling any product system, staging included. Report C-14, owner decision 1. |
| The authenticated tree behind a public URL | C-22, the privacy policy, is launch blocking and now materially larger than L-14 was written to cover. |
| A testimonial submission surface matching the owner's stated mechanism | MF-01. The confirmed contract has no video field. |
| Any hot lead alerting section, copy or visual | MF-02. No contract, no matrix row, no evidence. `CLAUDE.md`'s mandate cannot be honoured. |
| A decision on how much of the product the website hosts | MF-03. Report C-27. |
| Any price, quota or feature to package mapping authored in the website | PK-04, PK-05, PK-06. Prices are served by `GET /plans`, never authored. |
| Any named portal integration | F-06, unchanged. Not in the handoff. |
| Any vendor logo | Trademark permission, not evidence. Report C-11. |
| Voice as a present tense capability | V-01 unchanged. Report C-16. |
| A working chat, voice or WhatsApp concierge on the website | `RESERVED` (handoff §10). |
| A demo booking backend | `PROPOSED` (handoff §10). Cal.com remains an existing external option. |
| Photography, videos or product captures | AS-05 to AS-07 do not exist, and LUXURY D-04 is unanswered. Every surface ships as a `pending` frame, which is honest. |
| Clearance of any of the fourteen legal dependencies | No chat may clear a legal hold. Counsel track, running in parallel from now. |

---

## Status

Integration wave planned: authority ranking fixed, twelve non negotiable rules, a fifteen row skills
and access assessment with no installation and no general n8n access requested, nine chats plus a
standing audit role across five waves with exclusive and collision proof file ownership, per chat
responsibility, allowed and forbidden files, dependencies, inputs, outputs, commit strategy and
acceptance criteria, a single commit procedure for the whole wave, the three chats that can start
safely in parallel right now, and an explicit list of what this wave cannot deliver.

No page implemented. No API built. No system contacted. Nothing pushed, merged or deployed.
**No production readiness claim made.**

**Implemented and awaiting independent technical and final audit.**
