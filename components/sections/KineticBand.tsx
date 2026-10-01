import Marquee from "@/components/ui/Marquee";
import Icon from "@/components/ui/Icon";
import { categories } from "@/lib/site";

const items = categories.flatMap((c) => c.services);

// Two crossing, tilted marquee bands moving in opposite directions.
export default function KineticBand() {
  return (
    <section className="relative overflow-hidden bg-paper py-16 md:py-24" aria-label="Our services at a glance">
      <div className="-rotate-[2deg] scale-105">
        <Marquee seconds={55} pauseOnHover={false} className="bg-aurora py-4 md:py-5">
          {items.map((t) => (
            <span key={t} className="font-display flex items-center whitespace-nowrap px-6 text-2xl font-bold text-white md:text-4xl">
              {t}
              <Icon name="sparkles" className="ml-12 h-6 w-6 text-white/70" />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="mt-16 rotate-[1.5deg] scale-105 md:mt-20">
        <Marquee seconds={65} reverse pauseOnHover={false} className="bg-ink py-4 md:py-5">
          {items.map((t) => (
            <span key={t} className="font-display flex items-center whitespace-nowrap px-6 text-2xl font-bold text-white/85 md:text-4xl">
              {t}
              <span className="ml-12 h-2.5 w-2.5 rounded-full bg-aqua" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
