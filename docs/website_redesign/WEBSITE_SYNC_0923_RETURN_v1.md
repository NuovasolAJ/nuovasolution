# WEBSITE SYNC_0923 — Rückgabe Website-Implementierer v1 (Gestaltungsprobe, Registrierung, Q&A, Hotfix alte Seite)

**Lane:** Website-Implementierer (Website-Code inkl. serverseitiger BFF-Routen) · **Stand:** 2026-09-23
**Branch:** `website_enterprise_redesign` · **Code-Stand:** `e39ad06` (nicht gepusht) · **Auftrag:** `STATE = 2026-09-23_CONTINUATION` (Fortsetzungsauftrag Website)
**Status:** Implementiert, wartet auf unabhängige technische Abnahme, Owner-Sichtprüfung der Gestaltungsprobe und Owner-Test. Nichts hier ist „fertig“ oder „produktionsreif“.

Commits dieser Runde (nur eigene Pfade, `git commit -F msg -- <Pfade>`):

| Commit | Branch | Inhalt |
|---|---|---|
| `e39ad06` | `website_enterprise_redesign` | Helles Design-System, Home nach C3, Pläne aus dem Staging-Katalog, Q&A-Fenster integriert, Auth nach AUTH_COPY_v1 inkl. WR-35, Harnesse, Evidenz |
| *(dieser Record)* | `website_enterprise_redesign` | Rückgabe, WR-34 Qualifier auf den Produktseiten, Staging-E2E-Ergebnis |
| `82112df` | `hotfix/old-site-copy-v2` (Worktree `..\nuova-oldsite-hotfix`, Basis `main@9943660`) | Copy-Hotfix v2 der alten Live-Seite, Text und die vier Nicht-Text-Punkte; nicht deployt |

Seit `175cf74` liegen zwei fremde Commits auf dem Branch (`24b97c9` Copy, `9a3c69a` Reviewer). Beide wurden gelesen und übernommen (C3-Texte, AUTH_COPY, Hotfix v2, WR-35/36), nicht geändert.

---

## 1 · Signale

```
WEBSITE_DESIGN_PROBE              = READY e39ad06 2026-09-23
                                    URL (statischer Schnappschuss, privat für den Owner):
                                    https://claude.ai/artifact/YW7x1Lt1VyxJto9N3BkVFj
                                    lokal identisch: npm run build && npm start → http://localhost:3000/es
                                    Vercel-Preview erst nach Push-Freigabe (§5)
DESIGN_PROBE_TECH_CHECK (eigen)   = 78/78 e39ad06 (1440/1024/390/360 CSS-px, EN/ES, Menü und Q&A offen, Scroll, 200 %, reduced-motion, Tastatur)
WEBSITE_STUB_E2E                  = PASS e39ad06 (58/58)
WEBSITE_STAGING_E2E               = PASS e39ad06+ 2026-09-23 (27/27; Staging-Build im hellen System, Testagentur + Agent + zweiter Tenant)
WEBSITE_REGISTRATION_PATH_READY   = e39ad06 (redirect_to je Build-Origin; Allowlist STG_AUTH_REDIRECTS bleibt API)
OWNER_REGISTRATION_RESUME         = NOT_RUN (Owner-Aktion, Pfad §7; Konto weder gelöscht noch neu registriert)
NEW_IDENTITY_REGISTRATION_E2E     = BLOCKED (keine zustellbare Testadresse; Test-Domain wird von Staging-GoTrue abgelehnt, s. 0922)
WEBSITE_QA_STAGING                = FAIL 2026-09-23 (Transport 6/9: 202 + signierter Poll ok; keine Antwort in 240 s = Reviewer WR-36, Hosting/Lead)
CHECKOUT_TEST_PATH                = NOT_APPLICABLE (kein Checkout-Vertrag; Rechnung/Überweisung ehrlich dargestellt; automatischer Checkout = fehlende Integration, API)
WEBSITE_REDESIGN_ROLLOUT          = PARTIAL e39ad06 (Home, Pläne, Plattform, Produktseiten, Auth, Prueba, Contacto im hellen System; Onboarding erbt nur die Tokens; Vollrollout nach Designfreigabe)
WEBSITE_LIVE_CLAIM_FIX            = READY_NOT_DEPLOYED 82112df (Branch hotfix/old-site-copy-v2; Deploy = Owner)
WEBSITE_BRANCH_PUSH               = NOT_DONE (Owner-Freigabe fehlt)
WEBSITE_BFF_SECRET_KEY            = NONE (unverändert seit 6fbe45f; Runtime verweigert jeden Secret-/Legacy-Key)
```

