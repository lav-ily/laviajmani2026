"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { NavId } from "@/components/bottom-nav";
import { TextEntry } from "@/components/text-entry";

const ITEMS: ReadonlyArray<{ id: NavId; label: string }> = [
  { id: "case-studies", label: "Case Studies" },
  { id: "research", label: "Research" },
  { id: "about", label: "About" },
];

const OVERLAY_FADE_S = 0.2;

const ICON_BUTTON =
  "absolute top-2 right-4 size-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e1e1e]";

type MobileMenuProps = {
  current: NavId;
  onSelect: (id: NavId) => void;
};

/** Figma `220:12774` — mobile header; the menu icon opens a full-screen nav in place of the bottom pill. */
export function MobileMenu({ current, onSelect }: MobileMenuProps) {
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="relative mt-3 h-10 shrink-0 md:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        className={ICON_BUTTON}
        onClick={() => setOpen(true)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG icon */}
        <img src="/images/mobile-cards/menu.svg" alt="" className="block size-full" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : OVERLAY_FADE_S, ease: "easeOut" }}
          >
            <div className="relative mt-3 h-10">
              <button
                type="button"
                aria-label="Close menu"
                autoFocus
                className={ICON_BUTTON}
                onClick={() => setOpen(false)}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden className="block size-full">
                  <path
                    d="M6.5 6.5L17.5 17.5M17.5 6.5L6.5 17.5"
                    stroke="#141414"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </button>
            </div>
            <TextEntry className="flex flex-col items-start gap-3 px-[26px] pt-6 font-body text-[20px] leading-normal text-black">
              {ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-current={item.id === current ? "page" : undefined}
                  className={`focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e1e1e] ${
                    item.id === current ? "font-semibold" : "font-light"
                  }`}
                  onClick={() => {
                    setOpen(false);
                    onSelect(item.id);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </TextEntry>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
