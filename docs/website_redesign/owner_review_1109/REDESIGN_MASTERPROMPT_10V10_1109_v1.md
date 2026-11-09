# Masterprompt Website 10/10 · Owner + Audit · Mo 09.11.2026

**Für:** Redesign. **Ersetzt** alle Teil-Aufträge zur Optik seit 07.11. Copys Texte (16bf954) und alle Wahrheitsregeln gelten weiter.
**Grundlage:**
- `OWNER_AUDIT_DESKTOP_REVIEW_1109_v1.md`, Desktop, Abschnitt für Abschnitt, mit `O1109_01–17` und `AUDIT_1109_*`
- dieses Dokument, Handy-Teil §4, mit `M1109_01–08`

**Ziel:** Handy **und** Desktop erreichen **10/10** in jedem der 9 Kriterien (§2). Die **Struktur der Seite bleibt.** Sie gefällt dem Owner. Sie wird nicht über Bord geworfen, sondern **moderner, lebendiger, hochwertiger und verkaufender** umgesetzt.

---

## 1. Was bleibt (darf nicht schlechter werden)

- **Reihenfolge der Abschnitte:**
  1. Hero
  2. Live-Demo „Elige un canal“
  3. Cómo funciona
  4. Lo que tu agencia gana (Atiende / Organiza / Crece)
  5. Informe
  6. 3D
  7. Planes
  8. Cómo empezar / Quién está detrás
  9. Fuß
- Hero mit echtem Foto bzw. Video und großer Headline. Live-Demo mit Laura und Ficha. Schieberegler leer/möbliert. Zwei Sichten target/public. ES/EN. Copys Wortlaut. Keine Überbreite.
- Messwerte: Lighthouse ≥ 90 (Handy) / ≥ 95 (Desktop), CLS < 0,1, LCP < 2,5 s auf Handy-4G, AA-Kontrast, `prefers-reduced-motion` respektiert.

## 2. Bewertungsraster (Ist laut Owner + Audit, Ziel 10)

| Kriterium | Desktop heute | Handy heute |
|---|---|---|
| Verständlichkeit in 5 Sekunden | 7 | 6 |
| Verkaufbarkeit | 6 | 5 |
| Produkt gut dargestellt | 7 | 6 |
| Gefühl „ich brauche NuovaSolution“ | 5 | 5 |
| Leichtigkeit, den Pilot zu starten | 5 | 6 |
| Seriosität | 7 | 6 |
| Modern (2026, Niveau awwwards) | 5 | 4 |
| Hochwertigkeit | 6 | 5 |
| Verständlich ohne viel Text | 6 | 6 |
| **Gesamt** | **6,5** | **5,5** |

## 3. Deine eigene Recherche (Pflicht, vor dem Bauen)

1. Suche **selbst** Vorbilder auf awwwards.com (Sites of the Day/Month, Kategorie SaaS, Business, Real Estate), godly.website, land-book.com, saaslandingpage.com und bei Produktseiten wie Linear, Stripe, Vercel, Framer, Attio, Ramp.
2. Notiere **je Abschnitt aus §1 mindestens 2 URLs**, mit je einem Satz: welches Muster, warum es zu NuovaSolution passt, und wie es auf dem Handy aussieht.
3. Wähle **ein durchgehendes Bewegungs- und Gestaltungssystem** (§5). Nicht jeder Abschnitt bekommt ein eigenes Muster.
4. Lege das als `REFERENZEN_1109_v1.md` ab, **bevor** du baust. Die Bibliotheken wählst du selbst (zum Beispiel GSAP + ScrollTrigger, Motion, Lenis). Begründe Gewicht und Ladezeit.

## 4. Handy: Mängel des Owners (M1109_01–08) + Audit

1. **Hero wirkt statisch, nichts bewegt sich** (M1109_01–02).
   - **Audit-Befund:** Auf den Bildern ist das iPhone im **Stromsparmodus** (gelbes Batteriesymbol). Dann blockiert iOS das automatische Abspielen von Videos.
   - **Pflicht:**
     - Prüfe, ob `video.play()` abgelehnt wird.
     - Falls ja: animiertes Standbild, also langsamer Zoom-und-Schwenk (Ken Burns) per CSS, plus eingeblendete Bewegung im Text, zum Beispiel einer „Nachricht kommt an“-Bubble.
     - Der Hero darf nie tot wirken, auch nicht bei Stromsparmodus oder `reduced-motion`. In diesem Fall gibt es eine sanfte Überblendung statt Bewegung.
