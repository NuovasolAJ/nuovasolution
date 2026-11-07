# COPY → Redesign · New texts for build 1108 · ES + EN · 07.11.2026

**For:** Redesign (applies the texts in build 1108) and the Reviewer (checks them). **Owner order of 07.11.:** hero buttons "Reservar una
demo" and WhatsApp, the voice "en nombre de tu agencia", a block "Quién está detrás" with no invented clients or figures, the price spot
"Piloto gratuito · precio en la demo", and a friendly wording for "Hora de envío, no de entrega".
**Owner's pictures:** `owner_review_1107/` (O1107_01 to _11, AUDIT_*).
**Text source:** this file, beside handover 1105 v3 §14–§23 and the rows D-1 to D-23 of `COPY_CHECK_1107_BUILD_a5f1d21_v1.md`. Where
this file gives a text for a place, it replaces the earlier one.
**Read against:** Redesign's commit `0d6d323` (`lib/claims.ts`, `lib/content/home-1103.ts`, `lib/content/faq.ts`, the dictionaries).
**Marking:** editorial and technical. Not a legal approval, not a Meta approval. No number, price or company fact is invented here;
the places that need one name who supplies it.

---

## 1. Hero buttons

The hero gets two actions and nothing else. "Ver la demo" and "Pedir acceso" / "Pruébalo gratis 14 días" leave the hero.

| # | Place | ES | EN | Rule |
|---|---|---|---|---|
| H-1 | main button in the hero, and the header's black button | **Reservar una demo** | **Book a demo** | Leads to the booking page. Copy has not checked whether that page works (`contact/page.tsx:31` falls back to a cal.com address). **Redesign checks it opens a real booking page before the build is named.** If it does not, the button reads "Solicitar una demo" / "Request a demo" and leads to `/contact`. "Reservar" promises the visitor can pick a slot; only use it when they can. |
| H-2 | second button in the hero, with the WhatsApp icon | **Escríbenos por WhatsApp** | **Message us on WhatsApp** | Leads to `https://wa.me/⟦number⟧`. The number comes from the owner. Copy does not write it, and it is never Carina's test number. The button sits in both views. |
| H-2a | the text WhatsApp opens with (`?text=`) | Hola, tengo una agencia y me gustaría ver NuovaSolution. | Hi, I run an agency and would like to see NuovaSolution. | The visitor can change it before sending it. |
| H-2b | `aria-label` of H-2 | Escribir a NuovaSolution por WhatsApp (se abre WhatsApp) | Message NuovaSolution on WhatsApp (opens WhatsApp) | |
| H-3 | the line under the two buttons | **Piloto gratuito · precio en la demo** | **Free pilot · pricing in the demo** | Same text as P-1. In both views it replaces "Sin método de pago y sin renovación automática." and "Acceso por invitación." |
| H-4 | the round arrow at the bottom of the hero (today "Ver la demo") | Ver cómo responde | See how it replies | The word "demo" stays only on the booking button. The inline demo is the example below; the booked demo is with a person. |

**No line about who answers on WhatsApp, and no time promise.** Who replies on that number is the owner's to say (O-2).

---

## 2. The voice: "en nombre de tu agencia"

The customer writes to the agency, and the reply comes as the agency's. The sender label "Asistente automático de la agencia" (§3, §10.5,
D-8) already says this. These texts carry it into the wording.

| # | Place (file at `0d6d323`) | Target view, ES | Target view, EN | Public view while the condition is off (ES · EN) |
|---|---|---|---|---|
| V-1 | flow step 02, title (`home-1103.ts:58`) | Responde en nombre de tu agencia | It replies on behalf of your agency | NuovaSolution responde · NuovaSolution replies (as today) |
| V-2 | flow step 02, line (`home-1103.ts:58`) | En español, con una pregunta útil de vuelta, y dice que es un asistente. | In Spanish, with one useful question back, and it says it is an assistant. | the same text, in both views |
| V-3 | footer brand line (`es.ts:1069` and its EN twin) | NuovaSolution responde en nombre de tu agencia y guarda lo importante en la ficha de cada cliente. Hecho para agencias en España. | NuovaSolution replies on behalf of your agency and keeps what matters on each client's record. Made for agencies in Spain. | NuovaSolution responde a las consultas de tu agencia y guarda lo importante en su ficha. Hecho para agencias en España. · (EN as today) |
| V-4 | FAQ "¿Qué hace NuovaSolution?" (`home-1103.ts:461`, `faq.ts:53`) | Responde en nombre de tu agencia, en español, a las consultas que llegan por ⟦canales⟧, y guarda lo importante de cada una en su ficha, con su prioridad y su motivo. | It replies on behalf of your agency, in Spanish, to the enquiries that arrive on ⟦canales⟧, and keeps what matters from each one on its record, with its priority and reason. | the current public answer stays |

**Condition for the public view.** "En nombre de tu agencia" is true for an invited agency only when the reply goes out from that agency's
own channel: its mailbox (`mailboxConnection`) or its WhatsApp number (`whatsappOwnNumber`). Both are **soon** at `0d6d323`. So V-1, V-3
and V-4 show their target text when either key is on, and the fallback until then. API confirms when the first one is on in production (O-4).

**The h1 stays as it is.** "Mientras enseñas, NuovaSolution atiende." is the owner's line and the brand moment; it names the product, not
the voice of the reply.

---

## 3. Block "Quién está detrás" / "Who is behind it"

