import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import ContactForm from "@/components/sections/ContactForm";
import Icon from "@/components/ui/Icon";
import { Container, IconBadge } from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something <span className="text-aurora">remarkable.</span>
          </>
        }
        lead="Tell us about the project and we'll reply within one business day."
      />

      <section className="relative z-10 -mt-12 pb-20 md:-mt-16 md:pb-28">
        <Container className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <Reveal className="card p-7 md:p-10">
            <ContactForm />
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-4">
            <a href={`mailto:${site.email}`} className="card group flex items-center gap-4 p-6 transition-colors hover:border-brand/30">
              <IconBadge>
                <Icon name="mail" className="h-5 w-5" />
              </IconBadge>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted">Email</span>
                <span className="block truncate font-semibold text-ink group-hover:text-brand">{site.email}</span>
              </span>
            </a>
            <div className="card flex items-start gap-4 p-6">
              <IconBadge tone="aqua">
                <Icon name="phone" className="h-5 w-5" />
              </IconBadge>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted">Call / WhatsApp</span>
                {site.phones.map((p) => (
                  <a key={p.href} href={p.href} className="block font-semibold text-ink hover:text-brand">
                    {p.label}
                  </a>
                ))}
              </span>
            </div>
            <div className="card flex items-start gap-4 p-6">
              <IconBadge>
                <Icon name="users" className="h-5 w-5" />
              </IconBadge>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wider text-muted">Follow us</span>
                <span className="mt-1 flex gap-4">
                  {site.socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink hover:text-brand">
                      {s.label}
                    </a>
                  ))}
                </span>
              </span>
            </div>

            <div className="card relative flex-1 overflow-hidden p-0">
              <iframe
                src={site.mapEmbed}
                title={`${site.name} — studio location`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full lg:h-full lg:min-h-64"
                style={{ border: 0 }}
              />
              <a
                href={site.mapDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-lift hover:text-brand"
              >
                <Icon name="pin" className="h-4 w-4" />
                Get directions
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
