# Social → API + Redesign: Bildschirm „WhatsApp-Nummer verbinden" (Embedded Signup) · 07.11.2026

**Geschrieben für:** API (klärt Verantwortlichen und Termin, baut den Server-Teil) und Redesign (Bildschirm). Wortlaut: Copy, ES + EN + DE, WhatsApp-Deutsch mit Sie. **Das ist die Anforderung, keine Bau- oder Veröffentlichungsfreigabe.**

**Quellen (Meta, gelesen 07.11.):** [Überblick](https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/overview) · [Bildschirme](https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/default-flow) · [Umsetzung](https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/implementation) · [Tech Provider](https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/onboarding-customers-as-a-tech-provider) · [Hosted](https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/hosted-es.md).

## 1 · Was die Agentur sieht

Einen Bereich **„WhatsApp"** in den Agentur-Einstellungen, nur mit Recht `manage`. Dort genau einen der Zustände aus §3. Das Fenster mit den Meta-Schritten gehört Meta, wir gestalten es nicht.

**Metas Fenster, damit unser Text dazu passt:** Anmeldung → Berechtigungen → Nummer eingeben oder wählen → Code per SMS oder Anruf → Portfolio und WhatsApp-Konto wählen oder anlegen → Rechte prüfen → **Finish**. Meta stellt auf „Phone Number First" um, manche Kunden sehen die Reihenfolge anders. Also im Text keine Schrittnummern.

## 2 · Was Meta verlangt

| Vorgabe | Folge für den Bildschirm |
|---|---|
| „You will not be able to onboard business customers until your app has been approved for advanced access." | Vor App Review in Prod Zustand S0, kein Knopf |
| Nummer muss Code per SMS oder Anruf empfangen können | Hinweis in S1 |
| Nummer in der WhatsApp-Business-App braucht einen eigenen Ablauf; ohne ihn: Konto löschen, „your existing messaging history will be lost" | **Im Pilot kein Coexistence-Ablauf** (Lead: Echo nicht im Pilot). S1 sagt das offen und verlangt eine Bestätigung |
| Domain muss HTTPS haben und unter **Allowed domains** und **Valid OAuth redirect URIs** stehen; Konfiguration von Facebook Login for Business (`config_id`) | Einstellung bei Meta an App 1455287596350049: **Karte und Owner-Zeile nötig**, Social liefert sie |
| Code gilt **30 Sekunden**, Austausch nur Server zu Server | Server tauscht sofort; S5 hat keine Wartezeit für die Agentur |
| Danach: `subscribed_apps`, Registrierung mit 6-stelliger PIN | Server, nie im Browser. PIN nie anzeigen, Ablage bestimmt API |
| „Instruct your customer to use the WhatsApp Manager to add a payment method." | Zustand S8 |
| Standard: **10 neue Kunden in 7 Tagen**, 200 nach Verifizierung, App Review und Access Verification | Keine Anzeige; S4 fängt die Ablehnung, Betrieb weiß Bescheid |
| Konten, die über eine Entwickler-App entstanden sind, lassen sich nicht wählen | **Unsere Test-WABAs testen diesen Weg nicht.** Echter Test: eigenes Portfolio und freie Nummer nach Metas Freigabe. API klärt, was vorher auf dem Mock belegt wird |

## 3 · Jeder Zustand

