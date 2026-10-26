import { isPlaceholder, type Link } from "@/lib/content";

const base =
  "inline-flex min-h-11 items-center gap-2 border px-4 text-sm font-medium tracking-[0.01em] transition-colors duration-200";

export default function LinkButton({ label, href }: Link) {
  if (isPlaceholder(href)) {
    return (
      <span className={`${base} border-ink/25 text-ink/70`}>
        {label}
        <span className="fill-me font-mono text-[11px]">{href}</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} border-ink/80 hover:border-accent hover:bg-accent hover:text-paper`}
    >
      {label}
      <span aria-hidden>↗</span>
    </a>
  );
}
