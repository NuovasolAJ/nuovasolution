# RV6 an Audit — F20, F22, F27 am Preview nachgeprüft, je mit Bild

**Gemessen** 24.11. am Preview **`bea7d19` · `dpl_H6WfQ1GKkjwRtP8F5wq2ZH3SKjUK`** — derselbe Pin wie
die sechs Noten und die Lückenliste. Build bei jeder Sonde am Anfang **und** am Ende gelesen,
**in allen Läufen stabil**.
**Grundlage der Fehlertexte:** `governance/FEHLERLISTE_PROD_1113_v1.md`, Zeilen 39, 41, 49.

## Urteil

| Fehler | Merkmal | Urteil | Bild |
|---|---|---|---|
| **F20** | „en segundos" für **Mail** nicht belegt | **JA — behoben** | `audit-F20-es390.png` |
| **F27** | „no calcula una puntuación" | **JA — behoben** | `audit-F27-es390-platform.png` |
| **F22a** | Hero bei 1366×768 abgeschnitten | **NEIN — noch sichtbar** | `audit-F22a-d1366x768-hero.png` |
| **F22b** | „teléfono"-Haken | **NEIN — noch sichtbar** | `audit-F22b-es390-telefono.png` |
| **F22c** | Kontrast am Handy | **JA — behoben** | `audit-F22c-es390-kontrast.png` |
| **F22d** | Kicker doppelt | **JA — behoben** | `audit-F22d-es390-kicker.png` |

**F20 und F27 kann Audit schließen. F22 bleibt offen**, zwei von vier Merkmalen sind noch da.

---

## F20 — JA

Auf allen neun ES-Seiten gibt es genau **einen** Satz mit „segundo":

> „Contesta **en segundos por WhatsApp** y **en minutos por email**."

„en segundos" hängt an **WhatsApp**, nicht an der Mail. Treffer für „en segundos" in Verbindung mit
E-Mail: **0**. EN gleich gebaut: „in seconds on WhatsApp and in minutes by email." Der Mangel aus
Zeile 39 ist damit weg.

**Dazu gehört eine Einschränkung, die nicht F20 ist, aber an derselben Stelle steht:** der Folgesatz
lautet „**Medido en producción**: email en unos 2 minutos, WhatsApp en el mismo minuto." Das ist
E-1 meiner Lückenliste (`de152f8`): eine Messaussage **ohne Registerzeile**, die nicht nennt, wessen
Produktion gemessen wurde. F20 ist behoben; dieser Punkt bleibt getrennt offen.

## F27 — JA

„no calcula una puntuación" und „puntuación" überhaupt: **0 Treffer** auf `/es`, `/es/platform`,
`/es/trial`, `/es/packages`, `/es/faq`, jeweils nach vollständigem Durchlauf und mit geöffneten
Aufklappern. An der Quelle steht der Satz ebenfalls nicht mehr; in `product-views.tsx:21` liegt nur
noch ein Kommentar.

**Ein Widerspruch, den ich melde statt ihn zu schlucken:** Zeile 49 begründet F27 damit, **Prod habe
einen Score**. Der Kommentar an der Quelle sagt das Gegenteil und beruft sich auf
`LEAD_TRUTH_INPUT_v1 §1, §3`: „No qualification score … neither exists in production." Für F27 ist
das gleichgültig — der Satz ist so oder so weg und der Fehler kann zu. Für das Register ist es nicht
gleichgültig: zwei Bahnen sagen Gegenteiliges darüber, ob Prod einen Score hat. Bitte einmal klären,
bevor jemand den Satz in anderer Form zurückholt.

## F22a — NEIN

Bei **1366 × 768** (gemessene Bildhöhe 768 px):

| Element | oben | unten | im ersten Bildschirm? |
|---|---|---|---|
| h1 „Mientras enseñas un piso, ¿quién atiende a Mila?" | 216 | 417 | ja |
| Aufgabenzeile „Llamar a Mila · … ref. 9895153" | 675 | 697 | ja |
| **Hero-Aktion „Ver cómo queda la tarea"** | **777** | **833** | **nein** |

Das Bild zeigt es: Kicker, Überschrift, Vorspann, Milas Anfrage und die Aufgabenkarte stehen, ganz
unten noch „Ejemplo · datos ficticios" — und **keiner der beiden Hero-Knöpfe** ist zu sehen.

**Fair dazu:** die Seite ist nicht handlungslos, oben rechts steht der schwarze Knopf
„Prueba Essential" im Kopf. Abgeschnitten ist die **eigene Aktion des Heros**, und das ist die, auf
die der ganze erste Bildschirm hinführt.

## F22b — NEIN

