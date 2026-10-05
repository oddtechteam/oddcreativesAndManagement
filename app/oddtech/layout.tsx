import type { Metadata } from "next";
import { oddtech } from "@/lib/oddtech";

export const metadata: Metadata = {
  title: "OddTech IT Solutions has moved",
  robots: { index: false },
  alternates: { canonical: oddtech.url },
};

export default function OddTechLayout({ children }: { children: React.ReactNode }) {
  return children;
}
