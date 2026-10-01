"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Colour themes defined in app/globals.css ([data-theme="…"]).
export const themes = [
  { key: "aurora", label: "Aurora", swatch: ["#5b4bff", "#22d3ee"] },
  { key: "ocean", label: "Ocean", swatch: ["#2563eb", "#38bdf8"] },
  { key: "emerald", label: "Emerald", swatch: ["#059669", "#2dd4bf"] },
  { key: "lilac", label: "Midnight Lilac", swatch: ["#8b5cf6", "#6ee7b7"] },
] as const;

type ThemeKey = (typeof themes)[number]["key"];

export default function ThemeSwitcher({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const [active, setActive] = useState<ThemeKey>("aurora");

  // Follow <html data-theme>, so every switcher on the page stays in sync.
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const t = root.dataset.theme as ThemeKey | undefined;
      setActive(t && themes.some((x) => x.key === t) ? t : "aurora");
    };
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  const choose = (key: ThemeKey) => {
    setActive(key);
    document.documentElement.dataset.theme = key;
    try {
      localStorage.setItem("odd-theme", key);
    } catch {
      /* private mode — theme still applies for this visit */
    }
  };

  const dot = { sm: "h-5 w-5", md: "h-6 w-6", lg: "h-9 w-9" }[size];
  const btn = { sm: "h-7 w-7", md: "h-8 w-8", lg: "h-11 w-11" }[size];

  return (
    <div role="radiogroup" aria-label="Colour theme" className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
      {themes.map((t) => (
        <button
          key={t.key}
          role="radio"
          aria-checked={active === t.key}
          aria-label={`${t.label} theme`}
          title={t.label}
          onClick={() => choose(t.key)}
          className={`relative flex items-center justify-center rounded-full ${btn}`}
        >
          {active === t.key && (
            <motion.span
              layoutId={`theme-ring-${size}`}
              className="absolute inset-0 rounded-full border-2 border-white/80"
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
            />
          )}
          <span
            className={`${dot} rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)] transition-transform duration-300 hover:scale-110`}
            style={{ background: `conic-gradient(from 200deg, ${t.swatch[0]} 0 50%, ${t.swatch[1]} 50% 100%)` }}
          />
        </button>
      ))}
    </div>
  );
}
