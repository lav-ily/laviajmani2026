"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { ABOUT } from "@/lib/about-content";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — landing entry (text only)
 *
 * Read top-to-bottom. Each `at` value is ms after mount.
 *
 *    0ms   intro copy hidden: opacity 0, blur 8px
 *  120ms   all copy fades in together, opacity 0 → 1 (450ms, ease-out)
 *  120ms   blur clears, 8px → 0 (650ms, ease-out, trails the fade)
 *  770ms   settled; filter removed so text renders crisp
 * ───────────────────────────────────────────────────────── */

const TIMING = {
  entryStart: 120, // after first paint, so hydration doesn't eat the opening frames
};

/* Intro copy */
const INTRO_ENTRY = {
  initialBlurPx: 8, // blur before the copy resolves
  fade: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  unblur: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

function IntroEntry({
  animate,
  onComplete,
  className,
  children,
}: {
  animate: boolean;
  onComplete?: () => void;
  className: string;
  children: ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const [done, setDone] = useState(false);

  if (!animate || done) {
    return <div className={className}>{children}</div>;
  }

  // Stays a motion element under reduced motion too, so it matches the server-rendered start state.
  const delay = TIMING.entryStart / 1000;
  return (
    <motion.div
      className={className}
      style={{ willChange: "opacity, filter" }}
      initial={{ opacity: 0, filter: `blur(${INTRO_ENTRY.initialBlurPx}px)` }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              opacity: { ...INTRO_ENTRY.fade, delay },
              filter: { ...INTRO_ENTRY.unblur, delay },
            }
      }
      onAnimationComplete={() => {
        setDone(true);
        onComplete?.();
      }}
    >
      {children}
    </motion.div>
  );
}

type IntroPanelProps = {
  /** Play the blur-in entry; only on the first landing view, not when returning from a page. */
  animateEntry?: boolean;
  onEntryComplete?: () => void;
};

/** Figma `78:195` / `78:196` — intro column; same layout in every homepage state. */
export function IntroPanel({ animateEntry = false, onEntryComplete }: IntroPanelProps) {
  return (
    <aside className="flex-1 bg-white split:min-w-0 split:min-h-svh">
      <div className="px-6 pt-16 pb-12 split:px-0 split:pt-[121px] split:pb-0 split:pl-[var(--intro-pad-left)]">
        <IntroEntry
          animate={animateEntry}
          onComplete={onEntryComplete}
          className="flex w-full max-w-[354px] flex-col gap-[18px] font-body leading-normal text-black"
        >
          <div className="flex w-full flex-col text-[20px]">
            <h1 className="w-full font-semibold">{ABOUT.name}</h1>
            <p className="w-full font-light">{ABOUT.location}</p>
          </div>
          <div className="flex w-full flex-col gap-3 text-[16px] text-balance">
            {ABOUT.paragraphs.map((paragraph) => (
              <p key={paragraph} className="w-full">
                {paragraph}
              </p>
            ))}
          </div>
        </IntroEntry>
      </div>
    </aside>
  );
}
