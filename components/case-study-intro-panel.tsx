"use client";

import { BrushReveal } from "@/components/brush-reveal";
import { useGridLayout } from "@/components/grid-layout-context";
import type { CaseStudy } from "@/lib/case-studies/types";
import { textBrushSchedule } from "@/lib/kelly-grid-motion";

type CaseStudyIntroPanelProps = {
  study: CaseStudy;
  /** Grid cell the open transition ripples from; the copy brushes on in step with it. */
  originIndex: number;
  onClose: () => void;
};

/** Figma `78:96` / `78:97` — case study intro; 316px copy block. */
export function CaseStudyIntroPanel({ study, originIndex, onClose }: CaseStudyIntroPanelProps) {
  const layout = useGridLayout();
  const paragraphs = typeof study.body === "string" ? [study.body] : study.body;
  // Title, location, each paragraph, then the back link.
  const { delays, duration } = textBrushSchedule(
    layout,
    paragraphs.length + 3,
    originIndex,
    study.mediaLayout,
  );
  const stroke = (index: number) => ({ delay: delays[index], duration });

  return (
    <aside className="flex-1 bg-white split:min-w-0 split:min-h-svh">
      <div className="px-6 pt-16 pb-12 split:px-0 split:pt-[121px] split:pb-0 split:pl-[var(--intro-pad-left)]">
        <div
          className={`flex w-full flex-col gap-[18px] font-body leading-normal text-black ${
            typeof study.body === "string" ? "max-w-[316px]" : "max-w-[354px]"
          }`}
        >
          <div className="flex w-full flex-col text-[20px] whitespace-nowrap">
            <BrushReveal {...stroke(0)}>
              <h1 className="font-semibold">{study.title}</h1>
            </BrushReveal>
            <BrushReveal {...stroke(1)}>
              <p className="font-light">{study.location}</p>
            </BrushReveal>
          </div>
          <div
            className={`flex w-full flex-col gap-3 text-[16px] ${
              typeof study.body === "string" ? "" : "text-balance"
            }`}
          >
            {paragraphs.map((paragraph, index) => (
              <BrushReveal key={paragraph} {...stroke(index + 2)}>
                <p className="w-full">{paragraph}</p>
              </BrushReveal>
            ))}
          </div>
          <BrushReveal {...stroke(paragraphs.length + 2)}>
            <button
              type="button"
              onClick={onClose}
              className="w-fit text-[16px] text-[var(--color-nav-label)] underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e1e1e]"
            >
              Back to grid
            </button>
          </BrushReveal>
        </div>
      </div>
    </aside>
  );
}
