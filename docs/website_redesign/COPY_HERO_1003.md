# COPY_HERO_1003 — the hero texts, delivered first

**State:** `2026-10-03` · **Lane:** Website Copy / Product Truth → **Website Implementer**, now.
**Base:** application code `cf6e80f`. **Evidence:** the package matrix in
`backend_handoff/handoff_in_2026-10-03/AUDIT_ORDERS_2026-10-03.md`, rows "Essential · automatische
Antworten", "Essential · E-Mail-Labels", "Essential · CRM-Einträge".
**Text limits applied:** headline ≤ 8 words · one subline ≈ 20 words · one main button, one second ·
labels 2 to 3 words.
**Status:** DRAFT by its author, not independently reviewed.

---

## 1. The hero

| Slot | ES | EN |
|---|---|---|
| Headline, 4 words | **Respondida cuando llega** | **Answered when it arrives** |
| Subline, 21 words | Un comprador escribe el domingo. Nuova responde en español, registra lo que ha pedido y deja una tarea a tu equipo. | A buyer writes on Sunday night. Nuova answers in Spanish, records what they asked for and leaves your team one task. |
| Main button | Prueba Essential gratis | Try Essential free |
| Second button | Ver cómo funciona | See how it works |
| State line under the buttons | Hoy en español, para consultas de texto por WhatsApp y email. | Today in Spanish, for text enquiries on WhatsApp and email. |

**The headline is unchanged on purpose.** It was delivered as D-81 on 2026-10-01, it is in `cf6e80f`, it
is four words, and it states the mechanism the product actually has. Changing it again would be churn in
the one line the owner has already seen twice. If the new scene needs a different rhythm, the alternative
that keeps the meaning is ES "Respondida mientras duermes" · EN "Answered while you sleep", 3 words, same
promise, warmer. **Recommendation: keep the current one.**

## 2. The three labels in the product image

| Position | ES | EN | Why this wording |
|---|---|---|---|
| 1 · the enquiry | **Consulta por WhatsApp** | **WhatsApp enquiry** | matrix: text enquiries on WhatsApp and Gmail are the proven channels |
| 2 · the reply | **Respuesta en español** | **Reply in Spanish** | matrix row "automatische Antworten": production, **Spanish only**. The scope sits inside the picture instead of in a disclaimer under it |
| 3 · the result | **Ficha del cliente** | **Customer record** | matrix row "CRM-Einträge": production, database and Google Sheet |

## 3. The hot alert is not in the hero, and this is why

The order offers "CRM-Eintrag/Hot-Alert" as the third label. I am delivering the **CRM record**.

The matrix row reads: *"Hot-Lead-Alerts · Prod vorhanden; Fehlauslösung im Paket behoben · fehlt: Port"*.
Read plainly: the version running in production is the one **with** the false trigger, and the corrected
version has not been ported yet. A hero label is the one place on the page that carries no state line, so
it would promise an alert that currently misfires.

The hot alert belongs in **module demonstration 1**, where it gets its state line "in preparation, not
bookable yet". That is in `COPY_DELTAS_1003`. The moment the port is reported, the third hero label can
become ES "Aviso de lead caliente" · EN "Hot lead alert" with no other change, and this lane will say so.

## 4. What the hero must not say

No minutes and no response time. No "every enquiry". No channel that is not WhatsApp or e-mail. No
language other than Spanish, and no language count. No price, no quota, no "unlimited", no promised
leads, no customer quote. Nothing about automatic 3D, appointment booking or campaigns.

**Signal:** `COPY_HERO_1003 = DELIVERED` → Website Implementer. The rest of this round follows in
`COPY_DELTAS_1003.md`.
