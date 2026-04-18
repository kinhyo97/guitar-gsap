"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./FullpageScroller.module.css";

type FullpageSection = {
  id: string;
  backgrounds: string[];
  foregrounds: string[];
  render: (context: {
    activeStep: number;
    scrollOffset: number;
  }) => React.ReactNode;
  scrollLimit?: number;
  steps?: number;
};

type FullpageScrollerProps = {
  sections: FullpageSection[];
};

const TRANSITION_DELAY = 900;

export function FullpageScroller({ sections }: FullpageScrollerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const lockRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  const moveTo = useCallback(
    (direction: 1 | -1, deltaMagnitude?: number) => {
      if (lockRef.current) {
        return;
      }

      const currentSection = sections[activeIndex];
      const totalSteps = currentSection.steps ?? 1;
      const scrollLimit = currentSection.scrollLimit ?? 0;

      if (scrollLimit > 0) {
        const delta = deltaMagnitude ?? 120;
        const nextOffset = Math.min(
          Math.max(scrollOffset + direction * delta, 0),
          scrollLimit,
        );

        if (nextOffset !== scrollOffset) {
          setScrollOffset(nextOffset);
          return;
        }
      }

      if (direction === 1 && activeStep < totalSteps - 1) {
        lockRef.current = true;
        setActiveStep((current) => current + 1);

        window.setTimeout(() => {
          lockRef.current = false;
        }, TRANSITION_DELAY);

        return;
      }

      if (direction === -1 && activeStep > 0) {
        lockRef.current = true;
        setActiveStep((current) => current - 1);

        window.setTimeout(() => {
          lockRef.current = false;
        }, TRANSITION_DELAY);

        return;
      }

      const nextIndex = Math.min(
        Math.max(activeIndex + direction, 0),
        sections.length - 1,
      );

      if (nextIndex === activeIndex) {
        return;
      }

      lockRef.current = true;
      setActiveIndex(nextIndex);
      setActiveStep(
        direction === -1 ? (sections[nextIndex].steps ?? 1) - 1 : 0,
      );
      setScrollOffset(direction === -1 ? sections[nextIndex].scrollLimit ?? 0 : 0);

      window.setTimeout(() => {
        lockRef.current = false;
      }, TRANSITION_DELAY);
    },
    [activeIndex, activeStep, scrollOffset, sections],
  );

  const setIndex = useCallback(
    (nextIndex: number) => {
      if (lockRef.current || nextIndex === activeIndex) {
        return;
      }

      lockRef.current = true;
      setActiveIndex(nextIndex);
      setActiveStep(0);
      setScrollOffset(0);

      window.setTimeout(() => {
        lockRef.current = false;
      }, TRANSITION_DELAY);
    },
    [activeIndex],
  );

  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);

    return () => {
      window.removeEventListener("resize", updateViewportHeight);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        moveTo(1);
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        moveTo(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [moveTo]);

  const activeSection = sections[activeIndex];
  const activeBackground = activeSection.backgrounds[activeStep];
  const activeForeground = activeSection.foregrounds[activeStep];
  const shellStyle = {
    backgroundColor: activeBackground,
    color: activeForeground,
    "--fullpage-height": viewportHeight > 0 ? `${viewportHeight}px` : "100vh",
  } as CSSProperties;

  return (
    <div
      aria-label="Full page sections"
      className={styles.shell}
      onTouchEnd={(event) => {
        if (touchStartYRef.current === null) {
          return;
        }

        const delta = touchStartYRef.current - event.changedTouches[0].clientY;
        touchStartYRef.current = null;

        if (Math.abs(delta) < 50) {
          return;
        }

        moveTo(delta > 0 ? 1 : -1);
      }}
      onTouchStart={(event) => {
        touchStartYRef.current = event.touches[0].clientY;
      }}
      onWheel={(event) => {
        if (Math.abs(event.deltaY) < 18) {
          return;
        }

        moveTo(event.deltaY > 0 ? 1 : -1, Math.abs(event.deltaY));
      }}
      style={shellStyle}
    >
      <div
        className={styles.track}
        style={{
          transform:
            viewportHeight > 0
              ? `translateY(-${activeIndex * viewportHeight}px)`
              : `translateY(-${activeIndex * 100}vh)`,
        }}
      >
        {sections.map((section, index) => (
          <div key={section.id}>
            {section.render({
              activeStep: index === activeIndex ? activeStep : 0,
              scrollOffset: index === activeIndex ? scrollOffset : 0,
            })}
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {sections.map((section, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              aria-label={`${index + 1} section move`}
              className={`${styles.dot} ${isActive ? styles.dotActive : ""}`}
              key={section.id}
              onClick={() => setIndex(index)}
              type="button"
            />
          );
        })}
      </div>

      <p className={styles.hint}>Scroll to move</p>
    </div>
  );
}
