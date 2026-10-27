// Photo placements for the experimental layout at /v2. The live homepage doesn't use this file.
// Copy, stats, and links still come from data/content.ts.
//
// Every photo on /v2 lives in this one list. Change `placement` to move a photo:
//   "hero"     the stack of polaroids beside your name. The first one sits on top; 3 at most.
//   "entry"    inside the entry or award named by `at`. Waste2Taste shows its photos as the
//              polaroid table; everything else shows small thumbnails.
//   "margin"   floating in the page margin beside the entry named by `at` on wide screens, and
//              a small strip inside that entry on phones. Keep these about a screen apart.
//   "divider"  a swipeable strip between sections. `at` is "before-recognition" or "before-contact".
//
// Entry ids for `at`: rescuelog, waste2taste, still-good, uh-research, remax, debate, volunteer,
// guitar. Award ids are on each award in data/content.ts.
//
// A photo whose file isn't in /public/photos yet is skipped, and it appears on its own once the
// file is there. The extension can differ: photo-guitar-01.jpg also finds photo-guitar-01.webp from
// `npm run photos`. Delete a line to drop that slot; a spot with no photos renders nothing.
// See PHOTOS_NEEDED.md.

import type { Photo } from "@/data/content";

export type Placement = "hero" | "entry" | "margin" | "divider";

export type SitePhoto = Photo & {
  placement: Placement;
  /** Entry or award id for "entry" and "margin"; divider id for "divider". Not needed for "hero". */
  at?: string;
};

export const photosV2: SitePhoto[] = [
  // Hero
  { src: "photo-hero.jpg", alt: "Sid Sharma", focus: "50% 30%", placement: "hero" },

  // Beside Waste2Taste. Cropped square, so focus keeps you and the bag in view.
  {
    src: "photo-07.jpg",
    alt: "Sid Sharma and a volunteer taking a Whole Foods bag from a Whole Foods team member in the store",
    caption: "pickup at Whole Foods",
    wide: true,
    focus: "8% 50%",
    placement: "margin",
    at: "waste2taste",
  },

  // Waste2Taste, in order: one banana bread run, from the grocer to the pantry.
  {
    src: "photo-01.jpg",
    alt: "Sid Sharma and a Trader Joe's crew member holding two bags tagged as Waste2Taste donations",
    caption: "at Trader Joe's",
    placement: "entry",
    at: "waste2taste",
  },
  {
    src: "photo-02.jpg",
    alt: "Twelve loaf pans of banana bread batter lined up on a kitchen counter",
    caption: "ready to bake",
    placement: "entry",
    at: "waste2taste",
  },
  {
    src: "photo-03.jpg",
    alt: "Loaf pans of banana bread baking in an oven",
    caption: "into the oven",
    placement: "entry",
    at: "waste2taste",
  },
  {
    src: "photo-04.jpg",
    alt: "Four foil pans of Waste2Taste banana bread with ingredient labels packed in a car trunk",
    caption: "packed to donate",
    placement: "entry",
    at: "waste2taste",
  },
  {
    src: "photo-05.jpg",
    alt: "Sid Sharma and two volunteers holding labeled Waste2Taste banana bread loaves in a community center lobby",
    caption: "banana bread, delivered",
    placement: "entry",
    at: "waste2taste",
  },
  {
    src: "photo-06.jpg",
    alt: "Sid Sharma and a volunteer holding Whole Foods bags of rescued groceries in the Fort Bend Family Promise pantry",
    caption: "at Fort Bend Family Promise",
    placement: "entry",
    at: "waste2taste",
  },

  // Still Good's page 10 is the preview page in its book visual, set in data/content.ts.

  // Waiting for a photo. Each appears once its file is in /public/photos; until then it's skipped.
  { src: "photo-rescuelog-01.jpg", alt: "Sid demoing RescueLog", placement: "margin", at: "rescuelog" },
  { src: "photo-book-01.jpg", alt: "Sid holding a copy of Still Good", placement: "margin", at: "still-good" },
  { src: "photo-debate-01.jpg", alt: "Elkins Speech & Debate trophies and team", placement: "margin", at: "debate" },
  { src: "photo-guitar-01.jpg", alt: "Sid performing on guitar", placement: "entry", at: "guitar" },
  { src: "photo-misc-01.jpg", alt: "Photo 1 of the first photo strip", placement: "divider", at: "before-recognition" },
  { src: "photo-misc-02.jpg", alt: "Photo 2 of the first photo strip", placement: "divider", at: "before-recognition" },
  { src: "photo-misc-03.jpg", alt: "Photo 1 of the second photo strip", placement: "divider", at: "before-contact" },
  { src: "photo-misc-04.jpg", alt: "Photo 2 of the second photo strip", placement: "divider", at: "before-contact" },
];
