# Redesign → Owner, Audit, RV6, Copy, API: Etappenplan Thema 16 · Mo 23.11.2026, 12:00

**Grundlage:** Owner-Brief 20.11. (`docs/website_redesign/OWNER_BRIEF_1120_THEMA16_v1.md`, 6726df1), Owner-Klarstellung 20.11. 16:11/16:18 (frühestmöglich = Fr 04.12. mit allem), Owner-Nachträge 20.11. (Vorher/Nachher auf dem Handy, keine Übertragung der Gestaltung vor eurem Feedback) und Mo 23.11. (Prüftermin 04.12., kein Teilstart, keine Löschung von Deployments). Copy: d8ebc77 (Etappe 1, Angebot), 11cf7a2 (Bildschirmfolge), c683f2f (Vorher/Nachher-Texte). RV6: d26fd79 (Prüfprotokoll mit Vorher-Messung), 7174a6e.

**Status aller Builds hier:** implementiert und wartet auf unabhängige technische und finale Prüfung. Veröffentlichung oder Teilstart nur auf Owner-Zeile.

---

## 1. Etappen mit Terminen und festen Preview-Builds

| Etappe | Inhalt | Fester Preview-Build | Owner und Audit sehen Vorher/Nachher |
|---|---|---|---|
| **E1 · Angebot und die zwei Handywege** | Essential 14 Tage gratis (auf Anfrage), Growth → Demo-Anfrage, Enterprise → Gespräch: Buttons, Linkziele, vorgewählte Formulare, Bestätigungen; Weg 1 Milas WhatsApp-Anfrage → fertige Rückrufaufgabe (erster Bildschirm, Demo mit WhatsApp zuerst, Aufgabenkarte); Weg 2 Paketwahl → richtiges Formular → Bestätigung; Teamrollen-FAQ an `teamRoles`; kein „Próximamente" auf Kundenseiten | **Mo 23.11., gebaut: `ab38b69` = `dpl_9e3f3gbkye1QeiB4JYQgattgFduK`** auf dem Alias https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es (direkt: https://nuovasolution-design-preview-21669l141-nuovasolajs-projects.vercel.app); der Grundstand 92f873d bleibt erreichbar: https://nuovasolution-design-preview-rgrn75n6w-nuovasolajs-projects.vercel.app | **Mo 23.11.**: Vorher/Nachher bei 390 px, ES und EN, je Weg Bild für Bild (`owner_evidence_1117/website_1123/vorher_nachher_390/`), Link, kurze Bildschirmaufnahme (mit und ohne Bewegung); eure Rückmeldung entscheidet, ob Bildsprache, Karten und Buttons auf die übrigen Seiten gehen |
| **E2 · Startseite komplett** | nach eurem Feedback (frühestens Mi 25.11.) und Audits Prüfung: Übergang WhatsApp → Aufgabe nach Emil Kowalskis Hinweisen (auch mit reduzierter Bewegung verständlich); E-Mail Carmen, Formular aus einem konkreten Exposé, Telefon mit anhörbarem Gespräch; Team-Übernahme an Milas Anfrage; Matching mit Objektfoto und Beleg; Wochenbericht als eine Entscheidung; die sieben Wachstumskarten als Agenturaufgaben (je Beleg + Aktion); „9 de 25" direkt nach dem ersten Bildschirm | **Do 26.11.** | **Do 26.11.** Vorher/Nachher je Abschnitt (390 + 1440) |
| **E3 · 3D, Pakete-Seite, Plattform- und Funktionsseiten** | „Tu camino" als ein Objekt in 4 Schritten auf einer Bildfläche (Stepper, Bildvergleich leer/möbliert, Plan + Perspektive); /packages mit der E1-Logik; Plattform- und Funktionsseiten (CRM, Integrationen, Medien, Lead-Gewinnung, Kundenakte, Rollen, Aufgaben, Erinnerungen, Kalender/Morgenbrief, Matching, Nachfassen, Berichte, 3D) auf dieselben Aussagen; Navigation, Footer, Login, Onboarding | **Mo 30.11.** | **Mo 30.11.** |
| **E4 · FAQ, Kontakt, Rechtstexte, EN-Durchlauf, Feinschliff** | FAQ und Kontakt auf die Angebotslogik; Rechtstexte nur nach freigegebenem Wortlaut (Q-3 beim Owner); EN vollständig; Tiefe, Touchflächen ≥ 44 px, feste Fußleiste, reduzierte Bewegung, Tastatur | **Mi 02.12.** (Kandidat für den Prüftermin) | **Mi 02.12.** |
| **Prüftermin** | RV6 misst den finalen Build in einem Durchgang: beide Handywege, die drei Erstbesucher-Aufgaben, die sechs Noten (Ziel 10, keine Etappe unter 9); Audit gleicht je Versprechen gegen das Register; Owner-Abnahme am gebauten Stand | **Fr 04.12.** | **Fr 04.12.** |

