import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StoreBadge from "@/components/ui/StoreBadge";
import Arrow from "@/components/v2/Arrow";
import Blocks from "@/components/v2/case/Blocks";
import ProjectVisual from "@/components/v2/ProjectVisual";
import ProofList from "@/components/v2/ProofList";
import { toneDot } from "@/components/v2/tone";
import { caseStudies, links, projectBySlug, projects, type Project, type ProjectSlug } from "@/data/v2";

type Params = { slug: string };

// Only the four case studies exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug as ProjectSlug];
  if (!study) return {};
  const title = `${study.title} · Sid Sharma`;
  return {
    title: study.title,
    description: study.subtitle,
    alternates: { canonical: `/v2/projects/${slug}` },
    openGraph: { title, description: study.subtitle, url: `/v2/projects/${slug}`, type: "article" },
    twitter: { title, description: study.subtitle },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const study = caseStudies[slug as ProjectSlug];
  const project = projectBySlug(slug);
  if (!study || !project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <article aria-labelledby="case-title">
      <header className="v2-wrap pt-8 sm:pt-12">
        <Link href="/v2#work" className="group inline-flex items-center gap-2 text-sm text-ink/60 transition-colors hover:text-ink">
          <Arrow direction="left" className="transition-transform group-hover:-translate-x-0.5" />
          All work
        </Link>

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="v2-label flex items-center gap-2">
              <span aria-hidden className={`size-2 rounded-full ${toneDot[project.tone]}`} />
              Case study {project.index}
            </p>
            <h1 id="case-title" className="mt-4 font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.92] font-semibold tracking-[-0.035em]">
              {study.title}
            </h1>
            <p className="mt-5 max-w-[30ch] font-serif text-[clamp(1.35rem,2.4vw,1.85rem)] leading-snug text-ink/75 italic">{study.subtitle}</p>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 self-end md:col-span-4 md:grid-cols-1 lg:grid-cols-2">
            {study.meta.map((item) => (
              <div key={item.label} className="min-w-0">
                <dt className="v2-label">{item.label}</dt>
                <dd className="mt-1 text-[15px] leading-snug">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <CaseLinks project={project} />
      </header>

      <div className="v2-wrap mt-10 sm:mt-14">
        <ProjectVisual slug={project.slug} size="hero" />
      </div>

      <section aria-label="At a glance" className="v2-wrap mt-12 sm:mt-16">
        <ProofList proofs={study.glance} columns={study.glance.length === 4 ? 4 : 3} className="border-y border-ink/12 py-8" />
      </section>

      <div className="v2-wrap grid gap-x-10 md:grid-cols-12">
        <nav aria-label="On this page" className="hidden md:col-span-3 md:block">
          <ol className="sticky top-24 space-y-3 py-14 text-sm">
            {study.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-ink/55 transition-colors hover:text-ink">
                  {section.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="md:col-span-9">
          {study.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              className="scroll-mt-20 border-b border-ink/12 py-12 sm:py-16"
            >
              <p className="v2-label">{section.label}</p>
              <h2
                id={`${section.id}-title`}
                className="mt-3 max-w-[26ch] font-serif text-[clamp(1.7rem,3.2vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.02em]"
              >
                {section.title}
              </h2>
              <div className="mt-8">
                <Blocks blocks={section.blocks} />
              </div>
            </section>
          ))}

          <section aria-labelledby="sources-title" className="py-12">
            <h2 id="sources-title" className="v2-label">
              Sources
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              {study.sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer" className="v2-link inline-flex items-center gap-1 text-ink/75">
                    {source.label}
                    <Arrow direction="up-right" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <nav aria-label="More case studies" className="border-t border-ink/10 bg-paper/60">
        <div className="v2-wrap flex flex-col-reverse gap-8 py-14 sm:flex-row sm:items-end sm:justify-between">
          <Link href="/v2#work" className="group inline-flex items-center gap-2 text-sm text-ink/60 transition-colors hover:text-ink">
            <Arrow direction="left" className="transition-transform group-hover:-translate-x-0.5" />
            All work
          </Link>
          <Link href={`/v2/projects/${next.slug}`} className="group sm:text-right">
            <span className="v2-label block">Next case study</span>
            <span className="mt-2 flex items-center gap-3 font-serif text-[clamp(2rem,4vw,3rem)] leading-none font-semibold tracking-[-0.03em] group-hover:text-tomato-deep sm:justify-end">
              {next.name}
              <Arrow className="text-tomato transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </nav>
    </article>
  );
}

// Outbound links under the header. RescueLog gets the official store badges.
function CaseLinks({ project }: { project: Project }) {
  if (project.links.length === 0) return null;
  if (project.slug === "rescuelog") {
    return (
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <a
          href={links.rescuelog}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-tomato-deep"
        >
          Visit the website
          <Arrow direction="up-right" />
        </a>
        <StoreBadge label="App Store" href={links.appStore} badge="app-store" />
        <StoreBadge label="Google Play" href={links.googlePlay} badge="google-play" />
      </div>
    );
  }
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      {project.links.map((link, i) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors ${
            i === 0 ? "bg-ink text-cream hover:bg-tomato-deep" : "border border-ink/20 hover:border-ink/60"
          }`}
        >
          {link.label}
          <Arrow direction="up-right" />
        </a>
      ))}
    </div>
  );
}
