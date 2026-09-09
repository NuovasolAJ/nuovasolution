import type { Locale } from "@/lib/i18n/config";
import { en } from "./en";
import { es } from "./es";

/**
 * English is the structural source of truth. Its literal types are widened so
 * every locale must carry exactly the same keys while holding its own text.
 */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : T extends object
      ? { readonly [K in keyof T]: Widen<T[K]> }
      : T;

export type Dictionary = Widen<typeof en>;

const dictionaries: Record<Locale, Dictionary> = { en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
