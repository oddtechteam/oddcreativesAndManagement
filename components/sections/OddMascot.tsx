"use client";

import { useEffect, useRef, useState } from "react";

// The Odd Creatives logo ("odd" with two smiling d's and raised hands), redrawn
// in theme colours: letters in `currentColor`, hands in the accent colour (the
// red of the original logo). The eyes follow the pointer, blink, and the hands wave.
const VB = { w: 360, h: 236 };
const faces = [
  { cx: 162, cy: 166, stem: 206, top: 70, delay: "0s" },
  { cx: 264, cy: 166, stem: 308, top: 50, delay: "0.35s" },
];

function Hand({ x, y, delay, accent }: { x: number; y: number; delay: string; accent: string }) {
  return (
    <g transform={`translate(${x} ${y})`} className={accent} fill="currentColor">
      <g className="wave-hand" style={{ animationDelay: delay }}>
        <rect x="-11" y="-24" width="22" height="26" rx="8" />
        <rect x="-11" y="-46" width="5.5" height="26" rx="2.75" />
        <rect x="-4.6" y="-52" width="5.5" height="32" rx="2.75" />
        <rect x="1.8" y="-50" width="5.5" height="30" rx="2.75" />
        <rect x="7.8" y="-43" width="5.2" height="24" rx="2.6" />
        <rect x="-16" y="-20" width="6" height="17" rx="3" transform="rotate(-32 -11 -4)" />
      </g>
    </g>
  );
}

// `compact` = small inline use (logo): no glow, no aria label duplication.
// `accent` = text-colour class for the hands. Letters are white unless `className` sets a text colour.
export default function OddMascot({
  className = "",
  compact = false,
  accent = "text-aqua",
}: {
  className?: string;
  compact?: boolean;
  accent?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [look, setLook] = useState<[number, number][]>([
    [0, 0],
    [0, 0],
  ]);
  const [happy, setHappy] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const svg = ref.current;
        if (!svg) return;
        const r = svg.getBoundingClientRect();
        const sx = r.width / VB.w;
        const sy = r.height / VB.h;
        setLook(
          faces.map((f) => {
            const dx = e.clientX - (r.left + f.cx * sx);
            const dy = e.clientY - (r.top + (f.cy - 8) * sy);
            const d = Math.hypot(dx, dy) || 1;
            const m = Math.min(d / 80, 1) * 5;
            return [(dx / d) * m, (dy / d) * m] as [number, number];
          })
        );
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      role={compact ? undefined : "img"}
      aria-hidden={compact || undefined}
      aria-label={compact ? undefined : "Odd Creatives mascot: the odd logo, smiling and waving"}
      className={`overflow-visible ${/(^|\s)text-/.test(className) ? "" : "text-white"} ${className}`}
      onPointerEnter={() => setHappy(true)}
      onPointerLeave={() => setHappy(false)}
      style={compact ? undefined : { filter: "drop-shadow(0 20px 40px rgb(var(--brand) / 0.45))" }}
    >

      {/* o */}
      <circle cx="62" cy="166" r="44" fill="none" stroke="currentColor" strokeWidth="17" />

      {faces.map((f, i) => (
        <g key={i} fill="currentColor" stroke="currentColor">
          {/* d: bowl + ascender */}
          <circle cx={f.cx} cy={f.cy} r="44" fill="none" strokeWidth="17" />
          <line x1={f.stem} y1={f.cy + 2} x2={f.stem} y2={f.top} strokeWidth="17" strokeLinecap="round" />
          <Hand x={f.stem} y={f.top + 4} delay={f.delay} accent={accent} />

          {/* face */}
          <g stroke="none" style={{ transform: `translate(${look[i][0]}px, ${look[i][1]}px)`, transition: "transform 0.15s ease-out" }}>
            <ellipse className="blink" cx={f.cx - 13} cy={f.cy - 8} rx="5.5" ry="6" style={{ animationDelay: f.delay }} />
            <ellipse className="blink" cx={f.cx + 13} cy={f.cy - 8} rx="5.5" ry="6" style={{ animationDelay: f.delay }} />
          </g>
          <path
            d={happy ? `M${f.cx - 17} ${f.cy + 8} Q${f.cx} ${f.cy + 30} ${f.cx + 17} ${f.cy + 8}` : `M${f.cx - 15} ${f.cy + 11} Q${f.cx} ${f.cy + 24} ${f.cx + 15} ${f.cy + 11}`}
            fill="none"
            strokeWidth="4.5"
            strokeLinecap="round"
            style={{ transition: "d 0.3s ease" }}
          />
        </g>
      ))}
    </svg>
  );
}
