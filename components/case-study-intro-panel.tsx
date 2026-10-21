"use client";

import type { ReactNode } from "react";

import { TextEntry } from "@/components/text-entry";
import { TextLink } from "@/components/text-link";
import type { CaseStudy } from "@/lib/case-studies/types";

type CaseStudyIntroPanelProps = {
  study: CaseStudy;
  onClose: () => void;
};

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function withLinks(paragraph: string, links: CaseStudy["bodyLinks"]): ReactNode {
  const phrases = links ? Object.keys(links) : [];
  if (phrases.length === 0) return paragraph;
  const pattern = new RegExp(`\\b(${phrases.map(escapeRegExp).join("|")})\\b`);
  return paragraph.split(pattern).map((part, index) => {
    const href = index % 2 === 1 ? links?.[part] : undefined;
    if (!href) return part;
    const external = href.startsWith("http");
    return (
      <TextLink
        key={index}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {part}
      </TextLink>
    );
  });
}

/** Figma `78:96` / `78:97` — case study intro; 316px copy block. */
export function CaseStudyIntroPanel({ study, onClose }: CaseStudyIntroPanelProps) {
  const paragraphs = typeof study.body === "string" ? [study.body] : study.body;

  return (
    <aside className="flex-1 bg-white max-md:w-full max-md:flex-none split:min-w-0 split:min-h-svh">
      <div className="px-6 pt-16 pb-12 max-md:py-6 split:pt-[121px] split:pb-0 split:pl-[var(--intro-pad-left)]">
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
                {withLinks(paragraph, study.bodyLinks)}
              </p>
            ))}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Back to grid"
            className="flex w-fit items-center justify-center bg-black p-[10px] text-[16px] leading-normal whitespace-nowrap text-white transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e1e1e]"
          >
            Back
          </button>
        </TextEntry>
      </div>
    </aside>
  );
}
