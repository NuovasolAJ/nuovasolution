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
| `/[locale]/connect/callback` | **Shared OAuth return route**, all providers | §7.7 |
| `/[locale]/account/plan` | Plan access, subscription, upgrade, checkout handoff — **price free** | §10 |
| `/[locale]/account/testimonial` | Testimonial, legally held, not publicly linked | §11 |
| Dashboard destination | Route is **website owned**; the backend supplies the readiness signal only. Owner decision outstanding | §8.10 |

`Log in` is not rendered in the public navigation until the owner confirms the destination
route. The backend half is resolved — the readiness signal is confirmed and the route is
website owned — so this is an owner decision, not a missing backend field
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

### 3.3.1 Wire values to UI states (added by V3)

The eight values above are **UI states**. Export v2's endpoints do not all return those names,
so the mapping is fixed here rather than left to each surface.

| Source | Wire value | UI state |
|---|---|---|
| `GET /onboarding/state` → `steps[].status` | `completed` · `needs_action` · `externally_pending` · `optional` · `locked_by_plan` | Same names. These five are the wizard-step vocabulary and map one to one |
| `GET /connect/{provider}/status` | `connected` | `connected` |
| | `pending` | **`externally_pending`** — pending means waiting on the provider, and must carry the left rule |
| | `error` | **`action_required`** |
| | `locked_by_plan` | `locked_by_plan` |
| `GET /crm/status` | `connected` · `pending` · `error` | As above |
| | `degraded` (also HTTP `424`) | `degraded` — the row states connected **and** degraded |
| `GET /crm/health` → `mapping_validation.ok = false` | — | **`action_required`**, derived. This is the health signal, not a transport status, and it is the only place `action_required` is produced by inspection rather than by a returned value |
| `GET /paid/status` | `connected` and `ready` are **two separate booleans** | `connected && ready` → `connected`. `connected && !ready` → **`externally_pending`**. Never `connected` on `connected` alone (§8.6) |

**BINDING.** A wire value with no mapping above is **never rendered**. It resolves to the
generic failure state for its HTTP status and is reported as a defect. Inventing a UI state for
an unmapped value is how `externally_pending` gets shown as done.

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
| `202` | `externally_pending` | **Pending, never done.** The surface adopts the `externally_pending` row treatment (§3.2) and a `StatusNote` naming the provider (§7.7 names table) |
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

> **Corrected by V3.** MF-04 is **CONFIRMED** by export v2 §F, which enumerates a
> website-safe `code` for every exported surface. The earlier "blocked, write copy per HTTP
> status" rule is void.

- **Error copy is written per `code`**, not per HTTP status. Each code carries one authored
  sentence in EN and ES, owned by `COPY_AND_CONVERSION_MASTER.md`.
- **Global codes**, valid on any endpoint: `no_session`, `token_expired`, `forbidden`,
  `cross_tenant`, `not_on_plan`, `invalid_input`, `unprocessable`, `rate_limited`,
  `server_error`, and `externally_pending` — which is **not an error** and renders as pending.
- **Surface-specific codes** are listed with their flows: `email_exists`, `captcha_failed`,
  `invalid_grant`, `email_not_confirmed`, `submission_already_pending`,
  `extension_already_granted`, `submission_id_required`, `consent_required`, `not_allowed`,
  `already_subscribed`, `invalid_wizard_action`, `unsupported_file_type`, `file_too_large`,
  `invalid_asset_kind`, `cross_tenant_asset`, `upload_not_found`, `employee_cross_tenant`,
  `office_out_of_scope`, `invalid_role`, `conflict`, `invalid_provider`, `degraded`,
  `invalid_source`, `source_not_authorized`, and the two OAuth return reasons in §7.7,
  `user_cancelled` and `provider_error`.
- **Retryability is a property of the code**, supplied by the contract, and drives whether a
  retry affordance is offered. `rate_limited` retries only after the interval the response
  states; the website never invents one.
- **The code itself is never rendered.** It selects a sentence; it is not the sentence, and it
  never appears in the interface (§1.4).
- `message` from the envelope is **not** rendered as the primary error text. A server string
  cannot be guaranteed to be in the active language. It is rendered only in the support
  affordance, beneath `request_id`, at `caption`.
- **An unrecognised code** falls back to the generic failure state for its HTTP status. It is
  never rendered raw, and never treated as success.

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
| **Loading State** | Shared §5.0. Submit label swaps at locked width. The captcha widget occupies a reserved box from first paint, sized to its provider's dimensions — the provider is an **owner decision (MF-08)**, so the reservation is a named constant to be set once it is chosen |
| **Empty State** | n/a. The form is the initial state |
| **Error State** | `409` email exists: a form level message that routes to login, with the entered address preserved. `400`: field level. `429`: human message plus retry, submit stays mounted. `5xx`: generic plus support affordance. Password rules are stated **before** submission, never revealed only on failure |
| **Success State** | If `session` is returned, navigate to the wizard at `resume_step`. If only a login hint, route to login with a `role="status"` message stating the account exists and what to do next. **These two outcomes must not share one message** |
| **Resume State** | No draft persistence. A returning visitor with a session is redirected away from signup to the wizard |
| **Blocked State** | Until the owner releases the action (activation register), the submit renders as the §5.9 honest state and offers *Book a demo*. **No payment control, no card field and no billing step exists on this surface** — export v2 §C1 confirms no payment method is collected at signup. The *wording* that describes the trial remains owned by `COPY_AND_CONVERSION_MASTER.md` and cleared by `CLAIMS_MATRIX.md`; this document authors none of it |
| **Connection State** | n/a. The BFF is either reachable or the error mapping applies |
| **Accessibility** | Shared §5.0, plus: `autocomplete` `name`, `email`, `new-password`, `organization`. `type="email"` with `inputmode="email"`. Password field has a visibility toggle that is a real button with an accessible name and `aria-pressed`. The captcha must have an accessible non visual alternative; a provider without one is rejected at MF-08 |
| **Keyboard Behavior** | Shared §5.0. `Enter` in any field submits. Tab reaches the captcha before the submit |
| **Focus Behavior** | Shared §5.0. On `409`, focus moves to the form level message, whose first element is the login link |
| **Reduced Motion** | Shared §5.0 |
| **Performance** | The captcha script is the only third party asset on the route and loads **after** the form is interactive, never render blocking. LCP is the `h1` |
| **Responsive Spacing** | Shared §5.0. Form to privacy line `space-6`. Privacy line to login link `space-8` |
| **Validation Presentation** | Shared §5.0. `language` is **confirmed** by export v2 §C7: the website locale set is `{en, es}` and the field is not backend-enum-enforced. The website therefore **constrains its own UI to `{en, es}` and passes the active route locale** — it does not render a free-text language control, and it does not offer a language it has no locale for. Customer communication language and AI runtime languages are separate concepts and are **not** collected on this surface. Password requirements are a static `caption` list, never a live strength meter |
| **Legal** | L-07 consents and controller/processor roles. **L-14 privacy policy, launch blocking.** The privacy line sits at the point of collection with a real link |
| **Status** | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING · LEGAL REVIEW PENDING · captcha provider **OWNER DECISION REQUIRED** (MF-08) · CTA wording OWNER DECISION PENDING |

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

