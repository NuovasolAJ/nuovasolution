# WEBSITE COPY — return, round 2026-10-24 (R24 FINAL)

**State:** `2026-10-25` · **Lane:** Website Copy / Product Truth
**Marking:** technical and editorial check. **Not a legal approval, not a Meta approval. No publication released.**

---

## 0. What can be closed today, and what cannot

**The joint final acceptance cannot take place yet.** Website has not delivered the final named R24 build. The
newest build on `origin/website_enterprise_redesign` is still `9f6c65e` (R23); the latest commit is `10808e8`, its
documentation. Closure only counts on a named version, so **every finding below stays open** until Website names
the final build. The Reviewer and I then check that same build together.

What this return does on the way:

- a pre-check of `9f6c65e`, the build the Reviewer's R24 order names for pre-checks;
- the copy side of all 18 images;
- the corrections, including one of my own;
- the state of Q-1…Q-4;
- the legal part, including my contribution to the counsel package v2.

| Source | Status |
|---|---|
| The 18 images, `backend_handoff/handoff_in_2026-10-13/BILDER_R24/` | read; Audit's findings per image in `AUDIT_ORDERS_R24_BILDBEFUNDE_R24_v1.md` |
| The external website review | **not in the handoff folder.** The owner's note says the attachments are covered by the folder; if a separate review exists, its points are not checked here and stay open |
| The owner's own finding reports the PDF refers to | not available (Audit says the same); they apply in addition |

**Build pre-checked:** `9f6c65e` / `dpl_C7hvT71vZZCi8YUUgSarodHQNhro`, fixed URL
`https://nuovasolution-design-preview-1pfs923d9-nuovasolajs-projects.vercel.app`, `/api/build` = `9f6c65ef3af7…`,
mode `stub`. 27 routes, ES and EN, GET only: home, platform and its four module pages, packages, FAQ, contact,
trial, legal notice, **`/preview/weekly` and `/preview/brief`**, `/prueba-objeto`. Each check covers the rendered
HTML **with the RSC payload**.

## 1. W-1…W-12 on `9f6c65e`: all applied

Machine check, old text gone and new text present, ES and EN: **W-1, W-2, W-3, W-5 … W-12 applied.** W-4 was
checked by attribute: the hero channel row carries exactly `whatsapp` and `email`. W-3: every one of the 18 platform rows
renders its state (`data-platform-entry-state`, 36 occurrences counting the markup and the payload). **W-13** stays with the owner (`OWNER_DECISIONS` R24: "W-13 … nach Vorlage").

The FAQ language answer now reads "En español. En otro idioma no se envía nada automáticamente." **The language
finding F-R16-5 is therefore closed on `9f6c65e`**; at closure it is checked again on the final build.

## 2. New lines to Website, for the final R24 build

Numbered X-1… so that they do not collide with W-1…W-13.

