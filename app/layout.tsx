import type { ReactNode } from "react";
import "./globals.css";

/**
 * Root layout. The <html> element lives in app/[locale]/layout.tsx so that
 * lang is correct per route. This file only injects global CSS.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
