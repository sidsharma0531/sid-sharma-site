import Link from "next/link";
import { milestones, projectBySlug } from "@/data/v2";
import Arrow from "./Arrow";
import SectionHead from "./SectionHead";
import { toneDot } from "./tone";

// A short, dated path through the work. Dates come from a source (GitHub, press, award pages);
// anything without one says so instead of guessing.
export default function Milestones() {
  return (
    <section id="milestones" aria-labelledby="milestones-title" className="scroll-mt-16 border-t border-ink/10 bg-paper/60">
      <div className="v2-wrap py-20 sm:py-28">
        <SectionHead id="milestones-title" label="Milestones" title="How it unfolded." />
        <ol className="mt-12 border-t border-ink/12">
          {milestones.map((item) => {
            const project = item.slug ? projectBySlug(item.slug) : undefined;
            return (
              <li key={item.date + item.text} data-reveal className="grid gap-1 border-b border-ink/12 py-5 md:grid-cols-12 md:gap-8">
                <p className="font-serif text-lg font-medium tracking-[-0.01em] md:col-span-3">{item.date}</p>
                <div className="flex flex-col gap-2 md:col-span-9 md:flex-row md:items-baseline md:justify-between md:gap-8">
                  <p className="max-w-[62ch] leading-relaxed text-ink/75">{item.text}</p>
                  {project && (
                    <Link
                      href={`/v2/projects/${project.slug}`}
                      className="group inline-flex shrink-0 items-center gap-1.5 text-sm text-ink/60 transition-colors hover:text-ink"
                    >
                      <span aria-hidden className={`size-1.5 rounded-full ${toneDot[project.tone]}`} />
                      {project.name}
                      <Arrow className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
