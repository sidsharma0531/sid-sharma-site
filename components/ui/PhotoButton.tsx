"use client";

import { useState } from "react";
import Lightbox from "@/components/Lightbox";
import type { ResolvedPhoto } from "@/lib/images";

type Props = {
  photo: ResolvedPhoto;
  /** Accessible name, like "Open photo: published author". */
  label: string;
  className?: string;
  children: React.ReactNode;
};

// A button that opens one photo in the shared lightbox. What it shows comes in as children, so it
// can wrap a phrase in a sentence or a whole stat.
export default function PhotoButton({ photo, label, className = "", children }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" aria-label={label} onClick={() => setOpen(true)} className={`cursor-zoom-in ${className}`}>
        {children}
      </button>
      {open && <Lightbox photos={[photo]} index={0} onIndex={() => {}} onClose={() => setOpen(false)} />}
    </>
  );
}
