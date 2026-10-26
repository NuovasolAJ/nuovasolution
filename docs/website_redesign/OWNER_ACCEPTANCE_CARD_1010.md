# Abnahmekarte — für die manuelle Sichtprüfung des Owners

**Stand:** 2026-10-25 (R24 FINAL auf 9f6c65e; Build `596679b`) ·
Website-Implementierer → Owner. Status: implementiert, wartet auf unabhängige technische und finale Prüfung.
Owner-Tests nur Mo–Fr 09–15 Madrid (R24).

## Link

Vorschau (immer der neueste Build, ohne Login erreichbar, nicht indexiert):

- Spanisch: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es
- Englisch: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/en
- Festes Deployment dieses Builds: https://nuovasolution-design-preview-chhbk3js9-nuovasolajs-projects.vercel.app
- Welcher Stand läuft: `/api/build` nennt den Commit (`596679b`, `mode: stub`).
- Zweiter Build gegen das Staging-Backend (nur für den Onboarding-Test von API/Reviewer, nicht für die Sichtabnahme):
  https://nuovasolution-staging-preview-q98d818q2-nuovasolajs-projects.vercel.app (`/api/build`: `mode: staging`).

## Mail-Vorschauen ohne Login

- Wochenbericht: https://nuovasolution-design-preview-chhbk3js9-nuovasolajs-projects.vercel.app/es/preview/weekly
- Morgenbrief: https://nuovasolution-design-preview-chhbk3js9-nuovasolajs-projects.vercel.app/es/preview/brief

Dein „Layout OK" vom 25.10. ist an Hosting weitergegeben (H16: markierte Testmail an deine Testadresse, dann Prüfung im echten
Mailclient am PC und am Handy). Das Wort „hülle" ist aus beiden Einleitungen entfernt.

## Testkonto

Keines nötig. Demo-Sitzung auf dem Präsentations-Build (es entsteht kein Konto, nichts wird gesendet):

- https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/api/bff/auth/login?stub=1&next=%2Fes%2Fapp

Abmelden: oben rechts „Cerrar sesión".

## Fünf Schritte am PC (deine Bilder vom 24.10.)

1. **Erster Bildschirm** (Bild 01): links oben das echte Logo. Überschrift, Text, beide Knöpfe und der Kopf des Panels auf dem
   ersten Bildschirm (bei 1366 × 768). Beim Scrollen richtet sich das Panel nur leicht auf; es steht unten auf einem geraden
   hellen Rand, kein Nebel, keine Hügel mehr unter dem Panel. Rechts im Panel: Lauras Ficha (Busca, Presupuesto, Escribe en) und
   darunter „Aviso por email a tu equipo". Die Sprachzeile unten ist größer.
2. **Aufgabe und Übernahme** (Bilder 02, 03, 11): in D „Tomar → Proponer la hora a Laura → Marcar como hecha". Auf
   `/es/platform/daily-assistant` steht jetzt die Aufgabenliste (nicht „Leads"), die Zustandszeile „En preparación · todavía
   no contratable" und derselbe Satz wie auf der Startseite (Copys Vorschlag bis Daily bestätigt): die Aufgabe verschwindet aus
   den Listen der anderen, der Morgen-Assistent sagt, wer sie genommen hat. Bei 1024 px Fensterbreite steht in A, B und E
   alles untereinander, nichts mehr gequetscht (Reviewer-Befund zu Bild 03).
3. **Social** (Bild 04): die Karte trägt „Ejemplo · prototipo", darunter die Fotoquelle (Pexels 12715501).
4. **3D** (Bilder 05, 06): vier Stufen desselben Hauses: Plan maßstäblich (Salón, Cocina / Comedor, Lavadero, Aseo, Recibidor,
   Terraza), das ganze Haus ohne Dach, Salón leer/möbliert mit Schieber, das Video aus dem echten Viewer (beide Etagen, je Etage,
   Möbel aus/an; unter einer Minute, ohne Ton). Kein „Pendiente" mehr. Die Raumbilder 14–18 bleiben bei 3D.
5. **Pakete und Unterseiten** (Bilder 07–10): „14 días gratis · Sin método de pago" überall (Copy X-11), die Marke in der
   Essential-Karte; Karten so hoch wie ihr Inhalt; Enterprise sagt „Hoy es una oferta por encargo…". Plattform und Pakete
   sagen dasselbe: „El asistente de la mañana" und „Tareas" beide „En preparación · todavía no contratable" (Copys
   Korrektur: die Mitarbeiter-Oberfläche kommt erst mit Release U in Produktion). `/es/platform/ai-sales-agent` in Copys
   Worten: „Tus consultas reciben respuesta aunque estés en una visita.", vier Punkte, „Probar gratis".

## Schritte am echten Handy

Link: https://nuovasolution-design-preview-chhbk3js9-nuovasolajs-projects.vercel.app/es (Safari oder Chrome, Hochformat).

1. Startseite: Logo, beide Überschriftzeilen, Panel vollständig lesbar beim Scrollen, gerader heller Rand unter dem Panel.
2. In B die vier Kanal-Knöpfe antippen; in D Tomar → Proponer la hora a Laura → Marcar como hecha.
3. 3D: Schieber der Stufe 03 bewegen; Video der Stufe 04 antippen, Start bei 0:00, Pause.
4. `/es/preview/weekly` und `/es/preview/brief` öffnen: drei Kacheln lesbar, kein Querscrollen, kein deutsches Wort.
5. Was anders aussieht als am PC: Bildschirmfoto mit Seite und Stelle.

## Was nur du entscheiden kannst

Englische Modulnamen auf den spanischen Seiten (Copy W-13) · Pakete/Preise/Trial, Kalender, Sprachen (APIs Vorlagen) · E14 für das
Impressum · die Testseite `/es/prueba-objeto` (E-FU2): eigener Text, eigenes Bild, Freigabe der Adresse · die externe
Websitebewertung (liegt der Website-Lane nicht vor). Alles Weitere: `WEBSITE_R24_RETURN_v1.md` §5.
