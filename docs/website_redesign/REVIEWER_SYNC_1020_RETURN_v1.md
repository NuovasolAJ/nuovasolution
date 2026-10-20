# REVIEWER R20 / RV2 — independent acceptance of the delivered build

**Role:** independent reviewer. No application code written or changed.
**Window:** 2026-10-20 07:10Z to 09:20Z (UTC) · **Order:** R20 incl. R20.1, task RV2.
**Accepted as given:** RV1 on `4110566` (`ef83f92`) — F-R16-1 and F-R16-2 closed, F-R16-3/-4 open, F-R16-5 narrowed.

| Item | Value |
|---|---|
| Commit under review | `deb9b66` |
| Deployment | `dpl_GyrsjqBQcCdg7KEXccKdUkE4v5nc` · `https://nuovasolution-design-preview-7p2xkf9hm-nuovasolajs-projects.vercel.app` |
| Self-report | `/api/build` → `{"commit":"deb9b66c43d035d7f7749d13a8dbafbfee6486ec","ref":"website_enterprise_redesign","deployment":"dpl_GyrsjqBQcCdg7KEXccKdUkE4v5nc","env":"preview","mode":"stub"}` |
| Binding (independent) | a local stub build of `deb9b66` yields **7 of 12** content-hashed chunks byte-name identical with this deployment |
| Mode | **stub**. Backend E2E is therefore "not checkable" throughout, by the order's own rule |
| Engine | Chromium (Edge headless), device emulation — **real phone and real mail client are not my check**: owner view open |

**Which build this is.** The lane has not reported a label "R20-10". `WEBSITE_R19_RETURN_v1.md` §Reviewer names
*exactly* `deb9b66` / `dpl_Gyrsjq…` for RV2 and `/api/build` confirms itself, so this report is that build's
acceptance. If a later build is delivered under the R20-10 label, the acceptance moves to it and I re-check only the
affected areas plus their regression.

---

## 0. Three separate verdicts

```
RV2_DESIGN            = PASS with two observations (phone panel height, hero scene clip 8 px)   2026-10-20T09:20Z
RV2_PRODUCT_PROMISES  = PASS for what the pages assert, 1 residual (F-R16-5 language function)
RV2_BACKEND_E2E       = NOT CHECKABLE (stub build; nothing here proves a backend path)
RV2_3D_PAIR_AND_TURN  = OPEN — the assets are not in this build (text promises them, no media present)
F-R16-3 social cover  = OPEN (unchanged) · F-R16-4 legal = PARTLY (imprint now 308, marks remain)
F-R16-1 / F-R16-2     = no regression, both still closed
OWNER_VIEW            = open: real phone, real mail client (Hosting + Owner)
```

---

## 1. Design and behaviour (measured)

| Point of the order | Result | Measurement |
|---|---|---|
| Hero at five scroll positions | **PASS, with an observation** | At 1440 × 950 the panel `.hero-panel` grows from scale 0.9 to 1.05 across the five positions and is **fully in view at positions 2 and 3**; at 390 × 844 it is 919–1074 px tall, so it is **never fully on screen at once** (visible part 0 / 466 / 844 / 507 / 92 px). Nothing is cut: `clippedText = 0`, no text pushed sideways, opacity 1 at every position, in both widths |
| Panel fully readable | **PASS** | 1,032 characters (ES desktop) and 966 (phone), no inner scrolling, no clipped child |
| Calm transition, no late loading | **PASS** | the first twelve text blocks do not move after the first paint (max shift 0 px over 4 s) |
| Clipping | **observation** | `section.hero-world` clips 8 px of its own scene layers (scrollWidth 1433 / clientWidth 1425, height 1052 / 1044). Decorative layers only, no text affected — by design, recorded so it is not mistaken for a defect later |
| Packages understandable | **PASS** | three plans **Essential · Growth · Enterprise**, each with its own promise line and rows (offices, seats, what is included); the trial sticker sits on Essential only; **no price and no monthly capacity figure** is printed — "crece en tamaño: oficinas, puestos y capacidad de consultas al mes" stays qualitative. Note for Copy: the third plan is now *Enterprise*, not *Scale* |
| Mail rendering, new weekly report layout | **PASS at surface** | `/es/app/brief` renders the mail shell ("TU MAÑANA · Así llega el resumen de la mañana · Un email corto a cada persona…"); `/es/app/reports` shows the new meaning blocks ("Lo que atendió Nuova 23", "Chances que han surgido 6", "Lo que toca hacer 2") with the demonstration label **before** the figures. A real mail client is **not** my check |
| Console | **PASS** | no application error; the only entries come from Vercel's own preview toolbar being blocked by the site's CSP |
| Routes and gates | **PASS** | `/app`, `/app/reports`, `/app/brief`, `/onboarding` all 307 → `/login?next=…` in both languages |

