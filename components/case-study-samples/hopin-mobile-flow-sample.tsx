import Image from "next/image";

import {
  AvatarSwirl,
  DECK_SHADOW,
  SampleSvg,
} from "@/components/case-study-samples/sample-stage";

const ASSETS = "/media/hopin/mobile";

const PHONE_SHADOW =
  "shadow-[-3.687px_-3.687px_55.311px_0px_rgba(140,140,140,0.25),3.687px_3.687px_55.311px_0px_rgba(140,140,140,0.25)]";
const CARD_SHADOW =
  "shadow-[0px_0.278px_0.278px_0px_rgba(0,0,0,0.05),0px_0px_0px_1px_rgba(0,0,0,0.07),0px_0.139px_0.278px_-0.5px_rgba(0,0,0,0.09)]";
const TILE_SHADOW = "shadow-[0px_2.678px_4.82px_-12px_rgba(0,0,0,0.7),0px_0px_0px_1px_rgba(0,0,0,0.05)]";
const AVATAR_SHADOW =
  "shadow-[0px_0.536px_1.339px_0px_rgba(0,0,0,0.05),0px_0.268px_0.803px_0px_rgba(0,0,0,0.2),0px_0px_0px_0.5px_rgba(0,0,0,0.1)]";
const KEY_SHADOW = "shadow-[0px_0.278px_0px_0px_rgba(0,0,0,0.3)]";

function Box({ src, className }: { src: string; className: string }) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <SampleSvg src={`${ASSETS}/${src}`} />
    </div>
  );
}

const STATUS_BAR_SIZES = {
  /** Figma `197:11915`. */
  large: {
    bar: "h-[12.246px]",
    notch: "top-[-0.56px] left-[21.71px] h-[8.35px] w-[60.953px]",
    right: "top-[4.82px] right-[4.08px] h-[3.155px] w-[18.553px]",
    time: "top-[0.93px] left-[1.86px] h-[5.845px] w-[15.03px]",
    text: "top-[0.28px] left-[7.51px] h-[5.567px] w-[15.03px] text-[4.17px] leading-[5.567px]",
  },
  /** Figma `197:11973`. */
  small: {
    bar: "h-[11.782px]",
    notch: "top-[-0.54px] left-[20.89px] h-[8.033px] w-[58.642px]",
    right: "top-[4.64px] right-[3.93px] h-[3.035px] w-[17.85px]",
    time: "top-[0.86px] left-[1.72px] h-[5.623px] w-[14.46px]",
    text: "top-[0.27px] left-[7.23px] h-[5.355px] w-[14.46px] text-[4.02px] leading-[5.355px]",
  },
} as const;

function StatusBar({
  size,
  notch,
  right,
  className = "absolute top-0 left-0 w-full",
}: {
  size: keyof typeof STATUS_BAR_SIZES;
  notch: string;
  right: string;
  className?: string;
}) {
  const s = STATUS_BAR_SIZES[size];
  return (
    <div className={`overflow-clip ${s.bar} ${className}`}>
      <div className={`absolute ${s.notch}`}>
        <SampleSvg src={`${ASSETS}/${notch}`} />
      </div>
      <div className={`absolute ${s.right}`}>
        <SampleSvg src={`${ASSETS}/${right}`} />
      </div>
      <div className={`absolute rounded-[24px] ${s.time}`}>
        <p
          className={`absolute -translate-x-1/2 text-center font-sf font-semibold tracking-[-0.5px] text-black ${s.text}`}
        >
          9:41
        </p>
      </div>
    </div>
  );
}

