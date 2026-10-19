import { bullpenCaseStudy } from "@/lib/case-studies/bullpen";
import { delphiCaseStudy } from "@/lib/case-studies/delphi";
import { dispoCaseStudy } from "@/lib/case-studies/dispo";
import { hopinCaseStudy } from "@/lib/case-studies/hopin";
import { peachyPatientsCaseStudy } from "@/lib/case-studies/peachy-patients";
import type { CaseStudy } from "@/lib/case-studies/types";

const CASE_STUDIES: Record<string, CaseStudy> = Object.fromEntries(
  [hopinCaseStudy, dispoCaseStudy, peachyPatientsCaseStudy, delphiCaseStudy, bullpenCaseStudy].map(
    (study) => [study.slug, study],
  ),
);

export const CASE_STUDY_SLUGS: ReadonlyArray<string> = Object.keys(CASE_STUDIES);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES[slug];
}
