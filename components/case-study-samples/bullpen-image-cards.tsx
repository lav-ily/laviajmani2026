"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";

import { DECK_SHADOW } from "@/components/case-study-samples/sample-stage";

const MEDIA = "/media/bullpen";

function Phone({
  src,
  alt,
  width,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  className: string;
}) {
  return (
    <div
      className={`absolute overflow-hidden rounded-[10px] ${DECK_SHADOW} ${className}`}
    >
      <Image
        src={`${MEDIA}/${src}`}
        alt={alt}
        fill
        sizes={`${width}px`}
        className="object-cover"
      />
    </div>
  );
}

/** Figma `211:44391` — perps positions, cropped to the top of the screen. */
export function PerpsPositionsSample() {
  return (
    <div
      className={`absolute top-[64px] left-[166.5px] h-[224px] w-[202px] overflow-hidden rounded-[10px] ${DECK_SHADOW}`}
    >
      <div className="absolute top-0 left-0 h-[194.63%] w-full">
        <Image
          src={`${MEDIA}/perps-positions.png`}
          alt="Bullpen perps positions"
          fill
          sizes="202px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

/** Figma `211:44393` — coin chart, trending feed, and trades feed. */
export function FeedPhonesSample() {
  return (
    <>
      <Phone
        src="coin-chart.png"
        alt="Bullpen coin chart"
        width={134}
        className="top-[30px] left-[50px] h-[292px] w-[134px]"
      />
      <Phone
        src="trending.png"
        alt="Bullpen trending feed"
        width={134}
        className="top-[30px] left-[200px] h-[292px] w-[134px]"
      />
      <Phone
        src="trades.png"
        alt="Bullpen trades feed"
        width={134}
        className="top-[30px] left-[350px] h-[292px] w-[134px]"
      />
    </>
  );
}

/** Figma `211:44401` — leverage, set targets, and confirm flow. */
export function TradeFlowSample() {
  return (
    <>
      <Phone
        src="leverage.png"
        alt="Bullpen leverage at 25x"
        width={103}
        className="top-[64px] left-[42px] h-[223px] w-[103px]"
      />
      <Phone
        src="set-targets-profit.png"
        alt="Bullpen set take-profit target"
        width={103}
        className="top-[64px] left-[158px] h-[223px] w-[103px]"
      />
      <Phone
        src="set-targets-loss.png"
        alt="Bullpen set stop-loss target"
        width={103}
        className="top-[64px] left-[273px] h-[223px] w-[103px]"
      />
      <Phone
        src="confirm.png"
        alt="Bullpen confirm trade"
        width={103}
        className="top-[64px] left-[389px] h-[223px] w-[103px]"
      />
    </>
  );
}

/** Square prototype recording, centered and looping. */
export function PrototypeVideoSample() {
  const reducedMotion = useReducedMotion();
  return (
    <>
      {/* The recording's backdrop color, extended past the design frame to fill the whole card. */}
      <div aria-hidden className="absolute -inset-[400px] bg-[#f3f5f7]" />
      <video
        // The recording's bottom rows hold a dark encoding artifact.
        className="absolute top-0 left-1/2 size-[351px] -translate-x-1/2 object-cover [clip-path:inset(0_0_1%_0)]"
        src={`${MEDIA}/prototype.mp4`}
        autoPlay={!reducedMotion}
        loop
        muted
        playsInline
        controls={Boolean(reducedMotion)}
        preload="metadata"
        aria-label="Bullpen prototype"
      />
    </>
  );
}

/** Figma `211:44406` — profile. */
export function ProfileSample() {
  return (
    <Phone
      src="profile.png"
      alt="Bullpen profile"
      width={135}
      className="top-[calc(50%+0.5px)] left-[calc(50%+0.29px)] h-[292px] w-[134.077px] -translate-x-1/2 -translate-y-1/2"
    />
  );
}
