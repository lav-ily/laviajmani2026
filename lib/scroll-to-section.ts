import { animate } from "framer-motion";

let scrollControl: ReturnType<typeof animate> | null = null;

function clampScroll(y: number) {
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return Math.min(max, Math.max(0, y));
}

function getScrollMargin(section: HTMLElement) {
  return Number.parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
}

/** Fit the full About block in view, centered below the nav with equal top/bottom breathing room. */
function getAboutScrollTarget(section: HTMLElement) {
  const navOffset = getScrollMargin(section);
  const availableHeight = window.innerHeight - navOffset;
  const sectionHeight = section.offsetHeight;
  const sectionTop = section.offsetTop;

  if (sectionHeight <= availableHeight) {
    const balancedPad = (availableHeight - sectionHeight) / 2;
    return clampScroll(sectionTop - navOffset - balancedPad);
  }

  return clampScroll(sectionTop - navOffset);
}

function getScrollTarget(section: HTMLElement, id: string) {
  if (id === "about") {
    return getAboutScrollTarget(section);
  }

  const scrollMargin = getScrollMargin(section);
  return clampScroll(section.offsetTop - scrollMargin);
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
