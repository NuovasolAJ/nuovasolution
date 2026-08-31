# AUTHENTICATED SURFACE SYSTEM — NuovaSolution

**Document role:** Extension of `LUXURY_UX_MEDIA_SYSTEM.md` for the authenticated customer journey.
**Produced by:** Wave A3 — Authenticated Experience Design.
**Binding under:** `MASTER_GOVERNANCE.md` R5, via `LUXURY_UX_MEDIA_SYSTEM.md` §0.2.
**Branch:** `website_enterprise_redesign`
**Created:** 2026-08-31

**Closes:** the seventeen gaps in `FINAL_RECONCILIATION_REPORT.md` §5.2, under the ten binding
constraints of §5.3 and the anti generic acceptance criteria of §5.4.

---

## 0. Scope, authority and limits

### 0.1 This is an extension, not a second system

`LUXURY_UX_MEDIA_SYSTEM.md` remains the visual and structural authority. Every token, the type
scale, the measure law, the alignment law, the radius law, the shadow set, the motion budget and
the eighteen anti patterns apply to authenticated surfaces **unchanged**. There is no app theme,
no second palette, no relaxed register behind a login.

This document adds only what the marketing system did not need: session, status, wizard, upload,
entitlement and billing surfaces.

**No new colour is introduced.** Every pairing this document uses is computed and recorded in
`LUXURY_UX_MEDIA_SYSTEM.md` §2.3.

### 0.2 What this document decides

Page architecture, information hierarchy, state machines and responsive composition for the
authenticated journey. The eight status values as visual specifications. The API envelope to UI
mapping. The file upload law's application. The wizard shell.

### 0.3 What this document does NOT decide

| Not decided here | Owner |
|---|---|
| Whether a capability exists | `PRODUCT_TRUTH.md` |
| Whether anything may be said publicly | `CLAIMS_MATRIX.md` |
| Any word, label, error sentence or button text, EN or ES | `COPY_AND_CONVERSION_MASTER.md` |
| Endpoints, payloads, status values, environment variable names | `backend_handoff/WEBSITE_INTEGRATION_HANDOFF_EXPORT_v1.md` |
| Which action is released to a real target | `INTEGRATION_CONTRACT.md` activation register |
| Process, severity, release | `MASTER_GOVERNANCE.md` |

Copy slots are written `[COPY: <slot-id>]`. **No string in this document is website copy.**
Where a state is described in words, that describes the *state*, not the sentence that renders it.

### 0.4 Systems isolation (acknowledged and unchanged)

Documentation only. No n8n access, no Supabase access, no API request, no webhook, no provider
call, no deployment, no push, no merge. No credential value is reproduced. Every integration
specified here is **disabled by default** and renders an honest placeholder until the owner
releases it individually in the activation register, which is empty
(`MASTER_GOVERNANCE.md` §14.3, matrix §6 invariant 7).

**No backend logic is invented.** Where the contract is silent, this document names the exact
missing field (§16) and specifies a UI behaviour that is safe without it — never a guess that
would cause a call to a real system.

### 0.5 Status of every surface in this document

Per `FINAL_RECONCILIATION_REPORT.md` §1:

> **BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING · END TO END VERIFICATION PENDING**

Nothing here is implemented. Nothing here is verified. Individual surfaces carry additional
`LEGAL REVIEW PENDING`, `OWNER DECISION PENDING`, `RESERVED`, `PROPOSED` or `BLOCKED` markers.

---

## 1. The authenticated register

### 1.1 The idea

A serious firm's setup process reads like a commissioning document, not like a product tour. The
agency is being *installed*, not onboarded by a mascot. The register is therefore quieter than the
marketing site, not louder: fewer accents, more rules, more type, no illustration, no celebration.

The wizard's emotional target is **competence**, not delight.

### 1.2 Additional anti patterns (BINDING — extends `LUXURY_UX_MEDIA_SYSTEM.md` §1.3)

These are the specific failures an authenticated build produces. Each is added to §1.3 as
items 19 to 24.

| # | Forbidden | Replacement |
|---|---|---|
| 19 | A wizard rendered as ten cards, tiles or panels | One hairline index. `PO-03` row pattern (§7.1) |
| 20 | Ring, donut, radial or segmented progress meters; percentage badges on every row | One 1 px hairline progress rule plus one `caption` line (§7.2) |
| 21 | Celebration: confetti, checkmark animations, "Great job!", trophies, streaks, mascots, emoji | The row's status changes. Nothing else happens |
| 22 | Toast stacks, floating notification piles, corner popups | Inline state at the point of action; one region, reserved height (§4.4) |
| 23 | Avatar stacks, presence dots, activity feeds, gamified completion counters | Named rows, real status, nothing decorative |
| 24 | Skeleton screens that do not match the real content's dimensions | Reserved frames at measured heights (§2.4) |

### 1.3 The honesty firewall, restated for authenticated surfaces (BINDING)

`LUXURY_UX_MEDIA_SYSTEM.md` §5.11's `ProductSurface` law applies unchanged. In addition:

1. **No fabricated agency data.** No sample lead, sample property, sample conversation, sample
   metric, sample chart or sample teammate is ever rendered inside the authenticated tree — not
   as a preview, not as a placeholder, not "to show what it will look like". An empty state is
   an empty state.
2. **`externally_pending` is never rendered as complete.** Handoff Appendix B invariant 5. No
   check glyph, no positive colour, no completed row treatment, no contribution to a completed
   count that reads as done. This is release blocking, not a styling preference.
3. **No technical identifier is ever rendered.** No workflow, webhook or automation identifier,
   no storage object path, no tenant identifier, no entitlement key, no provider API field name,
   no `request_id` in a headline, no raw HTTP code. Handoff Appendix B invariant 6. This is a
   rendering layer rule (§1.4), not a convention that each screen remembers.
4. **No number is hardcoded.** Not the trial length, not the extension length, not the step
   count, not a price, not a quota, not a percentage. Every one of them is rendered from the
   projection or the endpoint, or it is not rendered.
5. **Progress is server given.** `percent_complete` and `completed_steps` are rendered, never
   computed client side (`FINAL_RECONCILIATION_REPORT.md` §5.3 constraint 8).
6. **Capability status is a content property.** Entitlement and plan gating change per tenant at
   runtime; no gate may be expressed as hardcoded prose (constraint 9).

### 1.4 The redaction layer (BINDING)

Invariant 6 is enforced once, in a rendering primitive, not by discipline on each screen.

- A single `<AgencyText>` / `formatForAgency()` boundary is the only path by which server strings
  reach the DOM inside the authenticated tree.
- It resolves a known key to an agency facing label supplied by `COPY_AND_CONVERSION_MASTER.md`.
- **An unrecognised key renders nothing** — not the raw key, not a fallback of the key itself.
  The surrounding sentence is authored to remain grammatical when a term is absent.
- Applies to: entitlement keys, provider identifiers, step keys, `code` values from the envelope,
  `missing_api_names[]` from CRM health, and any object path.
- A build time check greps the authenticated tree for direct interpolation of these fields
  outside the boundary. A hit is a P0 finding.

*Illustrative only, not copy:* the agency reads **Property Experience**; it never reads
`px.experience`. The agency reads a plain description of a field the CRM no longer provides; it
never reads that field's API name.

---

## 2. Foundations extension

### 2.1 Surface stack

| Layer | Dark token | Ivory token | Used for |
|---|---|---|---|
| Canvas | `ink-950` | `ivory` | Page background |
| Raised | `ink-900` | `paper` | Panels, the step plane, the index rail, the trial banner |
| Sunken | `ink-850` | `paper` | Inputs, wells, upload zones, code-free data rows |
| Deep | `ink-800` | `ink-50` | Row hover, table zebra, **non interactive only** |

**BINDING, derived from the computed table:**

1. **Interactive controls never sit on `ink-800` or `ink-50`.** `border-interactive` measures
   2.89:1 on `ink-800` and 2.98:1 on `ink-50`, below the 3:1 floor for a control boundary. Inputs,
   selects, upload zones and secondary buttons sit on `ink-900`, `ink-850` or `paper`.
2. **A surface step is not a boundary.** `ink-900` against `ink-950` measures **1.04:1**. It is
   decorative separation only. Any row boundary, selected state, hover state or focus state must
   carry a **border, a rule or a glyph** — never a surface change alone.
3. Ivory canvas inputs sit on `paper`, never on `ink-50`.

### 2.2 Canvas assignment for the authenticated tree (BINDING)

| Surface | Canvas | Reason |
|---|---|---|
| Signup, login, logout confirmation | `ivory` | Form dense, consistent with `LUXURY_UX_MEDIA_SYSTEM.md` §5.6 |
| Wizard shell, index and every step page | `ink` | The setup process is the product register |
| Forms **inside** a wizard step | `ink`, fields on `ink-850` | The step plane does not switch canvas mid page |
| Trial banner, trial expired state | `ink` | Rides with the shell |
| Readiness summary | `ink` | |
| Plan selection, upgrade, checkout handoff | `ivory` | Consistent with the public pricing page |
| Testimonial surface | `ivory` | Form dense |
| Error and empty states | inherits the surrounding canvas | |

A canvas never changes inside a page. It changes only between routes.

### 2.3 Reserved height law (BINDING — the CLS defence)

Authenticated surfaces are status driven, which is the single largest source of layout shift.

1. Every region whose content depends on a fetch declares its dimensions before the fetch
   resolves, using a measured `min-height` recorded per component — **not** a guess, and **not**
   `min-height` used as a spacing device (which `LUXURY_UX_MEDIA_SYSTEM.md` §3.5 forbids for
   sections; this exception applies to async regions only and is capped at the tallest real
   state).
2. The reserved height equals the tallest of: loading, empty, populated, error.
3. The trial banner occupies a fixed height whether or not it renders content. When it renders
   nothing, the height collapses to zero **before first paint**, never after.
4. Status rows have a fixed height per breakpoint (§3.5) so a status change never reflows the
   index.
5. Buttons hold their width across label changes. Forms hold their height across idle, error and
   success (`LUXURY_UX_MEDIA_SYSTEM.md` §5.6).
6. `content-visibility: auto` is paired with a correct `contain-intrinsic-size`, or it is not used.

### 2.4 The authenticated shell

There is **no second navigation system**. The header is the same component as the public site
(`LUXURY_UX_MEDIA_SYSTEM.md` §5.2), in **State B — solid**, always, on every authenticated route.

| Slot | Authenticated content |
|---|---|
| Left | Logo lockup, links to the authenticated root |
| Centre left | **No mega menu.** The public primary nav is not rendered inside the authenticated tree |
| Right | Language switcher, account control, and one contextual action where the surface defines one |

- The account control is a `heading-s` text button with a `chevron-down`, opening a panel built
  from the mega menu's panel construction (`ink-900`, 1 px border, `radius-md`, `shadow-overlay`,
  `motion-control`) at a maximum width of 320 px. It contains: the signed in identity as plain
  text, a link to plan and subscription, and sign out.
- **No avatar, no initials circle, no presence dot.**
- The trial banner (§6.1) sits directly beneath the header, inside the same fixed block, so the
  two together form one reserved height exposed as `--shell-h`.
- Every authenticated page's first section reserves `--shell-h`, exactly as marketing pages
  reserve `--header-h`.

### 2.5 Routes

All routes are **PROPOSED**. None exists. `[locale]` is `en` or `es`, pending owner decision 11.

| Route | Surface | Section |
|---|---|---|
| `/[locale]/signup` | Signup | §5.1 |
| `/[locale]/login` | Login | §5.2 |
| `/[locale]/onboarding` | Wizard index | §7 |
| `/[locale]/onboarding/[step]` | Step page, ten keys | §8 |
| `/[locale]/account/plan` | Plan, subscription, upgrade, checkout handoff | §10 |
| `/[locale]/account/testimonial` | Testimonial, legally held, not publicly linked | §11 |
| Dashboard destination | **BLOCKED on MF-03** | §9.3 |

