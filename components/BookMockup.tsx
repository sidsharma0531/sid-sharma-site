import Doodle from "@/components/doodles";
import Photo from "@/components/ui/Photo";
import type { ResolvedPhoto } from "@/lib/images";

type Props = { cover: ResolvedPhoto; title: string; subtitle: string; author: string };

// A 3D book built from the flat cover: the cover turned slightly away, page edges on the right,
// a hinge shadow near the spine, and a soft shadow on the table.
export default function BookMockup({ cover, title, subtitle, author }: Props) {
  const ratio = cover.exists ? cover.width / cover.height : 2 / 3;

  return (
    <div
      className="@container relative grid aspect-square place-items-center overflow-hidden rounded-[1.5rem] bg-butter/45 md:aspect-[4/5]"
      style={{ perspective: "1600px" }}
    >
      <span aria-hidden className="absolute bottom-[14%] left-1/2 h-[6%] w-[48%] -translate-x-[44%] rounded-[50%] bg-ink/30 blur-lg" />

      <div
        className="relative h-[66%] [transform-style:preserve-3d] [transform:rotateY(-24deg)_rotateX(5deg)]"
        style={{ aspectRatio: ratio, "--t": "6.5cqw" } as React.CSSProperties}
      >
        {/* Page edges, standing out of the right side. */}
        <div
          aria-hidden
          className="absolute top-[1.2%] right-0 h-[97.6%] w-(--t) bg-[repeating-linear-gradient(90deg,#fffdf6_0_1.5px,#e8dac0_1.5px_2.5px)] shadow-[inset_0_0_8px_rgba(34,28,24,0.2)] [transform:translateX(50%)_rotateY(90deg)]"
        />

        {/* Front cover. */}
        <div className="absolute inset-0 overflow-hidden rounded-l-[2px] rounded-r-[4px] shadow-[0_30px_45px_-25px_rgba(34,28,24,0.6)] [transform:translateZ(calc(var(--t)/2))]">
          {cover.exists ? (
            <Photo photo={cover} alt={cover.alt} ratio="fill" sizes="(min-width: 768px) 260px, 55vw" />
          ) : (
            <TypeCover title={title} subtitle={subtitle} author={author} />
          )}
          <span
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,28,24,0.28)_0%,rgba(255,255,255,0.2)_2.2%,rgba(34,28,24,0.08)_4.5%,transparent_9%),linear-gradient(115deg,rgba(255,255,255,0.14),transparent_45%)]"
          />
        </div>
      </div>
    </div>
  );
}

// Stand-in cover until still-good-cover.jpg exists.
function TypeCover({ title, subtitle, author }: Omit<Props, "cover">) {
  return (
    <div className="@container absolute inset-0 flex flex-col items-center justify-between bg-leaf-deep px-[10%] py-[14%] text-center text-cream">
      <div>
        <p className="font-serif text-[17cqw] leading-none font-semibold">{title}</p>
        <p className="mt-[4cqw] font-hand text-[9cqw] leading-tight">{subtitle}</p>
      </div>
      <Doodle name="bread" className="size-[34cqw] text-ink" />
      <p className="text-[6cqw] font-medium tracking-[0.12em] uppercase">{author}</p>
    </div>
  );
}