/** Figma `197:11931`–`197:11933`. */
function RoomCard({ title }: { title: string }) {
  return (
    <div className={`flex h-[57.057px] w-[97.414px] shrink-0 flex-col items-start overflow-clip rounded-[8px] bg-white ${CARD_SHADOW}`}>
      <div className="relative h-[38.966px] w-full shrink-0 overflow-clip">
        <Image src={`${ASSETS}/room-card.png`} alt="" fill sizes="98px" className="object-cover" />
      </div>
      <div className="flex w-full shrink-0 items-center overflow-clip p-[4.453px]">
        <div className="flex min-w-px flex-[1_0_0] items-center justify-between self-stretch">
          <p className="relative mr-[-33.5px] w-[87.672px] shrink-0 font-sf text-[4.73px] leading-[6.123px] tracking-[-0.408px] text-black">
            {title}
          </p>
          <div className="relative mr-[-33.5px] h-[9.09px] w-[10.576px] shrink-0" />
          <div className="relative flex h-full w-[8.906px] shrink-0 items-center justify-center rounded-[6px] bg-[#eeeef2] px-[1.336px] py-[2.449px]">
            <Box src="share.svg" className="h-[4.192px] w-[3.289px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function RoomsAction({ icon, label, color }: { icon: string; label: string; color: string }) {
  return (
    <div className="flex min-w-px flex-[1_0_0] items-center justify-center bg-white">
      <div
        className="flex h-[13.916px] min-w-px flex-[1_0_0] items-center justify-center gap-[1.113px] rounded-[2.227px] border-[0.278px] border-solid px-[1.67px] py-[1.113px]"
        style={{ backgroundColor: color, borderColor: color }}
      >
        <Box src={icon} className="size-[6.68px]" />
        <p className="font-sf text-[4.175px] leading-[normal] whitespace-nowrap text-white">{label}</p>
      </div>
    </div>
  );
}

/** Figma `197:11914` — Rooms, populated. */
function RoomsScreen() {
  return (
    <div className={`absolute top-[63px] left-[31px] h-[226px] w-[104.372px] overflow-clip rounded-[8.315px] bg-white ${PHONE_SHADOW}`}>
      <StatusBar size="large" notch="notch.svg" right="status-right.svg" />
      <div className="absolute top-[calc(50%-93.66px)] left-1/2 flex w-[104.372px] -translate-x-1/2 -translate-y-1/2 items-start justify-between overflow-clip px-[5.01px] py-[3.34px]">
        <div className="size-[5.567px] shrink-0" />
        <p className="font-sf text-[5.01px] leading-[normal] tracking-[0.0501px] whitespace-nowrap text-black">Rooms</p>
        <Box src="settings.svg" className="size-[5.567px]" />
      </div>
      <div className="absolute top-[29.5px] left-0 flex w-[104.372px] items-start gap-[4.453px] px-[4.175px]">
        <RoomsAction icon="icn-add.svg" label="Join a Session" color="#2ea6fd" />
        <RoomsAction icon="icn-video2.svg" label="Instant Session" color="#4e4e5b" />
      </div>
      <div className="absolute top-[48.71px] left-0 flex w-[104.372px] flex-col items-center gap-[5.01px] px-[3.897px]">
        <RoomCard title="AMA w/ Session Design Team" />
        <RoomCard title="Design Sync" />
        <RoomCard title="Session All-Hands" />
      </div>
    </div>
  );
}

const KEY_ROWS = {
  top: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  middle: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  bottom: ["Z", "X", "C", "V", "B", "N", "M"],
} as const;

function Key({ label, className = "flex-1" }: { label: string; className?: string }) {
  return (
    <div className={`relative h-[11.696px] min-w-0 ${className}`}>
      <div className={`absolute inset-0 rounded-[4.6px] bg-white ${KEY_SHADOW}`} />
      <p className="absolute top-1/2 right-0 left-0 -translate-y-1/2 text-center font-sf text-[6.13px] leading-[7.798px] tracking-[0.35px] text-black">
        {label}
      </p>
    </div>
  );
}

function SystemKey({ label, className }: { label: string; className: string }) {
  return (
    <div className={`relative h-[11.696px] ${className}`}>
      <div className={`absolute inset-0 rounded-[4.6px] ${KEY_SHADOW} ${label === "space" ? "bg-white" : "bg-[#adb3bc]"}`} />
      <p className="absolute top-1/2 right-0 left-0 -translate-y-1/2 text-center font-sf text-[4.46px] leading-[5.848px] tracking-[-0.32px] text-black">
        {label}
      </p>
    </div>
  );
}

/** Figma `197:11975` — iOS alphabetic keyboard. */
function Keyboard() {
  return (
    <div className="absolute top-[140.05px] left-0 h-[85.955px] w-[104.431px] bg-[rgba(209,213,219,0.9)] backdrop-blur-[15.14px]">
      <div className="absolute top-[2.23px] right-[1.39px] left-[1.39px] flex gap-[1.389px]">
        {KEY_ROWS.top.map((key) => (
          <Key key={key} label={key} />
        ))}
      </div>
      <div className="absolute top-[17.27px] right-[6.41px] left-[6.68px] flex gap-[1.39px]">
        {KEY_ROWS.middle.map((key) => (
          <Key key={key} label={key} />
        ))}
      </div>
      <div className="absolute top-[32.86px] right-[1.11px] left-[1.39px] h-[11.696px]">
        <div className="absolute top-0 left-0 size-[11.696px]">
          <div className="absolute inset-[0_0_-2.38%_0]">
            <SampleSvg src={`${ASSETS}/key-shift.svg`} />
          </div>
        </div>
        <div className="absolute top-0 right-[15.6px] left-[15.6px] flex gap-[1.39px]">
          {KEY_ROWS.bottom.map((key) => (
            <Key key={key} label={key} />
          ))}
        </div>
        <div className="absolute top-0 right-0 size-[11.696px]">
          <div className="absolute inset-[0_0_-2.38%_0]">
            <SampleSvg src={`${ASSETS}/key-delete.svg`} />
          </div>
        </div>
      </div>
      <div className="absolute top-[48.46px] right-[1.39px] left-[1.39px] flex items-start gap-[1.671px]">
        <SystemKey label="123" className="w-[23.81px] shrink-0" />
        <SystemKey label="space" className="min-w-px flex-[1_0_0]" />
        <SystemKey label="return" className="w-[23.81px] shrink-0" />
      </div>
      <div className="absolute top-[64.89px] right-[6.68px] left-[6.68px] flex items-start justify-between">
        <Box src="icon-emoji.svg" className="size-[7.519px]" />
        <Box src="icon-dictation.svg" className="h-[6.962px] w-[4.177px]" />
      </div>
      <div className="absolute right-0 bottom-0 left-0 h-[9.468px]">
        <div className="absolute bottom-[2.23px] left-[calc(50%+0.14px)] h-[1.392px] w-[37.317px] -translate-x-1/2 rounded-[100px] bg-black" />
      </div>
    </div>
  );
}

function PillButton({ label, className, textClassName }: { label: string; className: string; textClassName: string }) {
  return (
    <div className={`relative h-[13.389px] shrink-0 overflow-clip rounded-[6.694px] ${className}`}>
      <p className={`font-sf text-[4.82px] leading-[6.427px] font-semibold tracking-[0.1018px] whitespace-nowrap ${textClassName}`}>
        {label}
      </p>
    </div>
  );
}

/** Figma `197:11934` — join a session with the keyboard up. */
function JoinSessionScreen() {
  return (
    <div className={`absolute top-[63px] left-[153.37px] h-[226px] w-[104.431px] overflow-clip rounded-[8px] bg-white ${DECK_SHADOW}`}>
      <div className="absolute top-[18.21px] left-[calc(50%+8.15px)] h-[12.139px] w-[56.528px] -translate-x-1/2">
        <SampleSvg src={`${ASSETS}/logo-text.svg`} />
      </div>
      <div className="absolute top-[19.11px] left-[calc(50%-29.71px)] size-[13.407px] -translate-x-1/2">
        <SampleSvg src={`${ASSETS}/logo-mark.svg`} />
      </div>
      <div className="absolute bottom-[8.57px] left-[calc(50%+0.13px)] flex -translate-x-1/2 flex-col items-center justify-center gap-[4.017px]">
        <PillButton label="Join a Session" className="flex w-[81.135px] items-center justify-center bg-[#2ea6fd]" textClassName="text-white" />
        <div className="h-[0.536px] w-[19.547px] shrink-0 rounded-[0.536px] bg-[#dbdbe1]" />
        <div className="flex items-center justify-center gap-[4.017px]">
          <PillButton label="Sign in" className="w-[38.559px] bg-[#f5f5f9]" textClassName="absolute top-[calc(50%-3.21px)] left-[calc(50%-7.9px)] text-[#4e4e5b]" />
          <PillButton label="Sign up" className="w-[38.559px] bg-[#f5f5f9]" textClassName="absolute top-[calc(50%-3.21px)] left-[calc(50%-8.84px)] text-[#4e4e5b]" />
        </div>
      </div>
      <div className="absolute top-0 left-0 h-[226px] w-[104.431px] bg-[rgba(22,21,35,0.3)]" />

      <div className="absolute top-0 left-0 flex w-[104.431px] flex-col items-start bg-[rgba(249,249,249,0.94)] drop-shadow-[0px_0.134px_0px_rgba(0,0,0,0.3)] backdrop-blur-[2.678px]">
        <div className="relative h-[15.531px] w-full shrink-0">
          <div
            className="absolute right-[4.28px] bottom-[3.75px] left-[4.28px] h-[2.678px] rounded-tl-[2.678px] rounded-tr-[2.678px]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.35) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)",
            }}
          />
          <div className="absolute inset-[0_0.12px_-0.13px_0]">
            <SampleSvg src={`${ASSETS}/nav-black-background.svg`} />
          </div>
        </div>
        <div className="flex h-[11.246px] w-full shrink-0 items-center">
          <div className="flex h-full min-w-px flex-[1_0_0] items-center gap-[1.339px] p-[2.142px]">
            <p className="font-sf text-[4.55px] leading-[5.891px] tracking-[-0.408px] whitespace-nowrap text-[#007aff]">Close</p>
          </div>
          <p className="min-w-px flex-[1_0_0] text-center font-sf text-[4.55px] leading-[5.891px] font-semibold tracking-[-0.408px] text-black">
            Sign In
          </p>
          <div className="flex h-full min-w-px flex-[1_0_0] items-center justify-end p-[2.142px]">
            <p className="text-right font-sf text-[4.55px] leading-[5.891px] tracking-[-0.408px] whitespace-nowrap text-[#007aff] opacity-0">
              Cancel
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 h-[125.853px] w-[104.431px] overflow-clip bg-white">
        <div className="absolute top-[47.93px] left-[6.43px] flex h-[18.209px] w-[91.578px] flex-col items-center justify-center gap-[1.071px]">
          <div className="relative min-h-px w-full flex-[1_0_0] overflow-clip">
            <p className="absolute top-[1.96px] right-0 left-0 -translate-y-1/2 font-sf text-[4.552px] leading-[normal] font-medium tracking-[0.0173px] text-[#050423]">
              Enter room URL to join
            </p>
          </div>
          <div className="flex w-full shrink-0 items-center overflow-clip rounded-[1.874px] bg-[#e4e4ea] p-[3.213px]">
            <p className="flex h-[4.284px] min-w-px flex-[1_0_0] items-center font-sf text-[4.552px] leading-[5.891px] tracking-[-0.1093px] text-[#161523]">
              session.com/coolguy/neatroom
            </p>
          </div>
        </div>
        <p className="absolute top-[36.33px] right-[16.87px] left-[6.43px] -translate-y-1/2 font-sf-rounded text-[7.498px] leading-[9.104px] font-bold text-[#1188df]">
          Join a Session
        </p>
        <div className="absolute top-[107.11px] left-[5.36px] flex h-[13.389px] w-[93.72px] items-center justify-center rounded-[2.41px] bg-[#1188df] px-[5.355px] py-[3.213px]">
          <p className="font-sf text-[4.82px] leading-[normal] font-semibold whitespace-nowrap text-white">Continue</p>
        </div>
        <div className="absolute top-[14.46px] left-[6.43px] size-[9.372px]">
          <SampleSvg src={`${ASSETS}/dialog-close.svg`} />
        </div>
      </div>

      <StatusBar size="small" notch="notch-1.svg" right="status-right-1.svg" />
      <Keyboard />
      <div className="absolute top-[125.85px] left-0 h-[14.203px] w-[104.431px] bg-[#d5d9de]" />
    </div>
  );
}

