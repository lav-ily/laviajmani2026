import { About } from "@/components/about";
import { ANote } from "@/components/a-note";
import { BottomNav } from "@/components/bottom-nav";
import { Hero } from "@/components/hero";
import { Research } from "@/components/research";
import { WorkGallery } from "@/components/work-gallery";

/** Figma `625:15508` — 174px vertical rhythm between major sections on desktop. */
const SECTION_GAP = "gap-20 md:gap-[174px]";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f9faff] text-[#1e1e1e]">
      <div className={`mx-auto flex w-full flex-col ${SECTION_GAP}`}>
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center md:px-0">
          <Hero />
          <About />
          <div className={`flex w-full flex-col items-center ${SECTION_GAP}`}>
            <WorkGallery />
            <Research />
          </div>
        </div>
        <ANote />
      </div>
      <BottomNav />
    </div>
  );
}
