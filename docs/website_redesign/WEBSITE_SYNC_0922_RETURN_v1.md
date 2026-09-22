# WEBSITE SYNC_0922 — Rückgabe Website-Implementierer v1

**Lane:** Website-Implementierer (Website-Code inkl. serverseitiger BFF-Routen) · **Stand:** 2026-09-22, 14:20Z
**Branch:** `website_enterprise_redesign` · **Code-Stand:** `6fbe45f` (nicht gepusht) · **Auftrag:** `PROMPT_09_WEBSITE_IMPLEMENTER.md` (dispatch_2026-09-22) + korrigierter Abschlussauftrag vom 2026-09-22
**Status:** Implementiert, wartet auf unabhängige technische Abnahme und Owner-Test. Nichts hier ist „fertig“ oder „produktionsreif“.

Commits dieser Runde (nur eigene Pfade, `git commit -- <Pfade>`):

| Commit | Inhalt |
|---|---|
| `eec96ec` | Übernahme WEBSITE_HANDOFF_v2: Registrierung bis Readiness über `tenant-api` / `branding-assets`, kein Secret-Key, Onboarding-Sektionen, CRM-Wahl vs. Verbindung, DRAFT-Hinweis, WR-18/20/23/27, Tests |
| `0dcd553` | GoTrue `email_address_invalid` sauber gemappt, Harness für neue Identität, Owner-Starter `npm run owner:staging` |
| `6fbe45f` | Review WR-29: Stub-Speichern behauptet keinen Backend-Stand mehr |
| *(dieser Record)* | Rückgabe, Evidenz, Handoff-Kopie |

Zwischen `0b813d0` und `eec96ec` liegen zwei Commits anderer Lanes auf demselben Branch (`3719fb2` Copy, `0d3cc3d` Reviewer). Ich habe sie weder geändert noch übernommen.

---

## 1 · Signale

```
WEBSITE_HANDOFF_V2_ADOPTED        = YES 6fbe45f 2026-09-22T14:14Z   (tenant-api + branding-assets, JWT-gebunden)
WEBSITE_BFF_SECRET_KEY            = NONE 6fbe45f                    (Runtime verweigert jeden gesetzten Secret-/Legacy-Key, G-10/G-11)
WEBSITE_STAGING_E2E               = PASS 6fbe45f 2026-09-22T14:14:51Z   (27/27; Umfang s. §2/§3: vorbereitete Testagentur + Agent + zweiter Tenant)
WEBSITE_STUB_E2E                  = PASS 6fbe45f 2026-09-22 (58/58)
WEBSITE_MODE_GATE                 = PASS eec96ec 2026-09-22T13:53:59Z (11/11)
WEBSITE_BUNDLE_SECRET_CHECK       = PASS 6fbe45f (0 von 32 Client-Chunks enthalten den Publishable Key; 0 Treffer sb_secret_/service_role)
WEBSITE_NEW_IDENTITY_REGISTRATION = BLOCKED 2026-09-22T14:03Z (Staging-GoTrue lehnt test.nuovasolution.com bei öffentlichem Sign-up ab: email_address_invalid)
WEBSITE_QA_STAGING                = NOT_RUN (keine Staging-Intake-URL außerhalb des Prod-Hosts übergeben)
WEBSITE_BRANCH_PUSH               = NOT_DONE (Owner-Freigabe fehlt; Branch-Push löst vermutlich Vercel-Preview aus, s. §5)
```

---

## 2 · Kette × sieben Nachweisstufen

Stufen: (1) implementiert · (2) lokal/isoliert geprüft · (3) integriert Staging · (4) echter externer Provider · (5) in Prod verifiziert · (6) vom Owner sichtbar getestet · (7) unabhängig abgenommen.

