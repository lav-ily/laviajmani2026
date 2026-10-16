export type PanelMediaLayout = "bento" | "hero";

export type CaseStudy = {
  slug: string;
  title: string;
  location: string;
  /** One paragraph, or several. */
  body: string | ReadonlyArray<string>;
  /** Figma `78:77` panel fill when this study is open. */
  panelColor: string;
  /** Media placeholder fill on the open panel (bento block or hero frame). */
  blockColor: string;
  /** `hero` — Figma `78:128`; default is the 2×3 case study bento. */
  mediaLayout?: PanelMediaLayout;
  /** Optional asset inside the hero frame (`mediaLayout: "hero"`). */
  heroMediaSrc?: string;
};
