// The idea behind the CBO's potential-GDP estimate, drawn without numbers: long-run trends in
// labor, capital, and productivity combine into potential output. Underneath, what Sid did with it.
export default function ModelDiagram({ compact = false }: { compact?: boolean }) {
  const inputs = ["Labor force", "Capital", "Productivity"];
  return (
    <div className="flex h-full flex-col justify-center gap-8 text-cream">
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 sm:gap-5">
        <ul className="space-y-2">
          {inputs.map((input) => (
            <li key={input} className="rounded-lg border border-cream/20 px-3 py-2 text-sm sm:text-[15px]">
              {input}
              {!compact && <span className="block text-xs text-cream/50">long-run trend</span>}
            </li>
          ))}
        </ul>
        <svg aria-hidden viewBox="0 0 40 90" className="h-24 w-8 sm:w-10" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.5">
          <path d="M0 15c20 0 20 30 38 30M0 45h38M0 75c20 0 20-30 38-30" />
        </svg>
        <div className="rounded-xl bg-cream px-4 py-4 text-ink">
          <p className="v2-label text-ink/50">Output</p>
          <p className="mt-1 font-serif text-xl leading-tight font-semibold sm:text-2xl">Potential GDP</p>
          {!compact && <p className="mt-1 text-xs text-ink/60">compared with actual GDP, the output gap</p>}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="rounded-full border border-cream/25 px-3 py-1.5 text-cream/75">EViews</span>
        <svg aria-hidden viewBox="0 0 16 16" className="size-4 text-tomato" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M3 8h10m-4-4 4 4-4 4" />
        </svg>
        <span className="rounded-full bg-tomato px-3 py-1.5 font-medium text-cream">Python</span>
        <span className="text-cream/60">+ a forecasting framework, for UH courses</span>
      </div>
    </div>
  );
}