| Kette | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| Login + Session (GoTrue, httpOnly) | ja | ja (Stub) | **ja** (N3, N4, S1) | n/a (GoTrue ist Backend) | nein, v2 ist nur Staging | offen | offen |
| Neue Identität: Sign-up → Bestätigung → `register` | ja | ja (Stub B10) | **teilweise**: Sign-up erreicht GoTrue, Test-Domain abgelehnt | Mailzustellung nicht erreicht | nein | offen (Owner-Test, §7) | offen |
| Einladung / Recovery → Passwort setzen | ja | ja (Stub B9) | nein: `team.invite` ist DRAFT (v2 §5) | nein | nein | offen | offen |
| Geschäftsdaten + Öffnungszeiten | ja | ja | **ja** (S2, S9 Reload) | n/a | nein | offen | offen |
| Rechtliche Angaben + Links | ja | ja | **ja, speichern** (S7); **Rücklesen fehlt** im Vertrag (S10, WEB-API-1) | n/a | nein | offen | offen |
| CRM: „Kein externes CRM“ + Sheets „gewählt, nicht verbunden“ | ja | ja | **ja** (S3, S4, N10, N11) | nein: Sheets-OAuth nicht gebaut | nein | offen | offen |
| DRAFT-Hinweis vor Verbindung + Quittung | ja | ja (UI-Pfad, Stub W2-09) | **ja, serverseitig** (N10 428 ohne Quittung, N11 mit Quittung, N12 Agent 403); UI-Pfad auf Staging nicht gezeigt, weil Sheets bei der Testagentur bereits gewählt war | n/a | nein, nie live (DRAFT) | offen | offen |
| Logo-Upload hell/dunkel + Kontrast + Textersatz | ja | ja | **ja** (S5, S6, N8, N9; echte Bytes im Bucket) | n/a | nein | offen | offen |
| Kalender-Policy + Fallback ohne Kalender | ja | ja | **ja** (S8, S9) | nein: kein Kalender verbunden | nein | offen | offen |
| Readiness + Aktivierung | ja | ja | **ja** (S11, S13: `blocked` korrekt angezeigt) | n/a | nein | offen | offen |
| Trial-Status | ja | ja | **ja** (S1 Trial-Zeile aus `trial.status`) | n/a | nein | offen | offen |
| Rollen + Mandantentrennung | ja | ja | **ja** (N5–N8, N12, S14) | n/a | nein | offen | offen |
| Website-Q&A | ja (09-21) | ja (Vertragsmock) | **nein** (keine Staging-URL) | nein | nein | offen | offen |
| DSAR-Eingang | nein (Vertrag DRAFT) | – | – | – | – | – | – |
| OAuth Start/Rückkehr | nein (DRAFT, CRMs `coming_soon`) | Rückkehrseite ja (09-21) | – | – | – | – | – |
| Checkout / Billing-Testmodus | nein (kein Website-Vertrag) | – | – | – | – | – | – |

Nicht anwendbar begründet: Stufe 4 ist für reine Supabase-Pfade kein externer Provider; Stufe 5 ist gesperrt, weil `tenant-api` und `branding-assets` laut v2 §5 nur auf Staging existieren und keine Prod-Aufrufe erlaubt sind (§14.5.2).

---

## 3 · Belege

**Umgebung:** lokaler Produktions-Build (`next build`, Modus `staging`) auf `localhost:3121`, Ziel ausschließlich `https://fflmmzapksycjfdcjdtd.supabase.co`, Freigabe `NUOVA_STAGING_TARGET_APPROVED=fflmmzapksycjfdcjdtd`. Browser: Edge headless über DevTools-Protokoll, Mobil per `Emulation.setDeviceMetricsOverride` 390×844 (DPR 2), Desktop 1440×900.
**Schlüssel:** nur der Staging-Publishable-Key aus `stg_publishable_key.txt`, sha256-12 `d40a758a2f1f` (= Handoff v2 §0). Kein Secret-Key in der Website.
**Identitäten:** `stg_web_e2e_owner` (agency_admin), `stg_web_e2e_agent` (agent), `stg_web_e2e_other_owner` (zweiter Tenant), aus dem Secure Store gelesen, nie ausgegeben. Der Harness bricht ab, falls ein Zugangswert in eine Ausgabedatei geraten würde.
**Fixtures:** Agentur `stg_web_e2e_agency_a1b523` (Schreibzugriffe), `stg_web_e2e_other_393a6e` (nur Lesen + Negativtests). Beide sind laut API als `acceptance_fixture` in `test_fixture_registry` registriert.

