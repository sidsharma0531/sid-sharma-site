import { rescueEvent } from "@/data/v2";

// One real pop-up from RescueLog's live dashboard, as published on the RescueLog website.
// Compact shows the top three categories; full shows all six.
export default function EventCard({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  const categories = compact ? rescueEvent.categories.slice(0, 3) : rescueEvent.categories;
  return (
    <figure
      className={`rounded-2xl bg-paper p-5 text-ink shadow-[0_24px_48px_-28px_rgba(34,28,24,0.5)] ring-1 ring-ink/10 sm:p-6 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="v2-label">{rescueEvent.org}</p>
          <p className="mt-1.5 text-[15px] leading-snug font-medium">{rescueEvent.name}</p>
        </div>
        <span className="shrink-0 rounded-full bg-leaf/15 px-2.5 py-1 text-xs font-medium text-leaf-deep">Analyzed</span>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-ink/10 pt-4">
        <div>
          <dt className="text-xs text-ink/55">Pounds rescued</dt>
          <dd className="mt-0.5 font-serif text-[2rem] leading-none font-semibold tracking-[-0.02em]">{rescueEvent.pounds}</dd>
        </div>
        <div>
          <dt className="text-xs text-ink/55">Est. retail value</dt>
          <dd className="mt-0.5 font-serif text-[2rem] leading-none font-semibold tracking-[-0.02em]">{rescueEvent.value}</dd>
        </div>
      </dl>

      <ul className="mt-5 space-y-2.5" aria-label="Breakdown by category">
        {categories.map((category) => (
          <li key={category.label} className="grid grid-cols-[minmax(0,7.5rem)_1fr_2.5rem] items-center gap-3 text-xs">
            <span className="truncate text-ink/70">{category.label}</span>
            <span aria-hidden className="h-1.5 overflow-hidden rounded-full bg-ink/10">
              <span className="block h-full rounded-full bg-leaf" style={{ width: `${category.pct}%` }} />
            </span>
            <span className="text-right font-medium tabular-nums">{category.pct}%</span>
          </li>
        ))}
      </ul>

      <figcaption className="mt-5 text-xs leading-relaxed text-ink/50">
        {rescueEvent.photos} volunteer photos, analyzed by AI. Weights and values are estimates.
      </figcaption>
    </figure>
  );
}