`Log in` is not rendered in the public navigation until MF-03 is answered
(`LUXURY_UX_MEDIA_SYSTEM.md` §5.2, `INTEGRATION_CONTRACT.md` §4, conflict C-03).

---

## 3. The eight status values — visual specification

This closes gap 14. Semantics are the handoff's (§4); expression is
`LUXURY_UX_MEDIA_SYSTEM.md` §5.17's.

### 3.1 The law

**Every status renders as glyph + text + colour. Colour is never the differentiator.** Three of
the eight share `signal-attention`; they are told apart by glyph and label, which is why both are
mandatory (`FINAL_RECONCILIATION_REPORT.md` §5.3 constraint 2).

### 3.2 The eight values

| Value | Kind | Glyph | Colour (dark) | Colour (ivory) | Row treatment |
|---|---|---|---|---|---|
| `completed` | wizard step | `check` | `signal-positive` `#7FA88C` | `#3F6B52` | Settled. Title at `text-secondary`, not `text-primary` — done work recedes |
| `needs_action` | wizard step | `arrow-right` | `signal-attention` `#D2A24C` | `#8A5A21` | Title at `text-primary`. The only rows that carry a trailing affordance at full strength |
| `externally_pending` | wizard step | `clock` | `signal-attention` `#D2A24C` | `#8A5A21` | Title at `text-primary`. **1 px `signal-attention` rule along the row's left edge**, which no other state carries. Never a check, never positive colour, never counted as done |
| `locked_by_plan` | wizard step | `lock` | `text-secondary` + `champagne-400` on the affordance only | `text-secondary` + `champagne-700` | Honest state treatment (`LUXURY_UX_MEDIA_SYSTEM.md` §5.9). **Not an error.** The trailing affordance is an upgrade route |
| `optional` | wizard step | `rule` (one 8 px stroke) | `text-muted` | `text-muted` | The quietest row. Title at `text-secondary`, detail at `text-muted` |
| `connected` | connector health | `link` (two dots joined) | `signal-positive` | `#3F6B52` | Used on provider rows, never on wizard step rows |
| `degraded` | connector health | `triangle` outline | `signal-attention` | `#8A5A21` | Additive. The row still says connected **and** degraded. Never rendered as disconnected, never as healthy |
| `action_required` | connector health | `diamond` filled | `signal-critical` `#D97A6C` | `#A33F30` | The only state that may raise a `signal-critical` colour inside the wizard |

### 3.3 Glyph set (BINDING)

Eight distinct inline SVG glyphs, 16 px, 1.5 px stroke, `currentColor`, no fill except `diamond`,
`stroke-linecap: round`, no circular background, no badge, no drop shadow, `aria-hidden="true"`.

`check` · `arrow-right` · `clock` · `lock` · `rule` · `link` · `triangle` · `diamond`

They are distinct in **shape**, so the set survives greyscale, low vision and monochrome printing.
No glyph from this set is reused for any non status purpose anywhere on the site.

### 3.4 Verified contrast

All pairs computed and recorded in `LUXURY_UX_MEDIA_SYSTEM.md` §2.3.

| Pair | Ratio |
|---|---|
| `signal-positive` on `ink-900` | 7.08 |
| `signal-attention` on `ink-900` | 8.09 |
| `signal-critical` on `ink-900` | 6.24 |
| `signal-positive` on `ink-850` | 6.66 |
| `signal-attention` on `ink-850` | 7.61 |
| `signal-critical` on `ink-850` | 5.87 |
| `signal-positive-dk` on `paper` | 5.86 |
| `signal-attention-dk` on `paper` | 5.65 |
| `signal-critical-dk` on `paper` | 6.08 |
| `champagne-400` progress fill vs `ink-700` track | 6.39 |
| `border-interactive` on `ink-900` | 3.31 |
| `border-interactive` on `ink-850` | 3.11 |
| `border-interactive` on `paper` | 3.37 |
| focus ring on `ink-900` | 13.17 |
| focus ring on `paper` | 6.75 |

### 3.5 The three status primitives

| Primitive | Use | Construction |
|---|---|---|
| **`StatusRow`** | The wizard index, provider lists, readiness | Full container width. Grid: numeral (`caption`, `text-muted`, tabular) · title (`heading-s`) · one detail line (`body-s`, `text-muted`) · status cluster (glyph + `caption` label) · trailing affordance. 1 px `border-hairline` between rows. Height **72 px** ≥ 1024, **auto with 16 px vertical padding and a 72 px minimum** below. The whole row is the control where a route exists |
| **`StatusChip`** | Inline, beside a heading or a field | `radius-pill`, 1 px `border-hairline`, 24 px height, glyph 12 px + `caption`. **The only pill shaped element permitted in the authenticated tree**, per `LUXURY_UX_MEDIA_SYSTEM.md` §3.9 |
| **`StatusNote`** | When a status needs an explanation | Beneath the row or field: glyph + `body-s`, `space-2` gap, indented to the title's left edge. Carries the provider name for `externally_pending`, the reason for `degraded`, the resolution for `action_required` |

**Truncation:** a status label never truncates. A detail line truncates at two lines with a
`line-clamp` and the full text is available on the step page. A title never truncates; it wraps.

### 3.6 Status transitions

- A status change animates as a **cross fade of the glyph and label over `motion-micro` (120 ms),
  opacity only**. The row does not move, resize, flash, pulse or highlight.
- The row's `aria-live` region announces the new status text politely. Never assertively — a
  status change is not an interruption.
- Under reduced motion the change is instantaneous.
- No sound. No haptics.

---

## 4. API envelope to UI mapping

This closes gap 12. Envelope: `{ ok, code, message, details, request_id }` (handoff §5).

### 4.1 The mapping (BINDING)

| HTTP | Meaning | Treatment |
|---|---|---|
| `200` / `201` | ok | Success state naming what happened and what happens next. `role="status"`, focus moved to it. Never a generic acknowledgement |
| `202` | `externally_pending` | **Pending, never done.** The surface adopts the `externally_pending` row treatment (§3.2) and a `StatusNote` naming the provider (blocked on AF-04) |
| `400` | `invalid_input` | Field level. `aria-invalid`, `aria-describedby`, error summary above the form with focus moved to it |
| `401` | `no_session` / `token_expired` | §5.4. Silent refresh, one retry, then the session expired surface. **Never** a raw error |
| `403 forbidden` | insufficient role | The control renders read only with a one line reason. Not an error banner |
| `403 cross_tenant` | isolation violation | Treated as a defect, not as user error. Generic failure state plus the support affordance. **No detail is echoed to the user** |
| `403 not_on_plan` | entitlement | **`locked_by_plan` honest state. Never an error treatment.** Constraint 4 |
| `409 conflict` | duplicate or already in that state | Distinct copy per case. `409 email exists` routes to login. `409 already_subscribed` routes to the current plan, not to an error |
| `422` | `unprocessable` | Field level on the specific control. `422 consent_required` targets the consent control |
| `424` | `degraded` | `degraded` treatment. Warn plus a recommended action. **Not** an error, **not** `connected` |
| `429` | `rate_limited` | Human message plus a retry affordance. The control stays mounted at fixed dimensions |
| `5xx` | `server_error` | Generic failure state, a retry, a real alternative path, and the support affordance. **No internal detail, no stack, no code in the headline** |

### 4.2 `request_id` (BINDING — constraint 7)

- Never in a headline, never as the error's identity, never as prose.
- Rendered only inside a **support affordance**: a `caption` line reading as a reference, with a
  copy control (44 × 44 px touch box, `aria-label` from the copy document, confirmation announced
  via `role="status"`).
- Placed at the **end** of the error block, after the retry and the alternative path.
- Absent when the response carries none. The affordance is not rendered empty.

### 4.3 The `code` field

**BLOCKED on MF-04.** The enumeration is not in the handoff. Until it is supplied:

- Error copy is written per **HTTP status**, not per `code`.
- `message` from the envelope is described by the contract as display safe, but this system
  **does not render it as the primary error text** — an unenumerated server string cannot be
  guaranteed to be in the active language or free of technical identifiers. It is rendered only
  in the support affordance, beneath `request_id`, at `caption`.
- When MF-04 arrives, per `code` copy replaces per status copy without a layout change.

### 4.4 Where errors appear (BINDING)

One region, in this order of preference:

1. **Field level** for anything attributable to a field.
2. **Form level**, in an error summary above the form, focus moved to it, each item a link to its
   field.
3. **Surface level**, in a reserved region at the top of the affected plane.
4. **Never** a toast, a corner popup, a floating stack or a modal, unless the failure blocks the
   whole route, in which case it is the route's error state
   (`LUXURY_UX_MEDIA_SYSTEM.md` §5.15).

Errors do not disappear on a timer. They clear when the underlying condition clears or when the
user retries.

### 4.5 Retry law

- One automatic retry, and only for `401` after a successful refresh. Everything else is user
  initiated.
- A retry control is a Secondary button, never an icon alone.
- Retries are not rate limited client side beyond disabling the control while in flight.
- After two consecutive failures of the same action, the alternative path is promoted above the
  retry.

---

## 5. Authentication surfaces

### 5.0 The shared flow contract (BINDING)

Every flow in §§5 to 11 defines all twenty fields. Where a field reads **"Shared §5.0"**, the
value below applies in full. This keeps every flow complete without repeating identical text
thirty times.

| Field | Shared default |
|---|---|
| **Loading State** | Reserved height per §2.3. Control stays mounted at fixed dimensions. `aria-busy="true"`. Spinner only after 300 ms, 16 px, `currentColor`. Skeletons only where the real content occupies the same box, `bg: surface-sunken`, 1200 ms opacity pulse 1.0 to 0.7, static under reduced motion |
| **Empty State** | One `heading-m` line plus one action. No illustration, no emoji, no sample data (§1.3 rule 1) |
| **Error State** | §4. Field, then form, then surface. Never a toast. `role="alert"`. Human cause, a retry, a real alternative, then the support affordance |
| **Success State** | Explicit and specific: what happened and what happens next. `role="status"`. Focus moved. Replaces the control in the same reserved box |
| **Resume State** | Re entering re reads server state. **No client cached status is ever displayed.** A partially filled form restores from the server's stored values only; unsaved local input is not persisted |
| **Blocked State** | `LUXURY_UX_MEDIA_SYSTEM.md` §5.9 honest state. The control states why in one line, `aria-disabled="true"` (never the `disabled` attribute, so it stays focusable and the reason is announced), and offers the working alternative |
| **Connection State** | §3.2 vocabulary, rendered by the §3.5 primitives |
| **Accessibility** | WCAG 2.2 AA. One `h1`. No skipped levels. Landmarks labelled. 44 × 44 px targets. Focus never obscured: `scroll-margin-top: calc(var(--shell-h) + 16px)`. `<html lang>` correct. No time limits on any input |
| **Keyboard Behavior** | Everything operable. Tab order follows visual order, no positive `tabindex`. `Escape` dismisses any expanded surface and returns focus to its trigger. `Enter` submits a single control form. No keyboard trap except the mobile sheet, which `Escape` releases |
| **Focus Behavior** | 2 px `--focus-ring`, offset 2 px, per canvas. Focus moves to: the error summary on a failed submit, the success region on success, the first invalid field from a summary link, the dialog's first control on open, the trigger on close |
| **Reduced Motion** | `LUXURY_UX_MEDIA_SYSTEM.md` §4.7. Transform reveals become opacity only at 120 ms or nothing. Status changes instantaneous. Progress rule changes width without transition. Skeleton pulse becomes a static tint |
| **Performance** | Server components by default. Client components only where state demands them. Every fetch declares reserved dimensions. First load JS budget per authenticated route **≤ 130 KB**, except the wizard step routes which share one chunk. No image, no video, no font beyond the two global faces |
| **Responsive Spacing** | `LUXURY_UX_MEDIA_SYSTEM.md` §3.4 tokens only. Page vertical rhythm `section-y-default`. Form field stack `space-5`. Field group separation `space-10`. Heading to body `space-6`. Content to action row `space-12`. Never an ad hoc margin |
| **Validation Presentation** | Labels always visible above the field. Client validation on **blur**, never on keystroke. Re validation on change only after the field has already errored. Submit validates all. Errors are glyph plus text plus colour, never colour alone. `Required` as a word, never an asterisk alone. Server validation replaces client validation for the same field when it disagrees |

