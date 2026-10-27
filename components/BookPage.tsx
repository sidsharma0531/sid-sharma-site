"use client";

import { useState } from "react";
import { LoopArrow } from "@/components/doodles";
import Lightbox from "@/components/Lightbox";
import Photo from "@/components/ui/Photo";
import type { ResolvedPhoto } from "@/lib/images";

// One page from inside the book, tucked against the cover like a loose sheet, with a handwritten
// "a peek inside". Sits in BookMockup's corner; clicking it opens the page in the lightbox.
export default function BookPage({ page }: { page: ResolvedPhoto }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute right-[6%] bottom-[7%] w-[40%]">
      <p
        aria-hidden
        className="absolute right-0 bottom-full mb-[6%] flex flex-col items-end font-hand text-[6.5cqw] leading-none text-tomato-deep"
      >
        <span className="-rotate-6">a peek inside</span>
        <LoopArrow className="mt-[2cqw] mr-[18%] w-[12cqw]" />
      </p>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full rotate-[5deg] cursor-zoom-in bg-white p-[4%] shadow-[0_18px_30px_-14px_rgba(34,28,24,0.55)] ring-1 ring-ink/10 transition-[rotate,scale] duration-300 hover:scale-[1.04] hover:rotate-0"
      >
        <Photo photo={page} alt={page.alt} sizes="(min-width: 768px) 140px, 40vw" />
      </button>

      {open && <Lightbox photos={[page]} index={0} onIndex={() => {}} onClose={() => setOpen(false)} />}
    </div>
  );
}
