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

export default function ThemeSwitcher({ size = "md" }: { size?: "md" | "lg" }) {
  const [active, setActive] = useState<ThemeKey>("aurora");

  useEffect(() => {
    const t = document.documentElement.dataset.theme as ThemeKey | undefined;
    if (t && themes.some((x) => x.key === t)) setActive(t);
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

  const dot = size === "lg" ? "h-9 w-9" : "h-6 w-6";

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
          className={`relative flex items-center justify-center rounded-full ${size === "lg" ? "h-11 w-11" : "h-8 w-8"}`}
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
