import { GRID_SIZE } from "@/lib/kelly-color-grid";

/** Matches `gap-[6px]` on the color grid. */
export const GRID_GAP_PX = 6;

/** Tile dim — matches logo shuffle pace. */
export const TILE_DIM_DURATION_S = 0.38;

/** Seconds to travel one grid cell on an axis. */
export const TETRIS_CELL_DURATION_S = 0.065;

/** Second leg starts before the first fully stops (keeps the L-path but feels fluid). */
export const TETRIS_LEG_OVERLAP_S = 0.048;

/** Ease-out per axis — still grid-aligned, less mechanical than linear. */
export const TETRIS_AXIS_EASE = [0.4, 0, 0.2, 1] as const;

/** Client card → case study page must finish within this budget (worst case ≈ 1.9s). */
export const CASE_STUDY_TOTAL_BUDGET_S = 3;

/** Beat on the clicked client tile before the ripple moves outward. */
export const CASE_STUDY_RIPPLE_HOLD_S = 0.25;

/** Each tile eases into the client accent. */
export const CASE_STUDY_CELL_FILL_S = 0.45;

/** Ripple delay per grid step from the selected client cell. */
export const CASE_STUDY_CELL_FILL_STAGGER_S = 0.075;

/** Gutters collapse after all tiles match. */
export const CASE_STUDY_GAP_FILL_S = 0.45;

/** Bento blocks appear on the solid field. */
export const CASE_STUDY_BENTO_FADE_S = 0.16;

/** Ripple step between bento blocks (same Chebyshev logic as the Kelly grid). */
export const CASE_STUDY_BENTO_STAGGER_S = 0.075;

export const BENTO_BLOCK_COUNT = 6;

export const CASE_STUDY_MOTION_EASE = [0.32, 0, 0.18, 1] as const;

/** Case-study tile zoom on hover. */
export const CASE_STUDY_HOVER_SCALE = 1.06;
export const CASE_STUDY_HOVER_S = 0.22;

const BENTO_COLS = 2;
const BENTO_ROWS = 3;

/** Anchor each 2×3 bento cell to a point on the 7×7 Kelly grid for ripple distance. */
export function bentoBlockAnchorOnGrid(blockIndex: number): { row: number; col: number } {
  const bRow = Math.floor(blockIndex / BENTO_COLS);
  const bCol = blockIndex % BENTO_COLS;
  const row = Math.min(
    GRID_SIZE - 1,
    Math.floor(((bRow + 0.5) * GRID_SIZE) / BENTO_ROWS),
  );
  const col = Math.min(
    GRID_SIZE - 1,
    Math.floor(((bCol + 0.5) * GRID_SIZE) / BENTO_COLS),
  );
  return { row, col };
}

export function caseStudyBentoFillDistance(originIndex: number, blockIndex: number): number {
  const origin = gridCellRowCol(originIndex);
  const anchor = bentoBlockAnchorOnGrid(blockIndex);
  return Math.max(Math.abs(origin.row - anchor.row), Math.abs(origin.col - anchor.col));
}

export function caseStudyBentoFillDelay(originIndex: number, blockIndex: number): number {
  return caseStudyBentoFillDistance(originIndex, blockIndex) * CASE_STUDY_BENTO_STAGGER_S;
}

/** When the last bento block finishes fading in. */
export function caseStudyBentoRippleEndS(originIndex: number): number {
  let maxDist = 0;
  for (let i = 0; i < BENTO_BLOCK_COUNT; i += 1) {
    maxDist = Math.max(maxDist, caseStudyBentoFillDistance(originIndex, i));
  }
  return maxDist * CASE_STUDY_BENTO_STAGGER_S + CASE_STUDY_BENTO_FADE_S;
}

/** Figma `78:128` — single hero frame ripples from the grid center. */
const HERO_MEDIA_CENTER_INDEX =
  Math.floor(GRID_SIZE / 2) * GRID_SIZE + Math.floor(GRID_SIZE / 2);

export function caseStudyHeroFillDelay(originIndex: number): number {
  return caseStudyFillDistance(originIndex, HERO_MEDIA_CENTER_INDEX) * CASE_STUDY_BENTO_STAGGER_S;
}

export function caseStudyHeroRippleEndS(originIndex: number): number {
  return caseStudyHeroFillDelay(originIndex) + CASE_STUDY_BENTO_FADE_S;
}

export function panelContentRippleEndS(
  originIndex: number,
  mediaLayout: "bento" | "hero" | undefined,
): number {
  return mediaLayout === "hero"
    ? caseStudyHeroRippleEndS(originIndex)
    : caseStudyBentoRippleEndS(originIndex);
}

export function caseStudyFillDistance(originIndex: number, cellIndex: number): number {
  const origin = gridCellRowCol(originIndex);
  const cell = gridCellRowCol(cellIndex);
  return Math.max(Math.abs(origin.row - cell.row), Math.abs(origin.col - cell.col));
}

export function caseStudyFillCellDelay(originIndex: number, cellIndex: number): number {
  return caseStudyFillDistance(originIndex, cellIndex) * CASE_STUDY_CELL_FILL_STAGGER_S;
}

/** When the last cell finishes its colour transition. */
export function caseStudyFillCellsEndS(originIndex: number): number {
  let maxDist = 0;
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i += 1) {
    maxDist = Math.max(maxDist, caseStudyFillDistance(originIndex, i));
  }
  return maxDist * CASE_STUDY_CELL_FILL_STAGGER_S + CASE_STUDY_CELL_FILL_S;
}

