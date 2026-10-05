import type { Metadata } from "next";
import { Caveat, Inter, JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/site/Chrome";
import ScrollTop from "@/components/site/ScrollTop";
import SmoothScroll from "@/components/site/SmoothScroll";
import MobileBar from "@/components/site/MobileBar";
import { oddtech } from "@/lib/oddtech";

// Syne for bold, characterful headlines; Inter for reading; a handwritten
// script for small playful notes (echoing the smiling "odd" logo).
// Syne is loaded without 800 on purpose: its ExtraBold is ultra-wide, so
// font-extrabold falls back to the (narrower) 700 weight.
const display = Syne({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const script = Caveat({ subsets: ["latin"], weight: ["700"], variable: "--font-flourish" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const viewport = { themeColor: "#111111" };

export const metadata: Metadata = {
  title: {
    default: "Odd Creatives & Management | Creative Agency in Pune",
    template: "%s · Odd Creatives & Management",
  },
  description:
    "A full-service creative agency helping businesses establish, grow, and transform their brands through innovative digital solutions, creative storytelling, technology, and strategic marketing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Before first paint: send /oddtech/* to OddTech's own domain (keeping subpath + hash), mark JS as available (scroll-reveal) and use OddTech's palette on /oddtech pages, and apply the saved light/dark mode. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              `(function(l){var m=l.pathname.match(/^\\/oddtech(?:\\.html)?(\\/.*)?$/);if(m)l.replace(${JSON.stringify(oddtech.url)}+(m[1]||"/").replace(/\\.html$/,"").replace(/(.)\\/$/,"$1")+l.hash)})(location);` +
              "document.documentElement.classList.add('js');try{var d=document.documentElement;if(/^\\/oddtech(\\.html)?(\\/|$)/.test(location.pathname))d.dataset.site='oddtech';var m=localStorage.getItem('odd-mode');if(m)d.dataset.mode=m}catch(e){}",
          }}
        />
      </head>
      <body className={`${display.variable} ${body.variable} ${script.variable} ${mono.variable}`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <SiteHeader />
        <div id="main">{children}</div>
        <SiteFooter />
        <MobileBar />
        <ScrollTop />
      </body>
    </html>
  );
}
