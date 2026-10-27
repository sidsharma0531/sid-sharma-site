import Link from "next/link";
import { projects, type Project } from "@/data/v2";
import Arrow from "./Arrow";
import ProjectVisual from "./ProjectVisual";
import ProofList from "./ProofList";
import SectionHead from "./SectionHead";
import { toneDot } from "./tone";

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="v2-wrap scroll-mt-16 py-20 sm:py-28">
      <SectionHead
        id="work-title"
        label="Selected work"
        title="Four things I've built."
        intro="Each one has a case study: the problem, what I did, how it went, and the evidence."
      />
      <div className="mt-10 sm:mt-14">
        {projects.map((project, i) => (
          <Feature key={project.slug} project={project} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function Feature({ project, flip }: { project: Project; flip: boolean }) {
  const href = `/v2/projects/${project.slug}`;
  return (
    <article
      data-reveal
      aria-labelledby={`${project.slug}-name`}
      className="grid gap-8 border-t border-ink/12 py-12 sm:py-16 lg:grid-cols-12 lg:items-center lg:gap-14"
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className={`block transition-transform duration-500 hover:-translate-y-1 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
      >
        <ProjectVisual slug={project.slug} />
      </Link>

      <div className="max-w-2xl lg:col-span-5">
        <p className="v2-label flex items-center gap-2">
          <span aria-hidden className={`size-2 rounded-full ${toneDot[project.tone]}`} />
          {project.index} · {project.role}
        </p>
        <h3 id={`${project.slug}-name`} className="mt-3 font-serif text-[clamp(2.2rem,4vw,3rem)] leading-none font-semibold tracking-[-0.03em]">
          {project.name}
        </h3>
        <p className="mt-3 font-serif text-xl leading-snug text-ink/70 italic">{project.tagline}</p>
        <p className="mt-5 text-[1.02rem] leading-relaxed text-ink/75">{project.summary}</p>
        <ProofList proofs={project.proofs} layout="rows" className="mt-7" />
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link href={href} className="group inline-flex items-center gap-2 font-medium">
            Read the case study
            <Arrow className="text-tomato transition-transform group-hover:translate-x-1" />
          </Link>
          {project.links[0] && (
            <a
              href={project.links[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-ink/60 transition-colors hover:text-ink"
            >
              {project.links[0].label}
              <Arrow direction="up-right" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