Die drei Erstbesucher-Aufgaben prüft RV6 jeweils, sobald der betreffende Ablauf gebaut ist (E-1 mit E1, E-2 mit E2, E-3 mit E1), und am 04.12. gemeinsam. Vor jedem Preview-Build prüfe ich den Vercel-Speicherstand (heute: 44 Deployments im Team — Design-Preview 8, nuovasolution 22, Staging-Preview 14; die Prozentzahl steht nur im Dashboard) und lösche nichts ohne Owner-Freigabe.

---

## 2. Die drei Vergleichswege auf 92f873d (Vorher)

Eine Vorher-Zahlenreihe, mit RV6 abgestimmt: RV6 erhebt die Wege in Pixeln und Bildschirmen, die Markeninventur, die Paketbuttons mit Linkziel und Vorbelegung, Touchflächen und die Abdeckung der festen Fußleiste (`review_2026-11-16/checks/before1120-92f873d.json`, d26fd79); ich liefere die Vorher-Bilder und die Tipp-Zahlen. RV6 prüft meine Zahlen stichprobenartig statt doppelt zu messen.

| Weg | Vorher auf 92f873d (RV6, direkte Adresse, Build vor und nach dem Lauf geprüft) |
|---|---|
| **bis zu Milas Rückrufaufgabe** | **im Ausgangsstand nicht erreichbar**: die Demo bietet Email, Formulario web (markiert), Teléfono (markiert) — kein WhatsApp (seit 16.11. Punkt 8 in der Gate-Sicht ausgeblendet). Genau das zeigt das Vorher-Bild. |
| **bis zum erkennbaren Paketunterschied** | vor dem Öffnen kaum Unterschiede (M6); `/packages` zeigt **vier** Buttons „Empieza 14 días gratis" (ES und EN, 375 und 1440) — das Gratisangebot auch bei Growth (D4); feste Fußleiste bei 375 **299 px von 812 px (37 %)** |
| **bis zum passenden Formular** | Growth-Button → `/contact?interes=pilot&plan=growth` mit Betreff „Piloto gratuito · 14 días con Growth"; Enterprise nur „Contratar directamente" |
| **Marken auf Kundenseiten** | 334 Blatt-Treffer über 30 Seiten (Untergrenze: Akkordeons und über Elemente laufende Marken fehlen im Blatt-Scan); Startseite ES 17 / EN 18 ganze Sätze, `/faq` je 10 |
| **Touchflächen < 44 px bei 375** | Startseite 7, `/packages` 4, `/platform/ai-sales-agent` 3, `/faq` 4 |

Die Nachher-Zahlen derselben Wege stehen in der Meldung zum E1-Build (Tipps, Bildschirme, Pixel; Vorher/Nachher bei gleicher Breite).

---

## 3. Echte Objektfotos mit Nutzungsrechten: Bestand und Bedarf

