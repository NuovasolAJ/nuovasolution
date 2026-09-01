# CURRENT SITE AUDIT — NuovaSolution Website (pre-redesign state)

**Audited by:** Master Website Director (implementation instance)
**Audit date:** 2026-08-30
**Amended:** 2026-08-31 — Wave A4. Corrections to §4 (incomplete `/v2` inventory) and §15
(A-01 disagreement between documents); new §19 (legacy risk register).
**Amended:** 2026-09-01 — Wave V4. New §19.3 (backend export tracking state) and §19.4
(the owner-ratified hygiene sequence). Still **no remediation performed**.
**Branch at audit time:** `website_enterprise_redesign` (forked from `main` @ `9943660`)
**Scope:** Factual inventory of the existing codebase. No judgement of copy truthfulness —
that belongs to `PRODUCT_TRUTH.md` / `CLAIMS_MATRIX.md`.

> Governance note (R1/R2): this document is a factual inventory produced by the
> implementation instance. It is itself subject to independent review.
>
> **No remediation is performed by this wave.** Every hygiene item below is documented and
> left in place. Cleanup is a separate, isolated repository-hygiene wave that runs alone,
> because untracking operates on the whole index and would collide with any concurrent
> commit. Nothing here is fixed, deleted, untracked, rotated or moved.

---

## 1. Framework and project structure

| Item | Finding |
|---|---|
| Framework | **Next.js 14.2.x**, App Router |
| React | 18.3 |
| Language | TypeScript 5.5, `strict` per `tsconfig.json` |
| Styling | Tailwind CSS 3.4 + a large amount of inline `style={{}}` objects |
| Animation | `framer-motion` 11.3 |
| Utilities | `clsx`, `tailwind-merge` (`lib/utils.ts`) |
| Analytics | `@vercel/analytics` 2.0 |
| Rendering | Server components for pages; nearly all sections are `"use client"` |

**Two parallel codebases exist in the repository:**

1. **Active Next.js app** — `app/`, `components/`, `lib/`, `translations/`, `public/`
2. **Dead legacy static site** — `index.html` at repo root plus `assets/css/*` (~83 KB of
   CSS across 5 files) and `assets/js/*` (chatbot.js, demo.js, i18n.js, main.js, ~40 KB).
   Not referenced by the Next.js build, but **tracked in git** and shipped in the repo.

Alias `@/*` → project root, configured in `tsconfig.json`.

---

## 2. Package manager

**npm** — `package-lock.json` present, no `pnpm-lock.yaml`, no `yarn.lock`, no
`bun.lockb`. Vercel will use npm. Node engine is not pinned in `package.json`.

---

## 3. Routes

| Route | File | Type | Notes |
|---|---|---|---|
| `/` | `app/page.tsx` | Server → client sections | Homepage |
| `/live-demo` | `app/live-demo/page.tsx` | Server → client | Wraps `live-demo-client.tsx` (80 KB) |
| `/v2` | `app/v2/page.tsx` | Server → client | Unfinished alternate concept, `robots: noindex` |
| `/legal-notice` | `app/legal-notice/page.tsx` | Static | EN imprint |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | Static | EN privacy |
| `/aviso-legal` | `app/aviso-legal/page.tsx` | Static | ES imprint |
| `/politica-privacidad` | `app/politica-privacidad/page.tsx` | Static | ES privacy |

**Absent — required by the redesign brief:** Platform Overview, AI Sales Agent, Universal
CRM & Lead Intelligence, Voice AI, Property Matching, Daily Assistant, Social Growth, Lead
Acquisition, Follow-up Automation, Reporting, Property Experience, Solutions overview
pages, Experience Nuova, Pricing, Onboarding, Security & Governance, Login.

**Absent infrastructure:** no `app/api/` directory — **zero API routes exist**. No
`middleware.ts`. No `not-found.tsx`. No `error.tsx`. No `loading.tsx`. No `sitemap.ts`.
No `robots.ts`. No `opengraph-image`.

---

## 4. Components

### Active — homepage (`/`)
`components/ui/nav.tsx`, `components/sections/hero.tsx` (19 KB),
`always-on.tsx` (43 KB), `real-scenarios.tsx` (28 KB), `lead-intelligence.tsx` (17 KB),
`final-cta.tsx`, `faq.tsx`, `components/ui/footer.tsx`, `components/ui/section-divider.tsx`,
`components/ui/lang-toggle.tsx`.

