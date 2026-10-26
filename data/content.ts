// Everything the site says lives in this file. Components only render what is here.
//
// Inside any text:
//   **like this**  makes it bold (use it for numbers)
//   [like this]    marks something unfinished; it shows as a highlighted tag on the page
//
// Images: photos go in /public/photos, logos in /public/logos. Write just the file name.
// A missing file never leaves a blank slot. The hero photo and the polaroids show a labeled
// placeholder; everything else falls back to a designed version (wordmark, app splash, cover).
//
// Sources: numbers, captions, partners, and links marked "waste-2-taste.org" come from that site.

/* ---------- Types ---------- */

export type Tone = "tomato" | "butter" | "leaf";
export type DoodleName = "carrot" | "tomato" | "bread" | "whisk";

export type Photo = { src: string; alt: string; caption?: string };

/** A link button. Set badge to show the official App Store or Google Play badge instead. */
export type LinkChip = { label: string; href: string; badge?: "app-store" | "google-play" };

export type Stat = { value: string; unit?: string; label: string };

/** Square tile beside an entry: the logo file if it exists, otherwise the doodle or initials. */
export type Mark = { logo?: string; doodle?: DoodleName; initials?: string; tone: Tone };

export type Entry = {
  id: string;
  role: string;
  org: string;
  orgHref?: string;
  type: string;
  dates: string;
  location?: string;
  mark: Mark;
  summary: string;
  bullets?: string[];
  links: LinkChip[];
  /** Optional thumbnails. Only photos whose files exist are shown. */
  photos?: Photo[];
};

export type FeaturedEntry = Entry & {
  stats?: Stat[];
  visual:
    | { kind: "phone"; screens: Photo[] }
    | { kind: "polaroids"; photos: Photo[] }
    | { kind: "book"; cover: Photo; title: string; subtitle: string; author: string };
};

export type Award = {
  name: string;
  /** Link to proof. Leave out when there is no public page. */
  href?: string;
  issuer: string;
  year: string;
  /** One line of context, like "Of 8,000+ entries". */
  context?: string;
  photos?: Photo[];
};

export type AwardCategory = { name: string; tone: Tone; awards: Award[] };

export type PressItem = {
  outlet: string;
  /** "TV", "Podcast", "Article", and so on. */
  kind: string;
  headline: string;
  href: string;
  date?: string;
  thumbnail?: Photo;
};

export type Logo = { name: string; href: string; logo?: string };

export type NavItem = { label: string; href: string; icon: DoodleName };

/* ---------- Site ---------- */

export const site = {
  name: "Sid Sharma",
  // Set to the live domain once DNS is ready, like "https://example.com".
  // Until then, Vercel supplies the deployment URL for link previews.
  url: undefined as string | undefined,
  description:
    "High school senior in Houston. Founder of RescueLog and Waste2Taste, author of Still Good, building ways to get good food to people instead of landfills.",
  shareLine: "Founder of RescueLog and Waste2Taste · Author of Still Good",
  copyright: "© 2026 Sid Sharma",
};

export const contact = {
  // Shown as "name at domain dot com" and copied on click, so bots can't scrape it.
  email: "[email]",
  linkedin: "[link]",
  instagram: "[link]",
};

// Press hides itself here too whenever the press list is empty.
export const nav: NavItem[] = [
  { label: "Experience", href: "#experience", icon: "whisk" },
  { label: "Recognition", href: "#recognition", icon: "carrot" },
  { label: "Press", href: "#press", icon: "tomato" },
  { label: "Contact", href: "#contact", icon: "bread" },
];

/* ---------- Hero ---------- */

export const hero = {
  name: "Sid Sharma",
  line: "Hi, I'm Sid, a founder, debater, and author building ways to get good food to people instead of landfills.",
  // Cropped from photo-05.jpg for now.
  photo: { src: "photo-hero.jpg", alt: "Sid Sharma" } as Photo,
  note: "say hi!",
  stats: [
    { value: "5,100+", unit: "lbs", label: "of food rescued by Waste2Taste" },
    { value: "3", unit: "cities", label: "with Waste2Taste chapters" },
    { value: "#1", unit: "new release", label: "Still Good, in Indian Cooking" },
  ] as Stat[],
};

