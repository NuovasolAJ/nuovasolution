# Zweite Zwischenschau (Owner-Urteil 07.11.: Desktop „schon sehr gut“, Handy „null premium“) · Redesign · Mo 09.11.2026

**Geschrieben für:** den Owner (ein „passt“ oder Änderungen, bevor ich fertig baue), cc Audit, Reviewer, Copy, 3D.
**Stand:** Zwischenstand fdffcf4 auf dem Design-Preview, hinter dem Vorschau-Schutz. Kein benannter Build, nichts veröffentlicht.

```
Zwischenstand 2 = fdffcf4   dpl_8Nj8oV6KGStECKCUU3vPs2RheTkr   https://nuovasolution-design-preview-68obr8h1w-nuovasolajs-projects.vercel.app/es   (Code wie am Telefon · ?view=target / ?view=public · Farbvorschläge ?palette=d / ?palette=e)
Videos          = docs/website_redesign/preview_2026-11-09_interim2/zwischenschau2-desktop-1366x768.mp4 (76 s Echtzeit, 10,8 MB)
                  docs/website_redesign/preview_2026-11-09_interim2/zwischenschau2-handy-390.mp4 (81 s Echtzeit, 7,7 MB, echte Handy-Emulation 390 × 844, Touch)
Bilder          = preview_2026-11-09_interim2/bilder/ (Handy 390 × 844 bei DPR 3 mit iPhone-Kennung und Touch; Desktop 1440)
Farb-Musterblatt= docs/website_redesign/FARB_MUSTERBLATT_1109_v1.md + preview_2026-11-09_interim2/farben/
Messung         = preview_2026-11-09_interim2/messung-1109.json (26/26)
Staging-Zwilling= fdffcf4   dpl_HMusi6aBC2wsHZzqQRvULoy6h7gv (nicht Teil der Design-Sicht)
```

## Handy (eigenes Design, kein gestapelter Desktop)

| Punkt | Gebaut | Beleg |
|---|---|---|
| H1 Hero-Video auch am Handy | Das 3D-Video läuft jetzt auch bei 390 px (Ausschnitt per object-position 58 %, das Bild und das Sofa bleiben im Bild); Standbild nur als Fallback und bei reduzierter Bewegung. Eine 9:16-Fassung frage ich bei 3D an, wenn du den Ausschnitt nicht magst. | `bilder/phone-390-hero.png`, Messung „H1 hero video plays on the phone“ |
| H2 Vorschau-Leiste eingeklappt | Vista/Paleta/Titulares sitzen unter einem kleinen Knopf „Solo en la vista previa +“; der erste Bildschirm zeigt Logo, Menü, Überschrift, Unterzeile, Hauptknopf, Video. Copys Hinweiszeile (§14, vom Reviewer verlangt) bleibt als eine Zeile stehen; auf einem Live-Build gibt es sie nicht. | `bilder/phone-390-hero.png` |
| H3 Kanalwahl | Vier Reiter 2 × 2 ohne Abschneiden, 48 px hoch, **echtes WhatsApp-Zeichen**, Email-/Formular-/Telefon-Icon; beim ersten Lauf pulsieren die drei anderen Reiter zweimal leicht; der Satz „Elige un canal y mira cómo responde.“ (Copy) steht darüber — kein neues Wort. | `bilder/phone-390-demo.png` |
| H4 ≈ 40 % weniger Text | Am Handy fallen die Nebenzeilen weg (`.m-hide`): Hero-Chips, Flow-Nebenzeilen, der Piloten-Absatz bei „Quién está detrás“; die drei Bereiche zeigen je Überschrift + **ein** Satz (Copys erster Satz) + zwei Punkte + Bild; Details auf Tippen. Wörter auf der Startseite am Handy: 1 095 (vorher ≈ 1 430). Kein neuer Wortlaut; die beiden Knopfwörter „Ver {Bereich}“ / „Cerrar“ stehen als WORKING für Copy (T-13). | `bilder/phone-390-chapters.png` |
| H5 keine blassen Felder | Ficha, Bereiche und Bericht stehen voll lesbar, auch ohne Animation (Messung „H5 no pale surfaces“ = 0). | `bilder/phone-390-report.png` |
| H6 „Agencia de ejemplo“ leer | **Ursache gefunden:** Die drei Kennzahlen-Zeilen und die Wochenbalken des Berichts werden erst eingeblendet, wenn das Blatt zu 30 % im Fenster steht (IntersectionObserver). Am Handy ist das Blatt höher als der Bildschirm, 30 % werden nie erreicht — der Kopf „Agencia de ejemplo“ stand, der Inhalt darunter blieb auf opacity 0 / Höhe 0. **Behebung:** Schwelle auf 8 % (Bericht), 10 % (3D-Bühne), 12 % (Beispielbericht-Tafeln), Standard 15 %; dazu die Netze vom 07.11. Beleg: Bild nach der Behebung, Messung „H5 no pale surfaces“ schließt jetzt die Kennzahlen-Zeilen und Balken ein. | `bilder/phone-390-report.png` (vorher: `bilder/phone-390-report-vorher.png`), `messung-1109.json` |
| H7 echte Emulation | Alle Handy-Messungen mit 390 × 844, DPR 3, Touch (5 Punkte) und iPhone-Kennung; keine Überbreite bei 360/390/414 in beiden Sichten, ES/EN. | `messung-1109.json` |

