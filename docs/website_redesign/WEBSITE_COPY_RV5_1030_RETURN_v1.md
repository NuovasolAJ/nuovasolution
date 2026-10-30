# WEBSITE COPY — RV5 on the named build `3dbafd6` · 2026-10-30

**For:** Website (four named lines), the Reviewer (our joint check of the same build), the owner.
**Order:** R26 (audit state `9f59c8b`): Z-1a, Z-1b, Z-2; alt texts; legal pages including the callback sentence =
`META_LEGAL_TEXT_FINAL.md` §3 at every place; backup period per API's signal (R26-i); product promises unchanged; one
regression run. What passed on `a945fa9` is checked again only in the regression run.
**Build:** `WEBSITE_R26 = 3dbafd6 dpl_4Qz1SE8ozqsvtD98swPxf3YrYeGK`, fixed URL
`https://nuovasolution-design-preview-2368s4mjg-nuovasolajs-projects.vercel.app`; `/api/build` = `3dbafd6d6b3f…`, mode `stub`.
Staging `dpl_4deTgUf5EdY8z1TSFBsuFJMZw8oX` is the same commit.
**Read:** 37 routes, ES and EN, GET only. The new `/example-report` and all four legal routes are included. Each check covers the
rendered HTML with the RSC payload; the P1 files and `lib/content/legal.ts` were read in the source of `3dbafd6`.
**Marking:** technical and editorial. **Not a legal approval, not a Meta approval. No publication released.**

---

## 1. Result

**Not yet "without an open finding": four named lines to Website (§2).** Everything the order names passes, except the
deletion text at its four places and three small points that came with the new build.

| Check | Result |
|---|---|
| Z-1a, Z-1b, Z-2 | **pass**: "…y el email en alemán sin respuesta automática", the Kellers' state "Sin respuesta automática", "la primera respuesta"; ES and EN |
| Regression: W-1…W-12, X-1…X-16, Y-1…Y-4 | **pass**. W-12 is replaced by the owner's §9: every demo number is now `+34 XXX XXX XXX`, which is stricter; "Utility room" appears on the English page only, which is correct |
| Product promises | **pass**: no price, no "all languages", no booking by the system, no 3D delivery time; tasks, weekly e-mail and morning assistant "en preparación"; chapter E "Prototipo · todavía no disponible" |
| Callback sentence ("código de confirmación") | **gone everywhere**: rendered pages 0, P1 files 0, `legal.ts` 0. R26-j is done |
| Deletion page = `META_LEGAL_TEXT_FINAL.md` §3 | **not yet**: 6 of 10 paragraphs at each of the four places → **L-1** |
| Alt texts | **pass** except one: correct language on both pages, none empty except the decorative hero (`aria-hidden`), the videos labelled with length and "sin sonido" → **AL-1** |
| New on this build: `/example-report` | two points → **EX-1, EX-2** |
| Backup period (R26-i) | **filled in the source**: 14 days (§3) |

## 2. Lines to Website

| # | Where on `3dbafd6` | Current | New ES | New EN | Why |
|---|---|---|---|---|---|
| **L-1** | the deletion page at four places: `/es/legal/data-deletion` and `/en/legal/data-deletion` (`lib/content/legal.ts`), `p1_nuovasolution_com/eliminar-datos.html` and `data-deletion.html` | the earlier §4 text: no identity block; no paragraph "Qué eliminamos y qué se mantiene un tiempo"; two phrasings differ ("Si escribiste a una inmobiliaria" without "que usa Nuova"; "que usaste con nosotros") | `META_LEGAL_TEXT_FINAL.md` §3.2, **word for word** | §3.1, word for word | R26-j and the order: §3 at every place. The identity block comes from the E14 block once API signals E14 complete. The marks `⟦E14: …⟧` and `⟦COUNSEL: F9⟧` keep the page unpublishable until E14 and counsel; on the preview, the "PROVISIONAL" banner stays |
| **AL-1** | the empty picture of the 3D pair, `living-empty-1200.webp` | "Casa de ejemplo ficticia: el mismo salón **vacío y con mobiliario ilustrativo**" · "…the same living room **empty and with illustrative furnishing**" | Casa de ejemplo ficticia: el mismo salón vacío, desde la misma cámara | Fictional example house: the same living room, empty, from the same camera | the alt text describes the pair, not this picture; it now mirrors the furnished one's alt |
| **EX-1** | `/example-report`, the chart (`lib/content/example-report.ts:27`, `:55`) | "Consultas por semana · Cuatro semanas de ejemplo", presented as part of "el informe semanal de Nuova" | add to the note: **Cuatro semanas de ejemplo. La evolución por semanas forma parte del informe ampliado, en preparación.** | **Four example weeks. The week-by-week trend is part of the extended report, in preparation.** | the packages list "Informe con evolución y canales" under Growth as "En preparación", and API's product card says the extended report tier is empty in production. **If API confirms the agency login already shows several weeks, this line falls** |
| **EX-2** | `/example-report`, "Qué toca hacer" item 3 (`example-report.ts:40`, EN equivalent) | "Confirmar con Laura la visita del jueves a las 10:00." · "Confirm Thursday's 10:00 viewing with Laura." | Recordar a Laura la visita del jueves a las 10:00. | Remind Laura of Thursday's 10:00 viewing. | in story D, Laura has accepted and Elena has marked it done; an open "confirm" contradicts that and brings back the wording struck in R18 |

**Re-check:** only these four on the next named build, plus the regression run. No full RV5 again.

## 3. The backup period (R26-i)

API's signal `BACKUP_MAX_RETENTION` (`API_SIGNALS_1030`, 30.10. 07:46Z):

- Supabase production: Pro, daily backups, no PITR → **7 days**;
- server backups: **14 days**;
- offsite Helsinki: **14 days**;
- **maximum 14 days**.

In `META_LEGAL_TEXT_FINAL.md` §3 the mark `⟦HOSTING: longest backup period⟧` is now **"14 días" / "14 days"**. The paragraph says,
ES: "…nuestras copias de seguridad como máximo a los 14 días. Si alguna vez se restaura una copia, la eliminación se aplica de nuevo
antes de usar los datos."

API also says this may be published **only after counsel**: the counsel package question F9 is open, and the number is measured
but not legally assessed. So the paragraph now carries **`⟦COUNSEL: F9⟧`** in both languages. That is the open question R26-i asks
for, written into the text, so that no copy can go live without it.

`META_LEGAL_TEXT_READY` = **NO**: E14, and counsel on F9. The deletion path in production and the backup number are no longer
among the reasons.

## 4. With the Reviewer

There is no Reviewer RV5 on `3dbafd6` in the repo yet; the last is `3d21ed2` (RV4 on `a945fa9`). Joint acceptance needs L-1, AL-1,
EX-1 and EX-2 on the next named build, and the Reviewer's design half on that same build. If our readings differ, the rendered
HTML of that build decides.

## 5. Open after RV5

| # | What | Who |
|---|---|---|
| 1 | L-1, AL-1, EX-1, EX-2 on a new named build | Website |
| 2 | EX-1: whether the production report shows several weeks | API |
| 3 | the Reviewer's design half on that build | Reviewer |
| 4 | E14 complete | Owner, API |
| 5 | counsel on F9 (the backup paragraph) and on the privacy notice | Owner, counsel |

## 6. What I did not do

No application code, no design, no publication. Read with GET only.
