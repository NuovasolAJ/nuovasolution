import localFont from "next/font/local";

/**
 * The two faces, self-hosted from files in this repository (lib/font-files). Until 20.11.2026 they came through next/font/google,
 * which downloads them from Google Fonts at build time; that day Google answered Vercel's build machines with font-file URLs
 * without a file extension, and Next 14's loader fails on them ("Cannot read properties of null (reading '1')" in
 * @next/font/google/loader.js:112) — two builds of the same code failed while the local build passed. The files here are the
 * same font data Google serves (the google/fonts repository, SIL Open Font License 1.1), subset to the latin + latin-ext ranges
 * Google uses, as variable woff2; nothing is fetched at build time or at run time.
 */

/**
 * Display + UI face. Variable weight (100–900) with the optical-size axis; headings never exceed 500 (design law §3.2).
 * latin-ext is required for Spanish (ñ, á, ¿, «»).
 */
export const inter = localFont({
  src: "./font-files/inter-latin.var.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: "Arial",
  preload: true,
});

/**
 * The headline variant of the owner's point 13 (06.11.2026): one distinct display face beside Inter, shown on the preview with
 * `?display=fraunces` so the owner can decide. Fraunces (Undercase Type) is licensed under the SIL Open Font License 1.1, which
 * allows this self-hosted use without a fee. Not preloaded: it is only applied when the switch is set; if the owner chooses
 * Inter, this export and the switch go.
 */
export const fraunces = localFont({
  src: "./font-files/fraunces-latin.var.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-fraunces",
  adjustFontFallback: "Times New Roman",
  preload: false,
});
