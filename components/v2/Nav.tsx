"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const items = [
  { label: "Work", href: "/casestudyversion#work" },
  { label: "Recognition", href: "/casestudyversion#recognition" },
  { label: "Press", href: "/casestudyversion#press" },
  { label: "Gallery", href: "/casestudyversion#gallery" },
  { label: "About", href: "/casestudyversion#about" },
  { label: "Contact", href: "/casestudyversion#contact" },
];

// Sticky top bar. On phones the links fold into a menu that closes after a choice.
export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu on route change and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur-md">
      <div className="v2-wrap flex h-16 items-center justify-between gap-6">
        <Link href="/casestudyversion" className="font-serif text-xl font-semibold tracking-[-0.02em]">
          Sid Sharma<span className="text-tomato">.</span>
        </Link>

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink/70 transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="v2-menu"
          onClick={() => setOpen((value) => !value)}
          className="-mr-2 rounded-full px-3 py-2 text-sm font-medium md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav id="v2-menu" aria-label="Sections" className="border-t border-ink/10 md:hidden">
          <ul className="v2-wrap grid py-2">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-ink/5 py-3 font-serif text-xl last:border-b-0"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
