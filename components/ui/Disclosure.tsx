"use client";

import { useId, useState, type ReactNode } from "react";

// A button that slides a panel open below it, with a dashed rule running out to the right.
// The panel stays in the HTML while closed, but can't be focused or read until it opens.
export default function Disclosure({
  label,
  icon,
  className,
  children,
}: {
  label: string;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border-[1.5px] border-ink bg-paper px-4 font-mono text-[13px] font-medium shadow-[2px_2px_0_var(--color-ink)] transition-[transform,background-color,box-shadow] duration-150 hover:-translate-y-px hover:bg-butter hover:shadow-[3px_3px_0_var(--color-ink)] aria-expanded:bg-butter"
        >
          {icon}
          {label}
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
        <span aria-hidden className="flex-1 border-t border-dashed border-ink/25" />
      </div>

      <div
        id={id}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        {/* Clipped only top to bottom, so a panel can reach a little past the sides. */}
        <div className="min-h-0 overflow-y-clip">{children}</div>
      </div>
    </div>
  );
}
