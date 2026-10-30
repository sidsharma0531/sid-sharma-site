import HeroLine from "@/components/HeroLine";
import HeroPhotos from "@/components/HeroPhotos";
import ContactLinks from "@/components/ui/ContactLinks";
import { hero } from "@/data/content";
import { resolvePhotos } from "@/lib/images";

export default function Hero() {
  // The main photo always shows, as a labeled placeholder if its file is missing. The ones stacked
  // behind it only show when their files are there.
  const [main, ...more] = resolvePhotos([hero.photo, ...hero.morePhotos], { fallback: [4, 5] });
  const photos = [main, ...more.filter((photo) => photo.exists)];

  // The section spans the full width, so the photo stack's swing is clipped at the screen edge
  // instead of adding a sideways scroll.
  return (
    <section id="top" className="overflow-x-clip pt-8 pb-12 sm:pt-14 sm:pb-16">
      {/* Phone: name, line, photo, contact. Wider: text on the left, photo spanning the right. */}
      <div className="container-page grid grid-cols-1 [grid-template-areas:'name'_'line'_'photo'_'contact'] md:grid-cols-[minmax(0,1fr)_minmax(0,18.5rem)] md:grid-rows-[1fr_auto_auto] md:gap-x-12 md:[grid-template-areas:'name_photo'_'line_photo'_'contact_photo'] lg:gap-x-16">
        <h1 className="font-serif text-[clamp(3.3rem,16.5vw,5rem)] leading-[0.9] font-semibold tracking-[-0.035em] [font-variation-settings:'SOFT'_100,'WONK'_1] [grid-area:name] md:self-end md:text-[clamp(4.5rem,8.6vw,7.6rem)]">
          {hero.name}
          <span className="text-tomato">.</span>
        </h1>

        <p className="mt-5 max-w-[30ch] text-xl leading-snug text-ink/80 [grid-area:line] sm:mt-7 sm:text-2xl sm:leading-snug">
          <HeroLine />
        </p>

        <div className="mt-10 [grid-area:photo] md:mt-2">
          <HeroPhotos photos={photos} />
        </div>

        <div className="mt-7 [grid-area:contact] md:mt-8 md:self-end">
          <ContactLinks variant="icons" />
        </div>
      </div>
    </section>
  );
}
