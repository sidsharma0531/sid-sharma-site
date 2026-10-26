import BookMockup from "@/components/BookMockup";
import PhoneMockup from "@/components/PhoneMockup";
import Polaroids from "@/components/Polaroids";
import Chip from "@/components/ui/Chip";
import OrgMark from "@/components/ui/OrgMark";
import Rich from "@/components/ui/Rich";
import SectionHeading from "@/components/ui/SectionHeading";
import StatBlock from "@/components/ui/StatBlock";
import ThumbRow from "@/components/ui/ThumbRow";
import { experience, type Entry, type FeaturedEntry } from "@/data/content";
import { getImage, resolvePhotos } from "@/lib/images";
import { isLink } from "@/lib/text";

export default function Experience() {
  return (
    <section id="experience" className="container-page py-20 sm:py-28">
      <SectionHeading kicker={experience.kicker} title={experience.title} />

      <div className="space-y-8 sm:space-y-10">
        {experience.featured.map((entry) => (
          <FeaturedCard key={entry.id} entry={entry} />
        ))}
      </div>

      <p data-reveal className="mt-16 font-hand text-[1.65rem] leading-none text-tomato-deep sm:mt-20">
        {experience.moreLabel}
      </p>
      <ul className="mt-5 grid md:grid-cols-2 md:gap-x-12">
        {experience.more.map((entry) => (
          <CompactRow key={entry.id} entry={entry} />
        ))}
      </ul>
    </section>
  );
}

/* ---------- Featured entries ---------- */

// Phone and book cards: text in one column, the visual spanning the other.
// On phones the visual sits between the intro and the stats.
const layouts = {
  phone:
    "[grid-template-areas:'head'_'visual'_'stats'_'details'] md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] md:grid-rows-[auto_auto_1fr] md:[grid-template-areas:'head_visual'_'stats_visual'_'details_visual']",
  book: "[grid-template-areas:'head'_'visual'_'stats'_'details'] md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:grid-rows-[auto_auto_1fr] md:[grid-template-areas:'visual_head'_'visual_stats'_'visual_details']",
  polaroids: "[grid-template-areas:'head'_'stats'_'visual'_'details']",
};

function FeaturedCard({ entry }: { entry: FeaturedEntry }) {
  const { visual } = entry;

  let visualNode: React.ReactNode;
  if (visual.kind === "phone") {
    visualNode = <PhoneMockup screens={resolvePhotos(visual.screens, { fallback: [9, 19.5] })} name={entry.org} />;
  } else if (visual.kind === "book") {
    const cover = { ...getImage(visual.cover.src, "photos", [2, 3]), alt: visual.cover.alt };
    visualNode = <BookMockup cover={cover} title={visual.title} subtitle={visual.subtitle} author={visual.author} />;
  } else {
    visualNode = <Polaroids photos={resolvePhotos(visual.photos, { fallback: [1, 1] })} />;
  }

  return (
    <article
      data-reveal
      aria-labelledby={`${entry.id}-title`}
      className={`grid rounded-[2rem] border border-ink/10 bg-paper p-5 shadow-[0_30px_60px_-44px_rgba(34,28,24,0.5)] sm:p-8 md:gap-x-10 lg:gap-x-14 lg:p-10 ${layouts[visual.kind]}`}
    >
      <EntryHead entry={entry} />
      <div className="mt-8 [grid-area:visual] md:mt-0">{visualNode}</div>
      <EntryStats entry={entry} />
      <EntryDetails entry={entry} />
    </article>
  );
}