**Bestand (3D-Spur, 20.11.):** **keine** echte, lizenzierte Objektfotografie im Repo. Alles Vorhandene sind Renderings des fiktiven Demohauses (hero_A/hero_B, rooms/*.jpg, das Paar leer/möbliert `handoff_2026-11-07/pair/living_empty.jpg` + `living_furnished.jpg` aus einer Kamera, 3000 × 2000, Möbel CC0, Grundriss Design For Place CC BY 4.0). Die „überzeugende Fotokarte unter Crece", an die sich der Owner erinnert, ist keines unserer Assets.

| Stelle | Gebraucht | Quelle | Stand |
|---|---|---|---|
| Hero, erster Bildschirm | ein Terrassen-/Wohnraumfoto mit glaubwürdigem Licht; Objektdaten unter dem Foto nur, wenn es wirklich Ref. 9895153 ist | Agentur/Owner mit Nutzungsrechten | **fehlt** — bis dahin das 3D-Rendering mit der Bildunterschrift „Estás en una visita · 11:40" |
| Matching-Karte | ein identifizierbares Objekt, führendes Foto, Lage, Beleg „warum passt es" (z. B. „8 minutos a pie" aus einem Inserat) | Agentur/Owner | **fehlt** |
| Formular-Kanal („startet aus einem konkreten Exposé") | ein Exposé-Foto mit Objektbezug | Agentur/Owner | **fehlt** |
| 3D „Tu camino" (ein Estepona-Objekt, 4 Schritte) | Grundriss, bestätigte Raumwahl, Modell, fertige Bilder — desselben Objekts | 3D-Spur liefert die 4 Schrittbilder des fiktiven Demohauses (Handy + Desktop, „visualización, objeto ficticio"), sobald der Owner das Demohaus als Stellvertreter freigibt; für ein echtes Estepona-Objekt Plan + Fotos vom Owner | **Owner-Zeile nötig** |
| Bildvergleich leer/möbliert | ein Kamerastandpunkt | vorhanden (3D), Handy-Derivate auf Zuruf | **vorhanden** |

Die 3D-Spur beschafft keine Fremdfotos. Ohne echte Fotos bleibt die Gestaltung auf Renderings, als Visualisierung gekennzeichnet — das drückt die Note „Premiumgefühl".

---

## 4. A12: welche Teile die Kundenwege brauchen (meine Sicht; API bestätigt)

| Kundenweg | Braucht aus A12 | Braucht sonst |
|---|---|---|
| **Öffentliche Website (Seiten lesen)** | nichts — die Seiten laufen ohne Postfach | Belege je gezeigtem Ablauf (Audit-Register), echte Fotos |
| **Essential-Teststart (auf Anfrage)** | Zeile 1–4: Postfach-Register, Annahmeweg, Outlook — Schritt 2 „Conecta tu buzón y tu WhatsApp" | WhatsApp über die Agenturnummer (Thema 20, Meta) **oder** die Lesart „WhatsApp über unsere Nummer" (im Register belegt: `replyWhatsapp` included); Formular-Eingang, der einen Menschen erreicht (P-2, API/Hosting; heute „simulated") |
| **Growth-Demo-Anfrage, Enterprise-Gespräch** | nichts | nur der Formular-Eingang (P-2) |

Interne Aufgaben ohne Auswirkung auf diese Wege laufen weiter.

---

## 5. Entscheidungen des Owners (offen) — je eine Zeile genügt

| # | Frage | Mein Vorschlag / heutiger Bau |
|---|---|---|
| D-1 | WhatsApp am 04.12.: über **unsere** Nummer (im Register belegt, Milas Weg erreichbar) oder über die **Agenturnummer** (Meta, Thema 20, frühestens Mitte/Ende Dezember)? | über unsere Nummer; die Agenturnummer kommt nach Meta |
| D-2 | Essential-Test: **auf Anfrage** (Formular, ein Mensch aktiviert) oder **Selbststart** (Sign-up; `publicSignup`/`trial` brauchen Prod-Beleg)? (Copy Q-1) | auf Anfrage, so gebaut; Selbststart ist eine Zeile |
| D-3 | Bleiben die +7 Tage bei Rückmeldung? (Copy Q-2) | auf keiner Kundenseite, bis du es sagst |
| D-4 | `legal.ts:132` nennt kein Paket — auf Essential ändern? (Copy Q-3, Rechtstext) | nur auf deine/Kanzlei-Zeile |
| D-5 | Das fiktive Demohaus als Stellvertreter für das „Estepona-Objekt" in 3D, bis echte Pläne/Fotos vorliegen? | ja, gekennzeichnet |
| D-6 | Die interne Vorschausicht (`?view=public`, das Gate vom 20.11. 09:05) behalten? Sie ist keine Kundenseite; die Markenzeichenketten blieben dann in der Quelle hinter der Bedingung. Copy und RV6 würden die Zeichenketten lieber ganz aus `lib/content`/`lib/i18n` entfernen. | entfernen, sobald Audits Versprechen-Register den Launch-Stand trägt; bis dahin intern behalten |
| D-7 | Vercel: 44 Deployments; alte Previews löschen? | nur auf deine Zeile |
| D-8 | Echte Objektfotos (§3): wer liefert, bis wann? | Agentur/Owner; ohne sie Renderings als Visualisierung |

---

## 6. Die drei Statusantworten (Stand heute, mit API-Vorbehalt)

**Was wir heute öffentlich zeigen und anbieten können:** Antworten in Spanisch per WhatsApp (unsere Nummer) und E-Mail, auch nachts; die Kundenkarte mit Priorität und Grund; Herkunft je Anfrage; Etiketten; die Erinnerung nach einer Stunde (`reminders`, Prod seit 13.11.); der Bericht im Login; Essential als Testphase auf Anfrage; Growth-Demo und Enterprise-Gespräch als Anfrage (sobald der Formular-Eingang einen Menschen erreicht).

**Was den öffentlichen Start der vollständigen Website tatsächlich verhindert:** (1) A12 in Prod (Postfach einer Agentur, Zeile 1–4; frühestens Di 24.11.); (2) der Formular-Eingang zu einem Menschen (P-2); (3) die Paketunterschiede mit API-Beleg (Growth: `taskList`, `matching`, `followup`; Enterprise: Oficinas, `instagram`; A-1…A-3) — ohne Beleg stehen die Karten nur mit Zielgruppe und Aktion; (4) D-1 (WhatsApp-Lesart); (5) Daily: 8:30-Zusammenfassung belegt, sonst keine Tagesgeschichte mit 8:30; (6) echte Objektfotos; (7) die Aufgabe in Prod trägt heute keinen Namen („Llamar a este cliente", P-11) — Lead/Daily; (8) RV6 kann kein echtes iPhone/Android prüfen — entweder ein Mensch mit zwei Telefonen oder Simulation mit benannter Grenze.

**Frühestmöglicher realistischer Termin, wenn Design, Texte und Belege parallel laufen:** **Fr 04.12.** für die vollständige Darstellung (E1–E4 oben) — **wenn** D-1 „unsere Nummer" heißt, A12 bis Di 24.11. in Prod ist, P-2 bis E3 steht und die Fotos bis E2 vorliegen. Mit der Agenturnummer (Meta) verschiebt sich der Start auf Mitte/Ende Dezember, unabhängig vom Design.

---

## 7. Gestaltung: je Abschnitt zwei Vorbilder (aus dem Brief), eigene Bilder und Texte

| Abschnitt | Vorbild 1 | Vorbild 2 | Was davon übernommen wird |
|---|---|---|---|
| Erster Bildschirm (Mila) | Makelaarsland-Test (Ergebnisbild am Entscheidungspunkt) | Housing.com (erstes Bild und Handlung sofort) | Foto + Anfrage + fertige Aufgabe ohne Ton/Animation |
| Demo, vier Kanäle | Rechat (nach Tätigkeiten gegliedert) | 21st.dev Stepper (fester Fortschritt, keine Formularpflicht) | eine flache 2×2-Kanalwahl, Endzustand beim Einstieg mitten im Abschnitt |
| Team und Bericht | Rechat (Kontakte/Aufgaben/Kalender) | Follow Up Boss (erst die kaufentscheidenden Unterschiede) | Kennzahl, Bedeutung, nächster Schritt |
| Matching | The Modern House (Objekt + führendes Foto + warum) | Awwwards Immobilien-Galerie (Bildregie) | ein identifizierbares Objekt mit Beleg |
| 3D „Tu camino" | Awwwards Neutra VDL (Raum im Plan → derselbe Raum im Ergebnis) | 21st.dev Image Compare (leer/möbliert, eine Kamera) | ein Objekt, vier anwählbare Schritte, eine Bildfläche |
| Pakete | Follow Up Boss Plans | (Brief, M6/D4) | je Stufe Zielgruppe, 2–3 Unterschiede, eine Hauptaktion |
| Übergang Anfrage → Aufgabe (E2) | Emil Kowalski, github.com/emilkowalski/skills | — | nach eurem Feedback, frühestens Mi; mit reduzierter Bewegung verständlich |

---

## 8. Was ich in E1 bewusst beibehalten habe und welches Problem jede Änderung löst

| Beibehalten | Geändert | Problem (Brief) |
|---|---|---|
| Hero-Bild (bis echte Fotos da sind), Eyebrow, Pain-Zeile „9 de 25", Demo-Oberflächen, Kundenkarte, Beispielwoche, Ansprechpartner | erster Bildschirm: h1 „¿quién atiende a Mila?", Milas Nachricht, fertige Aufgabe mit einer Zeile, Hauptaktion „Ver cómo queda la tarea", leise Zweitaktion „Prueba Essential gratis" | Verständlichkeit 4/10, „Das brauche ich" 3/10: das Ergebnis nach vorn |
| die vier Kanal-Demos, Wiederholung | WhatsApp zuerst und sichtbar; flache 2×2-Kanalwahl statt drei großer Buttons; Endzustand beim Einstieg mitten im Abschnitt; die Aufgabe „Llamar a Mila hoy a partir de las 17:00 · …" mit Zustand, Erinnerungszeile und dem Link „Ver qué plan te encaja" | M1 (WhatsApp fehlt, Buttons drücken das Ergebnis nach unten), Animation 4/10 |
| Register-Zeilen, Faltung am Handy, Legende, Preiszeile | je Paket **eine** Hauptaktion (Essential Test, Growth Demo, Enterprise Gespräch), Zeile darunter, „was passiert nach dem Klick", „Ver todo lo que incluye"/„Contratar directamente" als Textlinks; „Ver las diferencias" auf Wunsch; feste Fußleiste im Paketbereich ausgeblendet | M6/D4 (Gratis auch bei Growth, drei breite Elemente), Paketwahl 3/10 |
| Formularfelder, Datenschutzzeile | Karte, Betreff, Button und Bestätigung je Weg (Test/Demo/Gespräch/Vertrag) | „Button, Linkziel und Bestätigung gemeinsam korrigieren" |
| — | Kundenseiten ohne „Próximamente" (Standardsicht = fertiges Produkt); Teamrollen-FAQ an `teamRoles` | Owner-Entscheidung 1 |
