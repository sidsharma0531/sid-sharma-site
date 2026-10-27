import LogoImage from "@/components/ui/LogoImage";
import Rich from "@/components/ui/Rich";
import { otherExperience } from "@/data/v2";
import { getImage } from "@/lib/images";
import { isLink } from "@/lib/text";
import SectionHead from "./SectionHead";

// The homepage's secondary entries, folded so they don't compete with the main projects.
export default function OtherExperience() {
  return (
    <section id="more" aria-labelledby="more-title" className="v2-wrap scroll-mt-16 py-20 sm:py-28">
      <SectionHead id="more-title" label="Also" title="Other things I do." />
      <ul className="mt-12 divide-y divide-ink/12 border-y border-ink/12">
        {otherExperience.map((entry) => (
          <li key={entry.id} data-reveal>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="min-w-0">
                  <span className="block font-serif text-xl leading-snug font-medium sm:text-2xl">{entry.role}</span>
                  <span className="mt-1 block text-sm text-ink/55">
                    {[entry.org, entry.type, entry.dates].filter(Boolean).join(" · ")}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-ink/15 text-lg leading-none transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <div className="pb-6 md:grid md:grid-cols-12 md:gap-8">
                <div className="md:col-span-8 md:col-start-1">
                  <p className="max-w-[62ch] leading-relaxed text-ink/75">
                    <Rich text={entry.summary} />
                  </p>
                  {entry.bullets && (
                    <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-ink/75">
                      {entry.bullets.map((bullet) => (
                        <li key={bullet} className="relative pl-5 before:absolute before:top-[0.65em] before:left-0.5 before:size-1.5 before:rounded-full before:bg-tomato">
                          <Rich text={bullet} />
                        </li>
                      ))}
                    </ul>
                  )}
                  {entry.logos && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {entry.logos.map((logo) => {
                        const image = logo.logo ? getImage(logo.logo, "logos", [3, 1]) : null;
                        const tile = (
                          <span className="flex h-11 w-24 items-center justify-center rounded-lg bg-white px-2 ring-1 ring-ink/10">
                            {image?.exists ? (
                              <span className="relative block h-7 w-full">
                                <LogoImage image={image} alt={logo.name} sizes="96px" />
                              </span>
                            ) : (
                              <span className="text-center text-[11px] leading-tight font-semibold text-ink/75">{logo.name}</span>
                            )}
                          </span>
                        );
                        return (
                          <li key={logo.name}>
                            {isLink(logo.href) ? (
                              <a href={logo.href} target="_blank" rel="noopener noreferrer" title={logo.name}>
                                {tile}
                              </a>
                            ) : (
                              tile
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
