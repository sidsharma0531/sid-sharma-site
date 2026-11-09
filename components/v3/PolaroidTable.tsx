"use client";

import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import Photo from "@/components/ui/Photo";
import type { ResolvedPhoto } from "@/lib/images";

// Where each polaroid sits: left and top as % of the panel, width as % of its width, tilt, and
// stacking order. Four across the top and three across the bottom, in the homepage table's order,
// with the second slot sized for one wide photo. The rows never overlap, so no caption is covered.
const spots = [
  { x: 1, y: 3, w: 26, r: -5, z: 6, tape: true },
  { x: 4, y: 53, w: 39, r: 2, z: 3, tape: true },
  { x: 25, y: 1.5, w: 25, r: 4, z: 7 },
  { x: 45, y: 51, w: 25, r: -4, z: 2 },
  { x: 49, y: 4, w: 25, r: -3, z: 5, tape: true },
  { x: 70.5, y: 52, w: 26, r: 4, z: 1 },
  { x: 73, y: 2, w: 26, r: -4, z: 4, tape: true },
];

// The homepage's polaroid table, scaled into a V3 card's picture panel. Captions show once the
// panel is wide enough to read them (the lightbox always shows them). Click one to see them all large.
export default function PolaroidTable({ photos }: { photos: ResolvedPhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const shown = photos.slice(0, spots.length);

  return (
    <>
      <ul className="absolute inset-0">
        {shown.map((photo, i) => {
          const spot = spots[i];
          const wide = Boolean(photo.wide);
          // A square photo never takes more than a square slot's width.
          const width = wide ? spot.w : Math.min(spot.w, 26);
          return (
            <li
              key={photo.file}
              style={
                { "--x": `${spot.x}%`, "--y": `${spot.y}%`, "--w": `${width}%`, "--r": `${spot.r}deg`, "--z": spot.z } as React.CSSProperties
              }
              className="absolute top-(--y) left-(--x) z-(--z) w-(--w) rotate-(--r) transition-[rotate,scale] duration-300 hover:z-30 hover:scale-[1.05] hover:rotate-0"
            >
              {spot.tape && (
                <span
                  aria-hidden
                  className="absolute -top-[1.4cqw] left-1/2 z-10 h-[4cqw] w-[42%] -translate-x-1/2 -rotate-3 bg-butter/80 shadow-sm [clip-path:polygon(3%_0,97%_8%,100%_50%,96%_92%,4%_100%,0_50%)]"
                />
              )}
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="block w-full cursor-zoom-in bg-paper p-[6%] pb-0 text-left shadow-[0_10px_18px_-10px_rgba(34,28,24,0.55)] ring-1 ring-ink/10"
              >
                <Photo
                  photo={photo}
                  alt={photo.alt}
                  ratio={wide ? photo.width / photo.height : 1}
                  position={photo.focus}
                  sizes="(min-width: 640px) 180px, 120px"
                />
                <span className="flex h-[8.5cqw] items-center justify-center text-center font-hand text-[3.1cqw] leading-[1.05] text-ink/80">
                  <span className="hidden @[24rem]:inline">{photo.caption}</span>
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