function DeviceToggle({
  icon,
  state,
  stateColor,
  label,
  stateInset,
  iconInset,
}: {
  icon: string;
  state: string;
  stateColor: string;
  label: string;
  stateInset: string;
  iconInset: string;
}) {
  return (
    <div className="relative h-[17.941px] w-[21.422px] shrink-0">
      <div className="absolute top-0 left-1/2 h-[12.853px] w-[10.711px] -translate-x-1/2">
        <div className={`absolute overflow-clip rounded-[40px] bg-white ${iconInset}`}>
          <div className="absolute top-[2.14px] left-[2.14px] size-[6.427px]">
            <SampleSvg src={`${ASSETS}/${icon}`} />
          </div>
        </div>
        <div
          className={`absolute flex items-center justify-center overflow-clip rounded-[10px] px-[0.803px] py-[0.268px] ${stateInset}`}
          style={{ backgroundColor: stateColor }}
        >
          <p className="h-[3.213px] text-center font-sf text-[2.95px] leading-[normal] font-bold text-white">{state}</p>
        </div>
      </div>
      <p className="absolute top-[14.46px] left-1/2 -translate-x-1/2 text-center font-sf text-[2.945px] leading-[normal] whitespace-nowrap text-white">
        {label}
      </p>
    </div>
  );
}

