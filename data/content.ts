// Everything the site says lives in this file. Components only render what is here.
//
// Inside any text, **like this** makes it bold (use it for numbers).
//
// Every optional field hides itself when left out: dates, years, links, stats, badges, and
// contact buttons simply don't render. Never fill a field with a guess.
//
// Images: photos go in /public/photos, logos in /public/logos. Write just the file name.
// A missing photo or logo never leaves a blank slot.
//
// Sources: the Common App activity list, waste-2-taste.org, the RescueLog store listings,
// and each organization's own site or Wikimedia Commons for logos.

/* ---------- Types ---------- */

export type Tone = "tomato" | "butter" | "leaf";
export type DoodleName = "carrot" | "tomato" | "bread" | "whisk";

/**
 * wide: show the whole photo as a wide polaroid instead of a square crop (for group shots).
 * focus: which part to keep when the photo is cropped, like "20% 50%" for the left side.
 */
export type Photo = { src: string; alt: string; caption?: string; wide?: boolean; focus?: string };

/** A link button. Set badge to show the official App Store or Google Play badge instead. */
export type LinkChip = { label: string; href: string; badge?: "app-store" | "google-play" };

export type Stat = { value: string; unit?: string; label: string };

/**
 * Square tile beside an entry: the logo file if it exists, otherwise the doodle or initials.
 * Logos sit on white with a little padding; set fit to "cover" for square app icons.
 */
export type Mark = { logo?: string; fit?: "cover"; doodle?: DoodleName; initials?: string; tone: Tone };

/** An organization shown as a logo, with its name as the fallback. */
export type Logo = { name: string; href?: string; logo?: string };

export type Entry = {
  id: string;
  role: string;
  org?: string;
  orgHref?: string;
  type?: string;
  dates?: string;
  location?: string;
  mark: Mark;
  summary: string;
  bullets?: string[];
  links?: LinkChip[];
  /** Optional thumbnails. Only photos whose files exist are shown. */
  photos?: Photo[];
  /** Optional row of small organization logos. */
  logos?: Logo[];
};

export type FeaturedEntry = Entry & {
  org: string;
  stats?: Stat[];
  visual:
    | { kind: "phone"; screens: Photo[] }
    | { kind: "polaroids"; photos: Photo[] }
    | {
        kind: "book";
        cover: Photo;
        title: string;
        subtitle: string;
        author: string;
        /** One inside page, shown slipping out from behind the cover as a preview. Opens in the lightbox. */
        preview?: Photo;
      };
};

export type Award = {
  /** Used to attach photos to this award on /v2. */
  id: string;
  name: string;
  /** Link to a page that names Sid, Waste2Taste, RescueLog, or Still Good. */
  href?: string;
  issuer: string;
  year?: string;
  /** One line of context, like "Of 8,000+ entries". */
  context?: string;
  /** Issuer logo in /public/logos. Without one, the issuer's initials show. */
  logo?: string;
  photos?: Photo[];
};

export type AwardCategory = { name: string; tone: Tone; awards: Award[] };

export type PressItem = {
  outlet: string;
  /** "TV", "Podcast", "Article", and so on. */
  kind: string;
  headline: string;
  href?: string;
  date?: string;
  /** Outlet logo in /public/logos. Set logoFit to "cover" for square show art that fills the tile. */
  logo?: string;
  logoFit?: "cover";
  thumbnail?: Photo;
};

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
  email: "sidsharma2027@gmail.com",
  linkedin: "https://www.linkedin.com/in/sid-sharma-8192a0264/",
  // Add a link here to show an Instagram button next to LinkedIn.
  instagram: undefined as string | undefined,
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
  // Not shown on the page; only the link-preview image (app/opengraph-image.tsx) uses these.
  stats: [
    { value: "2M", unit: "lbs/yr", label: "tracked through RescueLog" },
    { value: "12", unit: "branches", label: "of Waste2Taste, across 7 states + UAE" },
    { value: "30+", unit: "partners", label: "Waste2Taste grocers and community orgs" },
  ] as Stat[],
};

/* ---------- Logo wall ---------- */

const W2T_PARTNERS = "https://waste-2-taste.org/partners.html";

