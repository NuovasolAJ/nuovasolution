import { Inter } from "next/font/google";

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
