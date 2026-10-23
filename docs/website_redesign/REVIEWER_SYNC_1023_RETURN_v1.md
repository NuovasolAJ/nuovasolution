# REVIEWER R23 / RV3 — presentation build and staging build of `a76e6e1`

**Role:** independent reviewer. No application code written or changed.
**Window:** 2026-10-23 08:10Z to 10:05Z (UTC) · **Order:** R23, task 1 (RV3).
**Predecessor:** `REVIEWER_SYNC_1020_RETURN_v1.md` (`a827531`) on `deb9b66`.

| Item | Value |
|---|---|
| Commit under review | `a76e6e1` (both builds, confirmed by each build itself) |
| Presentation build | `dpl_GLRzbYXujgTNW1MvS6TboEyF889m` · `https://nuovasolution-design-preview-n67lo7zbl-nuovasolajs-projects.vercel.app` · `/api/build` → `mode: stub` |
| Staging build | `dpl_3n3TwzpayrxptkGYNuWCih8qBJjW` · `https://nuovasolution-staging-preview-j7f6e9t1u-nuovasolajs-projects.vercel.app` · `/api/build` → `mode: staging` |
| Binding (independent) | a local stub build of `a76e6e1` yields **7 of 12** content-hashed chunks byte-name identical with the presentation build |
| Engine | Chromium (Edge headless), device emulation. **Real phone and real mail client are not my check → owner view open** (Hosting + Owner) |

---

## 0. Verdicts, kept apart

```
RV3_DESIGN            = PASS with two observations (phone panel height, 8 px scene clip)   2026-10-23T10:05Z
RV3_PRODUCT_PROMISES  = PASS against Gate §24; no residual left from F-R16-5
RV3_BACKEND_E2E       = PARTIAL on the real staging build: the protections and the sign-up half hold;
                        confirmation and the agency step are NOT CHECKABLE (reasons in §3)
F-R16-3 social cover  = CLOSED
F-R16-4 legal         = PARTLY (imprint 308 in both languages; placeholder markings remain)
F-R16-5 language      = CLOSED
3D pair / turn view   = OPEN (no media in the block; 2 "pending" marks)
REGRESSION F-R16-1/-2 = none
```

---

## 1. Design and behaviour — presentation build

| Point | Result | Measurement |
|---|---|---|
| Hero at five scroll positions | **PASS, two observations** | `.hero-panel` never cuts text (`clippedText = 0`, nothing pushed sideways, opacity 1 at all five positions, scale 0.9 → 1.05). At 1440 × 950 it is fully in view at positions 2 and 3; at 390 × 844 it is 919–1074 px tall and therefore **never fully on screen at once** (visible 0 / 466 / 844 / 507 / 92 px) — unchanged from `deb9b66`. `section.hero-world` still clips 8 px of its own decorative layers (1433 / 1425 px), no text affected |
| Calm transition, no late loading | **PASS** | the first twelve text blocks move 0 px in the 4 s after the first paint |
| Packages understandable | **PASS** | Essential · Growth · Enterprise, no price, no capacity figure, trial sticker on Essential only. New and good: **every feature row carries its own state** — "Respuestas automáticas · Disponible · en español", "Etiquetas de email · Disponible · con Gmail", "Fichas de cliente (CRM) · Disponible · una ficha por consulta", "Avisos de consultas importantes · Disponible · por email, todavía sin horario de oficina", "Informe semanal · Disponible: el informe en tu acceso · En preparación: el resumen semanal por email" |
| Weekly report and mail | **PASS at surface** | `/es/app/reports` shows the new tiles ("Lo que atendió Nuova", "Chances que han surgido", "Lo que toca hacer") with the demonstration label **before** the figures; `/es/app/brief` renders the mail shell. A real mail client is owner view |
| Social covers (F-R16-3) | **CLOSED** | `/es/social/post` now serves two listing covers (`listing-est118.webp`, `listing-est204.webp`); the "no tiene imagen" state only remains where a listing has none |
| Routes and gates | **PASS** | `/app`, `/app/reports`, `/app/brief`, `/onboarding` → 307 `/login?next=…` in both languages |
| Console | **PASS** | no application error |

