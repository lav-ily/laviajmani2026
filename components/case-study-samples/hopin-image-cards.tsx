import Image from "next/image";

import { DECK_SHADOW } from "@/components/case-study-samples/sample-stage";

const MEDIA = "/media/hopin";

const PHONE_SHADOW =
  "shadow-[-2.64px_-2.64px_39.599px_0px_rgba(140,140,140,0.25),2.64px_2.64px_39.599px_0px_rgba(140,140,140,0.25)]";

/** Figma `197:11902`–`197:11905`, left to right. */
const IN_ROOM_PHONES = [
  { src: "in-room-97.png", alt: "Hopin Session video call on iPhone", left: 29, width: 105.757, height: 229 },
  { src: "in-room-120.png", alt: "Invitation to join the stage in a Hopin webinar", left: 152.76, width: 105.586, height: 228.628 },
  { src: "in-room-104.png", alt: "Two speakers on stage in a Hopin webinar", left: 276.34, width: 105.757, height: 229 },
  { src: "in-room-119.png", alt: "Live Hopin webinar with four participants", left: 400.1, width: 105.663, height: 228.796 },
] as const;

/** Figma `197:11901` — four in-room iPhone screens. */
export function InRoomPhonesSample() {
  return (
    <>
      {IN_ROOM_PHONES.map((phone) => (
        <div
          key={phone.src}
          className={`absolute top-[62px] overflow-hidden rounded-[7.441px] ${PHONE_SHADOW}`}
          style={{ left: phone.left, width: phone.width, height: phone.height }}
        >
          <Image src={`${MEDIA}/${phone.src}`} alt={phone.alt} fill sizes="106px" className="object-cover" />
        </div>
      ))}
    </>
  );
}

/** Figma `197:11907` — meeting history detail, cropped to the top-right corner. */
export function MeetingHistoryDetailSample() {
  return (
    <div
      className={`absolute top-[calc(50%+60px)] left-[calc(50%-0.25px)] h-[419px] w-[458px] -translate-x-1/2 -translate-y-1/2 rounded-[10px] ${DECK_SHADOW}`}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[10px]">
        <div className="absolute top-0 left-[-54.66%] h-[148.28%] w-[154.66%]">
          <Image
            src={`${MEDIA}/meeting-history-detail.png`}
            alt="Meeting history with a request-access tooltip"
            fill
            sizes="708px"
          />
        </div>
      </div>
    </div>
  );
}

/** Figma `197:11910` — button component states. */
export function ButtonStatesSample() {
  return (
    <div
      className={`absolute top-[calc(50%+266.5px)] left-[calc(50%-0.25px)] h-[816px] w-[475px] -translate-x-1/2 -translate-y-1/2 rounded-[10px] ${DECK_SHADOW}`}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[10px]">
        <div className="absolute top-[-0.08%] left-0 h-[103.78%] w-[146.73%]">
          <Image
            src={`${MEDIA}/button-states.png`}
            alt="Primary and secondary button states across sizes"
            fill
            sizes="697px"
          />
        </div>
      </div>
    </div>
  );
}

/** Figma `197:12319` — user flow diagram. */
export function FlowDiagramSample() {
  return (
    <div
      className={`absolute top-1/2 left-[calc(50%+61.75px)] h-[297px] w-[598px] -translate-x-1/2 -translate-y-1/2 rounded-[10px] bg-white ${DECK_SHADOW}`}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[10px]">
        <div className="absolute top-[9.92%] left-[4.97%] h-[77.26%] w-[89.35%]">
          <Image src={`${MEDIA}/flow-diagram.png`} alt="User flow diagram" fill sizes="534px" />
        </div>
      </div>
    </div>
  );
}