/** Figma `197:11977` — high-fidelity lobby. */
function LobbyScreen() {
  return (
    <div className={`absolute top-[63px] left-[275.8px] h-[226px] w-[104.431px] overflow-clip rounded-[8px] bg-gradient-to-b from-[#ffaf9d] from-[0.667%] to-[#cfbeff] ${DECK_SHADOW}`}>
      <div className="absolute top-0 left-0 h-[144.597px] w-[104.431px] overflow-clip">
        <div className="absolute top-[12.85px] left-[6.43px] size-[9.372px] overflow-clip rounded-[6.639px] bg-[#4e4e5b]">
          <div className="absolute top-[3.12px] left-[3.71px] h-[3.124px] w-[1.367px]">
            <div className="absolute inset-[-12.5%_-28.57%]">
              <SampleSvg src={`${ASSETS}/back-chevron.svg`} />
            </div>
          </div>
        </div>
        <StatusBar size="small" notch="notch-1.svg" right="status-right-1.svg" />
        <div className="absolute top-[27.58px] left-[6.43px] h-[116.213px] w-[91.578px] overflow-clip rounded-tl-[2.678px] rounded-tr-[2.678px] bg-[#c4c4c4] shadow-[0px_0.268px_0.268px_0px_rgba(0,0,0,0.05),0px_0px_0px_0.134px_rgba(0,0,0,0.02),0px_0.803px_1.339px_-0.268px_rgba(0,0,0,0.05),0px_2.678px_4.017px_-0.803px_rgba(0,0,0,0.3)]">
          <div className={`absolute top-0 left-0 h-[116.213px] w-[91.578px] overflow-clip rounded-[2.678px] bg-[#32323f] ${TILE_SHADOW}`}>
            <div className={`absolute top-1/2 left-1/2 size-[25.706px] -translate-x-1/2 -translate-y-1/2 overflow-clip rounded-[25.706px] bg-gradient-to-b from-[#ffaf9d] from-[0.667%] to-[#e3ffcd] ${AVATAR_SHADOW}`}>
              <AvatarSwirl src={`${ASSETS}/avatar-swirl.svg`} />
              <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-inter text-[10.44px] leading-[normal] font-semibold whitespace-nowrap text-[#161523]">
                GM
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-[111.39px] left-[6.43px] h-[28.384px] w-[91.578px] overflow-clip bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.5)]">
          <div className="absolute top-[3.48px] left-[23.3px] flex items-start gap-[2.41px]">
            <DeviceToggle
              icon="icn-mic.svg"
              state="ON"
              stateColor="#2ea6fd"
              label="Mic"
              iconInset="inset-[0_0_16.67%_0]"
              stateInset="inset-[70.83%_20%_0_20%]"
            />
            <DeviceToggle
              icon="icn-video-muted.svg"
              state="OFF"
              stateColor="#cd4951"
              label="Video"
              iconInset="inset-[0_0_17.53%_0]"
              stateInset="inset-[71.13%_15%_0_15%]"
            />
          </div>
        </div>
      </div>
      <div className="absolute top-[177.53px] left-[6.43px] h-[25.438px] w-[91.578px] bg-white" />
      <div className="absolute top-[139.78px] left-0 h-[86.223px] w-[104.431px] overflow-clip rounded-tl-[2.678px] rounded-tr-[2.678px] bg-white shadow-[0px_-0.268px_2.142px_0px_rgba(0,0,0,0.25)]">
        <p className="absolute top-[10.89px] right-[16.87px] left-[6.43px] -translate-y-1/2 font-sf-rounded text-[7.498px] leading-[9.104px] font-bold text-[#1188df]">
          Design Room
        </p>
        <div className="absolute top-[20.89px] left-[6.43px] flex h-[10.711px] w-[91.578px] items-center gap-[2.678px] overflow-clip rounded-[1.874px] bg-[#f5f5f9] p-[3.213px]">
          <p className="flex h-[4.284px] min-w-px flex-[1_0_0] items-center font-sf text-[4.552px] leading-[5.891px] tracking-[-0.1093px] text-[#161523]">
            Lavi
          </p>
          <Box src="edit.svg" className="size-[6.427px]" />
        </div>
        <div className="absolute top-[35.61px] left-[6.43px] flex h-[25.438px] w-[91.578px] items-center justify-between overflow-clip rounded-[1.874px] bg-[#f5f5f9] p-[3.213px]">
          <div className="flex shrink-0 flex-col items-start justify-center gap-[1.339px] overflow-clip pb-[0.803px] font-sf text-[4.552px] leading-[5.891px] tracking-[-0.1093px] text-[#161523]">
            <p className="w-[36.685px] font-semibold">Audio-only mode</p>
            <p className="w-[54.893px]">Optimal option for mobile. All video disabled.</p>
          </div>
          <div className="relative h-[8.301px] w-[13.656px] shrink-0">
            <div className="absolute inset-[-13.1%_-12.04%_-25.61%_0]">
              <SampleSvg src={`${ASSETS}/switch.svg`} />
            </div>
          </div>
        </div>
        <div className="absolute top-[66.94px] left-[5.36px] flex h-[13.389px] w-[93.72px] items-center justify-center rounded-[2.41px] bg-[#2ea6fd] px-[5.355px] py-[3.213px]">
          <p className="font-sf text-[4.82px] leading-[normal] font-semibold whitespace-nowrap text-white">Join</p>
        </div>
      </div>
    </div>
  );
}

