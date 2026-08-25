"use client";

import { useEffect, useState } from "react";

import { scrollToSection } from "@/lib/scroll-to-section";

type NavId = "research" | "about" | "work";

const items: ReadonlyArray<{
  id: NavId;
  href: string;
  label: string;
}> = [
  { id: "about", href: "#about", label: "About" },
  { id: "work", href: "#work", label: "Work" },
  { id: "research", href: "#research", label: "Research" },
];

const BTN =
  "inline-block origin-center font-[family-name:var(--font-geist-sans)] shrink-0 px-0 py-1 text-[16px] font-normal leading-normal no-underline " +
  "whitespace-nowrap transition-[color,transform] duration-200 ease-out hover:scale-105 active:scale-95 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-[rgba(0,0,0,0.25)]";

const BTN_ACTIVE = "text-[#1e1e1e]";
const BTN_INACTIVE = "text-[#696969] hover:text-[#565656]";

export function BottomNav() {
  const [active, setActive] = useState<NavId>("about");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el != null);

    if (sections.length === 0) return;

    const syncActive = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current: NavId = "about";

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
      className="pointer-events-none fixed top-0 right-0 left-0 z-[100] isolate h-[calc(var(--nav-bar-height)+env(safe-area-inset-top,0px))] pt-[env(safe-area-inset-top,0px)] [transform:translateZ(0)]"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[rgba(249,250,255,0.55)] backdrop-blur-[20px] backdrop-saturate-150 [-webkit-backdrop-filter:blur(20px)_saturate(150%)]"
      />

      <div className="pointer-events-auto relative flex h-[var(--nav-bar-height)] items-center justify-end gap-6 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))]">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            aria-current={item.id === active ? "page" : undefined}
            className={`${BTN} ${item.id === active ? BTN_ACTIVE : BTN_INACTIVE}`}
            onClick={(event) => {
              event.preventDefault();
              scrollToSection(item.id);
              window.history.pushState(null, "", item.href);
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
