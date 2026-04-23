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
  date: string;
}

export const projects: Project[] = [
  {
    name: "Bullpen",
    handle: "@bullpenfi",
    description:
      "Partnered with Bullpen to concept a new approach to mobile perp trading that feels frictionless, intuitive, and fun. explored multiple interaction models and landed on a fast, gamified proof of concept where every part of the flow was designed with intention to make perps accessible, responsive, and enjoyable on a tiny screen.",
    iconSrc: "/icons/bullpen.svg",
    iconBg: "#06121B",
    date: "01 February 2025",
  },
  {
    name: "Delphi",
    handle: "@delphidigital",
    description:
      "Partnered with Bullpen to concept a new approach to mobile perp trading that feels frictionless, intuitive, and fun. explored multiple interaction models and landed on a fast, gamified proof of concept where every part of the flow was designed with intention to make perps accessible, responsive, and enjoyable on a tiny screen.",
    iconSrc: "/icons/delphi.svg",
    iconBg: "#1F2124",
    date: "01 February 2025",
  },
  {
    name: "Dispo",
    handle: "@dispo",
    description:
      "Partnered with Bullpen to concept a new approach to mobile perp trading that feels frictionless, intuitive, and fun. explored multiple interaction models and landed on a fast, gamified proof of concept where every part of the flow was designed with intention to make perps accessible, responsive, and enjoyable on a tiny screen.",
    iconSrc: "/icons/dispo.svg",
    iconBg: "transparent",
    iconSelfContained: true,
    date: "01 February 2025",
  },
  {
    name: "Hopin",
    handle: "@hopin",
    description:
      "Partnered with Bullpen to concept a new approach to mobile perp trading that feels frictionless, intuitive, and fun. explored multiple interaction models and landed on a fast, gamified proof of concept where every part of the flow was designed with intention to make perps accessible, responsive, and enjoyable on a tiny screen.",
    iconSrc: "/icons/hopin.svg",
    iconBg: "#364DE4",
    iconClip: { width: "410%", inset: "0 auto auto 0" },
    date: "01 February 2025",
  },
];
