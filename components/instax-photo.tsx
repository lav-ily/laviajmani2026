/* eslint-disable @next/next/no-img-element -- Figma-exported SVG layers, rendered as authored */
import Image from "next/image";

/** Figma `instax-mini` geometry in card space (625:16670, 625:16680). */
const CARD = { width: 216, height: 344, radius: 10 };
const EDGE = { offset: 1, width: 218, height: 346 };
const WELL = { x: 16, y: 16.26, width: 184, height: 248, radius: 4 };
const HAIRLINE = { offset: 0.5, width: 185, height: 249 };
const CAPTION = { y: 285.67, width: 165, fontSize: 10 };

/** Figma effect style `Drop shadows/Shadow 5`. */
const CARD_SHADOW =
  "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1), 0 4px 4px 0 rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)";

const ART = "/images/about";

interface InstaxPhotoProps {
  src: string;
  alt: string;
  caption: string;
  /** Tilt in degrees, as composed in the About container. */
  rotate: number;
  /** Card width; the Figma design is drawn at 216. */
  width?: number;
  /** Caption box width — differs slightly per card in the design. */
  captionWidth?: number;
  className?: string;
}

export function InstaxPhoto({
  src,
  alt,
  caption,
  rotate,
  width = CARD.width,
  captionWidth = CAPTION.width,
  className = "",
}: InstaxPhotoProps) {
  const scale = width / CARD.width;
  const px = (value: number) => `${value * scale}px`;

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{
        width: px(CARD.width),
        height: px(CARD.height),
        borderRadius: px(CARD.radius),
        boxShadow: CARD_SHADOW,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <img src={`${ART}/instax-vector.svg`} alt="" className="absolute inset-0 block size-full" />
      <img
        src={`${ART}/instax-vector-border.svg`}
        alt=""
        className="absolute block max-w-none"
        style={{
          left: px(-EDGE.offset),
          top: px(-EDGE.offset),
          width: px(EDGE.width),
          height: px(EDGE.height),
        }}
      />

      <div
        className="absolute overflow-clip bg-white"
        style={{
          left: px(WELL.x),
          top: px(WELL.y),
          width: px(WELL.width),
          height: px(WELL.height),
          borderRadius: px(WELL.radius),
        }}
      >
        <img src={`${ART}/instax-frame-a.svg`} alt="" className="absolute inset-0 block size-full" />
        <img
          src={`${ART}/instax-frame-b.svg`}
          alt=""
          className="absolute block max-w-none"
          style={{
            left: px(-HAIRLINE.offset),
            top: px(-HAIRLINE.offset),
            width: px(HAIRLINE.width),
            height: px(HAIRLINE.height),
          }}
        />
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${Math.ceil(WELL.width * scale)}px`}
          className="object-cover"
        />
        <img
          src={`${ART}/instax-frame-c.svg`}
          alt=""
          className="pointer-events-none absolute inset-0 block size-full"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            borderRadius: "inherit",
            boxShadow: `inset ${px(1)} ${px(1)} ${px(8)} ${px(4)} rgba(0,0,0,0.05)`,
          }}
        />
      </div>

      <p
        className="absolute left-1/2 m-0 -translate-x-1/2 text-pretty text-center font-serif-display leading-normal text-[#666]"
        style={{
          top: px(CAPTION.y),
          width: px(captionWidth),
          fontSize: px(CAPTION.fontSize),
        }}
      >
        {caption}
      </p>
    </div>
  );
}
