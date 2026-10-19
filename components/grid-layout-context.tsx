"use client";

import { createContext, useContext } from "react";

import { DEFAULT_GRID_LAYOUT, type GridLayout } from "@/lib/kelly-color-grid";

const GridLayoutContext = createContext<GridLayout>(DEFAULT_GRID_LAYOUT);

export const GridLayoutProvider = GridLayoutContext.Provider;

/** The Kelly grid layout for the current breakpoint. */
export function useGridLayout(): GridLayout {
  return useContext(GridLayoutContext);
}
