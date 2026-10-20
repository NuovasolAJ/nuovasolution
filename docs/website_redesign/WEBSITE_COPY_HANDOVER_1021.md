# WEBSITE COPY HANDOVER 1021 — every open text change, in one file, for one pass

**For:** the Website lane, to apply in **one** pass on the next named build. **This file is complete on its
own**: every row carries the exact current text, the file and line, and the full replacement in ES and EN.
Nothing needs to be looked up in an earlier copy file.
**Base:** `deb9b66` / `dpl_GyrsjqBQcCdg7KEXccKdUkE4v5nc`, read through its fixed URL and in its source.
**Owner decisions of 2026-10-20 applied:** running ads is after the launch and is not advertised; intake
of leads from existing ads is "in preparation" until proven end to end; the package limits 1/3, 1/8, 5/50
were never set by the owner and are removed.
**Rule throughout:** a public line comes from the production column of the evidence (Gate §18).
**Marking:** a technical and editorial check. **Not a legal approval, not a Meta approval.**

**Counts:** 13 open rows of `COPY_1019` · 2 rows of R20 · the imprint paragraph · the language sentence ·
the package figures · the ads wording · and the rows found while assembling this file against the `deb9b66`
source (the German example, the page title and description, the second "al momento", the report label behind
the login, the second ads note on the Growth card, a dead key). **38 numbered rows and the feature-state
table of §C.3.** Every "current" text below was matched against `git show deb9b66:<file>`.

---

## A. Home — `lib/content/home-story.ts`, `lib/content/morning-brief-demo.ts`

