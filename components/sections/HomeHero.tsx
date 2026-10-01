"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Marquee from "@/components/ui/Marquee";
import ParallaxLayer, { usePointer } from "@/components/ui/ParallaxLayer";
import { Container } from "@/components/ui/Section";
import Aurora from "@/components/site/Aurora";
import OddMascot from "./OddMascot";
import { clients } from "@/lib/site";

const words = ["ignore.", "forget.", "scroll past.", "stop loving."];
const lines = [
  ["We", "create", "brands"],
  ["people", "can't"],
];

// Tilted "stickers" for the disciplines, scattered around the mascot.
const stickers = [
  { t: "Branding", icon: "sparkles", pos: "left-[30%] top-[1%]", rot: "-8deg", depth: 1.4, cls: "bg-brand text-white" },
  { t: "Film & Photo", icon: "camera", pos: "right-[-3%] top-[16%]", rot: "7deg", depth: 1.8, cls: "bg-plum text-white" },
  { t: "Social", icon: "megaphone", pos: "right-[-2%] top-[52%]", rot: "-5deg", depth: 1.2, cls: "bg-aqua text-ink" },
  { t: "Events", icon: "calendar", pos: "left-[-2%] top-[48%]", rot: "6deg", depth: 1.6, cls: "bg-white text-ink" },
] as const;

// Swatches follow the active theme.
const palette = ["rgb(var(--brand))", "rgb(var(--aqua))", "rgb(var(--plum))", "rgb(var(--ink))"];

function useRecTimer() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setS((v) => (v + 1) % 3600), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `00:${mm}:${ss}`;
}