2. **Atiende / Organiza / Crece liegen nebeneinander zum Wischen** (M1109_05–07).
   - Der Owner sagt: Auf dem Handy wird **nur nach unten** gescrollt, nie seitlich. Rechts angeschnittene Karten („Fi…“, „Or…“) wirken kaputt.
   - **Pflicht:** untereinander, als gestapelte Karten beim Scrollen (wie Desktop §3.4 im Desktop-Bericht).
3. **Bild leer/möbliert unterschiedlich hoch**, wie am Desktop. Das Bildpaar muss pixelgleich sein.
4. **Schwarze Schilder im Bild** bei 02 Modelo und 04 Entrega (M1109_08).
   - „Casa de ejemplo ficticia, visualización“ liegt **über** „La planta ba…“, die beiden überdecken sich.
   - Der Owner sagt: **Das darf da nicht stehen.**
   - **Pflicht:** Keine Schilder auf Bildern. Der Hinweis „ejemplo ficticio“ steht **einmal je Abschnitt** als kleine graue Bildunterschrift **unter** dem Bild. Die Etagen-Beschriftung („Planta baja / alta“) erscheint als eigene, nicht überlappende Marke, nur solange die Etage zu sehen ist.
5. **Insgesamt zu wenig modern, zu wenig „ich brauche das“.**
6. **Audit zusätzlich:**
   - Das **Vorschau-Banner** nimmt am Handy ein Viertel des Bildschirms ein (M1109_01). Es wird einzeilig, einklappbar und ist nur in der Vorschau da.
   - „Repetir demo“ bricht in zwei Zeilen um (M1109_02). Es wird ein Symbol-Knopf.
   - Die **feste Leiste „Solicitar una demo“ unten** verdeckt zusammen mit der Browserleiste viel Inhalt. Beim Runterscrollen ausblenden, beim Hochscrollen und am Ende einblenden. Schlanker.
   - „Cómo funciona“ am Handy: braune Titel und Kreise, der letzte Schritt ist grau und wirkt ausgeschaltet (M1109_04). Hier kommt die neue Lösung aus §6.3 hin.
   - „a la ficha“ mit braunem Kreis (M1109_03) wird zu einem Akzent nach §5.

## 5. Durchgehendes System (Handy + Desktop)

- **Farbe:** Knöpfe **Schwarz** (Haupt) bzw. **Weiß mit Rahmen** (Neben). **Eine** Akzentfarbe, Owner-Wahl siehe Prompt, Empfehlung **D**, nur für aktive Zustände, Links, Diagramme, Kicker. **Kein Braun auf Knöpfen, Zahlen-Punkten oder Titeln.** Grün nur am WhatsApp-Zeichen. Diagramme in Tönungen **einer** Farbe. „Nicht Kindergeburtstag.“
- **Muster, mehr nicht:**
  - Hero mit Bewegung
  - Live-Demo mit Auto-Lauf
  - Scroll-Erzählung (sticky)
  - gestapelte Karten
  - Erkenntnis-Karten
  - Vergleich
  - aufgehende Schritt-Karten
- **Bewegung:**
  - Einblenden beim Scrollen mit kurzem Versatz.
  - Zahlen, die hochzählen.
  - Sticky-Abschnitte und gestapelte Karten.
  - Mikro-Animationen in den Produktbildern: Nachricht tippt, Ficha füllt sich, Badge „Alta“ erscheint.
  - Hover-Anheben (Desktop), Druck-Feedback (Handy).
  - Leichter Parallax nur im Hero.
  - Dauer 200–600 ms, weiche Kurven, 60 fps auf einem Mittelklasse-Handy.
- **Text:** je Abschnitt 1 Überschrift + 1 Satz sichtbar, der Rest im Produktbild oder auf Tipp. „Datos de ejemplo“ einmal je Abschnitt.
- **Produktbilder:** immer ganz sichtbar oder sauber maskiert. Nie halbe Wörter wie „Respondida 23:4“ oder angeschnittene Spalten.

## 6. Abschnitt für Abschnitt: Ziel

Die Owner-Sätze stehen im Desktop-Bericht §3. Hier steht nur das Ziel, die Form wählst du nach §3.

1. **Hero:**
   - Bewegung (Video oder Ken-Burns-Ersatz).
   - Darunter eine **Schmerz-Zeile mit Zahl** als Beispiel, Wortlaut von Copy.
   - Ein schwarzer bzw. weißer Hauptknopf. Ein Angebot.
2. **Live-Demo:**
   - Auto-Lauf durch die 4 Kanäle mit Fortschrittsbalken in jedem Chip.
   - Klar erkennbar antippbar.
   - Am Handy Chips 2 × 2 oder ein Segment-Schalter, ohne Umbruch-Fehler.
