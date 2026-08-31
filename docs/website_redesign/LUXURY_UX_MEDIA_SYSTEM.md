# LUXURY UX & MEDIA SYSTEM — NuovaSolution

**Document role:** Source-of-truth #4 under `MASTER_GOVERNANCE.md` §3.
**Binding under:** R5 — *Visual rules and page architecture come from `LUXURY_UX_MEDIA_SYSTEM.md`.*
**Branch:** `website_enterprise_redesign`
**Created:** 2026-08-30
**Language of this document:** English, to match the other four governance documents. The
*website* remains EN + ES.

---

## 0. Scope, authority and limits

### 0.1 What this document decides

Design tokens, typography, grid, spacing rhythm, section architecture, component law,
motion, media treatment, responsive behaviour, accessibility standard, performance rules,
page architecture, and every video and screenshot placeholder.

Where this document says **BINDING**, implementation follows it exactly. A deviation
requires a logged conflict in `IMPLEMENTATION_STATUS.md` and owner approval (R5).

**Companion document.** `AUTHENTICATED_SURFACE_SYSTEM.md` extends this one for the
authenticated customer journey — signup, login, session, trial, the ten step onboarding
wizard, provider connections, uploads, plans and the testimonial surface. It introduces
**no new colour, no new token and no second system**; every rule here applies there
unchanged. Where the two documents overlap, this one wins on foundations (§2 to §4) and on
component construction (§5); the companion wins on which authenticated surfaces exist and
what they mean.

### 0.2 What this document does NOT decide

| Not decided here | Owning document |
|---|---|
| Whether a capability exists | `PRODUCT_TRUTH.md` |
| Whether a statement may be made publicly | `CLAIMS_MATRIX.md` |
| Any headline, sentence, label or button wording, EN or ES | `COPY_AND_CONVERSION_MASTER.md` |
| Whether an integration is connected | `INTEGRATION_CONTRACT.md` |
| Release, severity, process | `MASTER_GOVERNANCE.md` |

Every copy slot in this document is a **container specification**, written as
`[COPY: <slot-id>]`. No wording in this document is website copy. Where an example
sentence appears, it is marked `illustrative — not copy`.

### 0.3 Systems isolation (acknowledged)

This document is documentation only. It defines no live endpoint, triggers nothing,
references no credential value, and specifies every integration surface as **disabled by
default with an honest placeholder state**. All media placeholders are local files under
`/public/media/`. Nothing here authorises a request to any product, automation, database
or messaging system.

### 0.4 R6 in the visual layer

R6 (no invented customers, references, results, prices or statistics) applies to pixels,
not only to sentences. Concretely, and **BINDING**:

- No fabricated dashboard may ever be presented as evidence of the product.
- No fabricated client name, agency name, logo, avatar, portrait, testimonial or review.
- No fabricated number anywhere inside a screenshot, mockup, chart, badge or video frame.
- No fabricated award, certification, compliance mark or partner badge.
- Illustrative material is permitted **only** when it carries the visible `Illustrative`
  label defined in §5.11 and the behaviour it depicts is cleared in `CLAIMS_MATRIX.md`.

---

## 1. Brand direction

### 1.1 The idea

**Material, not magic.**

NuovaSolution is presented as infrastructure an agency runs on — the way a serious firm
presents its operating system, not the way a startup presents an app. The visual language
is drawn from architecture and print, not from software marketing: mineral black, warm
ivory, a single restrained champagne accent, hairline rules, large uninterrupted planes,
typography set with editorial confidence, and photography of Mediterranean light on stone,
glass and water.

The product is shown at scale, cropped by the page, and always real. Nothing floats.
Nothing glows. Nothing is decorated to compensate for having nothing to show.

### 1.2 The three-second test (BINDING acceptance gate)

Any composition ships only if all five are true:

1. A stranger could not confidently name the template it came from.
2. Removing every animation leaves the page fully legible and fully navigable.
3. Every visible surface carries either information or deliberate compositional air —
   nothing is present as filler.
4. Every product depiction is a real capture, or is labelled as not one.
5. The page reads as one system with the page before and after it.

### 1.3 Explicit anti-patterns (BINDING — extends `MASTER_GOVERNANCE.md` §9)

Forbidden as default patterns, in every language and every breakpoint:

| # | Forbidden | Replacement |
|---|---|---|
| 1 | Rows of equal-size rounded cards | Hairline-ruled editorial rows; asymmetric two-part splits |
| 2 | Bento grid without narrative purpose | Sequence or split composition where reading order is the story |
| 3 | Icon + heading + two sentences, repeated | Chapters with one product surface each; icons only as inline wayfinding |
| 4 | Purple/blue gradients | Two flat surfaces + a hairline. Gradients only as image scrims |
| 5 | Glassmorphism, backdrop blur as a language | Solid surfaces with one border token |
| 6 | Robots, brains, neural spheres, glowing nodes | Real product surfaces and real photography |
| 7 | Fake 3D blobs, mesh gradients, orbs | Nothing. The plane stays empty or carries content |
| 8 | Stock photography of smiling agents | Architecture, light, material, place; people incidental and unposed |
| 9 | Floating dashboard cards scattered on a hero | One product surface, edge-anchored, cropped by the container |
| 10 | Large radii (12px+) | 8px maximum, anywhere, on anything |
| 11 | Unused or accidental space | Every gap comes from a spacing token; no ad-hoc margins |
| 12 | Blanket `min-height` producing empty regions | Height comes from content + one section-padding token |
| 13 | Inconsistent section heights and layout jumps | Fixed section rhythm tokens; reserved media boxes |
| 14 | Animation without function | Motion budget §4.9; every animation states its purpose |
| 15 | Scroll hijacking, scroll pinning, heavy parallax | Normal document scroll; ≤8% parallax displacement or none |
| 16 | Pill-shaped primary buttons | `radius-sm` 4px on all buttons |
| 17 | Aurora / blurred colour blobs behind content | Removed entirely from the system |
| 18 | Dark-to-transparent "gradient seam" between sections | Three defined seam types only (§3.5) |
| 19 | A wizard or setup flow rendered as a grid of cards, tiles or panels | One hairline index of `StatusRow`s (`AUTHENTICATED_SURFACE_SYSTEM.md` §7.1) |
| 20 | Ring, donut, radial or segmented progress meters; percentage badges on rows | One 1 px hairline progress rule plus one `caption` line |
| 21 | Celebration: confetti, checkmark animations, trophies, streaks, mascots, emoji | The status changes. Nothing else happens |
| 22 | Toast stacks, floating notification piles, corner popups | Inline state at the point of action, in one region at reserved height |
| 23 | Avatar stacks, presence dots, activity feeds, gamified completion counters | Named rows, real status, nothing decorative |
| 24 | Skeletons whose dimensions do not match the real content | Reserved frames at measured heights |

Items 19 to 24 were added by Wave A3 and apply to authenticated surfaces, where these
failures actually occur. They are binding everywhere.

### 1.4 Relationship to the current live site

The current site is dark (`#0A0908` / `#0C0B09`) with a `#C9A96E` champagne accent already
in production. The new system **keeps the mineral-black + champagne axis** — that continuity
is deliberate and preserves brand recognition — and rebuilds everything above it: type,
grid, rhythm, radius, motion, surfaces and composition. The bright sand/ivory palette
specified in `CLAUDE.md` is *not* discarded; it is re-scoped as the **ivory editorial
surface** (§2.2) used for reading-dense pages and for contrast bands. See §12 for the
`CLAUDE.md` conflict analysis.

---

## 2. Colour system

### 2.1 Principles

- **Two canvases, one palette.** `ink` (mineral black) is the default canvas. `ivory` is
  the editorial canvas, used for reading-dense pages and for one deliberate contrast band
  per long page. They are not "light mode" and "dark mode" — they are two compositional
  registers of one brand, chosen per section, not per user preference.
- **Champagne is an accent, never a surface.** Champagne never fills a large area. Maximum
  one champagne-filled element per viewport.
- **No colour carries meaning alone.** Every status uses colour + icon + text (WCAG 1.4.1).
- **All colour hue is warm-neutral.** No blue-grey anywhere. Neutral ramp hue ≈ 40–45°,
  saturation ≤ 8%.

### 2.2 Tokens

CSS custom properties on `:root`, exposed to Tailwind via `theme.extend.colors`. Single
source of truth. The three competing colour systems found in the audit (A-10) are deleted.

**Neutral ramp — `ink`**

| Token | Hex | Role |
|---|---|---|
| `--ink-1000` | `#070706` | Deepest plane. Media letterboxing, footer base |
| `--ink-950` | `#0C0B09` | **Default canvas.** Page background |
| `--ink-900` | `#121110` | Raised surface — panels, mega menu, sticky header |
| `--ink-850` | `#191817` | Second surface — inputs, inner wells |
| `--ink-800` | `#201F1D` | Third surface — hover on raised, code/table zebra |
| `--ink-700` | `#2C2A27` | Hairline border on dark (decorative) |
| `--ink-600` | `#3D3A36` | Strong border on dark (decorative) |
| `--ink-500` | `#57534C` | Minimum body text on ivory (6.96:1) |
| `--ink-450` | `#6B665E` | **Interactive border on dark** (3.45:1 vs `ink-950`) |
| `--ink-400` | `#7A756C` | Non-text only. Never body text on either canvas |
| `--ink-350` | `#8E887E` | **Interactive border on ivory** (3.20:1 vs `ivory`) |
| `--ink-300` | `#9E988D` | Minimum muted text on dark (6.87:1) |
| `--ink-200` | `#C2BCB0` | Secondary text on dark (10.41:1) |
| `--ink-100` | `#DFDACF` | Hairline border on ivory (decorative) |
| `--ink-50` | `#F0ECE3` | Raised surface on ivory |
| `--ivory` | `#F7F4ED` | **Editorial canvas.** Primary text on dark |
| `--paper` | `#FCFAF5` | Highest light surface — inputs on ivory, cards on ivory |

**Accent — `champagne`**

| Token | Hex | Role |
|---|---|---|
| `--champagne-200` | `#E8D6AE` | **Focus ring on dark** (13.73:1). Emphasis text |
| `--champagne-300` | `#D9BC88` | Hover state of filled accent |
| `--champagne-400` | `#C9A96E` | **Brand accent.** Text on dark (8.79:1); accent fill |
| `--champagne-700` | `#7A5F30` | Accent text on ivory (5.45:1) |
| `--champagne-850` | `#6B5626` | **Focus ring on ivory** (6.41:1) |

**Signal — muted, mineral, never neon**

| Token | Hex (on dark) | Hex (on ivory) | Role |
|---|---|---|---|
| `--signal-positive` | `#7FA88C` (7.38:1) | `#3F6B52` (5.56:1) | Confirmed, complete |
| `--signal-attention` | `#D2A24C` (8.44:1) | `#8A5A21` (5.36:1) | Pending, needs input |
| `--signal-critical` | `#D97A6C` (6.51:1) | `#A33F30` (5.77:1) | Error, failure |

**Semantic aliases (what components actually reference)**

```
--surface-canvas      → ink-950   | ivory
--surface-raised      → ink-900   | paper
--surface-sunken      → ink-850   | ink-50
--text-primary        → ivory     | ink-950
--text-secondary      → ink-200   | ink-600
--text-muted          → ink-300   | ink-500
--text-accent         → champagne-400 | champagne-700
--border-hairline     → ink-700   | ink-100
--border-strong       → ink-600   | ink-200
--border-interactive  → ink-450   | ink-350
--focus-ring          → champagne-200 | champagne-850
--scrim               → linear-gradient(to top, ink-950 0%, ink-950/72% 42%, transparent 100%)
```

### 2.3 Verified contrast (BINDING minimums)

Computed WCAG 2.x ratios. Every pair below was calculated, not estimated.

| Pair | Ratio | Verdict |
|---|---|---|
| `ivory` on `ink-950` | **17.91** | AAA — default body and headings on dark |
| `ink-200` on `ink-950` | **10.41** | AAA — secondary text on dark |
| `ink-300` on `ink-950` | **6.87** | AA — **muted floor on dark** |
| `ink-400` on `ink-950` | 4.30 | ✗ FAILS AA — non-text use only |
| `champagne-400` on `ink-950` | **8.79** | AAA — eyebrows, accent text on dark |
| `champagne-400` on `ink-900` | **8.43** | AAA — accent text on raised dark |
| `ink-950` on `champagne-400` | **8.79** | AAA — accent-filled button label |
| `ink-950` on `ivory` | **17.91** | AAA — default text on ivory |
| `ink-600` on `ivory` | **10.30** | AAA — secondary text on ivory |
| `ink-500` on `ivory` | **6.96** | AA — **muted floor on ivory** |
| `ink-400` on `ivory` | 4.17 | ✗ FAILS AA — non-text only |
| `champagne-700` on `ivory` | **5.45** | AA — accent text on ivory |
| `champagne-400` on `ivory` | 2.04 | ✗ FORBIDDEN as text on ivory |
| `ink-450` border on `ink-950` | **3.45** | AA non-text — input/control boundary on dark |
| `ink-350` border on `ivory` | **3.20** | AA non-text — input/control boundary on ivory |
| `champagne-200` on `ink-950` | **13.73** | Focus ring on dark |
| `champagne-850` on `ivory` | **6.41** | Focus ring on ivory |
| `ink-700` on `ink-950` | 1.37 | Decorative hairline only — never a control boundary |

**BINDING rules from this table**

1. `ink-400` is never used for text on either canvas.
2. `champagne-400` is never used for text on `ivory`; use `champagne-700`.
3. A control's boundary uses `--border-interactive`, never `--border-hairline`.
4. Any new colour pair must be computed and added to this table before use.

#### 2.3.1 Raised-surface pairs (added by Wave A3)

The authenticated surfaces place text and controls on `ink-900`, `ink-850`, `ink-800`,
`paper` and `ink-50`, which the marketing composition never needed. **No new colour was
introduced** — only new pairings, all computed below.

| Pair | Ratio | Verdict |
|---|---|---|
| `signal-positive` on `ink-900` | **7.08** | AA |
| `signal-attention` on `ink-900` | **8.09** | AAA |
| `signal-critical` on `ink-900` | **6.24** | AA |
| `signal-positive` on `ink-850` | **6.66** | AA |
| `signal-attention` on `ink-850` | **7.61** | AAA |
| `signal-critical` on `ink-850` | **5.87** | AA |
| `signal-positive` on `ink-800` | **6.18** | AA |
| `signal-attention` on `ink-800` | **7.07** | AA |
| `signal-critical` on `ink-800` | **5.45** | AA |
| `ink-300` muted on `ink-900` | **6.58** | AA |
| `ink-200` secondary on `ink-900` | **9.98** | AAA |
| `ink-300` muted on `ink-800` | **5.75** | AA |
| `champagne-400` on `ink-850` | **7.92** | AAA |
| `ink-950` on `ink-50` | **16.69** | AAA |
| `ink-600` on `ink-50` | **9.59** | AAA |
| `ink-500` muted on `ink-50` | **6.48** | AA |
| `ink-500` muted on `paper` | **7.33** | AAA |
| `champagne-700` on `paper` | **5.74** | AA |
| `champagne-700` on `ink-50` | **5.08** | AA |
| `signal-positive-dk` on `paper` | **5.86** | AA |
| `signal-attention-dk` on `paper` | **5.65** | AA |
| `signal-critical-dk` on `paper` | **6.08** | AA |
| `signal-positive-dk` on `ink-50` | **5.18** | AA |
| `signal-attention-dk` on `ink-50` | **5.00** | AA |
| `signal-critical-dk` on `ink-50` | **5.38** | AA |
| `border-interactive` (`ink-450`) on `ink-900` | **3.31** | AA non-text |
| `border-interactive` (`ink-450`) on `ink-850` | **3.11** | AA non-text |
| `border-interactive` (`ink-450`) on `ink-800` | 2.89 | ✗ FAILS |
| `border-interactive` (`ink-350`) on `paper` | **3.37** | AA non-text |
| `border-interactive` (`ink-350`) on `ink-50` | 2.98 | ✗ FAILS |
| `ink-400` dashed upload border on `ink-900` | **4.12** | AA non-text |
| `champagne-400` progress fill vs `ink-700` track | **6.39** | AA non-text |
| focus ring on `ink-900` | **13.17** | — |
| focus ring on `ink-850` | **12.38** | — |
| focus ring on `paper` | **6.75** | — |
| focus ring on `ink-50` | **5.97** | — |
| `ink-900` surface vs `ink-950` canvas | **1.04** | Decorative only |
| `ink-850` surface vs `ink-950` canvas | **1.11** | Decorative only |

**Three further BINDING rules follow from these numbers**

5. **Interactive controls never sit on `ink-800` or `ink-50`.** `border-interactive`
   measures 2.89:1 and 2.98:1 there, below the 3:1 floor for a control boundary. Inputs,
   selects, upload zones and secondary buttons sit on `ink-900`, `ink-850` or `paper`.
   `ink-800` and `ink-50` are for non-interactive surfaces only — row hover backgrounds,
   table zebra.
6. **A surface step is not a boundary.** `ink-900` against `ink-950` is **1.04:1** and
   `ink-850` against `ink-950` is 1.11:1 — invisible as contrast. The S1 surface-step seam
   (§3.5) is decorative separation only. Any row boundary, selected state, hover state or
   focus state must carry a **border, a rule or a glyph**, never a surface change alone.
7. **The dashed upload border is the one dashed line in the system.** It uses `ink-400`
   (4.12:1), not `border-interactive`, because a receptacle must read as distinct from a
   field. Dashed borders appear nowhere else (§5.16).

### 2.4 Canvas selection (BINDING)

| Page / section type | Canvas |
|---|---|
| Homepage, platform, product, solutions, experience | `ink` |
| One deliberate contrast band per long page (max 1) | `ivory` |
| Pricing / access page body | `ivory` |
| Legal pages | `ivory` |
| Error pages, 404 | `ink` |
| Header, footer, mega menu, mobile sheet | `ink` always, on every page |
| **Signup, login, logout confirmation** | `ivory` |
| **Wizard shell, index and every step page** | `ink` — fields on `ink-850`, canvas never changes mid page |
| **Trial banner, trial expired state, readiness** | `ink` |
| **Plan selection, upgrade, checkout handoff** | `ivory` |
| **Testimonial surface** | `ivory` |

