import Photo from "@/components/ui/Photo";
import type { ResolvedPhoto } from "@/lib/images";

type Props = {
  photo: ResolvedPhoto;
  onOpen: () => void;
  sizes: string;
  /** Ratio of the photo area. Square by default, like an instant photo. */
  ratio?: number;
  tape?: boolean;
  preload?: boolean;
  /** Positioning and tilt for the outer wrapper, like "relative -rotate-2". */
  className?: string;
};

// One polaroid: white frame, photo, and a handwritten caption strip. Clicking opens the lightbox.
export default function Polaroid({ photo, onOpen, sizes, ratio = 1, tape, preload, className = "relative" }: Props) {
  return (
    <div className={className}>
      {tape && (
        <span
          aria-hidden
          className="absolute -top-2.5 left-1/2 z-10 h-6 w-[40%] -translate-x-1/2 -rotate-3 bg-butter/80 shadow-sm [clip-path:polygon(3%_0,97%_8%,100%_50%,96%_92%,4%_100%,0_50%)]"
        />
      )}
      <button
        type="button"
        onClick={onOpen}
        className="@container block w-full cursor-zoom-in bg-paper p-[6%] pb-0 text-left shadow-[0_16px_30px_-16px_rgba(34,28,24,0.6)] ring-1 ring-ink/10"
      >
        <Photo photo={photo} alt={photo.alt} ratio={ratio} sizes={sizes} preload={preload} position={photo.focus} />
        <span className="flex min-h-[2.2em] items-center justify-center py-[0.3em] text-center font-hand text-[clamp(12px,9cqw,22px)] leading-tight text-ink/80">
          {photo.caption}
        </span>
      </button>
    </div>
  );
}
