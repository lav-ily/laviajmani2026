"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { ISLAND_EASE_OUT, NavIsland } from "@/components/nav-island";

const ICON_BUTTON =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] px-2 py-1.5 " +
  "transition-[background-color,scale] duration-150 ease-out hover:bg-[var(--color-nav-tab-active)] active:scale-[0.97] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(0,0,0,0.25)]";

/** 1 = next (title enters from below, like the down chevron), -1 = previous. */
type StepDirection = 1 | -1;

const titleVariants = {
  enter: (direction: StepDirection) => ({
    opacity: 0,
    transform: `translateY(${direction * 8}px)`,
    filter: "blur(2px)",
  }),
  center: { opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" },
  exit: (direction: StepDirection) => ({
    opacity: 0,
    transform: `translateY(${direction * -8}px)`,
    filter: "blur(2px)",
  }),
};

type CaseStudyNavProps = {
  title: string;
  onBack: () => void;
  /** Omit both on pages outside the case study loop (Research, About) to drop the chevrons. */
  onNext?: () => void;
  onPrevious?: () => void;
};

function NavIcon({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static 24px SVG icon
    <img src={src} alt="" width={24} height={24} className="block size-6" />
  );
}

/** Figma `278:12612` — back to the grid, current page, next/previous case study (wraps around). */
export function CaseStudyNav({ title, onBack, onNext, onPrevious }: CaseStudyNavProps) {
  const reducedMotion = useReducedMotion();
  const [direction, setDirection] = useState<StepDirection>(1);
  const step = (next: StepDirection, go: () => void) => {
    setDirection(next);
    go();
  };

  return (
    <NavIsland label="Page" className="w-max gap-4" dockClassName="z-40">
      <button type="button" aria-label="Back to grid" className={ICON_BUTTON} onClick={onBack}>
        <NavIcon src="/icons/arrow-left.svg" />
      </button>
      <p
        aria-live="polite"
        className="relative flex h-full w-[140px] shrink-0 items-center justify-center overflow-hidden px-4 py-1.5 font-body text-[16px] leading-normal whitespace-nowrap text-black"
      >
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.span
            key={title}
            custom={direction}
            variants={reducedMotion ? undefined : titleVariants}
            initial={reducedMotion ? { opacity: 0 } : "enter"}
            animate={reducedMotion ? { opacity: 1 } : "center"}
            exit={reducedMotion ? { opacity: 0 } : "exit"}
            transition={{ duration: reducedMotion ? 0.15 : 0.2, ease: ISLAND_EASE_OUT }}
          >
            {title}
          </motion.span>
        </AnimatePresence>
      </p>
      {onNext && onPrevious ? (
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            aria-label="Next case study"
            className={ICON_BUTTON}
            onClick={() => step(1, onNext)}
          >
            <NavIcon src="/icons/chevron-down-large.svg" />
          </button>
          <button
            type="button"
            aria-label="Previous case study"
            className={ICON_BUTTON}
            onClick={() => step(-1, onPrevious)}
          >
            <NavIcon src="/icons/chevron-up-large.svg" />
          </button>
        </div>
      ) : (
        <span aria-hidden className="w-10 shrink-0" />
      )}
    </NavIsland>
  );
}
