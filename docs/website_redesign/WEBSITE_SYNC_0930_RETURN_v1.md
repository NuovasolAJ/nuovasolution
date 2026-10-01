# WEBSITE SYNC 0930 — implementer return v1

**Orders:** owner order of 2026-09-30 and `AUDIT_ORDERS_2026-09-30` R2.4 (Website implementer) · **Lane:** Website Implementer
**Written:** 2026-10-01 · **Branch:** `website_enterprise_redesign`, pushed, no force push · **Code:** `3d662e1` (on `e630b5b`)
**Base:** `3c38f8d`; on the branch below `e630b5b`: Copy `e5437df` (COPY_DELTAS_0930, FAQ KB v1.2, legal v3) and the
reviewer's `7abc1d7` (review of the delivered `3c38f8d`).
**Status wording:** implemented and awaiting independent technical and final audit. The visual direction is the owner's
(accepted 2026-09-30, also on the phone); `WEBSITE_OWNER_ACCEPTANCE` stays the owner's signal.

Receipt: `backend_handoff/handoff_in_2026-09-30/` (AUDIT_ORDERS, PRODUCT_TRUTH_TABLE v1.1, HOSTING_SUBPROCESSORS,
MEDIA_RETENTION_TEMPLATE, META_LAB_OWNER_STEPS, WEBQA_BACKEND_READY), `COPY_DELTAS_0930.md`, `REVIEW_2026-10-01.md`
and API's `website_test_identity_muo5ipja.json`: received, read, compared with `3c38f8d`, integrated or answered below,
tested.

## 0. Signals

```
WEBSITE_ROUND_0930     = 3d662e1  dpl_CrPSKn1epivVHFWJ85no6ANkmzmf  dpl_78kPC8ze5c8GjpZZj74ooLHKGKx2
   design   https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app   (…-dfucsv37i-…, stub, noindex)
   staging  https://nuovasolution-staging-preview-git-w-44e113-nuovasolajs-projects.vercel.app  (…-8z5d8jeie-…, staging fflmmzapksycjfdcjdtd, noindex)
   (the full suite set ran on e630b5b: design dpl_HMrZUXBNSxoesW2GFoEjNF5ARixh, staging dpl_FedXdXPchSC8LTR9LpyoCBino55d; §5)
OWNER_RESUME_READY     = YES  https://nuovasolution-staging-preview-git-w-44e113-nuovasolajs-projects.vercel.app/es/login   (§1; screens and abort rule there)
FAQ_PAGE               = LIVE ON BOTH PREVIEWS  /en/faq · /es/faq  (Copy's FAQ_PAGE_COPY, 34 questions); question box OFF on every build
WEBSITE_QA_WIRED       = unchanged (e8b4e79) but SWITCHED OFF until WEBQA_MODEL_ROUTE + reviewer browser E2E + faq-kb-v1.2
REVIEW F1 contrast     = closed in code, measured 0 of all comparisons below 4.5 : 1 on the deployment (§4)
REVIEW F2 ES clipping  = closed in code, measured 0 texts wider than their box at 768 / 1024 / 1280, ES and EN (§4)
REVIEW F3 assistant    = replaced by the FAQ as ordered; the assistant path itself stays Hosting's
DAILY_CLIP_V2          = NOT DELIVERED by Daily; the existing clip carries Copy's new subtitles (caption line + WebVTT)
SOCIAL_UI              = unchanged STAGING_USABLE (read only); actions not started: no lab release, no action contract activated
WEBSITE_OWNER_ACCEPTANCE = (owner)
```

## 1. T6 — owner resume, walked with API's test identity

API delivered a confirmed staging identity without an agency (`stg_website_t6_identity.txt` in the secure store, confirmed, no agency, reserved
fixture; API evidence `website_test_identity_muo5ipja.json`, 8/8, owner account untouched). I walked the real browser
path on the HTTPS staging alias with it, then a second visit. Script: `scripts/e2e/owner-resume-browser.mjs`;
evidence: `docs/website_redesign/evidence_2026-09-30/owner_resume/`.

