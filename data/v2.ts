// Content for the /v2 portfolio. The homepage at / still reads data/content.ts; facts both
// versions share (contact, awards, press, other experience) are pulled from there so they never
// drift apart.
//
// Every claim here has a source, listed per case study under `sources`. Two scope rules:
// RescueLog numbers are food that partner organizations rescued and logged with the app (weights
// are AI estimates), and Waste2Taste numbers are the whole organization's, not Sid's alone.
//
// Inside any text, **like this** makes it bold.

import { experience, press, recognition, type Award, type Photo, type Tone } from "@/data/content";

/* ---------- Links ---------- */

export const links = {
  rescuelog: "https://rescuelog-mu.vercel.app/",
  appStore: "https://apps.apple.com/us/app/rescuelog/id6770613024",
  googlePlay: "https://play.google.com/store/apps/details?id=com.rescuelog.app",
  waste2taste: "https://waste-2-taste.org",
  w2tMission: "https://waste-2-taste.org/mission.html",
  w2tBranches: "https://waste-2-taste.org/branches.html",
  w2tPartners: "https://waste-2-taste.org/partners.html",
  w2tCookbook: "https://waste-2-taste.org/cookbook.html",
  w2tInstagram: "https://instagram.com/waste2taste.usa",
  nfra: "https://www.nationalfoodrecoveryassociation.org/",
  amazon: "https://www.amazon.com/dp/B0H6S6H6C7",
  literaryTitan: "https://literarytitan.com/2026/08/23/still-good-a-cookbook-for-forgotten-food/",
  kprc: press.items[0].href!,
  podcast: press.items[1].href!,
  nyt: "https://www.nytimes.com/2026/07/29/learning/on-national-parks-and-brainrot-the-winners-of-week-6-of-our-summer-reading-contest.html",
  uh: "https://www.uh.edu",
};

/* ---------- Photos ---------- */

// Every photo V2 uses, with a caption that says what is actually happening in it.
export const photos = {
  hero: { src: "photo-hero.jpg", alt: "Sid Sharma", focus: "50% 30%" },
  traderJoes: {
    src: "photo-01.jpg",
    alt: "Sid Sharma and a Trader Joe's crew member holding two bags tagged as Waste2Taste donations",
    caption: "Surplus from Trader Joe's, tagged as a Waste2Taste donation",
  },
  wholeFoods: {
    src: "photo-07.jpg",
    alt: "Sid Sharma and a volunteer taking a Whole Foods bag from a Whole Foods team member in the store",
    caption: "Pickup at Whole Foods Market",
  },
  pans: {
    src: "photo-02.jpg",
    alt: "Twelve loaf pans of banana bread batter lined up on a kitchen counter",
    caption: "Twelve pans of banana bread batter, ready to bake",
  },
  oven: {
    src: "photo-03.jpg",
    alt: "Loaf pans of banana bread baking in an oven",
    caption: "Into the oven",
  },
  packed: {
    src: "photo-04.jpg",
    alt: "Four foil pans of Waste2Taste banana bread with ingredient labels packed in a car trunk",
    caption: "Labeled with ingredients and packed to donate",
  },
  delivered: {
    src: "photo-05.jpg",
    alt: "Sid Sharma and two volunteers holding labeled Waste2Taste banana bread loaves in a community center lobby",
    caption: "Banana bread, delivered to a community center",
  },
  pantry: {
    src: "photo-06.jpg",
    alt: "Sid Sharma and a volunteer holding Whole Foods bags of rescued groceries in the Fort Bend Family Promise pantry",
    caption: "Rescued groceries at the Fort Bend Family Promise pantry",
  },
  appCapture: {
    src: "rescuelog.png",
    alt: "RescueLog screen for logging a pop-up: take a photo of the food and submit",
    caption: "Logging a pop-up: photograph the food, then submit",
  },
  appHome: {
    src: "rescuelog-2.png",
    alt: "RescueLog home screen with a new pop-up log button and recent logs",
    caption: "The volunteer app's home screen, with recent logs",
  },
  appPhones: {
    src: "rescuelog-mockup.png",
    alt: "RescueLog's new pop-up log screen and home screen on two phones",
    caption: "RescueLog on iOS and Android",
  },
  bookCover: {
    src: "still-good-cover.jpg",
    alt: "Cover of Still Good: A Cookbook for Forgotten Food",
    caption: "Still Good: A Cookbook for Forgotten Food",
  },
  bookPage: {
    src: "still-good-banana-bread.jpg",
    alt: "Banana bread recipe page from Still Good showing ingredients, steps, and a sliced loaf",
    caption: "Banana bread, page 10 of Still Good",
  },
  proofIndian: {
    src: "proof-indian-new-release.jpg",
    alt: "Amazon Hot New Releases in Indian Cooking, Food & Wine, with Still Good at number 1",
    caption: "Amazon Hot New Releases, Indian Cooking: Still Good at #1",
  },
  proofFruit: {
    src: "proof-fruit-new-release.jpg",
    alt: "Amazon Hot New Releases in Fruit Cooking, with Still Good at number 1",
    caption: "Amazon Hot New Releases, Fruit Cooking: Still Good at #1",
  },
  proofBestseller: {
    src: "proof-indian-bestseller.jpg",
    alt: "Amazon Best Sellers in Indian Cooking, Food & Wine, with Still Good on the list",
    caption: "Amazon Best Sellers, Indian Cooking",
  },
  certificate: {
    src: "proof-literary-titan.jpg",
    alt: "Literary Titan Book Award certificate presented to Sid Sharma for Still Good: A Cookbook for Forgotten Food",
    caption: "Literary Titan Book Award certificate for Still Good",
  },
} satisfies Record<string, Photo>;

