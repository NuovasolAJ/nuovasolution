import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { stubSurfacesAllowed } from "@/lib/contracts/mode";

export const dynamic = "force-dynamic";

/**
 * E-FU2 (owner 23.10.; PM_TO_WEBSITE_1025_PRUEBA_OBJETO_FIELDS_v1; R25C point 4): the owner's own test listing, marked
 * [PRUEBA], under an address the owner controls, for the real follow-up test. The availability reader observes this page
 * (≤ 24 h); after the test the state goes to "Retirado", then the page answers 410 and the picture is removed.
 *
 * PM's rules: Spanish only, exactly these labels, every field as server-rendered text, noindex/nofollow, not in the
 * sitemap, not linked from anywhere, no form, no phone, no WhatsApp button, no link out, "Estado: Disponible" mandatory
 * while the test runs, no negative availability word anywhere. The picture is the site's licensed sample with "PRUEBA"
 * burnt into the pixels, served from this page's own path (imagen-prueba.jpg).
 *
 * The values below are provisional (the site's example flat) until the owner's release line fixes price, town, type and
 * bedrooms; they must then equal the inventory row API writes. Only on a stub build until the owner releases the page on
 * the domain (E-FU2 is its own owner decision).
 */
const PRUEBA = {
  ref: "NS-TEST-0001",
  title: "[PRUEBA] Piso de demostración NuovaSolution",
  estado: "Disponible" as "Disponible" | "Retirado",
  actualizado: "26/10/2026",
  precio: 315000,
  municipio: "Estepona",
  provincia: "Málaga",
  tipo: "piso",
  dormitorios: 2,
  banos: 2,
  superficie: 78,
  operacion: "Venta",
  image: "imagen-prueba.jpg",
  imageSource: "licencia Pexels 12715501 (Keegan Checks), marcada PRUEBA por NuovaSolution",
};

const eur = (n: number) => `${n.toLocaleString("es-ES")} €`;

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: PRUEBA.title, robots: { index: false, follow: false, nocache: true } };
}

export default function TestListingPage({ params }: { params: { locale: string } }) {
  // one address only (PM §1): the Spanish page; nothing under /en
  if (!stubSurfacesAllowed() || params.locale !== "es") notFound();
  const rows: [string, string][] = [
    ["Referencia", PRUEBA.ref],
    ["Estado", PRUEBA.estado],
    ["Actualizado", PRUEBA.actualizado],
    ["Precio", eur(PRUEBA.precio)],
    ["Ubicación", `${PRUEBA.municipio}, ${PRUEBA.provincia}`],
    ["Tipo", PRUEBA.tipo],
    ["Dormitorios", String(PRUEBA.dormitorios)],
    ["Baños", String(PRUEBA.banos)],
    ["Superficie", `${PRUEBA.superficie} m²`],
    ["Operación", PRUEBA.operacion],
  ];
  return (
    <main className="container-default py-12" data-test-listing={PRUEBA.ref} data-test-state={PRUEBA.estado}>
      <article className="mx-auto max-w-[720px] overflow-hidden rounded-xl border border-line-contour bg-surface-raised">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/es/prueba-objeto/${PRUEBA.image}`} alt="Imagen de prueba NuovaSolution" width={1200} height={800} className="aspect-[3/2] w-full object-cover" />
        <div className="p-6">
          <h1 className="t-heading-l text-text-primary">{PRUEBA.title}</h1>
          <dl className="mt-5 grid grid-cols-[9rem_minmax(0,1fr)] gap-y-2 border-t border-line-hairline pt-4 t-body-m">
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-text-muted">{k}:</dt>
                <dd className="font-medium text-text-primary" data-test-field={k.toLowerCase()}>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 t-body-s text-text-secondary">Este es un inmueble de prueba de NuovaSolution. No es una oferta real.</p>
        </div>
        <p className="border-t border-line-hairline px-6 py-3 t-caption text-text-muted">Imagen: {PRUEBA.imageSource}</p>
      </article>
    </main>
  );
}
