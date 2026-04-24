"use client";

/* Figma 129:8674 — Bottom Nav (1:1)
 * Bar: h-14 (56), rounded-44, bg rgba(255,255,255,0.19), blur-20, shadow, px-10 py-8, gap-16
 * Segments: w-[93px], px-16 py-6, blur-15. Active: rounded-38, bg white/0.2. Inactive: rounded-20, #cacaca 16px
 * Total width: 10+93+16+93+16+93+10 = 331
 */

const items = [
  { label: "Work", href: "#", active: true },
  { label: "Research", href: "#research", active: false },
  { label: "Contact", href: "#contact", active: false },
] as const;

const BAR =
  "box-border flex h-14 w-[331px] shrink-0 select-none items-stretch justify-center gap-4 " +
  "rounded-[44px] bg-[rgba(255,255,255,0.19)] px-2.5 py-2 " +
  "shadow-[4px_4px_16px_0px_rgba(33,33,33,0.16)] " +
  "backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)]";

/* Blur on inactive segments reads as a second “fill”; only the active tab gets blur + fill (Figma 129:8675). */
const BTN =
  "font-system box-border flex h-full w-[93px] shrink-0 items-center justify-center overflow-hidden " +
  "px-4 py-1.5 text-center text-base font-normal not-italic leading-[normal] no-underline [font-weight:400] " +
  "whitespace-nowrap transition-[background-color,color,border-radius] duration-150 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-[rgba(255,255,255,0.35)]";

const BTN_ACTIVE =
  "rounded-[38px] bg-[rgba(255,255,255,0.2)] text-white " +
  "backdrop-blur-[15px] [-webkit-backdrop-filter:blur(15px)] " +
  "active:bg-[rgba(255,255,255,0.22)] visited:text-white";

const BTN_INACTIVE =
  "rounded-[20px] bg-transparent text-[#cacaca] " +
  "[-webkit-backdrop-filter:none] [backdrop-filter:none] " +
  "visited:text-[#cacaca] active:bg-transparent hover:bg-transparent";

export function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed bottom-[var(--nav-to-viewport-bottom)] left-0 right-0 z-[100] [transform:translateZ(0)] pl-[max(0.5rem,env(safe-area-inset-left,0px))] pr-[max(0.5rem,env(safe-area-inset-right,0px))]"
    >
      <div className="pointer-events-auto flex w-full justify-center overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className={BAR}>
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={`${BTN} ${item.active ? BTN_ACTIVE : BTN_INACTIVE}`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