function ControlButton({ icon, className, iconClassName }: { icon: string; className: string; iconClassName: string }) {
  return (
    <div className={`flex h-full shrink-0 items-center justify-center overflow-clip rounded-[1.339px] px-[6.427px] py-[3.749px] ${className}`}>
      <Box src={icon} className={iconClassName} />
    </div>
  );
}

function NameTag({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute bottom-[2.68px] left-[2.68px] flex items-center justify-center gap-[1.339px] overflow-clip rounded-[4px] bg-[rgba(0,0,0,0.65)] px-[1.339px] py-[0.268px]">
      {children}
    </div>
  );
}

const NAME_TAG_TEXT =
  "font-inter text-[3.48px] leading-[1.45] whitespace-nowrap text-[#fafafc] [text-shadow:0px_0.268px_0.268px_rgba(0,0,0,0.17)]";

/** Figma `197:12014` — in the room. */
function JoinRoomScreen() {
  return (
    <div className={`absolute top-[63px] left-[398.23px] h-[226px] w-[104.372px] overflow-clip rounded-[8.315px] bg-[#dbdbe1] ${PHONE_SHADOW}`}>
      <div className="absolute top-0 left-0 flex w-[104.431px] flex-col items-start gap-[0.536px] bg-[rgba(249,249,249,0.94)] drop-shadow-[0px_0.134px_0px_rgba(0,0,0,0.3)] backdrop-blur-[2.678px]">
        <StatusBar size="small" notch="notch-2.svg" right="status-right-2.svg" className="relative w-full shrink-0" />
        <div className="flex w-full shrink-0 items-center">
          <div className="min-w-px flex-[1_0_0] self-stretch" />
          <p className="min-w-px flex-[1_0_0] py-[2.41px] text-center font-sf text-[4.55px] leading-[5.891px] font-semibold tracking-[-0.408px] text-black">
            Design Room
          </p>
          <div className="min-w-px flex-[1_0_0] self-stretch" />
        </div>
      </div>
      <div className="absolute top-[216.9px] left-0 h-[9.104px] w-[104.431px] bg-[rgba(0,0,0,0.6)]">
        <div className="absolute bottom-[2.14px] left-[calc(50%+0.13px)] h-[1.339px] w-[35.882px] -translate-x-1/2 rounded-[100px] bg-[#161523]" />
      </div>
      <div className="absolute top-[200.83px] left-0 flex w-[104.431px] items-center justify-center overflow-clip bg-[rgba(0,0,0,0.6)] px-[6.427px] py-[2.945px]">
        <div className="flex h-[10.175px] shrink-0 items-center justify-center gap-[2.142px]">
          <ControlButton icon="icn-mic2.svg" className="w-[23.564px] bg-[#757580]" iconClassName="size-[6.427px]" />
          <ControlButton icon="icn-video.svg" className="w-[23.564px] bg-[#757580]" iconClassName="size-[7.498px]" />
          <ControlButton icon="icn-more.svg" className="w-[18.744px] bg-[#757580]" iconClassName="size-[6.427px]" />
          <ControlButton icon="icn-hang-up.svg" className="w-[23.564px] bg-[#cd4951]" iconClassName="size-[6.427px]" />
        </div>
      </div>
      <div className="absolute top-[23.56px] left-0 flex h-[177.265px] flex-col items-center justify-center gap-[3.213px] px-[5.355px] py-[6.427px]">
        <div className={`relative h-[81.671px] w-[93.72px] shrink-0 overflow-clip rounded-[12px] bg-[#dbdbe1] ${TILE_SHADOW}`}>
          <div className="absolute top-0 left-0 h-full w-[103.453px]">
            <Image src={`${ASSETS}/video-james.png`} alt="" fill sizes="104px" className="object-cover" />
          </div>
          <NameTag>
            <p className={NAME_TAG_TEXT}>You</p>
          </NameTag>
        </div>
        <div className={`relative h-[81.671px] w-[93.72px] shrink-0 overflow-clip rounded-[12px] bg-[#757580] ${TILE_SHADOW}`}>
          <div
            className={`absolute top-[calc(50%-0.13px)] left-1/2 size-[25.706px] -translate-x-1/2 -translate-y-1/2 overflow-clip rounded-[8px] ${AVATAR_SHADOW}`}
            style={{ backgroundImage: "linear-gradient(224.56deg, rgb(173, 221, 255) 2.3378%, rgb(255, 221, 169) 100.01%)" }}
          >
            <AvatarSwirl src={`${ASSETS}/avatar-swirl-2.svg`} />
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-inter text-[10.44px] leading-[normal] font-semibold whitespace-nowrap text-[#161523]">
              GM
            </p>
          </div>
          <NameTag>
            <Box src="icn-video-muted-mini.svg" className="size-[4.284px]" />
            <p className={NAME_TAG_TEXT}>Graeme Metcalf</p>
          </NameTag>
        </div>
      </div>
    </div>
  );
}

/** Figma `197:11913` — Session mobile: rooms, join, lobby, in-room. */
export function MobileFlowSample() {
  return (
    <div role="img" aria-label="Session mobile app: rooms, join a session, lobby, and in-room screens">
      <RoomsScreen />
      <JoinSessionScreen />
      <LobbyScreen />
      <JoinRoomScreen />
    </div>
  );
}
