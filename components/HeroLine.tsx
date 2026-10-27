import PhotoButton from "@/components/ui/PhotoButton";
import { hero, type Tone } from "@/data/content";
import { resolvePhotos } from "@/lib/images";

const squiggleColor: Record<Tone, string> = {
  tomato: "text-tomato",
  leaf: "text-leaf",
  butter: "text-butter",
};

// The hero line. Each phrase in hero.linePhotos gets a squiggle and opens its photo in the
// lightbox when clicked; nothing pops up on hover. A phrase whose file is missing stays plain text.
export default function HeroLine() {
  const parts: React.ReactNode[] = [];
  let rest = hero.line;
  for (const { phrase, tone, photo } of hero.linePhotos) {
    const at = rest.indexOf(phrase);
    const [found] = resolvePhotos([photo], { onlyExisting: true });
    if (at === -1 || !found) continue;
    parts.push(
      rest.slice(0, at),
      <PhotoButton
        key={phrase}
        photo={found}
        label={`Open photo: ${phrase}`}
        className="relative rounded-sm transition-colors hover:text-ink"
      >
        {phrase}
        <Squiggle className={squiggleColor[tone]} />
      </PhotoButton>,
    );
    rest = rest.slice(at + phrase.length);
  }
  parts.push(rest);
  return <>{parts}</>;
}

// A loose hand-drawn wave, stretched to the phrase. The stroke keeps its width when stretched.
function Squiggle({ className }: { className: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 -bottom-[0.08em] h-[0.34em] w-full overflow-visible ${className}`}
    >
      <path
        d="M1 4.6C5 1.6 8.5 1.8 12 4.3S18.5 7.4 23 4.7 30.5 1.4 35 4.1 42.5 7.6 47 4.9 54.5 1.6 59 4.2 66.5 7.3 71 4.6 78.5 1.8 83 4.4 90.5 6.9 94 4.1 97.6 2.6 99 3.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