**Where:** on the home page, after "Cómo empezar y qué pasa con los datos" and before "Preguntas".
**Views:** the same text in both views. Every sentence is true today.
**Not in the block, on purpose:** client logos, testimonials, client names, counts of agencies or enquiries, results, years, a team size, an
address, an office city. A photo only if the owner supplies a real one and agrees to its use. No stock person.

### ES

> **QUIÉN ESTÁ DETRÁS**
>
> ## Detrás hay una persona a la que puedes escribir.
>
> NuovaSolution es una marca de ⟦titular⟧. La hemos hecho para agencias inmobiliarias en España.
>
> Empezamos con un piloto con pocas agencias. Por eso aquí no verás logotipos de clientes, testimonios ni cifras de resultados: los
> mostraremos cuando sean reales y tengamos permiso para hacerlo.
>
> - Te contesta una persona, en español o en inglés: antonio@nuovasolution.com
> - La base de datos está en la Unión Europea (Fráncfort).
> - Cada respuesta automática indica que la escribe un asistente.
>
> [Reservar una demo]

### EN

> **WHO IS BEHIND IT**
>
> ## Behind it is a person you can write to.
>
> NuovaSolution is a brand of ⟦holder⟧. We built it for real estate agencies in Spain.
>
> We are starting with a pilot with a few agencies. That is why you will not find client logos, testimonials or results figures here: we
> will show them once they are real and we have permission to.
>
> - A person answers, in Spanish or English: antonio@nuovasolution.com
> - The database is in the European Union (Frankfurt).
> - Every automatic reply says that an assistant wrote it.
>
> [Book a demo]

**Short version**, if the owner wants the block without the second paragraph: drop it. Every other line stays.

| Line | Source of the fact |
|---|---|
| ⟦titular⟧ / ⟦holder⟧ | The owner's name, with its accents, from `.nuova-secrets\owner_firmendaten_1106.txt`. It is the same sentence as the brand fix and goes to Redesign outside the repo. It is filled at build time, never committed. Until it is filled, the sentence is left out; no visible placeholder. "Marca" stays marked for counsel. The spelling in the Alta document is final. |
| "una persona … en español o en inglés" | the contact page: "Contacto humano directo, en español o en inglés" |
| the e-mail address | already on the site (contact, footer, FAQ) |
| "pocas agencias" | the pilot one-pager; no number is given |
| Fráncfort | the one-pager and the site's "Cómo empezar" block, word for word |
| the notice | the site's "Cómo empezar" block, word for word; owner line `KI-HINWEIS-BASIS = v1.1-es` |

---

## 4. Price: "Piloto gratuito · precio en la demo"

| # | Place | ES | EN | Rule |
|---|---|---|---|---|
| P-1 | hero, under the buttons (= H-3) | Piloto gratuito · precio en la demo | Free pilot · pricing in the demo | both views |
| P-2 | `/packages` and the home "Planes" lead (`home-1103.ts:377`; today "Empieza con 14 días de Essential, gratis…") | Piloto gratuito · precio en la demo. Te explicamos qué plan encaja con tu agencia y su precio antes de acordar nada. | Free pilot · pricing in the demo. We explain which plan fits your agency, and its price, before anything is agreed. | target view (the table shows); in public, where there is no table: "Piloto gratuito · precio en la demo." alone |
| P-3 | FAQ Q-13 question (`faq.ts:205`, `home-1103.ts:467`) | ¿Cuánto cuesta? | What does it cost? | both views; "después" goes |
| P-4 | FAQ Q-13 answer | El piloto es gratuito. El precio para después del piloto te lo explicamos en la demo, antes de acordar nada. | The pilot is free. We explain the price for after the pilot in the demo, before anything is agreed. | both views |

**What the line does not say:** a duration, a number of agencies, "sin compromiso", "sin tarjeta", a date. Those stand only once the written
pilot agreement says them (counsel; one-pager "Acuerdo"). The agreement must say the pilot is free. The site and the one-pager must not
differ on that.

**Two offers in the target view.** The target view still shows the 14-day trial ("Pruébalo gratis 14 días", the block "14 días gratis,
en 3 pasos", nav "Prueba", Q-11, Q-12). Next to "Piloto gratuito" that reads as two different free offers. Copy's recommendation: in build
1108 the pilot replaces the trial in both views, and the `trial` key with its texts stays in the source for later. That is the owner's call (O-1).

---

## 5. "Hora de envío, no de entrega", friendlier

| # | Place (`home-1103.ts:135`) | ES | EN |
|---|---|---|---|
| T-1 | foot of the "Respondidas hoy" card | Hora en que salió cada respuesta | Time each reply was sent |

The meaning stays: the time is the send time. It says nothing about delivery or reading, and there are still no ticks.

---

## 6. Open, who answers by when

| # | Question | Who | By when |
|---|---|---|---|
| O-1 | Does the free pilot replace the 14-day trial in the target view as well (§4)? | owner | before Redesign names 1108 |
| O-2 | The WhatsApp number for H-2. Who answers on it? If an automatic reply goes out there, it carries the approved notice (v1.1-es is still with counsel). Otherwise a person answers. Copy writes no sentence about it until the owner says. | owner | before 1108 |
| O-3 | Does the booking page behind H-1 really let a visitor book a slot? | Redesign checks | before naming 1108 |
| O-4 | When does a reply first go out from an invited agency's own mailbox or number (public condition for V-1, V-3, V-4)? | API | Mon 09.11. evening, with the K5 answer |
| O-5 | A real owner photo for the block, yes or no? | owner | optional |