In der Vergleichstabelle auf `/es/packages` (erst nach „Ver todo lo que incluye" sichtbar) steht die
Zeile `data-plan-row="phoneAssistant"`:

| Spalte | Vorlese-Beschriftung |
|---|---|
| Essential | „No en este plan" |
| **Growth** | **„En este plan"** |
| **Enterprise** | **„En este plan"** |

Der Haken ist also noch da, für zwei Pakete. Registerzeile 9 (`phoneAssistant`) ist **Bau** und in
Prod zusätzlich **Ausnahme Anwalt**.

**Und der Haken steht nicht allein — das ist der eigentliche Befund an diesem Bild.** Dieselbe grüne
Marke tragen im selben Block unter anderem:

| Tabellenzeile | Registerzeile | Klasse |
|---|---|---|
| Asistente telefónico | 9 | Bau · Ausnahme Anwalt |
| Publicar en Instagram | 33 | Bau · Ausnahme Meta |
| Aviso a la persona que toca | 20 | Bau |
| Inmuebles que encajan y seguimiento con permiso | 26 / 27 | Bau · Ausnahme Anwalt |
| Resumen semanal por email | 29 | Bau |
| Informe ampliado: evolución, canales y conclusiones | 30 | Bau |
| Conexión con tu CRM | 31 | Bau |
| Leads de portales y anuncios | 10 | Bau · Meta-Teil |
| Una ficha por persona entre canales | 15 | nur Nachweis fehlt |

Der Haken bedeutet im Aufbau **Paketzugehörigkeit** („En este plan"), nicht **Verfügbarkeit** — eine
Besucherin kann die beiden nicht unterscheiden, weil belegte und nicht gebaute Punkte **dieselbe**
grüne Marke tragen. Die einzige Zeile, die sich abhebt, ist „Visualización 3D" mit dem Wort
„Opcional" statt eines Hakens; genau diese Form zeigt, dass eine Unterscheidung möglich wäre.

Das ist derselbe Punkt wie **E-0b** meiner Lückenliste („Desde Growth" sagt etwas über das Paket,
nicht über die Verfügbarkeit), hier aber an der Tabelle und mit Bild.

## F22c — JA

Erster Bildschirm, 390 × 844, **20** Textstellen geprüft, **0** unter der AA-Schwelle (4,5 : 1;
3,0 : 1 für große Schrift). Niedrigster Wert **6,74 : 1** bei „Solo en la vista previa +".

**Ein erster Lauf von mir meldete hier fälschlich NEIN** — meine Kontrastrechnung nahm den ersten
nicht durchsichtigen Hintergrund eines Vorfahren und **ignorierte dessen Alphawert**, so dass ein
6-%-Weißschleier als Untergrund gelesen wurde und 1 : 1 herauskam. Die Rechnung setzt die Schichten
jetzt übereinander und ist an bekannten Werten geprüft: Schwarz auf Weiß **21 : 1**, `#767676` auf
Weiß **4,54 : 1**, der Schleierfall **13,68 : 1** statt 1 : 1. **Die Seite war in Ordnung, mein
Werkzeug nicht.**

## F22d — JA

Über der h1 stehen zwei Textzeilen:

| y | Größe | Form | Text |
|---|---|---|---|
| 166 | 13 px | normal, keine Sperrung | „Estás en una visita · 11:40" |
| 236 | 14 px | **Versalien**, Sperrung 1,26 px | „PARA AGENCIAS INMOBILIARIAS EN ESPAÑA" |

Nur **eine** davon ist ein Kicker. Die obere ist die Szenenangabe des Heros — andere Schriftform,
keine Versalien, keine Sperrung. Doppelt ist hier nichts.

---

## Meine eigenen Fehler in diesem Durchgang

Vier, alle vor dem Urteil gefunden; drei hätten ein falsches Urteil ergeben:

1. **F22c** hätte ich fälschlich als NEIN gemeldet (Alpha nicht verrechnet, siehe oben).
2. **F22a** stützte sich im ersten Lauf auf den **Kopfzeilen**-Knopf bei y = 14 statt auf die
   Hero-Aktion und hätte „nicht abgeschnitten" ergeben. Jetzt wird die Aktion **unterhalb der h1**
   gesucht; das Urteil drehte sich zu NEIN.
3. **F22b** habe ich zweimal mit „nicht gefunden" quittiert, weil mein Muster `tel[eé]fon` das Wort
   **„telefónico"** nicht trifft — der Akzent sitzt auf dem **o**, also außerhalb meiner
   Zeichenklasse. Mit `tel[eé]f[oó]n` war die Zeile sofort da. Ein „nicht gefunden" ist eben kein
   „nicht vorhanden", solange das Muster nicht geprüft ist.
4. Eine Zwischenausgabe von mir fraß alle „s" („What App", „vi ta previa"): in `node -e` über diese
   Shell geht ein Backslash verloren, `new RegExp("\\s+")` wird zu `s+`. Die **gespeicherten** Texte
   sind davon nicht betroffen (Gegenprobe mit `grep`: „WhatsApp" 360×, „What App" 0×), die
   Lückenliste `de152f8` also auch nicht. Betroffen war nur die Bildschirmausgabe eines Einzeilers.

## Grenzen

ES gemessen, F20 zusätzlich in EN. Kein echtes Gerät — Edge im Kopflosbetrieb mit Gerätemaßen;
iPhone und Android bleiben eine leere Spalte. Der Kontrast ist für den **ersten Bildschirm** von `/`
gerechnet, nicht für die ganze Seite.

---

## Berichtigung zu F22b (24.11., nach Copys Antwort)

Copy widerspricht meinem Vorschlag einer zweiten Marke, und **Copy hat recht**. Ich hatte die
Haken-Beobachtung so aufgeschrieben, als wäre der Preview die öffentliche Seite. Das ist er nicht.

**Owner-Entscheidung 2 vom 23.11. (ec4181ed):** der Preview zeigt NuovaSolution bei 100 %, alle
geplanten Funktionen **ohne** Próximamente; die Einteilung Prod/Staging/Bau steht **nur** im
internen Register. Eine Marke, die „heute nicht verfügbar" bedeutet, wäre ein Próximamente in
anderer Form — also genau das, was der Owner gestrichen hat. **Im Preview bedeutet der Haken
Paketzugehörigkeit, und das ist so gewollt.** Mein Satz „eine Besucherin kann die beiden nicht
unterscheiden" misst den Preview am Maßstab der öffentlichen Seite und ist damit der falsche
Maßstab. Der Vorschlag einer zweiten Marke ist **zurückgezogen**.

Zwei weitere Punkte von Copy nehme ich an:

- **„Opcional" bei 3D ist kein Zustandszeichen**, sondern eine kaufmännische Einordnung (ein
  getrennt buchbarer Dienst, Owner 16.11.). Ich hatte es als Beleg dafür benutzt, dass eine
  Unterscheidung möglich wäre — das trägt nicht, weil es eine andere Art von Angabe ist.
- **Die Verbindung zu E-0b war falsch.** E-0b ist das absolute „ninguna" über einer nicht gebauten
  Funktion, also ein **Satz**, der zu weit reicht. Der Paket-Haken ist keine solche Aussage. Copy
  hat den Satz zu Recht verengt und „Desde Growth" zu Recht stehen gelassen. Die Zusammenfassung
  der beiden Punkte in meinem Bericht war eine Vermischung zweier Klassen.

### Wohin die Messung gehört

Die **Beobachtung** bleibt richtig und nützlich, nur an anderer Stelle: Audits Register führt unter
den offenen Owner-Fragen bereits „**Matrix:** Fällt eine Zeile, die bis 04.12. nicht belegt ist,
aus der Vergleichstabelle? (Copy empfiehlt ja.)" Genau dafür ist die gemessene Liste gedacht — sie
sagt, **welche** Zeilen die Frage betrifft:

> Registerzeilen mit Haken in der Vergleichstabelle, die **nicht** „belegt" sind:
> **9** (Asistente telefónico, Bau · Anwalt), **10** (Leads de portales y anuncios, Bau · Meta),
> **15** (Una ficha por persona entre canales, nur Nachweis fehlt), **20** (Aviso a la persona que
> toca, Bau), **26/27** (Inmuebles que encajan y seguimiento con permiso, Bau · Anwalt),
> **29** (Resumen semanal por email, Bau), **30** (Informe ampliado, Bau), **31** (Conexión con tu
> CRM, Bau), **33** (Publicar en Instagram, Bau · Meta).

Das ist **kein Preview-Fehler** und auch keine neue Lücke — es sind dieselben Zeilen wie in
Abschnitt A meiner Lückenliste (`de152f8`), hier nur danach sortiert, **wo** sie in der Tabelle
stehen. Für die Go-live-Entscheidung des Owners ist das die Arbeitsliste.

### Was an F22b unverändert gilt

Die **Tatsache** steht: der Haken bei „Asistente telefónico" ist da, „En este plan" bei Growth und
Enterprise, Bild `audit-F22b-es390-telefono.png`. **Ob das noch ein Fehler ist, entscheidet Audit,
nicht ich** — F22 stammt aus den Owner-Proben vom 13.11., die Owner-Entscheidung 2 ist vom 23.11.
und damit **jünger**. Nach ihr trägt eine geplante Funktion im Preview zu Recht einen Haken. Ich
melde deshalb: **Merkmal unverändert sichtbar**, mit dem Hinweis, dass die spätere Entscheidung es
möglicherweise erledigt hat. F22a bleibt davon unberührt und ist ein echtes NEIN.
