// RescueLog's pipeline in four boxes: photo in, analysis, a structured record, reports out.
const nodes = [
  {
    title: "Photo",
    body: "A volunteer photographs the rescued food: tables at a pop-up, a loaded cart, whatever the site's flow looks like.",
    icon: "M3 7.5A1.5 1.5 0 0 1 4.5 6h2l1.2-1.8h4.6L13.5 6h2A1.5 1.5 0 0 1 17 7.5v7A1.5 1.5 0 0 1 15.5 16h-11A1.5 1.5 0 0 1 3 14.5zM10 13.2a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4",
  },
  {
    title: "AI analysis",
    body: "A vision model identifies the food, estimates each category's weight, and prices it at retail, in about a minute.",
    icon: "M10 3v2.2M10 14.8V17M3 10h2.2M14.8 10H17M5 5l1.6 1.6M13.4 13.4 15 15M5 15l1.6-1.6M13.4 6.6 15 5M10 12.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2",
  },
  {
    title: "Structured record",
    body: "Weights, the category breakdown, the dollar estimate, and the photos land on the dashboard. Nobody types anything.",
    icon: "M4 5h12M4 10h12M4 15h12M7 3.5v13",
  },
  {
    title: "Reports",
    body: "One click exports a CSV shaped for grant workbooks, by date, site, and category.",
    icon: "M4 16V9M8.5 16V5M13 16v-5M17 16H3",
  },
];

export default function FlowDiagram() {
  return (
    <ol className="grid gap-3 md:grid-cols-4 md:gap-0" aria-label="How a photo becomes a report">
      {nodes.map((node, i) => (
        <li key={node.title} className="relative flex gap-4 md:block md:pr-6">
          <div className="flex items-center md:mb-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-leaf/15 text-leaf-deep ring-1 ring-leaf/25">
              <svg aria-hidden viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d={node.icon} />
              </svg>
            </span>
            {i < nodes.length - 1 && (
              <span aria-hidden className="ml-3 hidden h-px flex-1 bg-[linear-gradient(90deg,var(--color-ink)_50%,transparent_50%)] bg-[length:8px_1px] opacity-30 md:block" />
            )}
          </div>
          <div className="min-w-0 pb-1">
            <p className="v2-label text-ink/45">Step {i + 1}</p>
            <p className="mt-1 font-serif text-lg font-medium">{node.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink/65">{node.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
