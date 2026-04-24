"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

/* Figma 129:8674 — Bottom Nav (1:1)
 * Bar: h-14 (56), rounded-44, bg rgba(255,255,255,0.19), blur-20, shadow, px-10 py-8, gap-16
 * Segments: w-[93px], px-16 py-6, blur-15. Active: rounded-38, bg white/0.2. Inactive: rounded-20, #cacaca 16px
 * Total width: 10+93+16+93+16+93+10 = 331
 *
 * On light/white content behind the bar: label colors switch for legibility.
 * Inactive items: light wash + text brighten (dark) / subtle fill + text darken (on light).
 */

const items = [
  { label: "Work", href: "#", active: true },
  {
    label: "Research",
    href: "https://32paces.tumblr.com/",
    active: false,
    external: true,
  },
  { label: "Contact", href: "mailto:lavi@laviajmani.com", active: false },
] as const;

const BAR =
  "box-border flex h-14 w-[331px] shrink-0 select-none items-stretch justify-center gap-4 " +
  "rounded-[44px] bg-[rgba(255,255,255,0.19)] px-2.5 py-2 " +
  "shadow-[4px_4px_16px_0px_rgba(33,33,33,0.16)] " +
  "backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)]";

const BTN =
  "font-system box-border flex h-full w-[93px] shrink-0 items-center justify-center overflow-hidden " +
  "px-4 py-1.5 text-center text-base font-normal not-italic leading-[normal] no-underline [font-weight:400] " +
  "whitespace-nowrap " +
  "transition-[background-color,border-radius,color,opacity] duration-200 ease-out " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-[rgba(255,255,255,0.35)]";

const BTN_ACTIVE =
  "rounded-[38px] bg-[rgba(255,255,255,0.2)] text-white " +
  "backdrop-blur-[15px] [-webkit-backdrop-filter:blur(15px)] " +
  "active:bg-[rgba(255,255,255,0.22)] visited:text-white";

const BTN_INACTIVE =
  "rounded-[20px] bg-transparent text-[#cacaca] " +
  "[-webkit-backdrop-filter:none] [backdrop-filter:none] " +
  "visited:text-[#cacaca] " +
  "hover:bg-[rgba(255,255,255,0.12)] hover:text-[rgba(255,255,255,0.95)] " +
  "active:bg-[rgba(255,255,255,0.08)]";

const BTN_ACTIVE_ON_LIGHT =
  "rounded-[38px] bg-[rgba(255,255,255,0.2)] text-[#595959] " +
  "backdrop-blur-[15px] [-webkit-backdrop-filter:blur(15px)] " +
  "active:bg-[rgba(255,255,255,0.22)] visited:text-[#595959]";

const BTN_INACTIVE_ON_LIGHT =
  "rounded-[20px] bg-transparent text-[#929292] " +
  "[-webkit-backdrop-filter:none] [backdrop-filter:none] " +
  "visited:text-[#929292] " +
  "hover:bg-[rgba(0,0,0,0.06)] hover:text-[#6a6a6a] " +
  "active:bg-[rgba(0,0,0,0.04)]";

function rectsOverlap(a: DOMRect, b: DOMRect): boolean {
  return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
}

export function BottomNav() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [onLight, setOnLight] = useState(false);

  const recompute = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;
    const br = bar.getBoundingClientRect();
    if (br.width < 1 || br.height < 1) return;
    const lights = document.querySelectorAll<HTMLElement>('[data-nav-contrast="light"]');
    let on = false;
    for (let i = 0; i < lights.length; i++) {
      if (rectsOverlap(lights[i].getBoundingClientRect(), br)) {
        on = true;
        break;
      }
    }
    setOnLight((prev) => (prev === on ? prev : on));
  }, []);

  useLayoutEffect(() => {
    recompute();
    const r0 = requestAnimationFrame(() => recompute());
    window.addEventListener("scroll", recompute, { capture: true, passive: true });
    window.addEventListener("resize", recompute, { passive: true });
    const ro = new ResizeObserver(recompute);
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(r0);
      ro.disconnect();
      window.removeEventListener("scroll", recompute, { capture: true });
      window.removeEventListener("resize", recompute);
    };
  }, [recompute]);

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed bottom-[var(--nav-to-viewport-bottom)] left-0 right-0 z-[100] [transform:translateZ(0)] pl-[max(0.5rem,env(safe-area-inset-left,0px))] pr-[max(0.5rem,env(safe-area-inset-right,0px))]"
    >
      <div className="pointer-events-auto flex w-full justify-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div ref={barRef} className={BAR}>
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              {...("external" in item && item.external
                ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
                : {})}
              className={`${BTN} ${
                item.active
                  ? onLight
                    ? BTN_ACTIVE_ON_LIGHT
                    : BTN_ACTIVE
                  : onLight
                    ? BTN_INACTIVE_ON_LIGHT
                    : BTN_INACTIVE
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
