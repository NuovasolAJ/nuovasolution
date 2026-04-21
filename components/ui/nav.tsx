"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LangToggle } from "@/components/ui/lang-toggle";
import { useTranslation } from "@/lib/language-context";

export function Nav() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 24); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={
        scrolled
          ? {
              backgroundColor: "#0A0908",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }
          : {
              backgroundColor: "transparent",
              borderBottom: "1px solid transparent",
            }
      }
    >
      <div className="flex items-center justify-between max-w-6xl mx-auto px-6 md:px-10 h-16 md:h-[72px]">

        {/* ── Logo ── */}
        <a href="#" aria-label="NuovaSolution Home" className="flex items-center shrink-0">
          <Image
            src="/images/logo-tight.png"
            alt="NuovaSolution"
            width={400}
            height={120}
            priority
            className="w-auto h-9 md:h-10 object-contain"
            style={{
              filter: "brightness(0) invert(1)",
              opacity: scrolled ? 0.9 : 0.82,
              transition: "opacity 0.4s ease",
            }}
          />
        </a>

        {/* ── Right controls ── */}
        <div className="flex items-center gap-3">
          <LangToggle onHero={true} />

          <a
            href="https://cal.com/nuovasolution/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold btn-sm"
            style={{ fontWeight: 700, fontSize: 13, letterSpacing: "0.01em" }}
          >
            {t("nav.cta")}
          </a>
        </div>

      </div>
    </header>
  );
}
