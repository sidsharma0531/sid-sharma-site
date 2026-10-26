import BookMockup from "@/components/BookMockup";
import MarginPhotos from "@/components/MarginPhotos";
import PhoneMockup from "@/components/PhoneMockup";
import Polaroids from "@/components/Polaroids";
import Chip from "@/components/ui/Chip";
import LogoImage from "@/components/ui/LogoImage";
import OrgMark from "@/components/ui/OrgMark";
import Rich from "@/components/ui/Rich";
import SectionHeading from "@/components/ui/SectionHeading";
import StatBlock from "@/components/ui/StatBlock";
import ThumbRow from "@/components/ui/ThumbRow";
import { experience, type Entry, type FeaturedEntry, type LinkChip, type Logo } from "@/data/content";
import { getImage, photosFor, resolvePhotos, type ResolvedPhoto } from "@/lib/images";
import { isLink, isPlaceholder } from "@/lib/text";

type Side = "left" | "right";

export default function Experience() {
  // Margin photos on the full-width cards alternate sides, starting on the left.
  let marginCount = 0;
  const featuredSides = experience.featured.map((entry): Side => {
    const side = marginCount % 2 === 0 ? "left" : "right";
    if (photosFor("margin", entry.id).length > 0) marginCount++;
    return side;
  });

  return (
    <section id="experience" className="container-page py-20 sm:py-28">
      <SectionHeading kicker={experience.kicker} title={experience.title} />

      <div className="space-y-8 sm:space-y-10">
        {experience.featured.map((entry, i) => (
          <FeaturedCard key={entry.id} entry={entry} side={featuredSides[i]} />
        ))}
      </div>

      <p data-reveal className="mt-16 font-hand text-[1.65rem] leading-none text-tomato-deep sm:mt-20">
        {experience.moreLabel}
      </p>
      <ul className="mt-5 grid md:grid-cols-2 md:gap-x-12">
        {experience.more.map((entry, i) => (
          // On two-column screens, margin photos sit on the side of their column.
          <CompactRow key={entry.id} entry={entry} side={i % 2 === 0 ? "left" : "right"} />
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

function FeaturedCard({ entry, side }: { entry: FeaturedEntry; side: Side }) {
  const { visual } = entry;
  const margin = photosFor("margin", entry.id);

  let visualNode: React.ReactNode;
  if (visual.kind === "phone") {
    visualNode = <PhoneMockup screens={resolvePhotos(visual.screens, { fallback: [9, 19.5] })} name={entry.org} />;
  } else if (visual.kind === "book") {
    const cover = { ...getImage(visual.cover.src, "photos", [2, 3]), alt: visual.cover.alt };
    visualNode = <BookMockup cover={cover} title={visual.title} subtitle={visual.subtitle} author={visual.author} />;
  } else {
    visualNode = <Polaroids photos={photosFor("entry", entry.id)} />;
  }

  return (
    <article
      data-reveal
      aria-labelledby={`${entry.id}-title`}
      className={`relative grid rounded-[2rem] border border-ink/10 bg-paper p-5 shadow-[0_30px_60px_-44px_rgba(34,28,24,0.5)] sm:p-8 md:gap-x-10 lg:gap-x-14 lg:p-10 ${layouts[visual.kind]}`}
    >
      <EntryHead entry={entry} />
      <div className="mt-8 [grid-area:visual] md:mt-0">{visualNode}</div>
      <EntryStats entry={entry} />
      <EntryDetails entry={entry} margin={margin} side={side} />
      <MarginPhotos photos={margin} side={side} variant="float" />
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
            {entry.type && (
              <>
                <Dot />
                <span className="text-ink/70">{entry.type}</span>
              </>
            )}
          </p>
          <MetaLine parts={[entry.dates, entry.location]} />
        </div>
      </div>
      <p className="mt-6 max-w-[62ch] text-[1.05rem] leading-relaxed text-ink/80 sm:text-lg">
        <Rich text={entry.summary} />
      </p>
    </div>
  );
}

function EntryStats({ entry }: { entry: FeaturedEntry }) {
  // A stat without a real number never renders.
  const stats = (entry.stats ?? []).filter((stat) => !isPlaceholder(stat.value));
  if (stats.length === 0) return null;
  const wide = entry.visual.kind === "polaroids";
  const columns = stats.length >= 3 ? (wide ? "sm:grid-cols-3" : "lg:grid-cols-3") : "";
  return (
    <ul className={`mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-dashed border-ink/25 pt-6 [grid-area:stats] ${columns}`}>
      {stats.map((stat) => (
        <li key={stat.label}>
          <StatBlock stat={stat} tone={entry.mark.tone} size={wide ? "lg" : "md"} />
        </li>
      ))}
    </ul>
  );
}

function EntryDetails({ entry, margin, side }: { entry: FeaturedEntry; margin: ResolvedPhoto[]; side: Side }) {
  // The polaroid table already shows this entry's photos; other cards get thumbnails.
  const photos = entry.visual.kind === "polaroids" ? [] : photosFor("entry", entry.id);
  return (
    <div className="[grid-area:details]">
      <Bullets items={entry.bullets} />
      <ThumbRow photos={photos} className="mt-6" />
      <LinkRow links={entry.links} className="mt-7 gap-3" />
      <MarginPhotos photos={margin} side={side} variant="inline" />
    </div>
  );
}

/* ---------- Compact LinkedIn-style rows ---------- */

function CompactRow({ entry, side }: { entry: Entry; side: Side }) {
  const photos = photosFor("entry", entry.id);
  const margin = photosFor("margin", entry.id);
  return (
    <li data-reveal className="relative flex gap-4 border-t border-dashed border-ink/25 py-6 sm:gap-5">
      <OrgMark mark={entry.mark} />
      <div className="min-w-0 flex-1">
        <h4 className="text-[1.05rem] leading-snug font-semibold">{entry.role}</h4>
        {(entry.org || entry.type) && (
          <p className="text-[15px]">
            {entry.org && <OrgName name={entry.org} href={entry.orgHref} />}
            {entry.org && entry.type && <Dot />}
            {entry.type && <span className="text-ink/65">{entry.type}</span>}
          </p>
        )}
        <MetaLine parts={[entry.dates, entry.location]} />
        <p className="mt-2.5 text-[15px] leading-relaxed text-ink/80">
          <Rich text={entry.summary} />
        </p>
        <Bullets items={entry.bullets} compact />
        <LogoRow logos={entry.logos} />
        <ThumbRow photos={photos} className="mt-4" />
        <LinkRow links={entry.links} size="sm" className="mt-4 gap-2" />
        <MarginPhotos photos={margin} side={side} variant="inline" />
      </div>
      <MarginPhotos photos={margin} side={side} variant="float" />
    </li>
  );
}

// Small white cards for a group of organizations. Names stand in for logos not found.
function LogoRow({ logos }: { logos?: Logo[] }) {
  if (!logos?.length) return null;
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {logos.map((logo) => {
        const image = logo.logo ? getImage(logo.logo, "logos", [3, 1]) : null;
        const body = image?.exists ? (
          <span className="relative block h-7 w-full">
            <LogoImage image={image} alt={logo.name} sizes="96px" />
          </span>
        ) : (
          <span className="text-center text-[11px] leading-tight font-semibold text-ink/75">{logo.name}</span>
        );
        const tile = "flex h-11 w-24 items-center justify-center rounded-lg bg-white px-2 ring-1 ring-ink/10";
        return (
          <li key={logo.name}>
            {isLink(logo.href) ? (
              <a href={logo.href} target="_blank" rel="noopener noreferrer" className={`${tile} transition-transform hover:-translate-y-0.5`}>
                {body}
              </a>
            ) : (
              <span className={tile}>{body}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* ---------- Small pieces ---------- */

// Only real links render; with none, the row disappears.
function LinkRow({ links, size, className }: { links?: LinkChip[]; size?: "sm"; className: string }) {
  const real = (links ?? []).filter((link) => isLink(link.href));
  if (real.length === 0) return null;
  return (
    <div className={`flex flex-wrap items-center ${className}`}>
      {real.map((link) => (
        <Chip key={link.label} size={size} {...link} />
      ))}
    </div>
  );
}

// Dates and location, separated by a dot. Missing parts are skipped.
function MetaLine({ parts }: { parts: (string | undefined)[] }) {
  const items = parts.filter((part): part is string => Boolean(part) && !isPlaceholder(part));
  if (items.length === 0) return null;
  return (
    <p className="text-sm text-ink/55">
      {items.map((item, i) => (
        <span key={item}>
          {i > 0 && <Dot />}
          {item}
        </span>
      ))}
    </p>
  );
}

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

function Bullets({ items, compact }: { items?: string[]; compact?: boolean }) {
  if (!items?.length) return null;
  return (
    <ul className={`space-y-2 text-[15px] leading-relaxed text-ink/80 ${compact ? "mt-3" : "mt-6 space-y-2.5 sm:text-base"}`}>
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
