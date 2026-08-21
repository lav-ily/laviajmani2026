"use client";

import { motion } from "framer-motion";

import type { WorkItem } from "@/lib/projects";
import { HopinPhone } from "./hopin-phone";
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

function WorkScreenshot({
  src,
  alt,
  priority = false,
  className = "object-cover",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : "auto"}
      className={`absolute inset-0 size-full ${className}`}
    />
  );
}

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

function CardMedia({
  item,
  isWide,
  priority,
}: {
  item: WorkItem;
  isWide: boolean;
  priority: boolean;
}) {
  if (item.inProgress) {
    return <InProgressState />;
  }

  if (item.variant === "phone") {
    return (
      <div className="absolute left-1/2 top-1/2 size-[min(510px,80vw)] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <HopinPhone />
        </div>
      </div>
    );
  }

  if (isWide && item.variant === "video" && item.mediaSrc) {
    return <WorkVideo src={item.mediaSrc} />;
  }

  if (isWide && item.mediaSrc) {
    return (
      <div className="absolute left-1/2 top-[12%] h-[min(84vw,673px)] w-[min(92vw,765px)] -translate-x-1/2 md:left-[233px] md:top-[68px] md:h-[673px] md:w-[765px] md:translate-x-0">
        <WorkScreenshot
          src={item.mediaSrc}
          alt={item.mediaAlt ?? item.name}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    );
  }

  if (item.mediaSrc) {
    return (
      <div
        className={`absolute left-[calc(50%+0.25px)] size-[min(510px,80vw)] -translate-x-1/2 -translate-y-1/2 ${
          item.name === "Bullpen" ? "top-[calc(50%+1px)]" : "top-1/2"
        }`}
      >
        <WorkScreenshot src={item.mediaSrc} alt={item.mediaAlt ?? item.name} priority={priority} />
      </div>
    );
  }

  return null;
}

export function WorkCard({ item, priority = false }: { item: WorkItem; priority?: boolean }) {
  const isWide = item.layout === "wide";
  const disableHoverScale = item.variant === "video";

  const media = <CardMedia item={item} isWide={isWide} priority={priority} />;

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