| # | Zustand | Was die Agentur sieht | Knopf | Technik |
|---|---|---|---|---|
| S0 | Nicht verfügbar | „WhatsApp mit eigener Nummer ist noch nicht verfügbar." Kein Datum, kein Versprechen | — | Schalter serverseitig |
| S1 | Bereit | Was nötig ist: Admin-Recht im eigenen Meta-Portfolio oder neues anlegen, Nummer mit SMS oder Anruf, später Zahlungskarte bei Meta. **Warnung:** Nummer in der WhatsApp-Business-App ⇒ App auf dieser Nummer endet, Verlauf geht verloren; zusätzliche Nummer möglich. **Pflicht-Haken:** „Ich habe das verstanden." Die Agentur führt die Schritte selbst aus | **Mit Meta verbinden** (aktiv erst mit Haken) | Facebook-Skript **erst nach Klick** laden |
| S2 | Läuft | „Fenster von Meta geöffnet." Fenster blockiert ⇒ eigener Hinweis mit erneutem Versuch | Abbrechen | `sessionInfoListener` |
| S3 | Abgebrochen | „Nichts wurde verbunden." | Erneut | `CANCEL` mit `current_step` ins Protokoll, keine Daten gespeichert |
| S4 | Fehler bei Meta | Metas `error_message` + „Bitte Support kontaktieren" | Erneut, Support | `error_code`, `session_id` ins Protokoll |
| S5 | Wird eingerichtet | „Nummer wird eingerichtet." Kein Versand, keine Testnachricht | — | `FINISH`: Code tauschen, Nummer und WABA prüfen, `subscribed_apps`, Register, `wa_number_register`; Route je Nummer (Hosting) |
| S6 | Einrichtung gescheitert | Welcher Teil, ohne Technik-Wörter. Nichts läuft halb; **fail closed** | Erneut | Code abgelaufen ⇒ neuer Durchlauf; kein doppelter Eintrag |
| S7 | Nummer gehört schon anderswohin | „Diese Nummer ist bereits verbunden." Kein Hinweis auf den anderen Mandanten | Support | `wa_number_register` lehnt fremde Nummer ab |
| S8 | Zahlungsmittel fehlt | „Bitte im WhatsApp Manager eine Zahlungsart hinterlegen." | **WhatsApp Manager öffnen** | Stand nur aus Metas Antwort |
| S9 | Verbunden | Nummer **maskiert**, Anzeigename mit Metas Status, Qualität mit Metas Wert, Datum | Trennen | Nur gelesene Werte, nichts behauptet |
| S10 | Meta meldet ein Problem | Klartext, was zu tun ist (Sperre, PIN, Qualität, Hauptgerät) | je nach Fall | `account_update`, `security`: heute endet das still am Filter ⇒ M11, Lead |
| S11 | Getrennt | „Getrennt seit … Nachrichten an diese Nummer werden nicht mehr bearbeitet." | Neu verbinden | `wa_number_unregister` (M8) |

**Immer:**
- Kein Schlüssel, keine PIN, keine rohen Meta-IDs, keine fremden Mandanten im Browser.
- Mobil voll benutzbar. Zustand kommt vom Server, ein Neuladen ändert nichts.
- Auf der Website steht „verfügbar" erst nach Abnahme.

**Nicht auf dieser Seite:** Vorlagen je WABA (API, Staging Do 26.11.; Bildschirm bei Redesign), Coexistence.

## 4 · Zwei technische Wege, Empfehlung: JS-Start

| | **A · JS-Start (`FB.login`)**, APIs bisherige Annahme | **B · Hosted Embedded Signup** |
|---|---|---|
| Unsere Seite | wenig Skript, Rückmeldungen S2–S5 | nur ein Link: „without adding JavaScript code" |
| Abbruch und Fehler | ja, mit Schritt und Code | keine Rückmeldung an uns |
| Ergebnis | Rückruf mit `code`, `waba_id`, `phone_number_id` | Webhook `account_update`, `PARTNER_ADDED`, an die App-Adresse, **also den Prod-Main**, wo es heute am Filter endet |
| Folge | Main bleibt unberührt | Main-Änderung nach V3 nötig |

**Empfehlung Social: A.** Die Zustände S3 und S4 gibt es nur dort, und der Main bleibt außen vor. B bleibt Rückfall, falls der Bildschirm nicht rechtzeitig steht. **API entscheidet mit Redesign.**

## 5 · Abnahme

- Auf Staging je Zustand S0–S9, S11 ein Lauf mit Lauf-ID (Meta gemockt, so gekennzeichnet). **Mock ist kein E2E.**
- ES, EN, DE und mobil. RV6-Prüfung durch den Reviewer.
- Echter Lauf erst nach Metas Freigabe, in Prod nur mit Owner-Zeile (M1–M14).

## 6 · Bitte an API, bis Mo 09.11. abends im Signal

1. Wer baut den Bildschirm, und bis wann? (Audit Zeile 13: „Bildschirm ohne Schätzung".)
2. Weg A oder B?
3. Reicht die Staging-Lieferung Do 19.11. mit Bildschirm für die Rechnung, oder verschiebt er die Technik? Social rechnet bis dahin mit Abnahme ~Mo 23.11.
