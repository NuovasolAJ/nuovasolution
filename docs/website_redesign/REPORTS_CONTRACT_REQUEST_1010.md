# REPORTS CONTRACT REQUEST 1010 — the weekly agency report: what the website shows, what it needs from API, Reporting and Hosting

**State:** `2026-10-10` · **Lane:** Website Implementer → **API**, **Reporting**, **Hosting** (and Daily for the
operative view). Master order 2026-10-10 §8.

## 1. What was found first

The website repository holds **no** reporting work: no route, no fixture, no read model, no email. The words
`reports.nuovasolution.com`, "Wochenbericht", "1000 Incidencias", "602.4 h", "tomarla" (outside Daily's clip subtitle)
appear in no file and in no commit of any branch (searched 2026-10-10). The handoffs name a separate product repository
(`NuovaSolution-n8n-system`) for the back end; the website cannot see a reporting surface there either. The owner's
two emails (the weekly report with "1000 Incidencias" and "2 de 2" CRM errors, the morning overview with "Viewing
request", "queued", "602.4 h", "tomarla") were therefore **not** used as a reference. Whoever renders them is asked to
say so and to align them with the contract below (Reporting/API/Hosting for the weekly report, Daily for the morning
overview and its renderer).

So the website built the surface on a **proposed** contract and shows it with demonstration data in the stub build. In a
staging or live build the page renders the "awaiting contract" state (no figure, not even a zero) until the op exists.

## 2. The op the website calls

`POST /functions/v1/tenant-api` with the user's session JWT, `{ "op": "reports.weekly" }` (optional `"week": "2026-W41"`,
default: the last complete Monday-to-Sunday week in the tenant's timezone). The tenant comes from the session; no
`client_id` is sent. Answer, HTTP 200:

```json
{
  "ok": true,
  "period": { "from": "2026-10-05T00:00:00+02:00", "to": "2026-10-11T23:59:59+02:00", "timezone": "Europe/Madrid", "label": null },
  "generated_at": "2026-10-12T06:00:00Z",
  "basis": { "channels": ["whatsapp", "email", "webform", "phone"], "source": "nuova_records" },
  "counts": {
    "received": 23, "answered": 23,
    "by_channel": { "whatsapp": 11, "email": 7, "webform": 3, "phone": 2 },
    "viewings_requested": 6, "viewings_confirmed": 4, "valuations_requested": 2,
    "tasks_closed": 11, "tasks_open": 2, "proposals_sent": 4
  },
  "previous": { "received": 19, "answered": 19, "tasks_closed": 9 },
  "open_actions": [ { "who": "Peter y Anna Keller", "what": "Valoración de una villa en Elviria · falta fijar la cita", "since": "2026-10-06T09:24:00Z" } ],
  "plan": { "code": "growth", "trial": false }
}
```

Rules the website relies on:

| Rule | Why |
|---|---|
| a count the back end does not measure is **absent or null**, never `0` | the page prints "Not measured"; a zero would be a claim |
| `basis.channels` lists only channels connected for this tenant | the "data basis" line names them |
| `counts.by_channel` carries only channels in `basis.channels` | same |
| `plan.code` is the catalogue plan id (`essential`, `growth`, `scale`) and `plan.trial` says whether the trial is running | the page scopes the counts to what the package produces (trial = Essential scope) |
| refusals: `{ok:false, reason:"not_entitled"}` when `reporting.basic` is not enabled; `unknown_op` while the op does not exist | the page shows the one sentence each |
| `open_actions` ≤ 12, newest first, customer-readable `what`, no ids | shown as the "open actions" list |
| nothing in the answer: tenant ids, user ids, raw provider ids, revenue, time saved, "best source" | CLAIMS_MATRIX R-13/R-14 rejected; nothing unmeasured is shown |

Entitlement: the catalogue flags `reporting.basic` (all plans) and `reporting.advanced` (growth, scale) exist; the website
gates the page on `reporting.basic` **denied** (then "not part of your package") and otherwise shows the report. API:
please confirm the flags are delivered in `entitlements` for every tenant, including trials.

## 3. The Monday email (Hosting)

The website renders the template at `/{locale}/app/reports/email` inside the login (`components/app/weekly-email.tsx`):
subject "Tu semana en Nuova: {received} consultas atendidas", a greeting, the period, up to six counts of the scoped
set, the open actions in one line, one button "Ver el informe completo" to `/{locale}/app/reports`, a footer that says
why the person receives it. Inline styles only. Hosting takes this markup once the op exists and sends it on Monday
morning to the agency's administrators in the agency's default language. The button lands on the login when there is no
session and comes back to the report afterwards (`?next=`).

## 4. The operative view of the day (Daily)

`/{locale}/app` has a place for "today in your team" (open tasks, who took which) and says that it waits for the daily
assistant's data contract. Daily: please name the read model the website may call through `tenant-api` (today the
functions `dg_assistant_viewing_tasks('mine')` and the manager views exist only as database objects per
DAILY_FEATURE_TRUTH 2026-09-28) and the fields of one task row; the website renders nothing of it until then.

## 5. Access, as built

Every page under `/{locale}/app` is guarded on the server, in this order: session (else the login, with `?next=` back to
the page) → membership (a login without an agency goes to the registration step) → entitlement (`reporting.basic`) →
the op, which the back end scopes to the tenant of the session. No hidden button is a guard. Existing report links
elsewhere (none known in this repository) would need the same transition; none was found.