| # | Check | Result |
|---|---|---|
| OR-01 | the confirmed identity logs in through the form and is taken to `/es/onboarding` | PASS |
| OR-02 | without an agency the page shows the agency step, not the setup and not an error | PASS |
| OR-03 | no sign-up call, no second confirmation e-mail | PASS |
| OR-04 | the state route says `register` and carries no tenant id | PASS |
| OR-04b | the agency step asks for the agency only: no e-mail field, no password field | PASS |
| OR-05 | naming the agency opens the agency setup | PASS |
| OR-06 | after a reload: the same agency, setup shown, no agency step, 10 steps, trial present | PASS |
| OR-08 | the onboarding shows the named agency and one trial line, "Te quedan 14 días de prueba." | PASS |
| OR-09 | on a phone, after another reload, the same onboarding, no horizontal overflow | PASS |
| OR-10 | a second login goes straight to the setup; the agency step does not come back | PASS |
| OR-11 | a repeated register answers `already_registered` and changes nothing: first name kept, one trial line | PASS |
| OR-07 | (first run) my script expected a refusal for a repeated register; by contract a repeat answers `already_registered` with 200. The script was corrected; the second visit (OR-11) proves the contract behaviour on the same identity | script error, not a site defect |

The test identity now has one agency ("Agencia de prueba 2026-09-30"); it cannot be used for a first registration
again. The owner's identity was not used, read or changed by me.

**For the owner (T6):**
- Open `https://nuovasolution-staging-preview-git-w-44e113-nuovasolajs-projects.vercel.app/es/login`, log in with
  the access of 22.09.
- Expected: the page "Configura tu agencia." with a box **"Pon nombre a tu agencia"**: three fields only (Nombre de la
  agencia · Idioma principal con tus clientes · Zona horaria) and the button **"Crear agencia y continuar"**.
- After the button: "Configura tu agencia." with your agency name, "… de 10 pasos hechos" and **"Te quedan 14 días de
  prueba."** Reload once: the same page, no name box again.
