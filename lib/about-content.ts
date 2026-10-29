/** Figma `118:343` — intro column beside the color grid. */
export const ABOUT = {
  name: "Lavi Ajmani",
  location: "New York, 2026",
  paragraphs: [
    "Lavi Ajmani is a designer, strategist, and the founder of 32Paces New York. She is permanently based in New York, NY.",
    "She has built with teams at Delphi Digital, Bullpen, Dispo, Hopin, Peachy Pay, and more. She was trained at Parsons School of Design.",
    "The home page of this site is inspired by her favorite painting, Ellsworth Kelly’s Colors For A Large Wall (1951).",
  ],
  /** Phrases in `paragraphs` rendered as links, keyed by the exact text. */
  links: {
    "Parsons School of Design": "https://www.parsonsbba.com/sp20studentprojects/the-architecture-of-awe",
    "Ellsworth Kelly’s Colors For A Large Wall": "https://www.moma.org/collection/works/80528",
  },
} as const;
