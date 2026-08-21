"use client";

import { motion } from "framer-motion";

import type { WorkItem } from "@/lib/projects";
import { StarMark } from "./star-mark";
import { WorkTag } from "./work-tag";
import { WorkVideo } from "./work-video";

/** Shared card chrome from Figma `Card` / `Card — Wide` nodes. */
const CARD_BASE = "relative overflow-clip rounded-[6px] bg-[#e4e4e4]";
const WIDE = `${CARD_BASE} h-[360px] md:h-[556px]`;
const HALF = `${CARD_BASE} h-[480px] md:h-[690px]`;

/** Content zoom inside a fixed card frame on hover. */
const HOVER_EASE = [0.22, 1, 0.36, 1] as const;

const CONTENT_VARIANTS = {
  rest: { scale: 1 },
  hover: {
    scale: 1.045,
    transition: { duration: 0.55, ease: HOVER_EASE },
  },
};

function InProgressState() {
  return (
    <div className="absolute left-[calc(50%-0.75px)] top-1/2 h-[338px] w-[337px] -translate-x-1/2 -translate-y-1/2 overflow-clip rounded-[6px]">
      <div className="absolute left-[calc(50%+1px)] top-[calc(50%-19px)] -translate-x-1/2 -translate-y-1/2">
        <StarMark className="size-[38px]" variant="muted" />
      </div>
      <div className="absolute left-1/2 top-[calc(50%+26.5px)] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-[family-name:var(--font-geist-sans)] text-[16px] font-normal leading-normal text-[#565656]">
        Samples in progress
      </div>
    </div>
  );
}

function CardMedia({ item, isWide }: { item: WorkItem; isWide: boolean }) {
  if (isWide && item.variant === "video" && item.mediaSrc) {
    return <WorkVideo src={item.mediaSrc} />;
  }

  return <InProgressState />;
}

export function WorkCard({ item, priority = false }: { item: WorkItem; priority?: boolean }) {
  const isWide = item.layout === "wide";
  const disableHoverScale = item.variant === "video";

  const media = <CardMedia item={item} isWide={isWide} />;

  if (disableHoverScale) {
    return (
      <article className={isWide ? WIDE : HALF}>
        <WorkTag year={item.year} name={item.name} role={item.role} />
        <div className="absolute inset-0">{media}</div>
      </article>
    );
  }

  return (
    <motion.article className={isWide ? WIDE : HALF} initial="rest" whileHover="hover">
      <WorkTag year={item.year} name={item.name} role={item.role} />

      <motion.div
        className="absolute inset-0 origin-center will-change-transform"
        variants={CONTENT_VARIANTS}
      >
        {media}
      </motion.div>
    </motion.article>
  );
}
