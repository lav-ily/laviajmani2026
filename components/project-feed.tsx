"use client";

import { projects } from "@/lib/projects";
import { ProjectCard } from "./project-card";

export function ProjectFeed() {
  return (
    <div className="flex flex-col items-center gap-[27px] md:gap-5 w-full">
      {projects.map((project, index) => (
        <ProjectCard key={project.handle} project={project} index={index} />
      ))}
    </div>
  );
}
