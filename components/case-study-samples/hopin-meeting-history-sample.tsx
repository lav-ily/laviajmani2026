import Image from "next/image";

import {
  AvatarSwirl,
  DECK_SHADOW,
  SampleSvg,
} from "@/components/case-study-samples/sample-stage";

const ASSETS = "/media/hopin/desktop";

type Meeting = {
  title: string;
  dimmed?: boolean;
  requestAccess?: boolean;
  photo?: boolean;
  chat?: boolean;
};

const MORNING = "Morning meeting with Graeme & Lavi";

/** Figma `197:12325` / `197:12333`. */
const DAYS: ReadonlyArray<{ label: string; meetings: ReadonlyArray<Meeting> }> = [
  {
    label: "Wednesday, June 24, 2021",
    meetings: [
      { title: MORNING, photo: true, chat: true },
      {
        title: "Evening presentation with Johnny, Armando & Kelly",
        dimmed: true,
        requestAccess: true,
        photo: true,
        chat: true,
      },
      { title: MORNING, dimmed: true, requestAccess: true },
      { title: MORNING, photo: true },
    ],
  },
  {
    label: "Thursday, June 25, 2021",
    meetings: [
      { title: MORNING, photo: true },
      { title: MORNING, chat: true },
      { title: MORNING, photo: true, chat: true },
      { title: MORNING },
    ],
  },
];

const BODY = "font-inter text-[5.14px] leading-[normal] whitespace-nowrap text-[#161523]";

function Icon({ src, className = "size-[7.907px]" }: { src: string; className?: string }) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      <SampleSvg src={src} />
    </div>
  );
}

function Indicators({ photo, chat }: Pick<Meeting, "photo" | "chat">) {
  if (!photo && !chat) {
    return <div className="h-[7.907px] w-[18.186px] shrink-0" />;
  }
  return (
    <div className="flex shrink-0 items-start gap-[2.372px] overflow-clip">
      {photo ? <Icon src={`${ASSETS}/icn-photo.svg`} /> : null}
      {chat ? <Icon src={`${ASSETS}/icn-chat-filled.svg`} /> : null}
    </div>
  );
}

function MeetingRow({ meeting }: { meeting: Meeting }) {
  const { title, dimmed, requestAccess, photo, chat } = meeting;
  return (
    <div className="flex w-[256.977px] shrink-0 items-start justify-between rounded-[4px] bg-[#fafafc] px-[4.744px] py-[6.326px]">
      <div className={`flex shrink-0 items-start gap-[4.744px] ${dimmed ? "opacity-50" : ""}`}>
        <div className="relative h-[15.814px] w-[19.767px] shrink-0 overflow-clip rounded-[4px]">
          <Image src={`${ASSETS}/meeting-thumb.png`} alt="" fill sizes="20px" className="object-cover" />
          <div className="absolute bottom-[0.59px] left-[calc(50%-0.12px)] h-[1.186px] w-[5.485px] -translate-x-1/2 rounded-[15px] bg-[rgba(22,21,35,0.4)]" />
        </div>
        <div className="flex shrink-0 flex-col items-start gap-[2.372px]">
          <p className={`${BODY} font-semibold`}>{title}</p>
          <div className="flex shrink-0 items-center gap-[3.163px]">
            <p className={`${BODY} tracking-[0.0514px]`}>Exec AMAs</p>
            <Icon src={`${ASSETS}/dot.svg`} className="size-[1.186px]" />
            <p className={`${BODY} tracking-[0.0514px]`}>June 24, 3:10 PM</p>
            <Icon src={`${ASSETS}/dot.svg`} className="size-[1.186px]" />
            <p className={`${BODY} tracking-[0.0514px]`}>30m</p>
          </div>
        </div>
      </div>
      {requestAccess ? (
        <div className="flex shrink-0 items-start gap-[3.953px]">
          <div className="flex shrink-0 items-center justify-center rounded-[3px] border-[0.395px] border-solid border-[#c6c6cd] bg-white px-[3.163px] py-[1.977px]">
            <p className={BODY}>Request access</p>
          </div>
          {photo || chat ? <Indicators photo={photo} chat={chat} /> : null}
        </div>
      ) : (
        <Indicators photo={photo} chat={chat} />
      )}
    </div>
  );
}

function FilterChip({ icon, label, gap }: { icon: string; label: string; gap: string }) {
  return (
    <div className="flex h-[12.651px] shrink-0 items-center justify-center gap-[3.163px] overflow-clip rounded-[1.581px] bg-[#f5f5f9] px-[2.767px] py-[0.791px]">
      <div className="relative size-[5.535px] shrink-0">
        <div className="absolute inset-[0_-4.2%_-4.2%_0]">
          <SampleSvg src={`${ASSETS}/check-box.svg`} />
        </div>
      </div>
      <div className="flex shrink-0 items-center" style={{ gap }}>
        <Icon src={icon} />
        <p className={`${BODY} text-[#4e4e5b]`}>{label}</p>
      </div>
    </div>
  );
}

