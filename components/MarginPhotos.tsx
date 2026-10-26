"use client";

import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import Polaroid from "@/components/ui/Polaroid";
import type { ResolvedPhoto } from "@/lib/images";

type Props = {
  photos: ResolvedPhoto[];
  side: "left" | "right";
  /**
   * "float": absolutely placed in the page margin beside its (positioned) parent, on screens
   * 1280px and wider. "inline": a small strip inside the entry, on narrower screens.
   */
  variant: "float" | "inline";
};

// Polaroids that sit beside the thing they show. Render both variants for the same photos:
// only one is visible at a time.
export default function MarginPhotos({ photos, side, variant }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  if (photos.length === 0) return null;

  // Tilt away from the text, alternating if there are several.
  const tilt = (i: number) => ((i + (side === "left" ? 0 : 1)) % 2 ? "rotate-3" : "-rotate-3");

  return (
    <>
      {variant === "float" ? (
        <div
          className={`absolute top-10 hidden w-28 flex-col gap-6 xl:flex 2xl:w-32 ${
            side === "left" ? "right-full mr-7" : "left-full ml-7"
          }`}
        >
          {photos.map((photo, i) => (
            <Polaroid
              key={photo.file}
              photo={photo}
              onOpen={() => setIndex(i)}
              sizes="128px"
              tape={i === 0}
              className={`relative ${tilt(i)}`}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-wrap gap-4 xl:hidden">
          {photos.map((photo, i) => (
            <Polaroid
              key={photo.file}
              photo={photo}
              onOpen={() => setIndex(i)}
              sizes="112px"
              className={`relative w-24 sm:w-28 ${tilt(i)}`}
            />
          ))}
        </div>
      )}

      {index !== null && (
        <Lightbox photos={photos} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
      )}
    </>
  );
}
