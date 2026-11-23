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
| **Sprachwechsel mitten im Formular** | Weg **und** Paket müssen erhalten bleiben | **gemessen, Ergebnis in §7** |
| **Bestätigungsmail bei Growth und Enterprise** | sobald APIs Staging-Beleg vorliegt | **aufgenommen, heute nicht prüfbar.** Register Zeile zum Anfrageweg: Staging 5/7, H2/H3 geben 502 statt 422. Bis der Beleg da ist, melde ich die Mail als **Lücke**, nicht als Fehler |

### Gemessen wird am Kandidaten, nicht an Etappe 1

Ihr Punkt 2 bestätigt meine Bindung: **erst nach Ihrer Preview-Freigabe, genau der von Redesign
genannte Kandidaten-Commit, geprüft über die Deployment-ID, Vorher-Basis `92f873d`.** Audits
Register bezieht sich auf den Kandidaten `4f425cb` (+ `62b0396`); Redesign nennt Commit und
Deployment in **einer** Nachricht, sobald Sie den Push freigeben. `/api/build` bleibt, damit ich
binden kann.

---

## 7. Ihr Punkt 4 gemessen: Sprachwechsel mitten im Formular

**Gemessen an `ab38b69`** (also am Stand **vor** Redesigns R-7-Behebung), ES → EN, 390×844, alle
drei Wege, Formular **gefüllt**, Build gebunden und STABLE. Werkzeuge:
`checks/sprachmitten1123.mjs` und `checks/tippverlust1123.mjs`.

**Das Bild ist genauer, als R-7 es beschrieben hat — in beide Richtungen.**

| | Prüfung (Essential/Growth/Enterprise) | Ergebnis |
|---|---|---|
| 1 | **Paket in der Adresse** erhalten | **ja, 3 von 3** |
| 2 | **Weg in der Adresse** erhalten (`interes=…`) | **nein, 0 von 3** → das ist R-7 |
| 3 | **Weg im laufenden Formular** erhalten | **ja, 3 von 3** |
| 4 | **Was der Besucher getippt hat** | **verloren, 3 von 3** → **neu, R-9** |

### Was heute schon stimmt — und was ich damit an R-7 einschränke

