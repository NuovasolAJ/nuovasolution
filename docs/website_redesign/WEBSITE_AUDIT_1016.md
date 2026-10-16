# WEBSITE-PRÜFUNG 2026-10-16 — jeder Unterpunkt, gemessen am Ziel „10 von 10“

**Stand:** 2026-10-16 · Website-Implementierer → Owner. Geprüft: Deployment `3fae766` /
`dpl_CXhRM6HanhgP7AX4zFinZzjQ1G4N` (https://nuovasolution-design-preview-rks321lhy-nuovasolajs-projects.vercel.app),
alle 25 Routen (Texte gezogen und gezählt), die Owner-Screenshots vom 16.10., die Referenzen fora.so und glaido.com
(Aufnahmen vom 03.10. in `evidence_2026-10-03/references/`), linear.app, 21st.dev, und eine Web-Recherche zu dem, was
gute Seiten 2026 ausmacht (Quellen in §6).

**Die vier Ziele des Owners:** 1 Verständlich auf einen Blick, ohne Monstertexte · 2 Modern, Luxusgefühl, Animationen,
nichts „KI-Default“ · 3 Roter Faden: Schmerz sichtbar, dann Lösung · 4 Conversion: „geil, ich mache den 14-Tage-Test“.

## 0. Kurzfazit, ehrlich

| Ziel | Heute | Warum |
|---|---|---|
| 1 Verständlich auf einen Blick | **4 / 10** | Startseite 3.523 Wörter (Linear: einige hundert). Jedes Kapitel: Eyebrow + Titel + Absatz + Zustandszeile + volle Produkt-UI mit langen Dialogen. Menü „Plataforma“ mit 18 Einträgen und 2-zeiligen Erklärungen. „Empezar“-Abschnitt mit 3 Schritten à 150 Zeichen, 2 CRM-Zuständen, 3 Support-Punkten à 230 Zeichen und 7 FAQ-Zeilen |
| 2 Modern / Luxus | **5 / 10** | Hero-Stimmung stimmt, aber: Neigung 10° kaum wahrnehmbar („Tablet dreht sich nicht“), darunter weiße Karten auf wechselnden Pastellfeldern (sand, sage, sky, stone), Einblend-Animationen pro Abschnitt („poppt wie Laden“), fünf leere Karten im Social-Streifen, 3D-Bild mit sichtbarem internen Viewer-Titel. Das ist das Muster „weiße Karten + Pastell + Fade-in“, das die Recherche als KI-Default beschreibt |
| 3 Roter Faden | **3 / 10** | Es gibt keinen Schmerz-Moment. Die Seite beginnt mit der Lösung („Mientras enseñas una vivienda, Nuova atiende tus consultas“) und erklärt danach sechs Kapitel Produkt. CLAUDE.md verlangt: Schmerz → Verlust sichtbar → Geschwindigkeit → Lösung → Beweis. Nichts davon ist gebaut. Sechs Zustandszeilen „Prototipo · todavía no disponible“ auf der Verkaufsseite sagen sechsmal „noch nicht fertig“ |
| 4 Conversion | **4 / 10** | Primärknopf im Hero ist „Ver cómo funciona“ (scrollen), nicht der Test. Kein Bild davon, was in den 14 Tagen passiert. Kein echter Beweis (erlaubt, aber spürbar). Pakete ohne Preis, dreimal „te decimos el precio“. Widersprüche zwischen Startseite und Unterseiten untergraben das Vertrauen genau im Moment der Entscheidung |

**Gesamtbild:** Die Seite ist eine ehrliche, vollständige Produkt-Dokumentation im Gewand einer Landingpage. Sie erklärt,
statt zu verkaufen. Jede Einzelregel der letzten Runden (Zustandszeilen, Kanal-Wahrheit, Paketstaffel, Demo-Kennzeichnung)
ist für sich richtig und zusammen zu viel auf einer Seite.

## 1. Befunde je Unterpunkt

Beleg = was auf dem Deployment gemessen oder gesehen wurde. Ziel = was „10 von 10“ hier konkret heißt.

### 1.1 Hero (erster Bildschirm)

| # | Befund | Beleg | Ziel 10/10 |
|---|---|---|---|
| H-1 | Kein Schmerz, keine Verlust-Visualisierung. Die erste Aussage ist die Lösung | H1 „Mientras enseñas una vivienda, Nuova atiende tus consultas“; kein Element zeigt eine verlorene Anfrage | Der erste Bildschirm zeigt in 5 Sekunden den Verlust (Anfrage kommt, niemand antwortet, Kunde geht zur nächsten Agentur) und dann Nuova als Antwort. Eine Aussage, ein Bild, ein Knopf |
| H-2 | Vier Ebenen existieren technisch, wirken aber nicht. Sterne/Foto/Hügel bewegen sich 19/12/6 px auf 420 px Scroll; das Panel neigt sich 10° → 0° | master-check `d1440-depth`; Owner: „Tablet dreht sich nicht nach vorne“ | Fora-Prinzip, angepasst: Himmel mit Sternen → ferne Küste → dunkles Land mit der Szene der Agentur → Produktfläche, die beim Scrollen spürbar aufsteht (≥ 18°, Scrub an den Scroll gebunden, nicht an die Zeit). Jede Ebene erkennbar als eigene Ebene |
| H-3 | Das Panel ist eine dichte Produkt-UI (Chips, Situationszeile, 2 Blasen, Kundenkarte, Aufgabe, Zustandszeile) | Owner-Screenshot 1; Panelhöhe 496 px, Oberkante bei 672 px von 900 | Ein Produkt-Ausschnitt mit einer Aussage („Antwort in 20 Sekunden, Aufgabe für Marcos nach der Besichtigung“), nicht die ganze Oberfläche |
| H-4 | Textblock über dem Produkt zu lang (Eyebrow, 2-zeilige H1, 3-zeiliger Lead, 2 Knöpfe, Testzeile) | 7 Textelemente vor dem Produkt | H1 + ein Satz + ein Knopf (Test) + ein Textlink (ansehen) |
| H-5 | Primärknopf ist „Ver cómo funciona“ | hero-cta-main | Primär: „Probar 14 días gratis“. Sekundär: „Ver cómo funciona“ als Link |
| H-6 | Übergang Hero → Story ist jetzt eine harte dunkle Kante | hero-d1440-es-transition.png | Die Produktfläche selbst trägt die Seite von dunkel nach hell (sie ragt über die Kante), kein Band, keine Kante |

### 1.2 Story A–F und Social-Streifen

| # | Befund | Beleg | Ziel 10/10 |
|---|---|---|---|
| S-1 | Sechs Kapitel + Social + 3D + Empezar + Pakete + Fragen = 3.523 Wörter auf einer Seite | Textzählung /es | ≤ 900 Wörter auf der Startseite. Sechs Kapitel werden zu vier Momenten: Verlust → Antwort → Chance → Team. Details auf Unterseiten |
| S-2 | Jedes Kapitel wiederholt die Form: Eyebrow, H3, Absatz, Zustandszeile, weiße Bühne auf Pastellfeld | 6× gleiche Struktur, Felder sand/sage/sky/stone/sand/sage | Vier verschiedene Formen: ein großer Satz, eine gepinnte Szene, ein Vergleich, eine Zahl. Ein Grund, nicht ein Pastell pro Kapitel |
| S-3 | „A la mañana“ (Kapitel D) steht auf einem anderen Hintergrund (himmelblau) als die Nachbarn | `.story-field-sky` nur hier; Owner: „andere Hintergrundfarbe, ploppt“ | Ein Bühnenprinzip für alle Szenen; Farbe trägt Bedeutung (z. B. nur die wichtige Anfrage bekommt den Akzent), nicht Abwechslung |
| S-4 | Beim Scrollen blendet jeder Abschnitt ein, Listen springen nacheinander auf | `Reveal` pro Kapitel, `AnimatedList` in A/C/E; Owner: „als ob es laden würde“ | Keine Einblendung pro Abschnitt. Bewegung nur, wo sie etwas erklärt, und an den Scroll gebunden (gepinnte Szene, die sich beim Scrollen entwickelt); sonst steht die Seite still |
| S-5 | Sechs Zustandszeilen „Prototipo · todavía no disponible“ auf der Verkaufsseite | Zeilen 176, 224, 248, 265 im Text von /es; plus Kanal- und Sprachzustände | Wahrheit an einem Ort: eine Seite/ein Block „Qué está disponible hoy“, verlinkt aus Fußzeile, Paketen und Prüfung. Die Startseite verkauft die Zielversion ohne sechs Fußnoten (Freigabe von Copy/Audit nötig, §4) |
| S-6 | Dialoge noch immer lang; die Antwort in B/C/E jeweils 3–5 Zeilen, Kapitel C mit zwei Objektkarten plus Antwort plus Rechtehinweis | Zeilen 213, 236 im Text | Eine Nachricht pro Szene, max. 2 Zeilen; der Rest als Bild |
| S-7 | „Jarvis“ öffentlich: 5× Startseite, 2× jede Seite (Menü), 3× Paketseite | Zählung | Interner Name nie öffentlich. Öffentlich: „el asistente de la mañana“ / „la lista de la mañana“ |
| S-8 | Social-Streifen: fünf weiße Karten, drei davon fast leer („Aprobada por ti · miércoles 12:10“ allein in einer Karte) | Owner-Screenshot 4: „leer und tot“ | Eine lebendige Szene: ein echtes Instagram-Post-Mockup mit dem Kommentar und der erlaubten Antwort darunter, ein Satz dazu. Keine fünf Kästen |
| S-9 | Kapitel F (Ergebnis) zeigt drei Kästen mit Zahlen und einem Mail-Mockup, der Mail-Knopf „Ver el informe completo“ führt ins Login | Owner-Screenshot 1 unten | Ein Satz + eine Zahl, die etwas bedeutet („23 consultas atendidas · 6 visitas pedidas“), und der Knopf „Probar 14 días“ |

### 1.3 3D-Abschnitt

| # | Befund | Beleg | Ziel 10/10 |
|---|---|---|---|
| D-1 | Stufe 04 „Vista giratoria“ ist ein Standbild; darin lesbar der interne Viewer-Titel „Browser viewer with the study furnishing (run-20261005-120000-study)“ und die Viewer-Bedienelemente | `public/media/3d/living-viewer-1200.webp`; Owner: „Objektnamen … env … sieht scheiße aus“ | Ein kurzer Drehvideo-Loop des Hauses (Turntable, ohne Dach), ohne UI, ohne Dateinamen; vom 3D-Lane gerendert |
| D-2 | Schieberegler „Primera versión / Diseño revisado“ zeigt zwei möblierte Varianten; die gewünschte Aussage „ohne Möbel → mit Möbeln“ fehlt | MEDIA_SOURCES_1010 §2; Owner: „unten links einmal möbliert und ohne Möbel“ | Ein Regler oder Umschalter: derselbe Raum, dieselbe Kamera, leer → möbliert. Fehlt als Material (3D-Lane, §4) |
| D-3 | Vier Karten + Regler + Video + 5-zeiliger Hinweistext | Owner-Screenshot 3 | „Plano → modelo → render → gira“ als eine Zeile; ein Video; ein Satz |

### 1.4 Menü „Plataforma“ und Unterseiten

| # | Befund | Beleg | Ziel 10/10 |
|---|---|---|---|
| P-1 | Mega-Menü mit 4 Spalten × 4–5 Einträgen, jeder mit 2-zeiliger Erklärung (≈ 250 Wörter im Menü) | Owner-Screenshot 2: „total verwirrend“ | 4 Einträge, je ein Wort + ein Icon; Erklärung auf der Zielseite, nicht im Menü |
| P-2 | /platform erklärt den alten Produktstand: Module „AI Sales Agent, Lead Intelligence, CRM, Tareas diarias“ (englische Namen), 3D „A petición“, Telefon „En construcción … hoy no forma parte de lo que se puede contratar“ | Text /es/platform | Eine Produktdefinition für alle Seiten. Die Unterseiten zeigen dieselben vier Aufgaben wie das Menü und die Startseite, mit denselben Namen |
| P-3 | Widerspruch Startseite ↔ Plattform: Hero-Lead nennt „formulario web y teléfono“ als Kanäle, Kapitel B nennt beide Prototyp, /platform nennt das Telefon nicht buchbar, Enterprise-Paket verkauft „Asistente telefónico · hoy en español“ | Texte /es, /es/platform, /es/packages | Ein Kanalstatus, einmal entschieden, überall gleich (Copy L-4: zur Telefon-Sprache keine Zeile) |
| P-4 | Doppelter Inhalt: In „Una consulta, de principio a fin“ zeigen „02 · Registrada“ und „03 · Hecha“ dieselbe Lead-Liste | Text /es/platform; Ursache: die zurückgehaltene Daily-Aufnahme fällt auf dieselbe Board-Ansicht zurück wie Schritt 02 (mein Build) | Schritt 03 zeigt die erledigte Aufgabe mit Namen und Uhrzeit, oder der Abschnitt hat zwei Schritte |
| P-5 | Zwei Wortschätze: Startseite „Atender consultas / Gestionar oportunidades / Coordinar tu equipo / Captar y presentar“; Fußzeile und Modulseiten „AI Sales Agent / Lead Intelligence / CRM / Tareas diarias“ | Fußzeile jeder Seite | Ein Wortschatz, die vier Aufgaben, überall |

### 1.5 Pakete

| # | Befund | Beleg | Ziel 10/10 |
|---|---|---|---|
| K-1 | Pakete erklären die Staffel, nicht den Nutzen: „Responder y ordenar lo que llega. Una oficina, un equipo pequeño.“ | Text /es/packages | Pro Paket: für wen (Größe der Agentur), was sich im Alltag ändert (ein Satz), was dazukommt (3 Zeilen), Zahlen |
| K-2 | Kein Preis, dreimal „Precio para tu agencia · te decimos el precio“ | Text /es/packages | Preisentscheidung des Owners. Entweder Preise (Glaido/Fora zeigen sie) oder ein ehrlicher Preisrahmen „desde … €/mes“; nicht dreimal derselbe Ausweichsatz |
| K-3 | „Jarvis“ im Growth-Paket; „Asistente telefónico · hoy en español“ im Enterprise-Paket vs. /platform „nicht buchbar“ | Text | siehe S-7, P-3 |
| K-4 | Essential enthält „formulario web“, Kapitel B nennt das Formular Prototyp | Text | Ein Status |
| K-5 | Zahlungsweg mit 4 Schritten + 4 Fragen auf der Paketseite | Text | Eine Zeile („Factura por transferencia, sin tarjeta, sin renovación automática“), Details in den Fragen |

### 1.6 Empezar / Vertrauen

| # | Befund | Beleg | Ziel 10/10 |
|---|---|---|---|
| T-1 | 4 Schritte à 150 Zeichen, 2 CRM-Kästen à 190 Zeichen, 3 Support-Punkte à 230 Zeichen, 7 Fragen | Textzählung | 3 Schritte à ≤ 8 Wörter, ein Satz zum CRM, 3 Fragen; der Rest auf /trial und /faq |
| T-2 | Kein Beweis-Element (kein Kunde, keine Zahl, kein Zitat) | erlaubt (keine Erfindung), aber die Seite füllt die Lücke mit Text statt mit Produkt | Bis ein echter Beweis existiert: Produkt zeigen (eine echte spanische Antwort von Staging, als Bild) statt erklären |

### 1.7 Login-Bereich, Mail, Social-Screen

| # | Befund | Beleg | Ziel 10/10 |
|---|---|---|---|
| L-1 | Mail-Vorschau zeigt „DEMO AGENCY (STUB)“ als Agenturname | app-report-email-d1440-es.png | Im Stub einen echten Beispielnamen („Costa Homes Estepona“), nie „stub“ sichtbar |
| L-2 | Bericht ist gut geordnet (Label oben, drei Antworten) | Prüfung R16 behoben | bleibt |

### 1.8 Design-System

| # | Befund | Beleg | Ziel 10/10 |
|---|---|---|---|
| G-1 | Überall derselbe Radius, Karten in Karten (Bühne in Kapitel in Feld), Pills, Icons | Screenshots | Zwei Radien (Fläche groß, Element klein), keine Karte in einer Karte, Ränder statt Schatten, Icons nur wo sie etwas bedeuten |
| G-2 | Keine Design-Quelle der Wahrheit: Farben und Typo liegen in globals.css, die Regeln in CLAUDE.md, die Referenzen in evidence-Ordnern | Repo | Eine `DESIGN.md` (Typo-Skala, Abstände, Farben, Bewegung, Verbote) + 4 Referenzbilder; jeder Build wird dagegen geprüft |

### 1.9 Owner-Punkte vom 16.10. (zweite Nachricht), nachgeprüft

| # | Owner | Befund | Beleg | Ziel 10/10 |
|---|---|---|---|---|
| O-1 | „Farbkontrast Hero schwarz, darunter alles weiß“ | Bestätigt. Der Hero ist ein geschlossener dunkler Block (#131416), darunter beginnt Elfenbein mit harter Kante. Auf 1920 px Breite (Owner-Screenshot) ist der Block eine schmale dunkle Bahn mit kleinem Panel und viel Leere links und rechts | hero-d1440-es-transition.png; Owner-Breitbild | Fora-Prinzip: der Himmel läuft nach unten in das Land aus, die Produktfläche trägt die Seite von dunkel nach hell; ab 1600 px Breite skaliert die Szene mit (Bildbreite, Panelbreite, Typo), nicht nur die Mitte |
| O-2 | „Text bei Hero geht im Hintergrund unter“ | Bestätigt. Die erste H1-Zeile ist absichtlich grau (#a39d93) auf grauem Himmel, der Lead liegt über dem Foto; am Breitbild wird beides klein und kontrastarm | hero-d1440-es-0.png; Owner-Breitbild | Beide H1-Zeilen weiß; Lead auf einer ruhigen, dunklen Zone des Himmels (Foto dort abgedunkelt); Kontrast ≥ 7:1 für Display-Text gemessen |
| O-3 | „Plataforma reines Chaos, keine Struktur“ | Bestätigt (P-1, P-2, P-4, P-5): 18 Menüeinträge mit Erklärtexten; auf /platform drei nebeneinander gequetschte Demo-Karten (Owner-Screenshot 3), danach vier Modulkarten mit englischen Namen, dann zwei Grau-Kästen „A petición“ / „En construcción“, dann ein beiger CTA-Block | Text /es/platform; Owner-Screenshot 3 | Menü: vier Worte. /platform: eine Produktgeschichte in vier Szenen, ein Wortschatz, keine Zustandskästen |
| O-4 | „Zu viele verschiedene Farbtöne, nicht stimmig“ | Bestätigt. Auf einer Startseite: Anthrazit-Hero, Elfenbein, Sand-Feld, Salbei-Feld, Himmelblau-Feld, Stein-Feld, WhatsApp-Grün (zwei Töne), Beige-CTA-Block, Champagner-Akzent, Grün-Positiv, Gold-Signal | globals.css `.story-field-*`, Kanalfarben, Signalfarben | Ein System: zwei Flächen (dunkel, Elfenbein), eine Linienfarbe, ein Text-Grau, **ein** Akzent. Kanalfarben nur als kleines Icon, nie als Fläche |
| O-5 | „Zu oft EST…“ | Bestätigt: 17× „EST-…“ auf der Startseite, 4× auf /platform | Zählung | Die Referenz steht einmal in der Kundenkarte; in Dialogen und Überschriften sagt man „el piso de Estepona“. Grenze: ≤ 2 Referenzen pro Seite |
| O-6 | „Inhalt von Textboxen wirkt gequetscht“ | Bestätigt. Die Kundenkarte in B bricht „2 dormitorios, Estepona · EST-204“ und „hasta 320.000 €“ auf drei bis vier Zeilen (Owner-Screenshot 5, Spalte 160 px breit); auf /platform stehen drei Karten in Spalten von ~230 px | Screenshots | Mindestbreite 320 px für jede Tabelle/Karte mit Werten; auf schmalen Spalten Zeile unter Zeile statt zwei Spalten; Zahlen nie umbrechen (`white-space: nowrap`, tabellarische Ziffern) |
| O-7 | „Keine Animationen (nutze 21st)“ | Teilweise: es gibt Bewegung, aber nur Eintritts-Fades und die Hero-Sequenz; nichts, das beim Scrollen eine Szene entwickelt | story-film | Drei scroll-gebundene Szenen (Hero, Verlust-Statement, Team-Morgen) mit Komponenten-Prinzipien aus 21st (Container Scroll, Hero Gallery Scroll, Text-Reveal) in eigener Umsetzung mit motion; Rest still |
| O-8 | „Beim Scrollen tauchen Sachen auf, wirkt wie nicht geladen“ | Bestätigt (S-4): `Reveal` auf jedem Abschnitt, `AnimatedList` in drei Kapiteln | Code | Keine Eintrittsbewegung pro Abschnitt. Die Seite steht beim Scrollen; nur die drei Szenen bewegen sich, an den Scroll gebunden |

## 2. Was Fora, Glaido und Linear wirklich machen (Prinzip, nicht Kopie)

| Seite | Was sie macht | Was Nuova davon nimmt |
|---|---|---|
| **fora.so** (Referenz vom 03.10.) | Dämmerungshimmel, dunkle Hügel mit Bäumen, Produktfläche steigt aus dem Boden; danach **ein großer Satz, der sich beim Scrollen Wort für Wort aufhellt** (gescrubbt), dann ein Produktbild mit **einer** Zeile darunter („Post, discuss, react — the feed your members live in.“), dann „Set up once. Run it the way you want.“ mit einem Absatz rechts. Preise sichtbar. Chat-Blase unten rechts | Die vier Ebenen (Himmel → Küste → Land mit Szene → Produkt) und das **gescrubbte Statement** als Schmerz-Satz: „Una consulta sin respuesta en 30 minutos ya está en otra agencia.“ |
| **glaido.com** | Dunkel, große zweizeilige Headline weiß/grau, lime Akzent nur auf dem Knopf, Produkt-Mockup rechts, Logo-Streifen „works in the apps you use“, **ein Satz als Abschnitt** („Typing is the bottleneck. …“), Vorher/Nachher (gesprochen → sauber), 3 Merkmale in einem Raster mit Linien statt Karten, Testimonials, Preise mit Zahlen, FAQ, Releases | Die **Linien-Raster statt Karten**, der Vorher/Nachher-Moment (langsam vs. Nuova), Großtypo mit Grau/Weiß-Kontrast, Preisklarheit |
| **linear.app** | Headline + ein Satz, Produkt-Screenshot im Hero, drei Säulen je eine Zeile, jede Funktion = Überschrift + 1–2 Sätze + Bild + „Learn more“, Zitate, eine Zahl, Schluss-CTA | **Textdichte**: 1–2 Sätze pro Abschnitt, Details auf Unterseiten |
| Recherche (Quellen §6) | Über dem Falz drei Fragen beantworten (was, warum vertrauen, was tun); eine Conversion-Aktion; Produkt zeigen statt beschreiben; Bewegung erklärt oder bleibt weg; Whitespace und Typo-Hierarchie = „teuer“; Reduced-Motion-Pflicht; KI-Klischees meiden (zentrierter Hero + drei Karten, ein Radius überall, Karten in Karten, Pill-Badges, Inter-Default) | Alles davon ist heute verletzt oder nur halb erfüllt |

## 3. Woher das Problem kommt (damit wir uns nicht im Kreis drehen)

1. **Die Seite trägt die Produktwahrheit an zu vielen Stellen.** Zustandszeilen, Kanalzeilen, Paketfußnoten, Demo-Kennzeichnungen: jede einzeln verlangt (Copy, Reviewer, Audit), zusammen eine Verkaufsseite, die sechsmal „noch nicht“ sagt. Lösung: ein Wahrheitsort, nicht null und nicht sechs.
2. **Es gibt keine Design-Spezifikation.** Jede Runde hat Regeln in Prosa bekommen (Auftrag, Korrekturen, CLAUDE.md), aber nie eine `DESIGN.md` mit Skala, Abständen, Bewegungsregeln und Referenzbildern. Darum driftet jedes Ergebnis zum Durchschnitt („weiße Karten, Pastell, Fade-in“).
3. **Startseite und Unterseiten haben verschiedene Besitzer-Runden.** Die Startseite ist Zielversion, /platform und die Modulseiten sind Stand September. Lösung: ein Inhaltsmodell über alle Seiten, bevor eine Seite gebaut wird.
4. **Pain-first wurde nie gebaut.** CLAUDE.md verlangt es seit Anfang; die Aufträge seit 10.10. haben die Story A–F (Produktgeschichte) priorisiert. Beides gleichzeitig geht nicht auf einer Seite. Entscheidung: die Startseite ist Schmerz → Lösung → Test; die Produktgeschichte wandert auf /platform.

## 4. Was außerhalb des Codes entschieden werden muss (sonst dreht sich die nächste Runde wieder)

| Entscheidung | Wer | Warum sie blockiert |
|---|---|---|
| Die Startseite verkauft die Zielversion; die Produktwahrheit steht an **einem** Ort (Seite „Qué está disponible hoy“) | Owner mit Copy und Audit | Ohne diese Freigabe müssen die sechs Zustandszeilen bleiben |
| Öffentlicher Name des Morgen-Assistenten (statt Jarvis) | Owner, Copy | Betrifft Menü, Startseite, Pakete, Modulseite |
| Preise oder Preisrahmen | Owner | Paketseite ohne Preis bleibt ein Ausweichtext |
| Telefon und Webformular: verkauft, Prototyp oder weg | Owner, API | Widerspruch P-3/K-3/K-4 |
| 3D-Material: Turntable-Video ohne UI, Paar leer/möbliert aus derselben Kamera | 3D-Lane | D-1, D-2 sind ohne Material nicht lösbar |
| Ein echter Beweis (eine echte spanische Antwort, anonymisiert, als Bild; später ein Zitat) | Owner, Hosting | T-2 |

## 5. Der Weg in einer Runde

1. **Inhaltsmodell** (ein Dokument, ≤ 2 Seiten): jede Route, ihre eine Aussage, ihre Wörterzahl-Grenze, ihr Knopf. Startseite ≤ 900 Wörter.
2. **DESIGN.md** mit Typo-Skala (3 Größen Display, 2 Body, 1 Caption), Abstandsskala, 2 Radien, Farben (Elfenbein, Anthrazit, ein Akzent), Bewegungsregeln (nur gescrubbt oder einmal pro Seite), Verbote (Karten in Karten, Fade-in pro Abschnitt, Pastellwechsel, Pills ohne Bedeutung), 4 Referenzbilder (Fora-Hero, Glaido-Statement, Glaido-Raster, Linear-Feature).
3. **Hero-Prototyp** allein abnehmen (Schmerz-Moment + vier Ebenen + aufstehende Produktfläche + Test-Knopf), Desktop und Handy, bevor der Rest gebaut wird.
4. **Rest der Startseite** in vier Momenten, dann Menü und Unterseiten aus demselben Inhaltsmodell, dann Pakete.
5. **Prüfung** gegen DESIGN.md und das Inhaltsmodell (Wörter gezählt, Bewegungen gezählt, Namen gegrept, Widersprüche über Seiten per Skript).

Die beiden Prompts dazu: `PROMPT_REDESIGN_CHAT_1016.md` (für den Redesign-Chat, der die Seite prüft und mithilft) und
`PROMPT_REDESIGN_ORDER_1016_DRAFT.md` (der Auftrag, der aus beiden Berichten zur Mega-Prompt wird).

## 6. Quellen der Recherche

- Fora: https://fora.so (Aufnahmen 03.10. im Repo) · Glaido: https://glaido.com · Linear: https://linear.app
- 21st.dev: Hero Gallery Scroll Animation (YoucefBnm, MIT), Features Bento (Edu Calvo, MIT), Bento Grid (Arihant Jain, Apache-2.0), Bibliotheken Aceternity UI, Magic UI, Motion Primitives, Kokonut UI: https://21st.dev/llms.txt, https://21st.dev/@youcefbnm/components/hero-gallery-scroll-animation, https://21st.dev/@educalvolpz/components/features-2.md
- Conversion-Grundlagen 2026: https://www.flighted.co/blog/10-saas-landing-page-best-practices-that-actually-convert, https://www.embarque.io/post/saas-landing-page-best-practices, https://genesysgrowth.com/blog/designing-b2b-saas-landing-pages, https://vezadigital.com/post/best-saas-landing-page-examples
- „Fühlt sich teuer an“: https://www.iiad.edu.in/the-circle/why-some-websites-just-feel-expensive/, https://skills.cat/skills/rshvr/elite-web-design/elite-design-core, https://banffdigital1.lovable.app/blog/web-design/editorial-web-design-2026
- Beste SaaS-Seiten 2026: https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples, https://www.blendb2b.com/blog/the-15-best-saas-website-examples, https://www.bighuman.com/blog/saas-website-design
- Scroll-Storytelling (Lenis + GSAP ScrollTrigger, gepinnte Szenen, Reduced Motion): https://tessl.io/registry/skills/github/MengTo/Skills/cinematic-scroll-storytelling/review, https://motion.dev/ui/components/parallax-layers, https://www.builder.io/blog/parallax-scrolling-effect
- KI-Klischees: https://noqta.tn/blog/ai-design-slop-overused-ui-patterns-fix-2026, https://www.saasui.design/blog/saas-ui-looks-ai-generated, https://www.superdesign.dev/blog/why-ai-design-looks-generic, https://www.inspoai.io/blog/why-ai-websites-look-generic
- Immobilien-SaaS-Botschaften (Speed-to-Lead, Qualifizierung, Kanäle): https://sleekflow.io/solutions/real-estate.md, https://spoki.com/en/use-cases/real-estate.xml, https://cdn-web.infobip.com/uploads/markdown-exports/www.infobip.com/agentos/conversational-ai-real-estate.md
