"use client";

import { useParams } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Button, ButtonLink } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale === "es" ? "es" : "en";
  const d = getDictionary(locale);
  return (
    <section className="section-opening">
      <div className="container-text text-center">
        <h1 className="t-display-l text-text-primary">{d.errorPage.h1}</h1>
        <p className="mt-6 t-body-l text-text-secondary mx-auto max-w-[44ch]">{d.errorPage.body}</p>
        <div className="mt-10 flex flex-col gap-3 md:flex-row md:justify-center">
          <Button onClick={reset}>{d.errorPage.retry}</Button>
          <ButtonLink href={`/${locale}/contact`} variant="secondary">{d.common.contactUs}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
