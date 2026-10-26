# Redesign report

Branch: `redesign`. Nothing was committed to `main`, and no Vercel settings, DNS, or environment
variables were touched.

## What changed

**Identity.** Warm cream background with tomato, butter, and leaf accents and near-black text, all
set as design tokens in `app/globals.css`. Fraunces (soft, rounded setting) for headings, Inter for
body, Caveat for handwritten kickers, notes, and captions. Hand-drawn style doodles (carrot, tomato,
bread, whisk) are used as nav icons and a few margin decorations.

**Sections, top to bottom:**

1. **Nav.** Sticky and minimal. Doodle icons per section, with labels on desktop and tooltips on
   phones. The icon for the section on screen gets a butter highlight.
2. **Hero.** "Sid Sharma." in large Fraunces, the one-liner, a taped photo frame, and a handwritten
   "say hi!" arrow pointing at the email, LinkedIn, and Instagram buttons. Below that, three big
   stats: **5,100+ lbs** rescued, **3 cities**, and **#1 new release**.
3. **Logo wall.** Nine real organizations, scrolling forever. Logos are grayscale and turn to color
   on hover, and each one links to proof. The row pauses on hover or keyboard focus, and becomes a
   still, scrollable row for anyone who has reduced motion turned on.
4. **Experience.** Three large featured entries, then five compact LinkedIn-style rows.
   - **RescueLog:** a clean phone frame, with the official App Store and Google Play badges.
   - **Waste2Taste:** the one big photo moment, six polaroids on a picnic tablecloth with
     handwritten captions. Clicking one opens the lightbox (arrows, swipe, Escape).
   - **Still Good:** a 3D book built from the real flat cover, plus a thumbnail of the banana
     bread recipe page.
   - Every entry has link chips, so each claim points somewhere checkable.
5. **Recognition.** "Entrepreneurship & Impact", "Debate & Academics", and "Just for Fun", with the
   first 5 awards in each and then "See X more ▾".
6. **Press.** The KPRC 2 Houston (NBC) story and the Simple Acts, Big Impact podcast. The section
   and its nav icon hide themselves if the list is empty.
