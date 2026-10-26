import Fill from "@/components/ui/Fill";
import LinkButton from "@/components/ui/LinkButton";
import Photo from "@/components/ui/Photo";
import SectionHeader from "@/components/ui/SectionHeader";
import { projects, type Project } from "@/lib/content";
import { getPhoto } from "@/lib/photos";

// Stagger only when the cards sit side by side.
const delays = ["", "lg:[--reveal-delay:120ms]", "lg:[--reveal-delay:240ms]"];

export default function Work() {
  return (
    <section id="work" className="container-page pb-24 sm:pb-32 lg:pb-40">
      <SectionHeader label="Work" />

      {/* On desktop each card is a 4-row subgrid so the stat rules and buttons line up. */}
      <div className="grid gap-20 sm:gap-24 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-0">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} className={delays[i]} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, className }: { project: Project; className: string }) {
  const { stats, usedBy, links } = project;
  const hasDetails = Boolean(stats?.length || usedBy);

  return (
    <article
      data-reveal
      aria-labelledby={`${project.id}-title`}
      className={`flex flex-col lg:row-span-4 lg:grid lg:grid-rows-subgrid ${className}`}
    >
      <ProjectImage project={project} />

      <div className="pt-7 sm:pt-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{project.kicker}</p>
        <h3
          id={`${project.id}-title`}
          className="mt-3 font-serif text-[2rem] leading-[1.05] tracking-[-0.02em] sm:text-[2.5rem]"
        >
          {project.title}
          {project.subtitle && (
            <span className="mt-1 block text-[1.25rem] leading-snug tracking-[-0.01em] text-ink/65 italic sm:text-2xl">
              {project.subtitle}
            </span>
          )}
        </h3>
        <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-ink/75 sm:text-base">
          {project.description}
        </p>
      </div>

      <div className={hasDetails ? "pt-8" : "hidden lg:block"}>
        {stats && stats.length > 0 && (
          <dl className="grid grid-cols-2 gap-6 border-t border-ink/10 pt-5">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1">
                <dt className="text-sm text-ink/60">{stat.label}</dt>
                <dd className="font-serif text-[2.5rem] leading-none font-light tracking-[-0.02em] tabular-nums">
                  <Fill>{stat.value}</Fill>
                </dd>
              </div>
            ))}
          </dl>
        )}
        {usedBy && (
          <p className="mt-6 text-sm leading-relaxed text-ink/75">
            <span className="mr-2 text-xs font-medium uppercase tracking-[0.14em] text-ink/45">Used by</span>
            <Fill>{usedBy}</Fill>
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3 pt-8 lg:self-end">
        {links.map((link) => (
          <LinkButton key={link.label} {...link} />
        ))}
      </div>
    </article>
  );
}

const panel = "relative aspect-[4/5] overflow-hidden sm:aspect-[3/2] lg:aspect-[4/5]";

function ProjectImage({ project }: { project: Project }) {
  const { image } = project;

  if (image.kind === "photo") {
    const photo = getPhoto(image.file, [4, 5]);
    return (
      <div className={panel}>
        <Photo
          photo={photo}
          alt={image.alt}
          ratio="fill"
          hint="Photo, crops to fit"
          sizes="(min-width: 1024px) 34vw, 100vw"
        />
      </div>
    );
  }

  if (image.kind === "phone") {
    const photo = getPhoto(image.file, [9, 19.5]);
    return (
      <div className={`${panel} flex items-center justify-center bg-ink/[0.05]`}>
        <div
          className="relative aspect-[9/19.5] h-[86%] bg-ink shadow-[0_28px_50px_-24px_rgba(25,24,20,0.55)]"
          style={{ borderRadius: "15% / 7%" }}
        >
          {/* Inset as a % of the phone itself (padding % would follow the panel width). */}
          <div
            className="absolute inset-x-[4%] inset-y-[1.85%] overflow-hidden"
            style={{ borderRadius: "12% / 5.5%" }}
          >
            <Photo
              photo={photo}
              alt={image.alt}
              ratio="fill"
              bg="bg-paper"
              hint="Screenshot"
              imgClassName="object-top"
              sizes="(min-width: 1024px) 180px, 50vw"
            />
            <span
              aria-hidden
              className="absolute top-[2.2%] left-1/2 h-[3.4%] w-[32%] -translate-x-1/2 rounded-full bg-ink"
            />
          </div>
        </div>
      </div>
    );
  }

  const photo = getPhoto(image.file, [2, 3]);
  return (
    <div className={`${panel} flex items-center justify-center bg-ink/[0.05]`}>
      <div
        className="relative h-[72%] rounded-[2px] shadow-[0_2px_4px_rgba(25,24,20,0.12),0_24px_48px_-16px_rgba(25,24,20,0.45)]"
        style={{ aspectRatio: photo.width / photo.height }}
      >
        <Photo
          photo={photo}
          alt={image.alt}
          ratio="fill"
          bg="bg-paper"
          hint="Cover, 2:3"
          className="rounded-[2px]"
          sizes="(min-width: 1024px) 240px, 60vw"
        />
      </div>
    </div>
  );
}
