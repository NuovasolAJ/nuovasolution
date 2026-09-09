import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Width = "default" | "wide" | "text" | "narrow" | "bleed";

export function Container({
  width = "default",
  as: Tag = "div",
  className,
  children,
}: {
  width?: Width;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const cls = width === "bleed" ? "w-full" : `container-${width}`;
  return <Tag className={cn(cls, className)}>{children}</Tag>;
}