| # | Where on `9f6c65e` | Current | New ES | New EN | Why |
|---|---|---|---|---|---|
| X-1 | `lib/content/app-words.ts:72`, `/preview/weekly` lead | "…Lo que ves es la plantilla que **recibe** tu agencia, en la **hülle** común de todos los correos de Nuova." · EN "…in the shared **shell**…" | Un email corto con las cifras principales y un botón al informe completo. Es la plantilla que recibirá tu agencia cuando el envío semanal esté activo, con el mismo diseño que todos los correos de Nuova. | A short email with the main figures and one button to the full report. It is the template your agency will receive once the weekly send is active, in the same design as every Nuova email. | a German word in the Spanish page; the weekly scheduler is inactive, so "recibe" says too much |
| X-2 | `lib/content/morning-brief-demo.ts:15`, `/preview/brief` lead | "…La misma **hülle** que el resumen semanal, con otro contenido. Datos de demostración." · EN "The same **shell**…" | Un email corto a cada persona del equipo: la consulta que más importa hoy, por qué, y las tareas con su siguiente paso. Con el mismo diseño que el resumen semanal y otro contenido. Todavía no se envía de forma regular. Datos de demostración. | A short email to each person on the team: the enquiry that matters most today, why, and the tasks with their next step. Same design as the weekly summary, other contents. Not yet sent on a regular basis. Demonstration data. | the same; the morning brief has been delivered but is not in regular operation |
| X-3 | `lib/content/home-story.ts:328`, story D state | "Disponible hoy: el aviso por email **y la tarea (tomar, cerrar)**. …" | Disponible hoy: el aviso por email. El aviso llega cuando entra la consulta, todavía sin horario de oficina. En preparación: la lista de tareas para tomarlas y cerrarlas, y el asistente que explica el orden. | Available today: the alert by e-mail. The alert arrives when the enquiry does, without office hours yet. In preparation: the task list to take and close tasks, and the assistant that explains the order. | **correction of my own row R-8 (R19).** The staff surface reaches production with Release U, after E1 (Gate K6c; Daily 1023). In production nobody can take or close a task yet |
| X-4 | `lib/content/package-matrix.ts:85`, Growth row (images 07, 08) | "La lista de la mañana: qué va primero y por qué · **Disponible: ver, tomar y completar tareas** · En preparación: el correo de la mañana" | Tareas del equipo y el asistente de la mañana · En preparación · todavía no contratable | Team tasks and the morning assistant · In preparation · not bookable yet | the same correction, which also resolves image 08: one row now names both things, and both have the same state |
| X-5 | `lib/content/platform-map.ts:79-81` (image 08) | "El asistente de la mañana — La lista de la mañana: qué va primero…" (preparing) · "Tareas — Una tarea con dueño… · **Disponible**" | El asistente de la mañana — Cada mañana te explica qué va primero, por qué, y el siguiente paso. · En preparación · todavía no contratable — Tareas — Una tarea con dueño por cada visita o llamada pendiente. · **En preparación · todavía no contratable** | The morning assistant — Every morning it explains what comes first, why, and the next step. · In preparation · not bookable yet — Tasks — One task with an owner for each viewing or callback. · **In preparation · not bookable yet** | two functions with two names, each with its own line; "Tareas" corrected as in X-3 |
| X-6 | `lib/content/faq.ts:141`, FAQ "¿Puede mi equipo preguntarle al asistente qué hacer hoy?" | "Hoy no. Lo que recibe tu equipo es la lista de tareas: tomar una tarea, cerrarla y ver quién ha tomado las demás." | Hoy no. Hoy tu equipo recibe por email el aviso de cada consulta importante. La lista de tareas y el asistente que explica el orden están en preparación. | Not today. Today your team gets an e-mail alert for each important enquiry. The task list and the assistant that explains the order are in preparation. | the same correction |
| X-7 | `faq.ts:133`, FAQ "¿Dónde trabaja mi equipo las tareas?" | "**En español o en inglés**, cada persona con su propia lista… Todavía no hay una dirección pública…" | En su propia lista, cada persona entrando como ella misma. Esa lista está en preparación; hasta entonces, tu equipo recibe por email el aviso de cada consulta importante. | In their own list, each person signed in as themselves. That list is in preparation; until then your team gets an e-mail alert for each important enquiry. | language claims only after the SPRACH-MATRIX; availability as in X-3 |
| X-8 | `lib/content/capabilities.ts:205-227`, `/platform/daily-assistant` (image 11) | no state on the page; the point "**En español o en inglés, elegido en la aplicación**"; the card titled "**Leads**" | add the page state **En preparación · todavía no contratable**; remove the language point until the SPRACH-MATRIX and the owner's SPRACHEN line; card title **Las tareas de tu equipo · esta semana** | **In preparation · not bookable yet**; the same removal; card title **Your team's tasks · this week** | images 11 (2) and (3); X-3 |
| X-9 | `capabilities.ts:216` and `:227`, the same page (images 03, 11; Q-4) | "Desaparece de las listas de los demás…" · "Para los demás, la tarea desaparece de su lista." | **proposal, waiting for Daily (§3, Q-4):** Quien toma una tarea se hace cargo de ella: desaparece de las listas de los demás, y el asistente de la mañana dice quién la ha tomado. | Whoever takes a task owns it: it leaves the others' lists, and the morning assistant says who took it. | the measured list rule (02.10.) and the staff-v7 assistant ("la ha tomado {name}") describe two surfaces; written as one sentence, they no longer contradict each other |
| X-10 | home "Los demás ven que está tomada y por quién." (morning example, story D) | as is | **with X-9:** En la lista de los demás ya no aparece; el asistente de la mañana dice quién la ha tomado. | It no longer appears in the others' lists; the morning assistant says who took it. | the same |
| X-11 | "Sin tarjeta" in `home-sections.ts:94`, `home-story.ts:243`, `package-matrix.ts:134`, `es.ts:295`, `es.ts:315` (images 07, 10) | "14 días gratis · Sin tarjeta" | 14 días gratis · Sin método de pago | 14 days free · No payment method | one wording; "sin método de pago" is the broader and true statement. The FAQ sentence "sin método de pago y sin tarjeta" stays |
| X-12 | `home-story.ts:324`, story D line, **EN only** | "The alert reaches the right person by email, with the reason." | — | The alert reaches the right person by e-mail, with the reason, without office hours yet. | ES has the limit, EN lost it |
| X-13 | `home-story.ts:514`, social example (image 04 (4)) | the timeline "Borrador preparado… · Aprobada por ti… · Publicada en tu cuenta…" without a caption | caption above the timeline: **Ejemplo: así funcionará cuando la plataforma lo apruebe.** | **Example: how it will work once the platform approves it.** | "Publicada en tu cuenta" reads as done; the state line is far away |
| X-14 | `capabilities.ts:70-76`, `/platform/ai-sales-agent` (image 09) | h1 "Tus consultas de texto se responden en los canales que conectes." · lead "Las consultas de texto por Gmail y WhatsApp se responden…" · three points | h1: **Tus consultas reciben respuesta aunque estés en una visita.** · lead: **Mientras tu equipo está con un cliente o fuera de la oficina, las consultas por WhatsApp y email reciben respuesta en español y quedan en su ficha. Tu equipo empieza por lo que importa, no por la bandeja de entrada.** · points: Respuesta por WhatsApp, en español · Respuesta por email, en un buzón que operamos para ti · Cada conversación queda en la ficha del cliente · Un aviso por email a la persona adecuada cuando una consulta importa | h1: **Your enquiries get a reply even while you are at a viewing.** · lead: **While your team is with a client or out of the office, enquiries on WhatsApp and e-mail get a reply in Spanish and land on their record. Your team starts with what matters, not with the inbox.** · points accordingly | image 09: benefit, for whom, what it saves; "Gmail" alone becomes "email" with the mailbox limit; Outlook not named before O4 and production |
| X-15 | 3D viewer room labels on the Spanish page (image 06 (1)) | Utility room · WC · Hall · Kitchen/Dining · Living · Terrace outdoor | Lavadero · Aseo · Recibidor · Cocina-comedor · Salón · Terraza | unchanged | for 3D, then Website; the page language must hold |
| X-16 | 3D cards 03 and 04, "Pendiente del equipo 3D" (image 05 (2)) | as is | the label goes **only when** the delivered material (empty/furnished pair, turn) is in the build | the same | no label removed before the material is there |

