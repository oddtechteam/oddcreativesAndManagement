import { oddtech } from "@/lib/oddtech";
import type { IconName } from "@/components/ui/Icon";

// All site copy and contact details live here so pages stay layout-only.

export const site = {
  name: "Odd Creatives & Management",
  short: "Odd Creatives",
  tagline: "Innovate. Integrate. Elevate.",
  founded: "2021",
  city: "Pune",
  email: "contact@oddcreatives.in",
  phones: [
    { label: "90113 94304", href: "tel:+919011394304" },
    { label: "84858 34885", href: "tel:+918485834885" },
  ],
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/odd_creatives/", icon: "instagram" as IconName },
    { label: "LinkedIn", href: "https://in.linkedin.com/company/odd-creatives-management", icon: "linkedin" as IconName },
  ],
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.888383060927!2d73.7621210747232!3d18.579070182525896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e98b0366c1%3A0x8312c6366e37c3a2!2sODD%20CREATIVESS%20%26%20MANAGEMENT!5e0!3m2!1sen!2sin!4v1783280555004!5m2!1sen!2sin",
  mapDirections: "https://www.google.com/maps/search/?api=1&query=ODD+CREATIVES+%26+MANAGEMENT",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: oddtech.url, label: "OddTech" },
  { href: "/contact", label: "Contact" },
];

export const stats = [
  { value: 50, suffix: "+", label: "Happy clients" },
  { value: 200, suffix: "+", label: "Creative projects" },
  { value: 17, suffix: "+", label: "Specialized services" },
  { value: 5, suffix: "+", label: "Years of experience" },
];

export type Category = {
  key: string;
  icon: IconName;
  title: string;
  tagline: string;
  services: string[];
};

export const categories: Category[] = [
  {
    key: "marketing",
    icon: "megaphone",
    title: "Marketing & Branding",
    tagline: "Positioning and performance, working together.",
    services: ["Digital Marketing", "Social Media Marketing", "Brand Strategy", "Advertising Campaigns"],
  },
  {
    key: "digital",
    icon: "code",
    title: "Digital Solutions",
    tagline: "The technical foundation your brand runs on.",
    services: ["Website Design & Development", "Web Applications", "IT Solutions"],
  },
  {
    key: "creative",
    icon: "camera",
    title: "Creative Studio",
    tagline: "Everything that makes a brand look and sound like itself.",
    services: ["Video Production", "Photography", "Audio Production", "Graphic Design", "Creative Content"],
  },
  {
    key: "business",
    icon: "calendar",
    title: "Business & Events",
    tagline: "The strategy and moments behind the brand.",
    services: ["Event Planning & Execution", "Business Consulting", "Personal Branding", "Creative Management"],
  },
];

export const techPanels = [
  {
    tag: "Build",
    icon: "code" as IconName,
    title: "Custom Web Development",
    sub: "Websites & web apps built to perform, not just look good.",
    points: [
      "Custom website design & development",
      "Web & mobile-ready applications",
      "E-commerce & booking systems",
      "Ongoing support & optimisation",
    ],
    stat: { value: "100%", label: "Custom-built, zero templates" },
    badge: "Most requested",
  },
  {
    tag: "Run",
    icon: "server" as IconName,
    title: "IT Solutions",
    sub: "The technical backbone that keeps everything else running.",
    points: [
      "Infrastructure & systems setup",
      "Cloud hosting & management",
      "Technical support & maintenance",
      "Security & performance audits",
    ],
    stat: { value: "24/7", label: "Support available" },
  },
];

export const advantages: { icon: IconName; t: string; d: string }[] = [
  { icon: "lightbulb", t: "Think Beyond Ordinary", d: "Bold ideas backed by strategic thinking and purposeful creativity." },
  { icon: "target", t: "Research-Led Strategy", d: "Every decision starts with understanding your market, audience, and business objectives." },
  { icon: "layers", t: "One Creative Ecosystem", d: "Marketing, technology, production, and branding working together, not in silos." },
  { icon: "zap", t: "Fast Without Compromise", d: "Agile execution with uncompromising attention to detail and quality." },
  { icon: "target", t: "Designed Around You", d: "Every project is custom-built to match your vision, not ours." },
  { icon: "trending", t: "Results That Matter", d: "We measure success by business growth, stronger brands, and lasting impact, not vanity metrics." },
];

export const process = [
  { t: "Discover", d: "Understand the business, the audience, and the real problem behind the brief." },
  { t: "Strategy", d: "Turn that understanding into a plan: positioning, channels, and a timeline." },
  { t: "Design", d: "Shape the idea into something people can see, feel, and react to." },
  { t: "Develop", d: "Build it, whether it's a site, campaign, film or event, to spec and on schedule." },
  { t: "Launch & Grow", d: "Ship it, measure it, and keep sharpening based on real results." },
];

