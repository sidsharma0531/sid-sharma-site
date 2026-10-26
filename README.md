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

Drop files into `public/photos/` or `public/logos/` using the names in `data/content.ts`. The site
picks them up on the next build, with their real sizes. Nothing ever renders as an empty slot: a
missing logo shows as a wordmark or initials, a missing app screenshot shows a name screen, and
thumbnails only appear for files that exist.

## Deploy

Pushing to GitHub deploys on Vercel. Pushes to `main` go to production; other branches get a
preview URL.

## Layout

- `app/page.tsx` puts the sections in order; `app/opengraph-image.tsx` draws the link-preview card
- `components/` has one file per section: `Nav`, `Hero`, `LogoWall`, `Experience`, `Recognition`,
  `Press`, `Footer`, plus `PhoneMockup`, `Polaroids`, `BookMockup`, `Lightbox`, and `doodles`
- `components/ui/` has the small shared pieces (photo, chips, badges, stats, headings)
- `app/globals.css` holds the color and font tokens
