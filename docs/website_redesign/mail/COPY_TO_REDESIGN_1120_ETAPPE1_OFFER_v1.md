# Copy → Redesign, RV6, Audit, API: stage 1 of the owner's brief: the offer from the first button to the confirmation · 20.11.2026

**Order:** the owner, 20.11. evening, directly to Copy. Brief text version `docs/website_redesign/OWNER_BRIEF_1120_THEMA16_v1.md` (`6726df1`).

The owner's order:
> "Bitte liefere Redesign zuerst die einsetzbaren Texte für Etappe 1 … Nur Essential bietet die kostenlose 14-Tage-Testphase. Growth führt zu einer Demo- oder Vertriebsanfrage, Enterprise zu einem Gespräch … vom ersten Button bis zur Bestätigung … Hero, globalen und mobilen Button, Paketkarten, Vergleichsmatrix, Pilotseite, FAQ, Formulare und Bestätigungen … ‚14 días con todo lo de Growth' bitte überall korrigieren, einschließlich der englischen Fassung."

**Status:** an editorial and technical check, not a legal approval and not a Meta approval.

**How it relates to batch 1** (`COPY_TO_REDESIGN_1120_BRIEF_MAKLERALLTAG_BATCH1_v1.md`, `c0975ad`):
- Batch 1 §1 (hero scene) and §2 (the WhatsApp moment) stay.
- **This file replaces batch 1 §3** (plans and the way in), key by key against Redesign's `lib/content/brief-1120.ts`.
- Where batch 1 and this file differ, this file applies.

---

## 0. The offer logic (one rule for the whole site)

| Plan | The one offer | Button (short form for header, menu and the sticky bar) | Where it leads | Confirmation |
|---|---|---|---|---|
| Essential | Prueba Essential gratis durante 14 días · Try Essential free for 14 days | Prueba Essential gratis · Try Essential free | the request form, Essential preselected | §4, "trial" |
| Growth | a demo | Pide una demo de Growth · Book a Growth demo | the request form, Growth preselected | §4, "demo" |
| Enterprise | a conversation | Habla con nosotros sobre Enterprise · Talk to us about Enterprise | the request form, Enterprise preselected | §4, "conversation" |
| every plan, secondary | contract directly (where it is offered) | Contratar directamente · Go straight to a plan | the request form, "contract" | §4, "contract" |

**Wording rules:**
- **T-1.** Every sentence that offers the free 14 days names **Essential**. Every "gratis", "free" or "14 días" without a plan goes.
- **T-2.** **One wording for "no card":** "sin tarjeta" / "no card". "Sin pago", "Sin método de pago" and "No payment (method)" go. (`COPY_SYNC_1024` X-11 chose "sin método de pago"; "sin tarjeta" is shorter and is the one on the pilot line the owner released. This replaces X-11.)
- **T-3.** **The words "piloto" and "pilot" leave the customer pages.** What was the pilot is now the Essential trial. Growth is no longer in it, in any language.
- **T-4.** **The trial is activated on request** (Q-1, changed from batch 1):
  - The owner said "kein Selbst-Start" on 20.11. 09:05, point 5. `publicSignup` is not released, and Redesign already builds the form with Essential preselected.
  - So no line says "empieza por tu cuenta" or "crea tu cuenta".
  - If the owner releases self-start, the sign-up texts are ready (`COPY_TO_PM_API_1120_T28_REACTIVATION_T23_SIGNUP_TRIAL_v1.md` §2).

---

## 1. `brief-1120.ts`, key by key