### Active — `/live-demo`
`components/live-demo/live-demo-client.tsx` (**80.5 KB, single file**) and
`components/live-demo/demo-engine.ts` (37.5 KB).

### `/v2` — the owner's uncommitted concept (CORRECTED 2026-08-31)

> The original audit was **incomplete and mis-scoped** here. Two corrections.

**Correction 1 — the file list was short by one.** `components/v2/` contains **seven** files,
not the four listed originally plus two in the dead-code list:

| File | Imported by |
|---|---|
| `nav.tsx` | `app/v2/page.tsx` |
| `presence.tsx` | `app/v2/page.tsx` |
| `atmosphere.tsx` | `app/v2/page.tsx` |
| `film.tsx` (18 KB) | `app/v2/page.tsx` |
| `hero.tsx` (18 KB) | **Nothing. Omitted from the original audit entirely.** |
| `journey.tsx` (12 KB) | Nothing |
| `closing.tsx` (13 KB) | Nothing |

Plus `lib/os/copy.ts` (15 KB) and `lib/os/motion.ts`.

**Correction 2 — none of it is tracked in git.** `app/v2/`, `components/v2/` (all seven
files) and `lib/os/` are **untracked working-tree files: the owner's uncommitted work**.
Verified 2026-08-31. The original audit listed them as if they were part of the committed
codebase.

**Handling:** preserved, untouched, not deleted, not moved, not staged by any chat.
`lib/os/copy.ts` is the marketing draft whose capability status flags are cited throughout
`PRODUCT_TRUTH.md`, so it is **reference material that must be harvested before any future
cleanup**, not merely dead weight.

### Dead code — tracked, and imported by nothing
- `components/sections/chat-demo.tsx`
- `components/sections/demo-flow.tsx` (16 KB)
- `components/sections/speed-compare.tsx` (10 KB)
- `components/sections/lead-lost.tsx`
- `components/sections/trust-strip.tsx` (9 KB)
- `components/ui/aurora-background.tsx`
- `components/ui/container-scroll-animation.tsx`
- `components/ui/dark-mode-toggle.tsx`
- `components/ui/prompt-input.tsx`
- `components/ui/typewriter-effect.tsx`

**Structural observations**

- Section components are extremely large (43 KB, 28 KB, 80 KB single files). No shared
  primitive layer: no `Section`, `Container`, `Heading`, `Button`, `Card` component.
- Styling is split three ways — Tailwind classes, a `@layer components` block in
  `globals.css`, and heavy inline `style` objects. There is no single design-token source.
- `nav.tsx` injects a raw `<style>` tag with four `!important` media-query blocks down to
  `max-width: 300px` — a symptom of layout patched under pressure rather than designed.

---

## 5. Global styles

`app/globals.css` (6.8 KB):

- CSS custom properties `--ns-*` on `:root` and `.dark` — colors only. No spacing scale,
  no type scale, no radius scale, no motion tokens, no z-index scale.
- `@layer components` defines `.btn`, `.btn-sm/md/lg`, `.btn-navy`, `.btn-gold`,
  `.btn-ghost`, `.btn-hero-ghost`, `.btn-whatsapp`, `.hero-card`, `.section-label`,
  `.section-heading`, `.section-sub`, `.card`.
- `tailwind.config.ts` defines a second, partially overlapping colour set under `brand.*`
  (`bg`, `sand`, `navy`, `gold`, `stone`, `terra`, `olive`, `darkBg`, …) plus `hot`, `warm`,
  `cold`, `whatsapp`, and aurora keyframes.
- **Two competing colour systems** (`--ns-*` and `brand.*`) with values that do not fully
  agree, plus a third set of hard-coded hex values inline in components (`#0C0B09`,
  `#0A0908`, `#C9A96E`, …).
- `overflow-x: hidden` is applied on `html`, `body` and multiple section roots — a
  workaround for horizontal overflow, not a fix.
- Legacy `assets/css/*` (variables, base, layout, components, mobile — 83 KB) belongs to
  the dead static site and defines yet another unrelated system.

---

## 6. Fonts

- Loaded via `@import url(...)` from Google Fonts **inside `globals.css`** — this is
  render-blocking and defeats Next.js font optimization.
