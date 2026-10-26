"use client";

import { useEffect, useState } from "react";
import Doodle from "@/components/doodles";
import type { NavItem } from "@/data/content";

export default function Nav({ name, items }: { name: string; items: NavItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // The footer is too short to reach the middle of the screen, so the very bottom counts as the last item.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && items.length > 0) setActive(items[items.length - 1].href);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  // Highlight the icon for whichever section crosses the middle of the screen.
  useEffect(() => {
    const targets = ["#top", ...items.map((item) => item.href)]
      .map((href) => document.querySelector<HTMLElement>(href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id === "top" ? null : `#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-cream transition-colors duration-300 ${
        scrolled ? "border-dashed border-ink/20" : "border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <div className="container-page flex h-16 items-center justify-between gap-3">
        <a href="#top" className="font-serif text-[1.35rem] font-semibold tracking-[-0.02em] whitespace-nowrap">
          {name}
          <span className="text-tomato">.</span>
        </a>

        <nav aria-label="Main">
          <ul className="flex items-center gap-0.5 sm:gap-1.5">
            {items.map((item, i) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-label={item.label}
                    aria-current={isActive ? "location" : undefined}
                    className="group relative flex h-11 items-center gap-2 rounded-full px-2.5 text-sm font-medium text-ink/75 transition-colors hover:text-ink md:pr-3.5"
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-0 rounded-full bg-butter/70 transition-[opacity,scale] duration-300 ${
                        isActive ? "scale-100 opacity-100" : "scale-75 opacity-0"
                      }`}
                    />
                    <Doodle
                      name={item.icon}
                      className="relative size-6 text-ink transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-12"
                    />
                    <span className="relative hidden md:inline">{item.label}</span>
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute top-full mt-1.5 rounded-md bg-ink px-2 py-0.5 font-hand text-[17px] whitespace-nowrap text-cream opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:hidden ${
                        i === items.length - 1 ? "right-0" : "left-1/2 -translate-x-1/2"
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
