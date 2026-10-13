# TEXTS 1013 — morning letter, hold case, WhatsApp templates, language lines

**State:** `2026-10-13` · **Lane:** Website Copy / Product Truth.
**Recipients, per section:** §1 **Daily** and **Hosting** · §2 **Lead** · §3 **Social** · §4 the website
build after 15.10. · §5 **Lead** and **API** · §6 legal, through this lane · §7 **Owner**, with **Social**.
**Sources read:** `AUDIT_TO_LANES_2026-10-13_R17.md` and `LAUNCH_GATE_v1.md` R17-1, R17-5,
`DAILY_SYNC_1012_RETURN_v1.md` §5 (the envelope), `LEAD_LANGUAGE_AND_CROSSCHANNEL_STATE_1012_v1.md`,
`PRODUCT_TRUTH_TABLE` v1.1.
**Status:** DRAFT by its author, not independently reviewed. No website redesign work is in here.

---

## 1. MAIL_SHELL_v1 — the morning letter, ES and EN

Bound to the one envelope Daily delivers: `dg_task_evidence/v3`, block `summary` with
`kind · customer · request · state · headline`, plus `dg_day_answer`. **Every line below renders only
from those fields.** Nothing is computed in the mail and nothing is invented.

Three rules this letter obeys, each from a measured fact:

1. **No appointment is ever named.** In production `dg_asst_schedule` does not exist, so the product
   itself says "I cannot read that yet" rather than "no appointments". A letter that implied a calendar
   would be the one thing the product refuses to do.
2. **The reason comes from the envelope**, never from a ranking the mail invents. If `summary` carries no
   reason, the task is listed without one.
3. **A phone number is written with its plus sign**, as `+34 600 000 000`, because a number the reader
   taps has to dial.

| Slot | ES | EN |
|---|---|---|
| EYEBROW | Tu mañana en {agencia} | Your morning at {agency} |
| SUBJECT, with tasks | {n} cosas esperan a una persona | {n} things are waiting for a person |
| SUBJECT, one task | Una cosa espera a una persona | One thing is waiting for a person |
| SUBJECT, zero | Nada pendiente esta mañana | Nothing pending this morning |
| GREETING | Buenos días, {nombre}. | Good morning, {name}. |
| SUMMARY, with tasks | Esto es lo que sigue abierto. Empieza por la primera: es la que lleva más tiempo esperando. | Here is what is still open. Start with the first one: it has been waiting longest. |
| SUMMARY, one task | Queda una sola cosa abierta. | There is one thing still open. |
| FIGURES, one row per task | **{summary.kind}: {summary.customer}** · {summary.request} · {summary.state} | **{summary.kind}: {summary.customer}** · {summary.request} · {summary.state} |
| FIGURES, the reason line under a row | Por qué ahora: {summary.headline} | Why now: {summary.headline} |
| FIGURES, a callback row | Llamar a {customer} al {+34 …} | Call {customer} on {+34 …} |
| NEXT_ACTION | Lo siguiente: {summary.kind} de {summary.customer}. | Next: {summary.kind} for {summary.customer}. |
| BUTTON | Abrir mis tareas | Open my tasks |
| FOOTER | Lo recibes porque trabajas en {agencia}. Las tareas se toman y se cierran en tu lista. | You receive this because you work at {agency}. Tasks are taken and closed in your list. |

**The zero state, and it is not an empty list.**

| Slot | ES | EN |
|---|---|---|
| SUMMARY | Esta mañana no hay nada esperando a una persona. | This morning nothing is waiting for a person. |
| The useful half | Si esperabas algo, dínoslo y lo miramos: a veces lo que falta es un canal, no una tarea. | If you expected something, tell us and we will look: sometimes what is missing is a channel, not a task. |
| BUTTON | Ver mi lista | See my list |

**What the letter must never contain:** an appointment or a time slot, a count of calls that were or were
not missed, a priority score, a figure the envelope does not carry, a task from another agency, or a raw
field name. If `summary.headline` is absent, the "why now" line is absent too; a reason nobody wrote is
not improved by inventing one.

---

## 2. The hold case, and the three customer options (E18) — for Lead

R17-1: when a reply is held, exactly one visible task, one notice by the hot-lead rule, one counting
event, and nothing sent in an unapproved language.

### 2.1 What the agency sees

