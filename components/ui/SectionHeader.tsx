type Props = {
  label: string;
  title?: string;
};

// Hairline rule, small green kicker, and an optional serif heading.
export default function SectionHeader({ label, title }: Props) {
  const kicker = "text-xs font-medium uppercase tracking-[0.18em] text-accent";

  return (
    <div data-reveal className="mb-10 border-t border-ink/15 pt-5 sm:mb-14">
      {title ? (
        <>
          <p className={kicker}>{label}</p>
          <h2 className="mt-6 font-serif text-[2.5rem] leading-[1.02] font-light tracking-[-0.02em] sm:text-6xl">
            {title}
          </h2>
        </>
      ) : (
        <h2 className={kicker}>{label}</h2>
      )}
    </div>
  );
}
