"use client";

import { animate, motion, useMotionValue, type MotionValue } from "framer-motion";
import { useCallback, useRef, useState } from "react";

import { InstaxPhoto } from "./instax-photo";

/** Figma `681:958` — overlapping instax pair below About copy under 800px. */
const MOBILE_SCALE = 0.75;
const MOBILE_CARD_WIDTH = 316 * MOBILE_SCALE;
const CARD_WRAP = { width: 388 * MOBILE_SCALE, height: 492 * MOBILE_SCALE };
const STACK = { width: 483 * MOBILE_SCALE, height: 502 * MOBILE_SCALE };
const LEFT_HOME = 0;
const RIGHT_HOME = 88 * MOBILE_SCALE;
const TUCK_X = -96 * MOBILE_SCALE;
const SWIPE_THRESHOLD = 56;

const EASE_OUT = [0.4, 0, 0.2, 1] as const;
const EASE_IN_OUT = [0.22, 1, 0.36, 1] as const;

type StackPhoto = {
  src: string;
  alt: string;
  caption: string;
  captionWidth?: number;
  captionClassName?: string;
  balanceCaption?: boolean;
};

export function MobileInstaxStack({ photos }: { photos: [StackPhoto, StackPhoto] }) {
  const [frontId, setFrontId] = useState<0 | 1>(0);
  const [phase, setPhase] = useState<"idle" | "tucking" | "travel">("idle");
  const positions = [useMotionValue(LEFT_HOME), useMotionValue(RIGHT_HOME)] as [
    MotionValue<number>,
    MotionValue<number>,
  ];
  const dragged = useRef(false);
  const shufflingRef = useRef(false);

  const shuffle = useCallback(async () => {
    if (shufflingRef.current) return;

    shufflingRef.current = true;
    const outgoing = frontId;
    const incoming = (1 - frontId) as 0 | 1;

    setPhase("tucking");
    await animate(positions[outgoing], LEFT_HOME + TUCK_X, {
      duration: 0.38,
      ease: EASE_OUT,
    });

    setFrontId(incoming);
    setPhase("travel");

    await Promise.all([
      animate(positions[outgoing], RIGHT_HOME, {
        duration: 0.58,
        ease: EASE_IN_OUT,
      }),
      animate(positions[incoming], LEFT_HOME, {
        duration: 0.58,
        ease: EASE_IN_OUT,
      }),
    ]);

    setPhase("idle");
    shufflingRef.current = false;
  }, [frontId, positions]);

  const handleFrontClick = () => {
    if (dragged.current) {
      dragged.current = false;
      return;
    }

    void shuffle();
  };

  const handleFrontDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } },
  ) => {
    dragged.current = info.offset.x < -8;

    if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -400) {
      void shuffle();
      return;
    }

    void animate(positions[frontId], LEFT_HOME, {
      duration: 0.35,
      ease: EASE_IN_OUT,
    });
  };

  return (
    <div
      className="relative mx-auto mt-8 w-full max-w-[362px]"
      style={{ height: STACK.height }}
    >
      {photos.map((photo, id) => {
        const cardId = id as 0 | 1;
        const isFront = cardId === frontId;
        const zIndex =
          phase === "tucking"
            ? isFront
              ? 0
              : 20
            : phase === "travel"
              ? isFront
                ? 20
                : 10
              : isFront
                ? 20
                : 10;

        const sharedProps = {
          type: "button" as const,
          "aria-label": "Show next photo",
          disabled: phase !== "idle",
          onClick: isFront ? handleFrontClick : () => void shuffle(),
          className: `${
            isFront
              ? "cursor-grab touch-pan-y active:cursor-grabbing"
              : "cursor-pointer"
          } absolute top-1/2 flex -translate-y-1/2 items-center justify-center border-0 bg-transparent p-0 disabled:cursor-default`,
          style: {
            x: positions[cardId],
            width: CARD_WRAP.width,
            height: CARD_WRAP.height,
            zIndex,
          },
        };

        if (isFront) {
          return (
            <motion.button
              key={cardId}
              {...sharedProps}
              drag={phase === "idle" ? "x" : false}
              dragConstraints={{ left: TUCK_X, right: 0 }}
              dragElastic={{ left: 0.05, right: 0 }}
              dragMomentum={false}
              onDragStart={() => {
                dragged.current = false;
              }}
              onDrag={(_, info) => {
                if (info.offset.x < -8) dragged.current = true;
              }}
              onDragEnd={handleFrontDragEnd}
            >
              <InstaxPhoto {...photo} rotate={-10} width={MOBILE_CARD_WIDTH} />
            </motion.button>
          );
        }

        return (
          <motion.button key={cardId} {...sharedProps}>
            <InstaxPhoto {...photo} rotate={10} width={MOBILE_CARD_WIDTH} />
          </motion.button>
        );
      })}
    </div>
  );
}
