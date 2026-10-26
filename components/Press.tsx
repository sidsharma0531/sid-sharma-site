import LogoImage from "@/components/ui/LogoImage";
import Photo from "@/components/ui/Photo";
import SectionHeading from "@/components/ui/SectionHeading";
import { press, type PressItem } from "@/data/content";
import { getImage } from "@/lib/images";
import { isLink, isPlaceholder } from "@/lib/text";

const action: Record<string, string> = { TV: "Watch the story", Podcast: "Listen" };

// Hidden entirely, nav icon included, while the press list is empty.
export default function Press() {
  if (press.items.length === 0) return null;

  return (
    <section id="press" className="container-page py-20 sm:py-28">
      <SectionHeading kicker={press.kicker} title={press.title} />
      <ul className={`grid gap-5 ${press.items.length > 1 ? "md:grid-cols-2" : "max-w-2xl"}`}>
        {press.items.map((item) => (
          <li key={item.headline + item.outlet} data-reveal>
            <PressCard item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function PressCard({ item }: { item: PressItem }) {
  const thumb = item.thumbnail ? { ...getImage(item.thumbnail.src, "photos", [4, 3]), alt: item.thumbnail.alt } : null;
  const logo = item.logo ? getImage(item.logo, "logos", [5, 4]) : null;
  const cover = item.logoFit === "cover";
  const linked = isLink(item.href);

  const body = (
    <>
      {logo?.exists && (
        <span aria-hidden className="relative block h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-ink/10">
          <span className={`absolute ${cover ? "inset-0" : "inset-[10%]"}`}>
            <LogoImage image={logo} alt="" sizes="80px" fit={cover ? "cover" : "contain"} />
          </span>
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-[0.14em] text-tomato-deep uppercase">
          <span>{item.outlet}</span>
          <span className="rounded-full bg-butter/60 px-2 py-0.5 tracking-[0.1em] text-ink">{item.kind}</span>
          {item.date && !isPlaceholder(item.date) && (
            <span className="font-medium tracking-normal text-ink/55 normal-case">{item.date}</span>
          )}
        </p>
        <p className="mt-3 font-serif text-xl leading-snug font-semibold tracking-[-0.01em] text-balance">{item.headline}</p>
        {linked && (
          <p className="mt-4 text-sm font-semibold text-ink/80">
            {action[item.kind] ?? "Read the story"} <span aria-hidden>↗</span>
          </p>
        )}
      </div>
      {thumb?.exists && (
        <Photo
          photo={thumb}
          alt={thumb.alt}
          ratio={4 / 3}
          sizes="128px"
          className="w-24 shrink-0 rotate-2 rounded-lg ring-1 ring-ink/10 sm:w-32"
        />
      )}
    </>
  );

  // Logo above the text on phones, beside it on wider screens.
  const card = "flex h-full flex-col gap-4 rounded-[1.5rem] border border-ink/10 bg-paper p-6 sm:flex-row sm:gap-5";

  if (!linked) return <div className={card}>{body}</div>;

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${card} shadow-[0_20px_40px_-34px_rgba(34,28,24,0.6)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_26px_44px_-30px_rgba(34,28,24,0.6)]`}
    >
      {body}
    </a>
  );
}
