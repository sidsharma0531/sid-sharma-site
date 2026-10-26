import type { LinkChip } from "@/data/content";
import { isLink } from "@/lib/text";
import StoreBadge from "./StoreBadge";

// A link that proves a claim. Unfilled links stay visible as dashed chips with a [link] tag.
export default function Chip({ size = "md", ...link }: LinkChip & { size?: "sm" | "md" }) {
  if (link.badge) return <StoreBadge {...link} />;

  const base = `inline-flex items-center gap-1.5 rounded-full border-[1.5px] font-medium ${
    size === "sm" ? "h-9 px-3.5 text-[13px]" : "h-10 px-4 text-sm"
  }`;

  if (!isLink(link.href)) {
    return (
      <span className={`${base} border-dashed border-ink/35 text-ink/70`}>
        {link.label}
        <span className="fill-me font-mono text-[11px]">{link.href}</span>
      </span>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} border-ink bg-paper shadow-[2px_2px_0_var(--color-ink)] transition-[transform,background-color,box-shadow] duration-150 hover:-translate-y-px hover:bg-butter hover:shadow-[3px_3px_0_var(--color-ink)]`}
    >
      {link.label}
      <span aria-hidden>↗</span>
    </a>
  );
}
