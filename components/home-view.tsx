"use client";

import { useEffect, useRef, useState } from "react";
import type { NavId } from "@/components/bottom-nav";
import { CaseStudyIntroPanel } from "@/components/case-study-intro-panel";
import { CaseStudyPanel } from "@/components/case-study-panel";
import { GridLayoutProvider } from "@/components/grid-layout-context";
import { IntroPanel } from "@/components/intro-panel";
import { aboutPage } from "@/lib/about/about-page";
import {
  centralCellIndicesWithColor,
  DEFAULT_GRID_LAYOUT,
  pickGridLayout,
  type GridLayout,
} from "@/lib/kelly-color-grid";
import { getPanelContent } from "@/lib/panel-content";
import { laVieResearch } from "@/lib/research/la-vie";

/** Tabs that skip the grid state and open their page from a random central tile of a matching color. */
const TAB_PAGES: Partial<Record<NavId, { slug: string; color: string }>> = {
  research: { slug: laVieResearch.slug, color: "#0047ab" },
  about: { slug: aboutPage.slug, color: "#e4e4e4" },
};

/**
 * Figma `78:144` (default), `112:33` (Case Studies grid), `77:14` (case study open).
 */
export function HomeView() {
  const [active, setActive] = useState<NavId | null>(null);
  const [openCaseStudy, setOpenCaseStudy] = useState<string | null>(null);
  const [gridSessionKey, setGridSessionKey] = useState(0);
  const [openOriginIndex, setOpenOriginIndex] = useState(0);
  const [gridLayout, setGridLayout] = useState<GridLayout>(DEFAULT_GRID_LAYOUT);
  const [gridMeasured, setGridMeasured] = useState(false);
  const gridHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = gridHostRef.current;
    if (!host) return;
    const observer = new ResizeObserver(([entry]) => {
      setGridLayout(
        pickGridLayout({ hostWidth: entry.contentRect.width, viewportWidth: window.innerWidth }),
      );
      setGridMeasured(true);
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
      const origins = centralCellIndicesWithColor(gridLayout, tabPage.color);
      setOpenOriginIndex(origins[Math.floor(Math.random() * origins.length)]);
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
    <GridLayoutProvider value={gridLayout}>
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
          className={`relative h-svh w-full shrink-0 overflow-hidden split:sticky split:top-0 split:w-[var(--kelly-grid-slot)] ${
            gridMeasured ? "" : "opacity-0"
          }`}
        >
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
      </main>
    </GridLayoutProvider>
  );
}