/* ---------- Hero ---------- */

export const hero = {
  hello: "hi, I'm",
  name: "Sid Sharma",
  // The squiggle draws under `underline`, which must appear in `lead`.
  lead: "I build practical fixes for food waste and hunger.",
  underline: "food waste and hunger",
  body: "I'm a high school senior in Houston, an app developer, published author, and food security advocate. So far that's an app nonprofits use to count rescued food, a nonprofit that cooks grocery surplus into meals, and a cookbook for the food you almost threw away.",
  photo: photos.hero,
  photoCaption: "Delivering banana bread with Waste2Taste",
};

/* ---------- Credibility strip ---------- */

// Three different relationships, kept apart on purpose: who covered the work, who recognized
// it, and who works with it.
/** square: show art that fills a small rounded tile instead of a logo on the strip. */
export type StripLogo = { name: string; logo: string; href?: string; note?: string; square?: boolean };

export const credibility: { label: string; logos: StripLogo[] }[] = [
  {
    label: "Covered by",
    logos: [
      { name: "KPRC 2 Houston (NBC)", logo: "kprc2.svg", href: links.kprc },
      { name: "Simple Acts, Big Impact podcast", logo: "simple-acts-big-impact.jpg", href: links.podcast, square: true },
    ],
  },
  {
    label: "Recognized by",
    logos: [
      { name: "The Anthem Awards", logo: "anthem-awards.svg", note: "finalist" },
      { name: "Points of Light", logo: "points-of-light.svg" },
      { name: "Literary Titan", logo: "literary-titan.png", href: links.literaryTitan },
      { name: "The New York Times", logo: "nyt-wordmark.svg", href: links.nyt },
    ],
  },
  {
    label: "Works with",
    logos: [
      { name: "Second Servings Houston", logo: "second-servings.jpg", href: links.rescuelog, note: "uses RescueLog" },
      { name: "Whole Foods Market", logo: "whole-foods.png", href: links.w2tPartners },
      { name: "Trader Joe's", logo: "trader-joes.png", href: links.w2tPartners },
      { name: "H-E-B", logo: "heb.svg", href: links.w2tPartners },
    ],
  },
];

/* ---------- Projects ---------- */

export type ProjectSlug = "rescuelog" | "waste2taste" | "still-good" | "economics";

export type ProjectTone = Tone | "ink";

/** One piece of evidence: a figure, what it counts, and its scope. A photo opens in the lightbox. */
export type Proof = { value: string; label: string; note?: string; photo?: Photo; href?: string };

