import { Hero } from "@/components/hero";
import { NavButtons } from "@/components/nav-buttons";
import { ProjectFeed } from "@/components/project-feed";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#141414]">
      <div className="mx-auto px-4 md:px-9 py-4 md:py-9 flex flex-col items-center gap-5 md:gap-7">
        {/* Headline + Navigation */}
        <header className="flex flex-col items-center w-full">
          <Hero />
          <NavButtons />
        </header>

        {/* Project Feed */}
        <main className="w-full flex flex-col items-center">
          <ProjectFeed />
        </main>
      </div>
    </div>
  );
}