3. **Cómo funciona:**
   - **Keine Pfeile, keine Linie.**
   - Desktop: sticky Scroll-Erzählung, links die 4 Schritte, rechts **ein** Produktbild, das sich verwandelt.
   - Handy: dieselbe Erzählung untereinander, das Bild wechselt pro Schritt.
4. **Atiende / Organiza / Crece:**
   - Gestapelte Karten, untereinander, ohne Akkordeon und ohne Zickzack.
   - Echter Nutzen: antwortet in Sekunden rund um die Uhr; erkennt die Absicht; alles im CRM; **Puntuación y prioridad con motivo**; die richtige Person wird benachrichtigt; Tareas del día; Canal de origen; Inmuebles que encajan.
   - „Idioma“ nur als ein Punkt.
5. **Informe:**
   - Nur **einmal**, gerahmt als **Wachstum / Potenzial** der Agentur.
   - 3 Erkenntnis-Karten mit nächstem Schritt, dann ein kompakter Bericht.
   - Keine „No medido“-Kacheln.
   - Höchstens 4 Vergleichszeilen sichtbar.
6. **3D:**
   - **Erst der Nutzen** (3–4 Punkte): besser vorstellbar als Fotos, Bilder für Redes/Portales, mehr Eigentümer wählen die Agentur, Kooperation mit Interioristas.
   - Schieberegler mit pixelgleichem Bildpaar und Ziehen-Hinweis (einmaliges Wackeln + „Arrastra“).
   - 02/04 ohne Schilder auf dem Bild.
   - Etagen-Marke.
   - „Tu camino“ als 3 aufgehende Karten.
7. **Planes:**
   - Kreis + Haken in allen Spalten, auch Growth.
   - Knöpfe schwarz/weiß.
   - Growth dezent hervorgehoben + „Recomendado“.
   - Am Handy Pläne als Karten untereinander, keine Tabelle zum Wischen.
8. **Cómo empezar:**
   - Ausgeglichen, ohne leere Fläche.
   - Schritte einfarbig, ein schwarzer Knopf.
   - Vertrauen („Quién está detrás“, EU-Datenbank, Asistente-Hinweis) daneben bzw. darunter.
9. **Angebot überall gleich:** siehe Owner-Zeile im Prompt (Piloto gratuito).

**Wahrheit:** Jeder neue Nutzensatz geht über Copy und bleibt **WORKING**, bis er gegen den Funktionsstand belegt ist (`3D_FEATURE_TRUTH`, Feature-Register). Keine Verkaufs-, Umsatz- oder Werbebudget-Zahl ohne Beleg. Die Sicht `public` zeigt nur, was live ist.

## 7. Selbstprüfung vor jeder Abgabe (Pflicht)

1. **Kritiker-Durchgang:**
   - Bewerte jede der 9 Zeilen aus §2, getrennt für Handy und Desktop.
   - Belege jede Note mit einem Bild.
   - **Alles unter 9 baust du weiter, bevor du abgibst.**
   - Ein unabhängiger Prüfer ist erwünscht, zum Beispiel ein eigener Durchgang ohne deinen Bauplan, nur mit Seite und Raster.
2. **Owner-Sätze abhaken:** eine Tabelle, je Satz aus dem Desktop-Bericht §3 und §4 hier eine Zeile: Mangel → Lösung → Bild vorher/nachher.
3. **Geräte:**
   - Echtzeit-Videos: Handy 390 × 844 (iPhone-Emulation) **auch mit Stromsparmodus-Verhalten** (Autoplay abgelehnt), dazu 360 und 414, Desktop 1440 × 900 und 1366 × 768.
   - Lighthouse-Werte.
   - `reduced-motion`-Probe.
4. **Regression:** Hero, Live-Demo und Schieberegler mindestens so gut wie fdffcf4, das zeigst du mit Bildern.

## 8. Ablauf und Termine (PC des Owners Mo–Fr 09–15)

| bis | was |
|---|---|
| Di 10.11. 12:00 | `REFERENZEN_1109_v1.md` + Bauplan je Abschnitt (kurz) |
| Mi 11.11. 14:00 | Zwischenschau 3: Videos Handy + Desktop, Selbstbewertung §7 |
| Fr 13.11. 14:00 | fertiger benannter Build, Rückgabe-Tabelle, Prüf-Suite, dann RV6 und Copy-Textprüfung, Owner-Abnahme |

Passt ein Termin nicht, nennst du ihn am Di 12:00 mit Grund. Dann gilt Qualität vor Termin, aber **keine Abgabe unter 9** in einer Zeile.

## 9. Was du sonst noch lieferst
- Das Logo-PNG 1024 × 1024 für Meta (Social K5) als `docs/website_redesign/brand/logo_1024.png`: quadratisch, aktuelles Zeichen auf Weiß, mit Rand.