- `next/font` is **not used**.
- Families: **Inter** (300–700) and **Playfair Display** (600/700, incl. italic).
- `<head>` has `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`, which does
  not compensate for the blocking `@import`.
- No `font-display` control beyond the URL's `&display=swap`, no subsetting, no preload of
  the LCP face, no self-hosting.

**Impact:** direct risk to the LCP ≤ 2.5 s budget and a CLS risk from font swap.

---

## 7. Language switching

Implemented in `lib/language-context.tsx`:

- React context, `useState<Lang>("en")`, flat key→string dictionaries.
- `translations/en.ts` and `translations/es.ts` — **240 keys each**, counts match.
- Fallback chain: current language → English → raw key.
- `components/ui/lang-toggle.tsx` and `components/v2/nav.tsx` expose the switch.
- `/v2` uses a *second*, separate copy source: `lib/os/copy.ts`.

**Limitations (all relevant to the bilingual requirement):**

| Issue | Consequence |
|---|---|
| No URL locale segment (`/en`, `/es`) | Spanish content is not linkable, not indexable, not shareable |
| No persistence (cookie/localStorage) | Language resets on every reload and every navigation |
| `<html lang="en">` hard-coded in `app/layout.tsx` | Wrong `lang` for ES; accessibility and SEO defect |
| No `hreflang`, no localized metadata | ES has effectively zero SEO surface |
| Legal pages are separate routes, not locale-driven | Footer swaps links manually; two parallel mechanisms |
| Flat string dictionary only | No pluralization, no interpolation, no rich text |
| Not `next-intl`/`next-i18next` | Bilingual scale-out to ~17 planned pages will not hold |

**Verdict:** the mechanism "works" for a single page but does **not** satisfy the brief's
requirement for two fully intentional languages. It must be replaced with route-based
locales.

---

## 8. Forms

**There is no form on the website.** No `<form>` element, no input submission, no
validation, no server action, no API route.

The only input-like surfaces are inside `/live-demo`, where a visitor types a message that
is processed entirely client-side. Nothing is submitted anywhere and nothing is stored.

Consequences for the redesign: trial signup, demo request, contact, callback request,
package selection and trial-extension submission are **all unbuilt** and all need entries
in `INTEGRATION_CONTRACT.md`.

---

## 9. Existing demo

Two separate demo artefacts exist.

**A. `/live-demo`** — `live-demo-client.tsx` (80 KB) + `demo-engine.ts` (37 KB).
Fully client-side simulation: a visitor types an inquiry, and local heuristics extract a
name, classify intent, score the lead and render a reply plus a WhatsApp-style alert.
No network call, no AI model, no backend. Recent commit history shows sustained effort on
name-extraction heuristics (`9943660`, `95b9500`, `b88514c`).

**B. Homepage embedded demo surfaces** — inside `hero.tsx`, `always-on.tsx`,
`real-scenarios.tsx`; plus the dead `demo-flow.tsx` and `chat-demo.tsx`.

**Assessment for the redesign:** the *engine* encodes real product logic and real domain
vocabulary and is worth preserving as reference material. The *presentation* is a
monolithic client component with a distinct visual language from the rest of the site and
is superseded by the "Experience Nuova" concept. The demo must not present client-side
heuristics as if they were the live product — that is a `CLAIMS_MATRIX.md` matter and is
flagged as an open item, not decided here.

---

## 10. CTAs

| Location | Control | Target | Honest? |
|---|---|---|---|
| `nav.tsx:101` | Book a demo | `href="#"` + `data-cal-link="nuovasolution/demo"` + `preventDefault()` | Works only if the Cal.com script loads; otherwise **dead** |
| `hero.tsx:440` | Book a demo | same Cal.com pattern | same risk |
| `hero.tsx:459` | Live demo | `https://nuovasolution.com/live-demo` — **absolute cross-origin URL to itself** | Full page reload; breaks on preview deployments |
| `final-cta.tsx:64` | Book a demo | Cal.com pattern | same risk |
| `final-cta.tsx:80` | Live demo | absolute `https://nuovasolution.com/live-demo` | same defect |
| `live-demo-client.tsx:1943` | Book a demo | `https://cal.com/nuovasolution/demo` | Real link, leaves the site |
| `demo-flow.tsx:142` (dead) | `href="#contact"` | **No `#contact` anchor exists anywhere** | Dead link |
| `v2/*` | Book a demo | Cal.com pattern | preview only |

