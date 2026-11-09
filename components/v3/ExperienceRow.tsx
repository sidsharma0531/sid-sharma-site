import { Bullets, Dot, LinkRow, LogoRow, MetaLine, OrgName } from "@/components/Experience";
import OrgMark from "@/components/ui/OrgMark";
import Rich from "@/components/ui/Rich";
import SectionHeading from "@/components/ui/SectionHeading";
import StatBlock from "@/components/ui/StatBlock";
import ThumbRow from "@/components/ui/ThumbRow";
import SeeMore from "@/components/v3/SeeMore";
import SideScroller from "@/components/v3/SideScroller";
import { experience, type Entry, type FeaturedEntry } from "@/data/content";
import { resolvePhotos } from "@/lib/images";
import { isPlaceholder } from "@/lib/text";

// V3's Experience: every entry is a card in one row that scrolls left to right. The big three come
// first with their numbers up front, then a handwritten "and a few more" and the smaller cards.
// Same content as the homepage's Experience, from data/content.ts.
export default function ExperienceRow() {
  return (
    <section id="experience" className="py-12 sm:py-28">
      <SideScroller heading={<SectionHeading kicker={experience.kicker} title={experience.title} />} label={experience.title}>
        {experience.featured.map((entry) => (
          <FeaturedCard key={entry.id} entry={entry} />
        ))}
        <MoreLabel text={experience.moreLabel} />
        {experience.more.map((entry) => (
          <SmallCard key={entry.id} entry={entry} />
        ))}
      </SideScroller>
    </section>
  );
}

const card =
  "flex shrink-0 snap-start flex-col rounded-[1.75rem] border border-ink/10 bg-paper shadow-[0_18px_36px_-28px_rgba(34,28,24,0.45)]";

// Name, role, summary, and numbers; the bullets and photos wait behind "see more", so the three
// cards stay close in height. Links sit at the bottom.
function FeaturedCard({ entry }: { entry: FeaturedEntry }) {
  const [title, subtitle] = entry.org.split(": ");
  // A stat without a real number never renders.
  const stats = (entry.stats ?? []).filter((stat) => !isPlaceholder(stat.value));
  // The homepage's polaroids or book come along as thumbnails. App screens don't: cropped square,
  // they're mostly blank.
  const { visual } = entry;
  const visualPhotos =
    visual.kind === "polaroids"
      ? visual.photos
      : visual.kind === "book"
        ? [visual.cover, ...(visual.preview ? [visual.preview] : [])]
        : [];
  const photos = resolvePhotos([...(entry.photos ?? []), ...visualPhotos], { onlyExisting: true });

  return (
    <article data-card aria-labelledby={`${entry.id}-title`} className={`${card} w-[min(84vw,30rem)] p-5 sm:p-7`}>
      <div className="flex items-start gap-4">
        <OrgMark mark={entry.mark} size="lg" />
        <div className="min-w-0 pt-0.5">
          <h3 id={`${entry.id}-title`} className="font-serif text-[1.75rem] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[2rem]">
            <OrgName name={title} href={entry.orgHref} />
          </h3>
          {subtitle && <p className="mt-1 font-serif text-base leading-snug text-ink/70 italic">{subtitle}</p>}
          <p className="mt-1.5 text-[15px]">
            <span className="font-semibold">{entry.role}</span>
            {entry.type && (
              <>
                <Dot className="hidden sm:inline" />
                <span className="block text-ink/70 sm:inline">{entry.type}</span>
              </>
            )}
          </p>
          <MetaLine parts={[entry.dates, entry.location]} />
        </div>
      </div>

      <p className="mt-5 text-[15px] leading-relaxed text-ink/80 sm:text-base">
        <Rich text={entry.summary} />
      </p>

      {stats.length > 0 && (
        <ul
          className={`mt-6 grid grid-cols-2 gap-x-5 gap-y-5 border-t border-dashed border-ink/25 pt-5 ${
            stats.length >= 3 ? "sm:grid-cols-3" : ""
          }`}
        >
          {stats.map((stat) => (
            <li key={`${stat.value} ${stat.label}`}>
              <StatBlock stat={stat} tone={entry.mark.tone} size="sm" />
            </li>
          ))}
        </ul>
      )}

      {(entry.bullets?.length || photos.length > 0) && (
        <SeeMore>
          <Bullets items={entry.bullets} compact />
          <ThumbRow photos={photos} compact className="mt-4" />
        </SeeMore>
      )}

      <LinkRow links={entry.links} size="sm" className="mt-auto gap-2 pt-6" />
    </article>
  );
}

// Narrower, with everything showing: these entries are short.
function SmallCard({ entry }: { entry: Entry }) {
  const photos = resolvePhotos(entry.photos, { onlyExisting: true });

  return (
    <article data-card aria-labelledby={`${entry.id}-title`} className={`${card} w-[min(76vw,21rem)] p-5 sm:p-6`}>
      <div className="flex items-start gap-3.5">
        <OrgMark mark={entry.mark} />
        <div className="min-w-0">
          <h3 id={`${entry.id}-title`} className="font-serif text-[1.3rem] leading-tight font-semibold tracking-[-0.015em]">
            {entry.org ? <OrgName name={entry.org} href={entry.orgHref} /> : entry.role}
          </h3>
          {entry.org && <p className="mt-1 text-[14px] leading-snug font-semibold">{entry.role}</p>}
          {entry.type && <p className="text-[14px] leading-snug text-ink/65">{entry.type}</p>}
          <MetaLine parts={[entry.dates, entry.location]} />
        </div>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
        <Rich text={entry.summary} />
      </p>
      <Bullets items={entry.bullets} compact />
      <LogoRow logos={entry.logos} fluid />
      <ThumbRow photos={photos} compact className="mt-4" />
      <LinkRow links={entry.links} size="sm" className="mt-auto gap-2 pt-5" />
    </article>
  );
}

// The handwritten break between the big three and the rest, with an arrow on to the next card.
function MoreLabel({ text }: { text: string }) {
  return (
    <p className="flex w-28 shrink-0 flex-col items-center gap-2 self-center text-center font-hand text-[1.65rem] leading-[0.95] text-tomato-deep sm:w-32">
      <span className="-rotate-3">{text}</span>
      <svg
        aria-hidden
        viewBox="0 0 64 28"
        className="h-6 w-14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 17c9-6 18-8 28-5s17 4 26-1" />
        <path d="M50 4.6l8 6.6-9.4 4.2" />
      </svg>
    </p>
  );
}
