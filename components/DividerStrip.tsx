"use client";

import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import Polaroid from "@/components/ui/Polaroid";
import type { ResolvedPhoto } from "@/lib/images";

// A swipeable row of polaroids between sections, like a camera roll. Centered when it fits,
// scrollable sideways when it doesn't. Renders nothing without photos.
export default function DividerStrip({ photos }: { photos: ResolvedPhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);
  if (photos.length === 0) return null;

  return (
    <div className="-my-6 sm:-my-10">
      <ul
        aria-label="Photos"
        className="flex snap-x snap-mandatory justify-center-safe gap-5 overflow-x-auto px-5 pt-6 pb-10 [scrollbar-width:none] sm:gap-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, i) => (
          <li key={photo.file} className="w-36 shrink-0 snap-center sm:w-44">
            <Polaroid
              photo={photo}
              onOpen={() => setIndex(i)}
              sizes="176px"
              tape={i % 3 === 0}
              className={`relative ${i % 2 ? "rotate-2" : "-rotate-2"}`}
            />
          </li>
        ))}
      </ul>

      {index !== null && (
        <Lightbox photos={photos} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
      )}
    </div>
  );
}