export type Project = {
  slug: ProjectSlug;
  index: string;
  name: string;
  tone: ProjectTone;
  role: string;
  when?: string;
  /** One line under the name in the hero index and on cards. */
  short: string;
  tagline: string;
  summary: string;
  proofs: Proof[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "rescuelog",
    index: "01",
    name: "RescueLog",
    tone: "leaf",
    role: "Founder & developer",
    when: "Since May 2026",
    short: "AI food logging for food rescue nonprofits",
    tagline: "One photo of rescued food becomes the numbers a nonprofit can report.",
    summary:
      "Food rescue nonprofits count donated food by eye and on clipboards. With RescueLog, a volunteer photographs it instead: AI estimates the weight by category and its retail value, and a dashboard turns every event into grant-ready reports.",
    proofs: [
      {
        value: "1,580 lbs",
        label: "logged from 20 volunteer photos at one Second Servings pop-up",
        note: "AI estimate",
      },
      { value: "3 platforms", label: "iOS, Android, and a web dashboard, free for nonprofits" },
      { value: "~1 min", label: "from a volunteer's photo to an analyzed log" },
    ],
    links: [
      { label: "Website", href: links.rescuelog },
      { label: "App Store", href: links.appStore },
      { label: "Google Play", href: links.googlePlay },
    ],
  },
  {
    slug: "waste2taste",
    index: "02",
    name: "Waste2Taste",
    tone: "tomato",
    role: "Founder & president",
    when: "Since 2023",
    short: "Grocery surplus, cooked into meals",
    tagline: "Grocery surplus, cooked into fresh meals for shelters and community centers.",
    summary:
      "A student-founded 501(c)(3). Grocers flag food near its sell-by date, volunteers pick it up and cook it, often into banana bread, and deliver it to shelters and community centers.",
    proofs: [
      { value: "5,100+ lbs", label: "of food rescued", note: "Whole organization" },
      { value: "13 branches", label: "in 7 states and the UAE" },
      { value: "30+", label: "grocer and community partners" },
    ],
    links: [
      { label: "Website", href: links.waste2taste },
      { label: "Instagram", href: links.w2tInstagram },
    ],
  },
  {
    slug: "still-good",
    index: "03",
    name: "Still Good",
    tone: "butter",
    role: "Author",
    short: "A cookbook for forgotten food",
    tagline: "A cookbook for the food you almost threw away.",
    summary:
      "79 pages of recipes for black bananas, stale bread, and the leftovers at the back of the fridge. Net proceeds fund Waste2Taste's food rescue.",
    proofs: [
      { value: "#1", label: "New Release in Indian Cooking on Amazon", photo: photos.proofIndian },
      { value: "Silver", label: "Literary Titan Book Award", photo: photos.certificate },
      { value: "Best seller", label: "in Indian Cooking on Amazon", photo: photos.proofBestseller },
    ],
    links: [
      { label: "Get the book", href: links.amazon },
      { label: "About the book", href: links.w2tCookbook },
    ],
  },
  {
    slug: "economics",
    index: "04",
    name: "Economics research",
    tone: "ink",
    role: "Quantitative research assistant",
    short: "The CBO's potential-GDP model, in Python",
    tagline: "Rebuilding the CBO's potential-GDP model in Python, so students can run it.",
    summary:
      "In UH's Department of Economics, I translated the Congressional Budget Office's potential-GDP model from EViews to Python, built a forecasting framework on top of it, and published it with explanations for undergraduate courses.",
    proofs: [
      { value: "Python", label: "the CBO's potential-GDP model, translated from EViews" },
      { value: "Forecasting", label: "a custom framework built on the model" },
      { value: "Teaching", label: "published with explanations for UH undergraduate courses" },
    ],
    links: [],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

/* ---------- Case studies ---------- */

export type Step = { title: string; body: string; photos?: Photo[] };

export type Block =
  | { kind: "text"; paragraphs: string[] }
  | { kind: "list"; items: string[] }
  | { kind: "steps"; steps: Step[] }
  | { kind: "milestones"; items: { date: string; text: string }[] }
  | { kind: "photos"; photos: Photo[]; layout?: "pair" | "row" | "phones" }
  | { kind: "note"; title: string; text: string }
  | { kind: "quote"; text: string; source: string; href?: string }
  | { kind: "proofs"; proofs: Proof[] }
  | { kind: "logos"; logos: { name: string; logo: string; href?: string }[] }
  | { kind: "places"; places: { city: string; region: string; founding?: boolean }[] }
  | { kind: "event" }
  | { kind: "flow" };

export type CaseSection = { id: string; label: string; title: string; blocks: Block[] };

export type CaseStudy = {
  slug: ProjectSlug;
  title: string;
  subtitle: string;
  meta: { label: string; value: string }[];
  glance: Proof[];
  sections: CaseSection[];
  sources: { label: string; href: string }[];
};

// The St. Peter Claver pop-up, as published on rescuelog-mu.vercel.app from the live dashboard.
export const rescueEvent = {
  name: "Pop-Up Distribution · St. Peter Claver",
  org: "Second Servings Houston",
  photos: 20,
  pounds: "1,580",
  value: "$4,804",
  categories: [
    { label: "Produce", pct: 32 },
    { label: "Bakery & Bread", pct: 21 },
    { label: "Shelf-Stable", pct: 20 },
    { label: "Grab-n-Go", pct: 9 },
    { label: "Meat & Poultry", pct: 6 },
    { label: "Other", pct: 12 },
  ],
};

export const caseStudies: Record<ProjectSlug, CaseStudy> = {
  rescuelog: {
    slug: "rescuelog",
    title: "RescueLog",
    subtitle: "Turning a photo of rescued food into the numbers a nonprofit can report.",
    meta: [
      { label: "Role", value: "Founder & developer" },
      { label: "When", value: "May 2026 to now" },
      { label: "Built with", value: "Expo (React Native), Next.js, Supabase, Claude vision" },
      { label: "Platforms", value: "iOS, Android, web dashboard" },
    ],
    glance: [
      { value: "~1 min", label: "from photo to an analyzed log" },
      { value: "3 modes", label: "pop-up distributions, pantry carts, and gleaning trips" },
      { value: "$0", label: "cost to nonprofits" },
    ],
    sections: [
      {
        id: "problem",
        label: "The problem",
        title: "Food rescue runs on clipboards.",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "Food rescue organizations move thousands of pounds of food, but most of it is counted on paper or estimated on sight, then typed into spreadsheets by hand. Every pound a team can't prove is impact it can't report.",
              "Funders want more than a total: how much was produce, how much was protein, what it was worth. Most organizations have never been able to capture that.",
              "RescueLog came out of four years of volunteering with Houston hunger-relief organizations, sorting, packing, and handing out food.",
            ],
          },
        ],
      },
      {
        id: "role",
        label: "My role",
        title: "I built all of it, with the people using it.",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "I designed and built RescueLog myself: the volunteer app for iOS and Android, the web dashboard staff use, and the pipeline that turns photos into records. It's shaped with the organizations using it, and I set each new team up personally.",
              "It's free for nonprofits. No contracts, no per-seat pricing, and each organization can export all of its data at any time.",
            ],
          },
        ],
      },
      {
        id: "how",
        label: "How it works",
        title: "Four steps. The volunteer only does the first.",
        blocks: [
          { kind: "flow" },
          { kind: "photos", photos: [photos.appCapture, photos.appHome], layout: "phones" },
        ],
      },
      {
        id: "build",
        label: "Under the hood",
        title: "Estimating food from a photo, carefully.",
        blocks: [
          {
            kind: "list",
            items: [
              "**One app for two platforms.** The volunteer app is built with Expo (React Native), so one codebase ships to iOS and Android. Photos upload straight to Supabase storage.",
              "**A strict prompt, not a guess.** Each photo goes to Claude's vision model with a weight reference table, rules for food that's hidden, stacked, or in sealed boxes (assume a partial fill, don't invent depth), a confidence score, and a fixed JSON format. Temperature is set to 0, so the same photo gets the same answer.",
              "**Built so nothing gets lost.** Photos are processed three at a time, with automatic retries when the API is busy. One failed photo never stops the others, and every log ends as complete, partial, or failed, never stuck.",
              "**Value, not just weight.** Retail value is anchored to the store the food came from, and each organization can pin exact prices for items it gets often.",
              "**Different sites work differently.** Pop-up distributions, cart-based pantries, and gleaning trips each have their own capture mode. In Cart Mode the cart is weighed on a scale, so the scale's number is the total and the AI only splits it into categories.",
            ],
          },
        ],
      },
      {
        id: "process",
        label: "Process",
        title: "Two months of shipping, from the commit history.",
        blocks: [
          {
            kind: "milestones",
            items: [
              { date: "May 16, 2026", text: "First build: the volunteer app, the dashboard, and the AI pipeline." },
              { date: "May 18 to 21", text: "Prepared the App Store release and addressed Apple's review feedback." },
              { date: "May 22 to 24", text: "Added onboarding and support for multiple organizations." },
              {
                date: "June 6",
                text: "Rebuilt photo processing after hitting serverless time limits: small background batches, retries, and a daily backstop job.",
              },
              {
                date: "June 11",
                text: "Checked the AI against a hand tally of the same event (1,499 lbs) and recalibrated the prompt; its estimate came in around 1,630 lbs. Set temperature to 0 to cut run-to-run variance.",
              },
              { date: "June 16", text: "Added retail-value estimates, with per-organization price overrides." },
              { date: "June 18", text: "Added Cart Mode for pantries that weigh carts on a scale." },
              { date: "July 5", text: "Security pass: API checks that fail closed, and data scoped to each organization." },
              { date: "July 14", text: "Added a gleaning mode with produce-only categories." },
              {
                date: "July 19",
                text: "Added an all-organizations view for admins, and fixed photos being silently dropped above 40 per submission.",
              },
            ],
          },
        ],
      },
      {
        id: "results",
        label: "Results",
        title: "In use at Second Servings Houston.",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "Second Servings Houston, which has rescued more than 19 million pounds of food since 2015, uses RescueLog to log pop-up grocery distributions across the city. This is one real event from the live dashboard:",
            ],
          },
          { kind: "event" },
          {
            kind: "note",
            title: "What these numbers count",
            text: "These are pounds partner organizations rescued and then logged with RescueLog, and the weights are AI estimates. RescueLog doesn't recover food itself, and none of this is counted in Waste2Taste's totals.",
          },
        ],
      },
      {
        id: "learned",
        label: "Lessons from the build",
        title: "What changed along the way.",
        blocks: [
          {
            kind: "list",
            items: [
              "**AI estimates need a ground truth.** Comparing the model against a hand tally changed the prompt, and Cart Mode treats a real scale as the final word.",
              "**At a live event, reliability beats features.** A volunteer can't redo a distribution, so one bad photo should never lose the rest of the log.",
              "**Every organization runs its own way.** Pop-ups, pantry carts, and gleaning trips each needed their own capture flow and categories.",
            ],
          },
        ],
      },
    ],
    sources: [
      { label: "RescueLog website, including the live-dashboard example", href: links.rescuelog },
      { label: "Second Servings Houston: 19 million pounds rescued since 2015", href: "https://secondservingshouston.org/" },
      { label: "RescueLog on the App Store", href: links.appStore },
      { label: "RescueLog on Google Play", href: links.googlePlay },
    ],
  },

  waste2taste: {
    slug: "waste2taste",
    title: "Waste2Taste",
    subtitle: "A student-founded nonprofit that turns grocery surplus into meals.",
    meta: [
      { label: "Role", value: "Founder & president" },
      { label: "When", value: "Since 2023" },
      { label: "Where", value: "Founded in Houston; 13 branches" },
      { label: "Status", value: "501(c)(3) nonprofit" },
    ],
    glance: [
      { value: "5,100+ lbs", label: "of food rescued", note: "Whole organization" },
      { value: "13", label: "branches in 7 states and the UAE" },
      { value: "30+", label: "grocer and community partners" },
      { value: "NFRA", label: "member, National Food Recovery Association" },
    ],
    sections: [
      {
        id: "why",
        label: "Why it started",
        title: "The food was still good. The step in between was missing.",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "Houston's grocery stores throw away a lot of good food: produce near its sell-by date, food about to spoil, or simply too much stock. Nothing was wrong with it. What was missing was someone to get it from the store to the people who need it.",
              "I've always loved to bake, and bakers learn early that overripe bananas become banana bread, not garbage. Waste2Taste started at our family kitchen table in 2023 with that idea: nothing good gets thrown away.",
            ],
          },
          {
            kind: "quote",
            text: "What started at a family kitchen table in 2023 has grown into a community effort…",
            source: "KPRC 2 Houston",
            href: links.kprc,
          },
        ],
      },
      {
        id: "how",
        label: "How it works",
        title: "From the store shelf to a shelter, in four steps.",
        blocks: [
          {
            kind: "steps",
            steps: [
              {
                title: "A partner flags surplus",
                body: "Grocers like Trader Joe's and Whole Foods set aside food that's still good but won't sell in time.",
                photos: [photos.traderJoes],
              },
              {
                title: "We pick it up",
                body: "Volunteers collect it from the store.",
              },
              {
                title: "We cook it into fresh meals",
                body: "Overripe bananas become banana bread, twelve pans at a time.",
                photos: [photos.pans, photos.oven],
              },
              {
                title: "We deliver it",
                body: "Meals and groceries are labeled with their ingredients, packed, and delivered to shelters and community centers.",
                photos: [photos.packed, photos.delivered, photos.pantry],
              },
            ],
          },
        ],
      },
      {
        id: "role",
        label: "My role",
        title: "I started it. A lot of people run it.",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "I founded Waste2Taste and lead it as president from Houston, the founding branch. The totals on this page belong to the whole organization: volunteers in Houston and student leaders running branches in their own cities.",
              "New branches get training and support from Houston, and each one is led locally.",
            ],
          },
          {
            kind: "places",
            places: [
              { city: "Houston", region: "TX", founding: true },
              { city: "Dallas", region: "TX" },
              { city: "Austin", region: "TX" },
              { city: "Baltimore", region: "MD" },
              { city: "San Francisco", region: "CA" },
              { city: "Irvine", region: "CA" },
              { city: "Diamond Bar", region: "CA" },
              { city: "Arlington", region: "VA" },
              { city: "Chicago", region: "IL" },
              { city: "Tacoma", region: "WA" },
              { city: "Boston", region: "MA" },
              { city: "United Arab Emirates", region: "International" },
              { city: "Dubai", region: "UAE" },
            ],
          },
        ],
      },
      {
        id: "partners",
        label: "Partners",
        title: "Powered by generous grocers.",
        blocks: [
          {
            kind: "logos",
            logos: [
              { name: "Whole Foods Market", logo: "whole-foods.png", href: links.w2tPartners },
              { name: "Trader Joe's", logo: "trader-joes.png", href: links.w2tPartners },
              { name: "H-E-B", logo: "heb.svg", href: links.w2tPartners },
              { name: "Fort Bend Family Promise", logo: "fort-bend-family-promise.jpg", href: links.w2tPartners },
              { name: "National Food Recovery Association", logo: "nfra.jpg", href: links.nfra },
            ],
          },
          {
            kind: "text",
            paragraphs: [
              "Grocers donate the food, community partners like Fort Bend Family Promise help it reach families, and Waste2Taste is a member of the National Food Recovery Association.",
            ],
          },
        ],
      },
      {
        id: "results",
        label: "Recognition and press",
        title: "Recognized and covered.",
        blocks: [
          {
            kind: "list",
            items: [
              "**Daily Point of Light Award**, Points of Light, 2026, for service work with Waste2Taste.",
              "**Anthem Awards finalist**, Young Leader in Humanitarian Action & Services, 2026. Results are announced Nov 5, 2026.",
              "**Young Achiever Award, Runner-Up**, Disha USA, 2026, for Social Impact and Community Service.",
              "**Featured on KPRC 2 Houston** (NBC), Aug 29, 2026, and on the **Simple Acts, Big Impact** podcast, Sep 16, 2026.",
            ],
          },
          {
            kind: "text",
            paragraphs: ["Net proceeds from Still Good, my cookbook, fund Waste2Taste's food rescue and meal donations."],
          },
        ],
      },
    ],
    sources: [
      { label: "Waste2Taste: mission and how it works", href: links.w2tMission },
      { label: "Waste2Taste: branches", href: links.w2tBranches },
      { label: "Waste2Taste: partners", href: links.w2tPartners },
      { label: "KPRC 2 Houston feature, Aug 29, 2026", href: links.kprc },
      { label: "Simple Acts, Big Impact podcast, Sep 16, 2026", href: links.podcast },
    ],
  },

  "still-good": {
    slug: "still-good",
    title: "Still Good",
    subtitle: "A cookbook for the food you almost threw away.",
    meta: [
      { label: "Role", value: "Author" },
      { label: "Format", value: "79-page paperback, self-published" },
      { label: "Proceeds", value: "Fund Waste2Taste's food rescue" },
      { label: "Available", value: "Amazon" },
    ],
    glance: [
      { value: "#1", label: "New Release, Indian Cooking (Amazon)", photo: photos.proofIndian },
      { value: "#1", label: "New Release, Fruit Cooking (Amazon)", photo: photos.proofFruit },
      { value: "Best seller", label: "Indian Cooking (Amazon)", photo: photos.proofBestseller },
      { value: "Silver", label: "Literary Titan Book Award", photo: photos.certificate },
    ],
    sections: [
      {
        id: "idea",
        label: "The idea",
        title: "Ugly is usable. Spoiled is not.",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "Still Good is 79 pages of recipes for the food you almost threw away: black bananas, stale bread, the leftovers at the back of the fridge. It cooks the way Indian-American kitchens do, resourceful and unfussy, and it starts from what I learned cooking surplus food with Waste2Taste.",
            ],
          },
        ],
      },
      {
        id: "inside",
        label: "Inside the book",
        title: "Organized by how far gone the food is.",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "Each ingredient comes in stages, from Still Good to Past Prime to Last Call, with recipes for each one: a banana on the edge turns into pancakes or bread, and tomatoes past their best turn into sauce or soup. Safety notes mark where reusing ends and tossing begins.",
              "It ends with reference pages: what to do with leftovers, what freezes well, what to swap in, and the everyday habits that waste less.",
            ],
          },
          { kind: "photos", photos: [photos.bookCover, photos.bookPage], layout: "pair" },
        ],
      },
      {
        id: "recognition",
        label: "Recognition",
        title: "Documented, with screenshots.",
        blocks: [
          {
            kind: "proofs",
            proofs: [
              { value: "#1", label: "Amazon Hot New Releases, Indian Cooking", photo: photos.proofIndian },
              { value: "#1", label: "Amazon Hot New Releases, Fruit Cooking", photo: photos.proofFruit },
              { value: "Best seller", label: "Amazon Best Sellers, Indian Cooking", photo: photos.proofBestseller },
              { value: "Silver", label: "Literary Titan Book Award, 2026", photo: photos.certificate },
            ],
          },
          {
            kind: "quote",
            text: "A practical, visually inviting cookbook built around a familiar kitchen problem.",
            source: "Literary Titan review",
            href: links.literaryTitan,
          },
        ],
      },
      {
        id: "why",
        label: "Why a cookbook",
        title: "The same idea, in a form anyone can use at home.",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "Waste2Taste rescues food at the store. Still Good is for the food that's already in your kitchen. Net proceeds go back into Waste2Taste's food rescue and meal donations.",
            ],
          },
        ],
      },
    ],
    sources: [
      { label: "Still Good on Amazon", href: links.amazon },
      { label: "About the book, Waste2Taste", href: links.w2tCookbook },
      { label: "Literary Titan review, Aug 23, 2026", href: links.literaryTitan },
    ],
  },

  economics: {
    slug: "economics",
    title: "Economics research",
    subtitle: "Rebuilding the CBO's potential-GDP model in Python, so students can run it.",
    meta: [
      { label: "Role", value: "Quantitative research assistant" },
      { label: "Where", value: "University of Houston, Department of Economics" },
      { label: "Tools", value: "EViews, Python" },
    ],
    glance: [
      { value: "Python", label: "the CBO's potential-GDP model, translated from EViews" },
      { value: "Forecasts", label: "a custom framework built on the model" },
      { value: "Courses", label: "published with explanations for UH undergraduates" },
    ],
    sections: [
      {
        id: "question",
        label: "The question",
        title: "How much can the economy produce without overheating?",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "Economists call it potential GDP: the output the economy can sustain when its workers and equipment are fully used, without pushing inflation up. The Congressional Budget Office estimates it for its budget and economic projections, and the gap between actual and potential GDP is a common way to tell whether the economy is running hot or cold.",
              "The CBO builds that estimate from long-run trends in the labor force, the stock of capital, and productivity.",
            ],
          },
        ],
      },
      {
        id: "did",
        label: "What I did",
        title: "From commercial software to code anyone can run.",
        blocks: [
          {
            kind: "list",
            items: [
              "**Translated the model.** I rewrote the CBO's potential-GDP model from EViews, a commercial statistics package, into Python.",
              "**Built a forecasting framework** on top of the translated model.",
              "**Published it with explanations** so it can be used in University of Houston undergraduate courses.",
            ],
          },
        ],
      },
      {
        id: "why",
        label: "Why it matters",
        title: "Students can change an assumption and see what happens.",
        blocks: [
          {
            kind: "text",
            paragraphs: [
              "EViews is commercial software. Python is free and widely taught, so a student can open the model, change an input, and watch the estimate move, instead of only reading the CBO's published numbers.",
            ],
          },
        ],
      },
    ],
    sources: [{ label: "University of Houston", href: links.uh }],
  },
};

