"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectIcon({ project }: { project: Project }) {
  const size = "w-[30px] h-[30px] md:w-[42px] md:h-[42px]";
  const glyphSize = "w-[19.5px] h-[19.5px] md:w-[25px] md:h-[25px]";

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
        <div className={`${glyphSize} relative overflow-hidden`}>
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
        <div className={glyphSize}>
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
      <Image
        src={project.iconSrc}
        alt={`${project.name} logo`}
        width={27}
        height={19}
        className="h-[13.7px] w-[19.5px] object-contain md:h-auto md:w-[60%]"
      />
    </div>
  );
}

/* Card layout: 12px between headline / body / media / footer; p-18; rounded-24; type per Figma; media aspect 510/213 | 510/201 */
const mediaAspectClass: Record<NonNullable<Project["mediaAspect"]>, string> = {
  tall: "aspect-[510/213]",
  short: "aspect-[510/201]",
};

/** Figma media corner ~7.32px — shared by gradient + video for consistent corners */
const MEDIA_CORNER = "overflow-hidden rounded-[7.32px]";

function mediaVideoCropStyle(pixels: number | undefined): CSSProperties | undefined {
  if (pixels == null || pixels <= 0) return undefined;
  return {
    clipPath: `inset(0 0 ${pixels}px 0)`,
    WebkitClipPath: `inset(0 0 ${pixels}px 0)`,
    marginBottom: -pixels,
  };
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const aspect =
    project.mediaAspect != null
      ? mediaAspectClass[project.mediaAspect]
      : "aspect-[510/201]";

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
        relative flex w-full max-w-[333px] flex-col gap-3
        md:max-w-[546px]
        font-system
        [transform:translateZ(0)]
        overflow-hidden
        bg-[rgba(58,58,58,0.36)]
        rounded-[18px] md:rounded-[24px]
        p-[18px] md:p-[18px]
        border border-[rgba(255,255,255,0.04)]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.34)]
        md:border-0 md:shadow-[4px_4px_4px_0px_rgba(0,0,0,0.1)]
      `}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[rgba(255,255,255,0.04)] via-[rgba(255,255,255,0.015)] to-[rgba(255,255,255,0)]"
      />

      {/* Headline — Figma 129:8307: 46px row, Content Badge Case 44×46, 42px icon, gap-8, Company 42h gap-2 pt-2, nowrap; md+ matches 546 card */}
      <div className="relative z-10 flex w-full min-h-10 items-center md:min-h-[46px]">
        <div className="flex w-full min-h-0 shrink-0 items-start gap-2">
          <div className="box-border flex h-10 w-10 shrink-0 items-center justify-center py-0.5 pr-0.5 md:h-[46px] md:w-[44px]">
            <ProjectIcon project={project} />
          </div>
          {/* Company — Figma 129:8220: 16/19 line-height, gap-2, pt-2; mobile scales ~12.2/14.5 */}
          <div className="flex min-w-0 flex-col items-start gap-0.5 pt-0.5 not-italic text-white md:h-[42px] md:pt-0.5 md:text-base">
            <p className="m-0 min-w-0 text-[12.2px] font-semibold leading-[14.5px] md:whitespace-nowrap md:text-base md:leading-[19px]">
              {project.name}
            </p>
            <p className="m-0 min-w-0 text-[12.2px] font-normal leading-[14.5px] md:whitespace-nowrap md:text-base md:leading-[19px]">
              {project.handle}
            </p>
          </div>
        </div>
      </div>

      {/* Body copy — Figma 129:8224: Regular 16px; 510×95 ⇒ 5 lines @ 19px line-height (19/16) */}
      <div className="relative z-10 flex w-full min-w-0 flex-1 flex-col gap-3">
        <p className="w-full not-italic text-[14.64px] font-normal leading-[17.4px] text-white md:text-base md:leading-[19px]">
          {project.description}
        </p>
        {project.mediaVideoSrc != null && project.mediaVideoSrc !== "" ? (
          <div
            className={`w-full shrink-0 bg-[#141414] leading-none ${MEDIA_CORNER}`}
          >
            <video
              className={`block h-auto w-full max-w-full align-top [transform:translateZ(0)] ${MEDIA_CORNER} bg-[#141414]`}
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
        ) : (
          <div
            className={`w-full shrink-0 bg-gradient-to-b from-[#4f4f4f] to-[#141414] ${MEDIA_CORNER} ${aspect}`}
          />
        )}
      </div>

      {/* Footer — Figma 129:8230: gap-4, pl-2 */}
      <div className="relative z-10 flex min-h-[19px] w-full items-center gap-1 pl-0.5 text-[12.2px] leading-normal text-white md:text-base">
        <span className="text-[12.2px] font-normal text-white leading-normal md:text-base">
          {project.time}
        </span>
        <span className="text-[9.15px] font-normal text-white leading-normal md:text-base">
          •
        </span>
        <span className="text-[12.2px] font-normal text-white leading-normal md:text-base">
          {project.date}
        </span>
      </div>
    </motion.div>
  );
}
