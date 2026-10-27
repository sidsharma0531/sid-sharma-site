# Sid Sharma, personal site

Single-page personal site. Next.js (App Router) + Tailwind CSS, fully static.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit content

Everything the site says lives in `data/content.ts`: copy, stats, links, awards, press, and photo
names. Components only render from it.

- `**bold**` makes text bold (use it for numbers).
- Optional fields hide themselves when left out: dates, award years, links, stats, store badges,
  and contact buttons render nothing until they have a real value. Never fill one with a guess.
- Leaving `press.items` empty hides the Press section and its nav icon.
- Each award category shows 5 awards, then a "See X more" toggle (`recognition.showFirst`).

## Add photos and logos

Drop files into `public/photos/` or `public/logos/` using the names in `data/content.ts`, then
shrink the photos:

```bash
npm run photos
```

That resizes every photo in `public/photos/` to at most 1600px wide,
saves it as WebP at quality 80, and strips its metadata, including the GPS location phones save.
A photo straight off a phone drops from several MB to about 200 KB. Each file is replaced by a
.webp with the same name, and the extension in `data/content.ts` doesn't need to change:
`photo-01.jpg` finds `photo-01.webp`. Photos already done are skipped; iPhone `.heic` works on a Mac.

The site picks files up on the next build, with their real sizes. Nothing ever renders as an empty
slot: a missing logo shows as a wordmark or initials, a missing app screenshot shows a name screen,
and thumbnails only appear for files that exist.

## Deploy

Pushing `main` to GitHub deploys sidsharma.xyz on Vercel. `main` is the only branch. `*.vercel.app`
addresses redirect to www.sidsharma.xyz, and old `/v2` links to `/casestudyversion` (`next.config.ts`).

## Layout

- `app/page.tsx` puts the sections in order; `app/opengraph-image.tsx` draws the link-preview card
- `components/` has one file per section: `Nav`, `Hero`, `LogoWall`, `Experience`, `Recognition`,
  `Press`, `Footer`, plus `PhoneMockup`, `Polaroids`, `BookMockup`, `Lightbox`, and `doodles`
- `components/ui/` has the small shared pieces (photo, chips, badges, stats, headings)
- `app/globals.css` holds the color and font tokens
- `app/casestudyversion/` is a second, case-study version of the site (not in search results); its
  content is in `data/v2.ts` and its sections in `components/v2/`
- `scripts/photos.mjs` is `npm run photos`