/* ---------- Logo wall ---------- */

const W2T_PARTNERS = "https://waste-2-taste.org/partners.html";

export const logoWall = {
  label: "worked with & featured by",
  // Each logo links to proof. Without a logo file, the name shows as a wordmark.
  logos: [
    { name: "Trader Joe's", href: W2T_PARTNERS, logo: "trader-joes.png" },
    { name: "H-E-B", href: W2T_PARTNERS, logo: "heb.png" },
    { name: "Whole Foods Market", href: W2T_PARTNERS, logo: "whole-foods.png" },
    {
      name: "KPRC 2 Houston",
      href: "https://www.click2houston.com/news/local/2026/08/29/2-helps-you-17-year-old-sugar-land-teen-making-a-positive-impact-by-recycling-food-from-local-grocery-stores/",
    },
    { name: "Keemat Grocers", href: W2T_PARTNERS, logo: "keemat.png" },
    { name: "University of Houston", href: "https://www.uh.edu" },
    { name: "Fort Bend Family Promise", href: W2T_PARTNERS, logo: "fort-bend-family-promise.jpg" },
    { name: "National Food Recovery Association", href: "https://www.nationalfoodrecoveryassociation.org/", logo: "nfra.jpg" },
    { name: "RE/MAX Commercial", href: "[link]" },
  ] as Logo[],
};

/* ---------- Experience ---------- */

