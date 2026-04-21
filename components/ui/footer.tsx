"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/language-context";

const w = (a: number) => `rgba(255,255,255,${a})`;

const legalLinks = {
  en: [
    { label: "Imprint", href: "/legal-notice" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  es: [
    { label: "Aviso Legal", href: "/aviso-legal" },
    { label: "Política de Privacidad", href: "/politica-privacidad" },
  ],
};

export function Footer() {
  const { t, lang } = useTranslation();
  const links = legalLinks[lang];

  return (
    <footer
      style={{
        background: "#0C0B09",
        borderTop: `1px solid ${w(0.10)}`,
        paddingTop: "clamp(24px, 3vw, 36px)",
        paddingBottom: "clamp(24px, 3vw, 36px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">

        {/* Top row: logo · copyright · tagline */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <Image
            src="/images/logo-tight.png"
            alt="NuovaSolution"
            width={400}
            height={120}
            className="w-auto h-7 object-contain"
            style={{ filter: "brightness(0) invert(1)", opacity: 0.45 }}
          />
          <p style={{ fontSize: "0.6875rem", color: w(0.34) }}>
            {t("footer.copy")}
          </p>
          <p style={{ fontSize: "0.6875rem", color: w(0.34) }}>
            {t("footer.tagline")}
          </p>
        </div>

        {/* Bottom row: legal links */}
        <div
          style={{
            marginTop: 14,
            borderTop: `1px solid ${w(0.05)}`,
            paddingTop: 14,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontSize: "0.6875rem",
                color: w(0.28),
                textDecoration: "none",
                letterSpacing: "0.01em",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = w(0.55); }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = w(0.28); }}
            >
              {link.label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
