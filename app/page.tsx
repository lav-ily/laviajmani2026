import { Hero } from "@/components/hero";
import { NavButtons } from "@/components/nav-buttons";
import { ProjectFeed } from "@/components/project-feed";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#141414]">
      <div className="mx-auto pt-[70px] pb-[30px] md:py-9 flex flex-col items-center gap-[27px] md:gap-7">
        {/* Headline + Navigation */}
        <header className="flex flex-col items-center w-[calc(100%-60px)] max-w-[333px] md:w-full md:max-w-[543px]">
          <Hero />
          <NavButtons />
        </header>

        {/* Project Feed */}
        <main className="w-[calc(100%-60px)] max-w-[333px] md:w-full md:max-w-none flex flex-col items-center">
          <ProjectFeed />
        </main>
      </div>
    </div>
  );
}
