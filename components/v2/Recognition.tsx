import LogoImage from "@/components/ui/LogoImage";
import PhotoButton from "@/components/ui/PhotoButton";
import { awards, type V2Award } from "@/data/v2";
import { getImage, resolvePhotos } from "@/lib/images";
import Arrow from "./Arrow";
import SectionHead from "./SectionHead";
import { toneDot } from "./tone";

export default function Recognition() {
  return (
    <section id="recognition" aria-labelledby="recognition-title" className="scroll-mt-16 border-t border-ink/10 bg-paper/60">
      <div className="v2-wrap py-20 sm:py-28">
        <SectionHead
          id="recognition-title"
          label="Recognition"
          title="What others have recognized."
          intro="Grouped by what each was for. Where there's a certificate, a winners list, or a review, it's attached."
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-14">
          {awards.map((category) => (
            <div key={category.name} data-reveal>
              <h3 className="v2-label flex items-center gap-2.5 text-ink/70">
                <span aria-hidden className={`size-2 rounded-full ${toneDot[category.tone]}`} />
                {category.name}
              </h3>
              <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
                {category.awards.map((award) => (
                  <AwardRow key={award.id} award={award} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AwardRow({ award }: { award: V2Award }) {
  const logo = award.logo ? getImage(award.logo, "logos", [1, 1]) : null;
  const [certificate] = resolvePhotos(award.evidence?.photo && [award.evidence.photo], { onlyExisting: true });

  return (
    <li className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 py-5">
      <span className="grid size-11 place-items-center rounded-xl bg-white ring-1 ring-ink/10">
        {logo?.exists ? (
          <span className="relative block size-7">
            <LogoImage image={logo} alt="" sizes="28px" />
          </span>
        ) : (
          <span className="text-xs font-semibold text-ink/60">{award.issuer.slice(0, 2)}</span>
        )}
      </span>
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-serif text-lg leading-snug font-medium">{award.name}</span>
          {award.status && (
            <span className="rounded-full bg-tomato/10 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-tomato-deep uppercase">
              {award.status}
            </span>
          )}
        </p>
        <p className="mt-0.5 text-sm text-ink/55">
          {award.issuer}
          {award.year && ` · ${award.year}`}
        </p>
        {award.description && <p className="mt-2 text-sm leading-relaxed text-ink/70">{award.description}</p>}
        {(certificate || award.evidence?.href) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {certificate && (
              <PhotoButton
                photo={certificate}
                label={`See the certificate: ${award.name}`}
                className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium transition-colors hover:border-ink/50"
              >
                Certificate
              </PhotoButton>
            )}
            {award.evidence?.href && (
              <a
                href={award.evidence.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-ink/15 px-3 py-1 text-xs font-medium transition-colors hover:border-ink/50"
              >
                {award.evidence.hrefLabel ?? "Source"}
                <Arrow direction="up-right" />
              </a>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
