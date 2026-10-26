import { LoopArrow } from "@/components/doodles";
import HeroStack from "@/components/HeroStack";
import ContactLinks from "@/components/ui/ContactLinks";
import { hero } from "@/data/content";
import { photosFor } from "@/lib/images";

export default function Hero() {
  const photos = photosFor("hero");

  return (
    <section id="top" className="container-page pt-8 pb-12 sm:pt-14 sm:pb-16">
      {/* Phone: name, line, photo, contact. Wider: text on the left, photo spanning the right. */}
      <div className="grid grid-cols-1 [grid-template-areas:'name'_'line'_'photo'_'contact'] md:grid-cols-[minmax(0,1fr)_minmax(0,18.5rem)] md:grid-rows-[1fr_auto_auto] md:gap-x-12 md:[grid-template-areas:'name_photo'_'line_photo'_'contact_photo'] lg:gap-x-16">
        <h1 className="font-serif text-[clamp(3.3rem,16.5vw,5rem)] leading-[0.9] font-semibold tracking-[-0.035em] [font-variation-settings:'SOFT'_100,'WONK'_1] [grid-area:name] md:self-end md:text-[clamp(4.5rem,8.6vw,7.6rem)]">
          {hero.name}
          <span className="text-tomato">.</span>
        </h1>

        <p className="mt-5 max-w-[30ch] text-xl leading-snug text-ink/80 [grid-area:line] sm:mt-7 sm:text-2xl sm:leading-snug">
          {hero.line}
        </p>

        {photos.length > 0 && (
          <div className="relative mt-10 [grid-area:photo] md:mt-2">
            <HeroStack photos={photos} />

            <p className="absolute top-[40%] left-[63%] flex w-[36%] flex-col items-start md:top-auto md:right-[calc(100%+0.75rem)] md:bottom-1 md:left-auto md:w-32 md:items-end">
              <span className="-rotate-6 font-hand text-[1.9rem] leading-none text-tomato-deep">{hero.note}</span>
              <LoopArrow className="mt-1 w-16 text-tomato-deep md:w-20" />
            </p>
          </div>
        )}

        <div className="mt-7 [grid-area:contact] md:mt-8 md:self-end">
          <ContactLinks variant="icons" />
        </div>
      </div>
    </section>
  );
}
