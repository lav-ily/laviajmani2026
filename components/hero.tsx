import type { ReactNode } from "react";

import { HERO } from "@/lib/hero-content";
import { StarMark } from "./star-mark";

/** Figma `625:15509` headline type scale (desktop values with mobile ratio). */
const SERIF = "font-hero-serif text-[28px] tracking-[-0.84px] md:text-[43px] md:tracking-[-1.29px]";
const SANS = "font-hero-sans text-[24px] tracking-[-1.92px] md:text-[38px] md:tracking-[-3.04px]";

function HeroLine({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`mb-[-10px] flex h-auto items-center md:mb-[-14px] md:h-[50px] ${className}`}
    >
      {children}
    </span>
  );
}

export function Hero() {
  return (
    <header
      id="hero"
      className="flex min-h-[100svh] w-full scroll-mt-0 items-center justify-center bg-[#f9faff] px-5 md:px-0"
    >
      <h1 className="flex w-full max-w-[549px] flex-col items-center text-[#1e1e1e]">
        <HeroLine>
          <span className="flex items-center whitespace-nowrap">
            <span className="flex items-baseline gap-[4px]">
              <span className={SERIF}>{HERO.name}</span>
              <span className={SANS}>
                {HERO.isA} {HERO.productDesigner}
              </span>
            </span>
            <span className="relative ml-0 size-[28px] shrink-0 md:ml-0 md:size-[38px]">
              <StarMark className="size-full" />
            </span>
          </span>
        </HeroLine>

        <HeroLine className="justify-center">
          <span className={`${SANS} whitespace-nowrap`}>{HERO.experience}</span>
        </HeroLine>

        <HeroLine className="justify-center px-0 md:px-[14px]">
          <span className="flex items-baseline gap-[6px] whitespace-nowrap">
            <span className={SANS}>{HERO.in}</span>
            <span className={SERIF}>{HERO.city}</span>
          </span>
        </HeroLine>
      </h1>
    </header>
  );
}
