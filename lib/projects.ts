export interface Project {
  name: string;
  handle: string;
  description: string;
  iconSrc: string;
  iconBg: string;
  /** If true, the SVG already contains its own circular background */
  iconSelfContained?: boolean;
  /** Custom clip/positioning for icons that need it (e.g. wordmarks) */
  iconClip?: { width: string; inset: string };
  /** Time shown in card footer (e.g. "11:11 AM") */
  time: string;
  /** Date line in card footer */
  date: string;
  /** First card uses taller media aspect in Figma */
  mediaAspect?: "tall" | "short";
  /** If set, media area shows this image (public path) instead of video or placeholder */
  mediaImageSrc?: string;
  /** Intrinsic pixel size of the media image (for Next/Image layout) */
  mediaImageSize?: { width: number; height: number };
  /** If set, media area shows this video (public path) instead of the placeholder gradient */
  mediaVideoSrc?: string;
  /** Natural pixel size of the video file — sets width/height on <video> for correct aspect + less layout shift */
  mediaVideoSize?: { width: number; height: number };
  /** Pixels cropped from the bottom of the media (e.g. video) */
  mediaBottomCrop?: number;
  /**
   * When "light", the card media is treated as a light/white background region. The bottom
   * nav then switches to darker label colors when the bar overlaps that media.
   */
  navContrast?: "light";
  /** If true, the media block (video, image, or placeholder) is omitted */
  hideMedia?: boolean;
}

export const projects: Project[] = [
  {
    name: "Bullpen",
    handle: "@bullpenfi",
    description:
      "Partnered with Bullpen to concept a new approach to mobile perp trading that feels frictionless, intuitive, and fun. Explored multiple interaction models and landed on a fast, gamified proof of concept where every part of the flow was designed with intention to make perps accessible, responsive, and enjoyable on a tiny screen.",
    iconSrc: "/icons/bullpen.svg",
    iconBg: "#06121B",
    time: "11:11 AM",
    date: "07 February 2025",
    mediaAspect: "tall",
    mediaVideoSrc: "/videos/lavibullpen.mp4",
    mediaBottomCrop: 4,
    navContrast: "light",
  },
  {
    name: "Delphi",
    handle: "@delphidigital",
    description:
      "Designed and built multiple internal tools for Delphi Digital's analyst team, along with the member-facing research platform — bringing structure and clarity to a dense, data-heavy crypto environment. Focused on making complex on-chain data and research accessible, scannable, and actionable for both analysts and subscribers.",
    iconSrc: "/icons/delphi.svg",
    iconBg: "#000000",
    time: "11:11 AM",
    date: "07 January 2026",
    hideMedia: true,
  },
  {
    name: "Hopin",
    handle: "@hopin",
    description:
      "Led product design for Hopin's Session — a desktop and iOS experience for live events and collaboration. Owned the iOS app end-to-end as team lead, shipping to over 20,000 users while driving a 26% lift in engagement through a series of high-impact feature launches. Along the way, built and scaled Session's native design system (CGDS) in Figma and Storybook to bring consistency and velocity to the entire product.",
    iconSrc: "/icons/hopin.svg",
    iconBg: "#364DE4",
    iconClip: { width: "410%", inset: "0 auto auto 0" },
    time: "11:11 AM",
    date: "07 July 2022",
    mediaAspect: "short",
    mediaVideoSrc: "/videos/hopindemo-converted.mp4",
    mediaVideoSize: { width: 1920, height: 1080 },
    navContrast: "light",
  },
  {
    name: "Dispo",
    handle: "@dispo",
    description:
      "Joined Dispo to co-lead a full product overhaul, shipping five features as the directly responsible designer and driving a 52% increase in downloads. Brought structure to the research process by implementing usability testing frameworks — and presented findings directly to the C-suite and select investors.",
    iconSrc: "/icons/dispo.svg",
    iconBg: "transparent",
    iconSelfContained: true,
    time: "11:11 AM",
    date: "07 October 2020",
    hideMedia: true,
  },
];
