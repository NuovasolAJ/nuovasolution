# API → Audit, Copy, Redesign · Thema 16 · Paketunterschiede, Anfragewege, D10-Belege · Mo 23.11.2026

**Auftrag Owner (20.11. + 23.11.):**
1. belegbare Paketunterschiede, besonders Enterprise;
2. Formularziel und Bestätigung für Essential-Test, Growth-Demo und Enterprise-Gespräch, mit Stand und Termin des Prod-Nachweises (A12-Zeile 14);
3. D10: Registerbeleg für `listingLink`, getrennte Prod-Belege für die Erinnerung nach 1 h und die Eskalation nach 2 h, je mit Lauf-ID und Uhrzeit.

**Gelesen 23.11. ~08:20Z,** Prod und Staging nur lesend, Ziel-n8n geprüft (`n8n_target_guard` PASS). Kein Versand.

---

## 1 · Paketunterschiede: was die Daten belegen

**Wichtig für Audit:** In **Prod gibt es keine Paketzeilen**. Die Tabellen `billing_plan` und `billing_subscription` fehlen, und es gilt keine Grenze. Jeder Unterschied unten ist **Staging-Daten**. Wo er durchgesetzt wird, steht ein Staging-Beleg dabei. Ein Prod-Beleg kommt erst mit dem Abrechnungskern (Thema 23).

In der Datenbank heißt **Enterprise `scale`**. Die Website bildet das schon ab (`?plan=scale` → Enterprise, `contact/page.tsx:35`).

### 1.1 Zahlen je Paket (`billing_plan.limits`, Staging)

| | Essential | Growth | Enterprise (`scale`) | durchgesetzt? |
|---|---|---|---|---|
| Personen (`employees` / `seats`) | 3 | 8 | **50** | **ja**, Trigger `trg_plan_limit_employees` / `_seats`; Probe 10/10 `stg_plan_limits_probe_mwp3zlfq`, echte Anmeldung 4/4 `stg_plan_limits_real_mwozgybr` |
| CRM-Anbindungen | 1 | 3 | **10** | **ja**, `trg_plan_limit_crm`, dieselben Proben |
| Postfächer | 1 | ohne Zahl | ohne Zahl | ja für 1 (`trg_plan_limit_mailboxes`); Growth/Enterprise unbegrenzt |
| Anfragen je Monat | 750 | 3.000 | **ohne Grenze** | **nur gezählt**: `plan_lead_admit` meldet „voll“, der Main-Teil (Aufgabe statt KI-Antwort) fehlt (Lead) |
| Büros (`offices`) | 1 | 1 | **5** | **nein**. Nur `agency_onboarding_resolved` liest die Zahl, kein Wächter |
| 3D-Touren | 0 | 3 | 25 | nicht geprüft (3D „soon“) |
| Telefonminuten | 0 | 0 | 1.000 | nicht geprüft (Telefon „soon“) |

### 1.2 Funktionen je Paket (`billing_plan.entitlements`, Staging)

Nur in Growth und Enterprise an: `assistant`, `daily.goals`, `channel.voice`, `followup.advanced`, `lead.engine.orchestrate`, `paid.acquisition`, `px.*`, `reporting.advanced`, `social.publish`.
**Nur in Enterprise an:** `feed.structured` (strukturierte Objekt-Feeds, Gate `billing_gated_feed`).

### 1.3 Antworten auf Copys A-1 bis A-3 und die dritte Enterprise-Unterscheidung

| # | Frage | Daten (Staging) | Urteil |
|---|---|---|---|
| A-1 | `followup` ab Growth? | `followup.basic` ist **auch in Essential an**; `followup.advanced` erst ab Growth | Das Register (ab Growth, „soon“) ist bindend. Die Essential-Zeile weicht ab → **Audit: offen**. Vorschlag: `followup.basic` in Essential auf Staging aus (Datenzeile, nur mit Owner-Ja) |
| A-2 | Telefon ab Growth oder nur Enterprise? | `channel.voice` ist in Growth **und** Enterprise an, aber Growth hat **0 Minuten**, Enterprise 1.000 | Praktisch nur Enterprise. Die Zeile ist widersprüchlich → **Audit: offen**. `phoneAssistant` ist ohnehin „soon“, also auf keine Karte |
| A-3 | „Varias oficinas“? | `offices` 1 / 1 / **5**, Tabelle `offices` vorhanden (Staging und Prod), aber **kein Wächter** und kein Registerschlüssel | **Nicht belegt** als Funktion. Als Unterschied nur nennbar, wenn es einen Schlüssel und eine Probe gibt → **Audit: offen** |
| Enterprise 2 | „Clientes nuevos desde tus redes sociales“ (`instagram`) | `social.publish` ist **auch in Growth an**; `planRows` sagt nur Enterprise | Daten und Register widersprechen sich, und `instagram` ist „soon“ → **nicht nennen**. **Audit: offen** |
| Enterprise 3 | (API) | Belegbar und durchgesetzt sind **bis 50 Personen** und **bis 10 CRM-Anbindungen**. **Keine Monatsgrenze für Anfragen** steht nur in den Daten | Empfehlung für Copy: „Hasta 50 personas en la cuenta.“ / „Up to 50 people on the account.“ Belegt ist das nur auf Staging, also erst öffentlich, wenn der Abrechnungskern in Prod ist |