### 5.1 Signup

Closes gap 1. Route `/[locale]/signup` — **PROPOSED**.
Contract: `POST {NUOVA_API_BASE}/signup { name, email, password, language, agency_name }` →
`{ ok, next:"onboarding", session? }`.

| Field | Specification |
|---|---|
| **Page Purpose** | Create the agency account and start the trial. One job. No marketing content, no feature list, no testimonial, no logo wall |
| **Layout** | `ivory` canvas. `--shell-h` reserved. **Asymmetric 7 / 5** on ≥ 1024: form in columns 1 to 7 at `container-narrow` measure, columns 8 to 12 carry a single editorial column — an eyebrow, one `heading-l` and three hairline separated `body-s` lines stating what happens after signup. **Not a testimonial, not a feature grid, not a picture.** Below 1024 the right column moves beneath the form |
| **Information Hierarchy** | `display-m` h1 `[COPY: signup.h1]` → `body-l` lead, max 56 ch → form → privacy line → the login route for existing accounts, as a Quiet link |
| **Desktop Behavior** | 7 / 5 split. Submit is auto width, left aligned. The right column is `position: sticky` from `--shell-h` + 32 px only if the form exceeds the viewport |
| **Tablet Behavior** | Single column, `container-narrow`, form first. Right column becomes a hairline separated block beneath the form, above the footer |
| **Mobile Behavior** | Single column, page gutter 20 px. Fields 52 px tall. Submit full width, in flow at the end of the form — **not sticky**, so the keyboard never covers it. Right column content retained beneath, never dropped |
| **Loading State** | Shared §5.0. Submit label swaps at locked width. The captcha widget occupies a reserved box from first paint, sized to its provider's dimensions — **blocked on MF-08**, so the reservation is a named constant to be set when the provider is known |
| **Empty State** | n/a. The form is the initial state |
| **Error State** | `409` email exists: a form level message that routes to login, with the entered address preserved. `400`: field level. `429`: human message plus retry, submit stays mounted. `5xx`: generic plus support affordance. Password rules are stated **before** submission, never revealed only on failure |
| **Success State** | If `session` is returned, navigate to the wizard at `resume_step`. If only a login hint, route to login with a `role="status"` message stating the account exists and what to do next. **These two outcomes must not share one message** |
| **Resume State** | No draft persistence. A returning visitor with a session is redirected away from signup to the wizard |
| **Blocked State** | Until the owner releases the action (activation register), the submit renders as the §5.9 honest state and offers *Book a demo*. **The word "free" and "no credit card required" do not appear** until T-01 and owner decision 4 resolve |
| **Connection State** | n/a. The BFF is either reachable or the error mapping applies |
| **Accessibility** | Shared §5.0, plus: `autocomplete` `name`, `email`, `new-password`, `organization`. `type="email"` with `inputmode="email"`. Password field has a visibility toggle that is a real button with an accessible name and `aria-pressed`. The captcha must have an accessible non visual alternative; a provider without one is rejected at MF-08 |
| **Keyboard Behavior** | Shared §5.0. `Enter` in any field submits. Tab reaches the captcha before the submit |
| **Focus Behavior** | Shared §5.0. On `409`, focus moves to the form level message, whose first element is the login link |
| **Reduced Motion** | Shared §5.0 |
| **Performance** | The captcha script is the only third party asset on the route and loads **after** the form is interactive, never render blocking. LCP is the `h1` |
| **Responsive Spacing** | Shared §5.0. Form to privacy line `space-6`. Privacy line to login link `space-8` |
| **Validation Presentation** | Shared §5.0. `language` values are **blocked on MF-09**; until supplied, the control is not rendered and the locale is taken from the route. Password requirements displayed as a static `caption` list, not as a live strength meter |
| **Legal** | L-07 consents and controller/processor roles. **L-14 privacy policy, launch blocking.** The privacy line sits at the point of collection with a real link |
| **Status** | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING · LEGAL REVIEW PENDING · blocked on MF-08, MF-09 · CTA wording OWNER DECISION PENDING |

### 5.2 Login

Closes gap 2. Route `/[locale]/login` — **PROPOSED**.
Contract: `POST {SUPABASE_URL}/auth/v1/token?grant_type=password`, `apikey` header. Browser safe.

| Field | Specification |
|---|---|
| **Page Purpose** | Return an existing agency to where it left off |
| **Layout** | `ivory`. `container-narrow`, **left aligned**, single column, vertically positioned at the upper third rather than centred — a centred login box is the generic pattern this system avoids, and §3.8's alignment law permits centring only in three cases, none of which is this |
| **Information Hierarchy** | `display-m` h1 → form (email, password) → submit → password recovery route → the signup route |
| **Desktop Behavior** | `container-narrow` at the left of `container-default`, not centred on the page. The remaining columns stay empty by declaration — this is a declared air column (`LUXURY_UX_MEDIA_SYSTEM.md` §3.7), not accidental space |
| **Tablet Behavior** | Same, `container-narrow` at the page gutter |
| **Mobile Behavior** | Full width, 52 px fields, submit in flow at the end |
| **Loading State** | Shared §5.0 |
| **Empty State** | n/a |
| **Error State** | `400 invalid_grant` renders **one non enumerating message**. It never distinguishes an unknown address from a wrong password, and it never confirms that an account exists. `429` human message plus retry |
| **Success State** | No success screen. Navigate directly to `resume_step` (§7.3), or to the surface the session expiry interrupted (§5.4) |
| **Resume State** | A visitor arriving with a valid session is redirected away from login |
| **Blocked State** | Shared §5.0 |
| **Connection State** | n/a |
| **Accessibility** | Shared §5.0, plus `autocomplete="email"` and `autocomplete="current-password"` |
| **Keyboard Behavior** | Shared §5.0 |
| **Focus Behavior** | Shared §5.0. Focus starts on the email field only when the page was reached deliberately, **never** when it was reached by a session expiry redirect, where focus goes to the explanatory message first |
| **Reduced Motion** | Shared §5.0 |
| **Performance** | The lightest authenticated route. No captcha unless the provider decision adds one |
| **Responsive Spacing** | Shared §5.0 |
| **Validation Presentation** | Shared §5.0. Format validation only. **No inline "account not found" ever** |
| **Status** | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING |

### 5.3 Logout

Closes gap 3. Contract: `POST {SUPABASE_URL}/auth/v1/logout` with Bearer, then clear the session.

| Field | Specification |
|---|---|
| **Page Purpose** | End the session deliberately and land somewhere honest |
| **Layout** | No page. A control in the account panel (§2.4) |
| **Information Hierarchy** | The control is the last item in the panel, separated by a 1 px hairline |
| **Desktop / Tablet Behavior** | Immediate. **No confirmation dialog** — signing out is reversible and a confirmation for a reversible action is friction theatre |
| **Mobile Behavior** | Same, as the last row of the account panel, 56 px tall |
| **Loading State** | The control locks with `aria-busy` for the duration. The panel stays open |
| **Empty State** | n/a |
| **Error State** | If the call fails, the **local session is cleared regardless** and the visitor lands on the public root with a `role="status"` message stating that the local session ended and that they should sign out on shared devices. Never a stuck signed in state |
| **Success State** | Navigate to the public root in the active locale. A `role="status"` confirmation is announced once |
| **Resume State** | n/a |
| **Blocked State** | n/a. Sign out is never blocked or disabled |
| **Connection State** | n/a |
| **Accessibility** | A real `<button>`. Announced result. Focus moves to the destination page's `h1` |
| **Keyboard Behavior** | Reachable inside the account panel; `Escape` closes the panel without signing out |
| **Focus Behavior** | Shared §5.0 |
| **Reduced Motion** | Shared §5.0 |
| **Performance** | One request. No route prefetch of authenticated pages after sign out |
| **Responsive Spacing** | Panel row padding `space-4` |
| **Validation Presentation** | n/a |
| **Status** | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING |

### 5.4 Session behaviour

Contract: short lived JWT, refresh token, refresh before expiry, on `401` refresh then retry once,
else route to login. Prefer `@supabase/ssr` with httpOnly cookies.

| Field | Specification |
|---|---|
| **Page Purpose** | Keep the agency signed in without surprising them, and fail visibly rather than silently |
| **Layout** | No dedicated surface except the **session expired state**, which is a full route state on `/[locale]/login` |
| **Information Hierarchy** | Session expired: `heading-l` explaining what happened → `body-m` stating that unsaved input on the previous surface was not kept → the login form |
| **Desktop / Tablet / Mobile Behavior** | Identical. Session handling is not responsive |
| **Loading State** | A refresh in flight **never** renders a spinner or blocks the interface. It is invisible unless it fails |
| **Empty State** | n/a |
| **Error State** | Refresh fails → clear the session, capture the current route, navigate to login with the expired message. **No modal. No interstitial. No countdown timer.** A dialog that traps a user out of their work is forbidden |
| **Success State** | Silent. After login, return to the captured route, not to the wizard index |
| **Resume State** | The captured route survives one login round trip only, and is discarded on any other navigation. It is never persisted beyond the session |
| **Blocked State** | n/a |
| **Connection State** | n/a |
| **Accessibility** | The expired message is `role="status"` and receives focus before the form (§5.2) |
| **Keyboard Behavior** | Shared §5.0 |
| **Focus Behavior** | As above |
| **Reduced Motion** | Shared §5.0 |
| **Performance** | Refresh is scheduled ahead of expiry, not polled. No timer runs while the tab is hidden; the session is validated once on `visibilitychange` to visible |
| **Responsive Spacing** | Shared §5.0 |
| **Validation Presentation** | n/a |
| **Multi tab** | Sign out in one tab ends the session in all tabs at the next navigation or fetch. The system does **not** force a live redirect in a background tab, which would discard work the user can still see |
| **Storage** | Session in httpOnly cookies via `@supabase/ssr`. **The JWT is not written to `localStorage`.** No session state, status value or entitlement is cached in `localStorage` — §5.0's resume rule forbids displaying a cached status |
| **Status** | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING |

---

## 6. Trial surfaces

### 6.1 Trial status banner

Closes gap 4. Contract: `GET {NUOVA_API_BASE}/trial/status` →
`{ status, plan, trial_end, days_left, account_state }`. Server side truth, **never computed
client side**.

