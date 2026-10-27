import Image from "next/image";
import LogoImage from "@/components/ui/LogoImage";
import { pressItems } from "@/data/v2";
import { getImage } from "@/lib/images";
import Arrow from "./Arrow";
import SectionHead from "./SectionHead";

export default function Press() {
  return (
    <section id="press" aria-labelledby="press-title" className="v2-wrap scroll-mt-16 py-20 sm:py-28">
      <SectionHead id="press-title" label="Press" title="Where the work has been covered." />
      <ul className="mt-12 grid gap-5 md:grid-cols-2 md:gap-6">
        {pressItems.map((item) => {
          const art = item.logo ? getImage(item.logo, "logos", [1, 1]) : null;
          return (
            <li key={item.headline} data-reveal>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-[1.5rem] border border-ink/10 bg-paper p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-30px_rgba(34,28,24,0.45)] sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="relative grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-ink/10">
                    {art?.exists &&
                      (item.logoFit === "cover" ? (
                        <Image src={art.src} alt="" fill sizes="56px" className="object-cover" />
                      ) : (
                        <span className="relative block size-10">
                          <LogoImage image={art} alt="" sizes="40px" />
                        </span>
                      ))}
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium">{item.outlet}</p>
                    <p className="text-sm text-ink/55">
                      {item.kind} · {item.date}
                    </p>
                  </div>
                </div>
                <p className="mt-6 font-serif text-[1.45rem] leading-snug font-medium tracking-[-0.01em]">{item.headline}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{item.summary}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium group-hover:text-tomato-deep">
                  {item.action}
                  <Arrow direction="up-right" />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
