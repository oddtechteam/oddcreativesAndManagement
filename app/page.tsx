import HomeHero from "@/components/sections/HomeHero";
import KineticBand from "@/components/sections/KineticBand";
import Statement from "@/components/sections/Statement";
import ServicesScroll from "@/components/sections/ServicesScroll";
import TechPanels from "@/components/sections/TechPanels";
import Advantages from "@/components/sections/Advantages";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import StatsBar from "@/components/sections/StatsBar";
import { Container } from "@/components/ui/Section";
import CTABand from "@/components/site/CTABand";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <KineticBand />
      <Statement />
      <ServicesScroll />
      <TechPanels />
      <Advantages />
      <Process />
      <Testimonials />
      <section className="bg-paper pt-20 md:pt-28">
        <Container>
          <StatsBar />
        </Container>
      </section>
      <CTABand />
    </main>
  );
}
