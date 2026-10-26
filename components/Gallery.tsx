"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Photo from "@/components/ui/Photo";
import type { PhotoInfo } from "@/lib/photos";

type GalleryPhoto = PhotoInfo & { alt: string };

export default function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);

  return (
    <>
      <div className="columns-2 gap-3 sm:gap-4 lg:columns-3 lg:gap-5">
        {photos.map((photo, i) => (
          <button
            key={photo.file}
            type="button"
            data-reveal
            onClick={() => setIndex(i)}
            className="group mb-3 block w-full cursor-zoom-in break-inside-avoid sm:mb-4 lg:mb-5"
          >
            <Photo
              photo={photo}
              alt={photo.alt}
              sizes="(min-width: 1024px) 33vw, 50vw"
              imgClassName="transition-opacity duration-300 group-hover:opacity-90"
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <Lightbox photos={photos} index={index} onIndex={setIndex} onClose={close} />
      )}
    </>
  );
}

type LightboxProps = {
  photos: GalleryPhoto[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
};

function Lightbox({ photos, index, onIndex, onClose }: LightboxProps) {
  const dialog = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const count = photos.length;
  const photo = photos[index];

  const prev = useCallback(() => onIndex((index - 1 + count) % count), [index, count, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % count), [index, count, onIndex]);

  // Lock page scroll, move focus in, and hand focus back on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    dialog.current?.focus();
    return () => {
      root.style.overflow = overflow;
      opener?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab") trapFocus(e, dialog.current);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, onClose]);

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) {
      touch.current = null;
      return;
    }
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx < 0) next();
      else prev();
    } else if (dy > 90 && dy > Math.abs(dx) * 1.2) {
      onClose();
    }
  };

  const ratio = photo.width / photo.height;
  const neighbors = [photos[(index - 1 + count) % count], photos[(index + 1) % count]];

  return createPortal(
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      tabIndex={-1}
      className="lightbox-in fixed inset-0 z-50 flex flex-col bg-ink text-paper outline-none select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-5 sm:px-8">
        <p className="font-mono text-xs text-paper/60 tabular-nums" aria-live="polite">
          {pad(index + 1)} / {pad(count)}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="-mr-2 px-2 py-2 text-sm text-paper/80 transition-colors hover:text-paper"
        >
          Close
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-5 sm:px-24"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          key={photo.file}
          className="lightbox-in"
          style={{ width: `min(100%, calc((100dvh - 10rem) * ${ratio}))` }}
        >
          <Photo
            photo={photo}
            alt={photo.alt}
            sizes="90vw"
            bg={photo.exists ? "bg-paper/5" : "bg-paper"}
            loading="eager"
          />
        </div>

        <ArrowButton direction="prev" onClick={prev} className="absolute top-1/2 left-6 hidden -translate-y-1/2 sm:flex" />
        <ArrowButton direction="next" onClick={next} className="absolute top-1/2 right-6 hidden -translate-y-1/2 sm:flex" />
      </div>

      <div className="flex h-24 shrink-0 items-center justify-center gap-6 sm:h-16">
        <ArrowButton direction="prev" onClick={prev} className="flex sm:hidden" />
        <ArrowButton direction="next" onClick={next} className="flex sm:hidden" />
      </div>

      {/* Warm the cache for the photos on either side so arrows and swipes feel instant. */}
      <div aria-hidden className="sr-only">
        {neighbors
          .filter((p) => p.exists && p.file !== photo.file)
          .map((p) => (
            <Photo key={p.file} photo={p} alt="" sizes="90vw" loading="eager" />
          ))}
      </div>
    </div>,
    document.body,
  );
}

function ArrowButton({
  direction,
  onClick,
  className = "",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous photo" : "Next photo"}
      className={`size-12 items-center justify-center rounded-full border border-paper/20 text-paper/80 transition-colors hover:border-paper/50 hover:text-paper ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
        {direction === "prev" ? <path d="M19 12H5m6-6-6 6 6 6" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}
      </svg>
    </button>
  );
}

function trapFocus(e: KeyboardEvent, root: HTMLElement | null) {
  if (!root) return;
  const focusable = Array.from(root.querySelectorAll<HTMLElement>("button")).filter(
    (el) => el.offsetParent !== null,
  );
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (e.shiftKey && (active === first || active === root)) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && (active === last || active === root)) {
    e.preventDefault();
    first.focus();
  }
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}
