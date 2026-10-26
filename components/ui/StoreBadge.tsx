/* eslint-disable @next/next/no-img-element */
import type { LinkChip } from "@/data/content";
import { isLink } from "@/lib/text";

// Official badge artwork, served by Apple and Google. Their guidelines ask that it not be redrawn.
const badges = {
  "app-store": {
    src: "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg",
    alt: "Download on the App Store",
    width: 120,
    height: 40,
    className: "h-10 w-auto",
  },
  "google-play": {
    // This PNG has built-in padding; the negative margin trims it so both badges line up.
    src: "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png",
    alt: "Get it on Google Play",
    width: 153,
    height: 59,
    className: "-m-[9.5px] h-[59px] w-auto",
  },
};

// Renders nothing without a real store URL.
export default function StoreBadge({ href, badge }: LinkChip) {
  if (!badge || !isLink(href)) return null;
  const b = badges[badge];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex rounded-[9px] transition-transform hover:-translate-y-0.5"
    >
      <img src={b.src} alt={b.alt} width={b.width} height={b.height} loading="lazy" decoding="async" className={b.className} />
    </a>
  );
}
