"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { CaseStudySelectPayload } from "@/components/case-study-panel";
import { BottomNav, type NavId } from "@/components/bottom-nav";
import { useGridLayout } from "@/components/grid-layout-context";
import {
  CASE_STUDY_CELL_FILL_S,
  CASE_STUDY_GAP_FILL_S,
  CASE_STUDY_HOVER_S,
  CASE_STUDY_HOVER_SCALE,
  CASE_STUDY_MOTION_EASE,
  caseStudyFillCellDelay,
  gridEntryRevealDelay,
  gridSlotDelta,
  gridTranslate,
  GRID_GAP_PX,
  logoShuffleDelay,
  tetrisAxisTransition,
  tetrisExitAxisTransition,
  TILE_DIM_DURATION_S,
} from "@/lib/kelly-grid-motion";
import type { GridCell, GridLayout } from "@/lib/kelly-color-grid";

type LogoCellData = Extract<GridCell, { kind: "logo" }>;

/**
 * Landing entry: `pending` holds every tile at the panel color until the grid is measured and
 * shown; `playing` fills them in from the top-right corner. Omit once the entry has played.
 */
export type GridEntryReveal = "pending" | "playing";

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

function baseCellAt(layout: GridLayout, index: number, showCaseStudies: boolean): GridCell {
  const cell = (showCaseStudies ? layout.caseStudyCells : layout.defaultCells)[index];
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
  entryReveal,
}: {
  cell: GridCell;
  index: number;
  dimmed: boolean;
  colorFill?: ColorFillState;
  entryReveal?: GridEntryReveal;
}) {
  const reducedMotion = useReducedMotion();
  const layout = useGridLayout();
  const baseColor = cell.kind === "empty" ? PANEL_BG : cell.color;
  const filling = colorFill !== undefined;
  const inCellPhase = filling && colorFill.phase === "cells";
  const targetColor = entryReveal === "pending" ? PANEL_BG : filling ? colorFill.color : baseColor;
  const fillDelay = inCellPhase
    ? caseStudyFillCellDelay(layout, colorFill.originIndex, index)
    : entryReveal === "playing"
      ? gridEntryRevealDelay(layout, index)
      : 0;
  const colorDuration =
    inCellPhase || entryReveal !== undefined ? CASE_STUDY_CELL_FILL_S : TILE_DIM_DURATION_S * 0.85;
  const dimmedOpacity = tileOpacity(dimmed);

  return (
    <motion.div
      key={inCellPhase ? `${index}-${colorFill.generation}` : String(index)}
      aria-hidden
      className="size-full min-h-0"
      initial={
        inCellPhase
          ? { backgroundColor: baseColor, opacity: dimmedOpacity }
          : entryReveal !== undefined
            ? { backgroundColor: PANEL_BG, opacity: dimmedOpacity }
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
          duration: reducedMotion ? 0 : colorDuration,
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
  playEntry,
}: {
  cell: LogoCellData;
  index: number;
  onCaseStudySelect?: (payload: CaseStudySelectPayload) => void;
  transitionActive: boolean;
  playEntry: boolean;
}) {
  return (
    <TetrisEntryButton
      cell={cell}
      index={index}
      onCaseStudySelect={onCaseStudySelect}
      transitionActive={transitionActive}
      playEntry={playEntry}
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
  playEntry,
  className,
  children,
}: {
  cell: { color: string; label: string; slug: string };
  index: number;
  onCaseStudySelect?: (payload: CaseStudySelectPayload) => void;
  transitionActive: boolean;
  /** False when remounting for a new layout mid-session, so logos don't slide in again. */
  playEntry: boolean;
  className: string;
  children: React.ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const layout = useGridLayout();
  const origin = layout.logoOrigins[cell.slug] ?? index;
  const delta = gridSlotDelta(layout, origin, index);
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
      initial={reducedMotion || !playEntry ? false : { x: start.x, y: start.y, opacity: 1 }}
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

type KellyColorGridProps = {
  active: NavId | null;
  onSelect: (id: NavId | null) => void;
  onCaseStudySelect?: (payload: CaseStudySelectPayload) => void;
  hideNav?: boolean;
  colorFill?: ColorFillState;
  onGapFillComplete?: () => void;
  entryReveal?: GridEntryReveal;
};

export function KellyColorGrid({
  active,
  onSelect,
  onCaseStudySelect,
  hideNav = false,
  colorFill,
  onGapFillComplete,
  entryReveal,
}: KellyColorGridProps) {
  const reducedMotion = useReducedMotion();
  const layout = useGridLayout();
  const showCaseStudies = active === "case-studies";
  const rippleActive = colorFill !== undefined;
  const logoByIndex = useMemo(
    () =>
      new Map(
        layout.caseStudyCells.flatMap((cell, index) =>
          cell.kind === "logo" ? [[index, cell] as const] : [],
        ),
      ),
    [layout],
  );

  // Logos slide in only when Case Studies opens, not when a resize swaps the layout under them.
  const [entryLayoutId, setEntryLayoutId] = useState(layout.id);
  const [prevShowCaseStudies, setPrevShowCaseStudies] = useState(showCaseStudies);
  if (prevShowCaseStudies !== showCaseStudies) {
    setPrevShowCaseStudies(showCaseStudies);
    if (showCaseStudies) setEntryLayoutId(layout.id);
  }
  const playLogoEntry = entryLayoutId === layout.id;
  const gridTemplateColumns = `repeat(${layout.cols}, minmax(0, 1fr))`;
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
        {Array.from({ length: layout.rows }, (_, rowIndex) => (
          <motion.div
            key={`${layout.id}-${rowIndex}`}
            className="grid min-h-0 flex-1"
            style={{ gridTemplateColumns }}
            initial={false}
            animate={{ columnGap: gapPx, rowGap: gapPx }}
            transition={gapTransition}
          >
            {Array.from({ length: layout.cols }, (_, colIndex) => {
              const index = rowIndex * layout.cols + colIndex;
              const cell = baseCellAt(layout, index, showCaseStudies);
              const dimmed = showCaseStudies && cell.kind === "tile";
              return (
                <TileCell
                  key={index}
                  index={index}
                  cell={cell}
                  dimmed={dimmed}
                  colorFill={colorFill}
                  entryReveal={entryReveal}
                />
              );
            })}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        key={layout.id}
        className="pointer-events-none absolute inset-0 flex flex-col"
        initial={false}
        animate={{ rowGap: gapPx, columnGap: gapPx }}
        transition={gapTransition}
      >
        {Array.from({ length: layout.rows }, (_, rowIndex) => (
          <motion.div
            key={rowIndex}
            className="grid min-h-0 flex-1"
            style={{ gridTemplateColumns }}
            initial={false}
            animate={{ columnGap: gapPx, rowGap: gapPx }}
            transition={gapTransition}
          >
            {Array.from({ length: layout.cols }, (_, colIndex) => {
              const index = rowIndex * layout.cols + colIndex;
              const logo = logoByIndex.get(index);
              return (
                <div
                  key={index}
                  className={logo ? "pointer-events-auto size-full min-h-0" : "size-full min-h-0"}
                  aria-hidden={!logo}
                >
                  <AnimatePresence>
                    {showCaseStudies && logo ? (
                      <LogoCell
                        key={logo.slug}
                        cell={logo}
                        index={index}
                        onCaseStudySelect={onCaseStudySelect}
                        transitionActive={rippleActive}
                        playEntry={playLogoEntry}
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
