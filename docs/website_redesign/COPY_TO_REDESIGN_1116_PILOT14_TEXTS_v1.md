# COPY → Redesign · The 14-day pilot, languages, Crece, Cómo empezar, closing, 3D · ES + EN · Mon 16.11.2026, before 14:00

**For:** Redesign, for the full overhaul of the site; the Reviewer checks the lines.
**Owner decisions, 16.11.:**
1. The offer is a pilot with our support: 14 days, plus 7 days after the agency's feedback. No self-start, because registration is
   off in production. Terms "por escrito".
2. "Recomendado" goes.
3. 3D is booked separately and shows as "Opcional" in every package.
4. Today the automatic replies are in Spanish only. Every language is recognised, and other languages go to the team. One sentence for
   all places.
5. New texts for Crece, Cómo empezar, the closing section, the legend and 3D's "Tu camino".

**This file overrides:**
- in `COPY_TO_REDESIGN_1113_TEXTS_10V10_v1.md`:
  - §0: B-2, C-2, and the rule "14 días leaves the site";
  - §2: O-4 and Crece;
  - §5 "Tu camino";
  - §6: the 3 steps, the line, the Growth badge, Q-11 and its "90 días".
- **What stays from 1113:** B-1 "Solicita tu piloto gratuito" as the one main button, the pain line, Atiende, the report, the 3D points,
  the floor marks, and the media rules of §3.

**Marking:** WORKING. Editorial and technical, not a legal approval, not a Meta approval. No figure except 14 and 7, which are the owner's.

---

## 1. The offer

### 1.1 Button and pilot line (hero, and under the button in Cómo empezar)

| # | ES | EN |
|---|---|---|
| B-1 | Solicita tu piloto gratuito *(unchanged)* | Request your free pilot *(unchanged)* |
| B-1s | Piloto gratuito *(unchanged, only where B-1 does not fit)* | Free pilot |
| B-2 | Piloto gratuito de 14 días, con nuestro acompañamiento. Si nos das tu opinión, 7 días más. | A free 14-day pilot, with our support. Give us your feedback and get 7 more days. |
| B-2b | second line, small: Sin método de pago. Las condiciones, por escrito. | No payment method. The terms in writing. |

B-2 is the owner's sentence. "Acompañado" became "con nuestro acompañamiento", so it reads as a fact about us rather than about the
agency. B-2b keeps "sin método de pago" from the PAKETE line. If the owner changed that too, B-2b keeps only "Las condiciones, por escrito."

### 1.2 Places

| Place | ES | EN |
|---|---|---|
| **Home**, hero | B-1 + B-2 (+ B-2b if it fits on 390 px in two lines; otherwise B-2b goes to Cómo empezar only) | B-1 + B-2 (+ B-2b) |
| **Home**, nav and the phone's fixed bar | B-1s | B-1s |
| **/contact**, pilot card: eyebrow | Piloto gratuito · 14 días | Free pilot · 14 days |
| /contact, h | Solicita tu piloto gratuito | Request your free pilot |
| /contact, text | Hablamos contigo, te enseñamos el sistema con un ejemplo y vemos si encaja. Si encaja, empiezas 14 días de piloto con nosotros al lado; con tu opinión al final, 7 días más. | We talk with you, show you the system with an example and see whether it fits. If it does, you start a 14-day pilot with us alongside; with your feedback at the end, 7 more days. |
| /contact, page lead (`es.ts:486`) | Contacto humano directo, en español o en inglés. Te enseñamos el sistema y te explicamos el piloto y el precio. *(unchanged)* | Direct human contact, in Spanish or English. We show you the system and explain the pilot and the price. |
| **Packages**, h1 | Empieza con 14 días de piloto gratuito | Start with a free 14-day pilot |
| Packages, lead | Todos los paquetes empiezan igual: 14 días de piloto, gratis y con nuestro acompañamiento, y 7 días más si nos das tu opinión. El precio para después te lo explicamos antes de acordar nada. | Every plan starts the same way: a 14-day pilot, free and with our support, and 7 more days if you give us your feedback. We explain the price for afterwards before anything is agreed. |
| Packages, button in every column | B-1 | B-1 |
| Packages, Growth badge | **none** ("Recomendado" goes) | **none** |
| Packages, legend under the table | ✓ Incluido · — No incluido · Opcional: se contrata aparte | ✓ Included · — Not included · Optional: booked separately |
| Packages, "¿Necesito una tarjeta…?" (`es.ts:388`) | No. El piloto es gratuito y no pedimos método de pago. *(unchanged)* | No. The pilot is free and we ask for no payment method. |
| **/trial** (if it stays a page; otherwise it leads to /contact as today) | h1: Piloto gratuito de 14 días · lead: No hay registro en la web: el piloto lo preparamos contigo. Solicítalo y te contactamos. · button: B-1 → /contact | h1: Free 14-day pilot · lead: There is no sign-up on the website: we set the pilot up with you. Request it and we will get in touch. · button: B-1 → /contact |
| **/signup** | leads to /contact (no change) | |
| **Shared buttons** `bookDemo`, `seeDemo` as offer, `tryFree`, `ctaDemo` | = B-1 | = B-1 |
| Login, line under the form | ¿Todavía no tienes cuenta? Solicita tu piloto gratuito. *(unchanged)* | No account yet? Request your free pilot. |
| Assistant suggestion (`es.ts:1060`) | ¿Cómo funciona el piloto? *(unchanged)* | How does the pilot work? |