## 3. Q-1…Q-4

API, Lead and Daily have not answered yet: there is no `API_SYNC_1024`, no SPRACH-MATRIX, and nothing in the Lead or
Daily returns. The rule stays the same: what is not in the production column does not go on the page. **If there is
no answer by the time Website builds the final version, the fallbacks apply in that build.** A later answer only
upgrades the wording.

| # | Question | Answer | Wording for the final build |
|---|---|---|---|
| Q-1 | does a production reply use listing facts and send the listing? | **none yet** (API, R24 order §7d) | fallback: hero lead (`home-story.ts:241`) "Responde a lo que llega por WhatsApp y email, guarda lo que busca cada cliente y avisa por email a tu equipo cuando una consulta importa."; story B `did` (`:306`) without "con los datos de tu cartera"; hero state line adds "Respuestas con datos del inmueble: en preparación." |
| Q-2 | what happens in production when a customer asks for a person? | **none yet.** R24-a rules hold + takeover task + staff notice for the no-text case on the candidate, not in production | fallback: `platform-map.ts:56` "Paso a una persona" → **En preparación · todavía no contratable** |
| Q-3 | is a held enquiry in another language recorded in production? | **none yet** | fallback for A-6: "…tres con respuesta y ficha, y la que llegó en alemán sin respuesta automática, porque hoy solo respondemos en español." |
| Q-4 | taken task: gone from the others' lists, or visible as taken? | **none from Daily yet.** Evidence read: the list rule was measured on 02.10. (`capabilities.ts:216` cites `daily_clip_v3/MANIFEST.md`); the staff-v7 assistant (staging, `build/daily_goals/web/assistant.html`) names who took a task ("la ha tomado {name}") | X-9 and X-10: one sentence for both surfaces. **Daily confirms or corrects it**; until then, X-9/X-10 are the proposal |

