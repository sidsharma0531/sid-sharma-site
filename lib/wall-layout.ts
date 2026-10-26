// Tile sizes for the camera roll wall on /v2. Photos sit in a grid of square cells (2, 4, or 6
// columns) with `grid-auto-flow: dense`. Each band below is a run of tiles that fills whole rows
// when placed in that order, so a wall built from bands has no gaps, not even in its last row.
//
// Tiles: s = 1x1, b = 2x2, w = 2x1 (landscape photos), t = 1x2 (portrait photos), and at 6
// columns only, x = 3x2 (square or landscape photos). With just s and b, a 6-column wall only
// comes out even when the photo count divides by 3; w, t, and x make up the difference.

export type Kind = "s" | "b" | "w" | "t" | "x";
export type Columns = 2 | 4 | 6;

// Tried in this order, starting after the band used last, so the wall cycles through them.
const BANDS: Record<Columns, string[]> = {
  6: [
    "bssssssss", // big on the left, two rows
    "sswss",
    "ssssss",
    "ssssbssss", // big on the right
    "tssssssssss",
    "xssssss", // extra big on the left
    "ssssw",
    "ssbssssss", // big in the middle
    "wssss",
    "ssssstsssss",
    "sssxsss", // extra big on the right
    "ssssss",
    "tbtssss",
    "bssbss",
    "btssssss",
    "tsssstssss",
    "xbss",
    "bbtss",
    "wssw",
    "www",
    "xx",
  ],
  4: ["bssss", "sws", "ssss", "ssbss", "tssssss", "ssw", "bsts", "wss", "ssstsss", "bssbss", "ssss", "bb", "ww"],
  2: ["b", "ss", "ss", "ss", "tss", "ss", "w", "ss", "ss", "sts", "ss", "ss"],
};

const LANDSCAPE = 1.3; // width / height at or above this can take a wide tile
const PORTRAIT = 0.8; // at or below this, a tall one
const SQUARE = 0.95; // and at or above this, an extra big one (3x2 crops a square to two-thirds height)

// Photos shown before "see all": the first 12 on phones, 24 on wider screens. With fewer than
// MIN_MORE left over, a button would barely add anything, so everything shows.
export const PHONE_FIRST = 12;
export const DESKTOP_FIRST = 24;
const MIN_MORE = 4;

export type WallPlan = {
  /** Photos shown before "see all" below 640px, and at 640px and up. The photo count when all show. */
  phoneFirst: number;
  desktopFirst: number;
  /** Tile kind for each photo at 2 columns (phones), 4 (tablets), and 6 (laptops and up). */
  kinds: Record<Columns, Kind[]>;
};

/** Plans the wall from each photo's width / height. */
export function planWall(aspects: number[]): WallPlan {
  const count = aspects.length;
  const first = (limit: number) => (count - limit >= MIN_MORE ? limit : count);
  const phoneFirst = first(PHONE_FIRST);
  const desktopFirst = first(DESKTOP_FIRST);

  // The photos shown at first come out even on their own, then the rest continue the pattern.
  const plan = (cols: Columns, shown: number) => {
    const cursor = { next: 0 };
    return [...run(aspects, 0, shown, cols, cursor), ...run(aspects, shown, count, cols, cursor)];
  };

  return { phoneFirst, desktopFirst, kinds: { 2: plan(2, phoneFirst), 4: plan(4, desktopFirst), 6: plan(6, desktopFirst) } };
}

/**
 * Kinds for photos start..end. If no mix of bands comes out even (say, all square photos in a
 * count that doesn't divide), the longest run that does goes first and the rest are small tiles.
 */
function run(aspects: number[], start: number, end: number, cols: Columns, cursor: { next: number }): Kind[] {
  for (let stop = end; stop > start; stop--) {
    const kinds = fullRows(aspects, start, stop, cols, cursor);
    if (kinds) return [...kinds, ...Array<Kind>(end - stop).fill("s")];
  }
  return Array<Kind>(end - start).fill("s");
}

/** Kinds for photos start..stop that end on a full row, or null if no mix of bands can. */
function fullRows(aspects: number[], start: number, stop: number, cols: Columns, cursor: { next: number }): Kind[] | null {
  const bands = BANDS[cols];

  // even[i]: photos i..stop split into whole bands.
  const even: boolean[] = [];
  even[stop] = true;
  for (let i = stop - 1; i >= start; i--) {
    even[i] = bands.some((band) => i + band.length <= stop && even[i + band.length] && fits(band, aspects, i));
  }
  if (!even[start]) return null;

  // Walk forward, taking the next band in the cycle that keeps the rest splittable.
  const kinds: Kind[] = [];
  let next = cursor.next;
  for (let i = start; i < stop; ) {
    const n = bands
      .map((_, k) => (next + k) % bands.length)
      .find((m) => i + bands[m].length <= stop && even[i + bands[m].length] && fits(bands[m], aspects, i));
    if (n === undefined) return null; // can't happen once even[start] holds
    kinds.push(...([...bands[n]] as Kind[]));
    i += bands[n].length;
    next = n + 1;
  }
  cursor.next = next;
  return kinds;
}

/** Whether `band` can start at photo `at`, so no photo is cropped to a shape far from its own. */
function fits(band: string, aspects: number[], at: number) {
  return [...band].every((kind, i) => {
    const aspect = aspects[at + i];
    if (kind === "w") return aspect >= LANDSCAPE;
    if (kind === "t") return aspect <= PORTRAIT;
    if (kind === "x") return aspect >= SQUARE;
    return true;
  });
}
