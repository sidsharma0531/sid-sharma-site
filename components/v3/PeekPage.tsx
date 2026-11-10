"use client";

import { useState } from "react";
import { LoopArrow } from "@/components/doodles";
import Lightbox from "@/components/Lightbox";
import Photo from "@/components/ui/Photo";
import type { ResolvedPhoto } from "@/lib/images";

// The book's inside page with a handwritten "a peek inside", like the homepage's BookPage, sized for
// a V3 card's picture panel: smaller in the wide panel, the homepage's size in the tall one.
// Clicking it opens the page in the lightbox.
export default function PeekPage({ page }: { page: ResolvedPhoto }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute right-[15%] bottom-[8%] w-[27%] lg:right-[6%] lg:bottom-[7%] lg:w-[40%]">
      <p
        aria-hidden
        className="absolute right-0 bottom-full mb-[2.5cqw] flex flex-col items-end font-hand text-[4.4cqw] leading-none whitespace-nowrap text-tomato-deep lg:mb-[3.5cqw] lg:text-[6.5cqw]"
      >
        <span className="-rotate-6">a peek inside</span>
        <LoopArrow className="mt-[1.4cqw] mr-[18%] w-[7.5cqw] lg:mt-[2cqw] lg:w-[12cqw]" />
      </p>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full rotate-[5deg] cursor-zoom-in bg-white p-[4%] shadow-[0_14px_24px_-12px_rgba(34,28,24,0.55)] ring-1 ring-ink/10 transition-[rotate,scale] duration-300 hover:scale-[1.04] hover:rotate-0"
      >
        <Photo photo={page} alt={page.alt} sizes="(min-width: 1024px) 170px, (min-width: 640px) 130px, 90px" />
      </button>

      {open && <Lightbox photos={[page]} index={0} onIndex={() => {}} onClose={() => setOpen(false)} />}
    </div>
  );
}
