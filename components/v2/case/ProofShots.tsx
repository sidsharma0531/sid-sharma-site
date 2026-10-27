"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import type { ResolvedPhoto } from "@/lib/images";

type Item = { photo: ResolvedPhoto; value: string; label: string };

// Each claim beside a thumbnail of the screenshot or certificate that backs it; tap to see it full size.
export default function ProofShots({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const photos = items.map((item) => item.photo);

  return (
    <>
      <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {items.map((item, i) => (
          <li key={item.label}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group flex w-full items-center gap-4 rounded-2xl border border-ink/10 bg-paper p-3 text-left transition-colors hover:border-ink/30"
            >
              <span className="relative block aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-lg bg-ink/5 ring-1 ring-ink/10 sm:w-28">
                <Image src={item.photo.src} alt="" fill sizes="112px" className="object-cover object-top" />
              </span>
              <span className="min-w-0">
                <span className="block font-serif text-2xl leading-tight font-semibold tracking-[-0.02em]">{item.value}</span>
                <span className="mt-0.5 block text-sm leading-snug text-ink/65">{item.label}</span>
                <span className="v2-label mt-2 block text-tomato-deep group-hover:underline">View proof</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {open !== null && <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}
