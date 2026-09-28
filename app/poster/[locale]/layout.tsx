import type { ReactNode } from "react";
import { inter } from "@/lib/fonts";

/** Bare document for the poster frames: no header, band, footer or launcher (scripts/design/poster-capture.mjs). */
export default function PosterLayout({ children, params }: { children: ReactNode; params: { locale: string } }) {
  return (
    <html lang={params.locale === "es" ? "es" : "en"} className={inter.variable}>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
