import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "OddTech IT Solutions — Web, App & Software Development in Pune",
    template: "%s · OddTech IT Solutions",
  },
  description:
    "OddTech builds websites, Android & iOS apps, e-commerce stores, CRMs, and custom software — plus UI/UX, cyber security, cloud, and 24/7 IT support.",
};

export default function OddTechLayout({ children }: { children: React.ReactNode }) {
  return children;
}
