# Prüfung des Masterprompts 10/10 · unabhängiger Notengeber · Fr 13.11.2026

**Für:** Owner und Audit. **Von:** Reviewer, neue Rolle bis Mi 18.11.
**Grundlage, selbst gelesen und angesehen:** `REDESIGN_MASTERPROMPT_10V10_1109_v1.md`,
`OWNER_AUDIT_DESKTOP_REVIEW_1109_v1.md`, `O1109_01–17`, `M1109_01–08`, `AUDIT_1109_*`.
**Frage, die hier beantwortet wird:** Was fehlt dem Masterprompt für eine 10, und was widerspricht sich?
Kein Urteil über den Build — das kommt Mo 16.11. und Mi 18.11.

---

## A. Widersprüche — die ersten drei blockieren den Bau

| # | Widerspruch | Warum das den Bau aufhält | Was ich brauche |
|---|---|---|---|
| **A-1** | **Das Angebot.** §6.9 ordnet „Piloto gratuito" überall an. Der Desktop-Bericht §3.7 und §6 führen Copys O-1 („Piloto ersetzt 14 días") als **Audit empfiehlt ja, Owner entscheidet (folgt)**. Im Build stehen heute **drei** Angebote nebeneinander: Hero „Piloto gratuito · precio en la demo" (M1109_01), Hauptknopf „Solicitar una demo", und „14 días gratis, en 3 pasos" + „Pruébalo gratis 14 días" in Cómo empezar und Planes (O1109_17, O1109_15) | „Verkaufbarkeit" und „Leichtigkeit, den Pilot zu starten" können nicht auf 9 kommen, solange drei Angebote auf einer Seite stehen. Redesign kann es nicht raten: §6.9 sagt das eine, die offene Frage das andere | **Eine Zeile vom Owner: Piloto gratuito ja/nein.** Dann zieht Copy den Wortlaut nach, und zwar an allen drei Stellen |
| **A-2** | **Die Akzentfarbe.** §5 ordnet „**eine** Akzentfarbe, Empfehlung **D**" an; der Bericht §6 führt sie als **„Owner entscheidet (folgt)"**. Die Vorschau bietet A–E an | Jede Note für „modern" und „hochwertig" hängt an genau dieser Farbe: Kicker, aktive Zustände, Diagramme, Badges. Wird sie nach dem Bau gewechselt, sind alle Abschnitte erneut zu prüfen | **Eine Zeile: D oder E** — oder ausdrücklich „Redesign entscheidet, Owner stimmt am 16.11. zu" |
| **A-3** | **Das Bildpaar ist nicht Redesigns Aufgabe.** §4.3 und §6.6 verlangen „pixelgleich, gleiche Kamera, gleicher Ausschnitt". O1109_11 gegen O1109_12 zeigt **zwei verschiedene Kamerapositionen**, nicht nur verschiedene Höhen: im leeren Bild steht die Tür weiter rechts und kleiner. Das ist ein **Neu-Rendern bei 3D**, nicht im Browser zu lösen | Der Prompt gibt die Aufgabe an Redesign, ohne 3D, Übergabe oder Datum zu nennen. Bis Mi 18.11. kann genau das still liegenbleiben — und dann fällt eine Zeile, die der Owner ausdrücklich behalten will | **3D benennen, mit Termin vor Mo 16.11.**, und Redesign tauscht nur nach Prüfsumme |
| **A-4** | **„Struktur bleibt" gegen die bestellten Umbauten.** §1 friert die 9 Abschnitte ein und sagt „darf nicht schlechter werden". §6.5 verlangt den Bericht **nur einmal** (heute steht er in Crece **und** als eigener Abschnitt), §3.8 zieht „Quién está detrás" in „Cómo empezar" | Zwei Anweisungen, die sich formal widersprechen. Redesign entscheidet dann selbst, was „Struktur" heißt | §1 um zwei Zeilen ergänzen: Bericht einmal, Vertrauensblock wandert. Dann ist die Liste wieder die Wahrheit |
| **A-5** | **Selbstbewertung gegen unabhängige Note.** §7.1 macht Redesign zum eigenen Richter („Alles unter 9 baust du weiter") und nennt einen unabhängigen Prüfer nur als **erwünscht**. Seit heute bewertet ein unabhängiger Notengeber | Wenn Redesign seine Selbstnote mitliefert und ich sie vorher sähe, wäre meine Note wertlos | §7 um eine Zeile: **die unabhängige Note entscheidet über die Abnahme**, die Selbstbewertung liegt in einer eigenen Datei und wird erst nach der unabhängigen Note geöffnet. (Ich halte das so, ohne dass es im Prompt steht.) |
| **A-6** | **Der Auto-Lauf der Demo.** §6.2 ordnet ihn ausdrücklich an („Auto-Lauf durch die 4 Kanäle"). Meine eigene Prüfliste verbietet ihn seit dem 02.11. (A-10, „kein Reiter schaltet von selbst") — am 07.11. habe ich ihn auf `a5f1d21` als Befund F-3 gemeldet | Sonst melde ich am 18.11. als Fehler, was der Owner bestellt hat | **A-10 gilt als zurückgezogen**, sobald der Owner das bestätigt. Bedingung, die ich prüfe: Klick stoppt, kein Weiterschalten außerhalb des Bildes, `reduced-motion` stoppt ihn |
| **A-7** | **Die Termine im Dokument sind veraltet.** §8 nennt Di 10.11., Mi 11.11., Fr 13.11. | Redesign plant sonst gegen den falschen Kalender | §8 ersetzen: heute 15:00 REFERENZEN + Bauplan, Mo 16.11. 14:00 Zwischenschau 3, Mi 18.11. 14:00 fertiger Build |

---

## B. Was für eine 10 fehlt

### B-1 Die 10 ist nicht messbar beschrieben — das ist die größte Lücke
Die 9 Zeilen sind Gefühle („hochwertig", „modern"). Zwischen 8 und 10 lässt sich damit ewig streiten, und weder
Redesign noch ich können eine Note belegen. **Vorschlag, je Zeile 2–3 beobachtbare Tatsachen** (ich prüfe am 16./18.
genau danach, wenn niemand widerspricht):

| Zeile | Was ich als „10" messe |
|---|---|
| Verständlichkeit 5 s | Auf dem **Standbild des ersten Bildschirms** (1366 und 390) stehen: was es tut, für wen, **ein** nächster Schritt. Kein zweiter Knopf mit gleichem Gewicht |
| Verkaufbarkeit | **Ein** Angebot auf der ganzen Seite, gleich benannt an jeder Stelle; je Abschnitt ein Nutzensatz, der die Agentur nennt, nicht die Funktion |
| Produkt gut dargestellt | **Null** angeschnittene Produktbilder und halbe Wörter (heute „Respondida 23:4", O1109_04); jedes Mock ganz sichtbar oder sauber maskiert; mindestens drei Abschnitte mit bewegtem Produkt |
| „ich brauche das" | Die Schmerz-Zeile mit Zahl steht **im ersten Bildschirm oder direkt darunter**, nicht erst im Bericht |
| Pilot leicht starten | Vom ersten Bildschirm zum Formular **ein** Klick; der Weg ist dreimal gleich benannt; kein widersprüchliches zweites Angebot |
| Seriosität | Keine unfertigen Kacheln („No medido", heute 2× in O1109_10); Hinweise gebündelt, **einmal je Abschnitt**; keine Aussage ohne Beleg |
| Modern | Nur die Muster aus §5; **jedes Muster mindestens zweimal** benutzt (ein Muster, das einmal vorkommt, ist Unruhe); Bewegung 200–600 ms; nichts ruckelt auf dem Handy |
| Hochwertig | **Eine** Akzentfarbe, Knöpfe schwarz/weiß, kein Braun auf Knöpfen/Zahlen/Titeln, Grün nur am WhatsApp-Zeichen, Diagramme in Tönungen **einer** Farbe |
| Wenig Text | Je Abschnitt **1 Überschrift + 1 Satz** sichtbar; sichtbare Wörter je Abschnitt unter einer vereinbarten Zahl (Vorschlag: 60 auf dem Handy) |

### B-2 Der erste Bildschirm ist nicht festgelegt
Drei der neun Zeilen werden oberhalb der Falz entschieden, aber §6.1 sagt nur „Bewegung, Schmerzzeile, ein Knopf".
**Gemessen am 07.11. auf `a5f1d21`:** Eingang und Ergebnis der Demo beginnen bei y ≈ 826 bei 1366 × 768 — unter der
Falz. Auf dem Handy nimmt die Vorschau-Möblierung (Banner + Leiste) rund **ein Viertel** des Bildschirms (M1109_01),
und die Angebotszeile „Piloto gratuito" wird von der Browserleiste abgeschnitten.
**Es fehlt:** ein Satz, was bei 1366 × 768 und bei 390 **im ersten Bildschirm** stehen muss — Nutzen, ein Knopf und
ein sichtbares Stück Produkt — und dass die Vorschau-Möblierung nicht mitzählt, weil sie öffentlich nicht da ist.

### B-3 Das Handy ist die schlechtere Note und der dünnere Teil des Prompts
§4 nennt 6 Mängel, §7.3 nennt 360 und 414 — aber kein Abschnitt sagt, was sich dort ändert. Nicht genannt, von mir
in den Bildern gesehen:
- Der **feste Kopf überdeckt die Abschnittsüberschrift** beim Scrollen („Cada consulta," halb verdeckt, M1109_05).
- **Tippziele**: in M1109_05 sind die Karten-Knöpfe gut, die Vorschau-Leiste hat 28-px-Knöpfe (von mir am 07.11.
  gemessen) — für das Handy gehört ein Mindestmaß in den Prompt (44 px).
- Der **Auto-Lauf** muss außerhalb des Bildes stehen bleiben, sonst springt die Demo, während man liest.

### B-4 Wahrheit und Note ziehen in verschiedene Richtungen
§6 „Wahrheit" ist richtig formuliert, aber die Bewertung belohnt genau die Sätze, die noch nicht belegt sind
(„mehr Abschlüsse", „wachsen", die vier 3D-Nutzenpunkte, „mejor uso del presupuesto"). **Es fehlt der Satz:** ein
Nutzensatz, der noch WORKING ist, **zählt nicht für die Note**. Sonst wird die 10 mit Aussagen erkauft, die die
öffentliche Sicht später verstecken muss — und die beiden Sichten laufen auseinander.
Dasselbe gilt für die drei Erkenntnis-Karten (§6.5): das Beispiel „Portales: 4 consultas. Compara antes de invertir
más" ist eine Aussage über Werbebudget. Welche der drei Karten Copy freigibt, sollte **vor** dem Bau feststehen.

### B-5 „Nicht schlechter als fdffcf4" ist nicht nachweisbar
§7.4 verlangt Regression für Hero, Live-Demo und Schieberegler „mindestens so gut". **Es fehlt:** `fdffcf4` als
feste Grundlage mit URL und beiden Deployment-IDs, und je Teil eine messbare Größe (Hero: LCP und ob Bewegung läuft;
Demo: Dauer eines Durchlaufs und ob der Klick stoppt; Schieberegler: Ziehen bei 390 und ob das Bildpaar deckungs-
gleich ist). Sonst ist „so gut" Auslegungssache, und ich kann sie weder bestätigen noch widerlegen.

### B-6 Die Messwerte brauchen ihre Bedingungen
§1 nennt Lighthouse ≥ 90/≥ 95, CLS < 0,1, LCP < 2,5 s. **Es fehlt:** welche URL, welche Sicht, welche Drosselung,
wie viele Läufe, allein auf der Maschine — und der **Bypass-Header** für die geschützte Vorschau, sonst misst
Lighthouse die Torseite. Dazu: §3.4 erlaubt GSAP/Lenis frei; dann gehört ein Budget dazu (Vorschlag: zusätzliches
JavaScript ≤ 100 kB gzip), sonst steht die Bibliothekswahl gegen die Lighthouse-Zusage.

### B-7 Was zeigt die öffentliche Sicht als Angebot?
Bewertet wird die Sicht `target`. Öffentlich geht `public` live. Ist „Piloto gratuito" das eine Angebot und
`trial`/`publicSignup` sind aus, steht öffentlich **kein** Angebot — oder eines, das niemand entschieden hat.
**Es fehlt:** ein Satz, was die öffentliche Sicht an dieser Stelle zeigt.

---

## C. Was gut ist und so bleiben sollte

Damit nichts davon verloren geht, wenn der Prompt nachgezogen wird: die Trennung „Ziel je Abschnitt, Form wählst du
selbst" (Bericht §1.1) ist die wichtigste Regel des ganzen Dokuments — sie verhindert genau das wörtliche Flicken,
an dem die letzte Runde gescheitert ist. Die Pflicht zu zwei echten Vorbild-URLs je umgebautem Abschnitt ist der
zweite Hebel. Der Muster-Satz in §5 ist kurz genug, um Ruhe zu erzeugen. Und das Gefühl in §0 ist in zwei Sätzen
besser beschrieben als in den meisten Produktbriefings, die ich gesehen habe.

---

## D. Nachtrag 13.11., 14:00 — die Entscheidungen des Owners und die vier offenen Festlegungen

**Entschieden am 13.11., damit gilt:**

| # | Entscheidung | Folge für die Prüfung |
|---|---|---|
| 1 | **Ein Angebot: „Piloto gratuito"**, ein Hauptknopf, Wortlaut von Copy. „Solicitar una demo" und „14 días" raus | Ich zähle die Angebotswörter auf **jeder** Route in beiden Sprachen. „14 días", „Pruébalo gratis", „Solicitar una demo" = **0 Treffer**; der Hauptknopf heißt überall gleich |
| 2 | **Farbe D** | Eine Akzentfarbe. Braun auf Knöpfen, Zahlen-Punkten und Titeln = Befund; Grün nur am WhatsApp-Zeichen; Diagramme in Tönungen **einer** Farbe |
| 3 | **Bildpaar:** Redesign erzeugt heute das Differenzbild; weicht es ab, liefert **3D** neu aus Kamera `main` | Ich prüfe beides: gleiche gerenderte Box **und** gleicher Ausschnitt (D-4 unten) |
| 4 | **Auto-Lauf der Demo ist gewollt** | **A-10 ist hiermit zurückgezogen.** An seine Stelle treten drei Bedingungen: Klick stoppt · kein Weiterschalten außerhalb des Bildes · `reduced-motion` stoppt |
| 5 | Struktur bleibt, der Bericht steht **einmal** | Kein Widerspruch mehr; ich prüfe: der Bericht erscheint genau einmal |
| 6 | Redesign bewertet sich selbst, **meine Note zählt**; unter 9 = keine Abnahme | Ich öffne Redesigns Selbstbewertung erst **nach** meiner eigenen Note |
| 7 | Termine: **Mo 16.11. 14:00** Zwischenschau · **Mi 18.11. 14:00** Build · Rückfall **Do 19.11. 14:00** | — |
| 8 | **Wahrheit:** die 10 gilt der **Zielsicht**; `public` wird auf **„nichts Falsches, kein Loch"** geprüft | Siehe D-5 |

### D-1 Erster Bildschirm (ohne Scrollen, Vorschau-Möblierung zählt nicht mit)

Gemessen auf dem Standbild bei **1366 × 768** und bei **390 × 844**. Alle fünf müssen zutreffen:

1. **Headline** vollständig sichtbar, nicht abgeschnitten.
2. **Ein Satz** darunter (Nutzen), vollständig sichtbar.
3. **Ein Hauptknopf** — und kein zweiter Knopf mit gleichem Gewicht im selben Bildschirm. Der Kopfzeilen-Knopf zählt mit, wenn er dieselbe Füllung hat.
4. **Bewegung läuft** — Video, Ken-Burns oder eingeblendete Bewegung; bei abgelehntem Autoplay und bei `reduced-motion` eine sanfte Überblendung. Der Hero ist nie tot.
5. **Anschnitt der Demo sichtbar:** mindestens **120 px** des nächsten Abschnitts stehen im ersten Bildschirm, sodass erkennbar ist, dass es weitergeht.

Die Vorschau-Möblierung (Banner, Leiste) wird vor der Messung abgezogen bzw. ausgeklappt gemessen; sie ist öffentlich nicht da. Heute frisst sie am Handy rund ein Viertel des Bildschirms (M1109_01), und auf `a5f1d21` begann die Demo erst bei y ≈ 826.

### D-2 Handy 360 und 414, dazu 390

| Regel | Messung |
|---|---|
| Kein seitliches Scrollen | `documentElement.scrollWidth ≤ innerWidth` auf **360, 390, 414** |
| **Tippziele ≥ 44 × 44 px** | jedes `a`/`button`/`[role=tab]`/`[role=slider]` im sichtbaren Fluss; Ausnahme nur die Vorschau-Leiste, die öffentlich fehlt |
| Nichts überdeckt | Der feste Kopf verdeckt **keine** Abschnittsüberschrift beim Scrollen (heute „Cada consulta," halb verdeckt, M1109_05); die feste Fußleiste verdeckt keinen Knopf und keine Angebotszeile (heute „Piloto gratuito" abgeschnitten, M1109_01) |
| Nur nach unten | **0** seitlich wischbare Reihen in Abschnitten 4 und 7 (heute angeschnittene Karten „Fi…", „Or…", M1109_05–07) |
| Keine Umbruch-Fehler | Kein Knopftext bricht in zwei Zeilen (heute „Repetir demo", M1109_02) |
| Keine Schilder im Bild | **0** überlappende Marken auf Bildern (heute zwei schwarze Schilder übereinander, M1109_08); der Hinweis steht **einmal je Abschnitt** unter dem Bild |

### D-3 Regression gegen `fdffcf4` — mit den Werten, die ich heute gemessen habe

**Grundlage, fest:** `fdffcf4` = **`dpl_8Nj8oV6KGStECKCUU3vPs2RheTkr`**,
`https://nuovasolution-design-preview-68obr8h1w-nuovasolajs-projects.vercel.app`, Sicht `target`,
erreichbar mit demselben Bypass-Header. Von mir am 13.11. gemessen:

| Teil | Wert auf `fdffcf4` | Bestanden ist der neue Build, wenn |
|---|---|---|
| **Hero** | Video `hero-a.mp4` läuft (nicht pausiert), dazu das Standbild `hero-a-1920.webp`; **5** laufende Animationen; h1 beginnt bei **y = 409**; Seitenhöhe 10 389 px | Bewegung läuft ebenfalls (Video **oder** Ken-Burns-Ersatz), die Headline beginnt **nicht tiefer** als 409 px, und bei abgelehntem Autoplay bleibt Bewegung sichtbar |
| **Live-Demo** | 4 Reiter; **kein** Auto-Lauf (24 s beobachtet, 0 Wechsel); Klick stoppt (14 s nach dem Klick kein Wechsel) | Auto-Lauf **neu vorhanden** (Owner-Entscheidung 4), Zyklus 6–12 s je Kanal, Klick stoppt weiterhin, kein Wechsel außerhalb des Bildes, Stopp bei `reduced-motion` |
| **Schieberegler** | bei 390: beide Bilder intrinsisch 1200 × 800, gerendert aber **358 × 239** gegen **358 × 224** — die möblierte Seite ist **15 px kürzer**, gleicher oberer Rand | **Δ Höhe = 0 px und Δ Breite = 0 px** bei 360/390/414 und 1366/1440 |
| **Bildausschnitt** | zwei verschiedene Kamerapositionen (O1109_11 gegen O1109_12: die Tür steht an anderer Stelle und in anderer Größe) | Das Differenzbild zeigt **nur Möbel**, keine versetzten Wände, Türen oder Fenster. Weicht es ab, kommt das Paar neu von 3D aus Kamera `main`, und ich prüfe nach Prüfsumme gegen die Übergabe |

Dazu, aus Owner-Regel „nichts wird schlechter": meine bestandenen Zeilen vom 07.11. bleiben bestanden — Kontrast ohne Fehler, Tastatur mit sichtbarem Fokus, 11 Szenen ohne Übersprung bei 800 px/s, keine Bereitschaftswörter, Hinweis auf jeder Vorschau-Route.

### D-4 Lighthouse: Bedingungen, sonst ist die Zahl nicht vergleichbar

| | Festlegung |
|---|---|
| URL | `…/es?view=target` **und** `…/es?view=public`, dazu `…/es/example-report` |
| Zugang | **Bypass-Header** `x-vercel-protection-bypass` als `--extra-headers`; das Geheimnis kommt aus `.nuova-secrets`, steht in keinem Bericht und in keinem Log |
| Umgebung | Edge headless, **allein auf der Maschine** (keine zweite Messung, keine zurückgebliebenen Browser-Prozesse — 238 davon haben am 03.11. die Werte von 91 auf 48 gedrückt), Drosselung „simulated", Handy-Profil für die Handy-Zahl |
| Läufe | **3 Läufe, Median** zählt; alle drei werden abgelegt |
| Ziel | Handy ≥ 90, Desktop ≥ 95, **CLS < 0,1**, **LCP < 2,5 s** (Handy, 4G simuliert). LCP messe ich aus dem Lighthouse-Bericht, nicht aus einem Einzelaufruf im Browser |
| **Gewichtsbudget** | Neu hinzukommende Bibliotheken (GSAP/ScrollTrigger, Motion, Lenis o. a.) zusammen **≤ 100 kB gzip**; das gesamte übertragene JavaScript auf `/es` höchstens **15 %** über `fdffcf4`, gemessen aus der Ressourcen-Übersicht desselben Lighthouse-Laufs. Reißt das Budget, zählt es als Befund, auch wenn die Note noch ≥ 90 ist |

### D-5 Wahrheit: die 10 gilt der Zielsicht, `public` wird auf „nichts Falsches, kein Loch" geprüft

- **Zielsicht:** hier wird benotet. Ein Nutzensatz, der noch **WORKING** ist, zählt **nicht** für die Note.
- **Öffentliche Sicht, zwei Prüfungen:**
  - **nichts Falsches:** keine Aussage über eine Funktion, die `lib/claims.ts` nicht als enthalten führt — gemessen über **jede** Route, auch die Modulseiten (das war am 07.11. meine eigene Lücke, F-6); kein Bereitschaftswort; kein Verbindungsversprechen; das Angebot „Piloto gratuito" nur so, wie der Funktionsstand es trägt.
  - **kein Loch:** kein leerer Abschnitt, keine Überschrift ohne Inhalt, keine Karte ohne Zeilen, kein Knopf ins Leere, keine Route, die 404 oder auf eine leere Seite führt. Wo etwas ausgeblendet wird, schließt sich der Rhythmus.

### D-6 Pfad für Redesign

`docs/website_redesign/REVIEWER_MASTERPROMPT_CHECK_1113_v1.md` — Abschnitt **D** ist der verbindliche Teil für den Bau, Abschnitt **B-1** die Notentabelle, nach der am 16. und 18.11. bewertet wird.

---

## E. Was ich am 16. und 18.11. tue

Bewertung der Vorschau **ohne** Redesigns Selbstbewertung vorher zu lesen: die 9 Zeilen getrennt für Handy
(390, 360, 414, iPhone mit abgelehntem Autoplay) und Desktop (1440, 1366), **je Note ein Bild**; dazu jede
Owner-Beanstandung aus §3 des Desktop-Berichts und §4 des Masterprompts als erledigt ja/nein mit Bild; dazu
Regression gegen `fdffcf4`, Lighthouse, CLS, LCP, AA-Kontrast und `reduced-motion`. **Unter 9 in einer Zeile = keine
Abnahme**, mit konkreter Rückgabe an Redesign. Erst danach die übliche RV6-Checkliste.

**Kennzeichnung:** Prüfung eines Auftragsdokuments, keine Gestaltungsabnahme, keine Freigabe.
