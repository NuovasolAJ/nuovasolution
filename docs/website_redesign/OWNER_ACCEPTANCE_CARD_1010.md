# Abnahmekarte — für die manuelle Sichtprüfung des Owners

**Stand:** 2026-10-24 (R23 auf `a76e6e1`; Build `9f6c65e`) ·
Website-Implementierer → Owner. Status: implementiert, wartet auf unabhängige technische und finale Prüfung.

## Link

Vorschau (immer der neueste Build, ohne Login erreichbar, nicht indexiert):

- Spanisch: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/es
- Englisch: https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/en
- Festes Deployment dieses Builds: https://nuovasolution-design-preview-1pfs923d9-nuovasolajs-projects.vercel.app
- Welcher Stand läuft: `/api/build` nennt den Commit (`9f6c65e`, `mode: stub`).
- Zweiter Build gegen das Staging-Backend (nur für den Onboarding-Test von API/Reviewer, nicht für die Sichtabnahme):
  https://nuovasolution-staging-preview-dq8btlwhe-nuovasolajs-projects.vercel.app (`/api/build`: `mode: staging`).

## Mail-Vorschauen ohne Login (neu, dein Bild 14)

- Wochenbericht: https://nuovasolution-design-preview-1pfs923d9-nuovasolajs-projects.vercel.app/es/preview/weekly
- Morgenbrief: https://nuovasolution-design-preview-1pfs923d9-nuovasolajs-projects.vercel.app/es/preview/brief

Beide mit Demodaten, niemand erhält diese Mails. Dein Urteil zum Wochenbericht ist die Freigabe für Hosting (H16:
markierte Testmail an deine Testadresse, dann Prüfung im echten Mailclient am PC und am Handy).

## Testkonto

Keines nötig. Demo-Sitzung auf dem Präsentations-Build (es entsteht kein Konto, nichts wird gesendet):

- https://nuovasolution-design-preview-git-we-eeb43f-nuovasolajs-projects.vercel.app/api/bff/auth/login?stub=1&next=%2Fes%2Fapp

Abmelden: oben rechts „Cerrar sesión“.

## Fünf Schritte am PC

1. **Erster Bildschirm** (Bild 01): Fernkette mit Lichtkante, Küste mit Baumreihe, Panel richtet sich beim Scrollen auf,
   Vordergrund sinkt, darunter der helle Boden. Im Panel nur WhatsApp und Email als Kanäle; rechts „Aviso por email a tu
   equipo“. Wenn an den Ebenen etwas stört, bitte benennen, was: der Build ist hier seit `deb9b66` unverändert.
2. **Dialoge** (Bilder 02, 04): Lauras Frage und die Antwort im Hero, Lauras zweite Nachricht in B, Elenas Nachricht in D.
   Telefon-Szene in B: „solo en español“ (Bild 03). Der Aviso heißt überall gleich: „Aviso de consulta importante · por email“.
3. **Social** (Bild 05): die öffentliche Antwort schreibt eine Person; der Kommentar wird zum neuen Kontakt in der Ficha.
4. **Paquetes** (Bilder 07, 08): volle Haken nur bei Verfügbarem, leere Ringe bei Geplantem; Paquetes stehen jetzt vor
   „Cómo empiezas“ und den Fragen. FAQ: „¿En qué idioma…?“ und „¿Me dice qué leads están calientes?“ neu.
5. **3D** (Bild 06): das Video startet bei 0:00, Startbild ist die eigene Szene bei 4 s; Stufe 3 und 4 bleiben
   „Pendiente del equipo 3D“ bis 3D liefert.

## Schritte am echten Handy (sobald dein Handy verfügbar ist)

Link: https://nuovasolution-design-preview-1pfs923d9-nuovasolajs-projects.vercel.app/es (Safari oder Chrome, Hochformat).

1. Startseite: beide Überschriftzeilen lesbar, Panel vollständig lesbar beim Scrollen (es ist höher als der Bildschirm,
   nichts darf abgeschnitten sein), kein Nachladen beim schnellen Scrollen bis zum Ende und zurück.
2. In B die vier Kanal-Knöpfe antippen; in D Tomar → Proponer la hora a Laura → Marcar como hecha.
3. 3D: Video antippen, Start bei 0:00, Pause.
4. `/es/preview/weekly` und `/es/preview/brief` öffnen: drei Kacheln nebeneinander lesbar, kein Querscrollen.
5. Was anders aussieht als am PC: Bildschirmfoto mit Seite und Stelle.

## Was nur du entscheiden kannst

Freigabe des Wochenbericht-Layouts (dann H16) · englische Modulnamen „AI Sales Agent“, „Lead Intelligence“ auf den
spanischen Seiten behalten oder nicht (Copy W-13) · Paketgrenzen · Name des Morgen-Assistenten · Preise · E14 für das
Impressum (dann Veröffentlichung auf nuovasolution.com) · die Testseite `/es/prueba-objeto` (E-FU2): eigener Text und
eigenes Bild, Freigabe der Adresse. Alles Weitere: `WEBSITE_R23_RETURN_v1.md` §2.
