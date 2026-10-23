import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { stubSurfacesAllowed } from "@/lib/contracts/mode";

export const dynamic = "force-dynamic";

/**
 * E-FU2 (owner 23.10.): the owner's own test listing, marked [PRUEBA], under an address the owner controls, for the real
 * follow-up test. The availability checker reads this page (≤ 24 h); after the test the page is removed and the listing
 * deactivated. Not linked from anywhere; noindex; only on a stub build until the owner releases it on the domain.
 *
 * What stands here is a skeleton with demonstration content: the owner's own text and own or licensed picture replace it,
 * and PM's minimum requirements (what the checker needs to read: reference, price, availability, updated-at) fix the fields.
 * The photo is the site's licensed sample (Pexels 12715501, MEDIA_SOURCES_1010.md), never a third party's listing.
 */
const LISTING = {
  ref: "PRUEBA-001",
  title: { es: "[PRUEBA] Piso de 2 dormitorios con terraza", en: "[PRUEBA] Two bedroom flat with terrace" },
  place: { es: "Estepona · zona puerto", en: "Estepona · marina area" },
  facts: { es: "2 dormitorios · 2 baños · 78 m² · terraza 14 m² al sur · plaza de garaje", en: "2 bedrooms · 2 bathrooms · 78 m² · 14 m² south-facing terrace · garage space" },
  price: "315.000 €",
  priceNumber: 315000,
  availability: { es: "Disponible", en: "Available" },
  updated: "2026-10-23",
  photo: "/media/world/listing-est204.webp",
  text: { es: "Objeto de prueba de NuovaSolution para una comprobación interna del seguimiento. No es un inmueble real ni una oferta. Esta página se retira al terminar la prueba.", en: "NuovaSolution test listing for an internal check of the follow-up. Not a real property and not an offer. This page is removed when the test ends." },
};

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  return { title: LISTING.title[params.locale], robots: { index: false, follow: false, nocache: true } };
}

export default function TestListingPage({ params }: { params: { locale: string } }) {
  if (!stubSurfacesAllowed()) notFound();
  const locale = params.locale as Locale;
  const l = <T,>(x: Record<Locale, T>) => x[locale];
  const ld = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: LISTING.title[locale],
    sku: LISTING.ref,
    price: LISTING.priceNumber,
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    validFrom: LISTING.updated,
    description: LISTING.text[locale],
  };
  return (
    <main className="container-default py-12" data-test-listing={LISTING.ref}>
      <article className="mx-auto max-w-[720px] overflow-hidden rounded-xl border border-line-contour bg-surface-raised">
        <p className="bg-ink-950 px-5 py-2 text-[0.8125rem] font-medium uppercase tracking-[0.06em] text-ivory">[PRUEBA] · {locale === "es" ? "Objeto de prueba, no es una oferta" : "Test listing, not an offer"}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LISTING.photo} alt={l(LISTING.title)} width={800} height={533} className="aspect-[3/2] w-full object-cover" />
        <div className="p-6">
          <h1 className="t-heading-l text-text-primary">{l(LISTING.title)}</h1>
          <p className="tnum mt-2 text-[1.5rem] font-semibold text-ink-950" data-test-price>{LISTING.price}</p>
          <p className="mt-1 t-body-m text-text-secondary">{l(LISTING.place)}</p>
          <p className="mt-1 t-body-s text-text-secondary">{l(LISTING.facts)}</p>
          <dl className="mt-5 grid grid-cols-[8rem_minmax(0,1fr)] gap-y-2 border-t border-line-hairline pt-4 t-body-s">
            <dt className="text-text-muted">{locale === "es" ? "Referencia" : "Reference"}</dt><dd className="tnum font-medium text-text-primary" data-test-ref>{LISTING.ref}</dd>
            <dt className="text-text-muted">{locale === "es" ? "Disponibilidad" : "Availability"}</dt><dd className="font-medium text-text-primary" data-test-availability>{l(LISTING.availability)}</dd>
            <dt className="text-text-muted">{locale === "es" ? "Actualizado" : "Updated"}</dt><dd className="tnum font-medium text-text-primary" data-test-updated>{LISTING.updated}</dd>
          </dl>
          <p className="mt-5 t-body-s text-text-secondary">{l(LISTING.text)}</p>
        </div>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </main>
  );
}
