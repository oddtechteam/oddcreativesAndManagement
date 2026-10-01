export type WorkItem = {
  slug: string;
  client: string;
  category: string;
  filterCategory: "digital" | "marketing" | "creative" | "business";
  year: string;
  color: string;
  challenge: string;
  approach: string;
  result: string;
  services: string[];
  stat: { value: string; label: string };
};

export const work: WorkItem[] = [
  {
    slug: "nimbus-foods",
    client: "Nimbus Foods",
    category: "Brand strategy + Packaging",
    filterCategory: "marketing",
    year: "2026",
    color: "#f3d7c9",
    challenge:
      "A regional snack brand competing against national players with near-identical shelf packaging and no clear point of view.",
    approach:
      "Rebuilt the brand from positioning up  new name architecture, a packaging system built to stand out from three feet away, and a launch campaign across retail and social.",
    result:
      "Distribution grew from 400 to 1,800+ retail points within two quarters of relaunch.",
    services: ["Brand Strategy", "Graphic Design", "Advertising"],
    stat: { value: "4.5x", label: "Retail distribution growth" },
  },
  {
    slug: "verge-fitness",
    client: "Verge Fitness",
    category: "Website + Web app",
    filterCategory: "digital",
    year: "2025",
    color: "#d7e3f3",
    challenge:
      "A multi-location gym chain running class bookings through three disconnected tools and a dated website.",
    approach:
      "Designed and built a single web app for bookings, memberships, and class schedules, paired with a new marketing site built for conversions.",
    result: "Online bookings overtook phone/walk-in bookings within 90 days.",
    services: ["Website Design & Development", "Web Applications"],
    stat: { value: "71%", label: "Bookings now self-served online" },
  },
  {
    slug: "lumen-hospitality",
    client: "Lumen Hospitality",
    category: "Video + Photography",
    filterCategory: "creative",
    year: "2025",
    color: "#f3e7d7",
    challenge:
      "A boutique hotel group with strong reviews but visual content that undersold the actual guest experience.",
    approach:
      "Full content shoot across five properties  hero films, social cutdowns, and a refreshed photo library built for both web and OTA listings.",
    result: "Direct-booking conversion on the site improved measurably post-relaunch.",
    services: ["Video Production", "Photography & Creative Shoots"],
    stat: { value: "5", label: "Properties reshot in one campaign" },
  },
  {
    slug: "northline-finance",
    client: "Northline Finance",
    category: "Advertising campaign",
    filterCategory: "marketing",
    year: "2025",
    color: "#e0f3d7",
    challenge:
      "A fintech product launch competing in a category where every ad looks and sounds the same.",
    approach:
      "Built a campaign platform around a single unexpected creative idea, deployed across paid social, OOH, and a launch event.",
    result: "Category-leading share of voice in the launch month.",
    services: ["Advertising & Creative Campaigns", "Digital Marketing"],
    stat: { value: "#1", label: "Share of voice at launch" },
  },
  {
    slug: "aster-co",
    client: "Aster & Co.",
    category: "Personal branding",
    filterCategory: "business",
    year: "2024",
    color: "#f3d7ea",
    challenge:
      "A subject-matter expert with deep credibility offline but almost no recognizable presence online.",
    approach:
      "Built a personal brand system  positioning, content pillars, a redesigned LinkedIn and site presence, and a content calendar.",
    result: "Inbound speaking and consulting inquiries began within the first month.",
    services: ["Personal Branding", "Personal Development"],
    stat: { value: "3x", label: "Inbound inquiries, month one" },
  },
  {
    slug: "fieldwork-realty",
    client: "Fieldwork Realty",
    category: "Event + Launch",
    filterCategory: "business",
    year: "2024",
    color: "#d7f3ef",
    challenge:
      "A real estate developer needed a launch event and campaign for a flagship project with a tight six-week runway.",
    approach:
      "Planned and executed the launch event end-to-end while running a parallel pre-launch campaign to build the guest list.",
    result: "Sold 40% of launch-phase units within the event weekend.",
    services: ["Event Planning & Execution", "Business Consulting"],
    stat: { value: "40%", label: "Units sold, launch weekend" },
  },
];