| Lauf | Commit | UTC | Ergebnis | Datei |
|---|---|---|---|---|
| Staging-E2E | `6fbe45f` | 14:13:51 → 14:14:51 | 27/27 | `evidence_2026-09-22/staging/staging-e2e-results.json` |
| Stub-E2E | `6fbe45f` | 2026-09-22 | 58/58 | `evidence_2026-09-22/e2e-results.json` |
| Mode-Gate | `eec96ec` | 13:53:45 → 13:53:59 | 11/11 | `evidence_2026-09-22/mode-gate-results.json` |
| Neue Identität, Phase Sign-up | `eec96ec` | ~14:03 | 0/2, BLOCKED | `evidence_2026-09-22/staging/new-identity-signup.json` |

**Staging-Prüfungen (Auswahl):** N2 gefälschter Token → 401 · N5 manipulierte `client_id` ignoriert: der Schreibvorgang landet nur beim Owner, die Zeitzone des zweiten Tenants bleibt gleich · N6 keine Tenant-ID in den Lesedaten, außer im öffentlichen Logo-URL des Backends (Speicherpfad `agency-branding/<tenant>/…`, systembedingt) · N7 Agent: Setup-Schreiben, Aktivierung und Upload → 403 · N8 fremder Tenant committet den Upload dieser Agentur → 403 `cross_tenant_asset` · N9 PNG deklariert, Textbytes geliefert → 422, verworfen · N10/N11 Sheets nur mit Quittung · S5 Logo liegt auf `fflmmzapksycjfdcjdtd.supabase.co/storage/v1/object/public/agency-branding/…` · S9 nach Reload kommen Zeitzone, Sprachen, Kalender, Logo und Kontrast-Flag vom Backend zurück · S11 `white_label_legal` und `business_hours` READY, weiterhin nicht aktivierbar (andere Pflicht-Gates) · S13 „Go live“ meldet `blocked`, nie eine Aktivierung · S14 Agent sieht alles schreibgeschützt.

**DB-Effekte (nur über die Leseschnittstelle des Produkts, `tenant-api onboarding.read` / `branding-assets preview` / `crm.current` / `readiness`; eine direkte DB-Bestätigung bitte durch API, §4):** Agentur `stg_web_e2e_agency_a1b523`:
- `agency_business_config`: Zeitzone `Europe/Madrid`, Sprachen `es,en`, Öffnungszeiten laut Formular;
- `agency_calendar_policy`: Termintypen `viewing` und `valuation` (je 30 min), alle drei Fallbacks an, Zeiten gespiegelt;
- `agency_branding`: Rechtsname `stg_web_e2e_agency S.L. (TEST)`, CIF `B12345674`, `Calle de Prueba 1`, `29600 Marbella`, `Málaga`; Logo 240×96 PNG; dunkle Variante hochgeladen und wieder entfernt; `needs_light_background = true`;
- `agency_email_branding`: Datenschutz- und AGB-Link auf `https://example.org/stg-web-e2e/…`;
- `clients.crm_config.sheets_projection = true`. Das hatte schon API's eigener Lauf gesetzt; N11 hat es erneut gewählt. Ein Interesse `hubspot` stammt aus API's Lauf.

**Hinweis-Quittung:** Die Quittung wird als strukturierte Zeile ins Server-Log geschrieben. Im lokalen Lauf wurde die Serverausgabe verworfen, **diese Zeilen sind also nicht erhalten**. In einer Vercel-Preview landen sie in den Function-Logs. Solange es keinen DB-Vertrag gibt, ist das kein belastbares Protokoll (Q-API-C7).

