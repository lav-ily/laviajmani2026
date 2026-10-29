import { ABOUT } from "@/lib/about-content";
import type { CaseStudy } from "@/lib/case-studies/types";

/** About tab — opens straight from a gray grid tile; same motion as case studies. */
export const aboutPage: CaseStudy = {
  slug: "about",
  title: ABOUT.name,
  location: ABOUT.location,
  body: [
    "Lavi has been based in New York since 2018. She was born and raised on the East Coast and is the eldest of three sisters.",
    "She is studying for her Sommelier certification via the Court of Master Sommeliers. Her favorite musicians include Nas, Alina Baraz, and Oscar Peterson Trio.",
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
  photos: [
    {
      src: "/media/about/dinner.jpg",
      alt: "Lavi smiling at a candlelit restaurant table",
      caption: "Dinner by candlelight",
      focus: "50% 40%",
    },
    {
      src: "/media/about/orchestra.jpg",
      alt: "An orchestra taking a bow, seen from the balcony",
      caption: "Curtain call, seen from the balcony",
      focus: "50% 55%",
    },
    {
      src: "/media/about/onion-bakery.jpg",
      alt: "Lavi laughing with a tray of pastries at Onion bakery",
      caption: "Onion Anguk, Seoul",
      focus: "50% 45%",
    },
    {
      src: "/media/about/wine-flight.jpg",
      alt: "Lavi laughing behind a flight of white wines",
      caption: "A flight of whites, for sommelier study",
      focus: "50% 45%",
    },
  ],
};
