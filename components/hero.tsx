import Image from "next/image";

export function Hero() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center">
        {/* Line 1: "Lavi Ajmani is a product designer ❋" */}
        <div className="flex items-baseline text-white leading-[1.01] md:leading-[0.85]">
          <span className="font-serif-display text-[27px] md:text-[34px] lg:text-[44.836px] tracking-[-0.82px] md:tracking-[-1px] lg:tracking-[-1.35px]">
            Lavi Ajmani{" "}
          </span>
          <span className="font-sans font-light text-[22.9px] md:text-[28px] lg:text-[37.567px] tracking-[-1.83px] md:tracking-[-2.25px] lg:tracking-[-3px] lg:ml-[2px]">
            is a product designer
          </span>
          <span className="font-sans font-light text-[22.9px] md:text-[28px] lg:text-[37.567px] tracking-[-1.83px] md:tracking-[-2.25px] lg:tracking-[-3px] ml-1">
            ❋
          </span>
        </div>

        {/* Line 2: "tinkering on web & mobile experiences" */}
        <div className="flex items-center text-white leading-[1.01] md:leading-[0.85] mt-[2px] md:mt-[0.5px] lg:mt-[1px]">
          <span className="font-sans font-light text-[22.9px] md:text-[28px] lg:text-[37.567px] tracking-[-1.83px] md:tracking-[-2.25px] lg:tracking-[-3px] whitespace-nowrap">
            tinkering on web &amp; mobile experiences
          </span>
        </div>

        {/* Line 3: "in 🍏 New York City —" */}
        <div className="flex items-center text-white leading-[1.01] md:leading-[0.85] mt-[2px] md:mt-[0.5px] lg:mt-[1px]">
          <span className="font-sans font-light text-[22.9px] md:text-[28px] lg:text-[37.567px] tracking-[-1.83px] md:tracking-[-2.25px] lg:tracking-[-3px]">
            in
          </span>
          <Image
            src="/icons/apple.svg"
            alt=""
            width={33}
            height={33}
            className="mx-1 w-[20px] h-[20px] md:w-[24px] md:h-[24px] lg:w-[33px] lg:h-[33px]"
          />
          <span className="font-serif-display text-[27.3px] md:text-[34px] lg:text-[44.838px] tracking-[-0.82px] md:tracking-[-1px] lg:tracking-[-1.35px] whitespace-nowrap">
            New York City —
          </span>
        </div>
      </div>
    </div>
  );
}