## 2. The 3D moment — open, and why

The block exists on `/es` as "**UN SERVICIO APARTE: PRESENTAR EN 3D** — De tu plano a una vivienda que el cliente puede
recorrer con la mirada. Nos envías el plano acotado y, si las tienes, fotos. Construimos el modelo, **lo mostramos vacío
y amueblado desde la misma cámara** y lo comprobamos contra tu plano. Cada modelo es un encargo, con o sin paquete."
Measured inside that block after scrolling the whole page: **0 images, 0 videos, 0 canvas, 0 controls.** On
`/es/platform` there is no 3D heading at all.

So the integrated empty/furnished pair (same room, same camera) and a running turn view are **not in this build**. The
text describes them as a service, which is not a false claim about the page — but the ordered visual is absent. Per the
order this part stays open and is checked on the later build that carries the assets. Responsible: 3D (delivery) →
Website (integration). Evidence: `rvh-verify2.json`, `rvh-v2-3d.png`.

## 3. Product promises (against Gate §21 and the state lines)

- Every scene carries its **State** line, and they match the proof state: "Available today: WhatsApp and email.
  Prototype: the web form and the phone call.", "Prototype · not available yet." on 3D, "Example figures · not any
  agency's data" on the summary, and on the packages page "Informe semanal · **la entrega al cliente no se mide**".
- Follow-ups appear only as "Seguimientos **solo con permiso del cliente**", proposals only "de tu propia cartera".
- No price, no monthly capacity number, no appointment confirmation promise.
- **Residual (F-R16-5):** the language scene still says the system replies in the customer's language and attributes the
  gap to the legal notice alone, while production shows Spanish only. Unchanged from RV1; closing condition unchanged
  (one proven non-Spanish reply, or a sentence that does not assert the function). Responsible: API + Copy.

## 4. The two findings carried in

- **F-R16-3 (social cover) — OPEN, unchanged.** `/es/social/post` still renders "Este inmueble no tiene imagen" for all
  three fixtures; 0 images in the list. Steps, demonstration notes and the refusal reason are present.
- **F-R16-4 (legal) — PARTLY closed.** `/en|es/legal/imprint` now answers **308** to the provisional notice instead of
  404. The three legal pages still answer 200 with `Placeholder`/`PLACEHOLDER` (EN) and `Provisional`/`PROVISIONAL` (ES).
  A technical check is not a legal clearance; the texts stay with Copy and the owner.
- **No regression** in the two points RV1 closed: the report labels its figures before showing them and no longer claims
  "nothing here is an estimate"; `/es/app` shows "Prueba activa · paquete Essential · quedan 9 días".

## 5. What remains outside this report

Backend E2E (registration to an existing agency, the report with a real permission, social up to a visible effect) is
**not checkable** on a stub build — the order's own rule, and I did not substitute a stub walk for it. Real phone and
real mail client are **owner view**, to be evidenced by Hosting and the owner. Nothing here is a legal clearance.

## 6. Evidence `review_2026-10-20/`

`rvh-rv2.mjs` + `rvh-rv2.json` (nine checks incl. the five hero positions) · `rvh-verify.mjs` + `rvh-verify.json` and
`rvh-verify2.mjs` + `rvh-verify2.json` (the panel across five positions, the plan rows, the 3D block, the social list) ·
`rvh-routes.json` (routes, gates, legal) · `dpl-chunks-deb9.txt` / `local-chunks-deb9.txt` (commit binding) ·
17 screenshots: hero 0–4 at 1440 and at 390, packages, reports, brief, the 3D block, social. No credential, token or
signed URL is recorded.
