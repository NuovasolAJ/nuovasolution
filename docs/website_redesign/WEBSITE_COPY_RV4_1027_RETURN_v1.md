# WEBSITE COPY — RV4 on the named final build `a945fa9` · 2026-10-27

**For:** Website (three lines before the next build), the Reviewer (our joint acceptance), the owner.
**Build:** `a945fa9` · presentation `dpl_Ez3cribfS2nvd5HwMs39ikdV6iWy`, fixed URL
`https://nuovasolution-design-preview-2x7bx8vz8-nuovasolajs-projects.vercel.app`; `/api/build` = `a945fa9e4bd2…`, mode `stub`.
Staging `dpl_6yfhB3L7m64Z66mSqczrocHr1vPk` is the same commit, so its texts are the same; its backend path belongs to the
Reviewer and API.
**Read:** 30 routes, ES and EN, GET only: home, platform and its four module pages, packages, FAQ, contact, trial, the four legal
routes, `/preview/weekly`, `/preview/brief`, `/prueba-objeto`. Each check covers the rendered HTML with the RSC payload.
**Marking:** technical and editorial. **Not a legal approval, not a Meta approval. No publication released.**

---

## 1. Result

**Copy's side of RV4 on `a945fa9`: three open findings**, all in one file (`lib/content/home-story.ts`). Each comes from the
closing order's new text and contradicts an answer API gave yesterday. **Everything else passes.**

| Checked | Result |
|---|---|
| W-1…W-12, regression on the changed places | pass |
| X-1…X-16 | pass. X-9/X-10 are replaced by Y-1. X-15: the room labels on the Spanish page read Salón · Cocina / Comedor · Lavadero · Aseo · Recibidor · Terraza; "Utility room" only on the English page, which is correct |
| Y-1…Y-4 | pass: Daily's sentence in the morning example and on `/platform/daily-assistant`; "Paso a una persona" with its two states; "las cuatro consultas están registradas"; the staff-app language line |
| R25C promise rules | pass: no price, no "all languages", no booking by the system, no 3D delivery time. Tasks, weekly e-mail and morning assistant are "en preparación"; appointments go request → proposal → a person's confirmation → calendar "en preparación" |
| language lines on every page | pass: Spanish only, "en otro idioma no se envía nada automáticamente" |
| **new on this build** | **Z-1a, Z-1b, Z-2 below** |

## 2. Three lines to Website

| # | `a945fa9` | Current | New ES | New EN | Why |
|---|---|---|---|---|---|
| Z-1a | `home-story.ts:324`, story A `result` | "…y el email en alemán **espera a una persona**." · "…and the German e-mail **waits for a person**." | Cuando Marcos termina, las cuatro están registradas: dos con respuesta escrita, una llamada atendida, y el email en alemán sin respuesta automática. | When Marcos finishes, all four are recorded: two with a written reply, one call answered, and the German e-mail without an automatic reply. | Q-3: production records the German enquiry **without** a task and without a notice; "espera a una persona" implies a hand-off that comes only with v3 and Release U |
| Z-1b | `home-story.ts:412`, the Kellers' status in the arrivals list | "Espera a una persona" · "Waits for a person" | Sin respuesta automática | No automatic reply | the same; it then matches the morning example ("email en alemán, sin respuesta automática") |
| Z-2 | `home-story.ts:432`, story B `earlier` | "…la pregunta de Laura y la respuesta **con los datos del piso**…" · "…the reply **with the flat's data**…" | Antes, a las 11:20: la pregunta de Laura y la primera respuesta (la del primer bloque de la página). | Earlier, at 11:20: Laura's question and the first reply (the one in the first block of the page). | Q-1: the hero reply now deliberately states no listing fact ("Una persona de la agencia te confirma lo de la terraza y el garaje"); the line still describes the old reply |

`home-story.ts:375` ("Cuenta … lo que espera a una persona", story F) is general and correct, and stays.

**Re-check after the fix:** only these three strings plus the regression run, on the next named build. No full RV4 again.

## 3. The owner's pictures on `a945fa9`, copy side

**Text** = the text finding is closed on this build. **Design** = layout, size or overlap; that is the Reviewer's screenshot
check of the same section. **3D** = geometry, for the 3D lane.