Canvas is a section property declared in the section spec. It is never toggled by the user.
There is **no dark-mode toggle**; `components/ui/dark-mode-toggle.tsx` is discarded.
A canvas never changes inside a page; it changes only between routes.

---

## 3. Typography, grid, spacing, rhythm

### 3.1 Font recommendations — licence and performance

The brand wordmark is a geometric monoline grotesque set in pure black. A high-contrast
serif display face would fight it. **Decision: the display voice is a grotesque set very
large with tight optical tracking.** An editorial serif is admitted only as a restrained
secondary voice for pull-quotes and standfirsts, never for section headings.

#### Option A — BINDING DEFAULT (ships now, zero licence risk)

| | |
|---|---|
| **Display + UI** | **Inter** (variable, `InterVariable.woff2`) |
| Licence | SIL Open Font License 1.1 — free, commercial use, self-hosting and subsetting permitted |
| Delivery | `next/font/local`, self-hosted, `display: swap`, subset `latin` + `latin-ext` |
| Weight | Variable 300–700 in a single file; latin+latin-ext subset ≈ **38–48 KB** woff2 |
| Performance | Best-in-class. Metric-compatible fallback available; `next/font` `adjustFontFallback` removes swap CLS |
| Risk | **Ubiquity.** Inter alone will not differentiate the brand |
| Mitigation (BINDING) | Differentiation comes from treatment, not novelty: display weight capped at **500**, tracking `-0.028em` at Display XL, generous leading in body, and strict adherence to the scale in §3.2. Never set headlines at 700 |

| | |
|---|---|
| **Editorial secondary** | **Newsreader** (variable, optical-size axis) |
| Licence | SIL OFL 1.1 — free, commercial, self-hostable |
| Delivery | `next/font/local`, subset `latin` + `latin-ext`, **italic + roman, weight 400 only** |
| Weight | ≈ **34 KB** for the restricted subset |
| Usage cap (BINDING) | Pull-quotes, standfirsts and figure captions only. Maximum **one** Newsreader element per viewport. Never a section heading, never a button, never navigation |
| Performance | Loaded with `display: swap`, **never preloaded**, never part of an LCP element |

**Playfair Display is removed.** It is high-contrast Didone-adjacent, reads fashion-retail
rather than enterprise, and clashes with the geometric wordmark.

#### Option B — commercial upgrade (owner decision, budget required)

If the owner funds a licence, replace Inter as the display + UI face. All four candidates
are self-hostable as woff2 under a standard web licence and are metric-similar enough that
the §3.2 scale holds unchanged.

| Face | Foundry | Character | Licence model | Performance note |
|---|---|---|---|---|
| **Söhne** | Klim Type Foundry | Neo-grotesque, Swiss, quietly expensive. Best fit for "material, not magic" | One-time web licence, tiered by monthly pageviews | Static weights; ship exactly 3 (400/500/600) ≈ 3 × 22 KB subset |
| **Aeonik** | CoType | Geometric grotesque; closest match to the NuovaSolution wordmark | One-time web licence, tiered by pageviews | Variable version available; single file |
| **GT America** | Grilli Type | Grotesque with a wide width range; strong for editorial sets | One-time web licence, tiered | Ship 1 width only, or payload doubles |
| **Suisse Int'l** | Swiss Typefaces | Rational, cold-precise | Annual or perpetual, tiered | Static only; ship 3 weights max |

**Licence costs are not quoted in this document.** They must be confirmed directly with the
foundry by the owner (R6 — no invented prices, including our own costs).

**Recommendation:** ship Option A now. Treat Option B as a Phase-2 swap that requires only
a change of font files and the `next/font` declaration, because the type scale, tracking and
component law are face-independent by design.

#### Loading rules (BINDING)

1. Fonts are **self-hosted** via `next/font/local`. The Google Fonts `@import` in
   `globals.css` is deleted (audit A-05).
2. Exactly **one** font file is `preload: true` — the display/UI variable face.
   Newsreader is never preloaded.
3. `display: swap` on both, with `adjustFontFallback` metric matching to hold CLS at 0.
4. Subsets: `latin`, `latin-ext`. `latin-ext` is required — Spanish `ñ`, `á`, `¿`, `«»`.
5. No third-party font CSS, no `fonts.googleapis.com` at runtime, no `preconnect` to it.
6. Total font payload budget: **≤ 90 KB** across all faces on any route.

### 3.2 Type scale

The scale is fluid via `clamp()` with **locked endpoints**, so that at any given viewport
width a token yields exactly one size everywhere on the site. This satisfies
`MASTER_GOVERNANCE.md` §9.11 (same hierarchy level = same size) while avoiding breakpoint
snapping in headlines. Endpoints are 375 px (mobile floor) and 1440 px (design ceiling).
Above 1440 px, type does not grow.

| Token | Mobile 375 | Desktop 1440 | `clamp()` | Line height | Tracking | Weight |
|---|---|---|---|---|---|---|
| `display-xl` | 40 px | 76 px | `clamp(2.5rem, 1.708rem + 3.38vw, 4.75rem)` | 1.02 → 1.06 | `-0.028em` | 500 |
| `display-l` | 34 px | 60 px | `clamp(2.125rem, 1.553rem + 2.44vw, 3.75rem)` | 1.06 → 1.10 | `-0.024em` | 500 |
| `display-m` | 30 px | 48 px | `clamp(1.875rem, 1.479rem + 1.69vw, 3rem)` | 1.10 → 1.14 | `-0.020em` | 500 |
| `heading-l` | 24 px | 34 px | `clamp(1.5rem, 1.28rem + 0.94vw, 2.125rem)` | 1.20 | `-0.015em` | 500 |
| `heading-m` | 20 px | 26 px | `clamp(1.25rem, 1.118rem + 0.56vw, 1.625rem)` | 1.28 | `-0.010em` | 500 |
| `heading-s` | 18 px | 20 px | `clamp(1.125rem, 1.081rem + 0.19vw, 1.25rem)` | 1.35 | `-0.005em` | 600 |
| `body-l` | 17 px | 19 px | `clamp(1.0625rem, 1.019rem + 0.19vw, 1.1875rem)` | 1.60 | `0` | 400 |
| `body-m` | 16 px | 17 px | `clamp(1rem, 0.978rem + 0.09vw, 1.0625rem)` | 1.65 | `0` | 400 |
| `body-s` | 15 px | 15 px | `0.9375rem` | 1.60 | `0` | 400 |
| `caption` | 13 px | 13 px | `0.8125rem` | 1.50 | `0.005em` | 450 |
| `eyebrow` | 11 px | 12 px | `clamp(0.6875rem, 0.66rem + 0.09vw, 0.75rem)` | 1.20 | `0.14em` | 600, uppercase |
| `legal` | 13 px | 13 px | `0.8125rem` | 1.70 | `0` | 400 |

**BINDING type rules**

1. `display-xl` appears **exactly once per page**, in the opening section, and is the `h1`.
2. Body text is never below **16 px** on any viewport. `body-s` and `caption` are for
   metadata, labels and captions — never for paragraphs a visitor must read.
3. Headings never use weight 700. The maximum heading weight is 500 (600 for `heading-s`).
4. `text-transform: uppercase` is used only by `eyebrow`. Nowhere else.
5. Italic is permitted only in the Newsreader pull-quote. Never in the UI face.
6. No `letter-spacing` above `0.14em`, and never positive tracking on sizes above 20 px.
7. One `h1` per page; no skipped heading levels; visual size never contradicts semantic level.

### 3.3 Line length (measure) — BINDING

| Element | Target measure | Hard maximum |
|---|---|---|
| `display-xl` / `display-l` headline | 16–22 ch | **24 ch** per line |
| `display-m` heading | 22–30 ch | **34 ch** per line |
| Lead paragraph (`body-l`) | 46–56 ch | **60 ch** |
| Body paragraph (`body-m`) | 58–66 ch | **68 ch** |
| Legal / long-form prose | 62–72 ch | **74 ch** |
| Caption | 30–40 ch | **44 ch** |
| List item | ≤ 2 lines | 3 lines |

Measure is enforced with `max-width` in `ch` on the text element, never by manual breaks.

**Manual line breaks:** `<br>` is forbidden except inside `display-xl` and `display-l`,
where at most **one** editorial break is permitted, supplied as a token by
`COPY_AND_CONVERSION_MASTER.md`, and it must be suppressed below 640 px
(`<br class="hidden sm:inline">`). Spanish strings are typically 15–25 % longer than
English — every headline container is verified against the ES string before a phase closes.

### 3.4 Spacing scale

4 px base. Only these values exist. Ad-hoc margins are a P2 finding.

| Token | px | Typical use |
|---|---|---|
| `space-1` | 4 | Icon-to-label |
| `space-2` | 8 | Inline chip padding |
| `space-3` | 12 | Tight stack |
| `space-4` | 16 | Default inline gap; mobile gutter |
| `space-5` | 20 | Control padding; mobile page gutter |
| `space-6` | 24 | Paragraph rhythm; grid gutter |
| `space-8` | 32 | Element group separation |
| `space-10` | 40 | Heading-to-body |
| `space-12` | 48 | Sub-block separation |
| `space-16` | 64 | Block separation |
| `space-20` | 80 | Major block separation |
| `space-24` | 96 | Intra-section separation |
| `space-32` | 128 | Reserved for section padding tokens |
| `space-40` | 160 | Reserved for section padding tokens |
| `space-48` | 192 | Maximum. Nothing exceeds this |

**Vertical rhythm inside a section (BINDING)**

```
eyebrow  → heading      : space-4   (16)
heading  → lead         : space-6   (24)
lead     → content      : space-12  (48) desktop / space-10 (40) mobile
content  → CTA row      : space-12  (48)
paragraph→ paragraph    : space-6   (24)
list item→ list item    : space-3   (12)
```

### 3.5 Section rhythm and seams

**Section vertical padding uses discrete breakpoint steps, not `clamp()`.** Reason: sibling
sections must be provably identical in rhythm, and a stepped value is auditable at a glance.
Type is fluid; space is stepped. This split is deliberate.

| Token | < 640 | 640–1023 | 1024–1439 | ≥ 1440 |
|---|---|---|---|---|
| `section-y-compact` | 56 | 64 | 80 | 88 |
| `section-y-default` | 80 | 96 | 128 | 144 |
| `section-y-feature` | 96 | 120 | 160 | 184 |
| `section-y-flush` | 0 | 0 | 0 | 0 |

Nothing exceeds 184 px of section padding. A section's height is
`padding-top + content + padding-bottom` — **nothing else**. `min-height` is permitted on
exactly three elements: the fixed header, the opening section (§4.1), and media frames
(which use `aspect-ratio`, not `min-height`).

**Seam types (BINDING — exactly three exist)**

| Seam | Construction | When |
|---|---|---|
| **S1 — Surface step** | Adjacent sections use different `--surface-*` values; no rule | Default between two content sections on the same canvas |
| **S2 — Hairline rule** | 1 px `--border-hairline`, inset to container width (never full-bleed) | When both sections share a surface value and need articulation |
| **S3 — Full-bleed band** | The next section is a media or ivory band running edge-to-edge with `section-y-flush` at the boundary | Maximum **twice** per page |

Gradient fades, glowing seams and blurred transitions are forbidden.
`components/ui/section-divider.tsx` is discarded.
No seam type may repeat more than **twice consecutively**.

### 3.6 Grid and containers

| Breakpoint | Columns | Gutter | Page gutter |
|---|---|---|---|
| < 640 | 4 | 16 | 20 (24 at ≥ 400) |
| 640–1023 | 8 | 20 | 32 |
| 1024–1439 | 12 | 24 | 48 |
| ≥ 1440 | 12 | 32 | 64 |

**Containers**

| Token | Max width | Use |
|---|---|---|
| `container-text` | 720 px | Prose, legal pages, FAQ answers |
| `container-narrow` | 640 px | Forms, single-column onboarding |
| `container-default` | 1240 px | **Default.** All standard sections |
| `container-wide` | 1440 px | Product surfaces, media frames, mega menu |
| `container-bleed` | 100 % | Header, footer, S3 media bands, opening backdrop |

Above 1440 px the container centres and **layout does not change**. Only a background may
extend. This is the design ceiling.

### 3.7 Composition law — asymmetry (BINDING)

Symmetric 50/50 splits are forbidden as a default. Permitted split ratios on ≥ 1024 px,
expressed in 12 columns:

| Ratio | Columns | Use |
|---|---|---|
| **7 / 5** | text 7, media 5 | Text-led chapter |
| **5 / 7** | text 5, media 7 | Product-led chapter |
| **4 / 8** | text 4, media 8 | Large product surface |
| **8 / 4** | text 8, media 4 | Editorial with supporting detail |
| **6 / 6** | — | Only in the closing CTA section |

Consecutive split sections must **alternate** the media side. Three sections with media on
the same side is a P2 finding.

The column gap between the two halves is `space-16` (64) at ≥ 1280, `space-12` (48) at
1024–1279. Empty grid cells are forbidden unless declared in the section spec as an
intentional **air column**, with a stated compositional reason.

### 3.8 Alignment law (BINDING — resolves prohibition §9.9)

- **All headings are left-aligned.** This is the default and the near-universal case.
- **Centred headings are permitted in exactly three places, and nowhere else:**
  1. The final closing CTA section of any page.
  2. The title of a legal page.
  3. An error, empty or 404 state.
- Where a heading is centred, its eyebrow, lead and CTA row are centred with it, and the
  centred body text may not exceed **three lines** at any breakpoint.
- Body text is never centred outside those three cases.
- Numbers, tables, prices and any comparison structure are always left-aligned or
  decimal-aligned. Never centred.
- Mobile does not change alignment. A heading left-aligned on desktop is left-aligned on
  mobile. Random re-centring on small screens is a P2 finding.

### 3.9 Borders and radii (BINDING)

| Token | Value | Use |
|---|---|---|
| `border-hairline` | 1 px `--border-hairline` | Section seams, list rules, table rules |
| `border-strong` | 1 px `--border-strong` | Panel edge, media frame on ivory |
| `border-interactive` | 1 px `--border-interactive` | Inputs, selects, secondary buttons |
| `border-focus` | 2 px `--focus-ring`, offset 2 px | Focus only |
| `border-selected` | 2 px `--champagne-400` inset | Selected option, active tab underline |

**2 px borders exist only for focus and selection.** No 3 px, no 4 px, no dashed, no double.

| Radius | Value | Applies to |
|---|---|---|
| `radius-0` | 0 | **Default.** Media frames, product surfaces, panels, section blocks, images |
| `radius-sm` | 4 px | Buttons, inputs, selects, chips, small controls |
| `radius-md` | 8 px | **Maximum anywhere.** Mega-menu panel, mobile sheet, dialog |
| `radius-pill` | 999 px | Only: language segmented control, status pill, avatar |

Buttons are `radius-sm`. Fully rounded buttons are forbidden — this is an explicit,
deliberate break from the current site's `rounded-full` buttons.

### 3.10 Shadow and elevation (BINDING)

On a mineral-black canvas, blur-based shadows are close to invisible and read as cheap when
pushed. **Elevation on dark is expressed by surface value + border, not by shadow.**

Exactly four shadow tokens exist:

| Token | Value | Use |
|---|---|---|
| `shadow-lift` | `0 1px 2px rgba(0,0,0,.40), 0 8px 24px -8px rgba(0,0,0,.50)` | Hover on an interactive media block, dark canvas |
| `shadow-overlay` | `0 24px 64px -16px rgba(0,0,0,.65)` | Mega menu, dialog, mobile sheet |
| `shadow-lift-light` | `0 1px 2px rgba(12,11,9,.06), 0 8px 24px -10px rgba(12,11,9,.12)` | Hover, ivory canvas |
| `shadow-overlay-light` | `0 24px 64px -16px rgba(12,11,9,.18)` | Overlay on ivory |

No other shadow. No glow, no coloured shadow, no inset shadow — with one exception:
`highlight-top` (`inset 0 1px 0 rgba(255,255,255,.04)`) may be applied to raised dark
surfaces to define a top edge. Champagne glow is forbidden entirely, including on the
focus ring and including the current `textShadow` treatments in `hero.tsx`.

---

## 4. Motion system

### 4.1 Principles

Motion exists to explain a state change or a spatial relationship. Motion that only
decorates is deleted. Motion never gates readability, never blocks input, never moves the
page under the user's finger.

### 4.2 Tokens

| Token | Duration | Easing | Use |
|---|---|---|---|
| `motion-micro` | 120 ms | `cubic-bezier(.2,0,0,1)` | Hover, colour, opacity on controls |
| `motion-control` | 200 ms | `cubic-bezier(.2,0,0,1)` | Menu open, sheet open, accordion |
| `motion-element` | 320 ms | `cubic-bezier(.22,1,.36,1)` | Scroll reveal of a block |
| `motion-scene` | 520 ms | `cubic-bezier(.22,1,.36,1)` | Media state change, chapter transition |
| `motion-exit` | 160 ms | `cubic-bezier(.4,0,1,1)` | Anything leaving |

No animation exceeds **520 ms**. There is no 800 ms token; the current 0.9–1.0 s hero
animations are removed.

### 4.3 Property restriction (BINDING)

Only `transform` and `opacity` animate. Never `width`, `height`, `top`, `left`, `margin`,
`filter`, `box-shadow` or `background-position`. `filter: blur()` is never animated.

### 4.4 Scroll reveal

- Displacement: **12 px** mobile, **16 px** desktop. Never more.
- Trigger: `IntersectionObserver`, `threshold 0.2`, `rootMargin: 0px 0px -8% 0px`, once.
- Stagger: 60 ms per item, **maximum 5 items**, maximum 300 ms total. Lists longer than
  5 items reveal as one block.
- Reveal is applied to **blocks**, never to individual words or characters. No typewriter
  effects. `components/ui/typewriter-effect.tsx` is discarded.

### 4.5 No-JS and pre-hydration safety (BINDING — resolves prohibition §9.12)

Content must never be invisible because animation did not run. The current
`framer-motion` pattern (`initial={{opacity:0}}`) serialises `opacity: 0` into the SSR HTML
and fails this test.

**Required pattern:**

1. An inline script in `<head>` sets `document.documentElement.dataset.js = "on"` before
   first paint.