Nach dem Wechsel steht im Formular weiterhin `interest="trial"`, die vorbelegte Nachricht ist
**korrekt übersetzt** („Prueba gratuita · 14 días con Essential" → „Free trial · 14 days on
Essential") und der Senden-Knopf heißt „Request the trial". **Der unmittelbare Eindruck ist also
richtig: Weg und Paket bleiben erhalten.** Ihr Punkt 4 ist in der laufenden Sitzung **erfüllt**.

**Was R-7 wirklich kostet, ist schmaler als ich geschrieben hatte:** die Adresse verliert den Weg.
Das trifft nicht den Besucher, der gerade umschaltet, sondern den, der die englische Adresse
**neu lädt, teilt oder als Lesezeichen speichert** — dann greift die Vorbelegung nicht mehr und
das Formular fällt auf `other`. Ein echter Mangel, aber einer mit engerem Schaden. Redesign hat
`interes` inzwischen in die Erhalten-Liste aufgenommen; ich prüfe es am Kandidaten nach.

### R-9 — Der Sprachwechsel löscht, was der Besucher getippt hat (neu)

**Seite:** `/contact` mit `interes`/`plan` · **Gerät:** 390×844 emuliert, ES → EN ·
**Beobachtet:** nach dem Wechsel sind `agency` und `name` **leer**. Der Besucher muss von vorn
tippen.

**Warum ich sicher bin, dass das die Seite ist und nicht mein Werkzeug** — genau die Frage, an der
ich heute zweimal falsch lag:
1. Der Text wurde **mit echtem Tasteneingang** gesetzt (`Input.insertText` in das angetippte Feld),
   nicht über einen programmatischen Wertsetzer. Der Fokus landete nachweislich im richtigen Feld
   (`"agency"`, `"name"`).
2. Die Werte **überlebten vorher ein erneutes Zeichnen** der Komponente — React hielt sie also
   wirklich, nicht nur das DOM.
3. Erst danach der Wechsel, und danach sind sie weg.

**Warum das zählt:** auf einem internationalen Markt ist der Sprachwechsel **mitten im Formular**
genau der erwartbare Griff — jemand beginnt auf Spanisch, merkt, dass Englisch leichter geht, und
schaltet um. Dass dann Agenturname und Name verschwinden, ist der Moment, in dem ein Teil dieser
Besucher aufhört. **Für die Note Verkaufswirkung wiegt R-9 schwerer als R-7**, weil es den
Besucher trifft, der schon angefangen hat.

**Nicht geprüft und daher nicht behauptet:** ob E-Mail und Telefon ebenso verloren gehen (ich habe
nur `agency` und `name` mit echtem Tasteneingang belegt) und ob EN → ES sich gleich verhält. Beides
messe ich am Kandidaten mit.

---

## 8. Was ich am Kandidaten zusätzlich prüfe (aus Redesigns R-9-Behebung)

Redesign behebt R-9, indem das Anfrageformular `agency`, `name`, `email`, `phone` und die
Nachricht bei jeder Eingabe im **Sitzungsspeicher des Browsers** hält und beim Aufbau des
Formulars in der anderen Sprache zurückschreibt; beim Absenden wird es gelöscht. Nur dieser Tab,
nichts verlässt den Browser, weg beim Schließen.

**Dazu habe ich keinen Einwand und melde keinen.** Es sind die eigenen Daten des Besuchers, in
seinem eigenen Tab, beim Absenden entfernt. So macht man Formular-Erhaltung. **Ich halte es hier
nur fest, damit Audit es im Registerzusammenhang sieht und nicht später entdeckt** — ein Hinweis,
keine Lücke.

### Eine Kante, die ich deshalb neu auf die Liste nehme

Redesigns Regel: die Nachricht wird nur zurückgeschrieben, **wenn sie sich vom vorbelegten Betreff
unterscheidet.** Daraus folgt ein Fall, den ich prüfen muss:

> Ein Besucher öffnet Essentials Weg, tippt **keine** Nachricht, und geht dann auf einen
> **anderen** Weg (Growth-Demo). Im Speicher liegt „Prueba gratuita · 14 días con Essential". Der
> Growth-Betreff lautet „Demo · plan Growth". Die gespeicherte Nachricht **unterscheidet sich**
> davon — wird also zurückgeschrieben. Dann ginge eine Growth-Anfrage mit **Essentials Betreff**
> hinaus, während Weg und Paket korrekt auf Growth stehen.

**Das ist eine Vermutung aus der Beschreibung, kein Befund** — prüfbar erst am Kandidaten. Ich habe
es Redesign vor dem Festlegen des Kandidaten genannt, weil es dort billiger zu beheben ist.

**Prüfschritte, die ich dafür ergänze:** Essential-Weg → nichts tippen → auf den Growth-Weg wechseln
→ `interest`, `plan` und Nachricht **zusammen** lesen; dasselbe für Enterprise. Dazu die geraden
Fälle ES→EN und EN→ES mit `email` und `phone`, die Redesign jetzt mitträgt.

---

## §9 Kandidat 49c4670 — Prüfung an der Quelle, vor der Messung (23.11.)

Redesign hat den Kandidaten genannt: **`49c4670`**, Branch `website_enterprise_redesign`, lokal;
der Push wartet auf die Freigabe des Owners. Gemessen wird nach der Owner-Regel erst am Deployment
anhand der Deployment-ID. Was **ohne** Deployment prüfbar ist, habe ich jetzt geprüft, damit der
Durchgang am Deployment nur noch Verhalten messen muss und nicht sucht.

### §9.1 Die Festlegung ist gültig

Redesigns Angabe, `49c4670` ändere gegenüber `53a28e1` nur Belegdateien, **stimmt**:

    git diff --name-only 53a28e1 49c4670 | (alles ohne docs/)  ->  leer
    10 Dateien, alle unter docs/ (6 Belege, 3 Sonden, 1 API-Tabelle)

Der Arbeitsbaum ist für `app/`, `components/`, `lib/` sauber. Der Seiteninhalt von `49c4670` ist
damit identisch mit `53a28e1`; die Festlegung ist belastbar, und `/api/build` muss am Deployment
`49c4670` melden — das ist die Bedingung, unter der ich messe.

### §9.2 Meine Befunde R-1, R-2, R-7, R-9 — an der Quelle behoben

| | Stelle | Stand |
|---|---|---|
| R-1 | `components/home/behind.tsx:41` | `localePath(locale, ESSENTIAL_HREF)` — die Vorbelegung geht nicht mehr verloren |
| R-1 | `app/[locale]/trial/page.tsx:34` | `redirect(p(ESSENTIAL_HREF))` statt `p("/contact")` — die Weiterleitung trägt den Weg mit |
| R-2 | `components/site/header.tsx:31` und `:63` | beide Stellen auf `p(entry.href)` |
| R-2 | `app/sitemap.ts:17` | `/trial` ist keine kanonische Seite mehr |
| R-7 | `components/site/language-switcher.tsx:11` | `KEEP = ["confirmed","plan","ref","interes"]` — der Weg reist mit |
| R-9 | `components/site/pilot-request-form.tsx:21-62` | behoben, und **besser als meine beiden Vorschläge** |

Zu R-9: Redesign hat **beides** gebaut — ein Merkzeichen `messageTyped`, das beim ersten Tastendruck
im Nachrichtenfeld gesetzt wird und gesetzt bleibt, **und** einen Austausch des Betreffs
(`:49`: steht die gespeicherte Nachricht auf dem gespeicherten Betreff, wird dieser Anfang durch den
Betreff **dieses** Formulars ersetzt). Damit ist die Kante, die ich in §8 gemeldet habe, **an der
Wurzel geschlossen**: wer nichts tippt, hat kein `messageTyped`, die Nachricht wird gar nicht
zurückgeschrieben, und das neue Formular behält seinen eigenen Betreff. Wer eine Notiz tippt, behält
sie, und der Betreff wird auf den neuen Weg und die neue Sprache umgestellt. Das ist die saubere
Lösung, und sie ist nicht die, die ich vorgeschlagen hatte.

### §9.3 R-9b — ein Rest, der aus derselben Regel folgt (Vermutung, Sonde steht)

Der Austausch greift nur, wenn die gespeicherte Nachricht **mit** dem gespeicherten Betreff
**beginnt** (`v.startsWith(k.subject)`). Wer die Notiz **vor** die Vorbelegung tippt — Einfügemarke
am Anfang des Feldes, eine normale menschliche Handlung —, erfüllt die Bedingung nicht. Dann wird
der Text unverändert zurückgeschrieben und der Betreff des **verlassenen** Weges bzw. der
**verlassenen** Sprache reist im Text mit. Weg und Paket der Anfrage bleiben richtig; falsch ist nur
ein Satz **im Text** der Anfrage.

**Das ist eine Vermutung aus dem Lesen der Behebung, kein Befund.** Gewicht: gering — keine
Fehlleitung, ein verwirrender Satz in einer richtigen Anfrage. Behebung wäre eine Zeile (die Notiz
getrennt vom Betreff halten, statt den Anfang zu vergleichen).

Die Sonde dafür steht und ist syntaxgeprüft: `r9kante1123.mjs`. Sie fährt **vier** Läufe —
Notiz **über** der Vorbelegung und Notiz **unter** ihr, je einmal mit Sprachwechsel und einmal mit
Wegwechsel. Die Läufe mit der Notiz unten sind die **Gegenkontrolle**: das ist genau der Fall, den
Redesign 10/10 gemessen hat, er **muss** sauber bleiben. Bleibt er nicht sauber, ist meine Sonde
falsch und nicht die Seite.

Ein eigener Fehler, vor dem Lauf gefunden: meine Fremdbetreff-Merkmale enthielten zuerst auch die
Wörter der **Zielsprache**, so dass der **richtige** Austausch als Fehler gelesen worden wäre. Die
Merkmale sind jetzt die des verlassenen Formulars in dessen eigener Sprache.

### §9.4 Zwei neue kleine Befunde am Kandidaten

**R-10 — doppelter Einstieg im Fußbereich.** `components/site/footer.tsx:29-30`: in der Spalte
„Empezar" stehen zwei Verweise direkt untereinander, `p(entry.href)` mit „Prueba Essential gratis"
und `p("/trial")` mit „Prueba Essential". Beide enden auf demselben Formular, der zweite über eine
Weiterleitung durch eine Seite, die es als Seite nicht mehr gibt (§9.2). Gewicht: gering, aber es
ist genau die Form von R-2, und zwar in der einen Spalte, deren Aufgabe der Einstieg ist. Behebung:
Zeile 30 entfernen.

**R-11 — „Para una oficina" verspricht einen Paketunterschied, den der Owner gestrichen hat.**
`lib/content/brief-1120.ts:67` setzt als Wer-ist-es-für-Zeile: Essential „Para una oficina" /
„For one office", Growth „Para equipos que se reparten el trabajo", Enterprise „Para agencias
grandes". Diese Zeile wird **gerendert**, an drei Stellen: `components/home/plans-table.tsx:118`,
`:156`, `:198` (Telefonkarte, Schreibtischkarte, Vergleichstabelle).

Nach der Owner-Entscheidung (a63ae1c, API `bd7a685`, Registerzeile 42) sind Büros **weder ein
Paketpunkt noch eine geplante Funktion**, und das Register sagt: „In Prod ist heute kein Punkt als
Paketunterschied nutzbar." Eine Besucherin mit drei Büros liest „Para una oficina" trotzdem als
Grenze und schließt, Essential sei nichts für sie. Gemeint ist vermutlich die Zielgruppe, nicht die
Grenze — auf dem Schirm sind die beiden nicht unterscheidbar. Das ist ein **Produktversprechen**,
kein Gestaltungspunkt; Behebung ist eine Wendung, und sie gehört Copy und dem Owner, nicht mir.

### §9.5 Geprüft und **kein** Mangel — damit es niemanden überrascht

**„24 h".** Ich habe jede Fundstelle gelesen. Redesigns Angabe trifft zu: in Bestätigungen,
Handlungszeilen, FAQ und Einstiegsschritten steht nichts mehr, und auf `/` bleibt allein das
Zeitfenster der Vorführtafel. Zwei **gerenderte** Stellen enthalten aber weiter „24 horas" /
„24 hours": `lib/i18n/dictionaries/es.ts:928` und `en.ts:984`, in der Liste „Para qué se usa la
conexión" der Instagram-Verbindungsseite (hinter der Anmeldung). Das ist das
**Nachrichtenfenster von Meta**, eine Plattformregel in der Berechtigungsliste — **kein**
Antwortversprechen von NuovaSolution. Es bleibt richtig stehen. Ich nenne es, weil es jedem
auffällt, der die Owner-Anweisung wörtlich prüft.

**Büros.** Die Beschriftungen `limits.offices` („Oficinas"/„Offices", `es.ts:421` / `en.ts:457`)
und `planLines` („Una oficina, un equipo pequeño") existieren noch, werden aber von **nichts**
verbraucht — toter Wörterbuchinhalt. Gerendert ist davon nichts; Redesigns Angabe hält. Dass im
Katalog `lib/content/plans.ts:57` weiter `offices: 5` steht, ist eine Zahl ohne Schirm.
(Die gerenderte Ausnahme ist R-11 in §9.4, und die steht nicht in dieser Liste.)

**„Hasta 50 personas en la cuenta."** Bestätigt, und sie stammt nicht aus einer Behauptung, sondern
aus dem Katalog: `brief-1120.ts:6` liest `limits.seats` des Pakets `scale`, `:83` setzt die Zeile.

**CRM-Namen.** HubSpot, Pipedrive, Zoho, Salesforce stehen nur in `lib/contracts/stubs.ts` mit
`availability: "coming_soon", selectable: false` und in `lib/claims.ts:63` als `"soon"`. Kein Name
ist als verfügbar gesetzt. Wie das auf dem Schirm aussieht, messe ich am Deployment.

### §9.6 Was erst am Deployment geht

R-3 (jedes Tippziel ≥ 44 px), die sechs Noten, W-1 (Milas Weg bis zur Rückrufaufgabe), W-2 (alle
drei Paketwege bis zur Bestätigung ES und EN), R-9b, Redesigns Prüfpunkt
(„Ver cómo queda la tarea" → `#demo`, WhatsApp-Kanal, Milas Aufgabe), die neuen Stellen des
Kandidaten (R-4-Verweis, Gmail-oder-Outlook-Zeile, Enterprise-Zeile, Q-1-Wendung) und der
Seite-für-Seite-Abgleich gegen das Register `704960b6` für die **Lückenliste**.

Es fehlt dafür nur die Preview-Freigabe des Owners. Zwischen Benennung und meinem Durchgang ändert
sich nach Redesigns Zusage nichts.

---

## §10 R-9b, R-10 bestätigt · R-11 angenommen · die Wahl A/B gehört dem Owner (23.11.)

### §10.1 Redesign bestätigt beide Punkte an der Quelle

- **R-10**: `footer.tsx:29-30` trägt beide Verweise unter „Empezar", der zweite ist die Form von
  R-2; Zeile 30 entfernen behebt es.
- **R-9b**: der Betreff wird nur ausgetauscht, wenn die gespeicherte Nachricht mit ihm **beginnt**;
  eine vor die Vorbelegung getippte Notiz reist unverändert zurück und trägt den Betreff des
  verlassenen Weges im Text. Weg und Paket bleiben richtig. Behebung: den gespeicherten Betreff
  ersetzen, **wo er auch steht** — eine Zeile.

**Statusänderung, die ich festhalte:** R-9b war in §9.3 ausdrücklich eine **Vermutung aus dem Lesen**
der Behebung. Sie ist jetzt **vom Urheber an der Quelle bestätigt** und damit kein Verdacht mehr,
sondern ein Befund — **ungemessen**, aber in der Sache nicht mehr offen. Darauf kommt es bei der
Wahl in §10.4 an: an R-9b ist nichts mehr herauszufinden.

### §10.2 R-11 angenommen — und Copy hat eine Stelle gefunden, die ich übersehen hatte

Copy nimmt R-11 an; die endgültigen Zeilen stehen in `21830f8` (§6.5). `who.essential` wird
„Para un equipo pequeño" / „For a small team", `planLines.essential` ebenfalls (obwohl tot). Die
Zielgruppenzeilen gehen künftig nach **Teamgröße** (Puestos 3 / 8 / 50 ist eine geplante
Paketzeile), nie nach Büros.

**Copy nennt dabei eine zweite gerenderte Stelle, die in meinem §9.4 fehlt:**
`lib/content/home-1103.ts:477` — Essentials Einordnungszeile „Respuestas, fichas e informe para una
oficina." / „Replies, records and report for one office." Ich habe sie nachgesehen: sie steht dort
und sie wird gerendert. Copy hat recht, mein §9.4 war unvollständig.

**Wie ich sie übersehen habe, und das ist mein Fehler, kein Zufall:** mein erster Durchlauf durch
die Bürostellen war auf `head -10` begrenzt. Die Ausgabe endete nach zehn Zeilen mit meiner eigenen
Abschlussmarke — und ich habe die Liste danach als **vollständig** behandelt und in §9.4 „an drei
Stellen" geschrieben, als wäre das der ganze Bestand. Eine abgeschnittene Suche, die sich wie eine
fertige liest, ist derselbe Fehlertyp wie mein Filter in R-8: das Werkzeug hat nicht widersprochen,
also habe ich ihm geglaubt. Gegenmittel ist dasselbe wie dort — die Suche ohne Deckel und ohne
Groß-/Kleinschreibung fahren und die Trefferliste bis zum Ende lesen.

### §10.3 Der vollständige Bestand, und was **nicht** dazugehört

Ungedeckelt und ohne Groß-/Kleinschreibung über `lib`, `components`, `app`:

**Dieselbe Klasse wie R-11 — Büro als Paketgrenze (zwei gerenderte Stellen, beide von Copy gedeckt):**
`brief-1120.ts:67` und `home-1103.ts:477`. Dazu `planLines.essential` als tote Stelle. **Mehr nicht.**

**Ausdrücklich NICHT dieselbe Klasse — bitte nicht „mitreparieren":** die Schmerzgeschichte lebt von
der geschlossenen Praxis, und die ist richtig. „con la oficina cerrada", „fuera de la oficina",
„hasta que abre la oficina", „Nadie en la oficina", „Llegaron con la oficina cerrada"
(`home-1103.ts:268, 288, 352, 357, 359, 364, 448, 668`, `home-story.ts:274`,
`capabilities.ts:95-101`, `strengths.ts`) sprechen von **Uhrzeit und Anwesenheit**, nicht von Anzahl.
Ebenso ist „responsable de oficina" / „office manager" eine **Rolle** (`es.ts:479`, `en.ts:516`,
`capabilities.ts:205-210`, `onboarding-setup.tsx`), keine Büroanzahl. Und `example-report.ts`
`office` ist die Bürozeit-Notiz der Beispielauswertung.

**Eine Randnotiz, kein Befund:** `es.ts:136` / `en.ts:146` `office_out_of_scope` — „Esa oficina queda
fuera de lo que tu rol puede cambiar." / „That office is outside what your role can change." Dieser
Satz **setzt mehrere Büros mit Rollenbereichen voraus**. Er erscheint nur hinter der Anmeldung **und**
nur, wenn die Schnittstelle diesen Fehler zurückgibt, also heute nie. Gewicht: sehr gering, es ist
eine Systemmeldung und kein Versprechen. Ich nenne ihn für Audit, damit er nicht übrig bleibt, wenn
Büros später doch einmal gebaut werden — und ich führe ihn **nicht** als Mangel.

### §10.4 Redesign legt dem Owner zwei Wege vor — meine Empfehlung ist B

> **(A)** `49c4670` wie festgelegt pushen, RV6 misst, R-9b und R-10 erscheinen als Befunde,
> Redesign behebt im ersten Nachgang nach dem Durchgang.
> **(B)** Einmaliges Neu-Festlegen **vor** dem Push mit den Einzeilern (neuer Commit, Redesigns
> eigene Messungen erneut, ~10 Minuten).

Redesign ändert den Kandidaten **nicht** von sich aus und beruft sich dabei richtig auf die
Owner-Regel vom 23.11. Bis zur Linie des Owners steht `49c4670`.

**Begründung für B.** Die Regel „ein benannter Commit, nichts ändert sich bis zur Messung" schützt
davor, dass sich der Prüfgegenstand **während oder nach** der Messung bewegt. Ein einmaliges
Neu-Festlegen **vor** dem Push und **vor** meinem Durchgang berührt diesen Zweck nicht: zwischen
Benennung und Durchgang liegt dann wieder nichts.

Dazu zwei sachliche Punkte:

1. An R-9b und R-10 ist **nichts mehr zu messen**. Beide sind an der Quelle bestätigt, von mir und
   vom Urheber. In A verwendete ich einen Durchgang darauf, zwei Dinge zu belegen, über die niemand
   streitet — und der Nachgang bräuchte danach **ein zweites Deployment und einen zweiten
   Durchgang**, um die Behebung zu prüfen. B kostet zehn Minuten, A kostet einen weiteren
   vollständigen Durchgang.
2. **R-11 wiegt schwerer als seine Größe.** Es ist kein Schönheitsfehler, sondern ein
   **Paketunterschied auf dem Schirm, den es nicht gibt** — genau die Klasse, die am 04.12. gegen
   das Register geprüft wird. In A würde mein Durchgang ein falsches Paketversprechen dokumentieren,
   das Copy zum Zeitpunkt der Messung längst behoben hat. Das ist ein Protokoll, das niemandem hilft.

**Bedingung, und sie ist nicht formal.** R-10 und die beiden Wendungen aus R-11 sind harmlos
(ein Listeneintrag, zwei Texte). **R-9b ist es nicht:** die Behebung greift genau in den Pfad ein,
den Redesign gerade 10/10 gemessen hat. Wenn B, dann muss Redesign die Messung des Sprachwechsels
mitten im Formular **vollständig** erneut fahren, nicht nur die Kante — und meine Gegenkontrolle in
`r9kante1123.mjs` (Notiz **unter** der Vorbelegung) muss auf dem neuen Commit sauber bleiben. Bleibt
sie es nicht, ist die Behebung eine Regression und der Kandidat ist nicht fertig.

### §10.5 Was ich tue, wenn keine Linie kommt

Die Wahl blockiert meinen Durchgang **nicht**. Kommt keine Antwort, messe ich, was gepusht wird:
steht `49c4670`, ist das A, und R-9b, R-10 und R-11 stehen als Befunde im Bericht. Ich warte auf die
Freigabe, nicht auf die Entscheidung — und ich frage nicht nach, denn die Anweisung des Owners vom
23.11. lautet „keine weitere Klärung, sondern messen". Diese Zeilen sind keine Klärung des Maßstabs,
sondern eine Frage von zehn Minuten; beide Antworten lassen mich sofort anfangen.

### §10.6 Nachtrag: Copy empfiehlt B unabhängig, aus demselben Grund (23.11.)

Copy bestätigt meinen vollständigen Bestand (zwei gerenderte Stellen, dazu die tote; „nichts
anderes ändert Copy") und hat dem Owner **ebenfalls B** empfohlen, ohne dass wir uns abgestimmt
hätten. Copy nennt dabei einen Umstand, den ich nicht hatte und der das Gewicht verschiebt:
**der Owner gibt seine Rückmeldung zu Weg 2 an genau diesen Pakettafeln.**

Damit würde er unter A Karten beurteilen, die eine Zeile tragen, die Copy bereits zurückgenommen
hat — und meine Messung würde dasselbe protokollieren. Drei Bahnen kommen unabhängig auf B:
Redesign hat die Wahl vorgelegt, Copy und ich empfehlen sie. Die Entscheidung bleibt beim Owner,
und meine Bedingung aus §10.4 bleibt unverändert: bei B die Messung des Sprachwechsels mitten im
Formular vollständig erneut, und meine Gegenkontrolle muss sauber bleiben.
