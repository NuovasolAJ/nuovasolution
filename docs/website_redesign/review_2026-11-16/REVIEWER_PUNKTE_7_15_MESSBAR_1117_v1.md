# Die Punkte (7)–(15) und die Zusätze des Owners — messbar, vor der Lieferung · Di 17.11.2026

**Für Audit, Owner, Redesign, Copy.** Reviewer (RV6).

Der Owner liefert **eine** Lieferung mit Commit und dpl, die (1)–(15) enthält; die Tiefe wird erst
danach gemessen. Damit die Messung in einem Durchgang läuft, steht hier **vor** der Lieferung, was
je Punkt gilt. Grundlage: die Punktliste, wie Redesign sie führt (21.7–21.15), und die Bilder
`owner_evidence_1117/website_1117/W1117_00–10`. **Angesehen habe ich davon bisher zwei** — die
beiden, bei denen die Bedingung ohne Bild nicht eindeutig gewesen wäre:

- **`W1117_02`** (Crece offen, Desktop): Die geöffnete Karte wächst **in ihrer eigenen schmalen
  Spalte** weiter, der Inhalt läuft als langer dünner Streifen, und links daneben — unter „Atiende"
  und „Organiza" — bleibt die Fläche leer. Genau das meint (7).
- **`W1117_10`** (Pakete am Handy): Die Growth-Karte schiebt sich über Essential, **während
  „EQUIPO" gerade erst erscheint**; Essentials Equipo-Zeilen bekommt man nie zu lesen. Genau das
  meint (15). Im selben Bild steht der untere feste Knopf groß und rund — der Zusatz des Owners zu
  `.mcta-main`.

Die übrigen neun Bilder sind durch Dateinamen und Punktliste eindeutig. Weicht beim Messen etwas
ab, sehe ich das betreffende Bild an und sage es dazu.

**Vergleichsstand für „nichts verloren" ist jetzt `dd2035b`** (Owner-Anweisung), nicht mehr
`b81b486`. Die Aufnahme liegt: `checks/inv-dd2035b.json`, 28 Routen, 1 449 Sätze.

---

## (7) Offene Bereichskarte am Desktop

| | Bedingung |
|---|---|
| Breite | Ab 1024 px nimmt die geöffnete Karte die **ganze Reihe**: Breite ≥ Reihenbreite − 2 px |
| Spalten | Ihr Inhalt steht in **2 oder 3 Spalten**: mindestens zwei Kindblöcke mit gleicher Oberkante (± 8 px) und verschiedener linker Kante |
| Reihenfolge | Die **zwei geschlossenen** Karten stehen **über** der offenen (Oberkante kleiner) |
| Leere | Rechts und links der offenen Karte keine leere Fläche: Abstand zum Reihenrand ≤ 2 px |
| Handy | Bei 390 **unverändert** gegenüber `dd2035b` (ich vergleiche die Maße) |

## (8) Vergleich „Sin / Con"

| | Bedingung |
|---|---|
| Offen | Beim Laden sind **alle 7 Zeilen** sichtbar, **ohne** Klick; einen „Mehr/Weniger"-Knopf gibt es nicht |
| Vorwahl | **„Con NuovaSolution"** ist vorgewählt |
| Umschalter | `.cmp-option` **44 px** hoch, Schriftgewicht 500, dieselbe Rundung wie die Paketknöpfe (Radius auf 1 px gleich) |
| „lo que alguien anote" | **einzeilig** (`scrollWidth ≤ clientWidth + 1`), in der Größe der Erklärung (13 px), nicht in Zahlengröße |

## (9) 3D am Desktop