**Screenshots** (`evidence_2026-09-22/staging/`): `stg-m390-en-onboarding-top.png`, `stg-m390-en-crm-sheets-chosen-not-connected.png`, `stg-m390-en-crm-sheets-off-unavailable.png`, `stg-m390-en-branding-light-dark.png`, `stg-m390-en-branding-dark-variant.png`, `stg-m390-en-branding-light-chip.png`, `stg-m390-en-readiness.png`, `stg-m390-en-agent-readonly.png`, `stg-d1440-es-setup.png`. Stub: `evidence_2026-09-22/*.png`.

**Handoff-Kopie:** `docs/website_redesign/backend_handoff/WEBSITE_HANDOFF_v1.md` (Quelle: System-Repo `8a78304`). v2 ist im System-Repo unter `governance/WEBSITE_HANDOFF_v2.md` (`8cddc17`) verbindlich übernommen.

### Was sich technisch geändert hat (für den Reviewer)

- **Autorisierung (v2 §0):** Der BFF leitet das Access-Token des Nutzers als `Bearer` an `tenant-api` / `branding-assets` weiter. Tenant und Rolle bestimmt die Edge Function. Der BFF sendet nie eine `client_id` und entfernt sie aus Argumenten. `lib/contracts/supabase.ts` enthält keinen Service-Pfad mehr.
- **Keys:** `NEXT_PUBLIC_SUPABASE_URL` und `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Publishable, `sb_publishable_`) werden nur serverseitig und zur Laufzeit gelesen, per berechnetem Namen, damit Next sie nicht beim Build einbettet. `SUPABASE_SERVICE_ROLE_KEY` / `SUPABASE_SECRET_KEY` gesetzt → `environment_misconfigured` (G-10). Ein `eyJ…`-Key → abgelehnt (G-11). Damit sind Review **WR-30** (Schlüsselname) und **WR-31** (Legacy-Key) erledigt.
- **Neue BFF-Routen:** `auth/invite`, `auth/set-password`, `register`, `onboarding/{business,legal,calendar,readiness}`, `branding/{upload-init,commit,remove,preview,contrast}`, `consent/connect-notice`. Umgebaut: `signup` (GoTrue), `tenant/activate` (v2 `activate`), `crm/select` (Quittungspflicht für Sheets), `trial/status`, `onboarding/{state,touch}`, `auth/{login,logout}`.
- **Review:** WR-18 (44 px), WR-23 (plattformgesetzter Client-Key), WR-27 (HSTS ohne `includeSubDomains; preload`), WR-29 behoben. WR-20 (`unsafe-inline`) bewusst als P2 dokumentiert (`next.config.js`).
- **CSP:** Storage-Origin nur in Nicht-Stub-Builds und nur als `https://*.supabase.co`.

---

## 4 · Offene Punkte (nächster Ausführender · Schließsignal)

