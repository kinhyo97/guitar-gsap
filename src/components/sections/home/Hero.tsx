"use client";

import { useEffect, useRef } from "react";
import { homeHero } from "@/data/home";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { initializeGsap } from "@/lib/gsap";
import { Button } from "@/components/common/Button";
import styles from "./Hero.module.css";

export function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !rootRef.current) {
      return;
    }

    const gsap = initializeGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-item]", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, rootRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={rootRef} className={styles.section}>
      <div className={styles.shell}>
        <div className={styles.content}>
          <span className={styles.eyebrow} data-hero-item>
            {homeHero.eyebrow}
          </span>
          <h1 className={styles.title} data-hero-item>
            {homeHero.title}
          </h1>
          <p className={styles.description} data-hero-item>
            {homeHero.description}
          </p>
          <div className={styles.actions} data-hero-item>
            <Button href={homeHero.primaryCta.href}>
              {homeHero.primaryCta.label}
            </Button>
            <Button href={homeHero.secondaryCta.href} variant="secondary">
              {homeHero.secondaryCta.label}
            </Button>
          </div>
        </div>
        <div className={styles.panel} data-hero-item>
          <div className={styles.panelCopy}>
            <span className={styles.panelLabel}>Publishing Mode</span>
            <p className={styles.panelTitle}>
              Keep the build clean. Add motion only where the story needs it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