| | Bedingung |
|---|---|
| Kein Pin | Kein Vorfahre der 3D-Bühne mit `position: sticky` oder `fixed`, keine feste Höhe für eine Scrollstrecke |
| Alle Schritte | Die **vier** Reiter schalten die Bühne **bei jeder Breite**, ohne Scrollen |
| Keine weiße Fläche | Im 3D-Abschnitt keine leere Lücke **> 120 px** (gemessen wie bei „Y además": größter leerer Abstand zwischen zwei bemalten Bändern) |

## (10) Schrittkarten

| | Bedingung |
|---|---|
| Hervorhebung | **Genau eine** Schrittkarte ist hervorgehoben; keine zweite trägt eine „erledigt"-Markierung |
| Farbe | Keine Hervorhebung in Blau (siehe Farbe B) |
| Chat-Blasen | Alle Blasen auf demselben Papierton — höchstens **zwei** verschiedene Hintergrundfarben im Block |

## (11) Gratis-Weg nur bei Essential

| | Bedingung |
|---|---|
| Essential | **beide** Wege: schwarzer Knopf „Empieza 14 días gratis" **und** „Contratar directamente" |
| Growth, Enterprise | **nur** „Contratar directamente" — **kein** Gratis-Knopf, in Tabelle **und** Karten, bei 390 und 1440 |
| Ziel | Der Gratis-Weg führt auf `plan=essential` |
| Text | **0 Treffer** für „Todos los planes pueden empezar" und „Cualquier plan puede empezar" (Copy ersetzt sie bewusst, `a5572ea` §E) — und **0 Treffer** für jede andere Zeile, die den Gratis-Start für alle Pakete verspricht |
| Betreff | Pilot-Betreff fest „Piloto gratuito · plan Essential" / „Free pilot · Essential plan" |

**Das dreht meine gestrige Prüfung um:** „Todos los planes pueden empezar …" war am Montag die
*verlangte* Fassung (PK-0). Jetzt muss der Satz **weg**. Ich führe ihn als beabsichtigte Änderung,
nicht als Verlust.

## (12) „Cómo empezar y qué pasa con los datos"

Ab 1024 px: Titel oben, darunter die Eintrittskarte **und** die vier Punkte **nebeneinander** —
ihre senkrechten Bereiche überlappen sich um ≥ 50 % ihrer Höhe, und links wie rechts bleibt keine
leere Spalte breiter als **120 px**.

## (13) 3D-Schritt 01 am Handy

„Casa de ejemplo ficticia" steht im 3D-Abschnitt **genau einmal**. Kein Element mit diesem Text hat
einen dunklen Grund (Helligkeit des Hintergrunds > 50 %).

## (14) Abspielknopf am Handy

Bei ≤ 639 px: **48 × 48 px** (± 1 px).

## (15) Paketkarten am Handy

Bei 390: **keine** `position: sticky` an den Paketkarten; Trust-, Informe- und Extra-Karten
**behalten** sie. Dazu die Bedingung aus dem Bild W1117_10: jede Paketkarte ist **ganz lesbar**,
bevor die nächste sie überdeckt — gemessen als Überlappung zweier aufeinanderfolgender Karten beim
Scrollen: **0 px**.

---

## Zusätze des Owners, die mit derselben Lieferung gelten

| | Bedingung |
|---|---|
| **Unterer Knopf** | `.mcta-main` **44 px** hoch, gleiche Rundung wie die Paketknöpfe |
| **Umschalter Sin/Con** | siehe (8): 44 px, gleiche Form |
| **Farbe B** | **0** Blau (Farbton 190–260°, Sättigung ≥ 15 %), **0** Gold (35–55°, Sättigung ≥ 25 %), **0** Braun (15–45°, Sättigung ≥ 15 %, Helligkeit 15–55 %); `--brand` = `#1a1917`; Papier- und Elfenbeintöne über 85 % Helligkeit bleiben erlaubt; der eine erlaubte Akzent ist das gedämpfte Grün für Status |
| **Vorauswahl** | alle Kombinationen: Essential mit **beiden** Wegen, Growth und Enterprise **nur** „Contratar"; je Aufruf trägt das Formular das richtige Paket und den richtigen Betreff |
| **Tiefe** | Handy 390 × 844, Zielsicht, nach dem Durchscrollen: **≤ 21** — gemessen **erst**, wenn (1)–(15) alle drin sind |
| **Nichts verloren** | Satzvergleich gegen **`dd2035b`**; bewusst ersetzte Zeilen (Copy `a5572ea` §E, die beiden „alle Pakete"-Sätze) zählen **nicht** als Verlust |
| **Kein `{precio}`** | **0 Treffer** für die rohe Zeichenfolge `{precio}` auf allen Routen, beide Sprachen |

**Je Punkt (7)–(15) gibt es bestanden/nicht bestanden mit einem Bild**, dazu die Tabelle für Owner
und Audit. Die Noten kommen Mittwoch nach dem festen Build, mit einer eigenen Zeile
**„Verkaufsstärke"** für Punkt (16).

**Was ich dafür brauche:** nur Commit und dpl der einen Lieferung. Alles andere liegt bereit.

---

## Nachtrag: Instagram — Prüfbedingung gestrichen, und was dadurch allein noch schützt

Copys `d861ef4` (von mir im Repo gelesen) hält die Entscheidung des Owners vom 17.11. fest:
**„Instagram (En preparación)" gilt nicht mehr.** Die Zielsicht zeigt Instagram und Social Media
als fertige Funktion, ohne Kennzeichnung; „En preparación" steht nirgends mehr. Der Freigabeschritt
(„con tu visto bueno") bleibt, und über Metas eigene Prüfung wird nichts versprochen.

**Gestrichen bei mir:** „Instagram höchstens ‚En preparación' / öffentlich ausgeblendet". Neu
geprüft wird: Instagram ist in der Zielsicht **sichtbar**, der Freigabeschritt steht dabei, und
„En preparación" hat **0 Treffer** auf allen Routen.

**Was damit zusammenfällt, und das gehört gesagt:** Die E2-Regel des Owners vom 07.11. lautete
„Instagram nie als Zusage, **in beiden Sichten**". Für die Zielsicht ist sie damit aufgehoben. Da
die Vorschau seit dem 16.11. abends **ohne Schilder** alles wie die Zielsicht zeigt und offen
erreichbar ist, liest sich Instagram ab diesem Build wie eine fertige Funktion — obwohl der Owner
am 16.11. selbst festgehalten hat, dass Meta-Verifizierung und App Review fehlen.

**Der einzige verbliebene Schutz ist der Schaltertag.** Copy hält das in `d861ef4` ausdrücklich
fest: Ist `instagram` dann nicht in Produktion, bekommt die Zeile „Publicaciones para tus redes:
próximamente." Ich führe Instagram deshalb in der Livegang-Liste (c) **ganz oben** und erinnere
daran, wenn der Tag kommt. Für E2 bleibt bestehen: **eigene Nummer** und **Telefon-Assistent** sind
unverändert in beiden Sichten keine Zusage — nur Instagram ist herausgenommen.
