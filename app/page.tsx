import { BottomNav } from "@/components/bottom-nav";
import { Hero } from "@/components/hero";
import { ProjectFeed } from "@/components/project-feed";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#141414]">
      <div className="mx-auto flex max-w-full flex-col items-center gap-5 px-[30px] pb-[var(--page-pad-below-content)] pt-6 max-md:gap-5 md:max-w-[unset] md:gap-7 md:px-9 md:py-9 md:pt-9">
        <header className="flex w-full max-w-[333px] flex-col items-center md:max-w-[546px]">
          <Hero />
        </header>

        <main className="flex w-full max-w-[361px] flex-col items-center md:max-w-[546px]">
          <ProjectFeed />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
