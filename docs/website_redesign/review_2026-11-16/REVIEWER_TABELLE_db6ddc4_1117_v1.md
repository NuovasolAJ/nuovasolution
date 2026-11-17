# Ergebnis der einen Lieferung `db6ddc4` · Di 17.11.2026 · Reviewer (RV6)

**Für Owner und Audit.** Keine Note — die Noten kommen Mi nach dem festen Build.

**Gemessen auf:** `db6ddc4` = `dpl_Ee21bBrbs6zjjjD2MiBWxaEy4onj`, fester Link, `/api/build`
geprüft. **Vergleichsstand:** `dd2035b`. Belege: `checks/p1234-db6ddc4.json`,
`checks/p715-db6ddc4.json`, `checks/fu-db6ddc4.json`, `checks/inv-db6ddc4.json`,
`checks/presel-db6ddc4.json`; Bilder in `shots/db6ddc4/`.

---

## Die Tabelle

| # | Punkt | Urteil | Messung | Bild |
|---|---|---|---|---|
| **1** | „Ver" in der Karte, ohne Scrollen im Bild | **bestanden** | in der Karte, bündig (0 px links, 0 px rechts); sichtbar **636 px** bei 390, **555–660 px** bei 1440 (verlangt 120); Seite rollt 322–616 px selbst | `shot-db6ddc4-ver-390.png`, `…-ver-1440.png` |
| **2** | Null Wisch-Reihen am Handy | **bestanden** | bei 390 **kein einziges** Element waagerecht scrollbar | `shot-db6ddc4-p13-390.png` |
| **3** | Paketknöpfe und Vorauswahl | **bestanden** | Knöpfe 220 × 44 (1440) und 328 × 44 (390), gleiche Höhe wie der Kopf-Knopf, eine Zeile. Vorauswahl **alle sechs Wege**: `pilot+essential` → „Piloto gratuito · plan Essential"; `pilot+growth` → „Contratar Growth"; `pilot+enterprise` → „Contratar Enterprise"; `contratar+essential/growth/enterprise` → „Contratar Essential/Growth/Enterprise". **Enterprise ist repariert** | `shot-db6ddc4-p7-1440.png` |
| **4** | Farbe B | **bestanden mit einer Rückfrage** | **0 Braun**, **0 Gold**; `--brand` `#1a1917`, `--accent` `#1a1917`, `--signal-attention` `#5b5b61`. **Ein** blauer Wert bleibt: `fill rgb(223,233,239)` (Farbton 203°, Sättigung 33 %, **Helligkeit 91 %**), fünfmal als Füllung in einer 466 × 478-Grafik | `shot-db6ddc4-p9-1440.png` |
| **5** | Demo-Antworten wortgleich | **bestanden, 12 von 12** | WhatsApp, Email, Formulario web (Kopf + Antwort), Teléfono, Story — je ES und EN, Zeichen für Zeichen gegen Copys `5445214`. **Die englische Story-Antwort ist jetzt englisch** | — |
| **6** | Handy-Tiefe ≤ 21 | **bestanden** | 390 × 844, Zielsicht, durchgescrollt: **20,6 Bildschirme** ohne Vorschau-Möblierung (mit Möblierung 21,4; die Möblierung misst 144 px und gehört nicht zur Seite). Vorher `dd2035b`: 25,0. Desktop **13,9** (vorher 15,8) | — |
| **7** | Offene Bereichskarte am Desktop | **bestanden** | offene Karte **1 200 px = ganze Reihenbreite**, Rest links und rechts 0 px, Inhalt in **3 Spalten**, die beiden geschlossenen Karten darüber | `shot-db6ddc4-p7-1440.png` |
| **8** | Vergleich | **bestanden** | **7** Datenzeilen beim Laden sichtbar, kein „Ver la semana completa" mehr; „Con NuovaSolution" vorgewählt; Umschalter **44 px**, Gewicht **500**, Rundung **999 px** wie die Paketknöpfe; „lo que alguien anote" **13 px**, `nowrap`, **einzeilig** | `shot-db6ddc4-p9-1440.png` |
| **9** | 3D am Desktop ohne Pin | **bestanden, mit einer Zahl zur Entscheidung** | **kein** Vorfahre mit `sticky`/`fixed`; alle **vier** Reiter schalten. Größte leere Fläche im Abschnitt **146 px** (dann 137 px) — **meine schriftliche Grenze war 120 px**, sie ist um 26 px überschritten. Die Beanstandung des Owners (ein ganzer Bildschirm Weiß, `W1117_05`) ist damit weg; nach dem Buchstaben meiner Bedingung ist sie es nicht | `shot-db6ddc4-p9-1440.png` |
| **10** | Nur der aktive Schritt hervorgehoben | **bestanden** | `is-past` zeichnet **nichts**: Grund durchsichtig, Rahmen 0 px, kein `::before`/`::after`. Nur `is-on` hat einen Grund (`#efefef`). Genau **eine** Karte hervorgehoben, keine in Blau | `shot-db6ddc4-p9-1440.png` |
| **11** | Gratis-Weg nur bei Essential | **bestanden nach der Regel von heute Mittag** | Gratis-Knopf **nur** bei Essential (`/contact?interes=pilot&plan=essential`), Growth und Enterprise nur „Contratar directamente". „Todos los planes pueden empezar" und „Cualquier plan puede empezar": **0 Treffer**. **Die neue Regel des Owners (Essential + Growth) ist hier noch nicht drin** — sie kommt als Nachschub (11b) | `shot-db6ddc4-p7-1440.png` |
| **12** | „Cómo empezar" ohne leere Spalte | **bestanden** | Titel oben (volle Breite), darunter **nebeneinander**: Eintrittskarte 682 px ab x = 120, Punkte 504 px ab x = 816 — Zwischenraum 14 px, keine leere Spalte | `shot-db6ddc4-p12-1440.png` |
| **13** | 3D-Marke nur einmal | **bestanden** | „Casa de ejemplo ficticia" im 3D-Abschnitt **genau einmal**, auf hellem Grund (Helligkeit 96 %), keine schwarze Pille mehr | `shot-db6ddc4-p13-390.png` |
| **14** | Abspielknopf 48 px | **bestanden** | `.m3d-play-mark` **48 × 48 px** bei 390 **und** 360; am Desktop 64 px (die Bedingung galt ≤ 639 px) | `shot-db6ddc4-p13-390.png` |
| **15** | Paketkarten am Handy ohne Stapeln | **bestanden** | alle drei Paketkarten `position: static`, **0 px Überlappung** zwischen aufeinanderfolgenden Karten; Trust (4) und Informe (3) behalten ihr `sticky` | `shot-db6ddc4-p13-390.png` |
| **+** | Unterer Knopf und Umschalter | **bestanden** | `.mcta-main` **44 px**, Rundung 999 px — dieselbe wie `.plans-cta`; `.cmp-option` 44 px | — |
| **+** | Kein rohes `{precio}`, kein „En preparación" | **bestanden** | je **0 Treffer** | — |
| **+** | Nichts verloren (gegen `dd2035b`) | **bestanden** | **kein** Satz ersatzlos verschwunden; alle 28 Routen da, Satzzahl **1 449 → 1 469** | — |

