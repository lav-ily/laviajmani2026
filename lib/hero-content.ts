/**
 * Site hero copy — single source for all breakpoints. Update here only;
 * do not mirror strings from Figma in components.
 */
export const HERO = {
  name: "Lavi Ajmani",
  isA: "is a",
  productDesigner: "product designer",
  symbol: "❋" as const,
  /** Used as one line on md+; split for mobile layout. */
  experience: "tinkering on web & mobile experiences",
  in: "in",
  city: "New York City.",
} as const;

/** Site-wide meta / OG description — same narrative as the hero. */
export const SITE_TAGLINE =
  "Product designer tinkering on web & mobile experiences in New York City.";

/** Splits `experience` at " & " for the mobile two-line layout (second line includes "&"). */
export function experienceLinesForMobile(experience: string): [string, string] {
  const m = /^(.*?)\s+&\s+(.+)$/.exec(experience);
  if (m == null) {
    return [experience, ""];
  }
  return [m[1]!.trim(), `& ${m[2]!.trim()}`];
}
