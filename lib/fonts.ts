import { Fraunces, Inter } from "next/font/google";

/**
 * Display + UI face. Self-hosted at build time by next/font (no runtime request
 * to any font CDN). Variable weight; headings never exceed 500 (design law §3.2).
 * latin-ext is required for Spanish (ñ, á, ¿, «»).
 */
export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: true,
  preload: true,
});

/**
 * The headline variant of the owner's point 13 (06.11.2026): one distinct display face beside Inter, shown on the preview with
 * `?display=fraunces` so the owner can decide. Fraunces (Undercase Type) is licensed under the SIL Open Font License 1.1, which
 * allows this self-hosted use without a fee. Not preloaded: it is only applied when the switch is set; if the owner chooses
 * Inter, this export and the switch go.
 */
export const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["400", "500"],
  style: ["normal"],
  preload: false,
});
