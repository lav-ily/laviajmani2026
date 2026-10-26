"use client";

import { NavIsland } from "@/components/nav-island";

export type NavId = "case-studies" | "research" | "about";

export const NAV_LABELS: Record<NavId, string> = {
  "case-studies": "Case Studies",
  research: "Research",
  about: "About",
};

const items = (Object.keys(NAV_LABELS) as NavId[]).map((id) => ({ id, label: NAV_LABELS[id] }));

const TAB =
  "flex h-full flex-1 items-center justify-center rounded-[38px] px-4 py-1.5 font-body text-[14px] leading-normal whitespace-nowrap " +
  "transition-[color,background-color,scale] duration-150 ease-[ease] active:scale-[0.97] md:w-[140px] md:flex-none md:text-[16px] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(0,0,0,0.25)]";

const TAB_ACTIVE = "bg-[var(--color-nav-tab-active)] text-black";
const TAB_INACTIVE = "text-[var(--color-nav-label)] hover:text-black";

type BottomNavProps = {
  active: NavId | null;
  onSelect: (id: NavId | null) => void;
};

/** Figma `113:328` — floating pill over the bottom of the color grid. */
export function BottomNav({ active, onSelect }: BottomNavProps) {
  return (
    <NavIsland
      label="Primary"
      className="w-[calc(100%-24px)] max-w-[474px] gap-2 md:w-[474px] md:gap-4"
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
    </NavIsland>
  );
}