## 2. Product promises against Gate §24

- **F-R16-5 is closed.** The language line now reads "**Hoy respondemos en español. En otro idioma no se envía nada
  automáticamente.**" It no longer asserts the function in other languages and no longer blames the legal notice alone.
  That matches the production column (Spanish only) and Gate §24's "no customer path fully closed".
- Per-feature states on the package rows (above) separate "Disponible" from "En preparación" row by row.
- No price, no capacity figure, no appointment promise; the alert is named with its limit ("por email, todavía sin
  horario de oficina"); the weekly mail is named as in preparation while the report in the login is available.
- The 3D block remains a **service** description ("Cada modelo es un encargo"), with two "pending" marks.

## 3. Backend E2E — the real staging build, judged on its own

| ID | Check | Result |
|---|---|---|
| S1 | the build identifies itself | **PASS** `mode: staging`, commit `a76e6e1`, deployment `dpl_3n3Twzpay…` |
| S2 / S3 | no session · self-made token | **PASS** 401 `no_session` both |
| S10 | valid session, foreign `Origin` | **PASS** 403 `forbidden` |
| S11 | agent role writing business data | **PASS** 403 `forbidden` |
| T6-7 | **a brand-new identity can sign up** | **PASS** — `/api/bff/signup` with a fresh `@test.nuovasolution.com` address answers **201 ok** (the old `invalid_email` block is gone), and signing in before confirmation is correctly refused with **`email_not_confirmed`**. The sign-up half of E28 is therefore proven on the real backend |
| T6-1 | the reserved test identity signs in | **FAIL** — `stg_website_t6_identity.txt` answers **400 `invalid_grant`**. Both lines of the file parse correctly (e-mail by strict pattern, the other line as password), so the stored password no longer matches that identity |
| T6-3…T6-6 | agency step, onboarding write, readiness, logout with a real session | **NOT CHECKABLE** — they depend on T6-1 |

**Finding R23-1 (P1, API).** The reserved fixture "confirmed · no agency · no membership"
(`API_TO_IMPLEMENTER_2026-09-30_T6_IDENTITY_v1.md`) no longer authenticates on the staging deployment. Without it, and
without a readable mailbox for the sign-up domain, the chain *confirmation → create agency → onboarding → agency, admin
and trial exactly once* cannot be walked by me. Closing condition: either a working reserved identity in that state, or
an API-side confirmation of a reviewer sign-up, named in the secure store. Then this chain runs in one pass — the probe
is committed (`rvi-t6.mjs`) and needs no change.

**Finding R23-2 (P2, API/Website, observation).** The allow-list and `site_url` that API documented point at the
earlier preview origin (`…-git-w-44e113-…`), not at this staging deployment. A confirmation link for a sign-up made
here would therefore not return to this deployment. Not measurable without sending mail; recorded so the mail path is
set up against the right origin.

## 4. What is explicitly not closed

- **3D pair and turn view:** the block on `/es` carries the text ("lo mostramos vacío y amueblado desde la misma
  cámara") but **0 images, 0 videos, 0 canvas**; on `/es/platform` there is no 3D heading. Open for the build that
  ships the assets (3D delivers → Website integrates).
- **F-R16-4:** `/en|es/legal/imprint` answer 308 to the notice; the three legal pages still carry `Placeholder` (EN)
  and `Provisional` (ES). A technical check is not a legal clearance.
- **Owner view:** real phone, real mail client.

## 5. Evidence `review_2026-10-23/`

`rvi-t6.mjs` + `rvi-t6.json` and `rvi-staging.mjs` + `rvi-staging2.json` (the staging build: gates, roles, origin,
sign-up, the reserved identity) · `rvi-rv2.json` and `rvi-verify2.json` (presentation build: hero at five positions,
plan rows, 3D block, social covers) · `rvi-routes.json` (routes, gates, legal) · `rvi-home-es.txt` (the language line) ·
`dpl-chunks-a76.txt` / `local-chunks-a76.txt` (binding) · screenshots of the hero positions, packages, reports, brief,
the 3D block and social. No credential, token or signed URL is recorded anywhere.