export const experience = {
  kicker: "what I've built",
  title: "Experience",

  featured: [
    {
      id: "rescuelog",
      role: "Founder",
      org: "RescueLog",
      orgHref: "[link]",
      type: "App",
      dates: "[dates]",
      mark: { logo: "rescuelog.png", doodle: "carrot", tone: "leaf" },
      summary: "An AI-powered food logging app for food-rescue organizations, live on iOS and Android.",
      stats: [
        { value: "[X]", unit: "orgs", label: "using it" },
        { value: "[X]", unit: "lbs", label: "of food logged" },
      ],
      bullets: ["Used by [partner orgs]"],
      links: [
        { label: "App Store", href: "[link]", badge: "app-store" },
        { label: "Google Play", href: "[link]", badge: "google-play" },
      ],
      visual: {
        kind: "phone",
        screens: [
          { src: "rescuelog.png", alt: "RescueLog app screenshot" },
          { src: "rescuelog-2.png", alt: "Second RescueLog app screenshot" },
        ],
      },
    },
    {
      id: "waste2taste",
      role: "Founder",
      org: "Waste2Taste",
      orgHref: "https://waste-2-taste.org",
      type: "501(c)(3) nonprofit",
      dates: "[dates]",
      location: "Houston, Baltimore, and the SF Bay Area",
      mark: { logo: "waste2taste.png", doodle: "tomato", tone: "tomato" },
      summary:
        "A 501(c)(3) youth nonprofit that rescues surplus food from grocers and cooks it into fresh meals for shelters and community centers, with chapters in Houston, Baltimore, and the San Francisco Bay Area.",
      stats: [
        { value: "5,100+", unit: "lbs", label: "of food rescued" },
        { value: "30+", unit: "partners", label: "grocers and community orgs" },
        { value: "[X]", unit: "volunteers", label: "across all chapters" },
      ],
      bullets: [
        "Partners flag surplus, the team picks it up and cooks it into fresh meals, like **12 pans** of banana bread at a time",
        "Member of the National Food Recovery Association",
      ],
      links: [
        { label: "Website", href: "https://waste-2-taste.org" },
        { label: "Instagram", href: "https://instagram.com/waste2taste.usa" },
        { label: "Partners", href: W2T_PARTNERS },
      ],
      // 5 to 7 photos. The caption is handwritten under each polaroid.
      visual: {
        kind: "polaroids",
        photos: [
          {
            src: "photo-01.jpg",
            alt: "Sid Sharma and a Trader Joe's crew member holding two bags tagged as Waste2Taste donations",
            caption: "flagged at the grocer",
          },
          {
            src: "photo-02.jpg",
            alt: "Twelve loaf pans of banana bread batter lined up on a kitchen counter",
            caption: "twelve pans at a time",
          },
          {
            src: "photo-03.jpg",
            alt: "Loaf pans of banana bread baking in an oven",
            caption: "into the oven",
          },
          {
            src: "photo-04.jpg",
            alt: "Four foil pans of Waste2Taste banana bread with ingredient labels packed in a car trunk",
            caption: "packed to donate",
          },
          {
            src: "photo-05.jpg",
            alt: "Sid Sharma and two volunteers holding labeled Waste2Taste banana bread loaves in a community center lobby",
            caption: "banana bread, delivered",
          },
          {
            src: "photo-06.jpg",
            alt: "Sid Sharma and a volunteer holding Whole Foods bags of rescued groceries in the Fort Bend Family Promise pantry",
            caption: "at Fort Bend Family Promise",
          },
        ],
      },
    },
    {
      id: "still-good",
      role: "Author",
      org: "Still Good: A Cookbook for Forgotten Food",
      orgHref: "https://waste-2-taste.org/cookbook.html",
      type: "Self-published book",
      dates: "[date]",
      mark: { doodle: "bread", tone: "butter" },
      summary:
        "A self-published cookbook on turning food people throw away into real meals: black bananas, stale bread, the leftovers at the back of the fridge.",
      stats: [
        { value: "#1", unit: "new release", label: "in Indian Cooking" },
        { value: "#3", unit: "bestseller", label: "in Indian Cookbooks" },
      ],
      bullets: [
        "Won the **Literary Titan Silver Book Award**",
        "**79 pages**; net proceeds fund Waste2Taste's food rescue and meal donations",
      ],
      links: [
        { label: "Get the book", href: "https://www.amazon.com/dp/B0H6S6H6C7" },
        { label: "About the book", href: "https://waste-2-taste.org/cookbook.html" },
      ],
      photos: [
        {
          src: "still-good-banana-bread.jpg",
          alt: "Banana bread recipe page from Still Good showing ingredients, steps, and a sliced loaf",
          caption: "banana bread, page 10",
        },
      ],
      visual: {
        kind: "book",
        cover: { src: "still-good-cover.jpg", alt: "Cover of Still Good: A Cookbook for Forgotten Food" },
        title: "Still Good",
        subtitle: "A Cookbook for Forgotten Food",
        author: "Sid Sharma",
      },
    },
  ] as FeaturedEntry[],

  moreLabel: "and a few more",

  more: [
    {
      id: "uh-research",
      role: "Research Assistant",
      org: "University of Houston",
      orgHref: "https://www.uh.edu",
      type: "Research",
      dates: "[dates]",
      mark: { logo: "uh.png", initials: "UH", tone: "tomato" },
      summary: "Translating a CBO economic model from EViews to Python under [Professor].",
      links: [{ label: "Project", href: "[link]" }],
      photos: [],
    },
    {
      id: "remax",
      role: "Intern",
      org: "RE/MAX Commercial Real Estate",
      orgHref: "[link]",
      type: "Internship",
      dates: "[dates]",
      mark: { logo: "remax-commercial.png", initials: "RE", tone: "butter" },
      summary: "[what I did]",
      links: [{ label: "Website", href: "[link]" }],
      photos: [],
    },
    {
      id: "debate",
      role: "Captain",
      org: "Lincoln-Douglas Debate",
      type: "Debate",
      dates: "[dates]",
      mark: { initials: "LD", tone: "leaf" },
      summary: "NSDA Academic All American (top 1% of debaters). [record]",
      links: [{ label: "Results", href: "[link]" }],
      photos: [],
    },
    {
      id: "deca",
      role: "Competitor",
      org: "DECA",
      orgHref: "https://www.deca.org",
      type: "Competition",
      dates: "[dates]",
      mark: { logo: "deca.png", initials: "DECA", tone: "tomato" },
      summary: "[results]",
      links: [{ label: "Results", href: "[link]" }],
      photos: [],
    },
    {
      id: "research-club",
      role: "Program Director",
      org: "Research Club",
      type: "Club",
      dates: "[dates]",
      mark: { initials: "RC", tone: "butter" },
      summary: "[what I did]",
      links: [{ label: "Club page", href: "[link]" }],
      photos: [],
    },
  ] as Entry[],
};

