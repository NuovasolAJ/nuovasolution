# Pilot one-pager for agencies · DRAFT · ES + EN · 06.11.2026

**Internal head, not sent. For:** the owner, who decides when it goes out. The two pages below are written for an agency owner.
**Status:** draft. Not a contract, not a legal approval. No price appears until the owner decides.
**Sources:** `governance/ERSTE_FREMDE_AGENTUR_1105_v1.md`, `API_D5_DIREKT_1106_v1.md`, `OWNER_TEMPLATE_PAKETE_PILOT_1106_v1.md`, PM's new-agency checklist in `PM_1106_OBJEKTVORSCHLAEGE_RUECKGABE_v1.md`, `lib/claims.ts`. PM's short import list is ordered and not read yet; if it differs, the feed row follows it.
**Before it goes out:** see the check table at the end. Today nothing on these pages runs for an external agency in production. The text therefore names no date and says the pilot starts only after our test.

---

## ES · Piloto de NuovaSolution

**Mientras enseñas, NuovaSolution atiende.** Un piloto con pocas agencias, acompañado por nosotros. Empieza cuando termine nuestra prueba
con dos agencias de prueba; te confirmamos la fecha por escrito.

**Lo que hace en el piloto**
- Responde por email, en español y desde el buzón de tu agencia, a cualquier hora. No prometemos minutos, porque no los medimos.
- Cada respuesta automática indica que la escribe un asistente.
- En otro idioma no se envía nada automáticamente: la consulta espera a una persona.
- Guarda cada consulta en su ficha, en el CRM integrado: zona, presupuesto, idioma, canal, prioridad y su motivo.
- Tu equipo ve sus tareas en su propia app, y tú el informe en tu acceso.
- No acuerda precios ni citas: eso lo hace una persona.

**Te confirmamos por escrito, antes de empezar, si ya está activo**
- las etiquetas en tu buzón; el aviso a la persona que toca;
- las propuestas de inmuebles de tu cartera;
- las respuestas en inglés y alemán; Microsoft 365.

**Lo que no incluye el piloto**
- WhatsApp con el número de tu agencia, hoy no.
- Teléfono, Instagram, modelos 3D, leads de portales y anuncios, otros CRM.
- Una cuenta personal @gmail.com.

**Lo que traes tú**
1. **Tu buzón,** de Google Workspace, y a la persona que lo administra: tiene que autorizar nuestra aplicación. Te decimos antes de empezar si tu buzón se puede conectar.
2. **Una cita con nosotros** para conectarlo. Tu contraseña solo la escribes en la página de tu proveedor; nosotros no la vemos.
3. **Tus datos:** nombre legal y comercial, enlaces a tu aviso legal y de privacidad, una dirección para avisos de funcionamiento, tu equipo con su email.
4. **Para las propuestas de inmuebles:** tu permiso por escrito, también para las fotos, y el acceso a tu feed (Kyero XML o una exportación CSV/Excel). Dinos si es completo o solo trae cambios.

**Acuerdo.** Un acuerdo por escrito fija la duración, las condiciones, el tratamiento de datos y qué pasa con ellos al terminar. La base de
datos está en la Unión Europea (Fráncfort).

**¿Te interesa?** Escríbenos: antonio@nuovasolution.com

---

## EN · The NuovaSolution pilot

**While you show a home, NuovaSolution answers.** A pilot with a few agencies, supported by us. It starts when our test with two test
agencies is finished; we confirm the date in writing.

**What it does in the pilot**
- It replies by e-mail, in Spanish and from your agency's mailbox, at any hour. We promise no number of minutes, because we do not measure one.
- Every automatic reply says that an assistant wrote it.
- In another language nothing is sent automatically: the enquiry waits for a person.
- It keeps each enquiry on its record, in the built-in CRM: area, budget, language, channel, priority and its reason.
- Your team sees its tasks in its own app, and you see the report in your login.
- It agrees no prices and no appointments: a person does that.

**We confirm in writing, before you start, whether these are active yet**
- labels in your mailbox; the alert to the right person;
- proposals of listings from your portfolio;
- replies in English and German; Microsoft 365.

**What the pilot does not include**
- WhatsApp on your agency's own number, not today.
- Phone, Instagram, 3D models, leads from portals and ads, other CRMs.
- A personal @gmail.com account.

**What you bring**
1. **Your mailbox,** on Google Workspace, and the person who administers it: they have to authorise our application. We tell you before you start whether your mailbox can be connected.
2. **An appointment with us** to connect it. You type your password only on your provider's page; we never see it.
3. **Your details:** legal and trading name, links to your legal and privacy notices, an address for operational notices, your team with their e-mail addresses.
4. **For listing proposals:** your written permission, also for the photos, and access to your feed (Kyero XML or a CSV/Excel export). Tell us whether it is complete or only carries changes.

**Agreement.** A written agreement sets the duration, the terms, the data processing and what happens to the data at the end. The database
is in the European Union (Frankfurt).

**Interested?** Write to us: antonio@nuovasolution.com

---

## Internal check, not sent

Read 06.11. A line goes out only as it stands here; if a condition falls away, the line moves or goes.

| Line on the page | `lib/claims.ts` key | Condition before sending or starting | Today |
|---|---|---|---|
| reply by e-mail from the agency's mailbox | `replyEmail` (proposed), `mailboxConnection` | K5 route A built, A12 green, V3-DEPLOY | not in production. The joint-appointment login (L1, test A2) is unproven, and API names it the largest risk for the first real customer |
| at any hour | `replyOutOfHours` (proposed) | one real reply outside hours in A12 | FAQ Q-03; no external run |
| the notice | K4, `KI-HINWEIS-BASIS = v1.1-es` | v1.1-es approved, agency in `approved_client_ids`, legal name set | **v1.1-es pending with counsel since 02.09.**; without it every turn is held |
| another language waits for a person | F3, F7 | V3 + Release U | staging; production ends silently today |
| record, priority | `crm`, `priorityWithReason` | V3, ONBOARDING-PROD, F12 | staging; D6 clean-up done, K1.8 open |
| team's app | `taskList` | `PILOT-STAFF-PROD`, real sign-in proof | Release U in production; pilot package set for 11.11. |
| report in the login | `reportInLogin` | report entitlement (B1), second-tenant test | own agency only |
| no WhatsApp, no phone | `whatsappOwnNumber`, `phoneAssistant` | owner's WhatsApp decision of 13.11.; Voice stage | stays as written unless the owner changes it |
| labels | `labels` | A12 check 4, Gmail only | A-voll decided, not run |
| alert | `alert` | V3 + production probe with a real alert | held back |
| listing proposals | `matching` | feed import in production, PM-A6 per agency; PM has not confirmed the offer inside the conversation | staging; 0 real listings |
| Microsoft 365 | `outlook` | MM L1–L7, publisher verification | never run on Microsoft 365; user mailboxes only |
| EN and DE replies | `otherLanguages` | L3, an approved notice per language | staging test versions only |
| @gmail.com excluded | API §1 | stays until Google's review | |
| written agreement, data at the end | counsel; API §6 | a sample agreement with AVV; agency off-boarding | no sample yet; off-boarding not complete in production |

**Not on the page, on purpose:** price, duration in days, number of users or enquiries (limits are not enforced), any response time, any
result or revenue figure.

**The address** `antonio@nuovasolution.com` is the one the site's FAQ already shows.
