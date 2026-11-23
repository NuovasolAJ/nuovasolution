# RV6 · Prüfprotokoll Thema 16 · 23.11.2026, 12:00

**Grundlage:** Owner-Brief 20.11. (`6726df1`, dazu das PDF mit den zehn Aufnahmen, die ich jetzt
selbst habe) und die Owner-Klarstellung vom 20.11.
**Prüftermin:** **Fr 04.12.** für die vollständige Darstellung, **kein Teilstart**.
**Mein JA `0c4bbb4` galt dem alten Maßstab.** Thema 16 ist offen.

**Stand 23.11. 12:00:** Der Alias steht unverändert auf `92f873d` /
`dpl_7j8zGi1u9Hua49DAX6jjmV88zFHH`. **Es gibt noch keinen neuen festen Build.** Der Grundstand ist
erreichbar, die Vorher-Messung ist erhoben (§2).

---

## 0. Ein Widerspruch zwischen zwei Anweisungen, bevor jemand auf die falsche baut

Über Redesign kam mir eine Owner-Zeile zu, die Seite solle **zum frühestmöglichen Zeitpunkt**
öffentlich gehen, Thema 16 warte **nicht mehr** auf das vollständige Produkt. Ihre eigene
Anweisung an mich sagt: **04.12., vollständige Darstellung, kein Teilstart.**

**Ich richte mich nach Ihrer direkten Anweisung** und behandle die weitergegebene Zeile als
überholt. Ich melde es, weil Redesign danach baut: Wenn die weitergegebene Fassung gilt, prüfe ich
**je Ablauf** auf Teilreife; wenn Ihre gilt, prüfe ich die **Gesamtdarstellung** am 04.12. **Das
sind zwei verschiedene Prüfungen**, und ich kann nicht beide gleichzeitig zum selben Termin
liefern. Ein Wort von Ihnen genügt.

---

## 1. Die sechs Noten, messbar gemacht

Ziel **10/10**; **unter 9 wird nachgebessert**. Damit eine Note kein Geschmack ist, hängt jede an
Zählbarem. Je Befund nenne ich **Seite, Gerät, beobachtetes Problem, Ergebnis der Nachprüfung**.

| Note | woran sie hängt | 10 heißt |
|---|---|---|
| **Verständlichkeit** | die drei Erstbesucher-Aufgaben (§3), ohne Anleitung; dazu der 10-Sekunden-Satz: was übernimmt NuovaSolution | alle drei ohne Stocken, Satz richtig |
| **Modernität/Bewegung** | Weg in px und Bildschirmen bis Rückrufaufgabe / Paketunterschied / Formular; jede Szene überspringbar; `prefers-reduced-motion` erreicht dasselbe Ergebnis; 3D: Titel bleibt, „Paso 2 de 4", vier Schritte direkt anwählbar, **eine** Bildfläche | Wege kürzer als Vorher, Bewegung abschaltbar ohne Verlust |
| **Premiumgefühl** | Anteil echter Objektfotografie gegen gleichförmige Karten; schwarze Statusetiketten gezählt (D2); Touchflächen **≥ 44 px bei 375**; feste Fußleiste verdeckt nichts, wo ein lokaler CTA sichtbar ist | 0 verdeckte Inhalte, 0 Flächen unter 44 px |
| **Texte** | konkrete Verben (anrufen, Termin bestätigen, Objekt vorschlagen, Eigentümer zurückrufen) gegen allgemeine Wachstumsversprechen; **0** Zukunftshinweise auf Kundenseiten; Mock-Daten einmal gekennzeichnet; Vorher/Nachher **derselbe** Fall | 0 Marken, Beispieldaten gekennzeichnet |
| **Verkaufswirkung** | je Paket **eine** Hauptaktion; Button, Linkziel, vorgewähltes Formular und Bestätigung stimmen überein; Zwischenschritte erreichbar | alle Wege enden an der passenden Bestätigung |
| **Kaufinteresse** | auf welchem Bildschirm die fertige Aufgabe erscheint; findet ein Erstbesucher sie ohne Hilfe; kann er sagen, welches Paket 14 Tage bietet | Aufgabe im ersten Bildschirm, Paketfrage richtig |

---

## 2. Vorher-Messung auf `92f873d` — erhoben, mit ihren Grenzen

Erhoben über die **direkte** Deployment-Adresse, Build vor und nach dem Lauf geprüft
(`BUILD STABLE: 92f873d`), 30 Kundenseiten, ES und EN.

