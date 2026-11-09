"use client";

import { useId, useState, type ReactNode } from "react";

// "see more" under a card's main facts, sliding the rest open below it. While closed, the rest
// stays in the HTML but can't be focused or read.
export default function SeeMore({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="mt-4">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-1 text-sm font-semibold text-tomato-deep underline decoration-tomato/30 underline-offset-4 transition-colors hover:decoration-tomato"
      >
        {open ? "see less" : "see more"}
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={`size-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      </button>

      <div
        id={id}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        {/* A little padding so thumbnails' shadows and hover tilt aren't cut off. */}
        <div className="-mx-2 min-h-0 overflow-hidden px-2 pb-2">{children}</div>
      </div>
    </div>
  );
}
