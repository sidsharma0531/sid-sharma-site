import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // www.sidsharma.xyz is the only address for the site. The old /v2 layout goes to the homepage,
  // and Vercel's *.vercel.app addresses (production and previews) go to the real domain.
  async redirects() {
    return [
      { source: "/v2", destination: "/", permanent: true },
      {
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.vercel\\.app" }],
        destination: "https://www.sidsharma.xyz/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
