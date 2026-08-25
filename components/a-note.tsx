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

/** Footer note — layout inspired by austinvalleskey.com acknowledgements. */
export function ANote() {
  return (
    <section
      id="note"
      className="w-full scroll-mt-0 border-t border-dashed border-t-[rgba(0,0,0,0.06)] py-16"
    >
      <div className="mx-auto w-full max-w-[1248px] px-4 font-[family-name:var(--font-geist-sans)] text-[12px] font-normal leading-normal text-left text-[var(--color-caption)]">
        <p className="m-0 mb-2 text-[var(--color-tag-meta)]">{NOTE.title}</p>
        {NOTE.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="m-0 mb-2 text-pretty last:mb-0">
            {withHandles(paragraph)}
          </p>
        ))}
      </div>
    </section>
  );
}