---

## 2 · Kette × sieben Nachweisstufen

Stufen: (1) implementiert · (2) lokal/isoliert geprüft · (3) integriert Staging · (4) echter externer Provider · (5) in Prod verifiziert · (6) vom Owner sichtbar getestet · (7) unabhängig abgenommen.

| Kette | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| Gestaltungsprobe (Header + Menü, Hero, Kartenstapel, Produktansichten, Pläne, Q&A offen) | ja | **ja** (78/78, 116 Screens) | n/a | n/a | nein | **offen** (URL §1) | offen |
| Registrierung: Sign-up → Mail → Login → Agentur anlegen | ja (WR-35 behoben) | ja (Stub B10, 58/58) | teilweise: Sign-up erreicht GoTrue; Allowlist des Redirects fehlt (API) | Mailzustellung nicht erreicht | nein | offen (§7) | offen |
| Bestätigtes Konto ohne Sitzung → Login → Resume → Agentur genau einmal | ja | ja (Stub) | ja für Identitäten mit Agentur (Staging-E2E); ohne Agentur nur mit dem Owner-Konto möglich | n/a | nein | **offen: Owner** | offen |
| „Demasiados intentos“ (429) | ja: GoTrue-Codes getrennt, kein erfundener Zeitraum, Doppelrequest-Sperre, Eingaben erhalten | ja | nicht reproduzierbar ohne Limit-Auslösung; Code-Logging serverseitig ohne PII | n/a | nein | offen | offen |
| Sprache: UI ≠ Konto ≠ Kundenkonversation | ja (Signup „Idioma de tu cuenta“, Register „Idioma principal con tus clientes“ mit Erklärung, Entwurf bleibt beim EN/ES-Wechsel) | ja | n/a | n/a | nein | offen | offen |
| Website-Q&A gegen echten Staging-Pfad | ja | ja (Vertragsmock) | **teilweise**: Annahme 202 + signierter Poll ja, Antwort nein (WR-36) | n/a (Mock-LLM) | nein | offen | offen |
| Pläne aus Katalog, Zahlungsweg ehrlich | ja (Inhalte/Limits aus billing_plan v1, kein Betrag) | ja | Katalog transkribiert, nicht zur Laufzeit gelesen (kein Vertrag) | n/a | nein | offen | offen |
| Alte Live-Seite Hotfix v2 | ja (82112df, Build ok, 0 verbotene Strings im gerenderten HTML) | ja | n/a | n/a | **nein: nicht deployt** | offen | offen |
| Login, Onboarding, Branding, CRM, Readiness (aus 0922) | ja | ja | **ja** (Wiederholung 2026-09-23: 27/27 im hellen Staging-Build) | n/a | nein | offen | offen |

Nicht anwendbar: Stufe 3 bis 5 für die reine Gestaltung; Stufe 5 für Registrierung, weil `tenant-api` nur auf Staging existiert.

---

## 3 · Belege

