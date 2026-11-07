# COPY · Check of build a5f1d21 against handover §23 · 07.11.2026

**For:** Redesign (applies the rows) and the Reviewer (checks them in RV6). Theme 16.
**Marking:** editorial and technical. Not a design verdict, not a legal approval, not a replacement for RV6.

**How it was read.** I did not use the bypass secret: my standing order forbids reading credentials. So I did not read the deployment
itself. I built commit `a5f1d21` locally in the scratchpad, without the preview's code, and read every route in ES and EN, in `?view=target`
and `?view=public` (13 routes × 2 × 2, HTML and the page's data). Text held only in client code was checked in the source.
**The Reviewer's run on the deployment stays the measurement.**

---

## 1. Result

| Check | Result |
|---|---|
| "Próximamente" / "Coming soon" / "En preparación" | **0** on all routes, both views, both languages |
| §23, V-1 … V-59 | old wording gone, except V-28 (D-1 below). Where a new text does not stand, its element is correctly hidden in the public view |
| §13–§22, target and public text | 219 strings checked; the misses are D-1 and the fallbacks of keys that are on today, which correctly do not show |
| `faq.ts:125`, `:133`, `:141` | **closed.** Q-31 stands only in the target view; the old sentences of `:133` and `:141` are gone in all views |
| The home page, public view | no word from a key that is off |
| Figures | 10 + 6 + 3 + 2 + 4 = 25, rates on 25, "26 %" gone, hours and Sin/Con as §19 |
| Notice, §14 | stands on every route of the preview |

**The one direct deviation from §23 is D-1.** The other rows are places §21 and §23 did not list, on the module pages, `/signup`, `/contact`
and in the payment block.

**My own error:** §23 says the `home-story.ts` lines were not rendered. That holds for their state lines, not for the product views
built from them and from `product-views.tsx`. Rows D-3 to D-6 come from there.

---

## 2. What has to change

"Public" means `?view=public` and the live build. Where the target column says "stays", only the public view changes.

| # | File at `a5f1d21` | Today, in which view | Target ES | Target EN | Public while the key is off (ES · EN) | Key | Why |
|---|---|---|---|---|---|---|---|
| D-1 | `lib/content/capabilities.ts:83`, `/platform/ai-sales-agent` | "Respuesta por email, en un buzón que operamos para ti." · "A reply by e-mail, in a mailbox we operate for you." **both views** | Respuesta por email, en el buzón de tu agencia. | A reply by e-mail, in your agency's mailbox. | hide the point | `replyEmail` | §13 N-5, V-28 |
| D-2 | `components/home/plans-table.tsx:27`, `aria-label` on every cell | "Incluido" / "No incluido" · "Included" / "Not included" **target view** | En este plan · No en este plan | In this plan · Not in this plan | no table | `plans` | §9; a status word in an `aria-label` also fails the Reviewer's P-1 |
| D-3 | `components/site/product-views.tsx:49`, `/platform/lead-intelligence` | "Consulta importante · aviso por email a tu equipo" · "Important enquiry · e-mail alert to your team" **both views** | stays | stays | Consulta importante · Important enquiry | `alert` | **false alert claim in public** (A-23) |
| D-4 | `product-views.tsx:34`, `/platform/crm` history | "Aviso por email a Elena: consulta importante (inmueble, zona y presupuesto)" **both views** | stays | stays | hide the history row | `alert` | the same |
| D-5 | `product-views.tsx:46`, the same page | "…Cada mensaje, cada respuesta y cada aviso quedan en la ficha…" · "Every message, every reply and every alert stays on the record…" **both views** | stays | stays | Ejemplo ilustrativo. Cada mensaje y cada respuesta quedan en la ficha, en orden; no hay que reconstruir nada. · Illustrative example. Every message and every reply stays on the record, in order; nothing has to be reconstructed. | `alert` | the same |
| D-6 | `lib/content/home-story.ts:149`, `:152`, `/platform/ai-sales-agent` chat | "Perfecto, Laura, lo anoto. Una compañera de la agencia te escribe con día y hora para la visita." · "Perfect, Laura, noted. A colleague from the agency will write to you with a day and time for the viewing." **both views** | Gracias, Laura. Queda en tu ficha. ¿Te viene mejor por la mañana o por la tarde para una visita? | Thank you, Laura. It's on your record. Would the morning or the afternoon suit you better for a viewing? | the same text | `replyWhatsapp` | **contact promise**, against the owner's Question A (§16); "lo anoto" was struck |
| D-7 | `product-views.tsx:36`, `/platform/crm` history | "Respuesta de NuovaSolution: lo anota; una persona de la agencia le escribe con día y hora" **both views** | Respuesta de NuovaSolution: lo guarda y pregunta si prefiere mañana o tarde | NuovaSolution's reply: it keeps this and asks whether she prefers morning or afternoon | the same text | `replyWhatsapp` | the same |
| D-8 | `home-story.ts:343`, `es.ts:203`, sender label of the chat | "NuovaSolution · asistente de IA" **both views** | Asistente automático de la agencia | The agency's automated assistant | the same text | `replyWhatsapp` | §3, §10.5: the customer writes to the agency |
| D-9 | `lib/content/capabilities.ts:151`, h1 of `/platform/crm` | "Tus canales conectados, una ficha por consulta." · "Your connected channels, one record per enquiry." **both views** | stays | stays | Una ficha por consulta. · One record per enquiry. | `mailboxConnection` | a statement on connecting appears in public only when true (owner, §G-6) |
| D-10 | `/platform/daily-assistant`, the whole route **public** | the page is reachable and describes the task list | stays | stays | the route leads to `/platform` | `taskList` | function off, shown |
| D-11 | `/platform` card "04 Tareas diarias"; the footer link; "Relacionado" on the module pages **public** | visible | stays | stays | hide | `taskList` | the same |
| D-12 | the menu item "Captar" **public** | visible, with no row behind it | stays | stays | hide | any of `instagram`, `adsLeads`, `model3d` | an empty group |
| D-13 | `capabilities.ts:145`, `navLine` **public** | "Leads, conversaciones y tareas en un solo lugar" · "Leads, conversations and tasks in one place" | stays | stays | Leads y conversaciones en un solo lugar · Leads and conversations in one place | `taskList` | the same |
| D-14 | `es.ts:340`, `en.ts:372`, lead of `/platform` **public** | "…así que la respuesta, el contexto y la tarea nunca están en tres sitios distintos." · "…so the answer, the context and the task are never in three different places." | stays | stays | …así que la respuesta y el contexto nunca están en sitios distintos. · …so the answer and the context are never in different places. | `taskList` | the same |
| D-15 | `capabilities.ts:169–170`, example on `/platform/crm` **public** | "…y la petición de visita que pasó a ser una tarea. No hay que reconstruir nada." · "…and the viewing request that became a task. Nothing has to be reconstructed." | stays | stays | …y la petición de visita. No hay que reconstruir nada. · …and the viewing request. Nothing has to be reconstructed. | `taskList` | the same |
| D-16 | `es.ts:148`, `:501`, `/signup` **public** | "Crea la cuenta de tu agencia · 14 días gratis. Sin pago." with the form | stays | stays | the route leads to `/contact`, as `/trial` | `trial`, `publicSignup` | C-17; API's register allows no sign-up promise |
| D-17 | `es.ts:554`, `/login` **public** | "¿Todavía no tienes cuenta? Crea una" · "No account yet? …" | stays | stays | hide the line | `publicSignup` | the same |
| D-18 | `es.ts:485`, `en.ts:524`, `/contact` lead **public** | "…La demo es opcional y nunca es condición para empezar la prueba." · "…A demo is optional and never a condition for starting the trial." | stays | stays | …La demo es opcional. · …A demo is optional. | `trial` | the same |
| D-19 | `es.ts:434`, `en.ts:472`, `/packages` "Cómo se paga", and its FAQ "¿Puedo pagar online?" **public** | the invoice steps, "activamos el plan" | stays | stays | hide | `plans` | production has no billing part (API) |
| D-20 | `faq.ts:175`, group title; Q-14; Q-15 **public** | "Prueba, planes y pago" · "Trial, plans and paying"; "¿Puedo pagar con tarjeta en la web?"; "¿Cuándo está activo mi plan?" | stays | stays | Precio y cómo empezar · Price and how to start; hide Q-14 and Q-15 | `plans` | the same; §21 missed these |
| D-21 | `faq.ts`, Q-13 question **public** | "¿Cuánto cuesta después?" · "What does it cost after that?" | stays | stays | ¿Cuánto cuesta? · What does it cost? | `trial` | "after that" points to the hidden trial |
| D-22 | `es.ts:97`, `en.ts:106`, the notice in `?view=public` on the preview **public view of the preview only** | "Muestra el producto completo, incluidas funciones que no están activas." in a view that does not show them | stays | stays | Vista previa, no pública. Datos de ejemplo: nada de lo que introduzcas crea una cuenta ni llega a nadie. · Preview, not public. Example data: nothing you enter creates an account or reaches anyone. | view | the notice is false in that view. A live build shows no notice |
| D-23 | `capabilities.ts:85`, `/platform/ai-sales-agent` **target** | the point "Un aviso por email…" is not shown in the target view | Un aviso por email a la persona adecuada cuando una consulta importa. | An e-mail alert to the right person when an enquiry matters. | hide | `alert` | §21; the source holds it, the page filters it out |

---

## 3. What the rows do not change

- **Limits that correctly stay in public:** two records until they are joined (`/platform/crm`, Q-43); another language gets no automatic reply; Q-44.
- **"al teléfono o al buzón del cliente"** in the report's definition means the customer's phone, not the phone channel. It stays.
- **"Respuestas en otros idiomas" and "Calendario"** are absent in both views, as §14 orders.

---

## 4. For the Reviewer

- **The Sin state:** "9 consultas esperan a que abra la oficina…" stands in the source (`home-1103.ts:336`), not in the delivered HTML. Only the Con state is there. Please check A-6 and A-20 on that: without JavaScript a reader sees only one side.
- **Not checked here:** the EN page as a read (Redesign's §7 a). I compared every EN string the handover gives; Redesign's own EN inside the surfaces is not read through yet.
- **What this check cannot say:** the protection, the deployment's delivered bytes, the design, or motion. Those are RV6.
