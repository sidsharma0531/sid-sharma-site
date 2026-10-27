import { ImageResponse } from "next/og";
import { hero, projects } from "@/data/v2";
import { googleFont, ogColors as c, photoDataUrl } from "@/lib/og";

// Link-preview card for /v2: the name, the one-line lead, the four projects, and the portrait.

export const alt = `Sid Sharma. ${hero.lead}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const names = projects.map((project) => project.name).join("  ");
  const [serif, sans, photo] = await Promise.all([
    googleFont("Fraunces:wght@600", `Sid Sharma. ${hero.lead}`),
    googleFont("Inter:wght@500", `${names} 01 02 03 04 Portfolio`),
    photoDataUrl(hero.photo.src, 640),
  ]);
  const fonts = [
    serif && { name: "Fraunces", data: serif, weight: 600 as const, style: "normal" as const },
    sans && { name: "Inter", data: sans, weight: 500 as const, style: "normal" as const },
  ].filter((font): font is NonNullable<typeof font> => font !== null);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: c.cream, color: c.ink, padding: "64px 72px 80px", fontFamily: sans ? "Inter" : undefined, position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 20, letterSpacing: "0.16em", color: "rgba(34,28,24,0.55)" }}>PORTFOLIO</div>
            <div style={{ display: "flex", marginTop: 18, fontFamily: serif ? "Fraunces" : undefined, fontSize: 112, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>
              Sid Sharma<span style={{ color: c.tomato }}>.</span>
            </div>
            <div style={{ display: "flex", marginTop: 26, maxWidth: 600, fontFamily: serif ? "Fraunces" : undefined, fontSize: 44, lineHeight: 1.15, letterSpacing: "-0.015em" }}>
              {hero.lead}
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {projects.map((project) => (
              <div key={project.slug} style={{ display: "flex", alignItems: "center", gap: 8, border: "2px solid rgba(34,28,24,0.15)", borderRadius: 999, padding: "8px 18px", fontSize: 22 }}>
                <span style={{ color: "rgba(34,28,24,0.45)" }}>{project.index}</span>
                {project.name}
              </div>
            ))}
          </div>
        </div>
        {photo && (
          <div style={{ display: "flex", alignItems: "center", marginLeft: 40 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} width={300} height={375} alt="" style={{ objectFit: "cover", objectPosition: "50% 30%", borderRadius: 28 }} />
          </div>
        )}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 14, display: "flex" }}>
          <div style={{ flex: 1, background: c.leaf }} />
          <div style={{ flex: 1, background: c.tomato }} />
          <div style={{ flex: 1, background: c.butter }} />
          <div style={{ flex: 1, background: c.ink }} />
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
