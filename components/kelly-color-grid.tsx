"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { CaseStudySelectPayload } from "@/components/case-study-panel";
import { BottomNav, type NavId } from "@/components/bottom-nav";
import {
  CASE_STUDY_CELL_FILL_S,
  CASE_STUDY_GAP_FILL_S,
  CASE_STUDY_HOVER_S,
  CASE_STUDY_HOVER_SCALE,
  CASE_STUDY_MOTION_EASE,
  caseStudyFillCellDelay,
  gridSlotDelta,
  gridTranslate,
  GRID_GAP_PX,
  LOGO_ORIGIN_INDEX,
  logoShuffleDelay,
  tetrisAxisTransition,
  tetrisExitAxisTransition,
  TILE_DIM_DURATION_S,
} from "@/lib/kelly-grid-motion";
import {
  CASE_STUDY_CELLS,
  DEFAULT_CELLS,
  GRID_SIZE,
  type GridCell,
} from "@/lib/kelly-color-grid";

type LogoCellData = Extract<GridCell, { kind: "logo" }>;

export type ColorFillState = {
  color: string;
  originIndex: number;
  phase: "cells" | "gaps";
  generation: number;
};

/** Hex mirror of `--color-grid-panel`; Framer Motion can't interpolate CSS variables. */
const PANEL_BG = "#f5f5f2";

function tileOpacity(dimmed: boolean): number {
  return dimmed ? 0.4 : 1;
}

function baseCellAt(index: number, showCaseStudies: boolean): GridCell {
  const cell = (showCaseStudies ? CASE_STUDY_CELLS : DEFAULT_CELLS)[index];
  if (cell.kind === "logo") {
    return { kind: "tile", color: cell.color };
  }
  return cell;
}

function TileCell({
  cell,
  index,
  dimmed,
  colorFill,
}: {
  cell: GridCell;
  index: number;
  dimmed: boolean;
  colorFill?: ColorFillState;
}) {
  const reducedMotion = useReducedMotion();
  const baseColor = cell.kind === "empty" ? PANEL_BG : cell.color;
  const filling = colorFill !== undefined;
  const inCellPhase = filling && colorFill.phase === "cells";
  const targetColor = filling ? colorFill.color : baseColor;
  const fillDelay = inCellPhase ? caseStudyFillCellDelay(colorFill.originIndex, index) : 0;
  const dimmedOpacity = tileOpacity(dimmed);

  return (
    <motion.div
      key={inCellPhase ? `${index}-${colorFill.generation}` : String(index)}
      aria-hidden
      className="size-full min-h-0"
      initial={
        inCellPhase
          ? { backgroundColor: baseColor, opacity: dimmedOpacity }
          : false
      }
      animate={{
        backgroundColor: targetColor,
        opacity: filling ? 1 : dimmedOpacity,
      }}
      transition={{
        opacity: {
          duration: reducedMotion ? 0 : inCellPhase ? CASE_STUDY_CELL_FILL_S * 0.85 : TILE_DIM_DURATION_S,
          delay: reducedMotion ? 0 : fillDelay,
          ease: CASE_STUDY_MOTION_EASE,
        },
        backgroundColor: {
          duration: reducedMotion ? 0 : inCellPhase ? CASE_STUDY_CELL_FILL_S : TILE_DIM_DURATION_S * 0.85,
          delay: reducedMotion ? 0 : fillDelay,
          ease: CASE_STUDY_MOTION_EASE,
        },
      }}
    />
  );
}

function LogoMark({ cell }: { cell: LogoCellData }) {
  const { logo } = cell;
  return (
    <span
      aria-hidden
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: `min(${logo.width}cqw, ${logo.width}cqh)`,
        aspectRatio: `${logo.width} / ${logo.height}`,
      }}
    >
      {logo.layers.map((layer) => (
        <span key={layer.src} className="absolute" style={{ inset: layer.inset ?? 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG marks sized by their box */}
          <img src={layer.src} alt="" className="block size-full max-w-none" />
        </span>
      ))}
    </span>
  );
}

function LogoCell({
  cell,
  index,
  onCaseStudySelect,
  transitionActive,
}: {
  cell: LogoCellData;
  index: number;
  onCaseStudySelect?: (payload: CaseStudySelectPayload) => void;
  transitionActive: boolean;
}) {
  return (
    <TetrisEntryButton
      cell={cell}
      index={index}
      onCaseStudySelect={onCaseStudySelect}
      transitionActive={transitionActive}
      className="relative size-full overflow-hidden [container-type:size]"
    >
      <LogoMark cell={cell} />
    </TetrisEntryButton>
  );
}

