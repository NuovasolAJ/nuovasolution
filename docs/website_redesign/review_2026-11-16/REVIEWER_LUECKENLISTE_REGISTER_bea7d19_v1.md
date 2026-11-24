# RV6 — Lückenliste für den öffentlichen Start, Seite für Seite gegen das Register

**Grundlage** Audits Register `governance/WEBSITE_VERSPRECHEN_REGISTER_1120_v1.md` (`704960b6`, 45 Zeilen).
**Gemessen** 24.11. am Build `bea7d19` · `dpl_H6WfQ1GKkjwRtP8F5wq2ZH3SKjUK` — **derselbe Pin wie die
sechs Noten**, Build am Anfang und am Ende gelesen, stabil.
**Seiten** ES: `/`, `/packages`, `/platform`, `/faq`, die drei `/contact`-Wege, `/example-report`,
`/trial`. Gelesen wird der Text, den eine Besucherin wirklich sieht (`innerText`, nach vollständigem
Durchlauf der Seite, jeder Aufklapper einzeln geöffnet, Vorführteil in seinem Endzustand).

**Die Regel des Owners vom 23.11., nach der ich hier bewerte:** der Preview zeigt NuovaSolution bei
100 %. Eine Aussage, deren Registerklasse **nicht „belegt"** ist, ist deshalb **kein Preview-Fehler**,
sondern ein Eintrag auf dieser **Lückenliste für den öffentlichen Start**. Umgekehrt gilt Audits §E:
eine gerenderte Aussage **ohne Registerzeile** ist ein **Befund**.

## Zählung

| | Zeilen |
|---|---|
| gerendert und **belegt** — tragfähiger Boden | **10** |
| gerendert und **nicht belegt** — **Lückenliste** | **27** |
| **nicht gerendert** (Abwesenheit belegt, nicht nur ungefunden) | **7** |
| nicht gerendert, aber tragend (Z. 19 Bürozeiten) | 1 |
| **gerendert ohne Registerzeile → Befund (§E)** | **4** |
| **gerendert WEITER als die eigene Zeile → Befund** | **2** |
| von mir zuerst als Befund notiert, nach Prüfung **zurückgezogen** | 1 |

10 + 27 + 7 + 1 = 45. Audits eigene Zählung (10 belegt, 4 nur Nachweis fehlt, 31 Bau) stimmt mit
meiner überein; ich teile sie nur anders auf, nämlich danach, **was auf dem Schirm steht**.

---

## A. Die Lückenliste, nach Gewicht

### A1. Die schwerste: der erste Bildschirm selbst

| Zeile | Aussage | Klasse | wo |
|---|---|---|---|
| **21** | Aufgabentitel **mit Kundennamen und Objekt**: „Llamar a Mila · Comprobar disponibilidad de la ref. 9895153" | **Bau** | `/` erster Bildschirm **und** Vorführteil |
| **25** | „TAREA **PARA MARTA**" — Aufgabe an eine Person des Teams, Rollen | **Bau** | `/` erster Bildschirm |
| **22** | die spätere Antwort aktualisiert die Aufgabe: „a partir de las 17:00" | **Bau (unsicher)** | `/` Vorführteil |

Das ist die stärkste Stelle der Seite — in meinem Notendurchgang war „die fertige Aufgabe steht im
ersten Bildschirm" das Ergebnis, das `92f873d` nicht hatte. **Und genau diese drei Aussagen sind in
Prod nicht nutzbar:** der Prod-Aufgabentitel lautet „Llamar a este cliente", ohne Namen (Z. 21);
Rollen je Person gibt es nicht (Z. 25); Z. 22 ist überhaupt nicht belegt.

**Was es entschärft, und das gehört dazu:** die Karte trägt im ersten Bildschirm sichtbar
**„Ejemplo · datos ficticios"**, und der Vorführteil „Ejemplo · nombres ficticios". Es ist also als
Beispiel ausgewiesen und behauptet nichts über das Konto der Besucherin. **Es ist keine Falschaussage.**
Was es verspricht, ist eine **Fähigkeit** — „so sieht die Aufgabe bei euch aus" —, und die hat Prod
heute nicht. Darum steht es hier und nicht in den Befunden.

