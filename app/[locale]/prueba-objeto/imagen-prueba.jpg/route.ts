import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { stubSurfacesAllowed } from "@/lib/contracts/mode";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The E-FU2 test picture at the address PM's rules name (same domain, next to the page): the site's licensed sample photo
 * with "PRUEBA" burnt into the pixels (public/media/prueba/imagen-prueba.jpg). Only where the page itself exists; gone
 * with it after the test.
 */
export async function GET(_req: Request, { params }: { params: { locale: string } }) {
  if (!stubSurfacesAllowed() || params.locale !== "es") return new Response("Not found", { status: 404 });
  const bytes = await readFile(join(process.cwd(), "public", "media", "prueba", "imagen-prueba.jpg"));
  return new Response(bytes, { status: 200, headers: { "content-type": "image/jpeg", "cache-control": "public, max-age=3600", "x-robots-tag": "noindex, nofollow" } });
}
