"use client";

import { useState, type ReactNode } from "react";

// Shows the first few items, then a "See X more" toggle. Hidden items stay in the HTML.
export default function ShowMore({ items, initial }: { items: ReactNode[]; initial: number }) {
  const [open, setOpen] = useState(false);
  const extra = items.length - initial;

  return (
    <div>
      <ul>
        {items.map((item, i) => (
          <li key={i} hidden={!open && i >= initial}>
            {item}
          </li>
        ))}
      </ul>
      {extra > 0 && (
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="mt-3 inline-flex h-10 items-center rounded-full px-1 text-sm font-semibold text-tomato-deep underline-offset-4 hover:underline"
        >
          {open ? "Show less ▴" : `See ${extra} more ▾`}
        </button>
      )}
    </div>
  );
}
