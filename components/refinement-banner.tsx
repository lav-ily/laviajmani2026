"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import { REFINEMENT_BANNER_DISMISS_EVENT } from "@/lib/refinement-banner";

const MESSAGE =
  "This website is still being refined. Check back in a few days for the full experience!";

export function RefinementBanner() {
  const [visible, setVisible] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    setVisible(true);

    const onScroll = () => {
      if (window.scrollY > 8) dismiss();
    };

    const onNavInteract = () => dismiss();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(REFINEMENT_BANNER_DISMISS_EVENT, onNavInteract);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(REFINEMENT_BANNER_DISMISS_EVENT, onNavInteract);
    };
  }, [dismiss]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-[110] flex justify-center px-4 pt-[max(0.75rem,env(safe-area-inset-top,0px))]"
        >
          <div className="relative flex w-full max-w-[1280px] items-center justify-center rounded-[6px] bg-[#e4e4e4] px-[14px] py-3">
            <p className="m-0 px-12 text-center text-pretty font-[family-name:var(--font-geist-mono)] text-[12px] font-normal leading-normal text-[#565656]">
              {MESSAGE}
            </p>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss notice"
              className="absolute right-[14px] top-1/2 shrink-0 -translate-y-1/2 rounded-[5px] px-1 py-0.5 font-[family-name:var(--font-geist-mono)] text-[12px] font-normal leading-normal text-[#797979] transition-colors duration-200 ease-out hover:bg-[rgba(0,0,0,0.06)] hover:text-[#565656]"
            >
              Close
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
