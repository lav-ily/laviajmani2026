import { aboutPage } from "@/lib/about/about-page";
import type { CaseStudy } from "@/lib/case-studies/types";
import { getCaseStudy } from "@/lib/case-studies";
import { laVieResearch } from "@/lib/research/la-vie";

const PAGES: Record<string, CaseStudy> = {
  [laVieResearch.slug]: laVieResearch,
  [aboutPage.slug]: aboutPage,
};

/** Case study, research, or About detail opened from the Kelly grid. */
export function getPanelContent(slug: string): CaseStudy | undefined {
  return getCaseStudy(slug) ?? PAGES[slug];
}
