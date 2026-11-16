# Vergleichsbasis `868602c` für den festen Build am Mi 18.11. 14:00 · Reviewer

Der Owner hat am 16.11. sechs weitere Punkte bestellt, jeweils **`868602c` gegen neu, kein
Rückschritt erlaubt**. Damit der Vergleich am Mittwoch zählt, habe ich die Ausgangswerte **heute
selbst gemessen**, mit festgeschriebenen Bedingungen. Alles unten ist der **Ist-Stand von
`868602c`**, nicht das Ziel.

**Build:** `868602c407f1a49b55bf5637f6089f7ff7275d71`, `dpl_5tcEAmVNJrhG3haJ9Fo3NiC7etcs`.
**Bedingungen:** Handy 390 × 844 (dsf 2, mobil), Desktop 1440 × 900; jede Seite vor dem Messen
durchgescrollt und zurück; Sicht jeweils angegeben. Skripte `checks/six.mjs` und `checks/six2.mjs`,
Werte `checks/six-868602c.json` und `checks/six2-868602c.json`.

**Zu den Zahlen des Audits:** Audit nennt für `868602c` 2,1 Bildschirme (Atiende) und 22
Bildschirmhöhen (Handy). Ich messe 1,62 und 25,0. Das ist kein Widerspruch in der Sache, sondern
ein Unterschied in den Bedingungen (Fensterhöhe, Sicht, Messpunkt). **Für den Vergleich am Mittwoch
zählen meine Bedingungen**, weil nur dann Vorher und Nachher dasselbe messen.

---

## 1 Wo öffnet „Ver Atiende / Organiza / Crece" den Inhalt?

Alle drei Knöpfe öffnen **denselben** Bereich, `div.ch-detail-slot`, der **unter allen drei**
Knöpfen liegt (absolut y = 6620). Der Weg vom Knopf zum Inhalt ist deshalb je nach Knopf ganz
verschieden:

| Knopf | Unterkante des Knopfes | Oberkante des Inhalts | Abstand | in Bildschirmen |
|---|---|---|---|---|
| **Ver Atiende** | y = 5252 | y = 6620 | **1368 px** | **1,62** |
| **Ver Organiza** | y = 5927 | y = 6620 | 693 px | 0,82 |
| **Ver Crece** | y = 6602 | y = 6620 | 18 px | 0,02 |

`aria-controls` zeigt auf `ch-detail-attend`, `ch-detail-organise`, `ch-detail-grow`; beim Öffnen
wächst die Seite um 1186, 1124 bzw. 253 px, und der Knopf wird zu „Cerrar".

**Ziel des Owners: direkt unter dem Knopf.** Erfüllt heute nur „Ver Crece". **Bestanden ist der
neue Build, wenn der Abstand bei allen drei Knöpfen ≤ 0,15 Bildschirme (≈ 125 px bei 390 × 844)
beträgt** — also wenn der Inhalt jeweils unter *seinem eigenen* Knopf aufgeht.

## 2 Scrolltiefe

| | Zielsicht | Öffentliche Sicht |
|---|---|---|
| **Handy 390 × 844** | **25,0** Bildschirme (21 100 px) | 16,4 (13 848 px) |
| **Desktop 1440 × 900** | **17,5** Bildschirme (15 739 px) | 10,2 (9 137 px) |

Ziel: Handy **≤ 13**, Desktop **13 und nicht länger**. Gemessen wird die Sicht, in der benotet wird
(Ziel), und die öffentliche daneben. Heute fehlt am Handy fast die Hälfte.

## 3 Schriftart

Auf der Startseite tragen **10** Überschriften **Fraunces** und 14 **Inter** (gezählt über `h1`,
`h2`, `h3` und die Display-Klassen). Die Regel des Owners lautet jetzt **Inter überall**.
**Bestanden ist der neue Build, wenn die Zählung 0 × Fraunces ergibt.**

## 4 3D beim langsamen Scrollen

Beim Scrollen in Schritten von 20 % der Fensterhöhe steht die Szene, sobald sie im Bild ist, auf
**Schritt 02 „Modelo"** (`data-m3d-step = 1`, Video `house-ground-loop.mp4`). Verlangt ist
**Schritt 01 „Plano"**. → **heute nicht erfüllt**.

