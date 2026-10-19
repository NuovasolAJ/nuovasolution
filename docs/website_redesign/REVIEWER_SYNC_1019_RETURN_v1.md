# REVIEWER R19-EXEC — RV1: the five findings re-checked one by one

**Role:** independent reviewer. No application code written or changed.
**Window:** 2026-10-19 08:20Z to 09:30Z (UTC) · **Order:** `AUDIT_TO_LANES_2026-10-19_R19_EXEC.md` (WS2–WS3), task RV1.
**Predecessor:** `REVIEWER_SYNC_1012_RETURN_v1.md` (`33ae922`) on `2561247` / `dpl_34uYqcvqTJMkkh12WK9c9G5wXHsN`.

| Item | Value |
|---|---|
| Commit under review | `4110566` |
| Deployment | `dpl_2KqZb43ZxiywgYpNqmKJYffLg95G` · `https://nuovasolution-design-preview-hd5u5lvm6-nuovasolajs-projects.vercel.app` |
| Build id served | `6Kp3mF9IFo9pJiSczvHkU` · `X-Robots-Tag: noindex, nofollow` |
| Binding (independent) | a local stub build of `4110566` yields **7 of 12** content-hashed chunks byte-name identical with this deployment; the differing five are the app-router entry chunks |
| Mode | stub / design preview. **No backend path was exercised**, so nothing here is a backend E2E result |
| Engine | Chromium (Edge headless) with device emulation — an approximation, not Safari |

> This report applies to the deployment named above and to nothing else. A technical check is not a legal clearance.

---

## 0. Signals

```
RV1_RECHECK_4110566 = 2 CLOSED · 1 NARROWED · 2 OPEN                                 2026-10-19T09:30Z
  F-R16-1 reports wording      = CLOSED
  F-R16-2 package in session   = CLOSED
  F-R16-3 social cover         = OPEN (unchanged)
  F-R16-4 legal marks, imprint = OPEN (unchanged, as the audit saw it)
  F-R16-5 language claim       = NARROWED, residual capability sentence
RV2_ACCEPTANCE      = NOT_RUN — waiting for WS2 (the website lane's next named build)
WEBSITE_TECH_ACCEPTED = unchanged FAIL from 1012; this round re-checked findings only, it is not an acceptance
```

---

## 1. Finding by finding

**F-R16-1 · The weekly report asserted counted records and denied being an estimate — CLOSED.**
Route `/es/app/reports` after the stub sign-in on this deployment.
Before (`2561247`): "Recuentos … **Nada aquí es una estimación**" above the figures, demonstration label only at the end.
Now (`4110566`): the intro reads "Recuentos de los registros que Nuova guarda en los canales conectados. **Lo que no se
mide no aparece como cero.**" and immediately below, **before any figure**: "Datos de demostración: la semana del ejemplo
de la página de inicio. **No son datos de ninguna agencia.**" The estimation sentence is gone; the figures (23 answered of
23 received, 6 viewings with 4 confirmed, 2 valuations, 2 open items) are now framed as the home page's example week.
That is the second branch of my closing condition. Evidence: `rvg-detail.json`, `rvf-det-reports.png`.

**F-R16-2 · The session area did not name the package — CLOSED.**
Route `/es/app`. Now: "Prueba activa · **paquete Essential** · quedan 9 días", next to "TU AGENCIA · DEMO AGENCY (STUB)"
and the log-out control. Evidence: `rvg-detail.json`.

**F-R16-3 · No cover image reaches the social screen — OPEN, unchanged.**
Route `/es/social/post`. All three fixtures still render "Este inmueble no tiene imagen", so the `cover_url` path is
still not demonstrated. The four steps (choose, write, approve, publish), the per-action demonstration note and the
refusal reason for the third listing are present as before.
Responsible: Website + Social. Closing condition: one fixture with a cover image, or a stated reason why the read model
has none. Evidence: `rvg-detail.json`, `rvf-det-social-post.png`.

**F-R16-4 · Legal pages marked, imprint missing — OPEN, unchanged, exactly as the audit saw it.**
`/en/legal/privacy`, `/terms`, `/data-deletion`: 200 with `Placeholder` / `PLACEHOLDER`.
`/es/legal/privacy`, `/terms`, `/data-deletion`: 200 with `Provisional` / `PROVISIONAL`.
`/en/legal/imprint` and `/es/legal/imprint`: **404** in both languages.
Responsible: Copy + Owner. Closing condition: the final legal texts adopted (marks = 0) and a decision on the imprint
route. The preview stays `noindex`, which it does. Evidence: `rvg-routes.json`.

**F-R16-5 · The public language claim — NARROWED, with a residual.**
What changed: every scene now carries a **State** line in both languages, and the language scene says
ES: "Estado: Hoy respondemos en español. El sistema responde en el idioma del cliente; lo que falta en otros idiomas es
la aprobación legal del aviso, no la función. Si alguien escribe en un idioma sin aviso aprobado, no enviamos nada y
queda una tarea para tu equipo."
EN: "State: Today we answer in Spanish. The system replies in the customer's language; what is missing for other
languages is the legal approval of the notice, not the function."
Also new and correct: "State: Available today: WhatsApp and email. Prototype: the web form and the phone call.",
"Prototype · not available yet." on the 3D scene, and "Example figures · not any agency's data" on the summary.
**Residual:** the sentence still asserts that the function replies in the customer's language, and attributes the gap to
the legal notice alone. Production has only Spanish replies (`ACCEPTANCE_LIST_1010` A-1/A-2), and this deployment is a
stub, so I could not verify the function in any language here.
Responsible: API (proof) + Copy (wording). Closing condition: one non-Spanish reply proven end to end in production or
staging, **or** a sentence that does not assert the function. Evidence: `rvg-home-es.txt`, `rvg-home-en.txt`.

**Side observation (INFO).** On `/es` at 1440 px exactly one text element stays under the contrast floor: the decorative
step number "03" (13 px, 4.29 : 1, `aria-hidden="true"`, repeated in the visible label "03 Ficha del cliente"). The
story letters that were under the floor on the previous build are no longer reported. No content text is below the floor.

---

## 2. What this round did not do

- **RV2 (the full independent acceptance)** is not run: it belongs to the WS2 build, and its deployment id will stand in
  the header of that report. This document does not grant or extend any acceptance.
- **No backend path** was exercised. Registration to an existing agency, the report with a real permission and social up
  to a visible effect remain unproven; a stub walk is not accepted as proof.
- **No legal judgement**: the placeholder markings are a fact about the pages, not an opinion on the texts.

## 3. Evidence `review_2026-10-19/`

`rvg-routes.json` (32 routes incl. the legal and gate states) · `rvg-detail.json` (the real texts of the session area,
the report and the social screens, the log-out control, the contrast context) · `rvg-home-es.txt`, `rvg-home-en.txt`
(the State lines and the claim wording) · `dpl-chunks-4110.txt` / `local-chunks-4110.txt` (commit binding) ·
`rvf-det-reports.png`, `rvf-det-social-post.png`. The probes themselves are the scripts committed on 2026-10-12
(`review_2026-10-12/rvf-*.mjs`), re-run unchanged against this deployment. No credential, token or signed URL is recorded.
