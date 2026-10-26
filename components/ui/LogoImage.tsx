import Image from "next/image";
import type { ImageInfo } from "@/lib/images";

// A logo scaled to fit its (positioned) parent without cropping. SVGs skip Next's image
// optimizer, which can't resize them.
export default function LogoImage({
  image,
  alt,
  sizes,
  fit = "contain",
}: {
  image: ImageInfo;
  alt: string;
  sizes: string;
  fit?: "contain" | "cover";
}) {
  return (
    <Image
      src={image.src}
      alt={alt}
      fill
      sizes={sizes}
      unoptimized={image.file.endsWith(".svg")}
      className={fit === "cover" ? "object-cover" : "object-contain"}
    />
  );
}