### A2. Kanäle und Anschluss (intern lösbar)

| Zeile | Aussage | Klasse | wo |
|---|---|---|---|
| 3 | „Responde por WhatsApp y email" über **unsere** Nummer für eine Kundenagentur | Bau | `/packages` |
| 6 | „Conecta tu buzón y tu WhatsApp", „Tu correo de Gmail o de Outlook" | Bau (A12) | drei `/contact`-Wege, `/trial`, `/packages` |
| 7 | **Outlook** | Bau | `/packages`, `/faq` |
| 8 | **Formulario web** als dritter Kanal | Bau | `/`, `/example-report` |
| 20 | „Avisos de consultas importantes — **Un email a la persona adecuada** de tu equipo" | Bau | `/platform` |
| 29 | „**Informe semanal por email**", „Informe ampliado: evolución, canales y conclusiones" | Bau | `/packages` |
| 30 | „Cada semana, un informe con **lo que pide tu atención**" | Bau | `/packages` |
| 31 | „INTEGRACIONES — **Conexión con tu CRM**", „Leads de portales y anuncios" | Bau | `/packages` |

Zeile 6 ist Audits Startblocker 1 (A12) und trägt die ganze Spalte: ohne Postfach-Anschluss einer
Kundenagentur hängen auch die zehn „belegten" Zeilen an der **eigenen** Agentur.

### A3. Paketebene (Thema 23, nach Audit **ohne Termin**)

| Zeile | Aussage | wo |
|---|---|---|
| 34 | „Elige tu plan", „Todo lo de Essential/Growth, y además:" und die Vergleichstabelle | `/packages` |
| 23 | „Cada persona, su lista de tareas del día" (Growth) | `/packages` |
| 26 | „Propone inmuebles que encajan con cada cliente", „Inmuebles que encajan" | `/`, `/packages` |
| 41 | „**Hasta 50 personas en la cuenta**" (Enterprise) | `/packages` |
| 35 | „Prueba Essential gratis", „**14 días gratis, sin tarjeta**" | `/`, `/packages`, `/faq` und faktisch überall |
| 39 | Growth → Demo-Anfrage, Enterprise → Gespräch | `/contact`-Wege |

**Ein Hinweis an Audit zu Zeile 35:** das Register fragt unter **Q-1**, ob der Essential-Test selbst
gestartet wird (dann braucht Prod `trial` und `publicSignup`) oder **auf Anfrage** läuft. Der Owner
hat am 23.11. **„auf Anfrage"** entschieden. Damit schrumpft der fehlende Schritt von Zeile 35 auf
den **Anfrageweg** (Z. 38/39) — `trial` und `publicSignup` in Prod braucht sie nicht mehr. Das ist
die größte Vereinfachung, die ich im Register sehe, und sie ist noch nicht eingetragen.

### A4. Hängt an Owner-Ausnahmen — nach Audits Regel **Ausnahme, nicht Lücke**

| Zeile | Aussage | Ausnahme | wo |
|---|---|---|---|
| 4 | „WhatsApp, **con el número de tu agencia** o con el nuestro" | **Meta** (E3) | `/packages`, `/platform` |
| 33 | „Clientes nuevos desde tus **redes sociales**" (Enterprise) | **Meta** | `/packages` |
| 10 | „Leads de **portales y anuncios**" (Meta-Teil) | **Meta** (teilweise) | `/packages`, `/example-report` |
| 9 | Telefon als Kanal, „**no confirma citas** ni da precios" | **Anwalt** (Prod-Telefon) | `/faq` |
| 27 | „**Seguimiento** de tus contactos, **con su permiso**" | **Anwalt** | `/packages`, `/platform` |
| 44 | „**Las condiciones, por escrito.**" | **Anwalt** | `/faq`, `/contact`, `/trial` |

