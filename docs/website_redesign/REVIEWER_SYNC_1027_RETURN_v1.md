# REVIEWER — E28 on the owner's flow, RV4 on the named build `a945fa9`

**Role:** independent reviewer. No application code written or changed.
**Window:** 2026-10-27 07:50Z to 09:10Z (UTC) · **Order:** the owner's message of 2026-10-27 (E28 on the card flow,
then RV4 with Copy on `a945fa9`; the 2 mails/hour limit is already with API).
**Predecessor:** `REVIEWER_SYNC_1026_RETURN_v1.md` (`d94832d`).

| Item | Value |
|---|---|
| E28 flow | `596679b` · `dpl_CWR3NKKTSgaNs64xi9eD469dyGyJ` · `…-q98d818q2-…`, `/api/build` → `mode: staging` — the deployment the owner walked |
| RV4 build (presentation) | `a945fa9` · `dpl_Ez3cribfS2nvd5HwMs39ikdV6iWy` · `…-2x7bx8vz8-…`, `/api/build` → `mode: stub` |
| RV4 build (staging) | `a945fa9` · `dpl_6yfhB3L7m64Z66mSqczrocHr1vPk` · `…-b1hg8802s-…`, `/api/build` → `mode: staging` |
| Engine | Chromium (Edge headless) at 390 / 768 / 1024 / 1280 / 1440 CSS px. **Real phone and real mail client stay owner view** |

---

## 1. E28 on the owner's flow — origin confirmed, the rest blocked on one credential

| ID | Check | Result |
|---|---|---|
| O1 | the deployment the owner used identifies itself | **PASS** commit `596679b…`, `dpl_CWR3NKKTSgaNs64xi9eD469dyGyJ`, `mode: staging` — the origin of the flow is this deployment, as the card says |
| O2 | the confirmed identity signs in there | **FAIL** — the credential pair in `~/.nuova-secrets/stg_website_e28_identity.txt` answers **400 `invalid_grant`**. I tried both line orderings (line 1 is a valid address); both fail |
| O3–O7 | next step, onboarding, trial line, inner pages, logout | **not reached** — they all hang on O2 |

**What this does and does not say.** `invalid_grant` means the pair does not authenticate; it cannot tell a wrong
password from an unknown address. What it does rule out is "exists but unconfirmed": that case answers
`email_not_confirmed`, as my own alias did yesterday on the same build. So the address you walked is very probably
confirmed — only the password in the secure store is not the one that works.

**One line from you or API closes it:** put the password you used into line 2 of
`~/.nuova-secrets/stg_website_e28_identity.txt` (or have API reset it there). My check then runs in one pass and
reports origin, login, `next`, onboarding, the trial line, the inner pages and the logout — the probe is written and
committed (`review_2026-10-27/rvl-e28.mjs`). The DB half stays with API, as you said.

## 2. RV4 on `a945fa9` — the picture findings hold

Measured on `dpl_Ez3cribfS2nvd5HwMs39ikdV6iWy`. Nothing regressed against the R24 final build:

| # | State on `a945fa9` | Verdict |
|---|---|---|
| 01 | header `fixed` 60–72 px; the hero buttons sit at 368–611 px and are hit-testable as themselves at all four widths | not reproduced |
| 03 | 0 narrow text boxes at 768 / 1024 / 1280 / 1440 | **closed, holds** |
| 04 | the "Estado:" line is fully visible (top 1065 vs header 72), nothing covering it | not reproduced |
| 05 | 3D heading clear of the header (96 vs 72); **0 "Pendiente" words**; the block now holds 3 images and **2 videos** | **closed, holds** |
| 08 | both pages say "En preparación · todavía no contratable" for the morning assistant | **closed, holds** |
| 09 | h1 54 px over 3 lines | **closed, holds** |
| 10 | the trial line is still a full-width banner above the cards (390: 16→374; 1440: 113→736), nothing covered | not reproduced — design question, **owner view** |
| 11 | one wording; "elegido en la aplicación" absent | **closed, holds** |
| 12 | "envía" with its accent | **closed** |
| 13 | five "Laura Serrano" labels, none overlapping the notice | not reproduced |

**Example labelling (promise side).** The page marks its examples consistently: "Ejemplo con personas e inmuebles
inventados", "Ejemplo · prototipo", "Ejemplo: así funcionará cuando la plataforma lo apruebe", plus "ejemplo
ficticia/ficticio" and "ilustrativo" on the 3D pictures. Media inventory: `hero-dusk-1400.webp` and four listing
pictures (`listing-est118/204/231/240.webp`) for the arrivals and product views, "Agenda y citas" present, follow-ups
only as "Seguimientos solo con permiso del cliente; propuestas solo de tu propia cartera".

**Copy's half of RV4** is theirs to sign: I checked structure, geometry, states and labels, not the wording line by
line. My technical half is done on this build.

## 3. The 3D area on `a945fa9`, kept apart

- **Technique:** the house turn view is now **20.5 s** (`house-turn-es.mp4`, own poster, `controls`, `muted`, no
  autoplay, `playsInline`), the living-room ride is still there (`living-camera-ride.mp4`), and the
  **empty/furnished pair from the same camera** is in place. Room names Spanish, images lazy and loaded, no overflow
  at 390 px, 0 canvas and no own request → no backend path involved.
- **Still open, unchanged from my last report:** `living-furnished-1200.webp` carries an **empty `alt`** while its
  partner carries the shared description. Closing condition: its own alt text.
- **Design** is your verdict; **real phone** is your view.

## 4. MX refusal — still not in the named build

On `dpl_6yfhB3L7m64Z66mSqczrocHr1vPk` a sign-up to `…@nuova-no-mx-check.invalid` is still **accepted** (201,
`message: confirm`). So the check R25C prepared is not in `a945fa9`. Closing condition unchanged: such an address is
refused **before** an identity is created, with a code the page can show.

**Staging residue for API's cleanup:** one more unconfirmed user from today's MX measurement
(`rv4-mx-1027@nuova-no-mx-check.invalid`) in addition to the three named yesterday.

## 5. Status

```
E28_REVIEWER_SIDE = BLOCKED on one credential: origin and build PASS; login, onboarding and trial await the working
                    password in stg_website_e28_identity.txt (DB half with API)
RV4_PICTURES      = 7 closed and holding · 4 not reproduced · 0 regressions on a945fa9
RV4_3D            = technique PASS except the empty alt · design and real phone = owner view
MX_REFUSAL        = NOT in a945fa9 (measured)
WEBSITE_TECH_ACCEPTED = not granted: the empty alt, the MX refusal and the legal markings are open, and E28 is unproven
                    on the reviewer side
```

## 6. Evidence `review_2026-10-27/`

`rvl-e28.mjs` + `rvl-e28.json` (the E28 attempt on the owner's deployment) · `rvl-try.mjs` + `rvl-try.json` (both
credential orderings, values never printed) · `rvl-verify.json` (the picture findings on `a945fa9`) ·
`rvl-3d.json` (the 3D area at 390 and 1440 with the 20.5 s turn view) · screenshots. No credential, token or signed URL
is recorded.