**No self-start anywhere.** No "Empieza ahora", "Regístrate", "Crea tu cuenta", "Pruébalo gratis" as a click-to-start. Every offer path ends
on /contact.

### 1.3 FAQ (group "Piloto, planes y precio")

| # | ES | EN |
|---|---|---|
| Q-11 q | ¿Qué es el piloto? | What is the pilot? |
| Q-11 a | Usas NuovaSolution en tu agencia durante 14 días, gratis y con nuestro acompañamiento. Al final te pedimos tu opinión; si nos la das, el piloto sigue 7 días más. No pedimos método de pago. Antes de empezar te confirmamos por escrito qué está activo y las condiciones. | You use NuovaSolution in your agency for 14 days, free and with our support. At the end we ask for your feedback; if you give it, the pilot runs 7 more days. We ask for no payment method. Before you start, we confirm in writing what is active and the terms. |
| Q-11b q (new) | ¿Puedo empezar yo solo, sin hablar con vosotros? | Can I start on my own, without talking to you? |
| Q-11b a | Todavía no. El piloto lo preparamos contigo: solicítalo y te contactamos para empezar. | Not yet. We set the pilot up with you: request it and we will get in touch to start. |
| Q-12 | *(unchanged)* ¿Qué pasa cuando termina el piloto? · Decides si sigues. El precio te lo explicamos antes de acordar nada. Qué pasa con tus datos lo fija el acuerdo por escrito. | *(unchanged)* |
| Q-13 | *(unchanged)* ¿Cuánto cuesta? · El piloto es gratuito. El precio para después del piloto te lo explicamos antes de acordar nada. | *(unchanged)* |

**Not on the site (yet):** what happens if the agency's feedback is used publicly. That goes to counsel first (§6).

---

## 2. Languages: one sentence, the same everywhere

**Basis:**
- the owner, 16.11.;
- `languageNoted` included;
- `otherLanguages` soon;
- in production, English and German customer mails are held, and a task is created (F07, run 175653).

| # | Where | ES | EN |
|---|---|---|---|
| L-1 (long) | FAQ, Packages (as a row or footnote), O-4 in Organiza | Hoy responde automáticamente solo en español. Reconoce el idioma de cada consulta y, si no es español, la pasa a tu equipo. | Today it replies automatically in Spanish only. It recognises the language of every enquiry and, if it is not Spanish, passes it to your team. |
| L-2 (short) | hero chip, demo caption, benefit-card point | Responde en español. Otros idiomas, a tu equipo. | Replies in Spanish. Other languages go to your team. |
| L-faq q | FAQ | ¿En qué idiomas responde? | Which languages does it reply in? |
| L-faq a | FAQ | = L-1. Más idiomas, en preparación. | = L-1. More languages are in preparation. |
| L-pk | Packages row "Idiomas", every column | Español automático · otros idiomas, a tu equipo | Spanish, automatic · other languages to your team |

**Replaces:** 1113 O-4. Remove every older sentence that says otherwise, including "en cualquier idioma", "en tu idioma", "multilingüe" as a
promise, and an EN/DE reply in the demo shown as automatic.

