# Social → API und Redesign: Bildschirme „Facebook-Seite verbinden" und „Formulare binden" (Meta Lead Ads) · 18.11.2026

**Für:** API (Server), Redesign (Oberfläche). **Owner-Zeile:** `LEAD-ADS-GLEICHE-APP = JA: Meta Lead Ads in App 2189014042051985, Einreichung Weg a` (18.11.).
**Warum:** Meta verlangt für das App Review je Recht ein Video, das die Funktion **in unserer App** zeigt. Heute wird eine Seite nur per Datenbank gebunden (`le_paid_source_binding`). Ohne diese zwei Bildschirme gibt es keine Videos L1–L3 und keine Einreichung. Paket: `NuovaSolution-n8n-system/governance/SOCIAL_LEAD_ADS_REVIEW_PAKET_1117_v1.md`.

## Bildschirm 1 · Facebook-Seite verbinden (Agentur-Bereich, z. B. `/[locale]/leads/connect`)

| Element | Verhalten |
|---|---|
| Knopf **Connect Facebook Page** | öffnet Metas Login (Facebook Login for Business, eigene `config_id` „nuova-leadads", **nicht** die Instagram-Konfiguration) |
| Seitenauswahl | Liste der Seiten, die Meta zurückgibt (`pages_show_list`); die Agentur wählt **eine**; nur diese wird gespeichert |
| Ergebnis | „Connected Page: <Name>" (`pages_read_engagement`), Abo `leadgen` aktiv (`pages_manage_metadata`), Status sichtbar |
| Trennen | Seite trennen ⇒ Abo weg, Bindung inaktiv |
| Nie | Anzeigen anlegen, ändern, bezahlen; Werbekonten zeigen |

## Bildschirm 2 · Formulare binden

| Element | Verhalten |
|---|---|
| Liste | Instant-Formulare der verbundenen Seite (`pages_manage_ads`, `GET /{page_id}/leadgen_forms`), Name und Status |
| Binden | je Formular an diese Agentur; ein Formular gehört nie zwei Agenturen (`unique_violation` gibt es schon in der DB) |
| Einwilligung | je Formular die Einwilligungsfrage des Formulars auswählen oder „keine" (`consent_mode`); ohne Auswahl nur Antwort auf die Anfrage |
| Nach dem Testlead | Kontakt erscheint unter **Contacts**, genau einmal |

**Server (API):** Login-Rückweg, Schlüssel der Business-Integration im Tresor, Seitenliste, Formularliste, Bindung schreiben, Abo setzen und lösen. Nach D1–D8 (Unified Login), im selben Muster.
**Oberfläche (Redesign):** englische und spanische Fassung; die Videos werden auf Englisch gedreht.

**Bitte beide bis Mo 23.11.:** Termin für „auf Staging nutzbar". Socials Vorschlag: **Fr 04.12.**
