"use client";

import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import Photo from "@/components/ui/Photo";
import type { ResolvedPhoto } from "@/lib/images";

// Where each polaroid sits on wider screens: left and top as % of the table, width as %, tilt,
// and stacking order. Higher-up polaroids sit on top, so overlaps cover photo corners, never captions.
// On phones they fall into two staggered columns instead.
const spots = [
  { x: 1, y: 4, w: 23, r: -6, z: 4, tape: true },
  { x: 17, y: 43, w: 22, r: 4, z: 1 },
  { x: 33, y: 1, w: 24, r: -2, z: 6, tape: true },
  { x: 51, y: 46, w: 21, r: 5, z: 2 },
  { x: 64, y: 5, w: 22, r: -4, z: 5 },
  { x: 77, y: 40, w: 22, r: 3, z: 3, tape: true },
  { x: 31, y: 58, w: 18, r: -7, z: 7 },
];

// The scrapbook moment: 5 to 7 polaroids scattered on a picnic tablecloth. Click to enlarge.
export default function Polaroids({ photos }: { photos: ResolvedPhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const shown = photos.slice(0, spots.length);

  return (
    <>
      <ul className="gingham relative grid grid-cols-2 gap-x-3 gap-y-5 rounded-[1.5rem] border border-ink/10 px-3 pt-6 pb-12 sm:gap-x-5 sm:px-6 md:block md:aspect-[1.75/1] md:p-0">
        {shown.map((photo, i) => {
          const spot = spots[i];
          return (
            <li
              key={photo.file}
              style={
                { "--x": `${spot.x}%`, "--y": `${spot.y}%`, "--w": `${spot.w}%`, "--r": `${spot.r}deg`, "--z": spot.z } as React.CSSProperties
              }
              className={`relative rotate-(--r) transition-[rotate,scale] duration-300 hover:z-30 hover:scale-[1.04] hover:rotate-0 md:absolute md:top-(--y) md:left-(--x) md:z-(--z) md:w-(--w) md:translate-y-0 md:hover:z-30 ${
                i % 2 ? "translate-y-6" : ""
              }`}
            >
              {spot.tape && (
                <span
                  aria-hidden
                  className="absolute -top-2.5 left-1/2 z-10 h-6 w-[40%] -translate-x-1/2 -rotate-3 bg-butter/80 shadow-sm [clip-path:polygon(3%_0,97%_8%,100%_50%,96%_92%,4%_100%,0_50%)]"
                />
              )}
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="@container block w-full cursor-zoom-in bg-paper p-[6%] pb-0 text-left shadow-[0_16px_30px_-16px_rgba(34,28,24,0.6)] ring-1 ring-ink/10"
              >
                <Photo
                  photo={photo}
                  alt={photo.alt}
                  ratio={1}
                  hint="square crop"
                  sizes="(min-width: 768px) 24vw, 46vw"
                />
                <span className="flex min-h-[2.4em] items-center justify-center py-[0.3em] text-center font-hand text-[clamp(15px,9.5cqw,23px)] leading-tight text-ink/80">
                  {photo.caption}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {index !== null && (
        <Lightbox photos={shown} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
      )}
    </>
  );
}
