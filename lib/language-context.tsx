"use client";

import React, { createContext, useContext, useState } from "react";
import { en } from "@/translations/en";
import { es } from "@/translations/es";

export type Lang = "en" | "es";

const dictionaries: Record<Lang, Record<string, string>> = { en, es };

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  function t(key: string): string {
    return dictionaries[lang][key] ?? dictionaries.en[key] ?? key;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
