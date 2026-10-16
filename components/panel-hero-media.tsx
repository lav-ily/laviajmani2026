"use client";

import { motion, useReducedMotion } from "framer-motion";

import {
  CASE_STUDY_BENTO_FADE_S,
  CASE_STUDY_MOTION_EASE,
  caseStudyHeroFillDelay,
} from "@/lib/kelly-grid-motion";

/** Figma `78:128` / `172:318` — 1085×714 hero on a 1117 square, sized from the panel's shorter side. */
const HERO_WIDTH_PCT = (1085 / 1117) * 100;

type PanelHeroMediaProps = {
  panelColor: string;
  blockColor: string;
  originIndex: number;
  fillGeneration: number;
  mediaSrc?: string;
  title: string;
};

export function PanelHeroMedia({
  panelColor,
  blockColor,
  originIndex,
  fillGeneration,
  mediaSrc,
  title,
}: PanelHeroMediaProps) {
  const reducedMotion = useReducedMotion();
  const delay = reducedMotion ? 0 : caseStudyHeroFillDelay(originIndex);

  return (
    <section
      aria-label={`${title} media`}
      className="absolute inset-0 z-30 overflow-hidden [container-type:size]"
      style={{ backgroundColor: panelColor }}
    >
      <motion.div
        key={fillGeneration}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        style={{
          backgroundColor: blockColor,
          width: `min(${HERO_WIDTH_PCT}cqw, ${HERO_WIDTH_PCT}cqh)`,
          aspectRatio: "1085 / 714",
        }}
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: reducedMotion ? 0 : CASE_STUDY_BENTO_FADE_S,
          delay,
          ease: CASE_STUDY_MOTION_EASE,
        }}
      >
        {mediaSrc ? (
          <video
            className="size-full object-cover"
            src={mediaSrc}
            autoPlay={!reducedMotion}
            loop
            muted
            playsInline
            controls={Boolean(reducedMotion)}
            preload="metadata"
            aria-label={title}
          />
        ) : null}
      </motion.div>
    </section>
  );
}