**Findings**

- **P1 — `href="#"` with `preventDefault()`**: if the Cal.com embed script fails, is blocked
  by an ad blocker, or has not initialized yet, the primary CTA does nothing at all. No
  fallback, no error state. This pattern is used for the primary CTA on every page.
- **P1 — absolute self-referencing URLs** (`https://nuovasolution.com/live-demo`) break
  client-side navigation and point preview deployments at production.
- **P1 — CTA hierarchy does not match the brief.** "Start your 14 day free trial" does not
  exist anywhere. "Book a demo" is currently the primary action. There is no trial path, no
  login, no pricing.
- Cal.com is currently the **only** live third-party integration on the site.

---

## 11. Login and onboarding links

**None exist.** No `/login`, no `/signup`, no `/onboarding`, no auth provider, no session
handling, no link to any external app. The nav has no Log in entry.

Everything required by the brief — `Log in`, `Start free`, `Onboarding` — is greenfield.

---

## 12. SEO and metadata

| Item | State |
|---|---|
| Root metadata | Present in `app/layout.tsx`: title, description, icons, minimal OpenGraph |
| `metadataBase` | **Missing** — relative OG/Twitter URLs will not resolve correctly |
| Canonical URLs | **Missing** |
| `hreflang` / `alternates.languages` | **Missing** — blocks the bilingual requirement |
| Twitter card | **Missing** |
| OG image | **Missing** — no `opengraph-image`, no `og:image` |
| `robots.txt` / `robots.ts` | **Missing** |
| `sitemap.xml` / `sitemap.ts` | **Missing** |
| Structured data (JSON-LD) | **Missing** |
| Per-page metadata | Only `/live-demo` and `/v2`; legal pages have none |
| `<html lang>` | Hard-coded `"en"` regardless of selected language |
| Heading structure | Not verified in this pass — deferred to the redesign build |

`/v2` correctly sets `robots: { index: false }`.

---

## 13. Analytics

- `@vercel/analytics` `<Analytics />` mounted in `app/layout.tsx`. Page views only.
- **No custom events.** No CTA click tracking, no demo interaction tracking, no funnel
  instrumentation, no conversion goals.
- No Google Analytics, no GTM, no Meta Pixel, no PostHog, no Hotjar.
- No consent/cookie banner. Vercel Analytics is cookieless, which is why this is currently
  defensible — **any additional tracking will require a consent layer under GDPR**, and
  that is a legal precondition, not a nice-to-have.

Every action in `INTEGRATION_CONTRACT.md` needs a defined analytics event; none exist today.

---

## 14. Vercel configuration

- **No `vercel.json`.** No headers, no redirects, no rewrites, no region pinning, no
  security headers (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy).
- `.vercel/repo.json` links project `nuovasolution`
  (`prj_1AXMlFaisqoNhvWYfkMDPI5UJL9D`, org `team_xTIb9VCvR1QRDfJCFZnyzjVI`) to
  git remote `origin` → `https://github.com/NuovasolAJ/nuovasolution.git`.
- `.vercel` is git-ignored (correct).
- `next.config.js` is nearly empty: `images: { domains: [] }`. No `remotePatterns`, no
  image format configuration, no compiler options, no headers.
- Branch pushes would normally produce preview deployments automatically. **Under
  `MASTER_GOVERNANCE.md` §15 no push and no deployment happens, preview included, without
  explicit per-occasion owner approval.** No push has occurred on this branch.
- **No environment variable of any kind exists** in this repository: no `.env`, no
  `.env.local`, no `.env.example`, and `process.env` appears nowhere in `app/`, `components/`
  or `lib/`. There is no environment plumbing at all, which is why legacy risks L-R3 and L-R4
  must be closed **before** any is introduced (§19.2).

---

## 15. Possible legacy n8n Cloud connections

**In the website runtime: none.** No fetch, no webhook call, no n8n reference in any
`app/`, `components/` or `lib/` file. The site makes no backend calls of any kind.

**In the repository: a retired tooling configuration, still physically present.**

`.mcp.json` is **tracked in git** and contains an n8n Cloud API URL and API key for developer
tooling (an `n8n-mcp` server configuration). The values are deliberately **not reproduced in
this document**, and are not reproduced in any document on this branch.

