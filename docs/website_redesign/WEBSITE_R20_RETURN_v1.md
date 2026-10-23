# WEBSITE R20 — the R20 / R20.1 order, on deb9b66

**State:** `2026-10-23` · **Lane:** Website Implementer → **Owner** (visual acceptance, five steps in
`OWNER_ACCEPTANCE_CARD_1010.md`; the weekly report layout), **Copy** (the text check on this build, §2), **Reviewer**
(RV2 on exactly this deployment, R20-10), **API** (the staging-backend build, W3; `WEBSITE_TO_API_1019_STAGING_BUILD_v1.md`
"Delivered"), **Hosting** (H16 after the owner's release; `mail/WEEKLY_REPORT_LAYOUT_1020.md`), **Daily** (MAIL_SHELL_v3
keeps the TASKS block unchanged), **Audit** (`ACCEPTANCE_LIST_1010.md` §F7), **3D** (W2 unchanged).
**Order:** `governance/R20/10_WEBSITE.md` (R20 incl. R20.1, 20.10.), on `deb9b66` / `dpl_GyrsjqBQcCdg7KEXccKdUkE4v5nc`;
targeted corrections on the existing design, no rebuild. Work resumed 23.10. (the lane was unavailable 21.–22.10.).
**Status:** implemented and awaiting independent technical and final audit. Self-tests are a pre-check, not an acceptance.

```
WEBSITE_R20         = a76e6e1 dpl_GLRzbYXujgTNW1MvS6TboEyF889m          (presentation build, mode stub)
WEBSITE_R20_STAGING = a76e6e1 dpl_3n3TwzpayrxptkGYNuWCih8qBJjW          (onboarding build, mode staging)
MAIL_SHELL_V3       = docs/website_redesign/mail/MAIL_SHELL_v3.html sha256 758df0e53de3f62e975b96db3de8624205956b11122cbf75a7ab5a229c730946
```

