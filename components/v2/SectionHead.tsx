// Section opener: a small label on the left, the title (and an optional intro) on the right.
export default function SectionHead({
  id,
  label,
  title,
  intro,
}: {
  id: string;
  label: string;
  title: string;
  intro?: string;
}) {
  return (
    <header data-reveal className="grid gap-4 md:grid-cols-12 md:gap-8">
      <p className="v2-label pt-2 md:col-span-3">{label}</p>
      <div className="md:col-span-9">
        <h2 id={id} className="font-serif text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.025em]">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-[60ch] text-[1.05rem] leading-relaxed text-ink/70 sm:text-lg">{intro}</p>}
      </div>
    </header>
  );
}
