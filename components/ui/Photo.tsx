import Image from "next/image";
import type { PhotoInfo } from "@/lib/photos";

type Props = {
  photo: PhotoInfo;
  alt: string;
  sizes: string;
  /** Short note shown on the placeholder, like the ratio to crop to. */
  hint?: string;
  /** Aspect ratio of the box. Defaults to the photo's own ratio. "fill" stretches to the parent. */
  ratio?: number | "fill";
  className?: string;
  imgClassName?: string;
  /** Background behind the image and placeholder. */
  bg?: string;
  preload?: boolean;
  loading?: "lazy" | "eager";
};

export default function Photo({
  photo,
  alt,
  sizes,
  hint,
  ratio,
  className = "",
  imgClassName = "",
  bg = "bg-ink/[0.06]",
  preload,
  loading,
}: Props) {
  const fill = ratio === "fill";
  const aspect = fill ? undefined : (ratio ?? photo.width / photo.height);

  return (
    <div
      className={`${fill ? "absolute inset-0" : "relative"} overflow-hidden ${bg} ${className}`}
      style={aspect ? { aspectRatio: aspect } : undefined}
    >
      {photo.exists ? (
        <Image
          src={photo.src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          loading={preload ? undefined : loading}
          className={`object-cover ${imgClassName}`}
        />
      ) : (
        <Placeholder file={photo.file} hint={hint} />
      )}
    </div>
  );
}

function Placeholder({ file, hint }: { file: string; hint?: string }) {
  return (
    <div
      className="@container absolute inset-0 flex items-center justify-center p-3 text-center"
      role="img"
      aria-label={`Placeholder for ${file}`}
    >
      <div aria-hidden className="absolute inset-2 border border-dashed border-ink/20" />
      <div aria-hidden className="relative">
        <p className="font-mono text-[11px] text-ink/60 @[16rem]:text-xs @[30rem]:text-sm">{file}</p>
        {hint && (
          <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-ink/40 @[16rem]:text-[11px]">
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}
