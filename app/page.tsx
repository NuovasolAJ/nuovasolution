import { Nav }             from "@/components/ui/nav";
import { Hero }             from "@/components/sections/hero";
import { AlwaysOn }         from "@/components/sections/always-on";
import { RealScenarios }    from "@/components/sections/real-scenarios";
import { LeadIntelligence } from "@/components/sections/lead-intelligence";
import { FinalCTA }         from "@/components/sections/final-cta";
import { FAQ }              from "@/components/sections/faq";
import { Footer }           from "@/components/ui/footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <AlwaysOn />
      <RealScenarios />
      <LeadIntelligence />
      <FinalCTA />
      <FAQ />
      <Footer />
    </main>
  );
}
