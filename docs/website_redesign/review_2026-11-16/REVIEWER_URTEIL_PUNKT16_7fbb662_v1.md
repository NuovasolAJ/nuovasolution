# RV6 · Urteil Punkt 16 · Build `7fbb662` · 20.11.2026

**Gemessener Stand:** Commit `7fbb662`, Deployment `dpl_9Km6cPusbTsfC7JVMnQpmbmXp5Rr`, Alias seit
10:07. **Ein Durchgang**, wie angeordnet. Jede Messung ist am Anfang und am Ende gegen
`/api/build` geprüft — bei allen Läufen „BUILD STABLE: 7fbb662".

**Warum das diesmal eigens dasteht:** Während eines Vorlaufs ist der Alias **mitten im Lauf**
umgesprungen, und eine Sicht kam leer zurück. Seither prüft jedes Skript den Build vorher und
nachher und erklärt den Lauf für ungültig, wenn er wandert; jede Seite wird außerdem auf
„wirklich geladen" geprüft und bis zu dreimal neu geholt. Ohne das wäre ein Durchgang über zwei
Deployments hinweg möglich gewesen, ohne dass es jemandem auffällt.

---

## URTEIL: **JA**

Punkt 16 ist aus meiner Sicht bestanden. Ein benannter Nachzügler bleibt (Q-22, unten), der nicht
schwer genug für ein NEIN wiegt.

---

## 1. Die Zahlen

| Prüfung | Ergebnis | Maßstab |
|---|---|---|
| **Wortlaut des Abschnitts** | **428 Prüfungen, 0 Abweichungen** (beide Sichten × 390/1440 × ES/EN) | Copy `8cbe48c`+`19b5523`+`fb2e600`+`c519b2d`+`176e050`+`6971369`/`f13e4b6`/`94eb165`+`c9121b5`+§6 |
| **Handy-Tiefe Zielsicht** | **20,52** Bildschirme (17 323 px), ohne Möblierung 20,35 | ≤ 21 ✓ |
| **Handy-Tiefe Gate-Sicht** | **19,70** (16 627 px), ohne Möblierung 19,58 | ≤ 21 ✓ |
| Desktop-Tiefe | 15,85 / 15,19 | — |
| **Eingeschwungen** | beide Durchgänge **zahlengleich** (29/29, 28/28 Schritte) | zwei Durchgänge ✓ |
| **Farbe B** | **0 Blau, 0 Braun, 0 Gold** in 744 geprüften Farbwerten; `--brand #1a1917` | ✓ |
| **Faltung** | 3 Karten, Knopf **332 × 44 px**, `aria-expanded`, `aria-label` je Plan, Körper im Dokument aber nicht gemalt | 44 px ✓ |
| **Sichtbar bei geschlossener Faltung** | Pilotzeile ✓, „14 días gratis, sin tarjeta" ✓, „Te respondemos en 24 h laborables" ✓ | Copy §3 ✓ |
| **Demo-Reiter Gate** | WhatsApp **ausgeblendet**; Formulario web und Teléfono **mit Marke**, Marke **innerhalb** des Reiters | Owner Punkt 8 ✓, Copy Regel 5 ✓ |
| **Marke beim Abspielen** | über **7,2 s**, 6 Messpunkte: Marke **durchgehend gemalt und innerhalb** des Reiters, Reiter ausgewählt | mein Kriterium ✓ |
| Pakettabelle | 18 Zeilen in **beiden** Sichten, Legende „Próximamente · aún no activo" vorhanden | Copy Regel 4 ✓ |
| **Regel 1** | **0 ×** „En preparación" auf der ganzen Seite, beide Sichten | ✓ |
| **Regel 2** | **0** Treffer neben einer Marke | ✓ |
| **§5a Sprachen** | **0 ×** „Más idiomas" in allen vier Läufen, FAQ-Seite geprüft | Owner Punkt 4 ✓ |
| **Satzbestand** | **1 390 Sätze erhalten**; alle Kandidaten aufgeklärt, Ersatz je Gruppe belegt | **0 Verluste** ✓ |

**Meine Tiefenzahlen und Redesigns stimmen auf das Pixel überein** (17 323 und 16 627). Bei der
Möblierung weiche ich leicht ab (0,17/0,12 gegen 0,24/0,20), weil ich nur nicht-feste Elemente
abziehe — kein Widerspruch, eine andere Zählweise, und beide Fassungen liegen unter 21.

---

## 2. Was am Gate-Tag tatsächlich zu sehen ist

Gerechnet und am Build bestätigt: **G-1, G-2, T-2, T-4, T-6 „Próximamente"**, **G-3 im
Teilzustand mit beiden Teilen**, **T-8 als einzige vollständig laufende Karte**, G-d auf PX-s,
Tagesgeschichte **13:20 und 23:40**, Hero H-subP, Augenbraue „hace **y hará**".

---

## 3. Zwei offene Punkte — keiner ein NEIN

**(a) ERLEDIGT — der Fehler lag bei mir.** Ich hatte gemeldet, „Te enseñamos el sistema con datos
de ejemplo." sei auf `/es/faq` verschwunden. **Der Satz ist da**, in der **Gate-Sicht**, als
Antwort auf „¿Cuánto se tarda en configurarlo?" — Redesign hat darauf hingewiesen, und ich habe
es in meinen eigenen Daten nachgeprüft:

