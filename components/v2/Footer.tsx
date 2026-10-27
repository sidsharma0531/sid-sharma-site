import Link from "next/link";
import { contact, site } from "@/data/content";
import { links } from "@/data/v2";
import Arrow from "./Arrow";

const outbound = [
  { label: "RescueLog", href: links.rescuelog },
  { label: "Waste2Taste", href: links.waste2taste },
  { label: "Still Good on Amazon", href: links.amazon },
  { label: "LinkedIn", href: contact.linkedin },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/10">
      <div className="v2-wrap flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-2xl font-semibold tracking-[-0.02em]">
            Sid Sharma<span className="text-tomato">.</span>
          </p>
          <p className="mt-2 text-sm text-ink/55">{site.copyright}</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {outbound.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-ink/70 transition-colors hover:text-ink">
                {link.label}
                <Arrow direction="up-right" className="text-ink/40" />
              </a>
            </li>
          ))}
          <li>
            <Link href="#top" className="text-ink/70 transition-colors hover:text-ink">
              Back to top
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
