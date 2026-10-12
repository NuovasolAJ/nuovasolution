# WEEKLY REPORT MAIL v1 — the wording for the weekly summary, ES and EN

**State:** `2026-10-12` · **Lane:** Website Copy / Product Truth → **Lead** (contract), **API**
(`reports.weekly`), **Website Implementer** (render).
**Written against:** the shape in `REPORTS_CONTRACT_REQUEST_1010.md` as quoted in the R16 order: `period`,
`basis.channels`, `counts` (`received`, `answered`, `by_channel`, `viewings`, `valuations`, `tasks`,
`proposals`), `previous`, `open_actions`, `plan`, with **not measured = absent or null, never 0**.
**Status:** DRAFT by its author. `REPORTING_CONTRACT_v2` is not delivered yet, so every field below is
written **conditionally**: a line renders only if its field is present. Nothing here invents a metric.

---

## 1. The three rules this mail obeys

1. **Absent is not zero.** A field that is absent produces **no line**. A field that is present and zero
   produces a line that says zero in words. The two must never look the same, because "nobody wrote to you
   this week" and "we do not measure that" are different messages to a business owner.
2. **No number without its basis.** Every count is read against `basis.channels`: a figure that covers only
   WhatsApp and e-mail says so, in the mail, once.
3. **No comparison on thin data.** `previous` only produces a sentence when both periods carry the field
   **and** the current count is at least 5. Below that the mail shows the two numbers side by side and
   draws no conclusion. One enquiry against two is not a 100 % rise, and an agency owner who is shown that
   once stops trusting the rest.

---

## 2. Subject

| Case | ES | EN |
|---|---|---|
| `counts.answered` present | Tu semana en Nuova: {answered} consultas atendidas | Your week in Nuova: {answered} enquiries answered |
| `answered` absent, `received` present | Tu semana en Nuova: {received} consultas recibidas | Your week in Nuova: {received} enquiries received |
| both absent | Tu semana en Nuova | Your week in Nuova |
| both present and 0 | Tu semana en Nuova: ninguna consulta esta semana | Your week in Nuova: no enquiries this week |

The subject proposed in the request reads "{received} consultas **atendidas**", which puts the received
count behind the word answered. Those are two fields and they differ whenever something is still open, so
the subject takes `answered` when it has it.

## 3. The mail

| Slot | ES | EN |
|---|---|---|
| Greeting | Hola {nombre}, | Hello {name}, |
| Opening, with the period | Esto es lo que pasó en {agencia} del {desde} al {hasta}. | Here is what happened at {agency} from {from} to {to}. |
| The basis, once | Cuentan los canales conectados: {canales}. | The connected channels count towards this: {channels}. |
| `received` + `answered` | Llegaron {received} consultas y se atendieron {answered}. | {received} enquiries arrived and {answered} were answered. |
| `by_channel` | Por canal: {lista}. | By channel: {list}. |
| `viewings` | Se pidieron {viewings} visitas. | {viewings} viewings were requested. |
| `valuations` | Se pidieron {valuations} valoraciones. | {valuations} valuations were requested. |
| `tasks` | Tu equipo cerró {tasks} tareas. | Your team closed {tasks} tasks. |
| `proposals` | Se enviaron {proposals} propuestas de inmuebles. | {proposals} property proposals were sent. |
| `previous`, only at 5 or more | La semana pasada fueron {prev}. | Last week it was {prev}. |
| `previous`, below 5 | Semana pasada: {prev}. Son pocas para sacar una tendencia. | Last week: {prev}. Too few to read a trend into. |
| `open_actions` | Siguen abiertas {open_actions} cosas que esperan a una persona. | {open_actions} things are still waiting for a person. |
| Button | Ver el informe completo | See the full report |
| Under the button | Entras con tu cuenta de agencia. | You sign in with your agency account. |
| Close | Si algo no cuadra, respóndenos a este correo. | If something does not add up, reply to this mail. |

The button points at the agency login and then at `/app/reports`. One button, nothing else to click.

## 4. The zero state, written out

Not a variant of the normal mail: the zero week gets its own three lines, because an owner who reads
"0, 0, 0" assumes the system is broken.

| Slot | ES | EN |
|---|---|---|
| Opening | Esta semana no llegó ninguna consulta por los canales conectados ({canales}). | No enquiries arrived this week through the connected channels ({channels}). |
| The reassurance, only when true | Todo siguió funcionando: no hubo ningún fallo de entrega. | Everything kept running: there was no delivery failure. |
| The next step | Si esperabas consultas esta semana, dinos por qué canal y lo revisamos contigo. | If you expected enquiries this week, tell us which channel and we will look at it with you. |

The second line renders **only** if the report carries the fact that no delivery failed. If the report
cannot say that, the line is absent. A reassurance nobody checked is worse than none.

## 5. "Not measured", written once and plainly

A field that is absent produces no line. One sentence at the end names what the report does **not** cover,
and only if at least one known field is absent:

| ES | EN |
|---|---|
| Esto no lo medimos todavía: {lista}. Cuando lo hagamos, aparecerá aquí. | We do not measure these yet: {list}. When we do, they will appear here. |

**Never** in this mail: anything about calls that were or were not missed, any "best source", any
conversion rate, any revenue figure, any share or percentage, and any count for a channel that is not in
`basis.channels`. The owner rules for "no missed calls" and "best source" belong to Lead's contract and
those two lines are written only once Lead has defined the field and the proof behind it.

## 6. Trial

In a trial the mail carries **only the metrics the trial's own scope includes**, and it says so once:

| ES | EN |
|---|---|
| Durante la prueba, el informe muestra lo que incluye Essential. | During the trial the report shows what Essential includes. |

No metric from a higher package appears greyed out, teased or as an empty row. An empty row for something
the agency cannot have is an advertisement inside an operational mail.

## 7. What Lead still has to decide, per field

For each of `received`, `answered`, `by_channel`, `viewings`, `valuations`, `tasks`, `proposals`,
`open_actions`: the definition, the source, whether it is measurable today, derivable, or not collected at
all, and the previous-period rule. The wording above adapts to any answer, because every line is bound to
the presence of its field. **The one thing that would change the text** is a field that turns out to be
derivable but imprecise: that one needs its own sentence rather than a silent number.
