# Abnahmekarte — für die manuelle Sichtprüfung des Owners

**Stand:** 2026-10-30 (dein verbindlicher Abschlussauftrag vom 27.10. auf a945fa9; Build `3dbafd6`) ·
Website-Implementierer → Owner. Status: implementiert, wartet auf unabhängige technische und finale Prüfung.
Owner-Tests nur Mo–Fr 09–15 Madrid (R24).

## Link

Vorschau (immer der neueste Build, ohne Login erreichbar, nicht indexiert):

- Spanisch: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es
- Englisch: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/en
- Festes Deployment dieses Builds: https://nuovasolution-design-preview-2368s4mjg-nuovasolajs-projects.vercel.app
- Welcher Stand läuft: `/api/build` nennt den Commit (`3dbafd6`, `mode: stub`).
- Zweiter Build gegen das Staging-Backend (nur für den Onboarding-Test von API/Reviewer, nicht für die Sichtabnahme):
  https://nuovasolution-staging-preview-imcp8cplz-nuovasolajs-projects.vercel.app (`/api/build`: `mode: staging`). Der E28-Test von API/Reviewer läuft weiter auf dem Staging-Build von `596679b` (https://nuovasolution-staging-preview-q98d818q2-nuovasolajs-projects.vercel.app); der bleibt stehen.

## Mail-Vorschauen ohne Login

- Wochenbericht: https://nuovasolution-design-preview-2368s4mjg-nuovasolajs-projects.vercel.app/es/preview/weekly
- Morgenbrief: https://nuovasolution-design-preview-2368s4mjg-nuovasolajs-projects.vercel.app/es/preview/brief

Dein „Layout OK" vom 25.10. ist an Hosting weitergegeben (H16: markierte Testmail an deine Testadresse, dann Prüfung im echten
Mailclient am PC und am Handy). Das Wort „hülle" ist aus beiden Einleitungen entfernt.

## Testkonto

Keines nötig. Demo-Sitzung auf dem Präsentations-Build (es entsteht kein Konto, nichts wird gesendet):

- https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/api/bff/auth/login?stub=1&next=%2Fes%2Fapp

Abmelden: oben rechts „Cerrar sesión".

## Fünf Schritte am PC (dein Abschlussauftrag vom 27.10.)

1. **Erster Bildschirm** (1366 × 768): ruhiger Abendhimmel mit einem Lichtschein, dünne Linien (Horizont, Bodenfugen in
   Perspektive, je eine Kante links und rechts), keine Häuser mehr. Das Panel steht näher und fast aufrecht; Überschrift, beide
   Knöpfe, die Anfrage und die ersten Zeilen der Ficha sind ohne Scrollen zu sehen. Die Ficha ist leicht angehoben: Name/Rolle →
   Busca → Presupuesto → Escribe en → Prioridad mit Motivo → Siguiente paso.
2. **Übergang**: langsam, schnell und zurück scrollen. Das Panel richtet sich auf, die Linien und das Licht treten zurück, die
   Story beginnt auf demselben Grund; keine Kante, kein Streifen, keine leere Strecke.
3. **Kapitel D und E**: Überschrift „Tu equipo sabe qué atender primero." mit zwei Sätzen; „Tomar" trägt „Prueba la demo" und
   pulsiert beim ersten Sehen zweimal; Tomar → Proponer → Marcar, dann „Volver a empezar". Álvaros Nummer ist „+34 XXX XXX XXX".
   In E: kurze WhatsApp-Nachricht, darunter die zwei Fichas als volle Karten, „Responder: sí, el jueves también", die Grenze in
   einer Zeile, die Bedingungen unter „Ver las condiciones".
4. **Bericht**: in F „Ver el informe de ejemplo completo" öffnet `/es/example-report` ohne Login: drei Zahlen, ein Balkendiagramm
   mit vier Beispielwochen, Offenes, nächste Schritte, „Probar gratis". Der echte Bericht bleibt hinter dem Login.
5. **3D und Unterseiten**: oben das Hausvideo vom korrigierten 3D-Lauf (Beschriftung „Las dos plantas" / „Planta baja" unter dem
   Video; die Raumnamen im Bild bleiben, bis 3D die saubere Aufnahme liefert), die vier Stufen, „Cómo se pide" in drei Schritten.
   Lead Intelligence zeigt Prioridad und Siguiente paso; mit Demo-Sitzung ist „Mi agencia" in der Navigation markiert.

## Schritte am echten Handy

Link: https://nuovasolution-design-preview-2368s4mjg-nuovasolajs-projects.vercel.app/es (Safari oder Chrome, Hochformat).

1. Startseite: Logo, beide Überschriftzeilen, dünne Linien über dem Panel, das Panel steht gerade (keine Neigung) und beginnt direkt unter dem Text; darunter der helle Grund ohne Kante.
2. In B die vier Kanal-Knöpfe antippen; in D Tomar → Proponer la hora a Laura → Marcar como hecha.
3. 3D: das große Hausvideo antippen (Start bei 0:00 mit dem Haus), dann den Salon-Clip der Stufe 04: das Hausvideo hält an. Schieber der Stufe 03 bewegen.
4. `/es/preview/weekly` und `/es/preview/brief` öffnen: drei Kacheln lesbar, kein Querscrollen, kein deutsches Wort.
5. Was anders aussieht als am PC: Bildschirmfoto mit Seite und Stelle.

## Was nur du entscheiden kannst

Englische Modulnamen auf den spanischen Seiten (Copy W-13) · Pakete/Preise/Trial, Kalender, Sprachen (APIs Vorlagen) · E14 für das
Impressum · die Testseite `/es/prueba-objeto` (E-FU2): eigener Text, eigenes Bild, Freigabe der Adresse · die externe
Websitebewertung (liegt der Website-Lane nicht vor). Alles Weitere: `WEBSITE_R24_RETURN_v1.md` §5.