| Slot | ES | EN |
|---|---|---|
| Task title | Responder a {customer} en {idioma} | Answer {customer} in {language} |
| Task sentence | Hemos entendido el mensaje pero no lo hemos respondido: todavía no tenemos aprobado el aviso de IA en {idioma}. Responde tú, o usa el borrador de abajo. | We understood the message but did not answer it: the AI notice is not approved in {language} yet. Answer it yourself, or use the draft below. |
| The draft's label | Borrador para que lo uses tú | Draft for you to use |
| The reason, short | Idioma sin aviso aprobado | Language without an approved notice |
| In the morning letter | Mensaje en {idioma} esperando respuesta humana | Message in {language} waiting for a human reply |

**A held send is not a hot lead.** The two have different reasons and different urgencies, and the task
sentence says which one this is. If the same enquiry is also hot, that is a second signal with its own
event, not a re-use of this one.

### 2.2 The three options, as the agency chooses them

| Option | What the agency is choosing | The sentence on the setting |
|---|---|---|
| **A** | nothing is sent; a person answers | ES "No enviamos nada. La consulta queda como tarea y responde una persona de tu equipo." · EN "We send nothing. The enquiry becomes a task and a person from your team answers." |
| **B** | a Spanish reply with the Spanish notice, whatever language the customer wrote in | ES "Respondemos en español, con el aviso en español, aunque el cliente haya escrito en otro idioma." · EN "We answer in Spanish, with the Spanish notice, even when the customer wrote in another language." |
| **C** | the customer's language, once that language's notice is approved | ES "Respondemos en el idioma del cliente en cuanto el aviso de ese idioma esté aprobado. Hoy: solo español." · EN "We answer in the customer's language as soon as that language's notice is approved. Today: Spanish only." |

### 2.3 What the customer receives, per option

| Option | The customer gets |
|---|---|
| **A** | nothing from the system. The first thing they receive is written by a person |
| **B** | the Spanish reply, opening with the approved Spanish notice, quoted word for word as it is approved. Nothing in the message apologises for the language; it simply is in Spanish |
| **C** | today identical to A, because no second language is approved. The day a language is approved, that language's reply with that language's approved notice |

**Option B needs one sentence the agency should see before choosing it**, and it is not a legal opinion:
ES "Tu cliente escribió en otro idioma y recibirá una respuesta en español." · EN "Your customer wrote in
another language and will receive a reply in Spanish." Whether that is wise is the agency's call; it must
not be a surprise.

---

## 3. E22 — the WhatsApp template wording, for Social

**Submission is Social's, approval is Meta's, and neither is a copy decision.** What this section does is
give the wording and name the category honestly, because the category is what Meta checks and no
phrasing changes it.

| # | Purpose | Category, stated plainly | Language |
|---|---|---|---|
| T-1 | staff alert | **utility.** The recipient is the agency's own employee and the message is about work assigned to them | es, en |
| T-2 | an offer the customer asked for during a call | **utility**, and only inside the window the request opened. Outside it, a template is still a template and needs its own approval | es |
| T-3 | follow-up about a new listing | **marketing.** It is a new approach about something the customer did not ask for today | es |

| # | ES | EN |
|---|---|---|
| T-1 | Nueva consulta para {agencia}: {cliente} pregunta por {asunto}. Está en tu lista de tareas. | New enquiry for {agency}: {customer} asks about {subject}. It is in your task list. |
| T-2 | Hola {cliente}, aquí tienes lo que te comentamos por teléfono sobre {inmueble}. Si quieres verlo, respóndenos a este mensaje. | — *(Spanish only: no other notice is approved)* |
| T-3 | Hola {cliente}, ha entrado un inmueble que encaja con lo que buscabas: {inmueble}. Si no quieres más mensajes como este, respóndenos BAJA. | — *(Spanish only)* |

**Two things no wording can do, and the templates do not pretend otherwise.**

**The opt-in is not satisfied by the sentence.** T-3 is a marketing message. It may only go to a person
who agreed to receive proposals, that agreement has to exist as a record before the send, and writing
"you can unsubscribe" at the end does not create it. The opt-out line is there because a marketing
message needs one, not as evidence that the opt-in happened.

**The category is not chosen by us.** Labelling T-3 as utility because it is "useful" is precisely the
move that gets a number restricted. It is marketing, it is submitted as marketing, and if that is refused
then the answer is no template rather than a different word.

T-1 carries no customer data beyond what the employee already has the right to see, and no template
carries a price, an availability or an appointment.

---

## 4. The language and channel lines, for the build after 15.10.

The order is right that **"only Spanish" is wrong as a blanket statement**, and so is "every language".
Per statement: the channel, the version it was measured on, and the evidence.

