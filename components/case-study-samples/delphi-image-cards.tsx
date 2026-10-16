import Image from "next/image";

import { DECK_SHADOW } from "@/components/case-study-samples/sample-stage";

const MEDIA = "/media/delphi";

/** A screenshot placed at its Figma frame, cropped by the card. */
function Shot({
  src,
  alt,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  className: string;
}) {
  return (
    <div className={`absolute overflow-hidden ${className}`}>
      <Image src={`${MEDIA}/${src}`} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

/** Figma `211:44415` / `211:44426` — 483px desktop screenshot with its top bar trimmed. */
function BrowserShot({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div
      className={`absolute left-[calc(50%+0.25px)] w-[483px] -translate-x-1/2 -translate-y-1/2 rounded-[4px] ${DECK_SHADOW} ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[4px]">
        <div className="absolute top-[-3.65%] left-0 h-[103.65%] w-full">
          <Image src={`${MEDIA}/${src}`} alt={alt} fill sizes="483px" />
        </div>
      </div>
    </div>
  );
}

/** Figma `211:44412` — DelphiOS search criteria. */
export function SearchCriteriaSample() {
  return (
    <Shot
      src="search-criteria.jpg"
      alt="DelphiOS search with file name, date, tag, and user filters"
      sizes="723px"
      className={`top-[-154px] left-[-95px] h-[636px] w-[723px] rounded-[8px] ${DECK_SHADOW}`}
    />
  );
}

/** Figma `211:44414` — research feed. */
export function FeedSample() {
  return (
    <BrowserShot
      src="feed.png"
      alt="Delphi Digital research feed"
      className="top-[calc(50%+0.5px)] h-[302px]"
    />
  );
}

/** Figma `211:44418` — Delphi Intelligence chat. */
export function ChatHomeSample() {
  return (
    <Shot
      src="chat-home.png"
      alt="Delphi Intelligence chat: How can Delphi help?"
      sizes="697px"
      className="top-[-131px] left-[-149.5px] h-[602px] w-[697px]"
    />
  );
}

/** Figma `211:44420` — Stablecoin Decision Framework. */
export function ConsultingFrameworkSample() {
  return (
    <Shot
      src="consulting-framework.png"
      alt="Delphi Consulting Stablecoin Decision Framework"
      sizes="661px"
      className={`top-[26px] left-[26px] h-[936px] w-[661px] rounded-[4px] ${DECK_SHADOW}`}
    />
  );
}

/** Figma `211:44423` — Delphi Intelligence projects. */
export function IntelligenceProjectsSample() {
  return (
    <Shot
      src="intelligence-projects.png"
      alt="Delphi Intelligence projects"
      sizes="960px"
      className={`top-0 left-[-5px] h-[844px] w-[960px] rounded-[4px] ${DECK_SHADOW}`}
    />
  );
}

/** Figma `211:44425` — research article. */
export function ArticleSample() {
  return (
    <BrowserShot
      src="article.png"
      alt="Delphi Digital research article with a Delphi Pro upsell"
      className="top-1/2 h-[301px]"
    />
  );
}
