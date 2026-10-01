"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import { Container } from "@/components/ui/Section";
import { categories } from "@/lib/site";
import { work } from "@/lib/work";

const filters = [{ key: "all", title: "All work" }, ...categories.map((c) => ({ key: c.key, title: c.title }))];

// Cover gradients in brand tones, cycled per project.
const covers = [
  "from-brand to-brand-soft",
  "from-ink to-brand-deep",
  "from-aqua-deep to-aqua",
  "from-brand-deep to-ink",
];

export default function PortfolioGrid() {
  const [active, setActive] = useState("all");
  const items = active === "all" ? work : work.filter((w) => w.filterCategory === active);

  return (
    <section className="py-16 md:py-20">
      <Container>
        <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={active === f.key}
              onClick={() => setActive(f.key)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active === f.key ? "border-brand bg-brand text-white" : "border-line bg-white text-ink hover:border-brand/40"
              }`}
            >
              {f.title}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((w) => (
              <motion.div
                key={w.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/work/${w.slug}`} className="card group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lift">
                  <div className={`relative flex aspect-[4/3] items-end bg-gradient-to-br p-6 ${covers[work.indexOf(w) % covers.length]}`}>
                    <span className="font-display text-5xl font-extrabold text-white/95">{w.stat.value}</span>
                    <span className="absolute right-5 top-5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      {w.year}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand">{w.category}</p>
                    <h3 className="font-display mt-2 text-xl font-bold text-ink">{w.client}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{w.stat.label}</p>
                    <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-ink group-hover:text-brand">
                      View case study
                      <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.2} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
