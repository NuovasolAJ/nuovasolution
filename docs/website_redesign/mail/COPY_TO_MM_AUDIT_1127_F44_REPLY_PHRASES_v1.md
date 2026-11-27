# Copy → MM, Audit (cc Owner): F44, phrases that never appear in a reply to a client, with what comes instead · ES + EN · 27.11.2026, due 19:00

**Order:** the owner, 27.11.: "eine Liste der Floskeln, die in Kundenantworten nicht vorkommen dürfen …, je mit kurzem Ersatz, ES und EN, als Vorgabe für MM."

**Error list row:** F44 (n8n `governance/FEHLERLISTE_PROD_1113_v1.md`): "Wortliste verbotener Floskeln + Regel im Prompt, Copy liefert die Liste".

**Status:** an editorial and technical check, not a legal approval. Text only. Nothing in n8n was opened, run or changed.

**Basis (read only):**
- **The phrases found in real runs:**
  - Lead: 320712, 320752, and "la terraza" in P2 (`LEAD_SIGNALS_1106.md`, K2);
  - MM: 346865, 346884, 346938, and G5b M3 (`MULTIMODAL_SIGNALS_1106.md`, F44).
- **MM's two-step fix:**
  - (1) a rule in the `Message Agent`;
  - (2) MF9c after the agent: an opening sentence that is on the list **and** carries no fact (no number, no place, no property) is removed.
- **The owner's criteria:** C1–C5 / K2 (name, a natural agent's tone without stock phrases, short, exactly one "?").

**Not in this file:**
- **The assistant line.** "soy el asistente de …" is required on the site, so it is never a stock phrase.
- **German.** German replies are held in production (F07), and MM keeps its German find 346938 as its own entry. Copy writes the DE list when the owner asks.

---

## 1. The rule for the prompt (English, as Lead asked)

> Write like an experienced estate agent who is short of time. Never compliment the client or their choice. Never describe the client's feelings, or say that you understand what matters to them. Never praise a town, an area or a property. Never promise when you or anyone will reply. Never add closing courtesy lines. Repeat what the client asked for as a plain fact ("Noted: with a terrace."), and go straight to the facts or to the one question.

## 2. The list

**What the columns mean:**
- **"—"** means the sentence is removed and nothing replaces it.
- **The replacement uses tú.** If the reply uses usted, the replacement takes usted in the same way.
- **`{…}`** is a field from the enquiry or the record, never typed by hand. If the field is empty, the replacement is dropped too.

### A. Compliments on the choice

| # | Never (ES) | Never (EN) | Instead (ES) | Instead (EN) | Found in |
|---|---|---|---|---|---|
| A-1 | ¡Qué buena elección! | What a great choice! | — | — | Lead's proposal (05af0d3c) |
| A-2 | Qué bien que te interese este piso. | It's great that you're interested in this flat. | Sobre este piso: {fact} | About this flat: {fact} | **346865** |
| A-3 | Es una opción fantástica / estupenda. | It's a fantastic / wonderful option. | — | — | |
| A-4 | Has dado con una joya. | You've found a gem. | — | — | |

### B. Feelings and "I understand"

| # | Never (ES) | Never (EN) | Instead (ES) | Instead (EN) | Found in |
|---|---|---|---|---|---|
| B-1 | Comprar en {lugar} es un proyecto ilusionante. | Buying in {place} is an exciting project. | Comprar en {lugar}{, hasta presupuesto}: anotado. | Buying in {place}{, up to budget}: noted. | **320712** |
| B-2 | Ese piso te ha llamado la atención. | That flat caught your eye. | Sobre la ref. {ref}: … | About ref. {ref}: … | **320752** |
| B-3 | Entiendo que la terraza es importante (para ti). | I understand the terrace is important (to you). | Anoto que quieres terraza. | Noted: with a terrace. | **P2** (Lead) |
| B-4 | Entiendo que quieras confirmar la disponibilidad. | I understand you want to confirm availability. | La disponibilidad te la confirma {agente}. | {agent} will confirm whether it is available. | **346884** |
| B-5 | Entiendo perfectamente tu situación. | I completely understand your situation. | — | — | |
| B-6 | Sé lo importante que es encontrar tu hogar. | I know how important it is to find your home. | — | — | |
| B-7 | Me alegra mucho que nos escribas. | I'm so glad you wrote to us. | — | — | |

### C. Praise of a place or a property

| # | Never (ES) | Never (EN) | Instead (ES) | Instead (EN) | Found in |
|---|---|---|---|---|---|
| C-1 | {lugar} es un lugar precioso. | {place} is a beautiful place. | — | — | Lead's proposal |
| C-2 | Es una zona maravillosa / privilegiada. | It's a wonderful / privileged area. | — | — | |
| C-3 | Un enclave único / el paraíso. | A unique spot / paradise. | — | — | |
| C-4 | Es una oportunidad única. | It's a unique opportunity. | the facts from the listing: {precio} · {dormitorios} · {m²} | {price} · {bedrooms} · {m²} | |
| C-5 | No te lo puedes perder. / Se vende rápido. | You can't miss it. / It will sell fast. | — | — | |

