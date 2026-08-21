export type WorkLayout = "wide" | "half";

export interface WorkItem {
  year: string;
  name: string;
  role: string;
  layout: WorkLayout;
  /** Flattened product screenshot. Omitted for in-progress cards. */
  mediaSrc?: string;
  mediaAlt?: string;
  inProgress?: boolean;
  /** Hopin 2022 uses a composed phone mockup; Hopin 2021 wide uses in-view video. */
  variant?: "phone" | "video";
}

export const workItems: WorkItem[] = [
  {
    year: "2026",
    name: "Delphi Digital",
    role: "Lead Product Designer",
    layout: "wide",
    inProgress: true,
  },
  {
    year: "2021",
    name: "Dispo",
    role: "Product Designer",
    layout: "half",
    inProgress: true,
  },
  {
    year: "2025",
    name: "Bullpen",
    role: "Lead Product Designer",
    layout: "half",
    inProgress: true,
  },
  {
    year: "2021",
    name: "Hopin",
    role: "Product Designer",
    layout: "wide",
    variant: "video",
    mediaSrc: "/videos/hopin.webm",
    mediaAlt: "Hopin desktop product interface",
  },
  {
    year: "2026",
    name: "Hub",
    role: "Lead Product Designer",
    layout: "half",
    inProgress: true,
  },
  {
    year: "2022",
    name: "Hopin",
    role: "Lead Product Designer",
    layout: "half",
    inProgress: true,
  },
];
