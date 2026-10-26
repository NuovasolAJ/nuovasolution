# WEBSITE COPY — return, round 2026-10-26 (R25C)

**State:** `2026-10-26` · **Lane:** Website Copy / Product Truth
**Basis:** `AUDIT_TO_LANES_2026-10-26_R25C.md`, the owner addendum "26.10. nachmittags", `API_PRODUKTKARTE_1026_v1.md`.
**Marking:** technical and editorial. **Not a legal approval, not a Meta approval. No publication released.**

---

## 0. RV4: waiting for the named final build

Website delivered `596679b` and is making one more design correction. RV4 runs with the Reviewer on **the commit Website
names after that**, through its fixed URL and `/api/build`. **Nothing is closed in this return.**

Pre-checked so that nothing new turns up in RV4: **`596679b`** / `dpl_CCgn42YAPWwoMT3HKMnSrj4GQZHi`, fixed URL
`https://nuovasolution-design-preview-chhbk3js9-nuovasolajs-projects.vercel.app`, `/api/build` = `596679bd4959…`, mode `stub`.
20 routes, ES and EN, GET only. In RV4, X-1…X-16 and the 18 images are checked one by one (table in
`WEBSITE_COPY_SYNC_1024_RETURN_v1.md` §4), and Y-1…Y-4 below are added.

**Two things to settle, so that RV4 runs once and on one build:**

- **Which build is final.** The Reviewer's `d94832d` ran RV4 on `596679b` and called it the final build. Since then Website has
  pushed `f576a8f` (the owner's closing order of 26.10., on `596679b`), and the audit says the final build follows the current
  correction. **No Website return names `f576a8f` or a later commit as final yet.** A joint RV4 counts only on the commit Website
  names; a check of `596679b` does not carry over (R24 rule: an acceptance does not apply to another build).
- **Picture 11 is not closed by the product evidence.** RV4 closes it on "Quien toma una tarea se hace cargo de ella: desaparece de
  las listas de los demás, y el asistente de la mañana dice quién la ha tomado". The wording is now consistent, but its second half
  is **not covered**: Daily's answer to Q-4 (via API) says nothing about the others' morning brief. The clause came from my own
  proposal X-9/X-10 and is withdrawn here. Picture 11 closes with Y-1.

**`f576a8f`, read in its source:** Y-1…Y-3 apply unchanged (`capabilities.ts:240, 251`, `product-views.tsx:292`,
`platform-map.ts:58`, `home-story.ts:414`). The caption now starts "Ejemplo ilustrativo", so Y-1's caption keeps that start.
The hero reply marked "WORKING, for Copy" is **confirmed** as written: "¡Hola, Laura! Anoto dos dormitorios con terraza en
Estepona y hasta 320.000 €. Una persona de la agencia te confirma lo de la terraza y el garaje. ¿Buscáis vivienda habitual o
segunda residencia?" It states no fact about the listing and announces no file (Q-1). The record's "Prioridad · Consulta
importante · aviso por email a tu equipo" with its reason describes the proven e-mail alert, not a score, and holds.

## 1. Q-1…Q-4 resolved with API's answers

| # | API's answer (`API_PRODUKTKARTE_1026_v1.md`) | Wording | On `596679b` |
|---|---|---|---|
| Q-1 | **no**: production replies name no property from the portfolio and send none (`pm_certified = false`, sender inactive) | the fallback is final: hero lead without "con los datos de tu cartera", hero state line "Respuestas con datos del inmueble: en preparación.", story B "Responde en español y guarda lo que pide cada cliente; en otro idioma no envía nada." | **applied**, ES and EN |
| Q-2 | a request for a person becomes a **task** in production (`handover_with_task`, 6 found); a notice only for a hot case; a notice on every handover comes with v3 | Y-2 | open |
| Q-3 | the held German enquiry is **recorded** in production as an intake with its reason (`language_mismatch`), **without** a task; hold + task + notice come with v3 | Y-3 | open |
| Q-4 | the person who takes it keeps it, with its history; it **leaves** the colleagues' and the admin's lists. **Nothing about the others' morning brief** | Y-1 (Daily's sentence) | **contradicts**: the build carries my proposal X-9/X-10 ("…y el asistente de la mañana dice quién la ha tomado"), which Daily's answer rules out |

### Lines to Website