/* ---------- Recognition ---------- */

export type V2Award = Award & {
  /** A word or two before the name, like "Finalist". */
  status?: string;
  description?: string;
  evidence?: { photo?: Photo; href?: string; hrefLabel?: string };
};

const v1Award = (id: string): Award => {
  for (const category of recognition.categories) {
    const found = category.awards.find((award) => award.id === id);
    if (found) return found;
  }
  throw new Error(`No award with id ${id} in data/content.ts`);
};

export const awards: { name: string; tone: ProjectTone; awards: V2Award[] }[] = [
  {
    name: "Entrepreneurship & community impact",
    tone: "tomato",
    awards: [
      {
        ...v1Award("anthem"),
        name: "Anthem Award",
        status: "Finalist",
        description: "Young Leader in Humanitarian Action & Services, from 2,500+ entries. Results are announced Nov 5, 2026.",
      },
      { ...v1Award("points-of-light"), description: "For service work with Waste2Taste." },
      {
        ...v1Award("literary-titan"),
        description: "For Still Good: A Cookbook for Forgotten Food.",
        evidence: { photo: photos.certificate, href: links.literaryTitan, hrefLabel: "Review" },
      },
      { ...v1Award("disha-usa"), description: "Social Impact and Community Service." },
    ],
  },
  {
    name: "Academics, writing & debate",
    tone: "leaf",
    awards: [
      { ...v1Award("deca-international"), description: "Personal Financial Literacy." },
      { ...v1Award("nsda-academic-all-american"), description: "Top 1% of debaters." },
      {
        id: "nsda-premier-distinction",
        name: "Student of Premier Distinction",
        issuer: "National Speech & Debate Association",
        logo: "nsda-mark.png",
      },
      {
        ...v1Award("nyt-summer-reading"),
        description: "Week 6 of The Learning Network's Summer Reading Contest, from 8,000+ entries.",
        evidence: { href: links.nyt, hrefLabel: "Winners list" },
      },
      { ...v1Award("ap-scholar") },
      { ...v1Award("national-recognition") },
    ],
  },
];