| | |
|---|---|
| Presentation build (for Copy, Reviewer, Owner) | https://nuovasolution-design-preview-n67lo7zbl-nuovasolajs-projects.vercel.app (`/es`, `/en`); `/api/build` → `mode: stub` |
| Staging-backend build (for API's E28 browser test, Reviewer) | https://nuovasolution-staging-preview-j7f6e9t1u-nuovasolajs-projects.vercel.app; `/api/build` → `mode: staging`; ribbon `data-env="staging"` |
| Preview alias (newest build) | https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app |
| Before | `deb9b66` / `dpl_GyrsjqBQcCdg7KEXccKdUkE4v5nc` (RV2: design PASS, promises PASS with the language residual, 3D open, F-R16-3 open) |
| Code | `cba9ca6` (the order) + `a76e6e1` (one client component: a cover link that expires more than 24.8 days out is no longer watched by a timer, because a timeout longer than 2^31-1 ms fires at once and had marked the stub covers "expired" on `cba9ca6`); both committed with an explicit pathspec, nothing of another lane staged |
| Browsers and devices really checked | headless Edge (Chromium) at 390×844 (mobile emulation), 768×1024, 1366×650, 1366×768, 1440×900, 1920×1080; **no Safari, no Firefox, no real phone, no real mail client** |

## 1. Per point of the order

| Point | State | What stands |
|---|---|---|
| **W1** Copy's rows (`WEBSITE_COPY_HANDOVER_1021.md`, the one handover; it continues R20-9) | **applied, all 38 rows and the feature-state table** (§2) | nothing else was redesigned |
| **W1** F-R16-3 social cover | **fixed** (on `a76e6e1`; on `cba9ca6` the covers rendered as "expired" through the timer overflow) | the first two stub listings on `/es/social/post` carry a cover: the site's own licensed sample photos (`listing-est118.webp`, `listing-est204.webp`) as https links from the deployment's own host, expiry three years out; the third and fourth stay without one (their refusal reasons are the point of those fixtures). The read model's real `cover_url` path is Social's |
| **W2** 3D | **unchanged, open** | "Pendiente del equipo 3D" on steps 3 and 4 until 3D's R20-11; nothing simulated |
| **W3** the separate staging-backend build | **built** | `.staging-hold` released in `cba9ca6` (the staging build of the final commit is `a76e6e1` / `dpl_3n3TwzpayrxptkGYNuWCih8qBJjW`) (the staging project builds the branch again); the staging preview built the same commit against the pinned staging target with the variables it already held in Vercel; `/api/build` says `mode: staging`; `/es/signup` 200, `/es/login` 200, `/es/onboarding` 307 → login. No value was named anywhere; no account was created; nothing was sent. The E28 browser test is API's and the Reviewer's on that deployment |
| **W4** the weekly report layout | **built, waiting for the owner's verdict** | MAIL_SHELL_v3 adds TILES and OPEN_ACTIONS; the report shows three figures first (answered of received · viewings asked for, with the agreed ones · waiting for a person), the detail as rows, the open things by name, one button to the report in the login; desktop 640 and phone 390 previews, Spanish shown, English mirrored (`evidence_2026-10-23/mail/`). After the owner's release Hosting takes the template into the delivery line (H16) and sends one marked test mail; nothing already delivered is sent again. The morning brief keeps v2's TASKS block unchanged |
| **R20-10** | **this file** | commit, deployment ids, `/api/build` of both builds above |

## 2. Copy's handover, row by row (what was applied)

- **A-1…A-16 (home):** chapter B title "El cliente recibe…" · the customer-code sentence removed from B's line and its
  state ("…En otro idioma no se envía nada automáticamente.") · "una ficha por consulta" in A's answers · the German e-mail
  **without a draft**: chapter A's closing line, the arrival mark ("Registrada"), the Keller result, the held card in B
  ("Sin respuesta automática" + the reason, no draft text), the morning list row ("email en alemán, sin respuesta
  automática" → "Contestar al cliente y proponer una fecha para la visita"), the brief preview's second task · chapter D
  title "…recibe un aviso por email…", its `did` "Avisa a Elena por email…", its state with "todavía sin horario de
  oficina" · chapter F's line (the login available, the e-mail summary in preparation) · the example figures: WhatsApp 13 ·
  email 10, no web or phone, "4 acordadas", no proposals count, "la valoración de los Keller"; the report behind the login:
  "acordadas por el equipo" (label only; the key stays).
- **§E the language sentence**, canonical: the hero's state line and chapter B's state now read "Hoy respondemos en
  español. En otro idioma no se envía nada automáticamente." Nothing asserts a capability in another language.
- **B-1…B-8 (platform):** answer line, e-mail line ("a un buzón que operamos para ti"), "una ficha por consulta", the
  labels line, the **hot row available** by e-mail with "todavía sin horario de oficina", the morning list line, the
  **reports row available** for the login with the e-mail in preparation, the ads line in the future tense.
- **C-1…C-10 and C.3 (packages):** the figures off everywhere — "Para una oficina y un equipo pequeño / un equipo que
  crece / varias oficinas", no offices, seats, enquiries, CRM connections or voice minutes on any public page (the
  packages page's limits block removed; `plans.ts` keeps the catalogue values unrendered), the compare lead "incluye todo
  lo del anterior y añade funciones", the three card leads as written, the ads note in the future tense, and a state on
  every feature line in Copy's two-word form ("Disponible · …" / "En preparación · todavía no contratable"), the morning
  list renamed, "Recogida de leads de tus anuncios actuales".
- **D-1…D-3:** the legal notice's activity line (no "capa operativa", no "una sola memoria del cliente"), the page title
  and description in both languages. **D-4** unchanged: the legal pages stay provisional and unlinked until E14, the
  retention decision and counsel (Copy's v4 texts are drafted in `LEGAL_PAGES_FINAL_v1.md`, not yet on the pages).
- **F-1:** the dead `home.flow.lead` key corrected so the claim cannot come back; `home.hero.lead` likewise (neither renders).
- Also, from the same rule: the meta description, `capabilities.ts` (the scenario "en español", "una ficha por consulta"),
  `connect-notice.ts` ("guardar cada consulta en su ficha").

**Returned, not applied:** nothing. **Note for Copy:** chapter F's `result` line and the story's weekly e-mail box now say
"en preparación" for Monday's mail; the "Lo que atendió Nuova" title on the login report is unchanged.

## 3. What to look at

Folder `docs/website_redesign/evidence_2026-10-23/`.

| Where | What |
|---|---|
| `hero/` | the hero at 0/25/50/75/100 % and the transition, 1440 and 390, ES and EN (unchanged design; the state line changed) |
| `widths/` | first screen, edge, cards, social at 390 / 768 / 1366×650 / 1366×768 / 1920; `after-fast-*.png` + `stages.json` |
| `story/` | A–F ES/EN, B's held e-mail (no draft), D's alert and three steps, G social; phone views |
| `sections/` | packages (no figures, states on every line), the packages page, platform, 3D steps, menu |
| `mail/` | the **new weekly report** and the morning brief, desktop 640 and phone 390, ES and EN |
| `app/` | the login area, `/es/social/post` with the two covers |
| `staging/` | the staging build: `api-build.json` (`mode: staging`), home, sign-up, login |
| `checks/`, `contrast/`, `route_scan/`, `links/` | the suites (§4) |

No new film this round: the scroll, the layers and the motion are unchanged from `deb9b66`
(`evidence_2026-10-19/film/story-film-d1440-es.mp4`, 57 s, recorded on `deb9b66`'s design, which this build keeps).

## 4. Technical checks on the presentation build

- `scripts/design/master-check.mjs` **28 of 28** on `a76e6e1` (27 of 28 on `cba9ca6`: the two covers rendered as "expired" through the timer overflow fixed in `a76e6e1`) (as on `deb9b66`, plus: the German e-mail held without a draft, no office
  or seat figure on the ladder, the weekly mail in shell v3 with three tiles and the open actions by name and no web-form
  or phone figure, the brief in v3 with the A-8 step and no draft, two social covers actually loaded).
- Contrast: **0** below 4.5 : 1.
- Routes **55 of 55**. Links **1064 of 1064**. `next lint` clean, `tsc` clean.
- Staging build: `/api/build` `mode: staging`; routes as in §1. No backend path exercised by this lane.

## 5. Open, blocked externally, owner

| What | Who | Why |
|---|---|---|
| 3D pair and turn | 3D | R20-11 material |
| The weekly report layout's release, then H16 | Owner, Hosting | the owner's look at `mail/weekly-d640-es-full.png`, `weekly-m390-es-full.png` |
| E28 browser test on the staging build | API, Reviewer | the fixture agency; two runs |
| Legal pages | Owner (E14), Counsel, Hosting/API (purge path) | Copy's v4 texts wait for the marks |
| Package limits | Owner | `OWNER_TEMPLATE_PACKAGE_LIMITS_1021_v1.md`; until then no numbers |
| The assistant's name, prices | Owner | unchanged |
| Real phone, real mail client | Owner, Hosting | not this lane's check |

## 6. Said plainly

No productive backend path is proven by either deployment; the staging build exists so that API and the Reviewer can
exercise one. Every figure on the pages is an example and says so. The weekly report is a design in a browser until
Hosting's test mail lands in a real client. No grade is claimed; the owner's look decides.
