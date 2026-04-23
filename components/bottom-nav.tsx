"use client";

/* Figma 129:8424: 474×56, px-11 py-2, gap-4, buttons 140×40 */
const items = [
  { label: "Work", href: "#", active: true },
  { label: "Research", href: "#research", active: false },
  { label: "Contact", href: "#contact", active: false },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed bottom-[66px] left-1/2 z-50 w-[calc(100%-32px)] max-w-[474px] -translate-x-1/2"
    >
      <div
        className="pointer-events-auto w-full overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          className="font-system flex h-14 w-[474px] min-w-[474px] items-center justify-center gap-4 rounded-[44px] bg-[rgba(255,255,255,0.15)] px-[11px] py-2 shadow-[4px_4px_16px_0px_rgba(33,33,33,0.16)] backdrop-blur-[20px]"
        >
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={`
                flex h-10 w-[140px] shrink-0 items-center justify-center overflow-clip px-4 py-1.5
                text-center text-base not-italic font-normal no-underline [font-weight:400] transition-[background-color,backdrop-filter] duration-150
                ${item.active
                  ? "rounded-[38px] bg-[rgba(255,255,255,0.2)] text-white backdrop-blur-[15px]"
                  : "rounded-[20px] bg-transparent text-[#cacaca] [backdrop-filter:none] visited:text-[#cacaca] active:bg-transparent"}
              `}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
