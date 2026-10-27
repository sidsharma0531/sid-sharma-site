import Link from "next/link";
import Photo from "@/components/ui/Photo";
import { contact } from "@/data/content";
import { hero, projects } from "@/data/v2";
import { getImage } from "@/lib/images";
import Arrow from "./Arrow";
import CopyEmail from "./CopyEmail";
import { toneDot } from "./tone";

export default function Hero() {
  const photo = getImage(hero.photo.src, "photos", [4, 5]);
  const [before, after] = hero.lead.split(hero.underline);
  const [user, domain] = contact.email.split("@");

  return (
    <section aria-labelledby="v2-name" className="v2-wrap pt-10 pb-6 sm:pt-16 lg:pt-20">
      <div className="grid gap-10 md:grid-cols-12 md:gap-10 lg:gap-14">
        <div className="md:col-span-7 md:self-center">
          <p className="-rotate-2 font-hand text-[1.75rem] leading-none text-tomato-deep">{hero.hello}</p>
          <h1
            id="v2-name"
            className="mt-2 font-serif text-[clamp(3.4rem,10.5vw,8rem)] leading-[0.88] font-semibold tracking-[-0.04em] [font-variation-settings:'SOFT'_100,'WONK'_1]"
          >
            {hero.name}
            <span className="text-tomato">.</span>
          </h1>

          <p className="mt-8 max-w-[22ch] font-serif text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.15] font-medium tracking-[-0.015em]">
            {before}
            <span className="relative inline-block whitespace-nowrap">
              {hero.underline}
              <Squiggle />
            </span>
            {after}
          </p>
          <p className="mt-6 max-w-[56ch] text-[1.05rem] leading-relaxed text-ink/75 sm:text-lg">{hero.body}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-tomato-deep"
            >
              See the work
              <Arrow />
            </Link>
            <Link
              href="/casestudyversion/projects/rescuelog"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-sm font-medium transition-colors hover:border-ink/60"
            >
              How RescueLog works
            </Link>
            <CopyEmail user={user} domain={domain} variant="button" />
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid size-11 place-items-center rounded-full border border-ink/20 transition-colors hover:border-ink/60"
            >
              <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="currentColor">
                <path d="M3.6 5.6h-2V14h2zM2.6 1.9a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3M14.4 9.3c0-2.4-1.3-3.9-3.3-3.9-1 0-1.8.5-2.2 1.2V5.6h-2V14h2V9.6c0-1.1.5-1.9 1.5-1.9.9 0 1.4.7 1.4 1.9V14h2.6z" />
              </svg>
            </a>
          </div>
        </div>

        <figure className="md:col-span-5">
          <div className="overflow-hidden rounded-[2rem] ring-1 ring-ink/10">
            <Photo
              photo={photo}
              alt={hero.photo.alt}
              ratio={4 / 5}
              position={hero.photo.focus}
              preload
              sizes="(min-width: 1216px) 440px, (min-width: 768px) 38vw, 92vw"
            />
          </div>
          <figcaption className="mt-3 flex items-center gap-2 text-sm text-ink/55">
            <span aria-hidden className="size-1.5 rounded-full bg-tomato" />
            {hero.photoCaption}
          </figcaption>
        </figure>
      </div>

      <nav aria-label="Projects" className="mt-14 sm:mt-20">
        <ol className="grid gap-px border-y border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <li key={project.slug} className="bg-cream">
              <Link
                href={`/casestudyversion/projects/${project.slug}`}
                className="group flex h-full flex-col gap-1.5 py-5 transition-colors sm:px-5 sm:py-6 lg:first:pl-0"
              >
                <span className="v2-label flex items-center gap-2">
                  <span aria-hidden className={`size-2 rounded-full ${toneDot[project.tone]}`} />
                  {project.index}
                </span>
                <span className="mt-1 font-serif text-[1.35rem] leading-tight font-medium group-hover:text-tomato-deep">{project.name}</span>
                <span className="text-sm leading-snug text-ink/60">{project.short}</span>
                <Arrow className="mt-3 text-ink/40 transition-transform group-hover:translate-x-1 group-hover:text-tomato" />
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </section>
  );
}

// A hand-drawn underline that draws itself once (still for reduced motion).
function Squiggle() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 12"
      preserveAspectRatio="none"
      className="v2-draw pointer-events-none absolute inset-x-0 -bottom-[0.16em] h-[0.3em] w-full overflow-visible text-tomato"
    >
      <path
        pathLength={1}
        d="M2 8C30 2 50 2 78 7s50 5 78-1 50-5 78 1 46 4 64-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