### 2.1 Was gemessen ist

| Messung | Ergebnis |
|---|---|
| **Marken auf Kundenseiten** | **334 Blatt-Treffer** über 30 Seiten; Startseite 78 (43 gemalt), `/packages` 59 (30), `/platform` 12, `/platform/daily-assistant` 12, `ai-sales-agent` 3, `crm` 1, die vier übrigen Plattformseiten **0** |
| **Marken als ganze Sätze** (nachgemessen) | Startseite ES **17** / EN **18**, `/faq` **je 10**, `/contact` **1**, `/trial` **1** |
| **Touchflächen unter 44 px bei 375** | Startseite **7**, `/packages` **4**, `/platform/ai-sales-agent` **3**, `/faq` **4** |
| **Feste Leiste unten, 375, Startseite** | **299 px hoch** bei 812 px Bildhöhe — **37 % des Bildschirms**, Inhalt „Me interesa este piso … Ficha 320.000 €" |
| **Gratis-Angebot** | `/packages` zeigt **vier** Buttons „Empieza 14 días gratis" / „Start 14 days free" — ES und EN, 375 **und** 1440 |

**Das letzte bestätigt M6 und D4 des Owners am gebauten Stand:** Das Gratisangebot steht nicht nur
bei Essential.

### 2.2 Wo meine Zahl eine Untergrenze ist, und warum ich das sage

**Die Markenzählung ist ein Boden, keine Summe.** Zwei Gründe, beide an meinen eigenen Hilfswerten
sichtbar geworden:

1. **`/faq` ist ein Akkordeon.** Nach zwei Durchläufen waren **30 Einträge noch geschlossen**;
   auch beim Öffnen **jedes einzelnen** blieben 31 zu, weil das Öffnen eines anderen schließt.
2. **Marken, die über mehrere Elemente laufen**, fehlen im Blatt-Scan: `/contact` und `/trial`
   meldeten 0 Treffer, im Fließtext stand je **1**.

**Folge für die Abnahme, und sie ist wichtig:** „Null Marken" lässt sich an einer Akkordeon-Seite
**nicht durch Hinsehen beweisen**. Ich prüfe die Entfernung deshalb **zweistufig**: zuerst im
**Quellcode** (`lib/content/**`, `lib/i18n/**`) gegen Copys Markenwortlaute — dort ist Abwesenheit
vollständig nachweisbar —, danach am gerenderten Build als Bestätigung. **Nur die Quelle kann eine
Null belegen; die Darstellung kann sie nur widerlegen.**

---

## 3. Die drei Erstbesucher-Aufgaben

Ohne Anleitung, je Gerät und Sprache protokolliert: **erreicht / gestockt / falsch**, die **Stelle
des Stockens**, die **Zeit bis zum Ziel** und jeder **Fehltipp**.

| | Aufgabe | bestanden heißt |
|---|---|---|
| **E-1** | Milas WhatsApp-Anfrage finden und sagen, was der Makler als Nächstes tun muss | Rückrufwunsch **und** offene Verfügbarkeitsprüfung werden benannt, ohne Hilfe |
| **E-2** | Wochenbericht öffnen und zeigen, welche Kontakte persönliche Betreuung brauchen | Unterschied „Software hat geantwortet" / „Rückruf steht aus" wird benannt |
| **E-3** | Pakete vergleichen, wichtigsten Unterschied nennen, sagen welches Paket 14 Tage gratis ist, **vor dem Klick** sagen was passiert, dann jedem Haupt-CTA bis zur Bestätigung folgen | richtige Antwort, und jeder Button endet an der **passenden** Bestätigung |

**Vorher-Stand, bereits messbar:** Die Demo der Startseite bietet **Email, Formulario web
(markiert), Teléfono (markiert)** — **kein WhatsApp**. Für E-1 heißt das am Ausgangsstand
voraussichtlich **„im Ausgangsstand nicht erreichbar"**; ich bestätige es formal im Vorher-Lauf
der zwei Wege, sobald der neue Build danebensteht.

---

## 4. Die zwei Handywege, Vorher gegen Nachher

| | Weg | je Gerät und Sprache festgehalten |
|---|---|---|
| **W-1** | WhatsApp-Anfrage → fertige Rückrufaufgabe | erreichbar ja/nein · Zeit bis zum Ziel · Anzahl Tipps · **Fehltipps mit Stelle** · Weg in px und Bildschirmen |
| **W-2** | Paketwahl → richtiges Formular → Bestätigung | dasselbe, zusätzlich: Linkziel, **Vorbelegung** des Formulars, Wortlaut der Bestätigung |

