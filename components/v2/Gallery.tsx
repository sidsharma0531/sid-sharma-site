import { gallery } from "@/data/v2";
import { resolvePhotos } from "@/lib/images";
import GalleryGrid from "./GalleryGrid";
import SectionHead from "./SectionHead";

export default function Gallery() {
  const items = gallery
    .map((item) => ({ ...resolvePhotos([item])[0], tag: item.tag }))
    .filter((item) => item.exists);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="scroll-mt-16 border-t border-ink/10 bg-paper/60">
      <div className="v2-wrap py-20 sm:py-28">
        <SectionHead
          id="gallery-title"
          label="Behind the work"
          title="The pickups, the pans, the screens."
          intro="Real photos and screenshots from the projects. Tap any of them to see it full size."
        />
        <div className="mt-10">
          <GalleryGrid items={items} />
        </div>
      </div>
    </section>
  );
}
