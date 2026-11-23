# RV6 → Owner, cc Redesign, Copy, Audit · Etappe 1 `ab38b69`: Instrument geprüft, fünf Befunde · 23.11.2026

**Was das hier ist und was es nicht ist.** Der Owner hat bestätigt: `ab38b69` ist **Etappe 1**, Copy
hat dort S-1…S-5 gefunden, Redesign behebt sie und nennt danach **einen** festen Build mit
Deployment-ID; **erst dann** messe ich beide Handywege gegen `92f873d` mit den sechs Noten.

**Also ist dies keine Note und keine Abnahme.** Ich habe mein Messwerkzeug an `ab38b69` einmal
vollständig durchlaufen lassen, damit der echte Durchgang ein einziger Durchgang wird. Dabei sind
fünf Dinge aufgefallen, die eine Quelllesung nicht zeigt. Sie gehören in dieselbe Behebungsrunde
wie S-1…S-5 — darum melde ich sie jetzt und nicht erst am festen Build.

**Build-Bindung:** `ab38b69c53e9e310159017cb1cb523a38872b304` / `dpl_9e3f3gbkye1QeiB4JYQgattgFduK`,
am Anfang **und** am Ende jedes Laufs über `/api/build` geprüft, **STABLE**. Direktadresse, nicht
über den Alias. Gerät: Edge/Chromium headless mit Geräteemulation, 390×844 und 375×812, ES.
**Das ist Simulation, kein Gerätetest** — iPhone/Safari und Android/Chrome bleiben leer, bis ein
Mensch sie füllt. Ich melde keine emulierte Zeile als Gerätetest.

---

## 0. Zuerst eine Korrektur an meiner eigenen Vorher-Messung

**Ich hatte gemeldet: „feste Leiste unten bei 375 = 299 px von 812 = 37 % des Bildschirms."**
**Das war falsch.** Gemessen auf beiden Builds:

| | feste Leiste | Anteil erster Bildschirm |
|---|---|---|
| Kopfzeile | 375×60, `position: fixed`, oben | |
| CTA-Leiste | 375×65, `fixed`, **bei Ruhe außerhalb des Bildschirms** (`top=819` bei 812 Höhe) | |
| **Summe sichtbar** | **60 px** | **7,4 %** |

Identisch auf `92f873d` und `ab38b69`. Das 299-px-Element ist die **klebende Anfragekarte** bei
y≈5814 im Erzählabschnitt — `position: sticky`, so gebaut, kein Überdecken des ersten Bildschirms.
**Ich hatte ein sticky Erzählelement der festen Leiste zugerechnet.** Die 37 % stehen in meinem
Prüfprotokoll; sie sind hiermit zurückgezogen. Wer die Zahl weitergetragen hat, bitte streichen.

---

## 1. Die fünf Befunde

Je Befund: **Seite · Gerät · beobachtetes Problem · Ergebnis der Nachprüfung** (wie im Brief).

### R-1 — Der Gratis-Knopf, der die Prüfung nicht anfordert

**Seite:** Startseite (`[data-behind-cta]`), globales Menü, Fußzeile · **Gerät:** 390×844 und
375×812 emuliert, ES · **Beobachtet:** drei Stellen tragen die Gratis-Formulierung, führen aber auf
`/contact` **ohne Parameter**.

Am selben Build gegenübergestellt:

| Ziel | `interest` | vorbelegte Nachricht | Senden-Knopf |
|---|---|---|---|
| `/es/contact?interes=trial&plan=essential` | **`trial`** | „Prueba gratuita · 14 días con Essential" | **„Pedir la prueba"** |
| `/es/contact` | **`other`** | leer | „Enviar" |
| `/es/trial` | **`other`** | leer | „Enviar" |

**Wer auf einen Knopf tippt, auf dem „Prueba Essential gratis" steht, sendet eine Anfrage, die als
`other` verbucht wird.** Der Brief verlangt „Gratis nur Essential" über **Knopf, Linkziel,
Formularvorbelegung und Bestätigung**. An diesen Stellen bricht es beim **Linkziel**.

