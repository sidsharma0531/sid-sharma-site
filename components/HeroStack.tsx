"use client";

import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import Polaroid from "@/components/ui/Polaroid";
import type { ResolvedPhoto } from "@/lib/images";

// Up to two polaroids peek out from behind the top one. On phones they fan right and down,
// staying inside the page; on wider screens the first fans into the gap beside the name.
const behind = [
  "absolute inset-x-0 top-0 translate-x-[10%] -translate-y-[3%] rotate-[7deg] md:-translate-x-[12%] md:-translate-y-[2%] md:-rotate-[7deg]",
  "absolute inset-x-0 top-0 translate-x-[3%] translate-y-[5%] -rotate-[4deg] md:translate-x-[3%] md:translate-y-[6%] md:rotate-[5deg]",
];

// The hero's stack of 1 to 3 polaroids. The first photo in the list sits on top.
export default function HeroStack({ photos }: { photos: ResolvedPhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const stack = photos.slice(0, 3);
  if (stack.length === 0) return null;
  const [top, ...rest] = stack;

  return (
    <>
      <div className="relative w-[58%] max-w-[15rem] md:w-full md:max-w-none">
        {rest.map((photo, i) => (
          <Polaroid
            key={photo.file}
            photo={photo}
            ratio={4 / 5}
            onOpen={() => setIndex(i + 1)}
            sizes="(min-width: 768px) 296px, 58vw"
            className={behind[i]}
          />
        ))}
        <Polaroid
          photo={top}
          ratio={4 / 5}
          tape
          preload
          onOpen={() => setIndex(0)}
          sizes="(min-width: 768px) 296px, 58vw"
          className="relative -rotate-2 md:rotate-2"
        />
      </div>

      {index !== null && (
        <Lightbox photos={stack} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
      )}
    </>
  );
}
