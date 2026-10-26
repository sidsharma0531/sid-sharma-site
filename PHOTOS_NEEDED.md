# Photos needed (for the /v2 layout)

sidsharma.xyz/v2 is an experimental layout that puts photos across the whole page. It is hidden
from search engines, and the homepage at sidsharma.xyz is unchanged.

Every photo on /v2 lives in one list: `photosV2` in `data/photos-v2.ts`. Each line has a
`placement` that decides where it shows up:

| Placement | Where it shows |
| --- | --- |
| `hero` | The polaroid beside your name. Add more `hero` lines to stack up to 3; the first sits on top. |
| `entry` | Inside the entry or award named by `at`. Waste2Taste shows them as its polaroid table; everything else shows small thumbnails. |
| `margin` | Floating in the page margin beside the entry named by `at` on screens 1280px and wider, alternating left and right. On phones and smaller laptops, a small strip inside that entry. |
| `divider` | A swipeable strip of polaroids between sections. `at` is `before-recognition` (between Experience and Recognition) or `before-contact` (above the footer). |

**To move a photo**, change its `placement` (and `at` if it should sit next to something else).

**`at` ids:**
- **Entries:** `rescuelog`, `waste2taste`, `still-good`, `uh-research`, `remax`, `debate`, `deca`,
  `research-club`, `volunteer`, `guitar`.
- **Awards:** `anthem`, `points-of-light`, `literary-titan`, `disha-usa`,
  `nsda-academic-all-american`, `ap-scholar`, `national-recognition`, `nyt-summer-reading`.

**To add a photo**, drop the file into `/public/photos` with the file name below. Its labeled
placeholder turns into the real photo on the next build.

**To remove a slot**, delete its line. A spot with no photos renders nothing.

Every photo opens in the lightbox. Margin photos are meant to stay about one per screen height on
desktop, so they never pile up.

## Slots waiting for a photo

| File (in `/public/photos`) | Placement | Where it sits | What it should show |
| --- | --- | --- | --- |
| `photo-rescuelog-01.jpg` | `margin`, `rescuelog` | Left margin beside the RescueLog card | You demoing RescueLog, or at a partner org using it |
| `photo-book-01.jpg` | `margin`, `still-good` | Right margin beside the Still Good card | You holding a copy of Still Good |
| `photo-debate-01.jpg` | `margin`, `debate` | Left margin beside Elkins Speech & Debate | Trophies, or the debate team |
| `photo-deca-01.jpg` | `entry`, `deca` | Thumbnail inside the DECA row | The slushy machine |
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
- Around 1200px on the long side is plenty.

## Already filled

| File | Placement | Shows |
| --- | --- | --- |
| `photo-hero.jpg` | `hero` (top) | You, cropped from `photo-05.jpg` |
| `photo-07.jpg` | `margin`, `waste2taste` | Pickup at Whole Foods, beside the Waste2Taste card |
| `photo-01.jpg` to `photo-06.jpg` | `entry`, `waste2taste` | The banana bread run, in order: grocer, 12 pans, oven, packed, delivered, Fort Bend Family Promise |
| `still-good-banana-bread.jpg` | `entry`, `still-good` | Banana bread recipe, page 10 |

## If you pick v2 for the homepage

Swap the homepage to the v2 components, then delete `app/v2` and the old versions. Before that,
add the real files or delete the placeholder lines, so no placeholder reaches the main page.
