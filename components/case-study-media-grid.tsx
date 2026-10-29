"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { CASE_STUDY_SAMPLES } from "@/components/case-study-samples";
import { DECK_SHADOW, SampleStage } from "@/components/case-study-samples/sample-stage";
import { useGridLayout } from "@/components/grid-layout-context";
import { MOBILE_CARDS_HEIGHT_PX } from "@/components/mobile-case-study-cards";
import {
  BENTO_BLOCK_COUNT,
  CASE_STUDY_BENTO_FADE_S,
  CASE_STUDY_MOTION_EASE,
  QUAD_BLOCK_COUNT,
  caseStudyBentoFillDelay,
} from "@/lib/kelly-grid-motion";
import type { BentoPhoto } from "@/lib/case-studies/types";

/** Mobile: the solid card block grows from the stack's height to fit the 1×6 column of samples. */
const MOBILE_GROW_S = 0.6;

const MEDIA_LABELS: Partial<Record<string, string>> = {
  "la-vie": "Latest from La Vie",
  about: "Photos",
};

type CaseStudyMediaGridProps = {
  slug: string;
  panelColor: string;
  blockColor: string;
  originIndex: number;
  fillGeneration: number;
  /** `BENTO_BLOCK_COUNT` (2×3) or `QUAD_BLOCK_COUNT` (2×2). */
  blockCount?: number;
  /** Fill blocks with photos (Research, About) instead of the slug's case study samples. */
  photos?: ReadonlyArray<BentoPhoto>;
  /** Hover captions for the sample cards, in block order. */
  captions?: ReadonlyArray<string | undefined>;
};

function PhotoCard({ photo }: { photo: BentoPhoto }) {
  const image = (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes="(max-width: 839px) 100vw, 50vw"
      className="object-cover"
      style={photo.focus ? { objectPosition: photo.focus } : undefined}
    />
  );

  if (!photo.href) return image;

  return (
    <a
      href={photo.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${photo.alt} (opens Tumblr)`}
      className="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
    >
      {image}
    </a>
  );
}

/** Figma `340:1364` — slides up along the card's bottom edge while the card is hovered. */
function BentoCaption({ children }: { children: string }) {
  return (
    <figcaption
      className={`bento-caption absolute inset-x-0 bottom-0 flex min-h-12 items-center justify-center bg-white px-4 py-2 ${DECK_SHADOW}`}
    >
      <span className="max-w-[339px] text-center text-pretty font-[family-name:var(--font-geist-mono)] text-[12px] font-normal leading-normal text-black">
        {children}
      </span>
    </figcaption>
  );
}

function BentoBlock({
  blockIndex,
  blockCount,
  originIndex,
  fillGeneration,
  blockColor,
  Sample,
  photo,
  caption,
}: {
  blockIndex: number;
  blockCount: number;
  originIndex: number;
  fillGeneration: number;
  blockColor: string;
  Sample?: ComponentType;
  photo?: BentoPhoto;
  caption?: string;
}) {
  const reducedMotion = useReducedMotion();
  const layout = useGridLayout();
  const delay = reducedMotion
    ? 0
    : caseStudyBentoFillDelay(layout, originIndex, blockIndex, blockCount);
  const content = photo ?? Sample;
  const captionText = content ? (photo ? photo.caption : caption) : undefined;

  return (
    <motion.figure
      key={`${fillGeneration}-${blockIndex}`}
      aria-hidden={!content}
      className="bento-card relative m-0 min-h-0 min-w-0 overflow-hidden"
      style={{ backgroundColor: blockColor }}
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reducedMotion ? 0 : CASE_STUDY_BENTO_FADE_S,
        delay,
        ease: CASE_STUDY_MOTION_EASE,
      }}
    >
      {photo ? (
        <PhotoCard photo={photo} />
      ) : Sample ? (
        <SampleStage>
          <Sample />
        </SampleStage>
      ) : null}
      {captionText ? <BentoCaption>{captionText}</BentoCaption> : null}
    </motion.figure>
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
  photos,
  captions,
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
      photo={photos?.[index]}
      caption={captions?.[index]}
    />
  ));

  if (layout.id === "cards") {
    return (
      <motion.section
        aria-label={MEDIA_LABELS[slug] ?? "Case study media"}
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
      aria-label={MEDIA_LABELS[slug] ?? "Case study media"}
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
