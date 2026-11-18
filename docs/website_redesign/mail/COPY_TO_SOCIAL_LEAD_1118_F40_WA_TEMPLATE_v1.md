# Copy → Social, Lead: the WhatsApp template for the agent's alert (F40) · 18.11.2026

**Order:** the owner, 18.11.: check Lead's Spanish draft and finish it.
**Read (only):** n8n repo `governance/LEAD_SIGNALS_1106.md`, entry 2026-11-18T09:24Z, section F40 (Audit `3ab16103`). Copy does not write in the n8n repo.
**Status:**
- This is an editorial check, **not a Meta approval**. Meta decides on submission (minutes to 48 h).
- Not a legal approval.
- No phone number, no e-mail address and no real client in this file. All sample values are fictional.

**Ready for submission:** §1 to §3. Social submits on the test WABA and the production WABA.

---

## 1. The template

| Field | Value |
|---|---|
| Name | `aviso_cliente_nuevo_v1` |
| Category | UTILITY |
| Language | Spanish. Social picks the code Meta lists for the WABA (`es` or `es_ES`); the text is the same |
| Header (text, 1 variable) | `{{1}} · Avisos` |
| Body (5 variables) | see below |
| Footer (fixed, no variable) | `No contestes aquí: escribe al cliente desde la app.` |
| Button (URL, dynamic) | label `Abrir en la app`; URL = the task link with the variable only at the end (`…?task={{1}}`), from F35 |

**Body:**

```
Cliente nuevo con prioridad alta: {{1}}.
Inmueble: {{2}}.
Falta por saber: {{3}}.
Siguiente paso: {{4}}.
Teléfono: {{5}}.
Tienes la ficha completa en la app.
```

The body counts its variables from `{{1}}` again. In Meta's editor the header and body numbering are separate. Lead's `{{2}}…{{7}}` becomes `{{1}}…{{5}}` here.

## 2. The variables: what goes in, and the fixed value when a part is missing

**Rule for every value:**
- **Never empty.** Meta refuses to send a template with an empty parameter.
- No line break, no tab, no more than 4 spaces in a row.
- **No full stop at the end** (the template adds it).
- Amounts and budget words as on the card (1116 §2.2: "hasta 300.000 €", "unos 350.000 €", never "300000 EUR").

| Var | Content (from the card model) | Example (fictional) | If missing |
|---|---|---|---|
| H `{{1}}` | the agency's name (`_client_name`), max. 50 characters | NuovaSolution | `NuovaSolution` |
| B `{{1}}` | the decision line: name + intent + zona + budget, the parts there are | Laura Serrano quiere comprar en Estepona, hasta 320.000 € | name missing: "un cliente sin nombre quiere comprar en Estepona". Everything missing: "consulta sin datos todavía" |
| B `{{2}}` | the listing of **this** enquiry: type · price · bedrooms · ref., also from a PDF (MM's facts). **Lead's `{{4}}` (price note) is folded in here** as the last part | piso · 432.000 € · 3 dormitorios · ref. NS-0001 · por encima de su presupuesto | `sin inmueble concreto` |
| B `{{3}}` | the missing items, the short forms of the card model (`faltaShort`) | para qué la quiere y cuándo | `nada, la consulta está completa` |
| B `{{4}}` | the next step, first letter small, without the full stop | proponerle una visita | `atender la consulta` |
| B `{{5}}` | the phone, formatted as on the card: "+34 600 000 000" (code + three groups of three) | +34 600 000 000 | `no lo ha dado` |

**Sample values for the submission** (Meta asks for one per variable; all fictional):
- H1 "NuovaSolution";
- B1 "Laura Serrano quiere comprar en Estepona, hasta 320.000 €";
- B2 "piso · 305.000 € · 2 dormitorios · ref. EST-204";
- B3 "para qué la quiere";
- B4 "proponerle una visita";
- B5 "+34 600 000 000";
- URL "abc123".

**The message as the agent sees it** (fictional):

```
NuovaSolution · Avisos
Cliente nuevo con prioridad alta: Laura Serrano quiere comprar en Estepona, hasta 320.000 €.
Inmueble: piso · 305.000 € · 2 dormitorios · ref. EST-204.
Falta por saber: para qué la quiere.
Siguiente paso: proponerle una visita.
Teléfono: +34 600 000 000.
Tienes la ficha completa en la app.
No contestes aquí: escribe al cliente desde la app.
[Abrir en la app]
```

## 3. What changed against Lead's draft, and why

| # | Lead's draft | Here | Why |
|---|---|---|---|
| W-1 | the body starts with `{{2}}` | starts with "Cliente nuevo con prioridad alta:" | Meta: no variable at the start of the body. The fixed words also say why the message comes |
| W-2 | the body ends with "Teléfono: {{7}}" | ends with "Tienes la ficha completa en la app." | Meta: no variable at the end of the body |
| W-3 | `{{4}}` = the price note **or empty** | folded into the listing value | Meta refuses an empty parameter, and a template cannot drop a line. The note is only meaningful together with the listing anyway |
| W-4 | lines with nothing to show are cut | every variable has a fixed value when missing (§2) | The same reason: a template line cannot be removed, so "—" or an empty value is replaced by words |
| W-5 | 7 variables (1 header + 6 body) | 6 (1 + 5) | Fewer variables per fixed word lowers the risk that Meta rejects the template for "too many variables for its length" |
| W-6 | no footer | footer "No contestes aquí: escribe al cliente desde la app." | The alert comes from a business number. If the agent answers it, the reply must not enter the system as a new client enquiry. See Q-F40b |
| W-7 | header `{{1}} · Avisos` | **kept** | The owner's wording. If Meta refuses a header that starts with a variable, the fallback is `Avisos · {{1}}`; Social uses it without asking again |
| — | no e-mail | **kept**, no e-mail | The owner |
| — | phone in the message | **kept** | The owner's order (Teléfono). This answers Copy's Q-L1 of the 1118 check for the template: phone yes, e-mail no |

**Nothing promotional:** no offer, no price of NuovaSolution, no "descubre", no emoji, no link other than the task. That suits UTILITY.

## 4. Open

| # | Question | Who |
|---|---|---|
| Q-F40a | Submission on the test WABA and the production WABA; the language code; the header fallback W-7 if needed | Social |
| Q-F40b | What happens when an agent replies to this message: is the sender number the agency's customer number? If so, the reply must be recognised as staff (the registered `whatsapp_number`) and must not open an enquiry | Lead + API |
| Q-F40c | The 24-hour fallback (plain text inside the window): it uses the same six lines in the same words, so the agent sees one format | Lead |
| Q-F40d | The URL base of the task link (F35); the variable stays at the end of the URL | Daily + Lead |
