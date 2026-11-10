import { Bullets, Dot, LinkRow, LogoRow, MetaLine, OrgName } from "@/components/Experience";
import OrgMark from "@/components/ui/OrgMark";
import Rich from "@/components/ui/Rich";
import SectionHeading from "@/components/ui/SectionHeading";
import StatBlock from "@/components/ui/StatBlock";
import ThumbRow from "@/components/ui/ThumbRow";
import CardVisual from "@/components/v3/CardVisual";
import SeeMore from "@/components/v3/SeeMore";
import SideScroller from "@/components/v3/SideScroller";
import { experience, type Entry, type FeaturedEntry } from "@/data/content";
import { resolvePhotos } from "@/lib/images";
import { isPlaceholder } from "@/lib/text";

// V3's Experience: every entry is a card in one row that scrolls left to right. The big three come
// first, each opening with the homepage's picture for it, then a handwritten "and a few more" and
// the shorter entries, two to a column. Same content as the homepage's Experience, from
// data/content.ts.
export default function ExperienceRow() {
  // Two short cards to a column. The tops fill first, then the bottoms, so the cards read in the
  // homepage's order row by row, and today's shorter entries land over longer ones, which evens
  // out the columns' heights.
  const { more } = experience;
  const count = Math.ceil(more.length / 2);
  const columns = Array.from({ length: count }, (_, i) => [more[i], more[i + count]].filter(Boolean));

  // On wide screens the section sits close under the logo wall, and the cards are short enough that
  // a laptop screen holds the logos, the heading, and the cards at once.
  return (
    <section id="experience" className="py-12 sm:py-28 lg:pt-10">
      <SideScroller
        heading={<SectionHeading kicker={experience.kicker} title={experience.title} className="lg:mb-6" />}
        label={experience.title}
      >
        {experience.featured.map((entry) => (
          <FeaturedCard key={entry.id} entry={entry} />
        ))}
        <MoreLabel text={experience.moreLabel} />
        {columns.map((column) => (
          <div key={column[0].id} data-card className="flex w-[min(76vw,21rem)] shrink-0 snap-start flex-col gap-4 sm:gap-5 lg:w-[31rem]">
            {column.map((entry) => (
              <SmallCard key={entry.id} entry={entry} />
            ))}
          </div>
        ))}
      </SideScroller>
    </section>
  );
}

const shell =
  "flex flex-col rounded-[1.75rem] border border-ink/10 bg-paper shadow-[0_18px_36px_-28px_rgba(34,28,24,0.45)]";

// The picture inset in the card: up top on phones and tablets, down the left side on wide screens,
// where the card turns sideways so it's short. Then name, role, summary, and numbers; the bullets
// wait behind "see more". Links sit at the bottom.
function FeaturedCard({ entry }: { entry: FeaturedEntry }) {
  const [title, subtitle] = entry.org.split(": ");
  // A stat without a real number never renders.
  const stats = (entry.stats ?? []).filter((stat) => !isPlaceholder(stat.value));

  return (
    <article
      data-card
      aria-labelledby={`${entry.id}-title`}
      className={`${shell} w-[min(84vw,30rem)] shrink-0 snap-start p-2.5 sm:p-3 lg:grid lg:w-[57rem] lg:grid-cols-[26.25rem_minmax(0,1fr)]`}
    >
      <CardVisual entry={entry} />

      <div className="flex flex-1 flex-col px-2.5 pt-5 pb-2.5 sm:px-4 sm:pt-6 sm:pb-4 lg:px-7 lg:pt-5 lg:pb-3">
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

        {entry.bullets?.length ? (
          <SeeMore>
            <Bullets items={entry.bullets} compact />
          </SeeMore>
        ) : null}

        <LinkRow links={entry.links} size="sm" className="mt-auto gap-2 pt-6" />
      </div>
    </article>
  );
}

// Narrower, with everything showing: these entries are short.
function SmallCard({ entry }: { entry: Entry }) {
  const photos = resolvePhotos(entry.photos, { onlyExisting: true });
  // The org is the card's heading, where a count reads oddly ("7 Houston hunger-relief orgs"), so
  // V3 leaves the number off. The logos underneath show each one.
  const heading = entry.org?.replace(/^\d+\s+/, "");

  return (
    <article aria-labelledby={`${entry.id}-title`} className={`${shell} flex-1 p-5 sm:p-6`}>
      <div className="flex items-start gap-3.5">
        <OrgMark mark={entry.mark} />
        <div className="min-w-0">
          <h3 id={`${entry.id}-title`} className="font-serif text-[1.3rem] leading-tight font-semibold tracking-[-0.015em]">
            {heading ? <OrgName name={heading} href={entry.orgHref} /> : entry.role}
          </h3>
          {heading && <p className="mt-1 text-[14px] leading-snug font-semibold">{entry.role}</p>}
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

// The handwritten break between the big three and the rest, with an arrow on to the next card. It
// sits level with the middle of the big cards' pictures (on wide screens, the middle of the row).
function MoreLabel({ text }: { text: string }) {
  return (
    <p className="mt-16 flex w-28 shrink-0 flex-col items-center gap-2 self-start text-center font-hand text-[1.65rem] leading-[0.95] text-tomato-deep sm:mt-32 sm:w-32 lg:mt-0 lg:self-center">
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
