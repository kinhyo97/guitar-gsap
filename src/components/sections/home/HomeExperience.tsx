"use client";

import { useEffect } from "react";
import { FullpageScroller } from "@/components/fullpage/FullpageScroller";
import { FullpageSection } from "@/components/sections/home/FullpageSection";
import { GuitarShowcase } from "@/components/sections/home/GuitarShowcase";
import { HorizontalPanels } from "@/components/sections/home/HorizontalPanels";
import { ScrollContentSection } from "@/components/sections/home/ScrollContentSection";

const guitarSlides = [
  {
    image: "/images/pages/home/guitar1.png",
    label: "Electric Series 01",
    title: "Amber Burst",
  },
  {
    image: "/images/pages/home/guitar2.png",
    label: "Electric Series 02",
    title: "Natural Glow",
  },
  {
    image: "/images/pages/home/guitar3.png",
    label: "Electric Series 03",
    title: "Dark Walnut",
  },
];

const sections = [
  {
    id: "section-1",
    backgrounds: ["#050505"],
    foregrounds: ["#f4efe7"],
    render: () => (
      <FullpageSection
        description="The opening scene now fills the screen with your hero video. Extra height is cropped vertically so the first frame always feels cinematic."
        eyebrow="Section One"
        index="01"
        title="Hero video opening scene"
        videoSrc="/videos/hero.mp4"
      />
    ),
  },
  {
    id: "section-2",
    backgrounds: ["#0a0d10"],
    foregrounds: ["#eff6ff"],
    render: () => <GuitarShowcase slides={guitarSlides} />,
  },
  {
    id: "section-3",
    backgrounds: ["#18120e", "#110e0d", "#0d0d0d"],
    foregrounds: ["#fff7ef", "#fff7ef", "#f7f3ec"],
    steps: 3,
    render: ({ activeStep }: { activeStep: number; scrollOffset: number }) => (
      <HorizontalPanels
        activePanel={activeStep}
        panels={[
          {
            description:
              "The first cut lands full-screen so the guitar reads like a hero object before the sequence starts sliding sideways.",
            eyebrow: "Section Three",
            image: "/images/pages/home/showcase-guitar1.png",
            title: "Guitar Showcase",
          },
          {
            description:
              "One more scroll pushes the stage to the right and reveals the next guitar frame in the same cinematic rhythm.",
            eyebrow: "Section Three",
            image: "/images/pages/home/guitar2.png",
            title: "Guitar Showcase",
          },
          {
            description:
              "The final panel closes the run with another full-bleed guitar image before the page returns to the next section.",
            eyebrow: "Section Three",
            image: "/images/pages/home/guitar3.png",
            title: "Guitar Showcase",
          },
        ]}
      />
    ),
  },
  {
    id: "section-4",
    backgrounds: ["#121212"],
    foregrounds: ["#f5f1e8"],
    scrollLimit: 540,
    render: ({
      scrollOffset,
    }: {
      activeStep: number;
      scrollOffset: number;
    }) => (
      <ScrollContentSection
        cards={[
          {
            title: "Natural vertical reading",
            text: "The fourth section behaves differently. Instead of snapping away, it lets the user keep scrolling down through real stacked content.",
          },
          {
            title: "Transition break in the rhythm",
            text: "This gives you a place for denser information, storytelling blocks, or editorial content before the experience becomes theatrical again.",
          },
          {
            title: "Return point to snap mode",
            text: "Once this scroll area is fully consumed, the next wheel movement hands control back to the fullpage engine and jumps to section five.",
          },
        ]}
        description="This is the only section that temporarily leaves the strict fullpage rhythm. Keep scrolling here and the content continues to reveal downward."
        eyebrow="Section Four"
        maxOffset={540}
        scrollOffset={scrollOffset}
        title="Vertical content break"
      />
    ),
  },
  {
    id: "section-5",
    backgrounds: ["#efe4d2"],
    foregrounds: ["#1f1b17"],
    render: () => (
      <FullpageSection
        description="From the fifth section onward, the experience snaps back into the staged fullpage pattern again."
        eyebrow="Section Five"
        index="05"
        title="Fullpage rhythm returns"
      />
    ),
  },
  {
    id: "section-6",
    backgrounds: ["#0d2a45"],
    foregrounds: ["#eff6ff"],
    render: () => (
      <FullpageSection
        description="The story closes on a calm final screen after the showcase sequence has already appeared in section two."
        eyebrow="Section Six"
        index="06"
        title="Closing snap section"
      />
    ),
  },
];

export function HomeExperience() {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.classList.add("fullpage-lock");
    body.classList.add("fullpage-lock");

    return () => {
      html.classList.remove("fullpage-lock");
      body.classList.remove("fullpage-lock");
    };
  }, []);

  return <FullpageScroller sections={sections} />;
}