| Field | Specification |
|---|---|
| **Page Purpose** | State the account's standing at all times without competing with the work |
| **Layout** | A single band directly beneath the header, inside `--shell-h`. Full bleed background `ink-900`, 1 px `border-hairline` top and bottom, inner `container-default`. Height **44 px** ≥ 768, **auto with a 44 px minimum** below. One line of text, left aligned; one Tertiary affordance, right aligned |
| **Information Hierarchy** | `body-s` statement `[COPY: trial.status.*]` carrying the remaining time, then the affordance. **No progress bar, no countdown ring, no "X days left" badge.** A trial is a date, not a game |
| **Desktop Behavior** | One line. Statement left, affordance right, both baseline aligned |
| **Tablet Behavior** | Same |
| **Mobile Behavior** | Statement wraps to at most two lines; the affordance moves beneath it, left aligned, still inside the band. The band **never** covers the primary action of the page beneath it, and it is not fixed on mobile — it scrolls away with the header. Safe area insets respected |
| **Loading State** | The band's height is reserved from first paint. It renders **nothing** until the status resolves — never a skeleton, because a skeleton implies content is coming and the correct outcome is often no band at all |
| **Empty State** | When `status` is `active`, no band renders and the reserved height collapses to zero before paint |
| **Error State** | `401` refresh once and retry. Any other failure renders **nothing**. The band never guesses, never shows a stale value, never shows a dash |
| **Success State** | n/a |
| **Resume State** | Re fetched on each authenticated navigation |
| **Blocked State** | n/a |
| **Connection State** | n/a |
| **Accessibility** | `role="status"` with `aria-live="polite"`. The remaining time is rendered as text; if a `<time>` element carries `trial_end`, its `datetime` attribute is the ISO value and the visible text is the agency facing form |
| **Keyboard Behavior** | The affordance is in the tab order immediately after the header |
| **Focus Behavior** | Shared §5.0 |
| **Reduced Motion** | No animation exists on this band in any state |
| **Performance** | One fetch per authenticated navigation, server rendered where possible so the band arrives with the page rather than after it |
| **Responsive Spacing** | Band padding `space-3` vertical ≥ 768, `space-4` below. Statement to affordance `space-8` |
| **Validation Presentation** | n/a |
| **Binding** | **The trial length is never hardcoded.** `days_left` and `trial_end` are rendered. The number 14 does not appear in source |
| **Status** | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING · wording OWNER DECISION PENDING (T-01) |

### 6.2 Trial reminder

Closes part of gap 4. **No reminder contract exists (MF-06).**

| Field | Specification |
|---|---|
| **Page Purpose** | Raise the banner's emphasis as the trial nears its end, without inventing a cadence |
| **Layout** | The §6.1 band, unchanged in structure |
| **Information Hierarchy** | Identical. Only the statement's wording and the affordance's level change |
| **Desktop / Tablet / Mobile Behavior** | Identical to §6.1 |
| **Loading / Empty / Error / Success / Resume / Blocked / Connection** | Identical to §6.1 |
| **Accessibility** | Identical. **The band's `role="status"` does not re announce on every navigation** — it announces on change of `status`, not on re render |
| **Keyboard / Focus / Reduced Motion / Performance / Spacing / Validation** | Identical to §6.1 |
| **The only permitted escalation** | The affordance rises from Tertiary to Secondary, and the statement's leading glyph changes to `clock` in `signal-attention`. **The band never changes colour, never becomes a full width alert, never becomes a modal, never becomes a repeated interstitial, and never blocks the page** |
| **What is NOT specified** | The threshold at which escalation occurs, and whether reminders are sent by the backend. **Blocked on MF-06.** Until supplied, the escalation exists in the design system but is not wired to any threshold, and no reminder is claimed to be sent |
| **Status** | Partially BACKEND CONFIRMED · **blocked on MF-06** |

### 6.3 Trial expiry

Closes gap 9. Contract: `status = trial_expired`; entitlement features resolve to `denied`.
**Login is never blocked.**

| Field | Specification |
|---|---|
| **Page Purpose** | State plainly that the trial ended, keep the account reachable, and offer the conversion route |
| **Layout** | Two surfaces. **(a)** The §6.1 band, with a Primary affordance — the one place the band carries a Primary. **(b)** On the wizard index and any denied surface, a plane at the top of the content: `ink-900`, 1 px `border-hairline`, `radius-md`, `container-default` width, `space-6` padding, a `heading-m`, one `body-m` line and one Primary plus one Tertiary |
| **Information Hierarchy** | State → consequence → route. Never consequence first |
| **Desktop Behavior** | The plane sits above the index, which remains fully visible and readable beneath it |
| **Tablet Behavior** | Same |
| **Mobile Behavior** | The plane is full container width, actions stacked full width, Primary first. **Never a modal, never a full screen takeover, never a dialog that traps** (matrix step 9) |
| **Loading State** | Reserved height for the plane |
| **Empty State** | n/a |
| **Error State** | Shared §5.0 |
| **Success State** | On successful conversion the plane is removed and the band collapses. No celebration |
| **Resume State** | The agency reaches every surface it could reach before. Read access to already entered configuration is never removed by expiry in the UI; whether the backend restricts it is the backend's decision and is reflected, not anticipated |
| **Blocked State** | A `denied` feature renders the §6.4 treatment, not this plane |
| **Connection State** | n/a |
| **Accessibility** | The plane is a labelled `<section>`, announced once via `role="status"` on first render of the expired state. Not on every navigation |
| **Keyboard Behavior** | The plane's actions are the first tab stops in `main` |
| **Focus Behavior** | Focus is **not** stolen on load. The plane is announced, not focused, because the agency may be arriving to do something else |
| **Reduced Motion** | No entrance animation on this plane in any state |
| **Performance** | Server rendered with the page |
| **Responsive Spacing** | Plane padding `space-6`, `space-5` below 640. Plane to content `space-10` |
| **Validation Presentation** | n/a |
| **Status** | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING · wording OWNER DECISION PENDING |

### 6.4 `denied` feature treatment

Contract: `GET /entitlements` → `features: { … : "enabled" | "deferred" | "denied" }`.

| State | Treatment |
|---|---|
| `enabled` | Normal |
| `deferred` | The `externally_pending` row treatment (§3.2). Available, not yet active. Never shown as enabled |
| `denied` | The `locked_by_plan` honest state (§3.2, `LUXURY_UX_MEDIA_SYSTEM.md` §5.9). **Never an error, never a crossed out row, never a greyed out row with no explanation** |

**BINDING:** the agency reads a plain capability name, never the entitlement key (§1.4). A denied
capability is present in the interface with its reason and its route, not hidden — hiding it makes
the plan difference invisible and the upgrade route undiscoverable.

---

## 7. The wizard shell

Closes gaps 5, 6, 7 and 17. Routes `/[locale]/onboarding` and `/[locale]/onboarding/[step]` —
**PROPOSED**. Contract: `GET /onboarding/state` → `{ percent_complete, resume_step,
completed_steps, total_steps, activatable, legend, steps[] }`;
`POST /onboarding/touch { step, action:"visit"|"skip" }`.

### 7.1 Architecture — a hairline index, not a card grid

**BINDING (constraint 1).** The wizard is one index built from `StatusRow` (§3.5), which is the
`PO-03` row pattern from `LUXURY_UX_MEDIA_SYSTEM.md` §9.3. Ten rows, 1 px hairlines between them,
one plane, no cards, no tiles, no panels, no grid, no shadows.

```
────────────────────────────────────────────────────────────────
 01   Account                                    ✓  Completed
      One line of detail                                        →
────────────────────────────────────────────────────────────────
 02   Agency details                             →  Needs action
      One line of detail                                        →
────────────────────────────────────────────────────────────────
 03   Branding                                   ◷  Pending
 │    Waiting on a provider                                     →
────────────────────────────────────────────────────────────────
```

*Structural illustration only. Labels come from `COPY_AND_CONVERSION_MASTER.md`. The left rule on
row 03 is the `externally_pending` marker from §3.2.*

**Row anatomy**

| Slot | Content | Type |
|---|---|---|
| Numeral | The step's position, tabular figures, two digits | `caption`, `text-muted` |
| Title | The step name | `heading-s`, `text-primary` (`text-secondary` when `completed` or `optional`) |
| Detail | One line from the projection's per step `detail` | `body-s`, `text-muted` |
| Status | Glyph plus label | `caption` |
| Affordance | `arrow-right`, 16 px | `text-muted`, `text-primary` on row hover or focus |

The **whole row is the control** — a single link to `/onboarding/[step]`. There is never a
separate button inside a row, which would create two tab stops for one destination.

**Row states:** hover and focus raise the surface to `ink-900` **and** add a 1 px
`border-interactive` left edge, because a surface step alone measures 1.04:1 and is not a boundary
(§2.1 rule 2).

### 7.2 Progress

**BINDING (constraint 8).** Progress is rendered from the projection, never computed.

- **One 1 px hairline rule**, full width of `container-default`, directly beneath the wizard's
  `h1`. Track `ink-700`. Fill `champagne-400` (6.39:1 against the track, a meaningful graphic
  above the 3:1 floor). Width is `percent_complete`.
- One `caption` line beneath it stating completed of total, rendered from `completed_steps` and
  `total_steps`. **The literal 10 does not appear in source** — the same rule as the trial's 14
  and the extension's 7.
- The rule animates its width over `motion-control` (200 ms) on change, and not at all on first
  paint. Reduced motion sets the width without transition.
- **No percentage number is displayed.** The rule carries the proportion; a number beside it is
  redundant precision that invites the agency to treat setup as a score.
- Forbidden: rings, donuts, segmented pills, step dots, per row percentages, a "you are 30 %
  there" message, and any progress representation inside a row.

**Accessibility:** the rule is a `role="progressbar"` with `aria-valuenow` from
`percent_complete`, `aria-valuemin="0"`, `aria-valuemax="100"` and an `aria-label` from the copy
document. The `caption` line is the visible text alternative and is not `aria-hidden`.

### 7.3 Resume

**BINDING.** Contract: `resume_step` from the projection; `POST /onboarding/touch` persists
position.

| Behaviour | Rule |
|---|---|
| After login | Navigate to `/onboarding/[resume_step]`, **never** to step 1, and **never** to the index unless `resume_step` is absent |
| After signup | Same, using the projection's `resume_step` |
| Entering the index directly | The index renders, and `resume_step`'s row is marked as the continuation point with a `StatusChip` reading as such. **The page does not auto navigate away from an explicit index request** |
| Entering a step | `POST /onboarding/touch { step, action:"visit" }` fires once on mount. Failure is silent to the agency; the step still renders |
| `403 forbidden` on `touch` | The step renders **read only** rather than failing the page (matrix step 6). A one line `StatusNote` states that changes require a different role. The role name comes from the copy document, never from the token |
| Skipping | `action:"skip"` is offered **only** on rows the projection marks `optional`. A skip is reversible: the row remains reachable and re enterable |
| Returning weeks later | Identical. There is no expiry on resume position, no "start over" prompt, and no wizard restart control anywhere |

### 7.4 Step page template

Every step page is the same shell. Only the step's own content differs.

| Zone | Desktop ≥ 1024 | Below 1024 |
|---|---|---|
| Shell | Header plus trial band, `--shell-h` reserved | Same |
| **Rail** | Columns 1 to 4. The full index as compact `StatusRow`s at 56 px, `position: sticky; top: calc(var(--shell-h) + 32px)`. The active row carries a 2 px `champagne-400` left border and `aria-current="step"` | **Not rendered.** The index is the parent route |
| **Sub header** | Not needed; the rail carries position | A 48 px sticky bar beneath the shell: back control (44 px, left), step position `caption` (centre left), progress hairline as the bar's bottom 1 px |
| **Plane** | Columns 5 to 12 (**4 / 8**, per `LUXURY_UX_MEDIA_SYSTEM.md` §3.7). `section-y-default` top padding | Full container width, `section-y-compact` top padding |
| Content | eyebrow (step position) → `display-m` h1 (the step name) → `body-l` lead, max 56 ch → the step's own content | Same, `display-m` at its mobile size |
| **Action row** | End of the plane. Primary plus Tertiary, left aligned, `space-12` above | §7.9 |

The rail and the index show the **same rows in the same order with the same statuses**. There is
one source, rendered at two densities.

### 7.5 Navigation between steps

**BINDING.** The wizard is **not linear**. Steps are independently re enterable, some are locked,
some are optional, and the backend model carries no ordering constraint beyond the numeral. A
`Previous / Next` pair would assert a sequence the contract does not have.

