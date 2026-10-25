# COPY → API · R24 · Contribution to the counsel package, draft v2 (legal pages v4 and the website)

**For:** API, which compiles `ANWALTSPAKET` v2, and through it counsel. **State:** 2026-10-25.
**Closes in v1:** "Rechtsseiten v4: Zulieferung offen (Copy)" and the Vercel row "Formulareingaben … Zulieferung offen
(Website/Copy)".
**Marking:** technical and editorial input. **Not a legal approval.** Each line is marked as **technical** (a fact to be
measured or built), **legal** (for counsel) or **owner data**.

---

## 1. The four legal pages: what exists and what each one still needs

Source: `docs/website_redesign/LEGAL_PAGES_FINAL_v1.md` **v4** and `docs/website_redesign/META_LEGAL_TEXT_FINAL.md`, both
at `fea4be0` on `origin/website_enterprise_redesign`. ES and EN for each page.

| Page | Route ES / EN | What it says | Open | Publication |
|---|---|---|---|---|
| Legal notice (LSSI-CE Art. 10) | `/aviso-legal` / `/legal-notice` | operator = a natural person trading as NuovaSolution; name, NIF, address, e-mail, telephone; activity; terms of use; content rights; Spanish law, courts of Málaga | **only the five E14 fields** | owner 23.10.: live once E14 is complete |
| Privacy notice (RGPD Art. 13) | `/aviso-de-privacidad` / `/privacy-policy` | two roles (controller for own visitors and agency users, processor for people who write to an agency), data classes, purposes and bases, processors by name with region, transfers, retention, rights, AEPD, the Instagram/Meta section, analytics | E14; retention; counsel | owner 23.10.: **only after counsel** |
| Terms | `/terminos` / `/terms` | parties, service for businesses only, what the service is, the agency as controller, Meta block | E14; DPA; liability | after counsel |
| Data deletion | `/eliminar-datos` / `/data-deletion` | three paths: someone who wrote to an agency, an agency, someone who commented on Instagram; statutory period | E14; the production deletion path | after the path exists |

`META_LEGAL_TEXT_READY = NO`, and it stays NO until E14 is complete, the deletion path exists in production and the
retention is decided and implemented.

## 2. The website itself, as built (`9f6c65e`, read 25.10.)

| Fact | Detail | Kind |
|---|---|---|
| Public pages have **no form** | contact is a `mailto:` link; the demo request is a link; nothing on the public pages is submitted to us | technical, measured (0 `<form>` on `/contact`, `/trial`, `/prueba-objeto`) |
| Sign-up, login, onboarding | handled by the site's own server routes (`app/api/bff/…`): sign-up, login, invitation, set-password, onboarding (business, legal data, branding upload, calendar), CRM choice, trial status. They pass name, work e-mail, password, agency details and logo **through Vercel functions** to the backend | technical |
| **Region of those Vercel functions** | `vercel.json` sets no region; Vercel's default is a US region unless the project setting says otherwise. **Not read by anyone so far** | **technical: Hosting or Website reads the project's function region**; then **legal**: whether it is a third-country transfer for sign-up and onboarding data |
| Session | one httpOnly cookie for the agency login, 60 minutes; one httpOnly cookie for the invitation step, 15 minutes | technical |
| Sign-up draft | the sign-up form keeps an unsent draft in the browser's `sessionStorage` until it is sent or the tab is closed | technical |
| Analytics | **Vercel Web Analytics** on every page: page views, no cookies, no advertising identifiers | technical |
| Hosting of the site | Vercel | technical |

**What the privacy notice v4 does not yet say, and should:**

| Missing | Proposed text, for counsel to confirm | Kind |
|---|---|---|
| Vercel as a processor (site hosting, the server routes above, analytics), with its region | ES "Vercel Inc. aloja este sitio web, ejecuta el registro y el acceso de las agencias y cuenta las visitas de página. Región: ⟦HOSTING: región de las funciones⟧." · EN "Vercel Inc. hosts this website, runs the sign-up and login of agencies and counts page views. Region: ⟦HOSTING: function region⟧." | technical (region), then legal |
| the two login cookies | ES "Al iniciar sesión usamos una cookie técnica que te mantiene conectado durante una hora; al aceptar una invitación, otra durante quince minutos. Son necesarias para el acceso y no se usan para nada más." · EN "When you log in we use one technical cookie that keeps you signed in for an hour; when you accept an invitation, another for fifteen minutes. They are needed for access and used for nothing else." | **legal**: whether listing strictly necessary cookies in this form suffices (LSSI Art. 22.2 exemption) |

These two additions are **not yet in** `LEGAL_PAGES_FINAL_v1.md`. They go in once the region is read, so that the page
does not carry a third kind of gap.

## 3. Gaps, separated

| Gap | Kind | Who |
|---|---|---|
| the five E14 fields (name, NIF, address, e-mail, telephone) | **owner data** | Owner; API checks completeness (`E14_CHECK` 23.10.: only trade name and country filled) |
| retention period per data class (options A/B/C in `META_LEGAL_TEXT_FINAL.md` §5b; API's RETENTION proposal per store) | **legal**, after the owner's line | Owner, counsel |
| retention implemented as decided | **technical** | API, Hosting |
| the production deletion path for one person across all stores | **technical** (R24 order API §6: staging, then a production test person) | API, Hosting |
| deletion re-applied after a backup restore | **technical** (R24-k) | Hosting |
| backups: 7 d / 14 d / +30 d, storage not backed up, offsite E7 booked | **technical** | Hosting |
| the region of the Vercel functions | **technical** | Hosting or Website |
| processing agreement: annex or separate, and when the agency accepts it | **legal** | counsel |
| limitation of liability | **legal** | counsel |
| providers' standard contractual clauses as transfer basis (CQ-20) | **legal** | counsel |
| 72 h confirmation and 30 day completion on the deletion page | **legal** | counsel |
| strictly necessary cookies: form of the notice | **legal** | counsel |
| E10, the phone notice | **legal** | owner, counsel (Voice's part) |

## 4. Where counsel finds the earlier questions

`docs/website_redesign/COUNSEL_PACKAGE_v2.md`: decision sheets D1–D11 and questions CQ-1…CQ-21. §0a there records two
corrections of earlier claims, so counsel does not rely on the uncorrected versions.