7. **Footer.** A friendly line, the email (written so bots can't scrape it, copied on click),
   LinkedIn and Instagram, and © 2026 Sid Sharma.

**Content.** Everything lives in `data/content.ts` with TypeScript types. Components only render
from it.

**Metadata.** Title, description, Open Graph, and Twitter card tags, plus a generated share image
(name, one line, the real stats, and the hero photo).

## What I kept

See `REDESIGN_NOTES.md`, written before any changes. In short:
- the stack and static build
- the one-content-file approach, and bracketed placeholders that highlight themselves
- drop-in photos, which read their real size at build time
- the lightbox and the phone frame
- Fraunces + Inter, and the subtle fade-in on scroll
- the accessibility basics, the existing copy, and the 375px discipline

## Decisions I made

1. **I followed your final brief.** The takeout-box intro from the earlier brief was dropped, since
   the final brief doesn't include it.
2. **Facts and photos come from waste-2-taste.org (your site), plus your messages.** I used:
   - **Photos:** the six process photos, the cover, and the recipe page.
   - **Partners:** the six partner logos.
   - **Numbers:** 5,100+ lbs, 30+ partners, 79 pages, #1 New Release in Indian Cooking, and #3
     Bestseller in Indian Cookbooks.
   - **Other facts:** net proceeds fund Waste2Taste, and its membership in the National Food
     Recovery Association.
   - **Links:** Waste2Taste website, Instagram, Partners page, and Cookbook page; Amazon for
     the book; KPRC 2 for the story.
   
   Nothing else was invented.
3. **"3 cities" vs "12 branches". Please check this one.** Your brief says chapters in Houston,
   Baltimore, and the SF Bay Area, so the site says 3. waste-2-taste.org lists 12 branches. A
   reader who clicks through will see both numbers, so make them match before applications go out.
   It's `hero.stats` and the Waste2Taste `summary` in `data/content.ts`.
4. **The logo wall is "worked with & featured by".**
   - Partners link to the Waste2Taste partners page as proof.
   - KPRC 2 links to the article, and UH links to uh.edu.
   - DECA is left off, since it's a competition and not a partner.
   - UH, KPRC 2, and RE/MAX show as text wordmarks until logo files are added.
5. **Store badges are Apple's and Google's official artwork, loaded from their servers.** They're
   not redrawn, per both companies' rules.
6. **Award categories are my call.** Literary Titan is under Impact, since the book is part of the
   food-rescue work. NYT Summer Reading is under Debate & Academics. "Just for Fun" has two
   placeholder slots. No category has more than 5 awards yet, so the "See X more" toggle isn't
   visible. I tested it by temporarily lowering the limit.
7. **The Anthem Award year is 2026.** I worked that out from "results 11/5". After Nov 5, change it
   to the result.
8. **The hero photo is `IMG_4876`**, cropped from `photo-05.jpg`. Both are used for now, as you
   said. Your raw `photos/` folder is git-ignored; the site uses copies in `public/photos/`.
9. **Searches came up empty** for the RescueLog store pages, the podcast episode, and the award
   pages. They're probably too new to be indexed, so those links stay as `[link]` rather than guesses.
10. **The reference site wouldn't load** in the browser tool (it failed three times), so the
    structure follows your written brief.

## What I verified

- Production build passes and the whole site is static.
- No em dashes and none of the banned words anywhere in the code or copy.
- No horizontal scroll at 375px. Every section was checked at 375px and 1280px.
- **Lightbox:** opens on the right photo with its caption, and arrow keys, swipe, and Escape all
  work. Page scroll unlocks on close.
- **Toggle:** "See X more" expands and collapses.
- **Press:** hides itself and its nav icon when the list is empty.
- **Email:** the full address never appears in the page source.
- **Share image:** checked visually.

Not verified: real Safari, a real iPhone, and click-to-copy in a real browser. Automated browsers
block the clipboard; if copying fails, the button opens the mail app instead.

## Checklist: placeholders to fill (all in `data/content.ts`)

**Contact**
- [ ] `contact.email`, `contact.linkedin`, `contact.instagram` (your personal ones; I didn't use the
      Waste2Taste email)

**RescueLog**
- [ ] Dates and website link
- [ ] Stats: [X] orgs and [X] lbs logged
- [ ] "Used by [partner orgs]"
- [ ] App Store link and Google Play link

**Waste2Taste**
- [ ] Dates
- [ ] [X] volunteers
- [ ] Decide 3 cities vs 12 branches (decision 3 above)

**Still Good**
- [ ] Publication date

**University of Houston**
- [ ] Dates
- [ ] Professor's name
- [ ] Project link

**RE/MAX Commercial Real Estate**
- [ ] Dates
- [ ] What you did
- [ ] Website link (also used in the logo wall)

**Lincoln-Douglas Debate**
- [ ] Dates
- [ ] Record
- [ ] Results link

**DECA**
- [ ] Dates
- [ ] Results
- [ ] Results link

**Research Club**
- [ ] Dates
- [ ] What you did
- [ ] Club page link

**Awards**
- [ ] Years for every award except Anthem
- [ ] Proof links for Anthem, Daily Point of Light, Literary Titan, Disha USA, NSDA, and NYT
- [ ] Which College Board National Recognition Program award it is (optional detail)
- [ ] Fill or delete the two "Just for Fun" slots
- [ ] Update Anthem after Nov 5

**Press**
- [ ] Simple Acts, Big Impact episode title, link, and date

**Site**
- [ ] `site.url` once the domain is live (fixes share-image links on the custom domain)

## Checklist: photos and logos to add

| File | Shows | Notes |
| --- | --- | --- |
| `public/photos/rescuelog.png` | RescueLog's main screen | Full phone screenshot, portrait. Replaces the name screen in the phone frame. **Highest priority.** |
| `public/photos/rescuelog-2.png` | A second RescueLog screen, like logging a rescue | With two screenshots, two phones overlap |
| `public/logos/rescuelog.png` | RescueLog app icon | Square. Replaces the carrot tile |
| `public/photos/photo-hero.jpg` | A portrait of you on its own | Optional upgrade. The current one is a 729px crop; 1000px+ wide looks sharper |
| `public/logos/uh.png`, `deca.png`, `remax-commercial.png` | Organization logos | Square. Replaces the initials tiles. To show them in the logo wall, add `logo:` to those entries |
| Any `photos: []` list in `content.ts` | Debate, DECA, research, or award photos | Optional. Thumbnails appear only once the files exist |

Already in place, from waste-2-taste.org and your folder: `photo-hero.jpg`, `photo-01.jpg` to
`photo-06.jpg` (grocer pickup, 12 pans, oven, packed, delivered, Fort Bend Family Promise),
`still-good-cover.jpg`, `still-good-banana-bread.jpg`, and logos for Waste2Taste, Trader Joe's,
H-E-B, Whole Foods, Keemat Grocers, Fort Bend Family Promise, and NFRA.
