/**
 * Figma `112:111` — 7×7 grid after Ellsworth Kelly's *Colors for a Large Wall*.
 * Cells are listed row by row; logo sizes are percentages of a cell so the
 * grid can scale from the 1117px design size.
 */

const ASSETS = "/images/kelly-grid";

export const GRID_SIZE = 7;

export type LogoLayer = {
  src: string;
  /** CSS `inset` within the logo box; omit to fill it. */
  inset?: string;
};

export type GridLogo = {
  /** Logo box size as a percentage of the cell. */
  width: number;
  height: number;
  layers: ReadonlyArray<LogoLayer>;
};

export type GridCell =
  | { kind: "tile"; color: string }
  | { kind: "logo"; color: string; label: string; slug: string; logo: GridLogo }
  | { kind: "empty" };

const tile = (color: string): GridCell => ({ kind: "tile", color });

const LIGHT = tile("#e4e4e4");
const INK = tile("#1a1a1a");
const CREAM = tile("#f5f0e8");
const YELLOW = tile("#f0c430");
const SKY = tile("#3da5d9");

/** Default-grid cobalt tile (`78:162`); opens Hopin case study (`77:14`). */
const HOPIN: GridCell = {
  kind: "logo",
  color: "#0047ab",
  label: "Hopin",
  slug: "hopin",
  logo: {
    width: 68,
    height: 18,
    layers: [{ src: "/icons/hopin.svg" }],
  },
};

const DISPO: GridCell = {
  kind: "logo",
  color: "#3cb371",
  label: "Dispo",
  slug: "dispo",
  logo: { width: 100, height: 100, layers: [{ src: `${ASSETS}/cell-star.svg` }] },
};

const PEACHY_PATIENTS: GridCell = {
  kind: "logo",
  color: "#ee8470",
  label: "Peachy Patients",
  slug: "peachy-patients",
  logo: {
    width: 68.64,
    height: 33.17,
    layers: [
      { src: `${ASSETS}/peachy-patients-group.svg` },
      { src: `${ASSETS}/peachy-patients-inner.svg`, inset: "17.62% 12.64% 20.3% 11.18%" },
    ],
  },
};

const DELPHI: GridCell = {
  kind: "logo",
  color: "#1a1a1a",
  label: "Delphi Digital",
  slug: "delphi",
  logo: { width: 35.62, height: 35.62, layers: [{ src: `${ASSETS}/delphi-ident.svg` }] },
};

const BULLPEN: GridCell = {
  kind: "logo",
  color: "#004646",
  label: "Bullpen",
  slug: "bullpen",
  logo: { width: 32.38, height: 23.31, layers: [{ src: `${ASSETS}/teal-mark.svg` }] },
};

const TEAL = tile("#008b8b");
const COBALT = tile("#0047ab");

/** Figma `78:145` — resting state, every cell at full strength. */
export const DEFAULT_CELLS: ReadonlyArray<GridCell> = [
  LIGHT, tile("#7b5ea7"), LIGHT, INK, tile("#e8762b"), LIGHT, tile("#0077c8"),
  TEAL, INK, LIGHT, YELLOW, LIGHT, tile("#e07090"), INK,
  LIGHT, LIGHT, COBALT, LIGHT, LIGHT, LIGHT, tile("#ee8470"),
  SKY, LIGHT, LIGHT, tile("#4daf8b"), INK, tile("#6b3074"), LIGHT,
  tile("#4a2060"), INK, LIGHT, LIGHT, tile("#cc0033"), CREAM, COBALT,
  LIGHT, LIGHT, SKY, LIGHT, LIGHT, TEAL, INK,
  tile("#3cb371"),   YELLOW, LIGHT, INK, tile("#9b8ec4"), INK, CREAM,
];

/**
 * Default-grid tiles of `color` within `maxSteps` of the grid center (Chebyshev distance), so tab
 * transitions (About, Research) ripple from the middle like the case studies. Falls back to the
 * closest matching tiles when none are that near.
 */
export function centralCellIndicesWithColor(color: string, maxSteps = 1): ReadonlyArray<number> {
  const center = Math.floor(GRID_SIZE / 2);
  const matches = DEFAULT_CELLS.flatMap((cell, index) => {
    if (cell.kind !== "tile" || cell.color !== color) return [];
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    return [{ index, steps: Math.max(Math.abs(row - center), Math.abs(col - center)) }];
  });
  if (matches.length === 0) return [];
  const limit = Math.max(maxSteps, Math.min(...matches.map((m) => m.steps)));
  return matches.filter((m) => m.steps <= limit).map((m) => m.index);
}

/** Figma `112:111` — Case Studies state: tiles dim to 40% and client logos surface. */
export const CASE_STUDY_CELLS: ReadonlyArray<GridCell> = [
  LIGHT, tile("#7b5ea7"), LIGHT, INK, tile("#e8762b"), LIGHT, tile("#0077c8"),
  INK, LIGHT, YELLOW, LIGHT, tile("#e07090"), INK, LIGHT,
  LIGHT, LIGHT, LIGHT, LIGHT, LIGHT, SKY, tile("#6b3074"),
  tile("#4a2060"), LIGHT, HOPIN, DISPO, PEACHY_PATIENTS, LIGHT, tile("#cc0033"),
  LIGHT, LIGHT, DELPHI, BULLPEN, CREAM, LIGHT, INK,
  LIGHT, LIGHT, SKY, LIGHT, TEAL, INK, tile("#4daf8b"),
  YELLOW, LIGHT, INK, tile("#9b8ec4"), INK, CREAM, { kind: "empty" },
];
