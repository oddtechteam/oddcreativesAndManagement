"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import { Container, Eyebrow } from "@/components/ui/Section";
import { categories } from "@/lib/site";

// One bright gradient per discipline (kept dark enough for white text).
const tones = [
  "from-brand-deep to-brand",
  "from-aqua-deeper to-aqua-deep",
  "from-plum to-brand",
  "from-brand to-aqua-deep",
];

// Desktop: the section pins and the service cards glide sideways as you scroll.
// Mobile / reduced motion: a normal vertical stack.
export default function ServicesScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [pinned, setPinned] = useState(false);

  // 1) Decide whether to pin (desktop, motion allowed).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // 2) Measure how far the track must travel — only after the pinned
  //    (horizontal) layout has rendered, and again whenever it resizes.
  useEffect(() => {
    const el = trackRef.current;
    if (!pinned || !el) {
      setDistance(0);
      return;
    }
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    // Fonts/images can change card widths after first paint.
    document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-paper"
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
      aria-label="Services"
    >
      <div className={pinned ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20" : "py-20"}>
        <Container className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>What we do</Eyebrow>
            <h2 className="font-display mt-5 text-[2.25rem] font-extrabold leading-[1.02] text-ink md:text-[3.5rem]">
              Four disciplines. <span className="text-aurora">One creative engine.</span>
            </h2>
          </div>
          <div className="flex items-center gap-5">
            {pinned && (
              <div className="hidden h-1 w-40 overflow-hidden rounded-full bg-line xl:block">
                <motion.div className="h-full rounded-full bg-brand" style={{ width: bar }} />
              </div>
            )}
            <Button href="/services" variant="secondary">
              All services
            </Button>
          </div>
        </Container>

        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className={
            pinned
              ? "flex w-max gap-6 pl-[max(1.25rem,calc((100vw-78rem)/2+2rem))] pr-8"
              : "mx-auto grid w-full max-w-site gap-5 px-5 sm:grid-cols-2 md:px-8"
          }
        >
          {categories.map((c, i) => (
            <Link
              key={c.key}
              href={`/services#${c.key}`}
              className={`group relative flex flex-col overflow-hidden rounded-[2rem] bg-gradient-to-br p-8 text-white shadow-lift transition-transform duration-500 hover:-translate-y-2 md:p-10 ${tones[i]} ${
                pinned ? "h-[min(58vh,34rem)] w-[30rem]" : "gap-0 pt-8 [&>h3]:mt-10"
              }`}
            >
              <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
              <span className="font-display pointer-events-none absolute -right-4 -top-10 text-[10rem] font-extrabold leading-none text-white/[0.07] transition-transform duration-700 group-hover:-translate-y-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur transition-transform duration-500 group-hover:rotate-[-10deg] group-hover:scale-110">
                <Icon name={c.icon} className="h-6 w-6" />
              </span>
              <h3 className="font-display relative mt-auto text-3xl font-extrabold leading-tight md:text-4xl">{c.title}</h3>
              <p className="relative mt-3 text-white/70">{c.tagline}</p>
              <ul className="relative mt-6 flex flex-wrap gap-2">
                {c.services.map((s) => (
                  <li key={s} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
                    {s}
                  </li>
                ))}
              </ul>
              <span className="relative mt-7 inline-flex items-center gap-2 text-sm font-semibold">
                Explore
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-ink transition-transform duration-300 group-hover:translate-x-1">
                  <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2.2} />
                </span>
              </span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
