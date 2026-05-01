import Image from "next/image";

import { experienceLinesForMobile, HERO } from "@/lib/hero-content";

const geist = "font-[family:var(--font-geist-sans),sans-serif] font-light";

export function Hero() {
  const [experienceLine1, experienceLine2] = experienceLinesForMobile(HERO.experience);

  return (
    <div className="flex w-full max-w-[333px] flex-col items-center">
      {/* md+ — same copy as mobile, layout/typography via responsive classes */}
      <div className="hidden flex-col items-center md:flex">
        <div className="flex items-baseline text-white leading-[1.01] md:leading-[0.85]">
          <span className="font-serif-display text-[27px] md:text-[34px] lg:text-[44.836px] tracking-[-0.82px] md:tracking-[-1px] lg:tracking-[-1.35px]">
            {HERO.name}{" "}
          </span>
          <span className="font-sf-pro-display font-light text-[22.9px] md:text-[28px] lg:text-[37.567px] tracking-[-1.83px] md:tracking-[-2.25px] lg:tracking-[-3px] lg:ml-[2px]">
            {HERO.isA} {HERO.productDesigner}
          </span>
          <span className="font-sf-pro-display font-light text-[22.9px] md:text-[28px] lg:text-[37.567px] tracking-[-1.83px] md:tracking-[-2.25px] lg:tracking-[-3px] ml-1">
            {HERO.symbol}
          </span>
        </div>

        <div className="mt-[2px] flex items-center text-white leading-[1.01] md:mt-[0.5px] md:leading-[0.85] lg:mt-[1px]">
          <span className="font-sf-pro-display font-light text-[22.9px] md:text-[28px] lg:text-[37.567px] tracking-[-1.83px] md:tracking-[-2.25px] lg:tracking-[-3px] whitespace-nowrap">
            {HERO.experience}
          </span>
        </div>

        <div className="mt-[2px] flex items-center text-white leading-[1.01] md:mt-[0.5px] md:leading-[0.85] lg:mt-[1px]">
          <span className="font-sf-pro-display font-light text-[22.9px] md:text-[28px] lg:text-[37.567px] tracking-[-1.83px] md:tracking-[-2.25px] lg:tracking-[-3px]">
            {HERO.in}
          </span>
          <Image
            src="/icons/apple.svg"
            alt=""
            width={33}
            height={33}
            className="mx-1 w-[20px] h-[20px] md:w-[24px] md:h-[24px] lg:w-[33px] lg:h-[33px]"
          />
          <span className="font-serif-display whitespace-nowrap text-[27.3px] md:text-[34px] lg:text-[44.838px] tracking-[-0.82px] md:tracking-[-1px] lg:tracking-[-1.35px]">
            {HERO.city}
          </span>
        </div>
      </div>

      <div className="flex w-full max-w-[333px] flex-col items-center text-center text-white md:hidden">
        {/* flex-nowrap: avoids line-break jump when web fonts swap in (widths match sooner via next/font). */}
        <div className="flex w-full max-w-full flex-nowrap items-baseline justify-center gap-x-0.5 leading-none">
          <span className="font-serif-display text-[40px] not-italic tracking-[-1.2px]">
            {HERO.name}
          </span>
          <span className={`${geist} shrink-0 text-[36px] leading-none tracking-[-2.88px]`}>
            {HERO.isA}
          </span>
        </div>
        <div
          className={`mt-0 flex flex-nowrap items-center justify-center gap-x-0.5 leading-none ${geist} text-[36px] tracking-[-2.88px]`}
        >
          <span>{HERO.productDesigner}</span>
          <span>{HERO.symbol}</span>
        </div>
        <p className={`m-0 mt-0 ${geist} text-[36px] leading-none tracking-[-2.88px]`}>
          {experienceLine1}
        </p>
        {experienceLine2 !== "" ? (
          <p className={`m-0 -mt-0.5 ${geist} text-[36px] leading-none tracking-[-2.88px]`}>
            {experienceLine2}
          </p>
        ) : null}
        <div className="mt-0 flex flex-nowrap items-center justify-center gap-x-0 text-[36px]">
          <span className={`${geist} leading-none tracking-[-2.88px]`}>{HERO.in}</span>
          <Image
            src="/icons/apple.svg"
            alt=""
            width={32}
            height={32}
            className="size-[31.45px] shrink-0"
          />
          <span className="font-serif-display text-[40px] not-italic leading-none tracking-[-1.2px]">
            {HERO.city}
          </span>
        </div>
      </div>
    </div>
  );
}
