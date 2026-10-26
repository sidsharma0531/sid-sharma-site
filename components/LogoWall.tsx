import LogoImage from "@/components/ui/LogoImage";
import { logoWall, type Logo } from "@/data/content";
import { getImage, type ImageInfo } from "@/lib/images";
import { isLink } from "@/lib/text";

type Item = Logo & { image: ImageInfo | null };

// Infinite logo row. Two copies slide left by half their width, so the loop has no seam.
// Hover or keyboard focus pauses it; reduced-motion users get a still row they can scroll.
// Every logo sits on the same white card at the same height, in full color.
export default function LogoWall() {
  const items: Item[] = logoWall.logos.map((logo) => {
    const image = logo.logo ? getImage(logo.logo, "logos", [3, 1]) : null;
    return { ...logo, image: image?.exists ? image : null };
  });

  const row = (copy: 0 | 1) => (
    <ul aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center gap-5 py-3 pr-5 sm:gap-6 sm:pr-6">
      {items.map((item, i) => (
        <li key={i} className="shrink-0">
          <LogoCard item={item} focusable={copy === 0} />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label={logoWall.label} className="border-y border-dashed border-ink/20 bg-paper py-7 sm:py-9">
      <p className="container-page text-center font-hand text-[1.6rem] leading-none text-tomato-deep">{logoWall.label}</p>
      <div className="marquee mt-3 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
        <div className="marquee-track flex w-max">
          {row(0)}
          {row(1)}
        </div>
      </div>
    </section>
  );
}

const card =
  "flex h-16 w-40 items-center justify-center rounded-2xl bg-white px-4 shadow-[0_8px_20px_-12px_rgba(34,28,24,0.45)] ring-1 ring-ink/10 sm:h-[4.5rem] sm:w-44";

function LogoCard({ item, focusable }: { item: Item; focusable: boolean }) {
  const content = item.image ? (
    <span className="relative block h-10 w-full sm:h-12">
      <LogoImage image={item.image} alt={item.name} sizes="176px" />
    </span>
  ) : (
    <span className="text-center font-serif text-[15px] leading-tight font-semibold">{item.name}</span>
  );

  if (!isLink(item.href)) return <span className={card}>{content}</span>;

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={focusable ? undefined : -1}
      className={`${card} transition-transform duration-200 hover:-translate-y-0.5`}
    >
      {content}
    </a>
  );
}
