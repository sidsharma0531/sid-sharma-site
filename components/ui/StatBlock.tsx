import type { Stat, Tone } from "@/data/content";
import Rich from "./Rich";

const unitColor: Record<Tone, string> = {
  tomato: "text-tomato-deep",
  leaf: "text-leaf-deep",
  butter: "text-tomato-deep",
};

// Sizes step up with the column width they sit in, so "5,100+ lbs" never overflows.
const sizes = {
  md: "text-[2rem] sm:text-[2.6rem]",
  lg: "text-[2rem] sm:text-[2.6rem] lg:text-6xl",
  xl: "text-[2.6rem] sm:text-[2.75rem] md:text-5xl lg:text-[4.25rem]",
};

// Big Fraunces number with its unit, and a plain label under it.
export default function StatBlock({
  stat,
  size = "md",
  tone = "tomato",
}: {
  stat: Stat;
  size?: keyof typeof sizes;
  tone?: Tone;
}) {
  return (
    <div className="min-w-0">
      <p className={`font-serif leading-none font-semibold tracking-[-0.03em] tabular-nums ${sizes[size]}`}>
        <Rich text={stat.value} />
        {stat.unit && (
          <span className={`ml-1.5 inline-block text-[0.44em] font-medium tracking-[-0.01em] ${unitColor[tone]}`}>
            {stat.unit}
          </span>
        )}
      </p>
      <p className="mt-2 text-sm leading-snug text-ink/65">
        <Rich text={stat.label} />
      </p>
    </div>
  );
}
