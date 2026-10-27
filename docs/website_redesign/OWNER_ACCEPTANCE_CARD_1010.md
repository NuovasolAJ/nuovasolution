# Abnahmekarte — für die manuelle Sichtprüfung des Owners

**Stand:** 2026-10-26 (dein Abschlussauftrag vom 26.10. auf 596679b; Build `a945fa9`) ·
Website-Implementierer → Owner. Status: implementiert, wartet auf unabhängige technische und finale Prüfung.
Owner-Tests nur Mo–Fr 09–15 Madrid (R24).

## Link

Vorschau (immer der neueste Build, ohne Login erreichbar, nicht indexiert):

- Spanisch: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es
- Englisch: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/en
- Festes Deployment dieses Builds: https://nuovasolution-design-preview-2x7bx8vz8-nuovasolajs-projects.vercel.app
- Welcher Stand läuft: `/api/build` nennt den Commit (`a945fa9`, `mode: stub`).
- Zweiter Build gegen das Staging-Backend (nur für den Onboarding-Test von API/Reviewer, nicht für die Sichtabnahme):
  https://nuovasolution-staging-preview-b1hg8802s-nuovasolajs-projects.vercel.app (`/api/build`: `mode: staging`). Der E28-Test von API/Reviewer läuft weiter auf dem Staging-Build von `596679b` (https://nuovasolution-staging-preview-q98d818q2-nuovasolajs-projects.vercel.app); der bleibt stehen.

## Mail-Vorschauen ohne Login

- Wochenbericht: https://nuovasolution-design-preview-2x7bx8vz8-nuovasolajs-projects.vercel.app/es/preview/weekly
- Morgenbrief: https://nuovasolution-design-preview-2x7bx8vz8-nuovasolajs-projects.vercel.app/es/preview/brief

Dein „Layout OK" vom 25.10. ist an Hosting weitergegeben (H16: markierte Testmail an deine Testadresse, dann Prüfung im echten
Mailclient am PC und am Handy). Das Wort „hülle" ist aus beiden Einleitungen entfernt.

## Testkonto

Keines nötig. Demo-Sitzung auf dem Präsentations-Build (es entsteht kein Konto, nichts wird gesendet):

- https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/api/bff/auth/login?stub=1&next=%2Fes%2Fapp

Abmelden: oben rechts „Cerrar sesión".

## Fünf Schritte am PC (dein Abschlussauftrag vom 26.10.)

1. **Erster Bildschirm** (1366 × 768): dunkler Abendhimmel, dahinter die fernen Häuser am anderen Ufer, davor helle Villen im Licht
   der Terrasse (links die mit Dachterrasse und Pergola, rechts die mit Lamellen, Zypressen, der Pool), das Panel, darunter die
   Steinterrasse in der Farbe der Story. Überschrift, beide Knöpfe, die Anfrage und die ersten Zeilen der Ficha stehen auf dem
   ersten Bildschirm. Rechts im Panel: Busca, Presupuesto, Escribe en, **Prioridad** (Aviso por email mit Motivo), **Siguiente paso**.
   Die Antwort bestätigt keine Objektdaten mehr („Anoto … Una persona de la agencia te confirma lo de la terraza y el garaje").
2. **Übergang**: langsam nach unten scrollen, dann schnell, dann zurück. Die Villen und das ferne Ufer werden heller und lösen sich
   auf, die Terrasse geht in „Una consulta, de principio a fin" über; keine Kante, kein Streifen. Jede Position dazwischen ist ein
   ganzes Bild.
3. **Kapitel A**: eine Liste mit vier Zeilen (Name und Anliegen, darunter Kanal · Uhrzeit · Sprache, der Zustand rechts bzw. unter
   dem Text). Die Zeilen kommen einmal nacheinander, jede zeigt danach ihren Zustand; dann steht die Szene still. „Reproducir otra
   vez" startet nur diese Liste. Der Satz zählt zwei schriftliche Antworten, eine angenommene Llamada und den deutschen Email, der auf
   eine Person wartet.
4. **Kapitel D und E**: unter der Morgenliste „La cita, paso a paso" mit vier Schritten, die mit Tomar → Proponer → Marcar als
   erledigt mitgehen; der vierte (die Agenda) bleibt „en preparación". In E ist das Seguimiento ein WhatsApp mit den zwei Fichas und
   einer Frage; „Responder: sí, el jueves también" ist der Demo-Knopf, danach steht „Petición recibida".
5. **3D**: oben die große Hausansicht (Video, 20 s, startet mit dem geladenen Haus, 0:00); darunter Plano → Modelo → Vacío/amueblado
   (Schieber) → Entrega (der kurze Salon-Clip, 8 s). Zwei Videos: spielt das eine, hält das andere; außerhalb des Bilds pausiert es.
   Im Hausvideo sind noch die Raumnamen und Knöpfe des Viewers zu sehen (die saubere Aufnahme ist bei 3D bestellt).
   Unterseiten: AI Sales Agent (Hinweis klein, „Anotado en la ficha"), Lead Intelligence (zweite Nachricht ergänzt die Ficha, „añadido el
   martes"), CRM (Felder und Historial), Tareas diarias; überall „Ejemplo ilustrativo".

## Schritte am echten Handy

Link: https://nuovasolution-design-preview-2x7bx8vz8-nuovasolajs-projects.vercel.app/es (Safari oder Chrome, Hochformat).

1. Startseite: Logo, beide Überschriftzeilen, kleine Dächer und Zypressen über dem Panel, Panel vollständig lesbar beim Scrollen, darunter die Terrasse ohne Kante.
2. In B die vier Kanal-Knöpfe antippen; in D Tomar → Proponer la hora a Laura → Marcar como hecha.
3. 3D: das große Hausvideo antippen (Start bei 0:00 mit dem Haus), dann den Salon-Clip der Stufe 04: das Hausvideo hält an. Schieber der Stufe 03 bewegen.
4. `/es/preview/weekly` und `/es/preview/brief` öffnen: drei Kacheln lesbar, kein Querscrollen, kein deutsches Wort.
5. Was anders aussieht als am PC: Bildschirmfoto mit Seite und Stelle.

## Was nur du entscheiden kannst

Englische Modulnamen auf den spanischen Seiten (Copy W-13) · Pakete/Preise/Trial, Kalender, Sprachen (APIs Vorlagen) · E14 für das
Impressum · die Testseite `/es/prueba-objeto` (E-FU2): eigener Text, eigenes Bild, Freigabe der Adresse · die externe
Websitebewertung (liegt der Website-Lane nicht vor). Alles Weitere: `WEBSITE_R24_RETURN_v1.md` §5.
