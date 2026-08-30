# CURRENT SITE AUDIT — NuovaSolution Website (pre-redesign state)

**Audited by:** Master Website Director (implementation instance)
**Audit date:** 2026-08-30
**Branch at audit time:** `website_enterprise_redesign` (forked from `main` @ `9943660`)
**Scope:** Factual inventory of the existing codebase. No judgement of copy truthfulness —
that belongs to `PRODUCT_TRUTH.md` / `CLAIMS_MATRIX.md`.

> Governance note (R1/R2): this document is a factual inventory produced by the
> implementation instance. It is itself subject to independent review.

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

### Active — `/v2` only
`components/v2/nav.tsx`, `presence.tsx`, `atmosphere.tsx`, `film.tsx` (18 KB), plus
`lib/os/copy.ts` (15 KB) and `lib/os/motion.ts`.

### Dead code — imported by nothing
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
- `components/v2/journey.tsx` (12 KB)
- `components/v2/closing.tsx` (13 KB)

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
- Branch pushes should produce preview deployments automatically — **to be confirmed with
  the owner before the first push.**

---

## 15. Possible legacy n8n Cloud connections

**In the website runtime: none.** No fetch, no webhook call, no n8n reference in any
`app/`, `components/` or `lib/` file. The site makes no backend calls of any kind.

**In the repository: a P0 problem.**

`.mcp.json` is **tracked in git** and contains:

- `N8N_API_URL`: `https://antoniojesus.app.n8n.cloud`
- `N8N_API_KEY`: a full JWT bearer token, in plaintext

The GitHub remote is `https://github.com/NuovasolAJ/nuovasolution.git`. If that repository
is public, or has ever been public, or has any collaborator who should not hold n8n
production access, this key is compromised.

> **P0 — ACTION REQUIRED BY THE OWNER**
> 1. Rotate the n8n API key in the n8n Cloud instance **now**.
> 2. Remove `.mcp.json` from git tracking and add it to `.gitignore`.
> 3. Treat the key as leaked in git history — deletion in a new commit does **not** remove
>    it from history. History purge or key rotation is required; rotation is the reliable fix.
>
> Per governance rule R8, the implementation instance will not touch the n8n instance and
> will not rotate anything. This is escalated to the owner.

`.mcp.json` also configures a `n8n-mcp` server for agent tooling. That is a developer-tooling
concern, not a website runtime dependency, but it does not belong in this repository's
tracked files with live credentials.

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

## Consolidated findings

| ID | Sev | Finding |
|---|---|---|
| A-01 | **P0** | Live n8n Cloud API key committed in tracked `.mcp.json`. Owner must rotate. |
| A-02 | **P1** | Primary CTA is `href="#"` + `preventDefault()`; dead if the Cal.com script fails. |
| A-03 | **P1** | Absolute self-referencing URLs (`https://nuovasolution.com/live-demo`) break preview deployments and client-side navigation. |
| A-04 | **P1** | Spanish has no URL, no persistence, no `hreflang`, and `<html lang>` is hard-coded `en`. Bilingual requirement not met. |
| A-05 | **P1** | Render-blocking Google Fonts `@import` in `globals.css`; `next/font` unused. LCP/CLS risk. |
| A-06 | **P1** | 15 of ~17 required routes do not exist. No trial, pricing, login or onboarding path. |
| A-07 | **P1** | No API routes, no forms, no submission path for any conversion action. |
| A-08 | **P1** | `.next/` (180 files) and build artefacts tracked in git; `.gitignore` has 2 lines. |
| A-09 | **P1** | No security headers, no `vercel.json`, no CSP. |
| A-10 | **P2** | Three competing colour systems; no spacing/type/motion token layer. |
| A-11 | **P2** | ~285 KB of dead code and a fully redundant legacy static site tracked in the repo. |
| A-12 | **P2** | No custom analytics events; no conversion instrumentation. |
| A-13 | **P2** | No `metadataBase`, canonicals, sitemap, robots, OG image or structured data. |
| A-14 | **P2** | No `not-found.tsx`, `error.tsx` or `loading.tsx`. |
| A-15 | **P2** | Monolithic components (80 KB / 43 KB single files); no shared primitive layer. |

---

## Status

Audit complete for the pre-redesign codebase.
**Implemented and awaiting independent technical and final audit.**