| | Zielsicht | Gate-Sicht |
|---|---|---|
| `dd2035b` | vorhanden | vorhanden |
| `7fbb662` | **nicht** | **vorhanden** |

**Ursache:** Mit `mailboxConnection` und `whatsappOwnNumber` auf „soon" rendert dort die
öffentliche Antwortfassung, während die Zielsicht ihre eigene Antwort zeigt („Tú preparas los
datos de tu agencia, tu logo y tu equipo."). **Mein Vergleich suchte nur in der Zielsicht** und
meldete deshalb einen Verlust, wo nur die Fassung gewechselt hat.

**Behoben:** Der Vergleich durchsucht jetzt **beide Sichten**; ein Satz gilt erst als verloren,
wenn er in **keiner** steht. Erneut gelaufen — der Satz fällt aus der Liste heraus.

**Damit bleibt kein ungeklärter Verlust.** Die zehn übrigen Kandidaten habe ich einzeln geprüft:
die Pilot-Antwort wurde **erweitert** („…durante 14 días, **con todo lo de Growth**, gratis…"),
die englische Preiszeile **umformuliert**, der Link „Ver la semana completa" **umbenannt** in
„Ver el informe completo" / „Ver el informe de ejemplo" (Ziel weiterhin erreichbar, zweimal
verlinkt), und die fünf spanischen Reste auf der englischen Plattformseite sind **behoben**, nicht
verloren. **Satzbestand: 0 Verluste.**

**(b) Q-22, bekannter Nachzügler.** In der Gate-Sicht antwortet „¿Puedo añadir a mi equipo y
darles roles distintos?" mit „**Lista de tareas**: próximamente." statt „Equipo y roles:
próximamente." Ich habe **beide Hälften geprüft**: die alte Zeile ist da, die neue nirgends.
Copy hat es in `9dceb44` berichtigt, Redesign hält den Commit bis zu diesem Bericht zurück.
**Ich führe es als Nachzügler, nicht als Mangel** — aber es ist sachlich eine Antwort auf eine
andere Frage, also richtig, dass es noch kommt.

**Dazu ein Befund, der niemandem gehört:** Für „Team einladen und Rollen" gibt es **keinen
Registerschlüssel**. Die Zielsicht sagt „Sí. Invitas a tu equipo y defines un rol para cada
persona" — eine Fähigkeitsaussage, die am Umschalttag **mit nichts gestellt werden kann**, weil
kein Schalter dafür existiert. Sollte sich herausstellen, dass sie nicht in Produktion ist, greift
kein Gate. **Das gehört zu API**, und ich melde es, weil es die einzige Lücke in der sonst
lückenlosen Abdeckung ist.

---

## 4. Noten

| Zeile | Handy | Desktop |
|---|---|---|
| Technik, Zielsicht | **9,5** | **9,5** |
| Technik, Gate-Sicht | **9,5** | **9,5** |
| **Verkaufsstärke, Zielsicht** | **9** | **9** |
| **Verkaufsstärke, Gate-Sicht** | **7** | **7** |

**Zur 7, damit sie niemand falsch liest:** Sie ist **kein Urteil über die Arbeit**. Technisch ist
jede Marke richtig gesetzt, und die 9,5 steht genau dafür. Die 7 misst, wie die öffentliche Seite
**verkauft**, und dort stehen sechs von sieben Karten auf „noch nicht" und die Tagesgeschichte auf
zwei Stationen. **Die Ursache ist der Produktstand, nicht der Bau** — und der Weg nach oben führt
über **Prod-Belege von API**, nicht über Wortlaut oder Gate. Jede Funktion, für die ein Beleg
nachkommt, hebt diese Zahl von selbst.

---

## 5. Was weiterhin beim Owner liegt

1. **§4.3** `mailboxConnection`: Ihre Regel vom 16.11. („nie próximamente") gegen Ihren Punkt 1
   von heute. Zwei Ihrer eigenen Festlegungen.
2. **Gruppe B** freigeben, wenn `whatsappOwnNumber` und `alert` so weit sind.
3. **K-2**: Der Wechsel auf „…desde el 20.11." erst nach einer **beobachteten** Übergabe in
   Produktion — eine ruhige Meldung ohne Fall genügt nicht. Daily meldet bis 18:00.

---

## 6. Belege

`checks/p16a-7fbb662.json` und `checks/p16a-result-7fbb662.txt` (428 Prüfungen),
`checks/depth16-7fbb662.json` (Tiefe, zwei Durchgänge),
`checks/p16b-7fbb662.json` (Faltung, Pakettabelle, Reiter, Wortregeln),
`checks/faq16-7fbb662.json` (FAQ, §5a, Q-22),
`checks/inv-7fbb662.json` und `checks/lost16-result-7fbb662.txt` (Satzbestand),
`checks/gate-vs-register-1120-afterAPI.json` (Register gegen Gate),
Bild `checks/p16b-7fbb662-public-390-fold.png`.
Skripte: `p16a.mjs`, `p16b.mjs`, `cmp16.mjs`, `depth16.mjs`, `faq16.mjs`, `lost16.mjs`,
`classify16.mjs`, `colour16.mjs`, `gatecmp.mjs`.