Closes part of gap 4.

> **Corrected by V3.** MF-06 is **CONFIRMED** by export v2 §C5. Reminders are **backend
> driven and backend sent**: the stages are `reminder_3d` (three days before the trial ends),
> `reminder_1d` (one day before), plus a separate `testimonial_invite` stage. The website does
> **not** send reminders; it reflects trial status. The earlier "no reminder contract exists"
> statement is void.

| Field | Specification |
|---|---|
| **Page Purpose** | Raise the banner's emphasis as the trial nears its end, matching the cadence the backend already uses |
| **Layout** | The §6.1 band, unchanged in structure |
| **Information Hierarchy** | Identical. Only the statement's wording and the affordance's level change |
| **Desktop / Tablet / Mobile Behavior** | Identical to §6.1 |
| **Loading / Empty / Error / Success / Resume / Blocked / Connection** | Identical to §6.1 |
| **Accessibility** | Identical. **The band's `role="status"` does not re announce on every navigation** — it announces on change of `status`, not on re render |
| **Keyboard / Focus / Reduced Motion / Performance / Spacing / Validation** | Identical to §6.1 |
| **The only permitted escalation** | The affordance rises from Tertiary to Secondary, and the statement's leading glyph changes to `clock` in `signal-attention`. **The band never changes colour, never becomes a full width alert, never becomes a modal, never becomes a repeated interstitial, and never blocks the page** |
| **Escalation thresholds** | The band's emphasis rises at the **same two points the backend already uses** — three days and one day before the trial ends — so the interface and the outgoing reminders agree. **Both thresholds are still derived from `trial_end` and `days_left` as served**; the numbers 3 and 1 are configuration constants named once, never conditions scattered through the surfaces, and never a countdown the website computes independently |
| **What the website never claims** | That it sent a reminder. Reminders are backend driven. No surface states or implies that a message was delivered, when, or to whom |
| **`testimonial_invite`** | A separate backend stage. It is **not** rendered by the trial band, and it does not alter the band's escalation. The testimonial surface remains legally held (§11) |
| **Status** | BACKEND CONFIRMED (export v2 §C5) · WEBSITE INTEGRATION PENDING |

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

> **Corrected by V3.** AF-01 is answered. Two earlier assumptions are void: the BFF does
> **not** redirect back to the step route, and the return is **not** a four-value state
> machine on the wire.

The provider returns to the **BFF callback**, which redirects the browser to **one shared
website route** for every provider:

```
/[locale]/connect/callback?provider={p}&status={success|error}&correlation={state}[&reason={code}]
```

| Parameter | Contract |
|---|---|
| `provider` | The provider the agency was connecting. Used to resolve the display name (§7.7 names table) and the step to return to |
| `status` | **`success \| error` only.** There is no third value |
| `correlation` | The opaque server-issued state. **Never a token.** It is not rendered (§1.4) |
| `reason` | Present when `status=error`. **`user_cancelled`** or **`provider_error`** |

**The shared callback route.** `/[locale]/connect/callback` is a thin transitional surface, not
a destination. It reads the parameters, resolves the originating step from `provider`, and
navigates there, carrying the outcome. It renders only a reserved-height region at the shell's
standard dimensions so the transition costs no layout shift, and it is **never** a page the
agency is left sitting on. If a parameter set is unusable, it navigates to the wizard index and
surfaces the outcome there rather than dead-ending.

**The four UI outcomes, resolved from two parameters**

| Wire | UI outcome | Treatment |
|---|---|---|
| `status=success` | **Connected** | The row re reads `GET /connect/{provider}/status`. On `connected` it adopts the `connected` treatment and a `role="status"` message states what is now connected |
| `status=success`, status read returns `202` / `pending` | **Externally pending** | `externally_pending` treatment with the left rule, plus a `StatusNote` naming the provider being waited on. **Never a check, never positive colour** |
| `status=error&reason=user_cancelled` | **Cancelled — neutral and resumable** | The row returns to its **previous** status, unchanged. A `body-s` note states that nothing was connected and offers the control again. **Not an error: no `signal-critical`, no `action_required`, no error copy, no support affordance, no retry framing.** The step remains fully usable |
| `status=error&reason=provider_error` | **Provider error** | `action_required` treatment. A `StatusNote` states that the connection did not complete, offers reconnect as a Secondary control, and offers the support affordance. **No provider error string is rendered** — it is unenumerated and may carry technical identifiers (§1.4) |

**Fail-safe (BINDING).** Anything that is not an explicit `status=success` is an error. An
absent, unrecognised or malformed parameter set, and a `correlation` that does not match, all
resolve to **`provider_error`** — never to success, and **never to `user_cancelled`**.
Cancellation is rendered only when the contract explicitly says so, because silently treating an
unknown failure as a cancellation would hide a real fault behind a neutral message.

**Not persisted.** The cancellation distinction lives in the redirect only. `GET
/connect/{provider}/status` has no cancellation state, so a cancelled attempt is
indistinguishable from never having started once the redirect is consumed — which is the correct
outcome, since nothing was connected. The website therefore renders the neutral note from the
return, and **does not** try to recover it later. A persisted, queryable cancellation outcome is
recorded as backend work in §15.1; it is not required for this behaviour.

**Status refresh: the no polling rule (BINDING)**

> **Confirmed by V3.** AF-02 is answered: export v2 §D states there is **no polling contract**
> and no push channel, and §A item 6 records "No invented polling" as binding.

