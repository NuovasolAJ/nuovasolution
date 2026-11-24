# Copy → Redesign (cc RV6, Audit): E2, the WORKING lines in `lib/content/agency-tasks.ts` (local `069a8c6`) · 24.11.2026

**Basis:** Redesign's E2 candidate on the owner's feedback of 24.11. Copy read `lib/content/agency-tasks.ts` at `069a8c6` (local, not pushed; the alias stays on `bea7d19`).

**Status:** an editorial and technical check, not a legal approval.

**Result:**
- One line **must** change: A-1, the reply in Mila's proof bubble.
- Five lines change for accuracy: A-2, A-4, A-5, A-6, A-7.
- The rest is confirmed.
- The first-screen cuts (eyebrow, benefit list, trial line) are the owner's order. Copy confirms them; the trial stays in the header, the phone bar and the plans.

## 1. To change

| # | Key | Today (WORKING) | ES (final) | EN (final) | Why |
|---|---|---|---|---|---|
| **A-1** | card 1 `proof.reply` | Hola, Mila. Marta te llama esta tarde. ¿A qué hora te viene bien? | Hola, Mila, soy el asistente de Marta. La disponibilidad de la ref. 9895153 te la confirma ella por teléfono. ¿A qué hora te viene bien que te llame? | Hi Mila, I'm Marta's assistant. Marta will confirm by phone whether ref. 9895153 is available. What time suits you for her to call? | **two rule breaks:** (1) the site rule "cada respuesta automática indica que la escribe un asistente": this reply does not say it; (2) "Marta te llama esta tarde" promises a call at a time. That is the promise the owner excluded for the phone (no time of our own) and that the hero's W-2 avoids. This is W-2 word for word, so the proof and the hero say the same |
| A-2 | card 1 `line` | WhatsApp, email y teléfono: respuesta al momento y cada consulta en su ficha. | WhatsApp, email y teléfono: cada consulta recibe respuesta y queda en su ficha. | WhatsApp, email and phone: every enquiry gets a reply and lands on its record. | "al momento" is right for WhatsApp, not for email: the measured figure is about 2 minutes, and the site says "en minutos por email". EN "e-mail" → "email" (house style) |
| A-4 | card 1 `action.label` | Ver la demo | Ver cómo responde | See how it replies | "demo" is the Growth offer on this page ("Pide una demo de Growth"). The link goes to the simulation, not to the demo request |
| A-5 | card 2 `proof.fields[2]` | Pide valoración · respondida al momento | Pide valoración · respondida | Asks for a valuation · answered | the same as A-2; a form reply goes by email |
| A-6 | card 3 `line` | Entra un inmueble que encaja y volvemos a escribir a quien lo buscaba, con su permiso. | Entra un inmueble que encaja y volvemos a escribir a quien buscaba algo así, con su permiso. | A listing that fits comes in, and we write again to whoever was looking for something like it, with their permission. | "lo buscaba" says the client was looking for exactly this property. The proof shows a match (Javier: penthouse up to €280,000), not a named property |
| A-7 | card 4 `proof.foot` | Lunes 08:00 · 25 consultas, 25 respondidas | Lunes · llega el informe de tu semana | Monday · your weekly report arrives | three points: (1) the mail goes out Monday at about 06:00 Madrid (05:00Z), not 08:00; (2) "respondidas" is a figure the real report does not have (`answered` null, API E-2); (3) "consultas" in the report counts messages (W-10, the owner decides). The foot needs none of the three |

## 2. Confirmed as written

| Key | ES | EN |
|---|---|---|
| `eyebrow` | Todo lo que hace por tu agencia | Everything it does for your agency |
| `h2` | Nuevos clientes. Contactos que vuelven. Más oportunidades. | New clients. Contacts who come back. More opportunities. |
| `mark` | Ejemplo · datos ficticios | Example · fictional data |
| card 1 `title` | Atiende por ti | Answers for you |
| card 1 `proof.text` | ¿Sigue disponible la ref. 9895153? ¿Me podéis llamar? | Is ref. 9895153 still available? Can you call me? |
| card 2 `title` / `line` / `action` | Gana nuevos clientes · De un comentario, un anuncio o un formulario a una consulta con su ficha. · Cómo capta clientes | Win new clients · From a comment, an ad or a form to an enquiry with its own record. · How it wins clients |
| card 2 `proof.source`, `fields[0–1]` | Formulario «¿Cuánto vale tu casa?» · Isabel · casa en Mijas · Propietaria · quiere vender | as written |
| card 3 `title` / `proof` / `action` | Reactiva tus contactos · the Javier match · Cómo propone inmuebles | as written |
| card 4 `title` / `line` / `proof.head`, `items` / `action` | Cada mañana, el día claro · Cada persona sabe qué toca hoy, y el lunes ves la semana en un informe. · 08:30 · Buenos días, Marta… · Ver el informe de ejemplo | as written |
| `model3d.line` / `label` | Opcional con cualquier plan: tu plano en 3D, vacío y amueblado, con imágenes para tus anuncios. · Ver el 3D | as written. The same promise as the measured 3D section (`home-1103.ts:376–388`, `strengths.ts:43`) |
| day strip, title, six moments, mark | Un día con NuovaSolution · tu día · llamada atendida · pasa a Carlos · piso que encaja · seguimiento · respuesta de noche · Ejemplo · nombres ficticios | as written |

**[INTERNAL] for Audit:** the strip carries RV6's E-2 ("08:30", card 4 and the strip) and E-3/E-4 (reactivation, follow-up). They wait for Audit's register placement. Copy changes no word for that.
