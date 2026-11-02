# REVIEWER R26 / RV5 — technical acceptance on `3dbafd6`, and E28 closed

**Role:** independent reviewer. No application code written or changed.
**Window:** 2026-10-30 13:40Z to 15:20Z (UTC) · **Order:** R26 (goal 1 RV5 technique with Copy, goal 2 E28).
**Predecessor:** `REVIEWER_SYNC_1027_RETURN_v1.md` (`3d21ed2`) on `a945fa9`.

| Item | Value |
|---|---|
| Presentation build | `3dbafd6` · `dpl_4Qz1SE8ozqsvtD98swPxf3YrYeGK` · `…-2368s4mjg-…` · `/api/build` → `mode: stub` |
| Staging build | `3dbafd6` · `dpl_4deTgUf5EdY8z1TSFBsuFJMZw8oX` · `…-imcp8cplz-…` · `/api/build` → `mode: staging` |
| Engine | Chromium (Edge headless) at 390 / 1440 CSS px, 14 routes. **Design, real phone and real mail client stay owner view** |

---

## 0. Signals

```
RV5_TECHNIQUE          = PASS on 3dbafd6 (both named deployments), one named limit: the legal badge   2026-10-30T15:20Z
E28_REVIEWER_SIDE      = PASS 9/9 on dpl_4deTgUf5EdY8z1TSFBsuFJMZw8oX with API's reviewer identity
MX_REFUSAL             = CLOSED (email_domain_undeliverable, no 201, no identity created)
ALT_FURNISHED_3D       = CLOSED (90-character alt)
MI_AGENCIA_ACTIVE      = CLOSED (desktop header and phone sheet)
MOBILE_SUBPAGES        = PASS (14 routes at 390 px: one h1 each, no overflow, no clipped text)
LEGAL_WITHOUT_MARKS    = NOT MET — the pages carry a review badge; the texts themselves are complete
WEBSITE_TECH_ACCEPTED  = PASS 3dbafd6 · dpl_4Qz1SE8ozqsvtD98swPxf3YrYeGK + dpl_4deTgUf5EdY8z1TSFBsuFJMZw8oX
                         (scope and limits in §4)
```

---

## 1. Goal 2 — E28 in one pass, and a correction of my own

With the reviewer identity API placed in `stg_website_e28_identity.txt`, on the staging build of this commit:

| ID | Check | Result |
|---|---|---|
| O1 | the build identifies itself | **PASS** `3dbafd6`, `dpl_4deTgUf5EdY8z1TSFBsuFJMZw8oX`, `mode: staging` |
| O0 | the stored identity is readable | **PASS** two `key=value` lines, valid address, password present |
| O2 | login | **PASS** 200, session only in a cookie with `HttpOnly`, `Secure`, `SameSite=Lax` |
| O3 | `next` | **PASS** `onboarding` (this identity already carries its agency) |
| O4 | trial line | **PASS** from the backend: `status: not_started`, no horizon yet — the page shows what the backend says, it invents nothing |
| O5 | onboarding write and read-back | **PASS** 200, `Europe/Madrid` read back |
| O6 | readiness and activation | **PASS** 25 gates from the backend, activation answers `blocked`, `activated: false` |
| O7 | inner pages with the session | **PASS** `/es/app`, `/es/onboarding`, `/es/app/reports` all 200 |
| O8 | logout | **PASS** the session is dead afterwards (401) |

**Correction, mine.** My finding of 27.10. — "the stored credential does not authenticate" — was a **measurement error
on my side**: the store holds `email=…` / `password=…` pairs, and my probe read the whole line including the prefix.
The identity was fine. I withdraw that finding against API; the probe now reads both bare lines and `key=value` pairs
(`review_2026-10-30/rvm-e28.mjs`). The DB half stays with API, as ordered.

## 2. Goal 1 — RV5 technique

