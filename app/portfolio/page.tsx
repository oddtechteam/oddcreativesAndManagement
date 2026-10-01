import type { Metadata } from "next";
import PageHeader from "@/components/site/PageHeader";
import CTABand from "@/components/site/CTABand";
import PortfolioGrid from "@/components/sections/PortfolioGrid";

export const metadata: Metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Portfolio"
        title={
          <>
            Brands we&apos;ve <span className="text-aurora">helped grow.</span>
          </>
        }
        lead="Filter by category and open any project for the full case study: challenge, approach, and result."
      />
      <PortfolioGrid />
      <CTABand title="Want your brand on this list?" cta="Start a project" />
    </main>
  );
}