Per `MASTER_GOVERNANCE.md` R8 and §14, this project:

- does not use, call, test, repair or repoint that connection;
- does not reproduce, echo, log or quote the credential value anywhere;
- does not attempt to rotate, verify or clean it.

**The obsolete n8n Cloud connection must not be used by the new website under any
circumstances, and no legacy n8n hardcoding may enter the new implementation** (§17.4).
The connection is **deleted, not migrated**, when the hygiene wave runs.

### 15.1 A-01 — a documentary disagreement between three documents (CORRECTED 2026-08-31)

Three documents on this branch state three different things about the same item:

| Document | States |
|---|---|
| `CURRENT_SITE_AUDIT.md` (this file, 2026-08-30) | A-01 closed — rotated and cleaned up |
| `IMPLEMENTATION_STATUS.md` (2026-08-30) | A-01 closed, severity struck through |
| `CLAIMS_MATRIX.md` §21 item 18 | "Rotate the exposed credential" — still listed as an **open owner decision, P0** |

**The correction.** The earlier "closed" wording overstated what this project can know.
What is actually true, and all that is actually true:

1. The owner stated that the credential is rotated and that cleanup happens separately,
   outside this chat.
2. **This project neither verified that, nor can it** — verification would require exactly
   the access §14 forbids.
3. **The file and its value are still physically present** in the working tree and in the
   index, and have been in every commit since they were introduced, on `main`, before this
   branch existed.

**Correct status:** the **security** action is owner-side and closed by the owner's own
statement, which this project accepts and does not re-litigate. The **hygiene** action —
untracking the file and removing the retired configuration — is **open**, and is tracked as
legacy risk L-R1 in §19.

**This document does not change `CLAIMS_MATRIX.md`'s verdict.** Only its owning instance may.
The disagreement is recorded here so that no future reader assumes one document speaks for
all three.

---

## 16. Unused code

| Item | Size | Recommendation |
|---|---|---|
| `index.html` (root) + `assets/css/*` + `assets/js/*` | ~125 KB | Legacy static site, fully superseded. Remove. |
| 12 unimported components (§4) | ~90 KB | Remove; harvest logic where useful. |
| `components/v2/*` + `lib/os/copy.ts` + `app/v2` | ~70 KB | Abandoned concept. Remove after harvesting. |
| `.next/` **tracked in git — 180 files** | large | Build output must never be committed. Add to `.gitignore`, untrack. |
| `tsconfig.tsbuildinfo` tracked | — | Build artefact. Untrack, ignore. |
| `WhatsApp Video 2026-07-07 at 18.30.48.mp4` (repo root) | — | Stray asset. Move out of the repo or into a managed media location. |
| `public/images/` — 5 logo variants, 810 KB total | 810 KB | `logo-full.png` (293 KB) and `logo-icon.png` (204 KB) are duplicated in both `public/images/` and `assets/images/`. Consolidate to one optimized SVG/PNG set. |

**`.gitignore` currently contains only two lines** (`node_modules`, `.vercel`). This is the
root cause of the `.next`, `.mcp.json` and build-artefact tracking problems.

---

## 17. Technical foundations worth keeping

| Keep | Reason |
|---|---|
| Next.js 14 App Router + TypeScript strict | Correct, current foundation for the target site |
| npm + `package-lock.json` | Stable, matches Vercel |
| Tailwind + PostCSS toolchain | Correct base — but tokens must be rebuilt from `LUXURY_UX_MEDIA_SYSTEM.md` |
| `@/*` path alias | Keep |
| Vercel project link and GitHub remote | Keep — preview deployments depend on it |
| `@vercel/analytics` | Keep as the base layer; extend with custom events |
| `framer-motion` | Keep, but constrain to `transform`/`opacity` and reduced-motion-safe use |
| `lib/utils.ts` (`cn`) | Keep |
| **Brand assets** — the NuovaSolution logo files | Keep. Mandatory retention. Re-optimize only. |
| **Legal content** — `legal-notice`, `privacy-policy`, `aviso-legal`, `politica-privacidad` | Keep the *content*. Legally necessary. Redesign the presentation only, and re-verify against actual data processing after the redesign changes what data is collected. |
| `demo-engine.ts` domain logic | Keep as reference material for Experience Nuova. Not as UI. |
| EN/ES translation content | Keep as raw material for `COPY_AND_CONVERSION_MASTER.md`. Not as final copy. |