| Point of the order | Result |
|---|---|
| **alt of the furnished 3D image** | **CLOSED.** `living-furnished-1200.webp` now carries a 90-character alt; `living-empty-1200.webp` 75, `house-both-floors-es-1600.webp` 116. No picture in the block is without one |
| **MX refusal** | **CLOSED.** A sign-up to `…@nuova-no-mx-check.invalid` on the named staging build answers `ok: false`, `code: email_domain_undeliverable` — **no 201 and no identity created** |
| **Legal pages without placeholders** | **NOT MET, and it is not a website defect.** All seven pages are complete texts with **0** `⟦⟧` brackets. What remains is a visible review badge: ES "**Provisional**" plus "PROVISIONAL. Este texto no es definitivo y no ha sido revisado por un abogado."; EN "**Placeholder**" plus "PLACEHOLDER. This text is not final and has not been reviewed by counsel." Two asks: (a) counsel's release removes the badge, (b) until then the **EN wording should match ES** — "Provisional", not "Placeholder", because the text is not a placeholder |
| **"Mi agencia" active** | **CLOSED.** With a session: desktop 1440 → a link in the header to `/es/app`, not disabled, hit-testable; phone 390 → inside the menu sheet, 358 × 56 px, same target, next to "Cerrar sesión" (358 × 48). My first pass read the collapsed desktop copy at 390 px (0 × 0) and therefore looked like a miss |
| **All subpages on the phone** | **PASS.** 14 routes at 390 px (`/es`, the four platform pages, overview, packages, trial, contact, FAQ, sign-up, login, privacy, notice): exactly one h1 each, no horizontal overflow, no clipped text |
| **3D area as in RV4** | **PASS.** Two videos, each with its own poster, `controls`, `muted`, no autoplay: `house-turn-es.mp4` 20.5 s ("la casa entera girando en el visor · 20 segundos · sin sonido") and `living-camera-ride.mp4`. The empty/furnished pair from the same camera is in place, 0 "Pendiente" words left, 0 canvas and no own request → no backend path. **Design and the real phone stay your judgement** |

## 3. MX test users for API's cleanup list

Today's probe was **refused**, so it created nothing. Still open from the earlier rounds:
`rv4-mx@test.nuovasolution.com`, `rv4-mx-202610261400@nuova-no-mx-check.invalid`,
`rv4-mx-1027@nuova-no-mx-check.invalid`, plus the deliberate owner alias `ajdg.private+rv4-202610261400@gmail.com`
(all unconfirmed, no agency, no membership).

## 4. Acceptance

**`WEBSITE_TECH_ACCEPTED = PASS` for `3dbafd6`, deployments `dpl_4Qz1SE8ozqsvtD98swPxf3YrYeGK` (stub) and
`dpl_4deTgUf5EdY8z1TSFBsuFJMZw8oX` (staging).**

**Scope.** Routes and gates; the sign-in area with agency, package and trial line; a logout that really ends the
session; onboarding writing to the real backend and reading back; readiness from the backend with activation refused;
the MX refusal; the alt texts and media behaviour of the 3D block; 14 subpages at 390 px; and the picture findings of
the owner's series as closed in RV4 and held here.

**Named limits of this acceptance.**
1. The legal pages carry their review badge until counsel releases the texts; the EN badge should say "Provisional".
2. Design, the real phone and the real mail client are **owner view** and are not covered by a technical acceptance.
3. The DB side of E28 is API's evidence, not mine.
4. Production is untouched: both deployments are previews, `noindex`.

## 5. Evidence `review_2026-10-30/`

`rvm-e28.mjs` + `rvm-e28.json` (E28, 9 checks) · `rvm-rv5.mjs` + `rvm-rv5.json` (alt, legal, "Mi agencia", 14 mobile
routes, 3D) · `rvm-agency.mjs` + `rvm-agency.json` and `rvm-ag390.mjs` / `rvm-ag390b.mjs` + their results (the phone
case, header copy versus sheet) · screenshots of the 3D block, the home at 390 px, the session header and the open
sheet. No credential, token or signed URL is recorded.
