# Zwischenschau vor dem fertigen Build (Masterprompt 07.11., Zusatz G7) · Redesign · 07.11.2026

**Geschrieben für:** den Owner (ein „passt“ oder Änderungen, bevor ich fertig baue), cc Audit, Reviewer, Copy, 3D.
**Stand:** Zwischenstand `e96b1ee` auf dem Design-Preview, hinter dem Vorschau-Schutz. Kein benannter Build, nichts veröffentlicht.

```
Zwischenstand   = e96b1ee   dpl_2BVzRyFEiXM8aNYeycEdsF1Kpnoy   https://nuovasolution-design-preview-gm1ounnzn-nuovasolajs-projects.vercel.app/es
                  (Code wie am Telefon: website_preview_access_code.txt · Zielsicht ?view=target · öffentliche Sicht ?view=public)
Videos          = docs/website_redesign/preview_2026-11-07_interim/zwischenschau-desktop-1366x768.mp4 (86 s Echtzeit, 12,4 MB)
                  docs/website_redesign/preview_2026-11-07_interim/zwischenschau-handy-390.mp4 (87 s Echtzeit, 8,2 MB)
Staging-Zwilling= e96b1ee   dpl_7AMBASWXL2YMQaJjvLFf2sSs1ohB (nicht Teil der Design-Sicht)
Bilder          = docs/website_redesign/preview_2026-11-07_interim/bilder/01–08 · Messung messung-1108.json (36/36)
```

## Was in den Videos zu sehen ist (in dieser Reihenfolge)

| Zeit (Desktop) | Was | Punkt |
|---|---|---|
| 0:00–0:06 | **Hero:** kein Logo-Intro mehr; Überschrift, Unterzeile und Knöpfe stehen innerhalb von 0,8 s; das **Hero-Video von 3D** (Wohnzimmer, langsame Kamerafahrt, Van Gogh) läuft über dem Standbild, Standbild als Fallback; Abdeckung heller als vorher; Logo oben links ab dem ersten Pixel | B1, B3, B4, G1 |
| 0:06–0:30 | **Demo:** die Ficha rechts steht von Anfang an (Feldnamen), die Werte kommen Feld für Feld; Nachricht → Tipp-Anzeige → Antwort; die Kanalreiter wechseln **nicht** mehr von selbst, nur per Klick (im Video ein echter Klick auf Email) | C1, C4, G3 |
| 0:30–0:36 | **Cómo funciona:** vier Felder auf einer Spur, die sich beim Scrollen füllt (wie am 06.11.) | — |
| 0:36–1:05 | **Szenen:** nur noch **5 Szenen** sichtbar (Antwort, Ficha, Prioridad, Origen, Informe), die anderen 6 hinter „Ver las 6 escenas restantes“; die Karte steht **ohne graue Leerfläche**; „Siguiente escena“ immer sichtbar; Fortschritt als Schiene; Überblenden beim Scrollen | C2, C3, G2 |
| 1:05–1:20 | **Bericht** mit Sin/Con-Schalter (Zahlen zählen hoch) | G3 |
| 1:20–1:35 | **3D:** Plano → Modelo (neuer Loop mit allen Wandbildern) → **Vorher/Nachher-Schieber** leer/möbliert (neues Bildpaar von 3D) → Entrega (neuer Clip) | G4, F3 |
| Handy-Video | dieselbe Seite bei 390 px: keine Überbreite (gemessen 360/390/414/768, beide Sichten, ES/EN), Überschrift 2–3 Zeilen mit Komma, Menüknopf oben rechts, **feste Leiste unten** mit dem Hauptknopf sobald der Hero-Knopf weg ist, Szenen als Liste mit Aufklappen | A1–A4 |

## Die drei Vorbildseiten, an denen ich mich messe

| Seite | Was ich davon nehme | Wo es auf unserer Seite steht |
|---|---|---|
| **stripe.com** (Startseite) | Hero mit bewegtem, aber ruhigem Hintergrund; Botschaft und Knöpfe sofort da, Bewegung nur als Hintergrund; Produktflächen als echte Oberflächen, nicht als Bilder | Hero-Video unter den Wörtern (0,8-s-Regel), Demo als echte Oberfläche mit Ficha |
| **linear.app** (Startseite, „Product“) | eine Easing-Kurve, kurze Dauern, Karten heben sich leicht, nichts hüpft; Abschnitte gehen ohne harte Kanten ineinander über | `app/motion.css` (eine Kurve, 120/200/360/560 ms), `.lift` auf Knöpfen und Karten, weiche Abschnittsgründe |
| **apple.com/iphone** | Scrollen als Geschichte: ein festes Bild, der Inhalt wechselt mit dem Scrollen, Fortschritt sichtbar; reduzierte Bewegung = Standbild | die gepinnten Szenen mit Schiene, der 3D-Teil Plano → Modelo → Paar → Entrega, der Schieber |

## Was noch NICHT drin ist (kommt nach deinem „passt“ und mit Copys Wortlaut)

| Punkt | Warum noch nicht | Wartet auf |
|---|---|---|
| B2 „Reservar una demo“ / „Escríbenos por WhatsApp“ | neue Sätze schreibt nur Copy; der WhatsApp-Knopf braucht eine Nummer (im Owner-Blatt OFFEN) | Copy T-1/T-2, deine Nummer |
| B5 Stimme „tu asistente responde en nombre de tu agencia“ | dito (Flow-Station 02, Szenenzeilen, H1-Frage) | Copy T-4 |
| D1 „Quién está detrás“ | Block steht erst mit Copys fünf Zeilen; der Name kommt aus der Umgebung (wie Impressum), nicht ins Repo | Copy T-5, Vercel-Umgebung |
| E3 „Piloto gratuito · precio en la demo“ | Copy T-6 | Copy |
| „Hora de envío, no de entrega“ | Copy T-7 | Copy |
| Aufklapp-Beschriftung „Ver las 6 escenas restantes“ | steht als WORKING im Code, Copy T-8 | Copy |
| G3 Karten heben sich, Hover/Druck auf allen Knöpfen | `.lift` ist da; wird im Fertigbau auf alle Karten gesetzt | — |
| G5 leichte Parallaxe auf Bildern | kommt im Fertigbau (nur transform) | — |
| Abnahme: Lighthouse ≥ 90 / ≥ 95, CLS < 0,1, Rückgabe `WEBSITE_BUILD_1108_RETURN_v1.md` mit Tabelle A1–F3, F-1–F-6, D-1–D-23, je Owner-Bild eine Zeile | nach dem fertigen Build | — |

Die Liste an Copy: `docs/website_redesign/REDESIGN_TO_COPY_1107_TEXTSTELLEN_BUILD_1108_v1.md` (T-1…T-11).

## Was ich von dir brauche

1. **„passt“** zu Hero (Video, Abdeckung, Tempo), Demo (Ficha von Anfang an, keine Reiterwechsel), Szenen (5 + Aufklappen, keine Leerfläche), 3D (Schieber) — oder konkrete Änderungen.
2. Die **WhatsApp-Nummer** für den zweiten Hero-Knopf (B2), sobald sie steht; sie geht in die Vercel-Umgebung, nicht ins Repo.
3. Die **Pilotplätze** für D1: Zahl oder nur „limitadas“.
4. E2 Preistabelle: WhatsApp-Nummer, Teléfono, Instagram sind jetzt in **beiden** Sichten keine Zeile mehr (kein Häkchen, solange abgeschaltet) — Copys §20 zählte 18 Zeilen, jetzt 15. Wenn du die Zeilen in der Zielsicht sehen willst, sag es.
