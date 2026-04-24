"use client";

/* Figma 129:8424: 474×56, px-11 py-2, gap-4, buttons 140×40
 * Frosted look without backdrop-filter: WebKit/Arc can mis-composite fixed backdrop-filter and blur the whole viewport.
 * No backdrop on the bar so project cards can use subtle backdrop-blur again without nested-backdrop glitches. */

const items = [
  { label: "Work", href: "#", active: true },
  { label: "Research", href: "#research", active: false },
  { label: "Contact", href: "#contact", active: false },
] as const;

const NAV_BAR =
  "border border-white/10 bg-[rgba(32,32,32,0.92)] shadow-[4px_4px_16px_0px_rgba(0,0,0,0.4)] [background-clip:padding-box]";

export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed bottom-[34px] left-1/2 z-[100] w-[calc(100%-32px)] max-w-[474px] -translate-x-1/2"
    >
      <div className="pointer-events-auto w-full">
        <div className="relative h-14 w-full min-w-0">
          <div
            aria-hidden
            className={`absolute inset-0 rounded-[44px] ${NAV_BAR}`}
          />
          <div
            className="relative z-10 flex h-full w-full min-w-0 items-center justify-center overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="font-system flex h-14 w-[474px] min-w-[474px] shrink-0 items-center justify-center gap-4 px-[11px] py-2">
              {items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={`
                    flex h-10 w-[140px] shrink-0 items-center justify-center overflow-clip px-4 py-1.5
                    text-center text-base not-italic font-normal no-underline [font-weight:400] transition-[background-color] duration-150
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
