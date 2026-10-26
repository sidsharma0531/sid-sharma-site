import type { SVGProps } from "react";
import type { Tone } from "@/data/content";

// Hand-drawn style icons on a 32x32 grid. Each color fill sits a hair off its ink outline,
// like a slightly misregistered print, which is what makes them read as drawn by hand.

type Shape = { fills?: [Tone, string][]; lines?: string[] };

const toneFill: Record<Tone, string> = {
  tomato: "fill-tomato",
  butter: "fill-butter",
  leaf: "fill-leaf",
};

const shapes = {
  carrot: {
    fills: [
      ["tomato", "M21.6 8.6c2.6 1.6 3 4.6 1 7L10 27.5c-1.3 1.2-3.3-.2-2.6-1.8l6.8-14.5c1.5-3 4.9-4.3 7.4-2.6z"],
      ["leaf", "M21.2 8.2c-.6-3 .9-5.6 3.6-6.6.7 2.8-.8 5.5-3.6 6.6z"],
      ["leaf", "M22.6 9.6c1.5-2.6 4.6-3.5 7.1-2.3-1.4 2.5-4.4 3.4-7.1 2.3z"],
    ],
    lines: ["M14.4 15.4l2.6 1.3", "M11.6 20.8l2.4 1.2", "M17.8 11.4l1.8 1"],
  },
  tomato: {
    fills: [
      ["tomato", "M16 9.6c6.1 0 10.4 4 10.4 9.3S22 27.8 16 27.8 5.6 24.2 5.6 18.9 9.9 9.6 16 9.6z"],
      ["leaf", "M16 11.6c-1.2-1.9-3.3-2.8-5.6-2.3 1.5 1.7 3.5 2.5 5.6 2.3z"],
      ["leaf", "M16 11.6c1.2-1.9 3.3-2.8 5.6-2.3-1.5 1.7-3.5 2.5-5.6 2.3z"],
    ],
    lines: ["M16 11.6c-.3-2.1.2-3.9 1.4-5.4", "M9.6 16.4c.4-1.6 1.4-2.8 2.8-3.4"],
  },
  bread: {
    fills: [
      ["butter", "M5 20.4C5 13.8 9.9 9.6 16 9.6s11 4.2 11 10.8v3.4c0 1.6-1.2 2.7-2.7 2.7H7.7C6.2 26.5 5 25.4 5 23.8z"],
    ],
    lines: ["M10.8 14.2l2.2 3.1", "M15.2 12.6l2.2 3.1", "M19.6 13.6l2.2 3.1"],
  },
  whisk: {
    fills: [
      ["butter", "M4.4 25.7l7.2-7.2c.8-.8 2-.8 2.8 0 .8.8.8 2 0 2.8l-7.2 7.2c-.8.8-2 .8-2.8 0-.8-.8-.8-2 0-2.8z"],
    ],
    lines: [
      "M13.4 18.6C13 12.6 19.6 5 25.8 4.4c2-.2 2.5 1 2 2.5-2 6-9.9 12.4-14.4 11.7z",
      "M13.4 18.6c2.6-5 7.3-10.1 13.6-13.4",
      "M13.4 18.6c-.6-4.6 2.6-9.8 7.6-13",
      "M13.4 18.6c4.4.6 10.6-4.4 13.4-10.6",
    ],
  },
  envelope: {
    fills: [["butter", "M6 8.5h20a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 22V10A1.5 1.5 0 0 1 6 8.5z"]],
    lines: ["M5 9.6l11 8.2 11-8.2"],
  },
  linkedin: {
    fills: [["leaf", "M7.2 5h17.6A2.2 2.2 0 0 1 27 7.2v17.6a2.2 2.2 0 0 1-2.2 2.2H7.2A2.2 2.2 0 0 1 5 24.8V7.2A2.2 2.2 0 0 1 7.2 5z"]],
    lines: ["M11 14.2v7.6", "M11 10.4v.3", "M15.4 21.8v-7.6", "M15.4 17.6c0-2 1.3-3.4 3.1-3.4 1.9 0 3 1.3 3 3.4v4.2"],
  },
  instagram: {
    fills: [["tomato", "M10.2 4.8h11.6a5.4 5.4 0 0 1 5.4 5.4v11.6a5.4 5.4 0 0 1-5.4 5.4H10.2a5.4 5.4 0 0 1-5.4-5.4V10.2a5.4 5.4 0 0 1 5.4-5.4z"]],
    lines: ["M16 11a5 5 0 1 1 0 10 5 5 0 0 1 0-10z", "M22.4 9.3v.3"],
  },
} satisfies Record<string, Shape>;

export type IconName = keyof typeof shapes;

type Props = SVGProps<SVGSVGElement> & { name: IconName; title?: string };

export default function Doodle({ name, title, strokeWidth = 1.6, ...props }: Props) {
  const { fills = [], lines = [] } = shapes[name] as Shape;

  return (
    <svg
      viewBox="0 0 32 32"
      overflow="visible"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <g transform="translate(0.9 1.1)">
        {fills.map(([tone, d]) => (
          <path key={d} d={d} className={toneFill[tone]} />
        ))}
      </g>
      <g fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {fills.map(([, d]) => (
          <path key={`line-${d}`} d={d} />
        ))}
        {lines.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}

/** Loopy hand-drawn arrow that ends pointing down and to the left. */
export function LoopArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 90 70" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M84 6c-14 2-27 10-30 22-2 8 6 12 10 6 4-7-6-12-14-8-12 6-22 20-30 34" />
      <path d="M20 60l9.5-3.2M20 60l2-9.8" />
    </svg>
  );
}
