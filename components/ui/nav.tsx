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
    <>
      <style>{`
        .nav-cta-btn {
          white-space: nowrap;
          flex-shrink: 0;
        }
        @media (max-width: 600px) {
          .nav-cta-btn {
            padding-left: 14px !important;
            padding-right: 14px !important;
            font-size: 12px !important;
            letter-spacing: 0 !important;
          }
        }
        @media (max-width: 440px) {
          .nav-cta-btn {
            padding-left: 10px !important;
            padding-right: 10px !important;
            font-size: 11px !important;
          }
          .nav-inner {
            gap: 8px !important;
          }
        }
        @media (max-width: 360px) {
          .nav-cta-btn {
            padding-left: 8px !important;
            padding-right: 8px !important;
            font-size: 10px !important;
          }
          .nav-inner {
            gap: 5px !important;
          }
        }
        @media (max-width: 300px) {
          .nav-cta-btn {
            padding-left: 6px !important;
            padding-right: 6px !important;
            font-size: 9px !important;
          }
          .nav-inner {
            gap: 4px !important;
          }
        }
      `}</style>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={Object.assign(
          scrolled
            ? { backgroundColor: "#0A0908", borderBottom: "1px solid rgba(255,255,255,0.06)" }
            : { backgroundColor: "transparent", borderBottom: "1px solid transparent" },
          { overflow: "hidden", maxWidth: "100vw" }
        )}
      >
        <div className="nav-inner flex items-center justify-between max-w-6xl mx-auto h-16 md:h-[72px]"
          style={{ paddingLeft: "clamp(10px, 3.5vw, 40px)", paddingRight: "clamp(10px, 3.5vw, 40px)", gap: 10, minWidth: 0, maxWidth: "100%" }}
        >

          {/* ── Logo ── */}
          <a href="#" aria-label="NuovaSolution Home" className="flex items-center" style={{ flexShrink: 1, minWidth: 0 }}>
            <Image
              src="/images/logo-tight.png"
              alt="NuovaSolution"
              width={400}
              height={120}
              priority
              className="w-auto object-contain"
              style={{
                height: "clamp(28px, 5vw, 40px)",
                filter: "brightness(0) invert(1)",
                opacity: scrolled ? 0.9 : 0.82,
                transition: "opacity 0.4s ease",
              }}
            />
          </a>

          {/* ── Right controls ── */}
          <div className="flex items-center shrink-0" style={{ gap: "clamp(6px, 2vw, 12px)" }}>
            <LangToggle onHero={true} />

            <a
              href="https://cal.com/nuovasolution/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold btn-sm nav-cta-btn"
              style={{ fontWeight: 700, fontSize: 13, letterSpacing: "0.01em" }}
            >
              {t("nav.cta")}
            </a>
          </div>

        </div>
      </header>
    </>
  );
}
