import type { Stat, Tone } from "@/data/content";
import Rich from "./Rich";

const unitColor: Record<Tone, string> = {
  tomato: "text-tomato-deep",
  leaf: "text-leaf-deep",
  butter: "text-tomato-deep",
};

// Sizes step up with the column width they sit in, so "5,100+ lbs" never overflows. md waits for
// a 10rem column too, so "#1 new release" stays on one line in the narrow tablet column.
const sizes = {
  md: "text-[2rem] sm:@[10rem]:text-[2.6rem]",
  lg: "text-[2rem] sm:text-[2.6rem] lg:text-6xl",
  xl: "text-[2.6rem] sm:text-[2.75rem] md:text-5xl lg:text-[4.25rem]",
};

// Big Fraunces number with its unit, and a plain label under it.
// A value with no number, like "Best seller", is one phrase: it stays on one line and shrinks to
// fit a narrow column (about 0.45em a letter), keeping the line height so labels still line up.
export default function StatBlock({
  stat,
  size = "md",
  tone = "tomato",
}: {
  stat: Stat;
  size?: keyof typeof sizes;
  tone?: Tone;
}) {
  const phrase = !/\d/.test(stat.value);
  return (
    <div className="@container min-w-0">
      <p className={`font-serif leading-none font-semibold tracking-[-0.03em] tabular-nums ${sizes[size]}`}>
        {phrase ? (
          <span
            className="whitespace-nowrap"
            style={{ fontSize: `min(1em, ${(100 / (stat.value.length * 0.45)).toFixed(1)}cqi)` }}
          >
            <Rich text={stat.value} />
          </span>
        ) : (
          <Rich text={stat.value} />
        )}
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
