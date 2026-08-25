import type { ComponentPropsWithoutRef } from "react";

type TextLinkProps = ComponentPropsWithoutRef<"a">;

export function TextLink({ className = "", ...props }: TextLinkProps) {
  return <a className={className ? `text-link ${className}` : "text-link"} {...props} />;
}
