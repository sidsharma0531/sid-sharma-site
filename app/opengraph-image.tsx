import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { hero, site } from "@/data/content";
import { getImage } from "@/lib/images";

// The preview card shown when the site link is shared. Built once at build time.

export const alt = `${site.name}: ${site.shareLine}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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

export default async function OpengraphImage() {
  // Placeholders never belong on a share card, so only filled-in stats are shown.
  const stats = hero.stats.filter((stat) => !stat.value.includes("["));
  const serifText = `${site.name}. ${stats.map((s) => `${s.value} ${s.unit ?? ""}`).join(" ")}`;
  const sansText = `${site.shareLine} ${stats.map((s) => s.label).join(" ")}+`;

  const [serif, sans, hand, photo] = await Promise.all([
    googleFont("Fraunces:wght@600", serifText),
    googleFont("Inter:wght@500", sansText),
    googleFont("Caveat:wght@600", "say hi!"),
    heroPhoto(),
  ]);

  const fonts = [
    serif && { name: "Fraunces", data: serif, weight: 600 as const, style: "normal" as const },
    sans && { name: "Inter", data: sans, weight: 500 as const, style: "normal" as const },
    hand && { name: "Caveat", data: hand, weight: 600 as const, style: "normal" as const },
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
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
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
            <div style={{ display: "flex", marginTop: 26, fontSize: 30, lineHeight: 1.3, color: "rgba(34,28,24,0.75)", maxWidth: 620 }}>
              {site.shareLine}
            </div>
          </div>

          <div style={{ display: "flex", gap: 48, borderTop: "2px dashed rgba(34,28,24,0.25)", paddingTop: 26 }}>
            {stats.map((stat) => (
              <div key={stat.label} style={{ display: "flex", flexDirection: "column", maxWidth: 210 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    fontFamily: serif ? "Fraunces" : undefined,
                    fontSize: 54,
                    fontWeight: 600,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {/* Fraunces builds "+" from two pieces that the image renderer misplaces, so it is drawn in Inter. */}
                  {stat.value.replace("+", "")}
                  {stat.value.includes("+") && <span style={{ fontFamily: sans ? "Inter" : undefined, fontWeight: 500 }}>+</span>}
                  <span style={{ fontSize: 24, marginLeft: 8, color: "#b3391f" }}>{stat.unit}</span>
                </div>
                <div style={{ display: "flex", marginTop: 6, fontSize: 18, lineHeight: 1.3, color: "rgba(34,28,24,0.6)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {photo && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: 40 }}>
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
            <div
              style={{
                display: "flex",
                marginTop: 18,
                fontFamily: hand ? "Caveat" : undefined,
                fontSize: 42,
                color: "#b3391f",
                transform: "rotate(-6deg)",
              }}
            >
              say hi!
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