**Lead confirms (Q-2):** "a tu equipo" means a person in the agency gets the enquiry (a task or an alert to the agency). It must not mean
only an alert to NuovaSolution's own operations. Until Lead confirms for both channels, L-2 is target view and the public view shows
"Responde en español. Si es otro idioma, la consulta espera a una persona." / "Replies in Spanish. In any other language, the enquiry
waits for a person." That is the line already proven as 1113 O-4.

---

## 3. Crece, with a concrete benefit (replaces 1113 Crece)

Everything public below comes from the example report (`reportInLogin` included). No figure in the card; the figures stay in the report.

| # | ES | EN | View |
|---|---|---|---|
| C-t | Crece | Grow | both |
| C-0 | Ves dónde se te escapa negocio y qué hacer esta semana. | You see where business slips away and what to do this week. | both |
| C-1 | Qué entró, qué se contestó y qué sigue esperando a una persona. | What came in, what was answered and what is still waiting for a person. | both |
| C-2 | Qué canal te trae más consultas. | Which channel brings you the most enquiries. | both |
| C-3 | Cuántas consultas llegaron con la oficina cerrada y quedaron contestadas. | How many enquiries arrived with the office closed and were answered. | both |
| C-4 | Cuántas visitas se pidieron y cuántas se acordaron. | How many viewings were asked for and how many were agreed. | both |
| C-5 | Inmuebles de tu cartera que encajan con cada cliente. | Listings from your portfolio that fit each client. | target only (`matching` soon) |
| C-btn | Ver el informe de ejemplo | See the example report | both |

The card takes four points: C-1 to C-4 in public, and C-5 instead of C-4 in the target view if Redesign wants the forward-looking point.

---

## 4. Cómo empezar, 3 steps with a result (replaces 1113 §6 steps)

| # | Step ES | Result ES | Step EN | Result EN |
|---|---|---|---|---|
| title | Cómo empezar: piloto gratuito de 14 días | | How to start: free 14-day pilot | |
| 1 | Solicita tu piloto. | En una conversación ves el sistema con un ejemplo y sabes si encaja con tu agencia. | Request your pilot. | In one conversation you see the system with an example and know whether it fits your agency. |
| 2 | Lo preparamos contigo. | Te confirmamos por escrito qué está activo y las condiciones. | We set it up with you. | We confirm in writing what is active and the terms. |
| 3 | Empiezan tus 14 días. | Cada consulta que llega por los canales activos queda contestada en español y en su ficha, con su prioridad y su motivo. Con tu opinión al final, 7 días más. | Your 14 days begin. | Every enquiry on the active channels is answered in Spanish and lands on its record, with its priority and reason. With your feedback at the end, 7 more days. |
| under | B-1, then B-2b | | B-1, then B-2b | |

Step 3, target view (`mailboxConnection` on): the result may start with "Conectamos tu buzón contigo y lo probamos con un mensaje real." /
"We connect your mailbox with you and test it with a real message."

---

## 5. Closing section (matches the pilot)

| # | ES | EN |
|---|---|---|
| E-h | 14 días para ver qué consultas se te escapan. | 14 days to see which enquiries slip away. |
| E-t | Te enseñamos el sistema, lo preparamos contigo y lo usas en tu agencia con nosotros al lado. Gratis, y por escrito. | We show you the system, set it up with you, and you use it in your agency with us alongside. Free, and in writing. |
| E-b | B-1 | B-1 |
| E-s | Sin método de pago. Con tu opinión al final, 7 días más. | No payment method. With your feedback at the end, 7 more days. |

---

## 6. For API's lawyer sheet (owner, 16.11.)

**Owner's rule.** If the website or social media ever use an agency's feedback from the pilot, it must say that the agency received 7 extra
pilot days for giving it.

**Copy's proposed marking, to stand next to any published feedback:**
- ES: "Esta agencia recibió 7 días más de piloto por darnos su opinión."
- EN: "This agency received 7 extra pilot days for giving us its feedback."

**Questions for counsel:**
- Is this marking enough under the rules on incentivised reviews (unfair commercial practices)?
- Does publishing need the agency's separate written consent, and in what form?

**Until counsel answers:** no feedback from a pilot appears on the site at all. That also fits the standing rule: no testimonials that are
not real and cleared.

---

