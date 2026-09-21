import { envelope, refusal } from "@/lib/contracts/bff";
import { getCrmCatalog } from "@/lib/contracts/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/bff/crm/catalog. The supported CRM catalog, exactly as
 * crm_provider_catalog() classifies it (available / coming_soon / unavailable).
 * The website adds nothing to the list and removes nothing from it. The
 * backend's English note is dropped; the UI renders its own EN/ES line.
 */
export async function GET() {
  try {
    const { data, stub } = await getCrmCatalog();
    return envelope({ ok: true, code: "ok", message: stub ? "stub" : "ok", details: { providers: data } }, 200, stub);
  } catch (e) {
    return refusal(e);
  }
}
