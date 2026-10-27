import Photo from "@/components/ui/Photo";
import Rich from "@/components/ui/Rich";
import { about } from "@/data/v2";
import { resolvePhotos } from "@/lib/images";

export default function About() {
  const [photo] = resolvePhotos([about.photo], { fallback: [1, 1] });
  return (
    <section id="about" aria-labelledby="about-title" className="v2-wrap scroll-mt-16 py-20 sm:py-28">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div data-reveal className="md:col-span-7">
          <p className="v2-label">About</p>
          <h2 id="about-title" className="mt-3 font-serif text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.025em]">
            {about.title}
          </h2>
          <div className="mt-8 space-y-5 text-[1.06rem] leading-[1.75] text-ink/80 sm:text-lg">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <Rich text={paragraph} />
              </p>
            ))}
          </div>
        </div>
        <figure data-reveal className="md:col-span-5 md:pt-16">
          <div className="overflow-hidden rounded-[1.75rem] ring-1 ring-ink/10">
            <Photo photo={photo} alt={photo.alt} ratio={4 / 5} position="50% 35%" sizes="(min-width: 768px) 38vw, 92vw" />
          </div>
          <figcaption className="mt-3 text-sm text-ink/55">{photo.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
