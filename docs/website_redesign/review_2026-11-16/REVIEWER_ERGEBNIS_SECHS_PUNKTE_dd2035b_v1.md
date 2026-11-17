# Ergebnis der sechs Punkte auf dem Zwischenstand `dd2035b` · Di 17.11.2026

**Für Audit, Owner, Redesign, Copy.** Reviewer (RV6). **Keine Note** — die Notenzeilen kommen am
Mittwoch nach dem festen Build.

**Gemessen auf:** `dd2035b` = `dpl_3RKjY6zyggZzf4Ccky7QWxyh2tWB`, fester Link, `/api/build`
geprüft. **Vergleichsstand:** `b81b486` (Aufnahme vom Dienstagmorgen, 28 Routen, 1 423 Sätze).
Belege: `checks/p1234-dd2035b.json`, `checks/p5c-dd2035b.json`, `checks/inv-dd2035b.json`,
`checks/presel-dd2035b.json`.

---

## Das Ergebnis in einer Zeile je Punkt

| | Punkt | Urteil |
|---|---|---|
| 1 | „Ver"-Inhalt in der Karte, ohne Scrollen im Bild | **bestanden** |
| 2 | Null Wisch-Reihen am Handy | **bestanden** |
| 3 | Paketknöpfe und Vorauswahl | **teilweise** — Maße bestanden, **Vorauswahl bei Enterprise fehlt, und der Pilot-Weg trägt gar kein Paket** |
| 4 | Null Braunwerte | **bestanden** |
| 5 | Demo-Antworten wortgleich | **11 von 12** — die **englische** Story-Antwort steht noch auf Spanisch |
| 6 | Handy-Tiefe ≤ 21, nichts verloren | **nicht bestanden** — **25,0 Bildschirme**; verloren ist nichts |

---

## 1 „Ver" — bestanden

Je Knopf aus frischem Seitenaufruf, Zielsicht:

| | in der Karte | links / rechts | sichtbar nach dem Tipp | Seite rollt selbst |
|---|---|---|---|---|
| **390**, alle drei Knöpfe | ja | 0 px / 0 px | **634 px** | 322 px |
| **1440**, alle drei | ja | 0 px / 0 px | **664 px** | 293–338 px |

Verlangt waren ≥ 120 px — erreicht sind 634 bzw. 664. Der Inhalt sitzt bündig im Rahmen seiner
Karte. Dass die Seite beim Öffnen rund 300 px selbst rollt, melde ich wie angekündigt, werte es
aber nicht als Verstoß.

**Eine Falschmeldung meiner eigenen Suche, damit sie niemand weiterträgt:** Mein Prüfer meldete
„ein loser Block unter der Kartenreihe". Beim Nachsehen ist das `div.ch-extra` — der Abschnitt
„Y además", der dort hingehört und schon vorher da war. **Kein Befund.**

## 2 Null Wisch-Reihen — bestanden

Bei 390 ist auf der ganzen Startseite **kein einziges** Element waagerecht scrollbar
(`overflow-x: auto|scroll` **und** zu breit): Liste leer. Die vier genannten Blöcke einzeln:
`ch-extra`, `plans-table-wr`, `plans-cards`, `trust`, `trust-grid`, `trust-words`, `rep-head`,
`rep-sheet` — überall `scrollWidth = clientWidth`, `overflow` sichtbar. In `plans-cards` stehen
**3 Kinder auf `position: sticky`**, also die Stapelkarten.

## 3 Paketknöpfe — Maße bestanden, Vorauswahl nicht

**Maße (bestanden):**

| | Pilot-Knopf | Direkter Weg | Kopf-Knopf |
|---|---|---|---|
| 1440 | 220 × 44 | 220 × 44 | 68 × **44** |
| 390 | 316 × 44 | 316 × 44 | 172 × **44** |

Gleich breit auf den Pixel, gleich hoch wie der Kopf-Knopf, **kein Umbruch**
(`scrollWidth = clientWidth`), je Paket **beide** Wege vorhanden, der direkte Weg ohne Grund und
mit dünnem Rahmen.

**Vorauswahl (zwei Befunde):**

| Aufruf | `interest` | Betreff im Nachrichtenfeld |
|---|---|---|
| `?interes=contratar&plan=essential` | `contract` | „Contratar Essential" ✓ |
| `?interes=contratar&plan=growth` | `contract` | „Contratar Growth" ✓ |
| `?interes=contratar&plan=**enterprise**` | `contract` | **leer** ✗ |
| `?interes=pilot&plan=essential\|growth\|enterprise` | `pilot` | **leer, und das Paket steht nirgends im Formular** ✗ |

**Ursache des Enterprise-Falls, im Code nachgelesen:** `app/[locale]/contact/page.tsx:34` sucht das
Paket über `isPlanCode(...)` aus `lib/content/plans.ts`. Dort heißen die Codes
`essential | growth | **scale**`, während Tabelle und Links `**enterprise**` verwenden
(`lib/claims.ts`). `isPlanCode("enterprise")` ist damit falsch, das Paket bleibt undefiniert, und
kein Betreff wird gesetzt. Nebenbei: der Anzeigename dort lautet „**Scale**", nicht „Enterprise".

**Der Pilot-Weg** setzt `interest = pilot`, trägt das Paket aber nirgends — die Bedingung des
Owners „das Formular hat das richtige Paket vorgewählt" ist dort nicht erfüllt. Ob das Paket im
Pilotfall überhaupt mitsoll, entscheidet der Owner; gemessen ist, dass es heute fehlt.