## 7. 3D

### 7.1 In the packages

| # | ES | EN |
|---|---|---|
| 3D-row | Visualización 3D: **Opcional** in every column | 3D visualisation: **Optional** in every column |
| 3D-note | La visualización 3D se contrata aparte, con cualquier paquete. | 3D visualisation is booked separately, with any plan. |

No price and no time for 3D. The FAQ answer on 3D (`faq.ts:346`) keeps its text, with "a petición" as before.

### 7.2 "Tu camino", a guided process (replaces 1113 3-t1…3-t3)

| # | Title ES | Line ES | Title EN | Line EN |
|---|---|---|---|---|
| 3-t1 | Plano y deseos | Nos envías el plano y nos cuentas qué quieres enseñar. | Plan and wishes | You send us the plan and tell us what you want to show. |
| 3-t2 | Confirmamos | Confirmamos contigo qué incluye el modelo y cuándo te lo entregamos. | We confirm | We confirm with you what the model includes and when we deliver it. |
| 3-t3 | Construimos el modelo | Lo construimos a partir de tu plano y lo revisamos. | We build the model | We build it from your plan and check it. |
| 3-t4 | Lo ves y compartes las imágenes | Ves el modelo con tu acceso y usas sus imágenes en tus anuncios y redes. | You view it and share the images | You view the model with your login and use its images in your listings and social media. |
| 3-n | under the four: Cada modelo lo preparamos nosotros. No se crea solo ni al instante. | | Every model is prepared by us. It is not created automatically or instantly. | |

**3-t4 differs from the owner's "Lo ves y lo compartes" on purpose.**
- 3D's truth (13.11.): the model's link is protected and opens with the agency's login; there is no public viewer.
- So "lo compartes", meaning the model itself, would promise sharing the link with a buyer.
- What can be shared are the images, marked as a visualisation (1113, 3-3).
- If 3D confirms that the agency may pass the link on to a client, 3-t4 becomes "Lo ves y lo compartes" with the line "Recibes el enlace del
  modelo y sus imágenes para compartir." (Q-3).

---

## 8. Retire (in addition to 1113 §6)

- Every "máximo de 90 días" / "up to 90 days", and 1113 Q-11 as a whole.
- 1113 B-2 "Tu agencia usa NuovaSolution sin pagar, con nuestro acompañamiento. Las condiciones, por escrito." (replaced by B-2 + B-2b).
- "Recomendado" / "Recommended" on any package.
- **The Reviewer's offer rule changes with this file.** "14 días" is now the owner's offer, so it is no longer a 0-hit word. What stays
  forbidden: "Pruébalo gratis" as a click-to-start, "Solicitar/Reservar una demo" as an offer, "14 días" without "piloto" (as a self-service
  trial), and any start without /contact. The owner tells the Reviewer (RV6) this.

---

## 10. WhatsApp on the agency's own number: not before topic 20 (owner point 6, 16.11. afternoon)

**The fact.**
- Today the WhatsApp replies run on **NuovaSolution's own number** (`claims.ts:37`: "our own agency's channel"). The owner's
  measurement for A-1 was taken there.
- An agency's own number needs topic 20: the number's registration with Meta. Until then `whatsappOwnNumber` is soon and held back.
- So in the **public view** nothing may suggest that an agency's WhatsApp customers are answered today.

| # | Place | Public ES | Public EN | Target view |
|---|---|---|---|---|
| W-1 | channel line (`channelList`), today "por WhatsApp y email" | Respuestas en español por email. WhatsApp con el número de tu agencia: en preparación. | Replies in Spanish by email. WhatsApp on your agency's own number: in preparation. | "por WhatsApp y email" as built |
| W-2 | A-1 in Atiende | Responde en minutos por email. | Replies within minutes by email. | A-1 as in 1113 |
| W-3 | FAQ, new, both views: question | ¿Responde desde el WhatsApp de mi agencia? | Does it reply from my agency's WhatsApp? | the same |
| W-3a | answer, public | Todavía no. Para responder desde el número de tu agencia, ese número tiene que darse de alta con Meta a través de nosotros, y ese paso está en preparación. Hoy el asistente responde por WhatsApp en nuestro propio número: ahí medimos que contesta en segundos. | Not yet. To reply from your agency's number, that number has to be registered with Meta through us, and that step is in preparation. Today the assistant replies on WhatsApp on our own number, and that is where we measured replies within seconds. | **target:** Sí. Damos de alta contigo el número de tu agencia y lo probamos con un mensaje real. / Yes. We register your agency's number with you and test it with a real message. |
| W-4 | hero bubble H-b1 "Nueva consulta · WhatsApp" | Nueva consulta · Email, with H-b3 "Respondida · 11:23" | New enquiry · Email, "Answered · 11:23" | WhatsApp as in 1113 §7 |
| W-5 | live demo, WhatsApp chip | stays: it is a marked demonstration. Its caption must not say "tu WhatsApp" | | |
| W-6 | packages row "WhatsApp con el número de tu agencia" | stays hidden (E2, `HELD_BACK`). W-3 explains it | | shows when the key is on |