export const testimonials = [
  {
    quote:
      "Working with Odd Creatives was an absolute pleasure! Their team went above and beyond to bring our vision to life. From the initial concept to the final product, they demonstrated professionalism, creativity, and attention to detail. Our social media engagement has skyrocketed, and we couldn't be happier with the results.",
    name: "Ganeyesh Paygude",
    role: "Owner, Hotel Jagdamba",
  },
  {
    quote:
      "Odd Creatives has been instrumental in elevating Sarita's Kitchen to new heights. Their expertise, professionalism, and commitment to our success have been exceptional. From video production to strategic posting, they deliver results that exceed expectations.",
    name: "Sarita's Kitchen",
    role: "1.5 Million YouTube Channel",
  },
  {
    quote:
      "Odd Creatives designed and developed a modern, high-performing website that perfectly reflects our hospitality experience. Their attention to detail, seamless execution, and technical expertise made the entire process effortless.",
    name: "Nirwana Stays",
    role: "Website Design & Development",
  },
  {
    quote:
      "From UI/UX design to development, the Odd Creatives team delivered a premium website that aligns perfectly with our luxury brand identity. Their professionalism, responsiveness, and commitment to quality exceeded our expectations.",
    name: "Zurrii Luxury",
    role: "Website Design & Development",
  },
];

export const clients = [
  "Quick Heal",
  "Dominix Global Design",
  "Hotel Jagdamba",
  "Sarita's Kitchen",
  "FRF",
  "Chitale Bandhu",
  "Nirwana Stays",
  "Zurrii Luxury",
  "Josh Talks",
  "Zee Marathi",
  "OLA",
  "Amazon",
  "Ecovastu Builders",
  "Sakshe Foods",
  "Dr. Kajale",
];

export const about = {
  intro:
    "Odd Creatives & Management was founded with one belief: every brand has a unique story waiting to be told. What started as a small creative vision has evolved into a multidisciplinary company bringing together branding, marketing, technology, production, event execution, and digital innovation under one roof.",
  intro2:
    "Today, we help businesses transform ideas into experiences, challenges into opportunities, and ambitions into measurable success.",
  mission: {
    title: "Creating experiences that inspire, connect & grow.",
    body: "Our mission is to empower businesses through creativity, innovation, and technology by delivering meaningful brand experiences that captivate audiences, strengthen connections, and create measurable impact. Every strategy, campaign, design, and solution we create is driven by purpose and built for growth.",
  },
  vision: {
    title: "Shaping the future of creative innovation.",
    body: "We envision becoming one of India's most trusted creative companies, recognized for transforming bold ideas into extraordinary experiences through creativity, technology, production, and innovation. Our goal is to help brands stand apart, stay relevant, and create a lasting impact in an ever-changing world.",
  },
  values: [
    {
      icon: "lightbulb" as IconName,
      t: "Creativity Without Limits",
      d: "Every challenge is an opportunity to think differently. We embrace bold ideas that help brands stand out in an ordinary world.",
    },
    {
      icon: "target" as IconName,
      t: "Strategy That Matters",
      d: "Behind every design, campaign, and experience is a clear purpose: creating measurable impact for your business.",
    },
    {
      icon: "handshake" as IconName,
      t: "Partnership Over Projects",
      d: "We don't just complete projects; we build lasting relationships by becoming an extension of your team.",
    },
  ],
  highlights: [
    "Founded in 2021",
    "Proudly based in Pune",
    "Serving clients across India",
    "Creative · Technology · Production",
  ],
  milestones: [
    {
      y: "2021",
      t: "The Beginning",
      d: "Odd Creatives was founded in Rajgurunagar with one vision: to help businesses tell meaningful stories through creativity, innovation, and purpose.",
    },
    {
      y: "2022",
      t: "Building Trust",
      d: "Started collaborating with brands across Pune and Maharashtra, delivering branding, digital marketing, and creative solutions tailored to every business.",
    },
    {
      y: "2023",
      t: "Growing Beyond Creative",
      d: "Expanded into web development, IT solutions, multimedia production, and integrated marketing, creating a complete creative ecosystem under one roof.",
    },
    {
      y: "2024",
      t: "Creating Experiences",
      d: "Introduced event planning, content production, social media strategy, and performance marketing to deliver end-to-end brand experiences.",
    },
    {
      y: "Today",
      t: "The Journey Continues",
      d: "Odd Creatives & Management is a multidisciplinary creative company empowering businesses through strategy, technology, production, and innovation, helping brands grow with confidence.",
    },
  ],
};