---

## 18. Visual elements to be removed

Per the brief, the existing visual system is **not** a design reference. To be discarded:

1. Entire homepage composition and section order
2. Current navigation (single Cal.com CTA, no page structure, `!important` breakpoint patches)
3. Current `/live-demo` presentation layer
4. All existing marketing copy (raw material only)
5. All current layouts and grids
6. Card and tile patterns — including repeated rounded cards and `.hero-card`
7. Dashboard-style presentation surfaces in `always-on.tsx`, `real-scenarios.tsx`, `lead-intelligence.tsx`
8. Aurora blob background animation and the `aurora-1/2/3` keyframes
9. Current mobile structure — clamp-and-`!important` patching down to 300 px
10. Current CTA structure (demo-first, no trial, no pricing, no login)
11. Pricing presentation — does not exist and must be built from scratch
12. Current footer (thin three-item row, legal links only)
13. `/v2` concept including the `100svh` sticky scroll "film" section — **scroll hijacking risk**, explicitly forbidden by the brief
14. The `--ns-*` / `brand.*` / inline-hex triple colour system
15. `minHeight: "100vh"` in `hero.tsx:276` — wrong unit for mobile (`svh`/`dvh` required) and a blanket minimum height of exactly the kind the brief forbids
16. Blanket `overflow-x: hidden` as an overflow strategy

---

## 19. Legacy risk register (added 2026-08-31)

> **No secret value, token value, key fragment or complete sensitive URL is reproduced in
> this register.** Nothing here was accessed, called, tested or verified. **No cleanup is
> performed by this wave.** Remediation runs later, as an isolated repository-hygiene wave,
> alone, because untracking operates on the whole index.

| ID | Legacy risk | Verified state | Why it matters | Remediation (later wave, not now) |
|---|---|---|---|---|
| **L-R1** | **Tracked retired MCP configuration.** `.mcp.json` is tracked and carries a retired n8n Cloud host and a credential for developer tooling. | Tracked. Present in the working tree and the index. | It is the one file in the repository that holds a credential-shaped value. It is developer tooling and has no place in version control. The connection it points at is retired (R8). | Untrack, ignore, and **delete the retired connection rather than repairing it**. |
| **L-R2** | **Possible git history burden.** The file above has been present in every commit since it was introduced, on `main`, before this branch existed. | Not audited in depth by this wave. History was read, not rewritten. | Removing a file in a new commit does not remove it from history. Anyone with clone access to the repository, at any point in its history, can read it. Its practical severity depends entirely on **repository visibility**, which this project has not checked and must not assume. | **No history rewrite** (§12). The owner decides on visibility and on whether any further action is warranted. This project performs none. |
| **L-R3** | **Insufficient ignore rules.** `.gitignore` contains exactly two entries. | Verified. | This is the **root cause** of L-R1, L-R4, L-R5 and L-R6. It is also why directory-wide staging has repeatedly swept foreign files into commits. | Extend to cover dependencies, build output, deployment state, build info, environment files (with an example file carrying names only as the sole exception), the tooling configuration, local settings and OS artefacts. |
| **L-R4** | **Tracked build output.** `.next/` is tracked: **180 files in the index**, verified 2026-08-31. | Verified. | Build output under version control. **The decisive risk is forward-looking:** the moment any environment value is introduced, a build that inlines it would commit it. This makes L-R4 a **hard precondition** for introducing any environment variable at all. | `git rm -r --cached`, then ignore. **Before** any environment plumbing exists. |
| **L-R5** | **Tracked local settings.** `.claude/settings.local.json` is tracked. | Verified. | Per-developer local tool state, containing permission allowlists and absolute local filesystem paths. No secrets. It does not belong in a shared repository and leaks local machine structure. | Untrack, ignore. Hygiene only. |
| **L-R6** | **Tracked build information.** `tsconfig.tsbuildinfo` is tracked and shows as modified on almost every operation. | Verified. | A build artefact. Contributes constant working-tree noise, which is the condition under which a directory-wide stage sweeps up something unintended. | Untrack, ignore. |
| **L-R7** | **Absolute production self-links.** Two anchors in source point at the production origin for a route on the same site: `components/sections/hero.tsx:459` and `components/sections/final-cta.tsx:80`. | Verified. | Two distinct defects. **Navigation:** a full page reload instead of client-side navigation. **Preview safety:** every non-production deployment links its visitor **back into production**, which silently defeats the point of a preview and can send a reviewer's actions to the live site. Recorded as A-03. | Replace with relative internal paths. **No target is hardcoded in source** (§17.5). |

