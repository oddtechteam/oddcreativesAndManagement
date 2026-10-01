import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/site/PageHeader";
import CTABand from "@/components/site/CTABand";
import Icon from "@/components/ui/Icon";
import { Container, IconBadge } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { work } from "@/lib/work";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = work.find((w) => w.slug === params.slug);
  return { title: item ? `${item.client} — Case study` : "Case study" };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const index = work.findIndex((w) => w.slug === params.slug);
  const item = work[index];
  if (!item) return notFound();
  const next = work[(index + 1) % work.length];

  const blocks = [
    { icon: "target" as const, label: "The challenge", text: item.challenge },
    { icon: "lightbulb" as const, label: "Our approach", text: item.approach },
    { icon: "trending" as const, label: "The result", text: item.result },
  ];

  return (
    <main>
      <PageHeader eyebrow={`${item.category} · ${item.year}`} title={item.client} lead={item.challenge}>
        <div className="flex flex-wrap gap-2">
          {item.services.map((s) => (
            <span key={s} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-white/85">
              {s}
            </span>
          ))}
        </div>
      </PageHeader>

      <section className="relative z-10 -mt-12 pb-16 md:-mt-16">
        <Container>
          <Reveal className="relative flex min-h-[16rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-deep via-brand to-brand-soft p-8 text-white shadow-lift md:p-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full border-[36px] border-white/10" />
            <span className="font-display text-6xl font-extrabold md:text-8xl">{item.stat.value}</span>
            <span className="mt-2 text-lg text-white/80">{item.stat.label}</span>
          </Reveal>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {blocks.map((b, i) => (
              <Reveal key={b.label} delay={i * 0.07} className="card p-8">
                <IconBadge tone={i === 2 ? "aqua" : "brand"}>
                  <Icon name={b.icon} className="h-5 w-5" />
                </IconBadge>
                <h2 className="font-display mt-5 text-lg font-bold text-ink">{b.label}</h2>
                <p className="mt-2 leading-relaxed text-muted">{b.text}</p>
              </Reveal>
            ))}
          </div>

          <Link
            href={`/work/${next.slug}`}
            className="card group mt-8 flex items-center justify-between gap-6 p-8 transition-colors hover:border-brand/30"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-muted">Next project</span>
              <span className="font-display mt-1 block text-2xl font-extrabold text-ink group-hover:text-brand md:text-3xl">
                {next.client}
              </span>
            </span>
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand text-white transition-transform group-hover:translate-x-1">
              <Icon name="arrowRight" className="h-5 w-5" strokeWidth={2.2} />
            </span>
          </Link>
        </Container>
      </section>

      <CTABand title="Want results like this?" />
    </main>
  );
}
