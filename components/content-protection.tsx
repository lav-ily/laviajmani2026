"use client";

import { useEffect } from "react";

const MEDIA = "img, video, picture";

function isMedia(target: EventTarget | null): boolean {
  return target instanceof Element && target.closest(MEDIA) !== null;
}

/**
 * Deters copying text and saving media: blocks copy/cut, and the context menu and dragging on
 * images and video. A deterrent only; screenshots and dev tools still work.
 */
export function ContentProtection() {
  useEffect(() => {
    const block = (event: Event) => event.preventDefault();
    const blockOnMedia = (event: Event) => {
      if (isMedia(event.target)) event.preventDefault();
    };

    document.addEventListener("copy", block);
    document.addEventListener("cut", block);
    document.addEventListener("contextmenu", blockOnMedia);
    document.addEventListener("dragstart", blockOnMedia);
    return () => {
      document.removeEventListener("copy", block);
      document.removeEventListener("cut", block);
      document.removeEventListener("contextmenu", blockOnMedia);
      document.removeEventListener("dragstart", blockOnMedia);
    };
  }, []);

  return null;
}
