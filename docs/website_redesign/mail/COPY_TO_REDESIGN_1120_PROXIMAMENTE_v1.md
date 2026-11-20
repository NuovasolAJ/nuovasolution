# Copy → Redesign, RV6: the "Próximamente" wording for the public page, with the owner's five keys · 20.11.2026 (due 11:00)

**Order:**
- The owner to Redesign, 20.11. morning: "Den Wortlaut legt Copy bis 11:00 in docs/website_redesign/mail/COPY_TO_REDESIGN_1120_PROXIMAMENTE_v1.md; übernimm ihn ohne Rückfrage."
- Later the same morning: "‚Próximamente' bleibt genau wie in Copys Datei 8cbe48c/19b5523 mit dem heutigen Stand von claims.ts."

Redesign relayed both. Copy did not get the order directly.

**Status:** an editorial and technical check, not a legal approval and not a Meta approval.

**What this file is:**
- **The wording rules do not change.** They are in `docs/website_redesign/COPY_TO_REDESIGN_1120_HERO_PROXIMAMENTE_PLANFOLD_v1.md`: `8cbe48c` + `19b5523` (G-m) + `fb2e600` (the capital letter in G-3p by position).
- This file adds two things:
  - §1, the exact result for the gate Redesign builds now;
  - §2, two lines of the section that the earlier file did not cover.

---

## 1. The result with the gate Redesign builds (five keys "soon": `phoneAssistant`, `instagram`, `adsLeads`, `matching`, `followup`)

All other keys of the section stay live, including `taskList`, `dailyVoice` and `model3d`.

| Place | What the public page shows | ES | EN |
|---|---|---|---|
| Hero | H-subP (`followup` and `matching` off) | Tus clientes reciben respuesta aunque estés en una visita, y lo que piden te espera ordenado en su ficha. | Your clients get a reply even while you are at a viewing, and what they ask for is waiting for you on their record. |
| G-1 | P-1, all off. Title, sentence and phone line stay; the examples and G-m are hidden | chip: Próximamente · Desde Growth · redes sociales en Enterprise | chip: Coming soon · From Growth · social media on Enterprise |
| G-2 | P-1 | chip: Próximamente · Desde Growth | chip: Coming soon · From Growth |
| G-3 | partial, both parts off | chip: Desde Growth · en parte próximamente · sentence: Responde al momento y aclara qué busca cada cliente. Proponerle inmuebles que encajan y hacer seguimiento, con su permiso: próximamente. · phone: Cada interesado, respondido al momento. · example line 1 only, with G-m | chip: From Growth · partly coming soon · sentence: It replies at once and finds out what each client is looking for. Suggesting listings that fit and following up, with their permission: coming soon. · phone: Every lead, answered at once. · example line 1 only, with G-m |
| G-d | unchanged (`taskList`, `dailyVoice` live) | Cada mañana, qué oportunidades piden tu atención. | Every morning, which opportunities need your attention. |
| T-2 | P-1 | chip: Próximamente · Desde Growth | chip: Coming soon · From Growth |
| T-4, T-8, T-6 | unchanged | — | — |
| Day, desktop | three stations off (D-2, D-4, D-5), so more than two: **only D-1, D-3, D-6 are shown** | 08:30 · 13:20 · 23:40 with their v2 sentences | same |
| Day, phone D-c | the live stations only | 08:30 tu día · 13:20 aviso · 23:40 respuesta de noche | 08:30 your day · 13:20 notice · 23:40 a night-time reply |

Plans table, /packages and demo tabs: off rows and tabs carry PX-b "Próximamente" / "Coming soon". The legend reads "Próximamente: aún no activo" / "Coming soon: not active yet" (`COPY_TO_REDESIGN_1116_EXAMPLE_WEEK_PROXIMAMENTE_v1.md` §1, points 4 and 5). Nothing new here.

## 2. Two lines the earlier file did not cover

| # | Element | When | ES | EN |
|---|---|---|---|---|
| E-P | eyebrow of the section (v2 "Todo lo que hace por tu agencia") | **as soon as one card of the section is "Próximamente" or partial**, which is the case with the five keys | Todo lo que hace y hará por tu agencia | Everything it does, and will do, for your agency |
| G-h | the main statement | **stays unchanged** | Nuevos clientes. Contactos que vuelven. Más oportunidades para tu agencia. | New clients. Contacts who come back. More opportunities for your agency. |

**Why E-P:** "Todo lo que hace" in the present tense above cards marked "Próximamente" says these functions work today.