- Status is read **after the callback**, **on entry to the surface**, and **on an explicit
  refresh**. Nothing else.
- An explicit **Check again** Tertiary control re reads status on demand. It is rate limited
  client side to one call every 10 seconds, purely to prevent a stuck key repeat, and it states
  when it last checked.
- **No background polling by default. No websocket. No optimistic status.**
- Export v2 permits a bounded, website-owned auto-refresh of a pending connection. If it is ever
  enabled it must: stop on a terminal state (`connected`, `error`, `degraded`), stop when the
  agency leaves the surface, stop when the tab is hidden, use a conservative interval, and
  **never be presented as a backend guarantee**. It is off unless the owner enables it.
- **The backend guarantees nothing about refresh.** No surface may promise that a pending
  connection will update on its own.

**Provider display names (BINDING)**

> **Confirmed by V3.** AF-04 is answered by the AF addendum. Text only. **No logo until brand
> approval.** No internal identifier, adapter key, vendor or carrier name is ever rendered.

| Channel | Display name |
|---|---|
| Email | **Gmail** — the account the agency connects |
| WhatsApp | **WhatsApp** |
| Calendar | **Google Calendar** · **Microsoft Outlook** |
| Voice | **Voice** or **Phone**, generically |
| CRM | **HubSpot** · **Pipedrive** · **Zoho CRM** · **Salesforce** |
| Paid acquisition | **Google Lead Forms** · **Meta Lead Ads** · **Click-to-WhatsApp** |

**Voice stays generic (BINDING).** The voice layer's internal registry holds engineering and
carrier descriptions, not customer-facing product names. Rendering one would disclose the
internal telephony stack. Voice is named **Voice** or **Phone** and nothing else, in every
state, on every surface, until an explicit owner and brand decision says otherwise. Technical
existence is never inferred as branding permission.

**Scope.** These names are cleared for the **authenticated product interface**. Naming any
provider on the public marketing tree is a separate question governed by `CLAIMS_MATRIX.md`,
and backend confirmation does not convert a claims verdict.

**The five connection situations named in the brief**

| Situation | Status value | Treatment |
|---|---|---|
| **Connection pending** | `externally_pending` | §3.2 plus the left rule plus a `StatusNote` naming the provider from the table above |
| **Connection failed** | `action_required` | §3.2. Reconnect as a Secondary control. The support affordance. No raw provider string |
| **Cancelled by the agency** | previous status, unchanged | Neutral resumable note. **Not a failure state**, and not one of the eight status values — nothing was connected, so nothing changed |
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
| **`legend`** | **Confirmed by V3** (export v2 §G). The projection's `legend` is an object keyed by the five wizard-step statuses — `completed`, `needs_action`, `externally_pending`, `optional`, `locked_by_plan` — each carrying a description string. It is rendered as a hairline separated `caption` list beneath the readiness list, one line per entry, each line pairing the §3 glyph for that status with the served description. Keys are never rendered; the glyph and the description carry the meaning. When a key is absent, its line is omitted — no fallback legend is invented |
| **`readiness` detail** | The `ready` step carries `readiness: { activatable, blocked_mandatory[], blocked_features[] }`. **`blocked_mandatory` produces the blocker list; `blocked_features` produces the separate `locked_by_plan` list beneath it.** The two are never merged — a missing prerequisite and an unentitled capability are different situations with different routes |
| **`optional` rows** | Never counted as blockers, never listed under readiness, and never presented as reducing completeness |
| **`externally_pending` rows** | Listed as outstanding. **Never as done.** The agency is told the item is waiting on an external party, so it does not read as their own inaction |
| **`locked_by_plan` rows** | Listed separately, beneath the blockers, under their own hairline, with the upgrade route. They are not failures |
| **Empty state** | When `activatable` is true and nothing is outstanding, the list is replaced by one `heading-m` line and the handoff action. **No celebration, no illustration, no badge** |
| **Everything else** | Shared §5.0 |
| **Status** | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING |

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
| **Status** | BACKEND CONFIRMED · WEBSITE INTEGRATION PENDING · step detail shapes confirmed (export v2 §G) |

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
| **Validation Presentation** | Email format on blur. Language is the route locale, constrained to {en, es} (§5.1) |
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

> **Corrected by V3.** AF-03 is answered. **Footer and signature are text, not uploads.** The
> earlier "three upload blocks" structure is void. Only **logo** and **email banner** are
> uploaded assets. Export v2 §E: footer is localized legal text; signature is a mode selection
> plus text; the server sanitizes and renders both. MF-07 is also confirmed, so the upload
> constraints are now known and stated before selection.

**Two zones, hairline separated.** Zone A is uploads. Zone B is text. They are visually
distinct — a text field never looks like a receptacle, and the dashed upload border appears
only in Zone A (`LUXURY_UX_MEDIA_SYSTEM.md` §5.16).

| Field | Specification |
|---|---|
| **Page Purpose** | Logo and email banner as uploads; footer and signature as text. `completed` when branding is configured |
| **Information Hierarchy** | h1 → lead → **Zone A: two upload blocks** (logo, email banner), each `heading-s` label + one `body-s` line stating where the asset appears + the zone or the current asset + replace and remove → hairline → **Zone B: footer and signature**, as text fields |
| **Zone B — footer** | Localized legal footer text, one field **per active locale**, each labelled with its locale, `<textarea>` at a reserved height. **Plain text only.** The website never accepts, renders or submits raw HTML, and never offers a rich text editor. The server sanitizes and renders the responsive HTML and plaintext forms |
| **Zone B — signature** | A **mode selection** followed by its text. The mode is a native `<select>` of four options, rendered as agency facing labels from the copy document — **never the raw mode tokens** (§1.4). Changing the mode does not clear entered text, and does not change the zone's height: all four modes reserve the same box |
| **Preview** | Footer and signature are **server rendered**. The website does **not** simulate the outgoing email, does not compose a mock message, and does not display a fabricated email frame — that would be a fabricated product surface (§1.3 rule 1). Where a rendered preview is offered, it is the server's own output or it is absent |
| **Empty State** | Zone A shows two upload zones. Zone B shows empty fields with their constraints. **No placeholder logo, no sample banner, no specimen signature, no mock email** |
| **Error State** | Per `code` (§4.3): `unsupported_file_type`, `file_too_large`, `invalid_asset_kind`, `cross_tenant_asset`, `upload_not_found`, `forbidden`. Field level on the zone or field that caused them |
| **Blocked State** | None remaining in this step. Both upload kinds and the text contract are confirmed |
| **Validation Presentation** | §9.5. Upload constraints stated before selection. Footer and signature are length validated only where the contract states a limit; none is stated, so the website enforces none |
| **Performance** | The signed upload URL is minted by the BFF; the browser uploads directly to it. Previews render from the URLs returned by `GET /branding/preview` (§9.4), never from a client side object URL after commit |
| **Status** | BACKEND CONFIRMED — uploads (export v2 §C6), text contract (§E), preview shape (AF addendum) · WEBSITE INTEGRATION PENDING |

