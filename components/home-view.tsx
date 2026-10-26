"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { NavId } from "@/components/bottom-nav";
import { CaseStudyIntroPanel } from "@/components/case-study-intro-panel";
import { CaseStudyPanel } from "@/components/case-study-panel";
import { GridLayoutProvider } from "@/components/grid-layout-context";
import { IntroPanel } from "@/components/intro-panel";
import { MobileMenu } from "@/components/mobile-menu";
import {
  centralCellIndicesWithColor,
  DEFAULT_GRID_LAYOUT,
  MOBILE_MAX_VIEWPORT_PX,
  pickGridLayout,
  type GridLayout,
} from "@/lib/kelly-color-grid";
import { gridEntryRevealEndS } from "@/lib/kelly-grid-motion";
import { getPanelContent } from "@/lib/panel-content";
import {
  caseStudyRoute,
  HOME_ROUTE,
  pageTitle,
  pathFromRoute,
  routeForNav,
  routeFromPath,
  TAB_PAGES,
  type SiteRoute,
} from "@/lib/site-routes";

/** One mount of the grid panel; a new `key` remounts it, `slug` is the page it has open. */
type PanelSession = {
  key: number;
  slug: string | null;
  originIndex: number;
  instant: boolean;
};

/** Cell a page ripples from when it opens without a tile click (tab, back/forward, page load). */
function originIndexFor(slug: string, layout: GridLayout): number {
  const tabPage = Object.values(TAB_PAGES).find((page) => page.slug === slug);
  if (tabPage) return centralCellIndicesWithColor(layout, tabPage.color)[0];
  const logoIndex = layout.caseStudyCells.findIndex(
    (cell) => cell.kind === "logo" && cell.slug === slug,
  );
  return Math.max(logoIndex, 0);
}

function routeFromLocation(pathname: string): SiteRoute {
  return routeFromPath(pathname) ?? HOME_ROUTE;
}

/**
 * Figma `78:144` (default), `112:33` (Case Studies grid), `77:14` (case study open). Each page has
 * its own URL: clicks push history entries so the grid stays mounted for its transitions, and
 * back/forward replay them from the URL.
 */
export function HomeView() {
  const pathname = usePathname();
  // Held locally rather than read from `usePathname`, which lags a push by a render and would
  // look like a back/forward to the panel sync below, remounting the grid mid-transition.
  const [route, setRoute] = useState<SiteRoute>(() => routeFromLocation(pathname));
  const { active, slug: openCaseStudy } = route;

  useEffect(() => {
    const onPopState = () => setRoute(routeFromLocation(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (next: SiteRoute) => {
    setRoute(next);
    const path = pathFromRoute(next);
    if (path !== window.location.pathname) window.history.pushState(null, "", path);
  };

  // Mobile: every page change, including back/forward, starts at the top of the new page.
  const routePath = pathFromRoute(route);
  const scrollToGridOnNavRef = useRef(false);
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);
  useEffect(() => {
    const scrollToGrid = scrollToGridOnNavRef.current;
    scrollToGridOnNavRef.current = false;
    if (!window.matchMedia(`(max-width: ${MOBILE_MAX_VIEWPORT_PX - 1}px)`).matches) return;
    if (scrollToGrid) {
      gridHostRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, left: 0 });
    }
  }, [routePath]);
  const [gridLayout, setGridLayout] = useState<GridLayout>(DEFAULT_GRID_LAYOUT);
  const [gridMeasured, setGridMeasured] = useState(false);
  const [introEntered, setIntroEntered] = useState(false);
  const [gridRevealed, setGridRevealed] = useState(route !== HOME_ROUTE);
  const [panel, setPanel] = useState<PanelSession>(() => ({
    key: 0,
    slug: route.slug,
    originIndex: route.slug ? originIndexFor(route.slug, DEFAULT_GRID_LAYOUT) : 0,
    instant: true,
  }));
  const gridHostRef = useRef<HTMLDivElement>(null);

  // Back/forward (or any URL change the panel didn't start): remount it on the new page.
  if (panel.slug !== route.slug) {
    setPanel({
      key: panel.key + 1,
      slug: route.slug,
      originIndex: route.slug ? originIndexFor(route.slug, gridLayout) : 0,
      instant: false,
    });
    setGridRevealed(true);
  }

  useEffect(() => {
    if (!gridMeasured || gridRevealed) return;
    const id = window.setTimeout(
      () => setGridRevealed(true),
      gridEntryRevealEndS(gridLayout) * 1000,
    );
    return () => window.clearTimeout(id);
  }, [gridLayout, gridMeasured, gridRevealed]);

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

  const study = openCaseStudy ? getPanelContent(openCaseStudy) : undefined;
  if (study && !introEntered) setIntroEntered(true);

  const title = pageTitle(route);
  useEffect(() => {
    document.title = title;
  }, [title]);

  const handleNavSelect = (id: NavId | null) => {
    setGridRevealed(true);
    const next = routeForNav(id);
    const tabPage = id ? TAB_PAGES[id] : undefined;
    if (tabPage && next.slug !== panel.slug) {
      const origins = centralCellIndicesWithColor(gridLayout, tabPage.color);
      setPanel({
        key: panel.key + 1,
        slug: next.slug,
        originIndex: origins[Math.floor(Math.random() * origins.length)],
        instant: false,
      });
    }
    navigate(next);
  };

  const activeTabPage = active ? TAB_PAGES[active] : undefined;

  const handleTileOpen = (slug: string, cellIndex: number) => {
    setPanel((current) => ({ ...current, slug, originIndex: cellIndex }));
    navigate(caseStudyRoute(slug));
  };

  const handleIntroClose = () => {
    navigate(activeTabPage ? HOME_ROUTE : routeForNav("case-studies"));
  };
  const handleMenuSelect = (id: NavId) => {
    if (id === "case-studies") {
      if (study) {
        scrollToGridOnNavRef.current = true;
        handleIntroClose();
      } else {
        gridHostRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    if (id !== active) handleNavSelect(id);
    else window.scrollTo({ top: 0 });
  };

  return (
    <GridLayoutProvider value={gridLayout}>
      <main className="flex min-h-svh flex-col bg-white split:flex-row split:items-start">
        <MobileMenu
          current={activeTabPage && active ? active : "case-studies"}
          onSelect={handleMenuSelect}
        />
        {study ? (
          <div className="flex flex-1 max-md:flex-none split:min-w-0">
            <CaseStudyIntroPanel
              key={`${openCaseStudy}-${panel.key}`}
              study={study}
              onClose={handleIntroClose}
            />
          </div>
        ) : (
          <IntroPanel
            animateEntry={!introEntered}
            onEntryComplete={() => setIntroEntered(true)}
          />
        )}
        <div
          ref={gridHostRef}
          className={`relative h-svh w-full shrink-0 overflow-hidden max-md:mx-[26px] max-md:mb-[26px] max-md:h-auto max-md:w-auto split:sticky split:top-0 split:w-[var(--kelly-grid-slot)] ${
            gridMeasured ? "" : "opacity-0"
          }`}
        >
          <CaseStudyPanel
            key={panel.key}
            active={active}
            onNavSelect={handleNavSelect}
            onOpen={handleTileOpen}
            onClose={handleIntroClose}
            autoOpen={
              panel.slug
                ? { slug: panel.slug, cellIndex: panel.originIndex, instant: panel.instant }
                : undefined
            }
            entryReveal={gridRevealed ? undefined : gridMeasured ? "playing" : "pending"}
          />
        </div>
      </main>
    </GridLayoutProvider>
  );
}