| # | Page | Text on `a945fa9` | Rest |
|---|---|---|---|
| 01 | hero | **closed**: the h1 and the lead; the reply is Q-1-conform; the record shows the proven alert with its reason, not a score | design: readable on the first screen, transition, header |
| 02 | Daily before taking | reference | — |
| 03 | Daily after taking | **closed**: Y-1, "Al tomarla, sigue en tu lista con su historial y desaparece de la lista de tus compañeros." | design: the cut column |
| 04 | social example | **closed**: "Ejemplo · prototipo", the caption "Ejemplo: así funcionará cuando la plataforma lo apruebe.", the photo named with its licence (Pexels 12715501) | design: state line, empty area |
| 05 | 3D | **closed**: no "Pendiente del equipo 3D" | 3D: model quality; design: heading under the header |
| 06 | 3D labels | **closed** on the Spanish page (X-15) | 3D: shelf, terrace furniture |
| 07 | packages | **closed**: "Sin método de pago" everywhere (X-11); Growth row as X-4 | design: footer. **Not a text finding:** the weak Enterprise offer is the PAKETE decision, still open with the owner |
| 08 | `/platform` | **closed**: the morning assistant and the tasks, each with its own line and the same state as on the packages; calendar "en preparación" (KALENDER) | design: the cut card |
| 09 | `/platform/ai-sales-agent` | **closed**: benefit, for whom, what it saves; "email, en un buzón que operamos para ti", no Outlook (X-14) | design: size |
| 10 | `/packages` | **closed**: the price line stays honest ("Te decimos el precio … antes de acordar nada"); the internal prices are nowhere | design: badge; PAKETE/PRECIOS with the owner |
| 11 | `/platform/daily-assistant` | **closed**: Y-1 (point, scenario, caption "Ejemplo ilustrativo…"), Y-4 language line, card "Las tareas de tu equipo · Esta semana", page state "En preparación · todavía no contratable" | — |
| 12 | hero language note | **closed**: "envía" with the accent; the content unchanged until the evidence (§3 of the 1026 return) | design: size, contrast |
| 13 | matching card | **closed**: "Implementado; todavía sin activar para ninguna agencia." | design: badge, prices |
| 14–18 | 3D viewer | no text finding | 3D: the QA list (floor contact, collisions, alignment, wall mounting, lamp height, shelf tops, basins and hobs) |

**Picture 11 is closed now, on the text Daily confirmed.** RV4 of 26.10. had closed it on `596679b` with a clause that Daily's answer
does not cover.

## 4. With the Reviewer

There is no Reviewer RV4 on `a945fa9` in the repo yet; the last is `REVIEWER_SYNC_1026_RETURN_v1.md` on `596679b`. Joint acceptance
"without an open finding" needs:

1. Z-1a, Z-1b and Z-2 on the next named build;
2. the Reviewer's design half on the same build, the screenshot of each picture's section.

If our readings differ, the rendered HTML of that build decides, quoted with its route.

## 5. The deletion page

**Hosting has not given the longest backup period yet.** `HOSTING_SIGNALS_1026` names the backup times (02:30, offsite 03:30, Storage
Box in Helsinki) but no retention, and `HOSTING_SYNC_1026` lists "Server-Speicherorte an API" as open. The mark
`⟦HOSTING: longest backup period⟧` in `META_LEGAL_TEXT_FINAL.md` §3 stays until Hosting writes one number covering the database,
the server and the offsite copy.

**Found while comparing: Website's prepared deletion pages use a superseded text of mine.** `p1_nuovasolution_com/data-deletion.html`,
`eliminar-datos.html` and `lib/content/legal.ts` on the unpushed branch `website_r25c` come from `LEGAL_PAGES_FINAL_v1.md` §4. That
section still said: "If you remove the app in Instagram, Instagram notifies us … and we give you a confirmation code". **No deletion
callback is built.** The Meta text had struck that sentence on 29.09. (`META_LEGAL_TEXT_FINAL.md` §0, correction 2), but I never
brought §4 in line. Website copied correctly from a source I had left wrong.

- **Corrected in my files:** `LEGAL_PAGES_FINAL_v1.md` §4 is marked **superseded**, pointing to `META_LEGAL_TEXT_FINAL.md` §3.
- **Line to Website, before any publication of P1 or `website_r25c`:** the deletion page in all three places takes
  `META_LEGAL_TEXT_FINAL.md` §3 **word for word**, ES and EN. That version:
  - names the controller with the E14 block (NAME, NIF, ADDRESS, EMAIL, not EMAIL alone);
  - carries "Qué eliminamos y qué se mantiene un tiempo" from the production deletion path;
  - has no callback.

  The P1 README's "nothing else waits" then becomes: E14 and the backup period.

The named build `a945fa9` itself is clean: its `/legal/data-deletion` is the provisional page and names no callback.

## 6. Open after RV4

| # | What | Who |
|---|---|---|
| 1 | Z-1a, Z-1b, Z-2 on a new named build | Website |
| 2 | the Reviewer's design half of RV4 on that build | Reviewer |
| 3 | the deletion page in P1 and `website_r25c` taken from `META_LEGAL_TEXT_FINAL.md` §3 | Website |
| 4 | the longest backup period | Hosting |
| 5 | E14 complete | Owner, API |
| 6 | PAKETE/PRECIOS (picture 07/10), 3D QA (06, 14–18) | Owner, API; 3D |
| 7 | the owner's release of the texts in `COPY_R25C_TEXTS_1026_v1.md` | Owner |

## 7. What I did not do

No application code, no design, no publication. The branch `website_r25c` was read, not changed. Read with GET only.
