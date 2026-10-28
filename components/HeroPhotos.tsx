"use client";

import { useEffect, useRef, useState } from "react";
import Photo from "@/components/ui/Photo";
import type { ResolvedPhoto } from "@/lib/images";

// Where each card sits, front to back: offset as % of the card, tilt, and size. On hover the back
// cards fan out a little more (hx, hr), a hint that there's more to see.
const spots = [
  { x: 0, y: 0, r: 0, s: 1, hx: 0, hr: 0 },
  { x: -5, y: -2.5, r: -6, s: 0.97, hx: -9, hr: -9 },
  { x: 5, y: 3, r: 5, s: 0.94, hx: 9, hr: 8 },
];
// The front card drifts this way and fades as it leaves, so it can drop behind the others unseen.
const away = { x: 24, y: -4, r: 10, s: 1, hx: 24, hr: 10 };

const WAIT = 5000; // ms each photo stays in front while the stack turns by itself
const DROP = 320; // ms before the outgoing card moves behind the others

// The hero photo with more photos stacked behind it. Every few seconds the front one slides to the
// back; a click does the same, and from then on the visitor is in charge. It holds still while
// hovered, focused, off screen, or in a background tab, and never turns by itself for
// reduced-motion users. With one photo it's just that photo.
export default function HeroPhotos({ photos }: { photos: ResolvedPhoto[] }) {
  const count = photos.length;
  const [front, setFront] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [motion, setMotion] = useState(false); // stays false until the browser says motion is fine
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [seen, setSeen] = useState(true); // on screen, in a visible tab
  const [said, setSaid] = useState(""); // read out by screen readers after a click
  const figure = useRef<HTMLElement>(null);
  const drop = useRef<number | undefined>(undefined);

  useEffect(() => {
    setMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const node = figure.current;
    if (!node || count < 2) return;
    let onScreen = true;
    const update = () => setSeen(onScreen && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    observer.observe(node);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      window.clearTimeout(drop.current);
    };
  }, [count]);

  function turn(byVisitor: boolean) {
    const next = (front + 1) % count;
    window.clearTimeout(drop.current);
    if (motion) {
      setLeaving(front);
      drop.current = window.setTimeout(() => setLeaving(null), DROP);
    }
    setFront(next);
    if (byVisitor) {
      setClicked(true);
      setSaid(`Photo ${next + 1} of ${count}: ${photos[next].alt}`);
    }
  }

  // Turn by itself after a pause. `front` restarts the wait after every turn.
  useEffect(() => {
    if (!motion || clicked || hovered || focused || !seen || count < 2) return;
    const timer = window.setTimeout(() => turn(false), WAIT);
    return () => window.clearTimeout(timer);
  }, [motion, clicked, hovered, focused, seen, count, front]);

  return (
    <figure
      ref={figure}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="group relative w-[58%] max-w-[15rem] -rotate-2 md:w-full md:max-w-none md:rotate-2"
    >
      <span
        aria-hidden
        className="absolute -top-3 left-1/2 z-50 h-7 w-24 -translate-x-1/2 -rotate-3 bg-butter/80 shadow-sm [clip-path:polygon(3%_0,97%_8%,100%_50%,96%_92%,4%_100%,0_50%)]"
      />
      <div className="grid">
        {photos.map((photo, i) => {
          const place = (i - front + count) % count;
          const spot = i === leaving ? away : spots[Math.min(place, spots.length - 1)];
          return (
            <div
              key={photo.file}
              aria-hidden={place > 0 || undefined}
              style={
                {
                  "--x": `${spot.x}%`,
                  "--y": `${spot.y}%`,
                  "--r": `${spot.r}deg`,
                  "--s": spot.s,
                  "--hx": `${spot.hx}%`,
                  "--hr": `${spot.hr}deg`,
                  zIndex: i === leaving ? count + 1 : count - place,
                  opacity: i === leaving ? 0 : 1,
                } as React.CSSProperties
              }
              className="hero-card col-start-1 row-start-1 translate-x-(--x) translate-y-(--y) rotate-(--r) scale-(--s) rounded-[1.25rem] bg-paper p-2.5 shadow-[0_28px_44px_-26px_rgba(34,28,24,0.55)] ring-1 ring-ink/10 group-hover:translate-x-(--hx) group-hover:rotate-(--hr)"
            >
              <Photo
                photo={photo}
                alt={photo.alt}
                ratio={4 / 5}
                hint="portrait, 4:5"
                preload={i === 0}
                loading="eager"
                sizes="(min-width: 768px) 296px, 58vw"
                className="rounded-[0.85rem]"
                imgClassName="object-[50%_30%]"
              />
            </div>
          );
        })}
      </div>
      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Show the next photo"
            onClick={() => turn(true)}
            className="absolute inset-0 z-50 cursor-pointer rounded-[1.25rem]"
          />
          <p aria-live="polite" className="sr-only">
            {said}
          </p>
        </>
      )}
    </figure>
  );
}