### 8.4 `team`

| Field | Specification |
|---|---|
| **Page Purpose** | Invite employees and assign a role. `completed` at one or more active employees |
| **Information Hierarchy** | h1 → lead → the invited list → the invite form → action row. **The list comes first** so a returning agency sees state before a form |
| **Roles** | Four, from the contract: `agent`, `team_lead`, `office_manager`, `agency_admin`. Rendered as a native `<select>` with agency facing names from the copy document and one `caption` line describing the selected role's scope. **Never the raw token** (§1.4) |
| **Empty State** | One `heading-m` line and the invite form. No sample teammate, no placeholder avatar row |
| **Error State** | Per `code`: `forbidden` renders the whole step read only with the reason. `employee_cross_tenant` is treated as a defect per §4.1 with no detail echoed. `office_out_of_scope` is a **field level** error on the office control, stating that the selected office is outside the inviter's scope. `invalid_role` is field level on the role control. `conflict` states that the address is already invited and offers no destructive action |
| **Success State** | The invited row appears in the list with status `externally_pending` until the projection reports an active employee. **An invitation is not a member** |
| **Office control** | **Unblocked by V3** (AF-05 confirmed). Populated from `GET /offices` → `{ offices:[{ office_id, name, is_default }] }`. A native `<select>` showing `name` only; `is_default` marks the preselected option. **`office_id` is an opaque handle and is never rendered** (§1.4) — it is submitted, never shown. The field is **optional**: an explicit "no specific office" option is offered and means tenant level. When the list returns empty, the control is omitted rather than shown empty |
| **Role gating** | An `office_manager` may invite only into their own office; an `agency_admin` into any. The control renders **only the offices in the inviter's scope**, so the server's `office_out_of_scope` becomes a defence rather than the primary path. Role names are agency facing labels, never the raw tokens |
| **Blocked State** | None remaining in this step |
| **Accessibility** | The list is a `<table>` with a caption, or an `<ul>` of `StatusRow`s. Role is announced with the name, never the token |
| **Validation Presentation** | Email format on blur. Duplicate detection is server side only; the client does not pre check against a list it cannot see |

### 8.5 `communication`

| Field | Specification |
|---|---|
| **Page Purpose** | Connect email, WhatsApp and Meta, calendar, and voice where entitled |
| **Information Hierarchy** | h1 → lead → four provider `StatusRow`s, hairline separated, each with its status, one detail line and its control. Rows are named **Gmail**, **WhatsApp**, **Google Calendar** or **Microsoft Outlook**, and **Voice** (§7.7 names table) |
| **Connection State** | §7.7 in full. `externally_pending` during WhatsApp and Meta verification, with the left rule and a `StatusNote` naming the provider |
| **Blocked State** | Voice unentitled renders `locked_by_plan` with the upgrade route. `not_on_plan` is **never** an error (§4.1). **Connecting a voice channel is not evidence of voice AI capability**; no wording on this surface may imply one (matrix 4.4, V-01 unchanged) |
| **Voice naming (BINDING)** | The voice row is labelled **Voice** or **Phone**, generically. **No carrier, vendor, adapter or telephony provider name is ever rendered**, in any state, including errors and the support affordance. Technical existence is not branding permission (AF addendum) |
| **Empty State** | Four rows, all `needs_action`. That is a full state, not an empty one |
| **Error State** | §7.7 provider error handling. Display names are text only; **no provider logo until brand approval**. Public marketing naming remains a `CLAIMS_MATRIX.md` question and is not settled by this surface |
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
| **Uploads** | **Confirmed out of scope by V3** (AF-06, export v2 §E). Property Experience assets are owned by the PX lane and are scoped to a tenant and a property; a publish referencing an asset it does not own **fails closed**. Capture and authoring are PX-lane surfaces. **The website builds no upload surface, no second capture wizard and no asset manager for Property Experience** — it reads the entry state and links out |
| **Claims** | K-01 to K-12 keep their existing verdicts; **K-05 is LEGAL REVIEW PENDING**. No capability wording on this surface beyond the entry state |

### 8.10 `ready`

Specified in full at §7.8.

| Field | Specification |
|---|---|
| **Page Purpose** | State readiness and hand off |
| **Success State** | When `activatable` is true, one `heading-m` line and the handoff action. No celebration (§1.2 item 21) |
| **Handoff signal** | **Confirmed by V3.** The backend signal is the projection's `activatable` plus a successful tenant activation. **The backend owns no route.** The destination is website owned |
| **Blocked State** | The **route** is an outstanding owner decision, not a missing backend field. Until the owner confirms it, the handoff action renders in the §5.9 honest state, states that the next step is being prepared, and offers a real alternative path. **No invented destination, no placeholder URL, no dead control** (R7). Export v2 §C4 records a recommended target; a recommendation is not a confirmation, and this document does not adopt one on the owner's behalf |

---

## 9. File upload law (application)

The global component law is added to `LUXURY_UX_MEDIA_SYSTEM.md` §5.16. This section states how it
applies, and where it may not be used at all.

### 9.1 Where uploads exist

| Asset | Contract | Status |
|---|---|---|
| **Logo** | `kind:"logo"` | **BACKEND CONFIRMED**, constraints known (§9.5) |
| **Email banner** | `kind:"email_banner"` | **BACKEND CONFIRMED**, constraints known (§9.5) |
| **Footer or signature** | **not an upload** | **RESOLVED — text fields.** Specified as text in §8.3 Zone B. No upload surface exists for either |
| **Property files** | **not a website upload** | **OUT OF SCOPE.** Property is ingested via source connect (§8.8). A direct upload would require backend work that does not exist. No surface is built |
| **Property Experience assets** | owned by the PX lane | **OUT OF SCOPE.** Tenant and property scoped, publish fails closed on a foreign asset. No surface is built (§8.9) |
| **Testimonial files** | **no upload pipeline exists** | **BLOCKED · LEGAL REVIEW PENDING (L-13).** The contract accepts a string reference only, with no storage pipeline behind it. No file input is rendered. See §11 |

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