## 4 Null Braunwerte — bestanden

Über die ganze Seite gesammelt, **ohne** die Vorschau-Möblierung: **0** Farben im Braunbereich
(Farbton 15–45°, Sättigung ≥ 15 %, Helligkeit 15–55 %). `--signal-attention` ist jetzt **`#5b5b61`**
(neutral), vorher `#8a5a12`.

Neun warme Werte bleiben, alle **oberhalb** des Braunbereichs und damit kein Treffer: die
Elfenbein-Schrift im Hero (`#f8f6f1`, Helligkeit 96 %), der Papierton des Demo-Fensters
(`#ece9e4`, 91 %), zwei Flächen der 3D-Tafel (`#f7f5ef`, 95 %), zwei SVG-Füllungen, und **ein**
Goldschimmer im Schlussfeld (`rgba(201,167,105,0.16)`, Helligkeit 60 %, Deckkraft 16 %). Der
letzte ist der einzige, über den man streiten kann — er gehört zur Farbwahl, nicht zum Braun.

**Palette:** `--brand` ist `#1f4e8c` (Blau), also **A**. Die Owner-Wahl FARBE = A/B steht noch aus;
bis dahin prüfe ich nur die Braunwerte, nicht „Farben nach der Owner-Wahl".

## 5 Demo-Antworten — 11 von 12

Verglichen Zeichen für Zeichen gegen Copys `5445214`, je Reiter **nach** dem Ausspielen der
Tipp-Animation (ich warte, bis der Text drei Sekunden lang unverändert bleibt).

| Antwort | ES | EN |
|---|---|---|
| WhatsApp · Laura | **wortgleich** | **wortgleich** |
| Email · Carmen | **wortgleich** | **wortgleich** |
| Formulario web · Kopf „Respuesta por email · martes 11:33" | **wortgleich** | **wortgleich** |
| Formulario web · Sofía | **wortgleich** | **wortgleich** |
| Teléfono · Álvaro | **wortgleich** | **wortgleich** |
| **Story · Laura** (`/platform/ai-sales-agent`) | **wortgleich** | **fehlt** |

**Der Befund:** Auf `/en/platform/ai-sales-agent` steht die Antwort noch auf **Spanisch**:
„Laura. ¿Qué días y a qué hora te vienen mejor la semana que viene? Una persona del equipo te
propone fecha para la visita." Copys englische Fassung („Thank you, Laura. Which days and times
next week suit you best? …") steht dort nicht. Eine spanische Zeile auf der englischen Seite ist
auch nach der Zweisprachigkeits-Regel ein Fehler.

## 6 Tiefe und „nichts verloren"

### Tiefe — **nicht bestanden**

| | `b81b486` | **`dd2035b`** | Grenze |
|---|---|---|---|
| **Handy 390 × 844**, beide Sichten | 19,1 (16 152 px) | **25,0 (21 089 px)** | **≤ 21** |
| Desktop 1440 × 900 | 15,7 | 15,8 (14 242 px) | — |

Die Seite ist am Handy um **4 937 px** länger geworden, das sind **5,9 Bildschirme**. Die Grenze
von 21 ist um **4,0 Bildschirme** gerissen. Das Desktop-Maß ist praktisch unverändert — der Zuwachs
steckt also im Handy-Layout, was zu den neuen Stapelkarten passt: was vorher nebeneinander
gewischt wurde, steht jetzt untereinander.

**Zur Abweichung von Redesigns Zahl (16,7):** Redesign misst ohne vorheriges Durchscrollen, ich
danach. Vorher sind die unteren Abschnitte durch `content-visibility` noch zusammengeklappt. Für
die Note gilt meine Bedingung, weil sie die Länge misst, die der Besucher tatsächlich durchscrollt.
Der Unterschied ist diesmal groß: 16,7 gegen 25,0.

### Nichts verloren — **bestanden**

Verglichen wurden **nur Prosa-Sätze** (mindestens fünf Wörter, Satzzeichen am Ende), damit
Beschriftungsreihen das Ergebnis nicht verfälschen. Ergebnis: **kein Satz ist verschwunden**, der
nicht auf Copys Streichliste steht. Die sechs Treffer meiner Suche sind drei Knopf-Reihen (die
Beschriftungen haben sich geändert: „Empieza 14 días gratis") und zwei englische Fassungen von
Copys gestrichenen Sätzen („Would the morning or the afternoon suit you better…", „You're looking
in Estepona …, is that right?"). **Alle 28 Routen sind noch da**; die Satzzahl ist von 1 423 auf
1 449 gestiegen. Einzige kleinere Bauteil-Zahl: **sechs SVG-Symbole weniger** auf vier Seiten
(254 → 248, 165 → 159) — passt zu den entfernten Wisch-Pfeilen und Punkten.

---

## Was vor Mittwoch 14:00 zu tun ist

1. **Handy-Tiefe** von 25,0 auf höchstens 21 — Redesigns teuerste Abschnitte nach eigener Messung:
   Bereiche 2,1 · Cómo funciona 2,0 · Demo 1,8.
2. **Enterprise im Formular**: `plans.ts` kennt `scale`, die Links schicken `enterprise`.
3. **Pilot-Weg**: Paket mitgeben oder die Bedingung streichen (Owner).
4. **Englische Story-Antwort** auf `/en/platform/ai-sales-agent`.
5. **FARBE = A oder B** (Owner), damit ich Punkt 4 ganz prüfen kann.
