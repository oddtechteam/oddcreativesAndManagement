import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import CTABand from "@/components/site/CTABand";
import StatsBar from "@/components/sections/StatsBar";
import Testimonials from "@/components/sections/Testimonials";
import Icon from "@/components/ui/Icon";
import { Container, Eyebrow, IconBadge, Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { about } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        eyebrow="About us"
        title={
          <>
            More than a company — <span className="text-aurora">a creative movement.</span>
          </>
        }
        lead={about.intro}
      />

      <section className="relative z-10 -mt-12 pb-20 md:-mt-16 md:pb-28">
        <Container>
          <StatsBar className="shadow-lift" />
          <Reveal className="mx-auto mt-16 max-w-3xl text-center">
            <p className="font-display text-2xl font-semibold leading-snug text-ink md:text-3xl">{about.intro2}</p>
          </Reveal>
        </Container>
      </section>

      {/* Mission & vision */}
      <section className="pb-20 md:pb-28">
        <Container className="grid gap-6 md:grid-cols-2">
          <Reveal className="card h-full p-8 md:p-12">
            <IconBadge size="lg">
              <Icon name="target" className="h-6 w-6" />
            </IconBadge>
            <div className="mt-8">
              <Eyebrow>Our mission</Eyebrow>
            </div>
            <h2 className="font-display mt-3 text-2xl font-extrabold leading-tight text-ink md:text-3xl">{about.mission.title}</h2>
            <p className="mt-5 leading-relaxed text-muted">{about.mission.body}</p>
          </Reveal>
          <Reveal delay={0.08} className="relative h-full overflow-hidden rounded-2xl bg-ink p-8 text-white shadow-lift md:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/40 blur-3xl" />
            <div className="relative">
              <IconBadge size="lg" tone="dark">
                <Icon name="rocket" className="h-6 w-6" />
              </IconBadge>
              <div className="mt-8">
                <Eyebrow light>Our vision</Eyebrow>
              </div>
              <h2 className="font-display mt-3 text-2xl font-extrabold leading-tight md:text-3xl">{about.vision.title}</h2>
              <p className="mt-5 leading-relaxed text-white/70">{about.vision.body}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Values */}
      <Section className="bg-white">
        <SectionHeading
          align="center"
          eyebrow="What we stand for"
          title={
            <>
              The values behind <span className="text-aurora">every project.</span>
            </>
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {about.values.map((v, i) => (
            <Reveal key={v.t} delay={i * 0.07} className="rounded-2xl border border-line bg-paper p-8">
              <IconBadge tone={i === 1 ? "aqua" : "brand"}>
                <Icon name={v.icon} className="h-5 w-5" />
              </IconBadge>
              <h3 className="font-display mt-6 text-xl font-bold text-ink">{v.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{v.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Our journey"
              title={
                <>
                  Built on passion. <span className="text-aurora">Driven by innovation.</span>
                </>
              }
              lead="From a small studio in Rajgurunagar to a multidisciplinary creative company serving clients across India."
            />
          </div>
          <ol className="relative border-l-2 border-line pl-8 md:pl-10">
            {about.milestones.map((m, i) => (
              <Reveal as="li" key={m.y} delay={i * 0.05} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[calc(2rem+7px)] top-1 flex h-3 w-3 rounded-full bg-brand ring-4 ring-brand-100 md:-left-[calc(2.5rem+7px)]" />
                <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand">{m.y}</span>
                <h3 className="font-display mt-3 text-xl font-bold text-ink">{m.t}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-muted">{m.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Testimonials />
      <CTABand cta="Start your journey" />
    </main>
  );
}