2. The hidden state is expressed as `[data-js="on"] .reveal { opacity: 0; transform: … }`.
3. The observer adds `.is-revealed`, which returns to `opacity: 1; transform: none`.
4. With JS disabled or failed, every element renders at full opacity. Verified in the
   phase-close checklist.

A single `<Reveal>` primitive implements this. Framer Motion is retained only for the
mega menu, the mobile sheet and the media player state — not for scroll reveals.

### 4.6 Forbidden motion

Scroll hijacking; scroll-pinned sections that hold the viewport; parallax above 8 %
displacement; horizontal auto-scroll marquees; infinite loops above the fold; bouncing;
spinning; rotating; scale above 1.02; entrance animation on any interactive control above
the fold beyond opacity; anything that delays a control becoming clickable.

The `/v2` `100svh` sticky "film" section and the `aurora-1/2/3` keyframes are discarded.

### 4.7 Reduced motion (BINDING)

`@media (prefers-reduced-motion: reduce)`:

- All transform reveals become `opacity` only at 120 ms, or are removed entirely.
- All looping and ambient animation stops and renders its final frame.
- Autoplaying ambient video does not load; the poster still is shown with a visible
  play control.
- Skeleton shimmer becomes a static tint.
- `scroll-behavior: smooth` is disabled.
- Mega menu and mobile sheet open instantly with no transform.

Reduced motion is not a degraded experience — every layout is designed to be complete
without motion first.

### 4.8 Interaction is never blocked

Header, navigation, primary and secondary CTAs and the skip link are interactive at first
paint. No overlay, no entrance animation and no media element may intercept a pointer or
keyboard event before or during an animation. `pointer-events: none` on all decorative
layers, always.

### 4.9 The motion budget (BINDING)

Per viewport, at most: **one** scene-level animation (520 ms), **three** element reveals,
and unlimited micro-interactions. Every animation in a section spec must state its purpose
in one line. An animation with no stated purpose is deleted.

---

## 5. Component law

### 5.1 Button hierarchy (BINDING)

Wording comes from `COPY_AND_CONVERSION_MASTER.md`; the CTA *ladder* is set by
`MASTER_GOVERNANCE.md` §11 and is currently blocked by conflict **C-01**. This section
defines the **slots**, which are stable regardless of how C-01 resolves.

| Slot | Style | Construction |
|---|---|---|
| **Primary** | Champagne fill | `bg: champagne-400`, `text: ink-950` (8.79:1), `radius-sm`, no border, no shadow. Hover: `champagne-300` + `translateY(-1px)`. Active: `translateY(0)` |
| **Secondary** | Outline | `bg: transparent`, `text: text-primary`, `border-interactive`. Hover: `bg: surface-raised` |
| **Tertiary** | Text + rule | `text: text-primary`, no border, 1 px underline offset 4 px in `border-hairline`. Hover: underline → `champagne-400` |
| **Quiet** | Inline link | `text: text-accent`, underline on hover only. Body-copy links |
| **Destructive** | — | Does not exist on a marketing site |

**Sizes**

| Size | Height | Padding-x | Type | Use |
|---|---|---|---|---|
| `sm` | 40 px (44 px touch box) | 16 | `body-s` 500 | Header, dense rows |
| `md` | 48 px | 24 | `body-m` 500 | **Default** |
| `lg` | 56 px | 32 | `body-l` 500 | Opening section, closing CTA |

**Rules**

1. **One primary button per viewport.** Two primaries in one view is a P1 finding.
2. A CTA row is at most **Primary + Secondary**, plus optionally one Tertiary on a new line.
3. Buttons never wrap to two lines. If the ES string does not fit, the size steps down
   before the label wraps — verified per breakpoint.
4. Minimum touch target 44 × 44 px, achieved with padding, not with a larger visual box.
5. Every button that leaves the site or opens an overlay says so via an icon
   (`arrow-up-right` / `play`) at 16 px, `space-2` after the label.
6. A button whose target system does not exist renders in the honest-state treatment
   (§5.9), never as a dead control. Under `INTEGRATION_CONTRACT.md`, only *Book a demo*
   currently has a live target.
7. Anchors carry a real `href`. Progressive enhancement only: the Cal.com embed intercepts
   an anchor whose `href` is already the real booking URL. `href="#"` +
   `preventDefault()` is forbidden (audit A-02).

### 5.2 Header / navigation (BINDING)

**Identical on every page** (prohibition §9.10). Only the background treatment has two
defined states, and the state is determined by the page's first section type, not by taste.

| | |
|---|---|
| Position | `fixed`, `z-index: 100` |
| Height | **72 px** ≥ 1024; **64 px** 640–1023; **60 px** < 640 — exposed as `--header-h` |
| Layout reservation | Every page's first section adds `padding-top: var(--header-h)`. No content sits under the header |
| State A — *over-opening* | Transparent background, no border. Used only when the first section is a dark opening with its own backdrop |
| State B — *solid* | `bg: ink-950`, `border-bottom: 1px border-hairline`. Applied on all other pages, and on every page after 8 px of scroll |
| Transition | `motion-control` on `background-color` and `border-color` only |
| No backdrop blur | Solid surface (no glassmorphism) |

**Contents, left to right:** logo lockup → primary navigation → utility cluster
(language switcher, secondary CTA, primary CTA).

**Primary navigation items:** `Platform` (mega), `Solutions` (mega), `Pricing`,
`Experience`. Four items maximum. A fifth item requires a logged conflict.

`Log in` is **not rendered** until conflict **C-03** is resolved. Under R7 it may not point
at an invented URL, and under §6 it may not render as a control that goes nowhere.

**Logo (BINDING):** the mark is preserved unchanged. It is rendered from an **SVG authored
in ivory** for dark surfaces and in `ink-950` for ivory surfaces. The current
`filter: brightness(0) invert(1)` on a black PNG is discarded — it is a colour hack, costs a
compositing layer, and prevents any accent treatment. Logo height: 28 px < 640, 32 px ≥ 640.
Clear space around the lockup: ≥ 0.5 × logo height on all sides. The logo is never
distorted, re-coloured beyond the two authored versions, outlined, shadowed or animated.

### 5.3 Mega menu (BINDING)

| | |
|---|---|
| Trigger | `<button aria-expanded aria-controls>`. Opens on click/Enter/Space, and on **hover intent** (140 ms dwell) with a 200 ms close delay |
| Panel | Full-width, `container-wide` inner, `bg: ink-900`, `border: 1px border-hairline`, `radius-md` on the bottom two corners only, `shadow-overlay` |
| Height | Content-driven; `max-height: 70vh` with internal scroll. Never full-screen on desktop |
| Structure | Three link columns + one right rail. **Not a bento.** Columns are separated by vertical hairlines |
| Link column | Section eyebrow → 4–6 rows. Row = label (`heading-s`) + one-line descriptor (`caption`, `text-muted`). Row height 56 px, hover = `bg: ink-850` |
| Right rail | One **poster still** (never a playing video), 16:9, `radius-0`, plus one caption line and one Tertiary CTA. Loads `loading="lazy"` |
| Motion | `opacity 0→1` + `translateY(-4px→0)` over `motion-control`. No scale, no blur |
| Dismissal | `Escape` (focus returns to the trigger), outside click, focus leaving the panel, route change |
| Keyboard | Linear tab order through the panel. `Escape` closes. Focus is trapped only while open and only for `Escape`/`Tab` — never a modal trap |
| A11y | Panel `role="group"` + `aria-labelledby` on the trigger; trigger `aria-expanded`; decorative rail image `alt=""` |
| Only one panel open at a time | Opening one closes the other |

### 5.4 Mobile navigation (BINDING)

| | |
|---|---|
| Trigger | 44 × 44 px button, two 1 px rules (not three), `aria-expanded`, `aria-controls` |
| Panel | **Full-screen sheet**, `height: 100dvh`, `bg: ink-950`, not a narrow drawer |
| Header row | Logo + close button remain pinned at `--header-h` |
| Body | Scrollable. `Platform` and `Solutions` are accordions (`<button aria-expanded>` + region), one open at a time. Row height **56 px**, 1 px hairline between rows |
| Footer row | Pinned to the bottom, inside `env(safe-area-inset-bottom)`: language switcher (full-width segmented), then Secondary CTA, then Primary CTA, stacked, `space-3` apart |
| Scroll lock | `position: fixed` on `body` with scroll offset preserved and restored exactly. No layout jump on open/close |
| Motion | `opacity` + `translateY(8px)` over `motion-control`. Instant under reduced motion |
| Dismissal | Close button, `Escape`, route change, back gesture |
| Focus | Moves to the close button on open; returns to the trigger on close; trapped inside while open (this one *is* a modal) |

The current `!important` media-query cascade down to 300 px in `nav.tsx` is discarded. The
new header is verified at 320 px with no `!important` and no font-size overrides.

### 5.5 Footer (BINDING)

Full-bleed, `bg: ink-1000`, top edge = 1 px `border-hairline`, `section-y-feature` top
padding, `section-y-compact` bottom.

**Four zones**

1. **Brand zone** (cols 1–4): logo (ivory SVG) + one positioning line (`body-m`,
   `text-secondary`, ≤ 2 lines) `[COPY: footer.positioning]`.
2. **Product columns** (cols 5–8): two columns — *Platform* and *Solutions* link lists.
   `body-s`, row height 32 px, hover → `champagne-400`.
3. **Company column** (cols 9–12): company, pricing, experience, onboarding, security &
   governance, contact.
4. **Bottom bar**: 1 px hairline above; language switcher · legal links · legal entity name
   · copyright. `caption`, `text-muted`. Legal entity is taken from the existing legal
   pages — never re-typed or invented.

**No newsletter form** until a real endpoint exists (R7). A form that goes nowhere is a P0
violation under §6. Omission is the honest choice.

Mobile: zones stack; product/company link lists become two accordions; the bottom bar
becomes a centred stack. Footer link rows are 44 px tall on mobile.

### 5.6 Forms (BINDING)

| Aspect | Rule |
|---|---|
| Canvas | Forms sit on `ivory`. `container-narrow` (640 px) |
| Label | Always visible, above the field, `body-s` 500, `space-2` gap. **Placeholder-as-label is forbidden** |
| Field | Height 48 px (52 px < 640), `radius-sm`, `bg: paper`, `border-interactive` (3.20:1 verified), `body-m` |
| Placeholder | Optional format hint only, `text-muted`, never required to understand the field |
| Required | The word `Required` as `caption` beside the label. Asterisk-only is forbidden |
| Focus | `border-focus` — 2 px `champagne-850`, offset 2 px. Border colour also changes |
| Help text | Below the field, `caption`, `text-muted`, `space-2` |
| Error | Below the field, `signal-critical` + 16 px icon + text. `role="alert"`, `aria-invalid`, `aria-describedby`. **Never colour alone** |
| Error summary | Above the form on submit failure, focus moved to it, each item a link to its field |
| Success | Replaces the form in the same reserved box. States exactly what happened and what arrives next. `role="status"`, focus moved |
| Submit | Full-width < 640; auto-width ≥ 640. **Width is locked** — the label swaps in place, never resizing the button |
| In-flight | `aria-busy="true"`, control locked against resubmission, spinner only after 300 ms |
| Layout stability | The form's outer box has a reserved minimum height covering the tallest of its idle / error / success states, so no state change shifts the page |
| Attributes | `autocomplete`, `inputmode`, `enterkeyhint` and `type` set correctly on every field. `type="email"` + `inputmode="email"`, phone `inputmode="tel"` |
| Privacy | A `legal`-sized line at the point of collection, linking to the privacy policy, in the active language. GDPR + LSSI-CE |
| Honest state | **If the endpoint does not exist, the form is not rendered.** The slot renders the §5.9 pending treatment instead |
| File inputs | Not covered here. See **§5.16 — File input and upload law** |

### 5.7 Pricing presentation (BINDING)

Conflict **C-06** is open: no confirmed prices exist. R6 forbids invented prices, tiers,
inclusion lists, discounts, terms and "from €X" figures. Therefore **two layouts** are
specified, and only Layout B may ship today.

**Layout B — Access model (ships now)**

- Canvas `ivory`, `container-default`.
- Opening: left-aligned `display-m` + `body-l` lead `[COPY: pricing.lead]`.
- One editorial statement block explaining that engagement is scoped per agency
  `[COPY: pricing.model]` — wording from the copy document, cleared by `CLAIMS_MATRIX.md`.
- A **Fit criteria** list: 4–6 rows, hairline-separated, each row = `heading-s` + one
  `body-s` line. This is a qualification device, not a feature grid.
- One CTA row: Primary (per the resolved ladder) + Secondary *Book a demo*.
- **No numbers. No tier names. No currency. No comparison table.**

**Layout A — Public pricing (only after `PRODUCT_TRUTH.md` confirms real prices)**

- **Not three rounded cards.** One bordered plane, `radius-0`, divided by vertical 1 px
  hairlines into 2–4 columns.
- The recommended column is marked by a 2 px `champagne-400` rule along its **top edge**
  and a slightly raised surface — never a coloured card, never a floating badge.
- Column head: tier name (`heading-l`) → price (`display-m`, tabular numerals) → billing
  basis (`caption`) → CTA.
- Inclusion rows are a shared-baseline table: one row per capability across all columns,
  hairline-separated, so rows align horizontally across the whole plane.
- Period toggle appears **only** if both periods are confirmed real. It is a segmented
  control (`radius-pill`), `aria-pressed`, and it must not change the plane's height —
  price cells have a reserved height.
- Mobile: the plane becomes a vertical stack of tier sections, each with its own inclusion
  list. **Never** a horizontally scrolling price table on mobile.
- Every price carries the tax basis and currency in `caption` beneath it.

**Under both layouts:** any control whose target system is absent routes to *Book a demo*
per `INTEGRATION_CONTRACT.md` §9.

### 5.8 Trust treatment (BINDING)

Trust is built from specificity, not from decoration. R6 is absolute here.

**Permitted trust devices**

1. **Operational specificity** — language and product surfaces precise enough that an
   agency owner recognises their own workflow. This is the primary device.
2. **Governance surface** — a `Security & Governance` page stating real, verified practices
   only. Every line requires a `PRODUCT_TRUTH.md` entry.
3. **Legal identity** — real legal entity, real registered address, real contact, drawn
   from the existing legal pages and surfaced in the footer.
4. **Real place** — licensed photography of the actual market (Andalusia / Costa del Sol).
5. **Evidence blocks** — the pattern below.

**Evidence block pattern (BINDING)**

```
claim (heading-s)  →  basis (body-s, text-muted)  →  source link (quiet button)
```

If the *basis* is missing, the claim is not displayed. A number without a basis line is a
P0 finding.

**Forbidden until real and permissioned in writing:** client logo walls, testimonials,
quotes, portraits, case studies, star ratings, review-platform badges, counters
("X leads processed"), percentages, response-time figures, ROI figures, award marks,
certification badges, "trusted by" strips, and placeholder grey logo boxes that imply
clients exist.

**Logo-wall placement rule:** if and when real, permissioned client logos exist, they are
rendered at a single normalised optical height on one hairline-ruled row at
`text-muted` opacity — never in a scrolling marquee.

### 5.9 Honest states (BINDING — implements `MASTER_GOVERNANCE.md` §6)

Three approved visual treatments for a control whose target system does not exist. All
three are designed, premium and truthful — never a greyed-out stub.

| State | Visual | Behaviour |
|---|---|---|
| **Pending** | Secondary button style, `border-interactive` dashed at 1 px, label per copy doc, plus a `caption` line beneath stating why in one sentence | Routes to the working fallback (*Book a demo*) |
| **Request access** | Secondary button, solid border | Opens a real request path — only if that path exists |
| **Fallback** | Full Primary or Secondary treatment | *Book a demo*, the one live target |

A disabled control must state *why*, in one line, in the active language, with
`aria-disabled="true"` (not the `disabled` attribute, so it stays focusable and its reason
is announced). A control that looks active and does nothing is a P0 finding.

### 5.10 Image treatment (BINDING)

**Subject matter.** Architecture, light, material and place: Mediterranean and Andalusian
exteriors and interiors, stone, lime render, terracotta, glass, water, olive and palm
shadow, terraces, coastline, late-afternoon light. Interiors empty or near-empty.

**People.** Permitted only as incidental, unposed, distant, partial, or from behind. No eye
contact with the camera. No handshakes, no laptops on café tables, no smiling agents, no
group meetings, no thumbs up. If a frame would work as generic B2B stock, it is rejected.

**Grade (applied uniformly so all imagery reads as one shoot).**
Warm neutral; shadows tinted warm, never blue; highlights held below pure white;
saturation −8 %; contrast +4; no HDR halos; no vignette; no filter presets. This grade is
recorded once and applied to every image before it enters `/public`.

**Layout treatment.**

- `radius-0`. Always. Images are never rounded.
- No drop shadow. No border on dark. `border-strong` 1 px on `ivory`.
- Images are **full-height blocks or exact-ratio frames**, cropped by their container.
  Never a small floating picture with air on all sides.
- Text over an image requires the `--scrim` token, and the text must clear 4.5:1 against the
  *darkest scrim value*, verified — not against an average.
- Permitted ratios: `16:9`, `3:2`, `4:5`, `1:1`, `21:9` (desktop bands only).
- Duotone, colour overlays, blend modes and pattern overlays are forbidden.

**Technical (BINDING).**

- `next/image` everywhere, with explicit `width`/`height` **or** `fill` inside an
  `aspect-ratio` box. Never an unsized image.
- `sizes` is mandatory on every `fill` image and every responsive image.
- `priority` on **at most one** image per route, and only if it is above the fold.
- Formats: AVIF then WebP via `next.config.js` `images.formats`; source assets stored as
  high-quality originals outside the served path.
- `alt`: decorative → `alt=""` + `aria-hidden`; meaningful → describes the *purpose*, not
  the pixels; never the filename; localised per locale.
- Every image has a licence entry in `docs/website_redesign/ASSET_LICENSES.md`
  (**to be created — see §14**). An image without a licence record does not ship.

### 5.11 Product UI treatment (BINDING — the R6 firewall)

This is the most important component rule on the site, because it is where a design system
most easily starts lying.

**The `ProductSurface` primitive** wraps every depiction of the product. It has exactly
three states, and the state is a required prop:

