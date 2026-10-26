"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** One shared pill: whichever nav mounts next springs out of the previous one's shape. */
const ISLAND_LAYOUT_ID = "grid-nav-island";

/** Dynamic Island–style morph: fast, with only a hint of overshoot as the pill settles. */
const ISLAND_SPRING = { type: "spring", visualDuration: 0.3, bounce: 0.15 } as const;

/** Strong ease-out for the contents arriving in the new shape. */
export const ISLAND_EASE_OUT = [0.23, 1, 0.32, 1] as const;

/** Set in `style` so Framer Motion corrects it while the pill scales, unlike a `drop-shadow` filter. */
const ISLAND_SHADOW = "4px 4px 8px rgba(33, 33, 33, 0.16)";

type NavIslandProps = {
  label: string;
  /** Width and gap of the pill's row. */
  className: string;
  /** Extra classes for the full-width dock the pill is centered in, e.g. stacking. */
  dockClassName?: string;
  children: ReactNode;
};

/** Floating white pill over the bottom of the grid panel, shared by the grid and case study navs. */
export function NavIsland({ label, className, dockClassName = "", children }: NavIslandProps) {
  const reducedMotion = useReducedMotion();
  const morph = reducedMotion ? { duration: 0 } : ISLAND_SPRING;

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-3 flex justify-center md:bottom-[49px] ${dockClassName}`}
    >
      <motion.nav
        layoutId={ISLAND_LAYOUT_ID}
        aria-label={label}
        className={`pointer-events-auto flex h-12 overflow-hidden bg-white md:h-14 ${className}`}
        style={{ borderRadius: 44, boxShadow: ISLAND_SHADOW }}
        transition={morph}
      >
        {/* Undoes the pill's scale on the contents so they don't stretch mid-morph. */}
        <motion.div layout="position" transition={morph} className="flex size-full gap-[inherit]">
          <motion.div
            className="flex size-full items-center justify-center gap-[inherit] px-2.5 py-2"
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, transform: "scale(0.96)", filter: "blur(2px)" }
            }
            animate={{ opacity: 1, transform: "scale(1)", filter: "blur(0px)" }}
            transition={{
              duration: reducedMotion ? 0.15 : 0.2,
              delay: reducedMotion ? 0 : 0.05,
              ease: ISLAND_EASE_OUT,
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.nav>
    </div>
  );
}