- **Abort rule:** stop and enter nothing if the page asks you to create an account (name, e-mail, password: "Crea la
  cuenta de tu agencia"), asks you to confirm your e-mail or says a new e-mail was sent, shows an error, or already
  shows an agency name you did not enter. Then tell me what you saw.
- The reviewer reads the effect afterwards through API: one agency, one admin, one trial.

## 2. The question box replaced by the checked FAQ

- The box is **off by default on every build** (`lib/contracts/surface.ts`). It returns only when a deployment sets
  `NEXT_PUBLIC_QA_SURFACE=public`. While it is off, `/api/qa` forwards nothing even if the server still holds the
  assistant target. On the staging project the switch was removed (2026-10-01); the three server variables stay
  unused for the day the box returns.
- `/en/faq`, `/es/faq`: Copy's FAQ_PAGE_COPY in five groups, every answer traced to its KB row (`lib/content/faq.ts`).
  No question is folded away, the contact line offers the address and promises no reply. Linked from the home page
  (four answers: Q-03, Q-07, Q-43, Q-27, my choice), the packages FAQ and the footer.
- The box's own code stays tested on a demo build: question-box states 11/11, stub suite with the box 58/58.
- Conditions to switch it on again, unchanged: Hosting `WEBQA_MODEL_ROUTE`, the reviewer's browser E2E with visible
  answers in EN and ES, and the backend answering from `faq-kb-v1.2` (Copy found staging on `faq-kb-v1.0`).

## 3. The three layers over the journey: the deck

Built first on the journey of the home page, proven on desktop and phone, then judged across the page:

- **Ground:** the sand band. **Front:** each stage is a white card with a firmer contour and a two-part shadow.
  **Product:** the real surface on its coloured field inside the card.
- **Desktop (from 1024 px wide and 700 px high):** each stage sticks below the header, a few pixels lower than the one
  before, and the next stage slides over it; the covered stage steps back slightly (scale 3.5 % and a light veil). A
  stage taller than the window sticks only once its end is in view, so every stage is read to its end before anything
  covers it. Scrolling stays the browser's own (`position: sticky`, `components/site/stack-deck.tsx`).
- **Phone, short windows, reduced motion, no JavaScript:** the same stages one after the other, nothing sticks.
- Proof, `scripts/design/deck-probe.mjs`, EN and ES, local and on the deployment: **30/30** — deck on at 1440×900,
  1280×800, 1024×768; every stage seen from top to end before it is covered; deck off at 1024×640, 390×844 and with
  reduced motion; every requested scroll position reached (no hijacking); no horizontal overflow; the section after
  the deck free. Frames of each hand-over at 1440 and 1024 px and each stage on the phone:
  `design_probe_2026-09-30/deck/`, `…/deck_deployed/`.
- Across the rest of the home page: the four trial questions next to the offer are one white stage instead of four
  loose boxes; the FAQ answers sit on one white stage on the sage band.

## 4. Rest of the order and the reviewer's findings

| Item | What changed | Evidence on `e630b5b` |
|---|---|---|
| Direction on the remaining routes | platform, the four product pages, trial, contact, login, sign-up, the four legal pages, FAQ: bands as ground, white stages for surfaces, forms and lists, one closing band component; the platform example as three white stages | page capture (§5) |
| Platform: phone, 3D, social (D-48, D-49, D-52) | the four modules first; then "On request" with 3D only (with what the customer sends and what we check, no automatic rebuild); then "Being built" with the phone, which says it cannot be ordered; social nowhere | route scan guards the old phone sentence |
| COPY_DELTAS_0930 D-45 … D-53 | all applied, EN and ES | route scan guards the replaced sentences |
| Conversion path | Home → Packages → Sign-up → agency step → Onboarding, confirmation landing, expired link: clicked like a visitor, every page has a way forward, every primary control leads to sign-up | design 28/28; staging 24/24 up to the filled form (nothing sent) |
| Daily clip | Copy's three subtitles (before → action → result) as the caption line and as a WebVTT track in the page language, off by default so nothing covers the recording | clip 21/21 on the deployment |
| **F1** contrast | muted `#635f58`, accent `#735827`, attention `#7f531e`, positive `#3a634b`: each ≥ 4.5 : 1 on every light ground of the site | `contrast-check.mjs`: 0 comparisons below the floor on the deployment; the same script finds 441 distinct texts below it on the `3c38f8d` deployment |
| **F2** Spanish fit | full-width buttons wrap, button rows wrap, surface headers wrap, the feature list is one column where it shares the row at 768 px | page capture now measures every text wider than its box: it flags the four cut buttons of `/es/packages` on the `3c38f8d` deployment and nothing on `e630b5b` |
| Preview marker over cards (review §1) | upright in the left gutter | — |
| **F3** assistant | replaced by the FAQ (§2) | stub suite `QA-OFF` |
| Qualification claim on the CRM page (found by my close-up check, `3d662e1`) | the CRM lead, one point marked live and the example still said every enquiry is recorded "with its qualification"; the onboarding CRM choice promised "qualification and priority". Replaced with Copy's formula "what the customer asked for" (D-12, D-26). Interim, for Copy | route scan now guards the wording, EN and ES |

## 5. Self check on `e630b5b`

"Deployed" = the HTTPS alias, logged out. The full set ran on `e630b5b` (design `dpl_HMrZUXBNSxoesW2GFoEjNF5ARixh`,
staging `dpl_FedXdXPchSC8LTR9LpyoCBino55d`). `3d662e1` changes text only (§4, last row); on its deployments the route
scan, the link matrix, the contrast check, the deck probe and the CRM page capture ran again, locally the stub suite.

| # | Suite | Where | Result | Evidence |
|---|---|---|---|---|
| 1 | Route scan (every route EN/ES incl. `/faq`, hidden slugs 404, noindex, clips as video, the replaced sentences and the qualification wording absent) | deployed design · staging, `3d662e1` | 54/54 · 54/54 | `evidence_2026-09-30/deployed_*/route-scan.json` |
| 2 | Link and CTA matrix (35 pages EN/ES, every link followed, the calendar opens) | deployed design · staging, `3d662e1` | 1048/1048 · 1048/1048 | `…/deployed_*/LINK_CTA_MATRIX.md` |
| 3 | Page capture: 17 routes × EN/ES × 1440, 1024, 768, 390, 360, 200 % — one h1, no overflow, **no text wider than its box**, no broken image, starts at the top | deployed design `e630b5b`; CRM page again on `3d662e1` | 204/204; 12/12 | `design_probe_2026-09-30/pages/`, `…/pages_3d662e1_crm/` |
| 4 | Deck (§3) | local and deployed `3d662e1` | 30/30 · 30/30 | `design_probe_2026-09-30/deck*/` |
| 5 | Contrast of every small text against its ground | deployed `3d662e1` | 0 below 4.5 : 1 (the `3c38f8d` deployment: 441 distinct texts below) | `…/contrast_deployed/contrast-results.json` |
| 6 | Conversion path, clicked | deployed design · staging | 28/28 · 24/24 | `…/conversion_design/`, `…/conversion_staging/` |
| 7 | Daily clip incl. subtitle track | deployed design | 21/21 | `…/clip_design/` |
| 8 | Navigation (top of page, back, anchors, deep link, language switch, nothing folded) | deployed design | 13/13 | `…/navigation/` |
| 9 | Form states; on staging a login without an account | deployed staging | 18/18 | `…/form_states_staging/` |
| 10 | Social screens with the reviewer tenant | deployed staging | 14/14 | `…/social_staging/` |
| 11 | Owner resume with API's test identity, then a second visit | deployed staging | 10 PASS + 1 corrected script expectation (§1) · 3/3 | `…/owner_resume/` |
| 12 | Probe: keyboard, menu, sheet, 200 %, reduced motion, no-JS content, the FAQ in place of the box | local | 94/94 | `design_probe_2026-09-30/probe/` |
| 13 | Stub end to end (box off) · with the box on (demo build) | local | 55/55 · 58/58 | `…/stub/`, `…/stub_qa_demo/` |
| 14 | Question-box states (demo build, contract mock) | local | 11/11 | `…/qa_states/` |
| 15 | Staging end to end (real login, writes, upload, refusals) | local staging build against `fflmmzapksycjfdcjdtd` | 27/27 | `…/staging/` |
| 16 | Mode gate | local | 11/11 | `…/mode-gate-results.json` |
| 17 | `tsc --noEmit`, `next build` stub, demo and staging | local | clean | — |

**Performance**, `3c38f8d` against `e630b5b`, same machine, five cold runs each, interleaved, medians
(`…/performance/PERFORMANCE.md`): layout shift 0 at load and after scrolling the whole page, before and after; 0 kB of
video before play. Main-thread blocking on the throttled phone **259 → 74 ms (EN)** and **313 → 55 ms (ES)**: the
question box's script is gone. Largest paint on the desktop 916 → 812 ms (EN), 808 → 824 ms (ES); on the throttled
phone ES 2588 → 2596 ms and **EN 3108 → 3364 ms** (single runs 2664–3144 before, 2784–3424 after, so the ranges overlap;
I report it rather than call it noise). The home page is 163 px longer on the desktop (the deck's spacing and the FAQ
section).

**Pictures:** committed are every result file, the direction close-ups (72, `design_probe_2026-09-30/direction/`), the
deck frames, the four scroll clips of the home page (`…/scroll/`, EN/ES, desktop and phone, the deck visible on the
desktop clips) and the pictures of the clip, conversion, form and resume suites. The large sets (pages, probe, social;
468 pictures) are packed as `evidence-pictures.tar.gz` in the repository root, not committed: 110 820 441 bytes,
SHA-256 `35b9faee7906d7dd440e5962f6560463522b96f6ef219e231adfe942b33c9215`; the SHA-256 of every picture is in the
committed `evidence_2026-09-30/PICTURE_ARCHIVE.sha256.txt` (`scripts/design/evidence-archive.mjs`).

## 6. For Copy

- FAQ_PAGE_COPY says "twenty-six questions"; the five tables hold **34**. All 34 are on the page.
- The Spanish group titles are mine (Copy gave the groups in English): "Qué hace Nuova", "La ficha y tu equipo",
  "Prueba, planes y pago", "Tus datos", "Lo que hoy no forma parte de la oferta". Also mine: "All questions" /
  "Todas las preguntas".
- D-49 appended to the existing 3D line repeats "furniture and materials are illustrative" (once from 0929, once from
  0930). Rendered as delivered; please give one line.
- D-51 also applied to the journey's setup line (`flow.cards.setup.line`), which carried the same "your hours".
- Interim wording on the CRM page and in the onboarding CRM choice (§4, last row): please confirm or replace.
- The page title (`meta.title`) still says "The operating layer of a real estate agency" / "La capa operativa…",
  which D-47 dropped from the platform heading. Not changed without a delta.

## 7. Not done, and why

| Item | Why | Next |
|---|---|---|
| Daily clip v2 | not delivered (`DAILY_CLIP_V2`, audit table "offen") | integrate on arrival: poster, subtitles and click to load are in place |
| Social actions | no lab release (`META_LAB_TEST_RELEASE`) and no action contract switched on; actions stay disabled and say so | after the release |
| Access protection of the staging preview | the order places it before the registration phase; switching Vercel Authentication on now would lock out the owner's T6 and the reviewer | after T6, with the owner's word; one setting on the staging project only |
| Legal publication | legal v3 still carries 20 marks; previews keep the labelled state | owner, counsel |
