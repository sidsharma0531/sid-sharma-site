import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import type { Photo } from "@/data/content";

export type ImageInfo = {
  file: string;
  src: string;
  width: number;
  height: number;
  exists: boolean;
};

export type ResolvedPhoto = ImageInfo & { alt: string; caption?: string; wide?: boolean; focus?: string };

type Folder = "photos" | "logos";

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