### 19.1 What this register does not claim

- It does not claim any credential is or is not currently valid.
- It does not claim the repository is or is not public.
- It does not claim that history is or is not compromised.
- It performs no rotation, no untracking, no deletion and no history change.

Each of those is either an owner decision or a later wave. Stating them as facts here would
be exactly the kind of unverified assertion this project's governance exists to prevent.

### 19.2 The one sequencing rule that matters

**L-R3 and L-R4 are preconditions for introducing any environment variable into this
repository.** Introducing a server-only secret-bearing variable while build output is tracked
and the ignore file is two lines long is unsafe by construction, regardless of how carefully
the variable itself is handled.

**This is now owner-ratified as binding** (`MASTER_GOVERNANCE.md` §14.6), not merely
recommended. See §19.4.

### 19.3 Backend export tracking state (added 2026-09-01)

Four backend export files sit in `docs/website_redesign/backend_handoff/`. **Three are
untracked, including the current technical authority and its addendum.** Verified 2026-09-01.

| File | Tracked | Role |
|---|---|---|
| `WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2.md` | **No** | **Rank 1a — the current technical authority** |
| `WEBSITE_INTEGRATION_HANDOFF_EXPORT_v2_AF_ADDENDUM_v1.md` | **No** | Rank 1b — AF-01, AF-04, AF-07 only |
| `WEBSITE_INTEGRATION_HANDOFF_EXPORT_v1.md` | **No** | **HISTORICAL.** Superseded; no status is derived from it |
| `WEBSITE_UX_AF_REQUIREMENTS_EXPORT_v1.md` | Yes | **Not** a technical authority — a website-authored requirement register |

**Why this matters.** The document the entire integration wave now depends on is not under
version control. It can be lost by a routine clean, is invisible to any other clone, and
cannot be diffed when a later export arrives. The two current exports were hash-verified by
the reconciliation instance before being relied upon, and both digests are recorded there, so
a verified baseline exists — but only outside version control.

**Both current exports were read in full by this wave and contain no secret, key, token,
credential, environment value or customer record.** They carry endpoint contracts, field
names, status vocabulary and environment variable **names** only. They are safe to commit.

**Owner-ratified:** the handoffs **may be versioned after a successful hygiene and secrets
check** (`MASTER_GOVERNANCE.md` §14.7). **This wave commits none of them.** They are the
owner's files, and versioning them is the hygiene wave's first action, not this one's — after
the ignore rules exist, so that the commit lands in a repository that is safe to hold them.

One incidental note, recorded because it affects the guard: the exports legitimately contain
the retired-host **pattern list** and secret-shaped **variable names**, as a search-and-
eliminate instruction. The build guard must therefore be scoped to application source and
build output, and **never pointed at the documentation directory**, or it will fail on its own
specification.

### 19.4 The owner-ratified hygiene sequence (added 2026-09-01)

> **Ratified:** repository hygiene is **mandatory before any secret or server-boundary
> configuration is introduced.**

| Order | Step | Covers |
|---|---|---|
| **1** | Untrack build output, build information, the retired tooling configuration and local developer settings. Extend the ignore rules. | L-R1, L-R3, L-R4, L-R5, L-R6 |
| **2** | Add the build guard that fails on a retired host or a secret-shaped literal, scoped to application source and build output only. | R8, §17.4 |
| **3** | Version the backend exports, after re-reading each in full for secrets. | §19.3, §14.7 |
| **4** | **Only then:** any environment variable, any server-boundary configuration, any staging target. | §14.5, §14.6 |
| — | Separately, at implementation time: replace the absolute production self-links with relative paths. | L-R7 |

**No wave may reorder this.** Step 4 before step 1 is the failure mode the whole register
exists to prevent.

**The hygiene wave runs alone.** Untracking operates on the whole index, so any concurrent
commit from another chat would be swept into it. That is the same mechanism that produced the
three recorded commit collisions.

**This wave performs none of it.** Nothing is untracked, ignored, deleted, rotated, moved or
committed beyond the four documents it owns.

---

## Consolidated findings

