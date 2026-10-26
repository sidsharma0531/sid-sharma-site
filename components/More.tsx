import SectionHeader from "@/components/ui/SectionHeader";
import { more } from "@/lib/content";

export default function More() {
  return (
    <section id="more" className="container-page pb-24 sm:pb-32 lg:pb-40">
      <SectionHeader label="More" />

      <ul className="grid md:grid-cols-2 md:gap-x-12 lg:gap-x-20">
        {more.map((item) => (
          <li key={item.title} data-reveal className="border-t border-ink/10 py-5 sm:py-6">
            <p className="font-serif text-[1.375rem] leading-snug tracking-[-0.01em] sm:text-2xl">{item.title}</p>
            <p className="mt-1.5 max-w-[48ch] text-[15px] leading-relaxed text-ink/65">{item.detail}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
