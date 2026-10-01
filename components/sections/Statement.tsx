"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Container, Eyebrow } from "@/components/ui/Section";

const text =
  "Every brand has a unique story waiting to be told. We bring branding, marketing, technology, production and events under one roof, and turn ideas into experiences, challenges into opportunities, and ambitions into measurable success.";
// Words rendered in the aurora gradient once lit.
const accent = new Set(["story", "one", "roof", "measurable", "success."]);

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const lit = accent.has(children);
  return (
    <motion.span style={{ opacity }} className={`mr-[0.25em] inline-block ${lit ? "text-aurora" : ""}`}>
      {children}
    </motion.span>
  );
}

// A statement that lights up word by word as it scrolls through the viewport.
export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <section className="bg-paper pb-24 pt-8 md:pb-36">
      <Container>
        <Eyebrow>Who we are</Eyebrow>
        <p ref={ref} className="font-display mt-8 max-w-5xl text-[1.9rem] font-bold leading-[1.18] text-ink md:text-[3.4rem]">
          {words.map((wd, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {wd}
            </Word>
          ))}
        </p>
      </Container>
    </section>
  );
}
