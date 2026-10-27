"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import type { GalleryTag } from "@/data/v2";
import type { ResolvedPhoto } from "@/lib/images";

type Item = ResolvedPhoto & { tag: GalleryTag };

const filters = ["All", "Waste2Taste", "RescueLog", "Still Good"] as const;

// Masonry of real photos with captions, filterable by project. Opens in the shared lightbox,
// which steps through whatever the filter shows.
export default function GalleryGrid({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const shown = filter === "All" ? items : items.filter((item) => item.tag === filter);

  return (
    <>
      <div role="group" aria-label="Show photos from" className="flex flex-wrap gap-2">
        {filters.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={filter === name}
            onClick={() => setFilter(name)}
            className="rounded-full border border-ink/15 px-4 py-1.5 text-sm transition-colors hover:border-ink/50 aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-cream"
          >
            {name}
          </button>
        ))}
      </div>

      <ul className="mt-8 columns-2 gap-3 sm:gap-5 lg:columns-3">
        {shown.map((photo, i) => {
          // Phone screenshots are very tall, so the grid shows their top; the lightbox shows all of it.
          const tall = photo.width / photo.height < 0.6;
          return (
            <li key={photo.file} className="mb-5 break-inside-avoid sm:mb-7">
              <button type="button" onClick={() => setOpen(i)} className="group block w-full cursor-zoom-in text-left">
                <span className={`relative block overflow-hidden rounded-xl bg-ink/[0.06] ${tall ? "aspect-[4/5]" : ""}`}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 1024px) 360px, 46vw"
                    className={`w-full transition-transform duration-500 group-hover:scale-[1.03] ${tall ? "h-full object-cover object-top" : "h-auto"}`}
                  />
                </span>
                <span className="mt-2.5 block text-[13px] leading-snug text-ink/75 sm:text-sm">{photo.caption}</span>
                <span className="v2-label mt-1 block text-ink/40">{photo.tag}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {open !== null && <Lightbox photos={shown} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}
