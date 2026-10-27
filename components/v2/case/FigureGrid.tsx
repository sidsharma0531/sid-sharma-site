"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import type { ResolvedPhoto } from "@/lib/images";

const grids = {
  pair: "grid-cols-1 sm:grid-cols-2 max-w-3xl",
  row: "grid-cols-2 sm:grid-cols-3",
  phones: "grid-cols-2 max-w-md",
  step: "grid-cols-2",
};

// A step's photos sit in one row, however many there are.
const stepColumns = ["grid-cols-1", "grid-cols-1", "grid-cols-2", "grid-cols-3"];

// Captioned photos that open in the shared lightbox. "step" crops to a tidy 4:3 so a row of
// mixed photos lines up; the others keep each photo's own shape.
export default function FigureGrid({ photos, layout = "pair" }: { photos: ResolvedPhoto[]; layout?: keyof typeof grids }) {
  const [open, setOpen] = useState<number | null>(null);
  const crop = layout === "step";

  return (
    <>
      <ul className={`grid gap-3 sm:gap-4 ${crop ? stepColumns[Math.min(photos.length, 3)] : grids[layout]}`}>
        {photos.map((photo, i) => (
          <li key={photo.file}>
            <figure>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open photo: ${photo.caption ?? photo.alt}`}
                className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-xl bg-ink/[0.06] ring-1 ring-ink/10 ${crop ? "aspect-[4/3]" : ""}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes={layout === "phones" ? "220px" : "(min-width: 768px) 30vw, 46vw"}
                  className={`w-full transition-transform duration-500 group-hover:scale-[1.02] ${crop ? "h-full object-cover" : "h-auto"}`}
                />
              </button>
              {photo.caption && (
                <figcaption className={`mt-2 leading-snug text-ink/60 ${crop ? "text-xs" : "text-sm"}`}>{photo.caption}</figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>
      {open !== null && <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}
