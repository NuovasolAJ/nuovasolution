import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className, as: Tag = "p", id }: { children: ReactNode; className?: string; as?: ElementType; id?: string }) {
  return (
    <Tag id={id} className={cn("t-eyebrow text-text-accent", className)}>
      {children}
    </Tag>
  );
}

type DisplaySize = "xl" | "l" | "m";
export function Display({
  size = "m",
  as,
  children,
  className,
  id,
}: {
  size?: DisplaySize;
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const Tag: ElementType = as ?? (size === "xl" ? "h1" : "h2");
  return (
    <Tag id={id} className={cn(`t-display-${size} text-text-primary`, className)}>
      {children}
    </Tag>
  );
}

type HeadingSize = "l" | "m" | "s";
export function Heading({
  size = "m",
  as = "h3",
  children,
  className,
  id,
}: {
  size?: HeadingSize;
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const Tag = as;
  return (
    <Tag id={id} className={cn(`t-heading-${size} text-text-primary`, className)}>
      {children}
    </Tag>
  );
}

export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("t-body-l text-text-secondary measure-lead", className)}>{children}</p>;
}

export function Body({ children, className, size = "m" }: { children: ReactNode; className?: string; size?: "m" | "s" | "l" }) {
  return <p className={cn(`t-body-${size} text-text-secondary measure-body`, className)}>{children}</p>;
}

export function Caption({ children, className, as: Tag = "p" }: { children: ReactNode; className?: string; as?: ElementType }) {
  return <Tag className={cn("t-caption text-text-muted", className)}>{children}</Tag>;
}

/** Eyebrow → heading → lead, with the binding vertical rhythm. */
export function SectionHead({
  eyebrow,
  title,
  lead,
  size = "m",
  as = "h2",
  id,
  align = "left",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  size?: DisplaySize | "heading-l";
  as?: ElementType;
  id?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "text-center [&>p]:mx-auto", className)}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      {size === "heading-l" ? (
        <Heading size="l" as={as} id={id}>
          {title}
        </Heading>
      ) : (
        <Display size={size} as={as} id={id}>
          {title}
        </Display>
      )}
      {lead && <Lead className="mt-6">{lead}</Lead>}
    </div>
  );
}
