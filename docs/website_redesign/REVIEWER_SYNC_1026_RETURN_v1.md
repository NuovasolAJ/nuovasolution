# REVIEWER R25C — E28 on the named staging build, RV4 on the final build, 3D split

**Role:** independent reviewer. No application code written or changed.
**Window:** 2026-10-26 13:10Z to 14:40Z (UTC) · **Order:** R25C (points 1–4).
**Predecessor:** `REVIEWER_SYNC_1024_RETURN_v1.md` (`611921f`), pre-check on `9f6c65e`.

| Item | Value |
|---|---|
| Final build (presentation) | `596679b` · `dpl_CCgn42YAPWwoMT3HKMnSrj4GQZHi` · `https://nuovasolution-design-preview-chhbk3js9-nuovasolajs-projects.vercel.app` · `/api/build` → `mode: stub` |
| Named staging build | `596679b` · `dpl_CWR3NKKTSgaNs64xi9eD469dyGyJ` · `https://nuovasolution-staging-preview-q98d818q2-nuovasolajs-projects.vercel.app` · `/api/build` → `mode: staging` |
| Engine | Chromium (Edge headless), 390 / 768 / 1024 / 1280 / 1440 CSS px. **Real phone and real mail client are not my check → owner view open** |

---

## 1. E28 on `dpl_CWR3NKKTSgaNs64xi9eD469dyGyJ` — measured now, not waiting

| ID | Check | Result |
|---|---|---|
| E28-1 | the named staging build answers for itself | **PASS** commit `596679b…`, deployment `dpl_CWR3NK…`, `mode: staging` |
| E28-2 | sign-up to a **deliverable** address | **PASS** 201, `message: confirm`, `next: confirm`, `session: false` |
| E28-3 | login before the confirmation | **PASS** refused with `email_not_confirmed`, no cookie |
| E28-6 | login and sign-up reachable, inner area gated | **PASS** `/es/login` 200, `/es/signup` 200, `/es/app`, `/es/onboarding`, `/es/app/reports` → 307 `/es/login?next=…` |
| E28-4 | a repeated sign-up | **not measurable right now**: the provider answers **429 `over_email_send_rate_limit`** |
| E28-5 | request the confirmation mail again | **not measurable right now**: same 429 |

**The owner's next step.** One real confirmation mail was sent, to

```
ajdg.private+rv4-202610261400@gmail.com
```

Please click the link in that mail. The moment you do, I check on **this same deployment**: which origin the link lands
on, that the login then works, that onboarding opens, and that the trial line is shown. Nothing else is needed from you.

**Origin.** The server derives the confirmation target from the request origin (`signup/route.ts`: `new URL(req.url).origin`),
so the link should return to this staging deployment. I can only confirm that from the click — that is the one piece I
cannot measure myself, because I cannot read your mailbox.

**The rate limit is the operational blocker.** Two mails per hour means a second attempt, a resend or a second tester
has to wait an hour. For a public sign-up that is not workable; it is the same cause API recorded earlier. Responsible:
API / Owner (sender and limit).

**Residue I created on staging, for API's cleanup:** one unconfirmed user for the alias above (intended), plus two
unconfirmed users from the MX measurement, `rv4-mx@test.nuovasolution.com` and
`rv4-mx-202610261400@nuova-no-mx-check.invalid`. No agency, no membership, no mail to anyone but the owner's own alias.

## 2. MX refusal — **not delivered yet**

A sign-up to a domain that cannot receive mail (`…@nuova-no-mx-check.invalid`) is still **accepted**: 201,
`message: confirm`. So the refusal the order asks me to measure is not in this build. As soon as Website ships it I
measure it the same way (one call, no mail). Closing condition: such an address is refused **before** an identity is
created, with a code the page can show.

## 3. RV4 on the final build — one finding per owner picture

Measured on `596679b` / `dpl_CCgn42YAPWwoMT3HKMnSrj4GQZHi`. Screenshots of the same crops are in the evidence folder.

