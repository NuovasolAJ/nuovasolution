"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

/**
 * The plan card's function groups behind one tap on the phone (the owner, 19.11.: "the core stays visible, details may open by a
 * tap" for the phone's 21 screens). At ≥ 640 px the groups stand open and the button is hidden (globals.css .plans-card-fold).
 * Nothing is removed: the groups are in the document on every width, only folded on the phone until the tap.
 */
export function PlanCardFold({ plan, labelOpen, labelClose, ariaOpen, ariaClose, children }: { plan: string; labelOpen: string; labelClose: string; ariaOpen: string; ariaClose: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="plans-card-fold" data-plan-fold={plan} data-open={open ? "true" : "false"}>
      <button type="button" className="plans-card-fold-btn" aria-expanded={open} aria-controls={id} aria-label={open ? ariaClose : ariaOpen} onClick={() => setOpen((o) => !o)} data-plan-fold-button={plan}>
        <span>{open ? labelClose : labelOpen}</span>
        <ChevronDown size={16} strokeWidth={2.2} aria-hidden="true" className="plans-card-fold-chevron" />
      </button>
      <div id={id} className="plans-card-fold-body" data-plan-fold-body={plan}>{children}</div>
    </div>
  );
}
