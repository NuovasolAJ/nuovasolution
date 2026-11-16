"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 16.11. 14:00 (Audit: the phone's depth): on the phone a plan card shows its name, its line and its buttons; the rows stand behind one
 * tap ("Ver qué incluye"). From 640 px the rows always stand and the button is gone (CSS). Without JavaScript the rows stand (CSS).
 */
export function PlanCardFold({ children, more, less, code }: { children: ReactNode; more: string; less: string; code: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="plans-card-fold" data-open={open ? "true" : "false"} data-plan-fold={code}>
      <button type="button" className="plans-card-fold-button" aria-expanded={open} aria-controls={`plan-rows-${code}`} onClick={() => setOpen((v) => !v)} data-plan-fold-button={code}>
        {open ? less : more}<ChevronDown size={16} strokeWidth={2.2} aria-hidden="true" className={cn("plans-card-fold-icon", open && "is-open")} />
      </button>
      <div id={`plan-rows-${code}`} className="plans-card-fold-body">{children}</div>
    </div>
  );
}
