import Image from "next/image";

const UI = "/images/work/hopin-ui";

function Svg({
  src,
  className,
  width,
  height,
}: {
  src: string;
  className?: string;
  width: number;
  height: number;
}) {
  return (
    // Figma-exported vectors; skip Next Image so SVGs render as authored.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" width={width} height={height} className={className} />
  );
}

function DockButton({ src, highlight }: { src: string; highlight?: boolean }) {
  return (
    <div className="relative size-[24.319px] shrink-0 rounded-xl">
      <div className="absolute left-1/2 top-1/2 size-[23.79px] -translate-x-1/2 -translate-y-1/2">
        <Svg src={`${UI}/ellipse.svg`} width={24} height={24} className="size-full" />
      </div>
      {highlight ? (
        <div className="absolute left-1/2 top-1/2 size-[23.79px] -translate-x-1/2 -translate-y-1/2">
          <Svg src={src} width={24} height={24} className="size-full" />
        </div>
      ) : (
        <div className="absolute left-1/2 top-1/2 size-[14.803px] -translate-x-1/2 -translate-y-1/2 overflow-clip">
          <Svg src={src} width={15} height={15} className="size-full" />
        </div>
      )}
    </div>
  );
}

/** Composed from exported Figma assets — not a hand-drawn mockup. */
export function HopinPhone() {
  return (
    <div className="relative h-[429.277px] w-[198.25px] overflow-clip rounded-[15.86px] shadow-[-3.548px_-3.548px_53.214px_0px_rgba(140,140,140,0.25),3.548px_3.548px_53.214px_0px_rgba(140,140,140,0.25)]">
      <Image
        src="/images/work/hopin-room.png"
        alt=""
        fill
        sizes="198px"
        className="object-cover"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[64px] bg-gradient-to-b from-transparent to-black/60" />

      <div className="absolute inset-x-0 top-0 w-full overflow-clip bg-black/50 backdrop-blur-[10.573px]">
        <div className="relative h-[23.261px] w-full overflow-clip">
          <div className="absolute left-[41.24px] top-[-1.06px] h-[15.86px] w-[115.778px]">
            <Svg src={`${UI}/notch.svg`} width={116} height={16} className="size-full" />
          </div>
          <div className="absolute right-[7.76px] top-[9.16px] h-[5.993px] w-[35.242px]">
            <Svg src={`${UI}/status-right.svg`} width={35} height={6} className="size-full" />
          </div>
          <p className="absolute left-[11px] top-[6px] font-[family-name:var(--font-geist-sans)] text-[7.93px] font-semibold leading-[10.573px] tracking-[-0.5px] text-white">
            9:41
          </p>
        </div>
        <div className="flex items-center gap-[6.344px] overflow-clip p-[6.344px]">
          <div className="flex min-w-0 flex-1 items-center gap-[2.115px]">
            <span className="relative size-[16.917px] shrink-0 overflow-clip">
              <Svg src={`${UI}/apple.svg`} width={17} height={17} className="size-full" />
            </span>
            <p className="m-0 whitespace-nowrap font-[family-name:var(--font-geist-sans)] text-[8.46px] font-medium text-white">
              Design Webinar
            </p>
          </div>
          <div className="flex items-start gap-[6.344px]">
            <div className="flex items-center justify-center overflow-clip rounded-lg bg-white/20 px-[6.344px] py-[2.115px]">
              <span className="relative size-[12.688px] overflow-clip">
                <Svg src={`${UI}/volume.svg`} width={13} height={13} className="size-full" />
              </span>
            </div>
            <div className="flex items-center justify-center overflow-clip rounded-lg bg-[#ad0e18] px-[6.344px] py-[2.115px]">
              <span className="relative size-[12.688px] overflow-clip">
                <Svg src={`${UI}/logout.svg`} width={13} height={13} className="size-full" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-[6.34px] top-[118.42px] flex w-[185.562px] flex-col items-start gap-[8.459px]">
        <div className="relative h-[150.141px] w-full overflow-clip rounded-[6.344px] bg-[#dbdbe1] shadow-[0px_5.287px_9.516px_-12px_rgba(0,0,0,0.7),0px_0px_0px_1px_rgba(0,0,0,0.05)]">
          <Image
            src="/images/work/hopin-video.png"
            alt="Lavi Ajmani"
            fill
            sizes="186px"
            className="object-cover"
          />
          <div className="absolute bottom-[2.64px] left-[2.64px] flex items-center overflow-clip rounded bg-black/65 px-[2.643px] py-[0.529px]">
            <p className="m-0 whitespace-nowrap text-[5.82px] leading-[1.45] text-[#fafafc]">
              Lavi Ajmani
            </p>
          </div>
        </div>
        <div className="flex w-full items-center gap-[5.287px] rounded-[6.344px] bg-black/70 px-[8.459px] py-[5.287px] shadow-[0px_10.573px_13.217px_0px_rgba(0,0,0,0.1)] backdrop-blur-[10.573px]">
          <span className="relative size-[16.917px] shrink-0 overflow-clip">
            <Svg src={`${UI}/share.svg`} width={17} height={17} className="size-full" />
          </span>
          <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-[1.057px] text-white">
            <p className="m-0 w-full text-[8.987px] leading-[11.631px] tracking-[-0.22px]">
              Invite others
            </p>
            <p className="m-0 w-full text-[7.93px] leading-[10.573px] tracking-[-0.13px] opacity-70">
              https://meet-staging.session.com/la...
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[17.45px] left-1/2 flex w-[171.817px] -translate-x-1/2 items-center justify-between">
        <DockButton src={`${UI}/mic.svg`} />
        <DockButton src={`${UI}/video.svg`} />
        <DockButton src={`${UI}/reactions.svg`} highlight />
        <DockButton src={`${UI}/chat.svg`} />
        <DockButton src={`${UI}/participants.svg`} />
      </div>

      <div className="absolute bottom-0 left-1/2 h-[17.975px] w-full -translate-x-1/2">
        <div className="absolute bottom-[4.23px] left-1/2 h-[2.643px] w-[70.841px] -translate-x-1/2 rounded-full bg-white" />
      </div>
    </div>
  );
}
