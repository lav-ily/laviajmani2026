"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import type { NavId } from "@/components/bottom-nav";
import { CaseStudyMediaGrid } from "@/components/case-study-media-grid";
import { useGridLayout } from "@/components/grid-layout-context";
import { PanelHeroMedia } from "@/components/panel-hero-media";
import {
  KellyColorGrid,
  type ColorFillState,
  type GridEntryReveal,
} from "@/components/kelly-color-grid";
import {
  CASE_STUDY_GAP_FILL_S,
  CASE_STUDY_RIPPLE_HOLD_S,
  caseStudyFillCellsEndS,
  panelContentRippleEndS,
} from "@/lib/kelly-grid-motion";
import type { GridDims } from "@/lib/kelly-color-grid";
import { getPanelContent } from "@/lib/panel-content";

export type CaseStudySelectPayload = {
  slug: string;
  cellIndex: number;
  color: string;
  originRect: DOMRectReadOnly;
};

/** hold → fill-cells (ripple) → fill-gaps (gutters close) → content (bento fades in). */
type OpenStage = "hold" | "fill-cells" | "fill-gaps" | "content";

type OpenState = {
  slug: string;
  cellIndex: number;
  color: string;
  fillGeneration: number;
  stage: OpenStage;
};

type CaseStudyPanelProps = {
  active: NavId | null;
  onNavSelect: (id: NavId | null) => void;
  onOpen: (slug: string, cellIndex: number) => void;
  /** Start the open sequence on mount from this cell (About tab), without a tile click. */
  autoOpen?: { slug: string; cellIndex: number };
  entryReveal?: GridEntryReveal;
};

function stageDurationMs(dims: GridDims, open: OpenState): number | null {
  switch (open.stage) {
    case "hold":
      return CASE_STUDY_RIPPLE_HOLD_S * 1000;
    case "fill-cells":
      return caseStudyFillCellsEndS(dims, open.cellIndex) * 1000;
    case "fill-gaps":
      return CASE_STUDY_GAP_FILL_S * 1000 + 32;
    case "content":
      return null;
  }
}

const NEXT_STAGE: Record<Exclude<OpenStage, "content">, OpenStage> = {
  hold: "fill-cells",
  "fill-cells": "fill-gaps",
  "fill-gaps": "content",
};

export function CaseStudyPanel({
  active,
  onNavSelect,
  onOpen,
  autoOpen,
  entryReveal,
}: CaseStudyPanelProps) {
  const reducedMotion = useReducedMotion();
  const layout = useGridLayout();
  const [open, setOpen] = useState<OpenState | null>(() => {
    const content = autoOpen ? getPanelContent(autoOpen.slug) : undefined;
    if (!autoOpen || !content) return null;
    return {
      slug: autoOpen.slug,
      cellIndex: autoOpen.cellIndex,
      color: content.panelColor,
      fillGeneration: 1,
      stage: reducedMotion ? "content" : "hold",
    };
  });
  const [gridMounted, setGridMounted] = useState(() => !(autoOpen && reducedMotion));
  const fillGenerationRef = useRef(autoOpen ? 1 : 0);

  const study = open ? getPanelContent(open.slug) : undefined;

  const advanceStage = useCallback((from: OpenStage) => {
    if (from === "content") return;
    setOpen((current) =>
      current?.stage === from ? { ...current, stage: NEXT_STAGE[from] } : current,
    );
  }, []);

  useEffect(() => {
    if (!open || reducedMotion) return;
    const ms = stageDurationMs(layout, open);
    if (ms === null) return;
    const id = window.setTimeout(() => advanceStage(open.stage), ms);
    return () => window.clearTimeout(id);
  }, [advanceStage, layout, open, reducedMotion]);

  useEffect(() => {
    if (open?.stage !== "content" || !gridMounted) return;
    const ms = open
      ? panelContentRippleEndS(layout, open.cellIndex, study?.mediaLayout) * 1000 + 48
      : 200;
    const id = window.setTimeout(() => setGridMounted(false), ms);
    return () => window.clearTimeout(id);
  }, [gridMounted, layout, open, study?.mediaLayout]);

  const handleGapFillComplete = useCallback(() => advanceStage("fill-gaps"), [advanceStage]);

  const handleCaseStudySelect = useCallback(
    (payload: CaseStudySelectPayload) => {
      const selected = getPanelContent(payload.slug);
      if (open || !selected) return;

      fillGenerationRef.current += 1;
      setOpen({
        slug: payload.slug,
        cellIndex: payload.cellIndex,
        color: selected.panelColor,
        fillGeneration: fillGenerationRef.current,
        stage: reducedMotion ? "content" : "hold",
      });
      setGridMounted(!reducedMotion);
      onOpen(payload.slug, payload.cellIndex);
    },
    [onOpen, open, reducedMotion],
  );

  const colorFill: ColorFillState | undefined =
    open && open.stage !== "hold"
      ? {
          color: open.color,
          originIndex: open.cellIndex,
          generation: open.fillGeneration,
          phase: open.stage === "fill-cells" ? "cells" : "gaps",
        }
      : undefined;

  return (
    <section className="relative size-full overflow-hidden bg-[var(--color-grid-panel)]">
      {open === null || gridMounted ? (
        <div className="absolute inset-0 z-10">
          <KellyColorGrid
            active={active}
            onSelect={onNavSelect}
            onCaseStudySelect={handleCaseStudySelect}
            hideNav={open !== null}
            colorFill={colorFill}
            onGapFillComplete={handleGapFillComplete}
            entryReveal={entryReveal}
          />
        </div>
      ) : null}

      {open && study && open.stage === "content" ? (
        study.mediaLayout === "hero" ? (
          <PanelHeroMedia
            panelColor={study.panelColor}
            blockColor={study.blockColor}
            originIndex={open.cellIndex}
            fillGeneration={open.fillGeneration}
            mediaSrc={study.heroMediaSrc}
            title={study.title}
          />
        ) : (
          <CaseStudyMediaGrid
            slug={open.slug}
            panelColor={study.panelColor}
            blockColor={study.blockColor}
            originIndex={open.cellIndex}
            fillGeneration={open.fillGeneration}
          />
        )
      ) : null}
    </section>
  );
}
