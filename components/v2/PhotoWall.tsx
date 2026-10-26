import Kicker from "@/components/ui/Kicker";
import PhotoWallGrid, { type WallTile } from "@/components/v2/PhotoWallGrid";
import { wallPhotos } from "@/lib/images";
import { planWall, type Columns, type Kind } from "@/lib/wall-layout";

// Below this many photos the wall would look thin, so the section stays hidden.
const MIN_PHOTOS = 8;

// Grid spans for each tile kind. Every breakpoint sets both spans, so a smaller one can't leak
// through. The 3x2 tile only exists at 6 columns.
const SPANS: Record<Columns, Partial<Record<Kind, string>>> = {
  2: { s: "", b: "col-span-2 row-span-2", w: "col-span-2", t: "row-span-2" },
  4: {
    s: "sm:col-span-1 sm:row-span-1",
    b: "sm:col-span-2 sm:row-span-2",
    w: "sm:col-span-2 sm:row-span-1",
    t: "sm:col-span-1 sm:row-span-2",
  },
  6: {
    s: "lg:col-span-1 lg:row-span-1",
    b: "lg:col-span-2 lg:row-span-2",
    w: "lg:col-span-2 lg:row-span-1",
    t: "lg:col-span-1 lg:row-span-2",
    x: "lg:col-span-3 lg:row-span-2",
  },
};

// Columns and rows each kind covers.
const CELLS: Record<Kind, [number, number]> = { s: [1, 1], b: [2, 2], w: [2, 1], t: [1, 2], x: [3, 2] };

// A few tiles are framed as tilted polaroids: about one in seven, starting with the fourth. Only
// tiles that are square at every width qualify, so when one isn't, the next square one is used.
const TILTS = ["-rotate-2", "rotate-[1.5deg]", "rotate-2", "-rotate-[1.5deg]"];

// How wide a photo renders, for next/image to pick a file: about 50vw a column on phones, 25vw on
// tablets, and 156px inside the 64rem page. object-cover scales a photo that's wider than its
// tile to the tile's height, so it renders wider than the tile.
function sizes(aspect: number, kinds: Record<Columns, Kind>) {
  const width = (kind: Kind, column: number) => {
    const [cols, rows] = CELLS[kind];
    return Math.ceil(column * cols * Math.max(1, aspect / (cols / rows)));
  };
  return `(min-width: 1024px) ${width(kinds[6], 156)}px, (min-width: 640px) ${width(kinds[4], 25)}vw, ${width(kinds[2], 50)}vw`;
}

// The camera roll: every photo in /public/photos/wall, read at build time and sorted by file
// name, so adding photos means dropping files in that folder. No captions; tiles open the lightbox.
export default function PhotoWall() {
  const photos = wallPhotos();

  // Straight off a phone, a photo is about 4000px wide and carries its GPS location. Shown in the
  // terminal during `npm run dev` and `npm run build`.
  const unshrunk = photos.filter((photo) => photo.width > 1600);
  if (unshrunk.length > 0) {
    console.warn(
      `Photo wall: ${unshrunk.length} photo(s) in public/photos/wall haven't been shrunk, like ${unshrunk[0].file}. ` +
        "Run `npm run photos` before committing, to shrink them and remove their GPS location.",
    );
  }

  if (photos.length < MIN_PHOTOS) return null;

  const { kinds, phoneFirst, desktopFirst } = planWall(photos.map((photo) => photo.width / photo.height));
  let polaroids = 0;
  let nextPolaroid = 3;
  const tiles: WallTile[] = photos.map((photo, i) => {
    const at: Record<Columns, Kind> = { 2: kinds[2][i], 4: kinds[4][i], 6: kinds[6][i] };
    const square = Object.values(at).every((kind) => kind === "s" || kind === "b");
    const polaroid = i >= nextPolaroid && square;
    if (polaroid) nextPolaroid = i + 7;
    return {
      photo,
      span: [SPANS[2][at[2]], SPANS[4][at[4]], SPANS[6][at[6]]].filter(Boolean).join(" "),
      sizes: sizes(photo.width / photo.height, at),
      tilt: polaroid ? TILTS[polaroids++ % TILTS.length] : undefined,
    };
  });

  return (
    <section aria-labelledby="camera-roll" className="container-page pt-16 sm:pt-20">
      <div data-reveal>
        <Kicker id="camera-roll">from the camera roll</Kicker>
      </div>
      <div data-reveal className="@container mt-6 sm:mt-8">
        <PhotoWallGrid tiles={tiles} phoneFirst={phoneFirst} desktopFirst={desktopFirst} />
      </div>
    </section>
  );
}
