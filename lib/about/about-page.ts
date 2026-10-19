import { ABOUT } from "@/lib/about-content";
import type { CaseStudy } from "@/lib/case-studies/types";

/** About tab — opens straight from a gray grid tile; same motion as case studies. */
export const aboutPage: CaseStudy = {
  slug: "about",
  title: ABOUT.name,
  location: ABOUT.location,
  body: [
    "Lavi has been based in New York since 2018 and is permanently located in the city. She was born and raised in the US and is the eldest of three daughters. She is an avid listener of rap and hip-hop — her favorite artists include (but are not limited to) Nas, Tobe Nwigwe, and Gang Starr. She is studying for her Sommelier certification via the Court of Master Sommeliers. She is an avid patron of the arts, frequenting the many museums and galleries in New York, as well as the New York Philharmonic.",
    "She is actively open to full-time product design opportunities in New York or remote. If you are interested, please reach out via email, Twitter, or LinkedIn.",
  ],
  bodyLinks: {
    email: "mailto:lavi@laviajmani.com",
    Twitter: "https://x.com/32paces",
    LinkedIn: "https://www.linkedin.com/in/pallaviajmani/",
  },
  panelColor: "#e4e4e4",
  blockColor: "#d2d2d2",
  mediaLayout: "hero",
};
