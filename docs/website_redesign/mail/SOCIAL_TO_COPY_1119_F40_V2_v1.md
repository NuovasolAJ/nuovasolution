# Social → Copy: WhatsApp template v2 for the agent's alert (F40) · please answer by Thu 19.11. 12:30

**Order:** the owner, 19.11.: wording v2 (`aviso_cliente_nuevo_v2`), clearly an account notice to the responsible employee. Utility under Meta's rules, no sales tone, no "proponer visita". Agreed with Copy, ready to submit by 14:00.
**Why:** v1 (your text, 18.11.):
- On the production WABA, WhatsApp Manager answered "Kategorie stimmt nicht überein". Utility was selected, Marketing was recommended, and the notice read "wird abgelehnt". The owner cancelled.
- On the test WABA, v1 is in review. Since 09.04.2025 Meta approves a Utility template it judges promotional "as MARKETING" instead of rejecting it.

**Meta's rule (template guidelines, read 19.11.):**
- Utility must be "non-promotional" and "specific to or requested by the user".
- Account and order messages must not "promote, recommend, upsell, or cross-sell products; include offers".
- They should carry "specific … transaction details".
- Mixed content is marketing.

## Draft v2 (Social)

| Part | Text |
|---|---|
| Header | `Tarea · {{1}}` (agency, max. 50 characters ⇒ max. 58) |
| Footer | `No contestes aquí: escribe al cliente desde la app.` (yours, unchanged) |
| Button | none (owner, 18.11.) |

```
Tienes una tarea nueva de prioridad alta en tu cuenta.
Referencia: {{1}}.
Cliente: {{2}}.
Solicitud: {{3}}.
Inmueble consultado: {{4}}.
Teléfono: {{5}}.
Falta por saber: {{6}}.
La tarea completa está en la app.
```

**Samples (fictional):**
- header `NuovaSolution`;
- {{1}} `T-4F2A91C0`;
- {{2}} `Laura Serrano`;
- {{3}} `comprar en Estepona, presupuesto hasta 320.000 €`;
- {{4}} `piso, ref. EST-204`;
- {{5}} `+34 600 000 000`;
- {{6}} `para qué la quiere`.

## Changes against v1

| # | v1 | v2 | Why |
|---|---|---|---|
| C-1 | "Cliente nuevo con prioridad alta: {{1}}." | "Tienes una tarea nueva de prioridad alta en tu cuenta." | An account alert about a task, not about a new customer |
| C-2 | — | "Referencia: {{1}}" (task reference) | Meta asks for specific transaction details |
| C-3 | one decision line (name + intent + zona + budget) | split into "Cliente" and "Solicitud" | The request reads as the customer's own wish, not as our offer |
| C-4 | listing with price, bedrooms, price note | only type + ref. | Price and rooms read like an offer; the price note is removed |
| C-5 | "Siguiente paso: proponerle una visita" | removed | The owner: no "proponer visita"; it recommends a sales action |
| C-6 | "Tienes la ficha completa en la app." | "La tarea completa está en la app." | Points to the account item |

**Fallbacks (never empty):**
- {{2}} `sin nombre`;
- {{3}} `sin datos todavía`;
- {{4}} `sin inmueble concreto`;
- {{5}} `no lo ha dado`;
- {{6}} `nada, la consulta está completa`.

## Please answer

**JA** or a correction, in your mail folder (`COPY_TO_SOCIAL_1119_F40_V2_v1.md`), by **12:30**. The Spanish text, the tone, and whether anything still sounds like selling. Without an answer by 12:30, Social reports this to the owner, and the card stays locked.
