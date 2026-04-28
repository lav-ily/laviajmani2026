"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { CSSProperties } from "react";
import type { Project } from "@/lib/projects";

const READ_MORE = "Read more";
const READ_LESS = "Read less";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectIcon({ project }: { project: Project }) {
  const size = "size-[42px] min-h-[42px] min-w-[42px]";

  if (project.iconSelfContained) {
    return (
      <div className={`${size} overflow-hidden rounded-full`}>
        <Image
          src={project.iconSrc}
          alt={`${project.name} logo`}
          width={42}
          height={42}
          className="h-full w-full"
        />
      </div>
    );
  }

  if (project.iconClip) {
    return (
      <div
        className={`${size} flex items-center justify-center overflow-hidden rounded-full`}
        style={{ backgroundColor: project.iconBg }}
      >
        <div className="relative h-[19px] w-[25.25px] overflow-hidden md:h-6 md:w-7">
          <Image
            src={project.iconSrc}
            alt={`${project.name} logo`}
            width={103}
            height={27}
            className="absolute left-0 top-0 max-w-none"
            style={{
              width: project.iconClip.width,
              height: "105.21%",
            }}
          />
        </div>
      </div>
    );
  }

  if (project.name === "Delphi") {
    return (
      <div
        className={`${size} flex items-center justify-center overflow-hidden rounded-full`}
        style={{ backgroundColor: project.iconBg }}
      >
        <div className="h-[25px] w-[25px]">
          <Image
            src={project.iconSrc}
            alt={`${project.name} logo`}
            width={25}
            height={25}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${size} flex items-center justify-center overflow-hidden rounded-full`}
      style={{ backgroundColor: project.iconBg }}
    >
      <div className="h-[19px] w-[27px]">
        <Image
          src={project.iconSrc}
          alt={`${project.name} logo`}
          width={27}
          height={19}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

const mediaAspectClass: Record<NonNullable<Project["mediaAspect"]>, string> = {
  tall: "aspect-[510/213]",
  short: "aspect-[510/201]",
};

const MEDIA_CORNER = "overflow-hidden rounded-[7.319px]";

function mediaVideoCropStyle(pixels: number | undefined): CSSProperties | undefined {
  if (pixels == null || pixels <= 0) return undefined;
  return {
    clipPath: `inset(0 0 ${pixels}px 0)`,
    WebkitClipPath: `inset(0 0 ${pixels}px 0)`,
    marginBottom: -pixels,
  };
}

function ReadMoreChip({
  expanded,
  onToggle,
  descriptionId,
}: {
  expanded: boolean;
  onToggle: () => void;
  descriptionId: string;
}) {
  return (
    <div className="font-system flex w-full max-w-full shrink-0 flex-col items-stretch max-md:min-h-0">
      <button
        type="button"
        id={`${descriptionId}-toggle`}
        aria-expanded={expanded}
        aria-controls={descriptionId}
        onClick={onToggle}
        className="box-border flex h-[21px] min-w-[70px] w-fit max-w-full shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-[10px] border-0 bg-[#303030] px-2 py-0 text-center text-[12px] font-normal not-italic leading-[21px] text-[#8f8f8f] [font-weight:400] touch-manipulation transition-[color,background-color,opacity] hover:text-[#9a9a9a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(255,255,255,0.28)] active:opacity-90"
      >
        {expanded ? READ_LESS : READ_MORE}
      </button>
    </div>
  );
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isFirst = index === 0;
  const aspect =
    project.mediaAspect != null
      ? mediaAspectClass[project.mediaAspect]
      : "aspect-[510/201]";

  const cardSurface = isFirst
    ? "max-md:backdrop-blur-[1.22px] max-md:ring-0"
    : "max-md:backdrop-blur-[15px] max-md:shadow-[8px_10px_17px_0px_rgba(43,43,43,0.13)]";

  const mediaAnchorId = `project-media-${index}`;
  const descriptionId = `project-description-${index}`;
  const [bodyExpanded, setBodyExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`
        font-system relative flex w-full max-w-full flex-col
        max-md:max-w-[361px] max-md:rounded-[24px] max-md:p-[18px] max-md:border-0
        md:max-w-[546px]
        [transform:translateZ(0)]
        overflow-hidden
        bg-[rgba(58,58,58,0.36)]
        rounded-[18px] p-[18px] md:rounded-[24px] md:p-[18px]
        border border-[rgba(255,255,255,0.04)]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.34)]
        max-md:shadow-none
        ${cardSurface}
        md:border-0 md:shadow-[4px_4px_4px_0px_rgba(0,0,0,0.1)]
      `}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 max-md:hidden rounded-[inherit] bg-gradient-to-b from-[rgba(255,255,255,0.04)] via-[rgba(255,255,255,0.015)] to-[rgba(255,255,255,0)]"
      />

      <div className="relative z-10 flex w-full min-h-0 flex-col gap-[14px]">
      <div className="flex w-full min-h-0 items-center max-md:min-h-0 md:min-h-[46px]">
        <div className="flex w-full min-h-0 shrink-0 items-start gap-2 max-md:gap-2">
          <div className="box-border flex shrink-0 items-center py-0.5 pr-0.5 max-md:items-center max-md:justify-center md:box-border md:h-[46px] md:w-[44px] md:items-center md:justify-center">
            <ProjectIcon project={project} />
          </div>
          <div className="flex min-w-0 flex-col items-start gap-0.5 pt-0.5 not-italic text-white max-md:gap-0.5 max-md:pt-0.5 md:min-h-[44px] md:pt-0.5 md:text-base">
            <p className="m-0 min-w-0 whitespace-nowrap text-base font-semibold leading-[21px]">
              {project.name}
            </p>
            <p className="m-0 min-w-0 whitespace-nowrap text-base font-normal leading-[21px]">
              {project.handle}
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex w-full min-w-0 flex-col max-md:gap-1 max-md:-mb-1">
        <p
          id={descriptionId}
          className={`m-0 w-full min-w-0 break-words text-base font-normal not-italic leading-[21px] text-white md:min-w-0 md:pb-0 md:text-[17px] ${
            bodyExpanded ? "max-md:overflow-visible" : "max-md:line-clamp-4"
          }`}
        >
          {project.description}
        </p>
        <div className="shrink-0 md:hidden">
          <ReadMoreChip
            expanded={bodyExpanded}
            descriptionId={descriptionId}
            onToggle={() => setBodyExpanded((e) => !e)}
          />
        </div>
      </div>

      {!project.hideMedia && (
        <div
          id={mediaAnchorId}
          className="relative z-10 w-full shrink-0 scroll-mt-24"
          {...(project.navContrast === "light" ? { "data-nav-contrast": "light" } : {})}
        >
          {project.mediaVideoSrc != null && project.mediaVideoSrc !== "" ? (
            <div className={`w-full bg-[#141414] leading-none ${MEDIA_CORNER}`}>
              <video
                width={project.mediaVideoSize?.width}
                height={project.mediaVideoSize?.height}
                className={`block h-auto w-full max-w-full align-top [transform:translateZ(0)] object-contain [object-position:center] ${MEDIA_CORNER} bg-[#141414]`}
                style={mediaVideoCropStyle(project.mediaBottomCrop)}
                src={project.mediaVideoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label={`${project.name} product video`}
              />
            </div>
          ) : project.mediaImageSrc != null && project.mediaImageSrc !== "" ? (
            <div className={`w-full bg-[#141414] leading-none ${MEDIA_CORNER}`}>
              <Image
                src={project.mediaImageSrc}
                alt={`${project.name} product screenshot`}
                width={project.mediaImageSize?.width ?? 1024}
                height={project.mediaImageSize?.height ?? 900}
                sizes="(max-width: 768px) min(100vw - 60px, 361px), 546px"
                className={`block h-auto w-full max-w-full align-top object-contain [object-position:center] ${MEDIA_CORNER}`}
                priority={isFirst}
              />
            </div>
          ) : (
            <div
              className={`w-full bg-gradient-to-b from-[#4f4f4f] to-[#141414] ${MEDIA_CORNER} ${aspect}`}
            />
          )}
        </div>
      )}

      <div className="relative z-10 flex w-full min-h-0 items-center gap-1 pl-0.5 text-white max-md:min-h-[21px] max-md:gap-1 max-md:pl-0.5 max-md:leading-[21px] md:mt-0 md:min-h-[21px] md:leading-[21px] md:text-base">
        <span className="shrink-0 text-base font-normal leading-[21px] max-md:whitespace-nowrap">
          {project.time}
        </span>
        <span className="shrink-0 text-base font-normal leading-[21px]">•</span>
        <span className="shrink-0 text-base font-normal leading-[21px] max-md:whitespace-nowrap">
          {project.date}
        </span>
      </div>
      </div>
    </motion.div>
  );
}
