"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Lightbox from "@/components/Lightbox";
import type { ResolvedPhoto } from "@/lib/images";

export type WallTile = {
  photo: ResolvedPhoto;
  /** Grid span classes at 2, 4, and 6 columns. */
  span: string;
  /** next/image sizes, from how wide the photo renders at each breakpoint. */
  sizes: string;
  /** Rotation for the few tiles framed as polaroids. */
  tilt?: string;
};

type Props = {
  tiles: WallTile[];
  /** Tiles shown before "see all" below 640px, and from 640px up. */
  phoneFirst: number;
  desktopFirst: number;
};

// The camera roll grid: 2 columns on phones, 4 on tablets, 6 from 1024px. Rows are exactly one
// column tall, measured from the container's width, so tiles stay square and 2x tiles line up.
// Every tile opens the shared lightbox, which steps through all the photos.
export default function PhotoWallGrid({ tiles, phoneFirst, desktopFirst }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<number | null>(null);
  const list = useRef<HTMLUListElement>(null);
  const id = useId();
  const count = tiles.length;

  // Show everything, then move focus to the first photo that was hidden, where the button was.
  const showAll = () => {
    const first = window.matchMedia("(min-width: 40rem)").matches ? desktopFirst : phoneFirst;
    flushSync(() => setOpen(true));
    list.current?.querySelectorAll("button")[first]?.focus({ preventScroll: true });
  };

  // Until "see all": hidden past the first 24 everywhere, and past the first 12 on phones.
  const hidden = (i: number) => (open ? "" : i >= desktopFirst ? "hidden" : i >= phoneFirst ? "max-sm:hidden" : "");

  return (
    <>
      <ul
        id={id}
        ref={list}
        className="grid grid-flow-row-dense auto-rows-[calc((100cqi_-_0.5rem)/2)] grid-cols-2 gap-2 sm:auto-rows-[calc((100cqi_-_2.25rem)/4)] sm:grid-cols-4 sm:gap-3 lg:auto-rows-[calc((100cqi_-_3.75rem)/6)] lg:grid-cols-6"
      >
        {tiles.map((tile, i) => (
          <li key={tile.photo.file} className={`${tile.span} ${hidden(i)}`}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className={`group relative block size-full cursor-zoom-in ${
                tile.tilt
                  ? `bg-paper shadow-[0_16px_30px_-16px_rgba(34,28,24,0.6)] ring-1 ring-ink/10 transition-[rotate] duration-300 hover:rotate-0 ${tile.tilt}`
                  : "overflow-hidden rounded-lg bg-ink/[0.06]"
              }`}
            >
              <span className={tile.tilt ? "absolute inset-x-[6%] top-[6%] bottom-[16%] overflow-hidden bg-ink/[0.06]" : "absolute inset-0"}>
                <Image
                  src={tile.photo.src}
                  alt={tile.photo.alt}
                  fill
                  sizes={tile.sizes}
                  // Faces sit high in most photos, so crops keep more of the top than the bottom.
                  className="object-cover object-[50%_30%] transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {!open && (phoneFirst < count || desktopFirst < count) && (
        <div className={`mt-5 text-center ${phoneFirst < count ? "" : "max-sm:hidden"} ${desktopFirst < count ? "" : "sm:hidden"}`}>
          <button
            type="button"
            aria-expanded={false}
            aria-controls={id}
            onClick={showAll}
            className="inline-flex h-10 items-center rounded-full px-1 text-sm font-semibold text-tomato-deep underline-offset-4 hover:underline"
          >
            See all {count} photos ▾
          </button>
        </div>
      )}

      {index !== null && (
        <Lightbox photos={tiles.map((tile) => tile.photo)} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
      )}
    </>
  );
}