/* ---------- Press ---------- */

export const pressItems = [
  {
    ...press.items[0],
    outlet: "KPRC 2 Houston (NBC)",
    date: "Aug 29, 2026",
    summary: "A \"2 Helps You\" feature on how Waste2Taste grew from a family kitchen table in 2023 into a community effort against food waste.",
    action: "Watch the story",
  },
  {
    ...press.items[1],
    date: "Sep 16, 2026",
    kind: "Podcast · 16 min",
    summary: "An episode on Waste2Taste's story, from food waste to food recovery.",
    action: "Listen",
  },
];

/* ---------- Gallery ---------- */

export type GalleryTag = "Waste2Taste" | "RescueLog" | "Still Good";

export const gallery: (Photo & { tag: GalleryTag })[] = [
  { ...photos.traderJoes, tag: "Waste2Taste" },
  { ...photos.pans, tag: "Waste2Taste" },
  { ...photos.bookCover, tag: "Still Good" },
  { ...photos.wholeFoods, tag: "Waste2Taste" },
  { ...photos.oven, tag: "Waste2Taste" },
  { ...photos.appCapture, tag: "RescueLog" },
  { ...photos.packed, tag: "Waste2Taste" },
  { ...photos.bookPage, tag: "Still Good" },
  { ...photos.delivered, tag: "Waste2Taste" },
  { ...photos.appHome, tag: "RescueLog" },
  { ...photos.pantry, tag: "Waste2Taste" },
];