| # | Where on `596679b` | Current | New ES | New EN |
|---|---|---|---|---|
| Y-1 | `/platform/daily-assistant`: the point under "Qué hace" (`lib/content/capabilities.ts`, the first point) | "Quien toma una tarea se hace cargo de ella: desaparece de las listas de los demás, y el asistente de la mañana dice quién la ha tomado." | Al tomarla, sigue en tu lista con su historial y desaparece de la lista de tus compañeros. | Once you take it, it stays in your list with its history and leaves your colleagues' lists. |
| Y-1 | the same page, the scenario | "…Desaparece de las listas de los demás, y el asistente de la mañana dice quién la ha tomado." | Un agente abre la lista, toma la tarea de la visita de Laura Serrano y la completa cuando una persona ha acordado la hora con ella. Mientras la lleva, sigue en su lista con su historial y no aparece en la de sus compañeros. | An agent opens the list, takes Laura Serrano's viewing task and completes it once a person has agreed the time with her. While they have it, it stays in their list with its history and does not appear in their colleagues' lists. |
| Y-1 | the same page, the caption under the example | "Datos sintéticos. La tarea de Laura ya no aparece en la lista de los demás; el asistente de la mañana dice que la ha tomado Elena, y solo ella puede cerrarla." | Ejemplo ilustrativo. Elena ha tomado la tarea de Laura: sigue en su lista con su historial, ya no aparece en la de sus compañeros y solo ella puede cerrarla. | Illustrative example. Elena has taken Laura's task: it stays in her list with its history, no longer appears in her colleagues' lists, and only she can close it. |
| Y-2 | `/platform`, row "Paso a una persona" (`lib/content/platform-map.ts`) | "Cuando alguien pide hablar con una persona, la consulta pasa al equipo." · En preparación · todavía no contratable | Cuando alguien pide hablar con una persona, queda registrada como petición de llamada para tu equipo. · state: **Disponible: la petición queda registrada · En preparación: verla en la lista de tareas y un aviso en cada traspaso** | When someone asks to speak to a person, it is recorded as a callback request for your team. · **Available: the request is recorded · In preparation: seeing it in the task list, and a notice on every handover** |
| Y-3 | home, story A, the `after` line | "…las cuatro consultas tienen ficha: tres con respuesta, y la que llegó en alemán sin respuesta automática, porque hoy solo respondemos en español." | Cuando Marcos termina la visita, las cuatro consultas están registradas: tres con respuesta, y la que llegó en alemán sin respuesta automática, porque hoy solo respondemos en español. | When Marcos finishes the viewing, all four enquiries are recorded: three with a reply, and the one in German without an automatic reply, because today we only answer in Spanish. |
| Y-4 | `/platform/daily-assistant`, a point under "Qué hace" (owner: show the staff app's languages separately) | none since X-8 | En español o en inglés, según la cuenta de cada persona. | In Spanish or English, set per person's account. |

**Why Y-3:** a held German enquiry is an intake with a reason, not a lead record with a reply, so "están registradas" is
exact where "tienen ficha" was generous. **Why not a task in Y-2 or Y-3:** the task list reaches production with Release
U (X-3). "Te la dejamos como tarea" comes after v3 **and** Release U.

## 2. Promises = evidence, on `596679b`

| Rule (R25C) | On `596679b` | Verdict |
|---|---|---|
| W-PM-2 is only a test mechanism | not mentioned anywhere on the public site | holds |
| tasks taken over only with Release U | story D state: "En preparación: la lista de tareas para tomarlas y cerrarlas…"; platform "Tareas" in preparation; FAQ (X-6, X-7) | holds, **except Y-1** (the morning-assistant clause) |
| weekly report only after the probe and REPORT-AKTIV | story F: "el email del lunes se ha enviado una vez y aún no es un envío regular"; `/preview/weekly`: "…recibirá tu agencia cuando el envío semanal esté activo" | holds. W43 closed today (Hosting); REPORT-AKTIV not yet. **Upgrade only after the first regular run is checked** |
| appointments: a wish is recorded, a person confirms | the story says "Elena propone el jueves a las 10:00; Laura acepta"; no booking or confirmation by the system anywhere | holds |
| languages S2: ES + EN, the phone also DE, DE otherwise roadmap; never "all languages" | "Hoy respondemos en español…"; no "all languages" | holds: S2 is the **target**; production answers in Spanish only. Upgrade texts in §3 |
| prices 349/649/999 internal | no price anywhere | holds |
| 3D delivery time is no public guarantee | no delivery time anywhere | holds |

## 3. Language lines prepared for when the evidence arrives

The site changes **only** when the language is proven **in production on that channel**. A staging test does not count,
and neither does the owner's target.

| Proven | Hero state line and FAQ, ES | EN |
|---|---|---|
| now | Hoy respondemos en español. En otro idioma no se envía nada automáticamente. | Today we answer in Spanish. In another language nothing is sent automatically. |
| EN in production on WhatsApp and email | Hoy respondemos en español y en inglés. En otro idioma no se envía nada automáticamente. | Today we answer in Spanish and English. In another language nothing is sent automatically. |
| phone in production, per language | add: "Al teléfono: español" + "inglés" + "alemán", each only once proven | the same |

German for WhatsApp and email stays off the page until the owner moves it off the roadmap.

## 4. Texts, each with the owner's line

`docs/website_redesign/COPY_R25C_TEXTS_1026_v1.md`:

| Lane | What | Owner line |
|---|---|---|
| Voice | EN and DE for the opening with the AI notice (both E10 forms), the switch on request with the notice repeated, unclear language, a language not offered, wished time, callback, close. Register **Sie**. The Spanish callback line loses "en breve" | `VOICE V-1 EN/DE`, `V-2`…`V-5 = JA`; the notices also need E10 |
| Social | EN for all 16 standard texts (6 stored, 10 worded); C1: **du** on Instagram, **Sie** on the phone; C2: "¡Gracias! Te respondemos por privado." / "Thanks! We'll reply to you privately.", **approvable only together with the private reply**; C3: Social's proposal accepted; C4: the AI notice per agency, valid only while a person approves every reply. DE stays roadmap | `SOCIAL-SPRACHEN-WORTLAUT = JA`, `SOCIAL-DE-ANREDE = du` |
| Daily | EN confirmed, including the five new staff-v8 sentences; **DE filled**: `docs/website_redesign/daily_i18n/TEMPLATE_DE_v1_COPY_1026.json`, **467/467** entries, **467/467** with the same placeholders (machine check); **du**, gender-neutral; the website sentence for the staff app now and after the picker | `DAILY-DE-WORTLAUT = JA`, `DAILY-EN-NEU = JA` |

The German file is in this repo because this lane does not write into the n8n repo; Daily copies it.

## 5. Legal

| Item | State |
|---|---|
| **Legal notice** | waits for API's **"E14 vollständig"**. `API_SIGNALS_1024` has no E14 entry. Audit 26.10.: the NIF exists (DNI + letter) and only the entry is missing. I fill the five fields when the signal comes; Website publishes after the owner's go |
| **Privacy notice** | only after counsel. My contribution to the counsel package v2 is `COPY_TO_API_1024_ANWALTSPAKET_v2_v1.md`. VERCEL (owner, 26.10.): EU execution, region to be read and set; then the Vercel paragraph prepared there goes into the page |
| **Deletion page for Meta** | **updated** in `META_LEGAL_TEXT_FINAL.md` §3, ES and EN, on API's production deletion path (`person_erase` in production since 25.10., events gate since 26.10., production test 2/2 complete). A new paragraph says what is deleted at once, what stays for a while (automation records 14 days, backups, provider copies, the agency's own copies), that a restore re-applies the deletion, and what record remains. **One mark:** `⟦HOSTING: longest backup period⟧`. API names "up to 28 days" for the server backups, but the longest period across **all** backups (database, server, offsite E7) is not confirmed, so no number is written |
| `META_LEGAL_TEXT_READY` | **NO**: E14 and the backup period. The deletion path in production, one of the three earlier reasons, **now exists**. Retention is implemented on staging only (owner RETENTION line) and goes to counsel |

## 6. Preconditions remaining

| # | Precondition | Who |
|---|---|---|
| 1 | the named final build, with Y-1…Y-4 | Website |
| 2 | RV4 on that build, with X-1…X-16 and the 18 images | Copy, Reviewer |
| 3 | the owner lines for the texts in §4; E10 and SG-H6-1 for the notices | Owner, counsel |
| 4 | "E14 vollständig" | Owner, API |
| 5 | the longest backup period across all backups | Hosting |
| 6 | the Vercel function region in the EU, read back | Website, Hosting |
| 7 | the first regular weekly run checked, then REPORT-AKTIV on the page | Hosting, API |
| 8 | v3 and Release U, for the task wording | Hosting, API, Daily |

## 7. What I did not do

No application code, no design, no acceptance, no publication. The owner's E14 file was not opened. Nothing was written into
the n8n repo. Read with GET only.