| Control | Behaviour |
|---|---|
| **Back** | Returns to `/[locale]/onboarding`, the index. Present on every step page. Browser back does the same, because the index is the parent route |
| **Forward** | The action row's Primary saves the step and returns to the index, where the next actionable row is marked. There is no "next step" that skips the index |
| **Continue affordance** | After a successful save, the success region offers one Tertiary route to the next actionable step, taken from the refreshed projection. It is an offer, never an automatic navigation |
| **Rail rows** | Direct navigation to any step whose row is not `locked_by_plan`. A locked row's control routes to the upgrade surface instead |
| **Forbidden** | Horizontal swipe carousels, step dots as navigation, wizard modals, a linear stepper that disables rows ahead, and any auto advance |

**Unsaved changes:** navigating away from a step with modified, unsaved fields raises the browser's
native `beforeunload` prompt for a full page exit, and an in app confirmation dialog for a client
side route change. The dialog is the **one** permitted dialog in the wizard: `radius-md`,
`ink-900`, `shadow-overlay`, focus trapped, `Escape` cancels, two actions (discard, keep editing),
never three.

### 7.6 Save state

**BINDING.** The contract has **no autosave endpoint**. Therefore:

- **Saving is explicit.** One Primary action per step. No autosave, and no autosave indicator —
  an indicator for behaviour that does not exist is a fabrication.
- `POST /onboarding/touch { action:"visit" }` on mount persists **position only**, not field
  values. It is not presented to the agency as a save.
- While saving: the Primary locks at fixed width with `aria-busy`, the form's fields become
  `readonly` rather than `disabled`, so their values stay announced and copyable.
- On success: the success region replaces the action row in the same reserved box, states what was
  saved, and offers the §7.5 continue affordance. The refreshed projection updates the rail.
- On failure: §4. The entered values are **never** discarded on a failed save.
- **Partial completion** (§7.8) is a server status, not a client draft. The website does not
  invent a "draft" state that the backend does not have.

### 7.7 Connection and provider states inside a step

Closes gap 15. This is the specification the report names as missing: the OAuth round trip.

**The outbound leg**

1. The agency activates a Secondary control on the provider's `StatusRow`.
2. The client calls `POST /connect/{provider}/start` (or the CRM or paid equivalent) and receives
   `{ authorize_url }`.
3. **Full page navigation**, not a popup. Popups are blocked by default on mobile, are hostile to
   screen readers, and lose the return context. The control's label states that the agency is
   leaving for the provider.
4. While the request is in flight the control locks at fixed width with `aria-busy`. If it fails,
   §4 applies and no navigation occurs.

**The inbound leg**

The provider returns to the **BFF callback** (handoff §5), which redirects the browser back to
the step. **The query parameter contract for that redirect is not specified in the handoff — see
AF-01.** Until it is supplied, the step's return handling is specified as a state machine over
four outcomes, and the parameter names are a single constant to be set when AF-01 arrives:

| Return outcome | Treatment |
|---|---|
| **Returned, connected** | The row re reads `GET /connect/{provider}/status`. On `connected` the row adopts the `connected` treatment and a `role="status"` message states what is now connected |
| **Returned, externally pending** (`202`) | `externally_pending` treatment with the left rule. A `StatusNote` names the provider being waited on — **provider display names are blocked on AF-04 / MF-11**. Until supplied the note states that an external approval is outstanding, without naming a party it cannot name |
| **Cancelled at the provider** | The row returns to its **previous** status unchanged. A `body-s` note states that nothing was connected and offers the control again. **Not an error.** No red, no `signal-critical` |
| **Provider returned an error** | `action_required` treatment. A `StatusNote` states that the provider refused, offers reconnect as a Secondary control, and offers the support affordance. **No provider error string is rendered** — it is unenumerated, may be in the wrong language, and may carry technical identifiers (§1.4) |

**Status refresh: the no polling rule (BINDING)**

The handoff does not define whether `GET /connect/{provider}/status` may be polled or at what
interval (**AF-02**). Inventing a cadence would put avoidable load on a production provider
integration, which the systems isolation directive forbids by intent.

Therefore:

- Status is read **on step entry** and **on return from the provider**. Nothing else.
- An explicit **Check again** Tertiary control re reads status on demand. It is rate limited
  client side to one call every 10 seconds, purely to prevent a stuck key repeat, and it states
  when it last checked.
- **No background polling. No interval. No websocket. No optimistic status.**
- When AF-02 supplies a supported cadence or a push channel, this rule is replaced without a
  layout change, because the row already reserves its dimensions.

**The five connection situations named in the brief**

| Situation | Status value | Treatment |
|---|---|---|
| **Connection pending** | `externally_pending` | §3.2 plus the left rule plus a `StatusNote` naming the provider when AF-04 allows |
| **Connection failed** | `action_required` | §3.2. Reconnect as a Secondary control. The support affordance. No raw provider string |
| **Reconnect** | — | A Secondary control on a row that is `degraded`, `action_required`, or previously connected. It repeats the outbound leg. It never silently reuses a stale authorisation |
| **Permission required** | `needs_action` when the agency's own role is insufficient (`403 forbidden`), rendered read only with a one line reason and the role that is required, in agency language |
| **Provider action required** | `action_required` | The action lives at the provider, not here. The `StatusNote` states that the agency must act in the provider's own interface, and offers **Check again**. The website never links to an invented provider URL (R7) |

### 7.8 Readiness, blockers and partial completion

Closes gap 7. Contract: the projection's `activatable` and `legend`; step 10 `ready`.

| Field | Specification |
|---|---|
| **Purpose** | State whether the tenant can be activated, and if not, exactly what remains |
| **Layout** | The `ready` step's plane. `heading-l` summary line → a hairline separated list of **outstanding items only** → the handoff action |
| **Readiness blocker** | Every row that prevents `activatable` renders as a `StatusRow` with its real status, its detail line and a route back to its step. **Blockers are the same rows as the index, filtered — not a second list with different wording** |
| **Partial completion** | When `activatable` is false, the summary states that setup is incomplete and lists what is outstanding. It never states a percentage, never a score, never "almost there", and never implies a deadline that does not exist |
| **`legend`** | The projection carries a `legend`. Its shape is **not specified (MF-05)**. It is rendered, when present, as a hairline separated `caption` list beneath the readiness list, one line per entry, using the §3 glyph set. When absent, nothing renders — no fallback legend is invented |
| **`optional` rows** | Never counted as blockers, never listed under readiness, and never presented as reducing completeness |
| **`externally_pending` rows** | Listed as outstanding. **Never as done.** The agency is told the item is waiting on an external party, so it does not read as their own inaction |
| **`locked_by_plan` rows** | Listed separately, beneath the blockers, under their own hairline, with the upgrade route. They are not failures |
| **Empty state** | When `activatable` is true and nothing is outstanding, the list is replaced by one `heading-m` line and the handoff action. **No celebration, no illustration, no badge** |
| **Everything else** | Shared §5.0 |
| **Status** | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING · `legend` blocked on MF-05 |

### 7.9 Mobile wizard at 375 px (BINDING — closes gap 17)

Composed for 375 px, not inferred from desktop. Verified at 320 px.

**The index route**

- Full width `StatusRow` list, one plane, hairlines between rows, **no cards**.
- Row minimum height **72 px**, vertical padding `space-4`, page gutter 20 px.
- Row layout: line one is numeral, then title, then the affordance right aligned. Line two is the
  status glyph plus label. Line three is the detail, clamped to two lines.
  **The status is on line two, above the fold of the row**, so it is never the thing that gets cut.
- The progress hairline and its `caption` sit beneath the `h1`, before the list.
- The whole row is one 72 px tap target. There is no nested control.

**The step route**

- The 48 px sticky sub header (§7.4) is the only sticky element besides the shell. Combined
  sticky height is capped at `--shell-h` + 48 px, which must not exceed **25 % of `100dvh`** at
  375 × 667. If a translation makes it exceed that, the sub header's position text truncates
  before the bar grows.
- Fields are 52 px, full width, labels above, `space-5` between fields.
- **The action row is `position: sticky; bottom: 0`** inside `env(safe-area-inset-bottom)`, on a
  solid `ink-900` band with a 1 px top hairline — and it **becomes static when the form has focus
  within** (`form:focus-within .action-row { position: static }`). This is the specific fix for the
  mobile keyboard covering the submit: while typing, the bar is in flow beneath the fields; when
  the keyboard closes, it returns to the bottom. It removes the `100dvh` fight entirely.
- The Primary is full width. The Tertiary back sits above it, left aligned, 44 px tall.
- On save success the success region replaces the action row in place, at the same reserved
  height, and receives focus.

**Forbidden on mobile:** a bottom tab bar, a floating action button, a step carousel, swipe
navigation, a collapsed rail as a horizontally scrolling chip strip, and any element that
overlaps a form field.

### 7.10 Wizard shell, remaining fields

| Field | Specification |
|---|---|
| **Page Purpose** | Take an agency from a new account to an activatable tenant, without ever misrepresenting where it stands |
| **Information Hierarchy** | `display-m` h1 → progress hairline → `caption` completed of total → index. Nothing else above the list |
| **Desktop Behavior** | Index route: `container-default`, single plane, full width rows. Step route: 4 / 8 with the sticky rail |
| **Tablet Behavior** | 768 to 1023: index unchanged; step route drops the rail and adopts the sub header, but keeps `container-default` and desktop type sizes |
| **Loading State** | The step list renders as skeleton rows **at the exact 72 px row height**, same count as `total_steps` once known, and as a single reserved block before that. Never a spinner over the whole page |
| **Empty State** | Cannot occur. The projection always returns steps. If it returns none, the surface state is an error, not an empty state |
| **Error State** | A failed projection fetch renders the route's error state with a retry. **The index is never rendered with guessed or partial statuses** |
| **Success State** | n/a at shell level |
| **Resume State** | §7.3 |
| **Blocked State** | §7.7 permission required; `locked_by_plan` rows per §3.2 |
| **Connection State** | §7.7 |
| **Accessibility** | The index is an `<ol>`; each row is one link containing the title, the status label and the detail as its accessible name, composed so a screen reader hears the step, its state and its detail in that order. `aria-current="step"` on the rail's active row. The progress rule per §7.2 |
| **Keyboard Behavior** | Tab moves row to row, one stop per row. `Enter` opens. The rail and the plane are two landmarks; a skip link jumps past the rail to the plane |
| **Focus Behavior** | Returning from a step to the index moves focus to **the row just left**, not to the top of the page |
| **Reduced Motion** | The progress rule sets width without transition. Status changes are instantaneous. No row reveal animation at all — the index renders complete |
| **Performance** | Server rendered from one projection fetch. The rail and the index share one component. The step routes share one client chunk. `content-visibility` is **not** used on the index, because every row is above the fold on desktop and the reserved heights are small |
| **Responsive Spacing** | h1 to progress `space-6`; progress to caption `space-3`; caption to list `space-10`; list to page end `section-y-default` |
| **Validation Presentation** | Shell level: none. Per step: shared §5.0 |
| **Status** | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING · blocked on MF-05 |

---

## 8. The ten steps

Shared properties, stated once. Each step's table lists only what differs. All twenty fields are
therefore defined for every step: those not listed take the value below.

**Shared for all ten:** Layout, Desktop, Tablet and Mobile behaviour per §7.4 and §7.9 · every
field in **Shared §5.0** · Connection State per §3 and §7.7 · Resume State per §7.3 · Save per
§7.6 · Blocked State per §3.2 for `locked_by_plan` and §7.7 for permission · Status
**BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING · END TO END VERIFICATION PENDING** · Legal
L-07 and L-14 throughout.

### 8.1 `account`