| # | Owner's finding | State on the final build | Verdict |
|---|---|---|---|
| 01 | header covers the hero buttons | header `fixed`, bottom 60–72 px; the hero buttons sit at 368–611 px and are hit-testable as themselves at 390 / 768 / 1280 / 1440 | **not reproduced** — per the order I do **not** ask the owner, because it does not reproduce |
| 02 | the card before the hand-over is in order | "Tomar · Abierta · nadie la ha tomado" | **reference**, matches |
| 03 | right column cut, letter remnants | the 1024 px collapse is **gone**: 0 narrow boxes at 768 / 1024 / 1280 / 1440; after the hand-over the card shows "Tomada por Elena · Proponer la hora a Laura" with 0 clipped and 0 narrow children | **CLOSED** |
| 04 | "Estado:" line clipped, empty area | line fully visible (top 1017 vs header 72), nothing covering, no gap above 160 px | **not reproduced** |
| 05 | 3D heading cut; cards "Pendiente del equipo 3D" | heading top 96 vs header 72; **0 "Pendiente" words left** in the block; the block now carries three images and the turn video | **CLOSED** |
| 07 | Growth and Enterprise mostly "En preparación"; Enterprise thin | Enterprise now states its own case: "Hoy es una oferta por encargo: los modelos 3D se hacen ya a partir de tus planos; Instagram depende de la aprobación de la plataforma", with "Modelos 3D incluidos por encargo · **Por encargo**". Page totals: 12 × "Disponible", 16 × "En preparación" | **CLOSED as a content fix** — that preparation still outnumbers available is a product fact, honestly marked |
| 08 | "El asistente de la mañana · En preparación" contradicts the packages | both pages now say the same: `/es/platform` "En preparación · todavía no contratable" and `/es/packages` "Tareas del equipo y el asistente de la mañana · En preparación · todavía no contratable" | **CLOSED** |
| 09 | hero text very large, only three points, only Gmail | h1 **54 px over 3 lines** (was 68 over 5); "Qué hace" now lists **four** points (WhatsApp in Spanish · email in a mailbox we operate · every conversation in the record · an email alert to the right person); Gmail only, Outlook absent, which is correct against the truth table | **CLOSED** |
| 10 | trial sticker overlaps the Essential card | unchanged: the trial line is a **full-width banner above the cards** (390 px 16→374, 1440 px 113→736), nothing covered | **not reproduced** — banner versus per-card sticker is design → **owner view** |
| 11 | "Desaparece de las listas de los demás" contradicts 03; app-language line | one wording now: "Quien toma una tarea se hace cargo de ella: desaparece de las listas de los demás, y el asistente de la mañana dice quién…", while the agency's own card names the taker. The line "elegido en la aplicación" is **gone** from `/es/platform/daily-assistant`, `/es/platform` and `/es/packages` | **CLOSED** |
| 12 | accent in "envía" | present on every page checked | **CLOSED** (already in the pre-check) |
| 13 | name label over the notice | five "Laura Serrano" labels, none overlapping "El inmueble está marcado como publicable y actual" | **not reproduced** |

Pictures 06 and 14–18 are the 3D model's own findings and stay with the 3D lane.

## 4. The 3D area, kept apart

| Aspect | Result |
|---|---|
| **Design** | not my judgement. The visual verdict on the scene is **owner view** |
| **Technique** | **PASS with one defect.** The **empty/furnished pair from the same camera** is now in the build (`living-empty-1200.webp`, `living-furnished-1200.webp`, both loaded, alt "Casa de ejemplo ficticia: el mismo salón vacío y con mobiliario ilustrativo"), plus `house-both-floors-es-1600.webp`. The **turn view runs**: `house-turn-es.mp4`, 44.4 s, own poster `house-turn-poster-es.webp`, `controls`, `muted`, no autoplay, `playsInline`, `preload: metadata`; on a trusted click it plays (time 2.44 s at 390 px, 2.42 s at 1440 px, `readyState 4`). Room names are **Spanish** ("Salón · Cocina / Comedor · Lavadero · Aseo · Recibido…"), so the owner's picture-06 language point is answered on the website side. Images are `loading: lazy` and loaded. **Defect:** `living-furnished-1200.webp` carries an **empty `alt`** while its partner carries the shared description — the second half of the pair is undescribed. Closing condition: its own alt text |
| **Phone (390 px)** | **PASS** — no horizontal overflow, block width 390, the pair and the video render and the video plays. A **real** phone stays owner view |
| **Backend** | **nothing to prove**: the block has 0 canvas and no request of its own; it is static files. No backend path is claimed or needed |

## 5. Status

```
E28_STAGING_REVIEWER  = PARTIAL on 596679b / dpl_CWR3NKKTSgaNs64xi9eD469dyGyJ: build, sign-up, refusal and gates PASS;
                        origin, login, onboarding and trial await the owner's click on ajdg.private+rv4-202610261400@gmail.com
MX_REFUSAL            = NOT_DELIVERED_YET (measured: a .invalid address is still accepted)
RV4_PICTURES          = 7 closed (03, 05, 07, 08, 09, 11, 12) · 4 not reproduced (01, 04, 10, 13) · 1 reference (02)
RV4_3D                = design owner · technique PASS except the empty alt · phone PASS · backend n/a
RV3_CARRY_OVER        = 3D pair and turn view CLOSED · legal markings unchanged (imprint 308, Placeholder/Provisional)
WEBSITE_TECH_ACCEPTED = not granted here: the legal markings and the MX refusal are open, and E28 needs the owner's click
```

## 6. Evidence `review_2026-10-26/`

The probe password is **not** in the repository: it is in the secure store as `stg_website_rv4_identity.txt` (alias + password), and the committed script reads it from `RV_PROBE_PASSWORD`.

`rvk-e28.mjs` + `rvk-e28.json` (the E28 measurement incl. the rate limit and the MX probe) · `rvk-verify.json`
(the picture findings on the final build) · `rvk-3d.mjs` + `rvk-3d.json` (the 3D area at 390 and 1440 incl. playback) ·
`rvk-take.mjs` + `rvk-take.json` (the task card before and after the hand-over) · screenshots of the hero widths, the
3D block at both widths and the card after the hand-over. No credential, token or signed URL is recorded; the only
address named is the owner's own alias, which the owner needs in order to click.