**Folge für die Karten:**
- Was heute **durchgesetzt** wird, sind die Zahlen: Personen 3 / 8 / 50 und CRM 1 / 3 / 10, nur Staging.
- Copys Growth-Unterschiede (`taskList`, `matching`, `followup`) sind im Register alle **„soon“**. Dazu ist `property.matching` in den Daten **auch in Essential an**.
- Belegbar sind sie also nicht, solange das Register sie nicht freigibt. Ob sie mit „Próximamente“ auf der Karte stehen, entscheiden Copy und Owner. Meine Zeile dazu: keine.

## 2 · Anfragewege bis zur Bestätigung

**Heutiger Weg (Website-Code):** Formular → BFF `/api/pilot-request` → `NUOVA_PILOT_INTAKE_URL` (Edge `pilot-request-intake`) → Tabelle `pilot_request` + **eine Aufgabe für `nuovasolution`** in der Mitarbeiter-App.

### 2.1 Je Paket

| Paket | Linkziel | Vorbelegung | Bestätigung am Bildschirm (Copy batch 1 §3.4) | Eingang beim Owner |
|---|---|---|---|---|
| Essential | `/{es,en}/contact?plan=essential&interes=trial` (solange keine Selbst-Anmeldung, Owner „kein Selbst-Start“; Copy Q-1 „auf Anfrage“) | `interest = trial`, Betreff „Prueba Essential“ | „Gracias. Una persona del equipo te escribe en 24 h laborables para activar tu prueba de Essential.“ | Aufgabe „Solicitud de prueba Essential“ in der App von `nuovasolution` |
| Growth | `/{es,en}/contact?plan=growth` | `interest = demo`, Betreff „Solicita una demo de Growth“ | „Gracias. … para acordar el día de la demo.“ | Aufgabe „Solicitud de demo Growth“ |
| Enterprise | `/{es,en}/contact?plan=enterprise` | `interest = talk`, Betreff „Hablemos de Enterprise“ | „Gracias. … para acordar la conversación.“ | Aufgabe „Conversación Enterprise“ |

**Aktivierung des Essential-Tests** (nach der Anfrage, durch uns):
- `pilot_agency_onboard`: Mandant, Fristzeile, Feiertage, Register. ONBOARDING_A_v2 66f78d0c, Staging 10/10, Lebenslauf 9/9.
- dann Admin und Mitarbeiter, dann Start über 14 Tage.

### 2.2 Befunde

- **F-a (API, auf Staging behoben 23.11. 08:05Z):** Der Eingang v1 kannte nur `pilot | model3d | other`. Die Website schickt `trial | demo | talk | contract`, also wurde **eine Demo- oder Gesprächsanfrage still als „pilot“ gespeichert**.
  - Neu ist `PILOT_REQUEST_INTAKE_v2` (n8n-Repo, md5 68b260b4): Er speichert den Weg so, wie die Website ihn schickt, ein unbekannter Wert wird `other`, und jeder Weg bekommt einen eigenen Aufgabentitel.
  - Probe 8/8 (zurückgerollt). Auf Staging je Weg ein echter HTTP-Aufruf über die Edge, 6/6, dann gelöscht:
    - trial: Anfrage 8c9851be, Aufgabe 87463cfd „Solicitud de prueba Essential“ (08:05:08Z);
    - demo: 802fe3ec, 633a0ee8 „Solicitud de demo Growth“ (08:05:09Z);
    - talk: 1451f4c3, f1aca791 „Conversación Enterprise“ (08:05:09Z).
  - 0 Lead-Zeilen.
- **F-e (Redesign, eine Zeile):** Das Formular schickt `consent: true`, aber der BFF `app/api/pilot-request/route.ts` **lässt `consent` beim Weiterleiten weg**. Der Eingang verlangt es und weist mit `missing_fields` ab, die Edge antwortet 422, der BFF 502. Mit gesetzter Umgebung würde **jede** echte Anfrage scheitern. Bitte `consent: b.consent === true` (und `web`) in die weitergeleitete Nutzlast aufnehmen.
- **F-b (Redesign):** Fehlen `NUOVA_PILOT_INTAKE_URL`/`_TOKEN`, antwortet der BFF mit `ok: true, delivery: "simulated"`. Der Besucher sieht „Gracias“, aber **nichts kommt an**. Für einen Prod-Build bitte stattdessen einen Fehler zeigen; „simulated“ nur in der Vorschau.
- **F-c (Owner-Entscheidung):** **Eine Bestätigungs-Mail an den Interessenten gibt es nicht.** Am 16.11. gewollt („keine Mail an niemanden“); heute gibt es nur die Bestätigung am Bildschirm.
  - Soll eine Mail dazu, braucht es den Absender `no-reply@nuovasolution.com` (Prod-SMTP vorhanden), Copys Text und eine Owner-Zeile.
  - Getestet wird nur an ein Testkonto (KUNDE_OUTLOOK), nie an echte Kunden.
