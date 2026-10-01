"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Marquee from "@/components/ui/Marquee";
import ParallaxLayer, { usePointer } from "@/components/ui/ParallaxLayer";
import { Container } from "@/components/ui/Section";
import OddMascot from "./OddMascot";
import { clients } from "@/lib/site";

const words = ["ignore.", "forget.", "scroll past.", "stop loving."];
const lines = [
  ["We", "create", "brands"],
  ["people", "can't"],
];

// Tilted "stickers" for the disciplines, scattered around the mascot.
const stickers = [
  { t: "Branding", icon: "palette", pos: "left-[2%] top-[6%]", rot: -8, depth: 1.4, cls: "bg-brand text-white" },
  { t: "Film & Photo", icon: "camera", pos: "right-[-2%] top-[14%]", rot: 7, depth: 1.8, cls: "bg-night text-aqua" },
  { t: "Social", icon: "megaphone", pos: "right-[-4%] top-[56%]", rot: -5, depth: 1.2, cls: "bg-white text-night" },
  { t: "Events", icon: "calendar", pos: "left-[-3%] top-[58%]", rot: 6, depth: 1.6, cls: "bg-brand text-white" },
] as const;

// Bouncy entrance used across the hero.
const pop = (delay: number) => ({
  initial: { opacity: 0, scale: 0.6, y: 30 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { type: "spring" as const, stiffness: 260, damping: 18, delay },
});

// Odd Creatives hero: bright brand yellow, the "odd" mascot on a white disc
// ringed by spinning text, with stickers and shapes that follow the pointer.
export default function HomeHero() {
  const { mx, my, onPointerMove } = usePointer();
  const [w, setW] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setW((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section onPointerMove={onPointerMove} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-aqua pt-28 text-night lg:pt-32">
      {/* ---------- Backdrop: dot grid, giant outlined word, drifting shapes ---------- */}
      <div
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{ backgroundImage: "radial-gradient(rgb(var(--night) / 0.14) 1.3px, transparent 1.4px)", backgroundSize: "22px 22px" }}
        aria-hidden="true"
      />
      <span
        className="font-display pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[38vw] font-bold leading-none text-transparent opacity-[0.09] [-webkit-text-stroke:2px_rgb(var(--night))] lg:text-[26vw]"
        aria-hidden="true"
      >
        odd
      </span>
      <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
        <ParallaxLayer mx={mx} my={my} depth={-1.2} className="left-[4%] top-[18%]">
          <span className="block h-10 w-10 rounded-full bg-brand" style={{ animation: "float 7s ease-in-out infinite" }} />
        </ParallaxLayer>
        <ParallaxLayer mx={mx} my={my} depth={-0.8} className="left-[44%] top-[12%]">
          <span className="block h-14 w-14 rounded-full border-[6px] border-night" style={{ animation: "float 9s ease-in-out infinite reverse" }} />
        </ParallaxLayer>
        <ParallaxLayer mx={mx} my={my} depth={-1.6} className="bottom-[22%] left-[40%]">
          <svg viewBox="0 0 80 24" className="h-6 w-20 text-brand" fill="none" style={{ animation: "float 8s ease-in-out infinite" }}>
            <path d="M3 12c8-10 14 10 22 0s14 10 22 0 14 10 22 0" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </ParallaxLayer>
        <ParallaxLayer mx={mx} my={my} depth={-1} className="right-[3%] top-[78%] lg:top-[70%]">
          <span className="block h-6 w-12 animate-[spin_14s_linear_infinite] rounded-t-full bg-brand" />
        </ParallaxLayer>
      </div>

      <Container className="relative grid flex-1 grid-cols-1 items-center gap-10 pb-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        {/* ---------- Copy ---------- */}
        <div className="min-w-0">
          <motion.span
            {...pop(0)}
            className="inline-flex items-center gap-2.5 rounded-full bg-night py-1.5 pl-1.5 pr-4 text-sm font-medium text-white"
          >
            <span className="whitespace-nowrap rounded-full bg-aqua px-2.5 py-0.5 text-xs font-bold text-night">Since 2021</span>
            <span className="sm:hidden">Creative agency · Pune</span>
            <span className="hidden sm:inline">Full-service creative agency · Pune</span>
          </motion.span>

          <h1 className="font-display mt-7 text-[2.7rem] font-bold leading-[1.02] sm:text-6xl lg:text-[3.6rem] xl:text-[4.2rem]">
            <span className="sr-only">We create brands people can&apos;t ignore.</span>
            <span aria-hidden="true">
              {lines.map((line, l) => (
                <span key={l} className="block lg:whitespace-nowrap">
                  {line.map((wd, k) => (
                    <motion.span
                      key={wd}
                      className="mr-[0.22em] inline-block"
                      initial={{ opacity: 0, y: "0.6em", rotate: 6 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.08 + (l * 3 + k) * 0.08 }}
                    >
                      {wd}
                    </motion.span>
                  ))}
                </span>
              ))}
              {/* Rotating word on a tilted black block */}
              <motion.span
                className="relative mt-2 inline-flex -rotate-2 overflow-hidden rounded-2xl bg-night px-4 py-1 text-aqua shadow-lift"
                initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.55 }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={words[w]}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-110%" }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block whitespace-nowrap pb-[0.06em]"
                  >
                    {words[w]}
                  </motion.span>
                </AnimatePresence>
                <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-brand" />
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-night/75"
          >
            We don&apos;t chase trends. We build brands people remember. Strategy and storytelling, branding and design,
            film, photography, social and events. One creative team, from idea to impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Button href="/contact" variant="dark">
              Book a consultation
            </Button>
            <Button href="/services" variant="outlineDark" arrow={false}>
              Explore services
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-2.5">
              {["HJ", "SK", "NS", "ZL"].map((x, k) => (
                <span
                  key={x}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-aqua text-[0.7rem] font-bold ${
                    ["bg-night text-aqua", "bg-brand text-white", "bg-white text-night", "bg-night text-white"][k]
                  }`}
                >
                  {x}
                </span>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 text-brand" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Icon key={k} name="star" className="h-4 w-4" />
                ))}
              </div>
              <p className="mt-0.5 text-sm text-night/70">
                Loved by <span className="font-bold text-night">50+ clients</span> across India
              </p>
            </div>
          </motion.div>
        </div>

        {/* ---------- Stage: mascot on a white disc ---------- */}
        <div className="relative mx-auto aspect-square w-full min-w-0 max-w-[31rem]">
          {/* Spinning text ring */}
          <ParallaxLayer mx={mx} my={my} depth={0.25} className="inset-0">
            <motion.div {...pop(0.2)} className="h-full w-full">
              <svg viewBox="0 0 200 200" className="h-full w-full animate-[spin_30s_linear_infinite] text-night" aria-hidden="true">
                <defs>
                  <path id="hero-ring" d="M100 100m-92 0a92 92 0 1 1 184 0a92 92 0 1 1-184 0" />
                </defs>
                <text className="fill-current text-[10.5px] font-bold uppercase tracking-[0.32em]">
                  <textPath href="#hero-ring">Odd Creatives • Branding • Film • Social • Events • Strategy •</textPath>
                </text>
              </svg>
            </motion.div>
          </ParallaxLayer>

          {/* Disc + mascot (logo colours: black letters, red hands) */}
          <ParallaxLayer mx={mx} my={my} depth={0.5} className="inset-[12%]">
            <motion.div
              {...pop(0.3)}
              className="relative flex h-full w-full items-center justify-center rounded-full bg-white shadow-[0_30px_60px_-24px_rgb(var(--night)/0.45)]"
            >
              <span className="absolute inset-3 rounded-full border-2 border-dashed border-night/10" />
              <div className="w-[74%]" style={{ animation: "float 6s ease-in-out infinite" }}>
                <OddMascot accent="text-brand" className="w-full text-night" />
              </div>
            </motion.div>
          </ParallaxLayer>

          {/* Discipline stickers: drop in, then bob */}
          {stickers.map((s, k) => (
            <ParallaxLayer key={s.t} mx={mx} my={my} depth={s.depth} className={`${s.pos} z-20`}>
              <motion.span
                initial={{ opacity: 0, y: -50, rotate: s.rot * 3 }}
                animate={{ opacity: 1, y: 0, rotate: s.rot }}
                transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.6 + k * 0.12 }}
                className="block"
              >
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold shadow-lift sm:text-sm ${s.cls}`}
                  style={{ animation: `float ${5 + k}s ease-in-out ${k * 0.4}s infinite` }}
                >
                  <Icon name={s.icon} className="h-4 w-4" />
                  {s.t}
                </span>
              </motion.span>
            </ParallaxLayer>
          ))}

          {/* Now playing — brand film */}
          <ParallaxLayer mx={mx} my={my} depth={0.9} className="bottom-[0%] right-[-2%] z-20">
            <motion.div {...pop(1.1)}>
              <div className="flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3 text-night shadow-lift" style={{ rotate: "3deg" }}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white">
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true">
                    <path d="M7 5v14l12-7L7 5Z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-xs font-bold">Now playing</span>
                  <span className="block text-[0.7rem] text-night/60">Brand film · 0:30</span>
                </span>
                <span className="flex h-6 items-end gap-0.5" aria-hidden="true">
                  {[0, 0.2, 0.4, 0.1, 0.3].map((d, k) => (
                    <span key={k} className="eq-bar h-full w-1 rounded-full bg-brand" style={{ animationDelay: `${d}s` }} />
                  ))}
                </span>
              </div>
            </motion.div>
          </ParallaxLayer>

          {/* Social love — hearts drifting up */}
          <ParallaxLayer mx={mx} my={my} depth={1.5} className="left-[16%] top-[-2%] z-20 hidden sm:block">
            <motion.div {...pop(1.2)} className="relative">
              {[
                ["0s", "-14px"],
                ["1s", "10px"],
                ["2s", "-4px"],
              ].map(([d, hx]) => (
                <span
                  key={d}
                  className="heart-up absolute bottom-6 left-3 text-brand"
                  style={{ animationDelay: d, ["--hx" as string]: hx } as React.CSSProperties}
                  aria-hidden="true"
                >
                  <Icon name="heart" className="h-5 w-5 fill-current" />
                </span>
              ))}
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand shadow-lift">
                <Icon name="heart" className="h-5 w-5 fill-current" />
              </span>
            </motion.div>
          </ParallaxLayer>

          {/* Handwritten note */}
          <ParallaxLayer mx={mx} my={my} depth={1.9} className="bottom-[14%] left-[-4%] z-30 hidden md:block">
            <motion.span {...pop(1.3)} className="block">
              <span className="font-script inline-block rounded-md bg-white px-3 py-1.5 text-xl leading-none text-night shadow-lift" style={{ rotate: "-6deg" }}>
                Hover to say hi!
              </span>
            </motion.span>
          </ParallaxLayer>
        </div>
      </Container>

      {/* ---------- Trusted by ---------- */}
      <div id="next" className="relative border-t-2 border-night/10 py-5 text-night">
        <div className="flex items-center">
          <span className="hidden whitespace-nowrap pl-[max(1.25rem,calc((100vw-78rem)/2+2rem))] pr-8 text-xs font-bold uppercase tracking-[0.2em] text-brand md:block">
            Trusted by
          </span>
          <div className="min-w-0 flex-1 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <Marquee seconds={40}>
              {clients.map((c) => (
                <span key={c} className="font-display mx-7 flex items-center gap-7 whitespace-nowrap text-xl font-bold text-night/85 transition-colors hover:text-brand">
                  {c}
                  <span className="h-2 w-2 rounded-full bg-brand" />
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
