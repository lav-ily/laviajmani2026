"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { CaseStudySelectPayload } from "@/components/case-study-panel";
import { useGridLayout } from "@/components/grid-layout-context";
import {
  PANEL_BG,
  type ColorFillState,
  type GridEntryReveal,
} from "@/components/kelly-color-grid";
import type { LogoLayer } from "@/lib/kelly-color-grid";
import {
  CASE_STUDY_CELL_FILL_S,
  CASE_STUDY_GAP_FILL_S,
  CASE_STUDY_MOTION_EASE,
  caseStudyFillCellDelay,
  gridEntryRevealDelay,
} from "@/lib/kelly-grid-motion";
import { getPanelContent } from "@/lib/panel-content";

const ASSETS = "/images/mobile-cards";

/** Figma `220:12674` — five 92px cards with 2px gutters. */
export const MOBILE_CARDS_HEIGHT_PX = 468;

/** Card gutter; closes to 0 like the Kelly grid gutters once the ripple has filled every card. */
const CARD_GAP_PX = 2;

const CONTENT_FADE_OUT_S = 0.22;

/** Figma `220:12674` — logo box (px) and where the label starts, per card. */
const CARD_MARKS: Record<string, { width: number; height: number; textLeft: number; layers: ReadonlyArray<LogoLayer> }> = {
  delphi: { width: 49, height: 49, textLeft: 92, layers: [{ src: `${ASSETS}/delphi.svg` }] },
  dispo: { width: 44, height: 45, textLeft: 92, layers: [{ src: `${ASSETS}/dispo.svg` }] },
  hopin: { width: 50.25, height: 50.25, textLeft: 91, layers: [{ src: `${ASSETS}/hopin.svg` }] },
  bullpen: { width: 44, height: 32, textLeft: 94, layers: [{ src: `${ASSETS}/bullpen.svg` }] },
  "peachy-patients": {
    width: 57,
    height: 28,
    textLeft: 97,
    layers: [
      { src: `${ASSETS}/peachy-group.svg` },
      { src: `${ASSETS}/peachy-inner.svg`, inset: "17.62% 12.64% 20.3% 11.18%" },
    ],
  },
};

/** "New York, 2020—2021" → "2020—2021". */
function yearsFromLocation(location: string): string {
  return location.replace(/^[^,]*,\s*/, "");
}

type MobileCaseStudyCardsProps = {
  onCaseStudySelect?: (payload: CaseStudySelectPayload) => void;
  colorFill?: ColorFillState;
  onGapFillComplete?: () => void;
  entryReveal?: GridEntryReveal;
};

/**
 * Figma `220:12665` — mobile stand-in for the Kelly grid. Tapping a card plays the grid's open
 * sequence over the stack: its color ripples card to card, the gutters close, then the media fades in.
 */
export function MobileCaseStudyCards({
  onCaseStudySelect,
  colorFill,
  onGapFillComplete,
  entryReveal,
}: MobileCaseStudyCardsProps) {
  const reducedMotion = useReducedMotion();
  const layout = useGridLayout();
  const closingGaps = colorFill?.phase === "gaps";

  return (
    <motion.section
      aria-label="Case studies"
      className="flex size-full flex-col bg-white"
      initial={false}
      animate={{
        rowGap: `${closingGaps ? 0 : CARD_GAP_PX}px`,
        backgroundColor: closingGaps && colorFill ? colorFill.color : "#ffffff",
      }}
      transition={{ duration: reducedMotion ? 0 : CASE_STUDY_GAP_FILL_S, ease: CASE_STUDY_MOTION_EASE }}
      onAnimationComplete={() => {
        if (!closingGaps || reducedMotion) return;
        onGapFillComplete?.();
      }}
    >
      {layout.caseStudyCells.map((cell, index) => {
        if (cell.kind !== "logo") return null;
        const study = getPanelContent(cell.slug);
        const mark = CARD_MARKS[cell.slug];
        const filling = colorFill !== undefined;
        const fillDelay =
          colorFill?.phase === "cells"
            ? caseStudyFillCellDelay(layout, colorFill.originIndex, index)
            : entryReveal === "playing"
              ? gridEntryRevealDelay(layout, index)
              : 0;
        const delay = reducedMotion ? 0 : fillDelay;
        const hidden = entryReveal === "pending" || filling;

        return (
          <motion.button
            key={cell.slug}
            type="button"
            data-slug={cell.slug}
            className="relative min-h-0 w-full flex-1 overflow-hidden text-left font-body text-[16px] leading-normal text-white focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
            onClick={(event) => {
              if (filling) return;
              onCaseStudySelect?.({
                slug: cell.slug,
                cellIndex: index,
                color: cell.color,
                originRect: event.currentTarget.getBoundingClientRect(),
              });
            }}
            initial={entryReveal !== undefined ? { backgroundColor: PANEL_BG } : false}
            animate={{
              backgroundColor:
                entryReveal === "pending" ? PANEL_BG : filling ? colorFill.color : cell.color,
            }}
            transition={{
              duration: reducedMotion ? 0 : CASE_STUDY_CELL_FILL_S,
              delay,
              ease: CASE_STUDY_MOTION_EASE,
            }}
          >
            <motion.span
              className="absolute inset-0"
              initial={entryReveal !== undefined ? { opacity: 0 } : false}
              animate={{ opacity: hidden ? 0 : 1 }}
              transition={{
                duration: reducedMotion ? 0 : filling ? CONTENT_FADE_OUT_S : CASE_STUDY_CELL_FILL_S,
                delay: filling ? 0 : delay,
                ease: CASE_STUDY_MOTION_EASE,
              }}
            >
              {mark ? (
                <span
                  aria-hidden
                  className="absolute top-1/2 left-6 -translate-y-1/2"
                  style={{ width: mark.width, height: mark.height }}
                >
                  {mark.layers.map((layer) => (
                    <span key={layer.src} className="absolute" style={{ inset: layer.inset ?? 0 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG marks sized by their box */}
                      <img src={layer.src} alt="" className="block size-full max-w-none" />
                    </span>
                  ))}
                </span>
              ) : null}
              <span
                className="absolute top-1/2 flex -translate-y-1/2 flex-col whitespace-nowrap"
                style={{ left: mark?.textLeft ?? 92 }}
              >
                <span>{study?.title ?? cell.label}</span>
                {study ? <span>{yearsFromLocation(study.location)}</span> : null}
              </span>
            </motion.span>
          </motion.button>
        );
      })}
    </motion.section>
  );
}
