"use client";

import { useEffect, useState } from "react";
import { hero, nav } from "@/lib/content";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 640 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-paper transition-colors duration-300 ${
        scrolled || open ? "border-ink/10" : "border-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:bg-paper focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <div className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="font-serif text-xl tracking-[-0.01em]" onClick={() => setOpen(false)}>
          {hero.name}
        </a>

        <nav aria-label="Main" className="hidden sm:block">
          <ul className="flex items-center gap-8 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-ink/75 underline-offset-[6px] transition-colors hover:text-ink hover:underline hover:decoration-accent"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="-mr-2 px-2 py-2 text-sm font-medium sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <>
          <div
            aria-hidden
            className="fixed inset-x-0 top-16 bottom-0 bg-ink/10 sm:hidden"
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-menu"
            aria-label="Main"
            className="absolute inset-x-0 top-full border-b border-ink/10 bg-paper sm:hidden"
          >
            <ul className="container-page pt-2 pb-6">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-ink/10 last:border-0">
                  <a
                    href={item.href}
                    className="block py-4 font-serif text-3xl font-light"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}
