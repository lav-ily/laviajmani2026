import { RESEARCH } from "@/lib/site-copy";
import { WorkTag } from "./work-tag";
import { WorkVideo } from "./work-video";

export function Research() {
  const { tag } = RESEARCH;

  return (
    <section
      id="research"
      className="mx-auto flex w-full max-w-[1231px] scroll-mt-[var(--nav-scroll-offset)] flex-col items-center gap-[124px] px-4 md:px-0"
    >
      <div className="flex w-full max-w-[549px] flex-col items-center gap-[14px] text-center text-[#1e1e1e]">
        <h2 className="m-0 font-serif-display text-[20px] leading-normal">{RESEARCH.title}</h2>
        <div className="w-full max-w-[475px] font-[family-name:var(--font-geist-sans)] text-[16px] font-normal leading-6">
          {RESEARCH.paragraphs.map((paragraph, index) => (
            <span key={paragraph.slice(0, 24)}>
              {index > 0 ? (
                <>
                  <br />
                  <br />
                </>
              ) : null}
              <span className="text-pretty">{paragraph}</span>
            </span>
          ))}
        </div>
      </div>

      <a
        href={RESEARCH.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block h-[min(56vw,420px)] w-full shrink-0 overflow-clip rounded-[6px] bg-[#e4e4e4] sm:h-[583px] md:h-[781px]"
      >
        <WorkTag
          year={tag.year}
          name={tag.name}
          role={tag.role}
          className="left-[11.5px] top-3"
        />
        <WorkVideo src={RESEARCH.mediaSrc} />
      </a>
    </section>
  );
}
