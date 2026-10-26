import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

export type PhotoInfo = {
  file: string;
  src: string;
  width: number;
  height: number;
  exists: boolean;
};

// Looks for /public/photos/<file> at build time (and on every request in dev).
// If the file is there, its real dimensions are used. If not, a labeled placeholder
// is drawn at the fallback ratio, so dropping a photo into the folder is all it takes.
export function getPhoto(file: string, fallback: [number, number] = [4, 5]): PhotoInfo {
  const src = `/photos/${file}`;
  const abs = path.join(process.cwd(), "public", "photos", file);

  if (fs.existsSync(abs)) {
    try {
      const size = imageSize(fs.readFileSync(abs));
      if (size.width && size.height) {
        // EXIF orientations 5 to 8 are rotated 90 degrees, so swap the sides.
        const rotated = size.orientation !== undefined && size.orientation >= 5;
        return {
          file,
          src,
          width: rotated ? size.height : size.width,
          height: rotated ? size.width : size.height,
          exists: true,
        };
      }
    } catch {
      // Unreadable file: fall through to the placeholder.
    }
  }

  return { file, src, width: fallback[0] * 1000, height: fallback[1] * 1000, exists: false };
}
