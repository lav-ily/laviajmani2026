import type { ComponentPropsWithoutRef, ReactNode } from "react";

type TextLinkProps = ComponentPropsWithoutRef<"a">;

export function TextLink({ className = "", ...props }: TextLinkProps) {
  return <a className={className ? `text-link ${className}` : "text-link"} {...props} />;
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Renders the phrases in `paragraph` that are keys of `links` as links; external ones open in a new tab. */
export function withLinks(
  paragraph: string,
  links: Readonly<Record<string, string>> | undefined,
): ReactNode {
  const phrases = links ? Object.keys(links) : [];
  if (phrases.length === 0) return paragraph;
  const pattern = new RegExp(`\\b(${phrases.map(escapeRegExp).join("|")})\\b`);
  return paragraph.split(pattern).map((part, index) => {
    const href = index % 2 === 1 ? links?.[part] : undefined;
    if (!href) return part;
    const external = href.startsWith("http");
    return (
      <TextLink
        key={index}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {part}
      </TextLink>
    );
  });
}
