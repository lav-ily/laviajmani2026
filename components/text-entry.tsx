"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — page copy entry
 *
 * Read top-to-bottom. Each `at` value is ms after mount.
 *
 *    0ms   copy hidden: opacity 0, blur 8px
 *  120ms   all copy fades in together, opacity 0 → 1 (450ms, ease-out)
 *  120ms   blur clears, 8px → 0 (650ms, ease-out, trails the fade)
 *  770ms   settled; filter removed so text renders crisp
 * ───────────────────────────────────────────────────────── */

const TIMING = {
  entryStart: 120, // after first paint, so hydration doesn't eat the opening frames
};

const TEXT_ENTRY = {
  initialBlurPx: 8, // blur before the copy resolves
  fade: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  unblur: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

type TextEntryProps = {
  /** When false, renders the copy as-is (e.g. returning to a page that already entered). */
  animate?: boolean;
  onComplete?: () => void;
  className?: string;
  children: ReactNode;
};

/** Blur-and-fade entry for a block of page copy. */
export function TextEntry({ animate = true, onComplete, className, children }: TextEntryProps) {
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
      initial={{ opacity: 0, filter: `blur(${TEXT_ENTRY.initialBlurPx}px)` }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              opacity: { ...TEXT_ENTRY.fade, delay },
              filter: { ...TEXT_ENTRY.unblur, delay },
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
