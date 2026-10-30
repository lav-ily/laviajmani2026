"use client";

import { TextEntry, TextEntryItem, type TextEntryFrom } from "@/components/text-entry";
import { withLinks } from "@/components/text-link";
import type { CaseStudy } from "@/lib/case-studies/types";

type CaseStudyIntroPanelProps = {
  study: CaseStudy;
  entryFrom?: TextEntryFrom;
};

/** Figma `78:96` / `78:97` — case study intro; 316px copy block. */
export function CaseStudyIntroPanel({ study, entryFrom }: CaseStudyIntroPanelProps) {
  const paragraphs = typeof study.body === "string" ? [study.body] : study.body;

  return (
    <aside className="flex-1 bg-white max-md:w-full max-md:flex-none split:h-full split:min-w-0 split:overflow-x-hidden split:overflow-y-auto split:overscroll-contain">
      <div className="px-6 pt-16 pb-12 max-md:py-6 split:pt-[121px] split:pb-[60.5px] split:pl-[var(--intro-pad-left)]">
        <TextEntry
          from={entryFrom}
          className={`flex w-full flex-col gap-[18px] font-body leading-normal text-black max-md:gap-3 ${
            typeof study.body === "string" ? "max-w-[316px]" : "max-w-[354px]"
          }`}
        >
          <TextEntryItem className="flex w-full flex-col text-[20px] whitespace-nowrap">
            <h1 className="font-semibold">{study.title}</h1>
            <p className="font-light">{study.location}</p>
          </TextEntryItem>
          <div
            className={`flex w-full flex-col gap-3 text-[16px] ${
              typeof study.body === "string" ? "" : "text-balance"
            }`}
          >
            {paragraphs.map((paragraph) => (
              <TextEntryItem key={paragraph} className="w-full">
                <p>{withLinks(paragraph, study.bodyLinks)}</p>
              </TextEntryItem>
            ))}
          </div>
        </TextEntry>
      </div>
    </aside>
  );
}