/** Figma `197:12322` — Session desktop meeting history. */
export function MeetingHistorySample() {
  return (
    <div
      role="img"
      aria-label="Session desktop app showing meeting history"
      className={`absolute top-[calc(50%+46px)] left-[calc(50%+0.42px)] h-[391px] w-[446.349px] -translate-x-1/2 -translate-y-1/2 overflow-clip rounded-[10px] bg-white ${DECK_SHADOW}`}
    >
      <div className="absolute top-[83.81px] left-[136.4px] flex w-[256.977px] flex-col items-start gap-[12.651px]">
        {DAYS.map((day) => (
          <div key={day.label} className="flex w-full shrink-0 flex-col items-start gap-[4.744px] overflow-clip">
            <p className={`${BODY} text-[#757580]`}>{day.label}</p>
            <div className="flex w-full shrink-0 flex-col items-start gap-[3.163px]">
              {day.meetings.map((meeting, index) => (
                <MeetingRow key={index} meeting={meeting} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-[22.14px] bottom-0 left-0 w-[84.209px] overflow-clip border-[0.395px] border-solid border-[rgba(22,21,35,0.1)] bg-[#fafafc]">
        <div className="absolute top-[8.7px] right-[6.33px] left-[6.33px] flex h-[52.186px] flex-col items-start gap-[3.163px]">
          <div className="flex w-full shrink-0 items-center gap-[3.163px] overflow-clip rounded-[5px] bg-[#fafafc] p-[3.163px]">
            <div className="relative size-[7.907px] shrink-0 overflow-clip">
              <div className="absolute top-1/2 left-1/2 h-[6.326px] w-[7.116px] -translate-x-1/2 -translate-y-1/2">
                <SampleSvg src={`${ASSETS}/icn-rooms.svg`} />
              </div>
            </div>
            <p className={`${BODY} font-medium text-[#4e4e5b]`}>Rooms</p>
          </div>
          <div className="flex w-full shrink-0 items-center gap-[3.163px] overflow-clip rounded-[5px] bg-[#dbdbe1] p-[3.163px]">
            <Icon src={`${ASSETS}/icn-history.svg`} />
            <p className={`${BODY} font-semibold`}>History</p>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 h-[22.14px] w-[446.349px] overflow-clip bg-white shadow-[inset_0px_-0.395px_0px_0px_#e4e4ea]">
        <div className="absolute top-1/2 left-[9.49px] h-[9.488px] w-[44.279px] -translate-y-1/2 overflow-clip">
          <div className="absolute top-[calc(50%+0.1px)] left-[14.4px] h-[6.951px] w-[27.997px] -translate-y-1/2">
            <SampleSvg src={`${ASSETS}/wordmark.svg`} />
          </div>
          <div className="absolute top-[calc(50%+0.14px)] left-[0.1px] h-[7.165px] w-[12.13px] -translate-y-1/2">
            <SampleSvg src={`${ASSETS}/swirl.svg`} />
          </div>
        </div>
        <div className="absolute top-1/2 right-[2.37px] h-[17.395px] w-[24.512px] -translate-y-1/2 rounded-[7px]">
          <div className="absolute top-1/2 right-[3.56px] flex -translate-y-1/2 items-center justify-center gap-[3.163px]">
            <div
              className="relative size-[12.651px] shrink-0 overflow-clip rounded-[2.4px]"
              style={{
                backgroundImage:
                  "linear-gradient(224.56deg, rgb(255, 175, 157) 2.3378%, rgb(255, 221, 169) 100.01%)",
              }}
            >
              <AvatarSwirl src={`${ASSETS}/avatar-swirl.svg`} />
              <p className="absolute top-1/2 left-1/2 w-[12.651px] -translate-x-1/2 -translate-y-1/2 text-center font-inter text-[5.14px] leading-[normal] font-semibold text-black">
                GM
              </p>
            </div>
            <div className="flex shrink-0 rotate-180 -scale-y-100 items-center justify-center">
              <div className="relative h-[1.186px] w-[2.767px]">
                <div className="absolute inset-[-16.67%_-7.14%]">
                  <SampleSvg src={`${ASSETS}/chevron-down.svg`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-[41.12px] left-[136.4px] h-[33.209px] w-[256.977px] overflow-clip">
        <p className="absolute top-0 right-[103.19px] left-0 font-inter text-[9.488px] leading-[normal] font-medium text-[#161523]">
          Meeting history
        </p>
        <div className="absolute top-[14.23px] right-0 left-0 h-[18.977px] overflow-clip">
          <div className="absolute top-[3.16px] left-0 flex w-[81.442px] flex-col items-start">
            <div className="flex w-full shrink-0 items-center gap-[2.372px] overflow-clip rounded-[5px] border-[0.395px] border-solid border-[#c8c8cf] bg-white py-[1.581px] pr-[3.953px] pl-[2.372px]">
              <Icon src={`${ASSETS}/icn-search.svg`} className="size-[9.488px]" />
              <p className={`${BODY} text-[#a5a5af]`}>Search activity</p>
            </div>
          </div>
          <div className="absolute top-[3.16px] right-0 flex items-start gap-[1.977px]">
            <FilterChip icon={`${ASSETS}/icn-chat-filled-filter.svg`} label="Chat" gap="1.186px" />
            <FilterChip icon={`${ASSETS}/icn-photo-filter.svg`} label="Recordings" gap="1.581px" />
          </div>
          <p className={`${BODY} absolute top-[6.72px] right-[91.47px] text-right text-[#757580]`}>Contains</p>
        </div>
      </div>
    </div>
  );
}