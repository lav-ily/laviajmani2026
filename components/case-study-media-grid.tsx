"use client";

import type { ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { CASE_STUDY_SAMPLES } from "@/components/case-study-samples";
import { SampleStage } from "@/components/case-study-samples/sample-stage";
import { useGridLayout } from "@/components/grid-layout-context";
import {
  BENTO_BLOCK_COUNT,
  CASE_STUDY_BENTO_FADE_S,
  CASE_STUDY_MOTION_EASE,
  caseStudyBentoFillDelay,
} from "@/lib/kelly-grid-motion";

type CaseStudyMediaGridProps = {
  slug: string;
  panelColor: string;
  blockColor: string;
  originIndex: number;
  fillGeneration: number;
};

function BentoBlock({
  blockIndex,
  originIndex,
  fillGeneration,
  blockColor,
  Sample,
}: {
  blockIndex: number;
  originIndex: number;
  fillGeneration: number;
  blockColor: string;
  Sample?: ComponentType;
}) {
  const reducedMotion = useReducedMotion();
  const layout = useGridLayout();
  const delay = reducedMotion ? 0 : caseStudyBentoFillDelay(layout, originIndex, blockIndex);

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
}: CaseStudyMediaGridProps) {
  const samples = CASE_STUDY_SAMPLES[slug];
  return (
    <section
      aria-label="Case study media"
      className="absolute inset-0 z-30 overflow-hidden"
      style={{ backgroundColor: panelColor }}
    >
      <div className="absolute inset-[1.432%] grid grid-cols-2 grid-rows-3 gap-[1.475%]">
        {Array.from({ length: BENTO_BLOCK_COUNT }, (_, index) => (
          <BentoBlock
            key={index}
            blockIndex={index}
            originIndex={originIndex}
            fillGeneration={fillGeneration}
            blockColor={blockColor}
            Sample={samples?.[index]}
          />
        ))}
      </div>
    </section>
  );
}
