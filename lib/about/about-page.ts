import { ABOUT } from "@/lib/about-content";
import type { CaseStudy } from "@/lib/case-studies/types";

/** About tab — opens straight from a gray grid tile; same motion as case studies. */
export const aboutPage: CaseStudy = {
  slug: "about",
  title: ABOUT.name,
  location: ABOUT.location,
  body: "Descriptions coming soon.",
  panelColor: "#e4e4e4",
  blockColor: "#d2d2d2",
  mediaLayout: "hero",
};
