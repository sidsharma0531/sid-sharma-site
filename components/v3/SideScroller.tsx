"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

// A row of cards that scrolls left to right across the full page width, with arrow buttons beside
// the heading. Cards snap to the page's content edge. The arrows step one card (anything marked
// data-card) at a time and fade out at either end. Swiping, a trackpad, or the arrow keys once the
// row has focus scroll it too.
export default function SideScroller({
  heading,
  label,
  children,
}: {
  heading: ReactNode;
  label: string;
  children: ReactNode;
}) {
  const row = useRef<HTMLDivElement>(null);
  const id = useId();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      resize.disconnect();
    };
  }, []);

  function go(direction: 1 | -1) {
    const el = row.current;
    if (!el) return;
    const cards = [...el.querySelectorAll<HTMLElement>(":scope > [data-card]")];
    // Where the row sits with each card at the content edge, the first card's spot being zero.
    const base = cards[0]?.offsetLeft ?? 0;
    const stops = cards.map((card) => card.offsetLeft - base);
    const now = el.scrollLeft;
    const next = direction > 0 ? stops.find((stop) => stop > now + 4) : stops.findLast((stop) => stop < now - 4);
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: next ?? (direction > 0 ? el.scrollWidth : 0), behavior: smooth ? "smooth" : "auto" });
  }

  return (
    <>
      {/* Under 22rem the heading and arrows don't both fit, so the arrows step aside: swiping works. */}
      <div className="container-page flex items-end justify-between gap-4">
        {heading}
        <div className="mb-10 flex shrink-0 gap-2.5 max-[22rem]:hidden sm:mb-14">
          <Arrow direction={-1} off={atStart} controls={id} onClick={() => go(-1)} />
          <Arrow direction={1} off={atEnd} controls={id} onClick={() => go(1)} />
        </div>
      </div>

      {/* The bottom padding leaves room for the cards' shadows, which the scrolling row would clip. */}
      <div
        ref={row}
        id={id}
        role="region"
        aria-label={label}
        tabIndex={0}
        data-reveal
        className="edge-row relative flex snap-x snap-mandatory gap-4 overflow-x-auto pt-1 pb-8 [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </>
  );
}

// A round ink-outlined button with a hand-drawn arrow. At the end of the row it fades and does
// nothing, but keeps focus so the keyboard isn't thrown back to the top of the page.
function Arrow({
  direction,
  off,
  controls,
  onClick,
}: {
  direction: 1 | -1;
  off: boolean;
  controls: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={direction > 0 ? "Next" : "Previous"}
      aria-controls={controls}
      aria-disabled={off}
      onClick={off ? undefined : onClick}
      className="grid size-11 place-items-center rounded-full border-[1.5px] border-ink bg-paper shadow-[2px_2px_0_var(--color-ink)] transition-[transform,background-color,opacity] duration-150 hover:-translate-y-0.5 hover:bg-butter aria-disabled:cursor-default aria-disabled:opacity-30 aria-disabled:hover:translate-y-0 aria-disabled:hover:bg-paper"
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className={`size-5 ${direction < 0 ? "-scale-x-100" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12.6c4.6-.6 10.3-.7 15.3-.3" />
        <path d="M14.1 6.9l5.5 5.4-5.7 5.1" />
      </svg>
    </button>
  );
}
