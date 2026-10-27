import LogoImage from "@/components/ui/LogoImage";
import Rich from "@/components/ui/Rich";
import type { Block } from "@/data/v2";
import { getImage, resolvePhotos } from "@/lib/images";
import Arrow from "../Arrow";
import EventCard from "../EventCard";
import FlowDiagram from "../FlowDiagram";
import FigureGrid from "./FigureGrid";
import ProofShots from "./ProofShots";

// Renders a case study section's content blocks, in order.
export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-10">
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  );
}

const prose = "max-w-[64ch] text-[1.05rem] leading-[1.75] text-ink/80 sm:text-[1.1rem]";

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "text":
      return (
        <div className={`space-y-5 ${prose}`}>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              <Rich text={paragraph} />
            </p>
          ))}
        </div>
      );

    case "list":
      return (
        <ul className={`space-y-4 ${prose}`}>
          {block.items.map((item) => (
            <li key={item} className="relative pl-6 before:absolute before:top-[0.72em] before:left-0 before:h-px before:w-3 before:bg-tomato">
              <Rich text={item} />
            </li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol className="space-y-8">
          {block.steps.map((step, i) => (
            <li key={step.title} className="grid gap-5 border-t border-ink/10 pt-6 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-5">
                <span className="font-serif text-[2.4rem] leading-none font-medium text-tomato/80">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 font-serif text-xl leading-snug font-medium">{step.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{step.body}</p>
              </div>
              {step.photos && (
                <div className="md:col-span-7">
                  <FigureGrid photos={resolvePhotos(step.photos, { onlyExisting: true })} layout="step" />
                </div>
              )}
            </li>
          ))}
        </ol>
      );

    case "milestones":
      return (
        <ol className="max-w-[70ch] space-y-6 border-l border-ink/15 pl-6">
          {block.items.map((item) => (
            <li key={item.date} className="relative">
              <span aria-hidden className="absolute top-1.5 -left-[1.85rem] size-2.5 rounded-full bg-leaf ring-4 ring-cream" />
              <p className="v2-label text-ink/60">{item.date}</p>
              <p className="mt-1.5 leading-relaxed text-ink/80">
                <Rich text={item.text} />
              </p>
            </li>
          ))}
        </ol>
      );

    case "photos":
      return <FigureGrid photos={resolvePhotos(block.photos, { onlyExisting: true })} layout={block.layout} />;

    case "note":
      return (
        <aside className="max-w-[66ch] rounded-2xl border border-ink/15 bg-paper p-5 sm:p-6">
          <p className="v2-label flex items-center gap-2 text-ink/70">
            <span aria-hidden className="grid size-5 place-items-center rounded-full border border-ink/30 text-[11px] font-semibold normal-case">
              i
            </span>
            {block.title}
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{block.text}</p>
        </aside>
      );

    case "quote":
      return (
        <figure className="max-w-[60ch] border-l-2 border-tomato pl-6">
          <blockquote className="font-serif text-[clamp(1.35rem,2.6vw,1.85rem)] leading-snug italic">&ldquo;{block.text}&rdquo;</blockquote>
          <figcaption className="mt-3 text-sm text-ink/55">
            {block.href ? (
              <a href={block.href} target="_blank" rel="noopener noreferrer" className="v2-link inline-flex items-center gap-1">
                {block.source}
                <Arrow direction="up-right" />
              </a>
            ) : (
              block.source
            )}
          </figcaption>
        </figure>
      );

    case "proofs": {
      const items = block.proofs.flatMap((proof) => {
        const [photo] = resolvePhotos(proof.photo && [proof.photo], { onlyExisting: true });
        return photo ? [{ photo, value: proof.value, label: proof.label }] : [];
      });
      return <ProofShots items={items} />;
    }

    case "logos":
      return (
        <ul className="flex flex-wrap gap-3">
          {block.logos.map((logo) => {
            const image = getImage(logo.logo, "logos", [3, 1]);
            const tile = (
              <span className="flex h-16 w-36 items-center justify-center rounded-xl bg-white px-4 ring-1 ring-ink/10">
                {image.exists ? (
                  <span className="relative block h-9 w-full">
                    <LogoImage image={image} alt={logo.name} sizes="112px" />
                  </span>
                ) : (
                  <span className="text-center text-xs font-semibold">{logo.name}</span>
                )}
              </span>
            );
            return (
              <li key={logo.name}>
                {logo.href ? (
                  <a href={logo.href} target="_blank" rel="noopener noreferrer" title={logo.name} className="block transition-transform hover:-translate-y-0.5">
                    {tile}
                  </a>
                ) : (
                  tile
                )}
              </li>
            );
          })}
        </ul>
      );

    case "places":
      return (
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:grid-cols-4">
          {block.places.map((place) => (
            <li key={place.city} className="bg-cream px-4 py-3.5">
              <p className="font-medium">{place.city}</p>
              <p className="text-sm text-ink/55">
                {place.region}
                {place.founding && <span className="text-tomato-deep"> · founding branch</span>}
              </p>
            </li>
          ))}
        </ul>
      );

    case "event":
      return <EventCard className="max-w-md" />;

    case "flow":
      return <FlowDiagram />;
  }
}
