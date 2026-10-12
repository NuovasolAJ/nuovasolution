# MAIL_SHELL_v1 — the two fillings, as examples with demonstration data

**State:** `2026-10-12` · **Lane:** Website Implementer → **Hosting** (weekly report), **Daily** (morning brief), **Copy**
(texts), **Lead** (data), **Audit**. The shell is `MAIL_SHELL_v1.html` in this folder; the slots are documented in its
head comment. Every value below is demonstration data; the rules of which line renders when come from Copy's
`WEEKLY_REPORT_MAIL_v1.md` (absent is not zero; no comparison under five; the zero week has its own three lines).

## 1. Weekly report (Hosting), Spanish

| Slot | Value |
|---|---|
| LANG | es |
| EYEBROW | Resumen semanal · Demo Agency |
| SUBJECT | Tu semana en Nuova: 23 consultas atendidas |
| GREETING | Hola Elena, |
| SUMMARY | Esto es lo que pasó en Demo Agency del 5 oct 2026 al 11 oct 2026. Cuentan los canales conectados: WhatsApp, email, formulario web. |
| FIGURES | Consultas recibidas 23 · Respondidas 23 · Visitas pedidas 6 · Visitas confirmadas por el equipo 4 |
| CONTEXT | Llegaron 23 consultas y se atendieron 23. Por canal: WhatsApp 11, email 7, formulario web 3. Se pidieron 6 visitas. Se pidieron 2 valoraciones. Tu equipo cerró 11 tareas. La semana pasada fueron 19. Siguen abiertas 2 cosas que esperan a una persona. |
| NEXT_ACTION | *(removed: the open actions are in the context line; the report page lists them)* |
| BUTTON | Ver el informe completo → `https://<site>/es/app/reports` · under: Entras con tu cuenta de agencia. |
| FOOTER | Si algo no cuadra, respóndenos a este correo. Recibes este email porque eres administrador de tu agencia en Nuova. Las cifras son recuentos de los registros de Nuova en tus canales conectados. |

Trial: the FOOTER starts with "Durante la prueba, el informe muestra lo que incluye Essential." and FIGURES carries only
Essential's counts.

Zero week: SUBJECT "Tu semana en Nuova: ninguna consulta esta semana"; SUMMARY "Esta semana no llegó ninguna consulta
por los canales conectados (WhatsApp, email)."; FIGURES removed; NEXT_ACTION "Si esperabas consultas esta semana, dinos
por qué canal y lo revisamos contigo."

## 2. Morning brief (Daily), Spanish — slots only, texts from Copy (R16-K K1)

| Slot | Value |
|---|---|
| EYEBROW | Tu mañana · Demo Agency |
| SUBJECT | Buenos días, Elena: una consulta importante para hoy |
| GREETING | Hola Elena, |
| SUMMARY | Desde ayer han llegado cuatro consultas. La que más importa hoy: Laura Serrano pidió ver EST-204 el jueves y nombró fecha, inmueble y presupuesto. |
| FIGURES | Laura Serrano · confirmar mañana o tarde del jueves — Peter y Anna Keller · proponer cita de valoración — Álvaro Pons · devolver la llamada a partir de las 16:00 |
| CONTEXT | *(the reason of the first item, one sentence)* |
| NEXT_ACTION | Toma la tarea de Laura en tu lista y confírmale la hora por WhatsApp. |
| BUTTON | Abrir mi lista → `https://<site>/es/app` |
| FOOTER | Recibes este email porque formas parte del equipo de tu agencia en Nuova. |

The morning brief renders nothing until Daily's read model exists (REPORTS_CONTRACT_REQUEST_1010 §4).

## 3. Signal

```
MAIL_SHELL_V1 = docs/website_redesign/mail/MAIL_SHELL_v1.html <sha256 in WEBSITE_REDESIGN_FINAL_1012_RETURN_v1.md>
```