**On entry to the step**, and after every replace or remove, the current state is read from
`GET /branding/preview`, whose shape is confirmed (AF addendum):

| Key | Type | Meaning for the UI |
|---|---|---|
| `logo` | string or **null** | Durable public URL. Rendered directly when present |
| `logo_present` | boolean | `true` ⇒ a valid logo exists |
| `email_banner` | string or **null** | Durable public URL, non-null **only** when the asset validates |
| `email_banner_present` | boolean | `true` ⇒ a valid banner exists |
| `fallback_note` | string | Server statement that missing or invalid assets are omitted rather than rendered broken |

**BINDING rules from this shape**

1. **The boolean decides the branch; the URL decides the render.** `*_present = false` → the
   empty upload zone. `*_present = true` with a non-null URL → the preview.
2. **`*_present = true` with a null URL is a defect, not a preview.** The zone renders its
   empty state and the surface reports the inconsistency. It never renders a broken image and
   never fabricates a placeholder in its place.
3. **The commit response is not the source of truth for the preview.** `POST /branding/commit`
   returns a `preview` object of this same shape; that object, or a fresh read, is used — never
   a shape inferred from `stored_url` alone.
4. **No client side object URL survives commit.** Once committed, the rendered image is the
   returned public URL, which is durable and reload-safe.
5. `fallback_note` is a server statement about server behaviour. It is **not rendered as
   agency-facing copy** and never replaces an authored sentence; it may appear only in the
   support affordance.
6. The URLs are public render URLs. No bucket name, object identifier or signed URL is exposed,
   and none is ever displayed (§1.4).

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
| **Preview** | After commit, the zone is replaced **in the same box** by the asset rendered from the URL returned by `GET /branding/preview` (§9.2) at its true aspect ratio, inside a 1 px `border-strong` frame, `radius-0`, no shadow. Beneath it: one `caption` line with the file's own name as supplied by the agency |
| **Contrast preview** | A logo will be placed on both canvases. The preview therefore shows the asset on `ink-950` **and** on `ivory`, side by side ≥ 640 px and stacked below, each 1 px framed. This is the one preview affordance that earns its space, because a logo that is invisible on one canvas is a real failure the agency must see |
| **Replace** | A Secondary control beneath the preview. It reopens the same three phase sequence. The existing asset stays visible until the new one commits — **there is no intermediate empty state** |
| **Remove** | A Tertiary control. It opens the wizard's single permitted confirmation dialog (§7.5) stating what will stop appearing where. On confirm, `POST /branding/remove { kind }`. On success the zone returns to empty in the same box |
| **Failure after removal** | If removal fails, the asset is still shown. The UI never optimistically renders a removal that did not happen |

### 9.5 Validation presentation

- Constraints are stated **before** selection, in the zone's `caption` line.
- **Constraints are confirmed** (V3, export v2 §C6) and apply to the two branding uploads:
  **images only — PNG, JPEG, WebP, GIF — and at most 5 MB.**
- These values are declared **once**, as named constants, and drive three things from that one
  place: the `accept` attribute, the `caption` constraint line stated before selection, and the
  client side pre check. They are never re-typed per surface.
- **Client side pre validation is now permitted**, because the constraint is contractual rather
  than invented. It is an early, courteous rejection only — **the server remains the
  authority**, and a file the client accepts may still be rejected server side without that
  being an inconsistency.
- **No constraint is ever widened by the website.** Where a future upload contract states no
  limit, the earlier rule stands: the client performs no rejection of its own, because
  inventing a limit produces a client rejection the server would have accepted.
- Server rejections map per `code` (§4.3): `unsupported_file_type` and `file_too_large` are
  field level errors on the zone, stating the real constraint, with the zone still mounted and
  the control still usable. `invalid_asset_kind` is a defect, not user error — the website
  submits only the two contractual kinds.
- `cross_tenant_asset` is treated as a defect (§4.1): a generic failure plus the support
  affordance, with no detail echoed.
