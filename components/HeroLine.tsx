import Image from "next/image";
import PhotoButton from "@/components/ui/PhotoButton";
import { hero, type Tone } from "@/data/content";
import { resolvePhotos, type ResolvedPhoto } from "@/lib/images";

const squiggleColor: Record<Tone, string> = {
  tomato: "text-tomato",
  leaf: "text-leaf",
  butter: "text-butter",
};

const tilts = ["-rotate-3", "rotate-2", "-rotate-2"];

// The hero line. Each phrase in hero.linePhotos gets a squiggle and opens its photo in the
// lightbox; with a mouse, hovering it (or focusing it from the keyboard) pops up a small tilted
// polaroid of the photo. A phrase whose file is missing stays plain text.
export default function HeroLine() {
  const parts: React.ReactNode[] = [];
  let rest = hero.line;
  hero.linePhotos.forEach(({ phrase, tone, photo }, i) => {
    const at = rest.indexOf(phrase);
    const [found] = resolvePhotos([photo], { onlyExisting: true });
    if (at === -1 || !found) return;
    parts.push(
      rest.slice(0, at),
      <PhotoButton
        key={phrase}
        photo={found}
        label={`Open photo: ${phrase}`}
        className="group relative rounded-sm transition-colors hover:text-ink"
      >
        {phrase}
        <Squiggle className={squiggleColor[tone]} />
        <Peek photo={found} tilt={tilts[i % tilts.length]} />
      </PhotoButton>,
    );
    rest = rest.slice(at + phrase.length);
  });
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

// The small polaroid above the phrase. Only devices with a mouse show it; it never takes clicks.
function Peek({ photo, tilt }: { photo: ResolvedPhoto; tilt: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden w-32 -translate-x-1/2 pointer-fine:block"
    >
      <span
        className={`block origin-bottom scale-90 bg-white p-1.5 pb-5 opacity-0 shadow-[0_18px_30px_-14px_rgba(34,28,24,0.55)] ring-1 ring-ink/10 transition-[opacity,scale] duration-200 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 motion-reduce:scale-100 motion-reduce:transition-none ${tilt}`}
      >
        <span className="relative block aspect-square overflow-hidden bg-ink/[0.06]">
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="116px"
            className="object-cover"
            style={photo.focus ? { objectPosition: photo.focus } : undefined}
          />
        </span>
      </span>
    </span>
  );
}
