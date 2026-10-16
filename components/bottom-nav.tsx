"use client";

export type NavId = "case-studies" | "research" | "about";

const items: ReadonlyArray<{ id: NavId; label: string }> = [
  { id: "case-studies", label: "Case Studies" },
  { id: "research", label: "Research" },
  { id: "about", label: "About" },
];

const TAB =
  "flex h-full flex-1 items-center justify-center rounded-[38px] px-4 py-1.5 font-body text-[14px] leading-normal whitespace-nowrap " +
  "backdrop-blur-[15px] transition-colors duration-200 ease-out md:w-[140px] md:flex-none md:text-[16px] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(0,0,0,0.25)]";

const TAB_ACTIVE = "bg-[var(--color-nav-tab-active)] text-[var(--color-nav-label)]";
const TAB_INACTIVE = "text-[var(--color-nav-tab-inactive)] hover:text-[var(--color-nav-label)]";

type BottomNavProps = {
  active: NavId | null;
  onSelect: (id: NavId | null) => void;
};

/** Figma `112:25` — floating pill over the bottom of the color grid. */
export function BottomNav({ active, onSelect }: BottomNavProps) {
  return (
    <nav
      aria-label="Primary"
      className="absolute bottom-3 left-1/2 flex h-12 w-[calc(100%-24px)] max-w-[474px] -translate-x-1/2 items-center gap-2 rounded-[44px] bg-white px-2.5 py-2 drop-shadow-[4px_4px_8px_rgba(33,33,33,0.16)] backdrop-blur-[20px] md:bottom-[49px] md:h-14 md:w-[474px] md:gap-4"
    >
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={isActive}
            className={`${TAB} ${isActive ? TAB_ACTIVE : TAB_INACTIVE}`}
            onClick={() => onSelect(isActive ? null : item.id)}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