- `upload_not_found` states that the transfer did not complete and offers the upload again.
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
| **Information Hierarchy** | `display-m` h1 → current standing block → the plans plane. **No price line, no tax line, no billing line** |
| **Current standing** | A single bordered block, `radius-md`, `paper`: current plan name from `subscription/state`, its state as a `StatusChip`, and — when `cancel_at_period_end` is true — one plain line stating that fact. **No countdown, no urgency device, no retention interstitial** |
| **Plans plane** | `LUXURY_UX_MEDIA_SYSTEM.md` §5.7 **Layout A, the plan access plane**: one bordered plane, `radius-0`, divided by vertical hairlines. The current plan's column is marked by a 2 px `champagne-400` top rule and `aria-current`. **Not three cards** |
| **Prices — BINDING** | **There is no price.** Export v2 (MF-10, §C8, §F) records that the plan record carries no price and no currency column, that no backend pricing, currency or tax authority exists, and that `GET /plans` returns `{ code, display_name, entitlements_summary }` with **no price field**. The earlier `price_display` assumption is void. **No amount, currency symbol, currency code, tax basis, billing period, discount or contract term is rendered on this surface, in any state, in either language.** No space is reserved for one |
| **What is rendered** | `display_name` as served, and `entitlements_summary` as served. **The internal plan `code` is never rendered** (§1.4). The website never authors, translates, abbreviates or reorders a plan name |
| **Quotas and limits** | **Nothing.** Matrix 5.6 forbids not only numbers but any visual implication of one: no bars, no dots, no meters, no "up to", no comparative column heights |
| **Desktop Behavior** | Standing block full width; plans plane full `container-default` width, columns equal in width and **equal in height by grid, not by content** |
| **Tablet Behavior** | Same, columns may reduce to two per row with a hairline between rows |
| **Mobile Behavior** | **Never a horizontally scrolling comparison table.** The plane becomes a vertical stack of plan sections, each with its own entitlement list, hairline separated. The current plan's section is first |
| **Loading State** | The plane reserves the height of its tallest resolved state so nothing shifts when `/plans` resolves. The standing block reserves its height |
| **Empty State** | If `/plans` returns none, the surface states that plan information is unavailable and routes to a conversation. It does not render an empty plane |
| **Error State** | Per `code`: `not_allowed` renders the honest state, not an error. **`already_subscribed` routes to the current plan and is not an error** (matrix step 13). `server_error` per §4 |
| **Success State** | Checkout is a **full page handoff**: on `{ checkout_url }` the browser navigates away. Before navigating, the control states that the agency is leaving to complete the change. **The website never renders a payment form, never collects a card, never displays an amount, and never embeds a payment iframe** (export v2 §A item 7) |
| **Resume State** | Returning from checkout re reads `GET /subscription/state`. **The website never infers success from the return URL.** Until the state changes server side, the standing block shows the previous state, with no optimistic upgrade |
| **Blocked State** | Until the owner releases the action, the plan controls render as §5.9 honest states routing to a conversation |
| **Connection State** | n/a |
| **Accessibility** | The plane is a `<table>` with real headers, or a list of `<section>`s with headings — never a div grid. `aria-current="true"` on the current plan. Entitlement presence is glyph plus text, never a bare tick (§5.17) |
| **Keyboard Behavior** | One tab stop per plan action. No roving grid |
| **Focus Behavior** | Shared §5.0 |
| **Reduced Motion** | No plan comparison animation exists in any state |
| **Performance** | `GET /plans` is public and cacheable; the two authenticated reads are not |
| **Responsive Spacing** | Standing block to plane `space-16`; plane to page end `section-y-default` |
| **Validation Presentation** | Selection is a single control per plan. No form, no validation |
| **Upgrade entry points** | Exactly three, all routing here: the `locked_by_plan` row affordance, the `denied` feature treatment, and the trial expired plane. **No upsell appears anywhere else** — not in the wizard header, not in the banner, not between steps |
| **Status** | BACKEND CONFIRMED (plans, subscription state, checkout handoff) · WEBSITE INTEGRATION PENDING · **no pricing authority exists** (MF-10 · LEGAL REVIEW REQUIRED and OWNER DECISION REQUIRED) · public plan names OWNER DECISION PENDING (PK-02) |

---

## 11. Testimonial, pending review and the extension

Closes gap 10. Route `/[locale]/account/testimonial` — **PROPOSED**, authenticated only.

> **LEGAL REVIEW PENDING (L-13). DISABLED FOR PUBLIC DISPLAY.**
> **Corrected by V3.** MF-12 is **CONFIRMED**: the surface is **authenticated only**, reached by
> a signed in agency user through the BFF. It is not a public link and carries no captcha.
> MF-01 is **BACKEND IMPLEMENTATION REQUIRED**: the written testimonial, the manual owner
> approval and the one time extension are backend defined, but **no media upload pipeline
> exists** — the contract accepts a string reference only. This surface is specified so it can
> be built once cleared. **It is not linked from any public page, it is not linked from the
> marketing navigation, and no testimonial mechanic is released publicly in this wave.**

| Field | Specification |
|---|---|
| **Page Purpose** | Let a signed in agency submit feedback, and show its review state honestly |
| **Layout** | `ivory`, `container-narrow`, left aligned |
| **Information Hierarchy** | h1 → lead → **the current state first** if one exists → the form → the consent control → the privacy line |
| **Desktop / Tablet / Mobile Behavior** | Single column at every breakpoint; 52 px fields below 640 |
| **Loading State** | Shared §5.0. `GET /testimonial/status` resolves before the form renders, so a submitted agency never sees a blank form first |
| **Empty State** | The form, with no state block above it |
| **Error State** | Per `code`: **`consent_required` is a field level error on an explicit consent control.** The consent control is never pre ticked, never a soft opt out, and never bundled with another agreement. **`submission_already_pending`** routes to the existing submission state rather than erroring. **`extension_already_granted`** states plainly that the one time extension has already been applied, and is not framed as a failure. `submission_id_required` is a defect, not user error. `rate_limited` per §4 |
| **Success State** | **Only: received, pending review.** No wording, in either language, may imply that an extension has been granted, is likely, or is automatic (`PRODUCT_TRUTH.md` §18.5, matrix step 11) |
| **Resume State** | Re entry shows the current `state`, never a blank form. **The state set is confirmed as six values**: `invited`, `submitted`, `pending_review`, `approved`, `rejected`, `withdrawn` — the earlier three value assumption is void. `submitted` and `pending_review` render the `externally_pending` treatment. `invited` renders the form. `approved`, `rejected` and `withdrawn` render their own states, and **none states a consequence the website is not authorised to state** |
| **Blocked State** | Until L-13 clears and the owner releases the action, the submit renders in the §5.9 honest state |
| **Connection State** | `pending_review` uses `externally_pending` (§3.2) — waiting on a human review, which is exactly what that value means |
| **Media** | **No file input is rendered.** The contract accepts a string reference only and **no upload or storage pipeline exists behind it**. A video upload control without a pipeline is a dead control. If the owner requires video before approval, that is backend work, not a website surface. §9.1 applies |
| **Accessibility** | Rating is a real `<fieldset>` of radio inputs with visible labels, never a star widget without text. Consent is a single checkbox with a full sentence label |
| **Keyboard / Focus / Reduced Motion** | Shared §5.0 |
| **Performance** | One read, one write |
| **Responsive Spacing** | Shared §5.0 |
| **Validation Presentation** | Consent is required and stated as such. Quote length limits are not enforced client side, because none is specified |
| **The plus 7 days** | **The website has no approval surface and must not build one** (matrix step 12). It never grants, never computes and **never hardcodes 7**. When approval happens, the agency sees the new `trial_end` through the §6.1 band, and nowhere else. There is no "extension granted" screen, because the website is not the system that granted it |
| **Legal** | L-13. Incentivised testimonials, personal data, purpose limitation, retention and later marketing use are separate consents. Contract terms belong in terms and conditions, not in this surface's copy |
| **Status** | BACKEND CONFIRMED — written submission, six state model, authenticated only (MF-12) · **LEGAL REVIEW PENDING, DISABLED** · **media BACKEND IMPLEMENTATION REQUIRED** (MF-01) |

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
polling rule (§7.7) it fires only on an explicit **Check again** or on a return from the shared
callback route. A `connect_return` event carries `provider` and the outcome, never `correlation`.

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
14. No background polling of any provider status endpoint. Status is read after the callback,
    on entry to the surface, or on an explicit refresh.
