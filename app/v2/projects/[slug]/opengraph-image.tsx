import { ImageResponse } from "next/og";
import { caseStudies, photos, projectBySlug, projects, type ProjectSlug } from "@/data/v2";
import { googleFont, ogColors as c, photoDataUrl } from "@/lib/og";

// Link-preview card for each case study: its number, name, one-line subtitle, and a real photo.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sid Sharma case study";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

const cardPhoto: Partial<Record<ProjectSlug, string>> = {
  rescuelog: photos.appHome.src,
  waste2taste: photos.traderJoes.src,
  "still-good": photos.bookCover.src,
};

const accent = { leaf: c.leaf, tomato: c.tomato, butter: c.butter, ink: c.ink };

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug)!;
  const study = caseStudies[project.slug];
  const file = cardPhoto[project.slug];

  const [serif, sans, photo] = await Promise.all([
    googleFont("Fraunces:wght@600", `${study.title} ${study.subtitle} Sid Sharma.`),
    googleFont("Inter:wght@500", `CASE STUDY ${project.index} ${project.role}`),
    file ? photoDataUrl(file, 560) : Promise.resolve(null),
  ]);
  const fonts = [
    serif && { name: "Fraunces", data: serif, weight: 600 as const, style: "normal" as const },
    sans && { name: "Inter", data: sans, weight: 500 as const, style: "normal" as const },
  ].filter((font): font is NonNullable<typeof font> => font !== null);

  // Phone screenshots are tall, so they show as a narrow, top-aligned crop.
  const tall = photo ? photo.ratio < 0.6 : false;
  const width = tall ? 250 : 340;
  const height = tall ? 480 : Math.round(340 / Math.max(photo?.ratio ?? 1, 0.7));

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: c.cream, color: c.ink, padding: "64px 72px 80px", fontFamily: sans ? "Inter" : undefined, position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 20, letterSpacing: "0.16em", color: "rgba(34,28,24,0.55)" }}>
              <div style={{ width: 14, height: 14, borderRadius: 999, background: accent[project.tone] }} />
              {`CASE STUDY ${project.index}`}
            </div>
            <div style={{ display: "flex", marginTop: 22, fontFamily: serif ? "Fraunces" : undefined, fontSize: study.title.length > 14 ? 92 : 120, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 0.95 }}>
              {study.title}
            </div>
            <div style={{ display: "flex", marginTop: 28, maxWidth: 640, fontFamily: serif ? "Fraunces" : undefined, fontSize: 40, lineHeight: 1.2, color: "rgba(34,28,24,0.75)" }}>
              {study.subtitle}
            </div>
          </div>
          <div style={{ display: "flex", fontFamily: serif ? "Fraunces" : undefined, fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em" }}>
            Sid Sharma<span style={{ color: c.tomato }}>.</span>
          </div>
        </div>
        {photo && (
          <div style={{ display: "flex", alignItems: "center", marginLeft: 40 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.src} width={width} height={height} alt="" style={{ objectFit: "cover", objectPosition: "50% 0%", borderRadius: 24, boxShadow: "0 24px 40px -20px rgba(34,28,24,0.45)" }} />
          </div>
        )}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 14, display: "flex", background: accent[project.tone] }} />
      </div>
    ),
    { ...size, fonts },
  );
}
