"use client";

import { projects } from "@/lib/projects";
import { ProjectCard } from "./project-card";

export function ProjectFeed() {
  return (
    <div className="flex w-full flex-col items-center gap-4 md:gap-7">
      {projects.map((project, index) => (
        <ProjectCard key={project.handle} project={project} index={index} />
      ))}
    </div>
  );
}
