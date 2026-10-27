# Content fix report

Branch: `content-fix`. Layout and style were kept. Only content, logos, and empty-field behavior
changed, plus the logo-wall card style you asked for.

## What changed

**Content (from your Common App).** Every entry was rewritten to match it:
- **RescueLog:** Founder & Developer. 2M lbs/yr tracked, about 1.7M meals, 3 states.
- **Waste2Taste:** Founder & President. 5,100+ lbs, 12 branches across 7 states and the UAE, 30+
  partners, NFRA membership. Every "3 cities" and "Houston, Baltimore, and the SF Bay Area"
  mention is gone.
- **Still Good:** #1 New Release and #3 Best Seller in Indian Cookbooks on Amazon. Literary Titan
  Silver Book Award, 79 pages, and proceeds fund food rescue.
- **University of Houston:** under Professor Vollrath.
- **RE/MAX:** Summer Intern.
- **Elkins Speech & Debate:** LD Captain and Policy Team Manager.
- **Elkins DECA**, and the **Elkins Research & Meta-Analysis Club**.
- **New entries:** Volunteer (7 Houston hunger-relief orgs, 4 years) and Guitarist (last).

**Hero stats:** 2M lbs/yr tracked through RescueLog, 12 Waste2Taste branches across 7 states + UAE,
and 30+ partners. "#1 New Release" now appears only in the Still Good section.

**Contact:** your email (still spelled out so bots can't scrape it, and copied on click) and your
LinkedIn. The personal Instagram button is gone; Waste2Taste's Instagram (@waste2taste.usa) stays
linked in its section.

**Placeholders:** none are left. Optional fields now render nothing when empty: dates, years,
link chips, stats, store badges, and contact buttons. Removed entirely:
- the "Just for Fun" award category
- the podcast press item
- every stat without a real number

**RescueLog from the store listings:**
- **App Store:** https://apps.apple.com/us/app/rescuelog/id6770613024
- **Google Play:** https://play.google.com/store/apps/details?id=com.rescuelog.app (developer: Sid
  Sharma)
- **Icon:** the app icon is now the entry logo.
- **Screens:** two of the three listing screenshots (the photo-capture and home screens) sit in
  the phone frame. They're cropped to just the app screen, since the listing images are marketing
  frames with their own drawn phone.

**Logos:**
- **Logo wall:** KPRC 2, University of Houston, and RE/MAX Commercial now use real logos instead of
  text. RE/MAX links to remaxcommercial.com. No volunteer orgs were added to the wall.
- **Logo wall style:** every logo is full color on its own white rounded card with a soft shadow.
  All cards are the same size and the logos the same height. Scrolling, links, and pause on hover
  still work.
- **Entry logos:** University of Houston, RE/MAX Commercial, NSDA (debate), and DECA.
- **Award icons:** Anthem Awards, Points of Light, Literary Titan, NSDA, College Board, and The New
  York Times.
- **Volunteer logo row:** Second Servings, Target Hunger, Urban Harvest, and Kids' Meals as logos.
  The other three show as names.
- **Small square tiles:** DECA, NSDA, Points of Light, and College Board use their own symbol (the
  DECA diamond, the NSDA figure, the Points of Light starburst, the College Board acorn), because
  their full wordmarks are unreadable at that size.

**Sources:** logos come from Wikimedia Commons or Wikipedia, or the organization's own site. Store
assets come from the listings, and photos from waste-2-taste.org.

**Small layout adjustment:** each award's year moved from its own column onto the issuer line (for
example "Points of Light · 2026"), to make room for the logo tiles on phones.

## Logos not found

- **Disha USA:** dishausa.org exists, but nothing on it mentions the Young Achiever Award, so I
  couldn't confirm it's the same organization. It keeps the "DU" initials tile.
- **Second Mile, WOW Project:** found later, from secondmile.org and thewowproject.org. County Care
  Center was replaced with the Houston Food Bank, whose logo is the black-and-green version from its
  brand guide (its site only serves a white one).
- **Literary Titan:** its site only offers a small 97px icon, so it's slightly soft up close.
- **NSDA:** the Wikimedia logo is an older version (it still says "National Forensic League"). Only
  the figure is shown, so the old text never appears.

## Links not found (hidden, not guessed)

- **Award announcement pages:**
  - **Anthem Awards:** the 2026 finalists list isn't public or searchable yet.
  - **Daily Point of Light:** the Points of Light site search returned nothing.
  - **Disha USA**, **NSDA Academic All American**, and **NYT Summer Reading Contest:** nothing
    found.
  - **College Board awards:** they have no public pages.
  - Only Literary Titan is linked (see below).
- **UH published model:** that field was blank, so it's hidden.
- **RescueLog website:** added later from you. The RescueLog title now links to
  https://rescuelog-mu.vercel.app/.

## Added after the content pass

- **RescueLog website:** the RescueLog title links to https://rescuelog-mu.vercel.app/.
- **Whole Foods photo:** a seventh polaroid, `photo-07.jpg`, captioned "pickup at Whole Foods". It's
  marked `wide` so it shows uncropped; a square crop would have cut off your face at the left edge.
- **Podcast:** the press item is back, now with its real link. "Food Waste to Food Recovery: Sid's
  Waste2Taste Story" on Simple Acts, Big Impact (Apple Podcasts, released Sep 16, 2026; title and
  date checked against Apple's listing).
- **Press logos:** each press card now has the outlet's logo on a white tile: the KPRC 2 logo and
  the Simple Acts, Big Impact show art from Apple Podcasts. The show art was cropped above its
  "Teen Changemakers" tagline, since "changemaker" is on the banned-word list.

## Please verify

1. **App Store seller name.** The App Store listing's seller is "KUMARI SHIPRA", not you or
   RescueLog. I linked it anyway for three reasons: it has the same app ID as your Google Play app
   (`com.rescuelog.app`, published as Sid Sharma), the same description, and the same product.
   This is likely a parent's developer account, since Apple requires developers to be 18+. If it
   isn't yours, delete the App Store link in `data/content.ts`.
2. **Award years.** Every award shows 2026 because you told me all awards are 2026. The brief said
   to show a year only when an official page shows it; only Literary Titan's page confirms 2026.
   To hide the unconfirmed years, delete those `year` lines.
3. **Literary Titan link.** It goes to Literary Titan's page for Still Good (Aug 23, 2026). The
   page names you and the book, but its text doesn't mention the Silver award, so it may be the
   review page and not the award announcement. Swap in the award page if you have it.
4. **Anthem Award.** It says "results Nov 5". Update it after that date.
5. **Wording I chose:**
   - RescueLog's "1.7M meals, about, each year" (from "about 1.7M meals").
   - The debate role "(grade 12)" (from "(12)").
   - Your hero stat labels.
6. **RE/MAX link.** It goes to the national RE/MAX Commercial site, not your specific office.
7. **Earlier facts I kept.** "Live on iOS and Android" is confirmed by the store listings. The
   "Self-published book" type and the NSDA Academic All American "top 1%" line come from your
   earlier messages.

## Verified

- Build passes, with no type errors.
- Zero bracket placeholders in `data/content.ts` and zero on the rendered page.
- No em dashes and none of the banned words.
- No horizontal scroll at 375px. Checked at 375px and 1280px:
  - logo wall
  - RescueLog phones and badges
  - Waste2Taste
  - compact rows and the volunteer logos
  - recognition icons
  - press and footer
