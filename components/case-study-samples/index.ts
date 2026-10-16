import type { ComponentType } from "react";

import {
  FeedPhonesSample,
  PerpsPositionsSample,
  ProfileSample,
  TradeFlowSample,
} from "@/components/case-study-samples/bullpen-image-cards";
import {
  ArticleSample,
  ChatHomeSample,
  ConsultingFrameworkSample,
  FeedSample,
  IntelligenceProjectsSample,
  SearchCriteriaSample,
} from "@/components/case-study-samples/delphi-image-cards";
import {
  DarkModeSample,
  FlowSample,
  InviteSample,
  PresentationSample,
  RollScreensSample,
  RollViewsSample,
} from "@/components/case-study-samples/dispo-image-cards";
import {
  ButtonStatesSample,
  FlowDiagramSample,
  InRoomPhonesSample,
  MeetingHistoryDetailSample,
} from "@/components/case-study-samples/hopin-image-cards";
import {
  AuditLogModalSample,
  AuditLogSample,
  BillingTableDropdownSample,
  BillingTableHoverSample,
  ButtonsSample,
  UserJourneySample,
} from "@/components/case-study-samples/peachy-image-cards";
import { MeetingHistorySample } from "@/components/case-study-samples/hopin-meeting-history-sample";
import { MobileFlowSample } from "@/components/case-study-samples/hopin-mobile-flow-sample";

/** Bento sample cards per case study, in reading order (left to right, top to bottom). */
/** `undefined` leaves that block as a plain `blockColor` fill. */
export const CASE_STUDY_SAMPLES: Partial<
  Record<string, ReadonlyArray<ComponentType | undefined>>
> = {
  /** Figma `197:11213`. */
  hopin: [
    InRoomPhonesSample,
    MeetingHistoryDetailSample,
    ButtonStatesSample,
    MobileFlowSample,
    FlowDiagramSample,
    MeetingHistorySample,
  ],
  /** Figma `211:44446`. */
  dispo: [
    RollViewsSample,
    PresentationSample,
    FlowSample,
    RollScreensSample,
    InviteSample,
    DarkModeSample,
  ],
  /** Figma `211:44409`. */
  delphi: [
    SearchCriteriaSample,
    FeedSample,
    ChatHomeSample,
    ConsultingFrameworkSample,
    IntelligenceProjectsSample,
    ArticleSample,
  ],
  /** Figma `211:44428`. */
  "peachy-patients": [
    AuditLogModalSample,
    UserJourneySample,
    BillingTableHoverSample,
    AuditLogSample,
    ButtonsSample,
    BillingTableDropdownSample,
  ],
  /** Figma `211:44388`. */
  bullpen: [
    PerpsPositionsSample,
    FeedPhonesSample,
    undefined,
    undefined,
    TradeFlowSample,
    ProfileSample,
  ],
};
