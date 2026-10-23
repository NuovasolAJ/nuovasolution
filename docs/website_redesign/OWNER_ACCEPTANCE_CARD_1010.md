# Abnahmekarte — für die manuelle Sichtprüfung des Owners

**Stand:** 2026-10-23 (R20 auf `deb9b66`; Build `a76e6e1`) ·
Website-Implementierer → Owner. Status: implementiert, wartet auf unabhängige technische und finale Prüfung.

## Link

Vorschau (immer der neueste Build, ohne Login erreichbar, nicht indexiert):

- Spanisch: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es
- Englisch: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/en
- Festes Deployment dieses Builds: https://nuovasolution-design-preview-n67lo7zbl-nuovasolajs-projects.vercel.app
- Welcher Stand läuft: `/api/build` nennt den Commit (`a76e6e1`, `mode: stub`).
- Zweiter Build gegen das Staging-Backend (nur für den Onboarding-Test von API/Reviewer, nicht für die Sichtabnahme):
  https://nuovasolution-staging-preview-j7f6e9t1u-nuovasolajs-projects.vercel.app (`/api/build`: `mode: staging`).

## Testkonto

Keines nötig. Demo-Sitzung auf dem Präsentations-Build (es entsteht kein Konto, nichts wird gesendet):

- https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/api/bff/auth/login?stub=1&next=%2Fes%2Fapp

Abmelden: oben rechts „Cerrar sesión“.

## Fünf Schritte

1. **Erster Bildschirm** (Desktop und Handy): Lauras Frage, die Antwort mit den Daten des Inmuebles und einer Rückfrage,
   rechts drei Ergebnisse; unter dem Panel der Satz „Hoy respondemos en español. En otro idioma no se envía nada
   automáticamente.“ Langsam scrollen: Fernkette, Küste mit Baumreihe, das Panel richtet sich auf, der Vordergrund sinkt,
   darunter der helle Boden der Seite. Kein Streifen, keine Kante, nichts lädt nach.
2. **Story ohne Klick**: unter jeder Szene „Qué llega · Qué hace Nuova · Resultado“. In **B** Email: der deutsche Brief
   der Kellers bekommt keine automatische Antwort („Sin respuesta automática“), es gibt keinen Entwurf; die Consulta
   steht in der Ficha. In **D** der Aviso per Email mit Grund, dann der Morgen: Tomar → Proponer la hora a Laura → Hecha.
3. **Paquetes** (Startseite und `/es/packages`): keine Zahlen mehr (Büros/Plätze/Monat), bei jeder Funktion ihr Stand
   („Disponible · …“ / „En preparación · todavía no contratable“), Anzeigen nur als künftige Übernahme vorhandener Leads.
4. **Mail-Vorschauen** in der Demo-Sitzung: `/es/app/reports/email` = der **neue Wochenbericht** (drei Kacheln, Detail,
   „Sigue abierto“ mit Namen, ein Knopf) und `/es/app/brief` = Morgenbrief; beide auf Desktop und Handy ansehen. Dein
   Urteil zum Wochenbericht ist die Freigabe für Hosting (H16: markierte Testmail an deine Testadresse).
5. **Social** in der Demo-Sitzung `/es/social/post`: die ersten zwei Inmuebles tragen jetzt ein Titelbild (F-R16-3).
   **3D** bleibt mit „Pendiente del equipo 3D“ bis 3D liefert (W2).

## Was nur du entscheiden kannst

Freigabe des Wochenbericht-Layouts (dann H16) · Paketgrenzen (`OWNER_TEMPLATE_PACKAGE_LIMITS_1021_v1.md`) · Name des
Morgen-Assistenten · Preise · Firmenangaben E14 für die Rechtsseiten (bis dahin bleiben sie als vorläufig markiert und
unverlinkt). Alles Weitere: `WEBSITE_R20_RETURN_v1.md` §2.