| # | The honest line | Channel | Evidence |
|---|---|---|---|
| L-1 | ES "Hoy respondemos en español." · EN "Today we answer in Spanish." | email, WhatsApp | one approved notice: `v1.0-es-2026-08`, active, channels whatsapp+email, one tenant |
| L-2 | ES "El sistema responde en el idioma del cliente; lo que falta en otros idiomas es la aprobación legal del aviso, no la función." · EN "The system replies in the customer's language; what is missing for other languages is the legal approval of the notice, not the capability." | email, WhatsApp | the LANGUAGE RULE is in the production agent `6f4740f2`; es/en/de/it exercised on staging, battery B 8/8 with per-language test notices |
| L-3 | ES "Si alguien escribe en un idioma sin aviso aprobado, no enviamos nada y queda una tarea para tu equipo." · EN "If somebody writes in a language without an approved notice, we send nothing and your team gets a task." | email, WhatsApp | the guard fails closed, measured in window 2, cases n3/n3b |
| L-4 | **no line about voice languages** | voice | the approval covers whatsapp+email; voice is not an approved channel and Voice owns its own table. **Asked of Voice:** the capability table, so a line can be written rather than guessed |
| L-5 | **no line about the web form** | web form, Q&A | not in the pilot scope |
| L-6 | ES "Un cliente que escribe por email y luego por WhatsApp son hoy dos fichas." · EN "A customer who writes by email and later by WhatsApp is two records today." | both | production holds only `upsert_lead_memory`; the four identity functions are absent there. Already on the CRM page since 2026-09-29 and now backed by a production reading |

**Not derivable from the staging battery:** that we support English, German or Italian. Those runs used
**test notices** created for the run (`vSTAGING-TEST-{en,de,es,it}-2026-09`). A test notice proves the
switch, not the permission, and the distinction is the whole point.

---

## 5. The weekly report: three things that are not the same — for Lead and API

R17-5 separates reserved, accepted and delivered. The weekly mail of `WEEKLY_REPORT_MAIL_v1` has
`received` and `answered` and must not let either stand in for delivery.

| Term | What it may count | The line it earns |
|---|---|---|
| **received** | an enquiry arrived and was recorded | ES "Llegaron {n} consultas." · EN "{n} enquiries arrived." |
| **answered** | a reply was produced **and handed to the provider** | ES "Se respondieron {n}." · EN "{n} were answered." |
| **delivered** | the provider confirmed delivery, with its own reference | ES "{n} llegaron al cliente, confirmado por el canal." · EN "{n} reached the customer, confirmed by the channel." |

**Today the third line does not render at all**, because the `reply_delivered` event with a provider
reference is still to be built (Lead's point 7 with API). That is correct: an answered count printed as a
delivered count is the kind of number an agency acts on and we cannot stand behind.

A held turn counts as **received**, never as answered. An aborted run counts as nothing at all.

**Never in this report:** revenue, saved time, advertising results, a conversion rate, or any figure the
contract does not carry. The benefit is shown by naming what actually happened: how many enquiries
arrived, how many were answered, how many viewings were asked for, how many tasks the team closed, and
what is still open. That is concrete and it is all measured.

---

## 6. Supabase: what changed, and what it does not change

**New and confirmed:** the production project is on **Pro** and **database backups are visible**. That
closes the worst of what §5c of `META_LEGAL_TEXT_FINAL.md` described, where nothing restorable was listed
at all.

**Three things it does not do, and the legal text must not imply otherwise:**

| | |
|---|---|
| **Storage is not the database.** | Media objects are not part of a database backup. A lost document is still lost unless storage is backed up separately |
| **A visible backup is not a tested restore.** | Nobody has restored anything. "We have backups" and "we can get your data back" are two different sentences and only the first is true |
| **Retention is still undecided.** | A backup that keeps what the retention rule deletes makes the published period false. The decision in §5b is unchanged, and now it has to be made **with** the backup window rather than before it |

So the legal wording stays bound to what is implemented: the reply identifiers keep their rule, the
message texts keep "today nothing is on a timer", and nothing claims a recovery that has never been
performed. One line changes in `META_LEGAL_TEXT_FINAL.md` §5c, from "no restorable backup is listed" to
the state above.

---

## 7. The company details — one request, with Social

Unchanged and still open. One line, asked once:

> `FIRMENANGABEN = <Rechtsform>, <NIF/CIF>, <Straße und Hausnummer>, <PLZ> <Ort>, <Land>`

**Nothing is invented in the meantime.** No company name, no register entry and no legal form appears in
any text until that line exists: the pages name the person who is actually published as the controller
today. Everything in the line ends up public in the legal notice, so it needs no secret channel; only the
official document for Meta's business verification goes through the secure store.
