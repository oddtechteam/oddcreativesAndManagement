import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import CTABand from "@/components/site/CTABand";
import TechPanels from "@/components/sections/TechPanels";
import Advantages from "@/components/sections/Advantages";
import Process from "@/components/sections/Process";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Container, IconBadge } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { categories } from "@/lib/site";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Our services"
        title={
          <>
            Creative solutions, <span className="text-aurora">built for growth.</span>
          </>
        }
        lead="From branding and digital marketing to technology, production, and events, we bring every creative discipline together under one roof — delivering tailored solutions that help businesses grow, connect, and stand out."
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <a
              key={c.key}
              href={`#${c.key}`}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 backdrop-blur transition-colors hover:border-aqua hover:text-white"
            >
              {c.title}
            </a>
          ))}
        </div>
      </PageHeader>

      <section className="relative z-10 -mt-12 pb-12 md:-mt-16 md:pb-20">
        <Container className="flex flex-col gap-6">
          {categories.map((c, i) => (
            <Reveal key={c.key}>
              <article
                id={c.key}
                className="card grid scroll-mt-28 gap-8 p-8 md:grid-cols-[0.9fr_1.1fr] md:gap-12 md:p-12"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <IconBadge size="lg" tone={i % 2 ? "aqua" : "brand"}>
                      <Icon name={c.icon} className="h-6 w-6" />
                    </IconBadge>
                    <span className="font-display text-sm font-bold text-muted">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h2 className="font-display mt-6 text-2xl font-extrabold text-ink md:text-3xl">{c.title}</h2>
                  <p className="mt-3 text-muted">{c.tagline}</p>
                  <div className="mt-8">
                    <Button href="/contact" variant="secondary" size="md">
                      Enquire about {c.title.split(" ")[0].toLowerCase()}
                    </Button>
                  </div>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {c.services.map((s) => (
                    <li key={s} className="flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-4 text-[0.95rem] font-medium text-ink">
                      <Icon name="check" className="h-4 w-4 flex-shrink-0 text-brand" strokeWidth={2.4} />
                      {s}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </Container>
      </section>

      <TechPanels />
      <Process />
      <Advantages />
      <CTABand
        title="Not sure which service you need?"
        lead="Tell us the problem you're trying to solve — we'll recommend the right mix of strategy, creative, and technology."
        cta="Tell us the problem"
      />
    </main>
  );
}
