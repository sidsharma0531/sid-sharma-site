import Image from "next/image";
import type { ImageInfo } from "@/lib/images";

type Props = {
  photo: ImageInfo;
  alt: string;
  sizes: string;
  /** Short note on the placeholder, like the ratio to crop to. */
  hint?: string;
  /** Aspect ratio of the box. Defaults to the photo's own ratio. "fill" stretches to the parent. */
  ratio?: number | "fill";
  className?: string;
  imgClassName?: string;
  /** Background behind the image while it loads. */
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
          unoptimized={photo.file.endsWith(".svg")}
          className={`object-cover ${imgClassName}`}
        />
      ) : (
        <Placeholder file={photo.file} hint={hint} />
      )}
    </div>
  );
}

// Labeled stand-in until the real file lands in /public/photos.
function Placeholder({ file, hint }: { file: string; hint?: string }) {
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${file}`}
      className="@container absolute inset-0 flex flex-col items-center justify-center gap-2 bg-butter/30 bg-[repeating-linear-gradient(45deg,transparent_0_10px,rgb(34_28_24/0.05)_10px_11px)] p-3 text-center"
    >
      <svg
        aria-hidden
        viewBox="0 0 48 40"
        className="w-[22cqw] max-w-16 min-w-7 text-ink/40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 8c0-2 1.5-3.5 3.5-3.5h31c2 0 3.5 1.5 3.5 3.5v24c0 2-1.5 3.5-3.5 3.5h-31C6.5 35.5 5 34 5 32z" />
        <circle cx="32" cy="14" r="4" />
        <path d="M6 31l11-11 8 8 5-5 12 12" />
      </svg>
      <p className="font-mono text-[clamp(9px,5.5cqw,14px)] leading-tight break-all text-ink/65">{file}</p>
      {hint && <p className="font-hand text-[clamp(13px,7cqw,22px)] leading-none text-ink/50">{hint}</p>}
    </div>
  );
}
