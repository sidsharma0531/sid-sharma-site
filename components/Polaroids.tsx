"use client";

import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import Photo from "@/components/ui/Photo";
import type { ResolvedPhoto } from "@/lib/images";

// Where each polaroid sits on wider screens: left and top as % of the table, width as %, tilt,
// and stacking order. Higher-up polaroids sit on top, so overlaps only ever cover the edge of
// a lower polaroid, never a caption.
// On phones they fall into two columns; "drop" nudges the right-hand ones down a little,
// and a wide photo spans both columns.

// All square photos: two staggered rows.
const squareSpots = [
  { x: 1, y: 4, w: 23, r: -6, z: 4, tape: true },
  { x: 17, y: 43, w: 22, r: 4, z: 1, drop: true },
  { x: 33, y: 1, w: 24, r: -2, z: 6, tape: true },
  { x: 51, y: 46, w: 21, r: 5, z: 2, drop: true },
  { x: 64, y: 5, w: 22, r: -4, z: 5 },
  { x: 77, y: 40, w: 22, r: 3, z: 3, tape: true, drop: true },
  { x: 31, y: 58, w: 18, r: -7, z: 7 },
];

// One wide photo in the second slot: four across the top, three across the bottom.
const wideSpots = [
  { x: 0, y: 3, w: 22, r: -5, z: 6, tape: true },
  { x: 9, y: 47, w: 33, r: 2, z: 3, tape: true },
  { x: 25, y: 1, w: 21, r: 4, z: 7, drop: true },
  { x: 46, y: 46, w: 21, r: -4, z: 2 },
  { x: 50, y: 4, w: 21, r: -3, z: 5, tape: true, drop: true },
  { x: 70, y: 47, w: 22, r: 4, z: 1 },
  { x: 76, y: 2, w: 23, r: -4, z: 4, tape: true, drop: true },
];

// The scrapbook moment: 5 to 7 polaroids scattered on a picnic tablecloth. Click to enlarge.
export default function Polaroids({ photos }: { photos: ResolvedPhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const spots = photos.some((photo) => photo.wide) ? wideSpots : squareSpots;
  const shown = photos.slice(0, spots.length);

  return (
    <>
      <ul className="gingham relative grid grid-flow-row-dense grid-cols-2 gap-x-3 gap-y-5 rounded-[1.5rem] border border-ink/10 px-3 pt-6 pb-12 sm:gap-x-5 sm:px-6 md:block md:aspect-[1.75/1] md:p-0">
        {shown.map((photo, i) => {
          const spot = spots[i];
          const ratio = photo.width / photo.height;
          const wide = Boolean(photo.wide);
          // A square photo never takes more than a square slot's width.
          const width = wide ? spot.w : Math.min(spot.w, 23);
          return (
            <li
              key={photo.file}
              style={
                { "--x": `${spot.x}%`, "--y": `${spot.y}%`, "--w": `${width}%`, "--r": `${spot.r}deg`, "--z": spot.z } as React.CSSProperties
              }
              className={`relative rotate-(--r) transition-[rotate,scale] duration-300 hover:z-30 hover:scale-[1.04] hover:rotate-0 md:absolute md:top-(--y) md:left-(--x) md:z-(--z) md:w-(--w) md:translate-y-0 md:hover:z-30 ${
                wide ? "col-span-2 mx-auto w-[92%] md:mx-0" : spot.drop ? "translate-y-6" : ""
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
                  ratio={wide ? ratio : 1}
                  hint={wide ? "wide photo" : "square crop"}
                  sizes={wide ? "(min-width: 768px) 34vw, 92vw" : "(min-width: 768px) 24vw, 46vw"}
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
