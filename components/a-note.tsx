import { JOSH_PUCKETT, NOTE, PUGSON } from "@/lib/site-copy";
import { TextLink } from "./text-link";

function withHandles(text: string) {
  const parts = text.split(/(@pugson|@joshpuckett)/g);
  return parts.map((part, i) => {
    if (part === "@pugson") {
      return (
        <TextLink key={`${part}-${i}`} href={PUGSON} target="_blank" rel="noopener noreferrer">
          {part}
        </TextLink>
      );
    }
    if (part === "@joshpuckett") {
      return (
        <TextLink key={`${part}-${i}`} href={JOSH_PUCKETT} target="_blank" rel="noopener noreferrer">
          {part}
        </TextLink>
      );
    }
    return <span key={`${part.slice(0, 12)}-${i}`}>{part}</span>;
  });
}

export function ANote() {
  return (
    <section
      id="note"
      className="flex min-h-[100svh] w-full scroll-mt-0 flex-col items-center justify-center px-4 text-center text-black md:px-0"
    >
      <div className="flex w-full max-w-[475px] flex-col items-center gap-[14px]">
        <h2 className="m-0 font-serif-display text-[20px]">{NOTE.title}</h2>
        <div className="w-full font-[family-name:var(--font-geist-sans)] text-[16px] font-normal leading-[25px]">
          {NOTE.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="mb-6 text-pretty last:mb-0">
              {withHandles(p)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