| State | Meaning | Visual | Label |
|---|---|---|---|
| `capture` | A real screen recording or screenshot of the real system | Full-bleed capture inside a 1 px `border-strong` frame, `radius-0` | None required |
| `illustrative` | A designed representation of behaviour that is **cleared in `CLAIMS_MATRIX.md`** | Same frame + a persistent `Illustrative` chip, top-left inside the frame, `caption`, `radius-sm`, `border-interactive` | **Required, always visible** |
| `pending` | The capture does not exist yet | The frame at its exact final aspect ratio, `bg: ink-900`, a 1 px `border-hairline` diagonal field at 4 % opacity, and a centred `caption` in `text-muted` | `Product view — capture pending` |

**Rules**

1. The `pending` state contains **no fabricated UI**: no fake rows, no fake names, no fake
   numbers, no fake charts, no fake avatars, no fake notifications. It is an empty
   architectural frame. This is what makes it R6-safe.
2. `pending` occupies the **exact final dimensions** of the eventual capture, so replacing
   the asset causes **zero layout shift**.
3. The `Illustrative` chip may not be hidden on hover, scroll or mobile.
4. **No fabricated dashboard is ever the final product proof.** A `pending` frame shipping
   to production is acceptable and honest; a fabricated screenshot is not.

**Composition rules**

- A product surface occupies **≥ 60 %** of its container width on ≥ 1024 px, is anchored to
  one edge, and is **cropped by the container** — it runs out of frame. It is never a
  small complete card floating in space.
- **No perspective, no 3D tilt, no rotation, no reflection, no stacked-card depth.**
- Maximum **one** primary product surface per section. A section may add **one** supporting
  detail crop, at ≤ 40 % the width of the primary, aligned to the same grid.
- Two device frames exist, and only two:
  - **Phone frame** — a 1 px `border-strong` rounded rectangle at `radius-md`, 9:19.5,
    no bezel art, no notch drawing, no shadow. Used for alert/messaging moments.
  - **Browser frame** — a 32 px bar with a 1 px bottom hairline and the URL as plain
    `caption` text. **No coloured traffic-light dots.**
- No annotation arrows, no callout bubbles, no zoom lenses, no red circles.

**Mobile presentation of product screens (BINDING).**
Desktop captures are **never** scaled down to fit a phone. Every product surface ships two
assets:

- `…-desktop` — the wide capture, used ≥ 768 px.
- `…-mobile` — a **separately framed capture of one region** of the same view, at `4:5` or
  `1:1`, showing a single legible element.

After rendering, the smallest text inside a product capture must be **≥ 11 px effective**
on a 375 px viewport. If it is not, the crop is wrong and must be re-taken.

The only permitted alternative, for genuinely wide tabular views, is a horizontal
scroll container with `scroll-snap-type: x mandatory`, a visible edge fade **and** a visible
"scroll" affordance, keyboard-scrollable, `role="region"` with `aria-label` and `tabindex="0"`.
Pinch-zoom-only is never acceptable.

### 5.12 Language switcher (BINDING)

- **A navigation control, not client state.** Each option is a real `<a>` to the same page
  in the other locale, preserving the path. This makes Spanish linkable, shareable and
  indexable, and resolves audit finding A-04 at the design level.
- Visual: a segmented control, `radius-pill`, two items `EN` / `ES`, 1 px
  `border-interactive`, active item `bg: surface-raised` + `text-primary`, inactive
  `text-muted`. Height 32 px in the header, 44 px in the mobile sheet.
- **No flags.** Flags denote countries, not languages, and misrepresent a multilingual
  market.
- `aria-current="true"` on the active locale; each link carries `hreflang` and `lang`.
- Choice persists in a cookie **and** is expressed in the URL; the URL always wins.
- `<html lang>` reflects the active locale on every route.
- The switcher is present in the header and in the footer bottom bar. Exactly two places.

### 5.13 Focus states (BINDING)

- Global `:focus-visible` → 2 px solid `--focus-ring`, `outline-offset: 2px`.
  On dark: `#E8D6AE` (13.73:1). On ivory: `#6B5626` (6.41:1).
- `outline: none` without a replacement ring is forbidden anywhere in the codebase.
- Focus is never obscured by the fixed header: every focusable element uses
  `scroll-margin-top: calc(var(--header-h) + 16px)` (WCAG 2.2 — Focus Not Obscured).
- A **skip-to-content** link is the first focusable element on every page, visually hidden
  until focused, then rendered as a Secondary button at top-left.
- Focus order follows visual order. No positive `tabindex`.
- Custom controls (accordion, segmented control, media player) implement roving focus and
  standard key handling; `Escape` always dismisses an expanded surface and returns focus to
  its trigger.

### 5.14 Loading states (BINDING)

- **Reserved space first.** Every asynchronous region declares its dimensions before it
  loads. This is the primary CLS defence.
- Skeletons only where the real content will occupy the *same* box. Otherwise: an empty
  reserved frame with no shimmer.
- Skeleton = `bg: surface-sunken`, `radius` matching the target, with a 1200 ms linear
  opacity pulse between 1.0 and 0.7. No moving gradient sweep. Static under reduced motion.
- Spinners appear only after **300 ms**, are 16 px, and use `currentColor`.
- No full-page route-transition loader. No progress bar at the top of the page.
- Images use no blur-up placeholder on the dark canvas (it reads as a defect); they fade
  from `surface-sunken` at `motion-control`.
- Below-the-fold sections use `content-visibility: auto` with `contain-intrinsic-size`
  matching their real rendered height, so skipped rendering never causes shift.

### 5.15 Error and empty states (BINDING)

| Case | Treatment |
|---|---|
| **404** | `ink` canvas, `container-text`, centred (one of the three permitted centred cases). `display-m` + `body-l` + three real links (Home, Platform, Book a demo). No illustration, no large "404" numeral graphic |
| **500 / `error.tsx`** | Same structure; adds a retry control and a real contact path. No stack trace, no error code shown to visitors |
| **Field error** | §5.6 |
| **Submission failure** | Human cause + retry + real alternative (*Book a demo* / email). `role="alert"`. Never a raw code |
| **Media failure** | The fallback still replaces the video in the same frame, with a `caption` line. Never an empty black box, never a broken-image icon |
| **Empty state** | One `heading-m` line + one action. Never an illustration, never an emoji |

Every error state is reachable and testable in development via a documented flag.

### 5.16 File input and upload law (BINDING)

Added by Wave A3. §5.6 covers text inputs; this covers file inputs. It is component law and
applies wherever an upload exists, authenticated or not.

**The precondition.** An upload surface is **never built ahead of its contract**. A drop zone
that cannot commit is a dead control and a P0 finding under `MASTER_GOVERNANCE.md` §6. Where
a contract is absent, the slot renders the §5.9 honest state.

| Aspect | Rule |
|---|---|
| **Control** | A real `<input type="file">`, visually replaced but focusable, with a `<label>`. A visible, keyboard-reachable **Choose file** Secondary button always exists |
| **Drag and drop** | An enhancement only, never the sole path (WCAG 2.2 Dragging Movements). Drag-over state: the dashed border becomes solid and the surface steps up. No scaling, no colour wash, no animation |
| **Zone** | One rectangle, `radius-sm`, 1 px **dashed** `ink-400` on dark (4.12:1) or `ink-350` on ivory. **The only dashed border in the system.** Height fixed at the rendered aspect ratio of the eventual asset, so zone and preview occupy the same box |
| **Constraints** | Stated **before** selection, as a `caption` line inside the zone. Where the accepted types and size ceiling are not specified by the contract, they are a single named constant and **the client performs no rejection of its own** — inventing a limit produces a client rejection the server would have accepted, which is a fabricated rule |
| **Progress** | A 1 px hairline rule along the zone's bottom edge, `champagne-400` on `ink-700` (6.39:1). `role="progressbar"`, with a polite live region updating at most every 10 %. **No percentage text on the zone, no circular meter, no per-file card** |
| **Cancel** | A Tertiary control for the whole upload. Cancelling returns the zone to empty and states that nothing was stored |
| **Preview** | Replaces the zone **in the same box**: the asset at its true aspect ratio inside a 1 px `border-strong` frame, `radius-0`, no shadow, plus one `caption` line with the file's own name |
| **Dual-canvas preview** | An asset that will appear on both canvases (a logo, a mark) is previewed on `ink-950` **and** on `ivory`, side by side ≥ 640 px, stacked below. An asset invisible on one canvas is a real failure the owner must see before it ships |
| **Replace** | A Secondary control beneath the preview. The existing asset stays visible until the new one commits. **There is no intermediate empty state** |
| **Remove** | A Tertiary control opening one confirmation dialog stating what will stop appearing where. On failure, the asset is still shown — never an optimistic removal |
| **Multi-phase honesty** | Where a contract separates upload from commit, a completed transfer renders as **in progress**, never as stored, until commit returns. The same principle as `externally_pending` |
| **Errors** | Field-level on the zone, with the zone still mounted and usable. Every rejected file produces a visible, attributable message. **No file is ever silently dropped** |
| **Identifiers** | A storage object path, key or identifier is **never displayed** |
| **Announcements** | Selection, progress milestones, success and failure via one `aria-live="polite"` region per zone. Never `assertive` |
| **Focus** | After commit, focus moves to the preview's replace control. After removal, back to the zone's button |
| **Reduced motion** | Progress updates without transition. No drag-over animation |
| **Performance** | The file uploads directly to its signed destination, never proxied through the page. **No client-side image processing, no canvas resize, no cropping tool** — cropping alters an asset the owner supplied |
| **Privacy** | The file name is user content: rendered as given, escaped, and never used to construct a displayed path |

### 5.17 Status expression law (BINDING)

Added by Wave A3. *How* a status looks is defined here. *Which* statuses exist and what they
mean is defined by `AUTHENTICATED_SURFACE_SYSTEM.md` §3, which maps its eight backend values
onto these primitives.

**The law: every status renders as glyph + text + colour. Colour is never the
differentiator.** Values may share a colour; they may never share a glyph or a label.

**Glyph set** — inline SVG, 16 px, 1.5 px stroke, `currentColor`, `stroke-linecap: round`,
no fill except `diamond`, **no circular background, no badge, no shadow**, `aria-hidden="true"`.
Eight shapes, distinct in silhouette so the set survives greyscale and low vision:

`check` · `arrow-right` · `clock` · `lock` · `rule` · `link` · `triangle` · `diamond`

No glyph in this set is reused for any non-status purpose anywhere on the site.

**Three primitives**

| Primitive | Construction |
|---|---|
| **`StatusRow`** | Full container width. Numeral (`caption`, tabular) · title (`heading-s`) · one detail line (`body-s`, `text-muted`) · status cluster (glyph + `caption`) · trailing affordance. 1 px `border-hairline` between rows. Height **72 px** ≥ 1024; below, auto with a **72 px minimum** and `space-4` vertical padding. Where a route exists, **the whole row is the control** — never a separate button inside a row, which would create two tab stops for one destination |
| **`StatusChip`** | `radius-pill`, 1 px `border-hairline`, 24 px, glyph 12 px + `caption`. **The only pill-shaped element permitted outside §3.9's three exceptions** |
| **`StatusNote`** | Glyph + `body-s`, `space-2` gap, indented to the title's left edge, beneath the row or field it explains |

**Behaviour**

- Row hover and focus raise the surface **and** add a 1 px `border-interactive` left edge —
  a surface step alone is 1.04:1 and is not a boundary (§2.3.1 rule 6).
- A status label never truncates. A detail line clamps at two lines. A title wraps, never
  truncates.
- A status change cross-fades glyph and label over `motion-micro` (120 ms), **opacity only**.
  The row does not move, resize, flash, pulse or highlight. Instantaneous under reduced motion.
- The change is announced `aria-live="polite"`, never assertive. No sound, no haptics.

---

## 6. Responsive breakpoints (BINDING)

| Name | Range | Notes |
|---|---|---|
| `xs` | 320–374 | **Must work.** No horizontal scroll, no `!important`, no font override |
| `sm` | 375–639 | Design floor for composition |
| `md` | 640–767 | 8-column grid begins |
| `lg` | 768–1023 | Tablet portrait — split layouts still stacked |
| `xl` | 1024–1279 | 12-column grid; split layouts activate; mega menu activates |
| `2xl` | 1280–1439 | Full gutters and column gaps |
| `max` | ≥ 1440 | **Design ceiling.** Container centres; type stops growing; layout does not change |

**Rules**

1. Mobile is designed as its own composition, not as a compressed desktop.
2. Split sections stack below 1024 px, with a **declared** stack order per section
   (text-first or media-first) — never left to source order by accident.
3. `overflow-x: hidden` on `html`/`body` is **forbidden as an overflow strategy**. Overflow
   is fixed at its source. Only an explicitly scrollable region may scroll horizontally,
   and it must be a declared `role="region"`.
4. Viewport units: `dvh` / `svh` only. `100vh` is forbidden (mobile browser chrome).
5. `100dvh` is used **only** for the mobile navigation sheet.
6. Every phase-close verifies 320, 375, 768, 1024, 1440 and 1920 px separately.

---

## 7. Accessibility standard (BINDING)

Target: **WCAG 2.2 Level AA**, verified — not assumed.

| Area | Requirement |
|---|---|
| Contrast | Per the verified table in §2.3. Text 4.5:1 (3:1 for ≥ 24 px or ≥ 19 px bold). UI boundaries and meaningful graphics 3:1 |
| Colour independence | Every status conveys meaning via icon + text as well as colour |
| Target size | WCAG 2.2 floor is 24 × 24 px; **our floor is 44 × 44 px** for every interactive element |
| Focus visible | §5.13. Focus never obscured by the fixed header |
| Keyboard | Every interaction is keyboard-operable. No keyboard trap except the mobile sheet, which `Escape` releases |
| Landmarks | One `<header>`, one `<nav>` (labelled), one `<main id="main">`, one `<footer>`. Section landmarks labelled by their heading |
| Headings | One `h1` per page. No skipped levels. Visual size never contradicts semantic level |
| Language | `<html lang>` correct per locale; `lang` on any inline foreign-language phrase (e.g. a Spanish place name in English copy) |
| Media | No autoplay with sound, ever. Captions on every video with speech. A transcript link beside every video. Controls are keyboard-operable and labelled |
| Motion | §4.7. Nothing flashes more than 3 times per second |
| Forms | §5.6. Programmatic label association, error identification, error suggestion, consistent help |
| Images | §5.10 alt policy |
| Reflow | 320 px at 400 % zoom with no horizontal scroll and no content loss |
| Text spacing | Layout survives the WCAG 1.4.12 overrides (line-height 1.5, paragraph 2em, letter 0.12em, word 0.16em) with no clipping |
| Screen reader | Verified on at least one of NVDA/VoiceOver per phase, on the header, mega menu, mobile sheet, forms and media player |

---

## 8. Performance rules (BINDING)

Budget from `MASTER_GOVERNANCE.md` §8: **LCP ≤ 2.5 s · INP ≤ 200 ms · CLS ≤ 0.1**, desktop
and mobile measured separately.

### 8.1 LCP

**The LCP element on every page is text — the `display-xl` headline. Never a video, never a
large image.** This is a design decision, not only a technical one: the opening section
leads with typography, so the largest paint is a font-rendered heading.

- The display font file is preloaded; `adjustFontFallback` gives a metric-matched fallback
  so the headline paints immediately and does not shift on swap.
- At most one image per route carries `priority`, and only when above the fold.
- The opening section renders as a server component. No above-the-fold content waits on
  hydration.
- No render-blocking third-party CSS. The Google Fonts `@import` is deleted.

### 8.2 CLS

1. Every image and video sits in an `aspect-ratio` box.
2. Every `ProductSurface` in `pending` state occupies the final capture's exact dimensions.
3. The header has a fixed `--header-h`, reserved by the first section's padding.
4. Fonts are metric-matched; no FOIT, no re-layout on swap.
5. Buttons have locked widths across label states; forms have reserved minimum heights
   across idle / error / success.
6. `content-visibility: auto` is always paired with a correct `contain-intrinsic-size`.
7. No injected banner, no late cookie bar that pushes content. If a consent layer becomes
   necessary (it will, the moment any non-cookieless analytics is added), it is an overlay
   that reserves no layout space.

### 8.3 INP

- Client components are the exception. Server components by default.
- The mega menu and accordions are ARIA + CSS driven with minimal JS; no layout-thrashing
  measurement on hover.
- Scroll listeners are passive, `IntersectionObserver`-based, and never read layout in a
  scroll handler. The current `nav.tsx` `window.scrollY` listener is replaced by a sentinel
  observer.
- Framer Motion is scoped to the mega menu, mobile sheet and media player. It is not used
  for scroll reveals (§4.5) and never for lists.
- No animation is running while the user is interacting with a control.

### 8.4 Budgets per route

| Resource | Budget |
|---|---|
| First-load JS (gzip) | **≤ 130 KB** |
| Fonts, total | **≤ 90 KB** |
| LCP-relevant image | ≤ 180 KB |
| All images, desktop page total | ≤ 1.2 MB |
| Long-form video (60 s) | ≤ 8 MB H.264 · ≤ 5 MB AV1/WebM |
| Short clip (≤ 12 s) | ≤ 1.5 MB |
| Poster frame | ≤ 120 KB (AVIF/WebP) |
| Videos per page | **Exactly 1** |

A route that exceeds a budget does not close its phase.

### 8.5 Video performance (BINDING)

1. **No video autoplays above the fold. Ever.**
2. `preload="none"` by default. The poster image is what loads.
3. Playback is user-initiated via a visible, labelled play control. The `<video>` element's
   sources are attached only on that interaction (poster-first pattern), so a page with a
   video costs one image until the visitor asks for more.
4. Ambient looping video is permitted **only** if: below the fold, ≤ 6 s, ≤ 600 KB, muted,
   `playsinline`, and disabled under `prefers-reduced-motion`, `navigator.connection.saveData`,
   or `effectiveType` of `2g`/`slow-2g`.
5. Two encodings always: AV1 or VP9 in WebM first, H.264 in MP4 as fallback.
6. `playsinline`, `muted` where applicable, `controls` once playing, `crossorigin` unset
   (all media is same-origin under `/public/media/`).
7. Every video declares `width`/`height` or sits in an `aspect-ratio` box.
8. Captions: `<track kind="captions" srclang="en">` and `srclang="es"`, both required
   before a video with speech ships.
