"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Icon from "@/components/ui/Icon";
import Marquee from "@/components/ui/Marquee";
import { Container } from "@/components/ui/Section";
import { categories, nav, site } from "@/lib/site";
import { SHEET_ENDPOINT } from "@/lib/sheetEndpoint";

export default function Footer() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // Apps Script returns no CORS headers, so the response can't be read;
      // a non-throwing fetch is treated as success.
      await fetch(SHEET_ENDPOINT, { method: "POST", mode: "no-cors", body: new FormData(e.currentTarget) });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="grain relative overflow-hidden bg-night text-white">
      {/* Giant kinetic sign-off */}
      <Link href="/contact" className="group block border-b border-white/10 py-10 md:py-14" aria-label="Start a project with us">
        <Marquee seconds={30}>
          {["Let's make it odd", "Start a project", "Let's make it odd", "Say hello"].map((t, i) => (
            <span key={i} className="font-display flex items-center whitespace-nowrap px-8 text-6xl font-extrabold md:text-8xl">
              <span className={i % 2 ? "text-white/20 transition-colors group-hover:text-white/40" : "text-aurora"}>{t}</span>
              <Icon name="sparkles" className="ml-16 h-10 w-10 text-aqua md:h-14 md:w-14" />
            </span>
          ))}
        </Marquee>
      </Link>

      <Container className="relative pb-10 pt-16 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr_0.9fr_1.1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Logo size={40} light />
              <span className="leading-tight">
                <span className="font-display block text-lg font-bold">Creatives</span>
                <span className="block text-[0.66rem] uppercase tracking-[0.2em] text-white/45">& Management</span>
              </span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/55">
              A full-service creative agency helping businesses establish, grow, and transform their brands through
              strategy, storytelling, technology, and marketing.
            </p>
            <div className="mt-6 flex gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/75 transition-all hover:-translate-y-0.5 hover:border-aqua hover:text-aqua"
                >
                  <Icon name={s.icon} className="h-[1.1rem] w-[1.1rem]" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Company">
            {nav.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Services">
            {categories.map((c) => (
              <FooterLink key={c.key} href={`/services#${c.key}`}>
                {c.title}
              </FooterLink>
            ))}
            <FooterLink href="/oddtech">OddTech IT Solutions</FooterLink>
          </FooterCol>

          <div>
            <FooterCol title="Get in touch">
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 hover:text-white">
                  <Icon name="mail" className="h-4 w-4 text-white/35" />
                  {site.email}
                </a>
              </li>
              {site.phones.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="flex items-center gap-2.5 hover:text-white">
                    <Icon name="phone" className="h-4 w-4 text-white/35" />
                    {p.label}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2.5">
                <Icon name="pin" className="h-4 w-4 text-white/35" />
                {site.city}, Maharashtra
              </li>
            </FooterCol>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-aqua">Newsletter</p>
            {status === "sent" ? (
              <p className="mt-3 text-sm text-white/70">Thanks — you&apos;re on the list.</p>
            ) : (
              <form
                onSubmit={onSubscribe}
                className="mt-3 flex rounded-full border border-white/15 bg-white/5 p-1 transition-colors focus-within:border-aqua"
              >
                <input type="hidden" name="formType" value="newsletter" />
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  required
                  placeholder="you@company.com"
                  disabled={status === "sending"}
                  className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/35"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-label="Subscribe"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-aqua text-night transition-transform hover:scale-105 disabled:opacity-60"
                >
                  <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2.4} />
                </button>
              </form>
            )}
            {status === "error" && <p className="mt-2 text-xs text-white/60">Couldn&apos;t sign you up — please try again.</p>}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span>
            Designed &amp; built by{" "}
            <Link href="/oddtech" className="text-white/70 hover:text-aqua">
              OddTech IT Solutions
            </Link>
          </span>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-aqua">{title}</p>
      <ul className="mt-5 flex flex-col gap-3 text-sm text-white/65">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="group inline-flex items-center transition-colors hover:text-white">
        <span className="h-px w-0 bg-aqua transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
        {children}
      </Link>
    </li>
  );
}
