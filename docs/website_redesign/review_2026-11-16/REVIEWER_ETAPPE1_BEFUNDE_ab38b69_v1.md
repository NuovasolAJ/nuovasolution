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
Aussage einen Beleg trägt. **Ohne das Register kann ich das nicht prüfen** — und es liegt noch
nicht (§3).
