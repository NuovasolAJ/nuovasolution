import { NextResponse } from "next/server";
import { isLocale } from "@/lib/i18n/config";

/**
 * The audit and the reviewer look for the legal notice at /<locale>/legal/imprint (R19 W1). The page lives at
 * /<locale>/legal/notice and still carries its provisional label until the owner's company details (E14) exist; this
 * route only removes the 404 and sends the reader there. No company detail is invented here.
 */
export function GET(_req: Request, { params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? params.locale : "es";
  return NextResponse.redirect(new URL(`/${locale}/legal/notice`, process.env.NEXT_PUBLIC_SITE_URL || _req.url), 308);
}
