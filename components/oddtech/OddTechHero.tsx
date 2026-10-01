"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/Logo";
import Marquee from "@/components/ui/Marquee";
import ParallaxLayer, { usePointer } from "@/components/ui/ParallaxLayer";
import { Container, Eyebrow } from "@/components/ui/Section";
import Aurora from "@/components/site/Aurora";
import { oddtech, work } from "@/lib/oddtech";

const words = ["scale.", "convert.", "perform.", "grow."];
const lines = [
  ["We", "build", "websites"],
  ["&", "apps", "that"],
];
const reel = work.map((w) => ({
  src: w.image.replace(".jpg", "-hero.jpg"),
  domain: w.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
  client: w.client,
}));
const nirwana = work.find((w) => w.client === "Nirwana Stays")!;

// OddTech hero: a live showreel of real client sites in a parallax collage.
export default function OddTechHero() {
  const { mx, my, onPointerMove } = usePointer();
  const [w, setW] = useState(0);
  const [site, setSite] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = setInterval(() => setW((i) => (i + 1) % words.length), 2600);
    const b = setInterval(() => setSite((i) => (i + 1) % reel.length), 5200);
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, []);

  const current = reel[site];

  return (
    <section onPointerMove={onPointerMove} className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-night pt-28 text-white lg:pt-32">
      <Aurora intense />
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{ background: "radial-gradient(560px circle at var(--gx, 70%) var(--gy, 40%), rgb(var(--aqua) / 0.12), transparent 60%)" }}
      />

      <Container className="relative grid flex-1 grid-cols-1 items-center gap-16 pb-16 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
        {/* ---------- Copy ---------- */}
        <div className="min-w-0">
          <div className="fade-up">
            <Eyebrow light>{oddtech.tagline}</Eyebrow>
          </div>

          <h1 className="font-display mt-8 text-[2.6rem] font-extrabold leading-[1.04] sm:text-6xl lg:text-[3.4rem] xl:text-[3.9rem]">
            <span className="sr-only">We build websites and apps that scale.</span>
            <span aria-hidden="true">
              {lines.map((line, l) => (
                <span key={l} className="block lg:whitespace-nowrap">
                  {line.map((wd, i) => (
                    <span key={wd} className="fade-up mr-[0.22em] inline-block" style={{ animationDelay: `${0.06 + (l * 3 + i) * 0.07}s` }}>
                      {wd}
                    </span>
                  ))}
                </span>
              ))}
              <span className="relative inline-flex h-[1.12em] overflow-hidden align-bottom">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={words[w]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-aurora relative inline-block whitespace-nowrap pb-[0.08em]"
                  >
                    {words[w]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <svg key={w} viewBox="0 0 300 20" className="-mt-1 block h-4 w-[min(70%,18rem)] text-aqua" fill="none" preserveAspectRatio="none">
                <path className="draw-line" pathLength={1} d="M3 14C60 5 120 4 180 8s90 6 117-2" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="fade-up mt-7 max-w-xl text-lg leading-relaxed text-white/65" style={{ animationDelay: "0.45s" }}>
            <span className="font-semibold text-white">{oddtech.sub}</span> {oddtech.intro}
          </p>

          <div className="fade-up mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.55s" }}>
            <Button href="/oddtech/contact">Get a free quote</Button>
            <Button href="/oddtech/work" variant="ghostLight" arrow={false}>
              See live work
            </Button>
          </div>

          <div className="fade-up mt-10 flex flex-wrap gap-2" style={{ animationDelay: "0.65s" }} aria-label="What we build">
            {["Websites", "Mobile apps", "Online stores", "CRMs", "Web apps"].map((t) => (
              <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-white/75">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ---------- Showreel collage ---------- */}
        <div className="fade-up relative mx-auto aspect-[1/0.95] w-full min-w-0 max-w-[34rem]" style={{ animationDelay: "0.25s" }}>
          <ParallaxLayer mx={mx} my={my} depth={0.5} className="inset-x-[6%] bottom-[18%] top-[4%] z-10">
            <div className="ring-aurora flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-white shadow-lift">
              <div className="flex items-center gap-2 border-b border-line bg-paper px-3.5 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                <span className="ml-2 flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md bg-white px-3 py-1 font-mono text-[0.68rem] text-night/60">
                  <Icon name="shield" className="h-3 w-3 flex-shrink-0 text-aqua-deep" />
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={current.domain} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="truncate">
                      {current.domain}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>
              <div className="relative flex-1 overflow-hidden bg-paper">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={current.src}
                    src={current.src}
                    alt={`${current.client} website, built by OddTech`}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ animation: "autoScroll 5.2s ease-in-out both" }}
                  />
                </AnimatePresence>
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-night/80 px-3 py-1 text-[0.7rem] font-semibold text-white backdrop-blur">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-aqua" />
                  Live client work · {current.client}
                </span>
              </div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer mx={mx} my={my} depth={1.3} className="-right-1 -top-4 z-30 h-24 w-24 sm:h-32 sm:w-32 md:-right-6">
            <div className="relative h-full w-full rounded-full bg-white shadow-glow">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite] text-night">
                <defs>
                  <path id="ot-badge-ring" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
                </defs>
                <text className="fill-current text-[8.4px] font-bold uppercase tracking-[0.2em]">
                  <textPath href="#ot-badge-ring">OddTech • Web • Apps • Systems • </textPath>
                </text>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center">
                <Logo size={26} />
              </span>
            </div>
          </ParallaxLayer>

          <ParallaxLayer mx={mx} my={my} depth={1} className="-left-3 bottom-[6%] z-20 md:-left-10 lg:-left-4 xl:-left-10">
            <div className="card-dark w-40 border-white/15 bg-ink-2/90 p-3 shadow-lift backdrop-blur-md sm:w-48 sm:p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-aqua/15 text-aqua">
                  <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.6} />
                </span>
                <span className="text-sm font-semibold">Build passing</span>
              </div>
              <p className="mt-2 font-mono text-[0.68rem] text-white/45">deployed · web · android · ios</p>
              <div className="mt-3 flex h-8 items-end gap-1.5 sm:h-10">
                {[40, 65, 50, 80, 70, 95].map((h, k) => (
                  <span key={k} className="grow-bar flex-1 rounded-sm bg-gradient-to-t from-brand to-aqua" style={{ height: `${h}%`, animationDelay: `${0.9 + k * 0.1}s` }} />
                ))}
              </div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer mx={mx} my={my} depth={0.8} className="-bottom-2 right-0 z-20 hidden w-[15.5rem] sm:block md:-right-4">
            <figure className="rounded-2xl bg-white p-4 text-night shadow-lift">
              <div className="flex gap-0.5 text-brand">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Icon key={k} name="star" className="h-3.5 w-3.5" />
                ))}
              </div>
              <blockquote className="mt-2 text-[0.82rem] font-medium leading-snug">
                &ldquo;&hellip;seamless execution, and technical expertise made the entire process effortless.&rdquo;
              </blockquote>
              <figcaption className="mt-2 text-xs text-night/60">{nirwana.client}</figcaption>
            </figure>
          </ParallaxLayer>

          <ParallaxLayer mx={mx} my={my} depth={1.6} className="-left-3 -top-3 z-30 md:-left-10 md:-top-5">
            <div
              className="font-script rounded-md bg-aqua px-3 py-1.5 text-xl leading-none text-night shadow-lift sm:px-4 sm:py-2 sm:text-2xl"
              style={{ rotate: "-8deg" }}
            >
              Shipped with care!
            </div>
          </ParallaxLayer>

          {(
            [
              ["smartphone", "left-[46%] -top-7", 1.9, "bg-brand"],
              ["cart", "left-[40%] bottom-[2%]", 1.7, "bg-plum"],
              ["code", "-right-4 top-[46%]", 2.1, "bg-aqua-deep"],
            ] as const
          ).map(([icon, pos, depth, bg], k) => (
            <ParallaxLayer key={icon} mx={mx} my={my} depth={depth} className={`${pos} z-30 hidden xl:block`}>
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg} text-white shadow-glow`} style={{ animation: `float ${5 + k}s ease-in-out infinite ${k * 0.6}s` }}>
                <Icon name={icon} className="h-5 w-5" />
              </span>
            </ParallaxLayer>
          ))}
        </div>
      </Container>

      {/* ---------- Built for ---------- */}
      <div className="relative border-t border-white/10 py-6">
        <div className="flex items-center">
          <span className="hidden whitespace-nowrap pl-[max(1.25rem,calc((100vw-78rem)/2+2rem))] pr-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/40 md:block">
            Built for
          </span>
          <div className="min-w-0 flex-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <Marquee seconds={32}>
              {[...work, ...work].map((c, i) => (
                <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className="font-display mx-7 whitespace-nowrap text-xl font-bold text-white/35 transition-colors hover:text-white">
                  {c.client}
                </a>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
