import Gallery from "@/components/Gallery";
import SectionHeader from "@/components/ui/SectionHeader";
import { gallery } from "@/lib/content";
import { getPhoto } from "@/lib/photos";

// Placeholder ratios so the masonry reads as masonry before real photos arrive.
// Real photos use their own dimensions.
const fallbackRatios: [number, number][] = [
  [4, 5], [3, 2], [1, 1], [2, 3], [4, 3],
  [3, 4], [3, 2], [4, 5], [1, 1], [2, 3],
];

export default function Photos() {
  const photos = gallery.map((item, i) => ({
    ...getPhoto(item.file, fallbackRatios[i % fallbackRatios.length]),
    alt: item.alt,
  }));

  return (
    <section id="photos" className="container-page pb-24 sm:pb-32 lg:pb-40">
      <SectionHeader label="Photos" title="From the field" />
      <Gallery photos={photos} />
    </section>
  );
}
