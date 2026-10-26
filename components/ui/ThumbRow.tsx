"use client";

import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import Photo from "@/components/ui/Photo";
import type { ResolvedPhoto } from "@/lib/images";

// Small framed thumbnails that open the lightbox. Renders nothing when there are no photos.
export default function ThumbRow({ photos, className = "" }: { photos: ResolvedPhoto[]; className?: string }) {
  const [index, setIndex] = useState<number | null>(null);
  if (photos.length === 0) return null;

  return (
    <>
      <ul className={`flex flex-wrap gap-3 ${className}`}>
        {photos.map((photo, i) => (
          <li key={photo.file}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className={`group block w-24 cursor-zoom-in rounded-xl bg-paper p-1 shadow-[0_8px_16px_-10px_rgba(34,28,24,0.55)] ring-1 ring-ink/10 transition-transform duration-200 hover:scale-[1.04] sm:w-28 ${
                i % 2 ? "hover:rotate-2" : "hover:-rotate-2"
              }`}
            >
              <Photo photo={photo} alt={photo.alt} ratio={1} sizes="120px" className="rounded-lg" />
              {photo.caption && (
                <span className="block px-0.5 pt-1 text-left font-hand text-[15px] leading-tight text-ink/70">
                  {photo.caption}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {index !== null && (
        <Lightbox photos={photos} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
      )}
    </>
  );
}