**Nachprüfung an HEAD (nach Redesigns `2dd2d42`):**

| Stelle | Stand |
|---|---|
| Kopfzeile, schwarzer Knopf | **behoben** — `primary={{ href: p(entry.href) … }}`, und `entryAction` liefert `ESSENTIAL_HREF` |
| `components/home/behind.tsx:40` | **offen** — `localePath(locale, "/contact")` |
| `app/[locale]/trial/page.tsx` | **offen** — `if (entry.kind === "pilot") redirect(p("/contact"))` |

`EntryKind` hat nur noch den Wert `"pilot"`, also ist die Bedingung **immer wahr**: `/trial` ist
heute reine Weiterleitung, und sie leitet auf die parameterlose Form. Über `/trial` laufen
**`header.tsx:31`** und **`footer.tsx:30`**, beide mit der Beschriftung `entry.nav`
(„Prueba Essential"). Dieselbe Weiterleitung, zwei Menüeinträge.

**Kleinste Behebung — zwei Zeilen, nicht von mir geändert (ich fasse keinen Anwendungscode an):**
- `trial/page.tsx`: `redirect(p("/contact"))` → `redirect(p(ESSENTIAL_HREF))` — repariert Menü,
  Fußzeile und jedes Lesezeichen in einem.
- `behind.tsx:40`: `"/contact"` → `entry.href`.

### R-2 — `/trial` ist die Kontaktseite

**Seite:** `/es/trial` · **Gerät:** 390 emuliert · **Beobachtet:** gleiche h1 („Habla con una
persona."), gleiche Textlänge (1485 Zeichen) wie `/es/contact`, kein prüfungseigener Inhalt.
**Nachprüfung:** an der Quelle bestätigt, Ursache ist die Weiterleitung aus R-1. Entweder bekommt
die Route den Prüfungsweg, oder sie entfällt und die beiden Menüeinträge zeigen direkt auf
`ESSENTIAL_HREF`. **Nebenbefund:** `app/sitemap.ts:17` führt `/trial` als kanonische Adresse,
obwohl die Route dauerhaft weiterleitet.

### R-3 — Sprachwechsel unter 44 px

**Seite:** jede, im geöffneten Handy-Menü · **Gerät:** 390×844 emuliert · **Beobachtet:**
„EN ENGLISH" **42×34**, „ES ESPAÑOL" **40×34**. Der Brief nennt Sprachwechsel und ≥ 44 px
ausdrücklich. **Ebenfalls unter 44 und kundenseitig:** „Repetir demo" **40×32** in der Demo.
**Nachprüfung:** gemessen nach vollständigem Durchlauf der Seite, also nicht ein Mess-Artefakt
unbemalter Abschnitte. **Nicht gezählt:** der Schalter „Solo en la vista previa" (175×36) — der ist
vorschau-only und keine Kundenfläche.

### R-4 — Zwei Kaufhandlungen auf einer Karte

**Seite:** Startseite, Paketkarten · **Gerät:** 390 emuliert · **Beobachtet:** Essential trägt
„Prueba Essential gratis durante 14 días" (324×66) **und** „Contratar Essential directamente"
(324×44); Growth entsprechend; Enterprise eine. Redesign hat mir „eine Handlung pro Paket"
beschrieben; der Build zeigt auf zwei von drei Karten zwei.
**Nachprüfung:** die Größen stehen fest, die Bewertung nicht. Ob das als ein Angebot mit einer
leiseren zweiten Tür liest oder als zwei gleichrangige Aufforderungen, ist eine
Hierarchie-Entscheidung und gehört zur Designabnahme des Owners. **Ich melde es als Befund, nicht
als Fehler**, und es geht in die Note für Verkaufswirkung ein. Wer es vor dem Festfrieren klären
will, sollte es jetzt klären.

### R-5 — Geprüft und *kein* Befund

Das Feld `[name=web]` (Höhe 24 px) sah nach einer Falle für Formular-Roboter aus und damit nach
einem Tastaturproblem. **Es ist `tabindex="-1"` in einem `aria-hidden`-Umfeld, also korrekt aus der
Tastaturreihenfolge heraus.** Ich habe es aufgeworfen, geprüft und es ist in Ordnung — ich sage das,
damit niemand ihm nachgeht.

---

## 2. Was am Instrument jetzt belegt ist

Nicht als Note, sondern als Nachweis, dass der eine Durchgang tragen wird:

| | Ergebnis an `ab38b69` |
|---|---|
| **W-1**, Milas Anfrage → Rückrufaufgabe | erreichbar. „Mila" steht **im ersten Bildschirm** ohne Scrollen; **ein** Tipp auf „Ver cómo queda la tarea" (358×56) führt zum Endzustand, Tipp landet auf dem Ziel. Aufgabenkarte trägt TAREA / ESTADO / BUSCA / PIDE |
| **W-2**, Paketwahl → Formular → Bestätigung | erreichbar für alle vier Wege; jeder Tipp landet auf seinem Ziel |
| Vorbelegung je Weg | vier unterschiedliche `interest`-Werte, vier unterschiedliche Nachrichten, vier unterschiedliche Senden-Beschriftungen |
| **Bestätigung je Weg** | vier **unterschiedliche** Bestätigungen, 500–517 ms, je mit „QUÉ PASA AHORA" |
| Marken „Próximamente" auf den vier Kontaktwegen | **0** |

**Wichtig für meine eigenen Testsendungen:** die Bestätigung sagt auf der Vorschau ausdrücklich
„esta solicitud no se ha enviado a nadie". Meine vier Testsendungen sind also **nirgends
angekommen**; sie gingen ohnehin nur an die zugelassene Adresse.

**Die Demo-Absicht habe ich nicht geraten, sondern erfragt** (Redesign, 23.11.), und sie ist jetzt
die Messvorschrift für die Note Verständlichkeit:

| | Sollverhalten |
|---|---|
| (a) | Wer in die Demo hineinscrollt, sieht sie **einmal laufen**, von Milas Nachricht bis zur Aufgabe; danach Wechsel zum nächsten Kanal bis zum ersten Tipp |
| (b) | Der Hero-Link „Ver cómo queda la tarea" landet **sofort im Endzustand** (`data-demo-entered="end"`, kein Lauf) |
| (c) | Ein Tipp auf einen Kanal spielt **diesen** Kanal von vorn und beendet den Wechsel |
| (d) | Bei reduzierter Bewegung **steht das fertige Bild**, kein Lauf |

Mein Instrumentenlauf stimmt mit (b) überein: nach dem Hero-Link stand `data-demo-entered="end"`.
(a), (c) und (d) prüfe ich am festen Build, (d) mit gesetzter Einstellung für reduzierte Bewegung.

---

## 3. Noch offen, unverändert gemeldet

- **Das Versprechen-Register** `governance/WEBSITE_VERSPRECHEN_REGISTER_1120_v1.md` **existiert
  nicht** (geprüft 23.11., auch unter `NuovaSolution-n8n-system/governance/`). Der Seitenabgleich
  beginnt, sobald es liegt.
- **Paketunterschiede** tragen `data-plan-diffs="api-pending"`. Die dritte Erstbesucher-Aufgabe
  („nenne den entscheidenden Unterschied") lässt sich an einem Entwurf nicht endgültig benoten.
  **Für den 04.12. als Lücke gemeldet**, falls API bis dahin nicht liefert.
- **WhatsApp, zwei Wege getrennt** (Owner 23.11.): über unsere Nummer / über die Agenturnummer. Die
  Agenturnummer hängt an der Meta-Verifizierung, die der Owner vor der Alta nicht machen kann, und
  wird **am 04.12. als Lücke gemeldet**, nicht als Ausblendung.
- **Mein Gerätelimit** bleibt benannt: kein echtes iPhone/Safari, kein echtes Android/Chrome hier.
  Simulation und Gerät bleiben getrennte Spalten.

## 4. Werkzeuge, die hier liegen

`checks/recon1123.mjs` (Oberfläche), `checks/klaeren1123.mjs` (feste/klebende Elemente,
Tippflächen, Gratis-Knöpfe), `checks/wege1123.mjs` (W-1 und W-2 mit echtem Tipp und
`elementFromPoint`, also „wo man falsch tippt"), `checks/bestaetigung1123.mjs` (Formular bis
Bestätigung), `checks/detail1123.mjs` (Vorbelegung, Tastaturreihenfolge, Menü).
Belege: `checks/instrument-test-ab38b69-es390.json`, `checks/instrument-test-conf-ab38b69-es390.json`.

Jedes Skript bindet den Build am Anfang und am Ende; ein verschobener Build macht den Lauf
**ungültig**. Ein Schritt, der nichts verglichen hat, wird als „nicht erreichbar" oder
„abgebrochen" gemeldet — **nie als bestanden**.

---

## 4b. Der Rest des Briefs: Menü, Zurück, Sprachwechsel, Tastatur, reduzierte Bewegung

Alles an `ab38b69`, 390×844, ES, Build gebunden und **STABLE**. Zwei neue Befunde, ein
zurückgezogener, und mehrere Dinge, die einfach **gut** sind.

### Was gut ist — und das sage ich genauso deutlich wie die Mängel

| Prüfung | Ergebnis |
|---|---|
| **Zurück-Knopf** | beide Wege landen auf der **richtigen** Seite, und die Scrollposition bleibt: 12888 → 12888 und 10811 → 10811, **0 px Abweichung**. Der Besucher verliert seine Stelle nicht |
| Menü | Hamburger **44×44**, `aria-expanded` wird gesetzt, **Escape schließt** |
| Tastatur | Sprunglink „Ir al contenido" ist **das erste** Ziel; Fokusring auf dem Hauptknopf `outline: solid 2px` |
| **Reduzierte Bewegung** | tatsächlich emuliert, nicht angenommen: Medienabfrage greift, Phase bleibt 12 → 12, **0 laufende Animationen**, fertige Aufgabe sichtbar. **Absicht (d) hält** |
| **E-3** (Pakete vergleichen) | 3 Sätze mit „14 días", **alle drei nennen Essential**; **kein** Gratis-Wort an Growth oder Enterprise. „Gratis nur Essential" ist auf `/packages` erfüllt |
| **E-2** (Wochenbericht) | **beantwortbar.** „Casos abiertos" trägt QUIÉN / QUÉ PIDE / CANAL / PRIORIDAD / SIGUIENTE PASO / ESTADO mit vier Personen und vier Prioritäten, dazu „Qué toca hacer" mit drei Schritten. Marken: 0 |

### R-6 — **zurückgezogen, bevor er hinausging**

Mein erster Lauf sagte: **„der Sprachwechsel wechselt nicht"** — alle drei Seiten blieben auf ES.
**Das war mein Messfehler.** In den eingeklappten Kopfzeilen-Werkzeugen liegt eine **0×0 große
Zweitkopie** desselben Sprachlinks; mein Tipp traf diese und damit nichts. Mit der Bedingung
„nur ein Element mit sichtbarer Fläche" wechselt er korrekt: `/es` → `/en`,
`/es/packages` → `/en/packages`, jeweils dieselbe Seite in der anderen Sprache.
**Der Sprachwechsel ist in Ordnung.** Ich melde ihn ausdrücklich als *keinen* Befund, damit niemand
ihm nachgeht — und als Beispiel dafür, warum ich das Werkzeug an Etappe 1 vorher leer laufen lasse.

### R-7 — Der Sprachwechsel verliert die Absicht (neu, echt)

**Seite:** `/es/contact?interes=trial&plan=essential` · **Gerät:** 390 emuliert · **Beobachtet:**
der Sprachlink zeigt auf **`/en/contact?plan=essential`** — `interes=trial` fehlt. Angetippt landet
man dort, h1 „Talk to a person.".

**Folge:** wer die Prüfungsanfrage auf Englisch lesen will, verliert damit die Absicht; das Formular
fällt auf `interest="other"` zurück — **genau die Wirkung wie bei R-1, nur über den Sprachwechsel.**
Der Paketparameter überlebt, der Absichtsparameter nicht.
**Nachprüfung:** am `href` selbst ablesbar, also unabhängig von meinem Tipp. Betrifft jede
Kontaktseite mit `interes`.

### R-8 — **ZURÜCKGEZOGEN.** Redesign hatte recht, ich nicht

**Nachtrag 23.11., nach Redesigns Einspruch und Ihrer Weisung, mit echten Tab-Drücken
nachzumessen.** Das Ergebnis bestätigt Redesign, also ziehe ich R-8 zurück.

**Mein Fehler:** mein Filter prüfte `getComputedStyle(e).display !== "none"` **am Element selbst**.
Ein Nachfahre eines `display:none`-Elternteils behält aber seinen **eigenen** berechneten Wert
(`"flex"`), also kam die eingeklappte Desktop-Navigation durch einen Filter, den **kein Browser so
anwendet**. Die „34 unsichtbaren Stationen" und die „35 Tab-Schritte" gab es nie.

**Nachgemessen mit echten Tab-Drücken** (`Input.dispatchKeyEvent`, nach jedem Druck
`document.activeElement` gelesen) — **auf demselben Build `ab38b69`**, nicht auf Redesigns
lokalem Stand, damit der Vergleich trägt:

| Tab | Ziel | Größe |
|---|---|---|
| 1 | „Ir al contenido" | 132,8×48 |
| 2 | NuovaSolution | 140×28 |
| 3 | „Menú" | **44×44** |
| 4 | „Solo en la vista previa" (nur Vorschau) | 174,6×36 |
| 5 | „Ver cómo queda la tarea" | 358×56 |
| **6** | **„Prueba Essential gratis"** | **358×44** |

**6 Tab-Schritte** bis zur Haupthandlung, **0 Stationen auf Elementen ohne Fläche**, Fokusring
`solid 2px`. Genau Redesigns Zahlen.

**Das ist kein Mangel, sondern eine Stärke** — und ich hatte sie Ihnen als Mangel gemeldet. Die
Tastaturbedienung der Startseite ist gut. **Mein Werkzeug ist korrigiert**
(`checks/rest1123.mjs` misst jetzt mit echten Tab-Drücken statt mit einer Auswahlliste,
`checks/tabreal1123.mjs` ist die eigenständige Sonde, Beleg
`checks/tabreal-ab38b69-es390.json`).

**Zum zweiten Mal hat Redesign einen Fehler in meinem Messwerkzeug gefunden und lag richtig**
(das erste Mal beim Zeichen-Scan). Die eigentliche Lehre: **eine Auswahlliste mit
Sichtbarkeitsfilter ist keine Tab-Reihenfolge.** Die Tab-Reihenfolge kennt nur der Browser, also
frage ich ab jetzt den Browser.

### R-8 (ursprüngliche Fassung, überholt — zur Nachvollziehbarkeit)

**Seite:** Startseite · **Gerät:** 390 emuliert, Tastatur · **Beobachtet:** 87 fokussierbare
Elemente, davon **34 mit Größe 0**, aber weiterhin mit Tab erreichbar — die vollständige
eingeklappte Desktop-Navigation: *Plataforma, Atender, Gestionar, Coordinar, Captar, Visión
general, Paquetes, Prueba Essential, Contacto, EN/ES, Iniciar sesión* und **zweimal „Solicita tu
piloto gratuito"**.

**Bis zur Haupthandlung „Prueba Essential gratis" sind es 35 Tab-Schritte.** Wer mit der Tastatur
bedient, läuft auf dem Handy erst durch 34 Stationen, die niemand sieht.
**Nachprüfung:** Elemente mit `display:none` und `aria-hidden` habe ich ausgeschlossen; diese 34
sind keines von beidem, sondern auf Größe 0 geschrumpft — darum bleiben sie in der
Tab-Reihenfolge. **Nebenbefund:** dass dort noch zweimal die alte Formulierung „Solicita tu piloto
gratuito" steht, zeigt, dass eine reine Sichtprüfung diese Stellen nicht findet (an HEAD durch
`2dd2d42` behoben).

### Mein eigener Werkzeugfehler, offen protokolliert

Zweimal in diesem Lauf ist mir derselbe Fehler unterlaufen: **ein einfacher Rückstrich in einem
Schablonentext** (`\s` statt `\\s`) zerfällt zu `s` und löscht dann jedes „s" aus dem gelesenen
Text — aus „Gestionar" wurde „Ge tionar". Betroffen waren nur **Beschriftungen in der Ausgabe**,
keine Zählung und kein Urteil. Ich habe `checks/escscan.mjs` dazugelegt, das alle Sonden darauf
prüft, und beide Stellen auf die doppelte Schreibweise gebracht. **Ergebnis: keine weitere Stelle.**
Zudem war mein erstes E-2-Kriterium schlicht schlecht gewählt (es suchte eine Formulierung statt
der Tabelle) und hätte eine Seite, die die Aufgabe beantwortet, als „nicht beantwortbar" gemeldet.
**Beides gefunden, weil ich das Werkzeug vor dem Ernstfall leer laufen lasse — und genau dafür ist
dieser Durchgang da.**

---

## 5. Eine Folge der Löschentscheidung, die jetzt benannt sein muss

Redesign setzt Ihre Linie vom 23.11. so um (mir am 23.11. angekündigt): die
„Próximamente"-Texte werden **aus der Quelle gelöscht**, nicht versteckt — `proximamente.ts`
entfällt, **`publicGate` und die Sicht `?view=public` werden entfernt**, `live()` ist dann alles
außer `HIDDEN_BOTH`.

**Das ist sauber und es macht meine Markenprüfung erstmals beweisbar.** Eine Null ließ sich an einer
gerenderten Aufklappseite nie belegen — nach der Löschung belegt ein `grep` über `lib/content` und
`lib/i18n` die Null an der Quelle. Genau das hatte ich im Prüfprotokoll als die Grenze meiner
Messung benannt; sie fällt damit weg.

**Was dieselbe Löschung aber mitnimmt, muss offen liegen:** das Gate war der Mechanismus, der
unbelegte Aussagen von der öffentlichen Seite fernhielt. Ohne Gate gibt es keine Stufe mehr
zwischen „im Code" und „öffentlich behauptet" — **die Seite behauptet dann alles, was sie rendert.**
Das Löschen der Marke macht die Aussage nicht wahr; es entfernt nur den Hinweis, dass sie noch
nicht wahr ist.

**Für den 04.12. heißt das:** die gesamte Last liegt auf dem Abgleich gegen Audits
Versprechen-Register. Jede Aussage auf einer Kundenseite muss dort als belegt stehen, sonst melde
ich sie — nach Ihrer Weisung — **als Lücke an Sie und Audit, nie als Ausblendung**. Die Startblocker
sind damit nicht mehr abgefedert: **A12** und die vier weiteren Schlüssel aus `555567c`
(`trial`, `publicSignup`, `plans`, `dailyVoice`) wirken ab der Löschung unmittelbar, weil keine
öffentliche Sicht sie mehr zurückhält.

**Ich widerspreche der Entscheidung nicht** — Sie haben „kein Teilstart, keine ausgeblendeten
Hauptfunktionen" festgelegt, und über einen Teilstart entscheiden Sie allein. Ich sage nur, woran
der 04.12. dann hängt: nicht mehr am Gate, sondern daran, dass das Register für jede gerenderte
Aussage einen Beleg trägt.

---

## 6. Ihr Zusatz vom 23.11. — und das Register ist da

**Das Register liegt seit 14:39 vor** (`704960b6`, 45 Aussagen: 10 belegt, 4 nur Nachweis fehlt,
31 Bau/extern mit 6 Owner-Ausnahmen). **Meine Lückenmeldung von 14:30 ist damit erledigt** — sie
war zum Zeitpunkt richtig und ist neun Minuten später beantwortet worden. Audit hat **meine
Befunde R-1, R-2 und R-7 dort als Teil des Startblockers 5 aufgenommen.**

### Ihre Trennung nehme ich als Messvorschrift

Sie haben entschieden: **der Preview zeigt NuovaSolution bei 100 %** — alle Kanäle, Funktionen,
Pakete und Wege. Die Einteilung Prod/Staging/Bau steht **nur im internen Register**. Im Preview
bewerte ich **sichtbar, verständlich, bedienbar**; Aussagen ohne Registerbeleg führe ich als
**Lückenliste für den öffentlichen Start, nicht als Preview-Fehler**.

**Das löst §5 auf** — und zwar besser, als ich es formuliert hatte. Mein Einwand war: ohne Gate
behauptet die Seite alles, was sie rendert. Ihre Trennung antwortet darauf: der Preview **darf**
alles zeigen, weil er nicht der öffentliche Start ist, und das Register trägt die Wahrheit. **Ich
nehme §5 damit nicht zurück, aber seine Schlussfolgerung ist beantwortet:** die Last liegt auf der
Lückenliste, und die kann ich jetzt führen, weil das Register da ist.

**Was das konkret an einer Stelle bedeutet, an der beides auseinanderfällt:** Ihre dritte
Erstbesucher-Aufgabe heißt „nenne den entscheidenden Unterschied zwischen den Paketen". Im Preview
ist sie **beantwortbar** — die Karten zeigen Unterschiede. Im Register steht dagegen:
**„In Prod ist heute kein Punkt als Paketunterschied nutzbar"**, und Audit nennt die Planebene als
Startblocker 2 ohne Termin. Also: **Preview-Note ja, Lückenliste: die gesamte Paketunterschieds-
Ebene.** Genau die Trennung, die Sie angeordnet haben.

### Zwei Prüfungen, die Ihr Zusatz neu verlangt

| | Prüfung | Stand bei mir |
|---|---|---|
| **Sprachwechsel mitten im Formular** | Weg **und** Paket müssen erhalten bleiben | **neu aufgenommen.** Genau mein R-7: heute fällt `interes` weg. Redesign hat `interes` in die Erhalten-Liste des Sprachumschalters aufgenommen (lokal, reitet mit der Freigabe). **Ich prüfe es am Kandidaten mit gefülltem Formular**, nicht nur an der leeren Seite |
| **Bestätigungsmail bei Growth und Enterprise** | sobald APIs Staging-Beleg vorliegt | **aufgenommen, heute nicht prüfbar.** Register Zeile zum Anfrageweg: Staging 5/7, H2/H3 geben 502 statt 422. Bis der Beleg da ist, melde ich die Mail als **Lücke**, nicht als Fehler |

### Gemessen wird am Kandidaten, nicht an Etappe 1

Ihr Punkt 2 bestätigt meine Bindung: **erst nach Ihrer Preview-Freigabe, genau der von Redesign
genannte Kandidaten-Commit, geprüft über die Deployment-ID, Vorher-Basis `92f873d`.** Audits
Register bezieht sich auf den Kandidaten `4f425cb` (+ `62b0396`); Redesign nennt Commit und
Deployment in **einer** Nachricht, sobald Sie den Push freigeben. `/api/build` bleibt, damit ich
binden kann.
