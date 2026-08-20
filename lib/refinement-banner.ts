export const REFINEMENT_BANNER_DISMISS_EVENT = "refinement-banner-dismiss";

export function dismissRefinementBanner() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(REFINEMENT_BANNER_DISMISS_EVENT));
}
