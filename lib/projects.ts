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
}

export const projects: Project[] = [
  {
    name: "Bullpen",
    handle: "@bullpenfi",
    description:
      "Partnered with Bullpen to concept a new approach to mobile perp trading that feels frictionless, intuitive, and fun. explored multiple interaction models and landed on a fast, gamified proof of concept where every part of the flow was designed with intention to make perps accessible, responsive, and enjoyable on a tiny screen.",
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
      "Partnered with Bullpen to concept a new approach to mobile perp trading that feels frictionless, intuitive, and fun. explored multiple interaction models and landed on a fast, gamified proof of concept where every part of the flow was designed with intention to make perps accessible, responsive, and enjoyable on a tiny screen.",
    iconSrc: "/icons/delphi.svg",
    iconBg: "#000000",
    time: "11:11 AM",
    date: "07 January 2026",
    mediaAspect: "short",
  },
  {
    name: "Hopin",
    handle: "@hopin",
    description:
      "Partnered with Bullpen to concept a new approach to mobile perp trading that feels frictionless, intuitive, and fun. explored multiple interaction models and landed on a fast, gamified proof of concept where every part of the flow was designed with intention to make perps accessible, responsive, and enjoyable on a tiny screen.",
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
      "Partnered with Bullpen to concept a new approach to mobile perp trading that feels frictionless, intuitive, and fun. explored multiple interaction models and landed on a fast, gamified proof of concept where every part of the flow was designed with intention to make perps accessible, responsive, and enjoyable on a tiny screen.",
    iconSrc: "/icons/dispo.svg",
    iconBg: "transparent",
    iconSelfContained: true,
    time: "11:11 AM",
    date: "07 October 2020",
    mediaAspect: "short",
  },
];