| Was | Wo |
|---|---|
| Probe-Screens (116) und Messungen | `docs/website_redesign/design_probe_2026-09-23/*.png`, `probe-results.json` (78/78) |
| Statischer Schnappschuss (16 Seiten ES/EN) | `docs/website_redesign/design_probe_2026-09-23/static/`, veröffentlicht als Artifact (§1) |
| Referenz-Betrachtung (fora, heylemon, 21st, godly, awwwards; 1440 + 390, gescrollt) | `docs/website_redesign/design_probe_2026-09-23/references/*.png` (nur zum Vergleich, nichts übernommen) |
| Stub-E2E 58/58 | `docs/website_redesign/evidence_2026-09-23/e2e-results.json` |
| Q&A Staging 6/9 | `docs/website_redesign/evidence_2026-09-23/qa-staging-results.json` (Tenant `stg_pm_nerjamar`, Endpunkt `167-235-150-163.sslip.io`, 70 Polls über 240 s, Endzustand keiner) |
| Staging-E2E (Wiederholung auf e39ad06+) | `docs/website_redesign/evidence_2026-09-23/staging/staging-e2e-results.json` |
| Hotfix alte Seite | Branch `hotfix/old-site-copy-v2` `82112df`; Diff `docs/website_redesign/OLD_SITE_HOTFIX_v2_9943660.patch`; Build und `tsc` grün; gerendertes HTML 0 Treffer der Abnahmestrings; im JS nur `/100` als Arithmetik (`score/100` im Bogen-Mathe), keine Anzeige |
| Harnesse | `scripts/design/probe-capture.mjs`, `scripts/design/probe-export.mjs`, `scripts/design/reference-capture.mjs`, `scripts/e2e/qa-staging.mjs` |

Ziel war ausschließlich Staging `fflmmzapksycjfdcjdtd` und der Staging-Q&A-Endpunkt von Hosting. Kein Prod-Aufruf, kein Push, kein Deploy. Keine Schlüssel in Repo, Chat, Logs oder Screens.

### Gestaltungsnotizen (Auftrag A.1): beobachtetes Prinzip → eigene Umsetzung

| Referenz | Beobachtet (im Browser, Desktop und 390 px) | Eigene NuovaSolution-Umsetzung |
|---|---|---|
| fora.so | Getrennte visuelle Ebenen: Atmosphäre hinten, große Produktfläche vorne, Tab-Leiste wechselt Produktansichten; abgerundete große Paneele; Chat-Blase unten rechts | Hero mit drei gestaffelten, echten Karten (Anfrage → Antwort → Kundenfiche) auf einem pastellfarbenen Feld; fünf Stufen als gestapelte, haftende Karten mit je einer echten Produktansicht; Fragen-Launcher unten rechts, Fenster zusätzlich in die Seite eingebettet |
| heylemon.ai | Helles, warmes Off-White; Hero in einer großen abgerundeten Pastellfläche; Pill-Buttons; dunkles „Du sagst“-Kärtchen neben hellem Produktkärtchen als bewusster Kontrast; kleine Eyebrows | Warmes Weiß `#fbfaf7` als Grund, Pastellfelder Sage/Sand/Sky/Apricot/Lavender je Stufe, Pill-Buttons in Tinte, ein einziges dunkles Element (der Footer als „Fundament“), Gold nur als Akzentpunkt |
| 21st.dev | Farbige Hintergrundkarten, die je eine Produktfläche mit versetzten Kärtchen tragen; 3er-Raster | Die rechte Hälfte jeder Stufenkarte ist ein farbiges Feld mit der Produktansicht; Preiskarten als 3er-Raster mit gleichen Kanten |
| godly / awwwards | Filter-Pills, Kartenraster, sonst Galerien ohne Übertrag | Kapazitäten-Index als Kartenraster mit Status-Chip statt Hairline-Liste |
| Pricing-Klarheit (Claude/OpenAI/Fora) | Drei vergleichbare Karten, eine hervorgehoben, Limits als Liste, klarer CTA je Karte | Drei Katalog-Karten (Essential/Growth/Scale) mit Limits und Inhalten, Growth hervorgehoben, „Precio para tu agencia“ statt Betrag, CTA Prueba + Propuesta, Zahlweg in vier Schritten |

Nicht übernommen: Marken, Bilder, Texte, Seitenabfolgen, komplette Layouts.