Der Owner hat am 23.11. ausdrücklich verlangt, die zwei WhatsApp-Wege **getrennt** zu melden. Hier
sind sie getrennt: **Zeile 3** (über unsere Nummer, intern lösbar) und **Zeile 4** (über die Nummer
der Agentur, Meta-Verifizierung, die vor der Alta nicht geht).

### A5. Nur der Nachweis fehlt — gebaut, aber nur für die eigene Agentur belegt

| Zeile | Aussage | wo |
|---|---|---|
| 2 | „también de noche" | `/packages` |
| 15 | „¿es una sola ficha?" (eine Person, alle Kanäle) | `/faq` |
| 45 | „Una petición de visita se registra como petición y **una persona la confirma**" | `/faq` |
| 32 | „Visualización 3D — Opcional", „Tu plano, en 3D", „Un modelo 3D … a partir de tu plano" | `/`, `/packages`, `/platform` |

Zeile 32 führt Audit als **Bau** (keine 3D-Tabelle in Prod); sie steht hier, weil sie auf drei Seiten
als Angebot erscheint, einmal sogar als **„Opcional, con cualquier plan"**.

---

## B. Der tragfähige Boden: 10 Zeilen gerendert **und** belegt

Z. 1 (Antwort per E-Mail) · Z. 5 (Spracherkennung, „Detección del idioma", EN mit Übersetzungszeile)
· Z. 11 („Cada consulta en su ficha") · Z. 12 („con su prioridad y su motivo") · Z. 13 (Herkunft /
„por canal") · Z. 14 (Etiketten) · Z. 16 („Lee el anuncio") · Z. 17 (Erinnerung nach 1 h) ·
Z. 18 (Eskalation) · Z. 28 (Bericht im Zugang).

**Alle zehn gelten nur für die eigene Agentur** — das ist Audits Satz, nicht meiner, und er bleibt
bis A12 richtig.

**Zu Zeile 14 eine gute Nachricht:** Audit nennt als fehlenden Schritt, der Satz müsse „Gmail"
meinen. Er tut es: `/packages` rendert „**Etiquetas en tu bandeja de Gmail**". Die Bedingung ist auf
dem Schirm erfüllt.

---

## C. Nicht gerendert — und die Abwesenheit ist **gemessen**, nicht nur ungefunden

Für jede dieser Zeilen habe ich zusätzlich nach den Wörtern gesucht, die die Aussage benutzen
**müsste**, damit „nicht gefunden" nicht einfach ein zu enges Muster von mir ist.

| Zeile | Aussage | Beleg der Abwesenheit |
|---|---|---|
| 24 | Sprach-Tagesassistent | „voz" **0×** auf allen Seiten |
| 36 | Testgrenzen 3 Personen / 750 / 1 Postfach / 1 CRM | „750" **0×**, „límite" **0×**, „consultas al mes" **0×** |
| 37 | was nach dem Testende passiert | „termina" **0×**, „fin de la prueba" **0×** |
| 38 | **„Te escribimos en 24 h"** | „horas" **0×**, „laborables" **0×** |
| 40 | Growth 8 Personen / 3 CRM | „conexiones" **0×** |
| 42 | **„varias oficinas"** | „oficina" nur 2×, beides die Schmerzgeschichte („con la oficina cerrada") |
| 43 | 1.000 Telefonminuten / Objekt-Feed | „feed" **0×**; „minutos" nur als Antwortzeit |

**Vier davon sind erledigte Punkte, nicht offene:** Z. 38 ist die „24 h"-Zusage, die der Owner
gestrichen hat (ec4181ed) — sie ist weg. Z. 42 ist mein R-11, behoben. Z. 36 und Z. 37 hat Redesign
selbst als Lücken gemeldet und sie stehen tatsächlich nicht auf dem Schirm. Audit kann diese vier
Zeilen von „zu klären" auf „nicht gerendert" setzen.

**Und eine Zeile, die ich zuerst falsch eingeordnet hatte:** Z. 31 (CRM) und Z. 29 (Wochenbericht)
habe ich im ersten Lauf als „nicht gerendert" gezählt, weil ich nach Herstellernamen und nach
„en tu correo" gesucht hatte. Gerendert sind sie als „**Conexión con tu CRM**" und „**Informe semanal
por email**". Beide stehen jetzt in A2. Mein Muster war zu eng, die Seite war es nicht.

---

## D. Audits §D — die vier Fragen an mich, beantwortet

1. **Z. 5 und Z. 13** („im Register `included`, aber ohne Lauf-ID nachgelesen"): **beide gerendert.**
   Z. 5 als „Detección del idioma" auf `/packages` und als Übersetzungszeile im englischen Verlauf;
   Z. 13 als Herkunftsangabe und als „por canal" auf `/` und `/example-report`. Ob der **Beleg**
   trägt, kann ich nicht sagen — das ist eine Lauf-ID, nicht eine Seite.
2. **Z. 22, ob die Seite P-14 noch rendert:** **ja.** Der Vorführteil zeigt „Mejor esta tarde, **a
   partir de las 17:00**" und die Aufgabenkarte „Llamar a Mila **hoy a partir de las 17:00**".
   Gemessen auf `/` in ES und EN. Die Zeile bleibt also eine echte Lücke und kann nicht als
   „nicht mehr gerendert" abgeräumt werden.
3. **Home-Story / „selección corta del inventario propio" (gehört zu Z. 26):** gerendert, als
   „**Inmuebles que encajan** — NuovaSolution compara lo que busca el cliente con tu cartera" auf `/`
   und „Propone inmuebles que encajan con cada cliente" auf `/packages`. Z. 26 ist damit auf **zwei**
   Seiten gerendert, nicht nur in der Home-Story.
4. **Zählung der Agenturen ohne Bürozeiten:** nicht meine Messung, dazu sage ich nichts.

---

## E. Befunde — gerendert **ohne** Zeile, oder **weiter als** die Zeile

Audits §E nennt eine Richtung: eine gerenderte Aussage ohne Zeile ist ein Befund. Beim Lesen der
Seiten ist mir eine **zweite** Richtung aufgefallen, die das Register nicht vorsieht und die mir
schwerer wiegt: eine Aussage, für die es eine Zeile **gibt**, die aber **mehr verspricht als die
Zeile deckt**. Ich trenne das, weil die Behebung eine andere ist — bei der ersten fehlt eine Zeile,
bei der zweiten muss der **Satz** engere Grenzen nennen.

---

### E-0 (schwerster Befund dieses Abgleichs): „Ninguna consulta se queda sin aviso" ist absolut, die Zeile dahinter ist es nicht

`/` rendert:

> „**Ninguna consulta se queda sin aviso**
> Recordatorio a la hora, **en producción desde el 13.11.**; el paso a la siguiente persona,
> **desde el 20.11.**"

Dafür gibt es Zeilen, und sie sind sogar **belegt**: Z. 17 (Erinnerung nach 1 h) und Z. 18
(Eskalation nach 2 h), beide mit Lauf-ID. **Aber** das Register schreibt bei beiden ausdrücklich:
„ja, **nur mit Bürozeiten**" — und Z. 19 hält fest, dass **4 von 5 Prod-Agenturen keine Bürozeiten
haben**, `pilot_test_a` eingeschlossen. Es ist Audits Startblocker 4 (AGENCY-HOURS-PROD): „Ohne sie
gibt es keine Erinnerung, keine Eskalation."

Für eine neue Agentur ohne eingetragene Bürozeiten ist der Satz „**keine** Anfrage bleibt ohne
Hinweis" heute also **nicht** einlösbar — und es ist der eine Satz auf der Seite, der mit zwei
Datumsangaben wie ein Beweis auftritt. Das ist keine Lücke im Sinne der Liste oben, sondern ein
**Satz, der weiter reicht als sein Beleg**.

Zu entscheiden ist nicht von mir, aber die zwei naheliegenden Wege sind: die Bürozeiten vor dem
Start für jede Agentur eintragen (dann trägt der Satz), oder den Satz an seine Bedingung binden.

### E-0b „Ninguna llamada perdida en una visita." — dieselbe Form, schwächere Grundlage

`/` rendert im Block „TODO LO QUE HACE POR TU AGENCIA": „Atiende el teléfono por ti — **Ninguna
llamada perdida** en una visita. Desde Growth". Die Zeile dazu ist Z. 9 (`phoneAssistant`), Klasse
**Bau** und in Prod zusätzlich **Ausnahme Anwalt**. Ein „keine verlorene Anrufe"-Versprechen steht
damit über einer Funktion, die in Prod nicht läuft. Der Zusatz „Desde Growth" sagt etwas über das
**Paket**, nicht über die **Verfügbarkeit** — eine Besucherin kann daraus nicht schließen, dass es
das noch nicht gibt.

---

### Gerendert **ohne** Registerzeile

### E-1: die einzige harte Zahl auf der Seite hat keine Zeile und keinen genannten Bezug

`/` rendert, in **ES und EN**:

> „Contesta en segundos por WhatsApp y en minutos por email.
> **Medido en producción: email en unos 2 minutos, WhatsApp en el mismo minuto.**"
> („Replies in seconds on WhatsApp and in minutes by email. **Measured in production** …")

Das Register hat für **Antwortzeiten** keine Zeile. Die Zeilen 1 und 3 deckeln die **Kanäle**, nicht
die **Dauer**. Zwei Dinge daran:

- **Es ist eine Messaussage**, und sie nennt nicht, **wessen** Produktion gemessen wurde. Nach Audits
  eigenem Grundsatz gilt jeder Prod-Beleg heute für die Agentur `nuovasolution`; die Pilotagentur hat
  **0 Kontakte, 0 Leads, 0 Aufgaben**. Eine Besucherin liest „medido en producción" als „bei
  Agenturen wie meiner gemessen".
- **Für WhatsApp ist es strenger:** Zeile 3 sagt, WhatsApp für eine **Kundenagentur** sei in Prod
  nicht gebaut. „WhatsApp en el mismo minuto, medido en producción" ist also über **unsere** Nummer
  gemessen und für die Kundenagentur noch nicht einlösbar.

Es ist, soweit ich sehe, nicht falsch — es ist **unbelegt im Register und im Bezug unbestimmt**, und
es ist die einzige Stelle, an der die Seite eine Zahl als Beweis anbietet. Ich bitte Audit um eine
Zeile dafür und um die Entscheidung, ob der Bezug auf dem Schirm genannt werden muss.

### E-2 „Tu día, ordenado a las 8:30." (ES) / „sorted by 8:30." (EN), mit „08:30 · Buenos días, Marta. Hoy, 3 …"

Eine Tageszusammenfassung zu einer **festen Uhrzeit**. Zeile 24 ist der **Sprach**-Tagesassistent und
nicht gerendert; eine Zeile für die Tageszusammenfassung sehe ich nicht. Bitte einordnen.

### E-3 „Tus contactos de siempre, otra vez activos."

Reaktivierung alter Kontakte. Am nächsten liegt Zeile 27 (Nachfassen, Ausnahme Anwalt) — aber
„otra vez activos" ist eine eigene Zusage. Bitte entweder Zeile 27 zuordnen oder eine eigene geben.

### E-4 „Del interés a la oportunidad — Cada interesado, con su siguiente paso."

Im selben Block, „Desde Growth", dazu „Cada mañana, qué oportunidades piden tu atención." Der zweite
Halbsatz liegt bei Zeile 30 („lo que pide tu atención", Bau). Der erste — **je Interessent ein
nächster Schritt** — hat keine Zeile. Bitte einordnen.

### Zurückgezogen: „Property Experience" ist **kein** Befund

Ich hatte „¿Qué es Property Experience?" auf `/faq` als Aussage ohne Zeile notiert, weil meine
Textaufnahme die **Antwort** des Aufklappers nicht erfasst hatte. An der Quelle nachgelesen
(`lib/content/faq.ts:352-355`) lautet sie: „Un modelo 3D interactivo de un inmueble en el navegador,
como servicio que construimos **a petición** a partir de tus planos con medidas." Das ist genau
**Zeile 32** (`model3d`, „Por encargo"). Die Frage ist eingeordnet, der Befund fällt weg — und er
wäre eine Falschmeldung gewesen, wenn ich ihn ungeprüft geschickt hätte.

### Der vollständige Block „TODO LO QUE HACE POR TU AGENCIA" auf `/`, zugeordnet

Damit niemand ihn zweimal durchsucht:

| gerenderte Zeile | Zuordnung |
|---|---|
| „Gana nuevos clientes — De un comentario a una consulta." (Desde Growth · redes sociales en Enterprise) | Z. 33 (Meta-Ausnahme) |
| „Reactiva tus contactos — Tus contactos de siempre, otra vez activos." | **E-3, keine Zeile** |
| „Del interés a la oportunidad — Cada interesado, con su siguiente paso." | **E-4, halb Z. 30** |
| „Atiende el teléfono por ti — Ninguna llamada perdida en una visita." | Z. 9, aber **E-0b** |
| „Cada mañana, el día claro — Tu día, ordenado a las 8:30." (Todos los planes) | **E-2, keine Zeile** |
| „Tu semana, en un informe — Qué entró y qué hacer." | Z. 28 / Z. 29 |
| „Opcional, con cualquier plan — Tu plano, en 3D" | Z. 32 |

---

## F. Eigene Fehler in diesem Abgleich

Drei, alle vor dem Ergebnis gefunden, zwei davon hätten Lücken **verschwiegen**:

1. **Z. 31 und Z. 29 zuerst als „nicht gerendert" gezählt.** Ich hatte nach Herstellernamen und nach
   „en tu correo" gesucht; die Seite schreibt „Conexión con tu CRM" und „Informe semanal por email".
   Ein zu enges Muster bei einer **Bau**-Zeile lässt eine Lücke aus der Liste fallen — der
   gefährlichere Fehler von beiden. Behoben, beide stehen in A2.
2. **Z. 9 und Z. 24 waren Falschtreffer.** Z. 9 traf „TELÉFONO +34603423161", also **unsere eigene**
   Telefonnummer im Fußbereich der Kontaktseite, nicht den Telefonkanal. Z. 24 traf den Knopf
   „Tomar" in der Aufgabenliste, nicht den Sprachassistenten. Beide Muster verengt; Z. 24 ist
   tatsächlich **nicht** gerendert.
3. **Ich habe den gelesenen Seitentext mitgespeichert**, nachdem der erste Lauf diese Fehler zeigte,
   damit ein falsches Muster **offline** korrigiert werden kann. Die Seite dafür erneut abzufragen
   wäre nicht nur Verschwendung, sondern würde gegen einen **anderen Augenblick** vergleichen.

---

## G. Grenzen dieses Abgleichs

- **ES gemessen.** EN ist für die Stellen gegengeprüft, an denen eine Lücke sprachabhängig wäre
  (E-1 und E-2 stehen in beiden Sprachen; Z. 21/22 ebenfalls). Ein voller EN-Durchlauf fehlt.
- **`innerText`**, also nur sichtbarer Text. Bilder, `alt`-Texte und Inhalte, die erst nach weiteren
  Eingaben erscheinen, sind nicht erfasst.
- **Keine Prod-Belege geprüft.** Ob eine „belegt"-Zeile ihren Lauf wirklich hat, ist Audits Arbeit;
  ich sage nur, was auf dem Schirm steht und wie das Register es einordnet.
- **Der Login-Bereich** ist nicht Teil dieses Durchlaufs.
- Der Zweig steht inzwischen hinter `bea7d19`; diese Liste gilt für den **gemessenen** Build.
