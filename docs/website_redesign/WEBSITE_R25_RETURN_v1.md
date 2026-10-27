# WEBSITE R25 (R25C) — the final build named; the rest prepared on its own branch, not deployed

**State:** `2026-10-26` · **Lane:** Website Implementer → **Copy** and **Reviewer** (point 1, RV4), **API** and **PM** (point 4, the
E-FU2 URL; point 3), **Social** (point 6), **3D** (point 7), **Hosting** (point 2, the region), **Audit**, **Owner**.
**Order:** `AUDIT_ORDERS_R25C_PROMPTS_R25C.md` block "R25C · WEBSITE" on `AUDIT_TO_LANES_2026-10-26_R25C.md` and the owner's
addendum "26.10. nachmittags — R25B" (`OWNER_DECISIONS_2026-10-24_R24.md`).
**Status:** implemented and awaiting independent technical and final audit. Nothing on the production domain was touched.

## 1. The final build (point 1)

```
WEBSITE_R24B         = a945fa9 dpl_Ez3cribfS2nvd5HwMs39ikdV6iWy   (presentation build, mode stub)
WEBSITE_R24B_STAGING = a945fa9 dpl_6yfhB3L7m64Z66mSqczrocHr1vPk   (onboarding build, mode staging)
```

| | |
|---|---|
| Presentation | https://nuovasolution-design-preview-2x7bx8vz8-nuovasolajs-projects.vercel.app · `/api/build` → `{"commit":"a945fa9…","deployment":"dpl_Ez3cribfS2nvd5HwMs39ikdV6iWy","mode":"stub"}` |
| Staging | https://nuovasolution-staging-preview-b1hg8802s-nuovasolajs-projects.vercel.app · `/api/build` → `{"commit":"a945fa9…","deployment":"dpl_6yfhB3L7m64Z66mSqczrocHr1vPk","mode":"staging"}` |
| What it contains | `f576a8f` = the owner's consolidated closing order of 26.10. (`WEBSITE_R24B_RETURN_v1.md`, §1–§8 with before/after, the scroll recordings and the suites) + `a945fa9` = Copy's Y-1…Y-4 of 26.10. (`WEBSITE_COPY_SYNC_1026_RETURN_v1.md`: Daily's sentence for a taken task, the app-language point, the hand-over row, "están registradas"), so RV4 runs once on one build without the known Q-4 contradiction |
| E28 | `596679b` staging (`dpl_CWR3NKKTSgaNs64xi9eD469dyGyJ`, https://nuovasolution-staging-preview-q98d818q2-nuovasolajs-projects.vercel.app) is **untouched** and stays until `E28_STG_LINK_PASS`; nothing was removed |
| The R25C branch | **Audit line 27.10.: pushed as its own branch.** `website_r25c` = `a945fa9` → `306ae7c` (docs) → `0f1ee97` (R25C) → `fd8c883` (the empty alt of the furnished 3D picture fixed, Reviewer's finding; the test listing's data module-private). Deployments of this branch: presentation https://nuovasolution-design-preview-j6a0ilc6x-nuovasolajs-projects.vercel.app (`dpl_HoPiDpskeYDLEgJ1cBYoxYeTuhs4`, stub) and **staging https://nuovasolution-staging-preview-fmj1582lg-nuovasolajs-projects.vercel.app (`dpl_ENLhHd7wJrV1QtMgJU1GvXbg5kXS`, `/api/build` → `fd8c883`, `ref: website_r25c`, `mode: staging`)**. The named RV4 and E28 deployments are unchanged |

**Hand-over to Copy and Reviewer:** RV4 on exactly `a945fa9` / the two deployment ids above (`WEBSITE_R24B_RETURN_v1.md` §8).

## 2. VERCEL · EU execution (point 2; owner: EU-Ausführung = JA)

**Read on the named deployments** (`vercel inspect`, both projects): every serverless function (`λ [locale]`, `/app`, `/app/brief`,
the BFF routes, 117 items in all) is built in **`iad1`** (US east). No function runs in an EU region today; no `regions` setting
existed in `vercel.json` and no route declares `preferredRegion`.

**Prepared (branch `website_r25c`):** `vercel.json` → `"regions": ["fra1"]`, which moves every function of both projects to
Frankfurt on the next deployment. Existing EU regions: none existed, so nothing is kept or changed besides the move.
**Verified on staging (27.10.):** `vercel inspect dpl_ENLhHd7wJrV1QtMgJU1GvXbg5kXS` lists every shown function (`λ [locale]`, `.rsc`, `/app`, …) with **`[fra1]`**, none with `iad1` (the CLI prints the first five and hides 117; the `regions` setting is project-wide, so every function of this deployment builds in Frankfurt); `/api/build` answers from it. The same on the presentation deployment `dpl_HoPiDpskeYDLEgJ1cBYoxYeTuhs4`. The production project needs its own release line before anything is published there.

**Said plainly, for API's separate documentation:** this moves the website's **functions**. It is **not** a statement that "all data
stays in the EU": the database, the logs and the processors are API's and Hosting's to document separately (the owner's
addendum, VERCEL line); the website's static assets and edge network are Vercel's global network regardless of the region.

## 3. Sign-up: MX check before `signUp` (point 3, `API_E28_RECONCILIATION_1026_v1.md` §3)

Prepared on `website_r25c` (`app/api/bff/signup/route.ts`): before `signUp` the address's domain is resolved (`dns.promises.resolveMx`,
then A/AAAA); reserved names (`.invalid`, `.test`, `.example`, `.localhost`, `example.com/.org/.net`, `test.nuovasolution.com`) are
refused without a lookup; no result ⇒ `email_domain_undeliverable` (400, "Esta dirección no puede recibir correo. Usa una
dirección de un dominio con correo activo." / EN), **nothing sent**. The stub build keeps its simulated path (no mail exists there).
Measured locally with the same function: `gmail.com` ✓, `nuovasolution.com` ✓, `test.nuovasolution.com` ✗, `example.com` ✗,
`foo.invalid` ✗, a non-existent `.net` ✗. **Measured on the staging deployment `dpl_ENLhHd7wJrV1QtMgJU1GvXbg5kXS` (27.10.):** `POST /api/bff/signup` with `rv4-mx@test.nuovasolution.com`, `probe@foo.invalid` and `probe@no-such-domain-xyz123.net` → `400 {"code":"email_domain_undeliverable"}` each, **no mail sent** (the refusal stands before `signUp`). No deliverable address was submitted by the website lane (that would send a real confirmation mail; the Reviewer's own measure stays its own).

## 4. E-FU2 `/es/prueba-objeto` with PM's fields (point 4)

Prepared on `website_r25c` per `PM_TO_WEBSITE_1025_PRUEBA_OBJETO_FIELDS_v1.md`: Spanish only (the `/en` path answers 404), PM's exact
labels as server-rendered text (Referencia `NS-TEST-0001`, Estado `Disponible`, Actualizado, Precio, Ubicación, Tipo, Dormitorios,
Baños, Superficie, Operación `Venta`), the closing sentence, `<meta name="robots" content="noindex, nofollow, nocache">`, not in the
sitemap, not linked, no form, no phone, no WhatsApp button, no link out. The picture: the site's licensed sample with **"PRUEBA"
burnt into the pixels** (a banner and a diagonal watermark), served at `/es/prueba-objeto/imagen-prueba.jpg`, `alt` "Imagen de prueba
NuovaSolution", the footer "Imagen: licencia Pexels 12715501 …". Only on a stub build (`stubSurfacesAllowed`).

**Values are provisional** (the site's example flat: 315.000 €, Estepona, Málaga, piso, 2/2, 78 m²) until the owner's release line;
they must then equal API's inventory row and fit the E-FU3 test search. Removal path as PM §4: `estado` → `Retirado` with the date,
then 410, then the picture goes.

**URLs for API and PM (27.10.):**
- On the redesign's presentation deployment of the branch: https://nuovasolution-design-preview-j6a0ilc6x-nuovasolajs-projects.vercel.app/es/prueba-objeto (200, `noindex, nofollow, nocache`, `/en` → 404), picture https://nuovasolution-design-preview-j6a0ilc6x-nuovasolajs-projects.vercel.app/es/prueba-objeto/imagen-prueba.jpg (200, image/jpeg). On the staging deployment the page answers 404 by design (stub surface).
- **On the production site's code, prepared and NOT published:** branch `efu2-prueba-objeto` = production `main` (`9943660`, the commit the live production deployment `dpl_9pqgQZdNdsNmY1VqYVDJj8dvH78r` of 25.05. was built from) **plus exactly one page and one picture** (`c112b63`: `app/es/prueba-objeto/page.tsx`, `public/prueba/imagen-prueba.jpg`; `git diff --stat main..c112b63` = 2 files). A **preview** deployment of it exists on the production project: https://nuovasolution-3745oqnqf-nuovasolajs-projects.vercel.app (`dpl_CYMDDDuRmdBFCHpdLMdLxsh39HHr`, target preview, behind Vercel's SSO deployment protection, which was left as it is). **The production domain is untouched.** Publishing it there (`vercel promote`, one command) waits for the owner's E-FU2 line: the audit names a "Nachtrag 27.10." in `OWNER_DECISIONS_2026-10-24_R24.md`, but the file on disk carries no such addendum (searched 27.10.); per R25-k only a line in that file counts, so this one point waits. When it stands, the final URL will be `https://nuovasolution.com/es/prueba-objeto` and the picture `https://nuovasolution.com/prueba/imagen-prueba.jpg`.
- Note: the Vercel Git integration also built the `efu2-prueba-objeto` branch on the two preview projects (they show the old site there); those are previews only and none of the named deployments.

Local proof: `evidence_2026-10-26b/r25c/prueba-1366.png`.

## 5. SPRACHEN S2 (point 5)

The website's own languages are ES and EN (the switcher, every page). No page offers DE as available: checked by grep over the
content (`alemán|German|DE`) — the only mentions are the German e-mail of the story (the held draft, "Espera a una persona") and the
phone scenario text of the hidden Voice page. One line claimed replies "in the language each customer writes in" (onboarding,
agency language help): changed on `website_r25c` to the honest S2 wording "Hoy las respuestas automáticas se escriben en español. El
inglés está previsto; el alemán está en la hoja de ruta (el teléfono es aparte)." (WORKING, for Copy). The FAQ's language answer is
Copy's W-1 ("En español. En otro idioma no se envía nada automáticamente") and stays until Copy's S2 line.

## 6. Social inbox W1–W6 on tenant-api v15 staging (point 6, `SOCIAL_TO_API_WEBSITE_1026_G1_G2_LANG_v1.md` §3)

Prepared on `website_r25c` for Screen C (`/es/social/inbox`, `/en/social/inbox`, both tabs): **W1** the language chip of every entry
("Idioma: inglés" / "Language: Spanish" / unknown) from `inbox[].language`; **W2** Social's draft prefilled and editable in the reply
field, with "Borrador en inglés · detectado en el mensaje" from `suggestion.draft/.language/.language_source`, sent as before
(`reply_public`/`reply_private`/`dm_reply`); **W3** the reason instead of an empty field for `blocked_policy`, `not_renderable`,
`unresolved`, `language_not_enabled_for_tenant`, `no_reply_signal_only`; **W4** the reply to a direct message (`dm_reply`, unchanged);
**W5** "Tomar como contacto" on a direct message: phone (E.164) and/or e-mail and the mandatory confirmation "La persona ha dado su
conformidad en su mensaje a que la contactemos" set by a person → `social.action` `lead_capture {target: our signal id, phone?, email?,
consent_confirmed: true}`, the outcome and reason shown as returned; **W6** "Revisa el texto antes de enviarlo…" when
`requires_human_confirmation`. The browser never sees a raw provider id (targets are our `s<n>` keys, resolved server side). The stub
rows carry a language and a draft, so the screen can be seen on the stub build; local proof `evidence_2026-10-26b/r25c/inbox-*.png`.
Wording WORKING until Copy's `SOCIAL_TO_COPY_1026_LANG_v1` answer. **Social's `ui_action_acceptance.mjs` and `g1_g2_acceptance.mjs`
run on the first staging deployment of the branch** (after RV4), against tenant-api v15.

## 7. 3D assets (point 7)

Nothing new delivered: `handoff_2026-10-25` holds a README with `⟦RUN⟧` placeholders and no files; the newest runs on the 3D machine
(`run-20261026-085408-house`, `run-20261025-113410-house`) hold no website assets. The named build binds the 23.10. run's files by
sha256 (`WEBSITE_R24B_RETURN_v1.md` §3). The bundled order stands: `WEBSITE_TO_3D_1026_ASSET_ORDER.md`. When 3D hands over
run + commit + sha, the files replace under the same names and the return names them.

## 8. Legal pages for Meta (point 8)

- **Identity block (E14):** prepared on `website_r25c` (`lib/content/legal.ts`): the five fields of Copy's v4 (name, NIF, address,
  e-mail, telephone) render only from Vercel environment values `NUOVA_E14_NAME/_NIF/_ADDRESS/_EMAIL/_PHONE` with
  `NUOVA_LEGAL_E14=complete`, set by the website lane in Vercel after API's "E14 complete" signal; **nothing of them is in the
  repo or in this document**. Until then the notice shows the lines the old site has published for months, with the provisional label.
- **Data deletion:** Copy's v4 text (`LEGAL_PAGES_FINAL_v1.md` §4) ported into `/es/legal/data-deletion` and `/en/legal/data-deletion`
  on the branch; the e-mail comes from the E14 block once complete.
- **Privacy:** waits for counsel (Copy); the page keeps its label.
- **P1 (nuovasolution.com):** two static pages prepared, not published: `docs/website_redesign/p1_nuovasolution_com/data-deletion.html`
  (EN, the URL for Meta's "Data Deletion Instructions URL") and `eliminar-datos.html` (ES), with two open marks (`⟦E14: EMAIL⟧`,
  `⟦publication date⟧`); publication only on the owner's line for the production domain, on the old site's hotfix branch.

## 9. Open

RV4 (Copy + Reviewer) on `a945fa9` · Social's `ui_action_acceptance.mjs` / `g1_g2_acceptance.mjs` on the staging deployment of `website_r25c` (`dpl_ENLhHd7wJrV1QtMgJU1GvXbg5kXS`) · the Reviewer's own MX measure there · the owner's E-FU2 line on disk with the values, then the one promote of `c112b63` to the production domain · API's E14 signal and the five Vercel values · Copy's S2 and social wording · 3D's corrected run · the production project's own release for the region · merging `website_r25c` into the shared branch after RV4.
