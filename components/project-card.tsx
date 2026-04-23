"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
      <div className={`${size} rounded-full overflow-hidden`}>
        <Image
          src={project.iconSrc}
          alt={`${project.name} logo`}
          width={42}
          height={42}
          className="w-full h-full"
        />
      </div>
    );
  }

  if (project.iconClip) {
    return (
      <div
        className={`${size} rounded-full overflow-hidden flex items-center justify-center`}
        style={{ backgroundColor: project.iconBg }}
      >
        <div className={`${glyphSize} relative overflow-hidden`}>
          <Image
            src={project.iconSrc}
            alt={`${project.name} logo`}
            width={103}
            height={27}
            className="absolute top-0 left-0 max-w-none"
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
        className={`${size} rounded-full flex items-center justify-center overflow-hidden`}
        style={{ backgroundColor: project.iconBg }}
      >
        <div className={glyphSize}>
          <Image
            src={project.iconSrc}
            alt={`${project.name} logo`}
            width={25}
            height={25}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${size} rounded-full flex items-center justify-center overflow-hidden`}
      style={{ backgroundColor: project.iconBg }}
    >
      <Image
        src={project.iconSrc}
        alt={`${project.name} logo`}
        width={27}
        height={19}
        className="w-[19.5px] h-[13.7px] md:w-[60%] md:h-auto object-contain"
      />
    </div>
  );
}

export function ProjectCard({ project, index }: ProjectCardProps) {
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
      className="
        relative overflow-hidden
        font-system
        w-full max-w-[333px] md:max-w-[546px]
        backdrop-blur-[1.22px] md:backdrop-blur-[2px] bg-[rgba(58,58,58,0.36)]
        border border-[rgba(255,255,255,0.04)]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_30px_rgba(0,0,0,0.34)]
        rounded-[18px]
        p-[19.5px] md:p-4
        flex flex-col gap-[12.2px] md:gap-3
      "
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-[rgba(255,255,255,0.04)] via-[rgba(255,255,255,0.015)] to-[rgba(255,255,255,0)]"
      />

      {/* Header */}
      <div className="relative z-10 flex items-center">
        <div className="flex items-start gap-[4.9px] md:gap-[8px]">
          <div className="flex h-[31.7px] w-[30px] items-center py-[1.2px] pr-[1.2px] md:h-auto md:w-auto md:py-[2px] md:pr-[2px]">
            <ProjectIcon project={project} />
          </div>
          <div className="flex flex-col gap-[1.22px] md:gap-[2px] pt-[1.22px] md:pt-[2px]">
            <span className="text-white text-[12.2px] md:text-[15px] font-bold leading-[13.42px] md:leading-[18px]">
              {project.name}
            </span>
            <span className="text-white text-[12.2px] md:text-[15px] font-normal leading-[12.2px] md:leading-normal">
              {project.handle}
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="relative z-10 flex flex-col gap-[9.76px] md:gap-3 flex-1">
        <p className="text-white text-[14.64px] md:text-[17px] font-normal leading-[18.3px] md:leading-[1.18]">
          {project.description}
        </p>
        <div className="w-full h-[173.6px] md:h-auto md:aspect-[514/285] rounded-[7.32px] md:rounded-[12px] bg-gradient-to-b from-[#e5e5e5] to-[#999]" />
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center gap-[4.88px] md:gap-2 pl-[2.9px] md:pl-[5px]">
        <span className="text-white text-[12.2px] md:text-[15px] font-normal leading-normal">
          09:41 AM
        </span>
        <span className="text-white text-[9.15px] md:text-[15px] font-normal leading-normal">
          •
        </span>
        <span className="text-white text-[12.2px] md:text-[15px] font-normal leading-normal">
          {project.date}
        </span>
      </div>
    </motion.div>
  );
}