**C-4 and C-5 are also claims.** A rare chance and a fast sale are things no record shows. They go in every case, not only at the start of a reply.

### D. Promises about time

| # | Never (ES) | Never (EN) | Instead (ES) | Instead (EN) | Found in |
|---|---|---|---|---|---|
| D-1 | Te responderé en breve. | I'll get back to you shortly. | — | — | **G5b M3** (MM) |
| D-2 | En breve un agente se pondrá en contacto contigo. | An agent will contact you shortly. | Paso tu consulta a {agente}. (only if the handover really happens) | I'm passing your enquiry to {agent}. | |
| D-3 | Te contestamos lo antes posible / hoy mismo. | We'll reply as soon as possible / today. | — | — | |

**D-2:** the handover sentence names no time and no channel. This is the same rule as Voice's appointment sentence (`35c886f`). F13 still applies: the reply ends on the one question, never on the handover alone.

### E. Courtesy closings and empty service lines

| # | Never (ES) | Never (EN) | Instead | Found in |
|---|---|---|---|---|
| E-1 | Estaremos encantados de ayudarte en tu búsqueda. | We'll be delighted to help you with your search. | — | **346938** (the same sentence in German) |
| E-2 | No dudes en escribirnos / contactarnos. | Don't hesitate to write to us / contact us. | — (the one question closes the reply) | |
| E-3 | Quedo a tu disposición (para cualquier duda). | I remain at your disposal (for any questions). | — | |
| E-4 | Espero que esta información te sea útil. | I hope this information is helpful. | — | |
| E-5 | Gracias por confiar en nosotros. | Thank you for trusting us. | — | |
| E-6 | Será un placer atenderte. | It will be a pleasure to assist you. | — | |

## 3. Stems for MF9c (the check after the agent)

**The stems MF9c matches**, lower case, without accents:

| Language | Stems |
|---|---|
| **ES** | `buena eleccion` · `que bien que` · `opcion fantastica` · `opcion estupenda` · `una joya` · `proyecto ilusionante` · `te ha llamado la atencion` · `entiendo que` · `entiendo perfectamente` · `lo importante que es` · `me alegra` · `lugar precioso` · `zona maravillosa` · `zona privilegiada` · `enclave` · `paraiso` · `oportunidad unica` · `no te lo puedes perder` · `se vende rapido` · `en breve` · `lo antes posible` · `encantados de` · `no dudes` · `no dude` · `a tu disposicion` · `a su disposicion` · `espero que esta informacion` · `gracias por confiar` · `un placer atender` |
| **EN** | `great choice` · `great that you` · `fantastic option` · `wonderful option` · `a gem` · `exciting project` · `caught your eye` · `i understand` · `completely understand` · `how important it is` · `so glad` · `beautiful place` · `wonderful area` · `privileged area` · `unique spot` · `paradise` · `unique opportunity` · `can't miss` · `sell fast` · `shortly` · `as soon as possible` · `delighted to` · `don't hesitate` · `at your disposal` · `hope this information` · `thank you for trusting` · `a pleasure to assist` |

**How MF9c applies them:**
- **The opening sentence:** MM's rule as written. It goes if it carries a stem and no fact.
- **"entiendo que" / "i understand" with a fact:** "Entiendo que buscas en Nerja" names a place, so MF9c keeps it. Copy recommends rewriting such sentences in the prompt (B-3: "Anoto que…"), not in the filter, so that the filter never cuts a fact.
- **C-4, C-5, D-1, D-3, E-2 to E-6 anywhere in the reply:** these sentences carry no fact. Copy recommends that MF9c removes them **wherever they stand**, not only at the start. They are typical last sentences, and a last sentence that is a stock phrase hides the one question.
- **Never removed:**
  - the greeting with the name ("Hola, Mila:");
  - the assistant line;
  - the one question;
  - a sentence with a number, a place, a reference or a field from the record.

## 4. What a reply looks like with the list applied

Mila's case from the site (`brief-1120.ts`, W-2 word for word):

| | ES | EN |
|---|---|---|
| **Without the list** (made up for this example) | Hola, Mila. ¡Qué buena elección! Nerja es un lugar precioso y entiendo que quieras confirmar la disponibilidad. Te responderemos en breve. No dudes en escribirnos. | Hi Mila. What a great choice! Nerja is a beautiful place and I understand you want to confirm availability. We'll get back to you shortly. Don't hesitate to write to us. |
| **With the list** | Hola, Mila, soy el asistente de Marta. La disponibilidad de la ref. 9895153 te la confirma ella por teléfono. ¿A qué hora te viene bien que te llame? | Hi Mila, I'm Marta's assistant. Marta will confirm by phone whether ref. 9895153 is available. What time suits you for her to call? |

## 5. Open

| Who | What |
|---|---|
| **MM** | the rule (§1) in the `Message Agent`, and the stems (§3) in MF9c, in the next MM package. Who builds it and when, MM decides. Copy names no date for MM |
| **MM** | the staging run with the texts of 320712, 320752 and 346865–346938, and the expected result: no line from §2 in any reply, while C1–C5 still pass |
| **Audit** | the F44 row: "Copy's list delivered" (this file), then MM's proof run |
| **Owner** | the owner's sample in production, as the row says |
