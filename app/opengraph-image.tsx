import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { hero, site, type Tone } from "@/data/content";
import { getImage } from "@/lib/images";

// The preview card shown when the site link is shared: the name, the hero line with its
// squiggled phrases, and the hero photo. Built once at build time.

export const alt = hero.line;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT: Record<Tone, string> = { tomato: "#e4502f", leaf: "#5c9a48", butter: "#f6d36f" };

// Fetches just the glyphs needed from Google Fonts. Returns null (default font) if that fails.
async function googleFont(family: string, text: string) {
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

// The hero photo as a JPEG. `npm run photos` makes WebP, which the card renderer isn't sure to
// read, so sharp converts it. Returns null (no photo on the card) if that fails.
async function heroPhoto() {
  const image = getImage(hero.photo.src);
  if (!image.exists) return null;
  try {
    const file = path.join(process.cwd(), "public", "photos", image.file);
    const jpeg = await sharp(file).autoOrient().jpeg({ quality: 90 }).toBuffer();
    return `data:image/jpeg;base64,${jpeg.toString("base64")}`;
  } catch {
    return null;
  }
}

// One period of a wave that tiles seamlessly, as a background for the squiggle under a phrase.
// The card renderer can't draw wavy underlines, so this stands in for the page's squiggle.
function wave(color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="10" viewBox="0 0 28 10"><path d="M0 5C4.7 1.5 9.3 1.5 14 5S23.3 8.5 28 5" fill="none" stroke="${color}" stroke-width="2.6"/></svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

type Word = { text: string; tone?: Tone; after?: string };

// The line as wrap-able pieces: plain words, and each squiggled phrase kept whole with any
// punctuation right after it (which sits outside the squiggle, as on the page).
function lineWords(): Word[] {
  const words: Word[] = [];
  const plain = (text: string) => {
    const match = text.match(/^[,.;:]/);
    if (match && words.length > 0) {
      words[words.length - 1].after = match[0];
      text = text.slice(1);
    }
    for (const word of text.split(" ").filter(Boolean)) words.push({ text: word });
  };
  let rest = hero.line;
  for (const { phrase, tone } of hero.linePhotos) {
    const at = rest.indexOf(phrase);
    if (at === -1) continue;
    plain(rest.slice(0, at));
    words.push({ text: phrase, tone });
    rest = rest.slice(at + phrase.length);
  }
  plain(rest);
  return words;
}

export default async function OpengraphImage() {
  const words = lineWords();

  const [serif, sans, photo] = await Promise.all([
    googleFont("Fraunces:wght@600", `${site.name}.`),
    googleFont("Inter:wght@500", hero.line),
    heroPhoto(),
  ]);

  const fonts = [
    serif && { name: "Fraunces", data: serif, weight: 600 as const, style: "normal" as const },
    sans && { name: "Inter", data: sans, weight: 500 as const, style: "normal" as const },
  ].filter((font): font is NonNullable<typeof font> => font !== null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#fbf4e6",
          color: "#221c18",
          padding: "70px 76px 84px",
          fontFamily: sans ? "Inter" : undefined,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
          <div
            style={{
              display: "flex",
              fontFamily: serif ? "Fraunces" : undefined,
              fontSize: 116,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1,
            }}
          >
            {site.name}
            <span style={{ color: "#e4502f" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: 10,
              rowGap: 8,
              marginTop: 34,
              fontSize: 36,
              lineHeight: 1.3,
              color: "rgba(34,28,24,0.8)",
            }}
          >
            {words.map((word, i) =>
              word.tone ? (
                <div key={i} style={{ display: "flex" }}>
                  <div style={{ display: "flex", position: "relative" }}>
                    {word.text}
                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: -6,
                        height: 10,
                        backgroundImage: wave(ACCENT[word.tone]),
                        backgroundRepeat: "repeat-x",
                        backgroundSize: "28px 10px",
                      }}
                    />
                  </div>
                  {word.after}
                </div>
              ) : (
                <div key={i} style={{ display: "flex" }}>
                  {word.text}
                </div>
              ),
            )}
          </div>
        </div>

        {photo && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginLeft: 40 }}>
            <div
              style={{
                display: "flex",
                padding: 14,
                background: "#fffcf5",
                borderRadius: 24,
                boxShadow: "0 26px 44px -22px rgba(34,28,24,0.5)",
                transform: "rotate(3deg)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} width={292} height={365} alt="" style={{ objectFit: "cover", borderRadius: 14 }} />
            </div>
          </div>
        )}

        {/* Tomato, butter, and leaf stripe along the bottom edge. */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 16, display: "flex" }}>
          <div style={{ flex: 1, background: "#e4502f" }} />
          <div style={{ flex: 1, background: "#f6d36f" }} />
          <div style={{ flex: 1, background: "#5c9a48" }} />
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
