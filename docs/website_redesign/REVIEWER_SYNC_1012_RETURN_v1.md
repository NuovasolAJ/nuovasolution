# REVIEWER R16 — independent acceptance of the delivered deployment

**Role:** independent reviewer. No application code written or changed.
**Window:** 2026-10-12 07:30Z to 09:40Z (UTC) · **Order:** `AUDIT_TO_LANES_2026-10-10_R16.md` → Reviewer, plus the owner's R16 message.
**Predecessor:** `REVIEW_2026-10-01b.md` (`a4b93ef`, `3d662e1`) — superseded, not carried over.

| Item | Value |
|---|---|
| Commit under review | `2561247` (the lane's delivery, `08ecf9c` + the hero chip contrast fix) |
| Deployment | `dpl_34uYqcvqTJMkkh12WK9c9G5wXHsN` · `https://nuovasolution-design-preview-qf57ksuey-nuovasolajs-projects.vercel.app` |
| Build id served | `fXKL03on6injqP-C5g22H` · `X-Robots-Tag: noindex, nofollow` on every sampled route |
| Binding (independent) | a local stub build of `2561247` produces **7 of 12** content-hashed chunks byte-name identical with this deployment; the differing five are the app-router entry chunks |
| Mode | **stub / design preview**. The staging build is deliberately held on `486bfe8` (`.staging-hold`), so **no backend path could be exercised** |
| Engine | Chromium (Edge headless) with device emulation — an approximation, **not Safari** |

> Technical acceptance only, and only for what this deployment can show. The visual verdict stays with the owner.

---

## 0. Signals

```
WEBSITE_TECH_ACCEPTED = FAIL  2561247 · dpl_34uYqcvqTJMkkh12WK9c9G5wXHsN        2026-10-12T09:40Z
  — accepted scope and the three reasons in §4; no backend path is accepted from a stub preview
R16_ROUTES            = 32 checked · 24×200 · 6×307 (login gate) · 2×404 (imprint)
R16_GENERAL           = PASS  (no overflow, reduced motion, focus, media, 4 viewports, EN/ES)
R16_CUSTOMER_PATHS    = PARTIAL (stub only: sign-in area, reports, social, onboarding, logout)
R16_CLAIMS            = 1 open capability claim on the public page (language), the rest hedged correctly
```

---

## 1. What this deployment does correctly (measured, not reported)

| ID | Check | Evidence |
|---|---|---|
| R16-01 | `/es/app`, `/es/app/reports`, `/es/onboarding` are **gated** before any session: 307 → `/es/login?next=…`, both languages | `rvf-routes.json` |
| R16-02a | after the stub sign-in the area names the agency ("TU AGENCIA · DEMO AGENCY (STUB)"), the **trial** ("Prueba activa · quedan 9 días") and carries a **log-out control** in the header | `rvf-detail.json`, `rvf-1440-es-app.png` |
| R16-06 | **log out really ends the session**: the control is a real button, and a second visit to `/es/app` lands on `/es/login?next=%2Fes%2Fapp` again | `rvf-walk.json` |
| R16-05 | onboarding offers `nuovasolution` **and** `google_sheets`; staying on the built-in CRM saves and answers "Guardado", under the visible preview band | `rvf-walk.json`, `rvf-1440-es-onboarding.png` |
| R16-04 | the social screens carry the ordered steps — "1 Elegir un inmueble · 2 Crear el texto · 3 Aprobar · 4 Publicar" — each listing says "Datos de demostración: esta acción no envía nada aquí", and a listing that may not be published states **its reason** | `rvf-detail.json`, `rvf-det-social-post.png` |
| R16-07 | no horizontal overflow on eight public routes × four viewports (360 / 390 / 768 / 1440), EN and ES | `rvf-walk.json` |
| R16-09 | with `prefers-reduced-motion: reduce`: 0 animations running, 0 clips playing, 0 text elements left hidden | `rvf-walk.json` |
| R16-10 | 25 of 25 first focusable elements show a focus ring; 49 focusable elements on the home page | `rvf-walk.json` |
| R16-11 | 13 images, **0 broken**; the one clip has a poster, is muted and has controls, and does not autoplay with sound | `rvf-walk.json` |
| R16-claims | the story hedges where it must: "Nada se compromete: ni precio, ni fecha, ni disponibilidad", "Sin disponibilidad confirmada no se afirma disponibilidad", "Cada cliente sabe que responde un asistente"; the figure block is labelled "Cifras de ejemplo" and the scenes "Ejemplo con personas e inmuebles inventados" | `home-es.txt`, `home-en.txt` |

---

## 2. Findings

**F-R16-1 · The weekly report shows a full set of figures and denies being an estimate (P2, Website + Reporting).**
Route: `/es/app/reports` (after the stub sign-in), deployment `dpl_34uYqcvqTJMkkh12WK9c9G5wXHsN`.
Reproduction: open `…/api/bff/auth/login?stub=1&next=%2Fes%2Fapp`, then `/es/app/reports`.
Visible effect: the page reads "Cuentas de los registros que Nuova guarda en los canales conectados. **Nada aquí es una
estimación**", then a period, a generation time and the counts 23 / 23 / 6 / 4 / 2 / 11 / 2 / 4 plus a channel split and
a week-on-week comparison. The demonstration label — "Datos de demostración: la semana del ejemplo de la página de
inicio" — stands at the **very end**, after everything. The order's expected state for this deployment, "awaiting
contract, without a figure", is not present; `REPORTS_CONTRACT_REQUEST_1010` is still unanswered and
`ACCEPTANCE_LIST_1010` C-5 says no reporting exists.
Responsible: Website (placement), Reporting/Lead + API (the contract).
Closing condition: either the awaiting-contract state without figures on this deployment, or the demonstration label
**above** the figures and the sentence "Nada aquí es una estimación" removed while no contract exists.
Screenshot: `rvf-det-reports.png`.

**F-R16-2 · The session area does not name the package (P3, Website).**
Route: `/es/app`, `/es/app/reports`, `/es/social/settings` — no plan name anywhere. Only `/es/onboarding` says
"Tu plan · Tu prueba tiene el alcance de Essential durante 14 días".
Visible effect: a signed-in agency sees the trial days but not which package the trial maps to, on the page the order
names for it.
Closing condition: the package name next to the trial line in the session header or on `/app`.

**F-R16-3 · No cover image reaches the social screen (P3, Website + Social).**
Route: `/es/social/post`. All three fixtures render "Este inmueble no tiene imagen", so the `cover_url` path the order
asks about is **not demonstrated** on this deployment; approval and refusal reasons are.
Closing condition: one fixture with a cover image, or a stated reason why no cover exists in the read model.

**F-R16-4 · Legal pages are live but marked, imprint missing (P2, Copy + Owner).**
Routes: `/en|es/legal/privacy`, `/legal/terms`, `/legal/data-deletion` answer 200 and carry `PLACEHOLDER` (EN) and
"Provisional" (ES) markings; `/en/legal/imprint` and `/es/legal/imprint` answer **404**.
Closing condition: `LEGAL_PAGES_FINAL` adopted (marks = 0) and a decision whether an imprint route is required; until
then the preview stays `noindex`, which it is.

**F-R16-5 · One capability claim on the public page is not backed (P1 for publication, Copy + API — already a gate row).**
Route: `/es` and `/en`, story B and the menu: "Cada consulta recibe respuesta **en su idioma**" / "Nuova replies to each
customer in their language". `ACCEPTANCE_LIST_1010` A-1/A-2 records that production replies exist **in Spanish only**.
The public pages carry no "in preparation" label by decision, so this row must be closed before publication, not before
the preview.
Closing condition: A-1/A-2 of the acceptance list signed off, or the sentence narrowed to the proven language.

**I-1 (INFO) · Decorative text below the contrast floor.** At 360 / 390 / 768 px the story letters "A"…"F"
(40 px, champagne on cream, **2.14 : 1**, `aria-hidden="true"`, class `story-letter`) and the step numbers "03"/"04"
(13 px, **4.29 : 1**, also `aria-hidden`) stay under the floor. They are decorative and repeated in the visible labels,
so this is not a defect under WCAG; it is listed because it is a visible design choice. No non-decorative text on the
public routes is below the floor at any of the four viewports.

**I-2 (INFO) · Console errors come from Vercel, not from the site.** Every logged error is
`vercel.live/_next-live/feedback/feedback.js` being blocked by the site's own Content Security Policy — the preview
toolbar, not application code. No failed application request was recorded.

---

## 3. What could not be checked, and why

| Path from the order | State | Reason |
|---|---|---|
| CTA → registration → onboarding → **existing agency** → logout against a backend | **not run** | the staging build is held on `486bfe8`; this deployment is a stub. A stub walk is not a backend path and is not accepted as one |
| Report link → login → **own report with the correct permission** | **not run** | same; the report runs on a proposed op with a fixture |
| Social → draft → approve → **visible effect** | **not run** | 0 provider calls by design; the screens are read-only against a staging read model that this deployment does not reach |
| 3D media | **not run** | `docs/website_redesign/media_in_3d/` does not exist yet in the repository; nothing was handed over |

---

## 4. Acceptance

`WEBSITE_TECH_ACCEPTED = FAIL` for `2561247` · `dpl_34uYqcvqTJMkkh12WK9c9G5wXHsN`.

**Accepted scope (technical, this deployment):** route and gate behaviour, the session area's agency and trial display,
a log-out that really ends the session, onboarding on the built-in CRM with an honest save message, the social screens'
steps and refusal reasons, layout integrity at four viewports in both languages, reduced motion, keyboard focus, media
loading, and the hedging of the story's claims.

**Why not a full acceptance:** (1) the three decisive customer paths exist here only as stub or demonstration, and the
order forbids accepting them as working backend paths; (2) F-R16-1 — the report asserts counted records and denies being
an estimate while no reporting contract exists; (3) F-R16-4/F-R16-5 — legal marks and the language claim are open gate
rows for publication.

After corrections I re-check only the affected areas plus the regression they touch, on the next delivered commit and
deployment.

## 5. Evidence `review_2026-10-12/`

`rvf-routes.mjs` + `rvf-routes.json` (32 routes) · `rvf-walk.mjs` + `rvf-walk.json` (12 checks incl. the walk) ·
`rvf-detail.mjs` + `rvf-detail.json` and `rvf-detail2.mjs` + `rvf-detail2.json` (the real texts and the contrast
context) · `dpl-chunks-2561.txt` / `local-chunks-2561.txt` (commit binding) · `home-es.txt`, `home-en.txt` (claim scan) ·
screenshots of the app, the report, the social post screen, onboarding, home at 1440 and 390 and the story at 390.
No credential, token, cookie or signed URL is recorded.
