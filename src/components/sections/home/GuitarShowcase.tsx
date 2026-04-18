"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { initializeGsap } from "@/lib/gsap";
import styles from "./GuitarShowcase.module.css";

type GuitarSlide = {
  image: string;
  label: string;
  title: string;
};

type GuitarShowcaseProps = {
  slides: GuitarSlide[];
};

const POSITIONS = [
  { xPercent: -126, scale: 0.8, opacity: 0.28, zIndex: 1, rotateY: 16 },
  { xPercent: -50, scale: 1, opacity: 1, zIndex: 3, rotateY: 0 },
  { xPercent: 26, scale: 0.8, opacity: 0.28, zIndex: 1, rotateY: -16 },
];
const AUTO_ADVANCE_MS = 2600;

function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

export function GuitarShowcase({ slides }: GuitarShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => wrapIndex(current + 1, slides.length));
    }, AUTO_ADVANCE_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [slides.length]);

  useEffect(() => {
    const gsap = initializeGsap();

    cardRefs.current.forEach((card, index) => {
      if (!card) {
        return;
      }

      const relativeIndex = wrapIndex(index - activeIndex + 1, slides.length);
      const position = POSITIONS[relativeIndex] ?? POSITIONS[1];

      gsap.to(card, {
        duration: 0.7,
        ease: "power3.out",
        xPercent: position.xPercent,
        yPercent: -50,
        scale: position.scale,
        opacity: position.opacity,
        rotationY: position.rotateY,
        zIndex: position.zIndex,
        filter: `brightness(${position.opacity === 1 ? 1 : 0.62})`,
      });
    });
  }, [activeIndex, slides.length]);

  const activeSlide = slides[activeIndex];

  return (
    <section className={styles.section}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${activeSlide.image})` }}
      />
      <div className={styles.overlay} />

      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Final Section</span>
          <h2 className={styles.title}>Electric Guitar Showcase</h2>
          <p className={styles.description}>
            A coverflow-inspired ending scene using your generated guitar images
            as the final visual reveal.
          </p>
        </div>

        <div className={styles.stage}>
          {slides.map((slide, index) => {
            const relativeIndex = wrapIndex(index - activeIndex + 1, slides.length);
            const isCenterCard = relativeIndex === 1;

            return (
              <button
                aria-label={
                  isCenterCard
                    ? `${slide.title} active card`
                    : relativeIndex === 0
                      ? `Show previous guitar: ${slide.title}`
                      : `Show next guitar: ${slide.title}`
                }
                className={`${styles.card} ${!isCenterCard ? styles.cardInteractive : ""}`}
                key={slide.image}
                onClick={() => {
                  if (isCenterCard) {
                    return;
                  }

                  setActiveIndex(index);
                }}
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                type="button"
              >
                <Image
                  alt={slide.title}
                  className={styles.cardImage}
                  fill
                  priority={index === 0}
                  src={slide.image}
                />
                <div className={styles.cardShade} />
                <div className={styles.cardCopy}>
                  <span className={styles.cardLabel}>{slide.label}</span>
                  <h3 className={styles.cardTitle}>{slide.title}</h3>
                </div>
              </button>
            );
          })}
        </div>

        <div className={styles.meta}>{`${activeIndex + 1} / ${slides.length}`}</div>
      </div>
    </section>
  );
}