15. No surface is publicly reachable, and the testimonial surface is not linked from any public
    page.
16. Focus never obscured by `--shell-h`; verified at every breakpoint.
17. The §1.3 and §1.2 anti pattern lists pass against every new surface.

Added by V3:

18. **No price, currency symbol, currency code, tax basis, billing period, discount or contract
    term appears on any surface**, and no space is reserved for one.
19. An OAuth cancellation renders **neutrally and resumably**, never as a provider failure, and
    an unrecognised outcome never renders as a cancellation.
20. Footer and signature render as **text fields**, never as upload zones. Only logo and email
    banner are uploads.
21. **No carrier, vendor or adapter name appears on the voice surface** — it is named Voice or
    Phone, generically, in every state.
22. Every wire status value has a mapping in §3.3.1, and an unmapped value is never rendered.
23. `logo_present` true with a null URL renders the empty state and is reported as a defect —
    never a broken image, never a fabricated placeholder.

---

## 15. What could not be specified, and why

| # | Item | Reason |
|---|---|---|
**Updated by V3** against backend export v2 and its AF addendum.

| # | Item | State |
|---|---|---|
| 1 | The dashboard route after the wizard | **OWNER DECISION.** The backend signal is confirmed and the route is website owned. No longer a missing backend field |
| 2 | Error copy per `code` | **RESOLVED.** The enumeration is confirmed; copy is written per code (§4.3) |
| 3 | The per step `detail` shapes and the `legend` | **RESOLVED.** Confirmed shapes (§7.8, §8) |
| 4 | Trial reminder cadence | **RESOLVED.** Backend driven, three days and one day before the end, plus a separate testimonial invite stage (§6.2) |
| 5 | Upload accepted types and size ceiling | **RESOLVED.** Images only, five megabytes, two kinds (§9.5) |
| 6 | The captcha provider, its widget dimensions and its non visual alternative | **STILL OPEN — OWNER DECISION REQUIRED (MF-08).** The reservation stays a named constant |
| 7 | The `language` control on signup | **RESOLVED.** Website locale set confirmed; the route locale is passed (§5.1) |
| 8 | Currency, tax basis, plan naming | **RESOLVED IN THE NEGATIVE.** No pricing, currency or tax authority exists, so **no price surface exists** (§10). Public plan naming remains an owner decision |
| 9 | Provider display names | **RESOLVED**, with voice deliberately generic (§7.7) |
| 10 | Testimonial media and surface placement | Placement **RESOLVED** — authenticated only. Media **BACKEND IMPLEMENTATION REQUIRED**; no pipeline exists (§11) |
| 11 | The OAuth return contract | **RESOLVED** (§7.7) |
| 12 | Provider status polling | **RESOLVED.** No polling contract, no push channel (§7.7) |
| 13 | Footer and signature | **RESOLVED.** They are text, not uploads (§8.3) |
| 14 | The office list for team invites | **RESOLVED**, with role gating (§8.4) |
| 15 | Property file and Property Experience asset uploads | **RESOLVED.** Out of scope for the website (§8.9, §9.1) |

### 15.1 AF register — status after export v2 and the AF addendum

The seven fields this document raised were transferred to the backend in
`backend_handoff/WEBSITE_UX_AF_REQUIREMENTS_EXPORT_v1.md` and are now answered. The register is
kept for traceability.

| ID | Requirement | Status | Applied at |
|---|---|---|---|
| **AF-01** | OAuth return parameter contract, including a cancellation outcome | **RESOLVED.** Shared callback route; `status` stays `success \| error`; cancellation is carried as `reason=user_cancelled`, provider failure as `reason=provider_error`; unknown outcomes fail safe to provider error | §7.7 |
| **AF-02** | Whether provider status may be polled | **RESOLVED.** No polling contract and no push channel. Read after callback, on entry, or on explicit refresh | §7.7 |
| **AF-03** | The `kind` value for footer or signature | **RESOLVED by negation.** They are text fields, not uploads | §8.3, §9.1 |
| **AF-04** | Provider display names | **RESOLVED.** Gmail, WhatsApp, Google Calendar, Microsoft Outlook, and Voice or Phone generically. Text only, no logos, no carrier names | §7.7, §8.5 |
| **AF-05** | An endpoint returning the agency's offices | **RESOLVED.** Offices list with opaque handle, optional, role gated | §8.4 |
| **AF-06** | Property file and PX asset upload scope | **RESOLVED.** Out of scope for the website; PX assets are PX lane owned and fail closed across properties | §8.9, §9.1 |
| **AF-07** | The `GET /branding/preview` response shape | **RESOLVED.** Two URL fields, two boolean present flags, one fallback note | §9.2 |

**One backend item remains open**, reported and not built: a **persisted, queryable**
cancellation outcome on the connection record. The live callback semantics do not need it —
§7.7 works without it — so it is scheduling work for the backend, not a website blocker.

---

## 16. Owner decisions raised by this document

`FINAL_RECONCILIATION_REPORT.md` §10's thirteen decisions and `CLAIMS_MATRIX.md` §21 and §22
remain live and are not duplicated. These are additional.