/* ---------- Recognition ---------- */

export const recognition = {
  kicker: "what I've won",
  title: "Recognition",
  // Awards shown per category before the "See X more" toggle appears.
  showFirst: 5,
  categories: [
    {
      name: "Entrepreneurship & Impact",
      tone: "tomato",
      awards: [
        {
          name: "Anthem Award Finalist",
          href: "[link]",
          issuer: "The Anthem Awards",
          year: "2026",
          context: "Young Leader in Humanitarian Action & Services · 2,500+ entries · results Nov 5",
        },
        {
          name: "Daily Point of Light Award",
          href: "[link]",
          issuer: "Points of Light",
          year: "[year]",
          context: "For service work with Waste2Taste",
        },
        {
          name: "Literary Titan Silver Book Award",
          href: "[link]",
          issuer: "Literary Titan",
          year: "[year]",
          context: "For Still Good: A Cookbook for Forgotten Food",
        },
        {
          name: "Young Achiever Award, Runner-Up",
          href: "[link]",
          issuer: "Disha USA",
          year: "[year]",
          context: "Social Impact and Community Service",
        },
      ],
    },
    {
      name: "Debate & Academics",
      tone: "leaf",
      awards: [
        {
          name: "Academic All American",
          href: "[link]",
          issuer: "National Speech & Debate Association",
          year: "[year]",
          context: "Top 1% of debaters",
        },
        { name: "AP Scholar with Distinction", issuer: "College Board", year: "[year]" },
        { name: "National Recognition Program", issuer: "College Board", year: "[year]" },
        {
          name: "Summer Reading Contest, Honorable Mention",
          href: "[link]",
          issuer: "The New York Times",
          year: "[year]",
          context: "Of 8,000+ entries",
        },
      ],
    },
    {
      name: "Just for Fun",
      tone: "butter",
      awards: [
        { name: "[Award name]", href: "[link]", issuer: "[Issuer]", year: "[year]" },
        { name: "[Award name]", href: "[link]", issuer: "[Issuer]", year: "[year]" },
      ],
    },
  ] as AwardCategory[],
};

/* ---------- Press ---------- */

// Leave the list empty to hide the Press section and its nav icon.
export const press = {
  kicker: "in the news",
  title: "Press",
  items: [
    {
      outlet: "KPRC 2 Houston (NBC)",
      kind: "TV",
      headline:
        "2 Helps You: 17-year-old Sugar Land teen making a positive impact by recycling food from local grocery stores",
      href: "https://www.click2houston.com/news/local/2026/08/29/2-helps-you-17-year-old-sugar-land-teen-making-a-positive-impact-by-recycling-food-from-local-grocery-stores/",
      date: "Aug 2026",
    },
    {
      outlet: "Simple Acts, Big Impact",
      kind: "Podcast",
      headline: "[Episode title]",
      href: "[link]",
      date: "[date]",
    },
  ] as PressItem[],
};

/* ---------- Footer ---------- */

export const footer = {
  kicker: "let's connect",
  line: "Questions about RescueLog, Waste2Taste, or Still Good? Say hi.",
};
