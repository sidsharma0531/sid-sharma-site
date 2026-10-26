import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import type { Photo } from "@/data/content";
import { photosV2, type Placement } from "@/data/photos-v2";

export type ImageInfo = {
  file: string;
  src: string;
  width: number;
  height: number;
  exists: boolean;
};

export type ResolvedPhoto = ImageInfo & { alt: string; caption?: string; wide?: boolean; focus?: string };

const DIVIDERS = ["before-recognition", "before-contact"];

type Folder = "photos" | "photos/wall" | "logos";

// Image types a browser can show, in the order a name is retried with another extension.
// `npm run photos` turns photo-01.jpg into photo-01.webp, so content can keep the old name.
const EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png", ".avif", ".gif", ".svg"];

/** File name without its extension, lowercased. */
function stem(name: string) {
  return name.slice(0, name.length - path.extname(name).length).toLowerCase();
}

// The real name of `name` in `dir`: the exact file, the same name in any case, or the same name
// with another image extension. Matching the folder listing keeps the case right on Vercel, whose
// file system is case-sensitive even though a Mac's isn't.
function findFile(dir: string, name: string): string | null {
  let files: string[];
  try {
    files = fs.readdirSync(dir);
  } catch {
    return null;
  }
  if (files.includes(name)) return name;
  const anyCase = files.find((file) => file.toLowerCase() === name.toLowerCase());
  if (anyCase) return anyCase;
  for (const ext of EXTENSIONS) {
    const other = files.find((file) => stem(file) === stem(name) && path.extname(file).toLowerCase() === ext);
    if (other) return other;
  }
  return null;
}

// Looks for /public/<folder>/<file> at build time (and on every request in dev), under any image
// extension. If the file is there, its real dimensions are used. If not, `exists` is false and the
// fallback ratio is used, so components can skip it or show a designed fallback.
export function getImage(
  file: string | undefined,
  folder: Folder = "photos",
  fallback: [number, number] = [4, 5],
): ImageInfo {
  const name = file ?? "";
  const dir = path.join(process.cwd(), "public", folder);
  const found = name ? findFile(dir, name) : null;

  if (found) {
    try {
      const size = imageSize(fs.readFileSync(path.join(dir, found)));
      if (size.width && size.height) {
        // EXIF orientations 5 to 8 are rotated 90 degrees, so swap the sides.
        const rotated = size.orientation !== undefined && size.orientation >= 5;
        return {
          file: found,
          src: `/${folder}/${encodeURIComponent(found)}`,
          width: rotated ? size.height : size.width,
          height: rotated ? size.width : size.height,
          exists: true,
        };
      }
    } catch {
      // Unreadable file: fall through to the fallback.
    }
  }

  return { file: name, src: `/${folder}/${name}`, width: fallback[0] * 1000, height: fallback[1] * 1000, exists: false };
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
 * Photos for the /v2 layout (data/photos-v2.ts), for one placement, in list order. Only photos
 * whose file exists come back, so a slot appears on its own once its file is added. Hero ignores
 * `at`. A divider photo whose `at` isn't a known strip goes in the first strip, so switching a
 * photo to "divider" by changing one word still shows it.
 */
export function photosFor(placement: Placement, at?: string): ResolvedPhoto[] {
  const matches = photosV2.filter((photo) => {
    if (photo.placement !== placement) return false;
    if (placement === "hero") return true;
    if (placement === "divider" && !DIVIDERS.includes(photo.at ?? "")) return at === DIVIDERS[0];
    return photo.at === at;
  });
  return resolvePhotos(matches, { onlyExisting: true, fallback: placement === "hero" ? [4, 5] : [1, 1] });
}

// What the camera roll wall shows. Anything else in the folder, like a .heic that
// `npm run photos` hasn't converted yet, is left out.
const WALL_TYPES = [".webp", ".jpg", ".jpeg", ".png", ".avif", ".gif"];

/** Every photo in /public/photos/wall, sorted by file name with numbers in order (IMG_2 before IMG_10). */
export function wallPhotos(): ResolvedPhoto[] {
  let files: string[];
  try {
    files = fs.readdirSync(path.join(process.cwd(), "public", "photos", "wall"));
  } catch {
    return [];
  }
  const found = files
    .filter((file) => !file.startsWith(".") && WALL_TYPES.includes(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
    .map((file) => getImage(file, "photos/wall", [1, 1]))
    .filter((image) => image.exists);
  return found.map((image, i) => ({ ...image, alt: `Camera roll photo ${i + 1} of ${found.length}` }));
}
