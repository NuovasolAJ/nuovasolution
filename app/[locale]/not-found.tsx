import { headers } from "next/headers";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Section } from "@/components/ui/section";
import { Display } from "@/components/ui/type";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  const ref = headers().get("referer") ?? "";
  const locale = /\/es(\/|$)/.test(ref) ? "es" : "en";
  const d = getDictionary(locale);
  return (
    <Section rhythm="opening" labelledBy="nf-h1">
      <div className="container-text text-center">
        <Display size="l" id="nf-h1">{d.notFound.h1}</Display>
        <p className="mt-6 t-body-l text-text-secondary mx-auto max-w-[44ch]">{d.notFound.body}</p>
        <div className="mt-10"><ButtonLink href={`/${locale}`}>{d.notFound.cta}</ButtonLink></div>
      </div>
    </Section>
  );
}
