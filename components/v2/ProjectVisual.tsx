import PhoneMockup from "@/components/PhoneMockup";
import Photo from "@/components/ui/Photo";
import { experience } from "@/data/content";
import { photos, type ProjectSlug } from "@/data/v2";
import { resolvePhotos } from "@/lib/images";
import EventCard from "./EventCard";
import ModelDiagram from "./ModelDiagram";

const one = (photo: (typeof photos)[keyof typeof photos]) => resolvePhotos([photo], { fallback: [4, 5] })[0];

// The picture beside each project on the homepage ("card") and at the top of its case study
// ("hero"). Everything here is a real screenshot, photo, or the published dashboard numbers.
export default function ProjectVisual({ slug, size = "card" }: { slug: ProjectSlug; size?: "card" | "hero" }) {
  const hero = size === "hero";

  if (slug === "rescuelog") {
    const rescuelog = experience.featured.find((entry) => entry.id === "rescuelog");
    const screens = rescuelog?.visual.kind === "phone" ? resolvePhotos(rescuelog.visual.screens, { fallback: [9, 19.5] }) : [];
    // In a case study the full breakdown comes later, under Results, so both sizes show the short card.
    return (
      <div className={`relative ${hero ? "mx-auto max-w-4xl" : ""}`}>
        <div className={`ml-auto w-full ${hero ? "sm:w-[60%]" : "sm:w-[70%]"}`}>
          <PhoneMockup screens={screens} name="RescueLog" />
        </div>
        <EventCard
          compact
          className="relative mx-auto -mt-20 w-[92%] sm:absolute sm:bottom-[8%] sm:left-0 sm:mx-0 sm:mt-0 sm:w-[48%]"
        />
      </div>
    );
  }

  if (slug === "waste2taste") {
    if (hero) {
      const pickup = one(photos.wholeFoods);
      return (
        <figure>
          <div className="overflow-hidden rounded-[1.75rem]">
            <Photo photo={pickup} alt={pickup.alt} sizes="(min-width: 1216px) 1136px, 92vw" preload />
          </div>
          <figcaption className="mt-3 text-sm text-ink/55">{pickup.caption}</figcaption>
        </figure>
      );
    }
    const [delivered, pickup, oven] = [one(photos.delivered), one(photos.wholeFoods), one(photos.oven)];
    return (
      <div className="grid aspect-[5/4] grid-cols-[1fr_1.15fr] grid-rows-2 gap-2.5 sm:gap-3">
        <div className="relative row-span-2 overflow-hidden rounded-2xl">
          <Photo photo={delivered} alt={delivered.alt} ratio="fill" position="50% 30%" sizes="(min-width: 768px) 28vw, 45vw" />
        </div>
        <div className="relative overflow-hidden rounded-2xl">
          <Photo photo={pickup} alt={pickup.alt} ratio="fill" position="18% 45%" sizes="(min-width: 768px) 32vw, 50vw" />
        </div>
        <div className="relative overflow-hidden rounded-2xl">
          <Photo photo={oven} alt={oven.alt} ratio="fill" sizes="(min-width: 768px) 32vw, 50vw" />
        </div>
      </div>
    );
  }

  if (slug === "still-good") {
    const [cover, page] = [one(photos.bookCover), one(photos.bookPage)];
    // The case study opens on the cover alone; its pages are further down, where they open full size.
    if (hero) {
      return (
        <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[1.75rem] bg-butter/35 sm:aspect-[16/9]">
          <div className="w-[46%] -rotate-2 shadow-[0_34px_60px_-26px_rgba(34,28,24,0.6)] sm:w-[27%]">
            <Photo photo={cover} alt={cover.alt} sizes="(min-width: 768px) 28vw, 46vw" preload />
          </div>
        </div>
      );
    }
    return (
      <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] bg-butter/35">
        <div className="absolute top-[10%] left-[11%] w-[40%] -rotate-3 shadow-[0_30px_50px_-24px_rgba(34,28,24,0.6)]">
          <Photo photo={cover} alt={cover.alt} sizes="(min-width: 768px) 24vw, 40vw" />
        </div>
        <div className="absolute top-[15%] right-[9%] w-[37%] rotate-[4deg] bg-white p-[1.2%] shadow-[0_30px_50px_-24px_rgba(34,28,24,0.6)]">
          <Photo photo={page} alt={page.alt} sizes="(min-width: 768px) 24vw, 40vw" />
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-[1.75rem] bg-ink p-6 sm:p-10 ${hero ? "" : "aspect-[5/4]"}`}>
      <ModelDiagram compact={!hero} />
    </div>
  );
}