| ID | Sev | Finding | State |
|---|---|---|---|
| A-01 | P1 (hygiene) | Retired n8n Cloud tooling configuration tracked in `.mcp.json`. **Security action is owner-side and closed by the owner's own statement, which this project cannot verify. Hygiene action is open.** Three documents disagree — see §15.1. Tracked as **L-R1**. | Open (hygiene) |
| A-02 | **P1** | Primary CTA is `href="#"` + `preventDefault()`; dead if the scheduling script is blocked or fails. | Open |
| A-03 | **P1** | Absolute self-referencing production URLs break client-side navigation **and point every preview back into production**. Tracked as **L-R7**. | Open |
| A-04 | **P1** | Spanish has no URL, no persistence, no `hreflang`, and `<html lang>` is hard-coded `en`. Bilingual requirement not met. | Open |
| A-05 | **P1** | Render-blocking Google Fonts `@import` in `globals.css`; `next/font` unused. LCP/CLS risk. | Open |
| A-06 | **P1** | The required route tree does not exist. **Revised 2026-08-31:** the target is now larger than originally stated — the public marketing tree *plus* a locale-routed structure *plus* an authenticated tree (signup, login, a ten-step wizard, readiness, plan selection). Its outer boundary is unresolved (MF-03). | Open |
| A-07 | **P1** | No API routes, no forms, no submission path, no environment plumbing. **Revised 2026-08-31:** the blocking cause has changed. It was "no contract exists". A contract now exists for 27 implementable surfaces. What blocks execution is `MASTER_GOVERNANCE.md` §14 plus the empty activation register — not missing information. | Open, cause changed |
| A-08 | **P1** | Build output and artefacts tracked; ignore file has two entries. Split into **L-R3** (ignore rules), **L-R4** (build output, 180 files), **L-R6** (build info). **Precondition for any environment variable.** | Open |
| A-09 | **P1** | No deployment configuration, no security headers, no content security policy. | Open |
| A-10 | **P2** | Three competing colour systems; no spacing, type or motion token layer. | Open |
| A-11 | **P2** | ~285 KB of dead code and a fully redundant legacy static site tracked in the repo. | Open |
| A-12 | **P2** | No custom analytics events; no conversion instrumentation. Every action in `INTEGRATION_CONTRACT.md` names events that do not exist. | Open |
| A-13 | **P2** | No `metadataBase`, canonicals, sitemap, robots, OG image or structured data. | Open |
| A-14 | **P2** | No `not-found.tsx`, `error.tsx` or `loading.tsx`. | Open |
| A-15 | **P2** | Monolithic components (80 KB / 43 KB single files); no shared primitive layer. | Open |
| **A-16** | **P2** | **New 2026-08-31.** `.claude/settings.local.json` is tracked. Per-developer local tool state with absolute local filesystem paths. No secrets. Tracked as **L-R5**. | Open |
| **A-17** | **P2** | **New 2026-08-31.** The original `/v2` inventory in §4 was incomplete — one component omitted, and the whole concept mis-recorded as committed code when it is the owner's untracked work. Corrected in §4. | Corrected |

**Totals:** 17 findings — 0 P0, 9 P1, 8 P2. One correction closed (A-17).

The previous P0 (A-01) is re-graded to P1 hygiene, because its security half is owner-side
and closed by the owner's own statement, and its remaining half is a repository-hygiene
action. **This is a re-grading, not a dismissal:** the file and its value are still
physically present, and §15.1 records exactly what this project does and does not know.

---

## Status

Audit amended twice.

**2026-08-31 (Wave A4):** the `/v2` inventory corrected, the A-01 disagreement between three
documents recorded rather than papered over, a seven-item legacy risk register added with no
secret content, and the consolidated findings re-graded to 17 — 0 P0, 9 P1, 8 P2.

**2026-09-01 (Wave V4):** the backend export tracking state recorded — three of four files
untracked, including the current technical authority — and the owner-ratified hygiene sequence
written down as a four-step order that no wave may reorder. The finding count is unchanged;
export-v2 corrected contract facts, not the state of this repository.

**No remediation was performed in either amendment.** Nothing was untracked, ignored, deleted,
rotated or moved. No file outside the four documents owned by this wave was changed. No secret
value was reproduced. No system was contacted. **No production readiness claim is made.**

**Implemented and awaiting independent technical and final audit.**
