import Image from "next/image";

import { DECK_SHADOW } from "@/components/case-study-samples/sample-stage";

const MEDIA = "/media/peachy";

/** 483×344 dashboard screenshot, horizontally centered (Figma `211:44432` and siblings). */
function DashboardShot({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <div className={`absolute h-[344px] w-[483px] -translate-x-1/2 overflow-hidden rounded-[4px] ${DECK_SHADOW} ${className}`}>
      <Image src={`${MEDIA}/${src}`} alt={alt} fill sizes="483px" className="object-cover" />
    </div>
  );
}

/** Figma `211:44431` — bill history modal over the audit log. */
export function AuditLogModalSample() {
  return (
    <DashboardShot
      src="audit-log-modal.png"
      alt="Peachy bill history modal over the audit log"
      className="top-[24px] left-[calc(50%+0.25px)]"
    />
  );
}

/** Figma `211:44433` — billing and audit log user journey. */
export function UserJourneySample() {
  return (
    <div className="absolute top-[calc(50%-53.5px)] left-[calc(50%+35.25px)] h-[534px] w-[789px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[10px]">
      <Image
        src={`${MEDIA}/user-journey.png`}
        alt="FigJam user journey for billing and the audit log"
        fill
        sizes="789px"
        className="object-cover"
      />
    </div>
  );
}

/** Figma `211:44436` — billing table, row hover. */
export function BillingTableHoverSample() {
  return (
    <DashboardShot
      src="billing-table-hover.png"
      alt="Peachy billing table with a hovered row"
      className="top-[calc(50%+20.5px)] left-[calc(50%+0.25px)] -translate-y-1/2"
    />
  );
}

/** Figma `211:44438` — audit log. */
export function AuditLogSample() {
  return (
    <DashboardShot
      src="audit-log.png"
      alt="Peachy audit log"
      className="top-[calc(50%+20.5px)] left-[calc(50%+0.25px)] -translate-y-1/2"
    />
  );
}

/** Figma `211:44441` — button states. */
export function ButtonsSample() {
  return (
    <div
      className={`absolute top-[calc(50%+0.5px)] left-[calc(50%-0.25px)] h-[294px] w-[356px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[4px] ${DECK_SHADOW}`}
    >
      <Image src={`${MEDIA}/buttons.png`} alt="Peachy button states" fill sizes="356px" className="object-cover" />
    </div>
  );
}

/** Figma `211:44443` — billing table, row actions open. */
export function BillingTableDropdownSample() {
  return (
    <DashboardShot
      src="billing-table-dropdown.png"
      alt="Peachy billing table with the row actions menu open"
      className="top-[calc(50%+20.5px)] left-[calc(50%-0.25px)] -translate-y-1/2"
    />
  );
}