- **F-d:** „Eingang beim Owner“ ist **die Aufgabe in der App**, keine Mail an antonio@. Prod liest dieses Postfach, eine Mail dorthin würde ein Lead.

### 2.3 Prod-Stand und Termin (A12-Zeile 14)

- **Heute in Prod: nichts.** `pilot_request`, `pilot_request_intake` und die Edge `pilot-request-intake` fehlen (gelesen 20.11., unverändert). Den Termin Mi 18.11. habe ich verpasst (Signal 720fcefe).
- **Vorschlag:** **Di 24.11. 11:00 Madrid**, nach dem Löschlauf (09:30), nicht am V3-Tag, mit Owner-Zeile `PILOT-FORMULAR-PROD` (v2):
  1. SQL über den Broker;
  2. Edge mit eigenem Prod-Schlüssel (Tresor);
  3. je Weg (trial, demo, talk) ein echter HTTP-Test mit einer Testadresse: Zeile + Aufgabe in Prod mit ID, Uhrzeit, Bildschirm-Bestätigung;
  4. sofort `pilot_request_erase`.
- Die Website bleibt bis nach A12 aus (Owner).

## 3 · D10: Belege in Prod

### 3.1 `listingLink`: der Assistent liest den Anzeigenlink eines Kunden

| Ereignis | Lauf-ID | Workflow | Zeit (UTC) |
|---|---|---|---|
| Kundenmail mit Anzeigenlink, Main erkennt den Link | **175669** | `RgX0O6sbKvXbvZsB` NuovaSolution_Main_Production_v1 | 13.11. 13:58:47 → 14:00:23 |
| Inserat gelesen (Firecrawl v2) | **175671** | `ICFYPWse2XBKE3u9` NuovaSolution_PropertyEnricher_v1 | 13.11. 13:59:14 → 13:59:36 |

Quelle: PM cfaa6217 (13.11.: „Firecrawl v2 first prod run green, 200/complete, availability kept unknown“). Die Läufe habe ich heute in Prod-n8n gelesen: beide `success`. Absender war ein Testkonto des Owners. **Register-Urteil: `listingLink` = included bestätigt.**

### 3.2 `reminders`: Erinnerung nach 1 h, Eskalation nach 2 h, getrennt belegt

Aufgabe **17d9b48b** (`nuovasolution`, angelegt von Main-Lauf **194988** am 19.11. 08:03:19Z, Testmail des Owners). Workflow **`U2fC7JWa74ARPFS9` NuovaSolution_E19_Scheduler_v1**; Zeitpunkte aus `dg_task.payload.e19`:

| Ereignis | Lauf-ID | Lauf (UTC) | geplant | ausgeführt | Mail-ID vorhanden |
|---|---|---|---|---|---|
| Benachrichtigung | **194996** | 08:05:11 → 08:05:14 | 08:03:19 | 08:05:14 | ja (`notified_message_id`) |
| **Erinnerung nach 1 h** | **195149** | 09:05:11 → 09:05:14 | 09:03:19 | **09:05:14** | ja (`reminded_message_id`) |
| **Eskalation nach 2 h** | **195288** | 10:05:11 → 10:05:14 | 10:03:19 | **10:05:14** | ja (`escalated_message_id`, `owner_mail_at`) |

- Jeder Lauf enthält die Aufgabe (in den Laufdaten gelesen).
- Der Takt läuft alle 5 Minuten, deshalb liegen die Ausführungen bis zu 2 Minuten nach dem Plan.
- Die Eskalation ging an den Inhaber (`owner_mail_at`), weil die Agentur nur eine aktive Person hat (`escalated_to_employee_id` leer).
- Dieselbe Kette steht an fünf weiteren Testaufgaben vom 19.11.:
  - 51d997bc: erinnert 09:15:13, eskaliert 10:15:14;
  - 2ddb9666: 09:30:14 / 10:30:15;
  - 6293291b: 09:35:14 / 10:35:13;
  - 3e01eb2b: 09:45:13 / 10:45:13;
  - 17.11. 4128890e: 16:00:14 / 17:00:13; f1458889: 16:05:14 / 17:05:14.
- Alle Testaufgaben sind seit 20.11. 12:01Z geschlossen (Lead TESTTASKS_1120, Owner-Zeile).

**Register-Urteil: `reminders` = included bestätigt**, mit den Lauf-IDs oben.

---

**Offen für Audit:** A-1, A-2, A-3, `instagram`/`social.publish` (§1.3) und der Prod-Beleg aller Paketzahlen (kein Abrechnungskern in Prod). **Für den Owner:** F-c (Bestätigungs-Mail ja/nein) und die Zeile `PILOT-FORMULAR-PROD` für Di 24.11. 11:00.