## Optik, beide

| Punkt | Gebaut | Beleg |
|---|---|---|
| P1 „Cómo funciona“ | Keine Kästen mehr. **Eine Linie zeichnet sich beim Scrollen** von Station zu Station (SVG-Pfad, Länge folgt dem Scrollen), an jeder Station erscheint ein kleiner Pfeil; die Stationen sind dünne Ringe mit Linien-Icons, die beim Erreichen aufleuchten (Icon hebt sich, Titel färbt sich). Am Handy dieselbe Linie senkrecht. **Deine Vorbildbilder** (Immobilienseite mit aufgehenden Pfeilen) habe ich in `owner_review_1106/` und `owner_review_1107/` nicht gefunden — nur deine blauen Pfeil-Markierungen auf unserem Flow (A_flow_es, O1107_03). Bitte den Link. | `bilder/desk-1440-flow.png`, Video Desktop ab ≈ 0:30 |
| P2 kein schwarzes Quadrat | Station 02 trägt das NuovaSolution-Zeichen im **selben dünnen Ring** wie die anderen Icons. | dito |
| P3 Atiende / Organiza / Crece | **Drei Bereiche nebeneinander** (am Handy eine wischbare Reihe), je ein Bild (die erste Produktfläche des Bereichs), ein Satz, höchstens zwei Kernpunkte, ein Knopf; Klick öffnet darunter die Szenen des Bereichs mit Titel, Zeile und Fläche. **Kein 01/05, kein Zähler, kein „6 escenas restantes“.** Die gepinnte Bühne mit Schiene ist weg. | `bilder/desk-1440-chapters.png`, `…-chapters-open.png`, `phone-390-chapters.png` |
| P4 Farbe | Beige nur noch unter **Bericht** und **Planes**; alles andere Weiß. Zwei Vorschläge als Musterblatt (Hero + Bereiche + Bericht): **D tiefes Mittelmeerblau #1f4e8c + Bronze**, **E Smaragd #1b6b4a + Sand**; AA belegt (D 8,3:1, E 6,5:1 auf Weiß). Du wählst; danach entferne ich den Paleta-Schalter. | `FARB_MUSTERBLATT_1109_v1.md`, `farben/` |
| P5 Premium statt Kästen | Flow ohne Rahmen, Bereiche als ruhige Karten ohne Schatten, 3D-Bühne ohne Rahmen und Schatten, Hero-Video vollflächig; Fraunces bleibt als Variante für Überschriften (`?display=fraunces`). Mehr vollflächige Renders (3Ds Raumbilder) schlage ich für den Fertigbau vor, wenn du es willst. | Videos |
| P6 E-Mail-Avatar | Der Absender in der E-Mail-Demo trägt das NuovaSolution-Zeichen statt „N“ (beide Sichten). | `bilder/phone-390-demo-email.png` |

## Copys neue Texte (16bf954) — eingebaut

Hero: ein Knopf **„Solicitar una demo“** → /contact (H-1-Rückfall: die Buchungsseite cal.com/nuovasolution/demo antwortet „This page could not be found“ — „Reservar“ erst, wenn eine echte Buchungsseite steht), darunter **„Piloto gratuito · precio en la demo“** (beide Sichten); Pfeil „Ver cómo responde“; Header- und Abschluss-Knopf gleich. Kein WhatsApp-Knopf (deine Antwort). Stimme V-1/V-2 (Flow 02), V-3 (Footer), V-4 (FAQ) mit Schlüsselbedingung; Block **„Quién está detrás“** mit Copys Zeilen (Name aus der Umgebung, kein Platzhalter sichtbar; Pilotplätze ohne Zahl); Preis P-2/P-3/P-4; „Hora en que salió cada respuesta“. Copys O-1 (ersetzt der Pilot die 14-Tage-Prueba auch in der Zielsicht?) ist offen — bis dahin steht beides in der Zielsicht.

## Was ich von dir brauche

1. **„passt“** zur zweiten Zwischenschau (Handy und Desktop) — oder konkrete Änderungen.
2. **Farbe: D oder E** (oder A bleibt).
3. **Link der Vorbildseite** mit den aufgehenden Pfeilen (P1).
4. **O-1:** ersetzt „Piloto gratuito“ die 14-Tage-Prueba auch in der Zielsicht (Copys Empfehlung: ja)?
5. **Name für „Quién está detrás“:** ich setze `NUOVA_E14_NAME` aus deinem Blatt in die Vercel-Umgebung der beiden Preview-Projekte, wenn du das freigibst (nicht ins Repo).
