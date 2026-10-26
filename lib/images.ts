import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { photos as sitePhotos, type Photo, type Placement } from "@/data/content";

export type ImageInfo = {
  file: string;
  src: string;
  width: number;
  height: number;
  exists: boolean;
};

export type ResolvedPhoto = ImageInfo & { alt: string; caption?: string; wide?: boolean; focus?: string };

const DIVIDERS = ["before-recognition", "before-contact"];

type Folder = "photos" | "logos";

// Looks for /public/<folder>/<file> at build time (and on every request in dev).
// If the file is there, its real dimensions are used. If not, `exists` is false and the
// fallback ratio is used, so components can show a placeholder or a designed fallback.
export function getImage(
  file: string | undefined,
  folder: Folder = "photos",
  fallback: [number, number] = [4, 5],
): ImageInfo {
  const name = file ?? "";
  const src = `/${folder}/${name}`;
  const abs = path.join(process.cwd(), "public", folder, name);

  if (name && fs.existsSync(abs)) {
    try {
      const size = imageSize(fs.readFileSync(abs));
      if (size.width && size.height) {
        // EXIF orientations 5 to 8 are rotated 90 degrees, so swap the sides.
        const rotated = size.orientation !== undefined && size.orientation >= 5;
        return {
          file: name,
          src,
          width: rotated ? size.height : size.width,
          height: rotated ? size.width : size.height,
          exists: true,
        };
      }
    } catch {
      // Unreadable file: fall through to the fallback.
    }
  }

  return { file: name, src, width: fallback[0] * 1000, height: fallback[1] * 1000, exists: false };
}

/** Resolves content photos. With onlyExisting, missing files are dropped so no empty slot renders. */
export function resolvePhotos(
  photos: Photo[] | undefined,
  { onlyExisting = false, fallback = [4, 3] as [number, number] } = {},
): ResolvedPhoto[] {
  const list = (photos ?? []).map((photo) => ({
    ...getImage(photo.src, "photos", fallback),
    alt: photo.alt,
    caption: photo.caption,
    wide: photo.wide,
    focus: photo.focus,
  }));
  return onlyExisting ? list.filter((photo) => photo.exists) : list;
}

/**
 * Photos from the content list for one placement, in list order. Hero ignores `at`. A divider
 * photo whose `at` isn't a known strip goes in the first strip, so switching a photo to
 * "divider" by changing one word still shows it.
 */
export function photosFor(placement: Placement, at?: string): ResolvedPhoto[] {
  const matches = sitePhotos.filter((photo) => {
    if (photo.placement !== placement) return false;
    if (placement === "hero") return true;
    if (placement === "divider" && !DIVIDERS.includes(photo.at ?? "")) return at === DIVIDERS[0];
    return photo.at === at;
  });
  return resolvePhotos(matches, { fallback: placement === "hero" ? [4, 5] : [1, 1] });
}