Die Reiter selbst sind in Ordnung: alle **vier** sind anklickbar und schalten sauber
(01 Plano → 02 Modelo → 03 Vacío y amueblado → 04 Entrega; die Medien wechseln mit,
`living-empty-1200.webp` und `living-furnished-1200.webp` bei 03). → **erfüllt**.

## 5 Formular und die zwei Knöpfe

`/es/contact`, Zielsicht: **8 Felder**, davon **4 Pflicht**:

| Feld | Art | Pflicht |
|---|---|---|
| `agency` | Text | **ja** |
| `name` | Text | **ja** |
| `email` | E-Mail | **ja** |
| `consent` | Häkchen | **ja** |
| `phone`, `interest`, `message`, `web` | Telefon, Auswahl, Textfeld, Text | nein |

Der Absendeknopf heißt „Solicita tu piloto gratuito", 308 × 56 px, 17 px, Gewicht 600.

**„Contratar directamente" gibt es auf diesem Build nicht** — kein solcher Knopf, keine
Auswahlfelder. Der Vergleich „kleiner als der Pilot-Knopf" lässt sich deshalb erst am neuen Build
führen. **Bestanden ist er, wenn die Fläche des Knopfes kleiner ist als 17 248 px² und er nicht die
Gestalt des Hauptknopfes trägt (kein schwarzer Grund).**

Zur Pflichtfeld-Zahl eine Rückfrage an den Owner: **drei Textfelder plus das Einwilligungs-Häkchen**
sind heute vier Pflichtangaben. Ob das Häkchen als viertes Pflichtfeld zählt oder getrennt steht,
entscheidet er; rechtlich wird man es kaum weglassen können.

## 6 Doppeltes „Planes", „Gratis" bei Essential, Unbelegtes

- **„Planes" steht in der Zielsicht zweimal** als Überschrift, öffentlich einmal. → in der
  Zielsicht **nicht erfüllt**.
- **„Gratis" bei Essential: kein Treffer**, in keiner Sicht. → erfüllt.
- **Öffentlich ohne Unbelegtes:** am 16.11. geprüft und sauber (eigene Nummer nur „en preparación",
  kein Telefon, keine Mehrsprachigkeit, keine WhatsApp-Medien, 3D nur in der Zielsicht). Siehe
  `REVIEWER_ZWISCHENSTAND_868602c_1116_v1.md`.

---

## Was am Mittwoch dazukommt

Zu dieser Liste und F22 (a) prüfe ich am festen Build: Lighthouse nach D-4 (3 Läufe, Median,
allein auf der Maschine, Bypass-Header), CLS, LCP, Tippziele ≥ 44 px bei 360/390/414,
`reduced-motion`, der Lauf ohne JavaScript, und die **neun Zeilen der Notentabelle B-1** mit je
einem Bild, **getrennt für Handy und Desktop**.

Dazu Copys neue Textzeilen vom 16.11. (`441ba1c`): „WhatsApp/número de tu agencia" mit 0 Treffern
öffentlich, W-1 öffentlich „Respuestas en español por email.", W-2/W-7a ohne „en preparación",
L-1/L-2 öffentlich erlaubt, der Fallback „espera a una persona" zurückgezogen, K1 ohne „disponible"
als Tatsache, K2 „se ocupa" statt „contesta", keine Kundenzitate, kein „Lo cancelas cuando
quieras", kein bloßes „Datos en la UE", im Formular kein „aceptas la política de privacidad",
„Te llamamos" nur mit Telefonnummer, bei „Contratar un plan" ist der Absendeknopf nicht B-1, und
die Kernzeilen am Handy ≤ 12 Wörter.

**Eine Klarstellung dazu, die ich dem Owner melde:** Copys Zeile „W-2/W-7a bleiben ohne ‚en
preparación'" und die heute gemessene, saubere öffentliche Zeile „WhatsApp con el número de tu
agencia: **en preparación**" ziehen in verschiedene Richtungen. Welche gilt, entscheidet der Owner;
ich prüfe nach seiner Entscheidung, nicht nach der Spur, die zuletzt geschrieben hat.