/* ---------- About ---------- */

export const about = {
  title: "A little more about me.",
  paragraphs: [
    "For four years I've sorted, packed, and handed out food with seven Houston hunger-relief organizations. What I saw there led to RescueLog, and I still build it with the people who use it.",
    "Away from food rescue, I'm a quantitative research assistant in UH's economics department, and I captain my school's Lincoln-Douglas debate team: I've coached 15 novices who went on to place at tournaments and ran our yearly tournament for 400+ attendees.",
  ],
  photo: photos.pantry,
};

/* ---------- Milestones ---------- */

export const milestones: { date: string; text: string; slug?: ProjectSlug }[] = [
  { date: "Four years", text: "Volunteering with seven Houston hunger-relief organizations: sorting, packing, and handing out food." },
  { date: "2023", text: "Waste2Taste starts at a family kitchen table, then grows to 13 branches.", slug: "waste2taste" },
  { date: "May 2026", text: "First build of RescueLog, and its App Store review the same month.", slug: "rescuelog" },
  { date: "Jun 2026", text: "RescueLog's AI checked against a hand tally; retail value and Cart Mode added.", slug: "rescuelog" },
  { date: "Jul 2026", text: "Honorable mention in The New York Times Summer Reading Contest. Gleaning mode ships in RescueLog." },
  { date: "Aug 2026", text: "Literary Titan reviews Still Good; KPRC 2 features Waste2Taste.", slug: "still-good" },
  { date: "Sep 2026", text: "Simple Acts, Big Impact podcast episode on Waste2Taste." },
  { date: "Next", text: "Anthem Awards results, announced Nov 5, 2026. I'm a finalist for Young Leader in Humanitarian Action & Services." },
];

/* ---------- Other experience ---------- */

// Straight from the homepage's "and a few more" list, minus the research covered above.
export const otherExperience = experience.more.filter((entry) => entry.id !== "uh-research");

/* ---------- Contact ---------- */

export const closing = {
  title: "Want to reach out? Say hi.",
  body: "For RescueLog demos or Waste2Taste partnerships, the organizations' inbox reaches me too.",
  orgEmail: "waste2taste.usa@gmail.com",
};