---

## Die drei Stellen, an denen ich nicht nur „bestanden" sage

**Der eine blaue Wert (4).** `rgb(223,233,239)` ist ein sehr blasses Blaugrau (Helligkeit 91 %),
das fünfmal als Füllung in einer Grafik steht. Nach dem Buchstaben meiner Bedingung (Farbton
190–260°, Sättigung ≥ 15 %) ist es ein Treffer; dem Auge ist es ein heller Grauton mit einem Stich.
**Der Owner entscheidet**, ob dieser Stich bleiben darf. Alles andere Blau ist weg.

**Die 146 px im 3D-Abschnitt (9).** Der Pin ist weg, die Reiter schalten überall, der ganze
Bildschirm Weiß aus `W1117_05` ist verschwunden. Meine schriftliche Grenze von 120 px ist trotzdem
um 26 px gerissen, an einer Stelle zwischen Text und Schrittnummer. **Ich melde beides**, statt die
Bedingung nachträglich zu lockern, die ich selbst gesetzt und Redesign geschickt habe.

**Die Regel zu (11) hat sich während der Messung geändert.** Gemessen ist die Fassung von heute
Mittag: Gratis nur bei Essential — die ist **erfüllt**. Die neue Fassung des Owners (Gratis bei
Essential **und** Growth, Enterprise nichts, Betreff „Piloto gratuito · 14 días con Growth") steht
in diesem Build noch nicht. Ich messe sie nach, sobald Redesign den Nachschub (11b) nennt.

## Was meine eigenen Fehlmeldungen gewesen wären, und warum sie es nicht wurden

- **„Formular fehlt bei `pilot+enterprise`"** — ein Zeitfehler meiner Probe (4,2 s Wartezeit). Mit
  7 s steht das Formular da, mit dem richtigen Betreff. Kein Befund.
- **„Abspielknopf 64 px statt 48"** — die Fenstergröße meiner Probe hatte noch nicht umgeschaltet;
  tatsächlich 48 px bei 390 und 360. Kein Befund.
- **„9 Zeilen im Vergleich statt 7"** — meine Suche zählte den Kopf und den Rahmen mit. Es sind
  genau 7 Datenzeilen. Kein Befund.
- **„Story-Antwort fehlt"** — ich hatte auf der Startseite gesucht; sie steht auf
  `/platform/ai-sales-agent`. Dort ist sie in beiden Sprachen richtig. Kein Befund.
- **„Zehn Sätze verloren"** — nachgesehen: der Knopf „Ver la semana completa" ist absichtlich weg
  (Punkt 8), der Preissatz auf `/packages` ist **ersetzt** („el precio te lo explicamos antes de
  acordar nada" steht da), und vier Sätze auf `/en/platform/ai-sales-agent` sind die **spanischen**,
  die durch die englischen ersetzt wurden. Kein Verlust.
