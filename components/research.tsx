import { RESEARCH } from "@/lib/site-copy";
import { WorkTag } from "./work-tag";

export function Research() {
  const { tag } = RESEARCH;

  return (
    <section
      id="research"
      className="mx-auto flex w-full max-w-[1231px] scroll-mt-8 flex-col items-center gap-[67px] px-6 md:px-0"
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
        className="relative block h-[min(56vw,420px)] w-full shrink-0 overflow-clip rounded-[6px] bg-[#c7c5c1] sm:h-[520px] md:h-[698px]"
      >
        <WorkTag
          year={tag.year}
          name={tag.name}
          role={tag.role}
          className="left-[11.5px] top-3"
        />
        <div className="absolute left-[calc(50%-1px)] top-[calc(50%+38.5px)] h-[min(44vw,545px)] w-[min(76.6%,943px)] -translate-x-1/2 -translate-y-1/2 overflow-clip rounded-[6px] md:h-[545px] md:w-[943px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/work/research-collage.png"
            alt="La Vie archive on Tumblr"
            className="absolute inset-0 size-full max-w-none object-cover"
          />
        </div>
      </a>
    </section>
  );
}
