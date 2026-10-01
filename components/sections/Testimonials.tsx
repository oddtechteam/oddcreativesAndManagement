"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import { Section, SectionHeading } from "@/components/ui/Section";
import { testimonials } from "@/lib/site";

const AUTOPLAY_MS = 7000;

function initials(name: string) {
  return name
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

// Card body; also rendered invisibly for every story so the card keeps the
// height of the longest quote and the page doesn't jump between slides.
function Story({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <>
      <div className="flex gap-1 text-brand" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, k) => (
          <Icon key={k} name="star" className="h-5 w-5" />
        ))}
      </div>
      <blockquote className="font-display mt-6 text-[1.2rem] font-semibold leading-[1.45] tracking-[-0.01em] sm:text-[1.45rem] md:text-[1.6rem]">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-4 pt-8">
        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-night text-base font-bold text-aqua">
          {initials(t.name)}
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-bold">{t.name}</span>
          <span className="block text-sm font-medium text-night/65">{t.role}</span>
        </span>
      </figcaption>
    </>
  );
}

// One big, readable story at a time: a yellow quote card that auto-advances
// (paused on hover), swipeable on touch, with a clickable client list on desktop.
export default function Testimonials() {
  const [[i, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  const t = testimonials[i];

  const go = useCallback(
    (next: number, d = next > i ? 1 : -1) => setState([(next + n) % n, d]),
    [i, n]
  );

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => go(i + 1, 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [i, paused, go]);

  return (
    <Section className="bg-paper">
      <SectionHeading
        align="center"
        eyebrow="Client stories"
        title={
          <>
            Don&apos;t take our <span className="text-brand">word</span> for it.
          </>
        }
      />

      <div
        className="grid items-stretch gap-6 lg:grid-cols-[1fr_20rem] lg:gap-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ---------- The story ---------- */}
        <div className="relative">
          {/* Stacked-paper edges behind the card */}
          <div className="absolute inset-0 translate-x-2 translate-y-3 rotate-[1.5deg] rounded-[2rem] bg-brand" aria-hidden="true" />
          <div className="relative grid overflow-hidden rounded-[2rem] bg-aqua text-night shadow-lift">
            {testimonials.map((x) => (
              <figure key={x.name} className="invisible col-start-1 row-start-1 flex flex-col p-7 sm:p-10" aria-hidden="true">
                <Story t={x} />
              </figure>
            ))}
            <span
              className="font-display pointer-events-none absolute -right-2 -top-16 z-0 select-none text-[14rem] font-bold leading-none text-night/[0.07]"
              aria-hidden="true"
            >
              &rdquo;
            </span>

            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.figure
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(i + 1, 1);
                  else if (info.offset.x > 60) go(i - 1, -1);
                }}
                className="relative col-start-1 row-start-1 flex cursor-grab flex-col p-7 active:cursor-grabbing sm:p-10"
              >
                <Story t={t} />
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Mobile / tablet controls */}
          <div className="relative mt-8 flex items-center justify-between gap-4 lg:hidden">
            <div className="flex items-center gap-2">
              {testimonials.map((x, k) => (
                <button
                  key={x.name}
                  onClick={() => go(k)}
                  aria-label={`Show story from ${x.name}`}
                  aria-current={k === i}
                  className={`h-2.5 rounded-full transition-all duration-300 ${k === i ? "w-8 bg-brand" : "w-2.5 bg-ink/20"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => go(i - 1, -1)}
                aria-label="Previous story"
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink/15 text-ink transition-colors hover:border-ink"
              >
                <Icon name="arrowRight" className="h-5 w-5 rotate-180" />
              </button>
              <button
                onClick={() => go(i + 1, 1)}
                aria-label="Next story"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-deep"
              >
                <Icon name="arrowRight" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ---------- Desktop: client list with autoplay progress ---------- */}
        <ul className="hidden flex-col gap-2 lg:flex">
          {testimonials.map((x, k) => {
            const active = k === i;
            return (
              <li key={x.name}>
                <button
                  onClick={() => go(k)}
                  aria-current={active}
                  className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border p-4 text-left transition-colors duration-300 ${
                    active ? "border-line bg-surface shadow-soft" : "border-transparent hover:border-line hover:bg-surface/60"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                      active ? "bg-aqua text-night" : "bg-ink/[0.06] text-muted"
                    }`}
                  >
                    {initials(x.name)}
                  </span>
                  <span className="min-w-0">
                    <span className={`block truncate font-semibold ${active ? "text-ink" : "text-ink/70"}`}>{x.name}</span>
                    <span className="block truncate text-sm text-muted">{x.role}</span>
                  </span>
                  {active && (
                    <motion.span
                      key={`${i}-${paused}`}
                      className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: paused ? 0 : 1 }}
                      transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              </li>
            );
          })}
          <li className="mt-auto flex gap-2 pt-2">
            <button
              onClick={() => go(i - 1, -1)}
              aria-label="Previous story"
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink/15 text-ink transition-colors hover:border-ink"
            >
              <Icon name="arrowRight" className="h-5 w-5 rotate-180" />
            </button>
            <button
              onClick={() => go(i + 1, 1)}
              aria-label="Next story"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-deep"
            >
              <Icon name="arrowRight" className="h-5 w-5" />
            </button>
          </li>
        </ul>
      </div>
    </Section>
  );
}
