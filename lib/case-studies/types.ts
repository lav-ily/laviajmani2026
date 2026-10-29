export type PanelMediaLayout = "bento" | "hero" | "quad";

/** A full-bleed photo filling one bento block. */
export type BentoPhoto = {
  src: string;
  alt: string;
  /** Opens in a new tab when the card is clicked. */
  href?: string;
  /** Shown in a bar along the card's bottom edge on hover (Figma `340:1364`). */
  caption?: string;
  /** CSS `object-position`, to keep the subject in frame once cropped. */
  focus?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  location: string;
  /** One paragraph, or several. */
  body: string | ReadonlyArray<string>;
  /** Phrases in `body` rendered as links, keyed by the exact text. */
  bodyLinks?: Readonly<Record<string, string>>;
  /** Figma `78:77` panel fill when this study is open. */
  panelColor: string;
  /** Media placeholder fill on the open panel (bento block or hero frame). */
  blockColor: string;
  /** `hero` — Figma `78:128`; `quad` — 2×2 bento; default is the 2×3 case study bento. */
  mediaLayout?: PanelMediaLayout;
  /** Optional asset inside the hero frame (`mediaLayout: "hero"`). */
  heroMediaSrc?: string;
  /** Photos filling the bento blocks in reading order, in place of case study samples. */
  photos?: ReadonlyArray<BentoPhoto>;
  /** Hover captions for the bento sample cards, in the same order as the samples. */
  captions?: ReadonlyArray<string | undefined>;
};