// Real working relationships, press, and the organizations behind your awards, mixed so no two
// of a kind sit together. A logo links when there's a page that proves the connection.
export const logoWall = {
  label: "worked with & featured by",
  logos: [
    {
      name: "KPRC 2 Houston",
      href: "https://www.click2houston.com/news/local/2026/08/29/2-helps-you-17-year-old-sugar-land-teen-making-a-positive-impact-by-recycling-food-from-local-grocery-stores/",
      logo: "kprc2.svg",
    },
    { name: "Trader Joe's", href: W2T_PARTNERS, logo: "trader-joes.png" },
    { name: "The New York Times", logo: "nyt-wordmark.svg" },
    { name: "Whole Foods Market", href: W2T_PARTNERS, logo: "whole-foods.png" },
    { name: "Points of Light", logo: "points-of-light.svg" },
    { name: "H-E-B", href: W2T_PARTNERS, logo: "heb.png" },
    {
      name: "Simple Acts, Big Impact",
      href: "https://podcasts.apple.com/us/podcast/food-waste-to-food-recovery-sids-waste2taste-story/id1641520893?i=1000790005401",
      logo: "simple-acts-big-impact.jpg",
    },
    { name: "Anthem Awards", logo: "anthem-awards.svg" },
    { name: "University of Houston", href: "https://www.uh.edu", logo: "uh.svg" },
    { name: "National Speech & Debate Association", logo: "nsda.png" },
    { name: "RE/MAX Commercial", href: "https://www.remaxcommercial.com", logo: "remax-commercial.png" },
    {
      name: "Literary Titan",
      href: "https://literarytitan.com/2026/08/23/still-good-a-cookbook-for-forgotten-food/",
      logo: "literary-titan.png",
    },
    { name: "Fort Bend Family Promise", href: W2T_PARTNERS, logo: "fort-bend-family-promise.jpg" },
    { name: "Disha USA", logo: "disha-usa.png" },
    { name: "National Food Recovery Association", href: "https://www.nationalfoodrecoveryassociation.org/", logo: "nfra.jpg" },
  ] as Logo[],
};

/* ---------- Experience ---------- */

