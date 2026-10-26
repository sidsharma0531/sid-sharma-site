import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "Student founder in Houston, building ways to keep good food out of the trash.";

export const metadata: Metadata = {
  title: "Sid Sharma",
  description,
  openGraph: {
    title: "Sid Sharma",
    description,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f1e9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
