import Icon from "@/components/ui/Icon";
import Spotlight from "@/components/ui/Spotlight";
import { IconBadge, Section, SectionHeading } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { advantages } from "@/lib/site";

// Bento layout on large screens: wide, small, small / small, small, wide.
const spans = ["lg:col-span-2", "", "", "", "", "lg:col-span-2"];

export default function Advantages() {
  return (
    <Section className="bg-paper">
      <SectionHeading
        align="center"
        eyebrow="The Odd advantage"
        title={
          <>
            Ideas that perform. <span className="text-aurora">Execution that delivers.</span>
          </>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {advantages.map((a, i) => {
          const wide = spans[i] !== "";
          return (
            <Reveal key={a.t} delay={(i % 3) * 0.08} className={spans[i]}>
              <Spotlight
                className={`card group h-full overflow-hidden p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift md:p-9 ${
                  wide ? "bg-gradient-to-br from-white to-brand-50/60" : ""
                }`}
              >
                <div className={wide ? "flex h-full flex-col justify-between gap-10 md:flex-row md:items-end" : ""}>
                  <div>
                    <IconBadge tone={i % 2 ? "aqua" : "brand"} size={wide ? "lg" : "md"}>
                      <Icon name={a.icon} className={wide ? "h-6 w-6" : "h-5 w-5"} />
                    </IconBadge>
                    <h3 className={`font-display mt-7 font-extrabold text-ink ${wide ? "text-3xl" : "text-xl"}`}>{a.t}</h3>
                    <p className={`mt-3 leading-relaxed text-muted ${wide ? "max-w-md text-base" : "text-sm"}`}>{a.d}</p>
                  </div>
                  {wide && (
                    <span className="font-display text-aurora hidden select-none text-8xl font-extrabold leading-none opacity-80 md:inline">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>
              </Spotlight>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
