"use client";

import { useEffect, useState } from "react";

import { HERO } from "@/lib/hero-content";
import { dismissRefinementBanner } from "@/lib/refinement-banner";
import { scrollToSection } from "@/lib/scroll-to-section";
import { NOTE } from "@/lib/site-copy";

type NavId = "hero" | "work" | "research" | "about" | "note";

const items: ReadonlyArray<{
  id: NavId;
  href: string;
  label?: string;
  icon?: "star" | "note";
  widthClass: string;
  ariaLabel?: string;
}> = [
  {
    id: "hero",
    href: "#hero",
    icon: "star",
    widthClass: "w-[80px]",
    ariaLabel: HERO.name,
  },
  { id: "work", href: "#work", label: "Work", widthClass: "w-[140px]" },
  {
    id: "research",
    href: "#research",
    label: "Research",
    widthClass: "w-[140px]",
  },
  { id: "about", href: "#about", label: "About", widthClass: "w-[140px]" },
  {
    id: "note",
    href: "#note",
    icon: "note",
    widthClass: "w-[80px]",
    ariaLabel: NOTE.title,
  },
];

const BAR_SHELL =
  "relative isolate w-max max-w-[calc(100vw-1rem-env(safe-area-inset-left,0px)-env(safe-area-inset-right,0px))]";

/** Opaque plate — box-shadow only renders evenly on a solid, non-filtered surface. */
const BAR_SHADOW =
  "pointer-events-none absolute inset-0 rounded-[44px] bg-white shadow-[4px_4px_8px_0px_rgba(33,33,33,0.16)]";

const BAR =
  "relative z-[1] box-border flex h-14 w-max shrink-0 select-none items-stretch justify-center gap-4 " +
  "rounded-[44px] bg-white/85 px-2.5 py-2 " +
  "backdrop-blur-[20px] backdrop-saturate-150 [-webkit-backdrop-filter:blur(20px)_saturate(150%)]";

const BTN =
  "font-[family-name:var(--font-geist-sans)] box-border flex h-full shrink-0 items-center justify-center overflow-hidden " +
  "px-4 py-1.5 text-center text-[16px] font-normal leading-normal no-underline " +
  "whitespace-nowrap text-[#696969] " +
  "transition-[background-color,border-radius,color] duration-200 ease-out " +
  "[&_img]:transition-[filter] [&_img]:duration-200 [&_img]:ease-out " +
  "hover:[&_img]:brightness-[0.88] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-[rgba(0,0,0,0.25)]";

const BTN_ACTIVE =
  "rounded-[38px] bg-[var(--color-nav-active)] " +
  "hover:bg-[#e2e2e2] active:bg-[#dcdcdc]";

const BTN_INACTIVE =
  "rounded-[20px] bg-transparent " +
  "hover:bg-[rgba(0,0,0,0.06)] hover:text-[#565656] " +
  "active:bg-[rgba(0,0,0,0.04)]";

function NavIcon({ icon }: { icon: "star" | "note" }) {
  if (icon === "star") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/icons/nav-star.svg"
        alt=""
        width={24}
        height={24}
        className="block size-6 max-w-none"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icons/nav-note.svg"
      alt=""
      width={24}
      height={18}
      className="block h-[18px] w-6 max-w-none"
    />
  );
}

export function BottomNav() {
  const [active, setActive] = useState<NavId>("hero");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el != null);

    if (sections.length === 0) return;

    const syncActive = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current: NavId = "hero";

      for (const item of items) {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= marker) {
          current = item.id;
        }
      }

      setActive(current);
    };

    syncActive();
    window.addEventListener("scroll", syncActive, { passive: true });
    window.addEventListener("resize", syncActive);

    const observer = new IntersectionObserver(
      () => syncActive(),
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );

    for (const section of sections) observer.observe(section);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncActive);
      window.removeEventListener("resize", syncActive);
    };
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed bottom-[var(--nav-to-viewport-bottom)] left-0 right-0 z-[100] pl-[max(0.5rem,env(safe-area-inset-left,0px))] pr-[max(0.5rem,env(safe-area-inset-right,0px))]"
    >
      <div className="pointer-events-auto flex w-full justify-center">
        <div className="max-w-full overflow-x-auto p-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className={BAR_SHELL}>
            <div aria-hidden className={BAR_SHADOW} />
            <div className={BAR}>
              {items.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  aria-label={item.ariaLabel}
                  aria-current={item.id === active ? "page" : undefined}
                  className={`${BTN} ${item.widthClass} ${item.id === active ? BTN_ACTIVE : BTN_INACTIVE}`}
                  onClick={(event) => {
                    event.preventDefault();
                    dismissRefinementBanner();
                    scrollToSection(item.id);
                    window.history.pushState(null, "", item.href);
                  }}
                >
                  {item.icon ? <NavIcon icon={item.icon} /> : item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
