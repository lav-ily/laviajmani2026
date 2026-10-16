"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Figma `197:11901` — every bento sample card is authored at 534.5×351. */
export const SAMPLE_CARD_WIDTH_PX = 534.5;
export const SAMPLE_CARD_HEIGHT_PX = 351;

/**
 * Lays a sample out at its design size, vertically centered in its bento block and scaled to the
 * block's width. Taller blocks reveal more of the artwork that overflows the design frame.
 */
export function SampleStage({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new ResizeObserver(([entry]) => {
      host.style.setProperty(
        "--sample-scale",
        String(entry.contentRect.width / SAMPLE_CARD_WIDTH_PX),
      );
    });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0 overflow-hidden bg-[#f9f9f9]">
      <div
        className="absolute top-1/2 left-0 origin-left"
        style={{
          width: SAMPLE_CARD_WIDTH_PX,
          height: SAMPLE_CARD_HEIGHT_PX,
          marginTop: -SAMPLE_CARD_HEIGHT_PX / 2,
          transform: "scale(var(--sample-scale, 1))",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Figma-exported vector, rendered as authored inside a box sized to its root dimensions. */
export function SampleSvg({ src, className = "" }: { src: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- Figma-exported vectors render as authored
    <img src={src} alt="" className={`absolute inset-0 block size-full max-w-none ${className}`} />
  );
}

/** Figma avatar swirl: a rotated vector sized from its avatar container. */
export function AvatarSwirl({ src }: { src: string }) {
  return (
    <div
      className="absolute inset-[-49.94%_-71.58%_-56.8%_-42.86%] flex items-center justify-center"
      style={{ containerType: "size" }}
    >
      <div className="h-[hypot(98.1996cqw,-1.93966cqh)] w-[hypot(-1.80043cqw,-98.0603cqh)] flex-none rotate-[-91.09deg]">
        <div className="relative size-full">
          <div className="absolute inset-[-2.76%_-4.6%_-4.44%_-3.26%]">
            <SampleSvg src={src} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Figma "Deck Shadow 1". */
export const DECK_SHADOW =
  "shadow-[-3.548px_-3.548px_53.214px_0px_rgba(140,140,140,0.25),3.548px_3.548px_53.214px_0px_rgba(140,140,140,0.25)]";