| # | Punkt | Wer | Schließsignal |
|---|---|---|---|
| 1 | **Legal-Rücklesen:** `tenant-api` hat keine Leseoperation für Rechtsname, CIF, Adresse und Links. Nach einem Reload startet das Formular leer (ehrlich ausgewiesen) | API | `WEB-API-1 = READY <op>` (z. B. `onboarding.read` um `legal` erweitern) |
| 2 | **Fehlercodes:** `INVALID_TAX_ID (…)` und `INVALID_URL: …` enthalten Zusatztext und passen daher nicht auf `/^[A-Z_]+$/` in `tenant-api`. Folge: `502 backend_error` statt `422`. Die Website prüft vorher selbst, eine gültig formatierte CIF mit falscher Prüfziffer würde aber als Serverfehler erscheinen | API | `WEB-API-2 = FIXED` |
| 3 | **Sheets-Kopie abschalten:** Es gibt keinen Vertrag dafür. `crm.select nuovasolution` lässt `sheets_projection` stehen. Die Website sagt das offen (S4) | API | `WEB-API-3 = <op oder Semantik>` |
| 4 | **Neue Identität:** Öffentlicher Sign-up lehnt `test.nuovasolution.com` ab (`email_address_invalid`). Entweder zustellbare Testadresse bzw. Domain zulassen, oder der Owner-Test (§7) mit Owner-Adresse. Danach `node scripts/e2e/staging-new-identity.mjs register` | API / Owner | `WEBSITE_NEW_IDENTITY_REGISTRATION = PASS <commit>` |
| 5 | **Quittungs-Protokoll:** DB-Vertrag fehlt (Q-API-C7). Bis dahin nur Server-Log | API | `WEB-API-5 = READY <rpc>` |
| 6 | **Team-Einladung:** `team.invite` ist DRAFT. Die Website-Seite (Link → Passwort setzen) ist gebaut und im Stub getestet | API | `WEB-API-6 = READY` |
| 7 | **Q&A auf Staging:** Intake-URL außerhalb von `flows.nuovasolution.com` (Sandbox-Sperre) und ein Mandanten-Secret für die Website fehlen | Hosting | `WEB_QA_SECRET_FIXTURE = READY <url-host>` |
| 8 | **Auth-Redirects:** `site_url` ist `http://localhost:3000`, die Allow-List ist leer. Für eine Preview-Domain muss sie ergänzt werden | API | `STG_AUTH_REDIRECTS = <domains>` |
| 9 | **DSAR, OAuth, Checkout:** laut v2 §5 DRAFT. Die Website zeigt weiter nur die Kontaktadresse bzw. nichts. Kein Code ohne Vertrag | API | Handoff v3 |
| 10 | **Unabhängige Abnahme** von `6fbe45f` inkl. Staging-Harness | Reviewer | `WEBSITE_INDEPENDENT_ACCEPTANCE = PASS/FAIL 6fbe45f` |
| 11 | **Review WR-32/33/34** (Start-free-CTA nicht gegated; Q-2-Position auf Startseite und AI Sales Agent). Betrifft nur die öffentliche Freigabe, in dieser Runde nicht bearbeitet | Website (nächste Runde) + Copy | `WR-32/33/34 = FIXED <commit>` |
| 12 | **W4/W5 nicht bearbeitet:** Korrektur-PR-Entwurf für die alte Live-Site (WR-03, Copy liegt in `OLD_LIVE_SITE_HOTFIX_COPY_v1.md`), Rechtsseiten für Meta (DRAFT), Produktionspaket | Website (nächste Runde) | `WEBSITE_LIVE_CLAIM_FIX_PR = DRAFT <branch>` |
| 13 | **Fixture-Zustand:** Die Testagentur behält Logo, Rechtsdaten, Kalender und Sheets-Kopie. Aufräumen nur auf Anfrage durch API | API (auf Anfrage) | – |
| 14 | Copy-Frage: Der Hinweistext (Kurzfassung) sagt für Sheets „read the enquiries that arrive there“. Für eine Kopie-Senke passt das inhaltlich nicht. Unverändert aus dem Draft übernommen | Copy | `CONNECT_NOTICE_DRAFT v1.1` |

---

## 5 · Owner-Entscheidungen (mit Empfehlung)

1. **`WEBSITE_BRANCH_PUSH`:** Das Repo ist mit dem Vercel-Projekt `nuovasolution` (`prj_1AXMlF…`) verknüpft (`.vercel/repo.json`). Ein Push des Branches löst sehr wahrscheinlich einen Preview-Build aus. Ohne gesetzte Preview-Variablen baut er im Stub-Modus (sichtbares Band „Solo demostración“, Stub-Konten in `VERCEL_ENV=preview` erlaubt). **Empfehlung: JA**, als private Sicherung und Stub-Preview. Staging-Variablen für die Preview erst nach Punkt 8 in §4.
2. **Owner-Test mit eigener Adresse** (§7): **Empfehlung: JA.** Das ist heute der einzige Weg, den Pfad „neuer Kunde“ ohne Zutun von API echt zu zeigen.
3. **D1 / D2 / `LEGAL_PLACEHOLDER_ROUTES` / `WEBSITE_LIVE_CLAIM_FIX`:** unverändert offen. Empfehlungen wie im Dispatch (D1 14 Tage behalten, D2 ja). In dieser Runde nicht bearbeitet.

---

## 6 · Was jetzt tatsächlich funktioniert (je Kette ein Satz)

