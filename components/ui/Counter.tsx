"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

export default function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  // Render the final value on the server so it's correct without JS.
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
