"use client";

import type { ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { CASE_STUDY_SAMPLES } from "@/components/case-study-samples";
import { SampleStage } from "@/components/case-study-samples/sample-stage";
import { useGridLayout } from "@/components/grid-layout-context";
import { MOBILE_CARDS_HEIGHT_PX } from "@/components/mobile-case-study-cards";
import {
  BENTO_BLOCK_COUNT,
  CASE_STUDY_BENTO_FADE_S,
  CASE_STUDY_MOTION_EASE,
  QUAD_BLOCK_COUNT,
  caseStudyBentoFillDelay,
} from "@/lib/kelly-grid-motion";

/** Mobile: the solid card block grows from the stack's height to fit the 1×6 column of samples. */
const MOBILE_GROW_S = 0.6;

type CaseStudyMediaGridProps = {
  slug: string;
  panelColor: string;
  blockColor: string;
  originIndex: number;
  fillGeneration: number;
  /** `BENTO_BLOCK_COUNT` (2×3) or `QUAD_BLOCK_COUNT` (2×2). */
  blockCount?: number;
};

function BentoBlock({
  blockIndex,
  blockCount,
  originIndex,
  fillGeneration,
  blockColor,
  Sample,
}: {
  blockIndex: number;
  blockCount: number;
  originIndex: number;
  fillGeneration: number;
  blockColor: string;
  Sample?: ComponentType;
}) {
  const reducedMotion = useReducedMotion();
  const layout = useGridLayout();
  const delay = reducedMotion
    ? 0
    : caseStudyBentoFillDelay(layout, originIndex, blockIndex, blockCount);

  return (
    <motion.div
      key={`${fillGeneration}-${blockIndex}`}
      aria-hidden={!Sample}
      className="relative min-h-0 min-w-0"
      style={{ backgroundColor: blockColor }}
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reducedMotion ? 0 : CASE_STUDY_BENTO_FADE_S,
        delay,
        ease: CASE_STUDY_MOTION_EASE,
      }}
    >
      {Sample ? (
        <SampleStage>
          <Sample />
        </SampleStage>
      ) : null}
    </motion.div>
  );
}

/** Mount only once the grid is a solid field of `panelColor` — its background covers the panel. */
export function CaseStudyMediaGrid({
  slug,
  panelColor,
  blockColor,
  originIndex,
  fillGeneration,
  blockCount = BENTO_BLOCK_COUNT,
}: CaseStudyMediaGridProps) {
  const reducedMotion = useReducedMotion();
  const layout = useGridLayout();
  const samples = CASE_STUDY_SAMPLES[slug];
  const blocks = Array.from({ length: blockCount }, (_, index) => (
    <BentoBlock
      key={index}
      blockIndex={index}
      blockCount={blockCount}
      originIndex={originIndex}
      fillGeneration={fillGeneration}
      blockColor={blockColor}
      Sample={samples?.[index]}
    />
  ));

  if (layout.id === "cards") {
    return (
      <motion.section
        aria-label="Case study media"
        className="relative z-30 overflow-hidden"
        style={{ backgroundColor: panelColor }}
        initial={reducedMotion ? false : { height: MOBILE_CARDS_HEIGHT_PX }}
        animate={{ height: "auto" }}
        transition={{ duration: reducedMotion ? 0 : MOBILE_GROW_S, ease: CASE_STUDY_MOTION_EASE }}
      >
        <div className="grid grid-cols-1 gap-[5px] p-[5px] [&>*]:aspect-[534.5/351]">{blocks}</div>
      </motion.section>
    );
  }

  return (
    <section
      aria-label="Case study media"
      className="absolute inset-0 z-30 overflow-hidden"
      style={{ backgroundColor: panelColor }}
    >
      <div
        className={`absolute inset-[1.432%] grid grid-cols-2 gap-[1.475%] ${
          blockCount === QUAD_BLOCK_COUNT ? "grid-rows-2" : "grid-rows-3"
        }`}
      >
        {blocks}
      </div>
    </section>
  );
}
