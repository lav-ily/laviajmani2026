"use client";

/* Figma 129:8424 — Bottom Nav
 * 474x56, gap-16, px-10 py-8, radius-44, bg rgba(255,255,255,0.15), blur-20,
 * shadow 4px 4px 16px rgba(33,33,33,0.16), button width 140, active radius 38. */

const items = [
  { label: "Work", href: "#", active: true },
  { label: "Research", href: "#research", active: false },
  { label: "Contact", href: "#contact", active: false },
] as const;

const BAR_GLASS =
  "rounded-[44px] bg-[rgba(255,255,255,0.15)] backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)] shadow-[4px_4px_16px_0px_rgba(33,33,33,0.16)]";
const BUTTON_BASE =
  "font-system flex h-full w-[140px] shrink-0 items-center justify-center overflow-clip px-4 py-1.5 text-center text-base not-italic font-normal leading-normal no-underline [font-weight:400] backdrop-blur-[15px] [-webkit-backdrop-filter:blur(15px)] transition-[background-color,color,border-radius] duration-150";

export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-[34px] z-[100] mx-auto w-[calc(100%-32px)] max-w-[474px] [transform:translateZ(0)]"
    >
      <div className="pointer-events-auto w-full">
        <div className="relative h-14 w-full min-w-0">
          <div
            aria-hidden
            className={`absolute inset-0 ${BAR_GLASS}`}
          />
          <div
            className="relative z-10 flex h-full w-full min-w-0 items-center justify-center overflow-x-auto overflow-y-hidden min-[500px]:overflow-x-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex h-14 w-[474px] min-w-[474px] shrink-0 items-center justify-center gap-4 px-[10px] py-2">
              {items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={`
                    ${BUTTON_BASE}
                    ${item.active
                      ? "rounded-[38px] bg-[rgba(255,255,255,0.2)] text-white"
                      : "rounded-[20px] bg-transparent text-[#cacaca] visited:text-[#cacaca] active:bg-transparent"}
                  `}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
