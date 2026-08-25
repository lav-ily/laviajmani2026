"use client";

import { useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const CONTROL_INSET = "top-3 right-3";

const CONTROL_BTN =
  "rounded-[5px] px-2 py-1 font-[family-name:var(--font-geist-mono)] text-[12px] font-normal leading-normal text-[#797979] transition-colors duration-200 ease-out hover:text-[#565656] bg-[rgba(228,228,228,0.72)] backdrop-blur-[16px] backdrop-saturate-150 [-webkit-backdrop-filter:blur(16px)_saturate(150%)] hover:bg-[rgba(228,228,228,0.88)]";

export function WorkVideo({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { amount: 0.35 });
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView && !userPaused) {
      void video.play().catch(() => {});
    } else if (!isInView) {
      video.pause();
    }
  }, [isInView, userPaused]);

  const pause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    setUserPaused(true);
  }, []);

  const restart = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    setUserPaused(false);

    if (isInView) {
      void video.play().catch(() => {});
    }
  }, [isInView]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-clip rounded-[6px]">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="size-full rounded-[6px] object-cover"
      />

      <div
        className={`absolute ${CONTROL_INSET} z-10 flex items-center gap-1.5`}
        onPointerDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            pause();
          }}
          aria-label="Pause video"
          className={CONTROL_BTN}
        >
          Pause
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            restart();
          }}
          aria-label="Restart video"
          className={CONTROL_BTN}
        >
          Restart
        </button>
      </div>
    </div>
  );
}