| ID | Decision | Unblocks |
|---|---|---|
| **AD-01** | **Still open.** Confirm the dashboard route, and that the authenticated tree including `Log in` stays omitted from public navigation until then. The backend signal is confirmed and the route is website owned, so this is now purely an owner decision. | The global header, the wizard exit, D1 |
| **AD-02** | **Answered** by export v2 §A item 6 and §D: no polling contract exists and no invented polling is permitted. One residual choice remains: whether to enable the bounded, website owned auto refresh that v2 allows for a pending connection. **Default is off.** | Provider connection surfaces |
| **AD-03** | Confirm that **sign out requires no confirmation dialog** (§5.3). | Account panel |
| **AD-04** | **Answered** by export v2 §A item 5 and §G: the wizard is not forced linear, each step is evaluated independently, and `resume_step` is a convenience pointer. The non linear composition stands. | Wizard navigation, mobile composition |
| **AD-05** | Confirm that **CRM `missing_api_names[]` is never shown to the agency** and is available only inside the support affordance (§8.7). | CRM health surface |
| **AD-06** | **Answered** by export v2 §A item 7: checkout is a server determined full page handoff, never a marketing site payment form. | Checkout surface |
| **AD-07** | Confirm the **chat assistant is omitted**, not rendered as a pending panel (§12). | Every page |
| **AD-08** | Confirm whether a signed in agency may reach the **public marketing tree** with the authenticated header, or whether the two trees are fully separate shells. | Shell architecture, D1 and D2 boundary |
| **AD-09** | **New.** Confirm the captcha provider (MF-08). It is the last unresolved dependency on the signup surface, and its widget dimensions and non visual alternative both depend on it. | Signup, any public form |
| **AD-10** | **New.** Confirm that public plan names may be rendered as served by the plans endpoint. Until then the plan access plane cannot show a plan column at all, and only the access model layout is available. | Plan surfaces, pricing page |

---

## 17. What is binding in this document

1. **The wizard is a hairline index.** Ten `StatusRow`s, one plane, no cards (§7.1).
2. **One 1 px hairline progress rule**, server driven, no rings, no percentages (§7.2).
3. **All eight status values render as glyph plus text plus colour**, with eight distinct glyphs
   and computed contrast on both canvases (§3).
4. **`externally_pending` never renders as complete** (§3.2, §7.8).
5. **`locked_by_plan` and `403 not_on_plan` render as honest states, never as errors** (§3.2, §4.1).
6. **No technical identifier reaches the DOM**, enforced by the §1.4 rendering boundary.
7. **No number is hardcoded** — not 7, not 10, not 14, not a quota (§1.3 rule 4). **And no price exists to render at all** (§10).
8. **No fabricated agency data**, in any state, including empty states (§1.3 rule 1).
9. **Resume lands on `resume_step`** (§7.3).
10. **Saving is explicit; there is no autosave and no autosave indicator** (§7.6).
11. **No background polling of provider status** (§7.7). Status is read after the callback, on entry to the surface, or on an explicit refresh.
12. **Interactive controls never sit on `ink-800` or `ink-50`**, and a surface step is never a
    boundary (§2.1).
13. **An upload surface is never built ahead of its contract** (§9.1).
14. **The upload preview shows the asset on both canvases** (§9.4).
15. **Checkout is a full page handoff. No payment form, no payment iframe** (§10).
16. **The website has no testimonial approval surface and never grants the extension** (§11).
17. **The mobile action row unsticks on `:focus-within`** — the keyboard never covers the submit
    (§7.9).
18. **Errors are never toasts**; one region, reserved height, no timers (§4.4).

Added by V3:

19. **No price surface exists.** No amount, currency, tax basis, billing period, discount or
    contract term, and no space reserved for one. There is no pricing authority (§10).
20. **Plan surfaces render served names and entitlements only**, never the internal plan code.
21. **Footer and signature are text fields, never uploads** (§8.3). Only logo and email banner
    are uploads, images only, at most five megabytes.
22. **OAuth returns through one shared callback route**, and a cancellation renders neutrally
    and resumably, never as a provider failure. Unknown outcomes fail safe to provider error,
    never to cancellation and never to success (§7.7).
23. **Voice is named generically.** No carrier, vendor or adapter name is ever rendered (§7.7).
24. **Every wire status value has a mapping in §3.3.1.** An unmapped value is never rendered.

---

## 18. Reconciliation of the seventeen gaps after export v2

`FINAL_RECONCILIATION_REPORT.md` §5.2 listed seventeen gaps. All were closed by the first
version of this document. This table records that none of them still carries an assumption
superseded by export v2 or the AF addendum.

| # | Gap | State after V3 |
|---|---|---|
| 1 | Signup | Closed. Language control corrected; no payment control; captcha still owner dependent (§5.1) |
| 2 | Login | Closed. Unchanged by v2 (§5.2) |
| 3 | Logout | Closed. Unchanged by v2 (§5.3) |
| 4 | Trial status surface | Closed. Reminder cadence corrected from "no contract" to backend driven (§6.1, §6.2) |
| 5 | Ten step wizard shell | Closed. Non linearity confirmed by v2 (§7) |
| 6 | Progress and resume | Closed. Projection shape confirmed (§7.2, §7.3) |
| 7 | Readiness and `activatable` | Closed. `legend` and `readiness` shapes confirmed (§7.8) |
| 8 | Dashboard handoff | Closed as far as the website can. Signal confirmed, route is an owner decision (§8.10) |
| 9 | Trial expiry | Closed. Unchanged by v2 (§6.3, §6.4) |
| 10 | Testimonial pending review | Closed. Six state model and authenticated placement corrected; media reported as backend work (§11) |
| 11 | Plan selection and upgrade | Closed and **materially corrected** — every price surface removed (§10) |
| 12 | API envelope error states | Closed and corrected — copy is now written per `code` (§4.3) |
| 13 | Loading states for authenticated data | Closed. Unchanged by v2 (§2.3, §5.0) |
| 14 | The eight connection states | Closed, plus a wire to UI mapping added (§3, §3.3.1) |
| 15 | Provider failures | Closed and corrected — shared callback route, neutral cancellation (§7.7) |
| 16 | File upload law | Closed and corrected — footer and signature are text; constraints confirmed (§8.3, §9) |
| 17 | Mobile onboarding | Closed. Unchanged by v2 (§7.9) |

---

## Status

Seventeen gaps closed and reconciled against backend export v2 and its AF addendum. Eight status
values specified with distinct glyphs, dual canvas colour and computed contrast, plus a wire to UI
mapping. Error treatment written per confirmed `code`. The ten step wizard specified as a hairline
index with server driven progress, resume, non linear navigation, explicit save, a shared OAuth
callback with a neutral cancellation state, and a 375 px composition. The upload law applied
across six asset classes: two are uploads with confirmed constraints, two are text, and two are
out of scope. Plans, subscription and checkout specified **without any price surface**, because no
pricing authority exists. The testimonial surface specified and held. Three reserved surfaces
documented and omitted. All seven AF fields resolved; one backend item reported for scheduling.

No page implemented. No component written. No system contacted. No integration wired. Every
surface disabled by default. No production readiness claim made.

**Implemented and awaiting independent technical and final audit.**
