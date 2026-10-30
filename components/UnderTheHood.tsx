import { Fragment } from "react";
import Disclosure from "@/components/ui/Disclosure";
import type { Hood } from "@/data/content";

// The technical side of a project, folded away behind an "Under the hood" button so the card
// reads simply first: the pipeline step by step, then one real run through it.
export default function UnderTheHood({ hood }: { hood: Hood }) {
  return (
    <Disclosure label="Under the hood" icon={<CodeIcon />} className="col-span-full mt-8 sm:mt-10">
      <div className="pt-5">
        {/* On phones the panel reaches into the card's padding, to give the text more room. */}
        <div className="graph-paper -mx-3 rounded-[1.5rem] border border-ink/10 p-4 sm:mx-0 sm:p-7">
          <Label>How it works</Label>
          <p className="mt-2 max-w-[34ch] font-serif text-[1.4rem] leading-tight font-semibold tracking-[-0.01em] sm:text-[1.65rem]">
            {hood.title}
          </p>

          <ol className="mt-7 grid gap-5 lg:grid-cols-4 lg:gap-6">
            {hood.steps.map((step, i) => (
              <li key={step.title} className="relative flex gap-4 lg:block">
                {i < hood.steps.length - 1 && <Connector />}
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-paper font-mono text-[12.5px] font-semibold text-leaf-deep ring-1 ring-leaf/45">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 lg:mt-4">
                  <p className="text-[15px] font-semibold">{step.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-ink/70">{step.body}</p>
                  <p className="mt-2 font-mono text-[11.5px] text-leaf-deep">{step.tech}</p>
                </div>
              </li>
            ))}
          </ol>

          {hood.sample && <Sample sample={hood.sample} />}
        </div>
      </div>
    </Disclosure>
  );
}

// One real run, as a dark strip of numbers: what went in and what came out.
function Sample({ sample }: { sample: NonNullable<Hood["sample"]> }) {
  return (
    <figure className="mt-8 rounded-2xl bg-ink px-4 py-4 font-mono text-cream sm:px-5">
      <figcaption className="text-[11.5px] leading-relaxed text-cream/60">
        <span className="tracking-[0.08em] text-butter uppercase">{sample.label}</span>
        <span aria-hidden> · </span>
        {sample.source}
      </figcaption>
      <p className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[14px] sm:text-[15px]">
        {sample.flow.map((part, i) => (
          <Fragment key={part}>
            {i > 0 && (
              <span aria-hidden className="text-leaf">
                →
              </span>
            )}
            <span>{part}</span>
          </Fragment>
        ))}
      </p>
      <p className="mt-1.5 text-[11.5px] text-cream/50">{sample.note}</p>
    </figure>
  );
}

// Dashed arrow from one step's number to the next: down on phones, across on wide screens.
function Connector() {
  return (
    <span
      aria-hidden
      className="absolute top-11 -bottom-3 left-[1.0625rem] border-l border-dashed border-ink/30 after:absolute after:-bottom-px after:-left-[4px] after:size-[7px] after:rotate-45 after:border-r after:border-b after:border-ink/40 lg:top-[1.0625rem] lg:-right-4 lg:bottom-auto lg:left-11 lg:border-t lg:border-l-0 lg:after:top-[-4px] lg:after:right-0 lg:after:bottom-auto lg:after:left-auto lg:after:-rotate-45"
    />
  );
}

function Label({ children }: { children: string }) {
  return <p className="font-mono text-[11.5px] tracking-[0.08em] text-ink/50 uppercase">{children}</p>;
}

function CodeIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.5 4.5 2 8l3.5 3.5M10.5 4.5 14 8l-3.5 3.5M9 3 7 13" />
    </svg>
  );
}