9. Media files are served from `/public/media/` with immutable cache headers via
   `vercel.json`, and are **versioned by filename** (§10.3) so a replacement never needs a
   cache purge.

---

## 9. Page architecture

### 9.1 Route map

| Route | Page | Canvas | Status |
|---|---|---|---|
| `/[locale]` | Homepage | ink | Specified §9.2 |
| `/[locale]/platform` | Platform Overview | ink | §9.3 |
| `/[locale]/platform/[product]` | Product Detail × N | ink | §9.4 |
| `/[locale]/solutions` | Solutions index | ink | §9.5 |
| `/[locale]/solutions/[segment]` | Solution Detail | ink | §9.5 |
| `/[locale]/pricing` | Pricing / Access | ivory | §9.6 |
| `/[locale]/experience` | Experience Nuova | ink | §9.7 |
| `/[locale]/onboarding` | Trial / Onboarding | ivory | §9.8 |
| `/[locale]/security` | Security & Governance | ink | §9.9 |
| `/[locale]/legal-notice`, `/privacy-policy` | Legal EN | ivory | §9.10 |
| `/[locale]/aviso-legal`, `/politica-privacidad` | Legal ES | ivory | §9.10 |

The exact product and solution slugs are **not decided here** — they depend on
`PRODUCT_TRUTH.md`. §9.4 specifies the reusable template that every product page uses.

`/v2` and `/live-demo` are retired; `/live-demo` redirects permanently to `/experience`
once that page ships.

**Authenticated routes** (added by Wave A3). All **PROPOSED**; none exists. Specified in
`AUTHENTICATED_SURFACE_SYSTEM.md`.

| Route | Surface | Canvas | Spec |
|---|---|---|---|
| `/[locale]/signup` | Signup | ivory | companion §5.1 |
| `/[locale]/login` | Login | ivory | companion §5.2 |
| `/[locale]/onboarding` | Wizard index — ten steps | ink | companion §7 |
| `/[locale]/onboarding/[step]` | Step page | ink | companion §8 |
| `/[locale]/account/plan` | Plan, subscription, upgrade, checkout handoff | ivory | companion §10 |
| `/[locale]/account/testimonial` | Testimonial — legally held, not publicly linked | ivory | companion §11 |
| Dashboard destination | **BLOCKED on MF-03** | — | companion §8.10 |

**Route collision note.** §9.8's public `/[locale]/onboarding` marketing page and the
authenticated wizard at the same path cannot both exist. The wizard is the confirmed
product journey and takes the path; §9.8's public content, if it survives owner decision 2,
moves under a marketing slug to be confirmed with the route naming decision (D-11). Logged
so implementation does not discover it at build time.

`Log in` is **not rendered** in the public navigation until MF-03 supplies a destination
(§5.2, `INTEGRATION_CONTRACT.md` §4, conflict C-03).

### 9.2 Homepage

Thirteen surfaces, `H-00` … `H-12`. Every section below carries the full required spec.

Seam plan (no type repeats more than twice consecutively):
`H-01→H-02` S2 · `H-02→H-03` S1 · `H-03→H-04` S3 · `H-04→H-05` S1 · `H-05→H-06` S2 ·
`H-06→H-07` S1 · `H-07→H-08` S2 · `H-08→H-09` S3 · `H-09→H-10` S1 · `H-10→H-11` S2 ·
`H-11→H-12` S1.

---

#### H-00 — Header

Global component, §5.2. On the homepage the header uses **State A (over-opening)** until
8 px of scroll, then State B. Reserved height `--header-h`. No homepage-specific variant.

---

#### H-01 — Opening

| Field | Specification |
|---|---|
| **Purpose** | State what NuovaSolution is to an agency owner in one screen, and offer the CTA ladder. It is a statement, not a demonstration. |
| **Layout** | `container-default`. Asymmetric **7 / 5**: text columns 1–7, product surface columns 8–12 bleeding to the right container edge and cropped. Top padding `--header-h` + `section-y-feature`; bottom `section-y-feature`. |
| **Visual hierarchy** | eyebrow `[COPY: home.hero.eyebrow]` → `display-xl` h1 `[COPY: home.hero.h1]` (max 24 ch/line, one optional `<br>`, suppressed < 640) → `body-l` lead, max 56 ch `[COPY: home.hero.lead]` → CTA row (Primary + Secondary) → one `caption` reassurance line `[COPY: home.hero.note]`. |
| **Product surface** | One `ProductSurface`, state `pending` at launch, ratio 16:10, anchored right, cropped by the container so ~15 % runs off-frame. Target capture: **PS-01** (§11). |
| **Image requirement** | None. The opening carries **no photograph**. Backdrop is flat `ink-950` with a single 1 px `border-hairline` vertical rule at the column-8 gridline, running from the header to the section base. That rule is the entire decoration. |
| **Video placeholder** | None. Video above the fold is forbidden (§8.5). |
| **Animation** | Purpose: establish reading order. Headline, lead and CTA row reveal as one block (opacity + 16 px), `motion-element`. The product surface reveals 120 ms later, opacity only. Total ≤ 440 ms. The vertical rule draws from top to bottom via `transform: scaleY()` over `motion-scene`, once, purpose: anchor the composition. Nothing else moves. |
| **Desktop ≥ 1024** | As above. Section height is content-driven; a `min-height: 78svh` cap applies **only** to guarantee the product surface is partially visible above the fold, and it is never allowed to create more than `section-y-feature` of empty space — if content exceeds it, content wins. |
| **Tablet 768–1023** | Stack, **text first**. Product surface becomes full container width, ratio 16:10, still cropped at the right edge. `section-y-feature` retained. |
| **Mobile < 768** | Stack, text first. `display-xl` at 40 px. CTA buttons full-width, stacked, `space-3` apart, Primary first. Product surface switches to the **mobile crop asset** at 4:5 (§5.11), full container width, `radius-0`. The vertical rule is removed (it has no compositional job in a single column). Top padding `--header-h` + `section-y-default`. |
| **Spacing** | eyebrow→h1 `space-4`; h1→lead `space-6`; lead→CTA `space-12`; CTA→note `space-4`; column gap `space-16`. |
| **Accessibility** | The only `h1` on the page. Skip link precedes it. Vertical rule `aria-hidden`. Product surface `pending` frame has `role="img"` and an `aria-label` stating it is a pending product view. CTA order in the DOM matches visual order. |
| **Performance** | LCP = the `h1` text. No image, no video, no client JS above the fold except the header. The product surface `pending` frame is pure CSS — zero bytes. When PS-01 lands, it becomes the single `priority` image on the route, ≤ 180 KB, with `sizes="(max-width:767px) 100vw, 42vw"`. |

---

#### H-02 — Orientation rail

| Field | Specification |
|---|---|
| **Purpose** | Immediately after the statement, tell the visitor what the system covers, so the rest of the page has a map. Replaces the conventional "logo wall", which we cannot honestly show. |
| **Layout** | `container-default`, `section-y-compact`. A single horizontal rail of 4–5 items, hairline-separated by **vertical** rules, each item = `eyebrow` + one `body-s` line. Left-aligned. |
| **Visual hierarchy** | Flat by design — no item is emphasised. This section is deliberately quiet; it exists to orient, not to persuade. |
| **Product surface** | None. |
| **Image requirement** | None. |
| **Video placeholder** | None. |
| **Animation** | One block reveal, opacity only, `motion-element`. Purpose: signal a new section. No stagger. |
| **Desktop** | 4–5 columns in one row. |
| **Tablet** | 2 × 2 (or 2 × 3) grid, horizontal hairlines between rows, vertical hairline between columns. |
| **Mobile** | Vertical list, one item per row, 1 px hairline between rows, row padding `space-4` vertical. No horizontal scroll. |
| **Spacing** | `section-y-compact`; item gap `space-8`. |
| **Accessibility** | `<ul>` / `<li>`. Rules are CSS borders, not elements. Section labelled by a visually hidden heading. |
| **Performance** | Text only. Zero media. |

---

#### H-03 — The cost of the gap

