// Handwritten kicker with a little arrow, then the serif heading.
export default function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div data-reveal className="mb-10 sm:mb-14">
      <p className="flex items-end gap-1 font-hand text-[1.65rem] leading-none text-tomato-deep">
        <span className="inline-block -rotate-2">{kicker}</span>
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
      <h2 className="mt-3 max-w-[22ch] font-serif text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.025em] text-balance sm:text-[3.4rem]">
        {title}
      </h2>
    </div>
  );
}
