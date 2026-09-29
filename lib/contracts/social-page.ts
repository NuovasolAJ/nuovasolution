import "server-only";
import { redirect } from "next/navigation";
import { localePath, type Locale } from "@/lib/i18n/config";
import { hasSession } from "./server";
import { getSocialState, type SocialScreen, type SocialState } from "./social";
import { BackendRefusal } from "./supabase";

/**
 * What every social page does first: no session → login; a login without an agency → the
 * registration step; otherwise the screen's state, or the display code of what went wrong.
 */
export async function loadSocial(locale: Locale, screen: SocialScreen, stubCase?: string): Promise<{ state: SocialState | null; problem: string | null }> {
  if (!hasSession()) redirect(localePath(locale, "/login"));
  try {
    return { state: await getSocialState(screen, stubCase), problem: null };
  } catch (e) {
    const code = e instanceof BackendRefusal ? e.code : "generic";
    if (code === "no_session") redirect(localePath(locale, "/login"));
    if (code === "unresolved_membership") redirect(localePath(locale, "/onboarding"));
    return { state: null, problem: code };
  }
}
