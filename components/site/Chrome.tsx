"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import OddTechFooter from "@/components/oddtech/OddTechFooter";

// Picks the header/footer brand for the current section of the site.
// Tolerates static hosts that serve "/oddtech.html" or add a trailing slash.
const isOddTech = (p: string) => {
  const path = p.replace(/\.html$/, "").replace(/\/+$/, "");
  return path === "/oddtech" || path.startsWith("/oddtech/");
};

export function SiteHeader() {
  const pathname = usePathname();
  return <Header key={isOddTech(pathname) ? "oddtech" : "main"} variant={isOddTech(pathname) ? "oddtech" : "main"} />;
}

export function SiteFooter() {
  const pathname = usePathname();
  return isOddTech(pathname) ? <OddTechFooter /> : <Footer />;
}
