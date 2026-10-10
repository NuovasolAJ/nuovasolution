import "server-only";
import { redirect } from "next/navigation";
import { localePath, type Locale } from "@/lib/i18n/config";
import { loginHref, requireSession } from "./app-page";
import { getSocialState, type SocialScreen, type SocialState } from "./social";
import { BackendRefusal } from "./supabase";

const PATH: Record<SocialScreen, string> = { connect: "/social", post: "/social/post", inbox: "/social/inbox", settings: "/social/settings" };

/**
 * What every social page does first: no session → login, which comes back here afterwards; a login without
 * an agency → the registration step; otherwise the screen's state, or the display code of what went wrong.
 */
export async function loadSocial(locale: Locale, screen: SocialScreen, stubCase?: string): Promise<{ state: SocialState | null; problem: string | null }> {
  requireSession(locale, PATH[screen]);
  try {
    return { state: await getSocialState(screen, stubCase), problem: null };
  } catch (e) {
    const code = e instanceof BackendRefusal ? e.code : "generic";
    if (code === "no_session") redirect(loginHref(locale, PATH[screen], { state: "expired" }));
    if (code === "unresolved_membership") redirect(localePath(locale, "/onboarding"));
    return { state: null, problem: code };
  }
}
