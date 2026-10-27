import path from "node:path";
import sharp from "sharp";
import { getImage } from "@/lib/images";

// Helpers for the case-study version's link-preview cards (app/casestudyversion/**/opengraph-image.tsx).

/** Just the glyphs needed from Google Fonts. Null (default font) if the fetch fails. */
export async function googleFont(family: string, text: string) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`,
    ).then((res) => res.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

/** A photo from /public/photos as a JPEG data URL (the card renderer can't be trusted with WebP). */
export async function photoDataUrl(file: string, width = 700) {
  const image = getImage(file);
  if (!image.exists) return null;
  try {
    const jpeg = await sharp(path.join(process.cwd(), "public", "photos", image.file))
      .autoOrient()
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: 88 })
      .toBuffer();
    return { src: `data:image/jpeg;base64,${jpeg.toString("base64")}`, ratio: image.width / image.height };
  } catch {
    return null;
  }
}

export const ogColors = {
  cream: "#fbf4e6",
  paper: "#fffcf5",
  ink: "#221c18",
  tomato: "#e4502f",
  tomatoDeep: "#b3391f",
  butter: "#f6d36f",
  leaf: "#5c9a48",
};
