import { ABOUT } from "@/lib/about-content";

/** Figma `78:195` / `78:196` — intro column; same layout in every homepage state. */
export function IntroPanel() {
  return (
    <aside className="flex-1 bg-white split:min-w-0 split:min-h-svh">
      <div className="px-6 pt-16 pb-12 split:px-0 split:pt-[121px] split:pb-0 split:pl-[var(--intro-pad-left)]">
        <div className="flex w-full max-w-[354px] flex-col gap-[18px] font-body leading-normal text-black">
          <div className="flex w-full flex-col gap-1 text-[20px]">
            <h1 className="w-full font-semibold">{ABOUT.name}</h1>
            <p className="w-full font-light">{ABOUT.location}</p>
          </div>
          <div className="flex w-full flex-col gap-3 text-[16px] text-balance">
            {ABOUT.paragraphs.map((paragraph) => (
              <p key={paragraph} className="w-full">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