| Field | Specification |
|---|---|
| **Page Purpose** | Confirm the owner's own contact identity. `completed` when a contact email is present |
| **Information Hierarchy** | h1 → lead → three fields → action row |
| **Empty State** | Pre populated from signup. A blank state means the projection disagrees with signup and is surfaced as such, not silently blanked |
| **Validation Presentation** | Email format on blur. Language selection blocked on MF-09 (§5.1) |
| **Performance** | No fetch beyond the projection |

### 8.2 `agency`

| Field | Specification |
|---|---|
| **Page Purpose** | The agency's own particulars: company name, website, address, phone, legal and footer details, preferred languages. `completed` at name plus timezone |
| **Information Hierarchy** | h1 → lead → **three field groups separated by hairlines**: identity, contact, operating. Never one undifferentiated column of eleven fields |
| **Empty State** | All fields empty is the normal first state and needs no explanatory copy |
| **Validation Presentation** | Website accepts a bare host and normalises for display; it never rejects a valid address for missing a scheme. Phone uses `inputmode="tel"` with no format enforcement, because the market is international. Address is free form; **no address autocomplete third party is introduced** |
| **Accessibility** | Each group is a `<fieldset>` with a `<legend>` at `heading-s` |
| **Performance** | The timezone control is a native `<select>` populated from the platform's own list. No third party library |

### 8.3 `branding`

Uploads. See §9 for the full upload law.

| Field | Specification |
|---|---|
| **Page Purpose** | Logo, email banner, and footer or signature. `completed` when branding is configured |
| **Information Hierarchy** | h1 → lead → three upload blocks separated by hairlines, each: `heading-s` label, one `body-s` line stating where the asset appears, the upload zone or the current asset, and the replace and remove controls |
| **Empty State** | Each block shows its upload zone. **No placeholder logo, no sample banner, no preview of a fictional email** (§1.3 rule 1) |
| **Error State** | `400 unsupported_file_type`, `400 file_too_large`, `403 cross_tenant_asset`, `422 upload_not_found` per §9.6. Limits are **blocked on MF-07**, so the stated constraint text is a single constant, and client side pre validation is **not** performed against invented limits |
| **Blocked State** | **The `kind` value for footer or signature is absent from the contract (AF-03).** `POST /branding/upload-init` enumerates `"logo" \| "email_banner"` only. The footer or signature block is therefore specified in full and rendered in the §5.9 honest state until AF-03 is supplied. It is not wired to a guessed `kind` |
| **Validation Presentation** | §9.5 |
| **Performance** | The signed upload URL is minted by the BFF; the browser uploads directly to it. Previews are rendered from the committed `stored_url`, never from a client side object URL after commit |
| **Status** | BACKEND CONFIRMED for logo and banner · **footer or signature BLOCKED on AF-03** · limits blocked on MF-07 |

### 8.4 `team`

| Field | Specification |
|---|---|
| **Page Purpose** | Invite employees and assign a role. `completed` at one or more active employees |
| **Information Hierarchy** | h1 → lead → the invited list → the invite form → action row. **The list comes first** so a returning agency sees state before a form |
| **Roles** | Four, from the contract: `agent`, `team_lead`, `office_manager`, `agency_admin`. Rendered as a native `<select>` with agency facing names from the copy document and one `caption` line describing the selected role's scope. **Never the raw token** (§1.4) |
| **Empty State** | One `heading-m` line and the invite form. No sample teammate, no placeholder avatar row |
| **Error State** | `403 forbidden` renders the whole step read only with the reason. `403 employee_cross_tenant` is treated as a defect per §4.1 with no detail echoed. `409` states that the address is already invited and offers no destructive action |
| **Success State** | The invited row appears in the list with status `externally_pending` until the projection reports an active employee. **An invitation is not a member** |
| **Blocked State** | `office_id` is optional in the contract, but **no endpoint returns the agency's offices (AF-05)**. The office control is therefore not rendered until AF-05 is supplied; the field is omitted rather than shown empty |
| **Accessibility** | The list is a `<table>` with a caption, or an `<ul>` of `StatusRow`s. Role is announced with the name, never the token |
| **Validation Presentation** | Email format on blur. Duplicate detection is server side only; the client does not pre check against a list it cannot see |

### 8.5 `communication`

| Field | Specification |
|---|---|
| **Page Purpose** | Connect email, WhatsApp and Meta, calendar, and voice where entitled |
| **Information Hierarchy** | h1 → lead → four provider `StatusRow`s, hairline separated, each with its status, one detail line and its control |
| **Connection State** | §7.7 in full. `externally_pending` during WhatsApp and Meta verification, with the left rule |
| **Blocked State** | Voice unentitled renders `locked_by_plan` with the upgrade route. `403 not_on_plan` is **never** an error (§4.1). **Connecting a voice channel is not evidence of voice AI capability**; no wording on this surface may imply one (matrix 4.4, V-01 unchanged) |
| **Empty State** | Four rows, all `needs_action`. That is a full state, not an empty one |
| **Error State** | §7.7 provider error handling. Named mailbox providers remain forbidden in public claims; inside the authenticated tree the provider name is rendered only when AF-04 supplies the display list |
| **Accessibility** | Each row's accessible name carries provider, status and detail in that order |
| **Performance** | One status read per provider on entry. **No polling** (§7.7) |

### 8.6 `lead_acquisition`

| Field | Specification |
|---|---|
| **Page Purpose** | Connect paid acquisition intake. `completed` when a channel is ready |
| **Information Hierarchy** | h1 → lead → three `StatusRow`s: Google Lead Forms, Meta Lead Ads, click to WhatsApp |
| **Connection State** | **`connected` and `ready` are two different things and render differently** (matrix step 6.6). A channel that is `connected` but not `ready` renders `externally_pending` with a `StatusNote`, never `connected`, never a check |
| **Blocked State** | Unentitled renders `locked_by_plan`. Social is entitlement keyed only; **no platform is named anywhere**, because the handoff names none (matrix 4.8) |
| **Empty State** | Three rows in their real statuses |
| **Validation Presentation** | The connect payload carries provider display references. They are free text to the website and are validated only for presence, never for shape, because no shape is specified |
| **Legal** | Click to WhatsApp attribution carries L-08 |

### 8.7 `crm`

| Field | Specification |
|---|---|
| **Page Purpose** | Confirm the CRM. **Nuova's universal CRM is the default and is `completed` with no action.** An external CRM is optional |
| **Information Hierarchy** | h1 → lead → **two blocks, hairline separated**: the default, already complete, stated first; then the external option beneath it. Never a side by side choice, which would imply the default is one of two equal options rather than the standing state |
| **Empty State** | Cannot occur. The default is always present |
| **Connection State** | External CRM: `externally_pending` until authorised, then `connected`. `424 degraded` renders the `degraded` treatment: the row states connected **and** degraded, with the recommended action. `action_required` surfaces the problem in agency language |
| **Blocked State** | **Vendor names are OWNER DECISION PENDING (owner decision 5) and vendor logos are BLOCKED.** Until decision 5, the provider list from `GET /crm/providers` renders `display_name` as plain text with **no logo, no icon, no brand colour**. If decision 5 forbids naming, the list renders as a single honest state routing to a conversation |
| **`action_required` detail** | `mapping_validation.missing_api_names[]` is a list of provider API field names. **These are technical identifiers and are never rendered** (§1.4, invariant 6). The row states that fields the CRM previously provided are no longer available and that the connection needs attention. The raw names are available **only** inside the support affordance, alongside `request_id`, for a support conversation |
| **Salesforce environment** | The contract carries `environment?: "prod" \| "sandbox"`. Rendered as a native `<select>` of two agency facing labels. **Sandbox is never the default** and selecting it states plainly that it connects a test environment |
| **Accessibility** | The `degraded` row announces both facts. A single word status would misrepresent it |

### 8.8 `property_source`

| Field | Specification |
|---|---|
| **Page Purpose** | Establish where property inventory comes from |
| **Information Hierarchy** | h1 → lead → four options as hairline separated rows: agency website, supported feed, CRM inventory, other authorised source |
| **BINDING presentation** | **The agency's own website is a first class option and is listed first.** It is never labelled as a fallback, a workaround, a legacy path or a lesser option, and no wording may suggest that scraping the agency's own inventory is inferior (matrix 3.8, handoff §3 step 8) |
| **Empty State** | Four options, none selected |
| **Error State** | `400 invalid_source` is a field level error on the URL or feed field. `403 source_not_authorized` is a surface level honest state explaining that the source needs authorisation, with a route to a conversation — **not** a red error |
| **Validation Presentation** | URL and feed fields accept a bare host and normalise. No liveness check is performed by the browser; the website never fetches an agency's site to validate it |
| **Connection State** | `GET /property-source/status` on entry. No polling |
| **Legal** | The F-02 qualifier applies to any public wording derived from this step |

### 8.9 `property_experience`

| Field | Specification |
|---|---|
| **Page Purpose** | Surface the Property Experience entry state. `GET /px/entry` → `{ entitled, state:"available" \| "locked_addon", action }` |
| **Information Hierarchy** | h1 → lead → one `StatusRow` carrying the entry state and its route |
| **BINDING scope limit** | **The 3D room based capture wizard belongs to the PX lane. This website links to it and must not rebuild it** (handoff §3 step 9, matrix 2.6 item 6.4). No capture interface, no panorama viewer, no floor plan editor and no asset pipeline is specified here or built here |
| **Blocked State** | `locked_addon` renders `locked_by_plan` with the upgrade route. **Never an error, never a crossed out row** |
| **Empty State** | One row. There is no list to be empty |
| **Uploads** | **No Property Experience asset upload is specified in the contract (AF-06).** Any such upload belongs to the PX lane. The website specifies no upload surface for it. §9 applies only if and when a contract exists |
| **Claims** | K-01 to K-12 keep their existing verdicts; **K-05 is LEGAL REVIEW PENDING**. No capability wording on this surface beyond the entry state |

### 8.10 `ready`

Specified in full at §7.8.

| Field | Specification |
|---|---|
| **Page Purpose** | State readiness and hand off |
| **Success State** | When `activatable` is true, one `heading-m` line and the handoff action. No celebration (§1.2 item 21) |
| **Blocked State** | **The dashboard destination is BLOCKED on MF-03.** Until the owner supplies a URL, a route, or a statement that the dashboard is inside this website, the handoff action renders in the §5.9 honest state, states that the next step is being prepared, and offers a real alternative path. **No invented destination, no placeholder URL, no dead control** (R7) |

---

## 9. File upload law (application)

The global component law is added to `LUXURY_UX_MEDIA_SYSTEM.md` §5.16. This section states how it
applies, and where it may not be used at all.

### 9.1 Where uploads exist

| Asset | Contract | Status |
|---|---|---|
| **Logo** | `kind:"logo"` | BACKEND CONFIRMED · limits blocked on MF-07 |
| **Email banner** | `kind:"email_banner"` | BACKEND CONFIRMED · limits blocked on MF-07 |
| **Footer or signature** | **no `kind` value in the contract** | **BLOCKED on AF-03.** Surface specified, rendered as an honest state, not wired |
| **Property files** | **no upload contract exists** | **BLOCKED on AF-06.** No surface is built |
| **Property Experience assets** | owned by the PX lane | **Out of scope.** No surface is built (§8.9) |
| **Testimonial files** | **no media field in the contract (MF-01)** | **BLOCKED · LEGAL REVIEW PENDING (L-13).** See §11 |

**BINDING:** an upload surface is never built ahead of its contract. A drop zone that cannot
commit is a dead control and a P0 finding under `MASTER_GOVERNANCE.md` §6.

### 9.2 The three phase model

The contract is a three call sequence, and the UI mirrors it exactly:

1. `POST /branding/upload-init { kind, filename, content_type, size_bytes }` →
   `{ object_path, signed_upload_url }`
