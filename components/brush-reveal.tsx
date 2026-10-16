"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Feathered, slightly slanted edge; the mask is 3× wide so it can slide fully off either side. */
const BRUSH_MASK = "linear-gradient(100deg, #000 42%, transparent 58%)";
const MASK_POSITION = "var(--brush-x) 0%";

type BrushRevealProps = {
  delay: number;
  duration: number;
  className?: string;
  children: ReactNode;
};

/** Wipes its children on left to right, like a brush stroke. */
export function BrushReveal({ delay, duration, className, children }: BrushRevealProps) {
  const reducedMotion = useReducedMotion();
  const [done, setDone] = useState(false);

  if (reducedMotion || done) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{
        maskImage: BRUSH_MASK,
        WebkitMaskImage: BRUSH_MASK,
        maskSize: "300% 100%",
        WebkitMaskSize: "300% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: MASK_POSITION,
        WebkitMaskPosition: MASK_POSITION,
      }}
      initial={{ "--brush-x": "100%" }}
      animate={{ "--brush-x": "0%" }}
      transition={{ duration, delay, ease: [0.45, 0, 0.2, 1] }}
      onAnimationComplete={() => setDone(true)}
    >
      {children}
    </motion.div>
  );
}
