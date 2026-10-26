import type { ReactNode } from "react";

// Handwritten kicker with a little arrow, above a section heading or on its own.
export default function Kicker({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <p id={id} className="flex items-end gap-1 font-hand text-[1.65rem] leading-none text-tomato-deep">
      <span className="inline-block -rotate-2">{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 40 30"
        className="h-7 w-9 translate-y-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 6c12-4 26 0 28 9s-8 12-16 11" />
        <path d="M16 26l5-4.2M16 26l6 2.8" />
      </svg>
    </p>
  );
}
