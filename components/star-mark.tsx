type StarVariant = "default" | "muted";

const STAR_SRC: Record<StarVariant, string> = {
  default: "/icons/star.svg",
  muted: "/icons/star-muted.svg",
};

export function StarMark({
  className = "size-[38px]",
  variant = "default",
}: {
  className?: string;
  variant?: StarVariant;
}) {
  return (
    // Figma-exported glyph; <img> so Next Image does not rewrite the SVG.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={STAR_SRC[variant]}
      alt=""
      className={`block size-full max-w-none ${className}`}
      width={38}
      height={38}
    />
  );
}
