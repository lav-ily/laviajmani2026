"use client";

import { NAV_PILL } from "@/components/bottom-nav";

const ICON_BUTTON =
  "flex h-10 shrink-0 items-center justify-center rounded-[20px] px-2 py-1.5 backdrop-blur-[15px] " +
  "transition-colors duration-200 ease-out hover:bg-[var(--color-nav-tab-active)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(0,0,0,0.25)]";

type CaseStudyNavProps = {
  title: string;
  onBack: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

function NavIcon({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static 24px SVG icon
    <img src={src} alt="" width={24} height={24} className="block size-6" />
  );
}

/** Figma `278:12612` — back to the grid, current case study, next/previous (wraps around). */
export function CaseStudyNav({ title, onBack, onNext, onPrevious }: CaseStudyNavProps) {
  return (
    <nav aria-label="Case study" className={`${NAV_PILL} z-40 w-max gap-4`}>
      <button type="button" aria-label="Back to case studies" className={ICON_BUTTON} onClick={onBack}>
        <NavIcon src="/icons/arrow-left.svg" />
      </button>
      <p
        aria-live="polite"
        className="flex h-full w-[140px] shrink-0 items-center justify-center px-4 py-1.5 font-body text-[16px] leading-normal whitespace-nowrap text-black"
      >
        {title}
      </p>
      <div className="flex shrink-0 items-center gap-1">
        <button type="button" aria-label="Next case study" className={ICON_BUTTON} onClick={onNext}>
          <NavIcon src="/icons/chevron-down-large.svg" />
        </button>
        <button
          type="button"
          aria-label="Previous case study"
          className={ICON_BUTTON}
          onClick={onPrevious}
        >
          <NavIcon src="/icons/chevron-up-large.svg" />
        </button>
      </div>
    </nav>
  );
}