| Key | ES | EN | Note |
|---|---|---|---|
| `hero.h1` | Mientras enseñas un piso, ¿quién atiende a Mila? | While you're showing a flat, who's looking after Mila? | the owner's line; EN natural |
| `hero.sub` | NuovaSolution le contesta por WhatsApp al momento, entiende qué busca y te deja la tarea lista: a quién llamar y qué comprobar. | NuovaSolution answers her on WhatsApp straight away, works out what she's looking for and leaves you the task ready: who to call and what to check. | batch 1 §1 |
| `hero.cta` | Ver cómo queda la tarea | See the finished task | |
| `hero.ctaTrial` | Prueba Essential gratis | Try Essential free | short, so it is not a second main action |
| `hero.trialLine` | 14 días gratis, sin tarjeta. | 14 days free, no card. | stands under `ctaTrial`, which already names Essential |
| `hero.scene.enquiry` | Consulta por WhatsApp | Enquiry on WhatsApp | |
| `hero.scene.task` | Tarea para Marta | Task for Marta | a name makes the task real (batch 1 §1.2) |
| `hero.scene.mark` | Ejemplo · datos ficticios | Example · fictional data | the site's one form of the mark |
| `demo.invite` | Elige por dónde te escribe el cliente. | Pick the channel your client writes on. | |
| `demo.taskLabel` | Tarea | Task | |
| `plans.who.essential` | Para una oficina | For one office | brief p. 5 |
| `plans.who.growth` | Para equipos que se reparten el trabajo | For teams that share the work | |
| `plans.who.enterprise` | Para varias oficinas | For several offices | |
| `plans.action.essential` | Prueba Essential gratis durante 14 días | Try Essential free for 14 days | the owner's literal wording |
| `plans.action.growth` | Pide una demo de Growth | Book a Growth demo | |
| `plans.action.enterprise` | Habla con nosotros sobre Enterprise | Talk to us about Enterprise | |
| `plans.actionLine.essential` | Sin tarjeta. Te escribimos en 24 h laborables para activarla. | No card. We write to you within 24 working hours to set it up. | T-4 |
| `plans.actionLine.growth` | Te respondemos en 24 h laborables, con las condiciones por escrito. | We reply within 24 working hours, with the terms in writing. | the released line B-2s, the same for Growth and Enterprise |
| `plans.actionLine.enterprise` | Te respondemos en 24 h laborables, con las condiciones por escrito. | We reply within 24 working hours, with the terms in writing. | |
| `plans.actionNext.essential` | Abre la solicitud de la prueba, con Essential ya elegido. | Opens the trial request with Essential already selected. | brief p. 7, task 3: said before the click |
| `plans.actionNext.growth` | Abre la solicitud de demo, con Growth ya elegido. | Opens the demo request with Growth already selected. | |
| `plans.actionNext.enterprise` | Abre el formulario de contacto, con Enterprise ya elegido. | Opens the contact form with Enterprise already selected. | |
| `plans.direct` | Contratar directamente | Go straight to a plan | a quiet text link, not a button (M6: "drei breite Elemente wirken wie Hauptaktionen") |
| `plans.line` | Essential se prueba gratis 14 días, sin tarjeta. Growth empieza con una demo y Enterprise, con una conversación. | You can try Essential free for 14 days, no card. Growth starts with a demo, Enterprise with a conversation. | replaces `home-1103.ts:487–488` |
| `plans.linePhone` | 14 días gratis con Essential, sin tarjeta. | 14 days free on Essential, no card. | |
| `plans.adds` (Growth) | Todo lo de Essential, y además: | Everything in Essential, plus: | per tier instead of a bare "Añade" |
| `plans.adds` (Enterprise) | Todo lo de Growth, y además: | Everything in Growth, plus: | |
| `plans.more` | y {n} más | and {n} more | |
| `plans.compare` / `compareClose` | Ver las diferencias / Ocultar las diferencias | See the differences / Hide the differences | |

