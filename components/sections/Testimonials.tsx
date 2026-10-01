import Icon from "@/components/ui/Icon";
import Marquee from "@/components/ui/Marquee";
import { Section, SectionHeading } from "@/components/ui/Section";
import { testimonials } from "@/lib/site";

function initials(name: string) {
  return name
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

function Card({ t, i }: { t: (typeof testimonials)[number]; i: number }) {
  const avatar = ["from-brand to-plum", "from-aqua-deep to-brand", "from-plum to-brand-soft", "from-brand-deep to-aqua"][i % 4];
  return (
    <figure className="mx-3 flex w-[22rem] flex-shrink-0 flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.07] md:w-[28rem]">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 text-aqua" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, k) => (
            <Icon key={k} name="star" className="h-4 w-4" />
          ))}
        </div>
        <Icon name="quote" className="h-8 w-8 text-white/10" />
      </div>
      <blockquote className="mt-5 line-clamp-5 text-[0.95rem] leading-relaxed text-white/80">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        <span className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white ${avatar}`}>
          {initials(t.name)}
        </span>
        <span>
          <span className="block font-semibold text-white">{t.name}</span>
          <span className="block text-sm text-white/50">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const rowA = [...testimonials, ...testimonials.slice(0, half)];
  const rowB = [...testimonials.slice(half), ...testimonials];

  return (
    <Section dark>
      <SectionHeading
        light
        align="center"
        eyebrow="Client stories"
        title={
          <>
            Don&apos;t take our <span className="text-aurora">word</span> for it.
          </>
        }
      />
      <div className="relative -mx-5 flex flex-col gap-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:-mx-8">
        <Marquee seconds={60}>
          {rowA.map((t, i) => (
            <Card key={i} t={t} i={i} />
          ))}
        </Marquee>
        <Marquee seconds={70} reverse>
          {rowB.map((t, i) => (
            <Card key={i} t={t} i={i + 1} />
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
