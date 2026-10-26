import Image from "next/image";
import Rich from "@/components/ui/Rich";
import { logoWall, type Logo } from "@/data/content";
import { getImage, type ImageInfo } from "@/lib/images";
import { isLink } from "@/lib/text";

type Item = Logo & { image: ImageInfo | null };

// Infinite logo row. Two copies slide left by half their width, so the loop has no seam.
// Hover or keyboard focus pauses it; reduced-motion users get a still row they can scroll.
export default function LogoWall() {
  const items: Item[] = logoWall.logos.map((logo) => ({
    ...logo,
    image: logo.logo ? getImage(logo.logo, "logos", [3, 1]) : null,
  }));

  const row = (copy: 0 | 1) => (
    <ul aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16">
      {items.map((item, i) => (
        <li key={i} className="shrink-0">
          <LogoItem item={item} focusable={copy === 0} />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label={logoWall.label} className="border-y border-dashed border-ink/20 bg-paper py-8 sm:py-10">
      <p className="container-page text-center font-hand text-[1.6rem] leading-none text-tomato-deep">{logoWall.label}</p>
      <div className="marquee mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
        {/* The track's own paper background lets white logo backgrounds multiply away. */}
        <div className="marquee-track flex w-max bg-paper">
          {row(0)}
          {row(1)}
        </div>
      </div>
    </section>
  );
}

function LogoItem({ item, focusable }: { item: Item; focusable: boolean }) {
  const mark = item.image?.exists ? (
    <span className="relative block h-12 w-32 sm:h-14 sm:w-36">
      <Image
        src={item.image.src}
        alt={item.name}
        fill
        sizes="144px"
        className="object-contain opacity-60 mix-blend-multiply grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
      />
    </span>
  ) : (
    <span className="block font-serif text-xl font-semibold tracking-[-0.01em] whitespace-nowrap text-ink/45 transition-colors duration-300 group-hover:text-ink sm:text-2xl">
      <Rich text={item.name} />
    </span>
  );

  if (!isLink(item.href)) return <span className="group block">{mark}</span>;

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={focusable ? undefined : -1}
      className="group block rounded-lg"
    >
      {mark}
    </a>
  );
}
