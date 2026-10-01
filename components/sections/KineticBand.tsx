import Marquee from "@/components/ui/Marquee";
import { categories } from "@/lib/site";

const items = categories.flatMap((c) => c.services);

// Two crossing, tilted marquee bands moving in opposite directions.
export default function KineticBand() {
  return (
    <section className="relative overflow-hidden bg-paper py-16 md:py-24" aria-label="Our services at a glance">
      <div className="-rotate-[2deg] scale-105">
        <Marquee seconds={55} pauseOnHover={false} className="bg-aqua py-4 md:py-5">
          {items.map((t) => (
            <span key={t} className="font-display flex items-center whitespace-nowrap px-6 text-2xl font-bold text-night md:text-4xl">
              {t}
              <span className="ml-12 h-3 w-3 rounded-full bg-brand" />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="mt-16 rotate-[1.5deg] scale-105 md:mt-20">
        <Marquee seconds={65} reverse pauseOnHover={false} className="bg-night py-4 md:py-5">
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
