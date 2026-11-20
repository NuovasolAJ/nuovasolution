# API → Website · Fr 20.11.2026 · Registerabgleich Gruppe C (10 Schlüssel)

**Auftrag (Owner 20.11. 09:05):** RV6 hat 16 Schlüssel gefunden, die auf der Seite als verfügbar erscheinen, im Register (`lib/claims.ts`) aber auf „soon“ stehen (`42bd0ec`, `checks/gate-vs-register-1120.json`). Hier sind die 10 Schlüssel der Gruppe C gegen die Prod-Belege geprüft.

**Regel:** Auf der öffentlichen Seite gilt als verfügbar nur, was für Pilotagenturen in Prod belegt ist.

**Gelesen:** Prod-Datenbank, Fr 20.11. ~08:15Z, nur lesend. Kein Prod-Schritt.

**Ausgangslage in Prod:**
- Es gibt genau eine Pilot-Testagentur, `pilot_test_a`: 1 Mitarbeiterin, 1 Login, aber 0 Kontakte, 0 Leads, 0 Aufgaben.
- Alle laufenden Prod-Belege gehören der eigenen Agentur `nuovasolution`.
- Eine Pilotagentur kann heute kein Postfach verbinden (A12, Prod frühestens Di 24.11.). Deshalb erreicht sie auch kein Kanal, keine Aufgabe und kein Bericht.

## Ergebnis: alle 10 „noch nicht“

| Schlüssel | Urteil | Was Prod heute zeigt |
|---|---|---|
| `mailboxConnection` | **noch nicht** | Das Register `mail_connection` fehlt in Prod ganz. Prod liest genau ein Gmail-Postfach, das der eigenen Agentur. Das Postfach einer Agentur kommt mit A12, Zeilen 1–4 (Register, Annahmeweg, Outlook). Prod frühestens Di 24.11. |
| `oneRecordAcrossChannels` | **noch nicht** | Ein Datensatz je Person über E-Mail, WhatsApp und Telefon ist in Prod nur für `nuovasolution` in Betrieb. `pilot_test_a` hat keinen Kanal und 0 Kontakte. |
| `taskList` | **noch nicht** | Die Aufgabenliste in der Mitarbeiter-App läuft in Prod für `nuovasolution` (Morgenbrief: Verteiler 188254 → Brief 188255 am 17.11.). Der Pilot-Login hat am 16.11. geklappt (Owner). Für `pilot_test_a` gibt es aber 0 Aufgaben, und ohne verbundenes Postfach entsteht keine. Verfügbar erst, wenn A12 in Prod ist und die erste Pilot-Aufgabe eine Lauf-ID hat. |
| `dailyVoice` | **noch nicht** | In Prod gibt es keinen Sprach-Eintrag aus der Mitarbeiter-App: `dg_jarvis_action_log` hat 0 Zeilen. |
| `weeklyEmail` | **noch nicht** | Wochenberichte gehen in Prod nur an die eigene Agentur: 15 zugestellt, zuletzt 16.11. 05:00Z (Bericht `42e74332`). Für eine Pilotagentur gibt es keinen. |
| `reportTrend` | **noch nicht** | Der zugestellte Bericht `42e74332` enthält Kennzahlen der Woche, aber keinen Trend, keinen Kanalvergleich und keine Hinweise. Die erweiterte Stufe ist in Prod leer. |
| `webform` | **noch nicht** | Das Pilot-Formular (`pilot_request`, Edge `pilot-request-intake`) ist nicht in Prod. Ein Webformular als dritter Kanal ist in Prod nicht angebunden. |
| `integrations` | **noch nicht** | Kein Anbieter darf als laufend genannt werden. In Prod hat nur `nuovasolution` Verbindungen: Google Sheets „connected“ seit 02.07., aber **nie synchronisiert** (`last_sync_at` leer). HubSpot, Pipedrive, Salesforce, Zoho und WhatsApp Business sind „revoked“, GoHighLevel „pending“. 2 HubSpot/Pipedrive-Einträge stehen ungelöst in der Warteschlange. Für eine Pilotagentur gibt es keine Verbindung. |
| `outlook` | **noch nicht** | Prod liest kein Outlook-Postfach einer Agentur. Der Weg ist auf Staging belegt (echte Antwort über Postfach B, Lauf 326803, 19.11.). Prod kommt mit A12, Zeile 4. |
| `model3d` | **noch nicht** | In Prod gibt es keinen 3D-Auftrag und keine Tabelle dafür. T6 ist nicht abgenommen, T7 Teil B hat der Owner am 16.11. abgelehnt. Die API-Fragen auf Staging sind noch offen. |

## Was daraus für die Seite folgt

- Alle zehn Schlüssel gehören auf „soon“, bis je Schlüssel eine Prod-Lauf-ID für eine Pilotagentur vorliegt.
- Die Zielansicht des Owners (fertiges Produkt) bleibt der Entwurf. Live geschaltet wird die Seite ohnehin erst nach A12-Prod (Owner).
- **Erster möglicher Wechsel auf verfügbar**, nach A12-Prod Di 24.11. und dem ersten echten Pilot-Lauf:
  - `mailboxConnection`, `outlook`, `oneRecordAcrossChannels`, `taskList`;
  - `weeklyEmail`, sobald der erste Bericht an eine Pilotagentur zugestellt ist.
- **Ohne Termin:** `integrations` (kein Anbieter mit Prod-Beleg), `reportTrend`, `dailyVoice`, `webform` (Formular in Prod offen), `model3d`.