**Why G-h stays:**
- It is the owner's main statement. Like the hero h1, it names a goal, not a function.
- The cards directly below it carry the state in their first element, the chip. So "Próximamente" is visible where the planned functions are named (the owner's rule of 19.11.).
- If the owner wants the heading itself marked, Copy writes that line. Copy does not change it on its own.

## 3. One difference for the owner (not Copy's to decide)

**Settled by the owner, 20.11. 09:05:**
- Only what is proven in production for pilot agencies is shown as available.
- His five keys, `whatsappOwnNumber` and `alert` are "Próximamente".
- `otherLanguages` stays hidden in both views.
- The other ten (RV6 `42bd0ec`, group C) are decided by API's production check (`API_TO_WEBSITE_1120_REGISTER_ABGLEICH_v1.md`, by 13:00).

The wording for every possible result is in §4. The text below stays as history.

The owner's second sentence says "mit dem heutigen Stand von claims.ts". The register (`claims.ts:37–68`) lists more keys of this section as "soon" than the five Redesign builds: also `taskList`, `dailyVoice`, `weeklyEmail` and `model3d`, plus `webform` in the demo.

**If the gate follows the register in full, the page changes as in the earlier file's §2.5:**
- T-4 and T-6 are also "Próximamente";
- the day shows only D-3 and D-6;
- G-d hangs on `taskList`/`dailyVoice`, so the growth block ends without it.

The wording for that case already exists; only the switch differs. The owner decides which applies.

---

## 4. The wording for every key the owner's decision of 20.11. 09:05 can switch (added 20.11.)

**Why this section:** Redesign takes API's result into `publicGate` without asking back. Every key that can come out "soon" therefore needs its wording ready now.

**How it works:**
- PX-b is the badge "Próximamente" / "Coming soon".
- PX-s is the sentence form "{Función}: próximamente." / "{Function}: coming soon." (`COPY_TO_REDESIGN_1116_EXAMPLE_WEEK_PROXIMAMENTE_v1.md` §1).
- A plan row gets PX-b instead of "✓". A sentence that names the function gets PX-s, or the PX-s of its line.
- **Nothing that is "soon" is simply hidden any more** (owner, point 1). The only exception is `otherLanguages` (point 4).

### 4.1 Keys fixed as "Próximamente" by the owner (points 2 and 3)

| Key | Where it has its wording |
|---|---|
| `phoneAssistant`, `instagram`, `adsLeads`, `matching`, `followup` | §1 of this file. Elsewhere 1116 §1 rows: "Llamadas: próximamente.", "Instagram: próximamente.", "Inmuebles que encajan con cada cliente: próximamente.", "Seguimiento automático: próximamente." |
| `adsLeads` outside the section (plans row) | PX-b; PX-s "Contactos de portales y anuncios: próximamente." / "Contacts from portals and ads: coming soon." (new, there was no 1116 row) |
| `whatsappOwnNumber` | 1116 §1: "WhatsApp con el número de tu agencia: próximamente." / "WhatsApp on your agency's own number: coming soon." |
| `alert` | 1116 §1: "Aviso por email a la persona adecuada: próximamente." / "Email alert to the right person: coming soon." |
| `otherLanguages` | hidden in both views (owner, point 4); no "próximamente" line |

### 4.2 Group C: the ten keys API checks by 13:00 (point 6)

| Key | Function name ES · EN | PX-s ES | PX-s EN | Where it shows on the site |
|---|---|---|---|---|
| `taskList` | Lista de tareas del equipo · The team's task list | Lista de tareas: próximamente. | Task list: coming soon. | T-4 (P-1), D-1, G-d (below), plans row |
| `dailyVoice` | Resumen de la mañana · The morning summary | Resumen de la mañana: próximamente. | Morning summary: coming soon. | T-4 (P-1), D-1, G-d |
| `model3d` | Visualización 3D · 3D visualisation | chip "Próximamente · Opcional, con cualquier plan" (`8cbe48c` §2.2) | chip "Coming soon · Optional, with any plan" | T-6, the 3D section (1116 §1 row) |
| `weeklyEmail` | Resumen de la semana por email · The weekly summary by e-mail | El resumen de la semana por email: próximamente. | The weekly summary by e-mail: coming soon. | plans row, the report line C-4 (1113, "hide" until now: it becomes this PX-s). T-8 does not hang on it |
| `reportTrend` | Tendencia y canales del informe · The report's trend and channels | La tendencia y los canales del informe: próximamente. | The report's trend and channels: coming soon. | the report's channel cards (1113) |
| `webform` | Formulario web · Web form | Formulario web: próximamente. | Web form: coming soon. | the demo's web-form tab (PX-b on the tab, the tab keeps playing, 1116 §1 point 5), plans row |
| `oneRecordAcrossChannels` | Una sola ficha por cliente en todos los canales · One record per client across every channel | Una sola ficha por cliente en todos los canales: próximamente. | One record per client across every channel: coming soon. | plans row, any line that says one record across channels |
| `integrations` | Conexión con tu CRM · Connection to your CRM | Conexión con tu CRM: próximamente. | Connection to your CRM: coming soon. | plans row, FAQ |
| `outlook` | Outlook | Outlook: próximamente. | Outlook: coming soon. | plans row, FAQ |
| `mailboxConnection` | Conexión con el buzón de tu agencia · Connection to your agency's mailbox | **see §4.3** | | step 3 of "Cómo empezar" (1113/1116) |

**G-d with `taskList` and `dailyVoice` off:** "Cada mañana, qué oportunidades piden tu atención: próximamente." / "Every morning, which opportunities need your attention: coming soon."

**The day story** follows `8cbe48c` §2.4. If more than two stations are off, only the live ones show.

### 4.3 One conflict for the owner: `mailboxConnection`

**The conflict:**
- 1116 §1 says **never "próximamente"** for `mailboxConnection` / `replyEmail`. The owner tied the go-live to A12 (16.11.): if A12 slips, the go-live slips, not the text.
- Point 1 of 20.11. says that everything not proven shows "Próximamente".

If API finds no production proof for connecting a pilot agency's own mailbox, the two rules contradict each other.

**And it is not one line.** An agency's e-mail enquiries are answered only once its mailbox is connected. So "Próximamente" here would also touch every e-mail claim made for the pilot agency (the e-mail tab, "por WhatsApp y email", step 3).

**What the owner decides:**
- (a) the go-live waits for A12, as on 16.11.; or
- (b) e-mail for the agency's own mailbox becomes "Próximamente". Then Copy writes the e-mail lines anew, the same day.

If API's result is "soon" for this key, Redesign follows the owner's point 6 as ordered. Copy has put (a)/(b) to the owner. If he chooses (b), the e-mail lines come from Copy the same day. Until then, PX-s for step 3 is: "Conexión con el buzón de tu agencia: próximamente." / "Connection to your agency's mailbox: coming soon."