export const experience = {
  kicker: "what I've built",
  title: "Experience",

  featured: [
    {
      id: "rescuelog",
      role: "Founder & Developer",
      org: "RescueLog",
      orgHref: "https://rescuelog-mu.vercel.app/",
      type: "App",
      mark: { logo: "rescuelog.png", fit: "cover", doodle: "carrot", tone: "leaf" },
      summary:
        "AI food logging for nonprofits, live on iOS and Android: food banks snap photos and AI estimates the amount of food, replacing manual estimates.",
      stats: [
        { value: "2M", unit: "lbs/yr", label: "of food tracked" },
        { value: "1.7M", unit: "meals", label: "about, each year" },
        { value: "3", unit: "states", label: "where food is tracked" },
      ],
      bullets: ["Generates reports that help orgs cut food waste and win grants", "Partnered with multiple nonprofits"],
      links: [
        { label: "App Store", href: "https://apps.apple.com/us/app/rescuelog/id6770613024", badge: "app-store" },
        { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.rescuelog.app", badge: "google-play" },
      ],
      // Screens cropped from the App Store listing's screenshots.
      visual: {
        kind: "phone",
        screens: [
          { src: "rescuelog.png", alt: "RescueLog screen for logging a pop-up: take a photo of the food and submit" },
          { src: "rescuelog-2.png", alt: "RescueLog home screen with a new pop-up log button and recent logs" },
        ],
      },
    },
    {
      id: "waste2taste",
      role: "Founder & President",
      org: "Waste2Taste",
      orgHref: "https://waste-2-taste.org",
      type: "501(c)(3) nonprofit",
      location: "12 branches across 7 states and the UAE",
      mark: { logo: "waste2taste.png", fit: "cover", doodle: "tomato", tone: "tomato" },
      summary:
        "Recovers near-expired food from local grocers and cooks it into meals that safely repurpose it, distributed to people experiencing homelessness.",
      stats: [
        { value: "5,100+", unit: "lbs", label: "of food rescued" },
        { value: "12", unit: "branches", label: "across 7 states and the UAE" },
        { value: "30+", unit: "partners", label: "grocers and community orgs" },
      ],
      bullets: [
        "Partners include Whole Foods, Trader Joe's, and ethnic grocers",
        "Member of the National Food Recovery Association",
      ],
      links: [
        { label: "Website", href: "https://waste-2-taste.org" },
        { label: "Instagram", href: "https://instagram.com/waste2taste.usa" },
        { label: "Partners", href: W2T_PARTNERS },
      ],
      // 5 to 7 photos. The caption is handwritten under each polaroid. Photos are cropped
      // square unless marked wide; the second slot is sized for one wide photo.
      visual: {
        kind: "polaroids",
        photos: [
          {
            src: "photo-01.jpg",
            alt: "Sid Sharma and a Trader Joe's crew member holding two bags tagged as Waste2Taste donations",
            caption: "at Trader Joe's",
          },
          {
            src: "photo-07.jpg",
            alt: "Sid Sharma and a volunteer taking a Whole Foods bag from a Whole Foods team member in the store",
            caption: "pickup at Whole Foods",
            wide: true,
          },
          {
            src: "photo-02.jpg",
            alt: "Twelve loaf pans of banana bread batter lined up on a kitchen counter",
            caption: "ready to bake",
          },
          {
            src: "photo-03.jpg",
            alt: "Loaf pans of banana bread baking in an oven",
            caption: "into the oven",
          },
          // Fort Bend sits between the two food-only photos in the top row.
          {
            src: "photo-06.jpg",
            alt: "Sid Sharma and a volunteer holding Whole Foods bags of rescued groceries in the Fort Bend Family Promise pantry",
            caption: "at Fort Bend Family Promise",
          },
          {
            src: "photo-05.jpg",
            alt: "Sid Sharma and two volunteers holding labeled Waste2Taste banana bread loaves in a community center lobby",
            caption: "banana bread, delivered",
          },
          {
            src: "photo-04.jpg",
            alt: "Four foil pans of Waste2Taste banana bread with ingredient labels packed in a car trunk",
            caption: "packed to donate",
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
      mark: { doodle: "bread", tone: "butter" },
      summary: "Recipes that use expiring food, built from my mom's homemade Indian recipes and my Waste2Taste work.",
      stats: [
        { value: "#1", unit: "new release", label: "in Indian Cookbooks on Amazon" },
        { value: "Best", unit: "seller", label: "in Indian Cookbooks on Amazon" },
      ],
      bullets: ["Won the **Literary Titan Silver Book Award**", "**79 pages**. Proceeds fund food rescue"],
      links: [
        { label: "Get the book", href: "https://www.amazon.com/dp/B0H6S6H6C7" },
        { label: "About the book", href: "https://waste-2-taste.org/cookbook.html" },
      ],
      visual: {
        kind: "book",
        cover: { src: "still-good-cover.jpg", alt: "Cover of Still Good: A Cookbook for Forgotten Food" },
        title: "Still Good",
        subtitle: "A Cookbook for Forgotten Food",
        author: "Sid Sharma",
        preview: {
          src: "still-good-banana-bread.jpg",
          alt: "Banana bread recipe page from Still Good showing ingredients, steps, and a sliced loaf",
          caption: "banana bread, page 10",
        },
      },
    },
  ] as FeaturedEntry[],

  moreLabel: "and a few more",

  more: [
    {
      id: "uh-research",
      role: "Quantitative Research Assistant",
      org: "University of Houston",
      orgHref: "https://www.uh.edu",
      type: "Department of Economics",
      mark: { logo: "uh.svg", initials: "UH", tone: "tomato" },
      summary:
        "Under Professor Vollrath, translated the Congressional Budget Office's potential-GDP model from EViews to Python, built a custom forecasting framework, and published the model online with explanations for use in UH undergraduate courses.",
    },
    {
      id: "remax",
      role: "Summer Intern",
      org: "RE/MAX Commercial Real Estate",
      orgHref: "https://www.remaxcommercial.com",
      type: "Internship",
      mark: { logo: "remax-commercial.png", initials: "RE", tone: "butter" },
      summary: "Sourced commercial properties, cold-called sellers, and ran market reports.",
      bullets: [
        "Worked on software for securely taking notes in internal meetings",
        "Completed real estate license coursework",
      ],
    },
    {
      id: "debate",
      role: "LD Captain (grades 11 to 12) and Policy Team Manager (grade 12)",
      org: "Elkins Speech & Debate",
      type: "Debate",
      mark: { logo: "nsda-mark.png", initials: "LD", tone: "leaf" },
      summary: "National Lincoln-Douglas competitor.",
      bullets: [
        "District Champion and **2x** State Qualifier",
        "NSDA Student of Premier Distinction",
        "Attended the **3-week** NSD summer camp",
        "Coached **15** novices to place at tournaments",
        "Ran the yearly school tournament with **400+** attendees",
      ],
    },
    {
      id: "volunteer",
      role: "Volunteer",
      org: "7 Houston hunger-relief orgs",
      type: "Volunteering",
      dates: "4 years",
      mark: { doodle: "tomato", tone: "tomato" },
      summary: "Sort, pack, and distribute food. What I saw here inspired RescueLog.",
      logos: [
        { name: "Second Servings", href: "https://secondservingshouston.org", logo: "second-servings.jpg" },
        { name: "Target Hunger", href: "https://www.targethunger.org", logo: "target-hunger.png" },
        { name: "Second Mile" },
        { name: "Urban Harvest", href: "https://www.urbanharvest.org", logo: "urban-harvest.png" },
        { name: "Kids' Meals", href: "https://kidsmealsinc.org", logo: "kids-meals.png" },
        { name: "WOW Project" },
        { name: "County Care Center" },
      ],
    },
    {
      id: "guitar",
      role: "Guitarist",
      type: "Music",
      dates: "Since age 12",
      mark: { initials: "♪", tone: "leaf" },
      summary:
        "Trained weekly with a teacher in India in traditional music. Performed with groups at **30+** community events, celebrations, and religious gatherings.",
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
          id: "anthem",
          name: "Anthem Award Finalist",
          issuer: "The Anthem Awards",
          year: "2026",
          context: "Young Leader in Humanitarian Action & Services · 2,500+ entries · results Nov 5",
          logo: "anthem.png",
        },
        {
          id: "points-of-light",
          name: "Daily Point of Light Award",
          issuer: "Points of Light",
          year: "2026",
          context: "For service work with Waste2Taste",
          logo: "points-of-light-mark.svg",
        },
        {
          id: "literary-titan",
          name: "Literary Titan Silver Book Award",
          href: "https://literarytitan.com/2026/08/23/still-good-a-cookbook-for-forgotten-food/",
          issuer: "Literary Titan",
          year: "2026",
          context: "For Still Good: A Cookbook for Forgotten Food",
          logo: "literary-titan.png",
        },
        {
          id: "disha-usa",
          name: "Young Achiever Award, Runner-Up",
          issuer: "Disha USA",
          year: "2026",
          context: "Social Impact and Community Service",
          logo: "disha-usa.png",
        },
      ],
    },
    {
      name: "Debate & Academics",
      tone: "leaf",
      awards: [
        {
          id: "nsda-academic-all-american",
          name: "Academic All American",
          issuer: "National Speech & Debate Association",
          year: "2026",
          context: "Top 1% of debaters",
          logo: "nsda-mark.png",
        },
        { id: "ap-scholar", name: "AP Scholar with Distinction", issuer: "College Board", year: "2026", logo: "college-board-mark.svg" },
        { id: "national-recognition", name: "National Recognition Program", issuer: "College Board", year: "2026", logo: "college-board-mark.svg" },
        {
          id: "nyt-summer-reading",
          name: "Summer Reading Contest, Honorable Mention",
          issuer: "The New York Times",
          year: "2026",
          context: "Of 8,000+ entries",
          logo: "nyt.svg",
        },
      ],
    },
    {
      name: "Business & Finance",
      tone: "butter",
      awards: [
        {
          id: "deca-international",
          name: "International Qualifier",
          issuer: "DECA",
          context: "Personal Financial Literacy",
          logo: "deca-mark.svg",
        },
        { id: "deca-state", name: "2x State Qualifier", issuer: "DECA", logo: "deca-mark.svg" },
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
      logo: "kprc2.svg",
    },
    {
      outlet: "Simple Acts, Big Impact",
      kind: "Podcast",
      headline: "Food Waste to Food Recovery: Sid's Waste2Taste Story",
      href: "https://podcasts.apple.com/us/podcast/food-waste-to-food-recovery-sids-waste2taste-story/id1641520893?i=1000790005401",
      date: "Sep 2026",
      // Show art from Apple Podcasts, cropped above its tagline.
      logo: "simple-acts-big-impact.jpg",
      logoFit: "cover",
    },
  ] as PressItem[],
};

/* ---------- Footer ---------- */

export const footer = {
  kicker: "let's connect",
  line: "Want to reach out? Say hi.",
};