**The differences under "y además":**
- They come from API, directly to Copy and Redesign (the owner's order).
- Until API's list arrives, they are batch 1 §3.1 with their register keys. Without API's confirmation no difference goes into the fixed build. A tier then shows only its audience and its action.
- API also settles A-1 to A-3 of batch 1 §3.1.

---

## 2. The comparison matrix (desktop) and the folded cards (phone)

- **The action row under the columns:** one button per plan, as in §1.
  - "Ver todo lo que incluye" and "Contratar directamente" are text links.
  - Today's "Empieza 14 días gratis" (`home-1103.ts:492` `wayPilot`) under Essential **and** Growth goes.
- **The cells:**
  - a tick where the plan includes the function, "—" where it does not;
  - 3D "Opcional" in all three columns (owner 16.11.);
  - **no "Próximamente" in any cell** (brief p. 1).
- **The legend:** "Un ✓ donde el plan incluye la función." / "A ✓ where the plan includes the function." (unchanged). The legend line "Próximamente: aún no activo" goes.
- **The line above the matrix:** `plans.line`.

---

## 3. Every other place: today → new

**The matrix of findings.** The places come from a search of the build for "14 días", "14 days", "piloto", "pilot", "Growth", "sin pago" and "Empieza gratis".

**Rendered or not?** Redesign confirms. A line that is not rendered still gets the new text, so it cannot come back wrong.

### 3.1 Home (`lib/content/home-1103.ts`)

| Line | Today | ES new | EN new |
|---|---|---|---|
| `:35` `ctaDemo` | Solicita tu piloto gratuito | Prueba Essential gratis | Try Essential free |
| `:37` pilot line | Piloto gratuito de 14 días, con nuestro acompañamiento… | 14 días gratis, sin tarjeta. | 14 days free, no card. |
| `:459` phone core "entry" | Solicítalo, lo preparamos contigo y empiezan tus 14 días. · Te contactamos en 24 h laborables. | core: Prueba Essential gratis durante 14 días. · proof: Te escribimos en 24 h laborables para activarla. | core: Try Essential free for 14 days. · proof: We write to you within 24 working hours to set it up. |
| `:482` Enterprise line | Todo lo de Growth, para varias oficinas, con … | stays | stays |
| `:487–488` | El piloto gratuito de 14 días incluye todo lo de Growth… | `plans.line` (§1) | `plans.line` |
| `:492` `wayPilot` | Empieza 14 días gratis | only under Essential: `plans.action.essential`; under Growth and Enterprise their own action | |
| `:546–547` title | Cómo empezar: piloto gratuito de 14 días | Cómo empezar con Essential: 14 días gratis | How to start with Essential: 14 days free |
| `:553–560` steps | Solicita tu piloto. · Lo preparamos contigo. · Empiezan tus 14 días. | see table 3.1a | see table 3.1a |
| `:571` trust line | Te acompaña una persona del equipo durante el piloto… | Te acompaña una persona del equipo durante la prueba y después, en español o en inglés. | A person from our team is with you during the trial and after it, in Spanish or English. |
| `:572` trust line | Sin método de pago · El piloto es gratuito. No te pedimos tarjeta ni cuenta bancaria. | Sin tarjeta · La prueba de Essential es gratuita. No te pedimos tarjeta ni cuenta bancaria. | No card · The Essential trial is free. We ask for no card and no bank account. |
| `:605` FAQ "¿Cómo empiezo?" | Solicita tu piloto gratuito… | Con Essential: pides la prueba gratuita de 14 días y te escribimos en 24 h laborables para activarla. ¿Más de un equipo o varias oficinas? Pide una demo de Growth o habla con nosotros sobre Enterprise. | With Essential: you request the free 14-day trial and we write to you within 24 working hours to set it up. More than one team, or several offices? Book a Growth demo or talk to us about Enterprise. |
| `:608` FAQ "¿Cuánto cuesta?" | El piloto es gratuito. El precio para después del piloto… | La prueba de Essential es gratuita. El precio de cada plan te lo decimos antes de acordar nada. | The Essential trial is free. We tell you the price of each plan before anything is agreed. |
| `:617` closing h2 | 14 días para ver qué consultas se te escapan. | 14 días con Essential para ver qué consultas se te escapan. | 14 days on Essential to see which enquiries slip away. |
| `:621`, `:640` buttons | Solicita tu piloto gratuito | Prueba Essential gratis | Try Essential free |
| `:631` trust "pilot" | Empezamos con un piloto con pocas agencias. Por eso aquí no verás logotipos… | Empezamos con pocas agencias. Por eso aquí no verás logotipos de clientes, testimonios ni cifras de resultados: los mostraremos cuando sean reales y tengamos permiso para hacerlo. | We are starting with a few agencies. That is why you will not see client logos, testimonials or result figures here: we will show them when they are real and we have permission. |

**Note on `:631`:** "piloto" here meant our launch phase, not the offer. The sentence stays, without the word.

**3.1a "Cómo empezar", the three steps** (replaces batch 1 §3.5):

| | ES | EN |
|---|---|---|
| 1 | **Pide tu prueba.** Te escribimos en 24 h laborables y la activamos contigo. | **Request your trial.** We write to you within 24 working hours and set it up with you. |
| 2 | **Conecta tu buzón y tu WhatsApp.** Lo probamos con un mensaje real. | **Connect your mailbox and your WhatsApp.** We test it with a real message. |
| 3 | **Empiezan tus 14 días.** Cada consulta recibe respuesta en español y queda en su ficha, con su prioridad y su motivo. | **Your 14 days begin.** Every enquiry gets a reply in Spanish and lands on its record, with its priority and reason. |
| under it | ¿Growth o Enterprise? Te los enseñamos en una demo o en una conversación. | Growth or Enterprise? We show you in a demo or a conversation. |

### 3.2 FAQ page (`lib/content/faq.ts:187–228`)

| Line | Today | ES new | EN new |
|---|---|---|---|
| `:187` group title | Piloto, planes y precio | Prueba, planes y precio | Trial, plans and price |
| `:194` Q | ¿Qué es el piloto? | ¿Puedo probarlo gratis? | Can I try it for free? |
| `:196–197` A | Usas NuovaSolution … 14 días, con todo lo de Growth… | Sí, con Essential: 14 días gratis, sin tarjeta. Te escribimos en 24 h laborables para activar la prueba. Growth te lo enseñamos en una demo y Enterprise, en una conversación, con las condiciones por escrito. | Yes, with Essential: 14 days free, no card. We write to you within 24 working hours to set up the trial. Growth we show you in a demo, Enterprise in a conversation, with the terms in writing. |
| new Q | — | ¿Qué incluye la prueba? | What does the trial include? |
| new A | — | Todo lo de Essential durante 14 días. | Everything in Essential for 14 days. |
| `:211` A ("¿Puedo empezar yo solo?") | Todavía no. El piloto lo preparamos contigo… | La prueba la activamos contigo: la pides y te escribimos en 24 h laborables. | We set up the trial with you: you request it and we write to you within 24 working hours. |
| `:216` Q | ¿Qué pasa cuando termina el piloto? | left out until API answers (topic 23, O-6). No placeholder | |
| `:227–228` A (price) | El piloto es gratuito. El precio para después del piloto… | La prueba de Essential es gratuita. El precio de cada plan te lo decimos antes de acordar nada. | The Essential trial is free. We tell you the price of each plan before anything is agreed. |

**Notes:**
- **"¿Qué incluye la prueba?":** the answer lists nothing itself. It points to the Essential column, so it never contradicts API's list.
- **The +7 days with feedback** are on no customer page until the owner answers Q-2.

### 3.3 Request form and confirmations (`lib/content/pilot-request.ts`, `brief-1120.ts` `contact`)

| Key | ES | EN |
|---|---|---|
| `contact.trial.eyebrow` | Prueba gratuita · 14 días con Essential | Free trial · 14 days on Essential |
| `contact.trial.h` | Prueba Essential gratis durante 14 días | Try Essential free for 14 days |
| `contact.trial.body` | Preparamos Essential contigo y empiezan tus 14 días. Sin tarjeta; las condiciones, por escrito. | We set up Essential with you and your 14 days begin. No card; the terms in writing. |
| `contact.trial.submit` | Pedir la prueba | Request the trial |
| `contact.demo.eyebrow` | Demo · Growth | Demo · Growth |
| `contact.demo.h` | Pide una demo de Growth | Book a Growth demo |
| `contact.demo.body` | Te enseñamos Growth con un caso como el tuyo y te decimos el precio antes de acordar nada. | We show you Growth on a case like yours and tell you the price before anything is agreed. |
| `contact.demo.submit` | Pedir la demo | Book the demo |
| `contact.talk.eyebrow` (new) | Enterprise | Enterprise |
| `contact.talk.h` | Hablemos de Enterprise | Let's talk about Enterprise |
| `contact.talk.body` | Cuéntanos cuántas oficinas tenéis y cómo trabajáis. Te proponemos una conversación y después una propuesta por escrito. | Tell us how many offices you have and how you work. We suggest a conversation, then a proposal in writing. |
| `contact.talk.submit` | Enviar | Send |
| `contact.contract` | unchanged (Copy 441ba1c): Contratar {plan} · Te enviamos el precio y el contrato por escrito. Firmas solo si te encaja. · Enviar solicitud | unchanged |
| `contact.subject.trial` | Prueba gratuita · 14 días con Essential | Free trial · 14 days on Essential |
| `contact.subject.demo` | Demo · plan Growth | Demo · Growth plan |
| `contact.subject.talk` (new) | Conversación · plan Enterprise | Conversation · Enterprise plan |

**`interests` in `pilot-request.ts`:**

| Key | ES | EN |
|---|---|---|
| `pilot` → `trial` | Prueba gratuita de Essential | Free Essential trial |
| `demo` (new) | Demo de Growth | Growth demo |
| `talk` (new) | Enterprise | Enterprise |
| `contract` | Contratar un plan | Hire a plan |
| `model3d` | Modelo 3D de un inmueble | 3D model of a property |
| `other` | Otra consulta | Something else |

**The rest of `pilot-request.ts`:**

| Key | Today | ES new | EN new |
|---|---|---|---|
| `eyebrow` / `h` | Piloto gratuito · 14 días / Solicita tu piloto gratuito | by interest, from the table above | |
| `body` | Hablamos contigo … 14 días de piloto… | by interest, from the table above | |
| `lead` | … te explicamos el piloto y el precio. | Contacto humano directo, en español o en inglés. Te explicamos el plan que te encaja y su precio. | Direct human contact, in Spanish or English. We explain the plan that fits you and its price. |
| `submit` | Solicita tu piloto gratuito | by interest: Pedir la prueba / Pedir la demo / Enviar / Enviar solicitud | Request the trial / Book the demo / Send / Send request |

**The confirmations** (`done.h` and the next steps, by interest):

| Interest | h ES | h EN | Next ES | Next EN |
|---|---|---|---|---|
| trial | Gracias. Una persona del equipo te escribe en 24 h laborables para activar tu prueba de Essential. | Thank you. A person from our team will write to you within 24 working hours to set up your Essential trial. | 1. Te escribimos y acordamos el día. 2. Conectamos tu buzón y tu WhatsApp contigo. 3. Empiezan tus 14 días. | 1. We write to you and agree a day. 2. We connect your mailbox and your WhatsApp with you. 3. Your 14 days begin. |
| demo | Gracias. Una persona del equipo te escribe en 24 h laborables para acordar el día de la demo. | Thank you. A person from our team will write to you within 24 working hours to agree a day for the demo. | 1. Acordamos el día. 2. En la demo vemos un caso como los tuyos. 3. Te enviamos las condiciones por escrito. | 1. We agree a day. 2. In the demo we go through a case like yours. 3. We send you the terms in writing. |
| talk | Gracias. Una persona del equipo te escribe en 24 h laborables para acordar la conversación. | Thank you. A person from our team will write to you within 24 working hours to agree a time to talk. | 1. Acordamos el día. 2. Hablamos de tus oficinas y de cómo trabajáis. 3. Te enviamos una propuesta por escrito. | 1. We agree a day. 2. We talk about your offices and how you work. 3. We send you a proposal in writing. |
| contract | Gracias. Una persona del equipo te escribe en 24 h laborables con el precio y el contrato por escrito. | Thank you. A person from our team will write to you within 24 working hours with the price and the contract in writing. | — | — |
| model3d, other | Gracias. Una persona del equipo te contesta en 24 h laborables, en español o en inglés. | Thank you. A person from our team will answer within 24 working hours, in Spanish or English. | — | — |

### 3.4 Dictionaries (`lib/i18n/dictionaries/es.ts`; EN at the same keys)

| Key (es.ts line) | Today | ES new | EN new |
|---|---|---|---|
| `nav.startFree` (:24) | Empieza gratis | Prueba Essential gratis | Try Essential free |
| hero `note` (:148) | 14 días gratis. Sin pago. | 14 días gratis con Essential, sin tarjeta. | 14 days free on Essential, no card. |
| `access.h2` (:251) | 14 días gratis, sin pago | Prueba Essential gratis durante 14 días | Try Essential free for 14 days |
| `access.lead`, `steps`, `noCharge` (:252–260) | Crea tu cuenta, configura tu agencia tú mismo… | under T-4: Pides la prueba, te escribimos en 24 h laborables y la activamos contigo. Sin tarjeta. (steps as 3.1a) | You request the trial, we write to you within 24 working hours and set it up with you. No card. |
| `offer.h2` / `lead` (:264–265) | Empieza gratis y luego elige un plan · 14 días gratis y sin pago… | Prueba Essential gratis y elige después · Essential: 14 días gratis, sin tarjeta. Growth y Enterprise empiezan con una demo o una conversación. Te decimos el precio antes de acordar nada. | Try Essential free, choose afterwards · Essential: 14 days free, no card. Growth and Enterprise start with a demo or a conversation. We tell you the price before anything is agreed. |
| `trialLine` (:300), `offer.line` (:320) | 14 días · Sin método de pago | 14 días con Essential · Sin tarjeta | 14 days on Essential · No card |
| `offer.cta` (:319) | Probar gratis | Prueba Essential gratis | Try Essential free |
| `packages.h1Neutral` / `leadNeutral` (:372–373) | Empieza con 14 días de prueba · 14 días, sin método de pago… | Elige tu plan · Essential se prueba gratis 14 días, sin tarjeta. Growth empieza con una demo y Enterprise, con una conversación. | Choose your plan · You can try Essential free for 14 days, no card. Growth starts with a demo, Enterprise with a conversation. |
| `packages.h1` / `lead` (:374–375) | Empieza con 14 días de piloto gratuito · … con todo lo de Growth… | same as `h1Neutral` / `leadNeutral` | same |
| `packages.noPriceBody` (:382) | … Empieza la prueba gratis o habla con nosotros. | Te decimos el precio para tu agencia antes de acordar nada. No hay facturación en autoservicio. Prueba Essential gratis o pide una demo. | We tell you the price for your agency before anything is agreed. There is no self-service billing. Try Essential free or book a demo. |
| `packages.cta`, `ctaTrial` (:386, :435) | Empieza gratis | Prueba Essential gratis | Try Essential free |
| `packages.faq[0]` (:390) | ¿Necesito una tarjeta…? No. Durante la prueba no se cobra nada ni se pide método de pago. | ¿Necesito una tarjeta para probar Essential? · No. Durante los 14 días no se cobra nada ni se pide tarjeta. | Do I need a card to try Essential? · No. Nothing is charged and no card is asked for during the 14 days. |
| `packages.faq[2]` (:392) | ¿Tengo que hablar con alguien antes? No. Puedes empezar por tu cuenta. | Solo para activar la prueba: te escribimos en 24 h laborables. La demo es opcional. | Only to set up the trial: we write to you within 24 working hours. The demo is optional. |
| `packages.faq[3]` (:393), `trialLines[1]` (:405) | Conservas tu cuenta y tus datos. Las funciones de pago se pausan… | **left out until API answers O-6** (unproven; to Audit) | |
| `trialLines[0]` (:404) | 14 días, gratis y sin método de pago. | 14 días con Essential, gratis y sin tarjeta. | 14 days on Essential, free, no card. |
| `noPaymentMethod` (:406) | Sin método de pago | Sin tarjeta | No card |
| `trialBadge` / `trialBadgeAligned` (:414–415) | 14 días de prueba · 14 días gratis | 14 días gratis (only on the Essential card) | 14 days free (only on the Essential card) |
| `ctaTrialEssential` (:416) | Solicita una propuesta | Prueba Essential gratis | Try Essential free |
| `trial.h1` (:450) | Prueba gratis durante 14 días. | Prueba Essential gratis durante 14 días. | Try Essential free for 14 days. |
| `trial.ctaPrimary` (:453) | Empieza gratis | Pide tu prueba de Essential | Request your Essential trial |
| `trial.how[0]` (:458) | 14 días gratis · Crea la cuenta de tu agencia y configura tu propio entorno. | 14 días gratis con Essential · Te escribimos en 24 h laborables y activamos la prueba contigo. | 14 days free on Essential · We write to you within 24 working hours and set up the trial with you. |
| `contact.trialH2` / `trialBody` (:495–496) | O simplemente empieza · Prueba gratis durante 14 días. Sin método de pago, sin llamada comercial. | O prueba Essential · 14 días gratis, sin tarjeta y sin llamada comercial. | Or try Essential · 14 days free, no card and no sales call. |
| `contact.lead` (:488) | … nunca es condición para empezar la prueba. | stays | stays |
| `signup.eyebrow` / `lead` (:503–505) | Empieza gratis · 14 días gratis. Sin pago. | only once Q-1 = self-start: Prueba Essential gratis · 14 días gratis, sin tarjeta. | Try Essential free · 14 days free, no card. |
| app `plan_entitlements` (:680) | Tu prueba tiene el alcance de Essential durante 14 días… | stays (already right) | stays |
| app onboarding `lead` (:712) | … los 14 días empiezan cuando la actives. | stays | stays |
| assistant `suggestions[2]` (:1062) | ¿Qué pasa después de los 14 días de prueba? | ¿Qué incluye la prueba gratuita de Essential? | What does the free Essential trial include? |

**Notes:**
- **`trial.ctaPrimary` reads "Pide tu prueba de Essential"** on the trial page itself. There the button says what happens (T-4).
- **The assistant suggestion:** its old question has no proven answer (O-6).

### 3.5 Contact page and legal

| Where | Today | New |
|---|---|---|
| `app/[locale]/contact/page.tsx:41` | Piloto gratuito · 14 días con Growth / Free pilot · 14 days with Growth | `contact.trial.eyebrow` (§3.3) |
| `lib/content/legal.ts:132` | La prueba es gratuita durante 14 días y no requiere ningún método de pago. | **not Copy's to change** (legal text, "nach freigegebenem Wortlaut"). Copy notes only that it names no plan. Owner or counsel decide whether it becomes "La prueba de Essential…" |

---

## 4. For the owner

| # | Question | Default in this file |
|---|---|---|
| Q-1 | Essential trial: on request (form, a person activates it) or self-start (sign-up)? | **on request** (changed from batch 1; your point 5 of 09:05, and Redesign's build) |
| Q-2 | Do the 7 extra days with feedback stay? | on no customer page until you say yes |
| Q-3 | `legal.ts:132` names no plan. Change it to Essential? | unchanged until you or counsel say so |

## 5. For Audit: the open function proofs behind these texts (each is an open launch point, not a line on the page)

| # | Statement on the page | Key / proof | State |
|---|---|---|---|
| P-1 | "Conecta tu buzón y tu WhatsApp" (step 2, trial confirmation) | `mailboxConnection` (A12), `whatsappOwnNumber` | soon; A12 Tue 24.11. at the earliest |
| P-2 | "Te escribimos en 24 h laborables" (every confirmation) | an intake for the form that reaches a person (the route answers "simulated" today, `pilot-request.ts`) | API / Hosting |
| P-3 | Growth "Cada persona, su lista de tareas" | `taskList` | soon |
| P-4 | Growth "Propone inmuebles que encajan" | `matching` | soon |
| P-5 | Growth "Seguimiento… con su permiso" | `followup` + counsel | soon |
| P-6 | Enterprise "Varias oficinas en una sola cuenta" | no register key | API |
| P-7 | Enterprise "Clientes nuevos desde tus redes sociales" | `instagram` | soon |
| P-8 | Essential "el informe de la semana" | `reportInLogin` included; `weeklyEmail` soon | partly |
| P-9 | What happens when the trial ends | O-6 (topic 23) | API |
| P-10 | The plan differences as a whole | API's list to Copy and Redesign (the owner's order) | API |

## 6. Stage 2 (Mon 23.11. 12:00)

The text plan for the mobile entry and the function pages:
- Mila;
- e-mail with Carmen;
- the form;
- the phone;
- the takeover;
- matching;
- the report;
- the growth tasks;
- 3D;
- the day story, with Daily's check of 08:30.

The elements the owner wants kept stay:
- the out-of-hours question "9 de 25 … ¿Quién les contestó?" (it moves from the first screen to directly after it);
- Carmen's e-mail;
- the filled record;
- the example week;
- the personal contact.