Fehlt ein Weg im alten Build, steht dort **„im Ausgangsstand nicht erreichbar"** — nicht 0, nicht
leer.

**Grundsatz zum Absenden:** Ich schicke Formulare nur an eine **zustellbare Testadresse** ab und
nie an eine erfundene Domain. In der Vorher-Messung sende ich **nichts** — ein echter Absendevorgang
erzeugt einen echten Lead und gehört nicht in eine Bestandsaufnahme.

---

## 5. Bedienung, Sprache, Zugänglichkeit

Je Breite **375 / 390 / 430** und Desktop, **ES und EN**, **auf demselben Build**:
Menü öffnen und schließen · Zurück (Browser **und** seiteneigener Pfeil) · Sprachwechsel **auf
derselben Seite**, ohne Sprachmischung · Touch ≥ 44 px · Tastatur: Fokus sichtbar, Reihenfolge
sinnvoll, keine Falle · `prefers-reduced-motion`: **dasselbe Ergebnis erreichbar**, keine Szene nur
über Animation.

Dazu die Handyprobleme aus dem Bildanhang: **Zusammenhang der Schritte 1–4** (M5) ·
**Scrollweg bis zum Ergebnis** (M1, M2) · **Buttongrößen** (M1, M6) · **verdeckte Inhalte durch
die feste Fußleiste** (375 und im Paketvergleich) · **erkennbare Paketunterschiede vor dem
Öffnen** (M6, D4) · leere Feldnamen während der Animation (D1) · schwarze Statusetiketten (D2) ·
Zukunftszeile im Bericht (D3).

---

## 6. „Gratis nur Essential" — die vier Stellen zusammen

Ein Paketversprechen gilt mir erst als geprüft, wenn **alle vier** übereinstimmen:

**Button** → **Linkziel** → **Vorbelegung des Formulars** → **Wortlaut der Bestätigung**

Je Paket und je Sprache. Essential trägt die 14 Tage; Growth führt zu Anfrage oder Demo;
Enterprise zu einem Gespräch. Der **globale** Button darf keinem Paket etwas versprechen, das es
nicht hat. Geprüft werden auch `/packages`, Startseite, FAQ, Plattformseiten, Footer und die
Bestätigungsseiten.

---

## 7. Meine Grenze beim Gerät, und sie bleibt benannt

**Ich kann kein echtes iPhone/Safari und kein echtes Android/Chrome prüfen.** Ich messe mit
kopflosem Edge auf Windows. Breiten, Touchflächen, reduzierte Bewegung, Tastatur und Fokus
emuliere ich; **Safari-Leiste, feste Fußleiste auf einem echten iPhone und iOS-Schrifteigenheiten
kann ich nicht prüfen** — und genau die verlangt der Brief.

**Ich halte beides getrennt**, wie Sie es angeordnet haben: eine Spalte „Simulation", eine Spalte
„echtes Gerät". **Die zweite bleibt leer, bis jemand sie füllt.** Ich werde keine emulierte Zeile
als Gerätetest ausgeben. Entweder prüft ein Mensch mit zwei Telefonen, oder Sie nehmen Simulation
mit dieser Einschränkung an — das ist Ihre Entscheidung, nicht meine.

---

## 8. Register-Abgleich und Lücken zum 04.12.

Ab 12:00 gleiche ich jede Seite gegen **Audits Versprechen-Register**
(`governance/WEBSITE_VERSPRECHEN_REGISTER_1120_v1.md`) ab — zum Zeitpunkt dieses Protokolls liegt
die Datei noch nicht vor.

**Was am 04.12. nicht belegt ist, melde ich als Lücke an Owner und Audit — nie als
Ausblendung.** Je Lücke: Versprechen, Seite, Paket, fehlender Beleg, zuständige Spur.

**Meine vier zusätzlichen Startblocker** (`555567c`), die Audit dort abgleicht:

| Versprechen im Brief | Schlüssel | Registerstand `92f873d` |
|---|---|---|
| „Prueba Essential gratis durante 14 días" mit direktem Abschluss | `trial` | **soon** |
| derselbe direkte Abschluss setzt Selbstanmeldung voraus | `publicSignup` | **soon** |
| drei Pakete direkt vergleichbar, 2–3 bestätigte Unterschiede | `plans` | **soon** |
| „Zusammenfassung um 8:30" — Daily belegt Zeitpunkt und Zustellung | `dailyVoice` | **soon** |