| # | Location | Current | New ES | New EN | Class |
|---|---|---|---|---|---|
| A-1 | `home-story.ts:303` chapter `reply`, title | "**Cada cliente** recibe una respuesta concreta, y lo que pide queda en su ficha." | El cliente recibe una respuesta concreta, y lo que pide queda en su ficha. | The customer gets a concrete reply, and what they ask for goes on their record. | absolute removed |
| A-2 | `home-story.ts:304` chapter `reply`, line, last sentence | "Si el cliente escribe más tarde por otro canal, con su código queda en la misma ficha." | *(delete the sentence)* | *(delete)* | not present in prod: no identity layer |
| A-3 | `home-story.ts:308` chapter `reply`, state | "Disponible hoy: respuestas en español por WhatsApp y email, y la ficha. En otro idioma no se envía nada automáticamente; **el borrador y la tarea están en pruebas. El código de cliente entre canales está implementado y pendiente de aceptación.**" | Disponible hoy: respuestas en español por WhatsApp y email, y la ficha. En otro idioma no se envía nada automáticamente. | Available today: replies in Spanish on WhatsApp and e-mail, and the record. In another language nothing is sent automatically. | **closes the language residual** — §E |
| A-4 | `home-story.ts:296` `did` | "Las atiende por el canal por el que llegaron y abre una ficha **por cliente**." | Las atiende por el canal por el que llegaron y abre una ficha por consulta. | It answers each on the channel it came in on and opens a record per enquiry. | prod: two records per person |
| A-5 | `home-story.ts:307` `result` | "Una ficha al día **por cliente** y, donde hace falta, una tarea con fecha." | Una ficha al día por consulta y, donde hace falta, una tarea con fecha. | An up-to-date record per enquiry and, where needed, a dated task. | same |
| A-6 | `home-story.ts:384` `after` | "…las cuatro consultas tienen ficha: tres con respuesta, **una con borrador**." | Cuando Marcos termina la visita, las cuatro consultas tienen ficha: tres con respuesta, y la que llegó en alemán sin respuesta automática, porque hoy solo respondemos en español. | When Marcos finishes the viewing, all four enquiries have a record: three with a reply, and the one in German without an automatic reply, because today we only answer in Spanish. | **the language residual in substance** — §E |
| A-7 | `home-story.ts:439` Keller row `what` | "Valoración de una villa en Elviria · **borrador en alemán pendiente**" | Valoración de una villa en Elviria · email en alemán, sin respuesta automática | Valuation of a villa in Elviria · e-mail in German, no automatic reply | same |
| A-8 | `morning-brief-demo.ts:48` `step` | "Revisar el borrador, enviarlo y proponer la visita" | Contestar al cliente y proponer una fecha para la visita | Answer the customer and propose a date for the viewing | same; no draft exists in prod |
| A-9 | `home-story.ts:323` chapter `task` (story D), title | "…tu equipo lo sabe **al momento**. A la mañana siguiente sabe qué va primero y por qué." | Cuando una consulta importa, tu equipo recibe un aviso por email. A la mañana siguiente sabe qué va primero y por qué. | When an enquiry matters, your team gets an e-mail alert. The next morning it knows what comes first and why. | hot-lead mail E2E (H1); no timing claim |
| A-10 | `home-story.ts:328` chapter `task`, state | "Disponible hoy: el aviso por email y la tarea (tomar, cerrar). En pruebas: el asistente que explica el orden." | Disponible hoy: el aviso por email y la tarea (tomar, cerrar). El aviso llega cuando entra la consulta, todavía sin horario de oficina. En pruebas: el asistente que explica el orden. | Available today: the alert by e-mail and the task (take, close). The alert arrives when the enquiry does, without office hours yet. In testing: the assistant that explains the order. | the limit stands with the claim |
| A-11 | `home-story.ts:344` chapter `result` (story F), line | "Un resumen corto **llega el lunes** por email. El informe completo…" | El informe completo, con el periodo, la base de datos y las acciones pendientes, está en tu acceso de agencia. Un resumen por email está en preparación. Respondida no es lo mismo que entregada: lo que llega al cliente aún no se mide. | The full report, with the period, the data behind it and the open actions, is in your agency login. An e-mail summary is being prepared. Answered is not the same as delivered: what reaches the customer is not measured yet. | login E2E; the weekly scheduler inactive |
| A-12 | `home-story.ts:488` report example, `handled` line | "consultas respondidas y registradas · WhatsApp 11 · email 7 · **web 3 · teléfono 2** · la entrega al cliente no se mide" | consultas respondidas y registradas · WhatsApp 13 · email 10 · la entrega al cliente no se mide | enquiries answered and recorded · WhatsApp 13 · e-mail 10 · delivery to the customer is not measured | an example may not show channels that do not exist; the value stays 23 |
| A-13 | `home-story.ts:489` report example, `chances` line | "visitas pedidas, **4 confirmadas** por el equipo (la de Laura entre ellas) · 2 valoraciones pedidas **· 4 propuestas enviadas**" | visitas pedidas, 4 acordadas por el equipo (la de Laura entre ellas) · 2 valoraciones pedidas | viewings asked for, 4 agreed by the team (Laura's among them) · 2 valuations asked for | a wish is agreed, never confirmed; property proposals are not in prod |
| A-14 | `home-story.ts:490` report example, `next` line | "cosas esperan a una persona: **la cita** de los Keller y la respuesta de Sofía" | cosas esperan a una persona: la valoración de los Keller y la respuesta de Sofía | things wait for a person: the Kellers' valuation and Sofía's reply | no calendar, no appointment |
| A-15 | `home-story.ts:326` chapter `task`, `did` | "Avisa a Elena **al momento** y, a la mañana siguiente, le dice qué va primero y por qué." | Avisa a Elena por email y, a la mañana siguiente, le dice qué va primero y por qué. | Alerts Elena by e-mail and, the next morning, tells her what comes first and why. | same as A-9 |
| A-16 | `lib/content/app-words.ts:34` and `:46`, the report **behind the login** | "{confirmed} **confirmadas** por el equipo" · "Visitas **confirmadas** por el equipo" | {confirmed} acordadas por el equipo · Visitas acordadas por el equipo | {confirmed} agreed by the team · Viewings agreed by the team | same as A-13; **label only**, the data key `viewings_confirmed` stays |

**Upgrade on `PORT_DEPLOYED`, and not before:** A-6, A-7 and A-8 may return to the draft-and-task wording
("una con borrador", "borrador en alemán pendiente", "Revisar el borrador…") once the held reply creates its
draft and task in production.

---

## B. Platform — `lib/content/platform-map.ts`

| # | Key | Current | New ES | New EN | Class |
|---|---|---|---|---|---|
| B-1 | `answer.line` (line 50) | "**Cada consulta recibe respuesta** por el canal por el que llegó. Hoy en español; **otro idioma queda como tarea para tu equipo**." | Las consultas por WhatsApp y email se responden en español. Una consulta en otro idioma no recibe respuesta automática. | Enquiries on WhatsApp and e-mail are answered in Spanish. An enquiry in another language gets no automatic reply. | the task is staging only |
| B-2 | `email.line` | "La misma respuesta para lo que llega por correo." | La misma respuesta para lo que llega por correo, a un buzón que operamos para ti. | The same reply for what arrives by e-mail, to a mailbox we operate for you. | no agency mailbox yet |
| B-3 | `crm.line` | "Una ficha **por cliente** con lo que pidió y lo que pasó después." | Una ficha por consulta, con lo que pidió y lo que pasó después. | One record per enquiry, with what was asked for and what happened next. | two records per person in prod |
| B-4 | `labels.line` | "**Cada correo** lleva su etiqueta: visita, valoración, alquiler." | Los correos llevan su etiqueta: visita, valoración, alquiler. | E-mails carry their label: viewing, valuation, rental. | absolute removed |
| B-5 | `hot` row: **state** and line | state `preparing` · "Un aviso cuando una consulta trae fecha, inmueble y presupuesto concretos." | state **`available`** · Un email a la persona adecuada de tu equipo cuando entra una consulta importante. Todavía sin horario de oficina. | state **`available`** · An e-mail to the right person on your team when an important enquiry comes in. No office hours yet. | **E2E proven (H1)** |
| B-6 | `daily.line` | "La lista de la mañana con el motivo de **cada prioridad** y el siguiente paso." | La lista de la mañana: qué va primero, por qué, y el siguiente paso. | The morning list: what comes first, why, and the next step. | no priority value in prod |
| B-7 | `reports` row: **state** and line | state `preparing` · "Un resumen semanal por email y el informe completo en tu acceso. Lo que llega al cliente aún no se mide." | state **`available`** · El informe completo en tu acceso de agencia. El resumen semanal por email está en preparación. Lo que llega al cliente aún no se mide. | state **`available`** · The full report in your agency login. The weekly e-mail summary is being prepared. What reaches the customer is not measured yet. | login E2E proven |
| B-8 | `ads` row, line | "Recogemos los leads que generan tus anuncios. Las campañas siguen siendo tuyas." | Recogeremos los leads de los anuncios que ya tienes. Las campañas siguen siendo tuyas. | We will take in the leads from the ads you already run. The campaigns stay yours. | **owner 20.10.** — intake in preparation, state `preparing` unchanged; future tense, so it does not read as running |

---

## C. Packages — `lib/content/package-matrix.ts`, `lib/content/plans.ts`, `es.ts`/`en.ts` `packages`

### C.1 The figures come off (owner, 20.10.)

| # | Location | Current | New ES | New EN |
|---|---|---|---|---|
| C-1 | `package-matrix.ts:55` Essential `who` | "Una oficina, hasta 3 personas" | Para una oficina y un equipo pequeño | For one office and a small team |
| C-2 | `package-matrix.ts:74` Growth `who` | "Un equipo de hasta 8 personas" | Para un equipo que crece | For a growing team |
| C-3 | `package-matrix.ts:93` Enterprise `who` | "Varias oficinas, hasta 50 personas" | Para varias oficinas | For several offices |
| C-4 | `package-matrix.ts:58` Essential `limits` | "Hoy: WhatsApp y email, respuestas en español. **Una oficina, hasta 3 personas.**" | Hoy: WhatsApp y email, respuestas en español. | Today: WhatsApp and e-mail, replies in Spanish. |
| C-5 | `es.ts:402` / EN `packages.compareLead` | "Cada paquete se construye sobre el anterior y **crece en tamaño: oficinas, puestos y capacidad de consultas al mes**." | Cada paquete incluye todo lo del anterior y añade funciones. | Each package includes everything in the one before and adds features. |
| C-6 | the limits block on each card ("Oficinas 1 · Puestos 3", "1 · 8", "5 · 50") | rendered from `plans.ts` `limits` | **do not render any field of `limits` on a public page**: not offices, seats, `leads_month`, `crm_connections` or `voice_minutes` | the same |

C-1 to C-3 are orientation, not limits, and must not be styled as a number or a cap. **`plans.ts` holds
values the owner never set** (a proposal of 20.07. and a staging test set); keeping them in the data is
fine, putting any of them on the page is an invented number. The owner's template
`OWNER_TEMPLATE_PACKAGE_LIMITS_1021_v1.md` decides the real ones, and only then do numbers return.

### C.2 The card leads

| # | Location | Current | New ES | New EN |
|---|---|---|---|---|
| C-7 | `package-matrix.ts:56` Essential `change` | "**Ninguna consulta se queda sin respuesta** mientras estás fuera." | Las consultas en español por WhatsApp y email se responden mientras estás fuera. | Enquiries in Spanish on WhatsApp and e-mail are answered while you are away. |
| C-8 | Growth card lead | "Cada mañana el equipo sabe qué va primero, y **los clientes reciben propuestas que encajan**." | Cada mañana tu equipo ve sus tareas con el motivo de cada una. | Every morning your team sees its tasks with the reason for each. |
| C-9 | `package-matrix.ts:94` Enterprise `change` | "Instagram y modelos 3D desde el mismo sitio que las consultas." | Modelos 3D por encargo, y más adelante Instagram desde el mismo sitio. | 3D models to order, and later Instagram from the same place. |
| C-10 | `package-matrix.ts:125` `adsNote`, shown under the Growth card | "**Recogemos** los leads que generan tus anuncios. Las campañas y el presupuesto publicitario siguen siendo tuyos." | Más adelante recogeremos los leads de los anuncios que ya tienes. Las campañas y el presupuesto publicitario siguen siendo tuyos. | Later we will take in the leads from the ads you already run. The campaigns and the advertising budget stay yours. |

C-8 is `package-matrix.ts:75` Growth `change`.

### C.3 A state on every feature

Two words, as on the rest of the site: **Disponible** / **En preparación · todavía no contratable**.

| Package | Feature, as rendered | State ES | State EN |
|---|---|---|---|
| Essential | Respuestas automáticas · hoy en español | Disponible · en español | Available · in Spanish |
| Essential | WhatsApp y email | Disponible · el buzón lo operamos nosotros para ti | Available · we operate the mailbox for you |
| Essential | Etiquetas de email | Disponible · con Gmail | Available · with Gmail |
| Essential | Fichas de cliente (CRM) | Disponible · una ficha por consulta | Available · one record per enquiry |
| Essential | Avisos de consultas importantes | Disponible · por email, todavía sin horario de oficina | Available · by e-mail, no office hours yet |
| Essential | Informe semanal | Disponible: el informe en tu acceso · En preparación: el resumen semanal por email | Available: the report in your login · In preparation: the weekly e-mail summary |
| Growth | Seguimientos con permiso del cliente | En preparación · todavía no contratable | In preparation · not bookable yet |
| Growth | Propuestas de inmuebles de tu cartera | En preparación · todavía no contratable | In preparation · not bookable yet |
| Growth | "El asistente de la mañana: la lista del día **con prioridades**" | **Rename** to "La lista de la mañana: qué va primero y por qué" · Disponible: ver, tomar y completar tareas · En preparación: el correo de la mañana | "The morning list: what comes first and why" · Available: see, take and complete tasks · In preparation: the morning e-mail |
| Growth | "Recogida de leads de anuncios" | **Rename** to "Recogida de leads de tus anuncios actuales" · En preparación · todavía no contratable | "Intake of leads from your existing ads" · In preparation · not bookable yet |
| Growth | Agenda y citas | En preparación · todavía no contratable | In preparation · not bookable yet |
| Growth | Informe con evolución y canales | En preparación · todavía no contratable | In preparation · not bookable yet |
| Enterprise | Instagram desde el mismo sitio | En preparación · depende de la aprobación de la plataforma | In preparation · depends on the platform's approval |
| Enterprise | Modelos 3D incluidos por encargo | Por encargo · a partir de tus planos | To order · from your plans |

**Ads, per the owner:** no sentence anywhere says that we run ads, plan campaigns or spend an advertising
budget. Running ads is after the launch and is not advertised now. Only the intake from ads the agency
already runs appears, and only as "in preparation".

---

## D. Legal and page metadata

| # | Location | Current | New ES | New EN | Class |
|---|---|---|---|---|---|
| D-1 | `lib/content/legal.ts:85` notice, *Actividad* | "NuovaSolution ofrece una **capa operativa** para agencias inmobiliarias: las consultas se responden, se entienden y se llevan hacia adelante en un solo sistema con **una sola memoria del cliente**." | NuovaSolution ofrece a las agencias inmobiliarias un sistema que responde a sus consultas, registra cada una en una ficha y crea tareas para el equipo de la agencia. | NuovaSolution provides real estate agencies with a system that answers their enquiries, records each one, and creates tasks for the agency's team. | a false claim **now**, independent of E14 |
| D-2 | `es.ts:10` / `en.ts:9` `meta.title` | "NuovaSolution. La capa operativa de una agencia inmobiliaria" · "…The operating layer of a real estate agency" | NuovaSolution · Consultas respondidas y ordenadas para agencias inmobiliarias | NuovaSolution · Enquiries answered and organised for real estate agencies | in every browser tab and search result |
| D-3 | `es.ts:12` / `en.ts:11` `meta.description` | "…en un solo sistema, **con una sola ficha por cliente**…" · "…with one record of each customer…" | Respondemos en español a las consultas por WhatsApp y email, las registramos en una ficha y dejamos a tu equipo una tarea clara. Hecho para agencias inmobiliarias en España. | We answer enquiries on WhatsApp and e-mail in Spanish, record each one and leave your team a clear task. Built for real estate agencies in Spain. | the shared-record claim, in search results |
| D-4 | the rest of the legal pages | "PROVISIONAL" on all four, 0 mentions of Instagram | **unchanged until E14.** The prepared texts and their routes: notice ← `LEGAL_PAGES_FINAL_v1.md` §1 · privacy ← §2 with `META_LEGAL_TEXT_FINAL.md` §1 · terms ← §3 with `META_LEGAL_TEXT_FINAL.md` §2 · data deletion ← `META_LEGAL_TEXT_FINAL.md` §3 | | **no company data is invented in the meantime** |

---

## E. The language sentence — the Reviewer's residual, and what it actually is

**The sentence the Reviewer quoted is not on `deb9b66`.** "El sistema responde en el idioma del cliente; lo
que falta en otros idiomas es la aprobación legal del aviso, no la función" returns **0** hits in the
rendered `/es` and `/en`, including the RSC payload, and **0** hits in the source of `deb9b66`. RV2 reported
it as "unchanged from RV1"; it was carried forward, not re-read. **Asked of the Reviewer:** re-check F-R16-5 on
the next build against the source and the rendered HTML.

**But the residual is real in substance**, and this file closes it. The home story shows a German e-mail
that ends as a **draft with a next step**: "tres con respuesta, una con borrador", "borrador en alemán
pendiente", "Revisar el borrador, enviarlo…". That is the held-reply flow, which exists on **staging only**.
In production a German e-mail is held and **nothing** is created. The example therefore claimed the function
in another language without saying so in words. Rows A-3, A-6, A-7 and A-8 bring it to what production does.

**The sentence, as the one canonical form** for any place that states the language:

> ES **Hoy respondemos en español. En otro idioma no se envía nada automáticamente.**
> EN **Today we answer in Spanish. In another language nothing is sent automatically.**

It states what production does and nothing about a capability. It does not attribute the gap to the legal
notice, because that would again assert the function exists and only needs permission.

---

## F. A dead key, fixed so it cannot come back

| # | Location | Current | New ES | New EN |
|---|---|---|---|---|
| F-1 | `es.ts:184` / `en.ts:206` `home.flow.lead` | "La consulta se responde **en el idioma del cliente**…" — referenced by no component on `deb9b66`, so not rendered | La consulta se responde en español. Pasa a ser una ficha con lo que ha pedido, y una petición de visita pasa a ser una tarea que alguien de tu equipo toma y cierra. | The enquiry is answered in Spanish. It becomes a record with what was asked for, and a viewing request becomes a task one of your people takes and closes. |

Unrendered today; corrected so that reusing the key does not bring the claim back.

---

## G. What waits for evidence, so nothing is strengthened early

| Evidence | Rows it unlocks |
|---|---|
| `PORT_DEPLOYED` | A-6, A-7, A-8 return to the draft-and-task wording; B-1 adds "…y queda como tarea para tu equipo" |
| E19 working hours in production | A-10, B-5 and the Essential alert lose "sin horario de oficina" |
| an agency's own mailbox connected | B-2 loses "a un buzón que operamos para ti" |
| the identity layer in production | A-2 may return; A-4, A-5, B-3 may say "por cliente" |
| the weekly scheduler active | A-11, B-7, the Essential report: the e-mail summary becomes available |
| `OWNER_TEMPLATE_PACKAGE_LIMITS_1021_v1.md` decided | C-1…C-6: numbers may return, the owner's, not the catalogue's |
| ad intake proven end to end | the Growth ad row moves to available; running ads stays after the launch |
