// All site copy and links live here.
// Anything written as "[like this]" shows up on the page as a highlighted placeholder.
// Replace it with the real value and the highlight goes away on its own.

export type Link = { label: string; href: string };
export type Stat = { value: string; label: string };

export type Project = {
  id: string;
  kicker: string;
  title: string;
  subtitle?: string;
  description: string;
  stats?: Stat[];
  usedBy?: string;
  links: Link[];
  image: {
    file: string;
    alt: string;
    kind: "phone" | "photo" | "book";
  };
};

export const hero = {
  name: "Sid Sharma",
  line: "Student founder in Houston, building ways to keep good food out of the trash.",
  facts: ["App live on iOS & Android", "Nonprofit in 3 cities", "Published author"],
  portrait: { file: "photo-hero.jpg", alt: "Portrait of Sid Sharma" },
};

export const projects: Project[] = [
  {
    id: "rescuelog",
    kicker: "App",
    title: "RescueLog",
    description: "An AI-powered food logging app for food-rescue organizations.",
    stats: [
      { value: "[X]", label: "organizations" },
      { value: "[X]", label: "lbs logged" },
    ],
    usedBy: "[partner orgs]",
    links: [
      { label: "App Store", href: "[link]" },
      { label: "Google Play", href: "[link]" },
    ],
    image: { file: "rescuelog.png", alt: "RescueLog app screenshot", kind: "phone" },
  },
  {
    id: "waste2taste",
    kicker: "Nonprofit",
    title: "Waste2Taste",
    description:
      "A 501(c)(3) youth nonprofit rescuing food, with chapters in Houston, Baltimore, and the San Francisco Bay Area.",
    stats: [
      { value: "[X]", label: "volunteers" },
      { value: "[X]", label: "lbs rescued" },
    ],
    links: [
      { label: "Website", href: "[link]" },
      { label: "Instagram", href: "[link]" },
    ],
    image: { file: "waste2taste.jpg", alt: "Waste2Taste volunteers at a food rescue", kind: "photo" },
  },
  {
    id: "still-good",
    kicker: "Book",
    title: "Still Good",
    subtitle: "A Cookbook for Forgotten Food",
    description: "A self-published cookbook on turning food people throw away into real meals.",
    links: [{ label: "Get the book", href: "[link]" }],
    image: { file: "still-good-cover.jpg", alt: "Cover of Still Good: A Cookbook for Forgotten Food", kind: "book" },
  },
];

// Gallery photos, in order. No captions are shown; alt text is for screen readers.
export const gallery = Array.from({ length: 10 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { file: `photo-${n}.jpg`, alt: `Waste2Taste food rescue, photo ${i + 1} of 10` };
});

export const more = [
  { title: "Lincoln-Douglas Debate", detail: "Team Captain" },
  { title: "DECA", detail: "Competitor" },
  {
    title: "University of Houston",
    detail: "Research Assistant, translating a CBO economic model from EViews to Python",
  },
  { title: "RE/MAX Commercial Real Estate", detail: "Intern" },
  { title: "Research Club", detail: "Program Director" },
];

export const contact = {
  email: "[email]",
  linkedin: "[link]",
};

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Photos", href: "#photos" },
  { label: "More", href: "#more" },
  { label: "Contact", href: "#contact" },
];

export function isPlaceholder(value: string) {
  return /^\[.+\]$/.test(value.trim());
}
