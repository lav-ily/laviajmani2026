/**
 * Figma `112:111` — grid after Ellsworth Kelly's *Colors for a Large Wall*. Each breakpoint
 * has its own layout (7×7 on desktop down to 5×6 on tablet); mobile swaps the grid for a
 * single column of case-study cards. Cells are listed row by row; logo sizes are percentages
 * of a cell.
 */

const ASSETS = "/images/kelly-grid";

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

export type LogoGridCell = { kind: "logo"; color: string; label: string; slug: string; logo: GridLogo };

export type GridCell = { kind: "tile"; color: string } | LogoGridCell | { kind: "empty" };

const tile = (color: string): GridCell => ({ kind: "tile", color });

const LIGHT = tile("#e4e4e4");
const INK = tile("#1a1a1a");
const CREAM = tile("#f5f0e8");
const YELLOW = tile("#f0c430");
const SKY = tile("#3da5d9");

/** Default-grid cobalt tile (`78:162`); opens Hopin case study (`77:14`). */
const HOPIN: LogoGridCell = {
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

const DISPO: LogoGridCell = {
  kind: "logo",
  color: "#3cb371",
  label: "Dispo",
  slug: "dispo",
  logo: { width: 100, height: 100, layers: [{ src: `${ASSETS}/cell-star.svg` }] },
};

const PEACHY_PATIENTS: LogoGridCell = {
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

const DELPHI: LogoGridCell = {
  kind: "logo",
  color: "#1a1a1a",
  label: "Delphi Digital",
  slug: "delphi",
  logo: { width: 35.62, height: 35.62, layers: [{ src: `${ASSETS}/delphi-ident.svg` }] },
};

const BULLPEN: LogoGridCell = {
  kind: "logo",
  color: "#004646",
  label: "Bullpen",
  slug: "bullpen",
  logo: { width: 32.38, height: 23.31, layers: [{ src: `${ASSETS}/teal-mark.svg` }] },
};

const TEAL = tile("#008b8b");
const COBALT = tile("#0047ab");

/** Figma `78:145` — resting state, every cell at full strength. */
const DEFAULT_CELLS_7X7: ReadonlyArray<GridCell> = [
  LIGHT, tile("#7b5ea7"), LIGHT, INK, tile("#e8762b"), LIGHT, tile("#0077c8"),
  TEAL, INK, LIGHT, YELLOW, LIGHT, tile("#e07090"), INK,
  LIGHT, LIGHT, COBALT, LIGHT, LIGHT, LIGHT, tile("#ee8470"),
  SKY, LIGHT, LIGHT, tile("#4daf8b"), INK, tile("#6b3074"), LIGHT,
  tile("#4a2060"), INK, LIGHT, LIGHT, tile("#cc0033"), CREAM, COBALT,
  LIGHT, LIGHT, SKY, LIGHT, LIGHT, TEAL, INK,
  tile("#3cb371"),   YELLOW, LIGHT, INK, tile("#9b8ec4"), INK, CREAM,
];

/** Figma `112:111` — Case Studies state: tiles dim to 40% and client logos surface. */
const CASE_STUDY_CELLS_7X7: ReadonlyArray<GridCell> = [
  LIGHT, tile("#7b5ea7"), LIGHT, INK, tile("#e8762b"), LIGHT, tile("#0077c8"),
  INK, LIGHT, YELLOW, LIGHT, tile("#e07090"), INK, LIGHT,
  LIGHT, LIGHT, LIGHT, LIGHT, LIGHT, SKY, tile("#6b3074"),
  tile("#4a2060"), LIGHT, HOPIN, DISPO, PEACHY_PATIENTS, LIGHT, tile("#cc0033"),
  LIGHT, LIGHT, DELPHI, BULLPEN, CREAM, LIGHT, INK,
  LIGHT, LIGHT, SKY, LIGHT, TEAL, INK, tile("#4daf8b"),
  YELLOW, LIGHT, INK, tile("#9b8ec4"), INK, CREAM, { kind: "empty" },
];

export type GridDims = { cols: number; rows: number };

export type GridLayoutId = "7x7" | "6x7" | "5x7" | "5x6" | "cards";

export type GridLayout = GridDims & {
  id: GridLayoutId;
  defaultCells: ReadonlyArray<GridCell>;
  caseStudyCells: ReadonlyArray<GridCell>;
  /** Default-grid index each logo slides from when Case Studies opens. */
  logoOrigins: Record<string, number>;
};

const LAYOUT_7X7: GridLayout = {
  id: "7x7",
  cols: 7,
  rows: 7,
  defaultCells: DEFAULT_CELLS_7X7,
  caseStudyCells: CASE_STUDY_CELLS_7X7,
  logoOrigins: {
    hopin: 16,
    dispo: 42,
    "peachy-patients": 20,
    delphi: 28,
    bullpen: 9,
  },
};

/**
 * Placeholder until each size is authored: a window of the 7×7 starting at `col`/`row` that
 * keeps the 3×2 case-study block. Logo origins outside the window move to the nearest edge cell.
 */
function cropLayout(id: GridLayoutId, col: number, row: number, cols: number, rows: number): GridLayout {
  const crop = (cells: ReadonlyArray<GridCell>) =>
    Array.from({ length: rows * cols }, (_, i) => cells[(row + Math.floor(i / cols)) * 7 + col + (i % cols)]);
  const clamp = (value: number, max: number) => Math.min(Math.max(value, 0), max - 1);
  const logoOrigins = Object.fromEntries(
    Object.entries(LAYOUT_7X7.logoOrigins).map(([slug, index]) => {
      const r = clamp(Math.floor(index / 7) - row, rows);
      const c = clamp((index % 7) - col, cols);
      return [slug, r * cols + c];
    }),
  );
  return {
    id,
    cols,
    rows,
    defaultCells: crop(LAYOUT_7X7.defaultCells),
    caseStudyCells: crop(LAYOUT_7X7.caseStudyCells),
    logoOrigins,
  };
}

/**
 * Figma `220:12665` — mobile has no Kelly grid: the case studies stack as a 1×5 column of cards,
 * which reuses the grid's open sequence (ripple, gutters close, media fades in).
 */
const MOBILE_CARDS: ReadonlyArray<LogoGridCell> = [DELPHI, DISPO, HOPIN, BULLPEN, PEACHY_PATIENTS];

const LAYOUT_CARDS: GridLayout = {
  id: "cards",
  cols: 1,
  rows: MOBILE_CARDS.length,
  defaultCells: MOBILE_CARDS.map((card) => tile(card.color)),
  caseStudyCells: MOBILE_CARDS,
  logoOrigins: Object.fromEntries(MOBILE_CARDS.map((card, index) => [card.slug, index])),
};

export const GRID_LAYOUTS: Record<GridLayoutId, GridLayout> = {
  "7x7": LAYOUT_7X7,
  "6x7": cropLayout("6x7", 0, 0, 6, 7),
  "5x7": cropLayout("5x7", 1, 0, 5, 7),
  "5x6": cropLayout("5x6", 1, 1, 5, 6),
  cards: LAYOUT_CARDS,
};

export const DEFAULT_GRID_LAYOUT = LAYOUT_7X7;

/** Breakpoints for the layout ladder; host widths apply when the grid sits beside the intro. */
export const MOBILE_MAX_VIEWPORT_PX = 768;
const TABLET_MAX_VIEWPORT_PX = 840;
const HOST_7_COLS_MIN_PX = 900;
const HOST_6_COLS_MIN_PX = 700;

export function pickGridLayout({
  hostWidth,
  viewportWidth,
}: {
  hostWidth: number;
  viewportWidth: number;
}): GridLayout {
  if (viewportWidth < MOBILE_MAX_VIEWPORT_PX) return GRID_LAYOUTS.cards;
  if (viewportWidth < TABLET_MAX_VIEWPORT_PX) return GRID_LAYOUTS["5x6"];
  if (hostWidth >= HOST_7_COLS_MIN_PX) return GRID_LAYOUTS["7x7"];
  if (hostWidth >= HOST_6_COLS_MIN_PX) return GRID_LAYOUTS["6x7"];
  return GRID_LAYOUTS["5x7"];
}

/**
 * Default-grid tiles of `color` within `maxSteps` of the grid center (Chebyshev distance), so tab
 * transitions (About, Research) ripple from the middle like the case studies. Falls back to the
 * closest matching tiles, then to the center cell when the layout has none.
 */
export function centralCellIndicesWithColor(
  layout: GridLayout,
  color: string,
  maxSteps = 1,
): ReadonlyArray<number> {
  const centerRow = Math.floor(layout.rows / 2);
  const centerCol = Math.floor(layout.cols / 2);
  const matches = layout.defaultCells.flatMap((cell, index) => {
    if (cell.kind !== "tile" || cell.color !== color) return [];
    const row = Math.floor(index / layout.cols);
    const col = index % layout.cols;
    return [{ index, steps: Math.max(Math.abs(row - centerRow), Math.abs(col - centerCol)) }];
  });
  if (matches.length === 0) return [centerRow * layout.cols + centerCol];
  const limit = Math.max(maxSteps, Math.min(...matches.map((m) => m.steps)));
  return matches.filter((m) => m.steps <= limit).map((m) => m.index);
}

const LOGO_SLUGS = ["hopin", "dispo", "peachy-patients", "delphi", "bullpen"] as const;

if (process.env.NODE_ENV !== "production") {
  for (const layout of Object.values(GRID_LAYOUTS)) {
    const size = layout.cols * layout.rows;
    const problems: string[] = [];
    if (layout.defaultCells.length !== size) problems.push(`defaultCells has ${layout.defaultCells.length} cells`);
    if (layout.caseStudyCells.length !== size) problems.push(`caseStudyCells has ${layout.caseStudyCells.length} cells`);
    for (const slug of LOGO_SLUGS) {
      if (!layout.caseStudyCells.some((cell) => cell.kind === "logo" && cell.slug === slug)) {
        problems.push(`missing ${slug} logo`);
      }
      const origin = layout.logoOrigins[slug];
      if (origin === undefined || layout.defaultCells[origin]?.kind !== "tile") {
        problems.push(`${slug} origin ${origin} is not a default-grid tile`);
      }
    }
    if (problems.length > 0) {
      console.error(`Kelly grid layout ${layout.id} (${layout.cols}×${layout.rows}): ${problems.join("; ")}`);
    }
  }
}
