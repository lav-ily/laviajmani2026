"use client";

import { useEffect, useRef, useState } from "react";
import type { NavId } from "@/components/bottom-nav";
import { CaseStudyIntroPanel } from "@/components/case-study-intro-panel";
import { CaseStudyPanel } from "@/components/case-study-panel";
import { IntroPanel } from "@/components/intro-panel";
import { aboutPage } from "@/lib/about/about-page";
import { centralCellIndicesWithColor } from "@/lib/kelly-color-grid";
import { getPanelContent } from "@/lib/panel-content";
import { laVieResearch } from "@/lib/research/la-vie";

/** Tabs that skip the grid state and open their page from a random central tile of a matching color. */
const TAB_PAGES: Partial<Record<NavId, { slug: string; origins: ReadonlyArray<number> }>> = {
  research: { slug: laVieResearch.slug, origins: centralCellIndicesWithColor("#0047ab") },
  about: { slug: aboutPage.slug, origins: centralCellIndicesWithColor("#e4e4e4") },
};

/** Mirrors `--kelly-grid-design-size` in `globals.css`. */
const KELLY_GRID_DESIGN_SIZE_PX = 1117;

/**
 * Figma `78:144` (default), `112:33` (Case Studies grid), `77:14` (case study open).
 */
export function HomeView() {
  const [active, setActive] = useState<NavId | null>(null);
  const [openCaseStudy, setOpenCaseStudy] = useState<string | null>(null);
  const [gridSessionKey, setGridSessionKey] = useState(0);
  const [openOriginIndex, setOpenOriginIndex] = useState(0);
  const gridHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = gridHostRef.current;
    if (!host) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const scale = width / KELLY_GRID_DESIGN_SIZE_PX;
      host.style.setProperty("--kelly-grid-scale", String(scale));
      host.style.setProperty("--kelly-grid-inner-height", `${height / scale}px`);
    });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const resetCaseStudyPanel = () => {
    setOpenCaseStudy(null);
    setGridSessionKey((key) => key + 1);
  };

  const study = openCaseStudy ? getPanelContent(openCaseStudy) : undefined;

  const handleNavSelect = (id: NavId | null) => {
    if (id !== active) {
      resetCaseStudyPanel();
    }
    const tabPage = id ? TAB_PAGES[id] : undefined;
    if (tabPage) {
      setOpenOriginIndex(tabPage.origins[Math.floor(Math.random() * tabPage.origins.length)]);
      setOpenCaseStudy(tabPage.slug);
    }
    setActive(id);
  };

  const activeTabPage = active ? TAB_PAGES[active] : undefined;

  const handleTileOpen = (slug: string, cellIndex: number) => {
    setOpenOriginIndex(cellIndex);
    setOpenCaseStudy(slug);
  };

  const handleIntroClose = () => {
    if (activeTabPage) {
      handleNavSelect(null);
    } else {
      resetCaseStudyPanel();
    }
  };

  return (
    <main className="flex min-h-svh flex-col bg-white split:flex-row split:items-start">
      {study ? (
        <div className="flex flex-1 split:min-w-0">
          <CaseStudyIntroPanel
            key={`${openCaseStudy}-${gridSessionKey}`}
            study={study}
            originIndex={openOriginIndex}
            onClose={handleIntroClose}
          />
        </div>
      ) : (
        <IntroPanel />
      )}
      <div
        ref={gridHostRef}
        className="kelly-grid-scale-host relative h-svh w-full shrink-0 split:sticky split:top-0 split:w-[var(--kelly-grid-slot)]"
      >
        <div className="kelly-grid-scale-inner size-full max-md:contents">
          <CaseStudyPanel
          key={gridSessionKey}
          active={active}
          onNavSelect={handleNavSelect}
          onOpen={handleTileOpen}
          autoOpen={
            activeTabPage ? { slug: activeTabPage.slug, cellIndex: openOriginIndex } : undefined
          }
          />
        </div>
      </div>
    </main>
  );
}
