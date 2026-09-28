import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";

/**
 * Locale routing. English is primary; Spanish is the second complete language.
 * A path without a locale prefix is redirected once, honouring Accept-Language
 * only for the choice between the two supported locales. Nothing else is touched.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();

  const accept = request.headers.get("accept-language") ?? "";
  const prefersEs = /^(\s*es\b|.*,\s*es\b)/i.test(accept) && !/^\s*en\b/i.test(accept);
  const locale = prefersEs ? "es" : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Everything except API routes, Next internals, static files and the media folder.
  // "poster" is the unlinked frame route for the media posters; it carries its own locale segment.
  matcher: ["/((?!api|_next|media|images|favicon|icon|poster|robots\\.txt|sitemap\\.xml|.*\\..*).*)"],
};

export { locales };
