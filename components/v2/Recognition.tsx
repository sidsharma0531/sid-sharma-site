import MarginPhotos from "@/components/MarginPhotos";
import LogoImage from "@/components/ui/LogoImage";
import Rich from "@/components/ui/Rich";
import SectionHeading from "@/components/ui/SectionHeading";
import ShowMore from "@/components/ui/ShowMore";
import ThumbRow from "@/components/ui/ThumbRow";
import { recognition, type Award, type Tone } from "@/data/content";
import { getImage, photosFor } from "@/lib/images";
import { isLink, isPlaceholder } from "@/lib/text";

// Highlighter swipe behind each category name.
const highlight: Record<Tone, string> = {
  tomato: "bg-[linear-gradient(transparent_58%,rgb(228_80_47/0.25)_58%,rgb(228_80_47/0.25)_92%,transparent_92%)]",
  leaf: "bg-[linear-gradient(transparent_58%,rgb(92_154_72/0.28)_58%,rgb(92_154_72/0.28)_92%,transparent_92%)]",
  butter: "bg-[linear-gradient(transparent_58%,rgb(246_211_111/0.8)_58%,rgb(246_211_111/0.8)_92%,transparent_92%)]",
};

export default function Recognition() {
  return (
    <section id="recognition" className="container-page py-20 sm:py-28">
      <SectionHeading kicker={recognition.kicker} title={recognition.title} />

      <div className="space-y-12 sm:space-y-16">
        {recognition.categories.map((category) => (
          <div key={category.name} data-reveal className="md:grid md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
            <h3 className="mb-3 font-serif text-[1.6rem] leading-tight font-semibold tracking-[-0.015em] md:mb-0 md:pt-3">
              <span className={`box-decoration-clone px-0.5 ${highlight[category.tone]}`}>{category.name}</span>
            </h3>
            <ShowMore
              initial={recognition.showFirst}
              items={category.awards.map((award, i) => (
                <AwardRow key={i} award={award} />
              ))}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function AwardRow({ award }: { award: Award }) {
  const photos = photosFor("entry", award.id);
  // Awards sit in the right-hand column, so their margin photos float on the right.
  const margin = photosFor("margin", award.id);
  const meta = [award.issuer, award.year].filter((part): part is string => Boolean(part) && !isPlaceholder(part));

  return (
    <div className="relative flex gap-4 border-t border-dashed border-ink/25 py-4 sm:gap-5">
      <IssuerTile award={award} />
      <div className="min-w-0">
        <p className="font-serif text-[1.15rem] leading-snug font-semibold sm:text-xl">
          {isLink(award.href) ? (
            <a
              href={award.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-ink/20 decoration-[0.06em] underline-offset-[0.18em] transition-colors hover:decoration-tomato"
            >
              {award.name}
              <span aria-hidden className="ml-1 text-[0.8em] text-ink/50">
                ↗
              </span>
            </a>
          ) : (
            award.name
          )}
        </p>
        {meta.length > 0 && <p className="mt-0.5 text-sm text-ink/60">{meta.join(" · ")}</p>}
        {award.context && (
          <p className="mt-1 text-sm leading-snug text-ink/80">
            <Rich text={award.context} />
          </p>
        )}
        <ThumbRow photos={photos} className="mt-3" />
        <MarginPhotos photos={margin} side="right" variant="inline" />
      </div>
      <MarginPhotos photos={margin} side="right" variant="float" />
    </div>
  );
}

// The issuer's logo on a small white tile, or its initials when no logo was found.
function IssuerTile({ award }: { award: Award }) {
  const logo = award.logo ? getImage(award.logo, "logos", [1, 1]) : null;
  const initials = award.issuer
    .split(/\s+/)
    .filter((word) => /^[A-Z]/.test(word))
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <span aria-hidden className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-ink/10 sm:size-12">
      {logo?.exists ? (
        <span className="absolute inset-[16%]">
          <LogoImage image={logo} alt="" sizes="48px" />
        </span>
      ) : (
        <span className="font-serif text-[13px] font-semibold text-ink/70">{initials}</span>
      )}
    </span>
  );
}
