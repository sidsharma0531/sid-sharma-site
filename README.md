# Sid Sharma, personal site

Single-page personal site. Next.js (App Router) + Tailwind CSS, fully static.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Fill in the placeholders

All copy, numbers, and links are in `lib/content.ts`. Anything written like `"[X]"` or `"[link]"`
shows up on the page as a green dashed tag. Replace it with the real value and the tag disappears.

## Add photos

Drop files into `public/photos/` with these exact names. Each placeholder box swaps to the real
photo automatically, no code changes.

| File | Where | Notes |
| --- | --- | --- |
| `photo-hero.jpg` | Hero portrait | Cropped to 4:5 |
| `rescuelog.png` | RescueLog phone frame | Full phone screenshot, top-aligned |
| `waste2taste.jpg` | Waste2Taste card | Cropped to fill |
| `still-good-cover.jpg` | Book cover | Shown at its own ratio, uncropped |
| `photo-01.jpg` to `photo-10.jpg` | "From the field" grid | Any ratio, shown uncropped |

Export photos around 2000px on the long side. Next.js resizes and compresses them on deploy.

## Deploy

Push the folder to a GitHub repo, then import it at vercel.com/new. No settings to change.

## Layout

- `app/page.tsx` puts the sections in order
- `components/` has one file per section: `Nav`, `Hero`, `Work`, `Photos` (+ `Gallery` for the lightbox), `More`, `Footer`
- `components/ui/` has the small shared pieces (photo/placeholder, buttons, section header)
- `app/globals.css` holds the three colors and the scroll fade-in