| Field | Specification |
|---|---|
| **Purpose** | The commercial realisation: what an agency loses in the space between an enquiry arriving and someone acting on it. This is where `CLAUDE.md`'s pain-first requirement is honoured — as an editorial argument, not as an animated gimmick. |
| **Layout** | `container-default`, `section-y-feature`, **S1 surface step** to `ink-900`. Asymmetric **8 / 4**: a left editorial column carrying the argument; a right air column (declared intentional — it gives the argument room and is the one place on the page where emptiness is the point). |
| **Visual hierarchy** | eyebrow → `display-m` h2 (left) → `body-l` lead (max 56 ch) → a **ledger**: 4–5 rows, each `heading-m` + `body-s`, separated by 1 px hairlines, with a `caption` right-aligned marker per row. The ledger reads like a statement of account, not like feature cards. |
| **Product surface** | None. This section must not be softened by a UI picture. |
| **Image requirement** | None. |
| **Video placeholder** | None. |
| **Animation** | Purpose: sequence the argument. The ledger rows reveal in a 60 ms stagger, maximum 5, opacity + 12 px, `motion-element`. Nothing disappears, fades out, falls, or is crossed out — the "vanishing lead card" idea from `CLAUDE.md` is explicitly rejected as a gimmick (§1.3 #14). |
| **Desktop** | 8/4 split with the air column. Ledger rules run the full 8 columns. |
| **Tablet** | Single column, `container-text` width for the argument; ledger runs full container width. |
| **Mobile** | Single column. Ledger row becomes a two-line stack (`heading-m` then `body-s`), marker moves below as a `caption`. Row padding `space-5` vertical. |
| **Spacing** | `section-y-feature`; lead→ledger `space-12`; ledger row padding `space-5`. |
| **Accessibility** | Ledger is a `<dl>` (term + description) or `<ul>`, never a table. No colour-only emphasis. Any figure requires an evidence basis (§5.8) or it is not shown. |
| **Performance** | Text only. `content-visibility: auto` with `contain-intrinsic-size` set from the measured height. |

> **Claims gate:** every line in this ledger asserts a market condition. No number,
> percentage, timing or loss figure appears without a cleared entry in `CLAIMS_MATRIX.md`
> and a visible basis line. Until cleared, the ledger is qualitative only.

---

#### H-04 — Sixty seconds

| Field | Specification |
|---|---|
| **Purpose** | The single moment where the visitor sees the whole system work. The page's centre of gravity. |
| **Layout** | **S3 full-bleed band.** `container-bleed`, `section-y-flush` at the top seam, `section-y-default` below the media. The media frame is `container-wide` (1440) centred, 16:9. A left-aligned eyebrow + `display-m` h2 sits **above** the frame within `container-default`. |
| **Visual hierarchy** | eyebrow → h2 → `body-m` (max 60 ch) → media frame → one `caption` line beneath the frame stating the duration and that captions are available. |
| **Product surface** | The video itself is the product surface. `ProductSurface` state `pending` until the recording exists; the poster frame is the asset that arrives first. |
| **Image requirement** | Poster frame **V-01-poster** (§10.4). No decorative photography in this section. |
| **Video placeholder** | **V-01 — "See Nuova run an agency in 60 seconds."** Full spec §10.4. |
| **Animation** | Purpose: none decorative. The frame does not animate in beyond opacity (`motion-element`). The play control has a `motion-micro` hover. Playback itself is the only motion. |
| **Desktop** | 16:9, max 1440 wide, centred, `radius-0`, 1 px `border-strong`. Play control centred, 64 px, `radius-pill`, `champagne-400` fill, `ink-950` glyph. |
| **Tablet** | 16:9, container width. Play control 56 px. |
| **Mobile** | The frame switches to the **4:5 mobile master** (§10.4), full container width. Play control 56 px, minimum 44 px touch box. The caption line moves below. Under `saveData` or `2g`, only the still is offered, with a `caption` explaining that playback is available on a faster connection. |
| **Spacing** | h2→body `space-6`; body→frame `space-12`; frame→caption `space-4`; band bottom `section-y-default`. |
| **Accessibility** | `<video>` with `controls` once playing; `<track kind="captions">` EN + ES both required; transcript link beside the caption line; play control is a real `<button>` with an accessible name that includes the video title and duration; focus ring visible on the frame; **no autoplay**. |
| **Performance** | `preload="none"`; poster only until interaction; sources attached on play. Below the fold, so it never touches LCP. Poster ≤ 120 KB AVIF. This is the only video on the homepage. |

---

#### H-05 — The operating picture

| Field | Specification |
|---|---|
| **Purpose** | Show that the parts form one system — the "why am I using five tools?" realisation (`MASTER_GOVERNANCE.md` §10) — without a workflow diagram and without exposing any internal architecture. |
| **Layout** | `container-default`, `section-y-feature`. Asymmetric **5 / 7**: a left text column stating the idea, a right **architectural map** occupying columns 6–12. |
| **Visual hierarchy** | eyebrow → `display-m` h2 → `body-l` lead → the map. |
| **Product surface** | The map is a **designed diagram**, not a product screenshot, and is therefore state `illustrative` with a persistent label. It shows named capability areas connected by 1 px hairlines on a single plane — no boxes with shadows, no rounded cards, no icons in circles, no arrows with gradients. Type does the work: capability names in `heading-s`, relationships as hairlines, one champagne hairline marking the path a single enquiry takes. |
| **Image requirement** | None. The map is inline SVG, authored to the token palette, `currentColor`-driven so it inherits text colour. |
| **Video placeholder** | None. |
| **Animation** | Purpose: trace one path through the system, once. The champagne hairline draws along the enquiry path via `stroke-dashoffset` over `motion-scene`, triggered on entry, **once**, then rests in its final state. Under reduced motion it renders drawn. Nodes do not pulse, blink or glow. |
| **Desktop** | 5/7 split, map ~640 × 480 in a `container-wide`-aligned frame. |
| **Tablet** | Stack, text first. Map full container width, height auto by `aspect-ratio: 4/3`. |
| **Mobile** | The map **does not shrink**. It is replaced by a **vertical sequence**: the same capability names as a hairline-separated list, in the same order as the enquiry path, with the champagne hairline running down the left edge as a spine. Same information, different composition. This is the mobile-first rule applied literally. |
| **Spacing** | `section-y-feature`; lead→map `space-12`; map node vertical rhythm `space-8`. |
| **Accessibility** | The SVG has `role="img"` and a full `aria-label`; the same content is also present as a visually hidden ordered list, so the relationship is available to a screen reader without relying on the graphic. Diagram strokes meet 3:1 against their background. |
| **Performance** | Inline SVG, ≤ 8 KB. No image request. Animation is one `stroke-dashoffset` transition — GPU-cheap and non-layout-affecting. |

> **Architecture rule:** this map shows capability areas and one enquiry path. It never
> shows automation tooling, node names, internal services, queues or infrastructure
> (`CLAUDE.md` architecture rule, retained — see §12).

---

#### H-06 — Chapter I

| Field | Specification |
|---|---|
| **Purpose** | First of three chapters. Each chapter presents one capability area at full scale, with one product surface, and links to its product page. Chapters replace the "icon + heading + two sentences × 6" pattern entirely. |
| **Layout** | `container-default`, `section-y-feature`. Split **7 / 5**, **media right**. |
| **Visual hierarchy** | chapter marker (`eyebrow`, e.g. `I` + area name) → `display-m` h2 → `body-l` lead (max 56 ch) → 3 hairline-separated `body-m` points, each ≤ 2 lines → Tertiary CTA to the product page. |
| **Product surface** | One `ProductSurface`, ratio 4:3, cropped by the right container edge. State `pending` at launch. Target capture: **PS-02**. Optionally one supporting detail crop at ≤ 40 % width, aligned to the same baseline grid — only if it shows something the primary does not. |
| **Image requirement** | None. |
| **Video placeholder** | None on the homepage. The chapter's video (`V-02`) lives on its product page; here the poster still may be used as the `ProductSurface` content once it exists, with the Tertiary CTA leading to the full film. |
| **Animation** | Purpose: sequence text before media. Text block reveals, then the surface 120 ms later, opacity + 12 px, `motion-element`. One reveal pair per chapter. |
| **Desktop** | 7/5, media right. |
| **Tablet** | Stack, **text first**, surface full width at 16:10. |
| **Mobile** | Stack, text first. Surface uses the **mobile crop asset** at 4:5. Points become a hairline-separated vertical list with `space-4` row padding. Tertiary CTA becomes a full-width Secondary button (a text link is too small a target as the only exit). |
| **Spacing** | `section-y-feature`; column gap `space-16`; lead→points `space-10`; points→CTA `space-10`. |
| **Accessibility** | `h2` per chapter; points as `<ul>`; the chapter marker is decorative and `aria-hidden` (the name is in the `h2`); CTA link text is self-describing, never "Learn more" alone. |
| **Performance** | One image. `loading="lazy"`, `sizes="(max-width:767px) 100vw, 38vw"`. No client JS. |

---

#### H-07 — Chapter II

Identical specification to H-06, with two mandated differences:

- **Media side alternates to the left** (`5 / 7`, media left) — enforcing §3.7.
- Mobile stack order remains **text first** (alignment and reading order do not alternate on
  mobile; only the desktop composition does).
- Product surface target: **PS-03**. Video on its product page: `V-04`.
- Seam to H-08 is **S2**.

---

#### H-08 — Chapter III

Identical to H-06 (media right, `7 / 5`), with:

- Product surface target: **PS-04**. Videos on its product pages: `V-05`, `V-08`.
- This chapter's supporting detail crop is **required**, not optional, because it is the
  chapter where two capabilities meet.
- Seam to H-09 is **S3** (H-09 is a full-bleed ivory band).

---

#### H-09 — Where the work happens

| Field | Specification |
|---|---|
| **Purpose** | The channel and market reality — the environment an agency actually operates in. This is the page's single **ivory** band, and its only photography. |
| **Layout** | **S3 full-bleed ivory band.** `container-bleed` background `ivory`, inner `container-default`, `section-y-feature`. Split **6 / 6** is forbidden here; use **8 / 4** with the photograph as a full-height block bleeding to the **left** viewport edge and the text in columns 6–12. |
| **Visual hierarchy** | eyebrow (`champagne-700` on ivory) → `display-m` h2 (`ink-950`) → `body-l` lead → a hairline-separated list of channels/markets, `heading-s` + `body-s` each. |
| **Product surface** | None. This section is about context, not UI. |
| **Image requirement** | **IMG-01** — one photograph, Andalusian/Costa del Sol architecture in late light, no people, no camera-facing subject. Portrait-biased crop so it can run full-height. Desktop 3:4 at ~38 % viewport width, bleeding to the left edge; mobile 4:5. Licensed, recorded in `ASSET_LICENSES.md`. Graded per §5.10. |
| **Video placeholder** | None. |
| **Animation** | Purpose: none. Opacity-only reveal of the text block, `motion-element`. The photograph does not animate, scale, parallax or Ken-Burns. |
| **Desktop** | Photograph full-height of the section, bleeding left; text right, vertically centred against the image block. |
| **Tablet** | Photograph becomes a full-width 16:9 band above the text. |
| **Mobile** | Photograph 4:5, full container width, above the text. List rows hairline-separated, `space-4` padding. Text `ink-950` on `ivory` (17.91:1). |
| **Spacing** | `section-y-feature`; image-to-text gap `space-16` desktop, `space-10` mobile. |
| **Accessibility** | Photograph is decorative in the strict sense (it carries mood, not information) → `alt=""`, `aria-hidden`. All contrast recomputed on the ivory canvas: eyebrow uses `champagne-700` (5.45:1), never `champagne-400` (2.04:1 — forbidden). |
| **Performance** | Single image, `loading="lazy"`, AVIF/WebP, `sizes="(max-width:767px) 100vw, 38vw"`, ≤ 220 KB. Fixed `aspect-ratio` box. The canvas change is a background-colour change only — no extra request. |

---

#### H-10 — Experience Nuova

| Field | Specification |
|---|---|
| **Purpose** | Offer the interactive route for visitors who want to try rather than read, and route them to `/experience`. |
| **Layout** | `container-default`, back on `ink`, `section-y-default`. Asymmetric **8 / 4**: statement left, one Primary-styled entry control right, vertically centred. |
| **Visual hierarchy** | eyebrow → `heading-l` (not `display-m` — this is a route, not a chapter) → `body-m` (max 60 ch) → CTA. |
| **Product surface** | None on the homepage. |
| **Image requirement** | None. |
| **Video placeholder** | None. |
| **Animation** | Purpose: none. Opacity-only reveal. |
| **Desktop** | 8/4, CTA right-aligned within its columns. |
| **Tablet** | Stack, CTA below, left-aligned. |
| **Mobile** | Stack, CTA full-width. |
| **Spacing** | `section-y-default`; heading→body `space-6`; body→CTA `space-10`. |
| **Accessibility** | The CTA is a link to `/experience`, not a modal launcher. Self-describing label. |
| **Performance** | Text only. |

> **Honesty gate (C-02):** if `/experience` runs on client-side simulation, this section's
> copy must say so, in wording cleared by `CLAIMS_MATRIX.md`. The disclosure lives with the
> entry point, not only on the destination page. Visual treatment: `caption`,
> `text-muted`, directly beneath the CTA — visible, not hidden behind a tooltip.

---

#### H-11 — Access

| Field | Specification |
|---|---|
| **Purpose** | Set expectations about how an agency starts, and route to `/pricing` and `/onboarding`. Not a pricing table. |
| **Layout** | `container-default`, `section-y-default`. Single column at `container-text` width, **left-aligned**, with a 3-step hairline-separated sequence. |
| **Visual hierarchy** | eyebrow → `display-m` h2 → 3 numbered steps (`caption` numeral + `heading-m` + `body-s`), hairline-separated → CTA row (Primary + Secondary). |
| **Product surface** | None. |
| **Image requirement** | None. |
| **Video placeholder** | None on the homepage; `V-07` lives on `/onboarding`. |
| **Animation** | Purpose: sequence the three steps. 60 ms stagger, 3 items, opacity + 12 px. |
| **Desktop / Tablet** | Same composition; `container-text` keeps the measure correct. |
| **Mobile** | Same; step numeral moves above its heading. |
| **Spacing** | `section-y-default`; step row padding `space-6`. |
| **Accessibility** | `<ol>` — the order is meaningful. |
| **Performance** | Text only. |

> **Blocked content:** no price, no tier, no trial duration and no billing term appears here
> until `PRODUCT_TRUTH.md` confirms them (C-01, C-06).

---

#### H-12 — Closing

| Field | Specification |
|---|---|
| **Purpose** | The final conversion moment. |
| **Layout** | `container-default`, `section-y-feature`, `ink-1000` surface (S1 step down into the footer). **6 / 6 centred composition — one of the three permitted centred cases** (§3.8). |
| **Visual hierarchy** | `display-l` (centred, max 24 ch/line) → `body-l` (centred, **maximum 3 lines**) → CTA row (Primary + Secondary, centred) → one `caption` line. |
| **Product surface** | None. |
| **Image requirement** | None. |
| **Video placeholder** | None. |
| **Animation** | Purpose: none. Opacity-only reveal, `motion-element`. |
| **Desktop** | Centred, `container-text` measure for the body. |
| **Tablet** | Same. |
| **Mobile** | Centred. CTAs full-width, stacked, Primary first. Body still capped at 3 lines — if the ES string exceeds 3 lines at 375 px, the copy is shortened, not the type. |
| **Spacing** | `section-y-feature`; heading→body `space-6`; body→CTA `space-12`. |
| **Accessibility** | `h2`. Centred text is capped at 3 lines precisely because centred long text harms readability. |
| **Performance** | Text only. |

---

#### H-13 — Footer

Global component, §5.5. Identical on every page.

---

### 9.3 Platform Overview

| | |
|---|---|
| **Purpose** | The index of the system: what the platform is, and the entry to every product page. |
| **Sections** | `PO-01` Opening (structure as `H-01`; every page's opening `h1` uses `display-xl` exactly once; no product surface here — a single hairline rule instead) · `PO-02` The operating picture (the `H-05` map, reused at full width, state `illustrative`) · `PO-03` Capability index · `PO-04` Access · `PO-05` Closing |
| **PO-03 layout** | A hairline-ruled **index**, not a card grid: one row per capability, full container width, each row = numeral (`caption`) + name (`heading-l`) + one `body-s` line + a right-aligned `arrow-up-right`. Row height 96 px desktop / auto mobile, hover = surface step to `ink-900` and the arrow translates 4 px. The entire row is the link. |
| **Product surface** | None in the index. The poster still of each capability's video may appear on hover in a right rail at ≥ 1280 px only, `loading="lazy"` — optional, and omitted if it costs more than 200 KB total. |
| **Mobile** | Index rows become two-line stacks with the arrow at the right of the first line. Row min-height 72 px. No hover rail. |
| **Video** | None. |
| **Performance** | Text-first page. First-load JS ≤ 100 KB. |

### 9.4 Product Detail template

One template, used by every product page. **The header, footer, section order and spacing
rhythm are identical across all product pages** (prohibition §9.10/§9.11).

| Section | Specification |
|---|---|
| `PD-01` **Opening** | `container-default`, `--header-h` + `section-y-feature`. **7 / 5**, no photograph. eyebrow (`Platform / <name>`) → `display-xl` h1 (once) → `body-l` lead → CTA row. Right columns hold one `ProductSurface` (state `pending`), ratio 16:10, cropped right. LCP = the `h1`. |
| `PD-02` **What it does** | `container-default`, `section-y-default`, S2 seam. A hairline-ruled list of 3–5 capabilities: `heading-m` + `body-s` each. No icons, no cards. Every line requires a `PRODUCT_TRUTH.md` entry. |
| `PD-03` **The film** | S3 band, `container-wide`, 16:9 desktop / 4:5 mobile. **This is the page's one video.** Full spec per §10. Poster-first, `preload="none"`, captions EN + ES, transcript link. |
| `PD-04` **In practice** | `container-default`, `section-y-feature`, split **5 / 7** (media left — alternating against `PD-01`). One `ProductSurface` + a short scenario in `body-m`. Scenario content is illustrative and labelled. |
| `PD-05` **Fits your operation** | `container-default`, `section-y-default`. Hairline list of channels/systems it works with. **No third-party logos** until each integration is verified and each mark is licensed for use (R6 + trademark). Names as text until then. |
| `PD-06` **Related** | `container-default`, `section-y-compact`. Two or three hairline rows linking to sibling product pages. Never a card grid. |
| `PD-07` **Closing** | As H-12, centred, `section-y-feature`. |
| **Mobile** | All splits stack text-first. Product surfaces use their `-mobile` crop. The film uses the 4:5 master. Section rhythm identical to the homepage so the site feels like one document. |
| **Accessibility** | One `h1`; `PD-03` video fully captioned; every `ProductSurface` labelled per §5.11. |
| **Performance** | Exactly one video and at most three images per product page. First-load JS ≤ 130 KB. |

### 9.5 Solutions

Solutions pages are **segment-framed**, not feature-framed: the same system seen from one
kind of agency's problem.

| Section | Specification |
|---|---|
| `SO-01` Opening | As `PD-01`, no product surface; a single hairline rule and a `body-l` lead. |
| `SO-02` The situation | `container-text`, left-aligned editorial argument, `section-y-feature`. Ledger pattern from H-03. |
| `SO-03` What changes | Split **7 / 5**, one `ProductSurface`, `section-y-feature`. |
| `SO-04` Capability links | Hairline index rows to the relevant product pages (pattern from `PO-03`). |
| `SO-05` Closing | Centred CTA. |
| **Video** | None. Solutions pages carry no video; they link to the product page that owns it. This keeps exactly one video per route. |
| **Images** | At most one photograph, in `SO-02`, treated per §5.10. |
| **Index page** | `/solutions` is a hairline index identical in construction to `PO-03`. |

### 9.6 Pricing / Access

Canvas `ivory`. Layout B ships now; Layout A only after prices are confirmed. Full
specification in §5.7.

| Section | Specification |
|---|---|
| `PR-01` Opening | `container-default`, `--header-h` + `section-y-feature`, left-aligned `display-xl` h1 + `body-l` lead. No image, no product surface. |
| `PR-02` Model | The access statement (Layout B) or the pricing plane (Layout A). |
| `PR-03` Fit criteria | 4–6 hairline rows. |
| `PR-04` What is included | Only after `PRODUCT_TRUTH.md` confirms. Until then this section does not render — **the page is shorter, not padded**. |
| `PR-05` FAQ | `container-text`, accordion, `heading-s` triggers, hairline-separated, one open at a time not enforced (multiple may open), `aria-expanded`, full keyboard support. |
| `PR-06` Closing | Centred CTA on an `ink` band (S3 seam into the footer). |
| **Performance** | Ivory canvas, text only, no media. Fastest page on the site. |

### 9.7 Experience Nuova

| Section | Specification |
|---|---|
| `EX-01` Opening | `container-default`, `--header-h` + `section-y-default`. `display-xl` h1, `body-l` lead, and — **immediately, above the fold** — the disclosure line required by C-02, as `body-s` in `text-secondary` (not `caption`, not muted: it must be genuinely readable). |
| `EX-02` The experience | `container-wide`. A single bordered plane, `radius-md`, `bg: ink-900`, split into an input column and an outcome column at ≥ 1024 px; stacked below. **Reserved height for the outcome column across all states** — idle, in-flight, result, error — so no state change shifts the page. |
| `EX-03` What just happened | A hairline-ruled explanation of the outcome, `heading-s` + `body-s` rows. |
| `EX-04` Closing | CTA ladder. |
| **Interaction states** | Idle (a real prompt, no fake ghost text) · in-flight (typing indicator inside the reserved box, `aria-busy`, spinner after 300 ms) · result · error (`role="alert"`, retry, fallback to *Book a demo*). Per `INTEGRATION_CONTRACT.md` §3. |
| **Honesty (BINDING)** | If the experience is simulated, the plane carries a persistent `Illustrative` chip (§5.11) in addition to the `EX-01` disclosure. It is never removed on scroll or on mobile. |
| **Mobile** | Single column. Input pinned above the outcome. The outcome box keeps its reserved height. The keyboard must not obscure the outcome — the page scrolls the outcome into view on submit, using `scroll-margin-top: calc(var(--header-h) + 16px)`. |
| **Animation** | Purpose: show that something is processing. Typing indicator only, 3 dots, opacity animation, disabled under reduced motion (replaced by the text state). No scene animation. |
| **Accessibility** | The outcome region is `aria-live="polite"` `role="status"`. Input has a visible label. Full keyboard operation. No time limits. |
| **Performance** | The only route where a meaningful client bundle is justified. Budget: **≤ 180 KB** first-load JS for this route only, documented as an exception. The 80 KB `live-demo-client.tsx` is not carried over; the presentation is rebuilt and the domain logic in `demo-engine.ts` is refactored into a small, testable module. |

### 9.8 Trial / Onboarding

Canvas `ivory`.

| Section | Specification |
|---|---|
| `ON-01` Opening | `container-narrow`. `display-xl` h1, `body-l` lead. Left-aligned. |
| `ON-02` The film | S3 band, 16:9 / 4:5. **`V-07`** — the onboarding walkthrough. |
| `ON-03` What happens, step by step | `<ol>`, hairline-separated, `heading-m` + `body-s`. |
| `ON-04` The form **or** the honest state | If an endpoint exists (`INTEGRATION_CONTRACT.md` §1/§11): the form per §5.6, `container-narrow`. **If not: the form is not rendered.** The section renders the §5.9 *Pending* treatment with a working *Book a demo* path. |
| `ON-05` What we need from you | A short hairline list of preparation items — only items confirmed in `PRODUCT_TRUTH.md`. |
| `ON-06` Closing | Centred CTA. |
| **Blocked** | Trial duration, what is provisioned, and day-15 behaviour are all C-01. None of it is written until confirmed. |
| **Accessibility** | Form per §5.6, including error summary and focus management. Privacy line at the point of collection. |

### 9.9 Security & Governance

`ink` canvas, `container-text` for prose. Structure: opening → practice sections as
hairline-separated `heading-m` + `body-m` blocks → a contact path for security questions.

**Every line requires a `PRODUCT_TRUTH.md` entry.** No badge, no certification mark, no
compliance logo, no "enterprise-grade" claim, no percentage, unless verified. A short,
truthful page is correct; a long, impressive, unverified one is a P0 finding.

### 9.10 Legal pages

**Content is preserved.** Only presentation changes (audit §17). Any change to what data
the site collects — which the new forms will cause — requires a legal re-review before the
privacy pages are considered accurate. Flagged as an owner action (§15).

| | |
|---|---|
| Canvas | `ivory` |
| Container | `container-text` (720 px) |
| Title | `display-m`, **centred** (permitted case #2), with a `caption` "last updated" line beneath |
| Body | `body-m` at 1.70 line-height, measure ≤ 74 ch |
| Section headings | `heading-m`, `space-16` above, `space-6` below, with a 1 px hairline above each |
| Lists | `<ul>`/`<ol>`, `space-3` between items, hanging indent |
| Contents rail | ≥ 1024 px: a sticky left rail of section links, `caption`, `text-muted`, active item `text-accent`; `position: sticky; top: calc(var(--header-h) + 32px)`. Hidden below 1024 px |
| Locale pairing | EN and ES pages are `alternates.languages` counterparts with correct `hreflang`; the language switcher maps `/legal-notice` ↔ `/aviso-legal` and `/privacy-policy` ↔ `/politica-privacidad` explicitly |
| Accessibility | One `h1`; correct heading order; contact details as real, selectable text and as `mailto:`/`tel:` links; no data in images |
| Performance | Zero media, zero client JS beyond the header |

---

## 10. Video plan

### 10.1 Global video rules

- **Exactly one video per route.** No route carries two.
- Poster-first: the poster image is the only media loaded until the visitor presses play.
- `preload="none"`, no autoplay, no sound without a user gesture.
- Captions EN + ES are **required before a video with speech ships**. A video without
  captions does not ship.
- A transcript link sits beside every video.
- Two encodings: WebM (AV1 or VP9) + MP4 (H.264, yuv420p, Level 4.0 for broad support).
- Every video has a **fallback still** used when playback fails, when `saveData` is on, or
  when the connection is `2g`/`slow-2g`.
- All product footage inside a video must be a **real screen recording** of the real system.
  A designed animation standing in for the product is permitted only as `illustrative`,
  labelled with a persistent on-screen chip in the video itself, and only if cleared in
  `CLAIMS_MATRIX.md`.
- **No real client data.** Recordings use a dedicated demonstration workspace with clearly
  fictional-but-labelled content, or are redacted. No real person's name, photo, phone
  number, address, price or property appears. Redaction policy is an owner decision (§15).

### 10.2 Aspect-ratio policy

| Context | Desktop | Mobile |
|---|---|---|
| Long-form film (V-01, V-07) | **16:9** | **4:5** — a separately framed master, not a crop of the 16:9 |
| Product film (V-02 … V-06, V-08) | **16:9** | **4:5** |
| Ambient clip (if ever used) | 21:9 | not used on mobile |

The mobile master is **re-framed**, not letterboxed and not centre-cropped. Screen
recordings are re-taken at a mobile-appropriate zoom so that the smallest legible text is
≥ 11 px effective at a 375 px viewport (§5.11).

### 10.3 File and replacement convention (BINDING)

```
/public/media/<slug>/
    <slug>-16x9-v<N>.webm
    <slug>-16x9-v<N>.mp4
    <slug>-4x5-v<N>.webm
    <slug>-4x5-v<N>.mp4
    <slug>-16x9-v<N>-poster.avif
    <slug>-16x9-v<N>-poster.jpg
    <slug>-4x5-v<N>-poster.avif
    <slug>-4x5-v<N>-poster.jpg
    <slug>-still-v<N>.avif          ← fallback still
    <slug>-captions-en-v<N>.vtt
    <slug>-captions-es-v<N>.vtt
    <slug>-transcript-en-v<N>.md
    <slug>-transcript-es-v<N>.md
```

Rules: a new cut is a **version bump** (`v1` → `v2`), never an overwrite — media is served
with immutable cache headers. The component reads the slug and version from a single
`media-manifest.ts` entry, so a replacement is a one-line change. Until real files exist,
the manifest entry carries `status: "pending"` and the component renders the
`ProductSurface` `pending` frame at the exact declared aspect ratio, so **the swap causes
zero layout shift**.

### 10.4 The eight video placeholders

Voiceover scripts below are **DRAFT and NOT CLEARED**. They are written to describe only
what is literally visible on screen and assert no capability, price, outcome or metric.
Final wording is owned by `COPY_AND_CONVERSION_MASTER.md` and must be cleared by
`CLAIMS_MATRIX.md` (R3/R4). Any line that would assert a result must be removed or replaced.

---

#### V-01 — "See Nuova run an agency in 60 seconds"

| Field | Value |
|---|---|
| **Slug** | `nuova-run-60s` |
| **Exact page** | `/[locale]` (Homepage) |
| **Exact section** | `H-04 — Sixty seconds` |
| **Duration** | 55–65 s. Hard cap 65 s |
| **Aspect desktop** | 16:9, master 1920 × 1080, delivered at 1600 px wide |
| **Aspect mobile** | 4:5, re-framed master 1080 × 1350 |
| **Poster frame** | A held frame from ~00:03 showing one product view at rest, no cursor, no motion blur, no overlaid play triangle burned in. AVIF ≤ 120 KB |
| **Scenes** | 1. `00:00–00:06` — a single enquiry arriving, one screen, held still. 2. `00:06–00:18` — the reply composed and sent. 3. `00:18–00:30` — the enquiry organised and qualified in the system. 4. `00:30–00:42` — the agent's view: what surfaced and why. 5. `00:42–00:52` — the follow-up continuing on its own. 6. `00:52–01:00` — one closing frame: the wordmark on `ink-950`, held 2 s, no animation |
| **Screen recording requirements** | Real system, 1920 × 1080 at 60 fps, deterministic playback (scripted, not improvised). Browser at 100 % zoom, no bookmarks bar, no extensions, no notifications, no OS chrome, no personal accounts. Cursor visible but not highlighted — no click-ring effects. Cuts on action, never mid-scroll. **No speed ramps that misrepresent real timing** — if footage is sped up, an on-screen `caption` states the speed factor. Recorded in EN; ES version re-recorded with the interface in Spanish (not subtitled English UI) |
| **Draft spoken script (NOT CLEARED)** | *"An enquiry arrives. → It is answered. → It is organised. → The agent sees what matters, and why. → The follow-up continues. → NuovaSolution."* Six lines, one per scene, ~9 s each. Neutral delivery. Alternative: **no voiceover**, on-screen `eyebrow` labels only — this is the recommended default, because it removes the claims risk and halves the localisation cost |
| **Fallback still** | `nuova-run-60s-still-v1.avif` — the Scene 4 frame, the most informative single image |
| **Loading behaviour** | `preload="none"`. Poster only until the play control is pressed; sources attached on that gesture. Below the fold. Skipped entirely under `saveData` or `effectiveType` `2g`/`slow-2g`, where only the still and a `caption` explaining why are shown |
| **Replacement convention** | `/public/media/nuova-run-60s/nuova-run-60s-16x9-v1.{webm,mp4}` etc. per §10.3 |
| **Status** | **NOT RECORDED. Placeholder ships as `ProductSurface` state `pending` at 16:9 / 4:5.** |

---

#### V-02 — Voice AI

| Field | Value |
|---|---|
| **Slug** | `voice-ai` |
| **Exact page** | `/[locale]/platform/<voice-ai-slug>` (slug pending `PRODUCT_TRUTH.md`) |
| **Exact section** | `PD-03 — The film` |
| **Duration** | 30–40 s |
| **Aspect desktop / mobile** | 16:9 / 4:5 |
| **Poster frame** | The call surface at rest, before the call begins |
| **Scenes** | 1. A call arriving. 2. The conversation in progress, shown as the system represents it. 3. What the call produced — the record it left behind. 4. Closing wordmark frame, 2 s |
| **Screen recording requirements** | Real system. **Audio is the subject here, so this video has speech and therefore requires captions in EN and ES before it ships.** If real recorded audio of a real caller is used, explicit written consent is required and must be recorded in `ASSET_LICENSES.md`; otherwise the audio is a scripted demonstration and an on-screen `Illustrative` chip is required for the duration |
| **Draft spoken script (NOT CLEARED)** | None. This video's audio *is* the demonstration; adding a narrator over it would obscure the subject. On-screen `eyebrow` labels only |
| **Fallback still** | Scene 3 frame |
| **Loading behaviour** | Poster-first, `preload="none"`. **This video has meaningful audio: it must never autoplay, and it starts muted with a visible unmute control that is keyboard-operable and labelled** |
| **Replacement convention** | `/public/media/voice-ai/…` |
| **Status** | **NOT RECORDED. Blocked additionally on `INTEGRATION_CONTRACT.md` W-05 — whether voice has a real, referenceable entry point.** |

---

#### V-03 — Social to private conversation

| Field | Value |
|---|---|
| **Slug** | `social-to-private` |
| **Exact page** | `/[locale]/platform/<social-slug>` |
| **Exact section** | `PD-03` |
| **Duration** | 25–35 s |
| **Aspect desktop / mobile** | 16:9 / **4:5 strongly preferred as the primary master** — this journey is natively mobile, so the mobile framing should be recorded first and the desktop cut derived from a wider capture of the same session |
| **Poster frame** | The public surface before the move to a private conversation |
| **Scenes** | 1. A public interaction. 2. The move into a private conversation. 3. The conversation continuing. 4. Where it lands in the system. 5. Closing frame |
| **Screen recording requirements** | Device-frame capture per §5.11 (1 px frame, no bezel art). **All third-party platform UI must be either (a) captured with the platform's brand-usage terms respected, or (b) reduced to a neutral, unbranded surface.** No third-party logo appears without a verified usage right — this is a trademark question, not only an R6 question. Owner decision required (§15) |
| **Draft spoken script (NOT CLEARED)** | None — on-screen labels only |
| **Fallback still** | Scene 3 frame |
| **Loading behaviour** | Poster-first, `preload="none"` |
| **Replacement convention** | `/public/media/social-to-private/…` |
| **Status** | **NOT RECORDED. Blocked on the platform brand-usage decision.** |

---

#### V-04 — Property Experience

| Field | Value |
|---|---|
| **Slug** | `property-experience` |
| **Exact page** | `/[locale]/platform/<property-experience-slug>` |
| **Exact section** | `PD-03` |
| **Duration** | 30–40 s |
| **Aspect desktop / mobile** | 16:9 / 4:5 |
| **Poster frame** | The property surface at rest, one property, full-bleed image visible |
| **Scenes** | 1. An enquiry about a property. 2. What the enquirer is shown. 3. How they move through it. 4. What the agent receives as a result. 5. Closing frame |
| **Screen recording requirements** | **Property imagery inside this recording must be licensed or owned.** Real listings from a real agency require that agency's written permission and must not display a real owner's address or price without it. Use a demonstration property set, recorded in `ASSET_LICENSES.md`. Real system, 60 fps, no speed ramp without an on-screen note |
| **Draft spoken script (NOT CLEARED)** | None — on-screen labels only |
| **Fallback still** | Scene 2 frame — visually the richest |
| **Loading behaviour** | Poster-first, `preload="none"`. This is the most image-heavy video; keep the MP4 ≤ 5 MB at 35 s |
| **Replacement convention** | `/public/media/property-experience/…` |
| **Status** | **NOT RECORDED. Blocked on the demonstration property-set decision.** |

---

#### V-05 — Daily Assistant

| Field | Value |
|---|---|
| **Slug** | `daily-assistant` |
| **Exact page** | `/[locale]/platform/<daily-assistant-slug>` |
| **Exact section** | `PD-03` |
| **Duration** | 25–35 s |
| **Aspect desktop / mobile** | 16:9 / 4:5 |
| **Poster frame** | The start-of-day view at rest |
| **Scenes** | 1. The start of a working day. 2. What is surfaced first, and why. 3. One action taken from it. 4. The state after that action. 5. Closing frame |
| **Screen recording requirements** | Real system. This is the video most likely to contain personal data on screen — **every name, phone number, email address and property address must be demonstration data, not redaction boxes.** Black bars over real data are not acceptable; the recording is re-taken with demonstration data instead |
| **Draft spoken script (NOT CLEARED)** | None — on-screen labels only |
| **Fallback still** | Scene 2 frame |
| **Loading behaviour** | Poster-first, `preload="none"` |
| **Replacement convention** | `/public/media/daily-assistant/…` |
| **Status** | **NOT RECORDED. Blocked on the demonstration-workspace decision.** |

---

#### V-06 — Reporting

| Field | Value |
|---|---|
| **Slug** | `reporting` |
| **Exact page** | `/[locale]/platform/<reporting-slug>` |
| **Exact section** | `PD-03` |
| **Duration** | 20–30 s. Shortest of the set |
| **Aspect desktop / mobile** | 16:9 / **1:1 or 4:5** — reporting views are wide; the mobile master must show **one** figure or chart legibly, not a shrunken dashboard |
| **Poster frame** | One report view at rest |
| **Scenes** | 1. The reporting view opening. 2. One dimension changed. 3. The result of that change. 4. Closing frame |
| **Screen recording requirements** | **Highest R6 risk in the entire media set.** Every number visible in this recording is a claim. Requirements: (a) all figures come from a demonstration dataset, (b) an on-screen `Illustrative — demonstration data` chip is present for the full duration, (c) the chip is burned into the video, not overlaid by CSS, so it survives download and re-embedding. **No exceptions.** A reporting video without the chip is a P0 finding |
| **Draft spoken script (NOT CLEARED)** | None. Narration over numbers converts an illustration into an assertion. On-screen labels only |
| **Fallback still** | Scene 3 frame — **must also carry the burned-in chip** |
| **Loading behaviour** | Poster-first, `preload="none"` |
| **Replacement convention** | `/public/media/reporting/…` |
| **Status** | **NOT RECORDED. Blocked on the demonstration dataset + `CLAIMS_MATRIX.md`.** |

---

#### V-07 — Onboarding

| Field | Value |
|---|---|
| **Slug** | `onboarding-walkthrough` |
| **Exact page** | `/[locale]/onboarding` |
| **Exact section** | `ON-02 — The film` |
| **Duration** | 45–60 s |
| **Aspect desktop / mobile** | 16:9 / 4:5 |
| **Poster frame** | The first step of onboarding, at rest |
| **Scenes** | 1. Step one — what an agency provides. 2. Step two — what is configured. 3. Step three — the first live moment. 4. What the agency sees afterwards. 5. Closing frame |
| **Screen recording requirements** | Real system. **This video makes a promise about a process, so every step shown must match the real onboarding process as confirmed in `PRODUCT_TRUTH.md`.** If the real process differs by agency, the video shows the common path and an on-screen label says so. Timings must not be compressed in a way that implies onboarding is faster than it is; any speed-up is stated on screen |
| **Draft spoken script (NOT CLEARED)** | *"What we need from you. → What we set up. → The first live conversation. → What you see from then on."* Four lines. **Every one of these is a process claim and must be cleared before recording** |
| **Fallback still** | Scene 1 frame |
| **Loading behaviour** | Poster-first, `preload="none"` |
| **Replacement convention** | `/public/media/onboarding-walkthrough/…` |
| **Status** | **NOT RECORDED. Blocked on C-01 and on the real onboarding process being documented.** |

---

#### V-08 — Follow-up journey

| Field | Value |
|---|---|
| **Slug** | `follow-up-journey` |
| **Exact page** | `/[locale]/platform/<follow-up-slug>` |
| **Exact section** | `PD-03` |
| **Duration** | 30–40 s |
| **Aspect desktop / mobile** | 16:9 / 4:5 |
| **Poster frame** | The journey view at rest, before any step has run |
| **Scenes** | 1. A conversation that went quiet. 2. What happens next, and when. 3. The reply coming back. 4. Where it lands, and who is told. 5. Closing frame |
| **Screen recording requirements** | Real system. **Time is the subject, so the passage of time must be shown honestly** — an on-screen `caption` states the real interval at each step, and any compression of real time is labelled. Demonstration data only |
| **Draft spoken script (NOT CLEARED)** | None — on-screen time labels only |
| **Fallback still** | Scene 3 frame |
| **Loading behaviour** | Poster-first, `preload="none"` |
| **Replacement convention** | `/public/media/follow-up-journey/…` |
| **Status** | **NOT RECORDED.** |

---

## 11. Screenshot plan

### 11.1 The rule

**A fabricated dashboard is never the final product proof.** Until a real capture exists,
the surface ships as `ProductSurface` state `pending` — an empty architectural frame at the
exact final dimensions (§5.11). This is honest, it is premium, and it causes zero layout
shift when the real asset lands.

### 11.2 Required real captures

Each entry states what must be recorded from the real system. Slugs marked *pending* depend
on `PRODUCT_TRUTH.md`.

| ID | View to capture | Used on | Section | Desktop ratio | Mobile crop | Notes |
|---|---|---|---|---|---|---|
| **PS-01** | The primary working view — whatever an agency looks at most | Homepage | `H-01` | 16:10 | 4:5, one region | The site's single most important image. It becomes the `priority` LCP-adjacent asset |
| **PS-02** | Chapter I capability, primary view | Homepage + its product page | `H-06`, `PD-01` | 4:3 | 4:5 | |
| **PS-03** | Chapter II capability, primary view | Homepage + product page | `H-07`, `PD-01` | 4:3 | 4:5 | |
| **PS-04** | Chapter III capability, primary view | Homepage + product page | `H-08`, `PD-01` | 4:3 | 4:5 | Plus one required detail crop |
| **PS-05 … PS-N** | One primary + one detail view per product page | Each `/platform/<slug>` | `PD-01`, `PD-04` | 16:10 + 4:3 | 4:5 each | Count = 2 × number of product pages |
| **PS-S1 … PS-Sn** | One view per solution page | `/solutions/<segment>` | `SO-03` | 16:10 | 4:5 | May reuse product captures if genuinely representative |

### 11.3 Capture standard (BINDING)

| Aspect | Requirement |
|---|---|
| Resolution | 2× the rendered size, minimum 2560 px wide for 16:10 |
| Browser | 100 % zoom, no bookmarks bar, no extension icons, no notifications, no personal account, no OS chrome in frame |
| Data | **Demonstration data only.** No real client, no real property, no real phone number, address, price or portrait. Never redaction boxes — re-capture with demonstration data instead |
| Cursor | Absent in stills |
| Theme | Whichever theme the real product uses. **The product's own UI is not restyled to match this website.** Showing a re-skinned product would be a fabrication |
| Cropping | Desktop capture is cropped by the layout, not by the file. The mobile asset is a **separate, deliberately framed capture**, not a downscale |
| Legibility | Smallest text ≥ 11 px effective at 375 px on the mobile asset (§5.11) |
| Format | AVIF + WebP via `next/image`; source PNG archived outside `/public` |
| Naming | `/public/media/product/<view-slug>-<ratio>-v<N>.png` |
| Licence record | Every capture logged in `ASSET_LICENSES.md` with its capture date and the data-set used |

### 11.4 Illustrative material

Only two illustrative surfaces are planned, and both carry the persistent label:

1. **The operating picture** (`H-05` / `PO-02`) — an authored SVG diagram of capability
   areas. Illustrative by nature; never presented as a screenshot.
2. **The Experience Nuova plane** (`EX-02`) — if simulated, per C-02.

No other illustrative product imagery is authorised.

---

## 12. `CLAUDE.md` — critical review

`CLAUDE.md` is the repository's project instruction file and currently outranks nothing —
but it is loaded into every session, so a stale visual brief there will keep re-introducing
patterns this system forbids. Conflict **C-07** is already logged. This section provides the
factual analysis and a drop-in replacement. **`CLAUDE.md` has not been modified.**

### 12.1 Conflict table

| # | `CLAUDE.md` says | This system says | Severity | Resolution |
|---|---|---|---|---|
| 1 | Palette: "bright, clean, airy", off-white / warm white / sand / beige; **"avoid heavy black backgrounds"** | `ink-950` mineral black is the default canvas | **Direct contradiction** | Replace. Note: the *live site is already dark* (`#0A0908`), so `CLAUDE.md` also contradicts the shipped code |
| 2 | Positioning: "AI lead capture and qualification for real estate agencies" | "AI Operating and Growth System" (`MASTER_GOVERNANCE.md` §10) | Direct | Replace |
| 3 | Mandatory story flow: Pain → Loss → Speed → Solution → Demo → How it works → Benefits → Trust → CTA | Homepage architecture §9.2 | Structural | Replace; the pain argument survives as `H-03`, as editorial argument rather than mandated section order |
| 4 | **"PAIN VISUALIZATION (MANDATORY)"** — disappearing lead cards, fading bubbles, "lead gone" moments | Prohibited: animation without function (§1.3 #14), cards (#1) | Direct | Replace. Vanishing-card animation is exactly the gimmick class this brief forbids |
| 5 | Hero may include "elegant dashboard-like insight cards", "restrained floating elements" | Prohibited: floating cards as a hero (§1.3 #9) | Direct | Replace |
| 6 | "Too many font sizes" to be avoided; typography described only as "clean sans serif" | A 12-token type scale with fluid endpoints (§3.2) | Compatible but underspecified | Supersede with §3 |
| 7 | Primary CTA: **Book a Demo**; secondary: WhatsApp / Try Demo | `MASTER_GOVERNANCE.md` §11 makes the trial primary | Direct, **and currently unresolvable** | Blocked by C-01. Until resolved, *Book a demo* is the working primary — which happens to match `CLAUDE.md` |
| 8 | WhatsApp as a core CTA and channel | No number exists; R7 forbids inventing one | Direct | Blocked by C-05. WhatsApp CTAs do not ship |
| 9 | "Include a lightweight premium assistant or chatbot"; "create a polished UI-ready concept … that can be connected later" | A chat window that accepts input and never answers is a **P0** violation (`INTEGRATION_CONTRACT.md` §7) | **Dangerous if followed literally** | Replace. No chat launcher ships until a backend exists |
| 10 | "Demo experience (mandatory)" with mini form, phone mockup, animated conversation preview | Retained as `/experience`, but subject to C-02 disclosure | Partial | Amend |
| 11 | Trust: "avoid fake testimonials, fake logos, fake numbers" | Identical to R6 | **Agrees** | **Keep** |
| 12 | Bilingual EN + ES, no mixed-language UI, no literal translation | Identical | **Agrees** | **Keep**, and upgrade to route-based locales |
| 13 | Mobile-first, critical | Identical | **Agrees** | **Keep**, strengthened by §5.11 and §6 |
| 14 | Brand assets: use the real logo, do not redesign, optimise sizing only | Identical | **Agrees** | **Keep**; add the SVG requirement (§14) |
| 15 | "n8n is used only as hidden internal automation infrastructure"; architecture Frontend → API route → hidden automation | Superseded by the systems-isolation directive: **every integration is a disabled placeholder** | Materially outdated | Replace |
| 16 | Animation: "fade-in on scroll, soft slide-up, subtle hover, elegant phone mockup animation, restrained floating elements" | §4 motion system, 12–16 px displacement, ≤ 520 ms, no floating elements | Partially compatible | Supersede with §4 |
| 17 | No radius, shadow, grid, spacing or breakpoint rules at all | §3 defines all of them | Gap, not conflict | Add |
| 18 | Sections list of 10 homepage blocks | §9.2's 13 surfaces | Structural | Replace |

### 12.2 Proposed replacement for `CLAUDE.md`

The following block replaces the sections `VISUAL DIRECTION`, `TYPOGRAPHY`,
`LAYOUT PRINCIPLES`, `ANIMATION PRINCIPLES`, `STORY FLOW`, `HERO SECTION`,
`DEMO EXPERIENCE`, `HOT LEAD ALERTS`, `CHATBOT / ASSISTANT EXPERIENCE`,
`CORE SECTIONS TO INCLUDE`, `HOW IT WORKS SECTION`, `CHANNEL STORY`, `ARCHITECTURE RULE`
and `CONVERSION RULES`. The sections `PRIMARY BUSINESS GOAL`, `TARGET AUDIENCE`,
`TRUST SIGNALS`, `BILINGUAL REQUIREMENT`, `MOBILE-FIRST REQUIREMENT`, `BRAND ASSETS`,
`MESSAGING STYLE`, `TECHNICAL BUILD RULES` and `EDITING BEHAVIOR` are retained with the
amendments noted.

**Owner approval is required before `CLAUDE.md` is edited. It has not been touched.**

```markdown
## DESIGN AND CONTENT AUTHORITY (supersedes all earlier visual instructions)

This file no longer defines the visual system, the page architecture or the copy.

| Question | Authoritative document |
|---|---|
| What the product is and does | docs/website_redesign/PRODUCT_TRUTH.md |
| What may be said publicly | docs/website_redesign/CLAIMS_MATRIX.md |
| Every word, EN and ES | docs/website_redesign/COPY_AND_CONVERSION_MASTER.md |
| Every visual and structural decision | docs/website_redesign/LUXURY_UX_MEDIA_SYSTEM.md |
| Every interactive action and its states | docs/website_redesign/INTEGRATION_CONTRACT.md |
| Process, severity, release | docs/website_redesign/MASTER_GOVERNANCE.md |

Do not invent a visual decision, a section, a claim, a price or a sentence at
implementation time. If something is missing, log a conflict in
docs/website_redesign/IMPLEMENTATION_STATUS.md and continue with the unblocked work.

## POSITIONING

NuovaSolution is an AI Operating and Growth System for real estate agencies —
not a chatbot and not a lead tool. Primary market: Spain, Andalusia, Costa del Sol.
English is the primary language; Spanish is the second complete language.

## VISUAL DIRECTION (summary — the binding detail is in LUXURY_UX_MEDIA_SYSTEM.md)

Material, not magic. Mineral black (#0C0B09) is the default canvas; warm ivory
(#F7F4ED) is the editorial canvas used for reading-dense pages and one contrast
band per long page; champagne (#C9A96E) is a restrained accent that never fills a
large area. Editorial typography, hairline rules, large real product surfaces
cropped by the page, controlled asymmetry, deliberate whitespace.

The earlier "bright sand and beige Mediterranean" direction is retired. Warm
ivory carries that intent now, as a register rather than as the whole site.

Maximum border radius anywhere: 8px. Buttons are 4px. Nothing is pill-shaped
except the language switcher, status pills and avatars.

## FORBIDDEN AS DEFAULT PATTERNS

Rows of identical rounded cards; bento grids without narrative purpose;
glassmorphism; purple or blue AI gradients; robots, brains, neural spheres;
fake 3D blobs and mesh gradients; stock photography of smiling agents; floating
dashboard cards as a hero; large radii; unused or accidental space; blanket
min-height; inconsistent section heights; animation without function; scroll
hijacking; heavy parallax; typewriter effects; aurora blobs; gradient section
seams; centred headings outside the three permitted cases.

## HEADINGS AND ALIGNMENT

All headings are left-aligned. Centred headings are permitted in exactly three
places: the final closing CTA section of a page, a legal page title, and an
error or empty state. Nowhere else. Mobile does not change alignment.

## ANIMATION

Transform and opacity only. Nothing exceeds 520ms. Scroll reveal displacement is
12px on mobile and 16px on desktop. Content is fully legible with JavaScript
disabled — the hidden state is applied only after hydration, never serialised
into the HTML. prefers-reduced-motion is honoured everywhere. No animation
delays a control becoming interactive.

## MEDIA HONESTY (absolute)

No fabricated dashboard is ever presented as product proof. Every product
depiction is one of three states: a real capture, a clearly labelled
illustration, or an empty placeholder frame at the exact final dimensions.
No invented client, logo, testimonial, portrait, number, percentage, price,
badge or certification — in copy, in a screenshot, in a mockup or in a video
frame. Demonstration data is used for every capture and is labelled.

## INTEGRATIONS (systems isolation)

Every website integration is prepared as a disabled placeholder and sends no
real external request by default. The separate NuovaSolution product and
automation project — including its n8n server, credentials, databases and
messaging, CRM and billing systems — is out of scope and must not be accessed,
tested, triggered or modified from this repository. If a task might touch it,
stop and report the conflict.

No endpoint, URL, webhook path, secret, token, environment variable value,
phone number or WhatsApp number may be invented. Environment variable *names*
are proposed in INTEGRATION_CONTRACT.md; values come from the owner.

Any credential found in this repository is reported as a security risk and never
reproduced.

## CONVERSION

The CTA ladder is defined in MASTER_GOVERNANCE.md §11 and is currently blocked by
conflict C-01. Until it is resolved, "Book a demo" is the working primary action,
because it is the only action with a live target system. One primary button per
viewport. Every control has a real href and an honest state; a control that leads
nowhere is a P0 finding.

No chat launcher, WhatsApp CTA, login link, pricing figure or trial signup ships
until its blocking conflict is resolved.

## PERFORMANCE (binding)

LCP <= 2.5s, INP <= 200ms, CLS <= 0.1, desktop and mobile measured separately.
The LCP element on every page is the headline text, never a video or a large
image. Fonts are self-hosted via next/font/local with exactly one preload. One
video per route, poster-first, preload="none", never autoplaying above the fold,
captioned in EN and ES. Every image and video sits in a reserved aspect-ratio
box. First-load JS <= 130KB per route.
```

---

## 13. Component disposition

### 13.1 Discard

| Item | Reason |
|---|---|
| `components/sections/hero.tsx` | Composition, floating cards, glow, 0.9–1.0 s animations, `minHeight: 100vh` |
| `components/sections/always-on.tsx` (43 KB) | Dashboard-card surface, superseded by chapters |
| `components/sections/real-scenarios.tsx` (28 KB) | Same |
| `components/sections/lead-intelligence.tsx` (17 KB) | Same |
| `components/sections/final-cta.tsx` | Absolute self-referencing URLs (A-03), `href="#"` pattern (A-02) |
| `components/sections/faq.tsx` | Rebuilt as the `PR-05` accordion pattern |
| `components/ui/nav.tsx` | `!important` cascade to 300 px, dead CTA pattern, no page structure |
| `components/ui/footer.tsx` | Thin 3-item row; replaced by the 4-zone footer |
| `components/ui/section-divider.tsx` | Gradient seam + gold glow — forbidden (§3.5) |
| `components/ui/aurora-background.tsx` + `aurora-1/2/3` keyframes | Forbidden (§1.3 #17) |
| `components/ui/typewriter-effect.tsx` | Forbidden (§4.4) |
| `components/ui/container-scroll-animation.tsx` | Scroll-linked scaling — forbidden (§4.6) |
| `components/ui/dark-mode-toggle.tsx` | No dark-mode toggle exists in the new system (§2.4) |
| `components/ui/prompt-input.tsx` | Superseded by the `EX-02` input |
| `components/sections/chat-demo.tsx`, `demo-flow.tsx`, `speed-compare.tsx`, `lead-lost.tsx`, `trust-strip.tsx` | Dead code; `demo-flow.tsx` also contains a dead `#contact` link |
| `components/v2/*` + `lib/os/copy.ts` + `app/v2` | Abandoned concept; the `100svh` sticky film is scroll hijacking |
| `components/live-demo/live-demo-client.tsx` (80 KB) | Presentation layer superseded by `/experience`; the domain logic is harvested |
| `index.html` + `assets/css/*` + `assets/js/*` | Dead legacy static site (~125 KB) |
| `--ns-*` / `brand.*` / inline-hex triple colour system | Replaced by §2 tokens |
| `.btn-gold`, `.btn-hero-ghost`, `.hero-card`, `rounded-full` buttons | Replaced by §5.1 |
| Google Fonts `@import`, Playfair Display | Replaced by §3.1 |
| Blanket `overflow-x: hidden` | Forbidden as a strategy (§6) |

### 13.2 Keep and reuse

| Item | Note |
|---|---|
| Next.js 14 App Router + TypeScript strict | Foundation |
| Tailwind + PostCSS | Keep the toolchain; **replace the entire theme** with §2/§3 tokens |
| `lib/utils.ts` (`cn`) | Unchanged |
| `framer-motion` | Keep, scoped to mega menu, mobile sheet and media player only (§4.5) |
| `@vercel/analytics` | Keep as the base; add the custom events listed in `INTEGRATION_CONTRACT.md` |
| `next/image` usage pattern | Keep; add mandatory `sizes` and `aspect-ratio` boxes |
| Cal.com integration | Keep the account/event; **rebuild the trigger** as progressive enhancement over a real `href` |
| `components/live-demo/demo-engine.ts` | Harvest the domain logic into a small tested module for `/experience`. Not as UI |
| `translations/en.ts` / `es.ts` (240 keys each) | Raw material for `COPY_AND_CONVERSION_MASTER.md`. Not final copy |
| `lib/language-context.tsx` | Concept kept, implementation replaced by route-based locales (§5.12) |
| Legal page **content** | Preserved verbatim; presentation only per §9.10 |
| Logo files | Preserved. Re-mastered as SVG (§14) |

---

## 14. Missing assets

| ID | Asset | State | Blocking |
|---|---|---|---|
| AS-01 | **Logo as SVG** — full lockup, icon, wordmark; two authored colour versions (ivory / `ink-950`) | **Missing.** Only 5 PNGs exist (810 KB total), 2 duplicated in `assets/images/`, all pure black, currently recoloured with a CSS `invert()` hack | Header, footer, mobile sheet, OG images |
| AS-02 | **Font files** — self-hosted woff2, `latin` + `latin-ext` subsets | Missing — fonts currently load from Google via a render-blocking `@import` | LCP budget, A-05 |
| AS-03 | **OG images** — 1200 × 630, one per page type, per locale | Missing entirely | Social sharing, A-13 |
| AS-04 | **Favicon set** — 32, 180 (apple-touch), 512, maskable | Partial (`favicon-v2.svg/png`, `app/icon.*`); no maskable, no full size set | Install prompts, tab clarity |
| AS-05 | **Photography** — IMG-01 plus a small reserve set | **None exists.** No photograph is in the repository | `H-09`, `SO-02` |
| AS-06 | **Videos V-01 … V-08** | **None recorded.** 8 videos × (2 ratios × 2 codecs + 2 posters + 1 still + 2 caption tracks + 2 transcripts) | `H-04`, every `PD-03`, `ON-02` |
| AS-07 | **Product screenshots PS-01 … PS-N** | **None captured.** Minimum 8, realistically 20+ once product pages are counted | Every product surface on the site |
| AS-08 | `docs/website_redesign/ASSET_LICENSES.md` | **Does not exist.** Required by §5.10 and §10.1 | Every image and video |
| AS-09 | `lib/media-manifest.ts` | Does not exist. Drives the pending→live media swap (§10.3) | Implementation Phase 8 |
| AS-10 | Demonstration data set / demonstration workspace | Does not exist | Every capture and every video |
| AS-11 | **Status glyph set** — 8 inline SVGs at 16 px, 1.5 px stroke (§5.17) | Does not exist. Authored in-repo, no icon library is introduced | Every authenticated status surface |
| AS-12 | **Captcha widget dimensions** and its non-visual alternative | Provider unknown (MF-08). The reserved box is a named constant until supplied | Signup, any public form |

---

## 15. Open owner decisions

Beyond conflicts **C-01 … C-07** already logged in `IMPLEMENTATION_STATUS.md`, this document
raises the following. None can be resolved by invention.

| ID | Decision needed | Blocks |
|---|---|---|
| **D-01** | Confirm the dark **mineral-black** direction supersedes `CLAUDE.md`'s bright sand palette (this is C-07, now with a concrete proposal in §12.2), and approve editing `CLAUDE.md` | All of Phase 1 |
| **D-02** | **Font licence budget** — ship free Inter (Option A) or fund a commercial face (Option B)? Cost must be obtained from the foundry; it is not quoted here | §3.1, Phase 1 |
| **D-03** | **Photography** — commission a shoot, or license stock? Who clears the licence and records it in `ASSET_LICENSES.md`? | AS-05, `H-09` |
| **D-04** | **Demonstration workspace** — may a dedicated demonstration environment with fictional-but-labelled data be created for captures and recordings? Under systems isolation, this cannot be assumed and must not touch production | AS-10, AS-07, AS-06 — i.e. **every** video and screenshot |
| **D-05** | **Redaction policy** — confirm that no real client, property, price, portrait or contact detail appears in any capture, and that redaction boxes are not used as a substitute | V-04, V-05, PS-* |
| **D-06** | **Third-party platform UI in V-03** — may social platform interfaces be shown, and under whose brand-usage terms? Trademark question, not only R6 | V-03 |
| **D-07** | **Video production** — who records and edits? Is there a voiceover, in which languages? Recommended default is **no voiceover, on-screen labels only** (halves localisation cost, removes claims risk) | All 8 videos |
| **D-08** | **Spanish product UI** — do recordings and screenshots need a Spanish-language interface capture, or does the ES site show the EN interface with a note? | Every capture, doubled if Spanish is required |
| **D-09** | **Legal re-review** — the new forms change what data the site collects. The privacy pages must be re-verified by whoever is legally responsible before those forms ship | `ON-04`, `PR-*`, §9.10 |
| **D-10** | **Security & Governance page** — which practices are real and may be stated publicly? | `/security` |
| **D-11** | **Route naming** — final product and solution slugs, and whether `/live-demo` permanently redirects to `/experience` | §9.1, sitemap, existing inbound links |
| **D-12** | **Locale URL strategy** — confirm `/[locale]` prefix for both languages (`/en`, `/es`) versus an unprefixed English default. Affects every canonical, `hreflang` and existing inbound link | §5.12, A-04, A-13 |

---

## 16. What is binding as of this document

1. **Colour** — §2 tokens, with the verified contrast table as the floor. No new colour
   ships without a computed ratio added to §2.3.
2. **Type** — §3.2 scale, §3.3 measure, §3.8 alignment law. Left-aligned headings, three
   centred exceptions.
3. **Space** — §3.4 scale, §3.5 stepped section rhythm, three seam types.
4. **Grid** — §3.6 containers, §3.7 asymmetry ratios, alternating media sides.
5. **Radius** — 8 px maximum anywhere; buttons at 4 px; no pill buttons.
6. **Shadow** — four tokens; elevation on dark comes from surface + border, not blur.
7. **Motion** — §4: transform/opacity only, ≤ 520 ms, 12/16 px displacement, content
   legible without JS, reduced motion honoured, interaction never blocked.
8. **Media honesty** — §5.11: three `ProductSurface` states; no fabricated dashboard as
   product proof, ever.
9. **One video per route**, poster-first, never autoplaying above the fold, captioned EN+ES.
10. **LCP is text on every page.**
11. **Every control has a real `href` and an honest state.** No `href="#"`.
12. **Accessibility** — WCAG 2.2 AA, 44 px touch targets, focus never obscured.
13. **Budgets** — §8.4, enforced at phase close.

Added by Wave A3:

14. **Interactive controls never sit on `ink-800` or `ink-50`**, and a surface step is never
    a boundary (§2.3.1 rules 5 and 6).
15. **Status is glyph + text + colour**, never colour alone; eight distinct glyphs (§5.17).
16. **An upload surface is never built ahead of its contract**, and the client invents no
    file-size or file-type limit (§5.16).
17. **Anti-patterns 19 to 24** — no card-grid wizard, no ring progress, no celebration, no
    toasts, no gamification, no mismatched skeletons (§1.3).

---

## Status

Design and media system specified: brand direction, verified colour tokens, typography with
licensed font options, spacing, grid, section rhythm, borders, radii, shadows, motion,
component law, page architecture for eight page types with a full 13-field specification per
homepage section, eight fully specified video placeholders, a screenshot capture plan, a
critical `CLAUDE.md` review with a drop-in replacement block, an asset gap register and
twelve open owner decisions.

**Amended by Wave A3** (Authenticated Experience Design), which added: the companion-document
reference (§0.1), anti-patterns 19 to 24 (§1.3), thirty-nine computed raised-surface contrast
pairs and three binding rules derived from them (§2.3.1), the authenticated canvas assignments
(§2.4), the file input and upload law (§5.16), the status expression law and its three
primitives (§5.17), the authenticated route map with a logged `/onboarding` path collision
(§9.1), two further missing assets (§14), and four further binding rules (§16). **No new
colour, token, type size, radius, shadow or motion value was introduced.** The full
authenticated specification lives in `AUTHENTICATED_SURFACE_SYSTEM.md`.

No application code has been modified. No integration has been created or connected. No
external system has been contacted. `CLAUDE.md` has not been edited.

**Implemented and awaiting independent technical and final audit.**
