"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { stack } from "@/lib/oddtech";

export default function StackTabs() {
  const [active, setActive] = useState(stack[0].key);
  const current = stack.find((s) => s.key === active)!;

  return (
    <Section className="bg-paper" id="stack">
      <SectionHeading
        align="center"
        eyebrow="Technology"
        title={
          <>
            A modern stack, <span className="text-aurora">chosen for your project.</span>
          </>
        }
        lead="We pick proven tools that fit your goals, budget, and team — not whatever is trending this week."
      />

      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Technology categories">
          {stack.map((s) => (
            <button
              key={s.key}
              role="tab"
              aria-selected={active === s.key}
              onClick={() => setActive(s.key)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                active === s.key ? "text-white" : "text-ink/70 hover:text-ink"
              }`}
            >
              {active === s.key && (
                <motion.span
                  layoutId="stack-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-deep to-brand shadow-glow"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{s.label}</span>
            </button>
          ))}
        </div>

        <div className="card mt-10 min-h-[15rem] p-6 md:p-10" role="tabpanel">
          {/* initial={false}: first tab renders visible (even without JS); later switches animate */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={current.key}
              initial="hide"
              animate="show"
              exit="hide"
              variants={{ show: { transition: { staggerChildren: 0.05 } }, hide: {} }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-3"
            >
              {current.items.map((item) => (
                <motion.li
                  key={item}
                  variants={{ hide: { opacity: 0, y: 12, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1 } }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-4 transition-colors hover:border-brand/40 hover:bg-white"
                >
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-plum font-mono text-xs font-medium text-white">
                    {item.replace(/[^A-Za-z0-9]/g, "").slice(0, 2)}
                  </span>
                  <span className="font-medium text-ink">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