/** Slides from its default-grid slot along an L-path when the tab opens; reverses on exit. */
function TetrisEntryButton({
  cell,
  index,
  onCaseStudySelect,
  transitionActive,
  className,
  children,
}: {
  cell: { color: string; label: string; slug: string };
  index: number;
  onCaseStudySelect?: (payload: CaseStudySelectPayload) => void;
  transitionActive: boolean;
  className: string;
  children: React.ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const origin = LOGO_ORIGIN_INDEX[cell.slug] ?? index;
  const delta = gridSlotDelta(origin, index);
  const start = gridTranslate(delta.col, delta.row);
  const delay = reducedMotion ? 0 : logoShuffleDelay(cell.slug);

  return (
    <motion.button
      type="button"
      aria-label={cell.label}
      data-slug={cell.slug}
      className={`${className} hover:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1e1e1e]`}
      style={{ backgroundColor: cell.color }}
      onClick={(event) => {
        if (transitionActive) return;
        const slot = event.currentTarget.parentElement ?? event.currentTarget;
        onCaseStudySelect?.({
          slug: cell.slug,
          cellIndex: index,
          color: cell.color,
          originRect: slot.getBoundingClientRect(),
        });
      }}
      whileHover={reducedMotion || transitionActive ? undefined : { scale: CASE_STUDY_HOVER_SCALE }}
      initial={reducedMotion ? false : { x: start.x, y: start.y, opacity: 1 }}
      animate={{
        x: "0px",
        y: "0px",
        opacity: transitionActive ? 0 : 1,
      }}
      exit={
        reducedMotion
          ? { opacity: 0, transition: { duration: 0 } }
          : {
              x: start.x,
              y: start.y,
              opacity: 1,
              transition: tetrisExitAxisTransition(delta, delay * 0.35),
            }
      }
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              ...tetrisAxisTransition(delta, delay),
              scale: { duration: CASE_STUDY_HOVER_S, ease: CASE_STUDY_MOTION_EASE },
              opacity: {
                duration: transitionActive ? 0.22 : CASE_STUDY_CELL_FILL_S,
                ease: CASE_STUDY_MOTION_EASE,
              },
            }
      }
    >
      {children}
    </motion.button>
  );
}

const CASE_STUDY_LOGOS = CASE_STUDY_CELLS.flatMap((cell, index) =>
  cell.kind === "logo" ? [{ index, cell }] : [],
);
type KellyColorGridProps = {
  active: NavId | null;
  onSelect: (id: NavId | null) => void;
  onCaseStudySelect?: (payload: CaseStudySelectPayload) => void;
  hideNav?: boolean;
  colorFill?: ColorFillState;
  onGapFillComplete?: () => void;
};

export function KellyColorGrid({
  active,
  onSelect,
  onCaseStudySelect,
  hideNav = false,
  colorFill,
  onGapFillComplete,
}: KellyColorGridProps) {
  const reducedMotion = useReducedMotion();
  const showCaseStudies = active === "case-studies";
  const rippleActive = colorFill !== undefined;
  const closingGaps = colorFill?.phase === "gaps";
  const gap = closingGaps ? 0 : GRID_GAP_PX;
  const gapPx = `${gap}px`;
  const gapTransition = {
    duration: reducedMotion ? 0 : CASE_STUDY_GAP_FILL_S,
    ease: CASE_STUDY_MOTION_EASE,
  };

  return (
    <motion.section
      aria-label={showCaseStudies ? "Case studies" : "Color grid"}
      className="relative size-full overflow-hidden"
      initial={false}
      animate={{
        backgroundColor: closingGaps && colorFill ? colorFill.color : PANEL_BG,
      }}
      transition={{
        backgroundColor: {
          duration: reducedMotion ? 0 : CASE_STUDY_GAP_FILL_S,
          ease: CASE_STUDY_MOTION_EASE,
        },
      }}
    >
      <motion.div
        className="flex size-full flex-col"
        initial={false}
        animate={{ rowGap: gapPx, columnGap: gapPx }}
        transition={gapTransition}
        onAnimationComplete={() => {
          if (!closingGaps || reducedMotion) return;
          onGapFillComplete?.();
        }}
      >
        {Array.from({ length: GRID_SIZE }, (_, rowIndex) => (
          <motion.div
            key={rowIndex}
            className="grid min-h-0 flex-1 grid-cols-7"
            initial={false}
            animate={{ columnGap: gapPx, rowGap: gapPx }}
            transition={gapTransition}
          >
            {Array.from({ length: GRID_SIZE }, (_, colIndex) => {
              const index = rowIndex * GRID_SIZE + colIndex;
              const cell = baseCellAt(index, showCaseStudies);
              const dimmed = showCaseStudies && cell.kind === "tile";
              return (
                <TileCell
                  key={index}
                  index={index}
                  cell={cell}
                  dimmed={dimmed}
                  colorFill={colorFill}
                />
              );
            })}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 flex flex-col"
        initial={false}
        animate={{ rowGap: gapPx, columnGap: gapPx }}
        transition={gapTransition}
      >
        {Array.from({ length: GRID_SIZE }, (_, rowIndex) => (
          <motion.div
            key={rowIndex}
            className="grid min-h-0 flex-1 grid-cols-7"
            initial={false}
            animate={{ columnGap: gapPx, rowGap: gapPx }}
            transition={gapTransition}
          >
            {Array.from({ length: GRID_SIZE }, (_, colIndex) => {
              const index = rowIndex * GRID_SIZE + colIndex;
              const logoEntry = CASE_STUDY_LOGOS.find((logo) => logo.index === index);
              return (
                <div
                  key={index}
                  className={
                    logoEntry ? "pointer-events-auto size-full min-h-0" : "size-full min-h-0"
                  }
                  aria-hidden={!logoEntry}
                >
                  <AnimatePresence>
                    {showCaseStudies && logoEntry ? (
                      <LogoCell
                        key={logoEntry.cell.slug}
                        cell={logoEntry.cell}
                        index={index}
                        onCaseStudySelect={onCaseStudySelect}
                        transitionActive={rippleActive}
                      />
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        ))}
      </motion.div>

      {!hideNav ? <BottomNav active={active} onSelect={onSelect} /> : null}
    </motion.section>
  );
}
