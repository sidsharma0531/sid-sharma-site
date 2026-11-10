import Doodle from "@/components/doodles";
import { Phone } from "@/components/PhoneMockup";
import Photo from "@/components/ui/Photo";
import PeekPage from "@/components/v3/PeekPage";
import PolaroidTable from "@/components/v3/PolaroidTable";
import type { FeaturedEntry } from "@/data/content";
import { getImage, resolvePhotos } from "@/lib/images";

// One panel shape for all three, so the cards line up: wide (4:3) above the text on phones and
// tablets, tall beside the text on wide screens, where it fills the card's height. Sizes inside are
// a percent of the panel (cqw is a percent of its width), so each picture keeps its look at every
// width. The tall layout uses the homepage's own spots for the phones and the book.
const panel =
  "@container relative aspect-[4/3] overflow-hidden rounded-[1.125rem] sm:rounded-2xl lg:aspect-auto lg:min-h-[30rem]";

// The picture in a V3 card: the homepage's pictures for each entry (the RescueLog phones, the
// Waste2Taste polaroids, the Still Good book and its inside page).
export default function CardVisual({ entry }: { entry: FeaturedEntry }) {
  const { visual } = entry;

  if (visual.kind === "phone") {
    const shots = resolvePhotos(visual.screens, { fallback: [9, 19.5] })
      .filter((screen) => screen.exists)
      .slice(0, 2);
    // In the wide panel the phones rise out of the bottom edge, so the screens show large. In the
    // tall one they stand whole as on the homepage, sized by the panel's width and centered in its
    // height, so a taller card never crops them.
    return (
      <div className={`${panel} bg-leaf/15`}>
        <span aria-hidden className="absolute -right-[4cqw] -bottom-[5cqw] opacity-25">
          <Doodle name="carrot" className="size-[30cqw] rotate-[24deg] text-ink" />
        </span>
        {shots.length === 2 ? (
          <>
            <Phone
              screen={shots[1]}
              className="absolute top-[19%] left-[50%] h-[110%] rotate-[7deg] lg:top-[49%] lg:left-[47%] lg:h-auto lg:w-[41.5%] lg:-translate-y-1/2"
            />
            <Phone
              screen={shots[0]}
              className="absolute top-[9%] left-[13%] h-[122%] -rotate-[4deg] lg:top-[49%] lg:left-[11%] lg:h-auto lg:w-[48.5%] lg:-translate-y-1/2"
            />
          </>
        ) : (
          <Phone
            screen={shots[0]}
            name={entry.org}
            className="absolute top-[9%] left-1/2 h-[122%] -translate-x-1/2 -rotate-2 lg:top-[49%] lg:h-auto lg:w-[48.5%] lg:-translate-y-1/2"
          />
        )}
      </div>
    );
  }

  if (visual.kind === "book") {
    const cover = { ...getImage(visual.cover.src, "photos", [2, 3]), alt: visual.cover.alt };
    const [preview] = resolvePhotos(visual.preview && [visual.preview], { onlyExisting: true });
    const ratio = cover.exists ? cover.width / cover.height : 2 / 3;
    // The homepage's 3D book (see BookMockup), with the inside page tucked against its right side.
    return (
      <div className={`${panel} bg-butter/45`} style={{ perspective: "1600px" }}>
        <span
          aria-hidden
          className="absolute bottom-[11%] left-[22%] h-[6%] w-[36%] rounded-[50%] bg-ink/30 blur-lg lg:top-[70%] lg:bottom-auto lg:left-[7%] lg:h-[5%] lg:w-[52%]"
        />
        {/* In the tall panel the book takes the homepage's size and spot, sized by the panel's width
            and centered a little above the middle. --t is the page block's depth, in step with the
            book's size. */}
        <div
          className="absolute top-[11%] left-[19%] h-[74%] [--t:4.4cqw] [transform-style:preserve-3d] [transform:rotateY(-24deg)_rotateX(5deg)] lg:top-[45%] lg:left-[1.8%] lg:h-auto lg:w-[63.4%] lg:-translate-y-1/2 lg:[--t:6.5cqw]"
          style={{ aspectRatio: ratio }}
        >
          {/* Page edges, standing out of the right side. */}
          <div
            aria-hidden
            className="absolute top-[1.2%] right-0 h-[97.6%] w-(--t) bg-[repeating-linear-gradient(90deg,#fffdf6_0_1.5px,#e8dac0_1.5px_2.5px)] shadow-[inset_0_0_8px_rgba(34,28,24,0.2)] [transform:translateX(50%)_rotateY(90deg)]"
          />
          {/* Front cover. */}
          <div className="absolute inset-0 overflow-hidden rounded-l-[2px] rounded-r-[4px] shadow-[0_30px_45px_-25px_rgba(34,28,24,0.6)] [transform:translateZ(calc(var(--t)/2))]">
            {cover.exists ? (
              <Photo photo={cover} alt={cover.alt} ratio="fill" sizes="(min-width: 1024px) 300px, (min-width: 640px) 200px, 130px" />
            ) : (
              <span className="absolute inset-0 grid place-items-center bg-leaf-deep p-[12%] text-center font-serif text-[5cqw] leading-none font-semibold text-cream">
                {visual.title}
              </span>
            )}
            <span
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(34,28,24,0.28)_0%,rgba(255,255,255,0.2)_2.2%,rgba(34,28,24,0.08)_4.5%,transparent_9%),linear-gradient(115deg,rgba(255,255,255,0.14),transparent_45%)]"
            />
          </div>
        </div>
        {preview && <PeekPage page={preview} />}
      </div>
    );
  }

  return (
    <div className={`${panel} gingham ring-1 ring-ink/10 ring-inset`}>
      <PolaroidTable photos={resolvePhotos(visual.photos, { fallback: [1, 1] })} />
    </div>
  );
}
