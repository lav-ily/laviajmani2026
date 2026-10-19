import type { NavId } from "@/components/bottom-nav";
import { aboutPage } from "@/lib/about/about-page";
import { CASE_STUDY_SLUGS } from "@/lib/case-studies";
import { HERO } from "@/lib/hero-content";
import { getPanelContent } from "@/lib/panel-content";
import { laVieResearch } from "@/lib/research/la-vie";

/**
 * Every page is the same home view in a different state, so in-app navigation can push a URL and
 * keep the grid mounted for its transitions while native back/forward still work.
 */
export type SiteRoute = {
  active: NavId | null;
  /** Page open over the grid (case study, research, or About). */
  slug: string | null;
};

export const HOME_ROUTE: SiteRoute = { active: null, slug: null };

const CASE_STUDIES_PATH = "/case-studies";

/** Tabs that skip the grid state and open their page from a central tile of a matching color. */
export const TAB_PAGES: Partial<
  Record<NavId, { path: string; slug: string; color: string; title?: string }>
> = {
  research: { path: "/research", slug: laVieResearch.slug, color: "#0047ab" },
  about: { path: "/about", slug: aboutPage.slug, color: "#e4e4e4", title: "About" },
};

export function routeForNav(id: NavId | null): SiteRoute {
  if (id === null) return HOME_ROUTE;
  return { active: id, slug: TAB_PAGES[id]?.slug ?? null };
}

export function caseStudyRoute(slug: string): SiteRoute {
  return { active: "case-studies", slug };
}

export function pathFromRoute({ active, slug }: SiteRoute): string {
  if (active === null) return "/";
  const tabPage = TAB_PAGES[active];
  if (tabPage) return tabPage.path;
  return slug ? `${CASE_STUDIES_PATH}/${slug}` : CASE_STUDIES_PATH;
}

/** Segments of every page, for static generation. */
export const SITE_PATH_SEGMENTS: ReadonlyArray<ReadonlyArray<string>> = [
  [],
  ["case-studies"],
  ...CASE_STUDY_SLUGS.map((slug) => ["case-studies", slug]),
  ...Object.values(TAB_PAGES).map((page) => [page.path.slice(1)]),
];

export function routeFromSegments(segments: ReadonlyArray<string>): SiteRoute | undefined {
  const [first, second, ...rest] = segments;
  if (rest.length > 0) return undefined;
  if (first === undefined) return HOME_ROUTE;
  if (first === "case-studies") {
    if (second === undefined) return { active: "case-studies", slug: null };
    return CASE_STUDY_SLUGS.includes(second) ? caseStudyRoute(second) : undefined;
  }
  if (second !== undefined) return undefined;
  const tab = (Object.keys(TAB_PAGES) as NavId[]).find((id) => TAB_PAGES[id]?.path === `/${first}`);
  return tab ? routeForNav(tab) : undefined;
}

export function routeFromPath(pathname: string): SiteRoute | undefined {
  return routeFromSegments(pathname.split("/").filter(Boolean));
}

export function pageTitle(route: SiteRoute): string {
  const page = route.slug ? getPanelContent(route.slug) : undefined;
  const tabTitle = route.active ? TAB_PAGES[route.active]?.title : undefined;
  if (page) return `${tabTitle ?? page.title} — ${HERO.name}`;
  if (route.active === "case-studies") return `Case Studies — ${HERO.name}`;
  return HERO.name;
}