2. The browser uploads the file to the signed URL.
3. `POST /branding/commit { kind, object_path }` → `{ ok, stored_url, preview }`

**Binding:** the asset is not shown as stored until phase 3 returns. A completed phase 2 renders
as in progress, never as done — the same principle as `externally_pending`. `object_path` is a
storage identifier and is **never displayed** (§1.4).

### 9.3 Upload zone

- One rectangular zone, `radius-sm`, 1 px **dashed** `ink-400` on dark (4.12:1) or `ink-350` on
  ivory. Dashed is reserved for this one component so it reads as a receptacle.
- Height fixed per asset kind, at the **rendered aspect ratio of the asset itself** so the zone
  and the eventual preview occupy the same box and the swap costs zero layout shift.
- Contents: one `body-s` instruction, one `caption` constraint line, and a Secondary **Choose
  file** button. The button is the accessible control; the zone is an enhancement.
- Drag and drop is an enhancement only. A visible, keyboard reachable file input control always
  exists (WCAG 2.2 dragging movements).
- Drag over state: the border becomes solid and the surface steps up. **No scaling, no colour
  wash, no animation.**

### 9.4 Progress, preview, replace, remove

| State | Specification |
|---|---|
| **Upload progress** | A 1 px hairline progress rule along the **bottom edge of the zone**, `champagne-400` on `ink-700` — the same progress language as the wizard (§7.2). `role="progressbar"` with a live percentage in an `aria-live="polite"` region that updates at most every 10 %. **No percentage text on the zone**, no circular meter, no per file card |
| **Cancel** | A Tertiary cancel is available for the whole upload. Cancelling returns the zone to its empty state and states that nothing was stored |
| **Preview** | After commit, the zone is replaced **in the same box** by the asset rendered from `stored_url` at its true aspect ratio, inside a 1 px `border-strong` frame, `radius-0`, no shadow. Beneath it: one `caption` line with the file's own name as supplied by the agency |
| **Contrast preview** | A logo will be placed on both canvases. The preview therefore shows the asset on `ink-950` **and** on `ivory`, side by side ≥ 640 px and stacked below, each 1 px framed. This is the one preview affordance that earns its space, because a logo that is invisible on one canvas is a real failure the agency must see |
| **Replace** | A Secondary control beneath the preview. It reopens the same three phase sequence. The existing asset stays visible until the new one commits — **there is no intermediate empty state** |
| **Remove** | A Tertiary control. It opens the wizard's single permitted confirmation dialog (§7.5) stating what will stop appearing where. On confirm, `POST /branding/remove { kind }`. On success the zone returns to empty in the same box |
| **Failure after removal** | If removal fails, the asset is still shown. The UI never optimistically renders a removal that did not happen |

### 9.5 Validation presentation

- Constraints are stated **before** selection, in the zone's `caption` line.
- **Accepted types and the size ceiling are blocked on MF-07.** Until supplied: the `accept`
  attribute and the constraint line are a single named constant, and the client performs **no
  size or type rejection of its own**. Inventing a limit would produce a client rejection the
  server would have accepted, which is a fabricated rule.
- Server rejections map per §4: `400 unsupported_file_type` and `400 file_too_large` are field
  level errors on the zone, stating the real constraint from the response, with the zone still
  mounted and the control still usable.
- `403 cross_tenant_asset` is treated as a defect (§4.1): a generic failure plus the support
  affordance, with no detail echoed.
- `422 upload_not_found` states that the transfer did not complete and offers the upload again.
- **No file is ever silently dropped.** Every rejected file produces a visible, attributable
  message.

### 9.6 Accessibility and performance

| Aspect | Rule |
|---|---|
| Control | A real `<input type="file">`, visually replaced but focusable, with a `<label>`. The zone carries `aria-describedby` to the constraint line |
| Announcements | Selection, progress milestones, success and failure announced via one `aria-live="polite"` region per zone. Never `assertive` |
| Keyboard | The button is reachable and activates the picker. Cancel, replace and remove are all keyboard operable. Drag and drop is never the only path |
| Focus | After commit, focus moves to the preview's replace control. After removal, back to the zone's button |
| Reduced motion | The progress rule updates without transition. No drag over animation |
| Performance | The file is uploaded directly to the signed URL, never proxied through the page. No client side image processing, no canvas resize, no cropping tool — cropping would alter an asset the agency supplied |
| Privacy | The file name is agency supplied content and is rendered as given, escaped. It is not used to construct any path shown to the agency |

---

## 10. Plans, subscription, checkout and upgrade

Closes gap 11. Route `/[locale]/account/plan` — **PROPOSED**. Contracts: `GET /plans`,
`GET /subscription/state`, `POST /checkout/session { plan_code }` → `{ checkout_url }`.

| Field | Specification |
|---|---|
| **Page Purpose** | Show the current standing and, where a change is possible, route to checkout. This is **not** the public pricing page and does not repeat its argument |
| **Layout** | `ivory`. `container-default`. **Two zones, hairline separated**: current standing first, then available plans |
| **Information Hierarchy** | `display-m` h1 → current standing block → the plans plane → a `caption` line on tax basis |
| **Current standing** | A single bordered block, `radius-md`, `paper`: current plan name from `subscription/state`, its state as a `StatusChip`, and — when `cancel_at_period_end` is true — one plain line stating that fact. **No countdown, no urgency device, no retention interstitial** |
| **Plans plane** | `LUXURY_UX_MEDIA_SYSTEM.md` §5.7 **Layout A**: one bordered plane, `radius-0`, divided by vertical hairlines. The current plan's column is marked by a 2 px `champagne-400` top rule and `aria-current`. **Not three cards** |
| **Prices** | `price_display` is **rendered exactly as served**. The website never formats, converts, rounds, abbreviates or recomputes it, and never authors a figure. Currency and tax basis are **blocked on MF-10**; until supplied, the tax line is a single constant and no assumption is printed |
| **Quotas and limits** | **Nothing.** PK-05 is unresolved and matrix 5.6 forbids not only numbers but any visual implication of one: no bars, no dots, no "up to", no comparative column heights |
| **Desktop Behavior** | Standing block full width; plans plane full `container-default` width, columns equal in width and **equal in height by grid, not by content** |
| **Tablet Behavior** | Same, columns may reduce to two per row with a hairline between rows |
| **Mobile Behavior** | **Never a horizontally scrolling price table.** The plane becomes a vertical stack of plan sections, each with its own inclusion list, hairline separated. The current plan's section is first |
| **Loading State** | Price cells have reserved height so nothing shifts when `/plans` resolves. The standing block reserves its height |
| **Empty State** | If `/plans` returns none, the surface states that plan information is unavailable and routes to a conversation. It does not render an empty plane |
| **Error State** | `403 not_allowed` renders the honest state, not an error. **`409 already_subscribed` routes to the current plan and is not an error** (matrix step 13). `5xx` per §4 |
| **Success State** | Checkout is a **handoff**: on `{ checkout_url }` the browser navigates away, full page. Before navigating, the control states that the agency is leaving to complete payment. **The website never renders a payment form, never collects a card, and never embeds a payment iframe** |
| **Resume State** | Returning from checkout re reads `GET /subscription/state`. **The website never infers success from the return URL.** Until the state changes server side, the standing block shows the previous state, with no optimistic upgrade |
| **Blocked State** | Until the owner releases the action, the plan controls render as §5.9 honest states routing to a conversation |
| **Connection State** | n/a |
| **Accessibility** | The plane is a `<table>` with real headers, or a list of `<section>`s with headings — never a div grid. `aria-current="true"` on the current plan. The tax line is associated with the plane via `aria-describedby` |
| **Keyboard Behavior** | One tab stop per plan action. No roving grid |
| **Focus Behavior** | Shared §5.0 |
| **Reduced Motion** | No plan comparison animation exists in any state |
| **Performance** | `GET /plans` is public and cacheable; the two authenticated reads are not |
| **Responsive Spacing** | Standing block to plane `space-16`; plane to tax line `space-6` |
| **Validation Presentation** | Selection is a single control per plan. No form, no validation |
| **Upgrade entry points** | Exactly three, all routing here: the `locked_by_plan` row affordance, the `denied` feature treatment, and the trial expired plane. **No upsell appears anywhere else** — not in the wizard header, not in the banner, not between steps |
| **Status** | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING · OWNER DECISION PENDING on PK-02, PK-04, PK-05, PK-07 and MF-10 |

---

## 11. Testimonial, pending review and the extension

Closes gap 10. Route `/[locale]/account/testimonial` — **PROPOSED**, authenticated only.

> **LEGAL REVIEW PENDING (L-13). DISABLED FOR PUBLIC DISPLAY.**
> **BLOCKED on MF-01** (no media field in the contract) **and MF-12** (Bearer only, or also
> public plus captcha). This surface is specified so it can be built once cleared. **It is not
> linked from any public page, it is not linked from the marketing navigation, and no testimonial
> mechanic is released publicly in this wave.**

| Field | Specification |
|---|---|
| **Page Purpose** | Let a signed in agency submit feedback, and show its review state honestly |
| **Layout** | `ivory`, `container-narrow`, left aligned |
| **Information Hierarchy** | h1 → lead → **the current state first** if one exists → the form → the consent control → the privacy line |
| **Desktop / Tablet / Mobile Behavior** | Single column at every breakpoint; 52 px fields below 640 |
| **Loading State** | Shared §5.0. `GET /testimonial/status` resolves before the form renders, so a submitted agency never sees a blank form first |
| **Empty State** | The form, with no state block above it |
| **Error State** | **`422 consent_required` is a field level error on an explicit consent control.** The consent control is never pre ticked, never a soft opt out, and never bundled with another agreement. `429` per §4 |
| **Success State** | **Only: received, pending review.** No wording, in either language, may imply that an extension has been granted, is likely, or is automatic (`PRODUCT_TRUTH.md` §18.5, matrix step 11) |
| **Resume State** | Re entry shows the current `state`, never a blank form. `pending` renders the `externally_pending` treatment. `approved` and `rejected` render their own states, and **neither states a consequence the website is not authorised to state** |
| **Blocked State** | Until L-13 clears and the owner releases the action, the submit renders in the §5.9 honest state |
| **Connection State** | `pending` uses `externally_pending` (§3.2) — waiting on a human review, which is exactly what that value means |
| **Media** | **No file input is rendered.** MF-01: the contract has no media field. A video upload control without a contract is a dead control. §9.1 applies |
| **Accessibility** | Rating is a real `<fieldset>` of radio inputs with visible labels, never a star widget without text. Consent is a single checkbox with a full sentence label |
| **Keyboard / Focus / Reduced Motion** | Shared §5.0 |
| **Performance** | One read, one write |
| **Responsive Spacing** | Shared §5.0 |
| **Validation Presentation** | Consent is required and stated as such. Quote length limits are not enforced client side, because none is specified |
| **The plus 7 days** | **The website has no approval surface and must not build one** (matrix step 12). It never grants, never computes and **never hardcodes 7**. When approval happens, the agency sees the new `trial_end` through the §6.1 band, and nowhere else. There is no "extension granted" screen, because the website is not the system that granted it |
| **Legal** | L-13. Incentivised testimonials, personal data, purpose limitation, retention and later marketing use are separate consents. Contract terms belong in terms and conditions, not in this surface's copy |
| **Status** | BACKEND CONFIRMED · **LEGAL REVIEW PENDING, DISABLED** · BLOCKED on MF-01, MF-12 |

---

## 12. RESERVED and PROPOSED surfaces

Per handoff §10 and matrix 2.8. **None of these ships in this wave. None is wired. None accepts
input.**

