"use client";

import { TextEntry } from "@/components/text-entry";
import { ABOUT } from "@/lib/about-content";

type IntroPanelProps = {
  /** Play the blur-in entry; only on the first landing view, not when returning from a page. */
  animateEntry?: boolean;
  onEntryComplete?: () => void;
};

/** Figma `78:195` / `78:196` — intro column; same layout in every homepage state. */
export function IntroPanel({ animateEntry = false, onEntryComplete }: IntroPanelProps) {
  return (
    <aside className="flex-1 bg-white max-md:w-full max-md:flex-none split:min-w-0 split:min-h-svh">
      <div className="px-6 pt-16 pb-12 max-md:py-6 split:pt-[121px] split:pb-0 split:pl-[var(--intro-pad-left)]">
        <TextEntry
          animate={animateEntry}
          onComplete={onEntryComplete}
          className="flex w-full max-w-[354px] flex-col gap-[18px] font-body leading-normal text-black max-md:gap-3"
        >
          <div className="flex w-full flex-col text-[20px]">
            <h1 className="w-full font-semibold">{ABOUT.name}</h1>
            <p className="w-full font-light">{ABOUT.location}</p>
          </div>
          <div className="flex w-full flex-col gap-3 text-[16px] text-balance max-md:text-wrap">
            {ABOUT.paragraphs.map((paragraph) => (
              <p key={paragraph} className="w-full">
                {paragraph}
              </p>
            ))}
          </div>
        </TextEntry>
      </div>
    </aside>
  );
}