**Language statements:** the site keeps "Hoy respondemos en español. En otro idioma no se envía nada
automáticamente." until API's SPRACH-MATRIX and the owner's SPRACHEN line. Owner 24.10. made ES/EN/DE the **first
test start**, not a limit (R24-e). A language is added on the page only once its cell in the matrix is proven, and
never before. Image 12 (1): the rendered line has "envía" **with** the accent; the size is image 12 (2), Website's.

## 4. The 18 images (R24-l)

For each image: what in it is copy, what belongs to another lane, and the state. **None is closed**, because the
final build does not exist. Evidence for the copy side is my text extraction of `9f6c65e` (scratch; routes in §0);
the screenshot evidence of the same section is Website's and the Reviewer's.

| # | Page | Finding (Audit) | Copy side | Other lane | State |
|---|---|---|---|---|---|
| 01 | home, hero | header covers the buttons; demo card runs into fog; small language note; no readable hero statement on the first screen | the h1 and the lead exist ("Mientras enseñas una vivienda, Nuova atiende tus consultas."); Q-1 affects the lead | Website: layout, transition, size, first screen | open |
| 02 | home, Daily before taking | fine; checked against 03 and 11 | — | — | reference only |
| 03 | home, Daily after taking | right column cut ("E n n s c"); contradiction with 11 | X-9, X-10 (Q-4) | Website: the cut column | open |
| 04 | home, social example | state line cut at the top; empty area; image rights of the interior photo; "Publicada en tu cuenta" | X-13 | Website: layout; Website/PM: the photo's rights evidence | open |
| 05 | home, 3D | heading under the header; cards 03/04 "Pendiente" despite delivered material; label over a door arc; white model; video instead of rotation | X-16 | 3D, Website | open |
| 06 | 3D viewer, overview | English room names; shelf with bottles; terrace furniture overlapping | X-15 | 3D | open |
| 07 | home, packages | Growth/Enterprise mostly in preparation; footer cut; "Sin tarjeta" against "Sin método de pago" | X-4, X-11. The weak Enterprise offer is the PAKETE decision (API template), **not** a text fix | API, Owner: PAKETE; Website: footer | open |
| 08 | `/platform` | morning assistant "En preparación" against the list "Disponible"; calendar cut, state must match KALENDER | X-4, X-5; calendar stays "En preparación" until the KALENDER line | Website: cut card | open |
| 09 | `/platform/ai-sales-agent` | big hero, three points; only Gmail; no benefit | X-14 | Website: size | open |
| 10 | `/packages` | badge over the card edge; Enterprise mostly empty; "Precio para tu agencia" without a price | X-11; the price line stays honest ("Te decimos el precio … antes de acordar nada") until the PRECIOS line | Website: badge; API, Owner: PAKETE/PRECIOS | open |
| 11 | `/platform/daily-assistant` | "Desaparece…" against 03; language line; "Leads" card on a tasks page | X-8, X-9 | Daily: Q-4 | open |
| 12 | hero, language note | accent; small grey type; change content only after SPRACHEN | accent present ("envía"); content unchanged until the matrix | Website: size and contrast | open (size) |
| 13 | home, matching card | name badge over the note; prices cut; state small | state text correct ("Implementado; todavía sin activar…"), Q-1 nearby | Website: layout | open |
| 14 | 3D, shelf and picture | bottles on the shelf top; picture behind pendants; vases on the edge; armchair to the wall; local viewer address | — | 3D; Website shows only the delivered protected address | open |
| 15 | 3D, dining | chairs away from the table; floating cup; low lamps | — | 3D | open |
| 16 | 3D, sink and hob | flat sink without basin; board over the edge; hob a blue square | — | 3D | open |
| 17 | 3D, kitchen clock | clock on the wall/door edge | — | 3D | open |
| 18 | 3D, terrace | tables interpenetrate; sofa back to the group; label over furniture | X-15 for the label language | 3D | open |

