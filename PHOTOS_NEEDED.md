# Photos needed (for the /v2 layout)

sidsharma.xyz/v2 is an experimental layout that puts photos across the whole page. It is hidden
from search engines, and the homepage at sidsharma.xyz is unchanged.

## Camera roll wall

Right under the logo wall, /v2 shows every photo in `/public/photos/wall/` as one dense grid under
a handwritten "from the camera roll". To add photos, drop the files in that folder and run
`npm run photos`. No code changes. Then commit and push.

- Photos are sorted by file name (IMG_2 before IMG_10), so rename files to reorder them.
- The section stays hidden until the folder has 8 photos.
- Laptops show the first 24 and phones the first 12, then a "See all N photos" button. With only a
  few more than that, all of them show instead.
- Tile sizes are picked for you: some photos get a 2x tile, landscape photos sometimes a wide one,
  portraits sometimes a tall one, and a few become tilted polaroids. Every row comes out full.
- Crops keep more of the top of each photo than the bottom, where faces usually are.
- Every photo opens in the lightbox. There are no captions.

## Shrink photos before committing

```bash
npm run photos
```

This resizes every photo in `/public/photos` and `/public/photos/wall` to at most 1600px wide,
saves it as WebP at quality 80, and strips its metadata, including the GPS location phones save.
A photo straight off a phone drops from several MB to about 200 KB. Each file is replaced by a
.webp with the same name (`IMG_4876.jpg` becomes `IMG_4876.webp`), so keep your originals
somewhere else. Photos already done are skipped, and iPhone `.heic` files work on a Mac. If you
forget, `npm run dev` and `npm run build` print a warning about wall photos that haven't been shrunk.

## Photo slots

Every other photo on /v2 lives in one list: `photosV2` in `data/photos-v2.ts`. Each line has a
`placement` that decides where it shows up:

| Placement | Where it shows |
| --- | --- |
| `hero` | The polaroid beside your name. Add more `hero` lines to stack up to 3; the first sits on top. |
| `entry` | Inside the entry or award named by `at`. Waste2Taste shows them as its polaroid table; everything else shows small thumbnails. |
| `margin` | Floating in the page margin beside the entry named by `at` on screens 1280px and wider, alternating left and right. On phones and smaller laptops, a small strip inside that entry. |
| `divider` | A swipeable strip of polaroids between sections. `at` is `before-recognition` (between Experience and Recognition) or `before-contact` (above the footer). |

**To move a photo**, change its `placement` (and `at` if it should sit next to something else).

**`at` ids:**
- **Entries:** `rescuelog`, `waste2taste`, `still-good`, `uh-research`, `remax`, `debate`,
  `volunteer`, `guitar`.
- **Awards:** `anthem`, `points-of-light`, `literary-titan`, `disha-usa`,
  `deca-international`, `nsda-academic-all-american`, `nyt-summer-reading`, `ap-scholar`,
  `national-recognition`.

**To add a photo**, drop the file into `/public/photos` with the file name below and run
`npm run photos`. It appears on the next build. Until its file is there, a slot is simply left
out, with no placeholder. The extension doesn't need to match: `photo-guitar-01.jpg` also finds
`photo-guitar-01.webp`.

**To remove a slot**, delete its line. A spot with no photos renders nothing.

Every photo opens in the lightbox. Margin photos are meant to stay about one per screen height on
desktop, so they never pile up.

## Slots waiting for a photo

| File (in `/public/photos`) | Placement | Where it sits | What it should show |
| --- | --- | --- | --- |
| `photo-rescuelog-01.jpg` | `margin`, `rescuelog` | Left margin beside the RescueLog card | You demoing RescueLog, or at a partner org using it |
| `photo-book-01.jpg` | `margin`, `still-good` | Right margin beside the Still Good card | You holding a copy of Still Good |
| `photo-debate-01.jpg` | `margin`, `debate` | Left margin beside Elkins Speech & Debate | Trophies, or the debate team |
| `photo-guitar-01.jpg` | `entry`, `guitar` | Thumbnail inside the Guitarist row | You performing |
| `photo-misc-01.jpg` | `divider`, `before-recognition` | Strip between Experience and Recognition | A real moment that doesn't belong to one entry, like volunteering at one of the 7 hunger-relief orgs |
| `photo-misc-02.jpg` | `divider`, `before-recognition` | Same strip | Another candid moment, like a Waste2Taste branch event |
| `photo-misc-03.jpg` | `divider`, `before-contact` | Strip above the footer | A moment from a debate tournament or DECA conference |
| `photo-misc-04.jpg` | `divider`, `before-contact` | Same strip | Any favorite real moment, like the KPRC 2 shoot or the podcast recording |

The misc suggestions are only ideas; any real photo of you works. Each one's `alt` text is generic
for now, so update it to describe the real photo.

**Size tips:**
- **Polaroids** (margin, divider, and Waste2Taste) are cropped square, so keep the subject near the
  middle.
- **Hero polaroids** are cropped 4:5. Use `focus` (like `"20% 50%"`) to choose which part stays in
  view.
- `npm run photos` takes care of file size.

## Already filled

| File | Placement | Shows |
| --- | --- | --- |
| `photo-hero.webp` | `hero` (top) | You, cropped from `photo-05` |
| `photo-07.webp` | `margin`, `waste2taste` | Pickup at Whole Foods, beside the Waste2Taste card |
| `photo-01.webp` to `photo-06.webp` | `entry`, `waste2taste` | The banana bread run, in order: Trader Joe's, ready to bake, oven, packed, delivered, Fort Bend Family Promise |
| `still-good-banana-bread.webp` | Still Good's book visual, set in `data/content.ts` | Banana bread recipe, page 10, as the "peek inside" page beside the book (on both pages) |

## If you pick v2 for the homepage

Swap the homepage to the v2 components, then delete `app/v2` and the old versions. Slots without a
file are skipped, so nothing empty can reach the main page.
