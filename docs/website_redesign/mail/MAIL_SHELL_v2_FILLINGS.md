# MAIL_SHELL_v2 — the two fillings, as examples with demonstration data

**State:** `2026-10-19` · **Lane:** Website Implementer → **Daily** (morning brief), **Hosting** (weekly report), **Copy**
(texts), **Lead** (data), **Audit**. The shell is `MAIL_SHELL_v2.html` in this folder; the slots are documented in its
head comment. v2 adds the TASKS block Daily asked for on 2026-10-19 (`DAILY_TO_WEBSITE_2026-10-19_MAIL_TASK_BLOCK_v1`);
everything else is v1 unchanged, so the weekly report renders exactly as before. Every value below is demonstration data.

```
MAIL_SHELL_V2 = docs/website_redesign/mail/MAIL_SHELL_v2.html sha256 6eac862f684b898b95fc6496add0ac765b40c3dcc3b44fcf979d235cca064e93
MAIL_SHELL_V1 (unchanged) sha256 5b78cd68f475a2975c1e9014e669cd4e71d5059802b7f6be53d9e6d16e69e51c
```

Daily's builder refuses any shell whose sha256 is not the released one; until Daily releases v2 on its side, its
renderer keeps v1 and the FIGURES slot. The owner sees the previews below before any new real send (R18).

## 1. Morning brief (Daily), Spanish — the TASK block

Preview inside the login: `/es/app/brief` (stub session: `/api/bff/auth/login?stub=1&next=%2Fes%2Fapp%2Fbrief`). Pictures:
`evidence_2026-10-19/mail/brief-d640-es-full.png` (desktop, 640 px mail width) and `brief-m390-es-full.png` (phone 390).

| Slot | Value |
|---|---|
| LANG | es |
| EYEBROW | Tu mañana · Demo Agency |
| SUBJECT | Buenos días, Elena: una consulta importante para hoy |
| GREETING | Hola Elena, |
| SUMMARY | Desde ayer han llegado cuatro consultas. La que más importa hoy: Laura Serrano quiere ver el piso de Estepona la semana que viene y nombró inmueble, zona y presupuesto. |
| TASKS | three TASK blocks, the important one first (below) |
| FIGURES | *(removed: a task is not a figure)* |
| NEXT_ACTION | Toma la tarea de Laura en tu lista y proponle día y hora por WhatsApp. |
| BUTTON | Abrir mi lista → `https://<site>/es/app` · under: Entras con tu cuenta de agencia. |
| FOOTER | Recibes este email porque formas parte del equipo de tu agencia en Nuova. Si algo no cuadra, respóndenos a este correo. |

| TASK slot | Task 1 | Task 2 | Task 3 |
|---|---|---|---|
| TASK_KIND | Visita pedida | Respuesta en espera | Rellamada |
| TASK_WHO | Laura Serrano · WhatsApp | Peter y Anna Keller · Email | Álvaro Pons · Teléfono |
| TASK_LINE (×n) | Quiere ver el piso de Estepona la semana que viene · para vivir todo el año. / Presupuesto hasta 320.000 €. | Quieren vender su villa en Elviria y piden una valoración esta semana. / Escriben en alemán: Nuova no envía nada en alemán. | Llamó por la villa de Elviria: precio y margen. / Pidió que le llamen por la tarde · +34 600 123 456. |
| TASK_PRIORITY | Prioridad alta · nombró inmueble, zona y presupuesto | *(removed)* | *(removed)* |
| TASK_DRAFT_LABEL / TASK_DRAFT | *(removed)* | Borrador preparado · no enviado / Hallo Anna, hallo Peter, vielen Dank für Ihre Nachricht … | *(removed)* |
| TASK_STATE | Abierta · nadie la ha tomado | Abierta · desde ayer 11:24 | Abierta · recordatorio a las 16:00 |
| TASK_STEP | Proponerle día y hora por WhatsApp | Revisar el borrador, enviarlo y proponer la visita | Llamar a partir de las 16:00 |
| TASK_HREF / TASK_OPEN | `https://<site>/es/app` / Abrir | same | same |

Design (Daily's proposal of 2026-10-19 taken as the basis): kind 12 px uppercase muted · customer 17 px 600 ink · lines
15 px ink · priority 14 px with a gold mark · draft in a #f6f4ee box, caption 12 px uppercase, text 14 px · state 14 px
muted · next step 15 px 600 with the ink "Abrir" pill on the right. Less running text, a visible hierarchy, readable
at 390 px without horizontal scroll (measured, master-check `brief-email`).

The E19 fields Hosting is building (notification at the next opening, reminder, escalation) go into TASK_STATE as one
line ("Recordatorio a las 11:30", "Escalada a Marcos · 12:30") once they exist; no new slot is needed.

## 2. Weekly report (Hosting), Spanish — unchanged from v1

Preview inside the login: `/es/app/reports/email`. Pictures: `evidence_2026-10-19/mail/weekly-d640-es-full.png` and
`weekly-m390-es-full.png`. The slots and rules are those of `MAIL_SHELL_v1_FILLINGS.md` §1 (figures, context, the zero
week, the trial scope); the TASKS block is removed whole.

## 3. What is not proven here

A rendered preview is not a received mail: the real send and the real handset are Daily's and Hosting's proof, after
the owner has seen these pictures. The English mirror exists in the login (`/en/app/brief`); the Spanish version is the
one shown to the owner (R19 §11).
