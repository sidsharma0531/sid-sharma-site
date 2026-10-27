import PhotoButton from "@/components/ui/PhotoButton";
import type { Proof } from "@/data/v2";
import { resolvePhotos } from "@/lib/images";

type Props = {
  proofs: Proof[];
  /** "rows": figure beside its label, for narrow columns. "grid": figures side by side. */
  layout?: "rows" | "grid";
  columns?: 3 | 4;
  className?: string;
};

// Figures, each with what it counts and its scope. One backed by a screenshot or certificate
// opens it in the lightbox.
export default function ProofList({ proofs, layout = "grid", columns = 3, className = "" }: Props) {
  const rows = layout === "rows";
  const grid = columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3";
  return (
    <dl className={rows ? `divide-y divide-ink/10 border-y border-ink/12 ${className}` : `grid grid-cols-1 gap-x-6 gap-y-5 ${grid} ${className}`}>
      {proofs.map((proof) => {
        const [photo] = resolvePhotos(proof.photo && [proof.photo], { onlyExisting: true });
        const value = <span className="font-serif text-[1.35rem] leading-tight font-semibold tracking-[-0.02em]">{proof.value}</span>;
        return (
          <div
            key={`${proof.value} ${proof.label}`}
            className={rows ? "grid grid-cols-[8.5rem_minmax(0,1fr)] items-baseline gap-4 py-3.5" : "min-w-0"}
          >
            <dt>
              {photo ? (
                <PhotoButton photo={photo} label={`See proof: ${proof.value} ${proof.label}`} className="group text-left">
                  {value}
                  <span
                    className={`${rows ? "mt-1 table" : "ml-2 inline-block -translate-y-[0.2em] align-middle"} rounded-full border border-tomato/40 px-1.5 py-px text-[10px] font-semibold tracking-wide text-tomato-deep uppercase transition-colors group-hover:bg-tomato/10`}
                  >
                    proof
                  </span>
                </PhotoButton>
              ) : (
                value
              )}
            </dt>
            <dd className={`text-sm leading-snug text-ink/65 ${rows ? "" : "mt-1"}`}>
              {proof.label}
              {proof.note && <span className="mt-1 block text-xs text-ink/45">{proof.note}</span>}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