/** Seconds from the click until the page's media has fully faded in. */
export function panelOpenSequenceEndS(
  originIndex: number,
  mediaLayout: "bento" | "hero" | undefined,
): number {
  return (
    CASE_STUDY_RIPPLE_HOLD_S +
    caseStudyFillCellsEndS(originIndex) +
    CASE_STUDY_GAP_FILL_S +
    panelContentRippleEndS(originIndex, mediaLayout)
  );
}

/** Each block of page copy takes this long to brush on. */
export const TEXT_BRUSH_STROKE_S = 0.75;

/** The panel's stage timers run slightly behind the computed sequence; finish the copy after them. */
const TEXT_BRUSH_TAIL_S = 0.08;

/**
 * Brush-on timing for `count` blocks of page copy: starts with the ripple and finishes
 * as the media does, so the text never lands before the media.
 */
export function textBrushSchedule(
  count: number,
  originIndex: number,
  mediaLayout: "bento" | "hero" | undefined,
): { delays: number[]; duration: number } {
  const start = CASE_STUDY_RIPPLE_HOLD_S;
  const window = panelOpenSequenceEndS(originIndex, mediaLayout) + TEXT_BRUSH_TAIL_S - start;
  const duration = Math.min(TEXT_BRUSH_STROKE_S, window * 0.5);
  const stagger = count > 1 ? (window - duration) / (count - 1) : 0;
  return {
    delays: Array.from({ length: count }, (_, i) => start + i * stagger),
    duration,
  };
}

export function gridCellRowCol(index: number): { row: number; col: number } {
  return { row: Math.floor(index / GRID_SIZE), col: index % GRID_SIZE };
}

/** Default-grid indices each logo “shuffles” from when Case Studies opens. */
export const LOGO_ORIGIN_INDEX: Record<string, number> = {
  hopin: 16,
  dispo: 42,
  "peachy-patients": 20,
  delphi: 28,
  bullpen: 9,
};

const STAGGER_ORDER = ["hopin", "dispo", "peachy-patients", "delphi", "bullpen"] as const;

export function logoShuffleDelay(slug: string): number {
  const i = STAGGER_ORDER.indexOf(slug as (typeof STAGGER_ORDER)[number]);
  return i >= 0 ? i * 0.028 : 0;
}

/** Signed column/row delta from target slot back to origin (grid steps). */
export function gridSlotDelta(originIndex: number, targetIndex: number): { col: number; row: number } {
  const originCol = originIndex % GRID_SIZE;
  const originRow = Math.floor(originIndex / GRID_SIZE);
  const targetCol = targetIndex % GRID_SIZE;
  const targetRow = Math.floor(targetIndex / GRID_SIZE);
  return {
    col: originCol - targetCol,
    row: originRow - targetRow,
  };
}

/** Transform from the target cell to another slot on the 7×7 grid (one cell = 100% + gap). */
export function gridTranslate(col: number, row: number): { x: string; y: string } {
  const x = col === 0 ? "0px" : `calc(${col} * (100% + ${GRID_GAP_PX}px))`;
  const y = row === 0 ? "0px" : `calc(${row} * (100% + ${GRID_GAP_PX}px))`;
  return { x, y };
}

function axisDuration(steps: number): number {
  return steps === 0 ? 0 : TETRIS_CELL_DURATION_S * steps;
}

function secondLegDelay(firstLegDelay: number, firstLegDuration: number, hasSecondLeg: boolean): number {
  if (!hasSecondLeg) return firstLegDelay;
  return firstLegDelay + Math.max(0, firstLegDuration - TETRIS_LEG_OVERLAP_S);
}

/** L-path along grid axes; longer leg moves first. */
export function tetrisAxisTransition(delta: { col: number; row: number }, delay: number) {
  const ease = TETRIS_AXIS_EASE;
  const colSteps = Math.abs(delta.col);
  const rowSteps = Math.abs(delta.row);
  const verticalFirst = rowSteps >= colSteps;
  const colDuration = axisDuration(colSteps);
  const rowDuration = axisDuration(rowSteps);

  if (verticalFirst) {
    return {
      y: { duration: rowDuration, delay, ease },
      x: {
        duration: colDuration,
        delay: secondLegDelay(delay, rowDuration, colSteps > 0),
        ease,
      },
    };
  }

  return {
    x: { duration: colDuration, delay, ease },
    y: {
      duration: rowDuration,
      delay: secondLegDelay(delay, colDuration, rowSteps > 0),
      ease,
    },
  };
}

/** Reverse leg order when leaving Case Studies. */
export function tetrisExitAxisTransition(delta: { col: number; row: number }, delay: number) {
  const ease = TETRIS_AXIS_EASE;
  const colSteps = Math.abs(delta.col);
  const rowSteps = Math.abs(delta.row);
  const verticalFirst = rowSteps >= colSteps;
  const colDuration = axisDuration(colSteps);
  const rowDuration = axisDuration(rowSteps);

  if (verticalFirst) {
    return {
      x: { duration: colDuration, delay, ease },
      y: {
        duration: rowDuration,
        delay: secondLegDelay(delay, colDuration, rowSteps > 0),
        ease,
      },
    };
  }

  return {
    y: { duration: rowDuration, delay, ease },
    x: {
      duration: colDuration,
      delay: secondLegDelay(delay, rowDuration, colSteps > 0),
      ease,
    },
  };
}
