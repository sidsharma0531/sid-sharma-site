// A thin arrow for links. "right" for onward links, "up-right" for links that leave the site.
export default function Arrow({ direction = "right", className = "" }: { direction?: "right" | "up-right" | "left"; className?: string }) {
  const d = {
    right: "M3 8h10m-4-4 4 4-4 4",
    left: "M13 8H3m4-4L3 8l4 4",
    "up-right": "M5 11 11 5M6 5h5v5",
  }[direction];
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={`size-[1em] shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
