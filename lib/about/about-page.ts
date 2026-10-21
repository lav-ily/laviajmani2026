import { ABOUT } from "@/lib/about-content";
import type { CaseStudy } from "@/lib/case-studies/types";

/** About tab — opens straight from a gray grid tile; same motion as case studies. */
export const aboutPage: CaseStudy = {
  slug: "about",
  title: ABOUT.name,
  location: ABOUT.location,
  body: [
    "Lavi has been based in New York since 2018 and is permanently located in the city. She was born and raised on the East Coast and is the eldest of three daughters.",
    "She is an avid listener of rap and hip-hop. She is studying for her Sommelier certification via the Court of Master Sommeliers.",
    "An avid patron of the arts, she frequents the many museums and galleries of New York, as well as the New York Philharmonic.",
    "She is actively open to full-time product design opportunities in New York or remote. If you are interested, please reach out via email, Twitter, or LinkedIn.",
  ],
  bodyLinks: {
    email: "mailto:lavi@laviajmani.com",
    Twitter: "https://x.com/32paces",
    LinkedIn: "https://www.linkedin.com/in/pallaviajmani/",
  },
  panelColor: "#e4e4e4",
  blockColor: "#d2d2d2",
  mediaLayout: "quad",
};