- **Login:** Ein Staging-Konto meldet sich über das Formular an und landet auf seiner eigenen Agentur. Die Sitzung liegt nur in einem httpOnly-Cookie.
- **Neuer Kunde:** Sign-up, Bestätigungslink, Registrierung und Einstieg ins Setup sind gebaut und im Stub durchlaufen. Auf Staging scheitert der Sign-up an der Test-Domain, eine Owner-Adresse sollte durchgehen (ungeprüft).
- **Geschäftsdaten, Zeiten, Kalender:** Speichern und nach Reload wieder anzeigen funktioniert gegen Staging.
- **Rechtliche Angaben:** Speichern funktioniert und macht das Readiness-Gate grün. Nach einem Reload zeigt das Formular die Werte nicht wieder, weil der Vertrag keine Leseoperation hat. Das steht so auf der Seite.
- **CRM:** „Kein externes CRM“ ist sichtbar das CRM of record. Google Sheets erscheint als „Elegido, sin conectar“, nie als verbunden, und lässt sich nur nach dem quittierten DRAFT-Hinweis wählen.
- **Branding:** Ein echtes PNG landet im Staging-Bucket und erscheint auf hellem und dunklem Hintergrund. Dunkle Variante, Hell-Panel und Textersatz funktionieren.
- **Readiness und Aktivierung:** Beides kommt direkt aus `tenant_activation_readiness`. „Go live“ meldet ehrlich `blocked`.
- **Rollen und Mandanten:** Agent und fremder Tenant werden bei jedem Schreibversuch abgewiesen. Eine manipulierte `client_id` bleibt wirkungslos.
- **Q&A, DSAR, OAuth, Checkout:** Auf Staging funktioniert keins davon, und die Website behauptet es auch nicht.

---

## 7 · Owner-Test

**Start (auf diesem Rechner):**
```
cd C:\Users\Usuario\Desktop\Nuovasolution
npm run owner:staging
```
Das Skript baut die Staging-Version (ca. 2 Minuten) und startet sie auf `http://localhost:3000`. Den Schlüssel liest es selbst aus dem Secure Store. Sie müssen kein Secret anfassen.

**Konto:** Ihre eigene E-Mail-Adresse (neues Konto). Die Staging-Bestätigungsmail geht standardmäßig nur an Adressen des Supabase-Projektteams.

**Schritte:**
1. `http://localhost:3000/es/signup` öffnen: Name, Agenturname „PRUEBA Owner“, Ihre Adresse und ein Passwort mit mindestens 10 Zeichen eingeben, dann absenden.
2. Die Bestätigungsmail öffnen und auf den Link klicken. Er führt zurück auf `localhost:3000` und dort direkt zu „Crea tu agencia“.
3. „Crear la agencia y continuar“ klicken.
4. In „La configuración de tu agencia“ Zeitzone und Horario speichern, dann ein Logo-PNG hochladen und beide Vorschauen ansehen.
5. Seite neu laden: Die Daten sind noch da, und unter „Qué falta para salir en vivo“ stehen die offenen Gates.

**Erwartet:** das gelbe Band „Entorno de pruebas“ auf jeder Seite. Nach Schritt 2 keine Adresszeile mit `access_token`. Nach Schritt 3 die Trial-Zeile „… días“. Nach Schritt 5 ist „Tu horario“ auf „Hecho“ und das Logo in beiden Vorschauen sichtbar. „Salir en vivo“ bleibt gesperrt.
**Wenn in Schritt 2 keine Mail kommt:** Ihre Adresse ist kein Team-Mitglied. Bitte API um `STG_CONFIRM_REQUEST = <Ihre Adresse>`.
**Vergleichs-Screenshots:** `docs/website_redesign/evidence_2026-09-22/staging/`.
**Aufräumen:** Die Test-Agentur „PRUEBA Owner“ bleibt auf Staging bestehen. Sie wird nur auf Anfrage von API entfernt.
**Überwachender Chat:** diese Implementierer-Sitzung. Rückmeldung bitte mit Schritt-Nummer und Screenshot.