Owner-Befunde (A.3): Plattform-Menü ohne Überlappung (Chips unter dem Namen, gemessen 0 Überschneidungen); keine Audit-/Gate-Sätze in der Navigation (C3 §1.2/1.3); Testband im Fluss unter dem Header, keine Überschrift darunter (gemessen); keine „Capture pending“-Kästen (gemessen 0 Treffer); kein Text-neben-Leerfläche-Muster (jede Sektion hat rechts Karte, Liste oder Ansicht); Q&A als integriertes Fenster mit Überschrift, Hinweisen, Vorschlagsfragen und allen Zuständen; Pricing mit vergleichbaren Karten und wirksamem Weg (Prueba → Propuesta → Factura → Plan activo); hell/dunkel nur als System (ein dunkles Fundament).

---

## 4 · Offene Punkte, Executor, Schlusssignal

| # | Offen | Executor | Schlusssignal |
|---|---|---|---|
| 1 | Redirect-Allowlist für den Website-Origin (localhost:3000 und die künftige Preview/Staging-Adresse) | API | `STG_AUTH_REDIRECTS` |
| 2 | Eine zustellbare Testadresse oder Test-Domain für einen kompletten neuen Signup | API | `WEBSITE_TEST_IDENTITY = READY` |
| 3 | „Demasiados intentos“: welcher GoTrue-Code am 2026-09-22 15:10Z fiel; Website loggt ab jetzt `[gotrue] 429 at signup: <error_code>` ohne PII | API (GoTrue-Log) | `SIGNUP_RATE_LIMIT_RCA` |
| 4 | Resend-Endpunkt: die Website nutzt das Standard-GoTrue `/auth/v1/resend type=signup`; Bestätigung, dass Staging es erlaubt, und sein Limit | API | Resend-Vertrag in `WEBSITE_HANDOFF_v3` |
| 5 | Q&A: Annahme und Poll ok, keine Antwort (WR-36); dazu ein HMAC-Secret für die Website-Testagentur statt des PM-Fixture-Tenants | Hosting/Lead, API | `WEBSITE_QA_STAGING = PASS <utc>`, `WEB_QA_HMAC_stg_web_e2e_agency_a1b523` |
| 6 | Handoff v3: Rechtsangaben lesen (WEB-API-1), CIF/URL-Codes (WEB-API-2), Sheets abschalten (WEB-API-3), dauerhafte Quittung (WEB-API-5), Team-Einladung (WEB-API-6), Plan-Vokabular | API | `WEBSITE_HANDOFF_v3` |
| 7 | Preise, Intervall, Steuerbasis | Owner/Billing | `PRICING_AUTHORITY` |
| 8 | WR-32 (Start-free-CTA an tatsächliche Freigabe koppeln) und WR-14-Rest („Skip for now“ sichtbare Änderung) | Website | nächste Runde |
| 9 | Vollrollout des hellen Systems auf Onboarding-Komponenten (Setup, Wizard, CRM-Wahl) nach Designfreigabe | Website | `WEBSITE_REDESIGN_ROLLOUT = COMPLETE` |
| 10 | Alte Seite: Deploy des Hotfix-Branches im autorisierten Umfang | Owner → Website | `WEBSITE_LIVE_CLAIM_FIX = DEPLOYED`, dann Reviewer `LIVE_HOTFIX_VERIFIED` |
| 11 | Meta-Rechtsseiten als gekennzeichnete Entwürfe; Social-UI mit Social | Website (mit Copy/Counsel), Social | nächste Runde |
| 12 | Echte Safari-Prüfung (alle Screens sind Chromium-Emulation) | Owner (iPhone) | Owner-Rückmeldung |
| 13 | 3D-Demohaus: keine Assets vorhanden | Multimodal/PM | Assets |

---

## 5 · Owner-Entscheidungen (mit Empfehlung)

