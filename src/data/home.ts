import type { FeatureItem, HeroContent } from "@/types";

export const homeHero: HeroContent = {
  eyebrow: "Creative Publishing",
  title: "GSAP animation-ready publishing starter for fast frontend builds.",
  description:
    "A lightweight Next.js structure for promotional sites, product pages, and editorial landing pages without backend complexity.",
  primaryCta: {
    label: "Explore Product",
    href: "/product",
  },
  secondaryCta: {
    label: "Read About",
    href: "/about",
  },
};

export const homeFeatures: FeatureItem[] = [
  {
    title: "Section-first composition",
    description:
      "Build each page from focused sections so motion, copy, and layout stay easy to manage.",
  },
  {
    title: "GSAP-friendly client boundaries",
    description:
      "Interactive sections live in client components while route files stay clean and predictable.",
  },
  {
    title: "Publishing asset organization",
    description:
      "Static images, icons, and fonts are separated for smoother handoff and production updates.",
  },
];
