import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Spotlight from "@/components/ui/Spotlight";
import { IconBadge, Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Aurora from "@/components/site/Aurora";
import { techPanels } from "@/lib/site";

export default function TechPanels() {
  return (
    <Section dark backdrop={<Aurora />}>
      <div className="relative">
        <SectionHeading
          light
          eyebrow="OddTech IT Solutions"
          title={
            <>
              Where innovation <span className="text-aurora">meets technology.</span>
            </>
          }
          lead="Our technology arm designs, builds, and runs the digital products your brand depends on."
          action={
            <Button href="/oddtech" variant="ghostLight">
              Explore OddTech
            </Button>
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          {techPanels.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1} className="h-full">
              <Spotlight dark className="card-dark group flex h-full flex-col rounded-[2rem] p-8 backdrop-blur md:p-10">
                {p.badge && (
                  <span className="absolute right-6 top-6 rounded-full bg-aqua px-3 py-1 text-xs font-bold text-ink">{p.badge}</span>
                )}
                <IconBadge tone="dark" size="lg">
                  <Icon name={p.icon} className="h-6 w-6" />
                </IconBadge>
                <span className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-white/45">{p.tag}</span>
                <h3 className="font-display mt-2 text-3xl font-extrabold">{p.title}</h3>
                <p className="mt-3 text-white/60">{p.sub}</p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-white/80">
                      <Icon name="check" className="mt-0.5 h-4 w-4 flex-shrink-0 text-aqua" strokeWidth={2.4} />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="min-h-8 flex-1" />
                <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-7">
                  <div>
                    <span className="font-display text-aurora text-5xl font-extrabold">{p.stat.value}</span>
                    <p className="mt-1 text-xs uppercase tracking-wider text-white/45">{p.stat.label}</p>
                  </div>
                  <Button href="/contact" variant="light" size="md">
                    Discuss a project
                  </Button>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
