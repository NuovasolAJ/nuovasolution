# WEEKLY REPORT LAYOUT 1020 — the new layout of the Monday mail on MAIL_SHELL_v3, for the owner's look and for Hosting (H16)

**State:** `2026-10-23` · **Lane:** Website Implementer → **Owner** (visual verdict on the desktop and phone previews),
**Hosting** (H16: after the owner's release, the template goes into the report-delivery line on staging and one marked
test mail goes to the owner's test address; reports already delivered are never sent again), **Copy** (the wording is
`WEEKLY_REPORT_MAIL_v1.md` and `COPY_1019` §3.3, unchanged), **Daily** (the morning brief keeps the TASKS block of v2;
v3 adds nothing for it and changes nothing in it). R20 W4.

```
MAIL_SHELL_V3 = docs/website_redesign/mail/MAIL_SHELL_v3.html sha256 758df0e53de3f62e975b96db3de8624205956b11122cbf75a7ab5a229c730946
```

## 1. What changed, and why

The owner's finding on the delivered mails: small type, weak hierarchy, running text. The v1/v2 weekly report put every
figure into one label + value table and every sentence under it. v3 keeps the shell (head, eyebrow, subject, greeting,
summary, button, footer) and adds two blocks for the report:

| Block | What it carries | Rule |
|---|---|---|
| **TILES** (up to three) | the week at a glance: **enquiries answered** of received · **viewings asked for**, with how many the team agreed · **waiting for a person** | a tile only when its field is present; no tile in a zero week; the figure 28 px, the label two or three words, one short note |
| **FIGURES** (rows) | the detail: by channel · valuations asked for · tasks closed · proposals sent (Growth and above) · last week | a row only when its field is present; "last week" only with enough data, otherwise the figure with "too few for a trend" |
| **OPEN_ACTIONS** (list) | what waits for a person, by name: *Peter y Anna Keller · Valoración de una villa en Elviria · falta proponer la visita · desde el 6 oct* | at most six; the customer's name in bold, then what waits, then since when |
| CONTEXT | the "not measured" sentence, once, only when a known field is absent | unchanged (Copy §5) |
| BUTTON | **Ver el informe completo** → the report in the agency login (`/app/reports`) | COPY_1019 §3.3 |

Three figures the reader sees first, the detail under them, the open things by name, one button. Less running text,
a visible hierarchy, readable at 390 px without horizontal scroll (the three tiles are three cells of one table, each
~100 px wide on a phone; no media query is needed).

## 2. The Spanish version, as shown

Preview inside the login: `/es/app/reports/email` (stub session:
`/api/bff/auth/login?stub=1&next=%2Fes%2Fapp%2Freports%2Femail`). Pictures: `evidence_2026-10-23/mail/weekly-d640-es-full.png`
(desktop, 640 px mail width) and `weekly-m390-es-full.png` (phone 390). The English mirror: `/en/app/reports/email`.

| Slot | Value (demonstration data: the home page's example week; no agency's data) |
|---|---|
| EYEBROW | Resumen semanal · Demo Agency |
| SUBJECT | Tu semana en Nuova: 23 consultas atendidas |
| GREETING | Hola, |
| SUMMARY | Esto es lo que pasó en Demo Agency del 5 oct 2026 al 12 oct 2026. Cuentan los canales conectados: WhatsApp, email. |
| TILES | **23** Consultas atendidas · de 23 recibidas — **6** Visitas pedidas · 4 acordadas por el equipo — **2** Esperan a una persona · ver abajo quién y qué |
| FIGURES | Por canal · WhatsApp 13 · email 10 — Valoraciones pedidas · 2 — Tareas cerradas por el equipo · 11 — Propuestas enviadas · 4 — La semana pasada · 19 |
| OPEN_ACTIONS | Sigue abierto: Peter y Anna Keller · Valoración de una villa en Elviria · falta proponer la visita · desde el 6 oct 2026 — Sofía Lamas · Alquiler de larga temporada en Fuengirola · esperando su respuesta · desde el 6 oct 2026 |
| CONTEXT | *(removed: every known field is present in the example)* |
| BUTTON | Ver el informe completo → `https://<site>/es/app/reports` · under: Entras con tu cuenta de agencia. |
| FOOTER | Si algo no cuadra, respóndenos a este correo. Recibes este email porque eres administrador de tu agencia en Nuova. Las cifras son recuentos de los registros de Nuova en tus canales conectados. |

"Visitas acordadas" and not "confirmadas", "falta proponer la visita" and not "fijar la cita": a wish is agreed, no
calendar books anything (COPY_1019 R-10, HANDOVER_1021 A-13/A-16). The channels are the two that exist
(WhatsApp, email); no web-form or phone figure.

## 3. The slots for Hosting's renderer

The static file `MAIL_SHELL_v3.html` carries the same blocks with the same names; the head comment lists every slot.
For the report: `[[TILES]]` with 1–3 `[[TILE]]` (`TILE_VALUE`, `TILE_LABEL`, optional `TILE_NOTE`), `[[FIGURES]]` with
`[[ROW]]` (`LABEL`, `VALUE`), `[[OPEN_ACTIONS]]` with `OPEN_TITLE` and 1–6 `[[OPEN_ACTION]]` (`OPEN_WHO`, `OPEN_WHAT`,
optional `OPEN_SINCE`). `[[TASKS]]` is removed whole in the report. A slot without content is removed whole.

The rules of the content stay Copy's: absent is not zero; no number without its basis; no comparison on thin data; the
zero week has its own three lines and no tiles; the trial carries only Essential's scope.

## 4. What this file does not prove

A rendered preview in headless Chromium is not a mail client. The real send and the look in a real client are Hosting's
proof (H16: one marked test mail to the owner's test address after the owner's release of this layout). Nothing was
sent from the website; no report already delivered is sent again.
