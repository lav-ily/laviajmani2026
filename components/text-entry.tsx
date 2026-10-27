"use client";

import { createContext, useContext, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — page copy entry
 *
 * Read top-to-bottom. Each `at` value is ms after mount.
 *
 *    0ms   every block hidden: opacity 0, 12px to the left
 *  120ms   all blocks (title + paragraphs) slide right into place and fade in together
 *          (350ms, ease-out)
 *
 * Quick switching between case studies (`from` below/above): the same on the Y axis, snappier
 * so rapid steps keep up: no start delay, 250ms.
 *
 * Reduced motion: every block fades in together, no movement.
 * ───────────────────────────────────────────────────────── */

/** Where each block enters from: the left on a fresh open, below/above when stepping next/previous. */
export type TextEntryFrom = "left" | "below" | "above";

const EASE_OUT = [0.23, 1, 0.32, 1] as const; // strong ease-out

const ENTRY: Record<
  TextEntryFrom,
  { start: number; duration: number; hiddenTransform: string; shownTransform: string }
> = {
  // `start` waits past first paint, so hydration doesn't eat the opening frames.
  left: {
    start: 0.12,
    duration: 0.35,
    hiddenTransform: "translateX(-12px)",
    shownTransform: "translateX(0px)",
  },
  below: {
    start: 0,
    duration: 0.25,
    hiddenTransform: "translateY(12px)",
    shownTransform: "translateY(0px)",
  },
  above: {
    start: 0,
    duration: 0.25,
    hiddenTransform: "translateY(-12px)",
    shownTransform: "translateY(0px)",
  },
};

function itemVariants(from: TextEntryFrom): Variants {
  const entry = ENTRY[from];
  return {
    hidden: { opacity: 0, transform: entry.hiddenTransform },
    shown: {
      opacity: 1,
      transform: entry.shownTransform,
      transition: { duration: entry.duration, ease: EASE_OUT },
    },
  };
}

const REDUCED_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  shown: { opacity: 1, transition: { duration: 0.2, ease: EASE_OUT } },
};

const EntryContext = createContext<Variants | null>(null);

type TextEntryProps = {
  from?: TextEntryFrom;
  className?: string;
  children: ReactNode;
};

/** Moves the `TextEntryItem` blocks inside it into place together, every time it mounts. */
export function TextEntry({ from = "left", className, children }: TextEntryProps) {
  const reducedMotion = useReducedMotion();

  // Stays a motion element under reduced motion too, so it matches the server-rendered start state.
  return (
    <EntryContext.Provider value={reducedMotion ? REDUCED_ITEM_VARIANTS : itemVariants(from)}>
      <motion.div
        className={className}
        initial="hidden"
        animate="shown"
        transition={reducedMotion ? undefined : { delayChildren: ENTRY[from].start }}
      >
        {children}
      </motion.div>
    </EntryContext.Provider>
  );
}

type TextEntryItemProps = {
  className?: string;
  children: ReactNode;
};

/** One block of copy (a heading group or a paragraph) inside a `TextEntry`. */
export function TextEntryItem({ className, children }: TextEntryItemProps) {
  const variants = useContext(EntryContext);
  return (
    <motion.div className={className} variants={variants ?? undefined}>
      {children}
    </motion.div>
  );
}
