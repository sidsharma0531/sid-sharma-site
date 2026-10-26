import Photo from "@/components/ui/Photo";
import { hero } from "@/lib/content";
import { getPhoto } from "@/lib/photos";

export default function Hero() {
  const portrait = getPhoto(hero.portrait.file, [4, 5]);

  return (
    <section id="top" className="container-page pt-8 pb-24 sm:pt-16 sm:pb-32 lg:pt-24 lg:pb-40">
      <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-10 lg:gap-12">
        <div className="md:order-2 md:col-span-4 md:col-start-9">
          <Photo
            photo={portrait}
            alt={hero.portrait.alt}
            ratio={4 / 5}
            hint="Portrait, 4:5"
            sizes="(min-width: 1024px) 340px, (min-width: 768px) 28vw, 60vw"
            preload
            className="w-[60%] max-w-[300px] md:w-full md:max-w-none"
          />
        </div>

        <div className="md:order-1 md:col-span-8">
          <h1 className="font-serif text-[clamp(3.5rem,19vw,6rem)] leading-[0.92] font-light tracking-[-0.035em] md:text-[clamp(5rem,10.5vw,9rem)]">
            {hero.name}
          </h1>

          <p className="mt-6 max-w-[26ch] font-serif text-[1.375rem] leading-[1.3] text-ink/85 sm:mt-8 sm:text-[1.875rem]">
            {hero.line}
          </p>

          <ul className="mt-10 border-y border-ink/10 text-sm text-ink/70 sm:mt-12 sm:flex sm:flex-wrap sm:items-center sm:border-0">
            {hero.facts.map((fact, i) => (
              <li
                key={fact}
                className="border-t border-ink/10 py-3 first:border-0 sm:flex sm:items-center sm:border-0 sm:py-0"
              >
                {i > 0 && (
                  <span aria-hidden className="hidden px-3 text-accent sm:inline">
                    ·
                  </span>
                )}
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