// Odd Creatives hero: the "odd" mascot on a creative-studio set.
export default function HomeHero() {
  const { mx, my, onPointerMove } = usePointer();
  const [w, setW] = useState(0);
  const rec = useRecTimer();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setW((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section onPointerMove={onPointerMove} className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink pt-28 text-white lg:pt-32">
      <Aurora intense />
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{ background: "radial-gradient(560px circle at var(--gx, 70%) var(--gy, 40%), rgb(var(--plum) / 0.14), transparent 60%)" }}
      />

      <Container className="relative grid flex-1 grid-cols-1 items-center gap-12 pb-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
        {/* ---------- Copy ---------- */}
        <div className="min-w-0">
          <span className="fade-up inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 py-1.5 pl-1.5 pr-4 text-sm text-white/80 backdrop-blur">
            <span className="whitespace-nowrap rounded-full bg-aqua px-2.5 py-0.5 text-xs font-bold text-ink">Since 2021</span>
            <span className="sm:hidden">Creative agency · Pune</span>
            <span className="hidden sm:inline">Full-service creative agency · Pune</span>
          </span>

          <h1 className="font-display mt-8 text-[2.6rem] font-extrabold leading-[1.04] sm:text-6xl lg:text-[3.4rem] xl:text-[3.9rem]">
            <span className="sr-only">We create brands people can&apos;t ignore.</span>
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
              <svg key={w} viewBox="0 0 300 20" className="-mt-1 block h-4 w-[min(80%,22rem)] text-aqua" fill="none" preserveAspectRatio="none">
                <path className="draw-line" pathLength={1} d="M3 14C60 5 120 4 180 8s90 6 117-2" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="fade-up mt-7 max-w-xl text-lg leading-relaxed text-white/65" style={{ animationDelay: "0.45s" }}>
            We don&apos;t chase trends — we build brands people remember. Strategy and storytelling, branding and design,
            film, photography, social and events — one creative team, from idea to impact.
          </p>

          <div className="fade-up mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.55s" }}>
            <Button href="/contact">Book a consultation</Button>
            <Button href="/services" variant="ghostLight" arrow={false}>
              Explore services
            </Button>
          </div>

          <div className="fade-up mt-10 flex items-center gap-4" style={{ animationDelay: "0.65s" }}>
            <div className="flex -space-x-2.5">
              {["HJ", "SK", "NS", "ZL"].map((x, k) => (
                <span
                  key={x}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink text-[0.7rem] font-bold ${
                    ["bg-brand text-white", "bg-aqua text-ink", "bg-plum text-white", "bg-white text-ink"][k]
                  }`}
                >
                  {x}
                </span>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 text-aqua" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Icon key={k} name="star" className="h-4 w-4" />
                ))}
              </div>
              <p className="mt-0.5 text-sm text-white/60">
                Loved by <span className="font-semibold text-white">50+ clients</span> across India
              </p>
            </div>
          </div>
        </div>

        {/* ---------- Creative studio stage ---------- */}
        <div className="fade-up relative mx-auto aspect-[1/0.92] w-full min-w-0 max-w-[34rem]" style={{ animationDelay: "0.2s" }}>
          {/* Camera viewfinder */}
          <ParallaxLayer mx={mx} my={my} depth={0.3} className="inset-[10%]">
            <div className="relative h-full w-full">
              {[
                "left-0 top-0 border-l-2 border-t-2 rounded-tl-xl",
                "right-0 top-0 border-r-2 border-t-2 rounded-tr-xl",
                "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-xl",
                "bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl",
              ].map((c) => (
                <span key={c} className={`absolute h-12 w-12 border-white/70 ${c}`} />
              ))}
              <span className="absolute left-5 top-4 flex items-center gap-2 rounded-full bg-ink/60 px-2.5 py-1 font-mono text-[0.68rem] text-white/80 backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-plum" />
                REC {rec}
              </span>
              <span className="absolute bottom-4 left-5 font-mono text-[0.68rem] text-white/45">4K · 24fps</span>
            </div>
          </ParallaxLayer>

          {/* The mascot */}
          <ParallaxLayer mx={mx} my={my} depth={0.6} className="inset-x-[11%] top-[20%] z-10">
            <div style={{ animation: "float 6s ease-in-out infinite" }}>
              <OddMascot className="w-full" />
            </div>
          </ParallaxLayer>

          {/* Discipline stickers */}
          {stickers.map((s) => (
            <ParallaxLayer key={s.t} mx={mx} my={my} depth={s.depth} className={`${s.pos} z-20`}>
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold shadow-lift sm:text-sm ${s.cls}`}
                style={{ rotate: s.rot }}
              >
                <Icon name={s.icon} className="h-4 w-4" />
                {s.t}
              </span>
            </ParallaxLayer>
          ))}

          {/* Brand palette */}
          <ParallaxLayer mx={mx} my={my} depth={1} className="bottom-[-4%] left-[18%] z-20 hidden sm:block">
            <div className="card-dark border-white/15 bg-ink-2/90 p-3 shadow-lift backdrop-blur-md" style={{ rotate: "-4deg" }}>
              <p className="mb-2 font-mono text-[0.62rem] uppercase tracking-wider text-white/50">Brand palette</p>
              <div className="flex gap-1.5">
                {palette.map((c, k) => (
                  <span key={c} className="grow-bar h-9 w-7 rounded-md border border-white/10" style={{ background: c, animationDelay: `${1 + k * 0.12}s` }} />
                ))}
              </div>
            </div>
          </ParallaxLayer>

          {/* Now playing — brand film */}
          <ParallaxLayer mx={mx} my={my} depth={0.9} className="bottom-[4%] right-[-4%] z-20">
            <div className="flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3 text-ink shadow-lift" style={{ rotate: "3deg" }}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand to-plum text-white">
                <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M7 5v14l12-7L7 5Z" />
                </svg>
              </span>
              <span>
                <span className="block text-xs font-bold">Now playing</span>
                <span className="block text-[0.7rem] text-muted">Brand film · 0:30</span>
              </span>
              <span className="flex h-6 items-end gap-0.5" aria-hidden="true">
                {[0, 0.2, 0.4, 0.1, 0.3].map((d, k) => (
                  <span key={k} className="eq-bar h-full w-1 rounded-full bg-brand" style={{ animationDelay: `${d}s` }} />
                ))}
              </span>
            </div>
          </ParallaxLayer>

          {/* Social love — hearts drifting up */}
          <ParallaxLayer mx={mx} my={my} depth={1.5} className="right-[14%] top-[-2%] z-20 hidden sm:block">
            <div className="relative">
              {[
                ["0s", "-14px"],
                ["1s", "10px"],
                ["2s", "-4px"],
              ].map(([d, hx]) => (
                <span
                  key={d}
                  className="heart-up absolute bottom-6 left-3 text-plum"
                  style={{ animationDelay: d, ["--hx" as string]: hx } as React.CSSProperties}
                  aria-hidden="true"
                >
                  <Icon name="heart" className="h-5 w-5 fill-current" />
                </span>
              ))}
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-plum shadow-lift">
                <Icon name="heart" className="h-5 w-5 fill-current" />
              </span>
            </div>
          </ParallaxLayer>

          {/* Handwritten note */}
          <ParallaxLayer mx={mx} my={my} depth={1.9} className="bottom-[26%] right-[-6%] z-30 hidden md:block">
            <span className="font-script inline-block rounded-md bg-aqua px-3 py-1.5 text-xl leading-none text-ink shadow-lift" style={{ rotate: "-6deg" }}>
              Hover to say hi!
            </span>
          </ParallaxLayer>
        </div>
      </Container>

      {/* ---------- Trusted by ---------- */}
      <div id="next" className="relative border-t border-white/10 py-6">
        <div className="flex items-center">
          <span className="hidden whitespace-nowrap pl-[max(1.25rem,calc((100vw-78rem)/2+2rem))] pr-8 text-xs font-semibold uppercase tracking-[0.2em] text-white/40 md:block">
            Trusted by
          </span>
          <div className="min-w-0 flex-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <Marquee seconds={40}>
              {clients.map((c) => (
                <span key={c} className="font-display mx-7 whitespace-nowrap text-xl font-bold text-white/35 transition-colors hover:text-white">
                  {c}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
