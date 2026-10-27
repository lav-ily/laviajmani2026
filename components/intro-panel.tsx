"use client";

import { TextEntry, TextEntryItem } from "@/components/text-entry";
import { ABOUT } from "@/lib/about-content";

/** Figma `78:195` / `78:196` — intro column; same layout in every homepage state. Slides in on every mount. */
export function IntroPanel() {
  return (
    <aside className="flex-1 bg-white max-md:w-full max-md:flex-none split:min-w-0 split:min-h-svh">
      <div className="px-6 pt-16 pb-12 max-md:py-6 split:pt-[121px] split:pb-0 split:pl-[var(--intro-pad-left)]">
        <TextEntry className="flex w-full max-w-[354px] flex-col gap-[18px] font-body leading-normal text-black max-md:gap-3">
          <TextEntryItem className="flex w-full flex-col text-[20px]">
            <h1 className="w-full font-semibold">{ABOUT.name}</h1>
            <p className="w-full font-light">{ABOUT.location}</p>
          </TextEntryItem>
          <div className="flex w-full flex-col gap-3 text-[16px] text-balance max-md:text-wrap">
            {ABOUT.paragraphs.map((paragraph) => (
              <TextEntryItem key={paragraph} className="w-full">
                <p>{paragraph}</p>
              </TextEntryItem>
            ))}
          </div>
        </TextEntry>
      </div>
    </aside>
  );
}
