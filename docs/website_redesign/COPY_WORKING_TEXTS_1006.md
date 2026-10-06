# COPY_WORKING_TEXTS_1006 — the implementer's working texts, confirmed or replaced

**State:** `2026-10-06` · **Lane:** Website Copy / Product Truth → **Website Implementer**, now.
**Base:** excerpt `c360d1f`, the strings flagged `WORKING` in
[en.ts](lib/i18n/dictionaries/en.ts) and [es.ts](lib/i18n/dictionaries/es.ts), listed in
`WEBSITE_VISUAL_1005_RETURN_v1.md` §8.
**Measured against:** the package matrix in
`backend_handoff/handoff_in_2026-10-03/AUDIT_ORDERS_2026-10-03.md` §"Paketmatrix".
**Status:** DRAFT by its author, not independently reviewed.

**Nine items. Seven confirmed unchanged, two replaced.** Where a text is confirmed, the `WORKING` flag and
the `data-working-text` attribute come off and nothing else changes.

---

## 1. Confirmed as written

| # | Text | ES | EN | Matrix backing |
|---|---|---|---|---|
| W-1 | headline, English form | *(owner's line)* Menos gestión. Más tiempo para tus clientes. | **Less admin. More time for your clients.** | not a capability claim: no number, no guarantee, no channel. The scope sits in the sub-line and in the demonstration's state line |
| W-2 | sub-line | Nuova responde en español a las consultas por WhatsApp y email, guarda lo que pide cada cliente y deja claro el siguiente paso. | Nuova replies in Spanish to enquiries on WhatsApp and email, records what each client asks for and makes the next step clear. | "automatische Antworten · Prod, **nur ES**" · "E-Mail-Labels · Prod, Gmail" · "CRM-Einträge · Prod" · "Jarvis/Daily Goals · Prod: Liste/Übernehmen/Erledigen" |
| W-3 | demo button | Ver la demostración | See the demonstration | no promise. It opens what is on the same page |
| W-4 | label 4 | Siguiente paso | Next step | the next step is a task for a person, which production has |
| W-5 | step 1 line | Laura pregunta por un piso en Estepona un domingo por la noche. | Laura asks about a flat in Estepona on a Sunday night. | the example, labelled as invented data |
| W-6 | step 3 line | Lo que ha pedido queda guardado: el inmueble, la visita y su idioma. | What she asked for is kept: the property, the viewing and her language. | `lead_memory` holds what was asked for, the language and the viewing wish; `dg_task` holds the viewing |
| W-7 | step 4 line | Una persona de tu equipo confirma la visita. Nuova no acuerda fechas. | One of your people confirms the viewing. Nuova agrees no dates. | "Kalender · nicht verbunden, Buchungsmodus undefiniert". The sentence is exactly right and must not soften later |

**On W-2, two notes rather than changes.** The sub-line is 22 words against the round's "about twenty".
Cutting it to twenty means dropping "por WhatsApp y email", and those two words are the only place in the
hero where the channels appear, so the length stays. And "responde en español" is the whole scope: the
matrix says production answers in Spanish only, for our own agency, and has **never been delivered to a
real customer**. The hero may therefore render publicly only once the gate on register row L-01 is
reported, which is unchanged from `LAUNCH_COPY_v1` §1. Nothing on the page needs to say that; the gate
does the work.

**On W-1, one option, not a request.** "More time **with** your clients" is warmer than "for" in English.
The Spanish is the owner's own line and stays as it is. If the English is ever re-cut, that is the one
word worth looking at.

---

## 2. Replaced

| # | Text | Before (working) | After ES | After EN | Why |
|---|---|---|---|---|---|
| W-8 | step 4 **title** | "Queda claro el siguiente paso" · "The next step is clear" | **Tu equipo toma la visita** | **Your team takes the viewing** | it repeated label 4 word for word, two lines apart on the same screen. The new title names the action production actually performs and the demonstration actually shows: the task is taken. Matrix "Jarvis/Daily Goals · Prod: Liste/Übernehmen/Erledigen" |
| W-9 | footer line | "Nuova responde a las consultas de tu agencia y mantiene en un solo sitio lo que pide cada cliente. Hecho para agencias en España." · "Nuova answers your agency's enquiries and keeps what each client asks for in one place. Built for agencies in Spain." | **Nuova responde a las consultas de tu agencia y deja claro el siguiente paso. Hecho para agencias en España.** | **Nuova answers your agency's enquiries and makes the next step clear. Built for agencies in Spain.** | the working line kept the answer and the record but dropped the step that is best proven of the three, the task a person takes and completes, which is the only part an owner has tested in production. The replacement is also four words shorter |

---

## 3. What did not need saying, and stays out

No minutes, no response time, no "every enquiry", no language beyond Spanish and no language count, no
channel beyond WhatsApp and e-mail, no price, no quota, no promised leads, no customer quote. Nothing
about automatic 3D, appointment booking or campaigns. The demonstration's own state line already carries
"Disponible: respuesta en español y ficha del cliente", and the hot alert stays out of the hero for the
reason given in `COPY_HERO_1003` §3.

**Signal:** `COPY_WORKING_TEXTS_1006 = DELIVERED` → Website Implementer. Seven confirmations, two
replacements, no other string touched.
