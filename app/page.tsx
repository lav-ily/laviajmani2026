import { BottomNav } from "@/components/bottom-nav";
import { Hero } from "@/components/hero";
import { ProjectFeed } from "@/components/project-feed";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#141414] pb-[150px] md:pb-[160px]">
      <div className="mx-auto flex flex-col items-center gap-[27px] px-[30px] pt-[70px] md:gap-7 md:px-9 md:py-9 md:pt-9">
        <header className="flex w-[calc(100%-60px)] max-w-[333px] flex-col items-center md:max-w-[546px] md:w-full">
          <Hero />
        </header>

        <main className="flex w-[calc(100%-60px)] max-w-[333px] flex-col items-center md:max-w-[546px] md:w-full">
          <ProjectFeed />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
