# API → Redesign (cc Audit, Copy): F-e contract, consent in the pilot request · 23.11.2026

**Order (owner, 23.11.):** "F-e: Vertrag für Redesign festlegen (Feldname, Wert, Pflicht); Redesign baut, du prüfst über echtes HTTP."
**Finding:** 5c87597 §F-e. The BFF dropped `consent`, so the intake refused every real request.
**Status at writing:** a fix is in your working copy of `app/api/pilot-request/route.ts`, not committed. I have not touched it.

## 1. The contract (BFF → intake, body of the POST to `NUOVA_PILOT_INTAKE_URL`)

| Field | Type, value | Required | Meaning |
|---|---|---|---|
| `consent` | JSON **boolean `true`**. Not `"true"`, `"on"` or `1`. | **yes** | The visitor saw the privacy line under the form (with the link to `/legal/privacy`) and pressed send. **This is no marketing consent.** Owner E1–E3, 20.11.: no marketing consent is derived from a form. |
| `web` | string, **empty** | yes (may be `""`) | The honeypot. A non-empty value is dropped in the BFF and never forwarded. |
| everything else | unchanged: `kind: "pilot_request"`, `agency`, `name`, `email`, `phone`, `interest` (`trial` / `demo` / `talk` / `contract` / …), `message`, `locale`, `source: "website"`, `at` | as today | — |

**What the intake does with it:**
- It refuses anything but `consent = true` with **422** `missing_fields` (`pilot_request_intake`, then the table: `consent boolean NOT NULL CHECK (consent)`).
- The value is stored on the request row only. Nothing else reads it.

## 2. What the BFF must do (your build)

1. **Forward exactly `consent: b.consent === true`.** Your working copy already does this.
2. **Refuse earlier, in the BFF:** if `b.consent !== true`, answer **422** `{ ok: false, error: "missing", fields: ["consent"] }`, the same way as the other missing fields.
   - Today the BFF would forward `false`; the intake answers 422 and the BFF turns that into 502 `intake_failed`.
   - That reads like an outage, not like a form error.
3. **The form** keeps sending `consent: true` only on submit, with the privacy line visible above the button.
   - A checkbox is **not** part of this contract. If the lawyer asks for one, that is a new owner line, not F-e.
4. **F-b**, already in your working copy: a production build without the intake answers 503 `intake_unconfigured`. `simulated` stays for previews only.

## 3. How I check it, over real HTTP (staging only, no real customer)

As soon as your commit is there:
- I run the route from **your commit** locally (`next dev`).
- The intake is the **staging** edge `pilot-request-intake`, with its key from the vault and never in the repo.
- Addresses are on `example.invalid`.

| # | Request to `/api/pilot-request` | Expected |
|---|---|---|
| H1 | complete, `consent: true` | 200 `delivery: "sent"`. Read back on staging: exactly one `pilot_request` row with `consent = true`, the way from `interest`, the task title for that way, and 0 lead rows. |
| H2 | `consent` missing | **422** `fields: ["consent"]` from the BFF; no row. |
| H3 | `consent: "true"` (a string) | 422 like H2; no row. |
| H4 | `web` filled (honeypot) | 200 `simulated`; no row. |
| H5 | without the intake environment, `VERCEL_ENV=production` | 503 `intake_unconfigured`. |

At the end every test row is erased. The evidence file goes to the repo with the run time.
**Prod:** nothing. That comes with the owner line PILOT-FORMULAR-PROD, which needs this test green first.

## 4. Check 1 over real HTTP, 12:22Z, website 32236c1 (route clean) against the staging intake: 5/7

**Green:**
- **H1:** a real request comes through: 200 `sent`, one row with `consent = true`, the way `trial`, the task "Solicitud de prueba Essential: …". **The F-e blocker is gone.**
- **H4:** the honeypot answers `simulated` and stores nothing.
- **H5:** a production build without the intake answers 503 `intake_unconfigured` (F-b green).
- **H6:** no lead row was created.
- **H7:** cleanup left nothing.

**Red:**
- **H2 and H3:** without `consent`, or with `"true"` as a string, the BFF answers **502 `intake_failed`**. Nothing is stored, but the visitor sees an outage instead of a form error.
- This is §2 point 2 of the contract. 32236c1 was committed before the contract.

**The one line, in `route.ts`:** add `b.consent !== true && "consent"` to `missing`.
I check again on your next commit (`node scripts/cert/stg_fe_consent_http.mjs`, n8n-system repo). Evidence: `governance/evidence/stg_fe_consent_http_1123.json`.
