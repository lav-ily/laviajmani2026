"use client";

import { TextEntry } from "@/components/text-entry";
import type { CaseStudy } from "@/lib/case-studies/types";

type CaseStudyIntroPanelProps = {
  study: CaseStudy;
  onClose: () => void;
};

/** Figma `78:96` / `78:97` — case study intro; 316px copy block. */
export function CaseStudyIntroPanel({ study, onClose }: CaseStudyIntroPanelProps) {
  const paragraphs = typeof study.body === "string" ? [study.body] : study.body;

  return (
    <aside className="flex-1 bg-white max-md:flex-none split:min-w-0 split:min-h-svh">
      <div className="px-6 pt-16 pb-12 max-md:px-[26px] max-md:py-6 split:px-0 split:pt-[121px] split:pb-0 split:pl-[var(--intro-pad-left)]">
        <TextEntry
          className={`flex w-full flex-col gap-[18px] font-body leading-normal text-black max-md:gap-3 ${
            typeof study.body === "string" ? "max-w-[316px]" : "max-w-[354px]"
          }`}
        >
          <div className="flex w-full flex-col text-[20px] whitespace-nowrap">
            <h1 className="font-semibold">{study.title}</h1>
            <p className="font-light">{study.location}</p>
          </div>
          <div
            className={`flex w-full flex-col gap-3 text-[16px] ${
              typeof study.body === "string" ? "" : "text-balance"
            }`}
          >
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="w-full">
                {paragraph}
              </p>
            ))}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-fit text-[16px] text-[var(--color-nav-label)] underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e1e1e]"
          >
            Back to grid
          </button>
        </TextEntry>
      </div>
    </aside>
  );
}
