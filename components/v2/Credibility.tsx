import Image from "next/image";
import LogoImage from "@/components/ui/LogoImage";
import { credibility, type StripLogo } from "@/data/v2";
import { getImage } from "@/lib/images";

// Three relationships kept apart on purpose: who covered the work, who recognized it, and who
// works with it. Logos sit in gray and take their color on hover.
export default function Credibility() {
  return (
    <section aria-label="Coverage, recognition, and partners" className="mt-10 border-y border-ink/10 bg-paper/70">
      <div className="v2-wrap grid gap-8 py-8 sm:py-10 lg:grid-cols-[0.8fr_1.6fr_1.6fr] lg:gap-12">
        {credibility.map((group) => (
          <div key={group.label}>
            <p className="v2-label">{group.label}</p>
            <ul className="mt-4 flex flex-wrap items-start gap-x-6 gap-y-5">
              {group.logos.map((logo) => (
                <li key={logo.name}>
                  <StripItem logo={logo} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function StripItem({ logo }: { logo: StripLogo }) {
  const image = getImage(logo.logo, "logos", [3, 1]);
  const mark = !image.exists ? (
    <span className="text-sm font-medium">{logo.name}</span>
  ) : logo.square ? (
    <span className="relative block size-11 overflow-hidden rounded-lg opacity-85 grayscale transition group-hover:opacity-100 group-hover:grayscale-0">
      <Image src={image.src} alt={logo.name} fill sizes="44px" className="object-cover" />
    </span>
  ) : (
    <span className="relative block h-11 w-28 opacity-80 mix-blend-multiply grayscale contrast-125 transition group-hover:opacity-100 group-hover:grayscale-0 group-hover:contrast-100">
      <LogoImage image={image} alt={logo.name} sizes="112px" />
    </span>
  );

  const body = (
    <>
      {mark}
      {logo.note && <span className="mt-1.5 block text-[11px] leading-none text-ink/50">{logo.note}</span>}
    </>
  );

  return logo.href ? (
    <a href={logo.href} target="_blank" rel="noopener noreferrer" title={logo.name} className="group block">
      {body}
    </a>
  ) : (
    <span title={logo.name} className="group block">
      {body}
    </span>
  );
}