**About W-4.**
- The hero picture reads as "this happens at your agency".
- The 11:23 is a clock time in the example, not a measurement. It is two minutes after the enquiry, as in the owner's email runs.
- If Redesign keeps WhatsApp in the public hero, the bubble needs the mark "Ejemplo" in view.

**Retire in the public view (any place still shipped):**
- `es.ts:316–325` and its EN twin, the old trial offer: "Probar gratis", "14 días · Sin método de pago", "Crea tu cuenta", "Conectamos
  contigo el buzón y el WhatsApp de tu agencia". It is a self-start, and it promises the agency's own WhatsApp.
- `es.ts:475` and its EN twin, onboarding "Canales": the public text becomes "Conectamos contigo el buzón de tu agencia y lo probamos con
  un mensaje real.", but only once `mailboxConnection` is on; until then the line goes.
- Gated already by key, no change: `faq.ts:247–250`, `platform-map.ts:47`, `home-1103.ts:489–491`, 1108 V-1/V-3/V-4.

**Same question for email (Q-5).** An agency's own mailbox (`mailboxConnection`) is soon too. If a pilot agency cannot yet receive
automatic email replies in production, W-1 and W-2 need the same treatment. API says what a pilot agency has on day one (footer file Q-5).

---

## 11. Redesign's return of 16.11. (session nuovasolution-23), checked by Copy

- **A-2 "Entiende qué busca: comprar o alquilar."** Accepted (owner, 16.11.). "Vender" comes back when Lead proves it (Q-A2).
- **No area buttons A-btn/O-btn/C-btn; a quiet "Ver {área}" toggle per card instead.** Accepted: one main button.
- **"Ver menos"**, the second state of "Ver la semana completa": accepted. EN "See less".
- **FAQ "¿Atiende llamadas?" hidden in both views (E2).** Accepted: nothing false, nothing promised. The owner's "Todavía no" stays ready
  for when the owner wants calls named as in preparation.
- **The pilot request form (`lib/content/pilot-request.ts`):** confirmed, with one change. Done heading: "Gracias. Te contestará una persona
  del equipo, en español o en inglés." / "Thank you. A person from our team will answer, in Spanish or English." It says who answers, and
  it gives no time.

---

**Redesign, `f4e7e7f` (pushed):**
- W-1, W-2, W-3 and done.h are built.
- **Accepted deviation:** the W-3 answer "Todavía no…" stands in **both** views. E2 (owner, 07.11./13.11.) does not promise a
  held-back function even in the target view, so the target "Sí" text is not used.
- W-4 is not built yet. When it is: the public bubble shows "Nueva consulta · Email".
- `es.ts:316–325` and `:475` are not shipped (no component renders them, and `/trial` redirects). Redesign clears them with the named
  build.

---

## 9. Open

| # | Question | Who | By |
|---|---|---|---|
| Q-1 | **answered 16.11. by the owner:** B-2 + B-2b stand as written | — | done |
| Q-5 | What does a pilot agency have on day one in production: automatic email replies from its own mailbox, from a NuovaSolution address, or not yet? (§10) | API | before the build is named |
| Q-2 | Do other-language enquiries go to a person **of the agency** (task or alert), on WhatsApp and email? (L-2 public) | Lead | Tue 17.11. |
| Q-3 | May the agency pass the protected model link on to a client? (3-t4) | 3D | before the build is named |
| Q-4 | Incentivised feedback: marking and consent (§6) | counsel, via API's sheet | before any feedback is published |
