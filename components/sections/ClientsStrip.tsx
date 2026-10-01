import Marquee from "@/components/ui/Marquee";
import { Container } from "@/components/ui/Section";
import { clients } from "@/lib/site";

export default function ClientsStrip() {
  return (
    <section className="border-y border-line bg-white py-12">
      <Container>
        <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-muted">
          Trusted by brands &amp; creators across India
        </p>
      </Container>
      <div className="mt-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Marquee seconds={45}>
          {clients.map((name) => (
            <span
              key={name}
              className="font-display mx-8 whitespace-nowrap text-2xl font-bold text-ink/25 transition-colors duration-300 hover:text-brand md:text-3xl"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
