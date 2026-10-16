import Image from "next/image";

import { DECK_SHADOW } from "@/components/case-study-samples/sample-stage";

const MEDIA = "/media/dispo";

type Phone = { src: string; alt: string; left: number };

/** 134×290 screens on a shared baseline (Figma `211:44449`, `211:44458`, `211:44463`). */
function PhoneRow({ phones }: { phones: ReadonlyArray<Phone> }) {
  return (
    <>
      {phones.map((phone) => (
        <div
          key={phone.src}
          className={`absolute top-[31px] h-[290px] w-[134px] overflow-hidden rounded-[8px] ${DECK_SHADOW}`}
          style={{ left: phone.left }}
        >
          <Image src={`${MEDIA}/${phone.src}`} alt={phone.alt} fill sizes="134px" className="object-cover" />
        </div>
      ))}
    </>
  );
}

/** Figma `211:44449` — roll owner, member, and notifications views. */
export function RollViewsSample() {
  return (
    <PhoneRow
      phones={[
        { src: "owner-view.png", alt: "Dispo notifications, roll owner view", left: 50 },
        { src: "member-view.png", alt: "Dispo notifications, roll member view", left: 200 },
        { src: "notifications.png", alt: "Dispo activity notifications", left: 350 },
      ]}
    />
  );
}

/** Figma `211:44453` — research presentation slides. */
export function PresentationSample() {
  return (
    <div className={`absolute top-[-89px] left-[calc(50%+0.25px)] h-[530px] w-[404px] -translate-x-1/2 ${DECK_SHADOW}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-[-21.62%] h-full w-[135.71%]">
          <Image
            src={`${MEDIA}/presentation-template.png`}
            alt="Dispo user research presentation slides"
            fill
            sizes="548px"
          />
        </div>
      </div>
    </div>
  );
}

/** Figma `211:44456` — roll permissions flow. */
export function FlowSample() {
  return (
    <div className={`absolute top-[23px] left-[85px] h-[306px] w-[363px] rounded-[4px] ${DECK_SHADOW}`}>
      <div className="absolute inset-0 overflow-hidden rounded-[4px]">
        <div className="absolute top-[-3.6%] left-[-10.19%] h-[107.86%] w-[119.56%]">
          <Image src={`${MEDIA}/flow.png`} alt="Dispo roll permissions flow" fill sizes="434px" />
        </div>
      </div>
    </div>
  );
}

/** Figma `211:44458` — roll feed, comments, and members. */
export function RollScreensSample() {
  return (
    <PhoneRow
      phones={[
        { src: "roll-feed.png", alt: "Dispo roll photo feed", left: 50 },
        { src: "roll-comments.png", alt: "Comments on a Dispo roll photo", left: 200 },
        { src: "roll-members.png", alt: "Dispo roll members and settings", left: 350 },
      ]}
    />
  );
}

/** Figma `211:44463` — roll profile and invite friends. */
export function InviteSample() {
  return (
    <PhoneRow
      phones={[
        { src: "roll-profile.png", alt: "Dispo roll profile", left: 125 },
        { src: "invite-friends.png", alt: "Invite friends to a Dispo roll", left: 275 },
      ]}
    />
  );
}

/** Figma `211:44467`–`211:44469`, positioned as a share of the card width. */
const DARK_SCREENS = [
  { src: "dark-notifications.png", alt: "Dispo notifications in dark mode", left: "9.35%", right: "65.58%", aspect: "371/804", top: "calc(50% + 0.5px)" },
  { src: "dark-roll-members.png", alt: "Dispo roll members in dark mode", left: "37.42%", right: "37.51%", aspect: "377/814", top: "calc(50% - 1px)" },
  { src: "dark-comments.png", alt: "Dispo photo comments in dark mode", left: "65.48%", right: "9.45%", aspect: "375/812", top: "calc(50% + 0.5px)" },
] as const;

/** Figma `211:44466` — dark mode screens. */
export function DarkModeSample() {
  return (
    <>
      {DARK_SCREENS.map((screen) => (
        <div
          key={screen.src}
          className={`absolute -translate-y-1/2 overflow-hidden rounded-[8px] ${DECK_SHADOW}`}
          style={{ left: screen.left, right: screen.right, top: screen.top, aspectRatio: screen.aspect }}
        >
          <Image src={`${MEDIA}/${screen.src}`} alt={screen.alt} fill sizes="134px" className="object-cover" />
        </div>
      ))}
    </>
  );
}
