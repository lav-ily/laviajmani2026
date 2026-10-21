import type { PanelMediaLayout } from "@/lib/case-studies/types";
import type { GridDims } from "@/lib/kelly-color-grid";

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

/** 2×2 bento (`mediaLayout: "quad"`). */
export const QUAD_BLOCK_COUNT = 4;

export function mediaBlockCount(mediaLayout: PanelMediaLayout | undefined): number {
  return mediaLayout === "quad" ? QUAD_BLOCK_COUNT : BENTO_BLOCK_COUNT;
}

export const CASE_STUDY_MOTION_EASE = [0.32, 0, 0.18, 1] as const;

/** Case-study tile zoom on hover. */
export const CASE_STUDY_HOVER_SCALE = 1.03;
export const CASE_STUDY_HOVER_S = 0.22;

/** Samples sit in a two-column bento beside the grid, and stack in one column under the mobile cards. */
export function bentoGridDims(dims: GridDims, blockCount = BENTO_BLOCK_COUNT): GridDims {
  return dims.cols === 1
    ? { cols: 1, rows: blockCount }
    : { cols: 2, rows: blockCount / 2 };
}

/** Anchor each bento cell to a point on the Kelly grid for ripple distance. */
export function bentoBlockAnchorOnGrid(
  dims: GridDims,
  blockIndex: number,
  blockCount = BENTO_BLOCK_COUNT,
): { row: number; col: number } {
  const bento = bentoGridDims(dims, blockCount);
  const bRow = Math.floor(blockIndex / bento.cols);
  const bCol = blockIndex % bento.cols;
  const row = Math.min(
    dims.rows - 1,
    Math.floor(((bRow + 0.5) * dims.rows) / bento.rows),
  );
  const col = Math.min(
    dims.cols - 1,
    Math.floor(((bCol + 0.5) * dims.cols) / bento.cols),
  );
  return { row, col };
}

export function caseStudyBentoFillDistance(
  dims: GridDims,
  originIndex: number,
  blockIndex: number,
  blockCount = BENTO_BLOCK_COUNT,
): number {
  const origin = gridCellRowCol(dims, originIndex);
  const anchor = bentoBlockAnchorOnGrid(dims, blockIndex, blockCount);
  return Math.max(Math.abs(origin.row - anchor.row), Math.abs(origin.col - anchor.col));
}

export function caseStudyBentoFillDelay(
  dims: GridDims,
  originIndex: number,
  blockIndex: number,
  blockCount = BENTO_BLOCK_COUNT,
): number {
  return (
    caseStudyBentoFillDistance(dims, originIndex, blockIndex, blockCount) *
    CASE_STUDY_BENTO_STAGGER_S
  );
}

/** When the last bento block finishes fading in. */
export function caseStudyBentoRippleEndS(
  dims: GridDims,
  originIndex: number,
  blockCount = BENTO_BLOCK_COUNT,
): number {
  let maxDist = 0;
  for (let i = 0; i < blockCount; i += 1) {
    maxDist = Math.max(maxDist, caseStudyBentoFillDistance(dims, originIndex, i, blockCount));
  }
  return maxDist * CASE_STUDY_BENTO_STAGGER_S + CASE_STUDY_BENTO_FADE_S;
}

/** Figma `78:128` — single hero frame ripples from the grid center. */
function heroMediaCenterIndex(dims: GridDims): number {
  return Math.floor(dims.rows / 2) * dims.cols + Math.floor(dims.cols / 2);
}

export function caseStudyHeroFillDelay(dims: GridDims, originIndex: number): number {
  return (
    caseStudyFillDistance(dims, originIndex, heroMediaCenterIndex(dims)) * CASE_STUDY_BENTO_STAGGER_S
  );
}

export function caseStudyHeroRippleEndS(dims: GridDims, originIndex: number): number {
  return caseStudyHeroFillDelay(dims, originIndex) + CASE_STUDY_BENTO_FADE_S;
}

export function panelContentRippleEndS(
  dims: GridDims,
  originIndex: number,
  mediaLayout: PanelMediaLayout | undefined,
): number {
  return mediaLayout === "hero"
    ? caseStudyHeroRippleEndS(dims, originIndex)
    : caseStudyBentoRippleEndS(dims, originIndex, mediaBlockCount(mediaLayout));
}

export function caseStudyFillDistance(dims: GridDims, originIndex: number, cellIndex: number): number {
  const origin = gridCellRowCol(dims, originIndex);
  const cell = gridCellRowCol(dims, cellIndex);
  return Math.max(Math.abs(origin.row - cell.row), Math.abs(origin.col - cell.col));
}

export function caseStudyFillCellDelay(dims: GridDims, originIndex: number, cellIndex: number): number {
  return caseStudyFillDistance(dims, originIndex, cellIndex) * CASE_STUDY_CELL_FILL_STAGGER_S;
}

/** When the last cell finishes its colour transition. */
export function caseStudyFillCellsEndS(dims: GridDims, originIndex: number): number {
  let maxDist = 0;
  for (let i = 0; i < dims.cols * dims.rows; i += 1) {
    maxDist = Math.max(maxDist, caseStudyFillDistance(dims, originIndex, i));
  }
  return maxDist * CASE_STUDY_CELL_FILL_STAGGER_S + CASE_STUDY_CELL_FILL_S;
}

/** Landing entry: diagonal step between tiles as the reveal sweeps from the top-right corner. */
export const GRID_ENTRY_STAGGER_S = 0.065;

/** Steps along the top-right → bottom-left diagonal, so the wavefront runs perpendicular to it. */
function gridEntrySteps(dims: GridDims, index: number): number {
  const { row, col } = gridCellRowCol(dims, index);
  return row + (dims.cols - 1 - col);
}

export function gridEntryRevealDelay(dims: GridDims, index: number): number {
  return gridEntrySteps(dims, index) * GRID_ENTRY_STAGGER_S;
}

/** When the bottom-left tile finishes filling in. */
export function gridEntryRevealEndS(dims: GridDims): number {
  return (dims.rows - 1 + dims.cols - 1) * GRID_ENTRY_STAGGER_S + CASE_STUDY_CELL_FILL_S;
}

/** Rows clamp so an index kept from a larger layout (after a resize) still lands on the grid. */
export function gridCellRowCol(dims: GridDims, index: number): { row: number; col: number } {
  return {
    row: Math.min(Math.floor(index / dims.cols), dims.rows - 1),
    col: index % dims.cols,
  };
}

const STAGGER_ORDER = ["hopin", "dispo", "peachy-patients", "delphi", "bullpen"] as const;

export function logoShuffleDelay(slug: string): number {
  const i = STAGGER_ORDER.indexOf(slug as (typeof STAGGER_ORDER)[number]);
  return i >= 0 ? i * 0.028 : 0;
}

/** Signed column/row delta from target slot back to origin (grid steps). */
export function gridSlotDelta(
  dims: GridDims,
  originIndex: number,
  targetIndex: number,
): { col: number; row: number } {
  const origin = gridCellRowCol(dims, originIndex);
  const target = gridCellRowCol(dims, targetIndex);
  return {
    col: origin.col - target.col,
    row: origin.row - target.row,
  };
}

/** Transform from the target cell to another slot on the grid (one cell = 100% + gap). */
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
