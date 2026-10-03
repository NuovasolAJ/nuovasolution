"use client";

import { RotateCcw } from "lucide-react";

/**
 * Restarts the CSS sequence of the surface it sits in (the nearest [data-seq]): the attribute leaves "run"
 * for one layout pass and comes back, which starts the keyframes again. Hidden without JavaScript and with
 * reduced motion (globals.css), where the sequence does not run and there is nothing to replay.
 */
export function SeqReplay({ label }: { label: string }) {
  return (
    <button
      type="button"
      data-seq-replay
      className="seq-replay inline-flex min-h-[44px] items-center gap-2 rounded-pill px-3 t-caption font-medium text-text-secondary transition-colors duration-micro hover:text-text-primary"
      onClick={(e) => {
        const root = e.currentTarget.closest<HTMLElement>("[data-seq]");
        if (!root) return;
        root.setAttribute("data-seq", "idle");
        // A layout read between the two states, so the keyframes start again from their first frame.
        void document.body.getBoundingClientRect();
        root.setAttribute("data-seq", "run");
      }}
    >
      <RotateCcw size={14} aria-hidden="true" />
      {label}
    </button>
  );
}