| Item | Status | Specified as | Forbidden |
|---|---|---|---|
| **Voice sales concierge** (`POST /sales-bot/turn`) | **RESERVED** | Documented here only. **No surface appears on any page.** When released it takes the §5.9 honest state as its first state | Any live behaviour, any availability implication, any present tense wording, any floating launcher |
| **WhatsApp sales concierge** (same reserved endpoint) | **RESERVED** | Same | Same |
| **Website chat assistant** | **RESERVED** | **Decision: omitted from every page in this wave.** Matrix 8.3 permits either a designed pending panel offering *Book a demo*, or omission. Omission is chosen because a pending panel occupies persistent screen area to deliver a route that the header already carries | **A launcher that accepts input and never answers is a P0 finding.** No bubble, no badge, no proactive open |
| **Demo booking backend** (`POST /demo/book`) | **PROPOSED** | The shape is documented in the handoff. **Not implemented, not typed as real, not wired** | Treating it as live; making it a prerequisite to starting a trial |
| **Cal.com demo booking** | Existing external option | A real `href` with progressive enhancement (audit A-02). The embed intercepts an anchor that already carries the real booking URL | A duration or outcome promise; `href="#"` plus `preventDefault()` |
| **NuovaSolution business WhatsApp CTA** | **BLOCKED** | Nothing. No number exists and none may be invented (R7, C-05) | Any WhatsApp CTA anywhere |
| **`Talk to Nuova`** | **BLOCKED, retired** | Nothing | Using the label at all |

`CLAUDE.md`'s "CHATBOT / ASSISTANT EXPERIENCE" section cannot be honoured and is already listed
for replacement in `LUXURY_UX_MEDIA_SYSTEM.md` §12.1 item 9.

---

## 13. Analytics event register

Names only, taken from `INTEGRATION_COMPATIBILITY_MATRIX.md` §4. **No event fires until its
surface is released in the activation register**, and any event beyond cookieless measurement
requires a consent layer first (audit §13).

| Surface | Events |
|---|---|
| Signup | `signup_form_open`, `signup_form_submit`, `signup_form_success`, `signup_form_error` |
| Login | `nav_login_click`, `login_submit`, `login_success`, `login_error` |
| Trial | `trial_status_view`, `trial_reminder_view`, `trial_expired_view`, `trial_expired_cta_click`, `trial_extended_view` |
| Wizard shell | `onboarding_open`, `onboarding_step_view`, `onboarding_step_skip`, `onboarding_progress` |
| Steps | `onboarding_account_*`, `onboarding_agency_*`, `branding_upload_*`, `branding_commit_*`, `branding_remove`, `team_invite_*`, `connect_start`, `connect_return`, `connect_status_poll`, `paid_connect_*`, `paid_status_view`, `crm_provider_select`, `crm_connect_*`, `crm_health_view`, `property_source_select`, `property_source_connect_*`, `px_entry_view`, `px_upgrade_click`, `onboarding_ready_view`, `dashboard_handoff_click` |
| Plans | `pricing_view`, `pricing_package_select`, `pricing_checkout_start`, `pricing_checkout_error` |
| Testimonial | `testimonial_open`, `testimonial_submit`, `testimonial_success`, `testimonial_error`, `testimonial_status_view` |

**No event payload carries a technical identifier, an email address, a file name, an agency
identifier or any provider reference.** `connect_status_poll` is named in the matrix; under the no
polling rule (§7.7) it fires only on an explicit **Check again**.

---

## 14. Verification checklist for the authenticated tree

Additional to `MASTER_GOVERNANCE.md` §7's nine steps. Every item is verified before any
authenticated phase closes.

1. No fabricated agency data anywhere, in any state, including empty states.
2. `externally_pending` renders with the clock glyph, the pending label and the left rule, and
   never with a check, positive colour or a completed row treatment.
3. All eight status values render as glyph plus text plus colour, and remain distinguishable in
   greyscale.
4. `locked_by_plan` and `403 not_on_plan` render as honest states, never as errors.
5. No technical identifier reaches the DOM. The §1.4 grep returns nothing.
6. The literals `7`, `10` and `14` do not appear as trial length, step count or extension length
   anywhere in source.
7. `percent_complete` is rendered, never computed.
8. Resume lands on `resume_step`.
9. Every async region's reserved height matches its tallest real state; CLS measured at 375 px
   and 1440 px.
10. The wizard renders as one hairline index. No card, tile or panel per step.
11. Mobile wizard verified at 375 px **and** 320 px, with the on screen keyboard open, on the
    longest Spanish strings.
12. Every form obeys `LUXURY_UX_MEDIA_SYSTEM.md` §5.6 including the reserved height rule.
13. No control that looks active and does nothing.
14. No polling of any provider status endpoint.
15. No surface is publicly reachable, and the testimonial surface is not linked from any public
    page.
16. Focus never obscured by `--shell-h`; verified at every breakpoint.
17. The §1.3 and §1.2 anti pattern lists pass against every new surface.

---

## 15. What could not be specified, and why

| # | Item | Reason |
|---|---|---|
| 1 | The dashboard, and everything after the wizard | **MF-03 / C-27.** The website does not know whether it is building a marketing site plus a wizard that hands off, or the whole authenticated application. This is the largest open question in the project |
| 2 | Error copy per `code` | **MF-04.** Only HTTP statuses exist, so error treatment is specified per status |
| 3 | The per step content of `steps[].detail` and the `legend` | **MF-05.** The rendering shell is specified; what fills each row's detail line is not |
| 4 | Trial reminder thresholds | **MF-06.** The escalation is specified; the trigger is not |
| 5 | Upload accepted types and size ceiling | **MF-07.** The upload law is specified; client side pre validation is deliberately absent |
| 6 | The captcha widget's dimensions and its non visual alternative | **MF-08.** The reservation is a named constant |
| 7 | The `language` control on signup | **MF-09.** Not rendered; the route's locale is used |
| 8 | Currency, tax basis, and whether `name` is the public plan name | **MF-10.** `price_display` is rendered verbatim |
| 9 | Provider display names for pending copy | **MF-11 / AF-04** |
| 10 | Testimonial media, and whether the surface is authenticated only | **MF-01, MF-12** |
| 11 | The OAuth return parameter contract | **AF-01** |
| 12 | Whether provider status may be polled, and how | **AF-02.** The no polling rule is the safe interim |
| 13 | The `kind` value for footer or signature | **AF-03** |
| 14 | The office list for team invites | **AF-05** |
| 15 | Property file and Property Experience asset uploads | **AF-06.** No contract; PX capture belongs to the PX lane |

### 15.1 New missing fields found by this chat

Named precisely, for the backend export-v2. Prefixed `AF` so they do not collide with the frozen
`MF` register in `FINAL_RECONCILIATION_REPORT.md` §9.

| ID | Missing field | Blocks |
|---|---|---|
| **AF-01** | The query parameter contract the BFF OAuth callback appends when it redirects the browser back to the step: the parameter names and the value set for returned, cancelled and provider error. | Every provider connection return state (§7.7) |
| **AF-02** | Whether `GET /connect/{provider}/status` and `GET /crm/status` may be polled, at what minimum interval, or whether a push channel exists. | Any status refresh beyond step entry. The no polling rule stands until answered |
| **AF-03** | The `kind` value for the footer or signature branding asset. `POST /branding/upload-init` enumerates `"logo" \| "email_banner"` only, while handoff §3 step 3 describes a footer or signature asset. | The third branding upload block (§8.3) |
| **AF-04** | The provider display name list, and whether the website may render a provider's name inside the authenticated tree at all. Related to MF-11 and to owner decision 5 on CRM vendor names. | `externally_pending` notes, provider rows |
| **AF-05** | An endpoint returning the agency's offices, to populate the optional `office_id` on `POST /team/invite`. | The office control on team invite (§8.4) |
| **AF-06** | Whether any property file or Property Experience asset upload is in the website's scope, and if so its contract. | §9.1. No surface is built until answered |
| **AF-07** | The full response shape of `GET /branding/preview`. The contract states `{ logo, email_banner, …present flags }`; the elision is unresolved. | Rendering existing assets on step entry |

---

## 16. Owner decisions raised by this document

`FINAL_RECONCILIATION_REPORT.md` §10's thirteen decisions and `CLAIMS_MATRIX.md` §21 and §22
remain live and are not duplicated. These are additional.

| ID | Decision | Unblocks |
|---|---|---|
| **AD-01** | Confirm that the authenticated tree is **omitted entirely** from the public navigation until MF-03 is answered, including `Log in`. This document assumes omission. | The global header, D1 |
| **AD-02** | Confirm the **no polling** rule for provider status (§7.7) is acceptable, or supply AF-02. Polling a production provider integration without a stated cadence is exactly the class of action the systems isolation directive forbids. | Provider connection surfaces |
| **AD-03** | Confirm that **sign out requires no confirmation dialog** (§5.3). | Account panel |
| **AD-04** | Confirm the **wizard is non linear** (§7.5): back returns to the index, and there is no previous/next pair. The backend model carries no ordering constraint, but the owner may want an enforced sequence. | Wizard navigation, mobile composition |
| **AD-05** | Confirm that **CRM `missing_api_names[]` is never shown to the agency** and is available only inside the support affordance (§8.7). | CRM health surface |
| **AD-06** | Confirm that the **website renders no payment form and no embedded payment iframe** (§10) — checkout is always a full page handoff. | Checkout surface |
| **AD-07** | Confirm the **chat assistant is omitted**, not rendered as a pending panel (§12). | Every page |
| **AD-08** | Confirm whether a signed in agency may reach the **public marketing tree** with the authenticated header, or whether the two trees are fully separate shells. | Shell architecture, D1 and D2 boundary |

---

## 17. What is binding in this document

1. **The wizard is a hairline index.** Ten `StatusRow`s, one plane, no cards (§7.1).
2. **One 1 px hairline progress rule**, server driven, no rings, no percentages (§7.2).
3. **All eight status values render as glyph plus text plus colour**, with eight distinct glyphs
   and computed contrast on both canvases (§3).
4. **`externally_pending` never renders as complete** (§3.2, §7.8).
5. **`locked_by_plan` and `403 not_on_plan` render as honest states, never as errors** (§3.2, §4.1).
6. **No technical identifier reaches the DOM**, enforced by the §1.4 rendering boundary.
7. **No number is hardcoded** — not 7, not 10, not 14, not a price, not a quota (§1.3 rule 4).
8. **No fabricated agency data**, in any state, including empty states (§1.3 rule 1).
9. **Resume lands on `resume_step`** (§7.3).
10. **Saving is explicit; there is no autosave and no autosave indicator** (§7.6).
11. **No polling of provider status** until AF-02 is answered (§7.7).
12. **Interactive controls never sit on `ink-800` or `ink-50`**, and a surface step is never a
    boundary (§2.1).
13. **An upload surface is never built ahead of its contract** (§9.1).
14. **The upload preview shows the asset on both canvases** (§9.4).
15. **Checkout is a full page handoff. No payment form, no payment iframe** (§10).
16. **The website has no testimonial approval surface and never grants the extension** (§11).
17. **The mobile action row unsticks on `:focus-within`** — the keyboard never covers the submit
    (§7.9).
18. **Errors are never toasts**; one region, reserved height, no timers (§4.4).

---

## Status

Seventeen gaps closed. Eight status values specified with distinct glyphs, dual canvas colour and
computed contrast. The API envelope mapped to UI treatments across twelve HTTP outcomes. The ten
step wizard specified as a hairline index with server driven progress, resume, non linear
navigation, explicit save, a full OAuth round trip state machine and a 375 px composition. The
file upload law applied across six asset classes, three of which are blocked and are therefore not
built. Plans, subscription, checkout handoff and upgrade specified. The testimonial surface
specified and held. Three reserved surfaces documented and omitted. Seven new missing backend
fields named. Eight owner decisions raised.

No page implemented. No component written. No system contacted. No integration wired. Every
surface disabled by default. No production readiness claim made.

**Implemented and awaiting independent technical and final audit.**
