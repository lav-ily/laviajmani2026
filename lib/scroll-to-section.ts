import { animate } from "framer-motion";

/** Sections that fill the viewport and centre content with flexbox. */
const VIEWPORT_SECTIONS = new Set(["hero", "about", "note"]);

let scrollControl: ReturnType<typeof animate> | null = null;

function getScrollTarget(section: HTMLElement, id: string): number {
  if (VIEWPORT_SECTIONS.has(id)) {
    return section.offsetTop;
  }

  const scrollMargin = Number.parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
  return section.offsetTop - scrollMargin;
}

/** Smooth vertical scroll via Motion spring — always resets horizontal drift. */
export function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (!section) return;

  scrollControl?.stop();

  const startY = window.scrollY;
  const targetY = getScrollTarget(section, id);

  if (window.scrollX !== 0) {
    window.scrollTo({ left: 0, top: startY });
  }

  scrollControl = animate(startY, targetY, {
    type: "spring",
    stiffness: 280,
    damping: 38,
    mass: 0.85,
    onUpdate: (y) => {
      window.scrollTo({ top: y, left: 0 });
    },
    onComplete: () => {
      scrollControl = null;
    },
  });
}