**Eine Entscheidung darin gehört Ihnen:** Ist Essentials „prueba gratis" ein **Selbststart**
(dann brauchen `trial` und `publicSignup` einen Prod-Beleg) oder eine **angefragte** Testphase
(dann ist es kein „direkter Abschluss")? Davon hängt ab, ob zwei dieser vier den Start blockieren.

---

## 9. Was ich wann tue

| Wann | Was |
|---|---|
| **jetzt** | Vorher-Messung liegt (§2); Rohzahlen gehen an Redesign für die eine gemeinsame Vorher-Zahlenreihe |
| **sobald Redesign einen festen Build nennt** (Commit + Deployment-ID) | W-1 und W-2 Vorher/Nachher, die drei Erstbesucher-Aufgaben, die sechs Noten — **in einem Durchgang** |
| **ab 12:00** | Abgleich gegen Audits Register, Seite für Seite |
| **bis 04.12.** | vollständige Darstellung geprüft; offene Belege als Lücke gemeldet |

**Unverändert mein Verfahren:** Build am Anfang **und** am Ende festgenagelt, sonst ist der Lauf
ungültig; jede Seite als wirklich geladen nachgewiesen; und **kein Urteil aus einem Lauf, der
nichts angesehen hat** — eine Prüfung, die nichts verglichen hat, bricht bei mir ab, statt „0
Mängel" zu melden.

---

## 0b. NACHTRAG 23.11. — der von mir gemeldete Widerspruch löst sich auf

**Ich hatte in §0 einen Widerspruch gemeldet.** An der Quelle gibt es keinen. Nachgelesen in
`governance/ABSCHLUSSPLAN_ZENTRAL_1105_v1.md` (n8n-Projekt), nicht aus einer Weitergabe:

**Beide Zeilen sind Ihre, sieben Minuten auseinander.**

- **20.11. 16:11** „Website **frühestmöglich** veröffentlichen" — ersetzt „16 schließt als eines
  der letzten Themen". Das ist die **Absicht**.
- **20.11. 16:18** „Ziel- und Prüftermin **Fr 04.12.** = vollständige Darstellung des fertigen
  Angebots ES/EN, alle Kanäle inkl. WhatsApp, alle Pakete. **Kein schrittweiser Start, keine
  ausgeblendeten Hauptfunktionen.**" Das ist der **Mechanismus**.

**Sie widersprechen sich nicht:** so früh wie möglich, und das Früheste ist der 04.12. mit allem.
**Mein §0 ist damit erledigt**, und die Frage, die ich Ihnen gestellt habe, brauchen Sie nicht
mehr zu beantworten. Copy liest es genauso; nur die Weitergabe an Redesign trug die Überschrift
ohne den Mechanismus.

### Dabei ist etwas sichtbar geworden, das noch als offen behandelt wird, aber entschieden ist

Ihre Klarstellung von 16:18 **ersetzt ausdrücklich** den Audit-Vorschlag „publicGate blendet aus"
(`87e108b3`). Redesign führt in seinem Plan aber weiterhin als **offene Entscheidung**, ob die
Marken-Zeichenketten in der Quelle bleiben und die öffentliche Sicht sie ausblendet.

**Der Teil davon ist entschieden:** „keine ausgeblendeten Hauptfunktionen" schließt das Gate als
**Startmechanismus** aus. Was offen bleibt, ist nur die kleinere Frage, ob eine **interne**
Vorschausicht die Marken behalten darf — eine interne Sicht ist keine Kundenseite. Ich sage es,
damit niemand eine bereits getroffene Entscheidung noch einmal zur Abstimmung stellt.

**Für meine Prüfung heißt das:** Ich prüfe die Kundenrouten **in ihrem Auslieferungszustand** auf
null Marken, und zusätzlich, dass von einer Kundenseite aus **keine markierte Fassung erreichbar**
ist. Eine interne Sicht hinter `?view=` zähle ich nicht als Kundenseite.

---

## 0c. Die eine Frage, an der der 04.12. hängt

In derselben Datei stehen zwei Ihrer Angaben, die zusammen die Terminfrage entscheiden:

| | |
|---|---|
| **16:18** | 04.12. = vollständige Darstellung, **„alle Kanäle inkl. WhatsApp"** |
| **16:11** | „Vollständig (alle Schlüssel live) **frühestens Mitte/Ende Dezember**: Meta (20, 25, 27), Anzeigen (26), Trend (33), CRMs (35)" |
| Audit-Risiko | „**Agenturnummer WhatsApp (20, Meta)** … voraussichtlich noch offen" |

**Gelesen als „WhatsApp mit der Agenturnummer" schließen sich die beiden aus** — dann wäre der
04.12. an Meta gebunden, und das liegt bei niemandem hier.

**Gelesen als „WhatsApp als Kanal über unsere Nummer" ist der 04.12. erreichbar** — dieser Weg ist
im Register belegt (`replyWhatsapp` = included), nur `whatsappOwnNumber` hängt an Meta.

**Sie haben die Unterscheidung selbst schon aufgeschrieben** („WhatsApp getrennt: über unsere
Nummer / über die Agenturnummer"), nur nicht auf den 04.12. angewandt. **Welche der beiden
Lesarten für den 04.12. gilt, ist die einzige Frage, die über den Termin entscheidet** — und sie
betrifft genau den Kanal, den Milas Weg braucht.

**Ich prüfe beide Lesarten getrennt und melde je Kanal, was belegt ist** — aber die Festlegung ist
Ihre, und sie sollte vor dem 04.12. fallen, nicht an ihm.

---

## 0d. NACHTRAG 23.11., 14:30 — zwei Korrekturen an diesem Protokoll und eine Lücke

### (1) Meine Zahl „37 % feste Leiste" ist falsch und zurückgezogen

Oben in der Vorher-Messung steht „feste Leiste unten bei 375 = 299 px von 812 = 37 % des
Bildschirms". **Das war mein Fehler.** Nachgemessen auf beiden Builds: die feste Kopfzeile ist
375×60, die feste CTA-Leiste 375×65 und liegt **bei Ruhe außerhalb des Bildschirms** (`top=819`
bei 812 Höhe) — zusammen **60 px sichtbar, 7,4 %**, auf `92f873d` und `ab38b69` gleich.
Das 299-px-Element ist die **klebende** Anfragekarte bei y≈5814 im Erzählabschnitt, so gebaut.
Ich hatte ein `sticky`-Erzählelement der festen Leiste zugerechnet. Einzelheiten und die
Gegenmessung in `REVIEWER_ETAPPE1_BEFUNDE_ab38b69_v1.md` §0.

### (2) Die Frage aus §0 ist beantwortet, von Ihnen

Ihre Bestätigung vom 23.11.: es gilt die Klarstellung vom 20.11. 16:18 — **Prüftermin Fr 04.12.,
vollständige Darstellung, kein Teilstart, keine ausgeblendeten Hauptfunktionen; über einen
Teilstart entscheiden Sie allein.** **WhatsApp wird in zwei Wegen getrennt gemeldet** (über unsere
Nummer / über die Nummer der Agentur); die Agenturnummer hängt an der Meta-Verifizierung, die vor
der Alta nicht möglich ist, und **wird am 04.12. als Lücke gemeldet**. Damit ist §0c erledigt —
meine beiden Lesarten brauchen keine Entscheidung mehr, weil Sie beide getrennt sehen wollen.

### (3) Lücke: das Versprechen-Register liegt nicht vor

Der Seitenabgleich gegen `governance/WEBSITE_VERSPRECHEN_REGISTER_1120_v1.md` sollte **ab 12:00**
beginnen. **Stand 14:30 existiert die Datei nicht** — geprüft im Website-Repo und im
n8n-Projekt (`NuovaSolution-n8n-system/governance/`, neuester Stand `c090bc4a`).

**Das melde ich jetzt und nicht am 04.12.**, weil der Abgleich die Grundlage des Termins ist: nach
dem Entfernen von `publicGate` gibt es keine öffentliche Sicht mehr, die unbelegte Aussagen
zurückhält (§5 der Etappe-1-Datei). Jede gerenderte Aussage braucht dann einen Registereintrag,
sonst melde ich sie als Lücke. **Ohne Register kann ich das nicht prüfen.**

Was ich ohne Register schon tun kann und getan habe: die Wege, die Formulare, die Bestätigungen,
Menü/Zurück/Sprache/Tastatur/Bewegung und die drei Erstbesucher-Aufgaben messen. Was ohne Register
**nicht** geht: bestätigen, dass die Seite nichts behauptet, was in Produktion nicht belegt ist.