function EntryHead({ entry }: { entry: FeaturedEntry }) {
  const [title, subtitle] = entry.org.split(": ");
  return (
    <div className="[grid-area:head]">
      <div className="flex items-start gap-4">
        <OrgMark mark={entry.mark} size="lg" />
        <div className="min-w-0 pt-0.5">
          <h3 id={`${entry.id}-title`} className="font-serif text-[1.9rem] leading-[1.05] font-semibold tracking-[-0.02em] sm:text-[2.3rem]">
            <OrgName name={title} href={entry.orgHref} />
          </h3>
          {subtitle && <p className="mt-1 font-serif text-lg leading-snug text-ink/70 italic">{subtitle}</p>}
          <p className="mt-1.5 text-[15px]">
            <span className="font-semibold">{entry.role}</span>
            <Dot />
            <span className="text-ink/70">{entry.type}</span>
          </p>
          <p className="text-sm text-ink/55">
            <Rich text={entry.dates} />
            {entry.location && (
              <>
                <Dot />
                {entry.location}
              </>
            )}
          </p>
        </div>
      </div>
      <p className="mt-6 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink/80 sm:text-lg">
        <Rich text={entry.summary} />
      </p>
    </div>
  );
}

function EntryStats({ entry }: { entry: FeaturedEntry }) {
  if (!entry.stats?.length) return null;
  const wide = entry.visual.kind === "polaroids";
  return (
    <ul
      className={`mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-dashed border-ink/25 pt-6 [grid-area:stats] ${
        wide ? "sm:grid-cols-3" : ""
      }`}
    >
      {entry.stats.map((stat) => (
        <li key={stat.label}>
          <StatBlock stat={stat} tone={entry.mark.tone} size={wide ? "lg" : "md"} />
        </li>
      ))}
    </ul>
  );
}

function EntryDetails({ entry }: { entry: FeaturedEntry }) {
  const photos = resolvePhotos(entry.photos, { onlyExisting: true });
  return (
    <div className="[grid-area:details]">
      <Bullets items={entry.bullets} />
      <ThumbRow photos={photos} className="mt-6" />
      <div className="mt-7 flex flex-wrap items-center gap-3">
        {entry.links.map((link) => (
          <Chip key={link.label} {...link} />
        ))}
      </div>
    </div>
  );
}

/* ---------- Compact LinkedIn-style rows ---------- */

function CompactRow({ entry }: { entry: Entry }) {
  const photos = resolvePhotos(entry.photos, { onlyExisting: true });
  return (
    <li data-reveal className="flex gap-4 border-t border-dashed border-ink/25 py-6 sm:gap-5">
      <OrgMark mark={entry.mark} />
      <div className="min-w-0 flex-1">
        <h4 className="text-[1.05rem] leading-snug font-semibold">{entry.role}</h4>
        <p className="text-[15px]">
          <OrgName name={entry.org} href={entry.orgHref} />
          <Dot />
          <span className="text-ink/65">{entry.type}</span>
        </p>
        <p className="text-sm text-ink/55">
          <Rich text={entry.dates} />
          {entry.location && (
            <>
              <Dot />
              {entry.location}
            </>
          )}
        </p>
        <p className="mt-2.5 text-[15px] leading-relaxed text-ink/80">
          <Rich text={entry.summary} />
        </p>
        <Bullets items={entry.bullets} />
        <ThumbRow photos={photos} className="mt-4" />
        <div className="mt-4 flex flex-wrap gap-2">
          {entry.links.map((link) => (
            <Chip key={link.label} size="sm" {...link} />
          ))}
        </div>
      </div>
    </li>
  );
}

/* ---------- Small pieces ---------- */

function OrgName({ name, href }: { name: string; href?: string }) {
  if (!isLink(href)) return <>{name}</>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-ink/20 decoration-[0.06em] underline-offset-[0.18em] transition-colors hover:decoration-tomato"
    >
      {name}
    </a>
  );
}

function Bullets({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-6 space-y-2.5 text-[15px] leading-relaxed text-ink/80 sm:text-base">
      {items.map((item) => (
        <li key={item} className="relative pl-5 before:absolute before:top-[0.62em] before:left-0.5 before:size-2 before:rounded-full before:bg-tomato">
          <Rich text={item} />
        </li>
      ))}
    </ul>
  );
}

function Dot() {
  return (
    <span aria-hidden className="mx-1.5 text-ink/35">
      ·
    </span>
  );
}
