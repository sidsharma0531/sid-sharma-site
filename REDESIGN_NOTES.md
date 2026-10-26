# Redesign notes

Written before any redesign changes, on the `redesign` branch. This lists what from the current
site is staying, and why.

## Keeping

**Stack and hosting setup.** Next.js 16 (App Router) + Tailwind 4, prerendered as one static page.
It already builds cleanly and deploys on Vercel, so there is no reason to touch it.

**One content file.** All copy and links already live in one file (`lib/content.ts`). The brief asks
for the same idea, so it moves to `/data/content.ts` and gets full TypeScript types.

**Bracketed placeholders that highlight themselves.** Any value written like `[X]` or `[link]` shows
as a dashed tag on the page and disappears once a real value is typed in. That makes unfinished
spots impossible to miss before the site goes into an application.

**Drop-in photos.** `lib/photos.ts` checks `/public/photos` at build time, reads each photo's real
size (and fixes sideways phone photos), and swaps the placeholder for the photo automatically. No
code changes needed to add a photo. Keeping this and extending it to `/public/logos`.

**Existing photo file names.** `photo-hero.jpg`, `rescuelog.png`, `still-good-cover.jpg`, and
`photo-01.jpg` onward keep their names and meaning, so any photos already prepared still land in the
right place.

**The lightbox.** Arrow keys and buttons, swipe on phones, Escape to close, wraps from last to first,
locks page scroll, traps and returns keyboard focus, preloads the next photo. It works and was tested,
so it is reused for the polaroids and any thumbnails (adding optional captions).

**The phone frame.** The CSS phone frame for RescueLog already sizes correctly at every width (the
bezel bug was fixed). It becomes the home for the app screenshots.

**Fraunces + Inter.** Same pairing the brief asks for. Caveat gets added for handwritten notes.

**Subtle fade-in on scroll.** Small, respects reduced-motion settings, and content stays visible if
JavaScript fails. Keeping it.

**Accessibility basics.** Skip-to-content link, visible keyboard focus, alt text, 44px tap targets,
and anchor links that land below the sticky nav instead of under it.

**Copy that already works.** The RescueLog, Waste2Taste, and Still Good descriptions, the experience
list items, and the footer's email and LinkedIn structure. Short, specific, no adjectives.

**Mobile discipline.** No horizontal scroll at 375px. Same bar for the new design.

## Changing (short version, full detail in REDESIGN_REPORT.md)

- Palette: deep green on off-white becomes cream with tomato, butter, and leaf accents.
- Section labels: small uppercase kickers become handwritten (Caveat) notes.
- Work: three equal cards become three large featured entries plus compact LinkedIn-style rows.
- Photos: the 10-photo masonry grid becomes one polaroid cluster inside Waste2Taste.
- New: hero stats, logo wall, recognition with "See more", press (hides when empty), food doodles,
  3D book, store badges, Open Graph image.
- Nav: text links and the mobile menu become doodle icons, which fit at 375px without a menu.

## Process notes

- The reference site (itsvivianliu.com) would not load in the browser tool (policy check failed
  three times), so the structure follows the written brief.
- An earlier brief asked for a takeout-box intro screen. The final brief does not include it, so it
  is not being built.