1. **Designfreigabe der Probe** (URL §1). Empfehlung: die Richtung freigeben oder konkret benennen, was anders soll; danach Vollrollout auf Onboarding und alle Restseiten.
2. **Branch-Push für eine Vercel-Preview** (`WEBSITE_BRANCH_PUSH`). Das Repo ist mit dem Vercel-Projekt verknüpft; ein Push baut sehr wahrscheinlich eine Preview im Demo-Modus, die auf dem Handy erreichbar ist. Empfehlung: **ja**. Erst danach ergibt eine HTTPS-Staging-Adresse mit Redirect-Allowlist Sinn.
3. **Owner-Fortsetzung des bestätigten Kontos** (§7). Empfehlung: **ja, jetzt lokal**; auf dem Handy erst nach Punkt 2.
4. **Deploy des Hotfix-Branches der alten Seite** (`WEBSITE_LIVE_CLAIM_FIX`). Empfehlung: **ja**; die Live-Seite trägt seit vier Monaten abgelehnte Aussagen. Umfang: nur `hotfix/old-site-copy-v2` auf `main`, keine Redesign-Dateien.

---

## 6 · Was jetzt tatsächlich funktioniert

- **Gestaltungsprobe:** Header mit hellem Menü ohne Überlappung, Hero mit eigener Aussage (drei gestaffelte Karten aus echten Fähigkeiten), fünf gestapelte Stufenkarten mit echten Ansichten (WhatsApp-Konversation, Kundenfiche, Readiness der eigenen Onboarding-Seite, Daily-Assistentin) und ehrlichen Status-Karten, Pläne-Seite mit drei vergleichbaren Katalogkarten und dem echten Zahlweg, integriertes Fragen-Fenster mit allen Zuständen. Alles in EN und ES, 360 bis 1440 px, 200 % Zoom, ohne Animation lesbar, per Tastatur bedienbar.
- **Registrierung:** Sign-up schickt den Bestätigungslink an die Login-Seite des eigenen Origins in der gewählten Sprache; die Bestätigungsseite nennt die vertragliche Stunde, den Weg über ein anderes Gerät und „keine Mail“; ein bestätigtes Konto wird nie zurück zum Sign-up geschickt, sondern zum Login und von dort zum Schritt „Pon nombre a tu agencia“; 429 zeigt den ehrlichen Grund ohne erfundene Minuten; Doppelklicks senden keinen zweiten Request; der Sprachwechsel im Header behält die Formulareingaben.
- **Q&A:** die Website spricht den echten Staging-Endpunkt an, signiert korrekt, hält Sitzung und Tenant serverseitig, weist fremde Sitzungen, fehlende Cookies und Cross-Origin ab. Antworten kommen heute keine (Backend, WR-36).
- **Alte Seite:** Hotfix-Branch baut, alle 13 Reviewer-Claims und 10 Literale sind aus dem gerenderten HTML verschwunden; Score-Zahl, Push-Chrome, tote `href="#"` und Portal-/Formular-Behauptungen sind weg.

---

## 7 · Owner-Test

**A) Die Probe ansehen (2 Minuten):** die URL aus §1 auf Desktop und Handy öffnen (privat, nur der Owner). Menü „Plataforma“ öffnen, nach unten scrollen (Kartenstapel), „Paquetes“ öffnen, unten das Fragen-Fenster ansehen. Formulare und Fragen sind im Schnappschuss nicht verbunden.

**B) Das bestätigte Konto fortsetzen (5 Minuten, lokal am PC):**
1. `npm run owner:staging` im Projektordner; etwa 2 Minuten.
2. `http://localhost:3000/es/login?confirmed=1` öffnen. Mit der Adresse und dem Passwort vom 22.09. anmelden.
3. Erwartet: die Seite „Configura tu agencia“ zeigt „Pon nombre a tu agencia“. Namen prüfen, Sprache und Zeitzone lassen, „Crear agencia y continuar“.
4. Erwartet: die Einrichtung mit Trial-Zeile „14 días“ und gelbem Band „Entorno de pruebas“. Seite neu laden: alles bleibt.
5. Rückmeldung in diesem Chat mit Schrittnummer und Screenshot. Kommt bei Schritt 2 „Confirma primero tu email“, den Knopf „Enviar un enlace nuevo“ drücken und melden, ob eine Mail ankommt.

Das Konto wird dabei genau einmal zur Agentur; ein zweiter Versuch antwortet „Tu agencia ya existe“.