## 5. Legal

| Item | State |
|---|---|
| **Legal notice** | waits only for E14. `E14_CHECK` (API, 23.10. 07:34Z): only trade name and country filled; **no signal since** (no `API_SIGNALS_1024`). I fill the five fields when the signal comes; Website publishes after the owner's go (owner 23.10.: notice live once E14 is complete) |
| **Privacy notice** | **only after counsel** (owner 23.10.). Two additions are prepared, not yet in the page: Vercel as a processor with its function region, and the two technical login cookies |
| **Counsel package v2** | my contribution: **`docs/website_redesign/COPY_TO_API_1024_ANWALTSPAKET_v2_v1.md`**. It contains the four pages with route, content and open marks; the website facts (no public form, sign-up and onboarding through Vercel functions, **function region not read**, two httpOnly cookies, sessionStorage draft, cookieless Vercel analytics); and the gaps split into technical, legal and owner data. It closes v1's "Rechtsseiten v4: Zulieferung offen (Copy)" and the open Vercel row |
| `META_LEGAL_TEXT_READY` | **NO**: E14, the production deletion path, retention |

**New for Hosting or Website:** read the Vercel project's function region (`app/api/bff/*` handles sign-up and
onboarding data; `vercel.json` sets none). Until then the privacy notice cannot name it.

## 6. For the joint closure

On the final named R24 build, the Reviewer and I check: X-1…X-16, the fallbacks or the answers for Q-1…Q-4, W-1…W-12
(changed places only; unchanged checks are not repeated), FAQ, every subpage, both mail previews, the 3D section, and
each of the 18 images. Where our readings differ, the rendered HTML of that build decides, quoted with its route.

## 7. Preconditions remaining

| # | Precondition | Who |
|---|---|---|
| 1 | the final named R24 build with X-1…X-16 | Website |
| 2 | Q-1…Q-3 answers, or the fallbacks in that build | API, Lead |
| 3 | Q-4 confirmation | Daily |
| 4 | SPRACH-MATRIX and the owner's SPRACHEN line | API, Owner |
| 5 | PAKETE/PRECIOS/TRIAL, KALENDER lines | API, Owner |
| 6 | W-13 | Owner |
| 7 | the 3D material and the QA list | 3D, Website |
| 8 | E14 complete | Owner, API |
| 9 | the Vercel function region | Hosting or Website |
| 10 | counsel on the privacy notice and the terms | Owner, counsel |
| 11 | the external review, if it exists as a separate file | Owner |

## 8. What I did not do

No application code, no design, no acceptance, no publication. The owner's E14 file was not opened. Read with GET only;
the `/prueba-objeto` page was read, not used.
